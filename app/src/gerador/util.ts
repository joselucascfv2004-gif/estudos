// Utilidades do gerador de exercícios: sorteio, frações, radicais e formatação dos números no
// padrão brasileiro. As expressões usam uma marcação simples, entendida pela tela e pelo PDF:
//   \f{num}{den}  fração        x^{2}  expoente        a_{n}  índice
//   \r{49}        raiz quadrada \r[3]{8} raiz cúbica    \m{1,2;3,4} matriz

export const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const rnz = (a: number, b: number) => {
  let x = 0;
  while (x === 0) x = ri(a, b);
  return x;
};
export const pick = <T,>(lista: readonly T[]): T => lista[Math.floor(Math.random() * lista.length)];
export const sinal = () => (Math.random() < 0.5 ? -1 : 1);

export function mdc(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
export const mmc = (a: number, b: number) => Math.abs(a * b) / mdc(a, b);
export function fatorial(n: number) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
export function comb(n: number, p: number) {
  let r = 1;
  for (let i = 1; i <= p; i++) r = (r * (n - p + i)) / i;
  return Math.round(r);
}
export function arranjo(n: number, p: number) {
  let r = 1;
  for (let i = 0; i < p; i++) r *= n - i;
  return r;
}

/** Inteiro com sinal de menos tipográfico e separador de milhar a partir de 10 000. */
export function N(x: number): string {
  if (!Number.isFinite(x)) return '?';
  const neg = x < 0;
  const v = Math.abs(x);
  let s: string;
  if (Number.isInteger(v)) {
    s = String(v);
    if (v >= 10000) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    s = String(Number(v.toFixed(6))).replace('.', ',');
  }
  return (neg ? '−' : '') + s;
}

/** Número entre parênteses se for negativo (para usar dentro de expressões). */
export const P = (x: number) => (x < 0 ? `(${N(x)})` : N(x));

/** Decimal a partir de inteiro e casas: D(25, 1) = "2,5". */
export function D(inteiro: number, casas: number) {
  return N(inteiro / 10 ** casas);
}

export type Frac = { n: number; d: number };
export function frac(n: number, d: number): Frac {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = mdc(n, d) || 1;
  return { n: n / g, d: d / g };
}
export const somaF = (a: Frac, b: Frac) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const subF = (a: Frac, b: Frac) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
export const multF = (a: Frac, b: Frac) => frac(a.n * b.n, a.d * b.d);
export const divF = (a: Frac, b: Frac) => frac(a.n * b.d, a.d * b.n);

/** Fração simplificada na marcação: "\f{3}{4}", "−\f{1}{2}" ou inteiro. */
export function F(n: number, d = 1): string {
  const f = frac(n, d);
  if (f.d === 1) return N(f.n);
  return `${f.n < 0 ? '−' : ''}\\f{${Math.abs(f.n)}}{${f.d}}`;
}
export const FF = (f: Frac) => F(f.n, f.d);

/** Fração vezes um símbolo (π, √3...): "\f{4}{3}π", "π", "5π". */
export function Fsimb(n: number, d: number, simb: string): string {
  const f = frac(n, d);
  if (f.n === 0) return '0';
  const neg = f.n < 0 ? '−' : '';
  const a = Math.abs(f.n);
  if (f.d === 1) return `${neg}${a === 1 ? '' : N(a)}${simb}`;
  return `${neg}\\f{${a === 1 ? '' : N(a)}${simb}}{${f.d}}`;
}

/** Simplifica √n: devolve [fora, dentro] com n = fora²·dentro. */
export function radical(n: number): [number, number] {
  let fora = 1;
  let dentro = n;
  for (let k = 2; k * k <= dentro; k++) {
    while (dentro % (k * k) === 0) {
      dentro /= k * k;
      fora *= k;
    }
  }
  return [fora, dentro];
}
/** √n simplificada na marcação: "6\r{2}", "7", "\r{5}". Com `coef` multiplica por fora. */
export function R(n: number, coef = 1): string {
  const [f, d] = radical(n);
  const k = f * coef;
  if (d === 1) return N(k);
  return `${k === 1 ? '' : k === -1 ? '−' : N(k)}\\r{${d}}`;
}

/** Polinômio a partir de [coeficiente, parte literal]: poli([[1,'x^{2}'],[-5,'x'],[6,'']]) = "x^{2} − 5x + 6". */
export function poli(termos: [number, string][]): string {
  let s = '';
  for (const [c, v] of termos) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corpo = v && abs === 1 ? v : `${N(abs)}${v}`;
    if (!s) s = (c < 0 ? '−' : '') + corpo;
    else s += (c < 0 ? ' − ' : ' + ') + corpo;
  }
  return s || '0';
}

/** Número complexo a + bi. */
export function complexo(a: number, b: number) {
  return poli([
    [a, ''],
    [b, 'i'],
  ]);
}
/** Complexo com partes fracionárias. */
export function complexoF(a: Frac, b: Frac) {
  const re = a.n === 0 ? '' : FF(a);
  if (b.n === 0) return re || '0';
  const absB = frac(Math.abs(b.n), b.d);
  const im = absB.d === 1 ? `${absB.n === 1 ? '' : N(absB.n)}i` : `\\f{${absB.n}}{${absB.d}}i`;
  if (!re) return (b.n < 0 ? '−' : '') + im;
  return `${re} ${b.n < 0 ? '−' : '+'} ${im}`;
}

/** Ternas pitagóricas primitivas (e os múltiplos são gerados à parte). */
export const TERNAS: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
  [12, 35, 37],
];
export function terna(maxMult = 4): [number, number, number] {
  const t = pick(TERNAS);
  const k = t[2] > 20 ? 1 : ri(1, maxMult);
  return [t[0] * k, t[1] * k, t[2] * k];
}

export function embaralhar<T>(l: T[]): T[] {
  const a = [...l];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Valor em reais: "R$ 1.331,00". */
export function dinheiro(x: number) {
  const [i, d] = Math.abs(x).toFixed(2).split('.');
  return `${x < 0 ? '−' : ''}R$ ${i.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${d}`;
}

/** Lista de números: "4, 8, 6 e 10" (com `e`) ou "4, 8, 6, 10". */
export function lista(nums: number[], comE = false) {
  const s = nums.map(N);
  if (!comE || s.length < 2) return s.join(', ');
  return `${s.slice(0, -1).join(', ')} e ${s[s.length - 1]}`;
}

/** "x = 2 ou x = 3" a partir das soluções (em marcação), sem repetir. */
export function solucoes(vals: string[], v = 'x') {
  const u = [...new Set(vals)];
  return u.map((s) => `${v} = ${s}`).join(' ou ');
}

/** (x − h) para equações: "x", "(x − 2)", "(x + 3)". */
export function desloc(v: string, h: number) {
  return h === 0 ? v : `(${v} ${h > 0 ? '−' : '+'} ${N(Math.abs(h))})`;
}

export type Item = { e: string; r: string };
export type Gerador = () => Item;
export type Niveis = [Gerador[], Gerador[], Gerador[]];
export const q = (e: string, r: string): Item => ({ e, r });
