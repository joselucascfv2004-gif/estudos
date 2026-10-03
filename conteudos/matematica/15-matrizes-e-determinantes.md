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
Qual é o determinante da matriz A = [−3 3; −5 4]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 5
- B) 3
- C) 4
- D) 1
- E) 13

**Resposta:** B

**Explicação:** det = a·d − b·c = (−3)(4) − (3)(−5) = 3.

### 2
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = i − 2j + 3. Qual é o valor de a₂₂?

- A) 1
- B) 0
- C) 3
- D) 4
- E) 2

**Resposta:** A

**Explicação:** a₂₂ = 1·2 − 2·2 + 3 = 1.

### 3
Sendo A = [5 2; −5 0] e B = [1 9; −2 3], qual é o elemento da linha 2 e coluna 2 da matriz 2A − B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −3
- B) −6
- C) 3
- D) −1
- E) 0

**Resposta:** A

**Explicação:** Elemento (2,2): 2·(0) − (3) = −3.

### 4
Dada A = [6 7 2; 9 4 4; 5 8 6], qual é o elemento da linha 3, coluna 2 da transposta Aᵗ? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 6
- B) 8
- C) 7
- D) 4
- E) 12

**Resposta:** D

**Explicação:** Na transposta, linhas viram colunas: (Aᵗ)32 = A23 = 4.

### 5
Qual é o determinante da matriz A = [−5 −5; 4 7]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −14
- B) 2
- C) 15
- D) −15
- E) −55

**Resposta:** D

**Explicação:** det = a·d − b·c = (−5)(7) − (−5)(4) = −15.

### 6
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = 3i − 2j − 1. Qual é o valor de a₁₂?

- A) −13
- B) −4
- C) −2
- D) 0
- E) 3

**Resposta:** C

**Explicação:** a₁₂ = 3·1 − 2·2 − 1 = −2.

### 7
Sendo A = [2 −5; −2 2] e B = [−4 8; −5 −3], qual é o elemento da linha 2 e coluna 1 da matriz 2A − B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 0
- B) 11
- C) 1
- D) 6
- E) 3

**Resposta:** C

**Explicação:** Elemento (2,1): 2·(−2) − (−5) = 1.

### 8
Dada A = [7 3 8; 6 7 6; 5 2 6], qual é o elemento da linha 1, coluna 3 da transposta Aᵗ? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 6
- B) 5
- C) 8
- D) 13
- E) 7

**Resposta:** B

**Explicação:** Na transposta, linhas viram colunas: (Aᵗ)13 = A31 = 5.

### 9
Qual é o determinante da matriz A = [−1 −5; 8 −4]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 88
- B) 44
- C) 45
- D) 22
- E) 46

**Resposta:** B

**Explicação:** det = a·d − b·c = (−1)(−4) − (−5)(8) = 44.

### 10
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = 2i − j − 1. Qual é o valor de a₂₃?

- A) 0
- B) 3
- C) 10
- D) 2
- E) −13

**Resposta:** A

**Explicação:** a₂₃ = 2·2 − 1·3 − 1 = 0.

### 11
Sendo A = [1 −4; 2 9] e B = [6 4; 6 0], qual é o elemento da linha 1 e coluna 1 da matriz 2A − B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −10
- B) −5
- C) −4
- D) 8
- E) −2

**Resposta:** C

**Explicação:** Elemento (1,1): 2·(1) − (6) = −4.

### 12
Dada A = [4 8 6; 9 9 3; 9 6 2], qual é o elemento da linha 2, coluna 1 da transposta Aᵗ? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 9
- B) 7
- C) 17
- D) 8
- E) 4

**Resposta:** D

**Explicação:** Na transposta, linhas viram colunas: (Aᵗ)21 = A12 = 8.

### 13
Qual é o determinante da matriz A = [3 0; 0 3]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 6
- B) 9
- C) 27
- D) 10
- E) 7

**Resposta:** B

**Explicação:** det = a·d − b·c = (3)(3) − (0)(0) = 9.

