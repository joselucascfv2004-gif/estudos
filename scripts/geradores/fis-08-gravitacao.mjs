// Física — Gravitação: leis de Kepler, gravitação universal, campo gravitacional e satélites.
// g = 10 m/s² na superfície da Terra; raio da Terra R = 6 400 km.
import { expl, nome, num, sup } from './util.mjs';

const N = (v, c = null) => num(v, c);
const r2 = (v) => Math.round(v * 100) / 100;
const u = (un) => (v) => `${N(r2(v))} ${un}`;
const sci = (c, e) => `${N(c)} · 10${sup(e)}`; // 6,67 · 10⁻¹¹
const hm = (seg) => {
  const h = Math.floor(seg / 3600), m = Math.floor((seg % 3600) / 60), s = Math.round(seg % 60);
  return [h && `${h} h`, m && `${m} min`, s && `${s} s`].filter(Boolean).join(' ');
};

const facil = [
  // 1. distância multiplicada
  (r) => {
    const F = r.pick([36, 72, 144, 288]), k = r.pick([2, 3, 4]);
    return {
      e: `Dois corpos se atraem com uma força gravitacional de ${F} N. Se a distância entre eles for multiplicada por ${k}, qual será a nova força?`,
      r: F / (k * k),
      d: [F / k, F * k, F * k * k, F / (2 * k)],
      f: u('N'),
      x: expl('F = G·M·m/d²', `A força cai com o QUADRADO da distância: distância ${k} vezes maior, força ${k * k} vezes menor.`, `${F} ÷ ${k * k} = ${N(r2(F / (k * k)))} N.`),
    };
  },
  // 2. massas multiplicadas
  (r) => {
    const F = r.pick([5, 10, 20, 25]), a = r.pick([2, 3]), b = r.pick([2, 4, 5]);
    return {
      e: `Dois corpos se atraem com força gravitacional de ${F} N. A massa de um deles é multiplicada por ${a} e a do outro por ${b}, mantendo a distância. Qual é a nova força?`,
      r: F * a * b,
      d: [F * (a + b), F * a, (F * a * b) / 2, F * a * b * a * b],
      f: u('N'),
      x: expl('F é proporcional ao produto das massas', `Cada massa entra multiplicando: a força fica ${a} · ${b} = ${a * b} vezes maior.`, `${F} · ${a * b} = ${F * a * b} N.`),
    };
  },
  // 3. peso na Lua
  (r) => {
    const m = r.pick([50, 60, 70, 75, 80, 90]);
    return {
      e: `Um astronauta de ${m} kg está na Lua, onde g = 1,6 m/s². Qual é o seu peso lá?`,
      r: m * 1.6,
      d: [m * 10, m, m / 6, m * 10 - m * 1.6],
      f: u('N'),
      x: expl('P = m·g', 'O peso depende da gravidade do lugar.', `${m} · 1,6 = ${N(m * 1.6)} N.`),
    };
  },
  // 4. a massa não muda
  (r) => {
    const m = r.pick([55, 65, 72, 85]);
    return {
      e: `Na Terra, uma pessoa tem massa de ${m} kg. Qual é a sua massa na Lua, onde a gravidade é cerca de 6 vezes menor?`,
      r: m,
      d: [m / 6, m * 6, m * 1.6, m * 10],
      f: u('kg'),
      x: expl('massa ≠ peso', 'A massa é a quantidade de matéria e não depende do lugar. Quem muda é o peso (P = m·g).', `Continua ${m} kg.`),
    };
  },
  // 5. 3ª lei de Kepler (conceito)
  (r) => {
    const [p1, p2] = r.pick([['Marte', 'Júpiter'], ['Vênus', 'Saturno'], ['Mercúrio', 'Netuno']]);
    return {
      e: `${p2} está bem mais longe do Sol do que ${p1}. Pela 3ª lei de Kepler, o que se pode dizer do ano (período de translação) de ${p2}?`,
      r: `é mais longo que o de ${p1}`,
      d: [`é mais curto que o de ${p1}`, `é igual ao de ${p1}`, `depende só da massa de ${p2}`, `é igual ao período de rotação de ${p2}`],
      x: expl('3ª lei de Kepler: T² = k·a³', 'Quanto maior o raio médio da órbita, maior o período: o planeta percorre um caminho maior e com menor velocidade.', ''),
    };
  },
  // 6. 1ª lei de Kepler
  (r) => ({
    e: `Segundo a 1ª lei de Kepler, ${r.pick(['como são as órbitas dos planetas em torno do Sol?', 'que forma têm as órbitas planetárias e onde fica o Sol?'])}`,
    r: 'elipses, com o Sol em um dos focos',
    d: ['circunferências, com o Sol no centro', 'elipses, com o Sol no centro', 'parábolas, com o Sol no vértice', 'circunferências, com a Terra no centro'],
    x: expl('1ª lei (lei das órbitas)', 'As órbitas são elípticas e o Sol ocupa um dos focos, não o centro. (Muitas são quase circulares, mas a forma é de elipse.)', ''),
  }),
  // 7. 2ª lei de Kepler
  (r) => ({
    e: `Um cometa percorre uma órbita bem alongada em torno do Sol. Pela 2ª lei de Kepler, ${r.pick(['em que ponto ele é mais rápido?', 'onde a sua velocidade é máxima?'])}`,
    r: 'no ponto mais próximo do Sol (periélio)',
    d: ['no ponto mais distante do Sol (afélio)', 'a velocidade é a mesma em toda a órbita', 'nos pontos do eixo menor da elipse', 'no centro da elipse'],
    x: expl('2ª lei (lei das áreas)', 'A reta Sol–cometa varre áreas iguais em tempos iguais. Perto do Sol essa reta é curta, então o cometa precisa andar mais depressa para varrer a mesma área.', ''),
  }),
  // 8. distância dividida
  (r) => {
    const F = r.pick([2, 3, 5, 8]), k = r.pick([2, 3, 4]);
    return {
      e: `Duas esferas se atraem com força de ${F} · 10⁻⁹ N. Se a distância entre os seus centros for dividida por ${k}, qual será a nova força?`,
      r: F * k * k,
      d: [F * k, F / k, F * k * k * k, F * 2 * k],
      f: (v) => `${N(v)} · 10⁻⁹ N`,
      x: expl('F = G·M·m/d²', `Distância ${k} vezes menor deixa d² ${k * k} vezes menor, e a força ${k * k} vezes maior.`, `${F} · ${k * k} = ${F * k * k} (· 10⁻⁹ N).`),
    };
  },
  // 9. peso a uma altura igual ao raio
  (r) => {
    const P = r.pick([600, 700, 800, 900]);
    return {
      e: `Um objeto pesa ${P} N na superfície da Terra. Quanto pesaria a uma altitude igual ao raio da Terra?`,
      r: P / 4,
      d: [P / 2, P, P / 8, P / 3],
      f: u('N'),
      x: expl('g cai com o quadrado da distância ao CENTRO', 'A uma altitude R, a distância ao centro é 2R: o dobro. A gravidade fica 2² = 4 vezes menor.', `${P} ÷ 4 = ${P / 4} N.`),
    };
  },
  // 10. g em outro planeta
  (r) => {
    const [a, b] = r.pick([[2, 1], [4, 2], [9, 3], [8, 2], [1, 2], [3, 3]]);
    const g = (10 * a) / (b * b);
    return {
      e: `Um planeta tem ${a === 1 ? 'a mesma massa' : `${a} vezes a massa`} da Terra e ${b === 1 ? 'o mesmo raio' : `${b} vezes o raio`} da Terra. Qual é a gravidade na sua superfície? (Na Terra, g = 10 m/s².)`,
      r: g,
      d: [(10 * a) / b, 10 * a * b, (10 * b) / a, (10 * a) / (b * b * b)],
      f: u('m/s²'),
      x: expl('g = G·M/R²', `${a === 1 ? 'A massa é a mesma' : `A massa multiplica por ${a}`}; ${b === 1 ? 'o raio é o mesmo' : `o raio ao quadrado divide por ${b * b}`}.`, `10 · ${a} ÷ ${b * b} = ${N(r2(g))} m/s².`),
    };
  },
  // 11. satélite geoestacionário: período
  (r) => ({
    e: `Um satélite ${r.pick(['de TV', 'de telecomunicações', 'meteorológico'])} geoestacionário parece parado no céu para quem está na Terra. Qual é o período da sua órbita?`,
    r: 'cerca de 24 horas',
    d: ['cerca de 1 hora', 'cerca de 12 horas', 'cerca de 27 dias', 'cerca de 365 dias'],
    x: expl('acompanhar a rotação da Terra', 'Para ficar sempre sobre o mesmo ponto do equador, o satélite precisa dar uma volta no mesmo tempo que a Terra gira em torno de si mesma.', 'Um dia: cerca de 24 h.'),
  }),
  // 12. por que os astronautas flutuam
  (r) => ({
    e: `Os astronautas da Estação Espacial Internacional, a cerca de 400 km de altitude, ${r.pick(['flutuam dentro dela.', 'parecem não ter peso.'])} Qual é a explicação correta?`,
    r: 'eles e a estação estão em queda livre juntos, em órbita',
    d: ['lá não existe gravidade', 'a gravidade da Lua anula a da Terra', 'no vácuo os corpos não têm peso', 'a estação tem um motor que anula a gravidade'],
    x: expl('órbita = queda livre contínua', 'A 400 km a gravidade ainda é quase 90% da que há na superfície. A estação e tudo dentro dela caem juntos em direção à Terra o tempo todo, mas andam tão rápido de lado que nunca chegam ao chão.', ''),
  }),
  // 13. ação e reação
  (r) => {
    const [a, b, raz] = r.pick([['a Terra', 'a Lua', 81], ['o Sol', 'a Terra', 333000]]);
    const ini = (t) => t[0].toUpperCase() + t.slice(1);
    return {
      e: `A massa d${a} é cerca de ${N(raz)} vezes a d${b}. ${ini(a)} atrai ${b} com uma força F. Com que força ${b} atrai ${a}?`,
      r: 'com a mesma força F',
      d: [`com F/${N(raz)}`, `com ${N(raz)}F`, 'com força nula', `com F/${N(Math.round(Math.sqrt(raz)))}`],
      x: expl('3ª lei de Newton (ação e reação)', 'As duas forças formam um par ação-reação: mesma intensidade, sentidos opostos. A massa diferente muda a ACELERAÇÃO de cada corpo, não a força.', ''),
    };
  },
  // 14. unidade de G
  (r) => ({
    e: `Na lei da gravitação, F = G·M·m/d². ${r.pick(['Qual é a unidade da constante G no SI?', 'Em que unidade do SI se mede a constante G?'])}`,
    r: 'N·m²/kg²',
    d: ['N/kg', 'm/s²', 'N·kg²/m²', 'kg·m/s'],
    x: expl('isolar G', 'G = F·d²/(M·m). Trocando cada grandeza pela sua unidade: N · m² / (kg · kg).', 'N·m²/kg².'),
  }),
  // 15. peso em Marte
  (r) => {
    const m = r.pick([40, 50, 60, 80, 100]);
    return {
      e: `Um robô de ${m} kg vai explorar Marte, onde a gravidade é 3,7 m/s². Qual é o seu peso em Marte?`,
      r: m * 3.7,
      d: [m * 10, m, m * 10 - m * 3.7, m / 3.7],
      f: u('N'),
      x: expl('P = m·g', 'Use a gravidade de Marte.', `${m} · 3,7 = ${N(m * 3.7)} N.`),
    };
  },
  // 16. marés
  (r) => ({
    e: `${r.pick(['O que causa as marés nos oceanos?', 'Qual é a principal causa das marés?'])}`,
    r: 'a atração gravitacional da Lua (e do Sol), mais forte no lado da Terra mais próximo dela',
    d: ['o vento, que empurra a água para a costa', 'a rotação da Terra sozinha, sem influência da Lua', 'o calor do Sol, que dilata a água', 'o campo magnético da Terra'],
    x: expl('diferença de atração', 'A Lua puxa mais a água do lado mais próximo e menos a do lado oposto. Essa diferença estica os oceanos e cria duas marés altas por dia.', ''),
  }),
  // 17. a Terra encolhendo
  (r) => {
    const k = r.pick([2, 3, 4]);
    return {
      e: `Se a Terra encolhesse até ${k === 2 ? 'metade' : `1/${k}`} do seu raio, sem perder massa, quanto valeria a gravidade na superfície? (Hoje, g = 10 m/s².)`,
      r: 10 * k * k,
      d: [10 * k, 10 / k, 10, 10 * k * k * k],
      f: u('m/s²'),
      x: expl('g = G·M/R²', `Raio ${k} vezes menor deixa R² ${k * k} vezes menor; com a mesma massa, g fica ${k * k} vezes maior.`, `10 · ${k * k} = ${10 * k * k} m/s².`),
    };
  },
];

