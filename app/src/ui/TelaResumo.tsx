import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../data/banco';
import { useProgresso } from '../estado/ProgressoContext';
import { nivelSugerido } from '../estado/progresso';
import { Botao, Cabecalho } from './componentes';
import { ComIcone } from './Icone';
import { criarEstilos, useCores } from './tema';

/** Texto com trechos em **negrito**. */
function TextoRico({ texto, estilo, forte }: { texto: string; estilo: object; forte: object }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <Text style={estilo}>
      {partes.map((parte, i) =>
        parte.startsWith('**') && parte.endsWith('**') ? (
          <Text key={i} style={forte}>
            {parte.slice(2, -2)}
          </Text>
        ) : (
          parte
        ),
      )}
    </Text>
  );
}

export default function TelaResumo() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const { topico } = useLocalSearchParams<{ topico: string }>();
  const info = getTopico(topico ?? '');
  if (!info) return null;
  const linhas = (info.topico.resumo ?? '').split('\n');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo={info.topico.titulo} icone="book-open-variant" />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 30 }}>
        <ComIcone icone={info.disciplina.icone} cor={info.disciplina.cor} tamanho={18} estiloTexto={s.disciplina}>
          {info.disciplina.nome} · resumo em 2 minutos
        </ComIcone>
        {linhas.map((linha, i) => {
          const t = linha.trim();
          if (!t) return <View key={i} style={{ height: 8 }} />;
          if (t.startsWith('### ')) return <Text key={i} style={s.subtitulo}>{t.slice(4)}</Text>;
          if (t.startsWith('- ')) {
            return (
              <View key={i} style={s.item}>
                <Text style={[s.texto, { color: info.disciplina.cor }]}>●</Text>
                <TextoRico texto={t.slice(2)} estilo={[s.texto, { flex: 1 }]} forte={s.forte} />
              </View>
            );
          }
          return <TextoRico key={i} texto={t} estilo={s.texto} forte={s.forte} />;
        })}
        <Botao
          testID="btn-resumo-praticar"
          titulo="Praticar este assunto"
          cor={info.disciplina.cor}
          estilo={{ marginTop: 20 }}
          onPress={() =>
            router.replace({ pathname: '/licao', params: { modo: 'topico', topico: info.topico.id, nivel: String(nivelSugerido(p, info.topico.id)) } })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  disciplina: { fontSize: 13, fontWeight: '800', color: c.textoSuave, marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: '800', color: c.texto, marginTop: 10, marginBottom: 6 },
  texto: { fontSize: 16, lineHeight: 24, color: c.texto },
  forte: { fontWeight: '800' },
  item: { flexDirection: 'row', gap: 8, marginBottom: 6 },
}));
