---
titulo: Métodos Quantitativos
provas: Faculdade
descricao: Testes de hipóteses, números-índices (Laspeyres, Paasche, deflacionamento), lógica simbólica, regressão linear simples e múltipla, séries temporais e aplicações em planilhas (UFCG 3103117).
fonte: Questão inédita (estilo prova de Métodos Quantitativos)
---

# Métodos Quantitativos

## Resumo

- **Teste de hipóteses:** H₀ (hipótese nula, de "nenhum efeito") × H₁ (alternativa). **Nível de significância α** = probabilidade de rejeitar H₀ verdadeira (**erro tipo I**). **Erro tipo II (β)** = não rejeitar H₀ falsa; **poder** = 1 − β. Rejeita-se H₀ se o **valor-p < α** ou se a estatística cai na região crítica.
- **Estatística do teste da média:** z = (x̄ − μ₀)/(σ/√n), ou t com n − 1 graus de liberdade se σ for desconhecido. Valores críticos usuais: 1,96 (bilateral, 5%) e 1,645 (unilateral, 5%).
- **Números-índices:** simples = (p₁/p₀) × 100. **Laspeyres** pondera pelas quantidades da **base**; **Paasche**, pelas quantidades **atuais**. **Deflacionar:** valor real = valor nominal ÷ índice de preços.
- **Lógica:** conjunção (∧) só é V se as duas forem V; disjunção (∨) só é F se as duas forem F; condicional (→) só é F em V → F; bicondicional (↔) é V quando os valores coincidem. Uma tabela-verdade com n proposições tem 2ⁿ linhas.
- **Negações:** ~(p ∧ q) ≡ ~p ∨ ~q; ~(p ∨ q) ≡ ~p ∧ ~q; ~(p → q) ≡ p ∧ ~q. Equivalente da condicional: ~q → ~p (contrapositiva) e ~p ∨ q.
- **Regressão simples:** ŷ = a + bx, com b = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² e a = ȳ − b·x̄. **R²** = parte da variação de y explicada pelo modelo (na simples, R² = r²).
- **Regressão múltipla:** cada coeficiente mede o efeito de uma variável **mantidas as demais constantes**; R² ajustado penaliza variáveis inúteis; cuidado com a **multicolinearidade**.
- **Séries temporais:** tendência, sazonalidade, ciclo e componente irregular. Previsão por **média móvel**, **suavização exponencial** (Fₜ₊₁ = αYₜ + (1 − α)Fₜ) e regressão na tendência.
- **Planilhas:** =INCLINAÇÃO, =INTERCEPÇÃO, =RQUAD, =PREVISÃO.LINEAR, =PROJ.LIN, =TESTE.T, =CORREL.

## Fácil

### 1
Em um teste de hipóteses, a hipótese nula (H₀) geralmente representa:

- A) a conclusão final do estudo
- B) aquilo que o pesquisador quer provar, sempre aceita
- C) a situação de "nenhuma diferença" ou "nenhum efeito", que só é rejeitada diante de evidência suficiente
- D) a média da amostra
- E) o erro do tipo II

**Resposta:** C

**Explicação:** H₀ é a afirmação testada (por exemplo, μ = 100). O teste avalia se os dados trazem evidência suficiente para rejeitá-la em favor de H₁.

### 2
O **erro do tipo I** consiste em:

- A) rejeitar a hipótese nula quando ela é verdadeira
- B) não rejeitar a hipótese nula quando ela é falsa
- C) calcular a média errado
- D) usar uma amostra grande
- E) aceitar a hipótese alternativa verdadeira

**Resposta:** A

**Explicação:** A probabilidade do erro tipo I é o nível de significância α. Não rejeitar uma H₀ falsa é o erro tipo II (β).

### 3
Um teste foi feito com α = 5% e resultou em valor-p = 0,02. A decisão é:

- A) repetir o teste até o valor-p passar de 5%
- B) não rejeitar H₀, porque o valor-p é pequeno
- C) aceitar H₀ com 98% de certeza
- D) rejeitar H₀, porque o valor-p é menor que α
- E) concluir que H₁ é falsa

