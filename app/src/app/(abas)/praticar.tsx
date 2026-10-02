import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { disciplinasDaTrilha, getTopico } from '../../data/banco';
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
import { clarear, cores } from '../../ui/tema';

function quandoFalta(dia: string) {
  const d = diferencaDias(hoje(), dia);
  return d === 1 ? 'amanhã' : `em ${d} dias`;
}

export default function Praticar() {
  const { p } = useProgresso();
  const pendentes = revisoesPendentes(p).length;
  const proxima = proximaRevisao(p);
  const fracos = pontosFracos(p).slice(0, 5);
  const plural = (n: number) => (n === 1 ? 'questão' : 'questões');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Praticar</Text>

        <Cartao estilo={{ backgroundColor: cores.roxoClaro, borderColor: '#D9B8FF' }}>
          <Text style={s.cartaoTitulo}>🧠 Revisão do dia</Text>
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
            cor={cores.roxo}
            desativado={!pendentes}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
          />
        </Cartao>

        <Cartao estilo={{ backgroundColor: cores.vermelhoClaro, borderColor: '#FFB2B2' }}>
          <Text style={s.cartaoTitulo}>🎯 Pontos fracos</Text>
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
                        <Text style={{ fontSize: 20 }}>{info?.disciplina.emoji}</Text>
                        <Text style={s.nomeFraco} numberOfLines={2}>
                          {info?.topico.titulo}
                        </Text>
                        <Text style={s.pct}>{f.acerto}%</Text>
                      </View>
                      <Barra valor={f.acerto / 100} cor={cores.vermelho} altura={8} />
                    </Cartao>
                  );
                })}
              </View>
              <Botao
                testID="btn-fracos"
                titulo="Treinar pontos fracos"
                cor={cores.vermelho}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos' } })}
              />
            </>
          ) : (
            <Text style={s.sub}>
              Nenhum ponto fraco por enquanto. 💪 O app acompanha as suas respostas: quando você acertar menos de {LIMITE_PONTO_FRACO}% das últimas
              questões de um assunto (com pelo menos {MIN_RESPOSTAS_AVALIAR} respondidas), ele aparece aqui.
            </Text>
          )}
        </Cartao>

        <Cartao estilo={{ backgroundColor: cores.azulClaro, borderColor: '#A8DCF7' }}>
          <Text style={s.cartaoTitulo}>🎲 Treino misto</Text>
          <Text style={s.sub}>10 questões sorteadas de tudo o que você já liberou na trilha {p.trilha === 'Todas' ? 'completa' : p.trilha}.</Text>
          <Botao titulo="Treinar" cor={cores.azul} onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino' } })} />
        </Cartao>

        <Text style={s.secao}>Treinar por disciplina</Text>
        <View style={{ gap: 10 }}>
          {disciplinasDaTrilha(p.trilha).map((d) => {
            const acerto = acertoDisciplina(p, d.id);
            return (
              <Cartao
                key={d.id}
                estilo={[s.linha, { backgroundColor: clarear(d.cor, 0.1), borderColor: clarear(d.cor, 0.4) }]}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'treino', disciplina: d.id } })}
              >
                <Text style={{ fontSize: 26 }}>{d.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.nome}>{d.nome}</Text>
                  {acerto != null && <Text style={s.acerto}>{acerto}% de acerto</Text>}
                </View>
                <Text style={[s.ir, { color: d.cor }]}>▶</Text>
              </Cartao>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  titulo: { fontSize: 26, fontWeight: '800', color: cores.texto },
  cartaoTitulo: { fontSize: 19, fontWeight: '800', color: cores.texto },
  sub: { fontSize: 14, color: cores.textoSuave, fontWeight: '600', marginVertical: 10, lineHeight: 20 },
  secao: { fontSize: 13, fontWeight: '800', color: cores.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  nome: { fontSize: 16, fontWeight: '800', color: cores.texto },
  acerto: { fontSize: 12, fontWeight: '700', color: cores.textoSuave, marginTop: 2 },
  ir: { fontSize: 18 },
  fraco: { backgroundColor: cores.fundo, padding: 12, gap: 8 },
  linhaFraco: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nomeFraco: { flex: 1, fontSize: 15, fontWeight: '800', color: cores.texto },
  pct: { fontSize: 15, fontWeight: '800', color: cores.vermelhoEscuro },
});
