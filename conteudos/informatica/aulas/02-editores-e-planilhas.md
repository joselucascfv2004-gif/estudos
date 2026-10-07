### Para que serve este assunto

Editores de texto e planilhas são a parte mais **prática** da informática nos concursos, e também do dia a dia de qualquer trabalho de escritório ou de agência bancária. As questões cobram atalhos (principalmente do Word em português), formatação, fórmulas e funções do Excel e do Calc, referências relativas e absolutas e mensagens de erro. A melhor forma de aprender é **abrir uma planilha e testar**: o LibreOffice é gratuito e funciona como o Microsoft Office.

### Word (em português)

Atalhos de formatação e arquivo:

- **Ctrl + N:** negrito. **Ctrl + I:** itálico. **Ctrl + S:** sublinhado.
- **Ctrl + B:** salvar. **Ctrl + P:** imprimir. **Ctrl + O:** novo documento.
- **F7:** verificar ortografia e gramática.
- **Ctrl + E / Ctrl + G / Ctrl + J:** centralizar, alinhar à direita, justificar.

Usar **estilos** de título (Título 1, Título 2) permite gerar o **sumário automático**.

> **Atenção:** no Word em português, **Ctrl + S** é sublinhado e **Ctrl + B** é salvar. Em inglês, é o contrário (Ctrl + S salva, Ctrl + B é negrito). As bancas costumam cobrar a versão em português.

### LibreOffice: os equivalentes gratuitos

- **Writer** = Word (formato .odt × .docx).
- **Calc** = Excel (.ods × .xlsx).
- **Impress** = PowerPoint (.odp × .pptx).

### Excel e Calc: fórmulas

Toda fórmula começa com **=**.

Ordem das operações: primeiro a **potência** (^), depois **multiplicação** (*) e **divisão** (/), por último **soma** (+) e **subtração** (−). Os parênteses mudam a ordem. O símbolo & junta textos.

> **Exemplo resolvido.** Quanto dá =2+3*2^2?
> Primeiro 2^2 = 4; depois 3 · 4 = 12; depois 2 + 12 = **14**.

### Funções mais cobradas

- **=SOMA(A1:A10)**, **=MÉDIA(...)**, **=MÁXIMO(...)**, **=MÍNIMO(...)**, **=MED(...)** (mediana).
- **=CONT.NÚM(...)**: conta células com **números**.
- **=CONT.VALORES(...)**: conta células **não vazias**.
- **=CONT.SE(A1:A10;">5")**: conta as que atendem a um critério.
- **=SOMASE(A1:A10;"Sul";B1:B10)**: soma B onde A é "Sul".
- **=SE(A1>=7;"Aprovado";"Reprovado")**: teste lógico.
- **=E(...)** e **=OU(...)**: combinam testes.
- **=PROCV(valor;tabela;coluna;FALSO)**: procura um valor na primeira coluna de uma tabela e devolve o de outra coluna.
- **=ARRED(A1;2)**: arredonda. **=HOJE()**: data atual.

Os dois-pontos (**:**) indicam intervalo (A1 **até** A10); o ponto e vírgula (**;**) separa argumentos (A1 **e** A10).

> **Exemplo resolvido.** =SOMA(A1;A3) soma o quê?
> Só **A1 e A3** (dois valores), e não A1 até A3.

### Referências relativas e absolutas

- **A1 (relativa):** muda ao copiar a fórmula. Copiar =A1+B1 uma linha para baixo vira =A2+B2.
- **$A$1 (absoluta):** fica **fixa**.
- **$A1** (fixa a coluna) e **A$1** (fixa a linha): **mistas**.

> **Exemplo resolvido.** Em C1 está =A1*$B$1. Copiando para C2, a fórmula vira o quê?
> Vira =A2*$B$1: a parte relativa desceu uma linha; a absoluta continuou igual.

### Mensagens de erro

- **#DIV/0!:** divisão por zero.
- **#REF!:** referência a uma célula que não existe mais (foi excluída).
- **#NOME?:** nome de função escrito errado.
- **#N/D:** valor não encontrado (comum no PROCV).
- **#VALOR!:** tipo de dado errado (somar texto com número).
- **#####:** a coluna está **estreita** demais para mostrar o número.

### Referência a outra planilha

- **Excel:** com exclamação: **Planilha2!A1**.
- **Calc:** com ponto: **Planilha2.A1**.

### Recursos do Word que caem

