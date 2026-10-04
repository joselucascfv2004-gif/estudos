// node gab.mjs circulos.json primeiraQuestao -> gabarito por ordem de leitura dos círculos verdes
import fs from 'node:fs';
const c = JSON.parse(fs.readFileSync(process.argv[2]));
let num = +process.argv[3];
const pular = (process.argv[4] || '').split(',').filter(Boolean).map(Number); // números repetidos (língua estrangeira)
const verdes = c.filter((o) => o.verde).sort((a, b) => a.p - b.p || (a.x > a.W / 2) - (b.x > b.W / 2) || a.y - b.y);
const out = [];
for (const g of verdes) {
  const col = c.filter((o) => !o.verde && o.p === g.p && Math.abs(o.x - g.x) < 9 && o.n / (o.w * o.h) > 0.42).sort((a, b) => a.y - b.y);
  const k = col.findIndex((o) => Math.abs(o.y - g.y) < 8);
  let ini = k, fim = k;
  while (ini > 0 && col[ini].y - col[ini - 1].y < 110) ini--;
  while (fim < col.length - 1 && col[fim + 1].y - col[fim].y < 110) fim++;
  let run = fim - ini + 1, idx = k - ini, nota = '';
  if (run > 5) {
    // janela de 5 que contém o verde e tem o menor espaçamento máximo
    let melhor = null;
    for (let s = Math.max(ini, k - 4); s <= Math.min(k, fim - 4); s++) {
      let mx = 0; for (let j = s; j < s + 4; j++) mx = Math.max(mx, col[j + 1].y - col[j].y);
      if (!melhor || mx < melhor.mx) melhor = { s, mx };
    }
    idx = k - melhor.s; nota = 'janela'; run = 5;
  } else if (run < 5) {
    if (col[ini].y < 330) { idx = 5 - run + (k - ini); nota = 'fim'; } else nota = 'início';
  }
  out.push({ num, p: g.p, letra: k < 0 ? '?' : 'ABCDE'[idx], run, nota, ok: k >= 0 && run === 5 });
  num++;
}
console.log(out.filter((o) => o.nota).map((o) => `${o.num}(p${o.p}, ${o.nota} ${o.run}, ${o.letra})`).join(' '));
fs.writeFileSync(process.argv[2].replace('.json', '-gab.txt'), out.map((o) => `${o.num} ${o.letra}${o.ok ? '' : ' ?'}`).join('\n') + '\n');
console.log(out.map((o) => o.num + o.letra).join(' '));
