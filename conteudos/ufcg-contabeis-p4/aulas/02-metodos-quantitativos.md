### Testes de hipóteses

Um teste de hipóteses decide, com base numa amostra, se há evidência suficiente contra uma afirmação sobre a população.

1. **Formule as hipóteses.** H₀ é a afirmação de "nenhum efeito" (μ = 100). H₁ é o que se quer mostrar: μ ≠ 100 (bilateral), μ > 100 ou μ < 100 (unilateral).
2. **Escolha α** (nível de significância, geralmente 5%).
3. **Calcule a estatística.**
   - z = (x̄ − μ₀)/(σ/√n), se σ for conhecido.
   - t = (x̄ − μ₀)/(s/√n), com n − 1 graus de liberdade, se σ for desconhecido.
   - Para proporção: z = (p̂ − p₀)/√[p₀(1 − p₀)/n].
4. **Decida.** Rejeite H₀ se a estatística cair na região crítica (|z| > 1,96 bilateral a 5%; z > 1,645 unilateral) ou se o **valor-p < α**.

**Os dois erros possíveis:**

- **Erro tipo I (α):** rejeitar H₀ verdadeira.
- **Erro tipo II (β):** não rejeitar H₀ falsa. **Poder** = 1 − β.
- Reduzir α aumenta β. Aumentar a amostra reduz os dois.
- "Não rejeitar H₀" não prova que ela é verdadeira.
- Para medir as mesmas pessoas antes e depois, use o **teste t pareado**.

> **Exemplo resolvido.** μ₀ = 100, σ = 15, n = 36, x̄ = 105. z = 5 ÷ 2,5 = **2,0** > 1,96: rejeita-se H₀. O valor-p bilateral é ≈ 0,046.

### Números-índices

- **Simples:** (p₁/p₀) × 100.
- **Laspeyres:** Σp₁q₀ ÷ Σp₀q₀ (cesta da base). Tende a superestimar a inflação, porque ignora a substituição.
- **Paasche:** Σp₁q₁ ÷ Σp₀q₁ (cesta atual).
- **Fisher:** √(Laspeyres × Paasche).
- **Acumular variações:** multiplique os fatores (1,10 × 1,05 = 1,155, ou seja, 15,5%).
- **Mudar a base:** divida a série pelo valor do novo ano-base.
- **Deflacionar:** valor real = valor nominal ÷ (índice/100).

> **Exemplo resolvido.** A: p₀ = 10, q₀ = 5, p₁ = 12, q₁ = 4. B: p₀ = 20, q₀ = 2, p₁ = 22, q₁ = 3. Laspeyres = 104/90 = **115,6**. Paasche = 114/100 = **114**.

> **Exemplo resolvido.** O salário foi de 3.000 para 3.600, com inflação de 10%. Salário real = 3.272,73; aumento real ≈ **9,1%**.

### Lógica simbólica

- **Conectivos:**
  - **negação** (~);
  - **conjunção** (∧), que só é V se as duas forem V;
  - **disjunção** (∨), que só é F se as duas forem F;
  - **condicional** (→), que só é F em V → F;
  - **bicondicional** (↔), que é V quando os valores são iguais.
- **Tabela-verdade:** com n proposições, tem 2ⁿ linhas.
- **Tautologia** é sempre V (p ∨ ~p); **contradição** é sempre F (p ∧ ~p).
- **De Morgan:** ~(p ∧ q) ≡ ~p ∨ ~q; ~(p ∨ q) ≡ ~p ∧ ~q.
- **Condicional:**
  - p → q ≡ ~q → ~p (contrapositiva) ≡ ~p ∨ q;
  - a negação é **p ∧ ~q**;
  - a recíproca (q → p) e a inversa (~p → ~q) **não** são equivalentes.

### Regressão linear simples

- **Reta:** ŷ = a + bx, com b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)² e a = ȳ − b·x̄.
- **Leitura dos coeficientes:** **b** é a variação média de y por unidade de x; **a** é o valor previsto quando x = 0.
- **Propriedades:** a reta passa por (x̄, ȳ) e os resíduos somam zero. Ela minimiza a soma dos **quadrados** dos resíduos.
- **Correlação e R²:** r mede a força da relação linear; na simples, **R² = r²** é a fração da variação de y explicada.
- **Cuidados:** correlação não é causalidade (variáveis omitidas) e extrapolar é arriscado.

> **Exemplo resolvido.** x = 1 a 5; y = 2, 4, 5, 4, 5. b = 6/10 = **0,6**; a = 4 − 1,8 = **2,2**; r ≈ 0,77; R² = **0,60**. Para x = 6, ŷ = 5,8.

### Regressão linear múltipla

- **Modelo:** ŷ = a + b₁x₁ + b₂x₂ + … Cada bᵢ é o efeito de xᵢ **mantidas as demais constantes**.
- **Avaliação:**
  - **R² ajustado**, para comparar modelos;
  - **teste F**, que verifica se o modelo como um todo é significativo;
  - **teste t**, para cada coeficiente (valor-p alto significa falta de evidência de efeito).
- **Multicolinearidade:** variáveis explicativas muito correlacionadas deixam os coeficientes instáveis.

### Séries temporais

- **Componentes:** tendência, sazonalidade, ciclo e irregular.
- **Média móvel:** média dos últimos k valores.
- **Suavização exponencial:** Fₜ₊₁ = αYₜ + (1 − α)Fₜ. Um α alto reage mais rápido, mas é mais nervoso.
- **Tendência + sazonalidade:** previsão = tendência × índice sazonal.

> **Exemplo resolvido.** ŷ = 500 + 20t; no 4º trimestre, t = 12 e o índice sazonal é 1,10. Previsão = 740 × 1,10 = **814**.

### Planilhas

- **Regressão:** =INCLINAÇÃO(y; x), =INTERCEPÇÃO(y; x), =RQUAD(y; x), =CORREL(x; y), =PREVISÃO.LINEAR(novo_x; y; x).
- **Regressão múltipla:** =PROJ.LIN(y; x1:xk; VERDADEIRO; VERDADEIRO).
- **Teste t:** =TESTE.T(intervalo1; intervalo2; caudas; tipo), em que o tipo 1 é para amostras pareadas.
- **Normal:** =DIST.NORMP.N(z; VERDADEIRO) dá a área acumulada da normal padrão.
