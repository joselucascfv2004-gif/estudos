"""Qualidade de imagem e capa, comuns às histórias e aos quizzes.

- CODIFICACAO_MAXIMA: parâmetros do FFmpeg para a melhor qualidade (o vídeo é montado assim).
- caber_no_limite: se o arquivo passar do limite de envio pelo chat (30 MB), recomprime em dois
  passos, que é o jeito de ter a melhor imagem possível para aquele tamanho.
- salvar_capa: salva um quadro do vídeo como capa (PNG 1080x1920) para escolher no TikTok.
"""

import subprocess
import tempfile
from pathlib import Path

CODIFICACAO_MAXIMA = ["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high",
                      "-pix_fmt", "yuv420p"]
LIMITE_ENVIO = 29 * 1024 * 1024  # bytes; o chat recusa arquivos acima de 30 MB
AUDIO_KBPS = 160


def duracao(arquivo: Path) -> float:
    saida = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                            "-of", "csv=p=0", str(arquivo)], capture_output=True, text=True,
                           check=True)
    return float(saida.stdout.strip())


def caber_no_limite(arquivo: Path, limite: int = LIMITE_ENVIO) -> None:
    if arquivo.stat().st_size <= limite:
        return
    segundos = duracao(arquivo)
    kbps_video = int(limite * 8 * 0.96 / segundos / 1000) - AUDIO_KBPS
    with tempfile.TemporaryDirectory() as temporaria:
        log = str(Path(temporaria) / "passo")
        saida = Path(temporaria) / "final.mp4"
        base = ["ffmpeg", "-y", "-loglevel", "error", "-i", str(arquivo), "-c:v", "libx264",
                "-preset", "slow", "-b:v", f"{kbps_video}k", "-pix_fmt", "yuv420p",
                "-passlogfile", log]
        subprocess.run(base + ["-pass", "1", "-an", "-f", "null", "/dev/null"], check=True)
        subprocess.run(base + ["-pass", "2", "-c:a", "aac", "-b:a", f"{AUDIO_KBPS}k",
                               "-movflags", "+faststart", str(saida)], check=True)
        saida.replace(arquivo)


def salvar_capa(video: Path, capa: Path, momento: float = 0.0) -> None:
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{momento:.2f}", "-i", str(video),
                    "-frames:v", "1", str(capa)], check=True)
