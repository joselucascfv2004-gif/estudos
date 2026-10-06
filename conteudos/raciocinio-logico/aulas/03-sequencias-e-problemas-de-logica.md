### Sequências: procure o padrão

Teste, nesta ordem:

1. **Diferenças** entre termos seguidos (soma constante ou que cresce).
2. **Quocientes** (multiplica sempre pelo mesmo número).
3. **Posições pares e ímpares** separadas (duas sequências intercaladas).
4. **Ciclos** (o padrão se repete).
5. Quadrados, cubos, primos, Fibonacci (cada termo é a soma dos dois anteriores).

> **Exemplo resolvido.** 2, 5, 10, 17, 26, …?
> Diferenças: 3, 5, 7, 9 (ímpares seguidos). Próxima: 11 → **37**. (Também é n² + 1.)

> **Exemplo resolvido.** 3, 10, 6, 20, 12, 40, …?
> Ímpares: 3, 6, 12 (×2). Pares: 10, 20, 40 (×2). Próximo (posição ímpar): **24**.

### Ciclos e o resto da divisão

Se um padrão se repete a cada **k** termos, o termo de posição **n** é o mesmo da posição igual ao **resto de n ÷ k** (se o resto for 0, é o último do ciclo).

> **Exemplo resolvido.** Na sequência A, B, C, D, A, B, C, D, …, qual a 50ª letra?
> 50 ÷ 4 = 12, resto **2** → a 2ª letra do ciclo: **B**.

### Calendário

- A cada **7 dias**, volta o mesmo dia da semana.
- Um ano **comum** (365 dias = 52 semanas + 1 dia) faz a mesma data cair **1 dia da semana depois** no ano seguinte.
- Depois de um 29 de fevereiro (ano **bissexto**), a data **avança 2 dias**.

> **Exemplo resolvido.** Hoje é segunda-feira. Que dia será daqui a 100 dias?
> 100 ÷ 7 = 14, resto **2**. Segunda + 2 = **quarta-feira**.

### Problemas de associação ("quem é quem")

Três amigos, três profissões, três cidades… Monte uma **tabela** com as pessoas nas linhas e as características nas colunas. Marque **✘** no que é impossível e **✔** no que é certo. Cada ✔ elimina o resto da linha e da coluna.

> **Exemplo resolvido.** Ana, Bia e Caio são médico, professor e advogado. Ana não é médica. Caio é advogado. Quem é médico?
> Caio é advogado. Sobram médico e professor para Ana e Bia. Ana não é médica: **Bia é médica** e Ana é professora.

### Verdades e mentiras

Quando alguns personagens mentem e outros dizem a verdade:

1. **Suponha** que um deles fala a verdade.
2. Veja o que isso implica para os outros.
3. Se aparecer **contradição**, a suposição estava errada; teste a outra.

Procure também afirmações **contraditórias** entre si (uma diz "fui eu", a outra "não foi ele"): exatamente uma delas é verdadeira.

> **Exemplo resolvido.** Um vaso quebrou. Ana: "Não fui eu." Beto: "Foi a Ana." Caio: "Não foi o Beto." **Só um** diz a verdade. Quem quebrou?
> Ana e Beto se contradizem: exatamente um dos dois diz a verdade. Como só há uma verdade, **Caio mente**: então **foi o Beto**.
> Conferindo: Ana ("não fui eu") diz a verdade; Beto ("foi a Ana") mente; Caio ("não foi o Beto") mente. Uma só verdade ✔.

### Princípio da casa dos pombos

Com **n caixas** e **n + 1 objetos**, **alguma caixa terá pelo menos 2**.

> **Exemplo resolvido.** Quantas pessoas são necessárias para garantir que duas façam aniversário no mesmo mês?
> 12 meses (caixas): com **13 pessoas**, garante-se.

Para garantir **k** objetos numa caixa: (k − 1) · n + 1.

> **Exemplo.** Uma gaveta tem meias pretas, brancas e azuis. Quantas tirar, no escuro, para garantir um par da mesma cor?
> 3 cores: **4 meias**.
