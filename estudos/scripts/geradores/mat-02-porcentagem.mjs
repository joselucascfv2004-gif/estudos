// Matemática — Porcentagem.
import { arred, expl, fracao, nome, nomes, num, pct, reais } from './util.mjs';

const P = (v) => pct(arred(v, 2));

const facil = [
  // 1. desconto em loja
  (r) => {
    const preco = r.pick([80, 120, 150, 240, 360, 450]);
    const d = r.pick([10, 15, 20, 25, 30, 35]);
    const final = preco * (1 - d / 100);
    const item = r.pick(['um tênis', 'uma jaqueta', 'uma mochila', 'um fone de ouvido']);
    return {
      e: `Na liquidação, ${item} que custava ${reais(preco)} está com ${d}% de desconto. Quanto o cliente paga?`,
      r: final,
      d: [preco * (d / 100), preco - d, preco * (1 + d / 100), preco * (1 - d / 1000), final + 10],
      f: reais,
      x: expl('fator de desconto', `Tirar ${d}% é ficar com ${100 - d}% do preço: multiplique por ${num(1 - d / 100)}.`, `${reais(preco)} × ${num(1 - d / 100)} = ${reais(final)}.`),
    };
  },
  // 2. aumento salarial
  (r) => {
    const sal = r.pick([1800, 2200, 2500, 3200, 4000]);
    const a = r.pick([4, 5, 6, 8, 12]);
    const novo = sal * (1 + a / 100);
    return {
      e: `O salário de ${nome(r)} era ${reais(sal)} e teve reajuste de ${a}%. Qual é o novo salário?`,
      r: novo,
      d: [sal * (a / 100), sal + a, sal * (1 + a / 10), sal * (1 - a / 100), novo + 100],
      f: reais,
      x: expl('fator de aumento', `Aumentar ${a}% é multiplicar por 1 + ${a}/100 = ${num(1 + a / 100)}.`, `${reais(sal)} × ${num(1 + a / 100)} = ${reais(novo)}.`),
    };
  },
  // 3. que porcentagem é
  (r) => {
    const total = r.pick([20, 25, 40, 50, 80]);
    const parte = r.int(1, total - 1);
    const v = (parte / total) * 100;
    if (!Number.isInteger(v * 2)) return facil[2](r);
    return {
      e: `Em uma turma de ${total} estudantes, ${parte} passaram direto, sem recuperação. Que porcentagem da turma passou direto?`,
      r: v,
      d: [parte, 100 - v, (total / parte) * 10, v / 10, v + 5],
      f: P,
      x: expl('parte ÷ todo', 'Porcentagem é a parte dividida pelo todo, vezes 100.', `${parte} ÷ ${total} = ${num(parte / total, 3)} = ${P(v)}.`),
    };
  },
  // 4. taxa de serviço dividida
  (r) => {
    const conta = r.pick([180, 240, 270, 330, 420]);
    const n = r.pick([3, 4, 5, 6]);
    const total = conta * 1.1;
    return {
      e: `A conta de um restaurante deu ${reais(conta)}, e foram acrescentados 10% de taxa de serviço. O valor final foi dividido igualmente entre ${n} amigos. Quanto cada um pagou?`,
      r: arred(total / n, 2),
      d: [arred(conta / n, 2), arred(conta / n + 10, 2), arred((conta * 1.01) / n, 2), arred(total / (n + 1), 2), arred((conta / n) * 1.2, 2)],
      f: reais,
      x: expl('aumento percentual + divisão', 'Primeiro aplique os 10% sobre a conta inteira (× 1,1); depois divida pelo número de pessoas.', `${reais(conta)} × 1,1 = ${reais(total)}; ÷ ${n} = ${reais(total / n)}.`),
    };
  },
  // 5. fração para porcentagem
  (r) => {
    const [n, d] = r.pick([[3, 8], [5, 8], [7, 20], [9, 25], [3, 16], [11, 40], [7, 8]]);
    const v = (n / d) * 100;
    return {
      e: `Em uma pesquisa sobre transporte, ${n} em cada ${d} entrevistados disseram que vão ao trabalho de bicicleta. Em porcentagem, isso equivale a:`,
      r: v,
      d: [n / d, n * 10, (d / n) * 10, v / 10, 100 - v],
      f: P,
      x: expl('fração para porcentagem', 'Divida o numerador pelo denominador e multiplique por 100.', `${n} ÷ ${d} = ${num(n / d, 4)} → ${P(v)}.`),
    };
  },
  // 6. porcentagem de uma quantidade (bateria)
  (r) => {
    const cap = r.pick([4000, 4500, 5000]);
    const p = r.pick([15, 35, 45, 65, 85]);
    const consumo = r.pick([250, 400, 500]);
    const resta = (cap * p) / 100;
    return {
      e: `A bateria de um celular tem capacidade de ${num(cap)} mAh e está com ${p}% de carga. Se um aplicativo de mapas consome ${consumo} mAh por hora, por quanto tempo, aproximadamente, ele pode ser usado até a bateria acabar?`,
      r: arred(resta / consumo, 2),
      d: [arred(cap / consumo, 2), arred(p / 10, 2), arred((cap * (100 - p)) / 100 / consumo, 2), arred(resta / consumo / 2, 2)],
      f: (v) => `${num(v)} h`,
      x: expl('porcentagem de uma quantidade', `Primeiro calcule quanto há de carga: ${p}% de ${num(cap)}. Depois divida pelo consumo por hora.`, `${num(cap)} × ${p}/100 = ${num(resta)} mAh; ${num(resta)} ÷ ${consumo} = ${num(resta / consumo)} h.`),
    };
  },
  // 7. multa e juros de atraso
  (r) => {
    const conta = r.pick([120, 150, 200, 250, 300]);
    const dias = r.int(5, 20);
    const multa = conta * 0.02, juros = conta * 0.00033 * dias;
    const total = arred(conta + multa + juros, 2);
    return {
      e: `Uma conta de ${reais(conta)} foi paga com ${dias} dias de atraso. A empresa cobra multa de 2% sobre o valor e juros de 0,033% ao dia. Qual foi o valor pago (arredondado aos centavos)?`,
      r: total,
      d: [arred(conta * 1.02, 2), arred(conta + multa + conta * 0.033 * dias, 2), arred(conta * (1 + 0.02 * dias), 2), arred(conta + 2 + 0.033 * dias, 2)],
      f: reais,
      x: expl('soma de porcentagens sobre o mesmo valor', 'Multa e juros são calculados sobre a conta original e depois somados a ela.', `Multa: 2% de ${reais(conta)} = ${reais(multa)}. Juros: 0,033% × ${dias} dias = ${num(0.033 * dias, 3)}% de ${reais(conta)} = ${reais(juros)}. Total: ${reais(total)}.`),
    };
  },
  // 8. porcentagem de porcentagem (pura)
  (r) => {
    const a = r.pick([10, 15, 20, 25, 40]), b = r.pick([20, 30, 40, 50, 60]), v = r.pick([200, 400, 500, 800, 1000]);
    const res = (a / 100) * (b / 100) * v;
    return {
      e: `Quanto é ${a}% de ${b}% de ${num(v)}?`,
      r: res,
      d: [((a + b) / 100) * v, (a / 100) * v, (b / 100) * v, res * 10, (a * b) / 100],
      x: expl('"de" é multiplicação', 'Cada porcentagem vira um número decimal, e o "de" vira vezes.', `${num(a / 100)} × ${num(b / 100)} × ${num(v)} = ${num(res)}.`),
    };
  },
  // 9. preço original a partir do preço com desconto
  (r) => {
    const d = r.pick([10, 20, 25, 40]);
    const orig = r.pick([80, 120, 160, 200, 240, 320]);
    const pago = orig * (1 - d / 100);
    return {
      e: `Com um cupom de ${d}% de desconto, ${nome(r)} pagou ${reais(pago)} em um livro. Qual era o preço sem o cupom?`,
      r: orig,
      d: [pago * (1 + d / 100), pago + d, pago / (d / 100), pago * 2 - orig / 2],
      f: reais,
      x: expl('voltar do valor final ao inicial', `O valor pago é ${100 - d}% do preço. Então preço = pago ÷ ${num(1 - d / 100)}. Cuidado: somar ${d}% ao valor pago NÃO devolve o preço original.`, `${reais(pago)} ÷ ${num(1 - d / 100)} = ${reais(orig)}.`),
    };
  },
  // 10. pesquisa de opinião
  (r) => {
    const n = r.pick([800, 1200, 1500, 2000, 2400]);
    const p = r.pick([35, 42, 45, 48, 55]);
    const q = r.pick([12, 15, 18]);
    const indecisos = (n * q) / 100;
    return {
      e: `Uma pesquisa ouviu ${num(n)} eleitores: ${p}% preferem o candidato A, ${q}% estão indecisos e os demais preferem o candidato B. Quantos entrevistados preferem o candidato B?`,
      r: (n * (100 - p - q)) / 100,
      d: [(n * p) / 100, indecisos, (n * (100 - p)) / 100, (n * (100 - q)) / 100, n - p - q],
      x: expl('complemento percentual', 'As porcentagens de todos os grupos somam 100%. Descubra a porcentagem que falta e aplique sobre o total.', `B = 100% − ${p}% − ${q}% = ${100 - p - q}%; ${100 - p - q}% de ${num(n)} = ${num((n * (100 - p - q)) / 100)}.`),
    };
  },
  // 11. imposto parcelado
  (r) => {
    const valor = r.pick([40000, 48000, 55000, 62000, 75000]);
    const aliq = r.pick([2, 3, 4]);
    const parc = r.pick([3, 4, 5]);
    const imp = (valor * aliq) / 100;
    return {
      e: `Em certo estado, o IPVA de carros é ${aliq}% do valor venal do veículo. Um carro avaliado em ${reais(valor)} terá o imposto pago em ${parc} parcelas iguais. Qual é o valor de cada parcela?`,
      r: arred(imp / parc, 2),
      d: [imp, arred((valor / parc) * aliq, 2), arred(imp / parc / 10, 2), arred((imp * 1.1) / parc, 2), arred(imp / (parc + 1), 2)],
      f: reais,
      x: expl('porcentagem + divisão', `Calcule o imposto total (${aliq}% do valor) e divida pelo número de parcelas.`, `${aliq}% de ${reais(valor)} = ${reais(imp)}; ÷ ${parc} = ${reais(imp / parc)}.`),
    };
  },
  // 12. à vista x parcelado
  (r) => {
    const preco = r.pick([900, 1200, 1500, 2400, 3000]);
    const d = r.pick([5, 8, 10, 12]);
    const n = r.pick([6, 10, 12]);
    return {
      e: `Uma geladeira custa ${reais(preco)} em ${n} parcelas sem juros ou com ${d}% de desconto à vista. Quanto o cliente economiza pagando à vista?`,
      r: (preco * d) / 100,
      d: [preco / n, preco * (1 - d / 100), d * 10, (preco * d) / 1000, (preco * d) / 100 + preco / n],
      f: reais,
      x: expl('valor do desconto', 'A economia é exatamente o valor do desconto: a porcentagem aplicada ao preço.', `${d}% de ${reais(preco)} = ${reais((preco * d) / 100)}.`),
    };
  },
  // 13. variação percentual
  (r) => {
    const antes = r.pick([4, 5, 8, 10, 12.5, 20]);
    const fator = r.pick([1.2, 1.25, 1.5, 0.8, 0.75, 1.4]);
    const depois = arred(antes * fator, 2);
    if (Math.abs(depois - antes * fator) > 1e-9) return facil[12](r);
    const v = arred((fator - 1) * 100, 2);
    const prod = r.pick(['o quilo do tomate', 'a passagem de ônibus', 'o litro do leite', 'a dúzia de ovos']);
    return {
      e: `Em um ano, ${prod} passou de ${reais(antes)} para ${reais(depois)}. Qual foi a variação percentual do preço?`,
      r: `${v > 0 ? 'aumento' : 'redução'} de ${P(Math.abs(v))}`,
      d: [`${v > 0 ? 'redução' : 'aumento'} de ${P(Math.abs(v))}`, `${v > 0 ? 'aumento' : 'redução'} de ${P(Math.abs(depois - antes) * 10)}`, `${v > 0 ? 'aumento' : 'redução'} de ${P(Math.abs((antes - depois) / depois) * 100)}`, `${v > 0 ? 'aumento' : 'redução'} de ${P(fator * 100)}`, `${v > 0 ? 'aumento' : 'redução'} de ${P(Math.abs(v) / 2)}`],
      x: expl('variação percentual', 'Variação = (novo − antigo) ÷ antigo. A base é sempre o valor ANTIGO.', `(${num(depois)} − ${num(antes)}) ÷ ${num(antes)} = ${num(fator - 1)} = ${P(v)}.`),
    };
  },
  // 14. composição percentual
  (r) => {
    const g = r.pick([300, 400, 500, 600]);
    const p = r.pick([18, 22, 25, 28]);
    const queijo = r.pick(['muçarela', 'prato', 'parmesão', 'coalho']);
    return {
      e: `Um queijo ${queijo} tem ${p}% de gordura em massa. Quantos gramas de gordura há em uma peça de ${g} g?`,
      r: (g * p) / 100,
      d: [g - (g * p) / 100, p, (g * p) / 10, g / p],
      f: (v) => `${num(v)} g`,
      x: expl('porcentagem de uma quantidade', `${p}% significa ${p} gramas em cada 100 gramas.`, `${g} × ${p}/100 = ${num((g * p) / 100)} g.`),
    };
  },
  // 15. pontos percentuais
  (r) => {
    const [a, b] = r.pick([[8, 10], [10, 12], [5, 6], [12, 15], [20, 25]]);
    const pp = b - a, rel = ((b - a) / a) * 100;
    return {
      e: `A taxa de inadimplência de uma loja subiu de ${a}% para ${b}% em um ano. Qual afirmação está correta?`,
      r: `A taxa subiu ${pp} pontos percentuais, o que é um aumento de ${P(rel)} em relação à taxa anterior.`,
      d: [
        `A taxa subiu ${pp}% em relação à taxa anterior.`,
        `A taxa subiu ${num(rel)} pontos percentuais.`,
        `A taxa subiu ${pp} pontos percentuais, o que é um aumento de ${pp}% em relação à taxa anterior.`,
        `A taxa subiu ${P(rel / 2)} em relação à taxa anterior.`,
        `A taxa subiu ${b + a} pontos percentuais.`,
      ],
      x: expl('ponto percentual × porcentagem', 'A diferença entre duas taxas se mede em pontos percentuais; o aumento relativo compara essa diferença com a taxa antiga.', `${b}% − ${a}% = ${pp} p.p.; ${pp} ÷ ${a} = ${P(rel)} de aumento.`),
    };
  },
];
facil[0].vezes = 2;
facil[8].vezes = 2;

