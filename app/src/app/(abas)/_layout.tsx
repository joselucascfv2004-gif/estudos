import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useProgresso } from '../../estado/ProgressoContext';
import { cores, useCores } from '../../ui/tema';

const icone = (emoji: string) =>
  function Icone({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
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
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: icone('🏠') }} />
      <Tabs.Screen name="praticar" options={{ title: 'Treinar', tabBarIcon: icone('🎯') }} />
      <Tabs.Screen name="conquistas" options={{ title: 'Progresso', tabBarIcon: icone('📈') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icone('👤') }} />
    </Tabs>
  );
}
