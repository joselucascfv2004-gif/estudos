### Para que serve este assunto

Quantas senhas diferentes podem existir? Quantas placas de carro? De quantas formas um time pode ser escalado? Quantos jogos há num campeonato? Análise combinatória é a arte de **contar sem listar tudo**. Ela também é a base da probabilidade. No ENEM, costuma aparecer uma questão por prova, e o maior desafio é decidir **se a ordem importa ou não**.

### Princípio fundamental da contagem (PFC)

Se uma escolha é feita em etapas independentes, o total de possibilidades é o **produto** das possibilidades de cada etapa.

> **Exemplo resolvido.** Com 3 camisas, 4 calças e 2 pares de tênis, quantos looks diferentes dá para montar?
> 3 · 4 · 2 = **24 looks**.

> **Exemplo resolvido.** As placas no padrão antigo tinham 3 letras (26 opções cada) e 4 algarismos (10 opções cada). Quantas placas eram possíveis?
> 26 · 26 · 26 · 10 · 10 · 10 · 10 = 26³ · 10⁴ = **175 760 000 placas**.

**Com ou sem repetição.** Se um item não pode ser repetido, as opções diminuem a cada etapa.

> **Exemplo resolvido.** Quantas senhas de 4 dígitos existem sem repetir dígitos?
> 10 · 9 · 8 · 7 = **5 040**. (Com repetição permitida, seriam 10⁴ = 10 000.)

**Dica de ouro:** desenhe "tracinhos" para cada posição e escreva quantas opções há em cada uma. **Comece pela posição com restrição.**

> **Exemplo resolvido.** Quantos números de 3 algarismos distintos são pares?
> Comece pela restrição: o último algarismo deve ser par. Mas o primeiro não pode ser zero, o que complica. Separe em dois casos:
> - termina em 0: 9 (primeiro) · 8 (meio) · 1 = 72;
> - termina em 2, 4, 6 ou 8: 8 (primeiro: não pode ser 0 nem o último) · 8 (meio) · 4 = 256.
> Total: 72 + 256 = **328**.

### Fatorial

n! (lê-se "n fatorial") é o produto de n por todos os inteiros positivos menores: 5! = 5 · 4 · 3 · 2 · 1 = 120. Por definição, 0! = 1. Fatoriais crescem muito rápido (10! = 3 628 800) e quase sempre se simplificam: 8! ÷ 6! = 8 · 7 = 56.

### Permutações: organizar todos os elementos

**Permutação simples** é o número de formas de **ordenar** n elementos diferentes: **Pₙ = n!**

> **Exemplo resolvido.** Quantos anagramas tem a palavra AMOR? E quantos começam por vogal?
> Todas as ordens das 4 letras: 4! = **24**.
> Começando por vogal: 2 escolhas para a primeira letra (A ou O) e as outras 3 letras em qualquer ordem: 2 · 3! = **12**.

**Elementos que devem ficar juntos.** Trate o grupo como um único "bloco" e depois multiplique pelas ordens dentro do bloco.

> **Exemplo resolvido.** De quantas formas 5 pessoas podem formar uma fila se Ana e Bia querem ficar juntas?
> Bloco (Ana+Bia) + 3 pessoas = 4 "itens": 4! = 24. Dentro do bloco, Ana e Bia trocam de lugar: 2!. Total: 24 · 2 = **48**.

**Permutação com repetição.** Se há elementos iguais, trocá-los de lugar não cria nada novo. Divida pelos fatoriais das repetições.

> **Exemplo resolvido.** Quantos anagramas tem a palavra BANANA?
> 6 letras, com A repetido 3 vezes e N repetido 2 vezes: 6! ÷ (3! · 2!) = 720 ÷ 12 = **60**.

**Permutação circular.** Para n pessoas em volta de uma mesa redonda, girar todos não muda a disposição: **(n − 1)!**. Cinco pessoas: 4! = **24** formas.

### Arranjos: escolher alguns, e a ordem importa

Escolher p elementos de um grupo de n, quando **a ordem (ou a função) faz diferença**:

**A(n, p) = n! ÷ (n − p)!**, ou simplesmente n · (n − 1) · ... (p fatores).

