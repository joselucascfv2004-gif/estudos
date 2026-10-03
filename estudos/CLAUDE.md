# Instruções do projeto Estudos

App estilo Duolingo para estudar para ENEM, vestibulares militares e concursos
(Banco do Brasil, BNB, Caixa, IBGE). Leia o `README.md` para a estrutura completa.

## Como falar com o dono do projeto

- Responda sempre em **português do Brasil**, em linguagem simples, sem jargão técnico. O dono do
  projeto não é programador: explique passo a passo quando ele precisar fazer algo.
- Todo o desenvolvimento deve ser **gratuito**. Não proponha serviços pagos (Play Store, Apple
  Developer, planos pagos da Expo etc.) sem que ele peça.
- Nunca peça para colar tokens ou senhas no chat. Segredos ficam nas variáveis de ambiente
  (`EXPO_TOKEN` já está configurado no ambiente da nuvem).

## Questões

- Ficam em `conteudos/<disciplina>/NN-topico.md`, com as seções `## Fácil`, `## Médio` e `## Difícil`.
  Use 17 + 17 + 16 = 50 questões para tópicos escritos à mão. O formato está no `README.md`.
- Cinco alternativas (A–E), gabarito e explicação sempre. Não use "todas/nenhuma das anteriores".
- Na explicação, **não cite a letra** da resposta, porque o balanceador troca as alternativas de lugar.
- Questões inéditas levam `fonte: Questão inédita (estilo ...)`. Questões reais de provas públicas
  (por exemplo, provas do ENEM publicadas pelo INEP) devem ter a fonte exata
  (`**Fonte:** ENEM 2019, questão 140`). Não copie questões de sites de terceiros protegidas por
  direitos autorais.
- Confira fatos, datas, leis e números. Prefira fontes oficiais.
- Questões de cálculo são geradas em `scripts/geradores/`. Edite o gerador, nunca o `.md` gerado.
- Todo tópico tem uma seção `## Resumo` (antes de `## Fácil`) com a teoria em tópicos curtos. Nos
  tópicos gerados, o resumo fica em `scripts/geradores/resumos.mjs`.
- Questões oficiais ficam em `conteudos/enem-oficial/`, com `ordem: original` no cabeçalho (o
  balanceador não altera a ordem das alternativas) e `**Fonte:**` em cada questão. Confira o gabarito
  com o arquivo oficial do INEP. Inclua só questões que não dependem de imagem.
- Para baixar PDFs do INEP (download.inep.gov.br), o servidor não envia o certificado intermediário:
  complete a cadeia baixando o intermediário indicado no próprio certificado (AIA) e use `--cacert`.
  Nunca desative a verificação TLS.

## Fluxo de trabalho

Dentro de `estudos/app/` (o app fica na pasta `estudos/` do repositório):

```bash
npm run conteudo      # gera, balanceia e compila as questões (obrigatório após editar conteúdo)
npm run typecheck     # checagem de tipos
npm run atualizar-app # publica a atualização para os celulares (EAS Update, canal "preview")
```

- Depois de mudar conteúdo ou telas, rode `npm run conteudo` e `npm run typecheck`, faça commit e
  push e publique com `npm run atualizar-app`. Os celulares recebem a mudança sozinhos, sem
  reinstalar o app.
- Só gere um APK novo (`npx eas-cli build -p android --profile preview`) quando houver mudança
  nativa: novo pacote nativo, mudança em `app.json` ou nos plugins. Nesse caso, aumente
  `expo.version` no `app.json`, porque `runtimeVersion` segue a versão do app.
- Instale pacotes com `npx expo install`, nunca com `npm install <pacote>`.
- Não use identificadores de modelo de IA em commits ou arquivos.
