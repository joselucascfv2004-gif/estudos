import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LINGUAS, NOMES_NIVEL, Nivel, disciplinasDaProva, getTopico, totalQuestoes } from '../../data/banco';
import { METAS, getProva } from '../../data/provas';
import { configurarLembrete, lembretesDisponiveis } from '../../estado/lembretes';
import { diferencaDias, hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import { MAX_PROTETORES, PRECO_PROTETOR, PrefRevisao, comprarProtetor, nivelDoUsuario } from '../../estado/progresso';
import { Barra, Botao, Cartao, Chip } from '../../ui/componentes';
import { ComIcone, Icone } from '../../ui/Icone';
import { CartaoBackup } from '../../ui/Backup';
import { EscolhaLingua, EscolhaPrazo, EscolhaProva } from '../../ui/Objetivo';
import { criarEstilos, useCores } from '../../ui/tema';


export default function Perfil() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar, apagarTudo } = useProgresso();
  const [confirmar, setConfirmar] = useState(false);
  const [msg, setMsg] = useState('');
  // Prazo: as escolhas ficam num rascunho até o aluno tocar em "Salvar período"
  const [rascunhoData, setRascunhoData] = useState<string | null>(p.dataProva);
  const [dataTexto, setDataTexto] = useState(p.dataProva ? paraBr(p.dataProva) : '');
  const [rascunhoNome, setRascunhoNome] = useState(p.nomeProva);
  const [dataErro, setDataErro] = useState('');
  const [salvo, setSalvo] = useState('');
  const [linguaMsg, setLinguaMsg] = useState('');
  const [revisaoMsg, setRevisaoMsg] = useState('');
  // se o período mudar fora desta tela (ex.: progresso apagado), o rascunho acompanha
  useEffect(() => {
    setRascunhoData(p.dataProva);
    setDataTexto(p.dataProva ? paraBr(p.dataProva) : '');
    setRascunhoNome(p.nomeProva);
    setDataErro('');
  }, [p.dataProva, p.nomeProva]);
  const mudouPeriodo = rascunhoData !== p.dataProva || rascunhoNome.trim() !== p.nomeProva.trim();

  function escolherData(iso: string | null) {
    setRascunhoData(iso);
    setDataTexto(iso ? paraBr(iso) : '');
    setDataErro('');
    setSalvo('');
  }

  function digitarData(texto: string) {
    setDataTexto(texto);
    setSalvo('');
    if (!texto.trim()) {
      setRascunhoData(null);
      setDataErro('');
      return;
    }
    const iso = lerData(texto);
    if (typeof iso === 'object') {
      setDataErro(iso.erro);
      return;
    }
    setRascunhoData(iso);
    setDataErro('');
  }

  function salvarPeriodo() {
    if (dataErro) return;
    const nome = rascunhoNome.trim();
    atualizar((x) => ({ ...x, dataProva: rascunhoData, nomeProva: nome, planoDia: null }));
    setRascunhoNome(nome);
    setSalvo(
      rascunhoData
        ? `Período salvo! Prova em ${paraBr(rascunhoData)}, faltam ${diferencaDias(hoje(), rascunhoData)} dias. O plano de estudos da tela inicial já foi atualizado.`
        : 'Período salvo: sem prazo definido. O app sugere um assunto novo por dia, no seu ritmo.',
    );
  }

  function mudarPrefRevisao(muda: (pr: PrefRevisao) => PrefRevisao) {
    atualizar((x) => ({ ...x, prefRevisao: muda(x.prefRevisao) }));
    setRevisaoMsg('Preferências salvas. Valem para as próximas revisões.');
  }
  const alternar = (lista: string[], item: string) => (lista.includes(item) ? lista.filter((x) => x !== item) : [...lista, item]);
  const materiasDaProva = disciplinasDaProva(p.prova, p.lingua);
  const pref = p.prefRevisao;
  const n = nivelDoUsuario(p.xpTotal);
  const est = Object.values(p.questoes);
  const acertos = est.reduce((s, q) => s + q.acertos, 0);
  const respostas = acertos + est.reduce((s, q) => s + q.erros, 0);
  const dominadas = est.filter((q) => q.acertos > 0).length;

  async function mudarLembrete(ativo: boolean, hora = p.lembrete.hora, minuto = p.lembrete.minuto) {
    atualizar((x) => ({ ...x, lembrete: { ativo, hora, minuto } }));
    const ok = await configurarLembrete(ativo, hora, minuto, { ...p, lembrete: { ativo, hora, minuto } });
    if (ativo && !ok) {
      setMsg('Não foi possível ativar o lembrete. Verifique a permissão de notificações do app.');
      atualizar((x) => ({ ...x, lembrete: { ...x.lembrete, ativo: false } }));
    } else setMsg(ativo ? `Lembrete diário às ${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')} ativado.` : '');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <View style={s.cabecalho}>
          <View style={s.avatar}>
            <Icone nome="school-outline" tamanho={44} cor={c.azul} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              value={p.nome}
              placeholder="Seu nome"
              onChangeText={(t) => atualizar((x) => ({ ...x, nome: t.slice(0, 30) }))}
              style={s.nome}
              placeholderTextColor={c.cinza}
            />
            <ComIcone icone="star" cor={c.amarelo} tamanho={16} estilo={{ gap: 4, marginBottom: 4 }} estiloTexto={s.nivel}>
              Nível {n.nivel}
            </ComIcone>
            <Barra valor={n.xpNoNivel / n.xpParaProximo} cor={c.amarelo} altura={10} />
            <Text style={s.mini}>
              {n.xpNoNivel}/{n.xpParaProximo} XP para o nível {n.nivel + 1}
            </Text>
          </View>
        </View>

        <View style={s.grade}>
          <Info icone="fire" cor={c.laranja} valor={p.ofensiva.atual} rotulo="Ofensiva atual" />
          <Info icone="trophy-outline" cor={c.amarelo} valor={p.ofensiva.recorde} rotulo="Recorde de ofensiva" />
          <Info icone="lightning-bolt" cor={c.amarelo} valor={p.xpTotal} rotulo="XP total" />
          <Info icone="book-check-outline" cor={c.azul} valor={p.totalLicoes} rotulo="Lições concluídas" />
          <Info icone="pencil-outline" cor={c.roxo} valor={respostas} rotulo="Respostas" />
          <Info icone="target" cor={c.verde} valor={respostas ? `${Math.round((acertos / respostas) * 100)}%` : '—'} rotulo="Taxa de acerto" />
        </View>
        <Text style={s.mini}>
          Você já dominou {dominadas} de {totalQuestoes} questões do app.
        </Text>

        <Cartao>
          <ComIcone icone="shield-outline" cor={c.azul} estiloTexto={s.secao}>
            Loja
          </ComIcone>
          <Text style={s.texto}>
            O protetor de ofensiva salva sua ofensiva se você ficar um dia sem estudar. Você tem {p.protetores}/{MAX_PROTETORES} protetores e {p.moedas} moedas.
          </Text>
          <Botao
            icone="diamond-stone"
            titulo={`Comprar protetor · ${PRECO_PROTETOR} moedas`}
            cor={c.azul}
            desativado={p.moedas < PRECO_PROTETOR || p.protetores >= MAX_PROTETORES}
            onPress={() => atualizar((x) => comprarProtetor(x) ?? x)}
          />
        </Cartao>

        <Cartao>
          <ComIcone icone="target" cor={c.verde} estiloTexto={s.secao}>
            Meta diária
          </ComIcone>
          <View style={s.chips}>
            {METAS.map((m) => (
              <Chip key={m.xp} texto={`${m.nome} · ${m.xp} XP`} ativo={p.metaDiaria === m.xp} cor={c.verde} onPress={() => atualizar((x) => ({ ...x, metaDiaria: m.xp }))} />
            ))}
          </View>
        </Cartao>

        <Cartao>
          <ComIcone icone="flag-checkered" cor={c.azul} estiloTexto={s.secao}>
            Meu objetivo
          </ComIcone>
          <Text style={s.texto}>Escolha a sua prova. O app mostra só as matérias que caem nela.</Text>
          <EscolhaProva valor={p.prova} lingua={p.lingua} onEscolher={(id) => atualizar((x) => ({ ...x, prova: id, planoDia: null }))} />
          <EscolhaLingua
            prova={p.prova}
            valor={p.lingua}
            onEscolher={(l) => {
              atualizar((x) => ({ ...x, lingua: l, planoDia: null }));
              setLinguaMsg(`Pronto! Agora só aparecem questões de ${LINGUAS.find((x) => x.id === l)?.nome}.`);
            }}
          />
          {!!linguaMsg && <Text style={s.mini}>{linguaMsg}</Text>}
        </Cartao>

        <Cartao>
          <ComIcone icone="calendar-clock" cor={c.laranja} estiloTexto={s.secao}>
            Prazo
          </ComIcone>
          <Text style={s.texto}>
            Em quanto tempo você quer estudar para {getProva(p.prova).nome}? O app conta os dias e monta um plano diário que passa pelos assuntos que
            mais caem primeiro. Escolha um prazo ou digite a data da prova.
          </Text>
          <View style={s.salvoAtual}>
            <Icone nome="content-save-outline" tamanho={18} cor={c.textoSuave} />
            <Text style={[s.mini, { marginTop: 0, flex: 1 }]}>
              {p.dataProva
                ? `Período salvo: até ${paraBr(p.dataProva)} (faltam ${diferencaDias(hoje(), p.dataProva)} dias)${p.nomeProva ? ` · ${p.nomeProva}` : ''}`
                : 'Período salvo: sem prazo definido'}
            </Text>
          </View>
          <EscolhaPrazo dataProva={rascunhoData} onEscolher={escolherData} />
          <View style={s.chips}>
            <Chip testID="prazo-nenhum" texto="Sem prazo" icone="infinity" ativo={!rascunhoData && !dataTexto} onPress={() => escolherData(null)} />
          </View>
          <TextInput
            testID="input-data-prova"
            value={dataTexto}
            placeholder="Data (DD/MM/AAAA)"
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            onChangeText={digitarData}
            style={s.campo}
            placeholderTextColor={c.cinza}
          />
          <TextInput
            testID="input-nome-prova"
            value={rascunhoNome}
            placeholder={`Nome na contagem regressiva (ex.: ${getProva(p.prova).nome} 2026)`}
            onChangeText={(t) => {
              setRascunhoNome(t.slice(0, 40));
              setSalvo('');
            }}
            style={s.campo}
            placeholderTextColor={c.cinza}
          />
          {!!dataErro && <Text style={[s.mini, { color: c.vermelho }]}>{dataErro}</Text>}
          {!dataErro && rascunhoData && mudouPeriodo && (
            <Text style={s.mini}>
              Novo prazo: {paraBr(rascunhoData)} (faltam {diferencaDias(hoje(), rascunhoData)} dias). Toque em Salvar período para confirmar.
            </Text>
          )}
          {!dataErro && !rascunhoData && mudouPeriodo && <Text style={s.mini}>Sem prazo. Toque em Salvar período para confirmar.</Text>}
          <Botao
            testID="btn-salvar-periodo"
            icone="content-save-outline"
            titulo="Salvar período"
            cor={c.laranja}
            desativado={!!dataErro || !mudouPeriodo}
            onPress={salvarPeriodo}
            estilo={{ marginTop: 12 }}
          />
          {!!salvo && (
            <View testID="periodo-salvo" style={s.confirmacao}>
              <Icone nome="check-circle" tamanho={22} cor={c.verdeEscuro} />
              <Text style={s.confirmacaoTexto}>{salvo}</Text>
            </View>
          )}
        </Cartao>

        <Cartao>
          <ComIcone icone="brain" cor={c.roxo} estiloTexto={s.secao}>
            Minhas revisões
          </ComIcone>
          <Text style={s.texto}>
            As revisões caem em dias variados e misturam assuntos que você já estudou. Escolha o que você quer revisar com mais frequência até a sua prova:
            essas questões voltam antes e aparecem mais.
          </Text>
          <Text style={s.rotulo}>Nível que quero revisar mais</Text>
          <View style={s.chips}>
            <Chip testID="rev-nivel-todos" texto="Todos" cor={c.roxo} ativo={pref.nivel == null} onPress={() => mudarPrefRevisao((x) => ({ ...x, nivel: null }))} />
            {([0, 1, 2] as Nivel[]).map((n) => (
              <Chip
                key={n}
                testID={`rev-nivel-${n}`}
                texto={NOMES_NIVEL[n]}
                cor={c.roxo}
                ativo={pref.nivel === n}
                onPress={() => mudarPrefRevisao((x) => ({ ...x, nivel: n }))}
              />
            ))}
          </View>
          <Text style={s.rotulo}>Matérias que quero revisar mais</Text>
          <View style={s.chips}>
            {materiasDaProva.map((d) => (
              <Chip
                key={d.id}
                testID={`rev-materia-${d.id}`}
                texto={d.nome}
                icone={d.icone}
                cor={c.roxo}
                ativo={pref.disciplinas.includes(d.id)}
                onPress={() => mudarPrefRevisao((x) => ({ ...x, disciplinas: alternar(x.disciplinas, d.id) }))}
              />
            ))}
          </View>
          <Text style={s.rotulo}>Assuntos que quero revisar mais</Text>
          {pref.topicos.length ? (
            <View style={s.chips}>
              {pref.topicos.map((t) => (
                <Chip
                  key={t}
                  texto={`${getTopico(t)?.topico.titulo ?? t}  ✕`}
                  cor={c.roxo}
                  ativo
                  onPress={() => mudarPrefRevisao((x) => ({ ...x, topicos: x.topicos.filter((y) => y !== t) }))}
                />
              ))}
            </View>
          ) : (
            <Text style={s.mini}>Nenhum ainda. Para marcar, abra uma matéria na tela inicial, toque no assunto e escolha "Revisar mais este assunto".</Text>
          )}
          {!!revisaoMsg && <Text style={[s.mini, { color: c.verdeEscuro }]}>{revisaoMsg}</Text>}
        </Cartao>

        <Cartao>
          <View style={s.linha}>
            <View style={{ flex: 1 }}>
              <ComIcone icone="weather-night" cor={c.roxo} estiloTexto={s.secao}>
                Modo escuro
              </ComIcone>
              <Text style={s.mini}>Fundo escuro, mais confortável para estudar à noite.</Text>
            </View>
            <Switch
              testID="switch-escuro"
              value={p.tema === 'escuro'}
              onValueChange={(v) => atualizar((x) => ({ ...x, tema: v ? 'escuro' : 'claro' }))}
              trackColor={{ true: c.verde }}
            />
          </View>
        </Cartao>

        <Cartao>
          <ComIcone icone="bell-outline" cor={c.amarelo} estiloTexto={s.secao}>
            Lembrete diário
          </ComIcone>
          {lembretesDisponiveis() ? (
            <>
              <View style={s.linha}>
                <Text style={s.texto}>Me lembrar de estudar todo dia</Text>
                <Switch value={p.lembrete.ativo} onValueChange={(v) => mudarLembrete(v)} trackColor={{ true: c.verde }} />
              </View>
              <View style={s.linha}>
                <Text style={s.texto}>Horário</Text>
                <View style={s.hora}>
                  <Pressable onPress={() => mudarLembrete(p.lembrete.ativo, (p.lembrete.hora + 23) % 24)} hitSlop={8}>
                    <Icone nome="minus-circle-outline" tamanho={28} cor={c.azul} />
                  </Pressable>
                  <Text style={s.horaTexto}>{String(p.lembrete.hora).padStart(2, '0')}:00</Text>
                  <Pressable onPress={() => mudarLembrete(p.lembrete.ativo, (p.lembrete.hora + 1) % 24)} hitSlop={8}>
                    <Icone nome="plus-circle-outline" tamanho={28} cor={c.azul} />
                  </Pressable>
                </View>
              </View>
            </>
          ) : (
            <Text style={s.texto}>Disponível no aplicativo de celular.</Text>
          )}
          {!!msg && <Text style={s.mini}>{msg}</Text>}
        </Cartao>

        <Cartao>
          <View style={s.linha}>
            <View style={{ flex: 1 }}>
              <ComIcone icone="lock-open-variant-outline" cor={c.verde} estiloTexto={s.secao}>
                Liberar todos os níveis
              </ComIcone>
              <Text style={s.mini}>Para quem já domina o básico e quer ir direto ao difícil.</Text>
            </View>
            <Switch value={p.desbloquearTudo} onValueChange={(v) => atualizar((x) => ({ ...x, desbloquearTudo: v }))} trackColor={{ true: c.verde }} />
          </View>
        </Cartao>

        <CartaoBackup />

        <Botao titulo="Apagar meu progresso" contorno cor={c.vermelho} onPress={() => setConfirmar(true)} />
        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal visible={confirmar} transparent animationType="fade" onRequestClose={() => setConfirmar(false)}>
        <View style={s.modalFundo}>
          <View style={s.modal}>
            <Text style={s.secao}>Apagar todo o progresso?</Text>
            <Text style={[s.texto, { marginVertical: 12 }]}>XP, ofensiva, conquistas e histórico serão perdidos. Não dá para desfazer.</Text>
            <Botao titulo="Cancelar" cor={c.azul} onPress={() => setConfirmar(false)} />
            <Botao
              titulo="Apagar tudo"
              contorno
              cor={c.vermelho}
              estilo={{ marginTop: 10 }}
              onPress={async () => {
                setConfirmar(false);
                await configurarLembrete(false, 0, 0);
                await apagarTudo();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/** Lê uma data DD/MM/AAAA digitada; devolve a data no formato do app ou o motivo do erro. */
function lerData(texto: string): string | { erro: string } {
  const m = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return { erro: 'Digite no formato DD/MM/AAAA, por exemplo 08/11/2026.' };
  const [, d, mes, a] = m.map(Number);
  const data = new Date(a, mes - 1, d);
  if (data.getDate() !== d || data.getMonth() !== mes - 1) return { erro: 'Essa data não existe. Confira o dia e o mês.' };
  const iso = hoje(data);
  if (iso <= hoje()) return { erro: 'A data da prova precisa ser no futuro.' };
  return iso;
}

function paraBr(iso: string) {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

function Info({ icone, cor, valor, rotulo }: { icone: string; cor: string; valor: string | number; rotulo: string }) {
  const s = useEstilos();
  return (
    <Cartao estilo={s.info}>
      <Icone nome={icone} tamanho={24} cor={cor} />
      <View style={{ flex: 1 }}>
        <Text style={s.infoValor}>{valor}</Text>
        <Text style={s.infoRotulo}>{rotulo}</Text>
      </View>
    </Cartao>
  );
}

const useEstilos = criarEstilos((c) => ({
  campo: {
    borderWidth: 2,
    borderColor: c.borda,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '700',
    color: c.texto,
    backgroundColor: c.fundoSuave,
    marginTop: 10,
  },
  cabecalho: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: c.azulClaro, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: c.azul },
  nome: { fontSize: 22, fontWeight: '800', color: c.texto, paddingVertical: 2 },
  nivel: { fontSize: 15, fontWeight: '800', color: c.amarelo },
  mini: { fontSize: 12, color: c.textoSuave, fontWeight: '600', marginTop: 4 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  info: { width: '48.5%', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  infoValor: { fontSize: 18, fontWeight: '800', color: c.texto },
  infoRotulo: { fontSize: 11, color: c.textoSuave, fontWeight: '700' },
  secao: { fontSize: 17, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20, marginVertical: 8, flexShrink: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginTop: 10 },
  rotulo: { fontSize: 14, fontWeight: '800', color: c.texto, marginTop: 12 },
  salvoAtual: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 12, backgroundColor: c.fundoSuave },
  confirmacao: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12, padding: 12, borderRadius: 14, backgroundColor: c.verdeClaro },
  confirmacaoTexto: { flex: 1, fontSize: 14, fontWeight: '700', color: c.verdeEscuro, lineHeight: 20 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  hora: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  horaTexto: { fontSize: 18, fontWeight: '800', color: c.texto },
  modalFundo: { flex: 1, backgroundColor: c.veu, justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: c.fundo, borderRadius: 22, padding: 22 },
}));
