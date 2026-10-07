---
titulo: Estatística
provas: Faculdade
descricao: Estatística descritiva, medidas de posição e dispersão, probabilidade, variáveis aleatórias, distribuições binomial, Poisson e normal, amostragem, intervalo de confiança e uso de planilhas (UFCG 3103079).
fonte: Questão inédita (estilo prova de Estatística)
---

# Estatística

## Resumo

- **Variáveis:** qualitativas (nominal ou ordinal) e quantitativas (discreta ou contínua). **População** é o todo; **amostra** é a parte observada.
- **Posição:** média (sensível a valores extremos), mediana (valor central, robusta) e moda (mais frequente). Média ponderada = Σ(valor × peso) ÷ Σpesos.
- **Dispersão:** amplitude; variância populacional σ² = Σ(x − μ)²/N; amostral s² = Σ(x − x̄)²/(n − 1); desvio padrão = √variância; **coeficiente de variação** CV = DP/média.
- **Probabilidade:** P(A ∪ B) = P(A) + P(B) − P(A ∩ B); condicional P(A|B) = P(A ∩ B)/P(B); independentes: P(A ∩ B) = P(A)·P(B). **Bayes** inverte a condicional.
- **Variável aleatória:** esperança E(X) = Σx·p; variância Var(X) = E(X²) − [E(X)]². Var(aX + b) = a²·Var(X).
- **Binomial:** P(X = k) = C(n,k)·pᵏ·(1 − p)ⁿ⁻ᵏ; média np; variância np(1 − p). **Poisson:** P(X = k) = e^(−λ)·λᵏ/k!; média = variância = λ.
- **Normal:** simétrica (média = mediana = moda); z = (x − μ)/σ; cerca de 68%, 95% e 99,7% dos dados em ±1, ±2 e ±3 desvios.
- **Amostragem:** aleatória simples, sistemática, estratificada e por conglomerados (probabilísticas); por conveniência e por cotas (não probabilísticas).
- **Intervalo de confiança da média:** x̄ ± z·σ/√n (z = 1,96 para 95%). Para proporção: p̂ ± z·√[p̂(1 − p̂)/n]. Mais confiança = intervalo mais largo; mais amostra = intervalo mais estreito.
- **Planilhas:** =MÉDIA, =MED, =MODO, =DESVPAD.A (amostra), =DESVPAD.P (população), =DIST.NORM.N, =DISTR.BINOM.

## Fácil

### 1
A média aritmética dos valores 4, 6, 8, 10 e 12 é:

- A) 40
- B) 6
- C) 10
- D) 8
- E) 7

**Resposta:** D

**Explicação:** (4 + 6 + 8 + 10 + 12) ÷ 5 = 40 ÷ 5 = 8.

### 2
A mediana do conjunto 3, 7, 9, 12, 20, 25 é:

- A) 9
- B) 10,5
- C) 12
- D) 12,67
- E) 11

**Resposta:** B

**Explicação:** Com número par de dados ordenados, a mediana é a média dos dois centrais: (9 + 12) ÷ 2 = 10,5.

### 3
A moda do conjunto 2, 3, 3, 5, 7, 3, 8 é:

- A) 8
- B) 5
- C) 2
- D) 4,43
- E) 3

**Resposta:** E

**Explicação:** A moda é o valor mais frequente. O número 3 aparece três vezes.

### 4
"Número de filhos de cada funcionário" é uma variável:

- A) qualitativa nominal
- B) quantitativa contínua
- C) quantitativa discreta
- D) qualitativa ordinal
- E) constante

**Resposta:** C

**Explicação:** É uma contagem (0, 1, 2, ...), sem valores intermediários. Por isso é quantitativa discreta. Altura e peso são exemplos de contínuas.

### 5
"Grau de escolaridade" (fundamental, médio, superior) é uma variável:

- A) qualitativa ordinal
- B) qualitativa nominal
- C) quantitativa discreta
- D) quantitativa contínua
- E) aleatória contínua

**Resposta:** A

**Explicação:** As categorias têm ordem natural, por isso a variável é ordinal. Estado civil, por exemplo, é nominal (sem ordem).

