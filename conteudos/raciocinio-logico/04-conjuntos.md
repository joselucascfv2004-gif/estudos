---
titulo: Conjuntos e diagramas de Venn
provas: Concursos, Militares
descricao: União, interseção, diferença, complementar, subconjuntos e problemas com diagramas.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Conjuntos e diagramas de Venn

União, interseção, diferença, complementar, subconjuntos e problemas com diagramas.

## Resumo

- **União (A ∪ B):** elementos que estão em A **ou** em B. **Interseção (A ∩ B):** os que estão nos dois.
- **Diferença (A − B):** estão em A, mas não em B. **Complementar:** o que falta para completar o universo.
- **Fórmula da união:** n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
- **Com três conjuntos:** n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C).
- **Diagrama de Venn:** preencha **do centro para fora** (comece pela interseção de todos).
- **Subconjuntos:** um conjunto com n elementos tem 2ⁿ subconjuntos.
- **"Nenhum dos dois"** = total − união.

## Fácil

### 1
<!-- modelo: f7 -->
Em uma pesquisa, 26 pessoas usam o jornal apenas, 33 usam a revista apenas, 11 usam os dois e 12 não usam nenhum. Quantas pessoas foram entrevistadas?

- A) 70
- B) 82
- C) 71
- D) 93
- E) 83

**Resposta:** B

**Explicação:** Ferramenta: diagrama de Venn: cada região conta uma vez. "Apenas" é a parte só de um conjunto; "os dois" é a interseção. Some as regiões, sem repetir. 26 + 33 + 11 + 12 = 82.

### 2
<!-- modelo: f2 -->
Quantos subconjuntos tem um conjunto com 7 elementos?

- A) 49
- B) 127
- C) 14
- D) 128
- E) 256

**Resposta:** D

**Explicação:** Ferramenta: número de subconjuntos (2ⁿ). Um conjunto com n elementos tem 2ⁿ subconjuntos (incluindo o vazio e ele mesmo): 2^7 = 128.

### 3
<!-- modelo: f5 -->
Como se classifica o número 7, considerando o menor conjunto numérico ao qual ele pertence?

- A) Natural (ℕ)
- B) Inteiro, mas não natural
- C) Irracional
- D) Não é um número real
- E) Racional, mas não inteiro

**Resposta:** A

**Explicação:** Ferramenta: conjuntos numéricos (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ). Primeiro simplifique o número (calcule raízes e frações); depois veja se é natural, inteiro, fração ou se não pode virar fração (irracional). 7 é natural.

### 4
<!-- modelo: f4 -->
Sabe-se que n(A) = 34, n(B) = 30 e n(A ∩ B) = 19. Qual é o valor de n(A ∪ B)?

- A) 64
- B) 34
- C) 26
- D) 83
- E) 45

**Resposta:** E

**Explicação:** Ferramenta: fórmula da união. n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 34 + 30 − 19 = 45.

### 5
<!-- modelo: f1 -->
Em um grupo de 80 pessoas, 31 gostam de cinema, 27 gostam de teatro e 19 gostam de ambos. Quantas não gostam de nenhum dos dois?

- A) 22
- B) 19
- C) 60
- D) 41
- E) 39

**Resposta:** D

**Explicação:** Ferramenta: união de dois conjuntos. n(A ∪ B) = 31 + 27 − 19 = 39. Não gostam de nenhum: 80 − 39 = 41.

### 6
<!-- modelo: f3 -->
Sendo A = {2, 3, 4, 7, 11, 12} e B = {1, 8, 9, 10, 11, 12}, qual é o conjunto A − B?

- A) {1, 8, 9, 10}
- B) {2, 3, 4, 7, 11, 12}
- C) {1, 2, 3, 4, 7, 8, 9, 10, 11, 12}
- D) {2, 3, 4, 7}
- E) {11, 12}

**Resposta:** D

**Explicação:** Ferramenta: interseção e diferença. A − B são os elementos de A que não estão em B: {2, 3, 4, 7}.

### 7
<!-- modelo: f3 -->
Sendo A = {2, 4, 6, 7, 11, 12} e B = {3, 5, 6, 8, 11, 12}, qual é o conjunto A ∩ B?

- A) {2, 4, 7}
- B) {2, 4, 6, 7, 11, 12}
- C) {2, 3, 4, 5, 6, 7, 8, 11, 12}
- D) {6, 11, 12}
- E) {3, 5, 8}

