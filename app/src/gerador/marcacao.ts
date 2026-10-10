// Lê a marcação das expressões (\f{}{}, ^{}, _{}, \r{}, \r[3]{}, \m{a,b;c,d}, quebra de linha)
// e devolve uma árvore simples, desenhada pela tela (Expr.tsx) e pelo PDF (pdf.ts).

export type No =
  | { t: 'txt'; s: string }
  | { t: 'frac'; n: No[]; d: No[] }
  | { t: 'sup'; c: No[] }
  | { t: 'sub'; c: No[] }
  | { t: 'raiz'; i?: No[]; c: No[] }
  | { t: 'mat'; l: No[][][] }
  | { t: 'br' };

/** Lê um grupo {…} a partir de s[i] === '{'; devolve o conteúdo e a posição depois do '}'. */
function grupo(s: string, i: number, abre = '{', fecha = '}'): [string, number] {
  if (s[i] !== abre) return ['', i];
  let nivel = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === abre) nivel++;
    else if (s[j] === fecha && --nivel === 0) return [s.slice(i + 1, j), j + 1];
  }
  return [s.slice(i + 1), s.length];
}

/** Divide no separador só no nível de fora das chaves. */
function dividir(s: string, sep: string) {
  const partes: string[] = [];
  let nivel = 0;
  let ini = 0;
  for (let j = 0; j < s.length; j++) {
    if (s[j] === '{') nivel++;
    else if (s[j] === '}') nivel--;
    else if (s[j] === sep && nivel === 0) {
      partes.push(s.slice(ini, j));
      ini = j + 1;
    }
  }
  partes.push(s.slice(ini));
  return partes;
}

export function lerMarcacao(s: string): No[] {
  const nos: No[] = [];
  let txt = '';
  const fechaTexto = () => {
    if (txt) nos.push({ t: 'txt', s: txt });
    txt = '';
  };
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === '\\' && s[i + 1] === 'f' && s[i + 2] === '{') {
      fechaTexto();
      const [n, a] = grupo(s, i + 2);
      const [d, b] = grupo(s, a);
      nos.push({ t: 'frac', n: lerMarcacao(n), d: lerMarcacao(d) });
      i = b;
    } else if (ch === '\\' && s[i + 1] === 'r' && (s[i + 2] === '{' || s[i + 2] === '[')) {
      fechaTexto();
      let k = i + 2;
      let indice: string | undefined;
      if (s[k] === '[') [indice, k] = grupo(s, k, '[', ']');
      const [c, b] = grupo(s, k);
      nos.push({ t: 'raiz', i: indice ? lerMarcacao(indice) : undefined, c: lerMarcacao(c) });
      i = b;
    } else if (ch === '\\' && s[i + 1] === 'm' && s[i + 2] === '{') {
      fechaTexto();
      const [c, b] = grupo(s, i + 2);
      nos.push({ t: 'mat', l: dividir(c, ';').map((linha) => dividir(linha, ',').map(lerMarcacao)) });
      i = b;
    } else if ((ch === '^' || ch === '_') && s[i + 1] === '{') {
      fechaTexto();
      const [c, b] = grupo(s, i + 1);
      nos.push({ t: ch === '^' ? 'sup' : 'sub', c: lerMarcacao(c) });
      i = b;
    } else if (ch === '\n') {
      fechaTexto();
      nos.push({ t: 'br' });
      i++;
    } else {
      txt += ch;
      i++;
    }
  }
  fechaTexto();
  return nos;
}

/** Texto simples (sem desenho) para leitores de tela e buscas: "3/4 + x²". */
export function textoPlano(nos: No[]): string {
  return nos
    .map((n) => {
      switch (n.t) {
        case 'txt':
          return n.s;
        case 'frac':
          return `(${textoPlano(n.n)})/(${textoPlano(n.d)})`;
        case 'sup':
          return `^${textoPlano(n.c)}`;
        case 'sub':
          return textoPlano(n.c);
        case 'raiz':
          return `${n.i ? textoPlano(n.i) : ''}√(${textoPlano(n.c)})`;
        case 'mat':
          return `[${n.l.map((l) => l.map(textoPlano).join(' ')).join('; ')}]`;
        default:
          return ' ';
      }
    })
    .join('');
}