### 6
Ao lançar um dado comum, a probabilidade de sair um número par é:

- A) 2/3
- B) 1/3
- C) 1/6
- D) 1/2
- E) 1/4

**Resposta:** D

**Explicação:** Os pares são 2, 4 e 6: 3 casos favoráveis em 6 possíveis, ou seja, 1/2.

### 7
A variância de um conjunto de dados é 16. O desvio padrão é:

- A) 8
- B) 4
- C) 256
- D) 16
- E) 2

**Resposta:** B

**Explicação:** O desvio padrão é a raiz quadrada da variância: √16 = 4. Ele fica na mesma unidade dos dados.

### 8
Um aluno tirou 6 na prova de peso 2 e 8 na prova de peso 3. Sua média ponderada é:

- A) 14
- B) 7,0
- C) 7,5
- D) 6,8
- E) 7,2

**Resposta:** E

**Explicação:** (6 × 2 + 8 × 3) ÷ (2 + 3) = (12 + 24) ÷ 5 = 36 ÷ 5 = 7,2.

### 9
A amplitude total dos dados 5, 9, 14 e 20 é:

- A) 20
- B) 12
- C) 15
- D) 5
- E) 48

**Resposta:** C

**Explicação:** Amplitude = maior valor − menor valor = 20 − 5 = 15.

### 10
Em uma pesquisa com 400 clientes de um banco que tem 50.000 clientes, os 400 entrevistados formam:

- A) a amostra
- B) a população
- C) o parâmetro
- D) a variável
- E) o censo

**Resposta:** A

**Explicação:** A população são os 50.000 clientes; a parte observada (400) é a amostra. Um censo observaria todos.

### 11
Na distribuição normal, é correto afirmar que:

- A) a média é sempre zero e o desvio padrão é sempre 1, em qualquer caso
- B) é sempre assimétrica à direita
- C) só assume valores inteiros
- D) é simétrica em torno da média, e média, mediana e moda coincidem
- E) a moda é sempre maior que a média

**Resposta:** D

**Explicação:** A curva normal tem forma de sino, simétrica em torno de μ. Média zero e desvio 1 caracterizam apenas a normal **padrão**.

### 12
Na amostragem aleatória simples:

- A) escolhem-se as pessoas mais fáceis de encontrar
- B) cada elemento da população tem a mesma chance de ser escolhido
- C) o pesquisador escolhe quem acha mais representativo
- D) escolhe-se um elemento a cada k, a partir de um início fixo não sorteado
- E) só se entrevistam voluntários

**Resposta:** B

**Explicação:** É a forma básica de amostragem probabilística: sorteio com chances iguais. Escolher os mais fáceis de encontrar é amostragem por conveniência.

### 13
Para mostrar a evolução mensal do faturamento de uma empresa ao longo de dois anos, o gráfico mais adequado é o de:

- A) mapa
- B) setores (pizza)
- C) pictograma sem escala
- D) dispersão sem ordem temporal
- E) linhas

**Resposta:** E

**Explicação:** O gráfico de linhas mostra bem a tendência ao longo do tempo. O de setores serve para mostrar partes de um todo.

### 14
A e B são eventos mutuamente exclusivos, com P(A) = 0,2 e P(B) = 0,3. Então P(A ou B) é:

- A) 0,44
- B) 0,06
- C) 0,5
- D) 0,1
- E) 0,6

**Resposta:** C

**Explicação:** Eventos mutuamente exclusivos não ocorrem juntos, então P(A ∩ B) = 0 e P(A ∪ B) = 0,2 + 0,3 = 0,5.

### 15
Em uma turma de 60 alunos, 15 são de Contabilidade. A frequência relativa desse grupo é:

- A) 25%
- B) 15%
- C) 40%
- D) 4%
- E) 75%

**Resposta:** A

**Explicação:** 15 ÷ 60 = 0,25 = 25%.

### 16
Ao lançar duas moedas honestas, a probabilidade de sair cara nas duas é:

- A) 3/4
- B) 1/2
- C) 1/3
- D) 1/4
- E) 1

