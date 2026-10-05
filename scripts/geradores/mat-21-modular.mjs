// Matemática — Módulo e função modular (Álgebra).
import { expl, fracao, num } from './util.mjs';

const N = (v) => num(v);
const P = (v) => (v < 0 ? `(${num(v)})` : num(v));
const conj = (...xs) => `{${[...xs].sort((a, b) => a - b).map(N).join(', ')}}`;
const xmais = (a) => (a === 0 ? 'x' : a > 0 ? `x + ${a}` : `x − ${-a}`); // x + a

const facil = [
  // 1. expressão com módulos
  (r) => {
    const a = r.int(3, 12), b = r.int(1, 9), c = r.int(1, 9);
    const v = a + b - c;
    return {
      e: `Qual é o valor de |−${a}| + |${b}| − |−${c}|?`,
      r: v,
      d: [-a + b + c, -a + b - c, a + b + c, a - b - c],
      x: expl('módulo é distância até o zero', 'O módulo de um número é sempre maior ou igual a zero: tira-se o sinal de menos de dentro.', `${a} + ${b} − ${c} = ${v}.`),
    };
  },
  // 2. |x| = k
  (r) => {
    const k = r.int(2, 15);
    return {
      e: `Qual é o conjunto solução da equação |x| = ${k}?`,
      r: conj(-k, k),
      d: [`{${k}}`, `{−${k}}`, '∅', `{0, ${k}}`],
      x: expl('dois pontos à mesma distância', `Os números que estão a ${k} unidades do zero são ${k} e −${k}.`, `S = ${conj(-k, k)}.`),
    };
  },
  // 3. |x − a| = k
  (r) => {
    const a = r.int(-6, 9) || 3, k = r.int(2, 8);
    return {
      e: `Resolva |${xmais(-a)}| = ${k}.`,
      r: conj(a - k, a + k),
      d: [conj(-k, k), `{${N(a + k)}}`, conj(k - a, -(a + k)), conj(a - k + 1, a + k + 1)],
      x: expl('módulo = distância até um ponto', `|x − ${P(a)}| = ${k} diz que x está a ${k} unidades de ${N(a)}.`, `x = ${N(a)} + ${k} = ${N(a + k)} ou x = ${N(a)} − ${k} = ${N(a - k)}.`),
    };
  },
  // 4. distância na reta
  (r) => {
    const a = -r.int(2, 15), b = r.int(1, 20);
    return {
      e: `Na reta numérica, qual é a distância entre os pontos ${N(a)} e ${N(b)}?`,
      r: b - a,
      d: [b + a, Math.abs(b + a) + 1, b, -a],
      x: expl('distância = módulo da diferença', 'A distância entre dois números é |a − b|, e não depende da ordem.', `|${N(b)} − ${P(a)}| = |${b - a}| = ${b - a}.`),
    };
  },
  // 5. valor de f(x) = |x − a|
  (r) => {
    const a = r.int(1, 6), x = -r.int(1, 8);
    return {
      e: `Sendo f(x) = |x − ${a}|, qual é o valor de f(${N(x)})?`,
      r: a - x,
      d: [x - a, a + x, Math.abs(a + x) + 2, -x],
      x: expl('substituir e depois tirar o módulo', 'Primeiro faça a conta de dentro; só depois aplique o módulo.', `f(${N(x)}) = |${N(x)} − ${a}| = |${N(x - a)}| = ${a - x}.`),
    };
  },
  // 6. soma das soluções de |ax + b| = c
  (r) => {
    const a = r.pick([2, 3]), b = r.int(-7, 7) || 1, c = r.int(2, 11);
    const x1 = (c - b) / a, x2 = (-c - b) / a;
    return {
      e: `Qual é a soma das soluções da equação |${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}| = ${c}?`,
      r: x1 + x2,
      d: [x1, (c + b) / a, (2 * c) / a, x1 - x2],
      f: (v) => (Number.isInteger(v) ? N(v) : fracao(Math.round(v * a), a)),
      x: expl('abrir o módulo em dois casos', `${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c} ou ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = −${c}.`, `x = ${fracao(c - b, a)} ou x = ${fracao(-c - b, a)}; soma = ${fracao(-2 * b, a)}.`),
    };
  },
  // 7. vértice do gráfico
  (r) => {
    const a = r.int(-5, 6) || 2, k = r.int(-4, 5);
    return {
      e: `O gráfico de f(x) = |${xmais(-a)}| ${k < 0 ? '−' : '+'} ${Math.abs(k)} tem a forma de um "V". Qual é o vértice (bico) desse V?`,
      r: `(${N(a)}, ${N(k)})`,
      d: [`(${N(-a)}, ${N(k)})`, `(${N(a)}, ${N(-k)})`, `(${N(k)}, ${N(a)})`, `(0, ${N(Math.abs(a) + k)})`],
      x: expl('translação do gráfico de |x|', `O V de |x| tem bico na origem. Trocar x por x − ${P(a)} desloca o bico para x = ${N(a)}; somar ${N(k)} desloca na vertical.`, `Bico em (${N(a)}, ${N(k)}).`),
    };
  },
  // 8. inteiros em |x| < k
  (r) => {
    const k = r.int(2, 9);
    return {
      e: `Quantos números inteiros satisfazem |x| < ${k}?`,
      r: 2 * k - 1,
      d: [2 * k + 1, k, 2 * k, k - 1],
      x: expl('módulo menor que k = intervalo', `|x| < ${k} quer dizer −${k} < x < ${k}.`, `Inteiros de −${k - 1} a ${k - 1}: ${2 * k - 1} números.`),
    };
  },
  // 9. |x| ≥ k
  (r) => {
    const k = r.int(2, 9);
    return {
      e: `Qual é o conjunto solução de |x| ≥ ${k}?`,
      r: `x ≤ −${k} ou x ≥ ${k}`,
      d: [`−${k} ≤ x ≤ ${k}`, `x ≥ ${k}`, `x ≤ −${k}`, `x ≥ −${k}`],
      x: expl('módulo maior que k = fora do intervalo', `|x| ≥ ${k}: x está a ${k} ou mais unidades do zero, para a direita ou para a esquerda.`, `x ≤ −${k} ou x ≥ ${k}.`),
    };
  },
  // 10. √(x²) = |x|
  (r) => {
    const a = r.int(3, 12);
    return {
      e: `Qual é o valor de √((−${a})²)?`,
      r: a,
      d: [-a, a * a, -(a * a), `não existe`],
      f: (v) => (typeof v === 'number' ? N(v) : v),
      x: expl('√(x²) = |x|', 'A raiz quadrada nunca dá número negativo. Por isso, √(x²) é o módulo de x, e não o próprio x.', `(−${a})² = ${a * a} e √${a * a} = ${a}.`),
    };
  },
  // 11. imagem de |x| + k
  (r) => {
    const k = r.int(-6, 6) || -3;
    return {
      e: `Qual é o conjunto imagem da função f(x) = |x| ${k < 0 ? '−' : '+'} ${Math.abs(k)}, definida para todo x real?`,
      r: `[${N(k)}, +∞)`,
      d: [`(${N(k)}, +∞)`, `[${N(-k)}, +∞)`, 'ℝ', `(−∞, ${N(k)}]`],
      x: expl('o menor valor de |x| é 0', `|x| ≥ 0 para todo x, então |x| ${k < 0 ? '−' : '+'} ${Math.abs(k)} ≥ ${N(k)}, e o valor ${N(k)} é atingido em x = 0.`, `Imagem: [${N(k)}, +∞).`),
    };
  },
  // 12. amplitude térmica
  (r) => {
    const min = -r.int(2, 12), max = r.int(5, 20);
    return {
      e: `Numa cidade, a temperatura mínima do dia foi ${N(min)} °C e a máxima foi ${N(max)} °C. Qual foi a variação de temperatura no dia?`,
      r: max - min,
      d: [max + min, max, Math.abs(min), max - min + 2],
      f: (v) => `${N(v)} °C`,
      x: expl('distância entre dois números', 'A variação é a distância entre as duas temperaturas na reta: |máxima − mínima|.', `|${N(max)} − ${P(min)}| = ${max - min} °C.`),
    };
  },
  // 13. |π − 4|
  (r) => {
    const [txt, val, out] = r.pick([['π − 4', '4 − π', 'π − 4'], ['√2 − 2', '2 − √2', '√2 − 2'], ['3 − √10', '√10 − 3', '3 − √10'], ['1,5 − √3', '√3 − 1,5', '1,5 − √3']]);
    return {
      e: `Qual é o valor de |${txt}|?`,
      r: val,
      d: [out, `−${val.split(' − ')[0]} − ${val.split(' − ')[1]}`, `${val.replace('−', '+')}`, '0'],
      x: expl('sinal do que está dentro', `Se o que está dentro do módulo é negativo, o módulo troca o sinal: |a| = −a.`, `${txt} é negativo, então |${txt}| = −(${txt}) = ${val}.`),
    };
  },
  // 14. f(x) = a|x| + b
  (r) => {
    const a = r.int(2, 4), b = r.int(1, 5), x1 = -r.int(2, 5), x2 = r.int(1, 4);
    const v = a * Math.abs(x1) + b + a * Math.abs(x2) + b;
    return {
      e: `Sendo f(x) = ${a}|x| + ${b}, quanto vale f(${N(x1)}) + f(${x2})?`,
      r: v,
      d: [a * x1 + b + a * x2 + b, v - 2 * b, a * (x2 - x1), v + a],
      x: expl('substituir com cuidado', 'Calcule cada valor separadamente, lembrando que o módulo deixa o número positivo.', `f(${N(x1)}) = ${a}·${-x1} + ${b} = ${a * -x1 + b}; f(${x2}) = ${a}·${x2} + ${b} = ${a * x2 + b}; soma = ${v}.`),
    };
  },
  // 15. |x − a| = 0
  (r) => {
    const a = r.int(-9, 9) || 4;
    return {
      e: `Quantas soluções reais tem a equação |${xmais(-a)}| = 0?`,
      r: 1,
      d: [2, 0, 3, 'infinitas'],
      f: (v) => (typeof v === 'number' ? N(v) : v),
      x: expl('módulo zero só no próprio ponto', 'O único número com módulo zero é o zero.', `x − ${P(a)} = 0 ⇒ x = ${N(a)}: uma solução só.`),
    };
  },
  // 16. tolerância
  (r) => {
    const m = r.pick([50, 80, 120, 25]), e = r.pick([0.1, 0.2, 0.5, 0.05]);
    return {
      e: `Uma peça deve medir ${m} mm, com erro de no máximo ${num(e)} mm para mais ou para menos. Se x é a medida da peça, qual intervalo de valores é aceito?`,
      r: `[${num(m - e)}; ${num(m + e)}]`,
      d: [`[${num(m)}; ${num(m + e)}]`, `[${num(m - 2 * e)}; ${num(m + 2 * e)}]`, `[${num(m - e)}; ${num(m)}]`, `(${num(m - e)}; ${num(m + e)})`],
      x: expl('inequação modular', `"Erro de no máximo ${num(e)}" é |x − ${m}| ≤ ${num(e)}, ou seja, ${m} − ${num(e)} ≤ x ≤ ${m} + ${num(e)}.`, `Intervalo: [${num(m - e)}; ${num(m + e)}] mm (as pontas são aceitas).`),
    };
  },
  // 17. traduzir para módulo
  (r) => {
    const a = r.int(1, 9), k = r.int(1, 5);
    return {
      e: `Qual expressão diz que "a distância entre x e ${a} é menor que ${k}"?`,
      r: `|x − ${a}| < ${k}`,
      d: [`|x + ${a}| < ${k}`, `|x − ${k}| < ${a}`, `|x| − ${a} < ${k}`, `|x − ${a}| > ${k}`],
      x: expl('distância = módulo da diferença', 'A distância entre x e a é |x − a|.', `"Menor que ${k}" vira |x − ${a}| < ${k}.`),
    };
  },
];

