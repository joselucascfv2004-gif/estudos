---
titulo: Divisibilidade, números primos, MDC e MMC
provas: ENEM, Militares, Concursos
descricao: Critérios de divisibilidade, fatoração em primos, número de divisores, MDC, MMC, restos, calendário e sistemas de numeração.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Divisibilidade, números primos, MDC e MMC

Critérios de divisibilidade, fatoração em primos, número de divisores, MDC, MMC, restos, calendário e sistemas de numeração.

## Resumo

- **Critérios de divisibilidade:** por 2 (termina em par); 3 (soma dos algarismos múltipla de 3); 4 (dois últimos algarismos formam múltiplo de 4); 5 (termina em 0 ou 5); 9 (soma múltipla de 9); 10 (termina em 0); 11 (soma alternada dos algarismos múltipla de 11).
- **Primo** tem exatamente dois divisores. Para testar n, basta tentar os primos até √n.
- **Fatoração:** todo número se escreve como produto de primos (360 = 2³ · 3² · 5).
- **Número de divisores:** some 1 a cada expoente e multiplique. 360 → (3 + 1)(2 + 1)(1 + 1) = 24.
- **MDC** (primos comuns, menores expoentes) resolve "dividir em partes iguais, o maior possível". **MMC** (todos os primos, maiores expoentes) resolve "quando voltam a coincidir". MDC · MMC = a · b.
- **Restos:** dividendo = divisor × quociente + resto. Restos de potências se repetem em ciclos; o dia da semana é o resto por 7.
- **Zeros no fim de n!:** conte os fatores 5 (n/5 + n/25 + n/125...).
- **Outras bases:** cada posição vale uma potência da base. 1011 (base 2) = 8 + 0 + 2 + 1 = 11.

## Fácil

### 1
<!-- modelo: f13 -->
No sistema binário (base 2), o número 11000 corresponde a qual número no sistema decimal?

- A) 25
- B) 2
- C) 23
- D) 24
- E) 3

**Resposta:** D

**Explicação:** Ferramenta: valor posicional em base 2. Cada posição vale uma potência de 2: da direita para a esquerda, 1, 2, 4, 8, 16... 1·16 + 1·8 + 0·4 + 0·2 + 0·1 = 24.

### 2
<!-- modelo: f14 -->
Como se escreve o número 25 no sistema binário?

- A) 11010
- B) 10011
- C) 11101
- D) 11001
- E) 11000

**Resposta:** D

**Explicação:** Ferramenta: divisões por 2. Divida por 2 sucessivamente e leia os restos de baixo para cima; ou some potências de 2. 25 = 16 + 8 + 1 ⇒ 11001.

### 3
<!-- modelo: f5 -->
Dois ônibus partem juntos de um terminal às 6h. Um sai a cada 15 minutos e o outro a cada 20 minutos. Depois de quantos minutos eles voltam a partir juntos?

- A) 60 min
- B) 120 min
- C) 5 min
- D) 300 min
- E) 35 min

**Resposta:** A

**Explicação:** Ferramenta: MMC. "Quando voltam a coincidir" é o primeiro múltiplo comum dos intervalos. MMC(15, 20) = 60 minutos.

### 4
<!-- modelo: f15 -->
Qual número é igual a 1 · 10³ + 3 · 10 + 4?

- A) 1304
- B) 10034
- C) 1043
- D) 1034
- E) 134

**Resposta:** D

**Explicação:** Ferramenta: valor posicional. Cada potência de 10 indica uma casa: 10³ milhar, 10² centena, 10 dezena, 1 unidade. Casa que não aparece vale 0. 1 milhares, 0 centenas, 3 dezenas e 4 unidades: 1034.

### 5
<!-- modelo: f6 -->
Quantos números de 1 a 189 são múltiplos de 9?

- A) 21
- B) 20
- C) 18
- D) 23
- E) 22

**Resposta:** A

**Explicação:** Ferramenta: divisão inteira. Os múltiplos são 9, 18, 27, ...; quantos cabem até 189 é a parte inteira de 189 ÷ 9. 189 = 9 × 21 + 0, então são 21 múltiplos.

### 6
<!-- modelo: f4 -->
Uma costureira tem duas fitas, de 30 cm e de 66 cm, e quer cortá-las em pedaços todos do mesmo tamanho, o maior possível, sem sobrar nada. Quanto deve medir cada pedaço?

- A) 330 cm
- B) 3 cm
- C) 12 cm
- D) 6 cm
- E) 36 cm

