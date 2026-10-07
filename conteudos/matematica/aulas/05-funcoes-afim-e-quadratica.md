### Para que serve este assunto

Função é a matemática da **dependência**: o valor da conta de luz depende do consumo, o preço da corrida de táxi depende da distância, a altura de uma bola chutada depende do tempo. Entender funções é entender como uma coisa varia quando outra muda. No ENEM, as funções afim e quadrática estão entre os assuntos mais cobrados, quase sempre com gráficos e situações reais: lucro máximo, ponto de equilíbrio, comparação de planos, trajetória de objetos.

### O que é uma função

Uma função é uma regra que, para **cada** valor de entrada (x), dá **um único** valor de saída (y, ou f(x)). Pense numa máquina: entra o número de quilômetros, sai o preço da corrida.

- **Domínio:** os valores que podem entrar (às vezes limitados pela situação: não existe quantidade negativa de produtos).
- **Imagem:** os valores que de fato saem.
- **Lei de formação:** a fórmula que liga x a y, como f(x) = 2x + 3.

Calcular f(4) é só trocar x por 4: se f(x) = 2x + 3, então f(4) = 2 · 4 + 3 = **11**.

No gráfico, a função é desenhada no plano cartesiano: cada ponto (x, f(x)) vira um ponto do desenho. Um teste rápido: uma curva só é gráfico de função se **nenhuma reta vertical** a corta em mais de um ponto (cada x tem um só y).

### Função afim: f(x) = ax + b

O gráfico é uma **reta**. Os dois números da fórmula têm significado claro:

- **b (coeficiente linear)** é o valor quando x = 0: onde a reta corta o eixo y. Em situações reais, é a **parte fixa** (taxa de entrega, bandeirada do táxi, assinatura mensal).
- **a (coeficiente angular ou taxa de variação)** é quanto y muda quando x aumenta 1 unidade. É a **parte variável** (preço por quilômetro, por minuto, por unidade). Se a > 0, a reta sobe (função crescente); se a < 0, desce (decrescente); se a = 0, é horizontal (função constante).

> **Exemplo resolvido.** Um táxi cobra R$ 5 de bandeirada mais R$ 2,50 por quilômetro. Escreva a função e calcule o preço de uma corrida de 12 km.
> P(x) = 2,5x + 5. P(12) = 2,5 · 12 + 5 = 30 + 5 = **R$ 35**.

**Achar a função a partir de dois pontos.** Muitas questões dão dois pares (x, y), por exemplo numa tabela ou num gráfico. A taxa é a variação de y dividida pela variação de x:

**a = (y₂ − y₁) ÷ (x₂ − x₁)**. Depois, substitua um ponto para achar b.

> **Exemplo resolvido.** Uma conta de água foi de R$ 50 com consumo de 10 m³ e de R$ 74 com 16 m³. Supondo uma função afim, quanto custa cada m³ e qual a taxa fixa?
> a = (74 − 50) ÷ (16 − 10) = 24 ÷ 6 = **R$ 4 por m³**.
> Usando o ponto (10, 50): 50 = 4 · 10 + b → **b = R$ 10** de taxa fixa. A função é C(x) = 4x + 10.

**Zero (raiz) da função afim.** É o x que faz f(x) = 0, onde a reta corta o eixo x: ax + b = 0 → **x = −b/a**. Em problemas de lucro, a raiz é o **ponto de equilíbrio**, a quantidade a partir da qual a empresa deixa de ter prejuízo.

> **Exemplo resolvido.** Uma pequena fábrica tem custo fixo de R$ 2 000 por mês e lucra R$ 25 em cada peça vendida (já descontado o custo da peça). Quantas peças precisa vender para não ter prejuízo?
> L(x) = 25x − 2 000. L(x) = 0 → x = 2 000 ÷ 25 = **80 peças**. Acima disso, há lucro.

**Comparar duas funções afins.** O ponto onde duas retas se cruzam é onde as duas opções custam o mesmo. Antes e depois dele, uma é mais vantajosa que a outra. Para achá-lo, iguale as funções.

> **Exemplo resolvido.** Locadora A: R$ 100 por dia mais R$ 0,50 por km. Locadora B: R$ 60 por dia mais R$ 0,90 por km. A partir de quantos km a locadora A compensa (num dia)?
> 100 + 0,5x = 60 + 0,9x → 40 = 0,4x → x = 100 km. Para mais de **100 km**, A é mais barata (sua taxa por km é menor).

**Estudo do sinal.** Se a > 0, a função é negativa antes da raiz e positiva depois. Se a < 0, é o contrário.

### Função quadrática: f(x) = ax² + bx + c (com a ≠ 0)

O gráfico é uma **parábola**. Ela aparece em trajetórias de objetos lançados, em áreas e, principalmente, em problemas de **máximo e mínimo** (maior lucro, maior área, menor custo).

**A concavidade (a "boca").** Depende do sinal de a:

- **a > 0:** boca para cima; a parábola tem um ponto **mínimo**.
- **a < 0:** boca para baixo; a parábola tem um ponto **máximo**.

**Onde corta os eixos.**

