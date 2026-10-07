### Para que serve este assunto

Descontos de títulos e sistemas de amortização são temas centrais dos concursos de banco e muito presentes na vida real: antecipar o recebimento de uma duplicata, financiar uma casa pelo SAC ou pela Tabela Price, entender por que a parcela do carro tem tantos juros no início. Esta aula explica os tipos de desconto, as séries de pagamentos e os dois grandes sistemas de amortização, com tabelas montadas passo a passo, para você entender de onde vem cada número.

### O que é desconto

Quem tem um título que vence no futuro (uma duplicata, um cheque pré-datado) pode receber **antes** do vencimento, mas aceita um valor menor. A diferença é o **desconto**.

- **N (valor nominal):** quanto o título vale no vencimento.
- **A (valor atual):** quanto se recebe hoje.
- **D = N − A.**

### Desconto comercial simples (por fora)

Calculado sobre o **valor nominal**. É o usado pelos bancos.

- **D = N · i · t**
- **A = N − D = N · (1 − i · t)**

> **Exemplo resolvido.** Uma duplicata de R$ 10 000 é descontada 3 meses antes, a 2% ao mês (comercial).
> D = 10 000 · 0,02 · 3 = **R$ 600**. A = **R$ 9 400**.

### Desconto racional simples (por dentro)

Calculado sobre o **valor atual**, como se fosse um juro simples "de trás para a frente".

- **A = N ÷ (1 + i · t)**
- D = N − A

> **Exemplo resolvido.** Mesmo título: R$ 10 000, 3 meses, 2% ao mês (racional).
> A = 10 000 ÷ 1,06 ≈ **R$ 9 433,96**. D ≈ R$ 566,04.

O **desconto racional é menor** que o comercial (porque a base de cálculo, A, é menor que N).

### Desconto racional composto

**A = N ÷ (1 + i)ᵗ**: é exatamente o **valor presente** em juros compostos.

### Sistemas de amortização

Num financiamento, cada parcela tem duas partes:

**parcela = juros + amortização**

- **Juros** = taxa × **saldo devedor** do período anterior.
- **Amortização** = a parte que realmente diminui a dívida.

### SAC: amortização constante

- A **amortização é sempre a mesma**: dívida ÷ número de parcelas.
- Como o saldo cai, os **juros caem** e as **parcelas diminuem**.

> **Exemplo resolvido.** R$ 12 000 em 4 parcelas pelo SAC, a 5% ao mês.
> Amortização = 12 000 ÷ 4 = R$ 3 000.
> 1ª parcela: juros 5% de 12 000 = 600 → **R$ 3 600**.
> 2ª: saldo 9 000, juros 450 → **R$ 3 450**.
> 3ª: saldo 6 000, juros 300 → **R$ 3 300**.
> 4ª: saldo 3 000, juros 150 → **R$ 3 150**.
> As parcelas caem R$ 150 por mês (uma progressão aritmética).

### Price (sistema francês): parcelas iguais

- As **parcelas são fixas**.
- No começo, a parcela é **quase toda juros**; com o tempo, a amortização cresce.
- Fórmula da parcela: **P = C · i ÷ [1 − (1 + i)⁻ⁿ]** (as provas costumam dar o fator pronto).

> **Exemplo resolvido.** Financiamento de R$ 10 000 pela Price, em 10 parcelas, a 2% ao mês, com parcela de R$ 1 113,27. Quanto da 1ª parcela é juros?
> Juros = 2% de 10 000 = **R$ 200**. Amortização = 1 113,27 − 200 = **R$ 913,27**.

### SAC ou Price?

- No **SAC**, a **primeira parcela é maior**, mas o **total de juros pago é menor** (a dívida cai mais rápido).
- Na **Price**, as parcelas começam menores e cabem melhor no orçamento no início, mas o total de juros é maior.

### Desconto comercial composto

Pouco cobrado, mas existe: **A = N · (1 − i)ᵗ**. É o desconto "por fora" aplicado de forma composta.

### Séries de pagamentos (rendas)

Uma **série uniforme** é uma sequência de pagamentos **iguais** e periódicos (as prestações de uma compra, os depósitos mensais numa aplicação).

- **Valor presente de uma série postecipada** (o 1º pagamento vem **um período depois**, como na maioria dos financiamentos): **VP = P · [1 − (1 + i)⁻ⁿ] ÷ i**. É a fórmula da Price "ao contrário".
- **Série antecipada** (o 1º pagamento é **à vista**, "1 + n"): VP = P + valor presente das n − 1 parcelas restantes.
- **Valor futuro de depósitos iguais:** **VF = P · [(1 + i)ⁿ − 1] ÷ i**. Serve para calcular quanto se junta depositando todo mês.

