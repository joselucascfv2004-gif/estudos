// Raciocínio lógico — modelos novos (complementam os de logica.mjs).
// As funções de logica.mjs só são usadas dentro dos modelos (na hora de gerar), então a
// importação circular é segura.
import { expl, mmc, num } from './util.mjs';
import { SIMPLES, QUANT, cap, dois, avaliar, texto, gerarExpr, varsDe } from './logica.mjs';

const VF = (v) => (v ? 'V' : 'F');
const fmtConj = (l) => (l.length ? `{${l.join(', ')}}` : '∅');

// ======================================================= Proposições
const proposicoes = [
  [
    (r) => {
      const { p, np, q, nq } = dois(r);
      const formas = [
        ['~p ∧ q', `${cap(np)} e ${q}.`],
        ['p ∧ ~q', `${cap(p)} e ${nq}.`],
        ['p ∨ ~q', `${cap(p)} ou ${nq}.`],
        ['~p ∨ q', `${cap(np)} ou ${q}.`],
        ['~p → q', `Se ${np}, então ${q}.`],
        ['p → ~q', `Se ${p}, então ${nq}.`],
        ['q → p', `Se ${q}, então ${p}.`],
        ['~p ∧ ~q', `${cap(np)} e ${nq}.`],
        ['p ↔ ~q', `${cap(p)} se, e somente se, ${nq}.`],
      ];
      const [simb, certa] = r.pick(formas);
      return {
        e: `Considere as proposições p: "${p}" e q: "${q}". Qual frase traduz a proposição ${simb}?`,
        r: certa,
        d: r.shuffle(formas.filter((f) => f[0] !== simb).map((f) => f[1])),
        x: expl('dicionário dos símbolos', '~ é "não", ∧ é "e", ∨ é "ou", → é "se..., então" e ↔ é "se, e somente se". Traduza símbolo por símbolo.', `${simb}: "${certa}"`),
      };
    },
    (r) => {
      const casos = [
        ['p ∧ q', 'verdadeira', 'VV', 'O "e" só é verdadeiro quando as duas partes são verdadeiras.'],
        ['p ∨ q', 'falsa', 'FF', 'O "ou" só é falso quando as duas partes são falsas.'],
        ['p → q', 'falsa', 'VF', 'O "se..., então" só é falso no caso V → F.'],
        ['~p ∧ q', 'verdadeira', 'FV', 'O "e" só é verdadeiro quando ~p e q são verdadeiras, isto é, p falsa e q verdadeira.'],
        ['p ∧ ~q', 'verdadeira', 'VF', 'O "e" só é verdadeiro quando p e ~q são verdadeiras, isto é, p verdadeira e q falsa.'],
        ['~p ∨ q', 'falsa', 'VF', 'O "ou" só é falso quando ~p e q são falsas, isto é, p verdadeira e q falsa.'],
        ['q → p', 'falsa', 'FV', 'O "se..., então" só é falso quando o antecedente (q) é V e o consequente (p) é F.'],
        ['~p → ~q', 'falsa', 'FV', 'O "se..., então" só é falso quando ~p é V e ~q é F, isto é, p falsa e q verdadeira.'],
      ];
      const [f, valor, certo, regra] = r.pick(casos);
      const txt = { VV: 'p verdadeira e q verdadeira', VF: 'p verdadeira e q falsa', FV: 'p falsa e q verdadeira', FF: 'p falsa e q falsa' };
      return {
        e: `Em qual situação a proposição ${f} é ${valor}?`,
        r: `Somente quando ${txt[certo]}`,
        d: [...Object.keys(txt).filter((k) => k !== certo).map((k) => `Somente quando ${txt[k]}`), 'Em todas as situações'],
        x: expl('o caso especial de cada conectivo', regra, `Resposta: ${txt[certo]}.`),
      };
    },
    (r) => {
      const [a, b, c] = r.sample(SIMPLES, 3);
      const [frase, n, total] = r.pick([
        [`Se ${a[0]}, então ${b[0]} ou ${a[1]}.`, 2, 3],
        [`${cap(a[0])} e ${b[0]}, ou ${c[0]}.`, 3, 3],
        [`Se ${a[0]} e ${b[1]}, então ${c[0]}.`, 3, 3],
        [`${cap(a[1])} ou ${b[0]}, e ${a[0]}.`, 2, 3],
        [`Se ${a[0]}, então ${b[0]}; e, se ${b[1]}, então ${c[1]}.`, 3, 4],
        [`${cap(a[0])} se, e somente se, ${b[1]}; ou ${a[1]}.`, 2, 3],
      ]);
      return {
        e: `Quantas linhas tem a tabela-verdade da proposição "${frase}"?`,
        r: 2 ** n,
        d: [2 ** total, 2 ** (n + 1), 2 * n, n, 2 ** (total + 1)],
        x: expl('2ⁿ linhas, com n = proposições simples DIFERENTES', 'Uma proposição e a sua negação contam como uma só (ex.: "chove" e "não chove" usam a mesma proposição).', `Aqui há ${n} proposições simples diferentes: 2${n === 2 ? '²' : n === 3 ? '³' : '⁴'} = ${2 ** n} linhas.`),
      };
    },
  ],
  [
    (r) => {
      const { p, np, q, nq } = dois(r);
      const formas = [
        [`Não é verdade que ${p} e ${q}.`, '~(p ∧ q)'],
        [`${cap(np)} e ${nq}.`, '~p ∧ ~q'],
        [`Não é verdade que ${p} ou ${q}.`, '~(p ∨ q)'],
        [`${cap(np)} ou ${nq}.`, '~p ∨ ~q'],
        [`Se ${np}, então ${q}.`, '~p → q'],
        [`Se ${q}, então ${np}.`, 'q → ~p'],
        [`${cap(p)} se, e somente se, ${nq}.`, 'p ↔ ~q'],
        [`Não é verdade que, se ${p}, então ${q}.`, '~(p → q)'],
      ];
      const [frase, certa] = r.pick(formas);
      return {
        e: `Sejam p: "${p}" e q: "${q}". Em linguagem simbólica, a frase "${frase}" é escrita como:`,
        r: certa,
        d: r.shuffle(formas.filter((f) => f[1] !== certa).map((f) => f[1])),
        x: expl('frase → símbolos', '"Não é verdade que..." nega TUDO o que vem depois, por isso usa parênteses; "não" colado numa parte nega só aquela parte.', `"${frase}" = ${certa}.`),
      };
    },
    (r) => {
      const casos = [
        ['(p ∧ q) → r', 'falsa', 'VVF', 'Condicional falsa: antecedente V e consequente F. O antecedente p ∧ q só é V com p e q verdadeiras; e r é F.'],
        ['p → (q ∨ r)', 'falsa', 'VFF', 'Condicional falsa: p é V e q ∨ r é F; um "ou" falso exige q e r falsas.'],
        ['p ∨ (q ∨ r)', 'falsa', 'FFF', 'Um "ou" só é falso quando todas as partes são falsas.'],
        ['p → (q → r)', 'falsa', 'VVF', 'Condicional falsa: p é V e q → r é F; e q → r só é F com q verdadeira e r falsa.'],
        ['~p ∧ (q ∧ ~r)', 'verdadeira', 'FVF', 'Um "e" só é verdadeiro quando todas as partes são V: ~p (p falsa), q e ~r (r falsa).'],
      ];
      const [f, valor, certo, regra] = r.pick(casos);
      const todos = ['VVV', 'VVF', 'VFV', 'VFF', 'FVV', 'FVF', 'FFV', 'FFF'];
      const fmt = (t) => `p = ${t[0]}, q = ${t[1]} e r = ${t[2]}`;
      return {
        e: `Sabe-se que a proposição ${f} é ${valor.toUpperCase()}. Então, os valores lógicos de p, q e r são:`,
        r: fmt(certo),
        d: r.shuffle(todos.filter((t) => t !== certo)).map(fmt),
        x: expl('começar pelo conectivo principal', regra, `Logo, ${fmt(certo)}.`),
      };
    },
    (r) => {
      const val = { p: r() < 0.5, q: r() < 0.5, r: r() < 0.5 };
      const exprs = [];
      const vistos = new Set();
      for (let t = 0; exprs.length < 4 && t < 200; t++) {
        const e = gerarExpr(r, ['p', 'q', 'r'], 1);
        if (!e.op || varsDe(e).size < 2 || vistos.has(texto(e))) continue;
        vistos.add(texto(e));
        exprs.push(e);
      }
      const vals = exprs.map((e) => avaliar(e, val));
      const n = vals.filter(Boolean).length;
      const rom = ['I', 'II', 'III', 'IV'];
      return {
        e: `Sendo p ${val.p ? 'verdadeira' : 'falsa'}, q ${val.q ? 'verdadeira' : 'falsa'} e r ${val.r ? 'verdadeira' : 'falsa'}, quantas das proposições a seguir são verdadeiras? ${exprs.map((e, i) => `${rom[i]}. ${texto(e)}`).join('; ')}.`,
        r: n,
        d: [0, 1, 2, 3, 4].filter((k) => k !== n),
        x: expl('substituir e aplicar a regra de cada conectivo', 'Troque cada letra pelo seu valor (V ou F) e resolva uma proposição de cada vez.', exprs.map((e, i) => `${rom[i]}: ${VF(vals[i])}`).join('; ') + `. Total: ${n}.`),
      };
    },
  ],
  [
    (r) => {
      const [a, b, c] = r.sample(SIMPLES, 3);
      return {
        e: `Considere as premissas: P1: "${cap(a[0])} ou ${b[0]}." P2: "Se ${b[0]}, então ${c[0]}." P3: "${cap(a[1])}." Uma conclusão válida é:`,
        r: `${cap(c[0])}.`,
        d: [`${cap(c[1])}.`, `${cap(b[1])}.`, `${cap(a[0])} e ${c[1]}.`, 'Nada se pode concluir.'],
        x: expl('encadear regras (silogismo disjuntivo + modus ponens)', 'Use primeiro a premissa simples (P3) e vá "derrubando dominós".', `Se ${a[1]}, então, por P1, ${b[0]}. Por P2, ${c[0]}.`),
      };
    },
    (r) => {
      const [a, b, c] = r.sample(SIMPLES, 3);
      return {
        e: `Considere verdadeiras as proposições: "Se ${a[0]}, então ${b[0]}", "Se ${b[0]}, então ${c[0]}" e "${cap(c[1])}". Pode-se concluir que:`,
        r: `${cap(a[1])} e ${b[1]}.`,
        d: [`${cap(a[0])} e ${b[1]}.`, `${cap(a[1])} e ${b[0]}.`, `${cap(a[0])} e ${b[0]}.`, `${cap(b[1])}, mas nada se sabe sobre "${a[0]}".`],
        x: expl('modus tollens em cadeia', 'Se o fim da cadeia é falso, tudo o que levaria a ele também é falso (de trás para a frente).', `Como ${c[1]}, então ${b[1]} (2ª premissa); e então ${a[1]} (1ª premissa).`),
      };
    },
    (r) => {
      const casos = [
        ['é falsa somente quando p é verdadeira e q é falsa', 'p → q'],
        ['é falsa somente quando p e q são falsas', 'p ∨ q'],
        ['é verdadeira somente quando p e q são verdadeiras', 'p ∧ q'],
        ['é verdadeira exatamente quando p e q têm o mesmo valor lógico', 'p ↔ q'],
        ['é verdadeira exatamente quando p e q têm valores lógicos diferentes', '~(p ↔ q)'],
        ['é falsa somente quando p é falsa e q é verdadeira', 'q → p'],
        ['é verdadeira somente quando p e q são falsas', '~p ∧ ~q'],
      ];
      const [desc, certa] = r.pick(casos);
      return {
        e: `Uma proposição composta P, formada por p e q, ${desc}. Qual das proposições abaixo pode ser P?`,
        r: certa,
        d: r.shuffle(casos.filter((c) => c[1] !== certa).map((c) => c[1])),
        x: expl('a tabela-verdade é a "impressão digital" da proposição', 'Duas proposições com a mesma tabela são equivalentes. Procure o conectivo cujo caso especial é o descrito.', `${certa} tem exatamente essa tabela.`),
      };
    },
  ],
];

