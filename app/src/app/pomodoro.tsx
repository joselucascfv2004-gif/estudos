import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { hoje } from '../estado/datas';
import { FOCOS_ATE_PAUSA_LONGA, NOMES_FASE, RITMOS, formatarTempo, usePomodoro } from '../estado/PomodoroContext';
import { useProgresso } from '../estado/ProgressoContext';
import { Botao, Cabecalho, Cartao, Chip } from '../ui/componentes';
import { ComIcone } from '../ui/Icone';
import { criarEstilos, useCores } from '../ui/tema';

/** Técnica Pomodoro: blocos de foco com pausas, e atalhos para estudar durante o foco. */
export default function TelaPomodoro() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const pomo = usePomodoro();
  const { fase, fimEm, restantePausado, ciclos, terminou, config, restante } = pomo;
  const pausado = !!fase && !fimEm && restantePausado != null;
  const cor = fase === 'foco' || !fase ? c.vermelho : c.verde;
  const total = (fase ? config[fase] : config.foco) * 60_000;
  const feitosHoje = p.pomodoros[hoje()] ?? 0;
  const proximoLonga = FOCOS_ATE_PAUSA_LONGA - (ciclos % FOCOS_ATE_PAUSA_LONGA);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Pomodoro" icone="timer-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Cartao estilo={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={[s.fase, { color: cor }]}>{fase ? NOMES_FASE[fase] : terminou === 'foco' ? 'Foco concluído!' : 'Pronto para focar?'}</Text>
          <View style={[s.circulo, { borderColor: cor }]}>
            <Text testID="pomodoro-tempo" style={[s.tempo, { color: cor }]}>
              {formatarTempo(restante)}
            </Text>
            <Text style={s.sub}>{pausado ? 'pausado' : fase ? `de ${formatarTempo(total)}` : `${config.foco} min de foco`}</Text>
          </View>
          <View style={s.trilho}>
            <View style={{ width: `${Math.min(100, (1 - restante / total) * 100)}%`, height: '100%', backgroundColor: cor, borderRadius: 6 }} />
          </View>
          <Text style={s.sub}>
            {ciclos > 0 ? `${ciclos} foco${ciclos > 1 ? 's' : ''} nesta sequência · ` : ''}
            {proximoLonga === FOCOS_ATE_PAUSA_LONGA && ciclos > 0 ? 'pausa longa agora' : `pausa longa depois de mais ${proximoLonga}`}
          </Text>

          <View style={{ alignSelf: 'stretch', gap: 10, marginTop: 18 }}>
            {!fase && <Botao testID="btn-pomodoro-iniciar" icone="play" titulo="Começar foco" cor={c.vermelho} onPress={() => pomo.iniciar('foco')} />}
            {fase && !pausado && <Botao icone="pause" titulo="Pausar" cor={cor} onPress={pomo.pausar} />}
            {pausado && <Botao icone="play" titulo="Continuar" cor={cor} onPress={pomo.retomar} />}
            {fase && (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Botao titulo={fase === 'foco' ? 'Pular para a pausa' : 'Pular pausa'} contorno cor={cor} pequeno estilo={{ flex: 1 }} onPress={pomo.pular} />
                <Botao titulo="Parar" contorno cor={c.cinza} pequeno estilo={{ flex: 1 }} onPress={pomo.parar} />
              </View>
            )}
          </View>
        </Cartao>

        {fase === 'foco' && (
          <Cartao>
            <Text style={s.titulo}>Estude durante o foco</Text>
            <Text style={s.texto}>O relógio continua contando enquanto você usa o app. Escolha o que fazer neste bloco:</Text>
            <View style={{ gap: 8 }}>
              <Botao pequeno contorno cor={c.azul} icone="clipboard-check-outline" titulo="Plano de hoje" onPress={() => router.navigate('/')} />
              <Botao pequeno contorno cor={c.roxo} icone="cards-outline" titulo="Flashcards do dia" onPress={() => router.push({ pathname: '/flashcards', params: { modo: 'dia' } })} />
              <Botao pequeno contorno cor={c.verde} icone="book-open-page-variant-outline" titulo="Ler uma aula" onPress={() => router.navigate('/estudar')} />
            </View>
          </Cartao>
        )}

        <Cartao>
          <Text style={s.titulo}>Ritmo</Text>
          <View style={s.chips}>
            {RITMOS.map((r) => (
              <Chip
                key={r.nome}
                texto={`${r.nome} · ${r.config.foco}/${r.config.pausa}`}
                ativo={r.config.foco === config.foco && r.config.pausa === config.pausa}
                cor={c.vermelho}
                onPress={() => !fase && pomo.mudarConfig(r.config)}
              />
            ))}
          </View>
          <Text style={s.mini}>{fase ? 'Para trocar o ritmo, pare o Pomodoro.' : `Foco de ${config.foco} min, pausa de ${config.pausa} min e, a cada ${FOCOS_ATE_PAUSA_LONGA} focos, pausa longa de ${config.longa} min.`}</Text>
        </Cartao>

        <Cartao>
          <ComIcone icone="lightbulb-on-outline" cor={c.amarelo} estiloTexto={s.titulo}>
            Como funciona
          </ComIcone>
          <Text style={s.texto}>
            O método Pomodoro divide o estudo em blocos curtos de atenção total, separados por pausas. Saber que a pausa está perto ajuda a começar e a
            não se distrair; as pausas evitam o cansaço e deixam a mente pronta para o próximo bloco.
          </Text>
          <Text style={s.item}>• Durante o foco: celular no silencioso, nada de redes sociais. Uma tarefa só.</Text>
          <Text style={s.item}>• Na pausa: levante, beba água, olhe para longe. Não comece outra tarefa.</Text>
          <Text style={s.item}>• Se lembrar de algo no meio do foco, anote e volte ao estudo.</Text>
          <Text style={s.item}>• O app avisa no fim de cada fase, mesmo com a tela desligada.</Text>
          <Text style={[s.mini, { marginTop: 8 }]}>Hoje: {feitosHoje} foco{feitosHoje === 1 ? '' : 's'} concluído{feitosHoje === 1 ? '' : 's'}.</Text>
        </Cartao>
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  fase: { fontSize: 20, fontWeight: '800', marginBottom: 14 },
  circulo: { width: 210, height: 210, borderRadius: 105, borderWidth: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  tempo: { fontSize: 52, fontWeight: '800', fontVariant: ['tabular-nums'] },
  sub: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginTop: 4, textAlign: 'center' },
  trilho: { alignSelf: 'stretch', height: 10, borderRadius: 6, backgroundColor: c.fundoSuave, overflow: 'hidden', marginBottom: 6 },
  titulo: { fontSize: 17, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20, marginVertical: 8 },
  item: { fontSize: 14, color: c.texto, fontWeight: '600', lineHeight: 21 },
  mini: { fontSize: 12, color: c.textoSuave, fontWeight: '600', marginTop: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginTop: 10 },
}));
