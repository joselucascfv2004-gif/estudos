// Raciocínio lógico (concursos: Banco do Brasil, BNB, Caixa, IBGE...).
import { comNovos, fracao, nome, num, prepararAntigos } from './util.mjs';
import NOVOS from './logica-novos-extras.mjs';
import EXTRAS from './logica-extras.mjs';

const PROVAS = ['Concursos', 'Militares'];
const VF = (v) => (v ? 'Verdadeira' : 'Falsa');

// ------------------------------------------------- expressões lógicas
const OPS = {
  e: { s: '∧', f: (a, b) => a && b },
  ou: { s: '∨', f: (a, b) => a || b },
  se: { s: '→', f: (a, b) => !a || b },
  sse: { s: '↔', f: (a, b) => a === b },
};
function gerarExpr(r, vars, prof) {
  if (prof === 0 || r() < 0.25) {
    const v = r.pick(vars);
    return r() < 0.3 ? { neg: true, v } : { v };
  }
  const op = r.pick(Object.keys(OPS));
  const a = gerarExpr(r, vars, prof - 1);
  let b = gerarExpr(r, vars, prof - 1);
  // evita "q ∧ q", "~r ∨ r" e partes repetidas
  for (let t = 0; t < 20 && (b.v ? b.v === a.v : texto(b) === texto(a)); t++) b = gerarExpr(r, vars, prof - 1);
  const e = { op, a, b };
  return r() < 0.2 ? { neg: true, e } : e;
}
function avaliar(e, val) {
  if (e.v) return e.neg ? !val[e.v] : val[e.v];
  if (e.e) return !avaliar(e.e, val);
  return OPS[e.op].f(avaliar(e.a, val), avaliar(e.b, val));
}
function texto(e, topo = true) {
  if (e.v) return (e.neg ? '~' : '') + e.v;
  if (e.e) return `~(${texto(e.e, true)})`;
  const s = `${texto(e.a, false)} ${OPS[e.op].s} ${texto(e.b, false)}`;
  return topo ? s : `(${s})`;
}
const varsDe = (e, s = new Set()) => {
  if (e.v) s.add(e.v);
  else if (e.e) varsDe(e.e, s);
  else {
    varsDe(e.a, s);
    varsDe(e.b, s);
  }
  return s;
};
function linhas(vars) {
  const out = [];
  for (let m = 0; m < 2 ** vars.length; m++) {
    const val = {};
    vars.forEach((v, i) => (val[v] = !!(m & (1 << (vars.length - 1 - i)))));
    out.push(val);
  }
  return out;
}

// ------------------------------------------------- frases
const SIMPLES = [
  ['João estuda', 'João não estuda'],
  ['Maria viaja', 'Maria não viaja'],
  ['o banco abre', 'o banco não abre'],
  ['chove', 'não chove'],
  ['o candidato é aprovado', 'o candidato não é aprovado'],
  ['a taxa de juros sobe', 'a taxa de juros não sobe'],
  ['Pedro é economista', 'Pedro não é economista'],
  ['o relatório foi entregue', 'o relatório não foi entregue'],
  ['faz sol', 'não faz sol'],
  ['o cliente paga em dia', 'o cliente não paga em dia'],
  ['Ana trabalha no IBGE', 'Ana não trabalha no IBGE'],
  ['o sistema está disponível', 'o sistema não está disponível'],
  ['Carlos pratica esportes', 'Carlos não pratica esportes'],
  ['a meta foi atingida', 'a meta não foi atingida'],
  ['Lucas é bancário', 'Lucas não é bancário'],
  ['o recenseador visita a casa', 'o recenseador não visita a casa'],
];
const QUANT = [
  ['servidor público', 'é pontual', 'não é pontual'],
  ['bancário', 'gosta de matemática', 'não gosta de matemática'],
  ['estudante', 'é dedicado', 'não é dedicado'],
  ['candidato', 'leu o edital', 'não leu o edital'],
  ['gerente', 'é organizado', 'não é organizado'],
  ['atleta', 'treina diariamente', 'não treina diariamente'],
  ['médico', 'é cuidadoso', 'não é cuidadoso'],
  ['recenseador', 'usa colete', 'não usa colete'],
  ['cliente', 'tem cartão de crédito', 'não tem cartão de crédito'],
  ['professor', 'corrige provas', 'não corrige provas'],
];
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const dois = (r) => {
  const [a, b] = r.sample(SIMPLES, 2);
  return { p: a[0], np: a[1], q: b[0], nq: b[1] };
};