const medio = [
  // 1. Kepler: período a partir do raio
  (r) => {
    const a = r.pick([4, 9, 16, 25]);
    const T = a ** 1.5;
    return {
      e: `Um asteroide orbita o Sol a uma distância média de ${a} UA (1 UA é a distância Terra–Sol). Qual é o seu período, em anos terrestres?`,
      r: T,
      d: [a, a * a, 2 * a, Math.sqrt(a)],
      f: (v) => `${N(v)} anos`,
      x: expl('3ª lei de Kepler: T² = a³ (em anos e UA)', `Para a Terra, T = 1 ano e a = 1 UA, então no Sistema Solar T² = a³.`, `T² = ${a}³ = ${a ** 3} ⇒ T = ${T} anos.`),
    };
  },
  // 2. Kepler: raio a partir do período
  (r) => {
    const T = r.pick([8, 27, 64, 125]);
    const a = Math.round(Math.cbrt(T * T));
    return {
      e: `Um corpo celeste leva ${T} anos para dar uma volta em torno do Sol. Qual é o raio médio da sua órbita, em UA?`,
      r: a,
      d: [T, Math.cbrt(T), T * T, T / 2],
      f: (v) => `${N(r2(v))} UA`,
      x: expl('3ª lei de Kepler: T² = a³', 'Em anos e UA, a constante vale 1.', `a³ = ${T}² = ${T * T} ⇒ a = ${a} UA.`),
    };
  },
  // 3. g a k raios de altitude
  (r) => {
    const k = r.pick([1, 2, 3, 4]);
    const g = 10 / ((k + 1) ** 2);
    return {
      e: `Qual é a aceleração da gravidade a uma altitude igual a ${k === 1 ? 'um raio' : `${k} raios`} da Terra? (Na superfície, g = 10 m/s².)`,
      r: g,
      d: [10 / (k * k), 10 / (k + 1), 10 / k, 10 / ((k + 2) ** 2)],
      f: u('m/s²'),
      x: expl('distância ao centro, não altitude', `A distância ao centro é R + ${k === 1 ? '' : k}R = ${k + 1}R. A gravidade cai com o quadrado: ${(k + 1) ** 2} vezes menor.`, `10 ÷ ${(k + 1) ** 2} ≈ ${N(r2(g))} m/s².`),
    };
  },
  // 4. velocidade de órbita rasante
  (r) => {
    const [g, R, v] = r.pick([[10, 6400, 8], [4, 4000, 4], [2.5, 1600, 2], [9, 4000, 6], [5, 5000, 5]]);
    return {
      e: `Um planeta tem raio de ${N(R)} km e gravidade de ${N(g)} m/s² na superfície. Qual é a velocidade de um satélite em órbita circular rente à superfície (sem atmosfera)?`,
      r: v,
      d: [v * v, v / 2, Math.sqrt(2) * v, v * 2],
      f: (x) => `${N(r2(x))} km/s`,
      x: expl('peso = força centrípeta', 'Na órbita rasante, m·g = m·v²/R, então v = √(g·R). Use R em metros.', `v = √(${N(g)} · ${N(R * 1000)}) = √${N(g * R * 1000)} = ${N(v * 1000)} m/s = ${v} km/s.`),
    };
  },
  // 5. razão de velocidades orbitais
  (r) => {
    const k = r.pick([4, 9, 16]), v = r.pick([6, 8, 12]);
    return {
      e: `Um satélite em órbita circular de raio r tem velocidade de ${v} km/s. Outro satélite, em órbita circular de raio ${k}r em torno do mesmo planeta, tem que velocidade?`,
      r: v / Math.sqrt(k),
      d: [v / k, v * Math.sqrt(k), v, v * k],
      f: (x) => `${N(r2(x))} km/s`,
      x: expl('v = √(G·M/r)', `A velocidade orbital cai com a RAIZ do raio: raio ${k} vezes maior, velocidade √${k} = ${Math.sqrt(k)} vezes menor.`, `${v} ÷ ${Math.sqrt(k)} = ${N(r2(v / Math.sqrt(k)))} km/s.`),
    };
  },
  // 6. força entre duas esferas (notação científica)
  (r) => {
    const [a, b, d] = r.pick([[2, 8, 4], [3, 3, 3], [4, 9, 6], [1, 4, 2], [5, 5, 5]]);
    return {
      e: `Duas esferas de ${a} t e ${b} t têm os centros a ${d} m de distância. Qual é a força gravitacional entre elas? (G = 6,67 · 10⁻¹¹ N·m²/kg²)`,
      r: -5,
      d: [-11, -8, -2, -4],
      f: (n) => `${sci(6.67, n)} N`,
      x: expl('F = G·M·m/d² com massas em kg', `${a} t = ${a} · 10³ kg e ${b} t = ${b} · 10³ kg. O produto das massas é ${a * b} · 10⁶ e d² = ${d * d}.`, `F = 6,67 · 10⁻¹¹ · ${a * b} · 10⁶ ÷ ${d * d} = 6,67 · 10⁻⁵ N.`),
    };
  },
  // 7. peso em planeta com massa e raio diferentes
  (r) => {
    const [a, b] = r.pick([[2, 2], [8, 2], [3, 3], [4, 4]]);
    const m = r.pick([50, 60, 80]);
    const g = (10 * a) / (b * b);
    return {
      e: `${nome(r)}, de ${m} kg, visita (na imaginação) um planeta com ${a} vezes a massa e ${b} vezes o raio da Terra. Qual seria o seu peso lá? (g da Terra = 10 m/s²)`,
      r: m * g,
      d: [m * 10, (m * 10 * a) / b, m * 10 * a, m * g * 2],
      f: u('N'),
      x: expl('g = G·M/R²', `g = 10 · ${a} ÷ ${b}² = ${N(r2(g))} m/s².`, `P = ${m} · ${N(r2(g))} = ${N(r2(m * g))} N.`),
    };
  },
  // 8. altitude onde g cai a uma fração
  (r) => {
    const k = r.pick([2, 3, 4]);
    return {
      e: `A que altitude acima da superfície a gravidade vale 1/${k * k} da gravidade na superfície? (Raio da Terra: 6 400 km.)`,
      r: 6400 * (k - 1),
      d: [6400 * k, 6400 * (k * k - 1), 6400 / k, 6400 * k * k],
      f: (v) => `${N(v)} km`,
      x: expl('g ∝ 1/d²', `Gravidade ${k * k} vezes menor exige distância ao centro ${k} vezes maior: d = ${k}R. A altitude é o que passa da superfície.`, `h = ${k}R − R = ${k - 1}R = ${N(6400 * (k - 1))} km.`),
    };
  },
  // 9. condições do geoestacionário
  (r) => ({
    e: `Para um satélite ser geoestacionário (ficar sempre sobre o mesmo ponto da Terra), ${r.pick(['que condições a órbita precisa ter?', 'como deve ser a sua órbita?'])}`,
    r: 'circular, no plano do equador, no sentido da rotação da Terra, com período de 1 dia',
    d: ['qualquer órbita com período de 1 dia, passando pelos polos', 'circular, no plano do equador, com período de 12 horas', 'o mais perto possível da superfície, para acompanhar a rotação', 'parada no espaço, com motores ligados o tempo todo'],
    x: expl('acompanhar o ponto da superfície', 'Só uma órbita sobre o equador, girando junto com a Terra e com o mesmo período (1 dia), mantém o satélite sobre o mesmo ponto. Isso acontece a cerca de 36 000 km de altitude.', ''),
  }),
  // 10. lei das áreas
  (r) => {
    const t1 = r.pick([10, 15, 20, 30]), k = r.pick([2, 3, 4]);
    return {
      e: `Em ${t1} dias, a reta que liga o Sol a um planeta varre uma área A. Que área ela varre em ${t1 * k} dias?`,
      r: `${k}A`,
      d: ['A', `${k * k}A`, `A/${k}`, `√${k}·A`],
      x: expl('2ª lei de Kepler', 'Áreas varridas são proporcionais ao tempo, em qualquer trecho da órbita.', `${k} vezes o tempo, ${k} vezes a área: ${k}A.`),
    };
  },
  // 11. velocidade de escape
  (r) => {
    const v = r.pick([8, 6, 4, 10]);
    return {
      e: `Num planeta sem atmosfera, a velocidade de um satélite em órbita rasante é ${v} km/s. A velocidade de escape é √2 vezes essa. Quanto vale, aproximadamente? (√2 ≈ 1,41)`,
      r: v * 1.41,
      d: [v * 2, v, v * 1.41 * 1.41, v / 1.41],
      f: (x) => `${N(r2(x))} km/s`,
      x: expl('v_escape = √2 · v_órbita rasante', 'Para escapar, a energia cinética precisa vencer toda a energia potencial; dá √(2gR), contra √(gR) da órbita.', `${v} · 1,41 ≈ ${N(r2(v * 1.41))} km/s.`),
    };
  },
  // 12. massa da Terra
  (r) => ({
    e: `Com g = 10 m/s², raio da Terra ${r.pick(['R = 6,4 · 10⁶ m', 'R = 6 400 km'])} e G = 6,67 · 10⁻¹¹ N·m²/kg², qual é a ordem de grandeza da massa da Terra?`,
    r: '10²⁵ kg (cerca de 6 · 10²⁴ kg)',
    d: ['10¹⁸ kg', '10³⁰ kg', '10¹² kg', '10²¹ kg'],
    x: expl('M = g·R²/G', 'Na superfície, m·g = G·M·m/R², então M = g·R²/G.', '10 · (6,4 · 10⁶)² ÷ 6,67 · 10⁻¹¹ ≈ 4,1 · 10¹⁴ ÷ 6,67 · 10⁻¹¹ ≈ 6,1 · 10²⁴ kg.'),
  }),
  // 13. comparação de forças
  (r) => {
    const [ma, da, mb, db] = r.pick([[2, 1, 1, 2], [3, 1, 1, 3], [8, 2, 1, 1], [1, 1, 2, 2]]);
    const raz = (ma / (da * da)) / (mb / (db * db));
    return {
      e: `O planeta A tem massa ${ma === 1 ? 'M' : `${ma}M`} e está à distância ${da === 1 ? 'd' : `${da}d`} de uma estrela. O planeta B tem massa ${mb === 1 ? 'M' : `${mb}M`} e está a ${db === 1 ? 'd' : `${db}d`} da mesma estrela. Quantas vezes a força sobre A é a força sobre B?`,
      r: raz,
      d: [(ma / da) / (mb / db), (ma * da * da) / (mb * db * db), raz * 2, 1],
      f: (v) => `${N(r2(v))}`,
      x: expl('F ∝ m/d² (mesma estrela)', `Força em A ∝ ${ma}/${da * da}; força em B ∝ ${mb}/${db * db}.`, `Razão: ${N(r2(ma / (da * da)))} ÷ ${N(r2(mb / (db * db)))} = ${N(r2(raz))}.`),
    };
  },
  // 14. período de um satélite
  (r) => {
    const [R, v, txt] = r.pick([[16000, 5, '5 h 20 min'], [6400, 8, '1 h 20 min'], [25600, 4, '10 h 40 min']]);
    const T = (6 * R) / v;
    return {
      e: `Um satélite descreve uma órbita circular de raio ${N(R)} km com velocidade de ${v} km/s. Usando π = 3, qual é o período da órbita?`,
      r: txt,
      d: [hm(T / 2), hm(T * 2), hm(T / 3), `${N(T)} min`],
      x: expl('T = 2πr/v', 'Uma volta é o comprimento da órbita dividido pela velocidade.', `T = 2 · 3 · ${N(R)} ÷ ${v} = ${N(T)} s = ${txt}.`),
    };
  },
  // 15. planeta de mesma densidade
  (r) => {
    const k = r.pick([2, 3, 0.5]);
    return {
      e: `Um planeta é feito do mesmo material que a Terra (mesma densidade), mas tem ${k === 0.5 ? 'metade do' : `${k} vezes o`} raio. Qual é a gravidade na sua superfície? (g da Terra = 10 m/s²)`,
      r: 10 * k,
      d: [10 * k * k, 10 / k, 10 * k * k * k, 10],
      f: u('m/s²'),
      x: expl('M ∝ R³ e g ∝ M/R²', `Com a mesma densidade, a massa acompanha o volume: × ${N(k ** 3)}. Dividindo por R² (× ${N(k * k)}), g fica ${N(k)} vezes a da Terra.`, `g = 10 · ${N(k)} = ${N(10 * k)} m/s².`),
    };
  },
  // 16. satélites de massas diferentes
  (r) => {
    const k = r.pick([2, 3, 10]);
    return {
      e: `Dois satélites, um com ${k} vezes a massa do outro, estão na mesma órbita circular em torno da Terra. Como se comparam as suas velocidades?`,
      r: 'são iguais',
      d: [`o mais pesado é ${k} vezes mais rápido`, `o mais leve é ${k} vezes mais rápido`, `o mais leve é √${k} vezes mais rápido`, `o mais pesado é ${k * k} vezes mais rápido`],
      x: expl('v = √(G·M/r)', 'A massa do satélite aparece dos dois lados (força gravitacional e força centrípeta) e se cancela. A velocidade só depende da massa do planeta e do raio da órbita.', ''),
    };
  },
  // 17. gravidade da Lua a partir dos dados
  (r) => ({
    e: `A massa da Lua é cerca de 1/81 da massa da Terra, e o raio da Terra é cerca de 3,6 vezes o da Lua. Com g = 10 m/s² na Terra, qual é a gravidade na superfície da Lua?`,
    r: 1.6,
    d: [10 / 81, 10 / 3.6, 10 * 3.6 / 81, 10 / 6],
    f: (v) => `${N(r2(v))} m/s²`,
    x: expl('g = G·M/R²', 'A massa divide por 81; o raio menor (dividido por 3,6) multiplica g por 3,6² ≈ 13.', '10 · 12,96 ÷ 81 = 1,6 m/s².'),
  }),
];