### 14
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = i − 3j + 1. Qual é o valor de a₁₁?

- A) −1
- B) −3
- C) −2
- D) 1
- E) 9

**Resposta:** A

**Explicação:** a₁₁ = 1·1 − 3·1 + 1 = −1.

### 15
Sendo A = [8 9; 7 −2] e B = [6 9; 6 8], qual é o elemento da linha 1 e coluna 2 da matriz 3A − B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 18
- B) 28
- C) 0
- D) 15
- E) 36

**Resposta:** A

**Explicação:** Elemento (1,2): 3·(9) − (9) = 18.

### 16
Dada A = [4 6 1; 3 8 9; 3 1 6], qual é o elemento da linha 3, coluna 2 da transposta Aᵗ? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 10
- B) 8
- C) 9
- D) 6
- E) 1

**Resposta:** C

**Explicação:** Na transposta, linhas viram colunas: (Aᵗ)32 = A23 = 9.

### 17
Qual é o determinante da matriz A = [9 9; 9 2]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 11
- B) 63
- C) 99
- D) −62
- E) −63

**Resposta:** E

**Explicação:** det = a·d − b·c = (9)(2) − (9)(9) = −63.

### 18
A matriz A = (aᵢⱼ) 3×3 é definida por aᵢⱼ = 4i + 2j + 4. Qual é o valor de a₁₃?

- A) 14
- B) 28
- C) 10
- D) 6
- E) 18

**Resposta:** A

**Explicação:** a₁₃ = 4·1 + 2·3 + 4 = 14.

### 19
Sendo A = [3 8; 3 4] e B = [−1 8; 2 −5], qual é o elemento da linha 1 e coluna 1 da matriz 2A − B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 9
- B) 5
- C) 8
- D) 7
- E) 4

**Resposta:** D

**Explicação:** Elemento (1,1): 2·(3) − (−1) = 7.

### 20
Dada A = [5 4 4; 8 2 9; 9 8 5], qual é o elemento da linha 1, coluna 2 da transposta Aᵗ? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 8
- B) 4
- C) 5
- D) 12
- E) 2

**Resposta:** A

**Explicação:** Na transposta, linhas viram colunas: (Aᵗ)12 = A21 = 8.

## Médio

### 1
Qual é o determinante da matriz [4 0 3; 0 −2 2; 3 −1 4]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 6
- B) −4
- C) −10
- D) −6
- E) −32

**Resposta:** D

**Explicação:** Pela regra de Sarrus (ou por cofatores), det = −6.

### 2
Sendo A = [−3 3; −3 5] e B = [0 −2; 2 1], qual é o elemento c₁₂ da matriz C = A·B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 12
- B) 11
- C) 18
- D) 9
- E) 8

**Resposta:** D

**Explicação:** c12 = (linha 1 de A)·(coluna 2 de B) = −3·−2 + 3·1 = 9.

### 3
Uma matriz quadrada A de ordem 3 tem determinante 8. Qual é o determinante da matriz 2A?

- A) 16
- B) 64
- C) 128
- D) 10
- E) 48

**Resposta:** B

**Explicação:** Multiplicar uma matriz de ordem 3 por 2 multiplica cada uma das 3 linhas por 2: det(2A) = 2^3·det A = 8 × 8 = 64.

### 4
Para qual valor de x o determinante da matriz [1 x; 3 3] é igual a zero? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 4
- B) 11
- C) 3
- D) 1,33
- E) 1

**Resposta:** E

**Explicação:** det = 1·3 − x·3 = 0 ⇒ 3x = 3 ⇒ x = 1.

### 5
Qual é o determinante da matriz [−2 3 −2; −1 4 −2; −3 4 −3]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 1
- B) 4
- C) 3
- D) 2
- E) 24

**Resposta:** A

**Explicação:** Pela regra de Sarrus (ou por cofatores), det = 1.

