import fs from 'node:fs';
const [ano, dia, de, ate, lim = 260] = process.argv.slice(2);
const { qs } = JSON.parse(fs.readFileSync(`${ano}_D${dia}.json`, 'utf8'));
const fonte = (t) => /^([A-ZÀ-Ú][A-ZÀ-Ú'’. -]+, [A-ZÀ-Ú]|Disponível em:|[A-ZÀ-Ú][A-ZÀ-Ú]+ apud |[A-ZÀ-Ú]{3,}\. Disponível)/.test(t);
for (const q of qs.filter((q) => +q.num >= +de && +q.num <= +ate)) {
  if (q.flag || q.altsRuins) { console.log(`#${q.num} [${q.gab}] PULADA ${q.flag || 'alts'}`); continue; }
  const corpo = q.pars.filter((p) => !fonte(p));
  const cmd = corpo.pop();
  const txt = corpo.join(' ');
  console.log(`#${q.num} [${q.gab}]${q.colado ? ' COLADO' : ''} ${txt.length > lim ? txt.slice(0, lim) + '…' : txt}\n  ? ${cmd}`);
  q.alts.forEach((a, i) => console.log(`  ${'ABCDE'[i]}) ${a}`));
}
