"""Desenha a logo do app Estudos (proposta), nas cores do app (estudos/app/src/ui/tema.ts).

Gera em tiktok/marca/:
- logo-estudos.png: o ícone (quadrado arredondado verde com livro aberto e um "certo" amarelo);
- logo-estudos-nome.png: o ícone com o nome "Estudos" ao lado, fundo transparente.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

PASTA = Path(__file__).resolve().parent
FONTE = PASTA.parent / "fabrica" / "fontes" / "Poppins-ExtraBold.ttf"

VERDE, VERDE_ESCURO = (88, 204, 2), (88, 167, 0)
AZUL, AMARELO, BRANCO = (28, 176, 246), (255, 200, 0), (255, 255, 255)
PAGINA_SOMBRA = (221, 244, 255)


def icone(tamanho: int = 1024) -> Image.Image:
    escala = 4  # desenha grande e reduz, para as bordas ficarem lisas
    t = tamanho * escala
    img = Image.new("RGBA", (t, t), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    canto = int(t * 0.23)
    # Base escura embaixo dá o efeito de "botão" do app
    d.rounded_rectangle((0, int(t * 0.04), t, t), canto, fill=VERDE_ESCURO)
    d.rounded_rectangle((0, 0, t, int(t * 0.955)), canto, fill=VERDE)

    def p(x, y):
        return (int(x * t), int(y * t))

    # Livro aberto: duas páginas brancas com a lombada no meio
    sombra = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(sombra).polygon(
        [p(.17, .40), p(.50, .47), p(.83, .40), p(.83, .80), p(.50, .87), p(.17, .80)],
        fill=(0, 80, 0, 90))
    img = Image.alpha_composite(img, sombra.filter(ImageFilter.GaussianBlur(t * 0.015)))
    d = ImageDraw.Draw(img)
    d.polygon([p(.15, .36), p(.495, .43), p(.495, .82), p(.15, .75)], fill=BRANCO)
    d.polygon([p(.505, .43), p(.85, .36), p(.85, .75), p(.505, .82)], fill=PAGINA_SOMBRA)
    d.line([p(.50, .43), p(.50, .82)], fill=AZUL, width=int(t * 0.018))
    # Linhas de texto nas páginas
    for i in range(3):
        y = .50 + i * .075
        d.line([p(.22, y), p(.43, y + .03)], fill=AZUL, width=int(t * 0.016))
        d.line([p(.57, y + .03), p(.78, y)], fill=AZUL, width=int(t * 0.016))
    # "Certo" amarelo saindo do livro
    largura = int(t * 0.075)
    pontos = [p(.33, .22), p(.45, .32), p(.69, .10)]
    d.line(pontos, fill=AMARELO, width=largura, joint="curve")
    for x, y in (pontos[0], pontos[2]):
        r = largura // 2
        d.ellipse((x - r, y - r, x + r, y + r), fill=AMARELO)
    return img.resize((tamanho, tamanho), Image.LANCZOS)


def logo_com_nome(altura: int = 300) -> Image.Image:
    marca = icone(altura)
    letra = ImageFont.truetype(str(FONTE), int(altura * 0.62))
    largura_nome = int(letra.getlength("Estudos"))
    img = Image.new("RGBA", (altura + int(altura * 0.18) + largura_nome, altura), (0, 0, 0, 0))
    img.paste(marca, (0, 0), marca)
    ImageDraw.Draw(img).text((altura + int(altura * 0.18), altura * 0.5), "Estudos", font=letra,
                             fill=BRANCO, anchor="lm")
    return img


if __name__ == "__main__":
    icone().save(PASTA / "logo-estudos.png")
    logo_com_nome().save(PASTA / "logo-estudos-nome.png")
    print("Logos salvas em", PASTA)
