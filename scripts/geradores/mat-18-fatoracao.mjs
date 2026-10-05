// Matemática — Frações, fatoração e produtos notáveis (Matemática básica).
import { expl, fracao, mdc, mmc, nome, num, reais } from './util.mjs';

const fr = fracao;
// monômio/binômio com sinal: termo(3, 'x') = "3x", termo(-1, 'x') = "−x"
const termo = (c, v = '') => (c === 1 && v ? v : c === -1 && v ? `−${v}` : `${num(c)}${v}`);
const mais = (c, v = '') => (c < 0 ? ` − ${termo(-c, v)}` : ` + ${termo(c, v)}`);
const bin = (a, v, b) => `${termo(a, v)}${mais(b)}`; // ax + b
const P = (n) => (n < 0 ? `(${num(n)})` : num(n));

const facil = [
  // 1. soma de frações com denominadores diferentes
  (r) => {
    const [b, d] = r.pick([[4, 6], [6, 9], [8, 12], [10, 15], [6, 8], [9, 12]]);
    const a = r.int(1, b - 1), c = r.int(1, d - 1);
    const m = mmc(b, d);
    return {
      e: `Qual é o resultado de ${a}/${b} + ${c}/${d}, na forma mais simples?`,
      r: fr(a * d + c * b, b * d),
      d: [fr(a + c, b + d), fr(a + c, m), fr(a * c, b * d), fr(a * d + c * b + m, b * d)],
      x: expl('MMC dos denominadores', 'Só dá para somar partes do mesmo tamanho; o MMC transforma as duas frações em pedaços iguais.', `MMC(${b}, ${d}) = ${m}: ${(a * m) / b}/${m} + ${(c * m) / d}/${m} = ${(a * m) / b + (c * m) / d}/${m} = ${fr(a * d + c * b, b * d)}.`),
    };
  },
  // 2. número misto para fração imprópria
  (r) => {
    const i = r.int(2, 6), d = r.pick([3, 4, 5, 7, 8]), n = r.int(1, d - 1);
    if (mdc(n, d) !== 1) return facil[1](r);
    return {
      e: `Uma receita pede ${i} ${n}/${d} xícaras de farinha. Escrito como uma única fração, isso é igual a:`,
      r: `${i * d + n}/${d}`,
      d: [`${i + n}/${d}`, `${i * n}/${d}`, `${i * d}/${d + n}`, `${i * d - n}/${d}`],
      x: expl('número misto = inteiros + fração', `Cada inteiro vale ${d}/${d}; junte os pedaços.`, `${i} × ${d} + ${n} = ${i * d + n}, então ${i} ${n}/${d} = ${i * d + n}/${d}.`),
    };
  },
  // 3. multiplicação com simplificação cruzada
  (r) => {
    const [a, b, c, d] = r.pick([[4, 9, 3, 8], [5, 12, 4, 15], [6, 7, 14, 9], [10, 21, 7, 25], [8, 15, 5, 12], [9, 16, 4, 27]]);
    return {
      e: `Calcule (${a}/${b}) × (${c}/${d}) e dê a resposta simplificada.`,
      r: fr(a * c, b * d),
      d: [`${a * c}/${b + d}`, fr(a * d, b * c), fr(a + c, b + d), fr(a * c, b * d * 2)],
      x: expl('simplificação cruzada', 'Antes de multiplicar, corte fatores comuns entre um numerador e o denominador da outra fração: as contas ficam menores.', `${a * c}/${b * d} = ${fr(a * c, b * d)}.`),
    };
  },
  // 4. divisão de frações: quantas porções
  (r) => {
    const [t, p] = r.pick([[[3, 4], [1, 8]], [[5, 2], [1, 4]], [[2, 3], [1, 6]], [[9, 4], [3, 8]], [[5, 3], [5, 12]]]);
    const q = (t[0] * p[1]) / (t[1] * p[0]);
    return {
      e: `Uma garrafa tem ${t[0]}/${t[1]} de litro de suco. Quantos copos de ${p[0]}/${p[1]} de litro dá para encher?`,
      r: q,
      d: [q - 2, q / 2, q + 2, q * 2],
      x: expl('divisão de frações', 'Perguntar "quantas vezes cabe" é dividir; dividir por uma fração é multiplicar pelo seu inverso.', `${t[0]}/${t[1]} ÷ ${p[0]}/${p[1]} = ${t[0]}/${t[1]} × ${p[1]}/${p[0]} = ${num(q)}.`),
    };
  },
  // 5. fração de uma quantidade
  (r) => {
    const d = r.pick([4, 5, 6, 8]), n = r.int(2, d - 1), tot = d * r.int(6, 15);
    if (mdc(n, d) !== 1) return facil[4](r);
    return {
      e: `Um tanque de ${tot} litros está com ${n}/${d} da capacidade. Quantos litros faltam para enchê-lo?`,
      r: tot - (tot * n) / d,
      d: [(tot * n) / d, tot / d, tot - n, (tot * (d - n)) / d + tot / d],
      x: expl('fração de quantidade', 'Divida pelo denominador (tamanho de cada parte) e multiplique pelo numerador. O que falta é a parte complementar.', `Falta ${d - n}/${d}: ${tot} ÷ ${d} × ${d - n} = ${num(tot - (tot * n) / d)} L.`),
    };
  },
  // 6. fração que sobra do salário
  (r) => {
    const [a, b] = r.pick([[3, 4], [3, 5], [4, 5], [5, 6], [4, 6], [3, 8]]);
    const m = mmc(a, b);
    return {
      e: `${nome(r)} gasta 1/${a} do salário com aluguel e 1/${b} com alimentação. Que fração do salário sobra para o resto?`,
      r: fr(m - m / a - m / b, m),
      d: [fr(2, a + b), fr(m / a + m / b, m), fr(1, a * b), fr(m - m / a - m / b + 1, m)],
      x: expl('complemento de frações', 'Some o que foi gasto e tire do inteiro (1 = salário todo).', `1/${a} + 1/${b} = ${fr(m / a + m / b, m)}; sobra 1 − ${fr(m / a + m / b, m)} = ${fr(m - m / a - m / b, m)}.`),
    };
  },
  // 7. maior fração
  (r) => {
    const fs = r.pick([[[3, 5], [5, 8], [7, 12], [2, 3]], [[4, 7], [3, 5], [5, 9], [7, 11]], [[5, 6], [7, 9], [11, 15], [4, 5]], [[2, 7], [3, 10], [1, 4], [4, 13]]]);
    const ord = [...fs].sort((p, q) => q[0] / q[1] - p[0] / p[1]);
    return {
      e: `Qual destas frações é a maior: ${fs.map((f) => f.join('/')).join(', ')}?`,
      r: ord[0].join('/'),
      d: [...ord.slice(1).map((f) => f.join('/')), '1/2'],
      x: expl('comparação por produto cruzado (ou decimal)', 'Para comparar a/b e c/d, compare a·d com c·b, ou transforme em decimais. Denominador maior não quer dizer fração maior.', fs.map((f) => `${f.join('/')} ≈ ${num(f[0] / f[1], 3)}`).join('; ') + '.'),
    };
  },
  // 8. simplificar até a forma irredutível
  (r) => {
    const [n, d] = r.pick([[2, 3], [3, 4], [5, 7], [4, 9], [7, 8], [5, 6]]);
    const k = r.pick([12, 14, 18, 21, 24]);
    return {
      e: `Qual é a forma irredutível da fração ${n * k}/${d * k}?`,
      r: `${n}/${d}`,
      d: [`${n * 2}/${d * 2}`, `${d}/${n}`, `${n}/${d + 1}`, `${n + 1}/${d}`],
      x: expl('MDC do numerador e do denominador', 'Dividir os dois termos pelo mesmo número não muda a fração; dividindo pelo MDC, chega-se direto à forma irredutível.', `MDC(${n * k}, ${d * k}) = ${k}: ${n * k} ÷ ${k} = ${n} e ${d * k} ÷ ${k} = ${d}.`),
    };
  },
  // 9. quadrado da soma
  (r) => {
    const a = r.pick([1, 2, 3]), b = r.int(2, 9);
    const v = a === 1 ? 'x' : `${a}x`;
    return {
      e: `Desenvolvendo (${v} + ${b})², obtemos:`,
      r: `${termo(a * a, 'x²')} + ${termo(2 * a * b, 'x')} + ${b * b}`,
      d: [`${termo(a * a, 'x²')} + ${b * b}`, `${termo(a * a, 'x²')} + ${termo(a * b, 'x')} + ${b * b}`, `${termo(a * a, 'x²')} + ${termo(2 * a * b, 'x')} + ${2 * b}`, `${termo(a, 'x²')} + ${termo(2 * b, 'x')} + ${b * b}`],
      x: expl('quadrado da soma', '(a + b)² = a² + 2ab + b². O "termo do meio" 2ab é o que mais se esquece.', `(${v})² + 2·${v}·${b} + ${b}² = ${termo(a * a, 'x²')} + ${termo(2 * a * b, 'x')} + ${b * b}.`),
    };
  },
  // 10. quadrado da diferença
  (r) => {
    const a = r.int(2, 5), b = r.int(1, 7);
    return {
      e: `A expressão (${a}y − ${b})² é igual a:`,
      r: `${a * a}y² − ${termo(2 * a * b, 'y')} + ${b * b}`,
      d: [`${a * a}y² − ${b * b}`, `${a * a}y² + ${termo(2 * a * b, 'y')} + ${b * b}`, `${a * a}y² − ${termo(2 * a * b, 'y')} − ${b * b}`, `${a * a}y² − ${termo(a * b, 'y')} + ${b * b}`],
      x: expl('quadrado da diferença', '(a − b)² = a² − 2ab + b²: o último termo é sempre positivo, porque é um quadrado.', `(${a}y)² − 2·${a}y·${b} + ${b}² = ${a * a}y² − ${2 * a * b}y + ${b * b}.`),
    };
  },
  // 11. conta de cabeça com (a + b)(a − b)
  (r) => {
    const c = r.pick([20, 30, 40, 50, 60, 70, 100]), k = r.int(1, 4);
    return {
      e: `Usando um produto notável, calcule ${c + k} × ${c - k} sem armar a conta.`,
      r: c * c - k * k,
      d: [c * c, c * c + k * k, c * c - 2 * k, c * c - k],
      x: expl('produto da soma pela diferença', `(a + b)(a − b) = a² − b². Os números estão a ${k} de distância de ${c}.`, `${c}² − ${k}² = ${c * c} − ${k * k} = ${num(c * c - k * k)}.`),
    };
  },
  // 12. fator comum em evidência
  (r) => {
    const g = r.pick([2, 3, 4, 5, 6]), a = r.int(2, 5), b = r.int(1, 7);
    if (mdc(a, b) !== 1) return facil[11](r);
    return {
      e: `Fatorando ${g * a}x² + ${g * b}x ao máximo, obtemos:`,
      r: `${g}x(${a}x + ${b})`,
      d: [`${g}(${a}x² + ${b}x)`, `x(${g * a}x + ${g * b})`, `${g}x(${a}x + ${g * b})`, `${g * a}x(x + ${b})`],
      x: expl('fator comum em evidência', 'Procure o maior número e a maior potência de x que aparecem em todos os termos e coloque-os em evidência.', `MDC(${g * a}, ${g * b}) = ${g} e o x aparece nos dois termos: ${g}x(${a}x + ${b}).`),
    };
  },
  // 13. diferença de quadrados
  (r) => {
    const b = r.int(3, 12), a = r.pick([1, 1, 2, 3]);
    const v = a === 1 ? 'x' : `${a}x`;
    return {
      e: `Qual é a forma fatorada de ${termo(a * a, 'x²')} − ${b * b}?`,
      r: `(${v} + ${b})(${v} − ${b})`,
      d: [`(${v} − ${b})²`, `(${v} + ${b})²`, `(${v} − ${b * b})(${v} + 1)`, `(${v} + ${b * b})(${v} − 1)`],
      x: expl('diferença de quadrados', 'a² − b² = (a + b)(a − b). Reconheça os dois quadrados e escreva "soma vezes diferença".', `${termo(a * a, 'x²')} = (${v})² e ${b * b} = ${b}².`),
    };
  },
  // 14. quadrado de número próximo de uma dezena redonda
  (r) => {
    const c = r.pick([100, 200, 50, 1000]), k = r.int(1, 4) * r.pick([1, -1]);
    const n = c + k;
    return {
      e: `Pensando em ${n} = ${c} ${k > 0 ? '+' : '−'} ${Math.abs(k)}, calcule ${num(n)}².`,
      r: n * n,
      d: [c * c + k * k, c * c + 2 * c * k, c * c - k * k, n * n + 2 * Math.abs(k)],
      x: expl(k > 0 ? 'quadrado da soma' : 'quadrado da diferença', 'Quebre o número em uma parte redonda e um pedacinho; o termo 2ab não pode faltar.', `${num(c)}² ${k > 0 ? '+' : '−'} 2·${num(c)}·${Math.abs(k)} + ${Math.abs(k)}² = ${num(n * n)}.`),
    };
  },
  // 15. equação com frações
  (r) => {
    const [a, b] = r.pick([[3, 4], [2, 5], [3, 6], [4, 6], [2, 3], [5, 10]]);
    const m = mmc(a, b), x = m * r.int(1, 5);
    const s = x / a + x / b;
    return {
      e: `Resolva a equação x/${a} + x/${b} = ${num(s)}.`,
      r: x,
      d: [(s * a * b) / (a + b) + m, s * 2, s * m, x / 2],
      x: expl('multiplicar pelo MMC', `Multiplique a equação toda por ${m} (MMC de ${a} e ${b}) para sumir com os denominadores.`, `${m / a}x + ${m / b}x = ${num(s * m)} ⇒ ${m / a + m / b}x = ${num(s * m)} ⇒ x = ${x}.`),
    };
  },
  // 16. decimal para fração
  (r) => {
    const [dec, n, d] = r.pick([['0,375', 3, 8], ['0,625', 5, 8], ['0,24', 6, 25], ['0,45', 9, 20], ['0,875', 7, 8], ['0,16', 4, 25], ['1,25', 5, 4]]);
    return {
      e: `Qual fração irredutível representa o número ${dec}?`,
      r: `${n}/${d}`,
      d: [`${d}/${n}`, `${n}/${d * 10}`, `${n + 1}/${d}`, `${n}/${d + 2}`],
      x: expl('decimal sobre potência de 10', 'Escreva os algarismos sobre 10, 100 ou 1 000 (um zero por casa decimal) e simplifique.', `${dec} = ${dec.replace(',', '').replace(/^0+/, '')}/${10 ** dec.split(',')[1].length} = ${n}/${d}.`),
    };
  },
  // 17. dízima periódica simples
  (r) => {
    const per = r.pick(['3', '4', '7', '12', '27', '36', '45', '8']);
    const n = +per, d = per.length === 1 ? 9 : 99;
    const rep = per.repeat(per.length === 1 ? 4 : 3);
    return {
      e: `Qual é a fração geratriz da dízima periódica 0,${rep}...?`,
      r: fr(n, d),
      d: [`${n}/${d === 9 ? 100 : 1000}`, `${n}/${d + 1}`, fr(n + 1, d), `${d}/${n}`],
      x: expl('regra da geratriz', `Na dízima simples, o período vai no numerador e, no denominador, um 9 para cada algarismo do período.`, `0,${rep}... = ${n}/${d} = ${fr(n, d)}.`),
    };
  },
];

