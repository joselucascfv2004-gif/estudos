// Utilitários compartilhados pelos geradores de questões calculáveis.
// Cada questão gerada tem a resposta CALCULADA pelo próprio script,
// então o gabarito é sempre consistente com o enunciado.

export function criarRng(semente) {
  let s = semente >>> 0 || 1;
  const rng = () => {
    // mulberry32
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  rng.int = (a, b) => a + Math.floor(rng() * (b - a + 1));
  rng.pick = (arr) => arr[Math.floor(rng() * arr.length)];
  rng.shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  rng.sample = (arr, k) => rng.shuffle(arr).slice(0, k);
  return rng;
}

export function hashTexto(t) {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Formata número no padrão brasileiro. casas = null -> até 2 casas sem zeros à direita. */
export function num(v, casas = null) {
  if (!Number.isFinite(v)) return String(v);
  let s;
  if (casas == null) {
    const r = Math.round(v * 100) / 100;
    s = Number.isInteger(r) ? r.toFixed(0) : r.toFixed(2).replace(/0+$/, '');
  } else s = v.toFixed(casas);
  let [int, dec] = s.split('.');
  const neg = int.startsWith('-');
  if (neg) int = int.slice(1);
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '−' : '') + int + (dec ? ',' + dec : '');
}

export const reais = (v) => 'R$ ' + num(v, 2);
export const pct = (v, casas = null) => num(v, casas) + '%';
export const arred = (v, casas = 2) => Math.round(v * 10 ** casas) / 10 ** casas;

export function mdc(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
export const mmc = (a, b) => (a / mdc(a, b)) * b;

export function fracao(n, d) {
  if (d < 0) { n = -n; d = -d; }
  const g = mdc(n, d) || 1;
  n /= g; d /= g;
  if (d === 1) return num(n);
  return `${n < 0 ? '−' : ''}${Math.abs(n)}/${d}`;
}

export function fatorial(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
export const comb = (n, k) => (k < 0 || k > n ? 0 : fatorial(n) / (fatorial(k) * fatorial(n - k)));
export const arranjo = (n, k) => fatorial(n) / fatorial(n - k);

const NOMES = ['Ana', 'Bruno', 'Carla', 'Diego', 'Eduarda', 'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'João', 'Larissa', 'Marcos', 'Natália', 'Otávio', 'Paula', 'Rafael', 'Sofia', 'Thiago', 'Vitória', 'Lucas', 'Beatriz', 'Caio', 'Júlia', 'Pedro'];
export const nome = (rng) => rng.pick(NOMES);

/** Ajustes tipográficos: sinal de menos verdadeiro, coeficiente 1 omitido, "= X = X" repetido. */
export function limpar(t) {
  return String(t)
    .trim()
    .replace(/(^|[\s(=,;:\[{/·×|])-(?=[\d.a-zπ√(])/g, '$1−')
    .replace(/(^|[\s(=,;:\[{])(−?)1([a-z])(?![a-z])/g, '$1$2$3')
    .replace(/([=:] )(\S+) = \2(?=[.;,]?(\s|$))/g, '$1$2')
    .replace(/\+ −/g, '− ')
    .replace(/− −/g, '+ ');
}

/**
 * Monta uma questão de múltipla escolha.
 * spec: { e: enunciado, r: resposta (número ou string), d: distratores, f: formatador, x: explicação }
 */
export function montar(rng, spec, totalAlternativas = 5) {
  const f = spec.f || ((v) => (typeof v === 'number' ? num(v) : String(v)));
  const correta = f(spec.r);
  const vistos = new Set([correta]);
  const alternativas = [correta];
  const tentar = (v) => {
    if (alternativas.length >= totalAlternativas) return;
    if (v == null || (typeof v === 'number' && !Number.isFinite(v))) return;
    const s = f(v);
    if (vistos.has(s)) return;
    vistos.add(s);
    alternativas.push(s);
  };
  for (const d of spec.d || []) tentar(d);
  if (typeof spec.r === 'number') {
    const r = spec.r;
    const inteiro = Number.isInteger(r);
    const extras = inteiro
      ? [r + 1, r - 1, r * 2, r + 2, Math.round(r * 1.5), Math.round(r / 2), r + 10, r - 2, r + 3, r * 3]
      : [r * 1.1, r * 0.9, r * 2, r / 2, r * 1.25, r * 0.75, r + 1, r - 1];
    for (const v of rng.shuffle(extras)) tentar(v);
  }
  if (alternativas.length < totalAlternativas) {
    throw new Error(`Distratores insuficientes para: ${spec.e.slice(0, 60)}`);
  }
  const ordem = rng.shuffle(alternativas.map((_, i) => i));
  return {
    e: limpar(spec.e),
    a: ordem.map((i) => limpar(alternativas[i])),
    c: ordem.indexOf(0),
    x: limpar(spec.x),
  };
}

/**
 * Gera `quantidade` questões únicas por nível a partir de uma lista de modelos.
 */
export function gerarNivel(rng, modelos, quantidade) {
  const saida = [];
  const vistos = new Set();
  const falhas = new Map();
  let tentativas = 0;
  let i = 0;
  while (saida.length < quantidade && tentativas < quantidade * 60) {
    tentativas++;
    const modelo = modelos[i % modelos.length];
    i++;
    let q;
    try {
      q = montar(rng, modelo(rng), modelo.alternativas || 5);
    } catch (e) {
      falhas.set(modelo, (falhas.get(modelo) || 0) + 1);
      continue;
    }
    if (vistos.has(q.e)) continue;
    vistos.add(q.e);
    saida.push(q);
  }
  modelos.forEach((m, k) => {
    if ((falhas.get(m) || 0) > 40) console.warn(`  aviso: modelo ${k} falhou ${falhas.get(m)} vezes`);
  });
  if (saida.length < quantidade) throw new Error(`Só foi possível gerar ${saida.length}/${quantidade} questões únicas`);
  // ordem estável mas misturando os modelos
  return saida;
}

const LETRAS = 'ABCDE';
export function paraMarkdown(topico, niveis) {
  const nomes = ['Fácil', 'Médio', 'Difícil'];
  const l = [
    '---',
    `titulo: ${topico.titulo}`,
    `provas: ${topico.provas.join(', ')}`,
    `descricao: ${topico.descricao}`,
    'fonte: Questão inédita gerada por computador (gabarito calculado)',
    '---',
    '',
    `<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->`,
    '',
    `# ${topico.titulo}`,
    '',
    topico.descricao,
    '',
  ];
  niveis.forEach((qs, n) => {
    l.push(`## ${nomes[n]}`, '');
    qs.forEach((q, i) => {
      l.push(`### ${i + 1}`, q.e, '');
      q.a.forEach((a, j) => l.push(`- ${LETRAS[j]}) ${a}`));
      l.push('', `**Resposta:** ${LETRAS[q.c]}`, '', `**Explicação:** ${q.x}`, '');
    });
  });
  return l.join('\n');
}
