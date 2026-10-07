import { ScrollView, Text, View } from 'react-native';

import { diaDaSemana, hoje } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import { calendarioRevisoes } from '../estado/progresso';
import { criarEstilos, useCores } from './tema';

/** Barrinhas com quantos assuntos voltam para revisão em cada um dos próximos 14 dias. */
export function CalendarioRevisoes() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const dias = calendarioRevisoes(p, 14);
  const maximo = Math.max(1, ...dias.map((d) => d.quantidade));
  if (!dias.some((d) => d.quantidade)) return null;
  return (
    <View testID="calendario-revisoes">
      <Text style={s.titulo}>Assuntos para revisar nos próximos dias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
        {dias.map(({ dia, quantidade }) => {
          const ehHoje = dia === hoje();
          return (
            <View key={dia} style={s.coluna}>
              <Text style={s.numero}>{quantidade || ''}</Text>
              <View style={s.trilho}>
                <View style={{ height: `${(quantidade / maximo) * 100}%`, backgroundColor: ehHoje ? c.roxo : c.roxoBorda, borderRadius: 5 }} />
              </View>
              <Text style={[s.dia, ehHoje && { color: c.roxo }]}>{ehHoje ? 'Hoje' : diaDaSemana(dia)}</Text>
              <Text style={s.data}>{dia.slice(8)}/{dia.slice(5, 7)}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 13, fontWeight: '800', color: c.textoSuave, marginBottom: 6 },
  coluna: { width: 38, alignItems: 'center' },
  numero: { fontSize: 11, fontWeight: '800', color: c.textoSuave, height: 15 },
  trilho: { height: 60, width: 18, justifyContent: 'flex-end', backgroundColor: c.fundo, borderRadius: 5 },
  dia: { fontSize: 11, fontWeight: '800', color: c.textoSuave, marginTop: 4 },
  data: { fontSize: 10, fontWeight: '600', color: c.textoSuave },
}));
