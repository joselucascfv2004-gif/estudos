import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProgressoProvider } from '../estado/ProgressoContext';
import { useCores } from '../ui/tema';

function Navegacao() {
  const c = useCores();
  return (
    <>
      <StatusBar style={c.escuro ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.fundo } }}>
        <Stack.Screen name="(abas)" />
        <Stack.Screen name="boas-vindas" options={{ gestureEnabled: false }} />
        <Stack.Screen name="disciplina/[id]" />
        <Stack.Screen name="licao" options={{ gestureEnabled: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="simulado" options={{ gestureEnabled: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="salvas" />
        <Stack.Screen name="resumo" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProgressoProvider>
        <Navegacao />
      </ProgressoProvider>
    </SafeAreaProvider>
  );
}
