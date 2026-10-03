import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

import { cores, criarEstilos, escurecer, useCores } from './tema';

type BotaoProps = {
  titulo: string;
  onPress?: () => void;
  cor?: string;
  corTexto?: string;
  contorno?: boolean;
  desativado?: boolean;
  estilo?: StyleProp<ViewStyle>;
  pequeno?: boolean;
  testID?: string;
};

/** Botão "3D" no estilo dos apps gamificados. */
export function Botao({ titulo, onPress, cor = cores.verde, corTexto, contorno, desativado, estilo, pequeno, testID }: BotaoProps) {
  const c = useCores();
  const styles = useEstilos();
  const fundo = desativado ? c.cinzaClaro : contorno ? c.fundo : cor;
  const borda = desativado ? c.cinzaClaro : contorno ? c.borda : escurecer(cor);
  const texto = desativado ? c.cinza : corTexto ?? (contorno ? cor : '#FFFFFF');
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      disabled={desativado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.botao,
        pequeno && styles.botaoPequeno,
        { backgroundColor: fundo, borderColor: borda, borderBottomWidth: pressed ? 2 : 4, marginTop: pressed ? 2 : 0 },
        contorno && { borderWidth: 2, borderBottomWidth: pressed ? 2 : 4 },
        estilo,
      ]}
    >
      <Text style={[styles.botaoTexto, pequeno && { fontSize: 14 }, { color: texto }]}>{titulo.toUpperCase()}</Text>
    </Pressable>
  );
}

export function Barra({ valor, cor = cores.verde, altura = 14, fundo }: { valor: number; cor?: string; altura?: number; fundo?: string }) {
  const c = useCores();
  fundo = fundo ?? c.cinzaClaro;
  const v = Math.max(0, Math.min(1, valor));
  return (
    <View style={{ height: altura, borderRadius: altura, backgroundColor: fundo, overflow: 'hidden' }}>
      <View style={{ width: `${v * 100}%`, height: '100%', borderRadius: altura, backgroundColor: cor }}>
        {v > 0.05 && (
          <View style={{ position: 'absolute', top: altura * 0.2, left: 8, right: 8, height: altura * 0.25, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' }} />
        )}
      </View>
    </View>
  );
}

export function Cartao({ children, estilo, onPress, testID }: { children: ReactNode; estilo?: StyleProp<ViewStyle>; onPress?: () => void; testID?: string }) {
  const styles = useEstilos();
  if (!onPress) return <View testID={testID} style={[styles.cartao, estilo]}>{children}</View>;
  return (
    <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.cartao, estilo, pressed && { borderBottomWidth: 2, marginTop: 2 }]}>
      {children}
    </Pressable>
  );
}

export function Chip({ texto, ativo, onPress, cor = cores.azul }: { texto: string; ativo?: boolean; onPress?: () => void; cor?: string }) {
  const c = useCores();
  const styles = useEstilos();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, ativo ? { backgroundColor: cor, borderColor: escurecer(cor) } : { backgroundColor: c.fundo, borderColor: c.borda }]}
    >
      <Text style={[styles.chipTexto, { color: ativo ? '#FFF' : c.textoSuave }]}>{texto}</Text>
    </Pressable>
  );
}

export function Estatistica({ emoji, valor, rotulo, cor }: { emoji: string; valor: string | number; rotulo?: string; cor?: string }) {
  const styles = useEstilos();
  return (
    <View style={styles.estat}>
      <Text style={styles.estatEmoji}>{emoji}</Text>
      <View>
        <Text style={[styles.estatValor, cor ? { color: cor } : null]}>{valor}</Text>
        {rotulo ? <Text style={styles.estatRotulo}>{rotulo}</Text> : null}
      </View>
    </View>
  );
}

export function Titulo({ children, estilo }: { children: ReactNode; estilo?: object }) {
  const styles = useEstilos();
  return <Text style={[styles.titulo, estilo]}>{children}</Text>;
}

/** Barra de topo com botão de voltar, para telas fora das abas. */
export function Cabecalho({ titulo, direita }: { titulo: string; direita?: ReactNode }) {
  const c = useCores();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: c.borda }}>
      <Pressable testID="btn-voltar" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} hitSlop={12}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: c.textoSuave }}>←</Text>
      </Pressable>
      <Text style={{ flex: 1, fontSize: 20, fontWeight: '800', color: c.texto }} numberOfLines={1}>
        {titulo}
      </Text>
      {direita}
    </View>
  );
}

export const useEstilos = criarEstilos((c) => ({
  botao: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
  },
  botaoPequeno: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 12 },
  botaoTexto: { fontSize: 16, fontWeight: '800', letterSpacing: 0.8 },
  cartao: {
    backgroundColor: c.fundo,
    borderRadius: 18,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: c.borda,
    padding: 16,
  },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 2, borderBottomWidth: 3, marginRight: 8 },
  chipTexto: { fontWeight: '800', fontSize: 13 },
  estat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  estatEmoji: { fontSize: 22 },
  estatValor: { fontSize: 17, fontWeight: '800', color: c.texto },
  estatRotulo: { fontSize: 11, color: c.textoSuave, fontWeight: '600' },
  titulo: { fontSize: 22, fontWeight: '800', color: c.texto },
}));
