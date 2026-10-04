# 🎬 Canal de histórias no TikTok

Vídeos curtos com uma **história narrada em primeira pessoa por voz de IA**, **legenda grande** no
meio da tela e um **vídeo de fundo que prende o olho** (jogo, areia cinética, sabonete sendo cortado,
corrida em pista etc.). O objetivo é chegar a **10 mil seguidores** e entrar no **Programa de
Recompensas para Criadores** do TikTok, que paga por visualização.

---

## 1. O que o TikTok exige para pagar

O Programa de Recompensas para Criadores (Creator Rewards Program) está disponível no **Brasil**. Para
entrar, a conta precisa ter:

| Requisito | Detalhe |
|---|---|
| Idade | 18 anos ou mais |
| Seguidores | Pelo menos **10.000** |
| Visualizações | Pelo menos **100.000 nos últimos 30 dias** |
| Tipo de conta | Conta **pessoal** (não use conta "Empresa") em situação regular, sem punições |
| Vídeos | **Mais de 1 minuto** e **originais** |

Depois de aceito, só contam os vídeos postados **após a aprovação**, e cada vídeo precisa passar de
1.000 visualizações qualificadas (vindas da página "Para Você").

### ⚠️ O maior risco: "conteúdo não original"

O TikTok **não paga** (e às vezes pune) vídeos que considera copiados ou com pouca edição própria.
Esse formato de "história + gameplay" é muito usado, então precisamos fazer diferente:

| Evitar | Fazer |
|---|---|
| Copiar histórias do Reddit ou de outros perfis | Escrever histórias **novas** (a IA ajuda, e a gente revisa) |
| Baixar gameplay de YouTubers (Minecraft parkour, Subway Surfers de outros canais) | **Gravar o próprio gameplay** ou usar vídeos grátis do Pexels/Pixabay |
| Vídeo sempre igual, só trocando o áudio | Identidade própria: título no início, legenda com estilo nosso, série com "Parte 1, 2, 3" |
| Dizer que é "caso real" | Dizer que é **história** e marcar como **conteúdo gerado por IA** |

> Sobre "relatos pessoais": a narração pode ser em primeira pessoa ("Descobri que meu marido…"), mas
> as histórias são inventadas. O TikTok exige o rótulo de **conteúdo gerado por IA** em conteúdo
> realista feito com IA, e apresentar ficção como fato pode derrubar o vídeo ou a conta. Na bio e nas
> legendas, deixamos claro que são histórias.

---

## 2. Como vai funcionar (a "fábrica")

```
 Ideia ──► Roteiro ──► Voz de IA ──► Legendas ──► Junta com o fundo ──► Vídeo pronto ──► Postagem
 (tema)   (história    (edge-tts    (palavra por   (FFmpeg, vertical     (MP4 1080x1920,   (você, pelo
          de ~1min20)   ou Piper)    palavra)       1080x1920)            1min10–1min40)    app/Studio)
```

Tudo com ferramentas **gratuitas**:

| Etapa | Ferramenta grátis | Observação |
|---|---|---|
| Roteiro | Claude (aqui no chat) | Histórias originais, com gancho forte nos 2 primeiros segundos |
| Voz | **edge-tts** (vozes neurais em português) ou **Piper** (roda no próprio computador) | Vozes pt-BR masculinas e femininas |
| Legendas | Tempo de cada palavra que a própria voz informa (ou **Whisper**) | Palavras grandes no meio da tela |
| Montagem | **FFmpeg** | Corta um trecho aleatório do fundo do tamanho da narração |
| Onde roda | Aqui na nuvem ou no **GitHub Actions** (grátis) | Os vídeos ficam fora do GitHub (são pesados) |
| Entrega | Aqui no chat do Claude | Você salva os vídeos no celular e posta (o conector do Drive não aceita arquivos de vídeo grandes) |

### Por que a postagem não é 100% automática (por enquanto)

- A **API oficial** do TikTok, antes de passar por uma auditoria do próprio TikTok, só deixa postar
  vídeos **privados** ou mandar o vídeo como **rascunho** para a caixa de entrada do app.
- Robôs que fazem login e clicam no lugar da pessoa **violam as regras** e podem **banir a conta** —
  justamente quando ela está crescendo.
- Caminho seguro e grátis: a fábrica gera os vídeos da semana de uma vez e você **agenda** as postagens
  pelo **TikTok Studio** (site do TikTok no computador) ou posta pelo celular. Leva uns 10 minutos por
  semana. Mais pra frente dá para tentar a API oficial no modo "rascunho".

---

## 3. Passo a passo

### Fase 1 — Criar a conta (você faz; leva 1 dia)

1. Crie um **e-mail novo** só para o canal (Gmail é grátis). Assim o canal fica separado da sua vida
   pessoal.
2. No celular, instale o TikTok (ou saia da sua conta atual) e toque em **Inscrever-se** → **Usar
   e-mail**. Use sua data de nascimento real (precisa ter 18+ para receber).
3. Escolha o **nome do canal** (ver sugestões abaixo) e uma **foto de perfil** simples e reconhecível.
4. Deixe a conta como **pessoal** (não troque para "Conta empresarial").
5. Bio sugerida: `Histórias que vão te prender até o fim 🎧 | Narração por IA | Ficção | Siga para a
   parte 2`.
