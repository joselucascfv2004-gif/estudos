// Flashcards: cada item "- **Termo:** explicação" do resumo de um assunto vira um cartão (frente:
// o termo; verso: a explicação). Funções puras, sem telas.
import { getTopico } from '../data/banco';
import { somarDias } from './datas';

export type Cartao = { id: string; topicoId: string; frente: string; verso: string };

/** Revisão espaçada de um cartão (Leitner): caixa, próxima revisão e último dia em que foi visto. */
export type EstatCartao = { caixa: number; proxima: string; ultima: string };

/** Nota que o aluno dá a si mesmo depois de virar o cartão. */
export type NotaCartao = 0 | 1 | 2;
export const NOMES_NOTA = ['Não lembrei', 'Com esforço', 'Lembrei fácil'] as const;

/** Intervalo base (em dias) de cada caixa: não lembrou volta amanhã; lembrando, o intervalo cresce. */
export const INTERVALOS_CARTAO = [1, 3, 7, 15, 30, 60, 120];
const MAX_CAIXA_CARTAO = INTERVALOS_CARTAO.length - 1;

const ITEM = /^- \*\*([^*]{2,80}?):?\*\*:?\s+(.+)$/;
const cache = new Map<string, Cartao[]>();

const chave = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Cartões de um assunto, tirados do resumo. */
export function cartoesDoTopico(topicoId: string): Cartao[] {
  const pronto = cache.get(topicoId);
  if (pronto) return pronto;
  const resumo = getTopico(topicoId)?.topico.resumo ?? '';
  const vistos = new Set<string>();
  const cartoes: Cartao[] = [];
  for (const linha of resumo.split('\n')) {
    const m = linha.trim().match(ITEM);
    if (!m) continue;
    const frente = m[1].trim().replace(/:$/, '');
    let id = `${topicoId}~${chave(frente)}`;
    for (let n = 2; vistos.has(id); n++) id = `${topicoId}~${chave(frente)}-${n}`;
    vistos.add(id);
    cartoes.push({ id, topicoId, frente, verso: m[2].trim() });
  }
  cache.set(topicoId, cartoes);
  return cartoes;
}

/** Próxima revisão de um cartão depois da nota do aluno. */
export function agendarCartao(anterior: EstatCartao | undefined, nota: NotaCartao, dia: string, sorteio: () => number = Math.random): EstatCartao {
  const atual = anterior?.caixa ?? 0;
  const caixa = nota === 0 ? 0 : nota === 1 ? Math.max(1, anterior ? atual : 1) : Math.min(MAX_CAIXA_CARTAO, anterior ? atual + 1 : 2);
  const dias = Math.max(1, Math.round(INTERVALOS_CARTAO[caixa] * (0.85 + sorteio() * 0.3)));
  return { caixa, proxima: somarDias(dia, dias), ultima: dia };
}
