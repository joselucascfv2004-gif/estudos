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
<!-- modelo: f5 -->
De uma cidade A a uma cidade B há 2 estradas, e de B a C há 2 estradas. Também há 2 estradas que ligam A diretamente a C. De quantas maneiras é possível ir de A até C?

- A) 6
- B) 4
- C) 7
- D) 9
- E) 8

**Resposta:** A

**Explicação:** Ferramenta: multiplicar "e", somar "ou". Passar por B é uma etapa E outra (multiplica); ir direto é OUTRA opção (soma). 2 × 2 + 2 = 6.

### 2
<!-- modelo: f6 -->
Uma lanchonete monta combos com 1 sanduíche (6 opções) e 1 bebida (5 opções); a sobremesa é opcional (3 opções, ou nenhuma). Quantos combos diferentes podem ser montados?

- A) 91
- B) 90
- C) 33
- D) 14
- E) 120

**Resposta:** E

**Explicação:** Ferramenta: "não escolher" também é opção. Para a sobremesa existem 3 escolhas + a opção "sem sobremesa" = 4. 6 × 5 × 4 = 120.

### 3
<!-- modelo: f8 -->
Uma bandeira tem 3 faixas horizontais, e cada uma deve ser pintada com uma cor diferente, escolhida entre 5 cores disponíveis. Quantas bandeiras diferentes podem ser feitas?

- A) 120
- B) 15
- C) 125
- D) 60
- E) 10

**Resposta:** D

**Explicação:** Ferramenta: arranjo (a ordem importa). Trocar as cores de lugar gera outra bandeira: a ordem importa e não se repete cor. 5 × 4 × 3 = 60.

### 4
<!-- modelo: f9 -->
As bicicletas de um condomínio recebem um código com 2 letras (de 26) seguidas de 3 algarismos (0 a 9), podendo repetir. Quantos códigos diferentes existem?

- A) 82
- B) 60.466.176
- C) 676.000
- D) 1.560
- E) 67.600

**Resposta:** C

**Explicação:** Ferramenta: princípio multiplicativo. Cada posição é uma etapa com suas opções. 26² × 10³ = 676.000.

### 5
<!-- modelo: f1 -->
João tem 8 camisetas, 6 calças e 2 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 28
- B) 16
- C) 50
- D) 96
- E) 192

**Resposta:** D

**Explicação:** Ferramenta: princípio multiplicativo. Escolhas em etapas (uma E depois outra) se multiplicam. 8 × 6 × 2 = 96.

### 6
<!-- modelo: f1 -->
Lucas tem 5 camisetas, 4 calças e 4 pares de tênis. De quantas maneiras diferentes pode se vestir usando uma peça de cada tipo?

- A) 13
- B) 160
- C) 80
- D) 36
- E) 24

**Resposta:** C

**Explicação:** Ferramenta: princípio multiplicativo. Escolhas em etapas (uma E depois outra) se multiplicam. 5 × 4 × 4 = 80.

### 7
<!-- modelo: f2 -->
Quantos anagramas tem a palavra NOITE?

- A) 24
- B) 60
- C) 125
- D) 25
- E) 120

**Resposta:** E

**Explicação:** Ferramenta: permutação simples. Para a 1ª letra há 5 opções, para a 2ª, 4, e assim por diante: n!. 5! = 120.

### 8
<!-- modelo: f7 -->
Qual é o valor de 9!/6!?

- A) 504
- B) 252
- C) 3
- D) 6
- E) 54

**Resposta:** A

**Explicação:** Ferramenta: simplificar fatoriais. 9! = 9 × 8 × ... × 7 × 6!. O 6! cancela. 9 × 8 × 7 = 504.

### 9
<!-- modelo: f6 -->
Uma lanchonete monta combos com 1 sanduíche (6 opções) e 1 bebida (3 opções); a sobremesa é opcional (2 opções, ou nenhuma). Quantos combos diferentes podem ser montados?

