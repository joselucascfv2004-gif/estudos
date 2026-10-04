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
- **Sem pessoas reais.** Não use nomes de pessoas reais, empresas reais em situação negativa, nem casos
  policiais reais. Nada de conteúdo sexual, ódio, automutilação explicada, golpes ou desafios perigosos.
- **Sempre duas partes.** Toda história é dividida em Parte 1 e Parte 2, para o público ir ao perfil
  procurar a continuação. O formato do roteiro está em `roteiros/README.md`.
- **Temas:** traição, relacionamentos, brigas de família e brigas de trabalho, com conflitos polêmicos
  que geram comentários. Alterne voz feminina e masculina entre as histórias.
- **Duração.** Cada parte deve ter **mais de 1 minuto** (o TikTok só paga por vídeos acima de 1
  minuto). Mire em 1min10 a 1min30 de narração (230 a 270 palavras).
- **Fundo sem direitos autorais de terceiros.** A maioria dos vídeos usa **slime**; também há tinta,
  vídeos satisfatórios e Minecraft. Use vídeos de bancos gratuitos que permitem uso comercial (Pexels,
  Pixabay) ou gameplay gravado pelo próprio dono do canal. Não baixe vídeos de outros criadores do
  YouTube ou do TikTok. Registre cada vídeo em `fundos/fontes.json`.
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

Depois de gerar, confira um quadro do vídeo (por exemplo com `ffmpeg -ss 5 -i parte-1.mp4
-frames:v 1 quadro.png`) e entregue os vídeos e o `postagem.txt` ao dono do canal. O conector do
Google Drive não aceita arquivos grandes como vídeos; para receber gravações do dono, peça um link
do Drive compartilhado como "qualquer pessoa com o link" e baixe com
`curl -L "https://drive.usercontent.google.com/download?id=<ID>&confirm=t"`.

## Arquivos

- `roteiros/` — histórias prontas para narrar, uma por arquivo.
- `fundos/` — lista e créditos dos vídeos de fundo (os vídeos em si não vão para o GitHub).
- `fabrica/` — programas que transformam um roteiro em vídeo.
- `saida/` — vídeos gerados (ignorada pelo Git, porque os arquivos são grandes).