**Resposta:** D

**Explicação:** Valor-p menor que o nível de significância indica que os dados são pouco compatíveis com H₀. Por isso, rejeita-se H₀.

### 4
Um produto custava R$ 50 em 2020 e passou a custar R$ 65 em 2024. O índice de preço simples (base 2020 = 100) em 2024 é:

- A) 115
- B) 130
- C) 65
- D) 77
- E) 150

**Resposta:** B

**Explicação:** Índice = 65 ÷ 50 × 100 = 130. O preço subiu 30% no período.

### 5
O índice de Laspeyres usa como pesos:

- A) números aleatórios
- B) as quantidades do período atual
- C) a média das quantidades dos dois períodos
- D) apenas os preços
- E) as quantidades do período-base

**Resposta:** E

**Explicação:** O Laspeyres mede o custo atual de uma cesta fixa do período-base. O Paasche usa a cesta do período atual.

### 6
A proposição composta "p ∧ q" (p e q) é verdadeira somente quando:

- A) ambas são falsas
- B) pelo menos uma delas é verdadeira
- C) p e q são ambas verdadeiras
- D) p é falsa e q é verdadeira
- E) sempre

**Resposta:** C

**Explicação:** Na conjunção, basta uma componente falsa para o todo ser falso.

### 7
A condicional "se p, então q" (p → q) é falsa somente quando:

- A) p é verdadeira e q é falsa
- B) p é falsa e q é verdadeira
- C) ambas são falsas
- D) ambas são verdadeiras
- E) nunca é falsa

**Resposta:** A

**Explicação:** A condicional só "falha" quando a condição se cumpre (p verdadeira) e o resultado prometido não ocorre (q falsa).

### 8
Quantas linhas tem a tabela-verdade de uma proposição composta por 3 proposições simples distintas?

- A) 9
- B) 6
- C) 3
- D) 8
- E) 16

**Resposta:** D

**Explicação:** Cada proposição tem 2 valores possíveis: 2³ = 8 combinações.

### 9
Na reta de regressão ŷ = 200 + 5x, em que y são as vendas e x é o gasto com propaganda (ambos em mil reais), o coeficiente 5 significa que:

- A) as vendas são sempre 5 mil reais
- B) cada mil reais a mais em propaganda está associado, em média, a 5 mil reais a mais em vendas
- C) sem propaganda, as vendas são 5 mil reais
- D) a correlação é 5
- E) o R² é 5%

**Resposta:** B

**Explicação:** A inclinação b indica a variação média de y para cada unidade a mais de x. O intercepto (200) é o valor previsto de y quando x = 0.

### 10
O coeficiente de determinação R² = 0,80 em uma regressão significa que:

- A) o modelo erra 80% das vezes
- B) a correlação é 0,80
- C) 80% das previsões são exatas
- D) a inclinação é 0,80
- E) 80% da variação de y é explicada pelo modelo

**Resposta:** E

**Explicação:** O R² mede a proporção da variabilidade de y explicada pela regressão. Na regressão simples, a correlação seria r = ±√0,80 ≈ ±0,89.

### 11
Os quatro componentes clássicos de uma série temporal são:

- A) receita, custo, despesa e lucro
- B) média, mediana, moda e variância
- C) tendência, sazonalidade, ciclo e variação irregular
- D) Laspeyres, Paasche, Fisher e Marshall
- E) conjunção, disjunção, condicional e bicondicional

**Resposta:** C

**Explicação:** A tendência é o movimento de longo prazo; a sazonalidade são padrões que se repetem dentro do ano; o ciclo são oscilações de vários anos; o irregular é o ruído.

### 12
O aumento das vendas de uma loja todo mês de dezembro, por causa do Natal, é um exemplo de:

- A) sazonalidade
- B) tendência
- C) ciclo econômico
- D) variação irregular
- E) multicolinearidade

**Resposta:** A

**Explicação:** Padrões que se repetem em períodos fixos do ano (estações, datas comemorativas) formam o componente sazonal.

### 13
As vendas dos últimos três meses foram 10, 12 e 14 mil unidades. A previsão para o mês seguinte por média móvel de 3 períodos é:

