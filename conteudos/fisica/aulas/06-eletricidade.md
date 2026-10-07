### Para que serve este assunto

Chuveiro, geladeira, carregador de celular, disjuntores, a conta de luz: tudo isso é eletricidade. Entender corrente, tensão, resistência e potência permite saber por que o chuveiro esquenta mais no "inverno", por que não se deve ligar muitos aparelhos na mesma tomada, por que uma lâmpada de 127 V queima em 220 V e quanto um aparelho pesa na conta. É um dos assuntos de física mais cobrados no ENEM, sempre com situações domésticas.

### Corrente, tensão e resistência

- **Corrente elétrica (i):** é o fluxo de cargas (elétrons, nos metais) por um condutor. Mede-se em **ampères (A)**: i = Q ÷ Δt (carga por tempo).
- **Tensão ou diferença de potencial (U):** é o "empurrão" que faz as cargas andarem, a energia fornecida por unidade de carga. Mede-se em **volts (V)**. As tomadas brasileiras têm 127 V ou 220 V, conforme a região.
- **Resistência (R):** é a dificuldade que um material oferece à passagem da corrente. Mede-se em **ohms (Ω)**.

Uma comparação útil é com a água num cano: a tensão é a diferença de pressão, a corrente é a vazão e a resistência é o "aperto" do cano.

### Lei de Ohm

Para muitos condutores (os resistores ôhmicos):

**U = R · i**

> **Exemplo resolvido.** Um aparelho de resistência 22 Ω é ligado em 220 V. Qual a corrente?
> i = 220 ÷ 22 = **10 A**.

**De que depende a resistência de um fio (2ª lei de Ohm):** R = ρ · L ÷ A, em que ρ é a resistividade do material, L o comprimento e A a área da seção (a "grossura").

- Fio **mais longo**: mais resistência.
- Fio **mais grosso**: menos resistência. Por isso o chuveiro, que puxa muita corrente, precisa de fios grossos; fios finos esquentam demais e podem pegar fogo.
- Cobre e alumínio têm baixa resistividade (bons condutores).

### Potência elétrica

É a energia transformada por segundo. Fórmulas equivalentes:

**P = U · i = R · i² = U² ÷ R**

> **Exemplo resolvido.** Um chuveiro de 5 500 W funciona em 220 V. Qual a corrente e a resistência?
> i = 5 500 ÷ 220 = **25 A**. R = U² ÷ P = 48 400 ÷ 5 500 = **8,8 Ω**.

**Chuveiro: verão × inverno.** Com a tensão fixa, P = U² ÷ R: **menor resistência, maior potência**. Na posição "inverno", a chave liga um trecho **menor** da resistência, que esquenta mais a água. Na posição "verão", usa o trecho maior.

**Ligar na tensão errada.** Uma lâmpada feita para 127 V, ligada em 220 V, recebe uma potência cerca de 3 vezes maior (220² ÷ 127² ≈ 3) e queima. Ao contrário, um aparelho de 220 V ligado em 127 V funciona com cerca de 1/3 da potência (fica fraco).

**Efeito Joule.** A passagem de corrente por um resistor o aquece. É o princípio de chuveiros, ferros de passar, torradeiras e fusíveis.

### Energia consumida e a conta de luz

**Energia = potência × tempo.** A conta usa o **kWh**: potência em kW vezes tempo em horas.

> **Exemplo resolvido.** Um ferro de passar de 1 000 W é usado 2 horas por dia durante 30 dias. Quanto consome? E quanto custa, a R$ 0,80 o kWh?
> 1 kW · 2 h · 30 = **60 kWh**. Custo: 60 · 0,80 = **R$ 48**.

Aparelhos que produzem calor (chuveiro, ferro, forno elétrico) são os que mais gastam. Aparelhos em "modo de espera" (standby) também consomem um pouco o tempo todo.

### Associação de resistores

**Em série** (um depois do outro, num caminho único):

- a **corrente é a mesma** em todos;
- as tensões se somam;
- **Req = R₁ + R₂ + ...** (a resistência total aumenta);
- se um queima, o circuito todo se abre (como pisca-piscas antigos).

> **Exemplo resolvido.** Resistores de 2 Ω, 3 Ω e 5 Ω em série numa bateria de 20 V. Qual a corrente e a tensão em cada um?
> Req = 10 Ω; i = 20 ÷ 10 = **2 A**. Tensões: 2 · 2 = **4 V**, 2 · 3 = **6 V** e 2 · 5 = **10 V** (somam 20 V).

