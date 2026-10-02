// Química: cálculos (estequiometria, soluções, físico-química quantitativa).
import { arred, num } from './util.mjs';
import { sup } from './matematica-1.mjs';

const PROVAS = ['ENEM', 'Militares'];
const u = (un) => (v) => `${num(v)} ${un}`;

// massas molares (g/mol) usuais em provas
const SUBST = [
  ['água (H₂O)', 18],
  ['gás carbônico (CO₂)', 44],
  ['metano (CH₄)', 16],
  ['cloreto de sódio (NaCl)', 58.5],
  ['glicose (C₆H₁₂O₆)', 180],
  ['ácido sulfúrico (H₂SO₄)', 98],
  ['hidróxido de sódio (NaOH)', 40],
  ['carbonato de cálcio (CaCO₃)', 100],
  ['amônia (NH₃)', 17],
  ['oxigênio (O₂)', 32],
  ['etanol (C₂H₆O)', 46],
];

const estequiometria = {
  disciplina: 'quimica',
  arquivo: '03-estequiometria',
  titulo: 'Mol e estequiometria',
  provas: PROVAS,
  descricao: 'Massa molar, mol, número de Avogadro, volume molar, cálculos estequiométricos, rendimento, pureza e reagente limitante.',
  niveis: [
    [
      (r) => {
        const [s, M] = r.pick(SUBST);
        const n = r.pick([0.5, 1, 2, 2.5, 3, 4, 5, 10]);
        return {
          e: `Qual é a massa de ${num(n)} mol de ${s}? (massa molar = ${num(M)} g/mol)`,
          r: n * M,
          d: [M / n, n + M, n * M * 2, M],
          f: u('g'),
          x: `m = n·M = ${num(n)} × ${num(M)} = ${num(n * M)} g.`,
        };
      },
      (r) => {
        const [s, M] = r.pick(SUBST);
        const n = r.pick([0.1, 0.2, 0.5, 2, 3, 4]);
        const m = n * M;
        return {
          e: `Quantos mols existem em ${num(m)} g de ${s}? (massa molar = ${num(M)} g/mol)`,
          r: n,
          d: [m * M > 1e5 ? n * 10 : m * M, n * 2, n / 2, M / m],
          f: u('mol'),
          x: `n = m/M = ${num(m)}/${num(M)} = ${num(n)} mol.`,
        };
      },
      (r) => {
        const n = r.pick([0.5, 1, 2, 3, 5]);
        return {
          e: `Quantas moléculas existem em ${num(n)} mol de uma substância? (constante de Avogadro = 6 × 10²³ mol⁻¹)`,
          r: `${num(n * 6)} × 10²³`,
          d: [`${num(6 / n)} × 10²³`, `${num(n * 6)} × 10²²`, `${num(n + 6)} × 10²³`, `${num(n * 6)} × 10²⁴`],
          x: `N = n × 6 × 10²³ = ${num(n)} × 6 × 10²³ = ${num(n * 6)} × 10²³ moléculas.`,
        };
      },
      (r) => {
        const n = r.pick([0.5, 1, 2, 3, 4, 10]);
        return {
          e: `Qual é o volume ocupado por ${num(n)} mol de um gás ideal nas CNTP? (volume molar = 22,4 L/mol)`,
          r: n * 22.4,
          d: [22.4 / n, n * 24.5, n + 22.4, n * 22.4 * 2],
          f: u('L'),
          x: `V = n × 22,4 = ${num(n)} × 22,4 = ${num(n * 22.4)} L.`,
        };
      },
      (r) => {
        const [form, M] = r.pick([['H₂O', 18], ['CO₂', 44], ['NH₃', 17], ['CH₄', 16], ['H₂SO₄', 98], ['NaOH', 40], ['CaCO₃', 100], ['C₂H₆O', 46], ['HCl', 36.5]]);
        return {
          e: `Qual é a massa molar de ${form}? (Dados: H = 1; C = 12; N = 14; O = 16; Na = 23; S = 32; Cl = 35,5; Ca = 40, em g/mol.)`,
          r: M,
          d: [M + 1, M - 2, M + 16, M * 2],
          f: u('g/mol'),
          x: `Somam-se as massas atômicas de todos os átomos da fórmula ${form}: ${num(M)} g/mol.`,
        };
      },
    ],
    [
      (r) => {
        const mCH4 = r.pick([8, 16, 32, 48, 80]);
        const pede = r.pick(['CO₂', 'H₂O', 'O₂']);
        const n = mCH4 / 16;
        const val = pede === 'CO₂' ? n * 44 : pede === 'H₂O' ? n * 2 * 18 : n * 2 * 32;
        return {
          e: `Na combustão completa do metano, CH₄ + 2 O₂ → CO₂ + 2 H₂O, qual é a massa de ${pede} ${pede === 'O₂' ? 'consumida' : 'produzida'} quando ${mCH4} g de CH₄ reagem? (C = 12; H = 1; O = 16)`,
          r: val,
          d: [pede === 'CO₂' ? n * 2 * 44 : n * 44, mCH4, val / 2, val * 2],
          f: u('g'),
          x: `${mCH4} g de CH₄ = ${num(n)} mol. Pela proporção, formam/consomem ${pede === 'CO₂' ? `${num(n)} mol de CO₂ × 44 g/mol` : pede === 'H₂O' ? `${num(2 * n)} mol de H₂O × 18 g/mol` : `${num(2 * n)} mol de O₂ × 32 g/mol`} = ${num(val)} g.`,
        };
      },
      (r) => {
        const m = r.pick([100, 200, 500, 1000]), rend = r.pick([60, 75, 80, 90]);
        // CaCO3 -> CaO + CO2 (100 -> 56)
        const teor = (m / 100) * 56;
        return {
          e: `Na decomposição térmica do calcário, CaCO₃ → CaO + CO₂, ${m} g de CaCO₃ foram aquecidos e a reação teve rendimento de ${rend}%. Qual a massa de CaO obtida? (CaCO₃ = 100 g/mol; CaO = 56 g/mol)`,
          r: (teor * rend) / 100,
          d: [teor, (m * rend) / 100, (m / 100) * 44 * (rend / 100), (teor * (100 - rend)) / 100],
          f: u('g'),
          x: `Teórico: ${m} g de CaCO₃ = ${m / 100} mol ⇒ ${m / 100} mol de CaO = ${num(teor)} g. Com ${rend}% de rendimento: ${num((teor * rend) / 100)} g.`,
        };
      },
      (r) => {
        const m = r.pick([200, 400, 500, 1000]), pur = r.pick([60, 70, 80, 90]);
        const puro = (m * pur) / 100;
        const co2 = (puro / 100) * 44;
        return {
          e: `Uma amostra de ${m} g de calcário contém ${pur}% de CaCO₃. Qual a massa de CO₂ liberada na decomposição completa do CaCO₃ presente (CaCO₃ → CaO + CO₂)? (CaCO₃ = 100; CO₂ = 44 g/mol)`,
          r: arred(co2, 2),
          d: [arred((m / 100) * 44, 2), puro, arred(co2 / 2, 2), arred((puro / 100) * 56, 2)],
          f: u('g'),
          x: `CaCO₃ puro: ${pur}% de ${m} g = ${num(puro)} g = ${num(puro / 100)} mol ⇒ ${num(puro / 100)} mol de CO₂ × 44 = ${num(co2)} g.`,
        };
      },
      (r) => {
        const n = r.pick([1, 2, 3, 4]);
        return {
          e: `Na síntese da amônia, N₂ + 3 H₂ → 2 NH₃, quantos mols de NH₃ são formados a partir de ${n * 3} mol de H₂ (com N₂ em excesso)?`,
          r: n * 2,
          d: [n * 3, n, n * 6, n * 2 + 1],
          f: u('mol'),
          x: `Proporção H₂ : NH₃ = 3 : 2. ${n * 3} mol de H₂ formam ${n * 3} × 2/3 = ${n * 2} mol de NH₃.`,
        };
      },
      (r) => {
        const mol = r.pick([1, 2, 4, 5, 10]);
        return {
          e: `Qual é o volume de CO₂, nas CNTP (22,4 L/mol), produzido na combustão completa de ${mol * 46} g de etanol? (C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O; C₂H₆O = 46 g/mol)`,
          r: arred(mol * 2 * 22.4, 2),
          d: [arred(mol * 22.4, 2), arred(mol * 3 * 22.4, 2), arred(mol * 2 * 24.5, 2), arred(mol * 4 * 22.4, 2)],
          f: u('L'),
          x: `${mol * 46} g de etanol = ${mol} mol ⇒ ${mol * 2} mol de CO₂ × 22,4 L = ${num(mol * 2 * 22.4)} L.`,
        };
      },
    ],
    [
      (r) => {
        // reagente limitante: 2H2 + O2 -> 2H2O
        const h = r.pick([2, 4, 6, 8, 10]), o = r.pick([16, 32, 48, 64, 96]);
        const nH = h / 2, nO = o / 32;
        const lim = nH / 2 < nO ? 'H₂' : 'O₂';
        const nH2O = lim === 'H₂' ? nH : 2 * nO;
        return {
          e: `Misturam-se ${h} g de H₂ e ${o} g de O₂, que reagem segundo 2 H₂ + O₂ → 2 H₂O. Qual a massa de água formada? (H = 1; O = 16)`,
          r: nH2O * 18,
          d: [h + o, nH * 18 === nH2O * 18 ? nO * 2 * 18 + 18 : nH * 18, 2 * nO * 18 === nH2O * 18 ? nH2O * 9 : 2 * nO * 18, nH2O * 9],
          f: u('g'),
          x: `${h} g de H₂ = ${num(nH)} mol; ${o} g de O₂ = ${num(nO)} mol. O ${lim} é o reagente limitante. Formam-se ${num(nH2O)} mol de H₂O = ${num(nH2O * 18)} g.`,
        };
      },
      (r) => {
        const kg = r.pick([1, 2, 5, 10]);
        // Fe2O3 + 3CO -> 2Fe + 3CO2 ; Fe2O3 = 160; Fe = 56
        const fe = (kg * 1000 / 160) * 2 * 56 / 1000;
        return {
          e: `Na siderurgia, Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂. Quantos quilogramas de ferro podem ser obtidos de ${kg} kg de Fe₂O₃ puro? (Fe₂O₃ = 160 g/mol; Fe = 56 g/mol)`,
          r: arred(fe, 2),
          d: [arred(fe / 2, 2), arred((kg * 56) / 160, 2), kg, arred(fe * 1.2, 2)],
          f: u('kg'),
          x: `Cada 160 g de Fe₂O₃ produzem 2 × 56 = 112 g de Fe (70%). ${kg} kg × 112/160 = ${num(fe)} kg.`,
        };
      },
      (r) => {
        const L = r.pick([10, 20, 40, 50]), d = 0.8;
        // C2H6O + 3 O2 -> 2 CO2 + 3 H2O
        const mEt = L * d * 1000;
        const co2kg = (mEt / 46) * 2 * 44 / 1000;
        return {
          e: `Um carro consome ${L} L de etanol (densidade 0,8 kg/L). Qual a massa aproximada de CO₂ emitida? (C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O; etanol = 46 g/mol; CO₂ = 44 g/mol)`,
          r: arred(co2kg, 1),
          d: [arred(co2kg / 2, 1), arred((L * 44) / 46, 1), arred(L * d, 1), arred(co2kg * 1.5, 1)],
          f: u('kg'),
          x: `Massa de etanol: ${L} × 0,8 = ${num(L * d)} kg. Cada 46 g geram 88 g de CO₂: ${num(L * d)} × 88/46 ≈ ${num(co2kg, 1)} kg.`,
        };
      },
      (r) => {
        const m = r.pick([10, 20, 40]), pur = r.pick([80, 90]), rend = r.pick([50, 75, 80]);
        // Zn + 2HCl -> ZnCl2 + H2 ; Zn = 65 -> usar Mg = 24: Mg + 2HCl -> MgCl2 + H2
        const mg = (m * pur) / 100 / 24;
        const vol = mg * 22.4 * (rend / 100);
        return {
          e: `${m} g de magnésio com ${pur}% de pureza reagem com HCl em excesso: Mg + 2 HCl → MgCl₂ + H₂. Com rendimento de ${rend}%, qual o volume de H₂ obtido nas CNTP? (Mg = 24 g/mol; 22,4 L/mol)`,
          r: arred(vol, 2),
          d: [arred(mg * 22.4, 2), arred((m / 24) * 22.4, 2), arred(vol * 2, 2), arred(vol / 2, 2)],
          f: u('L'),
          x: `Mg puro: ${num((m * pur) / 100)} g = ${num(mg, 3)} mol ⇒ ${num(mg, 3)} mol de H₂ (teórico) = ${num(mg * 22.4)} L. Com ${rend}%: ${num(vol)} L.`,
        };
      },
    ],
  ],
};

