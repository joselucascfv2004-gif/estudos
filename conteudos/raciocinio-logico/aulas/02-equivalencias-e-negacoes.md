### Negar o "e" e o "ou": as leis de De Morgan

Para negar, **negue cada parte** e **troque o conectivo** ("e" vira "ou", "ou" vira "e").

- **~(P ∧ Q) = ~P ∨ ~Q**
- **~(P ∨ Q) = ~P ∧ ~Q**

> **Exemplo resolvido.** Negue: "Ana é alta **e** Bruno é forte."
> "Ana **não** é alta **ou** Bruno **não** é forte."

> **Exemplo resolvido.** Negue: "Vou à praia **ou** ao cinema."
> "**Não** vou à praia **e não** vou ao cinema."

### Negar a condicional

A condicional só é falsa quando a primeira é V e a segunda é F. Então a negação é exatamente esse caso:

**~(P → Q) = P ∧ ~Q** ("**mantém a primeira, E, nega a segunda**").

> **Exemplo resolvido.** Negue: "Se estudo, então passo."
> "**Estudo e não passo.**"

Erro comum: achar que a negação é "se estudo, então não passo". Está **errado**: a negação de uma condicional **não é** outra condicional.

### Equivalências da condicional

P → Q é equivalente a:

1. **~Q → ~P** (a **contrapositiva**: inverte a ordem e nega as duas).
2. **~P ∨ Q** (nega a primeira, troca por "ou", mantém a segunda).

> **Exemplo resolvido.** "Se é carioca, então é brasileiro." Escreva duas equivalentes.
> Contrapositiva: "Se **não** é brasileiro, então **não** é carioca."
> Com "ou": "**Não** é carioca **ou** é brasileiro."

**Cuidado:** P → Q **não** equivale a:

- **Q → P** (recíproca): "se é brasileiro, então é carioca" (falso!);
- **~P → ~Q** (inversa): "se não é carioca, então não é brasileiro" (falso!).

### A bicondicional

- **P ↔ Q** equivale a **(P → Q) ∧ (Q → P)**: vale nos dois sentidos.
- A negação de "P se e somente se Q" é "**ou P, ou Q**" (ou exclusivo).

### Negar quantificadores

- **Todo** → **algum… não**: "Todo aluno estudou" → "**Algum** aluno **não** estudou."
- **Nenhum** → **algum**: "Nenhum aluno faltou" → "**Algum** aluno faltou."
- **Algum** → **nenhum**: "Algum político é honesto" → "**Nenhum** político é honesto."

Erro clássico: a negação de "todo aluno estudou" **não é** "nenhum aluno estudou". Para desmentir o "todo", basta **um** que não estudou.

> **Exemplo resolvido.** Qual a negação de "Todos os candidatos chegaram cedo e nenhum esqueceu o documento"?
> Negue o "e" (vira "ou") e cada parte: "**Algum** candidato **não** chegou cedo **ou algum** esqueceu o documento."

### Tabela rápida de negações

- "e" → negue as duas e use "ou".
- "ou" → negue as duas e use "e".
- "se P, então Q" → "P e não Q".
- "P se e somente se Q" → "ou P, ou Q".
- "todo" → "algum… não".
- "nenhum" → "algum".
- "algum" → "nenhum".
