import { useState } from 'react';
import { Platform, Text } from 'react-native';
import * as Updates from 'expo-updates';

import { totalComFigura, totalQuestoes } from '../data/banco';
import { Botao, Cartao } from './componentes';
import { ComIcone } from './Icone';
import { criarEstilos, useCores } from './tema';

const ativo = Platform.OS !== 'web' && Updates.isEnabled;
const numero = (n: number) => n.toLocaleString('pt-BR');

function dataDaVersao() {
  if (!ativo) return 'versão de teste';
  if (Updates.isEmbeddedLaunch || !Updates.createdAt) return 'a que veio no APK';
  const d = Updates.createdAt;
  const dois = (n: number) => String(n).padStart(2, '0');
  return `de ${dois(d.getDate())}/${dois(d.getMonth() + 1)}/${d.getFullYear()} às ${dois(d.getHours())}:${dois(d.getMinutes())}`;
}

/** Aviso na tela inicial quando uma atualização já foi baixada e só falta reabrir o app. */
export function AvisoAtualizacao() {
  const c = useCores();
  const s = useEstilos();
  const { isUpdatePending } = Updates.useUpdates();
  if (!ativo || !isUpdatePending) return null;
  return (
    <Cartao estilo={[s.aviso, { borderColor: c.azul }]} onPress={() => Updates.reloadAsync().catch(() => {})}>
      <ComIcone icone="download-outline" cor={c.azul} estiloTexto={s.secao}>
        Atualização pronta
      </ComIcone>
      <Text style={s.texto}>Uma versão nova do app já foi baixada. Toque aqui para usar agora.</Text>
    </Cartao>
  );
}

/** Cartão do Perfil: qual versão está instalada e um botão para buscar a mais nova. */
export function CartaoAtualizacao() {
  const c = useCores();
  const s = useEstilos();
  const [msg, setMsg] = useState('');
  const [buscando, setBuscando] = useState(false);

  async function procurar() {
    setBuscando(true);
    setMsg('Procurando...');
    try {
      const r = await Updates.checkForUpdateAsync();
      if (!r.isAvailable) {
        setMsg('Você já está com a versão mais nova.');
        return;
      }
      setMsg('Baixando a versão nova...');
      await Updates.fetchUpdateAsync();
      setMsg('Pronto! O app vai reiniciar.');
      await Updates.reloadAsync();
    } catch {
      setMsg('Não deu para buscar agora. Confira a internet e tente de novo.');
    } finally {
      setBuscando(false);
    }
  }

  return (
    <Cartao>
      <ComIcone icone="cellphone-arrow-down" cor={c.azul} estiloTexto={s.secao}>
        Versão do app
      </ComIcone>
      <Text style={s.texto}>
        {numero(totalQuestoes)} questões, {numero(totalComFigura)} delas com figura.{'\n'}Versão instalada: {dataDaVersao()}.
      </Text>
      {ativo && <Botao titulo={buscando ? 'Procurando...' : 'Procurar atualização agora'} cor={c.azul} desativado={buscando} pequeno onPress={procurar} />}
      {!!msg && <Text style={s.mini}>{msg}</Text>}
    </Cartao>
  );
}

const useEstilos = criarEstilos((c) => ({
  aviso: { marginBottom: 14, borderWidth: 2 },
  secao: { fontSize: 17, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20, marginVertical: 8 },
  mini: { fontSize: 13, color: c.verdeEscuro, fontWeight: '700', marginTop: 8, lineHeight: 18 },
}));