**Resposta:** D

**Explicação:** Ferramenta: MDC. "Dividir em partes iguais, do maior tamanho possível" é o máximo divisor comum. MDC(30, 66) = 6 cm.

### 7
<!-- modelo: f3 -->
Qual destes números é divisível por 4: 5812, 5826, 5830, 5842, 5874?

- A) 5874
- B) 5830
- C) 5842
- D) 5812
- E) 5826

**Resposta:** D

**Explicação:** Ferramenta: dois últimos algarismos. Um número é divisível por 4 quando o número formado pelos seus dois últimos algarismos é divisível por 4 (as centenas já são múltiplas de 4). 5812 termina em 12, e 12 = 4 × 3.

### 8
<!-- modelo: f16 -->
Três faróis piscam a cada 6, 10 e 15 segundos, respectivamente. Se piscaram juntos agora, daqui a quantos segundos piscarão juntos de novo?

- A) 900
- B) 30
- C) 31
- D) 33
- E) 1

**Resposta:** B

**Explicação:** Ferramenta: MMC de três números. O próximo encontro é o primeiro múltiplo comum dos três intervalos. 6 = 2 · 3, 10 = 2 · 5, 15 = 3 · 5; MMC = 2 · 3 · 5 = 30 s.

### 9
<!-- modelo: f17 -->
Uma escola vai levar 527 alunos a uma excursão em ônibus de 45 lugares. Qual é o número mínimo de ônibus necessário?

- A) 13
- B) 14
- C) 12
- D) 32
- E) 11

**Resposta:** C

**Explicação:** Ferramenta: resto diferente de zero pede mais um. Divida e, se sobrar resto, os alunos que sobram precisam de mais um ônibus. 527 = 45 × 11 + 32: sobram 32 alunos, então são 12 ônibus.

### 10
<!-- modelo: f1 -->
Qual é a decomposição de 180 em fatores primos?

- A) 2² · 45
- B) 2² · 3² · 5
- C) 2² · 3³ · 5
- D) 2 · 3 · 5
- E) 2³ · 3² · 5

**Resposta:** B

**Explicação:** Ferramenta: divisões sucessivas pelos primos. Divida pelo menor primo possível (2, 3, 5, 7...) até chegar a 1 e anote cada divisor. 180 = 2² · 3² · 5.

### 11
<!-- modelo: f2 -->
Qual destes números é divisível por 3?

- A) 2224
- B) 4816
- C) 3335
- D) 8124
- E) 5512

**Resposta:** D

**Explicação:** Ferramenta: soma dos algarismos. Um número é divisível por 3 quando a soma dos seus algarismos é múltipla de 3. 8124: 8 + 1 + 2 + 4 = 15, que é múltiplo de 3.

### 12
<!-- modelo: f11 -->
Quantos divisores positivos tem o número 100?

- A) 3
- B) 9
- C) 11
- D) 7
- E) 8

**Resposta:** B

**Explicação:** Ferramenta: listar em pares. Liste os divisores em pares cujo produto é o número: assim nenhum fica de fora. 1, 2, 4, 5, 10, 20, 25, 50, 100: são 9.

### 13
<!-- modelo: f12 -->
O produto de três números inteiros consecutivos, como 26 · 27 · 28, é sempre divisível por qual destes números?

- A) 5
- B) 7
- C) 6
- D) 4
- E) 9

**Resposta:** C

**Explicação:** Ferramenta: entre consecutivos sempre há um par e um múltiplo de 3. Em três inteiros seguidos, pelo menos um é par e exatamente um é múltiplo de 3. Por isso o produto é sempre múltiplo de 2 · 3 = 6. 26 · 27 · 28 = 19.656 = 6 × 3.276.

### 14
<!-- modelo: f9 -->
Hoje é quarta-feira. Que dia da semana será daqui a 171 dias?

- A) sábado
- B) segunda-feira
- C) terça-feira
- D) sexta-feira
- E) domingo

**Resposta:** A

**Explicação:** Ferramenta: resto por 7. A semana se repete a cada 7 dias; só o resto da divisão por 7 importa. 171 = 7 × 24 + 3: anda-se 3 dias a partir de quarta-feira, chegando a sábado.

### 15
<!-- modelo: f7 -->
Qual destes números é primo?

- A) 77
- B) 111
- C) 119
- D) 143
- E) 89

**Resposta:** E

