---
titulo: Função composta e função inversa
provas: ENEM, Militares
descricao: Composição de funções, domínio, funções injetoras e bijetoras, cálculo e gráfico da função inversa.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Função composta e função inversa

Composição de funções, domínio, funções injetoras e bijetoras, cálculo e gráfico da função inversa.

## Resumo

- **Composta f(g(x)):** primeiro aplica-se g, depois f ("de dentro para fora"). Em geral, f(g(x)) ≠ g(f(x)).
- **Lei da composta:** troque cada x da lei de f pela lei de g. f(x) = x², g(x) = x + 3 ⇒ f(g(x)) = (x + 3)².
- **Inversa f⁻¹:** desfaz o que f faz. Se f(a) = b, então f⁻¹(b) = a. Para achar a lei, escreva y = f(x), troque x e y e isole y.
- **Só tem inversa quem é bijetora:** cada saída vem de uma única entrada (teste da reta horizontal). x² só é inversível com domínio restrito (x ≥ 0).
- **Gráficos de f e f⁻¹** são simétricos em relação à reta y = x; o ponto (a, b) vira (b, a).
- **f⁻¹(k):** não precisa da lei inteira; basta resolver f(x) = k.
- **Domínio:** denominador ≠ 0 e radicando de raiz par ≥ 0. Na composta, olhe o que entra em f.
- **Aplicações:** conversão de unidades (Celsius ↔ Fahrenheit), descontos e acréscimos sucessivos, "quantos km rodou se pagou tanto".

## Fácil

### 1
<!-- modelo: f13 -->
Sendo f(x) = x + 1 e g(x) = 5x, qual é a lei de f(g(x))?

- A) x + 6
- B) 5x + 5
- C) 5x + 1
- D) 5x − 1
- E) 6x + 1

**Resposta:** C

**Explicação:** Ferramenta: substituir x por g(x). f(g(x)) = g(x) + 1. = 5x + 1. (Já g(f(x)) = 5(x + 1) = 5x + 5, que é diferente.)

### 2
<!-- modelo: f10 -->
Sendo f(x) = x/2 + 1, qual é o valor de f(f(14))?

- A) 4,5
- B) 5
- C) 8
- D) 5,5
- E) 9

**Resposta:** B

**Explicação:** Ferramenta: aplicar duas vezes. Calcule f do número e aplique f de novo no resultado. f(14) = 8; f(8) = 5.

### 3
<!-- modelo: f7 -->
Qual é o domínio (maior subconjunto dos reais) da função f(x) = 5/(x − 2)?

- A) x > 2
- B) ℝ − {0}
- C) ℝ
- D) ℝ − {2}
- E) ℝ − {−2}

**Resposta:** D

**Explicação:** Ferramenta: não se divide por zero. O denominador não pode ser zero: x − 2 ≠ 0. x ≠ 2: domínio ℝ − {2}.

### 4
<!-- modelo: f3 -->
Sendo f(x) = x² e g(x) = x + 4, qual é a lei de f(g(x))?

- A) x² + 16
- B) x² + 4x + 16
- C) x² + 8x + 4
- D) x² + 8x + 16
- E) x² + 4

**Resposta:** D

**Explicação:** Ferramenta: substituir a lei inteira. f(g(x)) = f(x + 4) = (x + 4)². Não confunda com g(f(x)) = x² + 4. (x + 4)² = x² + 8x + 16.

### 5
<!-- modelo: f2 -->
Sendo f(x) = 3x − 6 e g(x) = x + 9, calcule g(f(1)).

- A) 3
- B) 24
- C) 6
- D) 12
- E) 5

**Resposta:** C

**Explicação:** Ferramenta: a ordem importa. g(f(k)): primeiro f, depois g. Trocar a ordem dá outro resultado. f(1) = −3; g(−3) = −3 + 9 = 6.

### 6
<!-- modelo: f8 -->
Qual destas funções, de ℝ em ℝ, NÃO é injetora (ou seja, leva dois valores diferentes de x ao mesmo y)?

