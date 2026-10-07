import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cursoDaProva, disciplinasDaProva, getTopico } from '../../data/banco';
import { getProva } from '../../data/provas';
import { diferencaDias, hoje } from '../../estado/datas';
import { useProgresso } from '../../estado/ProgressoContext';
import {
  BONUS_DESAFIO,
  coberturaPrazo,
  dominioTopico,
  estudouHoje,
  estudouTopicoHoje,
  gerarPlano,
  nivelSugerido,
  pontosFracos,
  revisoesPendentes,
  xpHoje,
} from '../../estado/progresso';
import { AvisoAtualizacao } from '../../ui/Atualizacao';
import { BarraStatus } from '../../ui/BarraStatus';
import { Barra, Botao, Cartao } from '../../ui/componentes';
import { ComIcone, Icone } from '../../ui/Icone';
import { clarear, criarEstilos, useCores } from '../../ui/tema';


export default function Inicio() {
  const c = useCores();
  const s = useEstilos();
  const { p, atualizar, aviso, limparAviso } = useProgresso();
  const prova = getProva(p.prova);
  const lista = disciplinasDaProva(p.prova, p.lingua);
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
  const cobertura = coberturaPrazo(p, dia);

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

        <Cartao testID="cartao-prova" estilo={[s.linhaProva, { marginBottom: 14 }]} onPress={() => router.push('/perfil')}>
          <Icone nome={prova.icone} tamanho={26} cor={c.azul} />
          <View style={{ flex: 1 }}>
            <Text style={s.cartaoSub0}>Estudando para</Text>
            <Text style={s.cartaoTitulo}>{prova.nome}</Text>
          </View>
          <Text style={s.trocar}>TROCAR</Text>
        </Cartao>

        {(() => {
          const curso = cursoDaProva(prova.id);
          if (!curso) return null;
          return (
            <Cartao testID="cartao-curso" estilo={[s.linhaProva, { marginBottom: 14 }]} onPress={() => router.push({ pathname: '/curso/[id]', params: { id: curso.id } })}>
              <Icone nome="school-outline" tamanho={26} cor="#2E7D5B" />
              <View style={{ flex: 1 }}>
                <Text style={s.cartaoSub0}>Grade do curso</Text>
                <Text style={s.cartaoTitulo}>Períodos, ementas e assuntos</Text>
              </View>
              <Icone nome="chevron-right" tamanho={24} cor={c.textoSuave} />
            </Cartao>
          );
        })()}

        <Cartao estilo={{ marginBottom: 14 }}>
          <View style={s.linha}>
            <ComIcone icone="target" cor={c.verde} estiloTexto={s.cartaoTitulo}>
              Meta diária
            </ComIcone>
            <Text style={s.cartaoValor}>
              {Math.min(xp, p.metaDiaria)}/{p.metaDiaria} XP
            </Text>
          </View>
          <Barra valor={xp / p.metaDiaria} cor={xp >= p.metaDiaria ? c.amarelo : c.verde} />
          <Text style={s.cartaoSub}>
            {xp >= p.metaDiaria
              ? 'Meta batida! Cada XP extra é um bônus para a sua aprovação.'
              : estudouHoje(p)
                ? `Faltam ${p.metaDiaria - xp} XP para bater a meta de hoje.`
                : `Faça uma lição para manter sua ofensiva de ${p.ofensiva.atual} dia${p.ofensiva.atual === 1 ? '' : 's'}!`}
          </Text>
        </Cartao>

        <Cartao testID="cartao-plano" estilo={{ marginBottom: 14 }}>
          {diasProva != null && diasProva >= 0 ? (
            <View style={s.contagem}>
              <Text style={s.contagemNumero}>{diasProva}</Text>
              <Text style={s.contagemTexto}>
                {diasProva === 0 ? 'É hoje! Boa prova!' : `dia${diasProva === 1 ? '' : 's'} para ${p.nomeProva.trim() || prova.nome}`}
              </Text>
            </View>
          ) : (
            <Pressable onPress={() => router.push('/perfil')} style={{ marginBottom: 8 }}>
              <ComIcone icone="calendar-clock" cor={c.textoSuave} estiloTexto={[s.cartaoSub, { marginTop: 0 }]}>
                Toque aqui para escolher um prazo (1 mês, 2 meses...) ou a data da sua prova. O plano passa a priorizar os assuntos que mais caem.
              </ComIcone>
            </Pressable>
          )}
          {cobertura && cobertura.diasDeEstudo > 0 && cobertura.vistos < cobertura.total && (
            <Text testID="texto-cobertura" style={[s.cartaoSub, { marginTop: 0, marginBottom: 10 }]}>
              {cobertura.cabem >= cobertura.total - cobertura.vistos
                ? `No ritmo de ${cobertura.porDia} assunto${cobertura.porDia > 1 ? 's' : ''} novo${cobertura.porDia > 1 ? 's' : ''} por dia, você passa pelos ${cobertura.total - cobertura.vistos} assuntos que faltam e ainda sobra a última semana para revisar.`
                : `No prazo, dá para ver ${cobertura.cabem} dos ${cobertura.total - cobertura.vistos} assuntos que faltam (${cobertura.porDia} por dia). O plano começa pelos que mais caem na prova.`}
            </Text>
          )}
          <View style={s.linha}>
            <ComIcone icone="clipboard-check-outline" cor={c.azul} estiloTexto={s.cartaoTitulo}>
              Plano de hoje
            </ComIcone>
            <Text style={s.cartaoValor}>
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
              texto={`Treinar ponto fraco: ${infoFraco.topico.titulo}`}
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
                icone={info.disciplina.icone}
                texto={info.topico.titulo}
                onPress={() => router.push({ pathname: '/licao', params: { modo: 'topico', topico: id, nivel: String(nivelSugerido(p, id)) } })}
              />
            );
          })}
          {itensPlano.length > 0 && feitos === itensPlano.length && <Text style={s.cartaoSub}>Plano do dia concluído! Amanhã tem mais.</Text>}
        </Cartao>

        {plano.length > 0 && (
          <Cartao testID="cartao-estudar" estilo={{ marginBottom: 14 }}>
            <ComIcone icone="book-open-page-variant-outline" cor={c.roxo} estiloTexto={s.cartaoTitulo}>
              Estude antes de praticar
            </ComIcone>
            <Text style={s.cartaoSub}>A teoria dos assuntos das questões de hoje. Leia primeiro e depois faça as questões.</Text>
            {[...(fraco ? [fraco.topicoId] : []), ...plano].map((id) => {
              const info = getTopico(id);
              if (!info || !(info.topico.resumo || info.topico.aula)) return null;
              return (
                <Pressable
                  key={id}
                  testID={`estudar-${id}`}
                  onPress={() => router.push({ pathname: '/resumo', params: { topico: id } })}
                  style={s.itemEstudo}
                >
                  <Icone nome={info.disciplina.icone} tamanho={22} cor={info.disciplina.cor} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.itemEstudoTitulo}>{info.topico.titulo}</Text>
                    <Text style={s.itemEstudoSub}>{info.topico.aula ? 'Aula completa + resumo' : 'Resumo em 2 minutos'}</Text>
                  </View>
                  <Icone nome="chevron-right" tamanho={22} cor={c.textoSuave} />
                </Pressable>
              );
            })}
          </Cartao>
        )}

        <Cartao estilo={[s.desafio, desafioFeito && { backgroundColor: c.fundoSuave, borderColor: c.borda }]}>
          <ComIcone icone="sword-cross" cor={desafioFeito ? c.textoSuave : '#FFF'} estiloTexto={[s.cartaoTitulo, { color: desafioFeito ? c.textoSuave : '#FFF' }]}>
            Desafio do dia
          </ComIcone>
          <Text style={[s.cartaoSub, { color: desafioFeito ? c.textoSuave : '#FFF', marginBottom: 12 }]}>
            {desafioFeito
              ? 'Concluído! Volte amanhã para um novo desafio. Você ainda pode treinar à vontade.'
              : `10 questões misturadas das matérias de ${prova.nome}. Bônus de +${BONUS_DESAFIO} XP!`}
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
            <ComIcone icone={ultimo.disciplina.icone} cor={ultimo.disciplina.cor} estiloTexto={s.cartaoTitulo}>
              {ultimo.topico.titulo}
            </ComIcone>
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
                    <Icone nome={d.icone} tamanho={30} cor={d.cor} />
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

