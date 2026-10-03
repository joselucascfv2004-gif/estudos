import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COMPETENCIAS, TEMAS_REDACAO } from '../../data/redacao';
import { useProgresso } from '../../estado/ProgressoContext';
import { Cabecalho, Cartao } from '../../ui/componentes';
import { ComIcone, Icone } from '../../ui/Icone';
import { criarEstilos, useCores } from '../../ui/tema';

/** Treino de redação: como a redação do ENEM é corrigida e os temas de provas anteriores. */
export default function TelaRedacoes() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="Redação do ENEM" icone="draw-pen" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 40 }}>
        <Cartao estilo={{ gap: 6 }}>
          <ComIcone icone="information-outline" cor={c.azul} estiloTexto={s.titulo}>
            Como funciona
          </ComIcone>
          <Text style={s.texto}>
            Texto dissertativo-argumentativo de até 30 linhas sobre um problema social, com uma proposta para resolvê-lo. A nota vai de 0 a 1.000: cinco
            competências que valem até 200 pontos cada.
          </Text>
          {COMPETENCIAS.map((comp) => (
            <Text key={comp.titulo} style={s.item}>
              <Text style={s.forte}>{comp.titulo}: </Text>
              {comp.descricao}
            </Text>
          ))}
          <Text style={[s.texto, { marginTop: 6 }]}>
            Zera a redação: fugir totalmente do tema, não escrever um texto dissertativo-argumentativo, escrever 7 linhas ou menos, ou colocar trechos sem
            relação com o tema (como receitas ou letras de música).
          </Text>
        </Cartao>

        <Text style={s.secao}>Temas das provas anteriores</Text>
        <Text style={s.texto}>Escolha um tema, escreva com o cronômetro ligado e depois avalie o seu texto pelas cinco competências.</Text>
        {TEMAS_REDACAO.map((t) => {
          const feita = p.redacoes[t.id];
          const nota = feita?.notas.every((n) => n != null) ? feita.notas.reduce<number>((a, n) => a + (n ?? 0), 0) : null;
          return (
            <Cartao key={t.id} testID={`tema-${t.id}`} estilo={s.linha} onPress={() => router.push({ pathname: '/redacao/[id]', params: { id: t.id } })}>
              <View style={s.ano}>
                <Text style={s.anoTexto}>{t.ano}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.tema}>{t.titulo}</Text>
                <Text style={s.mini}>
                  {t.obs ? `${t.obs} · ` : ''}
                  {feita ? (nota != null ? `Sua autoavaliação: ${nota} pontos` : 'Rascunho salvo') : 'Ainda não escrita'}
                </Text>
              </View>
              <Icone nome="chevron-right" tamanho={22} cor={c.textoSuave} />
            </Cartao>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  titulo: { fontSize: 17, fontWeight: '800', color: c.texto },
  texto: { fontSize: 14, color: c.textoSuave, fontWeight: '600', lineHeight: 20 },
  item: { fontSize: 14, color: c.texto, lineHeight: 20 },
  forte: { fontWeight: '800' },
  secao: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  ano: { width: 52, height: 52, borderRadius: 14, backgroundColor: c.azulClaro, alignItems: 'center', justifyContent: 'center' },
  anoTexto: { fontSize: 16, fontWeight: '800', color: c.azulEscuro },
  tema: { fontSize: 15, fontWeight: '800', color: c.texto, lineHeight: 20 },
  mini: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginTop: 4 },
}));
