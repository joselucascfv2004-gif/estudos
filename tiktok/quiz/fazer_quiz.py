"""Fábrica de vídeos de quiz ("Você passaria no ENEM?"), com animações e a marca do app Estudos.

Cada arquivo em quiz/quizzes/*.json vira um vídeo vertical 1080x1920 que também divulga o app:
1. abertura: a logo entra com um "pulo" e o título aparece palavra por palavra;
2. para cada pergunta: o cartão e as alternativas entram deslizando, um relógio circular conta
   5 segundos (o número pulsa, fica vermelho no fim e o cartão treme), a resposta certa salta em
   verde com confete e a explicação é narrada;
3. encerramento: "Quantas você acertou?" e o convite para baixar o app Estudos.

A logo do app fica no topo o tempo todo. O fundo é um vídeo de estudo (estantes, livros)
desfocado e escurecido, que roda por trás de tudo.

As perguntas vêm do app Estudos (pasta estudos/conteudos), que tem gabarito e explicação conferidos.

Uso (dentro da pasta tiktok/):
    python3 quiz/fazer_quiz.py                         # todos os quizzes que ainda não têm vídeo
    python3 quiz/fazer_quiz.py quiz/quizzes/001-*.json # só os indicados (refaz se já existir)
"""

import array
import asyncio
import json
import math
import random
import subprocess
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PASTA = Path(__file__).resolve().parent
RAIZ = PASTA.parent
sys.path.insert(0, str(RAIZ / "fabrica"))
import voz  # noqa: E402  (a mesma narração das histórias)
from qualidade import CODIFICACAO_MAXIMA, caber_no_limite  # noqa: E402

FONTE = RAIZ / "fabrica" / "fontes" / "Poppins-ExtraBold.ttf"
LOGO = RAIZ / "marca" / "logo-estudos.png"
PASTA_QUIZZES = PASTA / "quizzes"
PASTA_SAIDA = RAIZ / "saida" / "quiz"
PASTA_FUNDOS = RAIZ / "saida" / "fundos" / "quiz_estudo"

LARGURA, ALTURA, QUADROS = 1080, 1920, 30
TAMANHO_CAPA = (1080, 1440)  # capa 3:4 em pé, como a grade do perfil do TikTok
TAXA = voz.TAXA
VELOCIDADE_FALA = 1.3  # narração acelerada (pedido do dono do canal)
TEMPO_RESPOSTA = 5  # segundos para o público pensar
LETRAS = "ABCDE"
HASHTAGS_QUIZ = "#enem #enem2026 #quiz #estudos #vestibular"  # padrão, se o quiz não tiver as suas
# O app ainda não foi lançado: o final convida a seguir o perfil e diz que o app chega em breve.
# Quando lançar, mude para True (o final volta a dizer "baixe o app" e "link no perfil").
APP_LANCADO = False
# Quiz com "chamada_final": "ebook" divulga a Revisão Final ENEM 2026 (e-book do repositório
# vendasteste). O link fica no comentário fixado: conta com menos de 1.000 seguidores não tem link
# clicável na bio. Use só em quizzes de ENEM.
EBOOK = {
    "botao": "REVISÃO FINAL ENEM 2026",
    "linha": "Link no comentário fixado",
    "descricao": "📚 Revisão Final ENEM 2026: link no comentário fixado 📌",
    "comentario": "📚 Revisão Final ENEM 2026: os assuntos que mais caem + plano de estudos de 4 semanas"
                  " 👉 revisao-final-enem-2026.netlify.app",
}
# Cores de destaque para variar as capas (campo "capa_cor" do quiz)
CORES_CAPA = {"amarelo": (255, 200, 0), "laranja": (255, 150, 0), "verde": (88, 204, 2),
              "roxo": (206, 130, 255), "vermelho": (255, 75, 75)}
# Como a voz deve ler cada letra ("E" sozinho seria lido como a palavra "e", com som de "i")
LETRAS_FALADAS = ["A", "B", "C", "D", "É"]

VERDE, VERDE_ESCURO = (88, 204, 2), (70, 160, 0)
AZUL, AMARELO, VERMELHO = (28, 176, 246), (255, 200, 0), (255, 75, 75)
BRANCO, TEXTO, AZUL_NOITE = (255, 255, 255), (30, 30, 30), (12, 22, 56)
# Cores da logo (tiktok/marca/desenhar_logo.py)
AZUL_LOGO, PAPEL_LOGO, GRADE_LOGO, LINHA_LOGO = (8, 112, 222), (230, 244, 253), (214, 235, 250), (142, 201, 240)
CINZA_AZULADO = (70, 100, 140)
LARGURA_CARTAO = 860

