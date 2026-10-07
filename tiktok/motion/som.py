"""Trilha da vitrine de motion: batida leve e efeitos sincronizados com o vitrine.html.

Tudo é sintetizado aqui (sem músicas ou efeitos de terceiros). Uso: python3 som.py saida.wav
"""

import sys
import wave

import numpy as np

TAXA = 48000
DURACAO = 25.0
N = int(TAXA * DURACAO)
rng = np.random.default_rng(3)
mix = np.zeros((N, 2))


def tempo(seg):
    return np.arange(int(seg * TAXA)) / TAXA


def por(som, inicio, vol=1.0, pan=0.0):
    i = int(inicio * TAXA)
    if i >= N:
        return
    som = som[: N - i] * vol
    mix[i:i + len(som), 0] += som * (1 - max(0, pan))
    mix[i:i + len(som), 1] += som * (1 + min(0, pan))


def passa_banda(x, centro, largura=0.6):
    """Filtro simples no domínio da frequência (centro pode variar: usa o médio)."""
    f = np.fft.rfftfreq(len(x), 1 / TAXA)
    espectro = np.fft.rfft(x)
    ganho = np.exp(-0.5 * (np.log2(np.maximum(f, 1) / centro) / largura) ** 2)
    return np.fft.irfft(espectro * ganho, len(x))


def whoosh(seg, f1=300, f2=3000, forma="sobe"):
    t = tempo(seg)
    ruido = rng.standard_normal(len(t))
    pedacos, saida, n = 24, np.zeros(len(t)), len(t)
    for k in range(pedacos):  # varre a frequência em pedaços
        a, b = k * n // pedacos, (k + 1) * n // pedacos
        centro = f1 * (f2 / f1) ** (k / (pedacos - 1))
        saida[a:b] = passa_banda(ruido, centro, 0.5)[a:b]
    env = np.sin(np.pi * (t / seg)) ** (1.5 if forma == "sobe" else 0.8)
    if forma == "sobe":
        env *= (t / seg) ** 1.2
    return saida / (np.abs(saida).max() + 1e-9) * env


def impacto(seg=1.2, grave=48):
    t = tempo(seg)
    freq = grave + 90 * np.exp(-t * 18)
    corpo = np.sin(2 * np.pi * np.cumsum(freq) / TAXA) * np.exp(-t * 3.2)
    estalo = passa_banda(rng.standard_normal(len(t)), 2500, 1.2) * np.exp(-t * 30)
    return 0.9 * corpo + 0.6 * estalo / (np.abs(estalo).max() + 1e-9)


def pop(freq=700, seg=0.12):
    t = tempo(seg)
    f = freq * (1 + 1.5 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(f) / TAXA) * np.exp(-t * 35)


def clique(seg=0.03, centro=4000):
    t = tempo(seg)
    return passa_banda(rng.standard_normal(len(t)), centro, 0.8) * np.exp(-t * 220) * 4


def sino(freq, seg=1.6, brilho=1.0):
    t = tempo(seg)
    s = sum(a * np.sin(2 * np.pi * freq * m * t) * np.exp(-t * d)
            for m, a, d in [(1, 1, 2.5), (2.01, .5 * brilho, 4), (3.02, .25 * brilho, 6), (4.2, .12 * brilho, 9)])
    return s * np.minimum(1, t * 400)


def zip_sobe(seg=0.45, f1=220, f2=880):
    t = tempo(seg)
    f = f1 * (f2 / f1) ** (t / seg)
    return np.sign(np.sin(2 * np.pi * np.cumsum(f) / TAXA)) * 0.25 * np.sin(np.pi * t / seg)


def brilhos(seg=0.6, n=10, base=2400):
    s = np.zeros(int(seg * TAXA))
    for k in range(n):
        som = sino(base * (1 + rng.random()), 0.25, 0.3) * 0.5
        i = int(rng.random() * (len(s) - len(som)))
        s[i:i + len(som)] += som
    return s


def nota(midi):
    return 440 * 2 ** ((midi - 69) / 12)


# ---------- batida (120 bpm), de 4,5 s a 21,2 s ----------
def bumbo():
    t = tempo(0.35)
    f = 45 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / TAXA) * np.exp(-t * 9)


def chimbal():
    t = tempo(0.06)
    return passa_banda(rng.standard_normal(len(t)), 8000, 0.7) * np.exp(-t * 70) * 3


ACORDES = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Lá menor, Fá, Dó, Sol
bpm, inicio_batida, fim_batida = 120, 4.5, 21.2
passo = 60 / bpm
batidas = np.arange(inicio_batida, fim_batida, passo)
for i, b in enumerate(batidas):
    por(bumbo(), b, 0.55)
    por(chimbal(), b + passo / 2, 0.10, pan=0.3)
    if i % 2 == 1:
        por(chimbal(), b + passo * 0.75, 0.05, pan=-0.3)

# baixo e "pad" seguindo os acordes (2 s cada), com abaixada a cada bumbo (sidechain)
t_total = np.arange(N) / TAXA
pad = np.zeros(N)
for k, inicio in enumerate(np.arange(0, DURACAO, 2.0)):
    acorde = ACORDES[k % 4]
    t = tempo(2.2)
    som = sum(np.sin(2 * np.pi * nota(m + 12) * t + np.sin(2 * np.pi * 0.5 * t)) for m in acorde) / 3
    som += 0.6 * np.sin(2 * np.pi * nota(acorde[0] - 12) * t)
    som *= np.minimum(1, t / 0.3) * np.minimum(1, (2.2 - t) / 0.4)
    i = int(inicio * TAXA)
    pad[i:i + len(som)] += som[: N - i]
