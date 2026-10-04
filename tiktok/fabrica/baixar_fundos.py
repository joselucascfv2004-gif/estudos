"""Baixa os vídeos de fundo listados em fundos/fontes.json e deixa todos no formato do TikTok.

Cada vídeo vira um arquivo vertical 1080x1920, 30 quadros por segundo e sem som, em
saida/fundos/<categoria>/<número>.mp4. Vídeos já baixados são pulados.

Uso (dentro da pasta tiktok/):
    python3 fabrica/baixar_fundos.py              # todas as categorias
    python3 fabrica/baixar_fundos.py slime tinta  # só algumas
"""

import json
import subprocess
import sys
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FONTES = RAIZ / "fundos" / "fontes.json"
DESTINO = RAIZ / "saida" / "fundos"
NAVEGADOR = "Mozilla/5.0 (X11; Linux x86_64)"


def baixar_pexels(numero: int, arquivo: Path) -> None:
    pedido = urllib.request.Request(
        f"https://www.pexels.com/download/video/{numero}/",
        headers={"User-Agent": NAVEGADOR},
    )
    with urllib.request.urlopen(pedido, timeout=120) as resposta, open(arquivo, "wb") as saida:
        while bloco := resposta.read(1 << 20):
            saida.write(bloco)


def padronizar(original: Path, final: Path) -> None:
    """Recorta o centro para 9:16, reduz para 1080x1920 e tira o som."""
    filtro = (
        "scale=1080:1920:force_original_aspect_ratio=increase,"
        "crop=1080:1920,fps=30,format=yuv420p"
    )
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(original), "-vf", filtro, "-an",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", str(final)],
        check=True,
    )


def main() -> None:
    fontes = json.loads(FONTES.read_text(encoding="utf-8"))
    categorias = sys.argv[1:] or [c for c in fontes if not c.startswith("_")]
    for categoria in categorias:
        pasta = DESTINO / categoria
        pasta.mkdir(parents=True, exist_ok=True)
        for numero in fontes[categoria].get("pexels", []):
            final = pasta / f"{numero}.mp4"
            if final.exists():
                continue
            bruto = pasta / f"{numero}.bruto.mp4"
            parcial = pasta / f"{numero}.parcial.mp4"
            print(f"{categoria}: baixando Pexels {numero}...", flush=True)
            try:
                baixar_pexels(numero, bruto)
                padronizar(bruto, parcial)
                parcial.rename(final)  # só vira arquivo final se a conversão terminou
            except Exception as erro:  # um vídeo com problema não para os outros
                print(f"  falhou: {erro}")
            finally:
                bruto.unlink(missing_ok=True)
                parcial.unlink(missing_ok=True)
    print("Pronto.")


if __name__ == "__main__":
    main()
