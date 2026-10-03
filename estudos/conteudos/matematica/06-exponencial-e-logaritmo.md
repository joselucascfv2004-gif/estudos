---
titulo: Função exponencial e logaritmo
provas: ENEM, Militares, Concursos
descricao: Potências, equações exponenciais, propriedades dos logaritmos, crescimento, decaimento e escalas logarítmicas.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Função exponencial e logaritmo

Potências, equações exponenciais, propriedades dos logaritmos, crescimento, decaimento e escalas logarítmicas.

## Resumo

- **Função exponencial** f(x) = a·bˣ: crescimento (b > 1) ou decaimento (0 < b < 1) por um fator constante. Usada em populações, juros compostos, meia-vida e epidemias.
- **Meia-vida:** a cada período, a quantidade cai pela metade: Q = Q₀ · (1/2)ⁿ.
- **Logaritmo** é o expoente: log_b a = x ⇔ bˣ = a.
- **Propriedades:** log(a·b) = log a + log b; log(a/b) = log a − log b; log aⁿ = n·log a; log_b b = 1; log_b 1 = 0.
- **Mudança de base:** log_b a = log a / log b.
- **Valores úteis:** log 2 ≈ 0,30; log 3 ≈ 0,48; log 10 = 1.
- **Para descobrir o tempo** em problemas de crescimento (ex.: "em quantos anos dobra?"), aplique log dos dois lados.

## Fácil

### 1
<!-- modelo: f4 -->
Considerando log 2 = 0,30 e log 3 = 0,48, qual é o valor de log 8?

- A) 1,80
- B) 0,72
- C) 1,20
- D) 0,14
- E) 0,90

**Resposta:** E

**Explicação:** Ferramenta: propriedades do log. Decomponha o número em fatores 2, 3 e 10: produto vira soma, potência vira multiplicação, divisão vira subtração. 8 = 2³ ⇒ log 8 = 0,90.

### 2
<!-- modelo: f1 -->
Qual é o valor de x na equação 2ˣ = 64?

- A) 12
- B) 6
- C) 7
- D) 32
- E) 5

**Resposta:** B

**Explicação:** Ferramenta: mesma base. Escreva o número do lado direito como potência da mesma base; aí basta igualar os expoentes. 64 = 2⁶ ⇒ x = 6.

### 3
<!-- modelo: f5 -->
Qual é o valor de 64^(2/3)?

- A) 64
- B) 42,67
- C) 4
- D) 16
- E) 8

**Resposta:** D

**Explicação:** Ferramenta: expoente fracionário = raiz. a^(p/q) = (raiz de índice q de a) elevada a p. Tire a raiz primeiro: os números ficam pequenos. raiz cúbica de 64 = 4; 4² = 16.

### 4
<!-- modelo: f3 -->
Uma colônia de bactérias, inicialmente com 100 indivíduos, dobra de tamanho a cada 4 horas. Quantas bactérias haverá após 24 horas?

- A) 3.200
- B) 2.400
- C) 6.400
- D) 1.200
- E) 12.800

**Resposta:** C

**Explicação:** Ferramenta: crescimento exponencial. Conte quantas vezes a colônia dobrou e multiplique por 2 essa quantidade de vezes. 24 ÷ 4 = 6 duplicações: 100 × 2⁶ = 6.400.

### 5
<!-- modelo: f8 -->
Calcule log 4 + log 25.

- A) 1
- B) 2
- C) 29
- D) 3
- E) 1,46

**Resposta:** B

**Explicação:** Ferramenta: log do produto. log a + log b = log(a · b). Multiplicando, aparece uma potência de 10. log(4 × 25) = log 100 = 2.

### 6
<!-- modelo: f10 -->
O organismo elimina metade de um medicamento a cada 6 horas. Um paciente tomou 400 mg. Quantos miligramas ainda restam no corpo 12 horas depois (sem nova dose)?

- A) 110 mg
- B) 50 mg
- C) 200 mg
- D) 100 mg
- E) 102 mg

**Resposta:** D

