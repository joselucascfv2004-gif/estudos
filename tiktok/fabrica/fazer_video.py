"""Transforma um roteiro de roteiros/ em dois vídeos prontos para o TikTok (Parte 1 e Parte 2).

Para cada parte: narra o texto com voz de IA, cria a legenda palavra por palavra, monta o fundo
com trechos de vídeos da categoria escolhida e junta tudo num MP4 vertical 1080x1920.

Saída em saida/videos/<roteiro>/: parte-1.mp4, parte-2.mp4 e postagem.txt (texto para colar no
TikTok). Roteiros que já têm vídeo são pulados (use --refazer para gerar de novo).

Uso (dentro da pasta tiktok/):
    python3 fabrica/fazer_video.py                      # todos os roteiros que ainda não têm vídeo
    python3 fabrica/fazer_video.py roteiros/001-*.md    # só os roteiros indicados
    python3 fabrica/fazer_video.py --refazer roteiros/001-*.md
"""

import asyncio
import json
import os
import random
import re
import ssl
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

import edge_tts
import edge_tts.communicate

RAIZ = Path(__file__).resolve().parent.parent
PASTA_ROTEIROS = RAIZ / "roteiros"
PASTA_FUNDOS = RAIZ / "saida" / "fundos"
PASTA_VIDEOS = RAIZ / "saida" / "videos"
PASTA_FONTES = Path(__file__).resolve().parent / "fontes"

LARGURA, ALTURA, QUADROS = 1080, 1920, 30
VELOCIDADE_VOZ = "+10%"
DURACAO_MINIMA = 62  # o TikTok só paga por vídeos com mais de 1 minuto
FIM_PARTE_1 = "Continua na parte dois. Já está no meu perfil."

VOZES = {
    "francisca": "pt-BR-FranciscaNeural",
    "thalita": "pt-BR-ThalitaMultilingualNeural",
    "antonio": "pt-BR-AntonioNeural",
    "feminina": "pt-BR-FranciscaNeural",
    "masculina": "pt-BR-AntonioNeural",
}

HASHTAGS = {
    "traicao": "#traicao #relacionamento #namoro #casamento",
    "relacionamento": "#relacionamento #namoro #casamento #sogra",
    "familia": "#familia #brigadefamilia #herança #irmaos",
    "trabalho": "#trabalho #chefe #emprego #clt",
}
HASHTAGS_FIXAS = "#historias #relatos #storytime #ficcao"

# Cores no formato das legendas (&HAABBGGRR)
BRANCO, PRETO, AMARELO = "&H00FFFFFF", "&H00000000", "&H0000E5FF"

# Na nuvem do Claude o acesso à internet passa por um certificado próprio
if os.environ.get("SSL_CERT_FILE"):
    edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])


@dataclass
class Roteiro:
    arquivo: Path
    titulo: str
    tema: str
    voz: str
    fundo: str
    partes: list[str]


@dataclass
class Palavra:
    texto: str
    inicio: float
    fim: float


def ler_roteiro(arquivo: Path) -> Roteiro:
    texto = arquivo.read_text(encoding="utf-8")
    titulo = re.search(r"^# (.+)$", texto, re.M).group(1).strip()
    campos = dict(re.findall(r"^(\w+):\s*(.+?)\s*$", texto.split("## Parte 1")[0], re.M))
    partes = [p.strip() for p in re.split(r"^## Parte \d\s*$", texto, flags=re.M)[1:]]
    if len(partes) != 2:
        raise ValueError(f"{arquivo.name}: o roteiro precisa ter '## Parte 1' e '## Parte 2'")
    partes = [re.sub(r"\s+", " ", p) for p in partes]
    return Roteiro(arquivo, titulo, campos.get("tema", ""), campos.get("voz", "feminina"),
                   campos.get("fundo", "slime"), partes)


