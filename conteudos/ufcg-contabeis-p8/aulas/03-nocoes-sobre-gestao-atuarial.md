### Para que serve este assunto

A atuária mede riscos que dependem de probabilidade e de tempo: quanto tempo as pessoas vão viver, com que frequência acontecem sinistros, quanto um fundo de pensão precisa ter hoje para pagar benefícios no futuro. O contador lida com esses números nas provisões de seguradoras e fundos de pensão, nos benefícios a empregados e na gestão de riscos. Esta aula apresenta as tábuas de mortalidade, o valor atual atuarial, a gestão previdenciária e de seguros, os riscos financeiros e a gestão de ativos e passivos.

### O que faz a atuária

A atuária mede riscos para que seguradoras, fundos de pensão e regimes de previdência cobrem o preço certo e guardem reservas suficientes. As bases são o **mutualismo** (muitos pagam pelas perdas de poucos) e a **lei dos grandes números** (com muitos riscos parecidos, o resultado fica previsível).

### Tábuas de mortalidade e valor atual

- **lₓ:** número de sobreviventes na idade x.
- **pₓ = lₓ₊₁ ÷ lₓ:** probabilidade de sobreviver um ano. **qₓ = 1 − pₓ:** probabilidade de morrer.
- **Sobrevivência por n anos** = lₓ₊ₙ ÷ lₓ.
- **Valor atual atuarial** = valor × probabilidade × vⁿ, com v = 1/(1 + i).
- **Risco de longevidade:** viver mais aumenta as obrigações dos planos. Por isso as tábuas devem ser atualizadas.

> **Exemplo resolvido.** l₆₀ = 100.000 e l₆₁ = 98.500, então p₆₀ = **0,985**. Pagamento de 10.000 se vivo em 1 ano, a 5%: VA = 10.000 × 0,985 ÷ 1,05 ≈ **9.381**.

> **Exemplo resolvido.** Seguro de morte de 100.000 por 1 ano, com q = 0,015 e 5%: prêmio puro ≈ **1.428,57**.

### Gestão previdenciária

**Regimes de financiamento:**

- **repartição simples** (RGPS): sensível ao envelhecimento da população;
- **capitalização:** exposta à rentabilidade dos investimentos.

**Tipos de plano:**

- **BD:** o benefício é prometido; o déficit é do plano e do patrocinador.
- **CD:** a contribuição é fixa; o benefício depende do saldo e o risco é do participante.
- **CV:** híbrido.

**Entidades:**

- **fechadas** (fundos de pensão), fiscalizadas pela **Previc**;
- **abertas** (bancos e seguradoras), fiscalizadas pela **Susep**.

**Provisões:** **PMBAC** (benefícios a conceder) e **PMBC** (benefícios concedidos).

**PGBL × VGBL:**

- **PGBL:** deduz até 12% da renda bruta tributável (declaração completa); o IR incide sobre o **total** no resgate.
- **VGBL:** o IR incide só sobre os **rendimentos**.
- **Tabelas de IR:** progressiva ou regressiva (de 35% a 10%).

**CPC 33:** o patrocinador de plano BD reconhece o passivo líquido (VP das obrigações − ativos do plano), com remensurações em ORA.

### Gestão de seguros

- **Prêmio puro** = frequência × severidade. **Prêmio comercial** = puro ÷ (1 − % de carregamentos).
- **Indicadores:** **sinistralidade** = sinistros ÷ prêmios ganhos; **índice combinado** = (sinistros + despesas) ÷ prêmios ganhos (acima de 100%, perda operacional).
- **Provisões técnicas:**
  - **PPNG:** prêmio não ganho, proporcional ao risco a decorrer;
  - **PSL:** sinistros avisados a pagar;
  - **IBNR:** ocorridos e não avisados.
  O **TAP** testa se as provisões são suficientes.
- **Transferência de risco:** **cosseguro** (seguradoras dividem o risco diretamente), **resseguro** (seguradora → resseguradora) e **retrocessão**.
- **Assimetria de informação:** **seleção adversa** (os mais arriscados procuram mais o seguro) e **risco moral** (descuido depois de contratar). Franquias, questionários e carências ajudam.
- **Contabilidade (CPC 50 / IFRS 17):** fluxos estimados + ajuste de risco + **margem contratual de serviço**, com o lucro reconhecido ao longo da cobertura.

