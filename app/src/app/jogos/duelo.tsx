import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { disciplinas, disciplinasDaProva, Questao } from '../../data/banco';
import { useProgresso } from '../../estado/ProgressoContext';
import { registrarJogo } from '../../estado/progresso';
import { embaralhar } from '../../jogos/aleatorio';
import { multiplicador } from '../../jogos/calculo';
import { montarRodada, questoesDoDuelo, Rodada } from '../../jogos/duelo';
import { Botao, Cartao } from '../../ui/componentes';
import { BarraTempo, Opcoes, Placar, Resultado, TelaJogo, useAgora, vibrar } from '../../ui/jogos';
import { criarEstilos, useCores } from '../../ui/tema';

type Modo = 'sobrevivencia' | 'rodada';
const MODOS: { id: Modo; nome: string; detalhe: string }[] = [
  { id: 'rodada', nome: 'Rodada de 15', detalhe: '15 perguntas, 15 s cada' },
  { id: 'sobrevivencia', nome: 'Sobrevivência', detalhe: '3 vidas, até errar' },
];
const COR = '#CE82FF';
const TEMPO = 15;
const RODADA = 15;
const MINIMO = 15;

type Estado = {
  rodada: Rodada;
  fila: Questao[];
  pontos: number;
  sequencia: number;
  seqMax: number;
  acertos: number;
  erros: number;
  vidas: number;
  feitas: number;
  inicioPergunta: number;
  feito: { escolha: 0 | 1 | null; certo: boolean; ate: number; ganho: number } | null;
};

