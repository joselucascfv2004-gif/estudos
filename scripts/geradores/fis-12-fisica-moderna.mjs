// Física — Física moderna: fótons, efeito fotoelétrico, átomo de Bohr, ondas de matéria,
// relatividade restrita e física nuclear (radioatividade, meia-vida, fissão e fusão).
import { expl, num, sup } from './util.mjs';

const N = (v, c = null) => num(v, c);
const r2 = (v) => Math.round(v * 100) / 100;
const u = (un) => (v) => `${N(r2(v))} ${un}`;
const sci = (v, un = '') => {
  if (v === 0) return `0${un ? ` ${un}` : ''}`;
  let e = Math.floor(Math.log10(Math.abs(v)) + 1e-9);
  let c = Math.round((v / 10 ** e) * 100) / 100;
  if (Math.abs(c) >= 10) { c /= 10; e += 1; }
  const base = e === 0 ? N(c) : `${N(c)} · 10${sup(e)}`;
  return un ? `${base} ${un}` : base;
};
const H = 6.6e-34;
const BOHR = (n) => -13.6 / (n * n);

const facil = [
  // 1. energia do fóton
  (r) => {
    const f = r.pick([5, 6, 4, 7.5]) * 1e14;
    return {
      e: `Qual é a energia de um fóton de luz de frequência ${sci(f)} Hz? (h = 6,6 · 10⁻³⁴ J·s)`,
      r: H * f,
      d: [H / f, f / H, H * f * 10, H * f / 10],
      f: (v) => sci(v, 'J'),
      x: expl('E = h·f', 'A energia de cada fóton é proporcional à frequência.', `6,6 · 10⁻³⁴ · ${sci(f)} = ${sci(H * f)} J.`),
    };
  },
  // 2. cor mais energética
  (r) => ({
    e: `${r.pick(['Qual destas cores de luz tem fótons com MAIS energia?', 'Os fótons de qual destas cores carregam mais energia cada um?'])}`,
    r: 'violeta',
    d: ['vermelho', 'laranja', 'amarelo', 'verde'],
    x: expl('E = h·f', 'Do vermelho ao violeta, a frequência aumenta (e o comprimento de onda diminui). Maior frequência, mais energia por fóton. Por isso o ultravioleta queima a pele e o infravermelho não.', ''),
  }),
  // 3. fotoelétrico: frequência importa
  (r) => ({
    e: `Uma luz vermelha ${r.pick(['muito intensa', 'fortíssima'])} não arranca elétrons de uma placa de zinco, mas uma luz ultravioleta fraca arranca. Como se explica isso?`,
    r: 'cada elétron absorve um fóton; só fótons de frequência alta têm energia suficiente',
    d: ['a luz vermelha é absorvida pelo ar antes de chegar à placa', 'a luz ultravioleta tem mais fótons por segundo', 'a intensidade da luz não tem relação com a energia', 'o zinco só reage com luz invisível'],
    x: expl('efeito fotoelétrico (Einstein, 1905)', 'A energia chega em pacotes (fótons) de valor h·f. Intensidade alta significa muitos fótons, mas cada um com pouca energia, se a frequência for baixa. Um elétron não soma vários fótons.', ''),
  }),
  // 4. meia-vida
  (r) => {
    const m = r.pick([80, 160, 64, 200]), T = r.pick([5, 8, 10, 2]), n = r.pick([2, 3, 4]);
    return {
      e: `Uma amostra tem ${m} g de um isótopo radioativo de meia-vida ${T} ${T === 2 ? 'horas' : 'anos'}. Quanto resta desse isótopo depois de ${n * T} ${T === 2 ? 'horas' : 'anos'}?`,
      r: m / 2 ** n,
      d: [m / (2 * n), m / 2 ** (n + 1), m / n, m / 2],
      f: u('g'),
      x: expl('cada meia-vida corta pela metade', `${n * T} ÷ ${T} = ${n} meias-vidas: ${m} → ${[...Array(n)].map((_, k) => N(m / 2 ** (k + 1))).join(' → ')}.`, `Restam ${N(r2(m / 2 ** n))} g.`),
    };
  },
  // 5. tipos de radiação
  (r) => {
    const [tipo, resp, d] = r.pick([
      ['alfa (α)', 'um núcleo de hélio: 2 prótons e 2 nêutrons', ['um elétron emitido pelo núcleo', 'uma onda eletromagnética de alta energia', 'um nêutron livre', 'um próton isolado']],
      ['beta (β⁻)', 'um elétron emitido pelo núcleo', ['um núcleo de hélio: 2 prótons e 2 nêutrons', 'uma onda eletromagnética de alta energia', 'um nêutron livre', 'um próton isolado']],
      ['gama (γ)', 'uma onda eletromagnética de alta energia', ['um núcleo de hélio: 2 prótons e 2 nêutrons', 'um elétron emitido pelo núcleo', 'um nêutron livre', 'um próton isolado']],
    ]);
    return {
      e: `O que é a radiação ${tipo}?`,
      r: resp,
      d,
      x: expl('as três radiações', 'Alfa: núcleo de hélio (carga +2). Beta: elétron que sai do núcleo quando um nêutron vira próton. Gama: onda eletromagnética, sem carga e sem massa.', ''),
    };
  },
  // 6. penetração
  (r) => ({
    e: `${r.pick(['Qual radiação é barrada por uma simples folha de papel?', 'Qual destas radiações tem o MENOR poder de penetração?'])}`,
    r: 'alfa',
    d: ['gama', 'beta', 'raios X', 'nêutrons rápidos'],
    x: expl('massa e carga freiam a radiação', 'A alfa é pesada e tem carga +2: interage muito e para logo (papel ou pele). A beta passa o papel, mas para numa placa de alumínio. A gama exige chumbo ou concreto grosso.', ''),
  }),
  // 7. fissão e fusão
  (r) => {
    const [ctx, resp, outra] = r.pick([['no Sol', 'fusão nuclear: núcleos leves se unem', 'fissão nuclear: núcleos pesados se partem'], ['numa usina nuclear como Angra', 'fissão nuclear: núcleos pesados se partem', 'fusão nuclear: núcleos leves se unem']]);
    return {
      e: `Que processo libera energia ${ctx}?`,
      r: resp,
      d: [outra, 'combustão do hidrogênio com oxigênio', 'reação química de oxidação do urânio', 'decaimento alfa do hélio'],
      x: expl('fissão × fusão', 'Na fissão, um núcleo pesado (como o urânio-235) se divide ao absorver um nêutron. Na fusão, núcleos leves (hidrogênio) se juntam formando hélio. Nos dois casos, um pouco de massa vira energia (E = m·c²).', ''),
    };
  },
  // 8. E = m·c²
  (r) => {
    const m = r.pick([1, 2, 0.5, 5]);
    const E = m * 1e-3 * 9e16;
    return {
      e: `Quanta energia corresponde a ${N(m)} g de massa, pela equação de Einstein? (c = 3 · 10⁸ m/s)`,
      r: E,
      d: [m * 1e-3 * 3e8, m * 9e16, E / 10, m * 1e-3 * 9e8],
      f: (v) => sci(v, 'J'),
      x: expl('E = m·c²', `Use a massa em kg: ${N(m)} g = ${sci(m * 1e-3)} kg; c² = 9 · 10¹⁶.`, `E = ${sci(m * 1e-3)} · 9 · 10¹⁶ = ${sci(E)} J.`),
    };
  },
  // 9. postulado da relatividade
  (r) => ({
    e: `Uma nave a ${r.pick(['50%', '80%'])} da velocidade da luz acende um farol para a frente. Que velocidade da luz do farol mede um observador parado na Terra?`,
    r: 'c, a mesma velocidade da luz de sempre',
    d: ['c mais a velocidade da nave', 'c menos a velocidade da nave', 'zero, porque a luz fica presa na nave', 'o dobro de c'],
    x: expl('2º postulado de Einstein', 'A velocidade da luz no vácuo é a mesma para todos os observadores, qualquer que seja o movimento da fonte. Foi daí que surgiram a dilatação do tempo e a contração do espaço.', ''),
  }),
  // 10. dilatação do tempo
  (r) => ({
    e: `${r.pick(['Um astronauta viaja muito rápido e volta à Terra.', 'Um gêmeo faz uma viagem de ida e volta a uma velocidade próxima à da luz.'])} Comparado a quem ficou na Terra, o que se espera?`,
    r: 'o viajante envelheceu menos',
    d: ['o viajante envelheceu mais', 'os dois envelheceram igualmente', 'o viajante voltou mais jovem do que partiu', 'quem ficou na Terra não envelheceu'],
    x: expl('dilatação do tempo', 'Relógios em alta velocidade marcam menos tempo que os parados. O efeito é real e medido em satélites de GPS e em partículas como o múon.', ''),
  }),
  // 11. átomo de Bohr: emissão
  (r) => ({
    e: `No modelo de Bohr, ${r.pick(['quando um átomo emite luz?', 'o que acontece quando o átomo emite um fóton?'])}`,
    r: 'quando um elétron passa de um nível de energia mais alto para um mais baixo',
    d: ['quando um elétron passa de um nível mais baixo para um mais alto', 'enquanto o elétron gira em qualquer órbita', 'quando o núcleo perde um próton', 'sempre que o átomo é aquecido, sem mudança de nível'],
    x: expl('níveis de energia quantizados', 'O elétron só fica em certos níveis. Ao descer de nível, a diferença de energia sai como um fóton: E = h·f. Para subir, ele precisa absorver exatamente essa energia.', ''),
  }),
  // 12. energia cinética do fotoelétron
  (r) => {
    const [Ef, W] = r.pick([[5, 2], [6, 4.3], [4, 2.3], [3.5, 2.2], [7, 4.5]]);
    return {
      e: `Um fóton de ${N(Ef)} eV atinge um metal cuja função trabalho é ${N(W)} eV. Qual é a energia cinética máxima do elétron arrancado?`,
      r: Ef - W,
      d: [Ef + W, Ef, W, Ef / W],
      f: u('eV'),
      x: expl('Ec = h·f − W', 'Parte da energia do fóton é gasta para arrancar o elétron (função trabalho); o resto vira energia cinética.', `${N(Ef)} − ${N(W)} = ${N(r2(Ef - W))} eV.`),
    };
  },
  // 13. energia do fóton pelo comprimento de onda
  (r) => {
    const lam = r.pick([620, 413, 310, 248, 496]);
    return {
      e: `Qual é a energia de um fóton de comprimento de onda ${lam} nm? (Use h·c ≈ 1 240 eV·nm.)`,
      r: 1240 / lam,
      d: [lam / 1240, 1240 * lam / 1000, 1240 / lam * 2, 1240 / lam / 2],
      f: u('eV'),
      x: expl('E = h·c/λ', 'Comprimento de onda menor, energia maior.', `1 240 ÷ ${lam} = ${N(r2(1240 / lam))} eV.`),
    };
  },
  // 14. carbono-14
  (r) => {
    const [frac, n] = r.pick([['1/4', 2], ['1/8', 3], ['1/2', 1], ['1/16', 4]]);
    return {
      e: `Um fóssil tem ${frac} da quantidade de carbono-14 de um ser vivo atual. Sabendo que a meia-vida do carbono-14 é de cerca de 5 730 anos, qual é a idade aproximada do fóssil?`,
      r: 5730 * n,
      d: [5730 * (n + 1), 5730 / n, 5730 * n * 2, 5730 * (n - 1) || 2865],
      f: (v) => `${N(v)} anos`,
      x: expl('contar as meias-vidas', `${frac} = (1/2)${sup(n)}: passaram ${n} meia${n > 1 ? 's' : ''}-vida${n > 1 ? 's' : ''}.`, `${n} · 5 730 = ${N(5730 * n)} anos.`),
    };
  },
  // 15. quem explicou
  (r) => ({
    e: `${r.pick(['Que ideia Einstein usou, em 1905, para explicar o efeito fotoelétrico?', 'Qual foi a explicação de Einstein para o efeito fotoelétrico, que lhe rendeu o Nobel?'])}`,
    r: 'a luz é formada por pacotes de energia (fótons), cada um com energia h·f',
    d: ['a luz é uma onda contínua, cuja energia depende só da intensidade', 'o tempo passa mais devagar para objetos rápidos', 'a massa pode ser convertida em energia (E = m·c²)', 'os elétrons giram em órbitas circulares fixas'],
    x: expl('quantização da luz', 'Einstein recebeu o Nobel de 1921 pelo efeito fotoelétrico, não pela relatividade. A ideia de fóton partiu do trabalho de Planck sobre a radiação do corpo negro.', ''),
  }),
  // 16. raios X
  (r) => ({
    e: `${r.pick(['Por que os raios X mostram os ossos numa radiografia?', 'Como os raios X produzem a imagem dos ossos numa radiografia?'])}`,
    r: 'são fótons de alta energia que atravessam os tecidos moles, mas são mais absorvidos pelos ossos',
    d: ['são partículas com carga que grudam nos ossos', 'são ondas sonoras que ecoam nos ossos', 'são luz visível muito intensa', 'tornam os ossos radioativos por alguns minutos'],
    x: expl('absorção depende do material', 'Os ossos, com cálcio, absorvem mais raios X que a pele e os músculos. Onde a radiação passa, o filme (ou sensor) escurece; atrás dos ossos, fica claro.', ''),
  }),
  // 17. nêutrons no núcleo
  (r) => {
    const [nome, Z, A] = r.pick([['urânio-235', 92, 235], ['carbono-14', 6, 14], ['cobalto-60', 27, 60], ['iodo-131', 53, 131], ['césio-137', 55, 137]]);
    return {
      e: `Quantos nêutrons tem o núcleo do ${nome}, cujo número atômico é ${Z}?`,
      r: A - Z,
      d: [A, Z, A + Z, A - 2 * Z],
      x: expl('A = Z + N', `O número de massa (${A}) é a soma de prótons (${Z}) e nêutrons.`, `${A} − ${Z} = ${A - Z} nêutrons.`),
    };
  },
];

