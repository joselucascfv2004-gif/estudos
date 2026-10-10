// Lista de assuntos do gerador de exercícios de matemática e a função que monta uma lista de
// exercícios sem repetição, do mais fácil para o mais difícil (como nas folhas do método Kumon).
import * as g1 from './geradores1';
import * as g2 from './geradores2';
import type { Item, Niveis } from './util';

export type Assunto = { id: string; titulo: string; niveis: Niveis };
export type Exercicio = Item & { nivel: 1 | 2 | 3 };

export const NOMES_NIVEL = ['Fácil', 'Médio', 'Difícil'] as const;
export const MAX_EXERCICIOS = 100;

export const ASSUNTOS: Assunto[] = [
  { id: 'numeros', titulo: 'Números e operações', niveis: g1.numeros },
  { id: 'fracoes', titulo: 'Frações, fatoração e produtos notáveis', niveis: g2.fracoes },
  { id: 'potencias', titulo: 'Potenciação, radiciação e unidades', niveis: g2.potencias },
  { id: 'divisibilidade', titulo: 'Divisibilidade, primos, MDC e MMC', niveis: g2.divisibilidade },
  { id: 'porcentagem', titulo: 'Porcentagem', niveis: g1.porcentagem },
  { id: 'razao', titulo: 'Razão, proporção e regra de três', niveis: g1.razao },
  { id: 'grandezas', titulo: 'Grandezas, medidas e escalas', niveis: g2.grandezas },
  { id: 'equacoes', titulo: 'Equações, inequações e sistemas', niveis: g1.equacoes },
  { id: 'funcoes', titulo: 'Funções afim e quadrática', niveis: g1.funcoes },
  { id: 'modulo', titulo: 'Módulo e função modular', niveis: g2.modulo },
  { id: 'composta', titulo: 'Função composta e função inversa', niveis: g2.composta },
  { id: 'exponencial', titulo: 'Função exponencial e logaritmo', niveis: g1.exponencial },
  { id: 'progressoes', titulo: 'Progressões aritméticas e geométricas', niveis: g1.progressoes },
  { id: 'geoPlana', titulo: 'Geometria plana', niveis: g1.geoPlana },
  { id: 'semelhanca', titulo: 'Semelhança de triângulos e Tales', niveis: g2.semelhanca },
  { id: 'circunferencia', titulo: 'Circunferência e círculo', niveis: g2.circunferencia },
  { id: 'geoEspacial', titulo: 'Geometria espacial', niveis: g1.geoEspacial },
  { id: 'trigonometria', titulo: 'Trigonometria', niveis: g1.trigonometria },
  { id: 'estatistica', titulo: 'Estatística', niveis: g1.estatistica },
  { id: 'combinatoria', titulo: 'Análise combinatória', niveis: g1.combinatoria },
  { id: 'probabilidade', titulo: 'Probabilidade', niveis: g1.probabilidade },
  { id: 'binomio', titulo: 'Binômio de Newton e triângulo de Pascal', niveis: g2.binomio },
  { id: 'matrizes', titulo: 'Matrizes, determinantes e sistemas', niveis: g2.matrizes },
  { id: 'geoAnalitica', titulo: 'Geometria analítica', niveis: g2.geoAnalitica },
  { id: 'conicas', titulo: 'Cônicas: elipse, hipérbole e parábola', niveis: g2.conicas },
  { id: 'complexos', titulo: 'Números complexos e polinômios', niveis: g2.complexos },
];

export const getAssunto = (id: string) => ASSUNTOS.find((a) => a.id === id);

/**
 * Sorteia até `qtd` exercícios diferentes (o enunciado não se repete). Os níveis escolhidos
 * aparecem em partes iguais e a lista vem em ordem crescente de dificuldade. Se um assunto não
 * tiver variedade suficiente, devolve menos exercícios do que o pedido.
 */
export function gerarLista(assunto: Assunto, niveis: (1 | 2 | 3)[], qtd: number): Exercicio[] {
  const total = Math.max(1, Math.min(MAX_EXERCICIOS, Math.floor(qtd)));
  const ns = [...new Set(niveis)].sort();
  if (!ns.length) return [];
  const vistos = new Set<string>();
  const saida: Exercicio[] = [];
  ns.forEach((nivel, i) => {
    // divide a quantidade entre os níveis (os primeiros recebem a sobra)
    const meta = Math.floor(total / ns.length) + (i < total % ns.length ? 1 : 0);
    const receitas = assunto.niveis[nivel - 1];
    let feitos = 0;
    let tentativas = 0;
    let r = Math.floor(Math.random() * receitas.length);
    while (feitos < meta && tentativas < meta * 60 + 200) {
      tentativas++;
      // alterna as receitas para a lista ficar variada
      r = (r + 1 + Math.floor(Math.random() * 2)) % receitas.length;
      let item: Item;
      try {
        item = receitas[r]();
      } catch {
        continue;
      }
      if (!item.e || !item.r || item.r.includes('?') || item.r.includes('NaN') || vistos.has(item.e)) continue;
      vistos.add(item.e);
      saida.push({ ...item, nivel });
      feitos++;
    }
  });
  return saida;
}
