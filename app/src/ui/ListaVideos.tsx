import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { Video } from '../data/banco';
import { Icone } from './Icone';
import { criarEstilos, useCores } from './tema';

/** miniatura pública do vídeo no YouTube (320 × 180) */
export const miniatura = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

/** Lista de vídeo-aulas de um assunto; tocar num item abre o player. */
export function ListaVideos({ topico, videos, cor, atual, substituir }: { topico: string; videos: Video[]; cor: string; atual?: number; substituir?: boolean }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={{ gap: 10 }}>
      {videos.map((v, i) => {
        const tocando = i === atual;
        const abrir = () => (substituir ? router.setParams({ i: String(i) }) : router.push({ pathname: '/video', params: { topico, i: String(i) } }));
        return (
          <Pressable
            key={v.id}
            testID={`video-${i}`}
            disabled={tocando}
            onPress={abrir}
            style={({ pressed }) => [s.item, tocando && { borderColor: cor }, pressed && { opacity: 0.8 }]}
          >
            <View>
              <Image source={{ uri: miniatura(v.id) }} style={s.miniatura} accessibilityIgnoresInvertColors />
              <View style={s.duracao}>
                <Text style={s.duracaoTexto}>{v.d}</Text>
              </View>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={s.titulo} numberOfLines={3}>
                {v.t}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icone nome={tocando ? 'play-circle' : 'youtube'} tamanho={14} cor={tocando ? cor : c.textoSuave} />
                <Text style={[s.canal, tocando && { color: cor }]} numberOfLines={1}>
                  {tocando ? 'Tocando agora' : v.c}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  item: { flexDirection: 'row', gap: 12, padding: 8, borderRadius: 14, borderWidth: 2, borderBottomWidth: 4, borderColor: c.borda, backgroundColor: c.fundo },
  miniatura: { width: 128, height: 72, borderRadius: 8, backgroundColor: c.cinzaClaro },
  duracao: { position: 'absolute', right: 4, bottom: 4, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1 },
  duracaoTexto: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  titulo: { fontSize: 14, fontWeight: '700', color: c.texto },
  canal: { fontSize: 12, fontWeight: '600', color: c.textoSuave, flexShrink: 1 },
}));
