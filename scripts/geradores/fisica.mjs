// Física: questões com cálculo (g = 10 m/s²).
import { arred, expl, nome, novos, num } from './util.mjs';

const PROVAS = ['ENEM', 'Militares'];
const u = (un) => (v) => `${num(v)} ${un}`;
const G = 10;

// ======================================================= Cinemática
const cinematica = {
  disciplina: 'fisica',
  arquivo: '01-cinematica',
  titulo: 'Cinemática',
  provas: PROVAS,
  descricao: 'Velocidade média, MRU, MRUV, queda livre e lançamentos.',
  niveis: [
    [
      (r) => {
        const d = r.pick([120, 180, 240, 300, 360, 450, 600]), t = r.pick([1.5, 2, 2.5, 3, 4, 5, 6]);
        if (!Number.isInteger((d / t) * 10)) return cinematica.niveis[0][0](r);
        return {
          e: `Um ônibus percorre ${d} km em ${num(t)} h. Qual é sua velocidade escalar média?`,
          r: d / t,
          d: [d * t, d / t / 3.6, (d / t) * 3.6, d / (t + 1)],
          f: u('km/h'),
          x: `vm = Δs/Δt = ${d}/${num(t)} = ${num(d / t)} km/h.`,
        };
      },
      (r) => {
        const s0 = r.int(-50, 100), v = r.int(-20, 30) || 5, t = r.int(2, 15);
        return {
          e: `Um móvel em movimento uniforme obedece à função horária s = ${s0} ${v >= 0 ? '+' : '−'} ${Math.abs(v)}t (SI). Qual é sua posição no instante t = ${t} s?`,
          r: s0 + v * t,
          d: [s0 - v * t, v * t, s0 + v, (s0 + v) * t],
          f: u('m'),
          x: `s = ${s0} ${v >= 0 ? '+' : '−'} ${Math.abs(v)} × ${t} = ${s0 + v * t} m.`,
        };
      },
      (r) => {
        const v = r.pick([60, 72, 80, 90, 100, 120]), d = r.pick([30, 45, 60, 90, 120, 150, 240]);
        const t = (d / v) * 60;
        if (!Number.isInteger(t)) return cinematica.niveis[0][2](r);
        return {
          e: `Um carro mantém velocidade constante de ${v} km/h. Quanto tempo leva para percorrer ${d} km?`,
          r: t,
          d: [(v / d) * 60, t / 2, t + 15, d / v],
          f: u('min'),
          x: `t = d/v = ${d}/${v} h = ${num(d / v)} h = ${num(t)} min.`,
        };
      },
      (r) => {
        const v0 = r.pick([0, 10, 20]), v = v0 + r.pick([10, 20, 30]), t = r.pick([2, 4, 5, 10]);
        return {
          e: `Um carro passa de ${v0} m/s para ${v} m/s em ${t} s, com aceleração constante. Qual é sua aceleração?`,
          r: (v - v0) / t,
          d: [v / t, (v + v0) / t, (v - v0) * t, ((v - v0) / t) * 2],
          f: u('m/s²'),
          x: `a = Δv/Δt = (${v} − ${v0})/${t} = ${num((v - v0) / t)} m/s².`,
        };
      },
      (r) => {
        const t = r.int(1, 6);
        return {
          e: `Um objeto é abandonado do alto de um prédio. Desprezando a resistência do ar (g = 10 m/s²), qual é sua velocidade após ${t} s de queda?`,
          r: G * t,
          d: [5 * t * t, G * t * t, G / t, G * t + 10],
          f: u('m/s'),
          x: `Queda livre: v = g·t = 10 × ${t} = ${G * t} m/s.`,
        };
      },
    ],
    [
      (r) => {
        const v0 = r.int(0, 10), a = r.pick([1, 2, 3, 4]), t = r.int(2, 10);
        const s = v0 * t + (a * t * t) / 2;
        return {
          e: `Um corpo parte com velocidade de ${v0} m/s e acelera uniformemente a ${a} m/s². Qual distância ele percorre em ${t} s?`,
          r: s,
          d: [v0 * t + a * t * t, (v0 + a * t) * t, v0 * t, s / 2],
          f: u('m'),
          x: `Δs = v₀t + at²/2 = ${v0}·${t} + ${a}·${t * t}/2 = ${num(s)} m.`,
        };
      },
      (r) => {
        const v = r.pick([10, 20, 30, 40]), a = r.pick([2, 4, 5, 8]);
        const d = (v * v) / (2 * a);
        return {
          e: `Um carro a ${v} m/s (${num(v * 3.6)} km/h) freia com desaceleração constante de ${a} m/s² até parar. Qual é a distância de frenagem?`,
          r: d,
          d: [(v * v) / a, v / a, d * 2, (v * 3.6) ** 2 / (2 * a)],
          f: u('m'),
          x: `Torricelli: 0 = v² − 2aΔs ⇒ Δs = ${v}²/(2·${a}) = ${num(d)} m. Dobrar a velocidade quadruplica a distância de frenagem.`,
        };
      },
      (r) => {
        const t = r.int(1, 6);
        return {
          e: `Uma pedra é solta do alto de um penhasco e chega ao solo após ${t} s. Qual é a altura do penhasco? (g = 10 m/s²; despreze a resistência do ar.)`,
          r: 5 * t * t,
          d: [10 * t * t, 10 * t, 5 * t, 20 * t],
          f: u('m'),
          x: `h = g·t²/2 = 10 × ${t * t}/2 = ${5 * t * t} m.`,
        };
      },
      (r) => {
        const v1 = r.pick([40, 50, 60, 70, 80]), v2 = r.pick([40, 50, 60, 80, 90]), d = r.pick([100, 150, 200, 300, 400]);
        const t = d / (v1 + v2);
        if (!Number.isInteger(t * 60)) return cinematica.niveis[1][3](r);
        return {
          e: `Duas cidades estão a ${d} km de distância. Um carro sai de cada cidade, ao mesmo tempo, um em direção ao outro, com velocidades constantes de ${v1} km/h e ${v2} km/h. Depois de quanto tempo eles se encontram?`,
          r: t * 60,
          d: [(d / Math.abs(v1 - v2 || 10)) * 60, (d / v1) * 60, (d / ((v1 + v2) / 2)) * 60, t * 30],
          f: (m) => (m >= 60 ? `${Math.floor(m / 60)} h${Math.round(m % 60) ? ` ${Math.round(m % 60)} min` : ''}` : `${Math.round(m)} min`),
          x: `Em sentidos opostos, a velocidade relativa é ${v1} + ${v2} = ${v1 + v2} km/h. t = ${d}/${v1 + v2} = ${num(t)} h.`,
        };
      },
      (r) => {
        const v1 = r.pick([80, 90, 100, 110]), v2 = r.pick([60, 70, 80]), d = r.pick([5, 10, 15, 20, 30]);
        if (v1 <= v2) return cinematica.niveis[1][4](r);
        const t = (d / (v1 - v2)) * 60;
        return {
          e: `Um carro a ${v1} km/h persegue outro que está ${d} km à frente, a ${v2} km/h, na mesma direção e sentido. Em quanto tempo o primeiro alcança o segundo?`,
          r: arred(t, 2),
          d: [arred((d / (v1 + v2)) * 60, 2), arred((d / v1) * 60, 2), arred(t * 2, 2), arred(t / 2, 2)],
          f: (m) => `${num(m)} min`,
          x: `Mesmo sentido: velocidade relativa = ${v1} − ${v2} = ${v1 - v2} km/h. t = ${d}/${v1 - v2} h = ${num(t)} min.`,
        };
      },
    ],
    [
      (r) => {
        const v = r.pick([2, 4, 5, 10, 15]), h = r.pick([5, 20, 45, 80]);
        const t = Math.sqrt((2 * h) / G);
        return {
          e: `Uma bola rola horizontalmente com ${v} m/s e cai da borda de uma mesa a ${h} m do chão. A que distância horizontal da mesa ela toca o solo? (g = 10 m/s²)`,
          r: v * t,
          d: [v * h / 10, v * t * 2, h, v * (2 * h) / G],
          f: u('m'),
          x: `Tempo de queda: h = 5t² ⇒ t = √(${h}/5) = ${num(t)} s. Alcance = v·t = ${v} × ${num(t)} = ${num(v * t)} m.`,
        };
      },
      (r) => {
        const v = r.pick([10, 20, 30, 40, 50]);
        const pede = r.pick(['altura', 'tempo']);
        return {
          e: `Uma bola é lançada verticalmente para cima com velocidade de ${v} m/s. Desprezando a resistência do ar (g = 10 m/s²), qual é ${pede === 'altura' ? 'a altura máxima atingida' : 'o tempo total até voltar ao ponto de lançamento'}?`,
          r: pede === 'altura' ? (v * v) / 20 : (2 * v) / G,
          d: pede === 'altura' ? [(v * v) / 10, v / 10, v * 2, (v * v) / 40] : [v / G, (v * v) / 20, (4 * v) / G, v],
          f: u(pede === 'altura' ? 'm' : 's'),
          x: pede === 'altura' ? `No topo v = 0: h = v₀²/(2g) = ${v * v}/20 = ${num((v * v) / 20)} m.` : `Subida: t = v₀/g = ${v / G} s. Descida leva o mesmo tempo: total ${(2 * v) / G} s.`,
        };
      },
      (r) => {
        const v = r.pick([10, 20, 30, 40]);
        return {
          e: `Um projétil é lançado do solo com velocidade de ${v} m/s, formando 45° com a horizontal. Desprezando a resistência do ar (g = 10 m/s²), qual é o alcance horizontal?`,
          r: (v * v) / G,
          d: [(v * v) / (2 * G), (v * v) / (4 * G), (2 * v * v) / G, v * 2],
          f: u('m'),
          x: `A = v₀²·sen(2θ)/g = ${v * v} × sen 90°/10 = ${num((v * v) / G)} m (45° dá o alcance máximo).`,
        };
      },
      (r) => {
        const v = r.pick([10, 20, 30]), t1 = r.pick([5, 10]), t2 = r.pick([10, 20, 30]), t3 = r.pick([4, 5, 10]);
        const d = (v * t1) / 2 + v * t2 + (v * t3) / 2;
        return {
          e: `Um trem parte do repouso e acelera uniformemente até ${v} m/s em ${t1} s; mantém essa velocidade por ${t2} s e então freia uniformemente até parar em ${t3} s. Qual a distância total percorrida?`,
          r: d,
          d: [v * (t1 + t2 + t3), v * t2, d + (v * t1) / 2, (v * (t1 + t2 + t3)) / 2],
          f: u('m'),
          x: `A distância é a área do gráfico v × t (um trapézio): ${num((v * t1) / 2)} + ${v * t2} + ${num((v * t3) / 2)} = ${num(d)} m.`,
        };
      },
      (r) => {
        const v = r.pick([10, 15, 20, 25, 30]), tr = r.pick([0.5, 0.7, 1, 1.5]), a = r.pick([5, 8]);
        const d = v * tr + (v * v) / (2 * a);
        return {
          e: `Um motorista dirige a ${v} m/s quando vê um obstáculo. Seu tempo de reação é ${num(tr)} s e, ao frear, o carro desacelera a ${a} m/s². Qual é a distância percorrida desde que ele vê o obstáculo até parar?`,
          r: arred(d, 2),
          d: [arred((v * v) / (2 * a), 2), arred(v * tr, 2), arred(v * tr + (v * v) / a, 2), arred(d * 2, 2)],
          f: u('m'),
          x: `Durante a reação (MRU): ${v} × ${num(tr)} = ${num(v * tr)} m. Frenagem: ${v}²/(2·${a}) = ${num((v * v) / (2 * a))} m. Total: ${num(d)} m.`,
        };
      },
    ],
  ],
};

