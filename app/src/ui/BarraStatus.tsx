import { Text, View } from 'react-native';

import { useProgresso } from '../estado/ProgressoContext';
import { estudouHoje, nivelDoUsuario } from '../estado/progresso';
import { Icone } from './Icone';
import { criarEstilos, useCores } from './tema';

export function BarraStatus() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const { nivel } = nivelDoUsuario(p.xpTotal);
  const ativo = estudouHoje(p);
  return (
    <View style={s.barra}>
      <Item icone="star" valor={`Nv ${nivel}`} cor={c.azul} rotulo="Nível" />
      <Item icone="fire" valor={p.ofensiva.atual} cor={ativo ? c.laranja : c.cinza} rotulo="Dias seguidos de estudo" />
      <Item icone="diamond-stone" valor={p.moedas} cor={c.azul} rotulo="Moedas" />
      <Item icone="lightning-bolt" valor={p.xpTotal} cor={c.amarelo} rotulo="XP total" />
    </View>
  );
}

function Item({ icone, valor, cor, rotulo }: { icone: string; valor: string | number; cor: string; rotulo: string }) {
  const s = useEstilos();
  return (
    <View style={s.item} accessibilityLabel={`${rotulo}: ${valor}`}>
      <Icone nome={icone} tamanho={22} cor={cor} />
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
  valor: { fontSize: 16, fontWeight: '800' },
}));
