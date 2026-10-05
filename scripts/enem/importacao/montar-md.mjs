// node montar-md.mjs decisoes.txt  — gera os .md das provas a partir do texto extraído + decisões
// Formato das decisões:
//   ## arquivo.md | ANO | DIA | caderno (ex.: "2º dia, caderno amarelo") | Título da área
//   (linhas seguintes até o próximo "@": cabeçalho extra — descricao: ..., resumo em "- ...")
//   @NUM nivel(f|m|d) assunto[, assunto2]
//   x: explicação
//   e: substitui o enunciado (parágrafos separados por " || "; "> " no início = citação de fonte)
//   a: A | B | C | D | E   (substitui as alternativas)
//   c: arquivo.txt  (texto compartilhado por várias questões, parágrafos separados por linha em branco)
import fs from 'node:fs';
const DEST = '/home/user/estudos/conteudos/enem-oficial/';
const linhas = fs.readFileSync(process.argv[2], 'utf8').split('\n');
const arquivos = [];
let arq = null, q = null;
for (const l of linhas) {
  let m;
  if ((m = l.match(/^## (\S+) \| (\d{4}) \| (\d) \| ([^|]+) \| (.+)$/))) {
    arq = { nome: m[1], ano: m[2], dia: m[3], caderno: m[4].trim(), titulo: m[5].trim(), cab: [], qs: [] };
    arquivos.push(arq);
    q = null;
    continue;
  }
  if ((m = l.match(/^@(\d+) ([fmd]) (.+)$/))) {
    const fig = / fig\b/.test(m[3]);
    const verso = / v\b/.test(m[3]);
    q = { num: m[1], nivel: m[2], assunto: m[3].replace(/ (v|fig)\b/g, '').trim(), x: '', e: null, a: null, s: [], verso, fig };
    arq.qs.push(q);
    continue;
  }
  if (!arq) continue;
  if (!q) { arq.cab.push(l); continue; }
  if (l.startsWith('x: ')) q.x = l.slice(3).trim();
  else if (l.startsWith('e: ')) q.e = l.slice(3).split(' || ');
  else if (l.startsWith('s: ')) q.s.push(/ =>\s*$/.test(l) ? [l.slice(3).replace(/ =>\s*$/, ''), ''] : l.slice(3).split(' => '))
  else if (l.startsWith('g: ')) q.g = l.slice(3).trim();
  else if (l.startsWith('a: ')) q.a = l.slice(3).split(' | ').map((s) => s.trim());
  else if (l.startsWith('c: ')) q.c = fs.readFileSync(l.slice(3).trim(), 'utf8').trim().split(/\n\s*\n/).map((p) => p.trim());
  else if (l.trim() && q.x) q.x += ' ' + l.trim();
}
const ehFonte = (t) => /^([A-ZÀ-Ú][A-ZÀ-Ú'’. -]+, [A-ZÀ-Ú]|Disponível em:|[A-ZÀ-Ú][A-ZÀ-Ú]+ apud |[A-ZÀ-Ú]{3,}\. Disponível|[A-ZÀ-Ú]{2,}(?: [A-ZÀ-Ú]{2,})*[.;] [A-ZÀ-Ú])/.test(t);
// poemas e letras de canção: mantém as quebras de linha até a fonte; o resto vira prosa
function versos(L) {
  const out = [];
  let bloco = [], fonte = null, prosa = [];
  const fimFonte = (t) => /\(adaptado\)\.$|\(fragmento\)\.$|\d{4}\.$|s\/d\.$|s\.d\.$|\d{4}\.?\)?\.?$/.test(t);
  let depoisDaFonte = false;
  const fecharBloco = () => { if (bloco.length) out.push(bloco.join(' // ')); bloco = []; };
  for (const t of L) {
    if (fonte !== null) { fonte += ' ' + t; if (fimFonte(t)) { out.push('> ' + fonte); fonte = null; depoisDaFonte = true; } continue; }
    if (/^TEXTO [IVX]+$/.test(t)) { fecharBloco(); if (prosa.length) { out.push(prosa.join(' ')); prosa = []; } out.push(t); continue; }
    if (ehFonte(t)) { fecharBloco(); if (prosa.length) { out.push(prosa.join(' ')); prosa = []; } if (fimFonte(t)) { out.push('> ' + t); depoisDaFonte = true; } else fonte = t; continue; }
    if (depoisDaFonte) prosa.push(t); else bloco.push(t);
  }
  fecharBloco();
  if (fonte) out.push('> ' + fonte);
  if (prosa.length) out.push(prosa.join(' ').replace(/([a-zà-ú])- ([a-zà-ú])/g, '$1$2'));
  return out;
}

// Formatação automática (só nos anos novos, com "auto: sim" no cabeçalho): fórmulas químicas
// (CO2 → CO₂), unidades (m3 → m³, mol−1 → mol⁻¹), cargas de íons (Al3+ → Al³⁺) e o "° °C" duplicado.
const ELEM = new Set('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pt Au Hg Pb Bi Po Rn Ra U Pu W Os Ir Tl'.split(' '));
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '−': '⁻', '-': '⁻' };
function formula(tok) {
  const partes = tok.match(/[A-Z][a-z]?\d*/g);
  if (!partes || partes.join('') !== tok || !/\d/.test(tok)) return null;
  if (!partes.every((p) => ELEM.has(p.replace(/\d+$/, '')))) return null;
  if (partes.length < 2 && !/^(O|H|N|Cl|F|Br|I)2$|^O3$/.test(tok)) return null;
  return tok.replace(/\d/g, (d) => SUB[d]);
}
function formatar(t, natureza) {
  t = t.replace(/° °/g, '°');
  t = t.replace(/(^|[\s\d/·⋅(])((?:c|d|k|m)?m)([23])(?![\w\d])/g, (_, a, u, n) => a + u + SUP[n]);
  t = t.replace(/\/s2(?![\w\d])/g, '/s²');
  t = t.replace(/\b(mol|K|L|s|g|kg|h|J|cm|mL|m)−(\d)(?![\d,])/g, (_, u, n) => u + '⁻' + SUP[n]);
  t = t.replace(/([²³]) ([,.;:)?])/g, '$1$2');
  if (!natureza) return t;
  t = t.replace(/\b[A-Z][A-Za-z0-9]*\b/g, (m) => formula(m) ?? m);
  t = t.replace(/(\([A-Z][A-Za-z]*\))(\d)/g, (_, g, n) => g + SUB[n]);
  // cargas: Al3+ (aq), S2− (aq), H+ (aq), e−
  t = t.replace(/([A-Za-z₀-₉)])(\d?)([+−])(?=[\s),.;]|$)/g, (_, a, n, sinal) => a + (n ? SUP[n] : '') + SUP[sinal]);
  // o PDF deixa um espaço depois de índices: "Ca(OH)₂ ," → "Ca(OH)₂,"
  return t.replace(/([₀-₉⁰-⁹⁺⁻]) ([,.;)])/g, '$1$2');
}

