// Geradores de exercícios (assuntos 14 a 26). Mesmo formato de geradores1.ts.
import {
  F, Fsimb, N, P, R, comb, complexo, complexoF, desloc, frac, lista, mdc, mmc, pick, poli, q, ri, rnz, solucoes, terna,
  type Item, type Niveis,
} from './util';

const ordem = (a: number, b: number) => (a < b ? [a, b] : [b, a]);
const lin = (a: number, b: number, v = 'x') => poli([[a, v], [b, '']]);
const ponto = (x: number, y: number) => `(${N(x)}, ${N(y)})`;

// 14. Grandezas, medidas e escalas
const UNID: Record<string, [string, number][]> = {
  comprimento: [['km', 3], ['m', 0], ['cm', -2], ['mm', -3]],
  massa: [['t', 6], ['kg', 3], ['g', 0], ['mg', -3]],
  capacidade: [['L', 0], ['mL', -3]],
};
/** Valor "bonito" com até 1 casa decimal. */
const valor = () => (Math.random() < 0.6 ? ri(1, 99) : ri(11, 999) / 10);
/** m × 10^e escrito sem erro de arredondamento: decimalExato(729, -4) = "0,0729". */
function decimalExato(m: number, e: number) {
  if (e >= 0) return N(m * 10 ** e);
  const s = String(m).padStart(-e + 1, '0');
  const int = s.slice(0, s.length + e), dec = s.slice(s.length + e).replace(/0+$/, '');
  return dec ? `${N(Number(int))},${dec}` : N(Number(int));
}
function conversao(grupo?: string): Item {
  const g = grupo ?? pick(Object.keys(UNID));
  const us = UNID[g];
  for (;;) {
    const a = pick(us), b = pick(us);
    if (a === b) continue;
    const casas = Math.random() < 0.6 ? 0 : 1, m = casas ? ri(11, 999) : ri(1, 99);
    const e = a[1] - b[1] - casas;
    if (e < -5 || e > 6) continue;
    return q(`${decimalExato(m, -casas)} ${a[0]} = ____ ${b[0]}`, `${decimalExato(m, e)} ${b[0]}`);
  }
}
const ESCALAS = [25000, 50000, 100000, 200000, 250000, 500000, 1000000];
export const grandezas: Niveis = [
  [
    () => conversao('comprimento'),
    () => conversao('massa'),
    () => conversao('capacidade'),
    () => {
      const h = ri(1, 12);
      return Math.random() < 0.5 ? q(`${h} h = ____ min`, `${h * 60} min`) : q(`${h} min = ____ s`, `${h * 60} s`);
    },
  ],
  [
    () => {
      const v = ri(1, 30);
      return pick([
        () => q(`${v} m^{2} = ____ cm^{2}`, `${N(v * 10000)} cm^{2}`),
        () => q(`${v} km^{2} = ____ m^{2}`, `${N(v * 1000000)} m^{2}`),
        () => q(`${v} ha = ____ m^{2}`, `${N(v * 10000)} m^{2}`),
      ])();
    },
    () => {
      const v = valor();
      return pick([
        () => q(`${N(v)} m^{3} = ____ L`, `${N(Number((v * 1000).toPrecision(10)))} L`),
        () => q(`${N(v)} dm^{3} = ____ L`, `${N(v)} L`),
        () => q(`${N(v)} L = ____ cm^{3}`, `${N(Number((v * 1000).toPrecision(10)))} cm^{3}`),
      ])();
    },
    () => {
      const v = ri(1, 40);
      return Math.random() < 0.5 ? q(`${v} m/s = ____ km/h`, `${N(Number((v * 3.6).toFixed(1)))} km/h`) : q(`${N(Number((v * 3.6).toFixed(1)))} km/h = ____ m/s`, `${v} m/s`);
    },
    () => {
      const h = ri(1, 9), d = pick([1, 2, 25, 3, 4, 5, 6, 75, 7, 8, 9]);
      const x = d >= 10 ? h + d / 100 : h + d / 10, min = Math.round((x - h) * 60);
      return q(`${N(x)} h = ____ h ____ min`, `${h} h ${min} min`);
    },
  ],
  [
    () => {
      const e = pick(ESCALAS), cm = ri(2, 20);
      return q(`Escala 1 : ${N(e)}. ${cm} cm no mapa = ____ km`, `${N((cm * e) / 100000)} km`);
    },
    () => {
      const e = pick(ESCALAS), cm = ri(2, 15);
      return q(`${N((cm * e) / 100000)} km reais = ${cm} cm no mapa. Escala =`, `1 : ${N(e)}`);
    },
    () => {
      const v = 10 * ri(3, 12), t = pick([15, 20, 30, 40, 45, 90, 120, 150]);
      const d = (v * t) / 60;
      if (!Number.isInteger(d)) return q(`${v * 2} km em 2 h. Velocidade média =`, `${v} km/h`);
      return q(`${N(d)} km em ${t} min. Velocidade média =`, `${v} km/h`);
    },
    () => {
      const dens = ri(5, 120) / 10, vol = ri(2, 50) * 10;
      return q(`Massa ${N(Number((dens * vol).toFixed(1)))} g, volume ${vol} cm^{3}. Densidade =`, `${N(dens)} g/cm^{3}`);
    },
    () => {
      const a = ri(1, 4), b = ri(1, 3), c = pick([5, 10, 15, 20]) / 10;
      return q(`Caixa d'água ${a} m × ${b} m × ${N(c)} m. Capacidade =`, `${N(a * b * c * 1000)} L`);
    },
  ],
];

// 15. Matrizes, determinantes e sistemas
const M = (linhas: (number | string)[][]) => `\\m{${linhas.map((l) => l.map((x) => (typeof x === 'number' ? N(x) : x)).join(',')).join(';')}}`;
const mat = (n: number, m: number, lo: number, hi: number) => Array.from({ length: n }, () => Array.from({ length: m }, () => ri(lo, hi)));
const det2 = (a: number[][]) => a[0][0] * a[1][1] - a[0][1] * a[1][0];
const det3 = (a: number[][]) =>
  a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) - a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) + a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