### 6
Sendo A = [−2 3; 5 3] e B = [−1 −3; −2 2], qual é o elemento c₁₂ da matriz C = A·B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 15
- B) 14
- C) 10
- D) 18
- E) 12

**Resposta:** E

**Explicação:** c12 = (linha 1 de A)·(coluna 2 de B) = −2·−3 + 3·2 = 12.

### 7
Uma matriz quadrada A de ordem 3 tem determinante −4. Qual é o determinante da matriz 2A?

- A) −32
- B) −64
- C) −2
- D) −24
- E) −8

**Resposta:** A

**Explicação:** Multiplicar uma matriz de ordem 3 por 2 multiplica cada uma das 3 linhas por 2: det(2A) = 2^3·det A = 8 × (−4) = −32.

### 8
Para qual valor de x o determinante da matriz [4 x; 4 2] é igual a zero? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 1,5
- B) 2
- C) 8
- D) 1
- E) 3

**Resposta:** B

**Explicação:** det = 4·2 − x·4 = 0 ⇒ 4x = 8 ⇒ x = 2.

### 9
Qual é o determinante da matriz [0 3 3; 0 −1 −1; −3 −1 −3]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −2
- B) 0
- C) 2
- D) 3
- E) −4

**Resposta:** B

**Explicação:** Pela regra de Sarrus (ou por cofatores), det = 0.

### 10
Sendo A = [−2 5; 5 1] e B = [5 −1; 4 −3], qual é o elemento c₁₂ da matriz C = A·B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −11
- B) −23
- C) −6
- D) −5
- E) −13

**Resposta:** E

**Explicação:** c12 = (linha 1 de A)·(coluna 2 de B) = −2·−1 + 5·−3 = −13.

### 11
Uma matriz quadrada A de ordem 3 tem determinante 6. Qual é o determinante da matriz 2A?

- A) 12
- B) 48
- C) 96
- D) 36
- E) 8

**Resposta:** B

**Explicação:** Multiplicar uma matriz de ordem 3 por 2 multiplica cada uma das 3 linhas por 2: det(2A) = 2^3·det A = 8 × 6 = 48.

### 12
Para qual valor de x o determinante da matriz [4 x; 2 3] é igual a zero? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 3,5
- B) 0,5
- C) 18
- D) 12
- E) 6

**Resposta:** E

**Explicação:** det = 4·3 − x·2 = 0 ⇒ 2x = 12 ⇒ x = 6.

### 13
Qual é o determinante da matriz [2 −3 3; 2 −3 −2; 3 −1 4]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 35
- B) 31
- C) 34
- D) 37
- E) 36

**Resposta:** A

**Explicação:** Pela regra de Sarrus (ou por cofatores), det = 35.

### 14
Sendo A = [0 2; 3 3] e B = [−2 1; 4 −2], qual é o elemento c₂₂ da matriz C = A·B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 6
- B) 2
- C) −3
- D) −6
- E) −1

**Resposta:** C

**Explicação:** c22 = (linha 2 de A)·(coluna 2 de B) = 3·1 + 3·−2 = −3.

### 15
Uma matriz quadrada A de ordem 3 tem determinante −3. Qual é o determinante da matriz 2A?

- A) −48
- B) −6
- C) −18
- D) −24
- E) −1

**Resposta:** D

**Explicação:** Multiplicar uma matriz de ordem 3 por 2 multiplica cada uma das 3 linhas por 2: det(2A) = 2^3·det A = 8 × (−3) = −24.

### 16
Para qual valor de x o determinante da matriz [4 x; 5 5] é igual a zero? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 20
- B) 2
- C) 1,8
- D) 1,25
- E) 4

**Resposta:** E

**Explicação:** det = 4·5 − x·5 = 0 ⇒ 5x = 20 ⇒ x = 4.

### 17
Qual é o determinante da matriz [−3 4 −3; −1 0 3; −1 0 −3]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −22
- B) −28
- C) −24
- D) 24
- E) 0

**Resposta:** C

