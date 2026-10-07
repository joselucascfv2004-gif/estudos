// Grava a vitrine: chama render(t) no Chromium quadro a quadro e manda as imagens para o FFmpeg.
// Uso: node render.mjs saida.mp4 [quadros_por_segundo] [inicio] [fim]
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const [saida, fps = '60', inicio = '0', fim = '25'] = process.argv.slice(2);
const aqui = path.dirname(fileURLToPath(import.meta.url));
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1920 } });
await pagina.goto('file://' + path.join(aqui, 'vitrine.html'));
await pagina.evaluate(() => window.pronto);

const ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', fps,
  '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '12', '-pix_fmt', 'yuv420p', saida],
  { stdio: ['pipe', 'inherit', 'inherit'] });
const total = Math.round((Number(fim) - Number(inicio)) * Number(fps));
for (let q = 0; q < total; q++) {
  const t = Number(inicio) + q / Number(fps);
  await pagina.evaluate(t => window.render(t), t);
  const png = await pagina.screenshot({ type: 'png' });
  if (!ffmpeg.stdin.write(png)) await new Promise(r => ffmpeg.stdin.once('drain', r));
  if (q % 120 === 0) console.log(`quadro ${q}/${total}`);
}
ffmpeg.stdin.end();
await new Promise(r => ffmpeg.on('close', r));
await navegador.close();
