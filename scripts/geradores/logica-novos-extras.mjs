// Raciocínio lógico — modelos acrescentados em 2026 para levar os tópicos 1 a 4 a 50 questões.
// Entram no fim de cada nível (ver `novos` em util.mjs), sem mudar as questões antigas.
import { comb, expl, nome, nomes, num } from './util.mjs';

const VF = (v) => (v ? 'Verdadeira' : 'Falsa');
const FRASES = [
  ['Ana estuda', 'Ana não estuda'],
  ['o banco abre', 'o banco não abre'],
  ['chove', 'não chove'],
  ['Pedro viaja', 'Pedro não viaja'],
  ['a meta é atingida', 'a meta não é atingida'],
  ['o cliente paga em dia', 'o cliente não paga em dia'],
  ['o sistema funciona', 'o sistema não funciona'],
  ['Carla é contadora', 'Carla não é contadora'],
  ['o relatório é aprovado', 'o relatório não é aprovado'],
  ['Lucas joga futebol', 'Lucas não joga futebol'],
];
const dois = (r) => {
  const [a, b] = r.sample(FRASES, 2);
  return { p: a[0], np: a[1], q: b[0], nq: b[1] };
};
const tres = (r) => {
  const [a, b, c] = r.sample(FRASES, 3);
  return { p: a[0], np: a[1], q: b[0], nq: b[1], s: c[0], ns: c[1] };
};
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const FATOS = [
  ['Brasília é a capital do Brasil', true],
  ['2 + 2 = 5', false],
  ['o Sol é uma estrela', true],
  ['7 é um número par', false],
  ['a água ferve a 100 °C ao nível do mar', true],
  ['um triângulo tem quatro lados', false],
  ['10 é divisível por 5', true],
  ['o Brasil fica na Europa', false],
  ['3 é um número primo', true],
  ['9 é um número primo', false],
];
const CLASSES = [
  ['funcionário', 'é pontual', 'não é pontual'],
  ['estudante', 'gosta de matemática', 'não gosta de matemática'],
  ['candidato', 'leu o edital', 'não leu o edital'],
  ['cliente', 'tem cartão de crédito', 'não tem cartão de crédito'],
  ['atleta', 'treina todos os dias', 'não treina todos os dias'],
];
/** Conta em quantas linhas da tabela-verdade f é verdadeira (n variáveis). */
const contaV = (n, f) => {
  let c = 0;
  for (let m = 0; m < 2 ** n; m++) {
    const v = Array.from({ length: n }, (_, i) => !!(m & (1 << (n - 1 - i))));
    if (f(...v)) c++;
  }
  return c;
};
const imp = (a, b) => !a || b;

