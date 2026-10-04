# dividir.py ANO DIA NUM [FIG] — divide a figura FIG (padrão 1) da questão em 5 partes empilhadas
# (alternativas A–E em uma única imagem), cortando nas faixas brancas. Gera ...-qNNN-11 a -15.
import sys
from PIL import Image
ano, dia, num = sys.argv[1:4]
fig = sys.argv[4] if len(sys.argv) > 4 else '1'
base = f'img{ano}/enem-{ano}-d{dia}-q{int(num):03d}'
im = Image.open(f'{base}-{fig}.webp').convert('L')
W, H = im.size
px = im.load()
branca = [all(px[x, y] > 235 for x in range(0, W, 2)) for y in range(H)]
# faixas brancas maiores: candidatas a corte
gaps, y = [], 0
while y < H:
    if branca[y]:
        y0 = y
        while y < H and branca[y]: y += 1
        if y0 > 0 and y < H: gaps.append((y - y0, (y0 + y) // 2))
    else: y += 1
cortes = sorted(c for _, c in sorted(gaps, reverse=True)[:4])
lim = [0] + cortes + [H]
for i in range(5):
    p = im.crop((0, lim[i], W, lim[i + 1]))
    bb = Image.eval(p, lambda v: 255 - v).getbbox()
    if bb: p = p.crop((0, max(0, bb[1] - 4), W, min(p.height, bb[3] + 4)))
    p.save(f'{base}-{11 + i}.webp', 'WEBP', quality=72); print(f'{base}-{11 + i}.webp', p.size)
