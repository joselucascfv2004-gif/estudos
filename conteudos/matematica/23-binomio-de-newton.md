---
titulo: Binômio de Newton e triângulo de Pascal
provas: Militares
descricao: Números binomiais, triângulo de Pascal, termo geral, termo independente, soma de coeficientes e aplicações.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Binômio de Newton e triângulo de Pascal

Números binomiais, triângulo de Pascal, termo geral, termo independente, soma de coeficientes e aplicações.

## Resumo

- **Número binomial:** C(n, k) = n! / [k!(n − k)!], o número de jeitos de escolher k de n. C(n, 0) = C(n, n) = 1; C(n, 1) = n.
- **Complementares:** C(n, k) = C(n, n − k). Se C(n, a) = C(n, b) com a ≠ b, então a + b = n.
- **Triângulo de Pascal:** cada número é a soma dos dois de cima (Stifel: C(n, k) + C(n, k + 1) = C(n + 1, k + 1)). A soma da linha n é 2ⁿ.
- **Binômio:** (x + y)ⁿ tem n + 1 termos, com coeficientes da linha n de Pascal.
- **Termo geral:** T = C(n, k)·xⁿ⁻ᵏ·yᵏ (é o termo de ordem k + 1). Para o termo independente, iguale o expoente de x a zero.
- **Soma dos coeficientes:** troque as letras por 1. Em (2x − 1)⁵, a soma é (2 − 1)⁵ = 1.
- **Sinais:** em (x − a)ⁿ, os termos alternam de sinal; o sinal depende da paridade do expoente de (−a).
- **Aplicações:** número de subconjuntos (2ⁿ), aproximações como (1,01)¹⁰ ≈ 1 + 10·0,01 + 45·0,0001, restos como 9ⁿ = (8 + 1)ⁿ, que deixa resto 1 por 8.

## Fácil

### 1
<!-- modelo: f6 -->
Qual é o valor de C(7, 4) + C(7, 5)?

- A) 70
- B) 7
- C) 28
- D) 84
- E) 56

**Resposta:** E

**Explicação:** Ferramenta: relação de Stifel. Dois vizinhos de uma linha de Pascal somam o número logo abaixo: C(n, k) + C(n, k + 1) = C(n + 1, k + 1). C(8, 5) = 56.

### 2
<!-- modelo: f7 -->
Qual é o termo independente de x (o termo sem x) no desenvolvimento de (x + 2)³?

- A) 12
- B) 6
- C) 4
- D) 3
- E) 8

**Resposta:** E

**Explicação:** Ferramenta: termo independente. O termo sem x é o último: C(3, 3)·2³. 2³ = 8.

### 3
<!-- modelo: f14 -->
Qual é o primeiro termo do desenvolvimento de (2x + 1)³?

- A) 8x²
- B) 2x³
- C) 3x³
- D) 6x³
- E) 8x³

**Resposta:** E

**Explicação:** Ferramenta: primeiro termo. É (2x)³: o coeficiente também vai à potência. 2³x³ = 8x³.

### 4
<!-- modelo: f15 -->
Qual é o valor de C(30, 29)?

- A) 30
- B) 870
- C) 1
- D) 435
- E) 29

**Resposta:** A

**Explicação:** Ferramenta: binomial complementar. C(30, 29) = C(30, 1): escolher 29 é o mesmo que escolher o 1 que fica de fora. = 30.

### 5
<!-- modelo: f1 -->
Qual é o valor do número binomial C(8, 3) (combinação de 8 elementos 3 a 3)?

- A) 336
- B) 70
- C) 56
- D) 35
- E) 24

**Resposta:** C

**Explicação:** Ferramenta: fórmula do binomial. C(n, k) = n! / [k!·(n − k)!]. C(8, 3) = 8 · 7 · 6 / 3! = 56.

### 6
<!-- modelo: f10 -->
Um conjunto tem 5 elementos. Quantos subconjuntos ele tem (contando o vazio e o próprio conjunto)?

- A) 31
- B) 120
- C) 10
- D) 32
- E) 25

**Resposta:** D

**Explicação:** Ferramenta: cada elemento entra ou não entra. Para cada elemento há 2 escolhas; ou some a linha 5 de Pascal. 2⁵ = 32 subconjuntos.

