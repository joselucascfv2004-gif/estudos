import { router, useLocalSearchParams } from 'expo-router';
import { Linking, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../data/banco';
import { useProgresso } from '../estado/ProgressoContext';
import { nivelSugerido } from '../estado/progresso';
import { Botao, Cabecalho } from '../ui/componentes';
import { ListaVideos } from '../ui/ListaVideos';
import { PlayerYouTube } from '../ui/PlayerYouTube';
import { criarEstilos, useCores } from '../ui/tema';

/** Vídeo-aula de um assunto, tocada no player oficial do YouTube. */
export default function TelaVideo() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const { topico, i } = useLocalSearchParams<{ topico: string; i?: string }>();
  const info = getTopico(topico ?? '');
  const videos = info?.topico.videos ?? [];
  const n = Math.min(Math.max(Number(i) || 0, 0), videos.length - 1);
  const v = videos[n];
  if (!info || !v) return null;
  const cor = info.disciplina.cor;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo={info.topico.titulo} icone="play-box-outline" />
      <PlayerYouTube id={v.id} />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 30 }}>
        <Text style={s.titulo}>{v.t}</Text>
        <Text style={s.canal}>
          {v.c} · {v.d}
        </Text>
        <Text style={s.nota}>
          Vídeo gratuito do canal {v.c} no YouTube, indicado para este assunto. Precisa de internet. Se algo no vídeo for diferente da aula do app, vale a aula,
          que segue as regras e provas mais recentes.
        </Text>
        <Botao
          testID="btn-abrir-youtube"
          icone="youtube"
          titulo="Abrir no YouTube"
          contorno
          pequeno
          cor={cor}
          estilo={{ marginTop: 14 }}
          onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${v.id}`).catch(() => {})}
        />
        {videos.length > 1 && (
          <>
            <Text style={s.secao}>Vídeos deste assunto</Text>
            <ListaVideos topico={info.topico.id} videos={videos} cor={cor} atual={n} substituir />
          </>
        )}
        <Botao
          testID="btn-video-praticar"
          titulo="Praticar este assunto"
          cor={cor}
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
  titulo: { fontSize: 18, fontWeight: '800', color: c.texto },
  canal: { fontSize: 14, fontWeight: '700', color: c.textoSuave, marginTop: 4 },
  nota: { fontSize: 13, color: c.textoSuave, marginTop: 10, lineHeight: 19 },
  secao: { fontSize: 16, fontWeight: '800', color: c.texto, marginTop: 22, marginBottom: 10 },
}));