async def narrar(texto: str, voz: str, arquivo_audio: Path) -> list[Palavra]:
    """Gera o áudio e devolve cada palavra com o tempo em que ela é falada."""
    comunicador = edge_tts.Communicate(texto, VOZES.get(voz, voz), rate=VELOCIDADE_VOZ,
                                      boundary="WordBoundary")
    palavras: list[Palavra] = []
    with open(arquivo_audio, "wb") as audio:
        async for pedaco in comunicador.stream():
            if pedaco["type"] == "audio":
                audio.write(pedaco["data"])
            elif pedaco["type"] == "WordBoundary":
                inicio = pedaco["offset"] / 1e7
                palavras.append(Palavra(pedaco["text"], inicio, inicio + pedaco["duration"] / 1e7))
    # Devolve a pontuação forte (? e !) que a voz não informa, para aparecer na legenda
    cursor = 0
    for palavra in palavras:
        posicao = texto.find(palavra.texto, cursor)
        if posicao < 0:
            continue
        cursor = posicao + len(palavra.texto)
        sinal = re.match(r"[?!.,;:…]+", texto[cursor:])
        if sinal:
            palavra.texto += sinal.group(0)
    return palavras


def duracao(arquivo: Path) -> float:
    saida = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                            "-of", "csv=p=0", str(arquivo)], capture_output=True, text=True,
                           check=True)
    return float(saida.stdout.strip())


def tempo_ass(segundos: float) -> str:
    centesimos = round(segundos * 100)
    return f"{centesimos // 360000}:{centesimos // 6000 % 60:02d}:{centesimos // 100 % 60:02d}.{centesimos % 100:02d}"


def agrupar(palavras: list[Palavra]) -> list[list[Palavra]]:
    """Junta até 3 palavras por tela, quebrando no fim das frases."""
    grupos, atual = [], []
    for palavra in palavras:
        atual.append(palavra)
        letras = sum(len(p.texto) for p in atual)
        if len(atual) == 3 or letras >= 14 or palavra.texto[-1] in ".?!,;:…":
            grupos.append(atual)
            atual = []
    if atual:
        grupos.append(atual)
    return grupos


def limpar(texto: str) -> str:
    return re.sub(r"[.,;:…]+$", "", texto).upper()


def criar_legendas(palavras: list[Palavra], parte: int, titulo: str, total: float,
                   arquivo: Path) -> None:
    eventos = []
    grupos = agrupar(palavras)
    for g, grupo in enumerate(grupos):
        proximo = grupos[g + 1][0].inicio if g + 1 < len(grupos) else total
        fim_grupo = min(proximo, grupo[-1].fim + 0.4)
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

    # Título nos primeiros segundos e marcador da parte no resto do vídeo
    fim_titulo = min(4.0, total)
    eventos.append(f"Dialogue: 2,{tempo_ass(0)},{tempo_ass(fim_titulo)},Titulo,,0,0,0,,"
                   f"{{\\fad(0,250)}}PARTE {parte}\\N{titulo.upper()}")
    eventos.append(f"Dialogue: 2,{tempo_ass(fim_titulo)},{tempo_ass(total)},Rotulo,,0,0,0,,"
                   f"PARTE {parte}/2")
    if parte == 1:
        eventos.append(f"Dialogue: 2,{tempo_ass(max(0, total - 3.5))},{tempo_ass(total)},Aviso,,0,0,0,,"
                       f"{{\\fad(200,0)}}PARTE 2 NO MEU PERFIL")

    cabecalho = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {LARGURA}
PlayResY: {ALTURA}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Legenda,Anton,112,{BRANCO},{BRANCO},{PRETO},&H80000000,0,0,0,0,100,100,1,0,1,8,4,5,120,120,0,1
Style: Titulo,Anton,72,{PRETO},{PRETO},{BRANCO},&H64000000,0,0,0,0,100,100,1,0,3,22,0,8,90,90,300,1
Style: Rotulo,Anton,58,{BRANCO},{BRANCO},{PRETO},&H80000000,0,0,0,0,100,100,2,0,1,5,2,8,60,60,290,1
Style: Aviso,Anton,80,{PRETO},{PRETO},{AMARELO},&H64000000,0,0,0,0,100,100,1,0,3,22,0,2,90,90,620,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    arquivo.write_text(cabecalho + "\n".join(eventos) + "\n", encoding="utf-8")


