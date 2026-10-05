### Crescer multiplicando

Na função afim, a cada passo **soma-se** o mesmo valor. Na **exponencial**, a cada passo **multiplica-se** pelo mesmo fator:

**f(x) = a · bˣ**

- a é o valor inicial (quando x = 0);
- b é o fator de cada passo. Se b > 1, cresce; se 0 < b < 1, decresce.

> **Exemplo resolvido.** Uma cultura começa com 500 bactérias e dobra a cada hora.
> Depois de t horas: N = 500 · 2ᵗ. Em 5 horas: 500 · 32 = **16 000 bactérias**.

Exemplos que caem muito: juros compostos (fator 1 + i), população, decaimento radioativo (fator 1/2 a cada meia-vida), depreciação de um carro (fator 0,9 se perde 10% ao ano).

### Equações exponenciais

A jogada é **igualar as bases**: se 2ˣ = 2⁵, então x = 5.

> **Exemplo resolvido.** 9ˣ = 27
> 9 = 3² e 27 = 3³: (3²)ˣ = 3³ ⇒ 2x = 3 ⇒ **x = 3/2**.

### Logaritmo: a pergunta inversa

O logaritmo responde: **"a base elevada a quanto dá esse número?"**

**log_b(a) = x ⇔ bˣ = a**

- log₂ 8 = 3, porque 2³ = 8;
- log 1000 = 3 (base 10 quando não aparece), porque 10³ = 1000;
- log_b 1 = 0 e log_b b = 1, para qualquer base.

### Propriedades

- **Produto vira soma:** log(a · b) = log a + log b.
- **Divisão vira subtração:** log(a/b) = log a − log b.
- **Expoente desce multiplicando:** log(aⁿ) = n · log a.
- **Mudança de base:** log_b a = log a ÷ log b.

> **Exemplo resolvido.** Com log 2 ≈ 0,30 e log 3 ≈ 0,48, quanto vale log 12?
> 12 = 2² · 3: log 12 = 2 · 0,30 + 0,48 = **1,08**.

### Quando o tempo é a incógnita

Se a pergunta é "em quanto tempo?", o x está no expoente: aplique log dos dois lados.

> **Exemplo resolvido.** Em quantos anos um capital dobra a 10% ao ano? (log 2 ≈ 0,30; log 1,1 ≈ 0,041)
> 1,1ᵗ = 2 ⇒ t · log 1,1 = log 2 ⇒ t = 0,30 ÷ 0,041 ≈ **7,3 anos**.

### Escalas logarítmicas

Algumas medidas usam log porque os valores variam demais:

- **pH:** pH = −log[H⁺]. Cada ponto a menos é 10 vezes mais ácido.
- **Escala Richter:** cada grau a mais é cerca de 10 vezes mais amplitude no sismógrafo.
- **Decibéis:** cada 10 dB a mais é 10 vezes mais intensidade sonora.
