// node compart.mjs PDF linhaIni linhaFim saida.txt "Início do parágrafo 2|Início do parágrafo 3|..."
// Junta as linhas (modo -raw) de um texto compartilhado por várias questões em parágrafos.
// Linhas só com números (numeração das linhas) são descartadas. A última linha que for fonte
// ("SOBRENOME, X. ..." ou "Disponível em:") vira citação.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const [pdf, ini, fim, saida, inicios = ''] = process.argv.slice(2);
const L = execFileSync('pdftotext', ['-raw', pdf, '-']).toString().split('\n').slice(+ini - 1, +fim).map((l) => l.trim()).filter((l) => l && !/^\d+$/.test(l));
const marcas = inicios.split('|').filter(Boolean);
const pars = [];
let p = '';
for (const l of L) {
  if (p && marcas.some((m) => l.startsWith(m))) { pars.push(p); p = ''; }
  p = p ? (/[a-zà-ú]-$/.test(p) ? p.slice(0, -1) + l : p + ' ' + l) : l;
}
if (p) pars.push(p);
fs.writeFileSync(saida, pars.join('\n\n') + '\n');
console.log(pars.map((x) => x.slice(0, 80) + (x.length > 80 ? '…' : '')).join('\n'));
