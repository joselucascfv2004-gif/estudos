// Marcas de **negrito** e *itálico* dentro de um texto (sem dependência de telas, para poder testar).

export type Trecho = { t: string; negrito?: boolean; italico?: boolean };

const LETRA = 'A-Za-zÀ-ÖØ-öø-ÿ0-9';
const NEGRITO = /(\*\*[^*\n]+\*\*)/g;
/**
 * *itálico* só quando o asterisco abre colado numa palavra e não está grudado em outra letra:
 * assim fórmulas (=A1*B1, X * Y, C*) e chamadas de nota (bulimia*, (*)) continuam como estão.
 */
const ITALICO = new RegExp(`(^|[^${LETRA}*])\\*([${LETRA}"“'](?:[^*\\n]*[^\\s*])?)\\*(?![${LETRA}*])`, 'g');

function italicos(texto: string): Trecho[] {
  const saida: Trecho[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(ITALICO)) {
    const antes = texto.slice(ultimo, m.index) + m[1];
    if (antes) saida.push({ t: antes });
    saida.push({ t: m[2], italico: true });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) saida.push({ t: texto.slice(ultimo) });
  return saida;
}

export function trechos(texto: string): Trecho[] {
  return texto
    .split(NEGRITO)
    .filter(Boolean)
    .flatMap((parte) => (parte.length > 4 && parte.startsWith('**') && parte.endsWith('**') ? [{ t: parte.slice(2, -2), negrito: true }] : italicos(parte)));
}

/** O texto sem as marcas (para jogos e lugares que não mostram formatação). */
export const semMarcas = (texto: string) =>
  trechos(texto)
    .map((p) => p.t)
    .join('');
