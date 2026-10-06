---
titulo: Progressões aritméticas e geométricas
provas: ENEM, Militares, Concursos
descricao: Padrões em sequências, termo geral e soma de PA e PG, PG infinita e problemas do dia a dia.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Progressões aritméticas e geométricas

Padrões em sequências, termo geral e soma de PA e PG, PG infinita e problemas do dia a dia.

## Resumo

- **PA (progressão aritmética):** soma-se sempre a mesma razão r. Termo geral: aₙ = a₁ + (n − 1)·r.
- **Soma da PA:** Sₙ = (a₁ + aₙ)·n / 2.
- **PG (progressão geométrica):** multiplica-se sempre pela mesma razão q. Termo geral: aₙ = a₁ · qⁿ⁻¹.
- **Soma da PG finita:** Sₙ = a₁(qⁿ − 1)/(q − 1). **Soma infinita** (|q| < 1): S = a₁/(1 − q).
- **Como reconhecer:** diferenças iguais entre termos → PA; quocientes iguais → PG.
- **Aplicações:** PA aparece em economias que crescem um valor fixo por mês; PG aparece em juros compostos, bactérias que dobram e reduções percentuais repetidas.

## Fácil

### 1
<!-- modelo: f12 -->
Quantos termos tem a progressão aritmética (9, 14, 19, ..., 144)?

- A) 27
- B) 135
- C) 30
- D) 28
- E) 29

**Resposta:** D

**Explicação:** Ferramenta: termo geral ao contrário. Descubra quantos "pulos" separam o primeiro do último e some 1 (o próprio primeiro termo). (144 − 9) ÷ 5 = 27 pulos ⇒ 28 termos.

### 2
<!-- modelo: f4 -->
Qual é a soma dos 21 primeiros números ímpares positivos (1 + 3 + 5 + ...)?

- A) 231
- B) 462
- C) 882
- D) 441
- E) 440

**Resposta:** D

**Explicação:** Ferramenta: soma da PA. Soma = (primeiro + último) × quantidade ÷ 2. (Curiosidade: a soma dos n primeiros ímpares é sempre n².) Último: 41. (1 + 41) × 21 ÷ 2 = 441.

### 3
<!-- modelo: f7 -->
Com palitos de fósforo, Larissa monta uma fileira de triângulos lado a lado, que compartilham um lado: 1 figura usa 3 palitos, 2 figuras usam 5, 3 figuras usam 7, e assim por diante. Quantos palitos são necessários para 25 triângulos?

- A) 75
- B) 51
- C) 74
- D) 50
- E) 53

**Resposta:** B

**Explicação:** Ferramenta: PA escondida no desenho. Cada figura nova acrescenta 2 palitos (um lado já existe). 3 + (25 − 1) × 2 = 51.

### 4
<!-- modelo: f7 -->
Com palitos de fósforo, Isabela monta uma fileira de quadrados lado a lado, que compartilham um lado: 1 figura usa 4 palitos, 2 figuras usam 7, 3 figuras usam 10, e assim por diante. Quantos palitos são necessários para 12 quadrados?

- A) 37
- B) 47
- C) 36
- D) 40
- E) 48

**Resposta:** A

**Explicação:** Ferramenta: PA escondida no desenho. Cada figura nova acrescenta 3 palitos (um lado já existe). 4 + (12 − 1) × 3 = 37.

### 5
<!-- modelo: f9 -->
Os números x + 2, 2x + 3 e 4x − 2, nessa ordem, formam uma progressão aritmética. Qual é o valor de x?

- A) 7
- B) 6
- C) 4
- D) 16
- E) 12

**Resposta:** B

**Explicação:** Ferramenta: termo do meio é a média. Em uma PA de três termos, o do meio é a média dos outros dois: 2 × (meio) = (primeiro) + (terceiro). 2(2x + 3) = (x + 2) + (4x − 2) ⇒ 4x + 6 = 5x + 0 ⇒ x = 6.

### 6
<!-- modelo: f8 -->
Qual das sequências abaixo é uma progressão geométrica?

- A) (2, 3, 5, 8)
- B) (4, 6, 8, 10)
- C) (2, 4, 8, 16)
- D) (2, 4, 6, 8)
- E) (1, 4, 9, 16)

**Resposta:** C

**Explicação:** Ferramenta: teste do quociente. Divida cada termo pelo anterior. Na PG o resultado é sempre o mesmo. 4/2 = 8/4 = 16/8 = 2.