# Área segura: os botões do TikTok ficam à direita (de y≈900 para baixo) e a legenda do post
# ocupa a parte de baixo. Em celulares compridos o TikTok ainda corta ~55 px de cada lado e põe as
# abas "Seguindo / Para você" no topo (até y≈220). Por isso tudo fica entre x=110 e x=970, as
# alternativas terminam em x=860 (antes da coluna de botões) e o conteúdo vai de y≈300 a y≈1470.
MX, LIMITE_X = 110, 860
Y_TOPO, Y_ETIQUETA, Y_CARTAO, Y_LIMITE, Y_TOPO_MARCA = 300, 400, 470, 1470, 290


# ---------- utilidades de desenho ----------

def fonte(tamanho: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTE), tamanho)


def quebrar(texto: str, letra: ImageFont.FreeTypeFont, largura: float) -> list[str]:
    linhas, atual = [], ""
    for palavra in texto.split():
        tentativa = f"{atual} {palavra}".strip()
        if letra.getlength(tentativa) <= largura or not atual:
            atual = tentativa
        else:
            linhas.append(atual)
            atual = palavra
    return linhas + ([atual] if atual else [])


def limitar(x: float) -> float:
    return max(0.0, min(1.0, x))


def suave(x: float) -> float:  # desacelera no fim
    x = limitar(x)
    return 1 - (1 - x) ** 3


def pulo(x: float) -> float:  # passa um pouco do ponto e volta ("efeito mola")
    x = limitar(x)
    c = 1.9
    return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2


def colar(tela: Image.Image, figura: Image.Image, cx: float, cy: float, escala: float = 1,
          opacidade: float = 1) -> None:
    """Cola `figura` centralizada em (cx, cy), com escala e transparência, cortando o que sair da tela."""
    if escala <= 0.01 or opacidade <= 0.01:
        return
    if abs(escala - 1) > 0.005:
        figura = figura.resize((max(1, int(figura.width * escala)),
                                max(1, int(figura.height * escala))), Image.BILINEAR)
    if opacidade < 0.995:
        figura = figura.copy()
        figura.putalpha(figura.getchannel("A").point(lambda v: int(v * opacidade)))
    x, y = int(cx - figura.width / 2), int(cy - figura.height / 2)
    corte = (max(0, -x), max(0, -y), min(figura.width, LARGURA - x), min(figura.height, ALTURA - y))
    if corte[0] >= corte[2] or corte[1] >= corte[3]:
        return
    tela.alpha_composite(figura.crop(corte), dest=(x + corte[0], y + corte[1]))


def texto_figura(texto: str, tamanho: int, cor=BRANCO, contorno: int = 0) -> Image.Image:
    # Altura fixa (pela fonte, não pela palavra) para todas as palavras ficarem na mesma linha
    letra = fonte(tamanho)
    subida, descida = letra.getmetrics()
    folga = contorno + 4
    img = Image.new("RGBA", (int(letra.getlength(texto)) + 2 * folga, subida + descida + 2 * folga),
                    (0, 0, 0, 0))
    ImageDraw.Draw(img).text((folga, folga + subida), texto, font=letra, fill=cor, anchor="ls",
                             stroke_width=contorno, stroke_fill=(0, 0, 0))
    return img


def pilula(texto: str, tamanho: int, fundo_cor, cor_texto=TEXTO, folga: int = 30) -> Image.Image:
    letra = fonte(tamanho)
    largura = int(letra.getlength(texto)) + 2 * folga
    altura = int(tamanho * 1.7)
    img = Image.new("RGBA", (largura, altura), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, largura - 1, altura - 1), altura // 2, fill=fundo_cor)
    d.text((largura / 2, altura / 2), texto, font=letra, fill=cor_texto, anchor="mm")
    return img


# ---------- peças do vídeo ----------

def logo(tamanho: int) -> Image.Image:
    """Logo do app com os cantos arredondados de ícone de celular."""
    img = Image.open(LOGO).convert("RGBA").resize((tamanho, tamanho), Image.LANCZOS)
    cantos = Image.new("L", img.size, 0)
    ImageDraw.Draw(cantos).rounded_rectangle((0, 0, tamanho - 1, tamanho - 1), int(tamanho * 0.22),
                                             fill=255)
    img.putalpha(cantos)
    return img


