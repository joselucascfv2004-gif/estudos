### Progressão aritmética (PA): somando sempre o mesmo

Numa PA, cada termo é o anterior **mais** uma razão r: 3, 7, 11, 15… (r = 4).

- **Termo geral:** aₙ = a₁ + (n − 1) · r.
- **Soma dos n primeiros:** Sₙ = (a₁ + aₙ) · n ÷ 2.

A ideia da soma (que Gauss usou ainda criança): o primeiro mais o último, o segundo mais o penúltimo… todos os pares dão o mesmo valor.

> **Exemplo resolvido.** Quanto é 1 + 2 + 3 + … + 100?
> (1 + 100) · 100 ÷ 2 = **5 050**.

> **Exemplo resolvido.** Uma pessoa guarda R$ 50 no primeiro mês e aumenta R$ 10 por mês. Quanto guarda no 12º mês, e quanto juntou no total?
> a₁₂ = 50 + 11 · 10 = R$ 160. Total: (50 + 160) · 12 ÷ 2 = **R$ 1 260**.

**Truque dos três termos:** três números em PA podem ser escritos como x − r, x, x + r. A soma fica 3x, o que simplifica muito os problemas.

### Progressão geométrica (PG): multiplicando sempre pelo mesmo

Numa PG, cada termo é o anterior **vezes** uma razão q: 2, 6, 18, 54… (q = 3).

- **Termo geral:** aₙ = a₁ · qⁿ⁻¹.
- **Soma dos n primeiros:** Sₙ = a₁ · (qⁿ − 1) ÷ (q − 1).
- **Soma infinita** (só se −1 < q < 1): S = a₁ ÷ (1 − q).

> **Exemplo resolvido.** Uma bola é solta de 9 m e, a cada quique, sobe 1/3 da altura anterior. Qual é a soma das alturas de subida?
> Subidas: 3, 1, 1/3… PG com a₁ = 3 e q = 1/3. S = 3 ÷ (1 − 1/3) = **4,5 m**.

### Como reconhecer qual é qual

- A **diferença** entre termos vizinhos é constante? PA (crescimento linear, como juros simples).
- A **divisão** entre termos vizinhos é constante? PG (crescimento exponencial, como juros compostos e bactérias).

### Termo do meio

- Em uma PA, o termo do meio é a **média aritmética** dos vizinhos: b = (a + c) ÷ 2.
- Em uma PG, é a **média geométrica**: b² = a · c.

> **Exemplo resolvido.** Para que x, 12, 18 seja uma PG, 12² = x · 18 ⇒ **x = 8**.
