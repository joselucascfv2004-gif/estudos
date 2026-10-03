// Matemática — Análise combinatória.
import { arranjo, comb, expl, fatorial, nome, num, sup } from './util.mjs';

const PALAVRAS_DISTINTAS = ['AMOR', 'GATO', 'LIVRO', 'CAMPO', 'PEDRA', 'MUNDO', 'PRATO', 'BRASIL', 'FILHO', 'NOITE', 'CHUVA', 'ESCOLA'];
const PALAVRAS_REP = [
  ['BANANA', 60, '6!/(3!·2!)'],
  ['ARARA', 10, '5!/(3!·2!)'],
  ['CASA', 12, '4!/2!'],
  ['PAPAI', 30, '5!/(2!·2!)'],
  ['BATATA', 60, '6!/(3!·2!)'],
  ['MATEMATICA', 151200, '10!/(3!·2!·2!)'],
  ['ARROZ', 60, '5!/2!'],
  ['OSSO', 6, '4!/(2!·2!)'],
  ['PARALELA', 3360, '8!/(3!·2!)'],
];

const facil = [
  // 1. roupas
  (r) => {
    const a = r.int(2, 8), b = r.int(2, 6), c = r.int(2, 5);
    return {
      e: `${nome(r)} tem ${a} camisetas, ${b} calças e ${c} pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?`,
      r: a * b * c,
      d: [a + b + c, a * b + c, a * b * c * 2, (a + b) * c],
      x: expl('princípio multiplicativo', 'Escolhas em etapas (uma E depois outra) se multiplicam.', `${a} × ${b} × ${c} = ${a * b * c}.`),
    };
  },
  // 2. anagramas distintos
  (r) => {
    const p = r.pick(PALAVRAS_DISTINTAS);
    const n = p.length;
    return {
      e: `Quantos anagramas tem a palavra ${p}?`,
      r: fatorial(n),
      d: [fatorial(n - 1), n * n, fatorial(n) / 2, n ** 3],
      x: expl('permutação simples', `Para a 1ª letra há ${n} opções, para a 2ª, ${n - 1}, e assim por diante: n!.`, `${n}! = ${num(fatorial(n))}.`),
    };
  },
  // 3. senhas com repetição
  (r) => {
    const k = r.int(3, 6);
    return {
      e: `Quantas senhas de ${k} dígitos (de 0 a 9) podem ser formadas, se for permitido repetir dígitos?`,
      r: 10 ** k,
      d: [arranjo(10, k), 10 * k, 9 ** k, 10 ** (k - 1)],
      x: expl('princípio multiplicativo', 'Cada posição tem 10 opções, independentemente das outras.', `10${sup(k)} = ${num(10 ** k)}.`),
    };
  },
  // 4. apertos de mão
  (r) => {
    const n = r.int(5, 30);
    return {
      e: `Em uma reunião com ${n} pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?`,
      r: comb(n, 2),
      d: [n * (n - 1), n * n, n * 2, comb(n, 2) + n],
      x: expl('combinação de 2', 'Um aperto é um par de pessoas; "A com B" é o mesmo que "B com A", então a ordem não importa.', `C(${n}, 2) = ${n} × ${n - 1} ÷ 2 = ${comb(n, 2)}.`),
    };
  },
  // 5. estradas
  (r) => {
    const a = r.int(2, 6), b = r.int(2, 5), c = r.int(2, 4);
    return {
      e: `De uma cidade A a uma cidade B há ${a} estradas, e de B a C há ${b} estradas. Também há ${c} estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?`,
      r: a * b + c,
      d: [a * b * c, a + b + c, a * b, (a + c) * b],
      x: expl('multiplicar "e", somar "ou"', 'Passar por B é uma etapa E outra (multiplica); ir direto é OUTRA opção (soma).', `${a} × ${b} + ${c} = ${a * b + c}.`),
    };
  },
  // 6. lanche com item opcional
  (r) => {
    const s = r.int(3, 6), b = r.int(2, 5), d = r.int(2, 4);
    return {
      e: `Uma lanchonete monta combos com 1 sanduíche (${s} opções) e 1 bebida (${b} opções); a sobremesa é opcional (${d} opções, ou nenhuma). Quantos combos diferentes podem ser montados?`,
      r: s * b * (d + 1),
      d: [s * b * d, s * b + d, s + b + d, s * b * d + 1],
      x: expl('"não escolher" também é opção', `Para a sobremesa existem ${d} escolhas + a opção "sem sobremesa" = ${d + 1}.`, `${s} × ${b} × ${d + 1} = ${s * b * (d + 1)}.`),
    };
  },
  // 7. razão de fatoriais
  (r) => {
    const n = r.int(6, 12), k = n - r.int(2, 3);
    return {
      e: `Qual é o valor de ${n}!/${k}!?`,
      r: fatorial(n) / fatorial(k),
      d: [n - k, fatorial(n - k), n * k, fatorial(n) / fatorial(k) / 2],
      x: expl('simplificar fatoriais', `${n}! = ${n} × ${n - 1} × ... × ${k + 1} × ${k}!. O ${k}! cancela.`, `${Array.from({ length: n - k }, (_, i) => n - i).join(' × ')} = ${num(fatorial(n) / fatorial(k))}.`),
    };
  },
  // 8. bandeira com faixas
  (r) => {
    const cores = r.int(4, 7), faixas = 3;
    return {
      e: `Uma bandeira tem ${faixas} faixas horizontais, e cada uma deve ser pintada com uma cor diferente, escolhida entre ${cores} cores disponíveis. Quantas bandeiras diferentes podem ser feitas?`,
      r: arranjo(cores, faixas),
      d: [comb(cores, faixas), cores ** faixas, cores * faixas, fatorial(cores)],
      x: expl('arranjo (a ordem importa)', 'Trocar as cores de lugar gera outra bandeira: a ordem importa e não se repete cor.', `${cores} × ${cores - 1} × ${cores - 2} = ${arranjo(cores, faixas)}.`),
    };
  },
  // 9. placa de identificação
  (r) => {
    const l = r.pick([1, 2]), d = r.pick([2, 3]);
    const tot = 26 ** l * 10 ** d;
    return {
      e: `As bicicletas de um condomínio recebem um código com ${l === 1 ? '1 letra' : '2 letras'} (de 26) seguida${l === 1 ? '' : 's'} de ${d} algarismos (0 a 9), podendo repetir. Quantos códigos diferentes existem?`,
      r: tot,
      d: [26 * l + 10 * d, 26 * l * 10 * d, 36 ** (l + d), tot / 10],
      x: expl('princípio multiplicativo', 'Cada posição é uma etapa com suas opções.', `26${l > 1 ? sup(l) : ''} × 10${sup(d)} = ${num(tot)}.`),
    };
  },
  // 10. turno e returno
  (r) => {
    const n = r.int(6, 20);
    return {
      e: `Em um campeonato com ${n} times, cada time enfrenta todos os outros duas vezes (turno e returno, uma vez em casa e outra fora). Quantos jogos são disputados?`,
      r: n * (n - 1),
      d: [comb(n, 2), n * n, 2 * n, n * (n - 1) * 2],
      x: expl('pares ordenados', '"A em casa contra B" é diferente de "B em casa contra A": a ordem importa.', `${n} × ${n - 1} = ${n * (n - 1)} jogos.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[3].vezes = 2;
facil[5].vezes = 2;
facil[7].vezes = 2;

const medio = [
  // 1. comissão
  (r) => {
    const n = r.int(6, 15), k = r.int(2, 4);
    return {
      e: `De quantas maneiras é possível escolher uma comissão de ${k} pessoas entre ${n} candidatos?`,
      r: comb(n, k),
      d: [arranjo(n, k), n * k, comb(n, k - 1), comb(n, k) * 2],
      x: expl('combinação', 'Numa comissão todos têm o mesmo papel: a ordem não importa. Calcule o arranjo e divida pelas k! ordens repetidas.', `C(${n}, ${k}) = ${arranjo(n, k)} ÷ ${k}! = ${comb(n, k)}.`),
    };
  },
  // 2. anagramas com repetição
  (r) => {
    const [p, v, como] = r.pick(PALAVRAS_REP);
    return {
      e: `Quantos anagramas tem a palavra ${p}?`,
      r: v,
      d: [fatorial(p.length), v * 2, v % 2 === 0 ? v / 2 : v + 6, fatorial(p.length - 1)],
      x: expl('permutação com repetição', 'Letras iguais trocadas entre si não geram anagrama novo; divida pelo fatorial de cada repetição.', `${como} = ${num(v)}.`),
    };
  },
  // 3. pódio
  (r) => {
    const n = r.int(5, 20);
    return {
      e: `Em uma corrida com ${n} atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?`,
      r: arranjo(n, 3),
      d: [comb(n, 3), n * 3, n ** 3, arranjo(n, 2)],
      x: expl('arranjo', 'No pódio a ordem importa (ouro ≠ prata).', `${n} × ${n - 1} × ${n - 2} = ${arranjo(n, 3)}.`),
    };
  },
  // 4. anagramas começando por vogal
  (r) => {
    const p = r.pick(['PROVA', 'LIVRO', 'CANETA', 'ESTUDO', 'FIRME', 'GRUPO']).toString();
    if (new Set(p).size !== p.length) return medio[3](r);
    const vogais = [...p].filter((c) => 'AEIOU'.includes(c)).length;
    const n = p.length;
    return {
      e: `Quantos anagramas da palavra ${p} começam por vogal?`,
      r: vogais * fatorial(n - 1),
      d: [fatorial(n), fatorial(n - 1), (n - vogais) * fatorial(n - 1), vogais * fatorial(n - 2)],
      x: expl('resolver a restrição primeiro', 'Preencha primeiro a posição que tem regra; o resto é livre.', `${vogais} vogais para a 1ª posição × ${n - 1}! para as outras = ${vogais * fatorial(n - 1)}.`),
    };
  },
  // 5. códigos letras + algarismos
  (r) => {
    const l = r.int(2, 3), d = r.int(2, 4);
    const tot = 26 ** l * 10 ** d;
    return {
      e: `Um sistema de códigos usa ${l} letras (de um alfabeto de 26) seguidas de ${d} algarismos (0 a 9), sem repetir nenhuma letra nem nenhum algarismo. Quantos códigos diferentes existem?`,
      r: arranjo(26, l) * arranjo(10, d),
      d: [tot, 26 * l + 10 * d, comb(26, l) * comb(10, d), arranjo(26, l) + arranjo(10, d)],
      x: expl('arranjo em cada bloco', 'Sem repetição, cada escolha tem uma opção a menos que a anterior.', `${Array.from({ length: l }, (_, i) => 26 - i).join(' × ')} × ${Array.from({ length: d }, (_, i) => 10 - i).join(' × ')} = ${num(arranjo(26, l) * arranjo(10, d))}.`),
    };
  },
  // 6. pizza de dois sabores
  (r) => {
    const n = r.int(6, 15);
    return {
      e: `Uma pizzaria oferece ${n} sabores. Quantas pizzas diferentes de 2 sabores (meio a meio, com sabores distintos) podem ser pedidas?`,
      r: comb(n, 2),
      d: [n * (n - 1), n * n, 2 * n, comb(n, 2) + n],
      x: expl('combinação', '"Calabresa com queijo" é a mesma pizza que "queijo com calabresa".', `C(${n}, 2) = ${n} × ${n - 1} ÷ 2 = ${comb(n, 2)}.`),
    };
  },
  // 7. aposta com mais números
  (r) => {
    const k = r.pick([7, 8, 9, 10]);
    return {
      e: `Na Mega-Sena, uma aposta simples tem 6 números. Uma aposta com ${k} números equivale a quantas apostas simples?`,
      r: comb(k, 6),
      d: [k - 6, arranjo(k, 6) / 100 > 1000 ? comb(k, 6) * 2 : arranjo(k, 6), k * 6, comb(k, 5) + 1],
      x: expl('combinação', 'Cada grupo de 6 números escolhido entre os apostados é uma aposta simples; a ordem do sorteio não importa.', `C(${k}, 6) = ${comb(k, 6)}.`),
    };
  },
  // 8. triângulos com pontos da circunferência
  (r) => {
    const n = r.int(6, 12);
    return {
      e: `Há ${n} pontos marcados sobre uma circunferência. Quantos triângulos diferentes podem ser formados com vértices nesses pontos?`,
      r: comb(n, 3),
      d: [arranjo(n, 3), comb(n, 2), n * 3, comb(n, 3) * 2],
      x: expl('combinação de 3', 'Três pontos de uma circunferência nunca estão alinhados, e a ordem dos vértices não muda o triângulo.', `C(${n}, 3) = ${n} × ${n - 1} × ${n - 2} ÷ 6 = ${comb(n, 3)}.`),
    };
  },
  // 9. senha sem repetição
  (r) => {
    const k = r.pick([3, 4, 5]);
    return {
      e: `Quantas senhas de ${k} dígitos (0 a 9) podem ser criadas se não for permitido repetir dígitos?`,
      r: arranjo(10, k),
      d: [10 ** k, comb(10, k), 10 * k, arranjo(9, k)],
      x: expl('arranjo', 'Cada dígito usado sai da lista de opções.', `${Array.from({ length: k }, (_, i) => 10 - i).join(' × ')} = ${num(arranjo(10, k))}.`),
    };
  },
  // 10. subconjuntos
  (r) => {
    const n = r.int(4, 10);
    const item = r.pick(['ingredientes para uma salada', 'acessórios para um carro', 'coberturas para um sorvete']);
    return {
      e: `Há ${n} ${item} disponíveis. Quantas escolhas diferentes existem, considerando que se pode escolher qualquer quantidade deles (inclusive nenhum)?`,
      r: 2 ** n,
      d: [n * n, fatorial(n) > 5000 ? 2 ** n - 1 : fatorial(n), 2 * n, 2 ** n - 1],
      x: expl('sim ou não para cada item', 'Cada item tem duas possibilidades: entra ou não entra.', `2${sup(n)} = ${2 ** n}.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[2].vezes = 2;
medio[5].vezes = 2;
medio[7].vezes = 2;

const dificil = [
  // 1. comissão com restrição de gênero
  (r) => {
    const h = r.int(4, 8), mu = r.int(3, 7), k = r.int(4, 5), m = 2;
    return {
      e: `Uma comissão de ${k} pessoas será formada a partir de ${h} homens e ${mu} mulheres. Quantas comissões diferentes têm exatamente ${m} mulheres?`,
      r: comb(mu, m) * comb(h, k - m),
      d: [comb(h + mu, k), comb(mu, m) + comb(h, k - m), comb(mu, m) * comb(h, k), arranjo(mu, m) * comb(h, k - m)],
      x: expl('combinação em grupos', 'Escolha as mulheres E os homens separadamente e multiplique.', `C(${mu}, ${m}) × C(${h}, ${k - m}) = ${comb(mu, m)} × ${comb(h, k - m)} = ${comb(mu, m) * comb(h, k - m)}.`),
    };
  },
  // 2. casal junto
  (r) => {
    const n = r.int(4, 8);
    return {
      e: `De quantas maneiras ${n} pessoas podem se sentar em uma fila de ${n} cadeiras se duas delas, que são irmãos, devem ficar sempre lado a lado?`,
      r: 2 * fatorial(n - 1),
      d: [fatorial(n), fatorial(n - 1), fatorial(n) - 2 * fatorial(n - 1), 2 * fatorial(n - 2)],
      x: expl('técnica do bloco', 'Cole os dois num "bloco": agora são n − 1 elementos. Depois, o bloco pode ter os dois em 2 ordens.', `2 × ${n - 1}! = ${2 * fatorial(n - 1)}.`),
    };
  },
  // 3. mesa circular
  (r) => {
    const n = r.int(4, 9);
    return {
      e: `De quantas maneiras ${n} pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)`,
      r: fatorial(n - 1),
      d: [fatorial(n), fatorial(n) / 2, fatorial(n - 2), n * n],
      x: expl('permutação circular', 'Fixe uma pessoa (para eliminar as rotações) e permute as outras.', `(${n} − 1)! = ${num(fatorial(n - 1))}.`),
    };
  },
  // 4. bolas e barras
  (r) => {
    const n = r.int(4, 15);
    return {
      e: `Quantas soluções inteiras não negativas tem a equação x + y + z = ${n}?`,
      r: comb(n + 2, 2),
      d: [comb(n + 2, 3), comb(n, 2), comb(n - 1, 2), n ** 2],
      x: expl('bolas e barras', `Imagine ${n} bolinhas e 2 barras separando-as em 3 grupos: basta escolher a posição das 2 barras entre ${n + 2} lugares.`, `C(${n + 2}, 2) = ${comb(n + 2, 2)}.`),
    };
  },
  // 5. números pares com algarismos distintos
  (r) => {
    const k = r.pick([5, 6, 7]);
    const pares = Math.floor(k / 2);
    const tot = pares * (k - 1) * (k - 2);
    return {
      e: `Usando apenas os algarismos 1, 2, ..., ${k}, quantos números pares de três algarismos distintos podem ser formados?`,
      r: tot,
      d: [k * (k - 1) * (k - 2), pares * k * k, (k - pares) * (k - 1) * (k - 2), tot / 2],
      x: expl('começar pela restrição', `A unidade precisa ser par (${pares} opções). Depois: ${k - 1} para a centena e ${k - 2} para a dezena.`, `${pares} × ${k - 1} × ${k - 2} = ${tot}.`),
    };
  },
  // 6. caminhos na grade
  (r) => {
    const a = r.int(3, 6), b = r.int(2, 5);
    return {
      e: `Em um bairro com ruas em forma de grade, uma pessoa precisa andar ${a} quarteirões para o leste e ${b} para o norte, sempre se aproximando do destino. Quantos caminhos diferentes ela pode fazer?`,
      r: comb(a + b, a),
      d: [a * b, 2 ** (a + b), fatorial(a + b), comb(a + b, a) * 2],
      x: expl('anagramas de L e N', `Todo caminho é uma sequência de ${a} letras L e ${b} letras N. Contar caminhos = contar anagramas.`, `${a + b}!/(${a}! · ${b}!) = ${comb(a + b, a)}.`),
    };
  },
  // 7. pelo menos uma mulher
  (r) => {
    const h = r.int(5, 8), mu = r.int(3, 5), k = r.pick([3, 4]);
    return {
      e: `Uma equipe de ${k} pessoas será escolhida entre ${h} homens e ${mu} mulheres. Quantas equipes têm PELO MENOS uma mulher?`,
      r: comb(h + mu, k) - comb(h, k),
      d: [comb(h + mu, k), comb(mu, 1) * comb(h + mu - 1, k - 1), comb(h, k), mu * comb(h, k - 1)],
      x: expl('complementar', 'Contar "pelo menos uma" diretamente é trabalhoso. Conte tudo e tire as equipes sem mulher nenhuma.', `C(${h + mu}, ${k}) − C(${h}, ${k}) = ${comb(h + mu, k)} − ${comb(h, k)} = ${comb(h + mu, k) - comb(h, k)}.`),
    };
  },
  // 8. livros agrupados por matéria
  (r) => {
    const a = r.int(2, 4), b = r.int(2, 4);
    return {
      e: `Uma estante vai receber ${a} livros diferentes de Matemática e ${b} livros diferentes de Português. De quantas maneiras eles podem ser organizados em fila, se os livros da mesma matéria devem ficar juntos?`,
      r: 2 * fatorial(a) * fatorial(b),
      d: [fatorial(a) * fatorial(b), fatorial(a + b), 2 * fatorial(a + b), fatorial(a) + fatorial(b)],
      x: expl('blocos dentro de blocos', 'Os dois blocos (Matemática e Português) podem trocar de ordem (2!). Dentro de cada bloco, os livros permutam.', `2! × ${a}! × ${b}! = 2 × ${fatorial(a)} × ${fatorial(b)} = ${2 * fatorial(a) * fatorial(b)}.`),
    };
  },
  // 9. distribuição com pelo menos um
  (r) => {
    const n = r.int(6, 12), c = r.pick([3, 4]);
    return {
      e: `De quantas maneiras ${n} balas iguais podem ser distribuídas entre ${c} crianças, de modo que cada criança receba pelo menos uma bala?`,
      r: comb(n - 1, c - 1),
      d: [comb(n + c - 1, c - 1), c ** n > 1e6 ? comb(n, c) : c ** n, comb(n, c), n * c],
      x: expl('bolas e barras com mínimo', `Dê primeiro 1 bala a cada criança; sobram ${n - c} para distribuir livremente.`, `C(${n - c} + ${c - 1}, ${c - 1}) = C(${n - 1}, ${c - 1}) = ${comb(n - 1, c - 1)}.`),
    };
  },
  // 10. números maiores que um limite
  (r) => {
    const lim = r.pick([5, 6, 7]);
    const tot = (10 - lim) * 8 * 7 * 6;
    return {
      e: `Usando os algarismos de 1 a 9, sem repetição, quantos números de 4 algarismos maiores que ${lim}.000 podem ser formados?`,
      r: tot,
      d: [arranjo(9, 4), (9 - lim) * 8 * 7 * 6, (10 - lim) * 9 * 9 * 9, (10 - lim) * comb(8, 3)],
      x: expl('primeira casa com restrição', `Para passar de ${lim}.000, o milhar deve ser de ${lim} a 9 (${10 - lim} opções; ${lim}.000 exato não se forma, pois não há zero). Depois 8, 7 e 6 opções.`, `${10 - lim} × 8 × 7 × 6 = ${num(tot)}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[5].vezes = 2;
dificil[6].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '12-analise-combinatoria',
    titulo: 'Análise combinatória',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Princípio fundamental da contagem, permutações, arranjos e combinações.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
