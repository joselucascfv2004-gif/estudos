### Conjuntos e números

- **Naturais (ℕ):** 0, 1, 2, 3...
- **Inteiros (ℤ):** incluem os negativos.
- **Racionais (ℚ):** podem ser escritos como fração (inclui decimais exatos e dízimas periódicas).
- **Irracionais:** decimais infinitos não periódicos (√2, π).
- **Reais (ℝ):** racionais + irracionais.

Operações com conjuntos: **união** (A ∪ B, tudo o que está em um ou outro), **interseção** (A ∩ B, o que está nos dois) e **diferença** (A − B, o que está em A e não em B).

### Equações, inequações e sistemas

- **1º grau:** isole x. Ex.: 3x − 7 = 11 → x = 6.
- **2º grau:** ax² + bx + c = 0, Δ = b² − 4ac, x = (−b ± √Δ)/2a. Se Δ < 0, não há raiz real. Soma das raízes = −b/a; produto = c/a.
- **Inequações:** resolvem-se como equações, mas, ao multiplicar ou dividir por número negativo, **inverte-se** o sinal. No 2º grau, estude o sinal da parábola: com a > 0, ela é negativa **entre** as raízes.
- **Sistemas:** use soma (adição) ou substituição. Se as equações forem proporcionais nos coeficientes mas não no resultado, o sistema é **impossível**; se forem totalmente proporcionais, é **indeterminado**.

### Funções aplicadas à gestão

- **Custo total:** C(q) = custo fixo + custo variável unitário × q.
- **Receita:** R(q) = preço × q. Se a demanda depende do preço (q = 100 − 2p), a receita vira R(p) = p(100 − 2p).
- **Lucro:** L(q) = R(q) − C(q).
- **Ponto de equilíbrio:** R(q) = C(q) (lucro zero).
- **Custo médio:** C(q)/q.

> **Exemplo resolvido.** C(q) = 3.000 + 20q e R(q) = 50q. Equilíbrio: 50q = 3.000 + 20q → q = 100. Com 150 unidades: L = 7.500 − 6.000 = R$ 1.500.

Na **função quadrática** f(x) = ax² + bx + c, o vértice fica em x = −b/2a. Com a < 0, o vértice é o **máximo**; com a > 0, é o **mínimo**.

### Limites

O limite indica de que valor f(x) se aproxima quando x se aproxima de um número.

- Em polinômios, basta **substituir**.
- Se der **0/0**, fatore e simplifique: (x² − 4)/(x − 2) = x + 2 → limite 4 quando x → 2.
- No **infinito**, num quociente de polinômios, valem os termos de maior grau: (3x² + 2x)/(x² − 5) → 3.

### Derivadas

A derivada mede a **taxa de variação instantânea** (a inclinação da reta tangente).

- (k)' = 0; (xⁿ)' = n·xⁿ⁻¹; (k·f)' = k·f'; (f ± g)' = f' ± g'.
- **Produto:** (f·g)' = f'·g + f·g'.
- **Cadeia:** [f(g(x))]' = f'(g(x))·g'(x). Ex.: [(x² + 1)³]' = 3(x² + 1)²·2x.

**Uso em gestão (análise marginal):**

- **Custo marginal** C'(q): custo aproximado de uma unidade a mais.
- **Receita marginal** R'(q): receita aproximada de uma unidade a mais.
- **Lucro máximo:** L'(q) = 0, ou seja, **R'(q) = C'(q)**, com L''(q) < 0.

> **Exemplo resolvido.** Preço R$ 30 e C(q) = 0,1q² + 10q + 200. R'(q) = 30 e C'(q) = 0,2q + 10. Igualando: q = 100 unidades.

**Pontos críticos:** onde f'(x) = 0. Se f''(x) < 0, é máximo local; se f''(x) > 0, é mínimo local.

### Integrais

A integral é a operação inversa da derivada.

- ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1); ∫k dx = kx + C.
- **Integral definida:** ∫ de a até b de f(x) dx = F(b) − F(a). Para f positiva, é a **área** sob a curva.
- Em gestão: integrando o **custo marginal**, recupera-se o custo total. A constante é o custo fixo.

> **Exemplo resolvido.** C'(q) = 6q + 4 e custo fixo R$ 500. C(q) = 3q² + 4q + 500. O aumento de custo de q = 10 para q = 20 com C'(q) = 2q + 10 é [q² + 10q] de 10 a 20 = 600 − 200 = R$ 400.

### Modelos matemáticos

- **Linear:** variação constante por período (y = a + bx).
- **Exponencial:** multiplica por um fator a cada período (M = C·(1 + i)ᵗ), como juros compostos e crescimento populacional.
- **Quadrático:** aparece em receita com demanda decrescente e em lucro com custos crescentes.
