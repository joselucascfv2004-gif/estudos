// Lembrete diário local ("Hora de estudar!") para criar o hábito.
// Funciona em builds de desenvolvimento/produção e, com limitações, no Expo Go.
import { Platform } from 'react-native';

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
  'Sua ofensiva está esperando por você! 🔥',
  '10 questões hoje = um passo mais perto da aprovação. 🎯',
  'Bora manter o ritmo? Leva só 5 minutos. ⏱️',
  'Quem estuda todo dia chega lá. Vamos? 💪',
];

/** Agenda (ou cancela) o lembrete diário. Retorna false se não houve permissão. */
export async function configurarLembrete(ativo: boolean, hora: number, minuto: number): Promise<boolean> {
  const N = notificacoes();
  if (!N) return false;
  try {
    await N.cancelAllScheduledNotificationsAsync();
    if (!ativo) return true;
    let perm = await N.getPermissionsAsync();
    if (!perm.granted) perm = await N.requestPermissionsAsync();
    if (!perm.granted) return false;
    if (Platform.OS === 'android') {
      await N.setNotificationChannelAsync('lembretes', {
        name: 'Lembretes de estudo',
        importance: N.AndroidImportance.DEFAULT,
      });
    }
    await N.scheduleNotificationAsync({
      content: { title: 'Hora de estudar! 📚', body: FRASES[Math.floor(Math.random() * FRASES.length)] },
      trigger: { type: N.SchedulableTriggerInputTypes.DAILY, hour: hora, minute: minuto, channelId: 'lembretes' },
    });
    return true;
  } catch {
    return false;
  }
}

export const lembretesDisponiveis = () => Platform.OS !== 'web';
