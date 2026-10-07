### Para que serve este assunto

Durante séculos, equações como x² + 4 = 0 eram consideradas "sem solução", porque nenhum número real elevado ao quadrado dá negativo. Os **números complexos** ampliam os números reais para que toda equação polinomial tenha solução. Eles são usados em engenharia elétrica, telecomunicações e física. Os **polinômios** são as expressões do tipo x³ − 6x² + 11x − 6, e estudá-los é estudar suas raízes. Este assunto é raro no ENEM, mas frequente nas provas militares (EsPCEx, AFA, Escola Naval) e em vestibulares tradicionais.

### A unidade imaginária

Define-se o número **i** tal que **i² = −1**. Com ele, √(−4) = 2i e a equação x² + 4 = 0 tem as soluções **x = 2i e x = −2i**.

Um número complexo na **forma algébrica** é **z = a + bi**, em que a é a **parte real** e b é a **parte imaginária** (os dois são números reais). Se b = 0, z é real; se a = 0 e b ≠ 0, z é **imaginário puro**.

**Potências de i.** Elas se repetem num ciclo de 4: i⁰ = 1; i¹ = i; i² = −1; i³ = −i; i⁴ = 1; i⁵ = i... Para calcular iⁿ, divida n por 4 e use o **resto**.

> **Exemplo resolvido.** Quanto vale i²⁷? E i¹⁰⁰?
> 27 ÷ 4 dá resto 3 → i²⁷ = i³ = **−i**. 100 ÷ 4 dá resto 0 → i¹⁰⁰ = **1**.

### Operações

- **Soma e subtração:** junte parte real com parte real e imaginária com imaginária. (2 + 3i) + (1 − i) = **3 + 2i**.
- **Multiplicação:** aplique a distributiva e troque i² por −1.

> **Exemplo resolvido.** Calcule (2 + 3i)(1 − i).
> 2 − 2i + 3i − 3i² = 2 + i + 3 = **5 + i**.

- **Conjugado:** o conjugado de z = a + bi é **z̄ = a − bi**. Um número vezes o seu conjugado dá sempre um número real: (a + bi)(a − bi) = **a² + b²**.
- **Divisão:** multiplique em cima e embaixo pelo **conjugado do denominador**, para tirar o i de baixo.

> **Exemplo resolvido.** Calcule (5 + i) ÷ (1 − i).
> Multiplicando por (1 + i): (5 + i)(1 + i) ÷ [(1 − i)(1 + i)] = (5 + 5i + i + i²) ÷ 2 = (4 + 6i) ÷ 2 = **2 + 3i**.
> Repare que bate com o exemplo da multiplicação: (2 + 3i)(1 − i) = 5 + i.

### Plano de Argand-Gauss e módulo

Cada complexo a + bi pode ser desenhado como o ponto **(a, b)** num plano: o eixo horizontal é o real e o vertical, o imaginário.

- **Módulo** (|z|): a distância do ponto até a origem. **|z| = √(a² + b²)**. |3 + 4i| = **5**.
- **Argumento** (θ): o ângulo que o segmento até o ponto faz com o eixo real positivo.

### Forma trigonométrica

Com o módulo r e o argumento θ: **z = r(cos θ + i sen θ)**.

> **Exemplo resolvido.** Escreva 1 + i na forma trigonométrica.
> r = √(1 + 1) = √2. O ponto (1, 1) faz 45° com o eixo real. z = **√2(cos 45° + i sen 45°)**.

A grande vantagem aparece na multiplicação e nas potências:

- **Multiplicar:** multiplique os módulos e **some** os argumentos.
- **Potência (fórmula de De Moivre):** zⁿ = rⁿ(cos nθ + i sen nθ).

> **Exemplo resolvido.** Calcule (1 + i)⁸.
> r⁸ = (√2)⁸ = 16 e 8 · 45° = 360°. Então (1 + i)⁸ = 16(cos 360° + i sen 360°) = 16(1 + 0i) = **16**.
> Fazer isso pela forma algébrica exigiria oito multiplicações!

### Polinômios

Um polinômio é uma expressão como P(x) = aₙxⁿ + ... + a₁x + a₀. O **grau** é o maior expoente com coeficiente diferente de zero.

- **Valor numérico:** troque x por um número. Se P(x) = x³ − 6x² + 11x − 6, então P(2) = 8 − 24 + 22 − 6 = **0**.
- **Raiz:** um número r tal que P(r) = 0. Acima, 2 é raiz.
- Um polinômio de grau n tem exatamente **n raízes** complexas (contando as repetidas). Esse é o Teorema Fundamental da Álgebra.

