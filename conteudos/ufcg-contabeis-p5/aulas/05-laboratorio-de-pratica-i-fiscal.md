### A rotina fiscal de um escritório

O setor fiscal tem uma rotina mensal:

1. Confere as notas de entrada e de saída.
2. Escritura as notas.
3. Apura os tributos.
4. Emite as guias.
5. Entrega as declarações.

Tudo isso é cruzado pelo fisco por meio do **SPED**. Erro em uma ponta aparece na outra.

### Documentos fiscais eletrônicos

- **NF-e (modelo 55):** mercadorias, principalmente entre empresas.
- **NFC-e (modelo 65):** varejo ao consumidor final.
- **NFS-e:** serviços. O padrão nacional é a base para o IBS e a CBS.
- **CT-e:** transporte.
- **XML × DANFE:** o XML assinado e autorizado é o documento; o **DANFE** é só a representação impressa. A **chave de acesso** tem 44 dígitos.
- **Campos importantes:**
  - **CFOP:** 1/2/3 nas entradas e 5/6/7 nas saídas (estado, outro estado, exterior). Ex.: 5.102, 6.102, 1.102.
  - **NCM:** 8 dígitos, define a alíquota do IPI na TIPI.
  - **CST/CSOSN:** a situação tributária; o CSOSN é do Simples.
- **Ajustes:**
  - **cancelamento** no prazo (em regra, 24 h);
  - **CC-e** só para erros que não mexem em valores, base, alíquota, quantidade, partes ou datas;
  - **inutilização** de números pulados;
  - **contingência** (EPEC, SVC) se a Sefaz estiver fora do ar.
- **Conferência das entradas:** consulte a chave no portal. Nota **cancelada** ou não autorizada não gera crédito.
- **Guarda:** conserve os XML até a prescrição.

### Fatura e duplicata

- **Fatura:** obrigatória nas vendas a prazo de 30 dias ou mais (Lei 5.474/1968). Na prática, a NF-e costuma ser nota fiscal-fatura.
- **Duplicata:** título de crédito extraído da fatura. Pode ser **escritural** (Lei 13.775/2018).

### Livros fiscais e EFD ICMS/IPI

- **Livros:** Registro de Entradas, de Saídas, de Apuração do ICMS, de Apuração do IPI, de Inventário (Bloco H) e de Controle da Produção e do Estoque (**Bloco K**).
- **CIAP (Bloco G):** controla o crédito de ICMS do ativo imobilizado, apropriado em **1/48 por mês**.

### Apuração do ICMS e do IPI

- **Cálculo:** débitos (saídas) − créditos (entradas) − saldo credor anterior.
- **Alíquotas interestaduais:**
  - **12%** (regra);
  - **7%** (de S/SE, exceto ES, para N/NE/CO/ES);
  - **4%** (importados).
- **DIFAL:** na venda a consumidor final não contribuinte de outro estado, o remetente recolhe a diferença entre a alíquota interna do destino e a interestadual.
- **Substituição tributária:** o substituto recolhe o ICMS próprio e o ICMS-ST (base com MVA); o substituído revende sem novo débito.
- **Crédito de fornecedor do Simples:** o comprador aproveita o percentual informado na nota.
- **Estorno de crédito:** obrigatório em caso de perda, furto ou deterioração da mercadoria.
- **Crédito correto:** só se aproveita o imposto devido; destaque a maior não gera crédito.

> **Exemplo resolvido.** Débitos de 18.000; créditos de 10.800 + 2.400; saldo credor de 1.000. ICMS a recolher = **3.800**.

> **Exemplo resolvido.** Indústria com vendas de 200.000 e insumos de 120.000. IPI 10% = **8.000**; ICMS 18% = **14.400**.

### Guias de recolhimento

- **DARF:** tributos federais (código de receita e período).
- **DAS:** Simples Nacional, gerado no PGDAS-D.
- **GNRE:** ICMS devido a outro estado (ST e DIFAL).
- **Guias estaduais (DAE) e municipais (ISS):** conforme cada ente. O ISS é devido, em regra, no local do prestador, com exceções como a construção civil, em que vale o local da obra.

### Obrigações acessórias federais (situação atual)

- **DIPJ** foi substituída pela **ECF** (IRPJ e CSLL, com e-Lalur e e-Lacs).
- **Dacon** foi substituído pela **EFD-Contribuições** (PIS/Cofins).
- **Livros contábeis em papel** foram substituídos pela **ECD** (Diário e Razão digitais).
- **GFIP/SEFIP e DIRF** foram substituídas por **eSocial** e **EFD-Reinf**.
- **DCTF:** os débitos agora são confessados na **DCTFWeb**, e o DARF é gerado a partir dela.
- **Retenções sobre serviços tomados:**
  - CSRF (PIS, Cofins e CSLL): **4,65%**;
  - INSS em cessão de mão de obra: **11%**;
  - IRRF: conforme o serviço.
- **Atraso na entrega** gera multa mesmo com o tributo pago, porque a obrigação acessória é autônoma.

> **Exemplo resolvido.** Serviço de limpeza de 10.000: CSRF de 465 e INSS de 1.100. Líquido a pagar = **8.435**.

### PER/DCOMP

- **Para que serve:** pedir restituição ou ressarcimento e **compensar** créditos federais com débitos próprios.
- **Atualização:** os créditos são atualizados pela Selic.
- **Efeito:** a compensação extingue o débito sob condição de homologação, que deve ocorrer em até 5 anos.

### Cruzamentos que mais geram problemas

- Notas emitidas contra o CNPJ que não foram escrituradas.
- Receitas da ECD diferentes das da EFD-Contribuições e da ECF.
- Créditos de ICMS sobre notas canceladas ou com alíquota errada.
- Retenções informadas pelo tomador e não declaradas pelo prestador, e o contrário.
