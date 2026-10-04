# python3 prevs.py saida.png prev/*.png — põe as prévias lado a lado (até 4 por linha)
import sys
from PIL import Image, ImageDraw
out, arqs = sys.argv[1], sys.argv[2:]
ims = [Image.open(a).convert('L') for a in arqs]
cols = 4
W = max(i.width for i in ims)
linhas = [ims[i:i + cols] for i in range(0, len(ims), cols)]
H = sum(max(i.height for i in l) + 16 for l in linhas)
f = Image.new('L', (W * cols + 10 * (cols - 1), H), 255)
d = ImageDraw.Draw(f)
y = 0
k = 0
for l in linhas:
    for j, im in enumerate(l):
        d.text((j * (W + 10) + 2, y + 2), arqs[k].split('/')[-1], fill=0); k += 1
        f.paste(im, (j * (W + 10), y + 14))
    y += max(i.height for i in l) + 16
f.save(out)