- A) 36
- B) 37
- C) 54
- D) 11
- E) 20

**Resposta:** C

**Explicação:** Ferramenta: "não escolher" também é opção. Para a sobremesa existem 2 escolhas + a opção "sem sobremesa" = 3. 6 × 3 × 3 = 54.

### 10
<!-- modelo: f4 -->
Em uma reunião com 21 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 42
- B) 210
- C) 231
- D) 420
- E) 441

**Resposta:** B

**Explicação:** Ferramenta: combinação de 2. Um aperto é um par de pessoas; "A com B" é o mesmo que "B com A", então a ordem não importa. C(21, 2) = 21 × 20 ÷ 2 = 210.

### 11
<!-- modelo: f8 -->
Uma bandeira tem 3 faixas horizontais, e cada uma deve ser pintada com uma cor diferente, escolhida entre 4 cores disponíveis. Quantas bandeiras diferentes podem ser feitas?

- A) 27
- B) 64
- C) 12
- D) 24
- E) 4

**Resposta:** D

**Explicação:** Ferramenta: arranjo (a ordem importa). Trocar as cores de lugar gera outra bandeira: a ordem importa e não se repete cor. 4 × 3 × 2 = 24.

### 12
<!-- modelo: f2 -->
Quantos anagramas tem a palavra PEDRA?

- A) 120
- B) 60
- C) 25
- D) 24
- E) 125

**Resposta:** A

**Explicação:** Ferramenta: permutação simples. Para a 1ª letra há 5 opções, para a 2ª, 4, e assim por diante: n!. 5! = 120.

### 13
<!-- modelo: f4 -->
Em uma reunião com 5 pessoas, cada uma cumprimentou todas as outras com um aperto de mão, uma única vez. Quantos apertos de mão ocorreram?

- A) 20
- B) 11
- C) 10
- D) 15
- E) 25

**Resposta:** C

**Explicação:** Ferramenta: combinação de 2. Um aperto é um par de pessoas; "A com B" é o mesmo que "B com A", então a ordem não importa. C(5, 2) = 5 × 4 ÷ 2 = 10.

### 14
<!-- modelo: f10 -->
Em um campeonato com 13 times, cada time enfrenta todos os outros duas vezes (turno e returno, uma vez em casa e outra fora). Quantos jogos são disputados?

- A) 78
- B) 26
- C) 156
- D) 169
- E) 312

**Resposta:** C

**Explicação:** Ferramenta: pares ordenados. "A em casa contra B" é diferente de "B em casa contra A": a ordem importa. 13 × 12 = 156 jogos.

### 15
<!-- modelo: f3 -->
Quantas senhas de 4 dígitos (de 0 a 9) podem ser formadas, se for permitido repetir dígitos?

- A) 1.000
- B) 10.000
- C) 5.040
- D) 40
- E) 6.561

**Resposta:** B

**Explicação:** Ferramenta: princípio multiplicativo. Cada posição tem 10 opções, independentemente das outras. 10⁴ = 10.000.

### 16
<!-- modelo: f12 -->
Lançam-se 4 moedas e um dado comum. Quantos resultados diferentes são possíveis (considerando as moedas distintas)?

- A) 1.296
- B) 14
- C) 96
- D) 22
- E) 48

**Resposta:** C

**Explicação:** Ferramenta: princípio multiplicativo. Cada moeda tem 2 resultados e o dado, 6. 2⁴ × 6 = 96.

### 17
<!-- modelo: f11 -->
Quantos números de três algarismos existem com os três algarismos diferentes?

- A) 504
- B) 900
- C) 1.000
- D) 720
- E) 648

**Resposta:** E

**Explicação:** Ferramenta: princípio multiplicativo, começando pela casa com restrição. O primeiro algarismo não pode ser zero. 9 × 9 × 8 = 648.

## Médio

### 1
<!-- modelo: m8 -->
Há 9 pontos marcados sobre uma circunferência. Quantos triângulos diferentes podem ser formados com vértices nesses pontos?

