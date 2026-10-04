# altfaixas.py ANO DIA NUM — recorta cada alternativa como faixa da página (do marcador até a próxima),
# para alternativas desenhadas com texto e traços misturados. Gera ...-qNNN-11.webp (A) a -15.webp (E).
import json, sys, pymupdf
from PIL import Image
ano, dia, num = sys.argv[1], sys.argv[2], int(sys.argv[3])
q = [q for q in json.load(open(f'{ano}_D{dia}_fig.json')) if q['num'] == num and not q['rep']][0]
pdf = f"../enem/{ano}_PV_impresso_{'D1_CD1' if dia == '1' else 'D2_CD5'}.pdf"
doc = pymupdf.open(pdf)
alts = q['alts']
for i, a in enumerate(alts):
    s = q['segs'][a['k']]
    pg = doc[s['p']]
    y0 = a['y'] - 3
    y1 = alts[i + 1]['y'] - 3 if i + 1 < len(alts) and alts[i + 1]['k'] == a['k'] else s['y1']
    clip = pymupdf.Rect(s['x0'] + 18, y0, s['x1'], y1)
    pix = pg.get_pixmap(dpi=170, clip=clip, colorspace=pymupdf.csGRAY)
    im = Image.frombytes('L', (pix.width, pix.height), pix.samples)
    bb = Image.eval(im, lambda v: 255 - v).getbbox()
    if bb: im = im.crop((max(0, bb[0] - 6), max(0, bb[1] - 6), min(im.width, bb[2] + 6), min(im.height, bb[3] + 6)))
    nome = f'img{ano}/enem-{ano}-d{dia}-q{num:03d}-{11 + i}.webp'
    im.save(nome, 'WEBP', quality=72); print(nome, im.size)
