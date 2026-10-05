### Função como "máquina"

Pense numa função como uma máquina: entra um número x, sai f(x). Com essa imagem, composição e inversa ficam fáceis:

- **Composta:** ligar duas máquinas em sequência.
- **Inversa:** uma máquina que faz o caminho de volta.

### Função composta: uma máquina depois da outra

f(g(x)) (lê-se "f de g de x") quer dizer: aplique **g primeiro** e, no resultado, aplique **f**.

> **Exemplo resolvido.** f(x) = 2x + 1 e g(x) = x − 3. Quanto vale f(g(5))?
> g(5) = 5 − 3 = 2. Depois, f(2) = 2·2 + 1 = **5**.

A ordem importa: g(f(5)) = g(11) = 8, que é diferente.

Para achar a **lei** da composta, troque cada x da lei de f pela lei inteira de g:

> f(x) = x² e g(x) = x + 4.
> f(g(x)) = (x + 4)² = x² + 8x + 16.
> g(f(x)) = x² + 4.

### Composição no dia a dia

- **Desconto sobre desconto:** f(x) = 0,8x (−20%) e g(x) = 0,9x (−10%). g(f(x)) = 0,72x: o desconto total é de 28%, e não de 30%.
- **Conversões em cadeia:** de Fahrenheit para Celsius e depois para Kelvin.
- **Área em função do perímetro:** o lado é P/4 e a área é (P/4)².

### Função inversa: o caminho de volta

Se f leva a em b, a inversa f⁻¹ leva b de volta em a: **f(a) = b ⇔ f⁻¹(b) = a**.

Para achar a lei da inversa:

1. Escreva y = f(x).
2. Troque x por y e y por x.
3. Isole o novo y.

> **Exemplo resolvido.** f(x) = 3x + 7.
> y = 3x + 7 → x = 3y + 7 → y = (x − 7)/3.
> **f⁻¹(x) = (x − 7)/3.** Confira: f(1) = 10 e f⁻¹(10) = 1.

Muitas vezes nem é preciso a lei: para calcular f⁻¹(k), basta resolver f(x) = k.

> **Exemplo resolvido.** Um táxi cobra P(d) = 6 + 3d. Quem pagou R$ 51 andou quantos km?
> 6 + 3d = 51 ⇒ d = **15 km**.

### Quem tem inversa?

Só funções **bijetoras**, em que cada saída vem de uma única entrada. O teste prático é o da **reta horizontal**: se alguma reta horizontal corta o gráfico em dois pontos, não há inversa.

- f(x) = x² não tem inversa em ℝ, porque f(2) = f(−2) = 4. Restringindo o domínio a x ≥ 0, ela passa a ter: a inversa é √x.
- Funções afins (com a ≠ 0) e f(x) = x³ têm inversa.

### O gráfico da inversa

O gráfico de f⁻¹ é o "espelho" do gráfico de f em relação à reta **y = x**: o ponto (a, b) vira (b, a). Por isso, quando f é crescente, f e f⁻¹ se encontram sobre a reta y = x, e esse ponto sai de f(x) = x.

### Cuidado com o domínio

- Não se divide por zero: em f(x) = 5/(x − 6), o domínio é ℝ − {6}.
- Raiz quadrada exige radicando ≥ 0: f(x) = √(x − 1) só existe para x ≥ 1.
- Na composta f(g(x)), olhe o que **entra** em f: se f(x) = √x e g(x) = x − 4, precisa valer x − 4 ≥ 0.
