import { StyleSheet, Text, View } from 'react-native';

import { useProgresso } from '../estado/ProgressoContext';
import { estudouHoje, nivelDoUsuario } from '../estado/progresso';
import { cores } from './tema';

export function BarraStatus() {
  const { p } = useProgresso();
  const { nivel } = nivelDoUsuario(p.xpTotal);
  const ativo = estudouHoje(p);
  return (
    <View style={s.barra}>
      <Item emoji="⭐" valor={`Nv ${nivel}`} cor={cores.azul} />
      <Item emoji="🔥" valor={p.ofensiva.atual} cor={ativo ? cores.laranja : cores.cinza} apagado={!ativo} />
      <Item emoji="💎" valor={p.moedas} cor={cores.azul} />
      <Item emoji="⚡" valor={p.xpTotal} cor={cores.amarelo} />
    </View>
  );
}

function Item({ emoji, valor, cor, apagado }: { emoji: string; valor: string | number; cor: string; apagado?: boolean }) {
  return (
    <View style={s.item}>
      <Text style={[s.emoji, apagado && { opacity: 0.35 }]}>{emoji}</Text>
      <Text style={[s.valor, { color: cor }]}>{valor}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: cores.borda,
    backgroundColor: cores.fundo,
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  emoji: { fontSize: 20 },
  valor: { fontSize: 16, fontWeight: '800' },
});