export const matrizes: Niveis = [
  [
    () => {
      const a = mat(2, 2, -9, 9);
      return q(`det ${M(a)} =`, N(det2(a)));
    },
    () => {
      const a = mat(2, 2, -9, 9), b = mat(2, 2, -9, 9);
      return q(`${M(a)} + ${M(b)} =`, M(a.map((l, i) => l.map((x, j) => x + b[i][j]))));
    },
    () => {
      const a = mat(2, 2, -8, 9), k = rnz(-5, 5);
      return q(`${N(k)} · ${M(a)} =`, M(a.map((l) => l.map((x) => k * x))));
    },
    () => {
      const a = mat(3, 3, -9, 9);
      return q(`Traço de ${M(a)}:`, N(a[0][0] + a[1][1] + a[2][2]));
    },
  ],
  [
    () => {
      const a = mat(2, 2, -4, 5), b = mat(2, 2, -4, 5);
      const c = [0, 1].map((i) => [0, 1].map((j) => a[i][0] * b[0][j] + a[i][1] * b[1][j]));
      return q(`${M(a)} · ${M(b)} =`, M(c));
    },
    () => {
      const a = mat(3, 3, -3, 5);
      return q(`det ${M(a)} =`, N(det3(a)));
    },
    () => {
      const x = rnz(-9, 9), b = rnz(-9, 9), c = rnz(-9, 9), d = rnz(-9, 9);
      return q(`det ${M([['x', b], [c, d]])} = ${N(x * d - b * c)}`, `x = ${N(x)}`);
    },
    () => {
      const a = mat(2, 3, -9, 9);
      return q(`Transposta de ${M(a)}:`, M([0, 1, 2].map((j) => [a[0][j], a[1][j]])));
    },
  ],
  [
    () => {
      for (;;) {
        const a = mat(2, 2, -6, 7), d = det2(a);
        if (![1, -1, 2, -2].includes(d)) continue;
        const inv = [
          [F(a[1][1], d), F(-a[0][1], d)],
          [F(-a[1][0], d), F(a[0][0], d)],
        ];
        return q(`Inversa de ${M(a)}:`, M(inv));
      }
    },
    () => {
      const a = mat(3, 3, -6, 9);
      return q(`det ${M(a)} =`, N(det3(a)));
    },
    () => {
      for (;;) {
        const s = [rnz(-5, 5), rnz(-5, 5), rnz(-5, 5)], a = mat(3, 3, -3, 4);
        if (det3(a) === 0 || a.some((l) => l.every((x) => x === 0))) continue;
        const eqs = a.map((l) => `${poli([[l[0], 'x'], [l[1], 'y'], [l[2], 'z']])} = ${N(l[0] * s[0] + l[1] * s[1] + l[2] * s[2])}`);
        return q(eqs.join('\n'), `x = ${N(s[0])}, y = ${N(s[1])}, z = ${N(s[2])}`);
      }
    },
    () => {
      const n = ri(2, 3), d = rnz(-8, 8), k = pick([2, 3, -1, -2]);
      return pick([
        () => q(`A é ${n}×${n} e det A = ${N(d)}. det(${N(k)}A) =`, N(k ** n * d)),
        () => q(`det A = ${N(d)}. det(A^{−1}) =`, F(1, d)),
        () => q(`det A = ${N(d)}. det(A^{2}) =`, N(d * d)),
        () => q(`det A = ${N(d)}. det(A^{t}) =`, N(d)),
      ])();
    },
  ],
];

// 16. Geometria analítica
function vetorTerna(): [number, number, number] {
  const [a, b, c] = terna(3);
  const t: [number, number, number] = Math.random() < 0.5 ? [a, b, c] : [b, a, c];
  return [t[0] * (Math.random() < 0.5 ? -1 : 1), t[1] * (Math.random() < 0.5 ? -1 : 1), t[2]];
}
export const geoAnalitica: Niveis = [
  [
    () => {
      const [dx, dy, d] = vetorTerna(), x = rnz(-8, 8), y = rnz(-8, 8);
      return q(`Distância entre A${ponto(x, y)} e B${ponto(x + dx, y + dy)}:`, N(d));
    },
    () => {
      const x1 = rnz(-10, 10), y1 = rnz(-10, 10), x2 = x1 + 2 * rnz(-6, 6), y2 = y1 + 2 * rnz(-6, 6);
      return q(`Ponto médio de A${ponto(x1, y1)} e B${ponto(x2, y2)}:`, ponto((x1 + x2) / 2, (y1 + y2) / 2));
    },
    () => {
      const x1 = rnz(-8, 8), y1 = rnz(-8, 8), dx = rnz(-6, 6), dy = rnz(-9, 9);
      return q(`Coeficiente angular da reta por A${ponto(x1, y1)} e B${ponto(x1 + dx, y1 + dy)}:`, F(dy, dx));
    },
  ],
  [
    () => {
      const m = rnz(-5, 5), b = ri(-9, 9), x1 = rnz(-5, 5);
      let x2 = rnz(-5, 5);
      if (x2 === x1) x2 = x1 + 1;
      return q(`Equação da reta por A${ponto(x1, m * x1 + b)} e B${ponto(x2, m * x2 + b)}:`, `y = ${lin(m, b)}`);
    },
    () => {
      let m1 = 0, m2 = 0;
      do {
        m1 = rnz(-5, 5);
        m2 = rnz(-5, 5);
      } while (m1 === m2);
      const x0 = rnz(-6, 6), y0 = rnz(-8, 8);
      return q(`Interseção de y = ${lin(m1, y0 - m1 * x0)} e y = ${lin(m2, y0 - m2 * x0)}:`, ponto(x0, y0));
    },
    () => {
      const m = rnz(-6, 6), b = ri(-9, 9);
      return q(`Coeficiente angular da perpendicular a y = ${lin(m, b)}:`, F(-1, m));
    },
    () => {
      const a = rnz(-9, 9), b = rnz(-9, 9), c = ri(-12, 12);
      return q(`Coeficiente angular de ${poli([[a, 'x'], [b, 'y'], [c, '']])} = 0:`, F(-a, b));
    },
  ],
  [
    () => {
      const h = ri(-6, 6), k = ri(-6, 6), r = ri(1, 9);
      return q(
        `Centro e raio de ${poli([[1, 'x^{2}'], [1, 'y^{2}'], [-2 * h, 'x'], [-2 * k, 'y'], [h * h + k * k - r * r, '']])} = 0`,
        `C${ponto(h, k)}, r = ${r}`,
      );
    },
    () => {
      const h = ri(-6, 6), k = ri(-6, 6), r = ri(1, 9);
      const xs = h === 0 ? 'x^{2}' : `${desloc('x', h)}^{2}`, ys = k === 0 ? 'y^{2}' : `${desloc('y', k)}^{2}`;
      return q(`Circunferência de centro ${ponto(h, k)} e raio ${r}:`, `${xs} + ${ys} = ${r * r}`);
    },
    () => {
      const [a, b, c] = vetorTerna(), x0 = rnz(-6, 6), y0 = rnz(-6, 6), cc = ri(-15, 15);
      return q(`Distância de P${ponto(x0, y0)} à reta ${poli([[a, 'x'], [b, 'y'], [cc, '']])} = 0:`, F(Math.abs(a * x0 + b * y0 + cc), c));
    },
    () => {
      for (;;) {
        const p = [rnz(-6, 6), rnz(-6, 6), rnz(-6, 6), rnz(-6, 6), rnz(-6, 6), rnz(-6, 6)];
        const d = Math.abs(p[0] * (p[3] - p[5]) + p[2] * (p[5] - p[1]) + p[4] * (p[1] - p[3]));
        if (d === 0) continue;
        return q(`Área do triângulo A${ponto(p[0], p[1])}, B${ponto(p[2], p[3])}, C${ponto(p[4], p[5])}:`, N(d / 2));
      }
    },
  ],
];

