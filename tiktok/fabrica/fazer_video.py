"""Transforma um roteiro de roteiros/ em um vídeo pronto para o TikTok.

Cada roteiro é uma história completa (2 a 3 minutos). A fábrica narra o texto com voz de IA
(frase por frase, com pausas e mudança de tom, ver voz.py), cria a legenda palavra por palavra,
monta o fundo com trechos de vídeos da categoria escolhida e junta tudo num MP4 vertical 1080x1920.
Na tela aparece só a legenda.

Saída em saida/videos/<roteiro>/: video.mp4, postagem.txt (texto para colar no TikTok) e info.json.
Roteiros que já têm vídeo são pulados (use --refazer para gerar de novo).

Uso (dentro da pasta tiktok/):
    python3 fabrica/fazer_video.py                      # todos os roteiros que ainda não têm vídeo
    python3 fabrica/fazer_video.py roteiros/001-*.md    # só os roteiros indicados
    python3 fabrica/fazer_video.py --refazer roteiros/001-*.md
"""

import asyncio
import json
import random
import re
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

import voz
from voz import Palavra

RAIZ = Path(__file__).resolve().parent.parent
PASTA_ROTEIROS = RAIZ / "roteiros"
PASTA_FUNDOS = RAIZ / "saida" / "fundos"
PASTA_VIDEOS = RAIZ / "saida" / "videos"
PASTA_FONTES = Path(__file__).resolve().parent / "fontes"

LARGURA, ALTURA, QUADROS = 1080, 1920, 30
DURACAO_MINIMA, DURACAO_MAXIMA = 120, 180  # histórias de 2 a 3 minutos

# Fonte da legenda: nome -> (tamanho, espaçamento). Os arquivos ficam em fabrica/fontes/.
FONTES = {
    "Montserrat Black": (100, 0),
    "Poppins ExtraBold": (118, 0),
    "Luckiest Guy": (110, 2),
    "Bangers": (150, 3),
}
FONTE_LEGENDA = "Montserrat Black"

HASHTAGS = {
    "traicao": "#traicao #relacionamento #namoro #casamento",
    "relacionamento": "#relacionamento #namoro #casamento #sogra",
    "familia": "#familia #brigadefamilia #heranca #irmaos",
    "trabalho": "#trabalho #chefe #emprego #clt",
}
HASHTAGS_FIXAS = "#historias #relatos #storytime #ficcao"

# Cores no formato das legendas (&HAABBGGRR)
BRANCO, PRETO, AMARELO = "&H00FFFFFF", "&H00000000", "&H0000E5FF"


@dataclass
class Roteiro:
    arquivo: Path
    titulo: str
    tema: str
    voz: str
    fundo: str
    texto: str


def ler_roteiro(arquivo: Path) -> Roteiro:
    titulo, campos, corpo = "", {}, []
    for linha in arquivo.read_text(encoding="utf-8").splitlines():
        cabecalho = re.match(r"^(\w+):\s*(.+?)\s*$", linha)
        if linha.startswith("# ") and not titulo:
            titulo = linha[2:].strip()
        elif cabecalho and not corpo:
            campos[cabecalho.group(1)] = cabecalho.group(2)
        elif linha.strip() or corpo:
            corpo.append(linha)
    texto = "\n".join(corpo).strip()
    if not titulo or not texto:
        raise ValueError(f"{arquivo.name}: falta o título (# ...) ou o texto da história")
    return Roteiro(arquivo, titulo, campos.get("tema", ""), campos.get("voz", "feminina"),
                   campos.get("fundo", "slime"), texto)


def duracao(arquivo: Path) -> float:
    saida = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                            "-of", "csv=p=0", str(arquivo)], capture_output=True, text=True,
                           check=True)
    return float(saida.stdout.strip())


def tempo_ass(segundos: float) -> str:
    c = round(segundos * 100)
    return f"{c // 360000}:{c // 6000 % 60:02d}:{c // 100 % 60:02d}.{c % 100:02d}"


def agrupar(palavras: list[Palavra]) -> list[list[Palavra]]:
    """Junta até 3 palavras por tela, quebrando no fim das frases e nas pausas."""
    grupos, atual = [], []
    for n, palavra in enumerate(palavras):
        atual.append(palavra)
        letras = sum(len(p.texto) for p in atual)
        pausa = n + 1 < len(palavras) and palavras[n + 1].inicio - palavra.fim > 0.3
        if len(atual) == 3 or letras >= 14 or palavra.texto[-1] in ".?!,;:…" or pausa:
            grupos.append(atual)
            atual = []
    if atual:
        grupos.append(atual)
    return grupos


def limpar(texto: str) -> str:
    return re.sub(r"[.,;:…]+$", "", texto).upper()


def criar_legendas(palavras: list[Palavra], total: float, arquivo: Path) -> None:
    eventos = []
    grupos = agrupar(palavras)
    for g, grupo in enumerate(grupos):
        proximo = grupos[g + 1][0].inicio if g + 1 < len(grupos) else total
        fim_grupo = min(proximo, grupo[-1].fim + 0.35)
        for i, palavra in enumerate(grupo):
            inicio = palavra.inicio
            fim = grupo[i + 1].inicio if i + 1 < len(grupo) else fim_grupo
            if fim <= inicio:
                continue
            texto = " ".join(
                (f"{{\\c{AMARELO}}}{limpar(p.texto)}{{\\c{BRANCO}}}" if p is palavra
                 else limpar(p.texto)) for p in grupo)
            efeito = "{\\fscx85\\fscy85\\t(0,90,\\fscx100\\fscy100)}" if i == 0 else ""
            eventos.append(f"Dialogue: 1,{tempo_ass(inicio)},{tempo_ass(fim)},Legenda,,0,0,0,,"
                           f"{efeito}{texto}")

    tamanho, espaco = FONTES[FONTE_LEGENDA]
    cabecalho = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {LARGURA}
