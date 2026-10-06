---
titulo: Equivalências lógicas e negações
provas: Concursos, Militares
descricao: Negação de conjunções, disjunções, condicionais e quantificadores; contrapositiva e outras equivalências (Leis de De Morgan).
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Equivalências lógicas e negações

Negação de conjunções, disjunções, condicionais e quantificadores; contrapositiva e outras equivalências (Leis de De Morgan).

## Resumo

- **Negação do "e" e do "ou" (De Morgan):** ~(P ∧ Q) = ~P ∨ ~Q; ~(P ∨ Q) = ~P ∧ ~Q.
- **Negação da condicional:** ~(P → Q) = P ∧ ~Q ("mantém a primeira E nega a segunda").
- **Equivalências da condicional:** P → Q ⇔ ~Q → ~P (contrapositiva) ⇔ ~P ∨ Q.
- **Atenção:** P → Q **não** equivale a Q → P (recíproca) nem a ~P → ~Q (inversa).
- **Negação de "todo":** "algum… não". **Negação de "nenhum":** "algum". **Negação de "algum":** "nenhum".
- **Bicondicional:** P ↔ Q ⇔ (P → Q) ∧ (Q → P). Negação: "ou P ou Q" (ou exclusivo).

## Fácil

### 1
<!-- modelo: f3 -->
Qual é a negação de "O relatório foi entregue ou o cliente paga em dia"?

- A) O relatório não foi entregue e o cliente não paga em dia.
- B) O relatório não foi entregue ou o cliente não paga em dia.
- C) O relatório não foi entregue ou o cliente paga em dia.
- D) Se o relatório não foi entregue, então o cliente paga em dia.
- E) O relatório foi entregue e o cliente paga em dia.

**Resposta:** A

**Explicação:** Ferramenta: De Morgan (negação do "ou"). Lei de De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. Nega-se cada parte e troca-se "ou" por "e".

### 2
<!-- modelo: f3 -->
Qual é a negação de "O sistema está disponível ou o recenseador visita a casa"?

- A) Se o sistema não está disponível, então o recenseador visita a casa.
- B) O sistema não está disponível ou o recenseador não visita a casa.
- C) O sistema não está disponível ou o recenseador visita a casa.
- D) O sistema não está disponível e o recenseador não visita a casa.
- E) O sistema está disponível e o recenseador visita a casa.

**Resposta:** D

**Explicação:** Ferramenta: De Morgan (negação do "ou"). Lei de De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. Nega-se cada parte e troca-se "ou" por "e".

### 3
<!-- modelo: f6 -->
Qual é a negação de "A taxa de juros é maior que 7%."?

- A) A taxa de juros é igual a 7%.
- B) A taxa de juros é menor ou igual a 7%.
- C) A taxa de juros é maior ou igual a 7%.
- D) A taxa de juros é menor que 7%.
- E) A taxa de juros é diferente de 7%.

**Resposta:** B

**Explicação:** Ferramenta: negar uma comparação. A negação cobre TODOS os outros casos: o contrário de "maior que" é "menor ou igual a" (o "igual" entra!). Negação: A taxa de juros é menor ou igual a 7%.

### 4
<!-- modelo: f7 -->
Qual proposição é logicamente equivalente a "Nenhum atleta treina diariamente"?

- A) Todo atleta treina diariamente.
- B) Algum atleta treina diariamente.
- C) Nem todo atleta treina diariamente.
- D) Algum atleta não treina diariamente.
- E) Todo atleta não treina diariamente.

**Resposta:** E

**Explicação:** Ferramenta: "nenhum" = "todo... não". Dizer que nenhum tem a característica é o mesmo que dizer que todos não a têm. "Nenhum atleta treina diariamente" ≡ "Todo atleta não treina diariamente".

### 5
<!-- modelo: f2 -->
Qual é a negação de "O cliente paga em dia e Carlos pratica esportes"?

- A) O cliente não paga em dia e Carlos pratica esportes.
- B) O cliente não paga em dia e Carlos não pratica esportes.
- C) O cliente não paga em dia ou Carlos não pratica esportes.
- D) O cliente paga em dia ou Carlos pratica esportes.
- E) Se o cliente paga em dia, então Carlos pratica esportes.

**Resposta:** C