// ======================================================= Proposições e tabela-verdade
const proposicoes = {
  disciplina: 'raciocinio-logico',
  arquivo: '01-proposicoes-e-tabela-verdade',
  titulo: 'Proposições, conectivos e tabela-verdade',
  provas: PROVAS,
  descricao: 'Proposições simples e compostas, conectivos (e, ou, se...então, se e somente se), valor lógico e tabelas-verdade.',
  niveis: [
    [
      Object.assign(
        (r) => {
          const val = { p: r() < 0.5, q: r() < 0.5 };
          const op = r.pick(Object.keys(OPS));
          const e = { op, a: { v: 'p' }, b: { v: 'q' } };
          const v = avaliar(e, val);
          const nomes = { e: 'conjunção', ou: 'disjunção', se: 'condicional', sse: 'bicondicional' };
          const regra = { e: 'só é verdadeira se ambas forem verdadeiras', ou: 'só é falsa se ambas forem falsas', se: 'só é falsa quando o antecedente é V e o consequente é F', sse: 'é verdadeira quando ambas têm o mesmo valor' };
          return {
            e: `Sabendo que p é ${VF(val.p).toLowerCase()} e q é ${VF(val.q).toLowerCase()}, qual é o valor lógico de ${texto(e)}?`,
            r: VF(v),
            d: [VF(!v)],
            x: `A ${nomes[op]} (${OPS[op].s}) ${regra[op]}. Com p = ${val.p ? 'V' : 'F'} e q = ${val.q ? 'V' : 'F'}, o resultado é ${v ? 'V' : 'F'}.`,
          };
        },
        { alternativas: 2 },
      ),
      (r) => {
        const n = r.int(2, 6);
        return {
          e: `Quantas linhas tem a tabela-verdade de uma proposição composta formada por ${n} proposições simples distintas?`,
          r: 2 ** n,
          d: [2 * n, n * n, 2 ** (n + 1), n + 2],
          x: `Cada proposição simples tem 2 valores possíveis: 2^${n} = ${2 ** n} linhas.`,
        };
      },
      (r) => {
        const sim = r.pick(['Brasília é a capital do Brasil.', 'O número 7 é primo.', '2 + 2 = 5.', 'O IBGE realiza o censo demográfico.', 'Todo número par é divisível por 2.', 'A Lua é maior que a Terra.', 'O Banco Central foi criado em 1964.']);
        const nao = ['Que dia lindo!', 'Feche a porta, por favor.', 'Você vai ao concurso amanhã?', 'x + 3 = 10.', 'Ele é muito inteligente.', 'Estude todos os dias!', 'Quantos anos você tem?', 'Esta frase é falsa.'];
        return {
          e: `Qual das sentenças abaixo é uma proposição (sentença declarativa à qual se pode atribuir um único valor lógico, V ou F)?`,
          r: sim,
          d: r.sample(nao, 4),
          x: `"${sim}" é declarativa e tem valor lógico definido (pode ser V ou F). Exclamações, ordens, perguntas, sentenças abertas (com variável ou sujeito indeterminado como "ele") e paradoxos não são proposições.`,
        };
      },
      (r) => {
        const { p, q } = dois(r);
        const [frase, con] = r.pick([
          [`Se ${p}, então ${q}.`, 'Condicional (→)'],
          [`${cap(p)} e ${q}.`, 'Conjunção (∧)'],
          [`${cap(p)} ou ${q}.`, 'Disjunção inclusiva (∨)'],
          [`${cap(p)} se, e somente se, ${q}.`, 'Bicondicional (↔)'],
          [`Ou ${p}, ou ${q}, mas não ambos.`, 'Disjunção exclusiva (⊻)'],
        ]);
        return {
          e: `Qual é o conectivo principal da proposição: "${frase}"?`,
          r: con,
          d: ['Condicional (→)', 'Conjunção (∧)', 'Disjunção inclusiva (∨)', 'Bicondicional (↔)', 'Disjunção exclusiva (⊻)', 'Negação (~)'].filter((c) => c !== con),
          x: `"Se..., então" é condicional; "e" é conjunção; "ou" é disjunção inclusiva; "se, e somente se" é bicondicional; "ou..., ou..., mas não ambos" é disjunção exclusiva.`,
        };
      },
      Object.assign(
        (r) => {
          const { p, q } = dois(r);
          const pV = r() < 0.5, qV = r() < 0.5;
          const frase = `Se ${p}, então ${q}`;
          const v = !pV || qV;
          return {
            e: `Considere a proposição: "${frase}". Sabendo que "${p}" é ${VF(pV).toLowerCase()} e que "${q}" é ${VF(qV).toLowerCase()}, a proposição é:`,
            r: VF(v),
            d: [VF(!v)],
            x: `A condicional só é falsa quando o antecedente é verdadeiro e o consequente é falso (V → F). Aqui temos ${pV ? 'V' : 'F'} → ${qV ? 'V' : 'F'}, logo ${v ? 'verdadeira' : 'falsa'}.`,
          };
        },
        { alternativas: 2 },
      ),
    ],
    [
      Object.assign(
        (r) => {
          const vars = ['p', 'q', 'r'];
          const e = gerarExpr(r, vars, 2);
          if (varsDe(e).size < 2 || !e.op) return proposicoes.niveis[1][0](r);
          const val = { p: r() < 0.5, q: r() < 0.5, r: r() < 0.5 };
          const usadas = [...varsDe(e)].sort();
          const v = avaliar(e, val);
          return {
            e: `Sendo ${usadas.map((x) => `${x} ${val[x] ? 'verdadeira' : 'falsa'}`).join(', ')}, qual é o valor lógico da proposição ${texto(e)}?`,
            r: VF(v),
            d: [VF(!v)],
            x: `Substituindo os valores (${usadas.map((x) => `${x} = ${val[x] ? 'V' : 'F'}`).join(', ')}) e resolvendo primeiro os parênteses e as negações, o resultado é ${v ? 'V' : 'F'}.`,
          };
        },
        { alternativas: 2 },
      ),
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `Sabe-se que a proposição "Se ${p}, então ${q}" é FALSA. Então, é correto concluir que:`,
          r: `${cap(p)} e ${nq}.`,
          d: [`${cap(np)} e ${q}.`, `${cap(np)} e ${nq}.`, `${cap(p)} e ${q}.`, `${cap(np)} ou ${q}.`],
          x: `Uma condicional só é falsa quando o antecedente é V e o consequente é F. Logo "${p}" é verdadeira e "${q}" é falsa: ${p} e ${nq}.`,
        };
      },
      (r) => {
        const tauts = ['p ∨ ~p', 'p → p', '(p ∧ q) → p', 'p → (p ∨ q)', '~(p ∧ ~p)', '(p ↔ q) ∨ (p ↔ ~q)'];
        const outras = ['p ∧ ~p', 'p → q', 'p ∨ q', 'p ∧ q', '(p ∨ q) → p', 'p ↔ ~p', '~p → q', 'p → (p ∧ q)'];
        const t = r.pick(tauts);
        return {
          e: `Qual das proposições abaixo é uma tautologia (verdadeira em todas as linhas da tabela-verdade)?`,
          r: t,
          d: r.sample(outras, 4),
          x: `${t} é verdadeira para qualquer valor de p e q. As demais são contingências (podem ser V ou F) ou contradições (sempre F, como p ∧ ~p).`,
        };
      },
      (r) => {
        const e = gerarExpr(r, ['p', 'q'], 2);
        if (!e.op || varsDe(e).size < 2) return proposicoes.niveis[1][3](r);
        const ls = linhas(['p', 'q']);
        const nv = ls.filter((l) => avaliar(e, l)).length;
        return {
          e: `Na tabela-verdade da proposição ${texto(e)}, em quantas linhas ela é verdadeira?`,
          r: nv,
          d: [0, 1, 2, 3, 4].filter((x) => x !== nv),
          x: `Montando as 4 linhas (VV, VF, FV, FF) para (p, q), a proposição é V em ${nv} delas.`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        const caso = r.pick(['e', 'ou']);
        if (caso === 'e') {
          return {
            e: `Sabendo que a proposição "${cap(p)} e ${q}" é VERDADEIRA, é correto afirmar que:`,
            r: `"${cap(p)}" é verdadeira e "${q}" é verdadeira.`,
            d: [`"${cap(p)}" pode ser falsa.`, `"${cap(nq)}" é verdadeira.`, `"${cap(np)} ou ${nq}" é verdadeira.`, `"Se ${p}, então ${nq}" é verdadeira.`],
            x: `Uma conjunção só é verdadeira quando as duas partes são verdadeiras.`,
          };
        }
        return {
          e: `Sabendo que a proposição "${cap(p)} ou ${q}" é FALSA, é correto afirmar que:`,
          r: `"${cap(np)}" e "${nq}" são ambas verdadeiras.`,
          d: [`"${cap(p)}" é verdadeira.`, `"${cap(q)}" é verdadeira.`, `"${cap(p)} e ${q}" é verdadeira.`, `Não é possível saber o valor de "${p}".`],
          x: `Uma disjunção inclusiva só é falsa quando as duas partes são falsas; logo as negações de ambas são verdadeiras.`,
        };
      },
    ],
    [
      (r) => {
        const pessoa = nome(r);
        const [acao, res, nacao, nres] = r.pick([
          ['estuda', 'passa na prova', 'não estuda', 'não passa na prova'],
          ['economiza', 'viaja nas férias', 'não economiza', 'não viaja nas férias'],
          ['treina', 'vence a corrida', 'não treina', 'não vence a corrida'],
          ['chega cedo', 'pega o ônibus', 'não chega cedo', 'não pega o ônibus'],
        ]);
        const tipo = r.pick(['tollens', 'ponens']);
        if (tipo === 'tollens')
          return {
            e: `Considere as premissas: "Se ${pessoa} ${acao}, então ${pessoa} ${res}" e "${pessoa} ${nres}". Uma conclusão válida é:`,
            r: `${pessoa} ${nacao}.`,
            d: [`${pessoa} ${acao}.`, `${pessoa} ${res}.`, `${pessoa} ${acao} e ${nres}.`, `Nada se pode concluir.`],
            x: `Modus tollens: de "p → q" e "~q", conclui-se "~p". Se a 1ª parte tivesse acontecido, a 2ª também aconteceria; como a 2ª não aconteceu, ${pessoa} ${nacao}.`,
          };
        return {
          e: `Considere as premissas: "Se ${pessoa} ${acao}, então ${pessoa} ${res}" e "${pessoa} ${acao}". Uma conclusão válida é:`,
          r: `${pessoa} ${res}.`,
          d: [`${pessoa} ${nres}.`, `${pessoa} ${nacao}.`, `${pessoa} ${res} somente se ${nacao}.`, `Nada se pode concluir.`],
          x: `Modus ponens: de "p → q" e "p", conclui-se "q".`,
        };
      },
      (r) => {
        const vars = ['p', 'q', 'r'];
        const e = gerarExpr(r, vars, 2);
        if (!e.op || varsDe(e).size < 3) return proposicoes.niveis[2][1](r);
        const ls = linhas(vars);
        const nv = ls.filter((l) => avaliar(e, l)).length;
        return {
          e: `Quantas linhas da tabela-verdade da proposição ${texto(e)} têm valor lógico VERDADEIRO?`,
          r: nv,
          d: [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((x) => x !== nv).sort((a, b) => Math.abs(a - nv) - Math.abs(b - nv)).slice(0, 4),
          x: `Com 3 proposições há 8 linhas. Avaliando a expressão em cada uma, ela é V em ${nv} linhas.`,
        };
      },
      (r) => {
        const contrad = ['p ∧ ~p', '(p → q) ∧ (p ∧ ~q)', '~(p ∨ ~p)', '(p ↔ q) ∧ (p ↔ ~q)', 'p ↔ ~p'];
        const outras = ['p ∨ ~p', 'p → q', '(p ∧ q) → p', 'p ∧ q', '~p ∨ q', 'p → (q → p)', '(p ∨ q) ∧ ~p'];
        const c = r.pick(contrad);
        return {
          e: `Qual das proposições abaixo é uma contradição (falsa em todas as linhas da tabela-verdade)?`,
          r: c,
          d: r.sample(outras, 4),
          x: `${c} é falsa para quaisquer valores de p e q. Note que p → q equivale a ~p ∨ q, cuja negação é p ∧ ~q.`,
        };
      },
      Object.assign(
        (r) => {
          // dados: p → q é falsa (p = V, q = F); outras variáveis livres
          const alvo = gerarExpr(r, ['p', 'q', 'r', 's'], 2);
          if (!alvo.op) return proposicoes.niveis[2][3](r);
          const usadas = [...varsDe(alvo)];
          if (!usadas.includes('p') && !usadas.includes('q')) return proposicoes.niveis[2][3](r);
          const vals = new Set();
          for (const R of [true, false]) for (const S of [true, false]) vals.add(avaliar(alvo, { p: true, q: false, r: R, s: S }));
          if (vals.size !== 1) return proposicoes.niveis[2][3](r);
          const v = [...vals][0];
          return {
            e: `Sabendo que a proposição p → q é FALSA, qual é o valor lógico de ${texto(alvo)}, quaisquer que sejam os valores de r e s?`,
            r: VF(v),
            d: [VF(!v)],
            x: `Se p → q é falsa, então p = V e q = F. Substituindo, a expressão resulta em ${v ? 'V' : 'F'} independentemente de r e s.`,
          };
        },
        { alternativas: 2 },
      ),
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `Sabe-se que a proposição "${cap(p)} se, e somente se, ${q}" é VERDADEIRA e que "${p}" é FALSA. Então:`,
          r: `${cap(nq)}.`,
          d: [`${cap(q)}.`, `${cap(p)}.`, `${cap(np)} e ${q}.`, `Não é possível determinar o valor de "${q}".`],
          x: `A bicondicional é verdadeira quando as duas partes têm o mesmo valor. Como "${p}" é F, "${q}" também é F, ou seja: ${nq}.`,
        };
      },
    ],
  ],
};

