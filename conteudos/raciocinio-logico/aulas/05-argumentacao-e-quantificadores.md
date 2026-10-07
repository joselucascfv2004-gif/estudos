### Para que serve este assunto

Argumentação lógica fecha o estudo de raciocínio lógico: aqui você junta conectivos, negações e quantificadores para julgar se uma **conclusão decorre** das premissas. As bancas adoram questões do tipo "a partir das premissas, conclui-se que..." e "o argumento é válido?". O erro mais comum é julgar pela **verdade** das frases ou pelo bom senso, quando o que importa é a **forma** do raciocínio. Esta aula mostra as formas válidas, as falácias formais, o método dos diagramas e uma técnica rápida para achar a conclusão.

### Premissas e conclusão

- **Premissas:** as afirmações de partida, que o problema manda **considerar verdadeiras** (mesmo que pareçam absurdas).
- **Conclusão:** a afirmação que se pretende provar a partir delas.
- Palavras que indicam a conclusão: logo, portanto, então, assim, conclui-se que.

**Validade × verdade:** a **verdade** é uma propriedade das proposições (cada frase é V ou F); a **validade** é uma propriedade do **argumento** (a forma do raciocínio está correta ou não).

### O que é um argumento válido

Um argumento tem **premissas** (o que se afirma) e uma **conclusão**. Ele é **válido** quando, **se as premissas forem verdadeiras, a conclusão é obrigatoriamente verdadeira**.

A validade depende da **forma**, não do conteúdo. Um argumento pode ser válido com premissas absurdas:

> "Todo peixe voa. Todo gato é peixe. Logo, todo gato voa." → **válido** (a forma está certa), embora as premissas sejam falsas.

### As quatro formas válidas mais cobradas

1. **Modus ponens (afirmar o antecedente):** P → Q; P; logo **Q**.
   "Se chove, a rua molha. Choveu. Logo, a rua molhou."
2. **Modus tollens (negar o consequente):** P → Q; ~Q; logo **~P**.
   "Se chove, a rua molha. A rua não molhou. Logo, não choveu."
3. **Silogismo disjuntivo:** P ∨ Q; ~P; logo **Q**.
   "Vou de ônibus ou de metrô. Não fui de ônibus. Logo, fui de metrô."
4. **Silogismo hipotético (encadeamento):** P → Q; Q → R; logo **P → R**.
   "Se estudo, aprendo. Se aprendo, passo. Logo, se estudo, passo."

### As duas falácias formais

Parecem válidas, mas **não são**:

- **Afirmar o consequente:** P → Q; Q; logo P. ✘
  "Se chove, a rua molha. A rua está molhada. Logo, choveu." (Pode ter sido o caminhão-pipa!)
- **Negar o antecedente:** P → Q; ~P; logo ~Q. ✘
  "Se chove, a rua molha. Não choveu. Logo, a rua não está molhada." (Idem.)

> **Exemplo resolvido.** "Se Pedro é aprovado, ele viaja. Pedro viajou. Logo, foi aprovado." É válido?
> **Não**: é a falácia de **afirmar o consequente**. Pedro pode ter viajado por outro motivo.

### Quantificadores e diagramas

Desenhe os conjuntos:

- **"Todo A é B":** o círculo A fica **dentro** de B.
- **"Nenhum A é B":** os círculos ficam **separados**.
- **"Algum A é B":** os círculos têm **interseção** (pelo menos um elemento em comum).
- **"Algum A não é B":** há pelo menos um elemento de A **fora** de B.

### O teste do contraexemplo

Para saber se um argumento com quantificadores é válido, tente desenhar uma situação em que **as premissas são verdadeiras e a conclusão é falsa**. Se conseguir, o argumento é **inválido**.

> **Exemplo resolvido.** "Todo médico é estudioso. Algum estudioso é atleta. Logo, algum médico é atleta." É válido?
> Desenhe: médicos dentro de estudiosos. Os atletas podem cruzar os estudiosos **fora** do círculo dos médicos. Premissas verdadeiras e conclusão falsa: **inválido**.