**Explicação:** Pela regra de Sarrus (ou por cofatores), det = −24.

### 18
Sendo A = [−1 2; −2 1] e B = [2 5; 2 2], qual é o elemento c₁₂ da matriz C = A·B? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 10
- B) 2
- C) −1
- D) 1
- E) −6

**Resposta:** C

**Explicação:** c12 = (linha 1 de A)·(coluna 2 de B) = −1·5 + 2·2 = −1.

### 19
Uma matriz quadrada A de ordem 2 tem determinante −3. Qual é o determinante da matriz 3A?

- A) 0
- B) −9
- C) −27
- D) −81
- E) −18

**Resposta:** C

**Explicação:** Multiplicar uma matriz de ordem 2 por 3 multiplica cada uma das 2 linhas por 3: det(3A) = 3^2·det A = 9 × (−3) = −27.

### 20
Para qual valor de x o determinante da matriz [3 x; 4 4] é igual a zero? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 1,33
- B) 3
- C) 1,75
- D) 2
- E) 12

**Resposta:** B

**Explicação:** det = 3·4 − x·4 = 0 ⇒ 4x = 12 ⇒ x = 3.

## Difícil

### 1
A e B são matrizes quadradas de ordem 3 com det A = −3 e det B = 2. Qual é o valor de det(AᵗB)?

- A) −1
- B) 6
- C) −18
- D) −6
- E) −3/2

**Resposta:** D

**Explicação:** det(AᵗB) = det A · det B = −3 × 2 = −6 (e det Aᵗ = det A).

### 2
Qual é o elemento da linha 2, coluna 2 da inversa da matriz [1 1; 1 2]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) −1
- B) 1
- C) −1/2
- D) 1/2
- E) 2

**Resposta:** B

**Explicação:** Para [a b; c d], A⁻¹ = (1/det)·[d −b; −c a]. det = 1. Elemento (2,2) = 1/1 = 1.

### 3
No sistema { 2x + y = 0 ; 2x + 5y = 24 }, use a regra de Cramer para encontrar x.

- A) 8
- B) −3
- C) 3
- D) −4
- E) 6

**Resposta:** B

**Explicação:** D = 2·5 − 1·2 = 8; Dx = 0·5 − 1·24 = −24. x = Dx/D = −3.

### 4
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [−1 −1; 2 −3]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 25
- B) 8
- C) 6
- D) 10
- E) 16

**Resposta:** C

**Explicação:** A² tem diagonal (−1)² + (−1)·2 = −1 e 2·(−1) + (−3)² = 7. Traço = 6.

### 5
A e B são matrizes quadradas de ordem 3 com det A = 2 e det B = 3. Qual é o valor de det(A⁻¹)?

- A) 1/4
- B) −2
- C) 1/2
- D) −1/2
- E) 2

**Resposta:** C

**Explicação:** det(A⁻¹) = 1/det A = 1/2.

### 6
No sistema { 3x + 3y = −6 ; 4x + 2y = 0 }, use a regra de Cramer para encontrar x.

- A) 1
- B) 4
- C) 2
- D) 5
- E) 3

**Resposta:** C

**Explicação:** D = 3·2 − 3·4 = −6; Dx = −6·2 − 3·0 = −12. x = Dx/D = 2.

### 7
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [0 −2; 3 −3]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 9
- B) −3
- C) 36
- D) −1
- E) 0

**Resposta:** B

**Explicação:** A² tem diagonal 0² + (−2)·3 = −6 e 3·(−2) + (−3)² = 3. Traço = −3.

### 8
A e B são matrizes quadradas de ordem 3 com det A = 6 e det B = 2. Qual é o valor de det(AB)?

- A) 12
- B) 36
- C) 8
- D) −12
- E) 3

**Resposta:** A

**Explicação:** det(AB) = det A · det B = 6 × 2 = 12 (e det Aᵗ = det A).

### 9
No sistema { 3x + 5y = 4 ; 5x + 2y = 13 }, use a regra de Cramer para encontrar x.