### 7
<!-- modelo: f8 -->
Qual é a soma C(7, 0) + C(7, 1) + C(7, 2) + ··· + C(7, 7)?

- A) 14
- B) 49
- C) 64
- D) 127
- E) 128

**Resposta:** E

**Explicação:** Ferramenta: soma da linha de Pascal. A soma da linha n é 2ⁿ (basta fazer x = y = 1 em (x + y)ⁿ). 2⁷ = 128.

### 8
<!-- modelo: f9 -->
Qual é o 3º termo do desenvolvimento de (x + 1)⁵, segundo as potências decrescentes de x?

- A) 10x²
- B) 10x⁴
- C) 10x³
- D) 5x⁴
- E) 5x³

**Resposta:** C

**Explicação:** Ferramenta: termo geral. O termo de ordem k + 1 é C(n, k)·xⁿ⁻ᵏ·1ᵏ. O 3º termo tem k = 2. C(5, 2)·x³ = 10x³.

### 9
<!-- modelo: f13 -->
Qual é o último termo do desenvolvimento de (2x − 1)⁵, segundo as potências decrescentes de x?

- A) −5
- B) −32
- C) 0
- D) 1
- E) −1

**Resposta:** E

**Explicação:** Ferramenta: último termo. É o termo sem x: (−1)⁵. Expoente ímpar dá −1. Último termo: −1.

### 10
<!-- modelo: f12 -->
No desenvolvimento de (x + 4)³, qual é o coeficiente de x?

- A) 16
- B) 12
- C) 48
- D) 72
- E) 64

**Resposta:** C

**Explicação:** Ferramenta: termo com x¹. Escolhe-se x em um dos 3 fatores e 4 nos outros 2: C(3, 1)·4². 3 · 16 = 48.

### 11
<!-- modelo: f11 -->
Na linha 9 do triângulo de Pascal, qual número é igual a C(9, 3)?

- A) C(9, 4)
- B) C(9, 6)
- C) C(9, 5)
- D) C(10, 3)
- E) C(6, 3)

**Resposta:** B

**Explicação:** Ferramenta: simetria da linha. Cada linha de Pascal é simétrica: lida de trás para frente, é igual. C(9, 3) = C(9, 6) = 84.

### 12
<!-- modelo: f2 -->
Quantos termos tem o desenvolvimento de (2a − b)¹⁰?

- A) 11
- B) 12
- C) 20
- D) 10
- E) 9

**Resposta:** A

**Explicação:** Ferramenta: n + 1 termos. No desenvolvimento de (x + y)ⁿ, o expoente de y vai de 0 até n: são n + 1 termos. 10 + 1 = 11 termos.

### 13
<!-- modelo: f17 -->
Qual é o valor de 8! / 6!?

- A) 28
- B) 59
- C) 55
- D) 2
- E) 56

**Resposta:** E

**Explicação:** Ferramenta: cancelar o fatorial menor. 8! = 8 · 7 · 6!, então o 6! cancela. 8 · 7 = 56.

### 14
<!-- modelo: f5 -->
O número binomial C(13, 3) é igual a C(13, p), com p ≠ 3. Qual é o valor de p?

- A) 4
- B) 13
- C) 9
- D) 10
- E) 16

**Resposta:** D

**Explicação:** Ferramenta: binomiais complementares. Escolher k elementos é o mesmo que escolher os n − k que ficam de fora: C(n, k) = C(n, n − k). p = 13 − 3 = 10.

### 15
<!-- modelo: f16 -->
As potências 11⁰ = 1, 11¹ = 11, 11² = 121 e 11³ = 1 331 repetem as primeiras linhas do triângulo de Pascal. Qual é o valor de 11⁴?

- A) 14.541
- B) 14.641
- C) 13.431
- D) 15.641
- E) 12.321

**Resposta:** B

**Explicação:** Ferramenta: binômio (10 + 1)⁴. 11⁴ = (10 + 1)⁴ = 1·10⁴ + 4·10³ + 6·10² + 4·10 + 1, que usa a linha 1, 4, 6, 4, 1. 10 000 + 4 000 + 600 + 40 + 1 = 14 641.

