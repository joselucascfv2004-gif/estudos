import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProgressoProvider } from '../estado/ProgressoContext';
import { cores } from '../ui/tema';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProgressoProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: cores.fundo } }}>
          <Stack.Screen name="(abas)" />
          <Stack.Screen name="boas-vindas" options={{ gestureEnabled: false }} />
          <Stack.Screen name="disciplina/[id]" />
          <Stack.Screen name="licao" options={{ gestureEnabled: false, animation: 'slide_from_bottom' }} />
        </Stack>
      </ProgressoProvider>
    </SafeAreaProvider>
  );
}
