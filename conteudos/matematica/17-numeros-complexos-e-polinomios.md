---
titulo: Números complexos e polinômios
provas: Militares
descricao: Operações com complexos, módulo, potências de i, forma trigonométrica, teorema do resto e relações de Girard.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Números complexos e polinômios

Operações com complexos, módulo, potências de i, forma trigonométrica, teorema do resto e relações de Girard.

## Resumo

- **Número complexo:** z = a + bi, com i² = −1. a é a parte real e b, a parte imaginária.
- **Potências de i** repetem de 4 em 4: i⁰ = 1, i¹ = i, i² = −1, i³ = −i.
- **Conjugado:** z̄ = a − bi. Para dividir, multiplique numerador e denominador pelo conjugado do denominador.
- **Módulo:** |z| = √(a² + b²).
- **Polinômios:** grau é o maior expoente. P(a) = 0 ⇒ a é raiz e P(x) é divisível por (x − a).
- **Teorema do resto:** o resto da divisão de P(x) por (x − a) é P(a).
- **Relações de Girard** (grau 2): soma das raízes = −b/a; produto = c/a. Valem ideias parecidas para graus maiores.

## Fácil

### 1
<!-- modelo: f5 -->
Qual é o resultado de (−1 + 2i) + (1 − 6i)?

- A) −7 + 3i
- B) 4i
- C) −1 − 12i
- D) −4i
- E) −2 + 8i

**Resposta:** D

**Explicação:** Ferramenta: real com real, imaginário com imaginário. Some (ou subtraia) separadamente as partes reais e as partes imaginárias. (−1 + 1) + (2 + (−6))i = −4i.

### 2
<!-- modelo: f1 -->
Qual é o valor de i¹⁹?

- A) i
- B) −i
- C) 0
- D) 1
- E) −1

**Resposta:** B

**Explicação:** Ferramenta: ciclo de 4. As potências de i se repetem: i⁰ = 1, i¹ = i, i² = −1, i³ = −i. Só importa o resto da divisão do expoente por 4. 19 = 4 × 4 + 3 ⇒ i¹⁹ = i³ = −i.

### 3
<!-- modelo: f2 -->
Qual é o resultado de (6 − 3i) · (−4 − 5i)?

- A) −39 − 42i
- B) 2 − 8i
- C) −24 + 15i
- D) −39 − 18i
- E) −9 − 18i

**Resposta:** D

**Explicação:** Ferramenta: distributiva + i² = −1. Multiplique como binômios; o termo com i² vira número real negativo. (−24 − 15) + (−30 + 12)i = −39 − 18i.

### 4
<!-- modelo: f7 -->
P(x) é um polinômio de grau 4 e Q(x) é um polinômio de grau 4. Qual é o grau do produto P(x)·Q(x)?

- A) 16
- B) 4
- C) 8
- D) 24
- E) 9

**Resposta:** C

**Explicação:** Ferramenta: grau do produto. Ao multiplicar, os termos de maior grau se multiplicam e os expoentes se somam. 4 + 4 = 8.

### 5
<!-- modelo: f3 -->
Qual é o módulo do número complexo z = −9 − 12i?

- A) 15
- B) 21
- C) 16
- D) 3
- E) 225

**Resposta:** A

**Explicação:** Ferramenta: Pitágoras no plano complexo. O módulo é a distância do ponto (a, b) até a origem. √(81 + 144) = 15.

### 6
<!-- modelo: f2 -->
Qual é o resultado de (4 + 5i) · (−1 − 5i)?

- A) −29 − 25i
- B) 21 − 25i
- C) 21 − 15i
- D) −4 − 25i
- E) 3

**Resposta:** B

**Explicação:** Ferramenta: distributiva + i² = −1. Multiplique como binômios; o termo com i² vira número real negativo. (−4 − (−25)) + (−20 + (−5))i = 21 − 25i.

### 7
<!-- modelo: f5 -->
Qual é o resultado de (1 − 4i) + (3 − 6i)?

- A) −5 − i
- B) −2 + 2i
- C) 4 − 10i
- D) 4 + 10i
- E) 3 + 24i

**Resposta:** C

