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