- A) f(x) = 5x
- B) f(x) = 2x + 1
- C) f(x) = −x + 4
- D) f(x) = x³
- E) f(x) = x²

**Resposta:** E

**Explicação:** Ferramenta: teste da reta horizontal. Se uma reta horizontal corta o gráfico em dois pontos, dois valores de x têm a mesma imagem, e a função não tem inversa. Em f(x) = x², por exemplo, f(2) = f(−2) = 4. As retas e a cúbica nunca repetem valores.

### 7
<!-- modelo: f16 -->
Os gráficos de f(x) = 3x − 7 e de sua inversa f⁻¹ se cortam sobre a reta y = x. Em que ponto?

- A) (7, 7)
- B) (7/3, 7/3)
- C) (−7/2, −7/2)
- D) (0, −7)
- E) (7/2, 7/2)

**Resposta:** E

**Explicação:** Ferramenta: f(x) = x. Os gráficos de f e f⁻¹ são simétricos em relação à reta y = x; para uma função crescente, eles se cortam sobre ela. 3x − 7 = x ⇒ x = 7/2.

### 8
<!-- modelo: f1 -->
Sendo f(x) = 4x + 2 e g(x) = x − 1, qual é o valor de f(g(3))?

- A) 13
- B) 14
- C) 58
- D) 10
- E) 11

**Resposta:** D

**Explicação:** Ferramenta: de dentro para fora. Em f(g(k)), calcule primeiro g(k) e use o resultado como entrada de f. g(3) = 2; f(2) = 4·2 + 2 = 10.

### 9
<!-- modelo: f6 -->
Uma função f é dada pela tabela: f(1) = 4, f(2) = 3, f(3) = 6, f(4) = 5 e f(5) = 2. Qual é o valor de f(f(2))?

- A) 4
- B) 2
- C) 3
- D) 1
- E) 6

**Resposta:** E

**Explicação:** Ferramenta: ler a tabela duas vezes. Primeiro f(2) = 3; depois use 3 como entrada. f(3) = 6.

### 10
<!-- modelo: f4 -->
Qual é a lei da função inversa de f(x) = 3x + 7?

- A) f⁻¹(x) = (x + 7)/3
- B) f⁻¹(x) = x/3 − 7
- C) f⁻¹(x) = 1/(3x + 7)
- D) f⁻¹(x) = (x − 7)/3
- E) f⁻¹(x) = 3x − 7

**Resposta:** D

**Explicação:** Ferramenta: trocar x e y e isolar. Escreva y = 3x + 7, troque x por y e isole y: x = 3y + 7. y = (x − 7)/3.

### 11
<!-- modelo: f15 -->
Numa loja, g(x) = x + 15 soma o frete ao preço x, e f(x) = 0,8x aplica um desconto de 20%. Qual é o valor de f(g(150))?

- A) R$ 135,00
- B) R$ 147,00
- C) R$ 120,00
- D) R$ 165,00
- E) R$ 132,00

**Resposta:** E

**Explicação:** Ferramenta: composição na ordem certa. Em f(g(x)), primeiro soma-se o frete e depois aplica-se o desconto sobre o total. g(150) = 165; f(165) = 0,8 × 165 = R$ 132,00.

### 12
<!-- modelo: f17 -->
O gráfico de uma função f passa pelo ponto (9, 2). Por qual ponto passa obrigatoriamente o gráfico de f⁻¹?

- A) (2, 9)
- B) (9, −2)
- C) (−2, 9)
- D) (9, 2)
- E) (−9, −2)

**Resposta:** A

**Explicação:** Ferramenta: trocar entrada e saída. Se f(9) = 2, então f⁻¹(2) = 9. As coordenadas trocam de lugar. Ponto (2, 9), simétrico em relação a y = x.

### 13
<!-- modelo: f14 -->
A função f(x) = 3x − 2 tem domínio {0, 1, 2, 3}. Qual é o seu conjunto imagem?

