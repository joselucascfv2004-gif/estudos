### Para que serve este assunto

Esta aula reúne as **contas** da físico-química que mais caem: pH e pOH (acidez de alimentos, do sangue, do solo, da chuva), lei de Hess e entalpias (energia dos combustíveis), velocidade das reações, constantes de equilíbrio, meia-vida radioativa e ddp de pilhas. A teoria está na aula de físico-química; aqui o foco é **calcular com segurança**.

### pH: a escala de acidez

O pH indica a concentração de íons H⁺ numa solução aquosa:

**pH = −log [H⁺]**

Na prática, se [H⁺] = 10⁻ˣ mol/L, então **pH = x**.

- **pH < 7:** ácido. **pH = 7:** neutro (água pura, a 25 °C). **pH > 7:** básico (alcalino).
- Existe também o **pOH = −log [OH⁻]**, e a 25 °C vale **pH + pOH = 14** (porque [H⁺] · [OH⁻] = 10⁻¹⁴, o produto iônico da água, Kw).

> **Exemplo resolvido.** Qual o pH de uma solução com [H⁺] = 10⁻³ mol/L? E de outra com [OH⁻] = 10⁻⁴ mol/L?
> Primeira: **pH = 3** (ácida). Segunda: pOH = 4, então pH = 14 − 4 = **10** (básica).

> **Exemplo resolvido.** Qual o pH de uma solução 0,001 mol/L de HCl (ácido forte, totalmente ionizado)? E de uma solução 0,01 mol/L de NaOH?
> HCl: [H⁺] = 10⁻³ → **pH = 3**. NaOH: [OH⁻] = 10⁻² → pOH = 2 → **pH = 12**.

**A escala é logarítmica.** Cada unidade de pH a menos significa **10 vezes mais** H⁺:

- pH 3 é **10 vezes** mais ácido que pH 4 e **100 vezes** mais ácido que pH 5.
- Diluir 10 vezes uma solução de ácido forte aumenta o pH em 1 unidade (de 2 para 3, por exemplo).

Valores de referência: suco gástrico ≈ 1 a 2; limão ≈ 2; refrigerante ≈ 3; chuva normal ≈ 5,6 (por causa do CO₂ dissolvido); **chuva ácida < 5,6**; sangue ≈ 7,4; água do mar ≈ 8; leite de magnésia ≈ 10; água sanitária ≈ 12.

**Indicadores** mudam de cor conforme o pH: a fenolftaleína fica rosa em meio básico e incolor em meio ácido; o papel de tornassol fica vermelho em ácido e azul em básico; o extrato de repolho roxo muda de vermelho a verde-amarelado.

### Termoquímica e lei de Hess

**Lei de Hess:** a variação de entalpia de uma reação **só depende do estado inicial e do final**, não do caminho. Por isso dá para calcular o ΔH de uma reação somando outras.

Regras para manipular as equações:

- **inverter** a equação → **troca o sinal** do ΔH;
- **multiplicar** a equação por um número → multiplica o ΔH pelo mesmo número;
- **somar** as equações → somam-se os ΔH.

> **Exemplo resolvido.** Calcule o ΔH de C + ½ O₂ → CO, sabendo que:
> (1) C + O₂ → CO₂, ΔH = −394 kJ;
> (2) CO + ½ O₂ → CO₂, ΔH = −283 kJ.
> Mantenha (1) e **inverta** (2): CO₂ → CO + ½ O₂, ΔH = +283 kJ. Somando, o CO₂ se cancela e sobra C + ½ O₂ → CO.
> ΔH = −394 + 283 = **−111 kJ**.

**Pelas entalpias de formação.** A entalpia de formação (ΔHf) é o calor envolvido na formação de 1 mol da substância a partir dos elementos no estado padrão (os elementos puros mais estáveis, como O₂ e C grafite, têm ΔHf = 0):

**ΔH = Σ ΔHf (produtos) − Σ ΔHf (reagentes)**

> **Exemplo resolvido.** Calcule o ΔH da combustão do metano, CH₄ + 2 O₂ → CO₂ + 2 H₂O(l), com ΔHf: CH₄ = −75, CO₂ = −394 e H₂O(l) = −286 kJ/mol.
> Produtos: −394 + 2 · (−286) = −966. Reagentes: −75 + 0 = −75.
> ΔH = −966 − (−75) = **−891 kJ/mol** (exotérmica, como esperado).

**Pelas energias de ligação.** Quebrar ligações **absorve** energia; formar ligações **libera**:

**ΔH = Σ energia das ligações quebradas − Σ energia das ligações formadas**

> **Exemplo resolvido.** H₂ + Cl₂ → 2 HCl. Energias de ligação (kJ/mol): H–H = 436, Cl–Cl = 243, H–Cl = 432.
> Quebradas: 436 + 243 = 679. Formadas: 2 · 432 = 864. ΔH = 679 − 864 = **−185 kJ**.

### Velocidade das reações

**Velocidade média** = variação da concentração (ou da quantidade) ÷ tempo.

