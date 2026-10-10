// Monta o PDF da folha de exercícios (A4), no espírito das folhas do método Kumon: cabeçalho com
// nome, data, tempo e acertos; exercícios numerados só na metade esquerda; a metade direita fica
// livre para as contas; o gabarito (só a resposta final) vem nas últimas páginas.
import type * as PdfLib from 'pdf-lib';
import type { PDFFont, PDFPage } from 'pdf-lib';

// Usa o pacote já montado do pdf-lib: a versão modular depende de um "tslib" antigo que o
// empacotador do app não consegue ler.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib/dist/pdf-lib.min.js') as typeof PdfLib;

import { NOMES_NIVEL, type Exercicio } from './assuntos';
import { lerMarcacao, type No } from './marcacao';

type Bloco = { w: number; a: number; d: number; draw: (p: PDFPage, x: number, y: number) => void };
type Cor = ReturnType<typeof rgb>;

const LARG = 595.28;
const ALT = 841.89;
const MARGEM = 36;
const MEIO = LARG / 2;
const RODAPE = 34;
const TAM = 12;

const PRETO = rgb(0.1, 0.12, 0.16);
const CINZA = rgb(0.42, 0.45, 0.5);
const LINHA = rgb(0.82, 0.85, 0.89);
const GUIA = rgb(0.6, 0.64, 0.69);
const AZUL = rgb(0.11, 0.37, 0.75);

class Tipografia {
  private cache = new Map<string, PDFFont>();
  constructor(
    public normal: PDFFont,
    public negrito: PDFFont,
    private simbolo: PDFFont,
  ) {}

  /** Helvetica para o texto comum; Symbol para −, π, ≤, ≥, ±... */
  private fonte(ch: string, negrito: boolean): PDFFont | null {
    const base = negrito ? this.negrito : this.normal;
    const chave = (negrito ? 'b' : 'n') + ch;
    if (this.cache.has(chave)) return this.cache.get(chave)!;
    let f: PDFFont | null = null;
    for (const cand of [base, this.simbolo]) {
      try {
        cand.encodeText(ch);
        f = cand;
        break;
      } catch {
        // tenta a próxima fonte
      }
    }
    if (f) this.cache.set(chave, f);
    return f;
  }

  trechos(s: string, negrito = false): [PDFFont, string][] {
    const out: [PDFFont, string][] = [];
    for (const ch0 of s) {
      // o sinal de menos sai como traço médio da Helvetica, que aparece igual em qualquer leitor
      let ch = ch0 === '−' ? '–' : ch0;
      let f = this.fonte(ch, negrito);
      if (!f) {
        ch = '?';
        f = negrito ? this.negrito : this.normal;
      }
      const ult = out[out.length - 1];
      if (ult && ult[0] === f) ult[1] += ch;
      else out.push([f, ch]);
    }
    return out;
  }

  largura(s: string, tam: number, negrito = false) {
    return this.trechos(s, negrito).reduce((w, [f, t]) => w + f.widthOfTextAtSize(t, tam), 0);
  }

  texto(s: string, tam: number, cor: Cor, negrito = false): Bloco {
    const partes = this.trechos(s, negrito);
    const w = partes.reduce((acc, [f, t]) => acc + f.widthOfTextAtSize(t, tam), 0);
    return {
      w,
      a: tam * 0.72,
      d: tam * 0.21,
      draw: (p, x, y) => {
        let cx = x;
        for (const [f, t] of partes) {
          p.drawText(t, { x: cx, y, size: tam, font: f, color: cor });
          cx += f.widthOfTextAtSize(t, tam);
        }
      },
    };
  }

  /** Desenho de uma sequência de nós lado a lado (sem quebra de linha). */
  seq(nos: No[], tam: number, cor: Cor): Bloco {
    const bs = nos.filter((n) => n.t !== 'br').map((n) => this.no(n, tam, cor));
    return {
      w: bs.reduce((a, b) => a + b.w, 0),
      a: Math.max(tam * 0.72, ...bs.map((b) => b.a)),
      d: Math.max(tam * 0.21, ...bs.map((b) => b.d)),
      draw: (p, x, y) => {
        let cx = x;
        for (const b of bs) {
          b.draw(p, cx, y);
          cx += b.w;
        }
      },
    };
  }

