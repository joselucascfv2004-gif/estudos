// Rascunho digital: o botão fica entre o enunciado e as alternativas. Ele abre uma folha
// quadriculada para fazer contas à mão, com o enunciado (recolhível) em cima e as alternativas
// numa faixa embaixo, sem cobrir a área de desenho. O rascunho fica guardado enquanto o aluno
// estiver na mesma lição ou simulado.

import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EstadoFolha, FolhaDesenho, FolhaRef } from './FolhaDesenho';
import { Icone } from './Icone';
import { TextoQuestao, semImagens, temImagem } from './Imagens';
import { TextoRico } from './Markdown';
import { criarEstilos, useCores } from './tema';

const LETRAS = 'ABCDE';
const CORES_TINTA = ['#1F2937', '#1D4ED8', '#DC2626'];

const memoria = new Map<string, string>();

/** Apaga todos os rascunhos guardados (chamado quando a lição ou o simulado termina). */
export function limparRascunhos() {
  memoria.clear();
}

function temRascunho(id: string) {
  const t = memoria.get(id);
  return !!t && t !== '[]';
}

/** Botão "Rascunho" + a folha. Coloque entre o enunciado e as alternativas. */
export function Rascunho({
  id,
  enunciado,
  alternativas,
  escolha,
  aoEscolher,
  bloqueado,
}: {
  id: string;
  enunciado: string;
  /** textos das alternativas, já na ordem em que aparecem na tela */
  alternativas: string[];
  escolha: number | null;
  aoEscolher?: (i: number) => void;
  bloqueado?: boolean;
}) {
  const c = useCores();
  const s = useEstilos();
  const [aberto, setAberto] = useState(false);
  const [, forcar] = useState(0);
  const usado = temRascunho(id);

  return (
    <>
      <Pressable
        testID="btn-rascunho"
        onPress={() => setAberto(true)}
        style={({ pressed }) => [s.botao, usado && s.botaoUsado, pressed && { opacity: 0.6 }]}
        accessibilityLabel="Abrir rascunho"
      >
        <Icone nome="draw" tamanho={20} cor={usado ? c.roxo : c.azulEscuro} />
        <Text style={[s.botaoTexto, usado && { color: c.roxo }]}>{usado ? 'Rascunho (continuar)' : 'Rascunho'}</Text>
      </Pressable>
      {aberto && (
        <TelaRascunho
          id={id}
          enunciado={enunciado}
          alternativas={alternativas}
          escolha={escolha}
          aoEscolher={aoEscolher}
          bloqueado={bloqueado}
          fechar={() => {
            setAberto(false);
            forcar((n) => n + 1);
          }}
        />
      )}
    </>
  );
}