const medio = [
  // 1. energia do fóton pelo λ (em J)
  (r) => {
    const lam = r.pick([500, 600, 400, 300]);
    const E = (H * 3e8) / (lam * 1e-9);
    return {
      e: `Qual é a energia de um fóton de ${lam} nm? (h = 6,6 · 10⁻³⁴ J·s; c = 3 · 10⁸ m/s)`,
      r: E,
      d: [(H * lam * 1e-9) / 3e8, H * 3e8 * lam * 1e-9, E * 10, E / 3e8 * 1e8],
      f: (v) => sci(v, 'J'),
      x: expl('E = h·c/λ', `λ = ${lam} · 10⁻⁹ m.`, `6,6 · 10⁻³⁴ · 3 · 10⁸ ÷ (${lam} · 10⁻⁹) = ${sci(E)} J.`),
    };
  },
  // 2. fótons por segundo
  (r) => {
    const [P, Ef] = r.pick([[1e-3, 3.3e-19], [5e-3, 4e-19], [2e-3, 2e-19], [1, 4e-19]]);
    return {
      e: `Um laser de ${P >= 1 ? `${N(P)} W` : `${N(P * 1000)} mW`} emite fótons de ${sci(Ef)} J cada. Quantos fótons ele emite por segundo?`,
      r: P / Ef,
      d: [Ef / P, P * Ef, (P / Ef) / 1000, (P / Ef) * 1000],
      f: (v) => sci(v),
      x: expl('n = P/E_fóton', 'Potência é energia por segundo; cada fóton leva um pacote E.', `${sci(P)} ÷ ${sci(Ef)} = ${sci(P / Ef)} fótons por segundo.`),
    };
  },
  // 3. frequência de corte
  (r) => {
    const W = r.pick([4, 2, 6, 3]);
    return {
      e: `A função trabalho de um metal é ${W} eV. Qual é a frequência mínima da luz capaz de arrancar elétrons dele? (h = 4 · 10⁻¹⁵ eV·s)`,
      r: W / 4e-15,
      d: [W * 4e-15, 4e-15 / W, W / 4e-15 / 10, W / 4e-15 * 2],
      f: (v) => sci(v, 'Hz'),
      x: expl('h·f₀ = W', 'Na frequência de corte, o fóton tem energia exata para soltar o elétron, sem sobra.', `f₀ = ${W} ÷ (4 · 10⁻¹⁵) = ${sci(W / 4e-15)} Hz.`),
    };
  },
  // 4. Bohr: energia emitida
  (r) => {
    const [a, b] = r.pick([[2, 1], [3, 2], [3, 1], [4, 2], [4, 1]]);
    const E = BOHR(b) - BOHR(a);
    return {
      e: `No átomo de hidrogênio, os níveis valem Eₙ = −13,6/n² eV. Que energia tem o fóton emitido quando o elétron passa do nível ${a} para o nível ${b}?`,
      r: -E,
      d: [13.6 / a, 13.6 / b, -BOHR(a), 13.6 * (1 / b - 1 / a)],
      f: u('eV'),
      x: expl('E_fóton = E_inicial − E_final', `E${a === 2 ? '₂' : a === 3 ? '₃' : '₄'} = ${N(r2(BOHR(a)))} eV; E${b === 1 ? '₁' : '₂'} = ${N(r2(BOHR(b)))} eV.`, `${N(r2(BOHR(a)))} − (${N(r2(BOHR(b)))}) = ${N(r2(-E))} eV.`),
    };
  },
  // 5. ionização
  (r) => {
    const n = r.pick([1, 2, 3]);
    return {
      e: `No átomo de hidrogênio (Eₙ = −13,6/n² eV), qual é a energia mínima para ionizar o átomo, isto é, arrancar o elétron, se ele está no nível ${n}?`,
      r: 13.6 / (n * n),
      d: [13.6 / n, 13.6, 13.6 * n * n, 13.6 / (n * n) / 2],
      f: u('eV'),
      x: expl('levar o elétron até E = 0', `Ionizar é levar o elétron do nível ${n} (energia ${N(r2(BOHR(n)))} eV) até 0.`, `${N(r2(13.6 / (n * n)))} eV.`),
    };
  },
  // 6. dilatação do tempo
  (r) => {
    const [v, gtxt, t0, t] = r.pick([[0.6, '1,25', 8, 10], [0.8, '5/3', 6, 10], [0.6, '1,25', 4, 5], [0.8, '5/3', 12, 20]]);
    return {
      e: `Uma nave viaja a ${N(v)}c (fator de Lorentz γ = ${gtxt}). Pelo relógio da nave, a viagem dura ${t0} anos. Quanto tempo ela dura para quem está na Terra?`,
      r: t,
      d: [t0, t0 * v, t0 / (t / t0) , t0 + t0 * v],
      f: (x) => `${N(r2(x))} anos`,
      x: expl('Δt = γ·Δt₀', 'O tempo próprio (medido na nave) é o menor; para a Terra, o tempo é γ vezes maior.', `${gtxt} · ${t0} = ${t} anos.`),
    };
  },
  // 7. contração do comprimento
  (r) => {
    const [v, f, L] = r.pick([[0.8, 0.6, 100], [0.6, 0.8, 50], [0.8, 0.6, 200], [0.6, 0.8, 150]]);
    return {
      e: `Uma nave tem ${L} m de comprimento quando parada. Que comprimento ela tem, para um observador na Terra, quando passa a ${N(v)}c? (√(1 − v²/c²) = ${N(f)})`,
      r: L * f,
      d: [L / f, L, L * v, L * (1 - v)],
      f: u('m'),
      x: expl('L = L₀·√(1 − v²/c²)', 'O comprimento na direção do movimento encolhe para quem vê a nave passar.', `${L} · ${N(f)} = ${N(L * f)} m.`),
    };
  },
  // 8. meia-vida a partir da fração
  (r) => {
    const [frac, n, t] = r.pick([['1/8', 3, 24], ['1/4', 2, 30], ['1/16', 4, 40], ['1/8', 3, 15]]);
    return {
      e: `Depois de ${t} horas, resta ${frac} da quantidade inicial de um material radioativo. Qual é a sua meia-vida?`,
      r: t / n,
      d: [t / (n + 1), t * n, t / 2, t / (2 ** n)],
      f: (v) => `${N(r2(v))} h`,
      x: expl('fração = (1/2)ⁿ', `${frac} = (1/2)${sup(n)}: foram ${n} meias-vidas.`, `${t} ÷ ${n} = ${N(r2(t / n))} h.`),
    };
  },
  // 9. decaimento alfa
  (r) => {
    const [el, Z, A, prod] = r.pick([['urânio-238', 92, 238, 'tório'], ['rádio-226', 88, 226, 'radônio'], ['polônio-210', 84, 210, 'chumbo'], ['plutônio-239', 94, 239, 'urânio']]);
    return {
      e: `O ${el} (Z = ${Z}) emite uma partícula alfa e vira ${prod}. Quais são o número atômico e o número de massa do núcleo formado?`,
      r: `Z = ${Z - 2} e A = ${A - 4}`,
      d: [`Z = ${Z - 4} e A = ${A - 2}`, `Z = ${Z + 1} e A = ${A}`, `Z = ${Z - 2} e A = ${A - 2}`, `Z = ${Z} e A = ${A - 4}`],
      x: expl('alfa = ⁴₂He', 'A partícula alfa leva 2 prótons e 2 nêutrons: Z cai 2 e A cai 4.', `${Z} − 2 = ${Z - 2}; ${A} − 4 = ${A - 4}.`),
    };
  },
  // 10. decaimento beta
  (r) => {
    const [el, Z, A, prod] = r.pick([['carbono-14', 6, 14, 'nitrogênio'], ['césio-137', 55, 137, 'bário'], ['iodo-131', 53, 131, 'xenônio'], ['cobalto-60', 27, 60, 'níquel']]);
    return {
      e: `O ${el} (Z = ${Z}) sofre decaimento beta (β⁻) e vira ${prod}. Quais são o número atômico e o número de massa do núcleo formado?`,
      r: `Z = ${Z + 1} e A = ${A}`,
      d: [`Z = ${Z - 1} e A = ${A}`, `Z = ${Z + 1} e A = ${A + 1}`, `Z = ${Z - 2} e A = ${A - 4}`, `Z = ${Z} e A = ${A - 1}`],
      x: expl('beta: nêutron vira próton', 'No núcleo, um nêutron se transforma em próton e solta um elétron. Z sobe 1; A não muda.', `Z = ${Z + 1}; A = ${A}.`),
    };
  },
  // 11. de Broglie
  (r) => {
    const p = r.pick([3.3e-24, 6.6e-24, 1.32e-23, 2.2e-24]);
    return {
      e: `Uma partícula tem quantidade de movimento de ${sci(p)} kg·m/s. Qual é o seu comprimento de onda de de Broglie? (h = 6,6 · 10⁻³⁴ J·s)`,
      r: H / p,
      d: [p / H, H * p, (H / p) * 10, (H / p) / 10],
      f: (v) => sci(v, 'm'),
      x: expl('λ = h/p', 'Toda partícula em movimento tem um comprimento de onda associado (dualidade onda-partícula).', `6,6 · 10⁻³⁴ ÷ ${sci(p)} = ${sci(H / p)} m.`),
    };
  },
  // 12. energia de fissão
  (r) => {
    const m = r.pick([0.2, 0.5, 1, 0.1]);
    const E = m * 1e-3 * 9e16;
    return {
      e: `Numa série de fissões, a soma das massas dos produtos é ${N(m)} g menor que a massa inicial. Quanta energia foi liberada? (c = 3 · 10⁸ m/s)`,
      r: E,
      d: [m * 1e-3 * 3e8, m * 9e16, E * 1000, E / 2],
      f: (v) => sci(v, 'J'),
      x: expl('energia = defeito de massa · c²', `Δm = ${sci(m * 1e-3)} kg.`, `${sci(m * 1e-3)} · 9 · 10¹⁶ = ${sci(E)} J.`),
    };
  },
  // 13. lei de Wien
  (r) => {
    const [T, ctx] = r.pick([[5800, 'da superfície do Sol'], [2900, 'do filamento de uma lâmpada'], [10000, 'de uma estrela azulada'], [3000, 'de uma estrela avermelhada']]);
    const lam = 2.9e-3 / T;
    return {
      e: `A temperatura ${ctx} é de cerca de ${N(T)} K. Em que comprimento de onda a sua emissão é máxima? (λ_máx · T = 2,9 · 10⁻³ m·K)`,
      r: lam * 1e9,
      d: [lam * 1e9 * 2, lam * 1e9 / 2, T / 2.9, lam * 1e6],
      f: (v) => `${N(Math.round(v))} nm`,
      x: expl('lei de Wien', 'Quanto mais quente, menor o comprimento de onda do pico: o corpo vai do vermelho para o azul.', `λ = 2,9 · 10⁻³ ÷ ${N(T)} = ${sci(lam)} m = ${N(Math.round(lam * 1e9))} nm.`),
    };
  },
  // 14. iodo-131 no hospital
  (r) => {
    const [frac, n] = r.pick([['1/16', 4], ['1/8', 3], ['1/32', 5], ['1/4', 2]]);
    return {
      e: `O iodo-131, usado em tratamentos da tireoide, tem meia-vida de 8 dias. Quanto tempo leva para a sua atividade cair a ${frac} do valor inicial?`,
      r: 8 * n,
      d: [8 * (n + 1), 8 / n, 8 * 2 ** n, 8 * (n - 1)],
      f: (v) => `${N(v)} dias`,
      x: expl('fração = (1/2)ⁿ', `${frac} = (1/2)${sup(n)}: ${n} meias-vidas.`, `${n} · 8 = ${8 * n} dias.`),
    };
  },
  // 15. intensidade no fotoelétrico
  (r) => ({
    e: `Num experimento de efeito fotoelétrico, a ${r.pick(['intensidade da luz é dobrada', 'luz fica duas vezes mais forte'])}, mantendo a mesma frequência (acima da de corte). O que acontece?`,
    r: 'sai o dobro de elétrons por segundo, com a mesma energia cinética máxima',
    d: ['os elétrons saem com o dobro de energia cinética', 'nada muda', 'os elétrons param de sair', 'a função trabalho do metal cai pela metade'],
    x: expl('mais fótons, não fótons mais fortes', 'Intensidade maior significa mais fótons por segundo: mais elétrons arrancados. A energia de cada um depende só da frequência: Ec = h·f − W.', ''),
  }),
  // 16. espectro de linhas
  (r) => ({
    e: `${r.pick(['Por que um gás aquecido emite luz só em algumas cores (espectro de linhas)?', 'Por que o espectro de emissão do hidrogênio é formado por linhas separadas?'])}`,
    r: 'os elétrons só podem ocupar certos níveis de energia; cada linha é um salto entre dois níveis',
    d: ['o gás absorve todas as outras cores', 'o prisma do espectroscópio separa só algumas cores', 'os átomos emitem luz contínua, mas o olho só percebe algumas cores', 'cada cor vem de um tipo diferente de átomo misturado ao gás'],
    x: expl('quantização da energia', 'Cada salto tem uma diferença de energia fixa e produz um fóton de frequência certa. Por isso cada elemento tem um espectro próprio, como uma impressão digital, usado para saber do que são feitas as estrelas.', ''),
  }),
  // 17. massa em repouso não alcança c
  (r) => ({
    e: `${r.pick(['Por que uma nave não pode ser acelerada até a velocidade da luz?', 'O que impede um corpo com massa de alcançar a velocidade da luz?'])}`,
    r: 'a energia necessária cresce sem limite à medida que a velocidade se aproxima de c',
    d: ['o atrito com o espaço vazio a freia', 'a luz empurra a nave para trás', 'a massa da nave diminui até zero', 'os motores derretem antes'],
    x: expl('E = γ·m·c²', 'O fator γ = 1/√(1 − v²/c²) vai ao infinito quando v se aproxima de c. Só partículas sem massa, como o fóton, andam exatamente a c.', ''),
  }),
];

