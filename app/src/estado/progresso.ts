// Regras de gamificação: XP, níveis, ofensiva, moedas, conquistas e montagem de lições.
// Funções puras — a persistência fica em ProgressoContext.tsx.

import {
  Nivel,
  Questao,
  Trilha,
  XP_POR_NIVEL,
  getQuestao,
  getTopico,
  questoesDoTopico,
  topicosDaTrilha,
} from '../data/banco';
import { diferencaDias, embaralhar, hoje, somarDias } from './datas';

export const TAMANHO_LICAO = 10;
export const PRECO_PROTETOR = 50;
export const MAX_PROTETORES = 3;
export const BONUS_DESAFIO = 50;
export const ACERTO_PARA_DESBLOQUEAR = 70;
export const BONUS_PERFEITA = 20;

/**
 * Estatística de cada questão. `caixa` e `proxima` controlam a revisão espaçada:
 * cada acerto passa a questão para a próxima caixa (revisão mais espaçada) e cada erro
 * a devolve para a caixa 0 (revisar hoje).
 */
export type EstatQuestao = { acertos: number; erros: number; ultima: string; caixa?: number; proxima?: string };
export type EstatTopico = { licoes: [number, number, number]; melhor: [number, number, number] };

export type Progresso = {
  versao: number;
  onboarding: boolean;
  nome: string;
  trilha: Trilha;
  metaDiaria: number;
  xpTotal: number;
  moedas: number;
  protetores: number;
  ofensiva: { atual: number; recorde: number; ultimoDia: string | null };
  xpPorDia: Record<string, number>;
  questoes: Record<string, EstatQuestao>;
  topicos: Record<string, EstatTopico>;
  /** Últimas respostas por tópico ('1' acerto, '0' erro), para medir o desempenho recente. */
  recentes: Record<string, string>;
  /** Fila antiga de erros (versão 1); migrada para a revisão espaçada. */
  revisao?: string[];
  conquistas: Record<string, string>;
  lembrete: { ativo: boolean; hora: number; minuto: number };
  desbloquearTudo: boolean;
  totalLicoes: number;
  licoesPerfeitas: number;
  licoesDificeis: number;
  revisoesFeitas: number;
  comboRecorde: number;
  desafiosFeitos: Record<string, boolean>;
  ultimoTopico: string | null;
};

export function estadoInicial(): Progresso {
  return {
    versao: 2,
    onboarding: false,
    nome: '',
    trilha: 'ENEM',
    metaDiaria: 200,
    xpTotal: 0,
    moedas: 20,
    protetores: 0,
    ofensiva: { atual: 0, recorde: 0, ultimoDia: null },
    xpPorDia: {},
    questoes: {},
    topicos: {},
    recentes: {},
    conquistas: {},
    lembrete: { ativo: false, hora: 19, minuto: 0 },
    desbloquearTudo: false,
    totalLicoes: 0,
    licoesPerfeitas: 0,
    licoesDificeis: 0,
    revisoesFeitas: 0,
    comboRecorde: 0,
    desafiosFeitos: {},
    ultimoTopico: null,
  };
}

/** Mescla um estado salvo com os padrões (para compatibilidade com versões futuras). */
export function normalizar(salvo: Partial<Progresso> | null): Progresso {
  const base = estadoInicial();
  if (!salvo) return base;
  const p = {
    ...base,
    ...salvo,
    ofensiva: { ...base.ofensiva, ...salvo.ofensiva },
    lembrete: { ...base.lembrete, ...salvo.lembrete },
  } as Progresso;
  return (salvo.versao ?? 1) < 2 ? migrarParaV2(p) : p;
}

/** Versão 1 tinha só uma fila de erros; agora toda questão respondida entra na revisão espaçada. */
function migrarParaV2(p: Progresso, dia = hoje()): Progresso {
  const erradas = new Set(p.revisao ?? []);
  const questoes: Record<string, EstatQuestao> = {};
  for (const [id, e] of Object.entries(p.questoes)) {
    if (e.proxima) questoes[id] = e;
    else if (erradas.has(id) || e.acertos === 0) questoes[id] = { ...e, caixa: 0, proxima: dia };
    else questoes[id] = { ...e, caixa: 1, proxima: somarDias(e.ultima, INTERVALOS[1]) };
  }
  const { revisao: _antiga, ...resto } = p;
  return { ...resto, versao: 2, questoes };
}

