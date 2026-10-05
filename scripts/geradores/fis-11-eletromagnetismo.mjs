// Física — Magnetismo e eletromagnetismo: ímãs, campo de correntes, força magnética, indução e transformadores.
// μ₀ = 4π · 10⁻⁷ T·m/A; g = 10 m/s².
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
const sciPi = (v, un) => sci(v, un).replace(/^([\d,]+)( ·|$| )/, (m, c, rest) => `${c === '1' ? '' : c}π${rest}`); // 1,6 · 10⁻³ → 1,6π · 10⁻³

const facil = [
  // 1. ímã partido
  (r) => ({
    e: `Um ímã em barra é ${r.pick(['partido ao meio', 'cortado em três pedaços'])}. O que acontece com os polos?`,
    r: 'cada pedaço vira um ímã completo, com polo norte e polo sul',
    d: ['um pedaço fica só com o polo norte e o outro só com o sul', 'os pedaços perdem o magnetismo', 'só o pedaço maior continua sendo ímã', 'os pedaços ficam com dois polos norte'],
    x: expl('não existe monopolo magnético', 'O magnetismo vem de cada pedacinho do material. Por menor que seja o pedaço, ele sempre tem os dois polos.', ''),
  }),
  // 2. bússola
  (r) => ({
    e: `${r.pick(['O polo norte da agulha de uma bússola aponta para o norte geográfico. Por quê?', 'Por que a agulha da bússola aponta para o norte geográfico?'])}`,
    r: 'perto do norte geográfico fica o polo sul magnético da Terra, que atrai o polo norte da agulha',
    d: ['perto do norte geográfico fica o polo norte magnético, que atrai o polo norte da agulha', 'a agulha é atraída pelo gelo do Polo Norte', 'a rotação da Terra empurra a agulha para o norte', 'a agulha aponta para a estrela Polar'],
    x: expl('polos opostos se atraem', 'O polo norte da agulha é atraído por um polo SUL. Então, magneticamente, a Terra tem um polo sul perto do norte geográfico.', ''),
  }),
  // 3. Oersted
  (r) => ({
    e: `Em 1820, Oersted percebeu que a agulha de uma bússola se mexia perto de um fio ligado a uma pilha. ${r.pick(['O que essa experiência mostrou?', 'Qual foi a conclusão?'])}`,
    r: 'uma corrente elétrica cria campo magnético em volta dela',
    d: ['um ímã cria corrente elétrica num fio parado perto dele', 'a pilha era um ímã', 'a corrente elétrica anula o campo magnético da Terra', 'o fio de cobre é magnético'],
    x: expl('eletricidade e magnetismo são ligados', 'Foi a primeira prova de que cargas em movimento criam campo magnético. Isso é a base dos eletroímãs e motores.', ''),
  }),
  // 4. campo de fio: proporcionalidades
  (r) => {
    const B = r.pick([8, 12, 20]), [ki, kd] = r.pick([[2, 1], [1, 2], [3, 1], [2, 4], [4, 2]]);
    const novo = (B * ki) / kd;
    return {
      e: `A uma certa distância de um fio longo, o campo magnético vale ${B} µT. Se ${ki === 1 ? 'a corrente for mantida' : `a corrente for multiplicada por ${ki}`} e ${kd === 1 ? 'a distância também' : `a distância por ${kd}`}, quanto passa a valer?`,
      r: novo,
      d: [(B * ki) / (kd * kd), B * ki * kd, (B * kd) / ki, B],
      f: u('µT'),
      x: expl('B = μ₀·i/(2π·d)', 'O campo do fio é proporcional à corrente e inversamente proporcional à distância (não ao quadrado).', `${B} · ${ki} ÷ ${kd} = ${N(r2(novo))} µT.`),
    };
  },
  // 5. forma das linhas do fio
  (r) => ({
    e: `${r.pick(['Como são as linhas do campo magnético criado por um fio reto e longo com corrente?', 'Que forma têm as linhas de campo magnético em volta de um fio retilíneo com corrente?'])}`,
    r: 'circunferências em volta do fio, com sentido dado pela regra da mão direita',
    d: ['retas paralelas ao fio', 'retas que saem do fio, como raios', 'uma única circunferência, só na superfície do fio', 'não há linhas: o fio não cria campo'],
    x: expl('regra da mão direita', 'Polegar no sentido da corrente: os outros dedos, ao se fecharem, mostram o sentido das linhas circulares.', ''),
  }),
  // 6. força numa carga em movimento
  (r) => {
    const q = r.pick([2, 4, 5]), v = r.pick([1, 2, 5]) * 1e3, B = r.pick([0.5, 0.2, 2]);
    return {
      e: `Uma partícula com carga de ${q} µC se move a ${sci(v)} m/s, perpendicularmente a um campo magnético de ${N(B)} T. Qual é a força magnética sobre ela?`,
      r: q * 1e-6 * v * B,
      d: [q * v * B, (q * 1e-6 * v) / B, q * 1e-6 * B, q * 1e-6 * v * B * 10],
      f: (x) => sci(x, 'N'),
      x: expl('F = q·v·B (velocidade perpendicular ao campo)', `${q} µC = ${q} · 10⁻⁶ C.`, `${q} · 10⁻⁶ · ${sci(v)} · ${N(B)} = ${sci(q * 1e-6 * v * B)} N.`),
    };
  },
  // 7. carga parada
  (r) => ({
    e: `Uma carga elétrica está ${r.pick(['parada', 'em repouso'])} entre os polos de um ímã forte. Que força magnética ela sofre?`,
    r: 'nenhuma',
    d: ['uma força para o polo norte', 'uma força para o polo sul', 'uma força que a faz girar', 'uma força igual ao seu peso'],
    x: expl('F = q·v·B·sen θ', 'Com v = 0, a força magnética é zero. O campo magnético só age sobre cargas em movimento.', ''),
  }),
  // 8. velocidade paralela ao campo
  (r) => ({
    e: `Um elétron se move ${r.pick(['na mesma direção', 'paralelamente à direção'])} das linhas de um campo magnético uniforme. O que acontece com ele?`,
    r: 'segue em linha reta, com velocidade constante, porque a força magnética é nula',
    d: ['faz um movimento circular', 'é freado até parar', 'é acelerado ao longo das linhas', 'é desviado para o lado em linha reta'],
    x: expl('sen 0° = 0', 'Com a velocidade paralela ao campo, o ângulo é 0° (ou 180°) e F = q·v·B·sen θ = 0.', ''),
  }),
  // 9. solenoide
  (r) => {
    const B = r.pick([2, 3, 5]), [kn, ki] = r.pick([[2, 1], [2, 2], [1, 3], [3, 2]]);
    return {
      e: `O campo no interior de um solenoide vale ${B} mT. O número de espiras por metro é multiplicado por ${kn} e a corrente por ${ki}. Quanto passa a valer o campo?`,
      r: B * kn * ki,
      d: [B * (kn + ki), (B * kn) / ki, B * kn * ki * ki, B],
      f: u('mT'),
      x: expl('B = μ₀·n·i', 'O campo no solenoide é proporcional ao número de espiras por metro e à corrente.', `${B} · ${kn} · ${ki} = ${B * kn * ki} mT.`),
    };
  },
  // 10. eletroímã
  (r) => ({
    e: `${r.pick(['Por que os eletroímãs usam um núcleo de ferro dentro da bobina?', 'Qual é a função do núcleo de ferro de um eletroímã?'])}`,
    r: 'o ferro se imanta e reforça muito o campo magnético da bobina',
    d: ['o ferro conduz melhor a corrente que o cobre', 'o ferro impede que a bobina esquente', 'o ferro anula o campo da Terra', 'o ferro torna o ímã permanente mesmo sem corrente'],
    x: expl('material ferromagnético', 'O ferro se alinha com o campo da bobina e o reforça. Desligada a corrente, o ferro doce perde quase toda a imantação: por isso o eletroímã pode ser ligado e desligado.', ''),
  }),
  // 11. indução precisa de variação
  (r) => ({
    e: `Um ímã está ${r.pick(['parado dentro de uma bobina', 'em repouso no interior de uma bobina'])} ligada a um amperímetro. O que o amperímetro indica?`,
    r: 'zero, porque o fluxo magnético não está variando',
    d: ['uma corrente constante, enquanto o ímã estiver lá', 'uma corrente que aumenta com o tempo', 'uma corrente alternada', 'uma corrente que depende só da força do ímã'],
    x: expl('lei de Faraday', 'Só há corrente induzida quando o fluxo magnético VARIA: mexendo o ímã, a bobina ou mudando o campo.', ''),
  }),
  // 12. fluxo
  (r) => {
    const B = r.pick([0.2, 0.4, 0.5, 2]), A = r.pick([0.5, 0.1, 0.02, 0.25]);
    return {
      e: `Uma espira de área ${N(A)} m² está num campo magnético uniforme de ${N(B)} T, perpendicular ao plano da espira. Qual é o fluxo magnético que a atravessa?`,
      r: B * A,
      d: [B / A, A / B, B + A, B * A * 2],
      f: (v) => `${N(v, v < 0.01 ? 3 : null)} Wb`,
      x: expl('Φ = B·A', 'Com o campo perpendicular ao plano, o fluxo é campo vezes área.', `${N(B)} · ${N(A)} = ${N(B * A, 3).replace(/0+$/, '').replace(/,$/, '')} Wb.`),
    };
  },
  // 13. transformador: tensão
  (r) => {
    const [Up, Np, Ns] = r.pick([[220, 1000, 50], [120, 600, 60], [220, 2000, 100], [127, 500, 2000], [110, 200, 1000]]);
    const Us = (Up * Ns) / Np;
    return {
      e: `Um transformador tem ${N(Np)} espiras no primário e ${N(Ns)} no secundário. Ligado a ${Up} V no primário, qual é a tensão no secundário?`,
      r: Us,
      d: [(Up * Np) / Ns, Up, Up - Np / Ns, Ns / Np],
      f: u('V'),
      x: expl('U_s/U_p = N_s/N_p', 'A tensão acompanha o número de espiras.', `${Up} · ${N(Ns)} ÷ ${N(Np)} = ${N(r2(Us))} V.`),
    };
  },
  // 14. transformador e corrente contínua
  (r) => ({
    e: `${r.pick(['Por que um transformador não funciona ligado a uma bateria comum?', 'Um transformador ligado a uma pilha não dá tensão no secundário. Por quê?'])}`,
    r: 'a corrente da bateria é contínua: o fluxo não varia e não há indução no secundário',
    d: ['a bateria tem tensão alta demais', 'o transformador só funciona com corrente muito pequena', 'a bateria desmagnetiza o núcleo de ferro', 'o secundário fica em curto-circuito'],
    x: expl('indução precisa de fluxo variável', 'Com corrente alternada, o campo no núcleo varia o tempo todo e induz tensão no secundário. Com corrente contínua, o campo fica constante.', ''),
  }),
  // 15. gerador
  (r) => ({
    e: `${r.pick(['Numa usina hidrelétrica, como o gerador produz eletricidade?', 'Qual é o princípio de funcionamento do gerador de uma usina?'])}`,
    r: 'a turbina gira bobinas e ímãs uns em relação aos outros, variando o fluxo e induzindo corrente',
    d: ['a água carrega cargas elétricas que são coletadas', 'o atrito da água com a turbina eletriza o metal', 'a pressão da água comprime cristais que geram tensão', 'a turbina aquece fios, que liberam elétrons'],
    x: expl('indução eletromagnética', 'O gerador transforma energia mecânica (giro) em elétrica: ao girar, o fluxo nas bobinas varia e aparece tensão induzida (lei de Faraday).', ''),
  }),
  // 16. unidade
  (r) => ({
    e: `${r.pick(['Qual é a unidade de campo magnético no SI?', 'Em que unidade do SI se mede a intensidade do campo magnético B?'])}`,
    r: 'tesla (T)',
    d: ['weber (Wb)', 'newton por coulomb (N/C)', 'henry (H)', 'volt por metro (V/m)'],
    x: expl('B em tesla; fluxo em weber', '1 T = 1 N/(A·m). O weber (Wb = T·m²) é a unidade de fluxo magnético.', ''),
  }),
  // 17. Faraday simples
  (r) => {
    const dPhi = r.pick([0.6, 0.3, 1.2, 0.05]), t = r.pick([0.2, 0.1, 0.3, 0.5]);
    return {
      e: `O fluxo magnético numa espira varia ${N(dPhi)} Wb em ${N(t)} s. Qual é a força eletromotriz média induzida?`,
      r: dPhi / t,
      d: [dPhi * t, t / dPhi, dPhi, (dPhi / t) * 2],
      f: u('V'),
      x: expl('ε = ΔΦ/Δt', 'Quanto mais rápida a variação do fluxo, maior a tensão induzida.', `${N(dPhi)} ÷ ${N(t)} = ${N(r2(dPhi / t))} V.`),
    };
  },
];

