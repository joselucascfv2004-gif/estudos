---
titulo: Risco, retorno e performance de carteiras
provas: Certificações
descricao: Retorno esperado, desvio padrão, correlação e diversificação, beta e CAPM, índices de Sharpe e Treynor, dominância, alavancagem e estratégias de rebalanceamento (buy and hold, constant mix, CPPI).
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Risco, retorno e performance de carteiras

Retorno esperado, desvio padrão, correlação e diversificação, beta e CAPM, índices de Sharpe e Treynor, dominância, alavancagem e estratégias de rebalanceamento (buy and hold, constant mix, CPPI).

## Resumo

- **Retorno da carteira:** média ponderada dos retornos dos ativos pelos pesos de cada um.
- **Risco (volatilidade):** desvio padrão dos retornos. Anualizar: vol anual = vol mensal · √12 (ou vol diária · √252).
- **Correlação:** vai de −1 a +1. Quanto menor a correlação entre os ativos, maior o ganho da diversificação (o risco da carteira cai abaixo da média dos riscos).
- **Beta:** sensibilidade do ativo ao mercado. Beta 1,2 → se o mercado sobe 10%, o ativo tende a subir 12%. Beta = covariância(ativo, mercado) ÷ variância do mercado.
- **CAPM:** retorno exigido = taxa livre de risco + beta · (retorno do mercado − taxa livre de risco).
- **Índice de Sharpe:** (retorno − taxa livre de risco) ÷ volatilidade. Mede retorno em excesso por unidade de risco total; quanto maior, melhor.
- **Índice de Treynor:** (retorno − taxa livre de risco) ÷ beta. Usa só o risco de mercado (sistemático).
- **Alavancagem:** amplia ganhos e perdas na mesma proporção sobre o capital próprio, e os juros da dívida pesam no resultado.
- **Estratégias de rebalanceamento:** **buy and hold** (compra e mantém, pesos variam), **constant mix** (volta sempre aos pesos-alvo: vende o que subiu, compra o que caiu) e **CPPI** (exposição ao risco = multiplicador · (carteira − piso), protege um valor mínimo).
- **Cenários:** retorno esperado = soma de (probabilidade · retorno) em cada cenário.

## Fácil

### 1
<!-- modelo: f16 -->
Uma ação pode render 0% (probabilidade de 25%), 8% (50%) ou 16% (25%). Qual é o retorno esperado?

- A) 12%
- B) 16%
- C) 8%
- D) 18%
- E) 24%

**Resposta:** C

**Explicação:** Ferramenta: retorno esperado = soma das probabilidades × retornos. 0,25 · 0 + 0,5 · 8 + 0,25 · 16. = 8%.

### 2
<!-- modelo: f11 -->
Fundo A: retorno 12% e volatilidade 2%. Fundo B: retorno 16% e volatilidade 9%. Com taxa livre de risco de 10%, qual teve a melhor relação risco-retorno pelo índice de Sharpe?

- A) são iguais
- B) o fundo A, porque oscilou menos, independentemente do retorno
- C) o fundo A (Sharpe 1 contra 0,67)
- D) o fundo B (Sharpe 1 contra 0,67)
- E) o fundo B, porque rendeu mais

**Resposta:** C

**Explicação:** Ferramenta: Sharpe compara retorno extra por unidade de risco. A: (12 − 10) ÷ 2 = 1. B: (16 − 10) ÷ 9 = 0,67. O fundo A entregou mais retorno por risco assumido.

### 3
<!-- modelo: f8 -->
Hoje a carteira tem R$ 90 mil em ações e R$ 40 mil em renda fixa. A meta é 60% em ações. Quanto vender de ações (e aplicar em renda fixa) para voltar à meta?

- A) R$ 6 mil
- B) R$ 78 mil
- C) R$ 36 mil
- D) R$ 40 mil
- E) R$ 12 mil

**Resposta:** E