**Explicação:** Ferramenta: De Morgan (negação do "e"). Lei de De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q. Nega-se cada parte e troca-se "e" por "ou".

### 6
<!-- modelo: f5 -->
Qual é a negação de "Não é verdade que a taxa de juros não sobe"?

- A) A taxa de juros não sobe.
- B) Não é verdade que a taxa de juros sobe.
- C) A taxa de juros sobe.
- D) É falso que a taxa de juros não sobe.
- E) Talvez a taxa de juros não sobe.

**Resposta:** A

**Explicação:** Ferramenta: dupla negação. "Não é verdade que X" já é a negação de X. Negando de novo, voltamos a X (dupla negação): a taxa de juros não sobe.

### 7
<!-- modelo: f4 -->
Qual é a negação da proposição "Algum servidor público é pontual"?

- A) Existe servidor público que é pontual.
- B) Pelo menos um servidor público é pontual.
- C) Todo servidor público é pontual.
- D) Algum servidor público não é pontual.
- E) Nenhum servidor público é pontual.

**Resposta:** E

**Explicação:** Ferramenta: negação de "algum". Negar "algum A é B" é dizer que não existe nenhum: "nenhum A é B" (equivalente a "todo A não é B").

### 8
<!-- modelo: f2 -->
Qual é a negação de "Chove e Lucas é bancário"?

- A) Não chove ou Lucas não é bancário.
- B) Se chove, então Lucas é bancário.
- C) Não chove e Lucas é bancário.
- D) Chove ou Lucas é bancário.
- E) Não chove e Lucas não é bancário.

**Resposta:** A

**Explicação:** Ferramenta: De Morgan (negação do "e"). Lei de De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q. Nega-se cada parte e troca-se "e" por "ou".

### 9
<!-- modelo: f8 -->
Qual é a negação de ~p ∨ q?

- A) p ∨ ~q
- B) ~p ∧ q
- C) p ∨ q
- D) ~p ∧ ~q
- E) p ∧ ~q

**Resposta:** E

**Explicação:** Ferramenta: Leis de De Morgan. Negue cada parte (~~p vira p) e troque o conectivo: ∧ vira ∨ e ∨ vira ∧. ~(~p ∨ q) ≡ p ∧ ~q.

### 10
<!-- modelo: f1 -->
Qual é a negação da proposição "Todo gerente é organizado"?

- A) Algum gerente é organizado.
- B) Nenhum gerente é organizado.
- C) Todo gerente não é organizado.
- D) Nenhum gerente não é organizado.
- E) Algum gerente não é organizado.

**Resposta:** E

**Explicação:** Ferramenta: negação de "todo". A negação de "todo A é B" é "algum A não é B" (basta um contraexemplo). "Nenhum A é B" é uma afirmação mais forte, não a negação.

### 11
<!-- modelo: f1 -->
Qual é a negação da proposição "Todo professor corrige provas"?

- A) Nenhum professor corrige provas.
- B) Nenhum professor não corrige provas.
- C) Algum professor corrige provas.
- D) Todo professor não corrige provas.
- E) Algum professor não corrige provas.

**Resposta:** E

**Explicação:** Ferramenta: negação de "todo". A negação de "todo A é B" é "algum A não é B" (basta um contraexemplo). "Nenhum A é B" é uma afirmação mais forte, não a negação.

### 12
<!-- modelo: f10 -->
Qual é a negação de "Ou o relatório é aprovado, ou Lucas joga futebol" (ou exclusivo)?

- A) Se o relatório é aprovado, então Lucas joga futebol.
- B) O relatório é aprovado e Lucas joga futebol.
- C) Nem o relatório é aprovado, nem Lucas joga futebol.
- D) Ou o relatório não é aprovado, ou Lucas não joga futebol.
- E) O relatório é aprovado se e somente se Lucas joga futebol.

**Resposta:** E

**Explicação:** Ferramenta: negação do ou exclusivo = bicondicional. O "ou… ou…" é verdadeiro quando as partes diferem; a negação é verdadeira quando elas são iguais. "O relatório é aprovado se e somente se Lucas joga futebol".

### 13
<!-- modelo: f14 -->
Qual é a negação de "Ninguém faltou à reunião"?