**Explicação:** Ferramenta: testar primos até a raiz. Basta tentar dividir pelos primos até √89 ≈ 9. Os outros têm divisores: 143 = 11 · 13; 119 = 7 · 17; 77 = 7 · 11; 111 = 3 · 37. 89 não é divisível por 2, 3, 5 nem 7, então é primo.

### 16
<!-- modelo: f8 -->
Qual é o resto da divisão de 2.523 por 9?

- A) 6
- B) 4
- C) 0
- D) 3
- E) 5

**Resposta:** D

**Explicação:** Ferramenta: divisão euclidiana. Dividendo = divisor × quociente + resto, com 0 ≤ resto < 9. 2.523 = 9 × 280 + 3.

### 17
<!-- modelo: f10 -->
O número 93?3 tem um algarismo apagado (?). Qual algarismo deve ocupar esse lugar para que o número seja divisível por 9, sabendo que não é 9?

- A) 0
- B) 4
- C) 7
- D) 3
- E) 6

**Resposta:** D

**Explicação:** Ferramenta: soma dos algarismos por 9. É divisível por 9 quem tem soma dos algarismos múltipla de 9. 9 + 3 + 3 = 15; falta 3 para chegar a 18, múltiplo de 9.

## Médio

### 1
<!-- modelo: m12 -->
Placas retangulares de 15 cm × 25 cm, todas na mesma posição, serão juntadas para formar o menor quadrado possível. Quantas placas serão usadas?

- A) 45
- B) 30
- C) 15
- D) 75
- E) 8

**Resposta:** C

**Explicação:** Ferramenta: MMC. O lado do quadrado precisa ser múltiplo de 15 e de 25 ao mesmo tempo, o menor possível. Lado = MMC(15, 25) = 75 cm: cabem 5 × 3 = 15 placas.

### 2
<!-- modelo: m9 -->
Qual é o maior fator primo de 935?

- A) 11
- B) 5
- C) 17
- D) 6
- E) 19

**Resposta:** C

**Explicação:** Ferramenta: fatoração. Teste os primos em ordem e vá dividindo. 935 = 5 · 11 · 17.

### 3
<!-- modelo: m1 -->
Quantos divisores positivos tem o número 840?

- A) 32
- B) 16
- C) 36
- D) 3
- E) 10

**Resposta:** A

**Explicação:** Ferramenta: fórmula do número de divisores. Fatore: 840 = 2³ · 3 · 5 · 7. Cada divisor escolhe um expoente de 0 até o máximo para cada primo. (3 + 1)(1 + 1)(1 + 1)(1 + 1) = 32.

### 4
<!-- modelo: m14 -->
O dia 1º de janeiro de 2024 caiu num(a) segunda-feira. Sabendo que 2024 foi um ano bissexto (366 dias), em que dia da semana cai 1º de janeiro de 2025?

- A) quarta-feira
- B) sábado
- C) segunda-feira
- D) quinta-feira
- E) terça-feira

**Resposta:** A

**Explicação:** Ferramenta: resto por 7. 366 = 7 × 52 + 2: o ano tem 52 semanas completas e mais 2 dias. segunda-feira + 2 = quarta-feira.

### 5
<!-- modelo: m17 -->
Qual é o menor número inteiro positivo k para que 72k seja um quadrado perfeito?

- A) 2
- B) 8
- C) 4
- D) 72
- E) 3

**Resposta:** A

**Explicação:** Ferramenta: expoentes pares. Um quadrado perfeito tem todos os expoentes pares na fatoração. Falta multiplicar pelos primos de expoente ímpar. 72 = 2³ · 3²; multiplicando por 2, todos os expoentes ficam pares: 144 = 12².

### 6
<!-- modelo: m3 -->
Qual é o menor número inteiro maior que 2 que, dividido por 6, por 8 ou por 10, deixa sempre resto 2?

- A) 120
- B) 118
- C) 482
- D) 122
- E) 242

**Resposta:** D

**Explicação:** Ferramenta: MMC + resto. Se sobra 2 em todas as divisões, o número menos 2 é múltiplo de 6, 8 e 10 ao mesmo tempo. MMC(6, 8, 10) = 120; o número é 120 + 2 = 122.

### 7
<!-- modelo: m4 -->
Qual é o resto da divisão de 2⁵⁹ por 7?

- A) 0
- B) 6
- C) 4
- D) 2
- E) 1

**Resposta:** C

**Explicação:** Ferramenta: ciclo dos restos. Os restos de 2¹, 2², 2³... por 7 se repetem: 2, 4, 1 (ciclo de 3). 59 = 3 × 19 + 2: é o 2º termo do ciclo, ou seja, resto 4.