// ======================================================= Dinâmica
const dinamica = {
  disciplina: 'fisica',
  arquivo: '02-dinamica',
  titulo: 'Dinâmica e leis de Newton',
  provas: PROVAS,
  descricao: 'Leis de Newton, peso, atrito, plano inclinado, sistemas de blocos, molas e movimento circular.',
  niveis: [
    [
      (r) => {
        const m = r.int(2, 50), a = r.int(1, 6);
        return {
          e: `Qual é a força resultante necessária para acelerar um corpo de ${m} kg a ${a} m/s²?`,
          r: m * a,
          d: [m / a, m + a, m * a * 10, a / m],
          f: u('N'),
          x: `2ª lei de Newton: F = m·a = ${m} × ${a} = ${m * a} N.`,
        };
      },
      (r) => {
        const m = r.int(5, 120), lua = r() < 0.4;
        const g = lua ? 1.6 : 10;
        return {
          e: `Qual é o peso de um astronauta de ${m} kg ${lua ? 'na Lua (g = 1,6 m/s²)' : 'na Terra (g = 10 m/s²)'}?`,
          r: m * g,
          d: [m, m * (lua ? 10 : 1.6), m / g, m * g * 2],
          f: u('N'),
          x: `P = m·g = ${m} × ${num(g)} = ${num(m * g)} N. A massa (${m} kg) é a mesma em qualquer lugar; o peso muda com g.`,
        };
      },
      (r) => {
        const f1 = r.int(5, 50), f2 = r.int(5, 50), mesmo = r() < 0.5;
        return {
          e: `Duas forças de ${f1} N e ${f2} N atuam sobre um corpo na mesma direção e em sentidos ${mesmo ? 'iguais' : 'opostos'}. Qual é a intensidade da força resultante?`,
          r: mesmo ? f1 + f2 : Math.abs(f1 - f2),
          d: [mesmo ? Math.abs(f1 - f2) : f1 + f2, Math.round(Math.sqrt(f1 * f1 + f2 * f2)), f1 * f2, (f1 + f2) / 2],
          f: u('N'),
          x: mesmo ? `Mesmo sentido: somam-se: ${f1} + ${f2} = ${f1 + f2} N.` : `Sentidos opostos: subtraem-se: |${f1} − ${f2}| = ${Math.abs(f1 - f2)} N.`,
        };
      },
      (r) => {
        const m = r.int(2, 40), mu = r.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]);
        return {
          e: `Um caixote de ${m} kg está sobre um piso horizontal. O coeficiente de atrito cinético entre eles é ${num(mu)}. Qual é a força de atrito cinético quando o caixote desliza? (g = 10 m/s²)`,
          r: mu * m * G,
          d: [mu * m, m * G, (m * G) / mu, mu * m * G * 2],
          f: u('N'),
          x: `Fat = μ·N = μ·m·g = ${num(mu)} × ${m} × 10 = ${num(mu * m * G)} N.`,
        };
      },
      (r) => {
        const [lei, desc] = r.pick([
          ['1ª lei (Inércia)', 'Em uma freada brusca, os passageiros de um ônibus são projetados para a frente.'],
          ['3ª lei (Ação e reação)', 'Ao remar, o barco avança porque o remo empurra a água para trás e a água empurra o remo para a frente.'],
          ['2ª lei (Princípio fundamental)', 'Um carrinho de supermercado mais cheio exige uma força maior para atingir a mesma aceleração.'],
          ['3ª lei (Ação e reação)', 'Um foguete sobe porque expele gases para baixo em alta velocidade.'],
          ['1ª lei (Inércia)', 'É possível puxar rapidamente uma toalha de baixo de pratos sem que eles caiam da mesa.'],
          ['2ª lei (Princípio fundamental)', 'Um chute mais forte faz a bola adquirir maior aceleração.'],
        ]);
        return {
          e: `Qual lei de Newton explica melhor a situação: "${desc}"`,
          r: lei,
          d: ['1ª lei (Inércia)', '2ª lei (Princípio fundamental)', '3ª lei (Ação e reação)', 'Lei da Gravitação Universal', 'Lei de Hooke'].filter((x) => x !== lei),
          x: `${lei}. Inércia: corpos tendem a manter seu estado de movimento; 2ª lei: F = m·a; 3ª lei: forças aparecem aos pares, em corpos diferentes.`,
        };
      },
    ],
    [
      (r) => {
        const m = r.pick([2, 4, 5, 10, 20]), mu = r.pick([0.1, 0.2, 0.3]), F = m * G * mu + m * r.int(1, 4);
        const a = (F - mu * m * G) / m;
        return {
          e: `Um bloco de ${m} kg é puxado horizontalmente por uma força de ${num(F)} N sobre uma superfície com coeficiente de atrito cinético ${num(mu)}. Qual é a aceleração do bloco? (g = 10 m/s²)`,
          r: a,
          d: [F / m, (F + mu * m * G) / m, a * 2, mu * G],
          f: u('m/s²'),
          x: `Fat = ${num(mu)} × ${m} × 10 = ${num(mu * m * G)} N. FR = ${num(F)} − ${num(mu * m * G)} = ${num(F - mu * m * G)} N. a = FR/m = ${num(a)} m/s².`,
        };
      },
      (r) => {
        const m1 = r.int(2, 10), m2 = r.int(2, 10), F = (m1 + m2) * r.int(1, 5);
        const a = F / (m1 + m2);
        return {
          e: `Dois blocos, A (${m1} kg) e B (${m2} kg), ligados por um fio ideal, estão sobre uma superfície horizontal sem atrito. Uma força de ${F} N puxa o bloco A. Qual é a tração no fio que liga A a B?`,
          r: m2 * a,
          d: [m1 * a, F, F / 2, F - m2 * a === m2 * a ? F + 2 : F - m2 * a + 1],
          f: u('N'),
          x: `Aceleração do conjunto: a = ${F}/(${m1} + ${m2}) = ${num(a)} m/s². O fio puxa só o bloco B: T = ${m2} × ${num(a)} = ${num(m2 * a)} N.`,
        };
      },
      (r) => {
        const m = r.pick([50, 60, 70, 80]), a = r.pick([1, 2, 3]), sobe = r() < 0.5;
        const N = m * (G + (sobe ? a : -a));
        return {
          e: `Uma pessoa de ${m} kg está sobre uma balança dentro de um elevador que ${sobe ? 'sobe acelerando' : 'desce acelerando'} a ${a} m/s². Que força a balança indica? (g = 10 m/s²)`,
          r: N,
          d: [m * G, m * (G + (sobe ? -a : a)), m * a, N / G],
          f: u('N'),
          x: `N − P = m·a (com a para ${sobe ? 'cima' : 'baixo'}): N = m(g ${sobe ? '+' : '−'} a) = ${m} × ${G + (sobe ? a : -a)} = ${N} N.`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [12, 16, 20]]);
        return {
          e: `Duas forças perpendiculares entre si, de ${a} N e ${b} N, atuam sobre um mesmo ponto. Qual é a intensidade da força resultante?`,
          r: c,
          d: [a + b, b - a, c + 1, (a + b) / 2],
          f: u('N'),
          x: `Forças perpendiculares: FR = √(${a}² + ${b}²) = √${c * c} = ${c} N.`,
        };
      },
      (r) => {
        const k = r.pick([50, 100, 200, 400, 500]), x = r.pick([2, 4, 5, 10, 20]);
        return {
          e: `Uma mola de constante elástica ${k} N/m é distendida ${x} cm. Qual é a força elástica exercida pela mola?`,
          r: (k * x) / 100,
          d: [k * x, k / x, (k * x) / 10, (k * x) / 200],
          f: u('N'),
          x: `Lei de Hooke: F = k·x = ${k} × ${num(x / 100)} m = ${num((k * x) / 100)} N.`,
        };
      },
    ],
    [
      (r) => {
        const m = r.int(2, 20);
        return {
          e: `Um bloco de ${m} kg desliza, a partir do repouso, por um plano inclinado sem atrito que forma 30° com a horizontal. Qual é a sua aceleração? (g = 10 m/s²)`,
          r: 5,
          d: [10, 8.7, 5 * m, 2.5],
          f: u('m/s²'),
          x: `Só a componente do peso paralela ao plano acelera o bloco: a = g·sen 30° = 10 × 0,5 = 5 m/s² (não depende da massa).`,
        };
      },
      (r) => {
        const mu = r.pick([0.25, 0.5]), m = r.int(2, 10);
        const a = G * (0.6 - mu * 0.8);
        return {
          e: `Um bloco de ${m} kg desce um plano inclinado de 37° (sen 37° = 0,6; cos 37° = 0,8) com coeficiente de atrito cinético ${num(mu)}. Qual é a aceleração do bloco? (g = 10 m/s²)`,
          r: arred(a, 2),
          d: [6, arred(G * (0.8 - mu * 0.6), 2), arred(G * (0.6 + mu * 0.8), 2), arred(a * m, 2)],
          f: u('m/s²'),
          x: `a = g(sen θ − μ cos θ) = 10(0,6 − ${num(mu)} × 0,8) = ${num(a)} m/s².`,
        };
      },
      (r) => {
        const m = r.pick([800, 1000, 1200, 1500]), v = r.pick([10, 15, 20, 30]), R = r.pick([50, 100, 150, 200]);
        const F = (m * v * v) / R;
        return {
          e: `Um carro de ${num(m)} kg faz uma curva de raio ${R} m com velocidade constante de ${v} m/s. Qual é a intensidade da força resultante centrípeta sobre ele?`,
          r: F,
          d: [(m * v) / R, (m * v * v) / (2 * R), m * G, (m * v * v) / R ** 2 > 1 ? (m * v * v) / R ** 2 : F * 2],
          f: u('N'),
          x: `Fcp = m·v²/R = ${num(m)} × ${v * v}/${R} = ${num(F)} N.`,
        };
      },
      (r) => {
        const m1 = r.int(3, 10), m2 = r.int(1, m1 - 1);
        const a = ((m1 - m2) * G) / (m1 + m2);
        return {
          e: `Em uma máquina de Atwood (polia e fio ideais), estão pendurados blocos de ${m1} kg e ${m2} kg. Qual é a aceleração do sistema? (g = 10 m/s²)`,
          r: arred(a, 2),
          d: [arred(((m1 + m2) * G) / (m1 - m2), 2), arred((m1 - m2) * G, 2), G, arred(a / 2, 2)],
          f: u('m/s²'),
          x: `a = (m₁ − m₂)g/(m₁ + m₂) = ${m1 - m2} × 10/${m1 + m2} = ${num(a)} m/s².`,
        };
      },
      (r) => {
        const mu = r.pick([0.4, 0.5, 0.8, 0.9]), R = r.pick([20, 40, 50, 80, 90, 125]);
        const v = Math.sqrt(mu * G * R);
        if (!Number.isInteger(v)) return dinamica.niveis[2][4](r);
        return {
          e: `Um carro faz uma curva plana de raio ${R} m. O coeficiente de atrito estático entre pneus e pista é ${num(mu)}. Qual é a velocidade máxima para fazer a curva sem derrapar? (g = 10 m/s²)`,
          r: v,
          d: [mu * G * R, v * 2, Math.round(Math.sqrt(G * R)), v * 3.6],
          f: u('m/s'),
          x: `O atrito faz o papel de força centrípeta: μmg = mv²/R ⇒ v = √(μgR) = √(${num(mu * G * R)}) = ${v} m/s (${num(v * 3.6)} km/h).`,
        };
      },
    ],
  ],
};

