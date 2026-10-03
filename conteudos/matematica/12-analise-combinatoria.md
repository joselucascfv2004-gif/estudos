---
titulo: Análise combinatória
provas: ENEM, Militares, Concursos
descricao: Princípio fundamental da contagem, permutações, arranjos e combinações.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Análise combinatória

Princípio fundamental da contagem, permutações, arranjos e combinações.

## Resumo

- **Princípio multiplicativo:** se uma escolha tem m opções e outra tem n, juntas têm m × n.
- **Permutação** (todos os elementos, a ordem importa): Pₙ = n!. Com repetições: n!/(a!·b!·…), como nos anagramas com letras repetidas.
- **Arranjo** (escolher p de n, **a ordem importa**): A = n!/(n − p)!. Ex.: pódio, senhas, cargos diferentes.
- **Combinação** (escolher p de n, **a ordem não importa**): C = n!/[p!(n − p)!]. Ex.: comissões, grupos, apostas.
- **Pergunta-chave:** trocar a ordem gera uma possibilidade nova? Se sim, é arranjo; se não, é combinação.
- **Restrições** ("começa com vogal", "dois juntos"): resolva primeiro as posições restritas.

## Fácil

### 1
Caio tem 5 camisetas, 4 calças e 4 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 13
- B) 160
- C) 80
- D) 36
- E) 24

**Resposta:** C

**Explicação:** Princípio multiplicativo: 5 × 4 × 4 = 80.

### 2
Quantos anagramas tem a palavra ESCOLA?

- A) 216
- B) 360
- C) 720
- D) 120
- E) 36

**Resposta:** C

**Explicação:** ESCOLA tem 6 letras distintas: 6! = 720 anagramas.

### 3
Quantas senhas de 3 dígitos (de 0 a 9) podem ser formadas, se for permitido repetir dígitos?

- A) 30
- B) 100
- C) 720
- D) 1.000
- E) 729

**Resposta:** D

**Explicação:** Cada posição tem 10 opções: 10^3 = 1.000.

### 4
Em uma reunião com 19 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 190
- B) 361
- C) 38
- D) 342
- E) 171

**Resposta:** E

**Explicação:** Cada aperto envolve um par de pessoas: C(19, 2) = 19·18/2 = 171.

### 5
De uma cidade A a uma cidade B há 4 estradas, e de B a C há 4 estradas. Também há 3 estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?

- A) 19
- B) 48
- C) 16
- D) 28
- E) 11

**Resposta:** A

**Explicação:** Passando por B: 4 × 4 = 16. Direto: 3. Total: 19 (soma porque são caminhos alternativos).

### 6
Júlia tem 4 camisetas, 2 calças e 3 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 11
- B) 24
- C) 48
- D) 18
- E) 9

**Resposta:** B

**Explicação:** Princípio multiplicativo: 4 × 2 × 3 = 24.

### 7
Quantos anagramas tem a palavra NOITE?

- A) 60
- B) 25
- C) 120
- D) 24
- E) 125

**Resposta:** C

**Explicação:** NOITE tem 5 letras distintas: 5! = 120 anagramas.

### 8
Em uma reunião com 29 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 812
- B) 406
- C) 58
- D) 435
- E) 841

**Resposta:** B

**Explicação:** Cada aperto envolve um par de pessoas: C(29, 2) = 29·28/2 = 405.99999999999994.

### 9
De uma cidade A a uma cidade B há 4 estradas, e de B a C há 5 estradas. Também há 2 estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?

- A) 11
- B) 30
- C) 20
- D) 22
- E) 40

**Resposta:** D

**Explicação:** Passando por B: 4 × 5 = 20. Direto: 2. Total: 22 (soma porque são caminhos alternativos).

### 10
Caio tem 2 camisetas, 5 calças e 5 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 50
- B) 12
- C) 35
- D) 100
- E) 15

**Resposta:** A

