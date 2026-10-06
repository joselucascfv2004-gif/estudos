---
titulo: Probabilidade
provas: ENEM, Militares, Concursos
descricao: Probabilidade clássica, eventos complementares, independentes, condicionais, probabilidade geométrica e binomial.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Probabilidade

Probabilidade clássica, eventos complementares, independentes, condicionais, probabilidade geométrica e binomial.

## Resumo

- **Probabilidade** = casos favoráveis ÷ casos possíveis (sempre entre 0 e 1, ou 0% e 100%).
- **Evento complementar:** P(não A) = 1 − P(A). Útil para "pelo menos um".
- **Eventos independentes** ("e"): multiplique as probabilidades.
- **Eventos mutuamente exclusivos** ("ou"): some as probabilidades. Em geral: P(A ou B) = P(A) + P(B) − P(A e B).
- **Probabilidade condicional:** P(A | B) = P(A e B) / P(B). O espaço amostral passa a ser só B.
- **Com ou sem reposição:** sem reposição, o total diminui a cada retirada.
- **Dica:** monte uma tabela ou árvore de possibilidades nos problemas com duas etapas.

## Fácil

### 1
<!-- modelo: f7 -->
Uma roleta de programa de TV é dividida em 10 setores iguais, dos quais 4 dão prêmio. Qual é a probabilidade de a roleta parar em um setor premiado?

- A) 1/10
- B) 3/5
- C) 2/3
- D) 1/2
- E) 2/5

**Resposta:** E

**Explicação:** Ferramenta: setores iguais = resultados igualmente prováveis. Cada setor tem a mesma chance. 4/10 = 2/5.

### 2
<!-- modelo: f6 -->
De um baralho comum de 52 cartas (4 naipes com 13 cartas cada), retira-se uma carta ao acaso. Qual é a probabilidade de ser uma figura (valete, dama ou rei)?

- A) 3/13
- B) 12/13
- C) 10/13
- D) 4/13
- E) 1/52

**Resposta:** A

**Explicação:** Ferramenta: casos favoráveis ÷ total. Conte quantas cartas atendem ao pedido. 12/52 = 3/13.

### 3
<!-- modelo: f2 -->
Uma urna tem 4 bolas brancas, 11 pretas e 6 vermelhas. Retirando uma bola ao acaso, qual é a probabilidade de ela ser branca?

- A) 4/21
- B) 4/11
- C) 1/21
- D) 11/21
- E) 17/21

**Resposta:** A

**Explicação:** Ferramenta: casos favoráveis ÷ total. O total é a soma de todas as bolas, não só das outras cores. 4/21 = 4/21.

### 4
<!-- modelo: f8 -->
A probabilidade de o ônibus atrasar é de 60%. Qual é a probabilidade de o ônibus não atrasar?

- A) 70%
- B) 20%
- C) 60%
- D) 40%
- E) 50%

**Resposta:** D

**Explicação:** Ferramenta: evento complementar. Acontecer e não acontecer somam 100%. 100% − 60% = 40%.

### 5
<!-- modelo: f3 -->
Uma moeda honesta é lançada 4 vezes. Qual é a probabilidade de sair cara em todos os lançamentos?

- A) 1/2
- B) 1/16
- C) 15/16
- D) 1/4
- E) 1/8

**Resposta:** B

**Explicação:** Ferramenta: eventos independentes ("e"). Um lançamento não influencia o outro: multiplique as probabilidades. (1/2)⁴ = 1/16.

### 6
<!-- modelo: f9 -->
Cada letra da palavra PORTUGUES foi escrita em um cartão, e um cartão é sorteado ao acaso. Qual é a probabilidade de sair uma vogal?

- A) 2/13
- B) 1/3
- C) 5/26
- D) 4/9
- E) 5/9

**Resposta:** D

**Explicação:** Ferramenta: contar cartões, não letras do alfabeto. Letras repetidas são cartões diferentes: conte todas. 4 vogais em 9 cartões: 4/9.

### 7
<!-- modelo: f6 -->
De um baralho comum de 52 cartas (4 naipes com 13 cartas cada), retira-se uma carta ao acaso. Qual é a probabilidade de ser um rei ou uma rainha?

- A) 2/13
- B) 3/13
- C) 8/13
- D) 1/52
- E) 11/13

**Resposta:** A

**Explicação:** Ferramenta: casos favoráveis ÷ total. Conte quantas cartas atendem ao pedido. 8/52 = 2/13.

