### Para que serve este assunto

Algumas coisas não crescem "de tanto em tanto", e sim "multiplicando": bactérias que dobram a cada 20 minutos, dinheiro aplicado a juros compostos, vírus que se espalham, população que cresce 2% ao ano, material radioativo que perde metade da massa a cada tantos anos. Isso é **crescimento (ou decaimento) exponencial**. O logaritmo é a ferramenta "ao contrário": ele descobre **quanto tempo** (ou quantas vezes) é preciso multiplicar para chegar a um valor. Os dois aparecem no ENEM em contextos de biologia, química, finanças e terremotos.

### Revisão rápida de potências

Tudo aqui depende das propriedades de potência:

- aᵐ · aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ;
- a⁰ = 1; a⁻ⁿ = 1/aⁿ;
- a^(1/2) = √a e, em geral, a^(m/n) = raiz n-ésima de aᵐ.

### Crescimento linear × exponencial

Compare duas cidades que começam com 1 000 habitantes:

- A cidade A ganha **100 pessoas por ano** (soma sempre o mesmo valor): 1 000, 1 100, 1 200, 1 300... É crescimento **linear** (função afim).
- A cidade B cresce **10% ao ano** (multiplica sempre pelo mesmo fator, 1,1): 1 000, 1 100, 1 210, 1 331... É crescimento **exponencial**.

No começo, as duas parecem iguais. Com o tempo, a exponencial dispara. Essa é a ideia central: no exponencial, o aumento de cada período é **proporcional ao valor atual**.

### A função exponencial

Tem a forma **f(x) = k · aˣ**, em que k é o valor inicial (quando x = 0) e a é o fator que multiplica a cada período (com a > 0 e a ≠ 1).

- Se **a > 1**, a função é **crescente** (crescimento exponencial). Exemplo: a = 2 (dobra), a = 1,02 (cresce 2%).
- Se **0 < a < 1**, a função é **decrescente** (decaimento). Exemplo: a = 1/2 (cai pela metade), a = 0,9 (perde 10%).

O gráfico nunca toca o eixo x (a exponencial é sempre positiva) e passa por (0, k).

> **Exemplo resolvido.** Uma cultura começa com 500 bactérias e dobra a cada 20 minutos. Quantas haverá depois de 2 horas?
> Em 2 horas (120 minutos) há 120 ÷ 20 = 6 períodos de dobra. N = 500 · 2⁶ = 500 · 64 = **32 000 bactérias**.
> A fórmula geral é N(t) = 500 · 2^(t/20), com t em minutos.

**Meia-vida.** É o tempo para uma substância (radioativa, um remédio no sangue) cair pela metade.

> **Exemplo resolvido.** Um material radioativo tem meia-vida de 5 anos. De 80 g, quanto resta depois de 15 anos?
> 15 anos = 3 meias-vidas: 80 → 40 → 20 → **10 g**. Pela fórmula: 80 · (1/2)³ = 10 g.

### Equações exponenciais

São equações com o x no expoente. A estratégia principal é **escrever os dois lados com a mesma base** e igualar os expoentes.

> **Exemplo resolvido.** Resolva 2^(x+1) = 32.
> 32 = 2⁵. Então x + 1 = 5 → **x = 4**.

> **Exemplo resolvido.** Resolva 9ˣ = 27.
> 9 = 3² e 27 = 3³. Então 3^(2x) = 3³ → 2x = 3 → **x = 3/2**.

> **Exemplo resolvido.** Resolva 4ˣ − 3 · 2ˣ − 4 = 0.
> Como 4ˣ = (2ˣ)², troque 2ˣ por y: y² − 3y − 4 = 0 → y = 4 ou y = −1.
> 2ˣ = −1 não tem solução (exponencial é sempre positiva). 2ˣ = 4 → **x = 2**.

Quando não dá para igualar as bases (por exemplo, 3ˣ = 10), é aí que entra o logaritmo.

### Logaritmo: a pergunta "a que expoente?"

O logaritmo responde: **"a que número devo elevar a base para obter este valor?"**

**log_a b = x significa aˣ = b.**

- log₂ 8 = 3, porque 2³ = 8;
- log 1 000 = 3 (quando não se escreve a base, ela é 10), porque 10³ = 1 000;
- log₅ 1 = 0, porque 5⁰ = 1;
- log₃ (1/9) = −2, porque 3⁻² = 1/9.

**Condições de existência:** a base precisa ser positiva e diferente de 1, e o número (logaritmando) precisa ser **positivo**. Não existe log de zero nem de número negativo. Em log(x − 3), por exemplo, é obrigatório que x > 3.

Os dois logaritmos mais usados são o **decimal** (base 10, escrito só "log") e o **natural** (base e ≈ 2,718, escrito "ln").

### Propriedades dos logaritmos

Elas transformam multiplicações em somas, o que era a grande utilidade dos logaritmos antes das calculadoras:

- **Produto:** log(a · b) = log a + log b;
- **Quociente:** log(a ÷ b) = log a − log b;
- **Potência:** log(aⁿ) = n · log a (o expoente "desce" multiplicando);
- **Mudança de base:** log_a b = log b ÷ log a.

