// Duelo: uma questão curta do banco com só duas alternativas (a certa e uma errada).
import { Disciplina, Questao, questoesDoTopico } from '../data/banco';
import { semMarcas } from '../ui/textoRico';
import { Rng, embaralhar } from './aleatorio';

export type Rodada = { questao: Questao; enunciado: string; opcoes: [string, string]; certa: 0 | 1 };

const limpar = (t: string) => semMarcas(t).replace(/\s+/g, ' ').trim();

/** alternativas que só fazem sentido com a lista do enunciado ("I e II", "apenas III"...) */
const DEPENDE_DA_LISTA = /^(I{1,3}|IV|V)\b|\bapenas\b|\bsomente\b|todas as|nenhuma das/i;

/** A questão cabe num duelo rápido? Curta, sem figura e com alternativas independentes. */
function servePraDuelo(q: Questao) {
  if (q.a.length < 4) return false;
  if ([q.e, ...q.a].some((t) => t.includes('!['))) return false;
  if (q.e.length > 230 || q.e.includes('\n\n')) return false;
  return q.a.every((a) => a.length <= 80 && !DEPENDE_DA_LISTA.test(a));
}

export function questoesDoDuelo(disciplinas: Disciplina[]): Questao[] {
  return disciplinas.flatMap((d) => d.topicos.flatMap((t) => questoesDoTopico(t.id))).filter(servePraDuelo);
}

export function montarRodada(r: Rng, q: Questao): Rodada {
  const erradas = q.a.map((_, i) => i).filter((i) => i !== q.c);
  const errada = erradas[Math.floor(r() * erradas.length)];
  const certaPrimeiro = r() < 0.5;
  const [a, b] = certaPrimeiro ? [q.c, errada] : [errada, q.c];
  return { questao: q, enunciado: limpar(q.e), opcoes: [limpar(q.a[a]), limpar(q.a[b])], certa: certaPrimeiro ? 0 : 1 };
}

/** Sorteia a ordem das questões (sem repetir até acabar o baralho). */
export const baralho = (r: Rng, qs: Questao[]) => embaralhar(r, qs);
