// node circulos.mjs PDF -> lista, em ordem de leitura, os círculos das alternativas (preto ou verde)
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const pdf = process.argv[2];
const N = +execFileSync('pdfinfo', [pdf]).toString().match(/Pages:\s+(\d+)/)[1];
const todos = [];
for (let p = 1; p <= N; p++) {
  execFileSync('pdftoppm', ['-f', String(p), '-l', String(p), '-r', '144', pdf, 'pg']);
  const arq = fs.readdirSync('.').find((f) => f.startsWith('pg') && f.endsWith('.ppm'));
  const buf = fs.readFileSync(arq); fs.unlinkSync(arq);
  // cabeçalho P6
  let pos = 0; const tok = [];
  while (tok.length < 4) { while (/\s/.test(String.fromCharCode(buf[pos]))) pos++; let s = ''; while (!/\s/.test(String.fromCharCode(buf[pos]))) s += String.fromCharCode(buf[pos++]); tok.push(s); }
  pos++;
  const W = +tok[1], H = +tok[2];
  const tipo = new Uint8Array(W * H); // 1 escuro, 2 verde
  for (let i = 0; i < W * H; i++) {
    const r = buf[pos + 3 * i], g = buf[pos + 3 * i + 1], b = buf[pos + 3 * i + 2];
    if (g > r + 50 && b < g + 30) tipo[i] = 2; else if (r + g + b < 400) tipo[i] = 1;
  }
  const vis = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    if (!tipo[i] || vis[i]) continue;
    const t = tipo[i]; const fila = [i]; vis[i] = 1;
    let x0 = W, x1 = 0, y0 = H, y1 = 0, n = 0;
    while (fila.length) {
      const k = fila.pop(); n++;
      const x = k % W, y = (k / W) | 0;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (const d of [1, -1, W, -W]) { const j = k + d; if (j >= 0 && j < W * H && !vis[j] && tipo[j] === t) { vis[j] = 1; fila.push(j); } }
    }
    const w = x1 - x0 + 1, h = y1 - y0 + 1;
    if (t === 2 ? (n > 40 && w >= 12 && w <= 60 && h >= 12 && h <= 40) : (w >= 12 && w <= 26 && h >= 12 && h <= 26 && Math.abs(w - h) <= 4)) todos.push({ p, x: (x0 + x1) / 2, y: (y0 + y1) / 2, w, h, n, verde: t === 2, W });
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(todos));
console.log(todos.length, 'círculos candidatos');
