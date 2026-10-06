---
titulo: Matrizes, determinantes e sistemas
provas: Militares, ENEM
descricao: Operações com matrizes, determinantes (Sarrus e propriedades), matriz inversa e regra de Cramer.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Matrizes, determinantes e sistemas

Operações com matrizes, determinantes (Sarrus e propriedades), matriz inversa e regra de Cramer.

## Resumo

- **Matriz** m × n: m linhas e n colunas. O elemento aᵢⱼ fica na linha i, coluna j.
- **Soma:** elemento a elemento (mesma ordem). **Produto A·B:** só existe se o nº de colunas de A = nº de linhas de B; cada elemento é "linha × coluna".
- **Matriz identidade:** 1 na diagonal principal e 0 fora dela. A·I = A.
- **Determinante 2×2:** ad − bc. **3×3:** regra de Sarrus.
- **Propriedades:** trocar duas linhas troca o sinal; linha de zeros ou linhas iguais ⇒ det = 0; det(A·B) = det A · det B.
- **Matriz inversa** existe só se det ≠ 0.
- **Sistemas lineares:** det ≠ 0 ⇒ solução única (SPD). det = 0 ⇒ nenhuma (SI) ou infinitas (SPI).

## Fácil

### 1
<!-- modelo: f1 -->
Qual é o determinante da matriz A = [4 4; −2 −1]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 4
- B) 12
- C) 8
- D) 3
- E) 5

**Resposta:** A

**Explicação:** Ferramenta: determinante 2×2. Produto da diagonal principal menos o produto da diagonal secundária. 4·(−1) − 4·(−2) = 4.

### 2
<!-- modelo: f1 -->
Qual é o determinante da matriz A = [−3 3; −5 4]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 5
- B) 3
- C) 4
- D) 1
- E) 13

**Resposta:** B

**Explicação:** Ferramenta: determinante 2×2. Produto da diagonal principal menos o produto da diagonal secundária. (−3)·4 − 3·(−5) = 3.

### 3
<!-- modelo: f7 -->
Se as matrizes [x + 5 −2; 0 y − 5] e [1 −2; 0 −2] são iguais, qual é o valor de x + y? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 2
- B) −12
- C) 4
- D) −1
- E) −7

**Resposta:** D

**Explicação:** Ferramenta: igualdade de matrizes. Matrizes iguais têm todos os elementos correspondentes iguais. x + 5 = 1 ⇒ x = −4; y − 5 = −2 ⇒ y = 3; x + y = −1.

### 4
<!-- modelo: f5 -->
A matriz A tem ordem 2×3 e a matriz B tem ordem 3×1. Qual é a ordem da matriz A·B?

- A) 1×2
- B) 2×1
- C) 2×3
- D) 3×1
- E) 3×3

**Resposta:** B

**Explicação:** Ferramenta: condição do produto. A·B existe se o número de colunas de A é igual ao número de linhas de B. O resultado fica com as linhas de A e as colunas de B. (2×3)·(3×1) = 2×1.

### 5
<!-- modelo: f5 -->
A matriz A tem ordem 2×5 e a matriz B tem ordem 5×1. Qual é a ordem da matriz A·B?

- A) 5×1
- B) 5×5
- C) 2×5
- D) 1×2
- E) 2×1

**Resposta:** E

**Explicação:** Ferramenta: condição do produto. A·B existe se o número de colunas de A é igual ao número de linhas de B. O resultado fica com as linhas de A e as colunas de B. (2×5)·(5×1) = 2×1.

### 6
<!-- modelo: f6 -->
Uma rede de padarias organiza suas vendas em uma matriz V, em que o elemento vᵢⱼ é a quantidade de pães vendidos pela loja i no dia j da semana. O que representa o elemento v₁₂?

- A) O total vendido pela loja 1 na semana
- B) A quantidade vendida pela loja 2 no dia 1
- C) A quantidade vendida pela loja 3 em um dia
- D) O total vendido no dia 2 por todas as lojas
- E) A quantidade vendida pela loja 1 no dia 2

**Resposta:** E