**Resposta:** D

**Explicação:** Os lançamentos são independentes: 1/2 × 1/2 = 1/4.

### 17
Em uma planilha eletrônica em português, a função que calcula o desvio padrão de uma **amostra** é:

- A) =DESVPAD.P
- B) =DESVPAD.A
- C) =MÉDIA
- D) =MED
- E) =SOMA

**Resposta:** B

**Explicação:** DESVPAD.A usa n − 1 no denominador (amostra); DESVPAD.P usa N (população). MED retorna a mediana.

## Médio

### 1
A variância **populacional** dos valores 2, 4, 6 e 8 é:

- A) 4
- B) 6,67
- C) 20
- D) 2,24
- E) 5

**Resposta:** E

**Explicação:** Média = 5. Desvios ao quadrado: 9, 1, 1, 9 (soma 20). Variância populacional = 20 ÷ 4 = 5. A amostral seria 20 ÷ 3 ≈ 6,67.

### 2
Uma carteira tem retorno médio de 50 e desvio padrão de 10. O coeficiente de variação é:

- A) 50%
- B) 5%
- C) 20%
- D) 10%
- E) 500%

**Resposta:** C

**Explicação:** CV = DP ÷ média = 10 ÷ 50 = 0,20 = 20%. O CV mede a dispersão relativa e permite comparar conjuntos com médias diferentes.

### 3
O setor A tem salário médio de R$ 100 (DP = 20) e o setor B, de R$ 40 (DP = 10). Quanto à dispersão **relativa**:

- A) B é mais disperso, com CV de 25% contra 20% de A
- B) A é mais disperso, porque tem DP maior
- C) os dois têm a mesma dispersão
- D) não é possível comparar
- E) A é mais disperso, com CV de 50%

**Resposta:** A

**Explicação:** CV de A = 20/100 = 20%; CV de B = 10/40 = 25%. Em termos relativos, B varia mais, embora seu desvio padrão seja menor.

### 4
Uma urna tem 5 bolas vermelhas e 3 azuis. Retiram-se duas bolas, sem reposição. A probabilidade de as duas serem vermelhas é:

- A) 1/2
- B) 25/64
- C) 5/8
- D) 5/14
- E) 3/28

**Resposta:** D

**Explicação:** 5/8 × 4/7 = 20/56 = 5/14. Sem reposição, a segunda retirada depende da primeira.

### 5
Se P(A) = 0,5, P(B) = 0,4 e P(A ∩ B) = 0,2, então P(A ∪ B) é:

- A) 0,9
- B) 0,7
- C) 0,2
- D) 1,1
- E) 0,5

**Resposta:** B

**Explicação:** P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 0,5 + 0,4 − 0,2 = 0,7.

### 6
A e B são independentes, com P(A) = 0,3 e P(B) = 0,5. A probabilidade de ocorrerem os dois é:

- A) 0,35
- B) 0,8
- C) 0,2
- D) 0,65
- E) 0,15

**Resposta:** E

**Explicação:** Para eventos independentes, P(A ∩ B) = P(A) × P(B) = 0,3 × 0,5 = 0,15.

### 7
Uma variável aleatória X assume os valores 0, 1 e 2 com probabilidades 0,2, 0,5 e 0,3. A esperança E(X) é:

- A) 1,5
- B) 1,0
- C) 1,1
- D) 0,9
- E) 3,0

**Resposta:** C

**Explicação:** E(X) = 0 × 0,2 + 1 × 0,5 + 2 × 0,3 = 0 + 0,5 + 0,6 = 1,1.

### 8
Uma moeda honesta é lançada 3 vezes. A probabilidade de sair exatamente 2 caras é:

- A) 0,375
- B) 0,25
- C) 0,5
- D) 0,125
- E) 0,667

**Resposta:** A

**Explicação:** Binomial: C(3,2) × 0,5² × 0,5 = 3 × 0,125 = 0,375.

### 9
Em 100 notas fiscais, a chance de cada uma ter erro é 20%, de forma independente. A média e a variância do número de notas com erro são:

- A) 20 e 4
- B) 20 e 20
- C) 80 e 16
- D) 20 e 16
- E) 16 e 20

**Resposta:** D

**Explicação:** Binomial: média = np = 100 × 0,2 = 20; variância = np(1 − p) = 100 × 0,2 × 0,8 = 16 (desvio padrão de 4).

### 10
As notas de uma prova seguem distribuição normal com média 70 e desvio padrão 10. O escore z de quem tirou 85 é:

- A) 15
- B) 1,5
- C) 0,15
- D) 8,5
- E) −1,5

**Resposta:** B

**Explicação:** z = (85 − 70) ÷ 10 = 1,5. O aluno está 1,5 desvio padrão acima da média.

### 11
Em uma distribuição aproximadamente normal, a porcentagem aproximada dos dados entre μ − 2σ e μ + 2σ é:

- A) 90%
- B) 68%
- C) 99,7%
- D) 50%
- E) 95%

**Resposta:** E

**Explicação:** Pela regra empírica: cerca de 68% em ±1σ, 95% em ±2σ e 99,7% em ±3σ.

### 12
Uma auditoria divide as contas a receber em três faixas de valor e sorteia amostras dentro de cada faixa, proporcionalmente ao tamanho. Esse tipo de amostragem é:

- A) por conveniência
- B) por conglomerados
- C) estratificada
- D) sistemática
- E) por cotas sem sorteio

**Resposta:** C

**Explicação:** Na amostragem estratificada, a população é dividida em grupos homogêneos (estratos) e sorteia-se dentro de cada um. Isso reduz a variabilidade da estimativa.

### 13
A população tem desvio padrão σ = 12. Para uma amostra de n = 36, o erro padrão da média é:

- A) 2
- B) 12
- C) 0,33
- D) 6
- E) 72

**Resposta:** A

**Explicação:** Erro padrão = σ ÷ √n = 12 ÷ 6 = 2.

### 14
Amostra de n = 100, média amostral 50 e σ = 10 conhecido. O intervalo de 95% de confiança para a média (z = 1,96) é:

- A) [40; 60]
- B) [30,4; 69,6]
- C) [49,804; 50,196]
- D) [48,04; 51,96]
- E) [48; 52] exatamente, com 99% de confiança

**Resposta:** D

**Explicação:** Margem = 1,96 × 10 ÷ √100 = 1,96. Intervalo: 50 ± 1,96 = [48,04; 51,96].

### 15
Chegam em média 2 clientes por hora a um caixa, segundo uma distribuição de Poisson. A probabilidade de nenhum cliente chegar em uma hora é aproximadamente:

- A) 27,1%
- B) 13,5%
- C) 50%
- D) 2%
- E) 0%

**Resposta:** B

**Explicação:** P(X = 0) = e^(−2) ≈ 0,1353, ou cerca de 13,5%.

### 16
Em um diagrama de caixa (boxplot), Q1 = 20 e Q3 = 35. A amplitude interquartil é:

- A) 35
- B) 27,5
- C) 55
- D) 20
- E) 15

**Resposta:** E

**Explicação:** Amplitude interquartil = Q3 − Q1 = 35 − 20 = 15. Ela abrange os 50% centrais dos dados.

### 17
Os salários de uma pequena empresa são R$ 2.000, 2.100, 2.200, 2.300 e 30.000 (o do dono). A medida de posição que melhor representa o salário típico é:

- A) a amplitude
- B) a média, porque usa todos os valores
- C) a mediana, porque não é afetada pelo valor extremo
- D) a variância
- E) o maior valor

**Resposta:** C

**Explicação:** A média (R$ 7.720) é puxada pelo valor extremo. A mediana (R$ 2.200) representa melhor o salário típico.

## Difícil

### 1
Na auditoria de uma empresa, 2% das notas têm erro. Um teste aponta "erro" em 90% das notas com erro e também, por engano, em 5% das notas corretas. Se o teste apontou erro, a probabilidade de a nota realmente ter erro é aproximadamente:

- A) 27%
- B) 90%
- C) 2%
- D) 50%
- E) 95%

