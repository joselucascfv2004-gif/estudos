### Dividir, quociente e resto

Toda divisão de números inteiros pode ser escrita assim:

**dividendo = divisor × quociente + resto**, com o resto sempre menor que o divisor.

Por exemplo, 47 = 5 × 9 + 2: o quociente é 9 e o resto é 2. Quando o resto é zero, dizemos que o número é **divisível** (ou múltiplo).

Essa conta aparece em problemas do dia a dia. Com 527 alunos e ônibus de 45 lugares, 527 = 45 × 11 + 32: sobram 32 alunos, então são necessários **12 ônibus** (o resto pede mais um).

### Critérios de divisibilidade: descobrir sem dividir

| Divisor | Regra |
|---|---|
| 2 | termina em 0, 2, 4, 6 ou 8 |
| 3 | a soma dos algarismos é múltipla de 3 |
| 4 | os dois últimos algarismos formam um múltiplo de 4 |
| 5 | termina em 0 ou 5 |
| 6 | é divisível por 2 e por 3 |
| 9 | a soma dos algarismos é múltipla de 9 |
| 10 | termina em 0 |
| 11 | a soma alternada dos algarismos (+ − + −...) é múltipla de 11 |

> **Exemplo resolvido.** 8 124 é divisível por 3? 8 + 1 + 2 + 4 = 15, múltiplo de 3. **Sim.**

### Números primos e fatoração

Um número é **primo** quando tem exatamente dois divisores: 1 e ele mesmo (2, 3, 5, 7, 11, 13...). O 1 não é primo.

Para testar se n é primo, basta tentar dividir pelos primos até √n. Para 97: √97 ≈ 9,8, então testamos 2, 3, 5 e 7. Nenhum divide, logo **97 é primo**.

Todo número maior que 1 pode ser escrito como produto de primos, de um jeito só:

> 360 = 2 × 180 = 2 × 2 × 90 = ... = **2³ · 3² · 5**.

### Quantos divisores um número tem

Com a fatoração, some 1 a cada expoente e multiplique:

> 360 = 2³ · 3² · 5¹ tem (3 + 1)(2 + 1)(1 + 1) = **24 divisores**.

O motivo: cada divisor escolhe quantos 2 usar (de 0 a 3, 4 opções), quantos 3 (de 0 a 2, 3 opções) e quantos 5 (0 ou 1, 2 opções).

### MDC e MMC: qual usar?

- **MDC (máximo divisor comum):** a pergunta é "dividir em partes iguais, do **maior** tamanho possível". Exemplo: cortar fitas de 30 cm e 66 cm em pedaços iguais, os maiores possíveis → MDC(30, 66) = 6 cm.
- **MMC (mínimo múltiplo comum):** a pergunta é "**quando** voltam a coincidir". Exemplo: ônibus que saem a cada 15 e 20 minutos voltam a sair juntos depois de MMC(15, 20) = 60 minutos.

Pela fatoração:

- **MDC:** só os primos comuns, com o **menor** expoente.
- **MMC:** todos os primos, com o **maior** expoente.

> **Exemplo resolvido.** 72 = 2³ · 3² e 60 = 2² · 3 · 5.
> MDC = 2² · 3 = 12. MMC = 2³ · 3² · 5 = 360.
> Confira: 12 × 360 = 4 320 = 72 × 60. Sempre vale **MDC · MMC = a · b**.

### Restos que se repetem: calendário e potências

O resto da divisão por 7 resolve problemas de dia da semana: a semana se repete a cada 7 dias.

> **Exemplo resolvido.** Hoje é quarta-feira. Daqui a 171 dias? 171 = 7 × 24 + 3, então anda-se 3 dias: **sábado**.

Os restos de potências também se repetem em ciclos. Os restos de 2¹, 2², 2³, 2⁴... por 7 são 2, 4, 1, 2, 4, 1... (ciclo de 3). Para 2¹⁰⁰: 100 = 3 × 33 + 1, então o resto é o 1º do ciclo, **2**.

### Zeros no final de um fatorial

Cada zero no final vem de um 10 = 2 × 5. Como há muito mais fatores 2 que fatores 5, conte só os 5:

> Zeros de 100! = 100/5 + 100/25 = 20 + 4 = **24** (os múltiplos de 25 dão um 5 a mais).

### Outras bases de numeração

No nosso sistema (base 10), cada posição vale uma potência de 10. Em outra base, vale a potência daquela base.

> **Exemplo resolvido.** 1011 na base 2 = 1·8 + 0·4 + 1·2 + 1·1 = **11**.
> Para ir de decimal a binário, divida por 2 várias vezes e leia os restos de baixo para cima: 25 → **11001**.
