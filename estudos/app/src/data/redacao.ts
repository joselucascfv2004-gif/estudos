// Temas da redação do ENEM (aplicação regular, conferidos nas publicações do INEP) e a grade das
// cinco competências usada na correção. Os "pontos para pensar" são sugestões nossas, não do INEP.

export type TemaRedacao = {
  id: string;
  ano: number;
  titulo: string;
  /** observação sobre a aplicação (ex.: segunda aplicação) */
  obs?: string;
  /** ideias e repertório para começar a pensar no tema */
  pontos: string[];
};

export const TEMAS_REDACAO: TemaRedacao[] = [
  {
    id: 'enem-2025',
    ano: 2025,
    titulo: 'Perspectivas acerca do envelhecimento na sociedade brasileira',
    pontos: [
      'A população brasileira está envelhecendo: o que isso muda na saúde, na previdência, no trabalho e nas famílias?',
      'Repertório: a Constituição (art. 230) diz que família, sociedade e Estado têm o dever de amparar as pessoas idosas; o Estatuto da Pessoa Idosa (Lei 10.741/2003) garante direitos como prioridade no atendimento.',
      'Pense em preconceito contra idosos (etarismo), solidão, acessibilidade nas cidades e inclusão digital.',
    ],
  },
  {
    id: 'enem-2024',
    ano: 2024,
    titulo: 'Desafios para a valorização da herança africana no Brasil',
    pontos: [
      'A herança africana está na língua, na culinária, na música, na religião e na formação do povo brasileiro.',
      'Repertório: a Lei 10.639/2003 tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas.',
      'Desafios: racismo estrutural, intolerância contra religiões de matriz africana e apagamento dessa história nos livros e na mídia.',
    ],
  },
  {
    id: 'enem-2023',
    ano: 2023,
    titulo: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
    pontos: [
      'Trabalho de cuidado: cuidar da casa, dos filhos, de idosos e doentes. É trabalho, mesmo quando não é pago.',
      'Pesquisas do IBGE mostram que as mulheres dedicam mais horas por semana a esses afazeres do que os homens.',
      'Pense na dupla jornada, na divisão desigual das tarefas e na falta de creches e políticas de apoio.',
    ],
  },
  {
    id: 'enem-2022',
    ano: 2022,
    titulo: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    pontos: [
      'Povos tradicionais: indígenas, quilombolas, ribeirinhos, caiçaras, quebradeiras de coco, entre outros.',
      'Repertório: a Constituição reconhece os direitos dos indígenas às terras que ocupam (art. 231) e a propriedade das terras dos quilombolas (art. 68 do ADCT).',
      'Desafios: conflitos por terra, desmatamento, invisibilidade e perda de saberes tradicionais.',
    ],
  },
  {
    id: 'enem-2021',
    ano: 2021,
    titulo: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    pontos: [
      'Sem certidão de nascimento, a pessoa não consegue documentos, vacinas, escola, benefícios sociais e emprego formal.',
      'Repertório: a Lei 9.534/1997 garante a gratuidade do registro civil de nascimento e da primeira certidão.',
      'Pense em quem fica sem registro: populações pobres, de regiões isoladas e em situação de rua.',
    ],
  },
  {
    id: 'enem-2020',
    ano: 2020,
    titulo: 'O estigma associado às doenças mentais na sociedade brasileira',
    pontos: [
      'Estigma é o rótulo negativo que faz a pessoa ter vergonha de buscar ajuda.',
      'Repertório: a Lei 10.216/2001 (Reforma Psiquiátrica) protege os direitos das pessoas com transtornos mentais; os CAPS oferecem atendimento pelo SUS.',
      'Pense no preconceito, na desinformação e na falta de acesso a psicólogos e psiquiatras.',
    ],
  },
  {
    id: 'enem-2019',
    ano: 2019,
    titulo: 'Democratização do acesso ao cinema no Brasil',
    pontos: [
      'Muitas cidades não têm nenhuma sala de cinema, e os ingressos são caros para boa parte da população.',
      'Repertório: a Constituição (art. 215) garante a todos o pleno exercício dos direitos culturais.',
      'Pense em concentração das salas em shoppings de grandes cidades, preço e formação de público.',
    ],
  },
  {
    id: 'enem-2018',
    ano: 2018,
    titulo: 'Manipulação do comportamento do usuário pelo controle de dados na internet',
    pontos: [
      'Algoritmos usam o que você curte e pesquisa para decidir o que você vê, compra e até em quem vota.',
      'Repertório: Marco Civil da Internet (Lei 12.965/2014) e Lei Geral de Proteção de Dados (Lei 13.709/2018).',
      'Pense em bolhas de informação, notícias falsas e falta de educação digital.',
    ],
  },
  {
    id: 'enem-2017',
    ano: 2017,
    titulo: 'Desafios para a formação educacional de surdos no Brasil',
    pontos: [
      'Repertório: a Lei 10.436/2002 reconhece a Libras como meio legal de comunicação; a Lei Brasileira de Inclusão (Lei 13.146/2015) garante educação inclusiva.',
      'Desafios: falta de intérpretes e de professores que saibam Libras, e escolas sem estrutura.',
      'Pense também no preconceito e na falta de convívio com a Libras desde a infância.',
    ],
  },
  {
    id: 'enem-2016-2',
    ano: 2016,
    titulo: 'Caminhos para combater o racismo no Brasil',
    obs: 'Segunda aplicação',
    pontos: [
      'Repertório: a Constituição diz que a prática do racismo é crime inafiançável e imprescritível (art. 5º, XLII); a Lei 7.716/1989 define os crimes de preconceito.',
      'Pense no racismo estrutural: diferenças de renda, de acesso ao ensino superior e de violência policial.',
      'Caminhos: educação antirracista, cotas, punição efetiva e representatividade na mídia.',
    ],
  },
  {
    id: 'enem-2016',
    ano: 2016,
    titulo: 'Caminhos para combater a intolerância religiosa no Brasil',
    pontos: [
      'Repertório: a Constituição garante a liberdade de consciência e de crença (art. 5º, VI) e o Brasil é um Estado laico.',
      'Religiões de matriz africana são as que mais sofrem ataques a templos e fiéis.',
      'Caminhos: educação para a diversidade, denúncia e punição dos crimes de intolerância.',
    ],
  },
  {
    id: 'enem-2015',
    ano: 2015,
    titulo: 'A persistência da violência contra a mulher na sociedade brasileira',
    pontos: [
      'Repertório: Lei Maria da Penha (Lei 11.340/2006) e Lei do Feminicídio (Lei 13.104/2015).',
      'Por que a violência persiste: machismo, dependência financeira, medo de denunciar e falhas na proteção.',
      'Pense em educação, delegacias da mulher, casas-abrigo e canais de denúncia (Ligue 180).',
    ],
  },
  {
    id: 'enem-2014',
    ano: 2014,
    titulo: 'Publicidade infantil em questão no Brasil',
    pontos: [
      'Crianças ainda não têm maturidade para perceber a intenção de venda de um anúncio.',
      'Repertório: o Código de Defesa do Consumidor (art. 37) proíbe a publicidade abusiva que se aproveita da falta de julgamento e experiência da criança; o ECA protege a infância.',
      'Pense no consumismo, na obesidade infantil e no papel da família e da escola.',
    ],
  },
  {
    id: 'enem-2013',
    ano: 2013,
    titulo: 'Efeitos da implantação da Lei Seca no Brasil',
    pontos: [
      'Repertório: a Lei Seca (Lei 11.705/2008) endureceu a punição para quem dirige depois de beber; a Lei 12.760/2012 tornou a fiscalização ainda mais rigorosa.',
      'Efeitos: menos acidentes e mortes no trânsito, mudança de hábitos e uso de táxi e aplicativos.',
      'Desafios: fiscalização irregular pelo país e a cultura de beber e dirigir.',
    ],
  },
  {
    id: 'enem-2012',
    ano: 2012,
    titulo: 'O movimento imigratório para o Brasil no século XXI',
    pontos: [
      'Exemplos: haitianos depois do terremoto de 2010, bolivianos, venezuelanos e sírios.',
      'Repertório: a Lei de Migração (Lei 13.445/2017) trata o imigrante como sujeito de direitos.',
      'Pense em trabalho análogo à escravidão, xenofobia, acolhimento e contribuição cultural e econômica.',
    ],
  },
  {
    id: 'enem-2011',
    ano: 2011,
    titulo: 'Viver em rede no século XXI: os limites entre o público e o privado',
    pontos: [
      'Nas redes sociais, as pessoas expõem a própria vida e às vezes a vida dos outros.',
      'Repertório: a Constituição protege a intimidade e a vida privada (art. 5º, X); o Marco Civil da Internet (Lei 12.965/2014) veio depois.',
      'Pense em exposição excessiva, vazamento de dados, cyberbullying e golpes.',
    ],
  },
  {
    id: 'enem-2010',
    ano: 2010,
    titulo: 'O trabalho na construção da dignidade humana',
    pontos: [
      'Repertório: a Constituição tem como fundamentos a dignidade da pessoa humana e os valores sociais do trabalho (art. 1º).',
      'O trabalho dá renda, autonomia e sentido, mas também pode ser explorado (trabalho infantil, trabalho análogo à escravidão).',
      'Pense em desemprego, informalidade e qualificação profissional.',
    ],
  },
  {
    id: 'enem-2009',
    ano: 2009,
    titulo: 'O indivíduo frente à ética nacional',
    pontos: [
      'Ética no dia a dia: o "jeitinho", furar fila, sonegar, comprar produto pirata.',
      'Relacione as atitudes de cada pessoa com a corrupção na política e na sociedade.',
      'Pense em educação para a cidadania, transparência e punição exemplar.',
    ],
  },
];

