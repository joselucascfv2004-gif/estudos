// Matemática — Números complexos e polinômios.
import { expl, fracao, num } from './util.mjs';

const cx = (a, b) => {
  if (b === 0) return num(a);
  const im = Math.abs(b) === 1 ? 'i' : `${num(Math.abs(b))}i`;
  if (a === 0) return (b < 0 ? '−' : '') + im;
  return `${num(a)} ${b < 0 ? '−' : '+'} ${im}`;
};
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sp = (n) => String(n).split('').map((c) => SUPS[+c]).join('');
const poli = (coefs) => {
  const g = coefs.length - 1;
  const partes = [];
  coefs.forEach((c, i) => {
    if (c === 0) return;
    const e = g - i;
    const abs = Math.abs(c);
    const coef = abs === 1 && e > 0 ? '' : num(abs);
    const varp = e === 0 ? '' : e === 1 ? 'x' : `x${['', '', '²', '³', '⁴'][e]}`;
    partes.push({ s: c < 0 ? '−' : '+', t: coef + varp });
  });
  return partes.map((p, i) => (i === 0 ? (p.s === '−' ? '−' : '') + p.t : ` ${p.s} ${p.t}`)).join('') || '0';
};
const P = (v) => (v < 0 ? `(${v})` : `${v}`);

