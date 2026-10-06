---
titulo: Proposições, conectivos e tabela-verdade
provas: Concursos, Militares
descricao: Proposições simples e compostas, conectivos (e, ou, se...então, se e somente se), valor lógico e tabelas-verdade.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Proposições, conectivos e tabela-verdade

Proposições simples e compostas, conectivos (e, ou, se...então, se e somente se), valor lógico e tabelas-verdade.

## Resumo

- **Proposição** é uma frase declarativa que pode ser verdadeira ou falsa. Perguntas, ordens e exclamações não são proposições.
- **Conectivos:** "e" (∧) só é V se as duas forem V. "Ou" (∨) só é F se as duas forem F.
- **Condicional (se P, então Q):** só é **falsa** quando P é V e Q é F ("Vera Fischer").
- **Bicondicional (P se e somente se Q):** V quando P e Q têm o mesmo valor.
- **Ou exclusivo ("ou… ou…"):** V quando exatamente uma é verdadeira.
- **Tabela-verdade:** com n proposições simples, há 2ⁿ linhas.
- **Tautologia** é sempre V; **contradição** é sempre F; **contingência** depende dos valores.

## Fácil

### 1
<!-- modelo: f1 -->
Sabendo que p é falsa e q é falsa, qual é o valor lógico de p → q?

- A) Verdadeira
- B) Falsa

**Resposta:** A

**Explicação:** Ferramenta: valor lógico dos conectivos. A condicional (→) só é falsa quando o antecedente é V e o consequente é F. Com p = F e q = F, o resultado é V.

### 2
<!-- modelo: f7 -->
Em qual situação a proposição ~p ∧ q é verdadeira?

- A) Somente quando p falsa e q verdadeira
- B) Somente quando p verdadeira e q falsa
- C) Somente quando p verdadeira e q verdadeira
- D) Em todas as situações
- E) Somente quando p falsa e q falsa

**Resposta:** A

**Explicação:** Ferramenta: o caso especial de cada conectivo. O "e" só é verdadeiro quando ~p e q são verdadeiras, isto é, p falsa e q verdadeira. Resposta: p falsa e q verdadeira.

### 3
<!-- modelo: f4 -->
Qual é o conectivo principal da proposição: "O recenseador visita a casa se, e somente se, Pedro é economista."?

- A) Bicondicional (↔)
- B) Disjunção inclusiva (∨)
- C) Disjunção exclusiva (⊻)
- D) Condicional (→)
- E) Conjunção (∧)

**Resposta:** A

**Explicação:** Ferramenta: conectivo principal. "Se..., então" é condicional; "e" é conjunção; "ou" é disjunção inclusiva; "se, e somente se" é bicondicional; "ou..., ou..., mas não ambos" é disjunção exclusiva.

### 4
<!-- modelo: f4 -->
Qual é o conectivo principal da proposição: "Ou o cliente paga em dia, ou Maria viaja, mas não ambos."?

- A) Condicional (→)
- B) Disjunção exclusiva (⊻)
- C) Bicondicional (↔)
- D) Conjunção (∧)
- E) Disjunção inclusiva (∨)

**Resposta:** B

**Explicação:** Ferramenta: conectivo principal. "Se..., então" é condicional; "e" é conjunção; "ou" é disjunção inclusiva; "se, e somente se" é bicondicional; "ou..., ou..., mas não ambos" é disjunção exclusiva.

### 5
<!-- modelo: f2 -->
Quantas linhas tem a tabela-verdade de uma proposição composta formada por 5 proposições simples distintas?

- A) 25
- B) 10
- C) 32
- D) 64
- E) 7

**Resposta:** C

**Explicação:** Ferramenta: número de linhas (2ⁿ). Cada proposição simples tem 2 valores possíveis: 2^5 = 32 linhas.

### 6
<!-- modelo: f8 -->
Quantas linhas tem a tabela-verdade da proposição "Se o sistema está disponível e o banco não abre, então o recenseador visita a casa."?

- A) 16
- B) 8
- C) 6
- D) 3
- E) 10

**Resposta:** B

**Explicação:** Ferramenta: 2ⁿ linhas, com n = proposições simples DIFERENTES. Uma proposição e a sua negação contam como uma só (ex.: "chove" e "não chove" usam a mesma proposição). Aqui há 3 proposições simples diferentes: 2³ = 8 linhas.

