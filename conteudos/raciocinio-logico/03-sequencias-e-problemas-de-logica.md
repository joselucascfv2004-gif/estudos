---
titulo: Sequências e problemas de lógica
provas: Concursos, Militares
descricao: Sequências numéricas e de letras, padrões cíclicos, calendários, relógios e problemas de verdade e mentira.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Sequências e problemas de lógica

Sequências numéricas e de letras, padrões cíclicos, calendários, relógios e problemas de verdade e mentira.

## Resumo

- **Sequências:** procure o padrão nas diferenças, nos quocientes, nas posições pares e ímpares ou em ciclos (letras, dias da semana, figuras).
- **Ciclos:** para achar o termo n de um padrão que se repete a cada k termos, use o **resto** de n ÷ k.
- **Calendário:** 7 dias depois cai no mesmo dia da semana; um ano comum avança 1 dia da semana, e um bissexto avança 2.
- **Problemas de associação** (quem é quem): monte uma tabela com ✔ e ✘ e vá eliminando.
- **Verdades e mentiras:** suponha que alguém diz a verdade e veja se aparece contradição.
- **Princípio da casa dos pombos:** com n caixas e n + 1 objetos, alguma caixa terá pelo menos 2.

## Fácil

### 1
<!-- modelo: f3 -->
Na sequência AZULAZULAZUL... (o bloco "AZUL" se repete indefinidamente), qual é a 100ª letra?

- A) Z
- B) U
- C) L
- D) A
- E) E

**Resposta:** C

**Explicação:** Ferramenta: padrão cíclico (resto da divisão). O bloco tem 4 letras. 100 ÷ 4 deixa resto 0 — corresponde à 4ª letra do bloco: L.

### 2
<!-- modelo: f6 -->
Hoje é domingo. Que dia da semana será daqui a 256 dias?

- A) domingo
- B) quinta-feira
- C) segunda-feira
- D) quarta-feira
- E) terça-feira

**Resposta:** B

**Explicação:** Ferramenta: resto da divisão por 7. A semana se repete a cada 7 dias; só o resto importa. 256 = 7 × 36 + 4: avança 4 dias a partir de domingo: quinta-feira.

### 3
<!-- modelo: f2 -->
Considerando o alfabeto de 26 letras (A a Z), qual letra continua a sequência D, H, L, P, ...?

- A) U
- B) X
- C) T
- D) S
- E) V

**Resposta:** C

**Explicação:** Ferramenta: sequência de letras. As letras avançam de 4 em 4 posições no alfabeto: depois de P vem T.

### 4
<!-- modelo: f7 -->
Uma sequência de figuras é feita com palitos formando pentágonos lado a lado: a 1ª figura usa 5 palitos, a 2ª usa 9 e a 3ª usa 13, e assim por diante. Quantos palitos terá a 49ª figura?

- A) 196
- B) 245
- C) 201
- D) 199
- E) 197

**Resposta:** E

**Explicação:** Ferramenta: progressão aritmética (aₙ = a₁ + (n − 1)·r). Cada figura nova acrescenta 4 palitos. aₙ = 5 + (49 − 1) × 4 = 197.

### 5
<!-- modelo: f1 -->
Qual é o próximo termo da sequência 9, 16, 25, 36, 49, ...?

- A) 66
- B) 98
- C) 64
- D) 63
- E) 65

**Resposta:** C

**Explicação:** Ferramenta: descobrir o padrão. Padrão: quadrados perfeitos: 3², 4², .... Próximo termo: 64.

### 6
<!-- modelo: f3 -->
Na sequência XYZWXYZWXYZW... (o bloco "XYZW" se repete indefinidamente), qual é a 181ª letra?

- A) Y
- B) W
- C) E
- D) X
- E) Z

**Resposta:** D

**Explicação:** Ferramenta: padrão cíclico (resto da divisão). O bloco tem 4 letras. 181 ÷ 4 deixa resto 1 — corresponde à 1ª letra do bloco: X.

### 7
<!-- modelo: f1 -->
Qual é o próximo termo da sequência 5, 11, 23, 47, 95, ...?

- A) 193
- B) 192
- C) 191
- D) 190
- E) 201

**Resposta:** C

**Explicação:** Ferramenta: descobrir o padrão. Padrão: cada termo é o dobro do anterior mais 1. Próximo termo: 191.

