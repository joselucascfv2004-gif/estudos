### Para que serve este assunto

Negações e equivalências são, provavelmente, o tema de raciocínio lógico **mais cobrado** em concursos. Quase toda prova traz uma questão do tipo "a negação da frase X é..." ou "uma frase equivalente a X é...". A boa notícia: são poucas regras, sempre as mesmas, e com treino você responde em segundos. O segredo é **não confiar na intuição da língua portuguesa** (que engana muito, especialmente com "todo" e com a condicional) e aplicar as regras como uma fórmula.

### Negar é o mesmo que "desmentir"

Negar uma proposição é dizer o que precisaria acontecer para que ela fosse **falsa**. Por isso, a negação de uma proposição tem sempre o valor **oposto** ao dela, em **todas** as linhas da tabela-verdade. Já duas proposições **equivalentes** têm o **mesmo** valor em todas as linhas (dizem a mesma coisa com outras palavras).

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

### Outras equivalências úteis

- **Dupla negação:** ~(~P) = P. "Não é verdade que João não veio" = "João veio".
- **Comutativa:** P ∧ Q = Q ∧ P; P ∨ Q = Q ∨ P (a ordem não importa no "e" e no "ou", mas **importa** na condicional).
- **Distributiva:** P ∧ (Q ∨ R) = (P ∧ Q) ∨ (P ∧ R); P ∨ (Q ∧ R) = (P ∨ Q) ∧ (P ∨ R).
- **"Ou... ou" (exclusivo):** "ou P, ou Q" equivale a "P se e somente se não Q". Sua negação é a bicondicional "P se e somente se Q".
- **Condicional com "e" no antecedente:** (P ∧ Q) → R = P → (Q → R).

### Como resolver sem errar

1. Identifique o **conectivo principal** (o que liga as partes maiores).
2. Aplique a regra daquele conectivo.
3. Negue as partes **internas** com as regras correspondentes (cada parte pode ter seu próprio conectivo ou quantificador).
4. Se a questão é de equivalência, lembre as duas da condicional (**contrapositiva** e **"nega a primeira, ou, mantém a segunda"**).

> **Exemplo resolvido.** Qual a negação de "Se o réu é culpado, então ele foi preso e julgado"?
> O conectivo principal é o **"se... então"**: mantém a primeira, troca por "e", nega a segunda. A segunda é "foi preso **e** julgado": sua negação, por De Morgan, é "não foi preso **ou** não foi julgado".
> Resposta: "O réu é culpado **e** (não foi preso **ou** não foi julgado)".

> **Exemplo resolvido.** Uma equivalente de "Se não durmo, fico cansado" é:
> Contrapositiva: "Se **não** fico cansado, então **durmo**" (inverte e nega as duas; a negação de "não durmo" é "durmo").
> Com "ou": "**Durmo** ou fico cansado" (nega a primeira, mantém a segunda).

### Erros mais comuns

- Negar "Se P, então Q" como "Se P, então não Q" (a negação é "P e não Q").
- Achar que a recíproca (Q → P) ou a inversa (~P → ~Q) são equivalentes à condicional.
- Negar "todo" com "nenhum" (o correto é "algum... não").
- Esquecer de trocar o conectivo nas leis de De Morgan ("e" vira "ou" e vice-versa).
- Negar só uma parte de uma proposição composta.

### Como cai na prova

As bancas pedem a negação ou uma equivalente de frases do cotidiano ("Se o candidato estudar, será aprovado"; "Todo servidor é pontual"), muitas vezes combinando vários conectivos e quantificadores. A Cebraspe costuma apresentar uma frase e afirmar que outra é sua negação ou equivalente, para julgar como certo ou errado.

### Teste-se

1. Negue: "Pedro é rico e feliz."
2. Negue: "Se chover, o jogo será adiado."
3. Escreva a contrapositiva de "Se Maria estuda, ela passa."
4. Negue: "Todos os funcionários usam crachá."
5. Negue: "Nenhum aluno faltou à prova."

> **Respostas.** 1) "Pedro **não** é rico **ou não** é feliz." 2) "**Chove e** o jogo **não** é adiado." 3) "Se Maria **não** passa, então ela **não** estuda." 4) "**Algum** funcionário **não** usa crachá." 5) "**Algum** aluno faltou à prova."

### Para lembrar

- De Morgan: ~(P ∧ Q) = ~P ∨ ~Q; ~(P ∨ Q) = ~P ∧ ~Q.
- ~(P → Q) = P ∧ ~Q ("mantém a primeira, e, nega a segunda").
- P → Q = ~Q → ~P (contrapositiva) = ~P ∨ Q.
- Recíproca e inversa NÃO são equivalentes.
- ~(P ↔ Q) = "ou P, ou Q".
- Todo → algum não; nenhum → algum; algum → nenhum.
