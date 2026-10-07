import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../data/banco';
import { useProgresso } from '../estado/ProgressoContext';
import { LIMITE_PONTO_FRACO, acertoDisciplina, dificuldades } from '../estado/progresso';
import { Barra, Botao, Cabecalho, Cartao } from '../ui/componentes';
import { ComIcone, Icone } from '../ui/Icone';
import { criarEstilos, useCores } from '../ui/tema';

/** Relatório do que o aluno mais erra, por matéria e por assunto, com atalhos para estudar. */
export default function TelaDificuldades() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const lista = dificuldades(p);
  const dificeis = lista.filter((d) => (d.recente ?? d.acerto) < LIMITE_PONTO_FRACO);
  const boas = lista.filter((d) => (d.recente ?? d.acerto) >= 85 && d.respostas >= 10).reverse().slice(0, 5);

  // matérias, da pior para a melhor
  const materias = new Map<string, { nome: string; icone: string; cor: string }>();
  for (const d of lista) {
    const info = getTopico(d.topicoId);
    if (info) materias.set(info.disciplina.id, { nome: info.disciplina.nome, icone: info.disciplina.icone, cor: info.disciplina.cor });
  }
  const porMateria = [...materias.entries()]
    .map(([id, m]) => ({ id, ...m, acerto: acertoDisciplina(p, id) ?? 0 }))
    .sort((a, b) => a.acerto - b.acerto);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Minhas dificuldades" icone="chart-box-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        {!lista.length ? (
          <Text style={s.texto}>Responda algumas questões e o app mostra aqui os assuntos em que você mais erra.</Text>
        ) : (
          <>
            <Text style={s.texto}>
              Este relatório usa todas as questões que você já respondeu. Os assuntos com menos de {LIMITE_PONTO_FRACO}% de acerto aparecem mais nas suas
              revisões e no plano do dia.
            </Text>

            <Text style={s.secao}>Assuntos para reforçar</Text>
            {dificeis.length ? (
              dificeis.slice(0, 12).map((d) => {
                const info = getTopico(d.topicoId);
                if (!info) return null;
                const nota = d.recente ?? d.acerto;
                return (
                  <Cartao key={d.topicoId} testID={`dif-${d.topicoId}`} estilo={{ gap: 8 }}>
                    <View style={s.linha}>
                      <Icone nome={info.disciplina.icone} tamanho={22} cor={info.disciplina.cor} />
                      <Text style={s.nome} numberOfLines={2}>
                        {info.topico.titulo}
                      </Text>
                      <Text style={[s.pct, { color: c.vermelhoEscuro }]}>{nota}%</Text>
                    </View>
                    <Barra valor={nota / 100} cor={c.vermelho} altura={8} />
                    <Text style={s.mini}>
                      {d.erros} erro{d.erros === 1 ? '' : 's'} em {d.respostas} resposta{d.respostas === 1 ? '' : 's'}
                      {d.teimosas ? ` · ${d.teimosas} ${d.teimosas === 1 ? 'questão errada mais de uma vez' : 'questões erradas mais de uma vez'}` : ''}
                      {d.tendencia === 1 ? ' · melhorando' : d.tendencia === -1 ? ' · piorando' : ''}
                    </Text>
                    <View style={s.botoes}>
                      {!!info.topico.resumo && (
                        <Botao
                          pequeno
                          contorno
                          icone="book-open-variant"
                          titulo="Rever a teoria"
                          cor={info.disciplina.cor}
                          onPress={() => router.push({ pathname: '/resumo', params: { topico: d.topicoId } })}
                          estilo={{ flex: 1 }}
                        />
                      )}
                      <Botao
                        pequeno
                        icone="target"
                        titulo="Treinar"
                        cor={c.vermelho}
                        onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos', topico: d.topicoId } })}
                        estilo={{ flex: 1 }}
                      />
                    </View>
                  </Cartao>
                );
              })
            ) : (
              <Text style={s.texto}>Nenhum assunto abaixo de {LIMITE_PONTO_FRACO}% de acerto. Muito bem!</Text>
            )}

            <Text style={s.secao}>Acerto por matéria</Text>
            <Cartao estilo={{ gap: 10 }}>
              {porMateria.map((m) => (
                <View key={m.id} style={{ gap: 4 }}>
                  <View style={s.linha}>
                    <Icone nome={m.icone} tamanho={18} cor={m.cor} />
                    <Text style={[s.nome, { fontSize: 14 }]}>{m.nome}</Text>
                    <Text style={s.pct}>{m.acerto}%</Text>
                  </View>
                  <Barra valor={m.acerto / 100} cor={m.acerto >= 70 ? c.verde : m.acerto >= 50 ? c.amarelo : c.vermelho} altura={8} />
                </View>
              ))}
            </Cartao>

            {boas.length > 0 && (
              <>
                <Text style={s.secao}>Seus pontos fortes</Text>
                <Cartao estilo={{ gap: 6 }}>
                  {boas.map((d) => (
                    <ComIcone key={d.topicoId} icone="check-circle-outline" cor={c.verdeEscuro} tamanho={18} estiloTexto={s.forte}>
                      {getTopico(d.topicoId)?.topico.titulo} · {d.recente ?? d.acerto}%
                    </ComIcone>
                  ))}
                </Cartao>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20 },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nome: { flex: 1, fontSize: 15, fontWeight: '800', color: c.texto },
  pct: { fontSize: 15, fontWeight: '800', color: c.texto },
  mini: { fontSize: 12, color: c.textoSuave, fontWeight: '700' },
  botoes: { flexDirection: 'row', gap: 8 },
  forte: { fontSize: 14, fontWeight: '700', color: c.texto, flexShrink: 1 },
}));