### 7
<!-- modelo: f2 -->
Em uma progressão geométrica de primeiro termo 2 e razão 3, qual é o 4º termo?

- A) 11
- B) 162
- C) 18
- D) 55
- E) 54

**Resposta:** E

**Explicação:** Ferramenta: termo geral da PG. Do 1º ao 4º termo multiplicamos por 3 um total de 3 vezes. a4 = 2 · 3³ = 54.

### 8
<!-- modelo: f1 -->
Em uma progressão aritmética, o primeiro termo é 8 e a razão é 3. Qual é o 10º termo?

- A) 27
- B) 83
- C) 35
- D) 38
- E) 32

**Resposta:** C

**Explicação:** Ferramenta: termo geral da PA. Do 1º ao 10º termo há 9 "pulos" de tamanho 3. a10 = 8 + 9 · 3 = 35.

### 9
<!-- modelo: f6 -->
Em um plano de treino, Gabriela corre 2 km no primeiro dia e, a cada dia, corre 0,5 km a mais que no dia anterior. Quantos quilômetros vai correr no 20º dia?

- A) 11,5 km
- B) 12 km
- C) 22 km
- D) 11 km
- E) 9,5 km

**Resposta:** A

**Explicação:** Ferramenta: PA no dia a dia. Aumentar sempre a mesma quantidade é uma PA de razão 0,5. 2 + 19 × 0,5 = 11,5 km.

### 10
<!-- modelo: f11 -->
Os termos de uma sequência são dados por aₙ = 2n + 5. Qual é o valor de a₂₇?

- A) 54
- B) 59
- C) 64
- D) 57
- E) 34

**Resposta:** B

**Explicação:** Ferramenta: substituir n. O termo geral é uma "receita": troque n pela posição desejada. 2 × 27 + 5 = 59.

### 11
<!-- modelo: f10 -->
Uma bola é solta de 32 m de altura e, a cada quique no chão, sobe até a metade da altura anterior. Que altura ela atinge depois do 3º quique?

- A) 8 m
- B) 2 m
- C) 5,33 m
- D) 26 m
- E) 4 m

**Resposta:** E

**Explicação:** Ferramenta: PG de razão 1/2. Cada quique multiplica a altura por 1/2. 32 × (1/2)³ = 4 m.

### 12
<!-- modelo: f2 -->
Em uma progressão geométrica de primeiro termo 3 e razão 3, qual é o 5º termo?

- A) 15
- B) 81
- C) 729
- D) 243
- E) 36

**Resposta:** D

**Explicação:** Ferramenta: termo geral da PG. Do 1º ao 5º termo multiplicamos por 3 um total de 4 vezes. a5 = 3 · 3⁴ = 243.

### 13
<!-- modelo: f1 -->
Em uma progressão aritmética, o primeiro termo é 12 e a razão é 1. Qual é o 17º termo?

- A) 205
- B) 16
- C) 29
- D) 28
- E) 27

**Resposta:** D

**Explicação:** Ferramenta: termo geral da PA. Do 1º ao 17º termo há 16 "pulos" de tamanho 1. a17 = 12 + 16 · 1 = 28.

### 14
<!-- modelo: f5 -->
Qual é o próximo termo da sequência 6, 12, 24, 48, ...?

- A) 72
- B) 192
- C) 96
- D) 50
- E) 48

**Resposta:** C

**Explicação:** Ferramenta: descobrir o padrão. Se a diferença entre os termos não é constante, teste o quociente (divisão). Quociente constante é PG. Cada termo é o anterior × 2: 48 × 2 = 96.

### 15
<!-- modelo: f3 -->
Qual é o próximo termo da sequência 12, 21, 30, 39, 48, ...?

- A) 58
- B) 56
- C) 96
- D) 57
- E) 66

**Resposta:** D

**Explicação:** Ferramenta: descobrir o padrão. Calcule a diferença entre termos vizinhos. Se ela é sempre a mesma, é uma PA. Diferença 9: 48 + 9 = 57.

### 16
<!-- modelo: f12 -->
Quantos termos tem a progressão aritmética (1, 4, 7, ..., 67)?

- A) 24
- B) 22
- C) 23
- D) 66
- E) 21

**Resposta:** C

**Explicação:** Ferramenta: termo geral ao contrário. Descubra quantos "pulos" separam o primeiro do último e some 1 (o próprio primeiro termo). (67 − 1) ÷ 3 = 22 pulos ⇒ 23 termos.

