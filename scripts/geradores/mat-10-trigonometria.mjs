// Matemática — Trigonometria.
import { arred, expl, fracao, num } from './util.mjs';
import NOVOS from './mat-novos-extras.mjs';
import { novos } from './util.mjs';

const TRIG = {
  sen: { 30: '1/2', 45: '√2/2', 60: '√3/2' },
  cos: { 30: '√3/2', 45: '√2/2', 60: '1/2' },
  tg: { 30: '√3/3', 45: '1', 60: '√3' },
};
const TRIPLAS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
const m = (v) => `${num(v)} m`;
const cm = (v) => `${num(v)} cm`;
const grau = (v) => `${num(v)}°`;
const raizK = (k, rad) => `${k === 1 ? '' : num(k)}√${rad}`;

const facil = [
  // 1. tabela dos notáveis
  (r) => {
    const f = r.pick(['sen', 'cos', 'tg']), ang = r.pick([30, 45, 60]);
    const certo = TRIG[f][ang];
    const todos = ['1/2', '√2/2', '√3/2', '√3/3', '1', '√3', '2', '0'];
    return {
      e: `Qual é o valor de ${f} ${ang}°?`,
      r: certo,
      d: r.shuffle(todos.filter((v) => v !== certo)),
      x: expl('tabela dos ângulos notáveis', 'Seno de 30°, 45°, 60°: 1/2, √2/2, √3/2 (o numerador "cresce"). Cosseno é a mesma lista ao contrário. Tangente = seno ÷ cosseno.', `${f} ${ang}° = ${certo}.`),
    };
  },
  // 2. cateto oposto a 30°
  (r) => {
    const h = r.int(2, 30) * 2;
    return {
      e: `Em um triângulo retângulo, a hipotenusa mede ${h} cm e um dos ângulos agudos mede 30°. Quanto mede o cateto oposto a esse ângulo?`,
      r: h / 2,
      d: [h * 2, h, h / 3, h / 4],
      f: cm,
      x: expl('seno no triângulo retângulo', 'sen = cateto oposto ÷ hipotenusa.', `sen 30° = 1/2 = x/${h} ⇒ x = ${h / 2} cm.`),
    };
  },
  // 3. graus → radianos
  (r) => {
    const [g, rad] = r.pick([[30, 'π/6'], [45, 'π/4'], [60, 'π/3'], [120, '2π/3'], [135, '3π/4'], [150, '5π/6'], [210, '7π/6'], [270, '3π/2'], [300, '5π/3']]);
    const todos = ['π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '3π/2', '5π/3', '2π'];
    return {
      e: `Quanto vale ${g}° em radianos?`,
      r: rad,
      d: r.shuffle(todos.filter((v) => v !== rad)),
      x: expl('regra de três com π = 180°', 'Meia volta é 180° ou π radianos.', `${g}° = (${g}/180)π = ${rad} rad.`),
    };
  },
  // 4. altura da rampa
  (r) => {
    const comp = r.int(2, 20) * 2;
    return {
      e: `Uma rampa reta de ${comp} m de comprimento forma um ângulo de 30° com o chão. Qual é a altura que ela atinge?`,
      r: comp / 2,
      d: [comp, comp / 4, comp * 2, comp / 3],
      f: m,
      x: expl('seno', 'A rampa é a hipotenusa; a altura é o cateto oposto ao ângulo com o chão.', `${comp} × sen 30° = ${comp} × 1/2 = ${comp / 2} m.`),
    };
  },
  // 5. quadrante e sinal
  (r) => {
    const [a, sinal, f] = r.pick([[150, 'positivo', 'sen'], [120, 'negativo', 'cos'], [210, 'negativo', 'sen'], [300, 'positivo', 'cos'], [240, 'positivo', 'tg'], [330, 'negativo', 'tg'], [100, 'negativo', 'cos'], [200, 'negativo', 'sen']]);
    const q = a < 90 ? 1 : a < 180 ? 2 : a < 270 ? 3 : 4;
    return {
      e: `O ângulo de ${a}° está em qual quadrante, e qual é o sinal de ${f} ${a}°?`,
      r: `${q}º quadrante; ${sinal}`,
      d: [`${q}º quadrante; ${sinal === 'positivo' ? 'negativo' : 'positivo'}`, `${(q % 4) + 1}º quadrante; ${sinal}`, `${((q + 2) % 4) + 1}º quadrante; ${sinal === 'positivo' ? 'negativo' : 'positivo'}`, `${((q + 1) % 4) + 1}º quadrante; ${sinal}`],
      x: expl('sinais no ciclo', 'Seno é a "altura" (y) e cosseno é o "lado" (x) no ciclo. 1º: tudo +; 2º: só seno +; 3º: só tangente +; 4º: só cosseno +.', `${a}° está no ${q}º quadrante; ${f} ${a}° é ${sinal}.`),
    };
  },
  // 6. cateto adjacente a 60°
  (r) => {
    const c = r.int(2, 10) * 2;
    return {
      e: `Uma escada de ${c} m está apoiada em uma parede e forma um ângulo de 60° com o chão. A que distância da parede está o pé da escada?`,
      r: c / 2,
      d: [c, c * 2, c / 4, arred((c * 1.73) / 2, 2)],
      f: m,
      x: expl('cosseno', 'cos = cateto adjacente ÷ hipotenusa. O pé da escada está no lado adjacente ao ângulo com o chão.', `${c} × cos 60° = ${c} × 1/2 = ${c / 2} m.`),
    };
  },
  // 7. relação fundamental
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    return {
      e: `Sabendo que sen x = ${a}/${c} e que x é um ângulo agudo, qual é o valor de cos x?`,
      r: fracao(b, c),
      d: [fracao(c - a, c), fracao(a, b), fracao(c, a), fracao(b, a)],
      x: expl('relação fundamental', 'sen²x + cos²x = 1 (é o teorema de Pitágoras no círculo).', `cos²x = 1 − ${a * a}/${c * c} = ${b * b}/${c * c} ⇒ cos x = ${b}/${c}.`),
    };
  },
  // 8. sol a 45°
  (r) => {
    const s = r.int(4, 25);
    return {
      e: `Em certo horário, os raios de sol chegam ao chão formando um ângulo de 45° com a horizontal. Uma árvore projeta uma sombra de ${s} m. Qual é a altura da árvore?`,
      r: s,
      d: [s / 2, s * 2, arred(s * 1.41, 2), arred(s * 1.73, 2)],
      f: m,
      x: expl('tangente', 'tg = cateto oposto (altura) ÷ cateto adjacente (sombra). Como tg 45° = 1, altura = sombra.', `h = ${s} × 1 = ${s} m.`),
    };
  },
  // 9. radianos → graus
  (r) => {
    const [rad, g] = r.pick([['π/6', 30], ['π/5', 36], ['2π/3', 120], ['3π/4', 135], ['5π/6', 150], ['4π/3', 240], ['7π/4', 315], ['π/9', 20]]);
    return {
      e: `Um ângulo mede ${rad} radianos. Quanto ele mede em graus?`,
      r: g,
      d: [g * 2, 180 - g, g / 2, 360 - g],
      f: grau,
      x: expl('trocar π por 180°', 'Basta substituir π por 180° e fazer a conta.', `${rad} = ${rad.replace('π', '180°')} = ${g}°.`),
    };
  },
  // 10. valores nos eixos
  (r) => {
    const opcoes = [
      ['sen 90° + cos 180°', 0, '1 + (−1)'],
      ['cos 0° − sen 270°', 2, '1 − (−1)'],
      ['sen 180° + cos 90°', 0, '0 + 0'],
      ['2·sen 90° + cos 0°', 3, '2 · 1 + 1'],
      ['cos 180° − sen 90°', -2, '−1 − 1'],
      ['sen 270° · cos 180°', 1, '(−1) · (−1)'],
    ];
    const [txt, v, conta] = r.pick(opcoes);
    return {
      e: `Qual é o valor de ${txt}?`,
      r: v,
      d: [v + 1, v - 1, -v === v ? 2 : -v, v + 2, v - 2],
      x: expl('pontos do ciclo nos eixos', 'Em 0°, 90°, 180° e 270° o ponto do ciclo está sobre os eixos: (1, 0), (0, 1), (−1, 0) e (0, −1). O cosseno é o x e o seno é o y.', `${conta} = ${v}.`),
    };
  },
  // 11. seno do menor ângulo
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    return {
      e: `Um triângulo retângulo tem catetos de ${a} cm e ${b} cm. Qual é o seno do menor ângulo agudo?`,
      r: fracao(Math.min(a, b), c),
      d: [fracao(Math.max(a, b), c), fracao(Math.min(a, b), Math.max(a, b)), fracao(c, Math.min(a, b)), fracao(Math.max(a, b), Math.min(a, b))],
      x: expl('menor ângulo fica em frente ao menor lado', 'Calcule a hipotenusa e use sen = oposto ÷ hipotenusa.', `Hipotenusa ${c}. O menor ângulo é oposto ao cateto ${Math.min(a, b)}: sen = ${fracao(Math.min(a, b), c)}.`),
    };
  },
  // 12. ângulo dos ponteiros
  (r) => {
    const h = r.pick([1, 2, 3, 4, 5, 7, 8, 10, 11]);
    const ang = Math.min(30 * h, 360 - 30 * h);
    return {
      e: `Qual é o menor ângulo formado pelos ponteiros de um relógio às ${h} horas em ponto?`,
      r: ang,
      d: [360 - ang, ang + 30, ang / 2, 6 * h],
      f: grau,
      x: expl('dividir a volta em 12', 'O mostrador tem 12 "fatias" de 360° ÷ 12 = 30°.', `Às ${h}h, os ponteiros estão ${Math.min(h, 12 - h)} fatias distantes: ${Math.min(h, 12 - h)} × 30° = ${ang}°.`),
    };
  },
];
facil[0].vezes = 2;
facil[2].vezes = 2;
facil[6].vezes = 2;
facil[9].vezes = 2;