// ======================================================= Energia
const energia = {
  disciplina: 'fisica',
  arquivo: '03-trabalho-energia-e-potencia',
  titulo: 'Trabalho, energia, potência e impulso',
  provas: PROVAS,
  descricao: 'Energia cinética, potencial e mecânica, conservação de energia, potência, rendimento, impulso e colisões.',
  niveis: [
    [
      (r) => {
        const m = r.pick([2, 4, 10, 50, 80, 1000]), v = r.pick([2, 3, 5, 10, 20]);
        return {
          e: `Qual é a energia cinética de um corpo de ${num(m)} kg que se move a ${v} m/s?`,
          r: (m * v * v) / 2,
          d: [m * v * v, (m * v) / 2, m * v, (m * v * v) / 4],
          f: u('J'),
          x: `Ec = m·v²/2 = ${num(m)} × ${v * v}/2 = ${num((m * v * v) / 2)} J.`,
        };
      },
      (r) => {
        const m = r.pick([1, 2, 5, 10, 60]), h = r.pick([2, 3, 5, 10, 20, 30]);
        return {
          e: `Qual é a energia potencial gravitacional de um corpo de ${m} kg a ${h} m do solo (referência no solo; g = 10 m/s²)?`,
          r: m * G * h,
          d: [m * h, (m * G * h) / 2, m * G + h, m * G * h * 2],
          f: u('J'),
          x: `Ep = m·g·h = ${m} × 10 × ${h} = ${m * G * h} J.`,
        };
      },
      (r) => {
        const F = r.pick([10, 20, 50, 100, 200]), d = r.pick([2, 3, 5, 10, 15]);
        return {
          e: `Uma força constante de ${F} N desloca uma caixa por ${d} m, na mesma direção e sentido da força. Qual é o trabalho realizado?`,
          r: F * d,
          d: [F / d, F + d, (F * d) / 2, F * d * 10],
          f: u('J'),
          x: `τ = F·d·cos 0° = ${F} × ${d} = ${F * d} J.`,
        };
      },
      (r) => {
        const W = r.pick([600, 1200, 1800, 3000, 6000]), t = r.pick([2, 3, 5, 10, 20, 30, 60]);
        if (!Number.isInteger(W / t)) return energia.niveis[0][3](r);
        return {
          e: `Um motor realiza um trabalho de ${num(W)} J em ${t} s. Qual é a sua potência média?`,
          r: W / t,
          d: [W * t, W / t / 1000, (W / t) * 2, t / W > 0.01 ? t : W / 2],
          f: u('W'),
          x: `P = τ/Δt = ${num(W)}/${t} = ${num(W / t)} W.`,
        };
      },
      (r) => {
        const [forma, ex] = r.pick([
          ['química → elétrica', 'uma pilha alimentando um controle remoto'],
          ['elétrica → térmica', 'um chuveiro elétrico aquecendo a água'],
          ['luminosa (radiante) → elétrica', 'um painel fotovoltaico'],
          ['potencial gravitacional → cinética → elétrica', 'uma usina hidrelétrica'],
          ['cinética → elétrica', 'um aerogerador (turbina eólica)'],
          ['química → térmica → cinética', 'o motor a combustão de um carro'],
          ['elétrica → cinética', 'um ventilador'],
        ]);
        const todas = ['química → elétrica', 'elétrica → térmica', 'luminosa (radiante) → elétrica', 'potencial gravitacional → cinética → elétrica', 'cinética → elétrica', 'química → térmica → cinética', 'elétrica → cinética', 'térmica → química'];
        return {
          e: `Qual transformação de energia ocorre principalmente em ${ex}?`,
          r: forma,
          d: r.shuffle(todas.filter((x) => x !== forma)),
          x: `Em ${ex}, a principal transformação é ${forma}.`,
        };
      },
    ],
    [
      (r) => {
        const [h, v] = r.pick([[5, 10], [20, 20], [45, 30], [80, 40], [1.25, 5], [3.2, 8], [1.8, 6]]);
        return {
          e: `Um objeto é solto de uma altura de ${num(h)} m. Desprezando a resistência do ar (g = 10 m/s²), com que velocidade ele chega ao solo?`,
          r: v,
          d: [v * v, 2 * G * h, v / 2, h * 2 === v ? v + 5 : h * 2],
          f: u('m/s'),
          x: `Conservação de energia: m·g·h = m·v²/2 ⇒ v = √(2gh) = √(${num(2 * G * h)}) = ${v} m/s.`,
        };
      },
      (r) => {
        const m = r.pick([100, 200, 500, 1000]), h = r.pick([5, 10, 15, 20, 30]), t = r.pick([5, 10, 20, 25, 50]);
        const P = (m * G * h) / t;
        return {
          e: `Um guindaste eleva uma carga de ${num(m)} kg a uma altura de ${h} m em ${t} s, com velocidade constante. Qual é a potência útil desenvolvida? (g = 10 m/s²)`,
          r: P,
          d: [m * G * h, (m * h) / t, P * 2, P / G],
          f: u('W'),
          x: `P = m·g·h/t = ${num(m)} × 10 × ${h}/${t} = ${num(P)} W.`,
        };
      },
      (r) => {
        const Pt = r.pick([500, 1000, 1200, 2000, 2500]), eta = r.pick([60, 70, 75, 80, 90]);
        return {
          e: `Um motor consome ${num(Pt)} W e tem rendimento de ${eta}%. Qual é a potência dissipada (perdida)?`,
          r: (Pt * (100 - eta)) / 100,
          d: [(Pt * eta) / 100, Pt, Pt - eta, (Pt * (100 - eta)) / 10],
          f: u('W'),
          x: `Potência útil = ${eta}% de ${num(Pt)} = ${num((Pt * eta) / 100)} W. Dissipada = ${num(Pt)} − ${num((Pt * eta) / 100)} = ${num((Pt * (100 - eta)) / 100)} W.`,
        };
      },
      (r) => {
        const m = r.pick([0.2, 0.4, 0.5, 2]), v0 = 0, v = r.pick([10, 20, 30]), dt = r.pick([0.01, 0.02, 0.05, 0.1]);
        const F = (m * (v - v0)) / dt;
        return {
          e: `Uma bola de ${num(m)} kg, inicialmente parada, é chutada e sai com ${v} m/s. O contato com o pé dura ${num(dt)} s. Qual é a força média aplicada?`,
          r: F,
          d: [m * v, F / 10, m * v * dt, (m * v * v) / 2],
          f: u('N'),
          x: `Teorema do impulso: F·Δt = Δp ⇒ F = ${num(m)} × ${v}/${num(dt)} = ${num(F)} N.`,
        };
      },
      (r) => {
        const k = r.pick([100, 200, 400, 800]), x = r.pick([0.1, 0.2, 0.05]);
        return {
          e: `Qual é a energia potencial elástica armazenada em uma mola de constante ${k} N/m comprimida ${num(x * 100)} cm?`,
          r: (k * x * x) / 2,
          d: [k * x * x, (k * x) / 2, k * x, (k * (x * 100) ** 2) / 2],
          f: u('J'),
          x: `Ep = k·x²/2 = ${k} × ${num(x)}²/2 = ${num((k * x * x) / 2)} J.`,
        };
      },
    ],
    [
      (r) => {
        const [v0, h, v] = r.pick([[0, 20, 20], [10, 15, 20], [0, 45, 30], [20, 25, 30], [30, 35, 40], [10, 40, 30]]);
        return {
          e: `Um carrinho de montanha-russa passa pelo topo de uma elevação com velocidade de ${v0} m/s e desce ${h} m até o ponto mais baixo. Desprezando atritos (g = 10 m/s²), qual é sua velocidade nesse ponto?`,
          r: v,
          d: [v0 + Math.sqrt(2 * G * h), Math.round(Math.sqrt(2 * G * h)), v + 10, v0 + h],
          f: u('m/s'),
          x: `v² = v₀² + 2gh = ${v0 * v0} + ${2 * G * h} = ${v * v} ⇒ v = ${v} m/s.`,
        };
      },
      (r) => {
        const m1 = r.pick([1000, 1200, 1500]), v1 = r.pick([10, 15, 20]), m2 = r.pick([500, 800, 1000, 1500]), v2 = 0;
        const vf = (m1 * v1 + m2 * v2) / (m1 + m2);
        return {
          e: `Um carro de ${num(m1)} kg a ${v1} m/s colide com outro, de ${num(m2)} kg, parado. Após a colisão, os dois seguem juntos. Qual é a velocidade do conjunto logo após o choque?`,
          r: arred(vf, 2),
          d: [v1 / 2, v1, arred((m2 * v1) / (m1 + m2), 2), arred(v1 * Math.sqrt(m1 / (m1 + m2)), 2)],
          f: u('m/s'),
          x: `Conservação da quantidade de movimento: ${num(m1)} × ${v1} = (${num(m1)} + ${num(m2)})·v ⇒ v = ${num(vf)} m/s.`,
        };
      },
      (r) => {
        const m = r.pick([2, 5, 10, 20]), h = r.pick([5, 10, 20]), v = r.pick([4, 6, 8, 10]);
        const dis = m * G * h - (m * v * v) / 2;
        if (dis <= 0) return energia.niveis[2][2](r);
        return {
          e: `Um bloco de ${m} kg parte do repouso do alto de uma rampa de ${h} m de altura e chega à base com ${v} m/s. Quanta energia mecânica foi dissipada pelo atrito? (g = 10 m/s²)`,
          r: dis,
          d: [m * G * h, (m * v * v) / 2, dis / 2, m * G * h + (m * v * v) / 2],
          f: u('J'),
          x: `Energia inicial: mgh = ${m * G * h} J. Final: mv²/2 = ${(m * v * v) / 2} J. Dissipada: ${dis} J.`,
        };
      },
      (r) => {
        const Q = r.pick([100, 200, 500, 1000]), h = r.pick([50, 80, 100, 120]), eta = r.pick([0.8, 0.9]);
        const P = (eta * 1000 * Q * G * h) / 1e6;
        return {
          e: `Uma usina hidrelétrica tem queda d'água de ${h} m e vazão de ${num(Q)} m³/s. Com rendimento de ${num(eta * 100)}%, qual é a potência elétrica gerada? (densidade da água = 1.000 kg/m³; g = 10 m/s²)`,
          r: arred(P, 2),
          d: [arred(P / eta, 2), arred(P * 10, 2), arred(P / 10, 2), arred((Q * h) / 1000, 2)],
          f: u('MW'),
          x: `P = η·ρ·Q·g·h = ${num(eta)} × 1.000 × ${num(Q)} × 10 × ${h} = ${num(P * 1e6)} W = ${num(P)} MW.`,
        };
      },
      (r) => {
        const [k, m, x, v] = r.pick([[400, 1, 0.1, 2], [800, 2, 0.1, 2], [200, 0.5, 0.2, 4], [1000, 10, 0.2, 2], [900, 1, 0.1, 3], [1600, 4, 0.1, 2]]);
        return {
          e: `Uma mola de constante ${k} N/m, comprimida ${num(x * 100)} cm, lança horizontalmente um bloco de ${num(m)} kg sobre uma superfície sem atrito. Com que velocidade o bloco é lançado?`,
          r: v,
          d: [v * v, arred((k * x) / m, 2), v * 2, arred(x * (k / m), 2) === v ? v + 1 : arred(x * (k / m), 2)],
          f: u('m/s'),
          x: `k·x²/2 = m·v²/2 ⇒ v = x·√(k/m) = ${num(x)} × √${num(k / m)} = ${v} m/s.`,
        };
      },
    ],
  ],
};