def barra_topo() -> Image.Image:
    """Logo pequena + nome do app, sempre no topo."""
    marca = logo(92)
    nome = texto_figura("App Estudos", 46)
    img = Image.new("RGBA", (92 + 20 + nome.width, 92), (0, 0, 0, 0))
    img.alpha_composite(marca, (0, 0))
    img.alpha_composite(nome, (112, (92 - nome.height) // 2))
    return img


def cartao_pergunta(texto: str) -> Image.Image:
    letra = fonte(54)
    largura = LARGURA - 2 * MX
    linhas = quebrar(texto, letra, largura - 100)
    altura = 90 + len(linhas) * 72
    img = Image.new("RGBA", (largura, altura + 12), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 12, largura - 1, altura + 11), 40, fill=(200, 210, 230))  # "sombra"
    d.rounded_rectangle((0, 0, largura - 1, altura - 1), 40, fill=BRANCO)
    for n, linha in enumerate(linhas):
        d.text((50, 45 + n * 72), linha, font=letra, fill=TEXTO)
    return img


def caixa_alternativa(letra_alt: str, texto: str, altura: int, estado: str) -> Image.Image:
    """estado: 'normal', 'certa' ou 'apagada'."""
    largura = LIMITE_X - MX
    fundo_cor = {"normal": (255, 255, 255, 235), "certa": VERDE + (255,),
                 "apagada": (255, 255, 255, 70)}[estado]
    base_cor = {"normal": (180, 195, 220, 235), "certa": VERDE_ESCURO + (255,),
                "apagada": (255, 255, 255, 30)}[estado]
    cor_texto = {"normal": TEXTO, "certa": BRANCO, "apagada": (255, 255, 255, 170)}[estado]
    img = Image.new("RGBA", (largura, altura + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 8, largura - 1, altura + 7), 30, fill=base_cor)
    d.rounded_rectangle((0, 0, largura - 1, altura - 1), 30, fill=fundo_cor)
    r = altura * 0.32
    cx, cy = 30 + r, altura / 2
    circulo = {"normal": AZUL, "certa": BRANCO, "apagada": (255, 255, 255, 90)}[estado]
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=circulo)
    d.text((cx, cy), letra_alt, font=fonte(40),
           fill=VERDE if estado == "certa" else BRANCO, anchor="mm")
    letra = fonte(44)
    while letra.getlength(texto) > largura - cx - r - 110 and len(texto) > 3:
        texto = texto[:-2] + "…"
    d.text((cx + r + 25, cy), texto, font=letra, fill=cor_texto, anchor="lm")
    if estado == "certa":
        x1 = largura - 80
        d.line([(x1, cy), (x1 + 18, cy + 18), (x1 + 50, cy - 20)], fill=BRANCO, width=11,
               joint="curve")
    return img


@dataclass
class Pergunta:
    dados: dict
    numero: int
    cartao: Image.Image = None
    caixas: dict = field(default_factory=dict)
    etiqueta: Image.Image = None
    y_alternativas: list = field(default_factory=list)

    def preparar(self, total: int) -> None:
        p = self.dados
        self.cartao = cartao_pergunta(p.get("texto_tela", p["pergunta"]))
        self.etiqueta = pilula(f"PERGUNTA {self.numero}/{total}  •  {p['materia'].upper()}", 36,
                               AMARELO)
        topo_cartao = Y_CARTAO
        y = topo_cartao + self.cartao.height + 36
        altura = int(min(112, (Y_LIMITE - y - 4 * 18) / 5))
        for n, texto in enumerate(p["alternativas"]):
            for estado in ("normal", "certa", "apagada"):
                self.caixas[(n, estado)] = caixa_alternativa(LETRAS[n], texto, altura, estado)
            self.y_alternativas.append(y + altura / 2)
            y += altura + 18


# ---------- linha do tempo ----------

@dataclass
class Cena:
    tipo: str  # abertura, pergunta, contagem, resposta, saida, encerramento
    inicio: float
    duracao: float
    pergunta: Pergunta = None


class Confete:
    def __init__(self, cx: float, cy: float, semente: int):
        sorteio = random.Random(semente)
        cores = [AMARELO, VERDE, AZUL, VERMELHO, BRANCO, (206, 130, 255)]
        self.pecas = [(cx, cy, sorteio.uniform(-900, 900), sorteio.uniform(-1500, -500),
                       sorteio.choice(cores), sorteio.uniform(8, 16), sorteio.uniform(0, 6.28))
                      for _ in range(70)]

    def desenhar(self, d: ImageDraw.ImageDraw, t: float) -> None:
        if not 0 <= t <= 1.6:
            return
        for x0, y0, vx, vy, cor, tam, giro in self.pecas:
            x, y = x0 + vx * t, y0 + vy * t + 1800 * t * t
            a = tam * (0.6 + 0.4 * math.sin(giro + t * 12))
            d.rectangle((x - tam / 2, y - a / 2, x + tam / 2, y + a / 2), fill=cor)


