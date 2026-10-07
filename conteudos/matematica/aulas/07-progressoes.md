### Para que serve este assunto

Progressões são sequências de números que seguem um padrão fixo. Elas descrevem situações muito comuns: uma poupança em que você guarda um pouco mais a cada mês, as fileiras de um teatro que aumentam de tamanho, o preço que sobe uma parcela fixa por mês, uma população que dobra, um juro que "rende sobre juro". Existem dois tipos: na **progressão aritmética (PA)**, soma-se sempre o mesmo número; na **progressão geométrica (PG)**, multiplica-se sempre pelo mesmo número. Saber reconhecer qual é qual resolve metade do problema.

### Sequências e padrões

Uma sequência é uma lista ordenada de números: a₁ (primeiro termo), a₂, a₃... aₙ (termo de posição n). Muitas questões do ENEM mostram figuras que crescem (quadradinhos, palitos, bolinhas) e pedem a quantidade numa posição distante. A estratégia é sempre a mesma: **conte os primeiros termos, descubra o padrão e escreva uma fórmula para a posição n**.

> **Exemplo resolvido.** Para formar 1 quadrado são usados 4 palitos; 2 quadrados lado a lado, 7 palitos; 3 quadrados, 10 palitos. Quantos palitos para 50 quadrados?
> A sequência 4, 7, 10... cresce 3 a cada quadrado (cada quadrado novo aproveita um lado do anterior). O termo geral é 4 + (n − 1) · 3 = 3n + 1. Para n = 50: **151 palitos**.

### Progressão aritmética (PA)

Na PA, cada termo é o anterior **mais** um número fixo, a **razão (r)**. Exemplos: 3, 7, 11, 15... (r = 4); 20, 17, 14... (r = −3); 5, 5, 5... (r = 0).

**Termo geral.** Para chegar ao termo n, você parte do primeiro e soma a razão (n − 1) vezes:

**aₙ = a₁ + (n − 1) · r**

> **Exemplo resolvido.** Qual é o 10º termo da PA 3, 7, 11...?
> a₁₀ = 3 + 9 · 4 = **39**.

> **Exemplo resolvido.** Na PA 2, 5, 8..., qual a posição do termo 50?
> 50 = 2 + (n − 1) · 3 → 48 = 3(n − 1) → n − 1 = 16 → **n = 17**.

**Soma dos termos.** A ideia é de Gauss: somar o primeiro com o último dá o mesmo que o segundo com o penúltimo, e assim por diante. Por isso:

**Sₙ = (a₁ + aₙ) · n ÷ 2**

> **Exemplo resolvido.** Quanto é 1 + 2 + 3 + ... + 100?
> (1 + 100) · 100 ÷ 2 = **5 050**.

> **Exemplo resolvido.** Ana guarda R$ 50 no primeiro mês e, a cada mês, R$ 10 a mais que no mês anterior. Quanto terá guardado em 12 meses?
> É uma PA com a₁ = 50 e r = 10. a₁₂ = 50 + 11 · 10 = 160. S₁₂ = (50 + 160) · 12 ÷ 2 = **R$ 1 260**.

> **Exemplo resolvido.** Um teatro tem 15 fileiras. A primeira tem 20 cadeiras e cada fileira tem 2 a mais que a anterior. Quantas cadeiras há no total?
> a₁₅ = 20 + 14 · 2 = 48. S₁₅ = (20 + 48) · 15 ÷ 2 = **510 cadeiras**.

**Propriedade do termo do meio.** Em três termos seguidos de uma PA, o do meio é a **média** dos outros dois. Por isso, quando o problema fala em "três números em PA", é útil escrevê-los como **x − r, x, x + r**: a soma fica 3x, e o x sai na hora.

> **Exemplo resolvido.** Três números em PA somam 15 e o produto deles é 80. Quais são?
> (x − r) + x + (x + r) = 3x = 15 → x = 5. Produto: (5 − r) · 5 · (5 + r) = 80 → 25 − r² = 16 → r = 3 (ou −3).
> Os números são **2, 5 e 8**.

**Ligação com funções e juros.** Uma PA é uma função afim "contada de 1 em 1": aₙ = r · n + (a₁ − r). Os **juros simples** formam uma PA, porque o rendimento de cada mês é o mesmo.

### Progressão geométrica (PG)

Na PG, cada termo é o anterior **vezes** um número fixo, a **razão (q)**. Exemplos: 2, 6, 18, 54... (q = 3); 80, 40, 20... (q = 1/2); 1 000; 1 100; 1 210... (q = 1,1).

Para achar a razão, divida um termo pelo anterior: q = a₂ ÷ a₁.

**Termo geral.**

**aₙ = a₁ · qⁿ⁻¹**

> **Exemplo resolvido.** Qual é o 6º termo da PG 2, 6, 18...?
> a₆ = 2 · 3⁵ = 2 · 243 = **486**.

