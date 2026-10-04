#!/bin/bash
# rev.sh ANO DIA [de] [ate] — folhas de prévia (8 por folha) + texto resumido
ANO=$1; DIA=$2; DE=${3:-6}; ATE=${4:-180}
python3 verfig.py $ANO $DIA $DE $ATE | grep -v "^folha" | cut -c1-170
L=$(ls prev$ANO/d$DIA-q*.png | awk -F'q' -v de=$DE -v ate=$ATE '{n=$NF+0; if(n>=de && n<=ate) print}')
i=0; grp=""; k=0
for f in $L; do grp="$grp $f"; i=$((i+1)); if [ $i -eq 8 ]; then k=$((k+1)); python3 prevs.py rv-$ANO-$DIA-$k.png $grp; echo "folha rv-$ANO-$DIA-$k.png"; grp=""; i=0; fi; done
if [ -n "$grp" ]; then k=$((k+1)); python3 prevs.py rv-$ANO-$DIA-$k.png $grp; echo "folha rv-$ANO-$DIA-$k.png"; fi
