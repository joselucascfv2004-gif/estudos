### Para que serve este assunto

Desenvolver (a + b)² é fácil, mas e (x + 3)⁶? O binômio de Newton mostra como achar qualquer termo dessa expansão sem multiplicar tudo, usando os números binomiais (os mesmos da análise combinatória) e o triângulo de Pascal. É um assunto típico de provas militares e vestibulares; no ENEM, aparece pouco, mas a ideia de combinação por trás dele é a mesma da probabilidade.

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

### Mais um exemplo resolvido

> **Exemplo resolvido.** Desenvolva (x + 2)³.
> Coeficientes da linha 3 do triângulo de Pascal: 1, 3, 3, 1.
> (x + 2)³ = 1 · x³ + 3 · x² · 2 + 3 · x · 2² + 1 · 2³ = **x³ + 6x² + 12x + 8**.
> Conferindo com x = 1: (1 + 2)³ = 27 e 1 + 6 + 12 + 8 = 27 ✔

### Erros mais comuns

- Esquecer de elevar o segundo termo à potência: em (x + 2)³, o último termo é 2³ = 8, não 2.
- Errar a posição do termo: o termo geral Tₖ₊₁ = C(n, k) · aⁿ⁻ᵏ · bᵏ começa com k = 0 (o 1º termo).
- Esquecer o sinal quando o binômio é uma diferença: (a − b)ⁿ alterna os sinais.
- Achar que (a + b)ⁿ = aⁿ + bⁿ.
- Para a soma dos coeficientes, trocar as letras por 1 (e não por 0).

### Como cai na prova

Provas militares pedem o coeficiente de uma potência específica, o termo independente, o termo central e a soma dos coeficientes. Às vezes, o triângulo de Pascal aparece com suas propriedades (soma de uma linha = 2ⁿ, simetria).

### Teste-se

1. Quanto vale C(6, 2)?
2. Escreva a linha 4 do triângulo de Pascal.
3. Qual o coeficiente de a²b² em (a + b)⁴?
4. Qual a soma dos coeficientes de (2x − 1)⁵?
5. Quantos termos tem o desenvolvimento de (x + y)¹⁰?

> **Respostas.** 1) 6 · 5 ÷ 2 = **15**. 2) **1, 4, 6, 4, 1**. 3) **6**. 4) Troque x por 1: (2 − 1)⁵ = **1**. 5) **11 termos** (sempre n + 1).

### Para lembrar

- Termo geral: Tₖ₊₁ = C(n, k) · aⁿ⁻ᵏ · bᵏ (k começa em 0).
- (a + b)ⁿ tem n + 1 termos; os coeficientes estão na linha n do triângulo de Pascal.
- Soma dos coeficientes: troque as variáveis por 1.
- Termo independente: o termo em que o expoente do x dá zero.
