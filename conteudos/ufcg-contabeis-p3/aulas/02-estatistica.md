### Para que serve a estatística no curso de Contábeis

Auditoria por amostragem, análise de custos, previsão de vendas, risco de crédito e pesquisa científica dependem de estatística. Ela tem duas partes: a **descritiva** (organizar e resumir dados) e a **inferencial** (tirar conclusões sobre a população a partir de uma amostra).

### Conceitos básicos

- **População** (todos) × **amostra** (parte observada). **Parâmetro** descreve a população (μ, σ); **estatística** descreve a amostra (x̄, s).
- **Variáveis:**
  - **qualitativas nominais**, sem ordem (estado civil);
  - **qualitativas ordinais**, com ordem (escolaridade);
  - **quantitativas discretas**, que são contagens (nº de filhos);
  - **quantitativas contínuas**, que são medidas (peso, renda).
- **Frequência relativa** = frequência da classe ÷ total.
- **Gráficos:** linhas (tempo), colunas/barras (comparação), setores (partes de um todo), histograma (distribuição de variável contínua), boxplot (quartis e valores atípicos).

### Medidas de posição

- **Média:** soma ÷ quantidade. É sensível a valores extremos.
- **Média ponderada:** Σ(valor × peso) ÷ Σpesos.
- **Mediana:** o valor central dos dados ordenados. Se a quantidade for par, é a média dos dois centrais. É **robusta** a extremos.
- **Moda:** o valor mais frequente.
- **Quartis:** dividem os dados em quatro partes. A amplitude interquartil (Q3 − Q1) mede a dispersão dos 50% centrais.

> **Exemplo resolvido.** Salários de 2.000, 2.100, 2.200, 2.300 e 30.000. Média = 7.720; mediana = **2.200**. A mediana representa melhor o salário típico.

### Medidas de dispersão

- **Amplitude** = máximo − mínimo.
- **Variância populacional:** σ² = Σ(x − μ)² ÷ N. **Amostral:** s² = Σ(x − x̄)² ÷ (n − 1).
- **Desvio padrão** = √variância, na mesma unidade dos dados.
- **Coeficiente de variação** = DP ÷ média. Serve para comparar a dispersão de grupos com médias diferentes.
- **Transformações:** somar uma constante muda a média, mas não o DP. Multiplicar por k multiplica a média e o DP por k (o CV não muda).

> **Exemplo resolvido.** Dados 2, 4, 6, 8: média 5; Σ(desvios²) = 20. Variância populacional = **5**; amostral = 6,67.

### Probabilidade

- **Clássica:** casos favoráveis ÷ casos possíveis.
- **Adição:** P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Para eventos mutuamente exclusivos, o último termo é zero.
- **Condicional:** P(A | B) = P(A ∩ B) ÷ P(B).
- **Independência:** P(A ∩ B) = P(A) · P(B).
- **Teorema de Bayes:** atualiza uma probabilidade com uma nova informação.

> **Exemplo resolvido (Bayes).** 2% das notas têm erro; o teste acusa 90% delas e também 5% das notas corretas. P(erro | alerta) = 0,018 ÷ (0,018 + 0,049) ≈ **27%**. Quando o evento é raro, a maioria dos alertas é falsa.

### Variáveis aleatórias e distribuições

- **Esperança:** E(X) = Σ x · p(x). **Variância:** Var(X) = E(X²) − [E(X)]². Var(aX + b) = a² · Var(X).
- **Binomial:** n tentativas independentes, cada uma com sucesso de probabilidade p.
  - P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ.
  - Média = np; variância = np(1 − p).
- **Poisson:** contagem de ocorrências num intervalo, com média λ.
  - P(X = k) = e^(−λ) · λᵏ ÷ k!.
  - Média = variância = λ.
- **Normal:** em forma de sino, simétrica.
  - Padronização: z = (x − μ) ÷ σ.
  - Cerca de 68%, 95% e 99,7% dos dados ficam em ±1, ±2 e ±3 desvios.

> **Exemplo resolvido.** Peças com 10% de defeito; em 5 peças, P(pelo menos uma defeituosa) = 1 − 0,9⁵ ≈ **41%**.

