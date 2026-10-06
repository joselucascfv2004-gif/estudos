// Química — modelos acrescentados em 2026 para levar estequiometria, soluções e cálculos
// físico-químicos a 50 questões. Entram no fim de cada nível (ver `novos` em util.mjs).
import { expl, num, sup } from './util.mjs';

const u = (un) => (v) => `${num(v)} ${un}`;
const pot = (n) => `10${sup(n)}`;
/** até 3 casas, sem zeros sobrando (0,05 e não 0,050) */
const dec = (v) => num(Math.round(v * 1000) / 1000, Number.isInteger(Math.round(v * 1000) / 100) ? null : 3).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');

// ------------------------------------------------------------- Estequiometria
const estequiometria = [
  [
    (r) => {
      const n = r.pick([0.5, 1, 1.5, 2, 3, 5]);
      const V = n * 22.4;
      return {
        e: `Nas CNTP, um balão contém ${num(V)} L de gás oxigênio. Quantos mols de O₂ há nele? (volume molar nas CNTP = 22,4 L/mol)`,
        r: n,
        d: [V * 22.4, n * 2, n / 2, V / 32],
        f: u('mol'),
        x: expl('n = V ÷ volume molar', 'Nas CNTP, 1 mol de qualquer gás ocupa 22,4 L.', `${num(V)} ÷ 22,4 = ${num(n)} mol.`),
      };
    },
    (r) => {
      const [form, M, elem, mElem] = r.pick([['CO₂', 44, 'carbono', 12], ['H₂O', 18, 'hidrogênio', 2], ['CH₄', 16, 'carbono', 12], ['Fe₂O₃', 160, 'ferro', 112], ['CaCO₃', 100, 'cálcio', 40], ['NaCl', 58.5, 'sódio', 23]]);
      const k = r.pick([1, 2, 3, 5]);
      const m = M * k;
      return {
        e: `Quantos gramas de ${elem} há em ${num(m)} g de ${form}?`,
        r: mElem * k,
        d: [m - mElem * k, (m * mElem) / 100, mElem, m / 2],
        f: u('g'),
        x: expl('proporção em massa dentro da fórmula', `Em ${num(M)} g de ${form} (1 mol), há ${mElem} g de ${elem}.`, `${num(m)} g = ${k} mol → ${k} × ${mElem} = ${mElem * k} g.`),
      };
    },
    (r) => {
      const V = r.pick([4, 6, 10, 12, 20]);
      return {
        e: `Pela reação 2 H₂(g) + O₂(g) → 2 H₂O(g), medida na mesma temperatura e pressão, que volume de O₂ é necessário para reagir com ${V} L de H₂?`,
        r: V / 2,
        d: [V * 2, V, V / 3, V + 2],
        f: u('L'),
        x: expl('lei de Gay-Lussac: volumes na proporção dos coeficientes', 'Nas mesmas condições, a proporção entre volumes de gases é a mesma dos coeficientes (2 : 1).', `${V} ÷ 2 = ${num(V / 2)} L de O₂.`),
      };
    },
    (r) => {
      const [g, M] = r.pick([['CO₂', 44], ['O₂', 32], ['N₂', 28], ['CH₄', 16], ['SO₂', 64]]);
      return {
        e: `Qual é a densidade do gás ${g} nas CNTP? (massa molar ${M} g/mol; volume molar 22,4 L/mol)`,
        r: M / 22.4,
        d: [22.4 / M, M * 22.4, M / 2.24, M / 24.5],
        f: u('g/L'),
        x: expl('densidade de gás: d = M ÷ volume molar', '1 mol tem a massa molar e ocupa 22,4 L nas CNTP.', `${M} ÷ 22,4 = ${num(M / 22.4)} g/L.`),
      };
    },
    (r) => {
      const m = r.pick([10, 20, 50, 100, 200]);
      const co2 = m * 0.44;
      return {
        e: `Aquecendo ${m} g de carbonato de cálcio puro, ocorre CaCO₃ → CaO + CO₂, e o gás sai do recipiente. Qual é a massa do sólido que sobra? (CaCO₃ = 100 g/mol; CO₂ = 44 g/mol)`,
        r: m - co2,
        d: [co2, m, m * 0.44 + m, m / 2],
        f: u('g'),
        x: expl('lei de Lavoisier: massa que sobra = inicial − gás que saiu', 'Cada 100 g de CaCO₃ liberam 44 g de CO₂ e deixam 56 g de CaO.', `CO₂ = ${num(co2)} g; sobram ${m} − ${num(co2)} = ${num(m - co2)} g de CaO.`),
      };
    },
    (r) => {
      const n = r.pick([0.2, 0.5, 2, 4, 10]);
      return {
        e: `A 25 °C e 1 atm, o volume molar dos gases é cerca de 24,5 L/mol. Que volume ocupam ${num(n)} mol de gás carbônico nessas condições?`,
        r: n * 24.5,
        d: [n * 22.4, n / 24.5, 24.5 / n, n * 44],
        f: u('L'),
        x: expl('V = n × volume molar (nas condições dadas)', 'Use o volume molar da temperatura informada, e não o das CNTP.', `${num(n)} × 24,5 = ${num(n * 24.5)} L.`),
      };
    },
  ],
  [
    (r) => {
      const k = r.pick([0.5, 1, 2, 3, 5]);
      const m = 46 * k;
      return {
        e: `Na combustão completa do etanol, C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O, qual massa de CO₂ se forma a partir de ${num(m)} g de etanol? (C₂H₆O = 46 g/mol; CO₂ = 44 g/mol)`,
        r: 88 * k,
        d: [44 * k, m, 132 * k, (88 * k) / 2 + m],
        f: u('g'),
        x: expl('estequiometria: massa → mol → mol → massa', '1 mol de etanol (46 g) forma 2 mol de CO₂ (88 g).', `${num(m)} g = ${num(k)} mol de etanol → ${num(2 * k)} mol de CO₂ = ${num(88 * k)} g.`),
      };
    },
    (r) => {
      const k = r.pick([0.1, 0.5, 1, 2, 4]);
      const m = 40 * k;
      return {
        e: `Na neutralização NaOH + HCl → NaCl + H₂O, qual massa de sal se forma a partir de ${num(m)} g de NaOH, com HCl suficiente? (NaOH = 40 g/mol; NaCl = 58,5 g/mol)`,
        r: 58.5 * k,
        d: [m, 36.5 * k, 18 * k, 117 * k],
        f: u('g'),
        x: expl('proporção 1 : 1 em mols', 'Cada mol de NaOH forma 1 mol de NaCl.', `${num(m)} ÷ 40 = ${num(k)} mol → ${num(k)} × 58,5 = ${num(58.5 * k)} g.`),
      };
    },
    (r) => {
      const nN2 = r.pick([1, 2]), nH2 = r.pick([5, 7, 8, 10]);
      const usado = 3 * nN2, sobra = (nH2 - usado) * 2;
      if (nH2 <= usado) throw new Error('sortear de novo');
      return {
        e: `Misturam-se ${nN2 * 28} g de N₂ com ${nH2 * 2} g de H₂ para a reação N₂ + 3 H₂ → 2 NH₃, que ocorre até o fim. Quantos gramas do reagente em excesso sobram? (N₂ = 28 g/mol; H₂ = 2 g/mol)`,
        r: sobra,
        d: [nH2 * 2, usado * 2, sobra / 2, nN2 * 28 - sobra],
        f: u('g'),
        x: expl('reagente em excesso: o que não reage', `${nN2} mol de N₂ consomem ${usado} mol de H₂; havia ${nH2} mol de H₂.`, `Sobram ${nH2 - usado} mol de H₂ = ${sobra} g.`),
      };
    },
    (r) => {
      const k = r.pick([0.5, 1, 2, 3]);
      const mCO2 = 264 * k;
      return {
        e: `Na fotossíntese, 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. Que massa de glicose uma planta pode produzir a partir de ${num(mCO2)} g de CO₂? (CO₂ = 44 g/mol; glicose = 180 g/mol)`,
        r: 180 * k,
        d: [mCO2, 30 * k, 1080 * k, 180 * k * 6 / 2],
        f: u('g'),
        x: expl('proporção 6 : 1 em mols', 'São necessários 6 mol de CO₂ (264 g) para cada mol de glicose (180 g).', `${num(mCO2)} g = ${num(6 * k)} mol de CO₂ → ${num(k)} mol de glicose = ${num(180 * k)} g.`),
      };
    },
    (r) => {
      const t = r.pick([16, 32, 80, 160, 320]);
      return {
        e: `No alto-forno, Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂. Quantas toneladas de ferro se obtêm a partir de ${t} t de Fe₂O₃ puro? (Fe₂O₃ = 160 g/mol; Fe = 56 g/mol)`,
        r: (t * 112) / 160,
        d: [(t * 56) / 160, t, (t * 160) / 112, t / 2],
        f: u('t'),
        x: expl('proporção em massa (vale para qualquer unidade)', '160 g de Fe₂O₃ dão 2 × 56 = 112 g de Fe; a mesma proporção vale para toneladas.', `${t} × 112 ÷ 160 = ${num((t * 112) / 160)} t.`),
      };
    },
    (r) => {
      const k = r.pick([1, 2, 4]);
      const m = 65 * 2 * k, nN2 = 3 * k;
      return {
        e: `O airbag infla pela reação 2 NaN₃ → 2 Na + 3 N₂. Que volume de N₂, nas CNTP, é produzido por ${m} g de NaN₃? (NaN₃ = 65 g/mol; 22,4 L/mol)`,
        r: nN2 * 22.4,
        d: [2 * k * 22.4, nN2 * 24.5, (m / 65) * 22.4 * 2, nN2 * 28],
        f: u('L'),
        x: expl('massa → mol → volume', `${m} g de NaN₃ = ${2 * k} mol, que formam ${nN2} mol de N₂ (proporção 2 : 3).`, `${nN2} × 22,4 = ${num(nN2 * 22.4)} L.`),
      };
    },
  ],
  [
    (r) => {
      const k = r.pick([0.5, 1, 2, 4]);
      const mS = 32 * k;
      return {
        e: `O ácido sulfúrico é produzido por etapas: S + O₂ → SO₂; 2 SO₂ + O₂ → 2 SO₃; SO₃ + H₂O → H₂SO₄. Que massa de H₂SO₄ se obtém a partir de ${num(mS)} g de enxofre, com rendimento total? (S = 32; H₂SO₄ = 98 g/mol)`,
        r: 98 * k,
        d: [49 * k, 196 * k, mS, 64 * k],
        f: u('g'),
        x: expl('reações sucessivas: siga o átomo de enxofre', 'Cada átomo de S termina num H₂SO₄: a proporção global é 1 mol de S para 1 mol de H₂SO₄.', `${num(mS)} g = ${num(k)} mol de S → ${num(k)} mol de H₂SO₄ = ${num(98 * k)} g.`),
      };
    },
    (r) => {
      const m = r.pick([20, 25, 50, 100]), p = r.pick([0.6, 0.8, 0.9]);
      const V = (m * p * 22.4) / 100;
      return {
        e: `Uma amostra de ${m} g de calcário, ao reagir completamente, liberou ${num(V)} L de CO₂ nas CNTP (CaCO₃ → CaO + CO₂). Qual é a porcentagem de CaCO₃ na amostra? (CaCO₃ = 100 g/mol)`,
        r: p * 100,
        d: [(1 - p) * 100, ((V / 22.4) * 44 / m) * 100, (V / m) * 100, 100],
        f: (v) => `${num(v)}%`,
        x: expl('pureza a partir do produto', 'O volume de gás diz quantos mols de CaCO₃ reagiram; compare com a massa da amostra.', `${num(V)} ÷ 22,4 = ${num(V / 22.4)} mol = ${num((V / 22.4) * 100)} g de CaCO₃; ${num((V / 22.4) * 100)} ÷ ${m} = ${num(p * 100)}%.`),
      };
    },
    (r) => {
      const obtido = r.pick([17, 25.5, 30.6, 13.6]);
      const teorico = 34;
      return {
        e: `Misturam-se 28 g de N₂ com 10 g de H₂ (N₂ + 3 H₂ → 2 NH₃) e obtêm-se ${num(obtido)} g de amônia. Qual foi o rendimento? (N₂ = 28; H₂ = 2; NH₃ = 17 g/mol)`,
        r: (obtido / teorico) * 100,
        d: [(obtido / 38) * 100, (obtido / 85) * 100, (obtido / 17) * 100, 100 - (obtido / teorico) * 100],
        f: (v) => `${num(v)}%`,
        x: expl('limitante + rendimento', '1 mol de N₂ precisa de 3 mol de H₂ (6 g); há 5 mol de H₂, então o N₂ é o limitante e forma no máximo 2 mol (34 g) de NH₃.', `${num(obtido)} ÷ 34 = ${num((obtido / teorico) * 100)}%.`),
      };
    },
    (r) => {
      const k = r.pick([0.05, 0.1, 0.2, 0.5]);
      const mMg = 58 * k;
      return {
        e: `Um antiácido contém ${num(mMg)} g de hidróxido de magnésio. Quantos gramas de HCl do estômago ele neutraliza? Mg(OH)₂ + 2 HCl → MgCl₂ + 2 H₂O (Mg(OH)₂ = 58 g/mol; HCl = 36,5 g/mol)`,
        r: 73 * k,
        d: [36.5 * k, mMg, 146 * k, 58 * k * 2],
        f: u('g'),
        x: expl('proporção 1 : 2 em mols', 'Cada mol de Mg(OH)₂ neutraliza 2 mol de HCl.', `${num(mMg)} ÷ 58 = ${num(k)} mol → ${num(2 * k)} mol de HCl = ${num(73 * k)} g.`),
      };
    },
    (r) => {
      const k = r.pick([0.5, 1, 2]);
      const m = 245 * k, nO2 = 3 * k;
      return {
        e: `Aquecendo ${num(m)} g de clorato de potássio, ocorre 2 KClO₃ → 2 KCl + 3 O₂. Que volume de O₂ se obtém a 27 °C e 1 atm? (KClO₃ = 122,5 g/mol; R = 0,082 atm·L/mol·K)`,
        r: nO2 * 0.082 * 300,
        d: [nO2 * 22.4, 2 * k * 0.082 * 300, nO2 * 0.082 * 27, (nO2 * 0.082 * 300) / 2],
        f: u('L'),
        x: expl('estequiometria + Clapeyron (fora das CNTP)', `${num(m)} g = ${num(2 * k)} mol de KClO₃ → ${num(nO2)} mol de O₂; V = n·R·T/p, com T = 300 K.`, `V = ${num(nO2)} × 0,082 × 300 ÷ 1 = ${num(nO2 * 0.082 * 300)} L.`),
      };
    },
    (r) => {
      const [min, Mmin, M, nome] = r.pick([['CH₂O', 30, 180, 'a glicose'], ['CH', 13, 78, 'o benzeno'], ['CH₂', 14, 56, 'um alceno'], ['C₂H₅', 29, 58, 'o butano'], ['CH₂O', 30, 60, 'o ácido acético']]);
      const n = M / Mmin;
      const nC = (min.startsWith('C₂') ? 2 : 1) * n;
      return {
        e: `A fórmula mínima de ${nome} é ${min} e a sua massa molar é ${M} g/mol. Quantos átomos de carbono há em cada molécula? (C = 12; H = 1; O = 16)`,
        r: nC,
        d: [n === nC ? nC * 2 : n, nC + 1, M / 12, Math.max(1, nC - 1)],
        x: expl('fórmula molecular = (fórmula mínima) × n', `n = massa molar ÷ massa da fórmula mínima = ${M} ÷ ${Mmin} = ${n}.`, `Multiplicando ${min} por ${n}, há ${nC} átomos de carbono.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Soluções
const solucoes = [
  [
    (r) => {
      const C = r.pick([4, 5, 8, 10, 20, 40]), m = r.pick([2, 4, 10, 20]);
      return {
        e: `Quantos mililitros de uma solução de ${C} g/L contêm ${m} g de soluto?`,
        r: (m / C) * 1000,
        d: [m * C, (C / m) * 1000, m / C, ((m / C) * 1000) / 2],
        f: u('mL'),
        x: expl('V = m ÷ C', 'Divida a massa pela concentração para obter o volume em litros e converta para mL.', `${m} ÷ ${C} = ${num(m / C, 3)} L = ${num((m / C) * 1000)} mL.`),
      };
    },
    (r) => {
      const pct = r.pick([5, 12, 40, 46]), V = r.pick([350, 500, 750, 1000]);
      return {
        e: `Uma bebida tem teor alcoólico de ${pct}% em volume. Quantos mililitros de álcool há numa garrafa de ${V} mL?`,
        r: (pct * V) / 100,
        d: [V - (pct * V) / 100, pct * V, (pct * V) / 1000, pct],
        f: u('mL'),
        x: expl('porcentagem em volume', `${pct}% v/v significa ${pct} mL de álcool em cada 100 mL de bebida.`, `${pct}% de ${V} = ${num((pct * V) / 100)} mL.`),
      };
    },
    (r) => {
      const V = r.pick([100, 250, 500, 1000]);
      return {
        e: `O soro fisiológico tem 0,9% de NaCl (0,9 g em cada 100 mL). Quantos gramas de sal há numa bolsa de ${V} mL?`,
        r: (0.9 * V) / 100,
        d: [0.9 * V, (0.9 * V) / 1000, V / 0.9, 9],
        f: u('g'),
        x: expl('porcentagem massa/volume', '0,9 g a cada 100 mL: faça a proporção.', `${V} ÷ 100 × 0,9 = ${num((0.9 * V) / 100)} g.`),
      };
    },
    (r) => {
      const mgmL = r.pick([0.5, 2, 5, 25, 50]);
      return {
        e: `Um xarope tem ${num(mgmL)} mg de medicamento por mililitro. Qual é essa concentração em gramas por litro?`,
        r: mgmL,
        d: [mgmL * 1000, mgmL * 10, mgmL * 100, mgmL / 10],
        f: u('g/L'),
        x: expl('mg/mL = g/L', 'Multiplicar em cima e embaixo por 1 000: 1 mg/mL = 1 000 mg/1 000 mL = 1 g/L.', `${num(mgmL)} mg/mL = ${num(mgmL)} g/L.`),
      };
    },
    (r) => {
      const M = r.pick([0.1, 0.2, 0.5, 1, 2]), V = r.pick([100, 200, 250, 500]);
      return {
        e: `Quantos mols de soluto há em ${V} mL de uma solução ${num(M)} mol/L?`,
        r: (M * V) / 1000,
        d: [M * V, M / (V / 1000), ((M * V) / 1000) * 10, M],
        f: u('mol'),
        x: expl('n = M × V (em litros)', 'A concentração em mol/L diz quantos mols há em cada litro.', `${num(M)} × ${num(V / 1000)} = ${num((M * V) / 1000, 3)} mol.`),
      };
    },
    (r) => {
      const d = r.pick([1.05, 1.1, 1.2, 1.5]), V = r.pick([100, 200, 500, 1000]);
      return {
        e: `Uma solução tem densidade ${num(d)} g/mL. Qual é a massa de ${V} mL dessa solução?`,
        r: d * V,
        d: [V / d, V, d * V * 1000, V + d],
        f: u('g'),
        x: expl('massa = densidade × volume', 'A densidade da solução (não confundir com concentração) diz a massa de cada mL.', `${num(d)} × ${V} = ${num(d * V)} g.`),
      };
    },
    (r) => {
      const [sal, ions] = r.pick([['NaCl', 2], ['CaCl₂', 3], ['Na₂SO₄', 3], ['AlCl₃', 4], ['KNO₃', 2]]);
      const M = r.pick([0.1, 0.2, 0.5, 1]);
      return {
        e: `Qual é a concentração total de íons (partículas dissolvidas) numa solução ${num(M)} mol/L de ${sal}, supondo dissociação completa?`,
        r: M * ions,
        d: [M, M * (ions - 1), M / ions, M * (ions + 1)],
        f: u('mol/L'),
        x: expl('dissociação: cada fórmula libera vários íons', `Cada ${sal} libera ${ions} íons ao se dissociar.`, `${num(M)} × ${ions} = ${num(M * ions)} mol/L de partículas.`),
      };
    },
  ],
  [
    (r) => {
      const C = r.pick([1, 2, 5, 10]), f1 = r.pick([10, 5]), f2 = r.pick([10, 4, 2]);
      return {
        e: `Uma solução de ${C} mol/L é diluída ${f1} vezes e, em seguida, a nova solução é diluída mais ${f2} vezes. Qual é a concentração final?`,
        r: C / (f1 * f2),
        d: [C / (f1 + f2), C / f1, C * f1 * f2, C / f2],
        f: (v) => `${dec(v)} mol/L`,
        x: expl('diluições sucessivas: os fatores se multiplicam', 'Cada diluição divide a concentração pelo seu fator.', `${C} ÷ ${f1} ÷ ${f2} = ${num(C / (f1 * f2), 3)} mol/L.`),
      };
    },
    (r) => {
      const CA = r.pick([0.2, 0.4, 0.6, 1]), VA = r.pick([100, 200, 300]), VB = r.pick([100, 200, 300]);
      const CAf = (CA * VA) / (VA + VB);
      return {
        e: `Misturam-se ${VA} mL de solução ${num(CA)} mol/L de glicose com ${VB} mL de solução de sacarose (sem reação). Qual é a concentração de glicose na mistura?`,
        r: CAf,
        d: [CA, CA / 2, (CA * VB) / (VA + VB), CA * (VA + VB) / VA],
        f: (v) => `${dec(v)} mol/L`,
        x: expl('mistura sem reação: cada soluto se dilui no volume total', 'A quantidade de glicose é a mesma; o volume passou a ser a soma.', `${num(CA)} × ${VA} ÷ ${VA + VB} = ${num(CAf, 3)} mol/L.`),
      };
    },
    (r) => {
      const [nome, M, tit, d] = r.pick([['HCl', 36.5, 0.365, 1.2], ['HNO₃', 63, 0.63, 1.4], ['H₂SO₄', 98, 0.98, 1.84], ['NaOH', 40, 0.4, 1.5]]);
      const C = (1000 * d * tit) / M;
      return {
        e: `Uma solução concentrada de ${nome} tem ${num(tit * 100)}% em massa e densidade ${num(d)} g/mL. Qual é a sua concentração em mol/L? (${nome} = ${M} g/mol)`,
        r: C,
        d: [1000 * d * tit, (d * tit) / M, (1000 * tit) / M, C / d],
        f: u('mol/L'),
        x: expl('M = 1 000·d·τ ÷ massa molar', '1 L de solução tem 1 000·d gramas; a fração τ é soluto; divida pela massa molar.', `1 000 × ${num(d)} × ${num(tit, 3)} ÷ ${M} = ${num(C)} mol/L.`),
      };
    },
    (r) => {
      const lim = 0.01, mg = r.pick([0.05, 0.1, 0.2, 0.3]), L = r.pick([2, 5, 10]);
      const c = mg / L;
      return {
        e: `O limite de chumbo na água potável é 0,01 mg/L. Uma amostra de ${L} L contém ${num(mg)} mg de chumbo. Quantas vezes a concentração está acima do limite?`,
        r: c / lim,
        d: [mg / lim, c, (lim * L) / mg, c / lim / 10],
        f: (v) => `${num(v)} vezes`,
        x: expl('concentração em mg/L comparada com o limite', 'Calcule a concentração e divida pelo limite.', `${num(mg)} ÷ ${L} = ${num(c, 3)} mg/L; ${num(c, 3)} ÷ 0,01 = ${num(c / lim)} vezes.`),
      };
    },
    (r) => {
      const [s1, s2] = r.pick([[110, 32], [80, 40], [64, 20], [100, 60], [140, 45]]), mag = r.pick([100, 200, 50]);
      const crist = ((s1 - s2) * mag) / 100;
      return {
        e: `A solubilidade de um sal é ${s1} g/100 g de água a 60 °C e ${s2} g/100 g a 20 °C. Uma solução saturada com ${mag} g de água a 60 °C é resfriada a 20 °C. Quantos gramas de sal cristalizam?`,
        r: crist,
        d: [s1 - s2, (s1 * mag) / 100, (s2 * mag) / 100, crist / 2],
        f: u('g'),
        x: expl('cristalização = o que deixa de caber', `Com ${mag} g de água, cabiam ${num((s1 * mag) / 100)} g a 60 °C e cabem ${num((s2 * mag) / 100)} g a 20 °C.`, `${num((s1 * mag) / 100)} − ${num((s2 * mag) / 100)} = ${num(crist)} g.`),
      };
    },
    (r) => {
      const V1 = r.pick([100, 200]), M1 = r.pick([0.1, 0.2, 0.3]), V2 = r.pick([100, 300]), M2 = r.pick([0.1, 0.2]);
      const cl = (V1 * M1 + V2 * M2 * 2) / (V1 + V2);
      return {
        e: `Misturam-se ${V1} mL de NaCl ${num(M1)} mol/L com ${V2} mL de CaCl₂ ${num(M2)} mol/L. Qual é a concentração de íons Cl⁻ na mistura?`,
        r: cl,
        d: [(V1 * M1 + V2 * M2) / (V1 + V2), M1 + 2 * M2, M1 + M2, cl * 2],
        f: (v) => `${dec(v)} mol/L`,
        x: expl('íon comum: some os mols de Cl⁻ e divida pelo volume total', 'O CaCl₂ libera 2 Cl⁻ por fórmula.', `Cl⁻ = ${V1} × ${num(M1)} + ${V2} × ${num(M2)} × 2 = ${num(V1 * M1 + V2 * M2 * 2)} mmol em ${V1 + V2} mL → ${num(cl, 3)} mol/L.`),
      };
    },
  ],
  [
    (r) => {
      const Vam = r.pick([10, 20, 25]), M = r.pick([0.1, 0.2, 0.5]), Vb = r.pick([16, 20, 25, 30, 40]);
      const n = (M * Vb) / 1000, gL = (n * 60) / (Vam / 1000);
      return {
        e: `Na titulação de ${Vam} mL de vinagre, gastaram-se ${Vb} mL de NaOH ${num(M)} mol/L (reação 1 : 1 com o ácido acético, 60 g/mol). Qual é a concentração de ácido acético no vinagre, em g/L?`,
        r: gL,
        d: [(n / (Vam / 1000)), gL / 10, (M * 60), gL * 2],
        f: u('g/L'),
        x: expl('titulação: n(ácido) = n(base)', 'Os mols de NaOH gastos são os mols de ácido na amostra; converta para gramas e divida pelo volume.', `n = ${num(M)} × ${num(Vb / 1000, 3)} = ${num(n, 4)} mol; × 60 = ${num(n * 60, 3)} g em ${Vam} mL → ${num(gL)} g/L.`),
      };
    },
    (r) => {
      const Va = r.pick([100, 200]), Ma = r.pick([0.2, 0.3, 0.5]), Vb = r.pick([100, 200]), Mb = r.pick([0.1, 0.2]);
      const na = Va * Ma, nb = Vb * Mb;
      if (na <= nb) throw new Error('sortear de novo');
      const exc = (na - nb) / (Va + Vb);
      return {
        e: `Misturam-se ${Va} mL de HCl ${num(Ma)} mol/L com ${Vb} mL de NaOH ${num(Mb)} mol/L. Qual é a concentração de H⁺ em excesso na solução final?`,
        r: exc,
        d: [(na - nb) / Va, Ma - Mb, (na + nb) / (Va + Vb), exc * 2],
        f: (v) => `${dec(v)} mol/L`,
        x: expl('neutralização com excesso', 'H⁺ e OH⁻ reagem 1 : 1; o que sobra fica dissolvido no volume total.', `H⁺ = ${num(na)} mmol; OH⁻ = ${num(nb)} mmol; sobram ${num(na - nb)} mmol em ${Va + Vb} mL → ${num(exc, 3)} mol/L.`),
      };
    },
    (r) => {
      const M = r.pick([0.1, 0.2, 0.3, 0.5]), T = r.pick([300, 310]), i = r.pick([1, 2]);
      const pi = M * 0.082 * T * i;
      return {
        e: `Qual é a pressão osmótica, a ${T} K, de uma solução ${num(M)} mol/L de ${i === 1 ? 'glicose' : 'NaCl (dissociação completa)'}? (R = 0,082 atm·L/mol·K)`,
        r: pi,
        d: [M * 0.082 * T * (i === 1 ? 2 : 1), M * 0.082 * (T - 273) * i, pi / 10, M * T * i],
        f: u('atm'),
        x: expl('pressão osmótica: π = M·R·T·i', `i é o número de partículas por fórmula (${i === 1 ? 'glicose não se dissocia: i = 1' : 'NaCl dá 2 íons: i = 2'}).`, `π = ${num(M)} × 0,082 × ${T} × ${i} = ${num(pi)} atm.`),
      };
    },
    (r) => {
      const M = r.pick([0.05, 0.1, 0.2]), V = r.pick([250, 500, 1000]);
      const m = M * (V / 1000) * 250;
      return {
        e: `Quantos gramas de sulfato de cobre penta-hidratado (CuSO₄·5H₂O, 250 g/mol) são necessários para preparar ${V} mL de solução ${num(M)} mol/L de CuSO₄?`,
        r: m,
        d: [M * (V / 1000) * 160, M * V * 250, m / 2, m * 2],
        f: u('g'),
        x: expl('sal hidratado: use a massa molar com a água', 'Cada mol do cristal fornece 1 mol de CuSO₄, mas pesa 250 g (a água de cristalização vem junto).', `n = ${num(M)} × ${num(V / 1000)} = ${num(M * (V / 1000), 3)} mol; × 250 = ${num(m)} g.`),
      };
    },
    (r) => {
      const [S, m] = r.pick([[25, 125], [50, 300], [20, 240], [60, 320], [40, 210]]);
      const sal = (m * S) / (100 + S);
      return {
        e: `A solubilidade de um sal é ${S} g por 100 g de água. Quanto sal há em ${m} g de uma solução saturada dele?`,
        r: sal,
        d: [(m * S) / 100, m - sal, S, sal * 2],
        f: u('g'),
        x: expl('solução saturada: proporção sal : solução', `Cada ${100 + S} g de solução saturada têm ${S} g de sal.`, `${m} × ${S} ÷ ${100 + S} = ${num(sal)} g.`),
      };
    },
    (r) => {
      const [C1, C2, Cf] = r.pick([[0.1, 0.4, 0.2], [0.2, 0.5, 0.3], [1, 3, 2], [0.5, 2, 1], [0.1, 0.6, 0.3]]);
      const Vt = r.pick([300, 600, 900]);
      const V1 = (Vt * (C2 - Cf)) / (C2 - C1);
      return {
        e: `Quer-se preparar ${Vt} mL de solução ${num(Cf)} mol/L misturando uma solução ${num(C1)} mol/L com outra ${num(C2)} mol/L do mesmo soluto. Que volume da solução mais diluída deve ser usado?`,
        r: V1,
        d: [Vt - V1, Vt / 2, (Vt * Cf) / C2, (Vt * C1) / Cf],
        f: u('mL'),
        x: expl('mistura do mesmo soluto: C₁V₁ + C₂V₂ = C·(V₁ + V₂)', 'Chame de V₁ o volume da mais diluída; o resto vem da outra.', `${num(C1)}·V₁ + ${num(C2)}·(${Vt} − V₁) = ${num(Cf)} × ${Vt} → V₁ = ${num(V1)} mL.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Cálculos físico-químicos
const fq = [
  [
    (r) => {
      const p = r.pick([1, 2, 3, 4, 5, 9, 11, 12]);
      return {
        e: `Uma solução tem pH = ${p}, a 25 °C. Qual é a concentração de íons H⁺?`,
        r: p,
        d: [14 - p, p + 1, p - 1, p * 2],
        f: (v) => `${pot(-v)} mol/L`,
        x: expl('[H⁺] = 10⁻ᵖᴴ', 'O pH é o expoente (com o sinal trocado) da concentração de H⁺.', `[H⁺] = ${pot(-p)} mol/L.`),
      };
    },
    (r) => {
      const [a, b] = r.pick([[2, 4], [3, 6], [4, 7], [5, 8], [3, 5], [6, 7]]);
      return {
        e: `Uma amostra A tem pH ${a} e uma amostra B tem pH ${b}. Quantas vezes a concentração de H⁺ em A é maior que em B?`,
        r: 10 ** (b - a),
        d: [b - a, (b - a) * 10, 2 ** (b - a), b / a],
        f: (v) => `${num(v)} vezes`,
        x: expl('cada unidade de pH = fator 10', 'O pH é logarítmico: diferença de n unidades = 10ⁿ vezes.', `${b} − ${a} = ${b - a} → 10${sup(b - a)} = ${num(10 ** (b - a))} vezes.`),
      };
    },
    (r) => {
      const v = r.pick([0.3, 0.6, 0.9, 1.2, 1.5]);
      return {
        e: `Na reação N₂ + 3 H₂ → 2 NH₃, o H₂ é consumido a ${num(v)} mol/L·min. Com que velocidade se forma a amônia?`,
        r: (v * 2) / 3,
        d: [v, v * 3, v / 3, (v * 3) / 2],
        f: u('mol/L·min'),
        x: expl('velocidades proporcionais aos coeficientes', 'Para cada 3 mol de H₂ consumidos formam-se 2 mol de NH₃.', `${num(v)} × 2/3 = ${num((v * 2) / 3)} mol/L·min.`),
      };
    },
    (r) => {
      const dT = r.pick([10, 20, 30, 40]);
      const f = 2 ** (dT / 10);
      return {
        e: `Pela regra de Van't Hoff, a velocidade de uma reação dobra a cada 10 °C de aumento. Se a temperatura subir ${dT} °C, a velocidade fica multiplicada por quanto?`,
        r: f,
        d: [(dT / 10) * 2, dT / 5 + 1, f * 2, f * 4],
        f: (v) => `${num(v)} vezes`,
        x: expl('fatores sucessivos se multiplicam', `São ${dT / 10} aumentos de 10 °C, cada um dobrando a velocidade.`, `2${sup(dT / 10)} = ${num(f)}.`),
      };
    },
    (r) => {
      const [comp, el, nox] = r.pick([['H₂SO₄', 'enxofre', 6], ['KMnO₄', 'manganês', 7], ['HNO₃', 'nitrogênio', 5], ['CO₂', 'carbono', 4], ['H₃PO₄', 'fósforo', 5], ['NH₃', 'nitrogênio', -3], ['K₂Cr₂O₇', 'cromo', 6]]);
      return {
        e: `Qual é o número de oxidação (Nox) do ${el} em ${comp}?`,
        r: nox,
        d: [-nox, nox + 1, nox - 2, nox + 2],
        f: (v) => (v > 0 ? `+${v}` : `${v}`),
        x: expl('soma dos Nox = carga da espécie (zero numa molécula neutra)', 'Use H = +1, O = −2 e metais alcalinos = +1, e ache o Nox que zera a soma.', `Nox do ${el} = ${nox > 0 ? '+' : ''}${nox}.`),
      };
    },
    (r) => {
      const a = r.pick([0, 1, 2, 3]), fator = r.pick([2, 3]);
      return {
        e: `A lei de velocidade de uma reação é v = k·[A]${a === 1 ? '' : sup(a)}${a === 0 ? ' (ordem zero em A)' : ''}. Se a concentração de A for multiplicada por ${fator}, a velocidade fica multiplicada por quanto?`,
        r: fator ** a,
        d: [fator, fator * a, fator ** (a + 1), a === 0 ? fator * fator : 1],
        f: (v) => `${num(v)}`,
        x: expl('ordem de reação = expoente da concentração', `A velocidade varia com [A] elevado a ${a}.`, `${fator}${sup(a)} = ${num(fator ** a)}.`),
      };
    },
    (r) => {
      const n = r.pick([2, 3, 4, 5]);
      return {
        e: `Depois de quantas meias-vidas a quantidade de um isótopo radioativo cai para 1/${2 ** n} da inicial?`,
        r: n,
        d: [2 ** n, 2 ** n / 2, n * 2, n + 1],
        x: expl('a cada meia-vida, a quantidade cai pela metade', `1/${2 ** n} = (1/2)${sup(n)}.`, `${n} meias-vidas.`),
      };
    },
  ],
  [
    (r) => {
      const [eq, ref, Hf, res] = r.pick([
        ['CH₄ + 2 O₂ → CO₂ + 2 H₂O(l)', 'CH₄ = −75; CO₂ = −394; H₂O(l) = −286', [-75, -394, -286], -394 - 2 * 286 + 75],
        ['C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O(l)', 'C₂H₆O = −278; CO₂ = −394; H₂O(l) = −286', [-278, -394, -286], 2 * -394 + 3 * -286 + 278],
        ['CaCO₃ → CaO + CO₂', 'CaCO₃ = −1 207; CaO = −635; CO₂ = −394', [-1207, -635, -394], -635 - 394 + 1207],
      ]);
      void Hf;
      return {
        e: `Calcule o ΔH da reação ${eq} a partir das entalpias de formação (kJ/mol): ${ref}. (O₂ = 0)`,
        r: res,
        d: [-res, res - 286, res + 100, res / 2],
        f: u('kJ'),
        x: expl('ΔH = Σ ΔHf(produtos) − Σ ΔHf(reagentes)', 'Multiplique cada entalpia de formação pelo coeficiente; substâncias simples (como o O₂) valem zero.', `ΔH = ${num(res)} kJ.`),
      };
    },
    (r) => {
      const Ea = r.pick([80, 100, 120, 150]), dH = r.pick([-40, -30, 20, 50]);
      return {
        e: `Uma reação tem energia de ativação de ${Ea} kJ/mol e ΔH = ${dH} kJ/mol. Qual é a energia de ativação da reação inversa?`,
        r: Ea - dH,
        d: [Ea + dH, Ea, Math.abs(dH), Ea * 2, Ea + 2 * dH],
        f: u('kJ/mol'),
        x: expl('Ea(inversa) = Ea(direta) − ΔH', 'No diagrama de energia, a barreira da volta é medida a partir dos produtos.', `${Ea} − (${dH}) = ${Ea - dH} kJ/mol.`),
      };
    },
    (r) => {
      const [Ka, M] = r.pick([[1e-5, 0.1], [1e-6, 0.01], [1e-5, 0.001], [1e-4, 0.01], [1e-7, 0.1]]);
      const H = Math.sqrt(Ka * M), pH = -Math.log10(H);
      return {
        e: `Um ácido fraco HA tem Ka = ${pot(Math.round(Math.log10(Ka)))}. Qual é o pH de uma solução ${num(M)} mol/L desse ácido (ionização pequena)?`,
        r: pH,
        d: [-Math.log10(M), pH * 2, -Math.log10(Ka), pH + 1],
        x: expl('ácido fraco: [H⁺] ≈ √(Ka·M)', 'Como o ácido quase não se ioniza, [H⁺]² ≈ Ka·M.', `[H⁺] = √(${pot(Math.round(Math.log10(Ka)))} × ${num(M)}) = ${pot(Math.round(Math.log10(H)))} → pH = ${num(pH)}.`),
      };
    },
    (r) => {
      const s = r.pick([1, 2, 3, 4]);
      return {
        e: `A solubilidade de um sal do tipo AB (AB ⇌ A⁺ + B⁻) em água é ${s} × 10⁻⁵ mol/L. Qual é o seu produto de solubilidade (Kps)?`,
        r: s * s,
        d: [s, 2 * s, s * s * 2, s * s * 4],
        f: (v) => `${num(v)} × 10⁻¹⁰`,
        x: expl('Kps = [A⁺]·[B⁻] = s²', 'Cada mol dissolvido libera 1 mol de cada íon.', `(${s} × 10⁻⁵)² = ${s * s} × 10⁻¹⁰.`),
      };
    },
    (r) => {
      const [de, A1, Z1, para, A2, Z2] = r.pick([['urânio-238', 238, 92, 'chumbo-206', 206, 82], ['tório-232', 232, 90, 'chumbo-208', 208, 82], ['urânio-235', 235, 92, 'chumbo-207', 207, 82]]);
      const a = (A1 - A2) / 4, b = 2 * a - (Z1 - Z2);
      const pede = r.pick(['alfa', 'beta']);
      return {
        e: `Na série radioativa natural, o ${de} (Z = ${Z1}) se transforma em ${para} (Z = ${Z2}) por emissões alfa e beta. Quantas partículas ${pede} são emitidas?`,
        r: pede === 'alfa' ? a : b,
        d: pede === 'alfa' ? [b, A1 - A2, Z1 - Z2, a * 2] : [a, Z1 - Z2, b * 2, a + b],
        x: expl('conservação: α muda A em −4 e Z em −2; β muda Z em +1', `A cai ${A1 - A2}: são ${a} partículas α (que tiram ${2 * a} de Z). Como Z só caiu ${Z1 - Z2}, houve ${b} emissões β.`, `α = ${a}; β = ${b}.`),
      };
    },
    (r) => {
      const V = r.pick([11.2, 22.4, 44.8, 112]), dH = r.pick([-890, -1560, -2220]);
      const gas = { '-890': 'metano', '-1560': 'etano', '-2220': 'propano' }[String(dH)];
      const Q = (V / 22.4) * -dH;
      return {
        e: `A combustão de 1 mol de ${gas} libera ${-dH} kJ. Quanta energia é liberada na queima de ${num(V)} L desse gás, nas CNTP?`,
        r: Q,
        d: [-dH * V, -dH * 22.4, Q * 3, Q / 2, Q / 4],
        f: u('kJ'),
        x: expl('volume → mols → energia', `Nas CNTP, ${num(V)} L = ${num(V / 22.4)} mol.`, `${num(V / 22.4)} × ${-dH} = ${num(Q)} kJ.`),
      };
    },
  ],
  [
    (r) => {
      const [Va, Ma, Vb, Mb] = r.pick([[100, 0.2, 100, 0.1], [50, 0.2, 50, 0.1], [100, 0.11, 100, 0.09], [200, 0.1, 200, 0.09], [100, 0.06, 100, 0.04]]);
      const exc = (Va * Ma - Vb * Mb) / (Va + Vb);
      const pH = -Math.log10(exc);
      return {
        e: `Misturam-se ${Va} mL de HCl ${num(Ma)} mol/L com ${Vb} mL de NaOH ${num(Mb)} mol/L. Qual é o pH da solução final?`,
        r: pH,
        d: [7, -Math.log10(Ma), 14 - pH, pH + 1],
        x: expl('neutralização com excesso de ácido forte', 'Calcule o H⁺ que sobra e divida pelo volume total; depois, pH = −log[H⁺].', `H⁺ que sobra = ${num(Va * Ma - Vb * Mb)} mmol em ${Va + Vb} mL = ${num(exc, 3)} mol/L → pH = ${num(pH)}.`),
      };
    },
    (r) => {
      const [razao, log] = r.pick([[10, 1], [1, 0], [0.1, -1], [100, 2]]);
      const pKa = r.pick([4.74, 4.2, 7.2]);
      return {
        e: `Uma solução-tampão tem ácido fraco (pKa = ${num(pKa)}) e o seu sal na proporção [sal]/[ácido] = ${num(razao)}. Qual é o pH? (equação de Henderson-Hasselbalch)`,
        r: pKa + log,
        d: [pKa - log === pKa + log ? pKa + 2 : pKa - log, pKa, 7, 14 - pKa],
        x: expl('Henderson-Hasselbalch: pH = pKa + log([sal]/[ácido])', `log ${num(razao)} = ${log}.`, `pH = ${num(pKa)} + (${log}) = ${num(pKa + log)}.`),
      };
    },
    (r) => {
      const [dH, dS] = r.pick([[178, 0.16], [92, 0.2], [44, 0.11], [120, 0.3], [60, 0.15]]);
      const T = dH / dS;
      return {
        e: `Uma reação endotérmica tem ΔH = +${dH} kJ/mol e ΔS = +${num(dS)} kJ/mol·K. Acima de que temperatura ela passa a ser espontânea? (ΔG = ΔH − T·ΔS)`,
        r: T,
        d: [T - 273, dH * dS, T / 2, dS / dH],
        f: u('K'),
        x: expl('espontânea quando ΔG < 0', 'O limite é ΔG = 0, ou seja, T = ΔH/ΔS (unidades iguais: kJ).', `T = ${dH} ÷ ${num(dS)} = ${num(T)} K.`),
      };
    },
    (r) => {
      const s = r.pick([1, 2, 3, 4]);
      const Kps = s * s;
      return {
        e: `O Kps de um sal do tipo AB (AB ⇌ A⁺ + B⁻) vale ${Kps} × 10⁻¹⁰. Qual é a solubilidade desse sal em água, em mol/L?`,
        r: s,
        d: [Kps, s * 2, Kps / 2, s / 2],
        f: (v) => `${num(v)} × 10⁻⁵ mol/L`,
        x: expl('s = √Kps (sal 1 : 1)', 'Kps = s², então a solubilidade é a raiz do Kps.', `√(${Kps} × 10⁻¹⁰) = ${s} × 10⁻⁵ mol/L.`),
      };
    },
    (r) => {
      const V = r.pick([50, 100, 200]), M = r.pick([0.5, 1]);
      const n = (V / 1000) * M, Q = n * 57000, massa = 2 * V, dT = Q / (massa * 4.2);
      return {
        e: `Misturam-se ${V} mL de HCl ${num(M)} mol/L com ${V} mL de NaOH ${num(M)} mol/L num recipiente isolado. A neutralização libera 57 kJ por mol de água formada. Quanto a temperatura sobe? (solução: 1 g/mL; c = 4,2 J/g·°C)`,
        r: dT,
        d: [dT * 2, Q / (V * 4.2) / 2 * 1.5, Q / 1000, dT / 2],
        f: u('°C'),
        x: expl('calor da reação aquece a solução: Q = m·c·ΔT', `Formam-se ${num(n, 3)} mol de água → Q = ${num(Q)} J, que aquecem ${massa} g de solução.`, `ΔT = ${num(Q)} ÷ (${massa} × 4,2) = ${num(dT)} °C.`),
      };
    },
  ],
];

export default { estequiometria, solucoes, fq };
