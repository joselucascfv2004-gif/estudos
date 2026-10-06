"""Desenha os ícones do app a partir da logo do Estudos (estilo "desenho técnico" com a letra E).

Fundo azul-claro com elementos de geometria (círculos de construção, linhas tracejadas, régua e
transferidor) e, no centro, um "E" azul com volume e brilho, com o ponto de compasso verde do app.

Gera em app/assets/:
- icon.png (1024): ícone completo (iPhone e lista de apps);
- android-icon-background.png e android-icon-foreground.png (1024): as duas camadas do ícone
  adaptável do Android. O Android mostra só o miolo (2/3) da imagem, então o desenho é feito numa
  escala menor e o fundo continua até as bordas;
- android-icon-monochrome.png (1024): só o E, para o ícone temático (Android 13+);
- splash-icon.png (1024): o E da tela de abertura, sobre o fundo azul-claro;
- favicon.png (48): ícone da versão web.

Uso: python3 scripts/marca/desenhar_icones.py
"""

import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ASSETS = Path(__file__).resolve().parents[2] / "app" / "assets"

FUNDO = (230, 244, 253)
GRADE = (214, 235, 250)
LINHA = (142, 201, 240)
AZUL_ESCURO, AZUL_CLARO = (8, 112, 222), (150, 205, 250)
VERDE = (88, 204, 2)

SUPER = 4  # desenha 4x maior e reduz no fim, para as bordas ficarem lisas
ZOOM_ANDROID = 2 / 3  # parte visível do ícone adaptável


class Tela:
    """Converte coordenadas do desenho (0 a 1024) em pixels, com zoom em torno do centro."""

    def __init__(self, tamanho: int, zoom: float):
        self.t = tamanho * SUPER
        self.s = self.t / 1024 * zoom
        self.o = self.t / 2 - 512 * self.s

    def p(self, x: float, y: float) -> tuple[float, float]:
        return self.o + x * self.s, self.o + y * self.s

    def caixa(self, x0: float, y0: float, x1: float, y1: float) -> tuple[float, float, float, float]:
        return (*self.p(x0, y0), *self.p(x1, y1))

    def n(self, v: float) -> int:
        return max(1, int(v * self.s))


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


def fundo(tela: Tela) -> Image.Image:
    """Papel milimetrado com os traços de construção. Se o zoom for menor que 1, tudo continua
    até as bordas da imagem."""
    t, s = tela.t, tela.s
    img = Image.new("RGBA", (t, t), FUNDO + (255,))
    d = ImageDraw.Draw(img)
    lw = tela.n(4)
    extra = int(tela.o / s / 64) + 2  # quantas linhas da grade cabem fora do quadrado original

    for k in range(-extra, 17 + extra):
        x, _ = tela.p(k * 64, 0)
        d.line([(x, 0), (x, t)], fill=GRADE, width=tela.n(2))
        d.line([(0, x), (t, x)], fill=GRADE, width=tela.n(2))

    c = t / 2
    for raio in (470, 305):
        d.ellipse((c - raio * s, c - raio * s, c + raio * s, c + raio * s), outline=LINHA, width=lw)
    tracejada(d, (c, 0), (c, t), 26 * s, 18 * s, lw, LINHA)
    tracejada(d, (0, 0), (t, t), 26 * s, 18 * s, lw, LINHA)
    tracejada(d, (t, 0), (0, t), 26 * s, 18 * s, lw, LINHA)
    _, base = tela.p(0, 805)
    d.line([(0, base), (t, base)], fill=LINHA, width=lw)  # linha de base do E

    # Transferidor no canto de baixo à esquerda (marcações de 15 em 15 graus)
    (cx, cy), raio = tela.p(120, 900), 230 * s
    d.arc((cx - raio, cy - raio, cx + raio, cy + raio), 270, 360, fill=LINHA, width=lw)
    for ang in range(0, 91, 15):
        a = math.radians(-ang)
        dentro = raio - (34 if ang % 45 == 0 else 20) * s
        d.line([(cx + dentro * math.cos(a), cy + dentro * math.sin(a)),
                (cx + raio * math.cos(a), cy + raio * math.sin(a))], fill=LINHA, width=lw)

    # Régua no topo, com marcações de milímetro e centímetro
    d.rounded_rectangle(tela.caixa(70, 40, 954, 110), 14 * s, outline=LINHA, width=lw)
    for k in range(0, 89):
        x = 90 + k * 9.6
        altura = 34 if k % 10 == 0 else (24 if k % 5 == 0 else 14)
        d.line([tela.p(x, 40), tela.p(x, 40 + altura)], fill=LINHA, width=tela.n(3))
    return img


