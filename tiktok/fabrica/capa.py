"""Desenha a capa do início do vídeo: um cartão branco com a frase chamativa da história.

A capa aparece por cima do fundo enquanto a narração lê essa frase, e o primeiro quadro do vídeo
(que o TikTok usa como miniatura) já mostra o cartão.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

PASTA_FONTES = Path(__file__).resolve().parent / "fontes"
FONTE = PASTA_FONTES / "Poppins-ExtraBold.ttf"

LARGURA_TELA, ALTURA_TELA = 1080, 1920
LARGURA_CARTAO = 840  # longe das bordas, que alguns celulares cortam
MARGEM = 60  # espaço entre a borda do cartão e o texto
CANTO = 44
CENTRO_Y = 680  # acima do meio, longe das abas do topo, dos botões e da legenda do TikTok


def _quebrar(texto: str, fonte: ImageFont.FreeTypeFont, largura: int) -> list[str]:
    linhas, atual = [], ""
    for palavra in texto.split():
        tentativa = f"{atual} {palavra}".strip()
        if fonte.getlength(tentativa) <= largura or not atual:
            atual = tentativa
        else:
            linhas.append(atual)
            atual = palavra
    if atual:
        linhas.append(atual)
    return linhas


def desenhar_capa(frase: str, saida: Path) -> None:
    """Salva em `saida` um PNG transparente do tamanho da tela com o cartão da capa."""
    largura_texto = LARGURA_CARTAO - 2 * MARGEM
    # Diminui a letra até a frase caber em no máximo 6 linhas
    for tamanho in range(76, 40, -4):
        fonte = ImageFont.truetype(str(FONTE), tamanho)
        linhas = _quebrar(frase, fonte, largura_texto)
        if len(linhas) <= 6:
            break
    altura_linha = int(tamanho * 1.28)
    altura_cartao = 2 * MARGEM + altura_linha * len(linhas)
    x0 = (LARGURA_TELA - LARGURA_CARTAO) // 2
    y0 = CENTRO_Y - altura_cartao // 2
    caixa = (x0, y0, x0 + LARGURA_CARTAO, y0 + altura_cartao)

    tela = Image.new("RGBA", (LARGURA_TELA, ALTURA_TELA), (0, 0, 0, 0))

    sombra = Image.new("RGBA", tela.size, (0, 0, 0, 0))
    ImageDraw.Draw(sombra).rounded_rectangle(
        (caixa[0], caixa[1] + 14, caixa[2], caixa[3] + 14), CANTO, fill=(0, 0, 0, 120))
    tela = Image.alpha_composite(tela, sombra.filter(ImageFilter.GaussianBlur(18)))

    desenho = ImageDraw.Draw(tela)
    desenho.rounded_rectangle(caixa, CANTO, fill=(255, 255, 255, 255))
    for n, linha in enumerate(linhas):
        largura = fonte.getlength(linha)
        desenho.text(((LARGURA_TELA - largura) / 2, y0 + MARGEM + n * altura_linha), linha,
                     font=fonte, fill=(17, 17, 17, 255))
    tela.save(saida)
