// Matemática: progressões, geometria plana e espacial, trigonometria e estatística.
import { arred, fracao, mdc, nome, num, reais } from './util.mjs';

const PROVAS_TODAS = ['ENEM', 'Militares', 'Concursos'];
const m = (v) => `${num(v)} m`;
const m2 = (v) => `${num(v)} m²`;
const cm = (v) => `${num(v)} cm`;
const sinalN = (v) => (v < 0 ? `− ${num(-v)}` : `+ ${num(v)}`);

// ---------------------------------------------------------------- Progressões
const progressoes = {
  disciplina: 'matematica',
  arquivo: '07-progressoes',
  titulo: 'Progressões aritméticas e geométricas',
  provas: PROVAS_TODAS,
  descricao: 'Termo geral e soma de PA e PG, PG infinita e problemas de sequências.',
  niveis: [
    [
      (r) => {
        const a1 = r.int(-5, 12), d = r.int(-4, 7) || 3, n = r.int(8, 30);
        return {
          e: `Em uma progressão aritmética, o primeiro termo é ${a1} e a razão é ${d}. Qual é o ${n}º termo?`,
          r: a1 + (n - 1) * d,
          d: [a1 + n * d, a1 * n + d, (n - 1) * d, a1 + (n - 2) * d],
          x: `aₙ = a₁ + (n − 1)·r = ${a1} + ${n - 1} · ${d} = ${a1 + (n - 1) * d}.`,
        };
      },
      (r) => {
        const a1 = r.pick([1, 2, 3, 5]), q = r.pick([2, 3]), n = r.int(4, q === 2 ? 9 : 6);
        return {
          e: `Em uma progressão geométrica de primeiro termo ${a1} e razão ${q}, qual é o ${n}º termo?`,
          r: a1 * q ** (n - 1),
          d: [a1 * q ** n, a1 * q * (n - 1), (a1 * q) ** (n - 1), a1 + q * (n - 1)],
          x: `aₙ = a₁ · qⁿ⁻¹ = ${a1} · ${q}^${n - 1} = ${a1 * q ** (n - 1)}.`,
        };
      },
      (r) => {
        const a = r.int(1, 20), d = r.int(2, 9);
        const seq = [0, 1, 2, 3, 4].map((i) => a + i * d);
        return {
          e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
          r: a + 5 * d,
          d: [a + 5 * d + 1, a + 6 * d, a + 5 * d - 1, seq[4] * 2],
          x: `A diferença entre termos consecutivos é sempre ${d} (PA de razão ${d}). Próximo: ${seq[4]} + ${d} = ${a + 5 * d}.`,
        };
      },
      (r) => {
        const n = r.int(8, 40);
        return {
          e: `Qual é a soma dos ${n} primeiros números ímpares positivos (1 + 3 + 5 + ...)?`,
          r: n * n,
          d: [n * (n + 1), 2 * n * n, n * (n + 1) / 2, n * n - 1],
          x: `É uma PA com a₁ = 1 e aₙ = ${2 * n - 1}: S = (1 + ${2 * n - 1}) · ${n}/2 = ${n * n}. (A soma dos n primeiros ímpares é sempre n².)`,
        };
      },
      (r) => {
        const a = r.pick([1, 2, 3, 4, 5, 6, 8, 10]), q = r.pick([2, 3, 4]);
        const seq = [0, 1, 2, 3].map((i) => a * q ** i);
        return {
          e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
          r: a * q ** 4,
          d: [seq[3] + (seq[3] - seq[2]), a * q ** 4 / 2, a * q ** 5, seq[3] * 2 === a * q ** 4 ? seq[3] * 3 : seq[3] * 2],
          x: `Cada termo é o anterior multiplicado por ${q} (PG de razão ${q}). Próximo: ${seq[3]} × ${q} = ${a * q ** 4}.`,
        };
      },
    ],
    [
      (r) => {
        const a1 = r.int(1, 15), d = r.int(2, 6), n = r.int(10, 30);
        const an = a1 + (n - 1) * d;
        return {
          e: `Qual é a soma dos ${n} primeiros termos da PA (${a1}, ${a1 + d}, ${a1 + 2 * d}, ...)?`,
          r: ((a1 + an) * n) / 2,
          d: [(a1 + an) * n, an * n, ((a1 + an + d) * n) / 2, ((a1 + an) * (n - 1)) / 2],
          x: `a${n} = ${a1} + ${n - 1}·${d} = ${an}. Sₙ = (a₁ + aₙ)·n/2 = (${a1} + ${an})·${n}/2 = ${((a1 + an) * n) / 2}.`,
        };
      },
      (r) => {
        const a1 = r.pick([1, 2, 3, 5]), q = r.pick([2, 3]), n = r.int(4, q === 2 ? 10 : 6);
        const s = (a1 * (q ** n - 1)) / (q - 1);
        return {
          e: `Qual é a soma dos ${n} primeiros termos da PG (${a1}, ${a1 * q}, ${a1 * q * q}, ...)?`,
          r: s,
          d: [a1 * q ** n, a1 * q ** (n - 1), (a1 * (q ** (n + 1) - 1)) / (q - 1), s - a1],
          x: `Sₙ = a₁(qⁿ − 1)/(q − 1) = ${a1}(${q}^${n} − 1)/${q - 1} = ${num(s)}.`,
        };
      },
      (r) => {
        const a = r.pick([50, 100, 150, 200]), d = r.pick([10, 20, 25, 50]), n = r.pick([6, 10, 12, 18, 24]);
        const tot = (n * (2 * a + (n - 1) * d)) / 2;
        return {
          e: `${nome(r)} decidiu economizar: guardou ${reais(a)} no primeiro mês e, a cada mês, guarda ${reais(d)} a mais que no mês anterior. Quanto terá guardado ao final de ${n} meses?`,
          r: tot,
          d: [a * n + d * n, (a + (n - 1) * d) * n, a * n, tot + a],
          f: reais,
          x: `PA com a₁ = ${a}, r = ${d}: a${n} = ${a + (n - 1) * d}. S = (${a} + ${a + (n - 1) * d}) · ${n}/2 = ${reais(tot)}.`,
        };
      },
      (r) => {
        const k = r.pick([3, 4, 6, 7, 9, 11]), A = r.int(10, 99), B = r.int(300, 999);
        const primeiro = Math.ceil(A / k) * k, ultimo = Math.floor(B / k) * k;
        const q = (ultimo - primeiro) / k + 1;
        return {
          e: `Quantos múltiplos de ${k} existem entre ${A} e ${B}?`,
          r: q,
          d: [q + 1, q - 1, Math.round((B - A) / k), Math.floor(B / k)],
          x: `O primeiro é ${primeiro} e o último é ${ultimo}. Numa PA de razão ${k}: n = (${ultimo} − ${primeiro})/${k} + 1 = ${q}.`,
        };
      },
      (r) => {
        const a1 = r.int(-10, 10), d = r.int(2, 7) * r.pick([1, -1]);
        const i = r.int(3, 6), j = i + r.int(3, 6);
        return {
          e: `Em uma PA, o ${i}º termo é ${a1 + (i - 1) * d} e o ${j}º termo é ${a1 + (j - 1) * d}. Qual é o primeiro termo?`,
          r: a1,
          d: [d, a1 + d, -a1 === a1 ? a1 + 2 : -a1, a1 + (i - 1) * d - i * d],
          x: `De a${i} para a${j} há ${j - i} razões: r = (${a1 + (j - 1) * d} − ${a1 + (i - 1) * d})/${j - i} = ${d}. a₁ = a${i} − ${i - 1}·r = ${a1}.`,
        };
      },
    ],
    [
      (r) => {
        const a1 = r.pick([6, 8, 9, 10, 12, 20, 30]), [p, q] = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]);
        const s = (a1 * q) / (q - p);
        return {
          e: `Qual é a soma dos infinitos termos da PG (${a1}, ${num((a1 * p) / q)}, ${num((a1 * p * p) / (q * q))}, ...)?`,
          r: s,
          d: [a1 / (1 + p / q), a1 * (1 + p / q), s * 2, a1 * q],
          x: `PG infinita com a₁ = ${a1} e q = ${p}/${q}: S = a₁/(1 − q) = ${a1}/(${q - p}/${q}) = ${num(s)}.`,
        };
      },
      (r) => {
        const mid = r.int(3, 15), d = r.int(1, 6);
        const tres = [mid - d, mid, mid + d];
        const prod = tres.reduce((a, b) => a * b, 1);
        return {
          e: `Três números estão em PA crescente. A soma deles é ${3 * mid} e o produto é ${prod}. Qual é o maior deles?`,
          r: mid + d,
          d: [mid, mid - d, mid + 2 * d, 3 * mid - d],
          x: `Escrevendo (x − r, x, x + r): 3x = ${3 * mid} ⇒ x = ${mid}. Produto: ${mid}(${mid}² − r²) = ${prod} ⇒ r² = ${d * d}, r = ${d}. Maior: ${mid + d}.`,
        };
      },
      (r) => {
        const a = r.int(2, 20), k = r.int(3, 8), d = r.int(2, 9);
        const b = a + (k + 1) * d;
        return {
          e: `Ao inserir ${k} meios aritméticos entre ${a} e ${b}, obtém-se uma PA. Qual é a razão dessa PA?`,
          r: d,
          d: [(b - a) / k, d + 1, (b - a) / (k + 2), b - a],
          x: `A PA terá ${k + 2} termos: ${b} = ${a} + (${k + 2} − 1)·r ⇒ r = ${b - a}/${k + 1} = ${d}.`,
        };
      },
      (r) => {
        const k = r.pick([3, 4, 5, 6, 7]), N = r.pick([100, 150, 200, 300]);
        const n = Math.floor(N / k), s = (k * n * (n + 1)) / 2;
        return {
          e: `Qual é a soma de todos os múltiplos positivos de ${k} menores ou iguais a ${N}?`,
          r: s,
          d: [s - k * n, (k * n * n) / 2, n * (n + 1) / 2, s + k],
          x: `São ${k}, ${2 * k}, ..., ${k * n} (${n} termos). S = (${k} + ${k * n}) · ${n}/2 = ${num(s)}.`,
        };
      },
      (r) => {
        const x = r.pick([2, 3, 4, 6]), q = r.pick([2, 3]);
        const a = x, b = x * q, c = x * q * q;
        const k = r.int(1, 5);
        return {
          e: `Os números ${a - k}, ${b - k} e ${c - k}, somados a uma mesma constante c, formam uma progressão geométrica. Qual é o valor de c?`,
          r: k,
          d: [-k, k + 1, q, x],
          x: `Para (${a - k} + c, ${b - k} + c, ${c - k} + c) ser PG: (${b - k} + c)² = (${a - k} + c)(${c - k} + c). Resolvendo, c = ${k}, e a PG fica (${a}, ${b}, ${c}), de razão ${q}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Geometria plana
const TRIPLAS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]];
const plana = {
  disciplina: 'matematica',
  arquivo: '08-geometria-plana',
  titulo: 'Geometria plana',
  provas: PROVAS_TODAS,
  descricao: 'Áreas e perímetros, teorema de Pitágoras, semelhança, polígonos e círculo.',
  niveis: [
    [
      (r) => {
        const a = r.int(3, 9), b = r.int(3, 8), p = r.pick([30, 40, 45, 50, 60, 80]);
        return {
          e: `Uma sala retangular mede ${a} m por ${b} m. O piso escolhido custa ${reais(p)} o metro quadrado. Quanto será gasto com o piso?`,
          r: a * b * p,
          d: [2 * (a + b) * p, (a + b) * p, a * b * p / 2, a * b + p],
          f: reais,
          x: `Área = ${a} × ${b} = ${a * b} m². Custo = ${a * b} × ${reais(p)} = ${reais(a * b * p)}.`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick(TRIPLAS);
        return {
          e: `Um triângulo retângulo tem catetos medindo ${a} cm e ${b} cm. Qual é a medida da hipotenusa?`,
          r: c,
          d: [a + b, c + 1, Math.round(Math.sqrt(b * b - a * a)) || c - 2, (a + b) / 2 === c ? c + 2 : (a + b) / 2],
          f: cm,
          x: `Pitágoras: h² = ${a}² + ${b}² = ${a * a + b * b} ⇒ h = ${c} cm.`,
        };
      },
      (r) => {
        const raio = r.int(2, 12);
        return {
          e: `Qual é a área de um círculo de raio ${raio} m? (Use π = 3.)`,
          r: 3 * raio * raio,
          d: [6 * raio, 3 * raio, 9 * raio * raio, 3 * (2 * raio) ** 2],
          f: m2,
          x: `A = π·r² = 3 × ${raio}² = ${3 * raio * raio} m².`,
        };
      },
      (r) => {
        const a = r.int(10, 40), b = r.int(8, 30), v = r.pick([3, 4, 5]);
        return {
          e: `Um terreno retangular de ${a} m por ${b} m será cercado com ${v} voltas de arame. Quantos metros de arame serão necessários?`,
          r: 2 * (a + b) * v,
          d: [(a + b) * v, a * b * v, 2 * (a + b), 2 * (a + b) * (v + 1)],
          f: m,
          x: `Perímetro = 2 × (${a} + ${b}) = ${2 * (a + b)} m. Com ${v} voltas: ${2 * (a + b)} × ${v} = ${2 * (a + b) * v} m.`,
        };
      },
      (r) => {
        const n = r.pick([5, 6, 7, 8, 9, 10, 12, 15, 20]);
        return {
          e: `Qual é a soma das medidas dos ângulos internos de um polígono convexo de ${n} lados?`,
          r: 180 * (n - 2),
          d: [180 * n, 360, 180 * (n - 1), 360 * (n - 2)],
          f: (v) => `${num(v)}°`,
          x: `Sᵢ = 180° · (n − 2) = 180° · ${n - 2} = ${num(180 * (n - 2))}°.`,
        };
      },
    ],
    [
      (r) => {
        const B = r.int(8, 20), b = r.int(3, B - 2), h = r.int(3, 12);
        return {
          e: `Um terreno tem a forma de um trapézio com bases de ${B} m e ${b} m e altura de ${h} m. Qual é a sua área?`,
          r: ((B + b) * h) / 2,
          d: [(B + b) * h, B * b * h / 2, ((B - b) * h) / 2, B * h],
          f: m2,
          x: `A = (B + b)·h/2 = (${B} + ${b}) × ${h}/2 = ${num(((B + b) * h) / 2)} m².`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick(TRIPLAS);
        return {
          e: `Uma escada de ${c} m está apoiada em uma parede vertical, com o pé a ${a} m da base da parede. A que altura da parede está o topo da escada?`,
          r: b,
          d: [c - a, c + a > 30 ? b + 1 : c + a, Math.round(Math.sqrt(c * c + a * a) * 10) / 10, b - 1],
          f: m,
          x: `A escada é a hipotenusa: h² + ${a}² = ${c}² ⇒ h² = ${c * c - a * a} ⇒ h = ${b} m.`,
        };
      },
      (r) => {
        const raio = r.pick([0.3, 0.35, 0.4, 0.5]), voltas = r.pick([100, 200, 500, 1000]);
        const dist = 2 * 3.14 * raio * voltas;
        return {
          e: `A roda de uma bicicleta tem raio de ${num(raio * 100)} cm. Quantos metros a bicicleta percorre quando a roda dá ${num(voltas)} voltas completas? (Use π = 3,14.)`,
          r: arred(dist, 2),
          d: [arred(dist / 2, 2), arred(3.14 * raio * raio * voltas, 2), arred(dist * 2, 2), arred(dist / 10, 2)],
          f: m,
          x: `Cada volta corresponde ao comprimento da circunferência: 2πr = 2 × 3,14 × ${num(raio)} = ${num(2 * 3.14 * raio, 3)} m. Em ${voltas} voltas: ${num(dist)} m.`,
        };
      },
      (r) => {
        const n = r.pick([5, 6, 7, 8, 9, 10, 12, 15, 20]);
        return {
          e: `Quantas diagonais tem um polígono convexo de ${n} lados?`,
          r: (n * (n - 3)) / 2,
          d: [n * (n - 3), (n * (n - 1)) / 2, n - 3, (n * (n - 2)) / 2],
          x: `d = n(n − 3)/2 = ${n} × ${n - 3}/2 = ${(n * (n - 3)) / 2}.`,
        };
      },
      (r) => {
        const sombraP = r.pick([0.5, 0.8, 1, 1.2, 1.5]), hP = r.pick([1.5, 1.6, 1.8, 2]);
        const k = r.int(4, 15), sombra = arred(sombraP * k, 2);
        return {
          e: `Em um mesmo instante, um poste projeta uma sombra de ${num(sombra)} m e uma pessoa de ${num(hP)} m de altura projeta uma sombra de ${num(sombraP)} m. Qual é a altura do poste?`,
          r: arred(hP * k, 2),
          d: [arred((sombra * sombraP) / hP, 2), arred(sombra + hP, 2), arred(hP * k + 1, 2), arred(sombra, 2) === arred(hP * k, 2) ? sombra + 2 : sombra],
          f: m,
          x: `Triângulos semelhantes: h/${num(sombra)} = ${num(hP)}/${num(sombraP)} ⇒ h = ${num(sombra)} × ${num(hP)}/${num(sombraP)} = ${num(hP * k)} m.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.pick([2, 4, 6, 8, 10, 12]);
        return {
          e: `Um quadrado de lado ${a} cm tem um círculo inscrito (tangente aos quatro lados). Qual é a área da região do quadrado que fica fora do círculo? (Use π = 3.)`,
          r: a * a - 3 * (a / 2) ** 2,
          d: [a * a - 3 * a * a, 3 * (a / 2) ** 2, a * a - 3 * a, a * a / 2],
          f: (v) => `${num(v)} cm²`,
          x: `Raio = ${a / 2} cm. Área do quadrado: ${a * a}; do círculo: 3 × ${(a / 2) ** 2} = ${3 * (a / 2) ** 2}. Diferença: ${a * a - 3 * (a / 2) ** 2} cm².`,
        };
      },
      (r) => {
        const a = r.pick([2, 4, 6, 8, 10]);
        const v = (a * a * 1.7) / 4;
        return {
          e: `Qual é a área de um triângulo equilátero de lado ${a} cm? (Use √3 = 1,7.)`,
          r: v,
          d: [(a * a * 1.7) / 2, (a * a) / 2, a * a * 1.7, (3 * a * 1.7) / 4],
          f: (x) => `${num(x)} cm²`,
          x: `A = l²√3/4 = ${a * a} × 1,7/4 = ${num(v)} cm².`,
        };
      },
      (r) => {
        const a = r.pick([2, 4, 6, 10]);
        const v = (6 * a * a * 1.7) / 4;
        return {
          e: `Um piso tem o formato de um hexágono regular de lado ${a} m. Qual é a sua área? (Use √3 = 1,7.)`,
          r: v,
          d: [(a * a * 1.7) / 4, 6 * a * a, (3 * a * a * 1.7) / 4, 6 * a],
          f: m2,
          x: `O hexágono regular é formado por 6 triângulos equiláteros de lado ${a}: A = 6 × ${a * a} × 1,7/4 = ${num(v)} m².`,
        };
      },
      (r) => {
        const raio = r.int(2, 12);
        return {
          e: `Um quadrado está inscrito em uma circunferência de raio ${raio} cm. Qual é a área desse quadrado?`,
          r: 2 * raio * raio,
          d: [raio * raio, 4 * raio * raio, 3 * raio * raio, 2 * raio],
          f: (v) => `${num(v)} cm²`,
          x: `A diagonal do quadrado é o diâmetro: d = ${2 * raio}. Área = d²/2 = ${4 * raio * raio}/2 = ${2 * raio * raio} cm².`,
        };
      },
      (r) => {
        const a = r.int(2, 9), b = r.int(2, 9), k = r.pick([2, 3, 4]);
        return {
          e: `Três retas paralelas cortam duas transversais. Na primeira transversal, os segmentos determinados medem ${a} cm e ${b} cm. Na segunda, o segmento correspondente ao de ${a} cm mede ${a * k} cm. Quanto mede o outro segmento da segunda transversal?`,
          r: b * k,
          d: [b + a * k - a, (a * k * a) / b === b * k ? b * k + 1 : arred((a * k * a) / b, 2), b * k + k, a * b],
          f: cm,
          x: `Pelo Teorema de Tales: ${a}/${b} = ${a * k}/x ⇒ x = ${b} × ${a * k}/${a} = ${b * k} cm.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Geometria espacial
const L = (v) => `${num(v)} litros`;
const espacial = {
  disciplina: 'matematica',
  arquivo: '09-geometria-espacial',
  titulo: 'Geometria espacial',
  provas: PROVAS_TODAS,
  descricao: 'Volumes e áreas de prismas, cilindros, cones, pirâmides e esferas; relação de Euler.',
  niveis: [
    [
      (r) => {
        const a = r.pick([1, 1.5, 2, 2.5, 3]), b = r.pick([1, 1.2, 2]), c = r.pick([0.5, 1, 1.5, 2]);
        const v = a * b * c;
        return {
          e: `Uma caixa-d'água tem a forma de um paralelepípedo com dimensões internas ${num(a)} m × ${num(b)} m × ${num(c)} m. Qual é a sua capacidade em litros?`,
          r: v * 1000,
          d: [v * 100, v * 10000, (a + b + c) * 1000, v],
          f: L,
          x: `V = ${num(a)} × ${num(b)} × ${num(c)} = ${num(v)} m³. Como 1 m³ = 1.000 L, a capacidade é ${num(v * 1000)} L.`,
        };
      },
      (r) => {
        const a = r.int(2, 12);
        return {
          e: `Qual é o volume de um cubo de aresta ${a} cm?`,
          r: a ** 3,
          d: [a * a, 6 * a * a, 3 * a, 12 * a],
          f: (v) => `${num(v)} cm³`,
          x: `V = a³ = ${a}³ = ${a ** 3} cm³.`,
        };
      },
      (r) => {
        const raio = r.pick([10, 20, 30, 50]), h = r.pick([20, 40, 50, 100]);
        const v = (3 * raio * raio * h) / 1000;
        return {
          e: `Um reservatório cilíndrico tem raio da base de ${raio} cm e altura de ${h} cm. Qual é a sua capacidade? (Use π = 3 e 1 L = 1.000 cm³.)`,
          r: v,
          d: [v * 2, (3 * 2 * raio * h) / 1000, v / 3, v * 10],
          f: L,
          x: `V = π·r²·h = 3 × ${raio}² × ${h} = ${num(3 * raio * raio * h)} cm³ = ${num(v)} L.`,
        };
      },
      (r) => {
        const [V, A, F, nomeP] = r.pick([[8, 12, 6, 'cubo'], [6, 9, 5, 'prisma triangular'], [5, 8, 5, 'pirâmide de base quadrada'], [12, 18, 8, 'prisma hexagonal'], [4, 6, 4, 'tetraedro'], [6, 12, 8, 'octaedro'], [7, 12, 7, 'pirâmide hexagonal']]);
        const pede = r.pick(['V', 'A', 'F']);
        const resposta = pede === 'V' ? V : pede === 'A' ? A : F;
        const txt = { V: 'vértices', A: 'arestas', F: 'faces' };
        const dados = { V: `${V} vértices`, A: `${A} arestas`, F: `${F} faces` };
        const outros = ['V', 'A', 'F'].filter((k) => k !== pede).map((k) => dados[k]);
        return {
          e: `Um poliedro convexo (${nomeP}) tem ${outros[0]} e ${outros[1]}. Pela relação de Euler, quant${pede === 'V' ? 'os' : 'as'} ${txt[pede]} ele tem?`,
          r: resposta,
          d: [resposta + 2, resposta - 2, resposta + 1, resposta * 2],
          x: `Relação de Euler: V − A + F = 2. Substituindo os valores conhecidos, obtemos ${pede} = ${resposta}.`,
        };
      },
    ],
    [
      (r) => {
        const raio = r.int(2, 10), h = r.int(3, 15);
        return {
          e: `Qual é o volume de um cone com raio da base ${raio} cm e altura ${h} cm? (Use π = 3.)`,
          r: raio * raio * h,
          d: [3 * raio * raio * h, (raio * raio * h) / 3, 3 * raio * h, raio * h],
          f: (v) => `${num(v)} cm³`,
          x: `V = π·r²·h/3 = 3 × ${raio * raio} × ${h}/3 = ${raio * raio * h} cm³.`,
        };
      },
      (r) => {
        const raio = r.int(1, 10);
        return {
          e: `Qual é o volume de uma esfera de raio ${raio} cm? (Use π = 3.)`,
          r: 4 * raio ** 3,
          d: [3 * raio ** 3, 12 * raio * raio, 4 * raio * raio, (4 * raio ** 3) / 3],
          f: (v) => `${num(v)} cm³`,
          x: `V = (4/3)·π·r³ = (4/3) × 3 × ${raio ** 3} = ${4 * raio ** 3} cm³.`,
        };
      },
      (r) => {
        const a = r.pick([5, 6, 8, 10]), b = r.pick([3, 4, 5]), h = r.pick([1, 1.2, 1.5, 2]);
        const v = a * b * h * 1000, q = r.pick([20, 25, 40, 50]);
        const t = v / q;
        const f = (min) => {
          const hh = Math.floor(min / 60), mm = Math.round(min % 60);
          return hh ? `${hh} h${mm ? ` ${mm} min` : ''}` : `${mm} min`;
        };
        return {
          e: `Uma piscina retangular de ${a} m × ${b} m e ${num(h)} m de profundidade será enchida por uma mangueira com vazão de ${q} litros por minuto. Quanto tempo levará para enchê-la?`,
          r: t,
          d: [t / 2, t * 2, t / 60, t * 1.5],
          f,
          x: `Volume = ${a} × ${b} × ${num(h)} = ${num(a * b * h)} m³ = ${num(v)} L. Tempo = ${num(v)} ÷ ${q} = ${num(t)} min = ${f(t)}.`,
        };
      },
      (r) => {
        const a = r.int(5, 30), b = r.int(5, 20), c = r.int(2, 15);
        return {
          e: `Uma caixa de papelão fechada tem dimensões ${a} cm × ${b} cm × ${c} cm. Quantos cm² de papelão são necessários para fabricá-la, desconsiderando as abas?`,
          r: 2 * (a * b + a * c + b * c),
          d: [a * b * c, a * b + a * c + b * c, 4 * (a + b + c), 2 * a * b + a * c],
          f: (v) => `${num(v)} cm²`,
          x: `Área total = 2(ab + ac + bc) = 2(${a * b} + ${a * c} + ${b * c}) = ${2 * (a * b + a * c + b * c)} cm².`,
        };
      },
      (r) => {
        const [a, b, c, d] = r.pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [3, 4, 12, 13], [2, 10, 11, 15]]);
        return {
          e: `Qual é a medida da diagonal de um paralelepípedo retângulo de dimensões ${a} cm, ${b} cm e ${c} cm?`,
          r: d,
          d: [a + b + c, d + 1, Math.round(Math.sqrt(a * a + b * b)) + c, d - 1],
          f: cm,
          x: `D = √(a² + b² + c²) = √(${a * a} + ${b * b} + ${c * c}) = √${d * d} = ${d} cm.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.pick([40, 50, 60, 80]), b = r.pick([20, 25, 30, 40]), vol = r.pick([2, 3, 4, 6, 8]) * 1000;
        const hcm = vol / (a * b);
        if (!Number.isInteger(hcm * 100)) return espacial.niveis[2][0](r);
        return {
          e: `Um aquário com base retangular de ${a} cm × ${b} cm contém água. Ao mergulhar completamente uma pedra de ${num(vol / 1000)} litro(s), quanto o nível da água sobe?`,
          r: hcm,
          d: [hcm * 10, hcm / 2, vol / (a + b) / 10, hcm * 2],
          f: (v) => `${num(v)} cm`,
          x: `O volume deslocado (${num(vol)} cm³) ocupa a base ${a} × ${b} = ${a * b} cm². Subida = ${num(vol)} ÷ ${a * b} = ${num(hcm)} cm.`,
        };
      },
      (r) => {
        const k = r.pick([10, 20, 50, 100]), vm = r.pick([2, 3, 5, 8]);
        return {
          e: `Uma maquete de um reservatório foi construída na escala 1 : ${k}. Se a maquete comporta ${vm} litros, quantos litros o reservatório real comporta?`,
          r: vm * k ** 3,
          d: [vm * k, vm * k * k, vm * k ** 3 / 10, vm * 3 * k],
          f: L,
          x: `Volumes variam com o cubo da escala: ${vm} × ${k}³ = ${vm} × ${num(k ** 3)} = ${num(vm * k ** 3)} L.`,
        };
      },
      (r) => {
        const hc = r.pick([10, 12, 15, 20]), hcil = r.pick([20, 30, 40, 60]);
        const n = (3 * hcil) / hc;
        if (!Number.isInteger(n)) return espacial.niveis[2][2](r);
        return {
          e: `Um copo cônico e um balde cilíndrico têm bases de mesmo raio. O cone tem ${hc} cm de altura e o cilindro, ${hcil} cm. Quantos copos cheios são necessários para encher o balde?`,
          r: n,
          d: [hcil / hc, n * 2, n + 3, 3],
          x: `V_cilindro = πr²·${hcil} e V_cone = πr²·${hc}/3. Razão: ${hcil}/(${hc}/3) = ${n}.`,
        };
      },
      (r) => {
        const R = r.pick([6, 8, 9, 10, 12, 15]), rr = r.pick([1, 2, 3, 5]);
        if (R % rr || R === rr) return espacial.niveis[2][3](r);
        const n = (R / rr) ** 3;
        return {
          e: `Uma esfera de chocolate maciça, de raio ${R} cm, será derretida para fazer bombons esféricos de raio ${rr} cm. Quantos bombons podem ser feitos, sem desperdício?`,
          r: n,
          d: [R / rr, (R / rr) ** 2, n / 2, 4 * (R / rr)],
          x: `A razão entre volumes é (R/r)³ = (${R}/${rr})³ = ${n}.`,
        };
      },
      (r) => {
        const l = r.pick([3, 6, 9, 12]), h = r.pick([4, 5, 8, 10]);
        return {
          e: `Uma pirâmide de base quadrada tem aresta da base ${l} m e altura ${h} m. Qual é o seu volume?`,
          r: (l * l * h) / 3,
          d: [l * l * h, (l * l * h) / 2, (4 * l * h) / 3, (l * h) / 3],
          f: (v) => `${num(v)} m³`,
          x: `V = (área da base × altura)/3 = ${l * l} × ${h}/3 = ${num((l * l * h) / 3)} m³.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Trigonometria
const TRIG = {
  sen: { 30: '1/2', 45: '√2/2', 60: '√3/2' },
  cos: { 30: '√3/2', 45: '√2/2', 60: '1/2' },
  tg: { 30: '√3/3', 45: '1', 60: '√3' },
};
const trigonometria = {
  disciplina: 'matematica',
  arquivo: '10-trigonometria',
  titulo: 'Trigonometria',
  provas: PROVAS_TODAS,
  descricao: 'Razões trigonométricas, ângulos notáveis, leis dos senos e cossenos, ciclo trigonométrico e funções periódicas.',
  niveis: [
    [
      (r) => {
        const f = r.pick(['sen', 'cos', 'tg']), ang = r.pick([30, 45, 60]);
        const certo = TRIG[f][ang];
        const todos = ['1/2', '√2/2', '√3/2', '√3/3', '1', '√3', '2', '0'];
        return {
          e: `Qual é o valor de ${f} ${ang}°?`,
          r: certo,
          d: r.shuffle(todos.filter((v) => v !== certo)),
          x: `Tabela dos ângulos notáveis: sen 30° = 1/2, sen 45° = √2/2, sen 60° = √3/2; cos é o inverso dessa ordem; tg = sen/cos. Logo ${f} ${ang}° = ${certo}.`,
        };
      },
      (r) => {
        const h = r.int(2, 30) * 2;
        return {
          e: `Em um triângulo retângulo, a hipotenusa mede ${h} cm e um dos ângulos agudos mede 30°. Quanto mede o cateto oposto a esse ângulo?`,
          r: h / 2,
          d: [h * 2, h, h / 3, h / 4],
          f: cm,
          x: `sen 30° = cateto oposto/hipotenusa ⇒ 1/2 = x/${h} ⇒ x = ${h / 2} cm.`,
        };
      },
      (r) => {
        const [g, rad] = r.pick([[30, 'π/6'], [45, 'π/4'], [60, 'π/3'], [90, 'π/2'], [120, '2π/3'], [135, '3π/4'], [150, '5π/6'], [180, 'π'], [210, '7π/6'], [270, '3π/2'], [300, '5π/3'], [360, '2π']]);
        const todos = ['π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '3π/2', '5π/3', '2π'];
        return {
          e: `Quanto vale ${g}° em radianos?`,
          r: rad,
          d: r.shuffle(todos.filter((v) => v !== rad)),
          x: `180° = π rad. Então ${g}° = ${g}/180 · π = ${rad} rad.`,
        };
      },
      (r) => {
        const comp = r.int(2, 20) * 2;
        return {
          e: `Uma rampa reta de ${comp} m de comprimento forma um ângulo de 30° com o chão. Qual é a altura que ela atinge?`,
          r: comp / 2,
          d: [comp, comp / 4, comp * 2, comp / 3],
          f: m,
          x: `A rampa é a hipotenusa: altura = ${comp} × sen 30° = ${comp} × 1/2 = ${comp / 2} m.`,
        };
      },
      (r) => {
        const quad = r.pick([[150, 'positivo', 'sen'], [120, 'negativo', 'cos'], [210, 'negativo', 'sen'], [300, 'positivo', 'cos'], [240, 'positivo', 'tg'], [330, 'negativo', 'tg'], [100, 'negativo', 'cos'], [200, 'negativo', 'sen']]);
        const [a, sinal, f] = quad;
        const q = a < 90 ? 1 : a < 180 ? 2 : a < 270 ? 3 : 4;
        return {
          e: `O ângulo de ${a}° está em qual quadrante, e qual é o sinal de ${f} ${a}°?`,
          r: `${q}º quadrante; ${sinal}`,
          d: [`${q}º quadrante; ${sinal === 'positivo' ? 'negativo' : 'positivo'}`, `${(q % 4) + 1}º quadrante; ${sinal}`, `${((q + 2) % 4) + 1}º quadrante; ${sinal === 'positivo' ? 'negativo' : 'positivo'}`, `${((q + 1) % 4) + 1}º quadrante; ${sinal}`],
          x: `${a}° está entre ${(q - 1) * 90}° e ${q * 90}°: ${q}º quadrante. Nele, ${q === 1 ? 'todas são positivas' : q === 2 ? 'só o seno é positivo' : q === 3 ? 'só a tangente é positiva' : 'só o cosseno é positivo'}; logo ${f} ${a}° é ${sinal}.`,
        };
      },
    ],
    [
      (r) => {
        const d = r.int(5, 40) * 2;
        return {
          e: `Uma pessoa está a ${d} m da base de um prédio e vê o topo sob um ângulo de 60° com a horizontal. Desprezando a altura da pessoa, qual é a altura aproximada do prédio? (Use √3 = 1,73.)`,
          r: arred(d * 1.73, 2),
          d: [arred(d / 1.73, 2), d * 2, arred((d * 1.73) / 2, 2), arred(d * 1.41, 2)],
          f: m,
          x: `tg 60° = h/${d} ⇒ h = ${d} × √3 ≈ ${d} × 1,73 = ${num(d * 1.73)} m.`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick([[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19], [3, 5, 7]]);
        const ang = a === 3 && b === 5 ? 120 : 60;
        return {
          e: `Em um triângulo, dois lados medem ${a} cm e ${b} cm e formam entre si um ângulo de ${ang}°. Quanto mede o terceiro lado?`,
          r: c,
          d: [a + b - 1 === c ? c + 2 : a + b - 1, Math.round(Math.sqrt(a * a + b * b)) === c ? c - 1 : Math.round(Math.sqrt(a * a + b * b)), c + 1, Math.abs(b - a) + 1],
          f: cm,
          x: `Lei dos cossenos: x² = ${a}² + ${b}² − 2·${a}·${b}·cos ${ang}° = ${a * a + b * b} ${ang === 60 ? '−' : '+'} ${a * b} = ${c * c} ⇒ x = ${c} cm.`,
        };
      },
      (r) => {
        const k = r.pick([2, 3, 4, 6, 8]), f = r.pick(['sen', 'cos']);
        const per = fracao(2, k);
        const fmt = (s) => (s === '1' ? 'π' : s.includes('/') ? s.replace(/^(\d+)\//, (_, n) => (n === '1' ? 'π/' : `${n}π/`)) : `${s}π`);
        return {
          e: `Qual é o período da função f(x) = ${f}(${k}x)?`,
          r: fmt(per),
          d: [fmt(fracao(1, k)), `${2 * k}π`, `${k}π`, fmt(fracao(4, k)), '2π'].filter((v) => v !== fmt(per)),
          x: `O período de ${f}(kx) é 2π/|k| = 2π/${k} = ${fmt(per)}.`,
        };
      },
      (r) => {
        const a = r.int(-3, 6), b = r.int(1, 5), f = r.pick(['sen', 'cos']), pede = r.pick(['máximo', 'mínimo']);
        const v = pede === 'máximo' ? a + b : a - b;
        return {
          e: `Qual é o valor ${pede} da função f(x) = ${a} ${b >= 0 ? '+' : '−'} ${b}·${f}(x)?`,
          r: v,
          d: [pede === 'máximo' ? a - b : a + b, a, b, a * b === v ? v + 2 : a * b],
          x: `Como −1 ≤ ${f}(x) ≤ 1, f varia de ${a - b} a ${a + b}. O valor ${pede} é ${v}.`,
        };
      },
      (r) => {
        const raio = r.pick([5, 10, 20, 30]), ang = r.pick([30, 45, 60, 90, 120, 150]);
        const comp = (2 * 3.14 * raio * ang) / 360;
        return {
          e: `Qual é o comprimento de um arco de ${ang}° em uma circunferência de raio ${raio} cm? (Use π = 3,14.)`,
          r: arred(comp, 2),
          d: [arred(comp * 2, 2), arred((3.14 * raio * raio * ang) / 360, 2), arred(comp / 2, 2), arred((raio * ang) / 60, 2) === arred(comp, 2) ? arred(comp + 1, 2) : arred((raio * ang) / 60, 2)],
          f: cm,
          x: `Comprimento = (${ang}/360) × 2πr = (${ang}/360) × 2 × 3,14 × ${raio} ≈ ${num(comp)} cm.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.pick([2, 3, 4, 5]), b = r.pick([1, 1.5, 2]);
        const pede = r.pick(['máxima', 'mínima']);
        const v = pede === 'máxima' ? a + b : a - b;
        const t = pede === 'máxima' ? 0 : 6;
        return {
          e: `A altura da maré em um porto, em metros, é modelada por h(t) = ${num(a)} + ${num(b)}·cos(πt/6), em que t é o tempo em horas após a meia-noite (0 ≤ t ≤ 12). Qual é a altura ${pede} da maré e em que horário ela ocorre?`,
          r: `${m(v)}, às ${t}h`,
          d: [`${m(v)}, às ${t === 0 ? 6 : 0}h`, `${m(pede === 'máxima' ? a - b : a + b)}, às ${t}h`, `${m(a)}, às 3h`, `${m(v)}, às 12h${t === 0 ? ' apenas' : ''}`],
          x: `cos(πt/6) vale ${pede === 'máxima' ? '1 em t = 0 (e t = 12)' : '−1 em t = 6'}. Assim, h = ${num(a)} ${pede === 'máxima' ? '+' : '−'} ${num(b)} = ${num(v)} m.`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]);
        return {
          e: `Sabendo que sen x = ${a}/${c} e que x é um ângulo do 1º quadrante, qual é o valor de sen(2x)?`,
          r: fracao(2 * a * b, c * c),
          d: [fracao(2 * a, c), fracao(a * b, c * c), fracao(b * b - a * a, c * c), fracao(2 * b, c)],
          x: `cos x = √(1 − sen²x) = ${b}/${c}. sen(2x) = 2·sen x·cos x = 2 · ${a}/${c} · ${b}/${c} = ${fracao(2 * a * b, c * c)}.`,
        };
      },
      (r) => {
        const [exp, val, como] = r.pick([
          ['sen 75°', '(√6 + √2)/4', 'sen(45° + 30°) = sen45·cos30 + sen30·cos45'],
          ['cos 75°', '(√6 − √2)/4', 'cos(45° + 30°) = cos45·cos30 − sen45·sen30'],
          ['sen 15°', '(√6 − √2)/4', 'sen(45° − 30°) = sen45·cos30 − sen30·cos45'],
          ['cos 15°', '(√6 + √2)/4', 'cos(45° − 30°) = cos45·cos30 + sen45·sen30'],
          ['tg 15°', '2 − √3', 'tg(45° − 30°) = (1 − √3/3)/(1 + √3/3)'],
          ['tg 75°', '2 + √3', 'tg(45° + 30°) = (1 + √3/3)/(1 − √3/3)'],
        ]);
        const todos = ['(√6 + √2)/4', '(√6 − √2)/4', '2 − √3', '2 + √3', '(√3 + 1)/2', '(√2 + 1)/4'];
        return {
          e: `Qual é o valor exato de ${exp}?`,
          r: val,
          d: todos.filter((v) => v !== val),
          x: `Usando a fórmula da soma/diferença de arcos: ${como} = ${val}.`,
        };
      },
      (r) => {
        const n = r.int(1, 5);
        const [eq, porVolta, sols] = r.pick([
          ['sen x = 1/2', 2, 'π/6 e 5π/6'],
          ['cos x = 1/2', 2, 'π/3 e 5π/3'],
          ['sen x = 1', 1, 'π/2'],
          ['cos x = 0', 2, 'π/2 e 3π/2'],
          ['sen x = −√2/2', 2, '5π/4 e 7π/4'],
          ['cos x = −1', 1, 'π'],
          ['tg x = 1', 2, 'π/4 e 5π/4'],
        ]);
        const sol = porVolta * n;
        return {
          e: `Quantas soluções a equação ${eq} possui no intervalo 0 ≤ x ≤ ${n === 1 ? '' : 2 * n}${n === 1 ? '2' : ''}π?`,
          r: sol,
          d: [sol + 1, sol * 2, sol - 1 > 0 ? sol - 1 : sol + 2, n + 1, 4 * n],
          x: `Em cada volta [0, 2π] há ${porVolta} solução(ões): ${sols}. Em ${n} volta(s), ${sol} soluções (os extremos 0 e ${n === 1 ? '2' : 2 * n}π não são soluções).`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick([[6, 30, 'A'], [10, 30, 'A'], [8, 45, 'A'], [12, 60, 'A']]);
        void c;
        // lei dos senos: a / sen A = 2R
        const sen = { 30: 0.5, 45: Math.SQRT2 / 2, 60: Math.sqrt(3) / 2 }[b];
        const R = a / (2 * sen);
        const fmt = (v) => {
          if (b === 30) return `${num(v)} cm`;
          if (b === 45) return `${num(v / Math.SQRT2)}√2 cm`;
          return `${num(v / Math.sqrt(3) * 3 / 3)}`;
        };
        if (b === 60) {
          // R = a/√3 = a√3/3
          const k = a / 3;
          return {
            e: `Em um triângulo, o lado oposto a um ângulo de 60° mede ${a} cm. Qual é o raio da circunferência circunscrita a esse triângulo?`,
            r: `${num(k)}√3 cm`,
            d: [`${num(a / 2)}√3 cm`, `${num(a)} cm`, `${num(k * 2)}√3 cm`, `${num(a / 2)} cm`],
            x: `Lei dos senos: a/sen A = 2R ⇒ 2R = ${a}/(√3/2) ⇒ R = ${a}/√3 = ${num(k)}√3 cm.`,
          };
        }
        return {
          e: `Em um triângulo, o lado oposto a um ângulo de ${b}° mede ${a} cm. Qual é o raio da circunferência circunscrita a esse triângulo?`,
          r: fmt(R),
          d: b === 30 ? [`${num(a / 2)} cm`, `${num(2 * a)} cm`, `${num(a)}√2 cm`, `${num(a / 2)}√3 cm`] : [`${num(a)}√2 cm`, `${num(a / 2)} cm`, `${num(a)} cm`, `${num(a / 4)}√2 cm`],
          x: `Lei dos senos: a/sen A = 2R ⇒ 2R = ${a}/sen ${b}° ⇒ R = ${fmt(R)}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Estatística
const lista = (v) => v.join(', ');
const media = (v) => v.reduce((a, b) => a + b, 0) / v.length;
const mediana = (v) => {
  const s = [...v].sort((a, b) => a - b);
  const k = s.length;
  return k % 2 ? s[(k - 1) / 2] : (s[k / 2 - 1] + s[k / 2]) / 2;
};
const estatistica = {
  disciplina: 'matematica',
  arquivo: '11-estatistica',
  titulo: 'Estatística',
  provas: PROVAS_TODAS,
  descricao: 'Média, mediana, moda, média ponderada, amplitude, variância e desvio padrão; leitura de dados.',
  niveis: [
    [
      (r) => {
        const n = r.int(4, 7);
        let v = Array.from({ length: n }, () => r.int(2, 10));
        const s = v.reduce((a, b) => a + b, 0);
        const ajuste = (n - (s % n)) % n;
        v[0] += ajuste;
        return {
          e: `As notas de um aluno em ${n} provas foram ${lista(v)}. Qual é a média aritmética dessas notas?`,
          r: media(v),
          d: [mediana(v), media(v) + 1, Math.max(...v) - Math.min(...v), v.reduce((a, b) => a + b, 0) / (n - 1)],
          x: `Soma = ${v.reduce((a, b) => a + b, 0)}; média = ${v.reduce((a, b) => a + b, 0)} ÷ ${n} = ${num(media(v))}.`,
        };
      },
      (r) => {
        const v = r.shuffle(Array.from({ length: r.pick([5, 7, 9]) }, () => r.int(10, 60)));
        return {
          e: `Qual é a mediana do conjunto de dados: ${lista(v)}?`,
          r: mediana(v),
          d: [v[Math.floor(v.length / 2)] === mediana(v) ? arred(media(v), 2) : v[Math.floor(v.length / 2)], arred(media(v), 2), Math.max(...v), Math.min(...v)],
          x: `Ordenando: ${lista([...v].sort((a, b) => a - b))}. O termo central é ${mediana(v)}.`,
        };
      },
      (r) => {
        const moda = r.int(30, 45);
        const v = r.shuffle([moda, moda, moda, ...Array.from({ length: 5 }, (_, i) => moda - 6 + i * 3 + (i >= 2 ? 1 : 0))]);
        return {
          e: `Os números de calçado vendidos em uma loja pela manhã foram: ${lista(v)}. Qual é a moda?`,
          r: moda,
          d: [mediana(v) === moda ? moda + 1 : mediana(v), Math.max(...v), Math.min(...v), arred(media(v), 1) === moda ? moda - 1 : arred(media(v), 1)],
          x: `Moda é o valor que mais se repete: ${moda} aparece ${v.filter((x) => x === moda).length} vezes.`,
        };
      },
      (r) => {
        const notas = [r.int(4, 10), r.int(4, 10), r.int(4, 10)];
        const pesos = r.pick([[1, 2, 3], [2, 3, 5], [1, 1, 2], [3, 3, 4]]);
        const sp = pesos.reduce((a, b) => a + b, 0);
        const mp = notas.reduce((s, n, i) => s + n * pesos[i], 0) / sp;
        return {
          e: `Em um concurso, as provas têm pesos ${pesos.join(', ')}. Um candidato tirou ${notas.join(', ')}, respectivamente. Qual é sua média ponderada?`,
          r: arred(mp, 2),
          d: [arred(media(notas), 2), arred(mp + 0.5, 2), arred(notas.reduce((s, n, i) => s + n * pesos[i], 0) / 3, 2), arred(mp - 1, 2)],
          x: `Média ponderada = (${notas.map((n, i) => `${n}·${pesos[i]}`).join(' + ')})/${sp} = ${notas.reduce((s, n, i) => s + n * pesos[i], 0)}/${sp} ≈ ${num(mp)}.`,
        };
      },
    ],
    [
      (r) => {
        const v = r.shuffle(Array.from({ length: r.pick([6, 8, 10]) }, () => r.int(10, 80)));
        const md = mediana(v);
        const s = [...v].sort((a, b) => a - b);
        return {
          e: `Qual é a mediana do conjunto de dados: ${lista(v)}?`,
          r: md,
          d: [s[s.length / 2], s[s.length / 2 - 1], arred(media(v), 2), (v[v.length / 2 - 1] + v[v.length / 2]) / 2],
          x: `Ordenando: ${lista(s)}. Com quantidade par, a mediana é a média dos dois centrais: (${s[s.length / 2 - 1]} + ${s[s.length / 2]})/2 = ${num(md)}.`,
        };
      },
      (r) => {
        const n = r.pick([3, 4]), alvo = r.pick([6, 7, 7.5, 8]);
        const notas = Array.from({ length: n }, () => r.int(5, 9));
        const falta = alvo * (n + 1) - notas.reduce((a, b) => a + b, 0);
        if (falta < 3 || falta > 10) return estatistica.niveis[1][1](r);
        return {
          e: `Para ser aprovado, um aluno precisa de média ${num(alvo)} em ${n + 1} provas de mesmo peso. Nas ${n} primeiras, tirou ${notas.join(', ')}. Que nota mínima ele precisa na última prova?`,
          r: falta,
          d: [alvo, arred(alvo * n - notas.reduce((a, b) => a + b, 0) + alvo / 2, 2), falta + 1, arred(falta / 2, 2)],
          x: `Soma necessária: ${num(alvo)} × ${n + 1} = ${num(alvo * (n + 1))}. Já tem ${notas.reduce((a, b) => a + b, 0)}. Falta ${num(falta)}.`,
        };
      },
      (r) => {
        const v = Array.from({ length: 8 }, () => r.int(12, 40));
        return {
          e: `As temperaturas máximas (°C) de uma cidade em 8 dias foram ${lista(v)}. Qual foi a amplitude térmica desse período?`,
          r: Math.max(...v) - Math.min(...v),
          d: [Math.max(...v), arred(media(v), 1), Math.max(...v) + Math.min(...v), mediana(v)],
          f: (x) => `${num(x)} °C`,
          x: `Amplitude = maior − menor = ${Math.max(...v)} − ${Math.min(...v)} = ${Math.max(...v) - Math.min(...v)} °C.`,
        };
      },
      (r) => {
        const n = r.pick([5, 8, 10, 20]), mI = r.int(20, 60), x = r.int(5, 100);
        const nova = (n * mI - x) / (n - 1);
        if (!Number.isInteger(nova * 100)) return estatistica.niveis[1][3](r);
        return {
          e: `A média das idades de ${n} pessoas de um grupo é ${mI} anos. Uma pessoa de ${x} anos sai do grupo. Qual passa a ser a média das idades?`,
          r: arred(nova, 2),
          d: [mI, arred((n * mI - x) / n, 2), arred(mI - x / n, 2) === arred(nova, 2) ? mI + 1 : arred(mI - x / n, 2), arred(nova + 2, 2)],
          f: (v) => `${num(v)} anos`,
          x: `Soma inicial: ${n} × ${mI} = ${n * mI}. Sem a pessoa: ${n * mI - x}, dividido por ${n - 1} = ${num(nova)} anos.`,
        };
      },
      (r) => {
        const vals = [0, 1, 2, 3, 4];
        const freq = vals.map(() => r.int(1, 8));
        const tot = freq.reduce((a, b) => a + b, 0);
        const soma = vals.reduce((s, v, i) => s + v * freq[i], 0);
        return {
          e: `Em uma pesquisa, perguntou-se a quantidade de filhos de cada família. Resultados: 0 filhos: ${freq[0]} famílias; 1 filho: ${freq[1]}; 2 filhos: ${freq[2]}; 3 filhos: ${freq[3]}; 4 filhos: ${freq[4]}. Qual é a média de filhos por família?`,
          r: arred(soma / tot, 2),
          d: [2, arred(soma / 5, 2), arred(tot / 5, 2), arred(soma / tot + 0.5, 2)],
          x: `Média = (0·${freq[0]} + 1·${freq[1]} + 2·${freq[2]} + 3·${freq[3]} + 4·${freq[4]})/${tot} = ${soma}/${tot} ≈ ${num(soma / tot)}.`,
        };
      },
    ],
    [
      (r) => {
        const mu = r.int(5, 20), ds = r.pick([[1, 1, 3, 3], [2, 2, 4, 4], [1, 3, 5, 7], [2, 2, 2, 6]]);
        const v = r.shuffle([mu - ds[0], mu + ds[0], mu - ds[1], mu + ds[1], mu - ds[2], mu + ds[2], mu - ds[3], mu + ds[3]]);
        const variancia = v.reduce((s, x) => s + (x - mu) ** 2, 0) / v.length;
        return {
          e: `Qual é a variância (populacional) do conjunto ${lista(v)}?`,
          r: arred(variancia, 2),
          d: [arred(Math.sqrt(variancia), 2), arred((variancia * v.length) / (v.length - 1), 2), mu, arred(variancia * 2, 2)],
          x: `Média = ${mu}. Variância = média dos quadrados dos desvios = ${v.reduce((s, x) => s + (x - mu) ** 2, 0)}/${v.length} = ${num(variancia)}.`,
        };
      },
      (r) => {
        const n1 = r.pick([10, 20, 30, 40]), m1 = r.int(5, 9), n2 = r.pick([10, 15, 20, 30]), m2v = r.int(4, 9);
        if (m1 === m2v) return estatistica.niveis[2][1](r);
        const mg = (n1 * m1 + n2 * m2v) / (n1 + n2);
        return {
          e: `A turma A, com ${n1} alunos, teve média ${m1} em uma prova; a turma B, com ${n2} alunos, teve média ${m2v}. Qual é a média geral dos ${n1 + n2} alunos?`,
          r: arred(mg, 2),
          d: [arred((m1 + m2v) / 2, 2), arred(mg + 0.5, 2), arred((n1 * m2v + n2 * m1) / (n1 + n2), 2), Math.max(m1, m2v)],
          x: `Média geral = (${n1}·${m1} + ${n2}·${m2v})/${n1 + n2} = ${n1 * m1 + n2 * m2v}/${n1 + n2} ≈ ${num(mg)} (média ponderada pelo número de alunos).`,
        };
      },
      (r) => {
        const vals = [1, 2, 3, 4, 5];
        const freq = vals.map(() => r.int(2, 9));
        const tot = freq.reduce((a, b) => a + b, 0);
        const ordenado = vals.flatMap((v, i) => Array(freq[i]).fill(v));
        const md = mediana(ordenado);
        return {
          e: `Em uma avaliação de 1 a 5 estrelas, um aplicativo recebeu: 1★: ${freq[0]}; 2★: ${freq[1]}; 3★: ${freq[2]}; 4★: ${freq[3]}; 5★: ${freq[4]} avaliações. Qual é a mediana das notas?`,
          r: md,
          d: [3, arred(media(ordenado), 2), vals[freq.indexOf(Math.max(...freq))], md + 1, md - 0.5],
          x: `São ${tot} avaliações. A mediana é ${tot % 2 ? `o ${(tot + 1) / 2}º valor` : `a média do ${tot / 2}º e do ${tot / 2 + 1}º valores`} na lista ordenada (acumulando as frequências), que resulta em ${num(md)}.`,
        };
      },
      (r) => {
        const mu = r.pick([20, 40, 50, 80]), dp = r.pick([2, 4, 5, 8, 10]);
        return {
          e: `Um conjunto de dados tem média ${mu} e desvio padrão ${dp}. Qual é o coeficiente de variação (CV)?`,
          r: arred((dp / mu) * 100, 2),
          d: [arred((mu / dp), 2), arred((dp * dp / mu) * 100, 2), dp, arred((dp / mu) * 10, 2)],
          f: (v) => `${num(v)}%`,
          x: `CV = desvio padrão/média = ${dp}/${mu} = ${num(dp / mu, 3)} = ${num((dp / mu) * 100)}%.`,
        };
      },
      (r) => {
        const v = Array.from({ length: 6 }, () => r.int(2, 9));
        const k = r.pick([2, 3, 10]), c = r.int(1, 5);
        v[0] += (6 - (v.reduce((a, b) => a + b, 0) % 6)) % 6;
        const mu = media(v);
        return {
          e: `Um conjunto de dados tem média ${num(mu)}. Se cada valor for multiplicado por ${k} e, em seguida, somado a ${c}, qual será a nova média?`,
          r: arred(mu * k + c, 2),
          d: [arred(mu * k, 2), arred(mu + c, 2), arred((mu + c) * k, 2), arred(mu * k + c * k + 1, 2)],
          x: `A média acompanha as operações: nova média = ${k} × ${num(mu)} + ${c} = ${num(mu * k + c)}.`,
        };
      },
    ],
  ],
};

void mdc; void sinalN;
export default [progressoes, plana, espacial, trigonometria, estatistica];