**Explicação:** Ferramenta: rebalancear = voltar aos pesos-alvo. Total: R$ 130 mil; meta em ações: 60% = R$ 78 mil. Vender R$ 12 mil.

### 4
<!-- modelo: f3 -->
Uma carteira rendeu 13%, com beta de 0,5, num período em que a taxa livre de risco foi de 10%. Qual é o índice de Treynor?

- A) 3
- B) 26
- C) 0,17
- D) 6
- E) 1,5

**Resposta:** D

**Explicação:** Ferramenta: Treynor = (retorno − taxa livre de risco) / beta. (13 − 10) ÷ 0,5. = 6. Usa só o risco sistemático (beta), não a volatilidade total.

### 5
<!-- modelo: f6 -->
Um fundo multimercado rendeu 18% no ano, enquanto o CDI (seu benchmark) rendeu 15%. Qual foi o retorno ativo (excesso sobre o benchmark)?

- A) 2 pontos percentuais
- B) 3 pontos percentuais
- C) 20 pontos percentuais
- D) 33 pontos percentuais
- E) 18 pontos percentuais

**Resposta:** B

**Explicação:** Ferramenta: retorno ativo = retorno do fundo − benchmark. 18% − 15%. 3 p.p. O gestor superou o benchmark.

### 6
<!-- modelo: f10 -->
Um fundo tem volatilidade mensal de 4%. Qual é a volatilidade anualizada aproximada (use √12 ≈ 3,46)?

- A) 1,16%
- B) 13,84%
- C) 48%
- D) 47,89%
- E) 4%

**Resposta:** B

**Explicação:** Ferramenta: o risco cresce com a raiz do tempo. Para retornos independentes, σ anual = σ mensal · √12. 4% · 3,46 ≈ 13,84%.

### 7
<!-- modelo: f15 -->
Um ativo tem retorno médio de 8% e desvio padrão de 2%. Qual é o coeficiente de variação (risco por unidade de retorno)?

- A) 4
- B) 0,25
- C) 16
- D) 0,31
- E) 25

**Resposta:** B

**Explicação:** Ferramenta: CV = desvio padrão / média. Quanto menor o CV, menos risco por unidade de retorno. 2 ÷ 8 = 0,25.

### 8
<!-- modelo: f17 -->
A carteira de um cliente rendeu 9% no ano, com inflação de 4%. Qual foi a rentabilidade real?

- A) 4,81%
- B) 2,25%
- C) 5%
- D) 5,81%
- E) 13%

**Resposta:** A

**Explicação:** Ferramenta: Fisher. 1,09 ÷ 1,04 − 1. ≈ 4,81%.

### 9
<!-- modelo: f1 -->
Uma carteira tem 60% em um ativo com retorno esperado de 10% e 40% em outro com 15%. Qual é o retorno esperado da carteira?

- A) 25%
- B) 13%
- C) 12%
- D) 15%
- E) 12,5%

**Resposta:** C

**Explicação:** Ferramenta: retorno da carteira = média ponderada. 0,6 · 10% + 0,4 · 15%. = 12%.

### 10
<!-- modelo: f12 -->
A carteira de um fundo rendeu 10% brutos no ano, e o fundo cobra 1,5% ao ano de taxa de administração. Qual foi, aproximadamente, a rentabilidade da cota?

- A) 8,5%
- B) 9,85%
- C) 11,5%
- D) 6,67%
- E) 10%

**Resposta:** A

**Explicação:** Ferramenta: a taxa sai do patrimônio. A taxa de administração é provisionada diariamente e reduz a cota. ≈ 10% − 1,5% = 8,5%.

### 11
<!-- modelo: f4 -->
Uma carteira tem beta de 0,5 em relação ao Ibovespa. Se o índice subir 10%, qual é a variação esperada da carteira?

- A) alta de 20%
- B) alta de 5%
- C) alta de 3%
- D) alta de 10,5%
- E) alta de 10%

**Resposta:** B

