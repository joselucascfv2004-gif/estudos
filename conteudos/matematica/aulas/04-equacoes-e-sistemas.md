### Para que serve este assunto

Equação é a ferramenta para descobrir um valor que você ainda não conhece, a partir de pistas. "Quanto custa cada camiseta?", "qual a idade do filho?", "a partir de quantos minutos o plano B compensa?": toda vez que um problema esconde um número, uma equação ajuda a achá-lo. Por isso este assunto aparece no meio de questões de quase todos os outros: porcentagem, geometria, física, química, matemática financeira.

Nesta aula: equações do 1º grau, como traduzir textos em equações, equações do 2º grau (completas e incompletas, Bhaskara, soma e produto), sistemas, inequações e uma introdução ao módulo.

### Equação é uma balança

Uma equação é uma igualdade com um valor desconhecido (a incógnita, normalmente x). Pense numa balança em equilíbrio: tudo o que você fizer de um lado, precisa fazer do outro, para ela continuar equilibrada. Você pode:

- somar ou subtrair o mesmo número dos dois lados;
- multiplicar ou dividir os dois lados pelo mesmo número (diferente de zero).

O objetivo é **isolar o x**: deixar o x sozinho de um lado.

> **Exemplo resolvido.** Resolva 3x + 7 = 22.
> Tire 7 dos dois lados: 3x = 15. Divida os dois lados por 3: **x = 5**.
> Conferindo: 3 · 5 + 7 = 22 ✔

O famoso "passa para o outro lado trocando o sinal" é só um atalho dessas operações: somar vira subtrair, multiplicar vira dividir.

> **Exemplo resolvido.** Resolva 2(x − 3) = x + 4.
> Aplique a distributiva: 2x − 6 = x + 4. Leve os x para a esquerda e os números para a direita: 2x − x = 4 + 6. Resultado: **x = 10**.

**Equações com frações.** Multiplique tudo pelo MMC dos denominadores para "sumir" com as frações.

> **Exemplo resolvido.** Resolva x/3 + x/4 = 14.
> MMC(3, 4) = 12. Multiplicando tudo por 12: 4x + 3x = 168 → 7x = 168 → **x = 24**.

### Traduzindo textos em equações

A maior dificuldade não é a conta, é a **tradução**. Algumas correspondências:

- "um número" → x; "o dobro" → 2x; "o triplo" → 3x; "a metade" → x/2;
- "três números consecutivos" → x, x + 1, x + 2;
- "daqui a 5 anos" → idade + 5; "há 5 anos" → idade − 5;
- "excede em 4" ou "4 a mais" → + 4;
- "é" ou "resulta em" → =.

**Passo a passo:** (1) diga em palavras quem é o x; (2) escreva cada informação do texto em linguagem matemática; (3) resolva; (4) **responda o que foi perguntado** (às vezes não é o x).

> **Exemplo resolvido.** A soma de três números consecutivos é 72. Quais são eles?
> x + (x + 1) + (x + 2) = 72 → 3x + 3 = 72 → 3x = 69 → x = 23. Os números são **23, 24 e 25**.

> **Exemplo resolvido.** Um pai tem o triplo da idade do filho. Daqui a 12 anos, terá o dobro. Quais são as idades hoje?
> Filho: x; pai: 3x. Daqui a 12 anos: 3x + 12 = 2(x + 12) → 3x + 12 = 2x + 24 → x = 12.
> O filho tem **12 anos** e o pai, **36**. Conferindo: daqui a 12 anos, 48 é o dobro de 24 ✔

### Equação do 2º grau

Tem a forma **ax² + bx + c = 0**, com a diferente de zero. Pode ter duas soluções (raízes), uma só ou nenhuma solução real.

**Incompletas: resolva sem fórmula.**

- **Sem o termo b (b = 0):** isole o x². x² − 9 = 0 → x² = 9 → **x = 3 ou x = −3**.
- **Sem o termo c (c = 0):** coloque o x em evidência. x² − 4x = 0 → x(x − 4) = 0 → **x = 0 ou x = 4** (um produto só é zero se algum fator for zero).

**Completas: fórmula de Bhaskara.**

1. Calcule o discriminante: **Δ = b² − 4ac**.
2. Se Δ > 0, há duas raízes diferentes; se Δ = 0, uma raiz (dupla); se Δ < 0, nenhuma raiz real.
3. Raízes: **x = (−b ± √Δ) ÷ 2a**.

> **Exemplo resolvido.** Resolva x² − 5x + 6 = 0.
> a = 1, b = −5, c = 6. Δ = 25 − 24 = 1. x = (5 ± 1) ÷ 2 → **x = 3 ou x = 2**.

> **Exemplo resolvido.** Resolva 2x² − 3x − 2 = 0.
> Δ = 9 − 4 · 2 · (−2) = 9 + 16 = 25. x = (3 ± 5) ÷ 4 → **x = 2 ou x = −1/2**.

> **Exemplo resolvido.** x² + x + 1 = 0 tem solução?
> Δ = 1 − 4 = −3 < 0. **Não há raiz real** (não existe número real ao quadrado que dê negativo).

**Soma e produto: o atalho.** Para ax² + bx + c = 0, as raízes têm **soma = −b/a** e **produto = c/a**. Quando a = 1 e as raízes são inteiras, dá para achá-las de cabeça: em x² − 5x + 6 = 0, procure dois números que somam 5 e multiplicam 6: são 2 e 3.