// ======================================================= 01 Proposições e tabela-verdade
const proposicoes = [
  [
    (r) => {
      const prop = r.pick(['O Rio de Janeiro fica no Brasil.', 'Todo número par é divisível por 2.', 'A Lua é maior que a Terra.', 'Em 2020 houve Olimpíadas no Japão.']);
      const nao = r.sample(['Que horas são?', 'Feche a porta!', 'Que dia lindo!', 'x + 3 = 10.', 'Estude para a prova.', 'Será que vai chover?', 'Ele é muito alto.'], 4);
      return {
        e: 'Qual das frases abaixo é uma proposição (pode ser julgada como verdadeira ou falsa)?',
        r: prop,
        d: nao,
        x: expl('proposição = frase declarativa com valor lógico definido', 'Perguntas, ordens, exclamações e sentenças abertas (com variável ou sujeito indefinido, como "ele") não são proposições. A frase pode ser falsa e ainda assim ser proposição.', `"${prop}" é uma proposição.`),
      };
    },
    (r) => {
      const [f1] = r.pick(FATOS.filter((f) => !f[1]));
      const [f2, v2] = r.pick(FATOS.filter((f) => f[0] !== f1));
      return {
        e: `Qual é o valor lógico da proposição "Se ${f1}, então ${f2}"?`,
        r: 'Verdadeira',
        d: ['Falsa', 'Não é possível saber', `${v2 ? 'Falsa' : 'Verdadeira'}, porque depende só da segunda parte`, 'Não é uma proposição'],
        x: expl('condicional só é falsa em V → F', `A primeira parte ("${f1}") é falsa; uma condicional com antecedente falso é sempre verdadeira.`, 'Valor: verdadeira.'),
      };
    },
    (r) => {
      const [[a, va], [b, vb]] = r.sample(FATOS, 2);
      return {
        e: `Qual é o valor lógico de "Ou ${a}, ou ${b}" (ou exclusivo)?`,
        r: VF(va !== vb),
        d: [VF(va === vb), 'Não é possível saber', 'Não é uma proposição', 'Verdadeira e falsa ao mesmo tempo'],
        x: expl('ou exclusivo: verdadeiro quando exatamente uma parte é verdadeira', `"${a}" é ${va ? 'V' : 'F'}; "${b}" é ${vb ? 'V' : 'F'}.`, `${va !== vb ? 'Só uma é verdadeira' : 'As duas têm o mesmo valor'}: ${VF(va !== vb).toLowerCase()}.`),
      };
    },
    (r) => {
      const [[a, va], [b, vb]] = r.sample(FATOS, 2);
      return {
        e: `Qual é o valor lógico de "${cap(a)} se e somente se ${b}"?`,
        r: VF(va === vb),
        d: [VF(va !== vb), 'Não é possível saber', 'Não é uma proposição', 'Depende só da primeira parte'],
        x: expl('bicondicional: verdadeira quando as partes têm o mesmo valor', `"${a}" é ${va ? 'V' : 'F'}; "${b}" é ${vb ? 'V' : 'F'}.`, `Resultado: ${VF(va === vb).toLowerCase()}.`),
      };
    },
    (r) => {
      const [txt, n] = r.pick([['p ∨ q', 3], ['p ∧ q', 1], ['p → q', 3], ['p ↔ q', 2], ['~p ∨ q', 3], ['~p ∧ ~q', 1]]);
      return {
        e: `Na tabela-verdade de ${txt} (4 linhas), em quantas linhas a proposição é verdadeira?`,
        r: n,
        d: [0, 1, 2, 3, 4].filter((x) => x !== n),
        x: expl('montar as 4 linhas (VV, VF, FV, FF)', 'Aplique a regra do conectivo em cada linha e conte os V.', `${txt} é verdadeira em ${n} linha(s).`),
      };
    },
    (r) => {
      const taut = r.pick(['p ∨ ~p', 'p → p', '~(p ∧ ~p)', '(p ∧ q) → p']);
      return {
        e: 'Qual das proposições abaixo é uma tautologia (verdadeira em todas as linhas da tabela)?',
        r: taut,
        d: ['p ∧ ~p', 'p → q', 'p ∨ q', 'p ∧ q', 'p ↔ ~p'],
        x: expl('tautologia: sempre verdadeira, qualquer que seja o valor das partes', `Teste as linhas: ${taut} nunca dá F.`, `${taut} é tautologia; "p ∧ ~p" e "p ↔ ~p" são contradições, e as outras são contingências.`),
      };
    },
  ],
  [
    (r) => {
      const [txt, f] = r.pick([
        ['p ∧ (q ∨ r)', (p, q, s) => p && (q || s)],
        ['(p ∨ q) ∧ ~r', (p, q, s) => (p || q) && !s],
        ['p → (q ∧ r)', (p, q, s) => imp(p, q && s)],
        ['(p ∧ q) → r', (p, q, s) => imp(p && q, s)],
        ['p ∨ q ∨ r', (p, q, s) => p || q || s],
        ['(p → q) ∨ r', (p, q, s) => imp(p, q) || s],
      ]);
      const n = contaV(3, f);
      return {
        e: `Na tabela-verdade de ${txt} (8 linhas), em quantas linhas a proposição é verdadeira?`,
        r: n,
        d: [...new Set([n - 1, n + 1, 8 - n, 4, 0, 8, 6, 2])].filter((x) => x !== n && x >= 0 && x <= 8),
        x: expl('3 proposições simples → 8 linhas', 'Monte as 8 combinações e avalie o conectivo principal por último.', `Ela é verdadeira em ${n} das 8 linhas.`),
      };
    },
    (r) => {
      const contra = r.pick(['p ∧ ~p', 'p ↔ ~p', '~(p ∨ ~p)', '(p ∧ q) ∧ ~q']);
      return {
        e: 'Qual das proposições abaixo é uma contradição (falsa em todas as linhas da tabela)?',
        r: contra,
        d: ['p ∨ ~p', 'p → q', 'p ∧ q', 'p ∨ q', '(p ∧ q) → p'],
        x: expl('contradição: sempre falsa', `${contra} afirma ao mesmo tempo algo e o seu contrário.`, `${contra} é contradição; "p ∨ ~p" e "(p ∧ q) → p" são tautologias.`),
      };
    },
    (r) => {
      const [txt, val] = r.pick([['p ∨ q', true], ['q → p', true], ['p ∧ ~q', true], ['~p ∨ q', false], ['p ↔ q', false], ['~q → ~p', false]]);
      return {
        e: `Sabe-se que a proposição p → q é FALSA. Qual é o valor lógico de ${txt}?`,
        r: VF(val),
        d: [VF(!val), 'Não é possível saber', 'Depende do valor de q', 'Depende do valor de p'],
        x: expl('condicional falsa ⇒ p = V e q = F', 'É o único caso em que a condicional é falsa ("Vera Fischer").', `Com p = V e q = F, ${txt} é ${VF(val).toLowerCase()}.`),
      };
    },
    (r) => {
      const [txt, val] = r.pick([['p → ~q', false], ['p ∨ ~q', true], ['~p ∨ ~q', false], ['p ↔ q', true], ['~p → q', true], ['p ∧ ~q', false]]);
      return {
        e: `Sabe-se que a proposição p ∧ q é VERDADEIRA. Qual é o valor lógico de ${txt}?`,
        r: VF(val),
        d: [VF(!val), 'Não é possível saber', 'Depende do valor de q', 'Depende do valor de p'],
        x: expl('conjunção verdadeira ⇒ as duas partes são verdadeiras', 'p = V e q = V.', `Substituindo, ${txt} é ${VF(val).toLowerCase()}.`),
      };
    },
    (r) => {
      const [txt, val] = r.pick([['p ↔ q', true], ['p → q', true], ['~p ∧ ~q', true], ['p ∨ ~q', true], ['~p → q', false], ['~(~p ∨ ~q)', false]]);
      return {
        e: `Sabe-se que a proposição p ∨ q é FALSA. Qual é o valor lógico de ${txt}?`,
        r: VF(val),
        d: [VF(!val), 'Não é possível saber', 'Depende do valor de q', 'Depende do valor de p'],
        x: expl('disjunção falsa ⇒ as duas partes são falsas', 'p = F e q = F.', `Substituindo, ${txt} é ${VF(val).toLowerCase()}.`),
      };
    },
    (r) => {
      const { p, q } = dois(r);
      return {
        e: `Sendo p: "${p}" e q: "${q}", como se escreve em símbolos a frase "Nem ${p}, nem ${q}"?`,
        r: '~p ∧ ~q',
        d: ['~p ∨ ~q', '~(p ∧ q)', 'p ∧ ~q', '~p → q', '~p ↔ ~q'],
        x: expl('"nem… nem…" = "não… e não…"', 'As duas coisas são negadas ao mesmo tempo.', '~p ∧ ~q (que equivale a ~(p ∨ q)).'),
      };
    },
  ],
  [
    (r) => {
      const { p, q, s } = tres(r);
      return {
        e: `Considere verdadeiras as três afirmações: "${cap(p)} ou ${q}"; "Se ${p}, então ${s}"; "Não é verdade que ${s}". O que se pode concluir?`,
        r: `${cap(q)} e não é verdade que ${p}.`,
        d: [`${cap(p)} e ${q}.`, `${cap(p)}, mas não é verdade que ${q}.`, `Não é verdade que ${q}.`, `${cap(s)}.`],
        x: expl('encadear: modus tollens + silogismo disjuntivo', `Como "${s}" é falso e "se ${p}, então ${s}" é verdadeiro, "${p}" tem de ser falso (modus tollens). Então, na disjunção, "${q}" é verdadeiro.`, `Conclusão: ${q}, e não ${p}.`),
      };
    },
    (r) => {
      const [txt, f] = r.pick([
        ['(p → q) ∧ (q → r)', (p, q, s) => imp(p, q) && imp(q, s)],
        ['(p ∨ q) → r', (p, q, s) => imp(p || q, s)],
        ['(p ↔ q) ∨ r', (p, q, s) => p === q || s],
        ['(p → q) ↔ r', (p, q, s) => imp(p, q) === s],
        ['~p ∧ (q → r)', (p, q, s) => !p && imp(q, s)],
      ]);
      const n = contaV(3, f);
      return {
        e: `Em quantas das 8 linhas da tabela-verdade a proposição ${txt} é verdadeira?`,
        r: n,
        d: [...new Set([n - 1, n + 1, 8 - n, n === 4 ? 6 : 4, 0, 8, 2])].filter((x) => x !== n && x >= 0 && x <= 8),
        x: expl('tabela-verdade com 3 proposições', 'Avalie primeiro os parênteses e depois o conectivo principal, linha por linha.', `${txt} é verdadeira em ${n} linhas.`),
      };
    },
    (r) => {
      const [txt, n] = r.pick([['(p ∨ q) → r', 3], ['(p ∧ q) → r', 1], ['p → (q ∨ r)', 1], ['(p → q) → r', 3]]);
      return {
        e: `Em quantas das 8 combinações de valores de p, q e r a proposição ${txt} é FALSA?`,
        r: n,
        d: [...new Set([8 - n, n + 1, n + 2, 0, 2, 6])].filter((x) => x !== n),
        x: expl('condicional falsa: antecedente V e consequente F', 'Conte as combinações que deixam o antecedente verdadeiro e o consequente falso.', `São ${n} combinações.`),
      };
    },
    (r) => {
      const { p, q, s } = tres(r);
      return {
        e: `Qual frase é equivalente a "Se ${p} e ${q}, então ${s}"?`,
        r: `Se ${p}, então, se ${q}, ${s}.`,
        d: [`Se ${s}, então ${p} e ${q}.`, `${cap(p)} e ${q} e ${s}.`, `Se ${p}, então ${s}; e se ${q}, então ${s}.`, `Se ${s}, então ${p} ou ${q}.`],
        x: expl('exportação: (p ∧ q) → r ⇔ p → (q → r)', 'As duas só são falsas quando p e q são verdadeiras e r é falsa.', `Equivalente: "se ${p}, então, se ${q}, ${s}".`),
      };
    },
    (r) => {
      const [[a, va], [b, vb]] = r.sample(FATOS, 2);
      const val = imp(va, vb) && (va || vb);
      return {
        e: `Qual é o valor lógico de "(Se ${a}, então ${b}) e (${a} ou ${b})"?`,
        r: VF(val),
        d: [VF(!val), 'Não é possível saber', 'Não é uma proposição', 'Verdadeira só se as duas partes forem verdadeiras'],
        x: expl('avaliar cada parte e depois o "e"', `"${a}" é ${va ? 'V' : 'F'}; "${b}" é ${vb ? 'V' : 'F'}. A condicional dá ${imp(va, vb) ? 'V' : 'F'} e a disjunção dá ${va || vb ? 'V' : 'F'}.`, `Conjunção: ${VF(val).toLowerCase()}.`),
      };
    },
  ],
];