### 17
<!-- modelo: f13 -->
Quanto vale a soma dos 25 primeiros números ímpares positivos (1 + 3 + 5 + …)?

- A) 650
- B) 625
- C) 50
- D) 325
- E) 1.250

**Resposta:** B

**Explicação:** Ferramenta: soma dos n primeiros ímpares = n². É uma PA de razão 2: o último termo é 49 e a soma é (1 + 49) × 25 ÷ 2. 25² = 625.

## Médio

### 1
<!-- modelo: m2 -->
Qual é a soma dos 8 primeiros termos da PG (3, 6, 12, ...)?

- A) 765
- B) 1.533
- C) 384
- D) 768
- E) 762

**Resposta:** A

**Explicação:** Ferramenta: soma da PG. Sₙ = a₁(qⁿ − 1)/(q − 1). 3(2⁸ − 1)/1 = 765.

### 2
<!-- modelo: m11 -->
Em que posição o número 135 aparece na progressão aritmética (5, 10, 15, ...)?

- A) 81ª posição
- B) 30ª posição
- C) 27ª posição
- D) 28ª posição
- E) 26ª posição

**Resposta:** C

**Explicação:** Ferramenta: isolar n no termo geral. Use aₙ = a₁ + (n − 1)r e resolva para n. 135 = 5 + (n − 1) × 5 ⇒ n − 1 = 26 ⇒ n = 27.

### 3
<!-- modelo: m1 -->
Qual é a soma dos 21 primeiros termos da PA (9, 14, 19, ...)?

- A) 2.478
- B) 1.291,5
- C) 1.239
- D) 1.180
- E) 2.289

**Resposta:** C

**Explicação:** Ferramenta: soma da PA (truque de Gauss). Primeiro + último = segundo + penúltimo = ... Some os pares e multiplique. a21 = 109; S = (9 + 109) × 21 ÷ 2 = 1239.

### 4
<!-- modelo: m4 -->
Quantos múltiplos de 4 existem entre 31 e 366?

- A) 85
- B) 91
- C) 84
- D) 86
- E) 83

**Resposta:** C

**Explicação:** Ferramenta: PA de múltiplos. Os múltiplos de 4 formam uma PA de razão 4. Ache o primeiro e o último no intervalo. Primeiro 32, último 364: (364 − 32) ÷ 4 + 1 = 84.

### 5
<!-- modelo: m5 -->
Em uma PA, o 6º termo é −10 e o 9º termo é −22. Qual é o primeiro termo?

- A) 30
- B) 10
- C) 20
- D) 14
- E) 6

**Resposta:** B

**Explicação:** Ferramenta: contar razões entre termos. Entre o 6º e o 9º termo há 3 razões. r = (−22 + 10) ÷ 3 = −4; a₁ = −10 − 5 × (−4) = 10.

### 6
<!-- modelo: m1 -->
Qual é a soma dos 23 primeiros termos da PA (6, 8, 10, ...)?

- A) 644
- B) 1.288
- C) 1.150
- D) 667
- E) 616

**Resposta:** A

**Explicação:** Ferramenta: soma da PA (truque de Gauss). Primeiro + último = segundo + penúltimo = ... Some os pares e multiplique. a23 = 50; S = (6 + 50) × 23 ÷ 2 = 644.

### 7
<!-- modelo: m5 -->
Em uma PA, o 6º termo é −33 e o 12º termo é −69. Qual é o primeiro termo?

- A) 3
- B) −6
- C) −9
- D) −3
- E) −4

**Resposta:** D

**Explicação:** Ferramenta: contar razões entre termos. Entre o 6º e o 12º termo há 6 razões. r = (−69 + 33) ÷ 6 = −6; a₁ = −33 − 5 × (−6) = −3.

### 8
<!-- modelo: m12 -->
Um estacionamento cobra R$ 12,00 pela primeira hora e R$ 4,00 por hora adicional (cada hora começada conta inteira). Quanto paga quem fica 5 horas e 20 minutos?

- A) R$ 72,00
- B) R$ 32,00
- C) R$ 36,00
- D) R$ 28,00
- E) R$ 80,00

**Resposta:** B

**Explicação:** Ferramenta: PA com contagem cuidadosa. 5 h 20 min contam como 6 horas: a primeira e mais 5 adicionais. R$ 12,00 + 5 × R$ 4,00 = R$ 32,00.

