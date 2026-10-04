# vergb2010.py DIA NUM... — folha com a região de cada questão na prova corrigida (marca verde visível)
import re, sys, pymupdf
from PIL import Image
dia = sys.argv[1]; nums = set(sys.argv[2:])
doc = pymupdf.open(f'2010_GBPV_D{dia}.pdf')
partes = []
for p in doc:
    W, H = p.rect.width, p.rect.height
    cabs = []
    for b in p.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            t = ''.join(s['text'] for s in l['spans']).strip()
            m = re.match(r'^Quest[ãa]o\s+(\d+)', t)
            if m: cabs.append((m.group(1), l['bbox']))
    for n, bb in cabs:
        if n not in nums: continue
        col = bb[0] < W / 2
        x0, x1 = (0, W / 2) if col else (W / 2, W)
        prox = [c[1][1] for c in cabs if (c[1][0] < W / 2) == col and c[1][1] > bb[1]]
        y1 = min(prox) if prox else H - 30
        pix = p.get_pixmap(dpi=90, clip=pymupdf.Rect(x0, bb[1] - 2, x1, y1))
        partes.append(Image.frombytes('RGB', (pix.width, pix.height), pix.samples))
W = sum(i.width for i in partes) + 10 * len(partes); H = max(i.height for i in partes)
out = Image.new('RGB', (W, H), 'white'); x = 0
for i in partes: out.paste(i, (x, 0)); x += i.width + 10
out.save('../fig/gbv.png'); print(len(partes), out.size)