// 17. Números complexos e polinômios
const potI = ['1', 'i', '−1', '−i'];
export const complexos: Niveis = [
  [
    () => {
      const n = ri(2, 200);
      return q(`i^{${n}} =`, potI[n % 4]);
    },
    () => {
      const a = rnz(-9, 9), b = rnz(-9, 9), c = rnz(-9, 9), d = rnz(-9, 9);
      return Math.random() < 0.5
        ? q(`(${complexo(a, b)}) + (${complexo(c, d)}) =`, complexo(a + c, b + d))
        : q(`(${complexo(a, b)}) − (${complexo(c, d)}) =`, complexo(a - c, b - d));
    },
    () => {
      const a = rnz(-3, 3), b = ri(-5, 5), c = ri(-5, 5), d = ri(-9, 9), x = rnz(-3, 3);
      return q(`P(x) = ${poli([[a, 'x^{3}'], [b, 'x^{2}'], [c, 'x'], [d, '']])}. P(${N(x)}) =`, N(a * x ** 3 + b * x * x + c * x + d));
    },
    () => {
      const k = rnz(-6, 6), a = rnz(-9, 9), b = rnz(-9, 9);
      return q(`${N(k)}(${complexo(a, b)}) =`, complexo(k * a, k * b));
    },
  ],
  [
    () => {
      const a = rnz(-6, 6), b = rnz(-6, 6), c = rnz(-6, 6), d = rnz(-6, 6);
      return q(`(${complexo(a, b)})(${complexo(c, d)}) =`, complexo(a * c - b * d, a * d + b * c));
    },
    () => {
      const a = rnz(-9, 9), b = rnz(-9, 9);
      return q(`(${complexo(a, b)})(${complexo(a, -b)}) =`, N(a * a + b * b));
    },
    () => {
      const [a, b, c] = vetorTerna();
      return q(`|${complexo(a, b)}| =`, N(c));
    },
    () => {
      const p = [rnz(-3, 3), ri(-5, 5), ri(-5, 5), ri(-9, 9)], a = rnz(-3, 3);
      const v = p[0] * a ** 3 + p[1] * a * a + p[2] * a + p[3];
      return q(`Resto de ${poli([[p[0], 'x^{3}'], [p[1], 'x^{2}'], [p[2], 'x'], [p[3], '']])} dividido por ${lin(1, -a)}:`, N(v));
    },
  ],
  [
    () => {
      for (;;) {
        const a = rnz(-8, 8), b = rnz(-8, 8), c = rnz(-4, 4), d = rnz(-4, 4), m = c * c + d * d;
        if (m > 25) continue;
        return q(`\\f{${complexo(a, b)}}{${complexo(c, d)}} =`, complexoF(frac(a * c + b * d, m), frac(b * c - a * d, m)));
      }
    },
    () => {
      const s = pick([1, -1]), n = ri(2, 10);
      let re = 1, im = 0;
      for (let i = 0; i < n; i++) [re, im] = [re - s * im, im + s * re];
      return q(`(1 ${s > 0 ? '+' : '−'} i)^{${n}} =`, complexo(re, im));
    },
    () => {
      const r = [rnz(-5, 5), rnz(-5, 5), rnz(-5, 5)].sort((x, y) => x - y);
      const [a, b, c] = r;
      return q(
        `Raízes de ${poli([[1, 'x^{3}'], [-(a + b + c), 'x^{2}'], [a * b + a * c + b * c, 'x'], [-a * b * c, '']])} = 0`,
        lista([...new Set(r)], true),
      );
    },
    () => {
      const a = rnz(-4, 4), b = ri(-9, 9), c = ri(-9, 9), d = rnz(-9, 9);
      const eq = `${poli([[a, 'x^{3}'], [b, 'x^{2}'], [c, 'x'], [d, '']])} = 0`;
      return Math.random() < 0.5 ? q(`Soma das raízes de ${eq}:`, F(-b, a)) : q(`Produto das raízes de ${eq}:`, F(-d, a));
    },
  ],
];