**Explicação:** Ferramenta: beta mede a sensibilidade ao mercado. Beta 0,5: a carteira tende a variar 0,5 vezes o movimento do índice. 0,5 · 10% = 5%.

### 12
<!-- modelo: f13 -->
Uma carteira rendeu −10%, 15% e 10% em três anos seguidos. Qual é a rentabilidade acumulada?

- A) 15%
- B) 10,85%
- C) 5%
- D) 13,85%
- E) 15,85%

**Resposta:** D

**Explicação:** Ferramenta: acumular = multiplicar os fatores. 0,9 · 1,15 · 1,1 = 1,1385. Acumulado: 13,85%.

### 13
<!-- modelo: f9 -->
Dois ativos têm volatilidade de 20% e 10% e correlação +1. Uma carteira com 50% no primeiro e 50% no segundo tem que volatilidade?

- A) 17%
- B) 11,18%
- C) 5%
- D) 15%
- E) 30%

**Resposta:** D

**Explicação:** Ferramenta: correlação +1: sem benefício de diversificação. Com correlação perfeita, o risco da carteira é a média ponderada dos riscos. 0,5 · 20% + 0,5 · 10% = 15%.

### 14
<!-- modelo: f14 -->
Numa estratégia CPPI, a carteira vale R$ 100 mil, o piso é R$ 80 mil e o multiplicador é 4. Quanto deve ficar em ativos de risco?

- A) R$ 400 mil
- B) R$ 220 mil
- C) R$ 80 mil
- D) R$ 20 mil
- E) R$ 79 mil

**Resposta:** C

**Explicação:** Ferramenta: CPPI: exposição = multiplicador × colchão. Colchão = valor − piso = R$ 20 mil. 4 · 20 = R$ 80 mil em risco; o resto em ativos livres de risco.

### 15
<!-- modelo: f2 -->
Um fundo rendeu 18% no ano, com volatilidade (desvio padrão) de 14%. A taxa livre de risco foi 11%. Qual é o índice de Sharpe?

- A) 2
- B) 0,5
- C) 2,07
- D) 98
- E) 1,29

**Resposta:** B

**Explicação:** Ferramenta: Sharpe = (retorno − taxa livre de risco) / desvio padrão. (18% − 11%) ÷ 14%. = 0,5: quanto de retorno extra o fundo entregou por unidade de risco total.

### 16
<!-- modelo: f7 -->
Uma carteira começou com R$ 70 mil em ações e R$ 30 mil em renda fixa. As ações subiram 30% e a renda fixa ficou estável. Qual passou a ser o peso das ações?

- A) 91%
- B) 70%
- C) 85%
- D) 82,73%
- E) 75,21%

**Resposta:** E

**Explicação:** Ferramenta: peso = valor da classe / valor total. Ações: R$ 91 mil; total: R$ 121 mil. 91 ÷ 121 ≈ 75,21%. A carteira ficou mais arriscada que o planejado.

### 17
<!-- modelo: f5 -->
Uma carteira tem 70% numa ação de beta 0,9 e 30% noutra de beta 1,3. Qual é o beta da carteira?

- A) 1,17
- B) 2,2
- C) 1,18
- D) 1,02
- E) 1,1

**Resposta:** D

**Explicação:** Ferramenta: beta da carteira = média ponderada dos betas. 0,7 · 0,9 + 0,3 · 1,3. = 1,02.

## Médio

### 1
<!-- modelo: m16 -->
Um investidor aplica R$ 100 mil próprios e mais R$ 100 mil emprestados a 10% ao ano num ativo que rende 8%. Qual é o retorno sobre o capital próprio?

- A) 9%
- B) 6%
- C) 8%
- D) 4%
- E) 16%

**Resposta:** B

**Explicação:** Ferramenta: alavancagem amplia ganhos e perdas. Ganho: 200 mil · 8% = R$ 16 mil; juros: R$ 10 mil. Líquido sobre R$ 100 mil: 6%. Como o ativo rendeu menos que o custo da dívida, a alavancagem piorou o resultado.

