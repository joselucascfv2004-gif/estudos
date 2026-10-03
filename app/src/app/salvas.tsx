import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getQuestao, getTopico } from '../data/banco';
import { useProgresso } from '../estado/ProgressoContext';
import { Botao, Cabecalho, Cartao } from '../ui/componentes';
import { AcoesQuestao } from '../ui/salvar';
import { criarEstilos, useCores } from '../ui/tema';

const LETRAS = 'ABCDE';

export default function Salvas() {
  const c = useCores();
  const s = useEstilos();
  const { p } = useProgresso();
  const [aberta, setAberta] = useState<string | null>(null);
  const ids = Object.entries(p.salvas)
    .sort(([, a], [, b]) => (a.dia < b.dia ? 1 : -1))
    .map(([id]) => id)
    .filter((id) => getQuestao(id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }}>
      <Cabecalho titulo="⭐ Questões salvas" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {ids.length === 0 ? (
          <View style={{ alignItems: 'center', padding: 24 }}>
            <Text style={{ fontSize: 56 }}>⭐</Text>
            <Text style={s.vazioTitulo}>Nenhuma questão salva</Text>
            <Text style={s.vazioTexto}>
              Durante as lições, toque em "☆ Salvar" ou "📝 Anotar" depois de responder. As questões aparecem aqui para você rever quando quiser.
            </Text>
          </View>
        ) : (
          <>
            <Botao
              testID="btn-praticar-salvas"
              titulo={`Praticar salvas (${Math.min(ids.length, 10)})`}
              cor={c.amarelo}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'salvas' } })}
            />
            {ids.map((id) => {
              const info = getQuestao(id)!;
              const t = getTopico(info.topicoId);
              const q = info.questao;
              const nota = p.salvas[id]?.nota;
              const expandida = aberta === id;
              return (
                <Cartao key={id}>
                  <Pressable onPress={() => setAberta(expandida ? null : id)}>
                    <Text style={s.topico}>
                      {t?.disciplina.emoji} {t?.topico.titulo}
                    </Text>
                    <Text style={s.enunciado} numberOfLines={expandida ? undefined : 4}>
                      {q.e}
                    </Text>
                    {expandida ? (
                      <View style={{ gap: 6, marginTop: 8 }}>
                        {q.a.map((alt, i) => (
                          <Text key={i} style={[s.alt, i === q.c && s.altCerta]}>
                            {LETRAS[i]}) {alt}
                            {i === q.c ? '  ✅' : ''}
                          </Text>
                        ))}
                        <Text style={s.explicacao}>{q.x}</Text>
                      </View>
                    ) : (
                      <Text style={s.verMais}>Toque para ver as alternativas e a explicação</Text>
                    )}
                  </Pressable>
                  {!!nota && (
                    <View style={s.nota}>
                      <Text style={s.notaTexto}>📝 {nota}</Text>
                    </View>
                  )}
                  <AcoesQuestao id={id} claro />
                </Cartao>
              );
            })}
          </>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const useEstilos = criarEstilos((c) => ({
  vazioTitulo: { fontSize: 22, fontWeight: '800', color: c.texto, marginTop: 10 },
  vazioTexto: { fontSize: 15, color: c.textoSuave, textAlign: 'center', marginTop: 8, lineHeight: 21 },
  topico: { fontSize: 13, fontWeight: '800', color: c.textoSuave, marginBottom: 6 },
  enunciado: { fontSize: 15, color: c.texto, fontWeight: '600', lineHeight: 21 },
  verMais: { fontSize: 13, color: c.azul, fontWeight: '700', marginTop: 8 },
  alt: { fontSize: 14, color: c.texto, lineHeight: 20 },
  altCerta: { color: c.verdeEscuro, fontWeight: '800' },
  explicacao: { fontSize: 14, color: c.textoSuave, lineHeight: 20, marginTop: 6 },
  nota: { backgroundColor: c.amareloClaro, borderRadius: 12, padding: 10, marginTop: 10 },
  notaTexto: { fontSize: 14, color: c.texto, fontWeight: '600', lineHeight: 20 },
}));
