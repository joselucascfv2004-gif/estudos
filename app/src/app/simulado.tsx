import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NOMES_NIVEL, Questao, XP_POR_NIVEL, disciplinasDaProva, getDisciplina, getQuestao, getTopico, podeEmbaralhar } from '../data/banco';
import { embaralhar, hoje } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import { MINUTOS_POR_QUESTAO, concluirLicao, montarProvaOficial, montarSimulado, montarSimuladoFormato } from '../estado/progresso';
import { Botao, Cabecalho, Cartao, Chip } from '../ui/componentes';
import { ComIcone, Icone } from '../ui/Icone';
import { AcoesQuestao } from '../ui/salvar';
import { getProva, questoesDoFormato } from '../data/provas';
import { coresNivel, criarEstilos, useCores } from '../ui/tema';
import { TextoAlternativa, TextoQuestao, temImagem } from '../ui/Imagens';
import { TextoRico, Trechos } from '../ui/Markdown';

const LETRAS = 'ABCDE';
const TAMANHOS = [10, 20, 30, 45];

type Item = { q: Questao; ordem: number[]; bloco?: string };
/** Critério de aprovação, nos simulados no formato do exame oficial. */
type Regra = { acertosMinimos?: number; minimoPorParte?: number; texto: string };
type Prova = { itens: Item[]; titulo: string; segundosTotais: number; regra?: Regra };
type Resultado = { prova: Prova; respostas: (number | null)[]; segundos: number; xp: number };