### 8
<!-- modelo: f2 -->
Considerando o alfabeto de 26 letras (A a Z), qual letra continua a sequência C, F, I, L, ...?

- A) O
- B) R
- C) N
- D) P
- E) Q

**Resposta:** A

**Explicação:** Ferramenta: sequência de letras. As letras avançam de 3 em 3 posições no alfabeto: depois de L vem O.

### 9
<!-- modelo: f5 -->
Qual número substitui o "?" na sequência 18, ?, 32, 39, 46?

- A) 27
- B) 25
- C) 24
- D) 36
- E) 26

**Resposta:** B

**Explicação:** Ferramenta: descobrir a regra olhando os vizinhos. Compare termos conhecidos vizinhos: a diferença (soma) ou a razão (multiplicação) se repete. Regra: cada termo é o anterior mais 7. O termo que falta é 25.

### 10
<!-- modelo: f4 -->
Qual é o menor ângulo formado pelos ponteiros de um relógio às 8h?

- A) 105°
- B) 135°
- C) 240°
- D) 150°
- E) 120°

**Resposta:** E

**Explicação:** Ferramenta: ângulo dos ponteiros. Ângulo = |30·h − 5,5·m| = |30·8 − 5,5·0| = 240°; o menor é 360° − 240° = 120°.

### 11
<!-- modelo: f9 -->
Qual letra continua a sequência D, G, J, M, …? (alfabeto de 26 letras, com K, W e Y)

- A) O
- B) Q
- C) N
- D) S
- E) P

**Resposta:** E

**Explicação:** Ferramenta: posição no alfabeto. As letras avançam de 3 em 3 posições. Depois de M, vem P.

### 12
<!-- modelo: f12 -->
A sequência 2, 5, 10, 13, 26, 29, … alterna duas operações. Qual é o próximo termo?

- A) 32
- B) 58
- C) 116
- D) 87
- E) 61

**Resposta:** B

**Explicação:** Ferramenta: separe as passagens ímpares e pares. Alterna "+ 3" e "× 2". A próxima passagem é "× 2": 29 × 2 = 58.

### 13
<!-- modelo: f13 -->
Uma fila repete sempre a ordem ▲, ●, ■, ▲, ●, ■, … Qual elemento ocupa a 38ª posição?

- A) o primeiro da fila
- B) ▲
- C) não é possível saber
- D) ●
- E) ■

**Resposta:** D

**Explicação:** Ferramenta: ciclo: use o resto da divisão. O ciclo tem 3 elementos; 38 ÷ 3 deixa resto 2. Posição 38: ●.

### 14
<!-- modelo: f14 -->
Sofia tem o dobro da idade do irmão. A soma das idades dos dois é 45 anos. Quantos anos tem o irmão?

- A) 13
- B) 45
- C) 15
- D) 30
- E) 17

**Resposta:** C

**Explicação:** Ferramenta: escolher bem a incógnita. Irmão = x; Sofia = 2x. Então x + 2x = 45. 3x = 45 → x = 15.

### 15
<!-- modelo: f8 -->
Qual é o próximo termo da sequência 2, 6, 18, 54, 162, …?

- A) 1.458
- B) 648
- C) 165
- D) 270
- E) 486

**Resposta:** E

**Explicação:** Ferramenta: teste os quocientes. Cada termo é o anterior vezes 3. 162 × 3 = 486.

### 16
<!-- modelo: f10 -->
Na sequência 3, 1, 4, 5, 9, 14, …, cada termo segue a mesma regra a partir do 3º. Qual é o próximo termo?

- A) 46
- B) 23
- C) 19
- D) 28
- E) 24

**Resposta:** B

**Explicação:** Ferramenta: cada termo = soma dos dois anteriores (tipo Fibonacci). 4 = 3 + 1, 5 = 1 + 4… 9 + 14 = 23.

### 17
<!-- modelo: f11 -->
Qual é o próximo termo da sequência 16, 25, 36, 49, 64, …?

- A) 128
- B) 81
- C) 82
- D) 79
- E) 74

**Resposta:** B

**Explicação:** Ferramenta: quadrados perfeitos. São 4², 5², 6²… 9² = 81.

## Médio

### 1
<!-- modelo: m7 -->
Um relógio atrasa 5 minutos a cada hora. Ele foi acertado às 08h00. Que horário ele marcará quando forem, na verdade, 15h00?