- A) {−2, 1, 4}
- B) {−2, −1, 0, 1}
- C) {−2, 1, 4, 7}
- D) {−1, 2, 5, 8}
- E) {0, 3, 6, 9}

**Resposta:** C

**Explicação:** Ferramenta: aplicar a lei a cada elemento. A imagem é o conjunto das saídas de todos os elementos do domínio. f(0) = −2; f(1) = 1; f(2) = 4; f(3) = 7.

### 14
<!-- modelo: f11 -->
Uma corrida de táxi custa P(d) = 4 + 2d reais, em que d é a distância em km. Um passageiro pagou R$ 30,00. Quantos quilômetros ele percorreu?

- A) 13 km
- B) 17 km
- C) 12 km
- D) 15 km
- E) 26 km

**Resposta:** A

**Explicação:** Ferramenta: usar a inversa. Tire o valor fixo e divida pelo preço por km: d = (P − 4) ÷ 2. (30 − 4) ÷ 2 = 13 km.

### 15
<!-- modelo: f9 -->
A temperatura em Fahrenheit é dada por F = 1,8C + 32, em que C é a temperatura em Celsius. Um termômetro marca 50 °F. Quanto é isso em Celsius?

- A) 32,4 °C
- B) 10 °C
- C) 18 °C
- D) 45,6 °C
- E) 27,8 °C

**Resposta:** B

**Explicação:** Ferramenta: função inversa. Para voltar de F para C, faça as operações ao contrário: tire 32 e divida por 1,8. C = (50 − 32) ÷ 1,8 = 18 ÷ 1,8 = 10 °C.

### 16
<!-- modelo: f12 -->
Sendo f(x) = x³, qual é o valor de f⁻¹(−8)?

- A) −2
- B) −3
- C) 2
- D) −1/8
- E) −6

**Resposta:** A

**Explicação:** Ferramenta: inversa do cubo é a raiz cúbica. Qual número elevado ao cubo dá −8? (−2)³ = −8, então f⁻¹(−8) = −2.

### 17
<!-- modelo: f5 -->
Sendo f(x) = 3x − 3, qual é o valor de f⁻¹(3)?

- A) 0
- B) 3
- C) 2
- D) 6
- E) 5

**Resposta:** C

**Explicação:** Ferramenta: f⁻¹(k) é "quem leva a k". f⁻¹(3) é o número x tal que f(x) = 3. 3x − 3 = 3 ⇒ x = 2.

## Médio

### 1
<!-- modelo: m8 -->
Sendo f(x) = √x e g(x) = x − 8, qual é o domínio de f(g(x))?

- A) x ≥ 0
- B) x ≥ 8
- C) ℝ
- D) x ≥ −8
- E) x > 8

**Resposta:** B

**Explicação:** Ferramenta: o que entra na raiz. f(g(x)) = √(x − 8); o radicando não pode ser negativo. x − 8 ≥ 0 ⇒ x ≥ 8.

### 2
<!-- modelo: m14 -->
As funções f e g são dadas por: g(1) = 3, g(2) = 2, g(3) = 1, g(4) = 4 e f(1) = 7, f(2) = 5, f(3) = 8, f(4) = 6. Qual é o valor de f(g(2))?

- A) 7
- B) 8
- C) 5
- D) 9
- E) 2

**Resposta:** C

**Explicação:** Ferramenta: ler as duas tabelas em sequência. Primeiro g(2) = 2; depois f(2). f(2) = 5.

### 3
<!-- modelo: m11 -->
A área de um quadrado é A(l) = l², e o lado em função do perímetro é l(P) = P/4. Qual é a área de um quadrado de perímetro 56 cm?

- A) 392 cm²
- B) 784 cm²
- C) 196 cm²
- D) 56 cm²
- E) 1.568 cm²

**Resposta:** C

