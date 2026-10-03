// Matemática — Funções afim e quadrática.
import { expl, fracao, nome, num, reais } from './util.mjs';

const termo = (v, x = '', primeiro = false) => {
  if (v === 0) return '';
  const s = v < 0 ? (primeiro ? '−' : ' − ') : primeiro ? '' : ' + ';
  const a = Math.abs(v);
  return s + (a === 1 && x ? '' : num(a)) + x;
};
const afim = (a, b) => `${termo(a, 'x', true)}${termo(b)}` || '0';
const quad = (a, b, c) => `${termo(a, 'x²', true)}${termo(b, 'x')}${termo(c)}`;
const ponto = (x, y) => `(${num(x)}, ${num(y)})`;

const facil = [
  // 1. f(k) afim
  (r) => {
    const a = r.int(-5, 6) || 2, b = r.int(-10, 10), k = r.int(-5, 8);
    if (k === 0 || k === 1) return facil[0](r);
    return {
      e: `Dada a função f(x) = ${afim(a, b)}, qual é o valor de f(${k})?`,
      r: a * k + b,
      d: [a + k + b, a * k - b, a * (k + b), k * b + a],
      x: expl('substituição', 'Calcular f(k) é trocar cada x por k, com parênteses para não errar o sinal.', `f(${k}) = ${a} · (${k})${termo(b)} = ${a * k + b}.`),
    };
  },
  // 2. conta de água
  (r) => {
    const fixo = r.pick([25, 30, 35, 40]), m3 = r.pick([4.5, 5, 6, 7.5]), c = r.int(8, 25);
    return {
      e: `A conta de água de uma cidade é calculada assim: uma taxa fixa de ${reais(fixo)} mais ${reais(m3)} por metro cúbico consumido. Quanto paga uma família que consumiu ${c} m³?`,
      r: fixo + m3 * c,
      d: [(fixo + m3) * c, m3 * c, fixo * c + m3, fixo + m3 * (c - 1)],
      f: reais,
      x: expl('função afim', 'Parte fixa (b) mais taxa por unidade (a) vezes a quantidade (x): C(x) = ax + b.', `C(${c}) = ${num(fixo)} + ${num(m3)} × ${c} = ${reais(fixo + m3 * c)}.`),
    };
  },
  // 3. zero da afim
  (r) => {
    const a = r.pick([2, 3, 4, 5, -2, -3, -4]), x0 = r.int(-6, 9);
    if (x0 === 0) return facil[2](r);
    const b = -a * x0;
    return {
      e: `Qual é o zero (raiz) da função f(x) = ${afim(a, b)}?`,
      r: x0,
      d: [-x0, b, a, x0 + 1],
      x: expl('zero da função', 'Zero é o x que faz f(x) = 0 — é onde a reta corta o eixo x.', `${a}x${termo(b)} = 0 ⇒ x = ${x0}.`),
    };
  },
  // 4. taxa de variação
  (r) => {
    const x1 = r.int(-4, 3), x2 = x1 + r.int(1, 4), a = r.int(-4, 5) || 1, b = r.int(-5, 5);
    return {
      e: `O gráfico de uma função afim passa pelos pontos ${ponto(x1, a * x1 + b)} e ${ponto(x2, a * x2 + b)}. Qual é a taxa de variação (coeficiente angular) dessa função?`,
      r: a,
      d: [-a, b === a ? b + 2 : b, a + 1, a - 1],
      x: expl('taxa de variação', 'a = quanto y mudou ÷ quanto x mudou.', `(${a * x2 + b} − ${a * x1 + b}) ÷ (${x2} − ${x1}) = ${a * (x2 - x1)}/${x2 - x1} = ${a}.`),
    };
  },
  // 5. crescente ou decrescente
  (r) => {
    const fs = [
      [r.int(2, 6), r.int(-5, 5)],
      [r.int(1, 4), -r.int(1, 9)],
      [-r.int(1, 5), r.int(1, 9)],
      [r.int(2, 3), 0],
      [r.pick([0.5, 1.5]), r.int(1, 4)],
    ];
    const dec = fs[2];
    return {
      e: 'Qual das funções abaixo é DECRESCENTE?',
      r: `f(x) = ${afim(dec[0], dec[1])}`,
      d: fs.filter((f) => f !== dec).map((f) => `f(x) = ${afim(f[0], f[1])}`),
      x: expl('sinal do coeficiente a', 'Na função afim f(x) = ax + b, quem manda na subida ou descida é o "a": a > 0 sobe, a < 0 desce. O "b" só desloca a reta.', `Só f(x) = ${afim(dec[0], dec[1])} tem a = ${dec[0]} < 0.`),
    };
  },
  // 6. lei a partir da tabela
  (r) => {
    const a = r.int(2, 5), b = r.int(-3, 6);
    const xs = [0, 1, 2, 3];
    return {
      e: `A tabela mostra valores de uma função afim: ${xs.map((x) => `f(${x}) = ${a * x + b}`).join('; ')}. Qual é a lei dessa função?`,
      r: `f(x) = ${afim(a, b)}`,
      d: [`f(x) = ${afim(b || 1, a)}`, `f(x) = ${afim(a, b + a)}`, `f(x) = ${afim(a + 1, b)}`, `f(x) = ${afim(a, -b || 2)}`, `f(x) = ${afim(1, b + a)}`],
      x: expl('ler a e b na tabela', 'Em f(0) se lê o b (onde a reta corta o eixo y). O quanto f aumenta a cada passo de 1 em x é o a.', `f(0) = ${b} ⇒ b = ${b}; f sobe ${a} a cada passo ⇒ a = ${a}.`),
    };
  },
  // 7. corte no eixo y
  (r) => {
    const a = r.pick([1, 2, -1, 3]), b = r.int(-6, 6), c = r.int(-9, 9);
    if (c === 0) return facil[6](r);
    return {
      e: `Em que ponto o gráfico de f(x) = ${quad(a, b, c)} corta o eixo y?`,
      r: ponto(0, c),
      d: [ponto(c, 0), ponto(0, b), ponto(0, a), ponto(0, -c), ponto(b, c)],
      x: expl('corte no eixo y', 'No eixo y, x = 0. Fazendo x = 0, sobra só o termo independente c.', `f(0) = ${c} ⇒ ${ponto(0, c)}.`),
    };
  },
  // 8. f(k) quadrática
  (r) => {
    const a = r.pick([1, 2, -1, 3]), b = r.int(-5, 5), c = r.int(-6, 6), k = r.int(-3, 4);
    if (k === 0) return facil[7](r);
    const v = a * k * k + b * k + c;
    return {
      e: `Sendo f(x) = ${quad(a, b, c)}, calcule f(${k}).`,
      r: v,
      d: [a * k * 2 + b * k + c, -a * k * k + b * k + c, a * k * k - b * k + c, v + 2, a * k + b * k + c],
      x: expl('substituição com potência', 'Atenção: (−3)² = 9 (o sinal entra no parêntese), mas −3² = −9. Use parênteses ao substituir.', `f(${k}) = ${a}·(${k})²${termo(b)}·(${k})${termo(c)} = ${a * k * k}${termo(b * k)}${termo(c)} = ${v}.`),
    };
  },
  // 9. concavidade
  (r) => {
    const a = r.pick([-3, -2, -1, 1, 2, 4]), b = r.int(-5, 5), c = r.int(-5, 5);
    return {
      e: `O gráfico de f(x) = ${quad(a, b, c)} é uma parábola. O que se pode afirmar sobre ela?`,
      r: a > 0 ? 'Tem concavidade voltada para cima e, por isso, um ponto de mínimo.' : 'Tem concavidade voltada para baixo e, por isso, um ponto de máximo.',
      d: [
        a > 0 ? 'Tem concavidade voltada para baixo e, por isso, um ponto de máximo.' : 'Tem concavidade voltada para cima e, por isso, um ponto de mínimo.',
        a > 0 ? 'Tem concavidade voltada para cima e, por isso, um ponto de máximo.' : 'Tem concavidade voltada para baixo e, por isso, um ponto de mínimo.',
        'É uma reta, porque o coeficiente de x² é constante.',
        `Corta o eixo y no ponto ${ponto(0, b)}.`,
        'Não tem vértice.',
      ],
      x: expl('sinal de a na parábola', 'a > 0: "sorriso" (mínimo). a < 0: "carranca" (máximo).', `Aqui a = ${a}${a > 0 ? ' > 0' : ' < 0'}.`),
    };
  },
  // 10. depreciação
  (r) => {
    const v0 = r.pick([60000, 80000, 90000, 120000]), dep = r.pick([4000, 5000, 6000, 7500]), n = r.int(2, 7);
    return {
      e: `Um carro novo custa ${reais(v0)} e, por estimativa da seguradora, perde ${reais(dep)} de valor por ano, de forma linear. Qual será o valor do carro após ${n} anos?`,
      r: v0 - dep * n,
      d: [v0 - dep, v0 + dep * n, v0 - dep * (n + 1), dep * n],
      f: reais,
      x: expl('função afim decrescente', 'Valor = valor inicial − perda anual × anos: V(t) = b + at, com a negativo.', `V(${n}) = ${num(v0)} − ${num(dep)} × ${n} = ${reais(v0 - dep * n)}.`),
    };
  },
  // 11. reservatório esvaziando
  (r) => {
    const vaz = r.pick([25, 30, 40, 50]), h = r.int(12, 40);
    const v0 = vaz * h;
    return {
      e: `Uma caixa-d'água tem ${num(v0)} litros e, por causa de um vazamento, perde ${vaz} litros por hora, sempre no mesmo ritmo. Em quantas horas ela ficará vazia?`,
      r: h,
      d: [h / 2, h + 5, v0 / (vaz * 2), vaz],
      f: (v) => `${num(v)} h`,
      x: expl('zero da função', `V(t) = ${v0} − ${vaz}t. A caixa esvazia quando V(t) = 0.`, `${v0} − ${vaz}t = 0 ⇒ t = ${h} h.`),
    };
  },
  // 12. Celsius → Fahrenheit
  (r) => {
    const c = r.pick([-10, 15, 25, 30, 35, 40, 100]);
    const f = 1.8 * c + 32;
    return {
      e: `A relação entre as escalas de temperatura é F = 1,8C + 32. Um turista americano vê no Brasil um termômetro marcando ${c} °C. Qual é essa temperatura em graus Fahrenheit?`,
      r: f,
      d: [1.8 * (c + 32), c + 32, 1.8 * c, (c - 32) / 1.8],
      f: (v) => `${num(v)} °F`,
      x: expl('substituição em fórmula', 'A fórmula já é uma função afim: basta trocar C pelo valor dado.', `F = 1,8 × ${c} + 32 = ${num(f)} °F.`),
    };
  },
  // 13. ponto onde a reta corta o eixo x
  (r) => {
    const a = r.pick([2, 3, 4, 5]), x0 = r.int(-4, 6);
    if (x0 === 0) return facil[12](r);
    const b = -a * x0;
    return {
      e: `A reta de equação y = ${afim(a, b)} corta o eixo x no ponto:`,
      r: ponto(x0, 0),
      d: [ponto(0, x0), ponto(0, b), ponto(b, 0), ponto(-x0, 0), ponto(x0, b)],
      x: expl('corte no eixo x', 'No eixo x, y = 0.', `${afim(a, b)} = 0 ⇒ x = ${x0}; ponto ${ponto(x0, 0)}.`),
    };
  },
  // 14. aluguel de bicicleta
  (r) => {
    const fixo = r.pick([3, 4, 5]), p = r.pick([0.5, 0.6, 0.8]), min = r.pick([40, 60, 90, 120]);
    const tot = fixo + p * (min / 10);
    return {
      e: `Um aplicativo de bicicletas cobra ${reais(fixo)} para desbloquear e ${reais(p)} a cada 10 minutos de uso. Quanto custa um passeio de ${min} minutos?`,
      r: tot,
      d: [fixo + p * min, (fixo + p) * (min / 10), p * (min / 10), fixo + p * (min / 10 - 1)],
      f: reais,
      x: expl('função afim', 'Conte quantos blocos de 10 minutos cabem no passeio e some a taxa fixa.', `${min} min = ${min / 10} blocos; ${num(fixo)} + ${num(p)} × ${min / 10} = ${reais(tot)}.`),
    };
  },
];
facil[0].vezes = 2;
facil[2].vezes = 2;
facil[7].vezes = 2;