const medio = [
  // 1. campo de fio com números
  (r) => {
    const i = r.pick([5, 10, 20, 30]), d = r.pick([0.1, 0.05, 0.2]);
    const B = (2e-7 * i) / d;
    return {
      e: `Qual é o campo magnético a ${N(d * 100)} cm de um fio longo percorrido por ${i} A? (μ₀ = 4π · 10⁻⁷ T·m/A)`,
      r: B,
      d: [(4e-7 * i) / d, (2e-7 * i) / (d * d), 2e-7 * i * d, B * 10],
      f: (v) => sci(v, 'T'),
      x: expl('B = μ₀·i/(2π·d) = 2 · 10⁻⁷ · i/d', 'O π do μ₀ cancela com o 2π.', `2 · 10⁻⁷ · ${i} ÷ ${N(d)} = ${sci(B)} T.`),
    };
  },
  // 2. centro da espira
  (r) => {
    const [i, R] = r.pick([[10, 0.2], [5, 0.1], [4, 0.2], [20, 0.4]]);
    const B = (2e-7 * i) / R; // vezes π
    return {
      e: `Uma espira circular de raio ${N(R * 100)} cm é percorrida por ${i} A. Qual é o campo magnético no seu centro? (μ₀ = 4π · 10⁻⁷ T·m/A)`,
      r: sciPi(B, 'T'),
      d: [sci(B, 'T'), sciPi(B / 2, 'T'), sciPi(B * 2, 'T'), sciPi(B / R, 'T')],
      x: expl('B = μ₀·i/(2R)', `4π · 10⁻⁷ · ${i} ÷ (2 · ${N(R)}).`, `B = ${sciPi(B, 'T')}.`),
    };
  },
  // 3. solenoide com números
  (r) => {
    const [Nn, L, i] = r.pick([[1000, 0.5, 2], [500, 0.25, 1], [2000, 0.4, 0.5], [800, 0.2, 2.5]]);
    const B = (4e-7 * Nn * i) / L; // vezes π
    return {
      e: `Um solenoide de ${N(L * 100)} cm de comprimento tem ${N(Nn)} espiras e é percorrido por ${N(i)} A. Qual é o campo no seu interior? (μ₀ = 4π · 10⁻⁷ T·m/A)`,
      r: sciPi(B, 'T'),
      d: [sci(B, 'T'), sciPi(B * L * L, 'T'), sciPi(B / 2, 'T'), sciPi(B * 10, 'T')],
      x: expl('B = μ₀·N·i/L', `n = ${N(Nn)} ÷ ${N(L)} = ${N(Nn / L)} espiras por metro.`, `4π · 10⁻⁷ · ${N(Nn / L)} · ${N(i)} = ${sciPi(B, 'T')}.`),
    };
  },
  // 4. raio de um próton
  (r) => {
    const [v, B] = r.pick([[1e6, 0.1], [1e6, 0.2], [2e6, 0.1], [1e6, 0.5]]);
    const R = (1.6e-27 * v) / (1.6e-19 * B);
    return {
      e: `Um próton (m = 1,6 · 10⁻²⁷ kg, q = 1,6 · 10⁻¹⁹ C) entra a ${sci(v)} m/s perpendicularmente a um campo magnético de ${N(B)} T. Qual é o raio da sua trajetória?`,
      r: R * 100,
      d: [R * 1000, R * 10, (R * 100) / 2, R * 100 * 2],
      f: u('cm'),
      x: expl('q·v·B = m·v²/R ⇒ R = m·v/(q·B)', `R = 1,6 · 10⁻²⁷ · ${sci(v)} ÷ (1,6 · 10⁻¹⁹ · ${N(B)}) = ${N(R)} m.`, `${N(R * 100)} cm.`),
    };
  },
  // 5. fios paralelos
  (r) => {
    const mesmo = r.pick([true, false]);
    return {
      e: `Dois fios paralelos são percorridos por correntes de ${mesmo ? 'mesmo sentido' : 'sentidos opostos'}. O que acontece entre eles?`,
      r: mesmo ? 'se atraem' : 'se repelem',
      d: [mesmo ? 'se repelem' : 'se atraem', 'não há força entre eles', 'giram um em torno do outro', 'a força depende só do material dos fios'],
      x: expl('cada fio está no campo do outro', 'Correntes de mesmo sentido se atraem; de sentidos opostos se repelem (o contrário das cargas). Essa força é usada para definir o ampère.', ''),
    };
  },
  // 6. F = B·i·L·sen θ
  (r) => {
    const [B, i, L] = r.pick([[0.5, 4, 0.5], [0.2, 10, 0.5], [0.4, 5, 0.2], [1, 2, 0.3]]);
    const ang = r.pick([30, 90]);
    const s = ang === 30 ? 0.5 : 1;
    return {
      e: `Um fio de ${N(L * 100)} cm, com corrente de ${i} A, está num campo magnético uniforme de ${N(B)} T, formando ${ang}° com as linhas do campo. Qual é a força magnética sobre o fio?`,
      r: B * i * L * s,
      d: [B * i * L * (ang === 30 ? 1 : 0.5), B * i * L * 0.87, B * i * L * s * 100, (B * L) / i],
      f: u('N'),
      x: expl('F = B·i·L·sen θ', `sen ${ang}° = ${N(s)}.`, `${N(B)} · ${i} · ${N(L)} · ${N(s)} = ${N(r2(B * i * L * s))} N.`),
    };
  },
  // 7. barra móvel
  (r) => {
    const [B, L, v, R] = r.pick([[0.5, 0.4, 10, 2], [0.2, 0.5, 20, 4], [1, 0.2, 5, 0.5], [0.4, 0.5, 15, 3]]);
    const e = B * L * v;
    return {
      e: `Uma barra de ${N(L * 100)} cm desliza a ${v} m/s sobre trilhos, perpendicular a um campo de ${N(B)} T. O circuito tem resistência de ${N(R)} Ω. Qual é a corrente induzida?`,
      r: e / R,
      d: [e, e * R, (B * v) / R, (e / R) * 2],
      f: u('A'),
      x: expl('ε = B·L·v e i = ε/R', `ε = ${N(B)} · ${N(L)} · ${v} = ${N(e)} V.`, `i = ${N(e)} ÷ ${N(R)} = ${N(r2(e / R))} A.`),
    };
  },
  // 8. lei de Lenz
  (r) => {
    const aprox = r.pick([true, false]);
    return {
      e: `O polo norte de um ímã é ${aprox ? 'aproximado de' : 'afastado de'} uma bobina. Que polo a corrente induzida cria na face da bobina voltada para o ímã?`,
      r: aprox ? 'polo norte, que repele o ímã' : 'polo sul, que atrai o ímã',
      d: [aprox ? 'polo sul, que atrai o ímã' : 'polo norte, que repele o ímã', 'nenhum, porque a corrente induzida não cria campo', 'os dois polos na mesma face', 'depende da resistência da bobina'],
      x: expl('lei de Lenz: a indução se opõe à variação', aprox ? 'Aproximar aumenta o fluxo; a bobina reage repelindo o ímã.' : 'Afastar diminui o fluxo; a bobina reage tentando segurar o ímã.', 'É a conservação de energia: para gerar corrente, é preciso fazer força.'),
    };
  },
  // 9. transformador: correntes
  (r) => {
    const [Up, Us, is] = r.pick([[120, 12, 5], [220, 11, 4], [240, 24, 10], [127, 254, 2]]);
    return {
      e: `Um transformador ideal ${Us > Up ? 'eleva' : 'reduz'} ${Up} V para ${Us} V. A corrente no secundário é de ${is} A. Qual é a corrente no primário?`,
      r: (Us * is) / Up,
      d: [(Up * is) / Us, is, is * Up, (Us * is) / Up * 2],
      f: u('A'),
      x: expl('transformador ideal: potência igual nos dois lados', `U_p · i_p = U_s · i_s ⇒ ${Up} · i_p = ${Us} · ${is}.`, `i_p = ${N(r2((Us * is) / Up))} A.`),
    };
  },
  // 10. alta tensão nas linhas
  (r) => ({
    e: `${r.pick(['Por que a energia elétrica é transmitida das usinas em tensões altíssimas?', 'Qual é a vantagem de transmitir energia elétrica em alta tensão?'])}`,
    r: 'para a mesma potência, a corrente fica menor e as perdas nos fios (R·i²) caem muito',
    d: ['a alta tensão aumenta a potência gerada pela usina', 'a alta tensão diminui a resistência dos fios', 'a alta tensão faz a energia viajar mais rápido', 'a alta tensão é mais segura para as pessoas'],
    x: expl('P = U·i e perda = R·i²', 'Multiplicando a tensão por 10, a corrente cai 10 vezes e a perda cai 100 vezes. Transformadores elevam a tensão na usina e a reduzem perto das casas.', ''),
  }),
  // 11. perda na linha
  (r) => {
    const k = r.pick([2, 5, 10, 20]), P = r.pick([400, 1000, 2500]);
    return {
      e: `Uma linha de transmissão perde ${N(P)} W por aquecimento. Se a mesma potência for transmitida com tensão ${k} vezes maior, qual passa a ser a perda?`,
      r: P / (k * k),
      d: [P / k, P * k, P, P * k * k],
      f: u('W'),
      x: expl('perda = R·i²', `Tensão ${k} vezes maior ⇒ corrente ${k} vezes menor ⇒ perda ${k * k} vezes menor.`, `${N(P)} ÷ ${k * k} = ${N(r2(P / (k * k)))} W.`),
    };
  },
  // 12. fluxo com ângulo
  (r) => {
    const [B, A] = r.pick([[0.4, 0.5], [0.2, 0.5], [0.8, 0.25], [1, 0.1]]);
    const ang = r.pick([60, 0, 90]);
    const c = { 0: 1, 60: 0.5, 90: 0 }[ang];
    return {
      e: `Uma espira de ${N(A)} m² está num campo uniforme de ${N(B)} T. A reta perpendicular ao plano da espira forma ${ang}° com o campo. Qual é o fluxo magnético?`,
      r: B * A * c,
      d: [B * A, B * A * 0.5, B * A * 0.87, B / A],
      f: (v) => `${N(r2(v))} Wb`,
      x: expl('Φ = B·A·cos θ', `cos ${ang}° = ${N(c)}. ${ang === 90 ? 'Com o campo paralelo ao plano, nenhuma linha atravessa a espira.' : ''}`, `${N(B)} · ${N(A)} · ${N(c)} = ${N(r2(B * A * c))} Wb.`),
    };
  },
  // 13. Faraday com N espiras
  (r) => {
    const [Ne, dPhi, t] = r.pick([[200, 0.02, 0.1], [100, 0.05, 0.25], [500, 0.004, 0.02], [50, 0.1, 0.5]]);
    const e = (Ne * dPhi) / t;
    return {
      e: `Uma bobina de ${Ne} espiras sofre, em cada espira, uma variação de fluxo de ${N(dPhi, 3).replace(/0+$/, '')} Wb em ${N(t)} s. Qual é a força eletromotriz média induzida?`,
      r: e,
      d: [dPhi / t, Ne * dPhi, (Ne * t) / dPhi, e / 2],
      f: u('V'),
      x: expl('ε = N·ΔΦ/Δt', 'Cada espira contribui com a sua parte; as tensões se somam.', `${Ne} · ${N(dPhi, 3).replace(/0+$/, '')} ÷ ${N(t)} = ${N(r2(e))} V.`),
    };
  },
  // 14. trajetórias possíveis
  (r) => {
    const [txt, resp] = r.pick([
      ['perpendicular às linhas', 'circunferência'],
      ['oblíqua às linhas (nem paralela, nem perpendicular)', 'hélice (espiral)'],
    ]);
    return {
      e: `Uma partícula carregada entra num campo magnético uniforme com velocidade ${txt}. Qual é a forma da sua trajetória?`,
      r: resp,
      d: ['reta', 'parábola', ...['circunferência', 'hélice (espiral)'].filter((t) => t !== resp), 'elipse'],
      x: expl('força sempre perpendicular à velocidade', 'A força magnética só muda a direção, não o valor da velocidade. Velocidade perpendicular ao campo: círculo. Com uma parte paralela, que não sofre força, o círculo "anda": hélice.', ''),
    };
  },
  // 15. seletor de velocidades
  (r) => {
    const [E, B] = r.pick([[1e4, 0.1], [2e4, 0.4], [5e3, 0.05], [3e4, 0.2]]);
    return {
      e: `Num seletor de velocidades, um campo elétrico de ${sci(E)} V/m e um campo magnético de ${N(B)} T, perpendiculares, deixam passar sem desvio só as partículas com certa velocidade. Qual é ela?`,
      r: E / B,
      d: [E * B, B / E, E / (B * B), E],
      f: (v) => sci(v, 'm/s'),
      x: expl('q·E = q·v·B', 'Sem desvio, a força elétrica e a magnética se equilibram; a carga se cancela.', `v = E/B = ${sci(E)} ÷ ${N(B)} = ${sci(E / B)} m/s.`),
    };
  },
  // 16. motor elétrico
  (r) => ({
    e: `${r.pick(['Qual é o princípio de funcionamento de um motor elétrico?', 'O que faz girar o eixo de um motor elétrico?'])}`,
    r: 'forças magnéticas sobre uma bobina com corrente, dentro de um campo magnético, produzem giro',
    d: ['a variação do fluxo induz corrente que esquenta a bobina', 'cargas elétricas paradas se repelem e empurram o eixo', 'o ímã gira sozinho e arrasta a corrente', 'a corrente contínua se transforma em alternada'],
    x: expl('F = B·i·L nos lados da espira', 'Os lados da espira sofrem forças opostas, que formam um binário (torque). O comutador inverte a corrente a cada meia volta para o giro continuar. É o inverso do gerador.', ''),
  }),
  // 17. energia cinética em campo magnético
  (r) => ({
    e: `Um elétron se move num campo magnético uniforme (sem campo elétrico). ${r.pick(['O que acontece com a sua energia cinética?', 'Como varia o valor da sua velocidade?'])}`,
    r: 'não muda, porque a força magnética é perpendicular à velocidade e não realiza trabalho',
    d: ['aumenta sempre', 'diminui até ele parar', 'aumenta e diminui periodicamente', 'depende do sentido do campo'],
    x: expl('trabalho de força perpendicular ao movimento é zero', 'A força magnética só curva a trajetória. O valor da velocidade, e portanto a energia cinética, fica constante.', ''),
  }),
];

