### Retorno da carteira

O retorno esperado de uma carteira é a **média ponderada** dos retornos dos ativos pelos seus pesos.

> **Exemplo resolvido.** 60% num ativo com retorno esperado de 10% e 40% em outro com 15%.
> 0,6 · 10% + 0,4 · 15% = 6% + 6% = **12%**.

Com **cenários**, faça a mesma conta usando as probabilidades: retorno esperado = soma de (probabilidade × retorno).

> **Exemplo.** 50% de chance de ganhar 20%, 30% de ganhar 5% e 20% de perder 10%: 0,5 · 20 + 0,3 · 5 − 0,2 · 10 = 10 + 1,5 − 2 = **9,5%**.

### Risco: volatilidade

O risco é medido pelo **desvio padrão** dos retornos (a volatilidade). Para anualizar:

- vol anual = vol mensal · **√12**;
- vol anual = vol diária · **√252** (dias úteis).

> **Exemplo.** Volatilidade mensal de 4%: 4% · √12 ≈ 4 · 3,46 ≈ **13,9% ao ano**.

### Correlação e diversificação

A **correlação** vai de **−1** (andam em sentidos opostos) a **+1** (andam juntos). Quanto **menor** a correlação entre os ativos, mais o risco da carteira fica **abaixo da média** dos riscos individuais. Com correlação +1, não há ganho de diversificação.

### Beta e CAPM

- **Beta** mede a sensibilidade do ativo ao mercado. Beta 1,2: se o mercado sobe 10%, o ativo tende a subir **12%**. Beta = covariância (ativo, mercado) ÷ variância do mercado.
- **CAPM:** o retorno que o investidor deve exigir de um ativo:

**retorno exigido = livre de risco + beta · (retorno do mercado − livre de risco)**

> **Exemplo resolvido.** Livre de risco 10%, mercado 15%, beta 1,4.
> 10% + 1,4 · (15% − 10%) = 10% + 7% = **17%**.

### Índices de desempenho

- **Sharpe = (retorno − livre de risco) ÷ volatilidade.** Retorno em excesso por unidade de **risco total**. Quanto maior, melhor.
- **Treynor = (retorno − livre de risco) ÷ beta.** Usa só o **risco de mercado** (sistemático); faz sentido para carteiras já bem diversificadas.

> **Exemplo resolvido.** Fundo A: rendeu 14% com volatilidade 8%. Fundo B: 16% com volatilidade 12%. Livre de risco: 10%.
> Sharpe A = 4 ÷ 8 = **0,50**. Sharpe B = 6 ÷ 12 = **0,50**. Empate: o B rendeu mais, mas correu proporcionalmente mais risco.

### Alavancagem

Investir com dinheiro emprestado **amplia ganhos e perdas** sobre o capital próprio, e os **juros da dívida** pesam no resultado.

> **Exemplo.** Com R$ 100 mil próprios e R$ 100 mil emprestados a 10%, a carteira de R$ 200 mil sobe 20%: ganho de R$ 40 mil, menos R$ 10 mil de juros = R$ 30 mil, ou **30%** sobre o capital próprio. Se caísse 20%, a perda seria de R$ 50 mil, ou **50%**.

### Estratégias de rebalanceamento

- **Buy and hold:** compra e mantém; os pesos mudam conforme os preços. Vai bem em tendências fortes.
- **Constant mix:** volta sempre aos **pesos-alvo**: **vende o que subiu e compra o que caiu**. Vai bem em mercados que oscilam sem tendência.
- **CPPI:** protege um valor mínimo (o **piso**). A exposição ao risco é: **multiplicador · (carteira − piso)**. Quando a carteira sobe, aumenta o risco; quando cai, reduz.

> **Exemplo resolvido.** Carteira de R$ 1 milhão, piso de R$ 900 mil e multiplicador 3. Quanto vai para ações?
> 3 · (1 000 000 − 900 000) = **R$ 300 mil** em ações; o resto, R$ 700 mil, em renda fixa.
