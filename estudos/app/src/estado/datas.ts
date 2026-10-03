/** Data local no formato AAAA-MM-DD. */
export function hoje(d = new Date()): string {
  const a = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${a}-${m}-${dia}`;
}

export function somarDias(data: string, dias: number): string {
  const [a, m, d] = data.split('-').map(Number);
  return hoje(new Date(a, m - 1, d + dias));
}

/** Diferença em dias (b - a). */
export function diferencaDias(a: string, b: string): number {
  const [a1, m1, d1] = a.split('-').map(Number);
  const [a2, m2, d2] = b.split('-').map(Number);
  const t1 = Date.UTC(a1, m1 - 1, d1);
  const t2 = Date.UTC(a2, m2 - 1, d2);
  return Math.round((t2 - t1) / 86400000);
}

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export function diaDaSemana(data: string): string {
  const [a, m, d] = data.split('-').map(Number);
  return DIAS_SEMANA[new Date(a, m - 1, d).getDay()];
}

export function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Soma meses a uma data (31/01 + 1 mês = último dia de fevereiro). */
export function somarMeses(data: string, meses: number): string {
  const [a, m, d] = data.split('-').map(Number);
  const ultimoDia = new Date(a, m - 1 + meses + 1, 0).getDate();
  return hoje(new Date(a, m - 1 + meses, Math.min(d, ultimoDia)));
}
