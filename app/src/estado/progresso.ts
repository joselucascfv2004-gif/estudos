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
export type EstatQuestao = { acertos: number; erros: number; ultima: string; caixa?: number; proxima?: string };
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
    versao: 2,
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
  return (salvo.versao ?? 1) < 2 ? migrarParaV2(p) : p;
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
 * Intervalo base (em dias) de cada caixa. A caixa 0 é a das questões erradas: elas voltam em
 * 1 a 3 dias, nunca no mesmo dia. Cada acerto passa a questão para a caixa seguinte.
 */
export const INTERVALOS = [2, 2, 4, 7, 15, 30, 60];
const MAX_CAIXA = INTERVALOS.length - 1;

/**
 * Quanto o aluno quer rever esta questão: 1 é o normal; matérias, assuntos e nível escolhidos
 * nas preferências de revisão valem mais (voltam antes e aparecem mais nas revisões).
 */
export function pesoPreferencia(p: Progresso, id: string): number {
  const pref = p.prefRevisao;
  const topicos = topicosDaQuestao(id);
  let peso = 1;
  if (topicos.some((t) => pref.topicos.includes(t) || pref.disciplinas.includes(t.split('/')[0]))) peso *= 2;
  if (pref.nivel != null && getQuestao(id)?.questao.n === pref.nivel) peso *= 1.5;
  // assuntos em que o aluno anda errando muito também voltam antes
  if (topicos.some((t) => ehPontoFraco(desempenhoTopico(p, t)))) peso *= 1.5;
  return peso;
}

/**
 * Agenda a próxima revisão de uma questão depois de respondida. O dia varia um pouco (de 70% a 140%
 * do intervalo da caixa), para as revisões caírem em dias variados e misturarem assuntos de dias
 * diferentes. `peso` > 1 (preferências do aluno) encurta o intervalo. Questões "teimosas" (erradas
 * mais de uma vez) também voltam antes: quanto mais erros, mais curto o intervalo, até a metade.
 */
