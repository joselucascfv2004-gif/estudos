# altfaixas.py ANO DIA NUM — recorta cada alternativa como faixa da página (do marcador até a próxima),
# para alternativas desenhadas com texto e traços misturados. Gera ...-qNNN-11.webp (A) a -15.webp (E).
import json, sys, pymupdf
from PIL import Image
ano, dia, num = sys.argv[1], sys.argv[2], int(sys.argv[3])
modo = (sys.argv[4:] or ['topo'])[0]
# faixas=Y0-Y1,Y0-Y1,... dá a altura (em pontos do PDF) de cada alternativa, na ordem A–E
faixas = [tuple(map(float, f.split('-'))) for f in sys.argv[5].split(',')] if modo == 'faixas' else None  # topo: desenho abaixo do marcador; centro: centrado nele; acima: desenho acima da linha do marcador
q = [q for q in json.load(open(f'{ano}_D{dia}_fig.json')) if q['num'] == num and not q['rep']][0]
pdf = f"../enem/{ano}_PV_impresso_{'D1_CD1' if dia == '1' else 'D2_CD5'}.pdf"
doc = pymupdf.open(pdf)
alts = q['alts']
for i, a in enumerate(alts):
    s = q['segs'][a['k']]
    pg = doc[s['p']]
    x0 = a.get('x', s['x0']) + 15
    mesmos = [b for b in alts if b['k'] == a['k'] and b is not a]
    # alternativas em grade: limite à direita é a próxima da mesma linha; em cima e embaixo, o meio
    # do caminho até as vizinhas da mesma coluna (o desenho fica centrado no marcador)
    dir_ = [b['x'] - 7 for b in mesmos if 'x' in b and abs(b['y'] - a['y']) < 12 and b['x'] > a.get('x', 0)]
    col = sorted([b['y'] for b in mesmos if abs(b.get('x', 0) - a.get('x', 0)) < 40] + [a['y']])
    passo = min([b - c for b, c in zip(col[1:], col)] or [60])
    i_ = col.index(a['y'])
    c = a['y'] + 5
    if faixas:
        y0, y1 = faixas[i]
    elif modo == 'acima':
        y0 = col[i_ - 1] + 13 if i_ else max(s['y0'], a['y'] - passo)
        y1 = a['y'] + 13
    elif modo == 'centro':
        y0 = (col[i_ - 1] + a['y']) / 2 + 5 if i_ else max(s['y0'], c - passo / 2)
        y1 = (col[i_ + 1] + a['y']) / 2 + 5 if i_ + 1 < len(col) else min(s['y1'], c + passo / 2)
    else:
        y0 = a['y'] - 3
        y1 = col[i_ + 1] - 3 if i_ + 1 < len(col) else s['y1']
    x1 = min(dir_ + [s['x1']])
    clip = pymupdf.Rect(x0, y0, x1, y1)
    pix = pg.get_pixmap(dpi=170, clip=clip, colorspace=pymupdf.csGRAY)
    im = Image.frombytes('L', (pix.width, pix.height), pix.samples)
    bb = Image.eval(im, lambda v: 255 - v).getbbox()
    if bb: im = im.crop((max(0, bb[0] - 6), max(0, bb[1] - 6), min(im.width, bb[2] + 6), min(im.height, bb[3] + 6)))
    nome = f'img{ano}/enem-{ano}-d{dia}-q{num:03d}-{11 + i}.webp'
    im.save(nome, 'WEBP', quality=72); print(nome, im.size)
