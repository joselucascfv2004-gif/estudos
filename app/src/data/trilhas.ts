import { Trilha } from './banco';

export const TRILHAS: { id: Trilha; rotulo: string; emoji: string; descricao: string }[] = [
  { id: 'ENEM', rotulo: 'ENEM', emoji: '🎓', descricao: 'Todas as áreas do ENEM e vestibulares' },
  { id: 'Militares', rotulo: 'Militares', emoji: '🎖️', descricao: 'ESA, EsPCEx, EEAR, AFA, EN, Colégio Naval' },
  { id: 'Concursos', rotulo: 'Concursos', emoji: '🏦', descricao: 'Banco do Brasil, BNB, Caixa, IBGE...' },
  { id: 'Todas', rotulo: 'Tudo', emoji: '🌟', descricao: 'Todos os conteúdos do app' },
];

export const METAS = [
  { xp: 100, nome: 'Leve', descricao: '~1 lição por dia' },
  { xp: 200, nome: 'Regular', descricao: '~2 lições por dia' },
  { xp: 400, nome: 'Puxado', descricao: '~4 lições por dia' },
  { xp: 600, nome: 'Intenso', descricao: '~6 lições por dia' },
];
