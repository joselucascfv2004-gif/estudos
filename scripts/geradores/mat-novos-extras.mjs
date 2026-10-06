// Matemática — modelos acrescentados em 2026 para levar os tópicos 6 a 17 a 50 questões.
// Entram no fim de cada nível (ver `novos` em util.mjs), sem mudar as questões antigas.
import { comb, expl, fatorial, fracao, nome, num, sup } from './util.mjs';

const ate = (gerar, ok) => {
  for (let i = 0; i < 500; i++) {
    const v = gerar();
    if (ok(v)) return v;
  }
  throw new Error('sem combinação válida');
};
const P = (v) => (v < 0 ? `(${v})` : `${v}`);
const pct = (v) => `${num(v)}%`;

// ------------------------------------------------------------- 06 Exponencial e logaritmo
const explog = [
  [
    (r) => {
      const [b, bs, x] = r.pick([[2, '1/2', 8], [3, '1/3', 27], [2, '1/2', 32], [5, '1/5', 25], [3, '1/3', 81], [2, '1/2', 16]]);
      const res = -Math.round(Math.log(x) / Math.log(b));
      return {
        e: `Quanto vale log de ${x} na base ${bs}?`,
        r: res,
        d: [-res, 1 / res, res - 1, x / b],
        x: expl('logaritmo é um expoente', `Pergunte: (${bs}) elevado a quanto dá ${x}? Como ${bs} = ${b}⁻¹, o expoente fica negativo.`, `(${bs})${sup(res)} = ${b}${sup(-res)} = ${x}; log = ${res}.`),
      };
    },
    (r) => {
      const [a, b, c, d, res] = r.pick([[2, 3, 4, 8, 3], [2, 5, 25, 32, 5], [3, 4, 16, 9, 2], [2, 7, 49, 64, 6], [5, 2, 4, 125, 3]]);
      void c;
      return {
        e: `Calcule o produto log${'₀₁₂₃₄₅₆₇₈₉'[a]}${b} · log${'₀₁₂₃₄₅₆₇₈₉'[b]}${d}.`,
        r: res,
        d: [res + 1, res * 2, b * d, res - 1],
        x: expl('mudança de base: logₐb · log_b c = logₐc', 'O b "cancela" como numa cadeia de frações.', `log${'₀₁₂₃₄₅₆₇₈₉'[a]}${b} · log${'₀₁₂₃₄₅₆₇₈₉'[b]}${d} = log${'₀₁₂₃₄₅₆₇₈₉'[a]}${d} = ${res}.`),
      };
    },
  ],
  [
    (r) => {
      const k = r.int(1, 5), sh = r.pick([1, 2, 3]), base = r.pick([2, 3]);
      const x = base ** r.pick([2, 3, 4]) + sh;
      const res = Math.round(Math.log(x - sh) / Math.log(base)) + k;
      return {
        e: `Dada f(x) = log${base === 2 ? '₂' : '₃'}(x − ${sh}) + ${k}, quanto vale f(${x})?`,
        r: res,
        d: [res - k, Math.round(Math.log(x) / Math.log(base)) + k, res + sh, (x - sh) / base + k],
        x: expl('substituir e usar a definição de log', 'Faça primeiro a conta de dentro do log; depois some o deslocamento.', `log${base === 2 ? '₂' : '₃'}(${x - sh}) = ${res - k}; f(${x}) = ${res - k} + ${k} = ${res}.`),
      };
    },
    (r) => {
      const [b, raiz, ex] = r.pick([[3, 27, 3], [2, 8, 3], [2, 32, 5], [5, 125, 3], [2, 16, 4]]);
      const res = ex / 2;
      return {
        e: `Quanto vale log de √${raiz} na base ${b}?`,
        r: res,
        d: [ex, ex * 2, ex / 3, Math.sqrt(ex)],
        x: expl('raiz é expoente ½; log de potência', `√${raiz} = ${raiz}^(1/2) = ${b}^(${ex}/2).`, `log = ${ex}/2 = ${num(res)}.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.pick([50, 60, 100, 200, 30]);
      const dig = Math.floor(n * 0.30103) + 1;
      return {
        e: `Quantos algarismos tem o número 2${sup(n)}? (use log 2 ≈ 0,301)`,
        r: dig,
        d: [dig - 1, dig + 1, n, Math.round(n * 0.301 * 2)],
        x: expl('número de algarismos = parte inteira do log + 1', `log 2${sup(n)} = ${n} × 0,301 = ${num(n * 0.301)}: o número fica entre 10${sup(dig - 1)} e 10${sup(dig)}.`, `Tem ${dig} algarismos.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 07 Progressões
const progressoes = [
  [
    (r) => {
      const n = r.pick([10, 15, 20, 25, 30, 50]);
      return {
        e: `Quanto vale a soma dos ${n} primeiros números ímpares positivos (1 + 3 + 5 + …)?`,
        r: n * n,
        d: [n * (n + 1), 2 * n, (n * (n + 1)) / 2, 2 * n * n],
        x: expl('soma dos n primeiros ímpares = n²', `É uma PA de razão 2: o último termo é ${2 * n - 1} e a soma é (1 + ${2 * n - 1}) × ${n} ÷ 2.`, `${n}² = ${n * n}.`),
      };
    },
  ],
  [
    (r) => {
      const a1 = r.pick([2, 3, 5, 1]), q = r.pick([2, 3, -2]);
      const a4 = a1 * q ** 3;
      return {
        e: `Numa PG, o 1º termo é ${a1} e o 4º termo é ${a4}. Qual é a razão?`,
        r: q,
        d: [a4 / a1, (a4 - a1) / 3, -q, q * 2],
        x: expl('termo geral da PG: a₄ = a₁·q³', `q³ = ${a4} ÷ ${a1} = ${a4 / a1}.`, `q = ∛${P(a4 / a1)} = ${q}.`),
      };
    },
  ],
  [],
];

// ------------------------------------------------------------- 08 Geometria plana
const plana = [
  [],
  [
    (r) => {
      const l = r.pick([2, 4, 6, 10]);
      const A = (6 * l * l * 1.7) / 4;
      return {
        e: `Qual é a área de um hexágono regular de lado ${l} cm? (use √3 ≈ 1,7)`,
        r: A,
        d: [(l * l * 1.7) / 4, 6 * l * l, 6 * l, A / 2],
        f: (v) => `${num(v)} cm²`,
        x: expl('hexágono regular = 6 triângulos equiláteros', 'Cada triângulo tem área l²√3/4.', `6 × ${l}² × 1,7 ÷ 4 = ${num(A)} cm².`),
      };
    },
  ],
  [
    (r) => {
      const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [20, 21, 29]]);
      const raio = (a + b - c) / 2;
      return {
        e: `Um triângulo retângulo tem catetos ${a} e ${b} e hipotenusa ${c}. Qual é o raio da circunferência inscrita nele?`,
        r: raio,
        d: [c / 2, (a + b + c) / 2, (a * b) / c, raio * 2],
        x: expl('raio inscrito no triângulo retângulo: r = (a + b − c)/2', 'As tangentes de um mesmo ponto à circunferência têm comprimentos iguais (ou use área = r × semiperímetro).', `r = (${a} + ${b} − ${c}) ÷ 2 = ${num(raio)}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 09 Geometria espacial
const espacial = [
  [
    (r) => {
      const raio = r.pick([1, 2, 3, 5]), h = r.pick([4, 5, 10, 12]);
      const A = 2 * 3 * raio * h;
      return {
        e: `Qual é a área lateral de um cilindro de raio ${raio} m e altura ${h} m? (use π = 3)`,
        r: A,
        d: [3 * raio * raio * h, 2 * 3 * raio * h + 2 * 3 * raio * raio, 3 * raio * h, A * 2],
        f: (v) => `${num(v)} m²`,
        x: expl('área lateral do cilindro = 2πr·h', 'Planificada, a lateral é um retângulo: comprimento da circunferência × altura.', `2 × 3 × ${raio} × ${h} = ${A} m².`),
      };
    },
    (r) => {
      const [a, b, c] = [r.pick([2, 3, 4, 5]), r.pick([3, 6, 8]), r.pick([5, 10, 12])];
      const A = 2 * (a * b + a * c + b * c);
      return {
        e: `Quanto papel é preciso para forrar (sem sobras) uma caixa fechada de ${a} cm × ${b} cm × ${c} cm?`,
        r: A,
        d: [a * b * c, a * b + a * c + b * c, 4 * (a + b + c), 6 * a * b],
        f: (v) => `${num(v)} cm²`,
        x: expl('área total do paralelepípedo = 2(ab + ac + bc)', 'São 6 faces, iguais duas a duas.', `2 × (${a * b} + ${a * c} + ${b * c}) = ${A} cm².`),
      };
    },
  ],
  [
    (r) => {
      const raio = r.pick([1, 2, 3, 5]);
      const V = 3 * raio * raio * 2 * raio;
      return {
        e: `Um cilindro equilátero (altura igual ao diâmetro da base) tem raio ${raio} cm. Qual é o seu volume? (π = 3)`,
        r: V,
        d: [3 * raio * raio * raio, 3 * raio * raio * 4 * raio, V / 2, 2 * 3 * raio * 2 * raio, V * 3],
        f: (v) => `${num(v)} cm³`,
        x: expl('cilindro equilátero: h = 2r', 'V = πr² · h, com h = 2r.', `3 × ${raio}² × ${2 * raio} = ${V} cm³.`),
      };
    },
    (r) => {
      const a = r.pick([2, 4, 6, 10]);
      const rr = a / 2, V = (4 * 3 * rr ** 3) / 3;
      return {
        e: `Uma esfera está inscrita num cubo de aresta ${a} cm (tocando todas as faces). Qual é o volume da esfera? (π = 3)`,
        r: V,
        d: [a ** 3, (4 * 3 * a ** 3) / 3, 4 * 3 * rr * rr, a ** 3 - V, V / 2, V * 2, 4 * 3 * rr ** 3],
        f: (v) => `${num(v)} cm³`,
        x: expl('esfera inscrita no cubo: diâmetro = aresta', `O raio é ${a}/2 = ${rr} cm; V = 4πr³/3.`, `4 × 3 × ${rr}³ ÷ 3 = ${num(V)} cm³.`),
      };
    },
  ],
  [
    (r) => {
      const V = r.pick([240, 480, 800, 1600]), [k, frac] = r.pick([[2, 7 / 8], [3, 26 / 27]]);
      const tronco = V * frac;
      return {
        e: `Um cone de volume ${V} cm³ é cortado por um plano paralelo à base, a 1/${k} da altura medida a partir do vértice. Qual é o volume do tronco (a parte de baixo)?`,
        r: tronco,
        d: [V - V / k, V / k, V / k ** 3, V - V / (k * k)],
        f: (v) => `${num(v)} cm³`,
        x: expl('semelhança no espaço: volumes na razão k³', `O cone pequeno é semelhante, com altura 1/${k}: volume (1/${k})³ = 1/${k ** 3} do total.`, `${V} − ${V}/${k ** 3} = ${num(tronco)} cm³.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 10 Trigonometria
const trig = [
  [
    (r) => {
      const [g, rad] = r.pick([[30, 'π/6'], [45, 'π/4'], [60, 'π/3'], [120, '2π/3'], [135, '3π/4'], [150, '5π/6'], [210, '7π/6'], [270, '3π/2'], [300, '5π/3']]);
      const errados = ['π/6', 'π/4', 'π/3', '2π/3', '3π/4', '5π/6', '7π/6', '3π/2', '5π/3', '4π/3'].filter((x) => x !== rad);
      return {
        e: `Quanto vale ${g}° em radianos?`,
        r: rad,
        d: r.sample(errados, 4),
        x: expl('regra de três com 180° = π', `${g}° = ${g}/180 de π.`, `${g}/180 = ${fracao(g, 180)} → ${rad}.`),
      };
    },
  ],
  [
    (r) => {
      const [ang, frac, raio] = r.pick([[60, 1 / 6, 6], [90, 1 / 4, 4], [120, 1 / 3, 6], [45, 1 / 8, 8], [30, 1 / 12, 12]]);
      const A = 3 * raio * raio * frac;
      return {
        e: `Qual é a área de um setor circular de ${ang}° num círculo de raio ${raio} cm? (π = 3)`,
        r: A,
        d: [3 * raio * raio, 2 * 3 * raio * frac, A * 2, raio * raio * frac, A / 2],
        f: (v) => `${num(v)} cm²`,
        x: expl('setor = fração do círculo', `${ang}° é ${fracao(ang, 360)} da volta.`, `3 × ${raio}² × ${fracao(ang, 360)} = ${num(A)} cm².`),
      };
    },
    (r) => {
      const voltas = r.pick([1, 2, 3]), [val, txt] = r.pick([[0.5, '1/2'], [-0.5, '−1/2'], [0, '0']]);
      const porVolta = val === 0 ? 2 : 2;
      const intervalo = val === 0 ? `]0, ${2 * voltas}π[` : `[0, ${2 * voltas}π]`;
      const n = porVolta * voltas - (val === 0 ? 1 : 0);
      return {
        e: `Quantas soluções a equação sen x = ${txt} tem no intervalo ${intervalo}?`,
        r: n,
        d: [voltas, n + 1, 4 * voltas, n * 2],
        x: expl('contar por volta no ciclo', val === 0 ? 'sen x = 0 nos múltiplos de π; no intervalo aberto, as pontas não contam.' : `Em cada volta, sen x = ${txt} acontece em 2 ângulos (simétricos em relação ao eixo vertical).`, `Total: ${n}.`),
      };
    },
  ],
  [
    (r) => {
      const [ta, tb] = r.pick([[1 / 2, 1 / 3], [2, 3], [1 / 4, 3 / 5], [1, 2], [1 / 2, 1 / 5]]);
      const t = (ta + tb) / (1 - ta * tb);
      return {
        e: `Se tg a = ${fracao(ta * 60, 60)} e tg b = ${fracao(tb * 60, 60)}, quanto vale tg(a + b)?`,
        r: t,
        d: [ta + tb, ta * tb, (ta + tb) * 2, 1 - ta * tb, (ta + tb) / 2],
        f: (v) => fracao(Math.round(v * 60), 60),
        x: expl('tg(a + b) = (tg a + tg b)/(1 − tg a·tg b)', 'Não basta somar as tangentes.', `(${fracao(ta * 60, 60)} + ${fracao(tb * 60, 60)}) ÷ (1 − ${fracao(ta * tb * 3600, 3600)}) = ${fracao(Math.round(t * 60), 60)}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 11 Estatística
const estat = [
  [
    (r) => {
      const [a, b] = r.pick([[4, 9], [2, 8], [1, 16], [3, 12], [4, 25], [9, 16]]);
      return {
        e: `Qual é a média geométrica dos números ${a} e ${b}?`,
        r: Math.sqrt(a * b),
        d: [(a + b) / 2, a * b, (2 * a * b) / (a + b), Math.sqrt(a + b)],
        x: expl('média geométrica = √(a·b)', 'Usada para taxas de crescimento: multiplica e tira a raiz.', `√(${a} × ${b}) = √${a * b} = ${num(Math.sqrt(a * b))}.`),
      };
    },
    (r) => {
      const vals = r.sample([1, 2, 3, 4, 5, 6], 4).sort((x, y) => x - y);
      const fr = vals.map(() => r.int(1, 5));
      const tot = fr.reduce((s, x) => s + x, 0);
      if (tot % 2 === 0) throw new Error('quero n ímpar');
      let acum = 0, med = 0;
      for (let i = 0; i < vals.length; i++) {
        acum += fr[i];
        if (acum >= (tot + 1) / 2) { med = vals[i]; break; }
      }
      return {
        e: `Numa pesquisa sobre o número de livros lidos no ano, as respostas foram: ${vals.map((v, i) => `${v} livro${v > 1 ? 's' : ''} (${fr[i]} pessoa${fr[i] > 1 ? 's' : ''})`).join(', ')}. Qual é a mediana?`,
        r: med,
        d: [vals[fr.indexOf(Math.max(...fr))] === med ? vals[3] : vals[fr.indexOf(Math.max(...fr))], (vals[0] + vals[3]) / 2, vals.reduce((s, v, i) => s + v * fr[i], 0) / tot, tot / 2],
        x: expl('mediana numa tabela de frequências', `São ${tot} respostas; a mediana é a de posição ${(tot + 1) / 2} na lista ordenada. Vá somando as frequências.`, `A ${(tot + 1) / 2}ª resposta é ${med}.`),
      };
    },
    (r) => {
      const notas = Array.from({ length: 5 }, () => r.int(4, 10));
      const m = notas.reduce((s, x) => s + x, 0) / 5;
      if (!Number.isInteger(m * 10)) throw new Error('média feia');
      const i = notas.indexOf(Math.max(...notas));
      return {
        e: `As notas de ${nome(r)} foram ${notas.join(', ')}. Quanto a maior nota está acima da média?`,
        r: notas[i] - m,
        d: [m, notas[i], notas[i] - Math.min(...notas), m - Math.min(...notas)],
        x: expl('desvio = valor − média', 'Primeiro a média, depois a diferença.', `média = ${num(m)}; ${notas[i]} − ${num(m)} = ${num(notas[i] - m)}.`),
      };
    },
    (r) => {
      const n1 = r.pick([10, 20, 30]), m1 = r.pick([6, 7, 8]), n2 = r.pick([10, 20, 30]), m2 = r.pick([5, 6, 9]);
      const m = (n1 * m1 + n2 * m2) / (n1 + n2);
      if (n1 === n2 || m1 === m2) throw new Error('trivial');
      return {
        e: `Uma turma de ${n1} alunos teve média ${m1} e outra, de ${n2} alunos, média ${m2}. Qual é a média geral dos ${n1 + n2} alunos?`,
        r: m,
        d: [(m1 + m2) / 2, m1 + m2, (n1 * m2 + n2 * m1) / (n1 + n2), m + 1],
        x: expl('média de grupos de tamanhos diferentes = média ponderada', 'Some os totais de pontos e divida pelo total de alunos.', `(${n1} × ${m1} + ${n2} × ${m2}) ÷ ${n1 + n2} = ${num(m)}.`),
      };
    },
  ],
  [
    (r) => {
      const dados = r.sample([2, 3, 5, 6, 7, 8, 9, 11, 12, 14, 15, 18], 7).sort((x, y) => x - y);
      const q1 = dados[1], q3 = dados[5];
      return {
        e: `Os dados ordenados ${dados.join(', ')} têm mediana ${dados[3]}. Tomando o 1º quartil como a mediana da metade de baixo (${dados.slice(0, 3).join(', ')}) e o 3º como a da metade de cima (${dados.slice(4).join(', ')}), qual é a amplitude interquartil (Q3 − Q1)?`,
        r: q3 - q1,
        d: [dados[6] - dados[0], q3, q1, dados[3] - q1],
        x: expl('amplitude interquartil = Q3 − Q1', 'Mede a dispersão dos 50% centrais, sem ser afetada pelos extremos.', `Q1 = ${q1}; Q3 = ${q3}; Q3 − Q1 = ${q3 - q1}.`),
      };
    },
    (r) => {
      const n = r.pick([4, 5, 9]), m = r.pick([6, 7, 8]), novo = r.pick([2, 3, 10, 12]);
      const nm = (n * m + novo) / (n + 1);
      if (!Number.isInteger(nm * 10)) throw new Error('feia');
      return {
        e: `A média de ${n} números é ${m}. Acrescentando o número ${novo}, qual é a nova média?`,
        r: nm,
        d: [(m + novo) / 2, (n * m + novo) / n, m, nm + 1],
        x: expl('trabalhar com a soma', 'A média vezes a quantidade dá a soma; some o novo número e divida pela nova quantidade.', `(${n} × ${m} + ${novo}) ÷ ${n + 1} = ${num(nm)}.`),
      };
    },
    (r) => {
      const vals = r.sample([10, 12, 14, 15, 16, 18, 20, 22, 25, 30], 6);
      const m = vals.reduce((s, x) => s + x, 0) / 6;
      const acima = vals.filter((v) => v > m).length;
      return {
        e: `Os gastos diários de uma loja (em centenas de reais) foram ${vals.join(', ')}. Em quantos dias o gasto ficou acima da média?`,
        r: acima,
        d: [6 - acima, 3, acima + 1, Math.max(0, acima - 1)].filter((x) => x !== acima),
        x: expl('primeiro a média, depois compare', 'A média não divide os dados ao meio (isso é a mediana).', `média = ${num(m)}; acima dela: ${vals.filter((v) => v > m).join(', ')}.`),
      };
    },
  ],
  [
    (r) => {
      const v = r.pick([4, 9, 16, 25]), k = r.pick([2, 3, 10]);
      return {
        e: `Um conjunto de dados tem variância ${v}. Se todos os valores forem multiplicados por ${k}, qual será a nova variância?`,
        r: v * k * k,
        d: [v * k, v, v + k, Math.sqrt(v) * k],
        x: expl('variância e escala: multiplicar os dados por k multiplica a variância por k²', 'Os desvios ficam k vezes maiores, e a variância usa os desvios ao quadrado.', `${v} × ${k}² = ${v * k * k}.`),
      };
    },
    (r) => {
      const a = r.pick([2, 4, 6, 10]), b = a + r.pick([4, 6, 8, 10]);
      return {
        e: `Qual é o desvio padrão (populacional) do conjunto {${a}, ${b}}?`,
        r: (b - a) / 2,
        d: [b - a, ((b - a) / 2) ** 2, (a + b) / 2, Math.sqrt(b - a)],
        x: expl('desvio padrão = raiz da média dos quadrados dos desvios', `A média é ${(a + b) / 2}; os dois valores ficam a ${(b - a) / 2} dela.`, `variância = ${((b - a) / 2) ** 2}; desvio padrão = ${(b - a) / 2}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 12 Combinatória
const combin = [
  [
    (r) => {
      const tipo = r.pick(['distintos', 'quaisquer']);
      return {
        e: `Quantos números de três algarismos existem${tipo === 'distintos' ? ' com os três algarismos diferentes' : ''}?`,
        r: tipo === 'distintos' ? 648 : 900,
        d: tipo === 'distintos' ? [720, 900, 504, 1000] : [1000, 999, 648, 729],
        x: expl('princípio multiplicativo, começando pela casa com restrição', 'O primeiro algarismo não pode ser zero.', tipo === 'distintos' ? '9 × 9 × 8 = 648.' : '9 × 10 × 10 = 900.'),
      };
    },
    (r) => {
      const n = r.pick([2, 3, 4]);
      return {
        e: `Lançam-se ${n} moedas e um dado comum. Quantos resultados diferentes são possíveis (considerando as moedas distintas)?`,
        r: 2 ** n * 6,
        d: [2 * n + 6, 2 ** n + 6, 2 * n * 6, 6 ** n],
        x: expl('princípio multiplicativo', `Cada moeda tem 2 resultados e o dado, 6.`, `2${sup(n)} × 6 = ${2 ** n * 6}.`),
      };
    },
  ],
  [
    (r) => {
      const m = r.pick([2, 3, 4, 5]), n = r.pick([2, 3, 4]);
      return {
        e: `Numa grade de ruas, ${nome(r)} precisa andar ${m} quarteirões para a direita e ${n} para cima, sempre se aproximando do destino. Quantos caminhos diferentes existem?`,
        r: comb(m + n, m),
        d: [m * n, 2 ** (m + n), fatorial(m + n), m + n],
        x: expl('caminhos na grade = combinação (escolher quando ir para a direita)', `São ${m + n} passos; basta escolher quais ${m} serão para a direita.`, `C(${m + n}, ${m}) = ${comb(m + n, m)}.`),
      };
    },
    (r) => {
      const n = r.pick([5, 6, 8, 10, 12, 20]);
      return {
        e: `Quantas diagonais tem um polígono convexo de ${n} lados?`,
        r: (n * (n - 3)) / 2,
        d: [n * (n - 3), comb(n, 2), n * (n - 1), (n * (n - 2)) / 2],
        x: expl('diagonais = pares de vértices − lados', 'Cada par de vértices forma um lado ou uma diagonal.', `C(${n}, 2) − ${n} = ${comb(n, 2)} − ${n} = ${(n * (n - 3)) / 2}.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.pick([4, 5, 6]);
      const total = fatorial(n), juntos = 2 * fatorial(n - 1);
      return {
        e: `De quantas maneiras ${n} pessoas podem se sentar em fila se duas delas (que brigaram) não podem ficar lado a lado?`,
        r: total - juntos,
        d: [total, juntos, total - fatorial(n - 1), fatorial(n - 2)],
        x: expl('complementar + técnica do bloco', `Total: ${n}! = ${total}. Juntas: trate as duas como um bloco (${n - 1}! arrumações × 2 ordens) = ${juntos}.`, `${total} − ${juntos} = ${total - juntos}.`),
      };
    },
    (r) => {
      const n = r.pick([7, 8, 9, 10]), k = r.pick([3, 4]);
      const res = comb(n, k) - comb(n - 2, k - 2);
      return {
        e: `De um grupo de ${n} pessoas será formada uma comissão de ${k}. Duas delas, Ana e Bruno, não aceitam participar juntas. Quantas comissões são possíveis?`,
        r: res,
        d: [comb(n, k), comb(n - 2, k), comb(n - 2, k - 2), comb(n, k) - comb(n - 2, k)],
        x: expl('complementar: total − comissões com os dois', `Com Ana e Bruno juntos, faltam escolher ${k - 2} entre ${n - 2}: C(${n - 2}, ${k - 2}).`, `C(${n}, ${k}) − C(${n - 2}, ${k - 2}) = ${comb(n, k)} − ${comb(n - 2, k - 2)} = ${res}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 13 Probabilidade
const prob = [
  [
    (r) => {
      const n = r.pick([10, 20, 30]);
      const primos = Array.from({ length: n }, (_, i) => i + 1).filter((x) => x > 1 && Array.from({ length: x - 2 }, (_, j) => j + 2).every((d) => x % d !== 0)).length;
      return {
        e: `Um número de 1 a ${n} é sorteado ao acaso. Qual é a probabilidade de ser primo?`,
        r: primos / n,
        d: [(primos - 1) / n, (primos + 1) / n, (primos + 2) / n, 0.5],
        f: (v) => fracao(Math.round(v * n), n),
        x: expl('casos favoráveis ÷ casos possíveis', `Os primos até ${n} são ${primos} (lembre: 1 não é primo; 2 é).`, `${primos}/${n} = ${fracao(primos, n)}.`),
      };
    },
    (r) => {
      const [evento, fav] = r.pick([['ser de copas', 13], ['ser um rei', 4], ['ser uma figura (valete, dama ou rei)', 12], ['ser vermelha', 26], ['ser o ás de espadas', 1]]);
      return {
        e: `Uma carta é tirada ao acaso de um baralho comum de 52 cartas. Qual é a probabilidade de ${evento}?`,
        r: fav,
        d: [fav + 1, 52 - fav, fav * 2, Math.max(1, fav - 1)],
        f: (v) => fracao(v, 52),
        x: expl('casos favoráveis ÷ 52', 'O baralho tem 4 naipes de 13 cartas.', `${fav}/52 = ${fracao(fav, 52)}.`),
      };
    },
    (r) => {
      const n = r.pick([50, 80, 100, 200]), k = r.pick([12, 20, 35, 40]);
      return {
        e: `Uma tachinha foi lançada ${n} vezes e caiu com a ponta para cima ${k} vezes. Qual é a estimativa da probabilidade de cair com a ponta para cima?`,
        r: (k / n) * 100,
        d: [((n - k) / n) * 100, 50, k, (k / (n - k)) * 100],
        f: pct,
        x: expl('probabilidade experimental = frequência relativa', 'Sem um modelo teórico, estima-se pela proporção observada em muitas repetições.', `${k} ÷ ${n} = ${num((k / n) * 100)}%.`),
      };
    },
    (r) => {
      const v = r.pick([2, 3, 4, 5]), [num_, den] = r.pick([[1, 4], [1, 3], [1, 5], [2, 5]]);
      const total = (v * den) / num_;
      if (!Number.isInteger(total)) throw new Error('feio');
      return {
        e: `Uma urna tem ${v} bolas vermelhas e algumas azuis. Para que a probabilidade de tirar uma vermelha seja ${num_}/${den}, quantas bolas azuis deve haver?`,
        r: total - v,
        d: [total, v * den, den - num_, v * (den - num_) + 1],
        x: expl('probabilidade = favoráveis ÷ total; isolar o total', `${v}/total = ${num_}/${den} → total = ${total}.`, `Azuis = ${total} − ${v} = ${total - v}.`),
      };
    },
  ],
  [
    (r) => {
      const face = r.int(1, 6);
      return {
        e: `Num dado viciado, a probabilidade de cada face é proporcional ao seu número (a face 6 é seis vezes mais provável que a face 1). Qual é a probabilidade de sair a face ${face}?`,
        r: face,
        d: [1, 6, 7 - face, face + 1].filter((x) => x !== face),
        f: (v) => fracao(v, 21),
        x: expl('pesos proporcionais: divida pela soma dos pesos', 'Os pesos 1 + 2 + … + 6 somam 21.', `P(${face}) = ${face}/21${fracao(face, 21) !== `${face}/21` ? ` = ${fracao(face, 21)}` : ''}.`),
      };
    },
    (r) => {
      const L = r.pick([10, 20, 12]), a = r.pick([2, 3, 4, 5]);
      return {
        e: `Um ponto é escolhido ao acaso num segmento de ${L} cm. Qual é a probabilidade de ele ficar a menos de ${a} cm de uma das pontas (qualquer uma)?`,
        r: (2 * a) / L,
        d: [a / L, (L - 2 * a) / L, (2 * a) / (L - 2 * a), a / (2 * L)],
        f: (v) => fracao(Math.round(v * L * 2), L * 2),
        x: expl('probabilidade geométrica = comprimento favorável ÷ total', `Há ${a} cm favoráveis perto de cada ponta.`, `${2 * a}/${L} = ${fracao(2 * a, L)}.`),
      };
    },
    (r) => {
      const custo = r.pick([2, 5, 10]), premio = r.pick([20, 50, 100]), [pn, pd] = r.pick([[1, 10], [1, 20], [1, 25], [1, 50]]);
      const E = (premio * pn) / pd - custo;
      return {
        e: `Num jogo, paga-se R$ ${custo} para jogar e ganha-se R$ ${premio} com probabilidade ${pn}/${pd}. Qual é o ganho esperado (valor esperado) por jogada?`,
        r: E,
        d: [(premio * pn) / pd, premio - custo, -custo, E + custo / 2],
        f: (v) => `${v < 0 ? '−' : ''}R$ ${num(Math.abs(v), 2)}`,
        x: expl('valor esperado = Σ valor × probabilidade', 'Em média, o prêmio rende prêmio × probabilidade; desconte o custo, que se paga sempre.', `${premio} × ${pn}/${pd} − ${custo} = ${num(E, 2)} reais por jogada.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.pick([2, 3, 4]);
      let p = 1;
      for (let i = 0; i < n; i++) p *= (12 - i) / 12;
      return {
        e: `Qual é a probabilidade de ${n} pessoas, escolhidas ao acaso, terem nascido em meses todos diferentes? (considere os 12 meses igualmente prováveis)`,
        r: p * 100,
        d: [(1 - p) * 100, (11 / 12) * 100, (1 / 12) * 100, ((12 - n) / 12) * 100],
        f: pct,
        x: expl('regra do "e" sem repetição', `A 1ª pode nascer em qualquer mês; a 2ª em 11 dos 12; …`, `${Array.from({ length: n }, (_, i) => `${12 - i}/12`).join(' × ')} ≈ ${num(p * 100)}%.`),
      };
    },
    (r) => {
      const s = r.pick([3, 4, 18]);
      const fav = s === 3 || s === 18 ? 1 : 3;
      return {
        e: `Três dados comuns são lançados. Qual é a probabilidade de a soma dar ${s}?`,
        r: fav,
        d: [fav + 1, 6, 18, fav * 6].filter((x) => x !== fav),
        f: (v) => fracao(v, 216),
        x: expl('casos favoráveis ÷ 6³', s === 4 ? 'Soma 4 só com (1, 1, 2) em 3 ordens.' : `Soma ${s} só com todos os dados iguais a ${s / 3}.`, `${fav}/216${fav > 1 ? ` = ${fracao(fav, 216)}` : ''}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 14 Grandezas e medidas
const grand = [
  [
    (r) => {
      const km = r.pick([120, 240, 360, 450, 600]), kml = r.pick([10, 12, 15]);
      return {
        e: `Um carro faz ${kml} km por litro. Quantos litros gasta numa viagem de ${km} km?`,
        r: km / kml,
        d: [km * kml, kml / km, km / kml + kml, km / (kml * 2)],
        f: (v) => `${num(v)} L`,
        x: expl('consumo = distância ÷ rendimento', `Cada litro leva ${kml} km.`, `${km} ÷ ${kml} = ${num(km / kml)} L.`),
      };
    },
    (r) => {
      const mm = r.pick([5, 10, 20, 35, 50]), A = r.pick([10, 50, 100, 200]);
      return {
        e: `Choveram ${mm} mm numa região. Quantos litros de água caíram sobre um telhado de ${A} m²? (1 mm de chuva = 1 litro por m²)`,
        r: mm * A,
        d: [mm, (mm * A) / 1000, A / mm, mm * A * 10],
        f: (v) => `${num(v)} L`,
        x: expl('1 mm de chuva = 1 L/m²', 'Uma lâmina de 1 mm sobre 1 m² tem 0,001 m³ = 1 L.', `${mm} × ${A} = ${num(mm * A)} L.`),
      };
    },
    (r) => {
      const MB = r.pick([100, 200, 500, 1000]), Mbps = r.pick([10, 20, 50, 100]);
      const t = (MB * 8) / Mbps;
      return {
        e: `Uma internet de ${Mbps} Mbps (megabits por segundo) baixa um arquivo de ${MB} MB (megabytes). Quanto tempo leva, no mínimo? (1 byte = 8 bits)`,
        r: t,
        d: [MB / Mbps, (MB * Mbps) / 8, t * 8, t / 2],
        f: (v) => `${num(v)} s`,
        x: expl('mesma unidade antes de dividir', 'Converta megabytes para megabits (× 8).', `${MB} MB = ${MB * 8} Mb; ${MB * 8} ÷ ${Mbps} = ${num(t)} s.`),
      };
    },
  ],
  [
    (r) => {
      const [a, b] = r.pick([[200, 300], [500, 400], [1000, 250], [400, 800], [250, 600]]);
      const ha = (a * b) / 10000;
      return {
        e: `Um terreno retangular mede ${a} m por ${b} m. Qual é a sua área em hectares? (1 ha = 10 000 m²)`,
        r: ha,
        d: [a * b, (a * b) / 1000, (a * b) / 100, (2 * (a + b)) / 10000],
        f: (v) => `${num(v)} ha`,
        x: expl('área em m², depois ÷ 10 000', '1 hectare é um quadrado de 100 m × 100 m.', `${a} × ${b} = ${num(a * b)} m² = ${num(ha)} ha.`),
      };
    },
    (r) => {
      const [g1, p1, g2, p2] = r.pick([[500, 6, 1000, 11], [200, 3.6, 500, 8], [400, 9.2, 1000, 22], [250, 5, 750, 16.5]]);
      const k1 = p1 / (g1 / 1000), k2 = p2 / (g2 / 1000);
      const melhor = Math.min(k1, k2);
      return {
        e: `Um café é vendido em pacote de ${g1} g por R$ ${num(p1, 2)} ou de ${g2} g por R$ ${num(p2, 2)}. Qual é o menor preço por quilo entre as duas opções?`,
        r: melhor,
        d: [Math.max(k1, k2), p1 + p2, Math.abs(k1 - k2), p2],
        f: (v) => `R$ ${num(v, 2)}`,
        x: expl('taxa unitária: preço por kg', 'Divida cada preço pela massa em kg e compare.', `${num(p1, 2)} ÷ ${num(g1 / 1000)} = R$ ${num(k1, 2)}/kg; ${num(p2, 2)} ÷ ${num(g2 / 1000)} = R$ ${num(k2, 2)}/kg.`),
      };
    },
    (r) => {
      const dose = r.pick([5, 10, 15, 20]), peso = r.pick([12, 20, 24, 30]), conc = r.pick([50, 100, 200]);
      const mg = dose * peso, mL = mg / conc;
      return {
        e: `A dose de um remédio é ${dose} mg por kg de peso. Uma criança tem ${peso} kg e o xarope tem ${conc} mg em cada mL. Quantos mL ela deve tomar?`,
        r: mL,
        d: [mg, (dose * conc) / peso, mL * 2, peso / dose],
        f: (v) => `${num(v)} mL`,
        x: expl('encadear razões: mg/kg → mg → mL', 'Calcule a dose total e depois o volume que contém essa dose.', `${dose} × ${peso} = ${mg} mg; ${mg} ÷ ${conc} = ${num(mL)} mL.`),
      };
    },
  ],
  [
    (r) => {
      const mph = r.pick([50, 60, 75, 100]);
      return {
        e: `Uma placa nos EUA limita a velocidade a ${mph} milhas por hora. Quanto é isso em km/h? (1 milha ≈ 1,6 km)`,
        r: mph * 1.6,
        d: [mph / 1.6, mph * 1.6 / 3.6, mph + 1.6, mph * 16],
        f: (v) => `${num(v)} km/h`,
        x: expl('fator de conversão', 'Cada milha vale 1,6 km.', `${mph} × 1,6 = ${num(mph * 1.6)} km/h.`),
      };
    },
    (r) => {
      const [mat, d] = r.pick([['concreto', 2.4], ['aço', 7.8], ['madeira', 0.6], ['gelo', 0.9]]);
      const V = r.pick([5, 10, 20, 50]);
      return {
        e: `Qual é a massa, em toneladas, de ${V} m³ de ${mat}, cuja densidade é ${num(d)} g/cm³?`,
        r: V * d,
        d: [V / d, V * d * 1000, (V * d) / 10, V * d * 10],
        f: (v) => `${num(v)} t`,
        x: expl('1 g/cm³ = 1 t/m³', '1 m³ = 1 000 000 cm³ e 1 t = 1 000 000 g: as duas unidades "andam juntas".', `${V} × ${num(d)} = ${num(V * d)} t.`),
      };
    },
    (r) => {
      const esc = r.pick([10000, 20000, 50000]), Acm = r.pick([2, 4, 5, 10]);
      const km2 = (Acm * esc * esc) / 1e10;
      return {
        e: `Num mapa de escala 1 : ${num(esc)}, uma região ocupa ${Acm} cm². Qual é a sua área real, em km²?`,
        r: km2,
        d: [(Acm * esc) / 1e5, km2 * 100, km2 * 10, km2 / 10],
        f: (v) => `${num(v)} km²`,
        x: expl('áreas na razão do quadrado da escala', `Cada 1 cm do mapa vale ${num(esc / 100000)} km; 1 cm² vale (${num(esc / 100000)})² km².`, `${Acm} × ${num((esc / 100000) ** 2, 4)} = ${num(km2)} km².`),
      };
    },
    (r) => {
      const gotasPorMin = r.pick([20, 30, 40, 60]), gotasPorMl = 20;
      const L = (gotasPorMin * 60 * 24 * 30) / gotasPorMl / 1000;
      return {
        e: `Uma torneira pinga ${gotasPorMin} gotas por minuto, e 20 gotas formam 1 mL. Quantos litros ela desperdiça em 30 dias?`,
        r: L,
        d: [L * 1000, L / 30, (gotasPorMin * 60 * 24) / gotasPorMl / 1000, L * 20],
        f: (v) => `${num(v)} L`,
        x: expl('encadear conversões', 'gotas/min → gotas/mês → mL → L.', `${gotasPorMin} × 60 × 24 × 30 = ${num(gotasPorMin * 43200)} gotas = ${num((gotasPorMin * 43200) / 20)} mL = ${num(L)} L.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 15 Matrizes e determinantes
const m2 = (m) => `[${m[0][0]} ${m[0][1]}; ${m[1][0]} ${m[1][1]}]`;
const NOTA = '(Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)';
const det2 = (m) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
const matrizes = [
  [
    (r) => {
      const k = r.pick([2, 3, -2, 5]), A = [[r.int(-3, 5), r.int(-3, 5)], [r.int(-3, 5), r.int(-3, 5)]];
      const i = r.int(0, 1), j = r.int(0, 1);
      return {
        e: `Dada A = ${m2(A)}, qual é o elemento da linha ${i + 1}, coluna ${j + 1}, da matriz ${k}A? ${NOTA}`,
        r: k * A[i][j],
        d: [A[i][j], k + A[i][j], k * A[j][i] === k * A[i][j] ? k * A[i][j] + k : k * A[j][i], -k * A[i][j]],
        x: expl('produto por escalar: multiplica cada elemento', `O elemento a${i + 1}${j + 1} = ${A[i][j]} vira ${k} × ${P(A[i][j])}.`, `= ${k * A[i][j]}.`),
      };
    },
    (r) => {
      const A = [[r.int(-5, 9), r.int(-5, 9), r.int(-5, 9)], [r.int(-5, 9), r.int(-5, 9), r.int(-5, 9)], [r.int(-5, 9), r.int(-5, 9), r.int(-5, 9)]];
      const tr = A[0][0] + A[1][1] + A[2][2];
      return {
        e: `O traço de uma matriz quadrada é a soma dos elementos da diagonal principal. Qual é o traço de [${A.map((l) => l.join(' ')).join('; ')}]? ${NOTA}`,
        r: tr,
        d: [A[0][2] + A[1][1] + A[2][0], A[0][0] * A[1][1] * A[2][2], tr + 1, A[0][0] + A[0][1] + A[0][2]],
        x: expl('diagonal principal: elementos aᵢᵢ', 'São os elementos com linha igual à coluna.', `${A[0][0]} + ${P(A[1][1])} + ${P(A[2][2])} = ${tr}.`),
      };
    },
    (r) => {
      const m = r.int(2, 5), n = r.int(2, 5), p = r.int(2, 5);
      return {
        e: `A é uma matriz ${m}×${n} e B é ${n}×${p}. Qual é a ordem da matriz produto A·B?`,
        r: `${m}×${p}`,
        d: [`${n}×${n}`, `${p}×${m}`, `${m}×${n}`, `${n}×${p}`, `${m + p}×${n}`].filter((x) => x !== `${m}×${p}`),
        x: expl('produto A(m×n)·B(n×p) = m×p', 'As dimensões "internas" (colunas de A e linhas de B) precisam ser iguais e "somem".', `${m}×${n} · ${n}×${p} → ${m}×${p}.`),
      };
    },
    (r) => {
      const a = r.int(1, 6), b = r.int(1, 6);
      return {
        e: `A matriz [${a} (x − 3); ${b} 5] é simétrica (igual à sua transposta). Qual é o valor de x? ${NOTA}`,
        r: b + 3,
        d: [b, b - 3, a + 3, b + 5],
        x: expl('matriz simétrica: aᵢⱼ = aⱼᵢ', 'O elemento da linha 1, coluna 2 deve ser igual ao da linha 2, coluna 1.', `x − 3 = ${b} → x = ${b + 3}.`),
      };
    },
    (r) => {
      const d = [r.int(-4, 6), r.int(-4, 6), r.int(-4, 6)].map((v) => v || 2);
      const D = d[0] * d[1] * d[2];
      return {
        e: `Qual é o determinante da matriz diagonal [${d[0]} 0 0; 0 ${d[1]} 0; 0 0 ${d[2]}]? ${NOTA}`,
        r: D,
        d: [d[0] + d[1] + d[2], 0, -D, d[0] * d[1]],
        x: expl('matriz diagonal (ou triangular): det = produto da diagonal', 'Todos os outros termos da regra de Sarrus têm um zero.', `${d[0]} × ${P(d[1])} × ${P(d[2])} = ${D}.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.pick([2, 3]), k = r.pick([2, 3, -2]), D = r.pick([2, 3, 4, 5, -1]);
      return {
        e: `Uma matriz quadrada A de ordem ${n} tem det A = ${D}. Quanto vale det(${k}A)?`,
        r: k ** n * D,
        d: [k * D, k * n * D, D, k ** (n + 1) * D],
        x: expl('det(k·A) = kⁿ·det A', `Multiplicar a matriz por ${k} multiplica cada uma das ${n} linhas por ${k}.`, `${P(k)}${sup(n)} × ${P(D)} = ${k ** n * D}.`),
      };
    },
    (r) => {
      const D = r.pick([2, 4, 5, -2, 10]);
      return {
        e: `Se det A = ${D}, quanto vale det(A⁻¹)?`,
        r: `${D < 0 ? '−' : ''}1/${Math.abs(D)}`,
        d: [`${D}`, `${-D}`, `${D < 0 ? '' : '−'}1/${Math.abs(D)}`, '1'],
        x: expl('teorema de Binet: det(A)·det(A⁻¹) = det(I) = 1', 'O determinante da inversa é o inverso do determinante.', `det(A⁻¹) = 1/${P(D)}.`),
      };
    },
    (r) => {
      const [x, y] = [r.int(-4, 6), r.int(-4, 6)];
      const a = r.pick([1, 2, 3]), b = r.pick([1, 2, -1]), c = r.pick([1, 3, -1]), d = r.pick([2, 1, -2]);
      if (a * d - b * c === 0) throw new Error('sistema singular');
      return {
        e: `Resolva o sistema { ${a}x + ${b}y = ${a * x + b * y}; ${c}x + ${d}y = ${c * x + d * y} }. Qual é o valor de x?`.replace(/\+ -/g, '− ').replace(/ 1x/g, ' x').replace(/ 1y/g, ' y'),
        r: x,
        d: [y, -x, x + y, x + 1],
        x: expl('substituição ou escalonamento', 'Elimine uma das incógnitas combinando as equações.', `x = ${x} e y = ${y} (confira nas duas equações).`),
      };
    },
    (r) => {
      const A = [[r.int(-2, 3), r.int(-2, 3)], [r.int(-2, 3), r.int(-2, 3)]];
      const i = r.int(0, 1), j = r.int(0, 1);
      const A2 = A[i][0] * A[0][j] + A[i][1] * A[1][j];
      return {
        e: `Dada A = ${m2(A)}, qual é o elemento da linha ${i + 1}, coluna ${j + 1}, de A²? ${NOTA}`,
        r: A2,
        d: [A[i][j] ** 2, 2 * A[i][j], A2 + 1, A[i][0] * A[1][j] + A[i][1] * A[0][j]],
        x: expl('A² = A·A (linha × coluna), não é elevar cada elemento', `Linha ${i + 1} de A vezes coluna ${j + 1} de A.`, `${A[i][0]} × ${P(A[0][j])} + ${A[i][1]} × ${P(A[1][j])} = ${A2}.`),
      };
    },
    (r) => {
      const tipo = r.pick(['SPD', 'SPI', 'SI']);
      const a = r.pick([1, 2, 3]), b = r.pick([1, 2, -1]), c = r.pick([2, 4, 5]);
      const k = r.pick([2, 3]);
      const eq2 = tipo === 'SPD' ? [a + 1, b, c + 1] : tipo === 'SPI' ? [k * a, k * b, k * c] : [k * a, k * b, k * c + 1];
      const fmt = (p, q, s) => `${p}x ${q < 0 ? '−' : '+'} ${Math.abs(q)}y = ${s}`.replace(/^1x/, 'x').replace(/ 1y/, ' y');
      const nomes = { SPD: 'possível e determinado (uma única solução)', SPI: 'possível e indeterminado (infinitas soluções)', SI: 'impossível (nenhuma solução)' };
      return {
        e: `Como se classifica o sistema { ${fmt(a, b, c)}; ${fmt(...eq2)} }?`,
        r: nomes[tipo],
        d: [...Object.values(nomes).filter((v) => v !== nomes[tipo]), 'possível com exatamente duas soluções', 'impossível, porque o determinante é diferente de zero'],
        x: expl('comparar as equações (ou o determinante)', tipo === 'SPD' ? 'Os coeficientes não são proporcionais: det ≠ 0, solução única.' : tipo === 'SPI' ? `A 2ª equação é a 1ª multiplicada por ${k}: são a mesma reta.` : `Os coeficientes de x e y são proporcionais (× ${k}), mas o termo independente não: retas paralelas.`, `Sistema ${nomes[tipo]}.`),
      };
    },
  ],
  [
    (r) => {
      const a = r.pick([1, 2, 3]), b = r.pick([2, 3, 4, 6]), c = r.pick([1, 2, 3]);
      const k = (b * c) / a;
      if (!Number.isInteger(k)) throw new Error('k feio');
      return {
        e: `Para que valor de k o sistema { ${a}x + ${b}y = 5; ${c}x + ky = 7 } NÃO tem solução única?`.replace(/ 1x/g, ' x'),
        r: k,
        d: [-k, (a * c) / b, b + c - a, k + 1].filter((v) => v !== k),
        x: expl('solução única ⇔ det ≠ 0', 'O sistema deixa de ter solução única quando o determinante dos coeficientes zera.', `det = ${a}k − ${b} × ${c} = 0 → k = ${k}.`),
      };
    },
    (r) => {
      const a = r.int(1, 4), b = r.int(1, 4), c = r.int(1, 4);
      // det [x 1 0; a b 1; c 0 1] = x(b) − 1(a − c) = 0 → x = (a − c)/b
      const xn = a - c, xd = b;
      return {
        e: `Para que valor de x o determinante da matriz [x 1 0; ${a} ${b} 1; ${c} 0 1] é igual a zero? ${NOTA}`,
        r: xn / xd,
        d: [(c - a) / xd, xn * xd, xd / (xn || 1), (a + c) / xd],
        f: (v) => fracao(Math.round(v * xd), xd),
        x: expl('equação com determinante (Laplace na 1ª linha)', `det = x·(${b}·1 − 1·0) − 1·(${a}·1 − 1·${c}) + 0 = ${b}x − ${a - c}.`, `${b}x = ${a - c} → x = ${fracao(xn, xd)}.`),
      };
    },
    (r) => {
      const A = ate(() => [[r.int(1, 5), r.int(1, 5)], [r.int(1, 5), r.int(1, 5)]], (m) => Math.abs(det2(m)) === 1);
      const D = det2(A);
      const inv = [[A[1][1] / D, -A[0][1] / D], [-A[1][0] / D, A[0][0] / D]];
      const i = r.int(0, 1), j = r.int(0, 1);
      return {
        e: `Qual é o elemento da linha ${i + 1}, coluna ${j + 1}, da inversa de A = ${m2(A)}? ${NOTA}`,
        r: inv[i][j],
        d: [A[i][j], -A[i][j], inv[j][i] === inv[i][j] ? inv[i][j] + 1 : inv[j][i], 1 / A[i][j]],
        x: expl('inversa 2×2: troca a diagonal, troca o sinal da outra e divide pelo det', `det A = ${D}; A⁻¹ = (1/${P(D)})·[${A[1][1]} ${-A[0][1]}; ${-A[1][0]} ${A[0][0]}].`, `Elemento: ${num(inv[i][j])}.`),
      };
    },
    (r) => {
      const x = r.int(-3, 4), y = r.int(-3, 4), z = r.int(-3, 4);
      return {
        e: `Resolva o sistema escalonado { x + y + z = ${x + y + z}; y + 2z = ${y + 2 * z}; 3z = ${3 * z} }. Qual é o valor de x?`.replace(/\+ -/g, '− '),
        r: x,
        d: [y, z, x + y + z, -x],
        x: expl('sistema escalonado: resolva de baixo para cima', `z = ${z}; y = ${y + 2 * z} − 2·${P(z)} = ${y}.`, `x = ${x + y + z} − ${P(y)} − ${P(z)} = ${x}.`),
      };
    },
    (r) => {
      const prod = [r.pick([2, 3, 5]), r.pick([4, 6, 8])];
      const lojas = [[r.int(1, 5), r.int(1, 5)], [r.int(1, 5), r.int(1, 5)]];
      const tot = lojas.map((l) => l[0] * prod[0] + l[1] * prod[1]);
      const i = r.int(0, 1);
      return {
        e: `A matriz Q = ${m2(lojas)} dá as quantidades vendidas (linhas: lojas 1 e 2; colunas: produtos A e B). Os preços são R$ ${prod[0]} (A) e R$ ${prod[1]} (B). Usando o produto de matrizes, qual é o faturamento da loja ${i + 1}? ${NOTA}`,
        r: tot[i],
        d: [tot[1 - i], tot[0] + tot[1], (lojas[i][0] + lojas[i][1]) * (prod[0] + prod[1]), lojas[i][0] * prod[1] + lojas[i][1] * prod[0]],
        f: (v) => `R$ ${num(v)}`,
        x: expl('produto linha × coluna em contexto', 'Faturamento = Σ quantidade × preço, que é a linha da loja vezes a coluna de preços.', `${lojas[i][0]} × ${prod[0]} + ${lojas[i][1]} × ${prod[1]} = R$ ${tot[i]}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 16 Geometria analítica
const analitica = [
  [
    (r) => {
      const a = r.pick([2, 3, 4, 1]), b = r.pick([3, 2, 6, 1, -2]), c = a * b * r.pick([1, 2]);
      return {
        e: `Em que ponto a reta ${a}x + ${b}y = ${c} corta o eixo y? Dê o valor de y.`.replace('+ -', '− ').replace(/ 1x/, ' x').replace(/ 1y/, ' y'),
        r: c / b,
        d: [c / a, -c / b, b / c, c],
        x: expl('eixo y ⇒ x = 0', 'Substitua x = 0 e isole y.', `${b}y = ${c} → y = ${num(c / b)}.`),
      };
    },
    (r) => {
      const m = r.pick([2, 3, -2, 4, -1]), n = r.int(-6, 6) || 4;
      const x0 = -n / m;
      return {
        e: `Em que valor de x a reta y = ${m}x ${n < 0 ? '−' : '+'} ${Math.abs(n)} corta o eixo x?`.replace(' 1x', ' x').replace('= -1x', '= −x'),
        r: x0,
        d: [n, n / m, -m / n, m],
        f: (v) => fracao(Math.round(v * Math.abs(m)) * Math.sign(m) * Math.sign(m), Math.abs(m)),
        x: expl('eixo x ⇒ y = 0', 'Iguale y a zero e isole x.', `0 = ${m}x ${n < 0 ? '−' : '+'} ${Math.abs(n)} → x = ${fracao(-n, m)}.`),
      };
    },
    (r) => {
      const a = r.int(-4, 5), b = r.int(-4, 5), raio = r.pick([2, 3, 4, 5]);
      return {
        e: `A circunferência de equação (x ${a < 0 ? '+' : '−'} ${Math.abs(a)})² + (y ${b < 0 ? '+' : '−'} ${Math.abs(b)})² = ${raio * raio} tem que raio?`,
        r: raio,
        d: [raio * raio, raio * 2, Math.abs(a) + Math.abs(b) || raio + 1, raio * raio / 2],
        x: expl('equação reduzida: (x − a)² + (y − b)² = r²', 'O número do lado direito é o raio ao quadrado.', `r = √${raio * raio} = ${raio}.`),
      };
    },
    (r) => {
      const x = r.int(-6, 6) || 3, y = r.int(-6, 6) || -2;
      const [eixo, res] = r.pick([['ao eixo x', [x, -y]], ['ao eixo y', [-x, y]], ['à origem', [-x, -y]]]);
      const fmt = (p) => `(${p[0]}, ${p[1]})`.replace(/-/g, '−');
      return {
        e: `Qual é o simétrico do ponto (${x}, ${y}) em relação ${eixo}?`.replace(/-/g, '−'),
        r: fmt(res),
        d: [fmt([x, -y]), fmt([-x, y]), fmt([-x, -y]), fmt([y, x]), fmt([-y, -x])].filter((p) => p !== fmt(res)),
        x: expl('simetria: troca o sinal da coordenada "perpendicular"', 'Em relação ao eixo x, muda o y; ao eixo y, muda o x; à origem, mudam os dois.', `Simétrico: ${fmt(res)}.`),
      };
    },
    (r) => {
      const k = r.int(-5, 5) || 3, tipo = r.pick(['horizontal', 'vertical']);
      const x = r.int(-4, 4), y = k;
      const resp = tipo === 'horizontal' ? `y = ${y}` : `x = ${x}`;
      return {
        e: `Qual é a equação da reta ${tipo} que passa pelo ponto (${x}, ${y})?`.replace(/-/g, '−'),
        r: resp.replace('-', '−'),
        d: [`y = ${x}`, `x = ${y}`, `y = ${y}x`, `y = x + ${y}`, `x = ${x}`, `y = ${y}`].map((s) => s.replace('-', '−')).filter((s) => s !== resp.replace('-', '−')),
        x: expl('retas paralelas aos eixos', 'Reta horizontal: todos os pontos têm o mesmo y. Vertical: o mesmo x.', `${resp}.`),
      };
    },
  ],
  [
    (r) => {
      const [a, b, c1, c2] = r.pick([[3, 4, 5, 15], [3, 4, 2, 12], [6, 8, 0, 20], [5, 12, 3, 29], [1, 1, 0, 4]]);
      const d = Math.abs(c2 - c1) / Math.hypot(a, b);
      return {
        e: `Qual é a distância entre as retas paralelas ${a}x + ${b}y + ${c1} = 0 e ${a}x + ${b}y + ${c2} = 0?`.replace(/ \+ 0 =/g, ' =').replace(/ 1x/g, ' x').replace(/ 1y/g, ' y'),
        r: d,
        d: [Math.abs(c2 - c1), Math.abs(c2 - c1) / (a + b), d * 2, Math.hypot(a, b)],
        x: expl('distância entre paralelas: |c₂ − c₁|/√(a² + b²)', 'É a distância de qualquer ponto de uma até a outra.', `|${c2} − ${c1}| ÷ √(${a}² + ${b}²) = ${Math.abs(c2 - c1)} ÷ ${num(Math.hypot(a, b))} = ${num(d)}.`),
      };
    },
    (r) => {
      const a = r.int(-4, 4), b = r.int(-4, 4), raio = r.pick([2, 3, 5]);
      const D = -2 * a, E = -2 * b, F = a * a + b * b - raio * raio;
      const termo = (c, l) => (c === 0 ? '' : ` ${c < 0 ? '−' : '+'} ${Math.abs(c)}${l}`);
      return {
        e: `Qual é a área do círculo limitado pela circunferência x² + y²${termo(D, 'x')}${termo(E, 'y')}${termo(F, '')} = 0? (π = 3)`,
        r: 3 * raio * raio,
        d: [3 * raio * 2, 2 * 3 * raio, 3 * Math.abs(F) || 3 * raio, 3 * (raio * raio + 1)],
        x: expl('completar quadrados para achar o raio', `Centro (${a}, ${b}); r² = ${a}² + ${b}² − (${F}) = ${raio * raio}.`, `Área = 3 × ${raio * raio} = ${3 * raio * raio}.`),
      };
    },
    (r) => {
      const A = [r.int(-5, 5), r.int(-5, 5)], M = [r.int(-5, 5), r.int(-5, 5)];
      const B = [2 * M[0] - A[0], 2 * M[1] - A[1]];
      const fmt = (p) => `(${p[0]}, ${p[1]})`.replace(/-/g, '−');
      return {
        e: `O ponto médio do segmento AB é M${fmt(M)}, e A = ${fmt(A)}. Quais são as coordenadas de B?`,
        r: fmt(B),
        d: [fmt([2 * M[0] + A[0], 2 * M[1] + A[1]]), fmt([M[0] - A[0], M[1] - A[1]]), fmt([A[0] + M[0], A[1] + M[1]]), fmt([2 * A[0] - M[0], 2 * A[1] - M[1]])].filter((p) => p !== fmt(B)),
        x: expl('ponto médio ao contrário: B = 2M − A', 'M é a média: M = (A + B)/2.', `B = (2·${M[0]} − ${P(A[0])}, 2·${M[1]} − ${P(A[1])}) = ${fmt(B)}.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[3, 4], [6, 8], [5, 12], [8, 15], [0, 7], [9, 12]]);
      return {
        e: `Uma circunferência tem centro em (${a}, ${b}) e passa pela origem. Qual é o seu raio?`,
        r: Math.hypot(a, b),
        d: [a + b, a * b, Math.hypot(a, b) ** 2, Math.max(a, b)],
        x: expl('raio = distância do centro a um ponto da circunferência', 'Use Pitágoras entre o centro e a origem.', `√(${a}² + ${b}²) = ${num(Math.hypot(a, b))}.`),
      };
    },
    (r) => {
      const [dx, dy] = r.pick([[1, 1], [1, -1], [1, 0]]);
      const ang = dy === 1 ? 45 : dy === -1 ? 135 : 0;
      const b = r.int(-4, 4);
      return {
        e: `Uma reta passa pelo ponto (0, ${b < 0 ? '−' + Math.abs(b) : b}) e forma ${ang}° com o eixo x (medido no sentido anti-horário). Qual é a sua equação?`,
        r: `y = ${dy === 0 ? '' : dy === 1 ? 'x' : '−x'}${dy === 0 ? b : b === 0 ? '' : ` ${b < 0 ? '−' : '+'} ${Math.abs(b)}`}`,
        d: [`y = x${b ? ` ${b < 0 ? '−' : '+'} ${Math.abs(b)}` : ''}`, `y = −x${b ? ` ${b < 0 ? '−' : '+'} ${Math.abs(b)}` : ''}`, `y = ${b}`.replace('-', '−'), `x = ${b}`.replace('-', '−'), `y = 2x${b ? ` ${b < 0 ? '−' : '+'} ${Math.abs(b)}` : ''}`],
        x: expl('m = tg θ', `tg ${ang}° = ${dy}; a reta corta o eixo y em ${b}.`, `y = ${dy}·x + ${b}.`.replace('+ -', '− ')),
      };
    },
  ],
  [
    (r) => {
      const a = r.int(-3, 3), b = r.int(-3, 3), [dx, dy] = r.pick([[3, 4], [4, 3], [1, 2], [2, 1], [1, 3], [3, -1]]);
      const mr = dy / dx, mt = -dx / dy;
      return {
        e: `O ponto (${a + dx}, ${b + dy}) pertence à circunferência de centro (${a}, ${b}). Qual é o coeficiente angular da reta tangente à circunferência nesse ponto?`.replace(/-/g, '−'),
        r: mt,
        d: [mr, -mr, 1 / mr, -mt],
        f: (v) => fracao(Math.round(v * dx * dy) , Math.abs(dx * dy)),
        x: expl('tangente ⊥ raio: m_t = −1/m_raio', `O raio tem inclinação ${fracao(dy, dx)}.`, `m = −1 ÷ (${fracao(dy, dx)}) = ${fracao(-dx, dy)}.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[2, 3], [3, 4], [4, 5], [2, 5], [6, 4]]), k = r.pick([1, 2]);
      const c = a * b * k;
      const area = (c / a) * (c / b) / 2;
      return {
        e: `Qual é a área do triângulo formado pela reta ${a}x + ${b}y = ${c} com os eixos coordenados?`,
        r: area,
        d: [(c / a) * (c / b), c / a + c / b, c, area / 2],
        x: expl('interceptos: triângulo retângulo com catetos nos eixos', `Corta o eixo x em ${c / a} e o eixo y em ${c / b}.`, `Área = ${c / a} × ${c / b} ÷ 2 = ${num(area)}.`),
      };
    },
    (r) => {
      const r1 = r.pick([2, 3, 4]), r2 = r.pick([1, 2, 5]);
      const casos = [
        ['tangentes externas', r1 + r2],
        ['secantes', Math.abs(r1 - r2) + 1 < r1 + r2 ? Math.abs(r1 - r2) + 1 : null],
        ['externas (sem ponto comum)', r1 + r2 + 2],
      ].filter((c) => c[1] != null && c[1] > Math.abs(r1 - r2));
      const [resp, d] = r.pick(casos);
      return {
        e: `Duas circunferências têm raios ${r1} e ${r2}, e a distância entre os centros é ${d}. Qual é a posição relativa entre elas?`,
        r: resp,
        d: ['tangentes externas', 'secantes', 'externas (sem ponto comum)', 'tangentes internas', 'concêntricas', 'uma interna à outra'].filter((x) => x !== resp),
        x: expl('compare a distância dos centros com r₁ + r₂ e |r₁ − r₂|', `r₁ + r₂ = ${r1 + r2} e |r₁ − r₂| = ${Math.abs(r1 - r2)}.`, `d = ${d}: ${resp}.`),
      };
    },
    (r) => {
      const A = [r.int(-4, 0), r.int(-4, 0)], B = [r.int(1, 5), r.int(1, 5)];
      if (B[1] === A[1] || B[0] === A[0]) throw new Error('vertical/horizontal');
      const mAB = (B[1] - A[1]) / (B[0] - A[0]);
      const mm = -1 / mAB;
      return {
        e: `Qual é o coeficiente angular da mediatriz do segmento de extremos A(${A[0]}, ${A[1]}) e B(${B[0]}, ${B[1]})?`.replace(/-/g, '−'),
        r: mm,
        d: [mAB, -mAB, 1 / mAB, 0],
        f: (v) => fracao(Math.round(v * (B[1] - A[1]) * (B[0] - A[0])), Math.abs((B[1] - A[1]) * (B[0] - A[0]))),
        x: expl('mediatriz é perpendicular ao segmento', `m(AB) = ${fracao(B[1] - A[1], B[0] - A[0])}; a mediatriz tem m = −1/m(AB).`, `m = ${fracao(-(B[0] - A[0]), B[1] - A[1])}.`),
      };
    },
    (r) => {
      const [m1, m2, tg] = r.pick([[2, -3, 1], [1, 3, 1 / 2], [3, 1 / 2, 1], [1, 0, 1], [2, 0, 2]]);
      return {
        e: `Qual é a tangente do ângulo agudo entre as retas de coeficientes angulares ${fracao(m1 * 2, 2)} e ${fracao(m2 * 2, 2)}?`,
        r: tg,
        d: [Math.abs(m1 - m2) + 1, Math.abs(m1 + m2), m1 * m2 === -1 ? 2 : Math.abs(m1 * m2) + 0.5, 1 / tg === tg ? tg + 1 : 1 / tg, tg / 2, tg * 3],
        f: (v) => fracao(Math.round(v * 2), 2),
        x: expl('tg θ = |(m₁ − m₂)/(1 + m₁·m₂)|', 'O módulo garante o ângulo agudo.', `|(${fracao(m1 * 2, 2)} − ${P(fracao(m2 * 2, 2))}) ÷ (1 + ${fracao(m1 * m2 * 4, 4)})| = ${fracao(tg * 2, 2)}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- 17 Complexos e polinômios
const fmtZ = (a, b) => {
  if (b === 0) return `${a}`;
  const im = Math.abs(b) === 1 ? 'i' : `${Math.abs(b)}i`;
  if (a === 0) return `${b < 0 ? '−' : ''}${im}`;
  return `${a} ${b < 0 ? '−' : '+'} ${im}`;
};
const complexos = [
  [
    (r) => {
      const a = r.int(-5, 5) || 2, b = r.int(-5, 5) || -3;
      const q = a > 0 ? (b > 0 ? '1º' : '4º') : b > 0 ? '2º' : '3º';
      return {
        e: `Em que quadrante do plano complexo (plano de Argand-Gauss) fica o afixo de z = ${fmtZ(a, b)}?`,
        r: `${q} quadrante`,
        d: ['1º quadrante', '2º quadrante', '3º quadrante', '4º quadrante', 'sobre o eixo imaginário'].filter((x) => x !== `${q} quadrante`),
        x: expl('afixo = ponto (a, b)', 'A parte real é a abscissa e a imaginária, a ordenada.', `(${a}, ${b}) → ${q} quadrante.`),
      };
    },
    (r) => {
      const a = r.int(-6, 6) || 3, b = r.int(-6, 6) || 2;
      return {
        e: `Se z = ${fmtZ(a, b)}, quanto vale z + z̄ (z mais o seu conjugado)?`,
        r: 2 * a,
        d: [a, 2 * b, 0, a + b],
        x: expl('conjugado troca o sinal da parte imaginária', 'Somando, as partes imaginárias se cancelam: z + z̄ = 2a.', `2 × ${P(a)} = ${2 * a}.`),
      };
    },
    (r) => {
      const c = [r.int(1, 4), r.int(-5, 5), r.int(-5, 5), r.int(-6, 6)];
      const s = c.reduce((t, x) => t + x, 0);
      const pol = `${c[0]}x³ ${c[1] < 0 ? '−' : '+'} ${Math.abs(c[1])}x² ${c[2] < 0 ? '−' : '+'} ${Math.abs(c[2])}x ${c[3] < 0 ? '−' : '+'} ${Math.abs(c[3])}`.replace(/^1x/, 'x').replace(/ 1x/g, ' x');
      return {
        e: `Qual é a soma dos coeficientes do polinômio P(x) = ${pol}?`,
        r: s,
        d: [c[3], s - c[3], c[0] + c[3], s + 1],
        x: expl('soma dos coeficientes = P(1)', 'Com x = 1, todas as potências viram 1.', `P(1) = ${c.join(' + ').replace(/\+ -/g, '− ')} = ${s}.`),
      };
    },
    (r) => {
      const c = [r.int(1, 3), r.int(-5, 5), r.int(-5, 5)], t = r.int(-9, 9) || 4;
      const pol = `${c[0]}x³ ${c[1] < 0 ? '−' : '+'} ${Math.abs(c[1])}x² ${c[2] < 0 ? '−' : '+'} ${Math.abs(c[2])}x ${t < 0 ? '−' : '+'} ${Math.abs(t)}`.replace(/^1x/, 'x').replace(/ 1x/g, ' x');
      return {
        e: `Quanto vale P(0) para P(x) = ${pol}?`,
        r: t,
        d: [c[0] + c[1] + c[2] + t, 0, c[0], -t],
        x: expl('termo independente = P(0)', 'Com x = 0, todos os termos com x somem.', `P(0) = ${t}.`),
      };
    },
    (r) => {
      const k = r.pick([4, 9, 16, 25, 36]);
      const s = Math.sqrt(k);
      return {
        e: `Quais são as raízes da equação x² + ${k} = 0, no conjunto dos complexos?`,
        r: `±${s}i`,
        d: [`±${s}`, `±${k}i`, `${s}i (apenas)`, 'não tem raízes', `±${s / 2}i`],
        x: expl('raiz de número negativo: √(−k) = √k·i', `x² = −${k} → x = ±√(−${k}).`, `x = ±${s}i.`),
      };
    },
  ],
  [
    (r) => {
      const r1 = r.pick([2, 3, 4]), r2 = r.pick([1, 2, 5]), t1 = r.pick([30, 45, 60]), t2 = r.pick([30, 60, 90]);
      return {
        e: `z₁ tem módulo ${r1} e argumento ${t1}°; z₂ tem módulo ${r2} e argumento ${t2}°. Qual é o módulo de z₁·z₂?`,
        r: r1 * r2,
        d: [r1 + r2, (r1 * r2) / 2, t1 + t2, r1 ** r2],
        x: expl('forma trigonométrica: no produto, módulos multiplicam e argumentos somam', `O argumento seria ${t1 + t2}°.`, `|z₁·z₂| = ${r1} × ${r2} = ${r1 * r2}.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[3, 4], [1, 2], [6, 8], [5, 12], [2, 3]]);
      const n = (a * a + b * b);
      return {
        e: `Qual é o módulo de z = ${fmtZ(a, b)} dividido pelo seu conjugado (|z/z̄|)?`,
        r: 1,
        d: [Math.sqrt(n), n, 0, 2],
        x: expl('|z/w| = |z|/|w| e |z̄| = |z|', 'O conjugado tem o mesmo módulo.', `|z|/|z̄| = 1.`),
      };
    },
    (r) => {
      const z1 = [r.int(-4, 4), r.int(-4, 4)], [dx, dy] = r.pick([[3, 4], [4, 3], [6, 8], [5, 12], [-3, 4]]);
      const z2 = [z1[0] + dx, z1[1] + dy];
      return {
        e: `Qual é a distância, no plano complexo, entre os afixos de z₁ = ${fmtZ(...z1)} e z₂ = ${fmtZ(...z2)}?`,
        r: Math.hypot(dx, dy),
        d: [Math.abs(dx) + Math.abs(dy), Math.hypot(...z2), dx * dx + dy * dy, Math.abs(dx - dy)],
        x: expl('distância = |z₂ − z₁| (Pitágoras)', `z₂ − z₁ = ${fmtZ(dx, dy)}.`, `√(${dx}² + ${dy}²) = ${num(Math.hypot(dx, dy))}.`),
      };
    },
    (r) => {
      const m = r.pick([1, 2, 3, 4]), raiz = r.int(-3, 4) || 2, outra = raiz + r.pick([1, 2, 3]);
      const pol = `(x ${raiz < 0 ? '+' : '−'} ${Math.abs(raiz)})${sup(m)}·(x ${outra < 0 ? '+' : '−'} ${Math.abs(outra)})`.replace('¹', '');
      return {
        e: `Qual é a multiplicidade da raiz ${raiz} no polinômio P(x) = ${pol}?`,
        r: m,
        d: [m + 1, 1, Math.abs(raiz), m * 2].filter((v) => v !== m),
        x: expl('multiplicidade = expoente do fator', `O fator (x − ${P(raiz)}) aparece ${m} vez(es).`, `Multiplicidade ${m}.`),
      };
    },
    (r) => {
      const n = r.pick([2, 4, 6, 8, 10]);
      const v = n % 4 === 0 ? (-4) ** (n / 4) : null;
      const res = n === 2 ? '2i' : n === 4 ? '−4' : n === 6 ? '−8i' : n === 8 ? '16' : '32i';
      void v;
      return {
        e: `Sabendo que (1 + i)² = 2i, quanto vale (1 + i)${sup(n)}?`,
        r: res,
        d: ['2i', '−4', '−8i', '16', '32i', '4i', '−16', '8i'].filter((x) => x !== res).slice(0, 4),
        x: expl('quebrar a potência em quadrados', `(1 + i)${sup(n)} = [(1 + i)²]${sup(n / 2)} = (2i)${sup(n / 2)}.`, `= ${res}.`),
      };
    },
    (r) => {
      const n = r.pick([1, 2, 3]);
      const res = n === 1 ? '−i' : n === 2 ? '−1' : 'i';
      return {
        e: `Quanto vale 1/i${n > 1 ? sup(n) : ''}?`,
        r: res,
        d: ['i', '−i', '1', '−1', '0'].filter((x) => x !== res),
        x: expl('multiplique em cima e embaixo para tirar o i do denominador', n === 1 ? '1/i = i/i² = i/(−1).' : `i${sup(n)} = ${n === 2 ? '−1' : '−i'}.`, `Resultado: ${res}.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.pick([3, 4, 5, 6, 8]);
      const pede = r.pick(['soma', 'quantidade']);
      return {
        e: pede === 'soma' ? `Qual é a soma das ${n} raízes complexas da equação z${sup(n)} = 1?` : `Quantas raízes complexas (contando as reais) tem a equação z${sup(n)} = 1?`,
        r: pede === 'soma' ? 0 : n,
        d: pede === 'soma' ? [1, n, -1, n - 1] : [1, 2, n - 1, 2 * n],
        x: expl('raízes n-ésimas da unidade', pede === 'soma' ? `Pelas relações de Girard, a soma das raízes de z${sup(n)} − 1 = 0 é o coeficiente de z${sup(n - 1)} (que é zero) com sinal trocado. Geometricamente, são vértices de um polígono regular centrado na origem.` : 'Toda equação polinomial de grau n tem n raízes complexas.', pede === 'soma' ? 'Soma = 0.' : `${n} raízes.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[3, 4], [1, 1], [6, 8], [1, 2], [2, 2]]), n = r.pick([2, 3, 4]);
      const mod = Math.hypot(a, b) ** n;
      return {
        e: `Qual é o módulo de (${fmtZ(a, b)})${sup(n)}?`,
        r: mod,
        d: [Math.hypot(a, b) * n, (a + b) ** n, mod * 2, a ** n + b ** n],
        x: expl('|zⁿ| = |z|ⁿ', `|z| = √(${a}² + ${b}²) = ${num(Math.hypot(a, b))}.`, `|z|${sup(n)} = ${num(mod)}.`),
      };
    },
    (r) => {
      const k = r.pick([16, 81, 1, 625]);
      const s = Math.round(k ** 0.25);
      return {
        e: `Quantas raízes reais tem a equação x⁴ − ${k} = 0?`,
        r: 2,
        d: [4, 1, 0, 3],
        x: expl('fatorar: x⁴ − k = (x² − √k)(x² + √k)', `x² = ${s * s} dá x = ±${s} (reais); x² = −${s * s} dá raízes imaginárias.`, 'São 2 raízes reais (e 2 imaginárias).'),
      };
    },
    (r) => {
      const a = r.int(-3, 3), b = r.int(-3, 3);
      if (a === b) throw new Error('raízes iguais');
      const c = [r.int(1, 3), r.int(-4, 4)];
      // P(x) = (x − a)(x − b)·Q(x) + resto; resto = c0·x + c1
      const Pa = c[0] * a + c[1], Pb = c[0] * b + c[1];
      return {
        e: `Um polinômio P(x) dá resto ${Pa} na divisão por (x ${a < 0 ? '+' : '−'} ${Math.abs(a)}) e resto ${Pb} na divisão por (x ${b < 0 ? '+' : '−'} ${Math.abs(b)}). Qual é o resto da divisão de P(x) por (x ${a < 0 ? '+' : '−'} ${Math.abs(a)})(x ${b < 0 ? '+' : '−'} ${Math.abs(b)})?`.replace(/x − 0/g, 'x').replace(/x \+ 0/g, 'x'),
        r: fmtR(c[0], c[1]),
        d: [fmtR(c[1], c[0]), fmtR(Pa + Pb, 0), `${Pa * Pb}`.replace('-', '−'), fmtR(-c[0], c[1]), fmtR(c[0], -c[1])].filter((x) => x !== fmtR(c[0], c[1])),
        x: expl('resto de grau menor que 2: R(x) = mx + n', `Pelo teorema do resto, R(${a}) = ${Pa} e R(${b}) = ${Pb}: resolva o sistema.`, `m = (${Pa} − ${P(Pb)}) ÷ (${a} − ${P(b)}) = ${c[0]}; n = ${c[1]}.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[1, 1], [1, -1], [0, 2], [3, 4], [1, 2]]);
      const raiz = fmtZ(a, b), conj = fmtZ(a, -b);
      return {
        e: `Um polinômio de coeficientes reais tem ${raiz} como raiz. Qual destes números também é, obrigatoriamente, raiz dele?`,
        r: conj,
        d: [fmtZ(-a, b), fmtZ(-a, -b), fmtZ(b, a), `${a}`, fmtZ(0, b)].filter((x) => x !== conj && x !== raiz),
        x: expl('raízes complexas não reais vêm aos pares (conjugadas)', 'Com coeficientes reais, se a + bi é raiz, a − bi também é.', `A outra raiz é ${conj}.`),
      };
    },
  ],
];
function fmtR(m, n) {
  const mx = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '−x' : `${m}x`.replace('-', '−');
  if (!mx) return `${n}`.replace('-', '−');
  return n === 0 ? mx : `${mx} ${n < 0 ? '−' : '+'} ${Math.abs(n)}`;
}

export default { explog, progressoes, plana, espacial, trig, estat, combin, prob, grand, matrizes, analitica, complexos };
