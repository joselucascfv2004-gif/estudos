// Geradores de exercícios (assuntos 1 a 13). Cada nível tem várias "receitas"; cada receita sorteia
// números e devolve o enunciado curto (e) e a resposta final (r) na marcação descrita em util.ts.
import {
  D, F, Fsimb, N, P, R, arranjo, comb, dinheiro, embaralhar, fatorial, lista, mdc, mmc, pick, poli, q, ri, rnz,
  solucoes, terna, type Niveis,
} from './util';

const ordem = (a: number, b: number) => (a < b ? [a, b] : [b, a]);
const bolas = (n: number, cor: 'azul' | 'vermelha') => `${n} ${cor === 'azul' ? (n === 1 ? 'azul' : 'azuis') : n === 1 ? 'vermelha' : 'vermelhas'}`;

// 1. Números e operações
export const numeros: Niveis = [
  [
    () => {
      const a = ri(12, 999), b = ri(12, 999);
      return q(`${N(a)} + ${N(b)} =`, N(a + b));
    },
    () => {
      const [b, a] = ordem(ri(10, 999), ri(10, 999));
      return q(`${N(a)} − ${N(b)} =`, N(a - b));
    },
    () => {
      const a = ri(12, 99), b = ri(2, 9);
      return q(`${a} × ${b} =`, N(a * b));
    },
    () => {
      const b = ri(2, 9), r = ri(11, 99);
      return q(`${b * r} ÷ ${b} =`, N(r));
    },
    () => {
      const a = rnz(-15, 15), b = rnz(-15, 15);
      return q(`${N(a)} + ${P(b)} =`, N(a + b));
    },
    () => {
      const a = rnz(-15, 15), b = rnz(-15, 15);
      return q(`${N(a)} − ${P(b)} =`, N(a - b));
    },
  ],
  [
    () => {
      const a = rnz(-12, 12), b = rnz(-12, 12);
      return q(`${P(a)} × ${P(b)} =`, N(a * b));
    },
    () => {
      const b = rnz(-9, 9), r = rnz(-12, 12);
      return q(`${P(b * r)} ÷ ${P(b)} =`, N(r));
    },
    () => {
      const a = ri(2, 30), b = ri(2, 12), c = ri(2, 12);
      return q(`${a} + ${b} × ${c} =`, N(a + b * c));
    },
    () => {
      const a = ri(1, 20), b = ri(1, 20), c = rnz(-6, 9);
      return q(`(${a} − ${b}) × ${P(c)} =`, N((a - b) * c));
    },
    () => {
      const a = ri(11, 999), b = ri(11, 999);
      return q(`${D(a, 1)} + ${D(b, 2)} =`, N((a * 10 + b) / 100));
    },
    () => {
      const a = ri(2, 99), b = ri(2, 99);
      return q(`${D(a, 1)} × ${D(b, 1)} =`, N((a * b) / 100));
    },
  ],
  [
    () => {
      const a = ri(5, 40), b = ri(1, 10), c = ri(1, 12), d = ri(1, 12), e = rnz(-5, 6);
      return q(`${a} − [${b} + (${c} − ${d}) × ${P(e)}] =`, N(a - (b + (c - d) * e)));
    },
    () => {
      const x = ri(2, 40), dv = pick([5, 2, 4, 8, 25, 15, 12, 35, 45, 75]);
      return q(`${N((x * dv) / 100)} ÷ ${D(dv, 2)} =`, N(x));
    },
    () => {
      const m1 = ri(2, 4), m2 = ri(1, 2), e1 = rnz(-6, 8), e2 = rnz(-6, 8);
      return q(`(${m1} × 10^{${N(e1)}}) × (${m2} × 10^{${N(e2)}}) =`, `${m1 * m2} × 10^{${N(e1 + e2)}}`);
    },
    () => {
      const a = ri(1, 9), b = ri(1, 9), k = pick([-5, -4, -3, -2, 3, 4, 5, 6]);
      const num = k < 0 ? `0,${'0'.repeat(-k - 1)}${a}${b}` : N((a * 10 + b) * 10 ** (k - 1));
      return q(`Notação científica: ${num}`, `${a},${b} × 10^{${N(k)}}`);
    },
    () => {
      const a = ri(2, 4), n = ri(2, 4), b = ri(2, 9), c = rnz(-9, 9);
      return q(`(−${a})^{${n}} + ${b}^{2} − ${P(c)} =`, N((-a) ** n + b * b - c));
    },
  ],
];

// 2. Porcentagem
export const porcentagem: Niveis = [
  [
    () => {
      const p = pick([1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 12, 35]);
      const k = 100 / mdc(p, 100);
      const n = k * ri(1, Math.max(2, Math.floor(1000 / k)));
      return q(`${p}% de ${N(n)} =`, N((p * n) / 100));
    },
    () => {
      const [a, b] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [1, 20], [3, 20], [7, 20], [11, 20], [1, 25], [12, 25], [1, 50], [1, 8], [3, 8]]);
      return q(`\\f{${a}}{${b}} em porcentagem:`, `${N((100 * a) / b)}%`);
    },
    () => {
      const d = ri(1, 199);
      return q(`${D(d, 2)} em porcentagem:`, `${d}%`);
    },
    () => {
      const p = ri(1, 250);
      return q(`${p}% em número decimal:`, D(p, 2));
    },
  ],
  [
    () => {
      const v = 20 * ri(2, 100), p = pick([5, 10, 15, 20, 25, 30, 40, 50]);
      return q(`${dinheiro(v)} com aumento de ${p}% =`, dinheiro((v * (100 + p)) / 100));
    },
    () => {
      const v = 20 * ri(2, 100), p = pick([5, 10, 15, 20, 25, 30, 40, 50, 60]);
      return q(`${dinheiro(v)} com desconto de ${p}% =`, dinheiro((v * (100 - p)) / 100));
    },
    () => {
      let a = 0, b = 0, p = 0;
      do {
        b = pick([20, 25, 40, 50, 80, 120, 200, 250, 400, 500, 60, 150]);
        p = 5 * ri(1, 30);
        a = (b * p) / 100;
      } while (!Number.isInteger(a));
      return q(`${N(a)} é quantos % de ${N(b)}?`, `${p}%`);
    },
    () => {
      const p = ri(1, 90);
      return Math.random() < 0.5
        ? q(`Fator de aumento de ${p}%:`, D(100 + p, 2))
        : q(`Fator de desconto de ${p}%:`, D(100 - p, 2));
    },
  ],
  [
    () => {
      const a = pick([10, 20, 25, 50, 30]), b = pick([10, 20, 25, 40, 50]);
      const sa = sinalPct(), sb = sinalPct();
      const t = ((1 + (sa * a) / 100) * (1 + (sb * b) / 100) - 1) * 100;
      const tt = Math.round(t * 100) / 100;
      return q(
        `${sa > 0 ? '+' : '−'}${a}% e depois ${sb > 0 ? '+' : '−'}${b}%: variação total =`,
        `${tt > 0 ? '+' : ''}${N(tt)}%`,
      );
    },
    () => {
      const v = 20 * ri(2, 80), p = pick([10, 20, 25, 40, 50, 60, 75]);
      return q(`Preço após ${p}% de desconto: ${dinheiro((v * (100 - p)) / 100)}. Preço original =`, dinheiro(v));
    },
    () => {
      const v = 20 * ri(2, 80), p = pick([10, 20, 25, 50, 5, 15]);
      return q(`Preço após aumento de ${p}%: ${dinheiro((v * (100 + p)) / 100)}. Preço original =`, dinheiro(v));
    },
    () => {
      const t = ri(2, 3), c = t === 2 ? 100 * ri(5, 100) : 1000 * ri(1, 10), i = pick([10, 20]);
      const m = Math.round(c * (1 + i / 100) ** t * 100) / 100;
      return q(`Juros compostos: C = ${dinheiro(c)}, ${i}% a.m., ${t} meses. M =`, dinheiro(m));
    },
    () => {
      const c = 100 * ri(5, 100), i = ri(1, 5), t = ri(2, 12);
      return q(`Juros simples: C = ${dinheiro(c)}, ${i}% a.m., ${t} meses. J =`, dinheiro((c * i * t) / 100));
    },
  ],
];
function sinalPct() {
  return Math.random() < 0.5 ? -1 : 1;
}

