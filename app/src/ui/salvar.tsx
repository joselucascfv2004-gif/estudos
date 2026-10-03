import { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import { hoje } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import { Botao } from './componentes';
import { criarEstilos, useCores } from './tema';

/** Botões "Salvar" (estrela) e "Anotar" de uma questão. */
export function AcoesQuestao({ id, claro }: { id: string; claro?: boolean }) {
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [anotando, setAnotando] = useState(false);
  const salva = p.salvas[id];

  function alternar() {
    atualizar((x) => {
      const salvas = { ...x.salvas };
      if (salvas[id]) delete salvas[id];
      else salvas[id] = { nota: '', dia: hoje() };
      return { ...x, salvas };
    });
  }

  return (
    <View style={s.acoes}>
      <Pressable testID="btn-salvar" onPress={alternar} style={[s.acao, claro && s.acaoClara]} hitSlop={6}>
        <Text style={s.acaoTexto}>{salva ? '⭐ Salva' : '☆ Salvar'}</Text>
      </Pressable>
      <Pressable testID="btn-anotar" onPress={() => setAnotando(true)} style={[s.acao, claro && s.acaoClara]} hitSlop={6}>
        <Text style={s.acaoTexto}>{salva?.nota ? '📝 Ver anotação' : '📝 Anotar'}</Text>
      </Pressable>
      <ModalNota id={id} visivel={anotando} fechar={() => setAnotando(false)} />
    </View>
  );
}

/** Janela para escrever uma anotação; salvar a nota também marca a questão com estrela. */
export function ModalNota({ id, visivel, fechar }: { id: string; visivel: boolean; fechar: () => void }) {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [texto, setTexto] = useState(p.salvas[id]?.nota ?? '');

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={fechar} onShow={() => setTexto(p.salvas[id]?.nota ?? '')}>
      <View style={s.fundo}>
        <View style={s.caixa}>
          <Text style={s.titulo}>📝 Minha anotação</Text>
          <Text style={s.sub}>Escreva o macete, a fórmula ou o motivo do erro. A questão fica salva em "Questões salvas".</Text>
          <TextInput
            testID="input-nota"
            value={texto}
            onChangeText={setTexto}
            multiline
            placeholder="Ex.: lembrar que crase não ocorre antes de verbo"
            placeholderTextColor={c.cinza}
            style={s.campo}
            maxLength={500}
          />
          <Botao
            testID="btn-salvar-nota"
            titulo="Salvar anotação"
            cor={c.azul}
            onPress={() => {
              atualizar((x) => ({ ...x, salvas: { ...x.salvas, [id]: { nota: texto.trim(), dia: x.salvas[id]?.dia ?? hoje() } } }));
              fechar();
            }}
          />
          <Botao titulo="Cancelar" contorno cor={c.textoSuave} onPress={fechar} estilo={{ marginTop: 10 }} />
        </View>
      </View>
    </Modal>
  );
}

const useEstilos = criarEstilos((c) => ({
  acoes: { flexDirection: 'row', gap: 10, marginTop: 10 },
  acao: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12, borderWidth: 2, borderColor: 'rgba(0,0,0,0.12)' },
  acaoClara: { borderColor: c.borda, backgroundColor: c.fundo },
  acaoTexto: { fontSize: 13, fontWeight: '800', color: c.texto },
  fundo: { flex: 1, backgroundColor: c.veu, justifyContent: 'center', padding: 24 },
  caixa: { backgroundColor: c.fundo, borderRadius: 22, padding: 20 },
  titulo: { fontSize: 20, fontWeight: '800', color: c.texto },
  sub: { fontSize: 14, color: c.textoSuave, marginVertical: 10, lineHeight: 20 },
  campo: {
    minHeight: 110,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: c.borda,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: c.texto,
    backgroundColor: c.fundoSuave,
    marginBottom: 14,
  },
}));
