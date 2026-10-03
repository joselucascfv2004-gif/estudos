// Matemática — Geometria plana.
import { arred, expl, nome, num, reais } from './util.mjs';

const TRIPLAS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]];
const m = (v) => `${num(v)} m`;
const m2 = (v) => `${num(v)} m²`;
const cm = (v) => `${num(v)} cm`;
const cm2 = (v) => `${num(v)} cm²`;
const grau = (v) => `${num(v)}°`;

const facil = [
  // 1. piso
  (r) => {
    const a = r.int(3, 9), b = r.int(3, 8), p = r.pick([30, 40, 45, 50, 60, 80]);
    return {
      e: `Uma sala retangular mede ${a} m por ${b} m. O piso escolhido custa ${reais(p)} o metro quadrado. Quanto será gasto com o piso?`,
      r: a * b * p,
      d: [2 * (a + b) * p, (a + b) * p, (a * b * p) / 2, a * b + p],
      f: reais,
      x: expl('área do retângulo', 'Piso cobre superfície: é área (base × altura), não perímetro.', `${a} × ${b} = ${a * b} m²; × ${reais(p)} = ${reais(a * b * p)}.`),
    };
  },
  // 2. hipotenusa
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    return {
      e: `Um triângulo retângulo tem catetos medindo ${a} cm e ${b} cm. Qual é a medida da hipotenusa?`,
      r: c,
      d: [a + b, c + 1, b - a > 0 ? b - a : c - 2, c - 1],
      f: cm,
      x: expl('teorema de Pitágoras', 'Em todo triângulo retângulo: hipotenusa² = cateto² + cateto².', `h² = ${a * a} + ${b * b} = ${c * c} ⇒ h = ${c} cm.`),
    };
  },
  // 3. área do círculo
  (r) => {
    const raio = r.int(2, 12);
    return {
      e: `Um irrigador gira e molha um círculo de ${raio} m de raio. Qual é a área de gramado molhada? (Use π = 3.)`,
      r: 3 * raio * raio,
      d: [6 * raio, 3 * raio, 9 * raio * raio, 3 * (2 * raio) ** 2],
      f: m2,
      x: expl('área do círculo', 'A = π · r². Cuidado para não usar o diâmetro no lugar do raio.', `3 × ${raio}² = ${3 * raio * raio} m².`),
    };
  },
  // 4. cerca com voltas
  (r) => {
    const a = r.int(10, 40), b = r.int(8, 30), v = r.pick([3, 4, 5]);
    return {
      e: `Um terreno retangular de ${a} m por ${b} m será cercado com ${v} voltas de arame. Quantos metros de arame serão necessários?`,
      r: 2 * (a + b) * v,
      d: [(a + b) * v, a * b * v, 2 * (a + b), 2 * (a + b) * (v + 1)],
      f: m,
      x: expl('perímetro', 'Cerca contorna o terreno: é perímetro (soma dos lados).', `2 × (${a} + ${b}) = ${2 * (a + b)} m; × ${v} = ${2 * (a + b) * v} m.`),
    };
  },
  // 5. soma dos ângulos internos
  (r) => {
    const n = r.pick([5, 6, 7, 8, 9, 10, 12, 15, 20]);
    return {
      e: `Qual é a soma das medidas dos ângulos internos de um polígono convexo de ${n} lados?`,
      r: 180 * (n - 2),
      d: [180 * n, 360, 180 * (n - 1), 360 * (n - 2)],
      f: grau,
      x: expl('dividir em triângulos', `De um vértice saem diagonais que dividem o polígono em ${n} − 2 triângulos, cada um com 180°.`, `180° × ${n - 2} = ${num(180 * (n - 2))}°.`),
    };
  },
  // 6. área do triângulo
  (r) => {
    const b = r.int(10, 40), h = r.int(6, 30);
    return {
      e: `Um terreno tem a forma de um triângulo com base de ${b} m e altura de ${h} m em relação a essa base. Qual é a sua área?`,
      r: (b * h) / 2,
      d: [b * h, b + h, (b * h) / 4, 2 * (b + h)],
      f: m2,
      x: expl('área do triângulo', 'Todo triângulo é metade de um retângulo (ou paralelogramo) de mesma base e altura.', `${b} × ${h} ÷ 2 = ${num((b * h) / 2)} m².`),
    };
  },
  // 7. terceiro ângulo
  (r) => {
    const a = r.int(25, 80), b = r.int(20, 90);
    if (a + b >= 170) return facil[6](r);
    return {
      e: `Dois ângulos de um triângulo medem ${a}° e ${b}°. Quanto mede o terceiro ângulo?`,
      r: 180 - a - b,
      d: [360 - a - b, a + b, 90 - Math.min(a, b), 180 - a],
      f: grau,
      x: expl('soma dos ângulos do triângulo', 'Os três ângulos internos de qualquer triângulo somam 180°.', `180° − ${a}° − ${b}° = ${180 - a - b}°.`),
    };
  },
  // 8. pista circular
  (r) => {
    const raio = r.pick([20, 25, 30, 50]), voltas = r.int(3, 10);
    const c = 2 * 3.14 * raio;
    return {
      e: `Uma pista de caminhada é uma circunferência de ${raio} m de raio. Quantos metros anda quem dá ${voltas} voltas completas? (Use π = 3,14.)`,
      r: arred(c * voltas, 2),
      d: [arred(3.14 * raio * voltas, 2), arred(3.14 * raio * raio * voltas, 2), arred(c, 2), arred(c * voltas * 2, 2)],
      f: m,
      x: expl('comprimento da circunferência', 'Uma volta tem C = 2πr.', `C = 2 × 3,14 × ${raio} = ${num(c)} m; × ${voltas} = ${num(c * voltas)} m.`),
    };
  },
  // 9. azulejos
  (r) => {
    const L = r.pick([2.4, 3, 3.6, 4]), H = r.pick([2, 2.4, 2.8]), a = r.pick([20, 40]);
    const n = Math.round((L * 100 * H * 100) / (a * a));
    if (((L * 100) % a) || ((H * 100) % a)) return facil[8](r);
    return {
      e: `Uma parede de ${num(L)} m por ${num(H)} m será coberta com azulejos quadrados de ${a} cm de lado, sem sobras nem cortes. Quantos azulejos serão usados?`,
      r: n,
      d: [Math.round((L * H) / (a / 100)), Math.round(n / 2), Math.round(((L + H) * 200) / a), n * 4],
      x: expl('área ÷ área (mesma unidade)', 'Converta tudo para centímetros antes de dividir; ou conte quantos cabem em cada direção.', `${(L * 100) / a} azulejos na largura × ${(H * 100) / a} na altura = ${n}.`),
    };
  },
  // 10. complemento e suplemento
  (r) => {
    const a = r.int(12, 78);
    const tipo = r.pick(['complemento', 'suplemento']);
    const v = tipo === 'complemento' ? 90 - a : 180 - a;
    return {
      e: `Qual é o ${tipo} de um ângulo de ${a}°?`,
      r: v,
      d: [tipo === 'complemento' ? 180 - a : 90 - a, 360 - a, a, a / 2],
      f: grau,
      x: expl(tipo, 'Complementares somam 90°; suplementares somam 180°.', `${tipo === 'complemento' ? 90 : 180}° − ${a}° = ${v}°.`),
    };
  },
  // 11. losango
  (r) => {
    const D = r.int(8, 30), d = r.int(4, D - 2);
    return {
      e: `Uma pipa tem a forma de um losango cujas diagonais medem ${D} cm e ${d} cm. Quantos cm² de papel cobrem a pipa?`,
      r: (D * d) / 2,
      d: [D * d, D + d, 2 * (D + d), (D * d) / 4],
      f: cm2,
      x: expl('área do losango', 'O losango é metade do retângulo formado pelas suas diagonais.', `${D} × ${d} ÷ 2 = ${num((D * d) / 2)} cm².`),
    };
  },
  // 12. ângulo externo
  (r) => {
    const n = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
    return {
      e: `Quanto mede cada ângulo externo de um polígono regular de ${n} lados?`,
      r: 360 / n,
      d: [180 / n, (180 * (n - 2)) / n, 360 - 360 / n, 360 / (n - 2)],
      f: grau,
      x: expl('soma dos ângulos externos', 'Em qualquer polígono convexo, os externos somam 360°. No regular, são todos iguais.', `360° ÷ ${n} = ${num(360 / n)}°.`),
    };
  },
  // 13. do perímetro à área
  (r) => {
    const l = r.int(4, 25);
    return {
      e: `Um quadrado tem perímetro de ${4 * l} cm. Qual é a sua área?`,
      r: l * l,
      d: [4 * l, (4 * l) ** 2, 2 * l * l, l * 2],
      f: cm2,
      x: expl('perímetro → lado → área', 'Perímetro ÷ 4 dá o lado; o lado ao quadrado dá a área.', `Lado: ${4 * l} ÷ 4 = ${l}; área: ${l}² = ${l * l} cm².`),
    };
  },
];
facil[1].vezes = 2;
facil[5].vezes = 2;
facil[6].vezes = 2;
facil[9].vezes = 2;

