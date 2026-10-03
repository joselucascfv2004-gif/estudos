import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { disciplinasDaTrilha, getTopico } from '../../data/banco';
import { TRILHAS } from '../../data/trilhas';
import { diferencaDias, hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import {
  BONUS_DESAFIO,
  dominioTopico,
  estudouHoje,
  estudouTopicoHoje,
  gerarPlano,
  nivelSugerido,
  pontosFracos,
  revisoesPendentes,
  xpHoje,
} from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
import { Barra, Botao, Cartao, Chip } from '../../ui/componentes';
import { clarear, criarEstilos, useCores } from '../../ui/tema';


export default function Inicio() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar, aviso, limparAviso } = useProgresso();
  const lista = disciplinasDaTrilha(p.trilha);
  const xp = xpHoje(p);
  const desafioFeito = !!p.desafiosFeitos[hoje()];
  const ultimo = p.ultimoTopico ? getTopico(p.ultimoTopico) : undefined;
  const pendentes = revisoesPendentes(p).length;
  const plano = p.planoDia?.dia === hoje() ? p.planoDia.topicos.filter((id) => getTopico(id)) : [];
  // o ponto fraco só vira item separado se não for um dos assuntos do plano
  const fraco = pontosFracos(p).find((f) => !plano.includes(f.topicoId));
  const infoFraco = fraco ? getTopico(fraco.topicoId) : undefined;
  const dia = hoje();
  const diasProva = p.dataProva ? diferencaDias(dia, p.dataProva) : null;

  // o plano é gerado uma vez por dia, para os itens não mudarem enquanto o aluno estuda
  useEffect(() => {
    if (p.planoDia?.dia !== dia) atualizar((x) => ({ ...x, planoDia: { dia, topicos: gerarPlano(x, dia) } }));
  }, [p.planoDia?.dia, dia, atualizar]);
  const itensPlano = [
    ...(pendentes > 0 ? [{ chave: 'revisao', feito: false }] : []),
    ...(fraco ? [{ chave: 'fraco', feito: estudouTopicoHoje(p, fraco.topicoId) }] : []),
    ...plano.map((id) => ({ chave: id, feito: estudouTopicoHoje(p, id) })),
  ];
  const feitos = itensPlano.filter((i) => i.feito).length;

  const areas: { area: string; itens: typeof lista }[] = [];
  for (const d of lista) {
    let grupo = areas.find((a) => a.area === d.area);
    if (!grupo) areas.push((grupo = { area: d.area, itens: [] }));
    grupo.itens.push(d);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={s.conteudo}>
        {aviso && (
          <Cartao estilo={[s.aviso, aviso.tipo === 'perdeu' && { backgroundColor: c.vermelhoClaro, borderColor: c.vermelho }]} onPress={limparAviso}>
            <Text style={s.avisoTexto}>
              {aviso.tipo === 'protetor'
                ? `🛡️ Seu protetor de ofensiva foi usado (${aviso.dias} dia${aviso.dias === 1 ? '' : 's'}). A ofensiva continua!`
                : '💔 Você perdeu sua ofensiva. Faça uma lição hoje para começar uma nova!'}
            </Text>
            <Text style={s.avisoFechar}>Toque para fechar</Text>
          </Cartao>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {TRILHAS.map((t) => (
            <Chip key={t.id} texto={`${t.emoji} ${t.rotulo}`} ativo={p.trilha === t.id} onPress={() => atualizar((x) => ({ ...x, trilha: t.id }))} />
          ))}
        </ScrollView>

        <Cartao estilo={{ marginBottom: 14 }}>
          <View style={s.linha}>
            <Text style={s.cartaoTitulo}>🎯 Meta diária</Text>
            <Text style={s.cartaoValor}>
              {Math.min(xp, p.metaDiaria)}/{p.metaDiaria} XP
            </Text>
          </View>
          <Barra valor={xp / p.metaDiaria} cor={xp >= p.metaDiaria ? c.amarelo : c.verde} />
          <Text style={s.cartaoSub}>
            {xp >= p.metaDiaria
              ? 'Meta batida! Cada XP extra é um bônus para a sua aprovação. 🏅'
              : estudouHoje(p)
                ? `Faltam ${p.metaDiaria - xp} XP para bater a meta de hoje.`
                : `Faça uma lição para manter sua ofensiva de ${p.ofensiva.atual} dia${p.ofensiva.atual === 1 ? '' : 's'}! 🔥`}
          </Text>
        </Cartao>

        <Cartao testID="cartao-plano" estilo={{ marginBottom: 14 }}>
          {diasProva != null && diasProva >= 0 ? (
            <View style={s.contagem}>
              <Text style={s.contagemNumero}>{diasProva}</Text>
              <Text style={s.contagemTexto}>
                {diasProva === 0 ? 'É hoje! Boa prova! 🍀' : `dia${diasProva === 1 ? '' : 's'} para ${p.nomeProva.trim() || 'a sua prova'}`}
              </Text>
            </View>
          ) : (
            <Text style={[s.cartaoSub, { marginTop: 0, marginBottom: 8 }]} onPress={() => router.push('/perfil')}>
              📅 Toque aqui para informar a data da sua prova e ver a contagem regressiva.
            </Text>
          )}
          <View style={s.linha}>
            <Text style={s.cartaoTitulo}>📋 Plano de hoje</Text>
            <Text style={s.cartaoValor}>
              {feitos}/{itensPlano.length}
            </Text>
          </View>
          {pendentes > 0 && (
            <ItemPlano
              feito={false}
              texto={`🧠 Revisar ${pendentes} ${pendentes === 1 ? 'questão' : 'questões'}`}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
            />
          )}
          {fraco && infoFraco && (
            <ItemPlano
              feito={estudouTopicoHoje(p, fraco.topicoId)}
              texto={`🎯 Treinar ponto fraco: ${infoFraco.topico.titulo}`}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos', topico: fraco.topicoId } })}
            />
          )}
          {plano.map((id) => {
            const info = getTopico(id)!;
            return (
              <ItemPlano
                key={id}
                testID={`plano-${id}`}
                feito={estudouTopicoHoje(p, id)}
                texto={`${info.disciplina.emoji} ${info.topico.titulo}`}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'topico', topico: id, nivel: String(nivelSugerido(p, id)) } })}
              />
            );
          })}
          {itensPlano.length > 0 && feitos === itensPlano.length && <Text style={s.cartaoSub}>🎉 Plano do dia concluído! Amanhã tem mais.</Text>}
        </Cartao>

        <Cartao estilo={[s.desafio, desafioFeito && { backgroundColor: c.fundoSuave, borderColor: c.borda }]}>
          <Text style={[s.cartaoTitulo, { color: desafioFeito ? c.textoSuave : '#FFF' }]}>⚔️ Desafio do dia</Text>
          <Text style={[s.cartaoSub, { color: desafioFeito ? c.textoSuave : '#FFF', marginBottom: 12 }]}>
            {desafioFeito
              ? 'Concluído! Volte amanhã para um novo desafio. Você ainda pode treinar à vontade.'
              : `10 questões misturadas da trilha ${p.trilha === 'Todas' ? 'completa' : p.trilha}. Bônus de +${BONUS_DESAFIO} XP!`}
          </Text>
          <Botao
            testID="btn-desafio"
            titulo={desafioFeito ? 'Jogar de novo' : 'Começar desafio'}
            cor={desafioFeito ? c.azul : '#FFFFFF'}
            corTexto={desafioFeito ? '#FFF' : c.azul}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'desafio' } })}
          />
        </Cartao>

        {ultimo && (
          <Cartao estilo={{ marginBottom: 14 }} onPress={() => router.push({ pathname: '/disciplina/[id]', params: { id: ultimo.disciplina.id } })}>
            <Text style={s.cartaoSub}>Continuar de onde parou</Text>
            <Text style={s.cartaoTitulo}>
              {ultimo.disciplina.emoji} {ultimo.topico.titulo}
            </Text>
          </Cartao>
        )}

        {areas.map(({ area, itens }) => (
          <View key={area} style={{ marginTop: 8 }}>
            <Text style={s.area}>{area}</Text>
            <View style={s.grade}>
              {itens.map((d) => {
                const dom = d.topicos.reduce((soma, t) => soma + dominioTopico(p, t.id), 0) / d.topicos.length;
                return (
                  <Cartao
                    key={d.id}
                    testID={`disc-${d.id}`}
                    estilo={[s.disc, { backgroundColor: clarear(d.cor, 0.12, c.fundo), borderColor: clarear(d.cor, 0.45, c.fundo) }]}
                    onPress={() => router.push({ pathname: '/disciplina/[id]', params: { id: d.id } })}
                  >
                    <Text style={s.discEmoji}>{d.emoji}</Text>
                    <Text style={s.discNome} numberOfLines={2}>
                      {d.nome}
                    </Text>
                    <Text style={s.discSub}>
                      {d.topicos.length} tópico{d.topicos.length > 1 ? 's' : ''} · {Math.round(dom * 100)}%
                    </Text>
                    <Barra valor={dom} cor={d.cor} altura={8} fundo={c.escuro ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"} />
                  </Cartao>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ItemPlano({ texto, feito, onPress, testID }: { texto: string; feito: boolean; onPress: () => void; testID?: string }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [s.itemPlano, pressed && { opacity: 0.6 }]}>
      <Text style={s.check}>{feito ? '✅' : '⬜'}</Text>
      <Text style={[s.itemTexto, feito && { color: c.textoSuave, textDecorationLine: 'line-through' }]} numberOfLines={2}>
        {texto}
      </Text>
      {!feito && <Text style={{ color: c.azul, fontWeight: '800' }}>▶</Text>}
    </Pressable>
  );
}

const useEstilos = criarEstilos((c) => ({
  contagem: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 10 },
  contagemNumero: { fontSize: 36, fontWeight: '800', color: c.laranja },
  contagemTexto: { flex: 1, fontSize: 16, fontWeight: '800', color: c.texto },
  itemPlano: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: c.borda },
  check: { fontSize: 18 },
  itemTexto: { flex: 1, fontSize: 15, fontWeight: '700', color: c.texto },
  conteudo: { padding: 16 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cartaoTitulo: { fontSize: 18, fontWeight: '800', color: c.texto },
  cartaoValor: { fontSize: 15, fontWeight: '800', color: c.textoSuave },
  cartaoSub: { fontSize: 14, color: c.textoSuave, marginTop: 8, fontWeight: '600', lineHeight: 20 },
  desafio: { backgroundColor: c.azul, borderColor: c.azulEscuro, marginBottom: 14 },
  aviso: { backgroundColor: c.azulClaro, borderColor: c.azul, marginBottom: 14 },
  avisoTexto: { fontSize: 15, fontWeight: '700', color: c.texto },
  avisoFechar: { fontSize: 12, color: c.textoSuave, marginTop: 6 },
  area: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  disc: { width: '48.5%', marginBottom: 12, padding: 14, gap: 4 },
  discEmoji: { fontSize: 30 },
  discNome: { fontSize: 16, fontWeight: '800', color: c.texto, minHeight: 40 },
  discSub: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginBottom: 4 },
}));