// 3. Razão, proporção e regra de três
const coisas = [
  ['kg', 'kg'],
  ['litros', 'litros'],
  ['metros', 'metros'],
  ['caixas', 'caixas'],
  ['pacotes', 'pacotes'],
];
export const razao: Niveis = [
  [
    () => {
      let x = 0, y = 0;
      do {
        x = ri(1, 9);
        y = ri(2, 12);
      } while (x === y || mdc(x, y) !== 1);
      const k = ri(2, 12);
      return q(`Simplifique a razão ${x * k} : ${y * k}`, `${x} : ${y}`);
    },
    () => {
      let c = 0, d = 0;
      do {
        c = ri(1, 9);
        d = ri(2, 9);
      } while (c === d || mdc(c, d) !== 1);
      const m = ri(2, 9), n = ri(2, 6);
      return q(`\\f{x}{${d * m}} = \\f{${c * n}}{${d * n}}`, `x = ${c * m}`);
    },
    () => {
      let c = 0, d = 0;
      do {
        c = ri(1, 9);
        d = ri(2, 9);
      } while (c === d || mdc(c, d) !== 1);
      const m = ri(2, 9), n = ri(2, 6);
      return q(`\\f{${c * n}}{${d * n}} = \\f{${c * m}}{x}`, `x = ${d * m}`);
    },
    () => {
      const t = pick([
        () => {
          const a = 5 * ri(1, 11), b = ri(1, 4);
          return q(`Razão entre ${a} min e ${b} h:`, F(a, 60 * b));
        },
        () => {
          const a = 5 * ri(1, 19), b = ri(1, 3);
          return q(`Razão entre ${a} cm e ${b} m:`, F(a, 100 * b));
        },
        () => {
          const a = 50 * ri(1, 19), b = ri(1, 3);
          return q(`Razão entre ${a} g e ${b} kg:`, F(a, 1000 * b));
        },
      ]);
      return t();
    },
  ],
  [
    () => {
      const u = ri(2, 30), a = ri(2, 9);
      let b = ri(2, 15);
      if (b === a) b++;
      const [un] = pick(coisas);
      return q(`${a} ${un} → ${dinheiro(u * a)}\n${b} ${un} → ?`, dinheiro(u * b));
    },
    () => {
      let w1 = 0, w2 = 0;
      do {
        w1 = ri(2, 12);
        w2 = ri(2, 12);
      } while (w1 === w2);
      const tot = mmc(w1, w2) * ri(1, 4);
      return q(`${w1} operários → ${tot / w1} dias\n${w2} operários → ? dias`, `${tot / w2} dias`);
    },
    () => {
      let v1 = 0, v2 = 0;
      do {
        v1 = 10 * ri(4, 12);
        v2 = 10 * ri(4, 12);
      } while (v1 === v2);
      const dist = mmc(v1, v2) * ri(1, 2);
      return q(`${v1} km/h → ${dist / v1} h\n${v2} km/h → ? h`, `${N(dist / v2)} h`);
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(1, 9);
        b = ri(1, 9);
      } while (a === b);
      const k = ri(2, 30), t = (a + b) * k;
      return q(`Divida ${t} em partes proporcionais a ${a} e ${b}`, `${a * k} e ${b * k}`);
    },
    () => {
      const a = ri(1, 5), b = ri(2, 6), c = ri(3, 7), k = ri(2, 20);
      return q(`Divida ${(a + b + c) * k} em partes proporcionais a ${a}, ${b} e ${c}`, `${a * k}, ${b * k} e ${c * k}`);
    },
  ],
  [
    () => {
      for (;;) {
        const m1 = ri(2, 12), h1 = ri(4, 10), d1 = ri(4, 30), m2 = ri(2, 12), h2 = ri(4, 10);
        const d2 = (m1 * h1 * d1) / (m2 * h2);
        if (!Number.isInteger(d2) || (m1 === m2 && h1 === h2)) continue;
        return q(`${m1} máquinas, ${h1} h/dia → ${d1} dias\n${m2} máquinas, ${h2} h/dia → ? dias`, `${d2} dias`);
      }
    },
    () => {
      for (;;) {
        const p1 = ri(2, 10), d1 = ri(2, 10), pecas1 = ri(2, 30) * 10, p2 = ri(2, 10), d2 = ri(2, 10);
        const pecas2 = (pecas1 * p2 * d2) / (p1 * d1);
        if (!Number.isInteger(pecas2) || (p1 === p2 && d1 === d2)) continue;
        return q(`${p1} pessoas, ${d1} dias → ${pecas1} peças\n${p2} pessoas, ${d2} dias → ? peças`, `${pecas2} peças`);
      }
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(1, 9);
        b = ri(1, 9);
      } while (a === b);
      const g = mdc(a, b), s = (a + b) / g, k = ri(2, 20);
      const t = s * k;
      return q(`Divida ${t} em partes inversamente proporcionais a ${a} e ${b}`, `${(b / g) * k} e ${(a / g) * k}`);
    },
    () => {
      const [a, b, c] = pick([[2, 3, 6], [1, 2, 3], [2, 4, 5], [3, 4, 6], [1, 2, 4], [2, 3, 4], [3, 5, 15], [4, 6, 12]]);
      const l = mmc(mmc(a, b), c), k = ri(1, 6);
      const pa = (l / a) * k, pb = (l / b) * k, pc = (l / c) * k;
      return q(`Divida ${pa + pb + pc} em partes inversamente proporcionais a ${a}, ${b} e ${c}`, `${pa}, ${pb} e ${pc}`);
    },
    () => {
      let x = 0, y = 0;
      do {
        x = ri(1, 9);
        y = ri(1, 9);
      } while (x === y || mdc(x, y) !== 1);
      const k = ri(2, 15);
      return Math.random() < 0.5
        ? q(`\\f{a}{b} = \\f{${x}}{${y}} e a + b = ${(x + y) * k}`, `a = ${x * k}, b = ${y * k}`)
        : q(`\\f{a}{b} = \\f{${Math.max(x, y)}}{${Math.min(x, y)}} e a − b = ${Math.abs(x - y) * k}`, `a = ${Math.max(x, y) * k}, b = ${Math.min(x, y) * k}`);
    },
  ],
];