// ---------- Níveis do usuário ----------

/** XP necessário para passar do nível n para n+1. */
const xpDoNivel = (n: number) => 500 + 250 * (n - 1);

export function nivelDoUsuario(xp: number) {
  let nivel = 1;
  let restante = xp;
  while (restante >= xpDoNivel(nivel)) {
    restante -= xpDoNivel(nivel);
    nivel++;
  }
  return { nivel, xpNoNivel: restante, xpParaProximo: xpDoNivel(nivel) };
}

// ---------- Ofensiva ----------

/**
 * Chamado ao abrir o app: se o aluno pulou dias, usa protetores de ofensiva
 * ou zera a ofensiva.
 */
export function verificarOfensiva(p: Progresso, dia = hoje()): { p: Progresso; usouProtetores: number; perdeu: boolean } {
  const { ultimoDia, atual } = p.ofensiva;
  if (!ultimoDia || atual === 0) return { p, usouProtetores: 0, perdeu: false };
  const faltas = diferencaDias(ultimoDia, dia) - 1;
  if (faltas <= 0) return { p, usouProtetores: 0, perdeu: false };
  if (p.protetores >= faltas) {
    return {
      p: { ...p, protetores: p.protetores - faltas, ofensiva: { ...p.ofensiva, ultimoDia: somarDias(dia, -1) } },
      usouProtetores: faltas,
      perdeu: false,
    };
  }
  return { p: { ...p, ofensiva: { ...p.ofensiva, atual: 0 } }, usouProtetores: 0, perdeu: true };
}

export const estudouHoje = (p: Progresso, dia = hoje()) => p.ofensiva.ultimoDia === dia;
export const xpHoje = (p: Progresso, dia = hoje()) => p.xpPorDia[dia] ?? 0;

// ---------- Domínio dos tópicos ----------

export function dominioNivel(p: Progresso, topicoId: string, nivel: Nivel) {
  const qs = questoesDoTopico(topicoId, nivel);
  if (!qs.length) return 0;
  const dominadas = qs.filter((q) => (p.questoes[q.id]?.acertos ?? 0) > 0).length;
  return dominadas / qs.length;
}

export function dominioTopico(p: Progresso, topicoId: string) {
  const qs = questoesDoTopico(topicoId);
  if (!qs.length) return 0;
  return qs.filter((q) => (p.questoes[q.id]?.acertos ?? 0) > 0).length / qs.length;
}

export function nivelDesbloqueado(p: Progresso, topicoId: string, nivel: Nivel) {
  if (nivel === 0 || p.desbloquearTudo) return true;
  const est = p.topicos[topicoId];
  return (est?.melhor[nivel - 1] ?? 0) >= ACERTO_PARA_DESBLOQUEAR;
}

// ---------- Revisão espaçada ----------

/** Dias até a próxima revisão para cada caixa (0 = revisar hoje). */
export const INTERVALOS = [0, 1, 3, 7, 15, 30, 60];
const MAX_CAIXA = INTERVALOS.length - 1;

/** Agenda a próxima revisão de uma questão depois de respondida. */
export function agendar(anterior: EstatQuestao | undefined, acertou: boolean, dia: string): Pick<EstatQuestao, 'caixa' | 'proxima'> {
  if (!acertou) return { caixa: 0, proxima: dia };
  // acertar de primeira, sem nunca ter errado, já pula a revisão do dia seguinte
  const salto = anterior ? 1 : 2;
  const caixa = Math.min(MAX_CAIXA, (anterior?.caixa ?? 0) + salto);
  return { caixa, proxima: somarDias(dia, INTERVALOS[caixa]) };
}

