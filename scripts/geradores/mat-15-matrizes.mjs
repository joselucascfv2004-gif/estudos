// Matemática — Matrizes, determinantes e sistemas.
import { expl, fracao, num } from './util.mjs';
import NOVOS from './mat-novos-extras.mjs';
import { novos } from './util.mjs';

const mat2 = (m) => `[${m[0][0]} ${m[0][1]}; ${m[1][0]} ${m[1][1]}]`;
const det2 = (m) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
const det3 = (m) =>
  m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
const mat3 = (m) => `[${m.map((l) => l.join(' ')).join('; ')}]`;
const rm = (r, a, b, n = 2) => Array.from({ length: n }, () => Array.from({ length: n }, () => r.int(a, b)));
const NOTA = '(Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)';
const P = (v) => (v < 0 ? `(${v})` : `${v}`);
const IDX = '₀₁₂₃₄';

const facil = [
  // 1. det 2×2
  (r) => {
    const m = rm(r, -5, 9);
    return {
      e: `Qual é o determinante da matriz A = ${mat2(m)}? ${NOTA}`,
      r: det2(m),
      d: [m[0][0] * m[1][1] + m[0][1] * m[1][0], -det2(m) || 5, m[0][0] + m[1][1], det2(m) + 1],
      x: expl('determinante 2×2', 'Produto da diagonal principal menos o produto da diagonal secundária.', `${P(m[0][0])}·${P(m[1][1])} − ${P(m[0][1])}·${P(m[1][0])} = ${det2(m)}.`),
    };
  },
  // 2. lei de formação
  (r) => {
    const [i, j] = [r.int(1, 3), r.int(1, 3)];
    const [a, b, c] = [r.int(1, 4), r.int(-3, 3) || 1, r.int(-2, 5)];
    return {
      e: `A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = ${a}i ${b >= 0 ? '+' : '−'} ${Math.abs(b)}j ${c >= 0 ? '+' : '−'} ${Math.abs(c)}. Qual é o valor de a${IDX[i]}${IDX[j]}?`,
      r: a * i + b * j + c,
      d: [a * j + b * i + c, a * i + b * j - c, a * i * b * j + c, a + b + c],
      x: expl('lei de formação', 'i é a linha e j é a coluna do elemento. Substitua na fórmula.', `i = ${i}, j = ${j}: ${a}·${i} ${b >= 0 ? '+' : '−'} ${Math.abs(b)}·${j} ${c >= 0 ? '+' : '−'} ${Math.abs(c)} = ${a * i + b * j + c}.`),
    };
  },
  // 3. kA − B
  (r) => {
    const A = rm(r, -5, 9), B = rm(r, -5, 9), k = r.int(2, 3);
    const i = r.int(0, 1), j = r.int(0, 1);
    return {
      e: `Sendo A = ${mat2(A)} e B = ${mat2(B)}, qual é o elemento da linha ${i + 1} e coluna ${j + 1} da matriz ${k}A − B? ${NOTA}`,
      r: k * A[i][j] - B[i][j],
      d: [k * A[i][j] + B[i][j], A[i][j] - B[i][j], k * (A[i][j] - B[i][j]), k * A[i][j] - B[i][j] + 2],
      x: expl('operações elemento a elemento', 'Multiplicar por número e subtrair matrizes se faz posição por posição.', `${k}·${P(A[i][j])} − ${P(B[i][j])} = ${k * A[i][j] - B[i][j]}.`),
    };
  },
  // 4. transposta
  (r) => {
    const m = rm(r, 1, 9, 3), i = r.int(0, 2), j = r.int(0, 2);
    if (i === j || m[i][j] === m[j][i]) return facil[3](r);
    return {
      e: `Dada A = ${mat3(m)}, qual é o elemento da linha ${i + 1}, coluna ${j + 1} da transposta Aᵗ? ${NOTA}`,
      r: m[j][i],
      d: [m[i][j], m[i][i], m[j][j], m[i][j] + m[j][i]],
      x: expl('transposta', 'Na transposta, a linha vira coluna: o elemento (i, j) de Aᵗ é o (j, i) de A.', `(Aᵗ)${i + 1}${j + 1} = A${j + 1}${i + 1} = ${m[j][i]}.`),
    };
  },
  // 5. ordem do produto
  (r) => {
    const [m, n, p] = [r.int(1, 4), r.int(2, 5), r.int(1, 5)];
    return {
      e: `A matriz A tem ordem ${m}×${n} e a matriz B tem ordem ${n}×${p}. Qual é a ordem da matriz A·B?`,
      r: `${m}×${p}`,
      d: [`${n}×${n}`, `${p}×${m}`, `${m}×${n}`, `${n}×${p}`, 'o produto não existe'].filter((x) => x !== `${m}×${p}`),
      x: expl('condição do produto', 'A·B existe se o número de colunas de A é igual ao número de linhas de B. O resultado fica com as linhas de A e as colunas de B.', `(${m}×${n})·(${n}×${p}) = ${m}×${p}.`),
    };
  },
  // 6. interpretar elemento
  (r) => {
    const i = r.int(1, 3), j = r.int(1, 4);
    return {
      e: `Uma rede de padarias organiza suas vendas em uma matriz V, em que o elemento vᵢⱼ é a quantidade de pães vendidos pela loja i no dia j da semana. O que representa o elemento v${IDX[i]}${IDX[j]}?`,
      r: `A quantidade vendida pela loja ${i} no dia ${j}`,
      d: [`A quantidade vendida pela loja ${j} no dia ${i}`, `O total vendido pela loja ${i} na semana`, `O total vendido no dia ${j} por todas as lojas`, `A quantidade vendida pela loja ${i + j} em um dia`],
      x: expl('índices da matriz', 'O primeiro índice é a linha (aqui, a loja) e o segundo é a coluna (o dia).', `v${IDX[i]}${IDX[j]}: linha ${i} (loja), coluna ${j} (dia).`),
    };
  },
  // 7. igualdade de matrizes
  (r) => {
    const x = r.int(-4, 8), y = r.int(-4, 8), a = r.int(1, 5), b = r.int(1, 6), c = r.int(-3, 9), d = r.int(-3, 9);
    return {
      e: `Se as matrizes [x + ${a} ${c}; ${d} y − ${b}] e [${x + a} ${c}; ${d} ${y - b}] são iguais, qual é o valor de x + y? ${NOTA}`,
      r: x + y,
      d: [x + a + y - b, x - y, x * y === x + y ? x + y + 2 : x * y, x + y + a],
      x: expl('igualdade de matrizes', 'Matrizes iguais têm todos os elementos correspondentes iguais.', `x + ${a} = ${x + a} ⇒ x = ${x}; y − ${b} = ${y - b} ⇒ y = ${y}; x + y = ${x + y}.`),
    };
  },
  // 8. traço
  (r) => {
    const m = rm(r, -6, 9, 3);
    const tr = m[0][0] + m[1][1] + m[2][2];
    return {
      e: `O traço de uma matriz quadrada é a soma dos elementos da diagonal principal. Qual é o traço de ${mat3(m)}? ${NOTA}`,
      r: tr,
      d: [m[0][2] + m[1][1] + m[2][0], m.flat().reduce((s, v) => s + v, 0), m[0][0] * m[1][1] * m[2][2], tr + 1],
      x: expl('diagonal principal', 'São os elementos em que linha = coluna: a₁₁, a₂₂, a₃₃.', `${m[0][0]} + ${P(m[1][1])} + ${P(m[2][2])} = ${tr}.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[2].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. det 3×3
  (r) => {
    const m = rm(r, -3, 4, 3);
    const d = det3(m);
    return {
      e: `Qual é o determinante da matriz ${mat3(m)}? ${NOTA}`,
      r: d,
      d: [-d === d ? d + 3 : -d, d + 2, d - 4, m[0][0] * m[1][1] * m[2][2]],
      x: expl('regra de Sarrus', 'Repita as duas primeiras colunas à direita; some os produtos das 3 diagonais descendentes e subtraia os das 3 ascendentes.', `Resultado: det = ${d}.`),
    };
  },
  // 2. elemento do produto
  (r) => {
    const A = rm(r, -3, 5), B = rm(r, -3, 5), i = r.int(0, 1), j = r.int(0, 1);
    const c = A[i][0] * B[0][j] + A[i][1] * B[1][j];
    return {
      e: `Sendo A = ${mat2(A)} e B = ${mat2(B)}, qual é o elemento c${IDX[i + 1]}${IDX[j + 1]} da matriz C = A·B? ${NOTA}`,
      r: c,
      d: [A[i][j] * B[i][j], c + 3, c - 2, A[i][0] * B[j][0] + A[i][1] * B[j][1] === c ? c + 5 : A[i][0] * B[j][0] + A[i][1] * B[j][1]],
      x: expl('linha × coluna', 'No produto, cada elemento é a "linha de A" multiplicada pela "coluna de B", termo a termo, somando.', `${P(A[i][0])}·${P(B[0][j])} + ${P(A[i][1])}·${P(B[1][j])} = ${c}.`),
    };
  },
  // 3. det(kA)
  (r) => {
    const d = r.int(-6, 9) || 2, k = r.int(2, 3), n = r.pick([2, 3]);
    return {
      e: `Uma matriz quadrada A de ordem ${n} tem determinante ${d}. Qual é o determinante da matriz ${k}A?`,
      r: k ** n * d,
      d: [k * d, k * n * d, k ** (n + 1) * d, d + k],
      x: expl('propriedade do determinante', `Multiplicar a matriz por ${k} multiplica cada uma das ${n} linhas por ${k}; cada linha multiplica o determinante por ${k}.`, `${k}${n === 2 ? '²' : '³'} × ${P(d)} = ${k ** n * d}.`),
    };
  },
  // 4. det = 0
  (r) => {
    const a = r.int(1, 5), b = r.int(1, 6), c = r.int(1, 5);
    const d = a * c;
    if (d % b) return medio[3](r);
    return {
      e: `Para qual valor de x o determinante da matriz [${a} x; ${b} ${c}] é igual a zero? ${NOTA}`,
      r: d / b,
      d: [-d / b, b / a, d, d / b + 1],
      x: expl('equação com determinante', 'Escreva o determinante em função de x e iguale a zero.', `${a}·${c} − ${b}x = 0 ⇒ x = ${d / b}.`),
    };
  },
  // 5. custo total como produto
  (r) => {
    const q = [r.int(2, 8), r.int(1, 6), r.int(1, 5)], p = [r.pick([3, 4, 5]), r.pick([6, 8, 10]), r.pick([12, 15, 20])];
    const tot = q[0] * p[0] + q[1] * p[1] + q[2] * p[2];
    return {
      e: `Uma escola comprou cadernos, canetas e mochilas nas quantidades da matriz linha Q = [${q.join(' ')}]. Os preços unitários, em reais, estão na matriz coluna P = [${p.join('; ')}]. O produto Q·P representa o gasto total. Qual é esse valor?`,
      r: tot,
      d: [q.reduce((s, v) => s + v, 0) * p.reduce((s, v) => s + v, 0), q[0] * p[0], tot + p[2], q[0] * p[2] + q[1] * p[1] + q[2] * p[0]],
      f: (v) => `R$ ${num(v, 2)}`,
      x: expl('produto linha × coluna', 'Cada quantidade multiplica o seu preço, e os resultados se somam.', `${q[0]}·${p[0]} + ${q[1]}·${p[1]} + ${q[2]}·${p[2]} = ${tot}.`),
    };
  },
  // 6. matriz triangular
  (r) => {
    const d = [r.int(1, 5) * r.pick([1, -1]), r.int(1, 5), r.int(1, 4) * r.pick([1, -1])];
    const m = [[d[0], r.int(-9, 9), r.int(-9, 9)], [0, d[1], r.int(-9, 9)], [0, 0, d[2]]];
    return {
      e: `Qual é o determinante da matriz ${mat3(m)}? ${NOTA}`,
      r: d[0] * d[1] * d[2],
      d: [d[0] + d[1] + d[2], -d[0] * d[1] * d[2], 0, m[0][2] * d[1] * 0 + m[0][1] * m[1][2]],
      x: expl('matriz triangular', 'Abaixo da diagonal só há zeros: o determinante é o produto da diagonal principal.', `${P(d[0])} × ${P(d[1])} × ${P(d[2])} = ${d[0] * d[1] * d[2]}.`),
    };
  },
  // 7. operações nas linhas
  (r) => {
    const d = r.int(2, 9), k = r.int(2, 4);
    return {
      e: `Uma matriz A de ordem 3 tem determinante ${d}. A matriz B é obtida de A trocando a 1ª linha com a 2ª e multiplicando a 3ª linha por ${k}. Qual é o determinante de B?`,
      r: -k * d,
      d: [k * d, -d, d, k ** 3 * d],
      x: expl('propriedades do determinante', 'Trocar duas linhas troca o sinal; multiplicar uma linha por k multiplica o determinante por k.', `${d} → −${d} (troca) → −${d} × ${k} = ${-k * d}.`),
    };
  },
  // 8. sistema com solução única
  (r) => {
    const a = r.int(1, 4), b = r.int(1, 5), m = r.int(2, 3);
    return {
      e: `Para que valores de k o sistema { ${a === 1 ? '' : a}x + ${b}y = 1 ; ${m * a}x + ky = 2 } tem uma única solução?`,
      r: `k ≠ ${m * b}`,
      d: [`k = ${m * b}`, `k ≠ ${b}`, `k > ${m * b}`, `k ≠ ${m * a}`, 'para qualquer k'],
      x: expl('determinante diferente de zero', 'Um sistema 2×2 tem solução única quando o determinante dos coeficientes não é zero.', `det = ${a}k − ${b}·${m * a} = ${a}(k − ${m * b}) ≠ 0 ⇒ k ≠ ${m * b}.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[2].vezes = 2;
medio[5].vezes = 2;

const dificil = [
  // 1. det(AB), det(A⁻¹)
  (r) => {
    const dA = r.int(-4, 6) || 3, dB = r.int(-3, 5) || 2;
    const pede = r.pick(['AB', 'A⁻¹', 'AᵗB']);
    const val = pede === 'A⁻¹' ? fracao(1, dA) : num(dA * dB);
    return {
      e: `A e B são matrizes quadradas de ordem 3 com det A = ${dA} e det B = ${dB}. Qual é o valor de det(${pede})?`,
      r: val,
      d: pede === 'A⁻¹' ? [num(-dA), fracao(-1, dA), num(dA), fracao(1, dA * dA)] : [num(dA + dB), num(dA * dB * 3), num(-dA * dB), fracao(dA, dB)],
      x: expl('teorema de Binet', 'det(A·B) = det A · det B; det(Aᵗ) = det A; det(A⁻¹) = 1/det A.', pede === 'A⁻¹' ? `1/${dA} = ${fracao(1, dA)}.` : `${dA} × ${dB} = ${dA * dB}.`),
    };
  },
  // 2. elemento da inversa
  (r) => {
    const m = [[r.int(1, 5), r.int(1, 5)], [r.int(1, 5), r.int(1, 5)]];
    const d = det2(m);
    if (d === 0) return dificil[1](r);
    const i = r.int(0, 1), j = r.int(0, 1);
    const adj = [[m[1][1], -m[0][1]], [-m[1][0], m[0][0]]];
    return {
      e: `Qual é o elemento da linha ${i + 1}, coluna ${j + 1} da inversa da matriz ${mat2(m)}? ${NOTA}`,
      r: fracao(adj[i][j], d),
      d: [fracao(m[i][j], d), fracao(-adj[i][j], d), fracao(1, m[i][j]), fracao(adj[i][j], -2 * d)],
      x: expl('inversa 2×2', 'Troque a e d de lugar, troque o sinal de b e c, e divida tudo pelo determinante.', `det = ${d}; elemento = ${adj[i][j]}/${d} = ${fracao(adj[i][j], d)}.`),
    };
  },
  // 3. Cramer
  (r) => {
    const x = r.int(-4, 6), y = r.int(-4, 6), a = r.int(1, 5), b = r.int(1, 5), c = r.int(1, 5), d = r.int(-4, 5);
    const D = a * d - b * c;
    if (D === 0) return dificil[2](r);
    const e1 = a * x + b * y, e2 = c * x + d * y;
    return {
      e: `No sistema { ${a}x + ${b}y = ${e1} ; ${c}x ${d >= 0 ? '+' : '−'} ${Math.abs(d)}y = ${e2} }, use a regra de Cramer para encontrar x.`,
      r: x,
      d: [y === x ? x + 2 : y, -x === x ? x + 1 : -x, D === x ? D + 3 : D, x + y === x ? x - 1 : x + y],
      x: expl('regra de Cramer', 'x = Dx/D: em Dx, a coluna de x é trocada pelos termos independentes.', `D = ${D}; Dx = ${e1 * d - b * e2}; x = ${x}.`),
    };
  },
  // 4. traço de A²
  (r) => {
    const m = rm(r, -3, 4);
    const tr = m[0][0] ** 2 + 2 * m[0][1] * m[1][0] + m[1][1] ** 2;
    return {
      e: `Qual é o traço (soma da diagonal principal) da matriz A², sendo A = ${mat2(m)}? ${NOTA}`,
      r: tr,
      d: [(m[0][0] + m[1][1]) ** 2 === tr ? tr + 4 : (m[0][0] + m[1][1]) ** 2, m[0][0] ** 2 + m[1][1] ** 2 === tr ? tr - 3 : m[0][0] ** 2 + m[1][1] ** 2, tr + 2, det2(m) ** 2 === tr ? tr - 2 : det2(m) ** 2],
      x: expl('produto de matrizes', 'Calcule só os elementos da diagonal de A·A.', `(A²)₁₁ = ${P(m[0][0])}² + ${P(m[0][1])}·${P(m[1][0])}; (A²)₂₂ = ${P(m[1][0])}·${P(m[0][1])} + ${P(m[1][1])}². Soma: ${tr}.`),
    };
  },
  // 5. quando é invertível
  (r) => {
    const k = r.pick([2, 3, 4, 5]), a = r.pick([1, 2, 4]);
    const c = (k * k) / a;
    if (!Number.isInteger(c)) return dificil[4](r);
    return {
      e: `Para que valores de x a matriz [x ${a}; ${c} x] é invertível? ${NOTA}`,
      r: `x ≠ ${k} e x ≠ −${k}`,
      d: [`x = ${k} ou x = −${k}`, `x ≠ ${k * k}`, `x > ${k}`, `x ≠ 0`, 'para todo x real'],
      x: expl('inversa existe ⇔ det ≠ 0', 'Calcule o determinante em função de x e veja quando ele zera.', `x² − ${a * c} ≠ 0 ⇒ x ≠ ±${k}.`),
    };
  },
  // 6. potência de matriz
  (r) => {
    const n = r.int(5, 50), a = r.int(1, 3);
    return {
      e: `Sendo A = [1 ${a}; 0 1], qual é a soma de todos os elementos da matriz A${String(n).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('')}? ${NOTA}`,
      r: 2 + a * n,
      d: [2 + a, 2 * n, 2 + a ** n, 2 + a * (n - 1)],
      x: expl('descobrir o padrão', 'Calcule A², A³... e observe: o 1 e o 0 ficam, e o canto superior direito cresce de a em a.', `A² = [1 ${2 * a}; 0 1], A³ = [1 ${3 * a}; 0 1] ⇒ Aⁿ = [1 ${a}n; 0 1]. Soma: 2 + ${a}·${n} = ${2 + a * n}.`),
    };
  },
  // 7. Vandermonde
  (r) => {
    const [a, b, c] = r.sample([1, 2, 3, 4, 5, 6], 3).sort((x, y) => x - y);
    const v = (b - a) * (c - a) * (c - b);
    return {
      e: `Qual é o determinante da matriz [1 1 1; ${a} ${b} ${c}; ${a * a} ${b * b} ${c * c}]? ${NOTA}`,
      r: v,
      d: [a * b * c, -v, (a + b + c) ** 2 === v ? v + 2 : (a + b + c) ** 2, v * 2],
      x: expl('matriz de Vandermonde', 'Matrizes com colunas (1, a, a²) têm determinante igual ao produto das diferenças (b − a)(c − a)(c − b).', `(${b} − ${a})(${c} − ${a})(${c} − ${b}) = ${v}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[2].vezes = 2;
dificil[3].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '15-matrizes-e-determinantes',
    titulo: 'Matrizes, determinantes e sistemas',
    provas: ['Militares', 'ENEM'],
    descricao: 'Operações com matrizes, determinantes (Sarrus e propriedades), matriz inversa e regra de Cramer.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.matrizes[0])], [...medio, ...novos(NOVOS.matrizes[1])], [...dificil, ...novos(NOVOS.matrizes[2])]],
  },
];
