import { Text, View } from 'react-native';

import { useProgresso } from '../estado/ProgressoContext';
import { estudouHoje, nivelDoUsuario } from '../estado/progresso';
import { criarEstilos, useCores } from './tema';

export function BarraStatus() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const { nivel } = nivelDoUsuario(p.xpTotal);
  const ativo = estudouHoje(p);
  return (
    <View style={s.barra}>
      <Item emoji="⭐" valor={`Nv ${nivel}`} cor={c.azul} />
      <Item emoji="🔥" valor={p.ofensiva.atual} cor={ativo ? c.laranja : c.cinza} apagado={!ativo} />
      <Item emoji="💎" valor={p.moedas} cor={c.azul} />
      <Item emoji="⚡" valor={p.xpTotal} cor={c.amarelo} />
    </View>
  );
}

function Item({ emoji, valor, cor, apagado }: { emoji: string; valor: string | number; cor: string; apagado?: boolean }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={s.item}>
      <Text style={[s.emoji, apagado && { opacity: 0.35 }]}>{emoji}</Text>
      <Text style={[s.valor, { color: cor }]}>{valor}</Text>
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: c.borda,
    backgroundColor: c.fundo,
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  emoji: { fontSize: 20 },
  valor: { fontSize: 16, fontWeight: '800' },
}));
