// node extrair2010.mjs DIA -> 2010_Dn.json (letras das alternativas são imagens: usa recuo + círculos detectados)
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const dia = process.argv[2];
const pdf = `2010_PV_impresso_${dia === '1' ? 'D1_CD1' : 'D2_CD5'}.pdf`;
const circ = JSON.parse(fs.readFileSync(`../g10/pv${dia}.json`));
const gab = {};
for (const l of fs.readFileSync(`../g10/2010_GB_D${dia}.txt`, 'utf8').trim().split('\n')) { const [n, g, duv] = l.split(' '); gab[n] = g + (duv ? '?' : ''); }
const xml = execFileSync('pdftotext', ['-bbox-layout', pdf, '-'], { maxBuffer: 1e8 }).toString();
const paginas = xml.split('<page ').slice(1);
const ruido = (l) => /^(ENEM|20\d\d)$/.test(l) || /Caderno \d+ -/.test(l) || /^\d{1,2}$/.test(l) || /^(MATEMÁTICA|CIÊNCIAS DA NATUREZA|CIÊNCIAS HUMANAS|LINGUAGENS, CÓDIGOS)/.test(l) || /^E SUAS TECNOLOGIAS$/.test(l) || /^Questões de \d+ a \d+/.test(l) || /^RASCUNHO$/i.test(l);
const qs = []; let q = null; const vistos = {};
paginas.forEach((pg, ip) => {
  const p = ip + 1;
  const linhas = [];
  for (const m of pg.matchAll(/<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([\s\S]*?)<\/line>/g)) {
    const t = [...m[5].matchAll(/>([^<]*)<\/word>/g)].map((x) => x[1]).join(' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
    linhas.push({ x: +m[1], y0: +m[2], y1: +m[4], t, col: +m[1] < 297 ? 0 : 1 });
  }
  linhas.sort((a, b) => a.col - b.col || a.y0 - b.y0);
  const cp = circ.filter((o) => o.p === p);
  for (const L of linhas) {
    const m = L.t.match(/^Quest[ãa]o (\d+)$/i);
    if (m) {
      const n = String(+m[1]);
      vistos[n] = (vistos[n] || 0) + 1;
      q = { num: n, rep: vistos[n] > 1, linhas: [] }; qs.push(q); continue;
    }
    if (!q || !L.t || ruido(L.t)) continue;
    const ini = L.col ? 315.8 : 43.7;
    const recuado = L.x > ini + 12 && L.x < ini + 22;
    const yc = (L.y0 + L.y1) / 2;
    const circulo = recuado && cp.some((o) => o.x / 2 > ini - 4 && o.x / 2 < ini + 16 && Math.abs(o.y / 2 - yc) < 5);
    q.linhas.push({ t: L.t, recuado, circulo, p, col: L.col, yc });
  }
});
const PALAVRAS = /figura|gráfico|imagem|ilustra|esquema|mapa|representad|charge|tirinha|cartum|foto|desenho|observe|malha|planta baixa|quadriculad/i;
const ehFonte = (t) => /^([A-ZÀ-Ú][A-ZÀ-Ú'’. -]+, [A-ZÀ-Ú]|Disponível em:|[A-ZÀ-Ú][A-ZÀ-Ú]+ apud |[A-ZÀ-Ú]{3,}\. Disponível|[A-ZÀ-Ú]{2,}(?: [A-ZÀ-Ú]{2,})*[.;] [A-ZÀ-Ú])/.test(t);
// linhas não recuadas depois das alternativas pertencem à questão seguinte (texto compartilhado)
for (let i = 0; i < qs.length; i++) {
  const L = qs[i].linhas;
  let k = L.length; while (k > 0 && !L[k - 1].recuado) k--;
  if (k > 0 && k < L.length && qs[i + 1]) { const resto = L.splice(k); qs[i + 1].linhas.unshift(...resto); }
}
for (const q of qs) {
  const L = q.linhas;
  let k = L.length; while (k > 0 && L[k - 1].recuado) k--;
  const altL = L.slice(k);
  const alts = [];
  let inicios = altL.map((l, i) => (l.circulo || i === 0 ? i : -1)).filter((i) => i >= 0);
  if (inicios.length !== 5 && altL.length === 5) inicios = [0, 1, 2, 3, 4];
  q.pos = [];
  altL.forEach((l, i) => {
    if (inicios.includes(i) || !alts.length) { alts.push(l.t); q.pos.push({ p: l.p, col: l.col, y: l.yc }); }
    else alts[alts.length - 1] = alts[alts.length - 1].endsWith('-') ? alts[alts.length - 1].slice(0, -1) + l.t : alts[alts.length - 1] + ' ' + l.t;
  });
  q.alts = alts;
  const corpo = L.slice(0, k).map((l) => l.t);
  const pars = []; let p = '';
  corpo.forEach((t, i) => {
    const seguinte = corpo[i + 1] || '';
    if (i === 0 && t.length < 40 && !/[.:?!,;]$/.test(t) && /^[A-ZÀ-Ú“"]/.test(seguinte) && !/^TEXTO/i.test(t)) { pars.push(t); return; }
    if (/^TEXTO [IVX]+$/i.test(t)) { if (p) pars.push(p); pars.push(t); p = ''; return; }
    if (ehFonte(t) && p) { pars.push(p); p = ''; }
    p = p ? (/[a-zà-ú]-$/.test(p) ? p.slice(0, -1) + t : p + ' ' + t) : t;
    const fimFonte = ehFonte(p) && /\(adaptado\)\.$|\(fragmento\)\.$|\d{4}\.$|s\/d\.$|s\.d\.$/.test(t);
    if (fimFonte || (/[.:?!)]$/.test(t) && t.length < 48)) { pars.push(p); p = ''; }
  });
  if (p) pars.push(p);
  q.pars = pars; q.linhasCorpo = corpo;
  q.gab = q.rep ? '' : (gab[(dia === '2' && +q.num <= 95 ? 'en' : '') + q.num] || '');
  q.flag = (PALAVRAS.exec(corpo.join(' ')) || [''])[0];
  if (q.alts.length !== 5) q.altsRuins = true;
  delete q.linhas;
}
const final = qs.filter((q) => !q.rep);
fs.writeFileSync(`2010_D${dia}.json`, JSON.stringify({ qs: final }, null, 1));
console.log(`2010 dia ${dia}: ${final.length} questões; alternativas ruins: ${final.filter((q) => q.altsRuins).map((q) => q.num).join(',')}; sem gabarito: ${final.filter((q) => !/^[A-E]$/.test(q.gab)).map((q) => q.num + '(' + q.gab + ')').join(',')}`);
