import { createElement } from 'react';
import { StyleSheet, View } from 'react-native';

/** Versão web: o próprio navegador mostra o player oficial do YouTube num iframe. */
export function PlayerYouTube({ id }: { id: string }) {
  return (
    <View style={estilos.caixa}>
      {createElement('iframe', {
        key: id,
        src: `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`,
        title: 'Vídeo-aula',
        allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen',
        allowFullScreen: true,
        referrerPolicy: 'strict-origin-when-cross-origin',
        style: { width: '100%', height: '100%', border: 0 },
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' },
});
