import { useState } from 'react';
import { Modal, Platform, Share, Text, TextInput, View } from 'react-native';

import { exportarBackup, importarBackup, resumoBackup } from '../estado/backup';
import { Progresso } from '../estado/progresso';
import { useProgresso } from '../estado/ProgressoContext';
import { Botao, Cartao } from './componentes';
import { ComIcone } from './Icone';
import { criarEstilos, useCores } from './tema';

/** Cartão do Perfil para criar e restaurar a cópia de segurança do progresso. */
export function CartaoBackup() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar } = useProgresso();
  const [codigo, setCodigo] = useState('');
  const [colado, setColado] = useState('');
  const [msg, setMsg] = useState('');
  const [restaurar, setRestaurar] = useState<Progresso | null>(null);

  async function criar() {
    const texto = exportarBackup(p);
    const mensagem = `Cópia de segurança do app Estudos (${resumoBackup(p)}). Para restaurar, abra o app > Perfil > Cópia de segurança e cole esta mensagem inteira.\n\n${texto}`;
    setMsg('');
    if (Platform.OS !== 'web') {
      try {
        const r = await Share.share({ message: mensagem, title: 'Cópia de segurança do Estudos' });
        if (r.action === Share.sharedAction) {
          setMsg('Cópia enviada! Guarde essa mensagem: com ela você recupera tudo em qualquer celular.');
          return;
        }
      } catch {
        // se não der para compartilhar, mostra o texto para copiar
      }
    }
    setCodigo(mensagem);
    setMsg('Copie o texto abaixo e guarde (por exemplo, mande para o seu e-mail).');
  }

  function conferir() {
    const novo = importarBackup(colado);
    if (!novo) {
      setMsg('Não reconheci esse texto. Cole a mensagem inteira da cópia de segurança, sem cortar nenhuma parte.');
      return;
    }
    setRestaurar(novo);
  }

  return (
    <Cartao>
      <ComIcone icone="cloud-upload-outline" cor={c.azul} estiloTexto={s.secao}>
        Cópia de segurança
      </ComIcone>
      <Text style={s.texto}>
        Seu progresso fica guardado só neste celular. Crie uma cópia de vez em quando e guarde a mensagem (o melhor é mandar para o seu e-mail ou salvar nas anotações do celular). Se
        trocar de celular ou reinstalar o app, é só colar a mensagem aqui para recuperar XP, ofensiva, revisões e questões salvas.
      </Text>
      <Botao testID="btn-criar-backup" icone="content-save-outline" titulo="Criar cópia de segurança" cor={c.azul} onPress={criar} />
      {!!codigo && (
        <TextInput testID="texto-backup" value={codigo} multiline editable={false} selectTextOnFocus style={[s.campo, { maxHeight: 120 }]} />
      )}
      <Text style={[s.texto, { marginTop: 14 }]}>Já tem uma cópia? Cole a mensagem aqui:</Text>
      <TextInput
        testID="input-backup"
        value={colado}
        onChangeText={setColado}
        placeholder="Cole aqui a mensagem da cópia"
        placeholderTextColor={c.cinza}
        multiline
        style={[s.campo, { maxHeight: 120 }]}
      />
      <Botao
        testID="btn-restaurar"
        icone="backup-restore"
        titulo="Restaurar cópia"
        contorno
        cor={c.azul}
        desativado={!colado.trim()}
        onPress={conferir}
        estilo={{ marginTop: 10 }}
      />
      {!!msg && <Text style={s.mini}>{msg}</Text>}

      <Modal visible={!!restaurar} transparent animationType="fade" onRequestClose={() => setRestaurar(null)}>
        <View style={s.modalFundo}>
          <View style={s.modal}>
            <Text style={s.secao}>Restaurar esta cópia?</Text>
            <Text style={[s.texto, { marginVertical: 12 }]}>
              A cópia tem {restaurar ? resumoBackup(restaurar) : ''}. O progresso atual deste celular será substituído por ela.
            </Text>
            <Botao
              testID="btn-confirmar-restaurar"
              titulo="Restaurar"
              cor={c.azul}
              onPress={() => {
                const novo = restaurar!;
                atualizar(() => ({ ...novo, planoDia: null }));
                setRestaurar(null);
                setColado('');
                setMsg('Pronto! Seu progresso foi restaurado.');
              }}
            />
            <Botao titulo="Cancelar" contorno cor={c.vermelho} estilo={{ marginTop: 10 }} onPress={() => setRestaurar(null)} />
          </View>
        </View>
      </Modal>
    </Cartao>
  );
}

const useEstilos = criarEstilos((c) => ({
  secao: { fontSize: 17, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20, marginVertical: 8 },
  mini: { fontSize: 13, color: c.verdeEscuro, fontWeight: '700', marginTop: 8, lineHeight: 18 },
  campo: {
    borderWidth: 2,
    borderColor: c.borda,
    borderRadius: 12,
    padding: 10,
    fontSize: 13,
    color: c.texto,
    backgroundColor: c.fundoSuave,
    marginTop: 10,
  },
  modalFundo: { flex: 1, backgroundColor: c.veu, justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: c.fundo, borderRadius: 22, padding: 22 },
}));
