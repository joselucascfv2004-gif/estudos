// Matemática — Cônicas: elipse, hipérbole e parábola (Geometria analítica).
import { expl, fracao, num, sup } from './util.mjs';

const N = (v) => num(v);
const r2 = (v) => Math.round(v * 100) / 100;
const PIT = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [12, 16, 20]];
const coef = (f) => (f.includes('/') ? `(${f})` : f); // y = ±(5/4)x
// k·(v − c), sem o fator 1 e sem parênteses quando c = 0
const lin = (v, c, k) => `${k === 1 ? '' : k}${c === 0 ? v : `(${v} ${c > 0 ? '−' : '+'} ${Math.abs(c)})`}`;
const quad = (v, c) => (c === 0 ? `${v}²` : `(${v} ${c > 0 ? '−' : '+'} ${Math.abs(c)})²`); // (x − c)²

const facil = [
  // 1. eixo maior
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Qual é a medida do eixo maior da elipse x²/${a * a} + y²/${b * b} = 1?`,
      r: 2 * a,
      d: [a, 2 * b, a * a, 2 * c],
      x: expl('a é o semieixo maior', `Na forma x²/a² + y²/b² = 1 com a > b, o eixo maior mede 2a. Aqui a² = ${a * a}.`, `a = ${a}; eixo maior = ${2 * a}.`),
    };
  },
  // 2. focos da elipse
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Quais são os focos da elipse x²/${a * a} + y²/${b * b} = 1?`,
      r: `(−${c}, 0) e (${c}, 0)`,
      d: [`(−${a}, 0) e (${a}, 0)`, `(0, −${c}) e (0, ${c})`, `(−${b}, 0) e (${b}, 0)`, `(−${a * a - b * b}, 0) e (${a * a - b * b}, 0)`],
      x: expl('c² = a² − b² na elipse', 'Na elipse, o semieixo maior é a hipotenusa: a² = b² + c². O eixo maior está em x, então os focos também.', `c² = ${a * a} − ${b * b} = ${c * c} ⇒ c = ${c}.`),
    };
  },
  // 3. excentricidade da elipse
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Qual é a excentricidade da elipse x²/${a * a} + y²/${b * b} = 1?`,
      r: fracao(c, a),
      d: [fracao(b, a), fracao(a, c), fracao(c, b), fracao(b, c)],
      x: expl('e = c/a', `c² = ${a * a} − ${b * b} = ${c * c}, então c = ${c}. A excentricidade da elipse fica entre 0 e 1.`, `e = ${c}/${a} = ${fracao(c, a)}.`),
    };
  },
  // 4. foco da parábola x² = 4py
  (r) => {
    const p = r.int(1, 6);
    return {
      e: `Qual é o foco da parábola x² = ${4 * p}y?`,
      r: `(0, ${p})`,
      d: [`(0, ${4 * p})`, `(${p}, 0)`, `(0, ${2 * p})`, `(0, −${p})`],
      x: expl('x² = 4py', `Comparando, 4p = ${4 * p} ⇒ p = ${p}. O foco fica a p do vértice, no eixo de simetria (eixo y).`, `Foco (0, ${p}).`),
    };
  },
  // 5. diretriz de y² = 4px
  (r) => {
    const p = r.int(1, 6);
    return {
      e: `Qual é a equação da reta diretriz da parábola y² = ${4 * p}x?`,
      r: `x = −${p}`,
      d: [`x = ${p}`, `y = −${p}`, `x = −${4 * p}`, `x = −${2 * p}`],
      x: expl('y² = 4px', `4p = ${4 * p} ⇒ p = ${p}. O foco é (${p}, 0) e a diretriz é a reta do outro lado do vértice, à mesma distância.`, `Diretriz: x = −${p}.`),
    };
  },
  // 6. c da hipérbole
  (r) => {
    const [a, b, c] = r.pick(PIT);
    return {
      e: `Qual é a distância entre os focos da hipérbole x²/${a * a} − y²/${b * b} = 1?`,
      r: 2 * c,
      d: [2 * a, c, 2 * Math.sqrt(Math.abs(a * a - b * b)) % 1 === 0 ? 2 * Math.sqrt(Math.abs(a * a - b * b)) : 2 * b, a + b],
      x: expl('c² = a² + b² na hipérbole', 'Na hipérbole, c é o maior: c² = a² + b² (diferente da elipse).', `c² = ${a * a} + ${b * b} = ${c * c} ⇒ c = ${c}; distância focal 2c = ${2 * c}.`),
    };
  },
  // 7. identificar a cônica
  (r) => {
    const tipo = r.pick(['elipse', 'hipérbole', 'parábola', 'circunferência']);
    const eq = { elipse: `x²/${r.pick([4, 9, 16])} + y²/${r.pick([25, 36])} = 1`, hipérbole: `x²/${r.pick([4, 9])} − y²/${r.pick([16, 25])} = 1`, parábola: `y = ${r.pick([2, 3])}x² − ${r.int(1, 5)}`, circunferência: `x² + y² = ${r.pick([16, 25, 49])}` }[tipo];
    return {
      e: `Que curva é representada pela equação ${eq}?`,
      r: tipo,
      d: ['elipse', 'hipérbole', 'parábola', 'circunferência', 'reta'].filter((t) => t !== tipo),
      x: expl('reconhecer pela forma', 'x² e y² somados com coeficientes iguais: circunferência; somados com coeficientes diferentes: elipse; subtraídos: hipérbole; só um dos dois ao quadrado: parábola.', `${eq} é uma ${tipo}.`),
    };
  },
  // 8. eixo maior vertical
  (r) => {
    const [b, , a] = r.pick(PIT);
    return {
      e: `Na elipse x²/${b * b} + y²/${a * a} = 1, sobre qual eixo está o eixo maior?`,
      r: 'sobre o eixo y',
      d: ['sobre o eixo x', 'sobre a reta y = x', 'não há eixo maior (é uma circunferência)', 'sobre a reta y = −x'],
      x: expl('o maior denominador manda', `O maior denominador (${a * a}) está embaixo de y²: é no eixo y que a elipse é mais comprida.`, `Eixo maior vertical, de comprimento ${2 * a}.`),
    };
  },
  // 9. vértices da hipérbole
  (r) => {
    const a = r.int(2, 7), b = r.int(2, 7);
    return {
      e: `Quais são os vértices da hipérbole x²/${a * a} − y²/${b * b} = 1?`,
      r: `(−${a}, 0) e (${a}, 0)`,
      d: [`(0, −${b}) e (0, ${b})`, `(−${a * a}, 0) e (${a * a}, 0)`, `(−${b}, 0) e (${b}, 0)`, `(0, −${a}) e (0, ${a})`],
      x: expl('o termo positivo indica o eixo', 'Na hipérbole, o termo com sinal + diz em que eixo estão os vértices. Fazendo y = 0: x² = a².', `x = ±${a}.`),
    };
  },
  // 10. assíntotas
  (r) => {
    const a = r.int(2, 5), b = r.int(2, 7);
    if (a === b) return facil[9](r);
    return {
      e: `Quais são as assíntotas da hipérbole x²/${a * a} − y²/${b * b} = 1?`,
      r: `y = ±${coef(fracao(b, a))}x`,
      d: [`y = ±${coef(fracao(a, b))}x`, `y = ±${coef(fracao(b * b, a * a))}x`, `x = ±${a}`, `y = ±${b}x`],
      x: expl('assíntotas: y = ±(b/a)x', 'Longe da origem, a hipérbole se aproxima das retas obtidas trocando o 1 por 0: x²/a² = y²/b².', `y = ±${coef(fracao(b, a))}x.`),
    };
  },
  // 11. vértice de parábola
  (r) => {
    const h = r.int(1, 5), k = r.int(-3, 6);
    return {
      e: `Qual é o vértice da parábola y = x² − ${2 * h}x + ${h * h + k}?`,
      r: `(${h}, ${N(k)})`,
      d: [`(−${h}, ${N(k)})`, `(${h}, ${N(h * h + k)})`, `(${2 * h}, ${N(k)})`, `(${N(k)}, ${h})`],
      x: expl('completar o quadrado', `x² − ${2 * h}x + ${h * h + k} = (x − ${h})² ${k < 0 ? '−' : '+'} ${Math.abs(k)}.`, `Vértice (${h}, ${N(k)}).`),
    };
  },
  // 12. ponto da elipse
  (r) => {
    const a = r.int(3, 6), b = r.int(2, a - 1);
    return {
      e: `Qual destes pontos pertence à elipse x²/${a * a} + y²/${b * b} = 1?`,
      r: `(0, ${b})`,
      d: [`(${b}, 0)`, `(${a}, ${b})`, `(0, ${a})`, `(${a * a}, 0)`],
      x: expl('substituir na equação', 'Um ponto pertence à curva se torna a equação verdadeira.', `(0, ${b}): 0 + ${b * b}/${b * b} = 1 ✓. Os outros dão valores diferentes de 1.`),
    };
  },
  // 13. soma das distâncias aos focos
  (r) => {
    const [b, , a] = r.pick(PIT);
    return {
      e: `Um ponto P está sobre a elipse x²/${a * a} + y²/${b * b} = 1. Quanto vale a soma das distâncias de P aos dois focos?`,
      r: 2 * a,
      d: [2 * b, a + b, a * a, a],
      x: expl('definição da elipse', 'Elipse é o conjunto dos pontos cuja soma das distâncias aos focos é constante e igual ao eixo maior, 2a.', `2a = ${2 * a}.`),
    };
  },
  // 14. diferença das distâncias (hipérbole)
  (r) => {
    const a = r.int(2, 8), b = r.int(2, 8);
    return {
      e: `Para qualquer ponto P da hipérbole x²/${a * a} − y²/${b * b} = 1, quanto vale o módulo da diferença das distâncias de P aos focos?`,
      r: 2 * a,
      d: [2 * b, a, a + b, 2 * Math.round(Math.sqrt(a * a + b * b))],
      x: expl('definição da hipérbole', 'Hipérbole é o conjunto dos pontos cuja diferença (em módulo) das distâncias aos focos é constante e igual a 2a.', `2a = ${2 * a}.`),
    };
  },
  // 15. distância ao foco na parábola
  (r) => {
    const p = r.int(1, 4), x0 = r.int(1, 8);
    return {
      e: `O ponto P, de abscissa ${x0}, pertence à parábola y² = ${4 * p}x. Qual é a distância de P ao foco?`,
      r: x0 + p,
      d: [x0, x0 + 4 * p, Math.abs(x0 - p) || x0 + 2, x0 * p],
      x: expl('distância ao foco = distância à diretriz', `Na parábola, cada ponto está à mesma distância do foco (${p}, 0) e da diretriz x = −${p}.`, `Distância até x = −${p}: ${x0} + ${p} = ${x0 + p}.`),
    };
  },
  // 16. circunferência como elipse
  (r) => ({
    e: `Qual é a excentricidade de uma circunferência, vista como uma elipse com a = b = ${r.int(2, 9)}?`,
    r: 0,
    d: [1, 0.5, 2, -1],
    x: expl('e = c/a', 'Com a = b, c² = a² − b² = 0. Os dois focos coincidem no centro.', 'e = 0/a = 0. Quanto mais perto de 0, mais "redonda" a elipse.'),
  }),
  // 17. área da elipse
  (r) => {
    const a = r.int(3, 10), b = r.int(2, a - 1);
    return {
      e: `A área de uma elipse de semieixos a e b é πab. Qual é a área da elipse x²/${a * a} + y²/${b * b} = 1?`,
      r: `${a * b}π`,
      d: [`${a * a * b * b}π`, `${2 * a * b}π`, `${a + b}π`, `${a * a}π`],
      x: expl('A = πab', `Os semieixos são a = ${a} e b = ${b}. (Se a = b, vira a área do círculo, πr².)`, `π · ${a} · ${b} = ${a * b}π.`),
    };
  },
];

const medio = [
  // 1. equação da elipse pelos focos e eixo
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Uma elipse tem centro na origem, focos (±${c}, 0) e eixo maior de comprimento ${2 * a}. Qual é a sua equação?`,
      r: `x²/${a * a} + y²/${b * b} = 1`,
      d: [`x²/${a * a} + y²/${c * c} = 1`, `x²/${b * b} + y²/${a * a} = 1`, `x²/${a * a} − y²/${b * b} = 1`, `x²/${2 * a} + y²/${2 * b} = 1`],
      x: expl('achar b com a² = b² + c²', `a = ${a} e c = ${c}.`, `b² = ${a * a} − ${c * c} = ${b * b}; x²/${a * a} + y²/${b * b} = 1.`),
    };
  },
  // 2. equação da hipérbole
  (r) => {
    const [a, b, c] = r.pick(PIT);
    return {
      e: `Uma hipérbole tem centro na origem, vértices (±${a}, 0) e focos (±${c}, 0). Qual é a sua equação?`,
      r: `x²/${a * a} − y²/${b * b} = 1`,
      d: [`x²/${a * a} + y²/${b * b} = 1`, `x²/${a * a} − y²/${c * c} = 1`, `y²/${a * a} − x²/${b * b} = 1`, `x²/${c * c} − y²/${a * a} = 1`],
      x: expl('c² = a² + b²', `a = ${a}, c = ${c} ⇒ b² = ${c * c} − ${a * a} = ${b * b}.`, `x²/${a * a} − y²/${b * b} = 1.`),
    };
  },
  // 3. parábola pelo foco
  (r) => {
    const p = r.int(1, 6);
    return {
      e: `Qual é a equação da parábola com vértice na origem e foco no ponto (0, ${p})?`,
      r: `x² = ${4 * p}y`,
      d: [`y² = ${4 * p}x`, `x² = ${p}y`, `x² = ${2 * p}y`, `x² = −${4 * p}y`],
      x: expl('x² = 4py', `Foco no eixo y, acima do vértice: a parábola abre para cima, com p = ${p}.`, `x² = 4 · ${p} · y = ${4 * p}y.`),
    };
  },
  // 4. forma geral → reduzida
  (r) => {
    const [a, b] = r.pick([[3, 2], [4, 3], [5, 2], [5, 4], [6, 2]]);
    const A = b * b, B = a * a, C = a * a * b * b;
    return {
      e: `A elipse ${A}x² + ${B}y² = ${C} tem eixo maior de que medida?`,
      r: 2 * a,
      d: [2 * b, a, C / A, 2 * a * b],
      x: expl('dividir pelo termo independente', `Dividindo tudo por ${C}: x²/${a * a} + y²/${b * b} = 1.`, `a = ${a}; eixo maior ${2 * a}.`),
    };
  },
  // 5. lado reto da parábola
  (r) => {
    const p = r.int(1, 6);
    return {
      e: `Na parábola y² = ${4 * p}x, qual é o comprimento da corda que passa pelo foco e é perpendicular ao eixo (o "lado reto")?`,
      r: 4 * p,
      d: [2 * p, p, 8 * p, 4 * p + 2],
      x: expl('substituir x = p', `O foco é (${p}, 0). Com x = ${p}: y² = ${4 * p * p} ⇒ y = ±${2 * p}.`, `Comprimento: ${2 * p} − (−${2 * p}) = ${4 * p}.`),
    };
  },
  // 6. excentricidade da hipérbole
  (r) => {
    const [a, b, c] = r.pick(PIT);
    return {
      e: `Qual é a excentricidade da hipérbole x²/${a * a} − y²/${b * b} = 1?`,
      r: fracao(c, a),
      d: [fracao(a, c), fracao(b, a), fracao(c, b), fracao(b, c)],
      x: expl('e = c/a > 1', `c² = ${a * a} + ${b * b} = ${c * c} ⇒ c = ${c}. Na hipérbole, a excentricidade é sempre maior que 1.`, `e = ${c}/${a} = ${fracao(c, a)}.`),
    };
  },
  // 7. centro de elipse deslocada
  (r) => {
    const h = r.int(-5, 5) || 2, k = r.int(-5, 5) || -1;
    const [b, , a] = r.pick(PIT);
    return {
      e: `Qual é o centro da elipse ${quad('x', h)}/${a * a} + ${quad('y', k)}/${b * b} = 1?`,
      r: `(${N(h)}, ${N(k)})`,
      d: [`(${N(-h)}, ${N(-k)})`, `(${N(k)}, ${N(h)})`, `(${a}, ${b})`, `(${N(-h)}, ${N(k)})`],
      x: expl('translação', `(x − h)² e (y − k)² indicam centro (h, k): cuidado com o sinal trocado.`, `Centro (${N(h)}, ${N(k)}).`),
    };
  },
  // 8. reta corta parábola
  (r) => {
    const p = r.int(1, 3), k = r.int(1, 4);
    const y0 = p * k * k; // x² = 4p·y ⇒ x = ±2√(p·y)... escolhe y0 = p·k² ⇒ x = ±2pk
    return {
      e: `A reta y = ${y0} corta a parábola x² = ${4 * p}y em dois pontos. Qual é a distância entre eles?`,
      r: 4 * p * k,
      d: [2 * p * k, 4 * p * y0, y0, 8 * p * k],
      x: expl('substituir y na parábola', `x² = ${4 * p} · ${y0} = ${4 * p * y0} ⇒ x = ±${2 * p * k}.`, `Distância: ${4 * p * k}.`),
    };
  },
  // 9. antena parabólica
  (r) => {
    const [d, prof] = r.pick([[2, 0.25], [1.2, 0.15], [3, 0.5], [0.8, 0.1], [2.4, 0.3]]);
    const p = (d / 2) ** 2 / (4 * prof);
    return {
      e: `Uma antena parabólica tem ${N(d)} m de diâmetro e ${N(prof)} m de profundidade. O receptor fica no foco. A que distância do fundo (vértice) da antena ele deve ser instalado?`,
      r: p,
      d: [prof, d / 2, p * 2, prof * 2],
      f: (v) => `${N(r2(v))} m`,
      x: expl('x² = 4py com um ponto da borda', `Com o vértice na origem, a borda é o ponto (${N(d / 2)}, ${N(prof)}): ${N((d / 2) ** 2)} = 4p · ${N(prof)}.`, `p = ${N(r2(p))} m.`),
    };
  },
  // 10. órbita: semieixo e excentricidade
  (r) => {
    const [rp, ra] = r.pick([[4, 6], [2, 8], [3, 7], [1, 9], [5, 15]]);
    const pede = r.pick(['a', 'e']);
    const a = (rp + ra) / 2, c = (ra - rp) / 2;
    return {
      e: `Um satélite descreve uma órbita elíptica com a Terra num dos focos. A menor distância à Terra é ${rp} mil km e a maior é ${ra} mil km. Qual é ${pede === 'a' ? 'o semieixo maior da órbita' : 'a excentricidade da órbita'}?`,
      r: pede === 'a' ? `${N(a)} mil km` : fracao(c, a),
      d: pede === 'a' ? [`${N(ra - rp)} mil km`, `${N(ra + rp)} mil km`, `${N(c)} mil km`, `${N(Math.sqrt(ra * rp))} mil km`] : [fracao(rp, ra), fracao(c, ra), fracao(a, c) === fracao(c, a) ? '1' : fracao(rp, a), '1/2' === fracao(c, a) ? '1/3' : '1/2'],
      x: expl('periélio e afélio', 'A menor distância é a − c e a maior é a + c.', `a = (${rp} + ${ra})/2 = ${N(a)}; c = (${ra} − ${rp})/2 = ${N(c)}; ${pede === 'a' ? `a = ${N(a)} mil km` : `e = c/a = ${fracao(c, a)}`}.`),
    };
  },
  // 11. hipérbole equilátera
  (r) => {
    const a = r.int(2, 9);
    return {
      e: `A hipérbole x² − y² = ${a * a} tem a = b (é chamada equilátera). Qual é a sua excentricidade?`,
      r: '√2',
      d: ['1', '2', '√3', '1/√2'],
      x: expl('c² = a² + b² com a = b', `c² = 2a² ⇒ c = a√2.`, `e = c/a = √2.`),
    };
  },
  // 12. distância focal pela excentricidade
  (r) => {
    const a = r.pick([5, 10, 15, 20]), e = r.pick([0.2, 0.4, 0.6, 0.8]);
    return {
      e: `Uma elipse tem semieixo maior ${a} cm e excentricidade ${num(e)}. Qual é a distância entre os focos?`,
      r: 2 * a * e,
      d: [a * e, 2 * a, a / e, 2 * a * (1 - e)],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('c = e · a', `c = ${num(e)} · ${a} = ${N(a * e)}.`, `Distância focal 2c = ${N(2 * a * e)} cm.`),
    };
  },
  // 13. arco parabólico de ponte
  (r) => {
    const [v, h] = r.pick([[40, 10], [20, 8], [60, 15], [30, 9], [80, 16]]);
    const x = v / 4;
    const y = h - (h * x * x) / ((v / 2) ** 2);
    return {
      e: `Um arco de ponte tem forma de parábola, com vão de ${v} m no chão e altura máxima de ${h} m no centro. Qual é a altura do arco a ${N(x)} m do centro?`,
      r: y,
      d: [h / 2, h - x / 2, (h * 3) / 2 / 2, y + 1],
      f: (val) => `${N(r2(val))} m`,
      x: expl('parábola pelo vértice', `Com o vértice em (0, ${h}), y = ${h} − kx². Nas pontas (±${v / 2}, 0): k = ${h}/${(v / 2) ** 2}.`, `y(${N(x)}) = ${h} − ${h} · ${N(x * x)}/${(v / 2) ** 2} = ${N(r2(y))} m.`),
    };
  },
  // 14. identificar circunferência na forma geral
  (r) => {
    const a = r.int(2, 5), h = r.int(1, 4);
    return {
      e: `Que curva representa a equação ${a}x² + ${a}y² − ${2 * a * h}x = 0?`,
      r: `circunferência de centro (${h}, 0) e raio ${h}`,
      d: [`elipse de centro (${h}, 0)`, `circunferência de centro (0, 0) e raio ${h}`, `parábola de vértice (${h}, 0)`, `circunferência de centro (−${h}, 0) e raio ${h}`],
      x: expl('coeficientes iguais em x² e y²', `Dividindo por ${a}: x² + y² − ${2 * h}x = 0 ⇒ (x − ${h})² + y² = ${h * h}.`, `Circunferência de centro (${h}, 0) e raio ${h}.`),
    };
  },
  // 15. eixo menor
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Uma elipse tem eixo maior ${2 * a} e distância focal ${2 * c}. Quanto mede o eixo menor?`,
      r: 2 * b,
      d: [b, 2 * Math.round(Math.sqrt(a * a + c * c)), 2 * (a - c), 2 * a - 2 * c + 2],
      x: expl('a² = b² + c²', `a = ${a}, c = ${c} ⇒ b² = ${a * a} − ${c * c} = ${b * b}.`, `b = ${b}; eixo menor ${2 * b}.`),
    };
  },
  // 16. hipérbole por um ponto
  (r) => {
    const a = r.int(2, 4), b = r.int(2, 5);
    const x0 = 2 * a; // y0² = b²(x0²/a² − 1) = 3b²
    return {
      e: `A hipérbole x²/${a * a} − y²/b² = 1 passa pelo ponto (${x0}, ${b}√3). Qual é o valor de b?`,
      r: b,
      d: [b * b, b + 1, a, 2 * b],
      x: expl('substituir o ponto', `(${b}√3)² = ${3 * b * b}. Então ${x0 * x0}/${a * a} − ${3 * b * b}/b² = 1 ⇒ 4 − ${3 * b * b}/b² = 1 ⇒ ${3 * b * b}/b² = 3 ⇒ b² = ${b * b}.`, `b = ${b}.`),
    };
  },
  // 17. parábola por um ponto
  (r) => {
    const p = r.int(1, 4), y0 = 2 * p * r.int(1, 3);
    const x0 = (y0 * y0) / (4 * p);
    return {
      e: `A parábola y² = 4px passa pelo ponto (${x0}, ${y0}). Qual é o seu foco?`,
      r: `(${p}, 0)`,
      d: [`(${4 * p}, 0)`, `(0, ${p})`, `(${2 * p}, 0)`, `(${x0}, 0)`],
      x: expl('achar p com o ponto', `${y0}² = 4p · ${x0} ⇒ p = ${y0 * y0}/${4 * x0} = ${p}.`, `Foco (${p}, 0).`),
    };
  },
];

const dificil = [
  // 1. triângulo focos + extremo do eixo menor
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Na elipse x²/${a * a} + y²/${b * b} = 1, qual é a área do triângulo cujos vértices são os dois focos e o ponto (0, ${b})?`,
      r: b * c,
      d: [a * b, 2 * b * c, (b * c) / 2, a * c],
      x: expl('base = distância focal', `c = √(${a * a} − ${b * b}) = ${c}. A base mede ${2 * c} e a altura ${b}.`, `Área = ${2 * c} · ${b}/2 = ${b * c}.`),
    };
  },
  // 2. perímetro do triângulo P F1 F2
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `P é um ponto qualquer da elipse x²/${a * a} + y²/${b * b} = 1 (fora do eixo x), e F₁, F₂ são os focos. Qual é o perímetro do triângulo PF₁F₂?`,
      r: 2 * a + 2 * c,
      d: [2 * a, 2 * a + 2 * b, 4 * a, a + c],
      x: expl('definição da elipse', `PF₁ + PF₂ = 2a = ${2 * a} para qualquer P, e F₁F₂ = 2c = ${2 * c}.`, `Perímetro = ${2 * a} + ${2 * c} = ${2 * a + 2 * c}.`),
    };
  },
  // 3. reta tangente à parábola
  (r) => {
    const m = r.int(1, 4);
    return {
      e: `Para que valor de k a reta y = ${m === 1 ? '' : m}x + k é tangente à parábola y = x²?`,
      r: fracao(-m * m, 4),
      d: [fracao(m * m, 4), fracao(-m, 4), fracao(-m * m, 2), '0'],
      x: expl('tangente: uma só interseção (Δ = 0)', `x² = ${m === 1 ? '' : m}x + k ⇒ x² − ${m === 1 ? '' : m}x − k = 0. Tangente quando Δ = ${m * m} + 4k = 0.`, `k = −${m * m}/4 = ${fracao(-m * m, 4)}.`),
    };
  },
  // 4. completar quadrados na elipse
  (r) => {
    const h = r.int(1, 3), k = r.int(1, 3), a = 4, b = 2;
    // (x − h)² + 4(y + k)² = 16 ⇒ x² − 2hx + h² + 4y² + 8ky + 4k² − 16 = 0
    const D = h * h + 4 * k * k - 16;
    return {
      e: `A equação x² + 4y² − ${2 * h}x + ${8 * k}y ${D < 0 ? '−' : '+'} ${Math.abs(D)} = 0 representa uma elipse. Qual é o seu centro?`,
      r: `(${h}, −${k})`,
      d: [`(−${h}, ${k})`, `(${h}, ${k})`, `(${2 * h}, −${8 * k})`, `(${h}, −${2 * k})`],
      x: expl('completar quadrados', `x² − ${2 * h}x = (x − ${h})² − ${h * h} e 4y² + ${8 * k}y = 4(y + ${k})² − ${4 * k * k}.`, `(x − ${h})² + 4(y + ${k})² = 16 ⇒ centro (${h}, −${k}), com a = ${a} e b = ${b}.`),
    };
  },
  // 5. assíntotas da forma geral
  (r) => {
    const [a, b] = r.pick([[2, 3], [3, 2], [2, 5], [4, 3], [3, 4]]);
    const A = b * b, B = a * a, C = a * a * b * b;
    return {
      e: `Quais são as assíntotas da hipérbole ${A}x² − ${B}y² = ${C}?`,
      r: `y = ±${coef(fracao(b, a))}x`,
      d: [`y = ±${coef(fracao(a, b))}x`, `y = ±${coef(fracao(A, B))}x`, `y = ±${b}x`, `x = ±${a}`],
      x: expl('forma reduzida primeiro', `Dividindo por ${C}: x²/${a * a} − y²/${b * b} = 1, com a = ${a} e b = ${b}.`, `Assíntotas y = ±(b/a)x = ±${coef(fracao(b, a))}x.`),
    };
  },
  // 6. propriedade refletora
  (r) => {
    const tipo = r.pick(['elipse', 'parábola']);
    return {
      e: tipo === 'elipse' ? 'Uma mesa de bilhar tem a forma de uma elipse. Uma bola é lançada a partir de um dos focos, em qualquer direção, e bate na borda. Por onde ela passa depois da batida?' : 'Raios de luz chegam paralelos ao eixo de um espelho parabólico (como os do Sol num forno solar). Depois de refletidos, para onde vão?',
      r: tipo === 'elipse' ? 'pelo outro foco' : 'todos para o foco',
      d: tipo === 'elipse' ? ['pelo centro da mesa', 'volta para o mesmo foco', 'por um vértice do eixo maior', 'sai paralela ao eixo maior'] : ['para o vértice', 'voltam paralelos ao eixo', 'espalham-se em todas as direções', 'para a reta diretriz'],
      x: expl('propriedade refletora das cônicas', tipo === 'elipse' ? 'Na elipse, o que sai de um foco é refletido na borda em direção ao outro foco.' : 'Na parábola, raios paralelos ao eixo são refletidos para o foco (e o que sai do foco é refletido paralelo ao eixo, como no farol de carro).', tipo === 'elipse' ? 'Por isso há "salas de sussurro" elípticas.' : 'É por isso que antenas e fornos solares usam a forma parabólica.'),
    };
  },
  // 7. lado reto da elipse
  (r) => {
    const [b, c, a] = r.pick(PIT);
    return {
      e: `Na elipse x²/${a * a} + y²/${b * b} = 1, qual é o comprimento da corda que passa por um foco e é perpendicular ao eixo maior?`,
      r: fracao(2 * b * b, a),
      d: [fracao(b * b, a), fracao(2 * a * a, b), String(2 * b), fracao(2 * b, a)],
      x: expl('substituir x = c', `c = √(${a * a} − ${b * b}) = ${c}. Com x = ${c}: y²/${b * b} = 1 − ${c * c}/${a * a} = ${b * b}/${a * a} ⇒ y = ±${fracao(b * b, a)}.`, `Comprimento 2b²/a = ${fracao(2 * b * b, a)}.`),
    };
  },
  // 8. excentricidade com eixo menor = metade do maior
  (r) => {
    const [txt, e] = r.pick([['metade', '√3/2'], ['igual a 3/5 d', '4/5'], ['igual a 5/13 d', '12/13']]);
    return {
      e: `O eixo menor de uma elipse é ${txt === 'metade' ? 'metade' : txt}o eixo maior. Qual é a excentricidade da elipse?`.replace('dd', 'd').replace(' do eixo', ' do eixo').replace('metadeo', 'metade do'),
      r: e,
      d: ['1/2', '√2/2', '3/5', '1/3', '√3/2', '4/5', '12/13'].filter((v) => v !== e).slice(0, 4),
      x: expl('e = c/a com b em função de a', txt === 'metade' ? 'b = a/2 ⇒ c² = a² − a²/4 = 3a²/4 ⇒ c = a√3/2.' : txt.startsWith('igual a 3/5') ? 'b = 3a/5 ⇒ c² = a² − 9a²/25 = 16a²/25 ⇒ c = 4a/5.' : 'b = 5a/13 ⇒ c² = a² − 25a²/169 = 144a²/169 ⇒ c = 12a/13.', `e = c/a = ${e}.`),
    };
  },
  // 9. corda da parábola com reta
  (r) => {
    const [x1, x2] = r.pick([[3, -2], [2, -1], [4, -3], [3, -1], [5, -2]]);
    const s = x1 + x2, p = x1 * x2; // y = x² e y = s·x − p
    const d = Math.abs(x1 - x2) * Math.sqrt(1 + s * s);
    return {
      e: `A reta y = ${s === 1 ? '' : s}x + ${-p} corta a parábola y = x² em dois pontos. Qual é a distância entre eles?`,
      r: `${Math.abs(x1 - x2)}√${1 + s * s}`,
      d: [`${Math.abs(x1 - x2)}`, `${Math.abs(x1 - x2) ** 2}√${1 + s * s}`, `√${1 + s * s}`, `${Math.abs(x1 - x2) + 1}√${1 + s * s}`],
      x: expl('resolver o sistema', `x² = ${s === 1 ? '' : s}x + ${-p} ⇒ x² − ${s === 1 ? '' : s}x − ${-p} = 0 ⇒ x = ${x1} ou x = ${x2}. Os pontos são (${x1}, ${x1 * x1}) e (${x2}, ${x2 * x2}).`, `Distância = √(${(x1 - x2) ** 2} + ${(x1 * x1 - x2 * x2) ** 2}) = ${Math.abs(x1 - x2)}√${1 + s * s} ≈ ${N(r2(d))}.`),
    };
  },
  // 10. farol parabólico
  (r) => {
    const [ab, prof] = r.pick([[24, 6], [20, 5], [16, 4], [30, 9], [12, 3]]);
    const p = (ab / 2) ** 2 / (4 * prof);
    return {
      e: `O refletor de um farol de carro tem forma de paraboloide, com abertura de ${ab} cm e profundidade de ${prof} cm. A lâmpada deve ficar no foco. A que distância do fundo ela fica?`,
      r: p,
      d: [prof, ab / 4, p * 2, ab / 2],
      f: (v) => `${N(r2(v))} cm`,
      x: expl('x² = 4py com a borda', `Borda no ponto (${ab / 2}, ${prof}): ${(ab / 2) ** 2} = 4p · ${prof}.`, `p = ${(ab / 2) ** 2}/${4 * prof} = ${N(r2(p))} cm.`),
    };
  },
  // 11. ponto do eixo menor
  (r) => {
    const [b, , a] = r.pick(PIT);
    return {
      e: `Qual é a distância do ponto (0, ${b}) a cada foco da elipse x²/${a * a} + y²/${b * b} = 1?`,
      r: a,
      d: [b, Math.round(Math.sqrt(a * a - b * b)), a + b, 2 * a],
      x: expl('simetria + definição', `O ponto (0, ${b}) está à mesma distância dos dois focos, e a soma das duas distâncias é 2a.`, `Cada uma vale a = ${a} (é a hipotenusa do triângulo de catetos b e c).`),
    };
  },
  // 12. hipérbole: a outra distância
  (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]]);
    const d1 = a + c + r.int(0, 6); // d1 − 2a ≥ c − a: os dois ramos são possíveis
    return {
      e: `Um ponto P da hipérbole x²/${a * a} − y²/${b * b} = 1 está a ${d1} unidades de um dos focos. Quais são as distâncias possíveis de P ao outro foco?`,
      r: `${d1 - 2 * a} ou ${d1 + 2 * a}`,
      d: [`${d1 - a} ou ${d1 + a}`, `só ${d1 + 2 * a}`, `só ${d1 - 2 * a}`, `${d1 - 2 * a} ou ${d1 + 2 * a} ou ${d1}`],
      x: expl('|PF₁ − PF₂| = 2a', `2a = ${2 * a}, então a outra distância difere de ${d1} em ${2 * a}, para mais ou para menos.`, `${d1} − ${2 * a} = ${d1 - 2 * a} ou ${d1} + ${2 * a} = ${d1 + 2 * a} (dependendo do ramo). As duas servem, porque nenhum ponto fica a menos de c − a = ${c - a} de um foco.`),
    };
  },
  // 13. canteiro elíptico
  (r) => {
    const [ea, eb] = r.pick([[10, 6], [8, 4], [12, 8], [6, 4], [14, 10]]);
    const area = 3.14 * (ea / 2) * (eb / 2);
    return {
      e: `Um canteiro tem forma de elipse, com eixo maior de ${ea} m e eixo menor de ${eb} m. Qual é a sua área? (A área da elipse é πab; use π = 3,14.)`,
      r: area,
      d: [3.14 * ea * eb, 3.14 * ea * eb / 2, area * 2, 3.14 * ((ea + eb) / 4) ** 2 * 2],
      f: (v) => `${N(r2(v))} m²`,
      x: expl('semieixos, não eixos', `a = ${ea / 2} e b = ${eb / 2} (metade dos eixos).`, `3,14 · ${ea / 2} · ${eb / 2} = ${N(r2(area))} m².`),
    };
  },
  // 14. equação paramétrica
  (r) => {
    const a = r.int(2, 6), b = r.int(2, 6);
    if (a === b) return dificil[13](r);
    return {
      e: `Os pontos (x, y) = (${a}·cos t, ${b}·sen t), com t real, descrevem qual curva?`,
      r: `a elipse x²/${a * a} + y²/${b * b} = 1`,
      d: [`a circunferência x² + y² = ${a * a}`, `a hipérbole x²/${a * a} − y²/${b * b} = 1`, `a elipse x²/${a} + y²/${b} = 1`, `a parábola y = ${b}x²`],
      x: expl('cos² + sen² = 1', `cos t = x/${a} e sen t = y/${b}. Como cos²t + sen²t = 1:`, `(x/${a})² + (y/${b})² = 1, uma elipse.`),
    };
  },
  // 15. parábola com vértice e foco fora da origem
  (r) => {
    const h = r.int(-4, 4), k = r.int(-3, 4), p = r.int(1, 3);
    return {
      e: `Qual é a equação da parábola de vértice (${N(h)}, ${N(k)}) e foco (${N(h)}, ${N(k + p)})?`,
      r: `${quad('x', h)} = ${lin('y', k, 4 * p)}`,
      d: [`${quad('x', h)} = ${lin('y', k, p === 1 ? 2 : p)}`, `${quad('y', k)} = ${lin('x', h, 4 * p)}`, `${quad('x', -h)} = ${lin('y', -k, 4 * p)}`, `${quad('x', h)} = −${lin('y', k, 4 * p)}`],
      x: expl('(x − h)² = 4p(y − k)', `O foco está ${p} unidade${p === 1 ? '' : 's'} acima do vértice: a parábola abre para cima, com p = ${p} e 4p = ${4 * p}. Basta deslocar x² = 4py para o vértice dado.`, `${quad('x', h)} = ${lin('y', k, 4 * p)}.`),
    };
  },
  // 16. interseção de elipse com eixo
  (r) => {
    const [b, , a] = r.pick(PIT);
    const k = r.int(2, 3);
    return {
      e: `Quantos pontos em comum têm a elipse x²/${a * a} + y²/${b * b} = 1 e a circunferência x² + y² = ${a * a}?`,
      r: 2,
      d: [0, 1, 4, k + 3],
      x: expl('substituir e comparar', `Da circunferência, y² = ${a * a} − x². Na elipse: x²/${a * a} + (${a * a} − x²)/${b * b} = 1, o que só vale com x² = ${a * a}, ou seja, y = 0.`, `Os pontos comuns são (±${a}, 0): a circunferência toca a elipse nas pontas do eixo maior.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '26-conicas',
    titulo: 'Cônicas: elipse, hipérbole e parábola',
    provas: ['Militares'],
    descricao: 'Elementos, equações e propriedades da elipse, da hipérbole e da parábola, com aplicações (órbitas, antenas e faróis).',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