- A) Alguém não faltou à reunião.
- B) Ninguém deixou de cumprir a regra.
- C) Alguém faltou à reunião.
- D) Todos faltaram à reunião.
- E) Nem todos faltaram à reunião.

**Resposta:** C

**Explicação:** Ferramenta: "ninguém" = "nenhuma pessoa"; a negação é "alguém". Basta uma pessoa ter feito para a frase original ser falsa. "Alguém faltou à reunião".

### 14
<!-- modelo: f11 -->
Qual é a negação de "Algum funcionário não é pontual"?

- A) Todo funcionário não é pontual.
- B) Nenhum funcionário é pontual.
- C) Pelo menos um funcionário é pontual.
- D) Todo funcionário é pontual.
- E) Algum funcionário é pontual.

**Resposta:** D

**Explicação:** Ferramenta: negação de "algum… não…" = "todo…". Para negar que exista alguém sem a característica, afirme que todos a têm. "Todo funcionário é pontual".

### 15
<!-- modelo: f9 -->
Qual frase é equivalente a "Não é verdade que Lucas não joga futebol"?

- A) Lucas joga futebol.
- B) Lucas não joga futebol.
- C) Lucas joga futebol ou Lucas não joga futebol.
- D) Lucas joga futebol e Lucas não joga futebol.
- E) Não é verdade que Lucas joga futebol.

**Resposta:** A

**Explicação:** Ferramenta: dupla negação: ~(~p) = p. Negar uma negação volta à afirmação original. "Lucas joga futebol".

### 16
<!-- modelo: f13 -->
Qual é a negação de "No máximo 3 pessoas foram atendidas"?

- A) Exatamente 3 pessoas foram atendidas.
- B) Pelo menos 4 pessoas foram atendidas.
- C) No mínimo 2 pessoas foram atendidas.
- D) Pelo menos 3 pessoas foram atendidas.
- E) Menos de 3 pessoas foram atendidas.

**Resposta:** B

**Explicação:** Ferramenta: "no máximo k" = "k ou menos"; a negação é "mais de k". Mais de 3 é o mesmo que pelo menos 4. "Pelo menos 4 pessoas foram atendidas".

### 17
<!-- modelo: f12 -->
Qual é a negação de "Pelo menos 3 funcionários chegaram atrasados"?

- A) Mais de 3 funcionários chegaram atrasados.
- B) No máximo 2 funcionários chegaram atrasados.
- C) No máximo 3 funcionários chegaram atrasados.
- D) Exatamente 3 funcionários chegaram atrasados.
- E) Pelo menos 2 funcionários chegaram atrasados.

**Resposta:** B

**Explicação:** Ferramenta: "pelo menos k" = "k ou mais"; a negação é "menos de k". Menos de 3 é o mesmo que no máximo 2. "No máximo 2 funcionários chegaram atrasados".

## Médio

### 1
<!-- modelo: m2 -->
Uma proposição logicamente equivalente a "Se Ana trabalha no IBGE, então o candidato é aprovado" é:

- A) Ana trabalha no IBGE e o candidato é aprovado.
- B) Se Ana não trabalha no IBGE, então o candidato não é aprovado.
- C) Se o candidato não é aprovado, então Ana não trabalha no IBGE.
- D) Ana trabalha no IBGE ou o candidato não é aprovado.
- E) Se o candidato é aprovado, então Ana trabalha no IBGE.

**Resposta:** C

**Explicação:** Ferramenta: contrapositiva. Contrapositiva: p → q ≡ ~q → ~p (inverte-se e negam-se as duas partes). A recíproca (q → p) e a inversa (~p → ~q) NÃO são equivalentes.

### 2
<!-- modelo: m2 -->
Uma proposição logicamente equivalente a "Se faz sol, então o relatório foi entregue" é:

- A) Se não faz sol, então o relatório não foi entregue.
- B) Faz sol e o relatório foi entregue.
- C) Faz sol ou o relatório não foi entregue.
- D) Se o relatório não foi entregue, então não faz sol.
- E) Se o relatório foi entregue, então faz sol.

**Resposta:** D

**Explicação:** Ferramenta: contrapositiva. Contrapositiva: p → q ≡ ~q → ~p (inverte-se e negam-se as duas partes). A recíproca (q → p) e a inversa (~p → ~q) NÃO são equivalentes.