**Explicação:** Ferramenta: índices da matriz. O primeiro índice é a linha (aqui, a loja) e o segundo é a coluna (o dia). v₁₂: linha 1 (loja), coluna 2 (dia).

### 7
<!-- modelo: f8 -->
O traço de uma matriz quadrada é a soma dos elementos da diagonal principal. Qual é o traço de [3 6 2; 7 −5 0; 1 5 5]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 2
- B) 4
- C) 6
- D) 3
- E) 24

**Resposta:** D

**Explicação:** Ferramenta: diagonal principal. São os elementos em que linha = coluna: a₁₁, a₂₂, a₃₃. 3 + (−5) + 5 = 3.

### 8
<!-- modelo: f2 -->
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = 2i − 3j + 1. Qual é o valor de a₃₃?

- A) −53
- B) −2
- C) 0
- D) −4
- E) −6

**Resposta:** B

**Explicação:** Ferramenta: lei de formação. i é a linha e j é a coluna do elemento. Substitua na fórmula. i = 3, j = 3: 2·3 − 3·3 + 1 = −2.

### 9
<!-- modelo: f4 -->
Dada A = [5 1 3; 5 2 9; 1 2 3], qual é o elemento da linha 3, coluna 1 da transposta Aᵗ? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 4
- B) 2
- C) 3
- D) 5
- E) 1

**Resposta:** C

**Explicação:** Ferramenta: transposta. Na transposta, a linha vira coluna: o elemento (i, j) de Aᵗ é o (j, i) de A. (Aᵗ)31 = A13 = 3.

### 10
<!-- modelo: f2 -->
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = 3i + 3j + 4. Qual é o valor de a₂₂?

- A) 8
- B) 16
- C) 10
- D) 40
- E) 17

**Resposta:** B

**Explicação:** Ferramenta: lei de formação. i é a linha e j é a coluna do elemento. Substitua na fórmula. i = 2, j = 2: 3·2 + 3·2 + 4 = 16.

### 11
<!-- modelo: f3 -->
Sendo A = [7 8; −2 −4] e B = [8 1; −3 2], qual é o elemento da linha 1 e coluna 1 da matriz 3A − B? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 11
- B) 39
- C) 13
- D) 15
- E) 29

**Resposta:** C

**Explicação:** Ferramenta: operações elemento a elemento. Multiplicar por número e subtrair matrizes se faz posição por posição. 3·7 − 8 = 13.

### 12
<!-- modelo: f3 -->
Sendo A = [−3 5; 2 5] e B = [1 9; −3 1], qual é o elemento da linha 2 e coluna 1 da matriz 3A − B? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 3
- B) 15
- C) 5
- D) 11
- E) 9

**Resposta:** E

**Explicação:** Ferramenta: operações elemento a elemento. Multiplicar por número e subtrair matrizes se faz posição por posição. 3·2 − (−3) = 9.

### 13
<!-- modelo: f12 -->
A matriz [4 (x − 3); 3 5] é simétrica (igual à sua transposta). Qual é o valor de x? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 3
- B) 6
- C) 7
- D) 0
- E) 8

**Resposta:** B

**Explicação:** Ferramenta: matriz simétrica: aᵢⱼ = aⱼᵢ. O elemento da linha 1, coluna 2 deve ser igual ao da linha 2, coluna 1. x − 3 = 3 → x = 6.

### 14
<!-- modelo: f11 -->
A é uma matriz 5×2 e B é 2×5. Qual é a ordem da matriz produto A·B?

- A) 2×2
- B) 5×5
- C) 10×2
- D) 5×2
- E) 2×5

**Resposta:** B

**Explicação:** Ferramenta: produto A(m×n)·B(n×p) = m×p. As dimensões "internas" (colunas de A e linhas de B) precisam ser iguais e "somem". 5×2 · 2×5 → 5×5.

### 15
<!-- modelo: f9 -->
Dada A = [0 1; −1 −3], qual é o elemento da linha 1, coluna 1, da matriz −2A? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) −2
- B) 3
- C) 0
- D) −1
- E) 2

**Resposta:** C

**Explicação:** Ferramenta: produto por escalar: multiplica cada elemento. O elemento a11 = 0 vira −2 × 0. = 0.

