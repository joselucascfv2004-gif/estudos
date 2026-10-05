// Matemática — Função composta e função inversa (Álgebra).
import { expl, fracao, num, reais } from './util.mjs';

const N = (v) => num(v);
const P = (v) => (v < 0 ? `(${num(v)})` : num(v));
const afim = (a, b) => `${a === 1 ? '' : a === -1 ? '−' : num(a)}x${b === 0 ? '' : b > 0 ? ` + ${num(b)}` : ` − ${num(-b)}`}`;
const F = (v, d = 6) => (Number.isInteger(v) ? N(v) : fracao(Math.round(v * d), d));

const facil = [
  // 1. f(g(k))
  (r) => {
    const a = r.int(2, 4), b = r.int(1, 6), c = r.int(1, 5), k = r.int(2, 7);
    const g = k - c, f = a * g + b;
    return {
      e: `Sendo f(x) = ${afim(a, b)} e g(x) = ${afim(1, -c)}, qual é o valor de f(g(${k}))?`,
      r: f,
      d: [a * k + b - c, a * (a * k + b) + b, a * k + b, f + c],
      x: expl('de dentro para fora', 'Em f(g(k)), calcule primeiro g(k) e use o resultado como entrada de f.', `g(${k}) = ${g}; f(${g}) = ${a}·${P(g)} + ${b} = ${f}.`),
    };
  },
  // 2. g(f(k))
  (r) => {
    const a = r.int(2, 5), b = r.int(1, 6), c = r.int(1, 9), k = r.int(1, 6);
    const f = a * k - b, g = f + c;
    return {
      e: `Sendo f(x) = ${afim(a, -b)} e g(x) = ${afim(1, c)}, calcule g(f(${k})).`,
      r: g,
      d: [a * (k + c) - b, a * k + c, g - a, f],
      x: expl('a ordem importa', 'g(f(k)): primeiro f, depois g. Trocar a ordem dá outro resultado.', `f(${k}) = ${f}; g(${f}) = ${f} + ${c} = ${g}.`),
    };
  },
  // 3. f(g(x)) com quadrado
  (r) => {
    const c = r.int(1, 6);
    return {
      e: `Sendo f(x) = x² e g(x) = x + ${c}, qual é a lei de f(g(x))?`,
      r: `x² + ${2 * c}x + ${c * c}`,
      d: [`x² + ${c}`, `x² + ${c * c}`, `x² + ${c}x + ${c * c}`, `x² + ${2 * c}x + ${c}`],
      x: expl('substituir a lei inteira', `f(g(x)) = f(x + ${c}) = (x + ${c})². Não confunda com g(f(x)) = x² + ${c}.`, `(x + ${c})² = x² + ${2 * c}x + ${c * c}.`),
    };
  },
  // 4. inversa de função afim
  (r) => {
    const a = r.int(2, 6), b = r.int(1, 9) * r.pick([1, -1]);
    return {
      e: `Qual é a lei da função inversa de f(x) = ${afim(a, b)}?`,
      r: `f⁻¹(x) = (x ${b > 0 ? '−' : '+'} ${Math.abs(b)})/${a}`,
      d: [`f⁻¹(x) = (x ${b > 0 ? '+' : '−'} ${Math.abs(b)})/${a}`, `f⁻¹(x) = ${a}x ${b > 0 ? '−' : '+'} ${Math.abs(b)}`, `f⁻¹(x) = 1/(${afim(a, b)})`, `f⁻¹(x) = x/${a} ${b > 0 ? '−' : '+'} ${Math.abs(b)}`],
      x: expl('trocar x e y e isolar', `Escreva y = ${afim(a, b)}, troque x por y e isole y: x = ${a}y ${b > 0 ? '+' : '−'} ${Math.abs(b)}.`, `y = (x ${b > 0 ? '−' : '+'} ${Math.abs(b)})/${a}.`),
    };
  },
  // 5. f⁻¹(k)
  (r) => {
    const a = r.int(2, 5), b = r.int(1, 8), x = r.int(2, 9);
    const k = a * x - b;
    return {
      e: `Sendo f(x) = ${afim(a, -b)}, qual é o valor de f⁻¹(${k})?`,
      r: x,
      d: [a * k - b, k + b, x + 1, (k - b) / a === x ? x - 1 : (k - b) / a],
      x: expl('f⁻¹(k) é "quem leva a k"', `f⁻¹(${k}) é o número x tal que f(x) = ${k}.`, `${a}x − ${b} = ${k} ⇒ x = ${x}.`),
    };
  },
  // 6. tabela
  (r) => {
    const vals = r.shuffle([2, 3, 4, 5, 6]);
    // f definida em {1..5}
    const f = (x) => vals[x - 1];
    const k = r.int(1, 5);
    const fk = f(k);
    if (fk > 5 || fk === k) return facil[5](r);
    const v = f(fk);
    return {
      e: `Uma função f é dada pela tabela: f(1) = ${vals[0]}, f(2) = ${vals[1]}, f(3) = ${vals[2]}, f(4) = ${vals[3]} e f(5) = ${vals[4]}. Qual é o valor de f(f(${k}))?`,
      r: v,
      d: [fk, k, [2, 3, 4, 5, 6].find((z) => z !== v && z !== fk && z !== k) ?? 7, v === 6 ? 1 : 6],
      x: expl('ler a tabela duas vezes', `Primeiro f(${k}) = ${fk}; depois use ${fk} como entrada.`, `f(${fk}) = ${v}.`),
    };
  },
  // 7. domínio
  (r) => {
    const a = r.int(1, 9);
    return {
      e: `Qual é o domínio (maior subconjunto dos reais) da função f(x) = 5/(x − ${a})?`,
      r: `ℝ − {${a}}`,
      d: ['ℝ', `ℝ − {0}`, `x > ${a}`, `ℝ − {−${a}}`],
      x: expl('não se divide por zero', `O denominador não pode ser zero: x − ${a} ≠ 0.`, `x ≠ ${a}: domínio ℝ − {${a}}.`),
    };
  },
  // 8. não injetora
  (r) => ({
    e: 'Qual destas funções, de ℝ em ℝ, NÃO é injetora (ou seja, leva dois valores diferentes de x ao mesmo y)?',
    r: 'f(x) = x²',
    d: ['f(x) = 2x + 1', 'f(x) = x³', 'f(x) = −x + 4', 'f(x) = 5x'],
    x: expl('teste da reta horizontal', 'Se uma reta horizontal corta o gráfico em dois pontos, dois valores de x têm a mesma imagem, e a função não tem inversa.', 'Em f(x) = x², por exemplo, f(2) = f(−2) = 4. As retas e a cúbica nunca repetem valores.'),
  }),
  // 9. Celsius e Fahrenheit
  (r) => {
    const c = r.pick([5, 10, 15, 20, 25, 30, 35, 40]);
    const f = 1.8 * c + 32;
    return {
      e: `A temperatura em Fahrenheit é dada por F = 1,8C + 32, em que C é a temperatura em Celsius. Um termômetro marca ${N(f)} °F. Quanto é isso em Celsius?`,
      r: c,
      d: [(f - 32) * 1.8, f / 1.8, f - 32, (f + 32) / 1.8],
      f: (v) => `${N(Math.round(v * 10) / 10)} °C`,
      x: expl('função inversa', 'Para voltar de F para C, faça as operações ao contrário: tire 32 e divida por 1,8.', `C = (${N(f)} − 32) ÷ 1,8 = ${N(f - 32)} ÷ 1,8 = ${c} °C.`),
    };
  },
  // 10. f(f(x)) numérico
  (r) => {
    const k = 2 * r.int(3, 9);
    const f = (x) => x / 2 + 1;
    return {
      e: `Sendo f(x) = x/2 + 1, qual é o valor de f(f(${k}))?`,
      r: f(f(k)),
      d: [f(k), k / 4 + 1, k / 4 + 2, f(k) + 1],
      x: expl('aplicar duas vezes', 'Calcule f do número e aplique f de novo no resultado.', `f(${k}) = ${f(k)}; f(${f(k)}) = ${N(f(f(k)))}.`),
    };
  },
  // 11. táxi ao contrário
  (r) => {
    const fixo = r.pick([4, 5, 6]), km = r.pick([2, 2.5, 3]), d = r.int(5, 18);
    const v = fixo + km * d;
    return {
      e: `Uma corrida de táxi custa P(d) = ${N(fixo)} + ${num(km)}d reais, em que d é a distância em km. Um passageiro pagou ${reais(v)}. Quantos quilômetros ele percorreu?`,
      r: d,
      d: [v / km, d + 2, (v + fixo) / km, d - 1],
      f: (x) => `${N(Math.round(x * 10) / 10)} km`,
      x: expl('usar a inversa', `Tire o valor fixo e divida pelo preço por km: d = (P − ${fixo}) ÷ ${num(km)}.`, `(${N(v)} − ${fixo}) ÷ ${num(km)} = ${d} km.`),
    };
  },
  // 12. inversa de x³
  (r) => {
    const a = r.int(2, 5);
    return {
      e: `Sendo f(x) = x³, qual é o valor de f⁻¹(−${a ** 3})?`,
      r: -a,
      d: [a, -(a ** 3) / 3, 1 / a ** 3, -3 * a],
      f: (v) => (Number.isInteger(v) ? N(v) : `−1/${a ** 3}`),
      x: expl('inversa do cubo é a raiz cúbica', `Qual número elevado ao cubo dá −${a ** 3}?`, `(−${a})³ = −${a ** 3}, então f⁻¹(−${a ** 3}) = −${a}.`),
    };
  },
  // 13. f(g(x)) afim
  (r) => {
    const a = r.int(2, 5), c = r.int(1, 9);
    return {
      e: `Sendo f(x) = x + ${c} e g(x) = ${a}x, qual é a lei de f(g(x))?`,
      r: afim(a, c),
      d: [afim(a, a * c), afim(1, a + c), afim(a + 1, c), afim(a, -c)],
      x: expl('substituir x por g(x)', `f(g(x)) = g(x) + ${c}.`, `= ${afim(a, c)}. (Já g(f(x)) = ${a}(x + ${c}) = ${afim(a, a * c)}, que é diferente.)`),
    };
  },
  // 14. imagem de domínio finito
  (r) => {
    const a = r.int(2, 3), b = r.int(-2, 3);
    const dom = [0, 1, 2, 3];
    const img = dom.map((x) => a * x + b);
    return {
      e: `A função f(x) = ${afim(a, b)} tem domínio {0, 1, 2, 3}. Qual é o seu conjunto imagem?`,
      r: `{${img.map(N).join(', ')}}`,
      d: [`{${dom.map((x) => N(a * x)).join(', ')}}`, `{${dom.map((x) => N(x + b)).join(', ')}}`, `{${img.slice(0, 3).map(N).join(', ')}}`, `{${dom.map((x) => N(a * x + b + 1)).join(', ')}}`],
      x: expl('aplicar a lei a cada elemento', 'A imagem é o conjunto das saídas de todos os elementos do domínio.', dom.map((x) => `f(${x}) = ${N(a * x + b)}`).join('; ') + '.'),
    };
  },
  // 15. frete e desconto
  (r) => {
    const frete = r.pick([10, 15, 20, 25]), desc = r.pick([10, 20, 15]), preco = r.pick([80, 100, 150, 200]);
    const v = (1 - desc / 100) * (preco + frete);
    return {
      e: `Numa loja, g(x) = x + ${frete} soma o frete ao preço x, e f(x) = ${num(1 - desc / 100)}x aplica um desconto de ${desc}%. Qual é o valor de f(g(${preco}))?`,
      r: v,
      d: [(1 - desc / 100) * preco + frete, preco + frete, preco * (1 - desc / 100), v + frete],
      f: reais,
      x: expl('composição na ordem certa', 'Em f(g(x)), primeiro soma-se o frete e depois aplica-se o desconto sobre o total.', `g(${preco}) = ${preco + frete}; f(${preco + frete}) = ${num(1 - desc / 100)} × ${preco + frete} = ${reais(v)}.`),
    };
  },
  // 16. f(x) = x (ponto fixo de reta)
  (r) => {
    const a = r.int(2, 5), b = r.int(2, 9);
    const x = b / (a - 1);
    return {
      e: `Os gráficos de f(x) = ${afim(a, -b)} e de sua inversa f⁻¹ se cortam sobre a reta y = x. Em que ponto?`,
      r: `(${F(x)}, ${F(x)})`,
      d: [`(${b}, ${b})`, `(0, ${N(-b)})`, `(${F(b / a)}, ${F(b / a)})`, `(${F(-x)}, ${F(-x)})`],
      x: expl('f(x) = x', 'Os gráficos de f e f⁻¹ são simétricos em relação à reta y = x; para uma função crescente, eles se cortam sobre ela.', `${a}x − ${b} = x ⇒ x = ${F(x)}.`),
    };
  },
  // 17. simetria
  (r) => {
    const [a, b] = [r.int(1, 9), r.int(1, 9)];
    if (a === b) return facil[16](r);
    return {
      e: `O gráfico de uma função f passa pelo ponto (${a}, ${b}). Por qual ponto passa obrigatoriamente o gráfico de f⁻¹?`,
      r: `(${b}, ${a})`,
      d: [`(${a}, ${b})`, `(−${a}, −${b})`, `(${a}, −${b})`, `(−${b}, ${a})`],
      x: expl('trocar entrada e saída', `Se f(${a}) = ${b}, então f⁻¹(${b}) = ${a}. As coordenadas trocam de lugar.`, `Ponto (${b}, ${a}), simétrico em relação a y = x.`),
    };
  },
];

