// Versão para o navegador: baixa o PDF como um arquivo comum.
export type Resultado = { ok: true; onde: string } | { ok: false; motivo: string };

export async function salvarPdf(nome: string, base64: string): Promise<Resultado> {
  try {
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return { ok: true, onde: 'na pasta de downloads do navegador' };
  } catch (e) {
    return { ok: false, motivo: e instanceof Error ? e.message : 'Erro ao baixar.' };
  }
}

export const podeTrocarPasta = false;