const medio = [
  // 1. altura do prédio (tg 60°)
  (r) => {
    const d = r.int(5, 40) * 2;
    return {
      e: `Uma pessoa está a ${d} m da base de um prédio e vê o topo sob um ângulo de 60° com a horizontal. Desprezando a altura da pessoa, qual é a altura aproximada do prédio? (Use √3 = 1,73.)`,
      r: arred(d * 1.73, 2),
      d: [arred(d / 1.73, 2), d * 2, arred((d * 1.73) / 2, 2), arred(d * 1.41, 2)],
      f: m,
      x: expl('tangente', 'Conhecemos o cateto adjacente (distância) e queremos o oposto (altura): tg.', `h = ${d} × tg 60° = ${d} × 1,73 = ${num(d * 1.73)} m.`),
    };
  },
  // 2. lei dos cossenos
  (r) => {
    const [a, b, c] = r.pick([[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19], [3, 5, 7]]);
    const ang = a === 3 && b === 5 ? 120 : 60;
    return {
      e: `Dois navios partem do mesmo porto em direções que formam um ângulo de ${ang}°. Depois de algum tempo, um está a ${a} km e o outro a ${b} km do porto. Qual é a distância entre eles?`,
      r: c,
      d: [a + b, Math.round(Math.sqrt(a * a + b * b)) === c ? c - 1 : Math.round(Math.sqrt(a * a + b * b)), c + 1, Math.abs(b - a)],
      f: (v) => `${num(v)} km`,
      x: expl('lei dos cossenos', 'Com dois lados e o ângulo entre eles: x² = a² + b² − 2ab·cos θ.', `x² = ${a * a} + ${b * b} − 2·${a}·${b}·cos ${ang}° = ${c * c} ⇒ x = ${c} km.`),
    };
  },
  // 3. período
  (r) => {
    const k = r.pick([2, 3, 4, 6, 8]), f = r.pick(['sen', 'cos']);
    const per = fracao(2, k);
    const fmt = (s) => (s === '1' ? 'π' : s.includes('/') ? s.replace(/^(\d+)\//, (_, n) => (n === '1' ? 'π/' : `${n}π/`)) : `${s}π`);
    return {
      e: `Qual é o período da função f(x) = ${f}(${k}x)?`,
      r: fmt(per),
      d: [fmt(fracao(1, k)), `${2 * k}π`, `${k}π`, fmt(fracao(4, k)), '2π'].filter((v) => v !== fmt(per)),
      x: expl('período', 'sen x e cos x repetem a cada 2π. Multiplicar x por k "acelera" o ciclo: período 2π/k.', `2π/${k} = ${fmt(per)}.`),
    };
  },
  // 4. máximo e mínimo
  (r) => {
    const a = r.int(-3, 6) || 2, b = r.int(1, 5), f = r.pick(['sen', 'cos']), pede = r.pick(['máximo', 'mínimo']);
    const v = pede === 'máximo' ? a + b : a - b;
    return {
      e: `Qual é o valor ${pede} da função f(x) = ${a} + ${b}·${f}(x)?`,
      r: v,
      d: [pede === 'máximo' ? a - b : a + b, a, b === v ? b + 3 : b, a * b === v ? v + 2 : a * b],
      x: expl('limites do seno e cosseno', 'Seno e cosseno sempre ficam entre −1 e 1.', `f varia de ${a} − ${b} = ${a - b} a ${a} + ${b} = ${a + b}. O ${pede} é ${v}.`),
    };
  },
  // 5. comprimento de arco
  (r) => {
    const raio = r.pick([5, 10, 20, 30]), ang = r.pick([30, 45, 60, 90, 120, 150]);
    const comp = (2 * 3.14 * raio * ang) / 360;
    return {
      e: `A ponta do ponteiro de um relógio de parede, de ${raio} cm, gira ${ang}°. Que distância ela percorre? (Use π = 3,14.)`,
      r: arred(comp, 2),
      d: [arred(comp * 2, 2), arred((3.14 * raio * raio * ang) / 360, 2), arred(comp / 2, 2), arred(comp + 3, 2)],
      f: cm,
      x: expl('arco como fração da circunferência', `O arco é a fração ${ang}/360 da volta inteira (2πr).`, `(${ang}/360) × 2 × 3,14 × ${raio} = ${num(comp)} cm.`),
    };
  },
  // 6. lei dos senos
  (r) => {
    const a = r.pick([4, 6, 8, 10, 12]);
    return {
      e: `Em um triângulo ABC, o lado BC mede ${a} cm e é oposto ao ângulo A = 30°. O lado AC é oposto ao ângulo B = 45°. Quanto mede AC?`,
      r: `${a}√2 cm`,
      d: [`${a / 2}√2 cm`, `${a}√3 cm`, `${a * 2} cm`, `${a / 2} cm`],
      x: expl('lei dos senos', 'Em qualquer triângulo, lado ÷ seno do ângulo oposto é constante.', `${a}/sen 30° = AC/sen 45° ⇒ AC = ${a} × (√2/2) ÷ (1/2) = ${a}√2 cm.`),
    };
  },
  // 7. roda-gigante (período)
  (r) => {
    const k = r.pick([5, 10, 15, 20]), a = r.pick([12, 15, 20]), b = r.pick([8, 10]);
    return {
      e: `A altura de uma cabine de roda-gigante é h(t) = ${a} − ${b}·cos(πt/${k}), com t em minutos. Quanto tempo leva uma volta completa?`,
      r: 2 * k,
      d: [k, k / 2, 4 * k, a + b],
      f: (v) => `${num(v)} min`,
      x: expl('período de função periódica', 'Uma volta completa corresponde a um período: o argumento πt/k precisa variar 2π.', `πt/${k} = 2π ⇒ t = ${2 * k} min.`),
    };
  },
  // 8. tangente a partir do seno
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    return {
      e: `Se x é um ângulo agudo e sen x = ${a}/${c}, qual é o valor de tg x?`,
      r: fracao(a, b),
      d: [fracao(b, a), fracao(a, c), fracao(b, c), fracao(c, b)],
      x: expl('tg = sen ÷ cos', 'Ache o cosseno pela relação fundamental e divida.', `cos x = ${b}/${c}; tg x = (${a}/${c}) ÷ (${b}/${c}) = ${fracao(a, b)}.`),
    };
  },
  // 9. redução ao 1º quadrante
  (r) => {
    const [txt, val, como] = r.pick([
      ['sen 150°', '1/2', 'sen 150° = sen(180° − 30°) = sen 30°'],
      ['cos 120°', '−1/2', 'cos 120° = −cos 60°'],
      ['sen 210°', '−1/2', 'sen 210° = −sen 30°'],
      ['cos 315°', '√2/2', 'cos 315° = cos 45°'],
      ['sen 240°', '−√3/2', 'sen 240° = −sen 60°'],
      ['cos 150°', '−√3/2', 'cos 150° = −cos 30°'],
      ['tg 135°', '−1', 'tg 135° = −tg 45°'],
    ]);
    const todos = ['1/2', '−1/2', '√2/2', '−√2/2', '√3/2', '−√3/2', '1', '−1'];
    return {
      e: `Qual é o valor de ${txt}?`,
      r: val,
      d: r.shuffle(todos.filter((v) => v !== val)),
      x: expl('redução ao 1º quadrante', 'Ache o ângulo do 1º quadrante "espelhado" e acerte o sinal pelo quadrante original.', `${como} = ${val}.`),
    };
  },
  // 10. área com seno
  (r) => {
    const a = r.int(4, 14), b = r.int(4, 14), ang = r.pick([30, 90, 150]);
    const s = { 30: 0.5, 90: 1, 150: 0.5 }[ang];
    return {
      e: `Um terreno triangular tem dois lados de ${a} m e ${b} m, que formam entre si um ângulo de ${ang}°. Qual é a área do terreno?`,
      r: (a * b * s) / 2,
      d: [a * b * s, (a * b) / 2 === (a * b * s) / 2 ? a * b : (a * b) / 2, (a * b * s) / 4, a + b],
      f: (v) => `${num(v)} m²`,
      x: expl('área com dois lados e o ângulo', 'A = (1/2)·a·b·sen θ. (A altura é b·sen θ.)', `(1/2) × ${a} × ${b} × sen ${ang}° = ${num((a * b * s) / 2)} m².`),
    };
  },
  // 11. equação trigonométrica simples
  (r) => {
    const [eq, sol] = r.pick([['2·sen x − 1 = 0', 30], ['2·cos x − 1 = 0', 60], ['√2·sen x − 1 = 0', 45], ['2·sen x − √3 = 0', 60], ['tg x − 1 = 0', 45], ['2·cos x − √3 = 0', 30]]);
    return {
      e: `Qual é a solução da equação ${eq} para x entre 0° e 90°?`,
      r: sol,
      d: [30, 45, 60, 90, 0, 120].filter((v) => v !== sol),
      f: grau,
      x: expl('isolar a função e consultar a tabela', 'Resolva como equação comum para achar o valor do seno, cosseno ou tangente; depois use a tabela dos notáveis.', `Isolando, obtemos o valor notável do ângulo de ${sol}°.`),
    };
  },
];
medio[0].vezes = 2;
medio[3].vezes = 2;
medio[8].vezes = 2;
medio[9].vezes = 2;

const dificil = [
  // 1. maré
  (r) => {
    const a = r.pick([2, 3, 4, 5]), b = r.pick([1, 1.5, 2]);
    const pede = r.pick(['máxima', 'mínima']);
    const v = pede === 'máxima' ? a + b : a - b;
    const t = pede === 'máxima' ? 0 : 6;
    return {
      e: `A altura da maré em um porto, em metros, é modelada por h(t) = ${num(a)} + ${num(b)}·cos(πt/6), em que t é o tempo em horas após a meia-noite (0 ≤ t < 12). Qual é a altura ${pede} da maré e em que horário ela ocorre?`,
      r: `${m(v)}, às ${t}h`,
      d: [`${m(v)}, às ${t === 0 ? 6 : 0}h`, `${m(pede === 'máxima' ? a - b : a + b)}, às ${t}h`, `${m(a)}, às 3h`, `${m(a + 2 * b)}, às ${t}h`],
      x: expl('função cosseno', `O cosseno vale 1 quando o argumento é 0 e −1 quando o argumento é π.`, `${pede === 'máxima' ? 'πt/6 = 0 ⇒ t = 0' : 'πt/6 = π ⇒ t = 6'}; h = ${num(a)} ${pede === 'máxima' ? '+' : '−'} ${num(b)} = ${num(v)} m.`),
    };
  },
  // 2. sen 2x
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    return {
      e: `Sabendo que sen x = ${a}/${c} e que x é um ângulo do 1º quadrante, qual é o valor de sen(2x)?`,
      r: fracao(2 * a * b, c * c),
      d: [fracao(2 * a, c), fracao(a * b, c * c), fracao(Math.abs(b * b - a * a), c * c), fracao(2 * b, c)],
      x: expl('arco duplo', 'sen(2x) = 2·sen x·cos x. Antes, ache cos x pela relação fundamental.', `cos x = ${b}/${c}; 2 × ${a}/${c} × ${b}/${c} = ${fracao(2 * a * b, c * c)}.`),
    };
  },
  // 3. soma de arcos
  (r) => {
    const [exp, val, como] = r.pick([
      ['sen 75°', '(√6 + √2)/4', 'sen(45° + 30°) = sen45·cos30 + sen30·cos45'],
      ['cos 75°', '(√6 − √2)/4', 'cos(45° + 30°) = cos45·cos30 − sen45·sen30'],
      ['sen 15°', '(√6 − √2)/4', 'sen(45° − 30°) = sen45·cos30 − sen30·cos45'],
      ['cos 15°', '(√6 + √2)/4', 'cos(45° − 30°) = cos45·cos30 + sen45·sen30'],
      ['tg 15°', '2 − √3', 'tg(45° − 30°) = (1 − √3/3)/(1 + √3/3)'],
      ['tg 75°', '2 + √3', 'tg(45° + 30°) = (1 + √3/3)/(1 − √3/3)'],
    ]);
    const todos = ['(√6 + √2)/4', '(√6 − √2)/4', '2 − √3', '2 + √3', '(√3 + 1)/2', '(√2 + 1)/4'];
    return {
      e: `Qual é o valor exato de ${exp}?`,
      r: val,
      d: todos.filter((v) => v !== val),
      x: expl('soma e diferença de arcos', 'Escreva o ângulo como soma ou diferença de ângulos notáveis.', `${como} = ${val}.`),
    };
  },
  // 4. número de soluções
  (r) => {
    const n = r.int(1, 4);
    const [eq, porVolta, sols] = r.pick([
      ['sen x = 1/2', 2, 'π/6 e 5π/6'],
      ['cos x = 1/2', 2, 'π/3 e 5π/3'],
      ['sen x = 1', 1, 'π/2'],
      ['cos x = 0', 2, 'π/2 e 3π/2'],
      ['sen x = −√2/2', 2, '5π/4 e 7π/4'],
      ['tg x = 1', 2, 'π/4 e 5π/4'],
    ]);
    const sol = porVolta * n;
    const fim = n === 1 ? '2π' : `${2 * n}π`;
    return {
      e: `Quantas soluções a equação ${eq} possui no intervalo 0 ≤ x ≤ ${fim}?`,
      r: sol,
      d: [sol + 1, sol * 2, sol - 1 > 0 ? sol - 1 : sol + 2, n + 1, 4 * n],
      x: expl('contar por volta', `Em cada volta de 0 a 2π a equação tem ${porVolta} solução(ões): ${sols}. O intervalo tem ${n} volta(s).`, `${porVolta} × ${n} = ${sol} (0 e ${fim} não são soluções).`),
    };
  },
  // 5. raio circunscrito
  (r) => {
    const b = r.pick([30, 45, 60]);
    const a = b === 60 ? r.pick([3, 6, 9, 12]) : r.pick([4, 6, 8, 10, 12]);
    let resp, d;
    if (b === 30) { resp = `${num(a)} cm`; d = [`${num(a / 2)} cm`, `${num(2 * a)} cm`, `${num(a)}√2 cm`, `${num(a / 2)}√3 cm`]; }
    else if (b === 45) { resp = `${raizK(a / 2, 2)} cm`; d = [`${raizK(a, 2)} cm`, `${num(a / 2)} cm`, `${num(a)} cm`, `${raizK(a / 4, 2)} cm`]; }
    else { resp = `${raizK(a / 3, 3)} cm`; d = [`${raizK(a / 2, 3)} cm`, `${num(a)} cm`, `${raizK((2 * a) / 3, 3)} cm`, `${num(a / 2)} cm`]; }
    return {
      e: `Em um triângulo, o lado oposto a um ângulo de ${b}° mede ${a} cm. Qual é o raio da circunferência circunscrita a esse triângulo?`,
      r: resp,
      d,
      x: expl('lei dos senos estendida', 'lado ÷ seno do ângulo oposto = 2R (diâmetro da circunferência circunscrita).', `2R = ${a} ÷ sen ${b}° ⇒ R = ${resp}.`),
    };
  },
  // 6. altura com duas observações
  (r) => {
    const d = r.pick([10, 20, 30, 40]);
    const h = (d * Math.sqrt(3)) / 2;
    return {
      e: `De um ponto A, uma pessoa vê o topo de uma torre sob um ângulo de 30°. Andando ${d} m em direção à torre, até um ponto B, passa a vê-lo sob um ângulo de 60°. Qual é a altura da torre? (Use √3 = 1,73 e despreze a altura da pessoa.)`,
      r: arred((d * 1.73) / 2, 2),
      d: [arred(d * 1.73, 2), d / 2, d, arred(d / 1.73, 2)],
      f: m,
      x: expl('dois triângulos retângulos', 'Escreva a tangente em cada ponto e elimine a distância desconhecida. (Ou repare: o triângulo ABT é isósceles, com BT = AB.)', `BT = ${d} m (isósceles, ângulos de 30°); h = ${d} × sen 60° = ${d}√3/2 ≈ ${num(arred(h, 2))} m.`),
    };
  },
  // 7. simplificação
  (r) => {
    const [exp, res, como] = r.pick([
      ['(1 − cos²x)/sen x', 'sen x', '1 − cos²x = sen²x'],
      ['(1 − sen²x)/cos x', 'cos x', '1 − sen²x = cos²x'],
      ['sen x · tg x + cos x', '1/cos x', 'sen²x/cos x + cos x = (sen²x + cos²x)/cos x'],
      ['(sen x + cos x)² − 2·sen x·cos x', '1', 'sen²x + 2sen x cos x + cos²x − 2sen x cos x'],
      ['tg x · cos x', 'sen x', 'tg x = sen x / cos x'],
    ]);
    const todos = ['sen x', 'cos x', '1', '1/cos x', 'tg x', '0', '2·sen x'];
    return {
      e: `Para os valores de x em que a expressão existe, ${exp} é igual a:`,
      r: res,
      d: todos.filter((v) => v !== res),
      x: expl('identidades trigonométricas', 'Use sen²x + cos²x = 1 e tg x = sen x/cos x para reescrever tudo em seno e cosseno.', `${como} ⇒ ${res}.`),
    };
  },
  // 8. cos 2x
  (r) => {
    const [a, b, c] = r.pick(TRIPLAS);
    const num2 = 2 * a * a - c * c;
    return {
      e: `Sabendo que cos x = ${a}/${c}, qual é o valor de cos(2x)?`,
      r: fracao(num2, c * c),
      d: [fracao(2 * a, c), fracao(2 * a * a, c * c), fracao(-num2, c * c), fracao(2 * a * b, c * c)],
      x: expl('arco duplo', 'cos(2x) = 2cos²x − 1 (dá para usar sem saber o seno).', `2 × ${a * a}/${c * c} − 1 = ${fracao(num2, c * c)}.`),
    };
  },
  // 9. ângulo pela lei dos cossenos
  (r) => {
    const [a, b, c, ang] = r.pick([[7, 5, 8, 60], [7, 3, 8, 60], [13, 7, 15, 60], [7, 3, 5, 120], [19, 5, 16, 120]]);
    return {
      e: `Os lados de um triângulo medem ${b} cm, ${c} cm e ${a} cm. Quanto mede o ângulo oposto ao lado de ${a} cm?`,
      r: ang,
      d: [180 - ang, 90, 45, 30],
      f: grau,
      x: expl('lei dos cossenos ao contrário', 'Isole o cosseno: cos θ = (b² + c² − a²)/(2bc).', `cos θ = (${b * b} + ${c * c} − ${a * a})/(2 · ${b} · ${c}) = ${fracao(b * b + c * c - a * a, 2 * b * c)} ⇒ θ = ${ang}°.`),
    };
  },
  // 10. relógio às h:m
  (r) => {
    const h = r.int(1, 11), mm = r.pick([10, 20, 30, 40, 50]);
    const angH = 30 * h + mm / 2, angM = 6 * mm;
    let ang = Math.abs(angH - angM);
    if (ang > 180) ang = 360 - ang;
    return {
      e: `Qual é o menor ângulo formado pelos ponteiros de um relógio às ${h}h${mm}?`,
      r: ang,
      d: [Math.abs(30 * h - angM) > 180 ? 360 - Math.abs(30 * h - angM) : Math.abs(30 * h - angM), 360 - ang, ang + 15, ang - 5 > 0 ? ang - 5 : ang + 10],
      f: grau,
      x: expl('velocidade dos ponteiros', 'O ponteiro dos minutos anda 6° por minuto; o das horas anda 30° por hora e MAIS 0,5° por minuto.', `Horas: ${30 * h}° + ${mm / 2}° = ${angH}°. Minutos: ${angM}°. Diferença: ${ang}°.`),
    };
  },
  // 11. comprimento de sombra variável
  (r) => {
    const h = r.pick([6, 9, 12, 15]);
    const s30 = arred(h * 1.73, 2), s60 = arred(h / 1.73, 2);
    return {
      e: `Um poste de ${h} m projeta sombra quando o sol está a 60° acima do horizonte e, horas depois, a 30°. Quanto a sombra aumentou nesse intervalo? (Use √3 = 1,73.)`,
      r: arred(s30 - s60, 2),
      d: [s30, s60, arred(h * 2, 2), arred((s30 - s60) / 2, 2)],
      f: m,
      x: expl('tangente em dois momentos', 'Sombra = altura ÷ tg (ângulo do sol).', `A 60°: ${h} ÷ 1,73 ≈ ${num(s60)} m. A 30°: ${h} × 1,73 ≈ ${num(s30)} m. Aumento ≈ ${num(arred(s30 - s60, 2))} m.`),
    };
  },
];
dificil[1].vezes = 2;
dificil[6].vezes = 2;
dificil[9].vezes = 2;
dificil[10].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '10-trigonometria',
    titulo: 'Trigonometria',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Razões trigonométricas, ângulos notáveis, leis dos senos e cossenos, ciclo trigonométrico e funções periódicas.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.trig[0])], [...medio, ...novos(NOVOS.trig[1])], [...dificil, ...novos(NOVOS.trig[2])]],
  },
];