- A) 504
- B) 84
- C) 27
- D) 36
- E) 168

**Resposta:** B

**Explicação:** Ferramenta: combinação de 3. Três pontos de uma circunferência nunca estão alinhados, e a ordem dos vértices não muda o triângulo. C(9, 3) = 9 × 8 × 7 ÷ 6 = 84.

### 2
<!-- modelo: m2 -->
Quantos anagramas tem a palavra PARALELA?

- A) 1.680
- B) 40.320
- C) 6.720
- D) 3.360
- E) 5.040

**Resposta:** D

**Explicação:** Ferramenta: permutação com repetição. Letras iguais trocadas entre si não geram anagrama novo; divida pelo fatorial de cada repetição. 8!/(3!·2!) = 3.360.

### 3
<!-- modelo: m10 -->
Há 7 acessórios para um carro disponíveis. Quantas escolhas diferentes existem, considerando que se pode escolher qualquer quantidade deles (inclusive nenhum)?

- A) 49
- B) 128
- C) 127
- D) 64
- E) 14

**Resposta:** B

**Explicação:** Ferramenta: sim ou não para cada item. Cada item tem duas possibilidades: entra ou não entra. 2⁷ = 128.

### 4
<!-- modelo: m3 -->
Em uma corrida com 7 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 35
- B) 42
- C) 210
- D) 343
- E) 21

**Resposta:** C

**Explicação:** Ferramenta: arranjo. No pódio a ordem importa (ouro ≠ prata). 7 × 6 × 5 = 210.

### 5
<!-- modelo: m6 -->
Uma pizzaria oferece 10 sabores. Quantas pizzas diferentes de 2 sabores (meio a meio, com sabores distintos) podem ser pedidas?

- A) 100
- B) 55
- C) 20
- D) 45
- E) 90

**Resposta:** D

**Explicação:** Ferramenta: combinação. "Calabresa com queijo" é a mesma pizza que "queijo com calabresa". C(10, 2) = 10 × 9 ÷ 2 = 45.

### 6
<!-- modelo: m7 -->
Na Mega-Sena, uma aposta simples tem 6 números. Uma aposta com 8 números equivale a quantas apostas simples?

- A) 48
- B) 57
- C) 20.160
- D) 2
- E) 28

**Resposta:** E

**Explicação:** Ferramenta: combinação. Cada grupo de 6 números escolhido entre os apostados é uma aposta simples; a ordem do sorteio não importa. C(8, 6) = 28.

### 7
<!-- modelo: m1 -->
De quantas maneiras é possível escolher uma comissão de 4 pessoas entre 6 candidatos?

- A) 24
- B) 30
- C) 15
- D) 20
- E) 360

**Resposta:** C

**Explicação:** Ferramenta: combinação. Numa comissão todos têm o mesmo papel: a ordem não importa. Calcule o arranjo e divida pelas k! ordens repetidas. C(6, 4) = 360 ÷ 4! = 15.

### 8
<!-- modelo: m5 -->
Um sistema de códigos usa 3 letras (de um alfabeto de 26) seguidas de 4 algarismos (0 a 9), sem repetir nenhuma letra nem nenhum algarismo. Quantos códigos diferentes existem?

- A) 175.760.000
- B) 20.640
- C) 78.624.000
- D) 546.000
- E) 118

**Resposta:** C

**Explicação:** Ferramenta: arranjo em cada bloco. Sem repetição, cada escolha tem uma opção a menos que a anterior. 26 × 25 × 24 × 10 × 9 × 8 × 7 = 78.624.000.

### 9
<!-- modelo: m8 -->
Há 6 pontos marcados sobre uma circunferência. Quantos triângulos diferentes podem ser formados com vértices nesses pontos?

- A) 15
- B) 18
- C) 40
- D) 20
- E) 120

**Resposta:** D

