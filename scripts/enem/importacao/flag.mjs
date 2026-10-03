// node flag.mjs ANO DIA de ate — mostra as questões marcadas como "figura", em resumo
import fs from 'node:fs';
const [ano, dia, de, ate] = process.argv.slice(2);
const { qs } = JSON.parse(fs.readFileSync(`${ano}_D${dia}.json`, 'utf8'));
for (const q of qs.filter((q) => +q.num >= +de && +q.num <= +ate && (q.flag || q.altsRuins))) {
  const t = q.pars.join(' ¶ ');
  const i = t.search(new RegExp(q.flag || 'xxxx', 'i'));
  console.log(`#${q.num} [${q.gab}] ${q.flag || 'ALTS'}: …${t.slice(Math.max(0, i - 160), i + 120)}… | alts: ${q.alts.map((a) => a.slice(0, 25)).join(' / ')}`);
}