**Resposta:** D

**Explicação:** Ferramenta: interseção e diferença. A ∩ B são os elementos comuns: {6, 11, 12}.

### 8
<!-- modelo: f6 -->
Sendo U = {1, 2, 3, ..., 10} o conjunto universo e A = {x ∈ U | x é divisor de 12}, qual é o complementar de A em relação a U?

- A) {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
- B) {7, 8, 9, 10}
- C) {1, 2, 3, 4, 6}
- D) {5, 7, 8, 9, 10}
- E) {1, 5, 7, 8, 9, 10}

**Resposta:** D

**Explicação:** Ferramenta: complementar = o que falta para completar o universo. Liste A primeiro e depois pegue os elementos de U que não estão em A. A = {1, 2, 3, 4, 6}; A' = {5, 7, 8, 9, 10}.

### 9
<!-- modelo: f2 -->
Quantos subconjuntos tem um conjunto com 4 elementos?

- A) 8
- B) 16
- C) 48
- D) 32
- E) 15

**Resposta:** B

**Explicação:** Ferramenta: número de subconjuntos (2ⁿ). Um conjunto com n elementos tem 2ⁿ subconjuntos (incluindo o vazio e ele mesmo): 2^4 = 16.

### 10
<!-- modelo: f1 -->
Em um grupo de 50 pessoas, 29 gostam de cinema, 24 gostam de teatro e 6 gostam de ambos. Quantas não gostam de nenhum dos dois?

- A) 6
- B) 9
- C) 15
- D) 47
- E) 3

**Resposta:** E

**Explicação:** Ferramenta: união de dois conjuntos. n(A ∪ B) = 29 + 24 − 6 = 47. Não gostam de nenhum: 50 − 47 = 3.

### 11
<!-- modelo: f10 -->
Sejam A = {1, 2, 3, 5, 8} e B = {6, 8, 9, 10}. Quantos elementos tem A − B?

- A) 4
- B) 5
- C) 1
- D) 8
- E) 3

**Resposta:** A

**Explicação:** Ferramenta: A − B: está em A e não está em B. Tire de A os elementos que também estão em B. A − B = {1, 2, 3, 5}: 4 elementos.

### 12
<!-- modelo: f8 -->
Quantos subconjuntos tem o conjunto {a, b, c}?

- A) 9
- B) 3
- C) 7
- D) 6
- E) 8

**Resposta:** E

**Explicação:** Ferramenta: n elementos → 2ⁿ subconjuntos. Cada elemento entra ou não entra (2 opções), incluindo o vazio e o próprio conjunto. 2³ = 8.

### 13
<!-- modelo: f12 -->
Quantos elementos tem o conjunto D dos divisores positivos de 24?

- A) 8
- B) 12
- C) 9
- D) 6
- E) 7

**Resposta:** A

**Explicação:** Ferramenta: listar os divisores em pares. Divisores: 1, 2, 3, 4, 6, 8, 12, 24. São 8.

### 14
<!-- modelo: f9 -->
Dado A = {2, 3, 4}, qual das afirmações é verdadeira?

- A) A ⊂ {2, 3}
- B) 2 ⊂ A
- C) 1 ∈ A
- D) {2} ∈ A
- E) {2} ⊂ A

**Resposta:** E

**Explicação:** Ferramenta: ∈ relaciona elemento e conjunto; ⊂ relaciona dois conjuntos. 2 é elemento (∈); {2} é um conjunto contido em A (⊂); o vazio está contido em todo conjunto. Verdadeira: {2} ⊂ A.

### 15
<!-- modelo: f11 -->
Numa pesquisa, 40 pessoas usam o aplicativo A, e 12 delas usam também o aplicativo B. Quantas usam SÓ o aplicativo A?

- A) 28
- B) 16
- C) 52
- D) 12
- E) 40

**Resposta:** A

**Explicação:** Ferramenta: "só A" = A menos a interseção. As que usam os dois estão contadas dentro das que usam A. 40 − 12 = 28.

### 16
<!-- modelo: f14 -->
Quantos elementos tem o conjunto {x ∈ ℕ | 5 < x ≤ 10}?

- A) 6
- B) 7
- C) 4
- D) 10
- E) 5

**Resposta:** E

**Explicação:** Ferramenta: liste os naturais que satisfazem a condição. 5 não entra (é "<"); 10 entra. {6, 7, 8, 9, 10}: 5 elementos.

