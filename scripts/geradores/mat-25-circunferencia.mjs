// Matemática — Circunferência e círculo: arcos, ângulos, cordas, setores e polígonos inscritos (Geometria).
import { expl, fracao, mdc, num } from './util.mjs';

const N = (v, c = null) => num(v, c);
const pi = (k) => (k === 1 ? 'π' : `${N(k)}π`); // kπ
const piFr = (n, d) => { const g = mdc(n, d); n /= g; d /= g; return d === 1 ? pi(n) : `${n === 1 ? '' : n}π/${d}`; };
const r2 = (v) => Math.round(v * 100) / 100;

const facil = [
  // 1. comprimento
  (r) => {
    const raio = r.int(2, 30);
    return {
      e: `Qual é o comprimento de uma circunferência de raio ${raio} cm? (Use π = 3,14.)`,
      r: 2 * 3.14 * raio,
      d: [3.14 * raio, 3.14 * raio * raio, 2 * raio, 4 * 3.14 * raio],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('C = 2πr', 'O comprimento da circunferência é um pouco mais que 6 vezes o raio.', `2 · 3,14 · ${raio} = ${N(r2(2 * 3.14 * raio))} cm.`),
    };
  },
  // 2. área do círculo
  (r) => {
    const d = 2 * r.int(2, 10);
    return {
      e: `Uma pizza circular tem ${d} cm de diâmetro. Qual é a sua área, em função de π?`,
      r: pi((d / 2) ** 2),
      d: [pi(d * d), pi(d), pi(d / 2), pi(d * d / 2)],
      x: expl('A = πr²', 'A fórmula usa o raio, que é metade do diâmetro.', `r = ${d / 2} cm; A = π · ${d / 2}² = ${pi((d / 2) ** 2)} cm².`),
    };
  },
  // 3. ângulo inscrito
  (r) => {
    const c = 2 * r.int(20, 80);
    return {
      e: `Numa circunferência, um ângulo central mede ${c}°. Quanto mede um ângulo inscrito que enxerga o mesmo arco?`,
      r: c / 2,
      d: [c, 2 * c, 180 - c / 2, 90 - c / 2],
      f: (v) => `${N(v)}°`,
      x: expl('ângulo inscrito = metade do central', 'O ângulo inscrito (vértice na circunferência) mede metade do arco que ele enxerga; o central mede o arco inteiro.', `${c}° ÷ 2 = ${c / 2}°.`),
    };
  },
  // 4. inscrito no semicírculo
  (r) => {
    const a = r.int(20, 70);
    return {
      e: `Um triângulo ABC está inscrito numa circunferência, e o lado AB é um diâmetro. Se o ângulo  mede ${a}°, quanto mede B̂?`,
      r: 90 - a,
      d: [a, 180 - a, 2 * a, 90 + a],
      f: (v) => `${v}°`,
      x: expl('ângulo inscrito num semicírculo é reto', 'O ângulo em C enxerga um arco de 180°, então mede 90°.', `B̂ = 180° − 90° − ${a}° = ${90 - a}°.`),
    };
  },
  // 5. comprimento de arco
  (r) => {
    const [ang, raio] = r.pick([[60, 6], [90, 4], [120, 3], [45, 8], [30, 12], [150, 6]]);
    const k = (ang * raio * 2) / 360;
    return {
      e: `Qual é o comprimento de um arco de ${ang}° numa circunferência de raio ${raio} cm?`,
      r: pi(k),
      d: [pi(2 * raio), pi((ang * raio * raio) / 360), pi(k * 2), pi(k / 2)],
      x: expl('regra de três com a volta inteira', `A volta toda (360°) mede 2π · ${raio} = ${pi(2 * raio)}; o arco é a fração ${ang}/360 disso.`, `${ang}/360 · ${pi(2 * raio)} = ${pi(k)} cm.`),
    };
  },
  // 6. área de setor
  (r) => {
    const [ang, raio] = r.pick([[90, 4], [60, 6], [120, 3], [45, 4], [30, 6], [72, 5]]);
    const k = (ang * raio * raio) / 360;
    return {
      e: `Qual é a área de um setor circular de ${ang}° num círculo de raio ${raio} cm?`,
      r: pi(k),
      d: [pi(raio * raio), pi((ang * 2 * raio) / 360), pi(2 * k), pi(k + 1)],
      x: expl('fração do círculo', `O setor é ${ang}/360 do círculo, cuja área é π · ${raio}² = ${pi(raio * raio)}.`, `${ang}/360 · ${pi(raio * raio)} = ${pi(k)} cm².`),
    };
  },
  // 7. diâmetro pelo comprimento
  (r) => {
    const d = r.int(5, 40);
    const c = 3.14 * d;
    return {
      e: `Uma roda tem ${N(r2(c))} cm de contorno. Qual é o seu diâmetro? (Use π = 3,14.)`,
      r: d,
      d: [d / 2, 2 * d, c / 2, d + 3],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('C = π · d', 'O comprimento é π vezes o diâmetro.', `d = ${N(r2(c))} ÷ 3,14 = ${d} cm.`),
    };
  },
  // 8. coroa circular
  (r) => {
    const R = r.int(4, 10), rr = r.int(2, R - 1);
    return {
      e: `Qual é a área da coroa circular entre duas circunferências concêntricas de raios ${R} cm e ${rr} cm?`,
      r: pi(R * R - rr * rr),
      d: [pi((R - rr) ** 2), pi(R * R + rr * rr), pi(2 * (R - rr)), pi(R * R)],
      x: expl('área maior menos área menor', 'A coroa é o "anel": círculo grande sem o pequeno.', `π · ${R}² − π · ${rr}² = ${pi(R * R - rr * rr)} cm².`),
    };
  },
  // 9. voltas de uma roda
  (r) => {
    const raio = r.pick([30, 35, 25, 40]), v = r.pick([100, 200, 500, 1000]);
    const dist = (2 * 3.14 * raio * v) / 100;
    return {
      e: `Uma roda de bicicleta tem ${raio} cm de raio. Que distância a bicicleta percorre quando a roda dá ${v} voltas? (Use π = 3,14.)`,
      r: dist,
      d: [dist / 2, dist * 10, (3.14 * raio * raio * v) / 10000, dist + raio],
      f: (x) => `${N(r2(x))} m`,
      x: expl('uma volta = um comprimento de circunferência', `Cada volta avança 2π · ${raio} = ${N(2 * 3.14 * raio)} cm.`, `${v} × ${N(2 * 3.14 * raio)} cm = ${N(2 * 3.14 * raio * v)} cm = ${N(r2(dist))} m.`),
    };
  },
  // 10. tangente de ponto externo
  (r) => {
    const [a, b, c] = r.pick([[5, 12, 13], [3, 4, 5], [8, 15, 17], [6, 8, 10], [7, 24, 25]]);
    return {
      e: `Um ponto P está a ${c} cm do centro de uma circunferência de raio ${a} cm. Por P, traça-se uma reta tangente à circunferência. Qual é a distância de P ao ponto de tangência?`,
      r: b,
      d: [c - a, c + a, Math.round(Math.sqrt(c * c + a * a) * 10) / 10, b + 1],
      f: (v) => `${N(v)} cm`,
      x: expl('tangente ⊥ raio', 'A reta tangente é perpendicular ao raio no ponto de tangência: forma-se um triângulo retângulo com hipotenusa OP.', `t² = ${c}² − ${a}² = ${b * b} ⇒ t = ${b} cm.`),
    };
  },
  // 11. inscritos no mesmo arco
  (r) => {
    const a = r.int(25, 75);
    return {
      e: `Os pontos A, B, C e D estão numa circunferência, com C e D do mesmo lado da corda AB. Se o ângulo AĈB mede ${a}°, quanto mede AD̂B?`,
      r: a,
      d: [2 * a, 180 - a, a / 2, 90 - a],
      f: (v) => `${N(v)}°`,
      x: expl('inscritos que enxergam o mesmo arco', 'Ângulos inscritos que "olham" para o mesmo arco AB têm a mesma medida: metade do arco.', `AD̂B = AĈB = ${a}°.`),
    };
  },
  // 12. hexágono inscrito
  (r) => {
    const raio = r.int(3, 15);
    return {
      e: `Um hexágono regular está inscrito numa circunferência de raio ${raio} cm. Qual é o perímetro do hexágono?`,
      r: 6 * raio,
      d: [3 * raio, 12 * raio, 2 * 3.14 * raio, 6 * raio + 6],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('lado do hexágono = raio', 'O hexágono regular se divide em 6 triângulos equiláteros com vértice no centro: cada lado mede o raio.', `6 × ${raio} = ${6 * raio} cm.`),
    };
  },
  // 13. quadrado inscrito
  (r) => {
    const raio = r.int(2, 12);
    return {
      e: `Um quadrado está inscrito numa circunferência de raio ${raio} cm. Quanto mede o lado do quadrado?`,
      r: `${raio}√2 cm`,
      d: [`${2 * raio} cm`, `${raio} cm`, `${2 * raio}√2 cm`, `${raio}√3 cm`],
      x: expl('diagonal do quadrado = diâmetro', `A diagonal mede ${2 * raio} cm e, num quadrado, diagonal = lado · √2.`, `lado = ${2 * raio}/√2 = ${raio}√2 cm.`),
    };
  },
  // 14. fatias de pizza
  (r) => {
    const n = r.pick([5, 6, 8, 9, 10, 12]);
    return {
      e: `Uma pizza é cortada em ${n} fatias iguais, todas com a ponta no centro. Quanto mede o ângulo da ponta de cada fatia?`,
      r: 360 / n,
      d: [180 / n, 360 / (n + 1), 90 / n * 2 === 360 / n ? 45 : 90, 360 - 360 / n],
      f: (v) => `${N(r2(v))}°`,
      x: expl('volta completa = 360°', 'Os ângulos centrais das fatias somam uma volta inteira.', `360° ÷ ${n} = ${N(r2(360 / n))}°.`),
    };
  },
  // 15. ângulo entre ponteiros em hora cheia
  (r) => {
    const h = r.int(1, 5);
    return {
      e: `Qual é o menor ângulo formado pelos ponteiros de um relógio às ${h} horas em ponto?`,
      r: 30 * h,
      d: [15 * h, 6 * h, 360 - 30 * h, 30 * h + 30],
      f: (v) => `${v}°`,
      x: expl('cada hora vale 30°', 'O mostrador tem 12 horas em 360°: 360 ÷ 12 = 30° entre duas marcas de hora.', `${h} × 30° = ${30 * h}°.`),
    };
  },
  // 16. graus para radianos
  (r) => {
    const g = r.pick([30, 45, 60, 120, 135, 150, 210, 270]);
    return {
      e: `Quanto vale ${g}° em radianos?`,
      r: piFr(g, 180),
      d: [piFr(g, 360), piFr(g * 2, 180), piFr(180, g), piFr(g + 30, 180)],
      x: expl('180° = π rad', 'Faça uma regra de três: multiplique por π e divida por 180.', `${g} · π/180 = ${piFr(g, 180)} rad.`),
    };
  },
  // 17. corda e distância ao centro
  (r) => {
    const [a, b, c] = r.pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
    return {
      e: `Numa circunferência de raio ${c} cm, uma corda está a ${a} cm do centro. Quanto mede essa corda?`,
      r: 2 * b,
      d: [b, c + a, 2 * c, 2 * b + 2],
      f: (v) => `${N(v)} cm`,
      x: expl('perpendicular do centro divide a corda ao meio', `O raio até a ponta da corda, a distância ${a} e a meia-corda formam um triângulo retângulo.`, `meia-corda = √(${c}² − ${a}²) = ${b}; corda = ${2 * b} cm.`),
    };
  },
];