/** Questões cuja revisão venceu, das mais atrasadas (e menos dominadas) para as mais recentes. */
export function revisoesPendentes(p: Progresso, dia = hoje()): string[] {
  return Object.entries(p.questoes)
    .filter(([id, e]) => e.proxima != null && e.proxima <= dia && getQuestao(id))
    .sort(([, a], [, b]) => (a.proxima! < b.proxima! ? -1 : a.proxima! > b.proxima! ? 1 : (a.caixa ?? 0) - (b.caixa ?? 0)))
    .map(([id]) => id);
}

/** Próximo dia com revisões agendadas (depois de hoje) e quantas questões vencem nele. */
export function proximaRevisao(p: Progresso, dia = hoje()): { dia: string; quantidade: number } | null {
  let menor: string | null = null;
  let quantidade = 0;
  for (const e of Object.values(p.questoes)) {
    if (!e.proxima || e.proxima <= dia) continue;
    if (menor == null || e.proxima < menor) {
      menor = e.proxima;
      quantidade = 1;
    } else if (e.proxima === menor) quantidade++;
  }
  return menor ? { dia: menor, quantidade } : null;
}

// ---------- Desempenho e pontos fracos ----------

/** Quantas respostas recentes guardamos por tópico. */
export const JANELA_RECENTE = 20;
/** Mínimo de respostas para o app julgar um tópico. */
export const MIN_RESPOSTAS_AVALIAR = 6;
/** Abaixo deste percentual de acerto recente, o tópico vira ponto fraco. */
export const LIMITE_PONTO_FRACO = 70;

export type Desempenho = { topicoId: string; respostas: number; acerto: number };

export function desempenhoTopico(p: Progresso, topicoId: string): Desempenho {
  const h = p.recentes[topicoId] ?? '';
  const acertos = [...h].filter((c) => c === '1').length;
  return { topicoId, respostas: h.length, acerto: h.length ? Math.round((acertos / h.length) * 100) : 0 };
}

/** Tópicos da trilha com acerto recente abaixo do limite, do pior para o melhor. */
export function pontosFracos(p: Progresso, trilha: Trilha = p.trilha): Desempenho[] {
  return topicosDaTrilha(trilha)
    .map((t) => desempenhoTopico(p, t.id))
    .filter((d) => d.respostas >= MIN_RESPOSTAS_AVALIAR && d.acerto < LIMITE_PONTO_FRACO)
    .sort((a, b) => a.acerto - b.acerto || b.respostas - a.respostas);
}

/** Percentual de acerto de todas as respostas já dadas em uma disciplina (null se nunca respondeu). */
export function acertoDisciplina(p: Progresso, disciplinaId: string): number | null {
  let acertos = 0;
  let total = 0;
  for (const [id, e] of Object.entries(p.questoes)) {
    if (!id.startsWith(disciplinaId + '/')) continue;
    acertos += e.acertos;
    total += e.acertos + e.erros;
  }
  return total ? Math.round((acertos / total) * 100) : null;
}

// ---------- Montagem de lições ----------

export type Modo = 'topico' | 'desafio' | 'revisao' | 'treino' | 'fracos';

/** Prioriza questões nunca vistas, depois as que o aluno errou, depois as demais. */
function priorizar(p: Progresso, qs: Questao[], quantidade: number): Questao[] {
  const nunca: Questao[] = [];
  const erradas: Questao[] = [];
  const resto: Questao[] = [];
  for (const q of qs) {
    const e = p.questoes[q.id];
    if (!e) nunca.push(q);
    else if (e.acertos === 0 || e.erros > e.acertos) erradas.push(q);
    else resto.push(q);
  }
  resto.sort((a, b) => (p.questoes[a.id].ultima < p.questoes[b.id].ultima ? -1 : 1));
  return [...embaralhar(nunca), ...embaralhar(erradas), ...resto].slice(0, quantidade);
}

export function montarLicaoTopico(p: Progresso, topicoId: string, nivel: Nivel): Questao[] {
  return embaralhar(priorizar(p, questoesDoTopico(topicoId, nivel), TAMANHO_LICAO));
}