function ItemPlano({ texto, icone, feito, onPress, testID }: { texto: string; icone: string; feito: boolean; onPress: () => void; testID?: string }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [s.itemPlano, pressed && { opacity: 0.6 }]}>
      <Icone nome={feito ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'} tamanho={22} cor={feito ? c.verde : c.cinza} />
      <Icone nome={icone} tamanho={18} cor={c.textoSuave} />
      <Text style={[s.itemTexto, feito && { color: c.textoSuave, textDecorationLine: 'line-through' }]} numberOfLines={2}>
        {texto}
      </Text>
      {!feito && <Icone nome="chevron-right" tamanho={22} cor={c.azul} />}
    </Pressable>
  );
}

const useEstilos = criarEstilos((c) => ({
  itemEstudo: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: c.borda },
  itemEstudoTitulo: { fontSize: 15, fontWeight: '800', color: c.texto },
  itemEstudoSub: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginTop: 2 },
  contagem: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 10 },
  contagemNumero: { fontSize: 36, fontWeight: '800', color: c.laranja },
  contagemTexto: { flex: 1, fontSize: 16, fontWeight: '800', color: c.texto },
  itemPlano: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: c.borda },
  itemTexto: { flex: 1, fontSize: 15, fontWeight: '700', color: c.texto },
  conteudo: { padding: 16 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cartaoTitulo: { fontSize: 18, fontWeight: '800', color: c.texto },
  cartaoValor: { fontSize: 15, fontWeight: '800', color: c.textoSuave },
  linhaProva: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  cartaoSub0: { fontSize: 12, fontWeight: '700', color: c.textoSuave },
  trocar: { fontSize: 13, fontWeight: '800', color: c.azul },
  cartaoSub: { fontSize: 14, color: c.textoSuave, marginTop: 8, fontWeight: '600', lineHeight: 20 },
  desafio: { backgroundColor: c.azul, borderColor: c.azulEscuro, marginBottom: 14 },
  aviso: { backgroundColor: c.azulClaro, borderColor: c.azul, marginBottom: 14 },
  avisoTexto: { fontSize: 15, fontWeight: '700', color: c.texto },
  avisoFechar: { fontSize: 12, color: c.textoSuave, marginTop: 6 },
  area: { fontSize: 13, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  disc: { width: '48.5%', marginBottom: 12, padding: 14, gap: 4 },
  discNome: { fontSize: 16, fontWeight: '800', color: c.texto, minHeight: 40 },
  discSub: { fontSize: 12, fontWeight: '700', color: c.textoSuave, marginBottom: 4 },
}));