**Explicação:** Ferramenta: real com real, imaginário com imaginário. Some (ou subtraia) separadamente as partes reais e as partes imaginárias. (1 + 3) + (−4 + (−6))i = 4 − 10i.

### 8
<!-- modelo: f3 -->
Qual é o módulo do número complexo z = −3 + 4i?

- A) 7
- B) 6
- C) 5
- D) 1
- E) 25

**Resposta:** C

**Explicação:** Ferramenta: Pitágoras no plano complexo. O módulo é a distância do ponto (a, b) até a origem. √(9 + 16) = 5.

### 9
<!-- modelo: f1 -->
Qual é o valor de i⁵⁶?

- A) 0
- B) i
- C) −1
- D) 1
- E) −i

**Resposta:** D

**Explicação:** Ferramenta: ciclo de 4. As potências de i se repetem: i⁰ = 1, i¹ = i, i² = −1, i³ = −i. Só importa o resto da divisão do expoente por 4. 56 = 4 × 14 + 0 ⇒ i⁵⁶ = i⁰ = 1.

### 10
<!-- modelo: f4 -->
Qual é o valor numérico do polinômio P(x) = 2x³ + 3x² + 2x − 1 para x = 2?

- A) 33
- B) 31
- C) 47
- D) 30
- E) 36

**Resposta:** B

**Explicação:** Ferramenta: substituição. Troque x pelo número, com parênteses, e respeite a ordem das operações. P(2) = 31.

### 11
<!-- modelo: f8 -->
Para que valor de m o número z = (m + 6) + 2i é imaginário puro?

- A) 6
- B) 2
- C) 0
- D) −4
- E) −6

**Resposta:** E

**Explicação:** Ferramenta: imaginário puro. Imaginário puro tem parte real igual a zero (e parte imaginária diferente de zero). m + 6 = 0 ⇒ m = −6.

### 12
<!-- modelo: f6 -->
Qual é o conjugado do número complexo z = −1 + 3i?

- A) −1 − 3i
- B) 3 − i
- C) 1 + 3i
- D) 1 − 3i
- E) −1 + 3i

**Resposta:** A

**Explicação:** Ferramenta: conjugado. O conjugado mantém a parte real e troca o sinal da parte imaginária (espelho no eixo real). z̄ = −1 − 3i.

## Médio

### 1
<!-- modelo: m1 -->
Qual é o resultado da divisão (6i) ÷ (3 − 3i)?

- A) 1 + i
- B) 1 − i
- C) 0
- D) −1 − i
- E) −1 + i

**Resposta:** E

**Explicação:** Ferramenta: multiplicar pelo conjugado. Multiplique em cima e embaixo pelo conjugado do denominador: embaixo fica um número real (c² + d²). Denominador: 18; resultado: −1 + i.

### 2
<!-- modelo: m7 -->
Se (a − 4)x² + (b + 3)x + (c − 4) = x² + 4x + 3 para todo x, qual é o valor de a + b + c?

- A) 12
- B) 16
- C) 19
- D) 8
- E) 13

**Resposta:** E

**Explicação:** Ferramenta: polinômios idênticos. Dois polinômios são iguais quando os coeficientes de mesmo grau são iguais. a = 5, b = 1, c = 7; soma = 13.

### 3
<!-- modelo: m3 -->
Qual é o produto das raízes da equação x³ − 4x² + x + 6 = 0?

- A) −4
- B) 1
- C) 6
- D) −6
- E) 4

**Resposta:** D

**Explicação:** Ferramenta: relações de Girard. Para ax³ + bx² + cx + d = 0: soma = −b/a; produto = −d/a. −(6)/1 = −6.

### 4
<!-- modelo: m1 -->
Qual é o resultado da divisão (1 + 13i) ÷ (1 + 3i)?

- A) 4 + i
- B) −4 + i
- C) 1 + 4i
- D) 4 − i
- E) 5

**Resposta:** A

**Explicação:** Ferramenta: multiplicar pelo conjugado. Multiplique em cima e embaixo pelo conjugado do denominador: embaixo fica um número real (c² + d²). Denominador: 10; resultado: 4 + i.

### 5
<!-- modelo: m2 -->
Qual é o resto da divisão de P(x) = 2x³ + 3x² + 5x + 1 por (x − 3)?

