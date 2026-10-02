import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { diaDaSemana, hoje, somarDias } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import { CONQUISTAS } from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
import { Cartao } from '../../ui/componentes';
import { cores } from '../../ui/tema';

export default function Conquistas() {
  const { p } = useProgresso();
  const dias = Array.from({ length: 7 }, (_, i) => somarDias(hoje(), i - 6));
  const maximo = Math.max(p.metaDiaria, ...dias.map((d) => p.xpPorDia[d] ?? 0));
  const obtidas = CONQUISTAS.filter((c) => p.conquistas[c.id]).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Sua semana</Text>
        <Cartao>
          <View style={s.grafico}>
            {dias.map((d) => {
              const xp = p.xpPorDia[d] ?? 0;
              const bateu = xp >= p.metaDiaria;
              return (
                <View key={d} style={s.coluna}>
                  <Text style={s.colunaXp}>{xp || ''}</Text>
                  <View style={s.colunaTrilho}>
                    <View style={{ height: `${(xp / maximo) * 100}%`, backgroundColor: bateu ? cores.amarelo : cores.azul, borderRadius: 6 }} />
                  </View>
                  <Text style={[s.colunaDia, d === hoje() && { color: cores.azul }]}>{diaDaSemana(d)}</Text>
                </View>
              );
            })}
          </View>
          <Text style={s.legenda}>🟨 meta batida · 🟦 estudou (meta: {p.metaDiaria} XP por dia)</Text>
        </Cartao>

        <Text style={s.titulo}>
          Conquistas <Text style={s.contador}>{obtidas}/{CONQUISTAS.length}</Text>
        </Text>
        <View style={s.grade}>
          {CONQUISTAS.map((c) => {
            const ok = !!p.conquistas[c.id];
            return (
              <Cartao key={c.id} estilo={[s.conquista, !ok && { backgroundColor: cores.fundoSuave }]}>
                <Text style={[s.emoji, !ok && { opacity: 0.25 }]}>{ok ? c.emoji : '🔒'}</Text>
                <Text style={[s.nome, !ok && { color: cores.cinza }]}>{c.titulo}</Text>
                <Text style={s.desc}>{c.descricao}</Text>
              </Cartao>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  titulo: { fontSize: 24, fontWeight: '800', color: cores.texto },
  contador: { fontSize: 16, color: cores.textoSuave },
  grafico: { flexDirection: 'row', justifyContent: 'space-between', height: 150, alignItems: 'flex-end' },
  coluna: { alignItems: 'center', flex: 1 },
  colunaXp: { fontSize: 10, fontWeight: '800', color: cores.textoSuave, marginBottom: 2 },
  colunaTrilho: { width: 22, height: 100, justifyContent: 'flex-end', backgroundColor: cores.fundoSuave, borderRadius: 6 },
  colunaDia: { fontSize: 12, fontWeight: '800', color: cores.textoSuave, marginTop: 6 },
  legenda: { fontSize: 12, color: cores.textoSuave, marginTop: 12, fontWeight: '600' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  conquista: { width: '48.5%', marginBottom: 12, alignItems: 'center', padding: 12 },
  emoji: { fontSize: 38 },
  nome: { fontSize: 15, fontWeight: '800', color: cores.texto, textAlign: 'center', marginTop: 4 },
  desc: { fontSize: 12, color: cores.textoSuave, textAlign: 'center', marginTop: 2 },
});
