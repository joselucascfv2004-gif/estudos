### Matriz é uma tabela

Uma matriz m × n tem m linhas e n colunas. O elemento aᵢⱼ fica na linha i, coluna j. Tabelas de notas, de vendas por mês ou de distâncias entre cidades são matrizes.

Muitas questões dão uma **lei de formação**, como aᵢⱼ = 2i − j: basta substituir i e j em cada posição.

### Operações

- **Soma:** elemento a elemento (as matrizes precisam ter o mesmo tamanho).
- **Multiplicação por número:** multiplica todos os elementos.
- **Produto de matrizes A · B:** só existe se o número de **colunas de A** for igual ao de **linhas de B**. O elemento (i, j) do produto é "linha i de A vezes coluna j de B": multiplica termo a termo e soma.

> **Exemplo resolvido.** Uma loja vende 3 camisetas e 2 bonés na segunda, e 1 camiseta e 4 bonés na terça. A camiseta custa R$ 40 e o boné R$ 25.
> Segunda: 3 · 40 + 2 · 25 = R$ 170. Terça: 1 · 40 + 4 · 25 = R$ 140.
> É exatamente o produto da matriz de quantidades pela coluna de preços.

Cuidado: em geral, **A · B ≠ B · A**.

### Matrizes especiais

- **Identidade (I):** 1 na diagonal principal e 0 no resto. A · I = A.
- **Transposta (Aᵗ):** troca linhas por colunas.
- **Inversa (A⁻¹):** A · A⁻¹ = I. Só existe se o determinante for diferente de zero.

### Determinantes

- **2 × 2:** det = (diagonal principal) − (diagonal secundária) = a·d − b·c.
- **3 × 3 (regra de Sarrus):** repita as duas primeiras colunas ao lado; some os produtos das três diagonais "descendo" e subtraia os das três "subindo".

> **Exemplo resolvido.** det de [[2, 3], [1, 4]] = 2 · 4 − 3 · 1 = **5**.

Propriedades úteis:

- trocar duas linhas troca o sinal do determinante;
- uma linha de zeros, ou duas linhas iguais (ou proporcionais), dão det = 0;
- multiplicar uma linha por k multiplica o det por k; numa matriz n × n, multiplicar tudo por k multiplica o det por kⁿ;
- det(A · B) = det A · det B.

### Sistemas lineares

Um sistema pode ser escrito como matriz dos coeficientes. Se o **determinante dos coeficientes é diferente de zero**, o sistema tem **uma única solução**. Se é zero, ou tem infinitas soluções, ou nenhuma.
