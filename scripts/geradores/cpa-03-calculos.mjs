// CPA (ANBIMA) — Cálculos financeiros e tributação de investimentos.
// Regras de 2026: IR regressivo da renda fixa (22,5% / 20% / 17,5% / 15%), IOF regressivo até 29 dias,
// ações (15% comum, 20% day trade, isenção de vendas até R$ 20 mil/mês no comum), come-cotas
// (15% longo prazo, 20% curto prazo), previdência regressiva (35% a 10%), FGC (R$ 250 mil).
import { expl, num, reais } from './util.mjs';

const N = (v, c = null) => num(v, c);
const r2 = (v) => Math.round(v * 100) / 100;
const pc = (v) => `${N(r2(v))}%`;
const R = (v) => reais(r2(v));

const IR_RF = (dias) => (dias <= 180 ? 22.5 : dias <= 360 ? 20 : dias <= 720 ? 17.5 : 15);
const IOF = { 1: 96, 5: 83, 10: 66, 15: 50, 20: 33, 25: 16, 29: 3 };
const PREV = (anos) => (anos <= 2 ? 35 : anos <= 4 ? 30 : anos <= 6 ? 25 : anos <= 8 ? 20 : anos <= 10 ? 15 : 10);

const facil = [
  // 1. alíquota do IR pelo prazo
  (r) => {
    const dias = r.pick([90, 150, 200, 300, 400, 600, 800, 1000]);
    return {
      e: `Um CDB foi resgatado ${dias} dias depois da aplicação. Qual é a alíquota de IR sobre o rendimento?`,
      r: IR_RF(dias),
      d: [22.5, 20, 17.5, 15, 10],
      f: pc,
      x: expl('tabela regressiva da renda fixa', 'Até 180 dias: 22,5%; de 181 a 360: 20%; de 361 a 720: 17,5%; acima de 720 dias: 15%.', `${dias} dias ⇒ ${N(IR_RF(dias))}%.`),
    };
  },
  // 2. IR sobre o rendimento
  (r) => {
    const rend = r.pick([800, 1200, 2000, 2500, 4000]), dias = r.pick([100, 250, 500, 900]);
    const ir = (rend * IR_RF(dias)) / 100;
    return {
      e: `Uma aplicação em CDB rendeu ${R(rend)} brutos em ${dias} dias. Quanto será retido de IR?`,
      r: ir,
      d: [(rend * 15) / 100, (rend * 22.5) / 100, rend - ir, (rend * 27.5) / 100],
      f: R,
      x: expl('IR incide só sobre o rendimento', `Prazo de ${dias} dias: alíquota de ${N(IR_RF(dias))}%.`, `${N(IR_RF(dias))}% de ${R(rend)} = ${R(ir)}.`),
    };
  },
  // 3. taxa real (Fisher)
  (r) => {
    const [n, i] = r.pick([[12, 4], [10, 5], [15, 5], [8, 3], [14, 6]]);
    const real = ((1 + n / 100) / (1 + i / 100) - 1) * 100;
    return {
      e: `Um investimento rendeu ${n}% no ano, e a inflação foi de ${i}%. Qual foi o ganho real, pela fórmula de Fisher?`,
      r: real,
      d: [n - i, n + i, (n / i), real * 2],
      f: pc,
      x: expl('Fisher: (1 + nominal) = (1 + real) · (1 + inflação)', `1 + real = ${N(1 + n / 100)} ÷ ${N(1 + i / 100)}.`, `Real ≈ ${pc(real)}. A subtração simples (${n - i}%) é só uma aproximação.`),
    };
  },
  // 4. juros simples
  (r) => {
    const C = r.pick([1000, 2000, 5000]), i = r.pick([1, 2, 1.5]), t = r.pick([6, 10, 12]);
    return {
      e: `Qual é o montante de ${R(C)} aplicados a juros simples de ${N(i)}% ao mês durante ${t} meses?`,
      r: C * (1 + (i / 100) * t),
      d: [C * (1 + i / 100) ** t, C * (i / 100) * t, C * (1 + i / 100), C + i * t],
      f: R,
      x: expl('M = C · (1 + i · t)', 'Nos juros simples, os juros de cada mês são calculados sobre o capital inicial.', `${R(C)} · (1 + ${N(i / 100, 3)} · ${t}) = ${R(C * (1 + (i / 100) * t))}.`),
    };
  },
  // 5. juros compostos
  (r) => {
    const C = r.pick([1000, 2000, 10000]), i = r.pick([10, 5, 20]), t = r.pick([2, 3]);
    const M = C * (1 + i / 100) ** t;
    return {
      e: `Qual é o montante de ${R(C)} aplicados a juros compostos de ${i}% ao ano durante ${t} anos?`,
      r: M,
      d: [C * (1 + (i / 100) * t), M - C, C * (1 + i / 100), M * 1.1],
      f: R,
      x: expl('M = C · (1 + i)ⁿ', 'Nos juros compostos, os juros de cada período entram no capital (juros sobre juros).', `${R(C)} · ${N(1 + i / 100)}^${t} = ${R(M)}.`),
    };
  },
  // 6. poupança com Selic baixa
  (r) => {
    const selic = r.pick([6, 7, 8, 7.5, 8.5]);
    return {
      e: `Com a meta da Selic em ${N(selic)}% ao ano, quanto rende a poupança (depósitos a partir de 4/5/2012), sem contar a TR?`,
      r: 0.7 * selic,
      d: [selic, 6.17, 0.5 * selic, selic - 1],
      f: (v) => `${N(r2(v))}% ao ano`,
      x: expl('regra da poupança', 'Com a Selic até 8,5% ao ano, a poupança rende 70% da Selic mais a TR. Acima de 8,5%, rende 0,5% ao mês mais a TR.', `70% de ${N(selic)}% = ${N(r2(0.7 * selic))}% ao ano.`),
    };
  },
  // 7. CDB a % do CDI
  (r) => {
    const cdi = r.pick([10, 12, 14, 15]), p = r.pick([90, 105, 110, 120]);
    return {
      e: `Com o CDI em ${cdi}% ao ano, quanto rende, bruto, um CDB que paga ${p}% do CDI?`,
      r: (cdi * p) / 100,
      d: [cdi + p / 100, cdi, (cdi * 100) / p, p - cdi],
      f: (v) => `${N(r2(v))}% ao ano`,
      x: expl('% do CDI é uma fração da taxa', `${p}% do CDI significa multiplicar o CDI por ${N(p / 100)}.`, `${cdi}% · ${N(p / 100)} = ${N(r2((cdi * p) / 100))}% ao ano.`),
    };
  },
  // 8. LCI × CDB
  (r) => {
    const [lci, cdb, dias] = r.pick([[90, 110, 800], [85, 110, 400], [95, 115, 200], [92, 105, 800]]);
    const liq = cdb * (1 - IR_RF(dias) / 100);
    return {
      e: `Para ${dias} dias, uma pessoa física compara uma LCI de ${lci}% do CDI com um CDB de ${cdb}% do CDI. Considerando o IR, qual rende mais?`,
      r: liq > lci ? `o CDB, que rende líquido ${N(r2(liq))}% do CDI` : `a LCI, porque o CDB rende líquido só ${N(r2(liq))}% do CDI`,
      d: liq > lci
        ? [`a LCI, porque é isenta de IR`, `são iguais`, `o CDB, que rende líquido ${cdb}% do CDI`, `a LCI, que rende líquido ${N(r2(lci * 1.15))}% do CDI`]
        : [`o CDB, porque ${cdb}% é maior que ${lci}%`, `são iguais`, `o CDB, que rende líquido ${N(r2(cdb * 0.85))}% do CDI`, `a LCI, que rende líquido ${N(r2(lci * 0.85))}% do CDI`],
      x: expl('compare sempre o rendimento líquido', `${dias} dias ⇒ IR de ${N(IR_RF(dias))}%. CDB líquido = ${cdb}% · (1 − ${N(IR_RF(dias) / 100, 3)}) = ${N(r2(liq))}% do CDI. A LCI é isenta para pessoa física: ${lci}%.`, `${liq > lci ? 'O CDB' : 'A LCI'} rende mais.`),
    };
  },
  // 9. FGC
  (r) => {
    const v = r.pick([300, 400, 280, 500]);
    return {
      e: `Uma pessoa tem R$ ${v} mil em CDBs de um único banco, que quebrou. Quanto o FGC garante a ela?`,
      r: 250,
      d: [v, 100, 1000, v - 250],
      f: (x) => `R$ ${N(x)} mil`,
      x: expl('limite do FGC', 'O FGC garante até R$ 250 mil por CPF por instituição (ou conglomerado), com teto de R$ 1 milhão a cada 4 anos.', 'Cobertura: R$ 250 mil.'),
    };
  },
  // 10. taxa equivalente mensal → anual
  (r) => {
    const i = r.pick([1, 2, 0.5, 1.5]);
    const a = ((1 + i / 100) ** 12 - 1) * 100;
    return {
      e: `Qual é a taxa anual equivalente a ${N(i)}% ao mês, em juros compostos?`,
      r: a,
      d: [12 * i, a - 1, i * 10, a * 1.1],
      f: pc,
      x: expl('(1 + i_a) = (1 + i_m)¹²', 'Em juros compostos, as taxas se multiplicam; não basta multiplicar por 12.', `${N(1 + i / 100, 3)}¹² − 1 ≈ ${pc(a)}.`),
    };
  },
  // 11. taxa proporcional
  (r) => {
    const a = r.pick([12, 24, 18, 36]);
    return {
      e: `Em juros simples, qual taxa mensal é proporcional a ${a}% ao ano?`,
      r: a / 12,
      d: [a / 10, ((1 + a / 100) ** (1 / 12) - 1) * 100, a * 12, a / 6],
      f: (v) => `${N(r2(v))}% ao mês`,
      x: expl('taxas proporcionais (juros simples)', 'Nos juros simples, basta dividir pelo número de períodos.', `${a}% ÷ 12 = ${N(r2(a / 12))}% ao mês.`),
    };
  },
  // 12. IOF regressivo
  (r) => {
    const dia = r.pick([5, 10, 15, 20, 25, 29]);
    return {
      e: `Um investidor resgatou um CDB no ${dia}º dia após a aplicação. Que percentual do rendimento é cobrado de IOF?`,
      r: IOF[dia],
      d: [0, 0.38, 22.5, 100 - IOF[dia]],
      f: pc,
      x: expl('IOF regressivo até 29 dias', 'O IOF sobre aplicações começa em 96% do rendimento no 1º dia e cai até zero no 30º dia.', `No ${dia}º dia: ${IOF[dia]}% do rendimento. O IR é cobrado depois, sobre o que sobra.`),
    };
  },
  // 13. isenção de R$ 20 mil em ações
  (r) => {
    const vendas = r.pick([15, 18, 25, 40]) * 1000, lucro = r.pick([2, 3, 5]) * 1000;
    const ir = vendas > 20000 ? lucro * 0.15 : 0;
    return {
      e: `Num mês, uma pessoa vendeu ${R(vendas)} em ações no mercado à vista (operações comuns), com lucro de ${R(lucro)}. Quanto deve de IR?`,
      r: ir,
      d: ir ? [0, lucro * 0.2, vendas * 0.15, lucro * 0.225] : [lucro * 0.15, lucro * 0.2, vendas * 0.15, lucro * 0.225],
      f: R,
      x: expl('isenção das vendas até R$ 20 mil por mês', 'Nas operações comuns com ações no mercado à vista, a pessoa física é isenta se o TOTAL VENDIDO no mês não passar de R$ 20 mil. Acima disso, paga 15% sobre o lucro.', vendas > 20000 ? `Vendeu ${R(vendas)} (mais de R$ 20 mil): 15% de ${R(lucro)} = ${R(ir)}.` : `Vendeu ${R(vendas)}: isento.`),
    };
  },
  // 14. day trade
  (r) => {
    const lucro = r.pick([1000, 2500, 4000, 800]);
    return {
      e: `Um investidor teve lucro de ${R(lucro)} com day trade de ações no mês. Qual é o IR devido?`,
      r: lucro * 0.2,
      d: [lucro * 0.15, 0, lucro * 0.225, lucro * 0.01],
      f: R,
      x: expl('day trade: 20%', 'Day trade (compra e venda no mesmo dia) paga 20% sobre o lucro e não tem a isenção de R$ 20 mil. Há ainda retenção na fonte de 1% (o "dedo-duro"), descontável do imposto.', `20% de ${R(lucro)} = ${R(lucro * 0.2)}.`),
    };
  },
  // 15. come-cotas
  (r) => {
    const rend = r.pick([1000, 2000, 3000, 4000]);
    const lp = r.pick([true, false]);
    return {
      e: `Num fundo de renda fixa ${lp ? 'de longo prazo' : 'de curto prazo'}, as cotas de um investidor renderam ${R(rend)} desde o último come-cotas. Quanto o come-cotas recolhe agora?`,
      r: rend * (lp ? 0.15 : 0.2),
      d: [rend * (lp ? 0.2 : 0.15), rend * 0.225, 0, rend * 0.1],
      f: R,
      x: expl('come-cotas (maio e novembro)', 'Em maio e novembro, o fundo antecipa o IR pela menor alíquota da sua classe: 15% nos fundos de longo prazo e 20% nos de curto prazo. No resgate, cobra-se a diferença, se houver.', `${lp ? 15 : 20}% de ${R(rend)} = ${R(rend * (lp ? 0.15 : 0.2))}.`),
    };
  },
  // 16. valor presente
  (r) => {
    const VF = r.pick([1100, 1210, 2000, 5000]), i = r.pick([10, 5]), n = VF === 1210 ? 2 : 1;
    const VP = VF / (1 + i / 100) ** n;
    return {
      e: `Quanto vale hoje um pagamento de ${R(VF)} que será recebido daqui a ${n} ano${n > 1 ? 's' : ''}, com taxa de desconto de ${i}% ao ano?`,
      r: VP,
      d: [VF * (1 - (i / 100) * n), VF * (1 + i / 100) ** n, VF - i, VF / (1 + (i / 100) * n) + 10],
      f: R,
      x: expl('VP = VF / (1 + i)ⁿ', 'Trazer a valor presente é desfazer os juros.', `${R(VF)} ÷ ${N(1 + i / 100)}^${n} = ${R(VP)}.`),
    };
  },
  // 17. rentabilidade de uma ação
  (r) => {
    const [c, v, d] = r.pick([[20, 23, 0.5], [40, 44, 1], [10, 9, 0.5], [50, 55, 0]]);
    const rent = ((v + d - c) / c) * 100;
    return {
      e: `Uma ação foi comprada a ${R(c)}, pagou ${R(d)} de dividendos e foi vendida a ${R(v)}. Qual foi a rentabilidade do período?`,
      r: rent,
      d: [((v - c) / c) * 100, ((v + d - c) / v) * 100, rent * 2, ((v - c - d) / c) * 100],
      f: pc,
      x: expl('rentabilidade = (ganho de preço + proventos) / preço pago', `(${R(v)} − ${R(c)} + ${R(d)}) ÷ ${R(c)}.`, `${pc(rent)}.`),
    };
  },
];