### 7
<!-- modelo: f2 -->
Quantas linhas tem a tabela-verdade de uma proposição composta formada por 4 proposições simples distintas?

- A) 6
- B) 8
- C) 15
- D) 16
- E) 32

**Resposta:** D

**Explicação:** Ferramenta: número de linhas (2ⁿ). Cada proposição simples tem 2 valores possíveis: 2^4 = 16 linhas.

### 8
<!-- modelo: f5 -->
Considere a proposição: "Se a taxa de juros sobe, então a meta foi atingida". Sabendo que "a taxa de juros sobe" é falsa e que "a meta foi atingida" é falsa, a proposição é:

- A) Verdadeira
- B) Falsa

**Resposta:** A

**Explicação:** Ferramenta: valor lógico da condicional. A condicional só é falsa quando o antecedente é verdadeiro e o consequente é falso (V → F). Aqui temos F → F, logo verdadeira.

### 9
<!-- modelo: f3 -->
Qual das sentenças abaixo é uma proposição (sentença declarativa à qual se pode atribuir um único valor lógico, V ou F)?

- A) x + 3 = 10.
- B) Você vai ao concurso amanhã?
- C) A Lua é maior que a Terra.
- D) Que dia lindo!
- E) Ele é muito inteligente.

**Resposta:** C

**Explicação:** Ferramenta: o que é proposição. "A Lua é maior que a Terra." é declarativa e tem valor lógico definido (pode ser V ou F). Exclamações, ordens, perguntas, sentenças abertas (com variável ou sujeito indeterminado como "ele") e paradoxos não são proposições.

### 10
<!-- modelo: f1 -->
Sabendo que p é verdadeira e q é falsa, qual é o valor lógico de p → q?

- A) Verdadeira
- B) Falsa

**Resposta:** B

**Explicação:** Ferramenta: valor lógico dos conectivos. A condicional (→) só é falsa quando o antecedente é V e o consequente é F. Com p = V e q = F, o resultado é F.

### 11
<!-- modelo: f6 -->
Considere as proposições p: "chove" e q: "a taxa de juros sobe". Qual frase traduz a proposição p ∨ ~q?

- A) Chove e a taxa de juros não sobe.
- B) Chove se, e somente se, a taxa de juros não sobe.
- C) Se não chove, então a taxa de juros sobe.
- D) Chove ou a taxa de juros não sobe.
- E) Se chove, então a taxa de juros não sobe.

**Resposta:** D

**Explicação:** Ferramenta: dicionário dos símbolos. ~ é "não", ∧ é "e", ∨ é "ou", → é "se..., então" e ↔ é "se, e somente se". Traduza símbolo por símbolo. p ∨ ~q: "Chove ou a taxa de juros não sobe."

### 12
<!-- modelo: f12 -->
Qual é o valor lógico de "2 + 2 = 5 se e somente se Brasília é a capital do Brasil"?

- A) Falsa
- B) Verdadeira
- C) Não é possível saber
- D) Depende só da primeira parte
- E) Não é uma proposição

**Resposta:** A

**Explicação:** Ferramenta: bicondicional: verdadeira quando as partes têm o mesmo valor. "2 + 2 = 5" é F; "Brasília é a capital do Brasil" é V. Resultado: falsa.

### 13
<!-- modelo: f11 -->
Qual é o valor lógico de "Ou um triângulo tem quatro lados, ou Brasília é a capital do Brasil" (ou exclusivo)?

- A) Falsa
- B) Verdadeira e falsa ao mesmo tempo
- C) Não é possível saber
- D) Não é uma proposição
- E) Verdadeira

**Resposta:** E

**Explicação:** Ferramenta: ou exclusivo: verdadeiro quando exatamente uma parte é verdadeira. "um triângulo tem quatro lados" é F; "Brasília é a capital do Brasil" é V. Só uma é verdadeira: verdadeira.

### 14
<!-- modelo: f13 -->
Na tabela-verdade de p ↔ q (4 linhas), em quantas linhas a proposição é verdadeira?

- A) 0
- B) 4
- C) 1
- D) 3
- E) 2

**Resposta:** E