export function montarDesafio(p: Progresso): Questao[] {
  const topicos = embaralhar(topicosDaTrilha(p.trilha));
  const escolhidas: Questao[] = [];
  // nível proporcional ao avanço do aluno: mais difícil conforme ganha XP
  const { nivel } = nivelDoUsuario(p.xpTotal);
  for (const t of topicos) {
    if (escolhidas.length >= TAMANHO_LICAO) break;
    const r = Math.random() * 10;
    const n: Nivel = r < Math.max(2, 6 - nivel / 2) ? 0 : r < 8 ? 1 : 2;
    const [q] = priorizar(p, questoesDoTopico(t.id, n), 1);
    if (q) escolhidas.push(q);
  }
  return escolhidas;
}

export function montarRevisao(p: Progresso): Questao[] {
  const qs = revisoesPendentes(p)
    .slice(0, TAMANHO_LICAO)
    .map((id) => getQuestao(id)?.questao)
    .filter((q): q is Questao => !!q);
  return embaralhar(qs);
}

/** Lição focada nos pontos fracos (ou em um tópico específico): primeiro o que o aluno errou. */
export function montarPontosFracos(p: Progresso, topicoId?: string): Questao[] {
  const ids = topicoId ? [topicoId] : pontosFracos(p).slice(0, 3).map((d) => d.topicoId);
  const candidatas = ids.flatMap((id) =>
    ([0, 1, 2] as Nivel[]).filter((n) => nivelDesbloqueado(p, id, n)).flatMap((n) => questoesDoTopico(id, n)),
  );
  const erradas: Questao[] = [];
  const nunca: Questao[] = [];
  const resto: Questao[] = [];
  for (const q of embaralhar(candidatas)) {
    const e = p.questoes[q.id];
    if (!e) nunca.push(q);
    else if (e.caixa === 0 || e.erros > e.acertos) erradas.push(q);
    else resto.push(q);
  }
  return embaralhar([...erradas, ...nunca, ...resto].slice(0, TAMANHO_LICAO));
}

export function montarTreino(p: Progresso, disciplinaId?: string): Questao[] {
  const topicos = topicosDaTrilha(p.trilha).filter((t) => !disciplinaId || t.id.startsWith(disciplinaId + '/'));
  const candidatas = topicos.flatMap((t) =>
    ([0, 1, 2] as Nivel[]).filter((n) => nivelDesbloqueado(p, t.id, n)).flatMap((n) => questoesDoTopico(t.id, n)),
  );
  return embaralhar(priorizar(p, embaralhar(candidatas), TAMANHO_LICAO));
}

// ---------- Conclusão de lição ----------

export type Resposta = { id: string; acertou: boolean };
export type ResumoLicao = {
  modo: Modo;
  topicoId?: string;
  nivel?: Nivel;
  respostas: Resposta[]; // primeira tentativa de cada questão
  xp: number;
  comboMax: number;
};

export type Conquista = { id: string; titulo: string; descricao: string; emoji: string; ok: (p: Progresso) => boolean };

const respondidas = (p: Progresso) => Object.values(p.questoes).reduce((s, q) => s + q.acertos + q.erros, 0);
const disciplinasEstudadas = (p: Progresso) =>
  new Set(Object.keys(p.questoes).map((id) => id.split('/')[0])).size;