**Explicação:** Ferramenta: meia-vida. A cada período, multiplica-se por 1/2. Não se tira sempre a mesma quantidade! 12 h = 2 meias-vidas: 400 ÷ 2² = 100 mg.

### 7
<!-- modelo: f3 -->
Uma colônia de bactérias, inicialmente com 200 indivíduos, dobra de tamanho a cada 3 horas. Quantas bactérias haverá após 15 horas?

- A) 12.800
- B) 3.200
- C) 2.000
- D) 6.400
- E) 3.000

**Resposta:** D

**Explicação:** Ferramenta: crescimento exponencial. Conte quantas vezes a colônia dobrou e multiplique por 2 essa quantidade de vezes. 15 ÷ 3 = 5 duplicações: 200 × 2⁵ = 6.400.

### 8
<!-- modelo: f5 -->
Qual é o valor de 81^(3/4)?

- A) 3
- B) 60,75
- C) 27
- D) 81
- E) 9

**Resposta:** C

**Explicação:** Ferramenta: expoente fracionário = raiz. a^(p/q) = (raiz de índice q de a) elevada a p. Tire a raiz primeiro: os números ficam pequenos. raiz de índice 4 de 81 = 3; 3³ = 27.

### 9
<!-- modelo: f4 -->
Considerando log 2 = 0,30 e log 3 = 0,48, qual é o valor de log 9?

- A) 1,26
- B) 1,92
- C) 0,96
- D) 0,14
- E) 0,78

**Resposta:** C

**Explicação:** Ferramenta: propriedades do log. Decomponha o número em fatores 2, 3 e 10: produto vira soma, potência vira multiplicação, divisão vira subtração. 9 = 3² ⇒ log 9 = 0,96.

### 10
<!-- modelo: f11 -->
Qual é o valor de log₃ 1 + log₅ 5 + log 100?

- A) 7
- B) 3
- C) 2
- D) 1
- E) 4

**Resposta:** B

**Explicação:** Ferramenta: logs que todo mundo deve saber. log de 1 é 0 em qualquer base; log da própria base é 1; log 10ᵏ = k. 0 + 1 + 2 = 3.

### 11
<!-- modelo: f2 -->
Qual é o valor de log 1/10?

- A) 0
- B) 1
- C) −1
- D) −2
- E) −10

**Resposta:** C

**Explicação:** Ferramenta: logaritmo é um expoente. O logaritmo de a na base b pergunta: "a que expoente devo elevar b para obter a?" 10⁻¹ = 1/10, então o logaritmo é −1.

### 12
<!-- modelo: f6 -->
Sendo f(x) = 3ˣ, qual é o valor de f(4) − f(0) + f(−1)?

- A) 239/3
- B) 80
- C) 81
- D) 241/3
- E) 83

**Resposta:** D

**Explicação:** Ferramenta: substituição com expoente negativo. b⁻¹ = 1/b: expoente negativo inverte a base. 81 − 1 + 1/3 = 241/3.

### 13
<!-- modelo: f7 -->
Qual das funções abaixo é DECRESCENTE em todo o seu domínio?

- A) f(x) = (3/2)ˣ
- B) f(x) = (1,1)ˣ
- C) f(x) = 5ˣ
- D) f(x) = (1/2)ˣ
- E) f(x) = 2ˣ

**Resposta:** D

**Explicação:** Ferramenta: base da exponencial. f(x) = bˣ cresce se b > 1 e decresce se 0 < b < 1 (multiplicar por algo menor que 1 diminui). Só (1/2) está entre 0 e 1.

### 14
<!-- modelo: f1 -->
Qual é o valor de x na equação 2ˣ = 16?

- A) 12
- B) 5
- C) 4
- D) 8
- E) 3

**Resposta:** C

**Explicação:** Ferramenta: mesma base. Escreva o número do lado direito como potência da mesma base; aí basta igualar os expoentes. 16 = 2⁴ ⇒ x = 4.

### 15
<!-- modelo: f9 -->
Resolva a equação 8ˣ = 16.