// 18. Frações, fatoração e produtos notáveis
const fr = () => {
  const d = ri(2, 12);
  let n = ri(1, d * 2);
  while (n === d) n = ri(1, d * 2);
  return [n, d] as const;
};
export const fracoes: Niveis = [
  [
    () => {
      const [a, b] = fr(), [c, d] = fr();
      return Math.random() < 0.5 ? q(`\\f{${a}}{${b}} + \\f{${c}}{${d}} =`, F(a * d + b * c, b * d)) : q(`\\f{${a}}{${b}} − \\f{${c}}{${d}} =`, F(a * d - b * c, b * d));
    },
    () => {
      const [a, b] = fr(), [c, d] = fr();
      return q(`\\f{${a}}{${b}} × \\f{${c}}{${d}} =`, F(a * c, b * d));
    },
    () => {
      const [a, b] = fr(), [c, d] = fr();
      return q(`\\f{${a}}{${b}} ÷ \\f{${c}}{${d}} =`, F(a * d, b * c));
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(1, 15);
        b = ri(2, 16);
      } while (mdc(a, b) !== 1 || a === b);
      const k = ri(2, 9);
      return q(`Simplifique \\f{${a * k}}{${b * k}}`, F(a, b));
    },
    () => {
      const d = ri(2, 9), k = ri(2, 20);
      let n = ri(1, d - 1);
      while (mdc(n, d) !== 1) n = ri(1, d - 1);
      return q(`\\f{${n}}{${d}} de ${d * k} =`, N(n * k));
    },
  ],
  [
    () => {
      const [a, b] = fr(), [c, d] = fr(), [e, f] = fr();
      return q(`\\f{${a}}{${b}} + \\f{${c}}{${d}} − \\f{${e}}{${f}} =`, F(a * d * f + c * b * f - e * b * d, b * d * f));
    },
    () => {
      const a = ri(1, 12);
      return Math.random() < 0.5 ? q(`(x + ${a})^{2} =`, poli([[1, 'x^{2}'], [2 * a, 'x'], [a * a, '']])) : q(`(x − ${a})^{2} =`, poli([[1, 'x^{2}'], [-2 * a, 'x'], [a * a, '']]));
    },
    () => {
      const a = ri(1, 12);
      return q(`(x + ${a})(x − ${a}) =`, poli([[1, 'x^{2}'], [-a * a, '']]));
    },
    () => {
      const a = ri(2, 5), b = rnz(-9, 9);
      return q(`(${lin(a, b)})^{2} =`, poli([[a * a, 'x^{2}'], [2 * a * b, 'x'], [b * b, '']]));
    },
    () => {
      const a = ri(1, 6), b = ri(1, 6);
      return q(`(${a === 1 ? '' : a}x + ${b === 1 ? '' : b}y)^{2} =`, poli([[a * a, 'x^{2}'], [2 * a * b, 'xy'], [b * b, 'y^{2}']]));
    },
  ],
  [
    () => {
      const a = ri(1, 12);
      return q(`Fatore: x^{2} − ${a * a}`, `(x + ${a})(x − ${a})`);
    },
    () => {
      const a = ri(1, 12), s = pick([1, -1]);
      return q(`Fatore: ${poli([[1, 'x^{2}'], [2 * a * s, 'x'], [a * a, '']])}`, `(x ${s > 0 ? '+' : '−'} ${a})^{2}`);
    },
    () => {
      let r1 = 0, r2 = 0;
      do [r1, r2] = ordem(rnz(-9, 9), rnz(-9, 9));
      while (r1 === r2);
      return q(`Fatore: ${poli([[1, 'x^{2}'], [-(r1 + r2), 'x'], [r1 * r2, '']])}`, `${desloc('x', r1)}${desloc('x', r2)}`);
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(2, 6);
        b = ri(1, 9);
      } while (mdc(a, b) !== 1);
      return q(`Fatore: ${a * a}x^{2} − ${b * b}`, `(${a}x + ${b})(${a}x − ${b})`);
    },
    () => {
      const m = 10 * ri(2, 20), k = ri(1, 5);
      return q(`${m + k}^{2} − ${m - k}^{2} =`, N(4 * m * k));
    },
    () => {
      const a = ri(1, 9);
      return Math.random() < 0.5
        ? q(`Simplifique \\f{x^{2} − ${a * a}}{x + ${a}}`, `x − ${a}`)
        : q(`Simplifique \\f{x^{2} + ${2 * a}x + ${a * a}}{x + ${a}}`, `x + ${a}`);
    },
    () => {
      const [a, b] = fr(), [c, d] = fr();
      return q(`\\f{\\f{${a}}{${b}}}{\\f{${c}}{${d}}} =`, F(a * d, b * c));
    },
  ],
];

// 19. Potenciação, radiciação e conversão de unidades
const LIVRE = [2, 3, 5, 6, 7, 10, 11];
export const potencias: Niveis = [
  [
    () => {
      const b = ri(2, 12), n = b <= 3 ? ri(2, 6) : b <= 6 ? ri(2, 4) : ri(2, 3);
      return q(`${b}^{${n}} =`, N(b ** n));
    },
    () => {
      const a = ri(2, 6), n = ri(2, 4);
      return Math.random() < 0.5 ? q(`(−${a})^{${n}} =`, N((-a) ** n)) : q(`−${a}^{${n}} =`, N(-(a ** n)));
    },
    () => {
      const a = ri(2, 20);
      return pick([() => q(`${a}^{0} =`, '1'), () => q(`${a}^{1} =`, N(a)), () => q(`${a}^{−1} =`, F(1, a))])();
    },
    () => {
      const k = ri(1, 20);
      return q(`\\r{${k * k}} =`, N(k));
    },
    () => {
      const k = ri(1, 10);
      return q(`\\r[3]{${k ** 3}} =`, N(k));
    },
    () => conversao(),
  ],
  [
    () => {
      const a = ri(2, 9), m = ri(2, 9), n = ri(2, 9);
      return pick([
        () => q(`${a}^{${m}} · ${a}^{${n}} =`, `${a}^{${m + n}}`),
        () => q(`${a}^{${m + n}} ÷ ${a}^{${n}} =`, `${a}^{${m}}`),
        () => q(`(${a}^{${m}})^{${n}} =`, `${a}^{${m * n}}`),
      ])();
    },
    () => {
      const a = ri(2, 5), n = ri(1, 3);
      return q(`${a}^{−${n}} =`, F(1, a ** n));
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(1, 5);
        b = ri(2, 6);
      } while (a === b || mdc(a, b) !== 1);
      const n = ri(2, 3);
      return Math.random() < 0.5 ? q(`(\\f{${a}}{${b}})^{${n}} =`, F(a ** n, b ** n)) : q(`(\\f{${a}}{${b}})^{−${n}} =`, F(b ** n, a ** n));
    },
    () => {
      const k = ri(2, 10), m = pick(LIVRE);
      return q(`Simplifique \\r{${k * k * m}}`, R(k * k * m));
    },
    () => {
      const m = ri(1, 9), e = rnz(-5, 6);
      return q(`${m} × 10^{${N(e)}} em número decimal:`, N(Number((m * 10 ** e).toPrecision(10))));
    },
  ],
  [
    () => {
      const m = pick([2, 3, 5, 6, 7]), a = ri(1, 6), b = ri(1, 6);
      return Math.random() < 0.6
        ? q(`\\r{${a * a * m}} + \\r{${b * b * m}} =`, R(m, a + b))
        : q(`\\r{${a * a * m}} − \\r{${b * b * m}} =`, a === b ? '0' : R(m, a - b));
    },
    () => {
      const m = pick(LIVRE), k = ri(1, 12);
      return q(`Racionalize \\f{${k}}{\\r{${m}}}`, Fsimb(k, m, `\\r{${m}}`));
    },
    () => {
      for (;;) {
        const [b, a] = ordem(pick(LIVRE), pick(LIVRE));
        if (a === b) continue;
        const t = ri(1, 3), k = (a - b) * t;
        return q(`Racionalize \\f{${k}}{\\r{${a}} − \\r{${b}}}`, t === 1 ? `\\r{${a}} + \\r{${b}}` : `${t}(\\r{${a}} + \\r{${b}})`);
      }
    },
    () => {
      const c = ri(2, 5), qq = ri(2, 3), p = ri(1, 4);
      if (c ** (qq * p) > 100000) return q(`${c ** qq}^{\\f{1}{${qq}}} =`, N(c));
      return Math.random() < 0.7 ? q(`${N(c ** qq)}^{\\f{${p}}{${qq}}} =`, N(c ** p)) : q(`${N(c ** qq)}^{−\\f{${p}}{${qq}}} =`, F(1, c ** p));
    },
    () => {
      const a = ri(2, 15), b = ri(2, 15);
      return q(`\\r{${a}} · \\r{${b}} =`, R(a * b));
    },
  ],
];

