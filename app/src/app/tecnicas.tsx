import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProgresso } from '../estado/ProgressoContext';
import { Metodo } from '../estado/progresso';
import { Botao, Cabecalho, Cartao, Chip } from '../ui/componentes';
import { Icone } from '../ui/Icone';
import { criarEstilos, useCores } from '../ui/tema';

type Tecnica = { id: string; nome: string; icone: string; cor: string; porque: string; como: string; botao: string; abrir: () => void };

const METODOS: { id: Metodo; nome: string; icone: string; texto: string }[] = [
  { id: 'questoes', nome: 'Questões', icone: 'format-list-checks', texto: 'O plano e as revisões abrem questões, como na prova.' },
  { id: 'flashcards', nome: 'Flashcards', icone: 'cards-outline', texto: 'O plano e as revisões abrem os cartões do assunto (frente e verso).' },
];

/** As técnicas de estudo que o app oferece, por que funcionam e um atalho para cada uma. */
export default function TelaTecnicas() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();

  const tecnicas: Tecnica[] = [
    {
      id: 'questoes',
      nome: 'Prática com questões',
      icone: 'format-list-checks',
      cor: c.azul,
      porque: 'Tentar lembrar a resposta (sem olhar) fixa muito mais do que reler. É a técnica com mais evidência de eficácia.',
      como: 'Responda antes de ver o gabarito. Ao errar, leia a explicação e tente dizer por que a sua alternativa estava errada.',
      botao: 'Treino misto',
      abrir: () => router.push({ pathname: '/licao', params: { modo: 'treino' } }),
    },
    {
      id: 'flashcards',
      nome: 'Flashcards',
      icone: 'cards-outline',
      cor: c.roxo,
      porque: 'Cartões de pergunta e resposta treinam a memória de definições, fórmulas, datas e conceitos em poucos minutos.',
      como: 'Leia a frente, tente lembrar, vire e dê uma nota sincera. O app traz de volta cada cartão no momento certo.',
      botao: 'Flashcards do dia',
      abrir: () => router.push({ pathname: '/flashcards', params: { modo: 'dia' } }),
    },
    {
      id: 'espacada',
      nome: 'Revisão espaçada',
      icone: 'calendar-sync-outline',
      cor: c.verde,
      porque: 'Rever um assunto depois de alguns dias, e cada vez mais espaçado, faz a memória durar meses em vez de dias.',
      como: 'Faça as revisões que vencem a cada dia. São rápidas: poucas questões ou cartões de cada assunto, só para relembrar.',
      botao: 'Revisar agora',
      abrir: () =>
        p.metodo === 'flashcards'
          ? router.push({ pathname: '/flashcards', params: { modo: 'revisao' } })
          : router.push({ pathname: '/licao', params: { modo: 'revisao' } }),
    },
    {
      id: 'pomodoro',
      nome: 'Pomodoro',
      icone: 'timer-outline',
      cor: c.vermelho,
      porque: 'Blocos curtos de atenção total com pausas combatem a procrastinação e o cansaço.',
      como: '25 minutos de foco sem celular, 5 de pausa; a cada 4 focos, uma pausa longa. O app avisa quando cada fase acaba.',
      botao: 'Abrir o Pomodoro',
      abrir: () => router.push('/pomodoro'),
    },
    {
      id: 'feynman',
      nome: 'Técnica Feynman',
      icone: 'account-voice',
      cor: c.laranja,
      porque: 'Explicar com as próprias palavras mostra o que você realmente entendeu e onde estão os buracos.',
      como: 'Escreva a explicação como se ensinasse um colega. Depois o app mostra os pontos do resumo para você ver o que faltou.',
      botao: 'Explicar um assunto',
      abrir: () => router.push('/feynman'),
    },
    {
      id: 'intercalada',
      nome: 'Prática intercalada',
      icone: 'shuffle-variant',
      cor: c.azul,
      porque: 'Misturar assuntos ensina a reconhecer qual método usar em cada questão, como acontece na prova.',
      como: 'O plano do dia já mistura áreas (exatas, natureza, humanas, linguagens). O treino misto sorteia de tudo.',
      botao: 'Ver o plano de hoje',
      abrir: () => router.navigate('/'),
    },
    {
      id: 'leitura',
      nome: 'Leitura ativa',
      icone: 'book-open-page-variant-outline',
      cor: c.verde,
      porque: 'Ler fazendo perguntas e parando para resumir é muito mais eficiente do que só passar os olhos ou grifar.',
      como: 'Leia a aula completa uma seção por vez. No fim de cada uma, feche os olhos e tente lembrar os pontos principais.',
      botao: 'Escolher uma aula',
      abrir: () => router.navigate('/estudar'),
    },
    {
      id: 'simulado',
      nome: 'Simulado',
      icone: 'clipboard-text-clock-outline',
      cor: c.laranja,
      porque: 'Treinar nas condições da prova (tempo, cansaço, ordem das questões) reduz a ansiedade e mostra onde você perde tempo.',
      como: 'Faça um simulado por semana, de preferência no mesmo horário da prova, e estude os erros depois.',
      botao: 'Fazer simulado',
      abrir: () => router.push('/simulado'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Técnicas de estudo" icone="head-lightbulb-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Cartao>
          <Text style={s.titulo}>Como você prefere praticar?</Text>
          <View style={s.chips}>
            {METODOS.map((m) => (
              <Chip
                key={m.id}
                testID={`metodo-${m.id}`}
                texto={m.nome}
                icone={m.icone}
                ativo={p.metodo === m.id}
                cor={c.azul}
                onPress={() => atualizar((x) => ({ ...x, metodo: m.id }))}
              />
            ))}
          </View>
          <Text style={s.mini}>{METODOS.find((m) => m.id === p.metodo)?.texto} Você pode usar as duas formas quando quiser.</Text>
        </Cartao>

        {tecnicas.map((t) => (
          <Cartao key={t.id} testID={`tecnica-${t.id}`}>
            <View style={s.linha}>
              <View style={[s.icone, { backgroundColor: t.cor }]}>
                <Icone nome={t.icone} tamanho={22} cor="#FFF" />
              </View>
              <Text style={[s.titulo, { flex: 1 }]}>{t.nome}</Text>
            </View>
            <Text style={s.rotulo}>Por que funciona</Text>
            <Text style={s.texto}>{t.porque}</Text>
            <Text style={s.rotulo}>Como usar</Text>
            <Text style={s.texto}>{t.como}</Text>
            <Botao titulo={t.botao} pequeno contorno cor={t.cor} estilo={{ marginTop: 8 }} onPress={t.abrir} />
          </Cartao>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 17, fontWeight: '800', color: c.texto },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6 },
  icone: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rotulo: { fontSize: 12, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 8 },
  texto: { fontSize: 14, color: c.texto, fontWeight: '600', lineHeight: 20, marginTop: 2 },
  mini: { fontSize: 12, color: c.textoSuave, fontWeight: '600', marginTop: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginTop: 10 },
}));