// ======================================================= Estática e hidrostática
const hidro = {
  disciplina: 'fisica',
  arquivo: '04-estatica-e-hidrostatica',
  titulo: 'Estática e hidrostática',
  provas: PROVAS,
  descricao: 'Densidade, pressão, teorema de Stevin, princípio de Pascal, empuxo (Arquimedes) e alavancas.',
  niveis: [
    [
      (r) => {
        const m = r.pick([100, 270, 540, 790, 1130, 1930]), V = r.pick([10, 20, 50, 100]);
        return {
          e: `Um objeto maciço tem massa de ${m} g e volume de ${V} cm³. Qual é a sua densidade?`,
          r: m / V,
          d: [V / m, m * V, (m / V) * 10, m / V / 2],
          f: u('g/cm³'),
          x: `d = m/V = ${m}/${V} = ${num(m / V)} g/cm³.`,
        };
      },
      (r) => {
        const F = r.pick([100, 200, 500, 600, 800]), A = r.pick([0.01, 0.02, 0.05, 0.1, 0.5]);
        return {
          e: `Uma força de ${F} N é aplicada perpendicularmente sobre uma área de ${num(A)} m². Qual é a pressão exercida?`,
          r: F / A,
          d: [F * A, F / A / 10, A / F > 0.0001 ? F / A * 2 : F, F / A / 100],
          f: u('Pa'),
          x: `p = F/A = ${F}/${num(A)} = ${num(F / A)} Pa (N/m²).`,
        };
      },
      (r) => {
        const h = r.pick([2, 5, 10, 20, 30, 40]);
        return {
          e: `Qual é a pressão exercida apenas pela coluna de água sobre um mergulhador a ${h} m de profundidade? (densidade da água = 1.000 kg/m³; g = 10 m/s²)`,
          r: 1000 * G * h,
          d: [1000 * h, 100 * G * h, 1000 * G * h + 100000, 1000 * G * h * 2],
          f: u('Pa'),
          x: `Stevin: p = ρ·g·h = 1.000 × 10 × ${h} = ${num(1000 * G * h)} Pa (≈ ${num(h / 10)} atm, pois cada 10 m de água equivalem a ~1 atm).`,
        };
      },
      (r) => {
        const F2 = r.pick([200, 300, 400, 600, 800]), d2 = r.pick([0.2, 0.3, 0.5]), d1 = r.pick([1, 1.5, 2]);
        return {
          e: `Uma pessoa usa uma barra como alavanca para levantar uma pedra de peso ${F2} N, que está a ${num(d2)} m do ponto de apoio. Aplicando a força a ${num(d1)} m do apoio, do outro lado, qual é a força mínima necessária?`,
          r: arred((F2 * d2) / d1, 2),
          d: [arred((F2 * d1) / d2, 2), F2, arred(F2 / 2, 2), arred(F2 * d2, 2)],
          f: u('N'),
          x: `Equilíbrio de momentos: F·${num(d1)} = ${F2}·${num(d2)} ⇒ F = ${num((F2 * d2) / d1)} N. Braço maior, força menor.`,
        };
      },
    ],
    [
      (r) => {
        const V = r.pick([0.001, 0.002, 0.005, 0.01, 0.05]), rho = r.pick([[1000, 'água'], [800, 'álcool'], [1030, 'água do mar']]);
        const E = rho[0] * G * V;
        return {
          e: `Um objeto de volume ${num(V * 1000)} L está totalmente submerso em ${rho[1]} (densidade ${num(rho[0])} kg/m³). Qual é o empuxo sobre ele? (g = 10 m/s²)`,
          r: arred(E, 2),
          d: [arred(rho[0] * V, 2), arred(E * 1000, 2), arred(E / 2, 2), arred(rho[0] * G * V * 10, 2)],
          f: u('N'),
          x: `Arquimedes: E = ρ_líquido·g·V = ${num(rho[0])} × 10 × ${num(V, 3)} = ${num(E)} N.`,
        };
      },
      (r) => {
        const A1 = r.pick([5, 10, 20]), A2 = A1 * r.pick([10, 20, 50, 100]), F2 = r.pick([10000, 12000, 15000, 20000]);
        return {
          e: `Em um elevador hidráulico, o pistão menor tem área de ${A1} cm² e o maior, ${A2} cm². Que força deve ser aplicada no pistão menor para equilibrar um carro de peso ${num(F2)} N no pistão maior?`,
          r: (F2 * A1) / A2,
          d: [(F2 * A2) / A1, F2 / A1, F2, ((F2 * A1) / A2) * 10],
          f: u('N'),
          x: `Pascal: F₁/A₁ = F₂/A₂ ⇒ F₁ = ${num(F2)} × ${A1}/${A2} = ${num((F2 * A1) / A2)} N.`,
        };
      },
      (r) => {
        const h = r.pick([10, 20, 30, 40, 50]);
        return {
          e: `Qual é a pressão total (absoluta) sobre um mergulhador a ${h} m de profundidade no mar? (Considere que cada 10 m de água equivalem a 1 atm e que a pressão atmosférica é de 1 atm.)`,
          r: h / 10 + 1,
          d: [h / 10, h / 10 + 2, h, (h / 10) * 2],
          f: u('atm'),
          x: `p = p_atm + p_água = 1 + ${h}/10 = ${num(h / 10 + 1)} atm.`,
        };
      },
      (r) => {
        const [obj, rho, liq, rl] = r.pick([['madeira', 600, 'água', 1000], ['gelo', 900, 'água', 1000], ['cortiça', 250, 'água', 1000], ['plástico', 800, 'água', 1000], ['gelo', 920, 'água do mar', 1030]]);
        const frac = arred((rho / rl) * 100, 1);
        return {
          e: `Um bloco de ${obj} (densidade ${rho} kg/m³) flutua em ${liq} (densidade ${num(rl)} kg/m³). Que porcentagem do volume do bloco fica submersa?`,
          r: frac,
          d: [arred(100 - frac, 1), arred((rl / rho) * 10, 1), 50, 100],
          f: (v) => `${num(v)}%`,
          x: `Flutuando, peso = empuxo: ρ_obj·V = ρ_líq·V_sub ⇒ V_sub/V = ${rho}/${num(rl)} ≈ ${num(frac)}%.`,
        };
      },
      (r) => {
        const P = r.pick([50, 80, 100, 150, 200]), V = r.pick([0.002, 0.004, 0.005]);
        const E = 1000 * G * V;
        if (E >= P) return hidro.niveis[1][4](r);
        return {
          e: `Um objeto de peso ${P} N e volume ${num(V * 1000)} L é mergulhado completamente em água (densidade 1.000 kg/m³; g = 10 m/s²). Qual é o seu peso aparente?`,
          r: P - E,
          d: [P, E, P + E, P - E / 2],
          f: u('N'),
          x: `Empuxo = 1.000 × 10 × ${num(V, 3)} = ${num(E)} N. Peso aparente = P − E = ${P} − ${num(E)} = ${num(P - E)} N.`,
        };
      },
    ],
    [
      (r) => {
        const m1 = r.pick([20, 30, 40]), d1 = r.pick([1, 1.5, 2]), m2 = r.pick([10, 15, 20, 25]), d2 = r.pick([0.5, 1]), m3 = r.pick([40, 50, 60]);
        const d3 = (m1 * d1 - m2 * d2) / m3;
        if (d3 <= 0 || !Number.isInteger(d3 * 100)) return hidro.niveis[2][0](r);
        return {
          e: `Em uma gangorra, uma criança de ${m1} kg senta a ${num(d1)} m do apoio, do lado esquerdo. Do lado direito, uma criança de ${m2} kg senta a ${num(d2)} m do apoio. A que distância do apoio, no lado direito, deve sentar um adulto de ${m3} kg para equilibrar a gangorra?`,
          r: d3,
          d: [arred((m1 * d1) / m3, 2), arred((m1 * d1 + m2 * d2) / m3, 2), d1, arred(d3 * 2, 2)],
          f: u('m'),
          x: `Momentos: ${m1}·${num(d1)} = ${m2}·${num(d2)} + ${m3}·x ⇒ ${num(m1 * d1)} − ${num(m2 * d2)} = ${m3}x ⇒ x = ${num(d3)} m.`,
        };
      },
      (r) => {
        const frac = r.pick([20, 25, 40, 60, 75, 80, 90]);
        return {
          e: `Um objeto flutua em água (densidade 1 g/cm³) com ${frac}% do seu volume submerso. Qual é a densidade do objeto?`,
          r: frac / 100,
          d: [1 - frac / 100, frac / 10, 100 / frac, 1],
          f: u('g/cm³'),
          x: `ρ_obj = ρ_água × fração submersa = 1 × ${num(frac / 100)} = ${num(frac / 100)} g/cm³.`,
        };
      },
      (r) => {
        const [rho1, h1, rho2] = r.pick([[1, 13.6, 13.6], [0.8, 10, 1], [1, 20, 0.8], [13.6, 1, 1], [0.9, 10, 1.2]]);
        const h2 = (rho1 * h1) / rho2;
        return {
          e: `Em um tubo em U, um líquido de densidade ${num(rho1)} g/cm³ forma uma coluna de ${num(h1)} cm acima da superfície de separação. Do outro lado, há um líquido de densidade ${num(rho2)} g/cm³. Qual é a altura da coluna desse segundo líquido acima do mesmo nível?`,
          r: arred(h2, 2),
          d: [arred((rho2 * h1) / rho1, 2), h1, arred(h1 * rho1 * rho2, 2), arred(h2 * 2, 2)],
          f: u('cm'),
          x: `Mesmo nível ⇒ mesma pressão: ρ₁h₁ = ρ₂h₂ ⇒ h₂ = ${num(rho1)} × ${num(h1)}/${num(rho2)} = ${num(h2)} cm.`,
        };
      },
      (r) => {
        const A1 = r.pick([2, 4, 5]), A2 = A1 * r.pick([10, 20, 25]), d2 = r.pick([1, 2, 4, 5]);
        const d1 = (d2 * A2) / A1;
        return {
          e: `Em uma prensa hidráulica, os êmbolos têm áreas de ${A1} cm² e ${A2} cm². Para que o êmbolo maior suba ${d2} cm, quanto o menor deve descer?`,
          r: d1,
          d: [(d2 * A1) / A2, d2, d1 / 2, d2 + A2 / A1],
          f: u('cm'),
          x: `O volume de líquido deslocado é o mesmo: A₁·d₁ = A₂·d₂ ⇒ d₁ = ${A2} × ${d2}/${A1} = ${num(d1)} cm. A prensa multiplica a força, mas não o trabalho.`,
        };
      },
    ],
  ],
};