### 8
<!-- modelo: f8 -->
A probabilidade de o ônibus atrasar é de 15%. Qual é a probabilidade de o ônibus não atrasar?

- A) 15%
- B) 92,5%
- C) 85%
- D) 50%
- E) 70%

**Resposta:** C

**Explicação:** Ferramenta: evento complementar. Acontecer e não acontecer somam 100%. 100% − 15% = 85%.

### 9
<!-- modelo: f2 -->
Uma urna tem 10 bolas brancas, 8 pretas e 1 vermelha. Retirando uma bola ao acaso, qual é a probabilidade de ela ser branca?

- A) 5/4
- B) 10/19
- C) 8/19
- D) 1/19
- E) 9/19

**Resposta:** B

**Explicação:** Ferramenta: casos favoráveis ÷ total. O total é a soma de todas as bolas, não só das outras cores. 10/19 = 10/19.

### 10
<!-- modelo: f4 -->
Um número é sorteado ao acaso entre 1 e 20 (inclusive). Qual é a probabilidade de ele ser múltiplo de 3?

- A) 1/3
- B) 3/7
- C) 3/10
- D) 7/10
- E) 3/20

**Resposta:** C

**Explicação:** Ferramenta: contar os favoráveis. Conte os múltiplos de 3 até 20: 20 ÷ 3 = 6,67 → 6. 6/20 = 3/10.

### 11
<!-- modelo: f5 -->
Em uma rifa com 200 bilhetes, 4 são premiados. Quem compra um bilhete tem que probabilidade de ser premiado?

- A) 98%
- B) 0,2%
- C) 4%
- D) 20%
- E) 2%

**Resposta:** E

**Explicação:** Ferramenta: probabilidade em porcentagem. Divida e multiplique por 100. 4/200 = 0,020 = 2%.

### 12
<!-- modelo: f1 -->
Ao lançar um dado comum (faces de 1 a 6), qual é a probabilidade de sair um número menor que 3?

- A) 2/3
- B) 1/3
- C) 1/18
- D) 1/6
- E) 1/2

**Resposta:** B

**Explicação:** Ferramenta: casos favoráveis ÷ casos possíveis. Liste o que serve e divida pelo total de resultados igualmente prováveis. 2 de 6: 1/3.

### 13
<!-- modelo: f1 -->
Ao lançar um dado comum (faces de 1 a 6), qual é a probabilidade de sair o número 6?

- A) 1/12
- B) 1/3
- C) 5/6
- D) 1/6
- E) 1/2

**Resposta:** D

**Explicação:** Ferramenta: casos favoráveis ÷ casos possíveis. Liste o que serve e divida pelo total de resultados igualmente prováveis. 1 de 6: 1/6.

### 14
<!-- modelo: f10 -->
Um número de 1 a 10 é sorteado ao acaso. Qual é a probabilidade de ser primo?

- A) 3/5
- B) 1/5
- C) 3/10
- D) 1/2
- E) 2/5

**Resposta:** E

**Explicação:** Ferramenta: casos favoráveis ÷ casos possíveis. Os primos até 10 são 4 (lembre: 1 não é primo; 2 é). 4/10 = 2/5.

### 15
<!-- modelo: f13 -->
Uma urna tem 5 bolas vermelhas e algumas azuis. Para que a probabilidade de tirar uma vermelha seja 1/4, quantas bolas azuis deve haver?

- A) 15
- B) 3
- C) 20
- D) 17
- E) 16

**Resposta:** A

**Explicação:** Ferramenta: probabilidade = favoráveis ÷ total; isolar o total. 5/total = 1/4 → total = 20. Azuis = 20 − 5 = 15.

### 16
<!-- modelo: f12 -->
Uma tachinha foi lançada 50 vezes e caiu com a ponta para cima 40 vezes. Qual é a estimativa da probabilidade de cair com a ponta para cima?

- A) 400%
- B) 50%
- C) 20%
- D) 40%
- E) 80%

**Resposta:** E

**Explicação:** Ferramenta: probabilidade experimental = frequência relativa. Sem um modelo teórico, estima-se pela proporção observada em muitas repetições. 40 ÷ 50 = 80%.

### 17
<!-- modelo: f11 -->
Uma carta é tirada ao acaso de um baralho comum de 52 cartas. Qual é a probabilidade de ser de copas?

- A) 1/4
- B) 7/26
- C) 3/4
- D) 1/2
- E) 3/13

**Resposta:** A

