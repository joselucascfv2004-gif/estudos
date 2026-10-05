// Provas-alvo: cada uma define quais disciplinas (e tópicos) entram no estudo do aluno.
// Baseado nos editais mais recentes de cada prova. Os editais mudam: confira sempre o do seu concurso.

export type GrupoProva = 'ENEM' | 'Militares' | 'Concursos' | 'Todas';

type Materia = { disciplina: string; topicos?: string[] };

export type ProvaAlvo = {
  id: string;
  nome: string;
  grupo: GrupoProva;
  icone: string;
  descricao: string;
  /** matérias cobradas; sem esta lista, entram os tópicos marcados com o grupo (ou todos, em "Todas") */
  materias?: Materia[];
};

const MAT_BASICA = ['numeros-e-operacoes', 'porcentagem', 'razao-proporcao-regra-de-tres', 'equacoes-e-sistemas', 'grandezas-medidas-escalas', 'fracoes-fatoracao-e-produtos-notaveis', 'potenciacao-e-radiciacao', 'divisibilidade-primos-mdc-e-mmc'];
const MAT_BANCARIA = [...MAT_BASICA, 'funcoes-afim-e-quadratica', 'progressoes', 'estatistica', 'analise-combinatoria', 'probabilidade'];
const HIST_BRASIL = ['brasil-colonia', 'brasil-imperio', 'brasil-republica', 'ditadura-e-redemocratizacao'];