- A) 194
- B) 0
- C) 98
- D) 1
- E) 97

**Resposta:** E

**Explicação:** Ferramenta: teorema do resto. O resto da divisão por (x − a) é P(a): não precisa fazer a divisão. P(3) = 97.

### 6
<!-- modelo: m5 -->
Quais são as raízes da equação x² + 16 = 0 no conjunto dos números complexos?

- A) 4 e −4
- B) não há raízes
- C) 4i e −4i
- D) 4 e 4
- E) 8i e −8i

**Resposta:** C

**Explicação:** Ferramenta: Bhaskara com Δ negativo. √(−k) = i√k. As raízes de equações com coeficientes reais vêm em pares conjugados. Δ = −64 ⇒ √Δ = 8i; x = (0 ± 8i)/2 = 4i ou −4i.

### 7
<!-- modelo: m3 -->
Qual é o produto das raízes da equação x³ − 9x² + 26x − 24 = 0?

- A) −24
- B) 9
- C) −9
- D) 26
- E) 24

**Resposta:** E

**Explicação:** Ferramenta: relações de Girard. Para ax³ + bx² + cx + d = 0: soma = −b/a; produto = −d/a. −(−24)/1 = 24.

### 8
<!-- modelo: m4 -->
Sendo z = −3 + 6i e z̄ o seu conjugado, qual é o valor de z · z̄?

- A) 9 + 36i
- B) −27 − 36i
- C) 48
- D) 46
- E) 45

**Resposta:** E

**Explicação:** Ferramenta: produto pelo conjugado. (a + bi)(a − bi) = a² − (bi)² = a² + b²: sempre real e igual a |z|². 9 + 36 = 45.

### 9
<!-- modelo: m5 -->
Quais são as raízes da equação x² − 6x + 25 = 0 no conjunto dos números complexos?

- A) 3 + 4i e 3 − 4i
- B) 3 + 8i e 3 − 8i
- C) 7 e −1
- D) 4 + 3i e 4 − 3i
- E) −3 + 4i e −3 − 4i

**Resposta:** A

**Explicação:** Ferramenta: Bhaskara com Δ negativo. √(−k) = i√k. As raízes de equações com coeficientes reais vêm em pares conjugados. Δ = −64 ⇒ √Δ = 8i; x = (6 ± 8i)/2 = 3 + 4i ou 3 − 4i.

### 10
<!-- modelo: m6 -->
Qual é o quociente da divisão de x² + 8x + 15 por (x + 3)?

- A) x − 5
- B) x + 8
- C) x + 5
- D) x + 15
- E) x + 3

**Resposta:** C

**Explicação:** Ferramenta: fatoração (ou Briot-Ruffini). Um trinômio com raízes −a e −b se fatora como (x + a)(x + b). x² + 8x + 15 = (x + 3)(x + 5).

### 11
<!-- modelo: m2 -->
Qual é o resto da divisão de P(x) = 2x³ + x² − 5x + 6 por (x + 2)?

- A) 6
- B) 0
- C) 4
- D) 16
- E) 5

**Resposta:** C

**Explicação:** Ferramenta: teorema do resto. O resto da divisão por (x − a) é P(a): não precisa fazer a divisão. P(−2) = 4.

## Difícil

### 1
<!-- modelo: d1 -->
Sabendo que −3 é raiz do polinômio P(x) = x³ + 3x² − x − 3, qual é a soma das outras duas raízes?

- A) −1
- B) 0
- C) 2
- D) 1
- E) −3

**Resposta:** B

**Explicação:** Ferramenta: Girard + raiz conhecida. A soma das três raízes é −b/a; tire a raiz que você já conhece. Soma total −3; −3 − (−3) = 0.

### 2
<!-- modelo: d4 -->
Para que valor de m o polinômio P(x) = x³ + x² − 4x + m é divisível por (x − 1)?

- A) 5
- B) 2
- C) 3
- D) 4
- E) 0

**Resposta:** B

**Explicação:** Ferramenta: divisível ⇔ resto zero. Pelo teorema do resto, basta P(1) = 0. 1 + 1 + (−4) + m = 0 ⇒ m = 2.

