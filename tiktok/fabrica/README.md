# Fábrica de vídeos

Transforma cada roteiro de `../roteiros/` em um vídeo vertical com a história completa: capa com a
frase chamativa no início, voz de IA, legenda palavra por palavra e fundo de vídeos satisfatórios,
tudo acelerado em 1.5x. Um vídeo de fundo nunca é usado em dois vídeos (registro em
`../fundos/usados.json`).

Tudo é grátis: voz com [edge-tts](https://github.com/rany2/edge-tts), montagem com FFmpeg, vídeos de
fundo do Pexels e fonte Poppins ExtraBold (licença livre SIL OFL, em `fontes/`, junto com as outras opções testadas).

## Como usar (dentro da pasta `tiktok/`)

```bash
pip install -r fabrica/requirements.txt   # uma vez só (o FFmpeg também precisa estar instalado)
python3 fabrica/baixar_fundos.py          # baixa os vídeos de fundo de fundos/fontes.json
python3 fabrica/fazer_video.py            # gera os vídeos dos roteiros que ainda não têm vídeo
```

Cada roteiro vira a pasta `saida/videos/<roteiro>/` com:

- `video.mp4` — o vídeo pronto (1080x1920, em 1.5x, mais de 1 minuto, menos de 30 MB);
- `postagem.txt` — o texto para colar no TikTok e os lembretes;
- `info.json` — tema, voz, fundos usados e duração (para comparar o desempenho depois).

## Vozes

Só duas, escolhidas pelo dono do canal (a narração é feita frase por frase, com pausas e mudança de
tom; veja `voz.py`):

| Valor de `voz:` no roteiro | Voz |
|---|---|
| `thalita` | Feminina |
| `antonio` | Masculina |

## Fundos

Categorias em `../fundos/fontes.json`: `limpeza` (jato de alta pressão), `ceramica`, `madeira`,
`maquinas`, `arte` e `cortes`, reunidas no grupo `satisfatorio` (o padrão). Também existem `slime`,
`tinta` e `minecraft`.
Os vídeos da categoria `minecraft` são gravações do próprio dono do canal: coloque os arquivos em
`saida/fundos/minecraft/` e rode `fazer_video.py` normalmente (ele corta trechos aleatórios).
