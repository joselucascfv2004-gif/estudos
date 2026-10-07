// Qual é maior? Duas expressões lado a lado; o aluno toca na maior (ou em "iguais").
import { Rng, escolher, inteiro, numeroBR } from './aleatorio';
import { elevado } from './calculo';

export type Expressao = { texto: string; valor: number };
export type Par = { esq: Expressao; dir: Expressao };
/** 0 = esquerda maior, 1 = direita maior, 2 = iguais */
export type Escolha = 0 | 1 | 2;

const EPS = 1e-9;

/** Uma expressão aleatória; `etapa` (0 a 3) aumenta a variedade e a dificuldade. */
function expressao(r: Rng, etapa: number): Expressao {
  const tipos = ['produto', 'potencia', 'porcentagem', 'fracao', 'decimal', 'raiz', 'negativo'].slice(0, 3 + etapa * 2);
  const tipo = escolher(r, tipos);
  switch (tipo) {
    case 'produto': {
      const a = inteiro(r, 2, 9 + etapa * 4);
      const b = inteiro(r, 2, 9 + etapa * 2);
      return { texto: `${a} × ${b}`, valor: a * b };
    }
    case 'potencia': {
      const b = inteiro(r, 2, 6 + etapa);
      const e = inteiro(r, 2, b <= 3 ? 6 : 3);
      return { texto: elevado(b, e), valor: b ** e };
    }
    case 'porcentagem': {
      const p = inteiro(r, 1, 19) * 5;
      const base = inteiro(r, 2, 20) * 10;
      return { texto: `${p}% de ${base}`, valor: (p * base) / 100 };
    }
    case 'fracao': {
      const d = inteiro(r, 2, 12);
      const a = inteiro(r, 1, d * 2);
      return { texto: `${a}/${d}`, valor: a / d };
    }
    case 'decimal': {
      const v = inteiro(r, 1, 199) / (r() < 0.5 ? 10 : 100);
      return { texto: numeroBR(v), valor: v };
    }
    case 'raiz': {
      const k = inteiro(r, 2, 30);
      return { texto: `√${k}`, valor: Math.sqrt(k) };
    }
    default: {
      const a = inteiro(r, 1, 20);
      const b = inteiro(r, 1, 20);
      return r() < 0.5 ? { texto: `−${a} × ${Math.min(b, 9)}`, valor: -a * Math.min(b, 9) } : { texto: `${a} − ${a + b}`, valor: -b };
    }
  }
}

/** Pares que valem o mesmo (para treinar o botão "iguais"). */
function parIgual(r: Rng): Par {
  const k = inteiro(r, 2, 9);
  const opcoes: Par[] = [
    { esq: { texto: elevado(2, 4), valor: 16 }, dir: { texto: elevado(4, 2), valor: 16 } },
    { esq: { texto: `50% de ${k * 20}`, valor: k * 10 }, dir: { texto: `${k * 10}`, valor: k * 10 } },
    { esq: { texto: `${k}/4`, valor: k / 4 }, dir: { texto: numeroBR(k / 4), valor: k / 4 } },
    { esq: { texto: `√${k * k}`, valor: k }, dir: { texto: `${k}`, valor: k } },
    { esq: { texto: `${k} × ${k + 2}`, valor: k * (k + 2) }, dir: { texto: `${k + 2} × ${k}`, valor: k * (k + 2) } },
    { esq: { texto: `25% de ${k * 8}`, valor: k * 2 }, dir: { texto: `${k * 8} ÷ 4`, valor: k * 2 } },
    { esq: { texto: elevado(k, 2), valor: k * k }, dir: { texto: `${k} × ${k}`, valor: k * k } },
  ];
  const par = escolher(r, opcoes);
  return r() < 0.5 ? par : { esq: par.dir, dir: par.esq };
}

/** Gera um par; quanto maior a etapa, mais próximos ficam os valores. */
export function gerarPar(r: Rng, etapa: number): Par {
  if (r() < 0.12) return parIgual(r);
  const limite = [1, 0.6, 0.35, 0.2][Math.min(etapa, 3)];
  for (let i = 0; i < 60; i++) {
    const esq = expressao(r, etapa);
    const dir = expressao(r, etapa);
    if (Math.abs(esq.valor - dir.valor) < EPS || esq.texto === dir.texto) continue;
    const escala = Math.max(Math.abs(esq.valor), Math.abs(dir.valor), 1);
    if (Math.abs(esq.valor - dir.valor) / escala <= limite) return { esq, dir };
  }
  return { esq: { texto: '7 × 8', valor: 56 }, dir: { texto: elevado(3, 4), valor: 81 } };
}

export function respostaCerta(par: Par): Escolha {
  if (Math.abs(par.esq.valor - par.dir.valor) < EPS) return 2;
  return par.esq.valor > par.dir.valor ? 0 : 1;
}

/** Valor mostrado na explicação depois da resposta. */
export function valorTexto(v: number) {
  const arred = Math.round(v * 100) / 100;
  return Math.abs(arred - v) < EPS ? numeroBR(arred) : `≈ ${numeroBR(arred)}`;
}
