# Instruções do projeto TikTok

Canal de TikTok com histórias curtas narradas por voz de IA, com legenda grande e vídeo de fundo
(jogos, vídeos satisfatórios). O plano completo está no `README.md` desta pasta.

## Regras do conteúdo

- **Histórias originais.** Escreva histórias novas. Não copie posts do Reddit, de outros perfis ou de
  livros. Pode usar ideias gerais ("traição no casamento", "vizinho estranho"), nunca o texto de outra
  pessoa.
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
- **Legenda: fonte Poppins ExtraBold** (opção 2), até 3 palavras por vez, palavra falada em amarelo.
- **Duração: 2 a 3 minutos** por vídeo (cerca de 420 a 560 palavras). A fábrica avisa se passar disso.
- **Na tela, só a legenda.** Sem título, sem caixas de texto e sem avisos sobre o vídeo.
- **Narração com emoção.** As falas dos personagens vão entre aspas (“...”), para a voz mudar de tom.
  Frases curtas de impacto ("Era a minha irmã.") ganham pausa sozinhas.
- **Fundo: lavagem de carro** (`fundo: lavagem`) na maioria dos vídeos; slime, tinta, satisfatórios e
  Minecraft ficam como alternativas. Use só vídeos de bancos gratuitos que permitem uso comercial
  (Pexels, Pixabay) ou gravados pelo próprio dono do canal. **Não baixe vídeos do TikTok nem de outros
  criadores**, mesmo os marcados como "sem direitos autorais": isso viola os termos do TikTok, pode
  gerar denúncia de direitos autorais e faz o vídeo ser marcado como "não original" (sem pagamento).
  Registre cada vídeo em `fundos/fontes.json`.
- **Ferramentas gratuitas.** Voz, legendas e montagem com ferramentas grátis (edge-tts ou Piper,
  Whisper, FFmpeg). Não proponha serviços pagos sem o dono pedir.

## Postagem

- Não use robôs que fazem login ou clicam no app do TikTok no lugar da pessoa: isso viola os termos
  do TikTok e pode banir a conta.
- A postagem é feita pelo dono do canal (app ou TikTok Studio, com agendamento) ou, no futuro, pela
  API oficial do TikTok.

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