const medio = [
  // 1. descobrir g
  (r) => {
    const a = r.int(2, 3), b = r.int(1, 5), p = r.int(2, 4), q = r.int(-4, 4) || 1;
    // f(x) = ax + b; g(x) = px + q ⇒ f(g(x)) = apx + aq + b
    return {
      e: `Sendo f(x) = ${afim(a, b)} e f(g(x)) = ${afim(a * p, a * q + b)}, qual é a lei de g(x)?`,
      r: afim(p, q),
      d: [afim(a * p, q), afim(p, a * q + b), afim(p, q + b), afim(p - 1, q)],
      x: expl('igualar as leis', `f(g(x)) = ${a}·g(x) + ${b}. Então ${a}·g(x) + ${b} = ${afim(a * p, a * q + b)}.`, `${a}·g(x) = ${afim(a * p, a * q)} ⇒ g(x) = ${afim(p, q)}.`),
    };
  },
  // 2. inversa de função racional
  (r) => {
    const [a, b] = r.pick([[1, 2], [3, 1], [2, 3], [1, 4]]);
    return {
      e: `Qual é a inversa de f(x) = (x + ${a})/(x − ${b}), para x ≠ ${b}?`,
      r: `f⁻¹(x) = (${b}x + ${a})/(x − 1)`,
      d: [`f⁻¹(x) = (x − ${b})/(x + ${a})`, `f⁻¹(x) = (${a}x + ${b})/(x − 1)`, `f⁻¹(x) = (${b}x − ${a})/(x + 1)`, `f⁻¹(x) = (x + ${b})/(x − ${a})`],
      x: expl('trocar x e y e isolar', `x = (y + ${a})/(y − ${b}) ⇒ x(y − ${b}) = y + ${a} ⇒ xy − y = ${b}x + ${a}.`, `y(x − 1) = ${b}x + ${a} ⇒ y = (${b}x + ${a})/(x − 1).`),
    };
  },
  // 3. f(ax + b) dada
  (r) => {
    const p = r.int(2, 3), q = r.int(1, 5), k = r.int(4, 11);
    // f(2x + 1) = p(2x + 1) + q ⇒ f(t) = pt + q
    return {
      e: `Uma função satisfaz f(2x + 1) = ${afim(2 * p, p + q)} para todo x. Qual é o valor de f(${k})?`,
      r: p * k + q,
      d: [2 * p * k + p + q, p * k + p + q, (k - 1) / 2 * 2 * p + q + 1, p * k],
      x: expl('achar a entrada certa', `Para obter f(${k}), escolha x com 2x + 1 = ${k}, ou seja, x = ${F((k - 1) / 2)}.`, `f(${k}) = ${2 * p}·${F((k - 1) / 2)} + ${p + q} = ${p * k + q}.`),
    };
  },
  // 4. composição cíclica
  (r) => {
    const a = r.pick([2, 3, 4, -1, -2]);
    const f = (x) => 1 / (1 - x);
    const v = f(f(f(a)));
    return {
      e: `Sendo f(x) = 1/(1 − x), qual é o valor de f(f(f(${N(a)})))?`,
      r: a,
      d: [f(a), f(f(a)), -a, 1 / a],
      f: (x) => F(x, 12),
      x: expl('calcular passo a passo e notar o ciclo', 'Aplicar f três vezes devolve o número inicial: f(f(f(x))) = x.', `f(${N(a)}) = ${F(f(a), 12)}; f(${F(f(a), 12)}) = ${F(f(f(a)), 12)}; f(${F(f(f(a)), 12)}) = ${F(v, 12)}.`),
    };
  },
  // 5. raízes de f(g(x))
  (r) => {
    const k = r.int(1, 3), a = r.pick([2, 3]), b = r.int(1, 7);
    // f(x) = x² − k², g(x) = ax + b ⇒ ax + b = ±k
    const s = ((k - b) + (-k - b)) / a;
    return {
      e: `Sendo f(x) = x² − ${k * k} e g(x) = ${afim(a, b)}, qual é a soma das raízes de f(g(x)) = 0?`,
      r: s,
      d: [(k - b) / a, -s, (2 * k) / a, s + k],
      f: (x) => F(x, a),
      x: expl('f(algo) = 0', `f(y) = 0 quando y = ±${k}. Então ${afim(a, b)} = ${k} ou ${afim(a, b)} = −${k}.`, `x = ${F((k - b) / a, a)} ou x = ${F((-k - b) / a, a)}; soma = ${F(s, a)}.`),
    };
  },
  // 6. inversa da exponencial
  (r) => {
    const b = r.pick([2, 3, 5]), n = r.int(3, 6);
    return {
      e: `Sendo f(x) = ${b}ˣ, qual é o valor de f⁻¹(${num(b ** n)})?`,
      r: n,
      d: [b ** n / b, n + 1, b * n, n - 1],
      x: expl('inversa da exponencial é o logaritmo', `f⁻¹(${num(b ** n)}) é o expoente que leva ${b} a ${num(b ** n)}.`, `${b}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[n]} = ${num(b ** n)} ⇒ f⁻¹(${num(b ** n)}) = ${n}.`),
    };
  },
  // 7. f⁻¹(f⁻¹(k))
  (r) => {
    const a = r.pick([2, 3]), b = r.int(1, 5);
    const inv = (y) => (y - b) / a;
    const k = a * (a * r.int(1, 4) + b) + b;
    return {
      e: `Sendo f(x) = ${afim(a, b)}, qual é o valor de f⁻¹(f⁻¹(${k}))?`,
      r: inv(inv(k)),
      d: [inv(k), a * (a * k + b) + b, inv(k) + 1, (k - 2 * b) / (2 * a)],
      f: (x) => F(x, a * a),
      x: expl('inversa aplicada duas vezes', `f⁻¹(x) = (x − ${b})/${a}.`, `f⁻¹(${k}) = ${N(inv(k))}; f⁻¹(${N(inv(k))}) = ${N(inv(inv(k)))}.`),
    };
  },
  // 8. domínio da composta
  (r) => {
    const a = r.int(1, 9);
    return {
      e: `Sendo f(x) = √x e g(x) = x − ${a}, qual é o domínio de f(g(x))?`,
      r: `x ≥ ${a}`,
      d: [`x ≥ 0`, `x > ${a}`, `x ≥ −${a}`, 'ℝ'],
      x: expl('o que entra na raiz', `f(g(x)) = √(x − ${a}); o radicando não pode ser negativo.`, `x − ${a} ≥ 0 ⇒ x ≥ ${a}.`),
    };
  },
  // 9. bijetora
  (r) => ({
    e: 'Qual destas funções, de ℝ em ℝ, é bijetora (tem inversa definida em todo ℝ)?',
    r: `f(x) = x³ + ${r.int(1, 5)}`,
    d: ['f(x) = x²', 'f(x) = |x|', 'f(x) = x² + 1', 'f(x) = 2'],
    x: expl('injetora e sobrejetora', 'Bijetora: cada y real é atingido por exatamente um x. As outras repetem valores (x² e |x| dão o mesmo para x e −x) ou não atingem todos os reais.', 'A função cúbica é sempre crescente e assume todos os valores reais.'),
  }),
  // 10. achar a e b com f e f⁻¹
  (r) => {
    const a = r.int(2, 5), b = r.int(1, 7), x1 = r.int(1, 3), x2 = x1 + r.int(1, 3);
    return {
      e: `Uma função afim f(x) = ax + b satisfaz f(${x1}) = ${a * x1 + b} e f⁻¹(${a * x2 + b}) = ${x2}. Qual é o valor de f(0)?`,
      r: b,
      d: [a, a + b, a * x1, b + 1],
      x: expl('f⁻¹(y) = x ⇔ f(x) = y', `f⁻¹(${a * x2 + b}) = ${x2} quer dizer f(${x2}) = ${a * x2 + b}. Com dois pontos, ache a reta.`, `a = (${a * x2 + b} − ${a * x1 + b})/(${x2} − ${x1}) = ${a}; b = ${a * x1 + b} − ${a}·${x1} = ${b} = f(0).`),
    };
  },
  // 11. área em função do perímetro
  (r) => {
    const l = r.int(4, 15);
    return {
      e: `A área de um quadrado é A(l) = l², e o lado em função do perímetro é l(P) = P/4. Qual é a área de um quadrado de perímetro ${4 * l} cm?`,
      r: l * l,
      d: [(4 * l) ** 2 / 2, 4 * l, l * 4, ((4 * l) / 2) ** 2],
      f: (v) => `${N(v)} cm²`,
      x: expl('composição A(l(P))', 'Primeiro passe do perímetro ao lado, depois do lado à área: A(P) = (P/4)².', `l = ${4 * l} ÷ 4 = ${l}; A = ${l}² = ${l * l} cm².`),
    };
  },
  // 12. Fahrenheit → Kelvin
  (r) => {
    const f = r.pick([32, 50, 68, 86, 104, 212]);
    const c = (f - 32) / 1.8, k = c + 273;
    return {
      e: `C(F) = (F − 32)/1,8 converte Fahrenheit em Celsius, e K(C) = C + 273 converte Celsius em Kelvin. Quanto vale K(C(${f}))?`,
      r: k,
      d: [f + 273, (f - 32) * 1.8 + 273, c, k - 32],
      f: (v) => `${N(Math.round(v))} K`,
      x: expl('composição de conversões', 'Aplique primeiro C e depois K.', `C(${f}) = ${N(c)}; K(${N(c)}) = ${N(k)} K.`),
    };
  },
  // 13. g com g(f(x)) = x
  (r) => {
    const a = r.int(2, 5), b = r.int(1, 6), x = r.int(1, 6);
    const k = a * x - b;
    return {
      e: `Sendo f(x) = ${afim(a, -b)}, a função g satisfaz g(f(x)) = x para todo x. Qual é o valor de g(${k})?`,
      r: x,
      d: [a * k - b, (k - b) / a, k, x + 1],
      f: (v) => F(v, a),
      x: expl('g é a inversa de f', `g(f(x)) = x diz que g desfaz o que f faz: g = f⁻¹, e g(x) = (x + ${b})/${a}.`, `g(${k}) = (${k} + ${b})/${a} = ${x}.`),
    };
  },
  // 14. tabelas de f e g
  (r) => {
    const g = r.shuffle([1, 2, 3, 4]);
    const f = r.shuffle([5, 6, 7, 8]);
    const k = r.int(1, 4);
    const v = f[g[k - 1] - 1];
    return {
      e: `As funções f e g são dadas por: g(1) = ${g[0]}, g(2) = ${g[1]}, g(3) = ${g[2]}, g(4) = ${g[3]} e f(1) = ${f[0]}, f(2) = ${f[1]}, f(3) = ${f[2]}, f(4) = ${f[3]}. Qual é o valor de f(g(${k}))?`,
      r: v,
      d: [f[k - 1] === v ? 9 : f[k - 1], g[k - 1], ...f.filter((z) => z !== v && z !== f[k - 1]).slice(0, 2)],
      x: expl('ler as duas tabelas em sequência', `Primeiro g(${k}) = ${g[k - 1]}; depois f(${g[k - 1]}).`, `f(${g[k - 1]}) = ${v}.`),
    };
  },
  // 15. inversa de x² com domínio restrito
  (r) => {
    const n = r.int(4, 15);
    return {
      e: `A função f(x) = x², definida apenas para x ≥ 0, tem inversa. Qual é o valor de f⁻¹(${n * n})?`,
      r: n,
      d: [-n, n * n / 2, 2 * n, n * n],
      x: expl('restringir o domínio', 'x² não é injetora em ℝ, mas, com x ≥ 0, cada y tem um só x. A inversa é a raiz quadrada.', `f⁻¹(${n * n}) = √${n * n} = ${n}.`),
    };
  },
  // 16. descontos compostos
  (r) => {
    const d1 = r.pick([10, 20, 30]), d2 = r.pick([10, 20, 25]);
    const tot = 100 - (100 - d1) * (100 - d2) / 100;
    return {
      e: `Uma loja aplica f(x) = ${num(1 - d1 / 100)}x (desconto de ${d1}%) e, sobre o resultado, g(x) = ${num(1 - d2 / 100)}x (desconto de ${d2}%). A composição g(f(x)) equivale a um único desconto de quantos por cento?`,
      r: tot,
      d: [d1 + d2, d1 + d2 + 2, (d1 + d2) / 2, tot - 5],
      f: (v) => `${N(v)}%`,
      x: expl('composição de funções lineares', 'Compor multiplicações é multiplicar os fatores.', `g(f(x)) = ${num(1 - d1 / 100)} × ${num(1 - d2 / 100)}x = ${num((1 - d1 / 100) * (1 - d2 / 100))}x: desconto total de ${N(tot)}%.`),
    };
  },
  // 17. composta de afim com afim
  (r) => {
    const a = r.int(2, 4), b = r.int(1, 5), c = r.int(2, 4), d = r.int(-5, 5) || 2;
    return {
      e: `Sendo f(x) = ${afim(a, b)} e g(x) = ${afim(c, d)}, qual é a lei de g(f(x))?`,
      r: afim(a * c, c * b + d),
      d: [afim(a * c, a * d + b), afim(a * c, b + d), afim(a + c, b + d), afim(a * c, b * d)],
      x: expl('substituir f dentro de g', `g(f(x)) = ${c}·(${afim(a, b)}) ${d < 0 ? '−' : '+'} ${Math.abs(d)}.`, `= ${afim(a * c, c * b)} ${d < 0 ? '−' : '+'} ${Math.abs(d)} = ${afim(a * c, c * b + d)}.`),
    };
  },
];

