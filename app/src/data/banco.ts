// Acesso ao banco de questões gerado por scripts/compilar-conteudos.mjs.
// Não edite banco.json à mão: edite os arquivos em /conteudos e rode `npm run conteudo`.

import { getProva } from './provas';

export type Prova = 'ENEM' | 'Militares' | 'Concursos' | 'Certificações';
export type Nivel = 0 | 1 | 2;
/** Língua estrangeira escolhida pelo aluno (o ENEM pede uma das duas). */
export type Lingua = 'ingles' | 'espanhol';
export const LINGUAS: { id: Lingua; nome: string; icone: string }[] = [
  { id: 'ingles', nome: 'Inglês', icone: 'translate' },
  { id: 'espanhol', nome: 'Espanhol', icone: 'translate-variant' },
];

export const NOMES_NIVEL = ['Fácil', 'Médio', 'Difícil'] as const;
export const XP_POR_NIVEL = [10, 15, 20] as const;

export type Questao = {
  id: string;
  /** nível: 0 fácil, 1 médio, 2 difícil */
  n: Nivel;
  /** enunciado */
  e: string;
  /** alternativas */
  a: string[];
  /** índice da alternativa correta */
  c: number;
  /** explicação */
  x: string;
  /** fonte */
  f?: string;
  /** modelo de enunciado (questões geradas): a lição evita dois do mesmo modelo */
  m?: string;
};

/** Vídeo-aula do YouTube indicada para o assunto (o app toca pelo player oficial do YouTube). */
export type Video = {
  /** id do vídeo no YouTube */
  id: string;
  /** duração, como "8:47" */
  d: string;
  /** canal (autor) */
  c: string;
  /** título */
  t: string;
};

export type Topico = {
  id: string;
  titulo: string;
  descricao: string;
  provas: Prova[];
  arquivo: string;
  porNivel: [number, number, number];
  /** resumo teórico do tópico (Markdown simples), mostrado antes das questões */
  resumo?: string;
  /** aula completa (teoria explicada com exemplos), em Markdown simples */
  aula?: string;
  /** provas oficiais: as alternativas aparecem na ordem original (sem embaralhar) */
  ordemOriginal?: boolean;
  /** quanto o assunto costuma cair nas provas: 1 (pouco) a 5 (muito) */
  incidencia?: number;
  /** ids de questões oficiais (ENEM) de outros arquivos classificadas neste assunto */
  oficiais?: string[];
  /** vídeo-aulas gratuitas do YouTube indicadas para o assunto */
  videos?: Video[];
};

/** As alternativas desta questão podem ser embaralhadas? (não em provas oficiais nem em certo/errado) */
export function podeEmbaralhar(q: Questao) {
  return q.a.length >= 4 && !getTopico(q.id.split('#')[0])?.topico.ordemOriginal;
}

export type Disciplina = {
  id: string;
  nome: string;
  area: string;
  /** nome do ícone (Material Community Icons) */
  icone: string;
  cor: string;
  ordem: number;
  topicos: Topico[];
};

type Banco = {
  versao: number;
  disciplinas: Disciplina[];
  questoes: Record<string, Questao[]>;
};

// require evita que o TypeScript tente inferir o tipo de um JSON enorme.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const banco = require('./banco.json') as Banco;

export const disciplinas = banco.disciplinas;

const topicoPorId = new Map<string, { topico: Topico; disciplina: Disciplina }>();
for (const d of disciplinas) for (const t of d.topicos) topicoPorId.set(t.id, { topico: t, disciplina: d });

const questaoPorId = new Map<string, { questao: Questao; topicoId: string }>();
for (const [topicoId, lista] of Object.entries(banco.questoes)) {
  for (const q of lista) questaoPorId.set(q.id, { questao: q, topicoId });
}

