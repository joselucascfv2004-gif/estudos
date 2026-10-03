# 📚 Estudos — app de questões no estilo Duolingo

Aplicativo de celular (Android/iOS, também roda no navegador) para estudar todos os dias para
**ENEM**, **vestibulares militares** (ESA, EsPCEx, EEAR, AFA, Escola Naval, Colégio Naval) e
**concursos** (Banco do Brasil, Banco do Nordeste, Caixa, IBGE e outros).

Cada dia você faz lições curtas, ganha XP, mantém a ofensiva (🔥) e destrava níveis mais difíceis.

- **4.900 questões** em **122 tópicos** de **20 disciplinas**
- **987 questões oficiais do ENEM** (provas de 2014 a 2023, exceto 2021, publicadas pelo INEP), com o gabarito
  oficial, classificadas por assunto: elas aparecem também dentro de cada tópico (por exemplo, "Funções")
- As questões de cálculo não repetem enunciado: cada modelo gera uma questão diferente, e a explicação
  diz qual **ferramenta** da matemática resolve o problema e por quê
- Os tópicos inéditos têm **50 a 60 questões**, divididas em **Fácil, Médio e Difícil**
- Todas as questões têm **gabarito e explicação**, e todo tópico tem um **resumo teórico**
- Índice completo: [`conteudos/README.md`](conteudos/README.md)

## O que tem no app

| Recurso | Como funciona |
|---|---|
| Prova-alvo | ENEM, ESA, EsPCEx, EEAR, AFA, Escola Naval, Colégio Naval, Banco do Brasil, Caixa, BNB, IBGE ou Todas: o app mostra só as matérias que caem na sua prova |
| Prazo | Escolha em quanto tempo quer estar pronto (1, 2, 3 ou 6 meses, ou a data da prova). O plano prioriza os assuntos que mais caem |
| Caminho por disciplina | Cada tópico tem 3 níveis. O Médio libera com 70% de acerto no Fácil, e o Difícil com 70% no Médio |
| Lição | 10 questões. As erradas voltam no fim da lição. Há combo de acertos, vibração e explicação após cada resposta |
| XP e níveis | Fácil vale 10 XP, Médio 15 e Difícil 20, com bônus de combo e de lição perfeita |
| Meta diária | 100, 200, 400 ou 600 XP por dia |
| Ofensiva 🔥 | Dias seguidos batendo a meta. Protetores de ofensiva podem ser comprados com 💎 |
| Desafio do dia | 10 questões misturadas da sua prova-alvo, com bônus de +50 XP |
| Revisão espaçada | Toda questão respondida volta para revisão com o passar do tempo. Quem acerta volta cada vez mais tarde (1, 3, 7, 15, 30 e 60 dias), e quem erra volta no mesmo dia |
| Pontos fracos | O app calcula o seu acerto nas últimas 20 questões de cada assunto. Abaixo de 70% (com pelo menos 6 respondidas), o assunto vira ponto fraco, aparece na tela inicial e ganha um treino focado nos seus erros |
| Plano de estudos | Informe a data e o nome da sua prova no Perfil. A tela inicial mostra a contagem regressiva e o plano do dia (revisões, ponto fraco e assuntos novos), calculado para passar por todos os assuntos antes da prova |
| Simulado | Prova com cronômetro (3 min por questão), navegação entre as questões e gabarito só no final, com correção, acerto por disciplina e histórico |
| Resumos | Cada assunto tem um "resumo em 2 minutos" com a teoria principal, aberto pelo caminho da disciplina |
| Questões salvas | ⭐ Salve questões e escreva anotações durante as lições; depois revise ou pratique só elas |
| Progresso | Gráfico do acerto por semana, acerto por disciplina comparado com o mês anterior, XP da semana e 17 conquistas |
| Modo escuro | Ativado no Perfil |
| Lembrete diário | Notificação local no horário que você escolher |

O progresso fica salvo no próprio celular (sem login e sem servidor).

## Disciplinas

