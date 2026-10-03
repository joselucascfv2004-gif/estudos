#!/usr/bin/env node
// Redistribui a posição da alternativa correta nas questões ESCRITAS À MÃO
// (arquivos sem o aviso de "Arquivo GERADO" e sem "ordem: original" no cabeçalho), para que o gabarito fique
// equilibrado entre A, B, C, D e E. A ordem é determinística (mesmo resultado
// a cada execução) e só mexe em questões com 4 ou 5 alternativas.
//
// Uso: node scripts/balancear-gabaritos.mjs [arquivo.md ...]
//      (sem argumentos, processa todos os arquivos de conteudos/)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LETRAS = 'ABCDE';

function hash(t) {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return h >>> 0;
}

function processar(arquivo) {
  const texto = fs.readFileSync(arquivo, 'utf8');
  // arquivos gerados e provas oficiais (que mantêm a ordem original das alternativas) ficam como estão
  if (texto.includes('Arquivo GERADO') || /^ordem: original$/m.test(texto)) return 0;
  const linhas = texto.split('\n');
  let alteradas = 0;
  let contador = hash(path.basename(arquivo)) % 5;
  for (let i = 0; i < linhas.length; i++) {
    if (!linhas[i].startsWith('### ')) continue;
    // localizar bloco de alternativas e resposta desta questão
    let ini = -1;
    let fim = -1;
    let resp = -1;
    for (let j = i + 1; j < linhas.length && !linhas[j].startsWith('### ') && !linhas[j].startsWith('## '); j++) {
      if (/^- [A-E]\) /.test(linhas[j])) {
        if (ini < 0) ini = j;
        fim = j;
      } else if (/^\*\*Resposta:\*\*/.test(linhas[j])) resp = j;
    }
    if (ini < 0 || resp < 0) continue;
    const alts = linhas.slice(ini, fim + 1).map((l) => l.replace(/^- [A-E]\) /, ''));
    if (alts.length < 4) continue;
    if (alts.some((a) => /anteriores|alternativas|letras? [A-E]\b|itens? [IVX]+ e/i.test(a))) continue;
    const correta = LETRAS.indexOf(linhas[resp].match(/\*\*Resposta:\*\*\s*([A-E])/)[1]);
    const alvo = contador % alts.length;
    contador += 3; // passo co-primo com 5 para espalhar
    if (alvo === correta) continue;
    const nova = [...alts];
    [nova[alvo], nova[correta]] = [nova[correta], nova[alvo]];
    nova.forEach((a, k) => (linhas[ini + k] = `- ${LETRAS[k]}) ${a}`));
    linhas[resp] = linhas[resp].replace(/\*\*Resposta:\*\*\s*[A-E]/, `**Resposta:** ${LETRAS[alvo]}`);
    alteradas++;
  }
  if (alteradas) fs.writeFileSync(arquivo, linhas.join('\n'));
  return alteradas;
}

const alvos = process.argv.slice(2);
const arquivos = alvos.length
  ? alvos
  : fs
      .readdirSync(path.join(RAIZ, 'conteudos'), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .flatMap((d) =>
        fs
          .readdirSync(path.join(RAIZ, 'conteudos', d.name))
          .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
          .map((f) => path.join(RAIZ, 'conteudos', d.name, f)),
      );
let total = 0;
for (const a of arquivos) total += processar(a);
console.log(`Questões reordenadas: ${total}`);