**Explicação:** Princípio multiplicativo: 2 × 5 × 5 = 50.

### 11
Quantos anagramas tem a palavra PRATO?

- A) 60
- B) 25
- C) 125
- D) 24
- E) 120

**Resposta:** E

**Explicação:** PRATO tem 5 letras distintas: 5! = 120 anagramas.

### 12
Quantas senhas de 6 dígitos (de 0 a 9) podem ser formadas, se for permitido repetir dígitos?

- A) 531.441
- B) 60
- C) 1.000.000
- D) 100.000
- E) 151.200

**Resposta:** C

**Explicação:** Cada posição tem 10 opções: 10^6 = 1.000.000.

### 13
Em uma reunião com 7 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 28
- B) 14
- C) 42
- D) 49
- E) 21

**Resposta:** E

**Explicação:** Cada aperto envolve um par de pessoas: C(7, 2) = 7·6/2 = 21.

### 14
De uma cidade A a uma cidade B há 5 estradas, e de B a C há 3 estradas. Também há 2 estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?

- A) 21
- B) 17
- C) 30
- D) 15
- E) 10

**Resposta:** B

**Explicação:** Passando por B: 5 × 3 = 15. Direto: 2. Total: 17 (soma porque são caminhos alternativos).

### 15
Pedro tem 2 camisetas, 3 calças e 3 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 8
- B) 18
- C) 9
- D) 15
- E) 36

**Resposta:** B

**Explicação:** Princípio multiplicativo: 2 × 3 × 3 = 18.

### 16
Quantos anagramas tem a palavra MUNDO?

- A) 24
- B) 60
- C) 25
- D) 125
- E) 120

**Resposta:** E

**Explicação:** MUNDO tem 5 letras distintas: 5! = 120 anagramas.

### 17
Em uma reunião com 30 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 60
- B) 870
- C) 900
- D) 435
- E) 465

**Resposta:** D

**Explicação:** Cada aperto envolve um par de pessoas: C(30, 2) = 30·29/2 = 435.

### 18
De uma cidade A a uma cidade B há 3 estradas, e de B a C há 5 estradas. Também há 4 estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?

- A) 12
- B) 19
- C) 60
- D) 15
- E) 35

**Resposta:** B

**Explicação:** Passando por B: 3 × 5 = 15. Direto: 4. Total: 19 (soma porque são caminhos alternativos).

### 19
Caio tem 6 camisetas, 2 calças e 5 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 13
- B) 40
- C) 60
- D) 17
- E) 120

**Resposta:** C

**Explicação:** Princípio multiplicativo: 6 × 2 × 5 = 60.

### 20
Em uma reunião com 13 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 169
- B) 78
- C) 156
- D) 91
- E) 26

**Resposta:** B

**Explicação:** Cada aperto envolve um par de pessoas: C(13, 2) = 13·12/2 = 78.

## Médio

### 1
De quantas maneiras é possível escolher uma comissão de 4 pessoas entre 7 candidatos?

- A) 37
- B) 28
- C) 70
- D) 35
- E) 840

**Resposta:** D

**Explicação:** A ordem não importa (combinação): C(7, 4) = 7!/(4!·3!) = 35.

### 2
Quantos anagramas tem a palavra CASA?

- A) 6
- B) 36
- C) 24
- D) 14
- E) 12

**Resposta:** E

**Explicação:** Permutação com repetição: 4!/2! = 12.

### 3
Em uma corrida com 10 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 720
- B) 30
- C) 1.000
- D) 90
- E) 120

**Resposta:** A

**Explicação:** A ordem importa (arranjo): 10 × 9 × 8 = 720.

### 4
Quantos anagramas da palavra PROVA começam por vogal?

- A) 120
- B) 48
- C) 72
- D) 12
- E) 24

**Resposta:** B

**Explicação:** PROVA tem 2 vogais para a 1ª posição; as 4 letras restantes permutam: 2 × 4! = 48.