// 20. Divisibilidade, números primos, MDC e MMC
function primo(n: number) {
  if (n < 2) return false;
  for (let k = 2; k * k <= n; k++) if (n % k === 0) return false;
  return true;
}
function fatores(n: number): [number, number][] {
  const r: [number, number][] = [];
  for (let p = 2; p * p <= n; p++) {
    let e = 0;
    while (n % p === 0) {
      n /= p;
      e++;
    }
    if (e) r.push([p, e]);
  }
  if (n > 1) r.push([n, 1]);
  return r;
}
const fatorado = (n: number) => fatores(n).map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(' · ');
const compostoAte = (max: number) => {
  for (;;) {
    const n = ri(12, max);
    if (!primo(n)) return n;
  }
};
export const divisibilidade: Niveis = [
  [
    () => {
      const g = ri(2, 12), a = g * ri(1, 8), b = g * ri(1, 8);
      return a === b ? q(`MDC(${a}, ${a * 2}) =`, N(a)) : q(`MDC(${a}, ${b}) =`, N(mdc(a, b)));
    },
    () => {
      const a = ri(2, 20), b = ri(2, 20);
      return a === b ? q(`MMC(${a}, ${a + 1}) =`, N(mmc(a, a + 1))) : q(`MMC(${a}, ${b}) =`, N(mmc(a, b)));
    },
    () => {
      const n = ri(2, 100);
      return q(`${n} é primo?`, primo(n) ? 'Sim' : 'Não');
    },
    () => {
      const b = ri(2, 12), a = ri(b + 1, 200);
      return q(`Resto de ${a} ÷ ${b}:`, N(a % b));
    },
    () => {
      const n = ri(6, 60), ds = [...Array(n)].map((_, i) => i + 1).filter((d) => n % d === 0);
      return q(`Divisores de ${n}:`, lista(ds));
    },
  ],
  [
    () => {
      const n = compostoAte(2000);
      return q(`Fatore ${N(n)} em primos:`, fatorado(n));
    },
    () => {
      const g = ri(2, 8), a = g * ri(1, 10), b = g * ri(1, 10), c = g * ri(1, 10);
      return q(`MDC(${a}, ${b}, ${c}) =`, N(mdc(mdc(a, b), c)));
    },
    () => {
      const a = ri(2, 15), b = ri(2, 15), c = ri(2, 15);
      return q(`MMC(${a}, ${b}, ${c}) =`, N(mmc(mmc(a, b), c)));
    },
    () => {
      const n = compostoAte(1000);
      return q(`Quantidade de divisores de ${n}:`, N(fatores(n).reduce((a, [, e]) => a * (e + 1), 1)));
    },
  ],
  [
    () => {
      let a = 0, b = 0;
      do {
        a = ri(4, 30);
        b = ri(4, 30);
      } while (a === b);
      return q(`Luzes piscam a cada ${a} s e ${b} s. Piscam juntas de novo após:`, `${mmc(a, b)} s`);
    },
    () => {
      const g = ri(3, 20), a = g * ri(2, 9), b = g * ri(2, 9);
      const gg = mdc(a, b);
      return Math.random() < 0.5
        ? q(`Fitas de ${a} cm e ${b} cm cortadas em pedaços iguais, os maiores possíveis. Tamanho:`, `${gg} cm`)
        : q(`Fitas de ${a} cm e ${b} cm cortadas em pedaços iguais, os maiores possíveis. Nº de pedaços:`, N((a + b) / gg));
    },
    () => {
      const [a, b, c] = pick([[2, 3, 4], [3, 4, 5], [4, 5, 6], [2, 5, 6], [3, 5, 7], [4, 6, 9], [2, 3, 5]]);
      const r = ri(1, a - 1);
      return q(`Menor número maior que ${r} que, dividido por ${a}, ${b} e ${c}, deixa resto ${r}:`, N(mmc(mmc(a, b), c) + r));
    },
    () => {
      const g = ri(2, 12), x = ri(1, 9), y = ri(1, 9);
      if (mdc(x, y) !== 1) return q(`MDC(a, b) = ${g}, a · b = ${g * g * 6}. MMC(a, b) =`, N(g * 6));
      return q(`MDC(a, b) = ${g}, a · b = ${N(g * x * g * y)}. MMC(a, b) =`, N(g * x * y));
    },
  ],
];

