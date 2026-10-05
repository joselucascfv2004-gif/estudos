"""Fábrica de vídeos de quiz ("Você passaria no ENEM?").

Cada arquivo em quiz/quizzes/*.json vira um vídeo vertical 1080x1920:
1. abertura com a chamada narrada;
2. para cada pergunta: a pergunta narrada com as 5 alternativas na tela, 5 segundos de contagem
   regressiva com "tique" a cada segundo e a resposta revelada em verde com uma explicação curta;
3. encerramento pedindo para comentar quantas a pessoa acertou.

As perguntas vêm do app Estudos (pasta estudos/conteudos), que tem gabarito e explicação conferidos.

Uso (dentro da pasta tiktok/):
    python3 quiz/fazer_quiz.py                         # todos os quizzes que ainda não têm vídeo
    python3 quiz/fazer_quiz.py quiz/quizzes/001-*.json # só os indicados (refaz se já existir)
"""

import array
import asyncio
import json
import math
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PASTA = Path(__file__).resolve().parent
sys.path.insert(0, str(PASTA.parent / "fabrica"))
import voz  # noqa: E402  (a mesma narração das histórias)

FONTE = PASTA.parent / "fabrica" / "fontes" / "Poppins-ExtraBold.ttf"
PASTA_QUIZZES = PASTA / "quizzes"
PASTA_SAIDA = PASTA.parent / "saida" / "quiz"

LARGURA, ALTURA, QUADROS = 1080, 1920, 30
TAXA = voz.TAXA
TEMPO_RESPOSTA = 5  # segundos de contagem regressiva
LETRAS = "ABCDE"

AZUL_ESCURO, AZUL = (12, 22, 56), (30, 64, 160)
AMARELO, VERDE, BRANCO, TEXTO = (255, 214, 10), (34, 197, 94), (255, 255, 255), (17, 17, 17)

# Área segura: os botões do TikTok ficam à direita (de y≈900 para baixo) e a legenda do post
# ocupa a parte de baixo da tela. Por isso as alternativas terminam em x=900 e y≈1420.
MARGEM_X, LIMITE_ALTERNATIVAS = 60, 900


def fonte(tamanho: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTE), tamanho)


def quebrar(texto: str, letra: ImageFont.FreeTypeFont, largura: int) -> list[str]:
    linhas, atual = [], ""
    for palavra in texto.split():
        tentativa = f"{atual} {palavra}".strip()
        if letra.getlength(tentativa) <= largura or not atual:
            atual = tentativa
        else:
            linhas.append(atual)
            atual = palavra
    return linhas + ([atual] if atual else [])


def fundo() -> Image.Image:
    imagem = Image.new("RGB", (LARGURA, ALTURA))
    desenho = ImageDraw.Draw(imagem)
    for y in range(ALTURA):
        t = y / ALTURA
        cor = tuple(int(a + (b - a) * t) for a, b in zip(AZUL_ESCURO, AZUL))
        desenho.line([(0, y), (LARGURA, y)], fill=cor)
    return imagem.convert("RGBA")


FUNDO = fundo()


def tela_cartao(texto: str, subtitulo: str = "") -> Image.Image:
    """Cartão branco grande no meio da tela (abertura e encerramento)."""
    imagem = FUNDO.copy()
    desenho = ImageDraw.Draw(imagem)
    letra, pequena = fonte(80), fonte(44)
    linhas = quebrar(texto, letra, 820)
    sub = quebrar(subtitulo, pequena, 820) if subtitulo else []
    altura = 120 + len(linhas) * 104 + (40 + len(sub) * 60 if sub else 0)
    y0 = 760 - altura // 2
    desenho.rounded_rectangle((MARGEM_X, y0, LARGURA - MARGEM_X, y0 + altura), 48, fill=BRANCO)
    y = y0 + 60
    for linha in linhas:
        desenho.text(((LARGURA - letra.getlength(linha)) / 2, y), linha, font=letra, fill=TEXTO)
        y += 104
    y += 40
    for linha in sub:
        desenho.text(((LARGURA - pequena.getlength(linha)) / 2, y), linha, font=pequena,
                     fill=(90, 90, 90))
        y += 60
    return imagem


