import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { NOMES_FASE, formatarTempo, usePomodoro } from '../estado/PomodoroContext';
import { Icone } from './Icone';
import { criarEstilos, useCores } from './tema';

/** Relógio do Pomodoro flutuando sobre as abas enquanto há uma fase em andamento. */
export function PilulaPomodoro({ base }: { base: number }) {
  const c = useCores();
  const s = useEstilos();
  const { fase, fimEm, restante } = usePomodoro();
  if (!fase) return null;
  const cor = fase === 'foco' ? c.vermelho : c.verde;
  return (
    <Pressable
      testID="pilula-pomodoro"
      onPress={() => router.push('/pomodoro')}
      style={({ pressed }) => [s.pilula, { bottom: base + 10, backgroundColor: cor }, pressed && { opacity: 0.8 }]}
      accessibilityLabel={`${NOMES_FASE[fase]}: ${formatarTempo(restante)}`}
    >
      <Icone nome={fimEm ? 'timer-outline' : 'pause'} tamanho={18} cor="#FFF" />
      <Text style={s.texto}>
        {NOMES_FASE[fase]} · {formatarTempo(restante)}
      </Text>
    </Pressable>
  );
}

const useEstilos = criarEstilos(() => ({
  pilula: {
    position: 'absolute',
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  texto: { color: '#FFF', fontWeight: '800', fontSize: 14, fontVariant: ['tabular-nums'] },
}));