const dificil = [
  // 1. força entre fios por metro
  (r) => {
    const [i1, i2, d] = r.pick([[10, 10, 0.1], [5, 20, 0.2], [20, 30, 0.3], [4, 5, 0.01]]);
    const f = (2e-7 * i1 * i2) / d;
    return {
      e: `Dois fios longos e paralelos, a ${N(d * 100)} cm um do outro, são percorridos por ${i1} A e ${i2} A. Qual é a força em cada metro de fio? (μ₀ = 4π · 10⁻⁷ T·m/A)`,
      r: f,
      d: [(2e-7 * i1 * i2) / (d * d), (4e-7 * i1 * i2) / d, (2e-7 * (i1 + i2)) / d, f * 100],
      f: (v) => sci(v, 'N/m'),
      x: expl('F/L = μ₀·i₁·i₂/(2π·d)', 'Um fio cria B = 2 · 10⁻⁷ · i₁/d no lugar do outro, que sofre F = B·i₂·L.', `F/L = 2 · 10⁻⁷ · ${i1 * i2} ÷ ${N(d)} = ${sci(f)} N/m.`),
    };
  },
  // 2. ponto médio entre fios
  (r) => {
    const [i, d] = r.pick([[10, 0.2], [5, 0.1], [20, 0.4], [15, 0.06]]);
    const mesmo = r.pick([true, false]);
    const B1 = (2e-7 * i) / (d / 2);
    return {
      e: `Dois fios paralelos, a ${N(d * 100)} cm um do outro, têm correntes de ${i} A em sentidos ${mesmo ? 'iguais' : 'opostos'}. Qual é o campo magnético no ponto médio entre eles?`,
      r: mesmo ? 0 : 2 * B1,
      d: mesmo ? [2 * B1, B1, B1 / 2, 4 * B1] : [0, B1, B1 / 2, 4 * B1],
      f: (v) => sci(v, 'T'),
      x: expl('soma vetorial dos campos', `Cada fio cria ${sci(B1)} T no ponto médio. ${mesmo ? 'Com correntes de mesmo sentido, os campos ali têm sentidos opostos e se cancelam.' : 'Com correntes opostas, os dois campos ali têm o mesmo sentido e se somam.'}`, mesmo ? 'B = 0.' : `B = ${sci(2 * B1)} T.`),
    };
  },
  // 3. próton × partícula alfa
  (r) => {
    const R = r.pick([10, 15, 20]);
    return {
      e: `Um próton descreve um círculo de raio ${R} cm num campo magnético. Uma partícula alfa (massa 4 vezes e carga 2 vezes as do próton), com a mesma velocidade e no mesmo campo, descreve um círculo de que raio?`,
      r: 2 * R,
      d: [4 * R, R / 2, R, 8 * R],
      f: u('cm'),
      x: expl('R = m·v/(q·B)', 'O raio é proporcional a m/q: (4m)/(2q) = 2 · m/q.', `R_α = 2 · ${R} = ${2 * R} cm.`),
    };
  },
  // 4. força para manter a barra
  (r) => {
    const [B, L, v, R] = r.pick([[0.5, 0.4, 10, 2], [0.2, 0.5, 20, 4], [1, 0.2, 5, 0.5], [0.4, 0.5, 15, 3]]);
    const i = (B * L * v) / R;
    return {
      e: `Uma barra de ${N(L * 100)} cm é puxada a ${v} m/s, com velocidade constante, sobre trilhos sem atrito, num campo de ${N(B)} T perpendicular ao plano. A resistência do circuito é ${N(R)} Ω. Que força é preciso fazer na barra?`,
      r: B * i * L,
      d: [B * L * v, i, B * i * L * v, 0],
      f: u('N'),
      x: expl('Lenz: a força magnética freia a barra', `ε = B·L·v = ${N(B * L * v)} V; i = ${N(r2(i))} A. A força magnética B·i·L se opõe ao movimento; para manter a velocidade, a força externa a equilibra.`, `F = ${N(B)} · ${N(r2(i))} · ${N(L)} = ${N(r2(B * i * L))} N.`),
    };
  },
  // 5. potência na barra
  (r) => {
    const [B, L, v, R] = r.pick([[0.5, 0.4, 10, 2], [0.2, 0.5, 20, 4], [1, 0.2, 5, 0.5], [0.4, 0.5, 15, 3]]);
    const e = B * L * v;
    return {
      e: `Uma barra de ${N(L * 100)} cm se move a ${v} m/s sobre trilhos, num campo de ${N(B)} T. O resistor do circuito tem ${N(R)} Ω. Qual é a potência dissipada no resistor?`,
      r: (e * e) / R,
      d: [e / R, e * e * R, e, (e * e) / (2 * R)],
      f: u('W'),
      x: expl('P = ε²/R (= F·v)', `ε = ${N(B)} · ${N(L)} · ${v} = ${N(e)} V.`, `P = ${N(e)}² ÷ ${N(R)} = ${N(r2((e * e) / R))} W. É exatamente a potência da força que puxa a barra: a energia mecânica vira elétrica.`),
    };
  },
  // 6. gerador: tensão máxima
  (r) => {
    const [Ne, B, A, w] = r.pick([[100, 0.2, 0.05, 100], [200, 0.1, 0.02, 300], [50, 0.5, 0.04, 100], [500, 0.05, 0.01, 400]]);
    const e = Ne * B * A * w;
    return {
      e: `Um gerador tem uma bobina de ${Ne} espiras, cada uma com ${N(A)} m², girando a ${w} rad/s num campo de ${N(B)} T. Qual é a tensão máxima gerada?`,
      r: e,
      d: [B * A * w, Ne * B * A, e / 2, e * 2],
      f: u('V'),
      x: expl('ε_máx = N·B·A·ω', 'O fluxo varia como cos(ωt); a taxa máxima de variação é B·A·ω por espira.', `${Ne} · ${N(B)} · ${N(A)} · ${w} = ${N(r2(e))} V.`),
    };
  },
  // 7. corrente induzida por campo que varia
  (r) => {
    const [Ne, A, B1, B2, t, R] = r.pick([[100, 0.05, 0.2, 0.8, 0.3, 5], [50, 0.1, 0.1, 0.5, 0.2, 10], [200, 0.02, 0, 0.5, 0.1, 4], [20, 0.5, 0.6, 0.2, 0.4, 2]]);
    const e = (Ne * A * Math.abs(B2 - B1)) / t;
    return {
      e: `Uma bobina de ${Ne} espiras, de ${N(A)} m² cada, está num campo perpendicular que passa de ${N(B1)} T para ${N(B2)} T em ${N(t)} s. A resistência da bobina é ${N(R)} Ω. Qual é a corrente induzida média?`,
      r: e / R,
      d: [e, (A * Math.abs(B2 - B1)) / t / R, (Ne * A * B2) / t / R, (e * R)],
      f: u('A'),
      x: expl('ε = N·A·ΔB/Δt e i = ε/R', `ε = ${Ne} · ${N(A)} · ${N(r2(Math.abs(B2 - B1)))} ÷ ${N(t)} = ${N(r2(e))} V.`, `i = ${N(r2(e))} ÷ ${N(R)} = ${N(r2(e / R))} A.`),
    };
  },
  // 8. transformador com carga
  (r) => {
    const [Up, Us, R] = r.pick([[200, 20, 10], [120, 12, 4], [220, 22, 11], [100, 400, 200]]);
    const is = Us / R;
    return {
      e: `Um transformador ideal tem ${Up} V no primário e ${Us} V no secundário, que alimenta um resistor de ${R} Ω. Qual é a corrente no primário?`,
      r: (Us * is) / Up,
      d: [is, Up / R, (Up * is) / Us, Us / Up],
      f: u('A'),
      x: expl('primeiro o secundário, depois a potência', `i_s = ${Us} ÷ ${R} = ${N(r2(is))} A; P = ${Us} · ${N(r2(is))} = ${N(r2(Us * is))} W.`, `i_p = ${N(r2(Us * is))} ÷ ${Up} = ${N(r2((Us * is) / Up))} A.`),
    };
  },
  // 9. ímã caindo no tubo
  (r) => ({
    e: `Um ímã forte é solto dentro de um tubo vertical de ${r.pick(['cobre', 'alumínio'])} (que não é atraído por ímãs) e cai bem mais devagar do que fora do tubo. Por quê?`,
    r: 'o movimento do ímã induz correntes no tubo, que criam campos que se opõem à queda',
    d: ['o cobre é atraído pelo ímã como o ferro', 'o ar dentro do tubo freia o ímã', 'o tubo blinda a gravidade', 'o atrito com as paredes do tubo freia o ímã'],
    x: expl('correntes de Foucault + lei de Lenz', 'O fluxo no tubo varia enquanto o ímã passa, induzindo correntes em anel no metal. Pela lei de Lenz, elas freiam o movimento. É o princípio dos freios eletromagnéticos.', ''),
  }),
  // 10. espectrômetro de massa
  (r) => {
    const d = r.pick([10, 12, 15]), k = r.pick([2, 3]);
    return {
      e: `Num espectrômetro de massa, íons de mesma carga e mesma velocidade entram num campo magnético e fazem meia volta. Íons de massa m atingem o detector a ${d} cm da entrada. A que distância chegam íons de massa ${k}m?`,
      r: d * k,
      d: [d * k * k, d / k, d, d * Math.sqrt(k)],
      f: u('cm'),
      x: expl('R = m·v/(q·B)', `Meia volta: a distância é o diâmetro 2R, proporcional à massa.`, `${d} · ${k} = ${d * k} cm.`),
    };
  },
  // 11. espira × fio
  (r) => ({
    e: `Compare o campo no centro de uma espira circular de raio R com o campo a uma distância R de um fio reto e longo, ambos com a mesma corrente. ${r.pick(['Quantas vezes o da espira é maior?', 'Qual é a razão B_espira / B_fio?'])}`,
    r: 'π',
    d: ['2', '2π', '1/π', '1'],
    x: expl('B_espira = μ₀i/(2R); B_fio = μ₀i/(2πR)', 'Dividindo uma pela outra, sobra π.', ''),
  }),
  // 12. frequência de ciclotron
  (r) => {
    const B = r.pick([0.314, 0.628, 0.942]);
    const f = (1e8 * B) / (2 * 3.14);
    return {
      e: `Num cíclotron, prótons (q/m ≈ 10⁸ C/kg) giram num campo de ${N(B, 3)} T. Qual é a frequência do seu movimento circular? (π = 3,14)`,
      r: f,
      d: [f * 2, f / 2, 1e8 * B, f * 3.14],
      f: (v) => sci(v, 'Hz'),
      x: expl('f = q·B/(2π·m)', 'A frequência não depende da velocidade nem do raio: é isso que permite acelerar com uma tensão alternada de frequência fixa.', `f = 10⁸ · ${N(B, 3)} ÷ 6,28 = ${sci(f)} Hz.`),
    };
  },
  // 13. espira em campo uniforme
  (r) => ({
    e: `Uma espira retangular com corrente está num campo magnético uniforme, com o plano paralelo às linhas de campo. ${r.pick(['O que ela sofre?', 'Qual é o efeito do campo sobre ela?'])}`,
    r: 'força resultante nula, mas um torque que tende a girá-la',
    d: ['uma força resultante que a empurra na direção do campo', 'nenhuma força e nenhum torque', 'força resultante e torque, ambos não nulos', 'uma força que a comprime, sem torque'],
    x: expl('forças opostas em lados opostos', 'Em campo uniforme, as forças nos lados opostos têm o mesmo valor e sentidos contrários: a soma é zero. Mas não estão na mesma reta, então formam um binário: é assim que funciona o motor.', ''),
  }),
  // 14. velocidade terminal da barra que cai
  (r) => {
    const [m, R, B, L] = r.pick([[0.02, 2, 0.5, 0.4], [0.01, 1, 0.5, 0.2], [0.05, 4, 1, 0.5], [0.04, 0.5, 0.2, 0.5]]);
    const v = (m * 10 * R) / (B * B * L * L);
    return {
      e: `Uma barra de ${N(m * 1000)} g e ${N(L * 100)} cm cai, sem atrito, apoiada em trilhos verticais ligados por um resistor de ${N(R)} Ω, num campo horizontal de ${N(B)} T perpendicular ao plano. Qual é a sua velocidade limite? (g = 10 m/s²)`,
      r: v,
      d: [(m * 10 * R) / (B * L), (m * 10) / (B * B * L * L), v * 2, (B * B * L * L) / (m * 10 * R)],
      f: u('m/s'),
      x: expl('peso = força magnética', `A força magnética é B·i·L com i = B·L·v/R, ou seja, B²·L²·v/R. Ela cresce com v até igualar o peso.`, `v = m·g·R/(B²·L²) = ${N(m * 10)} · ${N(R)} ÷ (${N(B)}² · ${N(L)}²) = ${N(r2(v))} m/s.`),
    };
  },
  // 15. espira que gira 90°
  (r) => {
    const [A, B, t] = r.pick([[0.1, 0.5, 0.1], [0.2, 0.4, 0.05], [0.05, 0.8, 0.02], [0.5, 0.2, 0.25]]);
    return {
      e: `Uma espira de ${N(A)} m² está perpendicular a um campo de ${N(B)} T. Em ${N(t)} s, ela gira até ficar com o plano paralelo ao campo. Qual é a força eletromotriz média induzida?`,
      r: (A * B) / t,
      d: [0, (A * B * 2) / t, A * B, (A * B) / (2 * t)],
      f: u('V'),
      x: expl('ε = ΔΦ/Δt', `O fluxo vai de B·A = ${N(r2(A * B))} Wb (perpendicular) a 0 (paralelo).`, `${N(r2(A * B))} ÷ ${N(t)} = ${N(r2((A * B) / t))} V.`),
    };
  },
  // 16. raio com energia cinética dada
  (r) => {
    const k = r.pick([4, 9, 16]);
    return {
      e: `Um elétron descreve um círculo de raio R num campo magnético. Se a sua energia cinética for multiplicada por ${k}, no mesmo campo, qual será o novo raio?`,
      r: `${Math.sqrt(k)}R`,
      d: [`${k}R`, `${k * k}R`, `R/${Math.sqrt(k)}`, 'R'],
      x: expl('R = m·v/(q·B) e Ec = m·v²/2', `Energia ${k} vezes maior ⇒ velocidade √${k} = ${Math.sqrt(k)} vezes maior ⇒ raio ${Math.sqrt(k)} vezes maior.`, ''),
    };
  },
];

export default [
  {
    disciplina: 'fisica',
    arquivo: '11-magnetismo-e-eletromagnetismo',
    titulo: 'Magnetismo e eletromagnetismo',
    provas: ['ENEM', 'Militares'],
    descricao: 'Ímãs e campo magnético, campo criado por correntes, força magnética sobre cargas e fios, indução (Faraday e Lenz), geradores e transformadores.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