| Área | Disciplinas |
|---|---|
| Provas anteriores | ENEM — provas oficiais (2014 a 2023, exceto 2021: Matemática, Natureza, Humanas e Linguagens) |
| Matemática | Matemática (17 tópicos), Matemática Financeira |
| Ciências da Natureza | Física, Química, Biologia |
| Ciências Humanas | História, Geografia, Filosofia, Sociologia |
| Linguagens | Língua Portuguesa, Literatura, Inglês, Espanhol, Artes e Educação Física |
| Redação | Competências do ENEM, estrutura, coesão, argumentação e repertório |
| Concursos | Raciocínio Lógico, Conhecimentos Bancários, Informática, Ética e Administração Pública |

## Sobre as questões

- **Questões inéditas:** a maior parte foi escrita no estilo das bancas (INEP/ENEM, CESGRANRIO,
  CEBRASPE, FGV, FCC e provas militares) e traz a fonte "Questão inédita (estilo ...)". Não foram
  copiadas questões de bancos de questões de terceiros.
  - **Questões de cálculo** (matemática, física, química, matemática financeira, lógica e cartografia)
    são **geradas por programa**, com o gabarito **calculado pelo próprio código**. Por isso, as contas
    sempre batem.
  - **Questões teóricas** (humanas, linguagens, biologia, concursos) foram escritas à mão em Markdown.
    As alternativas são embaralhadas de forma equilibrada, para que o gabarito não se concentre em uma
    letra.
- **Questões oficiais do ENEM:** a pasta `conteudos/enem-oficial/` traz questões das provas de 2014 a
  2023 (menos 2021) publicadas pelo INEP, com o texto, a ordem das alternativas e o gabarito oficiais. Cada
  uma traz a fonte (dia, caderno e número da questão) e a linha `**Assunto:**`, que a coloca também
  dentro do tópico certo do conteúdo. Foram incluídas só as questões que podem ser resolvidas sem
  figuras, gráficos ou mapas (quadros com números foram escritos em texto). As explicações foram
  escritas para o app. A prova de 2021 não entrou porque o PDF do INEP não permite extrair o texto.

## Como instalar no celular

O app ainda não está na Play Store nem na App Store. Há duas formas de colocá-lo no celular.
As duas exigem um computador (Windows, Mac ou Linux) só para a preparação.

### Preparação no computador (uma vez só)

1. Instale o **Node.js** (versão "LTS") em <https://nodejs.org>.
2. Baixe este repositório: no GitHub, escolha a branch com o código no seletor de branches,
   clique em **Code → Download ZIP** e descompacte a pasta.
3. Abra um terminal dentro da pasta `app` (no Windows: abra a pasta `app`, clique na barra de
   endereço, digite `cmd` e aperte Enter) e rode:

   ```bash
   npm install
   ```

### Opção 1 — Instalar de verdade no Android (APK)

O app fica instalado como qualquer outro e funciona sem o computador.

1. Crie uma conta gratuita em <https://expo.dev/signup>.
2. No terminal, dentro da pasta `app`, rode:

   ```bash
   npx eas-cli login
   npx eas-cli build -p android --profile preview
   ```

   Responda **Y** (sim) às perguntas. O app é montado nos servidores da Expo, o que costuma
   levar de 10 a 30 minutos no plano gratuito.
3. No fim aparece um **link e um QR Code**. Abra no celular Android, baixe o arquivo `.apk` e toque
   nele para instalar. Se o Android pedir, permita "instalar apps de fontes desconhecidas" para o
   navegador.

No iPhone, a instalação permanente exige uma conta paga de desenvolvedor da Apple. Por isso, no
iPhone use a Opção 2.

### Opção 2 — Testar pelo Expo Go (Android e iPhone)

É mais rápido, mas o app só abre enquanto o computador estiver ligado com o comando rodando.

1. Instale o app **Expo Go** no celular (Play Store / App Store).
2. No terminal, dentro da pasta `app`, rode:

   ```bash
   npx expo start
   ```

