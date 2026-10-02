# 📚 Estudos — app de questões no estilo Duolingo

Aplicativo de celular (Android/iOS, também roda no navegador) para estudar todos os dias para
**ENEM**, **vestibulares militares** (ESA, EsPCEx, EEAR, AFA, Escola Naval, Colégio Naval) e
**concursos** (Banco do Brasil, Banco do Nordeste, Caixa, IBGE e outros).

Cada dia você faz lições curtas, ganha XP, mantém a ofensiva (🔥) e destrava níveis mais difíceis.

- **4.640 questões** em **86 tópicos** de **19 disciplinas**
- Todos os tópicos têm **50 a 60 questões**, divididas em **Fácil, Médio e Difícil**
- Todas as questões têm **gabarito e explicação**
- Índice completo: [`conteudos/README.md`](conteudos/README.md)

## O que tem no app

| Recurso | Como funciona |
|---|---|
| Trilhas | ENEM, Militares, Concursos ou Todas: o app mostra só as disciplinas da sua prova |
| Caminho por disciplina | Cada tópico tem 3 níveis. O Médio libera com 70% de acerto no Fácil, e o Difícil com 70% no Médio |
| Lição | 10 questões. As erradas voltam no fim da lição. Há combo de acertos, vibração e explicação após cada resposta |
| XP e níveis | Fácil vale 10 XP, Médio 15 e Difícil 20, com bônus de combo e de lição perfeita |
| Meta diária | 100, 200, 400 ou 600 XP por dia |
| Ofensiva 🔥 | Dias seguidos batendo a meta. Protetores de ofensiva podem ser comprados com 💎 |
| Desafio do dia | 10 questões misturadas da sua trilha, com bônus de +50 XP |
| Revisão | Refaz as questões que você errou |
| Conquistas | 16 medalhas e gráfico de XP da semana |
| Lembrete diário | Notificação local no horário que você escolher |

O progresso fica salvo no próprio celular (sem login e sem servidor).

## Disciplinas

| Área | Disciplinas |
|---|---|
| Matemática | Matemática (17 tópicos), Matemática Financeira |
| Ciências da Natureza | Física, Química, Biologia |
| Ciências Humanas | História, Geografia, Filosofia, Sociologia |
| Linguagens | Língua Portuguesa, Literatura, Inglês, Espanhol, Artes e Educação Física |
| Redação | Competências do ENEM, estrutura, coesão, argumentação e repertório |
| Concursos | Raciocínio Lógico, Conhecimentos Bancários, Informática, Ética e Administração Pública |

## Sobre as questões

Todas as questões são **inéditas**, escritas no estilo das bancas (INEP/ENEM, CESGRANRIO, CEBRASPE,
FGV, FCC e as provas militares). Cada uma traz a fonte "Questão inédita (estilo ...)". Não foram
copiadas questões de provas anteriores nem de bancos de questões, porque elas costumam ter direitos
autorais das bancas e dos sites que as organizam.

- **Questões de cálculo** (matemática, física, química, matemática financeira, lógica e cartografia)
  são **geradas por programa**, com o gabarito **calculado pelo próprio código**. Por isso, as contas
  sempre batem.
- **Questões teóricas** (humanas, linguagens, biologia, concursos) foram escritas à mão em Markdown.
  As alternativas são embaralhadas de forma equilibrada, para que o gabarito não se concentre em uma letra.

Se você quiser incluir questões reais de provas antigas (por exemplo, as do ENEM, que o INEP publica),
basta adicioná-las nos arquivos Markdown com a fonte correta (veja abaixo).

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
  <disciplina>/_disciplina.md   nome, área, emoji, cor e ordem da disciplina
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

   O campo `provas` aceita qualquer combinação de `ENEM`, `Militares` e `Concursos`. Uma questão pode
   ter sua própria fonte com a linha `**Fonte:** ENEM 2019, questão 140`, colocada depois da explicação.

2. Rode `npm run conteudo` dentro de `app/`. O compilador avisa se faltar resposta, explicação ou
   alternativa, ou se houver alternativas repetidas.
3. Não cite a letra da resposta na explicação (por exemplo, "a alternativa C"), porque o balanceador
   pode trocar as letras de lugar. Explique pelo conteúdo.
4. Os arquivos que começam com o comentário `Arquivo GERADO` vêm de `scripts/geradores/`. Para
   mudá-los, edite o gerador, e não o `.md`.
