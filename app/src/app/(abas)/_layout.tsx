import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

import { useProgresso } from '../../estado/ProgressoContext';
import { cores } from '../../ui/tema';

const icone = (emoji: string) =>
  function Icone({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>;
  };

export default function AbasLayout() {
  const { carregado, p } = useProgresso();
  if (!carregado) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.fundo }}>
        <ActivityIndicator color={cores.verde} size="large" />
      </View>
    );
  }
  if (!p.onboarding) return <Redirect href="/boas-vindas" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.azul,
        tabBarInactiveTintColor: cores.cinza,
        tabBarLabelStyle: { fontWeight: '800', fontSize: 11 },
        tabBarStyle: { borderTopWidth: 2, borderTopColor: cores.borda, height: 64, paddingTop: 6 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Aprender', tabBarIcon: icone('🏠') }} />
      <Tabs.Screen name="praticar" options={{ title: 'Praticar', tabBarIcon: icone('🏋️') }} />
      <Tabs.Screen name="conquistas" options={{ title: 'Conquistas', tabBarIcon: icone('🏆') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icone('👤') }} />
    </Tabs>
  );
}
