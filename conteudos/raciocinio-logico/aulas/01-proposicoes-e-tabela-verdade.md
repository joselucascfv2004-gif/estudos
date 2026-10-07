### Para que serve este assunto

Raciocínio lógico cai em quase todos os concursos (Banco do Brasil, Caixa, BNB, IBGE, tribunais, polícias) e é a base de tudo o que vem depois: negações, equivalências, argumentos. A lógica proposicional ensina a analisar frases como se fossem peças de um quebra-cabeça: cada frase simples é verdadeira ou falsa, e os **conectivos** ("e", "ou", "se... então") dizem como essas verdades se combinam. Parece abstrato, mas é só seguir **cinco regras** (uma para cada conectivo). Quem domina a tabela-verdade resolve rápido questões que assustam à primeira vista. As bancas como a **Cebraspe** cobram muito no formato "certo ou errado".

### Os três princípios da lógica clássica

- **Identidade:** toda proposição é igual a si mesma (se é V, é V).
- **Não contradição:** uma proposição não pode ser V e F ao mesmo tempo.
- **Terceiro excluído:** toda proposição é V ou F; não existe uma terceira opção.

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

### As várias formas de escrever a condicional

A condicional P → Q aparece nas provas com muitas roupas. Todas querem dizer a mesma coisa:

- "Se P, então Q."
- "Se P, Q."
- "Q, se P."
- "Quando P, Q." / "Sempre que P, Q."
- "P implica Q."
- "P **somente se** Q." (cuidado: o "somente se" aponta para o consequente)
- "P é **condição suficiente** para Q."
- "Q é **condição necessária** para P."
- "Todo P é Q."

Na condicional, a primeira parte (P) é o **antecedente** e a segunda (Q) é o **consequente**. **Suficiente** fica no antecedente; **necessária**, no consequente. Exemplo: "Ser carioca é suficiente para ser brasileiro" = "Se é carioca, então é brasileiro"; "Ser brasileiro é necessário para ser carioca" diz a mesma coisa.

> **Exemplo resolvido.** Reescreva "Só vou à festa se você for" na forma "se..., então...".
> "Vou à festa **somente se** você for" = "**Se** eu vou à festa, **então** você vai." O "somente se" introduz o consequente.

### Ordem de precedência dos conectivos

Quando não há parênteses, resolve-se na ordem: **1º** a negação (~), **2º** a conjunção (∧), **3º** a disjunção (∨), **4º** a condicional (→), **5º** a bicondicional (↔). Na dúvida, as provas costumam usar parênteses ou vírgulas para separar as partes.

### Calculando o valor de proposições compostas

O método é sempre o mesmo: **substitua** cada letra pelo seu valor e resolva **de dentro para fora**, como numa expressão numérica.

> **Exemplo resolvido.** Se P é F, Q é V e R é F, qual o valor de (P → Q) ∧ (Q → R)?
> P → Q: F → V = **V** (antecedente falso, condicional verdadeira).
> Q → R: V → F = **F** (o único caso falso).
> V ∧ F = **F**.

> **Exemplo resolvido.** Sabe-se que a proposição "Se Ana estuda, então Bia passa" é **falsa**. O que se conclui?
> Uma condicional só é falsa quando o antecedente é V e o consequente é F. Logo, **Ana estuda** e **Bia não passa**.

**Dica para questões de "descobrir valores":** comece pela proposição que tem **um só jeito** de ter o valor dado. Uma conjunção **verdadeira** obriga as duas partes a serem V; uma disjunção **falsa** obriga as duas a serem F; uma condicional **falsa** obriga V → F.

### Erros mais comuns

- Achar que frases interrogativas, exclamativas, imperativas ou sentenças abertas ("x > 3") são proposições.
- Achar que a condicional é falsa quando o antecedente é falso (ela é **verdadeira**).
- Confundir "ou" (inclusivo: basta uma V) com "ou... ou" (exclusivo: exatamente uma V).
- Esquecer que o número de linhas da tabela é 2ⁿ.
- Trocar "condição necessária" e "condição suficiente".

### Como cai na prova

As bancas pedem para identificar proposições, calcular o valor lógico de expressões, descobrir o valor de proposições simples a partir de uma composta de valor conhecido, contar linhas da tabela-verdade, classificar uma proposição como tautologia, contradição ou contingência e reescrever condicionais ("somente se", "condição necessária").

### Teste-se

1. "O Brasil é um país da Europa" é uma proposição? Qual o seu valor?
2. Quantas linhas tem a tabela-verdade de uma proposição com 5 proposições simples?
3. Se P é V e Q é F, qual o valor de P ↔ Q?
4. A condicional "Se 2 + 2 = 5, então a Lua é de queijo" é verdadeira ou falsa?
5. Reescreva "Estudar é condição necessária para passar" na forma "se..., então...".

> **Respostas.** 1) **Sim**, é uma proposição (frase declarativa), e seu valor é **F**. 2) 2⁵ = **32 linhas**. 3) **F** (valores diferentes). 4) **Verdadeira**: o antecedente é falso, e a condicional só é falsa no caso V → F. 5) "**Se** passou, **então** estudou" (o necessário fica no consequente).

### Para lembrar

- Proposição: frase declarativa que é V ou F (não pergunta, ordem, exclamação ou sentença aberta).
- "e": V só se V e V. "ou": F só se F e F. "se... então": F só se V → F. "se e somente se": V se iguais. "ou... ou": V se diferentes.
- Tabela-verdade: 2ⁿ linhas.
- Suficiente = antecedente; necessária = consequente; "somente se" introduz o consequente.
- Tautologia (sempre V), contradição (sempre F), contingência (depende).
