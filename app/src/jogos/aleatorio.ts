/** Sorteios dos jogos. Com semente, a sequência se repete (usado no desafio do dia). */
export type Rng = () => number;

export function criarRng(semente: number): Rng {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function sementeDoTexto(texto: string) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) h = Math.imul(h ^ texto.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** inteiro entre a e b (inclusive) */
export const inteiro = (r: Rng, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
export const escolher = <T>(r: Rng, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)];

export function embaralhar<T>(r: Rng, xs: readonly T[]): T[] {
  const v = [...xs];
  for (let i = v.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [v[i], v[j]] = [v[j], v[i]];
  }
  return v;
}

/** número no formato brasileiro (vírgula decimal) */
export const numeroBR = (n: number) => String(n).replace('-', '−').replace('.', ',');