// ======================================================= 02 Equivalências e negações
const negacoes = [
  [
    (r) => {
      const { p, np } = dois(r);
      return {
        e: `Qual frase é equivalente a "Não é verdade que ${np}"?`,
        r: `${cap(p)}.`,
        d: [`${cap(np)}.`, `${cap(p)} e ${np}.`, `Não é verdade que ${p}.`, `${cap(p)} ou ${np}.`],
        x: expl('dupla negação: ~(~p) = p', 'Negar uma negação volta à afirmação original.', `"${cap(p)}".`),
      };
    },
    (r) => {
      const { p, np, q, nq } = dois(r);
      return {
        e: `Qual é a negação de "Ou ${p}, ou ${q}" (ou exclusivo)?`,
        r: `${cap(p)} se e somente se ${q}.`,
        d: [`Nem ${p}, nem ${q}.`, `${cap(p)} e ${q}.`, `Se ${p}, então ${q}.`, `Ou ${np}, ou ${nq}.`],
        x: expl('negação do ou exclusivo = bicondicional', 'O "ou… ou…" é verdadeiro quando as partes diferem; a negação é verdadeira quando elas são iguais.', `"${cap(p)} se e somente se ${q}".`),
      };
    },
    (r) => {
      const [cl, prop, nprop] = r.pick(CLASSES);
      return {
        e: `Qual é a negação de "Algum ${cl} ${nprop}"?`,
        r: `Todo ${cl} ${prop}.`,
        d: [`Nenhum ${cl} ${prop}.`, `Algum ${cl} ${prop}.`, `Todo ${cl} ${nprop}.`, `Pelo menos um ${cl} ${prop}.`],
        x: expl('negação de "algum… não…" = "todo…"', 'Para negar que exista alguém sem a característica, afirme que todos a têm.', `"Todo ${cl} ${prop}".`),
      };
    },
    (r) => {
      const k = r.pick([2, 3, 5, 10]), coisa = r.pick(['alunos faltaram', 'clientes reclamaram', 'funcionários chegaram atrasados']);
      return {
        e: `Qual é a negação de "Pelo menos ${k} ${coisa}"?`,
        r: `No máximo ${k - 1} ${coisa}.`,
        d: [`No máximo ${k} ${coisa}.`, `Pelo menos ${k - 1} ${coisa}.`, `Exatamente ${k} ${coisa}.`, `Mais de ${k} ${coisa}.`],
        x: expl('"pelo menos k" = "k ou mais"; a negação é "menos de k"', `Menos de ${k} é o mesmo que no máximo ${k - 1}.`, `"No máximo ${k - 1} ${coisa}".`),
      };
    },
    (r) => {
      const k = r.pick([2, 3, 4, 10]), coisa = r.pick(['vagas foram preenchidas', 'erros foram encontrados', 'pessoas foram atendidas']);
      return {
        e: `Qual é a negação de "No máximo ${k} ${coisa}"?`,
        r: `Pelo menos ${k + 1} ${coisa}.`,
        d: [`Pelo menos ${k} ${coisa}.`, `No mínimo ${k - 1} ${coisa}.`, `Exatamente ${k} ${coisa}.`, `Menos de ${k} ${coisa}.`],
        x: expl('"no máximo k" = "k ou menos"; a negação é "mais de k"', `Mais de ${k} é o mesmo que pelo menos ${k + 1}.`, `"Pelo menos ${k + 1} ${coisa}".`),
      };
    },
    (r) => {
      const acao = r.pick(['faltou à reunião', 'reclamou do atendimento', 'chegou atrasado', 'esqueceu o crachá']);
      return {
        e: `Qual é a negação de "Ninguém ${acao}"?`,
        r: `Alguém ${acao}.`,
        d: [`Todos ${acao.replace('faltou', 'faltaram').replace('reclamou', 'reclamaram').replace('chegou atrasado', 'chegaram atrasados').replace('esqueceu', 'esqueceram')}.`, `Ninguém deixou de cumprir a regra.`, `Alguém não ${acao}.`, `Nem todos ${acao.replace('faltou', 'faltaram').replace('reclamou', 'reclamaram').replace('chegou atrasado', 'chegaram atrasados').replace('esqueceu', 'esqueceram')}.`],
        x: expl('"ninguém" = "nenhuma pessoa"; a negação é "alguém"', 'Basta uma pessoa ter feito para a frase original ser falsa.', `"Alguém ${acao}".`),
      };
    },
  ],
  [
    (r) => {
      const { p, np, q, nq } = dois(r);
      return {
        e: `Qual das frases abaixo NÃO é equivalente a "Se ${p}, então ${q}"?`,
        r: `Se ${q}, então ${p}.`,
        d: [`Se ${nq}, então ${np}.`, `${cap(np)} ou ${q}.`, `Não é verdade que ${p} e ${nq}.`, `${cap(p)} somente se ${q}.`],
        x: expl('a recíproca (q → p) não é equivalente', 'São equivalentes à condicional: a contrapositiva (~q → ~p), "~p ou q", "não (p e ~q)" e "p somente se q".', `A recíproca "se ${q}, então ${p}" é a única diferente.`),
      };
    },
    (r) => {
      const { p, np, q, nq } = dois(r);
      return {
        e: `Qual é a negação de "${cap(p)} se e somente se ${q}"?`,
        r: `Ou ${p}, ou ${q} (mas não os dois).`,
        d: [`${cap(np)} se e somente se ${nq}.`, `${cap(np)} e ${nq}.`, `Se ${p}, então ${nq}.`, `${cap(p)} e ${q}.`],
        x: expl('negação da bicondicional = ou exclusivo', 'A bicondicional é falsa quando as partes têm valores diferentes, que é exatamente o "ou… ou…".', `"Ou ${p}, ou ${q}".`),
      };
    },
    (r) => {
      const { p, q, nq } = dois(r);
      return {
        e: `Qual é a negação de "Sempre que ${p}, ${q}"?`,
        r: `${cap(p)} e ${nq}.`,
        d: [`Sempre que ${p}, ${nq}.`, `Nunca ${p}.`, `Se ${q}, então ${p}.`, `${cap(p)} ou ${nq}.`],
        x: expl('"sempre que p, q" é uma condicional; negação: p ∧ ~q', 'Para desmentir, basta um caso em que p acontece e q não.', `"${cap(p)} e ${nq}".`),
      };
    },
    (r) => {
      const [[c1, p1, n1], [c2, p2]] = r.sample(CLASSES, 2);
      return {
        e: `Qual é a negação de "Todo ${c1} ${p1} e algum ${c2} ${p2}"?`,
        r: `Algum ${c1} ${n1} ou nenhum ${c2} ${p2}.`,
        d: [`Nenhum ${c1} ${p1} e nenhum ${c2} ${p2}.`, `Algum ${c1} ${n1} e nenhum ${c2} ${p2}.`, `Todo ${c1} ${n1} ou todo ${c2} ${p2}.`, `Nenhum ${c1} ${p1} ou algum ${c2} ${p2}.`],
        x: expl('De Morgan + negação de quantificadores', 'Negue cada parte (todo → algum… não; algum → nenhum) e troque o "e" por "ou".', `"Algum ${c1} ${n1} ou nenhum ${c2} ${p2}".`),
      };
    },
    (r) => {
      const { np, nq, p, q } = dois(r);
      return {
        e: `Qual frase é equivalente a "Não é verdade que ${p} ou ${q}"?`,
        r: `${cap(np)} e ${nq}.`,
        d: [`${cap(np)} ou ${nq}.`, `${cap(p)} e ${q}.`, `Se ${p}, então ${nq}.`, `${cap(np)} ou ${q}.`],
        x: expl('De Morgan: ~(p ∨ q) = ~p ∧ ~q', 'Negue as duas partes e troque "ou" por "e".', `"${cap(np)} e ${nq}".`),
      };
    },
    (r) => {
      const { p, q } = dois(r);
      return {
        e: `A frase "${cap(p)} somente se ${q}" é equivalente a:`,
        r: `Se ${p}, então ${q}.`,
        d: [`Se ${q}, então ${p}.`, `${cap(p)} se e somente se ${q}.`, `${cap(p)} e ${q}.`, `${cap(p)} ou ${q}.`],
        x: expl('"p somente se q" = p → q', '"Somente se" indica a condição necessária, que fica depois do "então".', `"Se ${p}, então ${q}".`),
      };
    },
  ],
  [
    (r) => {
      const { p, q, s, ns } = tres(r);
      return {
        e: `Qual é a negação de "Se ${p} e ${q}, então ${s}"?`,
        r: `${cap(p)}, ${q} e ${ns}.`,
        d: [`Se ${p} e ${q}, então ${ns}.`, `${cap(p)} e ${q}, ou ${ns}.`, `Se ${s}, então ${p} e ${q}.`, `Não é verdade que ${p}, ou não é verdade que ${q}, ou ${s}.`],
        x: expl('negação da condicional: mantém o antecedente E nega o consequente', `O antecedente é "${p} e ${q}".`, `"${cap(p)}, ${q} e ${ns}".`),
      };
    },
    (r) => {
      const { p, q, nq, s } = tres(r);
      return {
        e: `Qual frase é equivalente a "Se ${p}, então ${q} ou ${s}"?`,
        r: `Se ${p} e ${nq}, então ${s}.`,
        d: [`Se ${p}, então ${q} e ${s}.`, `Se ${q} ou ${s}, então ${p}.`, `Se ${p} e ${q}, então ${s}.`, `${cap(p)} e ${nq} e ${s}.`],
        x: expl('p → (q ∨ r) ⇔ (p ∧ ~q) → r', 'Se p acontece e q não, a única saída para a frase ser verdadeira é r.', `"Se ${p} e ${nq}, então ${s}".`),
      };
    },
    (r) => {
      const { p, np, q, nq } = dois(r);
      return {
        e: `Qual é a negação de "Se ${np}, então ${nq}"?`,
        r: `${cap(np)} e ${q}.`,
        d: [`Se ${p}, então ${q}.`, `${cap(p)} e ${nq}.`, `${cap(np)} e ${nq}.`, `Se ${np}, então ${q}.`],
        x: expl('negação da condicional: ~(A → B) = A ∧ ~B', `Aqui A = "${np}" e B = "${nq}"; negar B dá "${q}".`, `"${cap(np)} e ${q}".`),
      };
    },
    (r) => {
      const { p, np, q } = dois(r);
      return {
        e: `A frase "${cap(p)} ou ${q}" é equivalente a:`,
        r: `Se ${np}, então ${q}.`,
        d: [`Se ${p}, então ${q}.`, `Se ${q}, então ${p}.`, `${cap(np)} e ${q}.`, `Se ${q}, então ${np}.`],
        x: expl('p ∨ q ⇔ ~p → q', 'Se uma das duas precisa acontecer, quando a primeira falha, a segunda acontece.', `"Se ${np}, então ${q}".`),
      };
    },
    (r) => {
      const [[c1, p1], [c2, p2]] = r.sample(CLASSES, 2);
      return {
        e: `Qual é a negação de "Se todo ${c1} ${p1}, então algum ${c2} ${p2}"?`,
        r: `Todo ${c1} ${p1} e nenhum ${c2} ${p2}.`,
        d: [`Algum ${c1} não ${p1.replace(/^é /, 'é ')} e algum ${c2} ${p2}.`, `Se nenhum ${c1} ${p1}, então nenhum ${c2} ${p2}.`, `Nenhum ${c1} ${p1} ou algum ${c2} ${p2}.`, `Todo ${c1} ${p1} e algum ${c2} ${p2}.`],
        x: expl('negação da condicional + quantificador', 'Mantenha o antecedente ("todo…") e negue o consequente ("algum…" vira "nenhum…").', `"Todo ${c1} ${p1} e nenhum ${c2} ${p2}".`),
      };
    },
  ],
];