### 3
<!-- modelo: m5 -->
A negação de "O sistema não está disponível e Pedro é economista" é:

- A) O sistema não está disponível ou Pedro é economista.
- B) O sistema está disponível ou Pedro não é economista.
- C) O sistema está disponível e Pedro não é economista.
- D) Se o sistema está disponível, então Pedro é economista.
- E) O sistema está disponível ou Pedro é economista.

**Resposta:** B

**Explicação:** Ferramenta: De Morgan com negação. ~(~p ∧ q) ≡ p ∨ ~q (De Morgan + dupla negação).

### 4
<!-- modelo: m8 -->
Qual é a negação de "Existe médico que não é cuidadoso"?

- A) Todo médico não é cuidadoso.
- B) Algum médico é cuidadoso.
- C) Nenhum médico é cuidadoso.
- D) Existe médico que é cuidadoso.
- E) Todo médico é cuidadoso.

**Resposta:** E

**Explicação:** Ferramenta: negar quantificadores. "Existe" vira "todo", e a característica é negada (e vice-versa). "Não existe médico que não é cuidadoso" ≡ "Todo médico é cuidadoso".

### 5
<!-- modelo: m3 -->
A proposição "Se Ana trabalha no IBGE, então Lucas é bancário" é logicamente equivalente a:

- A) Ana trabalha no IBGE e Lucas não é bancário.
- B) Ana trabalha no IBGE ou Lucas não é bancário.
- C) Ana trabalha no IBGE ou Lucas é bancário.
- D) Ana não trabalha no IBGE e Lucas é bancário.
- E) Ana não trabalha no IBGE ou Lucas é bancário.

**Resposta:** E

**Explicação:** Ferramenta: condicional ≡ disjunção. p → q ≡ ~p ∨ q ("NEYMAR": NEga a primeira, mantém a segunda, troca por OU).

### 6
<!-- modelo: m3 -->
A proposição "Se faz sol, então João estuda" é logicamente equivalente a:

- A) Faz sol ou João estuda.
- B) Não faz sol ou João estuda.
- C) Não faz sol e João estuda.
- D) Faz sol ou João não estuda.
- E) Faz sol e João não estuda.

**Resposta:** B

**Explicação:** Ferramenta: condicional ≡ disjunção. p → q ≡ ~p ∨ q ("NEYMAR": NEga a primeira, mantém a segunda, troca por OU).

### 7
<!-- modelo: m1 -->
Qual é a negação da proposição "Se o candidato é aprovado, então Carlos pratica esportes"?

- A) Se Carlos pratica esportes, então o candidato é aprovado.
- B) Se o candidato é aprovado, então Carlos não pratica esportes.
- C) O candidato é aprovado e Carlos não pratica esportes.
- D) Se Carlos não pratica esportes, então o candidato é aprovado.
- E) O candidato é aprovado ou Carlos não pratica esportes.

**Resposta:** C

**Explicação:** Ferramenta: negação da condicional (mantém e nega). ~(p → q) ≡ p ∧ ~q: mantém-se o antecedente, troca-se "se...então" por "e" e nega-se o consequente ("MANÉ": MAntém E NEga).

### 8
<!-- modelo: m7 -->
Qual é a negação de "x > 7 ou y ≤ 8"?

- A) x ≤ 7 ou y > 8
- B) x < 7 e y ≥ 8
- C) x > 7 e y ≤ 8
- D) x ≤ 7 e y ≤ 8
- E) x ≤ 7 e y > 8

**Resposta:** E

**Explicação:** Ferramenta: De Morgan + negar comparações. Troque "ou" por "e" e negue cada comparação (lembrando que o "igual" muda de lado). ~(x > 7 ou y ≤ 8) ≡ x ≤ 7 e y > 8.

### 9
<!-- modelo: m6 -->
Qual das proposições abaixo NÃO é logicamente equivalente a p → q?

- A) q ∨ ~p
- B) ~(p ∧ ~q)
- C) ~p ∨ q
- D) ~p → ~q
- E) ~q → ~p

**Resposta:** D

**Explicação:** Ferramenta: equivalências da condicional. p → q ≡ ~q → ~p (contrapositiva) ≡ ~p ∨ q ≡ ~(p ∧ ~q). A recíproca (q → p) e a inversa (~p → ~q) NÃO são equivalentes. ~p → ~q não tem a mesma tabela-verdade de p → q.