const medio = [
  // 1. trapézio
  (r) => {
    const B = r.int(8, 20), b = r.int(3, B - 2), h = r.int(3, 12);
    return {
      e: `Um terreno tem a forma de um trapézio com bases de ${B} m e ${b} m e altura de ${h} m. Qual é a sua área?`,
      r: ((B + b) * h) / 2,
      d: [(B + b) * h, (B * b * h) / 2, ((B - b) * h) / 2, B * h],
      f: m2,
      x: expl('área do trapézio', 'Média das bases vezes a altura.', `(${B} + ${b}) × ${h} ÷ 2 = ${num(((B + b) * h) / 2)} m².`),
    };
  },
  // 2. escada
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    return {
      e: `Uma escada de ${c} m está apoiada em uma parede vertical, com o pé a ${a} m da base da parede. A que altura da parede está o topo da escada?`,
      r: b,
      d: [c - a, c + a, arred(Math.sqrt(c * c + a * a), 1), b - 1],
      f: m,
      x: expl('teorema de Pitágoras', 'Parede, chão e escada formam um triângulo retângulo; a escada é a hipotenusa.', `h² = ${c}² − ${a}² = ${c * c - a * a} ⇒ h = ${b} m.`),
    };
  },
  // 3. roda da bicicleta
  (r) => {
    const raio = r.pick([0.3, 0.35, 0.4, 0.5]), voltas = r.pick([100, 200, 500, 1000]);
    const dist = 2 * 3.14 * raio * voltas;
    return {
      e: `A roda de uma bicicleta tem raio de ${num(raio * 100)} cm. Quantos metros a bicicleta percorre quando a roda dá ${num(voltas)} voltas completas? (Use π = 3,14.)`,
      r: arred(dist, 2),
      d: [arred(dist / 2, 2), arred(3.14 * raio * raio * voltas, 2), arred(dist * 2, 2), arred(dist / 10, 2)],
      f: m,
      x: expl('comprimento da circunferência', 'Em cada volta, a roda "desenrola" o seu contorno no chão: 2πr.', `2 × 3,14 × ${num(raio)} = ${num(2 * 3.14 * raio, 3)} m por volta; × ${voltas} = ${num(dist)} m.`),
    };
  },
  // 4. diagonais
  (r) => {
    const n = r.pick([5, 6, 7, 8, 9, 10, 12, 15, 20]);
    return {
      e: `Quantas diagonais tem um polígono convexo de ${n} lados?`,
      r: (n * (n - 3)) / 2,
      d: [n * (n - 3), (n * (n - 1)) / 2, n - 3, (n * (n - 2)) / 2],
      x: expl('contagem de diagonais', 'De cada vértice saem n − 3 diagonais (não vai para si nem para os 2 vizinhos); cada diagonal foi contada duas vezes.', `${n} × ${n - 3} ÷ 2 = ${(n * (n - 3)) / 2}.`),
    };
  },
  // 5. sombra
  (r) => {
    const sombraP = r.pick([0.5, 0.8, 1, 1.2, 1.5]), hP = r.pick([1.5, 1.6, 1.8, 2]);
    const k = r.int(4, 15), sombra = arred(sombraP * k, 2);
    return {
      e: `Em um mesmo instante, um poste projeta uma sombra de ${num(sombra)} m e uma pessoa de ${num(hP)} m de altura projeta uma sombra de ${num(sombraP)} m. Qual é a altura do poste?`,
      r: arred(hP * k, 2),
      d: [arred((sombra * sombraP) / hP, 2), arred(sombra + hP, 2), arred(hP * k + 1, 2), sombra === arred(hP * k, 2) ? sombra + 2 : sombra],
      f: m,
      x: expl('semelhança de triângulos', 'No mesmo instante, os raios de sol são paralelos: altura ÷ sombra é igual para o poste e a pessoa.', `h ÷ ${num(sombra)} = ${num(hP)} ÷ ${num(sombraP)} ⇒ h = ${num(hP * k)} m.`),
    };
  },
  // 6. fatia de pizza (setor)
  (r) => {
    const raio = r.pick([15, 20, 25, 30]), ang = r.pick([30, 45, 60, 90]);
    const a = (3 * raio * raio * ang) / 360;
    return {
      e: `Uma pizza redonda de ${raio} cm de raio foi cortada em fatias iguais de ${ang}° cada. Qual é a área de uma fatia? (Use π = 3.)`,
      r: a,
      d: [3 * raio * raio, (3 * raio * raio) / (ang / 10), (2 * 3 * raio * ang) / 360, a * 2],
      f: cm2,
      x: expl('setor circular', `A fatia é a fração ${ang}/360 do círculo inteiro.`, `Círculo: 3 × ${raio}² = ${3 * raio * raio} cm²; × ${ang}/360 = ${num(a)} cm².`),
    };
  },
  // 7. triângulo isósceles
  (r) => {
    const [a, b, c] = r.pick([[5, 12, 13], [3, 4, 5], [8, 15, 17], [6, 8, 10], [9, 12, 15]]);
    return {
      e: `Um triângulo isósceles tem os dois lados iguais medindo ${c} cm e a base medindo ${2 * a} cm. Qual é a sua área?`,
      r: a * b,
      d: [2 * a * b, (2 * a * c) / 2, a * c, a * b + a],
      f: cm2,
      x: expl('altura por Pitágoras', 'A altura do isósceles cai no meio da base e forma dois triângulos retângulos.', `Metade da base: ${a}. Altura: √(${c}² − ${a}²) = ${b}. Área: ${2 * a} × ${b} ÷ 2 = ${a * b} cm².`),
    };
  },
  // 8. coroa circular
  (r) => {
    const R = r.int(5, 15), rr = r.int(2, R - 2);
    return {
      e: `Uma arruela é formada por dois círculos de mesmo centro: o externo com raio ${R} mm e o interno (furo) com raio ${rr} mm. Qual é a área da arruela? (Use π = 3.)`,
      r: 3 * (R * R - rr * rr),
      d: [3 * (R - rr) ** 2, 3 * R * R, 3 * (R * R + rr * rr), 6 * (R - rr)],
      f: (v) => `${num(v)} mm²`,
      x: expl('área por subtração', 'Área da peça = área de fora − área do furo.', `3 × ${R}² − 3 × ${rr}² = ${3 * R * R} − ${3 * rr * rr} = ${3 * (R * R - rr * rr)} mm².`),
    };
  },
  // 9. ângulo interno do polígono regular
  (r) => {
    const n = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
    return {
      e: `Quanto mede cada ângulo interno de um polígono regular de ${n} lados?`,
      r: (180 * (n - 2)) / n,
      d: [360 / n, 180 * (n - 2), 180 - 180 / n === (180 * (n - 2)) / n ? 180 - 360 / (n + 1) : 180 - 180 / n, (180 * n) / (n - 2)],
      f: grau,
      x: expl('soma ÷ quantidade', 'Ângulos internos somam 180°(n − 2) e, no polígono regular, são todos iguais. (Ou: 180° − ângulo externo.)', `180° × ${n - 2} ÷ ${n} = ${num((180 * (n - 2)) / n)}°.`),
    };
  },
  // 10. paralelas e transversal
  (r) => {
    const x = r.int(10, 30), a = r.int(2, 4), b = a + r.int(1, 3);
    const c = r.int(5, 40);
    const d = (a - b) * x + c; // a·x + c = b·x + d ⇒ d = c + (a − b)x
    if (b * x + d <= 0 || b * x + d >= 180) return medio[9](r);
    return {
      e: `Duas retas paralelas são cortadas por uma transversal, formando dois ângulos alternos internos que medem (${a}x + ${c})° e (${b}x${d >= 0 ? ' + ' + d : ' − ' + -d})°. Quanto mede cada um desses ângulos?`,
      r: a * x + c,
      d: [x, 180 - (a * x + c), a * x, (a * x + c) / 2],
      f: grau,
      x: expl('ângulos alternos internos', 'Com retas paralelas, ângulos alternos internos são iguais.', `${a}x + ${c} = ${b}x${d >= 0 ? ' + ' + d : ' − ' + -d} ⇒ x = ${x}; ângulo = ${a * x + c}°.`),
    };
  },
  // 11. diagonal da tela
  (r) => {
    const [a, b, c] = r.pick([[36, 48, 60], [30, 40, 50], [45, 60, 75], [27, 36, 45]]);
    return {
      e: `A tela retangular de um monitor mede ${b} cm de largura por ${a} cm de altura. Qual é a medida da sua diagonal?`,
      r: c,
      d: [a + b, (a + b) / 2 === c ? c + 6 : (a + b) / 2, c + 10, b - a],
      f: cm,
      x: expl('Pitágoras no retângulo', 'A diagonal divide o retângulo em dois triângulos retângulos.', `d² = ${b}² + ${a}² = ${c * c} ⇒ d = ${c} cm.`),
    };
  },
  // 12. área de figura em L
  (r) => {
    const A = r.int(12, 30), B = r.int(10, 20), a = r.int(4, A - 4), b = r.int(3, B - 3);
    return {
      e: `Um terreno em forma de "L" foi obtido retirando-se, de um canto de um retângulo de ${A} m por ${B} m, um retângulo de ${a} m por ${b} m. Qual é a área do terreno?`,
      r: A * B - a * b,
      d: [A * B, (A - a) * (B - b), A * B + a * b, 2 * (A + B)],
      f: m2,
      x: expl('área por subtração', 'Calcule a figura "completa" e retire o pedaço que falta.', `${A} × ${B} − ${a} × ${b} = ${A * B} − ${a * b} = ${A * B - a * b} m².`),
    };
  },
  // 13. da área ao perímetro
  (r) => {
    const a = r.int(3, 12), b = r.int(a + 1, 20);
    return {
      e: `Um retângulo tem área de ${a * b} m² e um dos lados mede ${a} m. Qual é o seu perímetro?`,
      r: 2 * (a + b),
      d: [a + b, a * b, 4 * a, 2 * a + b],
      f: m,
      x: expl('área → lado → perímetro', 'Com a área e um lado, o outro lado é área ÷ lado.', `Outro lado: ${a * b} ÷ ${a} = ${b}; perímetro: 2 × (${a} + ${b}) = ${2 * (a + b)} m.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[4].vezes = 2;

const dificil = [
  // 1. quadrado menos círculo
  (r) => {
    const a = r.pick([2, 4, 6, 8, 10, 12]);
    return {
      e: `Um quadrado de lado ${a} cm tem um círculo inscrito (tangente aos quatro lados). Qual é a área da região do quadrado que fica fora do círculo? (Use π = 3.)`,
      r: a * a - 3 * (a / 2) ** 2,
      d: [3 * (a / 2) ** 2, a * a - 3 * a, (a * a) / 2, a * a - 3 * a * a / 2],
      f: cm2,
      x: expl('área por subtração', 'O diâmetro do círculo inscrito é o lado do quadrado.', `Raio ${a / 2}. ${a * a} − 3 × ${(a / 2) ** 2} = ${a * a - 3 * (a / 2) ** 2} cm².`),
    };
  },
  // 2. equilátero
  (r) => {
    const a = r.pick([2, 4, 6, 8, 10]);
    const v = (a * a * 1.7) / 4;
    return {
      e: `Qual é a área de um triângulo equilátero de lado ${a} cm? (Use √3 = 1,7.)`,
      r: v,
      d: [(a * a * 1.7) / 2, (a * a) / 2, a * a * 1.7, (3 * a * 1.7) / 4],
      f: cm2,
      x: expl('fórmula do equilátero', 'A altura é l√3/2 (Pitágoras com metade da base); a área fica l²√3/4.', `${a * a} × 1,7 ÷ 4 = ${num(v)} cm².`),
    };
  },
  // 3. hexágono
  (r) => {
    const a = r.pick([2, 4, 6, 10]);
    const v = (6 * a * a * 1.7) / 4;
    return {
      e: `Um piso tem o formato de um hexágono regular de lado ${a} m. Qual é a sua área? (Use √3 = 1,7.)`,
      r: v,
      d: [(a * a * 1.7) / 4, 6 * a * a, (3 * a * a * 1.7) / 4, 6 * a],
      f: m2,
      x: expl('decompor em triângulos', 'O hexágono regular é formado por 6 triângulos equiláteros iguais.', `6 × ${a * a} × 1,7 ÷ 4 = ${num(v)} m².`),
    };
  },
  // 4. quadrado inscrito na circunferência
  (r) => {
    const raio = r.int(2, 12);
    return {
      e: `Um quadrado está inscrito em uma circunferência de raio ${raio} cm. Qual é a área desse quadrado?`,
      r: 2 * raio * raio,
      d: [raio * raio, 4 * raio * raio, 3 * raio * raio, 2 * raio],
      f: cm2,
      x: expl('diagonal do quadrado', 'A diagonal do quadrado inscrito é o diâmetro. Área do quadrado = d²/2.', `d = ${2 * raio}; ${4 * raio * raio} ÷ 2 = ${2 * raio * raio} cm².`),
    };
  },
  // 5. Tales
  (r) => {
    const a = r.int(2, 9), b = r.int(2, 9), k = r.pick([2, 3, 4]);
    return {
      e: `Três retas paralelas cortam duas transversais. Na primeira transversal, os segmentos determinados medem ${a} cm e ${b} cm. Na segunda, o segmento correspondente ao de ${a} cm mede ${a * k} cm. Quanto mede o outro segmento da segunda transversal?`,
      r: b * k,
      d: [b + a * k - a, b * k + k, a * b, b * k - 1],
      f: cm,
      x: expl('teorema de Tales', 'Paralelas cortando transversais geram segmentos proporcionais.', `${a}/${b} = ${a * k}/x ⇒ x = ${b * k} cm.`),
    };
  },
  // 6. altura relativa à hipotenusa
  (r) => {
    const [b, c, a] = r.pick([[6, 8, 10], [9, 12, 15], [12, 16, 20], [15, 20, 25], [3, 4, 5]]);
    return {
      e: `Em um triângulo retângulo de catetos ${b} cm e ${c} cm, qual é a altura relativa à hipotenusa?`,
      r: (b * c) / a,
      d: [(b + c) / 2, a / 2, (b * c) / 2, Math.min(b, c)],
      f: cm,
      x: expl('duas formas de calcular a área', 'Área = cateto × cateto ÷ 2 = hipotenusa × altura ÷ 2. Iguale as duas.', `Hipotenusa ${a}. ${b} × ${c} = ${a} × h ⇒ h = ${num((b * c) / a)} cm.`),
    };
  },
  // 7. fórmula de Heron
  (r) => {
    const [a, b, c, A] = r.pick([[13, 14, 15, 84], [5, 5, 6, 12], [10, 10, 12, 48], [9, 10, 17, 36], [7, 15, 20, 42]]);
    const s = (a + b + c) / 2;
    return {
      e: `Um terreno triangular tem lados de ${a} m, ${b} m e ${c} m. Qual é a sua área?`,
      r: A,
      d: [(a * b) / 2, a + b + c, A * 2, (b * c) / 2],
      f: m2,
      x: expl('fórmula de Heron', 'Sem a altura, use A = √[p(p − a)(p − b)(p − c)], em que p é o semiperímetro.', `p = ${s}; A = √(${s} · ${s - a} · ${s - b} · ${s - c}) = √${A * A} = ${A} m².`),
    };
  },
  // 8. raio do círculo inscrito no triângulo retângulo
  (r) => {
    const [b, c, a] = r.pick(TRIPLAS);
    return {
      e: `Qual é o raio da circunferência inscrita em um triângulo retângulo de catetos ${b} cm e ${c} cm?`,
      r: (b + c - a) / 2,
      d: [a / 2, (b + c) / 4, (b * c) / (a + b + c) * 2, (b + c - a)],
      f: cm,
      x: expl('tangentes e área', 'No triângulo retângulo, r = (cateto + cateto − hipotenusa)/2. (Também sai de Área = r × semiperímetro.)', `Hipotenusa ${a}: r = (${b} + ${c} − ${a}) ÷ 2 = ${num((b + c - a) / 2)} cm.`),
    };
  },
  // 9. ângulo inscrito
  (r) => {
    const cen = r.pick([60, 80, 100, 120, 140, 70]);
    return {
      e: `Em uma circunferência, um ângulo central mede ${cen}°. Quanto mede um ângulo inscrito que enxerga o mesmo arco?`,
      r: cen / 2,
      d: [cen, 180 - cen, cen * 2, 360 - cen],
      f: grau,
      x: expl('ângulo inscrito', 'O ângulo inscrito vale metade do ângulo central que enxerga o mesmo arco.', `${cen}° ÷ 2 = ${cen / 2}°.`),
    };
  },
  // 10. pizza: qual compensa
  (r) => {
    const [d1, p1, d2, p2] = r.pick([[30, 40, 40, 60], [30, 36, 40, 60], [25, 30, 35, 54], [30, 45, 40, 70]]);
    const a1 = 3 * (d1 / 2) ** 2, a2 = 3 * (d2 / 2) ** 2;
    const u1 = p1 / a1, u2 = p2 / a2;
    const melhor = u1 < u2 ? `de ${d1} cm` : `de ${d2} cm`;
    return {
      e: `Uma pizzaria vende pizza de ${d1} cm de diâmetro por ${reais(p1)} e de ${d2} cm por ${reais(p2)}. Considerando o preço por área (use π = 3), qual pizza compensa mais?`,
      r: `A pizza ${melhor}, porque custa menos por cm²`,
      d: [`A pizza ${u1 < u2 ? `de ${d2} cm` : `de ${d1} cm`}, porque custa menos por cm²`, 'As duas custam o mesmo por cm²', `A pizza de ${d1} cm, porque é mais barata`, `A pizza de ${d2} cm, porque o diâmetro é maior`],
      x: expl('preço por unidade de área', 'Compare o preço de cada cm²: preço ÷ área. A área cresce com o quadrado do raio.', `${d1} cm: área ${a1} cm² → ${num(u1 * 100, 3)} centavos/cm². ${d2} cm: área ${a2} cm² → ${num(u2 * 100, 3)} centavos/cm².`),
    };
  },
  // 11. quadrado inscrito no triângulo retângulo
  (r) => {
    const [a, b] = r.pick([[3, 6], [4, 12], [6, 12], [10, 15], [6, 3], [12, 4]]);
    const l = (a * b) / (a + b);
    return {
      e: `Um triângulo retângulo tem catetos de ${a} m e ${b} m. Dentro dele será construído o maior quadrado possível, com um vértice no ângulo reto e o vértice oposto sobre a hipotenusa. Quanto mede o lado do quadrado?`,
      r: l,
      d: [(a + b) / 4, Math.min(a, b) / 2, (a * b) / 2 / (a + b) * 3, l + 1],
      f: m,
      x: expl('semelhança de triângulos', 'O quadrado deixa um triângulo menor semelhante ao original em cima dele.', `(${a} − l)/l = ${a}/${b} ⇒ l = ${a} × ${b} ÷ (${a} + ${b}) = ${num(l)} m.`),
    };
  },
  // 12. número de lados pelo ângulo interno
  (r) => {
    const n = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]);
    const ang = (180 * (n - 2)) / n;
    return {
      e: `Cada ângulo interno de um polígono regular mede ${num(ang)}°. Quantos lados tem esse polígono?`,
      r: n,
      d: [n + 2, n - 2, Math.round(360 / ang), Math.round(ang / 10)],
      x: expl('pelo ângulo externo', 'Externo = 180° − interno; e a soma dos externos é 360°.', `Externo: 180° − ${num(ang)}° = ${num(180 - ang)}°; n = 360 ÷ ${num(180 - ang)} = ${n}.`),
    };
  },
];
dificil[1].vezes = 2;
dificil[5].vezes = 2;
dificil[11].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '08-geometria-plana',
    titulo: 'Geometria plana',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Áreas e perímetros, ângulos, teorema de Pitágoras, semelhança, polígonos e círculo.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