> **Exemplo resolvido.** "Nenhum A é B. Todo C é A. Logo, nenhum C é B." É válido?
> C está dentro de A, e A não toca B. Então C também não toca B: **válido**.

### Lembrete das negações

- "todo" → "algum… não";
- "nenhum" → "algum";
- "algum" → "nenhum".

### Técnica para encontrar a conclusão

Em questões com várias premissas ("Se A, então B. Se B, então C. Não C. Logo..."):

1. Procure uma premissa **simples** (sem conectivo), ou uma conjunção, que já dá um valor certo.
2. Considere-a **verdadeira** e use as outras premissas, como num **efeito dominó**, para descobrir o valor das demais proposições.
3. Use **modus ponens** (se o antecedente é V, o consequente é V) e **modus tollens** (se o consequente é F, o antecedente é F).
4. Se não houver premissa simples, **suponha** um valor e veja se surge contradição.

> **Exemplo resolvido.** Considere verdadeiras: "Se Carla viaja, Diego fica em casa." "Se Diego fica em casa, Eva cozinha." "Eva não cozinha." O que se conclui?
> Comece pela premissa simples: **Eva não cozinha**. Pela segunda premissa (modus tollens), **Diego não fica em casa**. Pela primeira (modus tollens), **Carla não viaja**.

### Mais quantificadores

- **Todo A é B** equivale a "**Se** é A, **então** é B" e a "**Nenhum** A **não** é B".
- **Nenhum A é B** equivale a "**Todo** A **não** é B" e a "Se é A, então não é B".
- **Algum A é B** equivale a "**Existe** pelo menos um A que é B" e a "**Algum** B é A".
- "Algum A **não** é B" **não** equivale a "Algum B não é A".

> **Exemplo resolvido.** Considere verdadeiras: "Todo advogado é formado. Algum formado é rico." Pode-se concluir que "algum advogado é rico"?
> **Não**. Os ricos podem estar todos entre os formados que **não** são advogados (contraexemplo pelo diagrama).

### Erros mais comuns

- Julgar o argumento pela verdade das frases ou pelo bom senso, e não pela forma.
- Aceitar as falácias de afirmar o consequente e de negar o antecedente.
- Achar que "algum A é B" e "todo B é C" permitem concluir coisas sobre os A que não são B.
- Desenhar só um diagrama possível: é preciso testar se existe algum desenho que torne a conclusão falsa.
- Confundir a negação de "todo" ("algum não") com "nenhum".

### Como cai na prova

As bancas apresentam premissas (às vezes com nomes e situações do cotidiano) e perguntam qual conclusão é necessariamente verdadeira, se o argumento é válido ou qual premissa falta para torná-lo válido. Também cobram a negação e a equivalência de frases com quantificadores.

### Teste-se

1. "Se estudo, passo. Estudei. Logo, passei." Qual a forma desse argumento? É válido?
2. "Se estudo, passo. Passei. Logo, estudei." É válido?
3. "Ou vou de carro, ou vou de ônibus. Não fui de carro." O que se conclui?
4. "Todo atleta é disciplinado. João não é disciplinado." O que se conclui sobre João?
5. Qual a negação de "Algum servidor é pontual"?

> **Respostas.** 1) **Modus ponens**: **válido**. 2) **Inválido**: falácia de **afirmar o consequente**. 3) **Fui de ônibus** (silogismo disjuntivo). 4) **João não é atleta** (se fosse atleta, seria disciplinado: modus tollens). 5) "**Nenhum** servidor é pontual."

### Para lembrar

- Válido: se as premissas forem V, a conclusão é obrigatoriamente V. Depende da forma, não do conteúdo.
- Formas válidas: modus ponens, modus tollens, silogismo disjuntivo, silogismo hipotético.
- Falácias: afirmar o consequente, negar o antecedente.
- Diagramas: todo (dentro), nenhum (separados), algum (interseção).
- Contraexemplo: se as premissas podem ser V com a conclusão F, o argumento é inválido.
- Comece pelas premissas simples e faça o efeito dominó.