const dificil = [
  // 1. soma relativística de velocidades
  (r) => {
    const [a, b] = r.pick([[0.8, 0.5], [0.6, 0.6], [0.5, 0.5], [0.9, 0.5]]);
    const v = (a + b) / (1 + a * b);
    return {
      e: `Uma nave passa pela Terra a ${N(a)}c e lança, para a frente, uma sonda a ${N(b)}c em relação à nave. Qual é a velocidade da sonda para a Terra? (u = (v₁ + v₂)/(1 + v₁·v₂/c²))`,
      r: v,
      d: [a + b, a * b, Math.abs(a - b), 1],
      f: (x) => `${N(r2(x))}c`,
      x: expl('soma relativística de velocidades', `(${N(a)} + ${N(b)}) ÷ (1 + ${N(a)} · ${N(b)}) = ${N(a + b)} ÷ ${N(1 + a * b)}.`, `≈ ${N(r2(v))}c: sempre menor que c.`),
    };
  },
  // 2. potencial de corte
  (r) => {
    const [Ef, W] = r.pick([[6, 2.3], [5, 2.2], [4.5, 2.5], [8, 4.3]]);
    return {
      e: `Fótons de ${N(Ef)} eV iluminam um metal de função trabalho ${N(W)} eV. Qual é o potencial de corte (a tensão que freia até os elétrons mais rápidos)?`,
      r: Ef - W,
      d: [Ef + W, Ef, W, (Ef - W) / 2],
      f: u('V'),
      x: expl('e·V₀ = Ec máx = h·f − W', 'Em eV, a energia cinética máxima tem o mesmo número que o potencial de corte em volts.', `V₀ = ${N(Ef)} − ${N(W)} = ${N(r2(Ef - W))} V.`),
    };
  },
  // 3. fotoelétrico com comprimento de onda
  (r) => {
    const [lam, W] = r.pick([[200, 4.2], [248, 2.3], [310, 2], [155, 4.5]]);
    const Ef = 1240 / lam;
    return {
      e: `Luz de ${lam} nm incide num metal de função trabalho ${N(W)} eV. Qual é a energia cinética máxima dos elétrons emitidos? (h·c ≈ 1 240 eV·nm)`,
      r: Ef - W,
      d: [Ef, Ef + W, W, lam / 1240],
      f: u('eV'),
      x: expl('E = h·c/λ, depois Ec = E − W', `E = 1 240 ÷ ${lam} = ${N(r2(Ef))} eV.`, `Ec = ${N(r2(Ef))} − ${N(W)} = ${N(r2(Ef - W))} eV.`),
    };
  },
  // 4. função trabalho pelo gráfico
  (r) => {
    const [f1, E1, f2, E2] = r.pick([[6, 0.4, 10, 2], [8, 1, 12, 2.6], [7, 0.8, 9, 1.6], [5, 0.2, 10, 2.2]]);
    const h = (E2 - E1) / ((f2 - f1) * 1e14);
    const W = h * f1 * 1e14 - E1;
    return {
      e: `Num experimento fotoelétrico, luz de ${f1} · 10¹⁴ Hz dá elétrons com até ${N(E1)} eV, e luz de ${f2} · 10¹⁴ Hz dá até ${N(E2)} eV. Qual é a função trabalho do metal?`,
      r: W,
      d: [E1, E2 - E1, W + E1, h * f2 * 1e14],
      f: u('eV'),
      x: expl('o gráfico Ec × f é uma reta de inclinação h', `h = (${N(E2)} − ${N(E1)}) ÷ ((${f2} − ${f1}) · 10¹⁴) = ${sci(h)} eV·s.`, `W = h·f₁ − Ec₁ = ${N(r2(h * f1 * 1e14))} − ${N(E1)} = ${N(r2(W))} eV.`),
    };
  },
  // 5. linha do hidrogênio
  (r) => {
    const [a, b] = r.pick([[3, 2], [4, 2], [2, 1], [5, 2]]);
    const E = BOHR(a) - BOHR(b);
    const lam = 1240 / E;
    return {
      e: `Qual é o comprimento de onda do fóton emitido quando o elétron do hidrogênio passa do nível ${a} para o nível ${b}? (Eₙ = −13,6/n² eV; h·c ≈ 1 240 eV·nm)`,
      r: lam,
      d: [1240 / (13.6 / (b * b)), 1240 / (13.6 / (a * a)), lam / 2, lam * 2],
      f: (v) => `${N(Math.round(v))} nm`,
      x: expl('E = E_a − E_b e λ = h·c/E', `E = ${N(r2(BOHR(a)))} − (${N(r2(BOHR(b)))}) = ${N(r2(E))} eV.`, `λ = 1 240 ÷ ${N(r2(E))} ≈ ${N(Math.round(lam))} nm${a === 3 && b === 2 ? ' (a linha vermelha do hidrogênio)' : ''}.`),
    };
  },
  // 6. idade de uma rocha
  (r) => {
    const [raz, n, T] = r.pick([[3, 2, 1.3], [7, 3, 1.3], [1, 1, 4.5], [3, 2, 0.7]]);
    return {
      e: `Numa rocha, para cada átomo restante de um isótopo radioativo há ${raz} átomo${raz > 1 ? 's' : ''} do produto do seu decaimento (que não havia no início). A meia-vida é ${N(T)} bilhão${T >= 2 ? 'ões' : ''} de anos. Qual é a idade da rocha?`,
      r: n * T,
      d: [raz * T, (n + 1) * T, T, T / (raz + 1)],
      f: (v) => `${N(r2(v))} bilh${r2(v) >= 2 ? 'ões' : 'ão'} de anos`,
      x: expl('fração restante = 1/(1 + razão)', `Restou 1 de cada ${raz + 1} átomos: 1/${raz + 1} = (1/2)${sup(n)}, ou seja, ${n} meia${n > 1 ? 's' : ''}-vida${n > 1 ? 's' : ''}.`, `${n} · ${N(T)} = ${N(r2(n * T))} bilh${r2(n * T) >= 2 ? 'ões' : 'ão'} de anos.`),
    };
  },
  // 7. múons
  (r) => {
    const [g, v] = r.pick([[5, 0.98], [10, 0.995], [3, 0.94]]);
    const d = v * 3e8 * g * 2e-6;
    return {
      e: `Um múon vive em média 2 µs quando parado. Criado no alto da atmosfera a ${N(v, 3).replace(/0+$/, '')}c (γ = ${g}), que distância média ele percorre, para quem está na Terra? (c = 3 · 10⁸ m/s)`,
      r: d,
      d: [d / g, d * g, d / 2, 3e8 * 2e-6],
      f: (x) => `${N(Math.round(x))} m`,
      x: expl('dilatação do tempo: Δt = γ·Δt₀', `Para a Terra, o múon vive ${g} · 2 = ${2 * g} µs.`, `d = ${N(v, 3).replace(/0+$/, '')} · 3 · 10⁸ · ${2 * g} · 10⁻⁶ ≈ ${N(Math.round(d))} m. Sem a relatividade, seriam só ${N(Math.round(d / g))} m, e quase nenhum chegaria ao chão.`),
    };
  },
  // 8. energia de repouso do elétron
  (r) => ({
    e: `Qual é a energia de repouso do elétron (m = 9,1 · 10⁻³¹ kg), em MeV? (c = 3 · 10⁸ m/s; 1 MeV = 1,6 · 10⁻¹³ J)`,
    r: 0.51,
    d: [8.19, 0.051, 5.1, 938],
    f: (v) => `${N(v)} MeV`,
    x: expl('E = m·c²', `9,1 · 10⁻³¹ · 9 · 10¹⁶ = 8,19 · 10⁻¹⁴ J.`, `8,19 · 10⁻¹⁴ ÷ 1,6 · 10⁻¹³ ≈ 0,51 MeV.`),
  }),
  // 9. fusão do hidrogênio
  (r) => {
    const m = r.pick([1, 2, 10]);
    const E = m * 0.007 * 9e16;
    return {
      e: `Na fusão do hidrogênio em hélio, cerca de 0,7% da massa vira energia. Quanta energia sai da fusão de ${m} kg de hidrogênio? (c = 3 · 10⁸ m/s)`,
      r: E,
      d: [m * 9e16, m * 0.07 * 9e16, m * 0.007 * 3e8, E / 1000],
      f: (v) => sci(v, 'J'),
      x: expl('E = Δm·c²', `Δm = 0,007 · ${m} = ${N(0.007 * m, 3)} kg.`, `${N(0.007 * m, 3)} · 9 · 10¹⁶ = ${sci(E)} J.`),
    };
  },
  // 10. fótons de uma lâmpada
  (r) => {
    const [P, ef, lam] = r.pick([[100, 0.05, 600], [60, 0.1, 550], [20, 0.25, 500], [10, 0.5, 660]]);
    const Ef = (H * 3e8) / (lam * 1e-9);
    const n = (P * ef) / Ef;
    return {
      e: `Uma lâmpada de ${P} W converte ${N(ef * 100)}% da potência em luz visível de ${lam} nm (o resto vira calor). Quantos fótons visíveis ela emite por segundo? (h = 6,6 · 10⁻³⁴ J·s; c = 3 · 10⁸ m/s)`,
      r: n,
      d: [P / Ef, n * 10, n / 10, (P * ef) / (H * 3e8)],
      f: (v) => sci(v),
      x: expl('n = P_luz / E_fóton', `P_luz = ${N(P * ef)} W; E_fóton = 6,6 · 10⁻³⁴ · 3 · 10⁸ ÷ (${lam} · 10⁻⁹) = ${sci(Ef)} J.`, `n = ${N(P * ef)} ÷ ${sci(Ef)} = ${sci(n)} fótons por segundo.`),
    };
  },
  // 11. elétron acelerado: de Broglie
  () => ({
    e: `Um elétron (m = 9,1 · 10⁻³¹ kg) é acelerado do repouso por 150 V. Qual é, aproximadamente, o seu comprimento de onda de de Broglie? (h = 6,6 · 10⁻³⁴ J·s; e = 1,6 · 10⁻¹⁹ C)`,
    r: '1 · 10⁻¹⁰ m (cerca do tamanho de um átomo)',
    d: ['1 · 10⁻⁶ m', '1 · 10⁻¹⁴ m', '6,6 · 10⁻³⁴ m', '1 · 10⁻⁵ m'],
    x: expl('p = √(2·m·e·U) e λ = h/p', 'Ec = 1,6 · 10⁻¹⁹ · 150 = 2,4 · 10⁻¹⁷ J. p = √(2 · 9,1 · 10⁻³¹ · 2,4 · 10⁻¹⁷) ≈ 6,6 · 10⁻²⁴ kg·m/s.', `λ = 6,6 · 10⁻³⁴ ÷ 6,6 · 10⁻²⁴ ≈ 10⁻¹⁰ m. Por isso elétrons servem para "enxergar" átomos no microscópio eletrônico.`),
  }),
  // 12. césio-137 em Goiânia
  (r) => {
    const [frac, n] = r.pick([['1/8', 3], ['1/4', 2], ['1/16', 4]]);
    return {
      e: `O acidente radiológico de Goiânia, em 1987, envolveu césio-137, de meia-vida de cerca de 30 anos. Em que ano a atividade daquele material terá caído a ${frac} da de 1987?`,
      r: 1987 + 30 * n,
      d: [1987 + 30 * (n + 1), 1987 + 30 * (n - 1), 1987 + 30 * 2 ** n, 1987 + (30 * n) / 2],
      f: (v) => String(Math.round(v)),
      x: expl('contar as meias-vidas', `${frac} = (1/2)${sup(n)}: ${n} meias-vidas, ou ${30 * n} anos.`, `1987 + ${30 * n} = ${1987 + 30 * n}.`),
    };
  },
  // 13. energia cinética relativística
  (r) => {
    const [v, g, frac] = r.pick([[0.6, '1,25', 0.25], [0.8, '5/3', 0.67]]);
    return {
      e: `Uma partícula de massa m se move a ${N(v)}c (γ = ${g}). Qual é a sua energia cinética, em termos de m·c²?`,
      r: frac,
      d: [(v * v) / 2, v, v * v, frac + 1],
      f: (x) => `${N(r2(x))}·m·c²`,
      x: expl('Ec = (γ − 1)·m·c²', `Energia total γ·m·c², menos a energia de repouso m·c².`, `(${g} − 1)·m·c² ≈ ${N(r2(frac))}·m·c². A fórmula clássica m·v²/2 daria só ${N(r2((v * v) / 2))}·m·c².`),
    };
  },
  // 14. número de linhas espectrais
  (r) => {
    const n = r.pick([3, 4, 5, 6]);
    const linhas = (n * (n - 1)) / 2;
    return {
      e: `Átomos de hidrogênio são excitados até o nível n = ${n}. Quantas linhas diferentes podem aparecer no espectro quando os elétrons voltam ao nível 1, por todos os caminhos possíveis?`,
      r: linhas,
      d: [n - 1, n, n * n, n * (n - 1)],
      x: expl('cada par de níveis dá uma linha', `Contamos os pares de níveis entre 1 e ${n}: C(${n}, 2).`, `${n} · ${n - 1} ÷ 2 = ${linhas} linhas.`),
    };
  },
  // 15. série radioativa
  (r) => {
    const [ini, Zi, Ai, fim, Zf, Af] = r.pick([['urânio-238', 92, 238, 'chumbo-206', 82, 206], ['tório-232', 90, 232, 'chumbo-208', 82, 208], ['urânio-235', 92, 235, 'chumbo-207', 82, 207]]);
    const a = (Ai - Af) / 4;
    const b = Zf - (Zi - 2 * a);
    return {
      e: `O ${ini} (Z = ${Zi}) decai, por uma série de emissões alfa e beta, até o ${fim} (Z = ${Zf}). Quantas partículas alfa e beta são emitidas?`,
      r: `${a} alfa e ${b} beta`,
      d: [`${b} alfa e ${a} beta`, `${a} alfa e ${a} beta`, `${a * 2} alfa e ${b} beta`, `${a} alfa e ${b + 2} beta`],
      x: expl('primeiro A (só alfa muda), depois Z', `A cai ${Ai - Af}: ${Ai - Af} ÷ 4 = ${a} alfas. Elas baixam Z em ${2 * a}: ${Zi} → ${Zi - 2 * a}. Para chegar a ${Zf}, faltam ${b} betas (cada uma sobe Z em 1).`, `${a} alfa e ${b} beta.`),
    };
  },
  // 16. Wien + Stefan-Boltzmann
  (r) => {
    const k = r.pick([2, 3]);
    return {
      e: `Duas estrelas do mesmo tamanho têm picos de emissão em ${300 * k} nm e ${300} nm. Quantas vezes a potência irradiada pela segunda é maior que a da primeira? (Wien: λ_máx·T = constante; Stefan-Boltzmann: P ∝ T⁴)`,
      r: k ** 4,
      d: [k, k * k, k ** 3, 4 * k],
      x: expl('Wien dá T; Stefan-Boltzmann dá P', `Pico ${k} vezes menor ⇒ temperatura ${k} vezes maior.`, `P ∝ T⁴: ${k}⁴ = ${k ** 4} vezes.`),
    };
  },
];

export default [
  {
    disciplina: 'fisica',
    arquivo: '12-fisica-moderna',
    titulo: 'Física moderna: quântica, relatividade e física nuclear',
    provas: ['ENEM', 'Militares'],
    descricao: 'Fóton e efeito fotoelétrico, átomo de Bohr, dualidade onda-partícula, relatividade restrita, radioatividade, meia-vida, fissão e fusão.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
