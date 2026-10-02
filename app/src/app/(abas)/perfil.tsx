import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { totalQuestoes } from '../../data/banco';
import { METAS, TRILHAS } from '../../data/trilhas';
import { configurarLembrete, lembretesDisponiveis } from '../../estado/lembretes';
import { useProgresso } from '../../estado/ProgressoContext';
import { MAX_PROTETORES, PRECO_PROTETOR, comprarProtetor, nivelDoUsuario } from '../../estado/progresso';
import { Barra, Botao, Cartao, Chip } from '../../ui/componentes';
import { cores } from '../../ui/tema';


export default function Perfil() {
  const { p, atualizar, apagarTudo } = useProgresso();
  const [confirmar, setConfirmar] = useState(false);
  const [msg, setMsg] = useState('');
  const n = nivelDoUsuario(p.xpTotal);
  const est = Object.values(p.questoes);
  const acertos = est.reduce((s, q) => s + q.acertos, 0);
  const respostas = acertos + est.reduce((s, q) => s + q.erros, 0);
  const dominadas = est.filter((q) => q.acertos > 0).length;

  async function mudarLembrete(ativo: boolean, hora = p.lembrete.hora, minuto = p.lembrete.minuto) {
    atualizar((x) => ({ ...x, lembrete: { ativo, hora, minuto } }));
    const ok = await configurarLembrete(ativo, hora, minuto);
    if (ativo && !ok) {
      setMsg('Não foi possível ativar o lembrete. Verifique a permissão de notificações do app.');
      atualizar((x) => ({ ...x, lembrete: { ...x.lembrete, ativo: false } }));
    } else setMsg(ativo ? `Lembrete diário às ${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')} ✅` : '');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <View style={s.cabecalho}>
          <View style={s.avatar}>
            <Text style={{ fontSize: 40 }}>🎓</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              value={p.nome}
              placeholder="Seu nome"
              onChangeText={(t) => atualizar((x) => ({ ...x, nome: t.slice(0, 30) }))}
              style={s.nome}
              placeholderTextColor={cores.cinza}
            />
            <Text style={s.nivel}>⭐ Nível {n.nivel}</Text>
            <Barra valor={n.xpNoNivel / n.xpParaProximo} cor={cores.amarelo} altura={10} />
            <Text style={s.mini}>
              {n.xpNoNivel}/{n.xpParaProximo} XP para o nível {n.nivel + 1}
            </Text>
          </View>
        </View>

        <View style={s.grade}>
          <Info emoji="🔥" valor={p.ofensiva.atual} rotulo="Ofensiva atual" />
          <Info emoji="🏅" valor={p.ofensiva.recorde} rotulo="Recorde de ofensiva" />
          <Info emoji="⚡" valor={p.xpTotal} rotulo="XP total" />
          <Info emoji="📘" valor={p.totalLicoes} rotulo="Lições concluídas" />
          <Info emoji="✏️" valor={respostas} rotulo="Respostas" />
          <Info emoji="🎯" valor={respostas ? `${Math.round((acertos / respostas) * 100)}%` : '—'} rotulo="Taxa de acerto" />
        </View>
        <Text style={s.mini}>
          Você já dominou {dominadas} de {totalQuestoes} questões do app.
        </Text>

        <Cartao>
          <Text style={s.secao}>🛡️ Loja</Text>
          <Text style={s.texto}>
            O protetor de ofensiva salva sua ofensiva se você ficar um dia sem estudar. Você tem {p.protetores}/{MAX_PROTETORES} e {p.moedas} 💎.
          </Text>
          <Botao
            titulo={`Comprar protetor · ${PRECO_PROTETOR} 💎`}
            cor={cores.azul}
            desativado={p.moedas < PRECO_PROTETOR || p.protetores >= MAX_PROTETORES}
            onPress={() => atualizar((x) => comprarProtetor(x) ?? x)}
          />
        </Cartao>

        <Cartao>
          <Text style={s.secao}>🎯 Meta diária</Text>
          <View style={s.chips}>
            {METAS.map((m) => (
              <Chip key={m.xp} texto={`${m.nome} · ${m.xp} XP`} ativo={p.metaDiaria === m.xp} cor={cores.verde} onPress={() => atualizar((x) => ({ ...x, metaDiaria: m.xp }))} />
            ))}
          </View>
          <Text style={[s.secao, { marginTop: 16 }]}>🧭 Trilha</Text>
          <View style={s.chips}>
            {TRILHAS.map((t) => (
              <Chip key={t.id} texto={`${t.emoji} ${t.rotulo}`} ativo={p.trilha === t.id} onPress={() => atualizar((x) => ({ ...x, trilha: t.id }))} />
            ))}
          </View>
        </Cartao>

        <Cartao>
          <Text style={s.secao}>⏰ Lembrete diário</Text>
          {lembretesDisponiveis() ? (
            <>
              <View style={s.linha}>
                <Text style={s.texto}>Me lembrar de estudar todo dia</Text>
                <Switch value={p.lembrete.ativo} onValueChange={(v) => mudarLembrete(v)} trackColor={{ true: cores.verde }} />
              </View>
              <View style={s.linha}>
                <Text style={s.texto}>Horário</Text>
                <View style={s.hora}>
                  <Pressable onPress={() => mudarLembrete(p.lembrete.ativo, (p.lembrete.hora + 23) % 24)} hitSlop={8}>
                    <Text style={s.horaBotao}>−</Text>
                  </Pressable>
                  <Text style={s.horaTexto}>{String(p.lembrete.hora).padStart(2, '0')}:00</Text>
                  <Pressable onPress={() => mudarLembrete(p.lembrete.ativo, (p.lembrete.hora + 1) % 24)} hitSlop={8}>
                    <Text style={s.horaBotao}>+</Text>
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
              <Text style={s.secao}>🔓 Liberar todos os níveis</Text>
              <Text style={s.mini}>Para quem já domina o básico e quer ir direto ao difícil.</Text>
            </View>
            <Switch value={p.desbloquearTudo} onValueChange={(v) => atualizar((x) => ({ ...x, desbloquearTudo: v }))} trackColor={{ true: cores.verde }} />
          </View>
        </Cartao>

        <Botao titulo="Apagar meu progresso" contorno cor={cores.vermelho} onPress={() => setConfirmar(true)} />
        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal visible={confirmar} transparent animationType="fade" onRequestClose={() => setConfirmar(false)}>
        <View style={s.modalFundo}>
          <View style={s.modal}>
            <Text style={s.secao}>Apagar todo o progresso?</Text>
            <Text style={[s.texto, { marginVertical: 12 }]}>XP, ofensiva, conquistas e histórico serão perdidos. Não dá para desfazer.</Text>
            <Botao titulo="Cancelar" cor={cores.azul} onPress={() => setConfirmar(false)} />
            <Botao
              titulo="Apagar tudo"
              contorno
              cor={cores.vermelho}
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

function Info({ emoji, valor, rotulo }: { emoji: string; valor: string | number; rotulo: string }) {
  return (
    <Cartao estilo={s.info}>
      <Text style={{ fontSize: 22 }}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={s.infoValor}>{valor}</Text>
        <Text style={s.infoRotulo}>{rotulo}</Text>
      </View>
    </Cartao>
  );
}

const s = StyleSheet.create({
  cabecalho: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: cores.azulClaro, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: cores.azul },
  nome: { fontSize: 22, fontWeight: '800', color: cores.texto, paddingVertical: 2 },
  nivel: { fontSize: 15, fontWeight: '800', color: cores.amarelo, marginBottom: 4 },
  mini: { fontSize: 12, color: cores.textoSuave, fontWeight: '600', marginTop: 4 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  info: { width: '48.5%', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  infoValor: { fontSize: 18, fontWeight: '800', color: cores.texto },
  infoRotulo: { fontSize: 11, color: cores.textoSuave, fontWeight: '700' },
  secao: { fontSize: 17, fontWeight: '800', color: cores.texto },
  texto: { fontSize: 14, color: cores.textoSuave, fontWeight: '600', lineHeight: 20, marginVertical: 8, flexShrink: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginTop: 10 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  hora: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  horaBotao: { fontSize: 26, fontWeight: '800', color: cores.azul, paddingHorizontal: 6 },
  horaTexto: { fontSize: 18, fontWeight: '800', color: cores.texto },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: cores.fundo, borderRadius: 22, padding: 22 },
});
