import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleProp, Text, TextStyle, View, useWindowDimensions } from 'react-native';

import { IMAGENS } from '../data/imagens';
import { Icone } from './Icone';
import { criarEstilos, useCores } from './tema';

/** Linha de imagem no texto da questão: ![descrição](arquivo.webp) */
const LINHA_IMAGEM = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;
const IMAGEM_NO_TEXTO = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

/** Texto sem as imagens (para prévias, e-mails e listas resumidas). */
export function semImagens(texto: string) {
  return texto.replace(IMAGEM_NO_TEXTO, (_, desc: string) => `[${desc || 'imagem'}]`);
}

export function temImagem(texto: string) {
  return /!\[[^\]]*\]\([^)\s]+\)/.test(texto);
}

/** Figura de questão: ocupa a largura disponível; um toque abre a imagem ampliada. */
export function Figura({ nome, descricao, maxAltura, ampliar = true }: { nome: string; descricao?: string; maxAltura?: number; ampliar?: boolean }) {
  const s = useEstilos();
  const c = useCores();
  const { width, height } = useWindowDimensions();
  const [aberta, setAberta] = useState(false);
  const info = IMAGENS[nome];
  if (!info) return <Text style={s.falta}>[imagem indisponível]</Text>;
  const proporcao = info.w / info.h;
  // figuras pequenas não são esticadas além do tamanho natural (em pontos, ~2 px por ponto)
  const largMax = Math.min(width - 40, info.w / 1.6);
  const alt = maxAltura && largMax / proporcao > maxAltura ? maxAltura : largMax / proporcao;
  const larg = alt * proporcao;
  // ampliada: cabe na largura da tela deitada, com rolagem
  const largZoom = Math.max(width * 1.6, Math.min(info.w, width * 2.5));
  if (!ampliar)
    return (
      <View accessibilityLabel={descricao || 'Figura'} style={[s.moldura, { alignSelf: 'flex-start' }]}>
        <Image source={info.fonte} style={{ width: larg, height: alt }} resizeMode="contain" />
      </View>
    );
  return (
    <>
      <Pressable accessibilityRole="imagebutton" accessibilityLabel={`${descricao || 'Figura'}. Toque para ampliar`} onPress={() => setAberta(true)} style={s.moldura}>
        <Image source={info.fonte} style={{ width: larg, height: alt }} resizeMode="contain" />
        <View style={s.lupa}>
          <Icone nome="magnify-plus-outline" tamanho={16} cor="#555" />
        </View>
      </Pressable>
      <Modal visible={aberta} animationType="fade" onRequestClose={() => setAberta(false)}>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ minHeight: height, justifyContent: 'center', padding: 12 }}>
              <Image source={info.fonte} style={{ width: largZoom, height: largZoom / proporcao }} resizeMode="contain" />
            </ScrollView>
          </ScrollView>
          <Pressable accessibilityRole="button" accessibilityLabel="Fechar imagem" onPress={() => setAberta(false)} style={[s.fechar, { backgroundColor: c.azul }]}>
            <Icone nome="close" tamanho={22} cor="#FFFFFF" />
          </Pressable>
          <Text style={s.dica}>Arraste para ver a imagem inteira</Text>
        </View>
      </Modal>
    </>
  );
}

/** Enunciado de questão: texto com figuras no meio. Com `linhas`, mostra só o começo do texto (prévia). */
export function TextoQuestao({ texto, estilo, linhas }: { texto: string; estilo: StyleProp<TextStyle>; linhas?: number }) {
  if (linhas) return <Text style={estilo} numberOfLines={linhas}>{semImagens(texto)}</Text>;
  if (!temImagem(texto)) return <Text style={estilo}>{texto}</Text>;
  const partes: React.ReactNode[] = [];
  let buffer: string[] = [];
  const solta = (k: number) => {
    const t = buffer.join('\n').trim();
    if (t) partes.push(<Text key={`t${k}`} style={estilo}>{t}</Text>);
    buffer = [];
  };
  texto.split('\n').forEach((l, i) => {
    const m = l.trim().match(LINHA_IMAGEM);
    if (m) {
      solta(i);
      partes.push(<Figura key={`f${i}`} nome={m[2]} descricao={m[1]} />);
    } else buffer.push(l);
  });
  solta(-1);
  return <View style={{ gap: 10 }}>{partes}</View>;
}

/** Texto de uma alternativa: pode ser uma figura (gráficos, mapas, esquemas). */
export function TextoAlternativa({ texto, estilo }: { texto: string; estilo: StyleProp<TextStyle> }) {
  const m = texto.trim().match(LINHA_IMAGEM);
  if (!m) return <Text style={estilo}>{texto}</Text>;
  return (
    <View style={{ flex: 1 }}>
      <Figura nome={m[2]} descricao={m[1]} maxAltura={220} ampliar={false} />
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  moldura: { alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 10, padding: 6, borderWidth: 1, borderColor: c.borda },
  lupa: { position: 'absolute', right: 4, bottom: 4, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 10, padding: 2 },
  falta: { color: c.textoSuave, fontStyle: 'italic' },
  fechar: { position: 'absolute', top: 40, right: 16, borderRadius: 22, padding: 10 },
  dica: { position: 'absolute', bottom: 24, alignSelf: 'center', color: '#777', fontSize: 13 },
}));