### 2
<!-- modelo: m5 -->
Na estratégia constant mix (60% ações e 40% renda fixa), a carteira tinha R$ 60 mil em ações e R$ 40 mil em renda fixa. As ações caíram 25%. O que o gestor deve fazer?

- A) não fazer nada, como no buy and hold
- B) vender todas as ações
- C) comprar R$ 15 mil em ações, sem vender renda fixa
- D) vender R$ 6 mil em ações
- E) comprar R$ 6 mil em ações, vendendo renda fixa

**Resposta:** E

**Explicação:** Ferramenta: constant mix: compra o que caiu, vende o que subiu. Ações: R$ 45 mil; total: R$ 85 mil; meta de 60% = R$ 51 mil. Comprar R$ 6 mil em ações.

### 3
<!-- modelo: m13 -->
A política de investimento define 70% em ações, com banda de tolerância de ±5 pontos. Hoje as ações representam 72% da carteira. O que fazer?

- A) nada por enquanto, porque 72% está dentro da faixa de 65% a 75%
- B) comprar mais ações até 100%
- C) mudar o perfil do cliente
- D) rebalancear imediatamente, porque 72% ≠ 70%
- E) vender todas as ações

**Resposta:** A

**Explicação:** Ferramenta: rebalanceamento por percentual (bandas). Em vez de rebalancear em datas fixas, só se age quando o peso sai da faixa tolerada, o que reduz custos e impostos. Faixa: 65% a 75%.

### 4
<!-- modelo: m10 -->
Um ativo pode render 5% ou 15%, com probabilidades iguais (50% cada). Qual é o desvio padrão do retorno?

- A) 25%
- B) 8%
- C) 5%
- D) 11%
- E) 10%

**Resposta:** C

**Explicação:** Ferramenta: σ = raiz da média dos desvios ao quadrado. Média: 10%. Cada cenário está a 5 pontos da média. σ = √(0,5 · 5² + 0,5 · 5²) = 5%.

### 5
<!-- modelo: m4 -->
Uma carteira tem 60% em ações (retorno de 15%) e 40% em renda fixa (10%). A volatilidade da carteira é 9% e a taxa livre de risco, 10%. Qual é o índice de Sharpe?

- A) 1,44
- B) 27
- C) 0,33
- D) 0,42
- E) 0,56

**Resposta:** C

**Explicação:** Ferramenta: primeiro o retorno da carteira, depois o Sharpe. Retorno: 0,6 · 15 + 0,4 · 10 = 13%. Sharpe: (13 − 10) ÷ 9 = 0,33.

### 6
<!-- modelo: m3 -->
Pelo modelo CAPM, qual é o retorno exigido de uma ação com beta 1,2, se a taxa livre de risco é 10% e o retorno esperado do mercado é 15%?

- A) 15%
- B) 28%
- C) 14,17%
- D) 16%
- E) 18%

**Resposta:** D

**Explicação:** Ferramenta: E(R) = Rf + β · (Rm − Rf). Prêmio de mercado: 15 − 10 = 5%. 10% + 1,2 · 5% = 16%.

### 7
<!-- modelo: m12 -->
Um fundo rendeu 6% com volatilidade de 8%, enquanto a taxa livre de risco foi de 10%. Qual é o índice de Sharpe e o que ele indica?

- A) −0,5: o fundo rendeu menos que um ativo livre de risco
- B) 0,75: excelente desempenho
- C) 0,5: o fundo superou o ativo livre de risco
- D) zero: o fundo empatou
- E) −32: risco baixo

**Resposta:** A

**Explicação:** Ferramenta: Sharpe negativo. (6 − 10) ÷ 8 = −0,5. Um Sharpe negativo mostra que o investidor teria feito melhor com o ativo sem risco.

### 8
<!-- modelo: m2 -->
A covariância entre os retornos de uma ação e do Ibovespa é 0,010, e a variância do Ibovespa é 0,02. Qual é o beta da ação?