### 9
<!-- modelo: m7 -->
Um teatro tem 10 fileiras. A primeira tem 16 cadeiras e cada fileira seguinte tem 2 cadeiras a mais que a anterior. Quantas cadeiras há no teatro?

- A) 180
- B) 340
- C) 160
- D) 250
- E) 234

**Resposta:** D

**Explicação:** Ferramenta: soma da PA. Calcule a última fileira e use (primeira + última) × quantidade ÷ 2. Última: 16 + 9 × 2 = 34. Total: (16 + 34) × 10 ÷ 2 = 250.

### 10
<!-- modelo: m9 -->
A soma dos n primeiros termos de uma sequência é Sₙ = 2n² + 4n. Qual é o 9º termo dessa sequência?

- A) 22
- B) 198
- C) 160
- D) 162
- E) 38

**Resposta:** E

**Explicação:** Ferramenta: aₙ = Sₙ − Sₙ₋₁. A soma até o termo k menos a soma até o termo k − 1 sobra exatamente o termo k. S9 = 198, S8 = 160; a9 = 38.

### 11
<!-- modelo: m6 -->
Em uma PG de termos positivos, o 2º termo é 6 e o 5º termo é 48. Qual é a razão?

- A) 2
- B) 14
- C) 4
- D) 0
- E) 3

**Resposta:** A

**Explicação:** Ferramenta: contar razões entre termos. Do 2º ao 5º termo multiplicamos pela razão 3 vezes. 6 · q³ = 48 ⇒ q³ = 8 ⇒ q = 2.

### 12
<!-- modelo: m10 -->
Inserindo 3 meios geométricos entre 3 e 243, obtém-se uma PG crescente. Qual é a razão?

- A) 60
- B) 9
- C) 3
- D) 27
- E) 4

**Resposta:** C

**Explicação:** Ferramenta: termo geral da PG. A PG terá 5 termos; do 1º ao último há 4 multiplicações pela razão. 243 = 3 · q⁴ ⇒ q⁴ = 81 ⇒ q = 3.

### 13
<!-- modelo: m4 -->
Quantos múltiplos de 3 existem entre 72 e 368?

- A) 101
- B) 122
- C) 98
- D) 99
- E) 100

**Resposta:** D

**Explicação:** Ferramenta: PA de múltiplos. Os múltiplos de 3 formam uma PA de razão 3. Ache o primeiro e o último no intervalo. Primeiro 72, último 366: (366 − 72) ÷ 3 + 1 = 99.

### 14
<!-- modelo: m3 -->
Felipe decidiu economizar: guardou R$ 150,00 no primeiro mês e, a cada mês, guarda R$ 20,00 a mais que no mês anterior. Quanto terá guardado ao final de 6 meses?

- A) R$ 1.020,00
- B) R$ 1.500,00
- C) R$ 900,00
- D) R$ 1.200,00
- E) R$ 1.350,00

**Resposta:** D

**Explicação:** Ferramenta: soma da PA. Os depósitos formam uma PA; o total guardado é a soma dela. Último depósito: R$ 250,00. Soma: (150 + 250) × 6 ÷ 2 = R$ 1.200,00.

### 15
<!-- modelo: m9 -->
A soma dos n primeiros termos de uma sequência é Sₙ = 3n² + n. Qual é o 5º termo dessa sequência?

- A) 75
- B) 80
- C) 28
- D) 16
- E) 52

**Resposta:** C

**Explicação:** Ferramenta: aₙ = Sₙ − Sₙ₋₁. A soma até o termo k menos a soma até o termo k − 1 sobra exatamente o termo k. S5 = 80, S4 = 52; a5 = 28.

### 16
<!-- modelo: m8 -->
Os números x, 8 e 16, nessa ordem, formam uma PG. Qual é o valor de x?

- A) 4
- B) 5,33
- C) 8
- D) 5
- E) 0

**Resposta:** A

**Explicação:** Ferramenta: termo do meio na PG. Em uma PG de três termos, o do meio ao quadrado é igual ao produto dos outros dois. (8)² = x · 16 ⇒ x = 64/16 = 4.

### 17
<!-- modelo: m13 -->
Numa PG, o 1º termo é 1 e o 4º termo é −8. Qual é a razão?

- A) −3
- B) −2
- C) −4
- D) −8
- E) 2

**Resposta:** B

