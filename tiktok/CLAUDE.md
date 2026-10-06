# Instruções do projeto TikTok

**Foco atual: vídeos de quiz** ("Você passaria no ENEM?"), que também divulgam o app Estudos.
As **histórias narradas estão pausadas** por decisão do dono do canal: não produza histórias até ele
pedir. As regras delas continuam abaixo para quando voltarem.

## Quiz (formato atual)

- Fábrica: `quiz/fazer_quiz.py`. Cada quiz é um JSON em `quiz/quizzes/` com 5 perguntas tiradas do
  app (pasta `estudos/conteudos`), com gabarito e explicação conferidos. Use perguntas curtas, sem
  figura. Explicações com duas frases curtas.
- **Espalhe as respostas certas entre as letras** (por exemplo D, A, C, E, B). Nunca deixe todas
  na mesma letra: quem assiste percebe o padrão.
- Voz: **Antonio** (só fala português). A Thalita lê termos técnicos com sotaque inglês.
- Letras faladas: "Letra É" para a E. Use `resposta_falada` quando a alternativa tiver unidade ou
  símbolo (por exemplo "423 kelvin").
- Visual: identidade da logo (`marca/`): papel quadriculado azul-claro, régua, círculos de
  construção, azul do "E", amarelo de destaque e verde da resposta certa. Textos limpos, sem
  contorno. A abertura e o final foram aprovados como estão.
- Área segura do celular: conteúdo entre x=110 e x=970 e entre y≈290 e y≈1470; alternativas até
  x=860 (antes da coluna de botões). Celulares compridos cortam ~55 px de cada lado.
- Capa: **3:4 em pé (1080×1440)**, como a grade do perfil do TikTok. Cartão com selo, título grande
  com marca-texto e letras A–E, salvo só como `capa.png` (sobre o fundo desfocado). Para refazer só
  as capas: `python3 quiz/fazer_quiz.py --capas quiz/quizzes/*.json`. **Não coloque a capa dentro do vídeo**: o dono do canal adiciona a capa
  no TikTok. O vídeo começa direto na abertura animada.
- Sempre entregue **vídeo + capa + postagem.txt**. Qualidade máxima (`fabrica/qualidade.py`), até
  30 MB para caber no envio pelo chat.
- Cada quiz tem capa diferente: `capa_selo`, `capa_titulo`, `capa_destaque`, `capa_sub` e
  `capa_cor` (amarelo, laranja, verde, roxo, vermelho). Varie a cor e o selo entre os vídeos.
- Cada quiz traz a sua `descricao` e 5 `hashtags` do tema (padrão:
  `#enem #enem2026 #quiz #estudos #vestibular`).
- **Chamada para o e-book.** Quizzes de ENEM levam `"chamada_final": "ebook"`: o final mostra
  "REVISÃO FINAL ENEM 2026" e "Link no comentário fixado", e o `postagem.txt` traz o comentário para
  fixar (textos em `EBOOK`, no `fazer_quiz.py`). O e-book é um projeto à parte, do repositório
  `vendasteste` (`revisao-enem/`), com página em revisao-final-enem-2026.netlify.app. Nunca
  coloque o link do checkout, prometa nota ou aprovação, nem diga que o material é oficial do
  INEP. A narração do `encerramento` cita o e-book e o comentário fixado. O ENEM 2026 é em 8 e 15 de
  novembro: depois disso, volte ao final normal. Quizzes de concurso não levam essa chamada.
- **O app ainda não foi lançado** (`APP_LANCADO = False`): o final diz "siga para o próximo teste" e
  "App Estudos chegando em breve". Nunca diga "baixe" ou "link no perfil" antes do lançamento. A bio
  do perfil está em `perfil.md`.

## Histórias (pausadas): regras do conteúdo

- **Histórias originais no estilo Reddit.** O dono do canal quer o clima de relato do Reddit
  ("eu errei?", conflito de família, dinheiro, sogro, casamento). Use só a **premissa comum** como
  ponto de partida (ideias não têm dono) e escreva enredo, detalhes, personagens e texto próprios.
  Nunca traduza nem adapte um post específico (mesmo trocando nomes e detalhes, continua sendo o texto
  de outra pessoa e o TikTok pode marcar como "não original").
- **Ficção declarada.** As histórias são narradas em primeira pessoa, mas são ficção. Não afirme que
  são fatos reais ("caso real", "aconteceu comigo de verdade"). Toda postagem deve ser marcada no
  TikTok como **conteúdo gerado por IA**.
- **Sem pessoas reais.** Use nomes fictícios comuns para os personagens (Diego, Patrícia...), nunca
  nomes de pessoas famosas, empresas reais em situação negativa ou casos policiais reais. Nada de conteúdo sexual, ódio, automutilação explicada, golpes ou desafios perigosos.
- **Histórias completas e detalhadas.** Cada vídeo é uma história inteira, com começo, meio e fim,
  cheia de detalhes (lugares, objetos, falas, sensações) e personagens com nome. O formato do roteiro
  está em `roteiros/README.md`. (O formato antigo, em duas partes, foi abandonado: os roteiros dele
  estão em `roteiros/antigos/`.)
- **Temas:** traição, relacionamentos, brigas de família e brigas de trabalho, com conflitos polêmicos
  que geram comentários.
