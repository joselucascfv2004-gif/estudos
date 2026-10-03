// Física — modelos novos (complementam os de fisica.mjs). g = 10 m/s².
import { arred, expl, nome, num } from './util.mjs';

const u = (un) => (v) => `${num(v)} ${un}`;
const G = 10;
const hms = (s) => (s >= 60 ? `${Math.floor(s / 60)} min${s % 60 ? ` ${Math.round(s % 60)} s` : ''}` : `${num(s)} s`);

// ------------------------------------------------------------- Cinemática
const cinematica = [
  [
    (r) => {
      const km = r.pick([0.9, 1.2, 1.5, 2.4, 3]), min = r.pick([10, 15, 20, 30]);
      return {
        e: `${nome(r)} caminhou ${num(km)} km em ${min} minutos, em ritmo constante. Qual foi a sua velocidade média em km/h?`,
        r: (km * 60) / min,
        d: [km / min, (km * 1000) / (min * 60), (km * min) / 60, km * min],
        f: u('km/h'),
        x: expl('velocidade média com conversão', 'Para obter km/h, o tempo precisa estar em horas.', `${min} min = ${num(min / 60, 3)} h; ${num(km)} ÷ ${num(min / 60, 3)} = ${num((km * 60) / min)} km/h.`),
      };
    },
    (r) => {
      const s0 = r.int(-10, 20), v = r.int(2, 9) * r.pick([1, -1]), t = r.pick([4, 5, 8, 10]);
      return {
        e: `Um sensor registrou que um carrinho estava na posição ${s0} m em t = 0 e na posição ${s0 + v * t} m em t = ${t} s, movendo-se em linha reta com velocidade constante. Qual é a sua velocidade?`,
        r: v,
        d: [-v, (s0 + v * t) / t, v * t, s0 + v],
        f: u('m/s'),
        x: expl('velocidade = Δs/Δt', 'Use a variação da posição (final − inicial), não a posição final.', `(${s0 + v * t} − ${s0 < 0 ? `(${s0})` : s0}) ÷ ${t} = ${v} m/s.`),
      };
    },
    (r) => {
      const t = r.pick([10, 11, 12, 12.5]), d = 100;
      return {
        e: `Um atleta correu os ${d} m rasos em ${num(t)} s. Qual foi a sua velocidade média em km/h?`,
        r: (d / t) * 3.6,
        d: [d / t, (d / t) / 3.6, d * t, (d / t) * 3.6 + 5],
        f: u('km/h'),
        x: expl('m/s → km/h (× 3,6)', 'Calcule em m/s e multiplique por 3,6.', `${d} ÷ ${num(t)} = ${num(d / t)} m/s; × 3,6 = ${num((d / t) * 3.6)} km/h.`),
      };
    },
    (r) => {
      const [txt, km] = r.pick([['do Sol até a Terra', 1.5e8], ['da Lua até a Terra', 3.84e5]]);
      const s = km / 3e5;
      return {
        e: `A distância ${txt} é de cerca de ${num(km)} km, e a luz viaja a aproximadamente 300.000 km/s. Quanto tempo a luz leva para fazer esse percurso?`,
        r: s,
        d: [s * 60, s / 60, s * 10, km / 3e8],
        f: hms,
        x: expl('t = d/v', 'Mesmo a luz demora um pouco: divida a distância pela velocidade (mesmas unidades).', `${num(km)} ÷ 300.000 = ${num(s)} s = ${hms(s)}.`),
      };
    },
  ],
  [
    (r) => {
      const v1 = r.pick([40, 60, 80]), v2 = r.pick([80, 100, 120]);
      if (v1 === v2) return cinematica[1][0](r);
      return {
        e: `Em uma viagem, um carro anda metade do TEMPO total a ${v1} km/h e a outra metade do tempo a ${v2} km/h. Qual é a velocidade média na viagem toda?`,
        r: (v1 + v2) / 2,
        d: [(2 * v1 * v2) / (v1 + v2), v2 - v1, v1 + v2, Math.max(v1, v2)],
        f: u('km/h'),
        x: expl('velocidade média por tempos iguais', 'Com tempos iguais, a média é a média aritmética das velocidades. (Com DISTÂNCIAS iguais seria diferente!)', `(${v1} + ${v2}) ÷ 2 = ${(v1 + v2) / 2} km/h.`),
      };
    },
    (r) => {
      const v0 = r.int(2, 15), a = r.int(1, 5) * r.pick([1, -1]), t = r.int(2, 6);
      if (v0 + a * t < 0) return cinematica[1][1](r);
      return {
        e: `Um móvel tem velocidade inicial de ${v0} m/s e aceleração constante de ${a} m/s². Qual é a sua velocidade após ${t} s?`,
        r: v0 + a * t,
        d: [v0 - a * t, a * t, v0 + a, v0 * t + a],
        f: u('m/s'),
        x: expl('v = v₀ + a·t', 'A aceleração diz quanto a velocidade muda a cada segundo.', `${v0} + (${a}) × ${t} = ${v0 + a * t} m/s.`),
      };
    },
    (r) => {
      const t = r.int(2, 6), h = (G * t * t) / 2;
      return {
        e: `Um vaso cai, a partir do repouso, de uma janela a ${h} m de altura. Desprezando a resistência do ar (g = 10 m/s²), quanto tempo ele leva para chegar ao chão?`,
        r: t,
        d: [h / 10, Math.sqrt(h).toFixed(0) * 1 === t ? t + 1 : Math.round(Math.sqrt(h)), t * 2, h / 5],
        f: u('s'),
        x: expl('queda livre ao contrário', 'h = g·t²/2 ⇒ t = √(2h/g).', `t = √(2 × ${h} ÷ 10) = √${(2 * h) / 10} = ${t} s.`),
      };
    },
    (r) => {
      const R = r.pick([10, 20, 30, 50]), T = r.pick([30, 60, 120]);
      const v = (2 * 3 * R) / T;
      return {
        e: `Uma roda-gigante de ${R} m de raio dá uma volta completa a cada ${T} s. Qual é a velocidade de uma cabine? (Use π = 3.)`,
        r: v,
        d: [(3 * R) / T, (2 * 3 * R * R) / T, R / T, v * 2],
        f: u('m/s'),
        x: expl('movimento circular uniforme', 'Em uma volta a cabine percorre o contorno 2πR no tempo de um período T.', `v = 2 × 3 × ${R} ÷ ${T} = ${num(v)} m/s.`),
      };
    },
  ],
  [
    (r) => {
      const vc = r.pick([20, 25, 30]), vt = r.pick([15, 20]), Lc = 4, Lt = r.pick([16, 20, 26]);
      if (vc <= vt) return cinematica[2][0](r);
      const t = (Lc + Lt) / (vc - vt);
      return {
        e: `Um carro de ${Lc} m de comprimento, a ${vc} m/s, ultrapassa um caminhão de ${Lt} m que segue a ${vt} m/s no mesmo sentido. Quanto tempo dura a ultrapassagem (da traseira do carro alinhada com a traseira do caminhão até a traseira do carro passar a frente do caminhão)?`,
        r: t,
        d: [Lt / (vc - vt), (Lc + Lt) / (vc + vt), (Lc + Lt) / vc, t * 2],
        f: u('s'),
        x: expl('velocidade relativa', 'Do ponto de vista do caminhão, o carro anda só a diferença das velocidades e precisa "cobrir" os dois comprimentos.', `(${Lc} + ${Lt}) ÷ (${vc} − ${vt}) = ${num(t)} s.`),
      };
    },
    (r) => {
      const a = r.pick([2, 4, 5]), v = r.pick([10, 20, 30]);
      const t = (2 * v) / a;
      return {
        e: `No momento em que um caminhão passa a ${v} m/s (constante) por um carro parado, o carro arranca com aceleração constante de ${a} m/s², no mesmo sentido. Após quanto tempo o carro alcança o caminhão?`,
        r: t,
        d: [v / a, (v / a) * 3, Math.sqrt((2 * v) / a), t + 2],
        f: u('s'),
        x: expl('igualar as posições', 'Caminhão: s = v·t. Carro: s = a·t²/2. O encontro é quando as posições são iguais (t ≠ 0).', `${v}t = ${a}t²/2 ⇒ t = 2 × ${v} ÷ ${a} = ${num(t)} s.`),
      };
    },
    (r) => {
      const v = r.pick([20, 40, 60]);
      const vy = v / 2;
      return {
        e: `Um projétil é lançado com velocidade de ${v} m/s formando 30° com a horizontal. Desprezando o ar (g = 10 m/s²), qual é a altura máxima atingida?`,
        r: (vy * vy) / (2 * G),
        d: [(v * v) / (2 * G), (vy * vy) / G, vy / G, (v * v) / (4 * G)],
        f: u('m'),
        x: expl('decompor a velocidade', 'Na vertical só conta v·sen 30° = v/2; no topo a velocidade vertical é zero (Torricelli).', `vy = ${vy} m/s; h = ${vy}² ÷ (2 × 10) = ${num((vy * vy) / 20)} m.`),
      };
    },
    (r) => {
      const [vb, vr, vt] = r.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13]]);
      return {
        e: `Um barco tem velocidade de ${vb} m/s em relação à água e atravessa um rio apontando sempre perpendicularmente às margens. A correnteza tem ${vr} m/s. Qual é a velocidade do barco em relação às margens?`,
        r: vt,
        d: [vb + vr, Math.abs(vb - vr), vb, vt + 1],
        f: u('m/s'),
        x: expl('composição de velocidades', 'As velocidades são perpendiculares: some como vetores (Pitágoras), não como números.', `√(${vb}² + ${vr}²) = ${vt} m/s.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Dinâmica
const dinamica = [
  [
    (r) => {
      const m = r.int(2, 20), a = r.pick([0.5, 1, 1.5, 2, 3, 4]);
      return {
        e: `Uma força resultante de ${num(m * a)} N produz em um corpo uma aceleração de ${num(a)} m/s². Qual é a massa do corpo?`,
        r: m,
        d: [m * a * a, a / (m * a), m * a, m + a],
        f: u('kg'),
        x: expl('2ª lei de Newton ao contrário', 'F = m·a ⇒ m = F/a.', `${num(m * a)} ÷ ${num(a)} = ${m} kg.`),
      };
    },
    (r) => {
      const F = r.int(20, 200);
      return {
        e: `Um caixote é empurrado com uma força horizontal de ${F} N e se move em linha reta com velocidade CONSTANTE. Qual é a intensidade da força de atrito sobre ele?`,
        r: F,
        d: [0, F / 2, F * 2, F - 10],
        f: u('N'),
        x: expl('1ª lei de Newton', 'Velocidade constante ⇒ aceleração zero ⇒ força resultante zero. O atrito equilibra exatamente a força aplicada.', `Fat = ${F} N.`),
      };
    },
    (r) => {
      const m = r.int(5, 30), F = r.int(10, 40);
      if (F >= m * G) return dinamica[0][2](r);
      return {
        e: `Uma caixa de ${m} kg está apoiada no chão. Uma pessoa a puxa para cima com uma corda vertical, com força de ${F} N, mas a caixa não sai do chão. Qual é a força normal do chão sobre a caixa? (g = 10 m/s²)`,
        r: m * G - F,
        d: [m * G, m * G + F, F, m * G - 2 * F],
        f: u('N'),
        x: expl('equilíbrio na vertical', 'Para cima: normal + força da corda. Para baixo: peso. Em equilíbrio, eles se igualam.', `N = ${m * G} − ${F} = ${m * G - F} N.`),
      };
    },
    (r) => {
      const m = r.pick([50, 60, 70, 80]), [planeta, g] = r.pick([['em Marte', 3.7], ['na Lua', 1.6], ['em Júpiter', 24.8]]);
      return {
        e: `Um astronauta tem massa de ${m} kg. Qual seria o seu peso ${planeta}, onde a gravidade é ${num(g)} m/s²?`,
        r: arred(m * g, 2),
        d: [m, m * 10, arred(m / g, 2), arred(m * g * 10, 2)],
        f: u('N'),
        x: expl('massa x peso', 'A massa (kg) é a mesma em qualquer lugar; o peso (N) depende da gravidade local.', `P = ${m} × ${num(g)} = ${num(m * g)} N.`),
      };
    },
  ],
  [
    (r) => {
      const m = r.int(2, 10), F = r.pick([20, 40, 60, 80]);
      const a = (F * 0.5) / m;
      return {
        e: `Um bloco de ${m} kg, sobre uma superfície horizontal sem atrito, é puxado por uma força de ${F} N que forma 60° com a horizontal. Qual é a aceleração do bloco? (cos 60° = 0,5)`,
        r: arred(a, 2),
        d: [arred(F / m, 2), arred((F * 0.87) / m, 2), arred(a * 2, 2), arred(F * 0.5 * m, 2)],
        f: u('m/s²'),
        x: expl('decompor a força', 'Só a componente horizontal (F·cos 60°) acelera o bloco no chão.', `${F} × 0,5 = ${F * 0.5} N; a = ${F * 0.5} ÷ ${m} = ${num(a)} m/s².`),
      };
    },
    (r) => {
      const m = r.int(2, 20), a = r.int(1, 5), sobe = r.pick([true, false]);
      const T = m * (G + (sobe ? a : -a));
      return {
        e: `Um balde de ${m} kg é puxado por uma corda e ${sobe ? 'sobe' : 'desce'} com aceleração de ${a} m/s² ${sobe ? 'para cima' : 'para baixo'}. Qual é a tração na corda? (g = 10 m/s²)`,
        r: T,
        d: [m * G, m * (G + (sobe ? -a : a)), m * a, T + m],
        f: u('N'),
        x: expl('2ª lei com duas forças', `Tração para cima, peso para baixo: T − P = m·a (com a ${sobe ? 'positiva' : 'negativa'}).`, `T = ${m} × (10 ${sobe ? '+' : '−'} ${a}) = ${T} N.`),
      };
    },
    (r) => {
      const m = r.int(10, 60), mu = r.pick([0.3, 0.4, 0.5, 0.6]);
      return {
        e: `Um armário de ${m} kg está parado no chão. O coeficiente de atrito estático é ${num(mu)}. Qual é a menor força horizontal capaz de colocá-lo em movimento? (g = 10 m/s²)`,
        r: mu * m * G,
        d: [m * G, (mu * m * G) / 2, m * mu, m * G * (1 - mu)],
        f: u('N'),
        x: expl('atrito estático máximo', 'O armário só começa a deslizar quando a força supera μₑ·N.', `${num(mu)} × ${m * G} = ${num(mu * m * G)} N.`),
      };
    },
    (r) => {
      const m = r.pick([1000, 1200, 1500]), v = r.pick([10, 20, 30]), d = r.pick([25, 40, 50]);
      const F = (m * v * v) / (2 * d);
      return {
        e: `Um carro de ${num(m)} kg, a ${v} m/s, freia e para em ${d} m. Qual é a intensidade média da força de frenagem?`,
        r: F,
        d: [(m * v) / d, F * 2, (m * v * v) / d / 10, m * G],
        f: u('N'),
        x: expl('Torricelli + 2ª lei', 'Ache a desaceleração com v² = v₀² − 2a·d e depois F = m·a.', `a = ${v}² ÷ (2 × ${d}) = ${num((v * v) / (2 * d))} m/s²; F = ${num(m)} × ${num((v * v) / (2 * d))} = ${num(F)} N.`),
      };
    },
  ],
  [
    (r) => {
      const m1 = r.int(2, 8), m2 = r.int(2, 8), F = (m1 + m2) * r.int(1, 5);
      return {
        e: `Dois blocos encostados, A (${m1} kg) e B (${m2} kg), estão sobre uma mesa sem atrito. Uma força horizontal de ${F} N empurra A, que empurra B. Qual é a força que A exerce sobre B?`,
        r: (F * m2) / (m1 + m2),
        d: [F, (F * m1) / (m1 + m2), F / 2, F - m2],
        f: u('N'),
        x: expl('separar os corpos', 'Os dois têm a mesma aceleração. Para B, a única força horizontal é a que A faz nele.', `a = ${F} ÷ ${m1 + m2} = ${F / (m1 + m2)} m/s²; F(A em B) = ${m2} × ${F / (m1 + m2)} = ${(F * m2) / (m1 + m2)} N.`),
      };
    },
    (r) => {
      const R = r.pick([2.5, 4.9, 6.4, 10, 3.6]);
      const v = Math.sqrt(G * R);
      return {
        e: `Um carrinho de montanha-russa passa pelo ponto mais alto de um loop circular de raio ${num(R)} m. Qual é a velocidade MÍNIMA nesse ponto para que ele não perca contato com o trilho? (g = 10 m/s²)`,
        r: arred(v, 2),
        d: [arred(Math.sqrt(2 * G * R), 2), G * R, arred(v / 2, 2), arred(Math.sqrt(R), 2)],
        f: u('m/s'),
        x: expl('peso como força centrípeta', 'No limite, a normal é zero e só o peso faz a curva: m·g = m·v²/R.', `v = √(10 × ${num(R)}) = ${num(arred(v, 2))} m/s.`),
      };
    },
    (r) => {
      const m = r.pick([0.5, 1, 2, 3]), k = r.pick([50, 100, 200, 400]);
      const x = (m * G) / k;
      return {
        e: `Um objeto de ${num(m)} kg é pendurado em uma mola vertical de constante elástica ${k} N/m e fica em equilíbrio. Quanto a mola se distendeu?`,
        r: x * 100,
        d: [x, ((m * G) / k) * 1000, (k / (m * G)) * 100, x * 50],
        f: u('cm'),
        x: expl('equilíbrio: força elástica = peso', 'k·x = m·g ⇒ x = m·g/k (em metros; depois converta para cm).', `x = ${num(m * G)} ÷ ${k} = ${num(x)} m = ${num(x * 100)} cm.`),
      };
    },
    (r) => {
      const R = r.pick([10, 22.5, 40, 62.5]);
      const v = Math.sqrt(G * R);
      return {
        e: `Um carro passa pelo topo de uma lombada circular de raio ${num(R)} m. Com que velocidade o carro fica, por um instante, "sem peso" (força normal nula)? (g = 10 m/s²)`,
        r: arred(v, 2),
        d: [arred(v * 3.6, 2), G * R, arred(v / 2, 2), arred(Math.sqrt(2 * G * R), 2)],
        f: u('m/s'),
        x: expl('força centrípeta no topo', 'No topo, P − N = m·v²/R. Com N = 0: v = √(g·R).', `√(10 × ${num(R)}) = ${num(arred(v, 2))} m/s.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Energia
const energia = [
  [
    (r) => {
      const m = r.pick([50, 60, 70, 80]), h = r.pick([3, 6, 9, 12, 15]);
      return {
        e: `Uma pessoa de ${m} kg sobe uma escada até um andar ${h} m mais alto. Qual é o trabalho realizado contra o peso? (g = 10 m/s²)`,
        r: m * G * h,
        d: [m * h, m * G, (m * G * h) / 2, m * G * h * 2],
        f: u('J'),
        x: expl('trabalho do peso', 'Subir uma altura h exige vencer o peso: τ = m·g·h (só a altura importa, não o caminho).', `${m} × 10 × ${h} = ${num(m * G * h)} J.`),
      };
    },
    (r) => {
      const kwh = r.pick([0.5, 1, 2, 5]);
      return {
        e: `A conta de luz mede energia em kWh. Quantos joules correspondem a ${num(kwh)} kWh? (1 kWh = 1.000 W × 3.600 s)`,
        r: kwh * 3.6e6,
        d: [kwh * 3600, kwh * 1000, kwh * 3.6e3 * 100, kwh * 60000],
        f: (v) => `${num(v)} J`,
        x: expl('kWh é energia', 'Potência (W) × tempo (s) = energia (J).', `${num(kwh)} × 1.000 × 3.600 = ${num(kwh * 3.6e6)} J.`),
      };
    },
    (r) => {
      const P = r.pick([40, 60, 100]), luz = r.pick([2, 3, 5, 8]);
      return {
        e: `Uma lâmpada incandescente de ${P} W transforma apenas ${luz} W em luz; o resto vira calor. Qual é o rendimento luminoso dessa lâmpada?`,
        r: (luz / P) * 100,
        d: [100 - (luz / P) * 100, luz, (P / luz), (luz / P) * 10],
        f: (v) => `${num(v)}%`,
        x: expl('rendimento = útil ÷ total', 'Compare a potência útil (luz) com a total consumida.', `${luz} ÷ ${P} = ${num(luz / P, 3)} = ${num((luz / P) * 100)}%.`),
      };
    },
    (r) => {
      const m = r.pick([0.4, 0.5, 2, 70, 1000]), v = r.pick([5, 10, 20, 25]);
      return {
        e: `Qual é a quantidade de movimento (momento linear) de um corpo de ${num(m)} kg a ${v} m/s?`,
        r: m * v,
        d: [(m * v * v) / 2, m / v, m + v, m * v * 2],
        f: u('kg·m/s'),
        x: expl('quantidade de movimento Q = m·v', 'É massa vezes velocidade (diferente da energia cinética, que tem v²).', `${num(m)} × ${v} = ${num(m * v)} kg·m/s.`),
      };
    },
  ],
  [
    (r) => {
      const k = r.pick([2, 3, 4]);
      return {
        e: `Se a velocidade de um carro for multiplicada por ${k}, a sua energia cinética ficará multiplicada por:`,
        r: k * k,
        d: [k, 2 * k, k ** 3, k + 1],
        x: expl('Ec = m·v²/2', 'A velocidade entra ao quadrado: por isso batidas em alta velocidade são tão mais graves.', `${k}² = ${k * k}.`),
      };
    },
    (r) => {
      const F = r.pick([20, 40, 50, 100]), d = r.pick([2, 5, 10]), ang = r.pick([60, 37]);
      const c = ang === 60 ? 0.5 : 0.8;
      return {
        e: `Uma criança puxa um carrinho com uma corda que forma ${ang}° com o chão, aplicando ${F} N, e o desloca ${d} m na horizontal. Qual é o trabalho realizado pela criança? (cos ${ang}° = ${num(c)})`,
        r: F * d * c,
        d: [F * d, F * d * (ang === 60 ? 0.87 : 0.6), F * c, (F * d) / 2 === F * d * c ? F * d * 0.25 : (F * d) / 2],
        f: u('J'),
        x: expl('τ = F·d·cos θ', 'Só a parte da força na direção do deslocamento realiza trabalho.', `${F} × ${d} × ${num(c)} = ${num(F * d * c)} J.`),
      };
    },
    (r) => {
      const m = r.pick([800, 1000, 1200]), v = r.pick([10, 20, 30]);
      return {
        e: `Um carro de ${num(m)} kg, a ${v} m/s, freia até parar. Qual é o trabalho realizado pela força de atrito durante a frenagem?`,
        r: (-m * v * v) / 2,
        d: [(m * v * v) / 2, -m * v, -m * v * v, (-m * v * v) / 4],
        f: u('J'),
        x: expl('teorema da energia cinética', 'Trabalho total = variação da energia cinética. O carro perde toda a Ec, então o trabalho do atrito é negativo.', `τ = 0 − ${num(m)} × ${v}² ÷ 2 = ${num((-m * v * v) / 2)} J.`),
      };
    },
    (r) => {
      const v = r.pick([4, 6, 8, 10, 12]);
      return {
        e: `Um skatista entra em uma rampa com velocidade de ${v} m/s. Desprezando atritos (g = 10 m/s²), até que altura ele consegue subir?`,
        r: (v * v) / (2 * G),
        d: [v / G, (v * v) / G, v / 2, (v * v) / (4 * G)],
        f: u('m'),
        x: expl('conservação da energia', 'Toda a energia cinética vira potencial: m·v²/2 = m·g·h (a massa se cancela).', `h = ${v}² ÷ 20 = ${num((v * v) / 20)} m.`),
      };
    },
  ],
  [
    (r) => {
      const mb = r.pick([0.01, 0.02, 0.05]), vb = r.pick([300, 400, 500]), M = r.pick([2, 4, 5]);
      return {
        e: `Uma arma de ${M} kg, inicialmente parada, dispara um projétil de ${num(mb * 1000)} g a ${vb} m/s. Com que velocidade a arma recua?`,
        r: (mb * vb) / M,
        d: [(mb * vb * vb) / M, vb / M, M / (mb * vb), (mb * vb) / M * 10],
        f: u('m/s'),
        x: expl('conservação da quantidade de movimento', 'Antes do disparo, Q = 0. Depois, bala e arma têm quantidades iguais e opostas.', `${num(mb)} × ${vb} = ${M} × V ⇒ V = ${num((mb * vb) / M)} m/s.`),
      };
    },
    (r) => {
      const m = r.pick([1000, 1200, 1500]), v = r.pick([10, 15, 20]), sen = r.pick([0.1, 0.2, 0.05]);
      const P = m * G * sen * v;
      return {
        e: `Um carro de ${num(m)} kg sobe uma ladeira com velocidade constante de ${v} m/s. A ladeira tem inclinação tal que sen θ = ${num(sen)}. Desprezando atritos, qual é a potência mínima do motor? (g = 10 m/s²)`,
        r: P,
        d: [m * G * v, m * G * sen, P / 2, P * 3.6],
        f: u('W'),
        x: expl('potência = força × velocidade', 'Com velocidade constante, o motor precisa equilibrar a componente do peso ao longo da ladeira: m·g·sen θ.', `F = ${num(m * G * sen)} N; P = ${num(m * G * sen)} × ${v} = ${num(P)} W.`),
      };
    },
    (r) => {
      const m = r.int(20, 60), h = r.pick([2, 3, 5]), Wat = r.pick([100, 200, 300]);
      const Ec = m * G * h - Wat;
      if (Ec <= 0) return energia[2][2](r);
      const v = Math.sqrt((2 * Ec) / m);
      return {
        e: `Uma criança de ${m} kg desce um escorregador de ${h} m de altura, partindo do repouso. O atrito dissipa ${Wat} J. Com que energia cinética ela chega ao fim do escorregador? (g = 10 m/s²)`,
        r: Ec,
        d: [m * G * h, m * G * h + Wat, Wat, Ec / 2],
        f: u('J'),
        x: expl('energia que sobra', 'A energia potencial inicial vira cinética, menos o que o atrito transformou em calor.', `${m * G * h} − ${Wat} = ${Ec} J (velocidade ≈ ${num(arred(v, 2))} m/s).`),
      };
    },
    (r) => {
      const L = r.pick([500, 1000, 2000]), h = r.pick([10, 15, 20, 30]), t = r.pick([5, 10, 20]);
      const P = (L * G * h) / (t * 60);
      return {
        e: `Uma bomba eleva ${num(L)} litros de água (1 L = 1 kg) até uma caixa ${h} m acima, em ${t} minutos. Qual é a potência útil da bomba? (g = 10 m/s²)`,
        r: arred(P, 2),
        d: [arred((L * G * h) / t, 2), L * G * h, arred(P / 60, 2), arred((L * h) / (t * 60), 2)],
        f: u('W'),
        x: expl('potência = energia ÷ tempo', 'A energia útil é a potencial ganha pela água (m·g·h); o tempo deve estar em segundos.', `${num(L * G * h)} J ÷ ${t * 60} s = ${num(P)} W.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Hidrostática
const hidro = [
  [
    (r) => {
      const [mat, d] = r.pick([['ferro', 7.8], ['alumínio', 2.7], ['ouro', 19.3], ['vidro', 2.5]]), V = r.pick([10, 20, 50, 100]);
      return {
        e: `A densidade do ${mat} é ${num(d)} g/cm³. Qual é a massa de uma peça maciça de ${mat} com volume de ${V} cm³?`,
        r: d * V,
        d: [V / d, d + V, (d * V) / 10, d * V * 10],
        f: u('g'),
        x: expl('m = d·V', 'Densidade diz quantos gramas há em cada cm³.', `${num(d)} × ${V} = ${num(d * V)} g.`),
      };
    },
    (r) => {
      const m = r.pick([50, 60, 70, 80]), A = r.pick([200, 250, 400, 500]);
      const p = (m * G) / (A / 10000);
      return {
        e: `Uma pessoa de ${m} kg está em pé, e a área total de contato dos seus pés com o chão é de ${A} cm². Qual é a pressão que ela exerce sobre o chão? (g = 10 m/s²)`,
        r: p,
        d: [(m * G) / A, m / (A / 10000), p * 2, p / 10],
        f: (v) => `${num(v)} Pa`,
        x: expl('p = F/A (no SI)', 'A força é o peso; converta a área para m² (1 m² = 10.000 cm²).', `${m * G} N ÷ ${num(A / 10000)} m² = ${num(p)} Pa.`),
      };
    },
    (r) => {
      const [mat, d] = r.pick([['madeira de pinho', 0.5], ['gelo', 0.92], ['cortiça', 0.25], ['alumínio', 2.7], ['plástico PVC', 1.4]]);
      const flutua = d < 1;
      return {
        e: `Um objeto maciço de ${mat} (densidade ${num(d)} g/cm³) é colocado em água pura (densidade 1 g/cm³). O que acontece?`,
        r: flutua ? 'Flutua, porque é menos denso que a água' : 'Afunda, porque é mais denso que a água',
        d: [flutua ? 'Afunda, porque é mais denso que a água' : 'Flutua, porque é menos denso que a água', 'Fica totalmente submerso, parado no meio da água', 'Flutua ou afunda dependendo do tamanho do objeto', 'Afunda, porque todo objeto sólido afunda'],
        x: expl('comparar densidades', 'Objeto maciço menos denso que o líquido flutua; mais denso, afunda (o tamanho não importa).', `${num(d)} ${flutua ? '<' : '>'} 1.`),
      };
    },
  ],
  [
    (r) => {
      const t = r.pick([2, 5, 10, 20]);
      return {
        e: `Um barco de ${t} toneladas flutua em um lago de água doce (densidade 1.000 kg/m³). Que volume de água ele desloca?`,
        r: t,
        d: [t * 1000, t / 10, t * 10, t / 2],
        f: u('m³'),
        x: expl('flutuação: empuxo = peso', 'O barco desloca uma massa de água igual à sua própria massa.', `${t} t = ${num(t * 1000)} kg de água = ${t} m³.`),
      };
    },
    (r) => {
      const h = r.pick([1.5, 2, 3, 5]);
      const p = 1e5 + 1000 * G * h;
      return {
        e: `Qual é a pressão absoluta no fundo de uma piscina com ${num(h)} m de profundidade? (patm = 1,0 × 10⁵ Pa; d = 1.000 kg/m³; g = 10 m/s²)`,
        r: p,
        d: [1000 * G * h, 1e5, 1e5 * h, p + 1e4],
        f: (v) => `${num(v)} Pa`,
        x: expl('pressão absoluta = atmosférica + hidrostática', 'A atmosfera também pressiona a superfície da água.', `1,0 × 10⁵ + 1.000 × 10 × ${num(h)} = ${num(p)} Pa.`),
      };
    },
    (r) => {
      const a = r.pick([10, 20, 30]);
      const V = (a / 100) ** 3;
      return {
        e: `Um cubo de aresta ${a} cm está totalmente mergulhado em água (densidade 1.000 kg/m³). Qual é o empuxo sobre ele? (g = 10 m/s²)`,
        r: 1000 * V * G,
        d: [a * a * a, 1000 * V, 1000 * (a / 100) ** 2 * G, 1000 * V * G * 10],
        f: u('N'),
        x: expl('E = d·V·g', 'O volume submerso é o volume do cubo (em m³).', `V = (${num(a / 100)} m)³ = ${num(V, 3)} m³; E = 1.000 × ${num(V, 3)} × 10 = ${num(1000 * V * G)} N.`),
      };
    },
  ],
  [
    (r) => {
      const dg = 0.92, da = r.pick([1.03, 1.0]);
      const sub = dg / da;
      return {
        e: `O gelo tem densidade 0,92 g/cm³ e flutua em ${da === 1 ? 'água doce (1,00 g/cm³)' : 'água do mar (1,03 g/cm³)'}. Aproximadamente que porcentagem do volume de um iceberg fica FORA da água?`,
        r: `${num(arred((1 - sub) * 100, 0))}%`,
        d: [`${num(arred(sub * 100, 0))}%`, '50%', `${num(arred((1 - sub) * 50, 0))}%`, '25%'],
        x: expl('fração submersa = d(objeto)/d(líquido)', 'A parte submersa é a razão entre as densidades; o resto fica de fora.', `Submersa: ${num(dg)} ÷ ${num(da)} ≈ ${num(sub * 100, 0)}%; fora: ≈ ${num((1 - sub) * 100, 0)}%.`),
      };
    },
    (r) => {
      const P = r.pick([30, 50, 60, 80]), Pa = r.pick([0.4, 0.5, 0.6]) * P;
      const d = P / (P - Pa);
      return {
        e: `Um objeto pendurado em um dinamômetro marca ${P} N no ar. Totalmente mergulhado em água, o dinamômetro marca ${num(Pa)} N. Qual é a densidade do objeto, em g/cm³?`,
        r: arred(d, 2),
        d: [arred(P / Pa, 2), arred((P - Pa) / P, 2), arred(Pa / (P - Pa), 2), arred(d + 1, 2)],
        f: (v) => `${num(v)} g/cm³`,
        x: expl('empuxo revela o volume', 'A "perda de peso" na água é o empuxo, que vale o peso da água deslocada (de mesmo volume do objeto).', `Empuxo: ${P} − ${num(Pa)} = ${num(P - Pa)} N. d = ${P} ÷ ${num(P - Pa)} = ${num(d)} vezes a da água.`),
      };
    },
    (r) => {
      const A1 = r.pick([5, 10, 20]), A2 = r.pick([200, 500, 1000]), b1 = r.pick([20, 30]), b2 = r.pick([60, 90]), F = r.pick([50, 100]);
      const Fp = (F * b2) / b1;
      const peso = (Fp * A2) / A1;
      return {
        e: `Em um macaco hidráulico, uma alavanca multiplica a força: a pessoa aplica ${F} N a ${b2} cm do apoio, e o êmbolo menor fica a ${b1} cm do apoio. Os êmbolos têm áreas de ${A1} cm² e ${A2} cm². Qual é a força no êmbolo maior?`,
        r: peso,
        d: [(F * A2) / A1, Fp, (F * b1 * A2) / (b2 * A1), peso / 2],
        f: u('N'),
        x: expl('alavanca + Pascal (duas multiplicações)', 'Primeiro a alavanca: F·b₂ = F₁·b₁. Depois Pascal: F₁/A₁ = F₂/A₂.', `F₁ = ${F} × ${b2} ÷ ${b1} = ${num(Fp)} N; F₂ = ${num(Fp)} × ${A2} ÷ ${A1} = ${num(peso)} N.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Termologia
const termo = [
  [
    (r) => {
      const K = r.pick([273, 300, 310, 350, 373, 250]);
      return {
        e: `Um termômetro científico marca ${K} K. Qual é essa temperatura em graus Celsius?`,
        r: K - 273,
        d: [K + 273, K, (K - 273) * 1.8 + 32, 273 - K === K - 273 ? 1 : 273 - K],
        f: u('°C'),
        x: expl('K = °C + 273', 'Kelvin e Celsius têm o mesmo "tamanho" de grau; só o zero é diferente.', `${K} − 273 = ${K - 273} °C.`),
      };
    },
    (r) => {
      const m = r.pick([200, 500, 1000, 2000]), [mat, c] = r.pick([['água', 1], ['alumínio', 0.22], ['ferro', 0.11], ['cobre', 0.09]]);
      return {
        e: `Qual é a capacidade térmica de um objeto de ${num(m)} g de ${mat}, cujo calor específico é ${num(c)} cal/g·°C?`,
        r: m * c,
        d: [m / c, c, m * c * 10, m + c],
        f: u('cal/°C'),
        x: expl('capacidade térmica C = m·c', 'Diz quantas calorias o objeto todo precisa para subir 1 °C.', `${num(m)} × ${num(c)} = ${num(m * c)} cal/°C.`),
      };
    },
    (r) => {
      const dC = r.pick([5, 10, 20, 25, 50]);
      return {
        e: `A temperatura de uma estufa subiu ${dC} °C. Qual foi essa variação na escala Fahrenheit?`,
        r: dC * 1.8,
        d: [dC * 1.8 + 32, dC + 32, dC / 1.8, dC],
        f: u('°F'),
        x: expl('variação × valor', 'Para VARIAÇÕES, não se soma 32: cada 1 °C de variação vale 1,8 °F.', `${dC} × 1,8 = ${num(dC * 1.8)} °F.`),
      };
    },
  ],
  [
    (r) => {
      const m = r.pick([1, 2, 5]), T1 = r.pick([15, 20, 25]), T2 = r.pick([60, 70, 80, 100]);
      const Q = m * 4200 * (T2 - T1);
      return {
        e: `Quanta energia, em joules, é necessária para aquecer ${m} kg de água de ${T1} °C até ${T2} °C? (c = 4.200 J/kg·°C)`,
        r: Q,
        d: [m * 4200 * T2, m * (T2 - T1), Q / 1000, m * 4.2 * (T2 - T1)],
        f: u('J'),
        x: expl('Q = m·c·ΔT', 'Use a VARIAÇÃO de temperatura.', `${m} × 4.200 × ${T2 - T1} = ${num(Q)} J.`),
      };
    },
    (r) => {
      const A0 = r.pick([1, 2, 4]), a = r.pick([12, 24]), dT = r.pick([50, 100, 200]);
      const dA = A0 * 2 * a * 1e-6 * dT;
      return {
        e: `Uma chapa metálica de ${A0} m² é aquecida em ${dT} °C. O coeficiente de dilatação LINEAR do metal é ${a} × 10⁻⁶ °C⁻¹. Qual é o aumento de área da chapa?`,
        r: arred(dA * 10000, 2),
        d: [arred(dA * 5000, 2), arred(dA * 15000, 2), arred(dA * 100, 2), arred(dA * 20000, 2)],
        f: u('cm²'),
        x: expl('dilatação superficial (β = 2α)', 'Área dilata nas duas direções: o coeficiente superficial é o dobro do linear.', `ΔA = ${A0} × ${2 * a} × 10⁻⁶ × ${dT} = ${num(dA, 4)} m² = ${num(dA * 10000)} cm².`),
      };
    },
    (r) => {
      const p1 = r.pick([1, 2]), V1 = r.pick([10, 20, 30]), T1 = 300, p2 = r.pick([2, 3, 4]), T2 = r.pick([400, 450, 600]);
      const V2 = (p1 * V1 * T2) / (T1 * p2);
      if (!Number.isInteger(V2 * 10)) return termo[1][2](r);
      return {
        e: `Um gás ideal ocupa ${V1} L a ${p1} atm e ${T1} K. Se a pressão passar para ${p2} atm e a temperatura para ${T2} K, qual será o novo volume?`,
        r: V2,
        d: [(V1 * p2 * T2) / (p1 * T1), (V1 * p1) / p2, (V1 * T2) / T1, V2 * 2],
        f: u('L'),
        x: expl('equação geral dos gases', 'p₁V₁/T₁ = p₂V₂/T₂ (temperaturas em kelvin).', `V₂ = ${p1} × ${V1} × ${T2} ÷ (${T1} × ${p2}) = ${num(V2)} L.`),
      };
    },
  ],
  [
    (r) => {
      const mg = r.pick([50, 100, 200]), ma = r.pick([200, 300, 400]), Ta = r.pick([20, 30, 40]);
      const calorAgua = ma * Ta;
      const derrete = Math.min(mg, calorAgua / 80);
      if (derrete >= mg) return termo[2][0](r);
      return {
        e: `Em um recipiente isolado, colocam-se ${mg} g de gelo a 0 °C em ${ma} g de água a ${Ta} °C. Quantos gramas de gelo derretem até o equilíbrio? (c_água = 1 cal/g·°C; L_fusão = 80 cal/g)`,
        r: arred(derrete, 2),
        d: [mg, arred(calorAgua / 1, 2) > 1000 ? arred(derrete / 2, 2) : calorAgua, arred(derrete * 2, 2), arred((ma * Ta) / 100, 2)],
        f: u('g'),
        x: expl('equilíbrio térmico com mudança de fase', 'Primeiro veja quanto calor a água pode ceder até 0 °C; esse calor derrete parte do gelo. Se não der para derreter tudo, o equilíbrio é a 0 °C.', `A água cede até ${ma} × ${Ta} = ${calorAgua} cal; derrete ${calorAgua} ÷ 80 = ${num(derrete)} g (sobra gelo, equilíbrio a 0 °C).`),
      };
    },
    (r) => {
      const Q1 = r.pick([1000, 2000, 5000]), eta = r.pick([20, 25, 30, 40]);
      const W = (Q1 * eta) / 100;
      return {
        e: `Em cada ciclo, uma máquina térmica recebe ${num(Q1)} J da fonte quente e tem rendimento de ${eta}%. Quanto calor ela rejeita para a fonte fria em cada ciclo?`,
        r: Q1 - W,
        d: [W, Q1, Q1 + W, (Q1 * eta) / 10],
        f: u('J'),
        x: expl('1ª lei nas máquinas térmicas', 'Q₁ = τ + Q₂. O rendimento diz quanto de Q₁ vira trabalho.', `τ = ${eta}% de ${num(Q1)} = ${num(W)} J; Q₂ = ${num(Q1)} − ${num(W)} = ${num(Q1 - W)} J.`),
      };
    },
    (r) => {
      const mm = r.pick([100, 200, 400]), Tm = r.pick([100, 120, 150]), ma = r.pick([200, 400]), Ta = 20, Te = r.pick([25, 30]);
      const c = (ma * (Te - Ta)) / (mm * (Tm - Te));
      return {
        e: `Um bloco de metal de ${mm} g a ${Tm} °C é colocado em ${ma} g de água a ${Ta} °C, em um recipiente isolado. O equilíbrio ocorre a ${Te} °C. Qual é o calor específico do metal? (c_água = 1 cal/g·°C)`,
        r: arred(c, 3),
        d: [arred((ma * Te) / (mm * Tm), 3), arred(c * 10, 3), arred((mm * (Tm - Te)) / (ma * (Te - Ta)), 3), arred(c / 2, 3)],
        f: u('cal/g·°C'),
        x: expl('calor cedido = calor recebido', 'O metal esfria e a água esquenta até a mesma temperatura.', `${mm}·c·(${Tm} − ${Te}) = ${ma}·1·(${Te} − ${Ta}) ⇒ c = ${num(c, 3)} cal/g·°C.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Eletricidade
const eletro = [
  [
    (r) => {
      const Q = r.pick([12, 30, 60, 120]), t = r.pick([3, 5, 10, 20]);
      if (Q % t) return eletro[0][0](r);
      return {
        e: `Uma carga de ${Q} C atravessa a seção de um fio em ${t} s. Qual é a intensidade da corrente elétrica?`,
        r: Q / t,
        d: [Q * t, t / Q, Q - t, (Q / t) * 2],
        f: u('A'),
        x: expl('corrente = carga ÷ tempo', '1 ampère é 1 coulomb passando por segundo.', `${Q} ÷ ${t} = ${Q / t} A.`),
      };
    },
    (r) => {
      const P = r.pick([9, 15, 40, 60, 100]), h = r.pick([4, 5, 6, 8]);
      const kwh = (P * h * 30) / 1000;
      return {
        e: `Uma lâmpada de ${P} W fica acesa ${h} horas por dia. Quanta energia ela consome em 30 dias?`,
        r: kwh,
        d: [P * h * 30, (P * h) / 1000, kwh * 10, (P * 30) / 1000],
        f: u('kWh'),
        x: expl('E = P·Δt', 'Potência em kW vezes tempo em horas dá kWh.', `${num(P / 1000)} kW × ${h * 30} h = ${num(kwh)} kWh.`),
      };
    },
    (r) => {
      const pos = r.pick(['inverno', 'verão']);
      return {
        e: `Um chuveiro elétrico tem as posições "inverno" (água mais quente) e "verão". Na posição ${pos}, comparada com a outra, o chuveiro tem:`,
        r: pos === 'inverno' ? 'menor resistência e maior potência' : 'maior resistência e menor potência',
        d: [pos === 'inverno' ? 'maior resistência e menor potência' : 'menor resistência e maior potência', 'maior resistência e maior potência', 'a mesma resistência, mas maior tensão', 'menor resistência e menor corrente'],
        x: expl('P = U²/R com tensão fixa', 'A tensão da tomada não muda. Menos resistência ⇒ mais corrente ⇒ mais potência ⇒ água mais quente.', 'Por isso "inverno" usa um trecho menor do resistor.'),
      };
    },
    (r) => {
      const R = r.pick([10, 20, 30, 60]), n = r.pick([2, 3, 4, 6]);
      const tipo = r.pick(['série', 'paralelo']);
      return {
        e: `${n} resistores iguais, de ${R} Ω cada, são associados em ${tipo}. Qual é a resistência equivalente?`,
        r: tipo === 'série' ? R * n : R / n,
        d: [tipo === 'série' ? R / n : R * n, R, R + n, R * n * n],
        f: u('Ω'),
        x: expl(`associação em ${tipo}`, tipo === 'série' ? 'Em série, as resistências se somam.' : 'Em paralelo com resistores iguais, divide-se R pelo número de resistores.', tipo === 'série' ? `${n} × ${R} = ${R * n} Ω.` : `${R} ÷ ${n} = ${num(R / n)} Ω.`),
      };
    },
  ],
  [
    (r) => {
      const R = r.pick([2, 4, 6, 10]), kL = r.pick([2, 3]), kA = r.pick([2, 4]);
      if (kL === kA) return eletro[1][0](r);
      return {
        e: `Um fio tem resistência de ${R} Ω. Outro fio, do mesmo material, tem comprimento ${kL} vezes maior e área de seção ${kA} vezes maior. Qual é a sua resistência?`,
        r: (R * kL) / kA,
        d: [R * kL * kA, (R * kA) / kL, R * kL, R / kA],
        f: u('Ω'),
        x: expl('2ª lei de Ohm (R = ρ·L/A)', 'Mais comprido ⇒ mais resistência; mais grosso ⇒ menos resistência.', `${R} × ${kL} ÷ ${kA} = ${num((R * kL) / kA)} Ω.`),
      };
    },
    (r) => {
      const R1 = r.pick([10, 20, 30]), R2 = r.pick([20, 40, 60]), U = r.pick([12, 24, 60]);
      const U1 = (U * R1) / (R1 + R2);
      return {
        e: `Dois resistores de ${R1} Ω e ${R2} Ω estão em série, ligados a uma bateria de ${U} V. Qual é a tensão sobre o resistor de ${R1} Ω?`,
        r: arred(U1, 2),
        d: [U, arred(U - U1, 2), U / 2, arred((U * R2) / R1, 2)],
        f: u('V'),
        x: expl('divisor de tensão', 'Em série, a corrente é a mesma; a tensão se divide na proporção das resistências.', `i = ${U} ÷ ${R1 + R2} = ${num(U / (R1 + R2), 3)} A; U₁ = ${R1} × i = ${num(U1)} V.`),
      };
    },
    (r) => {
      const ap = r.sample([[1500, 'micro-ondas'], [2200, 'chuveiro'], [1000, 'ferro de passar'], [800, 'ventilador e TV'], [1200, 'secador']], 3);
      const U = r.pick([127, 220]);
      const P = ap.reduce((s, a) => s + a[0], 0);
      const i = P / U;
      return {
        e: `Em uma casa com rede de ${U} V, ligam-se ao mesmo tempo: ${ap.map((a) => `${a[1]} (${num(a[0])} W)`).join(', ')}. Qual é a corrente total, aproximada, que passa pelo disjuntor?`,
        r: `${num(arred(i, 1))} A`,
        d: [`${num(arred(i / 2, 1))} A`, `${num(arred((P * U) / 1000, 1))} A`, `${num(arred(i * 1.5, 1))} A`, `${num(arred(ap[0][0] / U, 1))} A`],
        x: expl('aparelhos em paralelo', 'Na casa, os aparelhos estão em paralelo: as potências (e as correntes) se somam.', `P total = ${num(P)} W; i = ${num(P)} ÷ ${U} ≈ ${num(arred(i, 1))} A.`),
      };
    },
  ],
  [
    (r) => {
      const Q = r.pick([2, 4, 6]), d = r.pick([1, 2, 3]);
      const E = (9e9 * Q * 1e-6) / (d * d);
      return {
        e: `Qual é a intensidade do campo elétrico a ${d} m de uma carga puntiforme de ${Q} μC, no vácuo? (k = 9 × 10⁹ N·m²/C²)`,
        r: E,
        d: [(9e9 * Q * 1e-6) / d, E * 2, E / 10, (9e9 * Q) / (d * d)],
        f: (v) => `${num(v)} N/C`,
        x: expl('E = k·|Q|/d²', 'O campo enfraquece com o quadrado da distância.', `9 × 10⁹ × ${Q} × 10⁻⁶ ÷ ${d * d} = ${num(E)} N/C.`),
      };
    },
    (r) => {
      const R1 = r.pick([10, 20, 30]), R2 = r.pick([20, 40, 60]), R3 = r.pick([15, 30, 45]);
      const R4 = (R2 * R3) / R1;
      return {
        e: `Em uma ponte de Wheatstone em equilíbrio, os resistores dos ramos opostos são R₁ = ${R1} Ω e R₄ (desconhecido), e R₂ = ${R2} Ω e R₃ = ${R3} Ω. Qual é o valor de R₄?`,
        r: R4,
        d: [(R1 * R3) / R2, (R1 * R2) / R3, R1 + R2 + R3, R4 * 2],
        f: u('Ω'),
        x: expl('equilíbrio da ponte', 'Na ponte equilibrada, os produtos dos resistores opostos são iguais: R₁·R₄ = R₂·R₃.', `R₄ = ${R2} × ${R3} ÷ ${R1} = ${num(R4)} Ω.`),
      };
    },
    (r) => {
      const Up = r.pick([110, 127, 220]), Us = r.pick([6, 9, 12, 24]), Np = r.pick([1100, 2200, 1270]);
      const Ns = (Np * Us) / Up;
      if (!Number.isInteger(Ns)) return eletro[2][2](r);
      return {
        e: `Um transformador ideal reduz a tensão de ${Up} V para ${Us} V. Se o primário tem ${num(Np)} espiras, quantas espiras tem o secundário?`,
        r: Ns,
        d: [Np / 2, Ns * 2, Ns + 10, Math.round((Np * Up) / Us / 100) * 100],
        x: expl('relação de espiras', 'A tensão é proporcional ao número de espiras: Uₚ/Uₛ = Nₚ/Nₛ.', `Nₛ = ${num(Np)} × ${Us} ÷ ${Up} = ${num(Ns)}.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Ondulatória e óptica
const ondas = [
  [
    (r) => {
      const T = r.pick([0.02, 0.05, 0.1, 0.25, 0.5, 2]);
      return {
        e: `Uma onda completa uma oscilação a cada ${num(T)} s. Qual é a sua frequência?`,
        r: 1 / T,
        d: [T, T * 2, 1 / (2 * T), 2 / T],
        f: u('Hz'),
        x: expl('f = 1/T', 'Frequência = oscilações por segundo; é o inverso do período.', `1 ÷ ${num(T)} = ${num(1 / T)} Hz.`),
      };
    },
    (r) => {
      const t = r.pick([2, 3, 4, 5, 6]);
      return {
        e: `Durante uma tempestade, uma pessoa vê um relâmpago e ouve o trovão ${t} s depois. A que distância, aproximadamente, caiu o raio? (som: 340 m/s; a luz chega praticamente na hora)`,
        r: 340 * t,
        d: [170 * t, 340 / t, 3e8 * t, 340 * t * 2],
        f: u('m'),
        x: expl('d = v·t (sem ida e volta)', 'A luz chega quase instantaneamente; o atraso é só o tempo do som.', `340 × ${t} = ${num(340 * t)} m.`),
      };
    },
    (r) => {
      const [onda, tipo] = r.pick([['o som', 'mecânica'], ['a luz visível', 'eletromagnética'], ['as micro-ondas', 'eletromagnética'], ['uma onda numa corda', 'mecânica'], ['os raios X', 'eletromagnética']]);
      return {
        e: `Sobre ${onda}, é correto afirmar que se trata de uma onda:`,
        r: tipo === 'mecânica' ? 'mecânica, que precisa de um meio material para se propagar' : 'eletromagnética, que também se propaga no vácuo',
        d: [tipo === 'mecânica' ? 'eletromagnética, que também se propaga no vácuo' : 'mecânica, que precisa de um meio material para se propagar', 'mecânica, que se propaga melhor no vácuo', 'eletromagnética, que só se propaga em sólidos', 'que não transporta energia'],
        x: expl('natureza das ondas', 'Ondas mecânicas (som, cordas, água) precisam de matéria. Ondas eletromagnéticas (luz, rádio, raios X) se propagam até no vácuo.', ''),
      };
    },
  ],
  [
    (r) => {
      const sit = r.pick(['se aproxima', 'se afasta']);
      return {
        e: `Uma ambulância com a sirene ligada ${sit} de uma pessoa parada na calçada. Em relação ao som emitido, a pessoa percebe um som:`,
        r: sit === 'se aproxima' ? 'mais agudo (frequência maior)' : 'mais grave (frequência menor)',
        d: [sit === 'se aproxima' ? 'mais grave (frequência menor)' : 'mais agudo (frequência maior)', 'com a mesma frequência, só mais alto', 'com a mesma frequência, só mais baixo', 'sem nenhuma alteração'],
        x: expl('efeito Doppler', 'Fonte se aproximando "comprime" as ondas (frequência maior, som agudo); se afastando, "estica" (grave).', ''),
      };
    },
    (r) => {
      const f = r.pick([10, 15, 20]), p = r.pick([30, 40, 60]);
      const pl = (p * f) / (p - f);
      return {
        e: `Um objeto está a ${p} cm de uma lente convergente de distância focal ${f} cm. A que distância da lente se forma a imagem?`,
        r: arred(pl, 2),
        d: [arred((p * f) / (p + f), 2), p - f, arred(pl * 2, 2), f],
        f: u('cm'),
        x: expl('equação de Gauss', '1/f = 1/p + 1/p\'. Isole 1/p\'.', `1/p' = 1/${f} − 1/${p} ⇒ p' = ${num(pl)} cm (imagem real, do outro lado da lente).`),
      };
    },
    (r) => {
      const n1 = r.pick([1, 1.33]), n2 = r.pick([1.5, 2, 2.4]);
      return {
        e: `O índice de refração de um meio A é ${num(n1)} e o de um meio B é ${num(n2)}. Qual é a razão entre a velocidade da luz em A e em B (v_A/v_B)?`,
        r: arred(n2 / n1, 2),
        d: [arred(n1 / n2, 2), n1 * n2, n2 - n1, 1],
        x: expl('n = c/v', 'Velocidade e índice de refração são inversamente proporcionais.', `v_A/v_B = n_B/n_A = ${num(n2)} ÷ ${num(n1)} ≈ ${num(n2 / n1)}.`),
      };
    },
    (r) => {
      const V = r.pick([-1, -1.5, -2, -2.5, -4]);
      return {
        e: `Uma pessoa míope usa óculos de ${num(V)} dioptrias ("${num(-V)} graus"). Qual é a distância focal dessas lentes, e de que tipo elas são?`,
        r: `${num(100 / V)} cm; lentes divergentes`,
        d: [`${num(-100 / V)} cm; lentes convergentes`, `${num(V)} cm; lentes divergentes`, `${num(100 / V)} cm; lentes convergentes`, `${num(-V * 10)} cm; lentes divergentes`],
        x: expl('vergência V = 1/f (f em metros)', 'Miopia se corrige com lente divergente, de vergência negativa.', `f = 1 ÷ (${num(V)}) = ${num(1 / V)} m = ${num(100 / V)} cm.`),
      };
    },
  ],
  [
    (r) => {
      const f1 = r.pick([440, 256, 512]), d = r.pick([2, 3, 4, 5]);
      return {
        e: `Dois diapasões tocam ao mesmo tempo, com frequências de ${f1} Hz e ${f1 + d} Hz. Quantos batimentos por segundo são ouvidos?`,
        r: d,
        d: [2 * f1 + d, f1 + d / 2, d * 2, (2 * f1 + d) / 2],
        f: u('Hz'),
        x: expl('batimentos', 'Ondas de frequências próximas se somam e o volume "pulsa" na diferença entre as frequências.', `${f1 + d} − ${f1} = ${d} batimentos por segundo.`),
      };
    },
    (r) => {
      const V1 = r.pick([2, 3, 4, 5]), V2 = r.pick([-1, -2, 1, 2]);
      return {
        e: `Duas lentes delgadas, de vergências ${V1} di e ${V2} di, são colocadas encostadas uma na outra. Qual é a distância focal do conjunto?`,
        r: arred(100 / (V1 + V2), 2),
        d: [arred(100 / V1 + 100 / V2, 2), arred(100 / (V1 - V2), 2), V1 + V2, arred((V1 + V2) / 100, 2)],
        f: u('cm'),
        x: expl('justaposição de lentes', 'Lentes encostadas: as vergências se SOMAM.', `V = ${V1} + (${V2}) = ${V1 + V2} di; f = 1 ÷ ${V1 + V2} m = ${num(100 / (V1 + V2))} cm.`),
      };
    },
    (r) => {
      const f = r.pick([500, 600, 900]), vs = r.pick([20, 34, 40]);
      const fl = (f * 340) / (340 - vs);
      return {
        e: `Uma fonte sonora de ${f} Hz se aproxima de um observador parado a ${vs} m/s. Qual é a frequência percebida? (som: 340 m/s)`,
        r: arred(fl, 1),
        d: [f, arred((f * 340) / (340 + vs), 1), arred(f + vs, 1), arred((f * (340 + vs)) / 340, 1)],
        f: u('Hz'),
        x: expl('efeito Doppler (fonte em movimento)', 'f\' = f·v/(v − v_fonte) quando a fonte se aproxima.', `${f} × 340 ÷ (340 − ${vs}) = ${num(fl, 1)} Hz.`),
      };
    },
  ],
];

export default { cinematica, dinamica, energia, hidro, termo, eletro, ondas };