- A) 36 mil
- B) 14 mil
- C) 16 mil
- D) 12 mil
- E) 13 mil

**Resposta:** D

**Explicação:** (10 + 12 + 14) ÷ 3 = 12. A média móvel suaviza oscilações, mas reage com atraso a uma tendência de crescimento.

### 14
A negação de "O balanço está correto e o relatório foi enviado" é:

- A) O balanço não está correto e o relatório não foi enviado.
- B) O balanço não está correto ou o relatório não foi enviado.
- C) O balanço está correto ou o relatório foi enviado.
- D) Se o balanço está correto, o relatório não foi enviado.
- E) O balanço está incorreto e o relatório foi enviado.

**Resposta:** B

**Explicação:** Pela lei de De Morgan, ~(p ∧ q) ≡ ~p ∨ ~q: troca-se "e" por "ou" e negam-se as duas partes.

### 15
Deflacionar uma série de valores nominais significa:

- A) converter os valores para dólar
- B) somar a inflação aos valores
- C) multiplicar os valores pela taxa de juros
- D) excluir os meses de inflação alta
- E) dividir os valores pelo índice de preços, para expressá-los em valores reais (de poder de compra constante)

**Resposta:** E

**Explicação:** O deflacionamento elimina o efeito da inflação e permite comparar valores de datas diferentes em termos reais.

### 16
Em uma regressão linear simples, a correlação r = −0,9 indica:

- A) relação positiva fraca
- B) ausência de relação
- C) forte relação linear negativa entre as variáveis
- D) que y causa x
- E) que o R² é −0,81

**Resposta:** C

**Explicação:** Um r próximo de −1 indica que, quando x aumenta, y tende a diminuir, de forma quase linear. O R² seria 0,81 (nunca negativo).

### 17
Em uma planilha eletrônica em português, a função que retorna o coeficiente angular (inclinação) da reta de regressão é:

- A) =INCLINAÇÃO
- B) =MÉDIA
- C) =SOMA
- D) =SE
- E) =PROCV

**Resposta:** A

**Explicação:** =INCLINAÇÃO(valores_y; valores_x) retorna b; =INTERCEPÇÃO, o a; =RQUAD, o R²; =PREVISÃO.LINEAR, a previsão para um novo x.

## Médio

### 1
Uma máquina deveria encher pacotes com média de 100 g (σ = 15 g). Em uma amostra de 36 pacotes, a média foi 105 g. A estatística z e a decisão a 5% (bilateral, z crítico = 1,96) são:

- A) z = 5,0; não se rejeita H₀
- B) z = 0,33; não se rejeita H₀
- C) z = 2,0; não se rejeita H₀
- D) z = 2,0; rejeita-se H₀
- E) z = 1,0; rejeita-se H₀

**Resposta:** D

**Explicação:** Erro padrão = 15 ÷ √36 = 2,5. z = (105 − 100) ÷ 2,5 = 2,0. Como 2,0 > 1,96, a diferença é estatisticamente significativa a 5%.

### 2
Uma amostra de 25 notas fiscais teve prazo médio de pagamento de 52 dias, com desvio padrão amostral de 5 dias. Para testar H₀: μ = 50 (σ desconhecido), a estatística do teste é:

- A) z = 0,4
- B) t = 2,0, com 24 graus de liberdade
- C) t = 10, com 25 graus de liberdade
- D) t = 0,4, com 24 graus de liberdade
- E) z = 2,0, porque o desvio é conhecido

**Resposta:** B

**Explicação:** t = (52 − 50) ÷ (5 ÷ √25) = 2 ÷ 1 = 2,0, com n − 1 = 24 graus de liberdade. Usa-se a t de Student porque σ é estimado pela amostra.

### 3
Um teste é feito a 5% de significância. Ao reduzir α para 1%, mantidos os demais fatores:

- A) nada muda
- B) diminuem os dois erros
- C) aumentam os dois erros
- D) o erro tipo I aumenta
- E) diminui a chance de erro tipo I, mas aumenta a de erro tipo II (o poder cai)

**Resposta:** E

