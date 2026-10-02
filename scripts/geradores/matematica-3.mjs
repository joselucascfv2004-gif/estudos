// Matemática: combinatória, probabilidade, grandezas e medidas, matrizes, geometria analítica, complexos e polinômios.
import { arranjo, arred, comb, fatorial, fracao, mdc, num, reais } from './util.mjs';

const PROVAS_TODAS = ['ENEM', 'Militares', 'Concursos'];
const pctFr = (n, d) => `${fracao(n, d)}`;
const P = (v) => (v < 0 ? `(${v})` : `${v}`);

// ---------------------------------------------------------------- Análise combinatória
const PALAVRAS_DISTINTAS = ['AMOR', 'GATO', 'LIVRO', 'CAMPO', 'PEDRA', 'MUNDO', 'PRATO', 'BRASIL', 'FILHO', 'NOITE', 'CHUVA', 'ESCOLA'];
const PALAVRAS_REP = [
  ['BANANA', 60, '6!/(3!·2!)'],
  ['ARARA', 10, '5!/(3!·2!)'],
  ['CASA', 12, '4!/2!'],
  ['PAPAI', 30, '5!/(2!·2!)'],
  ['BATATA', 60, '6!/(3!·2!)'],
  ['MATEMATICA', 151200, '10!/(3!·2!·2!)'],
  ['ARROZ', 60, '5!/2!'],
  ['CARRO', 60, '5!/2!'],
  ['OSSO', 6, '4!/(2!·2!)'],
  ['PARALELA', 3360, '8!/(3!·2!)'],
];
const combinatoria = {
  disciplina: 'matematica',
  arquivo: '12-analise-combinatoria',
  titulo: 'Análise combinatória',
  provas: PROVAS_TODAS,
  descricao: 'Princípio fundamental da contagem, permutações, arranjos e combinações.',
  niveis: [
    [
      (r) => {
        const a = r.int(2, 8), b = r.int(2, 6), c = r.int(2, 5);
        return {
          e: `${['Ana', 'Pedro', 'Júlia', 'Caio'][r.int(0, 3)]} tem ${a} camisetas, ${b} calças e ${c} pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?`,
          r: a * b * c,
          d: [a + b + c, a * b + c, a * b * c * 2, (a + b) * c],
          x: `Princípio multiplicativo: ${a} × ${b} × ${c} = ${a * b * c}.`,
        };
      },
      (r) => {
        const p = r.pick(PALAVRAS_DISTINTAS);
        const n = p.length;
        return {
          e: `Quantos anagramas tem a palavra ${p}?`,
          r: fatorial(n),
          d: [fatorial(n - 1), n * n, fatorial(n) / 2, n ** 3],
          x: `${p} tem ${n} letras distintas: ${n}! = ${num(fatorial(n))} anagramas.`,
        };
      },
      (r) => {
        const k = r.int(3, 6);
        return {
          e: `Quantas senhas de ${k} dígitos (de 0 a 9) podem ser formadas, se for permitido repetir dígitos?`,
          r: 10 ** k,
          d: [arranjo(10, k), 10 * k, 9 ** k, 10 ** (k - 1)],
          x: `Cada posição tem 10 opções: 10^${k} = ${num(10 ** k)}.`,
        };
      },
      (r) => {
        const n = r.int(5, 30);
        return {
          e: `Em uma reunião com ${n} pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?`,
          r: comb(n, 2),
          d: [n * (n - 1), n * n, n * 2, comb(n, 2) + n],
          x: `Cada aperto envolve um par de pessoas: C(${n}, 2) = ${n}·${n - 1}/2 = ${comb(n, 2)}.`,
        };
      },
      (r) => {
        const a = r.int(2, 6), b = r.int(2, 5), c = r.int(2, 4);
        return {
          e: `De uma cidade A a uma cidade B há ${a} estradas, e de B a C há ${b} estradas. Também há ${c} estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?`,
          r: a * b + c,
          d: [a * b * c, a + b + c, a * b, (a + c) * b],
          x: `Passando por B: ${a} × ${b} = ${a * b}. Direto: ${c}. Total: ${a * b + c} (soma porque são caminhos alternativos).`,
        };
      },
    ],
    [
      (r) => {
        const n = r.int(6, 15), k = r.int(2, 4);
        return {
          e: `De quantas maneiras é possível escolher uma comissão de ${k} pessoas entre ${n} candidatos?`,
          r: comb(n, k),
          d: [arranjo(n, k), n * k, comb(n, k - 1), comb(n, k) * 2],
          x: `A ordem não importa (combinação): C(${n}, ${k}) = ${n}!/(${k}!·${n - k}!) = ${comb(n, k)}.`,
        };
      },
      (r) => {
        const [p, v, como] = r.pick(PALAVRAS_REP);
        return {
          e: `Quantos anagramas tem a palavra ${p}?`,
          r: v,
          d: [fatorial(p.length), v * 2, v / 2 === Math.floor(v / 2) ? v / 2 : v + 6, fatorial(p.length - 1)],
          x: `Permutação com repetição: ${como} = ${num(v)}.`,
        };
      },
      (r) => {
        const n = r.int(5, 20);
        return {
          e: `Em uma corrida com ${n} atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?`,
          r: arranjo(n, 3),
          d: [comb(n, 3), n * 3, n ** 3, arranjo(n, 2)],
          x: `A ordem importa (arranjo): ${n} × ${n - 1} × ${n - 2} = ${arranjo(n, 3)}.`,
        };
      },
      (r) => {
        const p = r.pick(['PROVA', 'LIVRO', 'CANETA', 'ESTUDO', 'FIRME', 'SUCESSO'].filter((w) => new Set(w).size === w.length));
        const vogais = [...p].filter((c) => 'AEIOU'.includes(c)).length;
        const n = p.length;
        return {
          e: `Quantos anagramas da palavra ${p} começam por vogal?`,
          r: vogais * fatorial(n - 1),
          d: [fatorial(n), fatorial(n - 1), (n - vogais) * fatorial(n - 1), vogais * fatorial(n - 2)],
          x: `${p} tem ${vogais} vogais para a 1ª posição; as ${n - 1} letras restantes permutam: ${vogais} × ${n - 1}! = ${vogais * fatorial(n - 1)}.`,
        };
      },
      (r) => {
        const l = r.int(2, 3), d = r.int(2, 4);
        const tot = 26 ** l * 10 ** d;
        return {
          e: `Um sistema de códigos usa ${l} letras (de um alfabeto de 26) seguidas de ${d} algarismos (0 a 9), permitindo repetições. Quantos códigos diferentes existem?`,
          r: tot,
          d: [26 * l + 10 * d, arranjo(26, l) * arranjo(10, d), 36 ** (l + d) > 1e12 ? tot / 10 : 36 ** (l + d), tot * 2],
          x: `Princípio multiplicativo: 26^${l} × 10^${d} = ${num(26 ** l)} × ${num(10 ** d)} = ${num(tot)}.`,
        };
      },
    ],
    [
      (r) => {
        const h = r.int(4, 8), mu = r.int(3, 7), k = r.int(4, 5), m = 2;
        return {
          e: `Uma comissão de ${k} pessoas será formada a partir de ${h} homens e ${mu} mulheres. Quantas comissões diferentes têm exatamente ${m} mulheres?`,
          r: comb(mu, m) * comb(h, k - m),
          d: [comb(h + mu, k), comb(mu, m) + comb(h, k - m), comb(mu, m) * comb(h, k), arranjo(mu, m) * comb(h, k - m)],
          x: `Escolhemos ${m} mulheres de ${mu}: C(${mu},${m}) = ${comb(mu, m)}; e ${k - m} homens de ${h}: C(${h},${k - m}) = ${comb(h, k - m)}. Total: ${comb(mu, m) * comb(h, k - m)}.`,
        };
      },
      (r) => {
        const n = r.int(4, 8);
        return {
          e: `De quantas maneiras ${n} pessoas podem se sentar em uma fila de ${n} cadeiras se duas delas, que são namorados, devem ficar sempre juntas?`,
          r: 2 * fatorial(n - 1),
          d: [fatorial(n), fatorial(n - 1), fatorial(n) - 2 * fatorial(n - 1), 2 * fatorial(n - 2)],
          x: `Tratamos o casal como um bloco: ${n - 1} elementos permutam (${n - 1}!) e o casal pode trocar de lugar entre si (×2): 2 × ${fatorial(n - 1)} = ${2 * fatorial(n - 1)}.`,
        };
      },
      (r) => {
        const n = r.int(4, 9);
        return {
          e: `De quantas maneiras ${n} pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)`,
          r: fatorial(n - 1),
          d: [fatorial(n), fatorial(n) / 2, fatorial(n - 2), n * n],
          x: `Permutação circular: (n − 1)! = ${n - 1}! = ${num(fatorial(n - 1))}.`,
        };
      },
      (r) => {
        const n = r.int(4, 15);
        return {
          e: `Quantas soluções inteiras não negativas tem a equação x + y + z = ${n}?`,
          r: comb(n + 2, 2),
          d: [comb(n + 2, 3), comb(n, 2), comb(n - 1, 2), n ** 2],
          x: `Por "bolas e barras": distribuímos ${n} unidades entre 3 variáveis: C(${n} + 2, 2) = C(${n + 2}, 2) = ${comb(n + 2, 2)}.`,
        };
      },
      (r) => {
        const k = r.pick([5, 6, 7]);
        const pares = Math.floor(k / 2);
        const tot = pares * (k - 1) * (k - 2);
        return {
          e: `Usando apenas os algarismos 1, 2, ..., ${k}, quantos números pares de três algarismos distintos podem ser formados?`,
          r: tot,
          d: [k * (k - 1) * (k - 2), pares * k * k, (k - pares) * (k - 1) * (k - 2), tot / 2],
          x: `A unidade deve ser par (${pares} opções); depois sobram ${k - 1} opções para a centena e ${k - 2} para a dezena: ${pares} × ${k - 1} × ${k - 2} = ${tot}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Probabilidade
const probabilidade = {
  disciplina: 'matematica',
  arquivo: '13-probabilidade',
  titulo: 'Probabilidade',
  provas: PROVAS_TODAS,
  descricao: 'Probabilidade clássica, eventos complementares, independentes, condicionais e distribuição binomial.',
  niveis: [
    [
      (r) => {
        const [evento, fav] = r.pick([['um número par', 3], ['um número maior que 4', 2], ['um múltiplo de 3', 2], ['um número primo', 3], ['o número 6', 1], ['um número menor que 3', 2]]);
        return {
          e: `Ao lançar um dado comum (faces de 1 a 6), qual é a probabilidade de sair ${evento}?`,
          r: fracao(fav, 6),
          d: [fracao(6 - fav, 6), fracao(fav, 12), fracao(1, 6) === fracao(fav, 6) ? '1/2' : fracao(1, 6), fracao(fav + 1, 6)],
          x: `Casos favoráveis: ${fav}; possíveis: 6. P = ${fav}/6 = ${fracao(fav, 6)}.`,
        };
      },
      (r) => {
        const b = r.int(2, 12), p = r.int(2, 12), v = r.int(0, 6);
        const t = b + p + v;
        return {
          e: `Uma urna tem ${b} bolas brancas, ${p} pretas${v ? ` e ${v} vermelhas` : ''}. Retirando uma bola ao acaso, qual é a probabilidade de ela ser branca?`,
          r: fracao(b, t),
          d: [fracao(b, p), fracao(p, t), fracao(t - b, t), fracao(1, t)],
          x: `P = brancas/total = ${b}/${t} = ${fracao(b, t)}.`,
        };
      },
      (r) => {
        const n = r.int(2, 6);
        return {
          e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de sair cara em todos os lançamentos?`,
          r: fracao(1, 2 ** n),
          d: [fracao(1, 2 * n), fracao(1, 2), fracao(n, 2 ** n), fracao(2 ** n - 1, 2 ** n)],
          x: `Lançamentos independentes: (1/2)^${n} = 1/${2 ** n}.`,
        };
      },
      (r) => {
        const N = r.pick([20, 30, 40, 50, 60, 100]), k = r.pick([3, 4, 5, 6, 7]);
        const fav = Math.floor(N / k);
        return {
          e: `Um número é sorteado ao acaso entre 1 e ${N} (inclusive). Qual é a probabilidade de ele ser múltiplo de ${k}?`,
          r: fracao(fav, N),
          d: [fracao(1, k) === fracao(fav, N) ? fracao(fav + 1, N) : fracao(1, k), fracao(fav, N - fav), fracao(N - fav, N), fracao(k, N)],
          x: `Há ${fav} múltiplos de ${k} entre 1 e ${N}. P = ${fav}/${N} = ${fracao(fav, N)}.`,
        };
      },
      (r) => {
        const total = r.pick([200, 400, 500, 1000]), premios = r.pick([2, 4, 5, 10, 20]);
        return {
          e: `Em uma rifa com ${total} bilhetes, ${premios} são premiados. Quem compra um bilhete tem que probabilidade de ser premiado?`,
          r: `${num((premios / total) * 100)}%`,
          d: [`${num(premios)}%`, `${num((premios / total) * 1000)}%`, `${num(100 - (premios / total) * 100)}%`, `${num((premios / total) * 10)}%`],
          x: `P = ${premios}/${total} = ${num(premios / total, 3)} = ${num((premios / total) * 100)}%.`,
        };
      },
    ],
    [
      (r) => {
        const s = r.int(3, 11);
        const fav = 6 - Math.abs(7 - s);
        return {
          e: `Dois dados comuns são lançados. Qual é a probabilidade de a soma dos resultados ser ${s}?`,
          r: fracao(fav, 36),
          d: [fracao(fav, 12), fracao(1, 6) === fracao(fav, 36) ? fracao(1, 9) : fracao(1, 6), fracao(fav + 1, 36), fracao(1, 11)],
          x: `Há 36 resultados possíveis; a soma ${s} ocorre em ${fav} deles. P = ${fav}/36 = ${fracao(fav, 36)}.`,
        };
      },
      (r) => {
        const b = r.int(3, 8), p = r.int(2, 7), t = b + p;
        return {
          e: `Uma caixa tem ${b} bombons de chocolate branco e ${p} de chocolate preto. Retirando dois bombons ao acaso, sem reposição, qual é a probabilidade de ambos serem brancos?`,
          r: fracao(b * (b - 1), t * (t - 1)),
          d: [fracao(b * b, t * t), fracao(b, t), fracao(b * (b - 1), t * t), fracao(2 * b, t * (t - 1))],
          x: `P = ${b}/${t} × ${b - 1}/${t - 1} = ${fracao(b * (b - 1), t * (t - 1))}.`,
        };
      },
      (r) => {
        const n = r.int(2, 6);
        return {
          e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de sair pelo menos uma cara?`,
          r: fracao(2 ** n - 1, 2 ** n),
          d: [fracao(1, 2 ** n), fracao(n, 2 ** n), fracao(1, 2), fracao(2 ** n - n, 2 ** n)],
          x: `Evento complementar: P(nenhuma cara) = 1/${2 ** n}. Logo P(pelo menos uma) = 1 − 1/${2 ** n} = ${fracao(2 ** n - 1, 2 ** n)}.`,
        };
      },
      (r) => {
        const a = r.pick([10, 20, 30, 40, 50, 60, 80]), b = r.pick([10, 20, 25, 50, 75]);
        return {
          e: `A probabilidade de chover amanhã em uma cidade é de ${a}% e, independentemente disso, a probabilidade de faltar energia é de ${b}%. Qual é a probabilidade de acontecerem as duas coisas?`,
          r: `${num((a * b) / 100)}%`,
          d: [`${num(a + b)}%`, `${num(Math.abs(a - b) || 5)}%`, `${num((a * b) / 1000)}%`, `${num(a + b - (a * b) / 100)}%`],
          x: `Eventos independentes: P(A e B) = P(A)·P(B) = ${num(a / 100)} × ${num(b / 100)} = ${String((a * b) / 10000).replace('.', ',')} = ${num((a * b) / 100)}%.`,
        };
      },
      (r) => {
        const total = r.pick([40, 50, 60, 80, 100]);
        const fut = r.int(10, total / 2), vol = r.int(10, total / 2), ambos = r.int(2, Math.min(fut, vol) - 1);
        const uniao = fut + vol - ambos;
        return {
          e: `Em uma turma de ${total} alunos, ${fut} jogam futebol, ${vol} jogam vôlei e ${ambos} jogam os dois esportes. Escolhendo um aluno ao acaso, qual é a probabilidade de ele jogar futebol ou vôlei?`,
          r: fracao(uniao, total),
          d: [fracao(fut + vol, total), fracao(ambos, total), fracao(total - uniao, total), fracao(fut + vol - 2 * ambos, total)],
          x: `P(F ∪ V) = P(F) + P(V) − P(F ∩ V) = (${fut} + ${vol} − ${ambos})/${total} = ${uniao}/${total} = ${fracao(uniao, total)}.`,
        };
      },
    ],
    [
      (r) => {
        const n = r.int(4, 6), k = r.int(1, n - 1);
        return {
          e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de saírem exatamente ${k} caras?`,
          r: fracao(comb(n, k), 2 ** n),
          d: [fracao(1, 2 ** n), fracao(k, n), fracao(comb(n, k), 2 ** (n + 1)), fracao(k, 2 ** n)],
          x: `Binomial: C(${n}, ${k}) · (1/2)^${n} = ${comb(n, k)}/${2 ** n} = ${fracao(comb(n, k), 2 ** n)}.`,
        };
      },
      (r) => {
        const hO = r.int(5, 20), hS = r.int(10, 30), mO = r.int(5, 20), mS = r.int(10, 30);
        return {
          e: `Em uma empresa: ${hO} homens usam óculos e ${hS} não usam; ${mO} mulheres usam óculos e ${mS} não usam. Sorteando uma pessoa e sabendo que é mulher, qual é a probabilidade de ela usar óculos?`,
          r: fracao(mO, mO + mS),
          d: [fracao(mO, hO + hS + mO + mS), fracao(mO, hO + mO), fracao(mS, mO + mS), fracao(mO + mS, hO + hS + mO + mS)],
          x: `Probabilidade condicional: restringimos às ${mO + mS} mulheres; ${mO} usam óculos: ${mO}/${mO + mS} = ${fracao(mO, mO + mS)}.`,
        };
      },
      (r) => {
        const a = r.int(2, 6), b = r.int(2, 6), t = a + b;
        return {
          e: `Uma urna tem ${a} bolas azuis e ${b} amarelas. Retiram-se duas bolas, sem reposição. Qual é a probabilidade de serem de cores diferentes?`,
          r: fracao(2 * a * b, t * (t - 1)),
          d: [fracao(a * b, t * (t - 1)), fracao(2 * a * b, t * t), fracao(1, 2), fracao(a * (a - 1) + b * (b - 1), t * (t - 1))],
          x: `P = P(AZ, AM) + P(AM, AZ) = ${a}/${t}·${b}/${t - 1} + ${b}/${t}·${a}/${t - 1} = ${fracao(2 * a * b, t * (t - 1))}.`,
        };
      },
      (r) => {
        const [prev, sens, falso] = r.pick([[10, 90, 10], [20, 80, 10], [5, 100, 5], [10, 80, 20], [25, 80, 20], [50, 90, 10]]);
        const pos = prev * sens + (100 - prev) * falso;
        const v = prev * sens;
        return {
          e: `Uma doença atinge ${prev}% de uma população. Um teste dá positivo em ${sens}% dos doentes e em ${falso}% dos sadios. Uma pessoa testou positivo. Qual é a probabilidade de ela estar doente?`,
          r: fracao(v, pos),
          d: [fracao(sens, 100), fracao(prev, 100), fracao(v, 10000), fracao(100 - falso, 100)],
          x: `Teorema de Bayes: P(D|+) = P(D)·P(+|D)/P(+) = (${prev}%·${sens}%)/(${prev}%·${sens}% + ${100 - prev}%·${falso}%) = ${v}/${pos} = ${fracao(v, pos)}.`,
        };
      },
      (r) => {
        const s = r.int(8, 11);
        let fav = 0;
        for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j >= s) fav++;
        return {
          e: `Lançando dois dados comuns, qual é a probabilidade de a soma ser maior ou igual a ${s}?`,
          r: fracao(fav, 36),
          d: [fracao(36 - fav, 36), fracao(6 - Math.abs(7 - s), 36), fracao(fav + 1, 36), fracao(fav, 12)],
          x: `Contando os pares (a, b) com a + b ≥ ${s}: ${fav} de 36. P = ${fracao(fav, 36)}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Grandezas, medidas e escalas
const grandezas = {
  disciplina: 'matematica',
  arquivo: '14-grandezas-medidas-escalas',
  titulo: 'Grandezas, medidas e escalas',
  provas: ['ENEM', 'Militares', 'Concursos'],
  descricao: 'Conversão de unidades, escalas de mapas e plantas, velocidade, vazão e consumo.',
  niveis: [
    [
      (r) => {
        const [de, para, f, v] = r.pick([
          ['km', 'm', 1000, r.pick([2.5, 3.4, 0.75, 12, 1.2])],
          ['m', 'cm', 100, r.pick([1.75, 2.3, 0.6, 4.05])],
          ['L', 'mL', 1000, r.pick([1.5, 0.35, 2.25, 0.5])],
          ['kg', 'g', 1000, r.pick([0.25, 1.2, 3.5, 0.08])],
          ['m³', 'L', 1000, r.pick([2, 0.5, 1.6, 12])],
          ['m²', 'cm²', 10000, r.pick([1, 2.5, 0.3])],
        ]);
        return {
          e: `Quanto vale ${num(v)} ${de} em ${para}?`,
          r: v * f,
          d: [v * f * 10, v * f / 10, v * (f === 10000 ? 100 : f === 1000 ? 100 : 10), v * f / 100],
          f: (x) => `${num(x)} ${para}`,
          x: `1 ${de} = ${num(f)} ${para}. Então ${num(v)} × ${num(f)} = ${num(v * f)} ${para}.`,
        };
      },
      (r) => {
        const min = r.int(70, 500);
        const f = (v) => `${Math.floor(v / 60)} h ${v % 60} min`;
        return {
          e: `Um filme tem ${min} minutos de duração. Quanto tempo é isso em horas e minutos?`,
          r: min,
          d: [min + 20, min - 20, Math.floor(min / 100) * 60 + (min % 100), min + 60],
          f,
          x: `${min} = 60 × ${Math.floor(min / 60)} + ${min % 60}, isto é, ${f(min)}.`,
        };
      },
      (r) => {
        const esc = r.pick([10000, 25000, 50000, 100000, 200000, 500000]), d = r.pick([2, 3, 4.5, 5, 6, 8]);
        const km = (d * esc) / 100000;
        return {
          e: `Em um mapa na escala 1 : ${num(esc)}, a distância entre duas cidades é de ${num(d)} cm. Qual é a distância real?`,
          r: km,
          d: [km * 10, km / 10, d * esc / 1000, km * 100],
          f: (x) => `${num(x)} km`,
          x: `Cada 1 cm no mapa equivale a ${num(esc)} cm reais. ${num(d)} × ${num(esc)} = ${num(d * esc)} cm = ${num(km)} km.`,
        };
      },
      (r) => {
        const d = r.pick([120, 150, 180, 240, 300, 360, 450]), t = r.pick([1.5, 2, 2.5, 3, 4, 5]);
        if (!Number.isInteger((d / t) * 10)) return grandezas.niveis[0][3](r);
        return {
          e: `Um ônibus percorreu ${d} km em ${num(t)} horas. Qual foi a sua velocidade média?`,
          r: d / t,
          d: [d * t, d / (t + 1), (d / t) * 1.2, d - t],
          f: (x) => `${num(x)} km/h`,
          x: `v = Δs/Δt = ${d}/${num(t)} = ${num(d / t)} km/h.`,
        };
      },
      (r) => {
        const v = r.pick([36, 54, 72, 90, 108, 18]);
        return {
          e: `Um carro trafega a ${v} km/h. Qual é essa velocidade em metros por segundo?`,
          r: v / 3.6,
          d: [v * 3.6, v / 60, v / 36 === v / 3.6 ? v + 1 : v / 36, v / 1.8],
          f: (x) => `${num(x)} m/s`,
          x: `Para converter km/h em m/s, dividimos por 3,6: ${v} ÷ 3,6 = ${num(v / 3.6)} m/s.`,
        };
      },
    ],
    [
      (r) => {
        const km = r.pick([5, 10, 20, 25, 40, 50]), cm = r.pick([2, 4, 5, 10]);
        const esc = (km * 100000) / cm;
        return {
          e: `Duas cidades distantes ${km} km estão representadas em um mapa a ${cm} cm uma da outra. Qual é a escala do mapa?`,
          r: `1 : ${num(esc)}`,
          d: [`1 : ${num(esc / 10)}`, `1 : ${num(esc * 10)}`, `1 : ${num(km * cm)}`, `1 : ${num(esc / 100)}`],
          x: `${km} km = ${num(km * 100000)} cm. Escala = ${cm} : ${num(km * 100000)} = 1 : ${num(esc)}.`,
        };
      },
      (r) => {
        const esc = r.pick([50, 100, 200]), a = r.pick([4, 5, 6, 8]), b = r.pick([3, 4, 5]);
        const real = (a * esc * b * esc) / 10000;
        return {
          e: `Na planta de uma casa, na escala 1 : ${esc}, uma sala aparece como um retângulo de ${a} cm por ${b} cm. Qual é a área real da sala?`,
          r: real,
          d: [(a * b * esc) / 10000, real * 10, real / 10, (a + b) * 2 * esc / 100],
          f: (x) => `${num(x)} m²`,
          x: `Medidas reais: ${a} × ${esc} = ${num(a * esc)} cm = ${num((a * esc) / 100)} m e ${num((b * esc) / 100)} m. Área: ${num(real)} m². (Áreas variam com o quadrado da escala.)`,
        };
      },
      (r) => {
        const cons = r.pick([8, 10, 12, 14]), dia = r.pick([20, 30, 40, 50]), dias = r.pick([20, 22, 30]), p = r.pick([5.5, 6, 6.5]);
        const tot = (dia * dias / cons) * p;
        return {
          e: `Um motorista roda ${dia} km por dia, durante ${dias} dias no mês, com um carro que faz ${cons} km/L. Com o combustível a ${reais(p)} o litro, quanto ele gasta por mês?`,
          r: arred(tot, 2),
          d: [arred(dia * dias * p / 10, 2), arred(tot / dias, 2), arred(dia * cons * p, 2), arred(tot * 1.1, 2)],
          f: reais,
          x: `Distância: ${dia} × ${dias} = ${dia * dias} km. Litros: ${dia * dias}/${cons} = ${num((dia * dias) / cons)} L. Gasto: ${num((dia * dias) / cons)} × ${num(p)} = ${reais(tot)}.`,
        };
      },
      (r) => {
        const cap = r.pick([500, 1000, 1500, 2000, 3000]), q = r.pick([10, 20, 25, 50]);
        const t = cap / q;
        const f = (v) => (v >= 60 ? `${Math.floor(v / 60)} h${v % 60 ? ` ${v % 60} min` : ''}` : `${v} min`);
        return {
          e: `Uma caixa-d'água de ${num(cap)} litros, inicialmente vazia, é abastecida por uma bomba com vazão de ${q} L/min. Em quanto tempo ela fica cheia?`,
          r: t,
          d: [t * 2, t / 2, t + 30, cap / 60],
          f,
          x: `t = ${num(cap)}/${q} = ${t} min = ${f(t)}.`,
        };
      },
      (r) => {
        const pace = r.pick([5, 6, 4.5, 5.5]), d = r.pick([5, 10, 21]);
        const total = pace * d;
        const f = (v) => `${Math.floor(v / 60) ? `${Math.floor(v / 60)} h ` : ''}${Math.round(v % 60)} min`;
        return {
          e: `Um corredor mantém o ritmo de ${num(pace)} minutos por quilômetro. Quanto tempo ele leva para completar ${d} km?`,
          r: total,
          d: [total + 10, total - 5, d * 60 / pace, total * 1.5],
          f,
          x: `${num(pace)} min/km × ${d} km = ${num(total)} min = ${f(total)}.`,
        };
      },
    ],
    [
      (r) => {
        const v = r.pick([15, 20, 25, 30]), t = r.pick([12, 18, 30, 45]);
        const d = (v * 3.6 * t) / 60;
        return {
          e: `Um ciclista mantém velocidade constante de ${v} m/s. Quantos quilômetros ele percorre em ${t} minutos?`,
          r: arred(d, 2),
          d: [arred(v * t / 1000, 2), arred(d * 10, 2), arred((v * t * 60) / 100, 2), arred(d / 3.6, 2)],
          f: (x) => `${num(x)} km`,
          x: `${v} m/s × ${t * 60} s = ${num(v * t * 60)} m = ${num(d)} km.`,
        };
      },
      (r) => {
        const g = r.pick([10, 20, 30, 40]), ml = 0.05;
        const litros = (g * 60 * 24 * 30 * ml) / 1000;
        return {
          e: `Uma torneira mal fechada pinga ${g} gotas por minuto. Se cada gota tem 0,05 mL, quantos litros são desperdiçados em 30 dias?`,
          r: arred(litros, 2),
          d: [arred(litros * 10, 2), arred(litros / 10, 2), arred((g * 60 * 24 * ml) / 1000, 2), arred(litros / 24, 2)],
          f: (x) => `${num(x)} L`,
          x: `Gotas em 30 dias: ${g} × 60 × 24 × 30 = ${num(g * 60 * 24 * 30)}. Volume: × 0,05 mL = ${num(g * 60 * 24 * 30 * ml)} mL = ${num(litros)} L.`,
        };
      },
      (r) => {
        const pop = r.pick([120000, 250000, 480000, 1500000]), area = r.pick([400, 600, 1200, 1500, 3000]);
        return {
          e: `Um município tem ${num(pop)} habitantes e área de ${num(area)} km². Qual é a sua densidade demográfica?`,
          r: arred(pop / area, 2),
          d: [arred(area / pop * 1000, 2), arred(pop / area / 10, 2), arred(pop / area * 10, 2), arred(pop / (area * 1000), 2)],
          f: (x) => `${num(x)} hab./km²`,
          x: `Densidade = população/área = ${num(pop)}/${num(area)} = ${num(pop / area)} hab./km².`,
        };
      },
      (r) => {
        const l = r.pick([10, 12, 15, 20]), c = r.pick([6, 8, 10]), h = r.pick([2.5, 3]);
        const porta = 1.6, janela = r.pick([1.5, 2, 2.4]);
        const area = 2 * (l + c) * h - porta - janela;
        const rend = r.pick([10, 12, 16]);
        const latas = Math.ceil(area / (rend * 3.6));
        return {
          e: `As quatro paredes de um salão de ${l} m × ${c} m e ${num(h)} m de altura serão pintadas. Há uma porta de ${num(porta)} m² e uma janela de ${num(janela)} m² (não pintadas). A tinta rende ${rend} m² por litro e é vendida em latas de 3,6 L. Quantas latas, no mínimo, devem ser compradas?`,
          r: latas,
          d: [latas + 1, latas - 1 > 0 ? latas - 1 : latas + 2, Math.ceil((2 * (l + c) * h) / rend), Math.ceil((l * c) / (rend * 3.6)) === latas ? latas + 3 : Math.ceil((l * c) / (rend * 3.6))],
          x: `Área: 2 × (${l} + ${c}) × ${num(h)} − ${num(porta)} − ${num(janela)} = ${num(area)} m². Cada lata pinta ${rend} × 3,6 = ${num(rend * 3.6)} m². ${num(area)}/${num(rend * 3.6)} ≈ ${num(area / (rend * 3.6))} ⇒ ${latas} latas (arredondando para cima).`,
        };
      },
      (r) => {
        const fuso = r.pick([[3, 'Lisboa', 'à frente'], [4, 'Paris', 'à frente'], [-1, 'Manaus', 'atrás'], [12, 'Tóquio', 'à frente'], [-2, 'Rio Branco', 'atrás']]);
        const [dif, cidade] = fuso;
        const saida = r.int(6, 22), voo = r.int(2, 12);
        const chegadaLocal = (((saida + voo + dif) % 24) + 24) % 24;
        const f = (h) => `${String(h).padStart(2, '0')}h`;
        return {
          e: `Um avião sai de Brasília às ${f(saida)} (horário de Brasília) com destino a ${cidade}, onde o horário está ${Math.abs(dif)} ${Math.abs(dif) === 1 ? 'hora' : 'horas'} ${dif > 0 ? 'adiantado' : 'atrasado'} em relação a Brasília. O voo dura ${voo} horas. A que horas (horário local) ele chega a ${cidade}?`,
          r: chegadaLocal,
          d: [(saida + voo) % 24, (((saida + voo - dif) % 24) + 24) % 24, (((saida + dif) % 24) + 24) % 24, (chegadaLocal + 1) % 24],
          f,
          x: `Chegada no horário de Brasília: ${f(saida)} + ${voo} h = ${f((saida + voo) % 24)}. Convertendo para ${cidade} (${dif > 0 ? '+' : '−'}${Math.abs(dif)} h): ${f(chegadaLocal)}${saida + voo + dif >= 24 ? ' (do dia seguinte)' : ''}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Matrizes e determinantes
const mat2 = (m) => `[${m[0][0]} ${m[0][1]}; ${m[1][0]} ${m[1][1]}]`;
const det2 = (m) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
const det3 = (m) =>
  m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
const mat3 = (m) => `[${m.map((l) => l.join(' ')).join('; ')}]`;
const rm = (r, a, b, n = 2) => Array.from({ length: n }, () => Array.from({ length: n }, () => r.int(a, b)));
const NOTA_MATRIZ = '(Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)';

const matrizes = {
  disciplina: 'matematica',
  arquivo: '15-matrizes-e-determinantes',
  titulo: 'Matrizes, determinantes e sistemas',
  provas: ['Militares', 'ENEM'],
  descricao: 'Operações com matrizes, determinantes (Sarrus e propriedades), matriz inversa e regra de Cramer.',
  niveis: [
    [
      (r) => {
        const m = rm(r, -5, 9);
        return {
          e: `Qual é o determinante da matriz A = ${mat2(m)}? ${NOTA_MATRIZ}`,
          r: det2(m),
          d: [m[0][0] * m[1][1] + m[0][1] * m[1][0], m[0][1] * m[1][0] - m[0][0] * m[1][1], m[0][0] + m[1][1], det2(m) + 1],
          x: `det = a·d − b·c = (${m[0][0]})(${m[1][1]}) − (${m[0][1]})(${m[1][0]}) = ${det2(m)}.`,
        };
      },
      (r) => {
        const [i, j] = [r.int(1, 3), r.int(1, 3)];
        const [a, b, c] = [r.int(1, 4), r.int(-3, 3) || 1, r.int(-2, 5)];
        return {
          e: `A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = ${a}i ${b >= 0 ? '+' : '−'} ${Math.abs(b)}j ${c >= 0 ? '+' : '−'} ${Math.abs(c)}. Qual é o valor de a${'₀₁₂₃'[i]}${'₀₁₂₃'[j]}?`,
          r: a * i + b * j + c,
          d: [a * j + b * i + c, a * i + b * j - c, a * i * b * j + c, a + b + c],
          x: `a${'₀₁₂₃'[i]}${'₀₁₂₃'[j]} = ${a}·${i} ${b >= 0 ? '+' : '−'} ${Math.abs(b)}·${j} ${c >= 0 ? '+' : '−'} ${Math.abs(c)} = ${a * i + b * j + c}.`,
        };
      },
      (r) => {
        const A = rm(r, -5, 9), B = rm(r, -5, 9), k = r.int(2, 3);
        const i = r.int(0, 1), j = r.int(0, 1);
        return {
          e: `Sendo A = ${mat2(A)} e B = ${mat2(B)}, qual é o elemento da linha ${i + 1} e coluna ${j + 1} da matriz ${k}A − B? ${NOTA_MATRIZ}`,
          r: k * A[i][j] - B[i][j],
          d: [k * A[i][j] + B[i][j], A[i][j] - B[i][j], k * (A[i][j] - B[i][j]), k * A[j][i] - B[j][i] === k * A[i][j] - B[i][j] ? k * A[i][j] - B[i][j] + 2 : k * A[j][i] - B[j][i]],
          x: `Elemento (${i + 1},${j + 1}): ${k}·(${A[i][j]}) − (${B[i][j]}) = ${k * A[i][j] - B[i][j]}.`,
        };
      },
      (r) => {
        const m = rm(r, 1, 9, 3), i = r.int(0, 2), j = r.int(0, 2);
        if (i === j || m[i][j] === m[j][i]) return matrizes.niveis[0][3](r);
        return {
          e: `Dada A = ${mat3(m)}, qual é o elemento da linha ${i + 1}, coluna ${j + 1} da transposta Aᵗ? ${NOTA_MATRIZ}`,
          r: m[j][i],
          d: [m[i][j], m[i][i], m[j][j], m[i][j] + m[j][i]],
          x: `Na transposta, linhas viram colunas: (Aᵗ)${i + 1}${j + 1} = A${j + 1}${i + 1} = ${m[j][i]}.`,
        };
      },
    ],
    [
      (r) => {
        const m = rm(r, -3, 4, 3);
        const d = det3(m);
        return {
          e: `Qual é o determinante da matriz ${mat3(m)}? ${NOTA_MATRIZ}`,
          r: d,
          d: [-d === d ? d + 3 : -d, d + 2, d - 4, m[0][0] * m[1][1] * m[2][2]],
          x: `Pela regra de Sarrus (ou por cofatores), det = ${d}.`,
        };
      },
      (r) => {
        const A = rm(r, -3, 5), B = rm(r, -3, 5), i = r.int(0, 1), j = r.int(0, 1);
        const c = A[i][0] * B[0][j] + A[i][1] * B[1][j];
        return {
          e: `Sendo A = ${mat2(A)} e B = ${mat2(B)}, qual é o elemento c${'₁₂'[i]}${'₁₂'[j]} da matriz C = A·B? ${NOTA_MATRIZ}`,
          r: c,
          d: [A[i][j] * B[i][j], A[0][i] * B[j][0] + A[1][i] * B[j][1] === c ? c + 3 : A[0][i] * B[j][0] + A[1][i] * B[j][1], c + 2, A[i][0] * B[j][0] + A[i][1] * B[j][1] === c ? c - 2 : A[i][0] * B[j][0] + A[i][1] * B[j][1]],
          x: `c${i + 1}${j + 1} = (linha ${i + 1} de A)·(coluna ${j + 1} de B) = ${A[i][0]}·${B[0][j]} + ${A[i][1]}·${B[1][j]} = ${c}.`,
        };
      },
      (r) => {
        const d = r.int(-6, 9) || 2, k = r.int(2, 3), n = r.pick([2, 3]);
        return {
          e: `Uma matriz quadrada A de ordem ${n} tem determinante ${d}. Qual é o determinante da matriz ${k}A?`,
          r: k ** n * d,
          d: [k * d, k * n * d, k ** (n + 1) * d, d + k],
          x: `Multiplicar uma matriz de ordem ${n} por ${k} multiplica cada uma das ${n} linhas por ${k}: det(${k}A) = ${k}^${n}·det A = ${k ** n} × ${d < 0 ? `(${d})` : d} = ${k ** n * d}.`,
        };
      },
      (r) => {
        const a = r.int(1, 5), b = r.int(1, 6), x = r.int(-4, 6), c = r.int(1, 5);
        // det [a x; b c] = 0  → a c − x b = 0 -> x = ac/b
        const valor = a * c * x;
        void valor;
        const d = a * c;
        if (d % b) return matrizes.niveis[1][3](r);
        return {
          e: `Para qual valor de x o determinante da matriz [${a} x; ${b} ${c}] é igual a zero? ${NOTA_MATRIZ}`,
          r: d / b,
          d: [-d / b, b / a, d, (a + c) / b === d / b ? d / b + 1 : (a + c) / b],
          x: `det = ${a}·${c} − x·${b} = 0 ⇒ ${b}x = ${d} ⇒ x = ${d / b}.`,
        };
      },
    ],
    [
      (r) => {
        const dA = r.int(-4, 6) || 3, dB = r.int(-3, 5) || 2;
        const pede = r.pick(['AB', 'A⁻¹', 'AᵗB']);
        const val = pede === 'A⁻¹' ? fracao(1, dA) : String(dA * dB).replace('-', '−');
        return {
          e: `A e B são matrizes quadradas de ordem 3 com det A = ${dA} e det B = ${dB}. Qual é o valor de det(${pede})?`,
          r: val,
          d: pede === 'A⁻¹' ? [String(-dA).replace('-', '−'), fracao(-1, dA), String(dA).replace('-', '−'), fracao(1, dA * dA)] : [String(dA + dB).replace('-', '−'), String(dA * dB * 3).replace('-', '−'), String(-dA * dB).replace('-', '−'), fracao(dA, dB)],
          x: pede === 'A⁻¹' ? `det(A⁻¹) = 1/det A = ${fracao(1, dA)}.` : `det(${pede}) = det A · det B = ${dA} × ${dB} = ${dA * dB} (e det Aᵗ = det A).`,
        };
      },
      (r) => {
        const m = [[r.int(1, 5), r.int(1, 5)], [r.int(1, 5), r.int(1, 5)]];
        const d = det2(m);
        if (d === 0) return matrizes.niveis[2][1](r);
        const i = r.int(0, 1), j = r.int(0, 1);
        const adj = [[m[1][1], -m[0][1]], [-m[1][0], m[0][0]]];
        return {
          e: `Qual é o elemento da linha ${i + 1}, coluna ${j + 1} da inversa da matriz ${mat2(m)}? ${NOTA_MATRIZ}`,
          r: fracao(adj[i][j], d),
          d: [fracao(m[i][j], d), fracao(-adj[i][j] || 1, d), fracao(1, m[i][j]), fracao(adj[i][j] || 1, -d * 2)],
          x: `Para [a b; c d], A⁻¹ = (1/det)·[d −b; −c a]. det = ${d}. Elemento (${i + 1},${j + 1}) = ${adj[i][j]}/${d} = ${fracao(adj[i][j], d)}.`,
        };
      },
      (r) => {
        const x = r.int(-4, 6), y = r.int(-4, 6), a = r.int(1, 5), b = r.int(1, 5), c = r.int(1, 5), d = r.int(-4, 5);
        const D = a * d - b * c;
        if (D === 0) return matrizes.niveis[2][2](r);
        const e1 = a * x + b * y, e2 = c * x + d * y;
        return {
          e: `No sistema { ${a}x + ${b}y = ${e1} ; ${c}x ${d >= 0 ? '+' : '−'} ${Math.abs(d)}y = ${e2} }, use a regra de Cramer para encontrar x.`,
          r: x,
          d: [y, -x === x ? x + 1 : -x, D, x + y],
          x: `D = ${a}·${d} − ${b}·${c} = ${D}; Dx = ${e1}·${d} − ${b}·${e2} = ${e1 * d - b * e2}. x = Dx/D = ${x}.`,
        };
      },
      (r) => {
        const m = rm(r, -3, 4);
        const sq = [[m[0][0] * m[0][0] + m[0][1] * m[1][0], 0], [0, m[1][0] * m[0][1] + m[1][1] * m[1][1]]];
        const tr = sq[0][0] + sq[1][1];
        return {
          e: `Qual é o traço (soma da diagonal principal) da matriz A², sendo A = ${mat2(m)}? ${NOTA_MATRIZ}`,
          r: tr,
          d: [(m[0][0] + m[1][1]) ** 2, m[0][0] ** 2 + m[1][1] ** 2, tr + 2, det2(m) ** 2 === tr ? tr - 2 : det2(m) ** 2],
          x: `A² tem diagonal ${P(m[0][0])}² + ${P(m[0][1])}·${P(m[1][0])} = ${sq[0][0]} e ${P(m[1][0])}·${P(m[0][1])} + ${P(m[1][1])}² = ${sq[1][1]}. Traço = ${tr}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Geometria analítica
const pt = (x, y) => `(${num(x)}, ${num(y)})`;
const reta = (a, b) => {
  const parteA = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '−x' : `${num(a)}x`;
  const parteB = b === 0 ? '' : `${parteA ? (b > 0 ? ' + ' : ' − ') : b < 0 ? '−' : ''}${num(Math.abs(b))}`;
  return `y = ${parteA}${parteB}` || 'y = 0';
};
const analitica = {
  disciplina: 'matematica',
  arquivo: '16-geometria-analitica',
  titulo: 'Geometria analítica',
  provas: ['ENEM', 'Militares'],
  descricao: 'Distância entre pontos, ponto médio, retas, circunferências e áreas no plano cartesiano.',
  niveis: [
    [
      (r) => {
        const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
        const x1 = r.int(-5, 5), y1 = r.int(-5, 5);
        const sx = r.pick([1, -1]), sy = r.pick([1, -1]);
        return {
          e: `Qual é a distância entre os pontos A${pt(x1, y1)} e B${pt(x1 + sx * a, y1 + sy * b)}?`,
          r: c,
          d: [a + b, c + 1, c * c, Math.abs(a - b) + c === c ? c + 2 : Math.abs(a - b) + c],
          x: `d = √(Δx² + Δy²) = √(${a}² + ${b}²) = √${c * c} = ${c}.`,
        };
      },
      (r) => {
        const x1 = r.int(-8, 8), y1 = r.int(-8, 8), x2 = r.int(-8, 8), y2 = r.int(-8, 8);
        return {
          e: `Qual é o ponto médio do segmento de extremos A${pt(x1, y1)} e B${pt(x2, y2)}?`,
          r: pt((x1 + x2) / 2, (y1 + y2) / 2),
          d: [pt(x1 + x2, y1 + y2), pt((x2 - x1) / 2, (y2 - y1) / 2), pt((x1 + y1) / 2, (x2 + y2) / 2), pt((y1 + y2) / 2, (x1 + x2) / 2)],
          x: `M = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ${pt((x1 + x2) / 2, (y1 + y2) / 2)}.`,
        };
      },
      (r) => {
        const x1 = r.int(-5, 3), dx = r.int(1, 5), y1 = r.int(-5, 5), a = r.int(-4, 4) || 2;
        return {
          e: `Qual é o coeficiente angular da reta que passa por ${pt(x1, y1)} e ${pt(x1 + dx, y1 + a * dx)}?`,
          r: a,
          d: [-a, fracao(1, a), a * dx, fracao(-1, a)],
          x: `m = Δy/Δx = ${a * dx}/${dx} = ${a}.`,
        };
      },
      (r) => {
        const a = r.int(-4, 5) || 2, b = r.int(-6, 6), x = r.int(-4, 6);
        return {
          e: `O ponto P(${x}, k) pertence à reta ${reta(a, b)}. Qual é o valor de k?`,
          r: a * x + b,
          d: [a * x - b, a + x + b, (x - b) / a, a * (x + b)],
          x: `Substituindo x = ${x}: k = ${a}·${x} ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${a * x + b}.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.int(-4, 4) || 1, b = r.int(-6, 6), x1 = r.int(-3, 2), x2 = x1 + r.int(1, 4);
        return {
          e: `Qual é a equação da reta que passa pelos pontos ${pt(x1, a * x1 + b)} e ${pt(x2, a * x2 + b)}?`,
          r: reta(a, b),
          d: [reta(-a, b), reta(a, -b), reta(b === 0 ? a + 1 : b, a), reta(a, b + 1)],
          x: `m = Δy/Δx = ${a}. Usando um ponto: y − ${a * x1 + b} = ${a}(x − ${x1}) ⇒ ${reta(a, b)}.`,
        };
      },
      (r) => {
        const x = r.int(-4, 5), y = r.int(-4, 5), a1 = r.int(-3, 3) || 1;
        let a2 = r.int(-3, 3) || -2;
        if (a2 === a1) a2 = a1 + 1;
        const b1 = y - a1 * x, b2 = y - a2 * x;
        return {
          e: `Qual é o ponto de interseção das retas ${reta(a1, b1)} e ${reta(a2, b2)}?`,
          r: pt(x, y),
          d: [pt(y, x), pt(-x, y), pt(x, -y), pt(x + 1, y + a1)],
          x: `Igualando: ${a1}x + ${b1} = ${a2}x + ${b2} ⇒ x = ${x}; y = ${y}. Ponto ${pt(x, y)}.`,
        };
      },
      (r) => {
        const a = r.int(-6, 6), b = r.int(-6, 6), R = r.int(1, 9);
        const D = -2 * a, E = -2 * b, F = a * a + b * b - R * R;
        const t = (v, s) => (v === 0 ? '' : ` ${v > 0 ? '+' : '−'} ${Math.abs(v)}${s}`);
        return {
          e: `Qual é o raio da circunferência de equação x² + y²${t(D, 'x')}${t(E, 'y')}${t(F, '')} = 0?`,
          r: R,
          d: [R * R, R + 1, Math.abs(F) === R ? R + 2 : Math.abs(F), Math.abs(a) + Math.abs(b) === R ? R + 3 : Math.abs(a) + Math.abs(b)],
          x: `Completando quadrados: (x ${a >= 0 ? '−' : '+'} ${Math.abs(a)})² + (y ${b >= 0 ? '−' : '+'} ${Math.abs(b)})² = ${R * R}. Centro ${pt(a, b)} e raio ${R}.`,
        };
      },
      (r) => {
        const A = [r.int(-4, 0), r.int(-4, 0)], B = [r.int(1, 6), r.int(-3, 1)], C = [r.int(-2, 4), r.int(2, 7)];
        const area = Math.abs(A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])) / 2;
        if (area === 0) return analitica.niveis[1][3](r);
        return {
          e: `Qual é a área do triângulo de vértices A${pt(...A)}, B${pt(...B)} e C${pt(...C)}?`,
          r: area,
          d: [area * 2, area / 2, area + 3, area + 1],
          f: (v) => `${num(v)} u.a.`,
          x: `Área = |D|/2, em que D é o determinante [xA yA 1; xB yB 1; xC yC 1] = ${area * 2 * Math.sign(A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]))}. Área = ${num(area)}.`,
        };
      },
      (r) => {
        const a = r.pick([2, 3, 4, -2, -3, 1, -1]), b = r.int(-5, 5), tipo = r.pick(['paralela', 'perpendicular']);
        const m = tipo === 'paralela' ? fracao(a, 1) : fracao(-1, a);
        return {
          e: `Qual é o coeficiente angular de uma reta ${tipo} à reta ${reta(a, b)}?`,
          r: m,
          d: tipo === 'paralela' ? [fracao(-1, a), fracao(-a, 1), fracao(1, a), fracao(b || 7, 1)] : [fracao(a, 1), fracao(1, a), fracao(-a, 1), fracao(b || 7, 1)],
          x: tipo === 'paralela' ? `Retas paralelas têm o mesmo coeficiente angular: ${m}.` : `Retas perpendiculares: m₁·m₂ = −1 ⇒ m₂ = −1/${a} = ${m}.`,
        };
      },
    ],
    [
      (r) => {
        const [a, b, c] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]]);
        const x0 = r.int(-4, 5), y0 = r.int(-4, 5), k = r.int(1, 4) * r.pick([1, -1]);
        const C = k * c - a * x0 - b * y0;
        const dist = Math.abs(a * x0 + b * y0 + C) / c;
        return {
          e: `Qual é a distância do ponto P${pt(x0, y0)} à reta ${a}x + ${b}y ${C >= 0 ? '+' : '−'} ${Math.abs(C)} = 0?`,
          r: dist,
          d: [Math.abs(a * x0 + b * y0 + C), dist + 1, Math.abs(C) / c === dist ? dist + 2 : Math.abs(C) / c, dist * 2],
          x: `d = |a·x₀ + b·y₀ + c|/√(a² + b²) = |${a * x0 + b * y0 + C}|/${c} = ${num(dist)}.`,
        };
      },
      (r) => {
        const a = r.int(-5, 5), b = r.int(-5, 5), R = r.int(2, 8);
        const tipo = r.pick(['interior', 'exterior', 'sobre']);
        let p;
        if (tipo === 'sobre') {
          const [u, v, w] = r.pick([[3, 4, 5], [0, 1, 1], [1, 0, 1]]);
          p = [a + (u * R) / w, b + (v * R) / w];
          if (!Number.isInteger(p[0]) || !Number.isInteger(p[1])) p = [a + R, b];
        } else if (tipo === 'interior') p = [a + r.int(0, R - 1) * r.pick([1, -1]) * (R > 1 ? 1 : 0), b];
        else p = [a + R + r.int(1, 3), b + r.int(0, 3)];
        const d2 = (p[0] - a) ** 2 + (p[1] - b) ** 2;
        const pos = d2 < R * R ? 'interior à circunferência' : d2 === R * R ? 'pertence à circunferência' : 'exterior à circunferência';
        const opcoes = ['interior à circunferência', 'pertence à circunferência', 'exterior à circunferência', 'é o centro da circunferência', 'não é possível determinar sem o gráfico'];
        if (pos === 'interior à circunferência' && p[0] === a && p[1] === b) return analitica.niveis[2][1](r);
        return {
          e: `Em relação à circunferência (x ${a >= 0 ? '−' : '+'} ${Math.abs(a)})² + (y ${b >= 0 ? '−' : '+'} ${Math.abs(b)})² = ${R * R}, o ponto P${pt(...p)} é:`,
          r: pos,
          d: opcoes.filter((o) => o !== pos),
          x: `Distância² de P ao centro ${pt(a, b)}: ${d2}. Comparando com R² = ${R * R}: ${d2 < R * R ? 'menor ⇒ interior' : d2 === R * R ? 'igual ⇒ pertence' : 'maior ⇒ exterior'}.`,
        };
      },
      (r) => {
        const a = r.pick([2, -2, 3, -3, 1, -1]), b = r.int(-5, 5), x0 = r.int(-4, 4) * Math.abs(a), y0 = r.int(-4, 5);
        const m = -1 / a;
        const bb = y0 - m * x0;
        if (!Number.isInteger(bb * 2)) return analitica.niveis[2][2](r);
        const f = (mm, b2) => {
          const ms = fracao(Math.round(mm * Math.abs(a)), Math.abs(a));
          const bs = b2 === 0 ? '' : ` ${b2 > 0 ? '+' : '−'} ${num(Math.abs(b2))}`;
          return `y = ${ms === '1' ? '' : ms === '−1' ? '−' : ms}x${bs}`;
        };
        return {
          e: `Qual é a equação da reta perpendicular à reta ${reta(a, b)} que passa pelo ponto ${pt(x0, y0)}?`,
          r: f(m, bb),
          d: [f(a, y0 - a * x0), f(-m, y0 + m * x0), f(m, -bb || 1), f(1 / a, y0 - x0 / a)],
          x: `Perpendicular ⇒ m = −1/${a} = ${fracao(-1, a)}. y − ${y0} = ${fracao(-1, a)}(x − ${x0}) ⇒ ${f(m, bb)}.`,
        };
      },
      (r) => {
        const a = r.int(-5, 5), b = r.int(-5, 5), R = r.int(2, 9);
        const D = -2 * a, E = -2 * b, F = a * a + b * b - R * R;
        const t = (v, s) => (v === 0 ? '' : ` ${v > 0 ? '+' : '−'} ${Math.abs(v)}${s}`);
        return {
          e: `Qual é o centro da circunferência x² + y²${t(D, 'x')}${t(E, 'y')}${t(F, '')} = 0?`,
          r: pt(a, b),
          d: [pt(-a, -b), pt(D, E), pt(b, a), pt(-a, b)],
          x: `O centro é (−D/2, −E/2) = (${-D}/2, ${-E}/2) = ${pt(a, b)}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Complexos e polinômios
const cx = (a, b) => {
  if (b === 0) return num(a);
  const im = Math.abs(b) === 1 ? 'i' : `${num(Math.abs(b))}i`;
  if (a === 0) return (b < 0 ? '−' : '') + im;
  return `${num(a)} ${b < 0 ? '−' : '+'} ${im}`;
};
const poli = (coefs) => {
  // coefs do maior grau para o menor
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
  return partes.map((p, i) => (i === 0 ? (p.s === '−' ? '−' : '') + p.t : ` ${p.s} ${p.t}`)).join('');
};
const complexos = {
  disciplina: 'matematica',
  arquivo: '17-numeros-complexos-e-polinomios',
  titulo: 'Números complexos e polinômios',
  provas: ['Militares'],
  descricao: 'Operações com complexos, módulo, potências de i, forma trigonométrica, teorema do resto e relações de Girard.',
  niveis: [
    [
      (r) => {
        const n = r.int(5, 200);
        const val = ['1', 'i', '−1', '−i'][n % 4];
        return {
          e: `Qual é o valor de i${String(n).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')}?`,
          r: val,
          d: ['1', 'i', '−1', '−i', '0'].filter((v) => v !== val),
          x: `As potências de i se repetem a cada 4. ${n} dividido por 4 deixa resto ${n % 4}, então i^${n} = i^${n % 4} = ${val}.`,
        };
      },
      (r) => {
        const a = r.int(-5, 6), b = r.int(-5, 6) || 1, c = r.int(-5, 6), d = r.int(-5, 6) || 2;
        return {
          e: `Qual é o resultado de (${cx(a, b)}) · (${cx(c, d)})?`,
          r: cx(a * c - b * d, a * d + b * c),
          d: [cx(a * c + b * d, a * d + b * c), cx(a * c, b * d), cx(a * c - b * d, a * d - b * c), cx(a + c, b + d)],
          x: `(a + bi)(c + di) = (ac − bd) + (ad + bc)i = (${a * c} − ${b * d}) + (${a * d} + ${b * c})i = ${cx(a * c - b * d, a * d + b * c)}. Lembre que i² = −1.`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [0, 7, 7], [9, 12, 15]]);
        const sa = r.pick([1, -1]), sb = r.pick([1, -1]);
        return {
          e: `Qual é o módulo do número complexo z = ${cx(sa * a, sb * b)}?`,
          r: c,
          d: [a + b, c * c, c + 1, Math.abs(a - b) || c + 2],
          x: `|z| = √(a² + b²) = √(${a * a} + ${b * b}) = ${c}.`,
        };
      },
      (r) => {
        const coefs = [r.int(1, 3), r.int(-4, 4), r.int(-5, 5), r.int(-6, 6)], k = r.int(-3, 3);
        const val = coefs.reduce((s, c) => s * k + c, 0);
        return {
          e: `Qual é o valor numérico do polinômio P(x) = ${poli(coefs)} para x = ${k}?`,
          r: val,
          d: [val + 2, -val === val ? val + 4 : -val, coefs.reduce((s, c) => s + c, 0) === val ? val - 3 : coefs.reduce((s, c) => s + c, 0), val - 1],
          x: `P(${k}) = ${coefs[0]}·(${k})³ + ${P(coefs[1])}·(${k})² + ${P(coefs[2])}·(${k}) + ${P(coefs[3])} = ${val}.`,
        };
      },
    ],
    [
      (r) => {
        // (a+bi)/(c+di) com resultado inteiro
        const p = r.int(-4, 4), q = r.int(-4, 4) || 1, c = r.int(1, 3), d = r.int(-3, 3) || 1;
        const a = p * c - q * d, b = p * d + q * c;
        return {
          e: `Qual é o resultado da divisão (${cx(a, b)}) ÷ (${cx(c, d)})?`,
          r: cx(p, q),
          d: [cx(q, p), cx(p, -q), cx(-p, q), cx(a / c === p ? p + 1 : Math.round(a / c), b / d === q ? q - 1 : Math.round(b / d))],
          x: `Multiplicamos numerador e denominador pelo conjugado ${cx(c, -d)}: o denominador vira ${c * c + d * d} e o resultado é ${cx(p, q)}.`,
        };
      },
      (r) => {
        const coefs = [r.int(1, 3), r.int(-4, 4), r.int(-5, 5), r.int(-6, 6)], a = r.int(-3, 3) || 2;
        const val = coefs.reduce((s, c) => s * a + c, 0);
        return {
          e: `Qual é o resto da divisão de P(x) = ${poli(coefs)} por (x ${a >= 0 ? '−' : '+'} ${Math.abs(a)})?`,
          r: val,
          d: [coefs.reduce((s, c) => s * -a + c, 0) === val ? val + 3 : coefs.reduce((s, c) => s * -a + c, 0), coefs[3], val + 1, 0 === val ? 5 : 0],
          x: `Teorema do resto: o resto da divisão por (x − ${a}) é P(${a}) = ${val}.`,
        };
      },
      (r) => {
        const a = r.pick([1, 2, 3]), r1 = r.int(-3, 3), r2 = r.int(-3, 4), r3 = r.int(-2, 5);
        const b = -a * (r1 + r2 + r3), c = a * (r1 * r2 + r1 * r3 + r2 * r3), d = -a * r1 * r2 * r3;
        const pede = r.pick(['soma', 'produto']);
        const val = pede === 'soma' ? fracao(-b, a) : fracao(-d, a);
        return {
          e: `Qual é o ${pede} das raízes da equação ${poli([a, b, c, d])} = 0?`,
          r: val,
          d: pede === 'soma' ? [fracao(b, a), fracao(c, a), fracao(-d, a) === val ? fracao(-d + 1, a) : fracao(-d, a), fracao(-b + a, a)] : [fracao(d, a) === val ? fracao(d + a, a) : fracao(d, a), fracao(-b, a) === val ? fracao(-b + 2, a) : fracao(-b, a), fracao(c, a) === val ? fracao(c + 1, a) : fracao(c, a), fracao(-d - a, a)],
          x: pede === 'soma' ? `Girard: x₁ + x₂ + x₃ = −b/a = ${fracao(-b, a)}.` : `Girard (grau 3): x₁·x₂·x₃ = −d/a = ${fracao(-d, a)}.`,
        };
      },
      (r) => {
        const a = r.int(-6, 6) || 1, b = r.int(-6, 6) || 2;
        return {
          e: `Sendo z = ${cx(a, b)} e z̄ o seu conjugado, qual é o valor de z · z̄?`,
          r: a * a + b * b,
          d: [a * a - b * b, cx(a * a, b * b), 2 * a, cx(a * a - b * b, 2 * a * b)],
          x: `z · z̄ = (a + bi)(a − bi) = a² + b² = ${a * a} + ${b * b} = ${a * a + b * b} (sempre real, igual a |z|²).`,
        };
      },
    ],
    [
      (r) => {
        const r1 = r.int(-3, 3), r2 = r.int(-4, 4), r3 = r.int(-4, 4);
        const b = -(r1 + r2 + r3), c = r1 * r2 + r1 * r3 + r2 * r3, d = -r1 * r2 * r3;
        return {
          e: `Sabendo que ${r1} é raiz do polinômio P(x) = ${poli([1, b, c, d])}, qual é a soma das outras duas raízes?`,
          r: r2 + r3,
          d: [r2 * r3, -(r2 + r3) === r2 + r3 ? r2 + r3 + 2 : -(r2 + r3), -b, r2 + r3 + r1 === r2 + r3 ? r2 + r3 + 1 : r2 + r3 + r1],
          x: `Pela soma das raízes (Girard): x₁ + x₂ + x₃ = ${-b}. Como uma delas é ${r1}, as outras somam ${-b} − (${r1}) = ${r2 + r3}.`,
        };
      },
      (r) => {
        const [z, mod, arg] = r.pick([
          ['1 + i√3', '2', '60°'],
          ['√3 + i', '2', '30°'],
          ['1 + i', '√2', '45°'],
          ['−1 + i', '√2', '135°'],
          ['−√3 + i', '2', '150°'],
          ['−1 − i√3', '2', '240°'],
          ['2i', '2', '90°'],
          ['−3', '3', '180°'],
          ['1 − i', '√2', '315°'],
        ]);
        const args = ['30°', '45°', '60°', '90°', '120°', '135°', '150°', '180°', '210°', '240°', '300°', '315°'];
        return {
          e: `Na forma trigonométrica, z = ${z} tem módulo ${mod} e argumento principal igual a:`,
          r: arg,
          d: r.shuffle(args.filter((a) => a !== arg)),
          x: `cos θ = a/|z| e sen θ = b/|z|. Os sinais de a e b indicam o quadrante; com os valores notáveis, θ = ${arg}.`,
        };
      },
      (r) => {
        const n = r.pick([2, 4, 6, 8, 10, 12]);
        // (1+i)^n = (2i)^(n/2)
        const k = n / 2;
        const mag = 2 ** k;
        const unid = ['1', 'i', '−1', '−i'][k % 4];
        const val = unid === '1' ? num(mag) : unid === '−1' ? `−${num(mag)}` : unid === 'i' ? `${num(mag)}i` : `−${num(mag)}i`;
        return {
          e: `Qual é o valor de (1 + i)^${n}?`,
          r: val,
          d: [`${num(mag)}`, `${num(mag)}i`, `−${num(mag)}`, `−${num(mag)}i`, `${num(2 ** n)}`].filter((v) => v !== val),
          x: `(1 + i)² = 1 + 2i + i² = 2i. Então (1 + i)^${n} = (2i)^${k} = 2^${k} · i^${k} = ${val}.`,
        };
      },
      (r) => {
        const a = r.int(-3, 3) || 2, p = r.int(1, 3), q = r.int(-4, 4);
        // P(x) = x³ + p x² + q x + m divisível por (x − a) => P(a) = 0
        const m = -(a ** 3 + p * a * a + q * a);
        return {
          e: `Para que valor de m o polinômio P(x) = ${poli([1, p, q, 0])} + m é divisível por (x ${a >= 0 ? '−' : '+'} ${Math.abs(a)})?`,
          r: m,
          d: [-m === m ? m + 4 : -m, m + a, a ** 3 + p * a * a === m ? m + 1 : a ** 3 + p * a * a, m - 2],
          x: `Divisível ⇔ P(${a}) = 0: ${a ** 3} + ${p * a * a} + ${q * a} + m = 0 ⇒ m = ${m}.`,
        };
      },
    ],
  ],
};

void pctFr; void mdc;
export default [combinatoria, probabilidade, grandezas, matrizes, analitica, complexos];