// 4. Equações, inequações e sistemas
const lin = (a: number, b: number, v = 'x') => poli([[a, v], [b, '']]);
export const equacoes: Niveis = [
  [
    () => {
      const x = rnz(-10, 10), a = ri(2, 9), b = rnz(-20, 20);
      return q(`${lin(a, b)} = ${N(a * x + b)}`, `x = ${N(x)}`);
    },
    () => {
      const x = rnz(-30, 30), b = rnz(-30, 30);
      return q(`${lin(1, b)} = ${N(x + b)}`, `x = ${N(x)}`);
    },
    () => {
      const a = ri(2, 9), b = rnz(-12, 12);
      return q(`\\f{x}{${a}} = ${N(b)}`, `x = ${N(a * b)}`);
    },
    () => {
      const a = pick([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]), x = rnz(-12, 12);
      return q(`${poli([[a, 'x']])} = ${N(a * x)}`, `x = ${N(x)}`);
    },
  ],
  [
    () => {
      let a = 0, c = 0;
      do {
        a = ri(2, 6);
        c = ri(1, 9);
      } while (a === c);
      const x = rnz(-9, 9), b = rnz(-9, 9), d = a * (x + b) - c * x;
      return q(`${a}(${lin(1, b)}) = ${lin(c, d)}`, `x = ${N(x)}`);
    },
    () => {
      const a = rnz(-6, 6), x0 = rnz(-9, 9), b = rnz(-15, 15), op = pick(['>', '<', '≥', '≤']);
      const inv: Record<string, string> = { '>': '<', '<': '>', '≥': '≤', '≤': '≥' };
      return q(`${lin(a, b)} ${op} ${N(a * x0 + b)}`, `x ${a < 0 ? inv[op] : op} ${N(x0)}`);
    },
    () => {
      const x = rnz(-10, 15), y = rnz(-10, 15);
      return q(`x + y = ${N(x + y)}\nx − y = ${N(x - y)}`, `x = ${N(x)}, y = ${N(y)}`);
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(2, 6);
        b = ri(2, 6);
      } while (a === b);
      const x = mmc(a, b) * rnz(-4, 5);
      return q(`\\f{x}{${a}} + \\f{x}{${b}} = ${N(x / a + x / b)}`, `x = ${N(x)}`);
    },
    () => {
      const k = ri(1, 15);
      return q(`x^{2} = ${k * k}`, solucoes([N(-k), N(k)]));
    },
    () => {
      const b = rnz(-12, 12);
      return q(`${poli([[1, 'x^{2}'], [-b, 'x']])} = 0`, solucoes([N(Math.min(0, b)), N(Math.max(0, b))]));
    },
  ],
  [
    () => {
      for (;;) {
        const x = rnz(-8, 8), y = rnz(-8, 8), a = rnz(-6, 6), b = rnz(-6, 6), d = rnz(-6, 6), e = rnz(-6, 6);
        if (a * e - b * d === 0) continue;
        return q(
          `${poli([[a, 'x'], [b, 'y']])} = ${N(a * x + b * y)}\n${poli([[d, 'x'], [e, 'y']])} = ${N(d * x + e * y)}`,
          `x = ${N(x)}, y = ${N(y)}`,
        );
      }
    },
    () => {
      const [r1, r2] = ordem(rnz(-9, 9), rnz(-9, 9));
      return q(`${poli([[1, 'x^{2}'], [-(r1 + r2), 'x'], [r1 * r2, '']])} = 0`, solucoes([N(r1), N(r2)]));
    },
    () => {
      let qq = 0, p = 0;
      do {
        qq = ri(2, 3);
        p = rnz(-7, 7);
      } while (mdc(p, qq) !== 1);
      const r = rnz(-6, 6);
      const raizes = [p / qq, r].sort((u, v) => u - v).map((v) => (v === r ? N(r) : F(p, qq)));
      return q(`${poli([[qq, 'x^{2}'], [-(qq * r + p), 'x'], [p * r, '']])} = 0`, solucoes(raizes));
    },
    () => {
      const a = ri(2, 4), [r1, r2] = ordem(rnz(-6, 6), rnz(-6, 6));
      return q(`${poli([[a, 'x^{2}'], [-a * (r1 + r2), 'x'], [a * r1 * r2, '']])} = 0`, solucoes([N(r1), N(r2)]));
    },
  ],
];

