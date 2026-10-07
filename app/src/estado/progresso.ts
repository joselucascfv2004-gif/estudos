// Regras de gamificação: XP, níveis, ofensiva, moedas, conquistas e montagem de lições.
// Funções puras — a persistência fica em ProgressoContext.tsx.

import {
  Lingua,
  Nivel,
  Questao,
  Topico,
  XP_POR_NIVEL,
  getQuestao,
  getTopico,
  incidencia,
  questoesDoTopico,
  topicosDaProva,
  topicosDaQuestao,
} from '../data/banco';
import { FormatoProva, getProva, provaDaTrilhaAntiga } from '../data/provas';
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
 * a devolve para a caixa 0 (volta numa revisão daqui a alguns dias, nunca no mesmo dia).
 */
/** Estatística de uma questão. `caixa` e `proxima` são da revisão antiga, por questão (até a versão 2). */
export type EstatQuestao = { acertos: number; erros: number; ultima: string; caixa?: number; proxima?: string };

/**
 * Revisão espaçada de um assunto. Quando o aluno erra, quem volta é o assunto, com questões que ele
 * ainda não viu (ou não vê há mais de um mês), no nível em que errou. `modelos` guarda os tipos de
 * questão gerada que ele errou, para a revisão trazer a mesma conta com outros números.
 */
export type RevisaoAssunto = { caixa: number; proxima: string; nivel: Nivel; modelos?: string[] };
export type EstatTopico = { licoes: [number, number, number]; melhor: [number, number, number] };

export type Salva = { nota: string; dia: string };

/** O que o aluno quer revisar com mais frequência. */
export type PrefRevisao = {
  /** nível que aparece mais nas revisões (null = todos iguais) */
  nivel: Nivel | null;
  /** matérias (ids de disciplina) */
  disciplinas: string[];
  /** assuntos (ids de tópico) */
  topicos: string[];
};
/** Redação escrita no app: texto, dia da última edição e a autoavaliação (0 a 200 por competência). */
export type Redacao = { tema: string; texto: string; dia: string; notas: (number | null)[]; segundos: number };
export type ResultadoSimulado = { dia: string; titulo: string; acertos: number; total: number; segundos: number };

export type Progresso = {
  versao: number;
  onboarding: boolean;
  nome: string;
  /** id da prova-alvo (ver data/provas.ts) */
  prova: string;
  /** campo antigo (versões anteriores), convertido em `prova` */
  trilha?: string;
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
  tema: 'claro' | 'escuro';
  /** Questões marcadas com estrela, com a anotação do aluno. */
  salvas: Record<string, Salva>;
  /** Revisão espaçada por assunto (id do tópico). */
  assuntos: Record<string, RevisaoAssunto>;
  /** Acertos por dia e disciplina: dia -> disciplina -> [acertos, respondidas]. */
  acertosDia: Record<string, Record<string, [number, number]>>;
  /** Tópicos estudados em cada dia (para o plano de estudos). */
  topicosDia: Record<string, string[]>;
  dataProva: string | null;
  nomeProva: string;
  simulados: ResultadoSimulado[];
  /** Plano do dia, gerado uma vez por dia para não mudar enquanto o aluno estuda. */
  planoDia: { dia: string; topicos: string[] } | null;
  /** Língua estrangeira estudada quando a prova tem inglês e espanhol. */
  lingua: Lingua;
  prefRevisao: PrefRevisao;
  /** Redações por tema (id do tema). */
  redacoes: Record<string, Redacao>;
  /** Recordes dos jogos, por jogo e modo (ex.: "calculo:relogio:misto:1"). */
  jogos: Record<string, RecordeJogo>;
};

export type RecordeJogo = { recorde: number; partidas: number };

export function estadoInicial(): Progresso {
  return {
    versao: 3,
    onboarding: false,
    nome: '',
    prova: 'enem',
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
    tema: 'claro',
    salvas: {},
    assuntos: {},
    acertosDia: {},
    topicosDia: {},
    dataProva: null,
    nomeProva: '',
    simulados: [],
    planoDia: null,
    lingua: 'ingles',
    prefRevisao: { nivel: null, disciplinas: [], topicos: [] },
    redacoes: {},
    jogos: {},
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
    prefRevisao: { ...base.prefRevisao, ...salvo.prefRevisao },
  } as Progresso;
  if (!salvo.prova) p.prova = provaDaTrilhaAntiga(salvo.trilha ?? 'ENEM');
  delete p.trilha;
  if (!salvo.lingua) p.lingua = linguaJaEstudada(p.questoes);
  const v2 = (salvo.versao ?? 1) < 2 ? migrarParaV2(p) : p;
  return v2.versao < 3 ? migrarParaV3(v2) : v2;
}

/** Para quem já usava o app antes da escolha da língua: fica a que tiver mais respostas. */
function linguaJaEstudada(questoes: Record<string, EstatQuestao>): Lingua {
  let ingles = 0;
  let espanhol = 0;
  for (const [id, e] of Object.entries(questoes)) {
    if (id.startsWith('ingles/')) ingles += e.acertos + e.erros;
    else if (id.startsWith('espanhol/')) espanhol += e.acertos + e.erros;
  }
  return espanhol > ingles ? 'espanhol' : 'ingles';
}

