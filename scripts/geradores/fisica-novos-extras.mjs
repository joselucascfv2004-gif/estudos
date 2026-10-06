// Física — modelos acrescentados em 2026 para levar os tópicos 1 a 7 a 50 questões.
// Entram no fim de cada nível (ver `novos` em util.mjs), sem mudar as questões antigas. g = 10 m/s².
import { expl, nome, num, sup } from './util.mjs';

const u = (un) => (v) => `${num(v)} ${un}`;
const G = 10;
/** Sorteia até a condição valer (para garantir números "redondos"). */
const ate = (gerar, ok) => {
  for (let i = 0; i < 500; i++) {
    const v = gerar();
    if (ok(v)) return v;
  }
  throw new Error('sem combinação válida');
};
const inteiro = (v) => Math.abs(v - Math.round(v)) < 1e-9;

// ------------------------------------------------------------- Cinemática
const cinematica = [
  [
    (r) => {
      const v = r.pick([36, 54, 72, 90, 108, 126, 144, 180]);
      return {
        e: `O velocímetro de um carro marca ${v} km/h. Qual é essa velocidade em metros por segundo?`,
        r: v / 3.6,
        d: [v * 3.6, v / 36, v / 1.8, v - 3.6],
        f: u('m/s'),
        x: expl('km/h → m/s (÷ 3,6)', '1 km/h = 1 000 m em 3 600 s; por isso se divide por 3,6.', `${v} ÷ 3,6 = ${num(v / 3.6)} m/s.`),
      };
    },
    (r) => {
      const [L, P, v] = ate(
        () => [r.pick([100, 120, 150, 200, 250]), r.pick([300, 350, 400, 450, 550, 600]), r.pick([10, 15, 20, 25])],
        ([L, P, v]) => inteiro((L + P) / v),
      );
      return {
        e: `Um trem de ${L} m de comprimento, a ${v} m/s constantes, atravessa uma ponte de ${P} m. Quanto tempo leva desde que a frente entra na ponte até a traseira sair dela?`,
        r: (L + P) / v,
        d: [P / v, L / v, (P - L) / v, (L + P) / (2 * v)],
        f: u('s'),
        x: expl('corpo extenso: some os comprimentos', 'Para a traseira sair, a frente precisa andar a ponte inteira mais o próprio comprimento do trem.', `(${L} + ${P}) ÷ ${v} = ${num((L + P) / v)} s.`),
      };
    },
    (r) => {
      const [d1, t1, d2, t2] = ate(
        () => [r.pick([60, 80, 90, 120, 150]), r.pick([1, 2]), r.pick([40, 60, 100, 180]), r.pick([1, 2, 3])],
        ([d1, t1, d2, t2]) => inteiro((d1 + d2) / (t1 + t2)) && d1 / t1 !== d2 / t2,
      );
      const vm = (d1 + d2) / (t1 + t2);
      return {
        e: `Numa viagem, um ônibus percorre ${d1} km em ${t1} h e depois faz mais ${d2} km em ${t2} h. Qual foi a velocidade média na viagem toda?`,
        r: vm,
        d: [(d1 / t1 + d2 / t2) / 2, d1 + d2, (d1 + d2) / Math.max(t1, t2), d1 / t1 + d2 / t2],
        f: u('km/h'),
        x: expl('velocidade média = distância total ÷ tempo total', 'Não se faz a média das velocidades dos trechos.', `(${d1} + ${d2}) ÷ (${t1} + ${t2}) = ${num(vm)} km/h.`),
      };
    },
    (r) => {
      const v = r.pick([4, 5, 6, 8, 10]), t = r.pick([5, 10, 15, 20, 30]);
      return {
        e: `${nome(r)} pedala com velocidade constante de ${v} m/s durante ${t} minutos. Que distância percorre, em metros?`,
        r: v * t * 60,
        d: [v * t, (v * t * 60) / 1000, v * 60, v * t * 3.6],
        f: u('m'),
        x: expl('d = v·t (com o tempo em segundos)', 'A velocidade está em m/s, então o tempo precisa estar em segundos.', `${t} min = ${t * 60} s; ${v} × ${t * 60} = ${v * t * 60} m.`),
      };
    },
    (r) => {
      const v0 = r.pick([0, 4, 6, 10]), v = v0 + r.pick([6, 10, 14, 20]), t = r.pick([2, 4, 5, 8]);
      return {
        e: `Um carro aumenta a velocidade de ${v0} m/s para ${v} m/s em ${t} s, com aceleração constante. Que distância percorre nesse intervalo?`,
        r: ((v0 + v) / 2) * t,
        d: [v * t, (v - v0) * t, ((v - v0) / 2) * t, (v0 + v) * t],
        f: u('m'),
        x: expl('no MUV, d = velocidade média × tempo', 'Com aceleração constante, a velocidade média é a média entre a inicial e a final.', `(${v0} + ${v}) ÷ 2 × ${t} = ${num(((v0 + v) / 2) * t)} m.`),
      };
    },
  ],
  [
    (r) => {
      const vk = r.pick([36, 54, 72, 90, 108]), a = r.pick([2, 3, 4, 5, 6]);
      const v = vk / 3.6;
      return {
        e: `Um carro a ${vk} km/h freia com desaceleração constante de ${a} m/s² até parar. Quanto tempo dura a frenagem?`,
        r: v / a,
        d: [vk / a, v * a, v / (2 * a), (v * v) / (2 * a)],
        f: u('s'),
        x: expl('v = v₀ − a·t, com v = 0', 'Converta a velocidade para m/s e divida pela desaceleração.', `${vk} km/h = ${num(v)} m/s; t = ${num(v)} ÷ ${a} = ${num(v / a)} s.`),
      };
    },
    (r) => {
      const [R1, R2, f1] = ate(
        () => [r.pick([5, 10, 15, 20]), r.pick([30, 40, 50, 60]), r.pick([300, 600, 900, 1200])],
        ([R1, R2, f1]) => inteiro((f1 * R1) / R2),
      );
      return {
        e: `Duas polias estão ligadas por uma correia que não desliza. A menor, de raio ${R1} cm, gira a ${f1} rpm. Com que frequência gira a maior, de raio ${R2} cm?`,
        r: (f1 * R1) / R2,
        d: [(f1 * R2) / R1, f1, f1 - R2, (f1 * R1) / (2 * R2)],
        f: u('rpm'),
        x: expl('transmissão por correia: f₁·R₁ = f₂·R₂', 'Os pontos da correia têm a mesma velocidade linear nas duas polias; a maior gira mais devagar.', `f₂ = ${f1} × ${R1} ÷ ${R2} = ${num((f1 * R1) / R2)} rpm.`),
      };
    },
    (r) => {
      const v = r.pick([10, 20, 30, 40]), R = r.pick([50, 100, 200, 400]);
      return {
        e: `Um carro faz uma curva circular de raio ${R} m a ${v} m/s constantes. Qual é a sua aceleração centrípeta?`,
        r: (v * v) / R,
        d: [v / R, (2 * v * v) / R, (v * v) / (2 * R), (v * R) / 100],
        f: u('m/s²'),
        x: expl('aceleração centrípeta a = v²/R', 'Mesmo com velocidade constante em módulo, a direção muda, e isso exige aceleração para o centro.', `a = ${v}² ÷ ${R} = ${num((v * v) / R)} m/s².`),
      };
    },
    (r) => {
      const s0 = r.int(0, 20), v0 = r.pick([2, 4, 5]), a = r.pick([2, 4, 6]), t = r.pick([2, 3, 4, 5]);
      const s = s0 + v0 * t + (a * t * t) / 2;
      return {
        e: `Um móvel em MUV parte da posição ${s0} m com velocidade de ${v0} m/s e aceleração de ${a} m/s². Em que posição estará no instante t = ${t} s?`,
        r: s,
        d: [s0 + v0 * t + a * t * t, s0 + v0 * t, v0 * t + (a * t * t) / 2, s0 + (v0 + a * t) * t],
        f: u('m'),
        x: expl('s = s₀ + v₀·t + a·t²/2', 'Some a posição inicial, o que a velocidade inicial anda e o efeito da aceleração.', `${s0} + ${v0} × ${t} + ${a} × ${t}² ÷ 2 = ${num(s)} m.`),
      };
    },
    (r) => {
      const [v1, v2] = r.pick([[60, 40], [30, 60], [90, 60], [40, 60], [120, 80], [20, 30]]);
      const vm = (2 * v1 * v2) / (v1 + v2);
      return {
        e: `${nome(r)} vai de uma cidade a outra a ${v1} km/h e volta pelo mesmo caminho a ${v2} km/h. Qual foi a velocidade média na ida e volta?`,
        r: vm,
        d: [(v1 + v2) / 2, v1 + v2, Math.abs(v1 - v2), (v1 * v2) / (v1 + v2)],
        f: u('km/h'),
        x: expl('distâncias iguais: vm = 2·v₁·v₂/(v₁ + v₂)', 'Os trechos têm a mesma distância, mas tempos diferentes: a média aritmética das velocidades está errada.', `2 × ${v1} × ${v2} ÷ (${v1} + ${v2}) = ${num(vm)} km/h.`),
      };
    },
  ],
  [
    (r) => {
      const [h, vx] = r.pick([[20, 15], [20, 21], [45, 40], [80, 30], [80, 42], [45, 22.5]]);
      const t = Math.sqrt((2 * h) / G), vy = G * t, v = Math.hypot(vx, vy);
      return {
        e: `Uma bola é lançada horizontalmente, a ${num(vx)} m/s, do alto de um prédio de ${h} m. Desprezando o ar (g = 10 m/s²), com que velocidade ela chega ao solo?`,
        r: v,
        d: [vx + vy, vy, vx, Math.sqrt(vx * vx + vy)],
        f: u('m/s'),
        x: expl('lançamento horizontal: componentes + Pitágoras', 'A horizontal não muda; a vertical cresce como na queda livre. Some as duas como vetores.', `t = √(2 × ${h} ÷ 10) = ${num(t)} s; vy = ${num(vy)} m/s; v = √(${num(vx)}² + ${num(vy)}²) = ${num(v)} m/s.`),
      };
    },
    (r) => {
      const L = r.pick([60, 80, 120, 150]), vb = r.pick([2, 3, 4]), vc = r.pick([1, 1.5, 2]);
      const drift = (vc * L) / vb;
      return {
        e: `Um barco atravessa um rio de ${L} m de largura apontando sempre perpendicularmente às margens, com velocidade de ${vb} m/s em relação à água. A correnteza tem ${num(vc)} m/s. Quantos metros rio abaixo ele chega à outra margem?`,
        r: drift,
        d: [L, (vb * L) / vc, L / vb, vc * L],
        f: u('m'),
        x: expl('movimentos independentes', 'O tempo de travessia depende só da velocidade perpendicular; nesse tempo, a correnteza arrasta o barco.', `t = ${L} ÷ ${vb} = ${num(L / vb)} s; arrasto = ${num(vc)} × ${num(L / vb)} = ${num(drift)} m.`),
      };
    },
    (r) => {
      const v0 = r.pick([20, 30, 40, 50, 60]);
      const vy = v0 / 2, H = (vy * vy) / (2 * G);
      return {
        e: `Um projétil é lançado do solo a ${v0} m/s, formando 30° com a horizontal (sen 30° = 0,5). Desprezando o ar (g = 10 m/s²), qual é a altura máxima?`,
        r: H,
        d: [(v0 * v0) / (2 * G), vy / G, (v0 * v0) / (4 * G), 2 * H],
        f: u('m'),
        x: expl('altura máxima: só a componente vertical importa', 'Na altura máxima, a velocidade vertical zera. Use Torricelli com v_y = v₀·sen θ.', `vy = ${v0} × 0,5 = ${num(vy)} m/s; H = ${num(vy)}² ÷ 20 = ${num(H)} m.`),
      };
    },
    (r) => {
      const [L1, L2, v1, v2] = ate(
        () => [r.pick([120, 150, 200]), r.pick([80, 100, 150]), r.pick([25, 30]), r.pick([15, 20])],
        ([L1, L2, v1, v2]) => inteiro((L1 + L2) / (v1 - v2)),
      );
      const t = (L1 + L2) / (v1 - v2);
      return {
        e: `Um trem de ${L1} m, a ${v1} m/s, ultrapassa outro de ${L2} m que segue no mesmo sentido a ${v2} m/s, em trilhos paralelos. Quanto tempo dura a ultrapassagem?`,
        r: t,
        d: [(L1 + L2) / (v1 + v2), L1 / (v1 - v2), (L1 + L2) / v1, L2 / (v1 - v2)],
        f: u('s'),
        x: expl('velocidade relativa no mesmo sentido', 'Do ponto de vista do trem lento, o rápido avança a v₁ − v₂ e precisa "andar" os dois comprimentos.', `(${L1} + ${L2}) ÷ (${v1} − ${v2}) = ${num(t)} s.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Dinâmica
const dinamica = [
  [
    (r) => {
      const [m1, m2] = r.pick([[12000, 1000], [9000, 1500], [8000, 800], [15000, 1200]]);
      const F = r.pick([4000, 6000, 9000, 12000]);
      return {
        e: `Numa colisão, um caminhão de ${num(m1)} kg exerce sobre um carro de ${num(m2)} kg uma força de ${num(F)} N. Qual é a força que o carro exerce sobre o caminhão?`,
        r: F,
        d: [(F * m2) / m1, (F * m1) / m2, F / 2, 2 * F],
        f: u('N'),
        x: expl('3ª lei de Newton (ação e reação)', 'As forças de ação e reação têm sempre o mesmo módulo, mesmo com massas muito diferentes; o que muda é o efeito (a aceleração) em cada corpo.', `A força no caminhão também vale ${num(F)} N.`),
      };
    },
    (r) => {
      const m = r.pick([50, 60, 70, 80, 90, 100]);
      return {
        e: `Um astronauta tem massa de ${m} kg. Qual é o seu peso na Lua, onde g = 1,6 m/s²?`,
        r: m * 1.6,
        d: [m * 10, m, m / 1.6, (m * 10) / 1.6],
        f: u('N'),
        x: expl('P = m·g (com o g do lugar)', 'A massa não muda de um astro para outro; o peso depende da gravidade local.', `P = ${m} × 1,6 = ${num(m * 1.6)} N.`),
      };
    },
    (r) => {
      const m = r.pick([5, 8, 10, 20, 30]);
      const F = ate(() => r.pick([10, 20, 30, 40, 50, 60]), (F) => F < m * G);
      return {
        e: `Uma caixa de ${m} kg está apoiada no chão. Uma pessoa a puxa para cima com ${F} N, sem conseguir levantá-la. Qual é a força normal do chão sobre a caixa? (g = 10 m/s²)`,
        r: m * G - F,
        d: [m * G + F, m * G, F, m * G - 2 * F],
        f: u('N'),
        x: expl('equilíbrio na vertical: N + F = P', 'A caixa continua parada, então as forças para cima equilibram o peso.', `N = ${m * G} − ${F} = ${m * G - F} N.`),
      };
    },
    (r) => {
      const m = r.pick([800, 1000, 1200, 1500]), v = r.pick([20, 25, 30]), t = r.pick([4, 5, 10]);
      return {
        e: `Um carro de ${num(m)} kg, a ${v} m/s, freia até parar em ${t} s. Qual é o módulo da força média de frenagem?`,
        r: (m * v) / t,
        d: [m * v * t, (m * v) / (2 * t), (m * G) / t, m * v],
        f: u('N'),
        x: expl('2ª lei com a = Δv/Δt', 'Primeiro a desaceleração média, depois F = m·a.', `a = ${v} ÷ ${t} = ${num(v / t)} m/s²; F = ${num(m)} × ${num(v / t)} = ${num((m * v) / t)} N.`),
      };
    },
    (r) => {
      const [m, F] = ate(() => [r.pick([5, 10, 20, 25, 40]), r.pick([20, 30, 40, 50, 60, 80])], ([m, F]) => F < m * G && inteiro((F / (m * G)) * 100));
      return {
        e: `Para começar a mover uma caixa de ${m} kg num piso horizontal, é preciso uma força horizontal de pelo menos ${F} N. Qual é o coeficiente de atrito estático? (g = 10 m/s²)`,
        r: F / (m * G),
        d: [F / m, (m * G) / F, F / 100, F / (m * G * 2)],
        x: expl('atrito estático máximo: F = μₑ·N', 'No limite de começar a escorregar, a força aplicada iguala o atrito máximo, e N = m·g.', `μₑ = ${F} ÷ (${m} × 10) = ${num(F / (m * G))}.`),
      };
    },
  ],
  [
    (r) => {
      const [m, k, v] = r.pick([[80, 0.32, 50], [80, 0.5, 40], [80, 2, 20], [72, 0.2, 60], [72, 0.45, 40], [72, 0.8, 30]]);
      return {
        e: `Um paraquedista de ${m} kg (com o equipamento) cai sujeito a uma força de resistência do ar F = ${num(k)}·v² (SI). Qual é a sua velocidade terminal? (g = 10 m/s²)`,
        r: v,
        d: [(m * G) / k, Math.sqrt(m / k), v * 2, v / 2],
        f: u('m/s'),
        x: expl('velocidade terminal: resistência = peso', 'Quando a resistência do ar iguala o peso, a força resultante zera e a velocidade para de aumentar.', `${num(k)}·v² = ${m * G} → v² = ${num((m * G) / k)} → v = ${v} m/s.`),
      };
    },
    (r) => {
      const k1 = r.pick([100, 200, 300]), k2 = r.pick([100, 200, 400, 500]), m = r.pick([3, 6, 9, 12]);
      const x = (m * G) / (k1 + k2);
      return {
        e: `Duas molas, de constantes ${k1} N/m e ${k2} N/m, são presas lado a lado (em paralelo) e sustentam juntas um corpo de ${m} kg. Qual é a deformação delas, em centímetros? (g = 10 m/s²)`,
        r: x * 100,
        d: [((m * G) / k1) * 100, ((m * G) / k2) * 100, ((m * G * (k1 + k2)) / (k1 * k2)) * 100, x * 50],
        f: u('cm'),
        x: expl('molas em paralelo: k_eq = k₁ + k₂', 'Em paralelo, as duas esticam o mesmo tanto e dividem o peso; as constantes se somam.', `k = ${k1 + k2} N/m; x = ${m * G} ÷ ${k1 + k2} = ${num(x, 4)} m = ${num(x * 100)} cm.`),
      };
    },
    (r) => {
      const [mA, mB] = ate(() => [r.pick([2, 3, 4, 6, 8]), r.pick([1, 2, 3, 4])], ([a, b]) => inteiro(((b * G) / (a + b)) * 100));
      const a = (mB * G) / (mA + mB);
      return {
        e: `Um bloco de ${mA} kg está sobre uma mesa horizontal sem atrito, preso por um fio (que passa por uma polia na borda) a um bloco de ${mB} kg pendurado. Qual é a aceleração do sistema? (g = 10 m/s²)`,
        r: a,
        d: [G, (mB * G) / mA, (mA * G) / (mA + mB), G / 2],
        f: u('m/s²'),
        x: expl('2ª lei no sistema todo', 'Só o peso do bloco pendurado acelera o conjunto, mas ele precisa mover as duas massas.', `a = ${mB} × 10 ÷ (${mA} + ${mB}) = ${num(a)} m/s².`),
      };
    },
    (r) => {
      const v = r.pick([10, 12, 15, 20]), mu = r.pick([0.2, 0.25, 0.4, 0.5]);
      return {
        e: `Um bloco desliza num piso horizontal a ${v} m/s e para só por causa do atrito, com coeficiente cinético ${num(mu)}. Quanto tempo leva para parar? (g = 10 m/s²)`,
        r: v / (mu * G),
        d: [v * mu * G, v / mu, (v * v) / (2 * mu * G), v / G],
        f: u('s'),
        x: expl('desaceleração pelo atrito: a = μ·g', 'Na horizontal, a única força é o atrito μ·m·g; dividindo pela massa, a = μ·g.', `a = ${num(mu)} × 10 = ${num(mu * G)} m/s²; t = ${v} ÷ ${num(mu * G)} = ${num(v / (mu * G))} s.`),
      };
    },
    (r) => {
      const F = r.pick([20, 50, 80, 100, 150]);
      return {
        e: `Duas pessoas puxam as pontas de um dinamômetro em sentidos opostos, cada uma com ${F} N. O dinamômetro fica parado. Quanto ele marca?`,
        r: F,
        d: [2 * F, 0, F / 2, 3 * F],
        f: u('N'),
        x: expl('dinamômetro mede a tração no fio', 'Uma ponta precisa estar presa (ou sendo puxada) para o aparelho medir; a outra força é só a reação que o mantém parado.', `Ele marca ${F} N, e não ${2 * F} N.`),
      };
    },
  ],
  [
    (r) => {
      const m = r.pick([10, 20, 30, 50]), mu = r.pick([0.25, 0.5]);
      const P = m * G, F = P * 0.6 + mu * P * 0.8;
      return {
        e: `Um bloco de ${m} kg sobe um plano inclinado de 37° com velocidade constante, puxado por uma força paralela ao plano. O coeficiente de atrito cinético é ${num(mu)}. Qual é essa força? (g = 10 m/s², sen 37° = 0,6, cos 37° = 0,8)`,
        r: F,
        d: [P * 0.6, P * 0.6 - mu * P * 0.8, P * 0.8 + mu * P * 0.6, P * 0.6 + mu * P],
        f: u('N'),
        x: expl('equilíbrio no plano: F = P·sen θ + μ·P·cos θ', 'Velocidade constante significa resultante nula; subindo, o atrito aponta para baixo, junto com a componente do peso.', `${P} × 0,6 + ${num(mu)} × ${P} × 0,8 = ${num(P * 0.6)} + ${num(mu * P * 0.8)} = ${num(F)} N.`),
      };
    },
    (r) => {
      const [m, v, R] = ate(() => [r.pick([600, 800, 1000, 1200]), r.pick([10, 12, 15, 20]), r.pick([40, 50, 80, 100])], ([, v, R]) => (v * v) / R < G);
      const N = m * (G - (v * v) / R);
      return {
        e: `Um carro de ${num(m)} kg passa pelo alto de uma lombada circular de raio ${R} m a ${v} m/s. Qual é a força normal da pista sobre o carro nesse ponto? (g = 10 m/s²)`,
        r: N,
        d: [m * G, m * (G + (v * v) / R), (m * v * v) / R, m * G - v * v],
        f: u('N'),
        x: expl('no topo, P − N = m·v²/R', 'O carro faz curva para baixo: a resultante (peso menos normal) é a força centrípeta. Por isso ele fica "mais leve".', `N = ${m} × (10 − ${v}²/${R}) = ${m} × ${num(G - (v * v) / R)} = ${num(N)} N.`),
      };
    },
    (r) => {
      const [ang, tg] = r.pick([[37, 0.75], [45, 1], [53, 4 / 3], [16, 0.28]]);
      return {
        e: `Um bloco está na iminência de escorregar num plano inclinado de ${ang}°${ang === 16 ? ' (tg 16° ≈ 0,28)' : ang === 37 ? ' (tg 37° = 0,75)' : ang === 53 ? ' (tg 53° ≈ 1,33)' : ''}. Qual é o coeficiente de atrito estático entre o bloco e o plano?`,
        r: tg,
        d: [1 / tg, tg / 2, ang / 100, Math.min(0.99, tg * 0.8)],
        x: expl('iminência de escorregar: μₑ = tg θ', 'Igualando P·sen θ ao atrito máximo μ·P·cos θ, a massa some: μ = sen θ/cos θ.', `μₑ = tg ${ang}° = ${num(tg)}.`),
      };
    },
    (r) => {
      const [mA, mB, mu] = ate(() => [r.pick([2, 4, 5, 6, 8]), r.pick([2, 3, 4, 5]), r.pick([0.1, 0.2, 0.25, 0.5])], ([a, b, mu]) => b > mu * a && inteiro((((b - mu * a) * G) / (a + b)) * 100));
      const a = ((mB - mu * mA) * G) / (mA + mB);
      return {
        e: `Um bloco de ${mA} kg sobre uma mesa horizontal (atrito cinético ${num(mu)}) está ligado por um fio, que passa por uma polia, a um bloco de ${mB} kg pendurado. Qual é a aceleração do conjunto? (g = 10 m/s²)`,
        r: a,
        d: [(mB * G) / (mA + mB), ((mB + mu * mA) * G) / (mA + mB), ((mB - mu * mA) * G) / mB, G - mu * G],
        f: u('m/s²'),
        x: expl('2ª lei no sistema: (peso pendurado − atrito) ÷ massa total', 'O peso do bloco pendurado puxa; o atrito no bloco da mesa (μ·m·g) segura.', `a = (${mB * G} − ${num(mu * mA * G)}) ÷ ${mA + mB} = ${num(a)} m/s².`),
      };
    },
  ],
];

// ------------------------------------------------------------- Trabalho, energia e potência
const energia = [
  [
    (r) => {
      const [m, v] = r.pick([[2, 3], [2, 5], [4, 5], [10, 2], [10, 4], [8, 5], [50, 2], [0.5, 10]]);
      const Ec = (m * v * v) / 2;
      return {
        e: `Um corpo de ${num(m)} kg tem energia cinética de ${num(Ec)} J. Qual é a sua velocidade?`,
        r: v,
        d: [Ec / m, (2 * Ec) / m, v * 2, Math.sqrt(Ec / m)],
        f: u('m/s'),
        x: expl('Ec = m·v²/2, isolando v', 'Multiplique a energia por 2, divida pela massa e tire a raiz.', `v = √(2 × ${num(Ec)} ÷ ${num(m)}) = √${num((2 * Ec) / m)} = ${v} m/s.`),
      };
    },
    (r) => {
      const m = r.pick([2, 5, 10, 20, 50]), h = r.pick([2, 3, 4, 5, 8, 12]);
      const Ep = m * G * h;
      return {
        e: `Um objeto de ${m} kg tem energia potencial gravitacional de ${num(Ep)} J em relação ao chão. A que altura ele está? (g = 10 m/s²)`,
        r: h,
        d: [Ep / m, Ep / G, Ep * m, h * 2],
        f: u('m'),
        x: expl('Ep = m·g·h, isolando h', 'Divida a energia pelo peso (m·g).', `h = ${num(Ep)} ÷ (${m} × 10) = ${h} m.`),
      };
    },
    (r) => {
      const m = r.pick([5, 10, 20]), mu = r.pick([0.2, 0.3, 0.5]), d = r.pick([2, 4, 5, 10]);
      const W = -mu * m * G * d;
      return {
        e: `Uma caixa de ${m} kg é arrastada ${d} m num piso horizontal, com coeficiente de atrito cinético ${num(mu)}. Qual é o trabalho realizado pela força de atrito? (g = 10 m/s²)`,
        r: W,
        d: [-W, -m * G * d, -mu * m * d, W / 2],
        f: u('J'),
        x: expl('trabalho do atrito é negativo', 'O atrito aponta contra o movimento (θ = 180°), então o trabalho é −Fat·d, com Fat = μ·m·g.', `Fat = ${num(mu)} × ${m * G} = ${num(mu * m * G)} N; τ = −${num(mu * m * G)} × ${d} = ${num(W)} J.`),
      };
    },
    (r) => {
      const Ec = r.pick([100, 200, 250, 400, 500]), k = r.pick([2, 3]);
      return {
        e: `Um carrinho tem energia cinética de ${Ec} J. Se a sua velocidade ${k === 2 ? 'dobrar' : 'triplicar'}, qual será a nova energia cinética?`,
        r: Ec * k * k,
        d: [Ec * k, Ec * k * k * 2, Ec / k, Ec * (k + 1), Ec / (k * k)],
        f: u('J'),
        x: expl('Ec é proporcional a v²', `Multiplicar a velocidade por ${k} multiplica a energia por ${k}² = ${k * k}.`, `${Ec} × ${k * k} = ${Ec * k * k} J.`),
      };
    },
    (r) => {
      const kcal = r.pick([150, 200, 250, 300, 450, 500]);
      return {
        e: `O rótulo de um lanche informa ${kcal} kcal. Quanto é essa energia em quilojoules? (1 cal = 4,2 J)`,
        r: kcal * 4.2,
        d: [kcal / 4.2, kcal * 42, kcal * 4.2 * 1000, kcal + 4.2],
        f: u('kJ'),
        x: expl('conversão: 1 kcal = 4,2 kJ', 'Se 1 cal vale 4,2 J, então 1 000 cal valem 4 200 J.', `${kcal} × 4,2 = ${num(kcal * 4.2)} kJ.`),
      };
    },
  ],
  [
    (r) => {
      const m = r.pick([50, 60, 70, 80]), h = r.pick([3, 6, 9, 12]), t = r.pick([5, 6, 10, 12]);
      const P = (m * G * h) / t;
      return {
        e: `${nome(r)}, com ${m} kg, sobe uma escada até uma altura de ${h} m em ${t} s. Qual é a potência média que desenvolve contra a gravidade? (g = 10 m/s²)`,
        r: P,
        d: [m * G * h, (m * h) / t, (m * G * t) / h, P * 2],
        f: u('W'),
        x: expl('potência = trabalho do peso ÷ tempo', 'O trabalho para subir é m·g·h, não importa o formato da escada.', `${m} × 10 × ${h} ÷ ${t} = ${num(P)} W.`),
      };
    },
    (r) => {
      const F = r.pick([20, 40, 50, 60, 100]), x = r.pick([0.2, 0.4, 0.5, 2, 4]);
      return {
        e: `A força sobre um corpo cresce de 0 a ${F} N, de forma linear, enquanto ele se desloca ${num(x)} m (o gráfico F × d é um triângulo). Qual é o trabalho realizado?`,
        r: (F * x) / 2,
        d: [F * x, F / x, (F * x) / 4, F + x],
        f: u('J'),
        x: expl('trabalho = área do gráfico F × d', 'Com força variável, o trabalho é a área sob a curva; aqui, um triângulo.', `τ = ${F} × ${num(x)} ÷ 2 = ${num((F * x) / 2)} J.`),
      };
    },
    (r) => {
      const [h1, h2, e] = r.pick([[80, 20, 0.5], [100, 64, 0.8], [125, 45, 0.6], [45, 5, 1 / 3], [20, 5, 0.5], [50, 32, 0.8]]);
      return {
        e: `Uma bola cai de ${h1} cm de altura e, depois de bater no chão, sobe até ${h2} cm. Qual é o coeficiente de restituição da colisão?`,
        r: e,
        d: [h2 / h1, 1 - h2 / h1, h1 / h2, e * e * 2],
        x: expl('restituição: e = v(depois)/v(antes) = √(h₂/h₁)', 'A velocidade de queda vem de √(2gh); a razão entre as velocidades é a raiz da razão entre as alturas.', `e = √(${h2}/${h1}) = √${num(h2 / h1)} = ${num(e)}.`),
      };
    },
    (r) => {
      const m = r.pick([2, 4, 5, 10]), v = r.pick([2, 4, 6, 10]), h = r.pick([1, 2, 5, 10]);
      const Em = (m * v * v) / 2 + m * G * h;
      return {
        e: `Um corpo de ${m} kg passa por um ponto a ${h} m do chão com velocidade de ${v} m/s. Qual é a sua energia mecânica nesse ponto, tomando o chão como referência? (g = 10 m/s²)`,
        r: Em,
        d: [(m * v * v) / 2, m * G * h, m * v * v + m * G * h, (m * v * v) / 2 + m * h],
        f: u('J'),
        x: expl('energia mecânica = cinética + potencial', 'Some as duas parcelas no mesmo ponto.', `${m} × ${v}² ÷ 2 + ${m} × 10 × ${h} = ${num((m * v * v) / 2)} + ${m * G * h} = ${num(Em)} J.`),
      };
    },
    (r) => {
      const m = r.pick([0.2, 0.5, 1, 2]), v = r.pick([3, 4, 6, 8]);
      return {
        e: `Uma bola de bilhar de ${num(m)} kg, a ${v} m/s, bate de frente numa bola idêntica parada. A colisão é perfeitamente elástica. Com que velocidade sai a bola que estava parada?`,
        r: v,
        d: [v / 2, 0, 2 * v, v / 4],
        f: u('m/s'),
        x: expl('colisão elástica frontal com massas iguais', 'Conservando a quantidade de movimento e a energia cinética, as bolas trocam de velocidade: a que vinha para, e a outra sai com a velocidade dela.', `A bola parada sai a ${v} m/s.`),
      };
    },
  ],
  [
    (r) => {
      const R = r.pick([2, 4, 6, 8, 10]);
      return {
        e: `Um carrinho de montanha-russa parte do repouso e precisa completar um looping de raio ${R} m sem perder contato com o trilho (sem atrito). Qual é a altura mínima de partida, medida a partir da base do looping?`,
        r: 2.5 * R,
        d: [2 * R, R, 3 * R, 1.5 * R],
        f: u('m'),
        x: expl('looping: v² mínimo no topo = g·R + conservação da energia', 'No topo, o peso sozinho faz a curva (v² = gR). Pela energia, m·g·h = m·g·2R + m·v²/2.', `h = 2R + R/2 = 2,5 × ${R} = ${num(2.5 * R)} m.`),
      };
    },
    (r) => {
      const [m, M, v] = r.pick([[0.1, 0.9, 40], [0.1, 1.9, 80], [0.05, 0.95, 60], [0.2, 1.8, 30], [0.02, 0.98, 200]]);
      const vf = (m * v) / (m + M), h = (vf * vf) / (2 * G);
      return {
        e: `Uma bala de ${num(m)} kg, a ${v} m/s, se aloja num bloco de madeira de ${num(M)} kg pendurado em fios (pêndulo balístico). A que altura o conjunto sobe? (g = 10 m/s²)`,
        r: h,
        d: [(v * v) / (2 * G), vf / G, (vf * vf) / G, h * 2],
        f: u('m'),
        x: expl('quantidade de movimento na colisão + energia na subida', 'Na colisão (inelástica) conserva-se a quantidade de movimento; depois, a energia cinética vira potencial.', `v = ${num(m)} × ${v} ÷ ${num(m + M)} = ${num(vf)} m/s; h = ${num(vf)}² ÷ 20 = ${num(h)} m.`),
      };
    },
    (r) => {
      const [m1, v1, m2] = r.pick([[2, 6, 1], [3, 4, 1], [1, 10, 4], [4, 5, 1], [2, 9, 1]]);
      const vf = (m1 * v1) / (m1 + m2);
      const perda = (m1 * v1 * v1) / 2 - ((m1 + m2) * vf * vf) / 2;
      return {
        e: `Um carrinho de ${m1} kg, a ${v1} m/s, colide com outro de ${m2} kg parado, e os dois seguem grudados. Quanta energia cinética é perdida na colisão?`,
        r: perda,
        d: [(m1 * v1 * v1) / 2, ((m1 + m2) * vf * vf) / 2, 0, (m2 * v1 * v1) / 2],
        f: u('J'),
        x: expl('colisão inelástica: conserva Q, perde energia', 'Ache a velocidade final pela quantidade de movimento e compare as energias cinéticas antes e depois.', `v = ${m1 * v1} ÷ ${m1 + m2} = ${num(vf)} m/s; antes ${num((m1 * v1 * v1) / 2)} J, depois ${num(((m1 + m2) * vf * vf) / 2)} J; perda = ${num(perda)} J.`),
      };
    },
    (r) => {
      const h = r.pick([1, 2, 3, 5]), mu = r.pick([0.2, 0.25, 0.4, 0.5]);
      return {
        e: `Um bloco desce, a partir do repouso, uma rampa sem atrito de ${h} m de altura e, no fim, entra num piso horizontal com atrito (coeficiente ${num(mu)}). Que distância percorre no piso até parar?`,
        r: h / mu,
        d: [h * mu, h, (2 * h) / mu, h / (2 * mu)],
        f: u('m'),
        x: expl('energia potencial dissipada pelo atrito', 'Toda a energia m·g·h vira calor no piso: m·g·h = μ·m·g·d, e a massa e o g se cancelam.', `d = h ÷ μ = ${h} ÷ ${num(mu)} = ${num(h / mu)} m.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Estática e hidrostática
const hidro = [
  [
    (r) => {
      const d = r.pick([0.8, 1, 1.2, 2.7, 7.8, 13.6, 19.3]);
      return {
        e: `A densidade de um material é ${num(d)} g/cm³. Quanto vale em kg/m³?`,
        r: d * 1000,
        d: [d / 1000, d * 100, d * 10, d * 1e6],
        f: u('kg/m³'),
        x: expl('g/cm³ → kg/m³ (× 1 000)', '1 g/cm³ = 0,001 kg ÷ 0,000001 m³ = 1 000 kg/m³.', `${num(d)} × 1 000 = ${num(d * 1000)} kg/m³.`),
      };
    },
    (r) => {
      const [mat, d] = r.pick([['alumínio', 2.7], ['ferro', 7.8], ['cobre', 9], ['chumbo', 11.3], ['ouro', 19.3]]);
      const V = r.pick([10, 20, 50, 100]);
      const m = d * V;
      return {
        e: `Uma peça maciça de ${mat} (densidade ${num(d)} g/cm³) tem massa de ${num(m)} g. Qual é o seu volume?`,
        r: V,
        d: [m * d, d / m, m / 10, V * 2],
        f: u('cm³'),
        x: expl('V = m/d', 'Densidade é massa por volume; para achar o volume, divida a massa pela densidade.', `V = ${num(m)} ÷ ${num(d)} = ${V} cm³.`),
      };
    },
    (r) => {
      const h = r.pick([5, 10, 20, 30, 40, 50]);
      return {
        e: `Um mergulhador desce ${h} m abaixo da superfície do mar. Em quantas atmosferas, aproximadamente, a pressão sobre ele aumentou? (cada 10 m de água ≈ 1 atm)`,
        r: h / 10,
        d: [h / 10 + 1, h, h / 100, h / 5],
        f: u('atm'),
        x: expl('pressão hidrostática: ≈ 1 atm a cada 10 m de água', 'A pergunta é o aumento; a pressão total seria esse valor mais 1 atm da atmosfera.', `${h} ÷ 10 = ${num(h / 10)} atm a mais.`),
      };
    },
    (r) => {
      const V1 = r.pick([100, 200, 300]), V2 = r.pick([100, 200, 300]);
      const d = (V1 * 1 + V2 * 0.8) / (V1 + V2);
      return {
        e: `Misturam-se ${V1} mL de água (1 g/cm³) com ${V2} mL de álcool (0,8 g/cm³). Supondo que os volumes se somem, qual é a densidade da mistura?`,
        r: d,
        d: [0.9, 1.8, (V1 + V2) / 1000, (1 * V2 + 0.8 * V1) / (V1 + V2)],
        f: u('g/cm³'),
        x: expl('densidade da mistura = massa total ÷ volume total', 'Calcule a massa de cada líquido (m = d·V) e divida pelo volume total.', `(${V1} + ${num(0.8 * V2)}) ÷ ${V1 + V2} = ${num(d, 3)} g/cm³.`),
      };
    },
    (r) => {
      const F = r.pick([20, 30, 40, 50, 80]), dcm = r.pick([10, 20, 25, 30, 50]);
      return {
        e: `Para afrouxar um parafuso, aplica-se uma força de ${F} N, perpendicular à chave, a ${dcm} cm do eixo. Qual é o momento (torque) aplicado?`,
        r: (F * dcm) / 100,
        d: [F * dcm, F / (dcm / 100), (F * dcm) / 1000, F + dcm],
        f: u('N·m'),
        x: expl('momento: M = F·d', 'O braço precisa estar em metros.', `${dcm} cm = ${num(dcm / 100)} m; M = ${F} × ${num(dcm / 100)} = ${num((F * dcm) / 100)} N·m.`),
      };
    },
    (r) => {
      const cm = r.pick([19, 38, 57, 76, 114, 152]);
      return {
        e: `Num local, a pressão atmosférica equivale a uma coluna de ${cm} cmHg. Quanto é isso em atmosferas? (1 atm = 76 cmHg)`,
        r: cm / 76,
        d: [76 / cm, cm / 100, cm * 76, cm / 10],
        f: u('atm'),
        x: expl('conversão: 1 atm = 76 cmHg', 'Divida pelo valor de 1 atm em centímetros de mercúrio.', `${cm} ÷ 76 = ${num(cm / 76)} atm.`),
      };
    },
    (r) => {
      const [a, b, c] = r.sample([5, 10, 20, 40], 3).sort((x, y) => x - y);
      const m = r.pick([2, 4, 8]);
      const Amin = (a * b) / 10000, p = (m * G) / Amin;
      return {
        e: `Um tijolo maciço de ${m} kg tem dimensões ${a} cm × ${b} cm × ${c} cm. Qual é a maior pressão que ele pode exercer sobre uma mesa, apoiado numa de suas faces? (g = 10 m/s²)`,
        r: p,
        d: [(m * G) / ((b * c) / 10000), (m * G) / ((a * c) / 10000), (m * G) / (a * b), p / 10],
        f: u('Pa'),
        x: expl('p = F/A: menor área, maior pressão', 'O peso é o mesmo em qualquer face; a pressão é maior na face de menor área (a × b).', `A = ${a} × ${b} cm² = ${num(Amin, 4)} m²; p = ${m * G} ÷ ${num(Amin, 4)} = ${num(p)} Pa.`),
      };
    },
  ],
  [
    (r) => {
      const [liq, d] = r.pick([['água', 1000], ['água do mar', 1030], ['óleo', 800]]);
      const h = r.pick([2, 5, 8, 10, 15]);
      const dp = d * G * h;
      return {
        e: `Um sensor mede que a pressão no fundo de um tanque de ${liq} (densidade ${d} kg/m³) é ${num(dp)} Pa maior que na superfície. Qual é a profundidade do tanque? (g = 10 m/s²)`,
        r: h,
        d: [dp / d, dp / G, h * 10, (dp / (d * G)) / 2],
        f: u('m'),
        x: expl('Δp = d·g·h, isolando h', 'Divida a diferença de pressão por d·g.', `h = ${num(dp)} ÷ (${d} × 10) = ${h} m.`),
      };
    },
    (r) => {
      const [V, m] = ate(() => [r.pick([2, 3, 4, 5]), r.pick([1, 1.5, 2, 2.5, 3])], ([V, m]) => V > m && (V - m) / m <= 2 && inteiro(((V * G - m * G) / m) * 10));
      const E = 1 * V * G, P = m * G, a = (E - P) / m;
      return {
        e: `Uma boia de ${num(m)} kg e ${V} L de volume é mantida no fundo de uma piscina e depois solta. Qual é a sua aceleração inicial para cima? (água: 1 kg/L; g = 10 m/s²; despreze a resistência da água)`,
        r: a,
        d: [E / m, G, (E - P) / V, E - P],
        f: u('m/s²'),
        x: expl('2ª lei com empuxo: a = (E − P)/m', 'O empuxo (peso da água deslocada) é maior que o peso; a diferença acelera a boia.', `E = ${V} × 10 = ${num(E)} N; P = ${num(P)} N; a = ${num(E - P)} ÷ ${num(m)} = ${num(a)} m/s².`),
      };
    },
    (r) => {
      const d1 = r.pick([2, 4, 5]), k = r.pick([5, 10]), F1 = r.pick([50, 100, 200]);
      const d2 = d1 * k, F2 = F1 * k * k;
      return {
        e: `Numa prensa hidráulica, o êmbolo menor tem ${d1} cm de diâmetro e o maior, ${d2} cm. Aplicando ${F1} N no menor, que força se obtém no maior?`,
        r: F2,
        d: [F1 * k, (F1 * d2) / d1 / 2, F1 * k * k * 2, F1 + d2],
        f: u('N'),
        x: expl('Pascal: F₂/F₁ = A₂/A₁ = (D₂/D₁)²', 'A área cresce com o quadrado do diâmetro.', `D₂/D₁ = ${k}; F₂ = ${F1} × ${k}² = ${num(F2)} N.`),
      };
    },
    (r) => {
      const [dobj, frac] = r.pick([[0.6, 0.75], [0.8, 0.8], [0.9, 0.75], [0.5, 0.625], [0.72, 0.9]]);
      const dl = dobj / frac;
      return {
        e: `Um bloco de densidade ${num(dobj)} g/cm³ flutua num líquido com ${num(frac * 100)}% do seu volume submerso. Qual é a densidade do líquido?`,
        r: dl,
        d: [dobj * frac, frac / dobj, dobj, dl * frac * frac],
        f: u('g/cm³'),
        x: expl('flutuação: fração submersa = d(objeto)/d(líquido)', 'Na flutuação, peso = empuxo; isolando a densidade do líquido: d_líq = d_obj ÷ fração.', `${num(dobj)} ÷ ${num(frac, 3)} = ${num(dl)} g/cm³.`),
      };
    },
    (r) => {
      const [liq, d] = r.pick([['água', 1000], ['óleo de densidade 800 kg/m³', 800], ['álcool de densidade 800 kg/m³', 800], ['glicerina de densidade 1 250 kg/m³', 1250]]);
      const h = 100000 / (d * G);
      return {
        e: `Se o barômetro de Torricelli fosse feito com ${liq} em vez de mercúrio, que altura de coluna equilibraria a pressão atmosférica de 1,0 × 10⁵ Pa? (g = 10 m/s²)`,
        r: h,
        d: [0.76, h / 10, 100000 / d, h * 2],
        f: u('m'),
        x: expl('coluna de líquido: p = d·g·h', 'A coluna sobe até seu peso por área igualar a pressão do ar.', `h = 10⁵ ÷ (${d} × 10) = ${num(h)} m.`),
      };
    },
    (r) => {
      const h = r.pick([10, 20, 50, 100]), A = r.pick([0.02, 0.05, 0.1, 0.2]);
      const F = 1000 * G * h * A;
      return {
        e: `A janela de um submarino tem ${num(A)} m² e está a ${h} m de profundidade no mar (considere densidade 1 000 kg/m³). Qual é a força exercida pela água sobre ela, considerando só a pressão hidrostática? (g = 10 m/s²)`,
        r: F,
        d: [1000 * G * h, F / 10, 1000 * h * A, F * 2, F * 10],
        f: u('N'),
        x: expl('F = p·A, com p = d·g·h', 'Primeiro a pressão na profundidade, depois multiplique pela área.', `p = 1 000 × 10 × ${h} = ${num(1000 * G * h)} Pa; F = ${num(1000 * G * h)} × ${num(A)} = ${num(F)} N.`),
      };
    },
  ],
  [
    (r) => {
      const L = r.pick([4, 6, 8, 10]), Pb = r.pick([100, 200, 300]), Q = r.pick([200, 400, 600]);
      const x = ate(() => r.int(1, L - 1), (x) => x !== L / 2);
      const R2 = (Pb * (L / 2) + Q * x) / L, R1 = Pb + Q - R2;
      return {
        e: `Uma tábua homogênea de ${L} m e peso ${Pb} N está apoiada nas duas pontas. Um objeto de ${Q} N é colocado a ${x} m da ponta esquerda. Qual é a força no apoio da direita?`,
        r: R2,
        d: [R1, (Pb + Q) / 2, (Q * x) / L, Pb / 2 + Q, Q, Pb + Q],
        f: u('N'),
        x: expl('equilíbrio de momentos em relação ao apoio esquerdo', 'Os momentos dos pesos (tábua no meio e objeto) são equilibrados pelo momento da reação da direita.', `R × ${L} = ${Pb} × ${num(L / 2)} + ${Q} × ${x} → R = ${num(R2)} N.`),
      };
    },
    (r) => {
      const [V, m] = ate(() => [r.pick([2, 3, 4, 5, 6]), r.pick([0.5, 1, 1.5, 2])], ([V, m]) => V > m);
      const T = V * G - m * G;
      return {
        e: `Uma bola de ${num(m)} kg e ${V} L de volume é mantida totalmente submersa na água, presa ao fundo por um fio. Qual é a tração no fio? (água: 1 kg/L; g = 10 m/s²)`,
        r: T,
        d: [V * G + m * G, V * G, m * G, (V - m) * G * 2],
        f: u('N'),
        x: expl('equilíbrio: E = P + T', 'O empuxo para cima equilibra o peso e a tração do fio, ambos para baixo.', `E = ${V} × 10 = ${V * G} N; T = ${V * G} − ${num(m * G)} = ${num(T)} N.`),
      };
    },
    (r) => {
      const [dobj, P] = r.pick([[19.3, 19.3], [10.5, 21], [8, 16], [2.7, 5.4], [5, 10], [4, 8]]);
      const Pap = P - P / dobj;
      return {
        e: `Uma coroa pesa ${num(P)} N no ar e ${num(Pap)} N quando totalmente mergulhada em água (1 g/cm³). Qual é a densidade do material da coroa?`,
        r: dobj,
        d: [P / Pap, Pap / P, P - Pap, (P - Pap) / P],
        f: u('g/cm³'),
        x: expl('Arquimedes: d = P ÷ (P − P_aparente) × d_água', 'A perda de peso é o empuxo, que vale o peso de um volume de água igual ao da coroa.', `E = ${num(P)} − ${num(Pap)} = ${num(P - Pap)} N; d = ${num(P)} ÷ ${num(P - Pap)} × 1 = ${num(dobj)} g/cm³.`),
      };
    },
    (r) => {
      const P = r.pick([100, 200, 300, 400]);
      const [ang, cos] = r.pick([[60, 0.5], [37, 0.8], [53, 0.6], [0, 1]]);
      const T = P / (2 * cos);
      return {
        e: `Um quadro de ${P} N está pendurado por dois fios iguais, cada um formando ${ang}° com a vertical${ang === 37 ? ' (cos 37° = 0,8)' : ang === 53 ? ' (cos 53° = 0,6)' : ''}. Qual é a tração em cada fio?`,
        r: T,
        d: [P / 2, P, P * cos, (P / 2) * cos],
        f: u('N'),
        x: expl('equilíbrio vertical: 2·T·cos θ = P', 'Só as componentes verticais das trações sustentam o peso; quanto mais abertos os fios, maior a tração.', `T = ${P} ÷ (2 × ${num(cos)}) = ${num(T)} N.`),
      };
    },
    (r) => {
      const h1 = r.pick([1, 2, 3]), h2 = r.pick([2, 4, 5]);
      const p = 800 * G * h1 + 1000 * G * h2;
      return {
        e: `Um tanque tem ${h1} m de óleo (800 kg/m³) flutuando sobre ${h2} m de água (1 000 kg/m³). Qual é a pressão hidrostática no fundo? (g = 10 m/s²)`,
        r: p,
        d: [1000 * G * (h1 + h2), 800 * G * (h1 + h2), 1000 * G * h2, 900 * G * (h1 + h2)],
        f: u('Pa'),
        x: expl('líquidos em camadas: some as pressões', 'Cada camada contribui com d·g·h.', `800 × 10 × ${h1} + 1 000 × 10 × ${h2} = ${num(p)} Pa.`),
      };
    },
    (r) => {
      const d1 = r.pick([2, 4, 6]), k = r.pick([2, 3]), v1 = r.pick([1, 1.5, 2]);
      const v2 = v1 * k * k;
      return {
        e: `Água escoa num cano de ${d1 * k} cm de diâmetro a ${num(v1)} m/s e passa para um trecho de ${d1} cm de diâmetro. Qual é a velocidade nesse trecho mais fino?`,
        r: v2,
        d: [v1 * k, v1 / k, v1 / (k * k), v1 + k],
        f: u('m/s'),
        x: expl('continuidade: A₁·v₁ = A₂·v₂', 'A vazão é a mesma; a área depende do quadrado do diâmetro.', `diâmetro ${k} vezes menor → área ${k * k} vezes menor → v = ${num(v1)} × ${k * k} = ${num(v2)} m/s.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Termologia
const termo = [
  [
    (r) => {
      const F = r.pick([14, 50, 68, 86, 104, 122, 212, -4]);
      const C = ((F - 32) * 5) / 9;
      return {
        e: `Um termômetro marca ${F} °F. Qual é essa temperatura em graus Celsius?`,
        r: C,
        d: [F - 32, ((F + 32) * 5) / 9, (F * 9) / 5 + 32, (F - 32) / 1.8 + 10],
        f: u('°C'),
        x: expl('°F → °C: C = (F − 32) × 5/9', 'Tire o deslocamento de 32 e corrija o tamanho do grau (cada °C vale 1,8 °F).', `(${F} − 32) × 5/9 = ${num(C)} °C.`),
      };
    },
    (r) => {
      const [mat, c] = r.pick([['água', 1], ['alumínio', 0.22], ['ferro', 0.11], ['cobre', 0.09], ['óleo', 0.5]]);
      const m = r.pick([100, 200, 500]), dT = r.pick([10, 20, 40, 50]);
      const Q = m * c * dT;
      return {
        e: `Para aquecer ${m} g de ${mat} em ${dT} °C, foram necessárias ${num(Q)} cal. Qual é o calor específico do ${mat}?`,
        r: c,
        d: [Q / m, Q / dT, (m * dT) / Q, c * 10],
        f: u('cal/g·°C'),
        x: expl('Q = m·c·ΔT, isolando c', 'Divida o calor pela massa e pela variação de temperatura.', `c = ${num(Q)} ÷ (${m} × ${dT}) = ${num(c)} cal/g·°C.`),
      };
    },
    (r) => {
      const V0 = r.pick([1000, 2000, 5000]), alfa = r.pick([1e-5, 2e-5]), dT = r.pick([50, 100, 200]);
      const dV = V0 * 3 * alfa * dT;
      return {
        e: `Um bloco metálico de ${V0} cm³ tem coeficiente de dilatação linear ${alfa === 1e-5 ? '1,0' : '2,0'} × 10⁻⁵ °C⁻¹. Quanto o seu volume aumenta ao ser aquecido em ${dT} °C?`,
        r: dV,
        d: [V0 * alfa * dT, V0 * 2 * alfa * dT, dV * 10, V0 * 3 * alfa],
        f: u('cm³'),
        x: expl('dilatação volumétrica: ΔV = V₀·γ·ΔT, com γ = 3α', 'O volume dilata nas três dimensões, por isso o coeficiente é o triplo do linear.', `ΔV = ${V0} × 3 × ${num(alfa * 1e5)} × 10⁻⁵ × ${dT} = ${num(dV)} cm³.`),
      };
    },
    (r) => {
      const casos = [
        ['O gelo derrete numa bebida.', 'fusão'],
        ['Gotas aparecem do lado de fora de um copo gelado.', 'condensação'],
        ['A naftalina diminui de tamanho no armário, sem virar líquido.', 'sublimação'],
        ['A água de uma poça seca ao sol.', 'vaporização'],
        ['A água vira gelo no congelador.', 'solidificação'],
      ];
      const [sit, resp] = r.pick(casos);
      return {
        e: `${sit} Qual mudança de estado físico acontece?`,
        r: resp,
        d: ['fusão', 'condensação', 'sublimação', 'vaporização', 'solidificação'].filter((x) => x !== resp),
        x: expl('mudanças de estado', 'Fusão: sólido → líquido; solidificação: líquido → sólido; vaporização: líquido → gás; condensação: gás → líquido; sublimação: sólido → gás.', `Aqui é ${resp}.`),
      };
    },
    (r) => {
      const [t1, t2] = r.pick([[27, 127], [27, 77], [127, 327], [-73, 27], [27, 327]]);
      const V1 = r.pick([2, 3, 4, 6]);
      const V2 = (V1 * (t2 + 273)) / (t1 + 273);
      return {
        e: `Um gás ocupa ${V1} L a ${t1} °C. Aquecido a pressão constante até ${t2} °C, que volume passa a ocupar?`,
        r: V2,
        d: [(V1 * t2) / t1, (V1 * (t1 + 273)) / (t2 + 273), V1 + (t2 - t1) / 100, V1 * 2],
        f: u('L'),
        x: expl('transformação isobárica: V/T constante (T em kelvin)', 'Converta para kelvin antes de fazer a proporção; em °C a conta dá errado.', `${t1} °C = ${t1 + 273} K; ${t2} °C = ${t2 + 273} K; V₂ = ${V1} × ${t2 + 273} ÷ ${t1 + 273} = ${num(V2)} L.`),
      };
    },
    (r) => {
      const cal = r.pick([100, 250, 500, 1000, 2000]);
      return {
        e: `Uma quantidade de calor de ${cal} cal equivale a quantos joules? (1 cal = 4,2 J)`,
        r: cal * 4.2,
        d: [cal / 4.2, cal * 42, cal + 4.2, cal * 0.42],
        f: u('J'),
        x: expl('conversão: 1 cal = 4,2 J', 'Multiplique as calorias por 4,2.', `${cal} × 4,2 = ${num(cal * 4.2)} J.`),
      };
    },
  ],
  [
    (r) => {
      const [mat, k] = r.pick([['vidro', 0.8], ['tijolo', 0.6], ['madeira', 0.15]]);
      const A = r.pick([1, 2, 3]), dT = r.pick([10, 15, 20]), Lmm = r.pick([4, 5, 10, 20]);
      const fi = (k * A * dT) / (Lmm / 1000);
      return {
        e: `Uma placa de ${mat} (condutividade ${num(k)} W/m·°C) tem ${A} m² de área e ${Lmm} mm de espessura. A diferença de temperatura entre as faces é ${dT} °C. Qual é o fluxo de calor através dela?`,
        r: fi,
        d: [(k * A * dT) / Lmm, fi / 10, (k * dT) / (Lmm / 1000), fi * 2],
        f: u('W'),
        x: expl('lei de Fourier: Φ = k·A·ΔT/L', 'O fluxo cresce com a área e a diferença de temperatura e cai com a espessura (em metros).', `${num(k)} × ${A} × ${dT} ÷ ${num(Lmm / 1000, 3)} = ${num(fi)} W.`),
      };
    },
    (r) => {
      const L0 = r.pick([10, 20, 25, 50]), alfa = r.pick([1e-5, 1.2e-5, 2e-5, 2.5e-5]), folga = r.pick([3, 6, 12]);
      const dT = folga / 1000 / (L0 * alfa);
      if (!inteiro(dT)) {
        const dT2 = r.pick([20, 25, 40, 50]);
        const f2 = L0 * alfa * dT2 * 1000;
        return {
          e: `Trilhos de ${L0} m (α = ${num(alfa * 1e5)} × 10⁻⁵ °C⁻¹) são instalados com uma folga entre eles. Qual deve ser a folga mínima, em milímetros, para um aumento de temperatura de ${dT2} °C?`,
          r: f2,
          d: [f2 / 10, f2 * 10, L0 * dT2 * 1000 * 1e-6, f2 * 2],
          f: u('mm'),
          x: expl('dilatação linear: ΔL = L₀·α·ΔT', 'A folga precisa caber a dilatação do trilho.', `${L0} × ${num(alfa * 1e5)} × 10⁻⁵ × ${dT2} = ${num(f2 / 1000, 4)} m = ${num(f2)} mm.`),
        };
      }
      return {
        e: `Trilhos de ${L0} m (α = ${num(alfa * 1e5)} × 10⁻⁵ °C⁻¹) foram instalados com folga de ${folga} mm. Que aumento de temperatura fecha essa folga?`,
        r: dT,
        d: [dT * 10, dT / 10, folga / L0, dT * 2],
        f: u('°C'),
        x: expl('dilatação linear: ΔT = ΔL/(L₀·α)', 'A folga é a dilatação máxima permitida; converta mm para metros.', `${folga} mm = ${num(folga / 1000, 3)} m; ΔT = ${num(folga / 1000, 3)} ÷ (${L0} × ${num(alfa * 1e5)} × 10⁻⁵) = ${num(dT)} °C.`),
      };
    },
    (r) => {
      const n = r.pick([1, 2, 3, 4]), p = r.pick([1, 2, 3]), T = 300;
      const V = (n * 0.082 * T) / p;
      return {
        e: `Qual é o volume ocupado por ${n} mol de um gás ideal a ${p} atm e 27 °C? (R = 0,082 atm·L/mol·K)`,
        r: V,
        d: [(n * 0.082 * 27) / p, n * 0.082 * T * p, (0.082 * T) / (n * p), V * 2],
        f: u('L'),
        x: expl('equação de Clapeyron: p·V = n·R·T', 'Use a temperatura em kelvin (27 °C = 300 K).', `V = ${n} × 0,082 × 300 ÷ ${p} = ${num(V)} L.`),
      };
    },
    (r) => {
      const p1 = r.pick([2, 2.5, 3, 30, 32]), [t1, t2] = r.pick([[27, 87], [27, 57], [7, 77], [27, 127]]);
      const p2 = (p1 * (t2 + 273)) / (t1 + 273);
      return {
        e: `A pressão de um pneu é ${num(p1)} ${p1 > 10 ? 'psi' : 'atm'} a ${t1} °C. Depois de rodar, a temperatura do ar dentro dele chega a ${t2} °C. Supondo o volume constante, qual é a nova pressão?`,
        r: p2,
        d: [(p1 * t2) / t1, (p1 * (t1 + 273)) / (t2 + 273), p1 + (t2 - t1) / 10, p1],
        f: u(p1 > 10 ? 'psi' : 'atm'),
        x: expl('transformação isovolumétrica: p/T constante (T em kelvin)', 'Converta para kelvin e faça a proporção.', `p₂ = ${num(p1)} × ${t2 + 273} ÷ ${t1 + 273} = ${num(p2)} ${p1 > 10 ? 'psi' : 'atm'}.`),
      };
    },
    (r) => {
      const tau = r.pick([100, 200, 250, 400]), e = r.pick([2, 3, 4, 5]);
      return {
        e: `Uma geladeira com eficiência (coeficiente de desempenho) igual a ${e} recebe ${tau} J de trabalho do motor. Quanto calor ela retira do interior?`,
        r: e * tau,
        d: [tau / e, tau + e, e * tau + tau, tau],
        f: u('J'),
        x: expl('refrigerador: eficiência = Q retirado ÷ trabalho', 'Ao contrário do motor, a geladeira usa trabalho para tirar calor do lado frio; a eficiência pode ser maior que 1.', `Q = ${e} × ${tau} = ${e * tau} J.`),
      };
    },
    (r) => {
      const P = r.pick([4200, 5400, 6300, 8400]), litros = r.pick([3, 4, 6]);
      const vazao = litros / 60;
      const dT = P / (vazao * 4200);
      return {
        e: `Um chuveiro de ${P} W aquece água que passa a ${litros} L por minuto. Quanto a temperatura da água sobe? (c = 4 200 J/kg·°C; 1 L de água = 1 kg)`,
        r: dT,
        d: [P / (litros * 4200), (P * 60) / 4200, dT * 2, dT / 2],
        f: u('°C'),
        x: expl('potência = calor por segundo: P = (m/t)·c·ΔT', 'Converta a vazão para kg por segundo.', `Em 1 minuto, o chuveiro fornece ${P} × 60 J a ${litros} kg de água: ΔT = ${P} × 60 ÷ (${litros} × 4 200) = ${num(dT)} °C.`),
      };
    },
  ],
  [
    (r) => {
      const [p1, p2] = r.pick([[2, 5], [1, 4], [3, 6], [2, 6]]), [V1, V2] = r.pick([[1, 3], [2, 5], [1, 4]]);
      const tau = (p2 - p1) * 1e5 * ((V2 - V1) / 1000);
      return {
        e: `Um gás percorre um ciclo retangular no diagrama p × V, com pressões de ${p1} × 10⁵ Pa e ${p2} × 10⁵ Pa e volumes de ${V1} L e ${V2} L. Qual é o trabalho realizado num ciclo?`,
        r: tau,
        d: [p2 * 1e5 * ((V2 - V1) / 1000), (p2 - p1) * (V2 - V1), tau * 2, p1 * 1e5 * ((V2 - V1) / 1000)],
        f: u('J'),
        x: expl('trabalho no ciclo = área dentro da curva', 'No diagrama p × V, a área do retângulo é Δp × ΔV (com V em m³).', `(${p2} − ${p1}) × 10⁵ × (${V2} − ${V1}) × 10⁻³ = ${num(tau)} J.`),
      };
    },
    (r) => {
      const m = r.pick([200, 300, 400, 500]), T1 = r.pick([60, 80, 90]), C = r.pick([50, 100, 200]), T2 = r.pick([20, 25, 30]);
      const T = (m * T1 + C * T2) / (m + C);
      return {
        e: `${m} g de água a ${T1} °C são colocados num calorímetro de capacidade térmica ${C} cal/°C, que estava a ${T2} °C. Qual é a temperatura de equilíbrio? (c da água = 1 cal/g·°C; sem perdas)`,
        r: T,
        d: [(T1 + T2) / 2, (m * T1 + T2) / (m + 1), (m * T1 + C * T2) / m, T1 - T2],
        f: u('°C'),
        x: expl('calor cedido = calor recebido (o calorímetro também absorve)', 'm·c·(T₁ − T) = C·(T − T₂).', `T = (${m} × ${T1} + ${C} × ${T2}) ÷ (${m} + ${C}) = ${num(T)} °C.`),
      };
    },
    (r) => {
      const m = r.pick([100, 200, 400]), T = r.pick([20, 40, 60]);
      const gelo = (m * T) / 80;
      return {
        e: `Coloca-se uma grande quantidade de gelo a 0 °C em ${m} g de água a ${T} °C. Quando a água chega a 0 °C, ainda sobra gelo. Quanto gelo derreteu? (c da água = 1 cal/g·°C; L de fusão = 80 cal/g)`,
        r: gelo,
        d: [m, (m * T) / 540, gelo * 2, (m * 80) / T],
        f: u('g'),
        x: expl('calor cedido pela água = calor latente do gelo derretido', 'A água esfria até 0 °C e esse calor derrete parte do gelo: m·c·ΔT = m_gelo·L.', `${m} × 1 × ${T} = ${m * T} cal; ${m * T} ÷ 80 = ${num(gelo)} g.`),
      };
    },
    (r) => {
      const P = r.pick([1000, 1500, 2000]), m = r.pick([1, 2]), dT = r.pick([50, 75, 80]), t = r.pick([5, 6, 7, 8]);
      const eta = (m * 4200 * dT) / (P * t * 60);
      return {
        e: `Uma chaleira elétrica de ${P} W leva ${t} min para aquecer ${m} L de água em ${dT} °C. Qual é o seu rendimento, em porcentagem? (c = 4 200 J/kg·°C)`,
        r: eta * 100,
        d: [((m * 4200 * dT) / (P * t)) * 100, (1 - eta) * 100, eta * 50, Math.min(99, eta * 120)],
        f: (v) => `${num(v)}%`,
        x: expl('rendimento = energia útil ÷ energia gasta', 'A útil aquece a água (m·c·ΔT); a gasta é P·t, com t em segundos.', `útil = ${m} × 4 200 × ${dT} = ${num(m * 4200 * dT)} J; gasta = ${P} × ${t * 60} = ${num(P * t * 60)} J; η = ${num(eta * 100)}%.`),
      };
    },
    (r) => {
      const n = r.pick([1, 2, 3, 4]), T = r.pick([200, 300, 400]);
      const U = 1.5 * n * 8.3 * T;
      return {
        e: `Qual é a energia interna de ${n} mol de um gás ideal monoatômico a ${T} K? (R = 8,3 J/mol·K)`,
        r: U,
        d: [n * 8.3 * T, 2.5 * n * 8.3 * T, (U * 2) / 3 / 2, 3 * n * 8.3 * T],
        f: u('J'),
        x: expl('gás monoatômico: U = (3/2)·n·R·T', 'A energia interna do gás ideal depende só da temperatura.', `U = 1,5 × ${n} × 8,3 × ${T} = ${num(U)} J.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Eletricidade
const eletro = [
  [
    (r) => {
      const P = r.pick([100, 1000, 1500, 2000, 4000]), h = r.pick([1, 2, 4, 5]), dias = 30, tarifa = r.pick([0.6, 0.8, 1]);
      const kWh = (P / 1000) * h * dias, custo = kWh * tarifa;
      return {
        e: `Um aparelho de ${P} W fica ligado ${h} h por dia durante 30 dias. Com o kWh a R$ ${num(tarifa, 2)}, quanto custa esse uso?`,
        r: custo,
        d: [P * h * dias * tarifa, kWh, custo / dias, (P / 1000) * h * tarifa, custo * 2, custo / 2],
        f: (v) => `R$ ${num(v, 2)}`,
        x: expl('energia em kWh × tarifa', 'Converta a potência para kW, multiplique pelas horas e depois pelo preço.', `${num(P / 1000)} kW × ${h} h × 30 = ${num(kWh)} kWh; × R$ ${num(tarifa, 2)} = R$ ${num(custo, 2)}.`),
      };
    },
    (r) => {
      const U = r.pick([127, 220]);
      const ap = r.sample([['chuveiro', 5500], ['micro-ondas', 1100], ['ferro de passar', 1000], ['geladeira', 220], ['televisor', 110], ['ar-condicionado', 1320]], 2);
      const Ptot = ap[0][1] + ap[1][1], i = Ptot / U;
      return {
        e: `Numa casa de ${U} V, ligam-se ao mesmo tempo um ${ap[0][0]} (${ap[0][1]} W) e um ${ap[1][0]} (${ap[1][1]} W). Qual é a corrente total no circuito?`,
        r: i,
        d: [Ptot / (U === 127 ? 220 : 127), ap[0][1] / U, Ptot / (2 * U), Ptot / 100],
        f: u('A'),
        x: expl('aparelhos em paralelo: some as potências; i = P/U', 'A corrente total é a soma das correntes, ou a potência total dividida pela tensão.', `${Ptot} ÷ ${U} = ${num(i)} A.`),
      };
    },
    (r) => {
      const R = r.pick([10, 12, 20, 30, 60, 100]), n = r.pick([2, 3, 4, 5]);
      return {
        e: `${n} resistores iguais, de ${R} Ω cada, são ligados em paralelo. Qual é a resistência equivalente?`,
        r: R / n,
        d: [R * n, R, R / (2 * n), R + n],
        f: u('Ω'),
        x: expl('n resistores iguais em paralelo: R/n', 'Em paralelo, a corrente ganha mais caminhos, e a resistência total cai.', `${R} ÷ ${n} = ${num(R / n)} Ω.`),
      };
    },
    (r) => {
      const [q1, q2] = ate(() => [r.pick([8, 6, 10, -4, 12]), r.pick([-2, 0, 4, -6, 2])], ([a, b]) => (a + b) % 2 === 0 && a !== b);
      const qf = (q1 + q2) / 2;
      return {
        e: `Duas esferas metálicas idênticas, com cargas de ${q1} μC e ${q2} μC, são encostadas e depois separadas. Com que carga fica cada uma?`,
        r: qf,
        d: [q1 + q2, q1 - q2, (q1 - q2) / 2, q1],
        f: u('μC'),
        x: expl('contato entre esferas iguais: a carga total se divide igualmente', 'A carga total se conserva e, como as esferas são iguais, cada uma fica com metade.', `(${q1} + ${q2 < 0 ? `(${q2})` : q2}) ÷ 2 = ${num(qf)} μC.`),
      };
    },
    (r) => {
      const R = r.pick([5, 10, 20, 50]), i = r.pick([2, 3, 4, 5]);
      return {
        e: `Uma corrente de ${i} A percorre um resistor de ${R} Ω. Qual é a potência dissipada?`,
        r: R * i * i,
        d: [R * i, (R * i) / 2, R / i, R * i * i * 2, (R * i * i) / 2],
        f: u('W'),
        x: expl('efeito Joule: P = R·i²', 'Também dá para fazer U = R·i e depois P = U·i.', `P = ${R} × ${i}² = ${R * i * i} W.`),
      };
    },
    (r) => {
      const P = r.pick([10, 20, 40, 50, 100, 200]);
      return {
        e: `Por quantas horas uma lâmpada de ${P} W precisa ficar acesa para consumir 1 kWh?`,
        r: 1000 / P,
        d: [P / 1000, P, 1000 * P, 100 / P],
        f: u('h'),
        x: expl('E = P·Δt, isolando o tempo', '1 kWh = 1 000 Wh; divida pela potência.', `1 000 ÷ ${P} = ${num(1000 / P)} h.`),
      };
    },
  ],
  [
    (r) => {
      const mAh = r.pick([2000, 3000, 4000, 5000]), U = r.pick([3.7, 3.8]);
      const Wh = (mAh / 1000) * U;
      return {
        e: `A bateria de um celular tem ${mAh} mAh e ${num(U)} V. Quanta energia ela armazena, em watt-hora?`,
        r: Wh,
        d: [mAh * U, mAh / U, (mAh / 1000) / U, Wh * 3600],
        f: u('Wh'),
        x: expl('energia = tensão × carga (em Ah)', 'mAh é carga; multiplicando pela tensão, obtém-se energia em Wh.', `${num(mAh / 1000)} Ah × ${num(U)} V = ${num(Wh)} Wh.`),
      };
    },
    (r) => {
      const C = r.pick([2, 5, 10, 20, 100]), U = r.pick([6, 9, 12, 50]);
      return {
        e: `Um capacitor de ${C} μF é ligado a uma bateria de ${U} V. Que carga ele armazena?`,
        r: C * U,
        d: [C / U, U / C, (C * U * U) / 2, C + U],
        f: u('μC'),
        x: expl('capacitor: Q = C·U', 'A carga é proporcional à tensão; a constante é a capacitância.', `Q = ${C} μF × ${U} V = ${C * U} μC.`),
      };
    },
    (r) => {
      const q = r.pick([2, 3, 4, 5]), E = r.pick([1000, 2000, 5000, 10000]);
      const F = q * 1e-6 * E;
      return {
        e: `Uma carga de ${q} μC é colocada num ponto onde o campo elétrico vale ${num(E)} N/C. Qual é a força elétrica sobre ela?`,
        r: F,
        d: [F * 10, F / 10, F * 100, F / 2],
        f: (v) => `${num(v, 3)} N`,
        x: expl('campo elétrico: F = q·E', 'O campo é força por unidade de carga; converta μC para C.', `F = ${q} × 10⁻⁶ × ${num(E)} = ${num(F, 3)} N.`),
      };
    },
    (r) => {
      const Q = r.pick([1, 2, 3, 4, 6]), d = r.pick([0.1, 0.2, 0.3, 0.5, 0.9]);
      const V = (9e9 * Q * 1e-6) / d;
      return {
        e: `Qual é o potencial elétrico a ${num(d)} m de uma carga puntiforme de ${Q} μC, no vácuo? (k = 9 × 10⁹ N·m²/C²)`,
        r: V,
        d: [V / d, V * d, (9e9 * Q) / d, V * 2],
        f: u('V'),
        x: expl('potencial de carga puntiforme: V = k·Q/d', 'Diferente do campo, o potencial cai com d (não com d²).', `V = 9 × 10⁹ × ${Q} × 10⁻⁶ ÷ ${num(d)} = ${num(V)} V.`),
      };
    },
    (r) => {
      const Ec = r.pick([6, 9, 12, 24]), rr = r.pick([1, 2, 3]), i = r.pick([1, 2, 3]);
      const U = Ec + rr * i;
      return {
        e: `Um motor elétrico tem força contraeletromotriz de ${Ec} V e resistência interna de ${rr} Ω. Ligado, é percorrido por ${i} A. Qual é a tensão nos seus terminais?`,
        r: U,
        d: [Ec - rr * i, Ec, rr * i, Ec * i],
        f: u('V'),
        x: expl('receptor: U = E\' + r\'·i', 'No motor (receptor), a tensão aplicada vence a força contraeletromotriz e a queda na resistência interna.', `U = ${Ec} + ${rr} × ${i} = ${U} V.`),
      };
    },
    (r) => {
      const i1 = r.pick([2, 3, 4, 5]), i2 = r.pick([1, 2, 6]), it = i1 + i2 + r.pick([1, 3, 4]);
      return {
        e: `Num nó de um circuito chegam ${it} A. Saem dele três fios: um com ${i1} A, outro com ${i2} A. Qual é a corrente no terceiro fio?`,
        r: it - i1 - i2,
        d: [it, i1 + i2, it + i1 + i2, it - i1],
        f: u('A'),
        x: expl('lei dos nós (1ª lei de Kirchhoff)', 'A carga não se acumula no nó: o que entra é igual ao que sai.', `${it} − ${i1} − ${i2} = ${it - i1 - i2} A.`),
      };
    },
  ],
  [
    (r) => {
      const E = r.pick([6, 12, 24]), rr = r.pick([0.5, 1, 2]);
      const Pmax = (E * E) / (4 * rr);
      return {
        e: `Um gerador tem força eletromotriz de ${E} V e resistência interna de ${num(rr)} Ω. Qual é a potência máxima que ele pode entregar a um circuito externo?`,
        r: Pmax,
        d: [(E * E) / rr, E / rr, (E * E) / (2 * rr), E * E * 2, E / (4 * rr), (E * E) / (8 * rr)],
        f: u('W'),
        x: expl('máxima transferência: R externa = r', 'A potência útil é máxima quando a resistência externa iguala a interna; então i = E/2r e P = E²/4r.', `P = ${E}² ÷ (4 × ${num(rr)}) = ${num(Pmax)} W.`),
      };
    },
    (r) => {
      const i = r.pick([2, 5, 10, 20]), dcm = r.pick([2, 4, 5, 10]);
      const B = (2e-7 * i) / (dcm / 100);
      return {
        e: `Um fio longo e retilíneo é percorrido por ${i} A. Qual é a intensidade do campo magnético a ${dcm} cm dele? (μ₀ = 4π × 10⁻⁷ T·m/A)`,
        r: B * 1e6,
        d: [((2e-7 * i) / dcm) * 1e6, ((4e-7 * i) / (dcm / 100)) * 1e6, B * 1e5, ((2e-7 * i * (dcm / 100))) * 1e6],
        f: (v) => `${num(v)} × 10⁻⁶ T`,
        x: expl('campo de fio retilíneo: B = μ₀·i/(2π·d)', 'Com μ₀ = 4π × 10⁻⁷, a fórmula vira B = 2 × 10⁻⁷ · i/d (d em metros).', `B = 2 × 10⁻⁷ × ${i} ÷ ${num(dcm / 100)} = ${num(B * 1e6)} × 10⁻⁶ T.`),
      };
    },
    (r) => {
      const q = r.pick([1, 2, 4]), v = r.pick([1e5, 2e5, 5e5]), B = r.pick([0.1, 0.2, 0.5]);
      const F = q * 1e-6 * v * B;
      return {
        e: `Uma partícula com carga de ${q} μC entra, a ${num(v / 1e5)} × 10⁵ m/s, perpendicularmente a um campo magnético de ${num(B)} T. Qual é a força magnética sobre ela?`,
        r: F,
        d: [q * v * B, F / B, F * 10, F / 2],
        f: u('N'),
        x: expl('força magnética: F = q·v·B·sen θ', 'Perpendicular, sen 90° = 1; converta μC para C.', `F = ${q} × 10⁻⁶ × ${num(v)} × ${num(B)} = ${num(F, 3)} N.`),
      };
    },
    (r) => {
      const E = r.pick([12, 20, 24, 50]), rr = r.pick([0.5, 1, 2]), i = r.pick([1, 2, 4]);
      const U = E - rr * i, eta = U / E;
      return {
        e: `Um gerador de força eletromotriz ${E} V e resistência interna ${num(rr)} Ω fornece ${i} A a um circuito. Qual é o seu rendimento, em porcentagem?`,
        r: eta * 100,
        d: [((rr * i) / E) * 100, (E / U) * 100, ((E - i) / E) * 100, 100],
        f: (v) => `${num(v)}%`,
        x: expl('rendimento do gerador: η = U/E', 'Parte da energia se perde dentro do próprio gerador; a tensão útil é U = E − r·i.', `U = ${E} − ${num(rr)} × ${i} = ${num(U)} V; η = ${num(U)} ÷ ${E} = ${num(eta * 100)}%.`),
      };
    },
    (r) => {
      const C = r.pick([10, 20, 50, 100]), U = r.pick([10, 20, 100]);
      const E = (C * 1e-6 * U * U) / 2;
      return {
        e: `Que energia fica armazenada num capacitor de ${C} μF carregado com ${U} V?`,
        r: E,
        d: [C * 1e-6 * U * U, E / 10, E * 10, E / 2],
        f: (v) => `${num(v, 3)} J`,
        x: expl('energia no capacitor: E = C·U²/2', 'Converta μF para F.', `E = ${C} × 10⁻⁶ × ${U}² ÷ 2 = ${num(E, 3)} J.`),
      };
    },
  ],
];

// ------------------------------------------------------------- Ondulatória e óptica
const ondas = [
  [
    (r) => {
      const v = r.pick([1, 1.5, 2, 3]);
      return {
        e: `${nome(r)} caminha a ${num(v)} m/s em direção a um espelho plano parado. Com que velocidade a sua imagem se aproxima dele (de quem caminha)?`,
        r: 2 * v,
        d: [v, v / 2, 0, 3 * v],
        f: u('m/s'),
        x: expl('espelho plano: imagem simétrica', 'A imagem se aproxima do espelho com a mesma velocidade da pessoa, do outro lado; em relação à pessoa, as velocidades se somam.', `${num(v)} + ${num(v)} = ${num(2 * v)} m/s.`),
      };
    },
    (r) => {
      const H = r.pick([1.5, 1.6, 1.7, 1.8, 1.9]);
      return {
        e: `Uma pessoa de ${num(H)} m de altura quer se ver de corpo inteiro num espelho plano vertical. Qual é a altura mínima do espelho?`,
        r: H / 2,
        d: [H, H / 4, 2 * H, H - 0.1],
        f: u('m'),
        x: expl('espelho plano: metade da altura', 'Pela semelhança de triângulos (olho, imagem e espelho), basta um espelho com metade da altura, bem posicionado, não importa a distância.', `${num(H)} ÷ 2 = ${num(H / 2)} m.`),
      };
    },
    (r) => {
      const n = r.pick([20, 30, 40, 50, 60]), t = r.pick([10, 20, 40]);
      return {
        e: `Um pêndulo completa ${n} oscilações em ${t} s. Qual é a sua frequência?`,
        r: n / t,
        d: [t / n, n * t, n / (2 * t), n],
        f: u('Hz'),
        x: expl('frequência = número de oscilações ÷ tempo', 'Hertz é oscilações por segundo.', `${n} ÷ ${t} = ${num(n / t)} Hz.`),
      };
    },
    (r) => {
      const k = r.pick([1, 2, 3, 4]);
      return {
        e: `O nível sonoro de uma música passa de 60 dB para ${60 + 10 * k} dB. Quantas vezes a intensidade sonora aumentou?`,
        r: 10 ** k,
        d: [k, 10 * k, 2 ** k, 10 ** (k + 1), 10 * k * k],
        f: (v) => `${num(v)} vezes`,
        x: expl('decibel: escala logarítmica', 'Cada +10 dB multiplica a intensidade por 10.', `+${10 * k} dB → 10${k === 1 ? '' : '^' + k} = ${num(10 ** k)} vezes.`.replace('^2', '²').replace('^3', '³').replace('^4', '⁴')),
      };
    },
    (r) => {
      const [onde, d] = r.pick([['do Sol à Terra', 1.5e11], ['da Lua à Terra', 3.84e8], ['de Marte à Terra (numa aproximação)', 7.5e10]]);
      const t = d / 3e8;
      return {
        e: `A distância ${onde} é de cerca de ${onde.includes('Sol') ? '1,5 × 10¹¹' : onde.includes('Lua') ? '3,84 × 10⁸' : '7,5 × 10¹⁰'} m. Quanto tempo a luz leva para percorrê-la? (c = 3 × 10⁸ m/s)`,
        r: t,
        d: [t * 60, t / 60, t * 2, t / 2],
        f: u('s'),
        x: expl('t = d/c', 'A luz anda 300 mil km por segundo.', `t = ${num(d / 1e8)} × 10⁸ ÷ (3 × 10⁸) = ${num(t)} s.`),
      };
    },
    (r) => {
      const H = r.pick([3, 6, 9, 12, 15]), d = r.pick([10, 20, 30]), dl = r.pick([0.1, 0.2, 0.3]);
      const h = (H * dl) / d;
      return {
        e: `Numa câmara escura de orifício, a imagem de uma árvore de ${H} m, que está a ${d} m do orifício, se forma a ${num(dl * 100)} cm dele. Qual é a altura da imagem, em centímetros?`,
        r: h * 100,
        d: [((H * d) / dl) / 100, H * dl * 100, (h * 100) / 2, (H / d) * 10],
        f: u('cm'),
        x: expl('câmara escura: semelhança de triângulos', 'A luz anda em linha reta: imagem/objeto = distância da imagem/distância do objeto.', `h = ${H} × ${num(dl)} ÷ ${d} = ${num(h, 3)} m = ${num(h * 100)} cm.`),
      };
    },
  ],
  [
    (r) => {
      const [m1, n1, m2, n2] = r.pick([['ar', 1, 'água', 1.33], ['água', 1.33, 'vidro', 1.5], ['ar', 1, 'vidro', 1.5], ['ar', 1, 'diamante', 2.4], ['água', 1.2, 'acrílico', 1.5]]);
      const v1 = 3e8 / n1, v2 = 3e8 / n2;
      return {
        e: `A luz passa do ${m1} (n = ${num(n1)}) para o ${m2} (n = ${num(n2)}). Qual é a razão entre a velocidade da luz no ${m1} e no ${m2}?`,
        r: v1 / v2,
        d: [v2 / v1, n1 * n2, n2 - n1, 1],
        x: expl('índice de refração e velocidade: v₁/v₂ = n₂/n₁', 'Quanto maior o índice, mais lenta a luz.', `v₁/v₂ = ${num(n2)} ÷ ${num(n1)} = ${num(v1 / v2)}.`),
      };
    },
    (r) => {
      const h = r.pick([1.2, 2, 2.4, 3, 4]);
      const ha = (h * 1) / (4 / 3);
      return {
        e: `Uma moeda está no fundo de uma piscina de ${num(h)} m de profundidade. Para quem olha de cima, quase na vertical, a que profundidade ela parece estar? (n da água = 4/3; n do ar = 1)`,
        r: ha,
        d: [h * (4 / 3), h, h / 2, h - 0.5],
        f: u('m'),
        x: expl('profundidade aparente: h\' = h·n(observador)/n(objeto)', 'A refração faz o fundo parecer mais raso.', `h' = ${num(h)} × 1 ÷ (4/3) = ${num(ha)} m.`),
      };
    },
    (r) => {
      const L = r.pick([0.1, 0.4, 0.9, 1.6, 2.5]);
      const T = 2 * 3.14 * Math.sqrt(L / G);
      return {
        e: `Qual é o período de um pêndulo simples de ${num(L)} m de comprimento, em pequenas oscilações? (g = 10 m/s²; π = 3,14)`,
        r: T,
        d: [3.14 * Math.sqrt(L / G), 2 * 3.14 * (L / G), 2 * 3.14 * Math.sqrt(G / L), T * 2],
        f: u('s'),
        x: expl('pêndulo simples: T = 2π·√(L/g)', 'O período não depende da massa nem (para ângulos pequenos) da amplitude.', `T = 2 × 3,14 × √(${num(L)}/10) = 6,28 × ${num(Math.sqrt(L / G))} = ${num(T)} s.`),
      };
    },
    (r) => {
      const lam = r.pick([0.4, 0.6, 0.8, 1.2, 2]);
      return {
        e: `Numa corda vibrando em onda estacionária, o comprimento de onda é ${num(lam)} m. Qual é a distância entre dois nós consecutivos?`,
        r: lam / 2,
        d: [lam, lam / 4, 2 * lam, (3 * lam) / 4],
        f: u('m'),
        x: expl('onda estacionária: nós a cada λ/2', 'Entre dois nós seguidos há meio comprimento de onda (um "ventre").', `${num(lam)} ÷ 2 = ${num(lam / 2)} m.`),
      };
    },
    (r) => {
      const [T, mu] = r.pick([[100, 0.01], [400, 0.01], [400, 0.04], [900, 0.04], [900, 0.25], [160, 0.1]]);
      const v = Math.sqrt(T / mu);
      return {
        e: `Uma corda com densidade linear de ${num(mu)} kg/m é tracionada com ${T} N. Qual é a velocidade das ondas nela?`,
        r: v,
        d: [T / mu, T * mu, Math.sqrt(mu / T), v / 2],
        f: u('m/s'),
        x: expl('velocidade na corda: v = √(T/μ)', 'Corda mais tensa e mais leve conduz ondas mais rápidas.', `v = √(${T} ÷ ${num(mu)}) = √${num(T / mu)} = ${num(v)} m/s.`),
      };
    },
  ],
  [
    (r) => {
      const pr = r.pick([25, 40, 50, 100, 200]);
      const V = -100 / pr;
      return {
        e: `Uma pessoa míope não enxerga com nitidez objetos além de ${pr} cm. Qual é a vergência da lente que corrige a sua visão para longe?`,
        r: V,
        d: [-V, -pr / 100, 100 / (pr * 2), V * 2],
        f: (v) => `${num(v)} di`,
        x: expl('miopia: lente divergente com foco no ponto remoto', 'A lente deve formar, de objetos muito distantes, uma imagem no ponto remoto: f = −(ponto remoto).', `f = −${num(pr / 100)} m; V = 1/f = ${num(V)} di.`),
      };
    },
    (r) => {
      const pp = r.pick([50, 100, 40, 200]);
      const V = 1 / 0.25 - 1 / (pp / 100);
      return {
        e: `Uma pessoa hipermetrope tem ponto próximo a ${pp} cm. Qual é a vergência da lente que lhe permite ler a 25 cm?`,
        r: V,
        d: [-V, 1 / 0.25, 1 / (pp / 100), 1 / 0.25 + 1 / (pp / 100), V * 2],
        f: (v) => `${num(v)} di`,
        x: expl('hipermetropia: lente convergente (equação de Gauss)', 'O livro a 25 cm deve ter imagem virtual no ponto próximo: 1/f = 1/0,25 − 1/PP.', `V = 4 − 1/${num(pp / 100)} = ${num(V)} di.`),
      };
    },
    (r) => {
      const k = r.pick([3, 4, 5, 6, 7, 8]);
      return {
        e: `Uma onda sonora tem intensidade de 10⁻${k} W/m². Qual é o seu nível sonoro? (I₀ = 10⁻¹² W/m²)`.replace('10⁻' + k, '10' + { 3: '⁻³', 4: '⁻⁴', 5: '⁻⁵', 6: '⁻⁶', 7: '⁻⁷', 8: '⁻⁸' }[k]),
        r: 10 * (12 - k),
        d: [12 - k, 10 * k, 10 * (12 + k), 10 * (12 - k) / 2],
        f: u('dB'),
        x: expl('nível sonoro: β = 10·log(I/I₀)', `I/I₀ = 10${sup(12 - k)}, cujo logaritmo é ${12 - k}.`, `β = 10 × ${12 - k} = ${10 * (12 - k)} dB.`),
      };
    },
    (r) => {
      const fob = r.pick([60, 90, 100, 120, 150]), foc = r.pick([2, 3, 5, 6]);
      return {
        e: `Uma luneta astronômica tem objetiva de distância focal ${fob} cm e ocular de ${foc} cm. Qual é o seu aumento angular?`,
        r: fob / foc,
        d: [foc / fob, fob * foc, fob + foc, fob - foc],
        f: (v) => `${num(v)} vezes`,
        x: expl('luneta: aumento = f(objetiva)/f(ocular)', 'A objetiva longa forma a imagem e a ocular curta a amplia.', `${fob} ÷ ${foc} = ${num(fob / foc)} vezes.`),
      };
    },
    (r) => {
      const lam1 = r.pick([600, 480, 450, 540]), n2 = r.pick([1.2, 1.5]);
      const lam2 = lam1 / n2;
      return {
        e: `Uma luz de ${lam1} nm no ar (n = 1) entra num vidro de índice ${num(n2)}. Qual é o comprimento de onda dentro do vidro?`,
        r: lam2,
        d: [lam1 * n2, lam1, lam1 - n2 * 100, lam2 / 2],
        f: u('nm'),
        x: expl('refração: a frequência não muda, o comprimento de onda sim', 'v = λ·f e a velocidade cai pelo fator n; então λ também cai pelo fator n.', `λ = ${lam1} ÷ ${num(n2)} = ${num(lam2)} nm.`),
      };
    },
  ],
];

export default { cinematica, dinamica, energia, hidro, termo, eletro, ondas };