### 16
<!-- modelo: f4 -->
No desenvolvimento de (x + 1)⁸, qual é o coeficiente de x⁶?

- A) 56
- B) 29
- C) 28
- D) 6
- E) 48

**Resposta:** C

**Explicação:** Ferramenta: coeficientes = linha de Pascal. Em (x + 1)ⁿ, o coeficiente de xᵏ é C(n, k). C(8, 6) = 28.

### 17
<!-- modelo: f3 -->
Qual é a linha 5 do triângulo de Pascal (a linha que começa com 1, 5)?

- A) 1, 5, 11, 10, 5, 1
- B) 1, 5, 5, 5, 5, 1
- C) 1, 6, 15, 20, 15, 6, 1
- D) 1, 4, 6, 4, 1
- E) 1, 5, 10, 10, 5, 1

**Resposta:** E

**Explicação:** Ferramenta: cada número é a soma dos dois de cima. A linha 4 é 1, 4, 6, 4, 1. Somando vizinhos, sai a linha 5. 1, 5, 10, 10, 5, 1.

## Médio

### 1
<!-- modelo: m2 -->
Qual é a soma dos coeficientes do desenvolvimento de (3x − 1)¹⁰?

- A) 0
- B) 59.049
- C) 1.536
- D) 1.048.576
- E) 1.024

**Resposta:** E

**Explicação:** Ferramenta: fazer x = 1. A soma dos coeficientes de um polinômio é o seu valor em x = 1. (3·1 − 1)¹⁰ = 2¹⁰ = 1.024.

### 2
<!-- modelo: m7 -->
Sabendo que C(n, 2) = C(n, 4), com n natural, qual é o valor de n?

- A) 8
- B) 4
- C) 2
- D) 7
- E) 6

**Resposta:** E

**Explicação:** Ferramenta: binomiais complementares. Como 2 ≠ 4, a igualdade só vale se 2 + 4 = n. n = 6.

### 3
<!-- modelo: m13 -->
Qual é o maior coeficiente do desenvolvimento de (x + y)⁸?

- A) 16
- B) 56
- C) 256
- D) 35
- E) 70

**Resposta:** E

**Explicação:** Ferramenta: o meio da linha. Os números de cada linha de Pascal crescem até o meio e depois diminuem. O maior é C(8, 4) = 70.

### 4
<!-- modelo: m6 -->
Para que valor de n vale C(n, 2) = 55?

- A) 11
- B) 22
- C) 12
- D) 10
- E) 27,5

**Resposta:** A

**Explicação:** Ferramenta: C(n, 2) = n(n − 1)/2. n(n − 1)/2 = 55 ⇒ n(n − 1) = 110. 11 · 10 = 110 ⇒ n = 11.

### 5
<!-- modelo: m9 -->
A soma dos coeficientes do desenvolvimento de (x + y)ⁿ é 512. Qual é o valor de n?

- A) 18
- B) 256
- C) 8
- D) 9
- E) 10

**Resposta:** D

**Explicação:** Ferramenta: soma = 2ⁿ. Com x = y = 1, a soma dos coeficientes vale 2ⁿ. 2ⁿ = 512 ⇒ n = 9.

### 6
<!-- modelo: m16 -->
Qual é o termo em x² no desenvolvimento de (x − 3)⁶?

- A) 1.215x²
- B) −1.215x²
- C) 81x²
- D) 15x²
- E) 45x²

**Resposta:** A

**Explicação:** Ferramenta: sinal de (−a) elevado. O termo é C(6, 2)·x²·(−3)⁴; com expoente par, o sinal é positivo. 15 · 81 = 1.215.

### 7
<!-- modelo: m11 -->
Uma pizzaria oferece 5 coberturas diferentes, e cada pizza leva pelo menos uma cobertura (sem repetir). Quantas pizzas diferentes podem ser montadas?

- A) 32
- B) 10
- C) 31
- D) 25
- E) 120

**Resposta:** C

**Explicação:** Ferramenta: soma da linha menos o vazio. Cada cobertura entra ou não: 2⁵ escolhas, mas a pizza sem cobertura não vale. 2⁵ − 1 = 31.

