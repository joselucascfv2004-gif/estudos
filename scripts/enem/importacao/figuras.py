# python3 figuras.py PDF ANO DIA NUMS... [--saida DIR]
# Para cada questão: acha a região (do cabeçalho "Questão N" até a próxima), separa o texto das figuras
# (desenhos e imagens, com os rótulos de texto que ficam dentro delas), recorta as figuras em WebP e
# grava ANO_Dn_fig.json com o texto em ordem de leitura, a posição de cada figura e as alternativas.
import pymupdf, re, json, sys, os, io, statistics
from PIL import Image

args = [a for a in sys.argv[1:] if not a.startswith('--')]
opts = dict(a[2:].split('=', 1) for a in sys.argv[1:] if a.startswith('--') and '=' in a)
PDF, ANO, DIA = args[0], args[1], args[2]
NUMS = set(int(x) for x in args[3:]) if len(args) > 3 else None
SAIDA = opts.get('saida', f'img{ANO}')
DPI = int(opts.get('dpi', '170'))
os.makedirs(SAIDA, exist_ok=True)
doc = pymupdf.open(PDF)
# questões em que as figuras do enunciado devem virar uma só (ajuste manual): linhas "ANO DIA NUM"
# juntar.txt: "ANO DIA NUM" une as figuras do enunciado; com "+" no fim, também puxa rótulos curtos ao lado da figura
#   com "alts", une as figuras da área das alternativas e depois recorta uma faixa por alternativa
JUNTAR = {tuple(l.split()[:3]): set(l.split()[3:]) for l in open('juntar.txt') if l.strip()} if os.path.exists('juntar.txt') else {}
DEBUG = 'debug' in opts

FIM_TXT = re.compile(r'^\s*(INSTRU[ÇC][ÕO]ES PARA A REDA[ÇC][ÃA]O|PROPOSTA DE REDA[ÇC][ÃA]O|TEXTOS MOTIVADORES)\b', re.I)
CAB = re.compile(r'^\s*QUEST[ÃA]O\s*0*(\d{1,3})\s*$', re.I)