def escolher_trechos(fundo: str, total: float, semente: str) -> list[tuple[Path, float, float]]:
    """Sorteia trechos de 7 a 13 segundos dos vídeos da categoria até cobrir o vídeo todo."""
    clipes = sorted((PASTA_FUNDOS / fundo).glob("*.mp4"))
    clipes = [c for c in clipes if not c.name.endswith((".bruto.mp4", ".parcial.mp4"))]
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
    legenda = (f"[fundo]ass='{legendas}':fontsdir='{PASTA_FONTES}',"
               f"format=yuv420p[video]")
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", *entradas, "-i", str(audio),
         "-filter_complex", cortes + juncao + legenda + f";[{n}:a]apad[audio]",
         "-map", "[video]", "-map", "[audio]", "-t", f"{total:.2f}",
         "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-r", str(QUADROS),
         "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-movflags", "+faststart", str(saida)],
        check=True,
    )


def texto_postagem(roteiro: Roteiro, duracoes: list[float]) -> str:
    tags = f"{HASHTAGS_FIXAS} {HASHTAGS.get(roteiro.tema, '')}".strip()
    return f"""PARTE 2 (poste PRIMEIRO, para já estar no perfil quando a Parte 1 aparecer)
Arquivo: parte-2.mp4 ({duracoes[1]:.0f} s)
Texto:
{roteiro.titulo} (Parte 2) 😱 Viu a parte 1? Está no meu perfil.
O que você faria no lugar? Comenta aqui 👇
{tags}

PARTE 1 (poste alguns minutos depois)
Arquivo: parte-1.mp4 ({duracoes[0]:.0f} s)
Texto:
{roteiro.titulo} (Parte 1) 😳 A parte 2 já está no perfil!
{tags}

ANTES DE PUBLICAR, nos dois vídeos:
- Em "Mais opções", ligue "Conteúdo gerado por IA".
- História fictícia narrada por voz de IA. Não diga que é um caso real.
"""


async def fazer(roteiro: Roteiro, refazer: bool) -> None:
    pasta = PASTA_VIDEOS / roteiro.arquivo.stem
    if (pasta / "parte-2.mp4").exists() and not refazer:
        print(f"{roteiro.arquivo.name}: já feito, pulando.")
        return
    pasta.mkdir(parents=True, exist_ok=True)
    duracoes = []
    with tempfile.TemporaryDirectory() as temporaria:
        temp = Path(temporaria)
        for numero, texto in enumerate(roteiro.partes, start=1):
            if numero == 1:
                texto = f"{texto} {FIM_PARTE_1}"
            audio, legendas = temp / f"voz-{numero}.mp3", temp / f"legenda-{numero}.ass"
            for tentativa in range(3):
                try:
                    palavras = await narrar(texto, roteiro.voz, audio)
                    break
                except Exception:
                    if tentativa == 2:
                        raise
                    await asyncio.sleep(3)
            total = duracao(audio) + 0.6
            criar_legendas(palavras, numero, roteiro.titulo, total, legendas)
            trechos = escolher_trechos(roteiro.fundo, total, f"{roteiro.arquivo.stem}-{numero}")
            montar_video(audio, legendas, trechos, total, pasta / f"parte-{numero}.mp4")
            duracoes.append(total)
            aviso = "" if total >= DURACAO_MINIMA else "  ⚠️ MENOS DE 1 MINUTO: aumente o texto"
            print(f"{roteiro.arquivo.name}: parte {numero} pronta ({total:.0f} s){aviso}", flush=True)
    (pasta / "postagem.txt").write_text(texto_postagem(roteiro, duracoes), encoding="utf-8")
    (pasta / "info.json").write_text(json.dumps(
        {"titulo": roteiro.titulo, "tema": roteiro.tema, "voz": roteiro.voz,
         "fundo": roteiro.fundo, "duracoes": [round(d, 1) for d in duracoes]},
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