const formatarTempo = (seg: number) => {
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = seg % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const formatarMinutos = (minutos: number) =>
  minutos >= 60 ? `${Math.floor(minutos / 60)}h${minutos % 60 ? ` ${minutos % 60}min` : ''}` : `${minutos} min`;

export default function Simulado() {
  const [prova, setProva] = useState<Prova | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  if (resultado) return <TelaResultado r={resultado} />;
  if (prova) return <TelaProva prova={prova} terminar={setResultado} />;
  return <TelaConfig comecar={setProva} />;
}

function TelaConfig({ comecar }: { comecar: (p: Prova) => void }) {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const [disciplina, setDisciplina] = useState<string | undefined>(undefined);
  const [tamanho, setTamanho] = useState(20);
  const [oficial, setOficial] = useState<string | null>(null);
  // provas oficiais do ENEM: um tópico por ano e área (ex.: "ENEM 2019 — Matemática")
  const provasOficiais = (disciplinasDaProva(p.prova, p.lingua).find((d) => d.id === 'enem-oficial')?.topicos ?? []).map((t) => {
    const [, ano, area] = t.titulo.match(/(\d{4})\s*—\s*(.+)$/) ?? [];
    return { id: t.id, ano: ano ?? '', area: area ?? t.titulo };
  });
  const anos = [...new Set(provasOficiais.map((x) => x.ano))].sort().reverse();
  const [ano, setAno] = useState<string | null>(null);
  const anoAtivo = ano ?? anos[0];
  const disciplinas = disciplinasDaProva(p.prova, p.lingua);
  const provaAlvo = getProva(p.prova);
  // "CPA (antiga CPA-10)" vira "CPA" nos botões
  const nomeProva = provaAlvo.nome.replace(/\s*\(.*\)$/, '');
  const formatos = provaAlvo.formatos ?? [];
  const minutos = tamanho * MINUTOS_POR_QUESTAO;
  const ultimos = [...p.simulados].reverse().slice(0, 5);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Simulado" icone="timer-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.texto}>
          Como na prova de verdade: questões misturadas, tempo marcando e o gabarito só no final. Você pode pular e voltar nas questões.
        </Text>

        <Text style={s.secao}>Conteúdo</Text>
        <View style={s.chips}>
          <Chip texto={`Tudo (${nomeProva})`} ativo={!disciplina} onPress={() => setDisciplina(undefined)} />
          {disciplinas.map((d) => (
            <Chip key={d.id} texto={d.nome} icone={d.icone} ativo={disciplina === d.id} onPress={() => setDisciplina(d.id)} />
          ))}
        </View>

        <Text style={s.secao}>Número de questões</Text>
        <View style={s.chips}>
          {TAMANHOS.map((n) => (
            <Chip key={n} texto={`${n}`} ativo={tamanho === n} cor={c.roxo} onPress={() => setTamanho(n)} />
          ))}
        </View>

        <Cartao estilo={{ backgroundColor: c.amareloClaro, borderColor: c.amarelo }}>
          <ComIcone icone="timer-sand" cor={c.laranja} estiloTexto={s.cartaoTitulo}>
            Tempo: {formatarMinutos(minutos)}
          </ComIcone>
          <Text style={s.texto}>
            {MINUTOS_POR_QUESTAO} minutos por questão, que é a média do ENEM. Quando o tempo acabar, o simulado é entregue automaticamente.
          </Text>
        </Cartao>

        <Botao
          testID="btn-comecar-simulado"
          titulo="Começar simulado"
          cor={c.roxo}
          onPress={() => {
            const qs = montarSimulado(p, tamanho, disciplina);
            if (!qs.length) return;
            comecar({
              itens: qs.map((q) => ({ q, ordem: podeEmbaralhar(q) ? embaralhar(q.a.map((_, i) => i)) : q.a.map((_, i) => i) })),
              titulo: disciplina ? getDisciplina(disciplina)?.nome ?? 'Simulado' : `Simulado ${nomeProva}`,
              segundosTotais: qs.length * MINUTOS_POR_QUESTAO * 60,
            });
          }}
        />

        {formatos.length > 0 && <Text style={s.secao}>Ou faça a prova no formato oficial</Text>}
        {formatos.map((formato, k) => {
          const total = questoesDoFormato(formato);
          const titulo = formato.nome ? `${nomeProva} — ${formato.nome}` : nomeProva;
          return (
            <View key={k} style={{ gap: 10 }}>
              <Cartao estilo={{ backgroundColor: c.azulClaro, borderColor: c.azul }}>
                <ComIcone icone="clipboard-check-outline" cor={c.azulEscuro} estiloTexto={s.cartaoTitulo}>
                  {formato.nome ? `${formato.nome}: ` : ''}
                  {total} questões · {formatarMinutos(formato.minutos)}
                </ComIcone>
                {formato.blocos.map((b) => (
                  <Text key={b.nome} style={s.texto}>
                    • {b.nome}: {b.questoes} {b.questoes === 1 ? 'questão' : 'questões'}
                  </Text>
                ))}
                <Text style={[s.texto, { marginTop: 6 }]}>{formato.regra}</Text>
              </Cartao>
              <Botao
                testID={`btn-simulado-formato-${k}`}
                titulo={`Fazer o simulado ${titulo}`}
                cor={c.azul}
                onPress={() => {
                  const blocos = montarSimuladoFormato(p, formato);
                  const itens = blocos.flatMap((b) =>
                    b.questoes.map((q) => ({ q, bloco: b.nome, ordem: podeEmbaralhar(q) ? embaralhar(q.a.map((_, i) => i)) : q.a.map((_, i) => i) })),
                  );
                  if (!itens.length) return;
                  comecar({
                    itens,
                    titulo: `Simulado oficial ${titulo}`,
                    segundosTotais: formato.minutos * 60,
                    regra: {
                      // se o banco não tiver questões suficientes, a nota mínima fica proporcional
                      acertosMinimos: formato.acertosMinimos != null ? Math.ceil((formato.acertosMinimos / total) * itens.length) : undefined,
                      minimoPorParte: formato.minimoPorParte,
                      texto: formato.regra,
                    },
                  });
                }}
              />
            </View>
          );
        })}

        {provasOficiais.length > 0 && (
          <>
            <Text style={s.secao}>Ou faça uma prova oficial do ENEM</Text>
            <Text style={s.texto}>As questões de um ano e de uma área, na ordem da prova (só as que não dependem de figuras).</Text>
            <View style={s.chips}>
              {anos.map((a) => (
                <Chip key={a} testID={`ano-${a}`} texto={a} ativo={anoAtivo === a} cor={c.azul} onPress={() => setAno(a)} />
              ))}
            </View>
            <View style={s.chips}>
              {provasOficiais
                .filter((x) => x.ano === anoAtivo)
                .map((x) => (
                  <Chip key={x.id} testID={`oficial-${x.id}`} texto={x.area} ativo={oficial === x.id} cor={c.azul} onPress={() => setOficial(x.id)} />
                ))}
            </View>
            <Botao
              testID="btn-prova-oficial"
              titulo={oficial ? `Fazer a prova (${montarProvaOficial(oficial).length} questões)` : 'Escolha a área'}
              cor={c.azul}
              desativado={!oficial || !provasOficiais.some((x) => x.id === oficial && x.ano === anoAtivo)}
              onPress={() => {
                const qs = montarProvaOficial(oficial!);
                if (!qs.length) return;
                comecar({
                  itens: qs.map((q) => ({ q, ordem: q.a.map((_, i) => i) })),
                  titulo: getTopico(oficial!)?.topico.titulo ?? 'Prova oficial',
                  segundosTotais: qs.length * MINUTOS_POR_QUESTAO * 60,
                });
              }}
            />
          </>
        )}

        {ultimos.length > 0 && (
          <>
            <Text style={s.secao}>Seus últimos simulados</Text>
            {ultimos.map((r, i) => (
              <View key={i} style={s.historico}>
                <Text style={s.historicoTitulo}>{r.titulo}</Text>
                <Text style={s.historicoInfo}>
                  {r.dia.split('-').reverse().join('/')} · {r.acertos}/{r.total} ({Math.round((r.acertos / r.total) * 100)}%) · {formatarTempo(r.segundos)}
                </Text>
              </View>
            ))}
          </>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function TelaProva({ prova, terminar }: { prova: Prova; terminar: (r: Resultado) => void }) {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [pos, setPos] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>(() => prova.itens.map(() => null));
  const [restante, setRestante] = useState(prova.segundosTotais);
  const [mapa, setMapa] = useState(false);
  const [confirmar, setConfirmar] = useState<'entregar' | 'sair' | null>(null);
  const rolagem = useRef<ScrollView>(null);
  const entregue = useRef(false);
  const estado = useRef({ respostas, restante });
  estado.current = { respostas, restante };

  function entregar() {
    if (entregue.current) return;
    entregue.current = true;
    const { respostas: resp, restante: rest } = estado.current;
    const lista = prova.itens.map((it, i) => ({ id: it.q.id, acertou: resp[i] === it.q.c }));
    const xp = prova.itens.reduce((soma, it, i) => soma + (resp[i] === it.q.c ? XP_POR_NIVEL[it.q.n] : 0), 0);
    const segundos = prova.segundosTotais - rest;
    const { p: novo } = concluirLicao(p, { modo: 'simulado', respostas: lista, xp, comboMax: 0 });
    const acertos = lista.filter((x) => x.acertou).length;
    novo.simulados = [...novo.simulados, { dia: hoje(), titulo: prova.titulo, acertos, total: lista.length, segundos }].slice(-50);
    atualizar(() => novo);
    terminar({ prova, respostas: resp, segundos, xp: novo.xpTotal - p.xpTotal });
  }

  useEffect(() => {
    const t = setInterval(() => setRestante((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (restante === 0) entregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restante]);
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      setConfirmar('sair');
      return true;
    });
    return () => sub.remove();
  }, []);

  const item = prova.itens[pos];
  const respondidas = respostas.filter((r) => r != null).length;
  const pouco = restante < 5 * 60;
  const ir = (i: number) => {
    setPos(i);
    setMapa(false);
    rolagem.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <View style={s.topo}>
        <Pressable testID="btn-sair-simulado" onPress={() => setConfirmar('sair')} hitSlop={12}>
          <Icone nome="close" tamanho={28} cor={c.cinza} />
        </Pressable>
        <ComIcone icone="timer-outline" cor={pouco ? c.vermelho : c.texto} estiloTexto={[s.relogio, pouco && { color: c.vermelho }]}>
          {formatarTempo(restante)}
        </ComIcone>
        <Pressable testID="btn-mapa" onPress={() => setMapa(true)} style={s.botaoMapa}>
          <ComIcone icone="view-grid-outline" cor={c.azulEscuro} tamanho={16} estilo={{ gap: 4 }} estiloTexto={s.botaoMapaTexto}>
            {pos + 1}/{prova.itens.length}
          </ComIcone>
        </Pressable>
      </View>

      <ScrollView ref={rolagem} contentContainerStyle={{ padding: 18 }}>
        <View style={s.etiquetas}>
          <Text style={[s.etiqueta, { backgroundColor: coresNivel[item.q.n].clara, color: coresNivel[item.q.n].escura }]}>{NOMES_NIVEL[item.q.n]}</Text>
          <Text style={s.etiquetaTopico} numberOfLines={1}>
            {getTopico(getQuestao(item.q.id)?.topicoId ?? '')?.topico.titulo}
          </Text>
        </View>
        <TextoQuestao texto={item.q.e} estilo={s.enunciado} />
        <View style={{ gap: 10, marginTop: 8 }}>
          {item.ordem.map((orig, i) => {
            const marcada = respostas[pos] === orig;
            return (
              <Pressable
                key={orig}
                testID={`alt-${i}`}
                onPress={() => setRespostas((r) => r.map((x, j) => (j === pos ? (x === orig ? null : orig) : x)))}
                style={[s.alt, marcada && s.altMarcada]}
              >
                <View style={[s.letra, { borderColor: marcada ? c.azulEscuro : c.textoSuave }]}>
                  <Text style={[s.letraTexto, { color: marcada ? c.azulEscuro : c.textoSuave }]}>{LETRAS[i]}</Text>
                </View>
                <TextoAlternativa texto={item.q.a[orig]} estilo={s.altTexto} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={s.rodape}>
        <Botao icone="chevron-left" titulo="Anterior" contorno cor={c.azul} desativado={pos === 0} onPress={() => ir(pos - 1)} estilo={{ flex: 1 }} pequeno />
        {pos + 1 < prova.itens.length ? (
          <Botao testID="btn-proxima" icone="chevron-right" titulo="Próxima" cor={c.azul} onPress={() => ir(pos + 1)} estilo={{ flex: 1 }} pequeno />
        ) : (
          <Botao testID="btn-entregar" titulo="Entregar" cor={c.verde} onPress={() => setConfirmar('entregar')} estilo={{ flex: 1 }} pequeno />
        )}
      </View>

      <Modal visible={mapa} transparent animationType="fade" onRequestClose={() => setMapa(false)}>
        <View style={s.modalFundo}>
          <View style={s.modal}>
            <Text style={s.modalTitulo}>Questões</Text>
            <Text style={s.texto}>
              {respondidas} de {prova.itens.length} respondidas. Toque em um número para ir até a questão.
            </Text>
            <View style={s.grade}>
              {prova.itens.map((_, i) => (
                <Pressable
                  key={i}
                  testID={`mapa-${i}`}
                  onPress={() => ir(i)}
                  style={[s.quadrado, respostas[i] != null && { backgroundColor: c.azul, borderColor: c.azulEscuro }, i === pos && { borderColor: c.texto }]}
                >
                  <Text style={[s.quadradoTexto, respostas[i] != null && { color: '#FFF' }]}>{i + 1}</Text>
                </Pressable>
              ))}
            </View>
            <Botao titulo="Entregar simulado" cor={c.verde} onPress={() => (setMapa(false), setConfirmar('entregar'))} />
            <Botao titulo="Voltar" contorno cor={c.azul} onPress={() => setMapa(false)} estilo={{ marginTop: 10 }} />
          </View>
        </View>
      </Modal>

      <Modal visible={confirmar != null} transparent animationType="fade" onRequestClose={() => setConfirmar(null)}>
        <View style={s.modalFundo}>
          <View style={s.modal}>
            {confirmar === 'entregar' ? (
              <>
                <Text style={s.modalTitulo}>Entregar o simulado?</Text>
                <Text style={s.texto}>
                  {respondidas < prova.itens.length
                    ? `Ainda faltam ${prova.itens.length - respondidas} questões sem resposta. Elas contam como erradas.`
                    : 'Você respondeu todas as questões. Boa!'}
                </Text>
                <Botao testID="btn-confirmar-entrega" titulo="Entregar" cor={c.verde} onPress={() => (setConfirmar(null), entregar())} />
              </>
            ) : (
              <>
                <Text style={s.modalTitulo}>Sair do simulado?</Text>
                <Text style={s.texto}>Se sair agora, as respostas deste simulado serão perdidas.</Text>
                <Botao titulo="Sair" contorno cor={c.vermelho} onPress={() => router.back()} />
              </>
            )}
            <Botao titulo="Continuar a prova" cor={c.azul} onPress={() => setConfirmar(null)} estilo={{ marginTop: 10 }} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function TelaResultado({ r }: { r: Resultado }) {
  const c = useCores();
  const s = useEstilos();
  const [aberta, setAberta] = useState<number | null>(null);
  const total = r.prova.itens.length;
  const acertos = r.prova.itens.filter((it, i) => r.respostas[i] === it.q.c).length;
  const pct = Math.round((acertos / total) * 100);
  const regra = r.prova.regra;

  const porDisciplina = new Map<string, [number, number]>();
  const porBloco = new Map<string, [number, number]>();
  r.prova.itens.forEach((it, i) => {
    if (it.bloco) {
      const [a, t] = porBloco.get(it.bloco) ?? [0, 0];
      porBloco.set(it.bloco, [a + (r.respostas[i] === it.q.c ? 1 : 0), t + 1]);
    }
    const disc = it.q.id.split('/')[0];
    const [a, t] = porDisciplina.get(disc) ?? [0, 0];
    porDisciplina.set(disc, [a + (r.respostas[i] === it.q.c ? 1 : 0), t + 1]);
  });
  const minimoParte = regra?.minimoPorParte;
  const partesAbaixo = minimoParte != null ? [...porBloco.entries()].filter(([, [a, t]]) => a < Math.ceil(t * minimoParte)).map(([nome]) => nome) : [];
  const aprovado = regra ? (regra.acertosMinimos == null || acertos >= regra.acertosMinimos) && partesAbaixo.length === 0 : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Resultado do simulado" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <View style={{ alignItems: 'center' }}>
          <Icone
            nome={pct >= 80 ? 'trophy' : pct >= 60 ? 'party-popper' : pct >= 40 ? 'arm-flex-outline' : 'book-open-variant'}
            tamanho={72}
            cor={pct >= 80 ? c.amarelo : pct >= 60 ? c.verde : c.azul}
          />
          <Text testID="resultado-pct" style={s.grande}>
            {pct}%
          </Text>
          <Text style={s.texto}>
            {acertos} de {total} questões certas · tempo: {formatarTempo(r.segundos)} · +{r.xp} XP
          </Text>
        </View>

        {aprovado != null && (
          <Cartao
            testID="resultado-aprovacao"
            estilo={{ backgroundColor: aprovado ? c.verdeClaro : c.vermelhoClaro, borderColor: aprovado ? c.verde : c.vermelho }}
          >
            <ComIcone icone={aprovado ? 'check-decagram' : 'alert-circle-outline'} cor={aprovado ? c.verdeEscuro : c.vermelhoEscuro} estiloTexto={s.cartaoTitulo}>
              {aprovado ? 'Aprovado!' : 'Ainda não foi desta vez'}
            </ComIcone>
            {regra?.acertosMinimos != null && (
              <Text style={s.texto}>
                {acertos >= regra.acertosMinimos
                  ? `Você fez ${acertos} acertos, e o mínimo para passar é ${regra.acertosMinimos}.`
                  : `O mínimo para passar é ${regra.acertosMinimos} acertos. Faltaram ${regra.acertosMinimos - acertos}.`}
              </Text>
            )}
            {partesAbaixo.length > 0 && <Text style={s.texto}>Abaixo do mínimo em: {partesAbaixo.join(', ')}.</Text>}
            <Text style={[s.texto, { marginTop: 4 }]}>{regra?.texto}</Text>
          </Cartao>
        )}

        {porBloco.size > 0 && (
          <Cartao>
            <Text style={s.cartaoTitulo}>Por parte da prova</Text>
            {[...porBloco.entries()].map(([nome, [a, t]]) => (
              <View key={nome} style={s.linhaDisc}>
                <Text style={[s.textoForte, { flex: 1 }]}>{nome}</Text>
                <Text style={[s.textoForte, { color: a >= Math.ceil(t * (minimoParte ?? 0.7)) ? c.verdeEscuro : c.vermelhoEscuro }]}>
                  {a}/{t} · nota {((a / t) * 10).toFixed(1).replace('.', ',')}
                </Text>
              </View>
            ))}
          </Cartao>
        )}

        {porBloco.size === 0 && porDisciplina.size > 1 && (
          <Cartao>
            <Text style={s.cartaoTitulo}>Por disciplina</Text>
            {[...porDisciplina.entries()].map(([disc, [a, t]]) => {
              const d = getDisciplina(disc);
              return (
                <View key={disc} style={s.linhaDisc}>
                  <ComIcone icone={d?.icone ?? 'book-outline'} cor={d?.cor} estiloTexto={s.textoForte}>
                    {d?.nome}
                  </ComIcone>
                  <Text style={[s.textoForte, { color: a / t >= 0.7 ? c.verdeEscuro : c.vermelhoEscuro }]}>
                    {a}/{t}
                  </Text>
                </View>
              );
            })}
          </Cartao>
        )}

        <Text style={s.secao}>Correção</Text>
        <Text style={s.texto}>As questões erradas já foram para a sua revisão. Toque em uma questão para ver a explicação.</Text>
        {r.prova.itens.map((it, i) => {
          const certa = r.respostas[i] === it.q.c;
          const marcada = r.respostas[i];
          const aberto = aberta === i;
          return (
            <Cartao key={it.q.id} estilo={{ borderColor: certa ? c.verde : c.vermelho }}>
              <Pressable onPress={() => setAberta(aberto ? null : i)}>
                <ComIcone icone={certa ? 'check-circle' : 'close-circle'} cor={certa ? c.verdeEscuro : c.vermelhoEscuro} estiloTexto={s.textoForte}>
                  Questão {i + 1}
                  {marcada == null ? ' · em branco' : ''}
                </ComIcone>
                <TextoQuestao texto={it.q.e} estilo={s.enunciadoPequeno} linhas={aberto ? undefined : 3} />
                {aberto && (
                  <View style={{ gap: 6, marginTop: 8 }}>
                    {it.q.a.map((alt, j) => (
                      <View key={j} style={{ gap: 4 }}>
                        <Text style={[s.altCorrecao, j === it.q.c && { color: c.verdeEscuro, fontWeight: '800' }, j === marcada && j !== it.q.c && { color: c.vermelhoEscuro }]}>
                          {LETRAS[j]}) {temImagem(alt) ? '' : <Trechos texto={alt} />}
                          {j === it.q.c ? '  (correta)' : j === marcada ? '  (sua resposta)' : ''}
                        </Text>
                        {temImagem(alt) && <TextoAlternativa texto={alt} estilo={s.altCorrecao} />}
                      </View>
                    ))}
                    <TextoRico texto={it.q.x} estilo={s.explicacao} />
                  </View>
                )}
              </Pressable>
              {aberto && <AcoesQuestao id={it.q.id} claro />}
            </Cartao>
          );
        })}
        <Botao testID="btn-fim-simulado" titulo="Concluir" onPress={() => router.back()} />
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  texto: { fontSize: 15, color: c.textoSuave, lineHeight: 21, fontWeight: '600' },
  textoForte: { fontSize: 15, color: c.texto, fontWeight: '800' },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 },
  cartaoTitulo: { fontSize: 17, fontWeight: '800', color: c.texto, marginBottom: 6 },
  historico: { borderBottomWidth: 1, borderBottomColor: c.borda, paddingVertical: 8 },
  historicoTitulo: { fontSize: 15, fontWeight: '800', color: c.texto },
  historicoInfo: { fontSize: 13, color: c.textoSuave, fontWeight: '600', marginTop: 2 },
  topo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: c.borda },
  relogio: { fontSize: 20, fontWeight: '800', color: c.texto, fontVariant: ['tabular-nums'] },
  botaoMapa: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 2, borderColor: c.borda },
  botaoMapaTexto: { fontSize: 15, fontWeight: '800', color: c.texto },
  etiquetas: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  etiqueta: { fontSize: 12, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, overflow: 'hidden', flexShrink: 0 },
  etiquetaTopico: { flexShrink: 1, fontSize: 13, fontWeight: '700', color: c.textoSuave },
  enunciado: { fontSize: 17, lineHeight: 25, color: c.texto, fontWeight: '600', marginBottom: 10 },
  enunciadoPequeno: { fontSize: 14, lineHeight: 20, color: c.texto, marginTop: 4 },
  alt: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 2, borderBottomWidth: 4, borderColor: c.borda, backgroundColor: c.fundo },
  altMarcada: { borderColor: c.azul, backgroundColor: c.azulClaro },
  letra: { width: 30, height: 30, borderRadius: 8, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  letraTexto: { fontWeight: '800', fontSize: 14 },
  altTexto: { flex: 1, fontSize: 16, color: c.texto, lineHeight: 22 },
  rodape: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: 2, borderTopColor: c.borda },
  modalFundo: { flex: 1, backgroundColor: c.veu, justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: c.fundo, borderRadius: 22, padding: 20, gap: 10 },
  modalTitulo: { fontSize: 21, fontWeight: '800', color: c.texto },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 },
  quadrado: { width: 42, height: 42, borderRadius: 10, borderWidth: 2, borderColor: c.borda, alignItems: 'center', justifyContent: 'center' },
  quadradoTexto: { fontSize: 15, fontWeight: '800', color: c.texto },
  grande: { fontSize: 48, fontWeight: '800', color: c.texto },
  linhaDisc: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  altCorrecao: { fontSize: 14, color: c.texto, lineHeight: 20 },
  explicacao: { fontSize: 14, color: c.textoSuave, lineHeight: 20, marginTop: 6 },
}));
