### Juros simples

Os juros incidem sempre sobre o **capital inicial**. Crescem em linha reta.

- J = C · i · n e M = C · (1 + i · n).
- Taxa e prazo precisam estar na **mesma unidade** (mês com mês, ano com ano).
- Taxas **proporcionais**: 24% ao ano = 2% ao mês = 12% ao semestre.

> **Exemplo resolvido.** R$ 2.000 a 3% a.m. por 5 meses: J = 2.000 × 0,03 × 5 = 300; M = **R$ 2.300**.

### Juros compostos

Os juros de cada período entram no saldo e passam a render juros ("juros sobre juros"). Crescem em curva (exponencial).

- M = C · (1 + i)ⁿ.
- Taxas **equivalentes**: produzem o mesmo montante no mesmo prazo. (1 + i_ano) = (1 + i_mês)¹².
- Para um único período, simples e compostos dão o mesmo resultado; acima de um período, os compostos rendem mais.

> **Exemplo resolvido.** 1,5% ao mês equivale a (1,015)¹² − 1 ≈ **19,56% ao ano**, e não 18%.

### Taxa nominal, efetiva e real

- **Nominal:** o período da taxa é diferente do período de capitalização (ex.: 24% a.a. capitalizada mensalmente). Converte-se de forma proporcional: 24% ÷ 12 = 2% a.m. efetiva.
- **Efetiva:** a que realmente incide. 2% a.m. → (1,02)¹² − 1 ≈ 26,82% a.a.
- **Real (Fisher):** desconta a inflação. (1 + aparente) = (1 + real) · (1 + inflação).

> **Exemplo resolvido.** Rendimento de 12% com inflação de 5%: 1,12 ÷ 1,05 = 1,0667 → taxa real ≈ **6,67%** (e não 7%).

### Descontos

Desconto é o abatimento por pagar ou receber um título **antes** do vencimento. N = valor nominal (de face); A = valor atual (líquido).

- **Comercial simples (por fora, bancário):** D = N · d · n, calculado sobre o valor nominal. É o mais usado pelos bancos.
- **Racional simples (por dentro):** A = N ÷ (1 + i · n); o desconto incide sobre o valor atual.
- **Racional composto:** A = N ÷ (1 + i)ⁿ. É o mesmo que trazer a valor presente.
- Com a mesma taxa e o mesmo prazo, o desconto **comercial é maior** que o racional.

> **Exemplo resolvido.** Duplicata de R$ 10.000, 3 meses antes, a 2% a.m. Comercial: D = 10.000 × 0,02 × 3 = 600, A = 9.400. Racional simples: A = 10.000 ÷ 1,06 ≈ 9.433,96 (desconto ≈ 566).

### Equivalência de capitais

Para comparar valores em datas diferentes, leve todos para **a mesma data** (data focal) usando a taxa dada. Em juros compostos, a data focal pode ser qualquer uma; o resultado é o mesmo.

> **Exemplo resolvido.** Trocar R$ 1.100 daqui a 1 mês, a 10% a.m., por um pagamento à vista: 1.100 ÷ 1,1 = **R$ 1.000**.

### Séries de pagamentos (rendas)

Parcelas iguais (PMT), em intervalos iguais.

- **Postecipada** (primeira parcela ao fim do primeiro período): VP = PMT · [1 − (1 + i)⁻ⁿ] ÷ i.
- **Antecipada** (com entrada): é a postecipada multiplicada por (1 + i).
- **Valor futuro (acumulação):** VF = PMT · [(1 + i)ⁿ − 1] ÷ i.
- **Perpetuidade:** VP = PMT ÷ i.

> **Exemplo resolvido.** Para juntar R$ 10.000 em 10 depósitos mensais a 1% a.m.: PMT = 10.000 × 0,01 ÷ (1,01¹⁰ − 1) ≈ **R$ 955,82**.

### Sistemas de amortização

Cada parcela = **juros** (sobre o saldo devedor) + **amortização** (o que reduz a dívida).

- **Price (francês):** parcelas iguais. No começo a parcela é quase só juros; a amortização cresce com o tempo.
- **SAC (amortização constante):** amortização = dívida ÷ n. Os juros caem e as parcelas **diminuem**. Paga menos juros no total que o Price, mas a primeira parcela é maior.
- **SAM (misto):** parcela = média das parcelas Price e SAC.

> **Exemplo resolvido (Price).** R$ 10.000 em 12 parcelas a 2% a.m.: PMT = 10.000 × 0,02 ÷ [1 − 1,02⁻¹²] ≈ **R$ 945,60**. Juros da 1ª parcela: 200; amortização: 745,60.

> **Exemplo resolvido (SAC).** R$ 12.000 em 12 meses a 1% a.m.: amortização = 1.000. 1ª parcela = 1.000 + 120 = **R$ 1.120**; a última = 1.000 + 10 = 1.010. Juros totais = 120 + 110 + … + 10 = **R$ 780**.

### Análise de investimentos

- **TMA (taxa mínima de atratividade):** o mínimo que o investidor exige.
- **VPL:** soma dos fluxos trazidos a valor presente pela TMA, menos o investimento. VPL > 0 → aceitar.
- **TIR:** a taxa que zera o VPL. TIR > TMA → aceitar.
- **Payback:** tempo para recuperar o investimento. O simples ignora o valor do dinheiro no tempo; o descontado usa valores presentes.
- Em projetos excludentes, se VPL e TIR discordarem, prefira o **VPL**.

> **Exemplo resolvido.** Investe R$ 10.000 e recebe R$ 6.000 em cada um dos próximos 2 anos, TMA de 10%: VPL = −10.000 + 5.454,55 + 4.958,68 ≈ **R$ 413,22** → viável. A TIR fica perto de 13%, acima da TMA.