- A) 3
- B) 4
- C) 2
- D) 5
- E) 1

**Resposta:** A

**Explicação:** D = 3·2 − 5·5 = −19; Dx = 4·2 − 5·13 = −57. x = Dx/D = 3.

### 10
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [1 2; 3 2]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 5
- B) 16
- C) 17
- D) 19
- E) 9

**Resposta:** C

**Explicação:** A² tem diagonal 1² + 2·3 = 7 e 3·2 + 2² = 10. Traço = 17.

### 11
A e B são matrizes quadradas de ordem 3 com det A = −3 e det B = −1. Qual é o valor de det(A⁻¹)?

- A) 1/3
- B) −1/3
- C) 3
- D) 1/9
- E) −3

**Resposta:** B

**Explicação:** det(A⁻¹) = 1/det A = −1/3.

### 12
No sistema { 2x + 5y = 26 ; 4x − y = 8 }, use a regra de Cramer para encontrar x.

- A) 3
- B) 7
- C) 4
- D) 2
- E) 5

**Resposta:** A

**Explicação:** D = 2·−1 − 5·4 = −22; Dx = 26·−1 − 5·8 = −66. x = Dx/D = 3.

### 13
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [−2 −3; −1 2]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 16
- B) 0
- C) 14
- D) 8
- E) 49

**Resposta:** C

**Explicação:** A² tem diagonal (−2)² + (−3)·(−1) = 7 e (−1)·(−3) + 2² = 7. Traço = 14.

### 14
No sistema { 2x + 5y = 18 ; 5x + 4y = 11 }, use a regra de Cramer para encontrar x.

- A) 1
- B) −17
- C) 3
- D) 4
- E) −1

**Resposta:** E

**Explicação:** D = 2·4 − 5·5 = −17; Dx = 18·4 − 5·11 = 17. x = Dx/D = −1.

### 15
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [−2 −2; 3 4]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 12
- B) 20
- C) 10
- D) 4
- E) 8

**Resposta:** E

**Explicação:** A² tem diagonal (−2)² + (−2)·3 = −2 e 3·(−2) + 4² = 10. Traço = 8.

### 16
A e B são matrizes quadradas de ordem 3 com det A = 5 e det B = 2. Qual é o valor de det(A⁻¹)?

- A) −5
- B) 1/25
- C) 1/5
- D) −1/5
- E) 5

**Resposta:** C

**Explicação:** det(A⁻¹) = 1/det A = 1/5.

### 17
No sistema { 5x + 2y = 37 ; 4x + 3y = 38 }, use a regra de Cramer para encontrar x.

- A) 3
- B) 11
- C) 5
- D) 6
- E) 7

**Resposta:** C

**Explicação:** D = 5·3 − 2·4 = 7; Dx = 37·3 − 2·38 = 35. x = Dx/D = 5.

### 18
Qual é o traço (soma da diagonal principal) da matriz A², sendo A = [0 1; 0 −1]? (Notação: [a b; c d] indica a matriz cujas linhas são separadas por ";".)

- A) 3
- B) 0
- C) 11
- D) 1
- E) 2

**Resposta:** D

**Explicação:** A² tem diagonal 0² + 1·0 = 0 e 0·1 + (−1)² = 1. Traço = 1.

### 19
A e B são matrizes quadradas de ordem 3 com det A = 3 e det B = 5. Qual é o valor de det(A⁻¹)?

- A) −3
- B) 3
- C) 1/9
- D) 1/3
- E) −1/3

**Resposta:** D

**Explicação:** det(A⁻¹) = 1/det A = 1/3.

### 20
No sistema { 5x + 4y = 11 ; 2x + 3y = 10 }, use a regra de Cramer para encontrar x.

- A) 1
- B) 4
- C) 7
- D) 3
- E) −1

**Resposta:** E

**Explicação:** D = 5·3 − 4·2 = 7; Dx = 11·3 − 4·10 = −7. x = Dx/D = −1.