const medio = [
  // 1. máximo ou mínimo
  (r) => {
    const a = r.pick([-3, -2, -1, 1, 2, 3]), xv = r.int(-4, 4), yv = r.int(-9, 9);
    const b = -2 * a * xv, c = a * xv * xv + yv;
    return {
      e: `Qual é o valor ${a < 0 ? 'máximo' : 'mínimo'} da função f(x) = ${quad(a, b, c)}?`,
      r: yv,
      d: [xv === yv ? xv + 3 : xv, -yv, c === yv ? c + 1 : c, yv + a],
      x: expl('vértice', 'O máximo (a < 0) ou mínimo (a > 0) acontece no vértice: xᵥ = −b/2a; o valor é f(xᵥ) (ou −Δ/4a).', `xᵥ = ${-b}/${2 * a} = ${xv}; f(${xv}) = ${yv}.`),
    };
  },
  // 2. lucro máximo
  (r) => {
    const xv = r.int(10, 60), c = r.int(1, 9) * 100;
    const b = 2 * xv;
    return {
      e: `O lucro de uma empresa, em reais, ao vender x unidades de um produto é dado por L(x) = −x² + ${b}x − ${c}. Quantas unidades devem ser vendidas para que o lucro seja máximo?`,
      r: xv,
      d: [b, xv * xv - c, xv / 2, c / 10],
      x: expl('xᵥ = −b/2a', 'O "melhor resultado" de uma quadrática está no vértice.', `x = −${b}/(2 · (−1)) = ${xv} unidades.`),
    };
  },
  // 3. afim por dois pontos
  (r) => {
    const a = r.int(-4, 5) || 3, b = r.int(-6, 6), x1 = r.int(-3, 2), x2 = x1 + r.int(2, 4), k = r.int(4, 9);
    return {
      e: `Uma função afim f satisfaz f(${x1}) = ${a * x1 + b} e f(${x2}) = ${a * x2 + b}. Qual é o valor de f(${k})?`,
      r: a * k + b,
      d: [a * k, a * k - b, k + b, a * (k + 1) + b],
      x: expl('achar a e b', 'Com dois pontos, calcule a pela taxa de variação e depois b substituindo um ponto.', `a = (${a * x2 + b} − ${a * x1 + b})/(${x2} − ${x1}) = ${a}; b = ${b}. f(${k}) = ${a * k + b}.`),
    };
  },
  // 4. composição
  (r) => {
    const a = r.int(2, 5), b = r.int(-5, 5), c = r.int(1, 4), d = r.int(-3, 6), k = r.int(-2, 4);
    const g = c * k + d;
    return {
      e: `Sendo f(x) = ${afim(a, b)} e g(x) = ${afim(c, d)}, qual é o valor de f(g(${k}))?`,
      r: a * g + b,
      d: [c * (a * k + b) + d, a * k + b + g, (a * k + b) * g, a * g - b],
      x: expl('composição de dentro para fora', 'Calcule primeiro g(k); o resultado entra em f.', `g(${k}) = ${g}; f(${g}) = ${a} · ${g}${termo(b)} = ${a * g + b}.`),
    };
  },
  // 5. inversa
  (r) => {
    const a = r.pick([2, 3, 4, 5]), b = r.int(-9, 9), y = r.int(-5, 10);
    if (y === b) return medio[4](r);
    return {
      e: `Sendo f(x) = ${afim(a, b)} e f⁻¹ a sua inversa, qual é o valor de f⁻¹(${y})?`,
      r: fracao(y - b, a),
      d: [fracao(a * y + b, 1), fracao(y + b, a), fracao(a, y - b || 1), fracao(y - b + a, a)],
      x: expl('inversa = pergunta ao contrário', `f⁻¹(${y}) responde: "qual x faz f(x) = ${y}?"`, `${a}x${termo(b)} = ${y} ⇒ x = ${fracao(y - b, a)}.`),
    };
  },
  // 6. raízes
  (r) => {
    const r1 = r.int(-5, 4), r2 = r.int(r1 + 1, 7);
    const s = r1 + r2, p = r1 * r2;
    return {
      e: `Quais são os zeros da função f(x) = ${quad(1, -s, p)}?`,
      r: `${r1} e ${r2}`,
      d: [`${-r1} e ${-r2}`, `${r1} e ${-r2}`, `${-r1} e ${r2}`, `${s} e ${p}`, `${r1 + 1} e ${r2 + 1}`],
      x: expl('soma e produto', 'Procure dois números que somam −b/a e multiplicam c/a.', `Somam ${s} e multiplicam ${p}: ${r1} e ${r2}.`),
    };
  },
  // 7. coordenadas do vértice
  (r) => {
    const a = r.pick([1, -1, 2]), xv = r.int(-4, 5), yv = r.int(-6, 8);
    const b = -2 * a * xv, c = a * xv * xv + yv;
    return {
      e: `Quais são as coordenadas do vértice da parábola y = ${quad(a, b, c)}?`,
      r: ponto(xv, yv),
      d: [ponto(-xv, yv), ponto(yv, xv), ponto(xv, c), ponto(xv, -yv), ponto(-xv, -yv)],
      x: expl('fórmula do vértice', 'xᵥ = −b/(2a); depois yᵥ = f(xᵥ).', `xᵥ = ${-b}/${2 * a} = ${xv}; yᵥ = f(${xv}) = ${yv}.`),
    };
  },
  // 8. interseção de retas
  (r) => {
    const x = r.int(-3, 6), a1 = r.int(1, 4), a2 = -r.int(1, 4), b1 = r.int(-5, 5);
    const y = a1 * x + b1, b2 = y - a2 * x;
    return {
      e: `Os gráficos de f(x) = ${afim(a1, b1)} e g(x) = ${afim(a2, b2)} se cruzam em qual ponto?`,
      r: ponto(x, y),
      d: [ponto(y, x), ponto(x, -y), ponto(-x, y), ponto(x + 1, y + a1), ponto(0, b1)],
      x: expl('igualar as funções', 'No ponto de encontro, as duas funções têm o mesmo x e o mesmo y.', `${afim(a1, b1)} = ${afim(a2, b2)} ⇒ ${a1 - a2}x = ${b2 - b1} ⇒ x = ${x}; y = ${y}.`),
    };
  },
  // 9. função por partes (tarifa)
  (r) => {
    const lim = r.pick([100, 150, 200]), p1 = r.pick([0.6, 0.7, 0.8]), p2 = r.pick([0.9, 1, 1.2]), c = lim + r.int(2, 12) * 10;
    const tot = lim * p1 + (c - lim) * p2;
    return {
      e: `Uma companhia de energia cobra ${reais(p1)} por kWh até ${lim} kWh e ${reais(p2)} por kWh para o consumo que passar de ${lim} kWh. Quanto paga quem consumiu ${c} kWh?`,
      r: tot,
      d: [c * p2, c * p1, lim * p1 + c * p2, (c - lim) * p2],
      f: reais,
      x: expl('função definida por partes', 'Cada preço vale só para a sua faixa: os primeiros kWh custam um valor, o excedente custa outro.', `${lim} × ${num(p1)} + ${c - lim} × ${num(p2)} = ${num(lim * p1)} + ${num((c - lim) * p2)} = ${reais(tot)}.`),
    };
  },
  // 10. conjunto imagem
  (r) => {
    const a = r.pick([1, -1, 2, -2]), xv = r.int(-3, 4), yv = r.int(-5, 7);
    const b = -2 * a * xv, c = a * xv * xv + yv;
    return {
      e: `Qual é o conjunto imagem da função f(x) = ${quad(a, b, c)}, definida para todo x real?`,
      r: a > 0 ? `y ≥ ${yv}` : `y ≤ ${yv}`,
      d: [a > 0 ? `y ≤ ${yv}` : `y ≥ ${yv}`, `y ≥ ${xv}`, a > 0 ? `y ≥ ${c}` : `y ≤ ${c}`, 'todos os números reais', a > 0 ? `y > ${yv}` : `y < ${yv}`],
      x: expl('imagem pela altura do vértice', 'A parábola com a > 0 nunca desce abaixo do vértice; com a < 0, nunca sobe acima dele.', `Vértice ${ponto(xv, yv)}; a ${a > 0 ? '> 0 ⇒ y ≥ ' : '< 0 ⇒ y ≤ '}${yv}.`),
    };
  },
  // 11. sinal da afim
  (r) => {
    const a = -r.int(1, 5), x0 = r.int(-3, 8);
    const b = -a * x0;
    return {
      e: `Para quais valores de x a função f(x) = ${afim(a, b)} é positiva?`,
      r: `x < ${x0}`,
      d: [`x > ${x0}`, `x < ${-x0}`, `x > ${b}`, `x = ${x0}`, `x ≤ ${x0}`],
      x: expl('estudo do sinal', `Como a = ${a} < 0, a reta desce: é positiva antes da raiz e negativa depois.`, `Raiz: x = ${x0}. f(x) > 0 para x < ${x0}.`),
    };
  },
  // 12. taxa média de variação da quadrática
  (r) => {
    const a = r.pick([1, 2, 3]), b = r.int(-4, 4), c = r.int(-5, 5), x1 = r.int(0, 2), x2 = x1 + r.pick([2, 3, 4]);
    const f = (x) => a * x * x + b * x + c;
    const t = (f(x2) - f(x1)) / (x2 - x1);
    return {
      e: `Qual é a taxa média de variação de f(x) = ${quad(a, b, c)} quando x vai de ${x1} a ${x2}?`,
      r: t,
      d: [f(x2) - f(x1), (f(x2) + f(x1)) / 2, t + a, f(x2) / x2],
      x: expl('taxa média de variação', 'É a inclinação da reta que liga os dois pontos do gráfico: Δy ÷ Δx.', `f(${x1}) = ${f(x1)}, f(${x2}) = ${f(x2)}. (${f(x2)} − ${f(x1)}) ÷ ${x2 - x1} = ${num(t)}.`),
    };
  },
  // 13. lei a partir de dois cortes
  (r) => {
    const yb = r.int(2, 9), xa = r.pick([1, 2, 3, 4, 6]);
    if (yb % xa) return medio[12](r);
    const a = -yb / xa;
    return {
      e: `Uma reta corta o eixo y no ponto ${ponto(0, yb)} e o eixo x no ponto ${ponto(xa, 0)}. Qual é a lei da função afim correspondente?`,
      r: `f(x) = ${afim(a, yb)}`,
      d: [`f(x) = ${afim(-a, yb)}`, `f(x) = ${afim(a, xa)}`, `f(x) = ${afim(yb, xa)}`, `f(x) = ${afim(-xa / yb, yb)}`, `f(x) = ${afim(a, -yb)}`],
      x: expl('coeficientes pelo gráfico', 'b é onde corta o eixo y. a = Δy/Δx entre os dois pontos.', `b = ${yb}; a = (0 − ${yb})/(${xa} − 0) = ${num(a)}.`),
    };
  },
  // 14. maior área com perímetro fixo
  (r) => {
    const p = r.pick([24, 36, 40, 48, 60, 80]);
    return {
      e: `Com ${p} metros de tela, ${nome(r)} quer cercar uma horta retangular (os quatro lados com tela). Qual é a maior área possível?`,
      r: (p / 4) ** 2,
      d: [(p / 2) ** 2, (p * p) / 8, p * 2, (p / 4) * (p / 4 - 2)],
      f: (v) => `${num(v)} m²`,
      x: expl('máximo de função quadrática', `Lados x e ${p / 2} − x: A(x) = x(${p / 2} − x), parábola com a < 0. O vértice fica no meio das raízes 0 e ${p / 2}.`, `x = ${p / 4} m (é um quadrado); A = ${p / 4}² = ${num((p / 4) ** 2)} m².`),
    };
  },
];
medio[0].vezes = 2;
medio[7].vezes = 2;
medio[8].vezes = 2;