  no(n: No, tam: number, cor: Cor): Bloco {
    switch (n.t) {
      case 'txt':
        return this.texto(n.s, tam, cor);
      case 'sup':
      case 'sub': {
        const c = this.seq(n.c, Math.max(tam * 0.7, 6), cor);
        const desl = n.t === 'sup' ? tam * 0.4 : -tam * 0.22;
        return {
          w: c.w + 0.6,
          a: Math.max(c.a + desl, 0),
          d: Math.max(c.d - desl, 0),
          draw: (p, x, y) => c.draw(p, x + 0.3, y + desl),
        };
      }
      case 'frac': {
        const t2 = Math.max(tam * 0.85, 6.5);
        const num = this.seq(n.n, t2, cor);
        const den = this.seq(n.d, t2, cor);
        const w = Math.max(num.w, den.w) + 4;
        const eixo = tam * 0.3;
        const gap = 1.8;
        return {
          w: w + 1.5,
          a: eixo + gap + num.d + num.a,
          d: Math.max(0, den.a + den.d + gap - eixo),
          draw: (p, x, y) => {
            p.drawLine({ start: { x: x + 1, y: y + eixo }, end: { x: x + w, y: y + eixo }, thickness: 0.7, color: cor });
            num.draw(p, x + 0.5 + (w - num.w) / 2, y + eixo + gap + num.d);
            den.draw(p, x + 0.5 + (w - den.w) / 2, y + eixo - gap - den.a);
          },
        };
      }
      case 'raiz': {
        const c = this.seq(n.c, tam, cor);
        const ind = n.i ? this.seq(n.i, Math.max(tam * 0.55, 5.5), cor) : null;
        const topo = c.a + 2.2;
        const base = c.d + 1;
        const h = topo + base;
        const rw = tam * 0.55;
        const off = ind ? Math.max(ind.w - rw * 0.3, 0) : 0;
        const alturaInd = ind ? h * 0.55 - base + ind.d + ind.a : 0;
        return {
          w: off + rw + c.w + 2.5,
          a: Math.max(topo + 0.8, alturaInd),
          d: base,
          draw: (p, x, y) => {
            const x0 = x + off;
            const yb = y - base;
            const pts = [
              [x0, yb + h * 0.42],
              [x0 + rw * 0.25, yb + h * 0.52],
              [x0 + rw * 0.55, yb],
              [x0 + rw, yb + h],
              [x0 + rw + c.w + 1.5, yb + h],
            ];
            const esp = [0.8, 1.2, 0.7, 0.7];
            for (let k = 0; k < 4; k++)
              p.drawLine({ start: { x: pts[k][0], y: pts[k][1] }, end: { x: pts[k + 1][0], y: pts[k + 1][1] }, thickness: esp[k], color: cor });
            c.draw(p, x0 + rw + 0.8, y);
            if (ind) ind.draw(p, x, yb + h * 0.55 + ind.d);
          },
        };
      }
      case 'mat': {
        const cel = n.l.map((linha) => linha.map((c) => this.seq(c, tam, cor)));
        const nCol = Math.max(...cel.map((l) => l.length));
        const colW = [...Array(nCol)].map((_, j) => Math.max(...cel.map((l) => (l[j] ? l[j].w : 0))));
        const linA = cel.map((l) => Math.max(...l.map((b) => b.a)));
        const linD = cel.map((l) => Math.max(...l.map((b) => b.d)));
        const gx = tam * 0.9;
        const gy = tam * 0.3;
        const altura = linA.reduce((a, v, i) => a + v + linD[i], 0) + gy * (cel.length - 1);
        const eixo = tam * 0.3;
        const lb = 6;
        const w = 2 * lb + colW.reduce((a, b) => a + b, 0) + gx * (nCol - 1) + 4;
        return {
          w,
          a: eixo + altura / 2 + 2,
          d: Math.max(0, altura / 2 - eixo + 2),
          draw: (p, x, y) => {
            const yTop = y + eixo + altura / 2 + 1.5;
            const yBot = y + eixo - altura / 2 - 1.5;
            for (const [xv, xt] of [
              [x + 1, x + 4],
              [x + w - 1, x + w - 4],
            ]) {
              p.drawLine({ start: { x: xv, y: yTop }, end: { x: xv, y: yBot }, thickness: 0.8, color: cor });
              p.drawLine({ start: { x: xv, y: yTop }, end: { x: xt, y: yTop }, thickness: 0.8, color: cor });
              p.drawLine({ start: { x: xv, y: yBot }, end: { x: xt, y: yBot }, thickness: 0.8, color: cor });
            }
            let cy = y + eixo + altura / 2;
            cel.forEach((linha, i) => {
              const base = cy - linA[i];
              let cx = x + lb + 2;
              linha.forEach((b, j) => {
                b.draw(p, cx + (colW[j] - b.w) / 2, base);
                cx += colW[j] + gx;
              });
              cy = base - linD[i] - gy;
            });
          },
        };
      }
      default:
        return { w: 0, a: 0, d: 0, draw: () => {} };
    }
  }