> **Exemplo resolvido.** Uma pessoa deposita R$ 100 por mês, durante 3 meses, numa aplicação que rende 10% ao mês. Quanto terá logo após o 3º depósito?
> O 1º depósito rende 2 meses: 100 · 1,1² = 121. O 2º rende 1 mês: 110. O 3º acaba de ser feito: 100. Total: **R$ 331**.
> Pela fórmula: 100 · (1,1³ − 1) ÷ 0,1 = 100 · 0,331 ÷ 0,1 = **R$ 331**.

> **Exemplo resolvido.** Um produto custa R$ 1 000 à vista ou em 2 parcelas mensais de R$ 550, sem entrada. Qual opção é melhor, se o dinheiro rende 5% ao mês?
> Valor presente das parcelas: 550 ÷ 1,05 + 550 ÷ 1,05² ≈ 523,81 + 498,87 ≈ R$ 1 022,68. Como isso é **maior** que R$ 1 000, pagar **à vista** é melhor.

### Montando a tabela da Price

Cada linha segue sempre os mesmos passos: **juros** = taxa × saldo anterior; **amortização** = parcela − juros; **novo saldo** = saldo anterior − amortização.

> **Exemplo resolvido.** R$ 10 000 pela Price, em 10 parcelas de R$ 1 113,27, a 2% ao mês. Monte as duas primeiras linhas.
> 1ª: juros = 0,02 · 10 000 = 200; amortização = 1 113,27 − 200 = 913,27; saldo = 9 086,73.
> 2ª: juros = 0,02 · 9 086,73 ≈ 181,73; amortização ≈ 1 113,27 − 181,73 = 931,54; saldo ≈ 8 155,19.
> Repare: os juros **caem** e a amortização **cresce**, mas a parcela é sempre a mesma.

### SAC × Price lado a lado

- **Parcela:** SAC decrescente (PA); Price constante.
- **Amortização:** SAC constante; Price crescente.
- **Juros:** decrescentes nos dois.
- **Primeira parcela:** maior no SAC.
- **Total de juros pago:** menor no SAC.
- **Na primeira parcela**, os juros são **iguais** nos dois sistemas (mesma dívida, mesma taxa).

### Sistema Americano e SAM

- **Sistema Americano:** paga-se só os **juros** durante o prazo, e o **capital inteiro** é devolvido na última parcela (usado em títulos de dívida, como debêntures).
- **SAM (Sistema de Amortização Misto):** cada parcela é a **média** entre a do SAC e a da Price.

### Erros mais comuns

- Confundir desconto comercial (sobre o valor nominal, maior) com racional (sobre o valor atual, menor).
- Calcular os juros de uma parcela sobre o valor inicial da dívida, e não sobre o **saldo devedor** do período anterior.
- Achar que na Price a amortização é constante (constante é a **parcela**).
- Esquecer que no SAC as parcelas formam uma PA decrescente.
- Comparar valores em datas diferentes sem trazê-los para a mesma data.

### Como cai na prova

As bancas pedem o valor atual ou o desconto de títulos, comparam desconto comercial e racional, pedem o valor de uma parcela específica no SAC (usando a PA), os juros e a amortização de uma parcela na Price (com o valor da parcela ou o fator dado), o saldo devedor após certo número de parcelas e a comparação entre os sistemas.

### Teste-se

1. Um título de R$ 5 000 é descontado 2 meses antes, a 3% ao mês, desconto comercial simples. Qual o valor recebido?
2. Qual desconto é maior: o comercial ou o racional (mesmo título, prazo e taxa)?
3. Um financiamento de R$ 60 000 pelo SAC, em 60 meses, a 1% ao mês. Qual a amortização mensal e o valor da 1ª parcela?
4. No mesmo financiamento, qual o valor da 2ª parcela?
5. Na Price, o que é constante: a parcela ou a amortização?

> **Respostas.** 1) D = 5 000 · 0,03 · 2 = 300; A = **R$ 4 700**. 2) O **comercial** (calculado sobre o valor nominal, que é maior). 3) Amortização = 60 000 ÷ 60 = **R$ 1 000**; juros = 1% de 60 000 = 600; 1ª parcela = **R$ 1 600**. 4) Saldo 59 000; juros 590; 2ª parcela = **R$ 1 590**. 5) A **parcela**.

### Para lembrar

- Desconto comercial (por fora): D = N·i·t. Racional (por dentro): A = N ÷ (1 + i·t). Comercial > racional.
- Racional composto: A = N ÷ (1 + i)ᵗ (valor presente).
- Parcela = juros + amortização; juros = taxa × saldo devedor anterior.
- SAC: amortização constante, parcelas decrescentes (PA), menos juros no total.
- Price: parcelas constantes, amortização crescente, mais juros no total.
- Séries: VP = P·[1 − (1 + i)⁻ⁿ] ÷ i; VF = P·[(1 + i)ⁿ − 1] ÷ i.
