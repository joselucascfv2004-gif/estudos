# Importação das provas oficiais do ENEM

Ferramentas usadas para transformar os PDFs oficiais do INEP em arquivos de `conteudos/enem-oficial/`.
Os PDFs não ficam no repositório: baixe-os do site do INEP (provas e gabaritos) para a mesma pasta.

1. `node extrair2.mjs ANO DIA` lê `ANO_PV_impresso_D1_CD1.pdf` (ou `D2_CD5`) e o gabarito
   `ANO_GB_D1_CD1.txt` (texto do PDF do gabarito) e gera `ANO_Dn.json`.
2. `node resumo.mjs`, `sel.mjs`, `mostrar.mjs` e `flag.mjs` mostram as questões para revisão;
   `ver.sh pdf N` desenha a página da questão N em imagem.
3. As decisões ficam em `decisoes-ANO-dN.txt`: quais questões entram, nível, assunto, explicação e
   correções do texto extraído (formato explicado no começo de `montar-md.mjs`).
4. `node montar-md.mjs decisoes-ANO-dN.txt` grava os arquivos `.md` em `conteudos/enem-oficial/`.

Textos usados por várias questões ficam em arquivos `cANO-NN.txt` (gerados com `compart.mjs`).
