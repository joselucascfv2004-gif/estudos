// Matemática — Progressões aritméticas e geométricas.
import { expl, fracao, nome, num, reais, sup } from './util.mjs';

const facil = [
  // 1. n-ésimo termo da PA
  (r) => {
    const a1 = r.int(-5, 12), d = r.int(-4, 7) || 3, n = r.int(8, 30);
    return {
      e: `Em uma progressão aritmética, o primeiro termo é ${a1} e a razão é ${d}. Qual é o ${n}º termo?`,
      r: a1 + (n - 1) * d,
      d: [a1 + n * d, a1 * n + d, (n - 1) * d, a1 + (n - 2) * d],
      x: expl('termo geral da PA', `Do 1º ao ${n}º termo há ${n - 1} "pulos" de tamanho ${d}.`, `a${n} = ${a1} + ${n - 1} · ${d} = ${a1 + (n - 1) * d}.`),
    };
  },
  // 2. n-ésimo termo da PG
  (r) => {
    const a1 = r.pick([1, 2, 3, 5]), q = r.pick([2, 3]), n = r.int(4, q === 2 ? 9 : 6);
    return {
      e: `Em uma progressão geométrica de primeiro termo ${a1} e razão ${q}, qual é o ${n}º termo?`,
      r: a1 * q ** (n - 1),
      d: [a1 * q ** n, a1 * q * (n - 1), a1 + q * (n - 1), a1 * q ** (n - 2)],
      x: expl('termo geral da PG', `Do 1º ao ${n}º termo multiplicamos por ${q} um total de ${n - 1} vezes.`, `a${n} = ${a1} · ${q}${sup(n - 1)} = ${a1 * q ** (n - 1)}.`),
    };
  },
  // 3. próximo termo (PA)
  (r) => {
    const a = r.int(1, 20), d = r.int(2, 9);
    const seq = [0, 1, 2, 3, 4].map((i) => a + i * d);
    return {
      e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
      r: a + 5 * d,
      d: [a + 5 * d + 1, a + 6 * d, a + 5 * d - 1, seq[4] * 2],
      x: expl('descobrir o padrão', 'Calcule a diferença entre termos vizinhos. Se ela é sempre a mesma, é uma PA.', `Diferença ${d}: ${seq[4]} + ${d} = ${a + 5 * d}.`),
    };
  },
  // 4. soma dos ímpares
  (r) => {
    const n = r.int(8, 40);
    return {
      e: `Qual é a soma dos ${n} primeiros números ímpares positivos (1 + 3 + 5 + ...)?`,
      r: n * n,
      d: [n * (n + 1), 2 * n * n, (n * (n + 1)) / 2, n * n - 1],
      x: expl('soma da PA', 'Soma = (primeiro + último) × quantidade ÷ 2. (Curiosidade: a soma dos n primeiros ímpares é sempre n².)', `Último: ${2 * n - 1}. (1 + ${2 * n - 1}) × ${n} ÷ 2 = ${n * n}.`),
    };
  },
  // 5. próximo termo (PG)
  (r) => {
    const a = r.pick([1, 2, 3, 4, 5, 6]), q = r.pick([2, 3, 4]);
    const seq = [0, 1, 2, 3].map((i) => a * q ** i);
    return {
      e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
      r: a * q ** 4,
      d: [seq[3] + (seq[3] - seq[2]), (a * q ** 4) / 2, a * q ** 5, seq[3] + q],
      x: expl('descobrir o padrão', 'Se a diferença entre os termos não é constante, teste o quociente (divisão). Quociente constante é PG.', `Cada termo é o anterior × ${q}: ${seq[3]} × ${q} = ${a * q ** 4}.`),
    };
  },
  // 6. treino de corrida
  (r) => {
    const a = r.pick([1, 1.5, 2, 2.5]), d = r.pick([0.25, 0.5]), n = r.int(8, 20);
    return {
      e: `Em um plano de treino, ${nome(r)} corre ${num(a)} km no primeiro dia e, a cada dia, corre ${num(d)} km a mais que no dia anterior. Quantos quilômetros vai correr no ${n}º dia?`,
      r: a + (n - 1) * d,
      d: [a + n * d, a * n * d + a, (n - 1) * d, a + (n - 2) * d],
      f: (v) => `${num(v)} km`,
      x: expl('PA no dia a dia', `Aumentar sempre a mesma quantidade é uma PA de razão ${num(d)}.`, `${num(a)} + ${n - 1} × ${num(d)} = ${num(a + (n - 1) * d)} km.`),
    };
  },
  // 7. palitos
  (r) => {
    const [fig, base, inc] = r.pick([['quadrados', 4, 3], ['triângulos', 3, 2], ['hexágonos', 6, 5]]);
    const n = r.int(10, 40);
    return {
      e: `Com palitos de fósforo, ${nome(r)} monta uma fileira de ${fig} lado a lado, que compartilham um lado: 1 figura usa ${base} palitos, 2 figuras usam ${base + inc}, 3 figuras usam ${base + 2 * inc}, e assim por diante. Quantos palitos são necessários para ${n} ${fig}?`,
      r: base + (n - 1) * inc,
      d: [base * n, inc * n, base + n * inc, base * n - 1],
      x: expl('PA escondida no desenho', `Cada figura nova acrescenta ${inc} palitos (um lado já existe).`, `${base} + (${n} − 1) × ${inc} = ${base + (n - 1) * inc}.`),
    };
  },
  // 8. qual é PG
  (r) => {
    const a = r.pick([2, 3, 5]), q = r.pick([2, 3]);
    const pg = [a, a * q, a * q * q, a * q ** 3];
    const pa = [a, a + q, a + 2 * q, a + 3 * q];
    const pa2 = [a * q, a * q + a, a * q + 2 * a, a * q + 3 * a];
    const nada = [a, a + 1, a + 3, a + 6];
    const quad = [1, 4, 9, 16];
    return {
      e: 'Qual das sequências abaixo é uma progressão geométrica?',
      r: `(${pg.join(', ')})`,
      d: [`(${pa.join(', ')})`, `(${pa2.join(', ')})`, `(${nada.join(', ')})`, `(${quad.join(', ')})`],
      x: expl('teste do quociente', 'Divida cada termo pelo anterior. Na PG o resultado é sempre o mesmo.', `${pg[1]}/${pg[0]} = ${pg[2]}/${pg[1]} = ${pg[3]}/${pg[2]} = ${q}.`),
    };
  },
  // 9. termo do meio
  (r) => {
    // termos (x + a), (2x + b), (4x − c): 2(2x + b) = (x + a) + (4x − c) ⇒ x = 2b − a + c
    const a = r.int(1, 4), b = r.int(1, 5), c = r.int(1, 6);
    const sol = 2 * b - a + c;
    return {
      e: `Os números x + ${a}, 2x + ${b} e 4x − ${c}, nessa ordem, formam uma progressão aritmética. Qual é o valor de x?`,
      r: sol,
      d: [sol + 1, sol - 2, a + b + c, 2 * sol],
      x: expl('termo do meio é a média', 'Em uma PA de três termos, o do meio é a média dos outros dois: 2 × (meio) = (primeiro) + (terceiro).', `2(2x + ${b}) = (x + ${a}) + (4x − ${c}) ⇒ 4x + ${2 * b} = 5x${a - c >= 0 ? ' + ' + (a - c) : ' − ' + (c - a)} ⇒ x = ${sol}.`),
    };
  },
  // 10. bola quicando
  (r) => {
    const h = r.pick([8, 16, 32]), n = r.int(2, 4);
    return {
      e: `Uma bola é solta de ${h} m de altura e, a cada quique no chão, sobe até a metade da altura anterior. Que altura ela atinge depois do ${n}º quique?`,
      r: h / 2 ** n,
      d: [h / (2 * n), h / 2 ** (n - 1), h / 2 ** (n + 1), h - n * 2],
      f: (v) => `${num(v)} m`,
      x: expl('PG de razão 1/2', 'Cada quique multiplica a altura por 1/2.', `${h} × (1/2)${sup(n)} = ${num(h / 2 ** n)} m.`),
    };
  },
  // 11. fórmula do termo geral (pura)
  (r) => {
    const a = r.int(2, 7), b = r.int(-5, 6), n = r.int(10, 50);
    return {
      e: `Os termos de uma sequência são dados por aₙ = ${a}n${b >= 0 ? ' + ' + b : ' − ' + -b}. Qual é o valor de a${String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c]).join('')}?`,
      r: a * n + b,
      d: [a * n, a + n + b, a * (n + b), a * (n - 1) + b],
      x: expl('substituir n', 'O termo geral é uma "receita": troque n pela posição desejada.', `${a} × ${n}${b >= 0 ? ' + ' + b : ' − ' + -b} = ${a * n + b}.`),
    };
  },
  // 12. quantos termos
  (r) => {
    const a1 = r.int(1, 9), d = r.int(3, 7), n = r.int(20, 60);
    const an = a1 + (n - 1) * d;
    return {
      e: `Quantos termos tem a progressão aritmética (${a1}, ${a1 + d}, ${a1 + 2 * d}, ..., ${an})?`,
      r: n,
      d: [n - 1, n + 1, Math.round(an / d), an - a1],
      x: expl('termo geral ao contrário', 'Descubra quantos "pulos" separam o primeiro do último e some 1 (o próprio primeiro termo).', `(${an} − ${a1}) ÷ ${d} = ${n - 1} pulos ⇒ ${n} termos.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[6].vezes = 2;
facil[11].vezes = 2;

const medio = [
  // 1. soma da PA
  (r) => {
    const a1 = r.int(1, 15), d = r.int(2, 6), n = r.int(10, 30);
    const an = a1 + (n - 1) * d;
    return {
      e: `Qual é a soma dos ${n} primeiros termos da PA (${a1}, ${a1 + d}, ${a1 + 2 * d}, ...)?`,
      r: ((a1 + an) * n) / 2,
      d: [(a1 + an) * n, an * n, ((a1 + an + d) * n) / 2, ((a1 + an) * (n - 1)) / 2],
      x: expl('soma da PA (truque de Gauss)', 'Primeiro + último = segundo + penúltimo = ... Some os pares e multiplique.', `a${n} = ${an}; S = (${a1} + ${an}) × ${n} ÷ 2 = ${((a1 + an) * n) / 2}.`),
    };
  },
  // 2. soma da PG
  (r) => {
    const a1 = r.pick([1, 2, 3, 5]), q = r.pick([2, 3]), n = r.int(4, q === 2 ? 10 : 6);
    const s = (a1 * (q ** n - 1)) / (q - 1);
    return {
      e: `Qual é a soma dos ${n} primeiros termos da PG (${a1}, ${a1 * q}, ${a1 * q * q}, ...)?`,
      r: s,
      d: [a1 * q ** n, a1 * q ** (n - 1), (a1 * (q ** (n + 1) - 1)) / (q - 1), s - a1],
      x: expl('soma da PG', 'Sₙ = a₁(qⁿ − 1)/(q − 1).', `${a1}(${q}${sup(n)} − 1)/${q - 1} = ${num(s)}.`),
    };
  },
  // 3. poupança crescente
  (r) => {
    const a = r.pick([50, 100, 150, 200]), d = r.pick([10, 20, 25, 50]), n = r.pick([6, 10, 12, 18, 24]);
    const tot = (n * (2 * a + (n - 1) * d)) / 2;
    return {
      e: `${nome(r)} decidiu economizar: guardou ${reais(a)} no primeiro mês e, a cada mês, guarda ${reais(d)} a mais que no mês anterior. Quanto terá guardado ao final de ${n} meses?`,
      r: tot,
      d: [a * n + d * n, (a + (n - 1) * d) * n, a * n, tot + a],
      f: reais,
      x: expl('soma da PA', 'Os depósitos formam uma PA; o total guardado é a soma dela.', `Último depósito: ${reais(a + (n - 1) * d)}. Soma: (${a} + ${a + (n - 1) * d}) × ${n} ÷ 2 = ${reais(tot)}.`),
    };
  },
  // 4. múltiplos entre A e B
  (r) => {
    const k = r.pick([3, 4, 6, 7, 9, 11]), A = r.int(10, 99), B = r.int(300, 999);
    const primeiro = Math.ceil(A / k) * k, ultimo = Math.floor(B / k) * k;
    const q = (ultimo - primeiro) / k + 1;
    return {
      e: `Quantos múltiplos de ${k} existem entre ${A} e ${B}?`,
      r: q,
      d: [q + 1, q - 1, Math.round((B - A) / k) === q ? q + 2 : Math.round((B - A) / k), Math.floor(B / k)],
      x: expl('PA de múltiplos', `Os múltiplos de ${k} formam uma PA de razão ${k}. Ache o primeiro e o último no intervalo.`, `Primeiro ${primeiro}, último ${ultimo}: (${ultimo} − ${primeiro}) ÷ ${k} + 1 = ${q}.`),
    };
  },
  // 5. primeiro termo a partir de dois termos
  (r) => {
    const a1 = r.int(-10, 10), d = r.int(2, 7) * r.pick([1, -1]);
    const i = r.int(3, 6), j = i + r.int(3, 6);
    return {
      e: `Em uma PA, o ${i}º termo é ${a1 + (i - 1) * d} e o ${j}º termo é ${a1 + (j - 1) * d}. Qual é o primeiro termo?`,
      r: a1,
      d: [d === a1 ? d + 3 : d, a1 + d, -a1 === a1 ? a1 + 2 : -a1, a1 - d],
      x: expl('contar razões entre termos', `Entre o ${i}º e o ${j}º termo há ${j - i} razões.`, `r = (${a1 + (j - 1) * d} − ${a1 + (i - 1) * d}) ÷ ${j - i} = ${d}; a₁ = ${a1 + (i - 1) * d} − ${i - 1} × (${d}) = ${a1}.`),
    };
  },
  // 6. razão da PG por dois termos
  (r) => {
    const a1 = r.pick([1, 2, 3, 4]), q = r.pick([2, 3, 4]);
    return {
      e: `Em uma PG de termos positivos, o 2º termo é ${a1 * q} e o 5º termo é ${a1 * q ** 4}. Qual é a razão?`,
      r: q,
      d: [q * q, q + 1, (a1 * q ** 4 - a1 * q) / 3, a1],
      x: expl('contar razões entre termos', 'Do 2º ao 5º termo multiplicamos pela razão 3 vezes.', `${a1 * q} · q³ = ${a1 * q ** 4} ⇒ q³ = ${q ** 3} ⇒ q = ${q}.`),
    };
  },
  // 7. cadeiras do teatro
  (r) => {
    const a = r.pick([16, 18, 20, 24]), d = r.pick([2, 3, 4]), n = r.pick([10, 12, 15, 20]);
    const tot = (n * (2 * a + (n - 1) * d)) / 2;
    return {
      e: `Um teatro tem ${n} fileiras. A primeira tem ${a} cadeiras e cada fileira seguinte tem ${d} cadeiras a mais que a anterior. Quantas cadeiras há no teatro?`,
      r: tot,
      d: [a * n, (a + (n - 1) * d) * n, a * n + d * n, tot - a],
      x: expl('soma da PA', 'Calcule a última fileira e use (primeira + última) × quantidade ÷ 2.', `Última: ${a} + ${n - 1} × ${d} = ${a + (n - 1) * d}. Total: (${a} + ${a + (n - 1) * d}) × ${n} ÷ 2 = ${tot}.`),
    };
  },
  // 8. média geométrica
  (r) => {
    const a = r.pick([2, 3, 4, 5]), q = r.pick([2, 3, 4]);
    return {
      e: `Os números x, ${a * q} e ${a * q * q}, nessa ordem, formam uma PG. Qual é o valor de x?`,
      r: a,
      d: [a * q - (a * q * q - a * q), a + 1, (a * q * q) / (q + 1), a * q],
      x: expl('termo do meio na PG', 'Em uma PG de três termos, o do meio ao quadrado é igual ao produto dos outros dois.', `(${a * q})² = x · ${a * q * q} ⇒ x = ${(a * q) ** 2}/${a * q * q} = ${a}.`),
    };
  },
  // 9. termo a partir da soma
  (r) => {
    const p = r.int(1, 3), q = r.int(-2, 4), k = r.int(4, 9);
    const S = (n) => p * n * n + q * n;
    return {
      e: `A soma dos n primeiros termos de uma sequência é Sₙ = ${p === 1 ? '' : p}n²${q === 0 ? '' : q > 0 ? ` + ${q === 1 ? '' : q}n` : ` − ${q === -1 ? '' : -q}n`}. Qual é o ${k}º termo dessa sequência?`,
      r: S(k) - S(k - 1),
      d: [S(k), S(k) / k, S(k - 1), p * k * k],
      x: expl('aₙ = Sₙ − Sₙ₋₁', 'A soma até o termo k menos a soma até o termo k − 1 sobra exatamente o termo k.', `S${k} = ${S(k)}, S${k - 1} = ${S(k - 1)}; a${k} = ${S(k) - S(k - 1)}.`),
    };
  },
  // 10. meios geométricos
  (r) => {
    const a = r.pick([2, 3, 5]), q = r.pick([2, 3]), k = r.pick([2, 3]);
    const b = a * q ** (k + 1);
    return {
      e: `Inserindo ${k} meios geométricos entre ${a} e ${b}, obtém-se uma PG crescente. Qual é a razão?`,
      r: q,
      d: [(b - a) / (k + 1), q * q, q + 1, b / a / k],
      x: expl('termo geral da PG', `A PG terá ${k + 2} termos; do 1º ao último há ${k + 1} multiplicações pela razão.`, `${b} = ${a} · q${sup(k + 1)} ⇒ q${sup(k + 1)} = ${b / a} ⇒ q = ${q}.`),
    };
  },
  // 11. posição de um termo
  (r) => {
    const a1 = r.int(2, 9), d = r.int(3, 8), n = r.int(18, 50);
    const v = a1 + (n - 1) * d;
    return {
      e: `Em que posição o número ${v} aparece na progressão aritmética (${a1}, ${a1 + d}, ${a1 + 2 * d}, ...)?`,
      r: n,
      d: [n - 1, n + 1, Math.round(v / d), Math.round(v / a1)],
      f: (x) => `${x}ª posição`,
      x: expl('isolar n no termo geral', 'Use aₙ = a₁ + (n − 1)r e resolva para n.', `${v} = ${a1} + (n − 1) × ${d} ⇒ n − 1 = ${n - 1} ⇒ n = ${n}.`),
    };
  },
  // 12. estacionamento
  (r) => {
    const h1 = r.pick([8, 10, 12]), adic = r.pick([2, 3, 4]), h = r.int(3, 9);
    return {
      e: `Um estacionamento cobra ${reais(h1)} pela primeira hora e ${reais(adic)} por hora adicional (cada hora começada conta inteira). Quanto paga quem fica ${h} horas e 20 minutos?`,
      r: h1 + adic * h,
      d: [h1 + adic * (h - 1), h1 * (h + 1), (h1 + adic) * h, h1 + adic * (h + 1)],
      f: reais,
      x: expl('PA com contagem cuidadosa', `${h} h 20 min contam como ${h + 1} horas: a primeira e mais ${h} adicionais.`, `${reais(h1)} + ${h} × ${reais(adic)} = ${reais(h1 + adic * h)}.`),
    };
  },
];
medio[0].vezes = 2;
medio[3].vezes = 2;
medio[4].vezes = 2;
medio[8].vezes = 2;

const dificil = [
  // 1. PG infinita
  (r) => {
    const a1 = r.pick([6, 8, 9, 10, 12, 20, 30]), [p, q] = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]);
    const s = (a1 * q) / (q - p);
    return {
      e: `Qual é a soma dos infinitos termos da PG (${a1}, ${num((a1 * p) / q)}, ${num((a1 * p * p) / (q * q))}, ...)?`,
      r: s,
      d: [a1 / (1 + p / q), a1 * (1 + p / q), s * 2, a1 * q],
      x: expl('soma da PG infinita', 'Quando a razão está entre −1 e 1, os termos encolhem e a soma "converge": S = a₁/(1 − q).', `q = ${p}/${q}; S = ${a1} ÷ (${q - p}/${q}) = ${num(s)}.`),
    };
  },
  // 2. três números em PA (soma e produto)
  (r) => {
    const mid = r.int(3, 15), d = r.int(1, 6);
    const prod = (mid - d) * mid * (mid + d);
    return {
      e: `Três números estão em PA crescente. A soma deles é ${3 * mid} e o produto é ${prod}. Qual é o maior deles?`,
      r: mid + d,
      d: [mid, mid - d, mid + 2 * d, 3 * mid - d],
      x: expl('escolher bem as incógnitas', 'Escreva os três como (x − r, x, x + r): a soma elimina o r.', `3x = ${3 * mid} ⇒ x = ${mid}; ${mid}(${mid}² − r²) = ${prod} ⇒ r = ${d}. Maior: ${mid + d}.`),
    };
  },
  // 3. meios aritméticos
  (r) => {
    const a = r.int(2, 20), k = r.int(3, 8), d = r.int(2, 9);
    const b = a + (k + 1) * d;
    return {
      e: `Ao inserir ${k} meios aritméticos entre ${a} e ${b}, obtém-se uma PA. Qual é a razão dessa PA?`,
      r: d,
      d: [(b - a) / k, d + 1, (b - a) / (k + 2), b - a],
      x: expl('contar termos', `Com os ${k} meios, a PA tem ${k + 2} termos e ${k + 1} razões entre o primeiro e o último.`, `r = (${b} − ${a}) ÷ ${k + 1} = ${d}.`),
    };
  },
  // 4. soma dos múltiplos
  (r) => {
    const k = r.pick([3, 4, 5, 6, 7]), N = r.pick([100, 150, 200, 300]);
    const n = Math.floor(N / k), s = (k * n * (n + 1)) / 2;
    return {
      e: `Qual é a soma de todos os múltiplos positivos de ${k} menores ou iguais a ${N}?`,
      r: s,
      d: [s - k * n, (k * n * n) / 2, (n * (n + 1)) / 2, s + k],
      x: expl('soma da PA', `São ${k}, ${2 * k}, ..., ${k * n}: ${n} termos.`, `(${k} + ${k * n}) × ${n} ÷ 2 = ${num(s)}.`),
    };
  },
  // 5. constante que forma PG
  (r) => {
    const x = r.pick([2, 3, 4, 6]), q = r.pick([2, 3]);
    const a = x, b = x * q, c = x * q * q;
    const k = r.int(1, 5);
    return {
      e: `Os números ${a - k}, ${b - k} e ${c - k}, somados a uma mesma constante c, formam uma progressão geométrica. Qual é o valor de c?`,
      r: k,
      d: [-k, k + 1, q === k ? q + 2 : q, x === k ? x + 3 : x],
      x: expl('propriedade da PG', '(termo do meio)² = (primeiro) × (terceiro).', `(${b - k} + c)² = (${a - k} + c)(${c - k} + c) ⇒ c = ${k}, e a PG fica (${a}, ${b}, ${c}).`),
    };
  },
  // 6. distância total da bola
  (r) => {
    const h = r.pick([2, 3, 4, 5, 6, 10]), [p, q] = r.pick([[1, 2], [1, 3], [2, 3], [3, 4]]);
    const tot = h + (2 * h * (p / q)) / (1 - p / q);
    return {
      e: `Uma bola é solta de ${h} m de altura. A cada quique, sobe até ${p}/${q} da altura anterior, e o movimento continua indefinidamente. Qual é a distância vertical total percorrida pela bola (subidas e descidas)?`,
      r: tot,
      d: [h / (1 - p / q), (2 * h) / (1 - p / q), h + (h * (p / q)) / (1 - p / q), tot * 2],
      f: (v) => `${num(v)} m`,
      x: expl('PG infinita', 'A primeira queda é só descida; cada quique depois gera uma subida e uma descida iguais. As alturas dos quiques formam uma PG.', `Quiques: ${num((h * p) / q)} + ... = ${num((h * (p / q)) / (1 - p / q))} m (cada um contado 2 vezes). Total: ${h} + 2 × ${num((h * (p / q)) / (1 - p / q))} = ${num(tot)} m.`),
    };
  },
  // 7. quadrados inscritos
  (r) => {
    const l = r.pick([2, 4, 6, 8, 10]);
    return {
      e: `Um quadrado tem lado ${l} cm. Ligando os pontos médios dos seus lados, obtém-se um novo quadrado; repete-se o processo infinitamente. Qual é a soma das áreas de todos os quadrados?`,
      r: 2 * l * l,
      d: [l * l, 4 * l * l, 1.5 * l * l, l * l + l],
      f: (v) => `${num(v)} cm²`,
      x: expl('PG infinita de áreas', 'O quadrado formado pelos pontos médios tem metade da área do anterior: razão 1/2.', `S = ${l * l} ÷ (1 − 1/2) = ${2 * l * l} cm².`),
    };
  },
  // 8. menor n para a soma passar de um valor
  (r) => {
    const alvo = r.pick([200, 300, 500, 800, 1000]);
    let n = 1;
    while ((n * (n + 1)) / 2 <= alvo) n++;
    return {
      e: `Somando 1 + 2 + 3 + ... + n, qual é o menor valor de n para que a soma ultrapasse ${alvo}?`,
      r: n,
      d: [n - 1, n + 1, Math.round(Math.sqrt(alvo)), Math.round(alvo / 10)],
      x: expl('soma da PA e estimativa', 'A soma é n(n + 1)/2. Estime n ≈ √(2 × alvo) e teste os vizinhos.', `n = ${n - 1}: ${((n - 1) * n) / 2} (não passa); n = ${n}: ${(n * (n + 1)) / 2} (passa).`),
    };
  },
  // 9. proposta de salário (PA x PG)
  (r) => {
    const fixo = r.pick([500, 1000]), dias = r.pick([20, 25, 30]);
    const pg = 0.01 * (2 ** dias - 1);
    const pa = fixo * dias;
    return {
      e: `Um patrão oferece duas formas de pagamento por ${dias} dias de trabalho: (A) ${reais(fixo)} por dia; (B) R$ 0,01 no 1º dia, R$ 0,02 no 2º, R$ 0,04 no 3º, sempre dobrando. Qual opção paga mais no total, e quanto?`,
      r: pg > pa ? `A opção B, com ${reais(pg)}` : `A opção A, com ${reais(pa)}`,
      d: [pg > pa ? `A opção A, com ${reais(pa)}` : `A opção B, com ${reais(pg)}`, `A opção B, com ${reais(0.01 * 2 ** (dias - 1))}`, 'As duas pagam o mesmo', `A opção B, com ${reais(0.02 * dias)}`, `A opção A, com ${reais(pa * 2)}`],
      x: expl('soma da PG (crescimento explosivo)', 'A opção B é uma PG de razão 2: Sₙ = 0,01(2ⁿ − 1). Dobrar muitas vezes cresce muito rápido.', `A: ${dias} × ${reais(fixo)} = ${reais(pa)}. B: 0,01 × (2${sup(dias)} − 1) = ${reais(pg)}.`),
    };
  },
  // 10. soma alternada
  (r) => {
    const n = r.int(20, 120);
    return {
      e: `Qual é o valor de 1 − 2 + 3 − 4 + 5 − 6 + ... + ${2 * n - 1} − ${2 * n}?`,
      r: -n,
      d: [n, 0, -2 * n, -n - 1],
      x: expl('agrupar em pares', 'Junte de dois em dois: (1 − 2) + (3 − 4) + ... Cada par vale −1.', `São ${n} pares: ${n} × (−1) = ${-n}.`),
    };
  },
  // 11. PA de segunda ordem
  (r) => {
    const c = r.int(1, 5), n = r.int(12, 30);
    const t = (k) => k * k + c;
    return {
      e: `Observe a sequência ${[1, 2, 3, 4, 5].map(t).join(', ')}, ... Seguindo o mesmo padrão, qual é o ${n}º termo?`,
      r: t(n),
      d: [t(n) - 1, n * n, t(n - 1), t(1) + (n - 1) * (t(2) - t(1))],
      x: expl('diferenças das diferenças', 'As diferenças (3, 5, 7, 9, ...) formam uma PA. Isso indica um termo do tipo n² + algo.', `Os termos são n² + ${c}: ${n}² + ${c} = ${t(n)}.`),
    };
  },
  // 12. produto dos termos da PG
  (r) => {
    const m = r.pick([2, 3, 4, 5]);
    return {
      e: `Em uma PG de 5 termos positivos, o termo do meio é ${m}. Qual é o produto dos 5 termos?`,
      r: m ** 5,
      d: [m * 5, m ** 4, 5 ** m, m ** 3],
      x: expl('simetria da PG', 'Termos equidistantes do meio têm produto igual ao quadrado do termo do meio: a₁·a₅ = a₂·a₄ = a₃².', `Produto = a₃² · a₃² · a₃ = ${m}${sup(5)} = ${m ** 5}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[5].vezes = 2;
dificil[10].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '07-progressoes',
    titulo: 'Progressões aritméticas e geométricas',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Padrões em sequências, termo geral e soma de PA e PG, PG infinita e problemas do dia a dia.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