const medio = [
  // 1. inteiros em |x − a| < k
  (r) => {
    const a = r.int(-4, 6), k = r.int(3, 8);
    return {
      e: `Quantos números inteiros satisfazem |${xmais(-a)}| < ${k}?`,
      r: 2 * k - 1,
      d: [2 * k + 1, 2 * k, k, 2 * k - 2],
      x: expl('abrir em intervalo', `|x − ${P(a)}| < ${k} ⇔ ${N(a - k)} < x < ${N(a + k)}.`, `Inteiros de ${N(a - k + 1)} a ${N(a + k - 1)}: ${2 * k - 1}.`),
    };
  },
  // 2. |x + a| > k
  (r) => {
    const a = r.int(1, 6), k = r.int(2, 7);
    return {
      e: `Qual é o conjunto solução de |x + ${a}| > ${k}?`,
      r: `x < ${N(-a - k)} ou x > ${N(k - a)}`,
      d: [`${N(-a - k)} < x < ${N(k - a)}`, `x < ${N(a - k)} ou x > ${N(a + k)}`, `x > ${N(k - a)}`, `x < ${N(-k)} ou x > ${N(k)}`],
      x: expl('módulo maior que k = fora do intervalo', `x + ${a} > ${k} ou x + ${a} < −${k}.`, `x > ${N(k - a)} ou x < ${N(-a - k)}.`),
    };
  },
  // 3. menor valor de |x − a| + |x − b|
  (r) => {
    const a = -r.int(1, 6), b = r.int(2, 9);
    return {
      e: `Qual é o menor valor possível da expressão |x ${a < 0 ? '+' : '−'} ${Math.abs(a)}| + |x − ${b}|, para x real?`,
      r: b - a,
      d: [b + a, 0, Math.abs(a), b],
      x: expl('soma de distâncias', `A expressão é a distância de x até ${N(a)} mais a distância de x até ${b}. Para qualquer x entre ${N(a)} e ${b}, essa soma é exatamente a distância entre os dois pontos.`, `Menor valor: ${b} − ${P(a)} = ${b - a}.`),
    };
  },
  // 4. |ax − b| = x + c
  (r) => {
    const [a, b, c] = r.pick([[2, 3, 3], [3, 1, 5], [2, 5, 1], [3, 2, 6], [4, 3, 3]]);
    const x1 = (b + c) / (a - 1); // ax − b = x + c
    const x2 = (b - c) / (a + 1); // ax − b = −x − c
    const sols = [x1, x2].filter((x) => x + c >= 0);
    const soma = sols.reduce((s, v) => s + v, 0);
    const fmt = (v) => (Number.isInteger(v) ? N(v) : fracao(Math.round(v * (a + 1) * (a - 1)), (a + 1) * (a - 1)));
    return {
      e: `Qual é a soma das soluções da equação |${a}x − ${b}| = x + ${c}?`,
      r: soma,
      d: [x1, x1 - x2, x1 + x2 + 1, 2 * x1],
      f: fmt,
      x: expl('dois casos e conferência', `O lado direito precisa ser ≥ 0. Caso 1: ${a}x − ${b} = x + ${c} ⇒ x = ${fmt(x1)}. Caso 2: ${a}x − ${b} = −x − ${c} ⇒ x = ${fmt(x2)}.`, `${sols.length === 2 ? 'As duas servem' : 'Só uma serve'}; soma = ${fmt(soma)}.`),
    };
  },
  // 5. equação em |x|
  (r) => {
    const [p, q] = r.pick([[2, 3], [1, 4], [2, 5], [1, 3]]);
    return {
      e: `Quantas soluções reais tem a equação |x|² − ${p + q}|x| + ${p * q} = 0?`,
      r: 4,
      d: [2, 0, 1, 3],
      x: expl('trocar |x| por uma letra', `Chame |x| = y: y² − ${p + q}y + ${p * q} = 0 ⇒ y = ${p} ou y = ${q}.`, `|x| = ${p} dá ±${p} e |x| = ${q} dá ±${q}: 4 soluções.`),
    };
  },
  // 6. área entre y = |x| e y = k
  (r) => {
    const k = r.int(2, 8);
    return {
      e: `Qual é a área da região limitada pelo gráfico de y = |x| e pela reta y = ${k}?`,
      r: k * k,
      d: [2 * k * k, (k * k) / 2, 2 * k, k],
      x: expl('desenhar o V', `A reta y = ${k} corta o V em (−${k}, ${k}) e (${k}, ${k}), formando um triângulo com vértice na origem.`, `Base ${2 * k} e altura ${k}: área = ${2 * k} · ${k} / 2 = ${k * k}.`),
    };
  },
  // 7. |x² − a|
  (r) => {
    const a = r.int(5, 20), x = r.int(1, 3);
    return {
      e: `Sendo f(x) = |x² − ${a}|, qual é o valor de f(${x}) + f(−${x})?`,
      r: 2 * Math.abs(x * x - a),
      d: [0, 2 * (x * x - a), Math.abs(x * x - a), 2 * (x * x + a)],
      x: expl('função par', `x² é igual para x e −x, então f(${x}) = f(−${x}).`, `f(${x}) = |${x * x} − ${a}| = ${Math.abs(x * x - a)}; soma = ${2 * Math.abs(x * x - a)}.`),
    };
  },
  // 8. lei por partes
  (r) => {
    const a = r.int(1, 8);
    return {
      e: `Para x < ${a}, a função f(x) = |x − ${a}| pode ser escrita sem módulo como:`,
      r: `f(x) = ${a} − x`,
      d: [`f(x) = x − ${a}`, `f(x) = x + ${a}`, `f(x) = −x − ${a}`, `f(x) = |x| − ${a}`],
      x: expl('sinal de dentro', `Se x < ${a}, então x − ${a} < 0, e o módulo troca o sinal: |x − ${a}| = −(x − ${a}).`, `f(x) = ${a} − x.`),
    };
  },
  // 9. pontos de y = |x| e y = k
  (r) => {
    const k = r.int(2, 9);
    return {
      e: `A reta y = ${k} corta o gráfico de y = |x| em dois pontos. Qual é a distância entre eles?`,
      r: 2 * k,
      d: [k, k * k, 2 * k + 2, Math.round(k * Math.SQRT2 * 100) / 100],
      x: expl('resolver |x| = k', `|x| = ${k} ⇒ x = −${k} ou x = ${k}. Os pontos são (−${k}, ${k}) e (${k}, ${k}).`, `Distância: ${k} − (−${k}) = ${2 * k}.`),
    };
  },
  // 10. módulo igual a negativo
  (r) => {
    const a = r.int(1, 9), k = r.int(1, 6);
    return {
      e: `Qual é o conjunto solução da equação |x − ${a}| = −${k}?`,
      r: '∅',
      d: [`{${a - k}}`, `{${a + k}}`, conj(a - k, a + k), 'ℝ'],
      x: expl('módulo nunca é negativo', `|algo| ≥ 0 para qualquer número, então nunca pode ser igual a −${k}.`, 'Não há solução: S = ∅.'),
    };
  },
  // 11. soma dos inteiros em |x − a| ≤ k
  (r) => {
    const a = r.int(-2, 5), k = r.int(2, 5);
    let s = 0;
    for (let x = a - k; x <= a + k; x++) s += x;
    return {
      e: `Qual é a soma de todos os números inteiros que satisfazem |${xmais(-a)}| ≤ ${k}?`,
      r: s,
      d: [s - a, s + a + k, (2 * k + 1), s + 2 * a],
      x: expl('intervalo simétrico em torno do centro', `|x − ${P(a)}| ≤ ${k} ⇔ ${N(a - k)} ≤ x ≤ ${N(a + k)}. São ${2 * k + 1} inteiros, com média ${N(a)}.`, `Soma = ${2 * k + 1} × ${P(a)} = ${s}.`),
    };
  },
  // 12. zeros de |x + a| − k
  (r) => {
    const a = r.int(1, 5), k = r.int(2, 7);
    return {
      e: `Quais são os zeros (raízes) da função f(x) = |x + ${a}| − ${k}?`,
      r: conj(-a - k, k - a),
      d: [conj(a - k, a + k), conj(-k, k), `{${N(k - a)}}`, conj(-a, k)],
      x: expl('zero: f(x) = 0', `|x + ${a}| = ${k} ⇒ x + ${a} = ${k} ou x + ${a} = −${k}.`, `x = ${N(k - a)} ou x = ${N(-a - k)}.`),
    };
  },
  // 13. módulo dentro de módulo
  (r) => {
    const a = r.int(2, 6), b = r.int(1, a - 1);
    return {
      e: `Quantas soluções reais tem a equação ||x| − ${a}| = ${b}?`,
      r: 4,
      d: [2, 1, 0, 3],
      x: expl('abrir de fora para dentro', `||x| − ${a}| = ${b} ⇒ |x| = ${a + b} ou |x| = ${a - b}. Os dois valores são positivos.`, `x = ±${a + b} ou x = ±${a - b}: 4 soluções.`),
    };
  },
  // 14. área de |x| + |y| = k
  (r) => {
    const k = r.int(1, 6);
    return {
      e: `Qual é a área da figura formada pelos pontos (x, y) do plano tais que |x| + |y| = ${k}?`,
      r: 2 * k * k,
      d: [k * k, 4 * k * k, 4 * k, (k * k) / 2],
      x: expl('quadrado "em pé"', `A figura é um losango (quadrado girado) com vértices em (±${k}, 0) e (0, ±${k}); as diagonais medem ${2 * k}.`, `Área = D · d / 2 = ${2 * k} · ${2 * k} / 2 = ${2 * k * k}.`),
    };
  },
  // 15. máximo num intervalo fechado
  (r) => {
    const b = r.int(5, 12), a = r.int(1, b - 1);
    if (2 * a === b) return medio[14](r);
    const mx = Math.max(a, b - a);
    return {
      e: `Qual é o maior valor que f(x) = |x − ${a}| assume para 0 ≤ x ≤ ${b}?`,
      r: mx,
      d: [0, Math.min(a, b - a), b, a + b],
      x: expl('o V cresce para os dois lados', `O menor valor (zero) fica em x = ${a}; o maior fica numa das pontas do intervalo, a que está mais longe de ${a}.`, `f(0) = ${a} e f(${b}) = ${b - a}; o maior é ${mx}.`),
    };
  },
  // 16. quando |x − a| = a − x
  (r) => {
    const a = r.int(1, 9);
    return {
      e: `Para quais valores de x vale a igualdade |x − ${a}| = ${a} − x?`,
      r: `x ≤ ${a}`,
      d: [`x ≥ ${a}`, `x = ${a}`, 'todos os reais', `x < 0`],
      x: expl('definição de módulo', `|y| = −y exatamente quando y ≤ 0. Aqui y = x − ${a}.`, `x − ${a} ≤ 0 ⇒ x ≤ ${a}.`),
    };
  },
  // 17. composição com módulo
  (r) => {
    const k = r.int(1, 4), x = -r.int(5, 12);
    const f = (t) => Math.abs(t) - k;
    return {
      e: `Sendo f(x) = |x| − ${k}, qual é o valor de f(f(${N(x)}))?`,
      r: f(f(x)),
      d: [f(x), -x - 2 * k, f(-f(x)) + 1, Math.abs(x)],
      x: expl('de dentro para fora', 'Calcule primeiro f do número e use o resultado como nova entrada.', `f(${N(x)}) = ${-x} − ${k} = ${f(x)}; f(${f(x)}) = ${Math.abs(f(x))} − ${k} = ${f(f(x))}.`),
    };
  },
];

