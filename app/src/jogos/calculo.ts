// Cálculo Relâmpago: contas de cabeça com resposta inteira.
import { Rng, escolher, inteiro, numeroBR } from './aleatorio';

export type Operacao = 'misto' | 'soma' | 'subtracao' | 'multiplicacao' | 'divisao' | 'potencia' | 'porcentagem' | 'expressao';
export type NivelJogo = 0 | 1 | 2;
export type Conta = { texto: string; resposta: number };

export const OPERACOES: { id: Operacao; nome: string; simbolo: string }[] = [
  { id: 'misto', nome: 'Misturado', simbolo: '±×÷' },
  { id: 'soma', nome: 'Adição', simbolo: '+' },
  { id: 'subtracao', nome: 'Subtração', simbolo: '−' },
  { id: 'multiplicacao', nome: 'Multiplicação', simbolo: '×' },
  { id: 'divisao', nome: 'Divisão', simbolo: '÷' },
  { id: 'potencia', nome: 'Potências e raízes', simbolo: 'x²' },
  { id: 'porcentagem', nome: 'Porcentagem', simbolo: '%' },
  { id: 'expressao', nome: 'Expressões', simbolo: '( )' },
];

export const NIVEIS_JOGO = ['Fácil', 'Médio', 'Difícil'] as const;

const SOBRESCRITO: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
export const elevado = (base: number | string, exp: number) => `${base}${String(exp).split('').map((d) => SOBRESCRITO[d]).join('')}`;

const n = numeroBR;

function soma(r: Rng, nv: NivelJogo): Conta {
  const [a, b] = nv === 0 ? [inteiro(r, 2, 20), inteiro(r, 2, 20)] : nv === 1 ? [inteiro(r, 12, 99), inteiro(r, 12, 99)] : [inteiro(r, 101, 999), inteiro(r, 15, 999)];
  return { texto: `${a} + ${b}`, resposta: a + b };
}

function subtracao(r: Rng, nv: NivelJogo): Conta {
  if (nv === 2) {
    const a = inteiro(r, 50, 999);
    const b = inteiro(r, 15, 999);
    return { texto: `${a} − ${b}`, resposta: a - b };
  }
  const b = nv === 0 ? inteiro(r, 1, 20) : inteiro(r, 11, 89);
  const res = nv === 0 ? inteiro(r, 0, 20) : inteiro(r, 5, 99);
  return { texto: `${b + res} − ${b}`, resposta: res };
}

function multiplicacao(r: Rng, nv: NivelJogo): Conta {
  const [a, b] =
    nv === 0 ? [inteiro(r, 2, 10), inteiro(r, 2, 10)] : nv === 1 ? [inteiro(r, 11, 19), inteiro(r, 3, 9)] : r() < 0.5 ? [inteiro(r, 12, 25), inteiro(r, 12, 25)] : [inteiro(r, 101, 999), inteiro(r, 3, 9)];
  return { texto: `${a} × ${b}`, resposta: a * b };
}

function divisao(r: Rng, nv: NivelJogo): Conta {
  const [d, q] = nv === 0 ? [inteiro(r, 2, 10), inteiro(r, 2, 10)] : nv === 1 ? [inteiro(r, 3, 12), inteiro(r, 11, 25)] : [inteiro(r, 11, 25), inteiro(r, 12, 40)];
  return { texto: `${d * q} ÷ ${d}`, resposta: q };
}

function potencia(r: Rng, nv: NivelJogo): Conta {
  const tipo = inteiro(r, 0, 2);
  if (tipo === 0) {
    const b = nv === 0 ? inteiro(r, 1, 12) : nv === 1 ? inteiro(r, 11, 20) : inteiro(r, 15, 30);
    return { texto: elevado(b, 2), resposta: b * b };
  }
  if (tipo === 1) {
    const [b, e] = nv === 0 ? escolher(r, [[2, 3], [2, 4], [2, 5], [3, 3], [4, 3], [5, 3], [10, 3]]) : nv === 1 ? escolher(r, [[2, 6], [2, 7], [2, 8], [3, 4], [6, 3], [7, 3], [10, 4]]) : escolher(r, [[2, 9], [2, 10], [3, 5], [4, 4], [8, 3], [9, 3], [5, 4], [2, 11]]);
    return { texto: elevado(b, e), resposta: b ** e };
  }
  if (nv === 2 && r() < 0.4) {
    const k = inteiro(r, 2, 10);
    return { texto: `∛${k ** 3}`, resposta: k };
  }
  const k = nv === 0 ? inteiro(r, 2, 12) : nv === 1 ? inteiro(r, 11, 20) : inteiro(r, 15, 30);
  return { texto: `√${k * k}`, resposta: k };
}

