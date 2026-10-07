import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { disciplinasDaProva, getTopico } from '../../data/banco';
import { diferencaDias, hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import {
  LIMITE_PONTO_FRACO,
  MIN_RESPOSTAS_AVALIAR,
  acertoDisciplina,
  pontosFracos,
  proximaRevisao,
  questoesTeimosas,
  revisoesPendentes,
  tamanhoRevisao,
} from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
import { CalendarioRevisoes } from '../../ui/CalendarioRevisoes';
import { Barra, Botao, Cartao } from '../../ui/componentes';
import { ComIcone, Icone } from '../../ui/Icone';
import { clarear, criarEstilos, useCores } from '../../ui/tema';

function quandoFalta(dia: string) {
  const d = diferencaDias(hoje(), dia);
  return d === 1 ? 'amanhã' : `em ${d} dias`;
}

export default function Praticar() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const pendentes = revisoesPendentes(p).length;
  const proxima = proximaRevisao(p);
  // sem revisão vencida, dá para fazer uma revisão surpresa com questões de dias anteriores
  const surpresa = pendentes ? 0 : tamanhoRevisao(p);
  const fracos = pontosFracos(p).slice(0, 3);
  const teimosas = questoesTeimosas(p).length;
  const plural = (n: number) => (n === 1 ? 'questão' : 'questões');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Treinar</Text>

        <Cartao estilo={{ backgroundColor: c.roxoClaro, borderColor: c.roxoBorda }}>
          <ComIcone icone="brain" cor={c.roxo} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Revisão
          </ComIcone>
          <Text style={s.sub}>
            {pendentes
              ? `${pendentes} ${plural(pendentes)} esperando revisão. As que você erra voltam logo; as que acerta, cada vez mais tarde.`
              : proxima
                ? `Nada para hoje. Próxima revisão ${quandoFalta(proxima.dia)}: ${proxima.quantidade} ${plural(proxima.quantidade)}.`
                : 'As questões que você responde voltam aqui em outros dias, para fixar na memória.'}
          </Text>
          <CalendarioRevisoes />
          <Text style={[s.dica, { marginTop: 10 }]} onPress={() => router.push('/perfil')}>
            Escolher o que revisar mais (no Perfil)
          </Text>
          <Botao
            testID="btn-revisao"
            titulo={pendentes ? `Revisar ${Math.min(pendentes, 10)} agora` : surpresa ? `Revisão surpresa (${surpresa})` : 'Nada para revisar ainda'}
            cor={c.roxo}
            desativado={!pendentes && !surpresa}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
          />
          {teimosas > 0 && (
            <>
              <Botao
                estilo={{ marginTop: 10 }}
                testID="btn-teimosas"
                titulo={`Questões que mais erro (${Math.min(teimosas, 10)})`}
                contorno
                cor={c.roxo}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'teimosas' } })}
              />
            </>
          )}
        </Cartao>

        <Cartao estilo={{ backgroundColor: c.vermelhoClaro, borderColor: c.vermelhoBorda }}>
          <ComIcone icone="target" cor={c.vermelho} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Pontos fracos
          </ComIcone>
          {fracos.length ? (
            <>
              <Text style={s.sub}>Assuntos com menos de {LIMITE_PONTO_FRACO}% de acerto. Toque em um para treinar só ele.</Text>
              <View style={{ gap: 8, marginBottom: 12 }}>
                {fracos.map((f) => {
                  const info = getTopico(f.topicoId);
                  return (
                    <Cartao
                      key={f.topicoId}
                      testID={`fraco-${f.topicoId}`}
                      estilo={s.fraco}
                      onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos', topico: f.topicoId } })}
                    >
                      <View style={s.linhaFraco}>
                        <Icone nome={info?.disciplina.icone ?? 'book-outline'} tamanho={20} cor={info?.disciplina.cor} />
                        <Text style={s.nomeFraco} numberOfLines={2}>
                          {info?.topico.titulo}
                        </Text>
                        <Text style={s.pct}>{f.acerto}%</Text>
                      </View>
                      <Barra valor={f.acerto / 100} cor={c.vermelho} altura={8} />
                    </Cartao>
                  );
                })}
              </View>
              <Botao
                testID="btn-fracos"
                titulo="Treinar pontos fracos"
                cor={c.vermelho}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos' } })}
              />
              <Text testID="btn-dificuldades" style={[s.dica, { color: c.vermelho, marginTop: 12, marginBottom: 0, textAlign: 'center' }]} onPress={() => router.push('/dificuldades')}>
                Ver relatório completo
              </Text>
            </>
          ) : (
            <Text style={s.sub}>
              Nenhum por enquanto. Um assunto aparece aqui quando você acerta menos de {LIMITE_PONTO_FRACO}% das últimas questões dele (com pelo
              menos {MIN_RESPOSTAS_AVALIAR} respondidas).
            </Text>
          )}
          {!fracos.length && Object.keys(p.questoes).length > 0 && (
            <Text style={[s.dica, { color: c.vermelho, marginBottom: 0, textAlign: 'center' }]} onPress={() => router.push('/dificuldades')}>
              Ver meu relatório de acertos
            </Text>
          )}
        </Cartao>

        <View style={s.blocos}>
          <Bloco testID="btn-simulado" icone="timer-outline" cor={c.laranja} titulo="Simulado" sub={p.simulados.length ? `Último: ${p.simulados[p.simulados.length - 1].acertos}/${p.simulados[p.simulados.length - 1].total}` : 'Com tempo de prova'} onPress={() => router.push('/simulado')} />
          <Bloco icone="shuffle-variant" cor={c.azul} titulo="Treino misto" sub="10 questões de tudo" onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino' } })} />
          <Bloco testID="cartao-redacao" icone="draw-pen" cor={c.roxo} titulo="Redação" sub="Temas do ENEM" onPress={() => router.push('/redacao')} />
          <Bloco
            testID="cartao-salvas"
            icone="star"
            cor={c.amarelo}
            titulo="Salvas"
            sub={Object.keys(p.salvas).length ? `${Object.keys(p.salvas).length} questões` : 'Nenhuma ainda'}
            onPress={() => router.push('/salvas')}
          />
        </View>

        <Text style={s.secao}>Treinar por disciplina</Text>
        <View style={{ gap: 10 }}>
          {disciplinasDaProva(p.prova, p.lingua).map((d) => {
            const acerto = acertoDisciplina(p, d.id);
            return (
              <Cartao
                key={d.id}
                estilo={[s.linha, { backgroundColor: clarear(d.cor, 0.1, c.fundo), borderColor: clarear(d.cor, 0.4, c.fundo) }]}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino', disciplina: d.id } })}
              >
                <Icone nome={d.icone} tamanho={26} cor={d.cor} />
                <View style={{ flex: 1 }}>
                  <Text style={s.nome}>{d.nome}</Text>
                  {acerto != null && <Text style={s.acerto}>{acerto}% de acerto</Text>}
                </View>
                <Icone nome="chevron-right" tamanho={24} cor={d.cor} />
              </Cartao>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Bloco({ icone, cor, titulo, sub, onPress, testID }: { icone: string; cor: string; titulo: string; sub: string; onPress: () => void; testID?: string }) {
  const s = useEstilos();
  return (
    <Cartao testID={testID} estilo={s.bloco} onPress={onPress}>
      <Icone nome={icone} tamanho={28} cor={cor} />
      <Text style={s.nome}>{titulo}</Text>
      <Text style={s.acerto} numberOfLines={1}>
        {sub}
      </Text>
    </Cartao>
  );
}

const useEstilos = criarEstilos((c) => ({
  blocos: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  bloco: { width: '48.5%', padding: 14, gap: 4 },
  titulo: { fontSize: 26, fontWeight: '800', color: c.texto },
  cartaoTitulo: { fontSize: 19, fontWeight: '800', color: c.texto },
  sub: { fontSize: 14, color: c.textoSuave, fontWeight: '600', marginVertical: 10, lineHeight: 20 },
  dica: { fontSize: 13, color: c.roxo, fontWeight: '800', marginBottom: 12, textDecorationLine: 'underline' },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  nome: { fontSize: 16, fontWeight: '800', color: c.texto },
  acerto: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
  fraco: { backgroundColor: c.fundo, padding: 12, gap: 8 },
  linhaFraco: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nomeFraco: { flex: 1, fontSize: 15, fontWeight: '800', color: c.texto },
  pct: { fontSize: 15, fontWeight: '800', color: c.vermelhoEscuro },
}));
