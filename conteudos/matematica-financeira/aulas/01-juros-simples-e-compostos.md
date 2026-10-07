### Para que serve este assunto

Juros estão em tudo: no rendimento da poupança, na prestação do carro, no cartão de crédito, no empréstimo consignado, na conta atrasada. Matemática financeira cai em todos os concursos de banco (Banco do Brasil, Caixa, BNB, BB Tecnologia), nas certificações da ANBIMA e no ENEM. E é útil na vida: entender juros compostos ajuda a fugir das dívidas caras e a fazer o dinheiro render. Esta aula explica juros simples e compostos, as taxas proporcionais, equivalentes, nominais, efetivas e reais, sempre com exemplos resolvidos passo a passo.

### O vocabulário

- **Capital (C)** ou valor presente (VP): o valor inicial, emprestado ou aplicado.
- **Juros (J):** a remuneração pelo uso do dinheiro ao longo do tempo (o "aluguel" do dinheiro).
- **Taxa de juros (i):** a porcentagem cobrada por período (ao mês, ao ano). Nas fórmulas, use a forma **decimal**: 3% = 0,03.
- **Tempo (t ou n):** o número de períodos.
- **Montante (M)** ou valor futuro (VF): capital + juros.

### A regra de ouro: taxa e tempo na mesma unidade

Antes de qualquer conta, confira: se a taxa é **mensal**, o tempo tem que estar em **meses**; se é anual, em anos. Metade dos erros vem daqui.

### Juros simples

O juro é calculado **sempre sobre o capital inicial**. Cresce em linha reta.

- **J = C · i · t**
- **M = C + J = C · (1 + i · t)**

> **Exemplo resolvido.** R$ 2 000 a 3% ao mês, juros simples, por 5 meses.
> J = 2 000 · 0,03 · 5 = **R$ 300**. M = **R$ 2 300**.

**Taxas proporcionais** (só nos simples): 2% ao mês = 24% ao ano; 12% ao ano = 1% ao mês.

### Juros compostos

O juro de cada mês entra no cálculo do mês seguinte: **juros sobre juros**. Cresce de forma exponencial.

- **M = C · (1 + i)ᵗ**
- J = M − C

> **Exemplo resolvido.** R$ 1 000 a 10% ao ano, compostos, por 3 anos.
> M = 1 000 · 1,1³ = 1 000 · 1,331 = **R$ 1 331**. Em juros simples seriam só R$ 1 300.

Quem ganha mais?

- Para **t > 1** período, os **compostos** rendem mais.
- Para **t < 1** período, os **simples** rendem mais.
- Em **t = 1**, empatam.

### Taxas equivalentes (juros compostos)

Duas taxas são equivalentes quando levam ao mesmo montante no mesmo prazo:

**(1 + i_anual) = (1 + i_mensal)¹²**

> **Exemplo resolvido.** Qual a taxa anual equivalente a 2% ao mês?
> 1,02¹² ≈ 1,268 → cerca de **26,8% ao ano** (e não 24%).

> **Exemplo resolvido.** Qual a taxa **anual** equivalente a 21% a cada **2 anos**?
> (1 + i)² = 1,21 → 1 + i = 1,1 → **10% ao ano**.

### Taxa nominal × taxa efetiva

A **taxa nominal** vem com um período de capitalização diferente do seu período. Exemplo clássico: "12% ao ano, capitalizados mensalmente".

1. Divida a nominal pelo número de capitalizações: 12% ÷ 12 = **1% ao mês** (essa é a taxa que realmente se aplica).
2. A taxa **efetiva** anual é 1,01¹² − 1 ≈ **12,68% ao ano**.

### Taxa real: descontando a inflação

**(1 + nominal) = (1 + real) · (1 + inflação)**

> **Exemplo resolvido.** Uma aplicação rendeu 12% num ano com inflação de 5%.
> 1,12 ÷ 1,05 ≈ 1,0667 → ganho real de **6,67%** (subtrair daria 7%, só uma aproximação).

### Quando aparecem logaritmos

Para descobrir o **tempo** nos juros compostos, use logaritmo:

**t = log(M/C) ÷ log(1 + i)**

