# recorte.py ANO DIA NUM IDX PAG X0 Y0 X1 Y1 — recorta um retângulo da página (pontos do PDF) como figura
# ...-qNNN-IDX.webp (por exemplo, imagem comum a duas questões, que fica fora da região de cada uma)
import sys, pymupdf
from PIL import Image
ano, dia, num, idx, pag = sys.argv[1:6]
x0, y0, x1, y1 = map(float, sys.argv[6:10])
pdf = f"../enem/{ano}_PV_impresso_{'D1_CD1' if dia == '1' else 'D2_CD5'}.pdf"
pix = pymupdf.open(pdf)[int(pag)].get_pixmap(dpi=170, clip=pymupdf.Rect(x0, y0, x1, y1), colorspace=pymupdf.csGRAY)
im = Image.frombytes('L', (pix.width, pix.height), pix.samples)
bb = Image.eval(im, lambda v: 255 - v).getbbox()
if bb: im = im.crop(bb)
nome = f'img{ano}/enem-{ano}-d{dia}-q{int(num):03d}-{idx}.webp'
im.save(nome, 'WEBP', quality=72); print(nome, im.size)
