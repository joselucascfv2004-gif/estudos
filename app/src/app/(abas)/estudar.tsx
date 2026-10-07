import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cursoDaProva, disciplinasDaProva } from '../../data/banco';
import { getProva } from '../../data/provas';
import { useProgresso } from '../../estado/ProgressoContext';
import { dominioTopico } from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
import { Barra, Cartao } from '../../ui/componentes';
import { Icone } from '../../ui/Icone';
import { clarear, criarEstilos, useCores } from '../../ui/tema';

/** As matérias da prova escolhida, agrupadas por área, e a grade do curso (faculdade). */
export default function Estudar() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const prova = getProva(p.prova);
  const lista = disciplinasDaProva(p.prova, p.lingua);
  const curso = cursoDaProva(prova.id);

  const areas: { area: string; itens: typeof lista }[] = [];
  for (const d of lista) {
    let grupo = areas.find((a) => a.area === d.area);
    if (!grupo) areas.push((grupo = { area: d.area, itens: [] }));
    grupo.itens.push(d);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={s.titulo}>Estudar</Text>

        <Cartao estilo={s.linha} onPress={() => router.push('/perfil')}>
          <Icone nome={prova.icone} tamanho={26} cor={c.azul} />
          <View style={{ flex: 1 }}>
            <Text style={s.sub}>Estudando para</Text>
            <Text style={s.nome}>{prova.nome}</Text>
          </View>
          <Text style={s.trocar}>TROCAR</Text>
        </Cartao>

        {curso && (
          <Cartao testID="cartao-curso" estilo={s.linha} onPress={() => router.push({ pathname: '/curso/[id]', params: { id: curso.id } })}>
            <Icone nome="school-outline" tamanho={26} cor="#2E7D5B" />
            <View style={{ flex: 1 }}>
              <Text style={s.sub}>Grade do curso</Text>
              <Text style={s.nome}>Períodos, ementas e assuntos</Text>
            </View>
            <Icone nome="chevron-right" tamanho={24} cor={c.textoSuave} />
          </Cartao>
        )}

        {areas.map(({ area, itens }) => (
          <View key={area} style={{ marginTop: 8 }}>
            <Text style={s.area}>{area}</Text>
            <View style={s.grade}>
              {itens.map((d) => {
                const dom = d.topicos.reduce((soma, t) => soma + dominioTopico(p, t.id), 0) / d.topicos.length;
                return (
                  <Cartao
                    key={d.id}
                    testID={`disc-${d.id}`}
                    estilo={[s.disc, { backgroundColor: clarear(d.cor, 0.12, c.fundo), borderColor: clarear(d.cor, 0.45, c.fundo) }]}
                    onPress={() => router.push({ pathname: '/disciplina/[id]', params: { id: d.id } })}
                  >
                    <Icone nome={d.icone} tamanho={30} cor={d.cor} />
                    <Text style={s.discNome} numberOfLines={2}>
                      {d.nome}
                    </Text>
                    <Text style={s.discSub}>
                      {d.topicos.length} tópico{d.topicos.length > 1 ? 's' : ''} · {Math.round(dom * 100)}%
                    </Text>
                    <Barra valor={dom} cor={d.cor} altura={8} fundo={c.escuro ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'} />
                  </Cartao>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 26, fontWeight: '800', color: c.texto, marginBottom: 14 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, marginBottom: 14 },
  sub: { fontSize: 12, fontWeight: '700', color: c.textoSuave },
  nome: { fontSize: 17, fontWeight: '800', color: c.texto },
  trocar: { fontSize: 13, fontWeight: '800', color: c.azul },
  area: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  disc: { width: '48.5%', marginBottom: 12, padding: 14, gap: 4 },
  discNome: { fontSize: 16, fontWeight: '800', color: c.texto, minHeight: 40 },
  discSub: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginBottom: 4 },
}));
