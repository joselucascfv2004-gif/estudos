import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Lingua, totalQuestoes } from '../data/banco';
import { METAS, getProva } from '../data/provas';
import { configurarLembrete, lembretesDisponiveis } from '../estado/lembretes';
import { useProgresso } from '../estado/ProgressoContext';
import { Barra, Botao } from '../ui/componentes';
import { Icone } from '../ui/Icone';
import { EscolhaLingua, EscolhaPrazo, EscolhaProva, LinhaOpcao } from '../ui/Objetivo';
import { criarEstilos, useCores } from '../ui/tema';

export default function BoasVindas() {
  const c = useCores();
  const s = useEstilos();
  const { atualizar } = useProgresso();
  const [passo, setPasso] = useState(0);
  const [nome, setNome] = useState('');
  const [prova, setProva] = useState('enem');
  const [lingua, setLingua] = useState<Lingua>('ingles');
  const [dataProva, setDataProva] = useState<string | null>(null);
  const [meta, setMeta] = useState(200);
  const ultimoPasso = lembretesDisponiveis() ? 4 : 3;

  async function concluir(lembrete: boolean) {
    let ativo = false;
    if (lembrete) ativo = await configurarLembrete(true, 19, 0);
    atualizar((p) => ({ ...p, onboarding: true, nome: nome.trim(), prova, lingua, dataProva, planoDia: null, metaDiaria: meta, lembrete: { ativo, hora: 19, minuto: 0 } }));
    router.replace('/');
  }

  return (
    <SafeAreaView style={s.tela}>
      <View style={s.topo}>
        {passo > 0 ? (
          <Pressable onPress={() => setPasso(passo - 1)} hitSlop={12}>
            <Icone nome="arrow-left" tamanho={26} cor={c.cinza} />
          </Pressable>
        ) : (
          <View style={{ width: 20 }} />
        )}
        <View style={{ flex: 1 }}>
          <Barra valor={(passo + 1) / (ultimoPasso + 1)} />
        </View>
      </View>

      <ScrollView contentContainerStyle={s.corpo}>
        {passo === 0 && (
          <>
            <Icone nome="school-outline" tamanho={96} cor={c.azul} estilo={s.mascote} />
            <Text style={s.titulo}>Bem-vindo(a) ao Estudos!</Text>
            <Text style={s.texto}>
              Questões rápidas todos os dias, XP, ofensiva e conquistas para transformar o estudo em hábito. São {totalQuestoes.toLocaleString('pt-BR')} questões de
              ENEM, vestibulares militares e concursos.
            </Text>
            <Text style={s.rotulo}>Como podemos te chamar?</Text>
            <TextInput testID="input-nome" value={nome} onChangeText={setNome} placeholder="Seu nome (opcional)" style={s.input} placeholderTextColor={c.cinza} maxLength={30} />
          </>
        )}

        {passo === 1 && (
          <>
            <Text style={s.titulo}>Para qual prova você vai estudar?</Text>
            <Text style={s.texto}>O app mostra só as matérias que caem nela. Você pode mudar quando quiser.</Text>
            <EscolhaProva valor={prova} onEscolher={setProva} lingua={lingua} />
            <EscolhaLingua prova={prova} valor={lingua} onEscolher={setLingua} />
          </>
        )}

        {passo === 2 && (
          <>
            <Icone nome="calendar-clock" tamanho={80} cor={c.laranja} estilo={s.mascote} />
            <Text style={s.titulo}>Qual é o seu prazo?</Text>
            <Text style={s.texto}>
              O app monta um plano diário para você ver o máximo de assuntos de {getProva(prova).nome} nesse tempo, começando pelos que mais caem.
            </Text>
            <EscolhaPrazo dataProva={dataProva} onEscolher={setDataProva} />
            <LinhaOpcao icone="infinity" titulo="Sem prazo definido" sub="Um assunto novo por dia, no seu ritmo" ativo={!dataProva} onPress={() => setDataProva(null)} />
          </>
        )}

        {passo === 3 && (
          <>
            <Text style={s.titulo}>Qual será sua meta diária?</Text>
            <Text style={s.texto}>Constância vale mais que intensidade: comece com algo que você consegue cumprir todo dia.</Text>
            {METAS.map((m) => (
              <LinhaOpcao key={m.xp} ativo={meta === m.xp} onPress={() => setMeta(m.xp)} icone="lightning-bolt" titulo={`${m.nome} · ${m.xp} XP`} sub={m.descricao} />
            ))}
          </>
        )}

        {passo === 4 && (
          <>
            <Icone nome="bell-ring-outline" tamanho={80} cor={c.amarelo} estilo={s.mascote} />
            <Text style={s.titulo}>Quer um lembrete diário?</Text>
            <Text style={s.texto}>Um aviso às 19h para você não perder a ofensiva. Dá para mudar o horário no Perfil.</Text>
          </>
        )}
      </ScrollView>

      <View style={s.rodape}>
        {passo < ultimoPasso ? (
          <Botao testID="btn-proximo" titulo="Continuar" onPress={() => setPasso(passo + 1)} />
        ) : passo === 4 ? (
          <>
            <Botao titulo="Ativar lembrete" onPress={() => concluir(true)} />
            <Botao titulo="Agora não" contorno cor={c.azul} onPress={() => concluir(false)} estilo={{ marginTop: 10 }} />
          </>
        ) : (
          <Botao testID="btn-comecar" titulo="Começar a estudar" onPress={() => concluir(false)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  tela: { flex: 1, backgroundColor: c.fundo },
  topo: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  corpo: { padding: 22, gap: 12 },
  mascote: { textAlign: 'center', marginVertical: 10 },
  titulo: { fontSize: 26, fontWeight: '800', color: c.texto, textAlign: 'center' },
  texto: { fontSize: 16, color: c.textoSuave, textAlign: 'center', lineHeight: 23, marginBottom: 6 },
  rotulo: { fontSize: 15, fontWeight: '800', color: c.texto, marginTop: 14 },
  input: { borderWidth: 2, borderColor: c.borda, borderRadius: 14, padding: 14, fontSize: 17, backgroundColor: c.fundoSuave, color: c.texto },
  rodape: { padding: 16, borderTopWidth: 2, borderTopColor: c.borda },
}));
