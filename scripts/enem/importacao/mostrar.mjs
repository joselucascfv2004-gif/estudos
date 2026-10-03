import fs from 'node:fs';
const [ano, dia, de, ate] = process.argv.slice(2);
const { qs } = JSON.parse(fs.readFileSync(`${ano}_D${dia}.json`, 'utf8'));
for (const q of qs.filter((q) => +q.num >= +de && +q.num <= +ate)) {
  console.log(`\n### ${q.num} [${q.gab}]${q.flag ? ' FIG:' + q.flag : ''}${q.lixo ? ' LIXO' : ''}`);
  q.pars.forEach((p) => console.log('  ' + p));
  (q.alts || []).forEach((a, i) => console.log(`  ${'ABCDE'[i]}) ${a}`));
}
