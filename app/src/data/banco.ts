// Acesso ao banco de questões gerado por scripts/compilar-conteudos.mjs.
// Não edite banco.json à mão: edite os arquivos em /conteudos e rode `npm run conteudo`.

export type Prova = 'ENEM' | 'Militares' | 'Concursos';
export type Trilha = Prova | 'Todas';
export type Nivel = 0 | 1 | 2;

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
};

export type Topico = {
  id: string;
  titulo: string;
  descricao: string;
  provas: Prova[];
  arquivo: string;
  porNivel: [number, number, number];
};

export type Disciplina = {
  id: string;
  nome: string;
  area: string;
  emoji: string;
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

export function getDisciplina(id: string) {
  return disciplinas.find((d) => d.id === id);
}

export function getTopico(id: string) {
  return topicoPorId.get(id);
}

export function getQuestao(id: string) {
  return questaoPorId.get(id);
}

export function questoesDoTopico(topicoId: string, nivel?: Nivel): Questao[] {
  const todas = banco.questoes[topicoId] ?? [];
  return nivel == null ? todas : todas.filter((q) => q.n === nivel);
}

export function topicoNaTrilha(t: Topico, trilha: Trilha) {
  return trilha === 'Todas' || t.provas.includes(trilha);
}

export function disciplinasDaTrilha(trilha: Trilha) {
  return disciplinas
    .map((d) => ({ ...d, topicos: d.topicos.filter((t) => topicoNaTrilha(t, trilha)) }))
    .filter((d) => d.topicos.length > 0);
}

export function topicosDaTrilha(trilha: Trilha): Topico[] {
  return disciplinasDaTrilha(trilha).flatMap((d) => d.topicos);
}