**Explicação:** Ferramenta: casos favoráveis ÷ 52. O baralho tem 4 naipes de 13 cartas. 13/52 = 1/4.

## Médio

### 1
<!-- modelo: m1 -->
Dois dados comuns são lançados. Qual é a probabilidade de a soma dos resultados ser 7?

- A) 1/11
- B) 1/9
- C) 7/36
- D) 1/2
- E) 1/6

**Resposta:** E

**Explicação:** Ferramenta: tabela 6 × 6. Dois dados geram 36 pares igualmente prováveis. (A soma 7 é a mais comum.) A soma 7 aparece em 6 pares: 1/6.

### 2
<!-- modelo: m10 -->
Um cadeado tem senha de 4 dígitos (0 a 9, podendo repetir). Alguém tenta 5 combinações diferentes ao acaso. Qual é a probabilidade de abrir o cadeado?

- A) 5/6561
- B) 1/2000
- C) 1/10000
- D) 1/8
- E) 1/200

**Resposta:** B

**Explicação:** Ferramenta: casos favoráveis ÷ total. Há 10⁴ senhas possíveis; cada tentativa diferente cobre uma delas. 5/10.000.

### 3
<!-- modelo: m8 -->
Um professor vai sortear 2 alunos de uma turma de 8 para apresentar um trabalho. Qual é a probabilidade de os sorteados serem exatamente Ana e Thiago?

- A) 1/4
- B) 1/14
- C) 1/56
- D) 1/8
- E) 1/28

**Resposta:** E

**Explicação:** Ferramenta: combinação no denominador. Todas as duplas são igualmente prováveis; só uma delas é a desejada. Duplas possíveis: C(8, 2) = 28. P = 1/28.

### 4
<!-- modelo: m9 -->
Um dardo atinge, ao acaso, um alvo quadrado. Qual é a probabilidade de acertar o triângulo formado por uma diagonal (metade do alvo)?

- A) 2/3
- B) 3/4
- C) 1/2
- D) 1/3
- E) 1/8

**Resposta:** C

**Explicação:** Ferramenta: probabilidade como razão de áreas. Se qualquer ponto é igualmente provável, a probabilidade é área favorável ÷ área total. a diagonal divide o quadrado em duas partes iguais = 1/2.

### 5
<!-- modelo: m6 -->
Lançando dois dados comuns, qual é a probabilidade de saírem números iguais?

- A) 1/12
- B) 1/6
- C) 6/11
- D) 1/36
- E) 5/6

**Resposta:** B

**Explicação:** Ferramenta: fixar o primeiro dado. Seja qual for o primeiro resultado, o segundo dado precisa (ou não) repeti-lo. Iguais: 6 de 36 = 1/6.

### 6
<!-- modelo: m5 -->
Em uma turma de 80 alunos, 33 jogam futebol, 35 jogam vôlei e 21 jogam os dois esportes. Escolhendo um aluno ao acaso, qual é a probabilidade de ele jogar futebol ou vôlei?

- A) 13/40
- B) 17/20
- C) 33/80
- D) 21/80
- E) 47/80

**Resposta:** E

**Explicação:** Ferramenta: regra do "ou". Some as duas probabilidades e tire a parte comum, que foi contada duas vezes. (33 + 35 − 21)/80 = 47/80.

### 7
<!-- modelo: m8 -->
Um professor vai sortear 2 alunos de uma turma de 9 para apresentar um trabalho. Qual é a probabilidade de os sorteados serem exatamente João e Natália?

- A) 1/18
- B) 2/9
- C) 1/72
- D) 1/9
- E) 1/36

**Resposta:** E

**Explicação:** Ferramenta: combinação no denominador. Todas as duplas são igualmente prováveis; só uma delas é a desejada. Duplas possíveis: C(9, 2) = 36. P = 1/36.

### 8
<!-- modelo: m4 -->
A probabilidade de chover amanhã em uma cidade é de 10% e, independentemente disso, a probabilidade de faltar energia é de 75%. Qual é a probabilidade de acontecerem as duas coisas?

- A) 7,5%
- B) 65%
- C) 0,75%
- D) 77,5%
- E) 85%

**Resposta:** A

**Explicação:** Ferramenta: regra do "e". Eventos independentes que acontecem juntos: multiplique as probabilidades (em decimal). 0,1 × 0,75 = 0,0750 = 7,5%.

### 9
<!-- modelo: m2 -->
Uma caixa tem 5 bombons de chocolate branco e 7 de chocolate preto. Retirando dois bombons ao acaso, sem reposição, qual é a probabilidade de ambos serem brancos?