**Explicação:** Ferramenta: termo geral da PG: a₄ = a₁·q³. q³ = −8 ÷ 1 = −8. q = ∛(−8) = −2.

## Difícil

### 1
<!-- modelo: d4 -->
Qual é a soma de todos os múltiplos positivos de 4 menores ou iguais a 200?

- A) 4.900
- B) 5.000
- C) 1.275
- D) 5.100
- E) 5.104

**Resposta:** D

**Explicação:** Ferramenta: soma da PA. São 4, 8, ..., 200: 50 termos. (4 + 200) × 50 ÷ 2 = 5.100.

### 2
<!-- modelo: d1 -->
Qual é a soma dos infinitos termos da PG (9, 6, 4, ...)?

- A) 15
- B) 27
- C) 14
- D) 54
- E) 5,4

**Resposta:** B

**Explicação:** Ferramenta: soma da PG infinita. Quando a razão está entre −1 e 1, os termos encolhem e a soma "converge": S = a₁/(1 − q). q = 2/3; S = 9 ÷ (1/3) = 27.

### 3
<!-- modelo: d3 -->
Ao inserir 5 meios aritméticos entre 8 e 50, obtém-se uma PA. Qual é a razão dessa PA?

- A) 42
- B) 8
- C) 7
- D) 8,4
- E) 6

**Resposta:** C

**Explicação:** Ferramenta: contar termos. Com os 5 meios, a PA tem 7 termos e 6 razões entre o primeiro e o último. r = (50 − 8) ÷ 6 = 7.

### 4
<!-- modelo: d5 -->
Os números −1, 7 e 31, somados a uma mesma constante c, formam uma progressão geométrica. Qual é o valor de c?

- A) 3
- B) 8
- C) 4
- D) 5
- E) 6

**Resposta:** D

**Explicação:** Ferramenta: propriedade da PG. (termo do meio)² = (primeiro) × (terceiro). (7 + c)² = (−1 + c)(31 + c) ⇒ c = 5, e a PG fica (4, 12, 36).

### 5
<!-- modelo: d6 -->
Uma bola é solta de 6 m de altura. A cada quique, sobe até 1/3 da altura anterior, e o movimento continua indefinidamente. Qual é a distância vertical total percorrida pela bola (subidas e descidas)?

- A) 12 m
- B) 9 m
- C) 18 m
- D) 13 m
- E) 24 m

**Resposta:** A

**Explicação:** Ferramenta: PG infinita. A primeira queda é só descida; cada quique depois gera uma subida e uma descida iguais. As alturas dos quiques formam uma PG. Quiques: 2 + ... = 3 m (cada um contado 2 vezes). Total: 6 + 2 × 3 = 12 m.

### 6
<!-- modelo: d2 -->
Três números estão em PA crescente. A soma deles é 42 e o produto é 2618. Qual é o maior deles?

- A) 17
- B) 20
- C) 39
- D) 11
- E) 14

**Resposta:** A

**Explicação:** Ferramenta: escolher bem as incógnitas. Escreva os três como (x − r, x, x + r): a soma elimina o r. 3x = 42 ⇒ x = 14; 14(14² − r²) = 2618 ⇒ r = 3. Maior: 17.

### 7
<!-- modelo: d6 -->
Uma bola é solta de 10 m de altura. A cada quique, sobe até 2/3 da altura anterior, e o movimento continua indefinidamente. Qual é a distância vertical total percorrida pela bola (subidas e descidas)?

- A) 49 m
- B) 60 m
- C) 100 m
- D) 50 m
- E) 30 m

**Resposta:** D

**Explicação:** Ferramenta: PG infinita. A primeira queda é só descida; cada quique depois gera uma subida e uma descida iguais. As alturas dos quiques formam uma PG. Quiques: 6,67 + ... = 20 m (cada um contado 2 vezes). Total: 10 + 2 × 20 = 50 m.

### 8
<!-- modelo: d8 -->
Somando 1 + 2 + 3 + ... + n, qual é o menor valor de n para que a soma ultrapasse 500?

- A) 50
- B) 22
- C) 33
- D) 32
- E) 31

**Resposta:** D

**Explicação:** Ferramenta: soma da PA e estimativa. A soma é n(n + 1)/2. Estime n ≈ √(2 × alvo) e teste os vizinhos. n = 31: 496 (não passa); n = 32: 528 (passa).

### 9
<!-- modelo: d1 -->
Qual é a soma dos infinitos termos da PG (8, 6, 4,5, ...)?

