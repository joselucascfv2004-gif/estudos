#!/bin/bash
# fazer.sh ANO DIA [PDF] — recorta as figuras das questões que ainda não entraram
ANO=$1; DIA=$2
PDF=${3:-../enem/${ANO}_PV_impresso_$([ $DIA = 1 ] && echo D1_CD1 || echo D2_CD5).pdf}
NUMS=$(cd ../enem && node -e "
const fs=require('fs');const inc=new Set();for(const l of fs.readFileSync('decisoes-$ANO-d$DIA.txt','utf8').split('\n')){const m=l.match(/^@(\d+) /);if(m&&!/ fig\b/.test(l))inc.add(+m[1]);}
const j=JSON.parse(fs.readFileSync('${ANO}_D$DIA.json'));const s=new Set();const out=[];for(const q of j.qs){if(s.has(q.num))continue;s.add(q.num);if(!inc.has(+q.num)&&!/anul/i.test(q.gab||''))out.push(q.num)}console.log(out.join(' '))")
echo "fora: $NUMS"
python3 figuras.py $PDF $ANO $DIA $NUMS 2>&1 | grep -v "Deprecat\|getdata" | tr '\n' ';'; echo
# aparar.txt: "ANO arquivo.webp ALTURA" corta a imagem nessa altura (tira texto que entrou no recorte)
[ -f aparar.txt ] && python3 -c "
import sys
from PIL import Image
for l in open('aparar.txt'):
    p = l.split()
    if len(p) == 3 and p[0] == '$ANO':
        f = 'img$ANO/' + p[1]; im = Image.open(f); im.crop((0, 0, im.width, int(p[2]))).save(f, 'WEBP', quality=72); print('aparado', p[1])
"
# altfaixas.txt: "ANO DIA NUM" recorta as alternativas como faixas da página (figuras -11 a -15)
[ -f altfaixas.txt ] && grep "^$ANO $DIA " altfaixas.txt | while read a d n; do python3 altfaixas.py $a $d $n >/dev/null; done
