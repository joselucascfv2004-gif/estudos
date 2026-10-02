import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { disciplinasDaTrilha, getTopico } from '../../data/banco';
import { TRILHAS } from '../../data/trilhas';
import { hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import { BONUS_DESAFIO, dominioTopico, estudouHoje, pontosFracos, revisoesPendentes, xpHoje } from '../../estado/progresso';
import { BarraStatus } from '../../ui/BarraStatus';
import { Barra, Botao, Cartao, Chip } from '../../ui/componentes';
import { clarear, cores } from '../../ui/tema';


export default function Inicio() {
  const { p, atualizar, aviso, limparAviso } = useProgresso();
  const lista = disciplinasDaTrilha(p.trilha);
  const xp = xpHoje(p);
  const desafioFeito = !!p.desafiosFeitos[hoje()];
  const ultimo = p.ultimoTopico ? getTopico(p.ultimoTopico) : undefined;
  const pendentes = revisoesPendentes(p).length;
  const fraco = pontosFracos(p)[0];
  const infoFraco = fraco ? getTopico(fraco.topicoId) : undefined;

  const areas: { area: string; itens: typeof lista }[] = [];
  for (const d of lista) {
    let grupo = areas.find((a) => a.area === d.area);
    if (!grupo) areas.push((grupo = { area: d.area, itens: [] }));
    grupo.itens.push(d);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <BarraStatus />
      <ScrollView contentContainerStyle={s.conteudo}>
        {aviso && (
          <Cartao estilo={[s.aviso, aviso.tipo === 'perdeu' && { backgroundColor: cores.vermelhoClaro, borderColor: cores.vermelho }]} onPress={limparAviso}>
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
          <Barra valor={xp / p.metaDiaria} cor={xp >= p.metaDiaria ? cores.amarelo : cores.verde} />
          <Text style={s.cartaoSub}>
            {xp >= p.metaDiaria
              ? 'Meta batida! Cada XP extra é um bônus para a sua aprovação. 🏅'
              : estudouHoje(p)
                ? `Faltam ${p.metaDiaria - xp} XP para bater a meta de hoje.`
                : `Faça uma lição para manter sua ofensiva de ${p.ofensiva.atual} dia${p.ofensiva.atual === 1 ? '' : 's'}! 🔥`}
          </Text>
        </Cartao>

        <Cartao estilo={[s.desafio, desafioFeito && { backgroundColor: cores.fundoSuave, borderColor: cores.borda }]}>
          <Text style={[s.cartaoTitulo, { color: desafioFeito ? cores.textoSuave : '#FFF' }]}>⚔️ Desafio do dia</Text>
          <Text style={[s.cartaoSub, { color: desafioFeito ? cores.textoSuave : '#FFF', marginBottom: 12 }]}>
            {desafioFeito
              ? 'Concluído! Volte amanhã para um novo desafio. Você ainda pode treinar à vontade.'
              : `10 questões misturadas da trilha ${p.trilha === 'Todas' ? 'completa' : p.trilha}. Bônus de +${BONUS_DESAFIO} XP!`}
          </Text>
          <Botao
            testID="btn-desafio"
            titulo={desafioFeito ? 'Jogar de novo' : 'Começar desafio'}
            cor={desafioFeito ? cores.azul : '#FFFFFF'}
            corTexto={desafioFeito ? '#FFF' : cores.azul}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'desafio' } })}
          />
        </Cartao>

        {pendentes > 0 && (
          <Cartao estilo={s.revisao}>
            <Text style={s.cartaoTitulo}>🧠 Hora de revisar</Text>
            <Text style={[s.cartaoSub, { marginBottom: 12 }]}>
              {pendentes} {pendentes === 1 ? 'questão voltou' : 'questões voltaram'} para revisão hoje. Revisar no dia certo é o que fixa o
              conteúdo na memória.
            </Text>
            <Botao
              testID="btn-revisao-inicio"
              titulo="Revisar agora"
              cor={cores.roxo}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
            />
          </Cartao>
        )}

        {fraco && infoFraco && (
          <Cartao
            testID="cartao-fraco"
            estilo={s.fraco}
            onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos', topico: fraco.topicoId } })}
          >
            <Text style={s.cartaoSub}>🎯 Seu ponto fraco agora · {fraco.acerto}% de acerto</Text>
            <Text style={s.cartaoTitulo}>
              {infoFraco.disciplina.emoji} {infoFraco.topico.titulo}
            </Text>
            <Text style={[s.cartaoSub, { color: cores.vermelhoEscuro }]}>Toque para treinar este assunto ▶</Text>
          </Cartao>
        )}

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
                    estilo={[s.disc, { backgroundColor: clarear(d.cor, 0.12), borderColor: clarear(d.cor, 0.45) }]}
                    onPress={() => router.push({ pathname: '/disciplina/[id]', params: { id: d.id } })}
                  >
                    <Text style={s.discEmoji}>{d.emoji}</Text>
                    <Text style={s.discNome} numberOfLines={2}>
                      {d.nome}
                    </Text>
                    <Text style={s.discSub}>
                      {d.topicos.length} tópico{d.topicos.length > 1 ? 's' : ''} · {Math.round(dom * 100)}%
                    </Text>
                    <Barra valor={dom} cor={d.cor} altura={8} fundo="rgba(0,0,0,0.08)" />
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

const s = StyleSheet.create({
  conteudo: { padding: 16 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cartaoTitulo: { fontSize: 18, fontWeight: '800', color: cores.texto },
  cartaoValor: { fontSize: 15, fontWeight: '800', color: cores.textoSuave },
  cartaoSub: { fontSize: 14, color: cores.textoSuave, marginTop: 8, fontWeight: '600', lineHeight: 20 },
  desafio: { backgroundColor: cores.azul, borderColor: cores.azulEscuro, marginBottom: 14 },
  revisao: { backgroundColor: cores.roxoClaro, borderColor: '#D9B8FF', marginBottom: 14 },
  fraco: { backgroundColor: cores.vermelhoClaro, borderColor: '#FFB2B2', marginBottom: 14 },
  aviso: { backgroundColor: cores.azulClaro, borderColor: cores.azul, marginBottom: 14 },
  avisoTexto: { fontSize: 15, fontWeight: '700', color: cores.texto },
  avisoFechar: { fontSize: 12, color: cores.textoSuave, marginTop: 6 },
  area: { fontSize: 13, fontWeight: '800', color: cores.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  disc: { width: '48.5%', marginBottom: 12, padding: 14, gap: 4 },
  discEmoji: { fontSize: 30 },
  discNome: { fontSize: 16, fontWeight: '800', color: cores.texto, minHeight: 40 },
  discSub: { fontSize: 12, fontWeight: '700', color: cores.textoSuave, marginBottom: 4 },
});