export function agendar(
  anterior: EstatQuestao | undefined,
  acertou: boolean,
  dia: string,
  peso = 1,
  sorteio: () => number = Math.random,
): Pick<EstatQuestao, 'caixa' | 'proxima'> {
  // acertar de primeira, sem nunca ter errado, já pula uma caixa
  const caixa = acertou ? Math.min(MAX_CAIXA, (anterior?.caixa ?? 0) + (anterior ? 1 : 2)) : 0;
  const erros = (anterior?.erros ?? 0) + (acertou ? 0 : 1);
  const teimosia = erros >= 2 ? 1 + 0.25 * Math.min(erros - 1, 4) : 1;
  const dias = Math.max(1, Math.round((INTERVALOS[caixa] / (peso * teimosia)) * (0.7 + sorteio() * 0.7)));
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

/** A questão é de algum assunto que o aluno estuda (prova-alvo e língua escolhida)? */
function daProvaDoAluno(p: Progresso, id: string, assuntos: Set<string>): boolean {
  return topicosDaQuestao(id).some((t) => assuntos.has(t));
}

/** Questões cuja revisão venceu, das mais atrasadas (e menos dominadas) para as mais recentes. */
export function revisoesPendentes(p: Progresso, dia = hoje()): string[] {
  const assuntos = new Set(topicosDoAluno(p).map((t) => t.id));
  return Object.entries(p.questoes)
    .filter(([id, e]) => e.proxima != null && e.proxima <= dia && e.ultima < dia && daProvaDoAluno(p, id, assuntos))
    .sort(([, a], [, b]) => (a.proxima! < b.proxima! ? -1 : a.proxima! > b.proxima! ? 1 : (a.caixa ?? 0) - (b.caixa ?? 0)))
    .map(([id]) => id);
}

/** Próximo dia com revisões agendadas (depois de hoje) e quantas questões vencem nele. */
export function proximaRevisao(p: Progresso, dia = hoje()): { dia: string; quantidade: number } | null {
  const assuntos = new Set(topicosDoAluno(p).map((t) => t.id));
  let menor: string | null = null;
  let quantidade = 0;
  for (const [id, e] of Object.entries(p.questoes)) {
    if (!e.proxima || e.proxima <= dia || !daProvaDoAluno(p, id, assuntos)) continue;
    if (menor == null || e.proxima < menor) {
      menor = e.proxima;
      quantidade = 1;
    } else if (e.proxima === menor) quantidade++;
  }
  return menor ? { dia: menor, quantidade } : null;
}

/** Quantas questões, estudadas em dias anteriores, podem entrar numa revisão surpresa. */
export function questoesJaVistas(p: Progresso, dia = hoje()): number {
  const assuntos = new Set(topicosDoAluno(p).map((t) => t.id));
  return Object.entries(p.questoes).filter(([id, e]) => e.ultima < dia && daProvaDoAluno(p, id, assuntos)).length;
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

/** Quantas revisões vencem em cada um dos próximos `dias` dias (o de hoje inclui as atrasadas). */
export function calendarioRevisoes(p: Progresso, dias = 14, dia = hoje()): { dia: string; quantidade: number }[] {
  const assuntos = new Set(topicosDoAluno(p).map((t) => t.id));
  const fim = somarDias(dia, dias - 1);
  const contagem = new Map<string, number>();
  for (const [id, e] of Object.entries(p.questoes)) {
    if (!e.proxima || e.proxima > fim || !daProvaDoAluno(p, id, assuntos)) continue;
    // o que venceu antes de hoje (ou foi respondido hoje) cai no primeiro dia possível
    let quando = e.proxima < dia ? dia : e.proxima;
    if (e.ultima >= quando) quando = somarDias(e.ultima, 1);
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

export type Modo = 'topico' | 'desafio' | 'revisao' | 'treino' | 'fracos' | 'teimosas' | 'salvas' | 'simulado';

/**
 * Em que fila a questão entra numa lição: nunca vista, revisão vencida, já vista ou "esperando".
 * Esperando são as que o aluno errou e ainda não chegou o dia de rever, e as respondidas hoje:
 * elas ficam guardadas para a revisão de daqui a alguns dias e só aparecem se não houver outra.
 */
function filaDaQuestao(p: Progresso, id: string, dia: string): 'nunca' | 'vencida' | 'vista' | 'esperando' {
  const e = p.questoes[id];
  if (!e) return 'nunca';
  if (e.ultima >= dia) return 'esperando';
  if (e.proxima != null && e.proxima <= dia) return 'vencida';
  if (e.caixa === 0) return 'esperando';
  return 'vista';
}

/** Prioriza questões nunca vistas, depois revisões vencidas, depois as demais; as que esperam revisão vão por último. */
function priorizar(p: Progresso, qs: Questao[], quantidade: number, dia = hoje()): Questao[] {
  const filas = { nunca: [] as Questao[], vencida: [] as Questao[], vista: [] as Questao[], esperando: [] as Questao[] };
  for (const q of qs) filas[filaDaQuestao(p, q.id, dia)].push(q);
  const antigas = (a: Questao, b: Questao) => (p.questoes[a.id].ultima < p.questoes[b.id].ultima ? -1 : 1);
  filas.vista.sort(antigas);
  filas.esperando.sort(antigas);
  return semModeloRepetido([...embaralhar(filas.nunca), ...embaralhar(filas.vencida), ...filas.vista, ...filas.esperando], quantidade);
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

/**
 * Revisão: sorteia entre as questões cuja revisão venceu, misturando assuntos e dias diferentes.
 * Se forem poucas, completa com questões já vistas em dias anteriores (revisão surpresa). As
 * matérias, assuntos e nível escolhidos nas preferências têm mais chance de aparecer.
 */
export function montarRevisao(p: Progresso, dia = hoje(), sorteio: () => number = Math.random): Questao[] {
  const pendentes = revisoesPendentes(p, dia);
  const peso = (id: string) => pesoPreferencia(p, id) ** 2;
  const vencidas = sortearComPeso(
    pendentes.map((id) => ({ item: id, peso: peso(id) * (p.questoes[id].caixa === 0 ? 2 : 1) * (ehTeimosa(p.questoes[id]) ? 2 : 1) })),
    TAMANHO_LICAO * 2,
    sorteio,
  );
  let ids = vencidas;
  if (vencidas.length < TAMANHO_LICAO) {
    const ja = new Set(pendentes);
    const assuntos = new Set(topicosDoAluno(p).map((t) => t.id));
    const vistas = Object.entries(p.questoes)
      .filter(([id, e]) => !ja.has(id) && e.ultima < dia && daProvaDoAluno(p, id, assuntos))
      .map(([id, e]) => ({ item: id, peso: peso(id) * (1 + Math.min(e.erros, 3)) }));
    ids = [...vencidas, ...sortearComPeso(vistas, TAMANHO_LICAO * 2, sorteio)];
  }
  const qs = ids.map((id) => getQuestao(id)?.questao).filter((q): q is Questao => !!q);
  return embaralhar(semModeloRepetido(qs, TAMANHO_LICAO));
}

/** Quantas questões a próxima revisão teria (vencidas + surpresa), até o tamanho de uma lição. */
export function tamanhoRevisao(p: Progresso, dia = hoje()): number {
  return Math.min(TAMANHO_LICAO, questoesJaVistas(p, dia));
}

/**
 * Questão "teimosa": errada pelo menos duas vezes e ainda não fixada (não acertou várias vezes
 * seguidas depois do último erro, ou seja, ainda está nas primeiras caixas da revisão).
 */
export const ehTeimosa = (e: EstatQuestao | undefined) => !!e && e.erros >= 2 && (e.caixa ?? 0) <= 2;

/** Questões teimosas da prova do aluno, das que ele mais erra para as que menos erra. */
export function questoesTeimosas(p: Progresso): string[] {
  const assuntos = new Set(topicosDoAluno(p).map((t) => t.id));
  return Object.entries(p.questoes)
    .filter(([id, e]) => ehTeimosa(e) && daProvaDoAluno(p, id, assuntos))
    .sort(([, a], [, b]) => b.erros - b.acertos - (a.erros - a.acertos) || (a.caixa ?? 0) - (b.caixa ?? 0))
    .map(([id]) => id);
}

/**
 * Lição "Questões que mais erro": só as teimosas, sorteadas com mais chance para as mais erradas.
 * Não respeita a data da revisão: serve para atacar de propósito o que não está fixando.
 */
export function montarTeimosas(p: Progresso, sorteio: () => number = Math.random): Questao[] {
  const ids = questoesTeimosas(p);
  const sorteadas = sortearComPeso(
    ids.map((id) => ({ item: id, peso: 1 + Math.min(Math.max(p.questoes[id].erros - p.questoes[id].acertos, 0), 4) })),
    TAMANHO_LICAO * 2,
    sorteio,
  );
  const qs = sorteadas.map((id) => getQuestao(id)?.questao).filter((q): q is Questao => !!q);
  return embaralhar(semModeloRepetido(qs, TAMANHO_LICAO));
}

/** Lição focada nos pontos fracos (ou em um tópico específico): primeiro os erros com revisão vencida. */
export function montarPontosFracos(p: Progresso, topicoId?: string, dia = hoje()): Questao[] {
  const ids = topicoId ? [topicoId] : pontosFracos(p).slice(0, 3).map((d) => d.topicoId);
  const candidatas = ids.flatMap((id) =>
    ([0, 1, 2] as Nivel[]).filter((n) => nivelDesbloqueado(p, id, n)).flatMap((n) => questoesDoTopico(id, n)),
  );
  const erradas: Questao[] = [];
  const nunca: Questao[] = [];
  const resto: Questao[] = [];
  const esperando: Questao[] = [];
  for (const q of embaralhar(candidatas)) {
    const e = p.questoes[q.id];
    const fila = filaDaQuestao(p, q.id, dia);
    if (fila === 'nunca') nunca.push(q);
    else if (fila === 'esperando') esperando.push(q);
    else if (e.caixa === 0 || e.erros > e.acertos) erradas.push(q);
    else resto.push(q);
  }
  return embaralhar(semModeloRepetido([...erradas, ...nunca, ...resto, ...esperando], TAMANHO_LICAO));
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
      ...agendar(anterior, acertou, dia, pesoPreferencia(p, id)),
    };
    const topicoId = assuntoDaQuestao(id);
    if (topicoId) {
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
  if (r.modo === 'revisao' || r.modo === 'teimosas') p.revisoesFeitas++;

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
  for (let i = 0; i < niveis.length * 4 && escolhidas.length < quantidade; i++) {
    const t = topicos[i % topicos.length];
    const nivel = niveis[escolhidas.length];
    const livres = questoesDoTopico(t.id, nivel).filter((q) => !usadas.has(q.id));
    const [q] = priorizar(p, livres, 1);
    if (q) {
      usadas.add(q.id);
      escolhidas.push(q);
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