- A) 14h20
- B) 15h35
- C) 14h30
- D) 15h00
- E) 14h25

**Resposta:** E

**Explicação:** Ferramenta: erro por hora × número de horas. Em 7 horas, o erro acumulado é 7 × 5 = 35 minutos a menos. 15h00 − 35 min = 14h25.

### 2
<!-- modelo: m5 -->
Quantos algarismos são usados para numerar as páginas de um livro da página 1 até a página 212?

- A) 636
- B) 433
- C) 531
- D) 528
- E) 519

**Resposta:** D

**Explicação:** Ferramenta: separar por quantidade de algarismos. Páginas 1 a 9 usam 1 algarismo cada; 10 a 99, 2 algarismos; de 100 em diante, 3. 9 × 1 + 90 × 2 + 113 × 3 = 9 + 180 + 339 = 528.

### 3
<!-- modelo: m1 -->
Qual é o próximo termo da sequência 4, 5, 7, 10, 14, 19, ...?

- A) 25
- B) 23
- C) 26
- D) 24
- E) 28

**Resposta:** A

**Explicação:** Ferramenta: diferenças crescentes. As diferenças entre termos consecutivos (1, 2, 3, 4, 5) aumentam 1 a cada passo. A próxima diferença é 6: 19 + 6 = 25.

### 4
<!-- modelo: m3 -->
Em determinado ano, 1º de janeiro caiu em uma terça-feira. Em que dia da semana caiu o 1º de dezembro (ano não bissexto)?

- A) quarta-feira
- B) domingo
- C) quinta-feira
- D) segunda-feira
- E) terça-feira

**Resposta:** B

**Explicação:** Ferramenta: calendário (resto por 7). De 1º de janeiro até o 1º de dezembro passam 334 dias. 334 = 7 × 47 + 5: avançamos 5 dias a partir de terça-feira: domingo.

### 5
<!-- modelo: m1 -->
Qual é o próximo termo da sequência 2, 3, 6, 11, 18, 27, ...?

- A) 35
- B) 40
- C) 36
- D) 38
- E) 39

**Resposta:** D

**Explicação:** Ferramenta: diferenças crescentes. As diferenças entre termos consecutivos (1, 3, 5, 7, 9) aumentam 2 a cada passo. A próxima diferença é 11: 27 + 11 = 38.

### 6
<!-- modelo: m2 -->
Qual é o próximo termo da sequência 7, 22, 10, 17, 13, 12, 16, ...?

- A) 10
- B) 7
- C) 19
- D) 12
- E) 2

**Resposta:** B

**Explicação:** Ferramenta: sequências intercaladas. São duas sequências intercaladas: posições ímpares (7, 10, ...) crescem 3; posições pares (22, 17, ...) diminuem 5. O 8º termo é da sequência par: 7.

### 7
<!-- modelo: m3 -->
Em determinado ano, 1º de janeiro caiu em um domingo. Em que dia da semana caiu o 1º de maio (ano não bissexto)?

- A) quinta-feira
- B) terça-feira
- C) quarta-feira
- D) segunda-feira
- E) domingo

**Resposta:** D

**Explicação:** Ferramenta: calendário (resto por 7). De 1º de janeiro até o 1º de maio passam 120 dias. 120 = 7 × 17 + 1: avançamos 1 dia a partir de domingo: segunda-feira.

### 8
<!-- modelo: m6 -->
Qual é o próximo termo da sequência 1, 8, 27, 64, 125, ...?

- A) 216
- B) 250
- C) 186
- D) 217
- E) 215

**Resposta:** A

**Explicação:** Ferramenta: testar regras simples (somar, multiplicar, potências). Se as diferenças não se repetem, teste razões, potências ou duas operações alternadas. Regra: cubos perfeitos (1³, 2³, 3³, ...). Próximo termo: 216.

### 9
<!-- modelo: m2 -->
Qual é o próximo termo da sequência 4, 30, 7, 27, 10, 24, 13, ...?

- A) 21
- B) 18
- C) 16
- D) 24
- E) 31

**Resposta:** A

**Explicação:** Ferramenta: sequências intercaladas. São duas sequências intercaladas: posições ímpares (4, 7, ...) crescem 3; posições pares (30, 27, ...) diminuem 3. O 8º termo é da sequência par: 21.