// ======================================================= Equivalências e negações
const negacoes = {
  disciplina: 'raciocinio-logico',
  arquivo: '02-equivalencias-e-negacoes',
  titulo: 'Equivalências lógicas e negações',
  provas: PROVAS,
  descricao: 'Negação de conjunções, disjunções, condicionais e quantificadores; contrapositiva e outras equivalências (Leis de De Morgan).',
  niveis: [
    [
      (r) => {
        const [s, pr, npr] = r.pick(QUANT);
        return {
          e: `Qual é a negação da proposição "Todo ${s} ${pr}"?`,
          r: `Algum ${s} ${npr}.`,
          d: [`Nenhum ${s} ${pr}.`, `Todo ${s} ${npr}.`, `Algum ${s} ${pr}.`, `Nenhum ${s} ${npr}.`],
          x: `A negação de "todo A é B" é "algum A não é B" (basta um contraexemplo). "Nenhum A é B" é uma afirmação mais forte, não a negação.`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `Qual é a negação de "${cap(p)} e ${q}"?`,
          r: `${cap(np)} ou ${nq}.`,
          d: [`${cap(np)} e ${nq}.`, `${cap(p)} ou ${q}.`, `${cap(np)} e ${q}.`, `Se ${p}, então ${q}.`],
          x: `Lei de De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q. Nega-se cada parte e troca-se "e" por "ou".`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `Qual é a negação de "${cap(p)} ou ${q}"?`,
          r: `${cap(np)} e ${nq}.`,
          d: [`${cap(np)} ou ${nq}.`, `${cap(p)} e ${q}.`, `${cap(np)} ou ${q}.`, `Se ${np}, então ${q}.`],
          x: `Lei de De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. Nega-se cada parte e troca-se "ou" por "e".`,
        };
      },
      (r) => {
        const [s, pr, npr] = r.pick(QUANT);
        return {
          e: `Qual é a negação da proposição "Algum ${s} ${pr}"?`,
          r: `Nenhum ${s} ${pr}.`,
          d: [`Algum ${s} ${npr}.`, `Todo ${s} ${pr}.`, `Pelo menos um ${s} ${pr}.`, `Existe ${s} que ${pr}.`],
          x: `Negar "algum A é B" é dizer que não existe nenhum: "nenhum A é B" (equivalente a "todo A não é B").`,
        };
      },
      (r) => {
        const { p, np } = dois(r);
        return {
          e: `Qual é a negação de "Não é verdade que ${np}"?`,
          r: `${cap(np)}.`,
          d: [`${cap(p)}.`, `Não é verdade que ${p}.`, `Talvez ${np}.`, `É falso que ${np}.`],
          x: `"Não é verdade que X" já é a negação de X. Negando de novo, voltamos a X (dupla negação): ${np}.`,
        };
      },
    ],
    [
      (r) => {
        const { p, q, nq } = dois(r);
        return {
          e: `Qual é a negação da proposição "Se ${p}, então ${q}"?`,
          r: `${cap(p)} e ${nq}.`,
          d: [`Se ${p}, então ${nq}.`, `Se ${q}, então ${p}.`, `${cap(p)} ou ${nq}.`, `Se ${nq}, então ${p}.`],
          x: `~(p → q) ≡ p ∧ ~q: mantém-se o antecedente, troca-se "se...então" por "e" e nega-se o consequente ("MANÉ": MAntém E NEga).`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `Uma proposição logicamente equivalente a "Se ${p}, então ${q}" é:`,
          r: `Se ${nq}, então ${np}.`,
          d: [`Se ${q}, então ${p}.`, `Se ${np}, então ${nq}.`, `${cap(p)} e ${q}.`, `${cap(p)} ou ${nq}.`],
          x: `Contrapositiva: p → q ≡ ~q → ~p (inverte-se e negam-se as duas partes). A recíproca (q → p) e a inversa (~p → ~q) NÃO são equivalentes.`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `A proposição "Se ${p}, então ${q}" é logicamente equivalente a:`,
          r: `${cap(np)} ou ${q}.`,
          d: [`${cap(p)} ou ${nq}.`, `${cap(np)} e ${q}.`, `${cap(p)} e ${nq}.`, `${cap(p)} ou ${q}.`],
          x: `p → q ≡ ~p ∨ q ("NEYMAR": NEga a primeira, mantém a segunda, troca por OU).`,
        };
      },
      (r) => {
        const [s, pr, npr] = r.pick(QUANT);
        return {
          e: `Qual é a negação da proposição "Nenhum ${s} ${pr}"?`,
          r: `Algum ${s} ${pr}.`,
          d: [`Todo ${s} ${pr}.`, `Algum ${s} ${npr}.`, `Todo ${s} ${npr}.`, `Nenhum ${s} ${npr}.`],
          x: `"Nenhum A é B" é falsa assim que existe pelo menos um A que é B. Logo, a negação é "algum A é B".`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `A negação de "${cap(np)} e ${q}" é:`,
          r: `${cap(p)} ou ${nq}.`,
          d: [`${cap(p)} e ${nq}.`, `${cap(np)} ou ${q}.`, `Se ${p}, então ${q}.`, `${cap(p)} ou ${q}.`],
          x: `~(~p ∧ q) ≡ p ∨ ~q (De Morgan + dupla negação).`,
        };
      },
    ],
    [
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `Qual é a negação de "${cap(p)} se, e somente se, ${q}"?`,
          r: `Ou ${p}, ou ${q}, mas não ambos.`,
          d: [`${cap(np)} se, e somente se, ${nq}.`, `${cap(p)} e ${nq}.`, `Se ${p}, então ${nq}.`, `${cap(np)} e ${nq}.`],
          x: `~(p ↔ q) ≡ p ⊻ q, isto é, (p ∧ ~q) ∨ (~p ∧ q): exatamente uma delas é verdadeira. Note que ~p ↔ ~q é EQUIVALENTE a p ↔ q, não sua negação.`,
        };
      },
      (r) => {
        const [a, b, c] = r.sample(SIMPLES, 3);
        return {
          e: `Qual é a negação de "Se ${a[0]}, então ${b[0]} e ${c[0]}"?`,
          r: `${cap(a[0])} e (${b[1]} ou ${c[1]}).`,
          d: [`${cap(a[0])} e ${b[1]} e ${c[1]}.`, `Se ${a[1]}, então ${b[1]} ou ${c[1]}.`, `${cap(a[1])} ou ${b[0]} e ${c[0]}.`, `Se ${a[0]}, então ${b[1]} ou ${c[1]}.`],
          x: `~[p → (q ∧ r)] ≡ p ∧ ~(q ∧ r) ≡ p ∧ (~q ∨ ~r).`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `A proposição "Se ${np}, então ${q}" é logicamente equivalente a:`,
          r: `Se ${nq}, então ${p}.`,
          d: [`Se ${q}, então ${np}.`, `Se ${p}, então ${nq}.`, `${cap(np)} e ${nq}.`, `${cap(np)} ou ${q}.`],
          x: `Contrapositiva: (~p → q) ≡ (~q → ~~p) ≡ (~q → p). Também equivale a "p ou q".`,
        };
      },
      (r) => {
        const [s, pr, npr] = r.pick(QUANT);
        const { p, nq, q } = dois(r);
        void q;
        return {
          e: `Qual é a negação de "Todo ${s} ${pr} e ${p}"?`,
          r: `Algum ${s} ${npr} ou ${SIMPLES.find((x) => x[0] === p)[1]}.`,
          d: [`Nenhum ${s} ${pr} e ${SIMPLES.find((x) => x[0] === p)[1]}.`, `Algum ${s} ${npr} e ${SIMPLES.find((x) => x[0] === p)[1]}.`, `Todo ${s} ${npr} ou ${SIMPLES.find((x) => x[0] === p)[1]}.`, `Algum ${s} ${pr} ou ${nq}.`],
          x: `Negação da conjunção (De Morgan): nega-se cada parte e troca-se "e" por "ou". A negação de "todo A é B" é "algum A não é B".`,
        };
      },
      (r) => {
        const { p, q, np, nq } = dois(r);
        return {
          e: `"${cap(p)} ou ${q}" é logicamente equivalente a:`,
          r: `Se ${np}, então ${q}.`,
          d: [`Se ${p}, então ${q}.`, `Se ${np}, então ${nq}.`, `${cap(np)} e ${nq}.`, `Se ${q}, então ${p}.`],
          x: `p ∨ q ≡ ~p → q (se uma das partes falhar, a outra tem de ocorrer). Também ≡ ~q → p.`,
        };
      },
    ],
  ],
};

