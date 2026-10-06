### O que é uma proposição

É uma **frase declarativa** que pode ser julgada como **verdadeira (V)** ou **falsa (F)**, nunca as duas.

- "Brasília é a capital do Brasil." → proposição (V).
- "2 + 2 = 5." → proposição (F).
- "Que horas são?", "Estude!", "Que lindo!" → **não** são proposições (pergunta, ordem, exclamação).
- "x + 1 = 3" → **não** é proposição (é uma sentença aberta: depende de x).

### Os conectivos

Juntam proposições simples (P, Q) em proposições compostas.

#### Conjunção: "e" (P ∧ Q)

Só é **V** se **as duas** forem V. Basta uma falsa para tudo ficar falso.

#### Disjunção: "ou" (P ∨ Q)

Só é **F** se **as duas** forem F. Basta uma verdadeira.

#### Condicional: "se P, então Q" (P → Q)

Só é **falsa** num caso: **P verdadeira e Q falsa**. O truque para lembrar: "**Vera Fischer**" (**V** → **F** = **F**).

> **Exemplo resolvido.** "Se chover, então levo o guarda-chuva." Em que caso eu menti?
> Só se **choveu (V)** e eu **não levei** o guarda-chuva (F). Se não choveu, a frase é verdadeira de qualquer jeito: eu não prometi nada para o dia de sol.

#### Bicondicional: "P se e somente se Q" (P ↔ Q)

**V** quando P e Q têm o **mesmo valor** (as duas V ou as duas F).

#### Ou exclusivo: "ou P, ou Q" (P ⊻ Q)

**V** quando **exatamente uma** é verdadeira. É o contrário da bicondicional.

### Resumo em uma linha por conectivo

- **e:** V só se V e V.
- **ou:** F só se F e F.
- **se… então:** F só se V e F.
- **se e somente se:** V se iguais.
- **ou… ou:** V se diferentes.

### Montando a tabela-verdade

Com **n** proposições simples, a tabela tem **2ⁿ linhas**.

- 2 proposições → 4 linhas.
- 3 proposições → 8 linhas.
- 4 proposições → 16 linhas.

Tabela de P → Q, linha por linha:

1. P = V, Q = V → **V**
2. P = V, Q = F → **F**
3. P = F, Q = V → **V**
4. P = F, Q = F → **V**

> **Exemplo resolvido.** Sabendo que P é V e Q é F, qual o valor de (P ∨ Q) → (P ∧ Q)?
> P ∨ Q = V. P ∧ Q = F. Então V → F = **F**.

### Tautologia, contradição e contingência

- **Tautologia:** **sempre V**, em todas as linhas. Ex.: P ∨ ~P ("vai chover ou não vai chover").
- **Contradição:** **sempre F**. Ex.: P ∧ ~P.
- **Contingência:** às vezes V, às vezes F (a maioria das proposições).

### Negação

A negação (~P) inverte o valor: se P é V, ~P é F. Nas provas, aparece como "não é verdade que…" ou "é falso que…".

> **Exemplo resolvido.** "Não é verdade que João é médico" equivale a quê?
> "**João não é médico**."