// 21. Módulo e função modular
export const modulo: Niveis = [
  [
    () => {
      const a = rnz(-50, 50);
      return q(`|${N(a)}| =`, N(Math.abs(a)));
    },
    () => {
      const a = ri(-20, 20), b = ri(-20, 20);
      return q(`|${N(a)} − ${P(b)}| =`, N(Math.abs(a - b)));
    },
    () => {
      const a = rnz(-20, 20), b = rnz(-20, 20);
      return Math.random() < 0.5 ? q(`|${N(a)}| + |${N(b)}| =`, N(Math.abs(a) + Math.abs(b))) : q(`|${N(a)}| · |${N(b)}| =`, N(Math.abs(a * b)));
    },
    () => {
      const a = ri(1, 30);
      return q(`−|−${a}| =`, N(-a));
    },
  ],
  [
    () => {
      const a = ri(1, 20);
      return q(`|x| = ${a}`, solucoes([N(-a), N(a)]));
    },
    () => {
      const k = rnz(-9, 9), a = ri(1, 12);
      return q(`|${lin(1, k)}| = ${a}`, solucoes([N(-a - k), N(a - k)]));
    },
    () => {
      const a = rnz(-5, 5), b = rnz(-12, 12), x = rnz(-6, 6);
      return q(`f(x) = |${lin(a, b)}|. f(${N(x)}) =`, N(Math.abs(a * x + b)));
    },
    () => {
      const a = ri(1, 9), b = ri(1, 15);
      if (Math.random() < 0.2) return q(`|x| = −${a}`, 'Não há solução');
      return q(`|x| + ${a} = ${a + b}`, solucoes([N(-b), N(b)]));
    },
  ],
  [
    () => {
      const a = rnz(-9, 9), b = ri(1, 10), op = pick(['<', '≤']);
      return q(`|${lin(1, -a)}| ${op} ${b}`, `${N(a - b)} ${op} x ${op} ${N(a + b)}`);
    },
    () => {
      const a = rnz(-9, 9), b = ri(1, 10), op = pick(['>', '≥']);
      const inv = op === '>' ? '<' : '≤';
      return q(`|${lin(1, -a)}| ${op} ${b}`, `x ${inv} ${N(a - b)} ou x ${op} ${N(a + b)}`);
    },
    () => {
      const a = ri(2, 5), b = rnz(-9, 9), c = ri(1, 12);
      const s = [(c - b) / a, (-c - b) / a].sort((x, y) => x - y);
      return q(`|${lin(a, b)}| = ${c}`, solucoes(s.map((v) => F(Math.round(v * a), a))));
    },
    () => {
      let a = 0, b = 0;
      do {
        a = rnz(-9, 9);
        b = rnz(-9, 9);
      } while (a === b);
      return q(`|${lin(1, -a)}| = |${lin(1, -b)}|`, `x = ${F(a + b, 2)}`);
    },
  ],
];

// 22. Função composta e função inversa
function inversaAfim(a: number, b: number) {
  if (a === 1) return lin(1, -b);
  if (a === -1) return lin(-1, b);
  return a > 0 ? `\\f{${lin(1, -b)}}{${a}}` : `\\f{${lin(-1, b)}}{${-a}}`;
}
export const composta: Niveis = [
  [
    () => {
      const a = rnz(-5, 5), b = ri(-9, 9), c = rnz(-5, 5), d = ri(-9, 9), x = rnz(-5, 5);
      return pick([
        () => q(`f(x) = ${lin(a, b)}, g(x) = ${lin(c, d)}. f(g(${N(x)})) =`, N(a * (c * x + d) + b)),
        () => q(`f(x) = ${lin(a, b)}, g(x) = ${lin(c, d)}. g(f(${N(x)})) =`, N(c * (a * x + b) + d)),
        () => q(`f(x) = ${lin(a, b)}. f(f(${N(x)})) =`, N(a * (a * x + b) + b)),
      ])();
    },
    () => {
      const a = rnz(-3, 3), c = ri(-9, 9), g = rnz(-4, 4), h = ri(-9, 9), x = rnz(-4, 4);
      return q(`f(x) = ${poli([[a, 'x^{2}'], [c, '']])}, g(x) = ${lin(g, h)}. f(g(${N(x)})) =`, N(a * (g * x + h) ** 2 + c));
    },
  ],
  [
    () => {
      const a = rnz(-5, 5), b = ri(-9, 9), c = rnz(-5, 5), d = ri(-9, 9);
      return Math.random() < 0.5
        ? q(`f(x) = ${lin(a, b)}, g(x) = ${lin(c, d)}. f(g(x)) =`, lin(a * c, a * d + b))
        : q(`f(x) = ${lin(a, b)}, g(x) = ${lin(c, d)}. g(f(x)) =`, lin(c * a, c * b + d));
    },
    () => {
      const a = pick([-5, -4, -3, -2, 2, 3, 4, 5, 1, -1]), b = rnz(-9, 9);
      return q(`Inversa de f(x) = ${lin(a, b)}:`, `f^{−1}(x) = ${inversaAfim(a, b)}`);
    },
    () => {
      const a = rnz(-5, 5), b = ri(-9, 9), y = rnz(-12, 12);
      return q(`f(x) = ${lin(a, b)}. f^{−1}(${N(y)}) =`, F(y - b, a));
    },
  ],
  [
    () => {
      const p = rnz(-9, 9), a = rnz(-4, 4), b = rnz(-6, 6);
      return Math.random() < 0.5
        ? q(`f(x) = ${poli([[1, 'x^{2}'], [p, '']])}, g(x) = ${lin(a, b)}. f(g(x)) =`, poli([[a * a, 'x^{2}'], [2 * a * b, 'x'], [b * b + p, '']]))
        : q(`f(x) = ${poli([[1, 'x^{2}'], [p, '']])}, g(x) = ${lin(a, b)}. g(f(x)) =`, poli([[a, 'x^{2}'], [a * p + b, '']]));
    },
    () => {
      const a = rnz(-4, 4), b = ri(-9, 9), c = rnz(-4, 4), d = ri(-9, 9);
      return q(`f(x) = ${lin(a, b)} e f(g(x)) = ${lin(a * c, a * d + b)}. g(x) =`, lin(c, d));
    },
    () => {
      for (;;) {
        const a = rnz(-5, 5), b = ri(-9, 9), c = rnz(-4, 4), d = ri(-9, 9);
        if (a * d - b * c === 0) continue;
        // f⁻¹(x) = (−dx + b)/(cx − a); deixa o x do denominador positivo
        const s = c < 0 ? -1 : 1;
        return q(`Inversa de f(x) = \\f{${lin(a, b)}}{${lin(c, d)}}:`, `f^{−1}(x) = \\f{${lin(-d * s, b * s)}}{${lin(c * s, -a * s)}}`);
      }
    },
  ],
];