### 10
<!-- modelo: m1 -->
Qual é a negação da proposição "Se Ana trabalha no IBGE, então faz sol"?

- A) Ana trabalha no IBGE e não faz sol.
- B) Ana trabalha no IBGE ou não faz sol.
- C) Se não faz sol, então Ana trabalha no IBGE.
- D) Se Ana trabalha no IBGE, então não faz sol.
- E) Se faz sol, então Ana trabalha no IBGE.

**Resposta:** A

**Explicação:** Ferramenta: negação da condicional (mantém e nega). ~(p → q) ≡ p ∧ ~q: mantém-se o antecedente, troca-se "se...então" por "e" e nega-se o consequente ("MANÉ": MAntém E NEga).

### 11
<!-- modelo: m4 -->
Qual é a negação da proposição "Nenhum gerente é organizado"?

- A) Todo gerente é organizado.
- B) Algum gerente é organizado.
- C) Todo gerente não é organizado.
- D) Algum gerente não é organizado.
- E) Nenhum gerente não é organizado.

**Resposta:** B

**Explicação:** Ferramenta: negação de "nenhum". "Nenhum A é B" é falsa assim que existe pelo menos um A que é B. Logo, a negação é "algum A é B".

### 12
<!-- modelo: m14 -->
A frase "O cliente paga em dia somente se o relatório é aprovado" é equivalente a:

- A) O cliente paga em dia se e somente se o relatório é aprovado.
- B) O cliente paga em dia ou o relatório é aprovado.
- C) Se o cliente paga em dia, então o relatório é aprovado.
- D) O cliente paga em dia e o relatório é aprovado.
- E) Se o relatório é aprovado, então o cliente paga em dia.

**Resposta:** C

**Explicação:** Ferramenta: "p somente se q" = p → q. "Somente se" indica a condição necessária, que fica depois do "então". "Se o cliente paga em dia, então o relatório é aprovado".

### 13
<!-- modelo: m10 -->
Qual é a negação de "O sistema funciona se e somente se a meta é atingida"?

- A) O sistema não funciona e a meta não é atingida.
- B) Se o sistema funciona, então a meta não é atingida.
- C) O sistema funciona e a meta é atingida.
- D) O sistema não funciona se e somente se a meta não é atingida.
- E) Ou o sistema funciona, ou a meta é atingida (mas não os dois).

**Resposta:** E

**Explicação:** Ferramenta: negação da bicondicional = ou exclusivo. A bicondicional é falsa quando as partes têm valores diferentes, que é exatamente o "ou… ou…". "Ou o sistema funciona, ou a meta é atingida".

### 14
<!-- modelo: m9 -->
Qual das frases abaixo NÃO é equivalente a "Se Pedro viaja, então Ana estuda"?

- A) Não é verdade que Pedro viaja e Ana não estuda.
- B) Pedro não viaja ou Ana estuda.
- C) Pedro viaja somente se Ana estuda.
- D) Se Ana não estuda, então Pedro não viaja.
- E) Se Ana estuda, então Pedro viaja.

**Resposta:** E

**Explicação:** Ferramenta: a recíproca (q → p) não é equivalente. São equivalentes à condicional: a contrapositiva (~q → ~p), "~p ou q", "não (p e ~q)" e "p somente se q". A recíproca "se Ana estuda, então Pedro viaja" é a única diferente.

### 15
<!-- modelo: m12 -->
Qual é a negação de "Todo atleta treina todos os dias e algum funcionário é pontual"?

- A) Nenhum atleta treina todos os dias e nenhum funcionário é pontual.
- B) Nenhum atleta treina todos os dias ou algum funcionário é pontual.
- C) Algum atleta não treina todos os dias ou nenhum funcionário é pontual.
- D) Todo atleta não treina todos os dias ou todo funcionário é pontual.
- E) Algum atleta não treina todos os dias e nenhum funcionário é pontual.

**Resposta:** C

**Explicação:** Ferramenta: De Morgan + negação de quantificadores. Negue cada parte (todo → algum… não; algum → nenhum) e troque o "e" por "ou". "Algum atleta não treina todos os dias ou nenhum funcionário é pontual".

