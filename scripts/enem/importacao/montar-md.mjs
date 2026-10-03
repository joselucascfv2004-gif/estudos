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
    const verso = / v$/.test(m[3]);
    q = { num: m[1], nivel: m[2], assunto: m[3].replace(/ v$/, '').trim(), x: '', e: null, a: null, s: [], verso };
    arq.qs.push(q);
    continue;
  }
  if (!arq) continue;
  if (!q) { arq.cab.push(l); continue; }
  if (l.startsWith('x: ')) q.x = l.slice(3).trim();
  else if (l.startsWith('e: ')) q.e = l.slice(3).split(' || ');
  else if (l.startsWith('s: ')) q.s.push(/ =>\s*$/.test(l) ? [l.slice(3).replace(/ =>\s*$/, ''), ''] : l.slice(3).split(' => '))
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
  if (!natureza) return t;
  t = t.replace(/\b[A-Z][A-Za-z0-9]*\b/g, (m) => formula(m) ?? m);
  t = t.replace(/(\([A-Z][A-Za-z]*\))(\d)/g, (_, g, n) => g + SUB[n]);
  // cargas: Al3+ (aq), S2− (aq), H+ (aq), e−
  t = t.replace(/([A-Za-z₀-₉)])(\d?)([+−])(?=[\s),.;]|$)/g, (_, a, n, sinal) => a + (n ? SUP[n] : '') + SUP[sinal]);
  // o PDF deixa um espaço depois de índices: "Ca(OH)₂ ," → "Ca(OH)₂,"
  return t.replace(/([₀-₉⁰-⁹⁺⁻]) ([,.;)])/g, '$1$2');
}

for (const a of arquivos) {
  const { qs: ext } = JSON.parse(fs.readFileSync(`${a.ano}_D${a.dia}.json`, 'utf8'));
  const desc = (a.cab.find((l) => l.startsWith('descricao:')) || '').slice(10).trim();
  const resumo = a.cab.filter((l) => l.startsWith('- '));
  const intro = (a.cab.find((l) => l.startsWith('intro:')) || '').slice(6).trim();
  const out = ['---', `titulo: ENEM ${a.ano} — ${a.titulo}`, 'provas: ENEM', `descricao: ${desc}`, `fonte: ENEM ${a.ano} — INEP`, 'ordem: original', '---', '', `# ENEM ${a.ano} — ${a.titulo}`, '', intro, '', '## Resumo', '', ...resumo, ''];
  const faltas = [];
  for (const [nv, nome] of [['f', 'Fácil'], ['m', 'Médio'], ['d', 'Difícil']]) {
    out.push(`## ${nome}`, '');
    for (const d of a.qs.filter((x) => x.nivel === nv)) {
      const e = ext.find((x) => x.num === d.num);
      if (!e) { faltas.push(d.num); continue; }
      if (!/^[A-E]$/.test(e.gab || '')) faltas.push(`${d.num} (gabarito ${e.gab})`);
      if (!d.x) faltas.push(`${d.num} sem explicação`);
      const troca = (t) => d.s.reduce((acc, [de, para]) => acc.split(de).join(para), t);
      const base = [...(d.c || []), ...(d.e || (d.verso ? versos(e.linhasCorpo) : e.pars))];
      // as trocas valem sobre o texto inteiro (parágrafos separados por " || "), para poder unir parágrafos
      const pars = troca(base.join(' || '))
        .split(' || ').map((t) => t.trim()).filter(Boolean)
        // "Acesso em: ..." e parágrafos que começam com minúscula continuam o parágrafo anterior
        .reduce((acc, t) => {
          const ant = acc[acc.length - 1];
          const fonteAberta = ant && (ehFonte(ant) || ant.startsWith('> ')) && !/(\(adaptado\)|\(fragmento\)|\d{4}|s\/d|s\.d)\.?$/.test(ant) && !/^TEXTO /.test(t) && t.length < 120;
          if (acc.length && !d.verso && (/^Acesso em:/.test(t) || /^[a-zà-ú]/.test(t) || fonteAberta)) acc[acc.length - 1] += ' ' + t.replace(/^> /, '');
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
  fs.writeFileSync(DEST + a.nome, out.join('\n').replace(/\n{3,}/g, '\n\n'));
  console.log(`${a.nome}: ${a.qs.length} questões${faltas.length ? ' — PROBLEMAS: ' + faltas.join(', ') : ''}`);
}
