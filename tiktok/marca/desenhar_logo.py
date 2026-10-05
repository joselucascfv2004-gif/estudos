"""Desenha a logo do app Estudos, no estilo "desenho técnico" escolhido pelo dono do projeto.

Fundo azul-claro com elementos de geometria (círculos de construção, linhas tracejadas, régua com
marcações e transferidor) e, no centro, um "E" de Estudos azul, com volume e brilho.

Gera em tiktok/marca/:
- logo-estudos.png: o ícone 1024x1024;
- logo-estudos-nome.png: o ícone com o nome "Estudos" ao lado, fundo transparente.
"""

import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

PASTA = Path(__file__).resolve().parent
FONTE = PASTA.parent / "fabrica" / "fontes" / "Poppins-ExtraBold.ttf"

FUNDO = (230, 244, 253)
LINHA = (142, 201, 240)
AZUL_ESCURO, AZUL_CLARO = (8, 112, 222), (150, 205, 250)
VERDE = (88, 204, 2)

E = 4  # desenha 4x maior e reduz no fim, para as bordas ficarem lisas


def tracejada(d: ImageDraw.ImageDraw, a, b, traco: float, espaco: float, largura: int, cor) -> None:
    (x1, y1), (x2, y2) = a, b
    comprimento = math.hypot(x2 - x1, y2 - y1)
    ux, uy = (x2 - x1) / comprimento, (y2 - y1) / comprimento
    pos = 0.0
    while pos < comprimento:
        fim = min(pos + traco, comprimento)
        d.line([(x1 + ux * pos, y1 + uy * pos), (x1 + ux * fim, y1 + uy * fim)], fill=cor,
               width=largura)
        pos += traco + espaco


def forma_e(t: int) -> Image.Image:
    """Máscara do "E": uma barra vertical e três horizontais, com cantos arredondados."""
    m = Image.new("L", (t, t), 0)
    d = ImageDraw.Draw(m)
    s = t / 1024
    r = int(46 * s)
    x0, x1 = 300 * s, 760 * s  # largura do E
    y0, y1 = 215 * s, 805 * s  # altura do E
    grossura = 150 * s
    d.rounded_rectangle((x0, y0, x0 + grossura, y1), r, fill=255)               # haste
    d.rounded_rectangle((x0, y0, x1, y0 + grossura), r, fill=255)               # barra de cima
    d.rounded_rectangle((x0, (y0 + y1) / 2 - grossura / 2, x1 - 70 * s,
                         (y0 + y1) / 2 + grossura / 2), r, fill=255)            # barra do meio
    d.rounded_rectangle((x0, y1 - grossura, x1, y1), r, fill=255)               # barra de baixo
    return m