### 16
<!-- modelo: m11 -->
Qual é a negação de "Sempre que Pedro viaja, Carla é contadora"?

- A) Nunca Pedro viaja.
- B) Pedro viaja ou Carla não é contadora.
- C) Se Carla é contadora, então Pedro viaja.
- D) Sempre que Pedro viaja, Carla não é contadora.
- E) Pedro viaja e Carla não é contadora.

**Resposta:** E

**Explicação:** Ferramenta: "sempre que p, q" é uma condicional; negação: p ∧ ~q. Para desmentir, basta um caso em que p acontece e q não. "Pedro viaja e Carla não é contadora".

### 17
<!-- modelo: m13 -->
Qual frase é equivalente a "Não é verdade que Ana estuda ou o relatório é aprovado"?

- A) Ana não estuda ou o relatório é aprovado.
- B) Ana não estuda e o relatório não é aprovado.
- C) Se Ana estuda, então o relatório não é aprovado.
- D) Ana estuda e o relatório é aprovado.
- E) Ana não estuda ou o relatório não é aprovado.

**Resposta:** B

**Explicação:** Ferramenta: De Morgan: ~(p ∨ q) = ~p ∧ ~q. Negue as duas partes e troque "ou" por "e". "Ana não estuda e o relatório não é aprovado".

## Difícil

### 1
<!-- modelo: d1 -->
Qual é a negação de "Lucas é bancário se, e somente se, a taxa de juros sobe"?

- A) Lucas não é bancário e a taxa de juros não sobe.
- B) Lucas é bancário e a taxa de juros não sobe.
- C) Se Lucas é bancário, então a taxa de juros não sobe.
- D) Lucas não é bancário se, e somente se, a taxa de juros não sobe.
- E) Ou Lucas é bancário, ou a taxa de juros sobe, mas não ambos.

**Resposta:** E

**Explicação:** Ferramenta: negação da bicondicional. ~(p ↔ q) ≡ p ⊻ q, isto é, (p ∧ ~q) ∨ (~p ∧ q): exatamente uma delas é verdadeira. Note que ~p ↔ ~q é EQUIVALENTE a p ↔ q, não sua negação.

### 2
<!-- modelo: d1 -->
Qual é a negação de "Maria viaja se, e somente se, Lucas é bancário"?

- A) Se Maria viaja, então Lucas não é bancário.
- B) Maria não viaja e Lucas não é bancário.
- C) Maria não viaja se, e somente se, Lucas não é bancário.
- D) Ou Maria viaja, ou Lucas é bancário, mas não ambos.
- E) Maria viaja e Lucas não é bancário.

**Resposta:** D

**Explicação:** Ferramenta: negação da bicondicional. ~(p ↔ q) ≡ p ⊻ q, isto é, (p ∧ ~q) ∨ (~p ∧ q): exatamente uma delas é verdadeira. Note que ~p ↔ ~q é EQUIVALENTE a p ↔ q, não sua negação.

### 3
<!-- modelo: d7 -->
A proposição p ↔ q é logicamente equivalente a:

- A) p ↔ ~q
- B) (p ∨ q) ∧ (~p ∨ ~q)
- C) (p ∧ ~q) ∨ (~p ∧ q)
- D) (p ∧ q) ∨ (~p ∧ ~q)
- E) (p → q) ∨ (q → p)

**Resposta:** D

**Explicação:** Ferramenta: bicondicional = ida e volta. p ↔ q é verdadeira quando p e q têm o mesmo valor: (p → q) ∧ (q → p) ≡ (p ∧ q) ∨ (~p ∧ ~q) ≡ ~p ↔ ~q. Por isso, (p ∧ q) ∨ (~p ∧ ~q).

### 4
<!-- modelo: d5 -->
"O relatório foi entregue ou Ana trabalha no IBGE" é logicamente equivalente a:

- A) Se o relatório não foi entregue, então Ana não trabalha no IBGE.
- B) Se Ana trabalha no IBGE, então o relatório foi entregue.
- C) Se o relatório não foi entregue, então Ana trabalha no IBGE.
- D) O relatório não foi entregue e Ana não trabalha no IBGE.
- E) Se o relatório foi entregue, então Ana trabalha no IBGE.

**Resposta:** C

**Explicação:** Ferramenta: disjunção ≡ condicional. p ∨ q ≡ ~p → q (se uma das partes falhar, a outra tem de ocorrer). Também ≡ ~q → p.