- A) 4/3
- B) 4
- C) 8/3
- D) 5/3
- E) 3/4

**Resposta:** A

**Explicação:** Ferramenta: base comum. Quando as bases são potências do mesmo número, reescreva tudo nessa base menor. 2³ˣ = 2⁴ ⇒ 3x = 4 ⇒ x = 4/3.

## Médio

### 1
<!-- modelo: m5 -->
O pH de uma solução é dado por pH = −log[H⁺]. Se a concentração de íons H⁺ em um líquido é 10⁻⁵ mol/L, qual é o seu pH?

- A) 50
- B) 9
- C) 15
- D) 6
- E) 5

**Resposta:** E

**Explicação:** Ferramenta: log de potência de 10. log 10ᵏ = k. O sinal de menos da fórmula deixa o pH positivo. pH = −log 10⁻⁵ = −(−5) = 5.

### 2
<!-- modelo: m10 -->
Na escala Richter, a magnitude é M = log(A/A₀), em que A é a amplitude das ondas do terremoto. Quantas vezes a amplitude de um terremoto de magnitude 8 é maior que a de um de magnitude 5?

- A) 3 vezes
- B) 8 vezes
- C) 1.000 vezes
- D) 10.000 vezes
- E) 30 vezes

**Resposta:** C

**Explicação:** Ferramenta: escala logarítmica. Em escala log de base 10, cada ponto a mais multiplica a grandeza por 10. M₂ − M₁ = log(A₂/A₁) = 3 ⇒ A₂/A₁ = 10³ = 1000.

### 3
<!-- modelo: m1 -->
Qual é a solução da equação 3^(x + 2) = 27?

- A) 0
- B) 1
- C) 2
- D) 5
- E) 3

**Resposta:** B

**Explicação:** Ferramenta: igualar expoentes. Com as bases iguais, os expoentes também são iguais. 27 = 3³ ⇒ x + 2 = 3 ⇒ x = 1.

### 4
<!-- modelo: m2 -->
Se log na base 5 de x é igual a 2, então x vale:

- A) 10
- B) 32
- C) 25
- D) 125
- E) 7

**Resposta:** C

**Explicação:** Ferramenta: definição de logaritmo. Dizer que o log de x na base b é n é o mesmo que dizer bⁿ = x. x = 5² = 25.

### 5
<!-- modelo: m4 -->
Uma população dobra a cada 25 anos. Em quanto tempo ela fica 16 vezes maior que a inicial?

- A) 100 anos
- B) 400 anos
- C) 200 anos
- D) 125 anos
- E) 41 anos

**Resposta:** A

**Explicação:** Ferramenta: potências de 2. Ficar 16 vezes maior = dobrar 4 vezes (16 = 2⁴). 4 × 25 = 100 anos.

### 6
<!-- modelo: m11 -->
Sabendo que log a = 4 e log b = 1, qual é o valor de log(a³ · b² / 10)?

- A) 14
- B) 24
- C) 13
- D) 9
- E) 23

**Resposta:** C

**Explicação:** Ferramenta: propriedades do log. Potência sai multiplicando, produto vira soma, divisão vira subtração, e log 10 = 1. 3·4 + 2·1 − 1 = 13.

### 7
<!-- modelo: m6 -->
Qual é o valor de log na base 25 de 125?

- A) 5/2
- B) 3
- C) 2/3
- D) 3/2
- E) 2

**Resposta:** D

**Explicação:** Ferramenta: mudança de base. Escreva base e logaritmando como potências do mesmo número primo; o log vira a razão dos expoentes. (5³/5²): log = 3/2.

### 8
<!-- modelo: m8 -->
Para que a expressão log(x − 2) exista nos números reais, x deve satisfazer:

- A) x > −2
- B) x > 2
- C) x ≥ 2
- D) x < 2
- E) x > 0

**Resposta:** B

**Explicação:** Ferramenta: condição de existência. Só existe log de número positivo (o logaritmando deve ser maior que zero). x − 2 > 0 ⇒ x > 2.

