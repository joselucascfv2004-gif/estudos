import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { cores, escurecer } from './tema';

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
  const fundo = desativado ? cores.cinzaClaro : contorno ? cores.fundo : cor;
  const borda = desativado ? cores.cinzaClaro : contorno ? cores.borda : escurecer(cor);
  const texto = desativado ? cores.cinza : corTexto ?? (contorno ? cor : '#FFFFFF');
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

export function Barra({ valor, cor = cores.verde, altura = 14, fundo = cores.cinzaClaro }: { valor: number; cor?: string; altura?: number; fundo?: string }) {
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
  if (!onPress) return <View style={[styles.cartao, estilo]}>{children}</View>;
  return (
    <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.cartao, estilo, pressed && { borderBottomWidth: 2, marginTop: 2 }]}>
      {children}
    </Pressable>
  );
}

export function Chip({ texto, ativo, onPress, cor = cores.azul }: { texto: string; ativo?: boolean; onPress?: () => void; cor?: string }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, ativo ? { backgroundColor: cor, borderColor: escurecer(cor) } : { backgroundColor: cores.fundo, borderColor: cores.borda }]}
    >
      <Text style={[styles.chipTexto, { color: ativo ? '#FFF' : cores.textoSuave }]}>{texto}</Text>
    </Pressable>
  );
}

export function Estatistica({ emoji, valor, rotulo, cor }: { emoji: string; valor: string | number; rotulo?: string; cor?: string }) {
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
  return <Text style={[styles.titulo, estilo]}>{children}</Text>;
}

export const styles = StyleSheet.create({
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
    backgroundColor: cores.fundo,
    borderRadius: 18,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: cores.borda,
    padding: 16,
  },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 2, borderBottomWidth: 3, marginRight: 8 },
  chipTexto: { fontWeight: '800', fontSize: 13 },
  estat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  estatEmoji: { fontSize: 22 },
  estatValor: { fontSize: 17, fontWeight: '800', color: cores.texto },
  estatRotulo: { fontSize: 11, color: cores.textoSuave, fontWeight: '600' },
  titulo: { fontSize: 22, fontWeight: '800', color: cores.texto },
});