### 5
<!-- modelo: d3 -->
A proposição "Se não faz sol, então Ana trabalha no IBGE" é logicamente equivalente a:

- A) Se Ana trabalha no IBGE, então não faz sol.
- B) Se Ana não trabalha no IBGE, então faz sol.
- C) Se faz sol, então Ana não trabalha no IBGE.
- D) Não faz sol ou Ana trabalha no IBGE.
- E) Não faz sol e Ana não trabalha no IBGE.

**Resposta:** B

**Explicação:** Ferramenta: contrapositiva com negação. Contrapositiva: (~p → q) ≡ (~q → ~~p) ≡ (~q → p). Também equivale a "p ou q".

### 6
<!-- modelo: d2 -->
Qual é a negação de "Se o relatório foi entregue, então Maria viaja e Lucas é bancário"?

- A) O relatório não foi entregue ou Maria viaja e Lucas é bancário.
- B) O relatório foi entregue e Maria não viaja e Lucas não é bancário.
- C) Se o relatório não foi entregue, então Maria não viaja ou Lucas não é bancário.
- D) Se o relatório foi entregue, então Maria não viaja ou Lucas não é bancário.
- E) O relatório foi entregue e (Maria não viaja ou Lucas não é bancário).

**Resposta:** E

**Explicação:** Ferramenta: negação de condicional composta. ~[p → (q ∧ r)] ≡ p ∧ ~(q ∧ r) ≡ p ∧ (~q ∨ ~r).

### 7
<!-- modelo: d2 -->
Qual é a negação de "Se Pedro é economista, então João estuda e Lucas é bancário"?

- A) Pedro não é economista ou João estuda e Lucas é bancário.
- B) Se Pedro é economista, então João não estuda ou Lucas não é bancário.
- C) Se Pedro não é economista, então João não estuda ou Lucas não é bancário.
- D) Pedro é economista e (João não estuda ou Lucas não é bancário).
- E) Pedro é economista e João não estuda e Lucas não é bancário.

**Resposta:** D

**Explicação:** Ferramenta: negação de condicional composta. ~[p → (q ∧ r)] ≡ p ∧ ~(q ∧ r) ≡ p ∧ (~q ∨ ~r).

### 8
<!-- modelo: d3 -->
A proposição "Se Carlos não pratica esportes, então chove" é logicamente equivalente a:

- A) Carlos não pratica esportes ou chove.
- B) Carlos não pratica esportes e não chove.
- C) Se chove, então Carlos não pratica esportes.
- D) Se não chove, então Carlos pratica esportes.
- E) Se Carlos pratica esportes, então não chove.

**Resposta:** D

**Explicação:** Ferramenta: contrapositiva com negação. Contrapositiva: (~p → q) ≡ (~q → ~~p) ≡ (~q → p). Também equivale a "p ou q".

### 9
<!-- modelo: d6 -->
Qual é a negação de "Se x > 3, então y < 5"?

- A) x ≤ 3 e y ≥ 5
- B) x > 3 e y > 5
- C) x > 3 ou y ≥ 5
- D) x > 3 e y ≥ 5
- E) Se x > 3, então y ≥ 5

**Resposta:** D

**Explicação:** Ferramenta: negação da condicional (mantém e nega). Mantenha a 1ª parte, troque "se..., então" por "e" e negue a 2ª parte. A negação de "<" é "≥". ~(p → q) ≡ p ∧ ~q: x > 3 e y ≥ 5.

### 10
<!-- modelo: d8 -->
A afirmação "Não é verdade que todo recenseador não usa colete" é equivalente a:

- A) Algum recenseador não usa colete.
- B) Todo recenseador não usa colete.
- C) Todo recenseador usa colete.
- D) Nenhum recenseador usa colete.
- E) Algum recenseador usa colete.

**Resposta:** E

**Explicação:** Ferramenta: negação de quantificador. "Não é verdade que..." pede a negação. A negação de "nenhum A é B" e de "todo A não é B" é a mesma: "algum A é B" (basta existir um). Logo: algum recenseador usa colete.

### 11
<!-- modelo: d4 -->
Qual é a negação de "Todo recenseador usa colete e o cliente paga em dia"?

