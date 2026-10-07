### Para que serve este assunto

Matriz é uma forma organizada de guardar números em linhas e colunas, como uma planilha. Com ela se organizam vendas de várias lojas, notas de vários alunos, pixels de uma imagem, distâncias entre cidades. O determinante é um número calculado a partir de uma matriz quadrada que diz, entre outras coisas, se um sistema de equações tem solução única. É um assunto pouco cobrado no ENEM (que prefere a leitura de tabelas e a multiplicação em contexto), mas muito cobrado em provas militares e vestibulares.

### Matriz é uma tabela

Uma matriz m × n (lê-se "m por n") tem **m linhas** e **n colunas**. Cada elemento é indicado por **aᵢⱼ**: o número na linha i e na coluna j.

> **Exemplo resolvido.** Monte a matriz A, 2 × 3, com aᵢⱼ = 2i − j.
> a₁₁ = 2 − 1 = 1; a₁₂ = 2 − 2 = 0; a₁₃ = 2 − 3 = −1.
> a₂₁ = 4 − 1 = 3; a₂₂ = 4 − 2 = 2; a₂₃ = 4 − 3 = 1.
> Linha 1: **1, 0, −1**. Linha 2: **3, 2, 1**.

### Matrizes especiais

- **Quadrada:** mesmo número de linhas e colunas (n × n). Tem **diagonal principal** (a₁₁, a₂₂, a₃₃...).
- **Identidade (Iₙ):** quadrada, com 1 na diagonal principal e 0 no resto. Funciona como o número 1 da multiplicação: A · I = A.
- **Nula:** todos os elementos são zero.
- **Diagonal:** só a diagonal principal pode ter números diferentes de zero.
- **Transposta (Aᵗ):** troca linhas por colunas. A primeira linha de A vira a primeira coluna de Aᵗ.
- **Simétrica:** é igual à sua transposta (aᵢⱼ = aⱼᵢ), como uma tabela de distâncias entre cidades.

### Operações com matrizes

**Soma e subtração.** Só entre matrizes do **mesmo tamanho**, somando elemento a elemento.

**Multiplicação por um número.** Multiplique cada elemento pelo número.

**Multiplicação de matrizes.** É a operação mais importante e a que mais confunde:

1. Só é possível se o **número de colunas da primeira** for igual ao **número de linhas da segunda**. Uma matriz 2 × **3** multiplica uma **3** × 4, e o resultado é 2 × 4 (os números "de fora").
2. Cada elemento do resultado é a **linha da primeira** "vezes" a **coluna da segunda**: multiplique elemento a elemento e some.

> **Exemplo resolvido.** Calcule o produto de A (linhas: 1, 2 / 3, 4) por B (linhas: 5, 6 / 7, 8).
> Elemento 1,1: linha 1 de A com coluna 1 de B: 1 · 5 + 2 · 7 = 19.
> Elemento 1,2: 1 · 6 + 2 · 8 = 22.
> Elemento 2,1: 3 · 5 + 4 · 7 = 43.
> Elemento 2,2: 3 · 6 + 4 · 8 = 50.
> Resultado: linhas **19, 22 / 43, 50**.

**Atenção:** em geral, **A · B ≠ B · A**. A ordem importa na multiplicação de matrizes.

> **Exemplo resolvido (contexto).** A loja A vendeu 10 camisetas e 5 bonés; a loja B, 8 camisetas e 12 bonés. A camiseta custa R$ 30 e o boné, R$ 20. Qual a receita de cada loja?
> Matriz das quantidades (linhas = lojas, colunas = produtos) vezes a matriz coluna dos preços:
> Loja A: 10 · 30 + 5 · 20 = **R$ 400**. Loja B: 8 · 30 + 12 · 20 = **R$ 480**.
> É exatamente "linha vezes coluna". O ENEM cobra esse tipo de leitura.

### Determinantes

O determinante (det) é um número associado a uma **matriz quadrada**.

**Ordem 2:** produto da diagonal principal menos o produto da diagonal secundária.

> **Exemplo resolvido.** det da matriz (linhas: 3, 1 / 4, 2) = 3 · 2 − 1 · 4 = **2**.

**Ordem 3: regra de Sarrus.**

1. Copie as duas primeiras colunas ao lado da matriz.
2. Some os produtos das três diagonais "descendo para a direita".
3. Subtraia os produtos das três diagonais "subindo para a direita".