**Explicação:** Ferramenta: combinação de 3. Três pontos de uma circunferência nunca estão alinhados, e a ordem dos vértices não muda o triângulo. C(6, 3) = 6 × 5 × 4 ÷ 6 = 20.

### 10
<!-- modelo: m2 -->
Quantos anagramas tem a palavra CASA?

- A) 12
- B) 24
- C) 14
- D) 6
- E) 11

**Resposta:** A

**Explicação:** Ferramenta: permutação com repetição. Letras iguais trocadas entre si não geram anagrama novo; divida pelo fatorial de cada repetição. 4!/2! = 12.

### 11
<!-- modelo: m3 -->
Em uma corrida com 13 atletas, de quantas maneiras diferentes pode ser formado o pódio (1º, 2º e 3º lugares)?

- A) 156
- B) 286
- C) 2.197
- D) 1.716
- E) 39

**Resposta:** D

**Explicação:** Ferramenta: arranjo. No pódio a ordem importa (ouro ≠ prata). 13 × 12 × 11 = 1716.

### 12
<!-- modelo: m9 -->
Quantas senhas de 3 dígitos (0 a 9) podem ser criadas se não for permitido repetir dígitos?

- A) 120
- B) 30
- C) 720
- D) 504
- E) 1.000

**Resposta:** C

**Explicação:** Ferramenta: arranjo. Cada dígito usado sai da lista de opções. 10 × 9 × 8 = 720.

### 13
<!-- modelo: m4 -->
Quantos anagramas da palavra LIVRO começam por vogal?

- A) 48
- B) 24
- C) 120
- D) 12
- E) 72

**Resposta:** A

**Explicação:** Ferramenta: resolver a restrição primeiro. Preencha primeiro a posição que tem regra; o resto é livre. 2 vogais para a 1ª posição × 4! para as outras = 48.

### 14
<!-- modelo: m1 -->
De quantas maneiras é possível escolher uma comissão de 3 pessoas entre 15 candidatos?

- A) 45
- B) 910
- C) 105
- D) 455
- E) 2.730

**Resposta:** D

**Explicação:** Ferramenta: combinação. Numa comissão todos têm o mesmo papel: a ordem não importa. Calcule o arranjo e divida pelas k! ordens repetidas. C(15, 3) = 2730 ÷ 3! = 455.

### 15
<!-- modelo: m6 -->
Uma pizzaria oferece 12 sabores. Quantas pizzas diferentes de 2 sabores (meio a meio, com sabores distintos) podem ser pedidas?

- A) 66
- B) 144
- C) 132
- D) 78
- E) 24

**Resposta:** A

**Explicação:** Ferramenta: combinação. "Calabresa com queijo" é a mesma pizza que "queijo com calabresa". C(12, 2) = 12 × 11 ÷ 2 = 66.

### 16
<!-- modelo: m12 -->
Quantas diagonais tem um polígono convexo de 6 lados?

- A) 12
- B) 18
- C) 15
- D) 9
- E) 30

**Resposta:** D

**Explicação:** Ferramenta: diagonais = pares de vértices − lados. Cada par de vértices forma um lado ou uma diagonal. C(6, 2) − 6 = 15 − 6 = 9.

### 17
<!-- modelo: m11 -->
Numa grade de ruas, Thiago precisa andar 4 quarteirões para a direita e 4 para cima, sempre se aproximando do destino. Quantos caminhos diferentes existem?

- A) 16
- B) 8
- C) 40.320
- D) 70
- E) 256

**Resposta:** D

**Explicação:** Ferramenta: caminhos na grade = combinação (escolher quando ir para a direita). São 8 passos; basta escolher quais 4 serão para a direita. C(8, 4) = 70.

## Difícil

### 1
<!-- modelo: d2 -->
De quantas maneiras 8 pessoas podem se sentar em uma fila de 8 cadeiras se duas delas, que são irmãos, devem ficar sempre lado a lado?

- A) 30.240
- B) 40.320
- C) 1.440
- D) 5.040
- E) 10.080