> **Exemplo resolvido.** A concentração de um reagente cai de 0,8 mol/L para 0,2 mol/L em 3 minutos. Qual a velocidade média de consumo?
> (0,8 − 0,2) ÷ 3 = **0,2 mol/(L · min)**.

Para uma reação aA + bB → produtos, as velocidades de cada substância são proporcionais aos coeficientes.

**Lei da velocidade:** v = k · [A]ᵐ · [B]ⁿ, em que os expoentes (ordens) são determinados experimentalmente (só coincidem com os coeficientes em reações elementares). Se v = k[A]², **dobrar** [A] **quadruplica** a velocidade; se v = k[A], dobra.

### Constante de equilíbrio

**Kc = [produtos]^coeficientes ÷ [reagentes]^coeficientes**, só com gases e solutos (sólidos e líquidos puros não entram).

- **Kc > 1:** no equilíbrio predominam os produtos. **Kc < 1:** predominam os reagentes.
- Kc só muda com a **temperatura**.
- Para ácidos fracos, a constante de ionização (Ka) mede a força: quanto **maior o Ka, mais forte** o ácido.

> **Exemplo resolvido.** Para A + B ⇌ C, no equilíbrio [A] = 0,2, [B] = 0,5 e [C] = 1 mol/L. Qual o Kc?
> Kc = 1 ÷ (0,2 · 0,5) = **10**.

### Meia-vida

Depois de cada meia-vida, a quantidade de material radioativo cai **pela metade**: m = m₀ ÷ 2ⁿ, em que n é o número de meias-vidas.

> **Exemplo resolvido.** O iodo-131, usado em exames e tratamentos da tireoide, tem meia-vida de cerca de 8 dias. De 32 mg, quanto resta após 32 dias?
> 32 dias = 4 meias-vidas: 32 → 16 → 8 → 4 → **2 mg** (32 ÷ 2⁴).

### Pilhas: qual polo é qual e a ddp

Use os **potenciais de redução** (E°). Quem tem o **maior** potencial de redução **se reduz** (é o **cátodo**); o outro **se oxida** (é o **ânodo**).

**ddp = E°(cátodo) − E°(ânodo)** = E°(maior) − E°(menor)

> **Exemplo resolvido.** Pilha de zinco (E° = −0,76 V) e cobre (E° = +0,34 V). Quem é o cátodo e qual a ddp?
> O cobre tem o maior potencial: é o **cátodo** (Cu²⁺ se reduz e o cobre se deposita). O zinco é o **ânodo** (se oxida e se desgasta).
> ddp = 0,34 − (−0,76) = **1,10 V**.

> **Exemplo resolvido.** E numa pilha de prata (E° = +0,80 V) e cobre (+0,34 V)?
> A prata é o cátodo. ddp = 0,80 − 0,34 = **0,46 V**.

### Erros mais comuns

- Achar que pH 3 é "um pouco" mais ácido que pH 4 (é 10 vezes mais).
- Esquecer que pH + pOH = 14 (a 25 °C) e responder o pOH quando se pedia o pH.
- Na lei de Hess, inverter a equação e esquecer de trocar o sinal do ΔH (ou multiplicar a equação e esquecer o ΔH).
- Na energia de ligação, fazer "formadas − quebradas" (o certo é quebradas − formadas).
- Usar potencial de oxidação no lugar do de redução ao calcular a ddp.

### Como cai na prova

O ENEM pede pH de alimentos, chuva, solos e do corpo humano, comparações "quantas vezes mais ácido", correção de pH (calagem do solo), comparação de combustíveis por entalpia, cálculos de meia-vida em medicina nuclear e datação, e ddp de pilhas. Provas militares cobram lei de Hess com várias etapas, energia de ligação, Kc, Ka e leis de velocidade.

### Teste-se

1. Qual o pH de uma solução com [H⁺] = 10⁻⁵ mol/L?
2. Quantas vezes uma solução de pH 3 é mais ácida que uma de pH 5?
3. Qual o pOH de uma solução de pH 9?
4. Uma reação tem ΔH = +100 kJ. Qual o ΔH da reação inversa?
5. Numa pilha, o cátodo tem E° = +0,80 V e o ânodo, −0,76 V. Qual a ddp?

> **Respostas.** 1) **pH = 5**. 2) **100 vezes**. 3) 14 − 9 = **5**. 4) **−100 kJ**. 5) 0,80 − (−0,76) = **1,56 V**.

### Para lembrar

- pH = −log[H⁺]; pH + pOH = 14; cada unidade de pH = fator 10.
- Hess: inverteu, troca o sinal; multiplicou, multiplica o ΔH; some as etapas.
- ΔH = ΣHf(produtos) − ΣHf(reagentes) = Σ ligações quebradas − Σ ligações formadas.
- Velocidade média = Δconcentração ÷ Δtempo.
- Kc = produtos ÷ reagentes (com expoentes); só muda com a temperatura.
- Meia-vida: m = m₀ ÷ 2ⁿ. Pilha: ddp = E°(cátodo) − E°(ânodo).