export const CONQUISTAS: Conquista[] = [
  { id: 'primeira', emoji: '🌱', titulo: 'Primeiro passo', descricao: 'Conclua sua primeira lição', ok: (p) => p.totalLicoes >= 1 },
  { id: 'perfeita', emoji: '🎯', titulo: 'Gabaritou!', descricao: 'Acerte todas as questões de uma lição', ok: (p) => p.licoesPerfeitas >= 1 },
  { id: 'ofensiva3', emoji: '🔥', titulo: 'Esquentando', descricao: 'Ofensiva de 3 dias', ok: (p) => p.ofensiva.recorde >= 3 },
  { id: 'ofensiva7', emoji: '📅', titulo: 'Uma semana firme', descricao: 'Ofensiva de 7 dias', ok: (p) => p.ofensiva.recorde >= 7 },
  { id: 'ofensiva30', emoji: '🏆', titulo: 'Hábito criado', descricao: 'Ofensiva de 30 dias', ok: (p) => p.ofensiva.recorde >= 30 },
  { id: 'ofensiva100', emoji: '💯', titulo: 'Imparável', descricao: 'Ofensiva de 100 dias', ok: (p) => p.ofensiva.recorde >= 100 },
  { id: 'q100', emoji: '✏️', titulo: 'Centena', descricao: 'Responda 100 questões', ok: (p) => respondidas(p) >= 100 },
  { id: 'q500', emoji: '📝', titulo: 'Maratonista', descricao: 'Responda 500 questões', ok: (p) => respondidas(p) >= 500 },
  { id: 'q1000', emoji: '🧠', titulo: 'Mil questões', descricao: 'Responda 1.000 questões', ok: (p) => respondidas(p) >= 1000 },
  { id: 'xp5000', emoji: '⚡', titulo: 'Energia pura', descricao: 'Acumule 5.000 XP', ok: (p) => p.xpTotal >= 5000 },
  { id: 'xp50000', emoji: '🚀', titulo: 'Rumo à aprovação', descricao: 'Acumule 50.000 XP', ok: (p) => p.xpTotal >= 50000 },
  { id: 'dificil', emoji: '💪', titulo: 'Destemido', descricao: 'Conclua uma lição de nível difícil', ok: (p) => p.licoesDificeis >= 1 },
  { id: 'revisao', emoji: '🔁', titulo: 'Aprendendo com os erros', descricao: 'Conclua uma revisão', ok: (p) => p.revisoesFeitas >= 1 },
  { id: 'revisao20', emoji: '🐘', titulo: 'Memória de elefante', descricao: 'Conclua 20 revisões', ok: (p) => p.revisoesFeitas >= 20 },
  { id: 'combo10', emoji: '🎰', titulo: 'Em chamas', descricao: 'Acerte 10 questões seguidas', ok: (p) => p.comboRecorde >= 10 },
  { id: 'explorador', emoji: '🧭', titulo: 'Explorador', descricao: 'Estude 5 disciplinas diferentes', ok: (p) => disciplinasEstudadas(p) >= 5 },
  { id: 'poliglota', emoji: '🌐', titulo: 'Enciclopédia', descricao: 'Estude 12 disciplinas diferentes', ok: (p) => disciplinasEstudadas(p) >= 12 },
];

export type EventosLicao = {
  ofensivaAumentou: boolean;
  metaBatidaAgora: boolean;
  subiuDeNivel: boolean;
  novasConquistas: Conquista[];
  moedasGanhas: number;
  bonusDesafio: number;
  acertos: number;
  total: number;
  desbloqueouNivel: Nivel | null;
};