const solucoes = {
  disciplina: 'quimica',
  arquivo: '04-solucoes',
  titulo: 'Soluções e concentrações',
  provas: PROVAS,
  descricao: 'Concentração comum, molaridade, título, ppm, diluição e mistura de soluções.',
  niveis: [
    [
      (r) => {
        const m = r.pick([5, 10, 20, 30, 40, 50]), V = r.pick([0.1, 0.2, 0.25, 0.5, 1, 2]);
        return {
          e: `Dissolvem-se ${m} g de sal em água até completar ${num(V * 1000)} mL de solução. Qual é a concentração comum?`,
          r: m / V,
          d: [m * V, (m / V) * 10, m / V / 2, m / V / 10],
          f: u('g/L'),
          x: `C = m/V = ${m} g/${num(V)} L = ${num(m / V)} g/L.`,
        };
      },
      (r) => {
        const n = r.pick([0.1, 0.2, 0.5, 1, 2]), V = r.pick([0.25, 0.5, 1, 2]);
        return {
          e: `Qual é a concentração em quantidade de matéria (mol/L) de uma solução com ${num(n)} mol de soluto em ${num(V)} L de solução?`,
          r: n / V,
          d: [n * V, V / n, n / V / 10, (n / V) * 2],
          f: u('mol/L'),
          x: `M = n/V = ${num(n)}/${num(V)} = ${num(n / V)} mol/L.`,
        };
      },
      (r) => {
        const m1 = r.pick([5, 10, 20, 25, 40]), m2 = r.pick([95, 90, 80, 75, 60, 160]);
        return {
          e: `Uma solução foi preparada com ${m1} g de açúcar e ${m2} g de água. Qual é o título em massa (porcentagem de soluto)?`,
          r: arred((m1 / (m1 + m2)) * 100, 2),
          d: [arred((m1 / m2) * 100, 2), arred((m2 / (m1 + m2)) * 100, 2), m1, arred((m1 / (m1 + m2)) * 10, 2)],
          f: (v) => `${num(v)}%`,
          x: `τ = m_soluto/m_solução = ${m1}/(${m1} + ${m2}) = ${num(m1 / (m1 + m2), 4)} = ${num((m1 / (m1 + m2)) * 100)}%.`,
        };
      },
      (r) => {
        const C = r.pick([2, 5, 10, 20, 40]), V = r.pick([100, 200, 250, 500]);
        return {
          e: `Quantos gramas de soluto há em ${V} mL de uma solução de concentração ${C} g/L?`,
          r: (C * V) / 1000,
          d: [C * V, C / V, (C * V) / 100, C],
          f: u('g'),
          x: `m = C·V = ${C} g/L × ${num(V / 1000)} L = ${num((C * V) / 1000)} g.`,
        };
      },
    ],
    [
      (r) => {
        const C1 = r.pick([1, 2, 4, 5, 6]), V1 = r.pick([50, 100, 200, 250]), V2 = V1 * r.pick([2, 4, 5, 10]);
        return {
          e: `${V1} mL de uma solução ${C1} mol/L são diluídos com água até ${V2} mL. Qual é a nova concentração?`,
          r: (C1 * V1) / V2,
          d: [(C1 * V2) / V1, C1, C1 / 2, (C1 * V1) / (V2 + V1)],
          f: u('mol/L'),
          x: `Na diluição, a quantidade de soluto não muda: C₁V₁ = C₂V₂ ⇒ C₂ = ${C1} × ${V1}/${V2} = ${num((C1 * V1) / V2)} mol/L.`,
        };
      },
      (r) => {
        const [s, M] = r.pick([['NaOH', 40], ['NaCl', 58.5], ['glicose', 180], ['KCl', 74.5]]);
        const mol = r.pick([0.1, 0.2, 0.5, 1]), V = r.pick([0.25, 0.5, 1, 2]);
        const m = mol * V * M;
        return {
          e: `Que massa de ${s} (massa molar ${num(M)} g/mol) é necessária para preparar ${num(V * 1000)} mL de solução ${num(mol)} mol/L?`,
          r: arred(m, 2),
          d: [arred(mol * M, 2), arred((mol * M) / V, 2), arred(m * 2, 2), arred(mol * V, 2)],
          f: u('g'),
          x: `n = M·V = ${num(mol)} × ${num(V)} = ${num(mol * V)} mol. m = n × ${num(M)} = ${num(m)} g.`,
        };
      },
      (r) => {
        const V1 = r.pick([100, 200, 300]), C1 = r.pick([1, 2, 3]), V2 = r.pick([100, 200, 400]), C2 = r.pick([0.5, 4, 5]);
        const C = (C1 * V1 + C2 * V2) / (V1 + V2);
        return {
          e: `Misturam-se ${V1} mL de solução de NaCl ${num(C1)} mol/L com ${V2} mL de solução de NaCl ${num(C2)} mol/L. Qual é a concentração da solução final?`,
          r: arred(C, 2),
          d: [arred((C1 + C2) / 2, 2), C1 + C2, arred((C1 * V2 + C2 * V1) / (V1 + V2), 2), arred(C * 2, 2)],
          f: u('mol/L'),
          x: `C = (C₁V₁ + C₂V₂)/(V₁ + V₂) = (${num(C1 * V1)} + ${num(C2 * V2)})/${V1 + V2} = ${num(C)} mol/L.`,
        };
      },
      (r) => {
        const mg = r.pick([0.5, 1, 2, 5, 10]), kg = r.pick([1, 2, 5, 10]);
        return {
          e: `Uma amostra de ${kg} kg de solo contém ${num(mg)} mg de chumbo. Qual é a concentração de chumbo em ppm (partes por milhão, em massa)?`,
          r: mg / kg,
          d: [mg * kg, (mg / kg) * 1000, (mg / kg) / 1000, kg / mg],
          f: u('ppm'),
          x: `1 ppm = 1 mg por kg. ${num(mg)} mg/${kg} kg = ${num(mg / kg)} ppm.`,
        };
      },
      (r) => {
        const d = r.pick([1.2, 1.5, 1.8]), t = r.pick([20, 40, 60, 98]), [s, M] = r.pick([['H₂SO₄', 98], ['HCl', 36.5], ['HNO₃', 63]]);
        const C = d * 1000 * (t / 100);
        return {
          e: `Uma solução de ${s} tem densidade ${num(d)} g/mL e ${t}% em massa de soluto. Qual é a sua concentração comum?`,
          r: C,
          d: [d * t, (d * 1000) / t, C / M, C / 10],
          f: u('g/L'),
          x: `C = d (g/L) × título = ${num(d * 1000)} g/L × ${num(t / 100)} = ${num(C)} g/L. (Em mol/L, dividiríamos por ${M}.)`,
        };
      },
    ],
    [
      (r) => {
        const Cac = r.pick([0.1, 0.2, 0.5, 1]), Vac = r.pick([20, 25, 50]), Vb = r.pick([10, 20, 25, 40, 50]);
        // titulação HCl + NaOH 1:1, achar Cb
        const Cb = (Cac * Vac) / Vb;
        return {
          e: `Na titulação de ${Vb} mL de uma solução de NaOH, foram gastos ${Vac} mL de HCl ${num(Cac)} mol/L até a neutralização completa (HCl + NaOH → NaCl + H₂O). Qual é a concentração do NaOH?`,
          r: arred(Cb, 3),
          d: [arred((Cac * Vb) / Vac, 3), Cac, arred(Cb * 2, 3), arred(Cb / 2, 3)],
          f: u('mol/L'),
          x: `Proporção 1:1 ⇒ n(HCl) = n(NaOH): ${num(Cac)} × ${Vac} = C × ${Vb} ⇒ C = ${num(Cb, 3)} mol/L.`,
        };
      },
      (r) => {
        const Cac = r.pick([0.1, 0.2, 0.5]), Vac = r.pick([20, 40, 50]), Vb = r.pick([10, 20, 25]);
        // H2SO4 + 2NaOH
        const Cb = (2 * Cac * Vac) / Vb;
        return {
          e: `Para neutralizar ${Vb} mL de NaOH foram necessários ${Vac} mL de H₂SO₄ ${num(Cac)} mol/L (H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O). Qual é a concentração do NaOH?`,
          r: arred(Cb, 3),
          d: [arred(Cb / 2, 3), arred(Cb / 4, 3), arred((Cac * Vb) / Vac, 3), arred(Cb * 2, 3)],
          f: u('mol/L'),
          x: `n(H₂SO₄) = ${num(Cac)} × ${num(Vac / 1000, 3)} = ${num((Cac * Vac) / 1000, 4)} mol; n(NaOH) = 2 × isso = ${num((2 * Cac * Vac) / 1000, 4)} mol. C = n/V = ${num(Cb, 3)} mol/L.`,
        };
      },
      (r) => {
        const C1 = r.pick([10, 12, 18]), C2 = r.pick([1, 2, 3]), V2 = r.pick([500, 1000, 2000]);
        const V1 = (C2 * V2) / C1;
        return {
          e: `Que volume de solução estoque de ácido ${C1} mol/L deve ser usado para preparar ${num(V2)} mL de solução ${C2} mol/L?`,
          r: arred(V1, 2),
          d: [arred((C1 * V2) / C2, 2), arred(V2 - V1, 2), arred(V1 * 2, 2), arred(V2 / C1, 2)],
          f: u('mL'),
          x: `C₁V₁ = C₂V₂ ⇒ V₁ = ${C2} × ${num(V2)}/${C1} = ${num(V1)} mL (completa-se com água até ${num(V2)} mL).`,
        };
      },
      (r) => {
        const mgL = r.pick([0.5, 0.7, 1, 1.5]), L = r.pick([2, 1.5, 3]);
        const dose = mgL * L;
        return {
          e: `A água de abastecimento de uma cidade recebe flúor na concentração de ${num(mgL)} mg/L (${num(mgL)} ppm). Quantos miligramas de flúor uma pessoa ingere ao beber ${num(L)} L dessa água por dia, durante 30 dias?`,
          r: arred(dose * 30, 2),
          d: [arred(dose, 2), arred(mgL * 30, 2), arred(dose * 30 / 1000, 2), arred(dose * 7, 2)],
          f: u('mg'),
          x: `Por dia: ${num(mgL)} × ${num(L)} = ${num(dose)} mg. Em 30 dias: ${num(dose * 30)} mg.`,
        };
      },
    ],
  ],
};