const medio = [
  // 1. a² + b² a partir de a + b e ab
  (r) => {
    const a = r.int(1, 9), b = r.int(1, 9);
    const s = a + b, p = a * b;
    return {
      e: `Sabendo que a + b = ${s} e a·b = ${p}, qual é o valor de a² + b²?`,
      r: s * s - 2 * p,
      d: [s * s, s * s + 2 * p, s * s - p, 2 * s - p].filter((v) => v !== s * s - 2 * p),
      x: expl('quadrado da soma (usado ao contrário)', 'Não precisa descobrir a e b: (a + b)² = a² + 2ab + b², então a² + b² = (a + b)² − 2ab.', `${s}² − 2·${p} = ${s * s} − ${2 * p} = ${s * s - 2 * p}.`),
    };
  },
  // 2. simplificar fração algébrica e calcular
  (r) => {
    const k = r.int(2, 7), x = r.int(2, 9);
    if (x === k) return medio[1](r);
    return {
      e: `Simplifique (x² − ${k * k})/(x² + ${k}x) e calcule o resultado para x = ${x}.`,
      r: fr(x - k, x),
      d: [fr(x + k, x), fr(x - k, x + k), fr(x * x - k * k, x), fr(k, x)],
      x: expl('fatorar antes de simplificar', 'Em frações algébricas só se cortam fatores (multiplicações), nunca parcelas. Fatore em cima e embaixo.', `(x − ${k})(x + ${k}) / [x(x + ${k})] = (x − ${k})/x; para x = ${x}: ${fr(x - k, x)}.`),
    };
  },
  // 3. completar o trinômio quadrado perfeito
  (r) => {
    const b = r.int(3, 11);
    return {
      e: `Para que valor positivo de k a expressão x² + kx + ${b * b} é um trinômio quadrado perfeito?`,
      r: 2 * b,
      d: [b, b * b, 4 * b, b + 2],
      x: expl('trinômio quadrado perfeito', `x² + kx + ${b * b} = (x + ${b})² exige que o termo do meio seja 2·x·${b}.`, `k = 2 · ${b} = ${2 * b}.`),
    };
  },
  // 4. fator comum numérico
  (r) => {
    const a = r.int(13, 49), b = r.int(21, 79);
    const c = 100 - b;
    return {
      e: `Calcule ${a} × ${b} + ${a} × ${c} de cabeça.`,
      r: a * 100,
      d: [a * b + c, a * 100 + b, (a + b) * c, a * 10],
      x: expl('fator comum em evidência', `O ${a} se repete nas duas parcelas: a·b + a·c = a·(b + c).`, `${a} × (${b} + ${c}) = ${a} × 100 = ${num(a * 100)}.`),
    };
  },
  // 5. diferença de quadrados com números grandes
  (r) => {
    const n = r.pick([2024, 1999, 501, 1001, 2025, 350]), k = r.pick([1, 2, 3]);
    return {
      e: `Qual é o valor de ${num(n + k)}² − ${num(n)}²?`,
      r: k * (2 * n + k),
      d: [k * k, k * 2 * n, (2 * n + k) / k + 1, k * (2 * n - k)],
      x: expl('diferença de quadrados', 'a² − b² = (a + b)(a − b): em vez de elevar números grandes ao quadrado, some e subtraia.', `(${n + k} + ${n})(${n + k} − ${n}) = ${2 * n + k} × ${k} = ${num(k * (2 * n + k))}.`),
    };
  },
  // 6. frações sucessivas: quanto tinha
  (r) => {
    const [n1, d1, n2, d2] = r.pick([[2, 5, 1, 3], [1, 4, 2, 3], [1, 3, 1, 4], [3, 8, 2, 5], [1, 2, 1, 3]]);
    const resta = ((d1 - n1) / d1) * ((d2 - n2) / d2);
    const tot = r.pick([240, 360, 480, 600, 720, 960, 1200]);
    const fim = tot * resta;
    if (!Number.isInteger(fim)) return medio[5](r);
    return {
      e: `${nome(r)} gastou ${n1}/${d1} do dinheiro que tinha e, depois, ${n2}/${d2} do que sobrou. Ficou com ${reais(fim)}. Quanto tinha no início?`,
      r: tot,
      d: [fim / (1 - n1 / d1 - n2 / d2), fim * d1, fim / ((d1 - n1) / d1), fim * (d1 + d2) / (d1 - n1)].map((v) => Math.round(v)),
      f: reais,
      x: expl('fração da fração (de trás para frente)', `"Do que sobrou" quer dizer que a segunda fração é aplicada à sobra, não ao total. Sobrou ${d1 - n1}/${d1} × ${d2 - n2}/${d2} = ${fr((d1 - n1) * (d2 - n2), d1 * d2)} do valor inicial.`, `${fr((d1 - n1) * (d2 - n2), d1 * d2)} do total = ${reais(fim)} ⇒ total = ${reais(tot)}.`),
    };
  },
  // 7. dízima composta
  (r) => {
    const [txt, n, d] = r.pick([['0,1666...', 1, 6], ['0,8333...', 5, 6], ['1,2333...', 37, 30], ['0,2777...', 5, 18], ['0,4111...', 37, 90], ['2,1555...', 97, 45]]);
    return {
      e: `Qual fração irredutível é igual à dízima ${txt}?`,
      r: `${n}/${d}`,
      d: [`${n + 1}/${d}`, `${d}/${n}`, `${n}/${d * 3}`, `${n * 2}/${d + 1}`],
      x: expl('dízima composta', 'Chame a dízima de x, multiplique por potências de 10 para alinhar o período e subtraia: a parte que se repete some.', `Fazendo isso, ${txt} = ${n}/${d}.`),
    };
  },
  // 8. produto telescópico
  (r) => {
    const n = r.int(5, 30);
    return {
      e: `Qual é o valor do produto (1 + 1/2)(1 + 1/3)(1 + 1/4) ··· (1 + 1/${n})?`,
      r: fr(n + 1, 2),
      d: [fr(n, 2), fr(n + 1, n), fr(1, n + 1), fr(n + 2, 2)],
      x: expl('cancelamento em cadeia (telescópica)', 'Escreva cada fator como uma fração só: 3/2 · 4/3 · 5/4 ··· O numerador de um cancela o denominador do seguinte.', `Sobra ${n + 1}/2 = ${fr(n + 1, 2)}.`),
    };
  },
  // 9. soma de cubos
  (r) => {
    const b = r.int(2, 5);
    return {
      e: `Qual é a forma fatorada de x³ + ${b ** 3}?`,
      r: `(x + ${b})(x² − ${b}x + ${b * b})`,
      d: [`(x + ${b})³`, `(x + ${b})(x² + ${b}x + ${b * b})`, `(x − ${b})(x² + ${b}x + ${b * b})`, `(x + ${b})(x² + ${b * b})`],
      x: expl('soma de cubos', 'a³ + b³ = (a + b)(a² − ab + b²). Confira multiplicando: os termos do meio se cancelam.', `${b ** 3} = ${b}³, então x³ + ${b}³ = (x + ${b})(x² − ${b}x + ${b * b}).`),
    };
  },
  // 10. cubo da soma: coeficiente
  (r) => {
    const b = r.int(2, 5);
    return {
      e: `No desenvolvimento de (x + ${b})³, qual é o coeficiente de x?`,
      r: 3 * b * b,
      d: [b * b, 3 * b, b ** 3, 2 * b * b],
      x: expl('cubo da soma', '(a + b)³ = a³ + 3a²b + 3ab² + b³. O termo com x¹ é 3·a·b².', `3 · x · ${b}² = ${3 * b * b}x.`),
    };
  },
  // 11. equação fracionária
  (r) => {
    const x = r.pick([2, 3, 4, 5, 6]);
    const s = 1 / x + 1 / (2 * x);
    const [n, d] = fr(3, 2 * x).split('/').map(Number);
    return {
      e: `Qual é a solução de 1/x + 1/(2x) = ${n}/${d}?`,
      r: x,
      d: [2 * x, x + 1, x / 2 === Math.floor(x / 2) ? x / 2 : x + 2, 3 * x],
      x: expl('denominador comum', 'Escreva o lado esquerdo como uma fração só, com denominador 2x.', `2/(2x) + 1/(2x) = 3/(2x) = ${n}/${d} ⇒ 2x = ${2 * x} ⇒ x = ${x}.`),
    };
  },
  // 12. torneiras
  (r) => {
    const [a, b] = r.pick([[3, 6], [4, 12], [6, 12], [2, 3], [10, 15], [12, 24], [4, 6]]);
    const t = (a * b) / (a + b);
    return {
      e: `Uma torneira enche um tanque em ${a} horas, e outra enche o mesmo tanque em ${b} horas. Abertas juntas, em quantas horas elas enchem o tanque?`,
      r: t,
      d: [(a + b) / 2, a + b, b - a, Math.min(a, b) / 2],
      x: expl('soma de taxas', `Em 1 hora, a primeira enche 1/${a} do tanque e a segunda 1/${b}. Juntas: 1/${a} + 1/${b} = ${fr(a + b, a * b)} do tanque por hora.`, `Tempo = 1 ÷ ${fr(a + b, a * b)} = ${num(t)} h.`),
    };
  },
  // 13. simplificar com trinômio quadrado perfeito
  (r) => {
    const k = r.int(2, 6), x = r.int(1, 10);
    if (x === k || x === -k) return medio[12](r);
    return {
      e: `Qual é o valor de (x² − ${2 * k}x + ${k * k})/(x² − ${k * k}) para x = ${x}?`,
      r: fr(x - k, x + k),
      d: [fr(x + k, x - k), fr(x - k, x), fr((x - k) ** 2, x + k), '1'],
      x: expl('fatorar e cortar', `Em cima há um quadrado perfeito, (x − ${k})², e embaixo uma diferença de quadrados, (x − ${k})(x + ${k}).`, `Sobra (x − ${k})/(x + ${k}) = ${x - k}/${x + k} = ${fr(x - k, x + k)}.`),
    };
  },
  // 14. x − 1/x = k ⇒ x² + 1/x²
  (r) => {
    const k = r.int(2, 6);
    return {
      e: `Se x − 1/x = ${k}, qual é o valor de x² + 1/x²?`,
      r: k * k + 2,
      d: [k * k, k * k - 2, 2 * k, k * k + 1],
      x: expl('quadrado da diferença', 'Eleve a igualdade ao quadrado: (x − 1/x)² = x² − 2·x·(1/x) + 1/x² = x² − 2 + 1/x².', `${k}² = x² + 1/x² − 2 ⇒ x² + 1/x² = ${k * k + 2}.`),
    };
  },
  // 15. fração entre duas frações
  (r) => {
    const [a, b, c, d] = r.pick([[2, 5, 3, 7], [1, 3, 2, 5], [3, 4, 4, 5], [5, 8, 2, 3], [1, 6, 1, 5]]);
    const med = `${a + c}/${b + d}`;
    const lo = a / b, hi = c / d;
    const fora = [[1, 2], [3, 5], [2, 9], [5, 6], [7, 9], [1, 4], [4, 7], [7, 10], [3, 10]].filter(([p, q]) => p / q < lo || p / q > hi).map((f) => f.join('/'));
    return {
      e: `Qual das frações abaixo fica entre ${a}/${b} e ${c}/${d}?`,
      r: med,
      d: r.sample(fora, 4),
      x: expl('mediante (soma "errada" que funciona)', 'Somando numeradores e denominadores, (a + c)/(b + d) sempre cai entre a/b e c/d. Confira com decimais.', `${a}/${b} ≈ ${num(lo, 3)}, ${med} ≈ ${num((a + c) / (b + d), 3)}, ${c}/${d} ≈ ${num(hi, 3)}.`),
    };
  },
  // 16. páginas do livro
  (r) => {
    const [a, b] = r.pick([[4, 3], [5, 3], [6, 4], [3, 5], [8, 4]]);
    const m = mmc(a, b), resta = m - m / a - m / b;
    const pag = resta * r.int(4, 12) * 5;
    const tot = (pag * m) / resta;
    return {
      e: `${nome(r)} leu 1/${a} de um livro na segunda-feira e 1/${b} na terça. Ainda faltam ${pag} páginas. Quantas páginas tem o livro?`,
      r: tot,
      d: [pag * 2, pag + pag / 2, (pag * a * b) / (a + b), tot + pag / resta],
      x: expl('parte que falta = páginas que faltam', `Leu 1/${a} + 1/${b} = ${fr(m / a + m / b, m)}; faltam ${fr(resta, m)} do livro.`, `${fr(resta, m)} do livro = ${pag} páginas ⇒ livro = ${pag} ÷ ${fr(resta, m)} = ${tot}.`),
    };
  },
  // 17. fatoração completa
  (r) => {
    const g = r.int(2, 5), b = r.int(2, 6);
    return {
      e: `Fatorando completamente ${g}x³ − ${g * b * b}x, obtemos:`,
      r: `${g}x(x − ${b})(x + ${b})`,
      d: [`${g}x(x² − ${b * b})`, `${g}x(x − ${b})²`, `x(${g}x − ${b})(${g}x + ${b})`, `${g}(x − ${b})(x + ${b})`],
      x: expl('evidência e depois diferença de quadrados', 'Fatore em etapas: primeiro o fator comum, depois veja se o que sobrou ainda pode ser fatorado.', `${g}x(x² − ${b * b}) = ${g}x(x − ${b})(x + ${b}).`),
    };
  },
];