### 10
<!-- modelo: m4 -->
Quantos números inteiros de 1 a 1000 possuem pelo menos um algarismo 7?

- A) 270
- B) 272
- C) 100
- D) 271
- E) 281

**Resposta:** D

**Explicação:** Ferramenta: contagem pelo complementar. Contando pelo complementar: números sem o algarismo 7 entre 1 e 1000 são 729; logo 1000 − 729 = 271 possuem algum 7.

### 11
<!-- modelo: m10 -->
O dia 10 de março de um ano caiu num sábado. Até o próximo 10 de março passam 366 dias (há um 29 de fevereiro no caminho). Em que dia da semana cairá o próximo 10 de março?

- A) terça-feira
- B) quarta-feira
- C) domingo
- D) segunda-feira
- E) quinta-feira

**Resposta:** D

**Explicação:** Ferramenta: cada 7 dias o dia da semana se repete. São 366 dias = 52 semanas + 2 dias: o dia da semana avança 2. sábado → segunda-feira.

### 12
<!-- modelo: m9 -->
Qual é o menor ângulo formado pelos ponteiros de um relógio às 7h30?

- A) 210°
- B) 30°
- C) 60°
- D) 315°
- E) 45°

**Resposta:** E

**Explicação:** Ferramenta: ponteiro das horas anda 0,5° por minuto. Horas: 30° × 7 + 0,5° × 30 = 225°; minutos: 6° × 30 = 180°. Diferença: 45°.

### 13
<!-- modelo: m8 -->
Qual é o próximo termo da sequência 3, 5, 10, 18, 29, 43, …?

- A) 86
- B) 60
- C) 57
- D) 63
- E) 59

**Resposta:** B

**Explicação:** Ferramenta: diferenças das diferenças. As diferenças são 2, 5, 8, 11, 14: crescem de 3 em 3. Próxima diferença: 17; termo: 60.

### 14
<!-- modelo: m12 -->
Marcos, Felipe e Gabriela usam camisas de cores diferentes: vermelho, azul e verde. Marcos não usa vermelho nem azul. Felipe não usa vermelho. Qual é a cor da camisa de Gabriela?

- A) vermelho
- B) não é possível saber
- C) verde
- D) azul
- E) amarelo

**Resposta:** A

**Explicação:** Ferramenta: tabela de associação. Marcos só pode usar verde. Sobram vermelho e azul; como Felipe não usa vermelho, usa azul. Gabriela usa vermelho.

### 15
<!-- modelo: m14 -->
Num ano não bissexto, o dia 1º de fevereiro caiu numa sexta-feira. Em que dia da semana caiu 1º de março?

- A) terça-feira
- B) quarta-feira
- C) domingo
- D) sexta-feira
- E) segunda-feira

**Resposta:** D

**Explicação:** Ferramenta: conte os dias de fevereiro. Fevereiro tem 28 dias = exatamente 4 semanas. 1º de março: sexta-feira.

### 16
<!-- modelo: m13 -->
Num campeonato com 20 times, cada time joga contra cada um dos outros duas vezes (turno e returno). Quantos jogos há no total?

- A) 40
- B) 400
- C) 190
- D) 570
- E) 380

**Resposta:** E

**Explicação:** Ferramenta: cada jogo é um par de times. Pares possíveis: C(20, 2) = 190, jogados duas vezes. Total: 380 jogos.

### 17
<!-- modelo: m11 -->
Um vaso quebrou. Otávio: "Não fui eu." Lucas: "Foi Otávio." Júlia: "Não foi Lucas." Sabe-se que só UM deles diz a verdade. Quem quebrou o vaso?

- A) Lucas
- B) Otávio
- C) não é possível saber
- D) Júlia
- E) ninguém

**Resposta:** A

**Explicação:** Ferramenta: procure afirmações contraditórias. Otávio e Lucas se contradizem: exatamente um deles diz a verdade. Como só há uma verdade, Júlia mente, e então foi Lucas. Conferindo: Otávio diz a verdade; Lucas e Júlia mentem.

## Difícil

### 1
<!-- modelo: d1 -->
Um vaso foi quebrado e um dos três amigos — Carla, Elisa, Ana — foi o responsável. Carla disse: "Não foi Elisa." Elisa disse: "Não foi Carla." Ana disse: "Não foi Elisa." Sabendo que exatamente um deles disse a verdade, quem quebrou o vaso?