**Explicação:** Ferramenta: composição A(l(P)). Primeiro passe do perímetro ao lado, depois do lado à área: A(P) = (P/4)². l = 56 ÷ 4 = 14; A = 14² = 196 cm².

### 4
<!-- modelo: m15 -->
A função f(x) = x², definida apenas para x ≥ 0, tem inversa. Qual é o valor de f⁻¹(100)?

- A) 9
- B) 10
- C) 20
- D) 50
- E) 100

**Resposta:** B

**Explicação:** Ferramenta: restringir o domínio. x² não é injetora em ℝ, mas, com x ≥ 0, cada y tem um só x. A inversa é a raiz quadrada. f⁻¹(100) = √100 = 10.

### 5
<!-- modelo: m4 -->
Sendo f(x) = 1/(1 − x), qual é o valor de f(f(f(−1)))?

- A) −1
- B) 0
- C) 2
- D) 1
- E) 1/2

**Resposta:** A

**Explicação:** Ferramenta: calcular passo a passo e notar o ciclo. Aplicar f três vezes devolve o número inicial: f(f(f(x))) = x. f(−1) = 1/2; f(1/2) = 2; f(2) = −1.

### 6
<!-- modelo: m9 -->
Qual destas funções, de ℝ em ℝ, é bijetora (tem inversa definida em todo ℝ)?

- A) f(x) = x²
- B) f(x) = x² + 1
- C) f(x) = x³ + 2
- D) f(x) = |x|
- E) f(x) = 2

**Resposta:** C

**Explicação:** Ferramenta: injetora e sobrejetora. Bijetora: cada y real é atingido por exatamente um x. As outras repetem valores (x² e |x| dão o mesmo para x e −x) ou não atingem todos os reais. A função cúbica é sempre crescente e assume todos os valores reais.

### 7
<!-- modelo: m3 -->
Uma função satisfaz f(2x + 1) = 4x + 4 para todo x. Qual é o valor de f(4)?

- A) 10
- B) 20
- C) 8
- D) 9
- E) 12

**Resposta:** A

**Explicação:** Ferramenta: achar a entrada certa. Para obter f(4), escolha x com 2x + 1 = 4, ou seja, x = 3/2. f(4) = 4·3/2 + 4 = 10.

### 8
<!-- modelo: m17 -->
Sendo f(x) = 3x + 2 e g(x) = 4x + 5, qual é a lei de g(f(x))?

- A) 12x + 13
- B) 7x + 7
- C) 12x + 17
- D) 12x + 7
- E) 12x + 10

**Resposta:** A

**Explicação:** Ferramenta: substituir f dentro de g. g(f(x)) = 4·(3x + 2) + 5. = 12x + 8 + 5 = 12x + 13.

### 9
<!-- modelo: m12 -->
C(F) = (F − 32)/1,8 converte Fahrenheit em Celsius, e K(C) = C + 273 converte Celsius em Kelvin. Quanto vale K(C(50))?

- A) 283 K
- B) 305 K
- C) 323 K
- D) 251 K
- E) 10 K

**Resposta:** A

**Explicação:** Ferramenta: composição de conversões. Aplique primeiro C e depois K. C(50) = 10; K(10) = 283 K.

### 10
<!-- modelo: m5 -->
Sendo f(x) = x² − 4 e g(x) = 2x + 2, qual é a soma das raízes de f(g(x)) = 0?

- A) −2
- B) −4
- C) 2
- D) 0
- E) −3

**Resposta:** A

**Explicação:** Ferramenta: f(algo) = 0. f(y) = 0 quando y = ±2. Então 2x + 2 = 2 ou 2x + 2 = −2. x = 0 ou x = −2; soma = −2.

### 11
<!-- modelo: m7 -->
Sendo f(x) = 2x + 1, qual é o valor de f⁻¹(f⁻¹(11))?

- A) 47
- B) 9/4
- C) 5
- D) 6
- E) 2

**Resposta:** E

**Explicação:** Ferramenta: inversa aplicada duas vezes. f⁻¹(x) = (x − 1)/2. f⁻¹(11) = 5; f⁻¹(5) = 2.

