import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { NOMES_NIVEL, Nivel, Topico, disciplinasDaTrilha, getDisciplina, questoesDoTopico } from '../../data/banco';
import { useProgresso } from '../../estado/ProgressoContext';
import {
  ACERTO_PARA_DESBLOQUEAR,
  LIMITE_PONTO_FRACO,
  MIN_RESPOSTAS_AVALIAR,
  desempenhoTopico,
  dominioNivel,
  dominioTopico,
  nivelDesbloqueado,
} from '../../estado/progresso';
import { Barra, Botao } from '../../ui/componentes';
import { clarear, coresNivel, criarEstilos, escurecer, useCores } from '../../ui/tema';

export default function TelaDisciplina() {
  const c = useCores();
  const s = useEstilos();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { p } = useProgresso();
  const [aberto, setAberto] = useState<Topico | null>(null);
  const insets = useSafeAreaInsets();
  // botão "voltar" do Android fecha a folha de níveis antes de sair da tela
  useEffect(() => {
    if (!aberto) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      setAberto(null);
      return true;
    });
    return () => sub.remove();
  }, [aberto]);
  const completa = getDisciplina(id);
  if (!completa) return null;
  // mostra os tópicos da trilha escolhida; se nenhum, mostra todos
  const daTrilha = disciplinasDaTrilha(p.trilha).find((d) => d.id === id);
  const d = daTrilha ?? completa;
  const ocultos = completa.topicos.length - d.topicos.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <View style={[s.topo, { backgroundColor: d.cor, borderBottomColor: escurecer(d.cor) }]}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} hitSlop={12}>
          <Text style={s.voltar}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={s.topoTitulo}>
            {d.emoji} {d.nome}
          </Text>
          <Text style={s.topoSub}>{d.area}</Text>
        </View>
        <Botao
          pequeno
          titulo="Treinar"
          cor="#FFFFFF"
          corTexto={d.cor}
          onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino', disciplina: d.id } })}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 24, paddingBottom: 60 }}>
        {d.topicos.map((t, i) => {
          const desloc = Math.sin(i * 0.9) * 70;
          const dom = dominioTopico(p, t.id);
          const coroas = ([0, 1, 2] as Nivel[]).filter((n) => (p.topicos[t.id]?.melhor[n] ?? 0) >= ACERTO_PARA_DESBLOQUEAR).length;
          const iniciado = !!p.topicos[t.id];
          const des = desempenhoTopico(p, t.id);
          const fraco = des.respostas >= MIN_RESPOSTAS_AVALIAR && des.acerto < LIMITE_PONTO_FRACO;
          return (
            <View key={t.id} style={[s.noWrap, { transform: [{ translateX: desloc }] }]}>
              <Pressable
                testID={`topico-${i}`}
                onPress={() => setAberto(t)}
                style={({ pressed }) => [
                  s.no,
                  {
                    backgroundColor: iniciado ? d.cor : c.cinzaClaro,
                    borderBottomColor: iniciado ? escurecer(d.cor) : '#CECECE',
                    borderBottomWidth: pressed ? 3 : 8,
                    marginTop: pressed ? 5 : 0,
                  },
                ]}
              >
                <Text style={s.noTexto}>{coroas === 3 ? '👑' : coroas > 0 ? '⭐' : String(i + 1)}</Text>
              </Pressable>
              <Text style={s.noTitulo} numberOfLines={2}>
                {t.titulo}
              </Text>
              <View style={s.pontos}>
                {([0, 1, 2] as Nivel[]).map((n) => (
                  <View
                    key={n}
                    style={[s.ponto, { backgroundColor: (p.topicos[t.id]?.melhor[n] ?? 0) >= ACERTO_PARA_DESBLOQUEAR ? coresNivel[n].cor : c.cinzaClaro }]}
                  />
                ))}
                <Text style={s.noPct}>{Math.round(dom * 100)}%</Text>
                {fraco && <Text style={s.alerta}>🎯 ponto fraco</Text>}
              </View>
            </View>
          );
        })}
        {ocultos > 0 && (
          <Text style={s.ocultos}>
            + {ocultos} tópico{ocultos > 1 ? 's' : ''} de outras trilhas. Escolha a trilha “Tudo” na tela inicial para ver.
          </Text>
        )}
      </ScrollView>

      {aberto && (
        <View style={StyleSheet.absoluteFill}>
          <Pressable style={s.veu} onPress={() => setAberto(null)} />
          <View style={[s.folha, { paddingBottom: 36 + insets.bottom }]}>
            <View style={s.alca} />
            <Text style={s.folhaTitulo}>{aberto.titulo}</Text>
            {!!aberto.descricao && <Text style={s.folhaDesc}>{aberto.descricao}</Text>}
            <Text style={s.provas}>Cai em: {aberto.provas.join(' · ')}</Text>
            {!!aberto.resumo && (
              <Botao
                testID="btn-resumo"
                titulo="📖 Ler o resumo (2 min)"
                contorno
                cor={d.cor}
                pequeno
                onPress={() => {
                  setAberto(null);
                  router.push({ pathname: '/resumo', params: { topico: aberto.id } });
                }}
              />
            )}
            {(() => {
              const des = desempenhoTopico(p, aberto.id);
              if (des.respostas < MIN_RESPOSTAS_AVALIAR) return null;
              const fraco = des.acerto < LIMITE_PONTO_FRACO;
              return (
                <Pressable
                  testID="treinar-fraco"
                  disabled={!fraco}
                  onPress={() => {
                    setAberto(null);
                    router.push({ pathname: '/licao', params: { modo: 'fracos', topico: aberto.id } });
                  }}
                >
                  <Text style={[s.provas, { color: fraco ? c.vermelhoEscuro : c.verdeEscuro }]}>
                    {fraco
                      ? `🎯 Ponto fraco: ${des.acerto}% de acerto nas últimas ${des.respostas} questões. Toque para treinar seus erros.`
                      : `✅ ${des.acerto}% de acerto nas últimas ${des.respostas} questões.`}
                  </Text>
                </Pressable>
              );
            })()}
            {([0, 1, 2] as Nivel[]).map((n) => {
              const livre = nivelDesbloqueado(p, aberto.id, n);
              const total = questoesDoTopico(aberto.id, n).length;
              const dom = dominioNivel(p, aberto.id, n);
              const melhor = p.topicos[aberto.id]?.melhor[n] ?? 0;
              const cn = coresNivel[n];
              return (
                <Pressable
                  key={n}
                  testID={`nivel-${n}`}
                  disabled={!livre || total === 0}
                  onPress={() => {
                    setAberto(null);
                    router.push({ pathname: '/licao', params: { modo: 'topico', topico: aberto.id, nivel: String(n) } });
                  }}
                  style={({ pressed }) => [
                    s.nivel,
                    livre
                      ? { backgroundColor: clarear(cn.cor, 0.15, c.fundo), borderColor: cn.cor, borderBottomColor: cn.escura }
                      : { backgroundColor: c.fundoSuave, borderColor: c.borda },
                    pressed && { borderBottomWidth: 2, marginTop: 2 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[s.nivelNome, { color: livre ? c.texto : c.cinza }]}>
                      {livre ? cn.emoji : '🔒'} {NOMES_NIVEL[n]}
                    </Text>
                    <Text style={s.nivelInfo}>
                      {livre
                        ? `${Math.round(dom * total)}/${total} questões dominadas${melhor ? ` · recorde ${melhor}%` : ''}`
                        : `Faça ${ACERTO_PARA_DESBLOQUEAR}% ou mais no nível ${NOMES_NIVEL[n - 1].toLowerCase()} para liberar`}
                    </Text>
                    {livre && (
                      <View style={{ marginTop: 6 }}>
                        <Barra valor={dom} cor={cn.cor} altura={8} fundo={c.escuro ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"} />
                      </View>
                    )}
                  </View>
                  {livre && <Text style={[s.nivelIr, { color: cn.escura }]}>▶</Text>}
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  alerta: { fontSize: 11, fontWeight: '800', color: c.vermelhoEscuro, marginLeft: 4 },
  topo: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 4 },
  voltar: { fontSize: 28, color: '#FFF', fontWeight: '800' },
  topoTitulo: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  topoSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '700' },
  noWrap: { alignItems: 'center', marginBottom: 26 },
  no: { width: 78, height: 72, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  noTexto: { fontSize: 28, fontWeight: '800', color: '#FFF' },
  noTitulo: { marginTop: 8, fontSize: 14, fontWeight: '800', color: c.texto, textAlign: 'center', maxWidth: 190 },
  pontos: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ponto: { width: 10, height: 10, borderRadius: 5 },
  noPct: { fontSize: 12, color: c.textoSuave, fontWeight: '700', marginLeft: 4 },
  ocultos: { textAlign: 'center', color: c.textoSuave, paddingHorizontal: 30, fontWeight: '600' },
  veu: { flex: 1, backgroundColor: c.veu },
  folha: { backgroundColor: c.fundo, padding: 20, paddingBottom: 36, borderTopLeftRadius: 24, borderTopRightRadius: 24, gap: 10 },
  alca: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: c.borda, marginBottom: 6 },
  folhaTitulo: { fontSize: 22, fontWeight: '800', color: c.texto },
  folhaDesc: { fontSize: 14, color: c.textoSuave, lineHeight: 20 },
  provas: { fontSize: 13, color: c.azulEscuro, fontWeight: '800' },
  nivel: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 2, borderBottomWidth: 4 },
  nivelNome: { fontSize: 17, fontWeight: '800' },
  nivelInfo: { fontSize: 13, color: c.textoSuave, marginTop: 2, fontWeight: '600' },
  nivelIr: { fontSize: 22, marginLeft: 10 },
}));