### 3
<!-- modelo: d4 -->
Para que valor de m o polinômio P(x) = x³ + 2x² + 3x + m é divisível por (x − 2)?

- A) −20
- B) −24
- C) 22
- D) −19
- E) −22

**Resposta:** E

**Explicação:** Ferramenta: divisível ⇔ resto zero. Pelo teorema do resto, basta P(2) = 0. 8 + 8 + 6 + m = 0 ⇒ m = −22.

### 4
<!-- modelo: d7 -->
Sendo z = 3(cos 60° + i·sen 60°), qual é o valor de z³?

- A) 9i
- B) −27i
- C) −27
- D) 27
- E) 27i

**Resposta:** C

**Explicação:** Ferramenta: fórmula de De Moivre. Na forma trigonométrica, elevar à n-ésima potência eleva o módulo e multiplica o ângulo por n. Módulo 3³ = 27; ângulo 3 × 60° = 180° ⇒ z³ = −27.

### 5
<!-- modelo: d6 -->
Um polinômio P(x) de grau 3 tem raízes 3, −1, 1 e satisfaz P(0) = −9. Qual é o coeficiente do termo de maior grau?

- A) −9
- B) −2
- C) −3
- D) 3
- E) −6

**Resposta:** C

**Explicação:** Ferramenta: forma fatorada. Com as raízes, P(x) = a(x − r₁)(x − r₂)(x − r₃). Substitua x = 0. P(0) = a · (−3)(1)(−1) = 3a = −9 ⇒ a = −3.

### 6
<!-- modelo: d2 -->
Na forma trigonométrica, z = √3 + i tem módulo 2 e argumento principal igual a:

- A) 240°
- B) 45°
- C) 30°
- D) 150°
- E) 120°

**Resposta:** C

**Explicação:** Ferramenta: cos θ = a/|z| e sen θ = b/|z|. Os sinais de a e b dizem o quadrante; os valores notáveis dizem o ângulo. θ = 30°.

### 7
<!-- modelo: d6 -->
Um polinômio P(x) de grau 3 tem raízes −1, 2, 1 e satisfaz P(0) = 6. Qual é o coeficiente do termo de maior grau?

- A) 5
- B) 6
- C) 4
- D) 3
- E) 9

**Resposta:** D

**Explicação:** Ferramenta: forma fatorada. Com as raízes, P(x) = a(x − r₁)(x − r₂)(x − r₃). Substitua x = 0. P(0) = a · (1)(−2)(−1) = 2a = 6 ⇒ a = 3.

### 8
<!-- modelo: d3 -->
Qual é o valor de (1 + i)²?

- A) 2i
- B) −2i
- C) 4
- D) −2
- E) 2

**Resposta:** A

**Explicação:** Ferramenta: quebrar a potência. (1 + i)² = 1 + 2i + i² = 2i. Use isso para reduzir o expoente pela metade. (1 + i)² = (2i)¹ = 2i.

### 9
<!-- modelo: d3 -->
Qual é o valor de (1 + i)⁸?

- A) 256
- B) 16i
- C) −16
- D) 16
- E) −16i

**Resposta:** D

**Explicação:** Ferramenta: quebrar a potência. (1 + i)² = 1 + 2i + i² = 2i. Use isso para reduzir o expoente pela metade. (1 + i)⁸ = (2i)⁴ = 16.

### 10
<!-- modelo: d1 -->
Sabendo que −2 é raiz do polinômio P(x) = x³ − 12x − 16, qual é a soma das outras duas raízes?

- A) 3
- B) 2
- C) 1
- D) 0
- E) 5

**Resposta:** B

**Explicação:** Ferramenta: Girard + raiz conhecida. A soma das três raízes é −b/a; tire a raiz que você já conhece. Soma total 0; 0 − (−2) = 2.

### 11
<!-- modelo: d5 -->
Um polinômio de grau 3 com coeficientes reais tem raízes 2 + 3i e 1. Qual é o produto das três raízes?

- A) 13
- B) 2
- C) 14
- D) 7
- E) 12

**Resposta:** A

**Explicação:** Ferramenta: raízes complexas vêm aos pares. Com coeficientes reais, o conjugado 2 − 3i também é raiz. (2 + 3i)(2 − 3i) = 13; × 1 = 13.