// 23. Binômio de Newton e triângulo de Pascal
export const binomio: Niveis = [
  [
    () => {
      const n = ri(3, 12), p = ri(0, n);
      return q(`C_{${n},${p}} =`, N(comb(n, p)));
    },
    () => {
      const n = ri(2, 8);
      return q(`Coeficientes de (a + b)^{${n}}:`, lista([...Array(n + 1)].map((_, k) => comb(n, k))));
    },
    () => {
      const n = ri(2, 12);
      return q(`Soma dos coeficientes de (a + b)^{${n}}:`, N(2 ** n));
    },
  ],
  [
    () => {
      const n = ri(3, 30);
      return q(`Número de termos de (x + ${ri(1, 9)})^{${n}}:`, N(n + 1));
    },
    () => {
      const p = rnz(-3, 3), qq = rnz(-3, 3), n = ri(2, 6);
      if ((p + qq) ** n > 100000 || p === 0) return q(`Soma dos coeficientes de (2x − 1)^{${n}}:`, '1');
      return q(`Soma dos coeficientes de (${lin(p, qq)})^{${n}}:`, N((p + qq) ** n));
    },
    () => {
      const a = rnz(-5, 5), n = ri(2, 3);
      return q(`(${lin(1, a)})^{${n}} =`, poli([...Array(n + 1)].map((_, k) => [comb(n, k) * a ** k, n - k === 0 ? '' : n - k === 1 ? 'x' : `x^{${n - k}}`] as [number, string])));
    },
    () => {
      const n = ri(4, 12), p = ri(1, n - 2);
      return q(`C_{${n},${p}} + C_{${n},${p + 1}} =`, N(comb(n + 1, p + 1)));
    },
  ],
  [
    () => {
      const a = rnz(-3, 3), n = ri(3, 8), k = ri(1, n - 1);
      return q(`Coeficiente de x^{${k}} em (${lin(1, a)})^{${n}}:`, N(comb(n, k) * a ** (n - k)));
    },
    () => {
      const a = ri(1, 3), n = 2 * ri(1, 4);
      return q(`Termo independente de (x + ${a === 1 ? '\\f{1}{x}' : `\\f{${a}}{x}`})^{${n}}:`, N(comb(n, n / 2) * a ** (n / 2)));
    },
    () => {
      const a = rnz(-3, 3), n = ri(4, 8), p = ri(1, n - 1), c = comb(n, p) * a ** p, e = n - p;
      const ord = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º'][p];
      return q(`${ord} termo de (${lin(1, a)})^{${n}}, potências de x decrescentes:`, poli([[c, e === 1 ? 'x' : `x^{${e}}`]]));
    },
  ],
];

// 24. Semelhança de triângulos e teorema de Tales
export const semelhanca: Niveis = [
  [
    () => {
      for (;;) {
        const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9), k = ri(2, 4);
        if (a + b <= c || a + c <= b || b + c <= a) continue;
        return q(`Triângulos semelhantes: lados ${a}, ${b}, ${c} e ${a * k}, ${b * k}, x`, `x = ${c * k}`);
      }
    },
    () => {
      for (;;) {
        const a = ri(2, 9), b = ri(2, 12), c = ri(2, 12), x = (b * c) / a;
        if (!Number.isInteger(x) || a === b || a === c) continue;
        return q(`Tales: segmentos ${a} e ${b} numa transversal; ${c} e x na outra`, `x = ${x}`);
      }
    },
    () => {
      const k = ri(2, 5), p = ri(6, 30);
      return q(`Razão de semelhança ${k}. Perímetro do menor: ${p}. Perímetro do maior:`, N(k * p));
    },
  ],
  [
    () => {
      const k = ri(2, 5), A = ri(2, 30);
      return q(`Razão de semelhança ${k}. Área do menor: ${A}. Área do maior:`, N(k * k * A));
    },
    () => {
      const sp = pick([0.5, 0.8, 1.2, 1.5, 2, 2.4]), hp = pick([1.5, 1.6, 1.8, 2]), k = ri(2, 8);
      return q(`Pessoa de ${N(hp)} m faz sombra de ${N(sp)} m. Prédio faz sombra de ${N(Number((sp * k).toFixed(2)))} m. Altura do prédio:`, `${N(Number((hp * k).toFixed(2)))} m`);
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(1, 6);
        b = ri(2, 9);
      } while (a >= b || mdc(a, b) !== 1);
      return q(`Razão das áreas: \\f{${a * a}}{${b * b}}. Razão de semelhança:`, F(a, b));
    },
  ],
  [
    () => {
      const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]);
      const k = c, ca = a * k, cb = b * k, hip = c * k, m = (ca * ca) / hip, n = (cb * cb) / hip, h = (ca * cb) / hip;
      return pick([
        () => q(`Triângulo retângulo: projeções m = ${N(m)} e n = ${N(n)}. Altura h =`, N(h)),
        () => q(`Triângulo retângulo: hipotenusa ${N(hip)}, projeção m = ${N(m)}. Cateto sobre m =`, N(ca)),
        () => q(`Triângulo retângulo: catetos ${N(ca)} e ${N(cb)}, hipotenusa ${N(hip)}. Altura h =`, N(h)),
      ])();
    },
    () => {
      const k = ri(2, 4), V = ri(2, 20);
      return q(`Sólidos semelhantes, razão ${k}. Volume do menor: ${V}. Volume do maior:`, N(k ** 3 * V));
    },
    () => {
      const [a, b, c] = terna(2), h = (a * b) / c;
      return q(`Catetos ${a} e ${b}. Altura relativa à hipotenusa:`, Number.isInteger(h) ? N(h) : F(a * b, c));
    },
  ],
];