function TelaRascunho({
  id,
  enunciado,
  alternativas,
  escolha,
  aoEscolher,
  bloqueado,
  fechar,
}: {
  id: string;
  enunciado: string;
  alternativas: string[];
  escolha: number | null;
  aoEscolher?: (i: number) => void;
  bloqueado?: boolean;
  fechar: () => void;
}) {
  const c = useCores();
  const s = useEstilos();
  const { height } = useWindowDimensions();
  const folha = useRef<FolhaRef>(null);
  const [inicial] = useState(() => memoria.get(id) ?? '[]');
  const [estado, setEstado] = useState<Omit<EstadoFolha, 'tracos'>>({ podeDesfazer: inicial !== '[]', podeRefazer: false });
  const [ferramenta, setFerramenta] = useState<'caneta' | 'borracha'>('caneta');
  const [cor, setCor] = useState(CORES_TINTA[0]);
  const [enunciadoAberto, setEnunciadoAberto] = useState(false);
  const [mostrarQuestao, setMostrarQuestao] = useState(true);

  function aoMudar(e: EstadoFolha) {
    memoria.set(id, e.tracos);
    setEstado({ podeDesfazer: e.podeDesfazer, podeRefazer: e.podeRefazer });
  }

  return (
    <Modal visible animationType="slide" onRequestClose={fechar} statusBarTranslucent={false}>
      <SafeAreaView style={s.tela} edges={['top', 'bottom', 'left', 'right']}>
        {/* barra de ferramentas */}
        <View style={s.topo}>
          <Pressable testID="btn-fechar-rascunho" onPress={fechar} hitSlop={10} accessibilityLabel="Fechar rascunho" style={s.fechar}>
            <Icone nome="close" tamanho={26} cor={c.cinza} />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.ferramentas}>
            {CORES_TINTA.map((k) => (
              <Pressable
                key={k}
                accessibilityLabel="Cor da caneta"
                onPress={() => {
                  setCor(k);
                  setFerramenta('caneta');
                  folha.current?.comando({ tipo: 'cor', valor: k });
                }}
                style={[s.tinta, { backgroundColor: k }, ferramenta === 'caneta' && cor === k && s.tintaAtiva]}
              />
            ))}
            <Ferramenta
              rotulo="Borracha"
              icone="eraser"
              ativo={ferramenta === 'borracha'}
              onPress={() => {
                setFerramenta('borracha');
                folha.current?.comando({ tipo: 'ferramenta', valor: 'borracha' });
              }}
            />
            <Ferramenta rotulo="Desfazer" icone="undo" desativado={!estado.podeDesfazer} onPress={() => folha.current?.comando({ tipo: 'desfazer' })} />
            <Ferramenta rotulo="Refazer" icone="redo" desativado={!estado.podeRefazer} onPress={() => folha.current?.comando({ tipo: 'refazer' })} />
            <Ferramenta rotulo="Apagar tudo" icone="delete-outline" desativado={!estado.podeDesfazer} onPress={() => folha.current?.comando({ tipo: 'limpar' })} />
            <Ferramenta
              rotulo={mostrarQuestao ? 'Esconder a questão' : 'Mostrar a questão'}
              icone={mostrarQuestao ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setMostrarQuestao((v) => !v)}
            />
          </ScrollView>
        </View>

        {/* enunciado recolhível */}
        {mostrarQuestao && (
          <View style={s.enunciadoCaixa}>
            <Pressable onPress={() => setEnunciadoAberto((v) => !v)} style={s.enunciadoCabeca} testID="btn-enunciado-rascunho">
              <Text style={s.rotulo}>Enunciado</Text>
              <Icone nome={enunciadoAberto ? 'chevron-up' : 'chevron-down'} tamanho={20} cor={c.textoSuave} />
            </Pressable>
            {enunciadoAberto ? (
              <ScrollView style={{ maxHeight: height * 0.38 }} contentContainerStyle={{ paddingBottom: 6 }}>
                <TextoQuestao texto={enunciado} estilo={s.enunciado} />
              </ScrollView>
            ) : (
              <Pressable onPress={() => setEnunciadoAberto(true)}>
                <TextoRico texto={semImagens(enunciado).replace(/\s*\n\s*/g, ' ').trim()} estilo={s.enunciado} linhas={3} />
                {temImagem(enunciado) && <Text style={s.dica}>Toque para ver a figura</Text>}
              </Pressable>
            )}
          </View>
        )}

        {/* folha de desenho */}
        <View style={s.folha}>
          <FolhaDesenho ref={folha} inicial={inicial} aoMudar={aoMudar} />
          {!estado.podeDesfazer && (
            <View pointerEvents="none" style={s.aviso}>
              <Text style={s.avisoTexto}>Escreva com um dedo · role a folha com dois dedos</Text>
            </View>
          )}
        </View>

        {/* alternativas */}
        {mostrarQuestao && alternativas.length > 0 && (
          <View style={s.alternativas}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 10 }}>
              {alternativas.map((alt, i) => {
                const marcada = escolha === i;
                const figura = /^!\[/.test(alt.trim());
                return (
                  <Pressable
                    key={i}
                    testID={`rascunho-alt-${i}`}
                    disabled={bloqueado || !aoEscolher}
                    onPress={() => aoEscolher?.(i)}
                    style={[s.alt, marcada && s.altMarcada]}
                  >
                    <Text style={[s.letra, marcada && { color: c.azulEscuro }]}>{LETRAS[i]}</Text>
                    {figura ? (
                      <Text style={s.altTexto}>(figura)</Text>
                    ) : (
                      <TextoRico texto={alt} estilo={s.altTexto} linhas={2} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

function Ferramenta({ icone, ativo, onPress, desativado, rotulo }: { icone: string; ativo?: boolean; onPress: () => void; desativado?: boolean; rotulo: string }) {
  const c = useCores();
  const s = useEstilos();
  return (
    <Pressable
      accessibilityLabel={rotulo}
      onPress={onPress}
      disabled={desativado}
      hitSlop={4}
      style={({ pressed }) => [s.ferramenta, ativo && s.ferramentaAtiva, (pressed || desativado) && { opacity: 0.35 }]}
    >
      <Icone nome={icone} tamanho={22} cor={ativo ? c.azulEscuro : c.texto} />
    </Pressable>
  );
}

const useEstilos = criarEstilos((c) => ({
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: c.azulBorda,
    backgroundColor: c.azulClaro,
    marginTop: 4,
    marginBottom: 6,
  },
  botaoUsado: { borderColor: c.roxoBorda, backgroundColor: c.roxoClaro },
  botaoTexto: { color: c.azulEscuro, fontWeight: '800', fontSize: 15 },
  tela: { flex: 1, backgroundColor: c.fundo },
  topo: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: c.borda, paddingLeft: 8 },
  fechar: { padding: 6 },
  ferramentas: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 6 },
  ferramenta: { padding: 7, borderRadius: 10 },
  ferramentaAtiva: { backgroundColor: c.azulClaro },
  tinta: { width: 26, height: 26, borderRadius: 13, borderWidth: 3, borderColor: 'transparent', marginHorizontal: 2 },
  tintaAtiva: { borderColor: c.azul },
  enunciadoCaixa: { backgroundColor: c.fundoSuave, paddingHorizontal: 14, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: c.borda },
  enunciadoCabeca: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, paddingBottom: 2 },
  rotulo: { fontSize: 12, fontWeight: '800', color: c.textoSuave, textTransform: 'uppercase', letterSpacing: 0.5 },
  enunciado: { fontSize: 14.5, lineHeight: 21, color: c.texto },
  dica: { fontSize: 12, color: c.azulEscuro, marginTop: 2 },
  folha: { flex: 1, borderBottomWidth: 1, borderBottomColor: c.borda },
  aviso: { position: 'absolute', top: 10, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  avisoTexto: { fontSize: 12, color: '#777777' },
  alternativas: { backgroundColor: c.fundoSuave, paddingVertical: 8 },
  alt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: 230,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: c.borda,
    backgroundColor: c.fundo,
  },
  altMarcada: { borderColor: c.azul, backgroundColor: c.azulClaro },
  letra: { fontWeight: '800', color: c.textoSuave, fontSize: 14 },
  altTexto: { fontSize: 13.5, color: c.texto, flexShrink: 1 },
}));
