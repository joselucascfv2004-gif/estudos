import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NOMES_NIVEL, Nivel, Questao, getQuestao, getTopico, podeEmbaralhar } from '../data/banco';
import { embaralhar } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import {
  BONUS_PERFEITA,
  EventosLicao,
  Modo,
  Resposta,
  concluirLicao,
  montarDesafio,
  montarLicaoTopico,
  montarPontosFracos,
  montarRevisao,
  montarSalvas,
  montarTreino,
  nivelDoUsuario,
  xpDaResposta,
} from '../estado/progresso';
import { Barra, Botao } from '../ui/componentes';
import { ComIcone, Icone } from '../ui/Icone';
import { AcoesQuestao } from '../ui/salvar';
import { coresNivel, criarEstilos, useCores } from '../ui/tema';
import { TextoAlternativa, TextoQuestao } from '../ui/Imagens';

const ELOGIOS = ['Muito bem!', 'Excelente!', 'Mandou bem!', 'Isso aí!', 'Perfeito!', 'Arrasou!'];
const LETRAS = 'ABCDE';

function vibrar(tipo: 'ok' | 'erro') {
  if (Platform.OS === 'web') return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const H = require('expo-haptics') as typeof import('expo-haptics');
    H.notificationAsync(tipo === 'ok' ? H.NotificationFeedbackType.Success : H.NotificationFeedbackType.Error).catch(() => {});
  } catch {
    // sem vibração
  }
}

type Item = { q: Questao; ordem: number[] };

function prepararItem(q: Questao): Item {
  const indices = q.a.map((_, i) => i);
  // embaralha as alternativas (exceto certo/errado e provas oficiais)
  return { q, ordem: podeEmbaralhar(q) ? embaralhar(indices) : indices };
}