const medio = [
  // 1. aumentos sucessivos
  (r) => {
    const a = r.pick([10, 20, 25, 30]), b = r.pick([10, 15, 20, 40]);
    const tot = arred(((1 + a / 100) * (1 + b / 100) - 1) * 100, 2);
    return {
      e: `O aluguel de um apartamento subiu ${a}% em um ano e ${b}% no ano seguinte. Qual foi o aumento acumulado nos dois anos?`,
      r: tot,
      d: [a + b, arred(tot - 2, 2), (a * b) / 10, arred((a + b) / 2, 2), arred(tot + 5, 2)],
      f: P,
      x: expl('fatores multiplicam', 'Aumentos sucessivos NÃO se somam: multiplique os fatores, porque o segundo aumento incide sobre o valor já aumentado.', `${num(1 + a / 100)} × ${num(1 + b / 100)} = ${num(1 + tot / 100, 4)} → aumento de ${P(tot)}.`),
    };
  },
  // 2. aumento e desconto iguais
  (r) => {
    const p = r.pick([10, 20, 30, 40, 50]);
    const preco = r.pick([100, 200, 500, 1000]);
    const final = preco * (1 + p / 100) * (1 - p / 100);
    return {
      e: `Uma loja aumentou em ${p}% o preço de um produto de ${reais(preco)} e, uma semana depois, anunciou "${p}% de desconto". Qual é o preço final?`,
      r: final,
      d: [preco, preco * (1 + p / 100), preco * (1 - p / 100), preco + p, final + (preco * p) / 200],
      f: reais,
      x: expl('fatores multiplicam', `O desconto incide sobre o preço já aumentado, que é maior. Por isso o resultado é menor que o original: (1 + x)(1 − x) = 1 − x².`, `${reais(preco)} × ${num(1 + p / 100)} × ${num(1 - p / 100)} = ${reais(final)} (queda de ${P((p * p) / 100)}).`),
    };
  },
  // 3. descontos sucessivos x desconto único
  (r) => {
    const a = r.pick([20, 30, 40, 50]), b = r.pick([10, 20, 25]);
    const unico = arred((1 - (1 - a / 100) * (1 - b / 100)) * 100, 2);
    return {
      e: `Na Black Friday, uma loja dá ${a}% de desconto em todos os produtos e mais ${b}% sobre o preço já descontado para quem paga com o aplicativo. Para quem usa o aplicativo, isso equivale a um desconto único de:`,
      r: unico,
      d: [a + b, arred(unico - 3, 2), arred(unico + 4, 2), (a * b) / 10, Math.max(a, b)],
      f: P,
      x: expl('fatores multiplicam', 'Descontos sucessivos se multiplicam: sobra (1 − a)(1 − b) do preço.', `${num(1 - a / 100)} × ${num(1 - b / 100)} = ${num((1 - a / 100) * (1 - b / 100), 4)} → desconto de ${P(unico)}.`),
    };
  },
  // 4. imposto embutido
  (r) => {
    const base = r.pick([200, 400, 800, 1200]);
    const t = r.pick([20, 25, 30, 50]);
    const final = base * (1 + t / 100);
    return {
      e: `O preço final de um produto é ${reais(final)}, já incluídos impostos que correspondem a ${t}% do preço sem impostos. Quanto o consumidor paga de imposto?`,
      r: final - base,
      d: [(final * t) / 100, base, final - (final * (100 - t)) / 100 + 10, (final * t) / 100 / 2],
      f: reais,
      x: expl('porcentagem sobre a base certa', `O imposto é ${t}% do preço SEM imposto. Então o preço final é ${num(1 + t / 100)} vezes o preço sem imposto.`, `Sem imposto: ${reais(final)} ÷ ${num(1 + t / 100)} = ${reais(base)}. Imposto: ${reais(final - base)}.`),
    };
  },
  // 5. lucro sobre a venda
  (r) => {
    const custo = r.pick([60, 75, 90, 120, 150]);
    const l = r.pick([20, 25, 40]);
    const venda = custo / (1 - l / 100);
    return {
      e: `Um comerciante paga ${reais(custo)} por uma peça e quer que o lucro seja ${l}% do PREÇO DE VENDA. Por quanto deve vender a peça?`,
      r: venda,
      d: [custo * (1 + l / 100), custo + l, custo * (1 + (2 * l) / 100), venda + 10],
      f: reais,
      x: expl('porcentagem sobre o preço de venda', `Se o lucro é ${l}% da venda, o custo é o restante: ${100 - l}% da venda. Atenção: não é o mesmo que somar ${l}% ao custo.`, `Venda = ${reais(custo)} ÷ ${num(1 - l / 100)} = ${reais(venda)}.`),
    };
  },
  // 6. diluição de álcool
  (r) => {
    const v = r.pick([500, 1000, 2000]);
    const [c1, c2] = r.pick([[70, 50], [90, 60], [80, 40], [96, 70]]);
    const alcool = (v * c1) / 100;
    const total = (alcool * 100) / c2;
    if (!Number.isInteger(total)) return medio[5](r);
    return {
      e: `Um laboratório tem ${num(v)} mL de solução com ${c1}% de álcool. Quantos mililitros de água devem ser acrescentados para a concentração cair para ${c2}%?`,
      r: total - v,
      d: [total, v * (c1 - c2) / 100, (v * c2) / 100, v - (v * c2) / c1],
      f: (x) => `${num(x)} mL`,
      x: expl('a quantidade de álcool não muda', `Ao acrescentar água, o álcool continua o mesmo. Ele passa a ser ${c2}% do novo volume.`, `Álcool: ${c1}% de ${num(v)} = ${num(alcool)} mL. Novo volume: ${num(alcool)} ÷ ${num(c2 / 100)} = ${num(total)} mL. Água: ${num(total)} − ${num(v)} = ${num(total - v)} mL.`),
    };
  },
  // 7. votos válidos
  (r) => {
    const eleitores = r.pick([20000, 40000, 50000, 80000]);
    const bn = r.pick([10, 15, 20]);
    const pa = r.pick([40, 45, 55, 60]);
    const validos = (eleitores * (100 - bn)) / 100;
    return {
      e: `Em uma cidade, ${num(eleitores)} eleitores votaram; ${bn}% dos votos foram brancos ou nulos. O candidato vencedor teve ${pa}% dos votos válidos (que excluem brancos e nulos). Quantos votos ele recebeu?`,
      r: (validos * pa) / 100,
      d: [(eleitores * pa) / 100, (eleitores * (pa - bn)) / 100, validos, (eleitores * (100 - pa)) / 100],
      x: expl('porcentagem de porcentagem', 'Primeiro ache o total de votos válidos; a porcentagem do candidato é calculada sobre esse total, e não sobre todos os votos.', `Válidos: ${100 - bn}% de ${num(eleitores)} = ${num(validos)}. Vencedor: ${pa}% de ${num(validos)} = ${num((validos * pa) / 100)}.`),
    };
  },
  // 8. salário x inflação
  (r) => {
    const [a, i] = r.pick([[5, 8], [4, 10], [6, 9], [10, 4], [8, 5]]);
    const real = arred(((1 + a / 100) / (1 + i / 100) - 1) * 100, 1);
    return {
      e: `Em um ano, o salário de uma categoria foi reajustado em ${a}%, enquanto a inflação foi de ${i}%. Aproximadamente, o que aconteceu com o poder de compra desses trabalhadores?`,
      r: `${real < 0 ? 'Caiu' : 'Subiu'} cerca de ${P(Math.abs(real))}`,
      d: [`${real < 0 ? 'Caiu' : 'Subiu'} cerca de ${P(Math.abs(a - i) + 0.8)}`, `${real < 0 ? 'Subiu' : 'Caiu'} cerca de ${P(Math.abs(real))}`, `Ficou igual`, `${real < 0 ? 'Caiu' : 'Subiu'} cerca de ${P(a + i)}`, `${real < 0 ? 'Caiu' : 'Subiu'} cerca de ${P(Math.abs(real) * 3)}`],
      x: expl('ganho real', 'O poder de compra é salário ÷ preços. Divida o fator do salário pelo fator da inflação.', `${num(1 + a / 100)} ÷ ${num(1 + i / 100)} ≈ ${num((1 + a / 100) / (1 + i / 100), 3)} → ${real < 0 ? 'queda' : 'ganho'} de cerca de ${P(Math.abs(real))}.`),
    };
  },
  // 9. percentual de um subgrupo
  (r) => {
    const a = r.pick([40, 45, 60, 55]), b = r.pick([20, 25, 30, 40]);
    const tot = (a * b) / 100;
    return {
      e: `Em uma empresa, ${a}% dos funcionários são mulheres e ${b}% das mulheres ocupam cargos de chefia. Que porcentagem do total de funcionários é formada por mulheres em cargos de chefia?`,
      r: tot,
      d: [a + b, b, Math.abs(a - b), (a + b) / 2, tot * 2],
      f: P,
      x: expl('porcentagem de porcentagem', `"${b}% DAS mulheres": aplique ${b}% sobre os ${a}%.`, `${num(b / 100)} × ${a}% = ${P(tot)}.`),
    };
  },
  // 10. "x% a mais que"
  (r) => {
    const p = r.pick([10, 20, 25, 50]);
    const m = r.pick([20, 24, 28, 32, 36, 40]);
    const f = m * (1 + p / 100);
    if (!Number.isInteger(f)) return medio[9](r);
    return {
      e: `Em um curso, o número de meninas é ${p}% maior que o de meninos. Sabendo que o curso tem ${m + f} estudantes, quantos são meninos?`,
      r: m,
      d: [f, (m + f) / 2, Math.round((m + f) * (1 - p / 100)), Math.round((m + f) / (2 + p / 100) + 3)],
      x: expl('equação com porcentagem', `Chame meninos de x. Meninas = ${num(1 + p / 100)}x. Total: x + ${num(1 + p / 100)}x = ${num(2 + p / 100)}x.`, `${num(2 + p / 100)}x = ${m + f} ⇒ x = ${m}.`),
    };
  },
  // 11. tarifa proporcional
  (r) => {
    const m3 = r.int(12, 28);
    const tarifa = r.pick([4.5, 5, 6, 7.5]);
    const esg = r.pick([80, 90, 100]);
    const agua = m3 * tarifa;
    return {
      e: `Em uma cidade, a conta mensal tem duas partes: água, a ${reais(tarifa)} por m³, e esgoto, que custa ${esg}% do valor da água. Quanto paga, no total, uma casa que consumiu ${m3} m³?`,
      r: arred(agua * (1 + esg / 100), 2),
      d: [agua, arred((agua * esg) / 100, 2), arred(agua + esg, 2), arred(agua * (1 + esg / 1000), 2), arred(agua * 2 + 10, 2)],
      f: reais,
      x: expl('porcentagem como acréscimo', `O esgoto é ${esg}% da água; somando, a conta é ${num(1 + esg / 100)} vezes o valor da água.`, `Água: ${m3} × ${reais(tarifa)} = ${reais(agua)}. Total: ${reais(agua)} × ${num(1 + esg / 100)} = ${reais(agua * (1 + esg / 100))}.`),
    };
  },
  // 12. crescimento em dois anos
  (r) => {
    const pop = r.pick([20000, 50000, 80000, 100000]);
    const t = r.pick([2, 3, 5]);
    const final = pop * (1 + t / 100) ** 2;
    return {
      e: `Uma cidade tem ${num(pop)} habitantes, e a população cresce ${t}% ao ano. Mantido esse ritmo, quantos habitantes ela terá daqui a 2 anos?`,
      r: Math.round(final),
      d: [Math.round(pop * (1 + (2 * t) / 100)), Math.round(pop * (1 + t / 100)), Math.round(final) + 100, Math.round(pop * (1 + (2 * t) / 1000))],
      x: expl('crescimento composto', 'Cada ano o crescimento incide sobre a população do ano anterior: multiplique pelo fator duas vezes.', `${num(pop)} × ${num(1 + t / 100)}² = ${num(Math.round(final))}.`),
    };
  },
  // 13. área ao aumentar os lados
  (r) => {
    const p = r.pick([10, 20, 30, 50]);
    const tot = arred(((1 + p / 100) ** 2 - 1) * 100, 2);
    return {
      e: `Um terreno retangular teve o comprimento e a largura aumentados em ${p}% cada. Em quantos por cento aumentou a área?`,
      r: tot,
      d: [p, 2 * p, p * p, arred(tot / 2, 2), arred(tot + 10, 2)],
      f: P,
      x: expl('área multiplica dois fatores', 'Área = comprimento × largura. Se cada medida é multiplicada pelo mesmo fator, a área é multiplicada pelo fator ao quadrado.', `${num(1 + p / 100)}² = ${num((1 + p / 100) ** 2, 4)} → aumento de ${P(tot)}.`),
    };
  },
  // 14. comissão de vendedor
  (r) => {
    const fixo = r.pick([1500, 1800, 2000]);
    const c = r.pick([2, 3, 4, 5]);
    const vendas = r.pick([30000, 45000, 60000, 80000]);
    const sal = fixo + (vendas * c) / 100;
    return {
      e: `Um vendedor recebe ${reais(fixo)} fixos por mês mais ${c}% de comissão sobre o total vendido. Em um mês em que ele recebeu ${reais(sal)}, quanto vendeu?`,
      r: vendas,
      d: [(sal * 100) / c, vendas / 2, ((sal - fixo) * 100) / (c + 1), vendas + fixo * 10],
      f: reais,
      x: expl('equação com porcentagem', 'Tire a parte fixa; o que sobra é a comissão. Se ela é c% das vendas, vendas = comissão ÷ c%.', `${reais(sal)} − ${reais(fixo)} = ${reais(sal - fixo)}; ÷ ${num(c / 100)} = ${reais(vendas)}.`),
    };
  },
  // 15. desconto que volta ao preço original
  (r) => {
    const [a, d] = r.pick([[25, 20], [50, 33.33], [100, 50], [20, 16.67], [60, 37.5]]);
    return {
      e: `Após um aumento de ${a}%, uma loja quer voltar exatamente ao preço antigo. Que desconto deve dar sobre o preço aumentado?`,
      r: `${P(d)}${d % 1 ? ' (aproximadamente)' : ''}`,
      d: [P(a), P(a / 2), P(a * 1.2), P(arred(d + 5, 2)), P(arred(d / 2, 2))],
      x: expl('fator inverso', `Para desfazer a multiplicação por ${num(1 + a / 100)}, é preciso multiplicar por 1 ÷ ${num(1 + a / 100)}.`, `1 ÷ ${num(1 + a / 100)} ≈ ${num(1 / (1 + a / 100), 4)} → desconto de cerca de ${P(d)}.`),
    };
  },
];
medio[0].vezes = 2;
medio[2].vezes = 2;