export const PROVAS: ProvaAlvo[] = [
  { id: 'enem', nome: 'ENEM', grupo: 'ENEM', icone: 'school-outline', descricao: 'Todas as áreas do ENEM e dos vestibulares' },
  {
    id: 'espcex',
    nome: 'EsPCEx',
    grupo: 'Militares',
    icone: 'shield-outline',
    descricao: 'Escola de Cadetes do Exército: Português, Matemática, Física, Química, História, Geografia, Inglês e Redação',
    materias: [
      { disciplina: 'portugues' },
      { disciplina: 'literatura' },
      { disciplina: 'redacao' },
      { disciplina: 'matematica' },
      { disciplina: 'fisica' },
      { disciplina: 'quimica' },
      { disciplina: 'historia' },
      { disciplina: 'geografia' },
      { disciplina: 'ingles' },
    ],
  },
  {
    id: 'esa',
    nome: 'ESA',
    grupo: 'Militares',
    icone: 'shield-outline',
    descricao: 'Sargentos do Exército: Português, Matemática, História e Geografia do Brasil, Inglês e Redação',
    materias: [
      { disciplina: 'portugues' },
      { disciplina: 'redacao' },
      { disciplina: 'matematica', topicos: [...MAT_BANCARIA, 'exponencial-e-logaritmo', 'geometria-plana', 'geometria-espacial', 'trigonometria', 'matrizes-e-determinantes', 'geometria-analitica', 'numeros-complexos-e-polinomios', 'modulo-e-funcao-modular', 'funcao-composta-e-inversa', 'binomio-de-newton', 'semelhanca-de-triangulos', 'circunferencia-e-circulo'] },
      { disciplina: 'historia', topicos: HIST_BRASIL },
      { disciplina: 'geografia' },
      { disciplina: 'ingles' },
    ],
  },
  {
    id: 'eear',
    nome: 'EEAR',
    grupo: 'Militares',
    icone: 'airplane',
    descricao: 'Sargentos da Aeronáutica: Português, Inglês, Matemática e Física',
    materias: [{ disciplina: 'portugues' }, { disciplina: 'ingles' }, { disciplina: 'matematica' }, { disciplina: 'fisica' }],
  },
  {
    id: 'afa',
    nome: 'AFA',
    grupo: 'Militares',
    icone: 'airplane',
    descricao: 'Academia da Força Aérea: Matemática, Física, Português, Inglês e Redação',
    materias: [{ disciplina: 'matematica' }, { disciplina: 'fisica' }, { disciplina: 'portugues' }, { disciplina: 'ingles' }, { disciplina: 'redacao' }],
  },
  {
    id: 'escola-naval',
    nome: 'Escola Naval',
    grupo: 'Militares',
    icone: 'anchor',
    descricao: 'Marinha (oficiais): Matemática, Física, Português, Inglês e Redação',
    materias: [{ disciplina: 'matematica' }, { disciplina: 'fisica' }, { disciplina: 'portugues' }, { disciplina: 'ingles' }, { disciplina: 'redacao' }],
  },
  {
    id: 'banco-do-brasil',
    nome: 'Banco do Brasil',
    grupo: 'Concursos',
    icone: 'bank-outline',
    descricao: 'Escriturário: Português, Inglês, Matemática, Matemática Financeira, Probabilidade e Estatística, Conhecimentos Bancários, Informática e Vendas',
    materias: [
      { disciplina: 'portugues' },
      { disciplina: 'ingles', topicos: ['leitura-e-interpretacao'] },
      { disciplina: 'matematica', topicos: MAT_BANCARIA },
      { disciplina: 'matematica-financeira' },
      { disciplina: 'conhecimentos-bancarios' },
      { disciplina: 'informatica' },
    ],
  },
  {
    id: 'caixa',
    nome: 'Caixa',
    grupo: 'Concursos',
    icone: 'bank-outline',
    descricao: 'Técnico Bancário: Português, Matemática, Matemática Financeira, Conhecimentos Bancários, Informática e Atendimento',
    materias: [
      { disciplina: 'portugues' },
      { disciplina: 'matematica', topicos: MAT_BANCARIA },
      { disciplina: 'matematica-financeira' },
      { disciplina: 'conhecimentos-bancarios' },
      { disciplina: 'informatica' },
    ],
  },
  {
    id: 'bnb',
    nome: 'Banco do Nordeste',
    grupo: 'Concursos',
    icone: 'bank-outline',
    descricao: 'Analista Bancário: Português, Matemática, Matemática Financeira, Conhecimentos Bancários, Informática e Vendas',
    materias: [
      { disciplina: 'portugues' },
      { disciplina: 'matematica', topicos: MAT_BANCARIA },
      { disciplina: 'matematica-financeira' },
      { disciplina: 'conhecimentos-bancarios' },
      { disciplina: 'informatica' },
    ],
  },
  {
    id: 'ibge',
    nome: 'IBGE',
    grupo: 'Concursos',
    icone: 'chart-box-outline',
    descricao: 'Agente e Recenseador: Português, Matemática, Raciocínio Lógico, Ética e noções de Geografia',
    materias: [
      { disciplina: 'portugues' },
      { disciplina: 'matematica', topicos: [...MAT_BASICA, 'estatistica'] },
      { disciplina: 'raciocinio-logico' },
      { disciplina: 'etica' },
      { disciplina: 'geografia', topicos: ['cartografia', 'populacao-e-urbanizacao'] },
    ],
  },
  { id: 'concursos', nome: 'Concursos (geral)', grupo: 'Concursos', icone: 'briefcase-outline', descricao: 'Todas as matérias de concursos do app' },
  { id: 'todas', nome: 'Tudo', grupo: 'Todas', icone: 'view-grid-outline', descricao: 'Todos os conteúdos do app' },
];

export function getProva(id: string): ProvaAlvo {
  return PROVAS.find((p) => p.id === id) ?? PROVAS[0];
}

/** Converte o valor antigo de "trilha" (ENEM, Militares, Concursos, Todas) em uma prova-alvo. */
export function provaDaTrilhaAntiga(trilha: string): string {
  const mapa: Record<string, string> = { ENEM: 'enem', Militares: 'espcex', Concursos: 'concursos', Todas: 'todas' };
  return mapa[trilha] ?? (PROVAS.some((p) => p.id === trilha) ? trilha : 'enem');
}

/** Prazos que o aluno pode escolher para o seu objetivo. */
export const PRAZOS = [
  { meses: 1, nome: '1 mês' },
  { meses: 2, nome: '2 meses' },
  { meses: 3, nome: '3 meses' },
  { meses: 6, nome: '6 meses' },
  { meses: 12, nome: '1 ano' },
];

export const METAS = [
  { xp: 100, nome: 'Leve', descricao: 'cerca de 1 lição por dia' },
  { xp: 200, nome: 'Regular', descricao: 'cerca de 2 lições por dia' },
  { xp: 400, nome: 'Puxado', descricao: 'cerca de 4 lições por dia' },
  { xp: 600, nome: 'Intenso', descricao: 'cerca de 6 lições por dia' },
];