### 16
<!-- modelo: f13 -->
Qual é o determinante da matriz diagonal [5 0 0; 0 −3 0; 0 0 1]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 0
- B) −15
- C) 3
- D) 15
- E) −30

**Resposta:** B

**Explicação:** Ferramenta: matriz diagonal (ou triangular): det = produto da diagonal. Todos os outros termos da regra de Sarrus têm um zero. 5 × (−3) × 1 = −15.

### 17
<!-- modelo: f10 -->
O traço de uma matriz quadrada é a soma dos elementos da diagonal principal. Qual é o traço de [9 3 −1; −3 −4 0; −3 −2 6]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 12
- B) 13
- C) 6
- D) 33
- E) 11

**Resposta:** E

**Explicação:** Ferramenta: diagonal principal: elementos aᵢᵢ. São os elementos com linha igual à coluna. 9 + (−4) + 6 = 11.

## Médio

### 1
<!-- modelo: m2 -->
Sendo A = [4 4; 3 0] e B = [5 1; 1 5], qual é o elemento c₁₁ da matriz C = A·B? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 27
- B) 20
- C) 29
- D) 24
- E) 22

**Resposta:** D

**Explicação:** Ferramenta: linha × coluna. No produto, cada elemento é a "linha de A" multiplicada pela "coluna de B", termo a termo, somando. 4·5 + 4·1 = 24.

### 2
<!-- modelo: m6 -->
Qual é o determinante da matriz [−1 −8 −6; 0 4 1; 0 0 4]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 16
- B) 0
- C) −8
- D) 7
- E) −16

**Resposta:** E

**Explicação:** Ferramenta: matriz triangular. Abaixo da diagonal só há zeros: o determinante é o produto da diagonal principal. (−1) × 4 × 4 = −16.

### 3
<!-- modelo: m3 -->
Uma matriz quadrada A de ordem 2 tem determinante 9. Qual é o determinante da matriz 2A?

- A) 37
- B) 36
- C) 11
- D) 18
- E) 72

**Resposta:** B

**Explicação:** Ferramenta: propriedade do determinante. Multiplicar a matriz por 2 multiplica cada uma das 2 linhas por 2; cada linha multiplica o determinante por 2. 2² × 9 = 36.

### 4
<!-- modelo: m2 -->
Sendo A = [−2 −2; −3 0] e B = [−3 −1; −2 2], qual é o elemento c₁₁ da matriz C = A·B? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 8
- B) 6
- C) 13
- D) 10
- E) 11

**Resposta:** D

**Explicação:** Ferramenta: linha × coluna. No produto, cada elemento é a "linha de A" multiplicada pela "coluna de B", termo a termo, somando. (−2)·(−3) + (−2)·(−2) = 10.

### 5
<!-- modelo: m4 -->
Para qual valor de x o determinante da matriz [5 x; 2 4] é igual a zero? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 15
- B) 11
- C) 0,4
- D) 10
- E) 20

**Resposta:** D

**Explicação:** Ferramenta: equação com determinante. Escreva o determinante em função de x e iguale a zero. 5·4 − 2x = 0 ⇒ x = 10.

### 6
<!-- modelo: m8 -->
Para que valores de k o sistema { 4x + 3y = 1 ; 8x + ky = 2 } tem uma única solução?

- A) k ≠ 8
- B) k > 6
- C) k ≠ 6
- D) k = 6
- E) k ≠ 3

**Resposta:** C

**Explicação:** Ferramenta: determinante diferente de zero. Um sistema 2×2 tem solução única quando o determinante dos coeficientes não é zero. det = 4k − 3·8 = 4(k − 6) ≠ 0 ⇒ k ≠ 6.

### 7
<!-- modelo: m1 -->
Qual é o determinante da matriz [1 −3 −3; 0 1 0; −1 1 0]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) −7
- B) −3
- C) 3
- D) 0
- E) −1

**Resposta:** B

**Explicação:** Ferramenta: regra de Sarrus. Repita as duas primeiras colunas à direita; some os produtos das 3 diagonais descendentes e subtraia os das 3 ascendentes. Resultado: det = −3.