def forma_e(tela: Tela) -> Image.Image:
    """Máscara do "E": uma haste e três barras, com cantos arredondados."""
    m = Image.new("L", (tela.t, tela.t), 0)
    d = ImageDraw.Draw(m)
    r = tela.n(46)
    x0, x1, y0, y1, g = 300, 760, 215, 805, 150
    meio = (y0 + y1) / 2
    d.rounded_rectangle(tela.caixa(x0, y0, x0 + g, y1), r, fill=255)                  # haste
    d.rounded_rectangle(tela.caixa(x0, y0, x1, y0 + g), r, fill=255)                  # cima
    d.rounded_rectangle(tela.caixa(x0, meio - g / 2, x1 - 70, meio + g / 2), r, fill=255)  # meio
    d.rounded_rectangle(tela.caixa(x0, y1 - g, x1, y1), r, fill=255)                  # baixo
    return m


def letra(tela: Tela) -> Image.Image:
    """O E com sombra, degradê, borda clara e o ponto de compasso verde, em fundo transparente."""
    t, s = tela.t, tela.s
    img = Image.new("RGBA", (t, t), (0, 0, 0, 0))
    mascara = forma_e(tela)

    sombra = Image.new("RGBA", (t, t), (40, 90, 140, 0))
    sombra.putalpha(mascara.point(lambda v: int(v * 0.45)))
    sombra = ImageChops.offset(sombra, 0, int(26 * s)).filter(ImageFilter.GaussianBlur(30 * s))
    img = Image.alpha_composite(img, sombra)

    degrade = Image.new("RGBA", (t, t))
    dg = ImageDraw.Draw(degrade)
    topo, _ = tela.p(0, 0)
    for y in range(0, t, 4):
        k = min(1, max(0, ((y - topo) / (1024 * s) - 0.2) / 0.62))
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

    d = ImageDraw.Draw(img)
    (px, py), r = tela.p(512, 512), 22 * s
    d.ellipse((px - r, py - r, px + r, py + r), fill=FUNDO, outline=VERDE, width=tela.n(7))
    d.line([(px - 11 * s, py), (px + 11 * s, py)], fill=VERDE, width=tela.n(6))
    d.line([(px, py - 11 * s), (px, py + 11 * s)], fill=VERDE, width=tela.n(6))
    return img


def reduzir(img: Image.Image, tamanho: int) -> Image.Image:
    return img.resize((tamanho, tamanho), Image.LANCZOS)


def principal() -> None:
    cheio = Tela(1024, 1)
    icone = Image.alpha_composite(fundo(cheio), letra(cheio))
    reduzir(icone, 1024).convert("RGB").save(ASSETS / "icon.png")
    reduzir(icone, 48).save(ASSETS / "favicon.png")

    android = Tela(1024, ZOOM_ANDROID)
    reduzir(fundo(android), 1024).convert("RGB").save(ASSETS / "android-icon-background.png")
    reduzir(letra(android), 1024).save(ASSETS / "android-icon-foreground.png")
    mono = Image.new("RGBA", (android.t, android.t), (255, 255, 255, 0))
    mono.putalpha(forma_e(android))
    reduzir(mono, 1024).save(ASSETS / "android-icon-monochrome.png")

    reduzir(letra(cheio), 1024).save(ASSETS / "splash-icon.png")
    print("Ícones salvos em", ASSETS)


if __name__ == "__main__":
    principal()