### 9
<!-- modelo: m12 -->
O gráfico de f(x) = a · bˣ passa pelos pontos (0, 4) e (1, 12). Qual é o valor de f(3)?

- A) 36
- B) 108
- C) 27
- D) 111
- E) 64

**Resposta:** B

**Explicação:** Ferramenta: ler os parâmetros nos pontos. f(0) = a (pois b⁰ = 1). f(1) = a · b dá o b. a = 4, b = 12/4 = 3. f(3) = 4 · 3³ = 108.

### 10
<!-- modelo: m8 -->
Para que a expressão log(−4 − x) exista nos números reais, x deve satisfazer:

- A) x > −4
- B) x ≤ −4
- C) x > 0
- D) x > 4
- E) x < −4

**Resposta:** E

**Explicação:** Ferramenta: condição de existência. Só existe log de número positivo (o logaritmando deve ser maior que zero). −4 − x > 0 ⇒ x < −4.

### 11
<!-- modelo: m3 -->
Um carro de R$ 50.000,00 desvaloriza 10% ao ano em relação ao valor do ano anterior. Qual será o seu valor daqui a 2 anos?

- A) R$ 40.500,00
- B) R$ 45.000,00
- C) R$ 40.000,00
- D) R$ 36.450,00
- E) R$ 500,00

**Resposta:** A

**Explicação:** Ferramenta: decaimento exponencial. Perder 10% ao ano é multiplicar por 0,9 a cada ano: V = V₀ · 0,9ⁿ. 50.000 × 0,8100 = R$ 40.500,00.

### 12
<!-- modelo: m6 -->
Qual é o valor de log na base 27 de 9?

- A) 2/3
- B) 2
- C) 3/2
- D) 4/3
- E) 5/3

**Resposta:** A

**Explicação:** Ferramenta: mudança de base. Escreva base e logaritmando como potências do mesmo número primo; o log vira a razão dos expoentes. (3²/3³): log = 2/3.

### 13
<!-- modelo: m7 -->
Resolva a equação 2ˣ + 2^(x + 2) = 40.

- A) 5
- B) 2
- C) 3
- D) 4
- E) 20

**Resposta:** C

**Explicação:** Ferramenta: colocar em evidência. 2^(x + 2) = 2ˣ · 4. Junte os termos com 2ˣ. 2ˣ(1 + 4) = 40 ⇒ 2ˣ = 8 ⇒ x = 3.

### 14
<!-- modelo: m9 -->
Uma aplicação de R$ 5.000,00 rende 20% ao mês a juros compostos. Qual é o montante após 2 meses?

- A) R$ 2.000,00
- B) R$ 7.000,00
- C) R$ 6.000,00
- D) R$ 7.200,00
- E) R$ 7.450,00

**Resposta:** D

**Explicação:** Ferramenta: função exponencial M = C(1 + i)ⁿ. A cada mês, o saldo é multiplicado pelo mesmo fator. 5.000 × 1,2² = R$ 7.200,00.

### 15
<!-- modelo: m1 -->
Qual é a solução da equação 2^(x + 2) = 16?

- A) 6
- B) 1
- C) 2
- D) 5
- E) 4

**Resposta:** C

**Explicação:** Ferramenta: igualar expoentes. Com as bases iguais, os expoentes também são iguais. 16 = 2⁴ ⇒ x + 2 = 4 ⇒ x = 2.

## Difícil

### 1
<!-- modelo: d2 -->
Um isótopo radioativo tem meia-vida de 8 anos. Partindo de 320 g, quanto restará após 32 anos?

- A) 40 g
- B) 20 g
- C) 22 g
- D) 106,67 g
- E) 10 g

**Resposta:** B

**Explicação:** Ferramenta: meia-vida. Conte quantas meias-vidas cabem no tempo e divida por 2 essa quantidade de vezes. 32 ÷ 8 = 4: 320 ÷ 2⁴ = 20 g.

### 2
<!-- modelo: d4 -->
O nível sonoro, em decibéis, é dado por N = 10 · log(I/I₀). Se a intensidade sonora I de uma fonte for multiplicada por 100, o nível sonoro:

- A) aumenta 20 dB
- B) aumenta 30 dB
- C) aumenta 100 dB
- D) aumenta 200 dB
- E) aumenta 2 dB

**Resposta:** A

**Explicação:** Ferramenta: log do produto. log(10ᵏ · x) = k + log x: multiplicar dentro do log vira somar fora. N' = 10 · [2 + log(I/I₀)] = N + 20.

### 3
<!-- modelo: d7 -->
Qual é a soma das soluções da equação 4ˣ − 17 · 2ˣ + 16 = 0?

- A) 0
- B) 7
- C) 4
- D) 17
- E) 16

**Resposta:** C

**Explicação:** Ferramenta: troca de variável. Faça y = 2ˣ; então 4ˣ = y². A equação vira do 2º grau. y² − 17y + 16 = 0 ⇒ y = 1 ou 16 ⇒ x = 0 ou 4. Soma: 4.

### 4
<!-- modelo: d9 -->
Quantos números inteiros satisfazem a inequação log₂(x − 4) < 3?

- A) 12
- B) 6
- C) 10
- D) 8
- E) 7

**Resposta:** E

**Explicação:** Ferramenta: inequação + domínio. Base maior que 1: a desigualdade se mantém ao passar para a forma exponencial. E o logaritmando precisa ser positivo. 0 < x − 4 < 2³ = 8 ⇒ 4 < x < 12. Inteiros: de 5 a 11, ou seja, 7.

### 5
<!-- modelo: d12 -->
A cidade A dobra sua população (multiplica por 2) a cada 15 anos. A cidade B multiplica sua população por 8 no mesmo período de 15 anos. Quanto tempo a cidade A leva para crescer tanto quanto a cidade B cresce em 15 anos?

- A) 45 anos
- B) 60 anos
- C) 120 anos
- D) 47 anos
- E) 15 anos

**Resposta:** A

**Explicação:** Ferramenta: potências da mesma base. 8 = 2³: a cidade A precisa de 3 períodos. 3 × 15 = 45 anos.

### 6
<!-- modelo: d1 -->
Qual é a solução da equação log₂(x) + log₂(x − 3) = 2?

- A) 5
- B) 3
- C) 4
- D) 1
- E) 7

**Resposta:** C

**Explicação:** Ferramenta: juntar os logs e conferir o domínio. Some os logs (vira log do produto), volte para a forma exponencial e descarte a raiz que deixa algum logaritmando negativo. x(x − 3) = 2² = 4 ⇒ x = 4 ou x = −1. Como x > 3, x = 4.

### 7
<!-- modelo: d5 -->
Uma aplicação de R$ 2.000,00 rende 10% ao ano, a juros compostos. Usando log 2 ≈ 0,30 e log 1,1 ≈ 0,04, em quantos anos, aproximadamente, o montante será 8 vezes o valor aplicado?

- A) 11,3 anos
- B) 80 anos
- C) 25,5 anos
- D) 45 anos
- E) 22,5 anos

**Resposta:** E

**Explicação:** Ferramenta: logaritmo para achar o expoente. O tempo está no expoente; o log "traz" o expoente para baixo. 1,1ⁿ = 8 ⇒ n = log 8 / log 1,1 = 0,90/0,04 ≈ 22,5.

### 8
<!-- modelo: d11 -->
Resolva o sistema { 2ˣ · 4ʸ = 1024 ; 3^(x − y) = 3 } e calcule x + y.

- A) 1
- B) 8
- C) 12
- D) 7
- E) 10

**Resposta:** D

**Explicação:** Ferramenta: igualar expoentes em cada equação. Coloque cada equação numa base só; os expoentes formam um sistema linear. x + 2y = 10 e x − y = 1 ⇒ y = 3, x = 4; x + y = 7.

### 9
<!-- modelo: d7 -->
Qual é a soma das soluções da equação 4ˣ − 6 · 2ˣ + 8 = 0?