// ======================================================= Termologia
const termo = {
  disciplina: 'fisica',
  arquivo: '05-termologia',
  titulo: 'Termologia',
  provas: PROVAS,
  descricao: 'Escalas termométricas, calor sensível e latente, trocas de calor, dilatação, gases e termodinâmica.',
  niveis: [
    [
      (r) => {
        const C = r.pick([-40, -10, 0, 10, 20, 25, 30, 35, 37, 40, 100]);
        return {
          e: `Qual é a temperatura de ${C} °C na escala Fahrenheit?`,
          r: 1.8 * C + 32,
          d: [1.8 * C, C + 32, C + 273, (C - 32) / 1.8],
          f: u('°F'),
          x: `F = 1,8·C + 32 = 1,8 × ${C} + 32 = ${num(1.8 * C + 32)} °F.`,
        };
      },
      (r) => {
        const C = r.int(-50, 150);
        return {
          e: `Qual é a temperatura de ${C} °C na escala Kelvin?`,
          r: C + 273,
          d: [C - 273, C + 237, C * 1.8 + 32, 273 - C],
          f: u('K'),
          x: `T(K) = T(°C) + 273 = ${C} + 273 = ${C + 273} K.`,
        };
      },
      (r) => {
        const m = r.pick([100, 200, 250, 500, 1000]), dT = r.pick([10, 20, 30, 50, 80]);
        return {
          e: `Quantas calorias são necessárias para aquecer ${m} g de água em ${dT} °C? (calor específico da água = 1 cal/g·°C)`,
          r: m * dT,
          d: [m + dT, (m * dT) / 2, m * dT * 4.2, m / dT],
          f: u('cal'),
          x: `Q = m·c·ΔT = ${m} × 1 × ${dT} = ${num(m * dT)} cal.`,
        };
      },
      (r) => {
        const L0 = r.pick([10, 20, 50, 100]), a = r.pick([1.2e-5, 2.4e-5, 1.7e-5]), dT = r.pick([20, 30, 40, 50, 100]);
        const dL = L0 * a * dT * 1000; // mm
        return {
          e: `Um trilho de aço de ${L0} m sofre aquecimento de ${dT} °C. Sendo o coeficiente de dilatação linear ${num(a * 1e5)} × 10⁻⁵ °C⁻¹, quanto ele se dilata?`,
          r: arred(dL, 2),
          d: [arred(dL * 10, 2), arred(dL / 10, 2), arred(dL * 2, 2), arred(dL * 3, 2)],
          f: u('mm'),
          x: `ΔL = L₀·α·ΔT = ${L0} × ${num(a * 1e5)}×10⁻⁵ × ${dT} = ${num(dL / 1000, 5)} m = ${num(dL)} mm. Por isso há juntas de dilatação nos trilhos.`,
        };
      },
      (r) => {
        const [proc, nome] = r.pick([
          ['O calor do Sol chega à Terra atravessando o vácuo.', 'Irradiação'],
          ['A brisa marítima se forma porque o ar aquecido sobe e o ar mais frio ocupa o seu lugar.', 'Convecção'],
          ['O cabo metálico de uma panela esquenta quando ela está no fogo.', 'Condução'],
          ['O congelador fica na parte de cima da geladeira para facilitar a circulação do ar frio para baixo.', 'Convecção'],
          ['Uma garrafa térmica tem paredes espelhadas para reduzir as trocas de calor por ondas eletromagnéticas.', 'Irradiação'],
          ['Um piso de cerâmica parece mais frio ao toque que um tapete na mesma temperatura.', 'Condução'],
        ]);
        return {
          e: `Qual processo de propagação de calor predomina na situação: "${proc}"`,
          r: nome,
          d: ['Condução', 'Convecção', 'Irradiação', 'Sublimação', 'Dilatação'].filter((x) => x !== nome),
          x: `Condução: transferência por contato (agitação das partículas), típica de sólidos. Convecção: movimento de massas de fluido. Irradiação: ondas eletromagnéticas, até no vácuo. Resposta: ${nome}.`,
        };
      },
    ],
    [
      (r) => {
        const m = r.pick([50, 100, 200, 500]), tipo = r.pick(['fusão do gelo (L = 80 cal/g)', 'vaporização da água (L = 540 cal/g)']);
        const L = tipo.startsWith('fusão') ? 80 : 540;
        return {
          e: `Quanta energia é necessária para a ${tipo.split(' (')[0]} de ${m} g, já na temperatura de mudança de fase? (${tipo.split('(')[1].replace(')', '')})`,
          r: m * L,
          d: [m * (L === 80 ? 540 : 80), m + L, (m * L) / 2, m * L * 4.2],
          f: u('cal'),
          x: `Calor latente: Q = m·L = ${m} × ${L} = ${num(m * L)} cal. Durante a mudança de fase a temperatura não varia.`,
        };
      },
      (r) => {
        const m1 = r.pick([100, 200, 300, 400]), T1 = r.pick([10, 20, 25]), m2 = r.pick([100, 200, 300]), T2 = r.pick([60, 70, 80, 90]);
        const T = (m1 * T1 + m2 * T2) / (m1 + m2);
        return {
          e: `Misturam-se ${m1} g de água a ${T1} °C com ${m2} g de água a ${T2} °C, em um recipiente isolado. Qual é a temperatura de equilíbrio?`,
          r: arred(T, 2),
          d: [(T1 + T2) / 2, arred((m1 * T2 + m2 * T1) / (m1 + m2), 2), T2 - T1, arred(T + 5, 2)],
          f: u('°C'),
          x: `Calor cedido = calor recebido: ${m2}(${T2} − T) = ${m1}(T − ${T1}) ⇒ T = (${m1}·${T1} + ${m2}·${T2})/${m1 + m2} = ${num(T)} °C.`,
        };
      },
      (r) => {
        const tipo = r.pick(['isotérmica', 'isobárica', 'isocórica']);
        if (tipo === 'isotérmica') {
          const p1 = r.pick([1, 2, 3, 4]), V1 = r.pick([6, 10, 12, 20]), V2 = r.pick([2, 3, 4, 5]);
          return {
            e: `Um gás ideal ocupa ${V1} L a ${p1} atm. Mantendo a temperatura constante, ele é comprimido até ${V2} L. Qual passa a ser a pressão?`,
            r: arred((p1 * V1) / V2, 2),
            d: [arred((p1 * V2) / V1, 2), p1, arred(p1 * V1 * V2, 2), arred((p1 * V1) / V2 / 2, 2)],
            f: u('atm'),
            x: `Lei de Boyle: p₁V₁ = p₂V₂ ⇒ p₂ = ${p1} × ${V1}/${V2} = ${num((p1 * V1) / V2)} atm.`,
          };
        }
        if (tipo === 'isobárica') {
          const V1 = r.pick([2, 3, 4, 6]), T1 = r.pick([200, 300, 400]), T2 = r.pick([400, 600, 900]);
          return {
            e: `Um gás ideal ocupa ${V1} L a ${T1} K. Mantendo a pressão constante, ele é aquecido até ${T2} K. Qual é o novo volume?`,
            r: arred((V1 * T2) / T1, 2),
            d: [arred((V1 * T1) / T2, 2), V1, arred(V1 + (T2 - T1) / 100, 2), arred((V1 * (T2 - 273)) / (T1 - 273 || 1), 2)],
            f: u('L'),
            x: `Charles/Gay-Lussac: V₁/T₁ = V₂/T₂ ⇒ V₂ = ${V1} × ${T2}/${T1} = ${num((V1 * T2) / T1)} L. (Use sempre kelvin.)`,
          };
        }
        const p1 = r.pick([1, 2, 3]), T1 = r.pick([250, 300]), T2 = r.pick([450, 600, 750]);
        return {
          e: `Um gás ideal em um recipiente rígido está a ${p1} atm e ${T1} K. Se for aquecido até ${T2} K, qual será a nova pressão?`,
          r: arred((p1 * T2) / T1, 2),
          d: [arred((p1 * T1) / T2, 2), p1, arred(p1 + (T2 - T1) / 100, 2), arred((p1 * T2) / T1 * 2, 2)],
          f: u('atm'),
          x: `Volume constante: p₁/T₁ = p₂/T₂ ⇒ p₂ = ${p1} × ${T2}/${T1} = ${num((p1 * T2) / T1)} atm.`,
        };
      },
      (r) => {
        const m = r.pick([1, 2, 3, 5]), dT = r.pick([20, 30, 40, 50]), P = r.pick([2000, 3000, 4000, 5000, 6000]);
        const t = (m * 4200 * dT) / P;
        return {
          e: `Um aquecedor elétrico de ${num(P)} W aquece ${m} kg de água em ${dT} °C. Supondo que toda a energia vai para a água (c = 4.200 J/kg·°C), quanto tempo isso leva?`,
          r: arred(t, 2),
          d: [arred((m * dT) / P, 2), arred(t * 2, 2), arred(t / 60, 2), arred((m * 4200 * dT) / (P * 2), 2)],
          f: u('s'),
          x: `Q = m·c·ΔT = ${m} × 4.200 × ${dT} = ${num(m * 4200 * dT)} J. t = Q/P = ${num(m * 4200 * dT)}/${num(P)} = ${num(t)} s.`,
        };
      },
      (r) => {
        const Q = r.pick([500, 800, 1000, 1200]), W = r.pick([200, 300, 400, 600]);
        return {
          e: `Um gás recebe ${Q} J de calor e realiza um trabalho de ${W} J sobre o ambiente. Qual é a variação de sua energia interna?`,
          r: Q - W,
          d: [Q + W, W - Q, Q, W],
          f: u('J'),
          x: `1ª lei da termodinâmica: ΔU = Q − τ = ${Q} − ${W} = ${Q - W} J.`,
        };
      },
    ],
    [
      (r) => {
        const m = r.pick([50, 100, 200]), Ti = r.pick([-20, -10, -5]), Tf = r.pick([10, 20, 30, 50]);
        const q1 = m * 0.5 * -Ti, q2 = m * 80, q3 = m * 1 * Tf;
        return {
          e: `Quanta energia é necessária para transformar ${m} g de gelo a ${Ti} °C em água a ${Tf} °C? (c_gelo = 0,5 cal/g·°C; L_fusão = 80 cal/g; c_água = 1 cal/g·°C)`,
          r: q1 + q2 + q3,
          d: [q2 + q3, q1 + q3, m * (Tf - Ti), q1 + q2 + q3 + m * 540],
          f: u('cal'),
          x: `Aquecer o gelo: ${num(q1)} cal; fundir: ${num(q2)} cal; aquecer a água: ${num(q3)} cal. Total: ${num(q1 + q2 + q3)} cal.`,
        };
      },
      (r) => {
        const [Tq, Tf] = r.pick([[600, 300], [500, 400], [800, 200], [1000, 250], [400, 300], [727, 27]]);
        const tq = Tq === 727 ? 1000 : Tq, tf = Tf === 27 ? 300 : Tf;
        const eta = arred((1 - tf / tq) * 100, 2);
        const txt = Tq === 727 ? '727 °C e 27 °C' : `${Tq} K e ${Tf} K`;
        return {
          e: `Qual é o rendimento máximo teórico (máquina de Carnot) de uma máquina térmica que opera entre as temperaturas de ${txt}?`,
          r: eta,
          d: [arred((tf / tq) * 100, 2), arred((1 - Tf / Tq) * 100, 2) === eta ? arred(eta + 10, 2) : arred((1 - Tf / Tq) * 100, 2), 100, arred(eta / 2, 2)],
          f: (v) => `${num(v)}%`,
          x: `η = 1 − T_fria/T_quente (em kelvin) = 1 − ${tf}/${tq} = ${num(eta)}%.${Tq === 727 ? ' Atenção: converta °C para K antes (727 °C = 1.000 K; 27 °C = 300 K).' : ''}`,
        };
      },
      (r) => {
        const xg = r.pick([10, 20, -10]), xv = r.pick([60, 80, 110, 90]);
        const C = r.pick([20, 25, 40, 50, 75]);
        const X = xg + ((xv - xg) * C) / 100;
        return {
          e: `Em uma escala termométrica X, o ponto de fusão do gelo corresponde a ${xg} °X e o de ebulição da água, a ${xv} °X (ao nível do mar). Qual é a leitura na escala X de uma temperatura de ${C} °C?`,
          r: arred(X, 2),
          d: [C, arred(((xv - xg) * C) / 100, 2), arred(xg + C, 2), arred(X + 5, 2)],
          f: u('°X'),
          x: `Proporção entre escalas: (X − ${xg})/(${xv} − ${xg}) = (C − 0)/(100 − 0) ⇒ X = ${xg} + ${xv - xg} × ${C}/100 = ${num(X)} °X.`,
        };
      },
      (r) => {
        const p = r.pick([1e5, 2e5, 3e5]), V1 = r.pick([2, 3, 4]), V2 = V1 + r.pick([1, 2, 3]);
        const W = (p * (V2 - V1)) / 1000;
        return {
          e: `Um gás se expande sob pressão constante de ${num(p / 1e5)} × 10⁵ Pa, passando de ${V1} L para ${V2} L. Qual é o trabalho realizado pelo gás?`,
          r: W,
          d: [W * 1000, p * (V2 - V1), W / 10, (p * V2) / 1000],
          f: u('J'),
          x: `τ = p·ΔV = ${num(p)} × ${V2 - V1} × 10⁻³ m³ = ${num(W)} J.`,
        };
      },
      (r) => {
        const V0 = r.pick([1000, 2000, 500]), gl = r.pick([1e-3, 9e-4, 1.2e-3]), gr = r.pick([3e-5, 6e-5]), dT = r.pick([20, 30, 40, 50]);
        const ap = V0 * (gl - gr) * dT;
        return {
          e: `Um recipiente de vidro de ${V0} mL está completamente cheio de um líquido a 20 °C. O conjunto é aquecido em ${dT} °C. Sendo γ_líquido = ${num(gl * 1e4)} × 10⁻⁴ °C⁻¹ e γ_vidro = ${num(gr * 1e5)} × 10⁻⁵ °C⁻¹, quanto líquido transborda?`,
          r: arred(ap, 2),
          d: [arred(V0 * gl * dT, 2), arred(V0 * gr * dT, 2), arred(V0 * (gl + gr) * dT, 2), arred(ap * 10, 2)],
          f: u('mL'),
          x: `Dilatação aparente: ΔV_ap = V₀(γ_líq − γ_rec)ΔT = ${V0} × (${num(gl * 1e5)} − ${num(gr * 1e5)}) × 10⁻⁵ × ${dT} = ${num(ap)} mL.`,
        };
      },
    ],
  ],
};

