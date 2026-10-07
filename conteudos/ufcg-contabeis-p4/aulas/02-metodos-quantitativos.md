### Para que serve este assunto

Métodos quantitativos dão ao contador ferramentas para testar hipóteses, medir a inflação e corrigir valores, raciocinar logicamente, prever vendas e custos por regressão e analisar séries temporais. São usados em auditoria (amostragem e testes), em orçamentos e previsões, em análise de custos e em pesquisa contábil. Esta aula traz testes de hipóteses, números-índices, lógica, regressão simples e múltipla, séries temporais e as funções de planilha correspondentes.

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

### Erros mais comuns

- Confundir erro tipo I (rejeitar H₀ verdadeira) com tipo II (não rejeitar H₀ falsa).
- Somar variações percentuais em vez de multiplicar os fatores ao acumular índices.
- Achar que um R² alto prova causalidade.
- Extrapolar a reta de regressão muito além dos dados observados.
- Negar a condicional "se p, então q" como "se p, então não q" (a negação é "p e não q").

### Teste-se

1. Num teste com nível de significância de 5%, o que significa rejeitar H₀?
2. Inflação de 4% num ano e 6% no seguinte. Qual a inflação acumulada?
3. Um salário passou de R$ 2.000 para R$ 2.300 num período com inflação de 10%. Qual o ganho real?
4. Na reta ŷ = 50 + 3x, o que significa o 3?
5. Qual a negação de "se o caixa fecha, então o relatório é enviado"?

> **Respostas.** 1) Que há evidência para considerar H₀ falsa, aceitando **5% de risco** de errar (erro tipo I). 2) 1,04 × 1,06 = 1,1024 → **10,24%**. 3) 2.300 ÷ 1,10 ≈ 2.090,91; ganho real ≈ **4,5%**. 4) Que y aumenta, em média, **3 unidades** a cada unidade a mais de x. 5) "**O caixa fecha e o relatório não é enviado**."

### Para lembrar

- Testes: H₀ × H₁; erro tipo I (α) e tipo II (β); poder = 1 − β; estatística z ou t.
- Índices: simples, Laspeyres (cesta da base), Paasche (cesta atual), Fisher; acumular multiplicando; deflacionar dividindo.
- Lógica: conectivos, tabela-verdade (2ⁿ), De Morgan, condicional e contrapositiva.
- Regressão: b = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)²; a = ȳ − b·x̄; R² = r²; correlação não é causalidade.
- Múltipla: efeitos mantidas as demais constantes; multicolinearidade.
- Séries: tendência, sazonalidade, ciclo, irregular; média móvel; suavização exponencial.