SUP = str.maketrans('0123456789+-−=()n', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾ⁿ')
SUB = str.maketrans('0123456789+-−=()', '₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎')


def eh_marcador(l):
    f = l['spans'][0][0]
    return ('Bundesbahn' in f or 'Pi' in f and len(l['spans'][0][1].strip()) == 1) and l['spans'][0][1].strip() in 'ABCDE'


def junta_spans(spans):
    """Texto da linha com índices e expoentes (letras menores acima/abaixo da linha) em Unicode."""
    princ = max(spans, key=lambda s: len(s['text'].strip()) * s['size'])
    base, tam = princ['origin'][1], princ['size']
    out = ''
    for s in spans:
        t = s['text']
        if s['size'] < 0.85 * tam and t.strip() and all(ch in '0123456789+-−=()n ' for ch in t):
            dy = s['origin'][1] - base
            if abs(dy) > 0.8:
                t = t.strip().translate(SUP if dy < 0 else SUB)
                out = out.rstrip()
        out += t
    return out


def linhas_da_pagina(p):
    out = []
    for b in p.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            spans = [s for s in l['spans'] if s['text'].strip()]
            if not spans:
                continue
            t = junta_spans(l['spans']).replace('\t', ' ')
            t = re.sub(r'(f[il]) (?=[a-záéíóúâêôãõç])', r'\1', t)  # ligaduras fi/fl separadas no PDF
            out.append({'gira': abs(l['dir'][1]) > 0.3, 't': re.sub(r'\s+', ' ', t).strip(), 'bb': list(l['bbox']), 'sz': round(max(spans, key=lambda s: len(s['text']))['size'], 1),
                        'font': spans[0]['font'], 'f0': spans[0]['font'], 'spans': [(s['font'], s['text']) for s in spans]})
    # marcador de alternativa repetido numa linha à parte (provas de 2022+)
    letra = lambda l: l['t'].strip() if len(l['t'].strip()) == 1 else None
    out = [l for l in out if not (letra(l) in list('ABCDE') and any(m is not l and m['t'].startswith(l['t'].strip()) and len(m['t']) > 2
           and abs(m['bb'][0] - l['bb'][0]) < 3 and abs(m['bb'][1] - l['bb'][1]) < 5 for m in out))]
    # linhas justificadas às vezes vêm em pedaços: junta pedaços com palavras na mesma altura
    out.sort(key=lambda l: (round(l['bb'][1]), l['bb'][0]))
    res = []
    for l in out:
        a = res[-1] if res else None
        if (a and abs(a['bb'][1] - l['bb'][1]) < 1.5 and abs(a['sz'] - l['sz']) < 0.3 and 0 <= l['bb'][0] - a['bb'][2] < 30 and not (a['bb'][2] < p.rect.width / 2 < l['bb'][0])
                and re.search(r'[A-Za-zÀ-ú]{2}', a['t']) and re.search(r'[A-Za-zÀ-ú]', l['t']) and not eh_marcador(l)):
            a['t'] += ' ' + l['t']
            a['bb'] = [a['bb'][0], min(a['bb'][1], l['bb'][1]), l['bb'][2], max(a['bb'][3], l['bb'][3])]
            a['spans'] += l['spans']
        else:
            res.append(l)
    ruido = re.compile(r'^(MATEMÁTICA|CIÊNCIAS DA NATUREZA|CIÊNCIAS HUMANAS|LINGUAGENS, CÓDIGOS|E SUAS TECNOLOGIAS|REDAÇÃO)\b|^Questões de \d+ a \d+')
    return [l for l in res if not ruido.match(l['t'])]


def une(a, b):
    return [min(a[0], b[0]), min(a[1], b[1]), max(a[2], b[2]), max(a[3], b[3])]


def perto(a, b, d):
    return not (a[2] + d < b[0] or b[2] + d < a[0] or a[3] + d < b[1] or b[3] + d < a[1])


PAG = []
for pno, p in enumerate(doc):
    W, H = p.rect.width, p.rect.height
    ls = linhas_da_pagina(p)
    dr = []
    sep = []  # linhas pontilhadas que fecham cada questão
    for d in p.get_drawings():
        if d['rect'].height < 2 and d['rect'].width > 150 and str(d.get('dashes', '')).startswith('[ 0 '):
            sep.append([d['rect'].x0, d['rect'].y0, d['rect'].x1, d['rect'].y1])
        r = d['rect']
        if r.width > 0.8 * W or (r.height > 0.6 * H and r.width < 4):
            continue  # réguas da página e divisória das colunas
        if r.y1 < 0 or r.y0 > H or r.x1 < 0 or r.x0 > W:
            continue
        if r.width < 3 and r.height > 40 and abs((r.x0 + r.x1) / 2 - W / 2) < 8:
            continue  # divisória das colunas em pedaços
        if r.width < 1.6 and r.height < 1.6:
            continue  # pontinhos de linhas pontilhadas
        if d.get('fill') is not None and 15 < r.width < 36 and 40 < r.height < 130 and (r.x0 > W - 55 or r.x1 < 55):
            continue  # abas escuras na margem da página (2016)
        branco = lambda c: c is not None and min(c) > 0.97
        if branco(d.get('fill')) and (d.get('color') is None or branco(d.get('color'))):
            continue  # caixas brancas de fundo
        dr.append([r.x0, r.y0, r.x1, r.y1])
    barras = [l['bb'] for l in ls if re.match(r'^\*[A-Z0-9]+\*$', l['t'])]
    dr = [g for g in dr if not any(perto(g, b, 14) for b in barras)]
    ls = [l for l in ls if not re.match(r'^\*[A-Z0-9]+\*$', l['t'])]
    ims = []
    for info in p.get_image_info():
        r = pymupdf.Rect(info['bbox'])
        if r.width < 3 or r.height < 3:
            continue
        ims.append([r.x0, r.y0, r.x1, r.y1])
    # régua de cima e de baixo (área útil)
    hs = [d['rect'] for d in p.get_drawings() if d['rect'].width > 0.8 * W and d['rect'].height < 3]
    topo = max([r.y1 for r in hs if 20 < r.y1 < H * 0.2], default=60)
    base = min([r.y0 for r in hs if H * 0.8 < r.y0 < H - 20], default=H - 40)
    # rodapé: texto "Caderno"/"Página"/código de barras perto do fim da página
    rod = [l['bb'][1] for l in ls if l['bb'][1] > H * 0.8 and re.search(r'Caderno \d|Página \d|^\*[A-Z0-9]+\*$|\d+º dia', l['t'])]
    if rod:
        base = min(base, min(rod) - 2)
    ls = [l for l in ls if l['bb'][1] < base]
    PAG.append({'W': W, 'H': H, 'ls': ls, 'sep': [x for x in sep if H * 0.12 < x[1] < base - 3], 'dr': dr, 'im': ims, 'topo': topo + 1, 'base': base - 1})

MEIO = lambda pg: pg['W'] / 2


def coluna(pg, x0):
    return 0 if x0 < MEIO(pg) - 10 else 1


# cabeçalhos em ordem de leitura
cabs = []
for pno, pg in enumerate(PAG):
    for l in pg['ls']:
        m = CAB.match(l['t'])
        if m and 'Bold' in l['font'] or (m and l['t'].upper().startswith('QUEST')):
            if m:
                cabs.append({'n': int(m.group(1)), 'p': pno, 'c': coluna(pg, l['bb'][0]), 'y0': l['bb'][1], 'y1': l['bb'][3], 'x0': l['bb'][0]})
cabs.sort(key=lambda c: (c['p'], c['c'], c['y0']))


def pagina_larga(pg, y0, y1):
    # página (ou trecho) de uma coluna só: linhas de texto que atravessam o meio
    m = MEIO(pg)
    n = sum(1 for l in pg['ls'] if l['bb'][1] >= y0 and l['bb'][3] <= y1 and l['bb'][0] < m - 40 and l['bb'][2] > m + 40)
    g = sum(1 for r in pg['im'] + pg['dr'] if r[1] >= y0 - 2 and r[3] <= y1 + 2 and r[0] < m - 40 and r[2] > m + 40)
    return n >= 1 or g >= 1


def segmentos(i):
    c = cabs[i]
    prox = cabs[i + 1] if i + 1 < len(cabs) else None
    segs = []
    p, col, y = c['p'], c['c'], c['y1'] + 1
    while True:
        pg = PAG[p]
        fim = pg['base']
        if prox and prox['p'] == p and prox['c'] == col:
            fim = prox['y0'] - 1
        larga = pagina_larga(pg, y, fim)
        if larga:
            x0, x1 = 15, pg['W'] - 15
        else:
            x0, x1 = (15, MEIO(pg) - 2) if col == 0 else (MEIO(pg) + 2, pg['W'] - 15)
        corte = [sp[1] for sp in pg['sep'] if y + 10 < sp[1] < fim and sp[0] >= x0 - 8 and sp[2] <= x1 + 8]
        # proposta de redação e títulos de área encerram a questão
        corte += [l['bb'][1] for l in pg['ls'] if y - 2 < l['bb'][1] < fim and l['bb'][0] >= x0 - 8 and l['bb'][2] <= x1 + 8 and FIM_TXT.match(l['t'])]
        if corte:
            segs.append({'p': p, 'x0': x0, 'x1': x1, 'y0': y, 'y1': min(corte) - 2, 'larga': larga})
            break
        segs.append({'p': p, 'x0': x0, 'x1': x1, 'y0': y, 'y1': fim, 'larga': larga})
        if not prox or (prox['p'] == p and (prox['c'] == col or larga)):
            break
        if larga or col == 1:
            p, col = p + 1, 0
        else:
            col = 1
        if p >= len(PAG) or (prox['p'] < p) or (prox['p'] == p and prox['c'] < col):
            break
        y = PAG[p]['topo']
        if len(segs) > 4:
            break
    return segs


def dentro(bb, s, folga=0):
    cx, cy = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2
    return s['x0'] - folga <= cx <= s['x1'] + folga and s['y0'] - folga <= cy <= s['y1'] + folga


EHFONTE = re.compile(r'^([A-ZÀ-Ú][A-ZÀ-Ú\'’. -]+, [A-ZÀ-Ú]|Disponível em|Acesso em|[A-ZÀ-Ú]{2,}(?: [A-ZÀ-Ú]{2,})*[.;] [A-ZÀ-Ú])')


def processa(i):
    c = cabs[i]
    segs = segmentos(i)
    itens = []  # elementos com segmento
    for k, s in enumerate(segs):
        pg = PAG[s['p']]
        ls = [l for l in pg['ls'] if dentro(l['bb'], s)]
        gr = [g for g in pg['dr'] + pg['im'] if dentro(g, s) and (g[3] - g[1] > 1.5 or g[2] - g[0] > 1.5)]
        # tira enfeites do cabeçalho (linha ao lado de "Questão N" e logo)
        gr = [g for g in gr if not (k == 0 and g[1] < c['y1'] + 4 and g[3] < c['y1'] + 12)]
        pesos = {}
        for l in ls:
            pesos[l['sz']] = pesos.get(l['sz'], 0) + len(l['t'])
        corpo_sz = max(pesos, key=pesos.get) if pesos else 10
        marcas = [l['bb'] for l in ls if eh_marcador(l)]
        gr = [g for g in gr if not (max(g[2] - g[0], g[3] - g[1]) < 22 and any(perto(g, m, 2) for m in marcas))]
        # agrupa os gráficos
        grupos = []
        for g in sorted(gr, key=lambda g: g[1]):
            for gg in grupos:
                if perto(gg, g, 12):
                    gg[:] = une(gg, g)
                    break
            else:
                grupos.append(list(g))
        mudou = True
        while mudou:
            mudou = False
            for a in grupos:
                for b in grupos:
                    if a is not b and perto(a, b, 12):
                        a[:] = une(a, b)
                        grupos.remove(b)
                        mudou = True
                        break
                if mudou:
                    break
        larg_col = s['x1'] - s['x0']
        # traços que passam da coluna (linhas tracejadas recortadas no PDF) não puxam a coluna vizinha
        if not s['larga']:
            for g in grupos:
                g[0], g[2] = max(g[0], s['x0'] - 6), min(g[2], s['x1'])
        grupos = [g for g in grupos if max(g[2] - g[0], g[3] - g[1]) > 12 and min(g[2] - g[0], g[3] - g[1]) > 2.5]

        margem = min([l['bb'][0] for l in ls if abs(l['sz'] - corpo_sz) <= 0.6] or [s['x0']])

        def eh_corpo(l):
            if l.get('gira'):
                return False
            mesmo = abs(l['sz'] - corpo_sz) <= 0.6
            return (mesmo and ((l['bb'][2] - l['bb'][0]) > 0.55 * larg_col or l['bb'][0] - margem < 20)) or eh_marcador(l) or EHFONTE.match(l['t'])
        soltos = [l for l in ls if not eh_corpo(l) and not CAB.match(l['t'])]
        for l in soltos:
            mesma = [m for m in soltos if abs((m['bb'][1] + m['bb'][3]) / 2 - (l['bb'][1] + l['bb'][3]) / 2) < 3]
            if len(mesma) >= 3:
                bb = list(l['bb'])
                for m in mesma:
                    bb = une(bb, m['bb'])
                for gg in grupos:
                    if perto(gg, bb, 14):
                        gg[:] = une(gg, bb)
                        break
                else:
                    grupos.append(bb)
        mudou = True
        while mudou:
            mudou = False
            for a in grupos:
                for b in grupos:
                    if a is not b and perto(a, b, 12):
                        a[:] = une(a, b)
                        grupos.remove(b)
                        mudou = True
                        break
                if mudou:
                    break
        # rótulos: linhas de texto dentro ou encostadas nos grupos
        usados = set()
        for g in grupos:
            g0 = list(g)
            mudou = True
            while mudou:
                mudou = False
                for j, l in enumerate(ls):
                    if j in usados:
                        continue
                    bb = l['bb']
                    cx, cy = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2
                    inside = g[0] - 2 <= cx <= g[2] + 2 and g[1] - 2 <= cy <= g[3] + 2
                    larga_txt = eh_corpo(l) and ((bb[2] - bb[0]) > 0.55 * larg_col or (bb[0] - margem < 20 and len(l['t']) > 12)) and not (g0[1] + 20 < cy < g0[3] - 20) and not (bb[0] >= g0[0] - 1 and bb[1] >= g0[1] - 1 and bb[2] <= g0[2] + 1 and bb[3] <= g0[3] + 1)
                    # números soltos ao lado de um gráfico (valores dos eixos) também são rótulos
                    numero = re.match(r'^[\d\s.,%−+-]{1,8}$', l['t']) and not eh_marcador(l)
                    if inside and not eh_marcador(l) and not larga_txt or (perto(g, bb, 9) and not eh_corpo(l)) or ((numero or l.get('gira')) and perto(g, bb, 14)):
                        g[:] = une(g, bb)
                        usados.add(j)
                        mudou = True
        mudou = True
        while mudou:
            mudou = False
            for a in grupos:
                for b in grupos:
                    if a is not b and perto(a, b, 3):
                        a[:] = une(a, b)
                        grupos.remove(b)
                        mudou = True
                        break
                if mudou:
                    break
        for g in grupos:
            for j, l in enumerate(ls):
                if j in usados or eh_marcador(l):
                    continue
                bb = l['bb']
                if bb[3] > g[1] and bb[1] < g[3] and bb[2] > g[0] and bb[0] < g[2]:
                    h = bb[3] - bb[1]
                    cy = (bb[1] + bb[3]) / 2
                    if eh_corpo(l):
                        if cy < (g[1] + g[3]) / 2:
                            g[1] = max(g[1], bb[3] + 3)
                        else:
                            g[3] = min(g[3], bb[1] - 3)
                    # linha vizinha que só encosta na borda: corta a borda para não sair meia linha
                    elif cy < g[1]:
                        g[1] = max(g[1], bb[3] - 0.2 * h)
                    elif cy > g[3]:
                        g[3] = min(g[3], bb[1] + 0.2 * h)
        grupos = [g for g in grupos if g[3] - g[1] > 10 and g[2] - g[0] > 10]
        for j, l in enumerate(ls):
            if j in usados:
                continue
            itens.append({'k': k, 'margem': margem, 'y': l['bb'][1], 'x': l['bb'][0], 'tipo': 'alt' if eh_marcador(l) else 't', 'l': l, 'corpo': bool(eh_corpo(l))})
        for g in grupos:
            itens.append({'k': k, 'y': g[1], 'x': g[0], 'tipo': 'fig', 'bb': g, 'p': s['p']})
    itens.sort(key=lambda it: (it['k'], round(it['y']), it['x']))
    # figura única que reúne várias alternativas (empilhadas ou em grade): uma célula por alternativa
    marc0 = [it for it in itens if it['tipo'] == 'alt']
    if 'alts' in JUNTAR.get((ANO, DIA, str(c['n'])), set()) and marc0:
        for k in set(m['k'] for m in marc0):
            y0 = min(m['l']['bb'][1] for m in marc0 if m['k'] == k) - 6
            fs = [it for it in itens if it['tipo'] == 'fig' and it['k'] == k and it['bb'][3] > y0]
            for f in fs[1:]:
                fs[0]['bb'] = une(fs[0]['bb'], f['bb'])
                f['tipo'] = 'x'
        itens = [it for it in itens if it['tipo'] != 'x']
    novos = []
    for it in itens:
        if it['tipo'] != 'fig':
            continue
        g = it['bb']
        dentro_m = [m for m in marc0 if m['k'] == it['k'] and g[1] - 4 <= (m['l']['bb'][1] + m['l']['bb'][3]) / 2 <= g[3] + 4
                    and m['l']['bb'][2] >= g[0] - 45 and m['l']['bb'][0] <= g[2] - 20]
        if DEBUG: print('FIG', [round(v) for v in g], [(m['l']['t'][:1], [round(v) for v in m['l']['bb']]) for m in marc0])
        if len(dentro_m) < 2:
            continue
        it['tipo'] = 'x'
        cy = lambda m: (m['l']['bb'][1] + m['l']['bb'][3]) / 2
        linhas = []
        for m in sorted(dentro_m, key=cy):
            if linhas and abs(cy(linhas[-1][0]) - cy(m)) < 6:
                linhas[-1].append(m)
            else:
                linhas.append([m])
        cs = [cy(l[0]) for l in linhas]
        meio = ((cs[-1] - cs[0]) / (len(cs) - 1) / 2) if len(cs) > 1 else (g[3] - g[1])
        for r, lin in enumerate(linhas):
            y0 = (cs[r - 1] + cs[r]) / 2 if r else max(g[1], cs[r] - meio)
            y1 = (cs[r] + cs[r + 1]) / 2 if r + 1 < len(cs) else min(g[3], cs[r] + meio)
            if len(linhas) == 1:
                y0, y1 = g[1], g[3]
            lin.sort(key=lambda m: m['l']['bb'][0])
            for c_, m in enumerate(lin):
                x1 = lin[c_ + 1]['l']['bb'][0] - 7 if c_ + 1 < len(lin) else g[2]
                bb = [max(g[0], m['l']['bb'][0] + 15), y0 + 2, x1, y1 - 2]
                novos.append({'k': it['k'], 'y': bb[1], 'x': bb[0], 'tipo': 'fig', 'bb': bb, 'p': it['p'], 'dono': m['l']['spans'][0][1].strip()})
                m['l']['t'] = m['l']['t'][:1]
    itens = [it for it in itens if it['tipo'] != 'x'] + novos
    itens.sort(key=lambda it: (it['k'], round(it['y']), it['x']))
    if (ANO, DIA, str(c['n'])) in JUNTAR and JUNTAR[(ANO, DIA, str(c['n']))] - {'+', 'alts'} == set() and JUNTAR[(ANO, DIA, str(c['n']))] != {'alts'}:
        marc1 = [it for it in itens if it['tipo'] == 'alt']
        lim = (marc1[0]['k'], marc1[0]['y']) if marc1 else (99, 1e9)
        for k in set(it['k'] for it in itens):
            fs = [it for it in itens if it['tipo'] == 'fig' and it['k'] == k and not it.get('dono') and (it['k'], it['y']) < lim]
            rot = '+' in JUNTAR[(ANO, DIA, str(c['n']))]
            if len(fs) < (1 if rot else 2):
                continue
            bb = fs[0]['bb']
            for f in fs[1:]:
                bb = une(bb, f['bb'])
                f['tipo'] = 'x'
            mudou = rot
            while mudou:
                mudou = False
                for it in itens:
                    if it['tipo'] == 't' and it['k'] == k and (not it['corpo'] or len(it['l']['t']) < 25 or 'Bold' in it['l'].get('font', '')) and not EHFONTE.match(it['l']['t']):
                        b = it['l']['bb']
                        if b[3] > bb[1] - 14 and b[1] < bb[3] + 4 and b[0] < bb[2] + 30 and b[2] > bb[0] - 30:
                            bb = une(bb, b)
                            it['tipo'] = 'x'
                            mudou = True
            fs[0]['bb'] = bb
            fs[0]['y'] = bb[1]
            for it in itens:
                if it['tipo'] == 't' and it['k'] == k:
                    b = it['l']['bb']
                    if bb[0] - 2 <= (b[0] + b[2]) / 2 <= bb[2] + 2 and bb[1] - 2 <= (b[1] + b[3]) / 2 <= bb[3] + 2:
                        it['tipo'] = 'x'
        itens = [it for it in itens if it['tipo'] != 'x']
    # recortes
    figs = []
    for it in itens:
        if it['tipo'] != 'fig':
            continue
        bb = it['bb']
        if bb[2] - bb[0] < 4 or bb[3] - bb[1] < 4:
            it['tipo'] = 'x'
            continue
        r = pymupdf.Rect(bb[0] - 3, bb[1] - 2, bb[2] + 3, bb[3] + 2)
        nome = f'enem-{ANO}-d{DIA}-q{c["n"]:03d}-{len(figs) + 1}.webp'
        pix = doc[it['p']].get_pixmap(clip=r, dpi=DPI)
        im = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
        # corta as bordas brancas, deixando uma margem pequena
        cinza = im.convert('L').point(lambda v: 255 if v < 235 else 0)
        caixa = cinza.getbbox()
        if caixa:
            m = 6
            im = im.crop((max(0, caixa[0] - m), max(0, caixa[1] - m), min(im.width, caixa[2] + m), min(im.height, caixa[3] + m)))
        # cinza quando não há cor
        px = list(im.resize((64, 64)).get_flattened_data())
        if all(max(p) - min(p) < 18 for p in px):
            im = im.convert('L')
        im.save(os.path.join(SAIDA, nome), 'WEBP', quality=72, method=6)
        it['nome'] = nome
        it['w'], it['h'] = im.size
        figs.append(nome)
    # alternativas: marcadores A–E; o que vem depois do primeiro marcador é alternativa
    # figuras que ficam ao lado/abaixo de um marcador de alternativa pertencem a ele
    marc = [it for it in itens if it['tipo'] == 'alt']
    if len(marc) >= 5:
        y_alt = min(m['y'] for m in marc if m['k'] == marc[0]['k'])
        for it in itens:
            if it['tipo'] != 'fig' or (it['k'], it['bb'][3]) < (marc[0]['k'], y_alt + 2):
                continue
            cand = [m for m in marc if m['k'] == it['k'] and m['l']['bb'][0] <= it['bb'][0] + 6 and m['l']['bb'][1] <= it['bb'][3] and it['bb'][1] <= m['l']['bb'][3] + 60]
            if cand:
                m = min(cand, key=lambda m: abs(m['l']['bb'][1] - it['bb'][1]) + 0.3 * (it['bb'][0] - m['l']['bb'][0]))
                it['dono'] = m['l']['spans'][0][1].strip()
    itens = [it for it in itens if it['tipo'] != 'x']
    alts, cur, corpo = [], None, []
    for it in itens:
        if it['tipo'] == 'fig' and it.get('dono'):
            continue
        if it['tipo'] == 'alt':
            cur = {'letra': it['l']['spans'][0][1].strip(), 'txt': re.sub(r'^[A-E]\s*', '', it['l']['t']).strip(), 'y': it['y'], 'k': it['k'], 'figs': []}
            alts.append(cur)
        elif cur is not None and len(alts) <= 5:
            if it['tipo'] == 'fig':
                cur['figs'].append(it['nome'])
            elif it['l']['t'] and not CAB.match(it['l']['t']):
                cur['txt'] = (cur['txt'] + ' ' + it['l']['t']).strip()
        else:
            if it['tipo'] == 'fig':
                corpo.append({'fig': it['nome'], 'w': it['w'], 'h': it['h']})
            else:
                l = it['l']
                corpo.append({'t': l['t'], 'x': round(l['bb'][0] - it['margem']), 'sz': l['sz'], 'corpo': bool(it['corpo'])})
    for it in itens:
        if it.get('dono'):
            for a in alts:
                if a['letra'] == it['dono']:
                    a['figs'].append(it['nome'])
    # prévia da questão inteira (para revisão)
    os.makedirs(f'prev{ANO}', exist_ok=True)
    partes = []
    for sg in segs:
        if sg['y1'] - sg['y0'] < 4:
            continue
        pix = doc[sg['p']].get_pixmap(clip=pymupdf.Rect(sg['x0'], sg['y0'] - 18 if sg is segs[0] else sg['y0'], sg['x1'], sg['y1']), dpi=int(opts.get('dpiprev', '85')))
        partes.append(Image.open(io.BytesIO(pix.tobytes('png'))).convert('L'))
    if not partes:
        partes = [Image.new('L', (10, 10), 255)]
    Wp = max(p_.width for p_ in partes)
    prev = Image.new('L', (Wp, sum(p_.height for p_ in partes)), 255)
    yy = 0
    for p_ in partes:
        prev.paste(p_, (0, yy)); yy += p_.height
    prev.save(f'prev{ANO}/d{DIA}-q{c["n"]:03d}.png')
    # mesma letra repetida (marcador duplicado): junta numa alternativa só
    unic = []
    for a in alts:
        if unic and unic[-1]['letra'] == a['letra'] or any(u['letra'] == a['letra'] for u in unic):
            u = next(u for u in unic if u['letra'] == a['letra'])
            u['txt'] = (u['txt'] + ' ' + a['txt']).strip()
            u['figs'] += [f for f in a['figs'] if f not in u['figs']]
        else:
            unic.append(a)
    alts = sorted(unic, key=lambda a: a['letra'])
    return {'num': c['n'], 'pag': c['p'] + 1, 'segs': segs, 'corpo': corpo, 'alts': alts, 'figs': figs}


res = []
vistos = set()
for i, c in enumerate(cabs):
    if NUMS and c['n'] not in NUMS:
        continue
    r = processa(i)
    r['rep'] = c['n'] in vistos
    vistos.add(c['n'])
    res.append(r)
    print(f"Q{r['num']}{' (rep)' if r['rep'] else ''} p{r['pag']}: {len(r['figs'])} fig, alts={len(r['alts'])}{' COM FIG' if any(a['figs'] for a in r['alts']) else ''}")
json.dump(res, open(f'{ANO}_D{DIA}_fig.json', 'w'), ensure_ascii=False, indent=1)