### 8
<!-- modelo: m15 -->
Qual é o coeficiente de x³y² no desenvolvimento de (2x + y)⁵?

- A) 20
- B) 10
- C) 8
- D) 40
- E) 80

**Resposta:** E

**Explicação:** Ferramenta: termo geral com dois coeficientes. Escolhe-se 2x em 3 fatores e y nos outros 2: C(5, 3)·2³. 10 · 8 = 80.

### 9
<!-- modelo: m10 -->
Qual é o coeficiente de x⁵ no desenvolvimento de (1 − x)⁸?

- A) −28
- B) 70
- C) −8
- D) −56
- E) 56

**Resposta:** D

**Explicação:** Ferramenta: sinal alternado. O termo com xᵏ é C(8, k)·(−x)ᵏ; com k ímpar, o sinal é negativo. C(8, 5)·(−1)⁵ = −56.

### 10
<!-- modelo: m3 -->
Qual é o termo independente de x no desenvolvimento de (x + 1/x)¹⁰?

- A) 10
- B) 1.024
- C) 252
- D) 210
- E) 1

**Resposta:** C

**Explicação:** Ferramenta: igualar o expoente a zero. O termo geral é C(10, k)·x¹⁰⁻ᵏ·x⁻ᵏ = C(10, k)·x^(10 − 2k). Expoente zero: k = 5. C(10, 5) = 252.

### 11
<!-- modelo: m14 -->
Qual é o valor de C(7, 0) + C(7, 2) + C(7, 4) + ··· (só os de índice par)?

- A) 65
- B) 128
- C) 14
- D) 64
- E) 32

**Resposta:** D

**Explicação:** Ferramenta: somar e subtrair (1 + 1)ⁿ e (1 − 1)ⁿ. (1 + 1)ⁿ soma tudo; (1 − 1)ⁿ = 0 soma com sinais alternados. Somando as duas, os ímpares somem e os pares dobram. Pares = 2⁷/2 = 64.

### 12
<!-- modelo: m8 -->
Usando os três primeiros termos do binômio de Newton, qual é o valor aproximado de (1 + 0,02)¹⁰?

- A) 1
- B) 1,204
- C) 1,2
- D) 10,2
- E) 1,218

**Resposta:** E

**Explicação:** Ferramenta: aproximação binomial. (1 + p)ⁿ = 1 + n·p + C(n, 2)·p² + ...; com p pequeno, os termos seguintes quase não contam. 1 + 10·0,02 + 45·0,0004 = 1,218.

### 13
<!-- modelo: m5 -->
Qual é o termo médio do desenvolvimento de (x + 2)⁸?

- A) 70x⁴
- B) 140x⁴
- C) 448x⁵
- D) 1.120x⁴
- E) 16x⁴

**Resposta:** D

**Explicação:** Ferramenta: termo do meio. Com 9 termos, o do meio é o 5º: C(8, 4)·x⁴·2⁴. 70 · 16 = 1.120, ou seja, 1.120x⁴.

### 14
<!-- modelo: m17 -->
Sabendo que C(8, 3) = 56 e C(8, 4) = 70, quanto vale C(9, 4)?

- A) 14
- B) 126
- C) 112
- D) 127
- E) 84

**Resposta:** B

**Explicação:** Ferramenta: relação de Stifel. C(n, k) + C(n, k + 1) = C(n + 1, k + 1). 56 + 70 = 126.

### 15
<!-- modelo: m12 -->
Qual é o valor de C(2, 2) + C(3, 2) + C(4, 2) + C(5, 2) + C(6, 2)?

- A) 34
- B) 64
- C) 20
- D) 35
- E) 21

**Resposta:** D

**Explicação:** Ferramenta: soma numa coluna de Pascal ("taco de hóquei"). Somando uma coluna do triângulo de cima até a linha 6, o resultado é o número abaixo e à direita: C(7, 3). C(7, 3) = 35.

### 16
<!-- modelo: m1 -->
Qual é o coeficiente de x³ no desenvolvimento de (x + 3)⁶?

- A) 27
- B) 540
- C) 1.080
- D) 60
- E) 20

**Resposta:** B

**Explicação:** Ferramenta: termo geral. Para ter x³, escolhe-se x em 3 fatores e 3 nos outros 3: C(6, 3)·3³. 20 · 27 = 540.

