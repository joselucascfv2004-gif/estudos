// Matemática — Probabilidade.
import { comb, expl, fracao, nomes, num, sup } from './util.mjs';
import NOVOS from './mat-novos-extras.mjs';
import { novos } from './util.mjs';

const pctT = (v) => `${num(v)}%`;

const facil = [
  // 1. dado
  (r) => {
    const [evento, fav] = r.pick([['um número par', 3], ['um número maior que 4', 2], ['um múltiplo de 3', 2], ['um número primo', 3], ['o número 6', 1], ['um número menor que 3', 2]]);
    return {
      e: `Ao lançar um dado comum (faces de 1 a 6), qual é a probabilidade de sair ${evento}?`,
      r: fracao(fav, 6),
      d: [fracao(6 - fav, 6), fracao(fav, 12), fracao(1, 6), '1/2', fracao(fav + 1, 6), fracao(fav, 36), '1/3'],
      x: expl('casos favoráveis ÷ casos possíveis', 'Liste o que serve e divida pelo total de resultados igualmente prováveis.', `${fav} de 6: ${fracao(fav, 6)}.`),
    };
  },
  // 2. urna
  (r) => {
    const b = r.int(2, 12), p = r.int(2, 12), v = r.int(0, 6);
    const t = b + p + v;
    return {
      e: `Uma urna tem ${b} bolas brancas, ${p} pretas${v ? ` e ${v} ${v === 1 ? 'vermelha' : 'vermelhas'}` : ''}. Retirando uma bola ao acaso, qual é a probabilidade de ela ser branca?`,
      r: fracao(b, t),
      d: [fracao(b, p), fracao(p, t), fracao(t - b, t), fracao(1, t)],
      x: expl('casos favoráveis ÷ total', 'O total é a soma de todas as bolas, não só das outras cores.', `${b}/${t} = ${fracao(b, t)}.`),
    };
  },
  // 3. moeda: todas caras
  (r) => {
    const n = r.int(2, 6);
    return {
      e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de sair cara em todos os lançamentos?`,
      r: fracao(1, 2 ** n),
      d: [fracao(1, 2 * n), fracao(1, 2), fracao(n, 2 ** n), fracao(2 ** n - 1, 2 ** n)],
      x: expl('eventos independentes ("e")', 'Um lançamento não influencia o outro: multiplique as probabilidades.', `(1/2)${sup(n)} = 1/${2 ** n}.`),
    };
  },
  // 4. múltiplos
  (r) => {
    const N = r.pick([20, 30, 40, 50, 60, 100]), k = r.pick([3, 4, 6, 7]);
    const fav = Math.floor(N / k);
    return {
      e: `Um número é sorteado ao acaso entre 1 e ${N} (inclusive). Qual é a probabilidade de ele ser múltiplo de ${k}?`,
      r: fracao(fav, N),
      d: [fracao(1, k) === fracao(fav, N) ? fracao(fav + 1, N) : fracao(1, k), fracao(fav, N - fav), fracao(N - fav, N), fracao(k, N)],
      x: expl('contar os favoráveis', `Conte os múltiplos de ${k} até ${N}: ${N} ÷ ${k} = ${num(N / k)} → ${fav}.`, `${fav}/${N} = ${fracao(fav, N)}.`),
    };
  },
  // 5. rifa
  (r) => {
    const total = r.pick([200, 400, 500, 1000]), premios = r.pick([2, 4, 5, 10, 20]);
    return {
      e: `Em uma rifa com ${total} bilhetes, ${premios} são premiados. Quem compra um bilhete tem que probabilidade de ser premiado?`,
      r: pctT((premios / total) * 100),
      d: [pctT(premios), pctT((premios / total) * 1000), pctT(100 - (premios / total) * 100), pctT((premios / total) * 10)],
      x: expl('probabilidade em porcentagem', 'Divida e multiplique por 100.', `${premios}/${total} = ${num(premios / total, 3)} = ${pctT((premios / total) * 100)}.`),
    };
  },
  // 6. baralho
  (r) => {
    const [ev, fav] = r.pick([['um ás', 4], ['uma carta de copas', 13], ['um rei ou uma rainha', 8], ['uma carta vermelha', 26], ['uma figura (valete, dama ou rei)', 12]]);
    return {
      e: `De um baralho comum de 52 cartas (4 naipes com 13 cartas cada), retira-se uma carta ao acaso. Qual é a probabilidade de ser ${ev}?`,
      r: fracao(fav, 52),
      d: [fracao(1, 52), fracao(fav, 13), fracao(52 - fav, 52), fracao(fav + 4, 52)],
      x: expl('casos favoráveis ÷ total', 'Conte quantas cartas atendem ao pedido.', `${fav}/52 = ${fracao(fav, 52)}.`),
    };
  },
  // 7. roleta
  (r) => {
    const n = r.pick([8, 10, 12]), a = r.int(2, n - 3);
    return {
      e: `Uma roleta de programa de TV é dividida em ${n} setores iguais, dos quais ${a} dão prêmio. Qual é a probabilidade de a roleta parar em um setor premiado?`,
      r: fracao(a, n),
      d: [fracao(n - a, n), fracao(a, n - a), fracao(1, n), fracao(a + 1, n)],
      x: expl('setores iguais = resultados igualmente prováveis', 'Cada setor tem a mesma chance.', `${a}/${n} = ${fracao(a, n)}.`),
    };
  },
  // 8. complementar
  (r) => {
    const p = r.pick([15, 30, 35, 45, 60, 72]);
    const ev = r.pick([['chover amanhã', 'não chover'], ['o ônibus atrasar', 'o ônibus não atrasar'], ['um produto vir com defeito', 'o produto vir sem defeito']]);
    return {
      e: `A probabilidade de ${ev[0]} é de ${p}%. Qual é a probabilidade de ${ev[1]}?`,
      r: pctT(100 - p),
      d: [pctT(p), pctT(100 - p / 2), pctT(50), pctT(Math.abs(100 - 2 * p) || 10)],
      x: expl('evento complementar', 'Acontecer e não acontecer somam 100%.', `100% − ${p}% = ${100 - p}%.`),
    };
  },
  // 9. letra sorteada
  (r) => {
    const p = r.pick(['PROBABILIDADE', 'MATEMATICA', 'ESTATISTICA', 'GEOGRAFIA', 'PORTUGUES']);
    const v = [...p].filter((c) => 'AEIOU'.includes(c)).length;
    return {
      e: `Cada letra da palavra ${p} foi escrita em um cartão, e um cartão é sorteado ao acaso. Qual é a probabilidade de sair uma vogal?`,
      r: fracao(v, p.length),
      d: [fracao(5, 26), fracao(p.length - v, p.length), fracao(v, 26), fracao(new Set([...p].filter((c) => 'AEIOU'.includes(c))).size, p.length) === fracao(v, p.length) ? fracao(v + 1, p.length) : fracao(new Set([...p].filter((c) => 'AEIOU'.includes(c))).size, p.length)],
      x: expl('contar cartões, não letras do alfabeto', 'Letras repetidas são cartões diferentes: conte todas.', `${v} vogais em ${p.length} cartões: ${fracao(v, p.length)}.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[5].vezes = 2;
facil[7].vezes = 2;

const medio = [
  // 1. soma de dois dados
  (r) => {
    const s = r.int(3, 11);
    const fav = 6 - Math.abs(7 - s);
    return {
      e: `Dois dados comuns são lançados. Qual é a probabilidade de a soma dos resultados ser ${s}?`,
      r: fracao(fav, 36),
      d: [fracao(fav, 12), fracao(1, 6) === fracao(fav, 36) ? fracao(1, 9) : fracao(1, 6), fracao(fav + 1, 36), fracao(1, 11)],
      x: expl('tabela 6 × 6', 'Dois dados geram 36 pares igualmente prováveis. (A soma 7 é a mais comum.)', `A soma ${s} aparece em ${fav} pares: ${fracao(fav, 36)}.`),
    };
  },
  // 2. sem reposição
  (r) => {
    const b = r.int(3, 8), p = r.int(2, 7), t = b + p;
    return {
      e: `Uma caixa tem ${b} bombons de chocolate branco e ${p} de chocolate preto. Retirando dois bombons ao acaso, sem reposição, qual é a probabilidade de ambos serem brancos?`,
      r: fracao(b * (b - 1), t * (t - 1)),
      d: [fracao(b * b, t * t), fracao(b, t), fracao(b * (b - 1), t * t), fracao(2 * b, t * (t - 1))],
      x: expl('sem reposição, o total diminui', 'Depois de tirar um branco, sobra um branco a menos e um bombom a menos no total.', `${b}/${t} × ${b - 1}/${t - 1} = ${fracao(b * (b - 1), t * (t - 1))}.`),
    };
  },
  // 3. pelo menos uma cara
  (r) => {
    const n = r.int(2, 6);
    return {
      e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de sair pelo menos uma cara?`,
      r: fracao(2 ** n - 1, 2 ** n),
      d: [fracao(1, 2 ** n), fracao(n, 2 ** n), fracao(1, 2), fracao(2 ** n - n, 2 ** n)],
      x: expl('complementar de "pelo menos um"', 'O contrário de "pelo menos uma cara" é "nenhuma cara" (todas coroas).', `1 − 1/${2 ** n} = ${fracao(2 ** n - 1, 2 ** n)}.`),
    };
  },
  // 4. independentes
  (r) => {
    const a = r.pick([10, 20, 30, 40, 50, 60, 80]), b = r.pick([10, 20, 25, 50, 75]);
    return {
      e: `A probabilidade de chover amanhã em uma cidade é de ${a}% e, independentemente disso, a probabilidade de faltar energia é de ${b}%. Qual é a probabilidade de acontecerem as duas coisas?`,
      r: pctT((a * b) / 100),
      d: [pctT(a + b), pctT(Math.abs(a - b) || 5), pctT((a * b) / 1000), pctT(a + b - (a * b) / 100)],
      x: expl('regra do "e"', 'Eventos independentes que acontecem juntos: multiplique as probabilidades (em decimal).', `${num(a / 100)} × ${num(b / 100)} = ${num((a * b) / 10000, 4)} = ${pctT((a * b) / 100)}.`),
    };
  },
  // 5. união
  (r) => {
    const total = r.pick([40, 50, 60, 80, 100]);
    const fut = r.int(10, total / 2), vol = r.int(10, total / 2), ambos = r.int(2, Math.min(fut, vol) - 1);
    const uniao = fut + vol - ambos;
    return {
      e: `Em uma turma de ${total} alunos, ${fut} jogam futebol, ${vol} jogam vôlei e ${ambos} jogam os dois esportes. Escolhendo um aluno ao acaso, qual é a probabilidade de ele jogar futebol ou vôlei?`,
      r: fracao(uniao, total),
      d: [fracao(fut + vol, total), fracao(ambos, total), fracao(total - uniao, total), fracao(fut + vol - 2 * ambos, total)],
      x: expl('regra do "ou"', 'Some as duas probabilidades e tire a parte comum, que foi contada duas vezes.', `(${fut} + ${vol} − ${ambos})/${total} = ${fracao(uniao, total)}.`),
    };
  },
  // 6. dados iguais
  (r) => {
    const tipo = r.pick(['iguais', 'diferentes']);
    return {
      e: `Lançando dois dados comuns, qual é a probabilidade de saírem números ${tipo}?`,
      r: tipo === 'iguais' ? fracao(1, 6) : fracao(5, 6),
      d: [tipo === 'iguais' ? fracao(5, 6) : fracao(1, 6), fracao(1, 36), fracao(1, 12), fracao(6, 11)],
      x: expl('fixar o primeiro dado', 'Seja qual for o primeiro resultado, o segundo dado precisa (ou não) repeti-lo.', `Iguais: 6 de 36 = 1/6. ${tipo === 'diferentes' ? 'Diferentes: 1 − 1/6 = 5/6.' : ''}`),
    };
  },
  // 7. com reposição
  (r) => {
    const [ev, p] = r.pick([['de copas', [1, 4]], ['um ás', [1, 13]], ['vermelhas', [1, 2]], ['figuras (valete, dama ou rei)', [3, 13]]]);
    return {
      e: `Retiram-se duas cartas de um baralho de 52, COM reposição (a primeira volta ao baralho antes da segunda). Qual é a probabilidade de as duas serem ${ev}?`,
      r: fracao(p[0] * p[0], p[1] * p[1]),
      d: [fracao(p[0], p[1]), fracao(2 * p[0], p[1]), fracao(p[0] * p[0], p[1] * p[1] * 2), fracao(p[0], p[1] * p[1])],
      x: expl('com reposição = independentes', 'Com a carta devolvida, a segunda retirada tem a mesma probabilidade da primeira.', `${fracao(p[0], p[1])} × ${fracao(p[0], p[1])} = ${fracao(p[0] * p[0], p[1] * p[1])}.`),
    };
  },
  // 8. dupla sorteada
  (r) => {
    const n = r.int(6, 15);
    const [a, b] = nomes(r, 2);
    return {
      e: `Um professor vai sortear 2 alunos de uma turma de ${n} para apresentar um trabalho. Qual é a probabilidade de os sorteados serem exatamente ${a} e ${b}?`,
      r: fracao(1, comb(n, 2)),
      d: [fracao(2, n), fracao(1, n * (n - 1)), fracao(1, n), fracao(2, comb(n, 2))],
      x: expl('combinação no denominador', 'Todas as duplas são igualmente prováveis; só uma delas é a desejada.', `Duplas possíveis: C(${n}, 2) = ${comb(n, 2)}. P = 1/${comb(n, 2)}.`),
    };
  },
  // 9. probabilidade geométrica
  (r) => {
    const [fig, p, como] = r.pick([
      ['um círculo inscrito no alvo quadrado', '3/4', 'círculo de raio L/2: 3 × (L/2)² = 3L²/4 sobre L²'],
      ['um quadrado central de lado igual à metade do lado do alvo', '1/4', '(L/2)² = L²/4 sobre L²'],
      ['o triângulo formado por uma diagonal (metade do alvo)', '1/2', 'a diagonal divide o quadrado em duas partes iguais'],
    ]);
    return {
      e: `Um dardo atinge, ao acaso, um alvo quadrado. Qual é a probabilidade de acertar ${fig}?${p === '3/4' ? ' (Use π = 3.)' : ''}`,
      r: p,
      d: ['1/3', '2/3', '1/8', p === '3/4' ? '1/2' : '3/4', p === '1/4' ? '1/2' : '1/4'].filter((x) => x !== p),
      x: expl('probabilidade como razão de áreas', 'Se qualquer ponto é igualmente provável, a probabilidade é área favorável ÷ área total.', `${como} = ${p}.`),
    };
  },
  // 10. adivinhar senha
  (r) => {
    const d = r.pick([3, 4]), t = r.pick([1, 3, 5]);
    return {
      e: `Um cadeado tem senha de ${d} dígitos (0 a 9, podendo repetir). Alguém tenta ${t === 1 ? 'uma combinação' : `${t} combinações diferentes`} ao acaso. Qual é a probabilidade de abrir o cadeado?`,
      r: fracao(t, 10 ** d),
      d: [fracao(1, 10 ** d) === fracao(t, 10 ** d) ? fracao(1, 10 * d) : fracao(1, 10 ** d), fracao(t, 10 * d), fracao(t, 10 ** (d - 1)), fracao(t, 9 ** d)],
      x: expl('casos favoráveis ÷ total', `Há 10${sup(d)} senhas possíveis; cada tentativa diferente cobre uma delas.`, `${t}/${num(10 ** d)}.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[4].vezes = 2;
medio[7].vezes = 2;

const dificil = [
  // 1. binomial
  (r) => {
    const n = r.int(4, 6), k = r.int(1, n - 1);
    return {
      e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de saírem exatamente ${k} caras?`,
      r: fracao(comb(n, k), 2 ** n),
      d: [fracao(1, 2 ** n), fracao(k, n), fracao(comb(n, k), 2 ** (n + 1)), fracao(k, 2 ** n)],
      x: expl('distribuição binomial', `Cada sequência específica tem probabilidade (1/2)${sup(n)}; conte quantas sequências têm ${k} caras: C(${n}, ${k}).`, `${comb(n, k)}/${2 ** n} = ${fracao(comb(n, k), 2 ** n)}.`),
    };
  },
  // 2. condicional
  (r) => {
    const hO = r.int(5, 20), hS = r.int(10, 30), mO = r.int(5, 20), mS = r.int(10, 30);
    return {
      e: `Em uma empresa: ${hO} homens usam óculos e ${hS} não usam; ${mO} mulheres usam óculos e ${mS} não usam. Sorteando uma pessoa e sabendo que é mulher, qual é a probabilidade de ela usar óculos?`,
      r: fracao(mO, mO + mS),
      d: [fracao(mO, hO + hS + mO + mS), fracao(mO, hO + mO), fracao(mS, mO + mS), fracao(mO + mS, hO + hS + mO + mS)],
      x: expl('probabilidade condicional', '"Sabendo que é mulher" encolhe o universo: agora só as mulheres contam.', `${mO}/${mO + mS} = ${fracao(mO, mO + mS)}.`),
    };
  },
  // 3. cores diferentes
  (r) => {
    const a = r.int(2, 6), b = r.int(2, 6), t = a + b;
    return {
      e: `Uma urna tem ${a} bolas azuis e ${b} amarelas. Retiram-se duas bolas, sem reposição. Qual é a probabilidade de serem de cores diferentes?`,
      r: fracao(2 * a * b, t * (t - 1)),
      d: [fracao(a * b, t * (t - 1)), fracao(2 * a * b, t * t), fracao(1, 2) === fracao(2 * a * b, t * (t - 1)) ? fracao(1, 3) : fracao(1, 2), fracao(a * (a - 1) + b * (b - 1), t * (t - 1))],
      x: expl('duas ordens possíveis', 'Diferentes pode ser (azul, amarela) OU (amarela, azul): some os dois caminhos.', `${a}/${t}·${b}/${t - 1} + ${b}/${t}·${a}/${t - 1} = ${fracao(2 * a * b, t * (t - 1))}.`),
    };
  },
  // 4. Bayes
  (r) => {
    const [prev, sens, falso] = r.pick([[10, 90, 10], [20, 80, 10], [5, 100, 5], [10, 80, 20], [25, 80, 20], [50, 90, 10]]);
    const pos = prev * sens + (100 - prev) * falso;
    const v = prev * sens;
    return {
      e: `Uma doença atinge ${prev}% de uma população. Um teste dá positivo em ${sens}% dos doentes e em ${falso}% dos sadios. Uma pessoa testou positivo. Qual é a probabilidade de ela estar doente?`,
      r: fracao(v, pos),
      d: [fracao(sens, 100), fracao(prev, 100), fracao(v, 10000), fracao(100 - falso, 100), fracao(pos, 10000), fracao(v, v + 100 * falso)],
      x: expl('teorema de Bayes (pense em 10.000 pessoas)', 'Entre todos os que dão positivo, quantos são realmente doentes?', `Positivos doentes: ${v}; positivos sadios: ${(100 - prev) * falso}. P = ${v}/${pos} = ${fracao(v, pos)}.`),
    };
  },
  // 5. soma ≥ s
  (r) => {
    const s = r.int(8, 11);
    let fav = 0;
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j >= s) fav++;
    return {
      e: `Lançando dois dados comuns, qual é a probabilidade de a soma ser maior ou igual a ${s}?`,
      r: fracao(fav, 36),
      d: [fracao(36 - fav, 36), fracao(6 - Math.abs(7 - s), 36), fracao(fav + 1, 36), fracao(fav, 12)],
      x: expl('contar na tabela', 'Some as quantidades de cada soma permitida.', `Pares com soma ≥ ${s}: ${fav}. P = ${fracao(fav, 36)}.`),
    };
  },
  // 6. dias da semana diferentes
  (r) => {
    const n = r.pick([2, 3]);
    const num_ = n === 2 ? 7 * 6 : 7 * 6 * 5, den = 7 ** n;
    return {
      e: `${n === 2 ? 'Duas pessoas' : 'Três pessoas'} são escolhidas ao acaso. Supondo que cada dia da semana seja igualmente provável para o nascimento, qual é a probabilidade de todas terem nascido em dias da semana diferentes?`,
      r: fracao(num_, den),
      d: [fracao(1, 7 ** (n - 1)), fracao(den - num_, den), fracao(n, 7), fracao(num_, den * 2)],
      x: expl('uma pessoa de cada vez', 'A primeira pode ser qualquer dia; a segunda precisa evitar 1 dia; a terceira, 2 dias.', `${n === 2 ? '7/7 × 6/7' : '7/7 × 6/7 × 5/7'} = ${fracao(num_, den)}.`),
    };
  },
  // 7. probabilidade total (duas urnas)
  (r) => {
    const [b1, t1] = r.pick([[3, 5], [2, 4], [1, 3], [4, 6]]);
    const [b2, t2] = r.pick([[1, 4], [2, 5], [3, 4], [1, 2]]);
    const num_ = b1 * t2 + b2 * t1, den = 2 * t1 * t2;
    return {
      e: `Há duas urnas: a urna I tem ${b1} ${b1 === 1 ? 'bola branca' : 'bolas brancas'} em ${t1}; a urna II tem ${b2} ${b2 === 1 ? 'branca' : 'brancas'} em ${t2}. Escolhe-se uma urna ao acaso (cara ou coroa) e retira-se uma bola. Qual é a probabilidade de ser branca?`,
      r: fracao(num_, den),
      d: [fracao(b1 + b2, t1 + t2) === fracao(num_, den) ? fracao(b1 + b2 + 1, t1 + t2) : fracao(b1 + b2, t1 + t2), fracao(b1 * b2, t1 * t2), fracao(num_, den * 2), fracao(b1, t1)],
      x: expl('árvore de probabilidades', 'Cada caminho: (chance da urna) × (chance de branca naquela urna). Some os caminhos.', `1/2 × ${b1}/${t1} + 1/2 × ${b2}/${t2} = ${fracao(num_, den)}.`),
    };
  },
  // 8. exatamente um acerta
  (r) => {
    const [p, q] = r.pick([[60, 50], [70, 40], [80, 50], [90, 60], [40, 30]]);
    const v = (p * (100 - q) + q * (100 - p)) / 100;
    const [a, b] = nomes(r, 2);
    return {
      e: `${a} acerta um pênalti com probabilidade de ${p}% e ${b}, com ${q}%. Cada um cobra um pênalti, de forma independente. Qual é a probabilidade de EXATAMENTE um dos dois acertar?`,
      r: pctT(v),
      d: [pctT((p * q) / 100), pctT(p + q - (p * q) / 100), pctT(((100 - p) * (100 - q)) / 100), pctT(Math.abs(p - q))],
      x: expl('dois casos que não acontecem juntos', `Ou ${a} acerta e ${b} erra, ou ${a} erra e ${b} acerta.`, `${num(p / 100)} × ${num(1 - q / 100)} + ${num(1 - p / 100)} × ${num(q / 100)} = ${num(v / 100)} = ${pctT(v)}.`),
    };
  },
  // 9. todas meninas no sorteio
  (r) => {
    const m = r.int(5, 12), h = r.int(5, 12), k = 3;
    return {
      e: `Uma turma tem ${m} meninas e ${h} meninos. Três estudantes são sorteados para uma viagem. Qual é a probabilidade de serem todas meninas?`,
      r: fracao(comb(m, k), comb(m + h, k)),
      d: [fracao(m ** 3, (m + h) ** 3), fracao(m, m + h), fracao(m * (m - 1) * (m - 2), (m + h) ** 3), fracao(comb(h, k), comb(m + h, k))],
      x: expl('combinações favoráveis ÷ totais', 'Grupos só de meninas ÷ todos os grupos possíveis de 3.', `C(${m}, 3)/C(${m + h}, 3) = ${comb(m, k)}/${comb(m + h, k)} = ${fracao(comb(m, k), comb(m + h, k))}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[3].vezes = 2;
dificil[7].vezes = 2;
dificil[8].vezes = 2;


export default [
  {
    disciplina: 'matematica',
    arquivo: '13-probabilidade',
    titulo: 'Probabilidade',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Probabilidade clássica, eventos complementares, independentes, condicionais, probabilidade geométrica e binomial.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.prob[0])], [...medio, ...novos(NOVOS.prob[1])], [...dificil, ...novos(NOVOS.prob[2])]],
  },
];
