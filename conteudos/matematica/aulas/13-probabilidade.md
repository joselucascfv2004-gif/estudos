### Para que serve este assunto

Qual a chance de chover amanhã? De ganhar na loteria? De um teste médico dar positivo? De tirar dois números iguais nos dados? Probabilidade mede **o quanto um acontecimento é provável**, com um número entre 0 (impossível) e 1 (certo), ou entre 0% e 100%. Ela aparece no ENEM quase todo ano, muitas vezes em sorteios, jogos, pesquisas e genética. A base é simples; o cuidado está em contar bem os casos e entender as palavras "e", "ou", "pelo menos" e "dado que".

### A ideia básica

Quando todos os resultados têm a **mesma chance** de acontecer:

**P(evento) = número de casos favoráveis ÷ número de casos possíveis**

O conjunto de todos os resultados possíveis é o **espaço amostral**.

> **Exemplo resolvido.** Num dado comum, qual a probabilidade de sair um número par? E um número maior que 4?
> Espaço amostral: {1, 2, 3, 4, 5, 6}, 6 casos.
> Par: {2, 4, 6} → 3/6 = **1/2** (50%). Maior que 4: {5, 6} → 2/6 = **1/3**.

> **Exemplo resolvido.** Ao lançar dois dados, qual a probabilidade de a soma ser 7? E 10?
> São 6 · 6 = 36 resultados possíveis (o par (1, 6) é diferente do par (6, 1)).
> Soma 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6/36 = **1/6**.
> Soma 10: (4,6), (5,5), (6,4) → 3/36 = **1/12**.

Repare que 7 é a soma mais provável: é a que tem mais combinações. Contar com cuidado o espaço amostral é metade do trabalho.

### Evento complementar: o truque do "pelo menos"

A probabilidade de algo **não** acontecer é 1 menos a probabilidade de acontecer: **P(não A) = 1 − P(A)**.

Isso é muito útil quando a pergunta tem "pelo menos um": em geral é mais fácil calcular a chance de **nenhum** e tirar de 1.

> **Exemplo resolvido.** Lançando uma moeda 3 vezes, qual a probabilidade de sair pelo menos uma cara?
> O contrário de "pelo menos uma cara" é "nenhuma cara" (três coroas): (1/2)³ = 1/8.
> P(pelo menos uma cara) = 1 − 1/8 = **7/8**.

### Eventos sucessivos: "e" multiplica

Se dois eventos acontecem um depois do outro (ou ao mesmo tempo), a probabilidade de acontecerem **os dois** é o **produto** das probabilidades, levando em conta o que já aconteceu.

> **Exemplo resolvido.** Uma urna tem 3 bolas vermelhas e 2 azuis. Retiram-se duas bolas, uma após a outra. Qual a probabilidade de as duas serem vermelhas?
> **Sem reposição** (a primeira não volta): 3/5 · 2/4 = 6/20 = **3/10**. Na segunda retirada, sobram 4 bolas, 2 delas vermelhas.
> **Com reposição** (a primeira volta): 3/5 · 3/5 = **9/25**. Os eventos ficam independentes.

Dois eventos são **independentes** quando um não muda a chance do outro (lançamentos de moeda, de dado, sorteios com reposição). Moedas e dados não têm memória: depois de cinco caras seguidas, a chance de cara na sexta continua 1/2.

### Eventos alternativos: "ou" soma

A probabilidade de acontecer **A ou B** é a soma das probabilidades, **menos** a da interseção (para não contar duas vezes os casos em comum):

**P(A ou B) = P(A) + P(B) − P(A e B)**

> **Exemplo resolvido.** Tirando uma carta de um baralho de 52, qual a probabilidade de ser um rei ou uma carta de copas?
> Reis: 4. Copas: 13. Rei de copas (está nos dois grupos): 1.
> P = 4/52 + 13/52 − 1/52 = 16/52 = **4/13**.

Se os eventos não podem acontecer juntos (mutuamente exclusivos), a interseção é zero e basta somar: no dado, P(sair 3 ou 5) = 1/6 + 1/6 = **1/3**.