- A) 0,07
- B) 1
- C) 0
- D) 2
- E) 0,5

**Resposta:** E

**Explicação:** Ferramenta: β = cov(ação, mercado) / var(mercado). 0,010 ÷ 0,02. β = 0,5. Menos sensível que o mercado.

### 9
<!-- modelo: m9 -->
Na estratégia buy and hold, uma carteira começou com 60% em ações e 40% em renda fixa (R$ 100 mil no total). As ações subiram 25% e a renda fixa rendeu 10%. Qual é o novo peso das ações?

- A) 66,25%
- B) 60%
- C) 36,97%
- D) 75%
- E) 63,03%

**Resposta:** E

**Explicação:** Ferramenta: buy and hold: não rebalanceia. Ações: R$ 75 mil; renda fixa: R$ 44 mil. Peso das ações: 63,03%. No buy and hold, a classe que mais sobe ganha peso.

### 10
<!-- modelo: m1 -->
Uma carteira tem 50% no ativo X (volatilidade 20%) e 50% no ativo Y (volatilidade 20%). A correlação entre eles é 0. Qual é a volatilidade da carteira?

- A) 10,61%
- B) 1%
- C) 20%
- D) 14,14%
- E) 17,68%

**Resposta:** D

**Explicação:** Ferramenta: σ² = (w₁σ₁)² + (w₂σ₂)² + 2·w₁σ₁·w₂σ₂·ρ. (10)² + (10)² + 2 · 10 · 10 · 0 = 200. σ = 14,14%. Com correlação menor que 1, o risco fica abaixo da média ponderada: é o benefício da diversificação.

### 11
<!-- modelo: m8 -->
Uma ação tem volatilidade diária de 2%. Qual é a volatilidade anualizada aproximada, com 252 dias úteis (√252 ≈ 15,87)?

- A) 63,48%
- B) 31,74%
- C) 24%
- D) 504%
- E) 6,92%

**Resposta:** B

**Explicação:** Ferramenta: σ anual = σ diária · √252. O risco escala com a raiz do número de períodos. 2% · 15,87 ≈ 31,74%.

### 12
<!-- modelo: m11 -->
Numa CPPI (piso R$ 80 mil, multiplicador 2), a carteira de R$ 100 mil tem R$ 40 mil em ações. As ações caem 10%. Qual deve ser a nova exposição em ações?

- A) R$ 40 mil
- B) R$ 192 mil
- C) R$ 16 mil
- D) R$ 32 mil
- E) R$ 36 mil

**Resposta:** D

**Explicação:** Ferramenta: CPPI reduz o risco quando a carteira cai. Perda: 10% de R$ 40 mil = R$ 4 mil. Nova carteira: R$ 96 mil; colchão: R$ 16 mil. Exposição: 2 · 16 = R$ 32 mil.

### 13
<!-- modelo: m17 -->
Os retornos anuais de um fundo nos últimos quatro anos foram 10%, 20%, −5% e 15%. Qual é o retorno médio aritmético histórico?

- A) 8,5%
- B) 40%
- C) 15%
- D) 10%
- E) 12%

**Resposta:** D

**Explicação:** Ferramenta: média aritmética = soma ÷ número de períodos. (10 + 20 − 5 + 15) ÷ 4. = 10%. Retorno histórico não garante o retorno futuro.

### 14
<!-- modelo: m6 -->
Ativo A: retorno esperado 12% e risco 8%. Ativo B: retorno esperado 10% e risco 10%. Pelo princípio da dominância, o que se conclui?

- A) A domina B só se a correlação for 1
- B) os dois são equivalentes
- C) não é possível comparar
- D) A domina B: oferece mais retorno com menos risco
- E) B domina A, por ter mais risco

**Resposta:** D

**Explicação:** Ferramenta: dominância. Um ativo domina outro quando tem retorno maior com risco igual ou menor, ou risco menor com retorno igual ou maior. A tem 12% > 10% de retorno e 8% < 10% de risco.