// 5. Funções afim e quadrática
export const funcoes: Niveis = [
  [
    () => {
      const a = rnz(-9, 9), b = rnz(-15, 15), x = rnz(-8, 8);
      return q(`f(x) = ${lin(a, b)}. f(${N(x)}) =`, N(a * x + b));
    },
    () => {
      const a = rnz(-9, 9), r = rnz(-10, 10);
      return q(`Raiz de f(x) = ${lin(a, -a * r)}`, `x = ${N(r)}`);
    },
    () => {
      const m = rnz(-5, 5), x1 = rnz(-6, 6);
      let x2 = rnz(-6, 6);
      if (x2 === x1) x2 = x1 + 2;
      const y1 = rnz(-8, 8);
      return q(`Coeficiente angular da reta por (${N(x1)}, ${N(y1)}) e (${N(x2)}, ${N(y1 + m * (x2 - x1))}):`, N(m));
    },
    () => {
      const a = rnz(-6, 6), b = rnz(-10, 10), x = rnz(-10, 10);
      return q(`f(x) = ${lin(a, b)}. Para f(x) = ${N(a * x + b)}, x =`, N(x));
    },
  ],
  [
    () => {
      const a = rnz(-3, 3), b = ri(-8, 8), c = ri(-10, 10), x = rnz(-5, 5);
      return q(`f(x) = ${poli([[a, 'x^{2}'], [b, 'x'], [c, '']])}. f(${N(x)}) =`, N(a * x * x + b * x + c));
    },
    () => {
      const [r1, r2] = ordem(rnz(-9, 9), rnz(-9, 9));
      return q(`Zeros de f(x) = ${poli([[1, 'x^{2}'], [-(r1 + r2), 'x'], [r1 * r2, '']])}`, r1 === r2 ? N(r1) : `${N(r1)} e ${N(r2)}`);
    },
    () => {
      const a = rnz(-6, 6), b = rnz(-10, 10), x1 = rnz(-5, 5);
      let x2 = rnz(-5, 5);
      if (x2 === x1) x2 = x1 + 1;
      return q(`f é afim, f(${N(x1)}) = ${N(a * x1 + b)} e f(${N(x2)}) = ${N(a * x2 + b)}. f(x) =`, lin(a, b));
    },
    () => {
      const a = rnz(-4, 4), b = ri(-9, 9), c = ri(-9, 9);
      return q(`Δ de ${poli([[a, 'x^{2}'], [b, 'x'], [c, '']])}:`, N(b * b - 4 * a * c));
    },
  ],
  [
    () => {
      const a = rnz(-3, 3), h = rnz(-6, 6), k = ri(-10, 10);
      return q(`Vértice de f(x) = ${poli([[a, 'x^{2}'], [-2 * a * h, 'x'], [a * h * h + k, '']])}`, `(${N(h)}, ${N(k)})`);
    },
    () => {
      const a = rnz(-3, 3), h = rnz(-6, 6), k = ri(-10, 10);
      return q(`Valor ${a > 0 ? 'mínimo' : 'máximo'} de f(x) = ${poli([[a, 'x^{2}'], [-2 * a * h, 'x'], [a * h * h + k, '']])}`, N(k));
    },
    () => {
      let r1 = 0, r2 = 0;
      do [r1, r2] = ordem(rnz(-8, 8), rnz(-8, 8));
      while (r1 === r2);
      const op = pick(['<', '>', '≤', '≥']);
      const exp = `${poli([[1, 'x^{2}'], [-(r1 + r2), 'x'], [r1 * r2, '']])} ${op} 0`;
      if (op === '<') return q(exp, `${N(r1)} < x < ${N(r2)}`);
      if (op === '≤') return q(exp, `${N(r1)} ≤ x ≤ ${N(r2)}`);
      if (op === '>') return q(exp, `x < ${N(r1)} ou x > ${N(r2)}`);
      return q(exp, `x ≤ ${N(r1)} ou x ≥ ${N(r2)}`);
    },
    () => {
      const a = rnz(-3, 3), h = rnz(-6, 6), k = ri(-10, 10);
      return q(`Eixo de simetria de f(x) = ${poli([[a, 'x^{2}'], [-2 * a * h, 'x'], [a * h * h + k, '']])}`, `x = ${N(h)}`);
    },
  ],
];

// 6. Função exponencial e logaritmo
function logDe(b: number) {
  return b === 10 ? 'log' : `log_{${b}}`;
}
export const exponencial: Niveis = [
  [
    () => {
      const b = ri(2, 6), n = ri(2, b <= 3 ? 7 : 4);
      return q(`${b}^{${n}} =`, N(b ** n));
    },
    () => {
      const b = pick([2, 3, 4, 5, 6, 7]), n = ri(0, b <= 3 ? 7 : 4);
      return q(`${logDe(b)} ${N(b ** n)} =`, N(n));
    },
    () => {
      const n = ri(-3, 6);
      return q(`log ${n >= 0 ? N(10 ** n) : `0,${'0'.repeat(-n - 1)}1`} =`, N(n));
    },
    () => {
      const b = ri(2, 6), n = ri(1, b <= 3 ? 7 : 4);
      return q(`${b}^{x} = ${N(b ** n)}`, `x = ${n}`);
    },
  ],
  [
    () => {
      const b = ri(2, 5), n = ri(1, b <= 3 ? 7 : 4), k = rnz(-3, 3);
      return q(`${b}^{${lin(1, k)}} = ${N(b ** n)}`, `x = ${N(n - k)}`);
    },
    () => {
      const c = pick([2, 3]), p = ri(1, 3);
      let qq = ri(1, 4);
      if (qq === p) qq++;
      return q(`${c ** p}^{x} = ${c ** qq}`, `x = ${F(qq, p)}`);
    },
    () => {
      const c = pick([2, 3, 5]), p = ri(2, 3), qq = ri(1, 5);
      return q(`${logDe(c ** p)} ${N(c ** qq)} =`, F(qq, p));
    },
    () => {
      for (;;) {
        const a = ri(0, 3), b = ri(0, 2), c = ri(0, 2), n = 2 ** a * 3 ** b * 5 ** c;
        if (n < 4 || (a === c && b === 0)) continue;
        const v = Math.round((a * 0.3 + b * 0.48 + c * 0.7) * 100) / 100;
        return q(`log 2 = 0,30 e log 3 = 0,48. log ${N(n)} =`, N(v));
      }
    },
    () => {
      const b = pick([2, 3, 6, 10, 5]), n = ri(1, b > 5 ? 2 : 3), tot = b ** n;
      const divs: number[] = [];
      for (let d = 2; d < tot; d++) if (tot % d === 0) divs.push(d);
      if (!divs.length) return q(`${logDe(b)} ${tot} =`, N(n));
      const x = pick(divs);
      return Math.random() < 0.6
        ? q(`${logDe(b)} ${x} + ${logDe(b)} ${tot / x} =`, N(n))
        : q(`${logDe(b)} ${tot * x} − ${logDe(b)} ${x} =`, N(n));
    },
  ],
  [
    () => {
      for (;;) {
        const c = pick([2, 3]), p = ri(1, 3), qq = ri(1, 3), m = rnz(-4, 4);
        if (p === qq || c ** Math.max(p, qq) > 27) continue;
        return q(`${c ** p}^{x} = ${c ** qq}^{${lin(1, m)}}`, `x = ${F(qq * m, p - qq)}`);
      }
    },
    () => {
      const b = pick([2, 3, 5, 10]), n = ri(1, b === 2 ? 5 : 2), a = ri(1, 5), x = rnz(-8, 10), c = b ** n - a * x;
      return q(`${logDe(b)}(${lin(a, c)}) = ${n}`, `x = ${N(x)}`);
    },
    () => {
      const ops: [number, number, number, number][] = [];
      for (const b of [2, 3, 10])
        for (let n = 1; n <= 7; n++)
          for (let x = 1; x <= 40; x++)
            for (let k = 1; k <= 20; k++) if (x * (x + k) === b ** n) ops.push([b, n, x, k]);
      const [b, n, x, k] = pick(ops);
      return q(`${logDe(b)} x + ${logDe(b)}(x + ${k}) = ${n}`, `x = ${x}`);
    },
    () => {
      let a = 0, b = 0;
      do {
        a = ri(2, 7);
        b = ri(2, 9);
      } while (a === b);
      const n = ri(1, a <= 3 ? 6 : 3);
      return q(`${logDe(a)} ${b} · ${logDe(b)} ${N(a ** n)} =`, N(n));
    },
    () => {
      const b = pick([2, 3]);
      let e1 = 0, e2 = 0;
      do [e1, e2] = ordem(ri(0, 4), ri(0, 4));
      while (e1 === e2);
      const y1 = b ** e1, y2 = b ** e2;
      return q(`${b}^{2x} − ${y1 + y2} · ${b}^{x} + ${y1 * y2} = 0`, solucoes([N(e1), N(e2)]));
    },
  ],
];