### 12
<!-- modelo: m2 -->
Qual é a inversa de f(x) = (x + 1)/(x − 4), para x ≠ 4?

- A) f⁻¹(x) = (x + 4)/(x − 1)
- B) f⁻¹(x) = (4x − 1)/(x + 1)
- C) f⁻¹(x) = (x + 4)/(x − 1)
- D) f⁻¹(x) = (x − 4)/(x + 1)
- E) f⁻¹(x) = (4x + 1)/(x − 1)

**Resposta:** E

**Explicação:** Ferramenta: trocar x e y e isolar. x = (y + 1)/(y − 4) ⇒ x(y − 4) = y + 1 ⇒ xy − y = 4x + 1. y(x − 1) = 4x + 1 ⇒ y = (4x + 1)/(x − 1).

### 13
<!-- modelo: m13 -->
Sendo f(x) = 5x − 5, a função g satisfaz g(f(x)) = x para todo x. Qual é o valor de g(20)?

- A) 5
- B) 6
- C) 3
- D) 95
- E) 20

**Resposta:** A

**Explicação:** Ferramenta: g é a inversa de f. g(f(x)) = x diz que g desfaz o que f faz: g = f⁻¹, e g(x) = (x + 5)/5. g(20) = (20 + 5)/5 = 5.

### 14
<!-- modelo: m16 -->
Uma loja aplica f(x) = 0,8x (desconto de 20%) e, sobre o resultado, g(x) = 0,75x (desconto de 25%). A composição g(f(x)) equivale a um único desconto de quantos por cento?

- A) 35%
- B) 47%
- C) 22,5%
- D) 40%
- E) 45%

**Resposta:** D

**Explicação:** Ferramenta: composição de funções lineares. Compor multiplicações é multiplicar os fatores. g(f(x)) = 0,8 × 0,75x = 0,6x: desconto total de 40%.

### 15
<!-- modelo: m1 -->
Sendo f(x) = 3x + 2 e f(g(x)) = 6x + 8, qual é a lei de g(x)?

- A) 2x + 2
- B) 2x + 8
- C) 2x + 4
- D) 6x + 2
- E) x + 2

**Resposta:** A

**Explicação:** Ferramenta: igualar as leis. f(g(x)) = 3·g(x) + 2. Então 3·g(x) + 2 = 6x + 8. 3·g(x) = 6x + 6 ⇒ g(x) = 2x + 2.

### 16
<!-- modelo: m10 -->
Uma função afim f(x) = ax + b satisfaz f(3) = 17 e f⁻¹(21) = 4. Qual é o valor de f(0)?

- A) 4
- B) 5
- C) 6
- D) 12
- E) 9

**Resposta:** B

**Explicação:** Ferramenta: f⁻¹(y) = x ⇔ f(x) = y. f⁻¹(21) = 4 quer dizer f(4) = 21. Com dois pontos, ache a reta. a = (21 − 17)/(4 − 3) = 4; b = 17 − 4·3 = 5 = f(0).

### 17
<!-- modelo: m6 -->
Sendo f(x) = 5ˣ, qual é o valor de f⁻¹(125)?

- A) 2
- B) 15
- C) 25
- D) 4
- E) 3

**Resposta:** E

**Explicação:** Ferramenta: inversa da exponencial é o logaritmo. f⁻¹(125) é o expoente que leva 5 a 125. 5³ = 125 ⇒ f⁻¹(125) = 3.

## Difícil

### 1
<!-- modelo: d6 -->
A função f(x) = x² − 8x + 17, definida para x ≥ 4, é inversível. Qual é o valor de f⁻¹(26)?

- A) 18
- B) 10
- C) 9
- D) 25
- E) 5

**Resposta:** C

**Explicação:** Ferramenta: completar o quadrado. f(x) = (x − 4)² + 1. Resolva (x − 4)² + 1 = 26 com x ≥ 4. (x − 4)² = 25 ⇒ x − 4 = 5 ⇒ x = 9.

