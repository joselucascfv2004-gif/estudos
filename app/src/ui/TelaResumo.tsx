import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../data/banco';
import { cartoesDoTopico } from '../estado/cartoes';
import { useProgresso } from '../estado/ProgressoContext';
import { nivelSugerido } from '../estado/progresso';
import { Botao, Cabecalho, Chip } from './componentes';
import { ComIcone } from './Icone';
import { ListaVideos } from './ListaVideos';
import { Markdown } from './Markdown';
import { criarEstilos, useCores } from './tema';

/** Teoria de um assunto: resumo rápido e, quando existe, a aula completa com exemplos. */
export default function TelaResumo() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const { topico, aba } = useLocalSearchParams<{ topico: string; aba?: string }>();
  const info = getTopico(topico ?? '');
  const temAula = !!info?.topico.aula;
  const [verAula, setVerAula] = useState(temAula && aba !== 'resumo');
  const rolagem = useRef<ScrollView>(null);
  if (!info) return null;
  const cartoes = cartoesDoTopico(info.topico.id).length;
  const texto = verAula ? info.topico.aula! : info.topico.resumo ?? '';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo={info.topico.titulo} icone="book-open-variant" />
      <ScrollView ref={rolagem} contentContainerStyle={{ padding: 18, paddingBottom: 30 }}>
        <ComIcone icone={info.disciplina.icone} cor={info.disciplina.cor} tamanho={18} estiloTexto={s.disciplina}>
          {info.disciplina.nome}
          {verAula ? ' · aula completa' : ' · resumo para revisar'}
        </ComIcone>
        {temAula && !!info.topico.resumo && (
          <View style={s.abas}>
            <Chip testID="aba-aula" texto="Aula completa" icone="school-outline" ativo={verAula} cor={info.disciplina.cor} onPress={() => setVerAula(true)} />
            <Chip testID="aba-resumo" texto="Resumo" icone="text-short" ativo={!verAula} cor={info.disciplina.cor} onPress={() => setVerAula(false)} />
          </View>
        )}
        {(verAula || !temAula) && !!info.topico.videos?.length && (
          <View style={s.videos}>
            <ComIcone icone="play-box-outline" cor={info.disciplina.cor} tamanho={18} estiloTexto={s.videosTitulo}>
              Prefere assistir? Vídeo-aulas gratuitas
            </ComIcone>
            <ListaVideos topico={info.topico.id} videos={info.topico.videos} cor={info.disciplina.cor} />
          </View>
        )}
        <Markdown texto={texto} cor={info.disciplina.cor} />
        {verAula && !!info.topico.resumo && (
          <Botao
            titulo="Ver o resumo para revisar"
            contorno
            pequeno
            cor={info.disciplina.cor}
            estilo={{ marginTop: 20 }}
            onPress={() => {
              setVerAula(false);
              rolagem.current?.scrollTo({ y: 0, animated: false });
            }}
          />
        )}
        <Text style={s.agora}>Agora aplique o que aprendeu:</Text>
        <Botao
          testID="btn-resumo-praticar"
          icone="format-list-checks"
          titulo="Praticar com questões"
          cor={info.disciplina.cor}
          onPress={() =>
            router.replace({ pathname: '/licao', params: { modo: 'topico', topico: info.topico.id, nivel: String(nivelSugerido(p, info.topico.id)) } })
          }
        />
        {cartoes > 0 && (
          <Botao
            testID="btn-resumo-flashcards"
            icone="cards-outline"
            titulo={`Flashcards (${cartoes})`}
            contorno
            cor={info.disciplina.cor}
            estilo={{ marginTop: 10 }}
            onPress={() => router.replace({ pathname: '/flashcards', params: { modo: 'topico', topico: info.topico.id } })}
          />
        )}
        {cartoes > 0 && (
          <Botao
            testID="btn-resumo-feynman"
            icone="account-voice"
            titulo="Explicar com minhas palavras"
            contorno
            cor={info.disciplina.cor}
            estilo={{ marginTop: 10 }}
            onPress={() => router.replace({ pathname: '/feynman', params: { topico: info.topico.id } })}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  disciplina: { fontSize: 13, fontWeight: '800', color: c.textoSuave, marginBottom: 10 },
  abas: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginBottom: 8 },
  videos: { gap: 10, marginTop: 4, marginBottom: 18 },
  agora: { fontSize: 15, fontWeight: '800', color: c.texto, marginTop: 24, marginBottom: 10 },
  videosTitulo: { fontSize: 15, fontWeight: '800', color: c.texto },
}));