def icone(tamanho: int = 1024) -> Image.Image:
    t = 1024 * E
    s = t / 1024
    img = Image.new("RGBA", (t, t), FUNDO + (255,))
    d = ImageDraw.Draw(img)
    lw = int(4 * s)

    # Quadriculado bem leve, como papel milimetrado
    for k in range(1, 16):
        v = k * 64 * s
        d.line([(v, 0), (v, t)], fill=(214, 235, 250), width=int(2 * s))
        d.line([(0, v), (t, v)], fill=(214, 235, 250), width=int(2 * s))

    # Círculos de construção e eixos tracejados
    c = t / 2
    for raio in (470, 305):
        d.ellipse((c - raio * s, c - raio * s, c + raio * s, c + raio * s), outline=LINHA, width=lw)
    tracejada(d, (c, 0), (c, t), 26 * s, 18 * s, lw, LINHA)
    tracejada(d, (0, 0), (t, t), 26 * s, 18 * s, lw, LINHA)
    tracejada(d, (t, 0), (0, t), 26 * s, 18 * s, lw, LINHA)
    d.line([(0, 805 * s), (t, 805 * s)], fill=LINHA, width=lw)  # linha de base do E

    # Transferidor no canto de baixo à esquerda (arco com marcações de 15 em 15 graus)
    cx, cy, raio = 120 * s, 900 * s, 230 * s
    d.arc((cx - raio, cy - raio, cx + raio, cy + raio), 270, 360, fill=LINHA, width=lw)
    for ang in range(0, 91, 15):
        a = math.radians(-ang)
        dentro = raio - (34 if ang % 45 == 0 else 20) * s
        d.line([(cx + dentro * math.cos(a), cy + dentro * math.sin(a)),
                (cx + raio * math.cos(a), cy + raio * math.sin(a))], fill=LINHA, width=lw)

    # Régua no topo, com marcações de milímetro e centímetro
    d.rounded_rectangle((70 * s, 40 * s, 954 * s, 110 * s), 14 * s, outline=LINHA, width=lw)
    for k in range(0, 89):
        x = 90 * s + k * 9.6 * s
        altura = 34 if k % 10 == 0 else (24 if k % 5 == 0 else 14)
        d.line([(x, 40 * s), (x, (40 + altura) * s)], fill=LINHA, width=int(3 * s))

    # Sombra do E
    mascara = forma_e(t)
    sombra = Image.new("RGBA", (t, t), (40, 90, 140, 0))
    sombra.putalpha(mascara.point(lambda v: int(v * 0.45)))
    sombra = ImageChops.offset(sombra, 0, int(26 * s)).filter(ImageFilter.GaussianBlur(30 * s))
    img = Image.alpha_composite(img, sombra)

    # E com degradê (escuro em cima e nas bordas, claro embaixo) e borda clara
    degrade = Image.new("RGBA", (t, t))
    dg = ImageDraw.Draw(degrade)
    for y in range(0, t, 4):
        k = min(1, max(0, (y / t - 0.2) / 0.62))
        cor = tuple(int(a + (b - a) * k) for a, b in zip(AZUL_ESCURO, AZUL_CLARO))
        dg.rectangle((0, y, t, y + 4), fill=cor + (255,))
    brilho_borda = mascara.filter(ImageFilter.GaussianBlur(26 * s))
    miolo = ImageChops.subtract(mascara, brilho_borda.point(lambda v: 255 - v))
    escuro = Image.new("RGBA", (t, t), AZUL_ESCURO + (255,))
    degrade = Image.composite(degrade, escuro, miolo.point(lambda v: min(255, int(v * 1.3))))
    degrade.putalpha(mascara)
    img = Image.alpha_composite(img, degrade)
    contorno = mascara.filter(ImageFilter.MaxFilter(9)).point(lambda v: 255 if v > 128 else 0)
    contorno = ImageChops.subtract(contorno, mascara)
    borda = Image.new("RGBA", (t, t), (120, 190, 245, 0))
    borda.putalpha(contorno.point(lambda v: int(v * 0.9)))
    img = Image.alpha_composite(img, borda)

    # Ponto de compasso verde (cor do app) onde as linhas de construção se cruzam
    d = ImageDraw.Draw(img)
    px, py, r = c, c, 22 * s
    d.ellipse((px - r, py - r, px + r, py + r), fill=FUNDO, outline=VERDE, width=int(7 * s))
    d.line([(px - 11 * s, py), (px + 11 * s, py)], fill=VERDE, width=int(6 * s))
    d.line([(px, py - 11 * s), (px, py + 11 * s)], fill=VERDE, width=int(6 * s))

    return img.resize((tamanho, tamanho), Image.LANCZOS)


def logo_com_nome(altura: int = 300, cor_nome=(255, 255, 255)) -> Image.Image:
    marca = icone(altura * 2).resize((altura, altura), Image.LANCZOS)
    cantos = Image.new("L", (altura, altura), 0)
    ImageDraw.Draw(cantos).rounded_rectangle((0, 0, altura - 1, altura - 1), int(altura * 0.22),
                                             fill=255)
    marca.putalpha(cantos)
    letra = ImageFont.truetype(str(FONTE), int(altura * 0.62))
    largura_nome = int(letra.getlength("Estudos"))
    img = Image.new("RGBA", (altura + int(altura * 0.18) + largura_nome, altura), (0, 0, 0, 0))
    img.paste(marca, (0, 0), marca)
    ImageDraw.Draw(img).text((altura + int(altura * 0.18), altura * 0.5), "Estudos", font=letra,
                             fill=cor_nome, anchor="lm")
    return img


if __name__ == "__main__":
    icone().save(PASTA / "logo-estudos.png")
    logo_com_nome().save(PASTA / "logo-estudos-nome.png")
    print("Logos salvas em", PASTA)
