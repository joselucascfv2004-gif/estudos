// Química — modelos novos (complementam os de quimica.mjs).
import { arred, expl, num } from './util.mjs';

const u = (un) => (v) => `${num(v)} ${un}`;
const cientifica = (v) => {
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / 10 ** e;
  const sup = (n) => String(n).split('').map((c) => ({ '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' })[c]).join('');
  return `${num(arred(m, 2))} × 10${sup(e)}`;
};

// ------------------------------------------------------------- Estequiometria
const estequiometria = [
  [
    (r) => {
      const [form, atomo, k] = r.pick([['H₂O', 'hidrogênio', 2], ['CH₄', 'hidrogênio', 4], ['CO₂', 'oxigênio', 2], ['C₆H₁₂O₆', 'carbono', 6], ['NH₃', 'hidrogênio', 3]]);
      const n = r.pick([1, 2, 0.5]);
      return {
        e: `Quantos átomos de ${atomo} existem em ${num(n)} mol de ${form}? (constante de Avogadro = 6 × 10²³ mol⁻¹)`,
        r: cientifica(n * k * 6e23),
        d: [cientifica(n * 6e23), cientifica(n * (k + 1) * 6e23), cientifica(n * k * 6e22), cientifica((n * 6e23) / k)],
        x: expl('mol de moléculas → átomos', `Cada molécula de ${form} tem ${k} ${k === 1 ? 'átomo' : 'átomos'} de ${atomo}.`, `${num(n)} × ${k} × 6 × 10²³ = ${cientifica(n * k * 6e23)} átomos.`),
      };
    },
    (r) => {
      const [eq, coef, quem] = r.pick([
        ['C₃H₈ + x O₂ → 3 CO₂ + 4 H₂O', 5, 'O₂'],
        ['CH₄ + x O₂ → CO₂ + 2 H₂O', 2, 'O₂'],
        ['N₂ + x H₂ → 2 NH₃', 3, 'H₂'],
        ['2 H₂ + x O₂ → 2 H₂O', 1, 'O₂'],
        ['C₂H₆O + x O₂ → 2 CO₂ + 3 H₂O', 3, 'O₂'],
        ['4 Fe + x O₂ → 2 Fe₂O₃', 3, 'O₂'],
      ]);
      return {
        e: `Qual é o valor do coeficiente x que deixa balanceada a equação ${eq}?`,
        r: coef,
        d: [coef + 1, coef - 1 || coef + 3, coef * 2, coef + 2],
        x: expl('balanceamento (conservação dos átomos)', `Conte os átomos de ${quem === 'O₂' ? 'oxigênio' : 'hidrogênio'} dos dois lados: nenhum átomo some ou aparece numa reação.`, `x = ${coef}.`),
      };
    },
    (r) => {
      const a = r.int(4, 30), b = r.int(2, 20), sobra = r.pick([0, 0, 3]);
      return {
        e: `Em um recipiente fechado, ${a} g de uma substância A reagem com ${b} g de uma substância B, formando a substância C${sobra ? ` e sobrando ${sobra} g de B sem reagir` : ''}. Qual é a massa de C formada?`,
        r: a + b - sobra,
        d: [a + b, Math.abs(a - b), a * b, a + b + sobra],
        f: u('g'),
        x: expl('lei de Lavoisier', 'Em sistema fechado, a massa dos reagentes que reagem é igual à massa dos produtos.', `${a} + ${b}${sobra ? ` − ${sobra}` : ''} = ${a + b - sobra} g.`),
      };
    },
  ],
  [
    (r) => {
      const mh = r.pick([2, 4, 6, 10]), k = r.pick([2, 3, 5]);
      return {
        e: `Na formação da água, 4 g de hidrogênio reagem exatamente com 32 g de oxigênio. Quantos gramas de oxigênio reagem com ${mh * k} g de hidrogênio?`,
        r: mh * k * 8,
        d: [mh * k * 4, mh * k + 32, 32 * k, mh * k * 16],
        f: u('g'),
        x: expl('lei de Proust (proporções constantes)', 'A proporção em massa entre os reagentes é sempre a mesma: 32/4 = 8 g de O₂ para cada 1 g de H₂.', `${mh * k} × 8 = ${mh * k * 8} g.`),
      };
    },
    (r) => {
      const [s, M] = r.pick([['CO₂', 44], ['H₂O', 18], ['O₂', 32], ['NH₃', 17]]), n = r.pick([0.5, 2, 3, 4]);
      return {
        e: `Quantas moléculas há em ${num(n * M)} g de ${s}? (massa molar = ${M} g/mol; Avogadro = 6 × 10²³)`,
        r: cientifica(n * 6e23),
        d: [cientifica(n * M * 6e23), cientifica(6e23), cientifica((n * 6e23) / 10), cientifica(n * 2 * 6e23)],
        x: expl('massa → mol → moléculas', 'Primeiro ache o número de mols (m/M); depois multiplique por Avogadro.', `${num(n * M)} ÷ ${M} = ${num(n)} mol; × 6 × 10²³ = ${cientifica(n * 6e23)}.`),
      };
    },
    (r) => {
      const [form, el, mEl, M] = r.pick([['CO₂', 'carbono', 12, 44], ['H₂O', 'hidrogênio', 2, 18], ['CaCO₃', 'cálcio', 40, 100], ['NaCl', 'sódio', 23, 58.5], ['CH₄', 'carbono', 12, 16]]);
      const p = (mEl / M) * 100;
      return {
        e: `Qual é a porcentagem em massa de ${el} em ${form}? (massa molar de ${form} = ${num(M)} g/mol; o ${el} contribui com ${mEl} g/mol)`,
        r: arred(p, 1),
        d: [arred(100 - p, 1), arred((M / mEl) * 10, 1), arred(p / 2, 1), arred(mEl, 1)],
        f: (v) => `${num(v)}%`,
        x: expl('composição centesimal', 'Parte do elemento ÷ massa molar total × 100.', `${mEl} ÷ ${num(M)} × 100 ≈ ${num(arred(p, 1))}%.`),
      };
    },
  ],
  [
    (r) => {
      const [comp, res] = r.pick([
        [[40, 6.7, 53.3], 'CH₂O'],
        [[85.7, 14.3, 0], 'CH₂'],
        [[75, 25, 0], 'CH₄'],
        [[52.2, 13, 34.8], 'C₂H₆O'],
      ]);
      const todas = ['CH₂O', 'CH₂', 'CH₄', 'C₂H₆O', 'CHO', 'C₂H₄O', 'CH₃'];
      return {
        e: `Uma substância orgânica tem ${num(comp[0])}% de carbono, ${num(comp[1])}% de hidrogênio${comp[2] ? ` e ${num(comp[2])}% de oxigênio` : ''}, em massa. Qual é a sua fórmula mínima? (C = 12; H = 1; O = 16)`,
        r: res,
        d: todas.filter((t) => t !== res),
        x: expl('porcentagem → mols → menor proporção', 'Suponha 100 g: as porcentagens viram gramas. Divida cada uma pela massa molar e depois pelo menor resultado.', `C: ${num(comp[0])}/12; H: ${num(comp[1])}/1${comp[2] ? `; O: ${num(comp[2])}/16` : ''} → proporção da fórmula ${res}.`),
      };
    },
    (r) => {
      const nN2 = r.int(2, 6), nH2 = r.int(nN2 * 3 + 1, nN2 * 3 + 9);
      return {
        e: `Em um reator, ${nN2} mol de N₂ são misturados com ${nH2} mol de H₂ (N₂ + 3 H₂ → 2 NH₃). Após a reação completa, quantos mols de H₂ sobram?`,
        r: nH2 - 3 * nN2,
        d: [nH2 - nN2, 3 * nN2, nH2 - 2 * nN2, 0],
        x: expl('reagente limitante', 'Veja qual reagente acaba primeiro. Aqui, cada mol de N₂ precisa de 3 mol de H₂.', `${nN2} mol de N₂ consomem ${3 * nN2} mol de H₂; sobram ${nH2} − ${3 * nN2} = ${nH2 - 3 * nN2} mol.`),
      };
    },
    (r) => {
      const n = r.pick([0.5, 1, 2]), T = r.pick([300, 273, 400]), P = r.pick([1, 2, 0.5]);
      const V = (n * 0.082 * T) / P;
      return {
        e: `Qual é o volume ocupado por ${num(n)} mol de um gás ideal a ${T} K e ${num(P)} atm? (R = 0,082 atm·L/mol·K)`,
        r: arred(V, 2),
        d: [arred(n * 22.4, 2), arred((n * 0.082 * T) * P, 2), arred(V / 2, 2), arred((0.082 * T) / P, 2)],
        f: u('L'),
        x: expl('equação de Clapeyron (PV = nRT)', 'Fora das CNTP, não use 22,4 L/mol: use PV = nRT.', `V = ${num(n)} × 0,082 × ${T} ÷ ${num(P)} = ${num(arred(V, 2))} L.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Soluções
const solucoes = [
  [
    (r) => ({
      e: 'Ao acrescentar água pura a uma solução de sal (diluição), o que acontece?',
      r: 'A massa de sal continua a mesma e a concentração diminui',
      d: ['A massa de sal diminui e a concentração continua a mesma', 'A massa de sal e a concentração aumentam', 'A massa de sal e a concentração continuam as mesmas', 'O sal se transforma em outra substância'],
      x: expl('diluição', 'Só entra água: o soluto não muda, mas fica espalhado em mais volume (C₁V₁ = C₂V₂).', ''),
    }),
    (r) => {
      const gL = r.pick([0.2, 0.5, 1.5, 2.5, 0.05]);
      return {
        e: `Um laudo indica que a concentração de uma substância na água é de ${num(gL)} g/L. Quanto é isso em mg/L?`,
        r: gL * 1000,
        d: [gL * 100, gL * 10, gL * 10000, gL * 1000 + 1000, gL * 500],
        f: u('mg/L'),
        x: expl('conversão de unidade de massa', '1 g = 1.000 mg; o volume continua em litros.', `${num(gL)} × 1.000 = ${num(gL * 1000)} mg/L.`),
      };
    },
    (r) => {
      const V = r.pick([250, 500, 1000]), p = 0.9;
      return {
        e: `O soro fisiológico contém 0,9% (em massa) de NaCl. Considerando a densidade da solução igual a 1 g/mL, quantos gramas de NaCl há em ${V} mL de soro?`,
        r: (V * p) / 100,
        d: [V * p, (V * p) / 10, (V * p) / 1000, V / p],
        f: u('g'),
        x: expl('porcentagem em massa', `${V} mL pesam ${V} g; 0,9% disso é soluto.`, `${V} × 0,009 = ${num((V * p) / 100)} g.`),
      };
    },
  ],
  [
    (r) => {
      const V1 = r.pick([500, 800, 1000]), C1 = r.pick([10, 20, 30]), C2 = r.pick([40, 50, 60, 80]);
      const V2 = (C1 * V1) / C2;
      if (!Number.isInteger(V2)) return solucoes[1][0](r);
      return {
        e: `${V1} mL de uma solução de concentração ${C1} g/L são aquecidos e parte da água evapora, sem perda de soluto, até a concentração chegar a ${C2} g/L. Qual é o volume final?`,
        r: V2,
        d: [V1 - V2, (C2 * V1) / C1, V1 / 2, V2 * 2],
        f: u('mL'),
        x: expl('a quantidade de soluto não muda', 'Na evaporação, assim como na diluição: C₁V₁ = C₂V₂.', `${C1} × ${V1} = ${C2} × V₂ ⇒ V₂ = ${num(V2)} mL.`),
      };
    },
    (r) => {
      const [s, M] = r.pick([['NaCl', 58.5], ['NaOH', 40], ['glicose (C₆H₁₂O₆)', 180], ['KCl', 74.5]]), mol = r.pick([0.1, 0.2, 0.5, 1]);
      const gL = mol * M;
      return {
        e: `Uma solução de ${s} tem concentração de ${num(gL)} g/L. Qual é a sua concentração em mol/L? (massa molar = ${num(M)} g/mol)`,
        r: mol,
        d: [gL * M, M / gL, mol * 10, arred(gL / 100, 3)],
        f: u('mol/L'),
        x: expl('g/L → mol/L', 'Divida pela massa molar: cada mol "pesa" M gramas.', `${num(gL)} ÷ ${num(M)} = ${num(mol)} mol/L.`),
      };
    },
    (r) => {
      const sol = r.pick([36, 40, 30]), agua = r.pick([150, 200, 250, 300]), sal = r.pick([80, 100, 120]);
      const dissolve = (sol * agua) / 100;
      const fundo = sal - dissolve;
      if (fundo <= 0) return solucoes[1][2](r);
      return {
        e: `A solubilidade de um sal é ${sol} g por 100 g de água, a 20 °C. Adicionando ${sal} g do sal a ${agua} g de água a 20 °C e agitando bem, quantos gramas ficam sem dissolver (corpo de fundo)?`,
        r: fundo,
        d: [dissolve, sal, sal - sol, fundo / 2],
        f: u('g'),
        x: expl('solubilidade = limite de dissolução', 'Calcule quanto dissolve na quantidade de água dada; o excesso vai para o fundo.', `${sol} g em 100 g ⇒ ${num(dissolve)} g em ${agua} g. Sobram ${sal} − ${num(dissolve)} = ${num(fundo)} g.`),
      };
    },
  ],
  [
    (r) => {
      const Va = r.pick([100, 200]), Ca = r.pick([0.1, 0.2]), Vb = r.pick([100, 150, 200]), Cb = r.pick([0.1, 0.2]);
      const na = Va * Ca, nb = Vb * Cb;
      const res = na > nb ? 'ácida, porque sobra HCl' : na < nb ? 'básica, porque sobra NaOH' : 'neutra, porque ácido e base se neutralizam totalmente';
      return {
        e: `Misturam-se ${Va} mL de HCl ${num(Ca)} mol/L com ${Vb} mL de NaOH ${num(Cb)} mol/L (HCl + NaOH → NaCl + H₂O). A solução final é:`,
        r: res,
        d: ['ácida, porque sobra HCl', 'básica, porque sobra NaOH', 'neutra, porque ácido e base se neutralizam totalmente', 'sempre neutra, pois forma sal e água', 'ácida, porque o NaCl é um ácido'].filter((t) => t !== res),
        x: expl('comparar quantidades em mol', 'Na proporção 1:1, quem estiver em maior quantidade (n = C·V) sobra e define o caráter.', `HCl: ${num(na)} mmol; NaOH: ${num(nb)} mmol.`),
      };
    },
    (r) => {
      const [s80, s20] = r.pick([[100, 30], [80, 35], [60, 20], [120, 40]]), agua = r.pick([100, 200, 50]);
      const prec = ((s80 - s20) * agua) / 100;
      return {
        e: `A solubilidade de um sal em água é ${s80} g/100 g de água a 80 °C e ${s20} g/100 g a 20 °C. Uma solução saturada com ${agua} g de água a 80 °C é resfriada até 20 °C. Quantos gramas do sal precipitam?`,
        r: prec,
        d: [s80 - s20, (s80 * agua) / 100, (s20 * agua) / 100, prec / 2],
        f: u('g'),
        x: expl('curva de solubilidade', 'Ao esfriar, a água "aguenta" menos sal; a diferença sai da solução.', `(${s80} − ${s20}) × ${agua}/100 = ${num(prec)} g.`),
      };
    },
    (r) => {
      const [s, k, ion] = r.pick([['CaCl₂', 2, 'Cl⁻'], ['Na₂SO₄', 2, 'Na⁺'], ['AlCl₃', 3, 'Cl⁻'], ['NaCl', 1, 'Cl⁻'], ['K₃PO₄', 3, 'K⁺']]);
      const C = r.pick([0.1, 0.2, 0.5]);
      return {
        e: `Qual é a concentração de íons ${ion} em uma solução ${num(C)} mol/L de ${s}, considerando dissociação total?`,
        r: arred(C * k, 2),
        d: [C, arred(C / k, 2), arred(C * (k + 1), 2), arred(C * k * 2, 2)],
        f: u('mol/L'),
        x: expl('estequiometria da dissociação', `Cada unidade de ${s} libera ${k} ${k === 1 ? 'íon' : 'íons'} ${ion}.`, `${num(C)} × ${k} = ${num(C * k)} mol/L.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Físico-química
const fq = [
  [
    (r) => {
      const [fen, tipo] = r.pick([['a fusão do gelo', 'endotérmico'], ['a queima do gás de cozinha', 'exotérmico'], ['a evaporação do suor na pele', 'endotérmico'], ['a condensação do vapor de água', 'exotérmico'], ['o cozimento de um ovo', 'endotérmico'], ['a respiração celular', 'exotérmico']]);
      return {
        e: `${fen[0].toUpperCase()}${fen.slice(1)} é um processo:`,
        r: tipo === 'endotérmico' ? 'endotérmico, porque absorve calor' : 'exotérmico, porque libera calor',
        d: [tipo === 'endotérmico' ? 'exotérmico, porque libera calor' : 'endotérmico, porque absorve calor', 'endotérmico, porque libera calor', 'exotérmico, porque absorve calor', 'nem endotérmico nem exotérmico'],
        x: expl('sinal do calor', 'Endo = "para dentro" (absorve calor, ΔH > 0). Exo = "para fora" (libera calor, ΔH < 0).', `${fen[0].toUpperCase()}${fen.slice(1)}: ${tipo}.`),
      };
    },
    (r) => {
      const certo = r.pick(['aumentar a temperatura', 'triturar o sólido (aumentar a superfície de contato)', 'usar um catalisador', 'aumentar a concentração dos reagentes']);
      return {
        e: 'Qual das ações abaixo AUMENTA a velocidade de uma reação química?',
        r: certo,
        d: ['diminuir a temperatura', 'usar o sólido em um único bloco grande', 'diluir os reagentes em mais água', 'retirar o catalisador', 'guardar os reagentes na geladeira'],
        x: expl('teoria das colisões', 'Reações acontecem quando partículas colidem com energia suficiente. Mais temperatura, mais concentração, mais superfície de contato ou um catalisador aumentam as colisões eficazes.', ''),
      };
    },
    (r) => {
      const A = r.pick([226, 238, 222, 210]), Z = r.pick([88, 92, 86, 84]);
      const tipo = r.pick(['alfa', 'beta']);
      const [A2, Z2] = tipo === 'alfa' ? [A - 4, Z - 2] : [A, Z + 1];
      return {
        e: `Um núcleo com número de massa ${A} e número atômico ${Z} emite uma partícula ${tipo}. Quais são o número de massa e o número atômico do núcleo formado?`,
        r: `A = ${A2} e Z = ${Z2}`,
        d: [`A = ${A - 4} e Z = ${Z + 2}`, `A = ${A} e Z = ${Z - 1}`, `A = ${A - 2} e Z = ${Z - 4}`, `A = ${A} e Z = ${Z}`, `A = ${A + 4} e Z = ${Z + 2}`].filter((t) => t !== `A = ${A2} e Z = ${Z2}`),
        x: expl('conservação na emissão', 'Alfa (⁴₂α): A cai 4 e Z cai 2. Beta (⁰₋₁β): A não muda e Z sobe 1.', `${tipo}: A = ${A2}, Z = ${Z2}.`),
      };
    },
  ],
  [
    (r) => {
      const [acao, res] = r.pick([
        ['aumentar a pressão', 'para a direita (formação de NH₃), lado com menos mols de gás'],
        ['diminuir a pressão', 'para a esquerda, lado com mais mols de gás'],
        ['adicionar mais N₂', 'para a direita, consumindo o N₂ adicionado'],
        ['retirar NH₃ do sistema', 'para a direita, repondo o NH₃ retirado'],
      ]);
      const todas = ['para a direita (formação de NH₃), lado com menos mols de gás', 'para a esquerda, lado com mais mols de gás', 'para a direita, consumindo o N₂ adicionado', 'para a direita, repondo o NH₃ retirado', 'não se desloca, pois equilíbrios não mudam', 'para a esquerda, consumindo NH₃ que foi retirado'];
      return {
        e: `No equilíbrio N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), o que acontece ao ${acao}?`,
        r: res,
        d: todas.filter((t) => t !== res),
        x: expl('princípio de Le Chatelier', 'O equilíbrio reage contra a perturbação: se aumentar algo, ele consome; se tirar, ele repõe. Pressão maior favorece o lado com menos mols de gás (4 mol → 2 mol).', ''),
      };
    },
    (r) => ({
      e: 'Sobre um catalisador adicionado a uma reação, é correto afirmar que ele:',
      r: 'diminui a energia de ativação e acelera a reação, sem ser consumido',
      d: ['aumenta a energia de ativação e torna a reação mais lenta', 'é consumido como reagente e muda o ΔH da reação', 'desloca o equilíbrio no sentido dos produtos', 'aumenta a quantidade de produto obtida ao final'],
      x: expl('catalisador', 'O catalisador oferece um "atalho" com menor energia de ativação. Não muda o ΔH, não desloca equilíbrio e sai intacto.', ''),
    }),
    (r) => {
      const d = r.pick([2, 3, 4]), meia = r.pick([5, 8, 30]);
      const t = d * meia;
      const frac = 100 / 2 ** d;
      return {
        e: `Uma amostra de um material radioativo com meia-vida de ${meia} anos tem hoje ${num(frac)}% da atividade inicial. Há quanto tempo a amostra foi produzida?`,
        r: t,
        d: [meia, t + meia, (t * 100) / frac / 10, t / 2],
        f: u('anos'),
        x: expl('contar meias-vidas', 'Cada meia-vida divide a quantidade por 2: 100% → 50% → 25% → 12,5% → 6,25%...', `${num(frac)}% = (1/2)^${d}: ${d} meias-vidas × ${meia} = ${t} anos.`),
      };
    },
  ],
  [
    (r) => {
      const [cat, Ec, an, Ea] = r.pick([['Cu²⁺/Cu', 0.34, 'Zn²⁺/Zn', -0.76], ['Ag⁺/Ag', 0.8, 'Cu²⁺/Cu', 0.34], ['Cu²⁺/Cu', 0.34, 'Fe²⁺/Fe', -0.44], ['Ag⁺/Ag', 0.8, 'Zn²⁺/Zn', -0.76]]);
      return {
        e: `Uma pilha é montada com os eletrodos ${cat} (E° = ${num(Ec)} V) e ${an} (E° = ${num(Ea)} V). Qual é a ddp (força eletromotriz) da pilha?`,
        r: arred(Ec - Ea, 2),
        d: [arred(Ec + Ea, 2), arred(Ea - Ec, 2), arred(Ec, 2), arred(Math.abs(Ec * Ea), 2)],
        f: u('V'),
        x: expl('ΔE° = E°(cátodo) − E°(ânodo)', 'Quem tem maior potencial de redução reduz (cátodo); o outro oxida (ânodo).', `${num(Ec)} − (${num(Ea)}) = ${num(arred(Ec - Ea, 2))} V.`),
      };
    },
    (r) => {
      const i = r.pick([2, 5, 10]), t = r.pick([965, 1930, 3860]), [met, M, k] = r.pick([['cobre (Cu²⁺)', 63.5, 2], ['prata (Ag⁺)', 108, 1], ['níquel (Ni²⁺)', 58.7, 2]]);
      const Q = i * t;
      const m = (Q / 96500 / k) * M;
      return {
        e: `Em uma eletrólise, uma corrente de ${i} A passa por ${t} s em uma solução de ${met}. Que massa do metal se deposita? (1 mol de elétrons = 96.500 C; massa molar = ${num(M)} g/mol)`,
        r: arred(m, 2),
        d: [arred(m * k, 2), arred(m / 2, 2), arred((Q / 96500) * M * k, 2), arred(Q / M, 2)],
        f: u('g'),
        x: expl('leis de Faraday', `Carga Q = i·t; mols de elétrons = Q/96.500; cada íon precisa de ${k} ${k === 1 ? 'elétron' : 'elétrons'}.`, `Q = ${num(Q)} C ⇒ ${num(Q / 96500, 3)} mol de e⁻ ⇒ ${num(Q / 96500 / k, 3)} mol de metal × ${num(M)} = ${num(arred(m, 2))} g.`),
      };
    },
    (r) => {
      const [a, b, K] = r.pick([[2, 1, 4], [1, 1, 9], [4, 2, 1]]);
      // A ⇌ 2B? use Kc = [C][D]/([A][B]) com valores dados
      const C = r.pick([1, 2, 3]), D = r.pick([1, 2]);
      const Kc = (C * D) / (a * b);
      return {
        e: `No equilíbrio A(g) + B(g) ⇌ C(g) + D(g), mediram-se [A] = ${a} mol/L, [B] = ${b} mol/L, [C] = ${C} mol/L e [D] = ${D} mol/L. Qual é o valor de Kc? (Se Kc > 1, o equilíbrio favorece os produtos.)`,
        r: arred(Kc, 2),
        d: [arred((a * b) / (C * D), 2), arred(C + D - a - b, 2), arred(Kc * 2, 2), K === Kc ? arred(Kc + 1, 2) : K],
        x: expl('expressão de Kc', 'Kc = produtos ÷ reagentes (cada concentração elevada ao seu coeficiente).', `(${C} × ${D}) ÷ (${a} × ${b}) = ${num(arred(Kc, 2))}.`),
      };
    },
  ],
];

export default { estequiometria, solucoes, fq };