**Resposta:** E

**Explicação:** Ferramenta: técnica do bloco. Cole os dois num "bloco": agora são n − 1 elementos. Depois, o bloco pode ter os dois em 2 ordens. 2 × 7! = 10080.

### 2
<!-- modelo: d8 -->
Uma estante vai receber 3 livros diferentes de Matemática e 4 livros diferentes de Português. De quantas maneiras eles podem ser organizados em fila, se os livros da mesma matéria devem ficar juntos?

- A) 5.040
- B) 30
- C) 288
- D) 144
- E) 10.080

**Resposta:** C

**Explicação:** Ferramenta: blocos dentro de blocos. Os dois blocos (Matemática e Português) podem trocar de ordem (2!). Dentro de cada bloco, os livros permutam. 2! × 3! × 4! = 2 × 6 × 24 = 288.

### 3
<!-- modelo: d10 -->
Usando os algarismos de 1 a 9, sem repetição, quantos números de 4 algarismos maiores que 6.000 podem ser formados?

- A) 1.344
- B) 3.024
- C) 1.008
- D) 2.916
- E) 224

**Resposta:** A

**Explicação:** Ferramenta: primeira casa com restrição. Para passar de 6.000, o milhar deve ser de 6 a 9 (4 opções; 6.000 exato não se forma, pois não há zero). Depois 8, 7 e 6 opções. 4 × 8 × 7 × 6 = 1.344.

### 4
<!-- modelo: d7 -->
Uma equipe de 3 pessoas será escolhida entre 6 homens e 3 mulheres. Quantas equipes têm PELO MENOS uma mulher?

- A) 66
- B) 45
- C) 64
- D) 84
- E) 20

**Resposta:** C

**Explicação:** Ferramenta: complementar. Contar "pelo menos uma" diretamente é trabalhoso. Conte tudo e tire as equipes sem mulher nenhuma. C(9, 3) − C(6, 3) = 84 − 20 = 64.

### 5
<!-- modelo: d2 -->
De quantas maneiras 5 pessoas podem se sentar em uma fila de 5 cadeiras se duas delas, que são irmãos, devem ficar sempre lado a lado?

- A) 120
- B) 48
- C) 12
- D) 72
- E) 24

**Resposta:** B

**Explicação:** Ferramenta: técnica do bloco. Cole os dois num "bloco": agora são n − 1 elementos. Depois, o bloco pode ter os dois em 2 ordens. 2 × 4! = 48.

### 6
<!-- modelo: d7 -->
Uma equipe de 4 pessoas será escolhida entre 8 homens e 4 mulheres. Quantas equipes têm PELO MENOS uma mulher?

- A) 425
- B) 70
- C) 224
- D) 495
- E) 660

**Resposta:** A

**Explicação:** Ferramenta: complementar. Contar "pelo menos uma" diretamente é trabalhoso. Conte tudo e tire as equipes sem mulher nenhuma. C(12, 4) − C(8, 4) = 495 − 70 = 425.

### 7
<!-- modelo: d4 -->
Quantas soluções inteiras não negativas tem a equação x + y + z = 15?

- A) 91
- B) 136
- C) 680
- D) 105
- E) 225

**Resposta:** B

**Explicação:** Ferramenta: bolas e barras. Imagine 15 bolinhas e 2 barras separando-as em 3 grupos: basta escolher a posição das 2 barras entre 17 lugares. C(17, 2) = 136.

### 8
<!-- modelo: d6 -->
Em um bairro com ruas em forma de grade, uma pessoa precisa andar 5 quarteirões para o leste e 4 para o norte, sempre se aproximando do destino. Quantos caminhos diferentes ela pode fazer?

- A) 252
- B) 362.880
- C) 126
- D) 512
- E) 20

**Resposta:** C

**Explicação:** Ferramenta: anagramas de L e N. Todo caminho é uma sequência de 5 letras L e 4 letras N. Contar caminhos = contar anagramas. 9!/(5! · 4!) = 126.