### 8
<!-- modelo: m2 -->
O MDC de dois números é 12, e o MMC é 252. Se um deles é 36, qual é o outro?

- A) 21
- B) 168
- C) 120
- D) 84
- E) 216

**Resposta:** D

**Explicação:** Ferramenta: MDC × MMC = produto dos números. Para dois números positivos, MDC(a, b) · MMC(a, b) = a · b. 12 × 252 = 36 × b ⇒ b = 3024 ÷ 36 = 84.

### 9
<!-- modelo: m5 -->
O número 332, escrito na base 6, corresponde a qual número na base 10?

- A) 48
- B) 332
- C) 134
- D) 128
- E) 127

**Resposta:** D

**Explicação:** Ferramenta: valor posicional em outra base. Na base 6, as posições valem 1, 6, 36, ... 3·36 + 3·6 + 2·1 = 128.

### 10
<!-- modelo: m7 -->
Qual algarismo deve substituir o ? para que o número 59?3 seja divisível por 11?

- A) 7
- B) 9
- C) 8
- D) 2
- E) 6

**Resposta:** A

**Explicação:** Ferramenta: soma alternada. Um número é divisível por 11 quando a soma alternada dos algarismos (+, −, +, −...) é múltipla de 11. 5 − 9 + ? − 3 precisa ser múltiplo de 11 ⇒ ? = 7: 5973 = 11 × 543.

### 11
<!-- modelo: m6 -->
Com quantos zeros termina o número 60! (fatorial de 60)?

- A) 12
- B) 15
- C) 6
- D) 14
- E) 30

**Resposta:** D

**Explicação:** Ferramenta: contar fatores 5. Cada zero no final vem de um 10 = 2 · 5. Há muito mais fatores 2 do que 5, então basta contar os fatores 5. Múltiplos de 5 até 60: 12; múltiplos de 25 dão um 5 extra: 2. Total: 14.

### 12
<!-- modelo: m8 -->
Quantos números de 1 a 120 são divisíveis por 2 ou por 3?

- A) 100
- B) 40
- C) 20
- D) 80
- E) 81

**Resposta:** D

**Explicação:** Ferramenta: princípio da inclusão e exclusão. Some os múltiplos de 2 e de 3, mas desconte os múltiplos de 6, que foram contados duas vezes. 60 + 40 − 20 = 80.

### 13
<!-- modelo: m11 -->
Um mercado tem 40 laranjas e 96 maçãs para montar sacolas iguais, com o maior número de sacolas possível e sem sobrar fruta. Quantas frutas haverá em cada sacola?

- A) 8
- B) 17
- C) 19
- D) 16
- E) 60

**Resposta:** B

**Explicação:** Ferramenta: MDC. O número de sacolas deve dividir as duas quantidades e ser o maior possível: é o MDC. MDC(40, 96) = 8 sacolas, cada uma com 5 laranjas e 12 maçãs: 17 frutas.

### 14
<!-- modelo: m15 -->
Duas engrenagens encaixadas têm 16 e 24 dentes. Marcam-se os dentes que estão se tocando. Quantas voltas a engrenagem menor dá até essas marcas se tocarem de novo pela primeira vez?

- A) 2
- B) 48
- C) 3
- D) 4
- E) 5

**Resposta:** C

**Explicação:** Ferramenta: MMC dos dentes. As marcas voltam a se encontrar quando passa o mesmo número de dentes nas duas engrenagens, e esse número precisa ser múltiplo de ambas. MMC(16, 24) = 48 dentes, que são 48 ÷ 16 = 3 voltas da menor.

### 15
<!-- modelo: m13 -->
Qual é a soma dos divisores positivos de 24 que são menores que 24?

- A) 35
- B) 8
- C) 36
- D) 38
- E) 60

**Resposta:** C

**Explicação:** Ferramenta: listar os divisores. Liste em pares e some; os divisores menores que o número são chamados de divisores próprios. Divisores próprios de 24: 1 + 2 + 3 + 4 + 6 + 8 + 12 = 36.

### 16
<!-- modelo: m10 -->
Dividindo o número A por 7, o resto é 1; dividindo B por 7, o resto é 2. Qual é o resto da divisão de A · B por 7?

- A) 1
- B) 3
- C) 2
- D) 4
- E) 6

**Resposta:** C

