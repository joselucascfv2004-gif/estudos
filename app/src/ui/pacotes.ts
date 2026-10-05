import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import * as FS from 'expo-file-system/legacy';

import { IMAGENS, PACOTES } from '../data/imagens';

// As figuras das questões vêm coladas em pacotes (um arquivo por dia de prova), porque cada
// atualização do app aceita no máximo 1 000 arquivos. Aqui cada imagem é lida do seu pacote,
// pela posição em bytes, e vira um endereço "data:" que o <Image> mostra.

const caminhos = new Map<number, Promise<string>>();
const prontas = new Map<string, string>();
const lendo = new Map<string, Promise<string>>();
const pacotesWeb = new Map<number, Promise<ArrayBuffer>>();

/** Caminho local do pacote (o expo-asset copia o arquivo do app para o aparelho na primeira vez). */
function caminhoDoPacote(p: number) {
  let c = caminhos.get(p);
  if (!c) {
    c = (async () => {
      const a = Asset.fromModule(PACOTES[p]);
      await a.downloadAsync();
      return a.localUri || a.uri;
    })();
    c.catch(() => caminhos.delete(p));
    caminhos.set(p, c);
  }
  return c;
}

function base64(bytes: Uint8Array) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

async function lerTrecho(p: number, ini: number, tam: number) {
  const uri = await caminhoDoPacote(p);
  if (Platform.OS === 'web') {
    let b = pacotesWeb.get(p);
    if (!b) {
      b = fetch(uri).then((r) => r.arrayBuffer());
      b.catch(() => pacotesWeb.delete(p));
      pacotesWeb.set(p, b);
    }
    return base64(new Uint8Array(await b, ini, tam));
  }
  return FS.readAsStringAsync(uri, { encoding: FS.EncodingType.Base64, position: ini, length: tam });
}

function carregar(nome: string) {
  let l = lendo.get(nome);
  if (!l) {
    const info = IMAGENS[nome];
    l = lerTrecho(info.p, info.ini, info.tam).then((b64) => {
      const uri = `data:image/${info.tipo};base64,${b64}`;
      prontas.set(nome, uri);
      return uri;
    });
    l.catch(() => {}).finally(() => lendo.delete(nome));
    lendo.set(nome, l);
  }
  return l;
}

/** Endereço da imagem para o <Image>: undefined enquanto carrega; `erro` se não deu para ler. */
export function useImagem(nome: string) {
  const [, atualizar] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  const uri = prontas.get(nome);
  useEffect(() => {
    if (prontas.has(nome) || !IMAGENS[nome]) return;
    let vivo = true;
    carregar(nome).then(
      () => vivo && atualizar((x) => x + 1),
      () => vivo && setErro(nome),
    );
    return () => {
      vivo = false;
    };
  }, [nome]);
  return { uri, erro: erro === nome };
}
