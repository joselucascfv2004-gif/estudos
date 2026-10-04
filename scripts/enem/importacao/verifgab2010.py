# verifgab2010.py DIA — lê o gabarito de 2010 pelas marcas verdes da prova corrigida (GBPV),
# ligando cada marca ao texto da alternativa ao lado dela
import json, re, sys, unicodedata, pymupdf
dia = sys.argv[1]
doc = pymupdf.open(f'2010_GBPV_D{dia}.pdf')
qs = {q['num']: q for q in json.load(open(f'2010_D{dia}.json'))['qs'] if not q.get('rep')}
norm = lambda s: re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', s.lower()))
res = {}
for pno, p in enumerate(doc):
    W = p.rect.width
    pix = p.get_pixmap(dpi=144)
    s = pix.samples; w, h = pix.width, pix.height; n = pix.n
    verde = set()
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            i = (y * w + x) * n
            r, g, b = s[i], s[i + 1], s[i + 2]
            if g > r + 50 and b < g + 30: verde.add((x // 6, y // 6))
    # agrupa células verdes
    grupos = []
    vistos = set()
    for c in verde:
        if c in vistos: continue
        pilha = [c]; vistos.add(c); cel = []
        while pilha:
            a = pilha.pop(); cel.append(a)
            for d in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)):
                b2 = (a[0]+d[0], a[1]+d[1])
                if b2 in verde and b2 not in vistos: vistos.add(b2); pilha.append(b2)
        if len(cel) >= 4:
            xs = [a[0] for a in cel]; ys = [a[1] for a in cel]
            grupos.append(((min(xs)+max(xs)+1)*3*72/144, (min(ys)+max(ys)+1)*3*72/144))
    linhas = []
    cabs = []
    for b in p.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            t = ''.join(sp['text'] for sp in l['spans'])
            # algumas fontes do arquivo estão com o código deslocado (\x03 = espaço, "SRVVXHP" = "possuem")
            if '\x03' in t: t = ''.join(chr(ord(c) + 29) if ord(c) < 100 else c for c in t)
            t = t.strip()
            m = re.match(r'^Quest[ãa]o\s+(\d+)', t)
            if m: cabs.append((int(m.group(1)), l['bbox']))
            linhas.append((t, l['bbox']))
    for gx, gy in grupos:
        col = gx < W / 2
        acima = [c for c in cabs if (c[1][0] < W / 2) == col and c[1][1] < gy]
        if not acima: continue
        num = str(max(acima, key=lambda c: c[1][1])[0])
        q = qs.get(num)
        if not q: continue
        hy = max(acima, key=lambda c: c[1][1])[1][1]
        ys = {}
        for k, a in enumerate(q['alts']):
            na = norm(a)[:14]
            if len(na) < 2: continue
            for tt, bb in linhas:
                if (bb[0] < W / 2) != col or bb[1] < hy: continue
                nt = norm(tt)
                if nt and (nt.startswith(na) or (len(nt) >= 2 and na.startswith(nt) and len(nt) >= len(na) - 2)):
                    cy = (bb[1] + bb[3]) / 2
                    if abs(cy - gy) < abs(ys.get('ABCDE'[k], 1e9) - gy): ys['ABCDE'[k]] = cy
        # alternativas pela posição: primeiras linhas recuadas ~7 pt em relação ao cabeçalho da questão
        cab = max(acima, key=lambda c: c[1][1])[1]
        prox = [c[1][1] for c in cabs if (c[1][0] < W / 2) == col and c[1][1] > cab[1]]
        fim = min(prox) if prox else 1e9
        alt0 = sorted({round((bb[1] + bb[3]) / 2) for tt, bb in linhas if 4 < bb[0] - cab[0] < 10 and cab[1] < bb[1] < fim and tt.strip()})
        if len(alt0) >= 5:
            alt0 = alt0[-5:]
            k = min(range(5), key=lambda i: abs(alt0[i] - gy))
            if abs(alt0[k] - gy) < 8: ys = {'ABCDE'[k]: alt0[k]}
        letra = None
        if ys:
            k = min(ys, key=lambda L: abs(ys[L] - gy))
            if abs(ys[k] - gy) < 9: letra = (k, 0)
        res.setdefault(num, []).append(letra[0] if letra else '?')
json.dump(res, open(f'../g10/verif-D{dia}.json', 'w'))
print(len(res), 'questões com marca')
