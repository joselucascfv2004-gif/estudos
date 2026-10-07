### Para que serve este assunto

Problemas com conjuntos e diagramas de Venn são clássicos de concursos e também caem no ENEM: pesquisas sobre quem lê determinado jornal, quem fala inglês e espanhol, quem tem carro e moto. A lógica é simples, mas é fácil contar alguém **duas vezes**. O diagrama de Venn é a ferramenta que evita esse erro: com ele, você enxerga cada região separadamente.

### Conceitos básicos

- **Conjunto** é uma coleção de elementos. Pode ser descrito listando os elementos ({1, 2, 3}) ou por uma propriedade ({x | x é par}).
- **Conjunto vazio** (∅ ou { }): não tem elementos.
- **Conjunto universo** (U): todos os elementos possíveis no problema.
- **n(A)**: o número de elementos do conjunto A.
- Dois conjuntos são **iguais** quando têm exatamente os mesmos elementos (a ordem e a repetição não importam).

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

### Os conjuntos numéricos

- **Naturais (ℕ):** {0, 1, 2, 3, ...}.
- **Inteiros (ℤ):** {..., −2, −1, 0, 1, 2, ...}.
- **Racionais (ℚ):** podem ser escritos como fração de inteiros (inclui decimais finitos e dízimas periódicas: 0,5; 0,333...).
- **Irracionais:** decimais infinitos e não periódicos (√2, π).
- **Reais (ℝ):** racionais + irracionais.
- ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.

### Problemas com "pelo menos", "no máximo" e "apenas"

- "**Pelo menos um**" = a união (um ou mais).
- "**Apenas um**" (exatamente um) = só A + só B + só C, sem as interseções.
- "**No máximo um**" = nenhum + exatamente um.
- "**Os dois**" = a interseção.

> **Exemplo resolvido.** Numa empresa de 60 funcionários, 35 falam inglês, 20 falam espanhol e 12 não falam nenhuma das duas línguas. Quantos falam as duas?
> Falam pelo menos uma: 60 − 12 = 48. Pela fórmula: 48 = 35 + 20 − x, então x = **7** falam as duas.

> **Exemplo resolvido.** No exemplo anterior, quantos falam apenas inglês?
> 35 − 7 = **28**.

### Erros mais comuns

- Somar n(A) + n(B) sem subtrair a interseção.
- Confundir "gostam de A" (inclui quem gosta de outros também) com "gostam só de A".
- Esquecer de descontar o centro ao preencher as interseções de dois no diagrama de três conjuntos.
- Esquecer quem não pertence a nenhum conjunto (fora dos círculos).
- Confundir ∈ (elemento) com ⊂ (conjunto).

### Como cai na prova

Pesquisas de preferência com dois ou três conjuntos, perguntando quantos estão em nenhum, em apenas um, em pelo menos um ou em todos; operações entre conjuntos listados; número de subconjuntos; relações de pertinência e inclusão; problemas com conjuntos numéricos.

### Teste-se

1. Se A = {2, 4, 6, 8} e B = {4, 8, 12}, quanto é A ∩ B? E A − B?
2. Numa turma, 30 gostam de matemática, 25 de português e 10 dos dois. Quantos gostam de pelo menos uma?
3. Quantos subconjuntos tem um conjunto com 5 elementos?
4. Numa pesquisa com 200 pessoas, 120 usam o aplicativo A, 90 usam o B e 40 usam os dois. Quantas não usam nenhum?
5. O número 0,333... pertence a qual conjunto: racionais ou irracionais?

> **Respostas.** 1) A ∩ B = **{4, 8}**; A − B = **{2, 6}**. 2) 30 + 25 − 10 = **45**. 3) 2⁵ = **32**. 4) Usam algum: 120 + 90 − 40 = 170; nenhum: 200 − 170 = **30**. 5) **Racionais** (é uma dízima periódica, igual a 1/3).

### Para lembrar

- União (ou), interseção (e), diferença (só um), complementar (o que falta no universo).
- n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Nenhum = total − união.
- Três conjuntos: preencha o Venn do centro para fora, descontando.
- Subconjuntos: 2ⁿ. ∈ para elemento; ⊂ para conjunto; ∅ está contido em todos.
- ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.
