import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useProgresso } from '../../estado/ProgressoContext';
import { registrarJogo } from '../../estado/progresso';
import { Carta, montarCartas, pontosMemoria, TEMAS_MEMORIA } from '../../jogos/memoria';
import { Botao, Cartao } from '../../ui/componentes';
import { Icone } from '../../ui/Icone';
import { Opcoes, Placar, Resultado, TelaJogo, useAgora, vibrar } from '../../ui/jogos';
import { criarEstilos, useCores } from '../../ui/tema';

const TAMANHOS = [
  { id: 6, nome: '6 pares', detalhe: '12 cartas' },
  { id: 8, nome: '8 pares', detalhe: '16 cartas' },
];

type Estado = {
  cartas: Carta[];
  viradas: number[];
  achadas: Set<number>;
  jogadas: number;
  inicio: number;
  /** par errado aberto até `ate` */
  esconderEm: number | null;
};

export default function JogoMemoria() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [fase, setFase] = useState<'config' | 'jogo' | 'fim'>('config');
  const [temaId, setTemaId] = useState(TEMAS_MEMORIA[0].id);
  const [pares, setPares] = useState(6);
  const [st, setSt] = useState<Estado | null>(null);
  const [fim, setFim] = useState<{ pontos: number; recorde: number; novo: boolean; xp: number; linhas: [string, string][] } | null>(null);
  const agora = useAgora(fase === 'jogo');
  const tema = TEMAS_MEMORIA.find((t) => t.id === temaId)!;
  const chave = `memoria:${temaId}:${pares}`;
  const recordeAtual = p.jogos[chave]?.recorde ?? 0;

  function comecar() {
    setSt({ cartas: montarCartas(Math.random, tema, pares), viradas: [], achadas: new Set(), jogadas: 0, inicio: Date.now(), esconderEm: null });
    setFase('jogo');
  }

  function terminar(e: Estado) {
    const segundos = (Date.now() - e.inicio) / 1000;
    const pontos = pontosMemoria(pares, e.jogadas, segundos);
    const xp = pares === 8 ? 15 : 10;
    atualizar((prev) => registrarJogo(prev, chave, pontos, xp).p);
    setFim({
      pontos,
      recorde: Math.max(recordeAtual, pontos),
      novo: pontos > recordeAtual,
      xp,
      linhas: [
        ['Jogadas', `${e.jogadas} (mínimo ${pares})`],
        ['Tempo', `${Math.round(segundos)} s`],
      ],
    });
    setFase('fim');
  }

  function virar(id: number) {
    if (!st || st.esconderEm || st.achadas.has(st.cartas[id].par) || st.viradas.includes(id)) return;
    const viradas = [...st.viradas, id];
    if (viradas.length < 2) return setSt({ ...st, viradas });
    const [a, b] = viradas.map((i) => st.cartas[i]);
    const jogadas = st.jogadas + 1;
    if (a.par === b.par) {
      vibrar(true);
      const achadas = new Set(st.achadas).add(a.par);
      const novo = { ...st, viradas: [], achadas, jogadas };
      if (achadas.size === pares) return terminar(novo);
      return setSt(novo);
    }
    vibrar(false);
    setSt({ ...st, viradas, jogadas, esconderEm: Date.now() + 1000 });
  }

  useEffect(() => {
    if (st?.esconderEm && agora >= st.esconderEm) setSt({ ...st, viradas: [], esconderEm: null });
  }, [agora, st]);

  if (fase === 'config') {
    return (
      <TelaJogo titulo="Jogo da memória" icone="cards-outline">
        <Text style={s.intro}>Vire duas cartas por vez e encontre os pares: elemento e símbolo, obra e autor, fato e ano… Menos jogadas e menos tempo dão mais pontos.</Text>
        <Text style={s.titulo}>Tema</Text>
        <View style={{ gap: 8, marginBottom: 18 }}>
          {TEMAS_MEMORIA.map((t) => {
            const ativo = t.id === temaId;
            return (
              <Pressable key={t.id} testID={`tema-${t.id}`} onPress={() => setTemaId(t.id)} style={[s.tema, { borderColor: ativo ? t.cor : c.borda, backgroundColor: ativo ? t.cor + '1F' : c.fundo }]}>
                <Icone nome={t.icone} tamanho={22} cor={t.cor} />
                <Text style={s.temaTexto}>{t.nome}</Text>
                {ativo && <Icone nome="check-circle" tamanho={20} cor={t.cor} />}
              </Pressable>
            );
          })}
        </View>
        <Opcoes titulo="Tamanho" prefixo="pares" opcoes={TAMANHOS} valor={pares} onEscolher={setPares} cor={tema.cor} />
        <Cartao estilo={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={s.recordeRotulo}>Seu recorde neste tema</Text>
          <Text style={s.recordeValor}>{recordeAtual} pts</Text>
        </Cartao>
        <Botao testID="btn-comecar-jogo" titulo="Começar" cor={tema.cor} estilo={{ marginTop: 18 }} onPress={comecar} />
      </TelaJogo>
    );
  }

  if (fase === 'fim' && fim) {
    return (
      <TelaJogo titulo="Jogo da memória" icone="cards-outline">
        <Resultado pontos={fim.pontos} recorde={fim.recorde} novoRecorde={fim.novo} xp={fim.xp} linhas={fim.linhas} cor={tema.cor} onDeNovo={comecar} />
        <Botao titulo="Mudar tema" contorno pequeno cor={tema.cor} estilo={{ marginTop: 12 }} onPress={() => setFase('config')} />
      </TelaJogo>
    );
  }

  if (!st) return null;
  const colunas = pares === 8 ? 4 : 3;

  return (
    <TelaJogo titulo="Jogo da memória" icone="cards-outline" rolar={false}>
      <Placar tempo={(agora - st.inicio) / 1000} />
      <Text style={s.sub}>
        {tema.nome} · {st.achadas.size} de {pares} pares · {st.jogadas} {st.jogadas === 1 ? 'jogada' : 'jogadas'}
      </Text>
      <View style={s.grade}>
        {st.cartas.map((carta) => {
          const achada = st.achadas.has(carta.par);
          const aberta = achada || st.viradas.includes(carta.id);
          const erro = !!st.esconderEm && st.viradas.includes(carta.id);
          return (
            <Pressable
              key={carta.id}
              testID={`carta-${carta.id}`}
              onPress={() => virar(carta.id)}
              style={[
                s.carta,
                { width: `${100 / colunas - 2.5}%` as const },
                aberta
                  ? { backgroundColor: achada ? c.verdeClaro : erro ? c.vermelhoClaro : carta.lado ? tema.cor + '22' : c.fundo, borderColor: achada ? c.verde : erro ? c.vermelho : tema.cor }
                  : { backgroundColor: tema.cor, borderColor: tema.cor },
              ]}
            >
              {aberta ? (
                <Text style={[s.cartaTexto, colunas === 4 && { fontSize: 12 }]} adjustsFontSizeToFit numberOfLines={5}>
                  {carta.texto}
                </Text>
              ) : (
                <Icone nome="help" tamanho={28} cor="#FFFFFF" />
              )}
            </Pressable>
          );
        })}
      </View>
    </TelaJogo>
  );
}

const useEstilos = criarEstilos((c) => ({
  intro: { fontSize: 15, color: c.textoSuave, lineHeight: 21, marginBottom: 18 },
  titulo: { fontSize: 15, fontWeight: '800', color: c.texto, marginBottom: 8 },
  tema: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 2, borderBottomWidth: 4, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11 },
  temaTexto: { flex: 1, fontSize: 15, fontWeight: '800', color: c.texto },
  recordeRotulo: { fontSize: 15, fontWeight: '700', color: c.textoSuave },
  recordeValor: { fontSize: 15, fontWeight: '800', color: c.texto },
  sub: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginBottom: 14 },
  grade: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'flex-start', rowGap: 10 },
  carta: { aspectRatio: 0.78, borderRadius: 14, borderWidth: 2, borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center', padding: 6 },
  cartaTexto: { fontSize: 14, fontWeight: '800', color: c.texto, textAlign: 'center' },
}));