PlayResY: {ALTURA}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Legenda,{FONTE_LEGENDA},{tamanho},{BRANCO},{BRANCO},{PRETO},&H80000000,0,0,0,0,100,100,{espaco},0,1,9,4,5,120,120,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    arquivo.write_text(cabecalho + "\n".join(eventos) + "\n", encoding="utf-8")


def escolher_trechos(fundo: str, total: float, semente: str) -> list[tuple[Path, float, float]]:
    """Sorteia trechos de 7 a 13 segundos dos vídeos da categoria até cobrir o vídeo todo."""
    clipes = sorted(c for c in (PASTA_FUNDOS / fundo).glob("*.mp4")
                    if not c.name.endswith((".bruto.mp4", ".parcial.mp4")))
    if not clipes:
        raise FileNotFoundError(f"Sem vídeos de fundo em {PASTA_FUNDOS / fundo}. "
                                "Rode antes: python3 fabrica/baixar_fundos.py")
    sorteio = random.Random(semente)
    duracoes = {c: duracao(c) for c in clipes}
    trechos, coberto, fila = [], 0.0, []
    while coberto < total:
        if not fila:
            fila = clipes[:]
            sorteio.shuffle(fila)
        clipe = fila.pop()
        tamanho = min(duracoes[clipe], sorteio.uniform(7, 13), total - coberto + 0.5)
        inicio = sorteio.uniform(0, max(0.0, duracoes[clipe] - tamanho))
        trechos.append((clipe, inicio, tamanho))
        coberto += tamanho
    return trechos


def montar_video(audio: Path, legendas: Path, trechos, total: float, saida: Path) -> None:
    entradas = []
    for clipe, inicio, tamanho in trechos:
        entradas += ["-ss", f"{inicio:.2f}", "-t", f"{tamanho:.2f}", "-i", str(clipe)]
    n = len(trechos)
    cortes = "".join(f"[{i}:v]setpts=PTS-STARTPTS,fps={QUADROS},setsar=1[v{i}];" for i in range(n))
    juncao = "".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[fundo];"
    legenda = f"[fundo]ass='{legendas}':fontsdir='{PASTA_FONTES}',format=yuv420p[video]"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", *entradas, "-i", str(audio),
         "-filter_complex", cortes + juncao + legenda + f";[{n}:a]apad[audio]",
         "-map", "[video]", "-map", "[audio]", "-t", f"{total:.2f}",
         "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-maxrate", "1100k",
         "-bufsize", "2200k", "-r", str(QUADROS),  # menos de 30 MB num vídeo de 3 minutos
         "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-movflags", "+faststart", str(saida)],
        check=True,
    )


def texto_postagem(roteiro: Roteiro, total: float) -> str:
    tags = f"{HASHTAGS_FIXAS} {HASHTAGS.get(roteiro.tema, '')}".strip()
    return f"""Arquivo: video.mp4 ({int(total // 60)}min{int(total % 60):02d}s)

Texto para colar no TikTok:
{roteiro.titulo} 😳 O que você faria no meu lugar? Comenta aqui 👇
{tags}

ANTES DE PUBLICAR:
- Em "Mais opções", ligue "Conteúdo gerado por IA".
- História fictícia narrada por voz de IA. Não diga que é um caso real.
"""


async def fazer(roteiro: Roteiro, refazer: bool) -> None:
    pasta = PASTA_VIDEOS / roteiro.arquivo.stem
    if (pasta / "video.mp4").exists() and not refazer:
        print(f"{roteiro.arquivo.name}: já feito, pulando.")
        return
    pasta.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as temporaria:
        audio, legendas = Path(temporaria) / "voz.mp3", Path(temporaria) / "legenda.ass"
        palavras = await voz.narrar(roteiro.texto, roteiro.voz, audio)
        total = duracao(audio) + 0.8
        criar_legendas(palavras, total, legendas)
        trechos = escolher_trechos(roteiro.fundo, total, roteiro.arquivo.stem)
        montar_video(audio, legendas, trechos, total, pasta / "video.mp4")
    aviso = ""
    if total < DURACAO_MINIMA:
        aviso = "  ⚠️ MENOS DE 2 MINUTOS: aumente a história"
    elif total > DURACAO_MAXIMA:
        aviso = "  ⚠️ MAIS DE 3 MINUTOS: encurte a história"
    print(f"{roteiro.arquivo.name}: vídeo pronto ({total:.0f} s){aviso}", flush=True)
    (pasta / "postagem.txt").write_text(texto_postagem(roteiro, total), encoding="utf-8")
    (pasta / "info.json").write_text(json.dumps(
        {"titulo": roteiro.titulo, "tema": roteiro.tema, "voz": roteiro.voz,
         "fundo": roteiro.fundo, "fonte": FONTE_LEGENDA, "duracao": round(total, 1)},
        ensure_ascii=False, indent=2), encoding="utf-8")


async def main() -> None:
    argumentos = sys.argv[1:]
    refazer = "--refazer" in argumentos
    arquivos = [Path(a) for a in argumentos if a != "--refazer"]
    if not arquivos:
        arquivos = sorted(p for p in PASTA_ROTEIROS.glob("*.md") if p.name != "README.md")
    for arquivo in arquivos:
        await fazer(ler_roteiro(arquivo.resolve()), refazer)


if __name__ == "__main__":
    asyncio.run(main())