export const totalQuestoes = questaoPorId.size;
/** Quantas questões têm figura (gráfico, mapa, charge...) no enunciado ou nas alternativas. */
export const totalComFigura = [...questaoPorId.values()].filter(({ questao: q }) => [q.e, ...q.a].some((t) => t.includes('!['))).length;

export function getDisciplina(id: string) {
  return disciplinas.find((d) => d.id === id);
}

export function getTopico(id: string) {
  return topicoPorId.get(id);
}

export function getQuestao(id: string) {
  return questaoPorId.get(id);
}

// questões do próprio arquivo + questões oficiais classificadas neste assunto
const questoesComOficiais = new Map<string, Questao[]>();
// assuntos em que cada questão aparece (o próprio arquivo e, nas oficiais, os assuntos classificados)
const topicosPorQuestao = new Map<string, string[]>();
for (const { topico } of topicoPorId.values()) {
  const proprias = banco.questoes[topico.id] ?? [];
  const oficiais = (topico.oficiais ?? []).map((id) => questaoPorId.get(id)?.questao).filter((q): q is Questao => !!q);
  questoesComOficiais.set(topico.id, oficiais.length ? [...proprias, ...oficiais] : proprias);
  for (const q of [...proprias, ...oficiais]) topicosPorQuestao.set(q.id, [...(topicosPorQuestao.get(q.id) ?? []), topico.id]);
}

/** Assuntos em que a questão aparece. */
export function topicosDaQuestao(id: string): string[] {
  return topicosPorQuestao.get(id) ?? [];
}

export function questoesDoTopico(topicoId: string, nivel?: Nivel): Questao[] {
  const todas = questoesComOficiais.get(topicoId) ?? [];
  return nivel == null ? todas : todas.filter((q) => q.n === nivel);
}

/** Quantas questões oficiais (provas anteriores) estão classificadas neste assunto. */
export function totalOficiais(topico: Topico) {
  return topico.oficiais?.length ?? 0;
}

/** A prova cobra as duas línguas estrangeiras (o aluno escolhe uma)? */
export function provaTemDuasLinguas(provaId: string): boolean {
  const ids = new Set(disciplinasSemFiltroDeLingua(provaId).map((d) => d.id));
  return LINGUAS.every((l) => ids.has(l.id));
}

/**
 * Disciplinas (com os tópicos filtrados) cobradas na prova-alvo do aluno. Se a prova tem inglês e
 * espanhol, entra só a língua escolhida (`lingua`); sem `lingua`, entram as duas.
 */
export function disciplinasDaProva(provaId: string, lingua?: Lingua): Disciplina[] {
  const lista = disciplinasSemFiltroDeLingua(provaId);
  if (!lingua || !lista.some((d) => d.id === lingua)) return lista;
  const outras = new Set(LINGUAS.filter((l) => l.id !== lingua).map((l) => l.id));
  return lista.filter((d) => !outras.has(d.id as Lingua));
}

function disciplinasSemFiltroDeLingua(provaId: string): Disciplina[] {
  const prova = getProva(provaId);
  if (prova.materias) {
    return prova.materias
      .map((m) => {
        const d = getDisciplina(m.disciplina);
        if (!d) return null;
        return { ...d, topicos: m.topicos ? d.topicos.filter((t) => m.topicos!.some((slug) => t.id === `${d.id}/${slug}`)) : d.topicos };
      })
      .filter((d): d is Disciplina => !!d && d.topicos.length > 0)
      .sort((a, b) => a.ordem - b.ordem);
  }
  return disciplinas
    .map((d) => ({ ...d, topicos: prova.grupo === 'Todas' ? d.topicos : d.topicos.filter((t) => t.provas.includes(prova.grupo as Prova)) }))
    .filter((d) => d.topicos.length > 0);
}

export function topicosDaProva(provaId: string, lingua?: Lingua): Topico[] {
  return disciplinasDaProva(provaId, lingua).flatMap((d) => d.topicos);
}

export const incidencia = (t: Topico) => t.incidencia ?? 3;