### 8
<!-- modelo: m7 -->
Uma matriz A de ordem 3 tem determinante 3. A matriz B é obtida de A trocando a 1ª linha com a 2ª e multiplicando a 3ª linha por 2. Qual é o determinante de B?

- A) 24
- B) 3
- C) −3
- D) −6
- E) 6

**Resposta:** D

**Explicação:** Ferramenta: propriedades do determinante. Trocar duas linhas troca o sinal; multiplicar uma linha por k multiplica o determinante por k. 3 → −3 (troca) → −3 × 2 = −6.

### 9
<!-- modelo: m3 -->
Uma matriz quadrada A de ordem 2 tem determinante 5. Qual é o determinante da matriz 2A?

- A) 20
- B) 10
- C) 21
- D) 40
- E) 7

**Resposta:** A

**Explicação:** Ferramenta: propriedade do determinante. Multiplicar a matriz por 2 multiplica cada uma das 2 linhas por 2; cada linha multiplica o determinante por 2. 2² × 5 = 20.

### 10
<!-- modelo: m1 -->
Qual é o determinante da matriz [−3 −3 −1; 4 2 4; 4 −2 4]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 32
- B) −24
- C) −30
- D) −32
- E) −36

**Resposta:** D

**Explicação:** Ferramenta: regra de Sarrus. Repita as duas primeiras colunas à direita; some os produtos das 3 diagonais descendentes e subtraia os das 3 ascendentes. Resultado: det = −32.

### 11
<!-- modelo: m5 -->
Uma escola comprou cadernos, canetas e mochilas nas quantidades da matriz linha Q = [5 3 3]. Os preços unitários, em reais, estão na matriz coluna P = [4; 10; 15]. O produto Q·P representa o gasto total. Qual é esse valor?

- A) R$ 117,00
- B) R$ 319,00
- C) R$ 20,00
- D) R$ 110,00
- E) R$ 95,00

**Resposta:** E

**Explicação:** Ferramenta: produto linha × coluna. Cada quantidade multiplica o seu preço, e os resultados se somam. 5·4 + 3·10 + 3·15 = 95.

### 12
<!-- modelo: m6 -->
Qual é o determinante da matriz [1 −7 4; 0 4 5; 0 0 −2]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) −8
- B) −35
- C) 8
- D) 3
- E) 0

**Resposta:** A

**Explicação:** Ferramenta: matriz triangular. Abaixo da diagonal só há zeros: o determinante é o produto da diagonal principal. 1 × 4 × (−2) = −8.

### 13
<!-- modelo: m10 -->
Se det A = 5, quanto vale det(A⁻¹)?

- A) −1/5
- B) 1/5
- C) 5
- D) −5
- E) 1

**Resposta:** B

**Explicação:** Ferramenta: teorema de Binet: det(A)·det(A⁻¹) = det(I) = 1. O determinante da inversa é o inverso do determinante. det(A⁻¹) = 1/5.

### 14
<!-- modelo: m11 -->
Resolva o sistema { x + 2y = 15; 3x + y = 15 }. Qual é o valor de x?

- A) 3
- B) 5
- C) 9
- D) 6
- E) 4

**Resposta:** A

**Explicação:** Ferramenta: substituição ou escalonamento. Elimine uma das incógnitas combinando as equações. x = 3 e y = 6 (confira nas duas equações).

### 15
<!-- modelo: m9 -->
Uma matriz quadrada A de ordem 2 tem det A = 5. Quanto vale det(2A)?

- A) 40
- B) 5
- C) 10
- D) 21
- E) 20

**Resposta:** E

**Explicação:** Ferramenta: det(k·A) = kⁿ·det A. Multiplicar a matriz por 2 multiplica cada uma das 2 linhas por 2. 2² × 5 = 20.

### 16
<!-- modelo: m13 -->
Como se classifica o sistema { 2x − y = 4; 3x − y = 5 }?

- A) possível e indeterminado (infinitas soluções)
- B) impossível, porque o determinante é diferente de zero
- C) possível e determinado (uma única solução)
- D) impossível (nenhuma solução)
- E) possível com exatamente duas soluções

**Resposta:** C