// 7. Progressões
const seq = (ts: number[]) => `(${ts.map(N).join(', ')}, ...)`;
export const progressoes: Niveis = [
  [
    () => {
      const a = rnz(-10, 20), r = rnz(-7, 9);
      return q(`PA ${seq([a, a + r, a + 2 * r])}. Razão =`, N(r));
    },
    () => {
      const a = rnz(-10, 20), r = rnz(-7, 9), n = ri(8, 30);
      return q(`a_{${n}} da PA ${seq([a, a + r, a + 2 * r])}`, N(a + (n - 1) * r));
    },
    () => {
      const a = ri(1, 5), r = pick([2, 3, 4, 5, -2, -3]);
      return q(`PG ${seq([a, a * r, a * r * r])}. Razão =`, N(r));
    },
    () => {
      const a = ri(1, 5), r = pick([2, 3, 4, 5, -2, -3]);
      return q(`Próximo termo da PG ${seq([a, a * r, a * r * r])}`, N(a * r ** 3));
    },
  ],
  [
    () => {
      const a = ri(1, 5), r = pick([2, 3, -2, 4]), n = ri(5, r === 4 || r === 3 ? 7 : 9);
      return q(`a_{${n}} da PG ${seq([a, a * r, a * r * r])}`, N(a * r ** (n - 1)));
    },
    () => {
      const a = rnz(-10, 15), r = rnz(-5, 8), n = ri(10, 40);
      return q(`Soma dos ${n} primeiros termos da PA ${seq([a, a + r, a + 2 * r])}`, N((n * (2 * a + (n - 1) * r)) / 2));
    },
    () => {
      const a = rnz(-10, 20), r = rnz(-7, 9), k = ri(5, 20);
      return q(`PA com a_{1} = ${N(a)} e a_{${k}} = ${N(a + (k - 1) * r)}. Razão =`, N(r));
    },
  ],
  [
    () => {
      const a = ri(1, 5), r = pick([2, 3, -2, 4]), n = ri(4, 7);
      return q(`Soma dos ${n} primeiros termos da PG ${seq([a, a * r, a * r * r])}`, N((a * (r ** n - 1)) / (r - 1)));
    },
    () => {
      const [nn, d] = pick([[1, 2], [1, 3], [1, 4], [-1, 2], [2, 3], [-1, 3], [1, 5], [3, 4]]);
      const a = d ** 3 * ri(1, 3);
      const ts = [0, 1, 2, 3].map((i) => (a * nn ** i) / d ** i);
      const txt = ts.map((t, i) => (i === 0 ? N(t) : `${t < 0 ? '−' : '+'} ${N(Math.abs(t))}`)).join(' ');
      return q(`${txt} + ... =`, F(a * d, d - nn));
    },
    () => {
      const a = rnz(-10, 20), r = rnz(-7, 9), n = ri(10, 60);
      return q(`Número de termos da PA (${N(a)}, ${N(a + r)}, ..., ${N(a + (n - 1) * r)})`, N(n));
    },
    () => {
      const a = rnz(-10, 20), r = rnz(-7, 9), i = ri(2, 6), j = i + ri(2, 8);
      return q(`PA com a_{${i}} = ${N(a + (i - 1) * r)} e a_{${j}} = ${N(a + (j - 1) * r)}. a_{1} =`, N(a));
    },
  ],
];

// 8. Geometria plana
export const geoPlana: Niveis = [
  [
    () => {
      const a = ri(2, 30), b = ri(2, 30);
      return q(`Área do retângulo ${a} cm × ${b} cm:`, `${N(a * b)} cm^{2}`);
    },
    () => {
      const l = ri(2, 25);
      return Math.random() < 0.5 ? q(`Área do quadrado de lado ${l} cm:`, `${l * l} cm^{2}`) : q(`Perímetro do quadrado de lado ${l} cm:`, `${4 * l} cm`);
    },
    () => {
      const b = ri(2, 20), h = ri(2, 20);
      return q(`Área do triângulo: base ${b} cm, altura ${h} cm`, `${N((b * h) / 2)} cm^{2}`);
    },
    () => {
      const a = ri(20, 100), b = ri(20, 150 - a);
      return q(`Triângulo com ângulos de ${a}° e ${b}°. Terceiro ângulo:`, `${180 - a - b}°`);
    },
    () => {
      const a = ri(5, 85);
      return Math.random() < 0.5 ? q(`Complemento de ${a}°:`, `${90 - a}°`) : q(`Suplemento de ${a}°:`, `${180 - a}°`);
    },
  ],
  [
    () => {
      const [a, b, c] = terna();
      return q(`Catetos ${a} e ${b}. Hipotenusa =`, N(c));
    },
    () => {
      const [a, b, c] = terna();
      return q(`Hipotenusa ${c}, um cateto ${a}. Outro cateto =`, N(b));
    },
    () => {
      const B = ri(6, 20), b = ri(2, B - 1), h = ri(2, 12);
      return q(`Área do trapézio: bases ${B} e ${b}, altura ${h}`, N(((B + b) * h) / 2));
    },
    () => {
      const D1 = ri(4, 20), d = ri(2, 16);
      return q(`Área do losango: diagonais ${D1} e ${d}`, N((D1 * d) / 2));
    },
    () => {
      const n = ri(5, 20);
      return q(`Soma dos ângulos internos de um polígono de ${n} lados:`, `${N((n - 2) * 180)}°`);
    },
    () => {
      const n = pick([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]);
      return q(`Ângulo interno do polígono regular de ${n} lados:`, `${N(((n - 2) * 180) / n)}°`);
    },
  ],
  [
    () => {
      const n = ri(5, 30);
      return q(`Número de diagonais de um polígono de ${n} lados:`, N((n * (n - 3)) / 2));
    },
    () => {
      const l = ri(2, 14);
      return q(`Área do triângulo equilátero de lado ${l}:`, Fsimb(l * l, 4, '\\r{3}'));
    },
    () => {
      const l = ri(2, 14);
      return q(`Altura do triângulo equilátero de lado ${l}:`, Fsimb(l, 2, '\\r{3}'));
    },
    () => {
      const l = ri(2, 20);
      return Math.random() < 0.5 ? q(`Diagonal do quadrado de lado ${l}:`, R(2 * l * l)) : q(`Diagonal do quadrado: ${l}\\r{2}. Lado =`, N(l));
    },
    () => {
      const [a, b, c] = pick([[13, 14, 15], [5, 5, 6], [5, 5, 8], [10, 13, 13], [9, 10, 17], [6, 25, 29], [7, 15, 20], [10, 17, 21], [11, 13, 20], [13, 20, 21], [3, 4, 5]]);
      const k = ri(1, 3), s = ((a + b + c) * k) / 2;
      const area = Math.round(Math.sqrt(s * (s - a * k) * (s - b * k) * (s - c * k)));
      return q(`Área do triângulo de lados ${a * k}, ${b * k} e ${c * k}:`, N(area));
    },
    () => {
      const l = ri(2, 12);
      return q(`Área do hexágono regular de lado ${l}:`, Fsimb(3 * l * l, 2, '\\r{3}'));
    },
  ],
];