def desenhar_quadro(t: float, cenas: list[Cena], total: int, quiz: dict, pecas: dict) -> Image.Image:
    tela = Image.new("RGBA", (LARGURA, ALTURA), (0, 0, 0, 0))
    d = ImageDraw.Draw(tela)
    cena = next((c for c in cenas if c.inicio <= t < c.inicio + c.duracao), cenas[-1])
    lt = t - cena.inicio  # tempo dentro da cena

    if cena.tipo in ("abertura", "encerramento"):
        cartao = pecas["abertura" if cena.tipo == "abertura" else "encerramento"]
        cy = Y_TOPO_MARCA + cartao["fundo"].height / 2  # cartão de cima para baixo, longe dos botões
        colar(tela, cartao["fundo"], LARGURA / 2, cy, escala=0.9 + 0.1 * pulo(lt / 0.4),
              opacidade=limitar(lt / 0.2))
        for figura, dy, atraso, pulsa in cartao["itens"]:
            progresso = (lt - atraso) / 0.35
            escala = (1 + 0.04 * math.sin(lt * 7)) if pulsa and progresso >= 1 else 1
            colar(tela, figura, LARGURA / 2, cy + dy + 40 * (1 - suave(progresso)), escala=escala,
                  opacidade=suave(progresso))
        return tela

    # Barra do topo (logo do app) e bolinhas de progresso
    colar(tela, pecas["barra_topo"], MX + pecas["barra_topo"].width / 2, Y_TOPO)
    p = cena.pergunta
    for i in range(total):
        cx, cy, r = LARGURA - MX - 20 - (total - 1 - i) * 44, Y_TOPO, 13
        feita = i < p.numero - 1 or (i == p.numero - 1 and cena.tipo in ("resposta", "saida"))
        if feita:
            d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=AMARELO)
        elif i == p.numero - 1:
            rr = r + 3 * math.sin(t * 8)
            d.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), outline=AMARELO, width=5)
        else:
            d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(255, 255, 255, 150), width=4)

    # Movimento de entrada, tremida no fim da contagem e saída
    deslocamento, opacidade, tremida = 0.0, 1.0, 0.0
    if cena.tipo == "pergunta":
        entrada = lt
    else:
        entrada = 10
    if cena.tipo == "contagem" and lt > TEMPO_RESPOSTA - 1.2:
        tremida = 9 * math.sin(lt * 70)
    if cena.tipo == "saida":
        deslocamento = -LARGURA * suave(lt / cena.duracao)
        opacidade = 1 - suave(lt / cena.duracao)

    colar(tela, p.etiqueta, MX + p.etiqueta.width / 2 - 300 * (1 - suave(entrada / 0.3)) + deslocamento,
          Y_ETIQUETA, opacidade=opacidade * limitar(entrada / 0.2))
    escala_cartao = 0.85 + 0.15 * pulo((entrada - 0.05) / 0.4)
    colar(tela, p.cartao, LARGURA / 2 + deslocamento + tremida, Y_CARTAO + p.cartao.height / 2,
          escala=escala_cartao, opacidade=opacidade * limitar((entrada - 0.05) / 0.15))

    for n, cy in enumerate(p.y_alternativas):
        chegada = suave((entrada - 0.3 - 0.08 * n) / 0.3)
        cx = (MX + LIMITE_X) / 2 + (1 - chegada) * 700 + deslocamento
        estado, escala = "normal", 1.0
        if cena.tipo in ("resposta", "saida"):
            if n == p.dados["certa"]:
                estado = "certa"
                if cena.tipo == "resposta":
                    escala = 1 + 0.12 * math.sin(math.pi * limitar(lt / 0.35))
            else:
                estado = "apagada"
                if cena.tipo == "resposta" and lt < 0.3:
                    cx += 10 * math.sin(lt * 60)
        colar(tela, p.caixas[(n, estado)], cx + (tremida if estado == "normal" else 0), cy,
              escala=escala, opacidade=opacidade * limitar(chegada * 2))

    if cena.tipo == "contagem":
        restante = TEMPO_RESPOSTA - lt
        cx, cy, r = LARGURA - MX - 62, Y_ETIQUETA, 62
        cor = VERMELHO if restante <= 2 else AMARELO
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(0, 0, 0, 140))
        d.arc((cx - r, cy - r, cx + r, cy + r), -90, -90 + 360 * restante / TEMPO_RESPOSTA,
              fill=cor, width=12)
        numero = str(max(1, math.ceil(restante)))
        batida = 1 + 0.45 * (1 - suave((lt % 1) / 0.35))
        colar(tela, pecas["numeros"][numero], cx, cy, escala=batida)
    if cena.tipo == "resposta":
        pecas["confete"][p.numero].desenhar(d, lt)
    return tela


# ---------- som ----------

def tom(frequencia: float, duracao: float, volume: float = 0.3, queda: float = 0) -> array.array:
    n = int(duracao * TAXA)
    return array.array("h", (
        int(32767 * volume * math.sin(2 * math.pi * frequencia * i / TAXA)
            * min(1, i / 150, (n - i) / 400) * (math.exp(-queda * i / TAXA) if queda else 1))
        for i in range(n)))