  /** Quebra a expressão em linhas que caibam em `maxW` (quebra só nos espaços). */
  linhas(marcacao: string, tam: number, maxW: number, cor: Cor = PRETO): Bloco[] {
    const palavras: (No[] | 'br')[] = [];
    let atual: No[] = [];
    const fecha = () => {
      if (atual.length) palavras.push(atual);
      atual = [];
    };
    for (const n of lerMarcacao(marcacao)) {
      if (n.t === 'br') {
        fecha();
        palavras.push('br');
      } else if (n.t === 'txt') {
        for (const parte of n.s.split(/(\s+)/)) {
          if (!parte) continue;
          if (/^\s+$/.test(parte)) fecha();
          else atual.push({ t: 'txt', s: parte });
        }
      } else atual.push(n);
    }
    fecha();

    const espaco = this.largura(' ', tam);
    const saida: Bloco[] = [];
    let linha: Bloco[] = [];
    let w = 0;
    const fechaLinha = () => {
      const bs = linha;
      saida.push({
        w,
        a: Math.max(tam * 0.72, ...bs.map((b) => b.a)),
        d: Math.max(tam * 0.21, ...bs.map((b) => b.d)),
        draw: (p, x, y) => {
          let cx = x;
          for (const b of bs) {
            b.draw(p, cx, y);
            cx += b.w + espaco;
          }
        },
      });
      linha = [];
      w = 0;
    };
    for (const pal of palavras) {
      if (pal === 'br') {
        fechaLinha();
        continue;
      }
      const b = this.seq(pal, tam, cor);
      if (linha.length && w + espaco + b.w > maxW) fechaLinha();
      w += (linha.length ? espaco : 0) + b.w;
      linha.push(b);
    }
    if (linha.length || !saida.length) fechaLinha();
    return saida;
  }
}

const alturaLinhas = (ls: Bloco[], entre: number) => ls.reduce((a, l) => a + l.a + l.d, 0) + entre * Math.max(0, ls.length - 1);

/** Desenha as linhas de cima para baixo a partir de `topo`; devolve a posição de baixo. */
function desenharLinhas(p: PDFPage, ls: Bloco[], x: number, topo: number, entre: number) {
  let y = topo;
  for (const l of ls) {
    const base = y - l.a;
    l.draw(p, x, base);
    y = base - l.d - entre;
  }
  return y + entre;
}