export default function Licao() {
  const c = useCores();
  const s = useEstilos();
  const params = useLocalSearchParams<{ modo?: Modo; topico?: string; nivel?: string; disciplina?: string }>();
  const modo: Modo = params.modo ?? 'treino';
  const nivelParam = params.nivel != null ? (Number(params.nivel) as Nivel) : undefined;
  const { p, atualizar } = useProgresso();

  const inicial = useMemo(() => {
    let qs: Questao[] = [];
    if (modo === 'topico' && params.topico && nivelParam != null) qs = montarLicaoTopico(p, params.topico, nivelParam);
    else if (modo === 'desafio') qs = montarDesafio(p);
    else if (modo === 'revisao') qs = montarRevisao(p);
    else if (modo === 'fracos') qs = montarPontosFracos(p, params.topico);
    else if (modo === 'salvas') qs = montarSalvas(p);
    else qs = montarTreino(p, params.disciplina);
    return qs.map((q) => prepararItem(q));
    // a lição é montada uma única vez ao abrir
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fila = inicial;
  const [pos, setPos] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [verificado, setVerificado] = useState(false);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboMax, setComboMax] = useState(0);
  const [elogio, setElogio] = useState(ELOGIOS[0]);
  const [sair, setSair] = useState(false);
  const [fim, setFim] = useState<{ ev: EventosLicao; xp: number } | null>(null);
  const respostas = useRef(new Map<string, boolean>());
  const rolagem = useRef<ScrollView>(null);

  const titulo =
    modo === 'topico' && params.topico
      ? getTopico(params.topico)?.topico.titulo ?? 'Lição'
      : modo === 'desafio'
        ? 'Desafio do dia'
        : modo === 'revisao'
          ? 'Revisão'
          : modo === 'fracos'
            ? 'Pontos fracos'
            : modo === 'salvas'
              ? 'Questões salvas'
              : 'Treino';

  if (!inicial.length) {
    return (
      <SafeAreaView style={[s.tela, s.centro]}>
        <Icone nome={modo === 'revisao' ? 'check-all' : 'inbox-outline'} tamanho={72} cor={modo === 'revisao' ? c.verde : c.cinza} />
        <Text style={s.fimTitulo}>{modo === 'revisao' ? 'Nada para revisar hoje!' : 'Sem questões aqui'}</Text>
        <Text style={s.fimSub}>
          {modo === 'revisao'
            ? 'As questões que você responde hoje voltam para revisão daqui a alguns dias. Volte amanhã!'
            : modo === 'fracos'
              ? 'Você ainda não tem pontos fracos. Continue estudando que o app vai acompanhando o seu desempenho.'
              : 'Não encontramos questões para esta seleção.'}
        </Text>
        <Botao titulo="Voltar" onPress={() => router.back()} estilo={{ alignSelf: 'stretch', margin: 24 }} />
      </SafeAreaView>
    );
  }

  if (fim) return <Resultado fim={fim} />;

  const item = fila[pos];
  const { q } = item;
  const corretaExibida = item.ordem.indexOf(q.c);
  const acertou = verificado && escolha === corretaExibida;
  const respondidasUnicas = respostas.current.size;
  const progresso = (respondidasUnicas + (verificado && !respostas.current.has(q.id) ? 1 : 0)) / inicial.length;
  const info = getQuestao(q.id);
  const topico = info ? getTopico(info.topicoId)?.topico : undefined;

  function verificar() {
    if (escolha == null) return;
    const ok = escolha === corretaExibida;
    setVerificado(true);
    vibrar(ok ? 'ok' : 'erro');
    const primeira = !respostas.current.has(q.id);
    if (primeira) respostas.current.set(q.id, ok);
    if (ok) {
      const novoCombo = combo + 1;
      setCombo(novoCombo);
      setComboMax((m) => Math.max(m, novoCombo));
      setXp((v) => v + xpDaResposta(q, novoCombo, modo));
      setElogio(ELOGIOS[Math.floor(Math.random() * ELOGIOS.length)]);
    } else {
      // a questão errada não volta agora: fica guardada para a revisão de daqui a alguns dias
      setCombo(0);
    }
  }

  function continuar() {
    if (pos + 1 < fila.length) {
      setPos(pos + 1);
      setEscolha(null);
      setVerificado(false);
      rolagem.current?.scrollTo({ y: 0, animated: false });
      return;
    }
    const lista: Resposta[] = [...respostas.current.entries()].map(([id, a]) => ({ id, acertou: a }));
    const { p: novo, ev } = concluirLicao(p, { modo, topicoId: params.topico, nivel: nivelParam, respostas: lista, xp, comboMax });
    atualizar(() => novo);
    const ganho = novo.xpTotal - p.xpTotal;
    setFim({ ev, xp: ganho });
  }

  const nivelCor = coresNivel[q.n];

  return (
    <SafeAreaView style={s.tela}>
      <View style={s.topo}>
        <Pressable testID="btn-sair" onPress={() => setSair(true)} hitSlop={12}>
          <Icone nome="close" tamanho={28} cor={c.cinza} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Barra valor={progresso} altura={16} />
        </View>
        {combo >= 2 && (
          <ComIcone icone="fire" cor={c.laranja} tamanho={20} estilo={{ gap: 2 }} estiloTexto={s.combo}>
            {combo}
          </ComIcone>
        )}
      </View>

      <ScrollView ref={rolagem} contentContainerStyle={s.corpo}>
        <View style={s.etiquetas}>
          <Text style={[s.etiqueta, { backgroundColor: nivelCor.clara, color: nivelCor.escura }]}>{NOMES_NIVEL[q.n]}</Text>
          <Text style={s.etiquetaTopico} numberOfLines={1}>
            {modo === 'topico' ? titulo : (topico?.titulo ?? titulo)}
          </Text>
        </View>
        <TextoQuestao texto={q.e} estilo={s.enunciado} />
        <View style={{ gap: 10, marginTop: 8 }}>
          {item.ordem.map((orig, i) => {
            const marcada = escolha === i;
            let estilo = s.alt;
            let corLetra = c.textoSuave;
            if (verificado && i === corretaExibida) {
              estilo = { ...s.alt, ...s.altCerta };
              corLetra = c.verdeEscuro;
            } else if (verificado && marcada) {
              estilo = { ...s.alt, ...s.altErrada };
              corLetra = c.vermelhoEscuro;
            } else if (marcada) {
              estilo = { ...s.alt, ...s.altMarcada };
              corLetra = c.azulEscuro;
            }
            return (
              <Pressable key={orig} testID={`alt-${i}`} disabled={verificado} onPress={() => setEscolha(i)} style={estilo}>
                <View style={[s.letra, { borderColor: corLetra }]}>
                  <Text style={[s.letraTexto, { color: corLetra }]}>{LETRAS[i]}</Text>
                </View>
                <TextoAlternativa texto={q.a[orig]} estilo={s.altTexto} />
              </Pressable>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

      {!verificado ? (
        <View style={s.rodape}>
          <Botao testID="btn-verificar" titulo="Verificar" desativado={escolha == null} onPress={verificar} />
        </View>
      ) : (
        <View style={[s.rodape, s.painel, { backgroundColor: acertou ? c.verdeClaro : c.vermelhoClaro }]}>
          <ComIcone
            icone={acertou ? 'check-circle' : 'close-circle'}
            cor={acertou ? c.verdeEscuro : c.vermelhoEscuro}
            tamanho={24}
            estiloTexto={[s.painelTitulo, { color: acertou ? c.verdeEscuro : c.vermelhoEscuro }]}
          >
            {acertou ? elogio : `Resposta correta: ${LETRAS[corretaExibida]}`}
            {acertou ? `  +${xpDaResposta(q, combo, modo)} XP` : ''}
          </ComIcone>
          <ScrollView style={{ maxHeight: 170 }}>
            <Text style={[s.explicacao, { color: acertou ? c.verdeEscuro : c.vermelhoEscuro }]}>{q.x}</Text>
            {q.f ? <Text style={s.fonte}>Fonte: {q.f}</Text> : null}
          </ScrollView>
          <AcoesQuestao id={q.id} />
          <Botao
            testID="btn-continuar"
            titulo="Continuar"
            cor={acertou ? c.verde : c.vermelho}
            onPress={continuar}
            estilo={{ marginTop: 12 }}
          />
        </View>
      )}

      <Modal visible={sair} transparent animationType="fade" onRequestClose={() => setSair(false)}>
        <View style={s.modalFundo}>
          <View style={s.modal}>
            <Icone nome="emoticon-sad-outline" tamanho={56} cor={c.textoSuave} estilo={{ textAlign: 'center' }} />
            <Text style={s.modalTitulo}>Espera, não vá embora!</Text>
            <Text style={s.modalTexto}>Se sair agora, você perde o XP desta lição.</Text>
            <Botao titulo="Continuar estudando" cor={c.azul} onPress={() => setSair(false)} />
            <Botao
              titulo="Sair da lição"
              contorno
              cor={c.vermelho}
              onPress={() => {
                setSair(false);
                router.back();
              }}
              estilo={{ marginTop: 10 }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Resultado({ fim }: { fim: { ev: EventosLicao; xp: number } }) {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const { ev } = fim;
  const pct = ev.total ? Math.round((ev.acertos / ev.total) * 100) : 0;
  const perfeita = ev.total > 0 && ev.acertos === ev.total;
  const erros = ev.total - ev.acertos;
  const destaques: { icone: string; texto: string }[] = [];
  if (ev.ofensivaAumentou) destaques.push({ icone: 'fire', texto: `Ofensiva de ${p.ofensiva.atual} dia${p.ofensiva.atual > 1 ? 's' : ''}!` });
  if (ev.metaBatidaAgora) destaques.push({ icone: 'target', texto: 'Meta diária batida! +10 moedas' });
  if (ev.bonusDesafio) destaques.push({ icone: 'sword-cross', texto: `Bônus do desafio: +${ev.bonusDesafio} XP` });
  if (perfeita) destaques.push({ icone: 'bullseye-arrow', texto: `Lição perfeita: +${BONUS_PERFEITA} XP` });
  if (ev.subiuDeNivel) destaques.push({ icone: 'star', texto: `Você subiu para o nível ${nivelDoUsuario(p.xpTotal).nivel}!` });
  if (ev.desbloqueouNivel != null) destaques.push({ icone: 'lock-open-variant-outline', texto: `Nível ${NOMES_NIVEL[ev.desbloqueouNivel]} desbloqueado!` });
  for (const cq of ev.novasConquistas) destaques.push({ icone: cq.icone, texto: `Conquista: ${cq.titulo}` });

  return (
    <SafeAreaView style={s.tela}>
      <ScrollView contentContainerStyle={[s.centro, { padding: 24, flexGrow: 1 }]}>
        <Icone
          nome={perfeita ? 'trophy' : pct >= 70 ? 'party-popper' : pct >= 40 ? 'arm-flex-outline' : 'book-open-variant'}
          tamanho={88}
          cor={perfeita ? c.amarelo : pct >= 70 ? c.verde : c.azul}
        />
        <Text style={s.fimTitulo}>{perfeita ? 'Perfeito!' : pct >= 70 ? 'Lição concluída!' : 'Continue praticando!'}</Text>
        <Text style={s.fimSub}>
          {pct >= 70 ? 'Você está mandando muito bem. ' : 'Errar faz parte. '}
          {erros
            ? `${erros === 1 ? 'A questão que você errou ficou guardada' : `As ${erros} questões que você errou ficaram guardadas`} e volta${erros === 1 ? '' : 'm'} na sua revisão daqui a alguns dias.`
            : 'O app vai trazer estas questões de volta nos próximos dias para fixar o conteúdo.'}
        </Text>
        <View style={s.caixas}>
          <Caixa titulo="XP" valor={`+${fim.xp}`} cor={c.amarelo} />
          <Caixa titulo="Acertos" valor={`${pct}%`} cor={c.verde} />
          <Caixa titulo="Moedas" valor={`+${ev.moedasGanhas}`} cor={c.azul} />
        </View>
        {destaques.map((d) => (
          <ComIcone key={d.texto} icone={d.icone} cor={c.laranja} estiloTexto={s.destaque} estilo={{ alignSelf: 'center' }}>
            {d.texto}
          </ComIcone>
        ))}
      </ScrollView>
      <View style={s.rodape}>
        <Botao testID="btn-fim" titulo="Continuar" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

function Caixa({ titulo, valor, cor }: { titulo: string; valor: string; cor: string }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={[s.caixa, { borderColor: cor }]}>
      <Text style={[s.caixaTitulo, { backgroundColor: cor }]}>{titulo}</Text>
      <Text style={[s.caixaValor, { color: cor }]}>{valor}</Text>
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  tela: { flex: 1, backgroundColor: c.fundo },
  centro: { alignItems: 'center', justifyContent: 'center' },
  topo: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 12 },
  combo: { fontSize: 16, fontWeight: '800', color: c.laranja },
  corpo: { padding: 18, paddingTop: 6 },
  etiquetas: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  etiqueta: { fontSize: 12, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, overflow: 'hidden', flexShrink: 0 },
  etiquetaTopico: { flexShrink: 1, fontSize: 13, fontWeight: '700', color: c.textoSuave },
  enunciado: { fontSize: 17, lineHeight: 25, color: c.texto, fontWeight: '600', marginBottom: 10 },
  alt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: c.borda,
    backgroundColor: c.fundo,
  },
  altMarcada: { borderColor: c.azul, backgroundColor: c.azulClaro },
  altCerta: { borderColor: c.verde, backgroundColor: c.verdeClaro },
  altErrada: { borderColor: c.vermelho, backgroundColor: c.vermelhoClaro },
  letra: { width: 30, height: 30, borderRadius: 8, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  letraTexto: { fontWeight: '800', fontSize: 14 },
  altTexto: { flex: 1, fontSize: 16, color: c.texto, lineHeight: 22 },
  rodape: { padding: 16, borderTopWidth: 2, borderTopColor: c.borda },
  painel: { borderTopWidth: 0 },
  painelTitulo: { fontSize: 19, fontWeight: '800', marginBottom: 6 },
  explicacao: { fontSize: 15, lineHeight: 21, fontWeight: '600' },
  fonte: { fontSize: 12, color: c.textoSuave, marginTop: 6, fontStyle: 'italic' },
  fimTitulo: { fontSize: 28, fontWeight: '800', color: c.texto, marginTop: 12, textAlign: 'center' },
  fimSub: { fontSize: 16, color: c.textoSuave, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  caixas: { flexDirection: 'row', gap: 10, marginVertical: 24 },
  caixa: { borderWidth: 2, borderRadius: 14, width: 96, overflow: 'hidden', alignItems: 'center' },
  caixaTitulo: { color: '#FFF', fontWeight: '800', fontSize: 12, width: '100%', textAlign: 'center', paddingVertical: 4 },
  caixaValor: { fontSize: 22, fontWeight: '800', paddingVertical: 10 },
  destaque: { fontSize: 16, fontWeight: '800', color: c.texto, marginBottom: 10, textAlign: 'center' },
  modalFundo: { flex: 1, backgroundColor: c.veu, justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: c.fundo, borderRadius: 22, padding: 22 },
  modalTitulo: { fontSize: 21, fontWeight: '800', textAlign: 'center', color: c.texto, marginTop: 6 },
  modalTexto: { fontSize: 15, color: c.textoSuave, textAlign: 'center', marginVertical: 14 },
}));