### 2
<!-- modelo: d4 -->
Sendo f(x) = 2x + 1, qual é o valor de f aplicada 5 vezes seguidas ao número 2, isto é, f(f(...f(2)...))?

- A) 12
- B) 47
- C) 34
- D) 95
- E) 96

**Resposta:** D

**Explicação:** Ferramenta: iterar com cuidado. Aplique f repetidamente, sempre sobre o resultado anterior. 2 → 5 → 11 → 23 → 47 → 95.

### 3
<!-- modelo: d12 -->
Os pontos fixos de uma função são os x com f(x) = x. Qual é o produto dos pontos fixos de f(x) = x² − 4?

- A) −4
- B) −1
- C) −5
- D) 4
- E) 1

**Resposta:** A

**Explicação:** Ferramenta: resolver f(x) = x. x² − 4 = x ⇒ x² − x − 4 = 0. Soma das raízes = 1 e produto = −4.

### 4
<!-- modelo: d15 -->
Os gráficos de f(x) = 2x − 4 e de sua inversa, junto com o eixo y, formam um triângulo. Qual é a área desse triângulo?

- A) 24
- B) 12
- C) 16
- D) 8
- E) 6

**Resposta:** B

**Explicação:** Ferramenta: achar os vértices. f⁻¹(x) = (x + 4)/2. Os gráficos se cortam em f(x) = x ⇒ x = 4, no ponto (4, 4). No eixo y, f vale −4 e f⁻¹ vale 2. Base no eixo y: 2 − (−4) = 6; altura 4. Área = 6 · 4 / 2 = 12.

### 5
<!-- modelo: d13 -->
Sendo f(x) = 4x + 3 e g(x) = 2x + b, para que valor de b vale f(g(x)) = g(f(x)) para todo x?

- A) 3
- B) 9
- C) 1
- D) 0
- E) 2

**Resposta:** C

**Explicação:** Ferramenta: comparar os termos independentes. f(g(x)) = 8x + 4b + 3 e g(f(x)) = 8x + 6 + b. Os coeficientes de x já são iguais. 4b + 3 = 6 + b ⇒ 3b = 3 ⇒ b = 1.

### 6
<!-- modelo: d14 -->
Num modelo simplificado, o imposto é I(x) = 0,15·(x − 2.500) para rendas x acima de R$ 2.500. Uma pessoa pagou R$ 210,00 de imposto. Qual era a sua renda?

- A) R$ 1.400,00
- B) R$ 3.900,00
- C) R$ 6.400,00
- D) R$ 3.910,00
- E) R$ 3.150,00

**Resposta:** B

**Explicação:** Ferramenta: inversa da função. Resolva 0,15(x − 2.500) = 210. x − 2.500 = 210 ÷ 0,15 = 1.400 ⇒ x = R$ 3.900,00.

### 7
<!-- modelo: d16 -->
Sendo f(x) = x/(x + 1), qual é o valor de f(f(4))?

- A) 4/5
- B) 5/9
- C) 1/6
- D) 1/2
- E) 4/9

**Resposta:** E

**Explicação:** Ferramenta: simplificar a composta. f(f(x)) = [x/(x + 1)] / [x/(x + 1) + 1] = x/(2x + 1). f(f(4)) = 4/9.

### 8
<!-- modelo: d10 -->
Se f é uma função par (f(−x) = f(x)) e g é uma função ímpar (g(−x) = −g(x)), então a composta f(g(x)) é:

- A) ímpar
- B) nem par nem ímpar, sempre
- C) par e ímpar ao mesmo tempo, sempre
- D) par
- E) constante

**Resposta:** D

**Explicação:** Ferramenta: testar −x. f(g(−x)) = f(−g(x)) = f(g(x)), porque f é par. Exemplo: f(x) = x² e g(x) = x³ dão f(g(x)) = x⁶, que é par.