- A) Não é possível determinar
- B) Elisa
- C) Ana
- D) Mais de um deles
- E) Carla

**Resposta:** B

**Explicação:** Ferramenta: testar hipóteses (verdade e mentira). Testando cada suspeito como culpado e contando quantas falas ficam verdadeiras, apenas com Elisa temos exatamente 1 fala verdadeira.

### 2
<!-- modelo: d4 -->
Uma gaveta tem meias de 2 cores diferentes (12 de cada cor), todas misturadas. Quantas meias, no mínimo, devem ser retiradas no escuro para garantir um par da mesma cor?

- A) 3
- B) 12
- C) 5
- D) 13
- E) 2

**Resposta:** A

**Explicação:** Ferramenta: casa dos pombos. Princípio da casa dos pombos: no pior caso, as 2 primeiras meias são de cores diferentes; a 3ª obrigatoriamente repete uma cor.

### 3
<!-- modelo: d5 -->
Em uma ilha, cada habitante ou sempre diz a verdade ou sempre mente. Diego e Ana moram nessa ilha. Diego diz: "Nós dois somos mentirosos." Então:

- A) Diego diz a verdade e Ana mente
- B) Não é possível determinar
- C) Diego diz a verdade e Ana diz a verdade
- D) Diego mente e Ana diz a verdade
- E) Diego mente e Ana mente

**Resposta:** D

**Explicação:** Ferramenta: testar hipóteses. Suponha um caso (por exemplo, que Diego diz a verdade) e veja se as falas ficam coerentes. Hipótese que gera contradição é descartada. Dos 4 casos possíveis, só "Diego mente e Ana diz a verdade" deixa todas as falas coerentes.

### 4
<!-- modelo: d2 -->
Qual é o menor ângulo formado pelos ponteiros das horas e dos minutos às 5h15?

- A) 67,5°
- B) 70°
- C) 292,5°
- D) 62,5°
- E) 60°

**Resposta:** A

**Explicação:** Ferramenta: ângulo dos ponteiros (minutos quebrados). O ponteiro das horas anda 0,5° por minuto. Ângulo = |30·h − 5,5·m| = |150 − 82,5| = 67,5°.

### 5
<!-- modelo: d2 -->
Qual é o menor ângulo formado pelos ponteiros das horas e dos minutos às 3h20?

- A) 22,5°
- B) 340°
- C) 30°
- D) 15°
- E) 20°

**Resposta:** E

**Explicação:** Ferramenta: ângulo dos ponteiros (minutos quebrados). O ponteiro das horas anda 0,5° por minuto. Ângulo = |30·h − 5,5·m| = |90 − 110| = 20°.

### 6
<!-- modelo: d1 -->
Um vaso foi quebrado e um dos três amigos — Carla, Diego, Ana — foi o responsável. Carla disse: "Não foi Diego." Diego disse: "Não fui eu." Ana disse: "Não fui eu." Sabendo que exatamente um deles disse a verdade, quem quebrou o vaso?

- A) Diego
- B) Não é possível determinar
- C) Ana
- D) Carla
- E) Mais de um deles

**Resposta:** A

**Explicação:** Ferramenta: testar hipóteses (verdade e mentira). Testando cada suspeito como culpado e contando quantas falas ficam verdadeiras, apenas com Diego temos exatamente 1 fala verdadeira.

### 7
<!-- modelo: d3 -->
Bia, Ana e Davi trabalham em áreas diferentes: saúde, engenharia e educação (cada um em uma). Sabe-se que: Bia não trabalha com educação nem com saúde. Davi não trabalha com educação. Com que área Bia trabalha?

- A) Não é possível determinar
- B) Engenharia
- C) Educação
- D) Direito
- E) Saúde

**Resposta:** B

**Explicação:** Ferramenta: tabela de associação. Pela 1ª pista, Bia trabalha com engenharia. Sobram educação e saúde; como Davi não trabalha com educação, Davi fica com saúde e Ana com educação.

### 8
<!-- modelo: d6 -->
Cinco amigos — Ana, Gabi, Diego, Bruno, Carla — disputaram uma corrida, sem empates. Sabe-se que: Gabi chegou imediatamente depois de Ana. Ana chegou imediatamente depois de Carla. Bruno chegou imediatamente depois de Gabi. Diego chegou imediatamente antes de Carla. Quem chegou em 4º lugar?

