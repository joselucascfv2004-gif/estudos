// Física — Eletrostática: eletrização, lei de Coulomb, campo e potencial elétrico, capacitores.
// k = 9 · 10⁹ N·m²/C²; e = 1,6 · 10⁻¹⁹ C; g = 10 m/s².
import { expl, fracao, num, sup } from './util.mjs';

const N = (v, c = null) => num(v, c);
const r2 = (v) => Math.round(v * 100) / 100;
const u = (un) => (v) => `${N(r2(v))} ${un}`;
const K = 9e9;
// notação científica: 90000 → "9 · 10⁴"
const sci = (v, un = '') => {
  if (v === 0) return `0${un ? ` ${un}` : ''}`;
  let e = Math.floor(Math.log10(Math.abs(v)) + 1e-9);
  let c = Math.round((v / 10 ** e) * 100) / 100;
  if (Math.abs(c) >= 10) { c /= 10; e += 1; }
  const base = e === 0 ? N(c) : `${N(c)} · 10${sup(e)}`;
  return un ? `${base} ${un}` : base;
};

const facil = [
  // 1. eletrização por atrito
  (r) => {
    const [a, b] = r.pick([['um bastão de vidro', 'seda'], ['um canudo de plástico', 'papel'], ['um balão de borracha', 'cabelo seco']]);
    return {
      e: `Ao atritar ${a} com ${b}, os dois ficam eletrizados. O que passa de um corpo para o outro?`,
      r: 'elétrons',
      d: ['prótons', 'nêutrons', 'prótons e elétrons, em quantidades iguais', 'átomos inteiros'],
      x: expl('só elétrons se movem', 'Os prótons ficam presos no núcleo. Quem perde elétrons fica positivo; quem ganha fica negativo, com cargas de mesmo valor e sinais opostos.', ''),
    };
  },
  // 2. contato entre esferas iguais
  (r) => {
    const [q1, q2] = r.pick([[8, -2], [10, 4], [-6, 2], [12, 0], [5, -9]]);
    return {
      e: `Duas esferas condutoras idênticas, com cargas de ${N(q1)} µC e ${N(q2)} µC, são encostadas e depois separadas. Qual é a carga final de cada uma?`,
      r: (q1 + q2) / 2,
      d: [q1 + q2, (q1 - q2) / 2, q1, (Math.abs(q1) + Math.abs(q2)) / 2],
      f: (v) => `${N(r2(v))} µC`,
      x: expl('contato entre condutores iguais: divide a soma', 'A carga total se conserva e se divide igualmente entre esferas idênticas. Atenção aos sinais.', `(${N(q1)} + ${q2 < 0 ? `(${N(q2)})` : N(q2)}) ÷ 2 = ${N(r2((q1 + q2) / 2))} µC.`),
    };
  },
  // 3. carga a partir do número de elétrons
  (r) => {
    const k = r.pick([1, 2, 5, 3]);
    return {
      e: `Um corpo recebeu ${k === 1 ? '' : `${k} · `}10¹³ elétrons a mais. Qual é a sua carga? (e = 1,6 · 10⁻¹⁹ C)`,
      r: -1.6 * k,
      d: [1.6 * k, -1.6 * k * 1000, -k / 1.6, -0.16 * k],
      f: (v) => `${N(r2(v))} µC`,
      x: expl('Q = n · e', 'Excesso de elétrons dá carga negativa.', `${k} · 10¹³ · 1,6 · 10⁻¹⁹ = ${N(1.6 * k)} · 10⁻⁶ C = −${N(1.6 * k)} µC.`),
    };
  },
  // 4. atração e repulsão em cadeia
  (r) => {
    const s = r.pick(['positiva', 'negativa']);
    const op = s === 'positiva' ? 'negativa' : 'positiva';
    return {
      e: `Três esferas carregadas: A repele B, e B atrai C. Se a carga de C é ${s}, qual é a carga de A?`,
      r: op,
      d: [s, 'nula', 'não dá para saber', 'positiva ou negativa, tanto faz'],
      x: expl('iguais se repelem, opostas se atraem', `B atrai C (${s}), então B é ${op}. A repele B, então A tem o mesmo sinal de B.`, `A é ${op}.`),
    };
  },
  // 5. F = q·E
  (r) => {
    const q = r.pick([2, 3, 4, 5]), E = r.pick([1, 2, 3, 5]) * 1e4;
    return {
      e: `Uma carga de ${q} µC é colocada num ponto onde o campo elétrico vale ${sci(E)} N/C. Qual é a força elétrica sobre ela?`,
      r: q * 1e-6 * E,
      d: [q * E, (q * 1e-6) / E, q * 1e-6 * E * 10, q * 1e-6 * E / 10],
      f: (v) => sci(v, 'N'),
      x: expl('F = q·E', `Use a carga em coulombs: ${q} µC = ${q} · 10⁻⁶ C.`, `F = ${q} · 10⁻⁶ · ${sci(E)} = ${sci(q * 1e-6 * E)} N.`),
    };
  },
  // 6. campo com a distância
  (r) => {
    const E = r.pick([3600, 7200, 900, 1800]), k = r.pick([2, 3]);
    return {
      e: `A ${r.pick(['10 cm', '20 cm'])} de uma carga puntiforme, o campo elétrico vale ${N(E)} N/C. Quanto vale a uma distância ${k} vezes maior?`,
      r: E / (k * k),
      d: [E / k, E * k, E * k * k, E / (2 * k)],
      f: u('N/C'),
      x: expl('E = k·Q/d²', `O campo cai com o quadrado da distância: ${k} vezes mais longe, ${k * k} vezes menor.`, `${N(E)} ÷ ${k * k} = ${N(r2(E / (k * k)))} N/C.`),
    };
  },
  // 7. sentido do campo
  (r) => {
    const pos = r.pick([true, false]);
    return {
      e: `Qual é o sentido do campo elétrico criado por uma carga ${pos ? 'positiva' : 'negativa'} isolada?`,
      r: pos ? 'radial, apontando para fora da carga' : 'radial, apontando para dentro, em direção à carga',
      d: [pos ? 'radial, apontando para dentro, em direção à carga' : 'radial, apontando para fora da carga', 'circular, em volta da carga', 'para cima, sempre', 'não há campo em volta de uma carga isolada'],
      x: expl('o campo aponta para onde iria uma carga positiva de teste', 'Uma carga de teste positiva é repelida pela positiva (campo saindo) e atraída pela negativa (campo entrando).', ''),
    };
  },
  // 8. gaiola de Faraday
  (r) => ({
    e: `${r.pick(['Por que uma pessoa dentro de um carro fechado fica protegida de um raio?', 'Por que o celular perde o sinal dentro de um elevador de metal?'])}`,
    r: 'dentro de um condutor fechado o campo elétrico é praticamente nulo (gaiola de Faraday)',
    d: ['os pneus de borracha isolam o carro do chão', 'o metal absorve as cargas e as destrói', 'o ar dentro do carro é isolante e o de fora é condutor', 'as cargas se acumulam no interior e anulam o raio'],
    x: expl('blindagem eletrostática', 'Num condutor, as cargas se espalham pela superfície externa e o campo no interior fica nulo. A proteção vem da carroceria de metal, não dos pneus.', ''),
  }),
  // 9. trabalho = q·U
  (r) => {
    const q = r.pick([2, 5, 10]), U = r.pick([12, 9, 110, 220]);
    return {
      e: `Uma carga de ${q} C passa por uma diferença de potencial de ${U} V. Qual é o trabalho realizado pela força elétrica?`,
      r: q * U,
      d: [U / q, q + U, (q * U) / 2, q * U * U],
      f: u('J'),
      x: expl('W = q·U', 'Um volt é um joule por coulomb: cada coulomb ganha U joules.', `${q} · ${U} = ${q * U} J.`),
    };
  },
  // 10. campo uniforme entre placas
  (r) => {
    const U = r.pick([100, 200, 300, 500]), dcm = r.pick([1, 2, 4, 5]);
    return {
      e: `Duas placas paralelas, separadas por ${dcm} cm, estão sob uma tensão de ${U} V. Qual é o campo elétrico uniforme entre elas?`,
      r: U / (dcm / 100),
      d: [U / dcm, U * dcm, (U * dcm) / 100, U / (dcm / 1000)],
      f: u('V/m'),
      x: expl('U = E·d', `Use a distância em metros: ${dcm} cm = ${N(dcm / 100)} m.`, `E = ${U} ÷ ${N(dcm / 100)} = ${N(U / (dcm / 100))} V/m.`),
    };
  },
  // 11. capacitância
  (r) => {
    const C = r.pick([2, 4, 5, 10]), U = r.pick([6, 10, 12, 50]);
    return {
      e: `Um capacitor ligado a ${U} V armazena uma carga de ${C * U} µC. Qual é a sua capacitância?`,
      r: C,
      d: [C * U * U, U / C, C * U, C / 2],
      f: u('µF'),
      x: expl('C = Q/U', 'Capacitância é a carga guardada por volt.', `${C * U} ÷ ${U} = ${C} µF.`),
    };
  },
  // 12. energia no capacitor
  (r) => {
    const C = r.pick([10, 20, 100]), U = r.pick([10, 20, 100]);
    const E = (C * 1e-6 * U * U) / 2;
    return {
      e: `Um capacitor de ${C} µF está carregado com ${U} V. Quanta energia ele armazena?`,
      r: E,
      d: [C * 1e-6 * U * U, (C * 1e-6 * U) / 2, C * 1e-6 * U, E * 1e6],
      f: (v) => sci(v, 'J'),
      x: expl('E = C·U²/2', `C = ${C} · 10⁻⁶ F.`, `${C} · 10⁻⁶ · ${U}² ÷ 2 = ${sci(E)} J.`),
    };
  },
  // 13. indução: neutro é atraído
  (r) => ({
    e: `${r.pick(['Um pente eletrizado atrai pedacinhos de papel, que estão neutros. Por quê?', 'Um balão eletrizado gruda numa parede neutra. Por quê?'])}`,
    r: 'as cargas do objeto neutro se separam (polarização), e as de sinal oposto ficam mais perto',
    d: ['objetos neutros sempre são atraídos pela gravidade do objeto eletrizado', 'o objeto neutro recebe elétrons pelo ar antes de ser atraído', 'cargas iguais se atraem quando estão próximas', 'o objeto neutro tem carga oposta escondida no núcleo'],
    x: expl('indução e polarização', 'O objeto continua neutro, mas as cargas de sinal oposto ficam do lado mais próximo. Como a força elétrica diminui com a distância, a atração (mais perto) vence a repulsão (mais longe).', ''),
  }),
  // 14. poder das pontas
  (r) => ({
    e: `${r.pick(['Por que o para-raios tem a ponta afiada?', 'Em que se baseia o funcionamento do para-raios de Franklin?'])}`,
    r: 'nas pontas de um condutor a carga se concentra e o campo fica mais intenso (poder das pontas)',
    d: ['a ponta afiada repele os raios para longe do prédio', 'a ponta afiada é feita de material isolante', 'a ponta gera eletricidade quando o vento passa', 'a ponta diminui o campo elétrico ao redor do prédio'],
    x: expl('poder das pontas', 'Em regiões pontudas, a densidade de carga e o campo elétrico ficam maiores, ionizando o ar e oferecendo um caminho preferencial para a descarga, que é levada ao chão pelo cabo.', ''),
  }),
  // 15. elétron num campo
  (r) => {
    const dir = r.pick(['para a direita', 'para cima', 'para o norte']);
    const op = { 'para a direita': 'para a esquerda', 'para cima': 'para baixo', 'para o norte': 'para o sul' }[dir];
    return {
      e: `Num campo elétrico uniforme que aponta ${dir}, um elétron é solto em repouso. Para onde ele se move?`,
      r: op,
      d: [dir, 'fica parado', 'perpendicular ao campo', 'em círculos'],
      x: expl('F = q·E com sinal', 'Para carga negativa, a força tem sentido OPOSTO ao do campo.', `O elétron vai ${op}.`),
    };
  },
  // 16. potencial de carga puntiforme
  (r) => {
    const [Q, d] = r.pick([[1, 0.9], [2, 0.6], [3, 0.3], [4, 1.2], [5, 0.5]]);
    const V = (K * Q * 1e-6) / d;
    return {
      e: `Qual é o potencial elétrico a ${N(d * 100)} cm de uma carga puntiforme de ${Q} µC? (k = 9 · 10⁹ N·m²/C²)`,
      r: V,
      d: [V / d, V * d, V * 10, V / 10],
      f: (v) => sci(v, 'V'),
      x: expl('V = k·Q/d', 'O potencial cai com a distância (não com o quadrado).', `9 · 10⁹ · ${Q} · 10⁻⁶ ÷ ${N(d)} = ${sci(V)} V.`),
    };
  },
  // 17. unidades do campo
  (r) => ({
    e: `O campo elétrico pode ser medido em N/C. ${r.pick(['Qual destas unidades é equivalente?', 'Que outra unidade serve para o campo elétrico?'])}`,
    r: 'V/m',
    d: ['V·m', 'C/N', 'J/C', 'V/C'],
    x: expl('E = F/q = U/d', 'Pela relação do campo uniforme, E = U/d: volt por metro. Como 1 V = 1 J/C, V/m = J/(C·m) = N/C.', ''),
  }),
];

