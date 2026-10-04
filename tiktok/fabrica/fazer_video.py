"""Transforma um roteiro de roteiros/ em um vídeo pronto para o TikTok.

Cada roteiro é uma história completa. A fábrica:
1. narra o texto com voz de IA (frase por frase, com pausas e mudança de tom, ver voz.py);
2. acelera a narração e o fundo (VELOCIDADE, hoje 2x, escolha do dono do canal);
3. mostra no começo uma capa com a frase chamativa (ver capa.py) enquanto ela é narrada;
4. cria a legenda palavra por palavra;
5. monta o fundo com vídeos satisfatórios que NUNCA foram usados em outro vídeo
   (o registro fica em fundos/usados.json).

Saída em saida/videos/<roteiro>/: video.mp4, postagem.txt (texto para colar no TikTok) e info.json.
Roteiros que já têm vídeo são pulados (use --refazer para gerar de novo; ao refazer, o vídeo
reaproveita os próprios fundos e só pega fundos novos se precisar de mais).

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
from capa import desenhar_capa
from voz import Palavra

RAIZ = Path(__file__).resolve().parent.parent
PASTA_ROTEIROS = RAIZ / "roteiros"
PASTA_FUNDOS = RAIZ / "saida" / "fundos"
PASTA_VIDEOS = RAIZ / "saida" / "videos"
PASTA_FONTES = Path(__file__).resolve().parent / "fontes"
FONTES_DE_FUNDO = RAIZ / "fundos" / "fontes.json"
FUNDOS_USADOS = RAIZ / "fundos" / "usados.json"

LARGURA, ALTURA, QUADROS = 1080, 1920, 30
VELOCIDADE = 2.0  # narração e fundo acelerados (2x)
TRECHO_MAXIMO = 40.0  # segundos de cada vídeo de fundo usados no máximo (20 s na tela, em 2x)
DURACAO_MINIMA, DURACAO_MAXIMA = 61, 180  # o TikTok só paga por vídeos com mais de 1 minuto

# Fonte da legenda: nome -> (tamanho, espaçamento). Os arquivos ficam em fabrica/fontes/.
FONTES = {
    "Montserrat Black": (100, 0),
    "Poppins ExtraBold": (118, 0),
    "Luckiest Guy": (110, 2),
    "Bangers": (150, 3),
}
FONTE_LEGENDA = "Poppins ExtraBold"  # opção 2, escolhida pelo dono do canal

HASHTAGS = {
    "traicao": "#traicao #relacionamento #namoro #casamento",
    "relacionamento": "#relacionamento #namoro #casamento #sogra",
    "familia": "#familia #brigadefamilia #heranca #irmaos",
    "trabalho": "#trabalho #chefe #emprego #clt",
}
HASHTAGS_FIXAS = "#historias #relatos #storytime #ficcao #satisfatorio"

# Cores no formato das legendas (&HAABBGGRR)
BRANCO, PRETO, AMARELO = "&H00FFFFFF", "&H00000000", "&H0000E5FF"


@dataclass
class Roteiro:
    arquivo: Path
    titulo: str
    tema: str
    voz: str
    fundo: str
    capa: str
    texto: str


def primeira_frase(texto: str) -> str:
    return re.match(r"\s*([^.!?…]+[.!?…]*)", texto).group(1).strip()


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
    return Roteiro(arquivo, titulo, campos.get("tema", ""), campos.get("voz", "thalita"),
                   campos.get("fundo", "satisfatorio"), campos.get("capa", primeira_frase(texto)),
                   texto)


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
        pausa = n + 1 < len(palavras) and palavras[n + 1].inicio - palavra.fim > 0.15
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
        fim_grupo = min(proximo, grupo[-1].fim + 0.2)
        for i, palavra in enumerate(grupo):
            inicio = palavra.inicio
            fim = grupo[i + 1].inicio if i + 1 < len(grupo) else fim_grupo
            if fim <= inicio:
                continue
            texto = " ".join(
                (f"{{\\c{AMARELO}}}{limpar(p.texto)}{{\\c{BRANCO}}}" if p is palavra
                 else limpar(p.texto)) for p in grupo)
            efeito = "{\\fscx85\\fscy85\\t(0,60,\\fscx100\\fscy100)}" if i == 0 else ""
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


def categorias_do_fundo(fundo: str) -> list[str]:
    """'satisfatorio' é um grupo de categorias (ver _grupos em fundos/fontes.json)."""
    grupos = json.loads(FONTES_DE_FUNDO.read_text(encoding="utf-8")).get("_grupos", {})
    return grupos.get(fundo, [c.strip() for c in fundo.split(",")])


def ler_usados() -> dict[str, str]:
    if FUNDOS_USADOS.exists():
        return json.loads(FUNDOS_USADOS.read_text(encoding="utf-8"))
    return {}


def escolher_trechos(fundo: str, total: float, dono: str) -> list[tuple[Path, float, float]]:
    """Escolhe vídeos de fundo nunca usados em outros vídeos até cobrir a duração (na tela)."""
    usados = ler_usados()
    clipes = []
    for categoria in categorias_do_fundo(fundo):
        for clipe in sorted((PASTA_FUNDOS / categoria).glob("*.mp4")):
            chave = f"{categoria}/{clipe.stem}"
            if clipe.name.endswith((".bruto.mp4", ".parcial.mp4")):
                continue
            if usados.get(chave, dono) == dono:
                clipes.append((chave, clipe))
    sorteio = random.Random(dono)
    sorteio.shuffle(clipes)
    # Os fundos que este mesmo vídeo já usava vêm primeiro, para não gastar fundos novos à toa
    clipes.sort(key=lambda c: usados.get(c[0]) != dono)
    trechos, coberto = [], 0.0
    for chave, clipe in clipes:
        if coberto >= total:
            break
        fonte = min(duracao(clipe), TRECHO_MAXIMO)  # segundos do vídeo original
        inicio = sorteio.uniform(0, max(0.0, duracao(clipe) - fonte))
        trechos.append((clipe, inicio, fonte))
        coberto += fonte / VELOCIDADE
    if coberto < total:
        raise RuntimeError(
            f"Faltam vídeos de fundo inéditos em '{fundo}' (cobertos {coberto:.0f} de {total:.0f} s). "
            "Adicione vídeos em fundos/fontes.json e rode fabrica/baixar_fundos.py.")
    return trechos


def registrar_usados(trechos, dono: str) -> None:
    usados = {k: v for k, v in ler_usados().items() if v != dono}
    for clipe, _, _ in trechos:
        usados[f"{clipe.parent.name}/{clipe.stem}"] = dono
    FUNDOS_USADOS.write_text(json.dumps(dict(sorted(usados.items())), ensure_ascii=False,
                                        indent=2) + "\n", encoding="utf-8")


def montar_video(audio: Path, legendas: Path, capa: Path, fim_capa: float, trechos, total: float,
                 saida: Path) -> None:
    entradas = []
    for clipe, inicio, tamanho in trechos:
        entradas += ["-ss", f"{inicio:.2f}", "-t", f"{tamanho:.2f}", "-i", str(clipe)]
    n = len(trechos)
    entradas += ["-loop", "1", "-t", f"{fim_capa:.2f}", "-i", str(capa), "-i", str(audio)]
    cortes = "".join(
        f"[{i}:v]setpts=(PTS-STARTPTS)/{VELOCIDADE},fps={QUADROS},setsar=1[v{i}];"
        for i in range(n))
    juncao = "".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[fundo];"
    capa_filtro = (f"[{n}:v]format=rgba,fade=out:st={max(0, fim_capa - 0.2):.2f}:d=0.2:alpha=1[capa];"
                   f"[fundo][capa]overlay=eof_action=pass[comcapa];")
    legenda = f"[comcapa]ass='{legendas}':fontsdir='{PASTA_FONTES}',format=yuv420p[video]"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", *entradas,
         "-filter_complex", cortes + juncao + capa_filtro + legenda + f";[{n + 1}:a]apad[audio]",
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
    if roteiro.voz not in voz.VOZES:
        raise ValueError(f"{roteiro.arquivo.name}: voz '{roteiro.voz}' não existe. "
                         f"Use uma destas: {', '.join(voz.VOZES)}")
    dono = roteiro.arquivo.stem
    pasta = PASTA_VIDEOS / dono
    if (pasta / "video.mp4").exists() and not refazer:
        print(f"{roteiro.arquivo.name}: já feito, pulando.")
        return
    pasta.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as temporaria:
        temp = Path(temporaria)
        normal, audio = temp / "voz-normal.mp3", temp / "voz.mp3"
        palavras = await voz.narrar(roteiro.texto, roteiro.voz, normal)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(normal),
                        "-filter:a", f"atempo={VELOCIDADE}", "-b:a", "128k", str(audio)],
                       check=True)
        palavras = [Palavra(p.texto, p.inicio / VELOCIDADE, p.fim / VELOCIDADE) for p in palavras]
        total = duracao(audio) + 0.5

        # Capa: fica na tela enquanto a primeira frase é narrada; a legenda começa depois dela
        fim_frase = next((p for p in palavras if p.texto.endswith((".", "!", "?", "…"))),
                         palavras[min(len(palavras) - 1, 15)])
        fim_capa = max(2.5, fim_frase.fim + 0.25)
        capa = temp / "capa.png"
        desenhar_capa(roteiro.capa, capa)
        legendas = temp / "legenda.ass"
        criar_legendas([p for p in palavras if p.inicio >= fim_capa - 0.25], total, legendas)

        trechos = escolher_trechos(roteiro.fundo, total, dono)
        montar_video(audio, legendas, capa, fim_capa, trechos, total, pasta / "video.mp4")
        registrar_usados(trechos, dono)
    aviso = ""
    if total < DURACAO_MINIMA:
        aviso = "  ⚠️ MENOS DE 1 MINUTO: o TikTok não paga, aumente a história"
    elif total > DURACAO_MAXIMA:
        aviso = "  ⚠️ MAIS DE 3 MINUTOS: encurte a história"
    print(f"{roteiro.arquivo.name}: vídeo pronto ({total:.0f} s, {len(trechos)} fundos){aviso}",
          flush=True)
    (pasta / "postagem.txt").write_text(texto_postagem(roteiro, total), encoding="utf-8")
    (pasta / "info.json").write_text(json.dumps(
        {"titulo": roteiro.titulo, "tema": roteiro.tema, "voz": roteiro.voz,
         "fundo": roteiro.fundo, "fundos_usados": [f"{c.parent.name}/{c.stem}" for c, _, _ in trechos],
         "velocidade": VELOCIDADE, "fonte": FONTE_LEGENDA, "duracao": round(total, 1)},
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