const medio = [
  // 1. LCA: taxa equivalente de CDB
  (r) => {
    const [cdb, dias] = r.pick([[120, 400], [110, 800], [100, 200], [115, 300]]);
    const eq = cdb * (1 - IR_RF(dias) / 100);
    return {
      e: `Um CDB paga ${cdb}% do CDI, com prazo de ${dias} dias. Qual taxa uma LCA (isenta) precisaria pagar para render o mesmo que esse CDB?`,
      r: eq,
      d: [cdb, cdb * 0.85, cdb / (1 - IR_RF(dias) / 100), cdb - IR_RF(dias) - 10],
      f: (v) => `${N(r2(v))}% do CDI`,
      x: expl('taxa isenta equivalente = taxa bruta · (1 − alíquota)', `${dias} dias ⇒ IR de ${N(IR_RF(dias))}%.`, `${cdb}% · ${N(1 - IR_RF(dias) / 100, 3)} = ${N(r2(eq))}% do CDI.`),
    };
  },
  // 2. rendimento líquido em 2 anos
  (r) => {
    const C = r.pick([10000, 20000, 5000]), i = r.pick([10, 12]);
    const bruto = C * ((1 + i / 100) ** 2 - 1);
    return {
      e: `${R(C)} são aplicados num CDB prefixado de ${i}% ao ano por 2 anos e 1 mês. Qual é o rendimento líquido de IR no resgate?`,
      r: bruto * 0.85,
      d: [bruto, bruto * 0.775, C * (i / 100) * 2 * 0.85, bruto * 0.825],
      f: R,
      x: expl('bruto composto, depois IR de 15%', `Bruto: ${R(C)} · (${N(1 + i / 100)}² − 1) = ${R(bruto)}. Prazo acima de 720 dias: IR de 15%.`, `Líquido: ${R(bruto)} · 0,85 = ${R(bruto * 0.85)}.`),
    };
  },
  // 3. juro real negativo
  (r) => {
    const [n, i] = r.pick([[8, 9], [5, 6], [10, 12], [4, 5]]);
    const real = ((1 + n / 100) / (1 + i / 100) - 1) * 100;
    return {
      e: `Uma aplicação rendeu ${n}% no ano, com inflação de ${i}%. O que aconteceu com o poder de compra do investidor?`,
      r: `caiu cerca de ${N(Math.abs(r2(real)))}%`,
      d: [`subiu ${n}%`, `subiu cerca de ${N(Math.abs(r2(real)))}%`, 'ficou igual', `caiu ${i}%`],
      x: expl('juro real = (1 + n)/(1 + i) − 1', `${N(1 + n / 100)} ÷ ${N(1 + i / 100)} − 1 ≈ ${pc(real)}.`, 'O rendimento nominal foi menor que a inflação: juro real negativo.'),
    };
  },
  // 4. SAC
  (r) => {
    const [PV, n, i] = r.pick([[120000, 120, 1], [240000, 240, 0.8], [60000, 60, 1.5], [100000, 100, 1]]);
    const A = PV / n, J = (PV * i) / 100;
    return {
      e: `Um financiamento de ${R(PV)} pelo SAC, em ${n} parcelas mensais, com juros de ${N(i)}% ao mês. Qual é o valor da 1ª parcela?`,
      r: A + J,
      d: [A, J, (PV * (1 + i / 100)) / n, A + J / 2],
      f: R,
      x: expl('SAC: amortização constante + juros sobre o saldo', `Amortização: ${R(PV)} ÷ ${n} = ${R(A)}. Juros do 1º mês: ${N(i)}% de ${R(PV)} = ${R(J)}.`, `Parcela: ${R(A + J)}. As seguintes vão diminuindo.`),
    };
  },
  // 5. Price
  (r) => {
    const [PV, i, n] = r.pick([[10000, 2, 12], [5000, 1, 10], [20000, 1.5, 24], [12000, 3, 6]]);
    const pmt = (PV * (i / 100)) / (1 - (1 + i / 100) ** -n);
    return {
      e: `Um empréstimo de ${R(PV)} será pago em ${n} parcelas mensais iguais (tabela Price), com juros de ${N(i)}% ao mês. Qual é o valor de cada parcela?`,
      r: pmt,
      d: [PV / n, (PV * (1 + (i / 100) * n)) / n, PV / n + (PV * i) / 100, pmt * 0.9],
      f: R,
      x: expl('PMT = PV · i / (1 − (1 + i)⁻ⁿ)', 'Na Price, as parcelas são iguais: no começo, quase tudo é juros; no fim, quase tudo é amortização.', `${R(PV)} · ${N(i / 100, 3)} ÷ (1 − ${N(1 + i / 100, 3)}^−${n}) ≈ ${R(pmt)}.`),
    };
  },
  // 6. rotativo do cartão
  (r) => {
    const f = r.pick([1000, 2000, 1500]), j = r.pick([12, 14, 10]);
    const saldo = f * 0.85;
    return {
      e: `A fatura do cartão era de ${R(f)}, e o cliente pagou só 15% (o mínimo). O saldo entra no rotativo com juros de ${j}% ao mês. Quanto ele deverá no mês seguinte, sem contar IOF e novas compras?`,
      r: saldo * (1 + j / 100),
      d: [f * (1 + j / 100), saldo, f * 0.15 * (1 + j / 100), saldo * (j / 100)],
      f: R,
      x: expl('juros sobre o saldo não pago', `Saldo: ${R(f)} − ${R(f * 0.15)} = ${R(saldo)}.`, `${R(saldo)} · ${N(1 + j / 100)} = ${R(saldo * (1 + j / 100))}. Pela regra atual, o rotativo só pode durar 30 dias; depois a dívida é parcelada, e os juros e encargos totais não podem passar de 100% da dívida original.`),
    };
  },
  // 7. desconto comercial simples
  (r) => {
    const [VN, n, d] = r.pick([[10000, 3, 2], [5000, 2, 3], [20000, 4, 1.5], [8000, 5, 2]]);
    const D = (VN * d * n) / 100;
    return {
      e: `Uma empresa antecipa no banco uma duplicata de ${R(VN)} que vence em ${n} meses, com taxa de desconto comercial simples de ${N(d)}% ao mês. Quanto ela recebe?`,
      r: VN - D,
      d: [VN / (1 + (d / 100) * n), VN - (VN * d) / 100, VN * (1 - d / 100) ** n, D],
      f: R,
      x: expl('desconto comercial (por fora): D = N · d · n', `D = ${R(VN)} · ${N(d / 100, 3)} · ${n} = ${R(D)}.`, `Recebe ${R(VN - D)}.`),
    };
  },
  // 8. taxa efetiva do desconto
  (r) => {
    const [VN, n, d] = r.pick([[10000, 3, 2], [5000, 2, 3], [20000, 4, 1.5]]);
    const D = (VN * d * n) / 100;
    const ef = (D / (VN - D)) * 100;
    return {
      e: `No desconto de uma duplicata de ${R(VN)}, com ${n} meses de antecipação e taxa comercial de ${N(d)}% ao mês, qual é a taxa efetiva do período, sobre o valor recebido?`,
      r: ef,
      d: [d * n, d, ef / n, (D / VN) * 100 / 2],
      f: pc,
      x: expl('taxa efetiva = desconto / valor liberado', `Desconto: ${R(D)}; valor liberado: ${R(VN - D)}.`, `${R(D)} ÷ ${R(VN - D)} ≈ ${pc(ef)} no período: maior que os ${N(d * n)}% nominais.`),
    };
  },
  // 9. poupança com Selic alta
  (r) => {
    const C = r.pick([1000, 5000, 10000]);
    const M = C * 1.005 ** 12;
    return {
      e: `Com a Selic acima de 8,5% ao ano e TR igual a zero, quanto terão ${R(C)} na poupança depois de 12 meses?`,
      r: M,
      d: [C * 1.06, C * (1 + 0.7 * 0.1), C * 1.005, M * 0.85],
      f: R,
      x: expl('0,5% ao mês, composto e isento', 'Acima de 8,5% de Selic, a poupança rende 0,5% ao mês + TR, capitalizado mês a mês, sem IR para pessoa física.', `${R(C)} · 1,005¹² ≈ ${R(M)} (cerca de 6,17% ao ano).`),
    };
  },
  // 10. compensação de prejuízo
  (r) => {
    const prej = r.pick([2000, 1500, 3000]), lucro = r.pick([5000, 6000, 8000]);
    return {
      e: `Em março, um investidor teve prejuízo de ${R(prej)} em operações comuns com ações. Em abril, vendeu R$ 50 mil e lucrou ${R(lucro)}, também em operações comuns. Qual é o IR de abril?`,
      r: (lucro - prej) * 0.15,
      d: [lucro * 0.15, (lucro - prej) * 0.2, 0, (lucro + prej) * 0.15],
      f: R,
      x: expl('prejuízo compensa lucro futuro (mesma modalidade)', `Lucro tributável: ${R(lucro)} − ${R(prej)} = ${R(lucro - prej)}.`, `15% · ${R(lucro - prej)} = ${R((lucro - prej) * 0.15)}. Prejuízo de operação comum compensa lucro de operação comum; o de day trade, só lucro de day trade.`),
    };
  },
  // 11. previdência regressiva
  (r) => {
    const anos = r.pick([1.5, 3, 5, 7, 9, 12]);
    return {
      e: `No regime regressivo de previdência (PGBL ou VGBL), qual é a alíquota de IR sobre um valor que ficou aplicado ${N(anos)} anos?`,
      r: PREV(anos),
      d: [35, 30, 25, 20, 15, 10, 22.5],
      f: pc,
      x: expl('tabela regressiva da previdência', 'Até 2 anos: 35%; 2 a 4: 30%; 4 a 6: 25%; 6 a 8: 20%; 8 a 10: 15%; acima de 10 anos: 10%. O prazo é contado para cada aporte.', `${N(anos)} anos ⇒ ${PREV(anos)}%.`),
    };
  },
  // 12. VGBL × PGBL no resgate
  (r) => {
    const ap = r.pick([100, 200, 80]), ganho = r.pick([50, 40, 20]);
    const saldo = ap + ganho;
    const vg = r.pick([true, false]);
    const base = vg ? ganho : saldo;
    return {
      e: `Num plano ${vg ? 'VGBL' : 'PGBL'} do regime regressivo, com mais de 10 anos, foram aportados R$ ${ap} mil e o saldo é de R$ ${saldo} mil. Quanto de IR incide no resgate total?`,
      r: base * 0.1,
      d: [(vg ? saldo : ganho) * 0.1, base * 0.15, base * 0.35, 0],
      f: (v) => `R$ ${N(r2(v))} mil`,
      x: expl(vg ? 'VGBL: IR só sobre o rendimento' : 'PGBL: IR sobre o valor total resgatado', vg ? 'No VGBL, os aportes não foram deduzidos do IR; no resgate, tributa-se só o ganho.' : 'No PGBL, os aportes foram deduzidos da base do IR; no resgate, tributa-se tudo.', `10% de R$ ${base} mil = R$ ${N(base * 0.1)} mil.`),
    };
  },
  // 13. VPL
  (r) => {
    const [inv, rec, i] = r.pick([[1000, 1210, 10], [1000, 1331, 10], [2000, 2420, 10], [1000, 1100, 5]]);
    const n = rec === 1331 ? 3 : 2;
    const vpl = rec / (1 + i / 100) ** n - inv;
    return {
      e: `Um projeto exige ${R(inv)} hoje e devolve ${R(rec)} daqui a ${n} anos. Com taxa de desconto de ${i}% ao ano, qual é o VPL?`,
      r: vpl,
      d: [rec - inv, rec / (1 + i / 100) - inv, vpl + 100, (rec - inv) / n],
      f: R,
      x: expl('VPL = VP das entradas − investimento', `VP = ${R(rec)} ÷ ${N(1 + i / 100)}^${n} = ${R(rec / (1 + i / 100) ** n)}.`, `VPL = ${R(vpl)}. ${Math.abs(vpl) < 0.01 ? 'VPL zero: o projeto rende exatamente a taxa de desconto.' : vpl > 0 ? 'VPL positivo: vale a pena.' : 'VPL negativo: não vale a pena.'}`),
    };
  },
  // 14. taxa anual → mensal
  (r) => {
    const [a, m] = r.pick([[26.82, 2], [12.68, 1], [42.58, 3], [6.17, 0.5]]);
    return {
      e: `Qual é a taxa mensal equivalente, em juros compostos, a ${N(a)}% ao ano?`,
      r: m,
      d: [a / 12, m * 1.2, a / 10, m / 2],
      f: (v) => `${N(r2(v))}% ao mês`,
      x: expl('(1 + i_m) = (1 + i_a)^(1/12)', `${N(1 + a / 100, 4)}^(1/12) ≈ ${N(1 + m / 100, 3)}.`, `≈ ${N(m)}% ao mês (dividir por 12 daria ${N(r2(a / 12))}%, um erro).`),
    };
  },
  // 15. rentabilidades acumuladas
  (r) => {
    const [a, b] = r.pick([[10, -10], [20, -20], [50, -50], [25, -20]]);
    const t = ((1 + a / 100) * (1 + b / 100) - 1) * 100;
    return {
      e: `Um fundo subiu ${a}% num ano e caiu ${Math.abs(b)}% no ano seguinte. Qual é a rentabilidade acumulada nos dois anos?`,
      r: t,
      d: [a + b, a, b, -t],
      f: pc,
      x: expl('rentabilidades se acumulam multiplicando', `(1 + ${N(a / 100)}) · (1 − ${N(Math.abs(b) / 100)}) = ${N(r2(1 + t / 100))}.`, `Acumulado: ${pc(t)}. Uma queda pesa mais que uma alta de mesmo percentual.`),
    };
  },
  // 16. inflação acumulada
  (r) => {
    const [a, b] = r.pick([[5, 4], [10, 10], [6, 3], [4, 4]]);
    const t = ((1 + a / 100) * (1 + b / 100) - 1) * 100;
    return {
      e: `O IPCA foi de ${a}% num ano e de ${b}% no seguinte. Qual é a inflação acumulada nos dois anos?`,
      r: t,
      d: [a + b, (a + b) / 2, a * b, t + 1],
      f: pc,
      x: expl('índices se acumulam multiplicando', `${N(1 + a / 100)} · ${N(1 + b / 100)} = ${N(1 + t / 100, 4)}.`, `Acumulada: ${pc(t)}.`),
    };
  },
  // 17. fundo DI com taxa de administração
  (r) => {
    const cdi = r.pick([10, 12, 14]), adm = r.pick([0.5, 1, 1.5]);
    const bruto = cdi - adm;
    return {
      e: `Um fundo DI acompanha o CDI de ${cdi}% ao ano, mas cobra taxa de administração de ${N(adm)}% ao ano. Para um cotista que fica mais de 2 anos, quanto ele rende líquido de IR, por ano, aproximadamente?`,
      r: bruto * 0.85,
      d: [bruto, cdi * 0.85, cdi * 0.85 - adm, bruto * 0.8],
      f: (v) => `${N(r2(v))}% ao ano`,
      x: expl('primeiro a taxa, depois o IR', `A taxa de administração já sai da cota: ${cdi}% − ${N(adm)}% = ${N(bruto)}%.`, `IR de 15%: ${N(bruto)}% · 0,85 ≈ ${N(r2(bruto * 0.85))}% ao ano.`),
    };
  },
];