- A) 5/36
- B) 5/66
- C) 5/33
- D) 25/144
- E) 5/12

**Resposta:** C

**Explicação:** Ferramenta: sem reposição, o total diminui. Depois de tirar um branco, sobra um branco a menos e um bombom a menos no total. 5/12 × 4/11 = 5/33.

### 10
<!-- modelo: m1 -->
Dois dados comuns são lançados. Qual é a probabilidade de a soma dos resultados ser 9?

- A) 1/6
- B) 1/11
- C) 1/3
- D) 5/36
- E) 1/9

**Resposta:** E

**Explicação:** Ferramenta: tabela 6 × 6. Dois dados geram 36 pares igualmente prováveis. (A soma 7 é a mais comum.) A soma 9 aparece em 4 pares: 1/9.

### 11
<!-- modelo: m7 -->
Retiram-se duas cartas de um baralho de 52, COM reposição (a primeira volta ao baralho antes da segunda). Qual é a probabilidade de as duas serem figuras (valete, dama ou rei)?

- A) 6/13
- B) 3/13
- C) 3/169
- D) 9/169
- E) 9/338

**Resposta:** D

**Explicação:** Ferramenta: com reposição = independentes. Com a carta devolvida, a segunda retirada tem a mesma probabilidade da primeira. 3/13 × 3/13 = 9/169.

### 12
<!-- modelo: m3 -->
Uma moeda honesta é lançada 3 vezes. Qual é a probabilidade de sair pelo menos uma cara?

- A) 3/8
- B) 7/8
- C) 1/8
- D) 5/8
- E) 1/2

**Resposta:** B

**Explicação:** Ferramenta: complementar de "pelo menos um". O contrário de "pelo menos uma cara" é "nenhuma cara" (todas coroas). 1 − 1/8 = 7/8.

### 13
<!-- modelo: m5 -->
Em uma turma de 50 alunos, 11 jogam futebol, 21 jogam vôlei e 3 jogam os dois esportes. Escolhendo um aluno ao acaso, qual é a probabilidade de ele jogar futebol ou vôlei?

- A) 3/50
- B) 21/50
- C) 13/25
- D) 16/25
- E) 29/50

**Resposta:** E

**Explicação:** Ferramenta: regra do "ou". Some as duas probabilidades e tire a parte comum, que foi contada duas vezes. (11 + 21 − 3)/50 = 29/50.

### 14
<!-- modelo: m2 -->
Uma caixa tem 6 bombons de chocolate branco e 7 de chocolate preto. Retirando dois bombons ao acaso, sem reposição, qual é a probabilidade de ambos serem brancos?

- A) 1/13
- B) 36/169
- C) 30/169
- D) 5/26
- E) 6/13

**Resposta:** D

**Explicação:** Ferramenta: sem reposição, o total diminui. Depois de tirar um branco, sobra um branco a menos e um bombom a menos no total. 6/13 × 5/12 = 5/26.

### 15
<!-- modelo: m12 -->
Um ponto é escolhido ao acaso num segmento de 12 cm. Qual é a probabilidade de ele ficar a menos de 5 cm de uma das pontas (qualquer uma)?

- A) 1/6
- B) 5
- C) 5/6
- D) 5/12
- E) 5/24

**Resposta:** C

**Explicação:** Ferramenta: probabilidade geométrica = comprimento favorável ÷ total. Há 5 cm favoráveis perto de cada ponta. 10/12 = 5/6.

### 16
<!-- modelo: m11 -->
Num dado viciado, a probabilidade de cada face é proporcional ao seu número (a face 6 é seis vezes mais provável que a face 1). Qual é a probabilidade de sair a face 6?

- A) 1/3
- B) 3/7
- C) 2/7
- D) 6/7
- E) 1/21

**Resposta:** C

**Explicação:** Ferramenta: pesos proporcionais: divida pela soma dos pesos. Os pesos 1 + 2 + … + 6 somam 21. P(6) = 6/21 = 2/7.

### 17
<!-- modelo: m13 -->
Num jogo, paga-se R$ 10 para jogar e ganha-se R$ 100 com probabilidade 1/10. Qual é o ganho esperado (valor esperado) por jogada?

- A) R$ 0,00
- B) R$ 5,00
- C) −R$ 10,00
- D) R$ 10,00
- E) R$ 90,00

**Resposta:** A