**Explicação:** Ferramenta: comparar as equações (ou o determinante). Os coeficientes não são proporcionais: det ≠ 0, solução única. Sistema possível e determinado (uma única solução).

### 17
<!-- modelo: m12 -->
Dada A = [3 2; −2 1], qual é o elemento da linha 1, coluna 2, de A²? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 6
- B) 7
- C) 9
- D) 4
- E) 8

**Resposta:** E

**Explicação:** Ferramenta: A² = A·A (linha × coluna), não é elevar cada elemento. Linha 1 de A vezes coluna 2 de A. 3 × 2 + 2 × 1 = 8.

## Difícil

### 1
<!-- modelo: d6 -->
Sendo A = [1 2; 0 1], qual é a soma de todos os elementos da matriz A⁴⁷? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 288
- B) 94
- C) 4
- D) 96
- E) 140.737.488.355.330

**Resposta:** D

**Explicação:** Ferramenta: descobrir o padrão. Calcule A², A³... e observe: o 1 e o 0 ficam, e o canto superior direito cresce de a em a. A² = [1 4; 0 1], A³ = [1 6; 0 1] ⇒ Aⁿ = [1 2n; 0 1]. Soma: 2 + 2·47 = 96.

### 2
<!-- modelo: d4 -->
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [2 4; 3 3]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 37
- B) 13
- C) 25
- D) 39
- E) 36

**Resposta:** A

**Explicação:** Ferramenta: produto de matrizes. Calcule só os elementos da diagonal de A·A. (A²)₁₁ = 2² + 4·3; (A²)₂₂ = 3·4 + 3². Soma: 37.

### 3
<!-- modelo: d7 -->
Qual é o determinante da matriz [1 1 1; 3 5 6; 9 25 36]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 12
- B) 8
- C) 90
- D) 196
- E) 6

**Resposta:** E

**Explicação:** Ferramenta: matriz de Vandermonde. Matrizes com colunas (1, a, a²) têm determinante igual ao produto das diferenças (b − a)(c − a)(c − b). (5 − 3)(6 − 3)(6 − 5) = 6.

### 4
<!-- modelo: d5 -->
Para que valores de x a matriz [x 2; 2 x] é invertível? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) x = 2 ou x = −2
- B) x ≠ 2 e x ≠ −2
- C) x > 2
- D) x ≠ 4
- E) x ≠ 0

**Resposta:** B

**Explicação:** Ferramenta: inversa existe ⇔ det ≠ 0. Calcule o determinante em função de x e veja quando ele zera. x² − 4 ≠ 0 ⇒ x ≠ ±2.

### 5
<!-- modelo: d3 -->
No sistema { 5x + y = −4 ; x + 3y = 16 }, use a regra de Cramer para encontrar x.

- A) 4
- B) 6
- C) −2
- D) 14
- E) 2

**Resposta:** C

**Explicação:** Ferramenta: regra de Cramer. x = Dx/D: em Dx, a coluna de x é trocada pelos termos independentes. D = 14; Dx = −28; x = −2.

### 6
<!-- modelo: d2 -->
Qual é o elemento da linha 1, coluna 1 da inversa da matriz [2 1; 5 1]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 1/2
- B) −2/3
- C) 1/6
- D) 1/3
- E) −1/3

**Resposta:** E

**Explicação:** Ferramenta: inversa 2×2. Troque a e d de lugar, troque o sinal de b e c, e divida tudo pelo determinante. det = −3; elemento = 1/−3 = −1/3.

### 7
<!-- modelo: d4 -->
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [−1 3; −2 −1]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 49
- B) 2
- C) −8
- D) −10
- E) 4

**Resposta:** D

**Explicação:** Ferramenta: produto de matrizes. Calcule só os elementos da diagonal de A·A. (A²)₁₁ = (−1)² + 3·(−2); (A²)₂₂ = (−2)·3 + (−1)². Soma: −10.

### 8
<!-- modelo: d2 -->
Qual é o elemento da linha 1, coluna 1 da inversa da matriz [1 2; 4 3]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) −3/5
- B) 3/5
- C) 1
- D) 3/10
- E) −1/5

**Resposta:** A

