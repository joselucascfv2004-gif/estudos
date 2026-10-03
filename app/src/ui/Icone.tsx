import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

import { useCores } from './tema';

export type NomeIcone = ComponentProps<typeof MaterialCommunityIcons>['name'];

/** Ícone monocromático padrão do app (família Material Community Icons). */
export function Icone({ nome, tamanho = 20, cor, estilo }: { nome: NomeIcone | string; tamanho?: number; cor?: string; estilo?: StyleProp<TextStyle> }) {
  const c = useCores();
  return <MaterialCommunityIcons name={nome as NomeIcone} size={tamanho} color={cor ?? c.texto} style={estilo} />;
}

/** Ícone seguido de texto, alinhados na mesma linha. */
export function ComIcone({
  icone,
  children,
  cor,
  tamanho = 20,
  estiloTexto,
  estilo,
  linhas,
}: {
  icone: NomeIcone | string;
  children: React.ReactNode;
  cor?: string;
  tamanho?: number;
  estiloTexto?: StyleProp<TextStyle>;
  estilo?: StyleProp<ViewStyle>;
  linhas?: number;
}) {
  const c = useCores();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, estilo]}>
      <Icone nome={icone} tamanho={tamanho} cor={cor ?? c.texto} />
      <Text style={[{ flexShrink: 1 }, estiloTexto]} numberOfLines={linhas}>
        {children}
      </Text>
    </View>
  );
}
