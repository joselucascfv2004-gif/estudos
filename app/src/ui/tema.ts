export const cores = {
  fundo: '#FFFFFF',
  fundoSuave: '#F7F7F7',
  texto: '#3C3C3C',
  textoSuave: '#777777',
  borda: '#E5E5E5',
  verde: '#58CC02',
  verdeEscuro: '#58A700',
  verdeClaro: '#D7FFB8',
  vermelho: '#FF4B4B',
  vermelhoEscuro: '#EA2B2B',
  vermelhoClaro: '#FFDFE0',
  azul: '#1CB0F6',
  azulEscuro: '#1899D6',
  azulClaro: '#DDF4FF',
  laranja: '#FF9600',
  amarelo: '#FFC800',
  roxo: '#CE82FF',
  cinza: '#AFAFAF',
  cinzaClaro: '#E5E5E5',
};

export const coresNivel = [
  { cor: '#58CC02', escura: '#58A700', clara: '#D7FFB8', emoji: '🟢' },
  { cor: '#FFB100', escura: '#E59A00', clara: '#FFF1C7', emoji: '🟡' },
  { cor: '#FF4B4B', escura: '#EA2B2B', clara: '#FFDFE0', emoji: '🔴' },
];

/** Escurece uma cor hex (para a "borda 3D" dos botões). */
export function escurecer(hex: string, fator = 0.82) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  const r = Math.round(((n >> 16) & 255) * fator);
  const g = Math.round(((n >> 8) & 255) * fator);
  const b = Math.round((n & 255) * fator);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function clarear(hex: string, alfa = 0.15) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c * alfa + 255 * (1 - alfa));
  return `#${((mix(r) << 16) | (mix(g) << 8) | mix(b)).toString(16).padStart(6, '0')}`;
}
