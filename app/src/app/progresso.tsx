import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getDisciplina, totalQuestoes } from '../data/banco';
import { getProva } from '../data/provas';
import { diaDaSemana, diferencaDias, hoje, somarDias } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import { CONQUISTAS, coberturaPrazo, evolucaoDisciplinas, evolucaoSemanal } from '../estado/progresso';
import { Cabecalho, Cartao } from '../ui/componentes';
import { Icone } from '../ui/Icone';
import { criarEstilos, useCores } from '../ui/tema';

/** Detalhes do progresso: números, prazo da prova, gráficos, dificuldades e conquistas. */
export default function Progresso() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const dias = Array.from({ length: 7 }, (_, i) => somarDias(hoje(), i - 6));
  const maximo = Math.max(p.metaDiaria, ...dias.map((d) => p.xpPorDia[d] ?? 0));
  const obtidas = CONQUISTAS.filter((cq) => p.conquistas[cq.id]).length;
  const semanas = evolucaoSemanal(p);
  const temSemanas = semanas.some((w) => w.total > 0);
  const disciplinas = evolucaoDisciplinas(p);
  const est = Object.values(p.questoes);
  const acertos = est.reduce((soma, q) => soma + q.acertos, 0);
  const respostas = acertos + est.reduce((soma, q) => soma + q.erros, 0);
  const dominadas = est.filter((q) => q.acertos > 0).length;
  const diasProva = p.dataProva ? diferencaDias(hoje(), p.dataProva) : null;
  const cobertura = coberturaPrazo(p, hoje());
  const prova = getProva(p.prova);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Seu progresso" icone="chart-line" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Seus números</Text>
        <View style={s.grade}>
          <Info icone="fire" cor={c.laranja} valor={p.ofensiva.atual} rotulo="Ofensiva atual" />
          <Info icone="trophy-outline" cor={c.amarelo} valor={p.ofensiva.recorde} rotulo="Recorde de ofensiva" />
          <Info icone="lightning-bolt" cor={c.amarelo} valor={p.xpTotal} rotulo="XP total" />
          <Info icone="book-check-outline" cor={c.azul} valor={p.totalLicoes} rotulo="Lições concluídas" />
          <Info icone="pencil-outline" cor={c.roxo} valor={respostas} rotulo="Respostas" />
          <Info icone="target" cor={c.verde} valor={respostas ? `${Math.round((acertos / respostas) * 100)}%` : '—'} rotulo="Taxa de acerto" />
          <Info icone="timer-sand" cor={c.vermelho} valor={Object.values(p.pomodoros).reduce((x, n) => x + n, 0)} rotulo="Pomodoros de foco" />
          <Info icone="cards-outline" cor={c.roxo} valor={Object.keys(p.cartoes).length} rotulo="Flashcards estudados" />
        </View>
        <Text style={[s.legenda, { marginTop: -4 }]}>
          Você já acertou {dominadas} das {totalQuestoes} questões do app.
        </Text>

        {diasProva != null && diasProva >= 0 && (
          <Cartao>
            <View style={s.contagem}>
              <Text style={s.contagemNumero}>{diasProva}</Text>
              <Text style={s.contagemTexto}>{diasProva === 0 ? 'É hoje! Boa prova!' : `dia${diasProva === 1 ? '' : 's'} para ${p.nomeProva.trim() || prova.nome}`}</Text>
            </View>
            {cobertura && cobertura.diasDeEstudo > 0 && cobertura.vistos < cobertura.total && (
              <Text style={[s.legenda, { marginTop: 6 }]}>
                {cobertura.cabem >= cobertura.total - cobertura.vistos
                  ? `No ritmo de ${cobertura.porDia} assunto${cobertura.porDia > 1 ? 's' : ''} novo${cobertura.porDia > 1 ? 's' : ''} por dia, você passa pelos ${cobertura.total - cobertura.vistos} assuntos que faltam e ainda sobra a última semana para revisar.`
                  : `No prazo, dá para ver ${cobertura.cabem} dos ${cobertura.total - cobertura.vistos} assuntos que faltam (${cobertura.porDia} por dia). O plano começa pelos que mais caem na prova.`}
              </Text>
            )}
          </Cartao>
        )}

        <Text style={s.titulo}>Sua semana</Text>
        <Cartao>
          <View style={s.grafico}>
            {dias.map((d) => {
              const xp = p.xpPorDia[d] ?? 0;
              const bateu = xp >= p.metaDiaria;
              return (
                <View key={d} style={s.coluna}>
                  <Text style={s.colunaXp}>{xp || ''}</Text>
                  <View style={s.colunaTrilho}>
                    <View style={{ height: `${(xp / maximo) * 100}%`, backgroundColor: bateu ? c.amarelo : c.azul, borderRadius: 6 }} />
                  </View>
                  <Text style={[s.colunaDia, d === hoje() && { color: c.azul }]}>{diaDaSemana(d)}</Text>
                </View>
              );
            })}
          </View>
          <View style={s.legendas}>
            <Legenda cor={c.amarelo} texto="meta batida" />
            <Legenda cor={c.azul} texto={`estudou (meta: ${p.metaDiaria} XP por dia)`} />
          </View>
        </Cartao>

        <Cartao testID="cartao-dificuldades" estilo={{ flexDirection: 'row', alignItems: 'center', gap: 12 }} onPress={() => router.push('/dificuldades')}>
          <Icone nome="chart-box-outline" tamanho={26} cor={c.vermelho} />
          <View style={{ flex: 1 }}>
            <Text style={[s.subtitulo, { marginBottom: 2 }]}>Minhas dificuldades</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: c.textoSuave }}>Os assuntos em que você mais erra, por matéria, com atalhos para estudar</Text>
          </View>
          <Icone nome="chevron-right" tamanho={24} cor={c.textoSuave} />
        </Cartao>

        <Text style={s.titulo}>Sua evolução</Text>
        <Cartao>
          <Text style={s.subtitulo}>Acerto por semana</Text>
          {temSemanas ? (
            <>
              <View style={s.grafico}>
                {semanas.map((w, i) => {
                  const pct = w.total ? Math.round((w.acertos / w.total) * 100) : 0;
                  const cor = pct >= 70 ? c.verde : pct >= 50 ? c.amarelo : c.vermelho;
                  return (
                    <View key={w.inicio} style={s.coluna}>
                      <Text style={s.colunaXp}>{w.total ? `${pct}%` : ''}</Text>
                      <View style={s.colunaTrilho}>
                        {w.total > 0 && <View style={{ height: `${Math.max(pct, 4)}%`, backgroundColor: cor, borderRadius: 6 }} />}
                      </View>
                      <Text style={[s.colunaDia, i === semanas.length - 1 && { color: c.azul }]}>
                        {i === semanas.length - 1 ? 'Agora' : w.inicio.slice(8, 10) + '/' + w.inicio.slice(5, 7)}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={s.legendas}>
                <Legenda cor={c.verde} texto="70% ou mais" />
                <Legenda cor={c.amarelo} texto="50% a 69%" />
                <Legenda cor={c.vermelho} texto="abaixo de 50%" />
              </View>
            </>
          ) : (
            <Text style={s.legenda}>Responda algumas questões e o gráfico da sua evolução aparece aqui.</Text>
          )}
        </Cartao>

        {disciplinas.length > 0 && (
          <Cartao>
            <Text style={s.subtitulo}>Por disciplina (últimas 4 semanas)</Text>
            {disciplinas.map((e) => {
              const d = getDisciplina(e.disciplinaId);
              const diff = e.atual != null && e.anterior != null ? e.atual - e.anterior : null;
              return (
                <View key={e.disciplinaId} style={s.linhaDisc}>
                  <Icone nome={d?.icone ?? 'book-outline'} tamanho={22} cor={d?.cor} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.discNome}>{d?.nome}</Text>
                    <View style={s.trilhoDisc}>
                      <View style={{ width: `${e.atual ?? 0}%`, height: '100%', borderRadius: 6, backgroundColor: d?.cor ?? c.azul }} />
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end', minWidth: 64 }}>
                    <Text style={s.discPct}>{e.atual}%</Text>
                    {diff != null && (
                      <Text style={[s.discDiff, { color: diff > 0 ? c.verdeEscuro : diff < 0 ? c.vermelhoEscuro : c.textoSuave }]}>
                        {diff > 0 ? `+${diff}` : diff < 0 ? `−${-diff}` : '= 0'}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
            <Text style={s.legenda}>Número pequeno: diferença em relação às 4 semanas anteriores</Text>
          </Cartao>
        )}

        <Text style={s.titulo}>
          Conquistas <Text style={s.contador}>{obtidas}/{CONQUISTAS.length}</Text>
        </Text>
        <View style={s.grade}>
          {CONQUISTAS.map((cq) => {
            const ok = !!p.conquistas[cq.id];
            return (
              <Cartao key={cq.id} estilo={[s.conquista, !ok && { backgroundColor: c.fundoSuave }]}>
                <Icone nome={ok ? cq.icone : 'lock-outline'} tamanho={34} cor={ok ? c.amarelo : c.cinza} />
                <Text style={[s.nome, !ok && { color: c.cinza }]}>{cq.titulo}</Text>
                <Text style={s.desc}>{cq.descricao}</Text>
              </Cartao>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ icone, cor, valor, rotulo }: { icone: string; cor: string; valor: string | number; rotulo: string }) {
  const s = useEstilos();
  return (
    <Cartao estilo={s.info}>
      <Icone nome={icone} tamanho={24} cor={cor} />
      <View style={{ flex: 1 }}>
        <Text style={s.infoValor}>{valor}</Text>
        <Text style={s.infoRotulo}>{rotulo}</Text>
      </View>
    </Cartao>
  );
}

function Legenda({ cor, texto }: { cor: string; texto: string }) {
  const s = useEstilos();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: cor }} />
      <Text style={[s.legenda, { marginTop: 0 }]}>{texto}</Text>
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 22, fontWeight: '800', color: c.texto },
  info: { width: '48.5%', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, marginBottom: 10 },
  infoValor: { fontSize: 18, fontWeight: '800', color: c.texto },
  infoRotulo: { fontSize: 11, color: c.textoSuave, fontWeight: '700' },
  contagem: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  contagemNumero: { fontSize: 36, fontWeight: '800', color: c.laranja },
  contagemTexto: { flex: 1, fontSize: 16, fontWeight: '800', color: c.texto },
  subtitulo: { fontSize: 15, fontWeight: '800', color: c.texto, marginBottom: 10 },
  linhaDisc: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  discNome: { fontSize: 14, fontWeight: '800', color: c.texto, marginBottom: 4 },
  trilhoDisc: { height: 10, borderRadius: 6, backgroundColor: c.fundoSuave, overflow: 'hidden' },
  discPct: { fontSize: 15, fontWeight: '800', color: c.texto },
  discDiff: { fontSize: 12, fontWeight: '800' },
  contador: { fontSize: 16, color: c.textoSuave },
  grafico: { flexDirection: 'row', justifyContent: 'space-between', height: 150, alignItems: 'flex-end' },
  coluna: { alignItems: 'center', flex: 1 },
  colunaXp: { fontSize: 10, fontWeight: '800', color: c.textoSuave, marginBottom: 2 },
  colunaTrilho: { width: 22, height: 100, justifyContent: 'flex-end', backgroundColor: c.fundoSuave, borderRadius: 6 },
  colunaDia: { fontSize: 12, fontWeight: '800', color: c.textoSuave, marginTop: 6 },
  legenda: { fontSize: 12, color: c.textoSuave, marginTop: 12, fontWeight: '600' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  conquista: { width: '48.5%', marginBottom: 12, alignItems: 'center', padding: 12 },
  legendas: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  nome: { fontSize: 15, fontWeight: '800', color: c.texto, textAlign: 'center', marginTop: 4 },
  desc: { fontSize: 12, color: c.textoSuave, textAlign: 'center', marginTop: 2 },
}));