### 5
Um sistema de códigos usa 3 letras (de um alfabeto de 26) seguidas de 4 algarismos (0 a 9), permitindo repetições. Quantos códigos diferentes existem?

- A) 118
- B) 351.520.000
- C) 78.624.000
- D) 175.760.000
- E) 78.364.164.096

**Resposta:** D

**Explicação:** Princípio multiplicativo: 26^3 × 10^4 = 17.576 × 10.000 = 175.760.000.

### 6
De quantas maneiras é possível escolher uma comissão de 3 pessoas entre 12 candidatos?

- A) 36
- B) 440
- C) 66
- D) 1.320
- E) 220

**Resposta:** E

**Explicação:** A ordem não importa (combinação): C(12, 3) = 12!/(3!·9!) = 220.

### 7
Quantos anagramas tem a palavra PAPAI?

- A) 24
- B) 15
- C) 120
- D) 30
- E) 60

**Resposta:** D

**Explicação:** Permutação com repetição: 5!/(2!·2!) = 30.

### 8
Em uma corrida com 16 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 4.096
- B) 240
- C) 560
- D) 48
- E) 3.360

**Resposta:** E

**Explicação:** A ordem importa (arranjo): 16 × 15 × 14 = 3360.

### 9
Um sistema de códigos usa 3 letras (de um alfabeto de 26) seguidas de 3 algarismos (0 a 9), permitindo repetições. Quantos códigos diferentes existem?

- A) 17.576.000
- B) 11.232.000
- C) 108
- D) 35.152.000
- E) 2.176.782.336

**Resposta:** A

**Explicação:** Princípio multiplicativo: 26^3 × 10^3 = 17.576 × 1.000 = 17.576.000.

### 10
De quantas maneiras é possível escolher uma comissão de 2 pessoas entre 13 candidatos?

- A) 26
- B) 78
- C) 13
- D) 80
- E) 156

**Resposta:** B

**Explicação:** A ordem não importa (combinação): C(13, 2) = 13!/(2!·11!) = 78.

### 11
Em uma corrida com 19 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 5.814
- B) 6.859
- C) 969
- D) 57
- E) 342

**Resposta:** A

**Explicação:** A ordem importa (arranjo): 19 × 18 × 17 = 5814.

### 12
Quantos anagramas da palavra ESTUDO começam por vogal?

- A) 360
- B) 358
- C) 120
- D) 720
- E) 72

**Resposta:** A

**Explicação:** ESTUDO tem 3 vogais para a 1ª posição; as 5 letras restantes permutam: 3 × 5! = 360.

### 13
Um sistema de códigos usa 3 letras (de um alfabeto de 26) seguidas de 2 algarismos (0 a 9), permitindo repetições. Quantos códigos diferentes existem?

- A) 1.757.600
- B) 98
- C) 1.404.000
- D) 3.515.200
- E) 60.466.176

**Resposta:** A

**Explicação:** Princípio multiplicativo: 26^3 × 10^2 = 17.576 × 100 = 1.757.600.

### 14
De quantas maneiras é possível escolher uma comissão de 3 pessoas entre 6 candidatos?

- A) 20
- B) 15
- C) 18
- D) 120
- E) 40

**Resposta:** A

**Explicação:** A ordem não importa (combinação): C(6, 3) = 6!/(3!·3!) = 20.

### 15
Quantos anagramas tem a palavra CARRO?

- A) 30
- B) 61
- C) 24
- D) 60
- E) 120

**Resposta:** D

**Explicação:** Permutação com repetição: 5!/2! = 60.

### 16
Em uma corrida com 20 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 380
- B) 6.840
- C) 8.000
- D) 60
- E) 1.140

**Resposta:** B

**Explicação:** A ordem importa (arranjo): 20 × 19 × 18 = 6840.

### 17
Um sistema de códigos usa 2 letras (de um alfabeto de 26) seguidas de 4 algarismos (0 a 9), permitindo repetições. Quantos códigos diferentes existem?

