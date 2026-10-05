### O princípio fundamental da contagem

Se uma escolha tem m opções e, para cada uma, outra escolha tem n opções, as duas juntas têm **m · n** possibilidades. É a ferramenta que resolve quase tudo.

> **Exemplo resolvido.** Com 3 camisetas, 2 bermudas e 4 pares de tênis, quantos visuais diferentes?
> 3 · 2 · 4 = **24**.

**Jogada:** desenhe as "casas" (os tracinhos) e preencha cada uma com o número de opções. Comece pelas casas com **restrição**.

> **Exemplo resolvido.** Quantos números de 3 algarismos distintos são pares, usando 1, 2, 3, 4, 5?
> A unidade tem restrição (par): 2 opções. Depois, a centena: 4 opções; a dezena: 3. Total: 2 · 4 · 3 = **24**.

### Permutação: arrumar todos em fila

n elementos distintos em fila: **n! = n · (n − 1) · … · 1**. Por exemplo, 5! = 120.

- **Anagramas** de AMOR: 4! = 24.
- **Com letras repetidas**, divida pelas repetições: ARARA tem 5! ÷ (3! · 2!) = **10** anagramas.
- **Em roda:** (n − 1)!, porque girar a roda não muda a arrumação.

### Arranjo × combinação: a ordem importa?

Escolhendo p elementos entre n:

- **A ordem importa** (pódio, senha, cargos diferentes): **arranjo**, A = n! ÷ (n − p)!.
- **A ordem não importa** (comissão, grupo, salada de frutas): **combinação**, C = n! ÷ [p! · (n − p)!].

Teste prático: troque dois escolhidos de lugar. Se virou outra coisa, a ordem importa.

> **Exemplo resolvido.** Numa turma de 10 alunos:
> Presidente e vice: A = 10 · 9 = **90**.
> Comissão de 2: C = 10 · 9 ÷ 2 = **45** (Ana e Bruno é o mesmo que Bruno e Ana).

### Mais jogadas

- **"Pelo menos um":** conte o total e tire os casos de "nenhum".
- **Elementos juntos:** amarre-os como um bloco, permute os blocos e depois permute dentro do bloco.
- **"E" multiplica; "ou" soma** (quando os casos não se misturam).

> **Exemplo resolvido.** De quantos modos 5 pessoas se sentam em fila com Ana e Bia sempre juntas?
> Bloco (Ana-Bia) + 3 pessoas = 4 itens: 4! = 24. Dentro do bloco: 2! = 2. Total: **48**.