**Explicação:** Ferramenta: montar as 4 linhas (VV, VF, FV, FF). Aplique a regra do conectivo em cada linha e conte os V. p ↔ q é verdadeira em 2 linha(s).

### 15
<!-- modelo: f10 -->
Qual é o valor lógico da proposição "Se 7 é um número par, então 2 + 2 = 5"?

- A) Verdadeira, porque depende só da segunda parte
- B) Falsa
- C) Não é uma proposição
- D) Não é possível saber
- E) Verdadeira

**Resposta:** E

**Explicação:** Ferramenta: condicional só é falsa em V → F. A primeira parte ("7 é um número par") é falsa; uma condicional com antecedente falso é sempre verdadeira. Valor: verdadeira.

### 16
<!-- modelo: f9 -->
Qual das frases abaixo é uma proposição (pode ser julgada como verdadeira ou falsa)?

- A) Feche a porta!
- B) Que dia lindo!
- C) x + 3 = 10.
- D) Todo número par é divisível por 2.
- E) Que horas são?

**Resposta:** D

**Explicação:** Ferramenta: proposição = frase declarativa com valor lógico definido. Perguntas, ordens, exclamações e sentenças abertas (com variável ou sujeito indefinido, como "ele") não são proposições. A frase pode ser falsa e ainda assim ser proposição. "Todo número par é divisível por 2." é uma proposição.

### 17
<!-- modelo: f14 -->
Qual das proposições abaixo é uma tautologia (verdadeira em todas as linhas da tabela)?

- A) p → p
- B) p ∧ q
- C) p → q
- D) p ∨ q
- E) p ∧ ~p

**Resposta:** A

**Explicação:** Ferramenta: tautologia: sempre verdadeira, qualquer que seja o valor das partes. Teste as linhas: p → p nunca dá F. p → p é tautologia; "p ∧ ~p" e "p ↔ ~p" são contradições, e as outras são contingências.

## Médio

### 1
<!-- modelo: m2 -->
Sabe-se que a proposição "Se o candidato é aprovado, então Carlos pratica esportes" é FALSA. Então, é correto concluir que:

- A) O candidato não é aprovado ou Carlos pratica esportes.
- B) O candidato é aprovado e Carlos não pratica esportes.
- C) O candidato não é aprovado e Carlos não pratica esportes.
- D) O candidato não é aprovado e Carlos pratica esportes.
- E) O candidato é aprovado e Carlos pratica esportes.

**Resposta:** B

**Explicação:** Ferramenta: condicional falsa (só V → F). Uma condicional só é falsa quando o antecedente é V e o consequente é F. Logo "o candidato é aprovado" é verdadeira e "Carlos pratica esportes" é falsa: o candidato é aprovado e Carlos não pratica esportes.

### 2
<!-- modelo: m1 -->
Sendo p verdadeira, q falsa, r falsa, qual é o valor lógico da proposição ~(r ↔ q) ∨ (~p → q)?

- A) Verdadeira
- B) Falsa

**Resposta:** A

**Explicação:** Ferramenta: substituir valores e resolver. Substituindo os valores (p = V, q = F, r = F) e resolvendo primeiro os parênteses e as negações, o resultado é V.

### 3
<!-- modelo: m3 -->
Qual das proposições abaixo é uma tautologia (verdadeira em todas as linhas da tabela-verdade)?

- A) p → (p ∧ q)
- B) p ∨ q
- C) p ∧ q
- D) p → (p ∨ q)
- E) ~p → q

**Resposta:** D

**Explicação:** Ferramenta: tautologia. p → (p ∨ q) é verdadeira para qualquer valor de p e q. As demais são contingências (podem ser V ou F) ou contradições (sempre F, como p ∧ ~p).

### 4
<!-- modelo: m4 -->
Na tabela-verdade da proposição (p → ~q) ↔ (p ↔ q), em quantas linhas ela é verdadeira?

- A) 4
- B) 0
- C) 2
- D) 3
- E) 1

**Resposta:** E

**Explicação:** Ferramenta: contar linhas verdadeiras. Montando as 4 linhas (VV, VF, FV, FF) para (p, q), a proposição é V em 1 delas.

### 5
<!-- modelo: m4 -->
Na tabela-verdade da proposição q ∧ (q → p), em quantas linhas ela é verdadeira?