// ======================================================= Eletricidade
const eletro = {
  disciplina: 'fisica',
  arquivo: '06-eletricidade',
  titulo: 'Eletricidade e magnetismo',
  provas: PROVAS,
  descricao: 'Lei de Ohm, potência e consumo de energia, associação de resistores, carga elétrica, lei de Coulomb e força magnética.',
  niveis: [
    [
      (r) => {
        const R = r.pick([10, 20, 22, 50, 100, 110]), i = r.pick([0.5, 1, 2, 2.5, 5]);
        return {
          e: `Um resistor de ${R} Ω é percorrido por uma corrente de ${num(i)} A. Qual é a tensão (ddp) entre seus terminais?`,
          r: R * i,
          d: [R / i, i / R, R * i * 2, R + i],
          f: u('V'),
          x: `Lei de Ohm: U = R·i = ${R} × ${num(i)} = ${num(R * i)} V.`,
        };
      },
      (r) => {
        const U = r.pick([110, 127, 220]), i = r.pick([0.5, 1, 2, 5, 10]);
        return {
          e: `Um aparelho ligado em ${U} V é percorrido por uma corrente de ${num(i)} A. Qual é a sua potência elétrica?`,
          r: U * i,
          d: [U / i, U * i * i, U + i, (U * i) / 2],
          f: u('W'),
          x: `P = U·i = ${U} × ${num(i)} = ${num(U * i)} W.`,
        };
      },
      (r) => {
        const P = r.pick([4000, 5000, 5500, 6000, 7500]), min = r.pick([10, 15, 20, 30]), dias = 30, tar = r.pick([0.6, 0.7, 0.8, 0.9]);
        const kwh = (P / 1000) * (min / 60) * dias;
        return {
          e: `Um chuveiro de ${num(P)} W é usado ${min} minutos por dia durante 30 dias. Com o kWh a ${num(tar)} reais, quanto custa esse consumo no mês?`,
          r: arred(kwh * tar, 2),
          d: [arred(P * min * dias * tar / 1000, 2), arred(kwh, 2), arred((kwh * tar) / 2, 2), arred((P / 1000) * min * tar, 2)],
          f: (v) => `R$ ${num(v, 2)}`,
          x: `Energia = P·Δt = ${num(P / 1000)} kW × ${num((min / 60) * dias)} h = ${num(kwh)} kWh. Custo = ${num(kwh)} × ${num(tar)} = R$ ${num(kwh * tar, 2)}.`,
        };
      },
      (r) => {
        const rs = Array.from({ length: r.int(2, 4) }, () => r.pick([2, 3, 4, 5, 6, 8, 10, 12, 20]));
        const s = rs.reduce((a, b) => a + b, 0);
        return {
          e: `Qual é a resistência equivalente de ${rs.length} resistores de ${rs.join(' Ω, ')} Ω associados em série?`,
          r: s,
          d: [arred(1 / rs.reduce((a, b) => a + 1 / b, 0), 2), Math.max(...rs), s / rs.length, rs.reduce((a, b) => a * b, 1) > 1000 ? s * 2 : rs.reduce((a, b) => a * b, 1)],
          f: u('Ω'),
          x: `Em série, as resistências se somam: ${rs.join(' + ')} = ${s} Ω.`,
        };
      },
    ],
    [
      (r) => {
        const [a, b] = r.pick([[6, 3], [12, 6], [4, 4], [10, 15], [20, 30], [12, 4], [6, 12]]);
        const eq = (a * b) / (a + b);
        return {
          e: `Qual é a resistência equivalente de dois resistores de ${a} Ω e ${b} Ω associados em paralelo?`,
          r: arred(eq, 2),
          d: [a + b, arred((a + b) / 2, 2), arred(eq * 2, 2), Math.min(a, b)],
          f: u('Ω'),
          x: `Em paralelo: Req = R₁·R₂/(R₁ + R₂) = ${a * b}/${a + b} = ${num(eq)} Ω (sempre menor que o menor resistor).`,
        };
      },
      (r) => {
        const U = r.pick([110, 220]), P = r.pick([2200, 4400, 5500]);
        const R = (U * U) / P;
        return {
          e: `Um chuveiro elétrico tem potência de ${num(P)} W quando ligado em ${U} V. Qual é a resistência elétrica do chuveiro?`,
          r: arred(R, 2),
          d: [arred(P / U, 2), arred(U / P * 1000, 2), arred((P * P) / U / 1000, 2), arred(R * 2, 2)],
          f: u('Ω'),
          x: `P = U²/R ⇒ R = U²/P = ${num(U * U)}/${num(P)} = ${num(R)} Ω.`,
        };
      },
      (r) => {
        const P = r.pick([2200, 3300, 4400, 5500, 6600]), U = r.pick([110, 220]);
        const i = P / U;
        return {
          e: `Qual é a corrente elétrica em um forno de ${num(P)} W ligado em ${U} V?`,
          r: i,
          d: [P * U / 1000, U / P * 100, i * 2, i / 2],
          f: u('A'),
          x: `i = P/U = ${num(P)}/${U} = ${num(i)} A. O disjuntor do circuito deve suportar essa corrente.`,
        };
      },
      (r) => {
        const i = r.pick([2, 4, 5, 8, 10]), t = r.pick([2, 4, 5, 10, 20]);
        const Q = i * t;
        return {
          e: `Um fio é percorrido por uma corrente constante de ${i} A durante ${t} s. Quantos elétrons atravessam uma seção do fio nesse intervalo? (e = 1,6 × 10⁻¹⁹ C)`,
          r: `${num(Q / 1.6)} × 10¹⁹`,
          d: [`${num(Q * 1.6)} × 10¹⁹`, `${num(Q / 1.6)} × 10¹⁸`, `${num(Q / 1.6)} × 10²⁰`, `${num(Q)} × 10¹⁹`],
          x: `Q = i·t = ${Q} C. n = Q/e = ${Q}/(1,6 × 10⁻¹⁹) = ${num(Q / 1.6)} × 10¹⁹ elétrons.`,
        };
      },
      (r) => {
        const [a, b] = r.pick([[6, 3], [12, 6], [4, 4], [10, 15], [20, 30], [12, 4]]), c = r.pick([2, 3, 5, 8, 10]);
        const eq = (a * b) / (a + b) + c;
        return {
          e: `Dois resistores de ${a} Ω e ${b} Ω estão em paralelo, e esse conjunto está em série com um resistor de ${c} Ω. Qual é a resistência equivalente do circuito?`,
          r: arred(eq, 2),
          d: [a + b + c, arred((a * b) / (a + b), 2), arred(1 / (1 / a + 1 / b + 1 / c), 2), arred(eq + c, 2)],
          f: u('Ω'),
          x: `Paralelo: ${a}·${b}/(${a} + ${b}) = ${num((a * b) / (a + b))} Ω. Somando o resistor em série: ${num(eq)} Ω.`,
        };
      },
    ],
    [
      (r) => {
        const k = r.pick([2, 3, 4, 0.5]), q = r.pick([1, 2, 3]);
        const fator = (q * q) / (k * k);
        const f = (v) => (v >= 1 ? `${num(v)} vezes maior` : `${num(1 / v)} vezes menor`);
        return {
          e: `Duas cargas puntiformes se repelem com força F. Se ${q === 1 ? 'as cargas forem mantidas' : `cada carga for multiplicada por ${q}`} e a distância entre elas for multiplicada por ${num(k)}, a nova força será:`,
          r: fator,
          d: [(q * q) / k, q / (k * k), k * k, q * q * k * k],
          f,
          x: `Coulomb: F = k·Q₁·Q₂/d². Multiplicar as cargas por ${q} multiplica F por ${q * q}; multiplicar d por ${num(k)} divide F por ${num(k * k)}. Fator: ${num(fator)}.`,
        };
      },
      (r) => {
        const eps = r.pick([6, 9, 12, 24]), rint = r.pick([0.5, 1, 2]), R = r.pick([2, 3, 4, 5, 10]);
        const i = eps / (R + rint);
        return {
          e: `Uma bateria de força eletromotriz ${eps} V e resistência interna ${num(rint)} Ω alimenta um resistor externo de ${R} Ω. Qual é a corrente no circuito?`,
          r: arred(i, 2),
          d: [arred(eps / R, 2), arred(eps / rint, 2), arred(eps * (R + rint), 2), arred(i * 2, 2)],
          f: u('A'),
          x: `Lei de Pouillet: i = ε/(R + r) = ${eps}/(${R} + ${num(rint)}) = ${num(i)} A.`,
        };
      },
      (r) => {
        const P = r.pick([60, 100, 200]), U1 = 220, U2 = 110;
        return {
          e: `Uma lâmpada de ${P} W / ${U1} V é ligada, por engano, em uma tomada de ${U2} V. Considerando a resistência constante, qual será a potência dissipada?`,
          r: P / 4,
          d: [P / 2, P, P * 2, P / 8],
          f: u('W'),
          x: `R = U²/P é a mesma. Com metade da tensão: P' = (U/2)²/R = P/4 = ${num(P / 4)} W.`,
        };
      },
      (r) => {
        const B = r.pick([0.1, 0.2, 0.5, 1, 2]), i = r.pick([2, 4, 5, 10]), L = r.pick([0.1, 0.2, 0.5, 1]);
        return {
          e: `Um fio retilíneo de ${num(L)} m, percorrido por uma corrente de ${i} A, está imerso em um campo magnético uniforme de ${num(B)} T, perpendicular ao fio. Qual é a intensidade da força magnética sobre o fio?`,
          r: arred(B * i * L, 3),
          d: [arred(B * i, 3), arred(B * L, 3), arred((B * i) / L, 3), arred(B * i * L * 2, 3)],
          f: u('N'),
          x: `F = B·i·L·sen 90° = ${num(B)} × ${i} × ${num(L)} = ${num(B * i * L)} N.`,
        };
      },
      (r) => {
        const U = r.pick([12, 24, 60, 120]), [a, b] = r.pick([[6, 3], [12, 6], [4, 4], [20, 30], [12, 4]]);
        const ia = U / a;
        const Pa = U * ia;
        return {
          e: `Dois resistores de ${a} Ω e ${b} Ω estão em paralelo, ligados a uma fonte ideal de ${U} V. Qual é a potência dissipada no resistor de ${a} Ω?`,
          r: arred(Pa, 2),
          d: [arred((U * U) / (a + b), 2), arred((U * U) / b, 2), arred(Pa / 2, 2), arred(U * a, 2)],
          f: u('W'),
          x: `Em paralelo, cada resistor recebe a tensão total (${U} V). P = U²/R = ${U * U}/${a} = ${num(Pa)} W.`,
        };
      },
    ],
  ],
};