**Explicação:** Ferramenta: inversa 2×2. Troque a e d de lugar, troque o sinal de b e c, e divida tudo pelo determinante. det = −5; elemento = 3/−5 = −3/5.

### 9
<!-- modelo: d3 -->
No sistema { 3x + 3y = 24 ; 4x + y = 14 }, use a regra de Cramer para encontrar x.

- A) 6
- B) 8
- C) 3
- D) 4
- E) 2

**Resposta:** E

**Explicação:** Ferramenta: regra de Cramer. x = Dx/D: em Dx, a coluna de x é trocada pelos termos independentes. D = −9; Dx = −18; x = 2.

### 10
<!-- modelo: d1 -->
A e B são matrizes quadradas de ordem 3 com det A = 5 e det B = 2. Qual é o valor de det(AᵗB)?

- A) −10
- B) 7
- C) 5/2
- D) 30
- E) 10

**Resposta:** E

**Explicação:** Ferramenta: teorema de Binet. det(A·B) = det A · det B; det(Aᵗ) = det A; det(A⁻¹) = 1/det A. 5 × 2 = 10.

### 11
<!-- modelo: d1 -->
A e B são matrizes quadradas de ordem 3 com det A = 2 e det B = 3. Qual é o valor de det(AᵗB)?

- A) −6
- B) 18
- C) 6
- D) 5
- E) 2/3

**Resposta:** C

**Explicação:** Ferramenta: teorema de Binet. det(A·B) = det A · det B; det(Aᵗ) = det A; det(A⁻¹) = 1/det A. 2 × 3 = 6.

### 12
<!-- modelo: d12 -->
A matriz Q = [5 1; 5 4] dá as quantidades vendidas (linhas: lojas 1 e 2; colunas: produtos A e B). Os preços são R$ 3 (A) e R$ 4 (B). Usando o produto de matrizes, qual é o faturamento da loja 2? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) R$ 63
- B) R$ 19
- C) R$ 50
- D) R$ 31
- E) R$ 32

**Resposta:** D

**Explicação:** Ferramenta: produto linha × coluna em contexto. Faturamento = Σ quantidade × preço, que é a linha da loja vezes a coluna de preços. 5 × 3 + 4 × 4 = R$ 31.

### 13
<!-- modelo: d11 -->
Resolva o sistema escalonado { x + y + z = 7; y + 2z = 6; 3z = 3 }. Qual é o valor de x?

- A) 2
- B) 1
- C) 7
- D) 4
- E) 3

**Resposta:** A

**Explicação:** Ferramenta: sistema escalonado: resolva de baixo para cima. z = 1; y = 6 − 2·1 = 4. x = 7 − 4 − 1 = 2.

### 14
<!-- modelo: d10 -->
Qual é o elemento da linha 1, coluna 1, da inversa de A = [1 5; 1 4]? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) −4
- B) 1
- C) −1
- D) −3
- E) −2

**Resposta:** A

**Explicação:** Ferramenta: inversa 2×2: troca a diagonal, troca o sinal da outra e divide pelo det. det A = −1; A⁻¹ = (1/(−1))·[4 −5; −1 1]. Elemento: −4.

### 15
<!-- modelo: d9 -->
Para que valor de x o determinante da matriz [x 1 0; 4 3 1; 3 0 1] é igual a zero? (Notação: [a b; c d] é a matriz cujas linhas são separadas por ";".)

- A) 2/3
- B) 3
- C) 4/3
- D) 7/3
- E) 1/3

**Resposta:** E

**Explicação:** Ferramenta: equação com determinante (Laplace na 1ª linha). det = x·(3·1 − 1·0) − 1·(4·1 − 1·3) + 0 = 3x − 1. 3x = 1 → x = 1/3.

### 16
<!-- modelo: d8 -->
Para que valor de k o sistema { 3x + 6y = 5; 2x + ky = 7 } NÃO tem solução única?

- A) 5
- B) 4
- C) 3
- D) 1
- E) 6

**Resposta:** B

**Explicação:** Ferramenta: solução única ⇔ det ≠ 0. O sistema deixa de ter solução única quando o determinante dos coeficientes zera. det = 3k − 6 × 2 = 0 → k = 4.