### 15
<!-- modelo: m14 -->
Pelo CAPM, um ativo com beta 2 deve ter retorno esperado igual a quanto, se a taxa livre de risco é 10% e o mercado deve render 15%?

- A) 15%
- B) 31%
- C) 1%
- D) 20%
- E) 40%

**Resposta:** D

**Explicação:** Ferramenta: E(R) = Rf + β · (Rm − Rf). 10% + 2 · 5%. = 20%. Beta 2: o dobro do prêmio de risco.

### 16
<!-- modelo: m7 -->
Carteira A: retorno 16% e beta 1,5. Carteira B: retorno 14% e beta 0,8. Com taxa livre de risco de 10%, qual tem o melhor índice de Treynor?

- A) a carteira B (5 contra 4)
- B) a carteira A (5 contra 4)
- C) as duas são iguais
- D) a carteira A, por ter maior retorno
- E) a carteira B, por ter menor beta, independentemente do retorno

**Resposta:** A

**Explicação:** Ferramenta: Treynor = (R − Rf) / β. A: (16 − 10) ÷ 1,5 = 4. B: (14 − 10) ÷ 0,8 = 5. Melhor: B.

### 17
<!-- modelo: m15 -->
Uma carteira é dividida igualmente entre 25 ativos independentes (correlação zero), todos com volatilidade de 20%. Qual é a volatilidade da carteira?

- A) 20%
- B) 8%
- C) 4%
- D) 0,8%
- E) 7%

**Resposta:** C

**Explicação:** Ferramenta: com correlação zero, σ = σ_individual / √n. √25 = 5. 20% ÷ 5 = 4%. Na prática, o risco sistemático não some, porque os ativos costumam ter correlação positiva.

## Difícil

### 1
<!-- modelo: d4 -->
Uma ação tem volatilidade total de 20%, dos quais o componente sistemático é 12%. Qual é o risco não sistemático (diversificável), sabendo que as variâncias se somam?

- A) 32%
- B) 23,32%
- C) 12%
- D) 8%
- E) 16%

**Resposta:** E

**Explicação:** Ferramenta: σ²_total = σ²_sistemático + σ²_não sistemático. 20² − 12² = 256. √256 = 16%. Essa parte pode ser reduzida com diversificação.

### 2
<!-- modelo: d6 -->
Um analista espera retorno de 18% para uma ação de beta 1,2. A taxa livre de risco é 10% e o mercado deve render 15%. Pelo CAPM, a ação parece:

- A) no preço justo
- B) sem risco
- C) caro (sobreavaliado): retorno esperado abaixo do exigido
- D) barato (subavaliado): retorno esperado acima do exigido
- E) impossível de avaliar sem o desvio padrão

**Resposta:** D

**Explicação:** Ferramenta: compare o esperado com o exigido. Exigido: 10 + 1,2 · (15 − 10) = 16%. Esperado: 18%. Acima do exigido.

### 3
<!-- modelo: d14 -->
Para cumprir o objetivo de um cliente, a carteira precisa de um ganho real de 6% ao ano. Com inflação esperada de 3,5%, qual rentabilidade nominal é necessária?

- A) 10,68%
- B) 6%
- C) 9,71%
- D) 9,5%
- E) 2,5%

**Resposta:** C

**Explicação:** Ferramenta: Fisher ao contrário. (1 + 0,035) · (1 + 0,06) − 1. ≈ 9,71% ao ano, antes de impostos e taxas.

### 4
<!-- modelo: d10 -->
Uma carteira tem Sharpe 0,5 (retorno 14%, volatilidade 8%, livre de risco 10%). Se o investidor aplicar 50% nela e 50% no ativo livre de risco, qual será o Sharpe da nova carteira?

- A) 1
- B) 0,38
- C) 0
- D) 0,5
- E) 0,25

**Resposta:** D

