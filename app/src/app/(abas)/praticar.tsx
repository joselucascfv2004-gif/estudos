import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { disciplinasDaTrilha } from '../../data/banco';
import { useProgresso } from '../../estado/ProgressoContext';
import { BarraStatus } from '../../ui/BarraStatus';
import { Botao, Cartao } from '../../ui/componentes';
import { clarear, cores } from '../../ui/tema';

export default function Praticar() {
  const { p } = useProgresso();
  const pendentes = p.revisao.length;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Praticar</Text>

        <Cartao estilo={{ backgroundColor: cores.vermelhoClaro, borderColor: '#FFB2B2' }}>
          <Text style={s.cartaoTitulo}>🔁 Revisão de erros</Text>
          <Text style={s.sub}>
            {pendentes
              ? `${pendentes} questão${pendentes > 1 ? 'ões' : ''} que você errou esperando revisão. Acertou na revisão, ela sai da lista.`
              : 'Nenhum erro pendente. As questões que você errar aparecem aqui.'}
          </Text>
          <Botao
            testID="btn-revisao"
            titulo={pendentes ? 'Revisar agora' : 'Nada para revisar'}
            cor={cores.vermelho}
            desativado={!pendentes}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
          />
        </Cartao>

        <Cartao estilo={{ backgroundColor: cores.azulClaro, borderColor: '#A8DCF7' }}>
          <Text style={s.cartaoTitulo}>🎲 Treino misto</Text>
          <Text style={s.sub}>10 questões sorteadas de tudo o que você já liberou na trilha {p.trilha === 'Todas' ? 'completa' : p.trilha}.</Text>
          <Botao titulo="Treinar" cor={cores.azul} onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino' } })} />
        </Cartao>

        <Text style={s.secao}>Treinar por disciplina</Text>
        <View style={{ gap: 10 }}>
          {disciplinasDaTrilha(p.trilha).map((d) => (
            <Cartao
              key={d.id}
              estilo={[s.linha, { backgroundColor: clarear(d.cor, 0.1), borderColor: clarear(d.cor, 0.4) }]}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino', disciplina: d.id } })}
            >
              <Text style={{ fontSize: 26 }}>{d.emoji}</Text>
              <Text style={s.nome}>{d.nome}</Text>
              <Text style={[s.ir, { color: d.cor }]}>▶</Text>
            </Cartao>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  titulo: { fontSize: 26, fontWeight: '800', color: cores.texto },
  cartaoTitulo: { fontSize: 19, fontWeight: '800', color: cores.texto },
  sub: { fontSize: 14, color: cores.textoSuave, fontWeight: '600', marginVertical: 10, lineHeight: 20 },
  secao: { fontSize: 13, fontWeight: '800', color: cores.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  nome: { flex: 1, fontSize: 16, fontWeight: '800', color: cores.texto },
  ir: { fontSize: 18 },
});
