"""Narração com mais emoção usando as vozes grátis do edge-tts.

O serviço grátis não aceita estilos de emoção ("triste", "com raiva"), mas aceita velocidade, tom e
volume. Por isso a narração é feita frase por frase:

- falas de personagens (entre aspas ou depois de travessão) saem num tom um pouco mais alto e rápido;
- frases curtas de impacto ("Era a minha irmã.") saem mais lentas, com pausa antes e depois;
- perguntas sobem o tom, exclamações ficam mais fortes;
- reticências, fim de frase e troca de parágrafo viram pausas de verdade.

No fim, junta tudo num só áudio e devolve o tempo de cada palavra para a legenda.
"""

import array
import asyncio
import os
import re
import ssl
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path

import edge_tts
import edge_tts.communicate

# Na nuvem do Claude o acesso à internet passa por um certificado próprio
if os.environ.get("SSL_CERT_FILE"):
    edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])

# As duas vozes escolhidas pelo dono do canal
VOZES = {
    "thalita": "pt-BR-ThalitaMultilingualNeural",
    "antonio": "pt-BR-AntonioNeural",
    "feminina": "pt-BR-ThalitaMultilingualNeural",
    "masculina": "pt-BR-AntonioNeural",
}

TAXA = 24000  # amostras por segundo do áudio do edge-tts

# Pausas em segundos
PAUSA_FRASE = 0.28
PAUSA_PARAGRAFO = 0.6
PAUSA_RETICENCIAS = 0.6
PAUSA_IMPACTO = 0.35


@dataclass
class Palavra:
    texto: str
    inicio: float
    fim: float


@dataclass
class Trecho:
    texto: str
    velocidade: int  # em %
    tom: int  # em Hz
    volume: int  # em %
    pausa_antes: float
    pausa_depois: float


def dividir(texto: str, velocidade_base: int) -> list[Trecho]:
    """Quebra o texto em frases e escolhe o jeito de falar cada uma."""
    trechos: list[Trecho] = []
    paragrafos = [p.strip() for p in re.split(r"\n\s*\n", texto) if p.strip()]
    for paragrafo in paragrafos:
        paragrafo = re.sub(r"\s+", " ", paragrafo)
        # Separa falas entre aspas do resto do texto
        pedacos = re.split(r"(“[^”]+”|\"[^\"]+\")", paragrafo)
        frases: list[tuple[str, bool]] = []
        for pedaco in pedacos:
            if not pedaco.strip():
                continue
            if pedaco[0] in "“\"":
                frases.append((pedaco.strip("“”\" "), True))
                continue
            for frase in re.findall(r"[^.!?…]+(?:[.!?…]+|$)", pedaco):
                if frase.strip():
                    frases.append((frase.strip(), False))
        for i, (frase, e_fala) in enumerate(frases):
            palavras = len(frase.split())
            trecho = Trecho(frase, velocidade_base, 0, 0, 0.0, PAUSA_FRASE)
            if e_fala:
                trecho.velocidade += 6
                trecho.tom += 5
                trecho.pausa_antes = 0.15
            if palavras <= 4 and frase.endswith((".", "…")) and not e_fala:
                trecho.velocidade -= 12
                trecho.tom -= 3
                trecho.pausa_antes = max(trecho.pausa_antes, PAUSA_IMPACTO)
                trecho.pausa_depois = PAUSA_IMPACTO
            if frase.endswith("?"):
                trecho.tom += 4
            if frase.endswith("!"):
                trecho.velocidade += 6
                trecho.volume += 10
            if frase.endswith(("…", "...")):
                trecho.pausa_depois = PAUSA_RETICENCIAS
            if i == len(frases) - 1:
                trecho.pausa_depois = max(trecho.pausa_depois, PAUSA_PARAGRAFO)
            trechos.append(trecho)
    return trechos


async def _falar(trecho: Trecho, voz: str, arquivo: Path) -> list[Palavra]:
    sinal = lambda n: f"+{n}" if n >= 0 else str(n)
    comunicador = edge_tts.Communicate(
        trecho.texto, VOZES[voz], rate=f"{sinal(trecho.velocidade)}%",
        pitch=f"{sinal(trecho.tom)}Hz", volume=f"{sinal(trecho.volume)}%",
        boundary="WordBoundary")
    palavras = []
    with open(arquivo, "wb") as audio:
        async for pedaco in comunicador.stream():
            if pedaco["type"] == "audio":
                audio.write(pedaco["data"])
            elif pedaco["type"] == "WordBoundary":
                inicio = pedaco["offset"] / 1e7
                palavras.append(Palavra(pedaco["text"], inicio, inicio + pedaco["duration"] / 1e7))
    return palavras


def _decodificar(mp3: Path) -> bytes:
    """Converte o MP3 em áudio cru (16 bits, mono) para juntar com precisão."""
    return subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-i", str(mp3), "-f", "s16le", "-ac", "1",
         "-ar", str(TAXA), "-"], capture_output=True, check=True).stdout


def _aparar(cru: bytes, limiar: int = 600, margem: float = 0.04) -> tuple[bytes, float]:
    """Corta o silêncio que o serviço coloca no começo e no fim de cada frase.

    Devolve o áudio aparado e quantos segundos foram cortados do começo."""
    amostras = array.array("h", cru)
    altos = [i for i in range(0, len(amostras), 48) if abs(amostras[i]) > limiar]
    if not altos:
        return cru, 0.0
    folga = int(margem * TAXA)
    inicio = max(0, altos[0] - folga)
    fim = min(len(amostras), altos[-1] + folga)
    return amostras[inicio:fim].tobytes(), inicio / TAXA


def _silencio(segundos: float) -> bytes:
    return b"\x00\x00" * int(segundos * TAXA)


def _pontuar(palavras: list[Palavra], texto: str) -> None:
    """Devolve a pontuação que a voz não informa (?, !, vírgulas), para a legenda."""
    cursor = 0
    for palavra in palavras:
        posicao = texto.find(palavra.texto, cursor)
        if posicao < 0:
            continue
        cursor = posicao + len(palavra.texto)
        sinal = re.match(r"[?!.,;:…]+", texto[cursor:])
        if sinal:
            palavra.texto += sinal.group(0)


async def narrar(texto: str, voz: str, saida: Path, velocidade_base: int = 6) -> list[Palavra]:
    """Narra o texto todo em `saida` (MP3) e devolve as palavras com os tempos."""
    trechos = dividir(texto, velocidade_base)
    todas: list[Palavra] = []
    audio = bytearray()
    with tempfile.TemporaryDirectory() as temporaria:
        for n, trecho in enumerate(trechos):
            arquivo = Path(temporaria) / f"{n}.mp3"
            for tentativa in range(4):
                try:
                    palavras = await _falar(trecho, voz, arquivo)
                    break
                except Exception:
                    if tentativa == 3:
                        raise
                    await asyncio.sleep(2 + 2 * tentativa)
            if n > 0:
                audio += _silencio(trecho.pausa_antes)
            cru, cortado = _aparar(_decodificar(arquivo))
            inicio = len(audio) / 2 / TAXA - cortado
            _pontuar(palavras, trecho.texto)
            for palavra in palavras:
                todas.append(Palavra(palavra.texto, max(0.0, palavra.inicio + inicio),
                                     palavra.fim + inicio))
            audio += cru
            if n < len(trechos) - 1:
                audio += _silencio(trecho.pausa_depois)
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ac", "1", "-ar", str(TAXA),
         "-i", "-", "-b:a", "128k", str(saida)], input=bytes(audio), check=True)
    return todas