const dificil = [
  // 1. a³ + b³ a partir de a + b e ab
  (r) => {
    const a = r.int(1, 6), b = r.int(1, 6);
    const s = a + b, p = a * b;
    return {
      e: `Se a + b = ${s} e a·b = ${p}, qual é o valor de a³ + b³?`,
      r: s ** 3 - 3 * p * s,
      d: [s ** 3, s ** 3 - p * s, s ** 3 - 3 * p, s * s - 2 * p],
      x: expl('cubo da soma', '(a + b)³ = a³ + b³ + 3ab(a + b). Isole a³ + b³ sem precisar achar a e b.', `${s}³ − 3·${p}·${s} = ${s ** 3} − ${3 * p * s} = ${s ** 3 - 3 * p * s}.`),
    };
  },
  // 2. (a⁴ − b⁴)/((a² + b²)(a − b))
  (r) => {
    const a = r.int(5, 40), b = r.int(1, 4);
    return {
      e: `Qual é o valor de (${a}⁴ − ${b}⁴) ÷ [(${a}² + ${b}²) · (${a} − ${b})]?`,
      r: a + b,
      d: [a - b, a * b, a * a + b * b, 1],
      x: expl('diferença de quadrados duas vezes', 'a⁴ − b⁴ = (a² + b²)(a² − b²) = (a² + b²)(a + b)(a − b). Quase tudo se cancela.', `Sobra a + b = ${a} + ${b} = ${a + b}.`),
    };
  },
  // 3. soma telescópica
  (r) => {
    const n = r.int(9, 99);
    return {
      e: `Qual é o valor da soma 1/(1·2) + 1/(2·3) + 1/(3·4) + ··· + 1/(${n}·${n + 1})?`,
      r: fr(n, n + 1),
      d: [fr(1, n + 1), fr(n + 1, n), fr(n - 1, n), fr(n, n + 2)],
      x: expl('frações parciais (telescópica)', '1/[k(k + 1)] = 1/k − 1/(k + 1). Escrevendo assim, cada termo cancela parte do seguinte.', `Sobra 1 − 1/${n + 1} = ${fr(n, n + 1)}.`),
    };
  },
  // 4. (x³ − 1)/(x − 1)
  (r) => {
    const x = r.int(11, 99);
    return {
      e: `Sem fazer a divisão, calcule (${x}³ − 1) ÷ (${x} − 1).`,
      r: x * x + x + 1,
      d: [x * x + 1, x * x - x + 1, x * x + x, (x + 1) * (x + 1)],
      x: expl('diferença de cubos', 'a³ − b³ = (a − b)(a² + ab + b²). Com b = 1, o quociente é a² + a + 1.', `${x}² + ${x} + 1 = ${num(x * x + x + 1)}.`),
    };
  },
  // 5. divisores de 2^16 − 1
  (r) => {
    const n = r.pick([[16, [3, 5, 17, 257], [7, 11, 13]], [8, [3, 5, 15, 17], [7, 11, 13]], [12, [3, 5, 7, 13], [11, 17, 19]]]);
    const [e, sim, nao] = n;
    const certo = r.pick(nao);
    return {
      e: `O número 2${e === 16 ? '¹⁶' : e === 8 ? '⁸' : '¹²'} − 1 pode ser fatorado com produtos notáveis. Qual destes números NÃO é divisor dele?`,
      r: certo,
      d: r.sample(sim, 4),
      x: expl('diferença de quadrados em cascata', `aⁿ − 1 com n par: 2${e === 16 ? '¹⁶' : e === 8 ? '⁸' : '¹²'} − 1 = (2${e === 16 ? '⁸' : e === 8 ? '⁴' : '⁶'} + 1)(2${e === 16 ? '⁸' : e === 8 ? '⁴' : '⁶'} − 1), e o processo continua.`, `${num(2 ** e - 1)} = ${e === 16 ? '3 · 5 · 17 · 257' : e === 8 ? '3 · 5 · 17' : '3² · 5 · 7 · 13'}; ${certo} não aparece.`),
    };
  },
  // 6. x + 1/x = k ⇒ x³ + 1/x³
  (r) => {
    const k = r.int(2, 5);
    return {
      e: `Se x + 1/x = ${k}, qual é o valor de x³ + 1/x³?`,
      r: k ** 3 - 3 * k,
      d: [k ** 3, k ** 3 + 3 * k, k * k - 2, 3 * k],
      x: expl('cubo da soma', '(x + 1/x)³ = x³ + 1/x³ + 3·x·(1/x)·(x + 1/x) = x³ + 1/x³ + 3(x + 1/x).', `${k}³ = x³ + 1/x³ + 3·${k} ⇒ x³ + 1/x³ = ${k ** 3} − ${3 * k} = ${k ** 3 - 3 * k}.`),
    };
  },
  // 7. proporção com binômios
  (r) => {
    const x = r.int(3, 12);
    // (x + a)/(x − 1) = (x + b)/(x − 2) com solução x: escolhe a e acha b
    const a = r.int(3, 6);
    // (x+a)(x−2) = (x+b)(x−1) ⇒ x² + (a−2)x − 2a = x² + (b−1)x − b ⇒ (a − 2 − b + 1)x = 2a − b ⇒ (a − b − 1)x = 2a − b
    // b = (x(a − 1) − 2a)/(x − 1)
    const bn = x * (a - 1) - 2 * a, bd = x - 1;
    if (bn % bd !== 0) return dificil[6](r);
    const b = bn / bd;
    if (b === a || b <= 1) return dificil[6](r);
    return {
      e: `Qual é a solução da equação (x + ${a})/(x − 1) = (x + ${b})/(x − 2)?`,
      r: x,
      d: [x + 1, x - 1, -x, 2 * x],
      x: expl('produto cruzado', 'Multiplique em cruz; os termos com x² aparecem dos dois lados e se cancelam, sobrando uma equação do 1º grau.', `(x + ${a})(x − 2) = (x + ${b})(x − 1) ⇒ x² + ${a - 2}x − ${2 * a} = x² + ${b - 1}x − ${b} ⇒ ${a - b - 1}x = ${2 * a - b} ⇒ x = ${x}.`),
    };
  },
  // 8. torneiras com ralo
  (r) => {
    const [a, b, c] = r.pick([[3, 6, 4], [4, 6, 12], [2, 3, 6], [6, 8, 12], [4, 12, 8]]);
    const taxa = 1 / a + 1 / b - 1 / c;
    const t = 1 / taxa;
    return {
      e: `A torneira A enche um tanque em ${a} h, a torneira B em ${b} h, e o ralo, aberto, esvazia o tanque cheio em ${c} h. Com o tanque vazio e tudo aberto, em quanto tempo ele fica cheio?`,
      r: t,
      d: [(a * b) / (a + b), 1 / (1 / a + 1 / b + 1 / c), a + b - c, (a + b + c) / 3],
      f: (v) => `${num(v)} h`,
      x: expl('soma de taxas (o ralo entra com sinal de menos)', `Por hora: 1/${a} + 1/${b} − 1/${c} = ${fr(b * c + a * c - a * b, a * b * c)} do tanque.`, `Tempo = 1 ÷ ${fr(b * c + a * c - a * b, a * b * c)} = ${num(t)} h.`),
    };
  },
  // 9. fração contínua
  (r) => {
    const k = r.int(2, 5);
    // 1 + 1/(1 + 1/(1 + 1/k))
    const v1 = 1 + 1 / k; // (k+1)/k
    const v2 = 1 + k / (k + 1); // (2k+1)/(k+1)
    const n = (k + 1) + (2 * k + 1), d = 2 * k + 1; // 1 + (k+1)/(2k+1)
    return {
      e: `Qual é o valor de 1 + 1/(1 + 1/(1 + 1/${k}))?`,
      r: fr(n, d),
      d: [fr(k + 1, k), fr(2 * k + 1, k + 1), fr(n, d + 1), fr(d, n)],
      x: expl('resolver de dentro para fora', 'Em frações "em andares", comece pelo andar mais baixo e vá subindo, uma fração de cada vez.', `1 + 1/${k} = ${fr(k + 1, k)}; 1 + ${k}/${k + 1} = ${fr(2 * k + 1, k + 1)}; 1 + ${k + 1}/${2 * k + 1} = ${fr(n, d)}.`),
    };
  },
  // 10. produto máximo com soma fixa
  (r) => {
    const s = 2 * r.int(6, 25);
    return {
      e: `Dois números reais têm soma ${s}. Qual é o maior valor possível do produto entre eles?`,
      r: (s / 2) ** 2,
      d: [s * s / 2, (s / 2) * (s / 2 - 1), s * 2, s * s],
      x: expl('identidade 4ab = (a + b)² − (a − b)²', `Com a + b = ${s} fixo, o produto ab = [${s}² − (a − b)²]/4 é máximo quando (a − b)² = 0, isto é, a = b = ${s / 2}.`, `${s / 2} × ${s / 2} = ${(s / 2) ** 2}.`),
    };
  },
  // 11. soma de dízimas
  (r) => {
    const a = r.int(10, 44), b = r.int(10, 44);
    const s = a + b;
    if (s >= 99) return dificil[10](r);
    const pa = String(a).padStart(2, '0'), pb = String(b).padStart(2, '0');
    return {
      e: `Qual é o resultado de 0,${pa}${pa}${pa}... + 0,${pb}${pb}${pb}..., na forma de fração irredutível?`,
      r: fr(s, 99),
      d: [fr(s, 100), fr(s, 198), fr(s + 1, 99), fr(a * b, 99)],
      x: expl('geratriz antes de somar', `Cada dízima de período com 2 algarismos é o período sobre 99: ${a}/99 e ${b}/99.`, `${a}/99 + ${b}/99 = ${s}/99 = ${fr(s, 99)}.`),
    };
  },
  // 12. a² − b² e a − b ⇒ a
  (r) => {
    const a = r.int(6, 20), b = r.int(1, a - 2);
    return {
      e: `Dois números a e b satisfazem a² − b² = ${a * a - b * b} e a − b = ${a - b}. Qual é o valor de a?`,
      r: a,
      d: [b, a + b, a * a - b * b - (a - b), (a + b) / 2 === Math.floor((a + b) / 2) ? (a + b) / 2 + 1 : a + 1],
      x: expl('diferença de quadrados', `a² − b² = (a + b)(a − b), então a + b = ${a * a - b * b} ÷ ${a - b} = ${a + b}.`, `Somando a + b = ${a + b} com a − b = ${a - b}: 2a = ${2 * a} ⇒ a = ${a}.`),
    };
  },
  // 13. 1001² − 999² e variações
  (r) => {
    const c = r.pick([1000, 500, 2000, 100]), k = r.int(1, 5);
    return {
      e: `Calcule ${num(c + k)}² − ${num(c - k)}².`,
      r: 4 * c * k,
      d: [2 * c * k, 4 * k * k, 2 * k, 4 * c * k + 2 * k * k],
      x: expl('diferença de quadrados', '(a + b)(a − b) com a = ' + num(c + k) + ' e b = ' + num(c - k) + '.', `(${num(2 * c)})(${2 * k}) = ${num(4 * c * k)}.`),
    };
  },
  // 14. herança em frações
  (r) => {
    const [n1, d1, n2, d2] = r.pick([[1, 3, 1, 4], [1, 4, 1, 3], [2, 5, 1, 2], [1, 2, 1, 3], [1, 3, 2, 5]]);
    const resto = (1 - n1 / d1) * (1 - n2 / d2);
    const tot = r.pick([60000, 90000, 120000, 180000, 240000]);
    const ult = tot * resto;
    if (!Number.isInteger(ult)) return dificil[13](r);
    return {
      e: `Uma herança foi dividida entre três irmãos: o mais velho ficou com ${n1}/${d1} do total, o do meio com ${n2}/${d2} do que restou, e o caçula com o restante, ${reais(ult)}. Qual era o valor da herança?`,
      r: tot,
      d: [ult / (1 - n1 / d1 - n2 / d2), ult * d1, ult / (1 - n1 / d1), ult * (d1 + d2)].map((v) => Math.round(v)),
      f: reais,
      x: expl('fração do que restou', `O caçula ficou com (1 − ${n1}/${d1}) × (1 − ${n2}/${d2}) = ${fr((d1 - n1) * (d2 - n2), d1 * d2)} da herança.`, `${fr((d1 - n1) * (d2 - n2), d1 * d2)} do total = ${reais(ult)} ⇒ total = ${reais(tot)}.`),
    };
  },
  // 15. identidade de polinômios
  (r) => {
    const b = r.int(2, 9) * r.pick([1, -1]);
    return {
      e: `Os números a e b são tais que x² ${b > 0 ? '+' : '−'} ${2 * Math.abs(b)}x + a = (x + b)² para todo x real. Qual é o valor de a + b?`,
      r: b * b + b,
      d: [b * b - b, 2 * b + b, b * b, b * b + 2 * b],
      x: expl('igualdade de polinômios', `(x + b)² = x² + 2bx + b². Comparando termo a termo: 2b = ${2 * b} ⇒ b = ${b}, e a = b² = ${b * b}.`, `a + b = ${b * b} + ${P(b)} = ${b * b + b}.`),
    };
  },
  // 16. simplificação com soma de frações algébricas
  (r) => {
    const x = r.int(3, 15);
    return {
      e: `Qual é o valor de 1/(x − 1) − 1/(x + 1) para x = ${x}?`,
      r: fr(2, x * x - 1),
      d: [fr(2, x * x + 1), fr(1, x * x - 1), fr(2 * x, x * x - 1), '0'],
      x: expl('denominador comum com diferença de quadrados', 'O denominador comum é (x − 1)(x + 1) = x² − 1.', `[(x + 1) − (x − 1)]/(x² − 1) = 2/(x² − 1) = 2/${x * x - 1} = ${fr(2, x * x - 1)}.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '18-fracoes-fatoracao-e-produtos-notaveis',
    titulo: 'Frações, fatoração e produtos notáveis',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Operações com frações, dízimas, produtos notáveis, fatoração e simplificação de expressões algébricas.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
