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
- **Duração.** Cada vídeo deve ter **mais de 1 minuto** (o TikTok só paga por vídeos acima de 1 minuto).
  Mire em 1min10 a 1min40 de narração.
- **Fundo sem direitos autorais de terceiros.** Use gameplay gravado pelo próprio dono do canal ou
  vídeos de bancos gratuitos que permitem uso comercial (Pexels, Pixabay). Não baixe vídeos de outros
  criadores do YouTube ou do TikTok.
- **Ferramentas gratuitas.** Voz, legendas e montagem com ferramentas grátis (edge-tts ou Piper,
  Whisper, FFmpeg). Não proponha serviços pagos sem o dono pedir.

## Postagem

- Não use robôs que fazem login ou clicam no app do TikTok no lugar da pessoa: isso viola os termos
  do TikTok e pode banir a conta.
- A postagem é feita pelo dono do canal (app ou TikTok Studio, com agendamento) ou, no futuro, pela
  API oficial do TikTok.

## Arquivos

- `roteiros/` — histórias prontas para narrar, uma por arquivo.
- `fundos/` — lista e créditos dos vídeos de fundo (os vídeos em si não vão para o GitHub).
- `fabrica/` — programas que transformam um roteiro em vídeo.
- `saida/` — vídeos gerados (ignorada pelo Git, porque os arquivos são grandes).