**Explicação:** Exigir mais evidência para rejeitar H₀ protege contra falsos positivos, mas torna mais difícil detectar um efeito real. A forma de reduzir os dois erros ao mesmo tempo é aumentar a amostra.

### 4
Cesta com dois produtos. Produto A: p₀ = 10, q₀ = 5, p₁ = 12, q₁ = 4. Produto B: p₀ = 20, q₀ = 2, p₁ = 22, q₁ = 3. O índice de preços de Laspeyres (base = 100) é aproximadamente:

- A) 110,0
- B) 114,0
- C) 115,6
- D) 120,0
- E) 104,0

**Resposta:** C

**Explicação:** Laspeyres = Σp₁q₀ ÷ Σp₀q₀ = (12 × 5 + 22 × 2) ÷ (10 × 5 + 20 × 2) = 104 ÷ 90 ≈ 1,156, ou seja, 115,6.

### 5
Com os mesmos dados, o índice de preços de Paasche é:

- A) 114,0
- B) 115,6
- C) 104,0
- D) 120,0
- E) 110,0

**Resposta:** A

**Explicação:** Paasche = Σp₁q₁ ÷ Σp₀q₁ = (12 × 4 + 22 × 3) ÷ (10 × 4 + 20 × 3) = 114 ÷ 100 = 1,14, ou seja, 114.

### 6
O salário de um analista passou de R$ 3.000 para R$ 3.600 em um ano em que a inflação foi de 10%. O aumento **real** do salário foi de aproximadamente:

- A) 30%
- B) 20%
- C) 10%
- D) 9,1%
- E) 2%

**Resposta:** D

**Explicação:** Salário real = 3.600 ÷ 1,10 ≈ 3.272,73. Aumento real = 3.272,73 ÷ 3.000 − 1 ≈ 9,1%, e não 20% − 10% = 10%.

### 7
Um índice de preços subiu 10% no primeiro ano e 5% no segundo. A variação acumulada nos dois anos é:

- A) 15%
- B) 15,5%
- C) 5%
- D) 7,5%
- E) 50%

**Resposta:** B

**Explicação:** As variações se acumulam multiplicando os fatores: 1,10 × 1,05 = 1,155, ou 15,5%.

### 8
A proposição "Se o contador revisou, então o balanço está correto" é logicamente equivalente a:

- A) O contador revisou ou o balanço está correto.
- B) Se o balanço está correto, então o contador revisou.
- C) Se o contador não revisou, então o balanço não está correto.
- D) O contador revisou e o balanço não está correto.
- E) Se o balanço não está correto, então o contador não revisou.

**Resposta:** E

**Explicação:** p → q equivale à contrapositiva ~q → ~p e também a ~p ∨ q. As alternativas B e C (recíproca e inversa) não são equivalentes.

### 9
A negação de "Se a empresa lucrou, então distribuiu dividendos" é:

- A) A empresa não lucrou e distribuiu dividendos.
- B) Se a empresa não lucrou, então não distribuiu dividendos.
- C) A empresa lucrou e não distribuiu dividendos.
- D) A empresa não lucrou ou não distribuiu dividendos.
- E) Se a empresa distribuiu dividendos, então lucrou.

**Resposta:** C

**Explicação:** ~(p → q) ≡ p ∧ ~q. A única forma de a condicional ser falsa é a condição ocorrer sem a consequência.

### 10
Dados: x = 1, 2, 3, 4, 5 e y = 2, 4, 5, 4, 5. A reta de mínimos quadrados é:

- A) ŷ = 2,2 + 0,6x
- B) ŷ = 0,6 + 2,2x
- C) ŷ = 4 + 3x
- D) ŷ = 2 + x
- E) ŷ = 1 + 0,8x

**Resposta:** A

**Explicação:** x̄ = 3, ȳ = 4. Σ(x − x̄)(y − ȳ) = 6; Σ(x − x̄)² = 10. b = 0,6; a = 4 − 0,6 × 3 = 2,2.

### 11
Com a reta ŷ = 2,2 + 0,6x, a previsão de y para x = 6 é:

- A) 2,8
- B) 6,0
- C) 3,8
- D) 5,8
- E) 13,4

**Resposta:** D

**Explicação:** ŷ = 2,2 + 0,6 × 6 = 2,2 + 3,6 = 5,8. Previsões fora da faixa observada de x (extrapolação) devem ser vistas com cautela.

### 12
Na suavização exponencial simples, com α = 0,2, previsão anterior de 100 e valor real observado de 120, a nova previsão é:

- A) 120
- B) 104
- C) 110
- D) 100
- E) 116

**Resposta:** B

**Explicação:** Fₜ₊₁ = αYₜ + (1 − α)Fₜ = 0,2 × 120 + 0,8 × 100 = 24 + 80 = 104.

### 13
O índice sazonal de dezembro de uma loja é 1,25. Se a média mensal dessazonalizada prevista é de R$ 80.000, a previsão de vendas para dezembro é:

- A) R$ 105.000
- B) R$ 80.000
- C) R$ 64.000
- D) R$ 125.000
- E) R$ 100.000

**Resposta:** E

**Explicação:** O índice indica que dezembro vende 25% acima da média: 80.000 × 1,25 = R$ 100.000.

### 14
Em uma regressão múltipla, Vendas = 50 + 3·Propaganda − 2·Preço, o coeficiente −2 indica que:

- A) as vendas caem 2% sempre
- B) o preço não afeta as vendas
- C) cada unidade a mais de preço reduz as vendas em 2 unidades, em média, mantida constante a propaganda
- D) a propaganda reduz as vendas
- E) o R² é −2

**Resposta:** C

**Explicação:** Na regressão múltipla, cada coeficiente mede o efeito parcial da variável, "ceteris paribus" em relação às demais incluídas no modelo.

### 15
Ao incluir novas variáveis em uma regressão múltipla, o R² comum nunca diminui. Por isso, para comparar modelos com números diferentes de variáveis, usa-se:

- A) o R² ajustado, que penaliza a inclusão de variáveis que pouco contribuem
- B) somente o intercepto
- C) a média de y
- D) o número de observações
- E) o valor da maior variável

**Resposta:** A

**Explicação:** O R² ajustado considera os graus de liberdade e pode cair se a nova variável não melhorar o modelo o suficiente.

### 16
A proposição "p ∨ ~p" é:

- A) falsa quando p é verdadeira
- B) uma contradição, sempre falsa
- C) uma contingência
- D) uma tautologia, sempre verdadeira
- E) uma condicional

**Resposta:** D

**Explicação:** Uma proposição ou é verdadeira ou é falsa. Por isso "p ou não p" é sempre verdadeira. Já "p ∧ ~p" é contradição.

### 17
Uma empresa afirma que 50% dos clientes preferem o novo produto. Em uma amostra de 400, 56% preferiram. A estatística z do teste de proporção é:

- A) 0,06
- B) 2,4
- C) 1,2
- D) 24
- E) 0,24

**Resposta:** B

**Explicação:** Erro padrão sob H₀ = √(0,5 × 0,5 ÷ 400) = 0,025. z = (0,56 − 0,50) ÷ 0,025 = 2,4. A 5% (bilateral), rejeita-se H₀.

## Difícil

### 1
Com os dados x = 1, 2, 3, 4, 5 e y = 2, 4, 5, 4, 5, o coeficiente de correlação r e o R² são, aproximadamente:

- A) r ≈ −0,77 e R² = 0,60
- B) r = 0,60 e R² = 0,36
- C) r ≈ 0,77 e R² = 0,77
- D) r = 1 e R² = 1
- E) r ≈ 0,77 e R² = 0,60

**Resposta:** E

**Explicação:** Sxy = 6, Sxx = 10, Syy = 6. r = 6 ÷ √(10 × 6) = 6 ÷ √60 ≈ 0,775. R² = r² = 0,60: o modelo explica 60% da variação de y.

### 2
Em um teste bilateral com z observado = 2,0, o valor-p é aproximadamente:

- A) 0,977
- B) 0,023
- C) 0,046
- D) 0,05 exatamente
- E) 0,20

