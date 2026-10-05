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

FONTE = RAIZ / "fabrica" / "fontes" / "Poppins-ExtraBold.ttf"
LOGO = RAIZ / "marca" / "logo-estudos.png"
PASTA_QUIZZES = PASTA / "quizzes"
PASTA_SAIDA = RAIZ / "saida" / "quiz"
PASTA_FUNDOS = RAIZ / "saida" / "fundos" / "quiz_estudo"

LARGURA, ALTURA, QUADROS = 1080, 1920, 30
TAXA = voz.TAXA
VELOCIDADE_FALA = 1.3  # narração acelerada (pedido do dono do canal)
TEMPO_RESPOSTA = 5  # segundos para o público pensar
LETRAS = "ABCDE"

VERDE, VERDE_ESCURO = (88, 204, 2), (70, 160, 0)
AZUL, AMARELO, VERMELHO = (28, 176, 246), (255, 200, 0), (255, 75, 75)
BRANCO, TEXTO, AZUL_NOITE = (255, 255, 255), (30, 30, 30), (12, 22, 56)

# Área segura: os botões do TikTok ficam à direita (de y≈900 para baixo) e a legenda do post
# ocupa a parte de baixo. As alternativas terminam em x=900 e y≈1400.
MX, LIMITE_X = 60, 900


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
        topo_cartao = 400
        y = topo_cartao + self.cartao.height + 36
        altura = int(min(112, (1400 - y - 4 * 18) / 5))
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
        abertura = cena.tipo == "abertura"
        colar(tela, pecas["logo_grande"], LARGURA / 2, 560, escala=pulo(lt / 0.45))
        linhas = pecas["titulo"] if abertura else pecas["final"]
        y = 820
        k = 0
        for linha in linhas:
            for figura, dx in linha:
                k += 1
                progresso = (lt - 0.3 - k * 0.12) / 0.3
                colar(tela, figura, LARGURA / 2 + dx, y, escala=pulo(progresso),
                      opacidade=limitar(progresso * 3))
            y += 135
        if abertura:
            colar(tela, pecas["subtitulo"], LARGURA / 2, y + 40, opacidade=suave((lt - 1.0) / 0.4))
        else:
            batida = 1 + 0.05 * math.sin(lt * 7)
            colar(tela, pecas["baixe"], LARGURA / 2, y + 60,
                  escala=pulo((lt - 0.9) / 0.4) * batida)
            colar(tela, pecas["link"], LARGURA / 2, y + 190, opacidade=suave((lt - 1.3) / 0.4))
        return tela

    # Barra do topo (logo do app) e bolinhas de progresso
    colar(tela, pecas["barra_topo"], MX + pecas["barra_topo"].width / 2, 200)
    p = cena.pergunta
    for i in range(total):
        cx, cy, r = LARGURA - MX - 20 - (total - 1 - i) * 44, 200, 13
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
          315, opacidade=opacidade * limitar(entrada / 0.2))
    escala_cartao = 0.85 + 0.15 * pulo((entrada - 0.05) / 0.4)
    colar(tela, p.cartao, LARGURA / 2 + deslocamento + tremida, 400 + p.cartao.height / 2,
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
        cx, cy, r = LARGURA - MX - 62, 315, 62
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

def linhas_de_palavras(texto: str, tamanho: int, cor_destaque: str = "") -> list:
    """Quebra um título em linhas de figuras (uma por palavra) para animar palavra por palavra."""
    letra = fonte(tamanho)
    resultado = []
    for linha in quebrar(texto, letra, LARGURA - 2 * MX - 40):
        figuras = [texto_figura(p, tamanho, AMARELO if p == cor_destaque else BRANCO, contorno=5)
                   for p in linha.split()]
        espaco = tamanho * 0.28
        largura = sum(f.width for f in figuras) + espaco * (len(figuras) - 1)
        x, itens = -largura / 2, []
        for f in figuras:
            itens.append((f, x + f.width / 2))
            x += f.width + espaco
        resultado.append(itens)
    return resultado


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
        efeitos.append((0.05, tom(660, 0.12, 0.2)))
        audio.extend(fala)
        silencio(0.4)
        cenas.append(Cena("abertura", 0, agora()))
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
            certa = d["alternativas"][d["certa"]]
            silencio(0.2)
            audio.extend(await narrar(f"Letra {LETRAS[d['certa']]}! {certa}. {d['explicacao']}",
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
        pecas = {
            "logo_grande": logo(300),
            "barra_topo": barra_topo(),
            "titulo": linhas_de_palavras(quiz["titulo_tela"], 96, quiz.get("destaque", "")),
            "subtitulo": pilula(quiz["subtitulo_tela"], 40, (255, 255, 255, 230)),
            "final": linhas_de_palavras("Quantas você acertou?", 96, "acertou?"),
            "baixe": pilula("BAIXE O APP ESTUDOS", 52, VERDE, BRANCO, 50),
            "link": pilula("+4.900 questões grátis  •  link no perfil", 38, (255, 255, 255, 230)),
            "numeros": {str(i): texto_figura(str(i), 64) for i in range(1, TEMPO_RESPOSTA + 1)},
            "confete": {p.numero: Confete((MX + LIMITE_X) / 2, p.y_alternativas[p.dados["certa"]],
                                          p.numero) for p in perguntas},
        }

        # 3) Vídeo: fundo de estudo desfocado + quadros animados + áudio
        fundos = sorted(PASTA_FUNDOS.glob("*.mp4"))
        fundo = fundos[sum(map(ord, arquivo.stem)) % len(fundos)]
        filtro = (f"[0:v]scale={LARGURA}:{ALTURA},gblur=sigma=28,eq=brightness=-0.12:saturation=0.7,"
                  f"drawbox=color=0x0C1638@0.55:t=fill,fps={QUADROS}[fundo];"
                  f"[fundo][1:v]overlay=format=auto,format=yuv420p[video]")
        ffmpeg = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error", "-stream_loop", "-1", "-i", str(fundo),
             "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{LARGURA}x{ALTURA}", "-r", str(QUADROS),
             "-i", "-", "-f", "s16le", "-ac", "1", "-ar", str(TAXA), "-i", str(temp / "audio.raw"),
             "-filter_complex", filtro, "-map", "[video]", "-map", "2:a",
             "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-maxrate", "2000k",
             "-bufsize", "4000k", "-c:a", "aac", "-b:a", "128k", "-ar", "44100",
             "-t", f"{duracao:.2f}", "-movflags", "+faststart", str(saida / "video.mp4")],
            stdin=subprocess.PIPE)
        for q in range(int(duracao * QUADROS) + 1):
            ffmpeg.stdin.write(desenhar_quadro(q / QUADROS, cenas, total, quiz, pecas).tobytes())
        ffmpeg.stdin.close()
        if ffmpeg.wait() != 0:
            raise RuntimeError("o ffmpeg falhou ao montar o vídeo")

    (saida / "postagem.txt").write_text(f"""Arquivo: video.mp4 ({int(duracao // 60)}min{int(duracao % 60):02d}s)

Texto para colar no TikTok:
{quiz['titulo']} 🧠 Comenta quantas você acertou! 👇 Treine com +4.900 questões no app Estudos.
#enem #enem2026 #quiz #vestibular #estudos #perguntaserespostas

ANTES DE PUBLICAR:
- Em "Mais opções", ligue "Conteúdo gerado por IA" (a narração é feita por voz de IA).
""", encoding="utf-8")
    print(f"{arquivo.name}: vídeo pronto ({duracao:.0f} s)", flush=True)


async def main() -> None:
    arquivos = [Path(a).resolve() for a in sys.argv[1:]]
    if not arquivos:
        arquivos = [a for a in sorted(PASTA_QUIZZES.glob("*.json"))
                    if not (PASTA_SAIDA / a.stem / "video.mp4").exists()]
    for arquivo in arquivos:
        await fazer(arquivo)


if __name__ == "__main__":
    asyncio.run(main())
