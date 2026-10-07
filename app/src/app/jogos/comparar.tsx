import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useProgresso } from '../../estado/ProgressoContext';
import { registrarJogo } from '../../estado/progresso';
import { multiplicador } from '../../jogos/calculo';
import { Escolha, gerarPar, Par, respostaCerta, valorTexto } from '../../jogos/comparar';
import { Botao, Cartao } from '../../ui/componentes';
import { BarraTempo, Opcoes, Placar, Resultado, TelaJogo, useAgora, vibrar } from '../../ui/jogos';
import { criarEstilos, useCores } from '../../ui/tema';

type Modo = 'relogio' | 'sobrevivencia';
const MODOS: { id: Modo; nome: string; detalhe: string }[] = [
  { id: 'relogio', nome: 'Contra o relógio', detalhe: '60 segundos' },
  { id: 'sobrevivencia', nome: 'Sobrevivência', detalhe: '3 vidas, o tempo diminui' },
];
const COR = '#FF9600';
const DURACAO = 60;
const PAUSA = 900;
const limite = (acertos: number) => Math.max(2.5, 7 - acertos * 0.15);
/** a dificuldade sobe a cada 6 acertos */
const etapa = (acertos: number) => Math.min(3, Math.floor(acertos / 6));

type Estado = {
  par: Par;
  pontos: number;
  sequencia: number;
  seqMax: number;
  acertos: number;
  erros: number;
  vidas: number;
  inicio: number;
  inicioPar: number;
  /** escolha feita no par atual, mostrada até `ate` */
  feito: { escolha: Escolha | null; certo: boolean; ate: number; ganho: number } | null;
};

