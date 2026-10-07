import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import { recordeDoJogo } from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
import { Botao, Cartao } from '../../ui/componentes';
import { ComIcone, Icone } from '../../ui/Icone';
import { criarEstilos, useCores } from '../../ui/tema';

const JOGOS = [
  {
    id: 'calculo',
    rota: '/jogos/calculo',
    nome: 'Cálculo Relâmpago',
    icone: 'lightning-bolt',
    cor: '#1CB0F6',
    texto: 'Contas de cabeça contra o tempo: adição, tabuada, divisão, potências, porcentagem e expressões. Quanto mais rápido, mais pontos.',
  },
  {
    id: 'comparar',
    rota: '/jogos/comparar',
    nome: 'Qual é maior?',
    icone: 'scale-unbalanced',
    cor: '#FF9600',
    texto: 'Compare potências, frações, raízes e porcentagens sem fazer a conta inteira. Treina a estimativa que salva tempo na prova.',
  },
  {
    id: 'duelo',
    rota: '/jogos/duelo',
    nome: 'Duelo de alternativas',
    icone: 'sword-cross',
    cor: '#CE82FF',
    texto: 'Questões rápidas de todas as matérias com só duas alternativas. Escolha a certa antes que o tempo acabe.',
  },
  {
    id: 'memoria',
    rota: '/jogos/memoria',
    nome: 'Jogo da memória',
    icone: 'cards-outline',
    cor: '#58CC02',
    texto: 'Encontre os pares: elementos e símbolos, obras e autores, fatos e anos, estados e capitais, siglas da CPA e mais.',
  },
] as const;

export default function Jogos() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const desafioHoje = p.jogos[`hoje:calculo:dia:${hoje()}`];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.titulo}>Jogos</Text>
        <Text style={s.intro}>Minigames para treinar rapidez e memória. Cada partida dá até 30 XP, que contam para a sua meta do dia.</Text>

        <Cartao estilo={{ backgroundColor: c.azulClaro, borderColor: c.azulBorda }}>
          <ComIcone icone="calendar-star" cor={c.azul} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Desafio do dia
          </ComIcone>
          <Text style={s.sub}>
            {desafioHoje
              ? `Você já fez o desafio de hoje: ${desafioHoje.recorde} pontos. Pode jogar de novo para melhorar; amanhã tem contas novas.`
              : '20 contas de cálculo mental, as mesmas para todo mundo hoje. Faça no menor tempo e com o máximo de acertos.'}
          </Text>
          <Botao
            testID="btn-desafio-dia"
            titulo={desafioHoje ? 'Jogar de novo' : 'Fazer o desafio'}
            cor={c.azul}
            pequeno
            onPress={() => router.push({ pathname: '/jogos/calculo', params: { modo: 'dia' } })}
          />
        </Cartao>

        {JOGOS.map((j) => {
          const r = recordeDoJogo(p, j.id);
          return (
            <Cartao key={j.id} testID={`jogo-${j.id}`} onPress={() => router.push(j.rota)}>
              <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
                <View style={[s.icone, { backgroundColor: j.cor }]}>
                  <Icone nome={j.icone} tamanho={30} cor="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.nome}>{j.nome}</Text>
                  <Text style={s.recorde}>{r.partidas ? `Recorde: ${r.recorde} pts · ${r.partidas} ${r.partidas === 1 ? 'partida' : 'partidas'}` : 'Ainda não jogado'}</Text>
                </View>
                <Icone nome="chevron-right" tamanho={26} cor={c.textoSuave} />
              </View>
              <Text style={[s.sub, { marginTop: 10, marginBottom: 0 }]}>{j.texto}</Text>
            </Cartao>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 26, fontWeight: '800', color: c.texto },
  intro: { fontSize: 15, color: c.textoSuave, lineHeight: 21, marginTop: -6 },
  cartaoTitulo: { fontSize: 18, fontWeight: '800', color: c.texto },
  sub: { fontSize: 14, color: c.textoSuave, lineHeight: 20, marginTop: 6, marginBottom: 12 },
  icone: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  nome: { fontSize: 18, fontWeight: '800', color: c.texto },
  recorde: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
}));
