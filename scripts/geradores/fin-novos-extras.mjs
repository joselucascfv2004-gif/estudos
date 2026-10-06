// Matemática financeira — modelos acrescentados em 2026 para levar os dois tópicos a 50 questões.
// Entram no fim de cada nível (ver `novos` em util.mjs), sem mudar as questões antigas.
import { expl, num } from './util.mjs';

const R$ = (v) => `R$ ${num(v, 2)}`;
const pct = (v) => `${num(v)}%`;
const inteiro = (v) => Math.abs(v - Math.round(v)) < 1e-9;
const ate = (gerar, ok) => {
  for (let i = 0; i < 500; i++) {
    const v = gerar();
    if (ok(v)) return v;
  }
  throw new Error('sem combinação válida');
};

// ------------------------------------------------------------- 01 Juros simples e compostos
const juros = [
  [
    (r) => {
      const [C, i, J] = ate(() => [r.pick([1000, 2000, 2500, 4000, 5000]), r.pick([1, 2, 2.5, 4, 5]), r.pick([200, 300, 400, 500, 600, 1000])], ([C, i, J]) => inteiro(J / ((C * i) / 100)));
      const t = J / ((C * i) / 100);
      return {
        e: `Um capital de ${R$(C)}, a juros simples de ${num(i)}% ao mês, rendeu ${R$(J)} de juros. Por quantos meses ficou aplicado?`,
        r: t,
        d: [(C * i) / J, J / i, J / C, t * 2],
        f: (v) => `${num(v)} meses`,
        x: expl('juros simples: t = J ÷ (C·i)', 'Cada mês rende C·i; divida o total de juros pelo rendimento mensal.', `${R$(C)} × ${num(i)}% = ${R$((C * i) / 100)} por mês; ${R$(J)} ÷ ${R$((C * i) / 100)} = ${num(t)} meses.`),
      };
    },
    (r) => {
      const [J, i, t] = ate(() => [r.pick([120, 240, 300, 360, 600]), r.pick([1, 2, 3, 5]), r.pick([2, 3, 4, 6])], ([J, i, t]) => inteiro((J * 100) / (i * t)));
      const C = (J * 100) / (i * t);
      return {
        e: `Uma aplicação a juros simples de ${i}% ao mês rendeu ${R$(J)} em ${t} meses. Qual foi o capital aplicado?`,
        r: C,
        d: [J * i * t, (J * 100) / i, C + J, (J * t) / i],
        f: R$,
        x: expl('juros simples: C = J ÷ (i·t)', 'Isole o capital na fórmula J = C·i·t (taxa em decimal).', `C = ${num(J)} ÷ (${num(i / 100)} × ${t}) = ${R$(C)}.`),
      };
    },
    (r) => {
      const i = r.pick([2, 4, 5, 10]);
      return {
        e: `A juros simples de ${i}% ao mês, em quantos meses um capital dobra de valor?`,
        r: 100 / i,
        d: [i * 2, 100 / (2 * i), 200 / i, Math.log(2) / Math.log(1 + i / 100)],
        f: (v) => `${num(v)} meses`,
        x: expl('dobrar = juros iguais ao capital', 'Os juros precisam somar 100% do capital: i·t = 100%.', `${i}% × t = 100% → t = ${num(100 / i)} meses.`),
      };
    },
    (r) => {
      const i = r.pick([1, 2, 3, 5]), t = r.pick([6, 10, 12, 18]);
      return {
        e: `A juros simples de ${i}% ao mês, quanto por cento o capital terá rendido, no total, em ${t} meses?`,
        r: i * t,
        d: [i, (1 + i / 100) ** t * 100 - 100, i * t * 2, i + t],
        f: pct,
        x: expl('juros simples: taxa total = i·t', 'Nos juros simples, as taxas de cada mês apenas se somam.', `${i}% × ${t} = ${i * t}%.`),
      };
    },
    (r) => {
      const C = r.pick([1000, 2000, 5000, 10000]), i = r.pick([2, 5, 10]);
      const dif = (C * (i / 100) ** 2);
      return {
        e: `Um capital de ${R$(C)} fica aplicado por 2 meses a ${i}% ao mês. Quanto a mais ele rende a juros compostos do que a juros simples?`,
        r: dif,
        d: [(C * i) / 100, (C * 2 * i) / 100, dif * 2, 0],
        f: R$,
        x: expl('juros sobre juros', 'No 2º mês, os compostos também rendem sobre os juros do 1º mês: a diferença é C·i².', `${R$(C)} × (${num(i / 100)})² = ${R$(dif)}.`),
      };
    },
  ],
  [
    (r) => {
      const av = r.pick([900, 950, 960, 800]), prazo = 1000;
      const tx = (prazo / av - 1) * 100;
      return {
        e: `Uma loja vende um produto por ${R$(prazo)} para pagamento em 30 dias ou por ${R$(av)} à vista. Qual é a taxa de juros mensal embutida no preço a prazo?`,
        r: tx,
        d: [((prazo - av) / prazo) * 100, prazo - av, tx * 2, tx / 2],
        f: pct,
        x: expl('taxa = juros ÷ valor financiado', `Quem compra a prazo "pega emprestado" o valor à vista (${R$(av)}) e paga ${R$(prazo)}.`, `${num(prazo - av)} ÷ ${num(av)} = ${num(tx)}% ao mês.`),
      };
    },
    (r) => {
      const [i1, i2] = r.pick([[2, 3], [1, 2], [5, 4], [10, 10], [0.5, 1]]);
      const ac = ((1 + i1 / 100) * (1 + i2 / 100) - 1) * 100;
      return {
        e: `A inflação foi de ${num(i1)}% em um mês e de ${num(i2)}% no mês seguinte. Qual foi a inflação acumulada nos dois meses?`,
        r: ac,
        d: [i1 + i2, i1 * i2, (i1 + i2) / 2, ac + 1],
        f: pct,
        x: expl('taxas acumuladas se multiplicam', 'Multiplique os fatores (1 + taxa) e tire 1.', `${num(1 + i1 / 100, 3)} × ${num(1 + i2 / 100, 3)} = ${num(1 + ac / 100, 4)} → ${num(ac)}%.`),
      };
    },
    (r) => {
      const C = r.pick([1000, 2000, 5000]), i = r.pick([4, 10, 20]);
      const simples = C * (1 + i / 200), comp = C * Math.sqrt(1 + i / 100);
      return {
        e: `Um capital de ${R$(C)} é aplicado por meio mês (meio período) a ${i}% ao mês. Qual modalidade dá o maior montante, e quanto ele vale?`,
        r: `juros simples: ${R$(simples)}`,
        d: [`juros compostos: ${R$(comp)}`, `juros compostos: ${R$(simples)}`, `os dois dão ${R$(simples)}`, `juros simples: ${R$(C * (1 + i / 100))}`],
        x: expl('para t < 1, juros simples rendem mais', 'Com menos de um período, (1 + i)^t fica abaixo de 1 + i·t.', `Simples: ${R$(C)} × (1 + ${num(i / 200, 3)}) = ${R$(simples)}; compostos: ${R$(C)} × √${num(1 + i / 100, 2)} ≈ ${R$(comp)}.`),
      };
    },
    (r) => {
      const ap = r.pick([1000, 5000, 10000]), rend = r.pick([8, 10, 12]), ir = r.pick([15, 17.5, 20, 22.5]);
      const liq = rend * (1 - ir / 100);
      return {
        e: `Um investimento de ${R$(ap)} rendeu ${rend}% no período. O imposto de renda de ${num(ir)}% incide só sobre o rendimento. Qual foi a rentabilidade líquida?`,
        r: liq,
        d: [rend - ir, rend, rend * (ir / 100), liq + 1],
        f: pct,
        x: expl('IR sobre o ganho: líquida = bruta × (1 − alíquota)', 'O imposto tira uma fração do rendimento, não da taxa "em pontos".', `${rend}% × (1 − ${num(ir / 100, 3)}) = ${num(liq)}%.`),
      };
    },
    (r) => {
      const V = r.pick([200, 300, 500, 800]), dias = r.pick([10, 15, 20, 30]);
      const multa = V * 0.02, juros = V * 0.01 * (dias / 30);
      return {
        e: `Uma conta de ${R$(V)} foi paga com ${dias} dias de atraso. Há multa de 2% e juros de mora de 1% ao mês, proporcionais aos dias (mês de 30 dias). Quanto foi pago?`,
        r: V + multa + juros,
        d: [V + multa, V + juros, V * 1.03, V * 0.03, V + multa + juros * 2],
        f: R$,
        x: expl('multa (fixa) + juros proporcionais ao tempo', `Multa: 2% de ${num(V)} = ${R$(multa)}. Juros: 1% × ${dias}/30 de ${num(V)} = ${R$(juros)}.`, `Total: ${R$(V + multa + juros)}.`),
      };
    },
    (r) => {
      const C = r.pick([1000, 2000, 5000]), i = r.pick([1, 2]), n = r.pick([3, 6]);
      const fat = { '1,3': 3.0301, '1,6': 6.152, '2,3': 3.0604, '2,6': 6.3081 }[`${i},${n}`];
      return {
        e: `Uma pessoa deposita ${R$(C)} no fim de cada mês, durante ${n} meses, numa aplicação de ${i}% ao mês (juros compostos). Usando o fator de acumulação ${num(fat, 4)}, quanto terá logo após o último depósito?`,
        r: C * fat,
        d: [C * n, C * n * (1 + i / 100), C * (1 + i / 100) ** n, C * fat * (1 + i / 100)],
        f: R$,
        x: expl('valor futuro de uma série de depósitos = parcela × fator de acumulação', 'Cada depósito rende por um tempo diferente; o fator já soma tudo.', `${R$(C)} × ${num(fat, 4)} = ${R$(C * fat)}.`),
      };
    },
  ],
  [
    (r) => {
      const [P, ent] = r.pick([[1000, 520], [600, 315], [2000, 1050], [800, 420]]);
      const fin = P - ent, tx = (ent / fin - 1) * 100;
      return {
        e: `Um produto custa ${R$(P)} à vista ou duas parcelas de ${R$(ent)} (uma no ato e outra em 30 dias). Qual é a taxa de juros mensal desse parcelamento?`,
        r: tx,
        d: [((2 * ent - P) / P) * 100, ((2 * ent) / P - 1) * 100 * 2, ((ent - P / 2) / ent) * 100, tx / 2],
        f: pct,
        x: expl('desconte a entrada: o financiado é o que falta pagar hoje', `Pagando ${R$(ent)} na hora, sobram ${R$(fin)} de dívida, quitados com ${R$(ent)} um mês depois.`, `${num(ent)} ÷ ${num(fin)} − 1 = ${num(tx)}% ao mês.`),
      };
    },
    (r) => {
      const [nom, inf] = r.pick([[4, 6], [5, 8], [3, 4], [6, 10], [2, 5]]);
      const real = ((1 + nom / 100) / (1 + inf / 100) - 1) * 100;
      return {
        e: `Uma aplicação rendeu ${nom}% num ano em que a inflação foi de ${inf}%. Qual foi a taxa real de juros?`,
        r: real,
        d: [nom - inf, inf - nom, -real, real * 2],
        f: (v) => `${v < 0 ? '−' : ''}${num(Math.abs(v))}%`,
        x: expl('fórmula de Fisher: (1 + real) = (1 + nominal)/(1 + inflação)', 'Se a inflação supera o rendimento, a taxa real é negativa: o poder de compra caiu.', `${num(1 + nom / 100, 2)} ÷ ${num(1 + inf / 100, 2)} = ${num(1 + real / 100, 4)} → ${num(real)}%.`),
      };
    },
    (r) => {
      const im = r.pick([0.5, 1]);
      const fat = im === 0.5 ? 1.0617 : 1.1268;
      return {
        e: `A inflação foi de ${num(im)}% ao mês durante 12 meses seguidos. Qual foi a inflação acumulada no ano? (use 1,${im === 0.5 ? '005' : '01'}¹² ≈ ${num(fat, 4)})`,
        r: (fat - 1) * 100,
        d: [im * 12, im * 12 * 1.1, (fat - 1) * 10, im],
        f: pct,
        x: expl('taxas mensais se acumulam de forma composta', 'Doze meses seguidos multiplicam o fator mensal doze vezes.', `${num(fat, 4)} − 1 = ${num((fat - 1) * 100)}% (mais que ${num(im * 12)}%).`),
      };
    },
    (r) => {
      const [cdb, ir] = r.pick([[100, 15], [110, 17.5], [105, 20], [120, 22.5], [95, 15]]);
      const liq = cdb * (1 - ir / 100);
      return {
        e: `Um CDB paga ${cdb}% do CDI e terá IR de ${num(ir)}% sobre o rendimento. Qual percentual do CDI uma LCI (isenta de IR) precisa pagar para render o mesmo, líquido?`,
        r: liq,
        d: [cdb - ir, cdb, cdb / (1 - ir / 100), liq - 5],
        f: (v) => `${num(v)}% do CDI`,
        x: expl('taxa equivalente líquida = taxa bruta × (1 − alíquota)', 'Compare líquido com líquido.', `${cdb}% × (1 − ${num(ir / 100, 3)}) = ${num(liq)}% do CDI.`),
      };
    },
    (r) => {
      const C = r.pick([36500, 73000, 18250, 36000]), i = r.pick([12, 18, 24]), dias = r.pick([30, 60, 90]);
      const com = C * (i / 100) * (dias / 360), exato = C * (i / 100) * (dias / 365);
      return {
        e: `Um capital de ${R$(C)} fica aplicado ${dias} dias a juros simples de ${i}% ao ano. Qual é a diferença entre os juros comerciais (ano de 360 dias) e os exatos (ano de 365 dias)?`,
        r: com - exato,
        d: [com, exato, (com - exato) * 2, C * (i / 100) * (5 / 365)],
        f: R$,
        x: expl('juros comerciais × exatos', 'A única diferença é o número de dias do ano: 360 (comercial) ou 365 (exato).', `${R$(com)} − ${R$(exato)} = ${R$(com - exato)}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 02 Descontos e amortização
const descontos = [
  [
    (r) => {
      const [N, D, t] = ate(() => [r.pick([1000, 2000, 4000, 5000]), r.pick([60, 80, 100, 150, 200, 300]), r.pick([2, 3, 4])], ([N, D, t]) => inteiro(((D / (N * t)) * 100) * 10));
      const i = (D / (N * t)) * 100;
      return {
        e: `Um título de ${R$(N)} foi descontado ${t} meses antes do vencimento, com desconto comercial simples de ${R$(D)}. Qual foi a taxa mensal de desconto?`,
        r: i,
        d: [(D / N) * 100, (D / (N - D) / t) * 100, i * t, D / t],
        f: pct,
        x: expl('desconto comercial: D = N·i·t, isolando i', 'A taxa incide sobre o valor nominal.', `i = ${num(D)} ÷ (${num(N)} × ${t}) = ${num(i)}% ao mês.`),
      };
    },
    (r) => {
      const [N, i, t] = ate(() => [r.pick([1000, 2000, 5000, 10000]), r.pick([2, 3, 4, 5]), r.pick([1, 2, 3])], () => true);
      const A = N * (1 - (i / 100) * t);
      return {
        e: `Ao descontar uma duplicata ${t} ${t === 1 ? 'mês' : 'meses'} antes do vencimento, a ${i}% ao mês (desconto comercial simples), uma empresa recebeu ${R$(A)}. Qual era o valor nominal?`,
        r: N,
        d: [A * (1 + (i / 100) * t), A + (A * i * t) / 100 / 2, A / (1 + (i / 100) * t), A * (1 + i / 100), N + (N - A)],
        f: R$,
        x: expl('valor atual comercial: A = N·(1 − i·t), isolando N', 'O desconto foi calculado sobre o nominal, então divida pelo fator (1 − i·t).', `N = ${num(A, 2)} ÷ ${num(1 - (i / 100) * t, 2)} = ${R$(N)}.`),
      };
    },
    (r) => {
      const P = r.pick([250, 500, 812.5, 1200]), n = r.pick([4, 6, 10, 12]);
      return {
        e: `Um financiamento pela tabela Price tem ${n} prestações iguais de ${R$(P)}. Quanto o cliente paga no total?`,
        r: P * n,
        d: [P, P * n * 1.1, P * (n - 1), P * n / 2],
        f: R$,
        x: expl('Price: parcelas iguais', 'O total é o número de prestações vezes o valor de cada uma.', `${n} × ${R$(P)} = ${R$(P * n)}.`),
      };
    },
    (r) => {
      const [N, i, D] = ate(() => [r.pick([2000, 3000, 4000, 6000]), r.pick([2, 2.5, 3, 4]), r.pick([120, 180, 240, 360])], ([N, i, D]) => inteiro(D / ((N * i) / 100)));
      const t = D / ((N * i) / 100);
      return {
        e: `Um título de ${R$(N)} sofreu desconto comercial simples de ${R$(D)} à taxa de ${num(i)}% ao mês. Quantos meses antes do vencimento foi descontado?`,
        r: t,
        d: [D / i, (N * i) / D, t * 2, D / N],
        f: (v) => `${num(v)} ${v === 1 ? 'mês' : 'meses'}`,
        x: expl('desconto comercial: t = D ÷ (N·i)', 'Cada mês de antecipação tira N·i do valor.', `${R$(N)} × ${num(i)}% = ${R$((N * i) / 100)} por mês; ${num(D)} ÷ ${num((N * i) / 100)} = ${num(t)}.`),
      };
    },
    (r) => {
      const N = r.pick([1100, 2200, 3300, 5500]), i = 10;
      return {
        e: `Qual é o valor atual de um título de ${R$(N)}, descontado 1 mês antes do vencimento, com desconto racional (por dentro) a ${i}% ao mês?`,
        r: N / 1.1,
        d: [N * 0.9, N * 1.1, N - 100, N / 1.01],
        f: R$,
        x: expl('desconto racional: A = N ÷ (1 + i)', 'O desconto por dentro é calculado sobre o valor atual, como juros "de trás para a frente".', `${num(N)} ÷ 1,1 = ${R$(N / 1.1)}.`),
      };
    },
    (r) => {
      const N = r.pick([2000, 5000, 8000]), i = r.pick([2, 3]), t = r.pick([2, 3]), tarifa = r.pick([10, 15, 20, 25]);
      const A = N * (1 - (i / 100) * t) - tarifa;
      return {
        e: `Uma duplicata de ${R$(N)} é descontada num banco ${t} meses antes do vencimento: desconto comercial de ${i}% ao mês e tarifa fixa de ${R$(tarifa)}. Quanto a empresa recebe?`,
        r: A,
        d: [A + tarifa, N - tarifa, A - tarifa, N * (1 - (i / 100)) - tarifa],
        f: R$,
        x: expl('valor líquido = nominal − desconto − tarifas', `Desconto: ${num(N)} × ${i}% × ${t} = ${R$((N * i * t) / 100)}.`, `${num(N)} − ${num((N * i * t) / 100)} − ${tarifa} = ${R$(A)}.`),
      };
    },
    (r) => {
      const D = r.pick([12000, 24000, 30000, 60000]), A = r.pick([1000, 2000, 2500, 5000]);
      if (!inteiro(D / A)) throw new Error('feio');
      return {
        e: `Numa dívida de ${R$(D)} paga pelo SAC, cada parcela amortiza ${R$(A)}. Em quantas parcelas a dívida é quitada?`,
        r: D / A,
        d: [D / A + 1, D / A - 1, (D / A) * 2, A / 100],
        f: (v) => `${num(v)} parcelas`,
        x: expl('SAC: amortização constante = dívida ÷ número de parcelas', 'Isole o número de parcelas.', `${num(D)} ÷ ${num(A)} = ${num(D / A)}.`),
      };
    },
  ],
  [
    (r) => {
      const N = r.pick([1210, 2420, 6050, 12100]);
      return {
        e: `Qual é o valor atual de um título de ${R$(N)}, descontado 2 meses antes do vencimento, com desconto racional composto de 10% ao mês?`,
        r: N / 1.21,
        d: [N * 0.8, N / 1.2, N * 0.81, N - 200],
        f: R$,
        x: expl('desconto racional composto: A = N ÷ (1 + i)ⁿ', 'É o valor presente em juros compostos.', `${num(N)} ÷ 1,1² = ${num(N)} ÷ 1,21 = ${R$(N / 1.21)}.`),
      };
    },
    (r) => {
      const N = r.pick([1000, 5000, 10000]), i = 10;
      return {
        e: `Qual é o valor atual de um título de ${R$(N)}, descontado 2 meses antes do vencimento, com desconto comercial (por fora) composto de ${i}% ao mês?`,
        r: N * 0.81,
        d: [N * 0.8, N / 1.21, N * 0.9, N * 0.79],
        f: R$,
        x: expl('desconto comercial composto: A = N·(1 − i)ⁿ', 'A cada mês, tira-se 10% do valor do mês seguinte.', `${num(N)} × 0,9² = ${num(N)} × 0,81 = ${R$(N * 0.81)}.`),
      };
    },
    (r) => {
      const D = r.pick([12000, 24000, 36000]), n = r.pick([6, 12]), i = r.pick([1, 2]), k = r.pick([2, 3, 4]);
      const A = D / n, saldo = D - (k - 1) * A, P = A + (saldo * i) / 100;
      return {
        e: `Uma dívida de ${R$(D)} é paga pelo SAC em ${n} parcelas mensais, com juros de ${i}% ao mês. Qual é o valor da ${k}ª parcela?`,
        r: P,
        d: [A + (D * i) / 100, A, A + ((D - k * A) * i) / 100, (saldo * i) / 100],
        f: R$,
        x: expl('SAC: parcela = amortização + juros do saldo anterior', `Amortização = ${num(D)} ÷ ${n} = ${R$(A)}. Antes da ${k}ª parcela, o saldo é ${num(D)} − ${k - 1} × ${num(A)} = ${R$(saldo)}.`, `Parcela = ${num(A)} + ${i}% de ${num(saldo)} = ${R$(P)}.`),
      };
    },
    (r) => {
      const [D, i, n] = r.pick([[10000, 2, 10], [2100, 10, 2], [5000, 1, 5], [20000, 2, 10], [3000, 3, 6]]);
      const P = Math.round(((D * i) / 100 / (1 - (1 + i / 100) ** -n)) * 100) / 100;
      const saldo = D * (1 + i / 100) - P;
      return {
        e: `Um financiamento de ${R$(D)} pela tabela Price, em ${n} parcelas a ${i}% ao mês, tem prestação de ${R$(P)}. Qual é o saldo devedor logo após o pagamento da 1ª prestação?`,
        r: saldo,
        d: [D - P, D * (1 + i / 100), D - (P - (D * i) / 100) * 2, saldo + (D * i) / 100],
        f: R$,
        x: expl('saldo = saldo anterior + juros − prestação', `Juros do mês: ${i}% de ${num(D)} = ${R$((D * i) / 100)}.`, `${num(D)} + ${num((D * i) / 100, 2)} − ${num(P, 2)} = ${R$(saldo)}.`),
      };
    },
    (r) => {
      const N = r.pick([1100, 2200, 5500]), i = 10;
      // trocar título de N vencendo em 1 mês por outro em 3 meses (desconto racional simples, data focal zero)
      const A = N / (1 + 0.1), N2 = A * (1 + 0.3);
      return {
        e: `Um título de ${R$(N)} vence em 1 mês. O credor aceita trocá-lo por outro que vence em 3 meses, equivalente pelo desconto racional simples a ${i}% ao mês (data focal hoje). Qual o valor do novo título?`,
        r: N2,
        d: [N * 1.2, N * 1.3, N * 1.21, A],
        f: R$,
        x: expl('equivalência de capitais: compare os valores atuais', `Valor atual do 1º: ${num(N)} ÷ 1,1 = ${R$(A)}. O novo título precisa ter o mesmo valor atual.`, `N₂ = ${num(A, 2)} × (1 + 0,1 × 3) = ${R$(N2)}.`),
      };
    },
    (r) => {
      const D = r.pick([10000, 20000, 50000]), i = r.pick([1, 2, 3]), n = r.pick([6, 12, 24]);
      return {
        e: `Pelo sistema americano, um empréstimo de ${R$(D)} a ${i}% ao mês é pago com juros mensais e o principal todo na última parcela, em ${n} meses. Quanto de juros se paga no total?`,
        r: (D * i * n) / 100,
        d: [(D * i) / 100, D * ((1 + i / 100) ** n - 1), (D * i * n) / 200, D + (D * i * n) / 100],
        f: R$,
        x: expl('sistema americano: o saldo não cai até o fim', `Os juros de cada mês incidem sempre sobre os ${R$(D)}.`, `${n} × ${i}% de ${num(D)} = ${R$((D * i * n) / 100)}.`),
      };
    },
  ],
  [
    (r) => {
      const D = r.pick([2000, 6000, 10000]), i = 10;
      const sac = D / 2 * 0 + (D * i) / 100 + ((D / 2) * i) / 100;
      const P = (D * 0.1 * 1.21) / 0.21, price = 2 * P - D;
      return {
        e: `Uma dívida de ${R$(D)}, a ${i}% ao mês, será paga em 2 parcelas mensais. Quanto de juros se paga a MAIS pela tabela Price do que pelo SAC?`,
        r: price - sac,
        d: [price, sac, (price - sac) * 2, (D * i) / 100],
        f: R$,
        x: expl('Price amortiza mais devagar, então paga mais juros', `SAC: juros ${R$((D * i) / 100)} + ${R$((D * i) / 200)} = ${R$(sac)}. Price: parcela ${R$(P)}, total ${R$(2 * P)}, juros ${R$(price)}.`, `Diferença: ${R$(price - sac)}.`),
      };
    },
    (r) => {
      const [N, i, t] = r.pick([[2600, 10, 3], [1200, 5, 4], [3300, 10, 1], [5600, 4, 10]]);
      const Dc = (N * i * t) / 100, Dr = N - N / (1 + (i * t) / 100);
      return {
        e: `Para um título de ${R$(N)} descontado ${t} ${t === 1 ? 'mês' : 'meses'} antes, a ${i}% ao mês (simples), qual é a diferença entre o desconto comercial e o racional?`,
        r: Dc - Dr,
        d: [Dc, Dr, Dc + Dr, (Dc - Dr) * 2],
        f: R$,
        x: expl('o comercial é sempre maior (incide sobre o nominal)', `Comercial: ${R$(Dc)}. Racional: ${num(N)} − ${num(N)} ÷ ${num(1 + (i * t) / 100, 2)} = ${R$(Dr)}.`, `Diferença: ${R$(Dc - Dr)} (que é o desconto racional × i·t).`),
      };
    },
    (r) => {
      const D = r.pick([2100, 4200, 21000]);
      const P = (D * 0.1 * 1.21) / 0.21;
      return {
        e: `Qual é a prestação de um financiamento de ${R$(D)} em 2 parcelas mensais iguais (tabela Price), a 10% ao mês?`,
        r: P,
        d: [D / 2, (D / 2) * 1.1, (D / 2) * 1.21, D * 0.6],
        f: R$,
        x: expl('Price: o valor presente das parcelas é a dívida', 'P/1,1 + P/1,21 = D → P = D × 0,1 × 1,21 ÷ 0,21.', `${num(D)} × 0,121 ÷ 0,21 = ${R$(P)}.`),
      };
    },
    (r) => {
      const P = r.pick([1210, 2420, 12100]);
      const saldo = P / 1.1 + P / 1.21;
      return {
        e: `Num financiamento pela tabela Price a 10% ao mês, faltam 2 prestações de ${R$(P)}. Quanto o cliente precisa pagar hoje para quitar a dívida (logo após pagar a última vencida)?`,
        r: saldo,
        d: [2 * P, 2 * P / 1.1, P + P / 1.1, 2 * P * 0.9],
        f: R$,
        x: expl('saldo devedor = valor presente das prestações que faltam', 'Traga cada prestação para hoje.', `${num(P)} ÷ 1,1 + ${num(P)} ÷ 1,21 = ${R$(P / 1.1)} + ${R$(P / 1.21)} = ${R$(saldo)}.`),
      };
    },
    (r) => {
      const D = r.pick([12000, 24000]), n = r.pick([4, 6]), i = r.pick([1, 2]);
      const A = D / n, totJ = ((D * i) / 100) * ((n + 1) / 2);
      return {
        e: `Uma dívida de ${R$(D)} é paga pelo SAC em ${n} parcelas, a ${i}% ao mês. Quanto se paga de juros no total?`,
        r: totJ,
        d: [(D * i * n) / 100, (D * i) / 100, totJ * 2, A * (i / 100) * n],
        f: R$,
        x: expl('no SAC os juros formam uma PA decrescente', `Juros da 1ª: ${R$((D * i) / 100)}; da última: ${R$((A * i) / 100)}. Soma da PA = (primeiro + último) × n ÷ 2.`, `(${num((D * i) / 100)} + ${num((A * i) / 100)}) × ${n} ÷ 2 = ${R$(totJ)}.`),
      };
    },
    (r) => {
      const ef = r.pick([2, 4, 5]), t = 1;
      const A = 100 - ef;
      const taxaEf = (ef / A) * 100;
      return {
        e: `Um banco desconta títulos a ${ef}% ao mês (desconto comercial). Para um título descontado ${t} mês antes do vencimento, qual é a taxa efetiva de juros que a empresa paga sobre o dinheiro que recebe?`,
        r: taxaEf,
        d: [ef, ef * 2, taxaEf * 2, ef / 2],
        f: pct,
        x: expl('taxa efetiva = desconto ÷ valor recebido', `Para cada R$ 100 de nominal, a empresa recebe R$ ${A} e "devolve" R$ 100.`, `${ef} ÷ ${A} = ${num(taxaEf)}% ao mês (mais que os ${ef}% anunciados).`),
      };
    },
  ],
];

export default { juros, descontos };