- A) 3
- B) 2
- C) 0
- D) 1
- E) 4

**Resposta:** D

**Explicação:** Ferramenta: contar linhas verdadeiras. Montando as 4 linhas (VV, VF, FV, FF) para (p, q), a proposição é V em 1 delas.

### 6
<!-- modelo: m1 -->
Sendo p verdadeira, q verdadeira, qual é o valor lógico da proposição ~(q → ~p) ↔ q?

- A) Verdadeira
- B) Falsa

**Resposta:** A

**Explicação:** Ferramenta: substituir valores e resolver. Substituindo os valores (p = V, q = V) e resolvendo primeiro os parênteses e as negações, o resultado é V.

### 7
<!-- modelo: m2 -->
Sabe-se que a proposição "Se o cliente paga em dia, então o sistema está disponível" é FALSA. Então, é correto concluir que:

- A) O cliente paga em dia e o sistema está disponível.
- B) O cliente paga em dia e o sistema não está disponível.
- C) O cliente não paga em dia e o sistema não está disponível.
- D) O cliente não paga em dia ou o sistema está disponível.
- E) O cliente não paga em dia e o sistema está disponível.

**Resposta:** B

**Explicação:** Ferramenta: condicional falsa (só V → F). Uma condicional só é falsa quando o antecedente é V e o consequente é F. Logo "o cliente paga em dia" é verdadeira e "o sistema está disponível" é falsa: o cliente paga em dia e o sistema não está disponível.

### 8
<!-- modelo: m7 -->
Sabe-se que a proposição p → (q → r) é FALSA. Então, os valores lógicos de p, q e r são:

- A) p = V, q = V e r = F
- B) p = V, q = F e r = F
- C) p = V, q = F e r = V
- D) p = V, q = V e r = V
- E) p = F, q = V e r = V

**Resposta:** A

**Explicação:** Ferramenta: começar pelo conectivo principal. Condicional falsa: p é V e q → r é F; e q → r só é F com q verdadeira e r falsa. Logo, p = V, q = V e r = F.

### 9
<!-- modelo: m5 -->
Sabendo que a proposição "O sistema está disponível ou chove" é FALSA, é correto afirmar que:

- A) "Chove" é verdadeira.
- B) "O sistema está disponível e chove" é verdadeira.
- C) "O sistema está disponível" é verdadeira.
- D) "O sistema não está disponível" e "não chove" são ambas verdadeiras.
- E) Não é possível saber o valor de "o sistema está disponível".

**Resposta:** D

**Explicação:** Ferramenta: conjunção verdadeira / disjunção falsa. Uma disjunção inclusiva só é falsa quando as duas partes são falsas; logo as negações de ambas são verdadeiras.

### 10
<!-- modelo: m6 -->
Sejam p: "João estuda" e q: "o candidato é aprovado". Em linguagem simbólica, a frase "João estuda se, e somente se, o candidato não é aprovado." é escrita como:

- A) p ↔ ~q
- B) ~p ∧ ~q
- C) q → ~p
- D) ~(p ∧ q)
- E) ~p ∨ ~q

**Resposta:** A

**Explicação:** Ferramenta: frase → símbolos. "Não é verdade que..." nega TUDO o que vem depois, por isso usa parênteses; "não" colado numa parte nega só aquela parte. "João estuda se, e somente se, o candidato não é aprovado." = p ↔ ~q.

### 11
<!-- modelo: m8 -->
Sendo p verdadeira, q verdadeira e r falsa, quantas das proposições a seguir são verdadeiras? I. p ↔ ~r; II. r → q; III. r ∨ p; IV. q ↔ r.

- A) 0
- B) 4
- C) 1
- D) 2
- E) 3

**Resposta:** E

**Explicação:** Ferramenta: substituir e aplicar a regra de cada conectivo. Troque cada letra pelo seu valor (V ou F) e resolva uma proposição de cada vez. I: V; II: V; III: V; IV: F. Total: 3.

### 12
<!-- modelo: m12 -->
Sabe-se que a proposição p ∧ q é VERDADEIRA. Qual é o valor lógico de p ↔ q?

- A) Depende do valor de q
- B) Depende do valor de p
- C) Verdadeira
- D) Não é possível saber
- E) Falsa