const dificil = [
  // 1. inversa de racional em ponto
  (r) => {
    const [a, b, c, y] = r.pick([[2, 3, 1, 5], [3, 1, 2, 5], [1, 4, 2, 3], [2, 5, 3, 4]]);
    // f(x) = (ax + b)/(x − c) = y ⇒ ax + b = yx − yc ⇒ x = (b + yc)/(y − a)
    const x = (b + y * c) / (y - a);
    return {
      e: `Sendo f(x) = (${afim(a, b)})/(x − ${c}), qual é o valor de f⁻¹(${y})?`,
      r: x,
      d: [(a * y + b) / (y - c), (b - y * c) / (y - a), y - c, (b + y * c) / (y + a)],
      f: (v) => F(v, (y - a) * (y + a) * (y - c) || 1),
      x: expl('resolver f(x) = valor', `f⁻¹(${y}) é o x com (${afim(a, b)})/(x − ${c}) = ${y}.`, `${afim(a, b)} = ${y}x − ${y * c} ⇒ ${y - a}x = ${b + y * c} ⇒ x = ${fracao(b + y * c, y - a)}.`),
    };
  },
  // 2. f(x + 1) dada
  (r) => {
    const c = r.int(1, 4), k = r.int(3, 8);
    // f(x + 1) = x² + 2x + c = (x + 1)² + c − 1 ⇒ f(t) = t² + c − 1
    return {
      e: `Uma função satisfaz f(x + 1) = x² + 2x + ${c} para todo x real. Qual é o valor de f(${k})?`,
      r: k * k + c - 1,
      d: [(k - 1) ** 2 + 2 * (k - 1) + c - 1 + 2, k * k + 2 * k + c, (k + 1) ** 2 + c, k * k + c],
      x: expl('completar o quadrado', `x² + 2x + ${c} = (x + 1)² + ${c - 1}. Chamando t = x + 1, f(t) = t² + ${c - 1}.`, `f(${k}) = ${k * k} + ${c - 1} = ${k * k + c - 1}.`),
    };
  },
  // 3. f(f(x)) dada, f afim crescente
  (r) => {
    const a = r.int(2, 4), b = r.int(1, 5), k = r.int(1, 5);
    return {
      e: `Uma função afim crescente satisfaz f(f(x)) = ${afim(a * a, a * b + b)} para todo x. Qual é o valor de f(${k})?`,
      r: a * k + b,
      d: [a * a * k + a * b + b, a * k, a * k - b, (a * a * k + a * b + b) / 2],
      x: expl('comparar coeficientes', `Com f(x) = ax + b, f(f(x)) = a²x + ab + b. Então a² = ${a * a} (a > 0, pois é crescente) e ab + b = ${a * b + b}.`, `a = ${a}, b = ${b}; f(${k}) = ${a * k + b}.`),
    };
  },
  // 4. iteração
  (r) => {
    const n = r.int(4, 6), x0 = r.int(0, 2);
    let v = x0;
    const seq = [];
    for (let i = 0; i < n; i++) { v = 2 * v + 1; seq.push(v); }
    return {
      e: `Sendo f(x) = 2x + 1, qual é o valor de f aplicada ${n} vezes seguidas ao número ${x0}, isto é, f(f(...f(${x0})...))?`,
      r: v,
      d: [seq[n - 2], 2 * n + x0, 2 ** n + x0, v + 1],
      x: expl('iterar com cuidado', 'Aplique f repetidamente, sempre sobre o resultado anterior.', `${x0} → ${seq.join(' → ')}.`),
    };
  },
  // 5. domínio de f(g(x)) com divisão
  (r) => {
    const raiz = r.pick([2, 3, 4, 5]);
    const v = raiz * raiz - 1;
    return {
      e: `Sendo f(x) = 1/(x − ${v}) e g(x) = x² − 1, qual é o domínio de f(g(x))?`,
      r: `ℝ − {−${raiz}, ${raiz}}`,
      d: [`ℝ − {${v}}`, `ℝ − {${raiz}}`, `ℝ − {−1, 1}`, 'ℝ'],
      x: expl('onde a composta não existe', `f(g(x)) = 1/(x² − 1 − ${v}). O denominador zera quando x² = ${v + 1}.`, `x = ±${raiz} ficam de fora.`),
    };
  },
  // 6. inversa de quadrática com domínio restrito
  (r) => {
    const h = r.int(1, 4), k = r.int(1, 6), t = r.int(2, 6);
    // f(x) = (x − h)² + k, x ≥ h
    const y = t * t + k;
    return {
      e: `A função f(x) = x² − ${2 * h}x + ${h * h + k}, definida para x ≥ ${h}, é inversível. Qual é o valor de f⁻¹(${y})?`,
      r: h + t,
      d: [h - t, t, y - k, h + t + 1],
      x: expl('completar o quadrado', `f(x) = (x − ${h})² + ${k}. Resolva (x − ${h})² + ${k} = ${y} com x ≥ ${h}.`, `(x − ${h})² = ${t * t} ⇒ x − ${h} = ${t} ⇒ x = ${h + t}.`),
    };
  },
  // 7. equação funcional f(x) + 2f(1/x)
  (r) => {
    const k = r.int(2, 4);
    // f(x) + 2f(1/x) = 3x ⇒ f(x) = 2/x − x
    const v = 2 / k - k;
    return {
      e: `Uma função f, definida para x ≠ 0, satisfaz f(x) + 2·f(1/x) = 3x. Qual é o valor de f(${k})?`,
      r: v,
      d: [-v, k, 3 * k, 2 / k],
      f: (x) => F(x, k),
      x: expl('trocar x por 1/x e montar um sistema', `Com x = ${k}: f(${k}) + 2f(1/${k}) = ${3 * k}. Com x = 1/${k}: f(1/${k}) + 2f(${k}) = ${fracao(3, k)}.`, `Resolvendo o sistema: f(${k}) = ${F(v, k)}.`),
    };
  },
  // 8. função que é a própria inversa
  (r) => {
    const [a, b] = r.pick([[3, 2], [2, 5], [4, 1], [1, 3]]);
    const k = r.int(5, 12);
    return {
      e: `Sendo f(x) = (${afim(a, b)})/(x − ${a}), para x ≠ ${a}, qual é o valor de f(f(${k}))?`,
      r: k,
      d: [(a * k + b) / (k - a), -k, a, k + a],
      f: (v) => F(v, k - a),
      x: expl('f é a própria inversa', `Funções da forma (ax + b)/(x − a) satisfazem f(f(x)) = x. Confira: f(${k}) = ${F((a * k + b) / (k - a), k - a)}.`, `Aplicando f de novo volta-se a ${k}.`),
    };
  },
  // 9. achar f com g afim
  (r) => {
    const s = r.int(1, 4), c = r.int(1, 6), k = r.int(1, 5);
    // g(x) = x + s; f(g(x)) = (x + s)² + c ⇒ f(t) = t² + c
    return {
      e: `Sendo g(x) = x + ${s} e f(g(x)) = x² + ${2 * s}x + ${s * s + c}, qual é o valor de f(${k})?`,
      r: k * k + c,
      d: [k * k + 2 * s * k + s * s + c, (k + s) ** 2 + c, k * k, (k - s) ** 2 + c],
      x: expl('reconhecer g(x) dentro da lei', `x² + ${2 * s}x + ${s * s + c} = (x + ${s})² + ${c} = g(x)² + ${c}. Logo f(t) = t² + ${c}.`, `f(${k}) = ${k * k + c}.`),
    };
  },
  // 10. paridade da composta
  (r) => ({
    e: 'Se f é uma função par (f(−x) = f(x)) e g é uma função ímpar (g(−x) = −g(x)), então a composta f(g(x)) é:',
    r: 'par',
    d: ['ímpar', 'nem par nem ímpar, sempre', 'par e ímpar ao mesmo tempo, sempre', 'constante'],
    x: expl('testar −x', 'f(g(−x)) = f(−g(x)) = f(g(x)), porque f é par.', 'Exemplo: f(x) = x² e g(x) = x³ dão f(g(x)) = x⁶, que é par.'),
  }),
  // 11. inversa de potência de 10
  (r) => {
    const n = r.int(2, 6), d = r.int(1, 3);
    return {
      e: `Sendo f(x) = 10^(x − ${d}), qual é o valor de f⁻¹(${num(10 ** n)})?`,
      r: n + d,
      d: [n, n - d, 10 * n, n + d + 1],
      x: expl('inversa da exponencial', `f⁻¹(y) = log y + ${d}.`, `log ${num(10 ** n)} = ${n} ⇒ f⁻¹ = ${n} + ${d} = ${n + d}.`),
    };
  },
  // 12. pontos fixos
  (r) => {
    const k = r.int(1, 4);
    // x² − k = x ⇒ x² − x − k = 0 ⇒ soma = 1, produto = −k
    const pede = r.pick(['soma', 'produto']);
    return {
      e: `Os pontos fixos de uma função são os x com f(x) = x. Qual é o ${pede} dos pontos fixos de f(x) = x² − ${k}?`,
      r: pede === 'soma' ? 1 : -k,
      d: pede === 'soma' ? [-1, k, 0, 2] : [k, 1, -1, -k - 1],
      x: expl('resolver f(x) = x', `x² − ${k} = x ⇒ x² − x − ${k} = 0.`, `Soma das raízes = 1 e produto = −${k}.`),
    };
  },
  // 13. composições que comutam
  (r) => {
    const a = r.pick([4, 5, 7]);
    // f(x) = ax + 3, g(x) = 2x + b; f∘g = g∘f ⇒ ab + 3 = 6 + b ⇒ b = 3/(a − 1)
    const b = 3 / (a - 1);
    return {
      e: `Sendo f(x) = ${a}x + 3 e g(x) = 2x + b, para que valor de b vale f(g(x)) = g(f(x)) para todo x?`,
      r: b,
      d: [b + 1, 3, -b, 3 * (a - 1)],
      f: (v) => F(v, a - 1),
      x: expl('comparar os termos independentes', `f(g(x)) = ${2 * a}x + ${a}b + 3 e g(f(x)) = ${2 * a}x + 6 + b. Os coeficientes de x já são iguais.`, `${a}b + 3 = 6 + b ⇒ ${a - 1}b = 3 ⇒ b = ${F(b, a - 1)}.`),
    };
  },
  // 14. imposto ao contrário
  (r) => {
    const isento = r.pick([2000, 2500, 3000]), taxa = r.pick([15, 20, 25]), renda = isento + r.int(5, 20) * 200;
    const imposto = (taxa / 100) * (renda - isento);
    return {
      e: `Num modelo simplificado, o imposto é I(x) = ${num(taxa / 100)}·(x − ${num(isento)}) para rendas x acima de R$ ${num(isento)}. Uma pessoa pagou ${reais(imposto)} de imposto. Qual era a sua renda?`,
      r: renda,
      d: [imposto / (taxa / 100), renda - isento, imposto * taxa, renda + isento],
      f: reais,
      x: expl('inversa da função', `Resolva ${num(taxa / 100)}(x − ${num(isento)}) = ${num(imposto)}.`, `x − ${num(isento)} = ${num(imposto)} ÷ ${num(taxa / 100)} = ${num(renda - isento)} ⇒ x = ${reais(renda)}.`),
    };
  },
  // 15. triângulo com f e f⁻¹
  (r) => {
    const b = r.pick([2, 4, 6]);
    // f(x) = 2x − b; f⁻¹(x) = (x + b)/2; cruzam em x = b; cortes no eixo y: −b e b/2
    const area = ((b / 2 + b) * b) / 2;
    return {
      e: `Os gráficos de f(x) = 2x − ${b} e de sua inversa, junto com o eixo y, formam um triângulo. Qual é a área desse triângulo?`,
      r: area,
      d: [area * 2, (b * b) / 2, b * b, area / 2],
      x: expl('achar os vértices', `f⁻¹(x) = (x + ${b})/2. Os gráficos se cortam em f(x) = x ⇒ x = ${b}, no ponto (${b}, ${b}). No eixo y, f vale −${b} e f⁻¹ vale ${N(b / 2)}.`, `Base no eixo y: ${N(b / 2)} − (−${b}) = ${N(1.5 * b)}; altura ${b}. Área = ${N(1.5 * b)} · ${b} / 2 = ${N(area)}.`),
    };
  },
  // 16. composta de função racional
  (r) => {
    const k = r.int(1, 6);
    // f(x) = x/(x + 1) ⇒ f(f(x)) = x/(2x + 1)
    return {
      e: `Sendo f(x) = x/(x + 1), qual é o valor de f(f(${k}))?`,
      r: fracao(k, 2 * k + 1),
      d: [fracao(k, k + 1), fracao(k, 2 * k), fracao(k + 1, 2 * k + 1), fracao(1, k + 2)],
      x: expl('simplificar a composta', 'f(f(x)) = [x/(x + 1)] / [x/(x + 1) + 1] = x/(2x + 1).', `f(f(${k})) = ${k}/${2 * k + 1}.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '22-funcao-composta-e-inversa',
    titulo: 'Função composta e função inversa',
    provas: ['ENEM', 'Militares'],
    descricao: 'Composição de funções, domínio, funções injetoras e bijetoras, cálculo e gráfico da função inversa.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