### 9
<!-- modelo: d1 -->
Uma comissão de 4 pessoas será formada a partir de 5 homens e 7 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 210
- B) 495
- C) 420
- D) 105
- E) 31

**Resposta:** A

**Explicação:** Ferramenta: combinação em grupos. Escolha as mulheres E os homens separadamente e multiplique. C(7, 2) × C(5, 2) = 21 × 10 = 210.

### 10
<!-- modelo: d5 -->
Usando apenas os algarismos 1, 2, ..., 7, quantos números pares de três algarismos distintos podem ser formados?

- A) 147
- B) 210
- C) 90
- D) 120
- E) 45

**Resposta:** C

**Explicação:** Ferramenta: começar pela restrição. A unidade precisa ser par (3 opções). Depois: 6 para a centena e 5 para a dezena. 3 × 6 × 5 = 90.

### 11
<!-- modelo: d9 -->
De quantas maneiras 6 balas iguais podem ser distribuídas entre 3 crianças, de modo que cada criança receba pelo menos uma bala?

- A) 729
- B) 28
- C) 20
- D) 10
- E) 18

**Resposta:** D

**Explicação:** Ferramenta: bolas e barras com mínimo. Dê primeiro 1 bala a cada criança; sobram 3 para distribuir livremente. C(3 + 2, 2) = C(5, 2) = 10.

### 12
<!-- modelo: d3 -->
De quantas maneiras 6 pessoas podem se sentar ao redor de uma mesa circular? (Disposições que diferem apenas por rotação são consideradas iguais.)

- A) 720
- B) 24
- C) 120
- D) 360
- E) 36

**Resposta:** C

**Explicação:** Ferramenta: permutação circular. Fixe uma pessoa (para eliminar as rotações) e permute as outras. (6 − 1)! = 120.

### 13
<!-- modelo: d6 -->
Em um bairro com ruas em forma de grade, uma pessoa precisa andar 6 quarteirões para o leste e 5 para o norte, sempre se aproximando do destino. Quantos caminhos diferentes ela pode fazer?

- A) 462
- B) 30
- C) 2.048
- D) 39.916.800
- E) 924

**Resposta:** A

**Explicação:** Ferramenta: anagramas de L e N. Todo caminho é uma sequência de 6 letras L e 5 letras N. Contar caminhos = contar anagramas. 11!/(6! · 5!) = 462.

### 14
<!-- modelo: d1 -->
Uma comissão de 4 pessoas será formada a partir de 7 homens e 5 mulheres. Quantas comissões diferentes têm exatamente 2 mulheres?

- A) 350
- B) 495
- C) 420
- D) 210
- E) 31

**Resposta:** D

**Explicação:** Ferramenta: combinação em grupos. Escolha as mulheres E os homens separadamente e multiplique. C(5, 2) × C(7, 2) = 10 × 21 = 210.

### 15
<!-- modelo: d12 -->
De um grupo de 9 pessoas será formada uma comissão de 4. Duas delas, Ana e Bruno, não aceitam participar juntas. Quantas comissões são possíveis?

- A) 126
- B) 105
- C) 35
- D) 21
- E) 91

**Resposta:** B

**Explicação:** Ferramenta: complementar: total − comissões com os dois. Com Ana e Bruno juntos, faltam escolher 2 entre 7: C(7, 2). C(9, 4) − C(7, 2) = 126 − 21 = 105.

### 16
<!-- modelo: d11 -->
De quantas maneiras 6 pessoas podem se sentar em fila se duas delas (que brigaram) não podem ficar lado a lado?

- A) 480
- B) 24
- C) 240
- D) 600
- E) 720

**Resposta:** A

**Explicação:** Ferramenta: complementar + técnica do bloco. Total: 6! = 720. Juntas: trate as duas como um bloco (5! arrumações × 2 ordens) = 240. 720 − 240 = 480.