- A) Carla
- B) Ana
- C) Diego
- D) Gabi
- E) Bruno

**Resposta:** D

**Explicação:** Ferramenta: montar uma fila com as pistas. Junte as pistas como peças de dominó: cada uma liga dois vizinhos. Comece por quem não chega "depois" de ninguém. Ordem: Diego → Carla → Ana → Gabi → Bruno. 4º lugar: Gabi.

### 9
<!-- modelo: d7 -->
Uma caixa tem 6 bolas vermelhas, 3 azuis e 3 verdes. Retirando bolas no escuro, quantas, no mínimo, devem ser retiradas para garantir pelo menos uma bola de cada cor?

- A) 3
- B) 10
- C) 4
- D) 9
- E) 7

**Resposta:** B

**Explicação:** Ferramenta: pensar no pior caso (azar total). No pior caso, você tira primeiro TODAS as bolas das duas cores mais numerosas. 9 bolas sem a cor mais rara; a próxima garante as três cores: 10.

### 10
<!-- modelo: d3 -->
Eva, Davi e Caio trabalham em áreas diferentes: saúde, engenharia e educação (cada um em uma). Sabe-se que: Eva não trabalha com educação nem com engenharia. Caio não trabalha com educação. Com que área Caio trabalha?

- A) Direito
- B) Saúde
- C) Educação
- D) Engenharia
- E) Não é possível determinar

**Resposta:** D

**Explicação:** Ferramenta: tabela de associação. Pela 1ª pista, Eva trabalha com saúde. Sobram educação e engenharia; como Caio não trabalha com educação, Caio fica com engenharia e Davi com educação.

### 11
<!-- modelo: d11 -->
Numa reunião, cada pessoa apertou a mão de cada uma das outras exatamente uma vez, num total de 45 apertos de mão. Quantas pessoas estavam na reunião?

- A) 8
- B) 11
- C) 9
- D) 10
- E) 7

**Resposta:** D

**Explicação:** Ferramenta: apertos = C(n, 2) = n(n − 1)/2. n(n − 1) = 90. 10 × 9 = 90 → n = 10.

### 12
<!-- modelo: d10 -->
Hoje, a idade de um pai é 3 vezes a do filho, e a soma das duas é 32. Daqui a 5 anos, qual será a soma das idades?

- A) 52
- B) 42
- C) 32
- D) 58
- E) 37

**Resposta:** B

**Explicação:** Ferramenta: cada pessoa envelhece o mesmo tanto. Os dois ganham 5 anos cada: a soma aumenta 10. 32 + 10 = 42.

### 13
<!-- modelo: d9 -->
Quantos quadrados de todos os tamanhos existem num tabuleiro quadriculado de 4 × 4?

- A) 29
- B) 17
- C) 30
- D) 16
- E) 32

**Resposta:** C

**Explicação:** Ferramenta: some os quadrados de cada tamanho. De lado 1 há 4², de lado 2 há 3², …, de lado 4 há 1. 16 + 9 + 4 + 1 = 30.

### 14
<!-- modelo: d13 -->
Escrevendo todos os números de 1 a 100, quantas vezes o algarismo 1 aparece?

- A) 20
- B) 11
- C) 10
- D) 19
- E) 21

**Resposta:** E

**Explicação:** Ferramenta: conte por posição (unidades e dezenas). Nas unidades, o 1 aparece 10 vezes; nas dezenas, mais 10 (de 10 a 19), e ainda há o 1 do 100. Total: 21.

### 15
<!-- modelo: d8 -->
Na sequência de termo geral aₙ = n² + 1 (2, 5, 10, 17, …), qual é a posição do termo 401?

- A) 20
- B) 21
- C) 19
- D) 18
- E) 400

**Resposta:** A

**Explicação:** Ferramenta: igualar ao termo geral e isolar n. n² + 1 = 401 → n² = 400. n = 20.

### 16
<!-- modelo: d12 -->
Na Torre de Hanói, o número mínimo de movimentos para transferir n discos é 2ⁿ − 1. Quantos movimentos são necessários, no mínimo, para 3 discos?

- A) 7
- B) 8
- C) 4
- D) 9
- E) 5

**Resposta:** A

**Explicação:** Ferramenta: substituir na fórmula. 2³ − 1. 8 − 1 = 7.
