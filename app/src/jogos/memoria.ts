// Jogo da Memória: pares de conceitos (cada carta tem um lado do par).
import { Rng, embaralhar } from './aleatorio';

export type TemaMemoria = { id: string; nome: string; icone: string; cor: string; pares: [string, string][] };

export const TEMAS_MEMORIA: TemaMemoria[] = [
  {
    id: 'simbolos',
    nome: 'Química: elementos e símbolos',
    icone: 'flask-outline',
    cor: '#CE82FF',
    pares: [
      ['Sódio', 'Na'], ['Potássio', 'K'], ['Ferro', 'Fe'], ['Ouro', 'Au'], ['Prata', 'Ag'], ['Chumbo', 'Pb'], ['Cobre', 'Cu'], ['Fósforo', 'P'],
      ['Enxofre', 'S'], ['Cálcio', 'Ca'], ['Mercúrio', 'Hg'], ['Estanho', 'Sn'], ['Magnésio', 'Mg'], ['Cloro', 'Cl'], ['Zinco', 'Zn'], ['Hélio', 'He'],
    ],
  },
  {
    id: 'unidades',
    nome: 'Física: grandezas e unidades',
    icone: 'lightning-bolt',
    cor: '#FF9600',
    pares: [
      ['Força', 'newton (N)'], ['Energia', 'joule (J)'], ['Potência', 'watt (W)'], ['Pressão', 'pascal (Pa)'], ['Carga elétrica', 'coulomb (C)'],
      ['Corrente elétrica', 'ampère (A)'], ['Tensão elétrica', 'volt (V)'], ['Resistência elétrica', 'ohm (Ω)'], ['Frequência', 'hertz (Hz)'],
      ['Temperatura', 'kelvin (K)'], ['Massa', 'quilograma (kg)'], ['Campo magnético', 'tesla (T)'],
    ],
  },
  {
    id: 'formulas',
    nome: 'Matemática: fórmulas',
    icone: 'calculator-variant-outline',
    cor: '#1CB0F6',
    pares: [
      ['Área do círculo', 'π·r²'], ['Área do triângulo', 'b·h/2'], ['Área do trapézio', '(B + b)·h/2'], ['Área do losango', 'D·d/2'],
      ['Comprimento da circunferência', '2·π·r'], ['Volume do cubo', 'a³'], ['Volume da esfera', '4·π·r³/3'], ['Volume do cilindro', 'π·r²·h'],
      ['Teorema de Pitágoras', 'a² = b² + c²'], ['Discriminante (Bhaskara)', 'Δ = b² − 4ac'], ['Juros simples', 'J = C·i·t'], ['Termo geral da PA', 'aₙ = a₁ + (n − 1)·r'],
    ],
  },
  {
    id: 'obras',
    nome: 'Literatura: obras e autores',
    icone: 'book-open-page-variant-outline',
    cor: '#D14D8B',
    pares: [
      ['Dom Casmurro', 'Machado de Assis'], ['Iracema', 'José de Alencar'], ['O Cortiço', 'Aluísio Azevedo'], ['Vidas Secas', 'Graciliano Ramos'],
      ['Macunaíma', 'Mário de Andrade'], ['Os Sertões', 'Euclides da Cunha'], ['Grande Sertão: Veredas', 'Guimarães Rosa'], ['A Hora da Estrela', 'Clarice Lispector'],
      ['Capitães da Areia', 'Jorge Amado'], ['Triste Fim de Policarpo Quaresma', 'Lima Barreto'], ['Morte e Vida Severina', 'João Cabral de Melo Neto'],
      ['O Quinze', 'Rachel de Queiroz'], ['Marília de Dirceu', 'Tomás Antônio Gonzaga'], ['O Navio Negreiro', 'Castro Alves'],
    ],
  },
  {
    id: 'datas',
    nome: 'História: fatos e anos',
    icone: 'calendar-clock',
    cor: '#A5743B',
    pares: [
      ['Chegada dos portugueses ao Brasil', '1500'], ['Chegada da família real ao Brasil', '1808'], ['Independência do Brasil', '1822'], ['Lei Áurea', '1888'],
      ['Proclamação da República', '1889'], ['Revolução Russa', '1917'], ['Crise da Bolsa de Nova York', '1929'], ['Revolução de 1930 (Vargas)', '1930'],
      ['Início da 2ª Guerra Mundial', '1939'], ['Golpe militar no Brasil', '1964'], ['Revolução Francesa', '1789'], ['Constituição brasileira atual', '1988'],
      ['Queda do Muro de Berlim', '1989'], ['Fim da 1ª Guerra Mundial', '1918'],
    ],
  },
  {
    id: 'capitais',
    nome: 'Geografia: estados e capitais',
    icone: 'map-marker-radius-outline',
    cor: '#58CC02',
    pares: [
      ['Bahia', 'Salvador'], ['Pernambuco', 'Recife'], ['Ceará', 'Fortaleza'], ['Pará', 'Belém'], ['Amazonas', 'Manaus'], ['Paraná', 'Curitiba'],
      ['Rio Grande do Sul', 'Porto Alegre'], ['Santa Catarina', 'Florianópolis'], ['Maranhão', 'São Luís'], ['Piauí', 'Teresina'], ['Paraíba', 'João Pessoa'],
      ['Rio Grande do Norte', 'Natal'], ['Espírito Santo', 'Vitória'], ['Tocantins', 'Palmas'], ['Mato Grosso', 'Cuiabá'], ['Mato Grosso do Sul', 'Campo Grande'],
      ['Acre', 'Rio Branco'], ['Rondônia', 'Porto Velho'], ['Roraima', 'Boa Vista'], ['Amapá', 'Macapá'], ['Sergipe', 'Aracaju'], ['Alagoas', 'Maceió'],
    ],
  },
  {
    id: 'organelas',
    nome: 'Biologia: organelas e funções',
    icone: 'dna',
    cor: '#2BB673',
    pares: [
      ['Mitocôndria', 'Respiração celular'], ['Ribossomo', 'Síntese de proteínas'], ['Cloroplasto', 'Fotossíntese'], ['Lisossomo', 'Digestão intracelular'],
      ['Complexo golgiense', 'Empacotar e secretar substâncias'], ['Núcleo', 'Guardar o material genético'], ['Retículo endoplasmático liso', 'Produzir lipídios'],
      ['Membrana plasmática', 'Controlar o que entra e sai'], ['Parede celular', 'Sustentação da célula vegetal'],
    ],
  },
  {
    id: 'falsos-cognatos',
    nome: 'Inglês: falsos cognatos',
    icone: 'translate',
    cor: '#0E7C86',
    pares: [
      ['pretend', 'fingir'], ['actually', 'na verdade'], ['push', 'empurrar'], ['library', 'biblioteca'], ['college', 'faculdade'], ['parents', 'pais'],
      ['lunch', 'almoço'], ['fabric', 'tecido'], ['realize', 'perceber'], ['sensible', 'sensato'], ['costume', 'fantasia'], ['prejudice', 'preconceito'],
      ['attend', 'comparecer'], ['exquisite', 'requintado'],
    ],
  },
  {
    id: 'siglas',
    nome: 'Finanças: siglas (CPA e bancos)',
    icone: 'bank-outline',
    cor: '#7A5AF8',
    pares: [
      ['CMN', 'Conselho Monetário Nacional'], ['CVM', 'Comissão de Valores Mobiliários'], ['FGC', 'Fundo Garantidor de Créditos'], ['CDB', 'Certificado de Depósito Bancário'],
      ['LCI', 'Letra de Crédito Imobiliário'], ['LCA', 'Letra de Crédito do Agronegócio'], ['COE', 'Certificado de Operações Estruturadas'], ['PGBL', 'Plano Gerador de Benefício Livre'],
      ['VGBL', 'Vida Gerador de Benefício Livre'], ['IPCA', 'Índice Nacional de Preços ao Consumidor Amplo'], ['Copom', 'Comitê de Política Monetária'],
      ['Susep', 'Superintendência de Seguros Privados'], ['Previc', 'Superintendência Nacional de Previdência Complementar'], ['Coaf', 'Conselho de Controle de Atividades Financeiras'],
    ],
  },
];

export type Carta = { id: number; par: number; texto: string; lado: 0 | 1 };

/** Sorteia `quantidade` pares do tema e embaralha as cartas. */
export function montarCartas(r: Rng, tema: TemaMemoria, quantidade = 6): Carta[] {
  const pares = embaralhar(r, tema.pares).slice(0, quantidade);
  const cartas = pares.flatMap(([a, b], i) => [
    { par: i, texto: a, lado: 0 as const },
    { par: i, texto: b, lado: 1 as const },
  ]);
  return embaralhar(r, cartas).map((c, id) => ({ ...c, id }));
}

/** Pontos: começa em 1 000 e perde por jogada a mais e por segundo. */
export function pontosMemoria(pares: number, jogadas: number, segundos: number) {
  return Math.max(100, 1000 - Math.max(0, jogadas - pares) * 40 - Math.round(segundos) * 5);
}
