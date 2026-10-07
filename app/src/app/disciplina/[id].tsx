import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { NOMES_NIVEL, Nivel, Topico, disciplinasDaProva, getDisciplina, incidencia, questoesDoTopico, totalOficiais } from '../../data/banco';
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
import { ComIcone, Icone } from '../../ui/Icone';
import { clarear, coresNivel, criarEstilos, escurecer, useCores } from '../../ui/tema';

export default function TelaDisciplina() {
  const c = useCores();
  const s = useEstilos();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { p, atualizar } = useProgresso();
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
  // mostra os tópicos da prova escolhida; se nenhum, mostra todos
  const daProva = disciplinasDaProva(p.prova, p.lingua).find((x) => x.id === id);
  const d = daProva ?? completa;
  const ocultos = completa.topicos.length - d.topicos.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <View style={[s.topo, { backgroundColor: d.cor, borderBottomColor: escurecer(d.cor) }]}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} hitSlop={12}>
          <Icone nome="arrow-left" tamanho={28} cor="#FFF" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <ComIcone icone={d.icone} cor="#FFF" tamanho={22} estiloTexto={s.topoTitulo}>
            {d.nome}
          </ComIcone>
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
                {coroas > 0 ? <Icone nome={coroas === 3 ? 'crown' : 'star'} tamanho={34} cor="#FFF" /> : <Text style={s.noTexto}>{String(i + 1)}</Text>}
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
                {fraco && (
                  <ComIcone icone="target" cor={c.vermelhoEscuro} tamanho={13} estilo={{ gap: 2, marginLeft: 4 }} estiloTexto={s.alerta}>
                    ponto fraco
                  </ComIcone>
                )}
              </View>
            </View>
          );
        })}
        {ocultos > 0 && (
          <Text style={s.ocultos}>
            + {ocultos} tópico{ocultos > 1 ? 's' : ''} que não cai{ocultos > 1 ? 'em' : ''} na sua prova. Para ver tudo, escolha “Tudo” no Perfil.
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
            <Text style={s.provas}>
              Cai em: {aberto.provas.join(' · ')} · {['', 'cai pouco', 'cai às vezes', 'cai com frequência', 'cai bastante', 'cai muito'][incidencia(aberto)]}
              {totalOficiais(aberto) > 0 && ` · inclui ${totalOficiais(aberto)} ${totalOficiais(aberto) === 1 ? 'questão real' : 'questões reais'} do ENEM`}
            </Text>
            {!!(aberto.resumo || aberto.aula) && (
              <Botao
                testID="btn-resumo"
                icone="book-open-variant"
                titulo={aberto.aula ? 'Estudar a teoria (aula completa)' : 'Ler o resumo (2 min)'}
                contorno
                cor={d.cor}
                pequeno
                onPress={() => {
                  setAberto(null);
                  router.push({ pathname: '/resumo', params: { topico: aberto.id } });
                }}
              />
            )}
            {!!aberto.videos?.length && (
              <Botao
                testID="btn-video"
                icone="play-box-outline"
                titulo={aberto.videos.length > 1 ? `Assistir vídeo-aulas (${aberto.videos.length})` : 'Assistir vídeo-aula'}
                contorno
                cor={d.cor}
                pequeno
                estilo={{ marginTop: 8 }}
                onPress={() => {
                  setAberto(null);
                  router.push({ pathname: '/video', params: { topico: aberto.id } });
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
                  <ComIcone
                    icone={fraco ? 'target' : 'check-circle-outline'}
                    cor={fraco ? c.vermelhoEscuro : c.verdeEscuro}
                    tamanho={18}
                    estiloTexto={[s.provas, { color: fraco ? c.vermelhoEscuro : c.verdeEscuro }]}
                  >
                    {fraco
                      ? `Ponto fraco: ${des.acerto}% de acerto nas últimas ${des.respostas} questões. Toque para treinar seus erros.`
                      : `${des.acerto}% de acerto nas últimas ${des.respostas} questões.`}
                  </ComIcone>
                </Pressable>
              );
            })()}
            {(() => {
              const marcado = p.prefRevisao.topicos.includes(aberto.id);
              return (
                <Pressable
                  testID="revisar-mais"
                  onPress={() =>
                    atualizar((x) => ({
                      ...x,
                      prefRevisao: {
                        ...x.prefRevisao,
                        topicos: marcado ? x.prefRevisao.topicos.filter((t) => t !== aberto.id) : [...x.prefRevisao.topicos, aberto.id],
                      },
                    }))
                  }
                >
                  <ComIcone
                    icone={marcado ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    cor={c.roxo}
                    tamanho={20}
                    estiloTexto={[s.provas, { color: c.texto }]}
                  >
                    {marcado ? 'Este assunto aparece mais nas suas revisões' : 'Revisar mais este assunto'}
                  </ComIcone>
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
                    <ComIcone icone={livre ? cn.icone : 'lock-outline'} cor={livre ? cn.escura : c.cinza} estiloTexto={[s.nivelNome, { color: livre ? c.texto : c.cinza }]}>
                      {NOMES_NIVEL[n]}
                    </ComIcone>
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
                  {livre && <Icone nome="chevron-right" tamanho={28} cor={cn.escura} estilo={{ marginLeft: 6 }} />}
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
  alerta: { fontSize: 11, fontWeight: '800', color: c.vermelhoEscuro },
  topo: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 4 },
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
}));