> **Exemplo resolvido.** Salários ~ Normal(3.000; 500). P(X > 4.000) = P(Z > 2) ≈ **2,3%**.

### Amostragem

**Amostragens probabilísticas:**

- **Aleatória simples:** todos têm a mesma chance.
- **Sistemática:** um elemento a cada k, com início sorteado.
- **Estratificada:** sorteio dentro de grupos homogêneos (muito usada em auditoria por faixas de valor).
- **Por conglomerados:** sorteiam-se grupos inteiros (filiais, bairros).

**Amostragens não probabilísticas:** por conveniência e por cotas. Elas não permitem calcular a margem de erro com rigor.

### Intervalo de confiança

- **Erro padrão da média** = σ ÷ √n.
- **Média com σ conhecido:** x̄ ± z · σ/√n (z = 1,96 para 95%; ≈ 2,58 para 99%).
- **σ desconhecido e amostra pequena:** use a **t de Student** com n − 1 graus de liberdade.
- **Proporção:** p̂ ± z · √[p̂(1 − p̂)/n].
- **Tamanho de amostra:** n = (z · σ / E)², arredondando para cima.
- **Interpretação:** 95% dos intervalos construídos assim contêm o parâmetro verdadeiro.

> **Exemplo resolvido.** 600 clientes, 40% de aprovação. Erro padrão = 0,02; margem = 3,9 p.p. IC 95%: **36,1% a 43,9%**.

### Correlação

O coeficiente r vai de −1 a +1. Valores próximos de ±1 indicam forte relação linear. **Correlação não é causalidade.** O r² mostra a parte da variação explicada pela relação linear.

### Planilhas

- **Posição:** =MÉDIA(A1:A20), =MED(...), =MODO(...).
- **Dispersão:** =DESVPAD.A (amostra), =DESVPAD.P (população), =VAR.A, =VAR.P.
- **Distribuições:** =DISTR.BINOM(k; n; p; FALSO), =DIST.NORM.N(x; média; dp; VERDADEIRO), =INV.NORM.N(prob; média; dp).
- **Correlação:** =CORREL(A1:A20; B1:B20).

### Erros mais comuns

- Usar a média quando há valores extremos (a mediana é mais representativa).
- Dividir por n na variância **amostral** (o correto é n − 1).
- Somar probabilidades de eventos que podem ocorrer juntos sem subtrair a interseção.
- Confundir P(A | B) com P(B | A).
- Interpretar o intervalo de 95% como "95% de chance de o parâmetro estar neste intervalo específico".
- Confundir correlação com causalidade.

### Teste-se

1. Calcule a média, a mediana e a moda de 3, 5, 5, 7, 10.
2. Duas carteiras têm desvios padrão de 10 e 20 e médias de 50 e 200. Qual é relativamente mais dispersa?
3. Num lote, P(defeito) = 0,05. Qual a probabilidade de 2 peças independentes serem perfeitas?
4. Qual a margem de erro de 95% para uma média com σ = 20 e n = 100?
5. Quantas observações são necessárias para estimar uma média com erro de 2, σ = 10 e 95% de confiança?

> **Respostas.** 1) Média **6**, mediana **5**, moda **5**. 2) CV da primeira = 10/50 = 0,20; da segunda = 20/200 = 0,10: a **primeira** é relativamente mais dispersa. 3) 0,95 × 0,95 = **0,9025** (90,25%). 4) 1,96 × 20/√100 = **3,92**. 5) n = (1,96 × 10 / 2)² = 96,04 → **97**.

### Para lembrar

- População × amostra; parâmetro × estatística; variáveis qualitativas e quantitativas.
- Posição: média (sensível a extremos), mediana (robusta), moda, quartis.
- Dispersão: amplitude, variância (÷ N ou ÷ n − 1), desvio padrão, coeficiente de variação.
- Probabilidade: adição, condicional, independência, Bayes.
- Distribuições: binomial, Poisson, normal (z = (x − μ)/σ).
- Amostragem: aleatória simples, sistemática, estratificada, conglomerados.
- IC: x̄ ± z·σ/√n (1,96 para 95%); t de Student com σ desconhecido; n = (z·σ/E)².
- Correlação não é causalidade.
