import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../data/banco';
import { cartoesDoTopico } from '../estado/cartoes';
import { hoje } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import { topicosDoAluno } from '../estado/progresso';
import { Botao, Cabecalho, Cartao } from '../ui/componentes';
import { ComIcone, Icone } from '../ui/Icone';
import { TextoRico } from '../ui/Markdown';
import { criarEstilos, useCores } from '../ui/tema';

/**
 * Técnica Feynman: explicar o assunto com as próprias palavras, como se ensinasse alguém, e depois
 * conferir com os pontos do resumo o que ficou de fora. O que faltou é o que precisa ser estudado.
 */
export default function TelaFeynman() {
  const c = useCores();
  const s = useEstilos();
  const params = useLocalSearchParams<{ topico?: string }>();
  const { p, atualizar } = useProgresso();
  const [topicoId, setTopicoId] = useState(params.topico ?? '');
  const anterior = p.feynman[topicoId];
  const [texto, setTexto] = useState(anterior?.texto ?? '');
  const [conferindo, setConferindo] = useState(false);
  const [marcados, setMarcados] = useState<Set<string>>(new Set());
  const [salvo, setSalvo] = useState<string[] | null>(null);
  const info = getTopico(topicoId);
  const pontos = topicoId ? cartoesDoTopico(topicoId) : [];

  if (!info) {
    // assuntos que o aluno estudou por último vêm primeiro
    const recentes = Object.entries(p.topicosDia)
      .sort(([a], [b]) => (a < b ? 1 : -1))
      .flatMap(([, ids]) => ids);
    const daProva = new Set(topicosDoAluno(p).map((t) => t.id));
    const lista = [...new Set(recentes)].filter((id) => daProva.has(id) && cartoesDoTopico(id).length).slice(0, 15);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
        <Cabecalho titulo="Técnica Feynman" icone="account-voice" />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 40 }}>
          <Text style={s.texto}>
            Escolha um assunto que você já estudou. Você vai explicá-lo com as suas palavras, como se ensinasse a um colega, e depois conferir o que
            ficou de fora.
          </Text>
          {lista.length ? (
            lista.map((id) => {
              const t = getTopico(id)!;
              return (
                <Cartao key={id} estilo={s.linha} onPress={() => (setTopicoId(id), setTexto(p.feynman[id]?.texto ?? ''))}>
                  <Icone nome={t.disciplina.icone} tamanho={22} cor={t.disciplina.cor} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.nome}>{t.topico.titulo}</Text>
                    {p.feynman[id] && <Text style={s.mini}>Já explicado em {p.feynman[id].dia.split('-').reverse().join('/')}</Text>}
                  </View>
                  <Icone nome="chevron-right" tamanho={22} cor={c.textoSuave} />
                </Cartao>
              );
            })
          ) : (
            <Text style={s.mini}>Você ainda não estudou nenhum assunto. Estude um assunto do plano de hoje e volte aqui.</Text>
          )}
          <Botao titulo="Escolher na aba Estudar" contorno cor={c.azul} onPress={() => router.navigate('/estudar')} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  function salvar() {
    const faltaram = pontos.filter((pt) => !marcados.has(pt.id)).map((pt) => pt.frente);
    atualizar((x) => ({ ...x, feynman: { ...x.feynman, [topicoId]: { texto: texto.trim(), dia: hoje(), faltaram } } }));
    setSalvo(faltaram);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Técnica Feynman" icone="account-voice" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <ComIcone icone={info.disciplina.icone} cor={info.disciplina.cor} estiloTexto={s.titulo}>
          {info.topico.titulo}
        </ComIcone>

        {!conferindo ? (
          <>
            <Cartao>
              <Text style={s.passo}>1. Explique com as suas palavras</Text>
              <Text style={s.texto}>
                Sem olhar a aula, escreva como você explicaria este assunto para alguém que nunca estudou. Use frases simples e exemplos. Onde você
                travar é exatamente o que precisa estudar de novo.
              </Text>
              <TextInput
                testID="feynman-texto"
                value={texto}
                onChangeText={setTexto}
                multiline
                placeholder="Este assunto trata de..."
                placeholderTextColor={c.cinza}
                style={s.campo}
                textAlignVertical="top"
              />
            </Cartao>
            <Botao
              testID="btn-feynman-conferir"
              titulo="Conferir com o resumo"
              cor={c.roxo}
              desativado={texto.trim().length < 20}
              onPress={() => setConferindo(true)}
            />
            {texto.trim().length < 20 && <Text style={s.mini}>Escreva pelo menos algumas frases para conferir.</Text>}
          </>
        ) : (
          <>
            <Cartao>
              <Text style={s.passo}>2. O que você explicou?</Text>
              <Text style={s.texto}>Leia cada ponto do resumo e marque os que você explicou bem. Os que ficarem sem marca são os que você precisa reforçar.</Text>
              {pontos.map((pt) => {
                const ok = marcados.has(pt.id);
                return (
                  <Pressable
                    key={pt.id}
                    onPress={() =>
                      setMarcados((m) => {
                        const n = new Set(m);
                        if (ok) n.delete(pt.id);
                        else n.add(pt.id);
                        return n;
                      })
                    }
                    style={s.ponto}
                    disabled={!!salvo}
                  >
                    <Icone nome={ok ? 'checkbox-marked' : 'checkbox-blank-outline'} tamanho={24} cor={ok ? c.verde : c.cinza} />
                    <View style={{ flex: 1 }}>
                      <Text style={s.pontoTitulo}>{pt.frente}</Text>
                      <TextoRico texto={pt.verso} estilo={s.pontoTexto} />
                    </View>
                  </Pressable>
                );
              })}
            </Cartao>
            {!salvo ? (
              <>
                <Botao testID="btn-feynman-salvar" titulo="Concluir" cor={c.roxo} onPress={salvar} />
                <Botao titulo="Voltar e completar a explicação" contorno cor={c.roxo} onPress={() => setConferindo(false)} />
              </>
            ) : (
              <Cartao estilo={{ backgroundColor: salvo.length ? c.amareloClaro : c.verdeClaro, borderColor: salvo.length ? c.amarelo : c.verde }}>
                <Text style={s.passo}>3. {salvo.length ? 'Reforce o que faltou' : 'Você explicou tudo!'}</Text>
                <Text style={s.texto}>
                  {salvo.length
                    ? `Faltou explicar: ${salvo.join('; ')}. Releia essas partes na aula e tente explicar de novo daqui a alguns dias.`
                    : 'Ótimo sinal de que você entendeu o assunto. Agora fixe com questões ou flashcards nos próximos dias.'}
                </Text>
                <View style={{ gap: 8 }}>
                  <Botao pequeno cor={c.azul} icone="book-open-page-variant-outline" titulo="Ler a aula" onPress={() => router.replace({ pathname: '/resumo', params: { topico: topicoId } })} />
                  <Botao pequeno contorno cor={c.roxo} icone="cards-outline" titulo="Flashcards deste assunto" onPress={() => router.replace({ pathname: '/flashcards', params: { modo: 'topico', topico: topicoId } })} />
                </View>
              </Cartao>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 20, fontWeight: '800', color: c.texto },
  passo: { fontSize: 17, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20, marginVertical: 8 },
  mini: { fontSize: 12, color: c.textoSuave, fontWeight: '600' },
  campo: {
    minHeight: 200,
    borderWidth: 2,
    borderColor: c.borda,
    borderRadius: 14,
    padding: 12,
    fontSize: 16,
    lineHeight: 23,
    color: c.texto,
    backgroundColor: c.fundoSuave,
  },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  nome: { fontSize: 15, fontWeight: '800', color: c.texto },
  ponto: { flexDirection: 'row', gap: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: c.borda },
  pontoTitulo: { fontSize: 15, fontWeight: '800', color: c.texto },
  pontoTexto: { fontSize: 14, color: c.textoSuave, lineHeight: 20, marginTop: 2 },
}));
