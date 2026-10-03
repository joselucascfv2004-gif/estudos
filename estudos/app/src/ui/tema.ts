import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useProgresso } from '../estado/ProgressoContext';

const paletaClara = {
  escuro: false,
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
  vermelhoBorda: '#FFB2B2',
  azul: '#1CB0F6',
  azulEscuro: '#1899D6',
  azulClaro: '#DDF4FF',
  azulBorda: '#A8DCF7',
  laranja: '#FF9600',
  amarelo: '#FFC800',
  amareloClaro: '#FFF5D1',
  roxo: '#CE82FF',
  roxoClaro: '#F4E6FF',
  roxoBorda: '#D9B8FF',
  cinza: '#AFAFAF',
  cinzaClaro: '#E5E5E5',
  veu: 'rgba(0,0,0,0.45)',
};

export type Paleta = typeof paletaClara;

const paletaEscura: Paleta = {
  escuro: true,
  fundo: '#131F24',
  fundoSuave: '#1B2A31',
  texto: '#F1F7FB',
  textoSuave: '#9DB2BD',
  borda: '#37464F',
  verde: '#58CC02',
  verdeEscuro: '#93E043',
  verdeClaro: '#1F3814',
  vermelho: '#FF4B4B',
  vermelhoEscuro: '#FF8A8A',
  vermelhoClaro: '#3B1E21',
  vermelhoBorda: '#6B2A2E',
  azul: '#1CB0F6',
  azulEscuro: '#5CCBFA',
  azulClaro: '#123142',
  azulBorda: '#1D5470',
  laranja: '#FF9600',
  amarelo: '#FFC800',
  amareloClaro: '#3A3214',
  roxo: '#CE82FF',
  roxoClaro: '#2C1F3D',
  roxoBorda: '#5B3F80',
  cinza: '#6B7F88',
  cinzaClaro: '#37464F',
  veu: 'rgba(0,0,0,0.65)',
};

/**
 * Cores fixas (iguais nos dois temas). Use `useCores()` dentro dos componentes para as cores
 * que mudam com o modo escuro.
 */
export const cores = paletaClara;

/** Paleta do tema escolhido pelo aluno (claro ou escuro). */
export function useCores(): Paleta {
  const { p } = useProgresso();
  return p.tema === 'escuro' ? paletaEscura : paletaClara;
}

/** Cria um hook de estilos que se refaz quando o tema muda. */
export function criarEstilos<T extends StyleSheet.NamedStyles<T>>(fn: (c: Paleta) => T) {
  return function useEstilos(): T {
    const c = useCores();
    return useMemo(() => StyleSheet.create(fn(c)), [c]);
  };
}

export const coresNivel = [
  { cor: '#58CC02', escura: '#58A700', clara: '#D7FFB8', icone: 'signal-cellular-1' },
  { cor: '#FFB100', escura: '#E59A00', clara: '#FFF1C7', icone: 'signal-cellular-2' },
  { cor: '#FF4B4B', escura: '#EA2B2B', clara: '#FFDFE0', icone: 'signal-cellular-3' },
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

/** Mistura a cor com o fundo (branco no tema claro, escuro no tema escuro). */
export function clarear(hex: string, alfa = 0.15, base = '#FFFFFF') {
  const lerHex = (x: string) => {
    const n = parseInt(x.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r, g, b] = lerHex(hex);
  const [br, bg, bb] = lerHex(base);
  const mix = (c: number, f: number) => Math.round(c * alfa + f * (1 - alfa));
  return `#${((mix(r, br) << 16) | (mix(g, bg) << 8) | mix(b, bb)).toString(16).padStart(6, '0')}`;
}
