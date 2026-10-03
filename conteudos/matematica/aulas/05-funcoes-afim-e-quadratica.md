### O que é uma função

Uma função é uma regra que liga cada valor de entrada (x) a **um único** valor de saída (y). No dia a dia, quase tudo que "depende de" algo é uma função: o valor da conta de luz depende do consumo, o preço da corrida de táxi depende dos quilômetros rodados.

Escrevemos y = f(x) e lemos "y é função de x". O conjunto dos valores que x pode assumir é o **domínio**; os valores que y realmente assume formam a **imagem**.

### Função afim: f(x) = ax + b

É a função cujo gráfico é uma **reta**. Os dois números têm significado:

- **b (coeficiente linear)** é o valor de f quando x = 0. No gráfico, é onde a reta corta o eixo y. Em problemas, costuma ser o **valor fixo** (bandeirada do táxi, taxa de assinatura).
- **a (coeficiente angular ou taxa de variação)** diz quanto y muda quando x aumenta 1. Em problemas, é o **valor por unidade** (preço por km, preço por kWh).
- a > 0: a reta sobe (função crescente). a < 0: a reta desce (decrescente). a = 0: a reta é horizontal (função constante).

> **Exemplo resolvido.** Um táxi cobra R$ 5,00 de bandeirada mais R$ 2,50 por km. Quanto custa uma corrida de 12 km?
> O valor fixo é b = 5 e o valor por km é a = 2,5. Então f(x) = 2,5x + 5.
> f(12) = 2,5 · 12 + 5 = 30 + 5 = **R$ 35,00**.

**Como achar a lei a partir de dois pontos:** se a reta passa por (x₁, y₁) e (x₂, y₂), a taxa é a = (y₂ − y₁) ÷ (x₂ − x₁). Depois, substitua um dos pontos em y = ax + b para achar b.

> **Exemplo resolvido.** Uma conta foi de R$ 80 com 100 kWh e de R$ 130 com 200 kWh. Qual é a lei?
> a = (130 − 80) ÷ (200 − 100) = 50 ÷ 100 = 0,5 real por kWh.
> 80 = 0,5 · 100 + b ⇒ b = 30. Lei: **f(x) = 0,5x + 30**.

**Raiz (zero) da função afim:** é o x que faz f(x) = 0, ou seja, x = −b/a. No gráfico, é onde a reta corta o eixo x.

### Função quadrática: f(x) = ax² + bx + c (com a ≠ 0)

O gráfico é uma **parábola**.

- **a > 0:** concavidade para cima (formato de "U"), a função tem um **valor mínimo**.
- **a < 0:** concavidade para baixo (formato de "∩"), a função tem um **valor máximo**.
- **c** é onde a parábola corta o eixo y (o valor de f(0)).

**Raízes:** são as soluções de ax² + bx + c = 0, pela fórmula de Bhaskara:

- Δ = b² − 4ac
- x = (−b ± √Δ) ÷ 2a
- Δ > 0: duas raízes (a parábola corta o eixo x em dois pontos). Δ = 0: uma raiz (encosta no eixo). Δ < 0: nenhuma raiz real (não toca o eixo x).

**Vértice:** é o ponto mais baixo (ou mais alto) da parábola.

- xᵥ = −b ÷ 2a
- yᵥ = −Δ ÷ 4a (ou simplesmente calcule f(xᵥ))

O vértice responde perguntas de **máximo e mínimo**: lucro máximo, área máxima, altura máxima de um objeto lançado, menor custo.

> **Exemplo resolvido.** O lucro de uma loja é L(x) = −x² + 40x − 300, em que x é o número de peças vendidas. Quantas peças dão o lucro máximo, e qual é esse lucro?
> Como a = −1 < 0, a parábola tem máximo no vértice.
> xᵥ = −40 ÷ (2 · (−1)) = 20 peças.
> L(20) = −400 + 800 − 300 = **R$ 100** de lucro máximo.

**Soma e produto das raízes:** S = −b/a e P = c/a. Servem para conferir respostas ou montar a equação a partir das raízes.

### Como o ENEM cobra

1. **Montar a lei a partir de uma situação** (tarifas, planos de celular, salário com comissão): identifique o valor fixo (b) e o valor por unidade (a).
2. **Comparar dois planos:** iguale as duas leis para achar o ponto em que eles custam o mesmo valor; antes desse ponto um é mais barato, depois o outro.
3. **Ler gráficos:** reta passando pela origem indica grandezas diretamente proporcionais (b = 0).
4. **Máximo e mínimo:** quando aparece "máximo", "mínimo", "maior área" ou "altura máxima" com uma expressão do 2º grau, calcule o vértice.

### Erros comuns

- Confundir o valor fixo com o valor por unidade.
- Esquecer o sinal de "a" ao calcular o vértice (xᵥ = −b/2a tem um sinal de menos).
- Responder o x do vértice quando a pergunta pede o valor máximo (que é o y do vértice), ou o contrário. Leia de novo o que a questão pede.
