import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Botao, Cabecalho, Cartao } from './componentes';
import { Icone } from './Icone';
import { criarEstilos, escurecer, useCores } from './tema';

/** Vibração curta de acerto/erro (ignora aparelhos sem suporte). */
export function vibrar(acertou: boolean) {
  if (Platform.OS === 'web') return;
  Haptics.notificationAsync(acertou ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {});
}

/** Hora atual, atualizada a cada 100 ms enquanto `ativo` (para cronômetros na tela). */
export function useAgora(ativo: boolean) {
  const [agora, setAgora] = useState(Date.now());
  useEffect(() => {
    if (!ativo) return;
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 100);
    return () => clearInterval(t);
  }, [ativo]);
  return agora;
}

export function BarraTempo({ fracao, cor, alerta = true }: { fracao: number; cor: string; alerta?: boolean }) {
  const c = useCores();
  const f = Math.max(0, Math.min(1, fracao));
  return (
    <View style={{ height: 10, borderRadius: 10, backgroundColor: c.cinzaClaro, overflow: 'hidden' }}>
      <View style={{ width: `${f * 100}%`, height: '100%', borderRadius: 10, backgroundColor: alerta && f < 0.25 ? c.vermelho : cor }} />
    </View>
  );
}

/** Placar do topo: pontos, sequência (com multiplicador) e vidas ou tempo. */
export function Placar({ pontos, sequencia, mult, vidas, tempo }: { pontos?: number; sequencia?: number; mult?: number; vidas?: number; tempo?: number }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={s.placar}>
      {pontos !== undefined && (
        <View style={s.placarItem}>
          <Icone nome="star-four-points" tamanho={20} cor={c.amarelo} />
          <Text testID="pontos" style={s.placarTexto}>
            {pontos}
          </Text>
        </View>
      )}
      {sequencia !== undefined && (
        <View style={s.placarItem}>
          <Icone nome="fire" tamanho={20} cor={c.laranja} />
          <Text style={s.placarTexto}>
            {sequencia}
            {mult && mult > 1 ? <Text style={{ color: c.laranja }}> ×{String(mult).replace('.', ',')}</Text> : null}
          </Text>
        </View>
      )}
      {vidas !== undefined && (
        <View style={s.placarItem}>
          {[0, 1, 2].map((i) => (
            <Icone key={i} nome={i < vidas ? 'heart' : 'heart-outline'} tamanho={20} cor={c.vermelho} />
          ))}
        </View>
      )}
      {tempo !== undefined && (
        <View style={s.placarItem}>
          <Icone nome="timer-outline" tamanho={20} cor={c.azul} />
          <Text testID="tempo" style={s.placarTexto}>
            {Math.ceil(tempo)}s
          </Text>
        </View>
      )}
    </View>
  );
}

const TECLAS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '−', '0', '⌫'];

/** Teclado numérico grande (com sinal de menos e apagar). */
export function Teclado({ onTecla, cor }: { onTecla: (t: string) => void; cor: string }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={s.teclado}>
      {TECLAS.map((t) => (
        <Pressable
          key={t}
          testID={`tecla-${t === '−' ? 'menos' : t === '⌫' ? 'apagar' : t}`}
          onPress={() => onTecla(t)}
          style={({ pressed }) => [s.tecla, { borderColor: pressed ? cor : c.borda, marginTop: pressed ? 2 : 0, borderBottomWidth: pressed ? 2 : 4 }]}
        >
          {t === '⌫' ? <Icone nome="backspace-outline" tamanho={26} cor={c.textoSuave} /> : <Text style={s.teclaTexto}>{t}</Text>}
        </Pressable>
      ))}
    </View>
  );
}