// ======================================================= Sequências e problemas
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const sequencias = {
  disciplina: 'raciocinio-logico',
  arquivo: '03-sequencias-e-problemas-de-logica',
  titulo: 'Sequências e problemas de lógica',
  provas: PROVAS,
  descricao: 'Sequências numéricas e de letras, padrões cíclicos, calendários, relógios e problemas de verdade e mentira.',
  niveis: [
    [
      (r) => {
        const tipo = r.pick(['quadrados', 'fib', 'dobro+1', 'alternada']);
        let seq, prox, regra;
        if (tipo === 'quadrados') {
          const k = r.int(1, 5);
          seq = [0, 1, 2, 3, 4].map((i) => (i + k) ** 2);
          prox = (5 + k) ** 2;
          regra = `quadrados perfeitos: ${k}², ${k + 1}², ...`;
        } else if (tipo === 'fib') {
          const a = r.int(1, 4), b = r.int(a, 6);
          seq = [a, b];
          while (seq.length < 6) seq.push(seq.at(-1) + seq.at(-2));
          prox = seq.at(-1) + seq.at(-2);
          regra = 'cada termo é a soma dos dois anteriores';
        } else if (tipo === 'dobro+1') {
          const a = r.int(1, 5);
          seq = [a];
          while (seq.length < 5) seq.push(seq.at(-1) * 2 + 1);
          prox = seq.at(-1) * 2 + 1;
          regra = 'cada termo é o dobro do anterior mais 1';
        } else {
          const a = r.int(2, 9), d1 = r.int(2, 5), d2 = r.int(1, 3);
          seq = [a];
          while (seq.length < 6) seq.push(seq.length % 2 ? seq.at(-1) + d1 : seq.at(-1) - d2);
          prox = seq.length % 2 ? seq.at(-1) + d1 : seq.at(-1) - d2;
          regra = `soma-se ${d1} e subtrai-se ${d2}, alternadamente`;
        }
        return {
          e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
          r: prox,
          d: [prox + 1, prox - 1, prox + 2, seq.at(-1) * 2 === prox ? prox + 3 : seq.at(-1) * 2],
          x: `Padrão: ${regra}. Próximo termo: ${prox}.`,
        };
      },
      (r) => {
        const ini = r.int(0, 10), passo = r.int(2, 4);
        const seq = [0, 1, 2, 3].map((i) => LETRAS[ini + i * passo]);
        const prox = LETRAS[ini + 4 * passo];
        const alts = [LETRAS[ini + 4 * passo + 1], LETRAS[ini + 4 * passo - 1], LETRAS[ini + 3 * passo + passo + 2], LETRAS[ini + 5 * passo]].filter(Boolean);
        return {
          e: `Considerando o alfabeto de 26 letras (A a Z), qual letra continua a sequência ${seq.join(', ')}, ...?`,
          r: prox,
          d: alts,
          x: `As letras avançam de ${passo} em ${passo} posições no alfabeto: depois de ${seq[3]} vem ${prox}.`,
        };
      },
      (r) => {
        const pad = r.pick(['ABC', 'ABCD', 'XYZW', 'AZUL', 'SOL', 'BRASIL'].map((s) => s));
        const n = r.int(30, 300);
        const letra = pad[(n - 1) % pad.length];
        return {
          e: `Na sequência ${pad.repeat(3)}... (o bloco "${pad}" se repete indefinidamente), qual é a ${n}ª letra?`,
          r: letra,
          d: [...new Set([...pad].filter((c) => c !== letra))].concat(['E', 'M', 'R', 'T']).slice(0, 4),
          x: `O bloco tem ${pad.length} letras. ${n} ÷ ${pad.length} deixa resto ${n % pad.length} — corresponde à ${(n - 1) % pad.length + 1}ª letra do bloco: ${letra}.`,
        };
      },
      (r) => {
        const h = r.int(2, 11), m = r.pick([0, 0, 30]);
        const ang = Math.abs(30 * h - 5.5 * m);
        const menor = Math.min(ang, 360 - ang);
        return {
          e: `Qual é o menor ângulo formado pelos ponteiros de um relógio às ${h}h${m ? String(m).padStart(2, '0') : ''}?`,
          r: menor,
          d: [360 - menor === menor ? menor + 30 : 360 - menor, menor + 15, Math.abs(menor - 15), 30 * h > 180 ? menor + 30 : 30 * h + 30],
          f: (v) => `${num(v)}°`,
          x: `Ângulo = |30·h − 5,5·m| = |30·${h} − 5,5·${m}| = ${num(ang)}°${ang > 180 ? `; o menor é 360° − ${num(ang)}° = ${num(menor)}°` : ''}.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.int(1, 5), d1 = r.int(1, 3), inc = r.int(1, 2);
        const seq = [a];
        let d = d1;
        while (seq.length < 6) {
          seq.push(seq.at(-1) + d);
          d += inc;
        }
        const prox = seq.at(-1) + d;
        return {
          e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
          r: prox,
          d: [prox + inc, prox - inc, prox + 1 === prox + inc ? prox + 3 : prox + 1, seq.at(-1) + d - inc - 1],
          x: `As diferenças entre termos consecutivos (${seq.slice(1).map((v, i) => v - seq[i]).join(', ')}) aumentam ${inc} a cada passo. A próxima diferença é ${d}: ${seq.at(-1)} + ${d} = ${prox}.`,
        };
      },
      (r) => {
        const a = r.int(1, 9), b = r.int(20, 40), da = r.int(2, 4), db = r.int(2, 5);
        const seq = [];
        for (let i = 0; i < 7; i++) seq.push(i % 2 === 0 ? a + (i / 2) * da : b - ((i - 1) / 2) * db);
        const prox = b - 3 * db;
        return {
          e: `Qual é o próximo termo da sequência ${seq.join(', ')}, ...?`,
          r: prox,
          d: [a + 4 * da, prox - db, seq.at(-1) + da, prox + db],
          x: `São duas sequências intercaladas: posições ímpares (${a}, ${a + da}, ...) crescem ${da}; posições pares (${b}, ${b - db}, ...) diminuem ${db}. O 8º termo é da sequência par: ${prox}.`,
        };
      },
      (r) => {
        const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        const d0 = r.int(0, 6);
        const [mes, nDias, txt] = r.pick([[2, 31, '1º de fevereiro'], [3, 59, '1º de março (ano não bissexto)'], [4, 90, '1º de abril (ano não bissexto)'], [5, 120, '1º de maio (ano não bissexto)'], [12, 334, '1º de dezembro (ano não bissexto)']]);
        void mes;
        const alvo = (d0 + nDias) % 7;
        return {
          e: `Em determinado ano, 1º de janeiro caiu em ${d0 === 0 || d0 === 6 ? 'um' : 'uma'} ${dias[d0]}. Em que dia da semana caiu o ${txt}?`,
          r: dias[alvo],
          d: dias.filter((_, i) => i !== alvo),
          x: `De 1º de janeiro até o ${txt.split(' (')[0]} passam ${nDias} dias. ${nDias} = 7 × ${Math.floor(nDias / 7)} + ${nDias % 7}: avançamos ${nDias % 7} ${nDias % 7 === 1 ? 'dia' : 'dias'} a partir de ${dias[d0]}: ${dias[alvo]}.`,
        };
      },
      (r) => {
        const n = r.pick([100, 200, 500, 1000]);
        let c = 0;
        for (let i = 1; i <= n; i++) if (String(i).includes('7')) c++;
        return {
          e: `Quantos números inteiros de 1 a ${n} possuem pelo menos um algarismo 7?`,
          r: c,
          d: [n / 10, c + 1, c - 1, n === 100 ? 20 : c + 10],
          x: `Contando pelo complementar: números sem o algarismo 7 entre 1 e ${n} são ${n - c}; logo ${n} − ${n - c} = ${c} possuem algum 7.`,
        };
      },
    ],
    [
      (r) => {
        const pessoas = r.sample(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa'], 3);
        // cada um faz uma afirmação sobre quem foi o culpado
        const tipos = [
          (alvo) => ({ t: `Foi ${alvo}.`, f: (c) => c === alvo }),
          (alvo) => ({ t: `Não foi ${alvo}.`, f: (c) => c !== alvo }),
        ];
        for (let tentativa = 0; tentativa < 50; tentativa++) {
          const falas = pessoas.map((p) => {
            const alvo = r.pick(pessoas.map((x) => (x === p ? 'eu' : x)));
            const t = r.pick(tipos)(alvo === 'eu' ? p : alvo);
            return { p, texto: alvo === 'eu' ? t.t.replace(`Foi ${p}.`, 'Fui eu.').replace(`Não foi ${p}.`, 'Não fui eu.') : t.t, f: t.f };
          });
          const verdades = r.pick([1, 2]);
          const sol = pessoas.filter((c) => falas.filter((x) => x.f(c)).length === verdades);
          if (sol.length !== 1) continue;
          const culp = sol[0];
          return {
            e: `Um vaso foi quebrado e um dos três amigos — ${pessoas.join(', ')} — foi o responsável. ${falas.map((x) => `${x.p} disse: "${x.texto}"`).join(' ')} Sabendo que exatamente ${verdades === 1 ? 'um deles disse' : 'dois deles disseram'} a verdade, quem quebrou o vaso?`,
            r: culp,
            d: [...pessoas.filter((p) => p !== culp), 'Não é possível determinar', 'Mais de um deles'],
            x: `Testando cada suspeito como culpado e contando quantas falas ficam verdadeiras, apenas com ${culp} temos exatamente ${verdades} ${verdades === 1 ? 'fala verdadeira' : 'falas verdadeiras'}.`,
          };
        }
        return sequencias.niveis[2][0](r);
      },
      (r) => {
        const h = r.int(2, 11), m = r.pick([10, 15, 20, 25, 40, 45, 50]);
        const ang = Math.abs(30 * h - 5.5 * m);
        const menor = Math.min(ang, 360 - ang);
        return {
          e: `Qual é o menor ângulo formado pelos ponteiros das horas e dos minutos às ${h}h${String(m).padStart(2, '0')}?`,
          r: menor,
          d: [Math.abs(30 * h - 6 * m) > 180 ? 360 - Math.abs(30 * h - 6 * m) : Math.abs(30 * h - 6 * m), 360 - menor, menor + 2.5, Math.abs(menor - 5)],
          f: (v) => `${num(v)}°`,
          x: `O ponteiro das horas anda 0,5° por minuto. Ângulo = |30·h − 5,5·m| = |${30 * h} − ${num(5.5 * m)}| = ${num(ang)}°${ang > 180 ? `; o menor é ${num(menor)}°` : ''}.`,
        };
      },
      (r) => {
        const [a, b, c] = r.sample(['Ana', 'Bia', 'Caio', 'Davi', 'Eva'], 3);
        const prof = r.shuffle(['saúde', 'engenharia', 'educação']);
        // pistas: a não é prof[0]; b é prof[2]? construir de forma a ter solução única
        const sol = { [a]: prof[0], [b]: prof[1], [c]: prof[2] };
        const pistas = [`${a} não trabalha com ${prof[1]} nem com ${prof[2]}.`, `${c} não trabalha com ${prof[1]}.`];
        const perg = r.pick([a, b, c]);
        return {
          e: `${a}, ${b} e ${c} trabalham em áreas diferentes: saúde, engenharia e educação (cada um em uma). Sabe-se que: ${pistas.join(' ')} Com que área ${perg} trabalha?`,
          r: cap(sol[perg]),
          d: ['Saúde', 'Engenharia', 'Educação', 'Não é possível determinar', 'Direito'].filter((x) => x !== cap(sol[perg])),
          x: `Pela 1ª pista, ${a} trabalha com ${prof[0]}. Sobram ${prof[1]} e ${prof[2]}; como ${c} não trabalha com ${prof[1]}, ${c} fica com ${prof[2]} e ${b} com ${prof[1]}.`,
        };
      },
      (r) => {
        const n = r.int(5, 12);
        const k = r.pick([2, 3]);
        const v = k === 2 ? n + 1 : 2 * n + 1;
        return {
          e: `Uma gaveta tem meias de ${k} cores diferentes${k === 2 ? ` (${n} de cada cor)` : ` (${n} de cada cor)`}, todas misturadas. Quantas meias, no mínimo, devem ser retiradas no escuro para garantir ${k === 2 ? 'um par da mesma cor' : `duas meias de uma mesma cor`}${k === 2 ? '' : ''}?`,
          r: k + 1,
          d: [k, v, 2 * k + 1, n],
          x: `Princípio da casa dos pombos: no pior caso, as ${k} primeiras meias são de cores diferentes; a ${k + 1}ª obrigatoriamente repete uma cor.`,
        };
      },
    ],
  ],
};

// ======================================================= Conjuntos
const conjuntos = {
  disciplina: 'raciocinio-logico',
  arquivo: '04-conjuntos',
  titulo: 'Conjuntos e diagramas de Venn',
  provas: PROVAS,
  descricao: 'União, interseção, diferença, complementar, subconjuntos e problemas com diagramas.',
  niveis: [
    [
      (r) => {
        const total = r.pick([40, 50, 60, 80, 100, 120]);
        const a = r.int(Math.floor(total * 0.3), Math.floor(total * 0.6)), b = r.int(Math.floor(total * 0.3), Math.floor(total * 0.6));
        const ab = r.int(Math.max(1, a + b - total + 1), Math.min(a, b) - 1);
        const nenhum = total - (a + b - ab);
        const [x, y] = r.pick([['de inglês', 'de espanhol'], ['de futebol', 'de vôlei'], ['do jornal', 'da revista'], ['do produto A', 'do produto B'], ['de cinema', 'de teatro']]);
        return {
          e: `Em um grupo de ${total} pessoas, ${a} gostam ${x}, ${b} gostam ${y} e ${ab} gostam de ambos. Quantas não gostam de nenhum dos dois?`,
          r: nenhum,
          d: [total - a - b > 0 ? total - a - b : nenhum + ab * 2, nenhum + ab, ab, a + b - ab],
          x: `n(A ∪ B) = ${a} + ${b} − ${ab} = ${a + b - ab}. Não gostam de nenhum: ${total} − ${a + b - ab} = ${nenhum}.`,
        };
      },
      (r) => {
        const n = r.int(2, 8);
        return {
          e: `Quantos subconjuntos tem um conjunto com ${n} elementos?`,
          r: 2 ** n,
          d: [2 * n, n * n, 2 ** n - 1, 2 ** (n + 1)],
          x: `Um conjunto com n elementos tem 2ⁿ subconjuntos (incluindo o vazio e ele mesmo): 2^${n} = ${2 ** n}.`,
        };
      },
      (r) => {
        const U = Array.from({ length: 12 }, (_, i) => i + 1);
        const A = r.sample(U, 6).sort((x, y) => x - y), B = r.sample(U, 6).sort((x, y) => x - y);
        const inter = A.filter((x) => B.includes(x));
        const op = r.pick(['∩', '−']);
        const res = op === '∩' ? inter : A.filter((x) => !B.includes(x));
        const fmt = (l) => (l.length ? `{${l.join(', ')}}` : '∅');
        const uniao = [...new Set([...A, ...B])].sort((x, y) => x - y);
        return {
          e: `Sendo A = {${A.join(', ')}} e B = {${B.join(', ')}}, qual é o conjunto A ${op} B?`,
          r: fmt(res),
          d: [fmt(uniao), fmt(op === '∩' ? A.filter((x) => !B.includes(x)) : inter), fmt(B.filter((x) => !A.includes(x))), fmt(A), fmt(B)],
          x: op === '∩' ? `A ∩ B são os elementos comuns: ${fmt(inter)}.` : `A − B são os elementos de A que não estão em B: ${fmt(res)}.`,
        };
      },
      (r) => {
        const a = r.int(10, 40), b = r.int(10, 40), ab = r.int(2, Math.min(a, b) - 2);
        return {
          e: `Sabe-se que n(A) = ${a}, n(B) = ${b} e n(A ∩ B) = ${ab}. Qual é o valor de n(A ∪ B)?`,
          r: a + b - ab,
          d: [a + b, a + b + ab, a + b - 2 * ab, Math.max(a, b)],
          x: `n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = ${a} + ${b} − ${ab} = ${a + b - ab}.`,
        };
      },
    ],
    [
      (r) => {
        const total = r.pick([60, 80, 100, 120, 150]);
        const a = r.int(20, total / 2), b = r.int(20, total / 2), ab = r.int(5, Math.min(a, b) - 5);
        return {
          e: `Em uma pesquisa com ${total} clientes de um banco, ${a} usam o aplicativo, ${b} usam o internet banking e ${ab} usam os dois canais. Quantos usam APENAS o aplicativo?`,
          r: a - ab,
          d: [a, ab, b - ab, a + b - ab],
          x: `Apenas o aplicativo = n(App) − n(ambos) = ${a} − ${ab} = ${a - ab}.`,
        };
      },
      (r) => {
        const so = [r.int(5, 20), r.int(5, 20), r.int(5, 20)], dois = [r.int(2, 8), r.int(2, 8), r.int(2, 8)], tres = r.int(1, 6), nenhum = r.int(0, 15);
        const A = so[0] + dois[0] + dois[1] + tres, B = so[1] + dois[0] + dois[2] + tres, C = so[2] + dois[1] + dois[2] + tres;
        const AB = dois[0] + tres, AC = dois[1] + tres, BC = dois[2] + tres;
        const total = so.reduce((x, y) => x + y) + dois.reduce((x, y) => x + y) + tres + nenhum;
        return {
          e: `Em uma escola com ${total} alunos, ${A} estudam inglês, ${B} estudam espanhol e ${C} estudam francês. ${AB} estudam inglês e espanhol, ${AC} estudam inglês e francês, ${BC} estudam espanhol e francês, e ${tres} estudam os três idiomas. Quantos alunos não estudam nenhum desses idiomas?`,
          r: nenhum,
          d: [total - A - B - C > 0 ? total - A - B - C : nenhum + tres + 4, nenhum + tres, nenhum + 2 * tres === nenhum ? nenhum + 5 : nenhum + 2 * tres, total - (A + B + C - AB - AC - BC)],
          x: `n(I ∪ E ∪ F) = ${A} + ${B} + ${C} − ${AB} − ${AC} − ${BC} + ${tres} = ${total - nenhum}. Nenhum: ${total} − ${total - nenhum} = ${nenhum}.`,
        };
      },
      (r) => {
        const n = r.int(3, 7);
        return {
          e: `Um conjunto A tem ${n} elementos. Quantos subconjuntos de A possuem exatamente 2 elementos?`,
          r: (n * (n - 1)) / 2,
          d: [n * (n - 1), 2 ** n, n * 2, 2 ** n - n - 1],
          x: `É uma combinação: C(${n}, 2) = ${n}·${n - 1}/2 = ${(n * (n - 1)) / 2}.`,
        };
      },
      (r) => {
        const total = r.pick([30, 40, 50]), nenhum = r.int(2, 8), a = r.int(10, 25), b = r.int(10, 25);
        const ab = a + b - (total - nenhum);
        if (ab < 1 || ab >= Math.min(a, b)) return conjuntos.niveis[1][3](r);
        return {
          e: `Numa turma de ${total} alunos, ${a} foram aprovados em Matemática, ${b} em Português, e ${nenhum} não foram aprovados em nenhuma das duas. Quantos foram aprovados nas duas disciplinas?`,
          r: ab,
          d: [a + b - total, ab + nenhum, total - a - b + nenhum > 0 ? total - a - b + nenhum : ab + 3, Math.min(a, b)],
          x: `Aprovados em pelo menos uma: ${total} − ${nenhum} = ${total - nenhum}. Então ${a} + ${b} − x = ${total - nenhum} ⇒ x = ${ab}.`,
        };
      },
    ],
    [
      (r) => {
        const total = r.pick([100, 120, 150, 200]), a = r.int(60, total - 10), b = r.int(60, total - 10);
        const min = Math.max(0, a + b - total);
        const pede = r.pick(['mínimo', 'máximo']);
        const v = pede === 'mínimo' ? min : Math.min(a, b);
        return {
          e: `Em um grupo de ${total} pessoas, ${a} têm conta corrente e ${b} têm conta poupança. Qual é o número ${pede} de pessoas que têm os dois tipos de conta?`,
          r: v,
          d: [pede === 'mínimo' ? Math.min(a, b) : min, a + b - total + 10, Math.abs(a - b), Math.round((a + b) / 2)],
          x: pede === 'mínimo' ? `Mínimo: quando a união é o grupo todo: ${a} + ${b} − ${total} = ${min}.` : `Máximo: quando um conjunto está contido no outro: min(${a}, ${b}) = ${v}.`,
        };
      },
      (r) => {
        const n = r.int(4, 8), k = r.int(1, 3);
        return {
          e: `Um conjunto A tem ${n} elementos e um elemento específico x pertence a A. Quantos subconjuntos de A contêm x${k > 1 ? ` e possuem exatamente ${k + 1} elementos` : ''}?`,
          r: k > 1 ? (fat(n - 1) / (fat(k) * fat(n - 1 - k))) : 2 ** (n - 1),
          d: k > 1 ? [fat(n) / (fat(k + 1) * fat(n - k - 1)), 2 ** (n - 1), fat(n - 1) / fat(n - 1 - k), k * n] : [2 ** n, 2 ** n - 1, n, 2 ** (n - 2)],
          x: k > 1 ? `Fixando x, escolhemos os outros ${k} elementos entre os ${n - 1} restantes: C(${n - 1}, ${k}).` : `Fixando x, cada um dos outros ${n - 1} elementos pode ou não entrar: 2^${n - 1} = ${2 ** (n - 1)}.`,
        };
      },
      (r) => {
        const a = r.int(20, 40), b = r.int(20, 40), c = r.int(20, 40);
        const ab = r.int(5, 10), ac = r.int(5, 10), bc = r.int(5, 10), abc = r.int(1, 4);
        const soA = a - ab - ac + abc;
        if (soA < 1) return conjuntos.niveis[2][2](r);
        return {
          e: `Em uma pesquisa sobre streaming: ${a} pessoas assinam o serviço A, ${b} o B e ${c} o C; ${ab} assinam A e B, ${ac} assinam A e C, ${bc} assinam B e C, e ${abc} assinam os três. Quantas pessoas assinam APENAS o serviço A?`,
          r: soA,
          d: [a - ab - ac, a - ab - ac - abc, a - abc, a - ab],
          x: `Apenas A = n(A) − n(A∩B) − n(A∩C) + n(A∩B∩C) = ${a} − ${ab} − ${ac} + ${abc} = ${soA} (soma-se de volta quem foi retirado duas vezes).`,
        };
      },
      (r) => {
        const pct = r.pick([[70, 60, 20], [80, 50, 10], [65, 55, 5], [90, 40, 10], [75, 45, 15]]);
        const [a, b, nen] = pct;
        const ambos = a + b - (100 - nen);
        return {
          e: `Em uma pesquisa, ${a}% dos entrevistados leem notícias pelo celular, ${b}% pela TV e ${nen}% não usam nenhum desses meios. Que porcentagem usa os dois meios?`,
          r: `${ambos}%`,
          d: [`${a + b - 100}%`, `${ambos + nen}%`, `${nen}%`, `${Math.abs(a - b)}%`],
          x: `Usam pelo menos um: 100% − ${nen}% = ${100 - nen}%. Então ${a}% + ${b}% − x = ${100 - nen}% ⇒ x = ${ambos}%.`,
        };
      },
    ],
  ],
};

function fat(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
void fracao;
// Rótulo da "ferramenta" de cada modelo antigo, na ordem em que aparecem em cada nível.
const FERR = {
  proposicoes: [
    ['valor lógico dos conectivos', 'número de linhas (2ⁿ)', 'o que é proposição', 'conectivo principal', 'valor lógico da condicional'],
    ['substituir valores e resolver', 'condicional falsa (só V → F)', 'tautologia', 'contar linhas verdadeiras', 'conjunção verdadeira / disjunção falsa'],
    ['modus ponens e modus tollens', 'tabela-verdade com 3 proposições', 'contradição', 'valores a partir de uma condicional falsa', 'bicondicional'],
  ],
  negacoes: [
    ['negação de "todo"', 'De Morgan (negação do "e")', 'De Morgan (negação do "ou")', 'negação de "algum"', 'dupla negação'],
    ['negação da condicional (mantém e nega)', 'contrapositiva', 'condicional ≡ disjunção', 'negação de "nenhum"', 'De Morgan com negação'],
    ['negação da bicondicional', 'negação de condicional composta', 'contrapositiva com negação', 'negação de quantificador + conjunção', 'disjunção ≡ condicional'],
  ],
  sequencias: [
    ['descobrir o padrão', 'sequência de letras', 'padrão cíclico (resto da divisão)', 'ângulo dos ponteiros'],
    ['diferenças crescentes', 'sequências intercaladas', 'calendário (resto por 7)', 'contagem pelo complementar'],
    ['testar hipóteses (verdade e mentira)', 'ângulo dos ponteiros (minutos quebrados)', 'tabela de associação', 'casa dos pombos'],
  ],
  conjuntos: [
    ['união de dois conjuntos', 'número de subconjuntos (2ⁿ)', 'interseção e diferença', 'fórmula da união'],
    ['"apenas" no diagrama de Venn', 'união de três conjuntos', 'subconjuntos com 2 elementos (combinação)', 'interseção a partir do total'],
    ['mínimo e máximo da interseção', 'subconjuntos que contêm um elemento', '"apenas A" com três conjuntos', 'interseção em porcentagem'],
  ],
};

export { SIMPLES, QUANT, cap, dois, avaliar, texto, gerarExpr, varsDe };
export default [
  comNovos(prepararAntigos(proposicoes, FERR.proposicoes, EXTRAS.proposicoes, [[0, 1, 3], [0, 1, 3], [0, 1, 4]]), NOVOS.proposicoes),
  comNovos(prepararAntigos(negacoes, FERR.negacoes, EXTRAS.negacoes), NOVOS.negacoes),
  comNovos(prepararAntigos(sequencias, FERR.sequencias, EXTRAS.sequencias), NOVOS.sequencias),
  comNovos(prepararAntigos(conjuntos, FERR.conjuntos, EXTRAS.conjuntos), NOVOS.conjuntos),
];
