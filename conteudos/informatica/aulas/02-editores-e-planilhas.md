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
