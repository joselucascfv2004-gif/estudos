import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, ColorValue, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useProgresso } from '../../estado/ProgressoContext';
import { Icone } from '../../ui/Icone';
import { cores, useCores } from '../../ui/tema';

const icone = (nome: string, nomeAtivo: string) =>
  function IconeAba({ focused, color }: { focused: boolean; color: ColorValue }) {
    return <Icone nome={focused ? nomeAtivo : nome} tamanho={26} cor={String(color)} />;
  };

export default function AbasLayout() {
  const { carregado, p } = useProgresso();
  const c = useCores();
  // espaço dos botões do Android (voltar, início...) para a barra não ficar por baixo deles
  const insets = useSafeAreaInsets();
  if (!carregado) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.fundo }}>
        <ActivityIndicator color={cores.verde} size="large" />
      </View>
    );
  }
  if (!p.onboarding) return <Redirect href="/boas-vindas" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.azul,
        tabBarInactiveTintColor: c.textoSuave,
        tabBarLabelStyle: { fontWeight: '800', fontSize: 12 },
        tabBarStyle: {
          backgroundColor: c.fundo,
          borderTopWidth: 2,
          borderTopColor: c.borda,
          height: 64 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom + 6,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: icone('home-outline', 'home') }} />
      <Tabs.Screen name="praticar" options={{ title: 'Treinar', tabBarIcon: icone('target', 'target') }} />
      <Tabs.Screen name="conquistas" options={{ title: 'Progresso', tabBarIcon: icone('chart-line', 'chart-line') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icone('account-outline', 'account') }} />
    </Tabs>
  );
}