- A) 3.276.000
- B) 13.520.000
- C) 6.760.000
- D) 92
- E) 2.176.782.336

**Resposta:** C

**Explicação:** Princípio multiplicativo: 26^2 × 10^4 = 676 × 10.000 = 6.760.000.

### 18
De quantas maneiras é possível escolher uma comissão de 2 pessoas entre 6 candidatos?

- A) 12
- B) 30
- C) 6
- D) 15
- E) 45

**Resposta:** D

**Explicação:** A ordem não importa (combinação): C(6, 2) = 6!/(2!·4!) = 15.

### 19
Quantos anagramas tem a palavra BATATA?

- A) 60
- B) 720
- C) 120
- D) 30
- E) 63

**Resposta:** A

**Explicação:** Permutação com repetição: 6!/(3!·2!) = 60.

### 20
Em uma corrida com 7 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 210
- B) 21
- C) 343
- D) 42
- E) 35

**Resposta:** A

**Explicação:** A ordem importa (arranjo): 7 × 6 × 5 = 210.

## Difícil

### 1
Uma comissão de 4 pessoas será formada a partir de 6 homens e 5 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 330
- B) 450
- C) 25
- D) 300
- E) 150

**Resposta:** E

**Explicação:** Escolhemos 2 mulheres de 5: C(5,2) = 10; e 2 homens de 6: C(6,2) = 15. Total: 150.

### 2
De quantas maneiras 6 pessoas podem se sentar em uma fila de 6 cadeiras se duas delas, que são namorados, devem ficar sempre juntas?

- A) 48
- B) 120
- C) 240
- D) 720
- E) 480

**Resposta:** C

**Explicação:** Tratamos o casal como um bloco: 5 elementos permutam (5!) e o casal pode trocar de lugar entre si (×2): 2 × 120 = 240.

### 3
De quantas maneiras 4 pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)

- A) 16
- B) 12
- C) 6
- D) 24
- E) 2

**Resposta:** C

**Explicação:** Permutação circular: (n − 1)! = 3! = 6.

### 4
Quantas soluções inteiras não negativas tem a equação x + y + z = 9?

- A) 28
- B) 55
- C) 36
- D) 165
- E) 81

**Resposta:** B

**Explicação:** Por "bolas e barras": distribuímos 9 unidades entre 3 variáveis: C(9 + 2, 2) = C(11, 2) = 55.

### 5
Usando apenas os algarismos 1, 2, ..., 6, quantos números pares de três algarismos distintos podem ser formados?

- A) 120
- B) 59
- C) 30
- D) 108
- E) 60

**Resposta:** E

**Explicação:** A unidade deve ser par (3 opções); depois sobram 5 opções para a centena e 4 para a dezena: 3 × 5 × 4 = 60.

### 6
Uma comissão de 5 pessoas será formada a partir de 8 homens e 7 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 77
- B) 1.176
- C) 3.003
- D) 588
- E) 2.352

**Resposta:** B

**Explicação:** Escolhemos 2 mulheres de 7: C(7,2) = 21; e 3 homens de 8: C(8,3) = 56. Total: 1176.

### 7
De quantas maneiras 7 pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)

- A) 2.520
- B) 120
- C) 720
- D) 49
- E) 5.040

**Resposta:** C

**Explicação:** Permutação circular: (n − 1)! = 6! = 720.

### 8
Quantas soluções inteiras não negativas tem a equação x + y + z = 15?

- A) 91
- B) 225
- C) 105
- D) 680
- E) 136

**Resposta:** E

**Explicação:** Por "bolas e barras": distribuímos 15 unidades entre 3 variáveis: C(15 + 2, 2) = C(17, 2) = 136.

### 9
Usando apenas os algarismos 1, 2, ..., 7, quantos números pares de três algarismos distintos podem ser formados?

- A) 45
- B) 210
- C) 90
- D) 120
- E) 147

