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

## ENEM 2010

O PDF da prova de 2010 desenha as letras das alternativas como imagens, e o gabarito só existe como
marcas verdes no caderno `2010_GBPV_D1.pdf` / `D2.pdf`.

- `circulos.mjs` acha os círculos das alternativas e as marcas verdes nas páginas desenhadas em imagem;
  `gab.mjs` monta um gabarito provisório a partir delas.
- `extrair2010.mjs` usa a posição das linhas (`pdftotext -bbox-layout`) e os círculos para separar
  enunciado e alternativas.
- O gabarito provisório erra cerca de 1 em cada 10 questões. Por isso, cada questão incluída foi
  resolvida e, havendo dúvida, conferida na página do gabarito oficial; a linha `g: LETRA` nas decisões
  registra a letra conferida.
- Em 2010, o 1º dia teve Ciências Humanas (1–45) e Ciências da Natureza (46–90).