const dificil = [
  // 1. cercado no muro
  (r) => {
    const p = r.pick([40, 60, 80, 100, 120, 200]);
    return {
      e: `Um fazendeiro tem ${p} m de cerca para fazer um cercado retangular encostado em um muro reto (o muro forma um dos lados e não precisa de cerca). Qual é a maior área que ele pode cercar?`,
      r: (p * p) / 8,
      d: [(p * p) / 16, (p * p) / 4, Math.round((p / 3) ** 2), p * 2],
      f: (v) => `${num(v)} m²`,
      x: expl('modelar e achar o vértice', `Lados perpendiculares ao muro: x; lado paralelo: ${p} − 2x. A(x) = x(${p} − 2x).`, `Raízes 0 e ${p / 2}; vértice em x = ${p / 4}. A = ${p / 4} × ${p / 2} = ${num((p * p) / 8)} m².`),
    };
  },
  // 2. altura máxima
  (r) => {
    const v = r.pick([10, 20, 30, 40]), h0 = r.pick([0, 5, 15]);
    const hm = (v * v) / 20 + h0;
    return {
      e: `Uma bola é lançada para cima${h0 ? ` do alto de uma plataforma de ${h0} m` : ' a partir do chão'}, e sua altura, em metros, é h(t) = −5t² + ${v}t${termo(h0)}, com t em segundos. Qual é a altura máxima atingida?`,
      r: hm,
      d: [v / 10, (v * v) / 10 + h0, (v * v) / 40 + h0, v * 2],
      f: (x) => `${num(x)} m`,
      x: expl('vértice da parábola', 'A altura máxima é o y do vértice.', `t = −${v}/(2 · (−5)) = ${v / 10} s; h(${v / 10}) = ${num(hm)} m.`),
    };
  },
  // 3. preço que maximiza a receita
  (r) => {
    const p = r.pick([10, 20, 30]), q = r.pick([200, 300, 400, 600]), k = r.pick([5, 10]);
    const xv = (q - k * p) / (2 * k);
    if (xv <= 0 || !Number.isInteger(xv)) return dificil[2](r);
    return {
      e: `Uma loja vende ${q} camisetas por mês a ${reais(p)} cada. Uma pesquisa mostrou que, a cada R$ 1,00 de aumento no preço, ${k} camisetas a menos são vendidas. Qual preço maximiza a receita?`,
      r: p + xv,
      d: [p, p + xv / 2, p + 2 * xv, q / k],
      f: reais,
      x: expl('receita = preço × quantidade', `Com aumento x: R(x) = (${p} + x)(${q} − ${k}x), uma parábola com a < 0.`, `Raízes x = −${p} e x = ${q / k}; vértice no meio: x = ${xv}. Preço: ${reais(p + xv)}.`),
    };
  },
  // 4. área do triângulo raízes/eixo y
  (r) => {
    const a = r.pick([1, 2]), r1 = r.int(-4, -1), r2 = r.int(1, 5);
    const b = -a * (r1 + r2), c = a * r1 * r2;
    return {
      e: `O gráfico de f(x) = ${quad(a, b, c)} corta o eixo x nos pontos A e B e o eixo y no ponto C. Qual é a área do triângulo ABC?`,
      r: ((r2 - r1) * Math.abs(c)) / 2,
      d: [(r2 - r1) * Math.abs(c), ((r2 - r1) * Math.abs(c)) / 4, r2 - r1 + Math.abs(c), Math.abs(c)],
      f: (v) => `${num(v)} u.a.`,
      x: expl('pontos notáveis da parábola', 'Raízes dão a base no eixo x; o termo c dá a altura (corte no eixo y).', `Raízes ${r1} e ${r2} (base ${r2 - r1}); C = ${ponto(0, c)}. Área = ${r2 - r1} × ${Math.abs(c)} ÷ 2 = ${num(((r2 - r1) * Math.abs(c)) / 2)}.`),
    };
  },
  // 5. positiva para todo x
  (r) => {
    const k = r.pick([2, 3, 4, 5, 6]);
    return {
      e: `Para que valores de m a função f(x) = x² + mx + ${k * k} é positiva para todo número real x?`,
      r: `−${2 * k} < m < ${2 * k}`,
      d: [`m > ${2 * k}`, `m < −${2 * k} ou m > ${2 * k}`, `−${k} < m < ${k}`, `m ≥ 0`, `−${2 * k} ≤ m ≤ ${2 * k}`],
      x: expl('Δ < 0', 'Com a > 0, a parábola fica toda acima do eixo x quando não tem raízes reais, ou seja, Δ < 0.', `Δ = m² − ${4 * k * k} < 0 ⇒ m² < ${4 * k * k} ⇒ −${2 * k} < m < ${2 * k}.`),
    };
  },
  // 6. parábola por três pontos
  (r) => {
    const a = r.pick([1, 2, -1, 3]), b = r.int(-4, 4), c = r.int(-5, 5);
    const f = (x) => a * x * x + b * x + c;
    return {
      e: `Uma função quadrática f satisfaz f(0) = ${f(0)}, f(1) = ${f(1)} e f(−1) = ${f(-1)}. Qual é o valor de f(2)?`,
      r: f(2),
      d: [f(2) + 2 * a, 2 * f(1) - f(0), f(1) * 2, f(-2)],
      x: expl('sistema com os pontos', 'f(0) dá o c. Somando e subtraindo f(1) e f(−1), aparecem a e b.', `c = ${c}; f(1) + f(−1) = 2a + 2c ⇒ a = ${a}; f(1) − f(−1) = 2b ⇒ b = ${b}. f(2) = 4·${a} + 2·${b} + ${c} = ${f(2)}.`),
    };
  },
  // 7. vértice e um ponto
  (r) => {
    const a = r.pick([1, 2, -1, -2]), xv = r.int(-3, 4), yv = r.int(-5, 6), k = r.int(1, 4);
    const x0 = xv + k, y0 = a * k * k + yv;
    const alvo = xv - k - 1;
    return {
      e: `Uma parábola tem vértice no ponto ${ponto(xv, yv)} e passa pelo ponto ${ponto(x0, y0)}. Qual é o valor da função em x = ${alvo}?`,
      r: a * (alvo - xv) ** 2 + yv,
      d: [y0, a * (alvo - xv) ** 2 - yv, (alvo - xv) ** 2 + yv, a * (alvo + xv) ** 2 + yv],
      x: expl('forma canônica', 'Com o vértice (xᵥ, yᵥ), escreva f(x) = a(x − xᵥ)² + yᵥ e use o outro ponto para achar a.', `${y0} = a(${x0} − ${xv})² + ${yv} ⇒ a = ${a}. f(${alvo}) = ${a}(${alvo - xv})² + ${yv} = ${a * (alvo - xv) ** 2 + yv}.`),
    };
  },
  // 8. mínima soma de quadrados
  (r) => {
    const s = r.pick([10, 16, 20, 30, 40]);
    return {
      e: `Dois números reais somam ${s}. Qual é o MENOR valor possível para a soma dos quadrados desses números?`,
      r: (s * s) / 2,
      d: [(s * s) / 4, s * s, s, (s * s) / 2 + s],
      x: expl('mínimo de função quadrática', `Números x e ${s} − x: S(x) = x² + (${s} − x)² = 2x² − ${2 * s}x + ${s * s}.`, `Vértice: x = ${s / 2}; S = 2 × (${s / 2})² = ${num((s * s) / 2)}.`),
    };
  },
  // 9. f(ax + b) conhecido
  (r) => {
    const p = r.pick([2, 3]), q = r.int(-3, 3), A = r.int(2, 4), B = r.int(-6, 6), k = r.int(2, 9);
    // f(px + q) = A·p·x + C  →  f(u) = A·u + D, com C = A·q + D
    const D = B;
    const C = A * q + D;
    return {
      e: `Sabe-se que f(${p}x${termo(q)}) = ${afim(A * p, C)} para todo x real. Qual é o valor de f(${k})?`,
      r: A * k + D,
      d: [A * p * k + C, A * k + C, A * k - D, (A * p * k + C) / p],
      x: expl('troca de variável', `Chame u = ${p}x${termo(q)}. Então x = (u${termo(-q)})/${p}; substitua para escrever f(u).`, `f(u) = ${A * p}·(u${termo(-q)})/${p}${termo(C)} = ${afim(A, D)}. f(${k}) = ${A * k + D}.`),
    };
  },
  // 10. tempo até tocar o solo
  (r) => {
    const t = r.pick([3, 4, 5, 6]), t1 = -r.pick([1, 2]);
    // h = −5(t − T)(t − t1) = −5t² + 5(T + t1)t − 5T·t1
    const b = 5 * (t + t1), c = -5 * t * t1;
    return {
      e: `Uma pedra é lançada do alto de um prédio, e sua altura, em metros, é h(t) = −5t² + ${b}t + ${c}, com t em segundos. Após quanto tempo ela atinge o chão?`,
      r: t,
      d: [b / 10, t1 * -1 === t ? t + 1 : -t1, t + 1, c / 5],
      f: (v) => `${num(v)} s`,
      x: expl('raiz positiva', 'Chegar ao chão é h(t) = 0. A raiz negativa não tem sentido físico.', `−5t² + ${b}t + ${c} = 0 ⇒ t² − ${b / 5}t − ${c / 5} = 0 ⇒ t = ${t} ou t = ${t1}. Resposta: ${t} s.`),
    };
  },
  // 11. reta tangente à parábola
  (r) => {
    const m = r.pick([1, 2, 3, 4]);
    // y = x² e y = mx + k → x² − mx − k = 0, Δ = m² + 4k = 0
    return {
      e: `Para qual valor de k a reta y = ${m === 1 ? '' : m}x + k toca a parábola y = x² em um único ponto?`,
      r: fracao(-m * m, 4),
      d: [fracao(m * m, 4), fracao(-m, 2), fracao(m * m, 2), '0', fracao(-m * m, 2)],
      x: expl('Δ = 0 na interseção', 'Iguale as equações: um único ponto comum significa uma única raiz, isto é, Δ = 0.', `x² − ${m}x − k = 0 ⇒ Δ = ${m * m} + 4k = 0 ⇒ k = ${fracao(-m * m, 4)}.`),
    };
  },
  // 12. translação de gráfico
  (r) => {
    const h = r.int(-4, 5), v = r.int(-5, 6);
    if (h === 0 || v === 0) return dificil[11](r);
    return {
      e: `O gráfico de g(x) = (x${termo(-h)})²${termo(v)} é obtido a partir do gráfico de f(x) = x². Qual é o vértice de g?`,
      r: ponto(h, v),
      d: [ponto(-h, v), ponto(h, -v), ponto(-h, -v), ponto(v, h), ponto(0, v)],
      x: expl('translações', 'Trocar x por (x − h) desloca o gráfico h unidades para a direita; somar v desloca v para cima. O vértice (0, 0) de x² vai junto.', `(x${termo(-h)}) ⇒ ${h > 0 ? 'direita' : 'esquerda'} ${Math.abs(h)}; ${termo(v)} ⇒ ${v > 0 ? 'cima' : 'baixo'} ${Math.abs(v)}. Vértice ${ponto(h, v)}.`),
    };
  },
  // 13. lucro com receita linear e custo quadrático
  (r) => {
    const p = r.pick([50, 60, 80]), cv = r.pick([10, 20]), cf = r.pick([200, 300, 400]);
    const xv = (p - cv) / 2;
    const lmax = xv * xv - cf;
    return {
      e: `Uma oficina vende cada peça por ${reais(p)}. O custo para produzir x peças por dia é C(x) = x² + ${cv}x + ${cf} (em reais). Qual é o lucro diário máximo?`,
      r: lmax,
      d: [xv, p * xv - cf, lmax + cf, xv * xv],
      f: reais,
      x: expl('lucro = receita − custo', `L(x) = ${p}x − (x² + ${cv}x + ${cf}) = −x² + ${p - cv}x − ${cf}.`, `Vértice: x = ${xv}; L(${xv}) = −${xv * xv} + ${(p - cv) * xv} − ${cf} = ${reais(lmax)}.`),
    };
  },
];
dificil[1].vezes = 2;
dificil[6].vezes = 2;
dificil[9].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '05-funcoes-afim-e-quadratica',
    titulo: 'Funções afim e quadrática',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Lei de formação, gráficos, zeros, sinal, vértice, máximos e mínimos e aplicações.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