const dificil = [
  // 1. PU de LTN
  (r) => {
    const [i, anos] = r.pick([[10, 1], [10, 2], [12, 1], [8, 2]]);
    const pu = 1000 / (1 + i / 100) ** anos;
    return {
      e: `Uma LTN (Tesouro Prefixado), que paga R$ 1.000 no vencimento, faltando ${anos} ano${anos > 1 ? 's' : ''} (${252 * anos} dias úteis), é negociada à taxa de ${i}% ao ano. Qual é o seu preço (PU)?`,
      r: pu,
      d: [1000 * (1 - (i / 100) * anos), 1000 / (1 + (i / 100) * anos), 1000, pu * 1.02],
      f: R,
      x: expl('PU = 1.000 / (1 + i)^(du/252)', 'Título prefixado sem cupom: o preço é o valor de face trazido a valor presente.', `1.000 ÷ ${N(1 + i / 100)}^${anos} = ${R(pu)}.`),
    };
  },
  // 2. marcação a mercado
  (r) => {
    const [i1, i2] = r.pick([[10, 12], [10, 8], [12, 15], [9, 7]]);
    const p1 = 1000 / (1 + i1 / 100), p2 = 1000 / (1 + i2 / 100);
    const v = (p2 / p1 - 1) * 100;
    return {
      e: `Um investidor comprou uma LTN com 1 ano até o vencimento, à taxa de ${i1}% ao ano. Logo depois, a taxa de mercado ${i2 > i1 ? 'subiu' : 'caiu'} para ${i2}%. Qual foi o efeito imediato da marcação a mercado no preço?`,
      r: `${v < 0 ? 'queda' : 'alta'} de cerca de ${N(Math.abs(r2(v)))}%`,
      d: [`${v < 0 ? 'alta' : 'queda'} de cerca de ${N(Math.abs(r2(v)))}%`, 'nenhum: título prefixado tem preço fixo', `${v < 0 ? 'queda' : 'alta'} de ${Math.abs(i2 - i1)}%`, 'nenhum até o vencimento'],
      x: expl('taxa sobe, preço cai (e vice-versa)', `PU antes: 1.000 ÷ ${N(1 + i1 / 100)} = ${R(p1)}. Depois: 1.000 ÷ ${N(1 + i2 / 100)} = ${R(p2)}.`, `Variação: ${pc(v)}. Quem leva até o vencimento recebe a taxa contratada; a oscilação só se realiza se vender antes.`),
    };
  },
  // 3. LCI × CDB com prazo curto
  (r) => {
    const [lci, cdb, dias] = r.pick([[92, 112, 200], [88, 110, 150], [90, 118, 300]]);
    const liq = cdb * (1 - IR_RF(dias) / 100);
    return {
      e: `Para ${dias} dias, quanto rende líquido, em % do CDI, um CDB de ${cdb}% do CDI, e como ele se compara a uma LCI de ${lci}% do CDI?`,
      r: `${N(r2(liq))}% do CDI; ${liq > lci ? 'o CDB rende mais' : 'a LCI rende mais'}`,
      d: [`${cdb}% do CDI; o CDB rende mais`, `${N(r2(cdb * 0.85))}% do CDI; ${cdb * 0.85 > lci ? 'o CDB rende mais' : 'a LCI rende mais'}`, `${N(r2(liq))}% do CDI; ${liq > lci ? 'a LCI rende mais' : 'o CDB rende mais'}`, `${N(r2(cdb * 0.775))}% do CDI; rendem igual`],
      x: expl('IR pelo prazo da aplicação', `${dias} dias ⇒ ${N(IR_RF(dias))}%. ${cdb}% · ${N(1 - IR_RF(dias) / 100, 3)} = ${N(r2(liq))}% do CDI.`, `Comparado aos ${lci}% isentos da LCI: ${liq > lci ? 'o CDB' : 'a LCI'} rende mais.`),
    };
  },
  // 4. rendimento real líquido
  (r) => {
    const [n, i] = r.pick([[12, 4], [14, 5], [10, 4], [15, 6]]);
    const liq = n * 0.85, real = ((1 + liq / 100) / (1 + i / 100) - 1) * 100;
    return {
      e: `Um CDB de longo prazo rendeu ${n}% brutos no ano (IR de 15%). A inflação foi de ${i}%. Qual foi o ganho real líquido?`,
      r: real,
      d: [n - i, liq - i + 1, ((1 + n / 100) / (1 + i / 100) - 1) * 100, real / 2],
      f: pc,
      x: expl('primeiro o IR, depois a inflação', `Líquido: ${n}% · 0,85 = ${N(r2(liq))}%.`, `Real: ${N(1 + liq / 100, 4)} ÷ ${N(1 + i / 100)} − 1 ≈ ${pc(real)}.`),
    };
  },
  // 5. juros totais na Price
  (r) => {
    const [PV, i, n] = r.pick([[10000, 2, 12], [5000, 1, 10], [12000, 3, 6]]);
    const pmt = (PV * (i / 100)) / (1 - (1 + i / 100) ** -n);
    return {
      e: `Um empréstimo de ${R(PV)} em ${n} parcelas iguais (Price) a ${N(i)}% ao mês tem parcela de ${R(pmt)}. Quanto se paga de juros no total?`,
      r: pmt * n - PV,
      d: [(PV * i * n) / 100, pmt * n, pmt - PV / n, (PV * i) / 100],
      f: R,
      x: expl('juros totais = soma das parcelas − valor emprestado', `${n} · ${R(pmt)} = ${R(pmt * n)}.`, `Juros: ${R(pmt * n - PV)}.`),
    };
  },
  // 6. cheque especial
  (r) => {
    const [s, dias, j] = r.pick([[2000, 10, 8], [1500, 15, 6], [3000, 6, 8], [1000, 20, 7.5]]);
    const juros = (s * (j / 100) * dias) / 30;
    return {
      e: `Um cliente ficou ${dias} dias com saldo devedor de ${R(s)} no cheque especial, com taxa de ${N(j)}% ao mês. Quanto pagou de juros, proporcionalmente aos dias (sem IOF)?`,
      r: juros,
      d: [(s * j) / 100, juros * 2, (s * j * dias) / 100, juros / 2],
      f: R,
      x: expl('juros pro rata dia', `Taxa diária: ${N(j)}% ÷ 30.`, `${R(s)} · ${N(j / 100, 3)} · ${dias}/30 = ${R(juros)}. Desde 2020, o juro do cheque especial é limitado a 8% ao mês.`),
    };
  },
  // 7. TIR
  (r) => {
    const [inv, rec, n, tir] = r.pick([[1000, 1210, 2, 10], [1000, 1440, 2, 20], [2000, 2662, 3, 10], [500, 605, 2, 10]]);
    return {
      e: `Um investimento de ${R(inv)} devolve ${R(rec)} em um único pagamento daqui a ${n} anos. Qual é a sua TIR?`,
      r: tir,
      d: [((rec - inv) / inv) * 100, (((rec - inv) / inv) * 100) / n, tir * 2, tir - 1],
      f: (v) => `${N(r2(v))}% ao ano`,
      x: expl('TIR: a taxa que zera o VPL', `${R(inv)} · (1 + TIR)^${n} = ${R(rec)} ⇒ (1 + TIR)^${n} = ${N(rec / inv, 3)}.`, `TIR = ${tir}% ao ano.`),
    };
  },
  // 8. payback
  (r) => {
    const [inv, fc] = r.pick([[12000, 3000], [50000, 10000], [9000, 2000], [20000, 8000]]);
    return {
      e: `Um projeto custa ${R(inv)} e gera ${R(fc)} por ano. Qual é o payback simples?`,
      r: inv / fc,
      d: [fc / inv, (inv / fc) * 2, inv / fc + 1, inv / fc / 2],
      f: (v) => `${N(r2(v))} anos`,
      x: expl('payback = tempo para recuperar o investimento', 'O payback simples não considera o valor do dinheiro no tempo; o descontado, sim.', `${R(inv)} ÷ ${R(fc)} = ${N(r2(inv / fc))} anos.`),
    };
  },
  // 9. retorno esperado da carteira
  (r) => {
    const [w, a, b] = r.pick([[60, 10, 15], [70, 8, 20], [50, 12, 6], [80, 9, 14]]);
    const e = (w * a + (100 - w) * b) / 100;
    return {
      e: `Uma carteira tem ${w}% num ativo com retorno esperado de ${a}% e ${100 - w}% noutro com ${b}%. Qual é o retorno esperado da carteira?`,
      r: e,
      d: [(a + b) / 2, a + b, (w * b + (100 - w) * a) / 100, Math.max(a, b)],
      f: pc,
      x: expl('média ponderada pelos pesos', `${N(w / 100)} · ${a}% + ${N((100 - w) / 100)} · ${b}%.`, `= ${pc(e)}.`),
    };
  },
  // 10. desconto de duplicata com prazo em dias
  (r) => {
    const [VN, dias, d] = r.pick([[5000, 60, 3], [12000, 45, 2], [8000, 90, 2.5]]);
    const D = (VN * (d / 100) * dias) / 30;
    return {
      e: `Uma duplicata de ${R(VN)} é antecipada ${dias} dias antes do vencimento, com desconto comercial simples de ${N(d)}% ao mês. Qual é o valor líquido liberado?`,
      r: VN - D,
      d: [VN - (VN * d) / 100, VN / (1 + ((d / 100) * dias) / 30), D, VN - D / 2],
      f: R,
      x: expl('D = N · d · prazo (em meses)', `${dias} dias = ${N(dias / 30)} meses. D = ${R(VN)} · ${N(d / 100, 3)} · ${N(dias / 30)} = ${R(D)}.`, `Líquido: ${R(VN - D)}.`),
    };
  },
  // 11. poupança × CDB
  (r) => {
    const cdi = r.pick([10, 12, 14]);
    const liq = cdi * 0.8;
    return {
      e: `Para 1 ano (360 dias), com Selic e CDI em ${cdi}% ao ano e TR zero, qual rende mais: a poupança ou um CDB de 100% do CDI?`,
      r: `o CDB: cerca de ${N(r2(liq))}% líquidos, contra 6,17% da poupança`,
      d: [`a poupança, por ser isenta de IR`, `o CDB: ${cdi}% contra 6,17% da poupança`, `rendem igual`, `a poupança: ${N(r2(0.7 * cdi))}% contra ${N(r2(liq))}% do CDB`],
      x: expl('compare líquido com líquido', `360 dias estão na faixa de 181 a 360 dias: IR de 20%. CDB líquido: ${cdi}% · 0,8 = ${N(r2(liq))}%. A poupança, com Selic acima de 8,5%, rende 0,5% ao mês: cerca de 6,17% ao ano, isentos.`, 'O CDB rende mais.'),
    };
  },
  // 12. debênture com cupom
  (r) => {
    const [cup, taxa] = r.pick([[10, 10], [10, 12], [12, 10], [8, 10]]);
    const preco = (1000 * cup) / 100 / (1 + taxa / 100) + (1000 * (1 + cup / 100)) / (1 + taxa / 100) ** 2;
    return {
      e: `Uma debênture de valor nominal R$ 1.000 paga cupom anual de ${cup}% e vence em 2 anos. Se a taxa exigida pelo mercado é ${taxa}% ao ano, qual é o seu preço justo?`,
      r: preco,
      d: [1000, preco + 50, (1000 * (1 + (cup / 100) * 2)) / (1 + taxa / 100) ** 2, 1000 * (1 + cup / 100)],
      f: R,
      x: expl('preço = VP de cada fluxo', `Fluxos: ${R(cup * 10)} em 1 ano e ${R(1000 + cup * 10)} em 2 anos, descontados a ${taxa}%.`, `${R(preco)}. ${cup === taxa ? 'Cupom igual à taxa: preço ao par.' : cup > taxa ? 'Cupom maior que a taxa: ágio.' : 'Cupom menor que a taxa: deságio.'}`),
    };
  },
  // 13. NTN-B
  (r) => {
    const [ipca, real] = r.pick([[4, 6], [5, 5], [3, 7], [4.5, 6]]);
    const nom = ((1 + ipca / 100) * (1 + real / 100) - 1) * 100;
    return {
      e: `Um título Tesouro IPCA+ paga IPCA + ${real}% ao ano. Se o IPCA do ano for ${N(ipca)}%, qual será a rentabilidade nominal bruta?`,
      r: nom,
      d: [ipca + real, real, ipca * real, nom - 1],
      f: pc,
      x: expl('Fisher ao contrário', `(1 + ${N(ipca / 100)}) · (1 + ${N(real / 100)}) = ${N(1 + nom / 100, 4)}.`, `${pc(nom)} (a soma simples daria ${N(ipca + real)}%).`),
    };
  },
  // 14. day trade misturado
  (r) => {
    const [ltot, ldt, vendas] = r.pick([[4000, 2000, 19000], [5000, 1000, 15000], [3000, 3000, 12000]]);
    return {
      e: `Num mês, as vendas de ações de um investidor somaram ${R(vendas)}. O lucro foi de ${R(ltot)}, dos quais ${R(ldt)} vieram de day trade. Qual é o IR devido?`,
      r: ldt * 0.2,
      d: [ltot * 0.15, 0, ltot * 0.2, (ltot - ldt) * 0.15 + ldt * 0.2],
      f: R,
      x: expl('a isenção de R$ 20 mil não vale para day trade', `As operações comuns ficam isentas (vendas abaixo de R$ 20 mil). O lucro de day trade paga 20%.`, `20% · ${R(ldt)} = ${R(ldt * 0.2)}.`),
    };
  },
  // 15. IOF + IR no resgate rápido
  (r) => {
    const [rend, dia] = r.pick([[100, 15], [200, 10], [150, 20]]);
    const iof = (rend * IOF[dia]) / 100;
    const ir = (rend - iof) * 0.225;
    return {
      e: `Um CDB rendeu ${R(rend)} e foi resgatado no ${dia}º dia. Quanto o investidor recebe de rendimento líquido, depois de IOF e IR?`,
      r: rend - iof - ir,
      d: [rend * 0.775, rend - iof, rend - (rend * IOF[dia]) / 100 - rend * 0.225, rend * (1 - IOF[dia] / 100) * 0.85],
      f: R,
      x: expl('IOF primeiro; IR sobre o que sobra', `IOF: ${IOF[dia]}% de ${R(rend)} = ${R(iof)}. Base do IR: ${R(rend - iof)}; IR de 22,5% = ${R(ir)}.`, `Líquido: ${R(rend - iof - ir)}.`),
    };
  },
  // 16. retorno de carteira com perda
  (r) => {
    const [w1, a1, a2] = r.pick([[40, -10, 20], [30, -20, 15], [50, -5, 10]]);
    const e = (w1 * a1 + (100 - w1) * a2) / 100;
    return {
      e: `Num ano, ${w1}% de uma carteira estava em ações, que caíram ${Math.abs(a1)}%, e ${100 - w1}% em renda fixa, que rendeu ${a2}%. Qual foi o resultado da carteira?`,
      r: e,
      d: [(a1 + a2) / 2, a2, a1 + a2, (w1 * a2 + (100 - w1) * a1) / 100],
      f: pc,
      x: expl('média ponderada (diversificação)', `${N(w1 / 100)} · (${a1}%) + ${N((100 - w1) / 100)} · ${a2}%.`, `= ${pc(e)}. A renda fixa amorteceu a queda das ações.`),
    };
  },
];

export default [
  {
    disciplina: 'cpa',
    arquivo: '03-calculos-financeiros-e-tributacao',
    titulo: 'Cálculos financeiros e tributação de investimentos',
    provas: ['Certificações'],
    descricao: 'Juros, taxas equivalentes e reais (Fisher), valor presente, VPL e TIR, SAC e Price, desconto bancário, IR e IOF de investimentos, come-cotas, previdência, FGC e comparação de rentabilidade líquida.',
    fonte: 'Questão inédita (estilo CPA/ANBIMA)',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