const medio = [
  // 1. Coulomb com números
  (r) => {
    const [q1, q2, d] = r.pick([[2, 3, 0.3], [1, 4, 0.2], [5, 2, 0.1], [4, 4, 0.4], [3, 6, 0.3]]);
    const F = (K * q1 * q2 * 1e-12) / (d * d);
    return {
      e: `Duas cargas de ${q1} µC e ${q2} µC estão a ${N(d * 100)} cm uma da outra, no vácuo. Qual é a intensidade da força entre elas? (k = 9 · 10⁹ N·m²/C²)`,
      r: F,
      d: [F * d, F / 10, F * 10, (K * q1 * q2 * 1e-12) / d],
      f: u('N'),
      x: expl('F = k·q₁·q₂/d²', `Em unidades do SI: ${q1} · 10⁻⁶ C, ${q2} · 10⁻⁶ C e d = ${N(d)} m.`, `9 · 10⁹ · ${q1 * q2} · 10⁻¹² ÷ ${N(d * d)} = ${N(r2(F))} N.`),
    };
  },
  // 2. campo de carga puntiforme
  (r) => {
    const [Q, d] = r.pick([[4, 0.2], [2, 0.3], [1, 0.3], [8, 0.4], [5, 0.5]]);
    const E = (K * Q * 1e-6) / (d * d);
    return {
      e: `Qual é a intensidade do campo elétrico a ${N(d * 100)} cm de uma carga puntiforme de ${Q} µC, no vácuo? (k = 9 · 10⁹ N·m²/C²)`,
      r: E,
      d: [(K * Q * 1e-6) / d, E * 10, E / 100, E * d],
      f: (v) => sci(v, 'N/C'),
      x: expl('E = k·Q/d²', `9 · 10⁹ · ${Q} · 10⁻⁶ = ${sci(K * Q * 1e-6)}; d² = ${N(d * d)}.`, `E = ${sci(E)} N/C.`),
    };
  },
  // 3. ponto de campo nulo entre cargas de mesmo sinal
  (r) => {
    const [k, d] = r.pick([[4, 30], [9, 40], [4, 60], [9, 20]]);
    const s = Math.sqrt(k);
    const x = d / (1 + s);
    return {
      e: `Duas cargas positivas, Q e ${k}Q, estão a ${d} cm uma da outra. Em que ponto entre elas o campo elétrico é nulo?`,
      r: x,
      d: [d / 2, d / (1 + k), d - x, d / k],
      f: (v) => `a ${N(r2(v))} cm da carga Q`,
      x: expl('igualar os dois campos', `kQ/x² = k·${k}Q/(${d} − x)² ⇒ (${d} − x)/x = √${k} = ${s}. O ponto fica mais perto da carga menor.`, `x = ${d} ÷ ${1 + s} = ${N(r2(x))} cm.`),
    };
  },
  // 4. contatos sucessivos
  (r) => {
    const Q = r.pick([16, 32, 40, 64]), n = r.pick([2, 3]);
    return {
      e: `Uma esfera A, com carga de ${Q} µC, toca ${n === 2 ? 'uma esfera neutra B e, depois, uma esfera neutra C' : 'esferas neutras B, C e D, uma de cada vez'}, todas idênticas a ela. Qual é a carga final de A?`,
      r: Q / 2 ** n,
      d: [Q / (n + 1), Q / n, Q / 2, Q / 2 ** (n + 1)],
      f: (v) => `${N(r2(v))} µC`,
      x: expl('cada contato divide ao meio', 'A cada toque com uma esfera neutra igual, a carga de A cai pela metade.', `${Q} ÷ ${2 ** n} = ${N(r2(Q / 2 ** n))} µC.`),
    };
  },
  // 5. energia de elétron acelerado
  (r) => {
    const U = r.pick([100, 500, 1000, 2000]);
    return {
      e: `Um elétron parte do repouso e é acelerado por uma diferença de potencial de ${N(U)} V. Que energia cinética ele ganha? (e = 1,6 · 10⁻¹⁹ C)`,
      r: 1.6e-19 * U,
      d: [1.6e-19 / U, 1.6e-19 * U * U, 1.6e-19, 1.6e-19 * U / 2],
      f: (v) => sci(v, 'J'),
      x: expl('Ec = q·U', `Isso também se escreve ${N(U)} eV (elétron-volt).`, `1,6 · 10⁻¹⁹ · ${N(U)} = ${sci(1.6e-19 * U)} J.`),
    };
  },
  // 6. trabalho entre dois pontos
  (r) => {
    const q = r.pick([2, 3, 5]), [VA, VB] = r.pick([[300, 100], [500, 200], [80, 20], [1000, 400]]);
    const W = q * 1e-6 * (VA - VB);
    return {
      e: `Uma carga de ${q} µC é levada do ponto A (potencial ${VA} V) ao ponto B (potencial ${VB} V). Qual é o trabalho da força elétrica?`,
      r: W,
      d: [q * 1e-6 * (VA + VB), -W, q * 1e-6 * VA, W * 1e6],
      f: (v) => sci(v, 'J'),
      x: expl('W = q·(V_A − V_B)', 'A carga positiva vai, sozinha, do potencial maior para o menor: o trabalho é positivo.', `${q} · 10⁻⁶ · (${VA} − ${VB}) = ${sci(W)} J.`),
    };
  },
  // 7. +Q e −Q: ponto médio
  (r) => ({
    e: `Duas cargas, +Q e −Q, estão a uma certa distância. ${r.pick(['O que se pode dizer do campo e do potencial no ponto médio entre elas?', 'No ponto médio entre elas, como ficam o campo elétrico e o potencial?'])}`,
    r: 'o potencial é nulo, mas o campo não',
    d: ['o campo é nulo, mas o potencial não', 'ambos são nulos', 'nenhum dos dois é nulo', 'o campo é nulo e o potencial é infinito'],
    x: expl('potencial é escalar; campo é vetor', 'Os potenciais kQ/d e −kQ/d se cancelam. Já os campos apontam no MESMO sentido (de +Q para −Q) e se somam.', ''),
  }),
  // 8. capacitores em paralelo
  (r) => {
    const cs = r.pick([[2, 3, 5], [1, 4, 5], [6, 3, 1], [10, 20, 30]]);
    const s = cs.reduce((a, b) => a + b, 0);
    const inv = 1 / cs.reduce((a, b) => a + 1 / b, 0);
    return {
      e: `Três capacitores, de ${cs[0]} µF, ${cs[1]} µF e ${cs[2]} µF, são ligados em paralelo. Qual é a capacitância equivalente?`,
      r: s,
      d: [inv, s / 3, Math.max(...cs), cs[0] * cs[1] * cs[2]],
      f: u('µF'),
      x: expl('capacitores em paralelo: somam', 'Em paralelo, é como se as placas ficassem maiores: as capacitâncias se somam (o contrário dos resistores).', `${cs.join(' + ')} = ${s} µF.`),
    };
  },
  // 9. capacitor plano: área e distância
  (r) => {
    const [a, b] = r.pick([[2, 2], [3, 1], [2, 4], [4, 2]]);
    return {
      e: `Num capacitor de placas paralelas, a área das placas é multiplicada por ${a} e a distância entre elas é ${b === 1 ? 'mantida' : `dividida por ${b}`}. A capacitância fica multiplicada por quanto?`,
      r: a * b,
      d: [a / b, a, b, a * b * b],
      f: (v) => N(r2(v)),
      x: expl('C = ε·A/d', `Área maior aumenta C; distância menor também aumenta C.`, `${a} · ${b} = ${a * b}.`),
    };
  },
  // 10. gota de Millikan
  (r) => {
    const n = r.pick([2, 3, 5, 4]);
    return {
      e: `Uma gotícula de óleo de massa ${N(1.6 * n)} · 10⁻¹⁵ kg fica parada num campo elétrico vertical de 10⁵ N/C. Quantos elétrons em excesso ela tem? (g = 10 m/s²; e = 1,6 · 10⁻¹⁹ C)`,
      r: n,
      d: [n * 10, n * 2, n + 1, 1],
      f: (v) => N(v),
      x: expl('equilíbrio: q·E = m·g', `q = m·g/E = ${N(1.6 * n)} · 10⁻¹⁵ · 10 ÷ 10⁵ = ${N(1.6 * n)} · 10⁻¹⁹ C.`, `n = q/e = ${n}.`),
    };
  },
  // 11. condutor em equilíbrio
  (r) => ({
    e: `Uma esfera metálica oca está eletrizada e em equilíbrio. ${r.pick(['Onde ficam as cargas em excesso?', 'Como se distribuem as cargas em excesso?'])}`,
    r: 'na superfície externa, e o campo no interior é nulo',
    d: ['espalhadas por todo o volume do metal', 'concentradas no centro da esfera', 'na superfície interna da cavidade', 'na superfície externa, e o campo no interior é máximo'],
    x: expl('repulsão mútua', 'As cargas de mesmo sinal se repelem e se afastam o máximo possível: vão para a superfície externa. No interior, o campo é nulo e o potencial é o mesmo da superfície.', ''),
  }),
  // 12. energia do capacitor com a tensão
  (r) => {
    const k = r.pick([2, 3, 4]), E = r.pick([0.5, 2, 5]);
    return {
      e: `Um capacitor armazena ${N(E)} J quando ligado a uma certa tensão. Quanta energia armazena se a tensão for multiplicada por ${k}?`,
      r: E * k * k,
      d: [E * k, E, E * k * k * k, E / k],
      f: u('J'),
      x: expl('E = C·U²/2', `A energia depende do QUADRADO da tensão: × ${k * k}.`, `${N(E)} · ${k * k} = ${N(r2(E * k * k))} J.`),
    };
  },
  // 13. equipotenciais
  (r) => ({
    e: `${r.pick(['Qual é o trabalho da força elétrica ao mover uma carga ao longo de uma superfície equipotencial?', 'Uma carga é levada de um ponto a outro de uma mesma superfície equipotencial. Quanto vale o trabalho da força elétrica?'])}`,
    r: 'zero, porque não há diferença de potencial',
    d: ['depende do caminho percorrido', 'é igual ao produto da carga pelo potencial', 'é máximo, porque o campo é paralelo à superfície', 'é negativo, porque a carga perde energia'],
    x: expl('W = q·(V_A − V_B)', 'Na mesma equipotencial, V_A = V_B. Por isso as linhas de campo cortam as equipotenciais sempre em ângulo reto.', ''),
  }),
  // 14. aceleração em campo uniforme
  (r) => {
    const [q, m, E] = r.pick([[2, 1, 5000], [5, 2, 4000], [1, 0.5, 10000], [4, 1, 2500]]);
    const a = (q * 1e-6 * E) / (m * 1e-3);
    return {
      e: `Uma partícula de ${N(m)} g, com carga de ${q} µC, é solta num campo elétrico uniforme de ${N(E)} N/C (despreze o peso). Qual é a sua aceleração?`,
      r: a,
      d: [a / 1000, a * 1000, q * E, a * 2],
      f: u('m/s²'),
      x: expl('F = q·E e F = m·a', `F = ${q} · 10⁻⁶ · ${N(E)} = ${sci(q * 1e-6 * E)} N; m = ${sci(m * 1e-3)} kg.`, `a = F/m = ${N(r2(a))} m/s².`),
    };
  },
  // 15. campo no ponto médio de +Q e −Q
  (r) => {
    const [Q, d] = r.pick([[1, 0.6], [2, 0.6], [1, 0.2], [4, 0.4]]);
    const E1 = (K * Q * 1e-6) / ((d / 2) ** 2);
    return {
      e: `Duas cargas, +${Q} µC e −${Q} µC, estão a ${N(d * 100)} cm uma da outra. Qual é o campo elétrico no ponto médio? (k = 9 · 10⁹ N·m²/C²)`,
      r: 2 * E1,
      d: [0, E1, (2 * K * Q * 1e-6) / (d * d), 4 * E1],
      f: (v) => sci(v, 'N/C'),
      x: expl('campos no mesmo sentido se somam', `Cada carga está a ${N(d / 2)} m e cria ${sci(E1)} N/C. Os dois campos apontam de +Q para −Q.`, `Total: 2 · ${sci(E1)} = ${sci(2 * E1)} N/C.`),
    };
  },
  // 16. pente e papel: o papel fica neutro?
  (r) => {
    const q = r.pick([3, 6, 9]);
    return {
      e: `Um bastão com carga de +${q} nC é aproximado (sem tocar) de uma esfera metálica neutra, isolada. Qual é a carga total da esfera enquanto o bastão está perto?`,
      r: 'zero: as cargas só se separam dentro dela',
      d: [`−${q} nC`, `+${q} nC`, `−${N(q / 2)} nC`, `+${N(q / 2)} nC`],
      x: expl('indução sem contato', 'Os elétrons da esfera se deslocam para o lado do bastão, deixando o outro lado positivo. Nenhuma carga entra nem sai: o total continua zero.', ''),
    };
  },
  // 17. potencial com duas cargas
  (r) => {
    const [q1, q2, d] = r.pick([[2, 4, 0.3], [3, -1, 0.3], [5, 1, 0.9], [4, -2, 0.6]]);
    const V = (K * (q1 + q2) * 1e-6) / d;
    return {
      e: `Duas cargas, de ${N(q1)} µC e ${N(q2)} µC, estão ambas a ${N(d * 100)} cm de um ponto P. Qual é o potencial elétrico em P? (k = 9 · 10⁹ N·m²/C²)`,
      r: V,
      d: [(K * (Math.abs(q1) + Math.abs(q2)) * 1e-6) / d, (K * (q1 + q2) * 1e-6) / (d * d), (K * (q1 - q2) * 1e-6) / d, V / 2],
      f: (v) => sci(v, 'V'),
      x: expl('potencial é escalar: soma com sinal', `V = k·(q₁ + q₂)/d = 9 · 10⁹ · ${N(q1 + q2)} · 10⁻⁶ ÷ ${N(d)}.`, `V = ${sci(V)} V.`),
    };
  },
];