**Explicação:** Ferramenta: valor esperado = Σ valor × probabilidade. Em média, o prêmio rende prêmio × probabilidade; desconte o custo, que se paga sempre. 100 × 1/10 − 10 = 0,00 reais por jogada.

## Difícil

### 1
<!-- modelo: d8 -->
Eduarda acerta um pênalti com probabilidade de 80% e Rafael, com 50%. Cada um cobra um pênalti, de forma independente. Qual é a probabilidade de EXATAMENTE um dos dois acertar?

- A) 50%
- B) 30%
- C) 10%
- D) 90%
- E) 40%

**Resposta:** A

**Explicação:** Ferramenta: dois casos que não acontecem juntos. Ou Eduarda acerta e Rafael erra, ou Eduarda erra e Rafael acerta. 0,8 × 0,5 + 0,2 × 0,5 = 0,5 = 50%.

### 2
<!-- modelo: d4 -->
Uma doença atinge 5% de uma população. Um teste dá positivo em 100% dos doentes e em 5% dos sadios. Uma pessoa testou positivo. Qual é a probabilidade de ela estar doente?

- A) 39/400
- B) 19/20
- C) 20/39
- D) 1/20
- E) 1

**Resposta:** C

**Explicação:** Ferramenta: teorema de Bayes (pense em 10.000 pessoas). Entre todos os que dão positivo, quantos são realmente doentes? Positivos doentes: 500; positivos sadios: 475. P = 500/975 = 20/39.

### 3
<!-- modelo: d3 -->
Uma urna tem 5 bolas azuis e 6 amarelas. Retiram-se duas bolas, sem reposição. Qual é a probabilidade de serem de cores diferentes?

- A) 5/11
- B) 1/2
- C) 3/11
- D) 60/121
- E) 6/11

**Resposta:** E

**Explicação:** Ferramenta: duas ordens possíveis. Diferentes pode ser (azul, amarela) OU (amarela, azul): some os dois caminhos. 5/11·6/10 + 6/11·5/10 = 6/11.

### 4
<!-- modelo: d9 -->
Uma turma tem 6 meninas e 7 meninos. Três estudantes são sorteados para uma viagem. Qual é a probabilidade de serem todas meninas?

- A) 10/143
- B) 216/2197
- C) 6/13
- D) 35/286
- E) 120/2197

**Resposta:** A

**Explicação:** Ferramenta: combinações favoráveis ÷ totais. Grupos só de meninas ÷ todos os grupos possíveis de 3. C(6, 3)/C(13, 3) = 20/286 = 10/143.

### 5
<!-- modelo: d8 -->
Henrique acerta um pênalti com probabilidade de 60% e Pedro, com 50%. Cada um cobra um pênalti, de forma independente. Qual é a probabilidade de EXATAMENTE um dos dois acertar?

- A) 20%
- B) 80%
- C) 50%
- D) 10%
- E) 30%

**Resposta:** C

**Explicação:** Ferramenta: dois casos que não acontecem juntos. Ou Henrique acerta e Pedro erra, ou Henrique erra e Pedro acerta. 0,6 × 0,5 + 0,4 × 0,5 = 0,5 = 50%.

### 6
<!-- modelo: d2 -->
Em uma empresa: 13 homens usam óculos e 16 não usam; 14 mulheres usam óculos e 21 não usam. Sorteando uma pessoa e sabendo que é mulher, qual é a probabilidade de ela usar óculos?

- A) 3/5
- B) 2/5
- C) 7/32
- D) 14/27
- E) 35/64

**Resposta:** B

**Explicação:** Ferramenta: probabilidade condicional. "Sabendo que é mulher" encolhe o universo: agora só as mulheres contam. 14/35 = 2/5.

### 7
<!-- modelo: d1 -->
Uma moeda honesta é lançada 6 vezes. Qual é a probabilidade de saírem exatamente 5 caras?

- A) 5/64
- B) 1/64
- C) 5/6
- D) 3/32
- E) 3/64

**Resposta:** D

**Explicação:** Ferramenta: distribuição binomial. Cada sequência específica tem probabilidade (1/2)⁶; conte quantas sequências têm 5 caras: C(6, 5). 6/64 = 3/32.

### 8
<!-- modelo: d9 -->
Uma turma tem 11 meninas e 6 meninos. Três estudantes são sorteados para uma viagem. Qual é a probabilidade de serem todas meninas?

- A) 11/17
- B) 990/4913
- C) 1331/4913
- D) 33/136
- E) 1/34