**Resposta:** C

**Explicação:** P(Z > 2) ≈ 0,0228. Por ser bilateral, soma-se a cauda inferior: 2 × 0,0228 ≈ 0,0455. Com α = 5%, rejeita-se H₀; com α = 1%, não.

### 3
Um auditor quer testar se o prazo médio de recebimento **aumentou** em relação a 40 dias. As hipóteses e o tipo de teste adequados são:

- A) H₀: μ ≤ 40 (ou μ = 40) e H₁: μ > 40, teste unilateral à direita
- B) H₀: μ > 40 e H₁: μ ≤ 40
- C) H₀: μ = 40 e H₁: μ ≠ 40, obrigatoriamente bilateral
- D) H₀: x̄ = 40 e H₁: x̄ > 40
- E) não é possível testar

**Resposta:** A

**Explicação:** A alternativa expressa o que se quer demonstrar (aumento). As hipóteses tratam do parâmetro μ, não da média amostral x̄. Com 5% unilateral, o z crítico é 1,645.

### 4
Considere as afirmações sobre números-índices:

I. Quando os consumidores trocam produtos que ficaram mais caros por outros, o Laspeyres tende a superestimar a inflação em relação ao Paasche.
II. O índice de Fisher é a média geométrica dos índices de Laspeyres e de Paasche.
III. O IPCA é um índice que usa pesos baseados em pesquisa de orçamentos familiares.

Está correto o que se afirma em:

- A) I, apenas
- B) I e II, apenas
- C) II e III, apenas
- D) I, II e III
- E) III, apenas

**Resposta:** D

**Explicação:** A cesta fixa do Laspeyres não capta a substituição, o que tende a superestimar a alta de preços. O Fisher é √(L × P). O IPCA, do IBGE, usa pesos da Pesquisa de Orçamentos Familiares (POF).

### 5
Um índice tem os valores 100 (2021), 110 (2022) e 132 (2023). Mudando a base para 2022 = 100, o valor de 2023 passa a ser:

- A) 132
- B) 120
- C) 122
- D) 110
- E) 145,2

**Resposta:** B

**Explicação:** Divide-se cada valor pelo valor do novo ano-base: 132 ÷ 110 × 100 = 120.

### 6
Em uma regressão múltipla, duas variáveis explicativas (área da loja e número de funcionários) têm correlação de 0,95 entre si. O problema mais provável é:

- A) ausência de intercepto
- B) sazonalidade
- C) erro tipo I garantido
- D) R² obrigatoriamente baixo
- E) multicolinearidade, que torna instáveis e imprecisos os coeficientes individuais

**Resposta:** E

**Explicação:** Com variáveis explicativas muito correlacionadas, é difícil separar o efeito de cada uma. Os erros padrão crescem, embora o modelo como um todo possa prever bem.

### 7
Considere: p = "a receita cresceu" (V), q = "o custo caiu" (F), r = "o lucro aumentou" (V). O valor lógico de (p ∧ q) → r e de (p ∨ q) ↔ ~r é, respectivamente:

- A) V e V
- B) F e V
- C) V e F
- D) F e F
- E) V e indeterminado

**Resposta:** C

**Explicação:** p ∧ q = V ∧ F = F; F → V = V. p ∨ q = V; ~r = F; V ↔ F = F.

### 8
"Todo contador é registrado no CRC" e "Algum auditor não é registrado no CRC". Conclui-se, logicamente, que:

- A) algum auditor não é contador
- B) nenhum auditor é contador
- C) todo auditor é contador
- D) algum contador não é registrado
- E) nenhum contador é auditor

**Resposta:** A

**Explicação:** O auditor não registrado não pode ser contador, porque todo contador é registrado. Logo, existe pelo menos um auditor que não é contador. Não dá para afirmar que nenhum é.

### 9
Um analista ajustou a tendência linear das vendas trimestrais: ŷ = 500 + 20t (t = 1 no 1º trimestre de 2023). O índice sazonal do 4º trimestre é 1,10. A previsão para o 4º trimestre de 2025 (t = 12) é:

- A) 836
- B) 740
- C) 760
- D) 814
- E) 550

