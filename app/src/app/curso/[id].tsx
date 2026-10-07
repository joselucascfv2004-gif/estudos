import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComponenteCurso, getCurso, getTopico } from '../../data/banco';
import { useProgresso } from '../../estado/ProgressoContext';
import { dominioTopico, nivelSugerido } from '../../estado/progresso';
import { Barra, Botao, Cabecalho, Cartao } from '../../ui/componentes';
import { Icone } from '../../ui/Icone';
import { criarEstilos, useCores } from '../../ui/tema';

const COR = '#2E7D5B';

/** Grade de um curso de faculdade: períodos, disciplinas, ementas e o que já dá para estudar no app. */
export default function TelaCurso() {
  const c = useCores();
  const s = useEstilos();
  const { id } = useLocalSearchParams<{ id: string }>();
  const curso = getCurso(id ?? '');
  const [aberto, setAberto] = useState<string | null>(curso?.periodos[0]?.nome ?? null);
  if (!curso) return null;

  const todos = curso.periodos.flatMap((p) => p.componentes).filter((x) => x.tipo !== 'Atividade');
  const prontos = todos.filter((x) => x.app && getTopico(x.app)).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Grade do curso" icone="school-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30, gap: 12 }}>
        <View>
          <Text style={s.titulo}>{curso.nome}</Text>
          <Text style={s.sub}>{curso.instituicao}</Text>
        </View>
        <Cartao>
          <Text style={s.texto}>
            {prontos} de {todos.length} disciplinas já têm aula e questões no app. As outras mostram a ementa oficial e os assuntos, e vão ganhando conteúdo aos poucos.
          </Text>
          <View style={{ marginTop: 10 }}>
            <Barra valor={prontos / Math.max(1, todos.length)} cor={COR} />
          </View>
        </Cartao>

        {curso.periodos.map((per) => {
          const expandido = aberto === per.nome;
          const comConteudo = per.componentes.filter((x) => x.app && getTopico(x.app)).length;
          return (
            <View key={per.nome}>
              <Pressable testID={`periodo-${per.nome}`} onPress={() => setAberto(expandido ? null : per.nome)} style={[s.periodo, expandido && { borderColor: COR }]}>
                <Icone nome={expandido ? 'chevron-down' : 'chevron-right'} tamanho={22} cor={c.textoSuave} />
                <Text style={s.periodoNome}>{per.nome}</Text>
                <Text style={s.periodoInfo}>
                  {per.componentes.length} {per.componentes.length === 1 ? 'disciplina' : 'disciplinas'}
                  {comConteudo ? ` · ${comConteudo} no app` : ''}
                </Text>
              </Pressable>
              {expandido && (
                <View style={{ gap: 10, marginTop: 10 }}>
                  {!!per.nota && <Text style={s.nota}>{per.nota}</Text>}
                  {per.componentes.map((comp) => (
                    <Componente key={comp.codigo} comp={comp} />
                  ))}
                </View>
              )}
            </View>
          );
        })}
        <Text style={s.fonte}>Fonte: {curso.fonte}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Componente({ comp }: { comp: ComponenteCurso }) {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const [aberto, setAberto] = useState(false);
  const topico = comp.app ? getTopico(comp.app) : undefined;
  const relacionados = (comp.relacionados ?? []).map((r) => getTopico(r)).filter((x): x is NonNullable<typeof x> => !!x);
  const status = topico ? 'pronto' : relacionados.length ? 'relacionado' : comp.tipo === 'Atividade' ? 'atividade' : 'breve';
  const selo = {
    pronto: { texto: 'Aula e questões no app', cor: c.verde, icone: 'check-circle' },
    relacionado: { texto: 'Revise com assuntos do app', cor: c.azul, icone: 'link-variant' },
    breve: { texto: 'Conteúdo em preparação', cor: c.textoSuave, icone: 'progress-clock' },
    atividade: { texto: 'Atividade prática (sem conteúdo para revisar)', cor: c.textoSuave, icone: 'briefcase-outline' },
  }[status];
  const dominio = topico ? dominioTopico(p, topico.topico.id) : 0;

  return (
    <Pressable testID={`comp-${comp.codigo}`} onPress={() => setAberto(!aberto)} style={[s.comp, aberto && { borderColor: COR }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={s.compNome}>{comp.nome}</Text>
          <Text style={s.compInfo}>
            {comp.codigo} · {comp.ch} h · {comp.tipo}
          </Text>
        </View>
        <Icone nome={aberto ? 'chevron-up' : 'chevron-down'} tamanho={22} cor={c.textoSuave} />
      </View>
      <View style={s.selo}>
        <Icone nome={selo.icone} tamanho={15} cor={selo.cor} />
        <Text style={[s.seloTexto, { color: selo.cor }]}>{selo.texto}</Text>
        {topico && dominio > 0 && <Text style={s.seloTexto}> · {Math.round(dominio * 100)}% dominado</Text>}
      </View>

      {aberto && (
        <View style={{ marginTop: 10, gap: 8 }}>
          <Text style={s.rotulo}>Pré-requisitos</Text>
          <Text style={s.texto}>{comp.pre.length ? comp.pre.join(' · ') : 'nenhum'}</Text>
          <Text style={s.rotulo}>Ementa oficial</Text>
          <Text style={s.texto}>{comp.ementa}</Text>
          <Text style={s.rotulo}>Assuntos para revisar</Text>
          {comp.assuntos.map((a, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={[s.texto, { color: COR, fontWeight: '900' }]}>•</Text>
              <Text style={[s.texto, { flex: 1 }]}>{a}</Text>
            </View>
          ))}
          {topico && (
            <View style={{ gap: 8, marginTop: 6 }}>
              <Botao
                testID={`estudar-${comp.codigo}`}
                icone="book-open-variant"
                titulo="Estudar a aula"
                contorno
                pequeno
                cor={COR}
                onPress={() => router.push({ pathname: '/resumo', params: { topico: topico.topico.id } })}
              />
              <Botao
                testID={`praticar-${comp.codigo}`}
                titulo="Praticar questões"
                pequeno
                cor={COR}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'topico', topico: topico.topico.id, nivel: String(nivelSugerido(p, topico.topico.id)) } })}
              />
            </View>
          )}
          {relacionados.length > 0 && (
            <>
              <Text style={s.rotulo}>Assuntos do app que ajudam</Text>
              {relacionados.map((r) => (
                <Pressable key={r.topico.id} onPress={() => router.push({ pathname: '/resumo', params: { topico: r.topico.id } })} style={s.relacionado}>
                  <Icone nome={r.disciplina.icone} tamanho={18} cor={r.disciplina.cor} />
                  <Text style={[s.texto, { flex: 1, fontWeight: '700' }]}>
                    {r.topico.titulo} <Text style={{ color: c.textoSuave, fontWeight: '600' }}>({r.disciplina.nome})</Text>
                  </Text>
                  <Icone nome="chevron-right" tamanho={20} cor={c.textoSuave} />
                </Pressable>
              ))}
            </>
          )}
        </View>
      )}
    </Pressable>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 24, fontWeight: '800', color: c.texto },
  sub: { fontSize: 14, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
  texto: { fontSize: 14, color: c.texto, lineHeight: 20 },
  nota: { fontSize: 13, color: c.textoSuave, lineHeight: 19 },
  fonte: { fontSize: 12, color: c.textoSuave, lineHeight: 17, marginTop: 6 },
  periodo: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderRadius: 16, borderWidth: 2, borderBottomWidth: 4, borderColor: c.borda, backgroundColor: c.fundo },
  periodoNome: { fontSize: 17, fontWeight: '800', color: c.texto },
  periodoInfo: { flex: 1, textAlign: 'right', fontSize: 13, fontWeight: '700', color: c.textoSuave },
  comp: { padding: 14, borderRadius: 16, borderWidth: 2, borderColor: c.borda, backgroundColor: c.fundoSuave },
  compNome: { fontSize: 16, fontWeight: '800', color: c.texto },
  compInfo: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
  selo: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8, flexWrap: 'wrap' },
  seloTexto: { fontSize: 12, fontWeight: '800', color: c.textoSuave },
  rotulo: { fontSize: 13, fontWeight: '900', color: COR, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  relacionado: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 12, borderWidth: 2, borderColor: c.borda, backgroundColor: c.fundo },
}));
