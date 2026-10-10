import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { ComandoFolha, comandoJs, htmlFolha } from './folhaHtml';

export type EstadoFolha = { tracos: string; podeDesfazer: boolean; podeRefazer: boolean };
export type FolhaRef = { comando: (c: ComandoFolha) => void };

/** Folha quadriculada para desenhar (celular: WebView com <canvas>). */
export const FolhaDesenho = forwardRef<FolhaRef, { inicial: string; aoMudar: (e: EstadoFolha) => void }>(function FolhaDesenho(
  { inicial, aoMudar },
  ref,
) {
  const web = useRef<WebView>(null);
  // a página é montada uma vez só, com os traços que já existiam
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const html = useMemo(() => htmlFolha(inicial), []);
  useImperativeHandle(ref, () => ({
    comando: (c) => web.current?.injectJavaScript(`${comandoJs(c)};true;`),
  }));
  return (
    <View style={estilos.caixa}>
      <WebView
        ref={web}
        originWhitelist={['*']}
        source={{ html }}
        style={estilos.web}
        javaScriptEnabled
        scrollEnabled={false}
        overScrollMode="never"
        bounces={false}
        setSupportMultipleWindows={false}
        onMessage={(e) => {
          try {
            const m = JSON.parse(e.nativeEvent.data);
            if (m.tipo === 'tracos') aoMudar({ tracos: JSON.stringify(m.dados), podeDesfazer: m.podeDesfazer, podeRefazer: m.podeRefazer });
          } catch {
            // mensagem inválida: ignora
          }
        }}
      />
    </View>
  );
});

const estilos = StyleSheet.create({
  caixa: { flex: 1, backgroundColor: '#FFFFFF', overflow: 'hidden' },
  web: { flex: 1, backgroundColor: '#FFFFFF' },
});
