#!/usr/bin/env node
// Gera os arquivos .md de questões calculáveis (matemática, física, lógica...)
// a partir dos modelos em scripts/geradores/*.mjs.
// A semente é fixa por tópico, então rodar de novo produz exatamente as mesmas questões.
//
// Uso: node scripts/gerar-questoes.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { RESUMOS } from './geradores/resumos.mjs';
import { criarRng, gerarNivel, gerarNivelUnico, hashTexto, paraMarkdown } from './geradores/util.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PASTA_GERADORES = path.join(RAIZ, 'scripts', 'geradores');
const POR_NIVEL = 20;

const modulos = fs.readdirSync(PASTA_GERADORES).filter((f) => f.endsWith('.mjs') && f !== 'util.mjs' && f !== 'resumos.mjs' && !f.endsWith('-extras.mjs')).sort();
const enunciados = new Map();
let total = 0;
for (const m of modulos) {
  const { default: topicos } = await import(pathToFileURL(path.join(PASTA_GERADORES, m)).href);
  for (const t of topicos) {
    const rng = criarRng(hashTexto(t.disciplina + '/' + t.arquivo));
    const niveis = t.niveis.map((modelos, n) => {
      try {
        if (!t.unico) return gerarNivel(rng, modelos, t.quantidade ?? POR_NIVEL);
        // modelos novos usam outra semente e vão para o fim: as questões antigas não mudam
        const antigos = modelos.filter((m) => !m.novo);
        const novos = modelos.filter((m) => m.novo);
        const base = gerarNivelUnico(rng, antigos, 'fmd'[n]);
        if (!novos.length) return base;
        const rngNovos = criarRng(hashTexto(`${t.disciplina}/${t.arquivo}/novos/${n}`));
        return [...base, ...gerarNivelUnico(rngNovos, novos, 'fmd'[n], antigos.length)];
      } catch (e) {
        throw new Error(`${t.disciplina}/${t.arquivo} nível ${n}: ${e.message}`);
      }
    });
    // nenhum enunciado pode se repetir no tópico, nem entre níveis
    for (const q of niveis.flat()) {
      const chave = `${t.disciplina}/${t.arquivo}|${q.e}`;
      if (enunciados.has(chave)) throw new Error(`${t.disciplina}/${t.arquivo}: enunciado repetido: ${q.e.slice(0, 60)}`);
      enunciados.set(chave, true);
    }
    const destino = path.join(RAIZ, 'conteudos', t.disciplina, t.arquivo + '.md');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, paraMarkdown({ ...t, resumo: RESUMOS[`${t.disciplina}/${t.arquivo}`] }, niveis));
    const n = niveis.reduce((s, q) => s + q.length, 0);
    total += n;
    console.log(`${String(n).padStart(4)}  ${path.relative(RAIZ, destino)}`);
  }
}
console.log(`\nTotal gerado: ${total} questões`);
