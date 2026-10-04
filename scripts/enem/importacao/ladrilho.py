# ladrilho.py FOLHA SAIDA — corta uma folha alta em colunas lado a lado (para revisar de uma vez)
import sys
from PIL import Image
im = Image.open(sys.argv[1]); H = 2400
n = (im.height + H - 1) // H
cols = [im.crop((0, i * H, im.width, min(im.height, (i + 1) * H))) for i in range(n)]
for j in range(0, n, 5):
    grp = cols[j:j + 5]
    out = Image.new('RGB', (len(grp) * (im.width + 20), H), 'white')
    for k, c in enumerate(grp):
        out.paste(c, (k * (im.width + 20), 0))
    out.save(f'{sys.argv[2]}-{j // 5 + 1}.png'); print(f'{sys.argv[2]}-{j // 5 + 1}.png')
