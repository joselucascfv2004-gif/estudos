### De onde vêm os coeficientes

Já sabemos que (x + y)² = x² + 2xy + y². E (x + y)³? Multiplicando, sai x³ + 3x²y + 3xy² + y³. Os coeficientes 1, 2, 1 e 1, 3, 3, 1 não são acaso: são **números binomiais**, que contam de quantos jeitos se escolhe cada letra.

Em (x + y)³ = (x + y)(x + y)(x + y), para formar x²y escolhemos y em **um** dos três parênteses e x nos outros. Há 3 jeitos, por isso o coeficiente é 3.

### Número binomial

C(n, k) = n! / [k!·(n − k)!] é o número de jeitos de escolher k objetos entre n.

> **Exemplo resolvido.** C(8, 3) = (8 · 7 · 6) / (3 · 2 · 1) = **56**.

Propriedades úteis:

- C(n, 0) = C(n, n) = 1 e C(n, 1) = n.
- **Complementares:** C(n, k) = C(n, n − k). Escolher 3 de 10 é o mesmo que escolher os 7 que ficam de fora.
- Se C(n, a) = C(n, b) e a ≠ b, então **a + b = n**.

### Triângulo de Pascal

Organizando os binomiais em linhas, cada número é a soma dos dois que estão acima dele:

- linha 0: 1
- linha 1: 1, 1
- linha 2: 1, 2, 1
- linha 3: 1, 3, 3, 1
- linha 4: 1, 4, 6, 4, 1
- linha 5: 1, 5, 10, 10, 5, 1

Essa regra é a **relação de Stifel**: C(n, k) + C(n, k + 1) = C(n + 1, k + 1). E a soma de cada linha é uma potência de 2: a linha n soma **2ⁿ**.

### O binômio de Newton

(x + y)ⁿ tem **n + 1 termos**, e os coeficientes são a linha n do triângulo:

(x + y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴.

O **termo geral** (o de ordem k + 1) é:

**T = C(n, k) · xⁿ⁻ᵏ · yᵏ**

> **Exemplo resolvido.** Coeficiente de x⁴ em (x + 3)⁶.
> Precisamos de x⁴, então y = 3 aparece com expoente 2: C(6, 2) · 3² = 15 · 9 = **135**.

Cuidado com os números "grudados" nas letras: em (2x + 1)³, o primeiro termo é (2x)³ = **8x³**, e não 2x³.

### Termo independente

É o termo sem x. Escreva o termo geral, junte as potências de x e iguale o expoente a zero.

> **Exemplo resolvido.** Termo independente de (x + 1/x)⁶.
> T = C(6, k) · x⁶⁻ᵏ · x⁻ᵏ = C(6, k) · x^(6 − 2k).
> 6 − 2k = 0 ⇒ k = 3, e o termo vale C(6, 3) = **20**.

### Soma dos coeficientes

Para somar todos os coeficientes de um desenvolvimento, troque as letras por 1:

- (x + y)ⁿ: soma 2ⁿ.
- (2x − 1)⁵: soma (2 − 1)⁵ = 1.
- (1 − 1)ⁿ = 0 mostra que C(n, 0) − C(n, 1) + C(n, 2) − ... = 0.

### Onde o binômio aparece

- **Subconjuntos:** um conjunto com n elementos tem 2ⁿ subconjuntos (cada elemento entra ou não).
- **Aproximações:** (1,02)²⁰ ≈ 1 + 20·0,02 + 190·0,0004 = 1,476.
- **Restos:** 9³⁸ = (8 + 1)³⁸. Todos os termos têm fator 8, menos o último, então o resto por 8 é **1**.
- **Probabilidade:** a chance de 3 caras em 5 lançamentos de moeda é C(5, 3)/2⁵ = 10/32.