// 25. Circunferência e círculo
export const circunferencia: Niveis = [
  [
    () => {
      const r = ri(1, 30);
      return q(`Comprimento da circunferência de raio ${r}:`, Fsimb(2 * r, 1, 'π'));
    },
    () => {
      const r = ri(1, 30);
      return q(`Área do círculo de raio ${r}:`, Fsimb(r * r, 1, 'π'));
    },
    () => {
      const d = 2 * ri(1, 15);
      return q(`Área do círculo de diâmetro ${d}:`, Fsimb((d / 2) ** 2, 1, 'π'));
    },
    () => {
      const r = ri(1, 20);
      return q(`π ≈ 3,14. Comprimento da circunferência de raio ${r}:`, N(Number((2 * 3.14 * r).toFixed(2))));
    },
  ],
  [
    () => {
      const r = ri(2, 12), t = pick([30, 45, 60, 72, 90, 120, 135, 150, 180, 240, 270]);
      return q(`Área do setor: raio ${r}, ângulo ${t}°`, Fsimb(r * r * t, 360, 'π'));
    },
    () => {
      const r = ri(2, 12), t = pick([30, 45, 60, 90, 120, 135, 150, 180, 270]);
      return q(`Comprimento do arco: raio ${r}, ângulo ${t}°`, Fsimb(2 * r * t, 360, 'π'));
    },
    () => {
      const a = ri(10, 89);
      return Math.random() < 0.5 ? q(`Ângulo central ${2 * a}°. Ângulo inscrito no mesmo arco:`, `${a}°`) : q(`Ângulo inscrito ${a}°. Ângulo central no mesmo arco:`, `${2 * a}°`);
    },
    () => {
      const R0 = ri(3, 15), r = ri(1, R0 - 1);
      return q(`Área da coroa: R = ${R0}, r = ${r}`, Fsimb(R0 * R0 - r * r, 1, 'π'));
    },
  ],
  [
    () => {
      for (;;) {
        const a = ri(2, 12), b = ri(2, 12), c = ri(2, 12), d = (a * b) / c;
        if (!Number.isInteger(d) || c === a || c === b) continue;
        return q(`Cordas que se cruzam: ${a} · ${b} = ${c} · x. x =`, N(d));
      }
    },
    () => {
      for (;;) {
        const t = ri(2, 15), a = ri(1, t - 1), b = (t * t) / a;
        if (!Number.isInteger(b)) continue;
        return q(`Secante: PA = ${a}, PB = ${N(b)}. Tangente PT =`, N(t));
      }
    },
    () => {
      const r = ri(1, 15);
      return q(`Comprimento da circunferência: ${Fsimb(2 * r, 1, 'π')}. Área do círculo:`, Fsimb(r * r, 1, 'π'));
    },
    () => {
      const r = ri(2, 15);
      return pick([
        () => q(`Lado do quadrado inscrito em círculo de raio ${r}:`, R(2 * r * r)),
        () => q(`Lado do hexágono regular inscrito em círculo de raio ${r}:`, N(r)),
        () => q(`Lado do triângulo equilátero inscrito em círculo de raio ${r}:`, `${r}\\r{3}`),
      ])();
    },
    () => {
      const r = ri(2, 12), t = pick([30, 45, 60, 90, 120, 135, 150, 180, 270]);
      return q(`Arco de ${Fsimb(2 * r * t, 360, 'π')} em círculo de raio ${r}. Ângulo central:`, `${t}°`);
    },
  ],
];

// 26. Cônicas
const ternaPequena = () => pick<[number, number, number]>([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [4, 3, 5], [8, 6, 10], [12, 5, 13], [15, 8, 17], [12, 9, 15], [16, 12, 20], [7, 24, 25], [15, 20, 25], [20, 15, 25]]);
const quad = (n: number) => `\\f{x^{2}}{${n}}`;
const quadY = (n: number) => `\\f{y^{2}}{${n}}`;
export const conicas: Niveis = [
  [
    () => {
      let a = 0, b = 0;
      do {
        a = ri(2, 10);
        b = ri(1, 9);
      } while (b >= a);
      return Math.random() < 0.5 ? q(`${quad(a * a)} + ${quadY(b * b)} = 1. Eixo maior:`, N(2 * a)) : q(`${quad(a * a)} + ${quadY(b * b)} = 1. Eixo menor:`, N(2 * b));
    },
    () => {
      const h = ri(-6, 6), k = ri(-6, 6), a = ri(2, 6), b = ri(1, a - 1);
      const xs = h === 0 ? 'x^{2}' : `${desloc('x', h)}^{2}`, ys = k === 0 ? 'y^{2}' : `${desloc('y', k)}^{2}`;
      return q(`Centro de \\f{${xs}}{${a * a}} + \\f{${ys}}{${b * b}} = 1`, ponto(h, k));
    },
    () => {
      const r = ri(1, 15);
      return q(`Raio de x^{2} + y^{2} = ${r * r}`, N(r));
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(2, 10);
        b = ri(1, 9);
      } while (b >= a);
      return q(`Vértices no eixo x de ${quad(a * a)} + ${quadY(b * b)} = 1`, `(±${a}, 0)`);
    },
  ],
  [
    () => {
      const [b, c, a] = ternaPequena();
      return q(`Focos de ${quad(a * a)} + ${quadY(b * b)} = 1`, `(±${c}, 0)`);
    },
    () => {
      const [b, c, a] = ternaPequena();
      return q(`Excentricidade de ${quad(a * a)} + ${quadY(b * b)} = 1`, F(c, a));
    },
    () => {
      const [a, b, c] = ternaPequena();
      return q(`Focos de ${quad(a * a)} − ${quadY(b * b)} = 1`, `(±${c}, 0)`);
    },
    () => {
      const p = rnz(-9, 9);
      return Math.random() < 0.5 ? q(`Foco de y^{2} = ${N(4 * p)}x`, ponto(p, 0)) : q(`Diretriz de y^{2} = ${N(4 * p)}x`, `x = ${N(-p)}`);
    },
    () => {
      const p = rnz(-9, 9);
      return Math.random() < 0.5 ? q(`Foco de x^{2} = ${N(4 * p)}y`, ponto(0, p)) : q(`Diretriz de x^{2} = ${N(4 * p)}y`, `y = ${N(-p)}`);
    },
  ],
  [
    () => {
      const a = ri(1, 9), b = ri(1, 9);
      return q(`Assíntotas de ${quad(a * a)} − ${quadY(b * b)} = 1`, `y = ±${F(b, a) === '1' ? '' : F(b, a)}x`);
    },
    () => {
      const [b, c, a] = ternaPequena();
      return q(`Elipse com focos (±${c}, 0) e eixo maior ${2 * a}. Equação:`, `${quad(a * a)} + ${quadY(b * b)} = 1`);
    },
    () => {
      const [a, b, c] = ternaPequena();
      return q(`Excentricidade de ${quad(a * a)} − ${quadY(b * b)} = 1`, F(c, a));
    },
    () => {
      const p = rnz(-6, 6);
      return q(`Parábola de vértice (0, 0) e foco (0, ${N(p)}). Equação:`, `x^{2} = ${N(4 * p)}y`);
    },
    () => {
      const [b, c, a] = ternaPequena();
      return q(`Focos de ${quad(b * b)} + ${quadY(a * a)} = 1`, `(0, ±${c})`);
    },
  ],
];
