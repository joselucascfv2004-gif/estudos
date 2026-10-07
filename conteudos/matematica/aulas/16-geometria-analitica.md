### Para que serve este assunto

A geometria analítica junta a álgebra com a geometria: pontos viram pares de números, retas viram equações e circunferências viram fórmulas. É a matemática por trás de mapas digitais, GPS, jogos de computador e da localização de antenas e torres. No ENEM, aparece com mapas quadriculados, alcance de antenas e trajetos; nas provas militares, é cobrada com muita conta.

### Pontos no plano cartesiano

O plano cartesiano tem dois eixos perpendiculares: o horizontal (**x**, abscissas) e o vertical (**y**, ordenadas). Cada ponto é um par **(x, y)**: primeiro se anda na horizontal, depois na vertical. Os eixos dividem o plano em quatro **quadrantes**, numerados no sentido anti-horário a partir do canto superior direito: no 1º, x e y são positivos; no 2º, x negativo e y positivo; no 3º, os dois negativos; no 4º, x positivo e y negativo.

### Distância entre dois pontos

É Pitágoras disfarçado: a diferença dos x é um cateto, a diferença dos y é o outro, e a distância é a hipotenusa.

**d = √[(x₂ − x₁)² + (y₂ − y₁)²]**

> **Exemplo resolvido.** Qual a distância entre A(1, 2) e B(4, 6)?
> d = √[(4 − 1)² + (6 − 2)²] = √(9 + 16) = √25 = **5**.

### Ponto médio e baricentro

- **Ponto médio** de um segmento: a média das coordenadas. M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Entre A(1, 2) e B(4, 6): **M(2,5; 4)**.
- **Baricentro** de um triângulo (o ponto de equilíbrio): a média das coordenadas dos três vértices.

### A reta

**Coeficiente angular (m).** Mede a inclinação: quanto y sobe (ou desce) quando x aumenta 1.

**m = (y₂ − y₁) ÷ (x₂ − x₁)**

Se m > 0, a reta sobe; se m < 0, desce; se m = 0, é horizontal. Retas verticais (x = constante) não têm coeficiente angular. O coeficiente angular também é a tangente do ângulo que a reta faz com o eixo x.

**Equações da reta.**

- **Reduzida:** y = mx + n, em que n é onde a reta corta o eixo y (a mesma ideia da função afim).
- **Por um ponto e a inclinação:** y − y₀ = m(x − x₀).
- **Geral:** ax + by + c = 0.

> **Exemplo resolvido.** Ache a equação da reta que passa por (1, 3) e (3, 7).
> m = (7 − 3) ÷ (3 − 1) = 2. Usando o ponto (1, 3): y − 3 = 2(x − 1) → **y = 2x + 1**.

**Paralelas e perpendiculares.**

- Retas **paralelas** têm o **mesmo** coeficiente angular.
- Retas **perpendiculares** têm coeficientes cujo produto é **−1** (um é o "inverso com sinal trocado" do outro: 2 e −1/2).

> **Exemplo resolvido.** Ache a reta perpendicular a y = 2x + 1 que passa por (2, 5).
> m = −1/2. y − 5 = −1/2 (x − 2) → **y = −x/2 + 6**.

**Interseção de duas retas.** É a solução do sistema formado pelas duas equações.

> **Exemplo resolvido.** Onde se cruzam y = 2x + 1 e y = −x + 7?
> 2x + 1 = −x + 7 → 3x = 6 → x = 2 e y = 5. Ponto **(2, 5)**.

**Distância de um ponto a uma reta.** Para P(x₀, y₀) e a reta ax + by + c = 0:

**d = |a·x₀ + b·y₀ + c| ÷ √(a² + b²)**

> **Exemplo resolvido.** Distância de P(1, 2) à reta 3x + 4y − 1 = 0.
> |3 + 8 − 1| ÷ √(9 + 16) = 10 ÷ 5 = **2**.

### Área de triângulo e alinhamento

Com os vértices (x₁, y₁), (x₂, y₂) e (x₃, y₃), monte a matriz com as linhas (x, y, 1) de cada ponto. A **área é a metade do módulo do determinante**. Se o determinante der **zero**, os três pontos estão **alinhados** (não formam triângulo).