// 9. Geometria espacial
export const geoEspacial: Niveis = [
  [
    () => {
      const a = ri(2, 15);
      return q(`Volume do cubo de aresta ${a} cm:`, `${N(a ** 3)} cm^{3}`);
    },
    () => {
      const a = ri(2, 20), b = ri(2, 15), c = ri(2, 12);
      return q(`Volume do bloco ${a} × ${b} × ${c} (cm):`, `${N(a * b * c)} cm^{3}`);
    },
    () => {
      const a = ri(2, 15);
      return q(`Área total do cubo de aresta ${a} cm:`, `${N(6 * a * a)} cm^{2}`);
    },
    () => {
      const a = 10 * ri(1, 10), b = 10 * ri(1, 6), c = 10 * ri(1, 5);
      return q(`Caixa ${a} cm × ${b} cm × ${c} cm. Capacidade em litros:`, `${N((a * b * c) / 1000)} L`);
    },
  ],
  [
    () => {
      const r = ri(1, 10), h = ri(2, 15);
      return q(`Volume do cilindro: r = ${r}, h = ${h}`, Fsimb(r * r * h, 1, 'π'));
    },
    () => {
      const r = ri(1, 10), h = ri(2, 15);
      return q(`Volume do cone: r = ${r}, h = ${h}`, Fsimb(r * r * h, 3, 'π'));
    },
    () => {
      const [a, b, c, d] = pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [2, 10, 11, 15], [3, 4, 12, 13], [2, 5, 14, 15], [8, 9, 12, 17]]);
      const k = ri(1, 3);
      return q(`Diagonal do bloco ${a * k} × ${b * k} × ${c * k}:`, N(d * k));
    },
    () => {
      const a = ri(2, 12);
      return q(`Diagonal do cubo de aresta ${a}:`, `${a}\\r{3}`);
    },
    () => {
      const l = ri(2, 12), h = ri(2, 15);
      return q(`Volume da pirâmide de base quadrada: lado ${l}, altura ${h}`, F(l * l * h, 3));
    },
  ],
  [
    () => {
      const r = ri(1, 12);
      return Math.random() < 0.5 ? q(`Volume da esfera de raio ${r}:`, Fsimb(4 * r ** 3, 3, 'π')) : q(`Área da superfície esférica de raio ${r}:`, Fsimb(4 * r * r, 1, 'π'));
    },
    () => {
      for (;;) {
        const v = ri(4, 30), f = ri(4, 30);
        if (f > 2 * v - 4 || v > 2 * f - 4) continue;
        return q(`Poliedro convexo com ${v} vértices e ${f} faces. Arestas =`, N(v + f - 2));
      }
    },
    () => {
      const [r, h, g] = terna(3);
      return Math.random() < 0.5 ? q(`Cone: r = ${r}, h = ${h}. Geratriz =`, N(g)) : q(`Cone: r = ${r}, h = ${h}. Área lateral =`, Fsimb(r * g, 1, 'π'));
    },
    () => {
      const r = ri(1, 10), h = ri(2, 15);
      return q(`Área total do cilindro: r = ${r}, h = ${h}`, Fsimb(2 * r * (r + h), 1, 'π'));
    },
  ],
];

// 10. Trigonometria
const RAIZ2 = '\\f{\\r{2}}{2}', RAIZ3 = '\\f{\\r{3}}{2}';
const VALORES: [number, string][] = [
  [0, '0'],
  [0.5, '\\f{1}{2}'],
  [Math.SQRT2 / 2, RAIZ2],
  [Math.sqrt(3) / 2, RAIZ3],
  [1, '1'],
  [Math.sqrt(3) / 3, '\\f{\\r{3}}{3}'],
  [Math.sqrt(3), '\\r{3}'],
];
type FT = 'sen' | 'cos' | 'tg';
function trig(f: FT, graus: number): string | null {
  const r = (graus * Math.PI) / 180;
  if (f === 'tg' && Math.abs(Math.cos(r)) < 1e-9) return null;
  const v = f === 'sen' ? Math.sin(r) : f === 'cos' ? Math.cos(r) : Math.tan(r);
  for (const [n, s] of VALORES) {
    if (Math.abs(v - n) < 1e-9) return s;
    if (Math.abs(v + n) < 1e-9) return `−${s}`;
  }
  return null;
}
const ANGULOS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
const rad = (g: number) => (g === 0 ? '0' : Fsimb(g, 180, 'π'));
export const trigonometria: Niveis = [
  [
    () => {
      for (;;) {
        const f = pick<FT>(['sen', 'cos', 'tg']), a = pick([0, 30, 45, 60, 90]), v = trig(f, a);
        if (v != null) return q(`${f} ${a}° =`, v);
      }
    },
    () => {
      const g = pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360, 15, 20, 36, 72]);
      return q(`${g}° em radianos:`, rad(g));
    },
    () => {
      const g = pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360, 15, 36]);
      return q(`${rad(g)} rad em graus:`, `${g}°`);
    },
    () => {
      const [a, b, c] = terna(2);
      const f = pick<FT>(['sen', 'cos', 'tg']);
      return q(`Catetos ${a} e ${b}, hipotenusa ${c}. ${f} do ângulo oposto ao cateto ${a}:`, f === 'sen' ? F(a, c) : f === 'cos' ? F(b, c) : F(a, b));
    },
  ],
  [
    () => {
      for (;;) {
        const f = pick<FT>(['sen', 'cos', 'tg']), a = pick(ANGULOS.filter((x) => x > 90)), v = trig(f, a);
        if (v != null) return q(`${f} ${a}° =`, v);
      }
    },
    () => {
      const [a, b, c] = terna(1);
      const quad = pick([1, 2]);
      return q(`sen x = \\f{${a}}{${c}}, x no ${quad}º quadrante. cos x =`, quad === 1 ? F(b, c) : F(-b, c));
    },
    () => {
      const [a, b, c] = terna(1);
      return q(`cos x = \\f{${b}}{${c}}, x no 1º quadrante. tg x =`, F(a, b));
    },
    () => {
      for (;;) {
        const f = pick<FT>(['sen', 'cos', 'tg']), a = pick([30, 45, 60, 90, 120, 135, 150]), v = trig(f, -a);
        if (v != null) return q(`${f}(−${a}°) =`, v);
      }
    },
  ],
  [
    () => {
      for (;;) {
        const b = ri(2, 16), c = ri(2, 16), ang = pick([60, 120]);
        const a2 = b * b + c * c + (ang === 60 ? -b * c : b * c), a = Math.round(Math.sqrt(a2));
        if (b === c || a * a !== a2) continue;
        return q(`Triângulo: lados ${b} e ${c} formam ${ang}°. Terceiro lado =`, N(a));
      }
    },
    () => {
      const a = ri(2, 20), A = pick([30, 45, 60, 90, 150]);
      const r = A === 30 || A === 150 ? N(a) : A === 45 ? Fsimb(a, 2, '\\r{2}') : A === 60 ? Fsimb(a, 3, '\\r{3}') : F(a, 2);
      return q(`Lado ${a} oposto a ${A}°. Raio da circunferência circunscrita =`, r);
    },
    () => {
      for (;;) {
        const f = pick<FT>(['sen', 'cos', 'tg']), a = pick(ANGULOS), v = trig(f, a);
        if (v == null) continue;
        const sols = ANGULOS.filter((g) => trig(f, g) === v);
        return q(`${f} x = ${v}, 0 ≤ x < 2π`, solucoes(sols.map(rad)));
      }
    },
    () => {
      const [a, b, c] = terna(1);
      return Math.random() < 0.5
        ? q(`sen x = \\f{${a}}{${c}}, x no 1º quadrante. sen 2x =`, F(2 * a * b, c * c))
        : q(`sen x = \\f{${a}}{${c}}, x no 1º quadrante. cos 2x =`, F(b * b - a * a, c * c));
    },
    () => {
      const [e, r] = pick([
        ['sen 75°', '\\f{\\r{6} + \\r{2}}{4}'],
        ['cos 75°', '\\f{\\r{6} − \\r{2}}{4}'],
        ['sen 15°', '\\f{\\r{6} − \\r{2}}{4}'],
        ['cos 15°', '\\f{\\r{6} + \\r{2}}{4}'],
        ['tg 15°', '2 − \\r{3}'],
        ['tg 75°', '2 + \\r{3}'],
        ['sen 105°', '\\f{\\r{6} + \\r{2}}{4}'],
        ['cos 105°', '\\f{\\r{2} − \\r{6}}{4}'],
      ]);
      return q(`${e} =`, r);
    },
  ],
];