### Divisão de polinômios e teorema do resto

**Teorema do resto:** o resto da divisão de P(x) por (x − a) é **P(a)**. Não é preciso fazer a divisão!

> **Exemplo resolvido.** Qual o resto da divisão de P(x) = x³ + 2x − 5 por (x − 2)?
> P(2) = 8 + 4 − 5 = **7**.

**Teorema de D'Alembert:** P(x) é divisível por (x − a) se e só se P(a) = 0, isto é, se a é raiz.

**Dispositivo de Briot-Ruffini.** Um jeito rápido de dividir por (x − a): escreva os coeficientes; desça o primeiro; multiplique por a e some ao próximo; repita. O último número é o resto; os outros são os coeficientes do quociente.

> **Exemplo resolvido.** Divida x³ − 6x² + 11x − 6 por (x − 1).
> Coeficientes 1, −6, 11, −6 e a = 1:
> desce 1; 1 · 1 + (−6) = −5; −5 · 1 + 11 = 6; 6 · 1 + (−6) = 0.
> Quociente **x² − 5x + 6** e resto **0** (1 é raiz). As raízes do quociente são 2 e 3, então P(x) = (x − 1)(x − 2)(x − 3).

**Estratégia para achar raízes de grau 3 ou mais:** teste valores simples (±1, ±2, divisores do termo independente). Achando uma raiz, use Briot-Ruffini para baixar o grau e resolva o resto com Bhaskara.

### Relações de Girard

Ligam os coeficientes às raízes, sem precisar calculá-las.

- **Grau 2** (ax² + bx + c): soma = −b/a; produto = c/a.
- **Grau 3** (ax³ + bx² + cx + d), com raízes r₁, r₂, r₃:
  - soma: r₁ + r₂ + r₃ = −b/a;
  - soma dos produtos dois a dois: r₁r₂ + r₁r₃ + r₂r₃ = c/a;
  - produto: r₁r₂r₃ = −d/a.

> **Exemplo resolvido.** Confira as relações em x³ − 6x² + 11x − 6, cujas raízes são 1, 2 e 3.
> Soma: 6 = −(−6)/1 ✔. Dois a dois: 2 + 3 + 6 = 11 ✔. Produto: 6 = −(−6)/1 ✔.

**Raízes complexas em pares.** Se um polinômio tem **coeficientes reais** e 2 + i é raiz, então **2 − i** também é. Por isso, um polinômio de grau ímpar com coeficientes reais tem sempre pelo menos uma raiz real.

### Erros mais comuns

- Esquecer que i² = −1 na multiplicação (e deixar o i² na resposta).
- Dividir complexos sem usar o conjugado.
- Calcular |a + bi| como a + b, em vez de √(a² + b²).
- No teorema do resto, usar P(−a) para dividir por (x − a): o certo é P(a). Para (x + 1), use P(−1).
- Errar os sinais nas relações de Girard (soma é −b/a; produto do grau 3 é −d/a).

### Como cai na prova

Provas militares e vestibulares cobram potências de i, operações e divisão com conjugado, módulo e forma trigonométrica (com De Moivre), teorema do resto, Briot-Ruffini, pesquisa de raízes e relações de Girard. No ENEM, o assunto quase não aparece.

### Teste-se

1. Quanto vale i¹⁵?
2. Calcule (3 + 2i)(3 − 2i).
3. Qual o módulo de 6 − 8i?
4. Qual o resto da divisão de x² + 3x + 1 por (x + 1)?
5. Qual a soma das raízes de 2x³ − 4x² + x − 7?

> **Respostas.** 1) 15 ÷ 4 dá resto 3 → **−i**. 2) 9 + 4 = **13**. 3) √(36 + 64) = **10**. 4) P(−1) = 1 − 3 + 1 = **−1**. 5) −(−4)/2 = **2**.

### Para lembrar

- i² = −1; potências de i se repetem de 4 em 4 (use o resto).
- Divisão: multiplique pelo conjugado do denominador.
- |a + bi| = √(a² + b²); na forma trigonométrica, multiplique módulos e some argumentos.
- Resto da divisão por (x − a) é P(a); se P(a) = 0, a é raiz.
- Girard (grau 3): soma −b/a; dois a dois c/a; produto −d/a.
