import { createElement, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { ComandoFolha, comandoJs, htmlFolha } from './folhaHtml';

export type EstadoFolha = { tracos: string; podeDesfazer: boolean; podeRefazer: boolean };
export type FolhaRef = { comando: (c: ComandoFolha) => void };

/** Folha quadriculada para desenhar (versão web: <iframe> com <canvas>). */
export const FolhaDesenho = forwardRef<FolhaRef, { inicial: string; aoMudar: (e: EstadoFolha) => void }>(function FolhaDesenho(
  { inicial, aoMudar },
  ref,
) {
  const quadro = useRef<HTMLIFrameElement | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const html = useMemo(() => htmlFolha(inicial), []);
  const aoMudarRef = useRef(aoMudar);
  aoMudarRef.current = aoMudar;

  useImperativeHandle(ref, () => ({
    comando: (c) => {
      const w = quadro.current?.contentWindow as (Window & { eval?: (s: string) => unknown }) | null | undefined;
      try {
        w?.eval?.(comandoJs(c));
      } catch {
        // página ainda carregando
      }
    },
  }));

  useEffect(() => {
    function ouvir(e: MessageEvent) {
      if (!quadro.current || e.source !== quadro.current.contentWindow || typeof e.data !== 'string') return;
      try {
        const m = JSON.parse(e.data);
        if (m.tipo === 'tracos') aoMudarRef.current({ tracos: JSON.stringify(m.dados), podeDesfazer: m.podeDesfazer, podeRefazer: m.podeRefazer });
      } catch {
        // ignora
      }
    }
    window.addEventListener('message', ouvir);
    return () => window.removeEventListener('message', ouvir);
  }, []);

  return (
    <View style={estilos.caixa}>
      {createElement('iframe', {
        ref: quadro,
        srcDoc: html,
        title: 'Rascunho',
        style: { border: 0, width: '100%', height: '100%', display: 'block', background: '#FFFFFF' },
      })}
    </View>
  );
});

const estilos = StyleSheet.create({
  caixa: { flex: 1, backgroundColor: '#FFFFFF', overflow: 'hidden' },
});
