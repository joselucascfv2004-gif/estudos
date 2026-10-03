import fs from 'node:fs';
const [ano, dia, lista] = process.argv.slice(2);
const { qs } = JSON.parse(fs.readFileSync(`${ano}_D${dia}.json`, 'utf8'));
const nums = lista.split(',').map(Number);
for (const q of qs.filter((q) => nums.includes(+q.num))) {
  console.log(`\n### ${q.num} [${q.gab}]${q.colado ? ' COLADO' : ''}${q.flag ? ' FLAG '+q.flag : ''}${q.altsRuins ? ' ALTSRUINS' : ''}`);
  q.pars.forEach((p, i) => console.log(`  ${i}| ${p}`));
  q.alts.forEach((a, i) => console.log(`  ${'ABCDE'[i]}) ${a}`));
}