const facil = [
  // 1. potência de i
  (r) => {
    const n = r.int(5, 200);
    const val = ['1', 'i', '−1', '−i'][n % 4];
    return {
      e: `Qual é o valor de i${sp(n)}?`,
      r: val,
      d: ['1', 'i', '−1', '−i', '0'].filter((v) => v !== val),
      x: expl('ciclo de 4', 'As potências de i se repetem: i⁰ = 1, i¹ = i, i² = −1, i³ = −i. Só importa o resto da divisão do expoente por 4.', `${n} = 4 × ${Math.floor(n / 4)} + ${n % 4} ⇒ i${sp(n)} = i${sp(n % 4)} = ${val}.`),
    };
  },
  // 2. produto
  (r) => {
    const a = r.int(-5, 6), b = r.int(-5, 6) || 1, c = r.int(-5, 6), d = r.int(-5, 6) || 2;
    return {
      e: `Qual é o resultado de (${cx(a, b)}) · (${cx(c, d)})?`,
      r: cx(a * c - b * d, a * d + b * c),
      d: [cx(a * c + b * d, a * d + b * c), cx(a * c, b * d), cx(a * c - b * d, a * d - b * c), cx(a + c, b + d)],
      x: expl('distributiva + i² = −1', 'Multiplique como binômios; o termo com i² vira número real negativo.', `(${a * c} − ${P(b * d)}) + (${a * d} + ${P(b * c)})i = ${cx(a * c - b * d, a * d + b * c)}.`),
    };
  },
  // 3. módulo
  (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]);
    const sa = r.pick([1, -1]), sb = r.pick([1, -1]);
    return {
      e: `Qual é o módulo do número complexo z = ${cx(sa * a, sb * b)}?`,
      r: c,
      d: [a + b, c * c, c + 1, Math.abs(a - b) || c + 2],
      x: expl('Pitágoras no plano complexo', 'O módulo é a distância do ponto (a, b) até a origem.', `√(${a * a} + ${b * b}) = ${c}.`),
    };
  },
  // 4. valor numérico
  (r) => {
    const coefs = [r.int(1, 3), r.int(-4, 4), r.int(-5, 5), r.int(-6, 6)], k = r.int(-3, 3) || 2;
    const val = coefs.reduce((s, c) => s * k + c, 0);
    return {
      e: `Qual é o valor numérico do polinômio P(x) = ${poli(coefs)} para x = ${k}?`,
      r: val,
      d: [val + 2, -val === val ? val + 4 : -val, val - 1, val + 5],
      x: expl('substituição', 'Troque x pelo número, com parênteses, e respeite a ordem das operações.', `P(${k}) = ${val}.`),
    };
  },
  // 5. soma de complexos
  (r) => {
    const a = r.int(-6, 6), b = r.int(-6, 6) || 3, c = r.int(-6, 6), d = r.int(-6, 6) || -2;
    const op = r.pick(['+', '−']);
    const s = op === '+' ? 1 : -1;
    return {
      e: `Qual é o resultado de (${cx(a, b)}) ${op} (${cx(c, d)})?`,
      r: cx(a + s * c, b + s * d),
      d: [cx(a - s * c, b - s * d), cx(a + s * d, b + s * c), cx(a * c, b * d), cx(a + s * c, -(b + s * d))].filter((v) => v !== cx(a + s * c, b + s * d)).concat([cx(a + s * c + 1, b + s * d)]),
      x: expl('real com real, imaginário com imaginário', 'Some (ou subtraia) separadamente as partes reais e as partes imaginárias.', `(${a} ${op} ${P(c)}) + (${b} ${op} ${P(d)})i = ${cx(a + s * c, b + s * d)}.`),
    };
  },
  // 6. conjugado
  (r) => {
    const a = r.int(-7, 7) || 2, b = r.int(-7, 7) || 3;
    return {
      e: `Qual é o conjugado do número complexo z = ${cx(a, b)}?`,
      r: cx(a, -b),
      d: [cx(-a, b), cx(-a, -b), cx(b, a), cx(a, b)],
      x: expl('conjugado', 'O conjugado mantém a parte real e troca o sinal da parte imaginária (espelho no eixo real).', `z̄ = ${cx(a, -b)}.`),
    };
  },
  // 7. grau do produto
  (r) => {
    const m = r.int(2, 6), n = r.int(1, 5);
    return {
      e: `P(x) é um polinômio de grau ${m} e Q(x) é um polinômio de grau ${n}. Qual é o grau do produto P(x)·Q(x)?`,
      r: m + n,
      d: [m * n, Math.max(m, n), Math.abs(m - n) || m + n + 1, m + n + 1],
      x: expl('grau do produto', 'Ao multiplicar, os termos de maior grau se multiplicam e os expoentes se somam.', `${m} + ${n} = ${m + n}.`),
    };
  },
  // 8. imaginário puro
  (r) => {
    const k = r.int(-6, 8), b = r.int(1, 9);
    return {
      e: `Para que valor de m o número z = (m ${k >= 0 ? '−' : '+'} ${Math.abs(k)}) + ${b}i é imaginário puro?`,
      r: k,
      d: [-k === k ? k + 3 : -k, b, k + b, 0 === k ? 1 : 0],
      x: expl('imaginário puro', 'Imaginário puro tem parte real igual a zero (e parte imaginária diferente de zero).', `m ${k >= 0 ? '−' : '+'} ${Math.abs(k)} = 0 ⇒ m = ${k}.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[2].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. divisão
  (r) => {
    const p = r.int(-4, 4), q = r.int(-4, 4) || 1, c = r.int(1, 3), d = r.int(-3, 3) || 1;
    const a = p * c - q * d, b = p * d + q * c;
    return {
      e: `Qual é o resultado da divisão (${cx(a, b)}) ÷ (${cx(c, d)})?`,
      r: cx(p, q),
      d: [cx(q, p), cx(p, -q), cx(-p, q), cx(p + 1, q - 1)].filter((v) => v !== cx(p, q)).concat([cx(p, q + 2)]),
      x: expl('multiplicar pelo conjugado', 'Multiplique em cima e embaixo pelo conjugado do denominador: embaixo fica um número real (c² + d²).', `Denominador: ${c * c + d * d}; resultado: ${cx(p, q)}.`),
    };
  },
  // 2. teorema do resto
  (r) => {
    const coefs = [r.int(1, 3), r.int(-4, 4), r.int(-5, 5), r.int(-6, 6)], a = r.int(-3, 3) || 2;
    const val = coefs.reduce((s, c) => s * a + c, 0);
    const outro = coefs.reduce((s, c) => s * -a + c, 0);
    return {
      e: `Qual é o resto da divisão de P(x) = ${poli(coefs)} por (x ${a >= 0 ? '−' : '+'} ${Math.abs(a)})?`,
      r: val,
      d: [outro === val ? val + 3 : outro, coefs[3] === val ? val - 2 : coefs[3], val + 1, val === 0 ? 5 : 0],
      x: expl('teorema do resto', 'O resto da divisão por (x − a) é P(a): não precisa fazer a divisão.', `P(${a}) = ${val}.`),
    };
  },
  // 3. Girard
  (r) => {
    const a = r.pick([1, 2, 3]), r1 = r.int(-3, 3), r2 = r.int(-3, 4), r3 = r.int(-2, 5);
    const b = -a * (r1 + r2 + r3), c = a * (r1 * r2 + r1 * r3 + r2 * r3), d = -a * r1 * r2 * r3;
    const pede = r.pick(['soma', 'produto']);
    const val = pede === 'soma' ? fracao(-b, a) : fracao(-d, a);
    const cand = [fracao(b, a), fracao(c, a), fracao(-d, a), fracao(d, a), fracao(-b, a), fracao(-b + a, a), fracao(-d - a, a)];
    return {
      e: `Qual é o ${pede} das raízes da equação ${poli([a, b, c, d])} = 0?`,
      r: val,
      d: [...new Set(cand)].filter((v) => v !== val),
      x: expl('relações de Girard', 'Para ax³ + bx² + cx + d = 0: soma = −b/a; produto = −d/a.', pede === 'soma' ? `−(${b})/${a} = ${val}.` : `−(${d})/${a} = ${val}.`),
    };
  },
  // 4. z · z̄
  (r) => {
    const a = r.int(-6, 6) || 1, b = r.int(-6, 6) || 2;
    return {
      e: `Sendo z = ${cx(a, b)} e z̄ o seu conjugado, qual é o valor de z · z̄?`,
      r: a * a + b * b,
      d: [a * a - b * b, cx(a * a, b * b), 2 * a, cx(a * a - b * b, 2 * a * b)],
      x: expl('produto pelo conjugado', '(a + bi)(a − bi) = a² − (bi)² = a² + b²: sempre real e igual a |z|².', `${a * a} + ${b * b} = ${a * a + b * b}.`),
    };
  },
  // 5. raízes complexas do 2º grau
  (r) => {
    const p = r.int(-3, 3), q = r.int(1, 4);
    const B = -2 * p, C = p * p + q * q;
    return {
      e: `Quais são as raízes da equação ${poli([1, B, C])} = 0 no conjunto dos números complexos?`,
      r: `${cx(p, q)} e ${cx(p, -q)}`,
      d: [`${cx(-p, q)} e ${cx(-p, -q)}`, `${cx(q, p)} e ${cx(q, -p)}`, `${p + q} e ${p - q}`, `${cx(p, 2 * q)} e ${cx(p, -2 * q)}`, 'não há raízes'],
      x: expl('Bhaskara com Δ negativo', '√(−k) = i√k. As raízes de equações com coeficientes reais vêm em pares conjugados.', `Δ = ${B * B - 4 * C} ⇒ √Δ = ${2 * q}i; x = (${-B} ± ${2 * q}i)/2 = ${cx(p, q)} ou ${cx(p, -q)}.`),
    };
  },
  // 6. quociente
  (r) => {
    const a = r.int(-5, 6) || 1, b = r.int(-5, 6) || 2;
    return {
      e: `Qual é o quociente da divisão de ${poli([1, a + b, a * b])} por (x${a >= 0 ? ' + ' + a : ' − ' + -a})?`,
      r: poli([1, b]),
      d: [poli([1, -b]), poli([1, a]), poli([1, a + b]), poli([1, a * b])].filter((v) => v !== poli([1, b])),
      x: expl('fatoração (ou Briot-Ruffini)', 'Um trinômio com raízes −a e −b se fatora como (x + a)(x + b).', `${poli([1, a + b, a * b])} = (x${a >= 0 ? ' + ' + a : ' − ' + -a})(${poli([1, b])}).`),
    };
  },
  // 7. igualdade de polinômios
  (r) => {
    const A = r.int(1, 5), B = r.int(-4, 6), C = r.int(-5, 5), p = r.int(1, 4), q = r.int(1, 4), s = r.int(1, 4);
    return {
      e: `Se (a − ${p})x² + (b + ${q})x + (c − ${s}) = ${poli([A, B, C])} para todo x, qual é o valor de a + b + c?`,
      r: A + p + B - q + C + s,
      d: [A + B + C, A + p + B + q + C + s, A - p + B - q + C - s, A + B + C + p],
      x: expl('polinômios idênticos', 'Dois polinômios são iguais quando os coeficientes de mesmo grau são iguais.', `a = ${A + p}, b = ${B - q}, c = ${C + s}; soma = ${A + p + B - q + C + s}.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[2].vezes = 2;
medio[4].vezes = 2;

const dificil = [
  // 1. soma das outras raízes
  (r) => {
    const r1 = r.int(-3, 3), r2 = r.int(-4, 4), r3 = r.int(-4, 4);
    const b = -(r1 + r2 + r3), c = r1 * r2 + r1 * r3 + r2 * r3, d = -r1 * r2 * r3;
    return {
      e: `Sabendo que ${r1} é raiz do polinômio P(x) = ${poli([1, b, c, d])}, qual é a soma das outras duas raízes?`,
      r: r2 + r3,
      d: [r2 * r3 === r2 + r3 ? r2 + r3 + 3 : r2 * r3, -(r2 + r3) === r2 + r3 ? r2 + r3 + 2 : -(r2 + r3), -b === r2 + r3 ? r2 + r3 - 1 : -b, r2 + r3 + 1],
      x: expl('Girard + raiz conhecida', 'A soma das três raízes é −b/a; tire a raiz que você já conhece.', `Soma total ${-b}; ${-b} − (${r1}) = ${r2 + r3}.`),
    };
  },
  // 2. argumento
  (r) => {
    const [z, mod, arg] = r.pick([
      ['1 + i√3', '2', '60°'],
      ['√3 + i', '2', '30°'],
      ['1 + i', '√2', '45°'],
      ['−1 + i', '√2', '135°'],
      ['−√3 + i', '2', '150°'],
      ['−1 − i√3', '2', '240°'],
      ['1 − i', '√2', '315°'],
    ]);
    const args = ['30°', '45°', '60°', '90°', '120°', '135°', '150°', '180°', '210°', '240°', '300°', '315°'];
    return {
      e: `Na forma trigonométrica, z = ${z} tem módulo ${mod} e argumento principal igual a:`,
      r: arg,
      d: r.shuffle(args.filter((a) => a !== arg)),
      x: expl('cos θ = a/|z| e sen θ = b/|z|', 'Os sinais de a e b dizem o quadrante; os valores notáveis dizem o ângulo.', `θ = ${arg}.`),
    };
  },
  // 3. (1 + i)^n
  (r) => {
    const n = r.pick([2, 4, 6, 8, 10, 12]);
    const k = n / 2;
    const mag = 2 ** k;
    const unid = ['1', 'i', '−1', '−i'][k % 4];
    const val = unid === '1' ? num(mag) : unid === '−1' ? `−${num(mag)}` : unid === 'i' ? `${num(mag)}i` : `−${num(mag)}i`;
    return {
      e: `Qual é o valor de (1 + i)${sp(n)}?`,
      r: val,
      d: [`${num(mag)}`, `${num(mag)}i`, `−${num(mag)}`, `−${num(mag)}i`, `${num(2 ** n)}`].filter((v) => v !== val),
      x: expl('quebrar a potência', '(1 + i)² = 1 + 2i + i² = 2i. Use isso para reduzir o expoente pela metade.', `(1 + i)${sp(n)} = (2i)${sp(k)} = ${val}.`),
    };
  },
  // 4. m para divisibilidade
  (r) => {
    const a = r.int(-3, 3) || 2, p = r.int(1, 3), q = r.int(-4, 4);
    const m = -(a ** 3 + p * a * a + q * a);
    return {
      e: `Para que valor de m o polinômio P(x) = ${poli([1, p, q, 0])} + m é divisível por (x ${a >= 0 ? '−' : '+'} ${Math.abs(a)})?`,
      r: m,
      d: [-m === m ? m + 4 : -m, m + a, m + 2, m - 2],
      x: expl('divisível ⇔ resto zero', `Pelo teorema do resto, basta P(${a}) = 0.`, `${a ** 3} + ${p * a * a} + ${P(q * a)} + m = 0 ⇒ m = ${m}.`),
    };
  },
  // 5. raiz conjugada
  (r) => {
    const p = r.int(1, 4), q = r.int(1, 3), k = r.int(-3, 3);
    // (x² − 2px + p² + q²)(x − k)
    return {
      e: `Um polinômio de grau 3 com coeficientes reais tem raízes ${cx(p, q)} e ${k}. Qual é o produto das três raízes?`,
      r: (p * p + q * q) * k,
      d: [(p * p - q * q) * k, p * k, (p * p + q * q) * k + 1, -(p * p + q * q) * k === (p * p + q * q) * k ? 7 : -(p * p + q * q) * k],
      x: expl('raízes complexas vêm aos pares', `Com coeficientes reais, o conjugado ${cx(p, -q)} também é raiz.`, `(${cx(p, q)})(${cx(p, -q)}) = ${p * p + q * q}; × ${P(k)} = ${(p * p + q * q) * k}.`),
    };
  },
  // 6. coeficiente líder por P(0)
  (r) => {
    const rs = r.sample([1, 2, 3, -1, -2, 4], 3), a = r.int(1, 4) * r.pick([1, -1]);
    const p0 = a * -rs[0] * -rs[1] * -rs[2];
    return {
      e: `Um polinômio P(x) de grau 3 tem raízes ${rs.join(', ')} e satisfaz P(0) = ${p0}. Qual é o coeficiente do termo de maior grau?`,
      r: a,
      d: [-a, p0, a * 2, rs[0] * rs[1] * rs[2] === a ? a + 1 : rs[0] * rs[1] * rs[2]],
      x: expl('forma fatorada', 'Com as raízes, P(x) = a(x − r₁)(x − r₂)(x − r₃). Substitua x = 0.', `P(0) = a · (${-rs[0]})(${-rs[1]})(${-rs[2]}) = ${-rs[0] * -rs[1] * -rs[2]}a = ${p0} ⇒ a = ${a}.`),
    };
  },
  // 7. Moivre
  (r) => {
    const [mod, ang, n] = r.pick([[2, 30, 3], [2, 45, 2], [2, 60, 3], [1, 90, 5], [2, 30, 6], [3, 60, 3]]);
    const M = mod ** n, A = (ang * n) % 360;
    const forma = { 0: num(M), 90: `${num(M)}i`, 180: `−${num(M)}`, 270: `−${num(M)}i` }[A];
    return {
      e: `Sendo z = ${mod}(cos ${ang}° + i·sen ${ang}°), qual é o valor de z${sp(n)}?`,
      r: forma,
      d: [num(M), `${num(M)}i`, `−${num(M)}`, `−${num(M)}i`, `${num(mod * n)}i`].filter((v) => v !== forma),
      x: expl('fórmula de De Moivre', 'Na forma trigonométrica, elevar à n-ésima potência eleva o módulo e multiplica o ângulo por n.', `Módulo ${mod}${sp(n)} = ${M}; ângulo ${n} × ${ang}° = ${ang * n}° ⇒ z${sp(n)} = ${forma}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[2].vezes = 2;
dificil[3].vezes = 2;
dificil[5].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '17-numeros-complexos-e-polinomios',
    titulo: 'Números complexos e polinômios',
    provas: ['Militares'],
    descricao: 'Operações com complexos, módulo, potências de i, forma trigonométrica, teorema do resto e relações de Girard.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