**Resposta:** A

**Explicação:** Bayes: P(erro e positivo) = 0,02 × 0,9 = 0,018; P(correta e positivo) = 0,98 × 0,05 = 0,049. P(erro | positivo) = 0,018 ÷ 0,067 ≈ 0,269. Como os erros são raros, muitos alertas são falsos.

### 2
Cada peça de um lote tem 10% de chance de ser defeituosa, de forma independente. Em 5 peças, a probabilidade de pelo menos uma ser defeituosa é aproximadamente:

- A) 59%
- B) 50%
- C) 10%
- D) 41%
- E) 33%

**Resposta:** D

**Explicação:** P(nenhuma defeituosa) = 0,9⁵ ≈ 0,5905. P(pelo menos uma) = 1 − 0,5905 ≈ 0,4095.

### 3
Para estimar a média com margem de erro de 4 unidades, 95% de confiança (z = 1,96) e σ = 20, o tamanho mínimo da amostra é:

- A) 96
- B) 97
- C) 10
- D) 385
- E) 49

**Resposta:** B

**Explicação:** n = (z·σ/E)² = (1,96 × 20 ÷ 4)² = 9,8² = 96,04. Arredonda-se sempre **para cima**: 97.

### 4
Em uma pesquisa com 600 clientes, 40% aprovaram um novo serviço. O intervalo de 95% de confiança para a proporção (z = 1,96) é aproximadamente:

- A) de 20% a 60%
- B) de 38% a 42%
- C) de 30% a 50%
- D) de 39,6% a 40,4%
- E) de 36,1% a 43,9%

**Resposta:** E

**Explicação:** Erro padrão = √(0,4 × 0,6 ÷ 600) = √0,0004 = 0,02. Margem = 1,96 × 0,02 ≈ 0,039. Intervalo: 0,40 ± 0,039.

### 5
Os salários de uma categoria seguem distribuição normal com média de R$ 3.000 e desvio padrão de R$ 500. A proporção aproximada de salários acima de R$ 4.000 é:

- A) 16%
- B) 5%
- C) 2,3%
- D) 0,1%
- E) 47,7%

**Resposta:** C

**Explicação:** z = (4.000 − 3.000) ÷ 500 = 2. P(Z > 2) ≈ 0,0228, ou cerca de 2,3%.

### 6
X tem variância 4. A variância de Y = 3X + 10 é:

- A) 36
- B) 12
- C) 22
- D) 46
- E) 4

**Resposta:** A

**Explicação:** Var(aX + b) = a²·Var(X). A constante somada não altera a dispersão: 3² × 4 = 36.

### 7
Um relatório diz: "o intervalo de 95% de confiança para o prazo médio de recebimento é de 28 a 34 dias". A interpretação correta é:

- A) há 5% de chance de a média amostral estar errada em todos os casos
- B) 95% dos clientes pagam entre 28 e 34 dias
- C) a média verdadeira muda 95% das vezes
- D) se o procedimento fosse repetido em muitas amostras, cerca de 95% dos intervalos construídos conteriam a verdadeira média
- E) 95% das amostras terão média exatamente igual a 31

**Resposta:** D

**Explicação:** A confiança se refere ao método. O intervalo trata da média da população, e não de clientes individuais.

### 8
Dados agrupados: classe 0 a 10 com 5 observações; 10 a 20 com 10; 20 a 30 com 5. A média estimada pelos pontos médios é:

- A) 10
- B) 15
- C) 20
- D) 16,7
- E) 12,5

**Resposta:** B

**Explicação:** Pontos médios: 5, 15 e 25. Média = (5 × 5 + 15 × 10 + 25 × 5) ÷ 20 = (25 + 150 + 125) ÷ 20 = 300 ÷ 20 = 15.

### 9
Uma comissão de 3 pessoas é sorteada entre 5 homens e 4 mulheres. A probabilidade de a comissão ter exatamente 2 mulheres é:

- A) 1/2
- B) 1/3
- C) 4/9
- D) 2/9
- E) 5/14

**Resposta:** E