// ======================================================= Ondulatória e óptica
const ondas = {
  disciplina: 'fisica',
  arquivo: '07-ondulatoria-e-optica',
  titulo: 'Ondulatória e óptica',
  provas: PROVAS,
  descricao: 'Equação fundamental das ondas, som, ondas eletromagnéticas, reflexão, refração, espelhos e lentes.',
  niveis: [
    [
      (r) => {
        const f = r.pick([2, 5, 10, 20, 50, 100, 440]), l = r.pick([0.5, 0.75, 1, 2, 3, 4]);
        return {
          e: `Uma onda tem frequência de ${f} Hz e comprimento de onda de ${num(l)} m. Qual é a sua velocidade de propagação?`,
          r: f * l,
          d: [f / l, l / f, f + l, f * l * 2],
          f: u('m/s'),
          x: `Equação fundamental: v = λ·f = ${num(l)} × ${f} = ${num(f * l)} m/s.`,
        };
      },
      (r) => {
        const f = r.pick([2, 4, 5, 10, 20, 50, 100]);
        return {
          e: `Qual é o período de uma onda de frequência ${f} Hz?`,
          r: 1 / f,
          d: [f, 2 / f, 1 / (2 * f), f / 10],
          f: u('s'),
          x: `T = 1/f = 1/${f} = ${num(1 / f, 3)} s.`,
        };
      },
      (r) => {
        const t = r.pick([0.2, 0.4, 0.5, 1, 2, 3]);
        return {
          e: `Uma pessoa grita em frente a um paredão e ouve o eco ${num(t)} s depois. Sendo a velocidade do som no ar 340 m/s, a que distância está o paredão?`,
          r: (340 * t) / 2,
          d: [340 * t, 340 / t, (340 * t) / 4, 340 * t * 2],
          f: u('m'),
          x: `O som vai e volta: 2d = v·t ⇒ d = 340 × ${num(t)}/2 = ${num((340 * t) / 2)} m.`,
        };
      },
      (r) => {
        const ang = r.pick([30, 36, 40, 45, 60, 72, 90, 120]);
        return {
          e: `Dois espelhos planos formam entre si um ângulo de ${ang}°. Quantas imagens de um objeto colocado entre eles são formadas?`,
          r: 360 / ang - 1,
          d: [360 / ang, 360 / ang + 1, 180 / ang, 2],
          x: `n = 360°/α − 1 = 360/${ang} − 1 = ${360 / ang - 1}.`,
        };
      },
      (r) => {
        const d = r.pick([0.5, 1, 1.5, 2, 3]);
        return {
          e: `Uma pessoa está a ${num(d)} m de um espelho plano. Qual é a distância entre a pessoa e a sua imagem?`,
          r: 2 * d,
          d: [d, d / 2, 4 * d, d + 1],
          f: u('m'),
          x: `No espelho plano, a imagem fica à mesma distância do espelho que o objeto (${num(d)} m atrás dele). Distância pessoa–imagem: ${num(2 * d)} m.`,
        };
      },
    ],
    [
      (r) => {
        const [meio, n] = r.pick([['água', 1.33], ['vidro', 1.5], ['diamante', 2.4], ['acrílico', 1.5], ['óleo', 1.25]]);
        const v = 3e5 / n;
        return {
          e: `A luz se propaga no ${meio} com índice de refração ${num(n)}. Qual é a velocidade da luz nesse meio? (c = 3 × 10⁵ km/s)`,
          r: Math.round(v),
          d: [Math.round(3e5 * n), 300000, Math.round(v / 2), Math.round(3e5 / (n + 0.5))],
          f: u('km/s'),
          x: `n = c/v ⇒ v = c/n = 300.000/${num(n)} ≈ ${num(Math.round(v))} km/s.`,
        };
      },
      (r) => {
        const fc = r.pick([10, 12, 15, 20]), p = r.pick([30, 40, 60]);
        if (p <= fc) return ondas.niveis[1][1](r);
        const pl = (fc * p) / (p - fc);
        if (!Number.isInteger(pl * 10)) return ondas.niveis[1][1](r);
        return {
          e: `Um objeto está a ${p} cm de um espelho côncavo de distância focal ${fc} cm. A que distância do espelho se forma a imagem?`,
          r: pl,
          d: [p - fc, (fc * p) / (p + fc), p + fc, pl * 2],
          f: u('cm'),
          x: `Equação de Gauss: 1/f = 1/p + 1/p' ⇒ 1/${fc} = 1/${p} + 1/p' ⇒ p' = ${num(pl)} cm (imagem real, na frente do espelho).`,
        };
      },
      (r) => {
        const [p, pl] = r.pick([[30, 15], [20, 20], [15, 30], [60, 12], [12, 60], [40, 10]]);
        const A = -pl / p;
        return {
          e: `Uma lente convergente forma, a ${pl} cm dela, a imagem real de um objeto colocado a ${p} cm. Qual é o aumento linear transversal da imagem?`,
          r: A,
          d: [-A, p / pl === -A ? A * 2 : p / pl, A * 2, pl - p === A ? A - 1 : (pl - p) / 10],
          x: `A = −p'/p = −${pl}/${p} = ${num(A)}. O sinal negativo indica imagem invertida; |A| ${Math.abs(A) > 1 ? '> 1: maior' : Math.abs(A) < 1 ? '< 1: menor' : '= 1: do mesmo tamanho'} que o objeto.`,
        };
      },
      (r) => {
        const fcm = r.pick([10, 20, 25, 40, 50, 100, -50, -25]);
        return {
          e: `Qual é a vergência (em dioptrias, "graus") de uma lente de distância focal ${fcm} cm?`,
          r: 100 / fcm,
          d: [fcm / 100, -100 / fcm, 10 / fcm, (100 / fcm) * 2],
          f: (v) => `${num(v)} di`,
          x: `V = 1/f (f em metros) = 1/${num(fcm / 100)} = ${num(100 / fcm)} di. ${fcm > 0 ? 'Lente convergente (positiva).' : 'Lente divergente (negativa), usada para miopia.'}`,
        };
      },
      (r) => {
        const fMHz = r.pick([75, 100, 150, 300, 600, 1000]);
        const l = 300 / fMHz;
        return {
          e: `Uma emissora transmite em ${fMHz} MHz. Qual é o comprimento de onda dessas ondas de rádio? (c = 3 × 10⁸ m/s)`,
          r: l,
          d: [l * 10, l / 10, fMHz / 300, l * 2],
          f: u('m'),
          x: `λ = c/f = 3 × 10⁸/(${fMHz} × 10⁶) = ${num(l)} m.`,
        };
      },
    ],
    [
      (r) => {
        const [ang1, ang2, n] = r.pick([[45, 30, '√2'], [60, 30, '√3'], [60, 45, '√6/2']]);
        return {
          e: `Um raio de luz passa do ar (n = 1) para um meio transparente, incidindo com ângulo de ${ang1}° em relação à normal e refratando com ângulo de ${ang2}°. Qual é o índice de refração do meio?`,
          r: n,
          d: ['√2', '√3', '√6/2', '√2/2', '1/2', '2'].filter((x) => x !== n),
          x: `Lei de Snell: 1 · sen ${ang1}° = n · sen ${ang2}° ⇒ n = sen ${ang1}°/sen ${ang2}° = ${n}. O raio se aproxima da normal ao entrar no meio mais refringente.`,
        };
      },
      (r) => {
        const [n, sl, ang] = r.pick([['2', '1/2', '30°'], ['√2', '√2/2', '45°'], ['2/√3', '√3/2', '60°']]);
        return {
          e: `Um material transparente tem índice de refração ${n} em relação ao ar. Qual é o ângulo limite para a reflexão total da luz que vai do material para o ar?`,
          r: ang,
          d: ['30°', '45°', '60°', '90°', '15°'].filter((x) => x !== ang),
          x: `sen L = n_menor/n_maior = 1/${n} = ${sl} ⇒ L = ${ang}. Acima desse ângulo de incidência ocorre reflexão total (princípio da fibra óptica).`,
        };
      },
      (r) => {
        const L = r.pick([0.5, 0.6, 0.8, 1]), v = r.pick([200, 240, 300, 400]), n = r.int(1, 4);
        const f = (n * v) / (2 * L);
        return {
          e: `Uma corda de violão de ${num(L)} m, presa nas duas extremidades, tem ondas que se propagam a ${v} m/s. Qual é a frequência do ${n === 1 ? 'modo fundamental (1º harmônico)' : `${n}º harmônico`}?`,
          r: f,
          d: [v / L, (n * v) / L, v / (2 * L), (n * v) / (4 * L)].filter((x) => x !== f),
          f: u('Hz'),
          x: `Corda fixa: fₙ = n·v/(2L) = ${n} × ${v}/(2 × ${num(L)}) = ${num(f)} Hz.`,
        };
      },
      (r) => {
        const L = r.pick([0.17, 0.34, 0.85, 0.5]), tipo = r.pick(['fechado', 'aberto']);
        const f = tipo === 'fechado' ? 340 / (4 * L) : 340 / (2 * L);
        return {
          e: `Um tubo sonoro ${tipo === 'fechado' ? 'fechado em uma das extremidades' : 'aberto nas duas extremidades'} tem ${num(L * 100)} cm de comprimento. Qual é a frequência do seu som fundamental? (v_som = 340 m/s)`,
          r: arred(f, 2),
          d: [arred(tipo === 'fechado' ? 340 / (2 * L) : 340 / (4 * L), 2), arred(340 / L, 2), arred(340 * L, 2), arred(f * 3, 2)],
          f: u('Hz'),
          x: tipo === 'fechado' ? `Tubo fechado: f₁ = v/(4L) = 340/(4 × ${num(L)}) = ${num(f)} Hz.` : `Tubo aberto: f₁ = v/(2L) = 340/(2 × ${num(L)}) = ${num(f)} Hz.`,
        };
      },
      (r) => {
        const fc = r.pick([10, 20, 30]), p = r.pick([5, 6, 8, 15]);
        if (p >= fc) return ondas.niveis[2][4](r);
        const pl = (fc * p) / (p - fc); // negativo: virtual
        if (!Number.isInteger(pl * 10)) return ondas.niveis[2][4](r);
        const A = -pl / p;
        return {
          e: `Um objeto é colocado a ${p} cm de uma lupa (lente convergente) de distância focal ${fc} cm. Qual é o aumento da imagem formada?`,
          r: arred(A, 2),
          d: [arred(-A, 2), arred(p / fc, 2), arred(fc / p, 2), arred(A + 1, 2)],
          f: (v) => `${num(v)} (imagem ${v > 0 ? 'direita' : 'invertida'})`,
          x: `Gauss: 1/${fc} = 1/${p} + 1/p' ⇒ p' = ${num(pl)} cm (virtual). A = −p'/p = ${num(A)}: imagem direita e ampliada, como numa lupa.`,
        };
      },
    ],
  ],
};

