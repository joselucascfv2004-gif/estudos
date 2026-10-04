# python3 folha.py saida.png arquivos.webp... — junta recortes numa folha para revisão
import sys
from PIL import Image, ImageDraw
out, arqs = sys.argv[1], sys.argv[2:]
ims = [Image.open(a).convert('RGB') for a in arqs]
W = 700
linhas = []
for a, im in zip(arqs, ims):
    if im.width > W:
        im = im.resize((W, int(im.height * W / im.width)))
    linhas.append((a.split('/')[-1], im))
H = sum(im.height + 22 for _, im in linhas)
folha = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(folha)
y = 0
for nome, im in linhas:
    d.rectangle([0, y, W, y + 18], fill=(255, 230, 150))
    d.text((4, y + 3), nome, fill='black')
    folha.paste(im, (0, y + 20))
    y += im.height + 22
folha.save(out)
