import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTopico } from '../../data/banco';
import { getProva } from '../../data/provas';
import { diaDaSemana, diferencaDias, hoje, somarDias } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import {
  BONUS_DESAFIO,
  estudouHoje,
  estudouTopicoHoje,
  gerarPlano,
  nivelDoUsuario,
  nivelSugerido,
  pontosFracos,
  revisoesPendentes,
  xpHoje,
} from '../../estado/progresso';
import { AvisoAtualizacao } from '../../ui/Atualizacao';
import { Barra, Cartao } from '../../ui/componentes';
import { ComIcone, Icone } from '../../ui/Icone';
import { criarEstilos, useCores } from '../../ui/tema';

function saudacao() {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}

/** Tela inicial: um resumo dos números do aluno e o que fazer hoje. */
export default function Inicio() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar, aviso, limparAviso } = useProgresso();
  const prova = getProva(p.prova);
  const dia = hoje();
  const xp = xpHoje(p);
  const n = nivelDoUsuario(p.xpTotal);
  const est = Object.values(p.questoes);
  const acertos = est.reduce((soma, q) => soma + q.acertos, 0);
  const respostas = acertos + est.reduce((soma, q) => soma + q.erros, 0);
  const diasProva = p.dataProva ? diferencaDias(dia, p.dataProva) : null;
  const semana = Array.from({ length: 7 }, (_, i) => somarDias(dia, i - 6));
  const maximoSemana = Math.max(p.metaDiaria, ...semana.map((d) => p.xpPorDia[d] ?? 0));

  const desafioFeito = !!p.desafiosFeitos[dia];
  const ultimo = p.ultimoTopico ? getTopico(p.ultimoTopico) : undefined;
  const pendentes = revisoesPendentes(p).length;
  const plano = p.planoDia?.dia === dia ? p.planoDia.topicos.filter((id) => getTopico(id)) : [];
  // o ponto fraco só vira item separado se não for um dos assuntos do plano
  const fraco = pontosFracos(p).find((f) => !plano.includes(f.topicoId));
  const infoFraco = fraco ? getTopico(fraco.topicoId) : undefined;

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
  const temTeoria = (id: string) => {
    const info = getTopico(id);
    return !!info && !!(info.topico.resumo || info.topico.aula);
  };
  const estudar = (id: string) => router.push({ pathname: '/resumo', params: { topico: id } });
  const nome = p.nome.trim().split(/\s+/)[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.fundo }} edges={['top']}>
      <ScrollView contentContainerStyle={s.conteudo}>
        <AvisoAtualizacao />
        {aviso && (
          <Cartao estilo={[s.aviso, aviso.tipo === 'perdeu' && { backgroundColor: c.vermelhoClaro, borderColor: c.vermelho }]} onPress={limparAviso}>
            <ComIcone icone={aviso.tipo === 'protetor' ? 'shield-check-outline' : 'fire-off'} estiloTexto={s.avisoTexto}>
              {aviso.tipo === 'protetor'
                ? `Seu protetor de ofensiva foi usado (${aviso.dias} dia${aviso.dias === 1 ? '' : 's'}). A ofensiva continua!`
                : 'Você perdeu sua ofensiva. Faça uma lição hoje para começar uma nova!'}
            </ComIcone>
            <Text style={s.avisoFechar}>Toque para fechar</Text>
          </Cartao>
        )}

        <View style={s.topo}>
          <View style={{ flex: 1 }}>
            <Text style={s.ola} numberOfLines={1}>
              {saudacao()}
              {nome ? `, ${nome}` : ''}!
            </Text>
            <Pressable testID="cartao-prova" onPress={() => router.push('/perfil')} hitSlop={6}>
              <Text style={s.prova} numberOfLines={1}>
                {prova.nome}
                {diasProva != null && diasProva >= 0 ? (diasProva === 0 ? ' · a prova é hoje!' : ` · faltam ${diasProva} dia${diasProva === 1 ? '' : 's'}`) : ''}
              </Text>
            </Pressable>
          </View>
          <View style={s.moedas} accessibilityLabel={`Moedas: ${p.moedas}`}>
            <Icone nome="diamond-stone" tamanho={18} cor={c.azul} />
            <Text style={[s.moedasTexto, { color: c.azul }]}>{p.moedas}</Text>
          </View>
        </View>

        {/* Resumo das estatísticas: o que o aluno vê primeiro ao abrir o app */}
        <Cartao testID="cartao-resumo" estilo={{ marginBottom: 14 }} onPress={() => router.push('/progresso')}>
          <View style={s.numeros}>
            <Numero icone="fire" cor={estudouHoje(p) ? c.laranja : c.cinza} valor={p.ofensiva.atual} rotulo={p.ofensiva.atual === 1 ? 'dia seguido' : 'dias seguidos'} />
            <Numero icone="target" cor={c.verde} valor={respostas ? `${Math.round((acertos / respostas) * 100)}%` : '—'} rotulo="de acerto" />
            <Numero icone="pencil-outline" cor={c.roxo} valor={respostas} rotulo={respostas === 1 ? 'resposta' : 'respostas'} />
          </View>

          <View style={s.linha}>
            <ComIcone icone="star" cor={c.amarelo} tamanho={18} estilo={{ gap: 4 }} estiloTexto={s.rotuloLinha}>
              Nível {n.nivel}
            </ComIcone>
            <Text style={s.valorLinha}>
              {n.xpNoNivel}/{n.xpParaProximo} XP
            </Text>
          </View>
          <Barra valor={n.xpNoNivel / n.xpParaProximo} cor={c.amarelo} altura={10} />

          <View style={[s.linha, { marginTop: 12 }]}>
            <ComIcone icone="lightning-bolt" cor={c.verde} tamanho={18} estilo={{ gap: 4 }} estiloTexto={s.rotuloLinha}>
              Meta de hoje
            </ComIcone>
            <Text style={s.valorLinha}>
              {Math.min(xp, p.metaDiaria)}/{p.metaDiaria} XP
            </Text>
          </View>
          <Barra valor={xp / p.metaDiaria} cor={xp >= p.metaDiaria ? c.amarelo : c.verde} altura={10} />

          <View style={s.semana}>
            {semana.map((d) => {
              const v = p.xpPorDia[d] ?? 0;
              return (
                <View key={d} style={s.coluna}>
                  <View style={s.trilho}>
                    {v > 0 && <View style={{ height: `${Math.max((v / maximoSemana) * 100, 8)}%`, backgroundColor: v >= p.metaDiaria ? c.amarelo : c.azul, borderRadius: 4 }} />}
                  </View>
                  <Text style={[s.diaSemana, d === dia && { color: c.azul }]}>{diaDaSemana(d)}</Text>
                </View>
              );
            })}
          </View>

          <View style={s.verMais}>
            <Text style={s.verMaisTexto}>Ver evolução, conquistas e dificuldades</Text>
            <Icone nome="chevron-right" tamanho={20} cor={c.azul} />
          </View>
        </Cartao>

        <Cartao testID="cartao-plano" estilo={{ marginBottom: 14 }}>
          <View style={[s.linha, { marginBottom: 4 }]}>
            <ComIcone icone="clipboard-check-outline" cor={c.azul} estiloTexto={s.titulo}>
              Plano de hoje
            </ComIcone>
            <Text style={s.valorLinha}>
              {feitos}/{itensPlano.length}
            </Text>
          </View>
          {pendentes > 0 && (
            <ItemPlano
              feito={false}
              icone="brain"
              texto={`Revisar ${pendentes} ${pendentes === 1 ? 'questão' : 'questões'}`}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'revisao' } })}
            />
          )}
          {fraco && infoFraco && (
            <ItemPlano
              feito={estudouTopicoHoje(p, fraco.topicoId)}
              icone="target"
              texto={`Ponto fraco: ${infoFraco.topico.titulo}`}
              onPress={() => router.push({ pathname: '/licao', params: { modo: 'fracos', topico: fraco.topicoId } })}
              onEstudar={temTeoria(fraco.topicoId) ? () => estudar(fraco.topicoId) : undefined}
            />
          )}
          {plano.map((id) => {
            const info = getTopico(id)!;
            return (
              <ItemPlano
                key={id}
                testID={`plano-${id}`}
                feito={estudouTopicoHoje(p, id)}
                icone={info.disciplina.icone}
                texto={info.topico.titulo}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'topico', topico: id, nivel: String(nivelSugerido(p, id)) } })}
                onEstudar={temTeoria(id) ? () => estudar(id) : undefined}
              />
            );
          })}
          {itensPlano.length > 0 && feitos === itensPlano.length ? (
            <Text style={s.dica}>Plano do dia concluído! Amanhã tem mais.</Text>
          ) : plano.some(temTeoria) ? (
            <ComIcone icone="book-open-page-variant-outline" cor={c.roxo} tamanho={16} estilo={{ gap: 6, marginTop: 8 }} estiloTexto={s.dica}>
              Toque no livro para ler a teoria antes das questões.
            </ComIcone>
          ) : null}
          {!p.dataProva && (
            <Text style={[s.dica, { color: c.azul }]} onPress={() => router.push('/perfil')}>
              Defina a data da prova no Perfil para o plano priorizar o que mais cai.
            </Text>
          )}
        </Cartao>

        <Cartao estilo={[s.atalho, !desafioFeito && { backgroundColor: c.azul, borderColor: c.azulEscuro }]} onPress={() => router.push({ pathname: '/licao', params: { modo: 'desafio' } })} testID="btn-desafio">
          <Icone nome={desafioFeito ? 'check-circle' : 'sword-cross'} tamanho={26} cor={desafioFeito ? c.verde : '#FFF'} />
          <View style={{ flex: 1 }}>
            <Text style={[s.atalhoTitulo, !desafioFeito && { color: '#FFF' }]}>Desafio do dia</Text>
            <Text style={[s.atalhoSub, !desafioFeito && { color: '#FFF' }]}>
              {desafioFeito ? 'Concluído! Toque para jogar de novo.' : `10 questões misturadas · +${BONUS_DESAFIO} XP`}
            </Text>
          </View>
          <Icone nome="chevron-right" tamanho={24} cor={desafioFeito ? c.textoSuave : '#FFF'} />
        </Cartao>

        {ultimo && (
          <Cartao estilo={s.atalho} onPress={() => router.push({ pathname: '/disciplina/[id]', params: { id: ultimo.disciplina.id } })}>
            <Icone nome={ultimo.disciplina.icone} tamanho={26} cor={ultimo.disciplina.cor} />
            <View style={{ flex: 1 }}>
              <Text style={s.atalhoSub}>Continuar de onde parou</Text>
              <Text style={s.atalhoTitulo} numberOfLines={1}>
                {ultimo.topico.titulo}
              </Text>
            </View>
            <Icone nome="chevron-right" tamanho={24} cor={c.textoSuave} />
          </Cartao>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Numero({ icone, cor, valor, rotulo }: { icone: string; cor: string; valor: string | number; rotulo: string }) {
  const s = useEstilos();
  return (
    <View style={s.numero}>
      <Icone nome={icone} tamanho={26} cor={cor} />
      <Text style={s.numeroValor}>{valor}</Text>
      <Text style={s.numeroRotulo}>{rotulo}</Text>
    </View>
  );
}

function ItemPlano({
  texto,
  icone,
  feito,
  onPress,
  onEstudar,
  testID,
}: {
  texto: string;
  icone: string;
  feito: boolean;
  onPress: () => void;
  onEstudar?: () => void;
  testID?: string;
}) {
  const c = useCores();
  const s = useEstilos();
  return (
    <View style={s.itemPlano}>
      <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [s.itemToque, pressed && { opacity: 0.6 }]}>
        <Icone nome={feito ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'} tamanho={22} cor={feito ? c.verde : c.cinza} />
        <Icone nome={icone} tamanho={18} cor={c.textoSuave} />
        <Text style={[s.itemTexto, feito && { color: c.textoSuave, textDecorationLine: 'line-through' }]} numberOfLines={2}>
          {texto}
        </Text>
      </Pressable>
      {onEstudar && (
        <Pressable onPress={onEstudar} hitSlop={8} accessibilityLabel="Ler a teoria" style={({ pressed }) => [s.livro, pressed && { opacity: 0.6 }]}>
          <Icone nome="book-open-page-variant-outline" tamanho={20} cor={c.roxo} />
        </Pressable>
      )}
      {!feito && (
        <Pressable onPress={onPress} hitSlop={8}>
          <Icone nome="chevron-right" tamanho={22} cor={c.azul} />
        </Pressable>
      )}
    </View>
  );
}

const useEstilos = criarEstilos((c) => ({
  conteudo: { padding: 16 },
  topo: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  ola: { fontSize: 24, fontWeight: '800', color: c.texto },
  prova: { fontSize: 14, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
  moedas: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, backgroundColor: c.fundoSuave },
  moedasTexto: { fontSize: 15, fontWeight: '800' },
  numeros: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  numero: { flex: 1, alignItems: 'center' },
  numeroValor: { fontSize: 22, fontWeight: '800', color: c.texto, marginTop: 2 },
  numeroRotulo: { fontSize: 12, fontWeight: '700', color: c.textoSuave },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  rotuloLinha: { fontSize: 15, fontWeight: '800', color: c.texto },
  valorLinha: { fontSize: 14, fontWeight: '800', color: c.textoSuave },
  semana: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  coluna: { flex: 1, alignItems: 'center' },
  trilho: { width: 16, height: 40, justifyContent: 'flex-end', backgroundColor: c.fundoSuave, borderRadius: 4 },
  diaSemana: { fontSize: 11, fontWeight: '800', color: c.textoSuave, marginTop: 4 },
  verMais: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: c.borda },
  verMaisTexto: { fontSize: 14, fontWeight: '800', color: c.azul },
  titulo: { fontSize: 18, fontWeight: '800', color: c.texto },
  itemPlano: { flexDirection: 'row', alignItems: 'center', gap: 8, borderTopWidth: 1, borderTopColor: c.borda },
  itemToque: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  itemTexto: { flex: 1, fontSize: 15, fontWeight: '700', color: c.texto },
  livro: { padding: 6, borderRadius: 10, backgroundColor: c.roxoClaro },
  dica: { fontSize: 13, fontWeight: '700', color: c.textoSuave, marginTop: 8, lineHeight: 18 },
  atalho: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, marginBottom: 14 },
  atalhoTitulo: { fontSize: 16, fontWeight: '800', color: c.texto },
  atalhoSub: { fontSize: 13, fontWeight: '700', color: c.textoSuave },
  aviso: { backgroundColor: c.azulClaro, borderColor: c.azul, marginBottom: 14 },
  avisoTexto: { fontSize: 15, fontWeight: '700', color: c.texto },
  avisoFechar: { fontSize: 12, color: c.textoSuave, marginTop: 6 },
}));