const dificil = [
  // 1. soma de distâncias igual a k
  (r) => {
    const a = r.int(-2, 2), b = a + r.int(2, 4), k = b - a + 2 * r.int(1, 3);
    const x1 = (a + b - k) / 2, x2 = (a + b + k) / 2;
    return {
      e: `Qual é o conjunto solução da equação |${xmais(-a)}| + |x − ${b}| = ${k}?`,
      r: conj(x1, x2),
      d: [conj(a - k, b + k), `{${N(x2)}}`, '∅', conj(x1 + 1, x2 - 1)],
      x: expl('soma de distâncias', `Entre ${N(a)} e ${b} a soma vale só ${b - a}; para chegar a ${k}, x precisa estar fora, a ${(k - (b - a)) / 2} unidade${(k - (b - a)) / 2 === 1 ? '' : 's'} além de um dos pontos.`, `x = ${N(x1)} ou x = ${N(x2)}.`),
    };
  },
  // 2. |x² − bx| = c
  (r) => {
    const [b, c, sols] = r.pick([[5, 6, [-1, 2, 3, 6]], [7, 10, [-1.27, 2, 5, 8.27]], [5, 4, [1, 4, -0.7, 5.7]], [4, 3, [1, 3, -0.65, 4.65]]]);
    const soma = 2 * b;
    return {
      e: `Qual é a soma de todas as soluções reais da equação |x² − ${b}x| = ${c}?`,
      r: soma,
      d: [b, 3 * b, soma + c, 0],
      x: expl('dois casos, duas equações do 2º grau', `x² − ${b}x = ${c} ou x² − ${b}x = −${c}. Cada uma tem duas raízes reais, com soma ${b} (soma das raízes = −b/a).`, `Total: ${b} + ${b} = ${soma}.${sols ? '' : ''}`),
    };
  },
  // 3. |x − a| < |x + b|
  (r) => {
    const a = r.int(1, 6), b = r.int(1, 6);
    const m = (a - b) / 2;
    return {
      e: `Qual é o conjunto solução de |x − ${a}| < |x + ${b}|?`,
      r: `x > ${num(m)}`,
      d: [`x < ${num(m)}`, `x > ${a}`, `x > ${-b}`.replace('-', '−'), `x > ${num((a + b) / 2)}`],
      x: expl('mais perto de um ponto que do outro', `A desigualdade diz que x está mais perto de ${a} do que de −${b}. A fronteira é o ponto médio entre eles.`, `Ponto médio: (${a} + (−${b}))/2 = ${num(m)}; solução x > ${num(m)}.`),
    };
  },
  // 4. área entre |x − a| e y = k
  (r) => {
    const a = r.pick([-3, -2, -1, 1, 2, 3, 4]), k = r.int(2, 7);
    return {
      e: `Qual é a área da região limitada pelo gráfico de y = |${xmais(-a)}| e pela reta y = ${k}?`,
      r: k * k,
      d: [2 * k * k, k * k + Math.abs(a), (k * k) / 2, 2 * k],
      x: expl('translação não muda a área', `O V foi deslocado horizontalmente para o bico (${N(a)}, 0), mas a forma é a mesma de y = |x|.`, `Triângulo de base ${2 * k} e altura ${k}: área ${k * k}.`),
    };
  },
  // 5. inequação |ax − b| ≤ x + c
  (r) => {
    const [a, b, c] = r.pick([[2, 5, 1], [3, 4, 2], [2, 7, 1], [3, 2, 6]]);
    // −(x + c) ≤ ax − b ≤ x + c
    const sup = (b + c) / (a - 1), inf = (b - c) / (a + 1);
    const f = (v) => (Number.isInteger(v) ? N(v) : fracao(Math.round(v * 6), 6));
    return {
      e: `Qual é o conjunto solução da inequação |${a}x − ${b}| ≤ x + ${c}?`,
      r: `${f(inf)} ≤ x ≤ ${f(sup)}`,
      d: [`x ≤ ${f(sup)}`, `x ≥ ${f(inf)}`, `${f(inf)} < x < ${f(sup)}`, `x ≤ ${f(inf)} ou x ≥ ${f(sup)}`],
      x: expl('módulo menor ou igual = "sanduíche"', `|A| ≤ B ⇔ −B ≤ A ≤ B (exige B ≥ 0, o que acontece automaticamente aqui). Resolva as duas desigualdades.`, `${a}x − ${b} ≤ x + ${c} ⇒ x ≤ ${f(sup)}; ${a}x − ${b} ≥ −x − ${c} ⇒ x ≥ ${f(inf)}.`),
    };
  },
  // 6. pontos inteiros em |x| + |y| ≤ k
  (r) => {
    const k = r.int(2, 5);
    const t = 2 * k * k + 2 * k + 1;
    return {
      e: `Quantos pontos (x, y), com x e y inteiros, satisfazem |x| + |y| ≤ ${k}?`,
      r: t,
      d: [(2 * k + 1) ** 2, 4 * k + 1, t - 4 * k, 2 * k * k],
      x: expl('contar por linhas', `Para cada y de −${k} a ${k}, x varia de −(${k} − |y|) a ${k} − |y|: são 2(${k} − |y|) + 1 valores.`, `Somando: ${Array.from({ length: 2 * k + 1 }, (_, i) => 2 * (k - Math.abs(i - k)) + 1).join(' + ')} = ${t}.`),
    };
  },
  // 7. imagem de |x − a| − |x + a|
  (r) => {
    const a = r.int(1, 6);
    return {
      e: `Qual é o conjunto imagem da função f(x) = |x − ${a}| − |x + ${a}|?`,
      r: `[−${2 * a}, ${2 * a}]`,
      d: [`[0, ${2 * a}]`, `[−${a}, ${a}]`, 'ℝ', `[−${2 * a}, +∞)`],
      x: expl('analisar por trechos', `Para x ≤ −${a}, f vale ${2 * a}; para x ≥ ${a}, vale −${2 * a}; entre os dois, f(x) = −2x, que passa por todos os valores intermediários.`, `Imagem: [−${2 * a}, ${2 * a}].`),
    };
  },
  // 8. |x| = x² − k
  (r) => {
    const t = r.int(2, 5);
    const k = t * t - t; // y² − y − k = 0 com y = t
    return {
      e: `Quantas soluções reais tem a equação |x| = x² − ${k}?`,
      r: 2,
      d: [4, 1, 0, 3],
      x: expl('trocar x² por |x|²', `Como x² = |x|², chame |x| = y ≥ 0: y² − y − ${k} = 0 ⇒ y = ${t} ou y = ${1 - t} (negativo, não serve).`, `|x| = ${t} ⇒ x = ±${t}: 2 soluções.`),
    };
  },
  // 9. mínimo da soma de três distâncias
  (r) => {
    const pts = [r.int(0, 3), r.int(4, 7), r.int(9, 15)].sort((a, b) => a - b);
    const med = pts[1];
    const v = pts.reduce((s, p) => s + Math.abs(p - med), 0);
    const media = (pts[0] + pts[1] + pts[2]) / 3;
    return {
      e: `Qual é o menor valor de f(x) = |x − ${pts[0]}| + |x − ${pts[1]}| + |x − ${pts[2]}|?`,
      r: v,
      d: [pts.reduce((s, p) => s + Math.abs(p - media), 0), pts[2] - pts[0] + 1, 0, pts[0] + pts[1] + pts[2]].map((x) => Math.round(x * 100) / 100),
      x: expl('a mediana minimiza a soma de distâncias', `Com três pontos, o mínimo acontece no do meio, x = ${med}.`, `f(${med}) = ${pts.map((p) => Math.abs(p - med)).join(' + ')} = ${v}.`),
    };
  },
  // 10. número de soluções de |x² − a²| = k
  (r) => {
    const a = r.int(2, 4);
    const casos = [[a * a, 3], [a * a - 1, 4], [a * a + 1, 2]];
    const [k, n] = r.pick(casos);
    return {
      e: `Quantas soluções reais tem a equação |x² − ${a * a}| = ${k}?`,
      r: n,
      d: [1, 2, 3, 4, 0].filter((v) => v !== n),
      x: expl('desenhar o "W"', `O gráfico de |x² − ${a * a}| tem dois mínimos (em x = ±${a}, valor 0) e um máximo local em x = 0, com valor ${a * a}.`, `x² = ${a * a} + ${k} dá 2 soluções; x² = ${a * a} − ${k} dá ${a * a - k > 0 ? 2 : a * a - k === 0 ? 1 : 0}. Total: ${n}.`),
    };
  },
  // 11. |x − a| = bx
  (r) => {
    const [a, b] = r.pick([[3, 2], [4, 3], [6, 2], [5, 4]]);
    const x = a / (b + 1);
    return {
      e: `Qual é a solução da equação |x − ${a}| = ${b}x?`,
      r: x,
      d: [-a / (b - 1), a / (b - 1), a, x + 1],
      f: (v) => (Number.isInteger(v) ? N(v) : fracao(Math.round(v * (b + 1) * (b - 1)), (b + 1) * (b - 1))),
      x: expl('casos com conferência', `O lado direito exige ${b}x ≥ 0, isto é, x ≥ 0. Caso x − ${a} = ${b}x: x = ${fracao(-a, b - 1)} (negativo, não serve). Caso ${a} − x = ${b}x: x = ${fracao(a, b + 1)}.`, `Solução: x = ${fracao(a, b + 1)}.`),
    };
  },
  // 12. posto entre casas
  (r) => {
    const casas = [r.int(1, 3), r.int(5, 8), r.int(10, 14)];
    const med = casas[1];
    const v = casas.reduce((s, c) => s + Math.abs(c - med), 0);
    return {
      e: `Três casas ficam numa estrada reta, nos quilômetros ${casas.join(', ')}. Um posto de saúde será construído na estrada de modo que a soma das distâncias até as três casas seja a menor possível. Qual é essa soma mínima?`,
      r: v,
      d: [casas[2] - casas[0] + 2, Math.round(casas.reduce((s, c) => s + Math.abs(c - (casas[0] + casas[2]) / 2), 0) * 100) / 100, v + 3, casas[2]],
      f: (x) => `${num(x)} km`,
      x: expl('soma de módulos: a mediana é a melhor posição', `A soma é f(x) = |x − ${casas[0]}| + |x − ${casas[1]}| + |x − ${casas[2]}|, mínima na casa do meio.`, `No km ${med}: ${casas.map((c) => Math.abs(c - med)).join(' + ')} = ${v} km.`),
    };
  },
  // 13. raízes de quadrados perfeitos
  (r) => {
    const a = r.int(2, 6), b = r.int(1, 5);
    return {
      e: `Para −${b} ≤ x ≤ ${a}, a expressão √(x² − ${2 * a}x + ${a * a}) + √(x² + ${2 * b}x + ${b * b}) é igual a:`,
      r: a + b,
      d: [`2x + ${b - a}`.replace('+ -', '− '), a - b, `${a + b} − 2x`, 2 * a],
      f: (v) => String(typeof v === 'number' ? N(v) : v),
      x: expl('√(y²) = |y|', `Os radicandos são (x − ${a})² e (x + ${b})², então a expressão é |x − ${a}| + |x + ${b}|.`, `No intervalo dado, |x − ${a}| = ${a} − x e |x + ${b}| = x + ${b}; somando, ${a + b}.`),
    };
  },
  // 14. |x² − 4x| = k
  (r) => {
    const k = 3;
    return {
      e: `Quantas soluções reais tem a equação |x² − 4x| = ${k}?`,
      r: 4,
      d: [2, 3, 1, 0],
      x: expl('dois casos', `x² − 4x = ${k} tem discriminante 16 + ${4 * k} > 0 (2 raízes); x² − 4x = −${k} tem discriminante 16 − ${4 * k} > 0 (2 raízes).`, `Total: 4 soluções (x = 1, x = 3 e x = 2 ± √7).`),
    };
  },
  // 15. domínio com raiz e módulo
  (r) => {
    const k = r.int(2, 7);
    return {
      e: `Quantos números inteiros pertencem ao domínio da função f(x) = √(${k} − |x|)?`,
      r: 2 * k + 1,
      d: [2 * k, k + 1, 2 * k - 1, k],
      x: expl('raiz quadrada exige radicando ≥ 0', `${k} − |x| ≥ 0 ⇔ |x| ≤ ${k} ⇔ −${k} ≤ x ≤ ${k}.`, `Inteiros de −${k} a ${k}: ${2 * k + 1}.`),
    };
  },
  // 16. |x + a| > 2x − b
  (r) => {
    const a = r.int(1, 4), b = r.int(2, 6);
    const lim = a + b; // caso x ≥ −a: x + a > 2x − b ⇒ x < a + b
    return {
      e: `Qual é o conjunto solução da inequação |x + ${a}| > 2x − ${b}?`,
      r: `x < ${lim}`,
      d: [`x > ${lim}`, `−${a} ≤ x < ${lim}`, `x < ${N((b - a) / 3)}`.replace('-', '−'), 'ℝ'],
      x: expl('dividir em casos', `Para x ≥ −${a}: x + ${a} > 2x − ${b} ⇒ x < ${lim}. Para x < −${a}: −x − ${a} > 2x − ${b} ⇒ x < ${fracao(b - a, 3)}, o que vale para todo x < −${a}.`, `Juntando: x < ${lim}.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '21-modulo-e-funcao-modular',
    titulo: 'Módulo e função modular',
    provas: ['Militares'],
    descricao: 'Módulo como distância, equações e inequações modulares, gráficos de funções com módulo e problemas de distância mínima.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