**Resposta:** D

**Explicação:** Ferramenta: combinações favoráveis ÷ totais. Grupos só de meninas ÷ todos os grupos possíveis de 3. C(11, 3)/C(17, 3) = 165/680 = 33/136.

### 9
<!-- modelo: d6 -->
Três pessoas são escolhidas ao acaso. Supondo que cada dia da semana seja igualmente provável para o nascimento, qual é a probabilidade de todas terem nascido em dias da semana diferentes?

- A) 15/49
- B) 3/7
- C) 30/49
- D) 1/49
- E) 19/49

**Resposta:** C

**Explicação:** Ferramenta: uma pessoa de cada vez. A primeira pode ser qualquer dia; a segunda precisa evitar 1 dia; a terceira, 2 dias. 7/7 × 6/7 × 5/7 = 30/49.

### 10
<!-- modelo: d2 -->
Em uma empresa: 7 homens usam óculos e 26 não usam; 12 mulheres usam óculos e 27 não usam. Sorteando uma pessoa e sabendo que é mulher, qual é a probabilidade de ela usar óculos?

- A) 9/13
- B) 1/6
- C) 4/13
- D) 13/24
- E) 12/19

**Resposta:** C

**Explicação:** Ferramenta: probabilidade condicional. "Sabendo que é mulher" encolhe o universo: agora só as mulheres contam. 12/39 = 4/13.

### 11
<!-- modelo: d1 -->
Uma moeda honesta é lançada 5 vezes. Qual é a probabilidade de saírem exatamente 2 caras?

- A) 1/32
- B) 5/16
- C) 1/16
- D) 2/5
- E) 5/32

**Resposta:** B

**Explicação:** Ferramenta: distribuição binomial. Cada sequência específica tem probabilidade (1/2)⁵; conte quantas sequências têm 2 caras: C(5, 2). 10/32 = 5/16.

### 12
<!-- modelo: d7 -->
Há duas urnas: a urna I tem 4 bolas brancas em 6; a urna II tem 1 branca em 2. Escolhe-se uma urna ao acaso (cara ou coroa) e retira-se uma bola. Qual é a probabilidade de ser branca?

- A) 2/3
- B) 1/3
- C) 5/8
- D) 7/12
- E) 7/24

**Resposta:** D

**Explicação:** Ferramenta: árvore de probabilidades. Cada caminho: (chance da urna) × (chance de branca naquela urna). Some os caminhos. 1/2 × 4/6 + 1/2 × 1/2 = 7/12.

### 13
<!-- modelo: d5 -->
Lançando dois dados comuns, qual é a probabilidade de a soma ser maior ou igual a 10?

- A) 1/2
- B) 7/36
- C) 1/12
- D) 5/6
- E) 1/6

**Resposta:** E

**Explicação:** Ferramenta: contar na tabela. Some as quantidades de cada soma permitida. Pares com soma ≥ 10: 6. P = 1/6.

### 14
<!-- modelo: d4 -->
Uma doença atinge 20% de uma população. Um teste dá positivo em 80% dos doentes e em 10% dos sadios. Uma pessoa testou positivo. Qual é a probabilidade de ela estar doente?

- A) 2/3
- B) 1/5
- C) 4/25
- D) 9/10
- E) 4/5

**Resposta:** A

**Explicação:** Ferramenta: teorema de Bayes (pense em 10.000 pessoas). Entre todos os que dão positivo, quantos são realmente doentes? Positivos doentes: 1600; positivos sadios: 800. P = 1600/2400 = 2/3.

### 15
<!-- modelo: d11 -->
Três dados comuns são lançados. Qual é a probabilidade de a soma dar 3?

- A) 0
- B) 1/36
- C) 1/216
- D) 1/12
- E) 1/108

**Resposta:** C

**Explicação:** Ferramenta: casos favoráveis ÷ 6³. Soma 3 só com todos os dados iguais a 1. 1/216.

### 16
<!-- modelo: d10 -->
Qual é a probabilidade de 3 pessoas, escolhidas ao acaso, terem nascido em meses todos diferentes? (considere os 12 meses igualmente prováveis)

- A) 91,67%
- B) 75%
- C) 76,39%
- D) 8,33%
- E) 23,61%

**Resposta:** C

**Explicação:** Ferramenta: regra do "e" sem repetição. A 1ª pode nascer em qualquer mês; a 2ª em 11 dos 12; … 12/12 × 11/12 × 10/12 ≈ 76,39%.