### 17
<!-- modelo: f13 -->
Se A tem 3 elementos e B tem 4 elementos, quantos pares ordenados (x, y), com x ∈ A e y ∈ B, existem no produto cartesiano A × B?

- A) 81
- B) 24
- C) 128
- D) 7
- E) 12

**Resposta:** E

**Explicação:** Ferramenta: n(A × B) = n(A)·n(B). Para cada x de A há n(B) escolhas de y. 3 × 4 = 12.

## Médio

### 1
<!-- modelo: m3 -->
Um conjunto A tem 3 elementos. Quantos subconjuntos de A possuem exatamente 2 elementos?

- A) 1
- B) 6
- C) 3
- D) 8
- E) 4

**Resposta:** C

**Explicação:** Ferramenta: subconjuntos com 2 elementos (combinação). É uma combinação: C(3, 2) = 3·2/2 = 3.

### 2
<!-- modelo: m3 -->
Um conjunto A tem 6 elementos. Quantos subconjuntos de A possuem exatamente 2 elementos?

- A) 30
- B) 57
- C) 12
- D) 64
- E) 15

**Resposta:** E

**Explicação:** Ferramenta: subconjuntos com 2 elementos (combinação). É uma combinação: C(6, 2) = 6·5/2 = 15.

### 3
<!-- modelo: m6 -->
Em uma pesquisa com 400 pessoas, 55% usam cartão de crédito, 50% usam Pix para compras e 15% usam os dois. Quantas pessoas não usam nenhum dos dois?

- A) 60
- B) 100
- C) 40
- D) 360
- E) 39

**Resposta:** C

**Explicação:** Ferramenta: união em porcentagem, depois porcentagem do total. Usam pelo menos um: 55% + 50% − 15% = 90%. Não usam nenhum: 10%. 10% de 400 = 40 pessoas.

### 4
<!-- modelo: m2 -->
Em uma escola com 57 alunos, 20 estudam inglês, 26 estudam espanhol e 22 estudam francês. 4 estudam inglês e espanhol, 8 estudam inglês e francês, 5 estudam espanhol e francês, e 2 estudam os três idiomas. Quantos alunos não estudam nenhum desses idiomas?

- A) 4
- B) 6
- C) 2
- D) 8
- E) 10

**Resposta:** A

**Explicação:** Ferramenta: união de três conjuntos. n(I ∪ E ∪ F) = 20 + 26 + 22 − 4 − 8 − 5 + 2 = 53. Nenhum: 57 − 53 = 4.

### 5
<!-- modelo: m4 -->
Numa turma de 30 alunos, 15 foram aprovados em Matemática, 18 em Português, e 4 não foram aprovados em nenhuma das duas. Quantos foram aprovados nas duas disciplinas?

- A) 15
- B) 3
- C) 11
- D) 7
- E) 1

**Resposta:** D

**Explicação:** Ferramenta: interseção a partir do total. Aprovados em pelo menos uma: 30 − 4 = 26. Então 15 + 18 − x = 26 ⇒ x = 7.

### 6
<!-- modelo: m2 -->
Em uma escola com 68 alunos, 25 estudam inglês, 26 estudam espanhol e 27 estudam francês. 7 estudam inglês e espanhol, 12 estudam inglês e francês, 10 estudam espanhol e francês, e 4 estudam os três idiomas. Quantos alunos não estudam nenhum desses idiomas?

- A) 23
- B) 25
- C) 17
- D) 15
- E) 19

**Resposta:** D

**Explicação:** Ferramenta: união de três conjuntos. n(I ∪ E ∪ F) = 25 + 26 + 27 − 7 − 12 − 10 + 4 = 53. Nenhum: 68 − 53 = 15.

### 7
<!-- modelo: m1 -->
Em uma pesquisa com 100 clientes de um banco, 48 usam o aplicativo, 22 usam o internet banking e 7 usam os dois canais. Quantos usam APENAS o aplicativo?

- A) 48
- B) 41
- C) 7
- D) 63
- E) 15

**Resposta:** B

**Explicação:** Ferramenta: "apenas" no diagrama de Venn. Apenas o aplicativo = n(App) − n(ambos) = 48 − 7 = 41.