const medio = [
  // 1. cordas que se cruzam
  (r) => {
    const [a, b, c] = r.pick([[4, 6, 3], [2, 9, 3], [5, 8, 4], [3, 10, 5], [6, 4, 8]]);
    const d = (a * b) / c;
    return {
      e: `Duas cordas AB e CD de uma circunferência se cortam no ponto P. Sabendo que PA = ${a}, PB = ${b} e PC = ${c}, quanto mede PD?`,
      r: d,
      d: [(a * c) / b, a + b - c, (b * c) / a, d + 1],
      f: (v) => N(r2(v)),
      x: expl('potência de ponto (cordas)', 'Quando duas cordas se cruzam, o produto dos pedaços de uma é igual ao da outra: PA · PB = PC · PD.', `${a} · ${b} = ${c} · PD ⇒ PD = ${N(r2(d))}.`),
    };
  },
  // 2. secante e tangente
  (r) => {
    const [pa, pb] = r.pick([[4, 9], [2, 8], [3, 12], [1, 16], [4, 25]]);
    return {
      e: `De um ponto P externo a uma circunferência, traçam-se uma tangente PT e uma secante que corta a circunferência em A e B (com A entre P e B). Se PA = ${pa} e PB = ${pb}, quanto mede PT?`,
      r: Math.sqrt(pa * pb),
      d: [(pa + pb) / 2, pb - pa, pa * pb, Math.sqrt(pb * pb - pa * pa) % 1 === 0 ? Math.sqrt(pb * pb - pa * pa) : Math.sqrt(pa * pb) + 1],
      f: (v) => N(r2(v)),
      x: expl('potência de ponto (tangente)', 'PT² = PA · PB: a tangente ao quadrado é igual ao produto da secante inteira pela parte externa.', `PT² = ${pa} · ${pb} = ${pa * pb} ⇒ PT = ${Math.sqrt(pa * pb)}.`),
    };
  },
  // 3. ângulo excêntrico interno
  (r) => {
    const a1 = r.int(40, 140), a2 = r.int(20, 120);
    if ((a1 + a2) % 2 || a1 + a2 >= 300) return medio[2](r);
    return {
      e: `Duas cordas se cruzam dentro de uma circunferência. Os arcos compreendidos pelo ângulo formado e pelo seu oposto medem ${a1}° e ${a2}°. Quanto mede esse ângulo?`,
      r: (a1 + a2) / 2,
      d: [Math.abs(a1 - a2) / 2, a1 + a2, a1 / 2, 180 - (a1 + a2) / 2],
      f: (v) => `${N(v)}°`,
      x: expl('ângulo excêntrico interior', 'Com o vértice dentro do círculo, o ângulo é a média dos dois arcos.', `(${a1}° + ${a2}°)/2 = ${(a1 + a2) / 2}°.`),
    };
  },
  // 4. ângulo excêntrico externo
  (r) => {
    const a1 = r.int(100, 200), a2 = r.int(20, 80);
    if ((a1 - a2) % 2) return medio[3](r);
    return {
      e: `Duas secantes partem de um ponto externo a uma circunferência. Os arcos que elas determinam medem ${a1}° (o mais afastado) e ${a2}° (o mais próximo). Quanto mede o ângulo entre as secantes?`,
      r: (a1 - a2) / 2,
      d: [(a1 + a2) / 2, a1 - a2, a1 / 2, a2],
      f: (v) => `${N(v)}°`,
      x: expl('ângulo excêntrico exterior', 'Com o vértice fora do círculo, o ângulo é a metade da diferença entre os arcos.', `(${a1}° − ${a2}°)/2 = ${(a1 - a2) / 2}°.`),
    };
  },
  // 5. quadrilátero inscrito
  (r) => {
    const a = r.int(50, 130);
    return {
      e: `Um quadrilátero ABCD está inscrito numa circunferência. Se o ângulo  mede ${a}°, quanto mede o ângulo Ĉ?`,
      r: 180 - a,
      d: [a, 360 - a, 90 - a / 2, a / 2],
      f: (v) => `${v}°`,
      x: expl('ângulos opostos suplementares', 'Num quadrilátero inscrito, ângulos opostos somam 180°, porque juntos enxergam a circunferência inteira.', `Ĉ = 180° − ${a}° = ${180 - a}°.`),
    };
  },
  // 6. relógio com minutos
  (r) => {
    const h = r.int(1, 10), mi = r.pick([10, 15, 20, 30, 40]);
    let ang = Math.abs(30 * h + 0.5 * mi - 6 * mi);
    if (ang > 180) ang = 360 - ang;
    return {
      e: `Qual é o menor ângulo formado pelos ponteiros de um relógio às ${h}h${String(mi).padStart(2, '0')}?`,
      r: ang,
      d: [Math.abs(30 * h - 6 * mi) > 180 ? 360 - Math.abs(30 * h - 6 * mi) : Math.abs(30 * h - 6 * mi), ang + 15, 360 - ang, ang + 30],
      f: (v) => `${N(v)}°`,
      x: expl('o ponteiro das horas também anda', `Em cada minuto, o ponteiro dos minutos anda 6° e o das horas anda 0,5°. Às ${h}h${String(mi).padStart(2, '0')}: horas em ${N(30 * h + 0.5 * mi)}°, minutos em ${6 * mi}° (a partir do 12).`, `Diferença: ${N(ang)}°.`),
    };
  },
  // 7. setor pelo arco
  (r) => {
    const raio = r.int(4, 12), L = r.int(3, 15);
    return {
      e: `Um setor circular tem raio ${raio} cm e arco de ${L} cm. Qual é a área do setor?`,
      r: (L * raio) / 2,
      d: [L * raio, (L * raio * raio) / 2, (L + raio) / 2 * raio, L * raio / 4],
      f: (v) => `${N(v)} cm²`,
      x: expl('A = L · r / 2', 'O setor funciona como um "triângulo" de base L (o arco) e altura r.', `${L} · ${raio}/2 = ${N((L * raio) / 2)} cm².`),
    };
  },
  // 8. triângulo equilátero inscrito
  (r) => {
    const raio = r.int(2, 10);
    return {
      e: `Um triângulo equilátero está inscrito numa circunferência de raio ${raio} cm. Quanto mede o lado do triângulo?`,
      r: `${raio}√3 cm`,
      d: [`${raio}√2 cm`, `${2 * raio} cm`, `${raio * 3} cm`, `${raio}√3/2 cm`],
      x: expl('lado do triângulo inscrito = r√3', 'No triângulo equilátero, o centro fica a 2/3 da altura: r = (2/3)·(l√3/2) = l√3/3.', `l = r√3 = ${raio}√3 cm.`),
    };
  },
  // 9. circunferência inscrita no triângulo retângulo
  (r) => {
    const [b, c, a] = r.pick([[6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]]);
    return {
      e: `Qual é o raio da circunferência inscrita num triângulo retângulo de catetos ${b} cm e ${c} cm?`,
      r: (b + c - a) / 2,
      d: [a / 2, (b + c) / 4, (b * c) / (2 * a), (b + c - a) / 2 + 1],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('r = (b + c − a)/2', `A hipotenusa mede ${a}. As tangentes a partir de cada vértice são iguais, o que leva a r = (b + c − a)/2.`, `(${b} + ${c} − ${a})/2 = ${(b + c - a) / 2} cm.`),
    };
  },
  // 10. circunscrita ao triângulo retângulo
  (r) => {
    const [b, c, a] = r.pick([[6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 40, 41], [12, 16, 20]]);
    return {
      e: `Um triângulo retângulo tem catetos de ${b} cm e ${c} cm e está inscrito numa circunferência. Qual é o raio dessa circunferência?`,
      r: a / 2,
      d: [a, (b + c) / 2, (b + c - a) / 2, a / 2 + 1],
      f: (v) => `${N(v)} cm`,
      x: expl('hipotenusa = diâmetro', 'O ângulo reto é inscrito e enxerga um arco de 180°: a hipotenusa é um diâmetro.', `Hipotenusa ${a}; raio ${N(a / 2)} cm.`),
    };
  },
  // 11. polias
  (r) => {
    const [r1, r2b] = r.pick([[10, 25], [8, 20], [15, 45], [6, 18], [12, 30]]);
    const rpm = r.pick([300, 600, 900, 1200]);
    return {
      e: `Duas polias, de raios ${r1} cm e ${r2b} cm, estão ligadas por uma correia que não desliza. A menor gira a ${rpm} rotações por minuto. Quantas rotações por minuto faz a maior?`,
      r: (rpm * r1) / r2b,
      d: [(rpm * r2b) / r1, rpm, rpm - (r2b - r1), (rpm * r1) / r2b / 2],
      f: (v) => N(r2(v)),
      x: expl('a correia percorre a mesma distância', 'Os pontos da borda das duas polias andam a mesma distância: rotações × raio é igual nas duas.', `${rpm} × ${r1} = n × ${r2b} ⇒ n = ${N(r2((rpm * r1) / r2b))} rpm.`),
    };
  },
  // 12. segmento circular
  (r) => {
    const raio = r.pick([2, 4, 6]);
    return {
      e: `Num círculo de raio ${raio} cm, uma corda liga as pontas de dois raios perpendiculares. Qual é a área da região entre essa corda e o arco menor?`,
      r: `${pi((raio * raio) / 4).replace(/^1π/, 'π')} − ${(raio * raio) / 2} cm²`,
      d: [`${pi((raio * raio) / 4)} cm²`, `${pi(raio * raio)} − ${raio * raio} cm²`, `${pi((raio * raio) / 4)} + ${(raio * raio) / 2} cm²`, `${(raio * raio) / 2} cm²`],
      x: expl('setor menos triângulo', `O setor de 90° tem área π·${raio}²/4 = ${pi((raio * raio) / 4)}; o triângulo retângulo formado pelos raios tem área ${raio}·${raio}/2 = ${(raio * raio) / 2}.`, `Segmento circular = ${pi((raio * raio) / 4)} − ${(raio * raio) / 2} cm².`),
    };
  },
  // 13. tangentes de um ponto externo
  (r) => {
    const t = r.int(5, 15), outros = r.int(3, 9);
    return {
      e: `De um ponto P, traçam-se duas retas tangentes a uma circunferência, nos pontos A e B. Se PA = ${t} cm, e uma terceira tangente corta PA em M e PB em N, formando o triângulo PMN, qual é o perímetro desse triângulo?`,
      r: 2 * t,
      d: [t, 3 * t, 2 * t + outros, t + outros],
      f: (v) => `${N(v)} cm`,
      x: expl('tangentes de um mesmo ponto são iguais', 'MA = MQ e NB = NQ (Q é o ponto de tangência da terceira reta). Assim, PM + MN + NP = PM + MA + BN + NP = PA + PB.', `${t} + ${t} = ${2 * t} cm.`),
    };
  },
  // 14. quadrado menos círculo inscrito
  (r) => {
    const l = 2 * r.int(2, 10);
    const area = l * l - 3.14 * (l / 2) ** 2;
    return {
      e: `Um círculo está inscrito num quadrado de lado ${l} cm. Qual é a área da parte do quadrado que fica fora do círculo? (Use π = 3,14.)`,
      r: area,
      d: [l * l - 3.14 * l * l, 3.14 * (l / 2) ** 2, l * l - 2 * 3.14 * (l / 2), area / 4],
      f: (v) => `${N(r2(v))} cm²`,
      x: expl('área do quadrado menos a do círculo', `O diâmetro do círculo é o lado do quadrado: raio ${l / 2}.`, `${l * l} − 3,14 · ${(l / 2) ** 2} = ${N(r2(area))} cm².`),
    };
  },
  // 15. raio pelo arco
  (r) => {
    const ang = r.pick([60, 90, 120, 180]), raio = (ang === 90 || ang === 180 ? 2 : 3) * r.int(1, 5);
    const k = (ang * 2 * raio) / 360;
    return {
      e: `Um arco de ${ang}° mede ${piFr(ang * raio, 180)} cm. Qual é o raio da circunferência?`,
      r: raio,
      d: [2 * raio, raio / 2, k, raio + 2],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('arco = (ângulo/360) · 2πr', `${piFr(ang * raio, 180)} = ${ang}/360 · 2πr.`, `r = ${raio} cm.`),
    };
  },
  // 16. pista de atletismo
  (r) => {
    const d = r.pick([1, 1.2, 1.25]);
    return {
      e: `Numa pista com curvas semicirculares, as raias têm ${N(d)} m de largura. Numa volta completa (as duas curvas formam uma circunferência inteira), quantos metros a mais corre o atleta da raia vizinha, mais externa? (Use π = 3,14.)`,
      r: 2 * 3.14 * d,
      d: [3.14 * d, d, 4 * 3.14 * d, 2 * d],
      f: (v) => `${N(r2(v))} m`,
      x: expl('a diferença não depende do raio', `2π(R + ${N(d)}) − 2πR = 2π · ${N(d)}.`, `2 · 3,14 · ${N(d)} = ${N(r2(2 * 3.14 * d))} m. Por isso as largadas são escalonadas.`),
    };
  },
  // 17. voltas para 1 km
  (r) => {
    const d = r.pick([50, 60, 70, 80]);
    const v = 100000 / (3.14 * d);
    return {
      e: `Uma roda de ${d} cm de diâmetro rola sem deslizar por 1 km. Quantas voltas completas ela dá, aproximadamente? (Use π = 3,14.)`,
      r: Math.floor(v),
      d: [Math.floor(v / 2), Math.floor(v * 2), Math.floor(100000 / d), Math.floor(v) + 10],
      x: expl('distância ÷ comprimento da roda', `Uma volta = π · ${d} = ${N(3.14 * d)} cm; 1 km = 100 000 cm.`, `100 000 ÷ ${N(3.14 * d)} ≈ ${N(r2(v))}: ${Math.floor(v)} voltas completas.`),
    };
  },
];