**Resposta:** D

**Explicação:** Tendência: 500 + 20 × 12 = 740. Com o fator sazonal: 740 × 1,10 = 814.

### 10
No teste t de um coeficiente da regressão, obteve-se valor-p = 0,40. A conclusão adequada a 5% é:

- A) o coeficiente é exatamente zero
- B) não há evidência suficiente de que o coeficiente seja diferente de zero; a variável pode não contribuir para explicar y
- C) a variável é a mais importante do modelo
- D) o R² é 40%
- E) deve-se rejeitar H₀

**Resposta:** B

**Explicação:** Valor-p alto significa que os dados são compatíveis com coeficiente nulo. "Não rejeitar H₀" não prova que H₀ é verdadeira; apenas indica falta de evidência.

### 11
Um gestor diz: "Nas lojas com mais seguranças, há mais furtos; logo, os seguranças causam furtos." O problema dessa conclusão é:

- A) ter amostra grande demais
- B) usar regressão linear
- C) usar média móvel
- D) a correlação ser sempre negativa
- E) confundir correlação com causalidade, ignorando uma variável comum (lojas maiores e mais movimentadas têm mais seguranças e mais furtos)

**Resposta:** E

**Explicação:** Uma terceira variável (tamanho e movimento da loja) pode explicar as duas. Regressões observacionais mostram associação, não necessariamente causa.

### 12
Na suavização exponencial, escolher um α próximo de 1 faz com que a previsão:

- A) seja sempre igual à média histórica
- B) ignore a última observação
- C) reaja rapidamente às observações mais recentes, sendo mais sensível ao ruído
- D) fique constante
- E) dependa só do primeiro dado

**Resposta:** C

**Explicação:** Com α alto, o último valor tem peso grande. Com α baixo, a previsão é mais suave e lenta para captar mudanças.

### 13
Considere as afirmações sobre a reta de mínimos quadrados:

I. A soma dos resíduos (y − ŷ) é zero.
II. A reta passa pelo ponto (x̄, ȳ).
III. Ela minimiza a soma dos valores absolutos dos resíduos.

Está correto o que se afirma em:

- A) I e II, apenas
- B) I, apenas
- C) III, apenas
- D) II e III, apenas
- E) I, II e III

**Resposta:** A

**Explicação:** O método minimiza a soma dos **quadrados** dos resíduos (III está errada). Como consequência, os resíduos somam zero e a reta passa pelo ponto médio.

### 14
Uma empresa quer saber se um treinamento aumentou a produtividade dos **mesmos** 20 funcionários (medida antes e depois). O teste mais adequado é:

- A) média móvel
- B) teste t para amostras independentes
- C) teste de proporção para uma amostra
- D) teste t para amostras pareadas (dependentes)
- E) índice de Laspeyres

**Resposta:** D

**Explicação:** Como cada funcionário é medido duas vezes, as observações são pareadas. Analisa-se a diferença "depois − antes" de cada um.

### 15
O PIB nominal de um país foi de 1.000 (ano 1) e 1.155 (ano 2). O deflator implícito subiu de 100 para 110. O crescimento real do PIB foi:

- A) 15,5%
- B) 5%
- C) 10%
- D) 25,5%
- E) 4,5%

**Resposta:** B

**Explicação:** PIB real no ano 2 = 1.155 ÷ 1,10 = 1.050. Crescimento real = 1.050 ÷ 1.000 − 1 = 5%.

### 16
Em uma planilha, um analista usou =PROJ.LIN(y; x1:x3; VERDADEIRO; VERDADEIRO). Essa função:

- A) faz a tabela-verdade
- B) calcula apenas a média de y
- C) desenha um gráfico de setores
- D) calcula o índice de Laspeyres
- E) estima uma regressão linear (inclusive múltipla) e pode retornar coeficientes, erros padrão, R² e outras estatísticas

**Resposta:** E

**Explicação:** PROJ.LIN (LINEST, em inglês) ajusta a reta ou o plano de mínimos quadrados. Com o último argumento VERDADEIRO, retorna estatísticas adicionais da regressão.