> **Exemplo resolvido.** Um boato se espalha: na primeira hora, uma pessoa conta para 3; na segunda, cada uma dessas conta para mais 3 pessoas novas, e assim por diante. Quantas pessoas novas ficam sabendo na 5ª hora?
> Novos por hora: 3, 9, 27... (q = 3). Na 5ª hora: 3 · 3⁴ = **243 pessoas**.

**Soma dos n primeiros termos (q ≠ 1).**

**Sₙ = a₁ · (qⁿ − 1) ÷ (q − 1)**

> **Exemplo resolvido.** Quanto é 2 + 6 + 18 + ... (6 termos)?
> S₆ = 2 · (3⁶ − 1) ÷ (3 − 1) = 2 · 728 ÷ 2 = **728**.

**Soma infinita (quando −1 < q < 1).** Se a razão está entre −1 e 1, os termos ficam cada vez menores e a soma de **infinitos** termos se aproxima de um valor fixo:

**S∞ = a₁ ÷ (1 − q)**

> **Exemplo resolvido.** Quanto vale 1 + 1/2 + 1/4 + 1/8 + ...?
> a₁ = 1 e q = 1/2. S = 1 ÷ (1 − 1/2) = **2**. Faz sentido: cada parcela cobre metade do que falta para chegar a 2.

> **Exemplo resolvido.** Uma bola cai de 10 m e, a cada quique, sobe metade da altura anterior. Que distância total ela percorre até parar?
> Descida inicial: 10 m. Depois, sobe e desce 5 m, 2,5 m, 1,25 m... Cada subida e descida conta duas vezes.
> Soma das alturas dos quiques: 5 ÷ (1 − 1/2) = 10 m. Distância total: 10 + 2 · 10 = **30 m**.

A soma infinita também explica as dízimas: 0,333... = 3/10 + 3/100 + 3/1 000 + ... = (3/10) ÷ (1 − 1/10) = **1/3**.

**Ligação com exponencial e juros.** Uma PG é uma função exponencial "contada de 1 em 1". Os **juros compostos** formam uma PG: R$ 1 000 a 10% ao mês viram 1 000; 1 100; 1 210; 1 331..., com q = 1,1.

### Como reconhecer: PA ou PG?

- Subtraia termos vizinhos: se a diferença é sempre a mesma, é **PA**.
- Divida termos vizinhos: se o quociente é sempre o mesmo, é **PG**.
- Palavras do texto: "a mais", "a menos", "aumenta R$ 10 por mês" → PA. "Dobra", "triplica", "cresce 5% ao mês", "cai pela metade" → PG.

### Erros mais comuns

- Usar n em vez de (n − 1) no termo geral (o primeiro termo já está no lugar 1).
- Aplicar a fórmula da soma da PA numa PG, ou o contrário.
- Na PG, calcular qⁿ⁻¹ errado: em 2 · 3⁵, primeiro faça 3⁵ = 243 e só depois multiplique por 2.
- Usar a soma infinita com razão maior que 1 (a soma não se estabiliza).
- No problema da bola, esquecer que cada quique é contado duas vezes (subida e descida).

### Como cai na prova

O ENEM adora sequências de figuras, planos de poupança e de pagamentos crescentes, fileiras de arquibancadas e crescimento de populações. Provas militares cobram mais as fórmulas, interpolação de termos, PA e PG combinadas e somas infinitas.

### Teste-se

1. Qual o 20º termo da PA 5, 9, 13...?
2. Qual a soma dos 20 primeiros termos dessa PA?
3. Qual o 8º termo da PG 3, 6, 12...?
4. Quanto vale a soma infinita 8 + 4 + 2 + 1 + ...?
5. Uma dívida de R$ 1 100 é paga em parcelas que formam uma PA: a primeira é R$ 20 e cada uma é R$ 20 maior que a anterior. Quantas parcelas são?

> **Respostas.** 1) 5 + 19 · 4 = **81**. 2) (5 + 81) · 20 ÷ 2 = **860**. 3) 3 · 2⁷ = **384**. 4) 8 ÷ (1 − 1/2) = **16**. 5) aₙ = 20n e Sₙ = (20 + 20n) · n ÷ 2 = 10n(n + 1) = 1 100 → n(n + 1) = 110 → **n = 10 parcelas** (10 · 11 = 110).

### Para lembrar

- PA soma a razão: aₙ = a₁ + (n − 1)r; Sₙ = (a₁ + aₙ)n ÷ 2.
- PG multiplica pela razão: aₙ = a₁ · qⁿ⁻¹; Sₙ = a₁(qⁿ − 1) ÷ (q − 1).
- Soma infinita da PG (−1 < q < 1): a₁ ÷ (1 − q).
- Três termos em PA: x − r, x, x + r.
- Juros simples são PA; juros compostos são PG.