- A) 32
- B) 14
- C) 64
- D) 42
- E) 4,57

**Resposta:** A

**Explicação:** Ferramenta: soma da PG infinita. Quando a razão está entre −1 e 1, os termos encolhem e a soma "converge": S = a₁/(1 − q). q = 3/4; S = 8 ÷ (1/4) = 32.

### 10
<!-- modelo: d2 -->
Três números estão em PA crescente. A soma deles é 12 e o produto é 28. Qual é o maior deles?

- A) 7
- B) 9
- C) 10
- D) 4
- E) 1

**Resposta:** A

**Explicação:** Ferramenta: escolher bem as incógnitas. Escreva os três como (x − r, x, x + r): a soma elimina o r. 3x = 12 ⇒ x = 4; 4(4² − r²) = 28 ⇒ r = 3. Maior: 7.

### 11
<!-- modelo: d12 -->
Em uma PG de 5 termos positivos, o termo do meio é 5. Qual é o produto dos 5 termos?

- A) 625
- B) 25
- C) 3.125
- D) 3.135
- E) 125

**Resposta:** C

**Explicação:** Ferramenta: simetria da PG. Termos equidistantes do meio têm produto igual ao quadrado do termo do meio: a₁·a₅ = a₂·a₄ = a₃². Produto = a₃² · a₃² · a₃ = 5⁵ = 3125.

### 12
<!-- modelo: d10 -->
Qual é o valor de 1 − 2 + 3 − 4 + 5 − 6 + ... + 43 − 44?

- A) −23
- B) −44
- C) 22
- D) −22
- E) 0

**Resposta:** D

**Explicação:** Ferramenta: agrupar em pares. Junte de dois em dois: (1 − 2) + (3 − 4) + ... Cada par vale −1. São 22 pares: 22 × (−1) = −22.

### 13
<!-- modelo: d7 -->
Um quadrado tem lado 10 cm. Ligando os pontos médios dos seus lados, obtém-se um novo quadrado; repete-se o processo infinitamente. Qual é a soma das áreas de todos os quadrados?

- A) 400 cm²
- B) 110 cm²
- C) 200 cm²
- D) 100 cm²
- E) 150 cm²

**Resposta:** C

**Explicação:** Ferramenta: PG infinita de áreas. O quadrado formado pelos pontos médios tem metade da área do anterior: razão 1/2. S = 100 ÷ (1 − 1/2) = 200 cm².

### 14
<!-- modelo: d11 -->
Observe a sequência 2, 5, 10, 17, 26, ... Seguindo o mesmo padrão, qual é o 13º termo?

- A) 168
- B) 169
- C) 170
- D) 145
- E) 38

**Resposta:** C

**Explicação:** Ferramenta: diferenças das diferenças. As diferenças (3, 5, 7, 9, ...) formam uma PA. Isso indica um termo do tipo n² + algo. Os termos são n² + 1: 13² + 1 = 170.

### 15
<!-- modelo: d9 -->
Um patrão oferece duas formas de pagamento por 25 dias de trabalho: (A) R$ 1.000,00 por dia; (B) R$ 0,01 no 1º dia, R$ 0,02 no 2º, R$ 0,04 no 3º, sempre dobrando. Qual opção paga mais no total, e quanto?

- A) A opção B, com R$ 167.772,16
- B) A opção B, com R$ 335.544,31
- C) A opção B, com R$ 0,50
- D) As duas pagam o mesmo
- E) A opção A, com R$ 25.000,00

**Resposta:** B

**Explicação:** Ferramenta: soma da PG (crescimento explosivo). A opção B é uma PG de razão 2: Sₙ = 0,01(2ⁿ − 1). Dobrar muitas vezes cresce muito rápido. A: 25 × R$ 1.000,00 = R$ 25.000,00. B: 0,01 × (2²⁵ − 1) = R$ 335.544,31.

### 16
<!-- modelo: d11 -->
Observe a sequência 5, 8, 13, 20, 29, ... Seguindo o mesmo padrão, qual é o 24º termo?

- A) 579
- B) 74
- C) 580
- D) 533
- E) 576

**Resposta:** C

**Explicação:** Ferramenta: diferenças das diferenças. As diferenças (3, 5, 7, 9, ...) formam uma PA. Isso indica um termo do tipo n² + algo. Os termos são n² + 4: 24² + 4 = 580.
