# Fábrica de vídeos

Transforma cada roteiro de `../roteiros/` em dois vídeos verticais (Parte 1 e Parte 2) com voz de
IA, legenda palavra por palavra e fundo de slime, tinta, vídeos satisfatórios ou gameplay.

Tudo é grátis: voz com [edge-tts](https://github.com/rany2/edge-tts), montagem com FFmpeg, vídeos de
fundo do Pexels e fonte Anton (licença livre SIL OFL, em `fontes/`).

## Como usar (dentro da pasta `tiktok/`)

```bash
pip install -r fabrica/requirements.txt   # uma vez só (o FFmpeg também precisa estar instalado)
python3 fabrica/baixar_fundos.py          # baixa os vídeos de fundo de fundos/fontes.json
python3 fabrica/fazer_video.py            # gera os vídeos dos roteiros que ainda não têm vídeo
```

Cada roteiro vira a pasta `saida/videos/<roteiro>/` com:

- `parte-1.mp4` e `parte-2.mp4` — vídeos prontos (1080x1920, mais de 1 minuto cada);
- `postagem.txt` — o texto para colar no TikTok, a ordem de postagem e os lembretes;
- `info.json` — tema, voz, fundo e duração (para comparar o desempenho depois).

## Vozes

| Valor de `voz:` no roteiro | Voz |
|---|---|
| `francisca` (ou `feminina`) | Feminina, firme |
| `thalita` | Feminina, mais jovem |
| `antonio` (ou `masculina`) | Masculina |

## Fundos

Categorias em `../fundos/fontes.json`: `slime` (principal), `tinta`, `satisfatorio` e `minecraft`.
Os vídeos da categoria `minecraft` são gravações do próprio dono do canal: coloque os arquivos em
`saida/fundos/minecraft/` e rode `fazer_video.py` normalmente (ele corta trechos aleatórios).