6. **Aquecimento (3 a 5 dias):** antes de postar, use a conta como usuário normal uns 20 minutos por
   dia, assistindo e curtindo vídeos desse nicho (histórias narradas, "storytime"). Isso ajuda o
   TikTok a entender para quem mostrar seus vídeos.
7. **Nunca compre seguidores** nem use "trocas de seguidores": isso derruba o alcance e pode
   desclassificar a conta do programa.

### Fase 2 — Definir o estilo do canal (a gente decide junto)

- **Nicho das histórias.** Escolher 1 ou 2 temas no começo ajuda o TikTok a achar o público. Opções
  que costumam reter muita gente: traição e relacionamentos, conflitos de família, sogra/vizinho,
  trabalho e chefe abusivo, escola, mistério/terror leve, "fui o vilão?".
- **Voz.** Uma voz fixa vira a "marca" do canal (por exemplo, voz feminina para histórias de
  relacionamento).
- **Fundo.** 3 a 5 tipos de fundo que se revezam. Se você joga algo no celular ou PC, gravar 30–60
  minutos de jogo rende fundo para meses.
- **Formato fixo:** título na tela nos 2 primeiros segundos ("Descobri o segredo do meu pai no
  casamento da minha irmã…"), legenda grande, final com gancho para a parte 2.

### Fase 3 — Montar a fábrica ✅ pronta

Decisões do dono do canal:

- Temas: **traição, relacionamentos, brigas de família e de trabalho**, sempre polêmicos.
- Vozes: alternar **feminina e masculina** entre as histórias.
- **Toda história em duas partes**, para o público ir ao perfil procurar a Parte 2.
- Fundo: **slime na maioria dos vídeos**, também tinta e outros vídeos satisfatórios (grátis, do
  Pexels). Depois, gameplay de Minecraft gravado por você. Vamos comparar qual fundo dá mais
  visualização (cada vídeo guarda o fundo usado em `info.json`).

Como funciona: veja `fabrica/README.md`. Os roteiros ficam em `roteiros/` (formato em
`roteiros/README.md`).

**Para mandar a gravação do seu jogo:** grave a tela do jogo (por exemplo com o OBS, grátis), suba o
arquivo no Google Drive, toque em **Compartilhar → Qualquer pessoa com o link** e mande o link aqui
no chat. Eu corto a gravação em vários fundos.

### Fase 4 — Postar com regularidade

- **2 a 3 vídeos por dia** no começo, sempre nos mesmos horários (por exemplo 12h, 18h e 21h), por
  pelo menos 30 dias seguidos. Consistência pesa mais do que um vídeo "perfeito".
- **Séries em partes** (Parte 1, 2, 3): é o que mais faz as pessoas **seguirem** o perfil.
- Marque sempre **"Conteúdo gerado por IA"** ao postar.
- Legenda do post curta + 3 a 5 hashtags do nicho (`#historias #storytime #relatos #ficcao`).
- Responda comentários (dá para responder com um vídeo da "Parte 2").

### Fase 5 — Medir e ajustar (toda semana)

No TikTok Studio → **Análises**, olhar em cada vídeo:

- **Retenção:** em que segundo as pessoas saem. Se saem nos 3 primeiros segundos, o gancho está fraco.
- **Visualizações → seguidores:** quais temas trazem mais seguidores. Fazer mais desses.
- Guardar os resultados numa planilha simples para comparar os temas, vozes e fundos.

### Fase 6 — 10 mil seguidores e monetização

Quando bater 10 mil seguidores e 100 mil visualizações em 30 dias, a opção aparece em **TikTok Studio →
Monetização → Programa de Recompensas para Criadores**. Aí os vídeos precisam continuar com mais de
1 minuto e originais.

---

## 4. Expectativas honestas

- **Não existe garantia** de chegar a 10 mil seguidores. Alguns canais chegam em semanas, outros levam
  meses, e muitos desistem antes. Quem posta todo dia e ajusta pelos números tem muito mais chance.
- O valor pago por mil visualizações **no Brasil costuma ser bem menor** do que nos Estados Unidos.
  No começo, pense no canal como um experimento, não como renda garantida.
- Outras fontes de dinheiro que podem vir depois: lives com presentes (exige 18+ e mil seguidores),
  afiliado do TikTok Shop e parcerias com marcas.

---

## 5. Sugestões de nome

`Me Conta Essa` · `Histórias de Madrugada` · `Relato Sem Filtro` · `Ouvi Essa Hoje` ·
`Contos do Feed` · `Parte 2, Por Favor`

Antes de escolher, pesquise o nome no TikTok e no Instagram para ver se já existe.

---

## Fontes

- [Requisitos do Creator Rewards Program (2026)](https://postlinkapp.com/blog/tiktok-creator-rewards-program)
- [Lista de países do programa](https://www.tiktok.com/discover/creator-rewards-program-country-list)
- [Política de originalidade do TikTok](https://www.tiktok.com/creator-academy/article/tiktok-originality-policy)
- [API de postagem do TikTok: Direct Post e auditoria](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post)