export default function JogoDuelo() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [fase, setFase] = useState<'config' | 'jogo' | 'fim'>('config');
  const [modo, setModo] = useState<Modo>('rodada');
  const [materia, setMateria] = useState('prova');
  const [st, setSt] = useState<Estado | null>(null);
  const [fim, setFim] = useState<{ pontos: number; recorde: number; novo: boolean; xp: number; linhas: [string, string][] } | null>(null);
  const agora = useAgora(fase === 'jogo');
  const pool = useRef<Questao[]>([]);

  const daProva = useMemo(() => disciplinasDaProva(p.prova, p.lingua), [p.prova, p.lingua]);
  const opcoesMateria = useMemo(() => {
    const lista = daProva
      .map((d) => ({ id: d.id, nome: d.nome, n: questoesDoDuelo([d]).length }))
      .filter((d) => d.n >= MINIMO)
      .map(({ id, nome }) => ({ id, nome }));
    return [{ id: 'prova', nome: 'Matérias da minha prova' }, ...lista, { id: 'todas', nome: 'Todas as matérias' }];
  }, [daProva]);

  const chave = `duelo:${modo}`;
  const recordeAtual = p.jogos[chave]?.recorde ?? 0;

  function comecar() {
    const fonte = materia === 'prova' ? daProva : materia === 'todas' ? disciplinas.filter((d) => d.id !== 'enem-oficial') : disciplinas.filter((d) => d.id === materia);
    pool.current = questoesDoDuelo(fonte);
    const fila = embaralhar(Math.random, pool.current);
    const primeira = fila.shift()!;
    setSt({ rodada: montarRodada(Math.random, primeira), fila, pontos: 0, sequencia: 0, seqMax: 0, acertos: 0, erros: 0, vidas: 3, feitas: 0, inicioPergunta: Date.now(), feito: null });
    setFase('jogo');
  }

  function terminar(e: Estado) {
    atualizar((prev) => registrarJogo(prev, chave, e.pontos, e.acertos * 2).p);
    setFim({
      pontos: e.pontos,
      recorde: Math.max(recordeAtual, e.pontos),
      novo: e.pontos > recordeAtual && e.pontos > 0,
      xp: Math.min(30, e.acertos * 2),
      linhas: [
        ['Acertos', `${e.acertos} de ${e.acertos + e.erros}`],
        ['Maior sequência', String(e.seqMax)],
      ],
    });
    setFase('fim');
  }

  function escolher(e: Estado, escolha: 0 | 1 | null) {
    if (e.feito) return;
    const certo = escolha === e.rodada.certa;
    vibrar(certo);
    const segundos = (Date.now() - e.inicioPergunta) / 1000;
    const ganho = certo ? Math.round((10 + Math.max(0, Math.round(10 - segundos))) * multiplicador(e.sequencia)) : 0;
    const seq = certo ? e.sequencia + 1 : 0;
    setSt({
      ...e,
      pontos: e.pontos + ganho,
      sequencia: seq,
      seqMax: Math.max(e.seqMax, seq),
      acertos: e.acertos + (certo ? 1 : 0),
      erros: e.erros + (certo ? 0 : 1),
      vidas: modo === 'sobrevivencia' && !certo ? e.vidas - 1 : e.vidas,
      feitas: e.feitas + 1,
      feito: { escolha, certo, ate: Date.now() + (certo ? 700 : 2200), ganho },
    });
  }

  function proxima(e: Estado) {
    if ((modo === 'rodada' && e.feitas >= RODADA) || (modo === 'sobrevivencia' && e.vidas <= 0)) return terminar(e);
    const fila = e.fila.length ? [...e.fila] : embaralhar(Math.random, pool.current);
    const q = fila.shift()!;
    setSt({ ...e, fila, rodada: montarRodada(Math.random, q), feito: null, inicioPergunta: Date.now() });
  }

  useEffect(() => {
    if (fase !== 'jogo' || !st) return;
    if (st.feito) {
      if (agora >= st.feito.ate) proxima(st);
      return;
    }
    if (agora - st.inicioPergunta >= TEMPO * 1000) escolher(st, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agora]);

  if (fase === 'config') {
    return (
      <TelaJogo titulo="Duelo de alternativas" icone="sword-cross">
        <Text style={s.intro}>
          Uma questão do app com só duas alternativas: a certa e uma errada. Escolha rápido! Vale para todas as matérias e usa só questões curtas, para dar tempo de ler.
        </Text>
        <Opcoes titulo="Modo" prefixo="modo" opcoes={MODOS} valor={modo} onEscolher={setModo} cor={COR} />
        <Opcoes titulo="Matéria" prefixo="materia" opcoes={opcoesMateria} valor={materia} onEscolher={setMateria} cor={COR} />
        <Cartao estilo={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={s.recordeRotulo}>Seu recorde neste modo</Text>
          <Text style={s.recordeValor}>{recordeAtual} pts</Text>
        </Cartao>
        <Botao testID="btn-comecar-jogo" titulo="Começar" cor={COR} estilo={{ marginTop: 18 }} onPress={comecar} />
      </TelaJogo>
    );
  }

  if (fase === 'fim' && fim) {
    return (
      <TelaJogo titulo="Duelo de alternativas" icone="sword-cross">
        <Resultado pontos={fim.pontos} recorde={fim.recorde} novoRecorde={fim.novo} xp={fim.xp} linhas={fim.linhas} cor={COR} onDeNovo={comecar} />
        <Botao titulo="Mudar modo ou matéria" contorno pequeno cor={COR} estilo={{ marginTop: 12 }} onPress={() => setFase('config')} />
      </TelaJogo>
    );
  }

  if (!st) return null;
  const fracao = st.feito ? 0 : 1 - (agora - st.inicioPergunta) / 1000 / TEMPO;

  return (
    <TelaJogo titulo="Duelo de alternativas" icone="sword-cross" rolar={false}>
      <Placar pontos={st.pontos} sequencia={st.sequencia} mult={multiplicador(st.sequencia)} vidas={modo === 'sobrevivencia' ? st.vidas : undefined} />
      <BarraTempo fracao={fracao} cor={COR} />
      {modo === 'rodada' && <Text style={s.contador}>Pergunta {Math.min(st.feitas + (st.feito ? 0 : 1), RODADA)} de {RODADA}</Text>}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 16 }}>
        <Text testID="enunciado" style={s.enunciado}>
          {st.rodada.enunciado}
        </Text>
      </ScrollView>
      <View style={{ gap: 12 }}>
        {st.rodada.opcoes.map((o, i) => {
          const certa = i === st.rodada.certa;
          const marcada = st.feito?.escolha === i;
          const borda = st.feito ? (certa ? c.verde : marcada ? c.vermelho : c.borda) : c.borda;
          const fundo = st.feito ? (certa ? c.verdeClaro : marcada ? c.vermelhoClaro : c.fundo) : c.fundo;
          return (
            <Pressable
              key={i}
              testID={`opcao-${i}`}
              onPress={() => escolher(st, i as 0 | 1)}
              style={({ pressed }) => [s.opcao, { borderColor: borda, backgroundColor: fundo, marginTop: pressed ? 2 : 0, borderBottomWidth: pressed ? 2 : 4 }]}
            >
              <Text style={s.opcaoTexto}>{o}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[s.retorno, { color: st.feito?.certo ? c.verde : c.vermelho }]}>
        {st.feito ? (st.feito.certo ? `+${st.feito.ganho}` : st.feito.escolha === null ? 'Tempo esgotado' : 'Era a outra') : ' '}
      </Text>
    </TelaJogo>
  );
}

const useEstilos = criarEstilos((c) => ({
  intro: { fontSize: 15, color: c.textoSuave, lineHeight: 21, marginBottom: 18 },
  recordeRotulo: { fontSize: 15, fontWeight: '700', color: c.textoSuave },
  recordeValor: { fontSize: 15, fontWeight: '800', color: c.texto },
  contador: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginTop: 6 },
  enunciado: { fontSize: 18, fontWeight: '700', color: c.texto, lineHeight: 26 },
  opcao: { borderWidth: 2, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16 },
  opcaoTexto: { fontSize: 16, fontWeight: '700', color: c.texto },
  retorno: { fontSize: 18, fontWeight: '800', textAlign: 'center', marginTop: 12, minHeight: 24 },
}));
