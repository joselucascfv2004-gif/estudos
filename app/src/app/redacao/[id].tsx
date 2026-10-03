import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COMPETENCIAS, NOTAS_COMPETENCIA, getTemaRedacao, linhasEstimadas } from '../../data/redacao';
import { hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import { Redacao } from '../../estado/progresso';
import { Botao, Cabecalho, Cartao, Chip } from '../../ui/componentes';
import { ComIcone } from '../../ui/Icone';
import { criarEstilos, useCores } from '../../ui/tema';

const TEMPO_SUGERIDO = 60 * 60;

function relogio(segundos: number) {
  const m = Math.floor(segundos / 60);
  return `${m}:${String(segundos % 60).padStart(2, '0')}`;
}

/** Escrever uma redação: tema, ideias, cronômetro, contador de linhas e autoavaliação. */
export default function TelaRedacao() {
  const c = useCores();
  const s = useEstilos();
  const { id } = useLocalSearchParams<{ id: string }>();
  const tema = getTemaRedacao(id ?? '');
  const { p, atualizar } = useProgresso();
  const salva = p.redacoes[id ?? ''];
  const [texto, setTexto] = useState(salva?.texto ?? '');
  const [notas, setNotas] = useState<(number | null)[]>(salva?.notas ?? [null, null, null, null, null]);
  const [segundos, setSegundos] = useState(salva?.segundos ?? 0);
  const [rodando, setRodando] = useState(false);
  const [msg, setMsg] = useState('');
  const ultimo = useRef({ texto, notas, segundos });
  ultimo.current = { texto, notas, segundos };

  useEffect(() => {
    if (!rodando) return;
    const t = setInterval(() => setSegundos((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [rodando]);

  // salva o rascunho sozinho, de tempos em tempos e ao sair da tela
  useEffect(() => {
    const salvar = () => {
      const r = ultimo.current;
      if (!id || (!r.texto.trim() && r.notas.every((n) => n == null))) return;
      atualizar((x) => ({ ...x, redacoes: { ...x.redacoes, [id]: { tema: id, texto: r.texto, notas: r.notas, segundos: r.segundos, dia: hoje() } satisfies Redacao } }));
    };
    const t = setInterval(salvar, 15000);
    return () => {
      clearInterval(t);
      salvar();
    };
  }, [id, atualizar]);

  if (!tema) return null;
  const linhas = linhasEstimadas(texto);
  const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const total = notas.every((n) => n != null) ? notas.reduce<number>((a, n) => a + (n ?? 0), 0) : null;

  function salvar() {
    atualizar((x) => ({ ...x, redacoes: { ...x.redacoes, [tema!.id]: { tema: tema!.id, texto, notas, segundos, dia: hoje() } } }));
    setRodando(false);
    setMsg('Redação salva! Você pode voltar e continuar quando quiser.');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo={`Redação ENEM ${tema.ano}`} icone="draw-pen" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <Text style={s.tema}>{tema.titulo}</Text>
        {tema.obs && <Text style={s.mini}>{tema.obs}</Text>}
        <Text style={s.texto}>
          A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo da sua formação, redija um texto
          dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema acima, apresentando proposta de intervenção que
          respeite os direitos humanos.
        </Text>

        <Cartao estilo={{ gap: 6 }}>
          <ComIcone icone="lightbulb-on-outline" cor={c.amarelo} estiloTexto={s.titulo}>
            Pontos para pensar
          </ComIcone>
          {tema.pontos.map((pt) => (
            <Text key={pt} style={s.item}>
              • {pt}
            </Text>
          ))}
          <Text style={s.mini}>Sugestões do app para começar. Na prova, os textos motivadores trazem outras informações.</Text>
        </Cartao>

        <View style={s.barra}>
          <Text style={[s.relogio, segundos > TEMPO_SUGERIDO && { color: c.vermelho }]}>{relogio(segundos)}</Text>
          <Text style={[s.mini, { flex: 1 }]}>Na prova, reserve cerca de 1 hora para a redação.</Text>
          <Botao pequeno titulo={rodando ? 'Pausar' : segundos ? 'Continuar' : 'Começar'} cor={c.azul} onPress={() => setRodando(!rodando)} />
        </View>

        <TextInput
          testID="input-redacao"
          value={texto}
          onChangeText={(t) => {
            setTexto(t);
            setMsg('');
            if (!rodando && !segundos) setRodando(true);
          }}
          multiline
          placeholder="Escreva sua redação aqui. Deixe uma linha em branco entre os parágrafos."
          placeholderTextColor={c.cinza}
          style={s.campo}
        />
        <Text style={[s.mini, (linhas > 30 || (linhas > 0 && linhas <= 7)) && { color: c.vermelho }]}>
          ≈ {linhas} linha{linhas === 1 ? '' : 's'} na folha · {palavras} palavras ·{' '}
          {linhas > 30 ? 'passou de 30 linhas: corte alguma coisa' : linhas <= 7 ? 'com 7 linhas ou menos a redação zera' : 'tamanho dentro do limite'}
        </Text>

        <Text style={s.secao}>Autoavaliação</Text>
        <Text style={s.texto}>Releia o texto e responda às perguntas de cada competência. Depois escolha a nota que você acha que tirou.</Text>
        {COMPETENCIAS.map((comp, i) => (
          <Cartao key={comp.titulo} estilo={{ gap: 4 }}>
            <Text style={s.titulo}>{comp.titulo}</Text>
            {comp.perguntas.map((q) => (
              <Text key={q} style={s.item}>
                • {q}
              </Text>
            ))}
            <View style={s.chips}>
              {NOTAS_COMPETENCIA.map((n) => (
                <Chip
                  key={n}
                  testID={`nota-${i}-${n}`}
                  texto={String(n)}
                  ativo={notas[i] === n}
                  cor={c.verde}
                  onPress={() => setNotas((atual) => atual.map((v, j) => (j === i ? n : v)))}
                />
              ))}
            </View>
          </Cartao>
        ))}
        {total != null && (
          <Cartao estilo={{ backgroundColor: c.verdeClaro, borderColor: c.verde }}>
            <Text style={[s.titulo, { color: c.verdeEscuro }]}>Sua nota estimada: {total} de 1.000</Text>
            <Text style={[s.mini, { color: c.verdeEscuro }]}>É uma autoavaliação. Para uma nota confiável, peça para um professor corrigir.</Text>
          </Cartao>
        )}
        <Botao testID="btn-salvar-redacao" icone="content-save-outline" titulo="Salvar redação" cor={c.verde} onPress={salvar} />
        {!!msg && <Text style={[s.mini, { color: c.verdeEscuro }]}>{msg}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  tema: { fontSize: 20, fontWeight: '800', color: c.texto, lineHeight: 27 },
  titulo: { fontSize: 15, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20 },
  item: { fontSize: 14, color: c.texto, lineHeight: 20 },
  mini: { fontSize: 12, fontWeight: '700', color: c.textoSuave },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  barra: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  relogio: { fontSize: 22, fontWeight: '800', color: c.texto, fontVariant: ['tabular-nums'] },
  campo: {
    minHeight: 320,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: c.borda,
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    lineHeight: 24,
    color: c.texto,
    backgroundColor: c.fundoSuave,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginTop: 6 },
}));
