import { useState } from 'react';
import { Linking, Modal, Platform, Pressable, Share, Text, TextInput, View } from 'react-native';

import { EMAIL_ERROS } from '../data/contato';
import { getQuestao, getTopico } from '../data/banco';

import { hoje } from '../estado/datas';
import { useProgresso } from '../estado/ProgressoContext';
import { Botao, Chip } from './componentes';
import { ComIcone } from './Icone';
import { criarEstilos, useCores } from './tema';
import { semImagens } from './Imagens';

/** Botões "Salvar" (estrela), "Anotar" e "Achei um erro" de uma questão. */
export function AcoesQuestao({ id, claro }: { id: string; claro?: boolean }) {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [anotando, setAnotando] = useState(false);
  const [erro, setErro] = useState(false);
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
        <ComIcone icone={salva ? 'star' : 'star-outline'} cor={salva ? c.amarelo : c.texto} tamanho={18} estilo={{ gap: 4 }} estiloTexto={s.acaoTexto}>
          {salva ? 'Salva' : 'Salvar'}
        </ComIcone>
      </Pressable>
      <Pressable testID="btn-anotar" onPress={() => setAnotando(true)} style={[s.acao, claro && s.acaoClara]} hitSlop={6}>
        <ComIcone icone="note-edit-outline" cor={c.texto} tamanho={18} estilo={{ gap: 4 }} estiloTexto={s.acaoTexto}>
          {salva?.nota ? 'Ver anotação' : 'Anotar'}
        </ComIcone>
      </Pressable>
      <Pressable testID="btn-erro" onPress={() => setErro(true)} style={[s.acao, claro && s.acaoClara]} hitSlop={6}>
        <ComIcone icone="alert-circle-outline" cor={c.texto} tamanho={18} estilo={{ gap: 4 }} estiloTexto={s.acaoTexto}>
          Erro?
        </ComIcone>
      </Pressable>
      <ModalNota id={id} visivel={anotando} fechar={() => setAnotando(false)} />
      <ModalErro id={id} visivel={erro} fechar={() => setErro(false)} />
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
          <ComIcone icone="note-edit-outline" cor={c.texto} tamanho={22} estiloTexto={s.titulo}>
            Minha anotação
          </ComIcone>
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

const MOTIVOS = ['Gabarito errado', 'Explicação confusa', 'Erro de digitação', 'Enunciado incompleto', 'Outro'];

/** Aviso de erro numa questão: o aluno escolhe o motivo e envia por e-mail ou pelo compartilhar do celular. */
function ModalErro({ id, visivel, fechar }: { id: string; visivel: boolean; fechar: () => void }) {
  const c = useCores();
  const s = useEstilos();
  const [motivo, setMotivo] = useState(MOTIVOS[0]);
  const [texto, setTexto] = useState('');
  const [aviso, setAviso] = useState('');
  const info = getQuestao(id);
  const topico = info ? getTopico(info.topicoId)?.topico.titulo : '';

  async function enviar() {
    const corpo = `Achei um erro numa questão do app Estudos.\n\nQuestão: ${id}${topico ? ` (${topico})` : ''}\nProblema: ${motivo}\n${texto.trim() ? `Detalhes: ${texto.trim()}\n` : ''}${info?.questao.f ? `Fonte: ${info.questao.f}\n` : ''}\nEnunciado: ${semImagens(info?.questao.e ?? '').slice(0, 300) ?? ''}`;
    try {
      if (EMAIL_ERROS) {
        await Linking.openURL(`mailto:${EMAIL_ERROS}?subject=${encodeURIComponent(`Erro na questão ${id}`)}&body=${encodeURIComponent(corpo)}`);
      } else if (Platform.OS !== 'web') {
        await Share.share({ message: corpo, title: 'Erro numa questão' });
      } else {
        setAviso(corpo);
        return;
      }
      setTexto('');
      fechar();
    } catch {
      setAviso(corpo);
    }
  }

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={fechar} onShow={() => setAviso('')}>
      <View style={s.fundo}>
        <View style={s.caixa}>
          <ComIcone icone="alert-circle-outline" cor={c.vermelho} tamanho={22} estiloTexto={s.titulo}>
            Achei um erro
          </ComIcone>
          <Text style={s.sub}>Obrigado por avisar! O que está errado nesta questão?</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, marginBottom: 10 }}>
            {MOTIVOS.map((m) => (
              <Chip key={m} texto={m} ativo={motivo === m} cor={c.vermelho} onPress={() => setMotivo(m)} />
            ))}
          </View>
          <TextInput
            testID="input-erro"
            value={texto}
            onChangeText={setTexto}
            multiline
            placeholder="Conte o que você notou (opcional)"
            placeholderTextColor={c.cinza}
            style={[s.campo, { minHeight: 80 }]}
            maxLength={500}
          />
          {!!aviso && (
            <TextInput value={aviso} multiline editable={false} selectTextOnFocus style={[s.campo, { minHeight: 80, fontSize: 12 }]} />
          )}
          <Botao testID="btn-enviar-erro" titulo="Enviar aviso" cor={c.vermelho} onPress={enviar} />
          <Botao titulo="Cancelar" contorno cor={c.textoSuave} onPress={fechar} estilo={{ marginTop: 10 }} />
        </View>
      </View>
    </Modal>
  );
}

const useEstilos = criarEstilos((c) => ({
  acoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
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
