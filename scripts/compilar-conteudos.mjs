#!/usr/bin/env node
// Lê todas as questões em conteudos/<disciplina>/<topico>.md, valida o formato
// e gera app/src/data/banco.json (usado pelo aplicativo) e conteudos/README.md (índice).
//
// Uso: node scripts/compilar-conteudos.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PASTA_CONTEUDOS = path.join(RAIZ, 'conteudos');
const SAIDA_BANCO = path.join(RAIZ, 'app', 'src', 'data', 'banco.json');
const SAIDA_INDICE = path.join(PASTA_CONTEUDOS, 'README.md');

const NIVEIS = { 'fácil': 0, 'facil': 0, 'médio': 1, 'medio': 1, 'difícil': 2, 'dificil': 2 };
const NOMES_NIVEL = ['Fácil', 'Médio', 'Difícil'];
const PROVAS_VALIDAS = ['ENEM', 'Militares', 'Concursos'];

const ARQ_INCIDENCIA = path.join(PASTA_CONTEUDOS, '_incidencia.md');

const erros = [];
const erro = (arquivo, linha, msg) => erros.push(`${path.relative(RAIZ, arquivo)}:${linha}: ${msg}`);

function lerFrontmatter(texto, arquivo) {
  const linhas = texto.split(/\r?\n/);
  if (linhas[0].trim() !== '---') {
    erro(arquivo, 1, 'arquivo deve começar com frontmatter (---)');
    return { meta: {}, corpo: linhas, inicio: 0 };
  }
  const meta = {};
  let i = 1;
  for (; i < linhas.length && linhas[i].trim() !== '---'; i++) {
    const m = linhas[i].match(/^([\wçãéí]+):\s*(.*)$/i);
    if (m) meta[m[1].toLowerCase()] = m[2].trim();
  }
  return { meta, corpo: linhas.slice(i + 1), inicio: i + 1 };
}

/**
 * Aula completa (teoria explicada com exemplos) do tópico, se existir:
 * conteudos/<disciplina>/aulas/<mesmo nome do arquivo do tópico>.md, em Markdown simples.
 */
function lerAula(dir, arquivoTopico) {
  const caminho = path.join(dir, 'aulas', arquivoTopico);
  if (!fs.existsSync(caminho)) return {};
  const aula = fs.readFileSync(caminho, 'utf8').replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim();
  return aula ? { aula } : {};
}