// 11. Estatística
function dados(n: number, lo: number, hi: number) {
  return Array.from({ length: n }, () => ri(lo, hi));
}
export const estatistica: Niveis = [
  [
    () => {
      for (;;) {
        const n = ri(4, 6), v = dados(n - 1, 1, 20), s = v.reduce((a, b) => a + b, 0);
        const ult = ri(1, 25);
        if ((s + ult) % n) continue;
        return q(`Média de ${lista(embaralhar([...v, ult]))}:`, N((s + ult) / n));
      }
    },
    () => {
      const n = pick([5, 7]), v = dados(n, 1, 30), o = [...v].sort((a, b) => a - b);
      return q(`Mediana de ${lista(v)}:`, N(o[(n - 1) / 2]));
    },
    () => {
      const m = ri(1, 15), outros = embaralhar([...Array(20)].map((_, i) => i + 1).filter((x) => x !== m)).slice(0, ri(3, 5));
      const v = embaralhar([m, m, m, ...outros, ...(Math.random() < 0.5 ? [outros[0]] : [])]);
      return q(`Moda de ${lista(v)}:`, N(m));
    },
    () => {
      const v = dados(ri(5, 7), 1, 50);
      return q(`Amplitude de ${lista(v)}:`, N(Math.max(...v) - Math.min(...v)));
    },
  ],
  [
    () => {
      const v = dados(6, 1, 30), o = [...v].sort((a, b) => a - b);
      return q(`Mediana de ${lista(v)}:`, N((o[2] + o[3]) / 2));
    },
    () => {
      for (;;) {
        const k = ri(2, 3), notas = dados(k, 3, 10), pesos = dados(k, 1, 4);
        const W = pesos.reduce((a, b) => a + b, 0), S = notas.reduce((a, x, i) => a + x * pesos[i], 0);
        if ((S * 10) % W) continue;
        return q(`Média ponderada: notas ${lista(notas)} com pesos ${lista(pesos)}`, N(S / W));
      }
    },
    () => {
      const n = ri(4, 6), m = ri(4, 15);
      for (;;) {
        const v = dados(n - 1, 1, 20), falta = n * m - v.reduce((a, b) => a + b, 0);
        if (falta < 0 || falta > 30) continue;
        return q(`A média de ${n} números é ${m}. Se ${n - 1} deles são ${lista(v, true)}, o outro é:`, N(falta));
      }
    },
  ],
  [
    () => {
      for (;;) {
        const n = ri(4, 6), m = ri(3, 20), d = dados(n - 1, -4, 4), ult = -d.reduce((a, b) => a + b, 0);
        if (Math.abs(ult) > 6) continue;
        const desv = [...d, ult], vari = desv.reduce((a, x) => a + x * x, 0) / n;
        if (!Number.isInteger(vari) || vari === 0) continue;
        const v = embaralhar(desv.map((x) => m + x));
        const dp = Math.sqrt(vari);
        if (Number.isInteger(dp) && Math.random() < 0.6) return q(`Desvio padrão (população) de ${lista(v)}:`, N(dp));
        return q(`Variância (população) de ${lista(v)}:`, N(vari));
      }
    },
    () => {
      const n = ri(4, 12), m = ri(3, 15), k = rnz(-2, 3), v = m + k * (n + 1);
      if (v <= 0) return q(`Média de ${n} números: ${m}. Acrescentando o ${m + 2 * (n + 1)}, nova média =`, N(m + 2));
      return q(`Média de ${n} números: ${m}. Acrescentando o ${v}, nova média =`, N(m + k));
    },
    () => {
      for (;;) {
        const n = 6, v = dados(n, 1, 20), o = [...v].sort((a, b) => a - b);
        const med = (o[2] + o[3]) / 2, media = v.reduce((a, b) => a + b, 0) / n;
        if (!Number.isInteger(media)) continue;
        return q(`${lista(v)}: média − mediana =`, N(media - med));
      }
    },
  ],
];