export async function montarPdf(assunto: string, niveis: number[], itens: Exercicio[]): Promise<PdfLib.PDFDocument> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Exercícios de Matemática - ${assunto}`);
  doc.setAuthor('Estudos');
  doc.setCreator('Estudos');
  const tp = new Tipografia(
    await doc.embedFont(StandardFonts.Helvetica),
    await doc.embedFont(StandardFonts.HelveticaBold),
    await doc.embedFont(StandardFonts.Symbol),
  );
  const total = itens.length;
  const nomesNiveis = [...new Set(niveis)].sort().map((n) => NOMES_NIVEL[n - 1]).join(', ');
  const varios = new Set(itens.map((i) => i.nivel)).size > 1;

  const escrever = (p: PDFPage, s: string, x: number, y: number, tam: number, cor: Cor = PRETO, negrito = false) => tp.texto(s, tam, cor, negrito).draw(p, x, y);

  // ---------- Folhas de exercícios ----------
  const colEsq = MEIO - MARGEM - 14;
  const numW = 24;
  const slotMin = [0, 64, 78, 92];
  let pagina!: PDFPage;
  let y = 0;

  const guias = (p: PDFPage, topo: number) => {
    p.drawLine({ start: { x: MEIO, y: topo }, end: { x: MEIO, y: RODAPE + 6 }, thickness: 0.6, color: GUIA, dashArray: [3, 3] });
    escrever(p, 'Cálculos', MEIO + 10, topo - 11, 8.5, GUIA);
  };

  const novaPagina = (primeira: boolean) => {
    pagina = doc.addPage([LARG, ALT]);
    let t = ALT - MARGEM;
    if (primeira) {
      escrever(pagina, 'Exercícios de Matemática', MARGEM, t - 16, 17, PRETO, true);
      t -= 34;
      for (const l of tp.linhas(assunto, 12.5, LARG - 2 * MARGEM, AZUL)) {
        l.draw(pagina, MARGEM, t - l.a);
        t -= l.a + l.d + 2;
      }
      escrever(pagina, `${total} exercícios · Nível: ${nomesNiveis} · Gabarito no final`, MARGEM, t - 11, 9.5, CINZA);
      t -= 28;
      escrever(pagina, 'Nome: ________________________________________     Data: ____/____/______', MARGEM, t - 10, 10);
      t -= 20;
      escrever(pagina, `Início: ____:____     Término: ____:____     Tempo: ________     Acertos: ______ / ${total}`, MARGEM, t - 10, 10);
      t -= 20;
      escrever(pagina, 'Resolva na ordem e sem consultar. Faça as contas na metade direita. No fim, corrija pelo gabarito.', MARGEM, t - 9, 8.5, CINZA);
      t -= 18;
    } else {
      escrever(pagina, assunto, MARGEM, t - 9, 9, CINZA);
      t -= 18;
    }
    pagina.drawLine({ start: { x: MARGEM, y: t }, end: { x: LARG - MARGEM, y: t }, thickness: 1, color: GUIA });
    guias(pagina, t);
    y = t - 14;
  };

  novaPagina(true);
  // Os exercícios de cada página são guardados numa fila e só desenhados quando a página enche:
  // assim a sobra de espaço é dividida igualmente entre eles.
  type Pendente = { i: number; it: Exercicio; ls: Bloco[]; slot: number; titulo: number };
  let fila: Pendente[] = [];
  let disponivel = y - (RODAPE + 8);
  let usado = 0;
  const despejar = (ultima: boolean) => {
    const sobra = Math.max(0, disponivel - usado);
    const extra = fila.length ? (ultima ? Math.min(sobra / fila.length, 24) : sobra / fila.length) : 0;
    for (const { i, it, ls, slot, titulo } of fila) {
      if (titulo) {
        escrever(pagina, NOMES_NIVEL[it.nivel - 1].toUpperCase(), MARGEM, y - 10, 9, AZUL, true);
        y -= titulo;
      }
      const topo = y - 4;
      escrever(pagina, `${i + 1})`, MARGEM, topo - (ls[0]?.a ?? TAM * 0.72), TAM, PRETO, true);
      desenharLinhas(pagina, ls, MARGEM + numW, topo, 5);
      y -= slot + extra;
      if (y > RODAPE + 10) pagina.drawLine({ start: { x: MARGEM, y: y + 6 }, end: { x: LARG - MARGEM, y: y + 6 }, thickness: 0.5, color: LINHA });
    }
    fila = [];
  };
  let nivelAtual = 0;
  itens.forEach((it, i) => {
    const ls = tp.linhas(it.e, TAM, colEsq - numW);
    const slot = Math.max(slotMin[it.nivel], alturaLinhas(ls, 5) + 26);
    const titulo = varios && it.nivel !== nivelAtual ? 20 : 0;
    nivelAtual = it.nivel;
    if (fila.length && usado + slot + titulo > disponivel) {
      despejar(false);
      novaPagina(false);
      disponivel = y - (RODAPE + 8);
      usado = 0;
    }
    fila.push({ i, it, ls, slot, titulo });
    usado += slot + titulo;
  });
  despejar(true);

  // ---------- Gabarito ----------
  const larguraCol = (LARG - 2 * MARGEM - 24) / 2;
  let col = 0;
  let topoGab = 0;
  const paginaGabarito = () => {
    pagina = doc.addPage([LARG, ALT]);
    let t = ALT - MARGEM;
    escrever(pagina, 'Gabarito', MARGEM, t - 16, 17, PRETO, true);
    t -= 32;
    escrever(pagina, assunto, MARGEM, t - 10, 11, AZUL, true);
    t -= 20;
    escrever(pagina, 'Só confira depois de terminar. Marque os acertos e anote o total e o tempo no topo da folha.', MARGEM, t - 9, 8.5, CINZA);
    t -= 16;
    pagina.drawLine({ start: { x: MARGEM, y: t }, end: { x: LARG - MARGEM, y: t }, thickness: 1, color: GUIA });
    topoGab = t - 10;
    y = topoGab;
    col = 0;
  };
  paginaGabarito();
  itens.forEach((it, i) => {
    const tam = 10.5;
    const ls = tp.linhas(it.r, tam, larguraCol - 30);
    const h = alturaLinhas(ls, 3) + 9;
    if (y - h < RODAPE + 8) {
      if (col === 0) {
        col = 1;
        y = topoGab;
      } else paginaGabarito();
    }
    const x = MARGEM + col * (larguraCol + 24);
    escrever(pagina, `${i + 1})`, x, y - (ls[0]?.a ?? tam * 0.72), tam, CINZA, true);
    desenharLinhas(pagina, ls, x + 28, y, 3);
    y -= h;
  });

  // ---------- Rodapé com número das páginas ----------
  const paginas = doc.getPages();
  paginas.forEach((p, i) => {
    const s = `Estudos · Treino de Matemática · página ${i + 1} de ${paginas.length}`;
    escrever(p, s, (LARG - tp.largura(s, 8)) / 2, 18, 8, CINZA);
  });
  return doc;
}