/** Grupo de opções de configuração (modo, operação, nível...). */
export function Opcoes<T extends string | number>({
  titulo,
  opcoes,
  valor,
  onEscolher,
  cor,
  prefixo,
}: {
  titulo: string;
  opcoes: { id: T; nome: string; detalhe?: string }[];
  valor: T;
  onEscolher: (v: T) => void;
  cor: string;
  prefixo: string;
}) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.opcoesTitulo}>{titulo}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {opcoes.map((o) => {
          const ativo = o.id === valor;
          return (
            <Pressable
              key={String(o.id)}
              testID={`${prefixo}-${o.id}`}
              onPress={() => onEscolher(o.id)}
              style={[s.opcao, { borderColor: ativo ? cor : c.borda, backgroundColor: ativo ? cor + '22' : c.fundo }]}
            >
              <Text style={[s.opcaoTexto, ativo && { color: escurecer(cor, 0.75) }]}>{o.nome}</Text>
              {!!o.detalhe && <Text style={s.opcaoDetalhe}>{o.detalhe}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/** Estrutura das telas de jogo: cabeçalho e conteúdo rolável (configuração) ou fixo (partida). */
export function TelaJogo({ titulo, icone, children, rolar = true }: { titulo: string; icone: string; children: ReactNode; rolar?: boolean }) {
  const c = useCores();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo={titulo} icone={icone} />
      {rolar ? <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 30 }}>{children}</ScrollView> : <View style={{ flex: 1, padding: 18 }}>{children}</View>}
    </SafeAreaView>
  );
}

/** Resultado da partida. */
export function Resultado({
  pontos,
  recorde,
  novoRecorde,
  xp,
  linhas,
  cor,
  onDeNovo,
  extra,
}: {
  pontos: number;
  recorde: number;
  novoRecorde: boolean;
  xp: number;
  linhas: [string, string][];
  cor: string;
  onDeNovo: () => void;
  extra?: ReactNode;
}) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View testID="resultado">
      <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 18 }}>
        <Icone nome={novoRecorde ? 'trophy' : 'flag-checkered'} tamanho={64} cor={novoRecorde ? c.amarelo : cor} />
        <Text style={s.fimTitulo}>{novoRecorde ? 'Novo recorde!' : 'Fim de jogo'}</Text>
        <Text testID="pontos-final" style={[s.fimPontos, { color: cor }]}>
          {pontos} pontos
        </Text>
        <Text style={s.fimRecorde}>{novoRecorde ? 'Você superou a sua melhor marca.' : `Seu recorde: ${recorde} pontos`}</Text>
      </View>
      <Cartao estilo={{ gap: 8 }}>
        {linhas.map(([k, v]) => (
          <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={s.linhaRotulo}>{k}</Text>
            <Text style={s.linhaValor}>{v}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={s.linhaRotulo}>XP ganho</Text>
          <Text style={[s.linhaValor, { color: c.verde }]}>+{xp}</Text>
        </View>
      </Cartao>
      {extra}
      <Botao testID="btn-jogar-de-novo" titulo="Jogar de novo" cor={cor} estilo={{ marginTop: 20 }} onPress={onDeNovo} />
      <Botao testID="btn-sair-jogo" titulo="Voltar aos jogos" contorno cor={cor} estilo={{ marginTop: 12 }} onPress={() => (router.canGoBack() ? router.back() : router.replace('/jogos'))} />
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  placar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  placarItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  placarTexto: { fontSize: 18, fontWeight: '800', color: c.texto },
  teclado: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  tecla: { width: '31.5%', height: 58, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: c.fundo },
  teclaTexto: { fontSize: 26, fontWeight: '800', color: c.texto },
  opcoesTitulo: { fontSize: 15, fontWeight: '800', color: c.texto, marginBottom: 8 },
  opcao: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 14, borderWidth: 2, borderBottomWidth: 4 },
  opcaoTexto: { fontSize: 14, fontWeight: '800', color: c.texto },
  opcaoDetalhe: { fontSize: 12, color: c.textoSuave, marginTop: 2 },
  fimTitulo: { fontSize: 26, fontWeight: '800', color: c.texto, marginTop: 8 },
  fimPontos: { fontSize: 34, fontWeight: '900', marginTop: 4 },
  fimRecorde: { fontSize: 14, fontWeight: '700', color: c.textoSuave, marginTop: 4 },
  linhaRotulo: { fontSize: 15, color: c.textoSuave, fontWeight: '700' },
  linhaValor: { fontSize: 15, color: c.texto, fontWeight: '800' },
}));
