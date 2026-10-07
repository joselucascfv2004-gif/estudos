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
        <Stack.Screen name="video" />
        <Stack.Screen name="jogos/calculo" options={{ gestureEnabled: false }} />
        <Stack.Screen name="jogos/comparar" options={{ gestureEnabled: false }} />
        <Stack.Screen name="jogos/duelo" options={{ gestureEnabled: false }} />
        <Stack.Screen name="jogos/memoria" options={{ gestureEnabled: false }} />
        <Stack.Screen name="dificuldades" />
        <Stack.Screen name="redacao/index" />
        <Stack.Screen name="redacao/[id]" />
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
