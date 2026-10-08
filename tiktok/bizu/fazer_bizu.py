"""Fábrica de vídeos de bizu: técnicas, macetes e jeitos de decorar assuntos do ENEM.

Usa o mesmo visual, a mesma voz e o mesmo fundo dos quizzes (quiz/fazer_quiz.py). Cada arquivo em
bizu/bizus/*.json vira um vídeo vertical 1080x1920:
1. abertura: cartão da marca com o título do bizu (o "gancho");
2. blocos: uma etiqueta amarela (por exemplo "TRUQUE 1") e um cartão branco. Os itens do bloco
   aparecem um a um, cada um no momento em que a narração fala dele;
3. encerramento: "Salva esse bizu!" e a chamada para o e-book (ou para seguir o perfil).

Tipos de item (campo "tipo"): "texto", "dica" (caixa amarela), "formula" (caixa azul, letra grande),
"certo" (com visto verde), "errado" (com X vermelho) e "nota" (texto menor). Palavras entre
asteriscos (*assim*) ganham marca-texto amarelo. Cada item tem "tela" (o que aparece) e "fala" (o
que a voz diz; pode ficar vazio).

Uso (dentro da pasta tiktok/):
    python3 bizu/fazer_bizu.py bizu/bizus/001-*.json
"""

import array
import asyncio
import json
import math
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw

PASTA = Path(__file__).resolve().parent
RAIZ = PASTA.parent
sys.path.insert(0, str(RAIZ / "quiz"))
import fazer_quiz as fq  # noqa: E402  (peças, cores, voz e som dos quizzes)
from fazer_quiz import (ALTURA, AMARELO, AZUL_LOGO, AZUL_NOITE, BRANCO, CINZA_AZULADO, EBOOK,  # noqa: E402
                        LARGURA, LARGURA_CARTAO, LINHA_LOGO, MX, PAPEL_LOGO, QUADROS, TAXA, VERDE,
                        VERMELHO, Y_CARTAO, Y_ETIQUETA, Y_LIMITE, Y_TOPO, Y_TOPO_MARCA, barra_topo,
                        botao, cartao_marca, chiado, colar, fonte, limitar, linha_texto, logo, misturar,
                        narrar, pilula, pulo, suave, titulo_com_marcador, tom)
from qualidade import CODIFICACAO_MAXIMA, caber_no_limite  # noqa: E402

PASTA_BIZUS = PASTA / "bizus"
PASTA_SAIDA = RAIZ / "saida" / "bizu"
LARGURA_ITEM = LARGURA_CARTAO - 100  # largura útil dentro do cartão branco
FOLGA_CARTAO, ESPACO_ITENS = 46, 26
HASHTAGS_BIZU = "#enem #enem2026 #dicasenem #studytok #fyp"


# ---------- texto com marca-texto ----------

def palavras_marcadas(texto: str) -> list[tuple[str, bool, bool]]:
    """"Troque a *palavra*." -> [("Troque", False, False), ("a", False, False), ("palavra", True, False),
    (".", False, True)]. O terceiro valor diz se o pedaço gruda no anterior (sem espaço)."""
    saida, anterior = [], ""
    for n, trecho in enumerate(texto.split("*")):
        for i, p in enumerate(trecho.split()):
            gruda = (i == 0 and bool(saida) and not trecho[:1].isspace()
                     and not anterior[-1:].isspace())
            saida.append((p, n % 2 == 1, gruda))
        anterior = trecho if trecho else anterior
    return saida