### 8
<!-- modelo: m7 -->
Sejam A = {2, 4, 5, 8, 9}, B = {1, 2, 3, 4} e C = {1, 4, 8, 9}. Qual é o conjunto (A − B) ∩ C?

- A) {4, 8, 9}
- B) {8, 9}
- C) {1, 2, 3, 4, 5, 8, 9}
- D) {2, 4}
- E) {2, 5}

**Resposta:** B

**Explicação:** Ferramenta: resolver primeiro o parêntese. Como numa expressão numérica: o que está entre parênteses vem primeiro. A − B = {5, 8, 9}; então (A − B) ∩ C = {8, 9}.

### 9
<!-- modelo: m5 -->
Quantos números inteiros de 1 a 120 são múltiplos de 2 ou de 3?

- A) 80
- B) 100
- C) 81
- D) 20
- E) 40

**Resposta:** A

**Explicação:** Ferramenta: n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Os múltiplos dos dois ao mesmo tempo são os múltiplos do MMC(2, 3) = 6; eles foram contados duas vezes. 60 + 40 − 20 = 80.

### 10
<!-- modelo: m1 -->
Em uma pesquisa com 120 clientes de um banco, 28 usam o aplicativo, 51 usam o internet banking e 16 usam os dois canais. Quantos usam APENAS o aplicativo?

- A) 12
- B) 63
- C) 35
- D) 16
- E) 28

**Resposta:** A

**Explicação:** Ferramenta: "apenas" no diagrama de Venn. Apenas o aplicativo = n(App) − n(ambos) = 28 − 16 = 12.

### 11
<!-- modelo: m9 -->
Dos 120 funcionários de uma empresa, 50 têm carro, 40 têm moto e 15 têm os dois. Quantos não têm nem carro nem moto?

- A) 75
- B) 45
- C) 30
- D) 48
- E) 15

**Resposta:** B

**Explicação:** Ferramenta: "nenhum dos dois" = total − união. União = 50 + 40 − 15 = 75. 120 − 75 = 45.

### 12
<!-- modelo: m13 -->
Quantos números de 1 a 60 são múltiplos de 3 ou de 5?

- A) 14
- B) 28
- C) 27
- D) 32
- E) 4

**Resposta:** B

**Explicação:** Ferramenta: inclusão-exclusão. Múltiplos de 3: 20; de 5: 12; dos dois (múltiplos de 15): 4. 20 + 12 − 4 = 28.

### 13
<!-- modelo: m10 -->
Um conjunto tem 7 elementos. Quantos dos seus subconjuntos têm exatamente 3 elementos?

- A) 35
- B) 128
- C) 70
- D) 8
- E) 21

**Resposta:** A

**Explicação:** Ferramenta: subconjuntos de k elementos = C(n, k). Num subconjunto a ordem não importa. C(7, 3) = 35.

### 14
<!-- modelo: m11 -->
Quantos números inteiros pertencem à interseção dos intervalos [−2, 3] e ]1, 9]?

- A) 6
- B) 8
- C) 2
- D) 1
- E) 3

**Resposta:** C

**Explicação:** Ferramenta: interseção de intervalos: a parte comum. A parte comum vai de 1 (aberto) até 3 (fechado). Inteiros: 2, 3 → 2.

### 15
<!-- modelo: m14 -->
Num universo U com 30 elementos, n(A) = 8, n(B) = 10 e n(A ∩ B) = 4. Quantos elementos tem o complementar de A ∪ B?

- A) 16
- B) 22
- C) 20
- D) 12
- E) 14

**Resposta:** A

**Explicação:** Ferramenta: complementar = universo − conjunto. n(A ∪ B) = 8 + 10 − 4 = 14. 30 − 14 = 16.

### 16
<!-- modelo: m12 -->
O conjunto das partes de A, P(A), tem 64 elementos. Quantos elementos tem A?

- A) 8
- B) 32
- C) 5
- D) 6
- E) 7

**Resposta:** D

**Explicação:** Ferramenta: n(P(A)) = 2ⁿ. 2ⁿ = 64. n = 6.

### 17
<!-- modelo: m8 -->
Numa escola, 60 alunos fazem inglês, 30 fazem espanhol e 78 fazem pelo menos um dos dois cursos. Quantos fazem os dois?

- A) 12
- B) 90
- C) 48
- D) 168
- E) 18

**Resposta:** A

**Explicação:** Ferramenta: n(A ∩ B) = n(A) + n(B) − n(A ∪ B). A soma de A e B conta duas vezes quem faz os dois. 60 + 30 − 78 = 12.

