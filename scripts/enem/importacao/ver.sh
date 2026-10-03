#!/bin/bash
# ver.sh pdf N [dpi] — renderiza a página da "Questão N" em ver-N.png
pdf=$1; n=$2; r=${3:-80}
N=$(pdfinfo "$pdf" | awk '/^Pages/{print $2}')
for p in $(seq 1 $N); do
  if pdftotext -f $p -l $p "$pdf" - | grep -qiE "^quest(ã|Ã)o 0?$n\$"; then
    pdftoppm -f $p -l $p -r $r -png "$pdf" ver-tmp; mv ver-tmp-*.png ver-$n.png 2>/dev/null || mv ver-tmp*.png ver-$n.png; echo "ver-$n.png (página $p)"; break; fi
done