def texto_marcado(texto: str, tamanho: int, largura: int, cor=AZUL_NOITE, centralizar=False) -> Image.Image:
    letra = fonte(tamanho)
    espaco = letra.getlength(" ")
    # junta os pedaços grudados (ex.: palavra marcada + pontuação) para quebrar a linha junto
    grupos = []
    for palavra, marcada, gruda in palavras_marcadas(texto):
        if gruda and grupos:
            grupos[-1].append((palavra, marcada))
        else:
            grupos.append([(palavra, marcada)])

    def largura_grupo(grupo):
        return sum(letra.getlength(p) for p, _ in grupo)

    linhas, atual, largura_atual = [], [], 0.0
    for grupo in grupos:
        w = largura_grupo(grupo)
        if atual and largura_atual + espaco + w > largura:
            linhas.append(atual)
            atual, largura_atual = [], 0.0
        largura_atual += (espaco if atual else 0) + w
        atual.append(grupo)
    if atual:
        linhas.append(atual)
    subida, descida = letra.getmetrics()
    altura_linha = int((subida + descida) * 1.08)
    img = Image.new("RGBA", (largura, altura_linha * len(linhas) + 6), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for n, linha in enumerate(linhas):
        total = sum(largura_grupo(gr) for gr in linha) + espaco * (len(linha) - 1)
        x = (largura - total) / 2 if centralizar else 0
        base = n * altura_linha + subida
        pedacos = []  # (x, palavra, marcada, espaço depois)
        for i, grupo in enumerate(linha):
            for j, (palavra, marcada) in enumerate(grupo):
                pedacos.append([x, palavra, marcada, j == len(grupo) - 1 and i + 1 < len(linha)])
                x += letra.getlength(palavra)
            x += espaco
        for k, (px, palavra, marcada, tem_espaco) in enumerate(pedacos):
            if marcada:  # faixa amarela embaixo (emenda com a próxima palavra marcada)
                fim = px + letra.getlength(palavra)
                if k + 1 < len(pedacos) and pedacos[k + 1][2]:
                    fim = pedacos[k + 1][0]
                d.rounded_rectangle((px - 4, base - tamanho * 0.40, fim + 4, base + tamanho * 0.14), 10,
                                    fill=AMARELO)
        for px, palavra, marcada, _ in pedacos:
            d.text((px, base), palavra, font=letra, anchor="ls", fill=AZUL_LOGO if marcada else cor)
    return img


def icone(tipo: str, r: int = 30) -> Image.Image:
    img = Image.new("RGBA", (2 * r, 2 * r), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse((0, 0, 2 * r - 1, 2 * r - 1), fill=VERDE if tipo == "certo" else VERMELHO)
    if tipo == "certo":
        d.line([(r * .5, r * 1.02), (r * .85, r * 1.38), (r * 1.5, r * .64)], fill=BRANCO, width=7, joint="curve")
    else:
        d.line([(r * .62, r * .62), (r * 1.38, r * 1.38)], fill=BRANCO, width=7)
        d.line([(r * 1.38, r * .62), (r * .62, r * 1.38)], fill=BRANCO, width=7)
    return img


def figura_item(item: dict) -> Image.Image:
    tipo, texto = item.get("tipo", "texto"), item["tela"]
    if tipo in ("certo", "errado"):
        simbolo = icone(tipo)
        corpo = texto_marcado(texto, 50, LARGURA_ITEM - simbolo.width - 22)
        img = Image.new("RGBA", (LARGURA_ITEM, max(corpo.height, simbolo.height)), (0, 0, 0, 0))
        img.alpha_composite(simbolo, (0, max(0, (min(corpo.height, 80) - simbolo.height) // 2)))
        img.alpha_composite(corpo, (simbolo.width + 22, 0))
        return img
    if tipo in ("dica", "formula"):
        tamanho = 50 if tipo == "dica" else 62
        corpo = texto_marcado(texto, tamanho, LARGURA_ITEM - 60, centralizar=True)
        img = Image.new("RGBA", (LARGURA_ITEM, corpo.height + 44), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        fundo, borda = ((255, 243, 196), AMARELO) if tipo == "dica" else (PAPEL_LOGO, LINHA_LOGO)
        d.rounded_rectangle((0, 0, img.width - 1, img.height - 1), 28, fill=fundo, outline=borda, width=5)
        img.alpha_composite(corpo, (30, 22))
        return img
    if tipo == "nota":
        return texto_marcado(texto, 38, LARGURA_ITEM, cor=CINZA_AZULADO)
    return texto_marcado(texto, 50, LARGURA_ITEM)


@dataclass
class Bloco:
    etiqueta: Image.Image
    cartao: Image.Image
    figuras: list  # (figura, y dentro do cartão)


def montar_bloco(numero: int, total: int, dados: dict) -> Bloco:
    figuras, y = [], FOLGA_CARTAO
    for item in dados["itens"]:
        f = figura_item(item)
        figuras.append((f, y))
        y += f.height + ESPACO_ITENS
    altura = y - ESPACO_ITENS + FOLGA_CARTAO
    if Y_CARTAO + altura > Y_LIMITE + 40:
        raise ValueError(f"o bloco {numero} ({dados['etiqueta']}) ficou alto demais: divida em dois")
    largura = LARGURA - 2 * MX
    cartao = Image.new("RGBA", (largura, altura + 12), (0, 0, 0, 0))
    d = ImageDraw.Draw(cartao)
    d.rounded_rectangle((0, 12, largura - 1, altura + 11), 40, fill=(200, 210, 230))
    d.rounded_rectangle((0, 0, largura - 1, altura - 1), 40, fill=BRANCO)
    etiqueta = pilula(f"{dados['etiqueta']}  •  {numero}/{total}", 36, AMARELO)
    return Bloco(etiqueta, cartao, figuras)


# ---------- linha do tempo e desenho ----------

@dataclass
class Cena:
    tipo: str  # abertura, bloco, saida, encerramento
    inicio: float
    duracao: float
    bloco: int = 0
    aparece: tuple = ()  # momento (dentro da cena) em que cada item aparece


def desenhar_cartao_marca(tela: Image.Image, cartao: dict, lt: float) -> None:
    cy = Y_TOPO_MARCA + cartao["fundo"].height / 2
    colar(tela, cartao["fundo"], LARGURA / 2, cy, escala=0.9 + 0.1 * pulo(lt / 0.4), opacidade=limitar(lt / 0.2))
    for figura, dy, atraso, pulsa in cartao["itens"]:
        progresso = (lt - atraso) / 0.35
        escala = (1 + 0.04 * math.sin(lt * 7)) if pulsa and progresso >= 1 else 1
        colar(tela, figura, LARGURA / 2, cy + dy + 40 * (1 - suave(progresso)), escala=escala,
              opacidade=suave(progresso))


def desenhar_quadro(t: float, cenas: list, blocos: list, pecas: dict) -> Image.Image:
    tela = Image.new("RGBA", (LARGURA, ALTURA), (0, 0, 0, 0))
    d = ImageDraw.Draw(tela)
    cena = next((c for c in cenas if c.inicio <= t < c.inicio + c.duracao), cenas[-1])
    lt = t - cena.inicio
    if cena.tipo in ("abertura", "encerramento"):
        desenhar_cartao_marca(tela, pecas[cena.tipo], lt)
        return tela

    colar(tela, pecas["barra_topo"], MX + pecas["barra_topo"].width / 2, Y_TOPO)
    total = len(blocos)
    for i in range(total):  # bolinhas de progresso dos blocos
        cx, cy, r = LARGURA - MX - 20 - (total - 1 - i) * 44, Y_TOPO, 13
        if i < cena.bloco or (i == cena.bloco and cena.tipo == "saida"):
            d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=AMARELO)
        elif i == cena.bloco:
            rr = r + 3 * math.sin(t * 8)
            d.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), outline=AMARELO, width=5)
        else:
            d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(255, 255, 255, 150), width=4)

    b = blocos[cena.bloco]
    entrada = lt if cena.tipo == "bloco" else 10
    desloc, opac = 0.0, 1.0
    if cena.tipo == "saida":
        desloc = -LARGURA * suave(lt / cena.duracao)
        opac = 1 - suave(lt / cena.duracao)
    colar(tela, b.etiqueta, MX + b.etiqueta.width / 2 - 300 * (1 - suave(entrada / 0.3)) + desloc,
          Y_ETIQUETA, opacidade=opac * limitar(entrada / 0.2))
    topo = Y_CARTAO
    colar(tela, b.cartao, LARGURA / 2 + desloc, topo + b.cartao.height / 2,
          escala=0.85 + 0.15 * pulo((entrada - 0.05) / 0.4), opacidade=opac * limitar((entrada - 0.05) / 0.15))
    aparece = pecas["aparece"][cena.bloco]
    for (figura, y), momento in zip(b.figuras, aparece):
        k = (entrada - momento) / 0.35 if cena.tipo == "bloco" else 10
        if k <= 0:
            continue
        x = MX + 50 + figura.width / 2 + 120 * (1 - suave(k)) + desloc
        colar(tela, figura, x, topo + y + figura.height / 2, escala=0.94 + 0.06 * pulo(k),
              opacidade=opac * limitar(k * 1.5))
    return tela


# ---------- capa ----------

def lampada(r: int = 54) -> Image.Image:
    """Lâmpada acesa (o "bizu") desenhada com formas simples."""
    tam = int(r * 3.2)
    img = Image.new("RGBA", (tam, tam), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = tam / 2, tam / 2 - r * 0.15
    for k in range(8):  # raios
        a = -math.pi / 2 + (k - 3.5) * 0.42
        if abs(math.sin(a)) > 0.98 and math.sin(a) > 0:
            continue
        d.line([(cx + math.cos(a) * r * 1.25, cy + math.sin(a) * r * 1.25),
                (cx + math.cos(a) * r * 1.55, cy + math.sin(a) * r * 1.55)], fill=AMARELO, width=9)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=AMARELO)
    d.rounded_rectangle((cx - r * .45, cy + r * .8, cx + r * .45, cy + r * 1.35), 8, fill=(170, 180, 200))
    d.text((cx, cy - 4), "!", font=fonte(int(r * 1.3)), fill=AZUL_NOITE, anchor="mm")
    return img


def desenhar_capa(bizu: dict) -> Image.Image:
    tela = Image.new("RGBA", fq.TAMANHO_CAPA, (0, 0, 0, 0))
    cor = fq.CORES_CAPA[bizu.get("capa_cor", "amarelo")]
    titulo = bizu["capa_titulo"]
    tamanho = next((t for t in (100, 92, 84, 76) if len(fq.quebrar(titulo, fonte(t), LARGURA_CARTAO - 120)) <= 3), 70)
    cartao = cartao_marca([
        (logo(150), 0, False),
        (pilula(bizu["capa_selo"], 36, cor), 0, False),
        (titulo_com_marcador(titulo, tamanho, bizu.get("capa_destaque", ""), cor), 0, False),
        (linha_texto(bizu["capa_sub"], 34, cor=CINZA_AZULADO), 0, False),
    ])
    largura_capa, altura_capa = fq.TAMANHO_CAPA
    selo = pilula("SALVA PRA REVISAR", 40, BRANCO, AZUL_NOITE, folga=36)
    lamp = lampada()
    altura_grupo = cartao["fundo"].height + 30 + lamp.height
    topo = (altura_capa - altura_grupo) / 2
    cy = topo + cartao["fundo"].height / 2
    colar(tela, cartao["fundo"], largura_capa / 2, cy)
    for figura, dy, _, _ in cartao["itens"]:
        colar(tela, figura, largura_capa / 2, cy + dy)
    y = topo + cartao["fundo"].height + 30 + lamp.height / 2
    largura_linha = lamp.width + selo.width
    x0 = (largura_capa - largura_linha) / 2
    colar(tela, lamp, x0 + lamp.width / 2, y)
    colar(tela, selo, x0 + lamp.width + selo.width / 2, y)
    return tela


def salvar_capa(arquivo: Path, bizu: dict, destino: Path) -> None:
    largura_capa, altura_capa = fq.TAMANHO_CAPA
    filtro = (f"scale={LARGURA}:{ALTURA},gblur=sigma=28,eq=brightness=-0.12:saturation=0.7,"
              f"drawbox=color=0x0C1638@0.55:t=fill,crop={largura_capa}:{altura_capa}")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "1", "-i", str(fq.fundo_do_quiz(arquivo)),
                    "-frames:v", "1", "-vf", filtro, str(destino)], check=True)
    Image.alpha_composite(Image.open(destino).convert("RGBA"), desenhar_capa(bizu)).convert("RGB").save(destino)