**Resposta:** C

**Explicação:** Ferramenta: conjunção verdadeira ⇒ as duas partes são verdadeiras. p = V e q = V. Substituindo, p ↔ q é verdadeira.

### 13
<!-- modelo: m14 -->
Sendo p: "o relatório é aprovado" e q: "o sistema funciona", como se escreve em símbolos a frase "Nem o relatório é aprovado, nem o sistema funciona"?

- A) ~p → q
- B) ~p ∧ ~q
- C) ~(p ∧ q)
- D) p ∧ ~q
- E) ~p ∨ ~q

**Resposta:** B

**Explicação:** Ferramenta: "nem… nem…" = "não… e não…". As duas coisas são negadas ao mesmo tempo. ~p ∧ ~q (que equivale a ~(p ∨ q)).

### 14
<!-- modelo: m13 -->
Sabe-se que a proposição p ∨ q é FALSA. Qual é o valor lógico de ~p → q?

- A) Falsa
- B) Depende do valor de p
- C) Não é possível saber
- D) Verdadeira
- E) Depende do valor de q

**Resposta:** A

**Explicação:** Ferramenta: disjunção falsa ⇒ as duas partes são falsas. p = F e q = F. Substituindo, ~p → q é falsa.

### 15
<!-- modelo: m10 -->
Qual das proposições abaixo é uma contradição (falsa em todas as linhas da tabela)?

- A) (p ∧ q) ∧ ~q
- B) p ∨ ~p
- C) p ∧ q
- D) p → q
- E) p ∨ q

**Resposta:** A

**Explicação:** Ferramenta: contradição: sempre falsa. (p ∧ q) ∧ ~q afirma ao mesmo tempo algo e o seu contrário. (p ∧ q) ∧ ~q é contradição; "p ∨ ~p" e "(p ∧ q) → p" são tautologias.

### 16
<!-- modelo: m11 -->
Sabe-se que a proposição p → q é FALSA. Qual é o valor lógico de q → p?

- A) Não é possível saber
- B) Verdadeira
- C) Falsa
- D) Depende do valor de q
- E) Depende do valor de p

**Resposta:** B

**Explicação:** Ferramenta: condicional falsa ⇒ p = V e q = F. É o único caso em que a condicional é falsa ("Vera Fischer"). Com p = V e q = F, q → p é verdadeira.

### 17
<!-- modelo: m9 -->
Na tabela-verdade de (p → q) ∨ r (8 linhas), em quantas linhas a proposição é verdadeira?

- A) 4
- B) 7
- C) 6
- D) 1
- E) 8

**Resposta:** B

**Explicação:** Ferramenta: 3 proposições simples → 8 linhas. Monte as 8 combinações e avalie o conectivo principal por último. Ela é verdadeira em 7 das 8 linhas.

## Difícil

### 1
<!-- modelo: d1 -->
Considere as premissas: "Se Sofia treina, então Sofia vence a corrida" e "Sofia treina". Uma conclusão válida é:

- A) Sofia vence a corrida.
- B) Sofia não treina.
- C) Nada se pode concluir.
- D) Sofia não vence a corrida.
- E) Sofia vence a corrida somente se não treina.

**Resposta:** A

**Explicação:** Ferramenta: modus ponens e modus tollens. Modus ponens: de "p → q" e "p", conclui-se "q".

### 2
<!-- modelo: d3 -->
Qual das proposições abaixo é uma contradição (falsa em todas as linhas da tabela-verdade)?

- A) p → (q → p)
- B) p → q
- C) ~(p ∨ ~p)
- D) p ∨ ~p
- E) ~p ∨ q

**Resposta:** C

**Explicação:** Ferramenta: contradição. ~(p ∨ ~p) é falsa para quaisquer valores de p e q. Note que p → q equivale a ~p ∨ q, cuja negação é p ∧ ~q.

### 3
<!-- modelo: d2 -->
Quantas linhas da tabela-verdade da proposição r ∨ (p ∧ q) têm valor lógico VERDADEIRO?

- A) 4
- B) 3
- C) 6
- D) 5
- E) 7

**Resposta:** D

**Explicação:** Ferramenta: tabela-verdade com 3 proposições. Com 3 proposições há 8 linhas. Avaliando a expressão em cada uma, ela é V em 5 linhas.