**Explicação:** Ferramenta: combinar com o ativo livre de risco não muda o Sharpe. Retorno: 12%; volatilidade: 4%. (12 − 10) ÷ 4 = 0,5. Muda o risco, não a eficiência.

### 5
<!-- modelo: d2 -->
Uma carteira concentrada rendeu 15%, com volatilidade de 25% e beta 0,8; a taxa livre de risco foi 10%. Seus índices de Sharpe e de Treynor são, respectivamente:

- A) 0,2 e 6,25
- B) 125 e 4
- C) 0,2 e 18,75
- D) 0,6 e 18,75
- E) 6,25 e 0,2

**Resposta:** A

**Explicação:** Ferramenta: Sharpe usa o risco total; Treynor, só o sistemático. Sharpe: 5 ÷ 25; Treynor: 5 ÷ 0,8. Em carteiras pouco diversificadas, o risco total é muito maior que o sistemático; por isso o Sharpe é a medida mais adequada para elas.

### 6
<!-- modelo: d15 -->
Um fundo passivo de Ibovespa rendeu 8%, enquanto o índice rendeu 11%. Para um fundo passivo, o que essa diferença representa?

- A) um excelente desempenho a ser buscado
- B) o retorno ativo que o gestor deve maximizar
- C) o índice de Sharpe do fundo
- D) o beta do fundo
- E) um erro de acompanhamento de 3 pontos, que um fundo passivo busca minimizar

**Resposta:** E

**Explicação:** Ferramenta: risco relativo. Fundos passivos querem replicar o índice. Diferenças (para mais ou para menos) indicam risco relativo, custos ou falhas de replicação. Diferença: −3 pontos.

### 7
<!-- modelo: d11 -->
Dois ativos com volatilidade de 20% cada são combinados em 50% e 50%. Com correlação de −0,5, qual é a volatilidade da carteira?

- A) 8%
- B) 7%
- C) 0%
- D) 20%
- E) 10%

**Resposta:** E

**Explicação:** Ferramenta: σ² = (0,5·20)² + (0,5·20)² + 2·(0,5·20)·(0,5·20)·ρ. 100 + 100 + 200 · −0,5 = 100. σ = 10%. Quanto menor a correlação, maior o benefício da diversificação.

### 8
<!-- modelo: d3 -->
Uma carteira tem 60% num fundo de ações (retorno esperado 16%, volatilidade 20%) e 40% num título livre de risco (10%). Quais são o retorno esperado e a volatilidade da carteira?

- A) 13,6% e 20%
- B) 13,6% e 3,46%
- C) 13,6% e 12%
- D) 13% e 10%
- E) 16% e 12%

**Resposta:** C

**Explicação:** Ferramenta: o ativo livre de risco não tem volatilidade nem correlação. Retorno: 0,6 · 16 + 0,4 · 10 = 13,6%. Volatilidade: 0,6 · 20 = 12%. O Sharpe da carteira é igual ao do fundo de ações.

### 9
<!-- modelo: d8 -->
Num mercado que sobe e desce várias vezes, sem tendência clara, qual estratégia tende a se sair melhor: constant mix ou buy and hold?

- A) nenhuma, porque só ativos sem risco funcionam
- B) constant mix, porque vende depois das altas e compra depois das quedas
- C) são sempre iguais
- D) buy and hold, porque nunca opera
- E) CPPI, que compra nas quedas

**Resposta:** B

**Explicação:** Ferramenta: estratégias de rebalanceamento. Constant mix é "contra a tendência": ganha em mercados oscilantes. CPPI é "a favor da tendência": compra nas altas e vende nas quedas, indo melhor em tendências fortes. Buy and hold fica no meio.

### 10
<!-- modelo: d7 -->
Um ativo tem volatilidade mensal de 6%. Qual é a volatilidade aproximada em um trimestre (√3 ≈ 1,73)?

- A) 3,47%
- B) 6%
- C) 17,96%
- D) 10,38%
- E) 18%

