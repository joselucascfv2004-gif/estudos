import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NOMES_NIVEL, Nivel, Topico, disciplinasDaTrilha, getDisciplina, questoesDoTopico } from '../../data/banco';
import { useProgresso } from '../../estado/ProgressoContext';
import { ACERTO_PARA_DESBLOQUEAR, dominioNivel, dominioTopico, nivelDesbloqueado } from '../../estado/progresso';
import { Barra, Botao } from '../../ui/componentes';
import { clarear, cores, coresNivel, escurecer } from '../../ui/tema';

export default function TelaDisciplina() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { p } = useProgresso();
  const [aberto, setAberto] = useState<Topico | null>(null);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
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
          return (
            <View key={t.id} style={[s.noWrap, { transform: [{ translateX: desloc }] }]}>
              <Pressable
                testID={`topico-${i}`}
                onPress={() => setAberto(t)}
                style={({ pressed }) => [
                  s.no,
                  {
                    backgroundColor: iniciado ? d.cor : cores.cinzaClaro,
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
                    style={[s.ponto, { backgroundColor: (p.topicos[t.id]?.melhor[n] ?? 0) >= ACERTO_PARA_DESBLOQUEAR ? coresNivel[n].cor : cores.cinzaClaro }]}
                  />
                ))}
                <Text style={s.noPct}>{Math.round(dom * 100)}%</Text>
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
          <View style={s.folha}>
            <View style={s.alca} />
            <Text style={s.folhaTitulo}>{aberto.titulo}</Text>
            {!!aberto.descricao && <Text style={s.folhaDesc}>{aberto.descricao}</Text>}
            <Text style={s.provas}>Cai em: {aberto.provas.join(' · ')}</Text>
            {([0, 1, 2] as Nivel[]).map((n) => {
              const livre = nivelDesbloqueado(p, aberto.id, n);
              const total = questoesDoTopico(aberto.id, n).length;
              const dom = dominioNivel(p, aberto.id, n);
              const melhor = p.topicos[aberto.id]?.melhor[n] ?? 0;
              const c = coresNivel[n];
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
                      ? { backgroundColor: clarear(c.cor, 0.15), borderColor: c.cor, borderBottomColor: c.escura }
                      : { backgroundColor: cores.fundoSuave, borderColor: cores.borda },
                    pressed && { borderBottomWidth: 2, marginTop: 2 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[s.nivelNome, { color: livre ? cores.texto : cores.cinza }]}>
                      {livre ? c.emoji : '🔒'} {NOMES_NIVEL[n]}
                    </Text>
                    <Text style={s.nivelInfo}>
                      {livre
                        ? `${Math.round(dom * total)}/${total} questões dominadas${melhor ? ` · recorde ${melhor}%` : ''}`
                        : `Faça ${ACERTO_PARA_DESBLOQUEAR}% ou mais no nível ${NOMES_NIVEL[n - 1].toLowerCase()} para liberar`}
                    </Text>
                    {livre && (
                      <View style={{ marginTop: 6 }}>
                        <Barra valor={dom} cor={c.cor} altura={8} fundo="rgba(0,0,0,0.08)" />
                      </View>
                    )}
                  </View>
                  {livre && <Text style={[s.nivelIr, { color: c.escura }]}>▶</Text>}
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topo: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 4 },
  voltar: { fontSize: 28, color: '#FFF', fontWeight: '800' },
  topoTitulo: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  topoSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '700' },
  noWrap: { alignItems: 'center', marginBottom: 26 },
  no: { width: 78, height: 72, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  noTexto: { fontSize: 28, fontWeight: '800', color: '#FFF' },
  noTitulo: { marginTop: 8, fontSize: 14, fontWeight: '800', color: cores.texto, textAlign: 'center', maxWidth: 190 },
  pontos: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ponto: { width: 10, height: 10, borderRadius: 5 },
  noPct: { fontSize: 12, color: cores.textoSuave, fontWeight: '700', marginLeft: 4 },
  ocultos: { textAlign: 'center', color: cores.textoSuave, paddingHorizontal: 30, fontWeight: '600' },
  veu: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  folha: { backgroundColor: cores.fundo, padding: 20, paddingBottom: 36, borderTopLeftRadius: 24, borderTopRightRadius: 24, gap: 10 },
  alca: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: cores.borda, marginBottom: 6 },
  folhaTitulo: { fontSize: 22, fontWeight: '800', color: cores.texto },
  folhaDesc: { fontSize: 14, color: cores.textoSuave, lineHeight: 20 },
  provas: { fontSize: 13, color: cores.azulEscuro, fontWeight: '800' },
  nivel: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 2, borderBottomWidth: 4 },
  nivelNome: { fontSize: 17, fontWeight: '800' },
  nivelInfo: { fontSize: 13, color: cores.textoSuave, marginTop: 2, fontWeight: '600' },
  nivelIr: { fontSize: 22, marginLeft: 10 },
});