> **Exemplo resolvido.** Calcule o determinante da matriz de linhas 1, 2, 3 / 0, 1, 4 / 5, 6, 0.
> Diagonais descendo: 1 · 1 · 0 + 2 · 4 · 5 + 3 · 0 · 6 = 0 + 40 + 0 = 40.
> Diagonais subindo: 3 · 1 · 5 + 1 · 4 · 6 + 2 · 0 · 0 = 15 + 24 + 0 = 39.
> det = 40 − 39 = **1**.

### Propriedades que economizam conta

- Se uma linha (ou coluna) é toda **zero**, o det é **0**.
- Se duas linhas (ou colunas) são **iguais** ou **proporcionais**, o det é **0**.
- **Trocar** duas linhas de lugar troca o **sinal** do det.
- Multiplicar **uma linha** por k multiplica o det por k.
- Multiplicar a **matriz inteira** (n × n) por k multiplica o det por **kⁿ**. Se A é 3 × 3 com det 5, então det(2A) = 2³ · 5 = **40**.
- det(A · B) = det A · det B; det(Aᵗ) = det A.
- O det de uma matriz triangular (zeros acima ou abaixo da diagonal) é o produto da diagonal principal.

### Matriz inversa

A inversa de A (A⁻¹) é a matriz que, multiplicada por A, dá a identidade. Ela **só existe se det A ≠ 0**.

Para uma 2 × 2 de linhas a, b / c, d: troque de lugar a e d, troque o sinal de b e c, e divida tudo pelo determinante.

> **Exemplo resolvido.** Ache a inversa de A (linhas: 3, 1 / 4, 2).
> det = 2. Trocando e mudando os sinais: linhas 2, −1 / −4, 3. Dividindo por 2: linhas **1, −1/2 / −2, 3/2**.
> Conferindo: A · A⁻¹ = linhas 1, 0 / 0, 1 ✔

### Sistemas lineares e regra de Cramer

Um sistema pode ser escrito como matriz dos coeficientes × matriz das incógnitas = matriz dos resultados. O determinante dos coeficientes (D) decide:

- **D ≠ 0:** solução única (sistema possível e determinado).
- **D = 0:** ou não há solução ou há infinitas (é preciso investigar).

**Regra de Cramer** (para D ≠ 0): x = Dx ÷ D e y = Dy ÷ D, em que Dx é o determinante com a coluna do x trocada pelos resultados (e o mesmo para y).

> **Exemplo resolvido.** Resolva 2x + y = 7 e x − y = 2.
> D = 2 · (−1) − 1 · 1 = −3.
> Dx (troca a coluna do x por 7 e 2): 7 · (−1) − 1 · 2 = −9 → x = −9 ÷ −3 = **3**.
> Dy (troca a coluna do y): 2 · 2 − 7 · 1 = −3 → y = −3 ÷ −3 = **1**.

### Erros mais comuns

- Somar matrizes de tamanhos diferentes.
- Multiplicar matrizes elemento a elemento, em vez de linha por coluna.
- Achar que A · B = B · A.
- Errar os sinais na regra de Sarrus (as diagonais que sobem são **subtraídas**).
- Usar det(kA) = k · det A para matriz de ordem maior que 1 (o certo é kⁿ).

### Como cai na prova

No ENEM, aparece como tabelas que precisam ser combinadas (quantidade × preço, notas × pesos), ou seja, multiplicação de matrizes disfarçada. Provas militares e vestibulares cobram construção pela lei aᵢⱼ, produto, determinantes de ordem 2 e 3, propriedades, inversa e discussão de sistemas.

### Teste-se

1. Some as matrizes (linhas: 1, 0 / 2, 3) e (linhas: 4, 1 / 0, 2).
2. Calcule o determinante da matriz (linhas: 5, 2 / 3, 4).
3. É possível multiplicar uma matriz 2 × 3 por uma 3 × 4? Qual o tamanho do resultado?
4. A é 3 × 3 e det A = 4. Quanto vale det(3A)?
5. Resolva por Cramer: x + y = 5 e x − y = 1.

> **Respostas.** 1) Linhas **5, 1 / 2, 5**. 2) 20 − 6 = **14**. 3) **Sim**; o resultado é **2 × 4**. 4) 3³ · 4 = **108**. 5) D = −2; Dx = −6 → **x = 3**; Dy = −4 → **y = 2**.

### Para lembrar

- aᵢⱼ: linha i, coluna j. Soma só com o mesmo tamanho.
- Produto: colunas da 1ª = linhas da 2ª; linha × coluna; a ordem importa.
- det 2 × 2: diagonal principal − secundária. 3 × 3: Sarrus.
- Linha nula ou linhas proporcionais → det = 0. det(kA) = kⁿ det A.
- Inversa só existe se det ≠ 0. Cramer: x = Dx/D.
