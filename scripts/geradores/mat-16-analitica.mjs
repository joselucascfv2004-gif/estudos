// Matemática — Geometria analítica.
import { expl, fracao, num } from './util.mjs';
import NOVOS from './mat-novos-extras.mjs';
import { novos } from './util.mjs';

const pt = (x, y) => `(${num(x)}, ${num(y)})`;
const reta = (a, b) => {
  const parteA = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '−x' : `${num(a)}x`;
  const parteB = b === 0 ? '' : `${parteA ? (b > 0 ? ' + ' : ' − ') : b < 0 ? '−' : ''}${num(Math.abs(b))}`;
  return `y = ${parteA}${parteB}` || 'y = 0';
};
const t = (v, s) => (v === 0 ? '' : ` ${v > 0 ? '+' : '−'} ${Math.abs(v)}${s}`);
const circ = (a, b, R2) => `${a === 0 ? 'x²' : `(x${t(-a, '')})²`} + ${b === 0 ? 'y²' : `(y${t(-b, '')})²`} = ${R2}`;
const TRIPLAS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]];

const facil = [
  // 1. distância
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    const x1 = r.int(-5, 5), y1 = r.int(-5, 5);
    const sx = r.pick([1, -1]), sy = r.pick([1, -1]);
    return {
      e: `Qual é a distância entre os pontos A${pt(x1, y1)} e B${pt(x1 + sx * a, y1 + sy * b)}?`,
      r: c,
      d: [a + b, c + 1, c * c, c - 1],
      x: expl('Pitágoras no plano', 'As diferenças em x e em y são os catetos; a distância é a hipotenusa.', `Δx = ${a}, Δy = ${b}: √(${a * a} + ${b * b}) = ${c}.`),
    };
  },
  // 2. ponto médio
  (r) => {
    const x1 = r.int(-8, 8), y1 = r.int(-8, 8), x2 = r.int(-8, 8), y2 = r.int(-8, 8);
    return {
      e: `Qual é o ponto médio do segmento de extremos A${pt(x1, y1)} e B${pt(x2, y2)}?`,
      r: pt((x1 + x2) / 2, (y1 + y2) / 2),
      d: [pt(x1 + x2, y1 + y2), pt((x2 - x1) / 2, (y2 - y1) / 2), pt((x1 + y1) / 2, (x2 + y2) / 2), pt((y1 + y2) / 2, (x1 + x2) / 2)],
      x: expl('média das coordenadas', 'O ponto médio fica "no meio" em x e "no meio" em y.', `((${x1} + ${x2})/2, (${y1} + ${y2})/2) = ${pt((x1 + x2) / 2, (y1 + y2) / 2)}.`),
    };
  },
  // 3. coeficiente angular
  (r) => {
    const x1 = r.int(-5, 3), dx = r.int(1, 5), y1 = r.int(-5, 5), a = r.int(-4, 4) || 2;
    return {
      e: `Qual é o coeficiente angular da reta que passa por ${pt(x1, y1)} e ${pt(x1 + dx, y1 + a * dx)}?`,
      r: a,
      d: [-a, fracao(1, a), a * dx, fracao(-1, a)],
      x: expl('inclinação', 'm = quanto y sobe (ou desce) para cada 1 de avanço em x: Δy/Δx.', `${a * dx}/${dx} = ${a}.`),
    };
  },
  // 4. ponto na reta
  (r) => {
    const a = r.int(-4, 5) || 2, b = r.int(-6, 6), x = r.int(-4, 6);
    return {
      e: `O ponto P(${x}, k) pertence à reta ${reta(a, b)}. Qual é o valor de k?`,
      r: a * x + b,
      d: [a * x - b, a + x + b, a * (x + b), a * x + b + 1],
      x: expl('pertencer = satisfazer a equação', 'Se o ponto está na reta, suas coordenadas tornam a equação verdadeira.', `k = ${a}·${x}${t(b, '')} = ${a * x + b}.`),
    };
  },
  // 5. quadrante
  (r) => {
    const x = r.int(1, 9) * r.pick([1, -1]), y = r.int(1, 9) * r.pick([1, -1]);
    const q = x > 0 ? (y > 0 ? 1 : 4) : y > 0 ? 2 : 3;
    return {
      e: `Em que quadrante do plano cartesiano está o ponto ${pt(x, y)}?`,
      r: `${q}º quadrante`,
      d: ['1º quadrante', '2º quadrante', '3º quadrante', '4º quadrante', 'sobre o eixo x'].filter((v) => v !== `${q}º quadrante`),
      x: expl('sinais das coordenadas', '1º: (+, +); 2º: (−, +); 3º: (−, −); 4º: (+, −). Os quadrantes giram no sentido anti-horário.', `x ${x > 0 ? '>' : '<'} 0 e y ${y > 0 ? '>' : '<'} 0 ⇒ ${q}º quadrante.`),
    };
  },
  // 6. perímetro do retângulo
  (r) => {
    const x1 = r.int(-6, 2), y1 = r.int(-6, 2), w = r.int(2, 8), h = r.int(2, 8);
    return {
      e: `Um retângulo tem lados paralelos aos eixos e vértices opostos nos pontos ${pt(x1, y1)} e ${pt(x1 + w, y1 + h)}. Qual é o seu perímetro?`,
      r: 2 * (w + h),
      d: [w * h, w + h, 2 * (w + h) + 2, Math.round(Math.sqrt(w * w + h * h)) * 2],
      x: expl('lados pelas diferenças', 'Com lados paralelos aos eixos, a largura é a diferença em x e a altura é a diferença em y.', `Largura ${w}, altura ${h}: 2 × (${w} + ${h}) = ${2 * (w + h)}.`),
    };
  },
  // 7. corte no eixo y
  (r) => {
    const a = r.int(1, 6), b = r.pick([2, 3, 4, 6]), y0 = r.int(1, 6);
    const c = b * y0;
    return {
      e: `Em que ponto a reta ${a}x + ${b}y = ${c} corta o eixo y?`,
      r: pt(0, y0),
      d: [pt(y0, 0), pt(0, c / a % 1 === 0 ? c / a : y0 + 1), pt(c / a % 1 === 0 ? c / a : y0 + 2, 0), pt(0, c)],
      x: expl('eixo y ⇒ x = 0', 'Todo ponto do eixo y tem x = 0. Substitua e ache y.', `${b}y = ${c} ⇒ y = ${y0}.`),
    };
  },
  // 8. equação da circunferência
  (r) => {
    const a = r.int(-5, 5), b = r.int(-5, 5), R = r.int(1, 7);
    return {
      e: `Qual é a equação da circunferência de centro ${pt(a, b)} e raio ${R}?`,
      r: circ(a, b, R * R),
      d: [circ(-a, -b, R * R), circ(a, b, R), circ(b, a, R * R), circ(-a, b, 2 * R)],
      x: expl('equação reduzida', '(x − xc)² + (y − yc)² = R². Atenção aos sinais: o centro entra com sinal trocado.', `${circ(a, b, R * R)}.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[2].vezes = 2;
facil[7].vezes = 2;

const medio = [
  // 1. reta por dois pontos
  (r) => {
    const a = r.int(-4, 4) || 1, b = r.int(-6, 6), x1 = r.int(-3, 2), x2 = x1 + r.int(1, 4);
    return {
      e: `Qual é a equação da reta que passa pelos pontos ${pt(x1, a * x1 + b)} e ${pt(x2, a * x2 + b)}?`,
      r: reta(a, b),
      d: [reta(-a, b), reta(a, -b || 3), reta(b === 0 || b === a ? a + 1 : b, a), reta(a, b + 1)],
      x: expl('coeficiente angular + um ponto', 'Ache m pela inclinação e depois use y − y₁ = m(x − x₁).', `m = ${a}; y − ${a * x1 + b} = ${a}(x − ${x1}) ⇒ ${reta(a, b)}.`),
    };
  },
  // 2. interseção
  (r) => {
    const x = r.int(-4, 5), y = r.int(-4, 5), a1 = r.int(-3, 3) || 1;
    let a2 = r.int(-3, 3) || -2;
    if (a2 === a1) a2 = a1 + 1;
    const b1 = y - a1 * x, b2 = y - a2 * x;
    return {
      e: `Qual é o ponto de interseção das retas ${reta(a1, b1)} e ${reta(a2, b2)}?`,
      r: pt(x, y),
      d: [pt(y, x), pt(-x, y), pt(x, -y), pt(x + 1, y + a1)].filter((p) => p !== pt(x, y)).concat([pt(0, b1)]),
      x: expl('igualar os y', 'No cruzamento, as duas retas têm o mesmo (x, y).', `${a1}x${t(b1, '')} = ${a2}x${t(b2, '')} ⇒ x = ${x}; y = ${y}.`),
    };
  },
  // 3. raio pela equação geral
  (r) => {
    const a = r.int(-6, 6), b = r.int(-6, 6), R = r.int(1, 9);
    const D = -2 * a, E = -2 * b, F = a * a + b * b - R * R;
    return {
      e: `Qual é o raio da circunferência de equação x² + y²${t(D, 'x')}${t(E, 'y')}${t(F, '')} = 0?`,
      r: R,
      d: [R * R, R + 1, Math.abs(F) === R ? R + 2 : Math.abs(F), Math.abs(a) + Math.abs(b) === R ? R + 3 : Math.abs(a) + Math.abs(b)],
      x: expl('completar quadrados', 'Agrupe x com x e y com y e transforme em quadrados perfeitos.', `${circ(a, b, R * R)} ⇒ raio ${R}.`),
    };
  },
  // 4. área do triângulo
  (r) => {
    const A = [r.int(-4, 0), r.int(-4, 0)], B = [r.int(1, 6), r.int(-3, 1)], C = [r.int(-2, 4), r.int(2, 7)];
    const D = A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]);
    const area = Math.abs(D) / 2;
    if (area === 0) return medio[3](r);
    return {
      e: `Qual é a área do triângulo de vértices A${pt(...A)}, B${pt(...B)} e C${pt(...C)}?`,
      r: area,
      d: [area * 2, area / 2, area + 3, area + 1],
      f: (v) => `${num(v)} u.a.`,
      x: expl('determinante das coordenadas', 'Área = |D|/2, com D = det[xA yA 1; xB yB 1; xC yC 1].', `D = ${D}; área = ${num(area)}.`),
    };
  },
  // 5. paralela / perpendicular
  (r) => {
    const a = r.pick([2, 3, 4, -2, -3]), b = r.int(-5, 5), tipo = r.pick(['paralela', 'perpendicular']);
    const m = tipo === 'paralela' ? fracao(a, 1) : fracao(-1, a);
    return {
      e: `Qual é o coeficiente angular de uma reta ${tipo} à reta ${reta(a, b)}?`,
      r: m,
      d: tipo === 'paralela' ? [fracao(-1, a), fracao(-a, 1), fracao(1, a), fracao(b === a || b === 0 ? 7 : b, 1)] : [fracao(a, 1), fracao(1, a), fracao(-a, 1), fracao(b === 0 ? 7 : b, 1)],
      x: expl('relação entre inclinações', 'Paralelas: mesmo m. Perpendiculares: m₁ · m₂ = −1 (inverte e troca o sinal).', `m = ${m}.`),
    };
  },
  // 6. baricentro
  (r) => {
    const xs = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)], ys = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)];
    const sx = xs[0] + xs[1] + xs[2], sy = ys[0] + ys[1] + ys[2];
    if (sx % 3 || sy % 3) return medio[5](r);
    return {
      e: `Qual é o baricentro (encontro das medianas) do triângulo de vértices ${pt(xs[0], ys[0])}, ${pt(xs[1], ys[1])} e ${pt(xs[2], ys[2])}?`,
      r: pt(sx / 3, sy / 3),
      d: [pt(sx, sy), pt(sx / 2, sy / 2), pt(sy / 3, sx / 3), pt(sx / 3 + 1, sy / 3)],
      x: expl('média dos vértices', 'O baricentro é a média das três coordenadas x e das três coordenadas y.', `(${sx}/3, ${sy}/3) = ${pt(sx / 3, sy / 3)}.`),
    };
  },
  // 7. pontos alinhados
  (r) => {
    const m = r.int(1, 4), b = r.int(-3, 3), x1 = r.int(-2, 1), x2 = x1 + r.int(1, 3), x3 = x2 + r.int(1, 4);
    return {
      e: `Para que valor de k os pontos ${pt(x1, m * x1 + b)}, ${pt(x2, m * x2 + b)} e (k, ${m * x3 + b}) estão alinhados?`,
      r: x3,
      d: [x3 + 1, x3 - 1, m * x3 + b === x3 ? x3 + 2 : m * x3 + b, x2 + x1],
      x: expl('mesma inclinação', 'Três pontos estão alinhados se a inclinação entre o 1º e o 2º é igual à entre o 2º e o 3º.', `Inclinação ${m} ⇒ (${m * x3 + b} − ${m * x2 + b})/(k − ${x2}) = ${m} ⇒ k = ${x3}.`),
    };
  },
  // 8. ângulo de inclinação
  (r) => {
    const [mtxt, ang] = r.pick([['1', 45], ['√3', 60], ['√3/3', 30], ['−1', 135], ['−√3', 120]]);
    return {
      e: `Uma reta tem coeficiente angular ${mtxt}. Qual é o ângulo que ela forma com o eixo x (medido no sentido anti-horário)?`,
      r: `${ang}°`,
      d: ['30°', '45°', '60°', '120°', '135°', '150°'].filter((v) => v !== `${ang}°`),
      x: expl('m = tg θ', 'O coeficiente angular é a tangente do ângulo de inclinação.', `tg θ = ${mtxt} ⇒ θ = ${ang}°.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[3].vezes = 2;
medio[4].vezes = 2;

const dificil = [
  // 1. distância ponto-reta
  (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]]);
    const x0 = r.int(-4, 5), y0 = r.int(-4, 5), k = r.int(1, 4) * r.pick([1, -1]);
    const C = k * c - a * x0 - b * y0;
    const dist = Math.abs(a * x0 + b * y0 + C) / c;
    return {
      e: `Qual é a distância do ponto P${pt(x0, y0)} à reta ${a}x + ${b}y${t(C, '')} = 0?`,
      r: dist,
      d: [Math.abs(a * x0 + b * y0 + C), dist + 1, Math.abs(C) / c === dist ? dist + 2 : Math.abs(C) / c, dist * 2],
      x: expl('fórmula da distância ponto-reta', 'd = |a·x₀ + b·y₀ + c| / √(a² + b²).', `|${a * x0 + b * y0 + C}| / ${c} = ${num(dist)}.`),
    };
  },
  // 2. posição ponto × circunferência
  (r) => {
    const a = r.int(-5, 5), b = r.int(-5, 5), R = r.int(3, 8);
    const tipo = r.pick(['interior', 'exterior', 'sobre']);
    let p;
    if (tipo === 'sobre') p = r.pick([[a + R, b], [a, b - R], [a - R, b]]);
    else if (tipo === 'interior') p = [a + r.int(1, R - 1), b + r.pick([0, 1])];
    else p = [a + R + r.int(1, 3), b + r.int(0, 3)];
    const d2 = (p[0] - a) ** 2 + (p[1] - b) ** 2;
    const pos = d2 < R * R ? 'interior à circunferência' : d2 === R * R ? 'pertence à circunferência' : 'exterior à circunferência';
    const opcoes = ['interior à circunferência', 'pertence à circunferência', 'exterior à circunferência', 'é o centro da circunferência', 'não é possível determinar sem o gráfico'];
    return {
      e: `Em relação à circunferência ${circ(a, b, R * R)}, o ponto P${pt(...p)} é:`,
      r: pos,
      d: opcoes.filter((o) => o !== pos),
      x: expl('comparar com o raio', 'Calcule a distância (ao quadrado) do ponto ao centro e compare com R².', `Distância² = ${d2}; R² = ${R * R}: ${d2 < R * R ? 'menor ⇒ interior' : d2 === R * R ? 'igual ⇒ pertence' : 'maior ⇒ exterior'}.`),
    };
  },
  // 3. perpendicular por um ponto
  (r) => {
    const a = r.pick([2, -2, 1, -1]), b = r.int(-5, 5), x0 = r.int(-4, 4) * 2, y0 = r.int(-4, 5);
    const m = -1 / a;
    const bb = y0 - m * x0;
    const f = (mm, b2) => {
      const ms = fracao(Math.round(mm * 2), 2);
      let xs;
      if (ms.includes('/')) {
        const [n, d] = ms.split('/');
        const neg = n.startsWith('−');
        const an = neg ? n.slice(1) : n;
        xs = `${neg ? '−' : ''}${an === '1' ? '' : an}x/${d}`;
      } else xs = `${ms === '1' ? '' : ms === '−1' ? '−' : ms}x`;
      return `y = ${xs}${t(b2, '')}`;
    };
    return {
      e: `Qual é a equação da reta perpendicular à reta ${reta(a, b)} que passa pelo ponto ${pt(x0, y0)}?`,
      r: f(m, bb),
      d: [f(a, y0 - a * x0), f(-m, y0 + m * x0), f(m, -bb || 1), f(1 / a, y0 - x0 / a), f(m, bb + 1), f(m, bb - 2), f(-a, bb)].filter((v) => v !== f(m, bb)),
      x: expl('inclinação perpendicular + ponto', `m = −1/${a} = ${fracao(-1, a)}; use y − y₀ = m(x − x₀).`, `y − ${y0} = ${fracao(-1, a)}(x − ${x0}) ⇒ ${f(m, bb)}.`),
    };
  },
  // 4. centro pela equação geral
  (r) => {
    const a = r.int(-5, 5), b = r.int(-5, 5), R = r.int(2, 9);
    const D = -2 * a, E = -2 * b, F = a * a + b * b - R * R;
    return {
      e: `Qual é o centro da circunferência x² + y²${t(D, 'x')}${t(E, 'y')}${t(F, '')} = 0?`,
      r: pt(a, b),
      d: [pt(-a, -b), pt(D, E), pt(b, a), pt(-a, b)].filter((v) => v !== pt(a, b)).concat([pt(a, -b)]),
      x: expl('centro = (−D/2, −E/2)', 'Os coeficientes de x e y, divididos por −2, dão o centro.', `(${-D}/2, ${-E}/2) = ${pt(a, b)}.`),
    };
  },
  // 5. posição reta × circunferência
  (r) => {
    const R = r.pick([5, 10, 13]), tipo = r.pick(['tangente', 'secante', 'exterior']);
    const [a, b, c] = R === 13 ? [5, 12, 13] : [3, 4, 5];
    const dist = tipo === 'tangente' ? R : tipo === 'secante' ? R - r.int(1, 3) : R + r.int(1, 4);
    const C = -dist * c;
    return {
      e: `A circunferência x² + y² = ${R * R} e a reta ${a}x + ${b}y${t(C, '')} = 0 são, entre si:`,
      r: tipo === 'tangente' ? 'tangentes (um ponto em comum)' : tipo === 'secante' ? 'secantes (dois pontos em comum)' : 'exteriores (nenhum ponto em comum)',
      d: ['tangentes (um ponto em comum)', 'secantes (dois pontos em comum)', 'exteriores (nenhum ponto em comum)', 'coincidentes', 'perpendiculares'],
      x: expl('distância do centro à reta', 'Compare a distância do centro (0, 0) à reta com o raio: igual → tangente; menor → secante; maior → exterior.', `d = |${C}|/${c} = ${dist}; raio ${R}.`),
    };
  },
  // 6. circunferência de diâmetro AB
  (r) => {
    const cx = r.int(-4, 4), cy = r.int(-4, 4), [p, q, R] = r.pick([[3, 4, 5], [4, 3, 5], [0, 5, 5], [6, 8, 10], [5, 12, 13]]);
    const A = [cx - p, cy - q], B = [cx + p, cy + q];
    return {
      e: `Qual é a equação da circunferência que tem o segmento de extremos A${pt(...A)} e B${pt(...B)} como diâmetro?`,
      r: circ(cx, cy, R * R),
      d: [circ(cx, cy, 4 * R * R), circ(cx, cy, R), circ(-cx, -cy, R * R), circ(A[0], A[1], R * R)].filter((v) => v !== circ(cx, cy, R * R)),
      x: expl('centro no ponto médio', 'O centro é o ponto médio do diâmetro; o raio é metade do comprimento de AB.', `Centro ${pt(cx, cy)}; AB = ${2 * R} ⇒ raio ${R}: ${circ(cx, cy, R * R)}.`),
    };
  },
  // 7. área de quadrilátero (fórmula do cadarço)
  (r) => {
    const P = [[r.int(-5, -1), r.int(-5, -1)], [r.int(1, 5), r.int(-5, -1)], [r.int(1, 6), r.int(1, 5)], [r.int(-6, -1), r.int(1, 5)]];
    let s = 0;
    for (let i = 0; i < 4; i++) s += P[i][0] * P[(i + 1) % 4][1] - P[(i + 1) % 4][0] * P[i][1];
    const area = Math.abs(s) / 2;
    return {
      e: `Qual é a área do quadrilátero de vértices ${P.map((p) => pt(...p)).join(', ')} (nessa ordem)?`,
      r: area,
      d: [area * 2, area / 2, area + 4, area - 3 > 0 ? area - 3 : area + 6],
      f: (v) => `${num(v)} u.a.`,
      x: expl('fórmula do cadarço', 'Some os produtos cruzados xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ ao redor da figura e divida o módulo por 2.', `Soma = ${s}; área = ${num(area)}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[3].vezes = 2;
dificil[4].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '16-geometria-analitica',
    titulo: 'Geometria analítica',
    provas: ['ENEM', 'Militares'],
    descricao: 'Distância entre pontos, ponto médio, retas, circunferências e áreas no plano cartesiano.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.analitica[0])], [...medio, ...novos(NOVOS.analitica[1])], [...dificil, ...novos(NOVOS.analitica[2])]],
  },
];