> **Exemplo resolvido.** 1.000 apólices, frequência de 2% e sinistro médio de 20.000. Prêmio puro = **400**. Com carregamentos de 25%: comercial ≈ **533,33**.

> **Exemplo resolvido.** Prêmio anual de 12.000 emitido em 1º/10. Em 31/12, PPNG = **9.000**.

### Riscos financeiros

- **Mercado:** juros, câmbio, ações e commodities. **VaR** = valor × volatilidade × z. Complemente com testes de estresse.
- **Crédito:** perda esperada = **PD × LGD × EAD**. Diversificação reduz a concentração, mas não elimina o risco sistêmico.
- **Operacional:** processos, pessoas, sistemas e eventos externos. Controles: segregação de funções, acessos e planos de continuidade.
- **Liquidez:** conseguir pagar em dia sem vender ativos com grande desconto.
- **Gestão integrada:** os riscos se influenciam. É preciso governança, limites e monitoramento.

> **Exemplo resolvido.** Carteira de 1.000.000, volatilidade diária de 2% e 95% (z = 1,645): VaR = **32.900**.

> **Exemplo resolvido.** EAD de 1.000.000, PD de 2% e LGD de 40%: perda esperada = **8.000**.

### Gestão de ativos e passivos (ALM)

O ALM casa prazos, indexadores e liquidez dos investimentos com os compromissos. A **duration** mede a sensibilidade aos juros. Se as obrigações têm duration maior que os ativos, uma queda dos juros aumenta mais o passivo do que o ativo e piora a solvência.

### Erros mais comuns

- Confundir pₓ (probabilidade de sobreviver) com qₓ (de morrer); lembre que pₓ + qₓ = 1.
- Esquecer de descontar pelos juros ao calcular o valor atual atuarial.
- Confundir plano BD (risco do patrocinador) com CD (risco do participante).
- Confundir resseguro (seguradora transfere risco a outra) com cosseguro (seguradoras dividem o risco diretamente).
- Achar que o VaR mostra a perda máxima possível (ele mostra a perda que não deve ser superada com certa confiança).

### Teste-se

1. Com l₇₀ = 80.000 e l₇₁ = 77.600, quanto valem p₇₀ e q₇₀?
2. Quanto vale hoje um pagamento de R$ 10.000 daqui a 1 ano para quem tem 95% de chance de estar vivo, a juros de 5%?
3. Frequência de sinistros de 3% e sinistro médio de R$ 10.000. Qual o prêmio puro por apólice?
4. Em que tipo de plano o benefício é definido e o risco do déficit fica com o patrocinador?
5. EAD de R$ 500.000, PD de 4% e LGD de 50%. Qual a perda esperada?

> **Respostas.** 1) p₇₀ = 77.600 ÷ 80.000 = **0,97**; q₇₀ = **0,03**. 2) 10.000 × 0,95 ÷ 1,05 ≈ **R$ 9.047,62**. 3) 0,03 × 10.000 = **R$ 300**. 4) No **BD** (benefício definido). 5) 500.000 × 0,04 × 0,5 = **R$ 10.000**.

### Para lembrar

- Tábuas: lₓ, pₓ = lₓ₊₁ ÷ lₓ, qₓ = 1 − pₓ; risco de longevidade.
- Valor atual atuarial = valor × probabilidade × vⁿ.
- Regimes: repartição × capitalização; planos BD, CD, CV; entidades fechadas (Previc) e abertas (Susep); PGBL e VGBL.
- Seguros: prêmio puro = frequência × severidade; comercial com carregamento; sinistralidade; provisões técnicas (PPNG...); cosseguro, resseguro; seleção adversa e risco moral; CPC 50.
- Riscos: mercado (VaR), crédito (PD × LGD × EAD), operacional, liquidez.
- ALM: casar prazos e indexadores dos ativos com os dos passivos.
