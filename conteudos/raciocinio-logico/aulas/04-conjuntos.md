### As operações

- **União (A ∪ B):** o que está em A **ou** em B (ou nos dois).
- **Interseção (A ∩ B):** o que está em A **e** em B ao mesmo tempo.
- **Diferença (A − B):** o que está em A, mas **não** em B.
- **Complementar de A:** o que falta em A para completar o **universo**.

> **Exemplo.** A = {1, 2, 3, 4} e B = {3, 4, 5}.
> A ∪ B = {1, 2, 3, 4, 5}; A ∩ B = {3, 4}; A − B = {1, 2}; B − A = {5}.

### A fórmula da união

**n(A ∪ B) = n(A) + n(B) − n(A ∩ B)**

Subtrai-se a interseção porque ela foi contada **duas vezes**.

> **Exemplo resolvido.** Numa turma, 25 alunos gostam de futebol, 18 de vôlei e 10 dos dois. Quantos gostam de pelo menos um?
> 25 + 18 − 10 = **33**.

E "**nenhum dos dois**" = total − união. Se a turma tem 40 alunos: 40 − 33 = **7**.

### Com três conjuntos

n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(A ∩ C) − n(B ∩ C) + n(A ∩ B ∩ C)

Na prática, é mais fácil e seguro usar o **diagrama de Venn**.

### Diagrama de Venn: do centro para fora

1. Comece pela **interseção dos três**.
2. Preencha as interseções de dois a dois, **descontando** o centro.
3. Preencha o que é "só A", "só B", "só C", descontando o que já foi colocado.
4. Some tudo e compare com o total.

> **Exemplo resolvido.** Pesquisa com 100 pessoas sobre três jornais: 40 leem A, 35 leem B, 30 leem C; 12 leem A e B, 10 leem A e C, 8 leem B e C; 4 leem os três. Quantas não leem nenhum?
> Centro: 4.
> Só A e B: 12 − 4 = 8. Só A e C: 10 − 4 = 6. Só B e C: 8 − 4 = 4.
> Só A: 40 − 8 − 6 − 4 = 22. Só B: 35 − 8 − 4 − 4 = 19. Só C: 30 − 6 − 4 − 4 = 16.
> Total que lê algum: 4 + 8 + 6 + 4 + 22 + 19 + 16 = 79. Nenhum: 100 − 79 = **21**.

### "Só" × "pelo menos"

- "Gostam **de A**" inclui quem gosta de A e de outros.
- "Gostam **só de A**" exclui as interseções.

Ler essas palavras com atenção é metade da questão.

### Subconjuntos

Um conjunto com **n** elementos tem **2ⁿ subconjuntos** (contando o vazio e o próprio conjunto).

> **Exemplo.** {a, b, c} tem 2³ = **8** subconjuntos: ∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c}.

### Pertinência e inclusão

- **∈ (pertence):** relação entre **elemento** e conjunto: 2 ∈ {1, 2, 3}.
- **⊂ (está contido):** relação entre **conjunto** e conjunto: {1, 2} ⊂ {1, 2, 3}.
- O **conjunto vazio** está contido em qualquer conjunto.
