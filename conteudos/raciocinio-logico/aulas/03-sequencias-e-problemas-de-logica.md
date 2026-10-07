### Para que serve este assunto

Sequências, calendários, relógios, problemas de "quem é quem" e de verdade e mentira são as questões de **raciocínio lógico-matemático** mais comuns em concursos de nível médio (Banco do Brasil, Caixa, IBGE, Correios, polícias). Não exigem fórmulas difíceis, e sim **organização**: descobrir o padrão, montar uma tabela, testar hipóteses. São questões que parecem "pegadinhas", mas têm método. Com prática, viram pontos garantidos.

### A atitude certa

- **Escreva** os dados. Tentar resolver de cabeça é o maior motivo de erro.
- Procure o **padrão** antes de calcular.
- **Teste** sua resposta no final: ela obedece a todas as condições do enunciado?

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

### Sequências de letras e figuras

- Troque as letras pela **posição no alfabeto** (A = 1, B = 2, ... Z = 26; o alfabeto oficial tem **26 letras**, com K, W e Y) e procure o padrão numérico.
- Em sequências de **figuras**, observe separadamente cada característica: a forma, a cor, a posição (girando quantos graus?), a quantidade de elementos.

> **Exemplo resolvido.** A, C, F, J, O, ...? Qual a próxima letra?
> Posições: 1, 3, 6, 10, 15. Diferenças: 2, 3, 4, 5. A próxima diferença é 6: 15 + 6 = 21, que é a letra **U**.

### Relógios

- O ponteiro das **horas** anda **30°** por hora (360° ÷ 12) e **0,5°** por minuto.
- O ponteiro dos **minutos** anda **6°** por minuto (360° ÷ 60).
- Ângulo entre os ponteiros às H horas e M minutos: |30·H − 5,5·M| (se passar de 180°, use 360° menos o resultado).

> **Exemplo resolvido.** Qual o menor ângulo entre os ponteiros às 3h20?
> |30·3 − 5,5·20| = |90 − 110| = **20°**.

**Relógios que atrasam ou adiantam:** use regra de três com o tempo decorrido.

> **Exemplo resolvido.** Um relógio atrasa 2 minutos por hora. Foi acertado ao meio-dia. Que horas ele marcará às 18h reais?
> Em 6 horas, atrasa 6 × 2 = 12 minutos. Marcará **17h48**.

### Erros mais comuns

- Esquecer que, quando o resto da divisão é 0, o termo é o **último** do ciclo (e não o primeiro).
- Contar o dia de partida nos problemas de calendário (daqui a 1 dia, de segunda, é terça).
- Esquecer o 29 de fevereiro em anos bissextos (múltiplos de 4, exceto os de 100 que não são de 400).
- Nos problemas de verdade e mentira, não testar todas as hipóteses.
- Na casa dos pombos, esquecer o "+1" (é preciso **mais** objetos que caixas).

### Como cai na prova

Questões de próximo termo de uma sequência, termo de posição grande (com ciclos), dias da semana em datas futuras, ângulos de relógio, problemas de associação com três ou quatro pessoas e características, situações com mentirosos e verdadeiros, e o "mínimo necessário para garantir" (casa dos pombos).

### Teste-se

1. Qual o próximo termo: 1, 4, 9, 16, 25, ...?
2. Na sequência 1, 2, 3, 1, 2, 3, ..., qual o 100º termo?
3. Se 1º de março de um ano caiu num domingo, em que dia da semana caiu 31 de março?
4. Qual o menor ângulo entre os ponteiros às 9h00?
5. Numa urna há bolas de 4 cores. Quantas devem ser retiradas, sem olhar, para garantir 3 da mesma cor?

> **Respostas.** 1) **36** (quadrados perfeitos: 6²). 2) 100 ÷ 3 = 33, resto 1: o 1º do ciclo, **1**. 3) De 1 a 31 de março passam 30 dias; 30 ÷ 7 = 4, resto 2: domingo + 2 = **terça-feira**. 4) |30·9 − 0| = 270°; o menor é 360° − 270° = **90°**. 5) (3 − 1)·4 + 1 = **9 bolas**.

### Para lembrar

- Sequências: diferenças, quocientes, intercaladas, ciclos, quadrados, primos, Fibonacci.
- Ciclos: use o resto da divisão (resto 0 = último do ciclo).
- Semana: 7 dias; ano comum avança 1 dia da semana, bissexto avança 2.
- Relógio: horas 30°/h e 0,5°/min; minutos 6°/min; ângulo = |30H − 5,5M|.
- Associação: tabela com ✔ e ✘. Verdade/mentira: suponha, teste, procure contradições.
- Casa dos pombos: n caixas, n + 1 objetos; para k numa caixa: (k − 1)·n + 1.
