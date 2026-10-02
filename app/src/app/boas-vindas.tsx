import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Trilha, totalQuestoes } from '../data/banco';
import { METAS, TRILHAS } from '../data/trilhas';
import { configurarLembrete, lembretesDisponiveis } from '../estado/lembretes';
import { useProgresso } from '../estado/ProgressoContext';
import { Barra, Botao } from '../ui/componentes';
import { cores } from '../ui/tema';

export default function BoasVindas() {
  const { atualizar } = useProgresso();
  const [passo, setPasso] = useState(0);
  const [nome, setNome] = useState('');
  const [trilha, setTrilha] = useState<Trilha>('ENEM');
  const [meta, setMeta] = useState(200);
  const ultimoPasso = lembretesDisponiveis() ? 3 : 2;

  async function concluir(lembrete: boolean) {
    let ativo = false;
    if (lembrete) ativo = await configurarLembrete(true, 19, 0);
    atualizar((p) => ({ ...p, onboarding: true, nome: nome.trim(), trilha, metaDiaria: meta, lembrete: { ativo, hora: 19, minuto: 0 } }));
    router.replace('/');
  }

  return (
    <SafeAreaView style={s.tela}>
      <View style={s.topo}>
        {passo > 0 ? (
          <Pressable onPress={() => setPasso(passo - 1)} hitSlop={12}>
            <Text style={s.voltar}>←</Text>
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
            <Text style={s.mascote}>🎯</Text>
            <Text style={s.titulo}>Bem-vindo(a) ao Estudos!</Text>
            <Text style={s.texto}>
              Questões rápidas todos os dias, XP, ofensiva e conquistas para transformar o estudo em hábito. São {totalQuestoes.toLocaleString('pt-BR')} questões de
              ENEM, vestibulares militares e concursos.
            </Text>
            <Text style={s.rotulo}>Como podemos te chamar?</Text>
            <TextInput testID="input-nome" value={nome} onChangeText={setNome} placeholder="Seu nome (opcional)" style={s.input} placeholderTextColor={cores.cinza} maxLength={30} />
          </>
        )}

        {passo === 1 && (
          <>
            <Text style={s.titulo}>Qual é o seu objetivo?</Text>
            <Text style={s.texto}>Você pode mudar quando quiser.</Text>
            {TRILHAS.map((t) => (
              <Opcao key={t.id} ativo={trilha === t.id} onPress={() => setTrilha(t.id)} emoji={t.emoji} titulo={t.rotulo === 'Tudo' ? 'Um pouco de tudo' : t.rotulo} sub={t.descricao} />
            ))}
          </>
        )}

        {passo === 2 && (
          <>
            <Text style={s.titulo}>Qual será sua meta diária?</Text>
            <Text style={s.texto}>Constância vale mais que intensidade: comece com algo que você consegue cumprir todo dia.</Text>
            {METAS.map((m) => (
              <Opcao key={m.xp} ativo={meta === m.xp} onPress={() => setMeta(m.xp)} emoji="⚡" titulo={`${m.nome} · ${m.xp} XP`} sub={m.descricao} />
            ))}
          </>
        )}

        {passo === 3 && (
          <>
            <Text style={s.mascote}>⏰</Text>
            <Text style={s.titulo}>Quer um lembrete diário?</Text>
            <Text style={s.texto}>Um aviso às 19h para você não perder a ofensiva. Dá para mudar o horário no Perfil.</Text>
          </>
        )}
      </ScrollView>

      <View style={s.rodape}>
        {passo < ultimoPasso ? (
          <Botao testID="btn-proximo" titulo="Continuar" onPress={() => setPasso(passo + 1)} />
        ) : passo === 3 ? (
          <>
            <Botao titulo="Ativar lembrete" onPress={() => concluir(true)} />
            <Botao titulo="Agora não" contorno cor={cores.azul} onPress={() => concluir(false)} estilo={{ marginTop: 10 }} />
          </>
        ) : (
          <Botao testID="btn-comecar" titulo="Começar a estudar" onPress={() => concluir(false)} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Opcao({ ativo, onPress, emoji, titulo, sub }: { ativo: boolean; onPress: () => void; emoji: string; titulo: string; sub: string }) {
  return (
    <Pressable onPress={onPress} style={[s.opcao, ativo && { borderColor: cores.azul, backgroundColor: cores.azulClaro }]}>
      <Text style={{ fontSize: 30 }}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[s.opcaoTitulo, ativo && { color: cores.azulEscuro }]}>{titulo}</Text>
        <Text style={s.opcaoSub}>{sub}</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  topo: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  voltar: { fontSize: 26, color: cores.cinza, fontWeight: '800' },
  corpo: { padding: 22, gap: 12 },
  mascote: { fontSize: 90, textAlign: 'center', marginVertical: 10 },
  titulo: { fontSize: 26, fontWeight: '800', color: cores.texto, textAlign: 'center' },
  texto: { fontSize: 16, color: cores.textoSuave, textAlign: 'center', lineHeight: 23, marginBottom: 6 },
  rotulo: { fontSize: 15, fontWeight: '800', color: cores.texto, marginTop: 14 },
  input: { borderWidth: 2, borderColor: cores.borda, borderRadius: 14, padding: 14, fontSize: 17, backgroundColor: cores.fundoSuave, color: cores.texto },
  opcao: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, borderWidth: 2, borderBottomWidth: 4, borderColor: cores.borda },
  opcaoTitulo: { fontSize: 17, fontWeight: '800', color: cores.texto },
  opcaoSub: { fontSize: 13, color: cores.textoSuave, fontWeight: '600', marginTop: 2 },
  rodape: { padding: 16, borderTopWidth: 2, borderTopColor: cores.borda },
});
