// Lembrete diário local ("Hora de estudar!") para criar o hábito, com o que o aluno tem para fazer no dia.
// Funciona em builds de desenvolvimento/produção e, com limitações, no Expo Go.
import { Platform } from 'react-native';

import { getProva } from '../data/provas';
import { diferencaDias, hoje, somarDias } from './datas';
import { Progresso, calendarioRevisoes, estudouHoje } from './progresso';

type ModNotif = typeof import('expo-notifications');

let mod: ModNotif | null | undefined;
function notificacoes(): ModNotif | null {
  if (Platform.OS === 'web') return null;
  if (mod === undefined) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      mod = require('expo-notifications') as ModNotif;
      mod.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    } catch {
      mod = null;
    }
  }
  return mod;
}

const FRASES = [
  'Sua ofensiva está esperando por você!',
  '10 questões hoje = um passo mais perto da aprovação.',
  'Bora manter o ritmo? Leva só 5 minutos.',
  'Quem estuda todo dia chega lá. Vamos?',
];

/** Quantos dias de lembrete ficam agendados de uma vez (são reagendados sempre que o app abre). */
const DIAS_AGENDADOS = 30;

/** Texto do lembrete de um dia: revisões que vencem, contagem regressiva ou uma frase de incentivo. */
function textoDoDia(p: Progresso, dia: string, revisoes: number, indice: number): string {
  const falta = p.dataProva ? diferencaDias(dia, p.dataProva) : null;
  const prova = p.nomeProva.trim() || getProva(p.prova).nome;
  if (revisoes > 0) {
    const r = `${revisoes} ${revisoes === 1 ? 'questão espera' : 'questões esperam'} sua revisão hoje.`;
    return falta != null && falta > 0 ? `${r} Faltam ${falta} dias para ${prova}.` : `${r} Leva poucos minutos!`;
  }
  if (falta != null && falta > 0) return `Faltam ${falta} dia${falta === 1 ? '' : 's'} para ${prova}. Seu plano de hoje está pronto.`;
  if (falta === 0) return `Hoje é dia de ${prova}. Boa prova!`;
  return FRASES[indice % FRASES.length];
}

async function permissao(N: ModNotif, pedir: boolean): Promise<boolean> {
  let perm = await N.getPermissionsAsync();
  if (!perm.granted && pedir) perm = await N.requestPermissionsAsync();
  return perm.granted;
}

/**
 * Agenda os lembretes dos próximos dias, cada um com o seu texto (quantas revisões vencem, quantos
 * dias faltam para a prova). Se o aluno já estudou hoje, o lembrete de hoje não toca.
 */
async function agendar(N: ModNotif, p: Progresso, hora: number, minuto: number) {
  await N.cancelAllScheduledNotificationsAsync();
  if (Platform.OS === 'android') {
    await N.setNotificationChannelAsync('lembretes', { name: 'Lembretes de estudo', importance: N.AndroidImportance.DEFAULT });
  }
  const dia = hoje();
  const revisoes = new Map(calendarioRevisoes(p, DIAS_AGENDADOS, dia).map((r) => [r.dia, r.quantidade]));
  const agora = new Date();
  for (let i = 0; i < DIAS_AGENDADOS; i++) {
    const d = somarDias(dia, i);
    const [a, m, dd] = d.split('-').map(Number);
    const quando = new Date(a, m - 1, dd, hora, minuto);
    if (quando <= agora) continue;
    if (i === 0 && estudouHoje(p, dia)) continue;
    await N.scheduleNotificationAsync({
      content: { title: 'Hora de estudar!', body: textoDoDia(p, d, revisoes.get(d) ?? 0, i) },
      trigger: { type: N.SchedulableTriggerInputTypes.DATE, date: quando, channelId: 'lembretes' },
    });
  }
}

/** Liga (pedindo permissão) ou desliga o lembrete. Retorna false se não houve permissão. */
export async function configurarLembrete(ativo: boolean, hora: number, minuto: number, p?: Progresso): Promise<boolean> {
  const N = notificacoes();
  if (!N) return false;
  try {
    if (!ativo) {
      await N.cancelAllScheduledNotificationsAsync();
      return true;
    }
    if (!(await permissao(N, true))) return false;
    if (p) await agendar(N, p, hora, minuto);
    return true;
  } catch {
    return false;
  }
}

/** Reagenda os lembretes com os dados atuais (chamado quando o app abre e depois das lições). */
export async function atualizarLembretes(p: Progresso): Promise<void> {
  const N = notificacoes();
  if (!N || !p.lembrete.ativo) return;
  try {
    if (!(await permissao(N, false))) return;
    await agendar(N, p, p.lembrete.hora, p.lembrete.minuto);
  } catch {
    // sem lembrete não é motivo para travar o app
  }
}

export const lembretesDisponiveis = () => Platform.OS !== 'web';