def tela_pergunta(p: dict, numero: int, total: int, estado: str, restante: float = 0) -> Image.Image:
    """estado: 'pergunta', 'tempo' (com contagem) ou 'resposta' (certa em verde)."""
    imagem = FUNDO.copy()
    camada = Image.new("RGBA", imagem.size, (0, 0, 0, 0))
    desenho = ImageDraw.Draw(camada)

    # Etiqueta "PERGUNTA 1/5 • BIOLOGIA"
    etiqueta = f"PERGUNTA {numero}/{total}  •  {p['materia'].upper()}"
    letra = fonte(38)
    largura = letra.getlength(etiqueta) + 60
    desenho.rounded_rectangle((MARGEM_X, 200, MARGEM_X + largura, 270), 35, fill=AMARELO)
    desenho.text((MARGEM_X + 30, 212), etiqueta, font=letra, fill=TEXTO)

    # Contagem regressiva: número no círculo e barra que diminui
    if estado == "tempo":
        cx, cy, r = LARGURA - MARGEM_X - 50, 235, 50
        desenho.ellipse((cx - r, cy - r, cx + r, cy + r), fill=BRANCO)
        numero_txt, letra_n = str(max(1, math.ceil(restante))), fonte(56)
        desenho.text((cx - letra_n.getlength(numero_txt) / 2, cy - 40), numero_txt, font=letra_n,
                     fill=TEXTO)
        desenho.rounded_rectangle((MARGEM_X, 300, LARGURA - MARGEM_X, 316), 8,
                                  fill=(255, 255, 255, 60))
        fim = MARGEM_X + (LARGURA - 2 * MARGEM_X) * restante / TEMPO_RESPOSTA
        if fim > MARGEM_X + 16:
            desenho.rounded_rectangle((MARGEM_X, 300, fim, 316), 8, fill=AMARELO)

    # Pergunta no cartão branco
    letra = fonte(54)
    linhas = quebrar(p.get("texto_tela", p["pergunta"]), letra, LARGURA - 2 * MARGEM_X - 100)
    altura = 90 + len(linhas) * 72
    y0 = 350
    desenho.rounded_rectangle((MARGEM_X, y0, LARGURA - MARGEM_X, y0 + altura), 40, fill=BRANCO)
    for n, linha in enumerate(linhas):
        desenho.text((MARGEM_X + 50, y0 + 45 + n * 72), linha, font=letra, fill=TEXTO)

    # Alternativas
    letra, letra_l = fonte(44), fonte(42)
    y = y0 + altura + 40
    espaco = (1420 - y - 4 * 18) / 5  # altura de cada caixa para caber até y≈1420
    caixa_h = min(120, espaco)
    for n, alternativa in enumerate(p["alternativas"]):
        certa = n == p["certa"]
        if estado == "resposta" and certa:
            fundo_caixa, cor_texto, cor_letra = VERDE + (255,), BRANCO, VERDE
        elif estado == "resposta":
            fundo_caixa, cor_texto, cor_letra = (255, 255, 255, 18), (255, 255, 255, 110), AZUL
        else:
            fundo_caixa, cor_texto, cor_letra = (255, 255, 255, 40), BRANCO, AZUL
        desenho.rounded_rectangle((MARGEM_X, y, LIMITE_ALTERNATIVAS, y + caixa_h), 28,
                                  fill=fundo_caixa)
        r = caixa_h * 0.32
        cx, cy = MARGEM_X + 30 + r, y + caixa_h / 2
        desenho.ellipse((cx - r, cy - r, cx + r, cy + r), fill=BRANCO)
        desenho.text((cx - letra_l.getlength(LETRAS[n]) / 2, cy - 30), LETRAS[n], font=letra_l,
                     fill=cor_letra)
        texto = alternativa
        while letra.getlength(texto) > LIMITE_ALTERNATIVAS - cx - r - 60 and len(texto) > 3:
            texto = texto[:-2] + "…"
        desenho.text((cx + r + 25, cy - 32), texto, font=letra, fill=cor_texto)
        if estado == "resposta" and certa:  # sinal de "certo"
            x1 = LIMITE_ALTERNATIVAS - 70
            desenho.line([(x1, cy), (x1 + 16, cy + 16), (x1 + 44, cy - 18)], fill=BRANCO, width=10)
        y += caixa_h + 18

    return Image.alpha_composite(imagem, camada)


def tom(frequencia: float, duracao: float, volume: float = 0.3) -> array.array:
    """Um bipe curto (tique do relógio e som da resposta)."""
    n = int(duracao * TAXA)
    return array.array("h", (
        int(32767 * volume * math.sin(2 * math.pi * frequencia * i / TAXA)
            * min(1, i / 200, (n - i) / 600)) for i in range(n)))