- **Estilos** (Título 1, Título 2, Normal): padronizam a formatação e permitem o **sumário automático** (guia Referências).
- **Quebra de página** (Ctrl + Enter) × **quebra de seção** (permite orientações e cabeçalhos diferentes no mesmo documento).
- **Cabeçalho e rodapé**, **numeração de páginas**, **notas de rodapé**.
- **Mala direta:** gera várias cartas personalizadas a partir de uma lista de dados (nomes, endereços).
- **Controlar alterações** e **comentários:** para revisão de textos.
- **Localizar** (Ctrl + L no Word em português) e **substituir** (Ctrl + U).
- Outros atalhos em português: **Ctrl + Q** (alinhar à esquerda), **Ctrl + T** (selecionar tudo), **Ctrl + K** (inserir hiperlink), **Ctrl + A** (abrir), **Ctrl + Enter** (quebra de página), **F12** (salvar como).

### Mais sobre planilhas

- **Célula:** o cruzamento de uma **coluna** (letras) com uma **linha** (números): B3. **Intervalo:** B3:D10. **Pasta de trabalho:** o arquivo; **planilhas:** as abas.
- **Alça de preenchimento:** o quadradinho no canto da célula; arrastando, copia fórmulas ou continua sequências (1, 2, 3...; jan, fev, mar...).
- **Formatação condicional:** muda a cor da célula conforme o valor (por exemplo, vermelho para notas abaixo de 5).
- **Filtros:** mostram só as linhas que atendem a um critério (sem apagar as outras). **Classificar:** ordena os dados.
- **Tabela dinâmica:** resume grandes quantidades de dados (somas por categoria, por mês).
- **Gráficos:** de **colunas/barras** (comparar categorias), de **linhas** (evolução no tempo), de **pizza** (partes de um todo), de **dispersão** (relação entre duas variáveis).
- **=PROCX** (nas versões mais novas do Excel) substitui o PROCV com mais flexibilidade.
- **=SE aninhado:** =SE(A1>=7;"Aprovado";SE(A1>=5;"Recuperação";"Reprovado")).

> **Exemplo resolvido.** A coluna A tem as notas de 30 alunos (A2:A31). Qual fórmula conta quantos tiraram 7 ou mais?
> **=CONT.SE(A2:A31;">=7")**.

> **Exemplo resolvido.** Em B1 está 10, em B2 está 0. O que mostra =B1/B2? E =SE(B2=0;"sem divisão";B1/B2)?
> A primeira mostra **#DIV/0!**. A segunda testa antes e mostra o texto **"sem divisão"**, evitando o erro.

### Apresentações (PowerPoint e Impress)

- **F5:** inicia a apresentação do **começo**; **Shift + F5:** do **slide atual**.
- **Transições** (efeitos **entre** slides) × **animações** (efeitos **nos objetos** dentro do slide).
- **Slide mestre:** define o layout padrão de todos os slides.
- **Modo de exibição do apresentador:** mostra anotações só para quem apresenta.

### Erros mais comuns

- Trocar os atalhos do Word em português (Ctrl + S sublinha; Ctrl + B salva).
- Esquecer que a fórmula começa com "=".
- Confundir ":" (intervalo) com ";" (separador de argumentos).
- Errar a ordem das operações (potência antes de multiplicação, que vem antes da soma).
- Esquecer que o $ fixa a linha ou a coluna ao copiar a fórmula.

### Como cai na prova

As bancas mostram uma planilha e pedem o resultado de uma fórmula, perguntam o que acontece ao copiar uma fórmula para outra célula, cobram atalhos do Word e do Writer, funções (SOMA, MÉDIA, SE, CONT.SE, PROCV), mensagens de erro e diferenças entre Excel e Calc.

### Teste-se

1. No Word em português, qual atalho salva o documento?
2. Quanto dá =(2+3)*2^2?
3. Em C1 há =A1+$B1. Copiando para D2, a fórmula vira o quê?
4. Que erro aparece quando se escreve =SOMAA(A1:A5)?
5. Qual a diferença entre CONT.NÚM e CONT.VALORES?

> **Respostas.** 1) **Ctrl + B**. 2) 5 · 4 = **20**. 3) **=B2+$B2** (a parte relativa anda uma coluna e uma linha; a coluna B fixada com $ não muda, mas a linha sim). 4) **#NOME?** (nome de função errado). 5) **CONT.NÚM** conta só células com **números**; **CONT.VALORES** conta todas as células **não vazias**.

### Para lembrar

- Word PT: Ctrl + N (negrito), I (itálico), S (sublinhado), B (salvar), T (selecionar tudo), E/G/J/Q (alinhamentos).
- Estilos geram o sumário. Writer, Calc e Impress = Word, Excel e PowerPoint.
- Fórmulas com "="; potência → multiplicação/divisão → soma/subtração.
- SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.SE, SOMASE, SE, PROCV.
- ":" = até; ";" = e. $ fixa (A$1, $A1, $A$1).
- Erros: #DIV/0!, #REF!, #NOME?, #N/D, #VALOR!, ####.
- Outra planilha: Planilha2!A1 (Excel) e Planilha2.A1 (Calc).