const dificil = [
  // 1. ponto de equilíbrio Terra–Lua
  (r) => {
    const D = r.pick([380000, 390000, 400000]);
    return {
      e: `A massa da Terra é 81 vezes a da Lua, e a distância entre os centros é de ${N(D)} km. A que distância do centro da Terra uma nave fica com atração total nula?`,
      r: (9 * D) / 10,
      d: [D / 2, (81 * D) / 82, D / 10, (8 * D) / 9],
      f: (v) => `${N(Math.round(v / 1000) * 1000)} km`,
      x: expl('igualar as duas forças', 'G·81M/x² = G·M/(D − x)² ⇒ 9/x = 1/(D − x) ⇒ x = 9(D − x) ⇒ x = 9D/10.', `9 · ${N(D)} ÷ 10 = ${N((9 * D) / 10)} km.`),
    };
  },
  // 2. Kepler com a Lua
  (r) => {
    const k = r.pick([4, 16]);
    const T = 27 / k ** 1.5;
    return {
      e: `A Lua orbita a cerca de 60 raios terrestres do centro da Terra, com período de 27 dias. Qual seria o período de um satélite a 60/${k} raios terrestres?`,
      r: T,
      d: [27 / k, 27 / (k * k), 27 / Math.sqrt(k), 27 * k ** 1.5],
      f: (v) => `${N(r2(v), r2(v) % 1 ? null : 0)} dias`,
      x: expl('3ª lei de Kepler: T² ∝ a³', `Raio ${k} vezes menor ⇒ T² ${k ** 3} vezes menor ⇒ T ${k ** 1.5} vezes menor.`, `27 ÷ ${k ** 1.5} = ${N(r2(T))} dias.`),
    };
  },
  // 3. peso a meia altura do raio
  (r) => {
    const P = r.pick([720, 810, 900, 630]);
    return {
      e: `Um astronauta pesa ${P} N na superfície da Terra. Quanto pesa a uma altitude igual à metade do raio terrestre?`,
      r: (P * 4) / 9,
      d: [P / 2, (P * 2) / 3, P / 4, (P * 9) / 4],
      f: u('N'),
      x: expl('g ∝ 1/d²', 'A distância ao centro passa de R para 1,5R. O peso fica multiplicado por (1/1,5)² = 4/9.', `${P} · 4/9 = ${N((P * 4) / 9)} N.`),
    };
  },
  // 4. velocidade de escape em outro planeta
  (r) => {
    const [a, b] = r.pick([[8, 2], [2, 8], [9, 1], [18, 2], [16, 4]]);
    const f = Math.sqrt(a / b);
    return {
      e: `A velocidade de escape da Terra é 11,2 km/s. Qual é a de um planeta com ${a} vezes a massa e ${b === 1 ? 'o mesmo' : `${b} vezes o`} raio da Terra?`,
      r: 11.2 * f,
      d: [(11.2 * a) / b, 11.2 * Math.sqrt(a / (b * b)), (11.2 * a) / (b * b), 11.2],
      f: (v) => `${N(r2(v))} km/s`,
      x: expl('v = √(2·G·M/R)', `A velocidade de escape é proporcional a √(M/R) = √(${a}/${b}) = ${N(f)}.`, `11,2 · ${N(f)} = ${N(r2(11.2 * f))} km/s.`),
    };
  },
  // 5. várias mudanças ao mesmo tempo
  (r) => {
    const [a, b, c] = r.pick([[2, 3, 2], [3, 3, 2], [2, 2, 4], [4, 1, 2], [9, 1, 3]]);
    const F = r.pick([40, 80, 120, 200]);
    const nova = (F * a * b) / (c * c);
    return {
      e: `Dois corpos se atraem com ${F} N. A massa do primeiro é multiplicada por ${a}${b > 1 ? `, a do segundo por ${b}` : ''} e a distância entre eles por ${c}. Qual é a nova força?`,
      r: nova,
      d: [(F * a * b) / c, F * a * b * c * c, (F * (a + b)) / (c * c), (F * a * b) / (2 * c)],
      f: u('N'),
      x: expl('F ∝ M·m/d²', `Fator total: ${a}${b > 1 ? ` · ${b}` : ''} ÷ ${c}² = ${N(r2((a * b) / (c * c)))}.`, `${F} · ${N(r2((a * b) / (c * c)))} = ${N(r2(nova))} N.`),
    };
  },
  // 6. gravidade na estação espacial
  (r) => {
    const h = r.pick([400, 320, 600]);
    const g = 10 * (6400 / (6400 + h)) ** 2;
    return {
      e: `Uma estação espacial orbita a ${h} km de altitude. Qual é a aceleração da gravidade lá? (Raio da Terra: 6 400 km; g na superfície = 10 m/s².)`,
      r: g,
      d: [0, 10, 10 * (6400 / (6400 + h)), 10 * (h / 6400)],
      f: (v) => `${N(r2(v), r2(v) % 1 ? 1 : 0)} m/s²`,
      x: expl('g = g₀·(R/(R + h))²', `A distância ao centro é ${N(6400 + h)} km.`, `10 · (${N(6400)}/${N(6400 + h)})² ≈ ${N(g, 1)} m/s². Quase a gravidade da superfície: os astronautas flutuam por estarem em queda livre, não por falta de gravidade.`),
    };
  },
  // 7. no centro da Terra
  (r) => ({
    e: `Imagine um túnel até o centro da Terra. ${r.pick(['Quanto pesaria um objeto lá no centro?', 'Qual seria o peso de uma pessoa exatamente no centro da Terra?'])}`,
    r: 'zero, porque a atração da massa ao redor se anula em todas as direções',
    d: ['o dobro do peso na superfície, por estar mais perto da massa', 'infinito, porque a distância ao centro é zero', 'o mesmo da superfície, porque a massa não muda', 'quatro vezes o peso na superfície'],
    x: expl('simetria', 'A fórmula F = G·M·m/d² vale para corpos FORA da esfera. No centro, há massa puxando igualmente para todos os lados, e as atrações se cancelam.', ''),
  }),
  // 8. salto em Marte
  (r) => {
    const h = r.pick([0.4, 0.5, 0.6, 0.8]);
    return {
      e: `Um atleta salta ${N(h)} m de altura na Terra (g = 10 m/s²). Com o mesmo impulso (mesma velocidade inicial), quanto saltaria em Marte (g = 4 m/s²)?`,
      r: (h * 10) / 4,
      d: [(h * 4) / 10, h, h * 4, h * Math.sqrt(10 / 4)],
      f: (v) => `${N(r2(v))} m`,
      x: expl('h = v²/(2g)', 'Com a mesma velocidade inicial, a altura é inversamente proporcional a g.', `${N(h)} · 10/4 = ${N(r2((h * 10) / 4))} m.`),
    };
  },
  // 9. queda na Lua
  (r) => {
    const [h, t] = r.pick([[20, 5], [5, 2.5], [45, 7.5], [80, 10]]);
    return {
      e: `Na Lua (g = 1,6 m/s², sem ar), um astronauta solta uma ferramenta de uma altura de ${h} m. Quanto tempo ela leva para chegar ao chão?`,
      r: t,
      d: [Math.sqrt((2 * h) / 10), (2 * h) / 1.6, Math.sqrt(h / 1.6), t * 2],
      f: (v) => `${N(r2(v))} s`,
      x: expl('h = g·t²/2', `t = √(2h/g) = √(${2 * h}/1,6) = √${N((2 * h) / 1.6)}.`, `t = ${N(t)} s.`),
    };
  },
  // 10. pêndulo em outro planeta
  (r) => {
    const T = r.pick([1, 2, 3]), k = r.pick([2, 3]);
    return {
      e: `Um pêndulo tem período de ${T} s na Terra (g = 10 m/s²). Qual seria o seu período num planeta onde g = ${N(r2(10 / (k * k)))} m/s²?`,
      r: T * k,
      d: [T * k * k, T / k, T, (T * k) / 2],
      f: (v) => `${N(v)} s`,
      x: expl('T = 2π·√(L/g)', `g ficou ${k * k} vezes menor; o período cresce com √(1/g): ${k} vezes maior.`, `${T} · ${k} = ${T * k} s.`),
    };
  },
  // 11. raio a partir da razão de períodos
  (r) => {
    const [k, raio] = r.pick([[8, 10000], [27, 8000], [8, 12000], [64, 7000]]);
    const f = Math.round(Math.cbrt(k * k));
    return {
      e: `O satélite B tem período ${k} vezes maior que o do satélite A, ambos em órbita do mesmo planeta. Se A orbita a ${N(raio)} km do centro, a que distância do centro orbita B?`,
      r: raio * f,
      d: [raio * k, raio * Math.sqrt(k), raio * k * k, raio * Math.cbrt(k)],
      f: (v) => `${N(r2(v))} km`,
      x: expl('3ª lei de Kepler: a³ ∝ T²', `T² fica ${k * k} vezes maior; a³ também; então a fica ∛${k * k} = ${f} vezes maior.`, `${N(raio)} · ${f} = ${N(raio * f)} km.`),
    };
  },
  // 12. razão de velocidades de planetas
  (r) => {
    const k = r.pick([4, 9, 16, 25]);
    return {
      e: `O planeta B está ${k} vezes mais longe da estrela do que o planeta A (órbitas circulares). Quantas vezes a velocidade orbital de A é maior que a de B?`,
      r: Math.sqrt(k),
      d: [k, k * k, k ** 1.5, k / 2],
      f: (v) => `${N(v)}`,
      x: expl('v = √(G·M/r)', 'A velocidade é inversamente proporcional à raiz do raio.', `√${k} = ${Math.sqrt(k)}.`),
    };
  },
  // 13. massa de um planeta pela gravidade
  (r) => {
    const [g, k] = r.pick([[25, 2], [40, 2], [15, 3], [20, 3], [5, 4]]);
    const M = (g / 10) * k * k;
    return {
      e: `Um planeta tem raio ${k} vezes o da Terra e gravidade de ${g} m/s² na superfície. Quantas vezes a sua massa é a da Terra? (g da Terra = 10 m/s²)`,
      r: M,
      d: [(g / 10) * k, (g / 10) / (k * k), g * k * k, (g / 10) * k * k * k],
      f: (v) => `${N(r2(v))}`,
      x: expl('M = g·R²/G', `M é proporcional a g·R²: (${g}/10) · ${k}².`, `${N(g / 10)} · ${k * k} = ${N(M)}.`),
    };
  },
  // 14. raio da órbita geoestacionária pela Lua
  (r) => ({
    e: `A Lua orbita a cerca de 60 raios terrestres do centro da Terra, com período de 27 dias. A que distância do centro da Terra fica a órbita de um satélite com período de 1 dia${r.pick(['', ' (geoestacionário)'])}?`,
    r: 'cerca de 6,7 raios terrestres',
    d: ['cerca de 2,2 raios terrestres', 'cerca de 20 raios terrestres', 'cerca de 11,5 raios terrestres', 'cerca de 1 raio terrestre'],
    x: expl('3ª lei de Kepler: a³ ∝ T²', 'O período é 27 vezes menor; T² fica 729 vezes menor, e a³ também. Como 729 = 9³, o raio fica 9 vezes menor.', '60 ÷ 9 ≈ 6,7 raios terrestres (cerca de 42 000 km do centro).'),
  }),
  // 15. órbita elíptica: velocidades extremas
  (r) => {
    const k = r.pick([2, 3, 4, 5]);
    const v = r.pick([10, 12, 20, 30]);
    return {
      e: `Na órbita elíptica de um cometa, a maior distância ao Sol é ${k} vezes a menor. No ponto mais próximo, a velocidade é ${v * k} km/s. Qual é a velocidade no ponto mais distante?`,
      r: v,
      d: [(v * k) / (k * k), v * k * k, (v * k) / Math.sqrt(k), v * k],
      f: (x) => `${N(r2(x))} km/s`,
      x: expl('2ª lei de Kepler nos extremos', 'No periélio e no afélio a velocidade é perpendicular à reta até o Sol; áreas iguais em tempos iguais dão r₁·v₁ = r₂·v₂.', `v = ${v * k} ÷ ${k} = ${v} km/s.`),
    };
  },
  // 16. se a Terra se afastasse do Sol
  (r) => {
    const k = r.pick([2, 4, 9]);
    const T = k ** 1.5;
    return {
      e: `Se a distância entre a Terra e o Sol ficasse ${k} vezes maior (órbita circular), quanto duraria o ano?`,
      r: T,
      d: [k, k * k, Math.sqrt(k), k ** 3],
      f: (v) => `${Number.isInteger(r2(v)) ? '' : '≈ '}${N(r2(v))} anos`,
      x: expl('3ª lei de Kepler: T² = a³', `T² = ${k}³ = ${k ** 3}.`, `T = √${k ** 3} ${k === 2 ? '≈' : '='} ${N(r2(T))} anos.`),
    };
  },
];

export default [
  {
    disciplina: 'fisica',
    arquivo: '08-gravitacao',
    titulo: 'Gravitação universal',
    provas: ['ENEM', 'Militares'],
    descricao: 'Leis de Kepler, lei da gravitação de Newton, gravidade em outros astros e em altitude, satélites, órbitas e marés.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];