- Eixo y: no ponto (0, c).
- Eixo x: nas raízes, que se acham com Bhaskara (Δ = b² − 4ac). Se Δ > 0, corta o eixo x em dois pontos; se Δ = 0, encosta em um ponto; se Δ < 0, não toca o eixo x.

**O vértice: o ponto mais importante.** É o ponto de máximo ou de mínimo:

- **xᵥ = −b ÷ 2a** (também é a média das raízes, quando elas existem);
- **yᵥ = f(xᵥ)** (ou −Δ ÷ 4a).

A parábola é simétrica em relação à reta vertical que passa pelo vértice.

> **Exemplo resolvido.** Esboce f(x) = x² − 6x + 5.
> a = 1 > 0: boca para cima. Corta o eixo y em (0, 5). Raízes: Δ = 36 − 20 = 16 → x = (6 ± 4) ÷ 2 → **1 e 5**.
> Vértice: xᵥ = 6 ÷ 2 = 3 (a média de 1 e 5); yᵥ = 9 − 18 + 5 = **−4**. O ponto mínimo é **(3, −4)**.

> **Exemplo resolvido (máximo).** Uma bola é chutada e sua altura, em metros, é h(t) = −5t² + 20t, com t em segundos. Qual a altura máxima e quando ela acontece?
> a = −5 < 0: há máximo. tᵥ = −20 ÷ (2 · (−5)) = **2 s**. h(2) = −20 + 40 = **20 m**.
> A bola volta ao chão quando h = 0: −5t² + 20t = 0 → t(−5t + 20) = 0 → t = 0 ou **t = 4 s** (o dobro do tempo do vértice, por simetria).

> **Exemplo resolvido (lucro máximo).** Uma loja vende x camisetas por dia ao preço de (50 − x) reais cada. Que quantidade dá a maior receita?
> R(x) = x(50 − x) = −x² + 50x. xᵥ = −50 ÷ (−2) = **25 camisetas**, vendidas a R$ 25 cada. Receita máxima: 25 · 25 = **R$ 625**.

> **Exemplo resolvido (área máxima).** Com 40 m de cerca, qual o retângulo de maior área?
> Lados x e (20 − x), porque o perímetro 2x + 2(20 − x) = 40. A(x) = x(20 − x) = −x² + 20x. xᵥ = 10. O retângulo de maior área é o **quadrado de 10 m de lado**, com **100 m²**.

**Estudo do sinal da quadrática.** Com boca para cima e duas raízes, a função é negativa **entre** as raízes e positiva fora delas. Com boca para baixo, é o contrário. Isso resolve inequações como x² − 6x + 5 < 0 → 1 < x < 5.

### Lendo gráficos

Muitas questões não dão a fórmula, só o gráfico. Observe:

- Uma reta → função afim. Inclinação para cima → crescente; onde corta o eixo y → parte fixa.
- Uma parábola → quadrática. Boca para cima ou para baixo? Onde está o vértice? Onde corta os eixos?
- Gráficos "em pedaços" (funções definidas por partes): por exemplo, uma tarifa que muda de valor por faixa de consumo. Leia cada trecho separado.

### Erros mais comuns

- Trocar o papel de a e b (a parte fixa é o b, que aparece quando x = 0).
- Calcular a taxa a com a ordem trocada: use a mesma ordem em cima e embaixo.
- Esquecer o sinal na fórmula do vértice: xᵥ = **−b** ÷ 2a.
- Responder o x do vértice quando a pergunta era o valor máximo (o y), ou o contrário.
- Esquecer de descartar soluções sem sentido (tempo ou quantidade negativos).

### Como cai na prova

No ENEM: comparação de planos e tarifas (afim), ponto de equilíbrio, leitura de gráficos e problemas de máximo e mínimo (quadrática), muitas vezes com lançamento de objetos, lucro e área. Em provas militares e concursos: domínio, imagem, raízes, vértice, estudo do sinal e inequações.

### Teste-se

1. Se f(x) = 3x − 4, quanto vale f(5)? E qual é a raiz?
2. Uma reta passa por (2, 7) e (5, 16). Qual é a lei da função?
3. Qual o vértice de f(x) = x² − 4x + 1?
4. A altura de um objeto é h(t) = −4t² + 16t. Qual a altura máxima?
5. Para que valores de x a função f(x) = x² − 9 é negativa?

> **Respostas.** 1) f(5) = **11**; raiz em x = **4/3**. 2) a = 9 ÷ 3 = 3; 7 = 3 · 2 + b → b = 1; **f(x) = 3x + 1**. 3) xᵥ = 2; f(2) = 4 − 8 + 1 = −3; vértice **(2, −3)**. 4) tᵥ = 2; h(2) = −16 + 32 = **16**. 5) Raízes −3 e 3, boca para cima: negativa para **−3 < x < 3**.

### Para lembrar

- Afim: f(x) = ax + b; b é a parte fixa, a é a taxa por unidade; gráfico é reta.
- Taxa a partir de dois pontos: a = Δy ÷ Δx. Raiz: x = −b/a.
- Quadrática: parábola; a > 0 tem mínimo, a < 0 tem máximo.
- Vértice: xᵥ = −b ÷ 2a e yᵥ = f(xᵥ). Máximos e mínimos estão sempre no vértice.
- Interseção de duas funções: iguale as fórmulas.