### 17
<!-- modelo: m4 -->
Qual é o termo independente de x no desenvolvimento de (x² + 1/x)⁶?

- A) 21
- B) 20
- C) 15
- D) 6
- E) 64

**Resposta:** C

**Explicação:** Ferramenta: igualar o expoente a zero. Termo geral: C(6, k)·(x²)⁶⁻ᵏ·(1/x)ᵏ = C(6, k)·x^(12 − 3k). Expoente zero: k = 4. C(6, 4) = 15.

## Difícil

### 1
<!-- modelo: d13 -->
Qual é o valor de C(12, 0) − C(12, 1) + C(12, 2) − C(12, 3) + ··· ± C(12, 12)?

- A) 2.048
- B) 1
- C) 4.096
- D) −1
- E) 0

**Resposta:** E

**Explicação:** Ferramenta: fazer x = 1 e y = −1. A soma alternada é o desenvolvimento de (1 − 1)ⁿ. (1 − 1)¹² = 0.

### 2
<!-- modelo: d12 -->
Qual é o coeficiente de x² no desenvolvimento de (1 + x + x²)²?

- A) 2
- B) 4
- C) 3
- D) 1
- E) 9

**Resposta:** C

**Explicação:** Ferramenta: multiplicar e agrupar. (1 + x + x²)² = 1 + 2x + 3x² + 2x³ + x⁴. Coeficiente de x²: 3.

### 3
<!-- modelo: d15 -->
Uma moeda honesta é lançada 5 vezes. Qual é a probabilidade de sair cara exatamente 2 vezes?

- A) 5/16
- B) 5/32
- C) 1/2
- D) 1/32
- E) 2/5

**Resposta:** A

**Explicação:** Ferramenta: binomial em probabilidade. Há 2⁵ sequências igualmente prováveis; as que têm 2 caras são C(5, 2) = 10. 10/32 = 5/16.

### 4
<!-- modelo: d3 -->
Qual é o resto da divisão de 11⁴⁵ por 10?

- A) 2
- B) 11
- C) 9
- D) 1
- E) 0

**Resposta:** D

**Explicação:** Ferramenta: escrever a base como (múltiplo + 1). 11 = 10 + 1. No binômio (10 + 1)⁴⁵, todos os termos têm fator 10, menos o último, que é 1. Resto 1.

### 5
<!-- modelo: d8 -->
Qual é o valor de (1 + √2)⁴ + (1 − √2)⁴?

- A) 34
- B) 10
- C) 17
- D) 50
- E) 0

**Resposta:** A

**Explicação:** Ferramenta: termos ímpares se cancelam. Somando os dois desenvolvimentos, os termos com √2 elevado a expoente ímpar se cancelam e os outros dobram. 2·[1 + 6·2 + 2²] = 34.

### 6
<!-- modelo: d16 -->
Depois de reduzidos os termos semelhantes, quantos termos diferentes tem o desenvolvimento de (a + b + c)²?

- A) 7
- B) 3
- C) 9
- D) 16
- E) 6

**Resposta:** E

**Explicação:** Ferramenta: contar expoentes possíveis. Cada termo é aᵖbᑫcʳ com p + q + r = 2. O número de soluções naturais é C(2 + 2, 2). C(4, 2) = 6 termos.

### 7
<!-- modelo: d10 -->
Qual é o maior coeficiente do desenvolvimento de (1 + 2x)⁶?

- A) 64
- B) 20
- C) 729
- D) 240
- E) 160

**Resposta:** D

**Explicação:** Ferramenta: listar os coeficientes. Com o fator 2ᵏ, o maior coeficiente não fica mais no meio. Calcule C(n, k)·2ᵏ para cada k. 1, 12, 60, 160, 240, 192, 64: o maior é 240.

### 8
<!-- modelo: d6 -->
Quantos termos racionais (sem raízes) há no desenvolvimento de (√2 + ∛3)⁶?

- A) 1
- B) 7
- C) 4
- D) 3
- E) 2

**Resposta:** E