def chiado(duracao: float = 0.35, volume: float = 0.18) -> array.array:
    """"Whoosh" de transição: ruído que sobe e desce."""
    sorteio = random.Random(1)
    n = int(duracao * TAXA)
    anterior, saida = 0.0, array.array("h")
    for i in range(n):
        anterior = 0.85 * anterior + 0.15 * sorteio.uniform(-1, 1)
        envelope = math.sin(math.pi * i / n) ** 2
        saida.append(int(32767 * volume * 3 * anterior * envelope))
    return saida


async def narrar(texto: str, nome_voz: str, temp: Path, n: int) -> array.array:
    mp3 = temp / f"fala{n}.mp3"
    await voz.narrar(texto, nome_voz, mp3)
    cru = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(mp3), "-filter:a",
                          f"atempo={VELOCIDADE_FALA}", "-f", "s16le", "-ac", "1", "-ar", str(TAXA),
                          "-"], capture_output=True, check=True).stdout
    return array.array("h", cru)


def misturar(base: array.array, som: array.array, inicio: float) -> None:
    i0 = int(inicio * TAXA)
    falta = i0 + len(som) - len(base)
    if falta > 0:
        base.extend([0] * falta)
    for i, amostra in enumerate(som):
        base[i0 + i] = max(-32768, min(32767, base[i0 + i] + amostra))


# ---------- montagem ----------

