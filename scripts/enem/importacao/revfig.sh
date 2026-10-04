#!/bin/bash
# revfig.sh ANO DIA — folhas só das questões que têm figura (8 por folha)
ANO=$1; DIA=$2
L=$(python3 -c "
import json
for q in json.load(open('${ANO}_D${DIA}_fig.json')):
    if q['figs'] and not q['rep'] and q['num']>5 and not (q['num']>=91 and q['num']<=95 and $ANO>=2010 and $DIA==2 and False): print('prev$ANO/d$DIA-q%03d.png'%q['num'])")
i=0; grp=""; k=0
for f in $L; do grp="$grp $f"; i=$((i+1)); if [ $i -eq 8 ]; then k=$((k+1)); python3 prevs.py rf-$ANO-$DIA-$k.png $grp; echo "rf-$ANO-$DIA-$k.png"; grp=""; i=0; fi; done
if [ -n "$grp" ]; then k=$((k+1)); python3 prevs.py rf-$ANO-$DIA-$k.png $grp; echo "rf-$ANO-$DIA-$k.png"; fi