**Explicação:** Ferramenta: expoentes compatíveis com as raízes. O termo geral é C(6, k)·(√2)⁶⁻ᵏ·(∛3)ᵏ. Para não sobrar raiz, 6 − k deve ser par e k múltiplo de 3. k = 0 (2³ = 8) e k = 6 (3² = 9): 2 termos. Com k = 3, 6 − k = 3 é ímpar.

### 9
<!-- modelo: d2 -->
No desenvolvimento de (1 + x)ⁿ, os coeficientes de x⁴ e de x⁵ são iguais. Qual é o valor de n?

- A) 10
- B) 7
- C) 9
- D) 5
- E) 8

**Resposta:** C

**Explicação:** Ferramenta: binomiais complementares. C(n, 4) = C(n, 5) com 4 ≠ 5 exige 4 + 5 = n. n = 9.

### 10
<!-- modelo: d7 -->
O terceiro termo do desenvolvimento de (x + 1)ⁿ, nas potências decrescentes de x, tem coeficiente 91. Qual é o valor de n?

- A) 15
- B) 16
- C) 13
- D) 14
- E) 6,5

**Resposta:** D

**Explicação:** Ferramenta: terceiro termo = C(n, 2). O 3º termo é C(n, 2)·xⁿ⁻². Resolva n(n − 1)/2 = 91. n(n − 1) = 182 ⇒ n = 14.

### 11
<!-- modelo: d9 -->
Qual é o valor de C(5, 0) + 3·C(5, 1) + 3²·C(5, 2) + ··· + 3⁵·C(5, 5)?

- A) 96
- B) 1.024
- C) 32
- D) 1.023
- E) 243

**Resposta:** B

**Explicação:** Ferramenta: reconhecer (1 + b)ⁿ. A soma é o desenvolvimento de (1 + 3)⁵. 4⁵ = 1.024.

### 12
<!-- modelo: d5 -->
Qual é o valor de 1·C(6, 1) + 2·C(6, 2) + 3·C(6, 3) + ··· + 6·C(6, 6)?

- A) 36
- B) 384
- C) 64
- D) 192
- E) 32

**Resposta:** D

**Explicação:** Ferramenta: k·C(n, k) = n·C(n − 1, k − 1). Cada parcela vira 6·C(5, k − 1); a soma de C(5, ·) é 2⁵. 6 · 2⁵ = 192.

### 13
<!-- modelo: d1 -->
Qual é o termo independente de x no desenvolvimento de (2x − 1/x²)⁶?

- A) 120
- B) 480
- C) 160
- D) 15
- E) 240

**Resposta:** E

**Explicação:** Ferramenta: termo geral com expoente zero. Termo geral: C(6, k)·(2x)⁶⁻ᵏ·(−1/x²)ᵏ, com expoente de x igual a 6 − 3k. Zero quando k = 2. C(6, 2)·2⁴·(−1)² = 15 · 16 = 240.

### 14
<!-- modelo: d4 -->
Qual é o resto da divisão de 11³ por 100 (isto é, os dois últimos algarismos)?

- A) 30
- B) 1
- C) 31
- D) 11
- E) 41

**Resposta:** C

**Explicação:** Ferramenta: binômio (10 + 1)ⁿ. 11ⁿ = (10 + 1)ⁿ = ... + C(n, 2)·10² + n·10 + 1. A partir de 10², tudo é múltiplo de 100. Resto: 3 · 10 + 1 = 31.

### 15
<!-- modelo: d11 -->
Qual é o coeficiente de x⁵ no produto (1 + x)²·(1 + x)⁴?

- A) 4
- B) 15
- C) 1
- D) 6
- E) 7

**Resposta:** D

**Explicação:** Ferramenta: juntar as potências. (1 + x)²·(1 + x)⁴ = (1 + x)⁶. Coeficiente de x⁵: C(6, 5) = 6.

### 16
<!-- modelo: d14 -->
Usando o binômio de Newton, calcule 99³ = (100 − 1)³.

- A) 999.700
- B) 970.000
- C) 970.899
- D) 999.999
- E) 970.299

**Resposta:** E

**Explicação:** Ferramenta: cubo da diferença. (a − b)³ = a³ − 3a²b + 3ab² − b³. 1.000.000 − 30.000 + 300 − 1 = 970.299.