### 9
<!-- modelo: d1 -->
Sendo f(x) = (3x + 1)/(x − 2), qual é o valor de f⁻¹(5)?

- A) 11/8
- B) 11/2
- C) 3
- D) 145/24
- E) 16/3

**Resposta:** B

**Explicação:** Ferramenta: resolver f(x) = valor. f⁻¹(5) é o x com (3x + 1)/(x − 2) = 5. 3x + 1 = 5x − 10 ⇒ 2x = 11 ⇒ x = 11/2.

### 10
<!-- modelo: d9 -->
Sendo g(x) = x + 3 e f(g(x)) = x² + 6x + 13, qual é o valor de f(1)?

- A) 20
- B) 1
- C) 5
- D) 15
- E) 8

**Resposta:** C

**Explicação:** Ferramenta: reconhecer g(x) dentro da lei. x² + 6x + 13 = (x + 3)² + 4 = g(x)² + 4. Logo f(t) = t² + 4. f(1) = 5.

### 11
<!-- modelo: d7 -->
Uma função f, definida para x ≠ 0, satisfaz f(x) + 2·f(1/x) = 3x. Qual é o valor de f(2)?

- A) 6
- B) 1
- C) 2
- D) 0
- E) −1

**Resposta:** E

**Explicação:** Ferramenta: trocar x por 1/x e montar um sistema. Com x = 2: f(2) + 2f(1/2) = 6. Com x = 1/2: f(1/2) + 2f(2) = 3/2. Resolvendo o sistema: f(2) = −1.

### 12
<!-- modelo: d3 -->
Uma função afim crescente satisfaz f(f(x)) = 4x + 3 para todo x. Qual é o valor de f(4)?

- A) 8
- B) 7
- C) 9,5
- D) 9
- E) 19

**Resposta:** D

**Explicação:** Ferramenta: comparar coeficientes. Com f(x) = ax + b, f(f(x)) = a²x + ab + b. Então a² = 4 (a > 0, pois é crescente) e ab + b = 3. a = 2, b = 1; f(4) = 9.

### 13
<!-- modelo: d2 -->
Uma função satisfaz f(x + 1) = x² + 2x + 1 para todo x real. Qual é o valor de f(5)?

- A) 37
- B) 26
- C) 36
- D) 25
- E) 23

**Resposta:** D

**Explicação:** Ferramenta: completar o quadrado. x² + 2x + 1 = (x + 1)² + 0. Chamando t = x + 1, f(t) = t² + 0. f(5) = 25 + 0 = 25.

### 14
<!-- modelo: d5 -->
Sendo f(x) = 1/(x − 8) e g(x) = x² − 1, qual é o domínio de f(g(x))?

- A) ℝ − {3}
- B) ℝ − {−1, 1}
- C) ℝ
- D) ℝ − {8}
- E) ℝ − {−3, 3}

**Resposta:** E

**Explicação:** Ferramenta: onde a composta não existe. f(g(x)) = 1/(x² − 1 − 8). O denominador zera quando x² = 9. x = ±3 ficam de fora.

### 15
<!-- modelo: d8 -->
Sendo f(x) = (2x + 5)/(x − 2), para x ≠ 2, qual é o valor de f(f(10))?

- A) 2
- B) 11
- C) 12
- D) 25/8
- E) 10

**Resposta:** E

**Explicação:** Ferramenta: f é a própria inversa. Funções da forma (ax + b)/(x − a) satisfazem f(f(x)) = x. Confira: f(10) = 25/8. Aplicando f de novo volta-se a 10.

### 16
<!-- modelo: d11 -->
Sendo f(x) = 10^(x − 3), qual é o valor de f⁻¹(100)?

- A) 4
- B) 20
- C) 6
- D) 5
- E) 2

**Resposta:** D

**Explicação:** Ferramenta: inversa da exponencial. f⁻¹(y) = log y + 3. log 100 = 2 ⇒ f⁻¹ = 2 + 3 = 5.