// ======================================================= Negações e equivalências
const REL = { '>': 'maior que', '<': 'menor que', '≥': 'maior ou igual a', '≤': 'menor ou igual a', '=': 'igual a', '≠': 'diferente de' };
const NEG = { '>': '≤', '<': '≥', '≥': '<', '≤': '>', '=': '≠' };
const ERRADA = { '>': '<', '<': '>', '≥': '≤', '≤': '≥' };
const negacoes = [
  [
    (r) => {
      const rel = r.pick(['>', '<', '≥', '≤', '=']);
      const [suj, k] = r.pick([['A nota do candidato', r.int(5, 9)], ['A taxa de juros', r.int(2, 15) + '%'], ['A idade de Pedro', r.int(18, 60) + ' anos'], ['O saldo da conta', `R$ ${num(r.int(1, 9) * 100)}`], ['A temperatura', r.int(10, 35) + ' °C']]);
      const frase = (s) => `${suj} é ${REL[s]} ${k}.`;
      return {
        e: `Qual é a negação de "${frase(rel)}"?`,
        r: frase(NEG[rel]),
        d: Object.keys(REL).filter((s) => s !== NEG[rel] && s !== rel).map(frase),
        x: expl('negar uma comparação', 'A negação cobre TODOS os outros casos: o contrário de "maior que" é "menor ou igual a" (o "igual" entra!).', `Negação: ${frase(NEG[rel])}`),
      };
    },
    (r) => {
      const [s, pr, npr] = r.pick(QUANT);
      return {
        e: `Qual proposição é logicamente equivalente a "Nenhum ${s} ${pr}"?`,
        r: `Todo ${s} ${npr}.`,
        d: [`Algum ${s} ${npr}.`, `Algum ${s} ${pr}.`, `Todo ${s} ${pr}.`, `Nem todo ${s} ${pr}.`],
        x: expl('"nenhum" = "todo... não"', 'Dizer que nenhum tem a característica é o mesmo que dizer que todos não a têm.', `"Nenhum ${s} ${pr}" ≡ "Todo ${s} ${npr}".`),
      };
    },
    (r) => {
      const POOL = ['p ∧ q', 'p ∨ q', '~p ∧ q', '~p ∨ q', 'p ∧ ~q', 'p ∨ ~q', '~p ∧ ~q', '~p ∨ ~q'];
      const negar = (f) => {
        const [a, op, b] = f.split(' ');
        const n = (x) => (x.startsWith('~') ? x.slice(1) : '~' + x);
        return `${n(a)} ${op === '∧' ? '∨' : '∧'} ${n(b)}`;
      };
      const f = r.pick(POOL);
      const certa = negar(f);
      return {
        e: `Qual é a negação de ${f}?`,
        r: certa,
        d: r.shuffle(POOL.filter((g) => g !== certa && g !== f)),
        x: expl('Leis de De Morgan', 'Negue cada parte (~~p vira p) e troque o conectivo: ∧ vira ∨ e ∨ vira ∧.', `~(${f}) ≡ ${certa}.`),
      };
    },
  ],
  [
    (r) => {
      const [base, eq, nao] = r.pick([
        ['p → q', ['~q → ~p', '~p ∨ q', '~(p ∧ ~q)', 'q ∨ ~p'], ['q → p', '~p → ~q', 'p ∧ ~q', '~p ∧ q']],
        ['p ∨ q', ['~p → q', '~q → p', 'q ∨ p', '~(~p ∧ ~q)'], ['p → q', '~p ∧ ~q', 'p ∧ q', '~p → ~q']],
        ['~p → q', ['~q → p', 'p ∨ q', '~(~p ∧ ~q)', 'q ∨ p'], ['p → ~q', 'q → ~p', '~p ∧ ~q', 'p → q']],
      ]);
      const certa = r.pick(nao);
      return {
        e: `Qual das proposições abaixo NÃO é logicamente equivalente a ${base}?`,
        r: certa,
        d: eq,
        x: expl('equivalências da condicional', 'p → q ≡ ~q → ~p (contrapositiva) ≡ ~p ∨ q ≡ ~(p ∧ ~q). A recíproca (q → p) e a inversa (~p → ~q) NÃO são equivalentes.', `${certa} não tem a mesma tabela-verdade de ${base}.`),
      };
    },
    (r) => {
      const [r1, r2] = [r.pick(['>', '<', '≥', '≤']), r.pick(['>', '<', '≥', '≤'])];
      const a = r.int(1, 9), b = r.int(1, 9);
      const con = r.pick(['e', 'ou']), outro = con === 'e' ? 'ou' : 'e';
      const A = `x ${r1} ${a}`, B = `y ${r2} ${b}`;
      const nA = `x ${NEG[r1]} ${a}`, nB = `y ${NEG[r2]} ${b}`;
      return {
        e: `Qual é a negação de "${A} ${con} ${B}"?`,
        r: `${nA} ${outro} ${nB}`,
        d: [`${nA} ${con} ${nB}`, `x ${ERRADA[r1]} ${a} ${outro} y ${ERRADA[r2]} ${b}`, `${nA} ${outro} ${B}`, `${A} ${outro} ${B}`],
        x: expl('De Morgan + negar comparações', `Troque "${con}" por "${outro}" e negue cada comparação (lembrando que o "igual" muda de lado).`, `~(${A} ${con} ${B}) ≡ ${nA} ${outro} ${nB}.`),
      };
    },
    (r) => {
      const [s, pr, npr] = r.pick(QUANT);
      return {
        e: `Qual é a negação de "Existe ${s} que ${npr}"?`,
        r: `Todo ${s} ${pr}.`,
        d: [`Nenhum ${s} ${pr}.`, `Algum ${s} ${pr}.`, `Existe ${s} que ${pr}.`, `Todo ${s} ${npr}.`],
        x: expl('negar quantificadores', '"Existe" vira "todo", e a característica é negada (e vice-versa).', `"Não existe ${s} que ${npr}" ≡ "Todo ${s} ${pr}".`),
      };
    },
  ],
  [
    (r) => {
      const a = r.int(2, 9), b = r.int(2, 9);
      return {
        e: `Qual é a negação de "Se x > ${a}, então y < ${b}"?`,
        r: `x > ${a} e y ≥ ${b}`,
        d: [`x ≤ ${a} e y ≥ ${b}`, `Se x > ${a}, então y ≥ ${b}`, `x > ${a} ou y ≥ ${b}`, `x > ${a} e y > ${b}`, `Se x ≤ ${a}, então y ≥ ${b}`],
        x: expl('negação da condicional (mantém e nega)', 'Mantenha a 1ª parte, troque "se..., então" por "e" e negue a 2ª parte. A negação de "<" é "≥".', `~(p → q) ≡ p ∧ ~q: x > ${a} e y ≥ ${b}.`),
      };
    },
    (r) => {
      const certa = r.pick(['(p → q) ∧ (q → p)', '(p ∧ q) ∨ (~p ∧ ~q)', '~p ↔ ~q']);
      return {
        e: 'A proposição p ↔ q é logicamente equivalente a:',
        r: certa,
        d: ['(p → q) ∨ (q → p)', '(p ∧ ~q) ∨ (~p ∧ q)', '(p ∨ q) ∧ (~p ∨ ~q)', 'p ↔ ~q', '(p → q) ∧ (~q → ~p)'],
        x: expl('bicondicional = ida e volta', 'p ↔ q é verdadeira quando p e q têm o mesmo valor: (p → q) ∧ (q → p) ≡ (p ∧ q) ∨ (~p ∧ ~q) ≡ ~p ↔ ~q.', `Por isso, ${certa}.`),
      };
    },
    (r) => {
      const [s, pr, npr] = r.pick(QUANT);
      const frase = r.pick([`Não é verdade que nenhum ${s} ${pr}`, `Não é verdade que todo ${s} ${npr}`]);
      return {
        e: `A afirmação "${frase}" é equivalente a:`,
        r: `Algum ${s} ${pr}.`,
        d: [`Todo ${s} ${pr}.`, `Nenhum ${s} ${pr}.`, `Algum ${s} ${npr}.`, `Todo ${s} ${npr}.`],
        x: expl('negação de quantificador', '"Não é verdade que..." pede a negação. A negação de "nenhum A é B" e de "todo A não é B" é a mesma: "algum A é B" (basta existir um).', `Logo: algum ${s} ${pr}.`),
      };
    },
  ],
];