## Difícil

### 1
<!-- modelo: d1 -->
Em um grupo de 150 pessoas, 78 têm conta corrente e 93 têm conta poupança. Qual é o número máximo de pessoas que têm os dois tipos de conta?

- A) 15
- B) 31
- C) 86
- D) 21
- E) 78

**Resposta:** E

**Explicação:** Ferramenta: mínimo e máximo da interseção. Máximo: quando um conjunto está contido no outro: min(78, 93) = 78.

### 2
<!-- modelo: d2 -->
Um conjunto A tem 4 elementos e um elemento específico x pertence a A. Quantos subconjuntos de A contêm x e possuem exatamente 3 elementos?

- A) 6
- B) 3
- C) 8
- D) 2
- E) 4

**Resposta:** B

**Explicação:** Ferramenta: subconjuntos que contêm um elemento. Fixando x, escolhemos os outros 2 elementos entre os 3 restantes: C(3, 2).

### 3
<!-- modelo: d3 -->
Em uma pesquisa sobre streaming: 20 pessoas assinam o serviço A, 35 o B e 33 o C; 8 assinam A e B, 9 assinam A e C, 6 assinam B e C, e 3 assinam os três. Quantas pessoas assinam APENAS o serviço A?

- A) 6
- B) 0
- C) 12
- D) 17
- E) 3

**Resposta:** A

**Explicação:** Ferramenta: "apenas A" com três conjuntos. Apenas A = n(A) − n(A∩B) − n(A∩C) + n(A∩B∩C) = 20 − 8 − 9 + 3 = 6 (soma-se de volta quem foi retirado duas vezes).

### 4
<!-- modelo: d1 -->
Em um grupo de 120 pessoas, 62 têm conta corrente e 60 têm conta poupança. Qual é o número mínimo de pessoas que têm os dois tipos de conta?

- A) 2
- B) 5
- C) 60
- D) 12
- E) 61

**Resposta:** A

**Explicação:** Ferramenta: mínimo e máximo da interseção. Mínimo: quando a união é o grupo todo: 62 + 60 − 120 = 2.

### 5
<!-- modelo: d4 -->
Em uma pesquisa, 75% dos entrevistados leem notícias pelo celular, 45% pela TV e 15% não usam nenhum desses meios. Que porcentagem usa os dois meios?

- A) 30%
- B) 20%
- C) 15%
- D) 35%
- E) 50%

**Resposta:** D

**Explicação:** Ferramenta: interseção em porcentagem. Usam pelo menos um: 100% − 15% = 85%. Então 75% + 45% − x = 85% ⇒ x = 35%.

### 6
<!-- modelo: d3 -->
Em uma pesquisa sobre streaming: 40 pessoas assinam o serviço A, 40 o B e 30 o C; 5 assinam A e B, 5 assinam A e C, 10 assinam B e C, e 2 assinam os três. Quantas pessoas assinam APENAS o serviço A?

- A) 30
- B) 28
- C) 32
- D) 38
- E) 35

**Resposta:** C

**Explicação:** Ferramenta: "apenas A" com três conjuntos. Apenas A = n(A) − n(A∩B) − n(A∩C) + n(A∩B∩C) = 40 − 5 − 5 + 2 = 32 (soma-se de volta quem foi retirado duas vezes).

### 7
<!-- modelo: d7 -->
Em um grupo de 60 pessoas, 21 falam inglês, 40 falam espanhol e 10 não falam nenhuma dessas línguas. Quantas pessoas falam EXATAMENTE uma das duas línguas?

- A) 39
- B) 41
- C) 61
- D) 50
- E) 11

**Resposta:** A

**Explicação:** Ferramenta: achar a interseção pelo total e depois tirar duas vezes. Falam pelo menos uma: 60 − 10 = 50; então os dois: 21 + 40 − 50 = 11. Exatamente uma: (21 − 11) + (40 − 11) = 39.

### 8
<!-- modelo: d2 -->
Um conjunto A tem 6 elementos e um elemento específico x pertence a A. Quantos subconjuntos de A contêm x e possuem exatamente 4 elementos?

- A) 18
- B) 32
- C) 60
- D) 10
- E) 15

**Resposta:** D

**Explicação:** Ferramenta: subconjuntos que contêm um elemento. Fixando x, escolhemos os outros 3 elementos entre os 5 restantes: C(5, 3).