As provas costumam dar log 2 ≈ 0,301 e log 3 ≈ 0,477. Com eles e as propriedades, você calcula vários outros:

> **Exemplo resolvido.** Usando log 2 ≈ 0,301 e log 3 ≈ 0,477, calcule log 12 e log 5.
> log 12 = log(2² · 3) = 2 · 0,301 + 0,477 = **1,079**.
> log 5 = log(10 ÷ 2) = log 10 − log 2 = 1 − 0,301 = **0,699**.

### Usando o logaritmo para achar o tempo

Esse é o uso mais comum em prova: descobrir em quanto tempo algo que cresce exponencialmente atinge um valor.

**Passo a passo:** monte a equação exponencial, aplique log dos dois lados e use a propriedade da potência para "descer" o x.

> **Exemplo resolvido.** Um investimento rende 10% ao ano a juros compostos. Em quanto tempo o dinheiro dobra? (Use log 2 ≈ 0,301 e log 1,1 ≈ 0,041.)
> C · 1,1ᵗ = 2C → 1,1ᵗ = 2. Aplicando log: t · log 1,1 = log 2 → t = 0,301 ÷ 0,041 ≈ **7,3 anos**.

### Equações logarítmicas

Transforme o log em potência (pela definição) ou junte os logs com as propriedades. **Sempre confira as condições de existência no final.**

> **Exemplo resolvido.** Resolva log₂(x + 1) = 3.
> Pela definição: x + 1 = 2³ = 8 → **x = 7**. Condição: x + 1 > 0 ✔

> **Exemplo resolvido.** Resolva log x + log(x − 3) = 1.
> Produto: log[x(x − 3)] = 1 → x(x − 3) = 10 → x² − 3x − 10 = 0 → x = 5 ou x = −2.
> Condição: x > 0 e x − 3 > 0, ou seja, x > 3. Só **x = 5** serve.

### A função logarítmica

f(x) = log_a x é a "inversa" da exponencial: o gráfico é o da exponencial refletido na reta y = x. Ela só existe para x > 0, passa por (1, 0) e cresce **muito devagar** quando a base é maior que 1. Se a exponencial dispara, o logaritmo "freia".

### Escalas logarítmicas

Quando os valores variam de forma gigantesca, usa-se o logaritmo para "comprimir" a escala. Cada unidade a mais na escala significa **multiplicar por 10** a grandeza real:

- **pH:** pH = −log[H⁺]. Uma solução com [H⁺] = 10⁻³ mol/L tem pH 3. Uma solução de pH 3 é **100 vezes** mais ácida que uma de pH 5 (duas unidades de diferença = 10²).
- **Escala Richter:** um terremoto de magnitude 7 tem amplitude de onda **100 vezes** maior que um de magnitude 5.
- **Decibéis:** cada 10 dB a mais significa intensidade sonora 10 vezes maior.

### Erros mais comuns

- Tratar crescimento exponencial como linear (somar em vez de multiplicar).
- Achar que log(a + b) = log a + log b. **Falso:** a propriedade vale para o **produto**.
- Esquecer as condições de existência e aceitar uma raiz que deixa o logaritmando negativo.
- Na escala de pH, achar que o pH 3 é "2 vezes" mais ácido que o pH 5 (são 100 vezes).
- Confundir número de períodos com tempo total (2 horas com dobra a cada 20 min são 6 períodos).

### Como cai na prova

O ENEM gosta de crescimento de populações e de bactérias, meia-vida de remédios e de materiais radioativos, juros compostos, pH e escala Richter, quase sempre dando os valores de log necessários. Provas militares cobram equações exponenciais e logarítmicas mais elaboradas, com propriedades e condições de existência.

### Teste-se

1. Resolva 3^(x − 1) = 81.
2. Quanto vale log₂ 32?
3. Usando log 2 ≈ 0,301 e log 3 ≈ 0,477, calcule log 18.
4. Um remédio tem meia-vida de 8 horas no sangue. De 200 mg, quanto resta após 24 horas?
5. Quantas vezes uma solução de pH 4 é mais ácida que uma de pH 6?

> **Respostas.** 1) 81 = 3⁴ → x − 1 = 4 → **x = 5**. 2) 2⁵ = 32 → **5**. 3) log(2 · 3²) = 0,301 + 2 · 0,477 = **1,255**. 4) 3 meias-vidas: 200 → 100 → 50 → **25 mg**. 5) Duas unidades: **100 vezes**.

### Para lembrar

- Exponencial: multiplica pelo mesmo fator a cada período; f(x) = k · aˣ.
- a > 1 cresce; 0 < a < 1 decresce; meia-vida é multiplicar por 1/2 a cada período.
- Equação exponencial: iguale as bases.
- log_a b = x ⇔ aˣ = b; só existe log de número positivo.
- log do produto é a soma dos logs; o expoente "desce" multiplicando.
- Escalas logarítmicas: cada unidade = 10 vezes.
