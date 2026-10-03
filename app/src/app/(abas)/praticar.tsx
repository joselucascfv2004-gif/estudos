import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { disciplinasDaProva, getTopico } from '../../data/banco';
import { getProva } from '../../data/provas';
import { diferencaDias, hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import {
  INTERVALOS,
  LIMITE_PONTO_FRACO,
  MIN_RESPOSTAS_AVALIAR,
  acertoDisciplina,
  pontosFracos,
  proximaRevisao,
  revisoesPendentes,
} from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
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
  const fracos = pontosFracos(p).slice(0, 5);
  const plural = (n: number) => (n === 1 ? 'questão' : 'questões');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Praticar</Text>

        <Cartao estilo={{ backgroundColor: c.roxoClaro, borderColor: c.roxoBorda }}>
          <ComIcone icone="brain" cor={c.roxo} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Revisão do dia
          </ComIcone>
          <Text style={s.sub}>
            {pendentes
              ? `${pendentes} ${plural(pendentes)} para revisar hoje. Quem acerta volta cada vez mais tarde (${INTERVALOS.slice(1).join(', ')} dias); quem erra volta logo.`
              : proxima
                ? `Tudo revisado por hoje! Próxima revisão ${quandoFalta(proxima.dia)}: ${proxima.quantidade} ${plural(proxima.quantidade)}.`
                : 'As questões que você responder voltam aqui com o passar dos dias, para fixar o conteúdo na memória.'}
          </Text>
          <Botao
            testID="btn-revisao"
            titulo={pendentes ? `Revisar ${Math.min(pendentes, 10)} agora` : 'Nada para revisar hoje'}
            cor={c.roxo}
            desativado={!pendentes}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
          />
        </Cartao>

        <Cartao estilo={{ backgroundColor: c.vermelhoClaro, borderColor: c.vermelhoBorda }}>
          <ComIcone icone="target" cor={c.vermelho} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Pontos fracos
          </ComIcone>
          {fracos.length ? (
            <>
              <Text style={s.sub}>Assuntos em que você acertou menos de {LIMITE_PONTO_FRACO}% nas últimas questões. Toque em um para treinar só ele.</Text>
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
            </>
          ) : (
            <Text style={s.sub}>
              Nenhum ponto fraco por enquanto. O app acompanha as suas respostas: quando você acertar menos de {LIMITE_PONTO_FRACO}% das últimas
              questões de um assunto (com pelo menos {MIN_RESPOSTAS_AVALIAR} respondidas), ele aparece aqui.
            </Text>
          )}
        </Cartao>

        <Cartao estilo={{ backgroundColor: c.amareloClaro, borderColor: c.amarelo }}>
          <ComIcone icone="timer-outline" cor={c.laranja} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Simulado
          </ComIcone>
          <Text style={s.sub}>
            Prova com tempo marcando e gabarito só no final, como no dia da prova.
            {p.simulados.length ? ` Último: ${p.simulados[p.simulados.length - 1].acertos}/${p.simulados[p.simulados.length - 1].total} acertos.` : ''}
          </Text>
          <Botao testID="btn-simulado" titulo="Fazer simulado" cor={c.laranja} onPress={() => router.push('/simulado')} />
        </Cartao>

        <Cartao testID="cartao-salvas" estilo={s.linha} onPress={() => router.push('/salvas')}>
          <Icone nome="star" tamanho={26} cor={c.amarelo} />
          <View style={{ flex: 1 }}>
            <Text style={s.nome}>Questões salvas</Text>
            <Text style={s.acerto}>
              {Object.keys(p.salvas).length
                ? `${Object.keys(p.salvas).length} salvas, com as suas anotações`
                : 'Salve questões durante as lições para rever depois'}
            </Text>
          </View>
          <Icone nome="chevron-right" tamanho={24} cor={c.amarelo} />
        </Cartao>

        <Cartao estilo={{ backgroundColor: c.azulClaro, borderColor: c.azulBorda }}>
          <ComIcone icone="shuffle-variant" cor={c.azul} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Treino misto
          </ComIcone>
          <Text style={s.sub}>10 questões sorteadas de tudo o que você já liberou nas matérias de {getProva(p.prova).nome}.</Text>
          <Botao titulo="Treinar" cor={c.azul} onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino' } })} />
        </Cartao>

        <Text style={s.secao}>Treinar por disciplina</Text>
        <View style={{ gap: 10 }}>
          {disciplinasDaProva(p.prova).map((d) => {
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

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 26, fontWeight: '800', color: c.texto },
  cartaoTitulo: { fontSize: 19, fontWeight: '800', color: c.texto },
  sub: { fontSize: 14, color: c.textoSuave, fontWeight: '600', marginVertical: 10, lineHeight: 20 },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  nome: { fontSize: 16, fontWeight: '800', color: c.texto },
  acerto: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
  fraco: { backgroundColor: c.fundo, padding: 12, gap: 8 },
  linhaFraco: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nomeFraco: { flex: 1, fontSize: 15, fontWeight: '800', color: c.texto },
  pct: { fontSize: 15, fontWeight: '800', color: c.vermelhoEscuro },
}));