**Explicação:** Ferramenta: aritmética dos restos. Escreva A = 7q + 1 e B = 7p + 2. No produto, todo termo com 7 é múltiplo de 7; só sobra 1 · 2. 1 · 2 = 2 deixa resto 2 por 7.

### 17
<!-- modelo: m16 -->
Seja n um número inteiro ímpar qualquer (por exemplo, 111). Qual é o resto da divisão de n² por 4?

- A) 5
- B) 3
- C) 0
- D) 1
- E) 2

**Resposta:** D

**Explicação:** Ferramenta: escrever o ímpar como 2k + 1. n = 2k + 1 ⇒ n² = 4k² + 4k + 1 = 4k(k + 1) + 1. 4k(k + 1) é múltiplo de 4. Sobra sempre 1. Exemplo: 111² = 12.321 = 4 × 3.080 + 1.

## Difícil

### 1
<!-- modelo: d11 -->
Considere o número formado por 627 algarismos iguais a 1 (111...1). Qual é o resto da divisão desse número por 9?

- A) 4
- B) 7
- C) 0
- D) 2
- E) 6

**Resposta:** E

**Explicação:** Ferramenta: resto por 9 = resto da soma dos algarismos. Todo número deixa, na divisão por 9, o mesmo resto que a soma dos seus algarismos. A soma dos algarismos é 627, que deixa resto 6 por 9.

### 2
<!-- modelo: d16 -->
Quantos números primos existem entre 80 e 100?

- A) 4
- B) 3
- C) 5
- D) 2
- E) 10

**Resposta:** B

**Explicação:** Ferramenta: eliminar múltiplos de 2, 3, 5 e 7. Como √100 < 11, basta descartar pares, múltiplos de 3, de 5 e de 7. Sobram 83, 89, 97: 3 primos.

### 3
<!-- modelo: d2 -->
Quantos divisores positivos ímpares tem o número 2.520?

- A) 13
- B) 48
- C) 12
- D) 36
- E) 24

**Resposta:** C

**Explicação:** Ferramenta: ignorar o fator 2. Divisor ímpar não pode ter o fator 2. 2.520 = 2³ · 3² · 5 · 7; a parte ímpar é 315 = 3² · 5 · 7. Divisores de 315: (2 + 1)(1 + 1)(1 + 1) = 12.

### 4
<!-- modelo: d6 -->
Para todo número inteiro n, o número n³ − n é sempre divisível por qual destes números?

- A) 6
- B) 12
- C) 5
- D) 9
- E) 4

**Resposta:** A

**Explicação:** Ferramenta: fatorar e reconhecer consecutivos. n³ − n = n(n² − 1) = (n − 1) · n · (n + 1): é o produto de três inteiros consecutivos. Entre três consecutivos há um par e um múltiplo de 3, então o produto é múltiplo de 6. Com n = 2, por exemplo, isso se confirma (e 4, 5, 9, 12 nem sempre dividem: n = 2 dá 6).

### 5
<!-- modelo: d5 -->
Com quantos zeros termina o número 250!?

- A) 60
- B) 64
- C) 27
- D) 62
- E) 50

**Resposta:** D

**Explicação:** Ferramenta: contar os fatores 5 (fórmula de Legendre). Some 250/5, 250/25 e 250/125 (partes inteiras): múltiplos de 25 dão dois fatores 5, e de 125 dão três. 50 + 10 + 2 = 62.

### 6
<!-- modelo: d1 -->
Qual é o resto da divisão de 2⁸⁸⁰ por 9?

- A) 5
- B) 4
- C) 8
- D) 2
- E) 7

**Resposta:** E

**Explicação:** Ferramenta: ciclo dos restos. Os restos de 2¹, 2², 2³, ... por 9 são 2, 4, 8, 7, 5, 1 e se repetem de 6 em 6 (pois 2⁶ = 64 deixa resto 1). 880 = 6 × 146 + 4, então o resto é 7.

### 7
<!-- modelo: d7 -->
Como se escreve o número 1.067 na base 8?

- A) 2063
- B) 2053
- C) 3502
- D) 1753
- E) 2054

**Resposta:** B

**Explicação:** Ferramenta: divisões sucessivas por 8. Divida por 8, anote o resto, divida o quociente por 8 de novo... e leia os restos de baixo para cima. 1.067 = 2·8³ + 0·8² + 5·8¹ + 3·8⁰ ⇒ 2053 na base 8.

### 8
<!-- modelo: d10 -->
Quantos divisores positivos de 10⁷ são múltiplos de 1000?