### 9
<!-- modelo: d5 -->
Em uma pesquisa sobre três plataformas de estudo (A, B e C), 12 pessoas usam A e B, 12 usam A e C, 15 usam B e C, e 6 usam as três. (Cada número de pares inclui quem usa as três.) Quantas pessoas usam exatamente duas plataformas?

- A) 39
- B) 45
- C) 21
- D) 33
- E) 27

**Resposta:** C

**Explicação:** Ferramenta: separar as regiões do diagrama. Cada interseção de dois conjuntos contém também quem está nos três; por isso tire as três de cada par. (12 − 6) + (12 − 6) + (15 − 6) = 21.

### 10
<!-- modelo: d6 -->
Quantos números inteiros de 1 a 150 NÃO são divisíveis por 2, nem por 3, nem por 5?

- A) 40
- B) 110
- C) 45
- D) 39
- E) 38

**Resposta:** A

**Explicação:** Ferramenta: princípio da inclusão-exclusão (3 conjuntos). Conte os divisíveis por pelo menos um: some os simples, tire os pares (6, 10, 15) e devolva o triplo (30). Depois use o complementar. 75 + 50 + 30 − 25 − 15 − 10 + 5 = 110. Não divisíveis: 150 − 110 = 40.

### 11
<!-- modelo: d10 -->
A diferença simétrica A Δ B reúne os elementos que estão em A ou em B, mas não nos dois. Para A = {1, 2, 4, 5, 6} e B = {4, 6, 8, 9}, quantos elementos tem A Δ B?

- A) 9
- B) 2
- C) 7
- D) 6
- E) 5

**Resposta:** E

**Explicação:** Ferramenta: A Δ B = (A ∪ B) − (A ∩ B). União: 7 elementos; interseção: 2. A Δ B = {1, 2, 5, 8, 9}: 5.

### 12
<!-- modelo: d11 -->
Um conjunto tem 7 elementos, entre eles o elemento a. Quantos subconjuntos contêm o elemento a?

- A) 63
- B) 127
- C) 128
- D) 64
- E) 7

**Resposta:** D

**Explicação:** Ferramenta: fixe o elemento obrigatório. O a já está escolhido; os outros 6 elementos entram ou não. 2⁶ = 64.

### 13
<!-- modelo: d8 -->
Numa pesquisa, 50 pessoas leem o jornal A, 40 o B e 30 o C; 15 leem A e B, 10 leem A e C, 10 leem B e C, e 5 leem os três. Quantas leem EXATAMENTE UM jornal?

- A) 65
- B) 20
- C) 60
- D) 120
- E) 90

**Resposta:** A

**Explicação:** Ferramenta: diagrama de Venn do centro para fora. Só A = 50 − 15 − 10 + 5 = 30; só B = 20; só C = 15. 30 + 20 + 15 = 65.

### 14
<!-- modelo: d12 -->
O conjunto A tem 40 elementos e B tem 35. Qual é o MAIOR número possível de elementos em A ∩ B?

- A) 40
- B) 0
- C) 75
- D) 35
- E) 5

**Resposta:** D

**Explicação:** Ferramenta: a interseção cabe dentro do menor conjunto. No máximo, o menor conjunto está inteiro dentro do outro. Máximo: 35.

### 15
<!-- modelo: d9 -->
Numa turma de 100 alunos, 60 gostam de matemática e 55 gostam de português. Qual é o número MÍNIMO de alunos que gostam das duas matérias?

- A) 40
- B) 55
- C) 25
- D) 115
- E) 15

**Resposta:** E

**Explicação:** Ferramenta: mínimo da interseção = n(A) + n(B) − total. Mesmo que ninguém fique de fora, 60 + 55 = 115 passa de 100: o excesso tem de ser contado duas vezes. 115 − 100 = 15.

### 16
<!-- modelo: d13 -->
Em três clubes, 20 pessoas são sócias de A e B, 14 de A e C, 11 de B e C, e 6 são sócias dos três. Quantas pessoas são sócias de PELO MENOS DOIS clubes?

- A) 45
- B) 43
- C) 27
- D) 33
- E) 39

**Resposta:** D

**Explicação:** Ferramenta: cuidado: quem está nos três foi contado em cada interseção dupla. Exatamente dois: 27; nos três: 6. 27 + 6 = 33.
