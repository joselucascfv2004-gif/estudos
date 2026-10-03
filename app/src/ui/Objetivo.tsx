import { Pressable, Text, View } from 'react-native';

import { GrupoProva, PRAZOS, PROVAS, ProvaAlvo, getProva } from '../data/provas';
import { disciplinasDaProva } from '../data/banco';
import { hoje, somarMeses } from '../estado/datas';
import { Chip } from './componentes';
import { Icone } from './Icone';
import { criarEstilos, useCores } from './tema';

const GRUPOS: { grupo: GrupoProva; titulo: string }[] = [
  { grupo: 'ENEM', titulo: 'ENEM e vestibulares' },
  { grupo: 'Militares', titulo: 'Provas militares' },
  { grupo: 'Concursos', titulo: 'Concursos' },
  { grupo: 'Todas', titulo: 'Sem prova definida' },
];

/** Lista de provas-alvo, agrupadas. Ao escolher, mostra as matérias cobradas. */
export function EscolhaProva({ valor, onEscolher }: { valor: string; onEscolher: (id: string) => void }) {
  const c = useCores();
  const s = useEstilos();
  const escolhida = getProva(valor);
  return (
    <View>
      {GRUPOS.map(({ grupo, titulo }) => (
        <View key={grupo} style={{ marginTop: 10 }}>
          <Text style={s.grupo}>{titulo}</Text>
          <View style={s.chips}>
            {PROVAS.filter((p) => p.grupo === grupo).map((p) => (
              <Chip key={p.id} testID={`prova-${p.id}`} texto={p.nome} icone={p.icone} ativo={valor === p.id} onPress={() => onEscolher(p.id)} />
            ))}
          </View>
        </View>
      ))}
      <MateriasDaProva prova={escolhida} />
      {escolhida.grupo !== 'ENEM' && escolhida.grupo !== 'Todas' && (
        <Text style={[s.aviso, { color: c.textoSuave }]}>
          As matérias seguem os editais mais recentes. Os editais mudam de um ano para outro: confira sempre o do seu concurso.
        </Text>
      )}
    </View>
  );
}

function MateriasDaProva({ prova }: { prova: ProvaAlvo }) {
  const c = useCores();
  const s = useEstilos();
  const lista = disciplinasDaProva(prova.id);
  const assuntos = lista.reduce((n, d) => n + d.topicos.length, 0);
  return (
    <View style={s.materias}>
      <Text style={s.descricao}>{prova.descricao}</Text>
      <View style={s.listaMaterias}>
        {lista.map((d) => (
          <View key={d.id} style={s.materia}>
            <Icone nome={d.icone} tamanho={14} cor={d.cor} />
            <Text style={[s.materiaTexto, { color: c.texto }]}>{d.nome}</Text>
          </View>
        ))}
      </View>
      <Text style={s.mini}>
        {lista.length} matérias · {assuntos} assuntos no app
      </Text>
    </View>
  );
}

/** Chips de prazo: escolher "2 meses" marca a data da prova para daqui a 2 meses. */
export function EscolhaPrazo({ dataProva, onEscolher }: { dataProva: string | null; onEscolher: (iso: string) => void }) {
  const s = useEstilos();
  const dia = hoje();
  return (
    <View style={s.chips}>
      {PRAZOS.map((pz) => {
        const iso = somarMeses(dia, pz.meses);
        return <Chip key={pz.meses} testID={`prazo-${pz.meses}`} texto={pz.nome} icone="calendar-range" ativo={dataProva === iso} onPress={() => onEscolher(iso)} />;
      })}
    </View>
  );
}

/** Botão simples de linha, com ícone e seta. */
export function LinhaOpcao({ icone, titulo, sub, ativo, onPress }: { icone: string; titulo: string; sub?: string; ativo?: boolean; onPress: () => void }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <Pressable onPress={onPress} style={[s.linha, { borderColor: ativo ? c.azul : c.borda, backgroundColor: ativo ? c.azulClaro : c.fundo }]}>
      <Icone nome={icone} tamanho={24} cor={ativo ? c.azul : c.textoSuave} />
      <View style={{ flex: 1 }}>
        <Text style={[s.linhaTitulo, { color: c.texto }]}>{titulo}</Text>
        {sub ? <Text style={s.mini}>{sub}</Text> : null}
      </View>
    </Pressable>
  );
}

const useEstilos = criarEstilos((c) => ({
  grupo: { fontSize: 12, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginTop: 8 },
  materias: { marginTop: 14, padding: 12, borderRadius: 14, backgroundColor: c.fundoSuave, gap: 8 },
  descricao: { fontSize: 14, fontWeight: '700', color: c.texto, lineHeight: 20 },
  listaMaterias: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  materia: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, backgroundColor: c.fundo, borderWidth: 1, borderColor: c.borda },
  materiaTexto: { fontSize: 12, fontWeight: '700' },
  mini: { fontSize: 12, color: c.textoSuave, fontWeight: '600', marginTop: 2 },
  aviso: { fontSize: 12, fontWeight: '600', marginTop: 8, lineHeight: 17 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, borderWidth: 2, borderBottomWidth: 4 },
  linhaTitulo: { fontSize: 16, fontWeight: '800' },
}));