### 4
<!-- modelo: d2 -->
Quantas linhas da tabela-verdade da proposição (p ∨ q) → ~(q ∧ r) têm valor lógico VERDADEIRO?

- A) 4
- B) 7
- C) 6
- D) 5
- E) 8

**Resposta:** C

**Explicação:** Ferramenta: tabela-verdade com 3 proposições. Com 3 proposições há 8 linhas. Avaliando a expressão em cada uma, ela é V em 6 linhas.

### 5
<!-- modelo: d8 -->
Uma proposição composta P, formada por p e q, é verdadeira somente quando p e q são falsas. Qual das proposições abaixo pode ser P?

- A) p ↔ q
- B) ~p ∧ ~q
- C) p ∨ q
- D) ~(p ↔ q)
- E) p → q

**Resposta:** B

**Explicação:** Ferramenta: a tabela-verdade é a "impressão digital" da proposição. Duas proposições com a mesma tabela são equivalentes. Procure o conectivo cujo caso especial é o descrito. ~p ∧ ~q tem exatamente essa tabela.

### 6
<!-- modelo: d5 -->
Sabe-se que a proposição "Maria viaja se, e somente se, o cliente paga em dia" é VERDADEIRA e que "Maria viaja" é FALSA. Então:

- A) Maria viaja.
- B) O cliente não paga em dia.
- C) Maria não viaja e o cliente paga em dia.
- D) Não é possível determinar o valor de "o cliente paga em dia".
- E) O cliente paga em dia.

**Resposta:** B

**Explicação:** Ferramenta: bicondicional. A bicondicional é verdadeira quando as duas partes têm o mesmo valor. Como "Maria viaja" é F, "o cliente paga em dia" também é F, ou seja: o cliente não paga em dia.

### 7
<!-- modelo: d6 -->
Considere as premissas: P1: "O banco abre ou Lucas é bancário." P2: "Se Lucas é bancário, então chove." P3: "O banco não abre." Uma conclusão válida é:

- A) Chove.
- B) Lucas não é bancário.
- C) Não chove.
- D) Nada se pode concluir.
- E) O banco abre e não chove.

**Resposta:** A

**Explicação:** Ferramenta: encadear regras (silogismo disjuntivo + modus ponens). Use primeiro a premissa simples (P3) e vá "derrubando dominós". Se o banco não abre, então, por P1, Lucas é bancário. Por P2, chove.

### 8
<!-- modelo: d1 -->
Considere as premissas: "Se Caio treina, então Caio vence a corrida" e "Caio não vence a corrida". Uma conclusão válida é:

- A) Caio treina.
- B) Caio não treina.
- C) Nada se pode concluir.
- D) Caio treina e não vence a corrida.
- E) Caio vence a corrida.

**Resposta:** B

**Explicação:** Ferramenta: modus ponens e modus tollens. Modus tollens: de "p → q" e "~q", conclui-se "~p". Se a 1ª parte tivesse acontecido, a 2ª também aconteceria; como a 2ª não aconteceu, Caio não treina.

### 9
<!-- modelo: d5 -->
Sabe-se que a proposição "O recenseador visita a casa se, e somente se, o cliente paga em dia" é VERDADEIRA e que "o recenseador visita a casa" é FALSA. Então:

- A) O cliente não paga em dia.
- B) Não é possível determinar o valor de "o cliente paga em dia".
- C) O recenseador não visita a casa e o cliente paga em dia.
- D) O recenseador visita a casa.
- E) O cliente paga em dia.

**Resposta:** A

**Explicação:** Ferramenta: bicondicional. A bicondicional é verdadeira quando as duas partes têm o mesmo valor. Como "o recenseador visita a casa" é F, "o cliente paga em dia" também é F, ou seja: o cliente não paga em dia.

### 10
<!-- modelo: d7 -->
Considere verdadeiras as proposições: "Se faz sol, então a taxa de juros sobe", "Se a taxa de juros sobe, então o recenseador visita a casa" e "O recenseador não visita a casa". Pode-se concluir que:

- A) A taxa de juros não sobe, mas nada se sabe sobre "faz sol".
- B) Faz sol e a taxa de juros não sobe.
- C) Não faz sol e a taxa de juros sobe.
- D) Faz sol e a taxa de juros sobe.
- E) Não faz sol e a taxa de juros não sobe.