const fq = {
  disciplina: 'quimica',
  arquivo: '07-calculos-fisico-quimicos',
  titulo: 'Cálculos físico-químicos',
  provas: PROVAS,
  descricao: 'pH e pOH, constante de equilíbrio, termoquímica (Lei de Hess, entalpia), radioatividade e velocidade de reação.',
  niveis: [
    [
      (r) => {
        const n = r.int(1, 13);
        return {
          e: `Uma solução tem [H⁺] = 1 × 10${sup(-n)} mol/L. Qual é o seu pH e o seu caráter (a 25 °C)?`,
          r: `pH = ${n}; ${n < 7 ? 'ácida' : n > 7 ? 'básica' : 'neutra'}`,
          d: [`pH = ${14 - n === n ? n + 1 : 14 - n}; ${n < 7 ? 'básica' : 'ácida'}`, `pH = ${n}; ${n < 7 ? 'básica' : 'ácida'}`, `pH = ${-n}; ácida`, `pH = ${n + 1}; neutra`],
          x: `pH = −log[H⁺] = ${n}. A 25 °C, pH < 7 é ácido, = 7 é neutro e > 7 é básico.`,
        };
      },
      (r) => {
        const pH = r.int(1, 13);
        return {
          e: `Uma solução aquosa a 25 °C tem pH = ${pH}. Qual é o seu pOH?`,
          r: 14 - pH,
          d: [pH, 7 - pH > 0 ? 7 - pH : pH + 7, 14 + pH, 10 - pH],
          x: `pH + pOH = 14 ⇒ pOH = 14 − ${pH} = ${14 - pH}.`,
        };
      },
      (r) => {
        const m0 = r.pick([16, 32, 64, 80, 100, 200]), t = r.pick([5, 8, 20, 30]), n = r.int(1, 4);
        return {
          e: `Um radioisótopo tem meia-vida de ${t} dias. Partindo de ${m0} g, quanto restará após ${t * n} dias?`,
          r: m0 / 2 ** n,
          d: [m0 / (2 * n), m0 - (m0 / 2) * n > 0 ? m0 - (m0 / 2) * n : m0 / 3, m0 / 2 ** (n + 1), m0 / 2 ** (n - 1) === m0 ? m0 / 5 : m0 / 2 ** (n - 1)],
          f: u('g'),
          x: `${t * n} dias = ${n} meia(s)-vida(s): ${m0}/2^${n} = ${num(m0 / 2 ** n)} g.`,
        };
      },
      (r) => {
        const dH = r.pick([-890, -286, -393, -242, 178, 131, -1368, 52]);
        return {
          e: `Uma reação química tem ΔH = ${dH > 0 ? '+' : '−'}${Math.abs(dH)} kJ/mol. Ela é:`,
          r: dH < 0 ? 'Exotérmica, pois libera calor para o ambiente' : 'Endotérmica, pois absorve calor do ambiente',
          d: [dH < 0 ? 'Endotérmica, pois absorve calor do ambiente' : 'Exotérmica, pois libera calor para o ambiente', dH < 0 ? 'Endotérmica, pois libera calor para o ambiente' : 'Exotérmica, pois absorve calor do ambiente', 'Nem exotérmica nem endotérmica, pois ΔH ≠ 0', 'Isotérmica, pois a temperatura não varia'],
          x: `ΔH < 0: a entalpia dos produtos é menor que a dos reagentes, e a energia é liberada (exotérmica). ΔH > 0: energia absorvida (endotérmica). Aqui ΔH ${dH < 0 ? '< 0' : '> 0'}.`,
        };
      },
    ],
    [
      (r) => {
        const c = r.pick([0.1, 0.01, 0.001, 0.0001]);
        const n = Math.round(-Math.log10(c));
        const base = r() < 0.5;
        return {
          e: `Qual é o pH de uma solução ${num(c, n)} mol/L de ${base ? 'NaOH (base forte, totalmente dissociada)' : 'HCl (ácido forte, totalmente ionizado)'}, a 25 °C?`,
          r: base ? 14 - n : n,
          d: [base ? n : 14 - n, base ? 14 + n : -n, 7, base ? 13 - n : n + 1],
          x: base ? `[OH⁻] = 10^−${n} ⇒ pOH = ${n} ⇒ pH = 14 − ${n} = ${14 - n}.` : `[H⁺] = 10^−${n} ⇒ pH = ${n}.`,
        };
      },
      (r) => {
        const a = r.pick([0.1, 0.2, 0.5]), b = r.pick([0.2, 0.4, 0.5]), c = r.pick([0.4, 0.8, 1, 2]);
        // A + B <=> C, Kc = [C]/([A][B])
        const K = c / (a * b);
        return {
          e: `Para o equilíbrio A(g) + B(g) ⇌ C(g), as concentrações no equilíbrio são [A] = ${num(a)} mol/L, [B] = ${num(b)} mol/L e [C] = ${num(c)} mol/L. Qual é o valor de Kc?`,
          r: arred(K, 2),
          d: [arred((a * b) / c, 2), arred(c / (a + b), 2), arred(c * a * b, 2), arred(K / 2, 2)],
          x: `Kc = [C]/([A][B]) = ${num(c)}/(${num(a)} × ${num(b)}) = ${num(K)}.`,
        };
      },
      (r) => {
        const [h1, h2] = [r.pick([-394, -393]), r.pick([-283, -284])];
        // C + O2 -> CO2 (h1); CO + 1/2 O2 -> CO2 (h2) ; C + 1/2 O2 -> CO = h1 - h2
        return {
          e: `Dados: C(s) + O₂(g) → CO₂(g), ΔH = ${h1} kJ; CO(g) + ½ O₂(g) → CO₂(g), ΔH = ${h2} kJ. Pela Lei de Hess, qual é o ΔH de C(s) + ½ O₂(g) → CO(g)?`,
          r: h1 - h2,
          d: [h1 + h2, h2 - h1, h1, (h1 + h2) / 2],
          f: u('kJ'),
          x: `Mantém-se a 1ª equação e inverte-se a 2ª (ΔH troca de sinal): ${h1} + (${-h2}) = ${h1 - h2} kJ.`,
        };
      },
      (r) => {
        const v = r.pick([0.1, 0.2, 0.5, 1]), t = r.pick([5, 10, 20, 30]);
        return {
          e: `Em uma reação, a concentração de um reagente caiu de ${num(v * t + 0.5)} mol/L para 0,5 mol/L em ${t} min. Qual é a velocidade média de consumo desse reagente?`,
          r: v,
          d: [v * t, v / t, v * 2, (v * t + 0.5) / t],
          f: u('mol/L·min'),
          x: `v = |Δ[R]|/Δt = ${num(v * t)}/${t} = ${num(v)} mol/L·min.`,
        };
      },
      (r) => {
        const kJ = r.pick([-890, -1368, -2220]);
        const [nome, M] = kJ === -890 ? ['metano', 16] : kJ === -1368 ? ['etanol', 46] : ['propano', 44];
        const kg = r.pick([1, 2, 5]);
        const E = (kg * 1000 / M) * -kJ;
        return {
          e: `A combustão do ${nome} tem ΔH = ${kJ} kJ/mol. Qual é a energia liberada na queima de ${kg} kg de ${nome}? (massa molar = ${M} g/mol)`,
          r: Math.round(E),
          d: [Math.round(-kJ * kg), Math.round(E / 1000), Math.round(E * 2), Math.round(-kJ * M * kg)],
          f: u('kJ'),
          x: `${kg} kg = ${num((kg * 1000) / M)} mol. Energia = ${num((kg * 1000) / M)} × ${-kJ} ≈ ${num(Math.round(E))} kJ.`,
        };
      },
    ],
    [
      (r) => {
        const [liga, vals, dH] = r.pick([
          ['H₂ + Cl₂ → 2 HCl', 'H–H = 436; Cl–Cl = 243; H–Cl = 432', 436 + 243 - 2 * 432],
          ['H₂ + F₂ → 2 HF', 'H–H = 436; F–F = 158; H–F = 568', 436 + 158 - 2 * 568],
          ['H₂ + Br₂ → 2 HBr', 'H–H = 436; Br–Br = 193; H–Br = 366', 436 + 193 - 2 * 366],
          ['N₂ + 3 H₂ → 2 NH₃', 'N≡N = 945; H–H = 436; N–H = 390', 945 + 3 * 436 - 6 * 390],
        ]);
        return {
          e: `Usando as energias de ligação (kJ/mol) ${vals}, qual é o ΔH da reação ${liga}?`,
          r: dH,
          d: [-dH, dH * 2, dH - 100, dH + 150],
          f: u('kJ'),
          x: `ΔH = Σ(ligações rompidas, reagentes) − Σ(ligações formadas, produtos) = ${dH} kJ.`,
        };
      },
      (r) => {
        const [K, a, b] = r.pick([[4, 1, 1], [9, 1, 1], [16, 2, 2], [25, 1, 1]]);
        const x = (Math.sqrt(K) * a) / (1 + Math.sqrt(K));
        return {
          e: `Para A(g) + B(g) ⇌ C(g) + D(g), Kc = ${K}. Partindo de ${a} mol/L de A e ${b} mol/L de B (sem C e D), qual é a concentração de C no equilíbrio?`,
          r: arred(x, 3),
          d: [arred(a - x, 3), arred(Math.sqrt(K) * a, 3), arred(x / 2, 3), arred(K / (K + 1), 3) === arred(x, 3) ? arred(x + 0.1, 3) : arred(K / (K + 1), 3)],
          f: u('mol/L'),
          x: `x²/(${a} − x)² = ${K} ⇒ x/(${a} − x) = ${Math.sqrt(K)} ⇒ x = ${num(x, 3)} mol/L.`,
        };
      },
      (r) => {
        const pH1 = r.int(2, 5), dil = r.pick([10, 100, 1000]);
        const pH2 = pH1 + Math.log10(dil);
        if (pH2 >= 7) return fq.niveis[2][2](r);
        return {
          e: `Uma solução de ácido forte tem pH = ${pH1}. Ela é diluída ${num(dil)} vezes com água pura. Qual passa a ser o pH aproximado?`,
          r: pH2,
          d: [pH1, pH1 - Math.log10(dil), pH1 * Math.log10(dil), 7],
          x: `Diluir ${num(dil)} vezes divide [H⁺] por 10^${Math.log10(dil)}: o pH aumenta ${Math.log10(dil)} unidade(s): ${pH1} + ${Math.log10(dil)} = ${pH2}.`,
        };
      },
      (r) => {
        const frac = r.pick([[12.5, 3], [25, 2], [6.25, 4], [50, 1]]), t = r.pick([5730]);
        const anos = frac[1] * t;
        return {
          e: `Um fóssil apresenta ${num(frac[0])}% do carbono-14 que tinha quando o organismo morreu. Sabendo que a meia-vida do C-14 é de 5.730 anos, qual é a idade aproximada do fóssil?`,
          r: anos,
          d: [anos / 2, anos + t, t, anos * 2],
          f: u('anos'),
          x: `${num(frac[0])}% = (1/2)^${frac[1]}, ou seja, ${frac[1]} meia(s)-vida(s): ${frac[1]} × 5.730 = ${num(anos)} anos.`,
        };
      },
      (r) => {
        const k = r.pick([2, 3]), ordem = r.pick([1, 2]);
        return {
          e: `A lei de velocidade de uma reação é v = k[A]${ordem === 2 ? '²' : ''}. Se a concentração de A for multiplicada por ${k}, a velocidade será multiplicada por:`,
          r: k ** ordem,
          d: [k, k ** (ordem + 1), 2 * k === k ** ordem ? k + 1 : 2 * k, 1],
          x: `v ∝ [A]^${ordem}: multiplicar [A] por ${k} multiplica v por ${k}^${ordem} = ${k ** ordem}.`,
        };
      },
    ],
  ],
};

export default [estequiometria, solucoes, fq];