**Em paralelo** (lado a lado, ligados aos mesmos dois pontos):

- a **tensão é a mesma** em todos;
- as correntes se somam;
- **1/Req = 1/R₁ + 1/R₂ + ...** (a resistência total **diminui**, ficando menor que a menor delas);
- atalhos: dois resistores → Req = (R₁ · R₂) ÷ (R₁ + R₂); n resistores iguais a R → R ÷ n;
- se um aparelho desliga, os outros continuam funcionando.

> **Exemplo resolvido.** Resistores de 6 Ω e 3 Ω em paralelo, ligados a 12 V. Qual a resistência equivalente e as correntes?
> Req = 18 ÷ 9 = **2 Ω**. Correntes: 12 ÷ 6 = **2 A** e 12 ÷ 3 = **4 A**. Total: **6 A** (= 12 ÷ 2).

**As casas são ligadas em paralelo.** Cada aparelho recebe a tensão total da rede e funciona de forma independente. Mas cada aparelho ligado **soma** corrente no circuito.

### Segurança: disjuntores, curto-circuito e choque

- **Disjuntores e fusíveis** desligam o circuito quando a corrente passa do limite, evitando que os fios esquentem e causem incêndio.

> **Exemplo resolvido.** Num circuito de 127 V protegido por um disjuntor de 20 A, ligam-se um forno de 1 500 W e um micro-ondas de 1 200 W. O disjuntor desarma?
> Corrente total: 2 700 ÷ 127 ≈ 21,3 A > 20 A. **Sim, desarma.** Por isso o famoso "T" com muitos aparelhos é perigoso.

- **Curto-circuito:** ligação de resistência quase zero entre os fios; a corrente dispara.
- **Choque elétrico:** o perigo vem da **corrente** que atravessa o corpo. A pele molhada tem resistência menor, por isso é muito mais perigoso mexer em aparelhos com as mãos molhadas. O **fio terra** desvia correntes de fuga para o chão.
- Pássaros pousados num único fio não levam choque porque não há diferença de potencial entre as patas.

### Medidores e geradores

- **Amperímetro** mede corrente e é ligado **em série**; **voltímetro** mede tensão e é ligado **em paralelo**.
- **Gerador** (pilha, bateria) fornece uma força eletromotriz ε, mas tem uma resistência interna r: a tensão útil é **U = ε − r · i**. Por isso a tensão de uma pilha cai quando ela fornece muita corrente.

### Erros mais comuns

- Achar que maior resistência significa mais potência (com tensão fixa, é o contrário).
- Somar resistências em paralelo como se estivessem em série.
- Achar que a corrente "se gasta" ao passar por uma lâmpada em série: ela é a mesma em todo o caminho.
- Usar minutos em vez de horas no cálculo de kWh.
- Confundir potência (W) com energia (kWh).

### Como cai na prova

O ENEM traz chuveiros (verão e inverno), tensão errada em aparelhos, disjuntores e "benjamins", consumo e economia de energia, lâmpadas em série e em paralelo, choques e fios terra. Provas militares cobram circuitos com associações mistas, geradores com resistência interna, amperímetros e voltímetros.

### Teste-se

1. Um resistor de 10 Ω é percorrido por 2 A. Qual a tensão?
2. Qual a potência de um aparelho que, em 127 V, puxa 5 A?
3. Qual a resistência equivalente de 4 Ω e 6 Ω em série?
4. E de dois resistores de 10 Ω em paralelo?
5. Quantos kWh gasta um ferro de 1 000 W usado 2 horas por dia durante 30 dias?

> **Respostas.** 1) **20 V**. 2) 127 · 5 = **635 W**. 3) **10 Ω**. 4) 10 ÷ 2 = **5 Ω**. 5) **60 kWh**.

### Para lembrar

- U = R · i; R = ρL/A (fio longo, mais R; fio grosso, menos R).
- P = U·i = R·i² = U²/R; com tensão fixa, menor R → maior potência.
- Energia (kWh) = P (kW) × t (h).
- Série: mesma corrente, Req = soma. Paralelo: mesma tensão, Req menor que a menor.
- Casas são ligadas em paralelo; disjuntor protege contra excesso de corrente.
