// Salva o PDF no celular. No Android o aluno escolhe uma pasta (por exemplo, Downloads) uma vez;
// o app lembra dela e grava os próximos arquivos lá. No iPhone, abre a janela de compartilhar.
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FS from 'expo-file-system/legacy';
import { Platform, Share } from 'react-native';

const CHAVE_PASTA = 'gerador.pasta';

export type Resultado = { ok: true; onde: string } | { ok: false; motivo: string };

async function escolherPasta(): Promise<string | null> {
  const r = await FS.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!r.granted) return null;
  await AsyncStorage.setItem(CHAVE_PASTA, r.directoryUri);
  return r.directoryUri;
}

/** Nome legível da pasta escolhida, a partir do endereço do Android. */
function nomeDaPasta(uri: string) {
  const ultimo = decodeURIComponent(uri.split('/').pop() ?? '');
  return ultimo.split(':').pop() || 'pasta escolhida';
}

export async function salvarPdf(nome: string, base64: string, trocarPasta = false): Promise<Resultado> {
  try {
    if (Platform.OS === 'android') {
      let pasta = trocarPasta ? null : await AsyncStorage.getItem(CHAVE_PASTA);
      for (let tentativa = 0; tentativa < 2; tentativa++) {
        if (!pasta) pasta = await escolherPasta();
        if (!pasta) return { ok: false, motivo: 'Nenhuma pasta escolhida.' };
        try {
          const uri = await FS.StorageAccessFramework.createFileAsync(pasta, nome.replace(/\.pdf$/i, ''), 'application/pdf');
          await FS.writeAsStringAsync(uri, base64, { encoding: FS.EncodingType.Base64 });
          return { ok: true, onde: `na pasta "${nomeDaPasta(pasta)}"` };
        } catch {
          // a permissão da pasta pode ter sido retirada: pede de novo uma vez
          await AsyncStorage.removeItem(CHAVE_PASTA);
          pasta = null;
        }
      }
      return { ok: false, motivo: 'Não consegui gravar na pasta escolhida.' };
    }
    const uri = `${FS.documentDirectory}${nome}`;
    await FS.writeAsStringAsync(uri, base64, { encoding: FS.EncodingType.Base64 });
    await Share.share({ url: uri, title: nome });
    return { ok: true, onde: 'pelo menu de compartilhar' };
  } catch (e) {
    return { ok: false, motivo: e instanceof Error ? e.message : 'Erro ao salvar.' };
  }
}

export const podeTrocarPasta = Platform.OS === 'android';