**Resposta:** C

**Explicação:** A unidade deve ser par (3 opções); depois sobram 6 opções para a centena e 5 para a dezena: 3 × 6 × 5 = 90.

### 10
Uma comissão de 4 pessoas será formada a partir de 7 homens e 4 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 252
- B) 210
- C) 27
- D) 330
- E) 126

**Resposta:** E

**Explicação:** Escolhemos 2 mulheres de 4: C(4,2) = 6; e 2 homens de 7: C(7,2) = 21. Total: 126.

### 11
De quantas maneiras 7 pessoas podem se sentar em uma fila de 7 cadeiras se duas delas, que são namorados, devem ficar sempre juntas?

- A) 240
- B) 720
- C) 1.440
- D) 3.600
- E) 5.040

**Resposta:** C

**Explicação:** Tratamos o casal como um bloco: 6 elementos permutam (6!) e o casal pode trocar de lugar entre si (×2): 2 × 720 = 1440.

### 12
Quantas soluções inteiras não negativas tem a equação x + y + z = 6?

- A) 10
- B) 36
- C) 15
- D) 56
- E) 28

**Resposta:** E

**Explicação:** Por "bolas e barras": distribuímos 6 unidades entre 3 variáveis: C(6 + 2, 2) = C(8, 2) = 28.

### 13
Uma comissão de 4 pessoas será formada a partir de 5 homens e 6 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 300
- B) 75
- C) 25
- D) 330
- E) 150

**Resposta:** E

**Explicação:** Escolhemos 2 mulheres de 6: C(6,2) = 15; e 2 homens de 5: C(5,2) = 10. Total: 150.

### 14
De quantas maneiras 6 pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)

- A) 360
- B) 720
- C) 24
- D) 36
- E) 120

**Resposta:** E

**Explicação:** Permutação circular: (n − 1)! = 5! = 120.

### 15
Usando apenas os algarismos 1, 2, ..., 5, quantos números pares de três algarismos distintos podem ser formados?

- A) 50
- B) 60
- C) 12
- D) 36
- E) 24

**Resposta:** E

**Explicação:** A unidade deve ser par (2 opções); depois sobram 4 opções para a centena e 3 para a dezena: 2 × 4 × 3 = 24.

### 16
Uma comissão de 4 pessoas será formada a partir de 6 homens e 6 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 450
- B) 30
- C) 113
- D) 495
- E) 225

**Resposta:** E

**Explicação:** Escolhemos 2 mulheres de 6: C(6,2) = 15; e 2 homens de 6: C(6,2) = 15. Total: 225.

### 17
De quantas maneiras 4 pessoas podem se sentar em uma fila de 4 cadeiras se duas delas, que são namorados, devem ficar sempre juntas?

- A) 24
- B) 13
- C) 4
- D) 12
- E) 6

**Resposta:** D

**Explicação:** Tratamos o casal como um bloco: 3 elementos permutam (3!) e o casal pode trocar de lugar entre si (×2): 2 × 6 = 12.

### 18
De quantas maneiras 5 pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)

- A) 6
- B) 120
- C) 60
- D) 24
- E) 25

**Resposta:** D

**Explicação:** Permutação circular: (n − 1)! = 4! = 24.

### 19
Quantas soluções inteiras não negativas tem a equação x + y + z = 14?

- A) 78
- B) 91
- C) 196
- D) 120
- E) 560

**Resposta:** D

**Explicação:** Por "bolas e barras": distribuímos 14 unidades entre 3 variáveis: C(14 + 2, 2) = C(16, 2) = 120.

### 20
Uma comissão de 4 pessoas será formada a partir de 4 homens e 5 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 60
- B) 126
- C) 16
- D) 10
- E) 120

**Resposta:** A

**Explicação:** Escolhemos 2 mulheres de 5: C(5,2) = 10; e 2 homens de 4: C(4,2) = 6. Total: 60.
