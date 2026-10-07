import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../data/banco';
import { Cartao, NOMES_NOTA, NotaCartao } from '../estado/cartoes';
import { useProgresso } from '../estado/ProgressoContext';
import { EventosCartoes, RespostaCartao, concluirCartoes, montarCartoes } from '../estado/progresso';
import { Barra, Botao, Cabecalho } from '../ui/componentes';
import { ComIcone, Icone } from '../ui/Icone';
import { TextoRico } from '../ui/Markdown';
import { criarEstilos, useCores } from '../ui/tema';

type ModoCartoes = 'topico' | 'revisao' | 'dia';

/**
 * Sessão de flashcards: o aluno lê a frente, tenta lembrar, vira o cartão e diz se lembrou. O cartão
 * que ele não lembrou volta uma vez no fim da sessão; a nota decide quando o cartão volta nos
 * próximos dias (revisão espaçada).
 */
export default function TelaFlashcards() {
  const c = useCores();
  const s = useEstilos();
  const params = useLocalSearchParams<{ modo?: ModoCartoes; topico?: string }>();
  const modo: ModoCartoes = params.modo ?? (params.topico ? 'topico' : 'dia');
  const { p, atualizar } = useProgresso();
  const inicial = useMemo(
    () => montarCartoes(p, modo, params.topico),
    // a sessão é montada uma vez ao abrir
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [fila, setFila] = useState<Cartao[]>(inicial);
  const [pos, setPos] = useState(0);
  const [virado, setVirado] = useState(false);
  const [fim, setFim] = useState<EventosCartoes | null>(null);
  const notas = useRef(new Map<string, RespostaCartao>());
  const titulo = modo === 'topico' && params.topico ? (getTopico(params.topico)?.topico.titulo ?? 'Flashcards') : modo === 'revisao' ? 'Revisão com flashcards' : 'Flashcards do dia';

  if (!inicial.length) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
        <Cabecalho titulo={titulo} icone="cards-outline" />
        <View style={s.centro}>
          <Icone nome="cards-outline" tamanho={72} cor={c.cinza} />
          <Text style={s.fimTitulo}>Nenhum cartão agora</Text>
          <Text style={s.fimSub}>
            Os flashcards saem dos assuntos que você já estudou. Estude um assunto do plano de hoje e os cartões dele aparecem aqui.
          </Text>
          <Botao titulo="Voltar" onPress={() => router.back()} estilo={{ alignSelf: 'stretch', marginTop: 20 }} />
        </View>
      </SafeAreaView>
    );
  }

  if (fim) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
        <View style={s.centro}>
          <Icone nome="cards-playing-outline" tamanho={80} cor={c.roxo} />
          <Text style={s.fimTitulo}>Sessão concluída!</Text>
          <Text style={s.fimSub}>
            Você lembrou {fim.lembrados} de {fim.total} cartões. Os que você não lembrou voltam amanhã; os que lembrou fácil voltam cada vez mais tarde.
          </Text>
          <Text style={s.ganho}>
            +{fim.xp} XP · +{fim.moedas} moedas{fim.ofensivaAumentou ? ' · ofensiva mantida!' : ''}
          </Text>
          <Botao testID="btn-fim-cartoes" titulo="Continuar" onPress={() => router.back()} estilo={{ alignSelf: 'stretch', marginTop: 20 }} />
        </View>
      </SafeAreaView>
    );
  }

  const cartao = fila[pos];
  const info = getTopico(cartao.topicoId);
  const respondidos = notas.current.size;

  function avaliar(nota: NotaCartao) {
    // vale a primeira nota de cada cartão; o não lembrado volta uma vez no fim da sessão
    const primeira = !notas.current.has(cartao.id);
    if (primeira) notas.current.set(cartao.id, { cartao, nota });
    const novaFila = primeira && nota === 0 ? [...fila, cartao] : fila;
    if (novaFila !== fila) setFila(novaFila);
    if (pos + 1 < novaFila.length) {
      setPos(pos + 1);
      setVirado(false);
      return;
    }
    const { p: novo, ev } = concluirCartoes(p, [...notas.current.values()]);
    atualizar(() => novo);
    setFim(ev);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo={titulo} icone="cards-outline" />
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Barra valor={respondidos / inicial.length} cor={c.roxo} altura={12} />
        <Text style={s.contador}>
          Cartão {Math.min(pos + 1, fila.length)} de {fila.length}
          {pos >= inicial.length ? ' · repetindo os que você não lembrou' : ''}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        {pos === 0 && !virado && (
          <Text style={s.dica}>Leia a frente e tente lembrar a explicação antes de virar. Seja sincero na nota: é ela que decide quando o cartão volta.</Text>
        )}
        <Pressable testID="cartao" onPress={() => setVirado(true)} style={[s.cartao, virado && { borderColor: c.roxo }]}>
          {info && (
            <ComIcone icone={info.disciplina.icone} cor={info.disciplina.cor} tamanho={16} estiloTexto={s.assunto}>
              {info.topico.titulo}
            </ComIcone>
          )}
          <Text style={s.frente}>{cartao.frente}</Text>
          {virado ? (
            <View style={s.verso}>
              <TextoRico texto={cartao.verso} estilo={s.versoTexto} />
            </View>
          ) : (
            <Text style={s.virar}>Toque para ver a resposta</Text>
          )}
        </Pressable>
      </ScrollView>
      <View style={s.rodape}>
        {virado ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {([0, 1, 2] as NotaCartao[]).map((n) => (
              <Botao
                key={n}
                testID={`nota-${n}`}
                titulo={NOMES_NOTA[n]}
                pequeno
                cor={[c.vermelho, c.laranja, c.verde][n]}
                estilo={{ flex: 1, paddingHorizontal: 6 }}
                onPress={() => avaliar(n)}
              />
            ))}
          </View>
        ) : (
          <Botao testID="btn-virar" titulo="Mostrar resposta" cor={c.roxo} onPress={() => setVirado(true)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  fimTitulo: { fontSize: 24, fontWeight: '800', color: c.texto, marginTop: 14, textAlign: 'center' },
  fimSub: { fontSize: 15, color: c.textoSuave, fontWeight: '600', textAlign: 'center', marginTop: 8, lineHeight: 22 },
  ganho: { fontSize: 16, fontWeight: '800', color: c.laranja, marginTop: 14 },
  contador: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginTop: 6 },
  dica: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginBottom: 10, lineHeight: 19 },
  cartao: {
    flexGrow: 1,
    minHeight: 280,
    borderRadius: 22,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: c.borda,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: c.fundo,
  },
  assunto: { fontSize: 13, fontWeight: '800', color: c.textoSuave, marginBottom: 14 },
  frente: { fontSize: 24, fontWeight: '800', color: c.texto, textAlign: 'center' },
  virar: { fontSize: 14, fontWeight: '700', color: c.roxo, textAlign: 'center', marginTop: 24 },
  verso: { marginTop: 18, paddingTop: 16, borderTopWidth: 1, borderTopColor: c.borda },
  versoTexto: { fontSize: 17, color: c.texto, lineHeight: 25 },
  rodape: { padding: 16, borderTopWidth: 2, borderTopColor: c.borda },
}));
