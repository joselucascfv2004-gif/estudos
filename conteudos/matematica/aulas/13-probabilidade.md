### Casos favoráveis sobre casos possíveis

Quando todos os resultados têm a mesma chance:

**P = (casos favoráveis) ÷ (casos possíveis)**

A probabilidade vai de 0 (impossível) a 1 (certo), ou de 0% a 100%.

> **Exemplo resolvido.** Num dado comum, qual a chance de sair número maior que 4?
> Favoráveis: 5 e 6. P = 2/6 = **1/3**.

### O complementar

**P(não A) = 1 − P(A)**. É a jogada para "pelo menos um".

> **Exemplo resolvido.** Lançando uma moeda 3 vezes, qual a chance de sair pelo menos uma cara?
> Nenhuma cara (três coroas): 1/8. Pelo menos uma: 1 − 1/8 = **7/8**.

### "E": multiplicar

Para eventos **independentes** (um não interfere no outro), a chance de acontecerem os dois é o produto:

**P(A e B) = P(A) · P(B)**

> **Exemplo resolvido.** Dois dados: chance de dar 6 nos dois? 1/6 · 1/6 = **1/36**.

**Sem reposição**, a segunda chance muda: tirando 2 bolas de uma urna com 3 vermelhas e 2 azuis, P(duas vermelhas) = 3/5 · 2/4 = **3/10**.

### "Ou": somar (com cuidado)

**P(A ou B) = P(A) + P(B) − P(A e B)**. O último termo tira a parte contada duas vezes.

> **Exemplo resolvido.** Uma carta de um baralho de 52: chance de ser copas ou rei?
> 13/52 + 4/52 − 1/52 (o rei de copas) = **16/52 = 4/13**.

### Probabilidade condicional

"Sabendo que…" **reduz o universo**: os casos possíveis passam a ser só os que satisfazem a informação dada.

**P(A | B) = P(A e B) ÷ P(B)**

> **Exemplo resolvido.** Numa turma, 30 alunos: 18 meninas, das quais 6 usam óculos. Sorteada uma menina, qual a chance de usar óculos?
> O universo agora são as 18 meninas: **6/18 = 1/3**.

### Usando tabelas e árvores

- **Tabela de dupla entrada:** organiza dados como "fumante × não fumante" e "doente × saudável". Leia a linha ou coluna certa.
- **Árvore:** cada ramo tem uma probabilidade. Multiplique ao longo do caminho e some os caminhos que interessam.

### Cuidados

- Moedas e dados **não têm memória**: depois de 5 caras, a chance de cara continua 1/2.
- Em sorteios com combinação (como loterias), use C(n, p) para contar os casos.