> **Exemplo resolvido.** De 10 pessoas, quantas formas há de escolher presidente, vice e tesoureiro?
> Os cargos são diferentes: a ordem importa. 10 · 9 · 8 = **720**.

> **Exemplo resolvido.** Num campeonato com 8 corredores, quantos pódios (1º, 2º e 3º) são possíveis?
> 8 · 7 · 6 = **336**.

### Combinações: escolher alguns, e a ordem não importa

Quando só interessa **quem** foi escolhido, não a ordem (grupos, comissões, apostas):

**C(n, p) = n! ÷ [p! · (n − p)!]**

Na prática: calcule o arranjo e **divida por p!** (as ordens que não interessam).

> **Exemplo resolvido.** De 10 pessoas, quantas comissões de 3 podem ser formadas?
> Arranjo: 720. Cada comissão foi contada 3! = 6 vezes (as várias ordens das mesmas pessoas). 720 ÷ 6 = **120 comissões**.

> **Exemplo resolvido.** Numa reunião com 8 pessoas, cada uma aperta a mão de todas as outras uma vez. Quantos apertos de mão?
> Cada aperto é uma dupla, sem ordem: C(8, 2) = 8 · 7 ÷ 2 = **28**.

> **Exemplo resolvido.** Quantas apostas simples diferentes existem na Mega-Sena (6 números de 1 a 60)?
> C(60, 6) = 60 · 59 · 58 · 57 · 56 · 55 ÷ 6! = **50 063 860**.

> **Exemplo resolvido.** Uma comissão terá 2 homens (de 5) e 2 mulheres (de 4). Quantas comissões são possíveis?
> C(5, 2) · C(4, 2) = 10 · 6 = **60**. (Escolhas independentes se multiplicam, pelo PFC.)

> **Exemplo resolvido.** Há 7 pontos numa circunferência. Quantos triângulos dá para formar com vértices nesses pontos?
> Três pontos quaisquer formam um triângulo, e a ordem não importa: C(7, 3) = 7 · 6 · 5 ÷ 6 = **35**.

### Como decidir: arranjo ou combinação?

Faça o **teste da troca**: escolha um resultado possível e troque a ordem de dois elementos.

- Se virou **outra** coisa (outro pódio, outra senha, outro cargo), **a ordem importa** → arranjo (ou PFC).
- Se continua a **mesma** coisa (mesma comissão, mesmo grupo, mesma aposta), **a ordem não importa** → combinação.

### Erros mais comuns

- Usar combinação quando há cargos ou posições diferentes (ou arranjo quando é só um grupo).
- Esquecer de dividir pelas repetições nos anagramas.
- Somar quando deveria multiplicar: etapas que acontecem **juntas** ("e") se multiplicam; casos **separados** ("ou") se somam.
- Não começar pela posição com restrição.
- Esquecer que o primeiro algarismo de um número não pode ser zero.

### Como cai na prova

O ENEM gosta de senhas, placas, cardápios, escalação de equipes, anagramas, apertos de mão e jogos de loteria, sempre exigindo a interpretação de "a ordem importa?". As provas militares cobram casos com várias restrições, permutações com repetição e problemas geométricos (triângulos, diagonais).

### Teste-se

1. Uma sorveteria tem 5 sabores e 3 coberturas. Quantas combinações de 1 sabor e 1 cobertura?
2. Quantos anagramas tem a palavra LIVRO?
3. De 6 pessoas, quantas duplas diferentes podem ser formadas?
4. Numa corrida com 8 atletas, quantos resultados possíveis há para ouro, prata e bronze?
5. Quantos anagramas tem a palavra OVO?

> **Respostas.** 1) 5 · 3 = **15**. 2) 5! = **120**. 3) C(6, 2) = **15**. 4) 8 · 7 · 6 = **336**. 5) 3! ÷ 2! = **3** (OVO, OOV, VOO).

### Para lembrar

- PFC: etapas independentes se multiplicam; comece pela restrição.
- Permutação: n!; com repetição, divida pelos fatoriais das repetições; circular, (n − 1)!.
- Arranjo: a ordem importa → n · (n − 1) · ... (p fatores).
- Combinação: a ordem não importa → arranjo ÷ p!.
- Teste da troca: trocar a ordem criou algo novo? Então a ordem importa.