class Linha:
    """Junta áudio e imagens na mesma linha do tempo."""

    def __init__(self, temp: Path):
        self.temp = temp
        self.audio = array.array("h")
        self.cenas: list[tuple[Path, float]] = []
        self.efeitos: list[tuple[float, array.array]] = []
        self.contador = 0

    @property
    def agora(self) -> float:
        return len(self.audio) / TAXA

    def imagem(self, figura: Image.Image) -> Path:
        self.contador += 1
        caminho = self.temp / f"q{self.contador:04d}.png"
        figura.convert("RGB").save(caminho)
        return caminho

    async def falar(self, texto: str, nome_voz: str, figura: Image.Image, folga: float) -> None:
        mp3 = self.temp / f"fala{self.contador}.mp3"
        await voz.narrar(texto, nome_voz, mp3)
        cru = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(mp3), "-f", "s16le",
                              "-ac", "1", "-ar", str(TAXA), "-"], capture_output=True,
                             check=True).stdout
        inicio = self.agora
        self.audio.frombytes(cru)
        self.silencio(folga)
        self.cenas.append((self.imagem(figura), self.agora - inicio))

    def silencio(self, segundos: float) -> None:
        self.audio.extend([0] * int(segundos * TAXA))

    def contagem(self, p: dict, numero: int, total: int) -> None:
        passo = 0.1
        for k in range(int(TEMPO_RESPOSTA / passo)):
            restante = TEMPO_RESPOSTA - k * passo
            if k % 10 == 0:
                self.efeitos.append((self.agora + k * passo, tom(1200, 0.05)))
            self.cenas.append((self.imagem(tela_pergunta(p, numero, total, "tempo", restante)), passo))
        self.silencio(TEMPO_RESPOSTA)

    def misturar(self) -> array.array:
        audio = array.array("h", self.audio)
        for inicio, som in self.efeitos:
            i0 = int(inicio * TAXA)
            for i, amostra in enumerate(som):
                if i0 + i < len(audio):
                    audio[i0 + i] = max(-32768, min(32767, audio[i0 + i] + amostra))
        return audio


async def fazer(arquivo: Path) -> None:
    quiz = json.loads(arquivo.read_text(encoding="utf-8"))
    saida = PASTA_SAIDA / arquivo.stem
    saida.mkdir(parents=True, exist_ok=True)
    nome_voz, total = quiz["voz"], len(quiz["perguntas"])
    with tempfile.TemporaryDirectory() as temporaria:
        linha = Linha(Path(temporaria))
        await linha.falar(quiz["chamada"], nome_voz,
                          tela_cartao(quiz["titulo"], "Comenta quantas você acertou!"), 0.5)
        for numero, p in enumerate(quiz["perguntas"], start=1):
            await linha.falar(f"Pergunta {numero}. {p['pergunta']}", nome_voz,
                              tela_pergunta(p, numero, total, "pergunta"), 0.2)
            linha.contagem(p, numero, total)
            certa = p["alternativas"][p["certa"]]
            linha.efeitos.append((linha.agora, tom(880, 0.12, 0.25)))
            linha.efeitos.append((linha.agora + 0.12, tom(1320, 0.2, 0.25)))
            await linha.falar(f"Resposta: letra {LETRAS[p['certa']]}. {certa}. {p['explicacao']}",
                              nome_voz, tela_pergunta(p, numero, total, "resposta"), 0.7)
        await linha.falar(quiz["encerramento"], nome_voz,
                          tela_cartao("Quantas você acertou?", "Comenta aí e segue para o próximo teste"),
                          0.8)

        temp = Path(temporaria)
        (temp / "audio.raw").write_bytes(linha.misturar().tobytes())
        lista = ["ffconcat version 1.0"]
        for caminho, duracao in linha.cenas:
            lista += [f"file '{caminho}'", f"duration {duracao:.3f}"]
        lista.append(f"file '{linha.cenas[-1][0]}'")
        (temp / "lista.txt").write_text("\n".join(lista) + "\n", encoding="utf-8")
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
             "-i", str(temp / "lista.txt"), "-f", "s16le", "-ac", "1", "-ar", str(TAXA),
             "-i", str(temp / "audio.raw"), "-vf", f"fps={QUADROS},format=yuv420p",
             "-c:v", "libx264", "-preset", "medium", "-crf", "22", "-maxrate", "1100k",
             "-bufsize", "2200k", "-c:a", "aac", "-b:a", "128k", "-ar", "44100",
             "-t", f"{linha.agora:.2f}", "-movflags", "+faststart", str(saida / "video.mp4")],
            check=True)
    duracao = linha.agora
    (saida / "postagem.txt").write_text(f"""Arquivo: video.mp4 ({int(duracao // 60)}min{int(duracao % 60):02d}s)

Texto para colar no TikTok:
{quiz['titulo']} 🧠 Comenta quantas você acertou! 👇
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
