// node extrair2.mjs ANO DIA -> ANO_Dn.json usando o texto -raw (ordem de leitura) do PDF
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const [ano, dia] = process.argv.slice(2);
const pdf = `${ano}_PV_impresso_${dia === '1' ? 'D1_CD1' : 'D2_CD5'}.pdf`;
const gbTxt = fs.readFileSync(`${ano}_GB_${dia === '1' ? 'D1_CD1' : 'D2_CD5'}.txt`, 'utf8');
const gab = {};
for (const l of gbTxt.split('\n')) {
  const t = l.trim().split(/\s+/);
  if (dia === '1' && /^[1-5]$/.test(t[0]) && /^[A-E]$/.test(t[1]) && /^[A-E]$/.test(t[2])) { if (t[3]) gab[t[3]] = t[4]; continue; }
  for (let i = 0; i < t.length - 1; i++) if (/^\d{1,3}$/.test(t[i]) && /^([A-E]|Anulado|ANULADA)$/i.test(t[i + 1])) gab[String(+t[i])] = t[i + 1];
}
const ruido = (l) => /^(ENEM|20\d\d)$/.test(l) || /^\*\d+[A-Z]+\d+\*$/.test(l) || /Caderno \d+ -/.test(l) || /^\d{1,2}$/.test(l) ||
  /^(MATEMÁTICA|CIÊNCIAS DA NATUREZA|CIÊNCIAS HUMANAS|LINGUAGENS, CÓDIGOS)/.test(l) || /^E SUAS TECNOLOGIAS$/.test(l) || /^Questões de \d+ a \d+/.test(l);
// no modo -raw, linhas justificadas às vezes perdem os espaços ("deaçúcaremseu"): troca pela
// mesma linha lida no modo normal, que mantém os espaços
const comEspacos = new Map();
for (const l of execFileSync('pdftotext', [pdf, '-']).toString().split('\n')) {
  const t = l.trim();
  if (t) comEspacos.set(t.replace(/\s/g, ''), t);
}
const raw = execFileSync('pdftotext', ['-raw', pdf, '-']).toString().split('\n').map((l) => l.trim())
  .map((l) => {
    const outra = comEspacos.get(l.replace(/\s/g, ''));
    const espacos = (t) => (t.match(/ /g) || []).length;
    return outra && espacos(outra) > espacos(l) ? outra : l;
  });
const qs = [];
let q = null;
for (let i = 0; i < raw.length; i++) {
  const L = raw[i];
  const m = L.match(/^QUEST[ÃA]O (\d+)$/i);
  if (m) { q = { num: String(+m[1]), linhas: [] }; qs.push(q); continue; }
  if (!q || !L || ruido(L)) continue;
  q.linhas.push(L);
}
// alternativas: a ÚLTIMA linha "A"/"A ..." seguida, em ordem, de marcadores B, C, D e E
const marca = (l, x) => l === x || l.startsWith(x + ' ');
for (const q of qs) {
  const L = q.linhas;
  let iA = -1;
  for (let i = L.length - 1; i >= 0 && iA < 0; i--) {
    if (!marca(L[i], 'A')) continue;
    let k = i, ok = true;
    for (const x of 'BCDE') {
      while (k < L.length && !marca(L[k], x)) k++;
      if (k >= L.length) { ok = false; break; }
    }
    if (ok) iA = i;
  }
  if (iA > 0 && L[iA - 1] === 'A') iA--;
  q.alts = [];
  if (iA >= 0) {
    for (let i = iA; i < L.length; i++) {
      const prox = 'ABCDE'[q.alts.length];
      if (prox && marca(L[i], prox)) {
        // formato "A" + "A texto": pula a repetição da letra
        if (L[i] === prox && L[i + 1] && marca(L[i + 1], prox) && L[i + 1] !== prox) i++;
        q.alts.push(L[i].slice(1).trim());
        continue;
      }
      const ultima = q.alts.length === 5;
      if (!ultima || (/^[a-zà-ú(]/.test(L[i]) && !/[.?]$/.test(q.alts[4]))) q.alts[q.alts.length - 1] += (q.alts[q.alts.length - 1] ? ' ' : '') + L[i];
    }
  }
  q.corpo = iA >= 0 ? L.slice(0, iA) : L;
  delete q.linhas;
}
const PALAVRAS = /figura|gráfico|imagem|ilustra|esquema|mapa|representad|charge|tirinha|cartum|foto|desenho|observe|malha|planta baixa|quadriculad/i;
for (const q of qs) {
  const pars = [];
  let p = '';
  const ehFonte = (t) => /^([A-ZÀ-Ú][A-ZÀ-Ú'’. -]+, [A-ZÀ-Ú]|Disponível em:|[A-ZÀ-Ú][A-ZÀ-Ú]+ apud |[A-ZÀ-Ú]{3,}\. Disponível|[A-ZÀ-Ú]{2,}(?: [A-ZÀ-Ú]{2,})*[.;] [A-ZÀ-Ú])/.test(t);
  q.corpo.forEach((t, k) => {
    const seguinte = q.corpo[k + 1] || '';
    // título: primeira linha curta, sem pontuação final
    if (k === 0 && t.length < 40 && !/[.:?!,;]$/.test(t) && /^[A-ZÀ-Ú“"]/.test(seguinte) && !/^TEXTO/.test(t)) { pars.push(t); return; }
    if (/^TEXTO [IVX]+$/.test(t)) { if (p) pars.push(p); pars.push(t); p = ''; return; }
    if (ehFonte(t) && p) { pars.push(p); p = ''; }
    p = p ? (/[a-zà-ú]-$/.test(p) ? p.slice(0, -1) + t : p + ' ' + t) : t;
    const fimFonte = ehFonte(p) && (/\(adaptado\)\.$|\(fragmento\)\.$|\d{4}\.$|s\/d\.$|s\.d\.$/.test(t));
    if (fimFonte || (/[.:?!)]$/.test(t) && t.length < 48)) { pars.push(p); p = ''; }
  });
  if (p) pars.push(p);
  q.pars = pars;
  q.linhasCorpo = q.corpo;
  q.gab = gab[q.num];
  q.flag = (PALAVRAS.exec(q.corpo.join(' ')) || [''])[0];
  q.colado = q.corpo.filter((l) => l.length > 28 && !/ /.test(l)).length;
  if (q.alts.length !== 5 || q.alts.some((a) => !a)) q.altsRuins = true;
  delete q.corpo;
}
fs.writeFileSync(`${ano}_D${dia}.json`, JSON.stringify({ qs }, null, 1));
console.log(`${ano} dia ${dia}: ${qs.length} questões; figura: ${qs.filter((q) => q.flag).length}; alternativas ruins: ${qs.filter((q) => q.altsRuins).length}; gabaritos: ${Object.keys(gab).length}`);