function porcentagem(r: Rng, nv: NivelJogo): Conta {
  for (;;) {
    const p = nv === 0 ? escolher(r, [10, 50, 25, 20, 100]) : nv === 1 ? inteiro(r, 1, 18) * 5 : inteiro(r, 2, 95);
    const base = nv === 0 ? inteiro(r, 1, 20) * 20 : nv === 1 ? inteiro(r, 1, 30) * 20 : inteiro(r, 2, 60) * 10;
    if ((p * base) % 100 !== 0) continue;
    return { texto: `${p}% de ${base}`, resposta: (p * base) / 100 };
  }
}

function expressao(r: Rng, nv: NivelJogo): Conta {
  if (nv === 0) {
    const [a, b, c] = [inteiro(r, 1, 20), inteiro(r, 2, 9), inteiro(r, 2, 9)];
    return r() < 0.5 ? { texto: `${a} + ${b} × ${c}`, resposta: a + b * c } : { texto: `${b} × ${c} − ${Math.min(a, b * c)}`, resposta: b * c - Math.min(a, b * c) };
  }
  if (nv === 1) {
    const [a, b, c, d] = [inteiro(r, 2, 15), inteiro(r, 2, 15), inteiro(r, 2, 9), inteiro(r, 1, 30)];
    return r() < 0.5 ? { texto: `(${a} + ${b}) × ${c} − ${d}`, resposta: (a + b) * c - d } : { texto: `${a * c} ÷ ${c} + ${b} × ${c}`, resposta: a + b * c };
  }
  const [a, b, c, d] = [inteiro(r, 3, 15), inteiro(r, 3, 15), inteiro(r, 3, 15), inteiro(r, 3, 15)];
  return r() < 0.5 ? { texto: `${a} × ${b} − ${c} × ${d}`, resposta: a * b - c * d } : { texto: `${elevado(a, 2)} − ${b} × ${c}`, resposta: a * a - b * c };
}

const GERADORES: Record<Exclude<Operacao, 'misto'>, (r: Rng, nv: NivelJogo) => Conta> = { soma, subtracao, multiplicacao, divisao, potencia, porcentagem, expressao };

export function gerarConta(r: Rng, op: Operacao, nv: NivelJogo, anterior?: Conta): Conta {
  for (let i = 0; i < 20; i++) {
    const tipo = op !== 'misto' ? op : nv === 0 ? escolher(r, ['soma', 'subtracao', 'multiplicacao', 'divisao'] as const) : escolher(r, ['soma', 'subtracao', 'multiplicacao', 'divisao', 'potencia', 'porcentagem'] as const);
    const c = GERADORES[tipo](r, nv);
    if (c.texto !== anterior?.texto) return c;
  }
  return GERADORES.soma(r, nv);
}

/** Texto da resposta, como o aluno digita (sinal de menos tipográfico). */
export const textoResposta = (c: Conta) => n(c.resposta);

/** Pontos de um acerto: base pelo nível + bônus por rapidez (até 10) e multiplicador da sequência. */
export function pontosAcerto(nv: NivelJogo, segundos: number, sequencia: number) {
  const base = [10, 15, 20][nv];
  const rapidez = Math.max(0, Math.round(10 - segundos * 2));
  return Math.round((base + rapidez) * multiplicador(sequencia));
}

/** A cada 5 acertos seguidos o multiplicador sobe 0,5 (até ×3). */
export const multiplicador = (sequencia: number) => Math.min(3, 1 + Math.floor(sequencia / 5) * 0.5);
