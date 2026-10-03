// Cópia de segurança do progresso: um texto que o aluno guarda (e-mail, anotações, WhatsApp)
// e cola de volta para restaurar em outro celular. Não precisa de servidor nem de conta.
import LZString from 'lz-string';

import { diferencaDias, somarDias } from './datas';
import { EstatQuestao, Progresso, normalizar } from './progresso';

const PREFIXO = 'ESTUDOS-BACKUP-2:';
const PREFIXO_ANTIGO = 'ESTUDOS-BACKUP-1:';
const BASE = '2024-01-01';

/**
 * As estatísticas das questões são a maior parte do progresso. Para a cópia caber numa mensagem,
 * elas viram uma linha por assunto: "f12,acertos,erros,dia,caixa,próxima;..." com as datas em dias.
 */
function compactar(questoes: Record<string, EstatQuestao>): Record<string, string> {
  const porTopico: Record<string, string[]> = {};
  for (const [id, e] of Object.entries(questoes)) {
    const [topico, num] = id.split('#');
    const u = diferencaDias(BASE, e.ultima);
    const prox = e.proxima ? String(diferencaDias(e.ultima, e.proxima)) : '';
    (porTopico[topico] ??= []).push([num, e.acertos, e.erros, u, e.caixa ?? '', prox].join(','));
  }
  return Object.fromEntries(Object.entries(porTopico).map(([t, l]) => [t, l.join(';')]));
}

function descompactar(c: Record<string, string>): Record<string, EstatQuestao> {
  const questoes: Record<string, EstatQuestao> = {};
  for (const [topico, linha] of Object.entries(c)) {
    for (const item of linha.split(';')) {
      const [num, a, e, u, caixa, prox] = item.split(',');
      const ultima = somarDias(BASE, Number(u));
      const q: EstatQuestao = { acertos: Number(a), erros: Number(e), ultima };
      if (caixa !== '') q.caixa = Number(caixa);
      if (prox) q.proxima = somarDias(ultima, Number(prox));
      questoes[`${topico}#${num}`] = q;
    }
  }
  return questoes;
}

export function exportarBackup(p: Progresso): string {
  const { questoes, ...resto } = p;
  return PREFIXO + LZString.compressToEncodedURIComponent(JSON.stringify({ ...resto, q: compactar(questoes) }));
}

/** Lê o texto colado pelo aluno. Devolve o progresso ou null se o texto não for uma cópia válida. */
export function importarBackup(texto: string): Progresso | null {
  const novo = texto.includes(PREFIXO);
  const prefixo = novo ? PREFIXO : PREFIXO_ANTIGO;
  const i = texto.indexOf(prefixo);
  if (i < 0) return null;
  // aceita o texto com a mensagem em volta (como chega pelo WhatsApp), só pega o código
  const codigo = texto.slice(i + prefixo.length).trim().split(/\s/)[0];
  try {
    const json = LZString.decompressFromEncodedURIComponent(codigo);
    if (!json) return null;
    const dados = JSON.parse(json) as Partial<Progresso> & { q?: Record<string, string> };
    if (typeof dados !== 'object' || !dados || typeof dados.xpTotal !== 'number') return null;
    if (dados.q) {
      dados.questoes = descompactar(dados.q);
      delete dados.q;
    }
    if (typeof dados.questoes !== 'object') return null;
    return normalizar(dados);
  } catch {
    return null;
  }
}

/** Resumo do que tem na cópia, para o aluno confirmar antes de restaurar. */
export function resumoBackup(p: Progresso): string {
  const respostas = Object.values(p.questoes).reduce((s, q) => s + q.acertos + q.erros, 0);
  return `${p.nome ? `${p.nome}: ` : ''}${p.xpTotal} XP, ofensiva de ${p.ofensiva.atual} dia${p.ofensiva.atual === 1 ? '' : 's'}, ${respostas} resposta${respostas === 1 ? '' : 's'} e ${p.totalLicoes} ${p.totalLicoes === 1 ? 'lição' : 'lições'}`;
}