def linha_texto(texto: str, tamanho: int, destaque: str = "", cor=AZUL_NOITE) -> Image.Image:
    """Texto limpo (sem contorno), quebrado em linhas e centralizado. A palavra de destaque sai no
    azul da logo."""
    letra = fonte(tamanho)
    linhas = quebrar(texto, letra, LARGURA_CARTAO - 140)
    subida, descida = letra.getmetrics()
    altura_linha = int((subida + descida) * 1.05)
    img = Image.new("RGBA", (LARGURA_CARTAO - 100, altura_linha * len(linhas)), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    espaco = letra.getlength(" ")
    for n, linha in enumerate(linhas):
        palavras = linha.split()
        x = (img.width - letra.getlength(linha)) / 2
        for palavra in palavras:
            d.text((x, n * altura_linha + subida), palavra, font=letra, anchor="ls",
                   fill=AZUL_LOGO if destaque and palavra in destaque.split() else cor)
            x += letra.getlength(palavra) + espaco
    return img


def botao(texto: str) -> Image.Image:
    """Botão no degradê azul da logo, com a "base" mais escura dos botões do app."""
    letra = fonte(50)
    largura, altura = int(letra.getlength(texto)) + 120, 112
    img = Image.new("RGBA", (largura, altura + 10), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 10, largura - 1, altura + 9), altura // 2, fill=(6, 84, 170))
    degrade = Image.new("RGBA", (largura, altura))
    dg = ImageDraw.Draw(degrade)
    for y in range(altura):
        k = y / altura
        dg.line([(0, y), (largura, y)],
                fill=tuple(int(a + (b - a) * k) for a, b in zip((40, 150, 245), AZUL_LOGO)))
    mascara = Image.new("L", (largura, altura), 0)
    ImageDraw.Draw(mascara).rounded_rectangle((0, 0, largura - 1, altura - 1), altura // 2, fill=255)
    img.paste(degrade, (0, 0), mascara)
    d.text((largura / 2, altura / 2), texto, font=letra, fill=BRANCO, anchor="mm")
    return img


def titulo_com_marcador(texto: str, tamanho: int, destaque: str, cor_marca=AMARELO) -> Image.Image:
    """Título grande e limpo; a palavra de destaque fica no azul da logo, sobre uma faixa de
    marca-texto amarela."""
    letra = fonte(tamanho)
    linhas = quebrar(texto, letra, LARGURA_CARTAO - 120)
    subida, descida = letra.getmetrics()
    altura_linha = int((subida + descida) * 0.98)
    img = Image.new("RGBA", (LARGURA_CARTAO - 80, altura_linha * len(linhas) + 10), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    espaco = letra.getlength(" ")
    for n, linha in enumerate(linhas):
        x = (img.width - letra.getlength(linha)) / 2
        base = n * altura_linha + subida
        for palavra in linha.split():
            largura = letra.getlength(palavra)
            if palavra in destaque.split():
                d.rounded_rectangle((x - 8, base - tamanho * 0.42, x + largura + 8, base + tamanho * 0.12),
                                    14, fill=cor_marca)
            d.text((x, base), palavra, font=letra, anchor="ls",
                   fill=AZUL_LOGO if palavra in destaque.split() else AZUL_NOITE)
            x += largura + espaco
    return img


def desenhar_capa(quiz: dict, total: int) -> Image.Image:
    """Capa (capa.png, 3:4 em pé, como a grade do perfil do TikTok): cartão no visual da logo com
    selo colorido, título grande com marca-texto e as letras A a E embaixo, mostrando que é um quiz."""
    tela = Image.new("RGBA", TAMANHO_CAPA, (0, 0, 0, 0))
    cor = CORES_CAPA[quiz.get("capa_cor", "amarelo")]
    sombra_cor = tuple(int(c * 0.78) for c in cor)
    titulo_capa = quiz.get("capa_titulo", quiz["titulo_tela"])
    # Título grande, mas diminui sozinho para caber em até 3 linhas
    tamanho_titulo = next((t for t in (100, 92, 84, 76) if len(quebrar(titulo_capa, fonte(t),
                                                                        LARGURA_CARTAO - 120)) <= 3), 70)
    cartao = cartao_marca([
        (logo(150), 0, False),
        (pilula(quiz.get("capa_selo", f"TESTE RÁPIDO  •  {total} PERGUNTAS"), 36, cor), 0, False),
        (titulo_com_marcador(titulo_capa, tamanho_titulo,
                             quiz.get("capa_destaque", quiz.get("destaque", "")), cor), 0, False),
        (linha_texto(quiz.get("capa_sub", "Você tem 5 segundos para cada uma"), 34,
                     cor=CINZA_AZULADO), 0, False),
    ])
    largura_capa, altura_capa = TAMANHO_CAPA
    altura_grupo = cartao["fundo"].height + 60 + 124  # cartão + espaço + fileira de letras
    topo = (altura_capa - altura_grupo) / 2
    cy = topo + cartao["fundo"].height / 2
    colar(tela, cartao["fundo"], largura_capa / 2, cy)
    for figura, dy, _, _ in cartao["itens"]:
        colar(tela, figura, largura_capa / 2, cy + dy)
    # Letras A a E, como alternativas, embaixo do cartão
    d = ImageDraw.Draw(tela)
    y = topo + cartao["fundo"].height + 60 + 58
    centro = largura_capa / 2
    for n, letra_alt in enumerate(LETRAS):
        x, r = centro + (n - 2) * 150, 58
        destaque = n == 2
        d.ellipse((x - r, y - r + 8, x + r, y + r + 8), fill=(6, 84, 170) if not destaque else sombra_cor)
        d.ellipse((x - r, y - r, x + r, y + r), fill=BRANCO if not destaque else cor)
        d.text((x, y), "?" if destaque else letra_alt, font=fonte(54), fill=AZUL_NOITE, anchor="mm")
    return tela


def cartao_marca(itens: list) -> dict:
    """Cartão no visual da logo: papel quadriculado azul-claro, círculos de construção, régua e
    linhas tracejadas. Devolve o fundo do cartão e os itens (figura, posição, atraso, pulsa)."""
    folga, espaco = 56, 28
    altura = 2 * folga + 40 + sum(f.height for f, _, _ in itens) + espaco * (len(itens) - 1)
    largura = LARGURA_CARTAO
    t = Image.new("RGBA", (largura, altura), (0, 0, 0, 0))
    mascara = Image.new("L", (largura, altura), 0)
    ImageDraw.Draw(mascara).rounded_rectangle((0, 0, largura - 1, altura - 1), 48, fill=255)
    papel = Image.new("RGBA", (largura, altura), PAPEL_LOGO + (255,))
    d = ImageDraw.Draw(papel)
    for x in range(0, largura, 48):
        d.line([(x, 0), (x, altura)], fill=GRADE_LOGO, width=2)
    for y in range(0, altura, 48):
        d.line([(0, y), (largura, y)], fill=GRADE_LOGO, width=2)
    cx, cy = largura / 2, altura / 2
    for raio in (altura * 0.62, altura * 0.42):
        d.ellipse((cx - raio, cy - raio, cx + raio, cy + raio), outline=LINHA_LOGO, width=3)
    for (x1, y1, x2, y2) in ((0, 0, largura, altura), (largura, 0, 0, altura), (cx, 0, cx, altura)):
        comprimento = math.hypot(x2 - x1, y2 - y1)
        for k in range(0, int(comprimento), 34):
            a, b = k / comprimento, min(1, (k + 20) / comprimento)
            d.line([(x1 + (x2 - x1) * a, y1 + (y2 - y1) * a),
                    (x1 + (x2 - x1) * b, y1 + (y2 - y1) * b)], fill=LINHA_LOGO, width=3)
    # Régua no topo do cartão
    for k in range(0, int((largura - 120) / 9.6)):
        x = 60 + k * 9.6
        h = 26 if k % 10 == 0 else (18 if k % 5 == 0 else 10)
        d.line([(x, 0), (x, h)], fill=LINHA_LOGO, width=2)
    t.paste(papel, (0, 0), mascara)
    sombra = Image.new("RGBA", (largura, altura + 14), (0, 0, 0, 0))
    ImageDraw.Draw(sombra).rounded_rectangle((0, 14, largura - 1, altura + 13), 48,
                                             fill=(150, 190, 225, 255))
    sombra.alpha_composite(t, (0, 0))

    posicionados, y = [], folga + 20
    for figura, atraso, pulsa in itens:
        posicionados.append((figura, y + figura.height / 2 - (altura + 14) / 2, atraso, pulsa))
        y += figura.height + espaco
    return {"fundo": sombra, "itens": posicionados}


async def fazer(arquivo: Path) -> None:
    quiz = json.loads(arquivo.read_text(encoding="utf-8"))
    saida = PASTA_SAIDA / arquivo.stem
    saida.mkdir(parents=True, exist_ok=True)
    nome_voz, total = quiz["voz"], len(quiz["perguntas"])
    perguntas = [Pergunta(p, n) for n, p in enumerate(quiz["perguntas"], start=1)]
    for p in perguntas:
        p.preparar(total)

    with tempfile.TemporaryDirectory() as temporaria:
        temp = Path(temporaria)
        # 1) Narração e linha do tempo
        audio, cenas, efeitos = array.array("h"), [], []

        def agora() -> float:
            return len(audio) / TAXA

        def silencio(segundos: float) -> None:
            audio.extend([0] * int(segundos * TAXA))

        fala = await narrar(quiz["chamada"], nome_voz, temp, 0)
        inicio = agora()
        efeitos.append((inicio, chiado()))
        audio.extend(fala)
        silencio(0.4)
        cenas.append(Cena("abertura", inicio, agora() - inicio))
        for p in perguntas:
            d = p.dados
            inicio = agora()
            efeitos.append((inicio, chiado()))
            silencio(0.25)
            audio.extend(await narrar(f"Pergunta {p.numero}. {d['pergunta']}", nome_voz, temp, p.numero * 10))
            silencio(0.15)
            cenas.append(Cena("pergunta", inicio, agora() - inicio, p))
            inicio = agora()
            for s in range(TEMPO_RESPOSTA):
                efeitos.append((inicio + s, tom(1400 if s >= TEMPO_RESPOSTA - 2 else 1100, 0.05, 0.3)))
            silencio(TEMPO_RESPOSTA)
            cenas.append(Cena("contagem", inicio, TEMPO_RESPOSTA, p))
            inicio = agora()
            efeitos.append((inicio, tom(880, 0.14, 0.25)))
            efeitos.append((inicio + 0.12, tom(1320, 0.35, 0.25, queda=6)))
            certa = d.get("resposta_falada", d["alternativas"][d["certa"]])  # ex.: "423 kelvin"
            silencio(0.2)
            audio.extend(await narrar(f"Letra {LETRAS_FALADAS[d['certa']]}! {certa}. {d['explicacao']}",
                                      nome_voz, temp, p.numero * 10 + 1))
            silencio(0.3)
            cenas.append(Cena("resposta", inicio, agora() - inicio, p))
            inicio = agora()
            silencio(0.3)
            cenas.append(Cena("saida", inicio, 0.3, p))
        inicio = agora()
        efeitos.append((inicio, chiado()))
        audio.extend(await narrar(quiz["encerramento"], nome_voz, temp, 999))
        silencio(1.2)
        cenas.append(Cena("encerramento", inicio, agora() - inicio))
        for momento, som in efeitos:
            misturar(audio, som, momento)
        duracao = agora()
        (temp / "audio.raw").write_bytes(audio.tobytes())

        # 2) Peças fixas (desenhadas uma vez só)
        ebook = quiz.get("chamada_final") == "ebook"
        pecas = {
            "barra_topo": barra_topo(),
            "abertura": cartao_marca([
                (logo(150), 0.15, False),
                (linha_texto(quiz["titulo_tela"], 80, quiz.get("destaque", "")), 0.35, False),
                (linha_texto(quiz["subtitulo_tela"], 36, cor=CINZA_AZULADO), 0.6, False),
            ]),
            "encerramento": cartao_marca([
                (logo(140), 0.15, False),
                (linha_texto("Quantas você acertou?", 70, "acertou?"), 0.35, False),
                (botao(EBOOK["botao"] if ebook else
                       "BAIXE O APP ESTUDOS" if APP_LANCADO else "SIGA PARA O PRÓXIMO TESTE"),
                 0.7, True),
                (linha_texto(EBOOK["linha"] if ebook else
                             "+4.900 questões grátis  •  link no perfil" if APP_LANCADO
                             else "App Estudos  •  chegando em breve", 32, cor=CINZA_AZULADO),
                 1.0, False),
            ]),
            "numeros": {str(i): texto_figura(str(i), 64) for i in range(1, TEMPO_RESPOSTA + 1)},
            "confete": {p.numero: Confete((MX + LIMITE_X) / 2, p.y_alternativas[p.dados["certa"]],
                                          p.numero) for p in perguntas},
        }

        # 3) Vídeo: fundo de estudo desfocado + quadros animados + áudio
        fundo = fundo_do_quiz(arquivo)
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
            ffmpeg.stdin.write(desenhar_quadro(q / QUADROS, cenas, total, quiz, pecas).tobytes())
        ffmpeg.stdin.close()
        if ffmpeg.wait() != 0:
            raise RuntimeError("o ffmpeg falhou ao montar o vídeo")
    caber_no_limite(saida / "video.mp4")
    salvar_capa_quiz(arquivo, quiz, total, saida / "capa.png")

    ebook = quiz.get("chamada_final") == "ebook"
    fim_descricao = (EBOOK["descricao"] if ebook else
                     "Treine com +4.900 questões no App Estudos (link no perfil)." if APP_LANCADO
                     else "App Estudos chegando em breve 📲")
    extra_ebook = f"""
COMENTÁRIO PARA FIXAR (comente no seu vídeo, segure o dedo nele e toque em "Fixar"):
{EBOOK["comentario"]}

Em "Mais opções", ligue também "Conteúdo comercial" → "Sua marca" (o vídeo divulga o e-book).
""" if ebook else ""
    (saida / "postagem.txt").write_text(f"""Arquivo: video.mp4 ({int(duracao // 60)}min{int(duracao % 60):02d}s)

Capa: capa.png (adicione como capa no TikTok, em "Editar capa").

Texto para colar no TikTok:
{quiz.get('descricao', quiz['titulo'] + ' 🧠 Comenta quantas você acertou! 👇')} {fim_descricao}
{quiz.get('hashtags', HASHTAGS_QUIZ)}
{extra_ebook}
ANTES DE PUBLICAR:
- Em "Mais opções", ligue "Conteúdo gerado por IA" (a narração é feita por voz de IA).
- Ainda em "Mais opções", ligue "Enviar em alta qualidade" (ou "Upload HD"), se aparecer.
- Poste usando Wi-Fi: com dados móveis o TikTok pode enviar o vídeo com qualidade menor.
""", encoding="utf-8")
    print(f"{arquivo.name}: vídeo pronto ({duracao:.0f} s)", flush=True)


def fundo_do_quiz(arquivo: Path) -> Path:
    fundos = sorted(PASTA_FUNDOS.glob("*.mp4"))
    return fundos[sum(map(ord, arquivo.stem)) % len(fundos)]


def salvar_capa_quiz(arquivo: Path, quiz: dict, total: int, destino: Path) -> None:
    """Capa 3:4 sobre um quadro do mesmo fundo do vídeo, desfocado e escurecido."""
    largura_capa, altura_capa = TAMANHO_CAPA
    filtro = (f"scale={LARGURA}:{ALTURA},gblur=sigma=28,eq=brightness=-0.12:saturation=0.7,"
              f"drawbox=color=0x0C1638@0.55:t=fill,crop={largura_capa}:{altura_capa}")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "1", "-i", str(fundo_do_quiz(arquivo)),
                    "-frames:v", "1", "-vf", filtro, str(destino)], check=True)
    Image.alpha_composite(Image.open(destino).convert("RGBA"),
                          desenhar_capa(quiz, total)).convert("RGB").save(destino)


async def main() -> None:
    so_capas = "--capas" in sys.argv
    arquivos = [Path(a).resolve() for a in sys.argv[1:] if a != "--capas"]
    if so_capas:  # python3 quiz/fazer_quiz.py --capas quiz/quizzes/*.json  (refaz só as capas)
        for arquivo in arquivos:
            quiz = json.loads(arquivo.read_text(encoding="utf-8"))
            (PASTA_SAIDA / arquivo.stem).mkdir(parents=True, exist_ok=True)
            salvar_capa_quiz(arquivo, quiz, len(quiz["perguntas"]), PASTA_SAIDA / arquivo.stem / "capa.png")
            print(f"{arquivo.name}: capa pronta")
        return
    if not arquivos:
        arquivos = [a for a in sorted(PASTA_QUIZZES.glob("*.json"))
                    if not (PASTA_SAIDA / a.stem / "video.mp4").exists()]
    for arquivo in arquivos:
        await fazer(arquivo)


if __name__ == "__main__":
    asyncio.run(main())
