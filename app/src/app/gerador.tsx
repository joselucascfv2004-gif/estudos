import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ASSUNTOS, MAX_EXERCICIOS, NOMES_NIVEL, gerarLista, getAssunto, type Exercicio } from '../gerador/assuntos';
import { podeTrocarPasta, salvarPdf } from '../gerador/salvarPdf';
import { Botao, Cabecalho, Cartao, Chip } from '../ui/componentes';
import { Expr } from '../ui/Expr';
import { ComIcone, Icone } from '../ui/Icone';
import { criarEstilos, useCores } from '../ui/tema';

type Nivel = 1 | 2 | 3;
const ATALHOS = [10, 20, 30, 50, 100];

/** Gerador de folhas de exercícios de matemática para imprimir (no estilo do método Kumon). */
export default function TelaGerador() {
  const c = useCores();
  const s = useEstilos();
  const params = useLocalSearchParams<{ assunto?: string }>();
  const [assuntoId, setAssuntoId] = useState<string | null>(params.assunto && getAssunto(params.assunto) ? params.assunto : null);
  const [niveis, setNiveis] = useState<Nivel[]>([1]);
  const [qtdTexto, setQtdTexto] = useState('20');
  const [lista, setLista] = useState<Exercicio[] | null>(null);
  const [gabarito, setGabarito] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ ok: boolean; texto: string } | null>(null);

  const assunto = assuntoId ? getAssunto(assuntoId) : undefined;
  const qtd = Math.max(1, Math.min(MAX_EXERCICIOS, parseInt(qtdTexto, 10) || 0));

  // exemplo de cada nível escolhido, para o aluno ter ideia do que vem
  const exemplos = useMemo(() => (assunto ? niveis.map((n) => ({ n, it: gerarLista(assunto, [n], 1)[0] })) : []), [assunto, niveis]);

  const limpar = () => {
    setLista(null);
    setMensagem(null);
  };
  const escolherAssunto = (id: string) => {
    setAssuntoId(id);
    limpar();
  };
  const alternarNivel = (n: Nivel) => {
    setNiveis((atual) => {
      if (atual.includes(n)) return atual.length === 1 ? atual : atual.filter((x) => x !== n);
      return [...atual, n].sort() as Nivel[];
    });
    limpar();
  };
  const mudarQtd = (v: number) => {
    setQtdTexto(String(Math.max(1, Math.min(MAX_EXERCICIOS, v))));
    limpar();
  };

  const gerar = () => {
    if (!assunto) return;
    setLista(gerarLista(assunto, niveis, qtd));
    setGabarito(false);
    setMensagem(null);
  };

  const baixar = async (trocarPasta = false) => {
    if (!assunto || !lista?.length) return;
    setSalvando(true);
    setMensagem(null);
    try {
      // o pdf-lib só é carregado quando o aluno pede o PDF
      const { montarPdf } = await import('../gerador/pdf');
      const doc = await montarPdf(assunto.titulo, niveis, lista);
      const b64 = await doc.saveAsBase64();
      const agora = new Date();
      const dois = (x: number) => String(x).padStart(2, '0');
      const carimbo = `${agora.getFullYear()}-${dois(agora.getMonth() + 1)}-${dois(agora.getDate())}-${dois(agora.getHours())}${dois(agora.getMinutes())}`;
      const r = await salvarPdf(`exercicios-${assunto.id}-${carimbo}.pdf`, b64, trocarPasta);
      setMensagem(
        r.ok
          ? { ok: true, texto: `PDF salvo ${r.onde}. Abra pelo app de arquivos do celular para imprimir.` }
          : { ok: false, texto: `Não foi possível salvar: ${r.motivo}` },
      );
    } catch (e) {
      setMensagem({ ok: false, texto: `Não foi possível montar o PDF: ${e instanceof Error ? e.message : 'erro desconhecido'}` });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Gerador de exercícios" icone="printer-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <Cartao estilo={{ backgroundColor: c.azulClaro, borderColor: c.azulBorda }}>
          <ComIcone icone="pencil-ruler" cor={c.azul} tamanho={22} estiloTexto={s.cartaoTitulo}>
            Treino no papel, estilo Kumon
          </ComIcone>
          <Text style={s.texto}>
            Muitas contas curtas, sem repetir, do mais fácil para o mais difícil. Gere a folha, baixe o PDF, imprima e resolva à mão: as questões
            ficam na metade esquerda e a metade direita fica livre para os cálculos. O gabarito, só com o resultado final, vem na última página.
          </Text>
          <Text style={s.texto}>Dica do método: anote o tempo e os acertos. Repita o assunto até acertar quase tudo em pouco tempo, e só então suba de nível.</Text>
        </Cartao>

        <Text style={s.secao}>1. Assunto</Text>
        <View style={s.chips}>
          {ASSUNTOS.map((a) => (
            <View key={a.id} style={{ marginBottom: 8 }}>
              <Chip testID={`assunto-${a.id}`} texto={a.titulo} ativo={a.id === assuntoId} cor={c.azul} onPress={() => escolherAssunto(a.id)} />
            </View>
          ))}
        </View>

        <Text style={s.secao}>2. Nível (pode marcar mais de um)</Text>
        <View style={s.chips}>
          {([1, 2, 3] as Nivel[]).map((n) => (
            <Chip key={n} testID={`nivel-${n}`} texto={NOMES_NIVEL[n - 1]} ativo={niveis.includes(n)} cor={c.roxo} icone={niveis.includes(n) ? 'check' : undefined} onPress={() => alternarNivel(n)} />
          ))}
        </View>
        {exemplos.length > 0 && (
          <Cartao estilo={{ gap: 10, paddingVertical: 12 }}>
            <Text style={s.rotulo}>Exemplos de {assunto?.titulo}</Text>
            {exemplos.map(({ n, it }) =>
              it ? (
                <View key={n} style={s.linhaExemplo}>
                  <Text style={s.nivelExemplo}>{NOMES_NIVEL[n - 1]}</Text>
                  <Expr texto={it.e} cor={c.texto} tamanho={15} />
                </View>
              ) : null,
            )}
          </Cartao>
        )}

        <Text style={s.secao}>3. Quantidade (até {MAX_EXERCICIOS})</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable style={s.passo} onPress={() => mudarQtd(qtd - 5)} hitSlop={6} accessibilityLabel="Menos 5">
            <Icone nome="minus" tamanho={22} cor={c.texto} />
          </Pressable>
          <TextInput
            testID="qtd"
            value={qtdTexto}
            onChangeText={(t) => {
              setQtdTexto(t.replace(/\D/g, '').slice(0, 3));
              limpar();
            }}
            onBlur={() => setQtdTexto(String(qtd))}
            keyboardType="number-pad"
            style={s.campo}
            maxLength={3}
          />
          <Pressable style={s.passo} onPress={() => mudarQtd(qtd + 5)} hitSlop={6} accessibilityLabel="Mais 5">
            <Icone nome="plus" tamanho={22} cor={c.texto} />
          </Pressable>
          <Text style={s.texto}>exercícios</Text>
        </View>
        <View style={s.chips}>
          {ATALHOS.map((n) => (
            <Chip key={n} texto={String(n)} ativo={qtd === n} cor={c.verde} onPress={() => mudarQtd(n)} />
          ))}
        </View>

        <Botao testID="btn-gerar" icone="auto-fix" titulo={lista ? 'Gerar outra folha' : 'Gerar exercícios'} cor={c.azul} desativado={!assunto} onPress={gerar} />
        {!assunto && <Text style={[s.texto, { textAlign: 'center' }]}>Escolha um assunto para começar.</Text>}

        {lista && assunto && (
          <Cartao estilo={{ gap: 12 }}>
            <Text style={s.cartaoTitulo}>
              Folha pronta: {lista.length} {lista.length === 1 ? 'exercício' : 'exercícios'}
            </Text>
            {lista.length < qtd && (
              <Text style={[s.texto, { color: c.laranja }]}>
                Este assunto não tem {qtd} exercícios diferentes nesse nível. Para ter mais, marque outro nível também.
              </Text>
            )}
            <Botao testID="btn-pdf" icone="file-pdf-box" titulo={salvando ? 'Preparando o PDF...' : 'Baixar PDF'} cor={c.verde} desativado={salvando} onPress={() => baixar()} />
            {salvando && <ActivityIndicator color={c.verde} />}
            {mensagem && <Text style={[s.texto, { color: mensagem.ok ? c.verdeEscuro : c.vermelho, fontWeight: '800' }]}>{mensagem.texto}</Text>}
            {podeTrocarPasta && !salvando && (
              <Text style={s.link} onPress={() => baixar(true)}>
                Salvar em outra pasta
              </Text>
            )}
            <Botao pequeno contorno cor={c.roxo} icone={gabarito ? 'eye-off-outline' : 'eye-outline'} titulo={gabarito ? 'Esconder gabarito' : 'Ver gabarito'} onPress={() => setGabarito((g) => !g)} />
          </Cartao>
        )}

        {lista && (
          <View style={{ gap: 0 }}>
            {lista.map((it, i) => (
              <View key={i}>
                {(i === 0 || lista[i - 1].nivel !== it.nivel) && niveis.length > 1 && <Text style={[s.secao, { marginTop: 10, marginBottom: 4 }]}>{NOMES_NIVEL[it.nivel - 1]}</Text>}
                <View style={s.exercicio}>
                  <Text style={s.numero}>{i + 1})</Text>
                  <View style={{ flex: 1, gap: 6 }}>
                    <Expr texto={it.e} cor={c.texto} />
                    {gabarito && (
                      <View style={s.resposta}>
                        <Icone nome="check-circle-outline" tamanho={16} cor={c.verdeEscuro} />
                        <Expr texto={it.r} cor={c.verdeEscuro} tamanho={15} negrito />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  cartaoTitulo: { fontSize: 18, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20, marginTop: 6 },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 },
  rotulo: { fontSize: 13, fontWeight: '800', color: c.textoSuave },
  linhaExemplo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nivelExemplo: { width: 58, fontSize: 12, fontWeight: '800', color: c.roxo },
  passo: { width: 44, height: 44, borderRadius: 12, borderWidth: 2, borderBottomWidth: 3, borderColor: c.borda, alignItems: 'center', justifyContent: 'center', backgroundColor: c.fundo },
  campo: { width: 70, height: 44, borderRadius: 12, borderWidth: 2, borderColor: c.borda, textAlign: 'center', fontSize: 18, fontWeight: '800', color: c.texto, backgroundColor: c.fundoSuave },
  link: { fontSize: 13, color: c.roxo, fontWeight: '800', textDecorationLine: 'underline', textAlign: 'center' },
  exercicio: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: c.borda },
  numero: { width: 36, fontSize: 15, fontWeight: '800', color: c.textoSuave, paddingTop: 4 },
  resposta: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.verdeClaro, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' },
}));
