### Ímãs e campo magnético

Todo ímã tem dois polos, **norte** e **sul**. Polos iguais se repelem; diferentes se atraem. Se você cortar um ímã ao meio, ganha **dois ímãs completos**: não existe polo isolado.

Em volta do ímã existe um **campo magnético** B (unidade: tesla, T). As linhas de campo saem do norte e entram no sul.

A Terra é um grande ímã. O polo norte da bússola aponta para o norte geográfico porque ali fica o **polo sul magnético** da Terra.

### Corrente elétrica cria campo

Em 1820, Oersted viu uma bússola se mexer perto de um fio com corrente: **carga em movimento cria campo magnético**.

- **Fio reto e longo:** linhas circulares em volta do fio (regra da mão direita: polegar na corrente, dedos dão o sentido). B = μ₀·i/(2π·d), com μ₀ = 4π · 10⁻⁷ T·m/A. Ou seja, **B = 2 · 10⁻⁷ · i/d**.
- **Centro de uma espira:** B = μ₀·i/(2R).
- **Solenoide (bobina comprida):** campo uniforme dentro, B = μ₀·n·i, onde n é o número de espiras por metro. Com núcleo de ferro, vira um **eletroímã** muito mais forte.

> **Exemplo resolvido.** A 5 cm de um fio com 10 A:
> B = 2 · 10⁻⁷ · 10 ÷ 0,05 = **4 · 10⁻⁵ T** (perto do valor do campo da Terra).

### Força magnética

Uma carga q que se move com velocidade v num campo B sofre:

**F = q · v · B · sen θ**

- Carga **parada** ou movendo-se **paralela** ao campo: força zero.
- A força é sempre **perpendicular** à velocidade: muda a direção, não o valor da velocidade. Por isso não realiza trabalho.
- Velocidade perpendicular ao campo: **movimento circular**, com raio R = m·v/(q·B).

> **Exemplo resolvido.** Um próton a 10⁶ m/s num campo de 0,5 T:
> R = 1,6 · 10⁻²⁷ · 10⁶ ÷ (1,6 · 10⁻¹⁹ · 0,5) = 0,02 m = **2 cm**.

Num **fio** com corrente: **F = B · i · L · sen θ**. Dois fios paralelos com correntes de mesmo sentido se **atraem**; de sentidos opostos se repelem. Uma espira com corrente num campo sofre forças opostas nos lados, que a fazem girar: é o **motor elétrico**.

### Indução eletromagnética

O caminho de volta: campo magnético **variando** cria corrente. O que importa é o **fluxo magnético**, a quantidade de linhas que atravessa uma espira:

**Φ = B · A · cos θ** (unidade: weber, Wb)

**Lei de Faraday:** a tensão induzida é a rapidez com que o fluxo varia.

**ε = N · ΔΦ / Δt**

- Ímã parado dentro da bobina: fluxo constante, **nenhuma corrente**.
- Barra deslizando sobre trilhos: ε = B · L · v.

> **Exemplo resolvido.** Uma bobina de 100 espiras tem o fluxo em cada espira variando 0,05 Wb em 0,25 s.
> ε = 100 · 0,05 ÷ 0,25 = **20 V**.

**Lei de Lenz:** a corrente induzida cria um campo que **se opõe** à variação. Aproximar o polo norte de uma bobina cria nela um polo norte, que repele o ímã. É a conservação de energia: gerar corrente exige esforço. Pelo mesmo motivo, um ímã cai devagar dentro de um tubo de cobre.

### Geradores e transformadores

- **Gerador:** uma turbina gira bobinas num campo (ou ímãs perto de bobinas). O fluxo varia o tempo todo e surge tensão **alternada**. É assim nas usinas hidrelétricas, eólicas e térmicas.
- **Transformador:** duas bobinas no mesmo núcleo de ferro. A tensão acompanha o número de espiras: **U_s/U_p = N_s/N_p**. Num transformador ideal a potência se mantém: U_p · i_p = U_s · i_s. Só funciona com corrente **alternada**.

> **Exemplo resolvido.** Primário com 1 000 espiras em 220 V; secundário com 50 espiras.
> U_s = 220 · 50 ÷ 1 000 = **11 V**.

A energia viaja das usinas em tensões altíssimas porque, para a mesma potência, a corrente fica menor, e a perda nos fios (R · i²) cai com o **quadrado** da corrente.