// ======================================================= 03 Sequências e problemas de lógica
const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const noDia = (d) => `${d === 0 || d === 6 ? 'num' : 'numa'} ${DIAS[d]}`;
const sequencias = [
  [
    (r) => {
      const a = r.pick([1, 2, 3, 5]), q = r.pick([2, 3]);
      const s = Array.from({ length: 5 }, (_, i) => a * q ** i);
      return {
        e: `Qual é o próximo termo da sequência ${s.join(', ')}, …?`,
        r: a * q ** 5,
        d: [s[4] + (s[4] - s[3]), s[4] * (q + 1), s[4] + q, s[4] * q * q],
        x: expl('teste os quocientes', `Cada termo é o anterior vezes ${q}.`, `${s[4]} × ${q} = ${a * q ** 5}.`),
      };
    },
    (r) => {
      const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const ini = r.int(0, 4), passo = r.pick([2, 3, 4]);
      const seq = Array.from({ length: 4 }, (_, i) => L[ini + i * passo]);
      const prox = L[ini + 4 * passo];
      const outras = L.split('').filter((x) => x !== prox);
      return {
        e: `Qual letra continua a sequência ${seq.join(', ')}, …? (alfabeto de 26 letras, com K, W e Y)`,
        r: prox,
        d: r.sample([L[ini + 4 * passo - 1], L[ini + 4 * passo + 1], L[ini + 5 * passo], L[ini + 3 * passo + 1]].filter((x) => x && x !== prox), 4).concat(r.sample(outras, 4)).slice(0, 6),
        x: expl('posição no alfabeto', `As letras avançam de ${passo} em ${passo} posições.`, `Depois de ${seq[3]}, vem ${prox}.`),
      };
    },
    (r) => {
      const a = r.pick([1, 2, 3]), b = r.pick([1, 2, 3, 4]);
      const s = [a, b];
      for (let i = 2; i < 7; i++) s.push(s[i - 1] + s[i - 2]);
      return {
        e: `Na sequência ${s.slice(0, 6).join(', ')}, …, cada termo segue a mesma regra a partir do 3º. Qual é o próximo termo?`,
        r: s[6],
        d: [s[5] + (s[5] - s[4]), s[5] * 2, s[5] + s[3], s[6] + 1],
        x: expl('cada termo = soma dos dois anteriores (tipo Fibonacci)', `${s[2]} = ${s[0]} + ${s[1]}, ${s[3]} = ${s[1]} + ${s[2]}…`, `${s[4]} + ${s[5]} = ${s[6]}.`),
      };
    },
    (r) => {
      const ini = r.pick([1, 2, 3, 4]);
      const s = Array.from({ length: 5 }, (_, i) => (ini + i) ** 2);
      return {
        e: `Qual é o próximo termo da sequência ${s.join(', ')}, …?`,
        r: (ini + 5) ** 2,
        d: [s[4] + (s[4] - s[3]), s[4] * 2, (ini + 5) ** 2 + 1, s[4] + 10],
        x: expl('quadrados perfeitos', `São ${ini}², ${ini + 1}², ${ini + 2}²…`, `${ini + 5}² = ${(ini + 5) ** 2}.`),
      };
    },
    (r) => {
      const a = r.pick([1, 2, 3]), k = r.pick([2, 3, 4]);
      const s = [a];
      for (let i = 1; i < 7; i++) s.push(i % 2 ? s[i - 1] + k : s[i - 1] * 2);
      return {
        e: `A sequência ${s.slice(0, 6).join(', ')}, … alterna duas operações. Qual é o próximo termo?`,
        r: s[6],
        d: [s[5] + k, s[5] * 2 + k, s[5] * 3, s[6] + k],
        x: expl('separe as passagens ímpares e pares', `Alterna "+ ${k}" e "× 2".`, `A próxima passagem é "× 2": ${s[5]} × 2 = ${s[6]}.`),
      };
    },
    (r) => {
      const simb = r.pick([['▲', '●', '■'], ['A', 'B', 'C', 'D'], ['vermelho', 'azul', 'verde', 'amarelo', 'branco']]);
      const k = simb.length, n = r.pick([25, 38, 47, 100, 59]);
      const res = simb[(n - 1) % k];
      return {
        e: `Uma fila repete sempre a ordem ${simb.join(', ')}, ${simb.join(', ')}, … Qual elemento ocupa a ${n}ª posição?`,
        r: res,
        d: simb.filter((x) => x !== res).concat(['não é possível saber', 'o primeiro da fila']).slice(0, 4),
        x: expl('ciclo: use o resto da divisão', `O ciclo tem ${k} elementos; ${n} ÷ ${k} deixa resto ${n % k}${n % k === 0 ? ' (resto 0 = último do ciclo)' : ''}.`, `Posição ${n}: ${res}.`),
      };
    },
    (r) => {
      const b = r.pick([8, 10, 12, 15]), k = r.pick([2, 3]), quem = nome(r);
      return {
        e: `${quem} tem ${k === 2 ? 'o dobro' : 'o triplo'} da idade do irmão. A soma das idades dos dois é ${b * (k + 1)} anos. Quantos anos tem o irmão?`,
        r: b,
        d: [b * k, b * (k + 1), b + k, b - 2, b + 2],
        x: expl('escolher bem a incógnita', `Irmão = x; ${quem} = ${k}x. Então x + ${k}x = ${b * (k + 1)}.`, `${k + 1}x = ${b * (k + 1)} → x = ${b}.`),
      };
    },
  ],
  [
    (r) => {
      const a = r.int(1, 5), d1 = r.int(1, 4), dd = r.pick([1, 2, 3]);
      const s = [a];
      for (let i = 1; i < 7; i++) s.push(s[i - 1] + d1 + (i - 1) * dd);
      return {
        e: `Qual é o próximo termo da sequência ${s.slice(0, 6).join(', ')}, …?`,
        r: s[6],
        d: [s[5] + (s[5] - s[4]), s[6] + dd, s[5] * 2, s[6] - 1],
        x: expl('diferenças das diferenças', `As diferenças são ${s.slice(1, 6).map((v, i) => v - s[i]).join(', ')}: crescem de ${dd} em ${dd}.`, `Próxima diferença: ${s[6] - s[5]}; termo: ${s[6]}.`),
      };
    },
    (r) => {
      const h = r.int(1, 11), m = r.pick([0, 20, 30, 40]);
      let ang = Math.abs(30 * h - 5.5 * m);
      if (ang > 180) ang = 360 - ang;
      return {
        e: `Qual é o menor ângulo formado pelos ponteiros de um relógio às ${h}h${m ? String(m).padStart(2, '0') : ''}?`,
        r: ang,
        d: [Math.abs(30 * h - 6 * m) > 180 ? 360 - Math.abs(30 * h - 6 * m) : Math.abs(30 * h - 6 * m), 360 - ang, ang + 15, (30 * h) % 360],
        f: (v) => `${num(v)}°`,
        x: expl('ponteiro das horas anda 0,5° por minuto', `Horas: 30° × ${h} + 0,5° × ${m} = ${num(30 * h + 0.5 * m)}°; minutos: 6° × ${m} = ${6 * m}°.`, `Diferença: ${num(ang)}°.`),
      };
    },
    (r) => {
      const d = r.int(0, 6), bis = r.pick([true, false]);
      const res = DIAS[(d + (bis ? 2 : 1)) % 7];
      return {
        e: `O dia 10 de março de um ano caiu ${noDia(d)}. Até o próximo 10 de março passam ${bis ? '366 dias (há um 29 de fevereiro no caminho)' : '365 dias'}. Em que dia da semana cairá o próximo 10 de março?`,
        r: res,
        d: DIAS.filter((x) => x !== res).slice(0, 4),
        x: expl('cada 7 dias o dia da semana se repete', bis ? 'São 366 dias = 52 semanas + 2 dias: o dia da semana avança 2.' : 'São 365 dias = 52 semanas + 1 dia: o dia da semana avança 1.', `${DIAS[d]} → ${res}.`),
      };
    },
    (r) => {
      const [a, b, c] = nomes(r, 3);
      return {
        e: `Um vaso quebrou. ${a}: "Não fui eu." ${b}: "Foi ${a}." ${c}: "Não foi ${b}." Sabe-se que só UM deles diz a verdade. Quem quebrou o vaso?`,
        r: b,
        d: [a, c, 'não é possível saber', 'ninguém'],
        x: expl('procure afirmações contraditórias', `${a} e ${b} se contradizem: exatamente um deles diz a verdade. Como só há uma verdade, ${c} mente, e então foi ${b}.`, `Conferindo: ${a} diz a verdade; ${b} e ${c} mentem.`),
      };
    },
    (r) => {
      const [a, b, c] = nomes(r, 3);
      const [x, y, z] = r.sample(['azul', 'verde', 'vermelho', 'preto', 'branco'], 3);
      return {
        e: `${a}, ${b} e ${c} usam camisas de cores diferentes: ${x}, ${y} e ${z}. ${a} não usa ${x} nem ${y}. ${b} não usa ${x}. Qual é a cor da camisa de ${c}?`,
        r: x,
        d: [y, z, 'não é possível saber', r.pick(['amarelo', 'cinza'])],
        x: expl('tabela de associação', `${a} só pode usar ${z}. Sobram ${x} e ${y}; como ${b} não usa ${x}, usa ${y}.`, `${c} usa ${x}.`),
      };
    },
    (r) => {
      const n = r.pick([6, 8, 10, 12, 16, 20]), volta = r.pick([1, 2]);
      return {
        e: `Num campeonato com ${n} times, cada time joga contra cada um dos outros ${volta === 1 ? 'uma vez' : 'duas vezes (turno e returno)'}. Quantos jogos há no total?`,
        r: (n * (n - 1) * volta) / 2,
        d: [n * (n - 1) * (volta === 1 ? 1 : 0.5), n * volta, n * n, (n * (n - 1) * volta) / 4],
        x: expl('cada jogo é um par de times', `Pares possíveis: C(${n}, 2) = ${(n * (n - 1)) / 2}${volta === 2 ? ', jogados duas vezes' : ''}.`, `Total: ${(n * (n - 1) * volta) / 2} jogos.`),
      };
    },
    (r) => {
      const d = r.int(0, 6), bis = r.pick([false, true]);
      const res = DIAS[(d + (bis ? 1 : 0)) % 7];
      return {
        e: `Num ano ${bis ? 'bissexto' : 'não bissexto'}, o dia 1º de fevereiro caiu ${noDia(d)}. Em que dia da semana caiu 1º de março?`,
        r: res,
        d: DIAS.filter((x) => x !== res).slice(0, 4),
        x: expl('conte os dias de fevereiro', bis ? 'Fevereiro tem 29 dias = 4 semanas + 1 dia.' : 'Fevereiro tem 28 dias = exatamente 4 semanas.', `1º de março: ${res}.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.pick([8, 10, 12, 15, 20]), k = r.pick([1, 2, 5]);
      return {
        e: `Na sequência de termo geral aₙ = n² + ${k} (${[1, 2, 3, 4].map((i) => i * i + k).join(', ')}, …), qual é a posição do termo ${n * n + k}?`,
        r: n,
        d: [n * n, n + k, n - 1, n + 1],
        x: expl('igualar ao termo geral e isolar n', `n² + ${k} = ${n * n + k} → n² = ${n * n}.`, `n = ${n}.`),
      };
    },
    (r) => {
      const n = r.pick([3, 4, 5, 8]);
      const tot = (n * (n + 1) * (2 * n + 1)) / 6;
      return {
        e: `Quantos quadrados de todos os tamanhos existem num tabuleiro quadriculado de ${n} × ${n}?`,
        r: tot,
        d: [n * n, n * n + 1, tot - 1, n * n * 2],
        x: expl('some os quadrados de cada tamanho', `De lado 1 há ${n}², de lado 2 há ${n - 1}², …, de lado ${n} há 1.`, `${Array.from({ length: n }, (_, i) => `${(n - i) ** 2}`).join(' + ')} = ${tot}.`),
      };
    },
    (r) => {
      const filho = r.pick([6, 8, 10, 12]), k = r.pick([3, 4]), anos = r.pick([4, 5, 6]);
      const pai = filho * k;
      return {
        e: `Hoje, a idade de um pai é ${k} vezes a do filho, e a soma das duas é ${pai + filho}. Daqui a ${anos} anos, qual será a soma das idades?`,
        r: pai + filho + 2 * anos,
        d: [pai + filho + anos, pai + filho, (pai + anos) * 2, pai + filho + 4 * anos],
        x: expl('cada pessoa envelhece o mesmo tanto', `Os dois ganham ${anos} anos cada: a soma aumenta ${2 * anos}.`, `${pai + filho} + ${2 * anos} = ${pai + filho + 2 * anos}.`),
      };
    },
    (r) => {
      const n = r.pick([6, 8, 10, 12, 15]);
      const ap = (n * (n - 1)) / 2;
      return {
        e: `Numa reunião, cada pessoa apertou a mão de cada uma das outras exatamente uma vez, num total de ${ap} apertos de mão. Quantas pessoas estavam na reunião?`,
        r: n,
        d: [n - 1, n + 1, n - 2, Math.round(Math.sqrt(ap))],
        x: expl('apertos = C(n, 2) = n(n − 1)/2', `n(n − 1) = ${2 * ap}.`, `${n} × ${n - 1} = ${2 * ap} → n = ${n}.`),
      };
    },
    (r) => {
      const n = r.pick([3, 4, 5, 6, 7]);
      return {
        e: `Na Torre de Hanói, o número mínimo de movimentos para transferir n discos é 2ⁿ − 1. Quantos movimentos são necessários, no mínimo, para ${n} discos?`,
        r: 2 ** n - 1,
        d: [2 ** n, 2 * n - 1, n * n, 2 ** (n - 1)],
        x: expl('substituir na fórmula', `2${'⁰¹²³⁴⁵⁶⁷'[n]} − 1.`, `${2 ** n} − 1 = ${2 ** n - 1}.`),
      };
    },
    (r) => {
      const dig = r.int(1, 9);
      const cont = Array.from({ length: 100 }, (_, i) => String(i + 1)).join('').split('').filter((c) => c === String(dig)).length;
      return {
        e: `Escrevendo todos os números de 1 a 100, quantas vezes o algarismo ${dig} aparece?`,
        r: cont,
        d: [10, 11, 19, cont === 20 ? 21 : 20, 9].filter((x) => x !== cont),
        x: expl('conte por posição (unidades e dezenas)', `Nas unidades, o ${dig} aparece 10 vezes; nas dezenas, mais 10${dig === 1 ? ' (de 10 a 19), e ainda há o 1 do 100' : ''}.`, `Total: ${cont}.`),
      };
    },
  ],
];

// ======================================================= 04 Conjuntos
const conjuntos = [
  [
    (r) => {
      const n = r.pick([3, 4, 5, 6]);
      const els = 'abcdefgh'.slice(0, n).split('');
      return {
        e: `Quantos subconjuntos tem o conjunto {${els.join(', ')}}?`,
        r: 2 ** n,
        d: [n, 2 * n, n * n, 2 ** n - 1],
        x: expl('n elementos → 2ⁿ subconjuntos', 'Cada elemento entra ou não entra (2 opções), incluindo o vazio e o próprio conjunto.', `2${'⁰¹²³⁴⁵⁶⁷'[n]} = ${2 ** n}.`),
      };
    },
    (r) => {
      const A = r.sample([1, 2, 3, 4, 5, 6, 7], 3).sort((x, y) => x - y);
      const fora = [1, 2, 3, 4, 5, 6, 7, 8, 9].find((x) => !A.includes(x));
      const certa = r.pick([`${A[0]} ∈ A`, `{${A[0]}} ⊂ A`, `∅ ⊂ A`, `${fora} ∉ A`]);
      return {
        e: `Dado A = {${A.join(', ')}}, qual das afirmações é verdadeira?`,
        r: certa,
        d: [`${A[0]} ⊂ A`, `{${A[0]}} ∈ A`, `${fora} ∈ A`, `A ⊂ {${A.slice(0, 2).join(', ')}}`, `∅ ∈ A`].filter((x) => x !== certa),
        x: expl('∈ relaciona elemento e conjunto; ⊂ relaciona dois conjuntos', `${A[0]} é elemento (∈); {${A[0]}} é um conjunto contido em A (⊂); o vazio está contido em todo conjunto.`, `Verdadeira: ${certa}.`),
      };
    },
    (r) => {
      const A = r.sample([1, 2, 3, 4, 5, 6, 7, 8], 5).sort((x, y) => x - y), B = r.sample([2, 4, 6, 8, 9, 10], 4).sort((x, y) => x - y);
      const dif = A.filter((x) => !B.includes(x));
      return {
        e: `Sejam A = {${A.join(', ')}} e B = {${B.join(', ')}}. Quantos elementos tem A − B?`,
        r: dif.length,
        d: [A.length - B.length, A.filter((x) => B.includes(x)).length, B.filter((x) => !A.includes(x)).length, A.length].filter((x) => x !== dif.length),
        x: expl('A − B: está em A e não está em B', 'Tire de A os elementos que também estão em B.', `A − B = {${dif.join(', ')}}: ${dif.length} elementos.`),
      };
    },
    (r) => {
      const a = r.pick([30, 40, 50, 60]), ab = r.pick([10, 12, 15, 20]);
      return {
        e: `Numa pesquisa, ${a} pessoas usam o aplicativo A, e ${ab} delas usam também o aplicativo B. Quantas usam SÓ o aplicativo A?`,
        r: a - ab,
        d: [a, ab, a + ab, a - 2 * ab],
        x: expl('"só A" = A menos a interseção', 'As que usam os dois estão contadas dentro das que usam A.', `${a} − ${ab} = ${a - ab}.`),
      };
    },
    (r) => {
      const n = r.pick([12, 18, 20, 24, 30, 36]);
      const div = Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
      return {
        e: `Quantos elementos tem o conjunto D dos divisores positivos de ${n}?`,
        r: div.length,
        d: [div.length - 1, div.length + 1, div.length - 2, n / 2],
        x: expl('listar os divisores em pares', `Divisores: ${div.join(', ')}.`, `São ${div.length}.`),
      };
    },
    (r) => {
      const a = r.int(2, 6), b = r.int(2, 6);
      return {
        e: `Se A tem ${a} elementos e B tem ${b} elementos, quantos pares ordenados (x, y), com x ∈ A e y ∈ B, existem no produto cartesiano A × B?`,
        r: a * b,
        d: [a + b, 2 ** (a + b), a ** b, a * b * 2],
        x: expl('n(A × B) = n(A)·n(B)', 'Para cada x de A há n(B) escolhas de y.', `${a} × ${b} = ${a * b}.`),
      };
    },
    (r) => {
      const a = r.int(1, 5), b = a + r.int(3, 8);
      const tipo = r.pick(['<', '≤']);
      const n = tipo === '<' ? b - a - 1 : b - a;
      return {
        e: `Quantos elementos tem o conjunto {x ∈ ℕ | ${a} < x ${tipo} ${b}}?`,
        r: n,
        d: [b - a + 1, tipo === '<' ? b - a : b - a - 1, b, n * 2],
        x: expl('liste os naturais que satisfazem a condição', `${a} não entra (é "<"); ${b} ${tipo === '≤' ? 'entra' : 'não entra'}.`, `{${Array.from({ length: n }, (_, i) => a + 1 + i).join(', ')}}: ${n} elementos.`),
      };
    },
  ],
  [
    (r) => {
      const a = r.pick([35, 40, 45, 60]), b = r.pick([25, 30, 50]), ab = r.pick([10, 12, 15, 20]);
      const uni = a + b - ab;
      return {
        e: `Numa escola, ${a} alunos fazem inglês, ${b} fazem espanhol e ${uni} fazem pelo menos um dos dois cursos. Quantos fazem os dois?`,
        r: ab,
        d: [a + b, uni - a, uni - b, a + b + uni],
        x: expl('n(A ∩ B) = n(A) + n(B) − n(A ∪ B)', 'A soma de A e B conta duas vezes quem faz os dois.', `${a} + ${b} − ${uni} = ${ab}.`),
      };
    },
    (r) => {
      const tot = r.pick([100, 120, 150, 200]), a = r.pick([50, 60, 70]), b = r.pick([30, 40, 45]), ab = r.pick([10, 15, 20]);
      const nen = tot - (a + b - ab);
      if (nen < 0) throw new Error('negativo');
      return {
        e: `Dos ${tot} funcionários de uma empresa, ${a} têm carro, ${b} têm moto e ${ab} têm os dois. Quantos não têm nem carro nem moto?`,
        r: nen,
        d: [tot - a - b, tot - (a + b + ab), a + b - ab, nen + ab * 2],
        x: expl('"nenhum dos dois" = total − união', `União = ${a} + ${b} − ${ab} = ${a + b - ab}.`, `${tot} − ${a + b - ab} = ${nen}.`),
      };
    },
    (r) => {
      const n = r.pick([5, 6, 7, 8]), k = r.pick([2, 3]);
      return {
        e: `Um conjunto tem ${n} elementos. Quantos dos seus subconjuntos têm exatamente ${k} elementos?`,
        r: comb(n, k),
        d: [2 ** n, n * k, comb(n, k) * 2, 2 ** k],
        x: expl('subconjuntos de k elementos = C(n, k)', 'Num subconjunto a ordem não importa.', `C(${n}, ${k}) = ${comb(n, k)}.`),
      };
    },
    (r) => {
      const a = r.int(-5, 0), b = r.int(3, 8), c = r.int(-2, 2), d = r.int(4, 10);
      const lo = Math.max(a, c), hi = Math.min(b, d);
      // [a, b] ∩ ]c, d]
      const ints = [];
      for (let x = Math.ceil(lo); x <= hi; x++) if (x >= a && x <= b && x > c && x <= d) ints.push(x);
      return {
        e: `Quantos números inteiros pertencem à interseção dos intervalos [${a}, ${b}] e ]${c}, ${d}]?`.replace(/-/g, '−'),
        r: ints.length,
        d: [ints.length + 1, ints.length - 1, b - a + 1, d - c],
        x: expl('interseção de intervalos: a parte comum', `A parte comum vai de ${Math.max(a, c)} (${a > c ? 'fechado' : 'aberto'}) até ${hi} (fechado).`.replace(/-/g, '−'), `Inteiros: ${ints.join(', ').replace(/-/g, '−')} → ${ints.length}.`),
      };
    },
    (r) => {
      const n = r.pick([3, 4, 5, 6, 7]);
      return {
        e: `O conjunto das partes de A, P(A), tem ${2 ** n} elementos. Quantos elementos tem A?`,
        r: n,
        d: [2 ** n / 2, n + 1, n - 1, Math.sqrt(2 ** n)],
        x: expl('n(P(A)) = 2ⁿ', `2ⁿ = ${2 ** n}.`, `n = ${n}.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[3, 5], [2, 3], [4, 6], [2, 5]]), N = r.pick([30, 60, 100, 120]);
      const mmc = a * b / (a === 4 && b === 6 ? 2 : 1);
      const res = Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / mmc);
      return {
        e: `Quantos números de 1 a ${N} são múltiplos de ${a} ou de ${b}?`,
        r: res,
        d: [Math.floor(N / a) + Math.floor(N / b), Math.floor(N / mmc), res - 1, N - res],
        x: expl('inclusão-exclusão', `Múltiplos de ${a}: ${Math.floor(N / a)}; de ${b}: ${Math.floor(N / b)}; dos dois (múltiplos de ${mmc}): ${Math.floor(N / mmc)}.`, `${Math.floor(N / a)} + ${Math.floor(N / b)} − ${Math.floor(N / mmc)} = ${res}.`),
      };
    },
    (r) => {
      const U = r.pick([20, 30, 50]), a = r.pick([8, 12, 15]), b = r.pick([5, 6, 10]), ab = r.pick([2, 3, 4]);
      const compl = U - (a + b - ab);
      return {
        e: `Num universo U com ${U} elementos, n(A) = ${a}, n(B) = ${b} e n(A ∩ B) = ${ab}. Quantos elementos tem o complementar de A ∪ B?`,
        r: compl,
        d: [U - a - b, U - a, a + b - ab, compl + ab],
        x: expl('complementar = universo − conjunto', `n(A ∪ B) = ${a} + ${b} − ${ab} = ${a + b - ab}.`, `${U} − ${a + b - ab} = ${compl}.`),
      };
    },
  ],
  [
    (r) => {
      const [A, B, C, AB, AC, BC, ABC] = r.pick([[40, 35, 30, 12, 10, 8, 4], [50, 40, 30, 15, 10, 10, 5], [30, 30, 30, 10, 10, 10, 4], [45, 30, 25, 12, 9, 6, 3]]);
      const soA = A - AB - AC + ABC, soB = B - AB - BC + ABC, soC = C - AC - BC + ABC;
      return {
        e: `Numa pesquisa, ${A} pessoas leem o jornal A, ${B} o B e ${C} o C; ${AB} leem A e B, ${AC} leem A e C, ${BC} leem B e C, e ${ABC} leem os três. Quantas leem EXATAMENTE UM jornal?`,
        r: soA + soB + soC,
        d: [A + B + C - AB - AC - BC + ABC, A + B + C, soA + soB + soC - ABC, AB + AC + BC - 3 * ABC],
        x: expl('diagrama de Venn do centro para fora', `Só A = ${A} − ${AB} − ${AC} + ${ABC} = ${soA}; só B = ${soB}; só C = ${soC}.`, `${soA} + ${soB} + ${soC} = ${soA + soB + soC}.`),
      };
    },
    (r) => {
      const tot = r.pick([100, 50, 80]), a = r.pick([60, 70, 0.75 * 80]), b = r.pick([55, 65, 45]);
      const min = Math.max(0, a + b - tot);
      if (min === 0 || a > tot || b > tot) throw new Error('trivial');
      return {
        e: `Numa turma de ${tot} alunos, ${a} gostam de matemática e ${b} gostam de português. Qual é o número MÍNIMO de alunos que gostam das duas matérias?`,
        r: min,
        d: [Math.min(a, b), a + b, tot - Math.max(a, b), min + 10],
        x: expl('mínimo da interseção = n(A) + n(B) − total', `Mesmo que ninguém fique de fora, ${a} + ${b} = ${a + b} passa de ${tot}: o excesso tem de ser contado duas vezes.`, `${a + b} − ${tot} = ${min}.`),
      };
    },
    (r) => {
      const A = r.sample([1, 2, 3, 4, 5, 6, 7], 5).sort((x, y) => x - y), B = r.sample([3, 4, 5, 6, 8, 9], 4).sort((x, y) => x - y);
      const ds = [...A.filter((x) => !B.includes(x)), ...B.filter((x) => !A.includes(x))];
      return {
        e: `A diferença simétrica A Δ B reúne os elementos que estão em A ou em B, mas não nos dois. Para A = {${A.join(', ')}} e B = {${B.join(', ')}}, quantos elementos tem A Δ B?`,
        r: ds.length,
        d: [new Set([...A, ...B]).size, A.filter((x) => B.includes(x)).length, A.length + B.length, ds.length + 1].filter((x) => x !== ds.length),
        x: expl('A Δ B = (A ∪ B) − (A ∩ B)', `União: ${new Set([...A, ...B]).size} elementos; interseção: ${A.filter((x) => B.includes(x)).length}.`, `A Δ B = {${ds.sort((x, y) => x - y).join(', ')}}: ${ds.length}.`),
      };
    },
    (r) => {
      const n = r.pick([4, 5, 6, 7]);
      return {
        e: `Um conjunto tem ${n} elementos, entre eles o elemento a. Quantos subconjuntos contêm o elemento a?`,
        r: 2 ** (n - 1),
        d: [2 ** n, 2 ** n - 1, n, 2 ** (n - 1) - 1],
        x: expl('fixe o elemento obrigatório', `O a já está escolhido; os outros ${n - 1} elementos entram ou não.`, `2${'⁰¹²³⁴⁵⁶⁷'[n - 1]} = ${2 ** (n - 1)}.`),
      };
    },
    (r) => {
      const a = r.pick([20, 25, 30, 40]), b = r.pick([15, 18, 35, 50]);
      return {
        e: `O conjunto A tem ${a} elementos e B tem ${b}. Qual é o MAIOR número possível de elementos em A ∩ B?`,
        r: Math.min(a, b),
        d: [Math.max(a, b), a + b, Math.abs(a - b), 0],
        x: expl('a interseção cabe dentro do menor conjunto', 'No máximo, o menor conjunto está inteiro dentro do outro.', `Máximo: ${Math.min(a, b)}.`),
      };
    },
    (r) => {
      const [AB, AC, BC, ABC] = r.pick([[12, 10, 8, 4], [15, 10, 10, 5], [9, 7, 6, 2], [20, 14, 11, 6]]);
      const pelo2 = AB + AC + BC - 2 * ABC;
      return {
        e: `Em três clubes, ${AB} pessoas são sócias de A e B, ${AC} de A e C, ${BC} de B e C, e ${ABC} são sócias dos três. Quantas pessoas são sócias de PELO MENOS DOIS clubes?`,
        r: pelo2,
        d: [AB + AC + BC, AB + AC + BC - ABC, AB + AC + BC - 3 * ABC, pelo2 + ABC * 2],
        x: expl('cuidado: quem está nos três foi contado em cada interseção dupla', `Exatamente dois: ${AB + AC + BC - 3 * ABC}; nos três: ${ABC}.`, `${AB + AC + BC - 3 * ABC} + ${ABC} = ${pelo2}.`),
      };
    },
  ],
];

export default { proposicoes, negacoes, sequencias, conjuntos };
