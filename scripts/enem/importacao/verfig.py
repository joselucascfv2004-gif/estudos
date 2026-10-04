# python3 verfig.py ANO DIA de ate — texto das questões com figura + folha com os recortes (rev-ANO-dN-de.png)
import json, sys, subprocess
ano, dia, de, ate = sys.argv[1:5]
gab = {q['num']: q.get('gab') for q in json.load(open(f'../enem/{ano}_D{dia}.json'))['qs']}
qs = [q for q in json.load(open(f'{ano}_D{dia}_fig.json')) if int(de) <= q['num'] <= int(ate) and not q['rep']]
arqs = []
for q in qs:
    print(f"\n### {q['num']} [{gab.get(str(q['num']))}] p{q['pag']}")
    cur = ''
    ant = 0
    for c in q['corpo']:
        if 'fig' in c:
            if cur: print('  | ' + cur); cur = ''
            print(f"  [FIG {c['fig'].split('-')[-1].split('.')[0]}] {c['w']}x{c['h']}")
            arqs.append(f"img{ano}/{c['fig']}")
        else:
            if cur and (c['x'] >= 8 or abs(c['sz'] - ant) > 0.5):
                print('  | ' + cur); cur = ''
            cur = (cur + ' ' + c['t']).strip()
            ant = c['sz']
    if cur: print('  | ' + cur)
    for a in q['alts']:
        print(f"  {a['letra']}) {a['txt']}" + (f"  [FIGS {' '.join(f.split('-')[-1].split('.')[0] for f in a['figs'])}]" if a['figs'] else ''))
        arqs += [f'img{ano}/{f}' for f in a['figs']]
if arqs:
    subprocess.run(['python3', 'folha.py', f'rev-{ano}-d{dia}-{de}.png', *arqs])
    print('\nfolha:', f'rev-{ano}-d{dia}-{de}.png', len(arqs), 'imagens')