const dificil = [
  // 1. três variações seguidas
  (r) => {
    const [a, b, c] = r.pick([[20, -20, 10], [10, 10, -20], [50, -30, -10], [-10, 30, -10], [25, -20, 20]]);
    const f = (1 + a / 100) * (1 + b / 100) * (1 + c / 100);
    const v = arred((f - 1) * 100, 2);
    const s = (x) => (x > 0 ? `subiu ${x}%` : `caiu ${-x}%`);
    return {
      e: `O preço de uma ação ${s(a)} na segunda-feira, ${s(b)} na terça e ${s(c)} na quarta. No fim da quarta-feira, em relação ao início da semana, o preço:`,
      r: v === 0 ? 'ficou igual' : `${v > 0 ? 'subiu' : 'caiu'} ${P(Math.abs(v))}`,
      d: [a + b + c === 0 ? `${v > 0 ? 'subiu' : 'caiu'} ${P(Math.abs(v) * 2)}` : `${a + b + c > 0 ? 'subiu' : 'caiu'} ${P(Math.abs(a + b + c))}`, 'ficou igual', `${v > 0 ? 'caiu' : 'subiu'} ${P(Math.abs(v))}`, `${v > 0 ? 'subiu' : 'caiu'} ${P(Math.abs(v) + 2)}`, `${v > 0 ? 'subiu' : 'caiu'} ${P(Math.abs(v) / 2)}`],
      x: expl('fatores multiplicam', 'Cada variação vira um fator (alta: 1 + x; queda: 1 − x), e os fatores se multiplicam.', `${num(1 + a / 100)} × ${num(1 + b / 100)} × ${num(1 + c / 100)} = ${num(f, 4)}.`),
    };
  },
  // 2. produtividade para compensar
  (r) => {
    const red = r.pick([20, 25, 40, 50]);
    const aum = arred((1 / (1 - red / 100) - 1) * 100, 2);
    return {
      e: `Uma fábrica reduziu a jornada de trabalho em ${red}%, mas quer manter a mesma produção diária. A produção por hora deve aumentar em:`,
      r: aum,
      d: [red, red / 2, arred(aum + 5, 2), 100 - red, arred(aum * 2, 2)],
      f: P,
      x: expl('grandezas inversamente proporcionais', 'Produção = horas × produção por hora. Se as horas viram (1 − r), a produção por hora deve virar 1 ÷ (1 − r).', `1 ÷ ${num(1 - red / 100)} = ${num(1 / (1 - red / 100), 4)} → aumento de ${P(aum)}.`),
    };
  },
  // 3. mistura de concentrações
  (r) => {
    const [c1, c2, alvo] = r.pick([[30, 80, 50], [20, 60, 30], [10, 50, 40], [40, 90, 60], [25, 75, 45]]);
    const tot = r.pick([100, 200, 500]);
    const x = (tot * (c2 - alvo)) / (c2 - c1);
    return {
      e: `Um agricultor precisa de ${tot} litros de uma calda com ${alvo}% de produto ativo. Ele tem duas caldas prontas: uma com ${c1}% e outra com ${c2}%. Quantos litros da calda de ${c1}% deve usar?`,
      r: x,
      d: [tot - x, tot / 2, (tot * alvo) / 100, (tot * c1) / 100, x + 10],
      f: (v) => `${num(v)} L`,
      x: expl('média ponderada', `Chame de x os litros de ${c1}%; os outros (${tot} − x) são de ${c2}%. O produto ativo total deve ser ${alvo}% de ${tot}.`, `${num(c1 / 100)}x + ${num(c2 / 100)}(${tot} − x) = ${num((alvo * tot) / 100)} ⇒ x = ${num(x)} L.`),
    };
  },
  // 4. acertos seguidos para atingir meta
  (r) => {
    const n = r.pick([20, 40, 60]);
    const p = r.pick([50, 60, 70]);
    const alvo = r.pick([75, 80]);
    const ac = (n * p) / 100;
    const k = (alvo * n - 100 * ac) / (100 - alvo);
    if (!Number.isInteger(k) || k <= 0) return dificil[3](r);
    return {
      e: `${nome(r)} resolveu ${n} questões em um aplicativo e acertou ${p}% delas. Quantas questões seguidas, sem errar nenhuma, precisa acertar para que sua taxa de acerto total chegue a ${alvo}%?`,
      r: k,
      d: [(n * (alvo - p)) / 100, k / 2, k + 10, n],
      x: expl('equação com porcentagem', `Depois de acertar k seguidas: (acertos + k) ÷ (${n} + k) = ${alvo}%.`, `Acertos: ${ac}. (${ac} + k) = ${num(alvo / 100)}(${n} + k) ⇒ ${num(1 - alvo / 100)}k = ${num((alvo * n) / 100 - ac)} ⇒ k = ${k}.`),
    };
  },
  // 5. desconto + cashback
  (r) => {
    const preco = r.pick([500, 800, 1000, 1500, 2000]);
    const d = r.pick([10, 15, 20]);
    const cb = r.pick([5, 10]);
    const pago = preco * (1 - d / 100);
    const custo = pago * (1 - cb / 100);
    const eq = arred((1 - custo / preco) * 100, 2);
    return {
      e: `Um site vende um celular de ${reais(preco)} com ${d}% de desconto e ainda devolve ${cb}% do valor pago em forma de crédito (cashback). Considerando o crédito como dinheiro, o desconto real equivalente é de:`,
      r: eq,
      d: [d + cb, arred(eq - 1, 2), arred(eq + 1.5, 2), d, arred((d * cb) / 10, 2)],
      f: P,
      x: expl('fatores multiplicam', `O cashback é calculado sobre o valor já com desconto. O custo efetivo é preço × ${num(1 - d / 100)} × ${num(1 - cb / 100)}.`, `${reais(preco)} → ${reais(pago)} → ${reais(custo)}. Desconto efetivo: ${P(eq)}.`),
    };
  },
  // 6. imposto progressivo (tabela simplificada)
  (r) => {
    const renda = r.pick([3500, 4200, 5000, 6000]);
    const imposto = Math.max(0, Math.min(renda, 4000) - 2000) * 0.1 + Math.max(0, renda - 4000) * 0.2;
    return {
      e: `Em um país fictício, o imposto de renda mensal é calculado por faixas: até R$ 2.000,00 não há imposto; a parte da renda entre R$ 2.000,00 e R$ 4.000,00 paga 10%; a parte acima de R$ 4.000,00 paga 20%. Quanto paga de imposto quem ganha ${reais(renda)}?`,
      r: imposto,
      d: [renda * (renda > 4000 ? 0.2 : 0.1), (renda - 2000) * 0.2, renda * 0.1, (renda - 2000) * 0.1, imposto + 200],
      f: reais,
      x: expl('cálculo por faixas', 'Cada alíquota vale só para o pedaço da renda que está naquela faixa; depois somam-se os pedaços.', `Faixa de 10%: ${reais(Math.max(0, Math.min(renda, 4000) - 2000))} → ${reais(Math.max(0, Math.min(renda, 4000) - 2000) * 0.1)}. Faixa de 20%: ${reais(Math.max(0, renda - 4000))} → ${reais(Math.max(0, renda - 4000) * 0.2)}. Total: ${reais(imposto)}.`),
    };
  },
  // 7. queda relativa de uma taxa
  (r) => {
    const [a, b] = r.pick([[12, 9], [15, 12], [8, 6], [20, 15], [10, 8]]);
    const rel = ((a - b) / a) * 100;
    return {
      e: `A taxa de desemprego de uma região caiu de ${a}% para ${b}% em dois anos. Em termos relativos, o número de desempregados (com a mesma população economicamente ativa) diminuiu:`,
      r: rel,
      d: [a - b, ((a - b) / b) * 100, rel / 2, 100 - rel, b],
      f: P,
      x: expl('variação relativa', `Queda relativa = (antigo − novo) ÷ antigo. A queda de ${a - b} pontos percentuais é diferente da queda relativa.`, `(${a} − ${b}) ÷ ${a} = ${num((a - b) / a, 4)} = ${P(rel)}.`),
    };
  },
  // 8. ICMS "por dentro"
  (r) => {
    const base = r.pick([82, 164, 246, 410]);
    const aliq = 18;
    const preco = base / (1 - aliq / 100);
    return {
      e: `O ICMS é calculado "por dentro": o imposto é ${aliq}% do PREÇO FINAL, e não do valor sem imposto. Se uma mercadoria vale ${reais(base)} sem o imposto, qual deve ser o preço final?`,
      r: preco,
      d: [base * (1 + aliq / 100), base + aliq, preco + 18, base * 1.36],
      f: reais,
      x: expl('porcentagem sobre o valor final', `Se o imposto é ${aliq}% do preço final, o valor sem imposto é ${100 - aliq}% do preço final.`, `Preço = ${reais(base)} ÷ ${num(1 - aliq / 100)} = ${reais(preco)}.`),
    };
  },
  // 9. aumentos mensais acumulados
  (r) => {
    const t = r.pick([2, 5, 10]);
    const n = r.pick([3, 4]);
    const ac = arred(((1 + t / 100) ** n - 1) * 100, 2);
    return {
      e: `A conta de luz de uma família aumentou ${t}% ao mês por ${n} meses seguidos. O aumento acumulado no período foi de aproximadamente:`,
      r: ac,
      d: [t * n, arred(ac - 1.5, 2), arred(ac + 3, 2), t ** n, arred(ac / 2, 2)],
      f: P,
      x: expl('juros compostos', 'Aumentos mensais sucessivos se multiplicam (efeito "juros sobre juros").', `${num(1 + t / 100)}${['', '', '²', '³', '⁴'][n]} = ${num((1 + t / 100) ** n, 4)} → ${P(ac)}.`),
    };
  },
  // 10. margem de erro
  (r) => {
    const a = r.int(36, 42);
    const gap = r.pick([2, 3, 4, 7, 8]);
    const m = r.pick([2, 3]);
    const b = a - gap;
    const empate = gap <= 2 * m;
    return {
      e: `Uma pesquisa eleitoral com margem de erro de ${m} pontos percentuais, para mais ou para menos, mostra o candidato X com ${a}% e o candidato Y com ${b}%. É correto concluir que:`,
      r: empate
        ? `há empate técnico, pois os intervalos ${a - m}%–${a + m}% e ${b - m}%–${b + m}% se sobrepõem`
        : `X está à frente, pois mesmo no pior caso (${a - m}%) supera o melhor caso de Y (${b + m}%)`,
      d: [
        empate ? `X está à frente, pois tem ${gap} pontos a mais que Y` : `há empate técnico, pois a diferença é menor que 10 pontos`,
        `X tem ${gap}% a mais de votos que Y`,
        `Y pode ter até ${b + 2 * m}% dos votos`,
        `a margem de erro só vale para o candidato que está na frente`,
        `X vencerá com certeza a eleição`,
      ],
      x: expl('intervalos de confiança', `Cada número pode variar ${m} pontos. Compare o menor valor possível de X com o maior valor possível de Y.`, `X: ${a - m}% a ${a + m}%; Y: ${b - m}% a ${b + m}%. ${empate ? 'Os intervalos se cruzam: empate técnico.' : 'Os intervalos não se cruzam.'}`),
    };
  },
  // 11. paradoxo da melancia
  (r) => {
    const m = r.pick([10, 20, 50, 100]);
    const [p1, p2] = r.pick([[99, 98], [98, 96], [95, 90], [99, 96]]);
    const seca = (m * (100 - p1)) / 100;
    const nova = seca / ((100 - p2) / 100);
    return {
      e: `Uma carga de ${m} kg de melancias tem ${p1}% de água em massa. Depois de alguns dias ao sol, a porcentagem de água caiu para ${p2}%. Qual é a nova massa da carga?`,
      r: nova,
      d: [m - (p1 - p2) * m / 100, m * (p2 / p1), m - p1 + p2, m / 4 > nova ? m / 4 + 1 : m * 0.9],
      f: (v) => `${num(v)} kg`,
      x: expl('o que não muda', 'Só a água evapora; a parte sólida (massa seca) continua a mesma. Ela é que passa a representar uma porcentagem maior.', `Massa seca: ${100 - p1}% de ${m} = ${num(seca)} kg. Agora ela é ${100 - p2}% do total: ${num(seca)} ÷ ${num((100 - p2) / 100)} = ${num(nova)} kg.`),
    };
  },
  // 12. média de porcentagens (pesos)
  (r) => {
    const [n1, n2] = r.pick([[20, 30], [40, 10], [25, 35], [30, 50]]);
    const [p1, p2] = r.pick([[80, 50], [90, 60], [70, 40], [60, 90]]);
    const tot = ((n1 * p1 + n2 * p2) / (n1 + n2));
    return {
      e: `A turma A, com ${n1} alunos, teve ${p1}% de aprovação; a turma B, com ${n2} alunos, teve ${p2}%. Qual foi a taxa de aprovação considerando as duas turmas juntas?`,
      r: arred(tot, 2),
      d: [(p1 + p2) / 2, p1 + p2 - 100, arred(tot + 5, 2), Math.max(p1, p2), arred(tot - 4, 2)],
      f: P,
      x: expl('média ponderada', 'Não se tira a média simples de porcentagens de grupos com tamanhos diferentes: conte os aprovados de cada turma.', `Aprovados: ${(n1 * p1) / 100} + ${(n2 * p2) / 100} = ${(n1 * p1 + n2 * p2) / 100} de ${n1 + n2} = ${P(tot)}.`),
    };
  },
  // 13. preço após reajuste com valor desconhecido
  (r) => {
    const [x, y] = nomes(r, 2);
    const a = r.pick([20, 25, 50]);
    const pa = r.pick([40, 60, 80]);
    const pb = pa * (1 + a / 100);
    const d = arred((1 - pa / pb) * 100, 2);
    return {
      e: `O produto de ${x} custa ${a}% a mais que o produto de ${y}. Em quantos por cento o produto de ${y} é mais barato que o de ${x}?`,
      r: d,
      d: [a, a / 2, arred(d + 5, 2), 100 - a, arred(d - 4, 2)],
      f: P,
      x: expl('a base da porcentagem muda', `Se ${y} custa 100, ${x} custa ${100 + a}. A diferença (${a}) agora é comparada com ${100 + a}.`, `${a} ÷ ${100 + a} = ${num(a / (100 + a), 4)} = ${P(d)}.`),
    };
  },
  // 14. lucro percentual de revenda com perdas
  (r) => {
    const cx = r.pick([100, 200]);
    const custo = r.pick([2, 3, 4]);
    const perda = r.pick([10, 20]);
    const venda = r.pick([5, 6]);
    const receita = cx * (1 - perda / 100) * venda;
    const gasto = cx * custo;
    const lucro = arred(((receita - gasto) / gasto) * 100, 2);
    return {
      e: `Um feirante compra ${cx} mangas a ${reais(custo)} cada. Sabe que ${perda}% estragam antes da venda. Vendendo as boas a ${reais(venda)} cada, qual é o lucro percentual sobre o que ele gastou?`,
      r: lucro,
      d: [arred(((venda - custo) / custo) * 100, 2), arred(lucro - perda, 2), arred(((venda - custo) / venda) * 100, 2), arred(lucro + 10, 2)],
      f: P,
      x: expl('lucro percentual', 'Lucro percentual = (receita − custo) ÷ custo. As mangas estragadas entram no custo, mas não na receita.', `Gasto: ${cx} × ${reais(custo)} = ${reais(gasto)}. Vende ${cx * (1 - perda / 100)} mangas: ${reais(receita)}. (${num(receita)} − ${num(gasto)}) ÷ ${num(gasto)} = ${P(lucro)}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[2].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '02-porcentagem',
    titulo: 'Porcentagem',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Aumentos e descontos, variações sucessivas, porcentagem de porcentagem, pontos percentuais e misturas.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
