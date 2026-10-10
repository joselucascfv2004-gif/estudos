// Mostra na tela uma expressão escrita na marcação do gerador (frações empilhadas, expoentes,
// raízes e matrizes), a mesma usada no PDF.
import { Fragment, useMemo } from 'react';
import { Text, View } from 'react-native';

import { lerMarcacao, textoPlano, type No } from '../gerador/marcacao';

type Props = { texto: string; tamanho?: number; cor: string; negrito?: boolean };

export function Expr({ texto, tamanho = 17, cor, negrito }: Props) {
  const nos = useMemo(() => lerMarcacao(texto), [texto]);
  return (
    <View accessible accessibilityLabel={textoPlano(nos)} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', flexShrink: 1 }}>
      <Nos nos={nos} t={tamanho} cor={cor} negrito={negrito} quebra />
    </View>
  );
}

function Nos({ nos, t, cor, negrito, quebra }: { nos: No[]; t: number; cor: string; negrito?: boolean; quebra?: boolean }) {
  return (
    <>
      {nos.map((n, i) => (
        <Fragment key={i}>
          <Item n={n} t={t} cor={cor} negrito={negrito} quebra={quebra} />
        </Fragment>
      ))}
    </>
  );
}

/** Linha horizontal de nós (dentro de frações, expoentes etc., sem quebra). */
function Linha({ nos, t, cor, negrito }: { nos: No[]; t: number; cor: string; negrito?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Nos nos={nos} t={t} cor={cor} negrito={negrito} />
    </View>
  );
}

function Item({ n, t, cor, negrito, quebra }: { n: No; t: number; cor: string; negrito?: boolean; quebra?: boolean }) {
  const estilo = { fontSize: t, lineHeight: Math.round(t * 1.3), color: cor, fontWeight: negrito ? ('800' as const) : ('600' as const) };
  switch (n.t) {
    case 'txt':
      // no nível de fora, cada palavra vira um pedaço para a linha poder quebrar nos espaços
      if (!quebra) return <Text style={estilo}>{n.s}</Text>;
      return (
        <>
          {(n.s.match(/\S+\s*|\s+/g) ?? []).map((p, i) => (
            <Text key={i} style={estilo}>
              {p}
            </Text>
          ))}
        </>
      );
    case 'sup':
      return (
        <View style={{ paddingBottom: t * 0.75 }}>
          <Linha nos={n.c} t={t * 0.68} cor={cor} negrito={negrito} />
        </View>
      );
    case 'sub':
      return (
        <View style={{ paddingTop: t * 0.55 }}>
          <Linha nos={n.c} t={t * 0.68} cor={cor} negrito={negrito} />
        </View>
      );
    case 'frac':
      return (
        <View style={{ alignItems: 'center', marginHorizontal: 3, marginVertical: 2 }}>
          <Linha nos={n.n} t={t * 0.85} cor={cor} negrito={negrito} />
          <View style={{ alignSelf: 'stretch', height: Math.max(1.5, t / 12), backgroundColor: cor, marginVertical: 1, minWidth: t * 0.6 }} />
          <Linha nos={n.d} t={t * 0.85} cor={cor} negrito={negrito} />
        </View>
      );
    case 'raiz':
      return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginHorizontal: 1 }}>
          {n.i ? (
            <View style={{ alignSelf: 'flex-start', marginRight: -t * 0.2 }}>
              <Linha nos={n.i} t={t * 0.5} cor={cor} negrito={negrito} />
            </View>
          ) : null}
          <Text style={[estilo, { fontSize: t * 1.15, lineHeight: Math.round(t * 1.45) }]}>√</Text>
          <View style={{ borderTopWidth: Math.max(1.5, t / 12), borderTopColor: cor, paddingHorizontal: 1, marginBottom: t * 0.05 }}>
            <Linha nos={n.c} t={t} cor={cor} negrito={negrito} />
          </View>
        </View>
      );
    case 'mat': {
      const borda = { borderColor: cor, borderTopWidth: 1.5, borderBottomWidth: 1.5, width: 6 };
      const nCol = Math.max(...n.l.map((l) => l.length));
      return (
        <View style={{ flexDirection: 'row', alignItems: 'stretch', marginHorizontal: 3, marginVertical: 3 }}>
          <View style={[borda, { borderLeftWidth: 1.5 }]} />
          <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
            {[...Array(nCol)].map((_, j) => (
              <View key={j} style={{ alignItems: 'center', paddingHorizontal: t * 0.35 }}>
                {n.l.map((linha, i) => (
                  <View key={i} style={{ minHeight: t * 1.45, justifyContent: 'center' }}>
                    {linha[j] ? <Linha nos={linha[j]} t={t * 0.9} cor={cor} negrito={negrito} /> : null}
                  </View>
                ))}
              </View>
            ))}
          </View>
          <View style={[borda, { borderRightWidth: 1.5 }]} />
        </View>
      );
    }
    case 'br':
      return <View style={{ width: '100%', height: 2 }} />;
    default:
      return null;
  }
}