- **Vozes: só Thalita (feminina) e Antonio (masculina)**, escolhidas pelo dono do canal. A voz
  acompanha quem narra: narradora mulher → `thalita`, narrador homem → `antonio`. Alterne entre as
  histórias.
- **Cuidado com a Thalita (voz multilíngue).** Ela adivinha o idioma de cada trecho e, em trechos
  curtos ou com termos técnicos (DNA, nomes de letras, unidades), pode ler com sotaque inglês,
  italiano etc. O Antonio só fala português e não tem esse problema. Por isso **os quizzes usam o
  Antonio**. Para conferir uma narração, transcreva o áudio com o Whisper grátis
  (`pip install faster-whisper`, modelo "small") e veja se todas as palavras saíram em português.
- **Legenda: fonte Poppins ExtraBold** (opção 2), até 3 palavras por vez, palavra falada em amarelo.
- **Tudo em 1.5x.** Narração e fundo acelerados (escolha do dono do canal, `VELOCIDADE` em
  `fabrica/fazer_video.py`). Com 1.5x, uma história de 420 a 560 palavras dá cerca de 1min45 a 2min.
  O vídeo precisa passar de 1 minuto (a fábrica avisa).
- **Capa no início.** Um cartão branco com a frase chamativa (a primeira frase da história, ou o campo
  `capa:` do roteiro) aparece enquanto ela é narrada. Fora a capa, na tela só a legenda.
- **Narração com emoção.** As falas dos personagens vão entre aspas (“...”), para a voz mudar de tom.
  Frases curtas de impacto ("Era a minha irmã.") ganham pausa sozinhas.
- **Fundo: vídeos realmente satisfatórios** (`fundo: satisfatorio`): limpeza com jato de alta
  pressão, cerâmica no torno, madeira no torno, máquinas CNC e laser, tinta escorrendo e cortes em
  close. O dono do canal **reprovou** vídeos comuns de lavagem de carro: antes de adicionar um fundo,
  confira um quadro dele e só use se prender o olho.
- **Nunca repita um fundo entre vídeos.** Cada vídeo de fundo é usado em um único vídeo; o registro
  fica em `fundos/usados.json` (vai para o GitHub). Quando acabarem os fundos inéditos, a fábrica para
  e avisa: procure e baixe mais.
- **Compilações do YouTube não servem de fundo.** Canais que juntam vídeos satisfatórios de outras
  pessoas (por exemplo "UNSORTED") não são donos das imagens e não podem liberar o uso. Além disso, o
  YouTube bloqueia download na nuvem. Se o dono mandar um vídeo, confira de quem são as imagens antes.
- **Fundos só de bancos gratuitos** que permitem uso comercial (Pexels, Pixabay) ou gravados pelo
  próprio dono do canal. **Não baixe vídeos do TikTok nem de outros criadores**, mesmo os marcados como
  "sem direitos autorais": isso viola os termos do TikTok, pode gerar denúncia de direitos autorais e
  faz o vídeo ser marcado como "não original" (sem pagamento). Registre cada vídeo em
  `fundos/fontes.json`.
- **Ferramentas gratuitas.** Voz, legendas e montagem com ferramentas grátis (edge-tts ou Piper,
  Whisper, FFmpeg). Não proponha serviços pagos sem o dono pedir.

## Postagem

- Não use robôs que fazem login ou clicam no app do TikTok no lugar da pessoa: isso viola os termos
  do TikTok e pode banir a conta.
- A postagem é feita pelo dono do canal ou, no futuro, pela API oficial do TikTok.
- **Poste pelo celular, no Wi-Fi.** Os 4 primeiros quizzes, postados pelo computador numa conta nova
  e sem uso, ficaram com 0 a 1 visualização. O quiz 005, postado pelo celular (com música em alta
  bem baixinha), teve 38 visualizações e 1 comentário logo de início. O dono salva o vídeo e a capa
  abrindo o chat no app do Claude no celular. Recomende usar o TikTok normalmente todos os dias
  (assistir e comentar vídeos de estudo) e postar 1 vídeo por dia, entre 18h e 22h.

## Como gerar os vídeos

```bash
python3 fabrica/baixar_fundos.py   # baixa e padroniza os vídeos de fundo
python3 fabrica/fazer_video.py     # gera os vídeos dos roteiros novos em saida/videos/
```

Depois de gerar, confira um quadro do vídeo (por exemplo com `ffmpeg -ss 5 -i video.mp4
-frames:v 1 quadro.png`) e entregue o `video.mp4` e o `postagem.txt` ao dono do canal pelo chat
(limite de 30 MB por arquivo; a fábrica já gera vídeos menores que isso). O conector do
Google Drive não aceita arquivos grandes como vídeos; para receber gravações do dono, peça um link
do Drive compartilhado como "qualquer pessoa com o link" e baixe com
`curl -L "https://drive.usercontent.google.com/download?id=<ID>&confirm=t"`.

## Arquivos

- `roteiros/` — histórias prontas para narrar, uma por arquivo.
- `fundos/` — lista e créditos dos vídeos de fundo (os vídeos em si não vão para o GitHub).
- `fabrica/` — programas que transformam um roteiro em vídeo.
- `saida/` — vídeos gerados (ignorada pelo Git, porque os arquivos são grandes).