> **Exemplo resolvido.** Em quanto tempo um capital dobra a 10% ao ano? (log 2 ≈ 0,301; log 1,1 ≈ 0,041)
> t = 0,301 ÷ 0,041 ≈ **7,3 anos**.

Atalho útil: a "**regra do 72**": o tempo para dobrar é cerca de 72 ÷ taxa (72 ÷ 10 ≈ 7,2 anos).

### Juros comerciais e exatos

Quando o prazo está em **dias** e a taxa é anual:

- **Juros comerciais (ordinários):** consideram o ano com **360 dias** (e o mês com 30 dias). É o padrão nas provas, salvo aviso.
- **Juros exatos:** consideram o ano civil, com **365 dias** (366 nos bissextos).

> **Exemplo resolvido.** R$ 9 000 aplicados a 24% ao ano, juros simples comerciais, por 45 dias. Qual o juro?
> Taxa diária: 24% ÷ 360 = 0,0667% ao dia. J = 9 000 · 0,24 · 45/360 = **R$ 270**.

### Comparando os dois regimes

- **Juros simples:** crescem em **progressão aritmética** (somam sempre o mesmo valor); o gráfico do montante é uma **reta**. Usados em operações de curto prazo e em alguns descontos.
- **Juros compostos:** crescem em **progressão geométrica** (multiplicam sempre pelo mesmo fator); o gráfico é uma **curva exponencial**. É o regime do mercado financeiro: poupança, financiamentos, cartão de crédito, investimentos.

> **Exemplo resolvido.** Uma dívida de R$ 1 000 no cartão de crédito, a 12% ao mês, fica sem pagar por 6 meses. Quanto se deve? (1,12⁶ ≈ 1,974)
> M = 1 000 · 1,974 ≈ **R$ 1 974**: a dívida quase **dobra** em meio ano. É por isso que os juros do rotativo do cartão são tão perigosos.

### Erros mais comuns

- Usar taxa e tempo em unidades diferentes (taxa mensal com tempo em anos).
- Usar a porcentagem sem passar para decimal (3 em vez de 0,03).
- Achar que 2% ao mês equivalem a 24% ao ano nos juros compostos (é cerca de 26,8%).
- Calcular a taxa real subtraindo a inflação da taxa nominal (o correto é dividir os fatores).
- Confundir taxa nominal (só referência) com taxa efetiva (a que realmente se aplica).

### Como cai na prova

As bancas pedem montantes, juros, taxas e prazos em juros simples e compostos, comparação entre os regimes, conversão entre taxas (proporcionais, equivalentes, nominal e efetiva), cálculo da taxa real com inflação e do tempo com logaritmos (dando os valores dos logs). Costumam fornecer tabelas de potências como (1,02)¹² ≈ 1,268.

### Teste-se

1. Quanto rende R$ 5 000 a 2% ao mês, juros simples, em 8 meses?
2. Qual o montante de R$ 2 000 a 5% ao mês, juros compostos, em 2 meses?
3. Qual a taxa mensal proporcional a 18% ao ano (juros simples)?
4. Uma taxa nominal de 24% ao ano capitalizada mensalmente corresponde a qual taxa mensal efetiva?
5. Um investimento rendeu 10% num ano em que a inflação foi de 10%. Qual o ganho real?

> **Respostas.** 1) J = 5 000 · 0,02 · 8 = **R$ 800**. 2) M = 2 000 · 1,05² = 2 000 · 1,1025 = **R$ 2 205**. 3) 18% ÷ 12 = **1,5% ao mês**. 4) 24% ÷ 12 = **2% ao mês**. 5) 1,10 ÷ 1,10 = 1: ganho real de **0%** (o rendimento só repôs a inflação).

### Para lembrar

- Taxa e tempo na mesma unidade; taxa em decimal.
- Simples: J = C·i·t; M = C·(1 + i·t). Cresce em linha reta (PA).
- Compostos: M = C·(1 + i)ᵗ. Juros sobre juros (PG).
- Proporcionais (simples): divide ou multiplica. Equivalentes (compostos): (1 + iₐ) = (1 + iₘ)¹².
- Nominal → divida pelo número de capitalizações → efetiva.
- Real: (1 + nominal) = (1 + real)·(1 + inflação).
- Tempo: t = log(M/C) ÷ log(1 + i); regra do 72.