/** Assuntos que o aluno estuda: os da prova-alvo, com a língua estrangeira escolhida. */
export function topicosDoAluno(p: Progresso): Topico[] {
  return topicosDaProva(p.prova, p.lingua);
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

/**
 * Versão 3: a revisão passa a ser por assunto. Cada assunto herda a revisão mais próxima das suas
 * questões (e a caixa mais baixa); as datas por questão deixam de existir.
 */
function migrarParaV3(p: Progresso): Progresso {
  const assuntos: Record<string, RevisaoAssunto> = { ...p.assuntos };
  const questoes: Record<string, EstatQuestao> = {};
  for (const [id, e] of Object.entries(p.questoes)) {
    const { caixa, proxima, ...resto } = e;
    questoes[id] = resto;
    const t = assuntoDaQuestao(id);
    if (!t || !proxima) continue;
    const n = getQuestao(id)?.questao.n ?? 0;
    const atual = assuntos[t];
    const errada = (caixa ?? 0) === 0;
    if (!atual) assuntos[t] = { caixa: Math.min(caixa ?? 0, MAX_CAIXA), proxima, nivel: n };
    else
      assuntos[t] = {
        caixa: Math.min(atual.caixa, caixa ?? 0),
        proxima: proxima < atual.proxima ? proxima : atual.proxima,
        nivel: errada ? Math.min(atual.nivel, n) as Nivel : atual.nivel,
      };
  }
  return { ...p, versao: 3, questoes, assuntos };
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

/**
 * Intervalo base (em dias) de cada caixa da revisão de um assunto. A caixa 0 é a de quem errou: o
 * assunto volta já no dia seguinte. Cada revisão bem-feita passa o assunto para a caixa seguinte,
 * e o intervalo cresce (1, 3, 7, 14, 30 e 60 dias), como pede a prática espaçada.
 */
export const INTERVALOS = [1, 3, 7, 14, 30, 60];
const MAX_CAIXA = INTERVALOS.length - 1;

/** Uma questão respondida só volta depois deste prazo (a não ser que o assunto não tenha outra). */
export const QUARENTENA_DIAS = 30;

/** Acerto mínimo numa lição para o assunto subir de caixa mesmo com algum erro. */
const ACERTO_PARA_AVANCAR = 0.8;

/**
 * Quanto o aluno quer rever este assunto: 1 é o normal; matérias, assuntos e nível escolhidos nas
 * preferências de revisão valem mais (voltam antes e aparecem mais nas revisões), e os pontos
 * fracos também.
 */
export function pesoAssunto(p: Progresso, topicoId: string): number {
  const pref = p.prefRevisao;
  let peso = 1;
  if (pref.topicos.includes(topicoId) || pref.disciplinas.includes(topicoId.split('/')[0])) peso *= 2;
  if (pref.nivel != null && p.assuntos[topicoId]?.nivel === pref.nivel) peso *= 1.5;
  if (ehPontoFraco(desempenhoTopico(p, topicoId))) peso *= 1.5;
  return peso;
}

/**
 * Próxima revisão de um assunto depois de uma lição em que ele apareceu. Errou pouco (até 20%)? O
 * assunto desce uma caixa. Errou mais? Volta para a caixa 0 (amanhã). Acertou tudo? Sobe uma caixa.
 * O dia varia um pouco (80% a 130% do intervalo), para as revisões misturarem assuntos de dias
 * diferentes; `peso` > 1 (preferências, ponto fraco) encurta o intervalo.
 */
export function agendarAssunto(
  anterior: RevisaoAssunto | undefined,
  acertos: number,
  total: number,
  dia: string,
  peso = 1,
  sorteio: () => number = Math.random,
): Pick<RevisaoAssunto, 'caixa' | 'proxima'> {
  const atual = anterior?.caixa ?? 0;
  const caixa =
    acertos === total
      ? Math.min(MAX_CAIXA, anterior ? atual + 1 : 1)
      : acertos / total >= ACERTO_PARA_AVANCAR && anterior
        ? Math.max(0, atual - 1)
        : 0;
  const dias = Math.max(1, Math.round((INTERVALOS[caixa] / peso) * (0.8 + sorteio() * 0.5)));
  return { caixa, proxima: somarDias(dia, dias) };
}

/**
 * Assunto ao qual a questão "pertence" para medir desempenho: nas questões oficiais do ENEM, o
 * assunto em que ela foi classificada (ex.: matemática/porcentagem), e não o arquivo da prova.
 */
export function assuntoDaQuestao(id: string): string | undefined {
  const topicos = topicosDaQuestao(id);
  return topicos.find((t) => !t.startsWith('enem-oficial/')) ?? topicos[0] ?? getQuestao(id)?.topicoId;
}

/** Assuntos com revisão agendada que são da prova do aluno (prova-alvo e língua escolhida). */
function assuntosAgendados(p: Progresso): [string, RevisaoAssunto][] {
  const doAluno = new Set(topicosDoAluno(p).map((t) => t.id));
  return Object.entries(p.assuntos).filter(([t]) => doAluno.has(t));
}

/** Assuntos cuja revisão venceu, dos mais atrasados (e menos firmes) para os mais recentes. */
export function revisoesPendentes(p: Progresso, dia = hoje()): string[] {
  return assuntosAgendados(p)
    .filter(([t, r]) => r.proxima <= dia && !estudouTopicoHoje(p, t, dia))
    .sort(([, a], [, b]) => (a.proxima < b.proxima ? -1 : a.proxima > b.proxima ? 1 : a.caixa - b.caixa))
    .map(([t]) => t);
}

/** Próximo dia com revisões agendadas (depois de hoje) e quantos assuntos vencem nele. */
export function proximaRevisao(p: Progresso, dia = hoje()): { dia: string; quantidade: number } | null {
  let menor: string | null = null;
  let quantidade = 0;
  for (const [, r] of assuntosAgendados(p)) {
    if (r.proxima <= dia) continue;
    if (menor == null || r.proxima < menor) {
      menor = r.proxima;
      quantidade = 1;
    } else if (r.proxima === menor) quantidade++;
  }
  return menor ? { dia: menor, quantidade } : null;
}

/** Sorteia `quantidade` itens sem repetir, com chance proporcional ao peso de cada um. */
function sortearComPeso<T>(itens: { item: T; peso: number }[], quantidade: number, sorteio: () => number = Math.random): T[] {
  const restantes = [...itens];
  const escolhidos: T[] = [];
  while (escolhidos.length < quantidade && restantes.length) {
    const total = restantes.reduce((s, x) => s + x.peso, 0);
    let alvo = sorteio() * total;
    let i = 0;
    while (i < restantes.length - 1 && alvo >= restantes[i].peso) alvo -= restantes[i++].peso;
    escolhidos.push(restantes.splice(i, 1)[0].item);
  }
  return escolhidos;
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

const ehPontoFraco = (d: Desempenho) => d.respostas >= MIN_RESPOSTAS_AVALIAR && d.acerto < LIMITE_PONTO_FRACO;

/** Tópicos da prova com acerto recente abaixo do limite, do pior para o melhor. */
export function pontosFracos(p: Progresso): Desempenho[] {
  return topicosDoAluno(p)
    .map((t) => desempenhoTopico(p, t.id))
    .filter(ehPontoFraco)
    .sort((a, b) => a.acerto - b.acerto || b.respostas - a.respostas);
}

export type Dificuldade = {
  topicoId: string;
  /** respostas e erros de todas as vezes (cada questão conta todas as tentativas) */
  respostas: number;
  erros: number;
  /** percentual de acerto geral e nas últimas questões */
  acerto: number;
  recente: number | null;
  /** questões que o aluno já errou mais de uma vez */
  teimosas: number;
  /** -1 piorando, 0 estável, 1 melhorando (recente comparado ao geral) */
  tendencia: -1 | 0 | 1;
};

/**
 * Relatório de dificuldades: para cada assunto já praticado, quanto o aluno erra no geral e nas
 * últimas questões. Ordena do mais difícil para o mais fácil (usa o acerto recente quando há
 * respostas suficientes, senão o geral).
 */
export function dificuldades(p: Progresso): Dificuldade[] {
  const porTopico = new Map<string, { respostas: number; erros: number; teimosas: number }>();
  for (const [id, e] of Object.entries(p.questoes)) {
    const topicoId = assuntoDaQuestao(id);
    if (!topicoId) continue;
    const t = porTopico.get(topicoId) ?? { respostas: 0, erros: 0, teimosas: 0 };
    t.respostas += e.acertos + e.erros;
    t.erros += e.erros;
    if (e.erros >= 2) t.teimosas++;
    porTopico.set(topicoId, t);
  }
  const lista: Dificuldade[] = [];
  for (const [topicoId, t] of porTopico) {
    if (!t.respostas) continue;
    const acerto = Math.round(((t.respostas - t.erros) / t.respostas) * 100);
    const d = desempenhoTopico(p, topicoId);
    const recente = d.respostas >= MIN_RESPOSTAS_AVALIAR ? d.acerto : null;
    const tendencia = recente == null || Math.abs(recente - acerto) < 10 ? 0 : recente > acerto ? 1 : -1;
    lista.push({ topicoId, ...t, acerto, recente, tendencia });
  }
  const nota = (d: Dificuldade) => d.recente ?? d.acerto;
  return lista.sort((a, b) => nota(a) - nota(b) || b.erros - a.erros);
}

/** Quantos assuntos têm revisão em cada um dos próximos `dias` dias (o de hoje inclui os atrasados). */
export function calendarioRevisoes(p: Progresso, dias = 14, dia = hoje()): { dia: string; quantidade: number }[] {
  const fim = somarDias(dia, dias - 1);
  const contagem = new Map<string, number>();
  for (const [t, r] of assuntosAgendados(p)) {
    // o que venceu antes de hoje cai hoje; o que já foi estudado hoje, amanhã
    let quando = r.proxima < dia ? dia : r.proxima;
    if (quando === dia && estudouTopicoHoje(p, t, dia)) quando = somarDias(dia, 1);
    if (quando > fim) continue;
    contagem.set(quando, (contagem.get(quando) ?? 0) + 1);
  }
  return Array.from({ length: dias }, (_, i) => {
    const d = somarDias(dia, i);
    return { dia: d, quantidade: contagem.get(d) ?? 0 };
  });
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

// ---------- Plano de estudos ----------

const iniciado = (p: Progresso, topicoId: string) => !!p.topicos[topicoId] || !!p.recentes[topicoId];

/** Máximo de assuntos novos por dia no plano. */
export const MAX_ASSUNTOS_DIA = 4;

/** Dias de estudo até a prova, reservando a última semana para revisão (null sem prazo). */
function diasDeEstudo(p: Progresso, dia: string): number | null {
  if (!p.dataProva) return null;
  const dias = diferencaDias(dia, p.dataProva);
  if (dias <= 0) return 0;
  return dias > 14 ? dias - 7 : dias;
}

/** Quantos assuntos por dia o aluno precisa ver para passar por todos antes da prova. */
export function assuntosPorDia(p: Progresso, dia = hoje()): number {
  const faltam = topicosDoAluno(p).filter((t) => !iniciado(p, t.id)).length;
  const uteis = diasDeEstudo(p, dia);
  if (uteis == null) return faltam ? 1 : 0;
  if (uteis <= 0) return 0;
  return Math.min(MAX_ASSUNTOS_DIA, Math.max(faltam ? 1 : 0, Math.ceil(faltam / uteis)));
}

export type Cobertura = { total: number; vistos: number; cabem: number; diasDeEstudo: number; porDia: number };

/** Quantos assuntos da prova ainda cabem no prazo, no ritmo do plano (null sem prazo). */
export function coberturaPrazo(p: Progresso, dia = hoje()): Cobertura | null {
  const uteis = diasDeEstudo(p, dia);
  if (uteis == null) return null;
  const topicos = topicosDoAluno(p);
  const faltam = topicos.filter((t) => !iniciado(p, t.id)).length;
  const porDia = assuntosPorDia(p, dia);
  return { total: topicos.length, vistos: topicos.length - faltam, cabem: Math.min(faltam, uteis * porDia), diasDeEstudo: uteis, porDia };
}

/**
 * Escolhe os assuntos do dia: primeiro os nunca estudados, começando pelos que mais caem na prova
 * (e alternando as disciplinas); depois, os menos dominados.
 */
export function gerarPlano(p: Progresso, dia = hoje()): string[] {
  const quantidade = Math.max(1, assuntosPorDia(p, dia));
  const fraco = pontosFracos(p)[0]?.topicoId;
  const topicos = topicosDoAluno(p);
  // na revisão de um curso de faculdade, as disciplinas do próprio curso vêm antes das de apoio (português, matemática...)
  const faculdade = getProva(p.prova).grupo === 'Faculdade';
  const peso = new Map(topicos.map((t) => [t.id, incidencia(t) + (faculdade && t.provas.includes('Faculdade') ? 1 : 0)]));
  const porDisciplina = new Map<string, string[]>();
  for (const t of topicos) {
    const disc = t.id.split('/')[0];
    porDisciplina.set(disc, [...(porDisciplina.get(disc) ?? []), t.id]);
  }
  // intercala as disciplinas: 1º tópico de cada uma, depois o 2º de cada uma...
  const intercalados: string[] = [];
  const listas = [...porDisciplina.values()];
  for (let i = 0; intercalados.length < topicos.length; i++) {
    for (const l of listas) if (l[i]) intercalados.push(l[i]);
  }
  // os assuntos que mais caem vêm primeiro (a ordenação é estável e mantém a alternância)
  intercalados.sort((a, b) => (peso.get(b) ?? 3) - (peso.get(a) ?? 3));
  const novos = intercalados.filter((id) => !iniciado(p, id) && id !== fraco);
  const escolhidos = novos.slice(0, quantidade);
  if (escolhidos.length < quantidade) {
    const revisar = intercalados
      .filter((id) => iniciado(p, id) && id !== fraco)
      .sort((a, b) => dominioTopico(p, a) - dominioTopico(p, b) || (peso.get(b) ?? 3) - (peso.get(a) ?? 3));
    escolhidos.push(...revisar.slice(0, quantidade - escolhidos.length));
  }
  return escolhidos;
}

/** Nível em que o aluno deve continuar um tópico: o primeiro liberado que ainda não foi dominado. */
export function nivelSugerido(p: Progresso, topicoId: string): Nivel {
  for (const n of [0, 1, 2] as Nivel[]) {
    if (!nivelDesbloqueado(p, topicoId, n)) return Math.max(0, n - 1) as Nivel;
    if ((p.topicos[topicoId]?.melhor[n] ?? 0) < ACERTO_PARA_DESBLOQUEAR) return n;
  }
  return 2;
}

export const estudouTopicoHoje = (p: Progresso, topicoId: string, dia = hoje()) => (p.topicosDia[dia] ?? []).includes(topicoId);

// ---------- Evolução ----------

export type Semana = { inicio: string; acertos: number; total: number };

function somarPeriodo(p: Progresso, inicio: string, fim: string, disciplinaId?: string): [number, number] {
  let a = 0;
  let t = 0;
  for (const [d, porDisc] of Object.entries(p.acertosDia)) {
    if (d < inicio || d > fim) continue;
    for (const [disc, [ac, tot]] of Object.entries(porDisc)) {
      if (disciplinaId && disc !== disciplinaId) continue;
      a += ac;
      t += tot;
    }
  }
  return [a, t];
}

/** Acertos das últimas semanas (da mais antiga para a atual). */
export function evolucaoSemanal(p: Progresso, semanas = 8, dia = hoje()): Semana[] {
  return Array.from({ length: semanas }, (_, i) => {
    const fim = somarDias(dia, -7 * (semanas - 1 - i));
    const inicio = somarDias(fim, -6);
    const [acertos, total] = somarPeriodo(p, inicio, fim);
    return { inicio, acertos, total };
  });
}

export type EvolucaoDisciplina = { disciplinaId: string; atual: number | null; anterior: number | null; respostas: number };

/** Acerto das últimas 4 semanas comparado com as 4 anteriores, por disciplina estudada. */
export function evolucaoDisciplinas(p: Progresso, dia = hoje()): EvolucaoDisciplina[] {
  const discs = new Set<string>();
  for (const porDisc of Object.values(p.acertosDia)) for (const d of Object.keys(porDisc)) discs.add(d);
  const pct = ([a, t]: [number, number]) => (t ? Math.round((a / t) * 100) : null);
  return [...discs]
    .map((disciplinaId) => {
      const atual = somarPeriodo(p, somarDias(dia, -27), dia, disciplinaId);
      const anterior = somarPeriodo(p, somarDias(dia, -55), somarDias(dia, -28), disciplinaId);
      return { disciplinaId, atual: pct(atual), anterior: pct(anterior), respostas: atual[1] };
    })
    .filter((e) => e.respostas > 0)
    .sort((a, b) => b.respostas - a.respostas);
}

// ---------- Montagem de lições ----------

export type Modo = 'topico' | 'desafio' | 'revisao' | 'treino' | 'fracos' | 'salvas' | 'simulado';

/** A questão foi respondida há menos de um mês (ou hoje)? */
export function vistaRecente(p: Progresso, id: string, dia = hoje()): boolean {
  const e = p.questoes[id];
  return !!e && diferencaDias(e.ultima, dia) < QUARENTENA_DIAS;
}

/**
 * Ordem de prioridade das questões de uma lição: primeiro as nunca vistas (sorteadas), depois as
 * vistas há mais de um mês (das mais antigas para as mais novas). As vistas no último mês só entram
 * se não houver outra — ou seja, quando o aluno já fez todas as questões daquele assunto e nível.
 * Assim ele treina o assunto, e não a memória da alternativa certa.
 */
function ordenarPorNovidade(p: Progresso, qs: Questao[], dia = hoje()): { novas: Questao[]; recentes: Questao[] } {
  const nunca: Questao[] = [];
  const antigas: Questao[] = [];
  const recentes: Questao[] = [];
  for (const q of qs) {
    if (!p.questoes[q.id]) nunca.push(q);
    else if (vistaRecente(p, q.id, dia)) recentes.push(q);
    else antigas.push(q);
  }
  const maisAntigas = (a: Questao, b: Questao) => (p.questoes[a.id].ultima < p.questoes[b.id].ultima ? -1 : 1);
  return { novas: [...embaralhar(nunca), ...antigas.sort(maisAntigas)], recentes: recentes.sort(maisAntigas) };
}

/** Prioriza questões novas para o aluno; as vistas no último mês ficam por último (só se faltar). */
function priorizar(p: Progresso, qs: Questao[], quantidade: number, dia = hoje(), aceitarRecentes = true): Questao[] {
  const { novas, recentes } = ordenarPorNovidade(p, qs, dia);
  return semModeloRepetido(aceitarRecentes ? [...novas, ...recentes] : novas, quantidade);
}

/**
 * Escolhe `quantidade` questões na ordem de prioridade, evitando duas do mesmo modelo de enunciado
 * na mesma lição (só repete modelo se não houver outra opção). Uma questão oficial classificada em
 * mais de um assunto aparece uma vez só.
 */
export function semModeloRepetido(qs: Questao[], quantidade: number): Questao[] {
  const escolhidas: Questao[] = [];
  const modelos = new Set<string>();
  const ids = new Set<string>();
  const adiadas: Questao[] = [];
  for (const q of qs) {
    if (escolhidas.length >= quantidade) break;
    if (ids.has(q.id)) continue;
    ids.add(q.id);
    const chave = q.m ? `${q.id.split('#')[0]}~${q.m}` : null;
    if (chave && modelos.has(chave)) {
      adiadas.push(q);
      continue;
    }
    if (chave) modelos.add(chave);
    escolhidas.push(q);
  }
  for (const q of adiadas) {
    if (escolhidas.length >= quantidade) break;
    escolhidas.push(q);
  }
  return escolhidas;
}

export function montarLicaoTopico(p: Progresso, topicoId: string, nivel: Nivel): Questao[] {
  return embaralhar(priorizar(p, questoesDoTopico(topicoId, nivel), TAMANHO_LICAO));
}

export function montarDesafio(p: Progresso): Questao[] {
  const topicos = embaralhar(topicosDoAluno(p));
  const escolhidas: Questao[] = [];
  const usadas = new Set<string>();
  // nível proporcional ao avanço do aluno: mais difícil conforme ganha XP
  const { nivel } = nivelDoUsuario(p.xpTotal);
  // primeiro só questões novas para o aluno; se faltar, aceita as vistas no último mês
  for (const aceitarRecentes of [false, true]) {
    for (const t of topicos) {
      if (escolhidas.length >= TAMANHO_LICAO) break;
      const r = Math.random() * 10;
      const n: Nivel = r < Math.max(2, 6 - nivel / 2) ? 0 : r < 8 ? 1 : 2;
      const [q] = priorizar(p, questoesDoTopico(t.id, n).filter((x) => !usadas.has(x.id)), 1, hoje(), aceitarRecentes);
      if (q) {
        usadas.add(q.id);
        escolhidas.push(q);
      }
    }
  }
  return escolhidas;
}

/** Níveis do assunto que o aluno já pode fazer, começando pelo `nivel` pedido e indo para os vizinhos. */
function niveisPerto(p: Progresso, topicoId: string, nivel: Nivel): Nivel[] {
  const ordem: Nivel[] = nivel === 0 ? [0, 1, 2] : nivel === 1 ? [1, 0, 2] : [2, 1, 0];
  const liberados = ordem.filter((n) => nivelDesbloqueado(p, topicoId, n));
  return liberados.length ? liberados : [0];
}

/**
 * Questões para rever um assunto, da melhor para a pior escolha: o mesmo tipo de conta que o aluno
 * errou (questões geradas, com outros números), depois questões novas do nível em que ele errou,
 * depois as dos níveis vizinhos. As vistas no último mês ficam no fim (só se o assunto acabar).
 */
function questoesParaRever(p: Progresso, topicoId: string, dia = hoje()): Questao[] {
  const r = p.assuntos[topicoId];
  const niveis = niveisPerto(p, topicoId, r?.nivel ?? nivelSugerido(p, topicoId));
  const modelos = new Set(r?.modelos ?? []);
  const doModelo: Questao[] = [];
  const novas: Questao[] = [];
  const recentes: Questao[] = [];
  for (const n of niveis) {
    const ordem = ordenarPorNovidade(p, questoesDoTopico(topicoId, n), dia);
    for (const q of ordem.novas) (q.m && modelos.has(chaveModelo(q)) ? doModelo : novas).push(q);
    recentes.push(...ordem.recentes);
  }
  return [...doModelo, ...novas, ...recentes];
}

const chaveModelo = (q: Questao) => `${q.id.split('#')[0]}~${q.m}`;

/**
 * Junta questões de vários assuntos, uma de cada por vez (prática intercalada), sem repetir questão
 * nem modelo de enunciado, até `quantidade`. Cada assunto entra com no máximo `porAssunto`.
 */
function intercalar(listas: Questao[][], quantidade: number, porAssunto = quantidade): Questao[] {
  const escolhidas: Questao[] = [];
  const ids = new Set<string>();
  const modelos = new Set<string>();
  const posicao = listas.map(() => 0);
  const usadas = listas.map(() => 0);
  let mexeu = true;
  while (escolhidas.length < quantidade && mexeu) {
    mexeu = false;
    for (let i = 0; i < listas.length && escolhidas.length < quantidade; i++) {
      if (usadas[i] >= porAssunto) continue;
      while (posicao[i] < listas[i].length) {
        const q = listas[i][posicao[i]++];
        if (ids.has(q.id) || (q.m && modelos.has(chaveModelo(q)))) continue;
        ids.add(q.id);
        if (q.m) modelos.add(chaveModelo(q));
        escolhidas.push(q);
        usadas[i]++;
        mexeu = true;
        break;
      }
    }
  }
  return escolhidas;
}

/** Assuntos já estudados (com revisão agendada) que ainda não venceram: servem para a revisão surpresa. */
function assuntosParaAdiantar(p: Progresso, dia: string, excluir: Set<string>): { item: string; peso: number }[] {
  return assuntosAgendados(p)
    .filter(([t, r]) => !excluir.has(t) && r.proxima > dia && !estudouTopicoHoje(p, t, dia))
    .map(([t, r]) => ({ item: t, peso: pesoAssunto(p, t) * (MAX_CAIXA + 1 - r.caixa) }));
}

/**
 * Revisão: o que volta são os ASSUNTOS em que o aluno errou, com questões que ele ainda não viu
 * (prática de recuperação com itens novos), e não a mesma questão, cuja resposta ele já leu. Os
 * assuntos vêm misturados (prática intercalada), de 2 a 4 questões cada. Se houver menos de três
 * assuntos vencidos, completa com assuntos já estudados (revisão surpresa, adiantada).
 */
export function montarRevisao(p: Progresso, dia = hoje(), sorteio: () => number = Math.random): Questao[] {
  const pendentes = revisoesPendentes(p, dia);
  const peso = (t: string) => pesoAssunto(p, t) ** 2 * ((p.assuntos[t]?.caixa ?? 0) === 0 ? 2 : 1);
  let assuntos = sortearComPeso(pendentes.map((t) => ({ item: t, peso: peso(t) })), 5, sorteio);
  if (assuntos.length < 3) assuntos = [...assuntos, ...sortearComPeso(assuntosParaAdiantar(p, dia, new Set(assuntos)), 3 - assuntos.length, sorteio)];
  if (!assuntos.length) return [];
  const porAssunto = Math.max(2, Math.ceil(TAMANHO_LICAO / assuntos.length));
  return embaralhar(intercalar(assuntos.map((t) => questoesParaRever(p, t, dia)), TAMANHO_LICAO, porAssunto));
}

/** Quantos assuntos a revisão surpresa pode adiantar (se não houver revisão vencida). */
export function tamanhoRevisao(p: Progresso, dia = hoje()): number {
  return assuntosParaAdiantar(p, dia, new Set()).length;
}

/**
 * Lição focada nos pontos fracos (ou em um assunto específico): questões NOVAS desses assuntos,
 * começando pelo tipo de questão que o aluno errou, misturando até três assuntos.
 */
export function montarPontosFracos(p: Progresso, topicoId?: string, dia = hoje()): Questao[] {
  const ids = topicoId ? [topicoId] : pontosFracos(p).slice(0, 3).map((d) => d.topicoId);
  return embaralhar(intercalar(ids.map((t) => questoesParaRever(p, t, dia)), TAMANHO_LICAO));
}

export function montarTreino(p: Progresso, disciplinaId?: string): Questao[] {
  const topicos = topicosDoAluno(p).filter((t) => !disciplinaId || t.id.startsWith(disciplinaId + '/'));
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

export type Conquista = { id: string; titulo: string; descricao: string; icone: string; ok: (p: Progresso) => boolean };

const respondidas = (p: Progresso) => Object.values(p.questoes).reduce((s, q) => s + q.acertos + q.erros, 0);
const disciplinasEstudadas = (p: Progresso) =>
  new Set(Object.keys(p.questoes).map((id) => id.split('/')[0])).size;

export const CONQUISTAS: Conquista[] = [
  { id: 'primeira', icone: 'sprout-outline', titulo: 'Primeiro passo', descricao: 'Conclua sua primeira lição', ok: (p) => p.totalLicoes >= 1 },
  { id: 'perfeita', icone: 'target', titulo: 'Gabaritou!', descricao: 'Acerte todas as questões de uma lição', ok: (p) => p.licoesPerfeitas >= 1 },
  { id: 'ofensiva3', icone: 'fire', titulo: 'Esquentando', descricao: 'Ofensiva de 3 dias', ok: (p) => p.ofensiva.recorde >= 3 },
  { id: 'ofensiva7', icone: 'calendar-check-outline', titulo: 'Uma semana firme', descricao: 'Ofensiva de 7 dias', ok: (p) => p.ofensiva.recorde >= 7 },
  { id: 'ofensiva30', icone: 'trophy-outline', titulo: 'Hábito criado', descricao: 'Ofensiva de 30 dias', ok: (p) => p.ofensiva.recorde >= 30 },
  { id: 'ofensiva100', icone: 'trophy-award', titulo: 'Imparável', descricao: 'Ofensiva de 100 dias', ok: (p) => p.ofensiva.recorde >= 100 },
  { id: 'q100', icone: 'pencil-outline', titulo: 'Centena', descricao: 'Responda 100 questões', ok: (p) => respondidas(p) >= 100 },
  { id: 'q500', icone: 'run-fast', titulo: 'Maratonista', descricao: 'Responda 500 questões', ok: (p) => respondidas(p) >= 500 },
  { id: 'q1000', icone: 'brain', titulo: 'Mil questões', descricao: 'Responda 1.000 questões', ok: (p) => respondidas(p) >= 1000 },
  { id: 'xp5000', icone: 'lightning-bolt', titulo: 'Energia pura', descricao: 'Acumule 5.000 XP', ok: (p) => p.xpTotal >= 5000 },
  { id: 'xp50000', icone: 'rocket-launch-outline', titulo: 'Rumo à aprovação', descricao: 'Acumule 50.000 XP', ok: (p) => p.xpTotal >= 50000 },
  { id: 'dificil', icone: 'arm-flex-outline', titulo: 'Destemido', descricao: 'Conclua uma lição de nível difícil', ok: (p) => p.licoesDificeis >= 1 },
  { id: 'revisao', icone: 'refresh', titulo: 'Aprendendo com os erros', descricao: 'Conclua uma revisão', ok: (p) => p.revisoesFeitas >= 1 },
  { id: 'revisao20', icone: 'memory', titulo: 'Memória de elefante', descricao: 'Conclua 20 revisões', ok: (p) => p.revisoesFeitas >= 20 },
  { id: 'combo10', icone: 'fire-circle', titulo: 'Em chamas', descricao: 'Acerte 10 questões seguidas', ok: (p) => p.comboRecorde >= 10 },
  { id: 'explorador', icone: 'compass-outline', titulo: 'Explorador', descricao: 'Estude 5 disciplinas diferentes', ok: (p) => disciplinasEstudadas(p) >= 5 },
  { id: 'poliglota', icone: 'earth', titulo: 'Enciclopédia', descricao: 'Estude 12 disciplinas diferentes', ok: (p) => disciplinasEstudadas(p) >= 12 },
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
  /** assuntos em que o aluno errou alguma questão nesta lição (voltam na revisão) */
  assuntosErrados: string[];
};

export function concluirLicao(anterior: Progresso, r: ResumoLicao, dia = hoje()): { p: Progresso; ev: EventosLicao } {
  const p: Progresso = structuredCloneSeguro(anterior);
  const acertos = r.respostas.filter((x) => x.acertou).length;
  const total = r.respostas.length;
  const perfeita = total > 0 && acertos === total;
  const percentual = total ? Math.round((acertos / total) * 100) : 0;

  // Estatísticas das questões e desempenho recente por assunto
  const porAssunto = new Map<string, { acertos: number; total: number; niveis: Nivel[]; errados: Nivel[]; modelos: string[] }>();
  for (const { id, acertou } of r.respostas) {
    const e = p.questoes[id] ?? { acertos: 0, erros: 0, ultima: dia };
    p.questoes[id] = { acertos: e.acertos + (acertou ? 1 : 0), erros: e.erros + (acertou ? 0 : 1), ultima: dia };
    const topicoId = assuntoDaQuestao(id);
    if (topicoId) {
      const q = getQuestao(id)?.questao;
      const ag = porAssunto.get(topicoId) ?? { acertos: 0, total: 0, niveis: [], errados: [], modelos: [] };
      ag.total++;
      if (acertou) ag.acertos++;
      if (q) {
        ag.niveis.push(q.n);
        if (!acertou) ag.errados.push(q.n);
        if (!acertou && q.m) ag.modelos.push(chaveModelo(q));
      }
      porAssunto.set(topicoId, ag);
      p.recentes[topicoId] = ((p.recentes[topicoId] ?? '') + (acertou ? '1' : '0')).slice(-JANELA_RECENTE);
      const disc = topicoId.split('/')[0];
      const doDia = (p.acertosDia[dia] = { ...(p.acertosDia[dia] ?? {}) });
      const [a, t] = doDia[disc] ?? [0, 0];
      doDia[disc] = [a + (acertou ? 1 : 0), t + 1];
      const estudados = new Set(p.topicosDia[dia] ?? []);
      estudados.add(topicoId);
      p.topicosDia[dia] = [...estudados];
    }
  }
  if (r.topicoId) p.topicosDia[dia] = [...new Set([...(p.topicosDia[dia] ?? []), r.topicoId])];

  // Revisão espaçada por assunto: errou, o assunto volta logo (com questões novas, no nível do erro)
  p.assuntos = { ...p.assuntos };
  for (const [t, a] of porAssunto) {
    const anterior = p.assuntos[t];
    const nivel = (a.errados.length ? Math.min(...a.errados) : Math.max(...(a.niveis.length ? a.niveis : [0]))) as Nivel;
    p.assuntos[t] = {
      ...agendarAssunto(anterior, a.acertos, a.total, dia, pesoAssunto(p, t)),
      nivel,
      modelos: a.modelos.length ? [...new Set(a.modelos)].slice(0, 5) : undefined,
    };
    if (!p.assuntos[t].modelos) delete p.assuntos[t].modelos;
  }
  const errados = [...porAssunto].filter(([, a]) => a.acertos < a.total).map(([t]) => t);
  p.acertosDia = manterUltimosDias(p.acertosDia, dia);
  p.topicosDia = manterUltimosDias(p.topicosDia, dia);

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
      assuntosErrados: errados,
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

/** Guarda só os últimos 180 dias de histórico, para não crescer sem limite. */
function manterUltimosDias<T>(registro: Record<string, T>, dia: string, dias = 180): Record<string, T> {
  const limite = somarDias(dia, -dias);
  return Object.fromEntries(Object.entries(registro).filter(([d]) => d > limite));
}

/** Minutos por questão no simulado (média do ENEM: cerca de 3 minutos). */
export const MINUTOS_POR_QUESTAO = 3;

/**
 * Monta um simulado: questões de todos os tópicos da prova (ou de uma disciplina), com cerca de
 * 30% fáceis, 40% médias e 30% difíceis, espalhadas entre os tópicos.
 */
export function montarSimulado(p: Progresso, quantidade: number, disciplinaId?: string): Questao[] {
  const topicos = topicosDoAluno(p).filter((t) => !disciplinaId || t.id.startsWith(disciplinaId + '/'));
  return sortearQuestoes(p, topicos, quantidade, new Set());
}

/**
 * Sorteia `quantidade` questões espalhadas entre os tópicos, com cerca de 30% fáceis, 40% médias e
 * 30% difíceis, sem repetir questões já usadas.
 */
function sortearQuestoes(p: Progresso, lista: Topico[], quantidade: number, usadas: Set<string>): Questao[] {
  const topicos = embaralhar(lista);
  if (!topicos.length || quantidade <= 0) return [];
  const faceis = Math.round(quantidade * 0.3);
  const dificeis = Math.round(quantidade * 0.3);
  const niveis: Nivel[] = embaralhar([
    ...Array<Nivel>(faceis).fill(0),
    ...Array<Nivel>(quantidade - faceis - dificeis).fill(1),
    ...Array<Nivel>(dificeis).fill(2),
  ]);
  const escolhidas: Questao[] = [];
  // primeira passada só com questões novas para o aluno; a segunda aceita as vistas no último mês
  for (const aceitarRecentes of [false, true]) {
    for (let i = 0; i < niveis.length * 4 && escolhidas.length < quantidade; i++) {
      const t = topicos[i % topicos.length];
      const nivel = niveis[escolhidas.length];
      const livres = questoesDoTopico(t.id, nivel).filter((q) => !usadas.has(q.id));
      const [q] = priorizar(p, livres, 1, hoje(), aceitarRecentes);
      if (q) {
        usadas.add(q.id);
        escolhidas.push(q);
      }
    }
  }
  return escolhidas;
}

/**
 * Simulado no formato do exame oficial: cada parte da prova tem o mesmo número de questões do
 * exame de verdade (por exemplo, 14 de Matemática na ESA). As partes ficam em sequência, como no
 * caderno de prova. Uma parte pode citar tópicos ("cpa/renda-fixa") ou uma disciplina inteira
 * ("fisica"); nesse caso entram só os tópicos daquela disciplina que caem na prova do aluno.
 */
export function montarSimuladoFormato(p: Progresso, formato: FormatoProva): { nome: string; questoes: Questao[] }[] {
  const doAluno = topicosDoAluno(p);
  const usadas = new Set<string>();
  return formato.blocos.map((b) => {
    const topicos = b.topicos.flatMap((id) =>
      id.includes('/') ? [getTopico(id)?.topico].filter((t): t is Topico => !!t) : doAluno.filter((t) => t.id.startsWith(id + '/')),
    );
    return { nome: b.nome, questoes: sortearQuestoes(p, topicos, b.questoes, usadas) };
  });
}

/** Número da questão na prova oficial ("... questão 140" na fonte). */
const numeroNaProva = (q: Questao) => Number(q.f?.match(/quest[ãa]o (\d+)/i)?.[1] ?? 999);

/** Caderno de uma prova oficial (um arquivo de enem-oficial): as questões na ordem da prova. */
export function montarProvaOficial(topicoId: string): Questao[] {
  const proprias = questoesDoTopico(topicoId).filter((q) => q.id.startsWith(topicoId + '#'));
  return [...proprias].sort((a, b) => numeroNaProva(a) - numeroNaProva(b));
}

export function montarSalvas(p: Progresso): Questao[] {
  const qs = Object.keys(p.salvas)
    .map((id) => getQuestao(id)?.questao)
    .filter((q): q is Questao => !!q);
  return embaralhar(qs).slice(0, TAMANHO_LICAO);
}

function structuredCloneSeguro<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

/** XP máximo por partida de jogo (para os jogos não valerem mais que as lições). */
export const XP_MAX_JOGO = 30;

/**
 * Registra uma partida: atualiza o recorde do jogo/modo e soma o XP (conta para a meta do dia).
 * Devolve o estado novo e se a pontuação bateu o recorde.
 */
export function registrarJogo(anterior: Progresso, chave: string, pontos: number, xp: number, dia = hoje()): { p: Progresso; novoRecorde: boolean } {
  const atual = anterior.jogos[chave] ?? { recorde: 0, partidas: 0 };
  const novoRecorde = pontos > atual.recorde;
  const ganho = Math.max(0, Math.min(XP_MAX_JOGO, Math.round(xp)));
  return {
    novoRecorde,
    p: {
      ...anterior,
      jogos: { ...anterior.jogos, [chave]: { recorde: Math.max(atual.recorde, pontos), partidas: atual.partidas + 1 } },
      xpTotal: anterior.xpTotal + ganho,
      xpPorDia: { ...anterior.xpPorDia, [dia]: (anterior.xpPorDia[dia] ?? 0) + ganho },
    },
  };
}

/** Maior recorde entre os modos de um jogo (chaves que começam com "jogo:"). */
export function recordeDoJogo(p: Progresso, jogo: string): RecordeJogo {
  let recorde = 0;
  let partidas = 0;
  for (const [k, v] of Object.entries(p.jogos)) {
    if (k !== jogo && !k.startsWith(jogo + ':')) continue;
    recorde = Math.max(recorde, v.recorde);
    partidas += v.partidas;
  }
  return { recorde, partidas };
}