export function concluirLicao(anterior: Progresso, r: ResumoLicao, dia = hoje()): { p: Progresso; ev: EventosLicao } {
  const p: Progresso = structuredCloneSeguro(anterior);
  const acertos = r.respostas.filter((x) => x.acertou).length;
  const total = r.respostas.length;
  const perfeita = total > 0 && acertos === total;
  const percentual = total ? Math.round((acertos / total) * 100) : 0;

  // Estatísticas das questões, revisão espaçada e desempenho recente por tópico
  for (const { id, acertou } of r.respostas) {
    const anterior = p.questoes[id];
    const e = anterior ?? { acertos: 0, erros: 0, ultima: dia };
    p.questoes[id] = {
      acertos: e.acertos + (acertou ? 1 : 0),
      erros: e.erros + (acertou ? 0 : 1),
      ultima: dia,
      ...agendar(anterior, acertou, dia),
    };
    const topicoId = getQuestao(id)?.topicoId;
    if (topicoId) p.recentes[topicoId] = ((p.recentes[topicoId] ?? '') + (acertou ? '1' : '0')).slice(-JANELA_RECENTE);
  }

  // Tópico
  let desbloqueouNivel: Nivel | null = null;
  if (r.modo === 'topico' && r.topicoId != null && r.nivel != null) {
    const est = p.topicos[r.topicoId] ?? { licoes: [0, 0, 0], melhor: [0, 0, 0] };
    const antes = nivelDesbloqueado(anterior, r.topicoId, (r.nivel + 1) as Nivel);
    est.licoes = [...est.licoes] as EstatTopico['licoes'];
    est.melhor = [...est.melhor] as EstatTopico['melhor'];
    est.licoes[r.nivel]++;
    est.melhor[r.nivel] = Math.max(est.melhor[r.nivel], percentual);
    p.topicos[r.topicoId] = est;
    p.ultimoTopico = r.topicoId;
    if (r.nivel < 2 && !antes && nivelDesbloqueado(p, r.topicoId, (r.nivel + 1) as Nivel)) {
      desbloqueouNivel = (r.nivel + 1) as Nivel;
    }
    if (r.nivel === 2) p.licoesDificeis++;
  }
  if (r.modo === 'revisao') p.revisoesFeitas++;

  // Bônus
  let bonusDesafio = 0;
  if (r.modo === 'desafio' && !p.desafiosFeitos[dia]) {
    bonusDesafio = BONUS_DESAFIO;
    p.desafiosFeitos = { ...p.desafiosFeitos, [dia]: true };
  }
  const xp = r.xp + bonusDesafio + (perfeita ? BONUS_PERFEITA : 0);
  const metaAntes = (p.xpPorDia[dia] ?? 0) >= p.metaDiaria;
  const nivelAntes = nivelDoUsuario(p.xpTotal).nivel;
  p.xpTotal += xp;
  p.xpPorDia = { ...p.xpPorDia, [dia]: (p.xpPorDia[dia] ?? 0) + xp };
  const metaBatidaAgora = !metaAntes && p.xpPorDia[dia] >= p.metaDiaria;

  const moedasGanhas = 5 + (perfeita ? 5 : 0) + (metaBatidaAgora ? 10 : 0);
  p.moedas += moedasGanhas;
  p.totalLicoes++;
  if (perfeita) p.licoesPerfeitas++;
  p.comboRecorde = Math.max(p.comboRecorde, r.comboMax);

  // Ofensiva: estender ao concluir a primeira lição do dia
  let ofensivaAumentou = false;
  if (p.ofensiva.ultimoDia !== dia) {
    const continua = p.ofensiva.ultimoDia === somarDias(dia, -1);
    const atual = continua ? p.ofensiva.atual + 1 : 1;
    p.ofensiva = { atual, recorde: Math.max(p.ofensiva.recorde, atual), ultimoDia: dia };
    ofensivaAumentou = true;
  }

  // Conquistas
  const novasConquistas = CONQUISTAS.filter((c) => !p.conquistas[c.id] && c.ok(p));
  for (const c of novasConquistas) p.conquistas[c.id] = dia;

  return {
    p,
    ev: {
      ofensivaAumentou,
      metaBatidaAgora,
      subiuDeNivel: nivelDoUsuario(p.xpTotal).nivel > nivelAntes,
      novasConquistas,
      moedasGanhas,
      bonusDesafio,
      acertos,
      total,
      desbloqueouNivel,
    },
  };
}

export function xpDaResposta(q: Questao, combo: number, _modo?: Modo) {
  const base = XP_POR_NIVEL[q.n];
  const bonusCombo = combo >= 5 ? 5 : combo >= 3 ? 2 : 0;
  return Math.round(base + bonusCombo);
}

export function comprarProtetor(p: Progresso): Progresso | null {
  if (p.moedas < PRECO_PROTETOR || p.protetores >= MAX_PROTETORES) return null;
  return { ...p, moedas: p.moedas - PRECO_PROTETOR, protetores: p.protetores + 1 };
}

export function nomeDoTopico(topicoId: string) {
  return getTopico(topicoId)?.topico.titulo ?? topicoId;
}

function structuredCloneSeguro<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}