**Resposta:** E

**Explicação:** Ferramenta: modus tollens em cadeia. Se o fim da cadeia é falso, tudo o que levaria a ele também é falso (de trás para a frente). Como o recenseador não visita a casa, então a taxa de juros não sobe (2ª premissa); e então não faz sol (1ª premissa).

### 11
<!-- modelo: d4 -->
Sabendo que a proposição p → q é FALSA, qual é o valor lógico de (r ∨ ~p) → p, quaisquer que sejam os valores de r e s?

- A) Verdadeira
- B) Falsa

**Resposta:** A

**Explicação:** Ferramenta: valores a partir de uma condicional falsa. Se p → q é falsa, então p = V e q = F. Substituindo, a expressão resulta em V independentemente de r e s.

### 12
<!-- modelo: d11 -->
Em quantas das 8 combinações de valores de p, q e r a proposição p → (q ∨ r) é FALSA?

- A) 3
- B) 7
- C) 2
- D) 1
- E) 0

**Resposta:** D

**Explicação:** Ferramenta: condicional falsa: antecedente V e consequente F. Conte as combinações que deixam o antecedente verdadeiro e o consequente falso. São 1 combinações.

### 13
<!-- modelo: d12 -->
Qual frase é equivalente a "Se o banco abre e o relatório é aprovado, então o cliente paga em dia"?

- A) Se o banco abre, então o cliente paga em dia; e se o relatório é aprovado, então o cliente paga em dia.
- B) Se o cliente paga em dia, então o banco abre e o relatório é aprovado.
- C) Se o cliente paga em dia, então o banco abre ou o relatório é aprovado.
- D) O banco abre e o relatório é aprovado e o cliente paga em dia.
- E) Se o banco abre, então, se o relatório é aprovado, o cliente paga em dia.

**Resposta:** E

**Explicação:** Ferramenta: exportação: (p ∧ q) → r ⇔ p → (q → r). As duas só são falsas quando p e q são verdadeiras e r é falsa. Equivalente: "se o banco abre, então, se o relatório é aprovado, o cliente paga em dia".

### 14
<!-- modelo: d10 -->
Em quantas das 8 linhas da tabela-verdade a proposição ~p ∧ (q → r) é verdadeira?

- A) 0
- B) 4
- C) 3
- D) 5
- E) 2

**Resposta:** C

**Explicação:** Ferramenta: tabela-verdade com 3 proposições. Avalie primeiro os parênteses e depois o conectivo principal, linha por linha. ~p ∧ (q → r) é verdadeira em 3 linhas.

### 15
<!-- modelo: d13 -->
Qual é o valor lógico de "(Se a água ferve a 100 °C ao nível do mar, então um triângulo tem quatro lados) e (a água ferve a 100 °C ao nível do mar ou um triângulo tem quatro lados)"?

- A) Falsa
- B) Não é uma proposição
- C) Verdadeira
- D) Verdadeira só se as duas partes forem verdadeiras
- E) Não é possível saber

**Resposta:** A

**Explicação:** Ferramenta: avaliar cada parte e depois o "e". "a água ferve a 100 °C ao nível do mar" é V; "um triângulo tem quatro lados" é F. A condicional dá F e a disjunção dá V. Conjunção: falsa.

### 16
<!-- modelo: d9 -->
Considere verdadeiras as três afirmações: "O sistema funciona ou Ana estuda"; "Se o sistema funciona, então Pedro viaja"; "Não é verdade que Pedro viaja". O que se pode concluir?

- A) Não é verdade que Ana estuda.
- B) O sistema funciona, mas não é verdade que Ana estuda.
- C) Pedro viaja.
- D) O sistema funciona e Ana estuda.
- E) Ana estuda e não é verdade que o sistema funciona.

**Resposta:** E

**Explicação:** Ferramenta: encadear: modus tollens + silogismo disjuntivo. Como "Pedro viaja" é falso e "se o sistema funciona, então Pedro viaja" é verdadeiro, "o sistema funciona" tem de ser falso (modus tollens). Então, na disjunção, "Ana estuda" é verdadeiro. Conclusão: Ana estuda, e não o sistema funciona.
