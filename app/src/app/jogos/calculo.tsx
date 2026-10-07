import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import { hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import { registrarJogo } from '../../estado/progresso';
import { criarRng, Rng, sementeDoTexto } from '../../jogos/aleatorio';
import { Conta, gerarConta, multiplicador, NIVEIS_JOGO, NivelJogo, Operacao, OPERACOES, pontosAcerto, textoResposta } from '../../jogos/calculo';
import { Botao, Cartao } from '../../ui/componentes';
import { BarraTempo, Opcoes, Placar, Resultado, Teclado, TelaJogo, useAgora, vibrar } from '../../ui/jogos';
import { criarEstilos, useCores } from '../../ui/tema';

type Modo = 'relogio' | 'sobrevivencia' | 'dia' | 'treino';

const MODOS: { id: Modo; nome: string; detalhe: string }[] = [
  { id: 'relogio', nome: 'Contra o relógio', detalhe: '60 segundos, quantas conseguir' },
  { id: 'sobrevivencia', nome: 'Sobrevivência', detalhe: '3 vidas, o tempo diminui' },
  { id: 'dia', nome: 'Desafio do dia', detalhe: '20 contas, iguais para todos hoje' },
  { id: 'treino', nome: 'Treino livre', detalhe: 'sem tempo, mostra a resposta' },
];

const DURACAO_RELOGIO = 60;
const CONTAS_DIA = 20;
const COR = '#1CB0F6';
/** quanto tempo a resposta certa fica na tela depois de um erro */
const PAUSA_ERRO = 900;

/** Tempo para cada conta na sobrevivência: começa em 10–14 s e cai 0,3 s por acerto (mínimo 3 s). */
const limiteSobrevivencia = (nivel: NivelJogo, acertos: number) => Math.max(3, [10, 12, 14][nivel] - acertos * 0.3);

type Estado = {
  conta: Conta;
  digitado: string;
  pontos: number;
  sequencia: number;
  seqMax: number;
  acertos: number;
  erros: number;
  vidas: number;
  inicio: number;
  inicioConta: number;
  /** resposta certa mostrada depois de um erro, até `ate` */
  aviso: { texto: string; ate: number } | null;
  ganho: { texto: string; ate: number } | null;
  feitas: number;
};

export default function JogoCalculo() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [fase, setFase] = useState<'config' | 'jogo' | 'fim'>('config');
  const params = useLocalSearchParams<{ modo?: string }>();
  const [modo, setModo] = useState<Modo>(params.modo === 'dia' ? 'dia' : 'relogio');
  const [op, setOp] = useState<Operacao>('misto');
  const [nivel, setNivel] = useState<NivelJogo>(0);
  const [st, setSt] = useState<Estado | null>(null);
  const [fim, setFim] = useState<{ pontos: number; recorde: number; novo: boolean; xp: number; linhas: [string, string][] } | null>(null);
  const rng = useRef<Rng>(Math.random);
  const agora = useAgora(fase === 'jogo');

  const opAtual = modo === 'dia' ? 'misto' : op;
  const nivelAtual: NivelJogo = modo === 'dia' ? 1 : nivel;
  const chave = modo === 'dia' ? 'calculo:dia' : `calculo:${modo}:${op}:${nivel}`;
  const recordeAtual = p.jogos[chave]?.recorde ?? 0;

  function comecar() {
    rng.current = modo === 'dia' ? criarRng(sementeDoTexto('calculo:' + hoje())) : Math.random;
    const t = Date.now();
    setSt({
      conta: gerarConta(rng.current, opAtual, nivelAtual),
      digitado: '',
      pontos: 0,
      sequencia: 0,
      seqMax: 0,
      acertos: 0,
      erros: 0,
      vidas: 3,
      inicio: t,
      inicioConta: t,
      aviso: null,
      ganho: null,
      feitas: 0,
    });
    setFase('jogo');
  }

  function terminar(e: Estado) {
    const segundos = (Date.now() - e.inicio) / 1000;
    const xp = modo === 'treino' ? Math.floor(e.acertos / 2) : e.acertos;
    atualizar((prev) => {
      const novo = registrarJogo(prev, chave, e.pontos, xp).p;
      if (modo !== 'dia') return novo;
      // marca o desafio de hoje (chave fora do prefixo "calculo:" para não contar partida duas vezes)
      const k = `hoje:calculo:dia:${hoje()}`;
      const antes = novo.jogos[k];
      return { ...novo, jogos: { ...novo.jogos, [k]: { recorde: Math.max(antes?.recorde ?? 0, e.pontos), partidas: (antes?.partidas ?? 0) + 1 } } };
    });
    const total = e.acertos + e.erros;
    setFim({
      pontos: e.pontos,
      recorde: Math.max(recordeAtual, e.pontos),
      novo: e.pontos > recordeAtual && e.pontos > 0,
      xp: Math.min(30, xp),
      linhas: [
        ['Acertos', `${e.acertos} de ${total}`],
        ['Maior sequência', String(e.seqMax)],
        ['Tempo médio por conta', e.acertos ? `${(segundos / Math.max(1, total)).toFixed(1).replace('.', ',')} s` : '—'],
        ...(modo === 'dia' ? ([['Tempo total', `${Math.round(segundos)} s`]] as [string, string][]) : []),
      ],
    });
    setFase('fim');
  }

  /** Próxima conta (ou fim da partida). */
  function avancar(e: Estado): Estado | null {
    const feitas = e.feitas + 1;
    if (modo === 'dia' && feitas >= CONTAS_DIA) return null;
    if (modo === 'sobrevivencia' && e.vidas <= 0) return null;
    return { ...e, feitas, digitado: '', conta: gerarConta(rng.current, opAtual, nivelAtual, e.conta), inicioConta: Date.now() };
  }

  function responder(e: Estado, certo: boolean) {
    vibrar(certo);
    const t = Date.now();
    if (certo) {
      const ganho = pontosAcerto(nivelAtual, (t - e.inicioConta) / 1000, e.sequencia);
      const seq = e.sequencia + 1;
      const novo = avancar({ ...e, pontos: e.pontos + ganho, sequencia: seq, seqMax: Math.max(e.seqMax, seq), acertos: e.acertos + 1, ganho: { texto: `+${ganho}`, ate: t + 700 } });
      if (!novo) return terminar({ ...e, pontos: e.pontos + ganho, acertos: e.acertos + 1, seqMax: Math.max(e.seqMax, seq) });
      return setSt(novo);
    }
    const errado = { ...e, sequencia: 0, erros: e.erros + 1, vidas: modo === 'sobrevivencia' ? e.vidas - 1 : e.vidas, aviso: { texto: textoResposta(e.conta), ate: t + PAUSA_ERRO } };
    setSt(errado);
  }

  // Fim do aviso de erro: segue para a próxima conta.
  useEffect(() => {
    if (fase !== 'jogo' || !st?.aviso || agora < st.aviso.ate) return;
    // fora do contra o relógio, a pausa do aviso não conta no tempo total
    const proximo = avancar({ ...st, aviso: null, inicio: modo === 'relogio' ? st.inicio : st.inicio + PAUSA_ERRO });
    if (!proximo) terminar(st);
    else setSt(proximo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agora]);

  // Tempo esgotado (relógio) ou tempo da conta esgotado (sobrevivência).
  useEffect(() => {
    if (fase !== 'jogo' || !st || st.aviso) return;
    if (modo === 'relogio' && agora - st.inicio >= DURACAO_RELOGIO * 1000) terminar(st);
    else if (modo === 'sobrevivencia' && agora - st.inicioConta >= limiteSobrevivencia(nivelAtual, st.acertos) * 1000) responder(st, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agora]);

  function tecla(t: string) {
    if (!st || st.aviso) return;
    let d = st.digitado;
    if (t === '⌫') d = d.slice(0, -1);
    else if (t === '−') d = d.startsWith('−') ? d.slice(1) : '−' + d;
    else if (d.replace('−', '').length < 6) d = d + t;
    const certo = textoResposta(st.conta);
    if (d === certo) return responder({ ...st, digitado: d }, true);
    const digitos = (x: string) => x.replace('−', '').length;
    if (t !== '⌫' && t !== '−' && digitos(d) >= digitos(certo)) return responder({ ...st, digitado: d }, false);
    setSt({ ...st, digitado: d });
  }

  if (fase === 'config') {
    return (
      <TelaJogo titulo="Cálculo Relâmpago" icone="lightning-bolt">
        <Text style={s.intro}>Faça a conta de cabeça e digite o resultado. Quanto mais rápido, mais pontos. A cada 5 acertos seguidos, os pontos valem mais (até 3 vezes).</Text>
        <Opcoes titulo="Modo" prefixo="modo" opcoes={MODOS} valor={modo} onEscolher={setModo} cor={COR} />
        {modo !== 'dia' && (
          <>
            <Opcoes titulo="Contas" prefixo="op" opcoes={OPERACOES.map((o) => ({ id: o.id, nome: `${o.simbolo}  ${o.nome}` }))} valor={op} onEscolher={setOp} cor={COR} />
            <Opcoes titulo="Nível" prefixo="nivel" opcoes={NIVEIS_JOGO.map((nome, i) => ({ id: i as NivelJogo, nome }))} valor={nivel} onEscolher={setNivel} cor={COR} />
          </>
        )}
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
      <TelaJogo titulo="Cálculo Relâmpago" icone="lightning-bolt">
        <Resultado pontos={fim.pontos} recorde={fim.recorde} novoRecorde={fim.novo} xp={fim.xp} linhas={fim.linhas} cor={COR} onDeNovo={comecar} />
        <Botao titulo="Mudar modo ou nível" contorno pequeno cor={COR} estilo={{ marginTop: 12 }} onPress={() => setFase('config')} />
      </TelaJogo>
    );
  }

  if (!st) return null;
  const restante = modo === 'relogio' ? DURACAO_RELOGIO - (agora - st.inicio) / 1000 : undefined;
  const limite = modo === 'sobrevivencia' ? limiteSobrevivencia(nivelAtual, st.acertos) : 0;
  const fracao = modo === 'relogio' ? (restante ?? 0) / DURACAO_RELOGIO : modo === 'sobrevivencia' ? 1 - (st.aviso ? 0 : (agora - st.inicioConta) / 1000 / limite) : modo === 'dia' ? st.feitas / CONTAS_DIA : 1;
  const mostrandoErro = !!st.aviso;
  const ganhoVisivel = st.ganho && agora < st.ganho.ate;

  return (
    <TelaJogo titulo="Cálculo Relâmpago" icone="lightning-bolt" rolar={false}>
      <Placar pontos={st.pontos} sequencia={st.sequencia} mult={multiplicador(st.sequencia)} vidas={modo === 'sobrevivencia' ? st.vidas : undefined} tempo={restante !== undefined ? Math.max(0, restante) : modo === 'dia' ? (agora - st.inicio) / 1000 : undefined} />
      {modo !== 'treino' && <BarraTempo fracao={fracao} cor={COR} alerta={modo !== 'dia'} />}
      {modo === 'dia' && <Text style={s.contador}>Conta {Math.min(st.feitas + 1, CONTAS_DIA)} de {CONTAS_DIA}</Text>}
      <View style={s.centro}>
        <Text testID="conta" style={s.conta} adjustsFontSizeToFit numberOfLines={1}>
          {st.conta.texto}
        </Text>
        <View style={[s.visor, { borderColor: mostrandoErro ? c.vermelho : c.borda, backgroundColor: mostrandoErro ? c.vermelhoClaro : c.fundoSuave }]}>
          <Text testID="visor" style={[s.visorTexto, mostrandoErro && { color: c.vermelho }]}>
            {st.digitado || ' '}
          </Text>
        </View>
        <Text style={[s.dica, mostrandoErro && { color: c.vermelho }]}>{mostrandoErro ? `Resposta: ${st.aviso!.texto}` : ganhoVisivel ? st.ganho!.texto : ' '}</Text>
      </View>
      <Teclado onTecla={tecla} cor={COR} />
      {modo === 'treino' && <Botao testID="btn-encerrar" titulo="Encerrar treino" contorno pequeno cor={COR} estilo={{ marginTop: 12 }} onPress={() => terminar(st)} />}
    </TelaJogo>
  );
}

const useEstilos = criarEstilos((c) => ({
  intro: { fontSize: 15, color: c.textoSuave, lineHeight: 21, marginBottom: 18 },
  recordeRotulo: { fontSize: 15, fontWeight: '700', color: c.textoSuave },
  recordeValor: { fontSize: 15, fontWeight: '800', color: c.texto },
  contador: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginTop: 6 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  conta: { fontSize: 52, fontWeight: '900', color: c.texto, textAlign: 'center' },
  visor: { minWidth: 160, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 16, borderWidth: 2, alignItems: 'center' },
  visorTexto: { fontSize: 36, fontWeight: '800', color: c.texto },
  dica: { fontSize: 18, fontWeight: '800', color: c.verde, minHeight: 24 },
}));