> **Exemplo resolvido (problema).** Um terreno retangular tem 96 m² de área, e o comprimento é 4 m maior que a largura. Quais são as medidas?
> Largura x, comprimento x + 4: x(x + 4) = 96 → x² + 4x − 96 = 0. Δ = 16 + 384 = 400. x = (−4 ± 20) ÷ 2 → x = 8 ou x = −12.
> Medida negativa não existe, então a largura é **8 m** e o comprimento, **12 m**.

Em problemas, sempre confira se as duas raízes fazem sentido: tempo, medida e quantidade não podem ser negativos.

### Sistemas de duas equações

Quando há duas incógnitas, você precisa de duas equações. Há dois métodos principais:

- **Substituição:** isole uma incógnita numa equação e substitua na outra.
- **Adição:** some (ou subtraia) as equações para eliminar uma incógnita. Às vezes é preciso multiplicar uma equação antes.

> **Exemplo resolvido (substituição).** y = 2x e 3x + y = 25.
> Substituindo: 3x + 2x = 25 → 5x = 25 → x = 5. Então y = **10** e x = **5**.

> **Exemplo resolvido (adição).** Num estacionamento há carros e motos: 30 veículos e 100 rodas. Quantos de cada?
> c + m = 30 e 4c + 2m = 100. Multiplique a primeira por 2: 2c + 2m = 60. Subtraia da segunda: 2c = 40 → c = 20.
> São **20 carros e 10 motos**. Conferindo: 80 + 20 = 100 rodas ✔

**O que o sistema "diz" no gráfico.** Cada equação do 1º grau com duas incógnitas é uma reta. A solução do sistema é o ponto onde as retas se cruzam:

- retas que se cruzam → **uma solução** (sistema possível e determinado);
- retas paralelas → **nenhuma solução** (impossível);
- retas iguais → **infinitas soluções** (possível e indeterminado).

### Inequações

Uma inequação usa >, <, ≥ ou ≤ no lugar do =. Resolve-se igual à equação, com **uma regra a mais**: ao multiplicar ou dividir os dois lados por um número **negativo**, o sinal da desigualdade **inverte**.

> **Exemplo resolvido.** Resolva 3 − 2x > 7.
> −2x > 4. Dividindo por −2 (negativo), o sinal vira: **x < −2**.
> Conferindo com x = −3: 3 + 6 = 9 > 7 ✔

> **Exemplo resolvido (problema).** O plano A de celular cobra R$ 50 fixos mais R$ 0,20 por minuto. O plano B cobra R$ 0,45 por minuto, sem taxa fixa. A partir de quantos minutos o plano A fica mais barato?
> 50 + 0,2t < 0,45t → 50 < 0,25t → **t > 200 minutos**.

**Inequação do 2º grau.** Ache as raízes e lembre do formato da parábola. Em x² − 5x + 6 < 0 (raízes 2 e 3, parábola com "boca para cima"), a expressão é negativa **entre as raízes**: **2 < x < 3**. Fora delas, é positiva.

### Módulo, em poucas palavras

O módulo |x| é a distância de x até o zero, por isso nunca é negativo: |5| = 5 e |−5| = 5.

- |x − 2| = 5 significa que x − 2 vale 5 ou −5 → **x = 7 ou x = −3**.
- |x| < 3 significa "distância até o zero menor que 3" → **−3 < x < 3**.

O módulo tem uma aula própria, com a função modular.

### Erros mais comuns

- Esquecer de aplicar a operação nos **dois** lados da equação.
- Errar o sinal ao "passar para o outro lado".
- Não inverter a desigualdade ao dividir por negativo.
- Na Bhaskara, esquecer que b² é sempre positivo (com b = −5, b² = 25) e errar o sinal de −4ac.
- Responder o x quando a pergunta era outra coisa (o comprimento, a idade do pai, o total).

### Como cai na prova

O ENEM quase nunca pede "resolva a equação": ele descreve uma situação (planos de celular, preço de ingressos, áreas de terrenos) e você precisa montá-la. Comparação de planos com inequações é um clássico. Concursos e provas militares cobram mais a parte algébrica: Bhaskara, soma e produto, sistemas e problemas de idades e de moedas.

### Teste-se

1. Resolva 5x − 8 = 2x + 7.
2. Quais são as raízes de x² − 7x + 10 = 0?
3. Resolva o sistema x + y = 10 e 2x − y = 8.
4. Resolva −3x + 6 ≤ 0.
5. O produto de dois números inteiros positivos e consecutivos é 56. Quais são eles?

> **Respostas.** 1) 3x = 15 → **x = 5**. 2) Soma 7 e produto 10: **2 e 5**. 3) Somando: 3x = 18 → **x = 6 e y = 4**. 4) −3x ≤ −6 → **x ≥ 2** (o sinal inverteu). 5) x(x + 1) = 56 → **7 e 8**.

### Para lembrar

- Equação é balança: o que faz de um lado, faz do outro.
- Traduza o texto com calma e responda o que foi perguntado.
- 2º grau: Δ = b² − 4ac; x = (−b ± √Δ) ÷ 2a; soma −b/a, produto c/a.
- Sistemas: substituição ou adição; solução é o cruzamento das retas.
- Inequação: multiplicou ou dividiu por negativo, inverte o sinal.
