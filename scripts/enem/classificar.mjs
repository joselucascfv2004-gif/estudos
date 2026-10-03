// Acrescenta (ou troca) a linha **Assunto:** das questões oficiais, a partir de um mapa
// { "arquivo.md": { "136": "matematica/numeros-e-operacoes", ... } } passado em JSON.
// Uso: node scripts/enem/classificar.mjs mapa.json
import fs from 'node:fs';
import path from 'node:path';

const PASTA = path.join(path.dirname(new URL(import.meta.url).pathname), '../../conteudos/enem-oficial');
const mapa = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const [arq, assuntos] of Object.entries(mapa)) {
  const caminho = path.join(PASTA, arq);
  const linhas = fs.readFileSync(caminho, 'utf8').split('\n');
  const saida = [];
  let q = null;
  const feitas = new Set();
  for (const l of linhas) {
    if (l.startsWith('### ')) q = l.slice(4).trim();
    if (l.startsWith('**Assunto:**')) continue;
    saida.push(l);
    if (l.startsWith('**Fonte:**') && q && assuntos[q]) {
      saida.push('', `**Assunto:** ${assuntos[q]}`);
      feitas.add(q);
    }
  }
  // remove linhas em branco duplicadas criadas pela troca
  const texto = saida.join('\n').replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(caminho, texto);
  const faltam = Object.keys(assuntos).filter((k) => !feitas.has(k));
  console.log(`${arq}: ${feitas.size} classificadas${faltam.length ? `; não encontradas: ${faltam.join(', ')}` : ''}`);
}