// questões com figura: texto e recortes vêm de ../fig/ANO_Dn_fig.json (gerado por figuras.py)
const ASSETS = '/home/user/estudos/app/assets/questoes/';
const FIGDIR = new URL('../fig/', import.meta.url).pathname;
function parsDaFig(q, verso) {
  const pars = [];
  let cur = '', prev = null, xItem = 0;
  const fecha = () => { if (cur) pars.push(cur); cur = ''; };
  for (const c of q.corpo) {
    if (c.fig) { fecha(); pars.push(`![Figura](${c.fig})`); prev = null; continue; }
    const continuaItem = cur.startsWith('•') && !c.t.startsWith('•') && c.x > xItem + 4;
    const novo = !cur || (c.x >= 8 && !continuaItem) || (cur.startsWith('•') && c.x < 5) || (prev && Math.abs(prev.sz - c.sz) > 0.5) || (ehFonte(c.t) && !(prev && ehFonte(prev.t))) || /^TEXTO [IVX]+$/.test(c.t) || (prev && /^TEXTO [IVX]+$/.test(prev.t));
    if (verso && cur && prev && Math.abs(prev.sz - c.sz) <= 0.5 && !ehFonte(c.t) && !ehFonte(prev.t) && !/^TEXTO [IVX]+$/.test(c.t) && !/^TEXTO [IVX]+$/.test(prev.t)) { cur += ' // ' + c.t; prev = c; continue; }
    if (novo) { fecha(); cur = c.t; if (c.t.startsWith('•')) xItem = c.x; } else cur = /[a-zà-ú]-$/.test(cur) && /^[a-zà-ú]/.test(c.t) ? cur.slice(0, -1) + c.t : cur + ' ' + c.t;
    prev = c;
  }
  fecha();
  // restos de frações e expoentes das alternativas ("100", "1")
  return pars.filter((p) => !/^[\d\s.,−+-]{1,6}$/.test(p));
}
const imgFig = (a, num, n) => `enem-${a.ano}-d${a.dia}-q${String(num).padStart(3, '0')}-${n}.webp`;
for (const a of arquivos) {
  const { qs: ext } = JSON.parse(fs.readFileSync(`${a.ano}_D${a.dia}.json`, 'utf8'));
  const figPath = `${FIGDIR}${a.ano}_D${a.dia}_fig.json`;
  const figs = fs.existsSync(figPath) ? JSON.parse(fs.readFileSync(figPath, 'utf8')).filter((q) => !q.rep) : [];
  const desc = (a.cab.find((l) => l.startsWith('descricao:')) || '').slice(10).trim();
  const resumo = a.cab.filter((l) => l.startsWith('- '));
  const intro = (a.cab.find((l) => l.startsWith('intro:')) || '').slice(6).trim();
  const out = ['---', `titulo: ENEM ${a.ano} — ${a.titulo}`, 'provas: ENEM', `descricao: ${desc}`, `fonte: ENEM ${a.ano} — INEP`, 'ordem: original', '---', '', `# ENEM ${a.ano} — ${a.titulo}`, '', intro, '', '## Resumo', '', ...resumo, ''];
  const faltas = [];
  for (const [nv, nome] of [['f', 'Fácil'], ['m', 'Médio'], ['d', 'Difícil']]) {
    out.push(`## ${nome}`, '');
    for (const d of a.qs.filter((x) => x.nivel === nv)) {
      let e = ext.find((x) => x.num === d.num);
      if (!e) { faltas.push(d.num); continue; }
      if (d.fig) {
        const f = figs.find((x) => String(x.num) === d.num);
        if (!f) { faltas.push(`${d.num} sem figura`); continue; }
        // texto de 1–2 caracteres junto da figura é rótulo de eixo ("h", "y"), não a alternativa
        let alts = f.alts.map((x) => (x.figs.length && x.txt.replace(/(?:ENE[MN]20\d\d){3,}/g, '').trim().length <= 2 ? `![Alternativa ${x.letra}](${x.figs[0]})` : x.txt));
        let fc = f;
        if (!f.alts.length && e.alts.length === 5) {
          // marcadores desenhados (2010): alternativas vêm do texto extraído e o corpo para antes da primeira
          const ini = e.alts[0].replace(/\s+/g, ' ').slice(0, 20);
          const k = f.corpo.findIndex((c) => c.t && ((ini.startsWith(c.t.trim().slice(0, 20)) && c.t.trim().length > 3) || c.t.trim() === e.alts[0].trim()));
          if (k >= 0) fc = { ...f, corpo: f.corpo.slice(0, k) };
          // sem as marcas desenhadas das alternativas (figuras pequenas no fim) e o rodapé "2010"
          const corpo = fc.corpo.filter((c) => !(c.t && /^\s*20\d\d\s*$/.test(c.t)));
          while (corpo.length && corpo[corpo.length - 1].fig && corpo[corpo.length - 1].w < 160) corpo.pop();
          fc = { ...fc, corpo };
          alts = e.alts;
        }
        e = { ...e, pars: parsDaFig(fc, d.verso), alts };
      }
      const comFig = (t) => t.replace(/\[fig(\d+)\]/g, (_, n) => `![Figura](${imgFig(a, d.num, n)})`);
      if (d.e) d.e = d.e.map(comFig);
      if (d.a) d.a = d.a.map((t) => t.replace(/^\[fig(\d+)\]$/, (_, n) => `![Alternativa](${imgFig(a, d.num, n)})`));
      if (d.g) e.gab = d.g;
      if (!/^[A-E]$/.test(e.gab || '')) faltas.push(`${d.num} (gabarito ${e.gab})`);
      if (!d.x) faltas.push(`${d.num} sem explicação`);
      // ligaduras partidas do PDF ("signiﬁ cativas") viram letras comuns
      const troca = (t) => d.s.reduce((acc, [de, para]) => acc.split(de).join(para), t).replace(/ﬁ ?/g, 'fi').replace(/ﬂ ?/g, 'fl').replace(/ *(?:ENE[MN]20\d\d){3,}/g, '');
      const base = [...(d.c || []), ...(d.e || (d.verso ? versos(e.linhasCorpo) : e.pars))];
      // as trocas valem sobre o texto inteiro (parágrafos separados por " || "), para poder unir parágrafos
      const pars = troca(base.join(' || ')).replace(/ *[\uE000-\uF8FF] */g, ' ')
        .split(' || ').map((t) => t.replace(/^\|\|\s*/, '').replace(/ *(\bIT_\d+\b|\b(MT|LC|CH|CN) - PROVA I\b|_{10,}) */g, ' ').trim()).filter(Boolean)
        // "Acesso em: ..." e parágrafos que começam com minúscula continuam o parágrafo anterior
        .reduce((acc, t) => {
          const ant = acc[acc.length - 1];
          const fonteAberta = ant && (ehFonte(ant) || ant.startsWith('> ')) && !/(\(adaptado\)|\(fragmento\)|\d{4}|s\/d|s\.d)\.?$/.test(ant) && !/^TEXTO /.test(t) && t.length < 120;
          if (acc.length && !d.verso && !ant.startsWith('![') && (/^Acesso em:/.test(t) || /^[a-zà-ú]/.test(t) || fonteAberta)) acc[acc.length - 1] += ' ' + t.replace(/^> /, '');
          else acc.push(t);
          return acc;
        }, []);
      const auto = a.cab.some((l) => /^auto:\s*sim/.test(l));
      const natureza = /Natureza/.test(a.titulo);
      const fmt = (t) => (auto ? formatar(t, natureza) : t);
      const alts = (d.a || e.alts).map(troca).map(fmt);
      for (const [de] of d.s) if (!base.join(' || ').includes(de) && !(d.a || e.alts).some((t) => t.includes(de))) faltas.push(`${d.num}: troca não achou "${de}"`);
      out.push(`### ${d.num}`);
      for (const p of pars.map(fmt)) out.push((ehFonte(p) || p.startsWith('> ') ? `> ${p.replace(/^> /, '')}` : p).split(' // ').join('\n'), '');
      alts.forEach((t, i) => out.push(`- ${'ABCDE'[i]}) ${t}`));
      out.push('', `**Resposta:** ${e.gab}`, '', `**Explicação:** ${d.x}`, '', `**Fonte:** ENEM ${a.ano}, ${a.caderno}, questão ${d.num}`, '', `**Assunto:** ${d.assunto}`, '');
    }
  }
  const texto = out.join('\n').replace(/\n{3,}/g, '\n\n');
  for (const [, nome] of texto.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const orig = `${FIGDIR}img${a.ano}/${nome}`;
    if (!fs.existsSync(orig)) { faltas.push(`imagem ${nome} não existe`); continue; }
    fs.mkdirSync(ASSETS, { recursive: true });
    fs.copyFileSync(orig, ASSETS + nome);
  }
  // "mesclar: sim": acrescenta as questões ao arquivo que já existe (feito à mão), cada uma no fim
  // da sua seção de dificuldade, e troca as que já tinham sido acrescentadas antes
  if (a.cab.some((l) => /^mesclar:\s*sim/.test(l))) {
    const blocos = {};
    let sec = null;
    let cur = null;
    for (const l of texto.split('\n')) {
      const m = l.match(/^## (Fácil|Médio|Difícil)$/);
      if (m) { sec = m[1]; blocos[sec] = []; cur = null; continue; }
      if (!sec) continue;
      if (/^### \d+$/.test(l)) { cur = [l]; blocos[sec].push(cur); } else if (cur) cur.push(l);
    }
    const novos = new Set(a.qs.map((q) => `### ${q.num}`));
    const saida = [];
    let secAtual = null;
    let pulando = false;
    const fechaSec = () => {
      if (!secAtual || !blocos[secAtual]) return;
      while (saida.length && saida[saida.length - 1] === '') saida.pop();
      for (const b of blocos[secAtual]) { saida.push(''); saida.push(...b); while (saida[saida.length - 1] === '') saida.pop(); }
      saida.push('');
    };
    for (const l of fs.readFileSync(DEST + a.nome, 'utf8').split('\n')) {
      if (/^## /.test(l)) { pulando = false; fechaSec(); secAtual = (l.match(/^## (Fácil|Médio|Difícil)$/) || [])[1] || null; saida.push(l); continue; }
      if (/^### /.test(l)) pulando = novos.has(l.trim());
      if (!pulando) saida.push(l);
    }
    fechaSec();
    fs.writeFileSync(DEST + a.nome, saida.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\n*$/, '\n'));
  } else fs.writeFileSync(DEST + a.nome, texto);
  console.log(`${a.nome}: ${a.qs.length} questões${faltas.length ? ' — PROBLEMAS: ' + faltas.join(', ') : ''}`);
}