> **Exemplo resolvido.** Área do triângulo A(1, 1), B(5, 2), C(3, 6).
> Matriz de linhas 1, 1, 1 / 5, 2, 1 / 3, 6, 1. Pela regra de Sarrus:
> descendo: 1 · 2 · 1 + 1 · 1 · 3 + 1 · 5 · 6 = 2 + 3 + 30 = 35;
> subindo: 1 · 2 · 3 + 1 · 1 · 6 + 1 · 5 · 1 = 6 + 6 + 5 = 17.
> det = 35 − 17 = 18. Área = 18 ÷ 2 = **9**.

### A circunferência

É o conjunto dos pontos que estão a uma mesma distância (o **raio**, r) de um ponto fixo (o **centro**, (a, b)). A equação vem direto da fórmula da distância:

**(x − a)² + (y − b)² = r²**

> **Exemplo resolvido.** Escreva a equação da circunferência de centro (2, −1) e raio 3.
> **(x − 2)² + (y + 1)² = 9**. (Repare: y − (−1) vira y + 1.)

**Equação geral.** Às vezes ela vem "aberta", como x² + y² − 4x + 6y − 3 = 0. Para achar o centro e o raio, **complete os quadrados**:

> **Exemplo resolvido.** Ache o centro e o raio de x² + y² − 4x + 6y − 3 = 0.
> x² − 4x = (x − 2)² − 4 e y² + 6y = (y + 3)² − 9.
> (x − 2)² − 4 + (y + 3)² − 9 − 3 = 0 → (x − 2)² + (y + 3)² = 16.
> Centro **(2, −3)** e raio **4**.

Atalho: o centro é (−D/2, −E/2), em que D e E são os números que acompanham x e y na equação geral.

**Ponto dentro ou fora.** Calcule a distância do ponto ao centro e compare com o raio: menor → **interior**; igual → **sobre** a circunferência; maior → **exterior**.

> **Exemplo resolvido (contexto).** Uma antena em (2, −3) alcança 4 km. Uma casa está em (5, −3). Ela recebe o sinal?
> Distância: √(9 + 0) = 3 km < 4 km. **Sim**, está dentro da área de alcance.

**Reta e circunferência.** Compare a distância do centro à reta com o raio: menor → a reta corta em dois pontos (secante); igual → toca em um ponto (tangente); maior → não toca (exterior).

### Erros mais comuns

- Inverter a ordem (x, y) ao marcar pontos.
- Errar os sinais na equação da circunferência: (x + 1)² indica centro com x = −1.
- Calcular o coeficiente angular trocando a ordem dos pontos em cima e embaixo.
- Esquecer de dividir o determinante por 2 (e de tirar o módulo) na área.
- Achar que perpendiculares têm coeficientes opostos (2 e −2): o certo é produto −1 (2 e −1/2).

### Como cai na prova

No ENEM: mapas e plantas quadriculadas, menor distância entre pontos, áreas de terrenos pelas coordenadas, alcance de antenas e sinais (circunferências), pontos de encontro de trajetos (interseção de retas). Nas provas militares: equações de retas e circunferências, posições relativas, distâncias e áreas com contas mais longas.

### Teste-se

1. Qual a distância entre (0, 0) e (6, 8)?
2. Qual o ponto médio entre (2, 3) e (6, 7)?
3. Qual o coeficiente angular da reta que passa por (1, 1) e (3, 5)?
4. As retas y = 3x − 2 e y = 3x + 4 são paralelas, perpendiculares ou concorrentes?
5. Qual o centro e o raio de (x + 1)² + (y − 4)² = 25?

> **Respostas.** 1) √(36 + 64) = **10**. 2) **(4, 5)**. 3) 4 ÷ 2 = **2**. 4) **Paralelas** (mesmo m, n diferente). 5) Centro **(−1, 4)**, raio **5**.

### Para lembrar

- Distância: √(Δx² + Δy²). Ponto médio: média das coordenadas.
- m = Δy ÷ Δx; reta: y − y₀ = m(x − x₀).
- Paralelas: mesmo m. Perpendiculares: m₁ · m₂ = −1.
- Área do triângulo: |det| ÷ 2; det = 0 → pontos alinhados.
- Circunferência: (x − a)² + (y − b)² = r²; complete quadrados para achar centro e raio.