# ---------- montagem ----------

async def fazer(arquivo: Path) -> None:
    bizu = json.loads(arquivo.read_text(encoding="utf-8"))
    saida = PASTA_SAIDA / arquivo.stem
    saida.mkdir(parents=True, exist_ok=True)
    nome_voz = bizu.get("voz", "antonio")
    ebook = bizu.get("chamada_final") == "ebook"
    blocos = [montar_bloco(n, len(bizu["blocos"]), b) for n, b in enumerate(bizu["blocos"], start=1)]

    with tempfile.TemporaryDirectory() as temporaria:
        temp = Path(temporaria)
        audio, cenas, efeitos, aparece = array.array("h"), [], [], []

        def agora() -> float:
            return len(audio) / TAXA

        def silencio(segundos: float) -> None:
            audio.extend([0] * int(segundos * TAXA))

        inicio = agora()
        efeitos.append((inicio, chiado()))
        audio.extend(await narrar(bizu["abertura"], nome_voz, temp, 0))
        silencio(0.4)
        cenas.append(Cena("abertura", inicio, agora() - inicio))
        n_fala = 1
        for i, dados in enumerate(bizu["blocos"]):
            inicio = agora()
            efeitos.append((inicio, chiado()))
            silencio(0.45)
            momentos = []
            for item in dados["itens"]:
                momentos.append(agora() - inicio)
                efeitos.append((agora(), tom(980, 0.07, 0.16)))
                if item.get("fala"):
                    audio.extend(await narrar(item["fala"], nome_voz, temp, n_fala))
                    n_fala += 1
                    silencio(0.3)
                else:
                    silencio(0.8)
            silencio(0.5)
            cenas.append(Cena("bloco", inicio, agora() - inicio, i))
            aparece.append(tuple(momentos))
            inicio = agora()
            silencio(0.35)
            cenas.append(Cena("saida", inicio, 0.35, i))
        inicio = agora()
        efeitos.append((inicio, chiado()))
        audio.extend(await narrar(bizu["encerramento"], nome_voz, temp, 999))
        silencio(1.2)
        cenas.append(Cena("encerramento", inicio, agora() - inicio))
        for momento, som in efeitos:
            misturar(audio, som, momento)
        duracao = agora()
        (temp / "audio.raw").write_bytes(audio.tobytes())

        pecas = {
            "barra_topo": barra_topo(),
            "aparece": aparece,
            "abertura": cartao_marca([
                (logo(150), 0.15, False),
                (pilula(bizu["selo"], 36, AMARELO), 0.25, False),
                (linha_texto(bizu["titulo_tela"], 80, bizu.get("destaque", "")), 0.35, False),
                (linha_texto(bizu["subtitulo_tela"], 36, cor=CINZA_AZULADO), 0.6, False),
            ]),
            "encerramento": cartao_marca([
                (logo(140), 0.15, False),
                (linha_texto("Salva esse bizu!", 70, "bizu!"), 0.35, False),
                (botao(EBOOK["botao"] if ebook else "SIGA PARA MAIS BIZUS"), 0.7, True),
                (linha_texto(EBOOK["linha"] if ebook else "App Estudos  •  chegando em breve", 32,
                             cor=CINZA_AZULADO), 1.0, False),
            ]),
        }

        fundo = fq.fundo_do_quiz(arquivo)
        filtro = (f"[0:v]scale={LARGURA}:{ALTURA},gblur=sigma=28,eq=brightness=-0.12:saturation=0.7,"
                  f"drawbox=color=0x0C1638@0.55:t=fill,fps={QUADROS}[fundo];"
                  f"[fundo][1:v]overlay=format=auto,format=yuv420p[video]")
        ffmpeg = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error", "-stream_loop", "-1", "-i", str(fundo),
             "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{LARGURA}x{ALTURA}", "-r", str(QUADROS),
             "-i", "-", "-f", "s16le", "-ac", "1", "-ar", str(TAXA), "-i", str(temp / "audio.raw"),
             "-filter_complex", filtro, "-map", "[video]", "-map", "2:a",
             *CODIFICACAO_MAXIMA, "-c:a", "aac", "-b:a", "160k", "-ar", "44100",
             "-t", f"{duracao:.2f}", "-movflags", "+faststart", str(saida / "video.mp4")],
            stdin=subprocess.PIPE)
        for q in range(int(duracao * QUADROS) + 1):
            ffmpeg.stdin.write(desenhar_quadro(q / QUADROS, cenas, blocos, pecas).tobytes())
        ffmpeg.stdin.close()
        if ffmpeg.wait() != 0:
            raise RuntimeError("o ffmpeg falhou ao montar o vídeo")
    caber_no_limite(saida / "video.mp4")
    salvar_capa(arquivo, bizu, saida / "capa.png")

    extra = f"""
COMENTÁRIO PARA FIXAR (comente no seu vídeo, segure o dedo nele e toque em "Fixar"):
{EBOOK["comentario"]}

Em "Mais opções", ligue também "Conteúdo comercial" → "Sua marca" (o vídeo divulga o e-book).
""" if ebook else ""
    (saida / "postagem.txt").write_text(f"""Arquivo: video.mp4 ({int(duracao // 60)}min{int(duracao % 60):02d}s)

Capa: capa.png (adicione como capa no TikTok, em "Editar capa").

Texto para colar no TikTok:
{bizu['descricao']} {EBOOK['descricao'] if ebook else ''}
{bizu.get('hashtags', HASHTAGS_BIZU)}
{extra}
ANTES DE PUBLICAR:
- Em "Mais opções", ligue "Conteúdo gerado por IA" (a narração é feita por voz de IA).
- Ainda em "Mais opções", ligue "Enviar em alta qualidade" (ou "Upload HD"), se aparecer.
- Poste usando Wi-Fi: com dados móveis o TikTok pode enviar o vídeo com qualidade menor.
""", encoding="utf-8")
    if duracao < 61:
        print(f"ATENÇÃO: {arquivo.name} tem {duracao:.0f} s (o Creator Rewards pede mais de 1 minuto)")
    print(f"{arquivo.name}: vídeo pronto ({duracao:.0f} s)", flush=True)


async def main() -> None:
    arquivos = [Path(a).resolve() for a in sys.argv[1:] if not a.startswith("--")]
    if "--capas" in sys.argv:
        for arquivo in arquivos:
            bizu = json.loads(arquivo.read_text(encoding="utf-8"))
            (PASTA_SAIDA / arquivo.stem).mkdir(parents=True, exist_ok=True)
            salvar_capa(arquivo, bizu, PASTA_SAIDA / arquivo.stem / "capa.png")
        return
    if not arquivos:
        arquivos = [a for a in sorted(PASTA_BIZUS.glob("*.json"))
                    if not (PASTA_SAIDA / a.stem / "video.mp4").exists()]
    for arquivo in arquivos:
        await fazer(arquivo)


if __name__ == "__main__":
    asyncio.run(main())