- A) 39
- B) 16
- C) 5
- D) 64
- E) 25

**Resposta:** E

**Explicação:** Ferramenta: expoentes possíveis. 10⁷ = 2⁷ · 5⁷. Ser múltiplo de 1000 = 2³ · 5³ exige expoentes de 3 a 7 em cada primo. 5 escolhas para o 2 e 5 para o 5: 25 divisores.

### 9
<!-- modelo: d4 -->
Sendo A = 2 · 3³ · 7 e B = 2³ · 3 · 7², qual é o MMC de A e B?

- A) 2⁴ · 3³ · 7²
- B) 2⁴ · 3⁴ · 7³
- C) 2³ · 3⁴ · 7²
- D) 2 · 3 · 7
- E) 2³ · 3³ · 7²

**Resposta:** E

**Explicação:** Ferramenta: MMC: todos os primos, maiores expoentes. O MMC usa todos os primos que aparecem, cada um com o maior expoente. MMC = 2³ · 3³ · 7² = 10.584.

### 10
<!-- modelo: d15 -->
Um granjeiro tem entre 200 e 260 ovos. Se arrumá-los em caixas de 4, de 6 ou de 10, sempre sobram 3 ovos. Quantos ovos ele tem?

- A) 246
- B) 245
- C) 303
- D) 240
- E) 243

**Resposta:** E

**Explicação:** Ferramenta: MMC + sobra. Tirando os 3 que sobram, o total vira múltiplo de MMC(4, 6, 10) = 60. Múltiplos de 60 mais 3: o único entre 200 e 260 é 243.

### 11
<!-- modelo: d9 -->
Qual é o resto da divisão de 1 + 2 + 3 + ··· + 150 por 7?

- A) 5
- B) 3
- C) 1
- D) 0
- E) 6

**Resposta:** E

**Explicação:** Ferramenta: soma de Gauss + resto. A soma de 1 até n é n(n + 1)/2. 150 · 151 / 2 = 11.325 = 7 × 1.617 + 6.

### 12
<!-- modelo: d8 -->
Qual é o maior número de quatro algarismos que é divisível por 8, por 12 e por 18?

- A) 9792
- B) 9936
- C) 9864
- D) 8640
- E) 9984

**Resposta:** B

**Explicação:** Ferramenta: múltiplos do MMC. Ser divisível pelos três é ser múltiplo de MMC(8, 12, 18) = 72. 9999 = 72 × 138 + 63; o maior múltiplo é 72 × 138 = 9936.

### 13
<!-- modelo: d3 -->
Qual é o menor número inteiro positivo que deixa resto 2 na divisão por 3, resto 1 na divisão por 5 e resto 4 na divisão por 7?

- A) 32
- B) 11
- C) 46
- D) 116
- E) 26

**Resposta:** B

**Explicação:** Ferramenta: procurar entre os candidatos. Liste os números que deixam resto 4 por 7 (4, 11, 18, ...) e teste as outras condições. A resposta se repete a cada 3 · 5 · 7 = 105. 11 = 3 × 3 + 2 = 5 × 2 + 1 = 7 × 1 + 4.

### 14
<!-- modelo: d13 -->
O número 217 não é primo. Qual é a soma dos seus fatores primos?

- A) 24
- B) 34
- C) 40
- D) 216
- E) 38

**Resposta:** E

**Explicação:** Ferramenta: testar primos até a raiz. √217 ≈ 14: basta testar 2, 3, 5, 7, 11, 13... 217 = 7 · 31; soma 38.

### 15
<!-- modelo: d12 -->
Qual é a soma de todos os divisores positivos de 48?

- A) 100
- B) 125
- C) 110
- D) 76
- E) 124

**Resposta:** E

**Explicação:** Ferramenta: fórmula da soma dos divisores. Fatore: 48 = 2⁴ · 3. A soma dos divisores é o produto das somas das potências de cada primo. (1 + 2 + 4 + 8 + 16) · (1 + 3) = 124.

### 16
<!-- modelo: d14 -->
Em certa base b, o número 121 representa o número 25 do sistema decimal. Qual é o valor de b?

- A) 4
- B) 8
- C) 10
- D) 5
- E) 3

**Resposta:** A

**Explicação:** Ferramenta: valor posicional em base b. 121 na base b vale 1·b² + 2·b + 1 = (b + 1)². (b + 1)² = 25 ⇒ b + 1 = 5 ⇒ b = 4.