**Resposta:** D

**Explicação:** Ferramenta: σ do período = σ mensal · √(número de meses). Para retornos independentes, a variância soma; o desvio padrão cresce com a raiz. 6% · 1,73 ≈ 10,38%.

### 11
<!-- modelo: d5 -->
Para rebalancear, um investidor vende R$ 30 mil em ações compradas a R$ 20 e vendidas a R$ 25. Numa operação comum, com vendas acima de R$ 20 mil no mês, qual é o IR?

- A) R$ 1,2 mil
- B) R$ 6 mil
- C) R$ 4,5 mil
- D) R$ 0,9 mil
- E) R$ 0 mil

**Resposta:** D

**Explicação:** Ferramenta: o imposto é custo do rebalanceamento. Lucro = 30 mil · (1 − 20/25) = R$ 6 mil. 15% · 6 = R$ 0,9 mil. Rebalancear com novos aportes pode evitar esse custo.

### 12
<!-- modelo: d9 -->
Um investidor usa R$ 100 mil próprios e R$ 100 mil emprestados a 10% ao ano num ativo que rende −10%. Qual é o retorno sobre o capital próprio?

- A) −32%
- B) −28%
- C) −20%
- D) −10%
- E) −30%

**Resposta:** E

**Explicação:** Ferramenta: alavancagem amplia as perdas também. Resultado do ativo: 200 mil · −10% = R$ −20 mil; juros: R$ 10 mil. Sobre R$ 100 mil: −30%.

### 13
<!-- modelo: d16 -->
A carteira de um fundo rendeu 16% brutos, com volatilidade de 8%. O fundo cobra 2% de taxa de administração e a taxa livre de risco é 10%. Qual é o Sharpe do cotista (líquido de taxa)?

- A) 32
- B) 1
- C) 0,75
- D) 0,5
- E) 1,75

**Resposta:** D

**Explicação:** Ferramenta: custos reduzem o Sharpe. Retorno líquido: 16 − 2 = 14%. (14 − 10) ÷ 8 = 0,5, contra 0,75 antes da taxa.

### 14
<!-- modelo: d12 -->
Num cenário ruim (50%), uma ação rende 0%; num bom (50%), 20%. Um CDB rende 10% sem risco. O que se pode dizer da ação em relação ao CDB?

- A) retorno esperado de 10%, com desvio padrão de 20%
- B) retorno esperado de 10%, com desvio padrão de 10%
- C) retorno esperado de 0%
- D) retorno garantido de 10%
- E) retorno esperado de 20%, sem risco

**Resposta:** B

**Explicação:** Ferramenta: retorno esperado e risco. E = 0,5 · 0 + 0,5 · 20 = 10%. Cada cenário fica a 10 pontos da média. A ação não oferece prêmio sobre o CDB e ainda tem risco: o CDB domina.

### 15
<!-- modelo: d13 -->
Uma carteira tem 60% num fundo de ações com beta 1,2 e 40% em títulos pós-fixados (beta zero em relação ao Ibovespa). Qual é o beta da carteira?

- A) 1,2
- B) 1
- C) 0,72
- D) 72
- E) 0,6

**Resposta:** C

**Explicação:** Ferramenta: beta da carteira = média ponderada. 0,6 · 1,2 + 0,4 · 0. = 0,72. A renda fixa reduz a sensibilidade da carteira à bolsa.

### 16
<!-- modelo: d1 -->
Dois ativos têm volatilidades de 15% e 5% e correlação −1. Que percentual no primeiro ativo elimina totalmente o risco da carteira?

- A) 50%
- B) 5%
- C) 75,5%
- D) 75%
- E) 25%

**Resposta:** E

**Explicação:** Ferramenta: correlação −1 permite risco zero. Basta que w₁·σ₁ = w₂·σ₂: w₁ = σ₂/(σ₁ + σ₂) = 5/20. w₁ = 25%. Na prática, correlação −1 perfeita é rara.