**Explicação:** Casos favoráveis: C(4,2) × C(5,1) = 6 × 5 = 30. Total: C(9,3) = 84. Probabilidade = 30/84 = 5/14.

### 10
Para construir um intervalo de confiança para a média com amostra pequena (n = 12), população aproximadamente normal e desvio padrão populacional **desconhecido**, usa-se:

- A) a distribuição de Poisson
- B) a distribuição z, com o desvio da amostra sem correção
- C) a distribuição t de Student com 11 graus de liberdade
- D) a distribuição binomial
- E) nenhuma distribuição

**Resposta:** C

**Explicação:** Com σ desconhecido, estima-se o desvio pela amostra e usa-se a t de Student com n − 1 graus de liberdade, que tem caudas mais pesadas que a normal.

### 11
Em média ocorrem 3 reclamações por dia (Poisson). A probabilidade de ocorrer no máximo 1 reclamação em um dia é aproximadamente:

- A) 19,9%
- B) 5,0%
- C) 14,9%
- D) 42,3%
- E) 80,1%

**Resposta:** A

**Explicação:** P(X ≤ 1) = e^(−3)(1 + 3) = 4e^(−3) ≈ 4 × 0,0498 ≈ 0,199.

### 12
Um estudo encontrou correlação de −0,9 entre o prazo médio de estocagem e o giro do estoque. É correto afirmar que:

- A) a correlação prova que uma variável causa a outra
- B) não há relação entre as variáveis
- C) há relação positiva fraca
- D) há forte associação linear negativa, mas a correlação, sozinha, não prova relação de causa e efeito
- E) 90% da variação de uma é causada pela outra

**Resposta:** D

**Explicação:** Um r próximo de −1 indica forte relação linear inversa. Correlação não implica causalidade. Além disso, a parte da variação explicada é r² = 0,81, e não 0,9.

### 13
As notas de um concurso seguem normal com média 60 e desvio padrão 10. Para estar entre os 10% melhores (z ≈ 1,28), o candidato precisa de nota mínima de aproximadamente:

- A) 70
- B) 72,8
- C) 61,3
- D) 80
- E) 66,4

**Resposta:** B

**Explicação:** x = μ + z·σ = 60 + 1,28 × 10 = 72,8.

### 14
A variância **amostral** dos valores 3, 5 e 7 é:

- A) 5
- B) 2,67
- C) 2
- D) 8
- E) 4

**Resposta:** E

**Explicação:** Média = 5; soma dos quadrados dos desvios = 4 + 0 + 4 = 8. Variância amostral = 8 ÷ (3 − 1) = 4 (desvio padrão de 2).

### 15
Mantidos os demais fatores, o que acontece com a amplitude de um intervalo de confiança quando o nível de confiança sobe de 95% para 99% e quando o tamanho da amostra aumenta?

- A) Os dois estreitam o intervalo
- B) Os dois alargam o intervalo
- C) Aumentar a confiança alarga o intervalo; aumentar a amostra o estreita
- D) Aumentar a confiança estreita o intervalo; aumentar a amostra o alarga
- E) Nenhum dos dois altera o intervalo

**Resposta:** C

**Explicação:** O valor de z passa de 1,96 para cerca de 2,58, o que alarga o intervalo. Com n maior, o erro padrão σ/√n diminui e o intervalo estreita.

### 16
Todos os salários de uma empresa sofreram reajuste de 10%. Antes, a média era R$ 3.000 e o desvio padrão, R$ 600. Depois do reajuste:

- A) a média passa a R$ 3.300, o desvio padrão a R$ 660 e o coeficiente de variação continua 20%
- B) a média passa a R$ 3.300 e o desvio padrão continua R$ 600
- C) a média e o desvio padrão continuam iguais
- D) o coeficiente de variação passa a 22%
- E) a média passa a R$ 3.010

**Resposta:** A

**Explicação:** Multiplicar todos os dados por 1,1 multiplica a média e o desvio padrão por 1,1. Assim, o CV (600/3.000 = 660/3.300 = 20%) não muda. Somar um valor fixo mudaria a média, mas não o desvio.