// ======================================================= Sequências e problemas
const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const sequencias = [
  [
    (r) => {
      const pg = r() < 0.5;
      let seq, regra;
      if (pg) {
        const a = r.int(2, 5), q = r.pick([2, 3]);
        seq = [0, 1, 2, 3, 4].map((i) => a * q ** i);
        regra = `cada termo é o anterior multiplicado por ${q}`;
      } else {
        const a = r.int(3, 20), d = r.int(4, 13);
        seq = [0, 1, 2, 3, 4].map((i) => a + d * i);
        regra = `cada termo é o anterior mais ${d}`;
      }
      const i = r.int(1, 3);
      const v = seq[i];
      return {
        e: `Qual número substitui o "?" na sequência ${seq.map((x, k) => (k === i ? '?' : x)).join(', ')}?`,
        r: v,
        d: [Math.round((seq[i - 1] + seq[i + 1]) / 2), v + 1, v - 1, seq[i - 1] * 2, v + 2],
        x: expl('descobrir a regra olhando os vizinhos', 'Compare termos conhecidos vizinhos: a diferença (soma) ou a razão (multiplicação) se repete.', `Regra: ${regra}. O termo que falta é ${v}.`),
      };
    },
    (r) => {
      const d0 = r.int(0, 6), n = r.int(30, 400);
      const alvo = (d0 + n) % 7;
      return {
        e: `Hoje é ${DIAS[d0]}. Que dia da semana será daqui a ${n} dias?`,
        r: DIAS[alvo],
        d: DIAS.filter((_, i) => i !== alvo),
        x: expl('resto da divisão por 7', 'A semana se repete a cada 7 dias; só o resto importa.', `${n} = 7 × ${Math.floor(n / 7)} + ${n % 7}: avança ${n % 7} ${n % 7 === 1 ? 'dia' : 'dias'} a partir de ${DIAS[d0]}: ${DIAS[alvo]}.`),
      };
    },
    (r) => {
      const [fig, a, b] = r.pick([['quadrados lado a lado', 4, 3], ['triângulos lado a lado', 3, 2], ['hexágonos lado a lado', 6, 5], ['pentágonos lado a lado', 5, 4]]);
      const n = r.int(15, 60);
      const v = a + b * (n - 1);
      return {
        e: `Uma sequência de figuras é feita com palitos formando ${fig}: a 1ª figura usa ${a} palitos, a 2ª usa ${a + b} e a 3ª usa ${a + 2 * b}, e assim por diante. Quantos palitos terá a ${n}ª figura?`,
        r: v,
        d: [a * n, b * n, v + b, v - 1, a + b * n],
        x: expl('progressão aritmética (aₙ = a₁ + (n − 1)·r)', `Cada figura nova acrescenta ${b} palitos.`, `aₙ = ${a} + (${n} − 1) × ${b} = ${v}.`),
      };
    },
  ],
  [
    (r) => {
      const n = r.int(100, 999);
      const v = 9 + 180 + 3 * (n - 99);
      return {
        e: `Quantos algarismos são usados para numerar as páginas de um livro da página 1 até a página ${n}?`,
        r: v,
        d: [3 * n, v - 9, v + 3, 2 * n + 9, v - 90],
        x: expl('separar por quantidade de algarismos', 'Páginas 1 a 9 usam 1 algarismo cada; 10 a 99, 2 algarismos; de 100 em diante, 3.', `9 × 1 + 90 × 2 + ${n - 99} × 3 = 9 + 180 + ${3 * (n - 99)} = ${v}.`),
      };
    },
    (r) => {
      const tipo = r.pick(['fat', 'cubo', 'dobro-1', 'alterna']);
      let seq, prox, regra;
      if (tipo === 'fat') {
        const a = r.int(1, 3);
        seq = [a];
        for (let k = 2; seq.length < 5; k++) seq.push(seq.at(-1) * k);
        prox = seq.at(-1) * 6;
        regra = 'multiplica-se por 2, depois por 3, por 4, por 5...';
      } else if (tipo === 'cubo') {
        const k = r.int(0, 3);
        seq = [1, 2, 3, 4, 5].map((i) => i ** 3 + k);
        prox = 6 ** 3 + k;
        regra = k ? `cubos perfeitos mais ${k} (1³ + ${k}, 2³ + ${k}, ...)` : 'cubos perfeitos (1³, 2³, 3³, ...)';
      } else if (tipo === 'dobro-1') {
        const a = r.int(2, 6);
        seq = [a];
        while (seq.length < 5) seq.push(seq.at(-1) * 2 - 1);
        prox = seq.at(-1) * 2 - 1;
        regra = 'cada termo é o dobro do anterior menos 1';
      } else {
        const a = r.int(1, 5), s = r.int(2, 5);
        seq = [a];
        while (seq.length < 6) seq.push(seq.length % 2 ? seq.at(-1) + s : seq.at(-1) * 2);
        prox = seq.length % 2 ? seq.at(-1) + s : seq.at(-1) * 2;
        regra = `soma-se ${s} e multiplica-se por 2, alternadamente`;
      }
      return {
        e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
        r: prox,
        d: [prox + 1, prox - 1, seq.at(-1) * 2, seq.at(-1) + (seq.at(-1) - seq.at(-2)), prox + 2],
        x: expl('testar regras simples (somar, multiplicar, potências)', 'Se as diferenças não se repetem, teste razões, potências ou duas operações alternadas.', `Regra: ${regra}. Próximo termo: ${prox}.`),
      };
    },
    (r) => {
      const atr = r.pick([2, 3, 4, 5]), h0 = r.int(6, 10), t = r.int(3, 8);
      const adiant = r() < 0.5;
      const fmt = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}h${String(min % 60).padStart(2, '0')}`;
      const real = (h0 + t) * 60;
      const certo = real + (adiant ? 1 : -1) * atr * t;
      return {
        e: `Um relógio ${adiant ? 'adianta' : 'atrasa'} ${atr} minutos a cada hora. Ele foi acertado às ${String(h0).padStart(2, '0')}h00. Que horário ele marcará quando forem, na verdade, ${String(h0 + t).padStart(2, '0')}h00?`,
        r: fmt(certo),
        d: [fmt(real - (adiant ? 1 : -1) * atr * t), fmt(real + (adiant ? 1 : -1) * atr * (t - 1)), fmt(real + (adiant ? 1 : -1) * atr * (t + 1)), fmt(real), fmt(real + (adiant ? 1 : -1) * atr)],
        x: expl('erro por hora × número de horas', `Em ${t} horas, o erro acumulado é ${t} × ${atr} = ${t * atr} minutos ${adiant ? 'a mais' : 'a menos'}.`, `${String(h0 + t).padStart(2, '0')}h00 ${adiant ? '+' : '−'} ${t * atr} min = ${fmt(certo)}.`),
      };
    },
  ],
  [
    (r) => {
      const [A, B] = r.sample(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Fábio'], 2);
      const falas = [
        (s, o) => ({ t: `${o} sempre mente.`, f: (T) => !T[o] }),
        (s, o) => ({ t: `${o} sempre diz a verdade.`, f: (T) => T[o] }),
        () => ({ t: 'Nós dois somos mentirosos.', f: (T) => !T[A] && !T[B] }),
        () => ({ t: 'Pelo menos um de nós é mentiroso.', f: (T) => !T[A] || !T[B] }),
        () => ({ t: 'Somos do mesmo tipo.', f: (T) => T[A] === T[B] }),
        () => ({ t: 'Somos de tipos diferentes.', f: (T) => T[A] !== T[B] }),
      ];
      const ops = [[true, true], [true, false], [false, true], [false, false]];
      for (let t = 0; t < 100; t++) {
        const fa = r.pick(falas)(A, B), fb = r.pick(falas)(B, A);
        const quem = r() < 0.5 ? 'ambos' : 'A';
        const sols = ops.filter(([ta, tb]) => {
          const T = { [A]: ta, [B]: tb };
          return fa.f(T) === ta && (quem === 'A' || fb.f(T) === tb);
        });
        if (sols.length !== 1) continue;
        const [ta, tb] = sols[0];
        const desc = (a, b) => `${A} ${a ? 'diz a verdade' : 'mente'} e ${B} ${b ? 'diz a verdade' : 'mente'}`;
        return {
          e: `Em uma ilha, cada habitante ou sempre diz a verdade ou sempre mente. ${A} e ${B} moram nessa ilha. ${A} diz: "${fa.t}"${quem === 'ambos' ? ` ${B} diz: "${fb.t}"` : ''} Então:`,
          r: desc(ta, tb),
          d: [...ops.filter((o) => o[0] !== ta || o[1] !== tb).map((o) => desc(o[0], o[1])), 'Não é possível determinar'],
          x: expl('testar hipóteses', `Suponha um caso (por exemplo, que ${A} diz a verdade) e veja se as falas ficam coerentes. Hipótese que gera contradição é descartada.`, `Dos 4 casos possíveis, só "${desc(ta, tb)}" deixa todas as falas coerentes.`),
        };
      }
      throw new Error('sem solução única');
    },
    (r) => {
      const nomesL = r.sample(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Fábio', 'Gabi'], 5);
      const pistas = [];
      for (let i = 0; i < 4; i++) {
        const [x, y] = [nomesL[i], nomesL[i + 1]];
        pistas.push(r() < 0.5 ? `${x} chegou imediatamente antes de ${y}.` : `${y} chegou imediatamente depois de ${x}.`);
      }
      const k = r.int(2, 4);
      return {
        e: `Cinco amigos — ${r.shuffle([...nomesL]).join(', ')} — disputaram uma corrida, sem empates. Sabe-se que: ${r.shuffle(pistas).join(' ')} Quem chegou em ${k}º lugar?`,
        r: nomesL[k - 1],
        d: [...nomesL.filter((_, i) => i !== k - 1), 'Não é possível determinar'],
        x: expl('montar uma fila com as pistas', 'Junte as pistas como peças de dominó: cada uma liga dois vizinhos. Comece por quem não chega "depois" de ninguém.', `Ordem: ${nomesL.join(' → ')}. ${k}º lugar: ${nomesL[k - 1]}.`),
      };
    },
    (r) => {
      const cores = ['vermelhas', 'azuis', 'verdes'];
      const c = [r.int(3, 9), r.int(3, 9), r.int(3, 9)];
      const total = c[0] + c[1] + c[2];
      const tipo = r.pick(['k', 'todas']);
      if (tipo === 'todas') {
        const v = total - Math.min(...c) + 1;
        return {
          e: `Uma caixa tem ${c[0]} bolas vermelhas, ${c[1]} azuis e ${c[2]} verdes. Retirando bolas no escuro, quantas, no mínimo, devem ser retiradas para garantir pelo menos uma bola de cada cor?`,
          r: v,
          d: [3, 4, total - Math.max(...c) + 1, Math.max(...c) + 1, v - 1],
          x: expl('pensar no pior caso (azar total)', 'No pior caso, você tira primeiro TODAS as bolas das duas cores mais numerosas.', `${total - Math.min(...c)} bolas sem a cor mais rara; a próxima garante as três cores: ${v}.`),
        };
      }
      const k = r.int(3, Math.max(...c));
      const v = c.reduce((s, x) => s + Math.min(x, k - 1), 0) + 1;
      return {
        e: `Uma caixa tem ${c[0]} bolas vermelhas, ${c[1]} azuis e ${c[2]} verdes. Retirando bolas no escuro, quantas, no mínimo, devem ser retiradas para garantir ${k} bolas de uma mesma cor?`,
        r: v,
        d: [3 * (k - 1) + 1, k, 3 * k, v - 1, k + 3],
        x: expl('princípio da casa dos pombos (pior caso)', `No pior caso, você tira o máximo possível sem chegar a ${k} de nenhuma cor: até ${k - 1} de cada (ou todas, se a cor tiver menos).`, `${c.map((x) => Math.min(x, k - 1)).join(' + ')} = ${v - 1}; mais 1 bola garante: ${v}.`),
      };
    },
  ],
];

// ======================================================= Conjuntos
const conjuntos = [
  [
    (r) => {
      const [x, cls, pq] = r.pick([
        ['7', 'N', '7 é natural.'],
        ['√9', 'N', '√9 = 3, que é natural.'],
        ['−4', 'Z', '−4 é inteiro negativo: está em ℤ, mas não em ℕ.'],
        ['−√16', 'Z', '−√16 = −4, inteiro negativo.'],
        ['−14/7', 'Z', '−14/7 = −2, inteiro negativo.'],
        ['0,25', 'Q', '0,25 = 1/4, fração que não é inteira.'],
        ['2/3', 'Q', '2/3 é fração não inteira.'],
        ['0,333...', 'Q', '0,333... = 1/3 (dízima periódica é racional).'],
        ['−1,5', 'Q', '−1,5 = −3/2, fração não inteira.'],
        ['√2', 'I', '√2 não pode ser escrito como fração: é irracional.'],
        ['π', 'I', 'π tem infinitas casas decimais sem repetição: é irracional.'],
        ['√5', 'I', '5 não é quadrado perfeito, então √5 é irracional.'],
        ['√−4', 'C', 'Não existe número real que, ao quadrado, dê −4.'],
      ]);
      const ROT = { N: 'Natural (ℕ)', Z: 'Inteiro, mas não natural', Q: 'Racional, mas não inteiro', I: 'Irracional', C: 'Não é um número real' };
      return {
        e: `Como se classifica o número ${x}, considerando o menor conjunto numérico ao qual ele pertence?`,
        r: ROT[cls],
        d: Object.keys(ROT).filter((k) => k !== cls).map((k) => ROT[k]),
        x: expl('conjuntos numéricos (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ)', 'Primeiro simplifique o número (calcule raízes e frações); depois veja se é natural, inteiro, fração ou se não pode virar fração (irracional).', pq),
      };
    },
    (r) => {
      const U = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const [desc, f] = r.pick([
        ['x é par', (x) => x % 2 === 0],
        ['x é primo', (x) => [2, 3, 5, 7].includes(x)],
        ['x é múltiplo de 3', (x) => x % 3 === 0],
        ['x > 6', (x) => x > 6],
        ['x é divisor de 12', (x) => 12 % x === 0],
        ['x é ímpar e menor que 8', (x) => x % 2 === 1 && x < 8],
      ]);
      const A = U.filter(f), C = U.filter((x) => !f(x));
      return {
        e: `Sendo U = {1, 2, 3, ..., 10} o conjunto universo e A = {x ∈ U | ${desc}}, qual é o complementar de A em relação a U?`,
        r: fmtConj(C),
        d: [fmtConj(A), fmtConj(C.slice(1)), fmtConj([...C, A[0]].sort((a, b) => a - b)), fmtConj(U), fmtConj(C.slice(0, -1))],
        x: expl('complementar = o que falta para completar o universo', 'Liste A primeiro e depois pegue os elementos de U que não estão em A.', `A = ${fmtConj(A)}; A' = ${fmtConj(C)}.`),
      };
    },
    (r) => {
      const sa = r.int(10, 40), sb = r.int(10, 40), ab = r.int(3, 15), z = r.int(2, 12);
      const pede = r.pick(['total', 'jornal']);
      const [ja, jb] = r.pick([['só o jornal', 'só a revista'], ['só futebol', 'só vôlei'], ['só o app', 'só o site']]);
      const v = pede === 'total' ? sa + sb + ab + z : sa + ab;
      return {
        e: `Em uma pesquisa, ${sa} pessoas usam ${ja.slice(3)} apenas, ${sb} usam ${jb.slice(3)} apenas, ${ab} usam os dois e ${z} não usam nenhum. ${pede === 'total' ? 'Quantas pessoas foram entrevistadas?' : `Quantas pessoas usam ${ja.slice(3)} (com ou sem o outro)?`}`,
        r: v,
        d: pede === 'total' ? [sa + sb + z, sa + sb + ab, sa + sb + 2 * ab + z, v - z, v + ab] : [sa, sa + ab + sb, sa - ab, ab, sa + ab + z],
        x: expl('diagrama de Venn: cada região conta uma vez', '"Apenas" é a parte só de um conjunto; "os dois" é a interseção. Some as regiões, sem repetir.', pede === 'total' ? `${sa} + ${sb} + ${ab} + ${z} = ${v}.` : `Apenas + os dois: ${sa} + ${ab} = ${v}.`),
      };
    },
  ],
  [
    (r) => {
      const [a, b] = r.pick([[2, 3], [2, 5], [3, 5], [3, 4], [4, 6], [2, 7], [5, 6]]);
      const N = r.pick([60, 100, 120, 150, 200]);
      const m = mmc(a, b);
      const v = Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / m);
      return {
        e: `Quantos números inteiros de 1 a ${N} são múltiplos de ${a} ou de ${b}?`,
        r: v,
        d: [Math.floor(N / a) + Math.floor(N / b), N - v, Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / (a * b)), Math.floor(N / m), v + 1],
        x: expl('n(A ∪ B) = n(A) + n(B) − n(A ∩ B)', `Os múltiplos dos dois ao mesmo tempo são os múltiplos do MMC(${a}, ${b}) = ${m}; eles foram contados duas vezes.`, `${Math.floor(N / a)} + ${Math.floor(N / b)} − ${Math.floor(N / m)} = ${v}.`),
      };
    },
    (r) => {
      const T = r.pick([200, 400, 500, 800, 1000]);
      let A, B, AB;
      do {
        A = r.int(8, 14) * 5;
        B = r.int(6, 12) * 5;
        AB = r.int(1, 6) * 5;
      } while (A + B - AB > 95 || AB >= Math.min(A, B));
      const nen = 100 - (A + B - AB);
      return {
        e: `Em uma pesquisa com ${num(T)} pessoas, ${A}% usam cartão de crédito, ${B}% usam Pix para compras e ${AB}% usam os dois. Quantas pessoas não usam nenhum dos dois?`,
        r: (T * nen) / 100,
        d: [(T * (100 - A - B)) / 100, (T * AB) / 100, (T * (A + B - AB)) / 100, (T * (nen + AB)) / 100],
        x: expl('união em porcentagem, depois porcentagem do total', `Usam pelo menos um: ${A}% + ${B}% − ${AB}% = ${A + B - AB}%. Não usam nenhum: ${nen}%.`, `${nen}% de ${num(T)} = ${num((T * nen) / 100)} pessoas.`),
      };
    },
    (r) => {
      const A = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5).sort((x, y) => x - y);
      const B = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4).sort((x, y) => x - y);
      const C = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4).sort((x, y) => x - y);
      const uni = (x, y) => [...new Set([...x, ...y])].sort((a, b) => a - b);
      const int = (x, y) => x.filter((v) => y.includes(v));
      const dif = (x, y) => x.filter((v) => !y.includes(v));
      const [txt, res, passo] = r.pick([
        ['(A ∩ B) ∪ C', uni(int(A, B), C), `A ∩ B = ${fmtConj(int(A, B))}`],
        ['(A − B) ∩ C', int(dif(A, B), C), `A − B = ${fmtConj(dif(A, B))}`],
        ['(A ∪ B) − C', dif(uni(A, B), C), `A ∪ B = ${fmtConj(uni(A, B))}`],
        ['A ∩ (B ∪ C)', int(A, uni(B, C)), `B ∪ C = ${fmtConj(uni(B, C))}`],
      ]);
      return {
        e: `Sejam A = ${fmtConj(A)}, B = ${fmtConj(B)} e C = ${fmtConj(C)}. Qual é o conjunto ${txt}?`,
        r: fmtConj(res),
        d: [fmtConj(uni(A, B)), fmtConj(int(A, B)), fmtConj(int(A, C)), fmtConj(dif(A, C)), fmtConj(uni(int(A, C), B)), fmtConj(dif(C, A)), fmtConj(int(B, C))],
        x: expl('resolver primeiro o parêntese', 'Como numa expressão numérica: o que está entre parênteses vem primeiro.', `${passo}; então ${txt} = ${fmtConj(res)}.`),
      };
    },
  ],
  [
    (r) => {
      const ABC = r.int(2, 6), AB = ABC + r.int(3, 10), AC = ABC + r.int(3, 10), BC = ABC + r.int(3, 10);
      const v = AB + AC + BC - 3 * ABC;
      return {
        e: `Em uma pesquisa sobre três plataformas de estudo (A, B e C), ${AB} pessoas usam A e B, ${AC} usam A e C, ${BC} usam B e C, e ${ABC} usam as três. (Cada número de pares inclui quem usa as três.) Quantas pessoas usam exatamente duas plataformas?`,
        r: v,
        d: [AB + AC + BC, AB + AC + BC - ABC, AB + AC + BC - 2 * ABC, v + ABC * 4, ABC],
        x: expl('separar as regiões do diagrama', 'Cada interseção de dois conjuntos contém também quem está nos três; por isso tire as três de cada par.', `(${AB} − ${ABC}) + (${AC} − ${ABC}) + (${BC} − ${ABC}) = ${v}.`),
      };
    },
    (r) => {
      const N = r.pick([30, 60, 90, 100, 120, 150]);
      const f = (d) => Math.floor(N / d);
      const uniao = f(2) + f(3) + f(5) - f(6) - f(10) - f(15) + f(30);
      const v = N - uniao;
      return {
        e: `Quantos números inteiros de 1 a ${N} NÃO são divisíveis por 2, nem por 3, nem por 5?`,
        r: v,
        d: [N - (f(2) + f(3) + f(5)), N - (f(2) + f(3) + f(5) - f(6) - f(10) - f(15)), uniao, v + f(30), v - 1],
        x: expl('princípio da inclusão-exclusão (3 conjuntos)', 'Conte os divisíveis por pelo menos um: some os simples, tire os pares (6, 10, 15) e devolva o triplo (30). Depois use o complementar.', `${f(2)} + ${f(3)} + ${f(5)} − ${f(6)} − ${f(10)} − ${f(15)} + ${f(30)} = ${uniao}. Não divisíveis: ${N} − ${uniao} = ${v}.`),
      };
    },
    (r) => {
      for (;;) {
        const T = r.pick([50, 60, 80, 100]), z = r.int(3, 12), a = r.int(15, 45), b = r.int(15, 45);
        const ab = a + b - (T - z);
        if (ab < 2 || ab >= Math.min(a, b) - 1) continue;
        const v = a + b - 2 * ab;
        return {
          e: `Em um grupo de ${T} pessoas, ${a} falam inglês, ${b} falam espanhol e ${z} não falam nenhuma dessas línguas. Quantas pessoas falam EXATAMENTE uma das duas línguas?`,
          r: v,
          d: [T - z, ab, a + b - ab, a + b, v + ab],
          x: expl('achar a interseção pelo total e depois tirar duas vezes', `Falam pelo menos uma: ${T} − ${z} = ${T - z}; então os dois: ${a} + ${b} − ${T - z} = ${ab}.`, `Exatamente uma: (${a} − ${ab}) + (${b} − ${ab}) = ${v}.`),
        };
      }
    },
  ],
];

export default { proposicoes, negacoes, sequencias, conjuntos };