const dificil = [
  // 1. quadrilátero circunscrito (Pitot)
  (r) => {
    const a = r.int(5, 12), b = r.int(6, 14), c = r.int(4, 10);
    const d = a + c - b;
    if (d <= 1) return dificil[0](r);
    return {
      e: `Um quadrilátero ABCD está circunscrito a uma circunferência (todos os lados tangentes a ela). Se AB = ${a}, BC = ${b} e CD = ${c}, quanto mede DA?`,
      r: d,
      d: [b + c - a, a + b - c, (a + b + c) / 3, d + 2].map((v) => (v > 0 ? v : d + 4)),
      f: (v) => N(r2(v)),
      x: expl('teorema de Pitot', 'Num quadrilátero circunscrito, as somas dos lados opostos são iguais: AB + CD = BC + DA (cada vértice tem duas tangentes iguais).', `${a} + ${c} = ${b} + DA ⇒ DA = ${d}.`),
    };
  },
  // 2. área do triângulo equilátero inscrito
  (r) => {
    const raio = r.int(2, 8);
    const k = (3 * raio * raio) / 4;
    return {
      e: `Qual é a área de um triângulo equilátero inscrito numa circunferência de raio ${raio} cm?`,
      r: `${N(k)}√3 cm²`,
      d: [`${N((raio * raio * 3) / 2)}√3 cm²`, `${N(raio * raio)}√3 cm²`, `${N(k)} cm²`, `${N(k / 3)}√3 cm²`],
      x: expl('lado r√3 e área l²√3/4', `O lado é ${raio}√3, então l² = ${3 * raio * raio}.`, `Área = ${3 * raio * raio}√3/4 = ${N(k)}√3 cm².`),
    };
  },
  // 3. tangente comum externa
  (r) => {
    const [R, rr] = r.pick([[9, 4], [16, 1], [8, 2], [25, 4], [18, 2]]);
    return {
      e: `Duas circunferências de raios ${R} cm e ${rr} cm são tangentes externamente. Qual é o comprimento do segmento de uma tangente comum externa, entre os dois pontos de tangência?`,
      r: 2 * Math.sqrt(R * rr),
      d: [R + rr, R - rr, Math.sqrt(R * rr), 2 * (R + rr)],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('trapézio retângulo e Pitágoras', `A distância entre os centros é ${R} + ${rr} = ${R + rr}. O segmento tangente é cateto de um triângulo retângulo com hipotenusa ${R + rr} e outro cateto ${R} − ${rr} = ${R - rr}.`, `√(${R + rr}² − ${R - rr}²) = √${4 * R * rr} = ${2 * Math.sqrt(R * rr)} cm.`),
    };
  },
  // 4. ângulo entre as tangentes
  (r) => {
    const arco = 2 * r.int(30, 80);
    return {
      e: `De um ponto P, traçam-se duas tangentes a uma circunferência, tocando-a em A e B. O arco menor AB mede ${arco}°. Quanto mede o ângulo APB?`,
      r: 180 - arco,
      d: [arco, arco / 2, 360 - arco, 90 - arco / 2],
      f: (v) => `${N(v)}°`,
      x: expl('quadrilátero com dois ângulos retos', `No quadrilátero PAOB, os ângulos em A e B são retos (tangente ⊥ raio) e o ângulo central AÔB = ${arco}°.`, `APB = 360° − 90° − 90° − ${arco}° = ${180 - arco}°.`),
    };
  },
  // 5. círculo inscrito no hexágono
  (r) => {
    const l = 2 * r.int(1, 6);
    return {
      e: `Qual é a área do círculo inscrito num hexágono regular de lado ${l} cm?`,
      r: pi((3 * l * l) / 4),
      d: [pi(l * l), pi((l * l) / 4), pi((3 * l * l) / 2), pi(3 * l * l)],
      x: expl('apótema do hexágono', `O raio do círculo inscrito é a altura de um dos 6 triângulos equiláteros: ${l}√3/2.`, `Área = π · (${l}√3/2)² = π · ${(3 * l * l) / 4} = ${pi((3 * l * l) / 4)} cm².`),
    };
  },
  // 6. raio circunscrito ao 13-14-15
  (r) => {
    const [a, b, c, area] = r.pick([[13, 14, 15, 84], [5, 5, 6, 12], [10, 10, 12, 48], [6, 25, 29, 60]]);
    const R = (a * b * c) / (4 * area);
    const g = mdc(a * b * c, 4 * area);
    return {
      e: `Um triângulo de lados ${a}, ${b} e ${c} tem área ${area}. Qual é o raio da circunferência circunscrita a ele?`,
      r: fracao(a * b * c, 4 * area),
      d: [fracao(a * b * c, 2 * area), fracao(2 * area, a + b + c), fracao(Math.max(a, b, c), 2), fracao(a * b * c, 4 * area + 4)],
      x: expl('R = abc/(4·Área)', 'Essa fórmula liga os lados, a área e o raio da circunscrita.', `R = ${a} · ${b} · ${c}/(4 · ${area}) = ${a * b * c}/${4 * area} = ${fracao(a * b * c, 4 * area)}.${g ? '' : ''}`),
    };
  },
  // 7. raio inscrito por área e semiperímetro
  (r) => {
    const [a, b, c, area] = r.pick([[13, 14, 15, 84], [5, 5, 6, 12], [10, 10, 12, 48], [9, 10, 17, 36]]);
    const s = (a + b + c) / 2;
    return {
      e: `Um triângulo de lados ${a}, ${b} e ${c} tem área ${area}. Qual é o raio da circunferência inscrita nele?`,
      r: area / s,
      d: [(2 * area) / (a + b + c) * 2, area / (a + b + c), (a * b * c) / (4 * area), area / s + 1],
      f: (v) => N(r2(v)),
      x: expl('Área = r · p (p = semiperímetro)', 'O triângulo se divide em três triângulos com altura r e bases nos lados.', `p = ${N(s)}; r = ${area}/${N(s)} = ${N(r2(area / s))}.`),
    };
  },
  // 8. coroa com corda tangente
  (r) => {
    const c = 2 * r.int(3, 10);
    return {
      e: `Duas circunferências são concêntricas. Uma corda da maior, de ${c} cm, é tangente à menor. Qual é a área da coroa circular entre elas?`,
      r: pi((c / 2) ** 2),
      d: [pi(c * c), pi(c), pi((c * c) / 2), pi(c / 2)],
      x: expl('não precisa dos raios', `Com raios R e r, a meia-corda mede ${c / 2} e forma um triângulo retângulo: R² − r² = ${c / 2}².`, `Coroa = π(R² − r²) = π · ${(c / 2) ** 2} = ${pi((c / 2) ** 2)} cm².`),
    };
  },
  // 9. ponteiros sobrepostos
  (r) => {
    const h = r.int(1, 10);
    const minutos = (60 * h) / 11; // 30h + 0,5m = 6m ⇒ m = 60h/11
    const inteiro = Math.floor(minutos), resto = Math.round((minutos - inteiro) * 11);
    return {
      e: `Entre ${h}h e ${h + 1}h, em que instante os ponteiros das horas e dos minutos ficam exatamente um sobre o outro?`,
      r: `${h}h ${inteiro} ${resto}/11 min`,
      d: [`${h}h ${5 * h} min`, `${h}h ${inteiro + 1} min`, `${h}h ${inteiro} min`, `${h}h ${inteiro} ${(resto + 3) % 11 || 1}/11 min`],
      x: expl('velocidades dos ponteiros', 'O ponteiro dos minutos anda 6° por minuto e o das horas, 0,5°. Às h horas, o das horas está em 30h graus.', `6m = ${30 * h} + 0,5m ⇒ m = ${60 * h}/11 = ${inteiro} ${resto}/11 min.`),
    };
  },
  // 10. lados do polígono pelo ângulo central
  (r) => {
    const n = r.pick([8, 9, 10, 12, 15, 18, 20, 24]);
    return {
      e: `O ângulo central de um polígono regular inscrito numa circunferência mede ${N(360 / n)}°. Quantos lados tem o polígono?`,
      r: n,
      d: [n / 2, 2 * n, 180 / (360 / n) === n ? n + 1 : 180 / (360 / n), n + 2],
      x: expl('ângulo central = 360°/n', 'Os n ângulos centrais somam uma volta.', `n = 360° ÷ ${N(360 / n)}° = ${n}.`),
    };
  },
  // 11. moeda girando ao redor de outra
  (r) => {
    const k = r.pick([1, 2, 3]);
    return {
      e: `Uma moeda de raio r rola, sem deslizar, ao redor de uma moeda fixa de raio ${k === 1 ? 'r (igual)' : `${k}r`}, até voltar à posição inicial. Quantas voltas ela dá em torno do próprio centro?`,
      r: k + 1,
      d: [k, 2 * k, k + 2, 1],
      x: expl('o centro percorre um círculo maior', `O centro da moeda que rola descreve uma circunferência de raio ${k}r + r = ${k + 1}r, de comprimento 2π · ${k + 1}r.`, `Cada volta da moeda corresponde a 2πr: são ${k + 1} voltas (e não ${k}, como parece à primeira vista).`),
    };
  },
  // 12. probabilidade geométrica
  (r) => {
    const forma = r.pick(['quadrado', 'hexágono regular']);
    const p = forma === 'quadrado' ? 2 / Math.PI : (3 * Math.sqrt(3)) / (2 * Math.PI);
    return {
      e: `Um ponto é escolhido ao acaso dentro de um círculo. Qual é a probabilidade aproximada de ele cair dentro do ${forma} inscrito no círculo?`,
      r: p * 100,
      d: forma === 'quadrado' ? [50, 25, 75, 90] : [50, 64, 90, 100],
      f: (v) => `${N(Math.round(v))}%`,
      x: expl('razão entre áreas', forma === 'quadrado' ? 'Com raio r, o quadrado inscrito tem área 2r² e o círculo πr².' : 'Com raio r, o hexágono inscrito tem área (3√3/2)r² e o círculo πr².', `Probabilidade = ${forma === 'quadrado' ? '2/π' : '3√3/(2π)'} ≈ ${N(Math.round(p * 100))}%.`),
    };
  },
  // 13. círculos inscrito e circunscrito ao quadrado
  (r) => {
    const forma = r.pick(['quadrado', 'triângulo equilátero', 'hexágono regular']);
    const [fr, txt] = forma === 'quadrado' ? ['1/2', 'r = l/2 e R = l√2/2, então R = r√2'] : forma === 'triângulo equilátero' ? ['1/4', 'R = 2r (o centro fica a 1/3 e 2/3 da altura)'] : ['3/4', 'R = l e r = l√3/2'];
    return {
      e: `Qual é a razão entre a área do círculo inscrito e a do círculo circunscrito a um ${forma}?`,
      r: fr,
      d: ['1/2', '1/4', '3/4', '1/3', '√2/2'].filter((v) => v !== fr).slice(0, 4),
      x: expl('razão dos raios ao quadrado', `Para o ${forma}: ${txt}.`, `(r/R)² = ${fr}.`),
    };
  },
  // 14. correia em polias iguais
  (r) => {
    const raio = r.int(5, 20), d = r.int(40, 120);
    const L = 2 * d + 2 * 3.14 * raio;
    return {
      e: `Uma correia aberta envolve duas polias iguais, de raio ${raio} cm, cujos centros estão a ${d} cm um do outro. Qual é o comprimento da correia? (Use π = 3,14.)`,
      r: L,
      d: [2 * d + 3.14 * raio, d + 2 * 3.14 * raio, 2 * d + 4 * 3.14 * raio, 2 * (d + raio)],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('dois retos e duas meias-voltas', `A correia tem dois trechos retos de ${d} cm e abraça meia volta de cada polia (juntas, uma volta inteira).`, `2 · ${d} + 2 · 3,14 · ${raio} = ${N(r2(L))} cm.`),
    };
  },
  // 15. ponteiro dos minutos
  (r) => {
    const c = r.pick([6, 10, 12, 15]), mi = r.pick([15, 20, 30, 40, 45]);
    const L = (2 * 3.14 * c * mi) / 60;
    return {
      e: `O ponteiro dos minutos de um relógio mede ${c} cm. Que distância percorre a sua ponta em ${mi} minutos? (Use π = 3,14.)`,
      r: L,
      d: [(3.14 * c * mi) / 60, (2 * 3.14 * c * mi) / 12, 2 * 3.14 * c, L * 2],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('fração da volta', `Em 60 min, a ponta dá uma volta de 2π · ${c} cm. Em ${mi} min, dá ${fracao(mi, 60)} de volta.`, `${fracao(mi, 60)} · 2 · 3,14 · ${c} = ${N(r2(L))} cm.`),
    };
  },
  // 16. corda pelo ângulo central
  (r) => {
    const raio = r.int(3, 12), ang = r.pick([60, 90, 120]);
    const res = ang === 60 ? `${raio} cm` : ang === 90 ? `${raio}√2 cm` : `${raio}√3 cm`;
    return {
      e: `Numa circunferência de raio ${raio} cm, uma corda determina um ângulo central de ${ang}°. Quanto mede a corda?`,
      r: res,
      d: [`${raio} cm`, `${raio}√2 cm`, `${raio}√3 cm`, `${2 * raio} cm`, `${raio}√3/2 cm`].filter((v) => v !== res),
      x: expl('triângulo isósceles com dois raios', `A corda e os dois raios formam um triângulo isósceles com ângulo de ${ang}° no centro.`, ang === 60 ? 'Com 60°, o triângulo é equilátero: corda = raio.' : ang === 90 ? 'Com 90°, é retângulo: corda = r√2 (Pitágoras).' : 'Com 120°, a corda é o lado do triângulo equilátero inscrito: r√3.'),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '25-circunferencia-e-circulo',
    titulo: 'Circunferência e círculo',
    provas: ['ENEM', 'Militares'],
    descricao: 'Comprimento e área, arcos e setores, ângulos na circunferência, cordas, tangentes, potência de ponto e polígonos inscritos.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