3. Escaneie o QR Code que aparece: no Android, pelo próprio Expo Go; no iPhone, pela câmera.
   O celular e o computador precisam estar na **mesma rede Wi-Fi**.

### Atualizações automáticas

O app usa o **EAS Update** (gratuito no plano free da Expo). Depois que você instala um APK gerado a
partir desta versão, as mudanças de questões e telas chegam sozinhas: o app baixa a novidade ao abrir
e passa a usá-la na próxima vez que for aberto. Para publicar uma atualização (dentro de `app/`):

```bash
npm run atualizar-app
```

Só é preciso gerar e instalar um APK novo quando houver mudança nativa (pacotes nativos ou
configurações do `app.json`).

### Outros comandos (dentro de `app/`)

```bash
npm run web          # abre no navegador
npm run typecheck    # checa os tipos TypeScript
npm run conteudo     # regenera e recompila o banco de questões
npm run atualizar-app  # publica a atualização para os celulares
npm run export:web   # gera a versão web estática em dist/
```

## Estrutura do repositório

```
conteudos/                 questões em Markdown, uma pasta por disciplina
  <disciplina>/_disciplina.md   nome, área, ícone, cor e ordem da disciplina
  <disciplina>/NN-topico.md     um tópico com as seções Fácil, Médio e Difícil
  README.md                índice gerado automaticamente
scripts/
  geradores/               geradores das questões de cálculo
  gerar-questoes.mjs       gera os .md dos tópicos calculáveis
  balancear-gabaritos.mjs  distribui as letras do gabarito (A–E) nos arquivos escritos à mão
  compilar-conteudos.mjs   valida tudo e gera app/src/data/banco.json
app/                       aplicativo Expo (React Native + expo-router)
  src/app/                 telas (abas, disciplina, lição, boas-vindas)
  src/estado/              progresso, XP, ofensiva, conquistas, lembretes
  src/data/banco.json      banco de questões compilado (não edite à mão)
```

## Como adicionar ou editar questões

1. Abra (ou crie) um arquivo em `conteudos/<disciplina>/`. Para criar um tópico novo, copie o
   cabeçalho de um existente:

   ```markdown
   ---
   titulo: Nome do tópico
   provas: ENEM, Militares, Concursos
   descricao: O que o tópico cobre.
   fonte: Questão inédita (estilo ENEM)
   ---

   # Nome do tópico

   ## Fácil

   ### 1
   Enunciado da questão (pode ter várias linhas; linhas com "> " viram citação).

   - A) primeira alternativa
   - B) segunda alternativa
   - C) terceira alternativa
   - D) quarta alternativa
   - E) quinta alternativa

   **Resposta:** C

   **Explicação:** Por que a C está certa.

   ## Médio
   ...

   ## Difícil
   ...
   ```

   Antes de `## Fácil`, coloque uma seção `## Resumo` com a teoria do tópico (listas com `- ` e
   negrito com `**...**`). Ela aparece no app no botão "Ler o resumo".

   O campo `provas` aceita qualquer combinação de `ENEM`, `Militares` e `Concursos`. Uma questão pode
   ter sua própria fonte com a linha `**Fonte:** ENEM 2019, questão 140`, colocada depois da explicação.
   Questões oficiais podem ter também `**Assunto:** matematica/funcoes-afim-e-quadratica` (uma ou mais
   separadas por vírgula): a questão passa a aparecer também nesse tópico.

2. Rode `npm run conteudo` dentro de `app/`. O compilador avisa se faltar resposta, explicação ou
   alternativa, ou se houver alternativas repetidas.
3. Não cite a letra da resposta na explicação (por exemplo, "a alternativa C"), porque o balanceador
   pode trocar as letras de lugar. Explique pelo conteúdo.
4. Em questões de provas oficiais, coloque `ordem: original` no cabeçalho do arquivo para manter
   as letras das alternativas como na prova (o balanceador não mexe nesses arquivos).
5. Os arquivos que começam com o comentário `Arquivo GERADO` vêm de `scripts/geradores/`. Para
   mudá-los, edite o gerador, e não o `.md`.