function lerTopico(arquivo) {
  const texto = fs.readFileSync(arquivo, 'utf8');
  const { meta, corpo, inicio } = lerFrontmatter(texto, arquivo);
  if (!meta.titulo) erro(arquivo, 1, 'frontmatter sem "titulo"');
  const provas = (meta.provas || '').split(',').map((s) => s.trim()).filter(Boolean);
  for (const p of provas) if (!PROVAS_VALIDAS.includes(p)) erro(arquivo, 1, `prova desconhecida "${p}" (use ${PROVAS_VALIDAS.join(', ')})`);
  if (!provas.length) erro(arquivo, 1, 'frontmatter sem "provas"');

  const questoes = [];
  const resumo = [];
  let noResumo = false;
  let nivel = null;
  let atual = null;
  let campo = null; // 'enunciado' | 'explicacao'

  const fechar = () => {
    if (!atual) return;
    const q = atual;
    q.enunciado = q.enunciado.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    q.explicacao = q.explicacao.join(' ').replace(/\s+/g, ' ').trim();
    if (!q.enunciado) erro(arquivo, q.linha, 'questão sem enunciado');
    if (q.alternativas.length < 2) erro(arquivo, q.linha, 'questão com menos de 2 alternativas');
    if (q.correta == null) erro(arquivo, q.linha, 'questão sem **Resposta:**');
    else if (q.correta >= q.alternativas.length) erro(arquivo, q.linha, 'resposta fora das alternativas');
    if (!q.explicacao) erro(arquivo, q.linha, 'questão sem **Explicação:**');
    const repetidas = new Set(q.alternativas.map((a) => a.trim()));
    if (repetidas.size !== q.alternativas.length) erro(arquivo, q.linha, 'alternativas repetidas');
    questoes.push(q);
    atual = null;
  };

  corpo.forEach((bruta, idx) => {
    const n = inicio + idx + 1;
    const linha = bruta.trimEnd();
    let m;
    if ((m = linha.match(/^##\s+(.+?)\s*$/)) && !linha.startsWith('###')) {
      fechar();
      const chave = m[1].toLowerCase();
      noResumo = chave === 'resumo';
      if (noResumo) {
        nivel = null;
        return;
      }
      if (!(chave in NIVEIS)) erro(arquivo, n, `nível desconhecido "${m[1]}" (use Fácil, Médio ou Difícil)`);
      nivel = NIVEIS[chave] ?? null;
      return;
    }
    if (noResumo) {
      resumo.push(linha);
      return;
    }
    if (linha.startsWith('### ')) {
      fechar();
      if (nivel == null) erro(arquivo, n, 'questão fora de uma seção ## Fácil/Médio/Difícil');
      atual = { linha: n, nivel, enunciado: [], alternativas: [], correta: null, explicacao: [], fonte: meta.fonte || '' };
      campo = 'enunciado';
      return;
    }
    if (!atual) return;
    if ((m = linha.match(/^<!--\s*modelo:\s*(\S+)\s*-->$/))) {
      atual.modelo = m[1];
      return;
    }
    if ((m = linha.match(/^-\s+([A-E])\)\s+(.+)$/))) {
      const esperado = String.fromCharCode(65 + atual.alternativas.length);
      if (m[1] !== esperado) erro(arquivo, n, `alternativa ${m[1]} fora de ordem (esperado ${esperado})`);
      atual.alternativas.push(m[2].trim());
      campo = null;
      return;
    }
    if ((m = linha.match(/^\*\*Resposta:\*\*\s*([A-E])\b/))) {
      atual.correta = m[1].charCodeAt(0) - 65;
      campo = null;
      return;
    }
    if ((m = linha.match(/^\*\*Explica[cç][aã]o:\*\*\s*(.*)$/))) {
      atual.explicacao.push(m[1]);
      campo = 'explicacao';
      return;
    }
    if ((m = linha.match(/^\*\*Fonte:\*\*\s*(.*)$/))) {
      atual.fonte = m[1].trim();
      campo = null;
      return;
    }
    // questão oficial que também aparece num assunto do conteúdo (ex.: matematica/funcoes-afim-e-quadratica)
    if ((m = linha.match(/^\*\*Assunto:\*\*\s*(.*)$/))) {
      atual.assuntos = m[1].split(/[,;]/).map((x) => x.trim()).filter(Boolean);
      campo = null;
      return;
    }
    if (campo === 'enunciado') atual.enunciado.push(linha.replace(/^>\s?/, ''));
    else if (campo === 'explicacao' && linha.trim()) atual.explicacao.push(linha.trim());
    else if (linha.trim() && atual.alternativas.length && atual.correta == null) {
      erro(arquivo, n, `linha inesperada entre alternativas: "${linha.slice(0, 40)}"`);
    }
  });
  fechar();

  const porNivel = [0, 0, 0];
  questoes.forEach((q) => porNivel[q.nivel]++);
  porNivel.forEach((c, i) => {
    if (c === 0) erro(arquivo, 1, `nenhuma questão de nível ${NOMES_NIVEL[i]}`);
  });
  return { meta, provas, questoes, porNivel, resumo: resumo.join('\n').replace(/\n{3,}/g, '\n\n').trim() };
}

/** Lê conteudos/_incidencia.md: linhas "- disciplina/assunto: nota" (1 a 5). */
function lerIncidencia() {
  const mapa = new Map();
  if (!fs.existsSync(ARQ_INCIDENCIA)) return mapa;
  fs.readFileSync(ARQ_INCIDENCIA, 'utf8')
    .split(/\r?\n/)
    .forEach((linha, i) => {
      const m = linha.match(/^-\s+([\w-]+\/[\w-]+):\s*(\d)\s*$/);
      if (!m) return;
      const nota = Number(m[2]);
      if (nota < 1 || nota > 5) erro(ARQ_INCIDENCIA, i + 1, `nota ${nota} fora de 1 a 5`);
      mapa.set(m[1], nota);
    });
  return mapa;
}

function main() {
  const incidencia = lerIncidencia();
  const disciplinas = [];
  const questoes = {};
  const vinculos = [];
  let total = 0;

  const pastas = fs.readdirSync(PASTA_CONTEUDOS, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const pasta of pastas) {
    const dir = path.join(PASTA_CONTEUDOS, pasta.name);
    const arqInfo = path.join(dir, '_disciplina.md');
    if (!fs.existsSync(arqInfo)) {
      erro(dir, 0, 'pasta sem _disciplina.md');
      continue;
    }
    const { meta: info } = lerFrontmatter(fs.readFileSync(arqInfo, 'utf8'), arqInfo);
    for (const k of ['nome', 'area', 'icone', 'cor', 'ordem']) if (!info[k]) erro(arqInfo, 1, `falta "${k}"`);
    const disciplina = {
      id: pasta.name,
      nome: info.nome,
      area: info.area,
      icone: info.icone,
      cor: info.cor,
      ordem: Number(info.ordem) || 99,
      topicos: [],
    };
    const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md').sort();
    for (const f of arquivos) {
      const arquivo = path.join(dir, f);
      const { meta, provas, questoes: qs, porNivel, resumo } = lerTopico(arquivo);
      const slug = f.replace(/\.md$/, '').replace(/^\d+-/, '');
      const id = `${pasta.name}/${slug}`;
      disciplina.topicos.push({
        id,
        titulo: meta.titulo,
        descricao: meta.descricao || '',
        provas,
        arquivo: path.relative(RAIZ, arquivo),
        porNivel,
        ...(resumo ? { resumo } : {}),
        ...lerAula(dir, f),
        ...(meta.ordem === 'original' ? { ordemOriginal: true } : {}),
        ...(incidencia.has(id) ? { incidencia: incidencia.get(id) } : {}),
      });
      const contador = [0, 0, 0];
      questoes[id] = qs.map((q) => {
        const n = ++contador[q.nivel];
        const item = { id: `${id}#${'fmd'[q.nivel]}${n}`, n: q.nivel, e: q.enunciado, a: q.alternativas, c: q.correta, x: q.explicacao };
        if (q.fonte) item.f = q.fonte;
        if (q.modelo) item.m = q.modelo;
        for (const a of q.assuntos || []) vinculos.push({ assunto: a, id: item.id, arquivo, linha: q.linha });
        return item;
      });
      total += qs.length;
    }
    if (disciplina.topicos.length) disciplinas.push(disciplina);
  }
  disciplinas.sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome));
  const ids = new Set(disciplinas.flatMap((d) => d.topicos.map((t) => t.id)));
  for (const id of incidencia.keys()) if (!ids.has(id)) erro(ARQ_INCIDENCIA, 0, `assunto "${id}" não existe`);

  // questões oficiais classificadas por assunto: o tópico guarda só os ids (sem duplicar o texto)
  const topicoPorId = new Map(disciplinas.flatMap((d) => d.topicos.map((t) => [t.id, t])));
  for (const v of vinculos) {
    const t = topicoPorId.get(v.assunto);
    if (!t) {
      erro(v.arquivo, v.linha, `assunto "${v.assunto}" não existe`);
      continue;
    }
    (t.oficiais ||= []).push(v.id);
  }

  if (erros.length) {
    console.error(`\n${erros.length} problema(s) encontrado(s):\n`);
    for (const e of erros.slice(0, 200)) console.error('  ' + e);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(SAIDA_BANCO), { recursive: true });
  fs.writeFileSync(SAIDA_BANCO, JSON.stringify({ versao: 1, disciplinas, questoes }));

  // Índice legível no GitHub
  const linhas = [
    '# Conteúdos',
    '',
    'Índice gerado automaticamente por `scripts/compilar-conteudos.mjs` — não edite à mão.',
    '',
    `**${total} questões** em **${disciplinas.reduce((s, d) => s + d.topicos.length, 0)} tópicos**.`,
    '',
    'Legenda das provas: **ENEM** · **Militares** (ESA, EsPCEx, EEAR, AFA, EN, Colégio Naval) · **Concursos** (Banco do Brasil, BNB, Caixa, IBGE e outros).',
    '',
  ];
  for (const d of disciplinas) {
    const soma = d.topicos.reduce((s, t) => s + t.porNivel.reduce((a, b) => a + b, 0), 0);
    linhas.push(`## ${d.nome} — ${soma} questões`, '', `*${d.area}*`, '');
    linhas.push('| Tópico | Provas | Fácil | Médio | Difícil |', '|---|---|---:|---:|---:|');
    for (const t of d.topicos) {
      linhas.push(`| [${t.titulo}](${path.relative('conteudos', t.arquivo)}) | ${t.provas.join(', ')} | ${t.porNivel.join(' | ')} |`);
    }
    linhas.push('');
  }
  fs.writeFileSync(SAIDA_INDICE, linhas.join('\n'));

  console.log(`OK: ${total} questões, ${disciplinas.length} disciplinas -> ${path.relative(RAIZ, SAIDA_BANCO)}`);
}

main();