// 12. Análise combinatória
const SEM_REPETIR = ['AMOR', 'VIDA', 'LIVRO', 'PRATO', 'MUNDO', 'PEDRA', 'BRASIL', 'CINEMA', 'ESCOLA', 'NUVEM', 'SOL', 'LUA', 'CAMPO', 'TRIGO', 'FUTEBOL', 'JOGAR', 'PAINEL'];
const COM_REPETIR = ['ARARA', 'BANANA', 'MATEMATICA', 'CASA', 'PAPAI', 'MACACO', 'PIPOCA', 'BATATA', 'CABANA', 'ABACAXI', 'CARRO', 'PASSARO', 'ESTATISTICA', 'OVO', 'MAMAE'];
function anagramas(p: string) {
  const cont: Record<string, number> = {};
  for (const ch of p) cont[ch] = (cont[ch] ?? 0) + 1;
  return Object.values(cont).reduce((a, k) => a / fatorial(k), fatorial(p.length));
}
export const combinatoria: Niveis = [
  [
    () => {
      const n = ri(0, 8);
      return q(`${n}! =`, N(fatorial(n)));
    },
    () => {
      const n = ri(5, 15), m = n - ri(1, 3);
      return q(`\\f{${n}!}{${m}!} =`, N(fatorial(n) / fatorial(m)));
    },
    () => {
      const a = ri(2, 8), b = ri(2, 8), c = ri(2, 5);
      return Math.random() < 0.5
        ? q(`${a} camisas e ${b} calças. Combinações de roupa:`, N(a * b))
        : q(`${a} entradas, ${b} pratos e ${c} sobremesas. Cardápios possíveis:`, N(a * b * c));
    },
  ],
  [
    () => {
      const n = ri(4, 12), p = ri(2, Math.min(4, n - 1));
      return q(`A_{${n},${p}} =`, N(arranjo(n, p)));
    },
    () => {
      const n = ri(4, 15), p = ri(2, Math.min(5, n - 1));
      return q(`C_{${n},${p}} =`, N(comb(n, p)));
    },
    () => {
      const w = pick(SEM_REPETIR);
      return q(`Anagramas de ${w}:`, N(anagramas(w)));
    },
    () => {
      const k = ri(4, 7), p = ri(2, 3);
      return q(`Números de ${p} algarismos distintos usando ${lista([...Array(k)].map((_, i) => i + 1), true)}:`, N(arranjo(k, p)));
    },
  ],
  [
    () => {
      const w = pick(COM_REPETIR);
      return q(`Anagramas de ${w}:`, N(anagramas(w)));
    },
    () => {
      const H = ri(4, 8), M = ri(3, 7), a = ri(1, 3), b = ri(1, 3);
      return q(`Comissões com ${a} de ${H} homens e ${b} de ${M} mulheres:`, N(comb(H, a) * comb(M, b)));
    },
    () => {
      const n = ri(3, 9);
      return q(`${n} pessoas em volta de uma mesa redonda. Disposições:`, N(fatorial(n - 1)));
    },
    () => {
      const n = ri(4, 16);
      return Math.random() < 0.5 ? q(`C_{n,2} = ${comb(n, 2)}. n =`, N(n)) : q(`A_{n,2} = ${arranjo(n, 2)}. n =`, N(n));
    },
    () => {
      const n = ri(5, 12);
      return q(`Apertos de mão entre ${n} pessoas (cada par uma vez):`, N(comb(n, 2)));
    },
  ],
];

// 13. Probabilidade
const EVENTOS_DADO: [string, number][] = [
  ['número par', 3],
  ['número ímpar', 3],
  ['número maior que 4', 2],
  ['número menor que 3', 2],
  ['múltiplo de 3', 2],
  ['número primo', 3],
  ['o número 6', 1],
  ['número maior que 2', 4],
  ['divisor de 6', 4],
  ['número menor que 6', 5],
];
export const probabilidade: Niveis = [
  [
    () => {
      const [e, k] = pick(EVENTOS_DADO);
      return q(`Um dado: P(${e}) =`, F(k, 6));
    },
    () => {
      const a = ri(1, 12), v = ri(1, 12);
      return q(`Urna com ${bolas(a, 'azul')} e ${bolas(v, 'vermelha')}. P(azul) =`, F(a, a + v));
    },
    () => {
      const n = ri(1, 5);
      return q(`${n === 1 ? 'Uma moeda' : `${n} moedas`}: P(${n === 1 ? 'cara' : 'todas cara'}) =`, F(1, 2 ** n));
    },
    () => {
      let a = 0, b = 0;
      do {
        b = ri(3, 20);
        a = ri(1, b - 1);
      } while (mdc(a, b) !== 1);
      return q(`P(A) = \\f{${a}}{${b}}. P(não A) =`, F(b - a, b));
    },
  ],
  [
    () => {
      const s = ri(2, 12);
      return q(`Dois dados: P(soma ${s}) =`, F(6 - Math.abs(s - 7), 36));
    },
    () => {
      const a = ri(2, 8), v = ri(1, 8), n = a + v;
      return q(`Urna: ${bolas(a, 'azul')} e ${bolas(v, 'vermelha')}. Tiram-se 2 sem reposição. P(2 azuis) =`, F(a * (a - 1), n * (n - 1)));
    },
    () => {
      const a = ri(1, 8), v = ri(1, 8), n = a + v;
      return q(`Urna: ${bolas(a, 'azul')} e ${bolas(v, 'vermelha')}. Tiram-se 2 com reposição. P(2 azuis) =`, F(a * a, n * n));
    },
    () => {
      const n = ri(3, 4), k = ri(1, n - 1);
      return q(`${n} moedas: P(exatamente ${k} ${k === 1 ? 'cara' : 'caras'}) =`, F(comb(n, k), 2 ** n));
    },
  ],
  [
    () => {
      const n = ri(4, 8), k = ri(1, n - 1);
      return q(`${n} lançamentos de moeda: P(exatamente ${k} caras) =`, F(comb(n, k), 2 ** n));
    },
    () => {
      const n = ri(2, 4), k = ri(1, n);
      return q(`Dado lançado ${n} vezes: P(exatamente ${k} seis) =`, F(comb(n, k) * 5 ** (n - k), 6 ** n));
    },
    () => {
      const n = ri(12, 40), m = pick([3, 4, 5, 6]);
      const pares = Math.floor(n / 2), ambos = Math.floor(n / mmc(2, m));
      return q(`Sorteia-se um número de 1 a ${n}. Sabendo que é par, P(múltiplo de ${m}) =`, F(ambos, pares));
    },
    () => {
      for (;;) {
        const d = pick([10, 12, 20, 15, 30]), c = ri(1, 5), a = ri(c + 1, d - 2), b = ri(c + 1, d - 2);
        if (a + b - c > d) continue;
        return q(`P(A) = ${F(a, d)}, P(B) = ${F(b, d)}, P(A ∩ B) = ${F(c, d)}. P(A ∪ B) =`, F(a + b - c, d));
      }
    },
    () => {
      let k = 0, m = 0;
      do {
        k = ri(2, 6);
        m = ri(2, 7);
      } while (k === m);
      const n = ri(20, 60), cont = Math.floor(n / k) + Math.floor(n / m) - Math.floor(n / mmc(k, m));
      return q(`Um número de 1 a ${n}: P(múltiplo de ${k} ou de ${m}) =`, F(cont, n));
    },
  ],
];
