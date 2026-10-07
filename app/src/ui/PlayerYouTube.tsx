import { Linking, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

/** Página que só contém o player oficial do YouTube (modo de privacidade reforçada). */
function htmlPlayer(id: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;height:100%;background:#000;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0}</style></head>
<body><iframe src="https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen
referrerpolicy="strict-origin-when-cross-origin"></iframe></body></html>`;
}

/** endereço da página do player: o YouTube exige saber de onde o vídeo está sendo exibido */
const ORIGEM = 'https://estudos.app';

/**
 * Toca um vídeo do YouTube dentro do app, no player oficial. Links que tentam sair do player
 * (logo do YouTube, "assistir no YouTube") abrem no app do YouTube ou no navegador.
 */
export function PlayerYouTube({ id }: { id: string }) {
  return (
    <View style={estilos.caixa}>
      <WebView
        key={id}
        source={{ html: htmlPlayer(id), baseUrl: ORIGEM }}
        style={estilos.web}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        onShouldStartLoadWithRequest={(req) => {
          if (req.isTopFrame === false || req.url === 'about:blank' || req.url.startsWith(ORIGEM)) return true;
          Linking.openURL(req.url).catch(() => {});
          return false;
        }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' },
  web: { flex: 1, backgroundColor: '#000' },
});