fase_batida = ((t_total - inicio_batida) % passo) / passo
lado = np.where((t_total > inicio_batida) & (t_total < fim_batida), 0.35 + 0.65 * np.minimum(1, fase_batida * 3), 1)
volume_pad = np.interp(t_total, [0, 2, 21, 23, 25], [0.05, 0.10, 0.10, 0.14, 0.0])
mix[:, 0] += pad * lado * volume_pad
mix[:, 1] += pad * lado * volume_pad

# ---------- efeitos da cena 1: logo ----------
por(whoosh(2.6, 200, 2500), 0.0, 0.18)
for a in (0.25, 0.45):
    por(whoosh(1.1, 600, 1800, "arco"), a, 0.10, pan=-0.4 if a < .3 else 0.4)
for k in range(16):
    por(clique(centro=5000), 1.0 + k * 0.042, 0.10, pan=-0.6 + k * 0.08)
t = tempo(0.9)
por(np.sin(2 * np.pi * np.cumsum(600 + 900 * t / 0.9) / TAXA) * np.sin(np.pi * t / 0.9) * 0.3, 1.2, 0.18)
por(whoosh(0.8, 400, 5000), 1.95, 0.22)
por(pop(900), 2.65, 0.5)
por(sino(nota(84), 1.8), 2.68, 0.25)
for k in range(11):
    por(clique(centro=3000 + k * 200), 3.05 + k * 0.045, 0.12)
por(whoosh(0.75, 150, 6000), 3.75, 0.55)
por(impacto(1.4, 40), 4.48, 0.75)

# ---------- cena 2: texto ----------
por(impacto(0.5, 70), 4.86, 0.4)
por(whoosh(0.35, 3000, 400, "arco"), 4.95, 0.3)
por(impacto(1.3, 38), 5.3, 0.9)
por(whoosh(0.45, 300, 2000, "arco"), 5.4, 0.35, pan=-0.5)
for k in range(5):
    por(pop(500 * 1.12 ** k), 5.98 + k * 0.08, 0.35, pan=-0.4 + k * 0.2)
por(whoosh(0.35, 1500, 4000, "arco"), 6.3, 0.25, pan=0.3)
for k in range(33):
    por(clique(centro=2500), 6.8 + k * 0.7 / 33, 0.12, pan=-0.3 + k * 0.02)
por(whoosh(0.8, 200, 4000), 7.95, 0.5)
por(impacto(0.9, 55), 8.7, 0.45)

# ---------- cena 3: gráfico ----------
por(whoosh(0.4, 800, 2500, "arco"), 8.7, 0.2)
for i in range(5):
    por(zip_sobe(0.5, 180 * 1.12 ** i, 700 * 1.12 ** i), 9.25 + i * 0.22, 0.10, pan=-0.3 + i * 0.15)
por(brilhos(0.8, 8), 10.8, 0.25)
por(whoosh(0.3, 3000, 800, "arco"), 11.75, 0.2)
for k, a in enumerate((12.05, 12.22, 12.31)):
    por(pop(300, 0.15), a, 0.4 / (k + 1))
por(sino(nota(88), 2.2), 12.06, 0.3)
por(brilhos(0.9, 14, 3000), 12.1, 0.3)
por(whoosh(0.7, 2000, 300, "arco"), 14.2, 0.4)

# ---------- cena 4: quiz ----------
por(whoosh(0.5, 400, 3000, "arco"), 14.95, 0.35)
por(pop(1100), 15.3, 0.35)
for i in range(5):
    por(whoosh(0.25, 1000, 3500, "arco"), 15.95 + i * 0.09, 0.12, pan=0.5)
    por(clique(centro=2000), 16.15 + i * 0.09, 0.15)
por(pop(800), 16.65, 0.35)
for k, a in enumerate((16.8, 17.8, 18.8)):
    por(sino(nota(76 + (k == 2) * 5), 0.4, 0.2) * np.exp(-tempo(0.4) * 8), a, 0.35)
por(impacto(0.6, 60) * 0.5, 18.8, 0.3)
for k, m in enumerate((72, 76, 79, 84)):
    por(sino(nota(m), 1.6), 19.8 + k * 0.07, 0.28, pan=-0.3 + k * 0.2)
for k in range(40):
    por(clique(centro=3000 + rng.random() * 4000), 19.85 + rng.random() * 1.2, 0.06, pan=rng.random() * 2 - 1)
por(brilhos(0.6, 8, 2600), 20.0, 0.25)
por(whoosh(0.55, 4000, 200), 20.9, 0.45)
por(impacto(1.5, 42), 21.42, 0.7)

# ---------- cena 5: final ----------
por(sino(nota(79), 2.5), 21.45, 0.3)
por(sino(nota(84), 2.5), 21.5, 0.2)
for k in range(11):
    por(clique(centro=3500), 21.95 + k * 0.04, 0.10)
por(pop(650, 0.2), 22.85, 0.45)
por(brilhos(0.6, 6, 3200), 23.5, 0.25)
t = tempo(3.5)
acorde_final = sum(np.sin(2 * np.pi * nota(m) * t) for m in (60, 64, 67, 72)) / 4
por(acorde_final * np.minimum(1, t / 0.05) * np.exp(-t * 0.9), 21.45, 0.25)

# ---------- mixagem final ----------
mix = np.tanh(mix * 1.1)  # compressão suave
mix /= np.abs(mix).max() / 0.89
mix[-int(0.4 * TAXA):] *= np.linspace(1, 0, int(0.4 * TAXA))[:, None]
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(TAXA)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print("trilha pronta:", sys.argv[1])