export const getTemaRedacao = (id: string) => TEMAS_REDACAO.find((t) => t.id === id);

/** As cinco competências da correção da redação do ENEM (cada uma vale de 0 a 200 pontos). */
export const COMPETENCIAS: { titulo: string; descricao: string; perguntas: string[] }[] = [
  {
    titulo: 'Competência 1 · Norma-padrão',
    descricao: 'Demonstrar domínio da modalidade escrita formal da língua portuguesa.',
    perguntas: ['Revisei ortografia, acentuação e crase?', 'A concordância e a pontuação estão corretas?', 'Evitei gírias e marcas de oralidade?'],
  },
  {
    titulo: 'Competência 2 · Tema e tipo de texto',
    descricao: 'Compreender a proposta e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro da estrutura do texto dissertativo-argumentativo.',
    perguntas: [
      'Falei do tema inteiro, e não só de parte dele?',
      'Tem introdução, desenvolvimento e conclusão?',
      'Usei repertório (leis, dados, autores, fatos históricos) ligado à discussão?',
    ],
  },
  {
    titulo: 'Competência 3 · Argumentação',
    descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
    perguntas: ['Deixei claro o meu ponto de vista?', 'Cada parágrafo explica e defende uma ideia?', 'Os argumentos estão bem desenvolvidos, e não só citados?'],
  },
  {
    titulo: 'Competência 4 · Coesão',
    descricao: 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
    perguntas: [
      'Liguei os parágrafos com conectivos (além disso, portanto, nesse sentido)?',
      'Evitei repetir as mesmas palavras?',
      'As frases se ligam bem umas às outras?',
    ],
  },
  {
    titulo: 'Competência 5 · Proposta de intervenção',
    descricao: 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.',
    perguntas: [
      'A proposta diz QUEM vai agir (agente) e O QUE vai fazer (ação)?',
      'Diz COMO (modo ou meio) e PARA QUÊ (finalidade)?',
      'Detalhei algum desses elementos?',
    ],
  },
];

export const NOTAS_COMPETENCIA = [0, 40, 80, 120, 160, 200];

/** Estimativa de linhas na folha de redação (cerca de 70 caracteres por linha, cada parágrafo começa numa linha nova). */
export function linhasEstimadas(texto: string): number {
  return texto
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .reduce((n, p) => n + Math.max(1, Math.ceil(p.length / 70)), 0);
}