- A) Algum recenseador não usa colete e o cliente não paga em dia.
- B) Nenhum recenseador usa colete e o cliente não paga em dia.
- C) Todo recenseador não usa colete ou o cliente não paga em dia.
- D) Algum recenseador não usa colete ou o cliente não paga em dia.
- E) Algum recenseador usa colete ou o recenseador não visita a casa.

**Resposta:** D

**Explicação:** Ferramenta: negação de quantificador + conjunção. Negação da conjunção (De Morgan): nega-se cada parte e troca-se "e" por "ou". A negação de "todo A é B" é "algum A não é B".

### 12
<!-- modelo: d9 -->
Qual é a negação de "Se chove e o sistema funciona, então Ana estuda"?

- A) Se chove e o sistema funciona, então Ana não estuda.
- B) Chove, o sistema funciona e Ana não estuda.
- C) Se Ana estuda, então chove e o sistema funciona.
- D) Chove e o sistema funciona, ou Ana não estuda.
- E) Não é verdade que chove, ou não é verdade que o sistema funciona, ou Ana estuda.

**Resposta:** B

**Explicação:** Ferramenta: negação da condicional: mantém o antecedente E nega o consequente. O antecedente é "chove e o sistema funciona". "Chove, o sistema funciona e Ana não estuda".

### 13
<!-- modelo: d10 -->
Qual frase é equivalente a "Se Ana estuda, então chove ou Carla é contadora"?

- A) Ana estuda e não chove e Carla é contadora.
- B) Se Ana estuda e chove, então Carla é contadora.
- C) Se Ana estuda e não chove, então Carla é contadora.
- D) Se Ana estuda, então chove e Carla é contadora.
- E) Se chove ou Carla é contadora, então Ana estuda.

**Resposta:** C

**Explicação:** Ferramenta: p → (q ∨ r) ⇔ (p ∧ ~q) → r. Se p acontece e q não, a única saída para a frase ser verdadeira é r. "Se Ana estuda e não chove, então Carla é contadora".

### 14
<!-- modelo: d13 -->
Qual é a negação de "Se todo funcionário é pontual, então algum cliente tem cartão de crédito"?

- A) Algum funcionário não é pontual e algum cliente tem cartão de crédito.
- B) Todo funcionário é pontual e nenhum cliente tem cartão de crédito.
- C) Todo funcionário é pontual e algum cliente tem cartão de crédito.
- D) Nenhum funcionário é pontual ou algum cliente tem cartão de crédito.
- E) Se nenhum funcionário é pontual, então nenhum cliente tem cartão de crédito.

**Resposta:** B

**Explicação:** Ferramenta: negação da condicional + quantificador. Mantenha o antecedente ("todo…") e negue o consequente ("algum…" vira "nenhum…"). "Todo funcionário é pontual e nenhum cliente tem cartão de crédito".

### 15
<!-- modelo: d12 -->
A frase "O relatório é aprovado ou o cliente paga em dia" é equivalente a:

- A) Se o cliente paga em dia, então o relatório não é aprovado.
- B) O relatório não é aprovado e o cliente paga em dia.
- C) Se o relatório é aprovado, então o cliente paga em dia.
- D) Se o relatório não é aprovado, então o cliente paga em dia.
- E) Se o cliente paga em dia, então o relatório é aprovado.

**Resposta:** D

**Explicação:** Ferramenta: p ∨ q ⇔ ~p → q. Se uma das duas precisa acontecer, quando a primeira falha, a segunda acontece. "Se o relatório não é aprovado, então o cliente paga em dia".

### 16
<!-- modelo: d11 -->
Qual é a negação de "Se a meta não é atingida, então o relatório não é aprovado"?

- A) Se a meta é atingida, então o relatório é aprovado.
- B) Se a meta não é atingida, então o relatório é aprovado.
- C) A meta não é atingida e o relatório é aprovado.
- D) A meta é atingida e o relatório não é aprovado.
- E) A meta não é atingida e o relatório não é aprovado.

**Resposta:** C

**Explicação:** Ferramenta: negação da condicional: ~(A → B) = A ∧ ~B. Aqui A = "a meta não é atingida" e B = "o relatório não é aprovado"; negar B dá "o relatório é aprovado". "A meta não é atingida e o relatório é aprovado".
