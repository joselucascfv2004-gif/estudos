import { Text, View } from 'react-native';

import { criarEstilos, useCores } from './tema';

/** Texto com trechos em **negrito**. */
export function TextoRico({ texto, estilo, forte }: { texto: string; estilo: object; forte: object }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <Text style={estilo}>
      {partes.map((parte, i) =>
        parte.startsWith('**') && parte.endsWith('**') ? (
          <Text key={i} style={forte}>
            {parte.slice(2, -2)}
          </Text>
        ) : (
          parte
        ),
      )}
    </Text>
  );
}

/**
 * Markdown simples dos resumos e aulas: títulos (### e ####), listas (- e 1.), destaques (> texto,
 * usados para exemplos resolvidos) e **negrito**.
 */
export function Markdown({ texto, cor }: { texto: string; cor?: string }) {
  const c = useCores();
  const s = useEstilos();
  const destaque = cor ?? c.azul;
  const saida: React.ReactNode[] = [];
  const linhas = texto.split('\n');
  for (let i = 0; i < linhas.length; i++) {
    const t = linhas[i].trim();
    if (t.startsWith('>')) {
      // junta as linhas seguidas do destaque num quadro só
      const grupo: string[] = [];
      while (i < linhas.length && linhas[i].trim().startsWith('>')) grupo.push(linhas[i++].trim().replace(/^>\s?/, ''));
      i--;
      saida.push(
        <View key={i} style={[s.quadro, { borderLeftColor: destaque }]}>
          {grupo.map((l, j) => (l ? <TextoRico key={j} texto={l} estilo={s.texto} forte={s.forte} /> : <View key={j} style={{ height: 6 }} />))}
        </View>,
      );
      continue;
    }
    if (!t) saida.push(<View key={i} style={{ height: 8 }} />);
    else if (t.startsWith('#### ')) saida.push(<Text key={i} style={s.subtitulo2}>{t.slice(5)}</Text>);
    else if (t.startsWith('### ')) saida.push(<Text key={i} style={s.subtitulo}>{t.slice(4)}</Text>);
    else if (t.startsWith('- ')) {
      const recuo = linhas[i].length - linhas[i].trimStart().length;
      saida.push(
        <View key={i} style={[s.item, recuo >= 2 && { marginLeft: 18 }]}>
          <Text style={[s.texto, { color: destaque }]}>●</Text>
          <TextoRico texto={t.slice(2)} estilo={[s.texto, { flex: 1 }]} forte={s.forte} />
        </View>,
      );
    } else if (/^\d+\.\s/.test(t)) {
      const [num, ...resto] = t.split(/\.\s/);
      saida.push(
        <View key={i} style={s.item}>
          <Text style={[s.texto, s.forte, { color: destaque, minWidth: 20 }]}>{num}.</Text>
          <TextoRico texto={resto.join('. ')} estilo={[s.texto, { flex: 1 }]} forte={s.forte} />
        </View>,
      );
    } else saida.push(<TextoRico key={i} texto={t} estilo={s.texto} forte={s.forte} />);
  }
  return <View>{saida}</View>;
}

const useEstilos = criarEstilos((c) => ({
  subtitulo: { fontSize: 18, fontWeight: '800', color: c.texto, marginTop: 12, marginBottom: 6 },
  subtitulo2: { fontSize: 16, fontWeight: '800', color: c.texto, marginTop: 8, marginBottom: 4 },
  texto: { fontSize: 16, lineHeight: 24, color: c.texto },
  forte: { fontWeight: '800' },
  item: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  quadro: { backgroundColor: c.fundoSuave, borderLeftWidth: 4, borderRadius: 10, padding: 12, marginVertical: 8, gap: 2 },
}));