### Probabilidade condicional: "dado que..."

Quando a questão diz que algo **já aconteceu**, o espaço amostral **encolhe**: só se consideram os casos em que aquilo aconteceu.

**P(A dado B) = casos de A e B ÷ casos de B**

> **Exemplo resolvido.** Numa turma de 30 alunos, há 18 meninas e 12 meninos. Usam óculos 6 meninas e 4 meninos. Sorteia-se um aluno e se sabe que ele usa óculos. Qual a probabilidade de ser menina?
> O novo espaço amostral são os 10 alunos de óculos. Desses, 6 são meninas: P = 6/10 = **3/5**.
> Sem a informação, a chance de ser menina seria 18/30 = 3/5 também; aqui coincidiu. Em outras situações, a informação muda muito a probabilidade.

Organizar os dados numa tabela de dupla entrada (no rascunho) ou numa **árvore de possibilidades** ajuda muito nesses problemas.

### Probabilidade com análise combinatória

Quando os casos são muitos, conta-se com as técnicas de combinatória.

> **Exemplo resolvido.** Qual a probabilidade de acertar as 6 dezenas da Mega-Sena com uma aposta simples?
> Casos possíveis: C(60, 6) = 50 063 860. Favorável: 1. P = **1 em 50 063 860**.

> **Exemplo resolvido.** Lançando uma moeda 4 vezes, qual a probabilidade de saírem exatamente 2 caras?
> Total: 2⁴ = 16. Formas de escolher em quais 2 lançamentos sai cara: C(4, 2) = 6. P = 6/16 = **3/8**.

Esse último raciocínio (escolher as posições dos sucessos e multiplicar pelas chances) é a base da chamada distribuição binomial, que aparece em genética (filhos com determinada característica).

### Probabilidade e frequência

Em muitas situações, não dá para contar casos "igualmente prováveis": estima-se a probabilidade pela **frequência observada**. Se, num ano, choveu em 90 de 365 dias, a chance estimada de chuva num dia qualquer é cerca de 25%. Quanto mais observações, mais confiável a estimativa (lei dos grandes números). Pesquisas eleitorais usam essa ideia.

### Erros mais comuns

- Esquecer que, sem reposição, o total (e às vezes os favoráveis) diminui na segunda retirada.
- Somar quando deveria multiplicar ("e") ou multiplicar quando deveria somar ("ou").
- Contar duas vezes a interseção no "ou".
- Calcular "pelo menos um" caso a caso, em vez de usar o complementar.
- Contar (1, 6) e (6, 1) como o mesmo resultado nos dois dados.
- Achar que um resultado "está para sair" porque não sai há muito tempo.

### Como cai na prova

O ENEM traz sorteios em urnas, dados, cartas, rifas, escolha de pessoas em grupos descritos por tabelas, "pelo menos um" e probabilidade condicional a partir de dados de pesquisas. Também cai em Biologia, no cruzamento de genes. Provas militares cobram mais combinatória junto com probabilidade.

### Teste-se

1. Uma urna tem 4 bolas brancas e 6 pretas. Qual a probabilidade de sortear uma branca?
2. Lançando uma moeda duas vezes, qual a probabilidade de sair pelo menos uma coroa?
3. Num dado, qual a probabilidade de sair 3 ou 5?
4. Da urna da pergunta 1, retiram-se duas bolas sem reposição. Qual a probabilidade de as duas serem brancas?
5. Se a probabilidade de chover amanhã é 35%, qual a probabilidade de não chover?

> **Respostas.** 1) 4/10 = **2/5**. 2) 1 − 1/4 = **3/4**. 3) 2/6 = **1/3**. 4) 4/10 · 3/9 = 12/90 = **2/15**. 5) **65%**.

### Para lembrar

- P = favoráveis ÷ possíveis (resultados igualmente prováveis).
- "Não": 1 − P. "Pelo menos um": 1 − P(nenhum).
- "E": multiplica (atenção à reposição). "Ou": soma e tira a interseção.
- "Dado que": o espaço amostral encolhe para o que já aconteceu.
- Casos numerosos: conte com combinatória.
