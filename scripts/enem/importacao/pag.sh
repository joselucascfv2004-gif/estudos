#!/bin/bash
# pag.sh pdf N [linhas] — mostra o layout a partir de "Questão N"
pdf=$1; n=$2; l=${3:-40}
N=$(pdfinfo "$pdf" | awk '/^Pages/{print $2}')
for p in $(seq 1 $N); do
  if pdftotext -f $p -l $p "$pdf" - | grep -qiE "^quest(ã|Ã)o 0?$n\$"; then
    echo "--- página $p"; pdftotext -layout -f $p -l $p "$pdf" - | grep -v "^\s*$" | grep -iE -A$l "QUESTÃO 0?$n( |$)"; fi
done