export default function JogoComparar() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [fase, setFase] = useState<'config' | 'jogo' | 'fim'>('config');
  const [modo, setModo] = useState<Modo>('relogio');
  const [st, setSt] = useState<Estado | null>(null);
  const [fim, setFim] = useState<{ pontos: number; recorde: number; novo: boolean; xp: number; linhas: [string, string][] } | null>(null);
  const agora = useAgora(fase === 'jogo');
  const chave = `comparar:${modo}`;
  const recordeAtual = p.jogos[chave]?.recorde ?? 0;

  function comecar() {
    const t = Date.now();
    setSt({ par: gerarPar(Math.random, 0), pontos: 0, sequencia: 0, seqMax: 0, acertos: 0, erros: 0, vidas: 3, inicio: t, inicioPar: t, feito: null });
    setFase('jogo');
  }

  function terminar(e: Estado) {
    atualizar((prev) => registrarJogo(prev, chave, e.pontos, e.acertos).p);
    setFim({
      pontos: e.pontos,
      recorde: Math.max(recordeAtual, e.pontos),
      novo: e.pontos > recordeAtual && e.pontos > 0,
      xp: Math.min(30, e.acertos),
      linhas: [
        ['Acertos', `${e.acertos} de ${e.acertos + e.erros}`],
        ['Maior sequência', String(e.seqMax)],
      ],
    });
    setFase('fim');
  }

  function escolher(e: Estado, escolha: Escolha | null) {
    if (e.feito) return;
    const certo = escolha !== null && escolha === respostaCerta(e.par);
    vibrar(certo);
    const segundos = (Date.now() - e.inicioPar) / 1000;
    const ganho = certo ? Math.round((10 + Math.max(0, Math.round(10 - segundos * 3))) * multiplicador(e.sequencia)) : 0;
    const seq = certo ? e.sequencia + 1 : 0;
    setSt({
      ...e,
      pontos: e.pontos + ganho,
      sequencia: seq,
      seqMax: Math.max(e.seqMax, seq),
      acertos: e.acertos + (certo ? 1 : 0),
      erros: e.erros + (certo ? 0 : 1),
      vidas: modo === 'sobrevivencia' && !certo ? e.vidas - 1 : e.vidas,
      feito: { escolha, certo, ate: Date.now() + (certo ? 450 : PAUSA), ganho },
    });
  }

  useEffect(() => {
    if (fase !== 'jogo' || !st) return;
    if (st.feito) {
      if (agora < st.feito.ate) return;
      if (modo === 'sobrevivencia' && st.vidas <= 0) return terminar(st);
      setSt({ ...st, feito: null, par: gerarPar(Math.random, etapa(st.acertos)), inicioPar: Date.now() });
      return;
    }
    if (modo === 'relogio' && agora - st.inicio >= DURACAO * 1000) terminar(st);
    else if (modo === 'sobrevivencia' && agora - st.inicioPar >= limite(st.acertos) * 1000) escolher(st, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agora]);

  if (fase === 'config') {
    return (
      <TelaJogo titulo="Qual é maior?" icone="scale-unbalanced">
        <Text style={s.intro}>
          Aparecem duas expressões: toque na que vale mais. Se valerem o mesmo, toque em “iguais”. Tem potência, fração, porcentagem, raiz, número negativo e decimal, e fica mais difícil
          conforme você acerta.
        </Text>
        <Opcoes titulo="Modo" prefixo="modo" opcoes={MODOS} valor={modo} onEscolher={setModo} cor={COR} />
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
      <TelaJogo titulo="Qual é maior?" icone="scale-unbalanced">
        <Resultado pontos={fim.pontos} recorde={fim.recorde} novoRecorde={fim.novo} xp={fim.xp} linhas={fim.linhas} cor={COR} onDeNovo={comecar} />
        <Botao titulo="Mudar modo" contorno pequeno cor={COR} estilo={{ marginTop: 12 }} onPress={() => setFase('config')} />
      </TelaJogo>
    );
  }

  if (!st) return null;
  const restante = modo === 'relogio' ? DURACAO - (agora - st.inicio) / 1000 : undefined;
  const fracao = modo === 'relogio' ? (restante ?? 0) / DURACAO : st.feito ? 0 : 1 - (agora - st.inicioPar) / 1000 / limite(st.acertos);
  const certa = respostaCerta(st.par);

  const lado = (qual: 0 | 1) => {
    const ex = qual === 0 ? st.par.esq : st.par.dir;
    const marcado = st.feito?.escolha === qual;
    const ehCerta = certa === qual;
    const cor = st.feito ? (ehCerta ? c.verde : marcado ? c.vermelho : c.borda) : c.borda;
    return (
      <Pressable testID={`lado-${qual}`} onPress={() => escolher(st, qual)} style={({ pressed }) => [s.lado, { borderColor: cor, marginTop: pressed ? 2 : 0, borderBottomWidth: pressed ? 3 : 5 }]}>
        <Text style={s.expressao} adjustsFontSizeToFit numberOfLines={1}>
          {ex.texto}
        </Text>
        {st.feito && <Text style={[s.valor, { color: ehCerta ? c.verde : c.textoSuave }]}>= {valorTexto(ex.valor)}</Text>}
      </Pressable>
    );
  };

  return (
    <TelaJogo titulo="Qual é maior?" icone="scale-unbalanced" rolar={false}>
      <Placar pontos={st.pontos} sequencia={st.sequencia} mult={multiplicador(st.sequencia)} vidas={modo === 'sobrevivencia' ? st.vidas : undefined} tempo={restante !== undefined ? Math.max(0, restante) : undefined} />
      <BarraTempo fracao={fracao} cor={COR} />
      <Text style={s.pergunta}>Qual vale mais?</Text>
      <View style={s.lados}>
        {lado(0)}
        {lado(1)}
      </View>
      <Pressable
        testID="lado-iguais"
        onPress={() => escolher(st, 2)}
        style={[s.iguais, { borderColor: st.feito ? (certa === 2 ? c.verde : st.feito.escolha === 2 ? c.vermelho : c.borda) : c.borda }]}
      >
        <Text style={s.iguaisTexto}>= iguais</Text>
      </Pressable>
      <Text style={[s.retorno, { color: st.feito?.certo ? c.verde : c.vermelho }]}>
        {st.feito ? (st.feito.certo ? `+${st.feito.ganho}` : st.feito.escolha === null ? 'Tempo esgotado' : 'Não foi dessa vez') : ' '}
      </Text>
    </TelaJogo>
  );
}

const useEstilos = criarEstilos((c) => ({
  intro: { fontSize: 15, color: c.textoSuave, lineHeight: 21, marginBottom: 18 },
  recordeRotulo: { fontSize: 15, fontWeight: '700', color: c.textoSuave },
  recordeValor: { fontSize: 15, fontWeight: '800', color: c.texto },
  pergunta: { fontSize: 20, fontWeight: '800', color: c.texto, textAlign: 'center', marginTop: 28, marginBottom: 18 },
  lados: { flexDirection: 'row', gap: 12 },
  lado: { flex: 1, height: 150, borderRadius: 20, borderWidth: 3, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, backgroundColor: c.fundo },
  expressao: { fontSize: 32, fontWeight: '900', color: c.texto },
  valor: { fontSize: 15, fontWeight: '800', marginTop: 6 },
  iguais: { marginTop: 14, alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 16, borderWidth: 3, borderBottomWidth: 5, backgroundColor: c.fundo },
  iguaisTexto: { fontSize: 18, fontWeight: '800', color: c.texto },
  retorno: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginTop: 18 },
}));