- A) 6
- B) 3
- C) 5
- D) 2
- E) 8

**Resposta:** B

**Explicação:** Ferramenta: troca de variável. Faça y = 2ˣ; então 4ˣ = y². A equação vira do 2º grau. y² − 6y + 8 = 0 ⇒ y = 2 ou 4 ⇒ x = 1 ou 2. Soma: 3.

### 10
<!-- modelo: d1 -->
Qual é a solução da equação log₂(x) + log₂(x − 4) = 5?

- A) 32
- B) 4
- C) 8
- D) 18
- E) 12

**Resposta:** C

**Explicação:** Ferramenta: juntar os logs e conferir o domínio. Some os logs (vira log do produto), volte para a forma exponencial e descarte a raiz que deixa algum logaritmando negativo. x(x − 4) = 2⁵ = 32 ⇒ x = 8 ou x = −4. Como x > 4, x = 8.

### 11
<!-- modelo: d6 -->
A meia-vida de uma substância é de 3 horas. Qual é o tempo mínimo, em múltiplos da meia-vida, para que reste menos de 1% da quantidade inicial? (Use log 2 ≈ 0,30.)

- A) 3 h
- B) 24 h
- C) 18 h
- D) 150 h
- E) 21 h

**Resposta:** E

**Explicação:** Ferramenta: inequação exponencial. Após n meias-vidas resta (1/2)ⁿ. Queremos (1/2)ⁿ < 0.01, isto é, 2ⁿ > 100. 2⁶ = 64 ainda não basta; 2⁷ = 128 > 100. São 7 meias-vidas = 21 h.

### 12
<!-- modelo: d10 -->
A energia liberada por um terremoto se relaciona com a magnitude M por log E = 1,5M + 4,8. Quantas vezes, aproximadamente, a energia de um terremoto de magnitude 8 é maior que a de um de magnitude 5?

- A) cerca de 31.600 vezes
- B) cerca de 1.000 vezes
- C) cerca de 30 vezes
- D) cerca de 100.000 vezes
- E) cerca de 4,5 vezes

**Resposta:** A

**Explicação:** Ferramenta: diferença de logs. Subtraindo as equações, sobra log(E₂/E₁) = 1,5 × (diferença de magnitudes). log(E₂/E₁) = 1,5 × 3 = 4,5 ⇒ E₂/E₁ = 10^4,5 ≈ 31.600 (31.623 aproximadamente).

### 13
<!-- modelo: d2 -->
Um isótopo radioativo tem meia-vida de 5 anos. Partindo de 80 g, quanto restará após 20 anos?

- A) 2,5 g
- B) 10 g
- C) 5 g
- D) 26,67 g
- E) 15 g

**Resposta:** C

**Explicação:** Ferramenta: meia-vida. Conte quantas meias-vidas cabem no tempo e divida por 2 essa quantidade de vezes. 20 ÷ 5 = 4: 80 ÷ 2⁴ = 5 g.

### 14
<!-- modelo: d8 -->
Quantos números inteiros pertencem ao domínio da expressão log na base (x − 1) de (6 − x)?

- A) 5
- B) 13
- C) 4
- D) 2
- E) 3

**Resposta:** E

**Explicação:** Ferramenta: condições de existência. O logaritmando deve ser positivo; a base deve ser positiva e diferente de 1. 6 − x > 0 ⇒ x < 6; x − 1 > 0 ⇒ x > 1; x − 1 ≠ 1 ⇒ x ≠ 2. Inteiros: 3, 4, 5 (3).

### 15
<!-- modelo: d3 -->
Considerando log 2 = 0,30 e log 3 = 0,48, a solução da equação 3ˣ = 2 é, aproximadamente:

- A) 1,63
- B) 1,60
- C) 0,69
- D) 0,63
- E) 0,14

**Resposta:** D

**Explicação:** Ferramenta: aplicar log dos dois lados. Quando não dá para igualar as bases, tire o log: o expoente "desce" multiplicando. x = log 2 / log 3 = 0,30/0,48 ≈ 0,63.