const dificil = [
  // 1. força depois do contato
  (r) => {
    const [a, b] = r.pick([[6, -2], [5, -1], [8, -4], [9, -3]]);
    const f = fracao(((a + b) / 2) ** 2, Math.abs(a * b));
    const f2 = fracao(((a - b) / 2) ** 2, Math.abs(a * b));
    return {
      e: `Duas esferas metálicas idênticas, com cargas de +${a} µC e ${b} µC, se atraem com força F quando estão a uma distância d. Elas são encostadas e depois recolocadas à mesma distância. Qual é a nova força?`,
      r: `${f} de F, de repulsão`,
      d: [`${f} de F, de atração`, 'F, de atração', 'zero', `${f2} de F, de repulsão`],
      x: expl('contato + Coulomb', `Depois do contato, cada uma fica com (${a} + (${b})) ÷ 2 = ${N((a + b) / 2)} µC, ambas positivas: repulsão. A força é proporcional ao produto das cargas: antes ${Math.abs(a * b)}, depois ${N(((a + b) / 2) ** 2)}.`, `A nova força é ${N(((a + b) / 2) ** 2)}/${Math.abs(a * b)} = ${f} de F.`),
    };
  },
  // 2. ponto de campo nulo fora, cargas opostas
  (r) => {
    const d = r.pick([10, 20, 30]);
    return {
      e: `As cargas +Q e −4Q estão a ${d} cm uma da outra. Onde o campo elétrico resultante é nulo?`,
      r: `a ${d} cm de +Q, do lado oposto ao de −4Q`,
      d: [`no ponto médio entre elas`, `a ${N(d / 3)} cm de +Q, entre as duas`, `a ${d} cm de −4Q, do lado oposto ao de +Q`, `não existe ponto de campo nulo`],
      x: expl('cargas opostas: o ponto fica fora, perto da menor', `Entre elas os campos têm o mesmo sentido e não se anulam. Do lado de +Q, a x de +Q: kQ/x² = k·4Q/(x + ${d})² ⇒ x + ${d} = 2x.`, `x = ${d} cm.`),
    };
  },
  // 3. capacitores em série
  (r) => {
    const [c1, c2, U] = r.pick([[3, 6, 12], [2, 2, 10], [4, 12, 8], [6, 3, 9]]);
    const C = (c1 * c2) / (c1 + c2);
    return {
      e: `Capacitores de ${c1} µF e ${c2} µF são ligados em série a uma bateria de ${U} V. Qual é a carga em cada um?`,
      r: C * U,
      d: [(c1 + c2) * U, c1 * U, c2 * U, (C * U) / 2],
      f: (v) => `${N(r2(v))} µC`,
      x: expl('em série: mesma carga, 1/C = 1/C₁ + 1/C₂', `C = ${c1} · ${c2} ÷ ${c1 + c2} = ${N(r2(C))} µF.`, `Q = ${N(r2(C))} · ${U} = ${N(r2(C * U))} µC em cada um.`),
    };
  },
  // 4. capacitor carregado ligado a outro igual
  (r) => {
    const C = r.pick([2, 4, 10]), U = r.pick([50, 100, 200]);
    const E0 = (C * 1e-6 * U * U) / 2;
    return {
      e: `Um capacitor de ${C} µF, carregado com ${U} V, é desligado da fonte e ligado a outro capacitor idêntico, descarregado. Quanta energia fica armazenada no total, no final?`,
      r: E0 / 2,
      d: [E0, E0 / 4, E0 * 2, (E0 * 3) / 4],
      f: (v) => sci(v, 'J'),
      x: expl('conserva a carga, não a energia', `A carga ${C * U} µC se divide entre os dois: a tensão cai para ${U / 2} V. Energia inicial: ${sci(E0)} J; final: 2 · ${C} · 10⁻⁶ · ${U / 2}² ÷ 2.`, `${sci(E0 / 2)} J: metade se perde no fio, como calor e radiação.`),
    };
  },
  // 5. velocidade de partícula acelerada
  (r) => {
    const [q, U, m, v] = r.pick([[2, 100, 4, 10], [1, 200, 1, 20], [5, 90, 1, 30], [3, 150, 1, 30]]);
    return {
      e: `Uma partícula de ${m} · 10⁻⁶ kg, com carga de ${q} µC, parte do repouso e é acelerada por uma diferença de potencial de ${U} V. Qual é a sua velocidade final?`,
      r: v,
      d: [v * v, v / 2, Math.sqrt((q * U) / m), v * Math.SQRT2],
      f: u('m/s'),
      x: expl('q·U = m·v²/2', `${q} · 10⁻⁶ · ${U} = ${m} · 10⁻⁶ · v²/2 ⇒ v² = 2 · ${q * U} ÷ ${m} = ${(2 * q * U) / m}.`, `v = ${v} m/s.`),
    };
  },
  // 6. pêndulo elétrico inclinado
  (r) => {
    const [m, E, ang, tg] = r.pick([[1, 1e4, 45, 1], [2, 1e4, 45, 1], [3, 1e4, 45, 1], [1, 2e4, 45, 1]]);
    const q = (m * 1e-3 * 10 * tg) / E;
    return {
      e: `Uma bolinha de ${m} g, presa a um fio isolante, está num campo elétrico horizontal de ${sci(E)} N/C e fica em equilíbrio com o fio a ${ang}° da vertical. Qual é a sua carga? (g = 10 m/s²)`,
      r: q * 1e6,
      d: [q * 1e6 * 2, q * 1e6 / 2, q * 1e9, q * 1e6 * Math.SQRT2],
      f: (v) => `${N(r2(v))} µC`,
      x: expl('equilíbrio de três forças', `Com o fio a 45°, a força elétrica horizontal é igual ao peso: q·E = m·g = ${sci(m * 1e-3 * 10)} N.`, `q = ${sci(m * 1e-2)} ÷ ${sci(E)} = ${sci(q)} C = ${N(r2(q * 1e6))} µC.`),
    };
  },
  // 7. trabalho para aproximar cargas
  (r) => {
    const [q, Q, d] = r.pick([[1, 2, 0.3], [2, 3, 0.9], [1, 5, 0.5], [4, 1, 0.6]]);
    const W = (K * q * Q * 1e-12) / d;
    return {
      e: `Que trabalho um agente externo precisa realizar para trazer, devagar, uma carga de ${q} µC desde muito longe até ${N(d * 100)} cm de uma carga fixa de ${Q} µC? (k = 9 · 10⁹ N·m²/C²)`,
      r: W,
      d: [W / d, W * d, -W * 10, W * 2],
      f: (v) => sci(v, 'J'),
      x: expl('W = q·V = k·q·Q/d', 'Muito longe, o potencial é zero. O trabalho externo é a energia potencial do par no final.', `9 · 10⁹ · ${q * Q} · 10⁻¹² ÷ ${N(d)} = ${sci(W)} J.`),
    };
  },
  // 8. centro de um quadrado
  (r) => {
    const [Q, dist] = r.pick([[1, 0.3], [2, 0.3], [1, 0.6], [3, 0.9]]);
    const V = (4 * K * Q * 1e-6) / dist;
    return {
      e: `Quatro cargas iguais, de +${Q} µC, estão nos vértices de um quadrado, cada uma a ${N(dist * 100)} cm do centro. Quanto valem o campo e o potencial no centro? (k = 9 · 10⁹ N·m²/C²)`,
      r: `E = 0 e V = ${sci(V, 'V')}`,
      d: [`E = 0 e V = 0`, `E = ${sci(V / dist, 'N/C')} e V = 0`, `E = ${sci((4 * K * Q * 1e-6) / (dist * dist), 'N/C')} e V = ${sci(V, 'V')}`, `E = 0 e V = ${sci(V / 4, 'V')}`],
      x: expl('campo: vetores que se cancelam; potencial: escalares que se somam', 'Os campos das cargas opostas pela diagonal têm sentidos contrários e se anulam. Os potenciais são todos positivos e se somam.', `V = 4 · 9 · 10⁹ · ${Q} · 10⁻⁶ ÷ ${N(dist)} = ${sci(V)} V.`),
    };
  },
  // 9. dielétrico com carga constante
  (r) => {
    const U = r.pick([100, 120, 300]), k = r.pick([2, 3, 4, 5]);
    return {
      e: `Um capacitor carregado com ${U} V é desligado da bateria. Depois, o espaço entre as placas é preenchido por um material de constante dielétrica ${k}. Qual passa a ser a tensão entre as placas?`,
      r: U / k,
      d: [U * k, U, U / (k * k), U - k],
      f: u('V'),
      x: expl('C fica k vezes maior; Q não muda', `Desligado, a carga fica presa nas placas. Como U = Q/C e C ficou ${k} vezes maior, a tensão cai ${k} vezes.`, `${U} ÷ ${k} = ${N(r2(U / k))} V.`),
    };
  },
  // 10. campo com d em milímetros e força num elétron
  (r) => {
    const U = r.pick([200, 400, 1000]), dmm = r.pick([2, 4, 5]);
    const E = U / (dmm / 1000);
    return {
      e: `Entre duas placas a ${dmm} mm uma da outra há uma tensão de ${N(U)} V. Qual é a força elétrica sobre um elétron entre elas? (e = 1,6 · 10⁻¹⁹ C)`,
      r: 1.6e-19 * E,
      d: [1.6e-19 * U, 1.6e-19 * (U / dmm), 1.6e-19 * E * 1000, E],
      f: (v) => sci(v, 'N'),
      x: expl('E = U/d e F = q·E', `E = ${N(U)} ÷ ${N(dmm / 1000, 3)} = ${sci(E)} V/m.`, `F = 1,6 · 10⁻¹⁹ · ${sci(E)} = ${sci(1.6e-19 * E)} N.`),
    };
  },
  // 11. esferas ligadas por um fio
  (r) => {
    const [R1, R2, Q] = r.pick([[1, 3, 8], [2, 3, 10], [1, 4, 15], [2, 6, 16]]);
    const q2 = (Q * R2) / (R1 + R2);
    return {
      e: `Duas esferas condutoras, de raios ${R1} cm e ${R2} cm, muito distantes, são ligadas por um fio fino. A carga total é ${Q} µC. Com quanto fica a esfera de ${R2} cm?`,
      r: q2,
      d: [Q / 2, (Q * R1) / (R1 + R2), (Q * R2 * R2) / (R1 * R1 + R2 * R2), Q],
      f: (v) => `${N(r2(v))} µC`,
      x: expl('ligadas: mesmo potencial', `kQ₁/R₁ = kQ₂/R₂ ⇒ a carga é proporcional ao raio: ${R1} : ${R2}.`, `Q₂ = ${Q} · ${R2}/${R1 + R2} = ${N(r2(q2))} µC.`),
    };
  },
  // 12. resultante no vértice de um triângulo equilátero
  (r) => {
    const F = r.pick([0.9, 0.4, 1.2, 2]);
    return {
      e: `Duas cargas positivas iguais estão em dois vértices de um triângulo equilátero. Uma terceira carga positiva, no terceiro vértice, sofre de cada uma delas uma força de ${N(F)} N. Qual é a força resultante sobre ela?`,
      r: `${N(F)}√3 N`,
      d: [`${N(2 * F)} N`, `${N(F)} N`, '0', `${N(F)}√2 N`],
      x: expl('soma de vetores a 60°', 'As duas forças fazem 60° entre si. A resultante é 2F·cos 30° = F√3.', `${N(F)}√3 ≈ ${N(r2(F * Math.sqrt(3)))} N.`),
    };
  },
  // 13. elétron e próton no mesmo campo
  (r) => ({
    e: `Um elétron e um próton são soltos no mesmo campo elétrico uniforme. ${r.pick(['Como se comparam as forças e as acelerações?', 'O que se pode afirmar sobre as forças e as acelerações dos dois?'])} (A massa do próton é cerca de 1 836 vezes a do elétron.)`,
    r: 'forças de mesmo módulo e sentidos opostos; a aceleração do elétron é cerca de 1 836 vezes maior',
    d: ['forças e acelerações iguais', 'a força no próton é 1 836 vezes maior; as acelerações são iguais', 'forças de mesmo módulo e mesmo sentido; a aceleração do próton é maior', 'o elétron não sofre força, porque é leve demais'],
    x: expl('F = q·E e a = F/m', 'As cargas têm o mesmo valor (e) e sinais opostos: forças iguais e opostas. Com massa 1 836 vezes menor, o elétron acelera 1 836 vezes mais.', ''),
  }),
  // 14. flash de câmera
  (r) => {
    const [C, U, t] = r.pick([[100, 300, 1], [200, 300, 2], [100, 200, 0.5], [400, 100, 1]]);
    const E = (C * 1e-6 * U * U) / 2;
    return {
      e: `O capacitor do flash de uma câmera tem ${C} µF e é carregado a ${U} V. Ele se descarrega na lâmpada em ${N(t)} ms. Qual é a potência média da descarga?`,
      r: E / (t / 1000),
      d: [E, E / t, (C * 1e-6 * U * U) / (t / 1000), E * t],
      f: u('W'),
      x: expl('E = C·U²/2 e P = E/Δt', `E = ${C} · 10⁻⁶ · ${U}² ÷ 2 = ${N(r2(E))} J.`, `P = ${N(r2(E))} ÷ (${N(t)} · 10⁻³) = ${N(r2(E / (t / 1000)))} W.`),
    };
  },
  // 15. eletroscópio por indução
  (r) => {
    const s = r.pick(['negativamente', 'positivamente']);
    const op = s === 'negativamente' ? 'positiva' : 'negativa';
    return {
      e: `Um bastão carregado ${s} é aproximado de um eletroscópio neutro, sem tocá-lo. Com o bastão perto, a esfera do eletroscópio é ligada à terra por um instante; depois desfaz-se a ligação e o bastão é afastado. Qual é a carga final do eletroscópio?`,
      r: op,
      d: [s === 'negativamente' ? 'negativa' : 'positiva', 'nula', 'positiva e negativa ao mesmo tempo', 'depende do material do bastão'],
      x: expl('indução com aterramento', `O bastão repele as cargas de mesmo sinal para a terra (ou atrai elétrons da terra). Cortada a ligação, sobra carga de sinal oposto ao do bastão.`, `Fica com carga ${op}.`),
    };
  },
  // 16. energia potencial de um sistema de três cargas
  (r) => {
    const [q, d] = r.pick([[1, 0.3], [2, 0.3], [1, 0.9], [3, 0.9]]);
    const U = (3 * K * q * q * 1e-12) / d;
    return {
      e: `Três cargas iguais, de ${q} µC, estão nos vértices de um triângulo equilátero de lado ${N(d * 100)} cm. Qual é a energia potencial elétrica do sistema? (k = 9 · 10⁹ N·m²/C²)`,
      r: U,
      d: [U / 3, U * 2, (3 * K * q * q * 1e-12) / (d * d), U / d],
      f: (v) => sci(v, 'J'),
      x: expl('some a energia de cada PAR', `Há 3 pares, cada um com k·q²/d = ${sci((K * q * q * 1e-12) / d)} J.`, `Total: 3 · ${sci((K * q * q * 1e-12) / d)} = ${sci(U)} J.`),
    };
  },
];

export default [
  {
    disciplina: 'fisica',
    arquivo: '10-eletrostatica',
    titulo: 'Eletrostática: carga, campo, potencial e capacitores',
    provas: ['ENEM', 'Militares'],
    descricao: 'Processos de eletrização, lei de Coulomb, campo elétrico, potencial e trabalho, condutores em equilíbrio e capacitores.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