// ======================================================= Modelos novos e rótulos
// Cada modelo antigo ganha o rótulo da "ferramenta" usada; os novos já vêm com a explicação completa.
import EXTRAS from './fisica-extras.mjs';
import NOVOS from './fisica-novos-extras.mjs';

const FERR = {
  cinematica: [
    ['velocidade média (vm = Δs/Δt)', 'função horária do MU (s = s₀ + vt)', 'tempo no MU (t = d/v)', 'aceleração média (a = Δv/Δt)', 'queda livre (v = g·t)'],
    ['MUV (s = v₀t + at²/2)', 'equação de Torricelli', 'queda livre (h = gt²/2)', 'velocidade relativa (encontro)', 'velocidade relativa (perseguição)'],
    ['lançamento horizontal', 'lançamento vertical', 'lançamento oblíquo', 'gráfico v × t (área = deslocamento)', 'tempo de reação + frenagem'],
  ],
  dinamica: [
    ['2ª lei de Newton (F = m·a)', 'peso (P = m·g)', 'soma de forças na mesma direção', 'força de atrito (Fat = μ·N)', 'leis de Newton'],
    ['2ª lei de Newton com atrito', 'sistema de blocos (mesma aceleração)', 'peso aparente no elevador', 'soma vetorial (Pitágoras)', 'lei de Hooke (F = k·x)'],
    ['plano inclinado (P·sen θ)', 'plano inclinado com atrito', 'força centrípeta (m·v²/R)', 'máquina de Atwood', 'curva com atrito (μ·g·R = v²)'],
  ],
  energia: [
    ['energia cinética (m·v²/2)', 'energia potencial (m·g·h)', 'trabalho (τ = F·d)', 'potência (P = τ/Δt)', 'transformações de energia'],
    ['conservação da energia mecânica', 'potência útil', 'rendimento', 'impulso (F·Δt = Δ(m·v))', 'energia elástica (k·x²/2)'],
    ['conservação da energia mecânica', 'conservação da quantidade de movimento', 'energia dissipada', 'potência de uma queda d\'água', 'energia elástica → cinética'],
  ],
  hidro: [
    ['densidade (d = m/V)', 'pressão (p = F/A)', 'pressão hidrostática (d·g·h)', 'alavanca (F₁·d₁ = F₂·d₂)'],
    ['empuxo (E = d·V·g)', 'princípio de Pascal', 'pressão absoluta', 'flutuação (fração submersa)', 'peso aparente (P − E)'],
    ['equilíbrio de momentos', 'flutuação (densidade)', 'vasos comunicantes', 'prensa hidráulica (volume deslocado)'],
  ],
  termo: [
    ['conversão de escalas (°C → °F)', 'conversão de escalas (°C → K)', 'calor sensível (Q = m·c·ΔT)', 'dilatação linear (ΔL = L₀·α·ΔT)', 'propagação do calor'],
    ['calor latente (Q = m·L)', 'equilíbrio térmico (Σ Q = 0)', 'transformações gasosas', 'potência e calor (Q = P·Δt)', '1ª lei da termodinâmica (ΔU = Q − τ)'],
    ['calor sensível + latente', 'rendimento de Carnot', 'escalas termométricas', 'trabalho a pressão constante (τ = p·ΔV)', 'dilatação aparente'],
  ],
  eletro: [
    ['1ª lei de Ohm (U = R·i)', 'potência elétrica (P = U·i)', 'energia elétrica (E = P·Δt)', 'resistores em série'],
    ['resistores em paralelo', 'potência (P = U²/R)', 'potência (P = U·i)', 'carga elétrica (Q = n·e)', 'associação mista'],
    ['lei de Coulomb', 'gerador com resistência interna', 'potência com tensão diferente', 'força magnética (F = B·i·L)', 'potência em paralelo'],
  ],
  ondas: [
    ['equação da onda (v = λ·f)', 'período (T = 1/f)', 'eco (som vai e volta)', 'espelhos planos associados', 'espelho plano'],
    ['índice de refração (n = c/v)', 'equação de Gauss (espelho)', 'aumento linear', 'vergência (V = 1/f)', 'ondas eletromagnéticas (c = λ·f)'],
    ['lei de Snell', 'ângulo limite', 'cordas vibrantes', 'tubos sonoros', 'lupa (aumento)'],
  ],
};

function preparar(topico, chave) {
  topico.niveis = topico.niveis.map((nivel, n) => {
    const antigos = nivel.map((fn, k) => {
      const w = (r) => {
        const q = fn(r);
        if (!String(q.x).startsWith('Ferramenta')) q.x = `Ferramenta: ${FERR[chave][n][k]}. ${q.x}`;
        return q;
      };
      if (k < 3) w.vezes = 2;
      return w;
    });
    // as chamadas recursivas internas (nivel[k](r)) passam a usar a versão com rótulo
    antigos.forEach((w, k) => (nivel[k] = w));
    return [...antigos, ...EXTRAS[chave][n], ...novos(NOVOS[chave][n])];
  });
  topico.unico = true;
  return topico;
}

void nome;
export default [
  preparar(cinematica, 'cinematica'),
  preparar(dinamica, 'dinamica'),
  preparar(energia, 'energia'),
  preparar(hidro, 'hidro'),
  preparar(termo, 'termo'),
  preparar(eletro, 'eletro'),
  preparar(ondas, 'ondas'),
];
