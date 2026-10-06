// Matemática — Função exponencial e logaritmo.
import { arred, expl, fracao, num, reais, sup } from './util.mjs';
import NOVOS from './mat-novos-extras.mjs';
import { novos } from './util.mjs';

const semPonto = (v) => num(v).replace(/\./g, '');
const sub = (n) => String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c] ?? c).join('');

const facil = [
  // 1. bˣ = N
  (r) => {
    const b = r.pick([2, 3, 5]), n = r.int(3, b === 2 ? 9 : 5);
    return {
      e: `Qual é o valor de x na equação ${b}ˣ = ${semPonto(b ** n)}?`,
      r: n,
      d: [n + 1, n - 1, b ** n / b, 2 * n],
      x: expl('mesma base', 'Escreva o número do lado direito como potência da mesma base; aí basta igualar os expoentes.', `${semPonto(b ** n)} = ${b}${sup(n)} ⇒ x = ${n}.`),
    };
  },
  // 2. log simples
  (r) => {
    const b = r.pick([2, 3, 5, 10]), n = r.int(-2, 5);
    if (n === 0 || n === 1) return facil[1](r);
    const arg = n >= 0 ? semPonto(b ** n) : `1/${b ** -n}`;
    return {
      e: `Qual é o valor de ${b === 10 ? `log ${arg}` : `log na base ${b} de ${arg}`}?`,
      r: n,
      d: [-n, n + 1, n - 1, b * n],
      x: expl('logaritmo é um expoente', 'O logaritmo de a na base b pergunta: "a que expoente devo elevar b para obter a?"', `${b}${sup(n)} = ${arg}, então o logaritmo é ${n}.`),
    };
  },
  // 3. bactérias
  (r) => {
    const n0 = r.pick([100, 200, 500, 1000]), h = r.pick([2, 3, 4]), k = r.int(3, 6);
    return {
      e: `Uma colônia de bactérias, inicialmente com ${num(n0)} indivíduos, dobra de tamanho a cada ${h} horas. Quantas bactérias haverá após ${h * k} horas?`,
      r: n0 * 2 ** k,
      d: [n0 * 2 * k, n0 * 2 ** (k - 1), n0 * k * h, n0 * 2 ** (k + 1)],
      x: expl('crescimento exponencial', 'Conte quantas vezes a colônia dobrou e multiplique por 2 essa quantidade de vezes.', `${h * k} ÷ ${h} = ${k} duplicações: ${num(n0)} × 2${sup(k)} = ${num(n0 * 2 ** k)}.`),
    };
  },
  // 4. log com log 2 e log 3
  (r) => {
    const [x, txt, v] = r.pick([[6, '2 · 3', 0.78], [12, '2² · 3', 1.08], [18, '2 · 3²', 1.26], [8, '2³', 0.9], [9, '3²', 0.96], [24, '2³ · 3', 1.38], [5, '10/2', 0.7], [15, '3 · 10/2', 1.18]]);
    return {
      e: `Considerando log 2 = 0,30 e log 3 = 0,48, qual é o valor de log ${x}?`,
      r: v,
      d: [arred(v + 0.3, 2), arred(v - 0.18, 2), 0.144, arred(v * 2, 2)],
      f: (z) => num(z, 2),
      x: expl('propriedades do log', 'Decomponha o número em fatores 2, 3 e 10: produto vira soma, potência vira multiplicação, divisão vira subtração.', `${x} = ${txt} ⇒ log ${x} = ${num(v, 2)}.`),
    };
  },
  // 5. expoente fracionário
  (r) => {
    const [b, p, q] = r.pick([[8, 2, 3], [27, 2, 3], [16, 3, 4], [32, 2, 5], [64, 2, 3], [81, 3, 4], [125, 2, 3]]);
    const raiz = Math.round(b ** (1 / q));
    return {
      e: `Qual é o valor de ${b}^(${p}/${q})?`,
      r: raiz ** p,
      d: [(b * p) / q, raiz, raiz * p, b ** p / q > 1000 ? raiz ** (p + 1) : Math.round(b ** p / q)],
      x: expl('expoente fracionário = raiz', `a^(p/q) = (raiz de índice q de a) elevada a p. Tire a raiz primeiro: os números ficam pequenos.`, `raiz ${q === 2 ? 'quadrada' : q === 3 ? 'cúbica' : `de índice ${q}`} de ${b} = ${raiz}; ${raiz}${sup(p)} = ${raiz ** p}.`),
    };
  },
  // 6. valor de f(x) = 2ˣ
  (r) => {
    const b = r.pick([2, 3]), a = r.int(2, 5), c = r.int(0, 2);
    return {
      e: `Sendo f(x) = ${b}ˣ, qual é o valor de f(${a}) − f(${c}) + f(−1)?`,
      r: fracao(3 * (b ** a - b ** c) * b + 3, 3 * b),
      d: [fracao(b ** a - b ** c, 1), fracao((b ** a - b ** c) * b - 1, b), String(b ** (a - c)), fracao(b ** a - b ** c + b, 1), fracao((b ** a + b ** c) * b + 1, b)],
      x: expl('substituição com expoente negativo', 'b⁻¹ = 1/b: expoente negativo inverte a base.', `${b ** a} − ${b ** c} + 1/${b} = ${fracao(3 * (b ** a - b ** c) * b + 3, 3 * b)}.`),
    };
  },
  // 7. exponencial decrescente
  (r) => {
    const base = r.pick(['(1/2)', '(0,8)', '(2/3)', '(0,5)']);
    const outras = r.sample(['2ˣ', '(3/2)ˣ', '10ˣ', '(1,5)ˣ', '5ˣ', '(1,1)ˣ'], 4);
    return {
      e: 'Qual das funções abaixo é DECRESCENTE em todo o seu domínio?',
      r: `f(x) = ${base}ˣ`,
      d: outras.map((o) => `f(x) = ${o}`),
      x: expl('base da exponencial', 'f(x) = bˣ cresce se b > 1 e decresce se 0 < b < 1 (multiplicar por algo menor que 1 diminui).', `Só ${base} está entre 0 e 1.`),
    };
  },
  // 8. soma de logs
  (r) => {
    const [a, b, res] = r.pick([[4, 25, 2], [2, 50, 2], [5, 20, 2], [8, 125, 3], [20, 50, 3], [25, 40, 3]]);
    return {
      e: `Calcule log ${a} + log ${b}.`,
      r: res,
      d: [res + 1, res - 1, a + b, arred(Math.log10(a + b), 2)],
      x: expl('log do produto', 'log a + log b = log(a · b). Multiplicando, aparece uma potência de 10.', `log(${a} × ${b}) = log ${a * b} = ${res}.`),
    };
  },
  // 9. bases diferentes
  (r) => {
    const [eq, res, passo] = r.pick([
      ['4ˣ = 8', '3/2', '2²ˣ = 2³ ⇒ 2x = 3'],
      ['9ˣ = 27', '3/2', '3²ˣ = 3³ ⇒ 2x = 3'],
      ['8ˣ = 16', '4/3', '2³ˣ = 2⁴ ⇒ 3x = 4'],
      ['25ˣ = 125', '3/2', '5²ˣ = 5³ ⇒ 2x = 3'],
      ['27ˣ = 9', '2/3', '3³ˣ = 3² ⇒ 3x = 2'],
      ['16ˣ = 8', '3/4', '2⁴ˣ = 2³ ⇒ 4x = 3'],
    ]);
    const [p, q] = res.split('/').map(Number);
    return {
      e: `Resolva a equação ${eq}.`,
      r: res,
      d: [fracao(q, p), String(p), fracao(p + 1, q), fracao(2 * p, q), fracao(p, 2 * q), String(q)],
      x: expl('base comum', 'Quando as bases são potências do mesmo número, reescreva tudo nessa base menor.', `${passo} ⇒ x = ${res}.`),
    };
  },
  // 10. remédio
  (r) => {
    const d0 = r.pick([200, 400, 800]), t = r.pick([4, 6, 8]), n = r.int(2, 4);
    return {
      e: `O organismo elimina metade de um medicamento a cada ${t} horas. Um paciente tomou ${d0} mg. Quantos miligramas ainda restam no corpo ${t * n} horas depois (sem nova dose)?`,
      r: d0 / 2 ** n,
      d: [d0 / (2 * n), d0 - (d0 / 4) * n, d0 / 2 ** (n + 1), d0 / 2 ** (n - 1)],
      f: (v) => `${num(v)} mg`,
      x: expl('meia-vida', 'A cada período, multiplica-se por 1/2. Não se tira sempre a mesma quantidade!', `${t * n} h = ${n} meias-vidas: ${d0} ÷ 2${sup(n)} = ${num(d0 / 2 ** n)} mg.`),
    };
  },
  // 11. logs especiais
  (r) => {
    const b1 = r.pick([3, 7, 9]), b2 = r.pick([2, 5, 6]), k = r.int(2, 4);
    return {
      e: `Qual é o valor de log${sub(b1)} 1 + log${sub(b2)} ${b2} + log ${semPonto(10 ** k)}?`,
      r: k + 1,
      d: [k, k + 2, b2 + k, 1],
      x: expl('logs que todo mundo deve saber', 'log de 1 é 0 em qualquer base; log da própria base é 1; log 10ᵏ = k.', `0 + 1 + ${k} = ${k + 1}.`),
    };
  },
];
facil[0].vezes = 2;
facil[2].vezes = 2;
facil[3].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. b^(x+k)
  (r) => {
    const b = r.pick([2, 3]), k = r.int(1, 3), n = r.int(3, b === 2 ? 8 : 5);
    const x = n - k;
    return {
      e: `Qual é a solução da equação ${b}^(x + ${k}) = ${semPonto(b ** n)}?`,
      r: x,
      d: [n, n + k, x - 1, -x === x ? x + 2 : -x],
      x: expl('igualar expoentes', 'Com as bases iguais, os expoentes também são iguais.', `${semPonto(b ** n)} = ${b}${sup(n)} ⇒ x + ${k} = ${n} ⇒ x = ${x}.`),
    };
  },
  // 2. log_b x = n
  (r) => {
    const b = r.pick([2, 3, 4, 5]), n = r.int(2, 4);
    return {
      e: `Se log na base ${b} de x é igual a ${n}, então x vale:`,
      r: b ** n,
      d: [b * n, n ** b, b + n, b ** (n + 1)],
      x: expl('definição de logaritmo', 'Dizer que o log de x na base b é n é o mesmo que dizer bⁿ = x.', `x = ${b}${sup(n)} = ${b ** n}.`),
    };
  },
  // 3. desvalorização percentual
  (r) => {
    const v = r.pick([40000, 50000, 60000, 80000]), t = r.pick([10, 20]), n = r.pick([2, 3]);
    const fim = v * (1 - t / 100) ** n;
    return {
      e: `Um carro de ${reais(v)} desvaloriza ${t}% ao ano em relação ao valor do ano anterior. Qual será o seu valor daqui a ${n} anos?`,
      r: fim,
      d: [v * (1 - (t * n) / 100), v * (1 - t / 100), v * (t / 100) ** n, fim * 0.9],
      f: reais,
      x: expl('decaimento exponencial', `Perder ${t}% ao ano é multiplicar por ${num(1 - t / 100)} a cada ano: V = V₀ · ${num(1 - t / 100)}ⁿ.`, `${num(v)} × ${num((1 - t / 100) ** n, 4)} = ${reais(fim)}.`),
    };
  },
  // 4. vezes maior
  (r) => {
    const k = r.pick([5, 10, 15, 20, 25]), m = r.pick([[4, 2], [8, 3], [16, 4], [32, 5]]);
    return {
      e: `Uma população dobra a cada ${k} anos. Em quanto tempo ela fica ${m[0]} vezes maior que a inicial?`,
      r: k * m[1],
      d: [k * m[0], (k * m[0]) / 2, k * (m[1] + 1), k + m[0]],
      f: (v) => `${num(v)} anos`,
      x: expl('potências de 2', `Ficar ${m[0]} vezes maior = dobrar ${m[1]} vezes (${m[0]} = 2${sup(m[1])}).`, `${m[1]} × ${k} = ${k * m[1]} anos.`),
    };
  },
  // 5. pH
  (r) => {
    const n = r.int(2, 12);
    return {
      e: `O pH de uma solução é dado por pH = −log[H⁺]. Se a concentração de íons H⁺ em um líquido é 10${sup(-n)} mol/L, qual é o seu pH?`,
      r: n,
      d: [-n, 14 - n === n ? n + 1 : 14 - n, n + 1, 10 * n],
      x: expl('log de potência de 10', 'log 10ᵏ = k. O sinal de menos da fórmula deixa o pH positivo.', `pH = −log 10${sup(-n)} = −(−${n}) = ${n}.`),
    };
  },
  // 6. mudança de base
  (r) => {
    const [b, a, res, txt] = r.pick([[4, 8, '3/2', '2³/2²'], [8, 4, '2/3', '2²/2³'], [9, 27, '3/2', '3³/3²'], [27, 9, '2/3', '3²/3³'], [16, 32, '5/4', '2⁵/2⁴'], [25, 125, '3/2', '5³/5²']]);
    const [p, q] = res.split('/').map(Number);
    return {
      e: `Qual é o valor de log na base ${b} de ${a}?`,
      r: res,
      d: [fracao(q, p), String(p), fracao(p + q, q), fracao(2 * p, q), String(q)],
      x: expl('mudança de base', 'Escreva base e logaritmando como potências do mesmo número primo; o log vira a razão dos expoentes.', `(${txt}): log = ${res}.`),
    };
  },
  // 7. 2ˣ + 2ˣ⁺¹
  (r) => {
    const n = r.int(2, 6), k = r.pick([1, 2]);
    const tot = 2 ** n * (1 + 2 ** k);
    return {
      e: `Resolva a equação 2ˣ + 2^(x + ${k}) = ${tot}.`,
      r: n,
      d: [n + k, n - 1, tot / 2, n + 1],
      x: expl('colocar em evidência', `2^(x + ${k}) = 2ˣ · ${2 ** k}. Junte os termos com 2ˣ.`, `2ˣ(1 + ${2 ** k}) = ${tot} ⇒ 2ˣ = ${2 ** n} ⇒ x = ${n}.`),
    };
  },
  // 8. domínio do log
  (r) => {
    const a = r.int(-5, 8);
    const sinal = r.pick([1, -1]);
    const expr = sinal > 0 ? `x${a >= 0 ? ' − ' + a : ' + ' + -a}` : `${a} − x`;
    return {
      e: `Para que a expressão log(${expr}) exista nos números reais, x deve satisfazer:`,
      r: sinal > 0 ? `x > ${a}` : `x < ${a}`,
      d: [sinal > 0 ? `x < ${a}` : `x > ${a}`, sinal > 0 ? `x ≥ ${a}` : `x ≤ ${a}`, `x > ${-a}`, 'x > 0', `x ≠ ${a}`],
      x: expl('condição de existência', 'Só existe log de número positivo (o logaritmando deve ser maior que zero).', `${expr} > 0 ⇒ ${sinal > 0 ? `x > ${a}` : `x < ${a}`}.`),
    };
  },
  // 9. juros compostos (cálculo direto)
  (r) => {
    const c = r.pick([1000, 2000, 5000]), i = r.pick([5, 10, 20]), n = r.pick([2, 3]);
    const m = c * (1 + i / 100) ** n;
    return {
      e: `Uma aplicação de ${reais(c)} rende ${i}% ao mês a juros compostos. Qual é o montante após ${n} meses?`,
      r: m,
      d: [c * (1 + (i * n) / 100), c * (1 + i / 100), m + c * 0.05, c * (i / 100) * n],
      f: reais,
      x: expl('função exponencial M = C(1 + i)ⁿ', 'A cada mês, o saldo é multiplicado pelo mesmo fator.', `${num(c)} × ${num(1 + i / 100)}${sup(n)} = ${reais(m)}.`),
    };
  },
  // 10. escala Richter (amplitude)
  (r) => {
    const m1 = r.int(4, 6), d = r.int(1, 3);
    return {
      e: `Na escala Richter, a magnitude é M = log(A/A₀), em que A é a amplitude das ondas do terremoto. Quantas vezes a amplitude de um terremoto de magnitude ${m1 + d} é maior que a de um de magnitude ${m1}?`,
      r: 10 ** d,
      d: [d, 10 * d, 10 ** (d + 1), 2 ** d],
      f: (v) => `${num(v)} vezes`,
      x: expl('escala logarítmica', 'Em escala log de base 10, cada ponto a mais multiplica a grandeza por 10.', `M₂ − M₁ = log(A₂/A₁) = ${d} ⇒ A₂/A₁ = 10${sup(d)} = ${semPonto(10 ** d)}.`),
    };
  },
  // 11. log com letras
  (r) => {
    const la = r.int(2, 5), lb = r.int(1, 4), p = r.pick([2, 3]), q = r.pick([1, 2]);
    return {
      e: `Sabendo que log a = ${la} e log b = ${lb}, qual é o valor de log(a${sup(p)} · b${q === 1 ? '' : sup(q)} / 10)?`,
      r: p * la + q * lb - 1,
      d: [p * la + q * lb, la * lb * p * q - 1, p * la - q * lb - 1, (la + lb) * (p + q) - 1],
      x: expl('propriedades do log', 'Potência sai multiplicando, produto vira soma, divisão vira subtração, e log 10 = 1.', `${p}·${la} + ${q}·${lb} − 1 = ${p * la + q * lb - 1}.`),
    };
  },
  // 12. f(x) = a·bˣ por dois pontos
  (r) => {
    const a = r.int(2, 6), b = r.pick([2, 3]), k = r.int(3, 5);
    return {
      e: `O gráfico de f(x) = a · bˣ passa pelos pontos (0, ${a}) e (1, ${a * b}). Qual é o valor de f(${k})?`,
      r: a * b ** k,
      d: [a * b * k, b ** k, a ** k, a * b ** (k - 1)],
      x: expl('ler os parâmetros nos pontos', 'f(0) = a (pois b⁰ = 1). f(1) = a · b dá o b.', `a = ${a}, b = ${a * b}/${a} = ${b}. f(${k}) = ${a} · ${b}${sup(k)} = ${a * b ** k}.`),
    };
  },
];
medio[0].vezes = 2;
medio[5].vezes = 2;
medio[7].vezes = 2;

const dificil = [
  // 1. soma de logs = n
  (r) => {
    const b = r.pick([2, 3]), k = r.int(1, 4), x = k + r.int(1, 6);
    const prod = x * (x - k);
    const n = Math.log(prod) / Math.log(b);
    if (Math.abs(n - Math.round(n)) > 1e-9) return dificil[0](r);
    return {
      e: `Qual é a solução da equação log${sub(b)}(x) + log${sub(b)}(x − ${k}) = ${Math.round(n)}?`,
      r: x,
      d: [x - k, k - x, x + k, b ** Math.round(n)],
      x: expl('juntar os logs e conferir o domínio', 'Some os logs (vira log do produto), volte para a forma exponencial e descarte a raiz que deixa algum logaritmando negativo.', `x(x − ${k}) = ${b}${sup(Math.round(n))} = ${prod} ⇒ x = ${x} ou x = ${k - x}. Como x > ${k}, x = ${x}.`),
    };
  },
  // 2. isótopo
  (r) => {
    const m0 = r.pick([80, 160, 320, 640]), t = r.pick([5, 8, 12, 30]), n = r.int(3, 5);
    return {
      e: `Um isótopo radioativo tem meia-vida de ${t} anos. Partindo de ${m0} g, quanto restará após ${t * n} anos?`,
      r: m0 / 2 ** n,
      d: [m0 / (2 * n), m0 / 2 ** (n + 1), m0 / 2 ** (n - 1), m0 / 3],
      f: (v) => `${num(v)} g`,
      x: expl('meia-vida', 'Conte quantas meias-vidas cabem no tempo e divida por 2 essa quantidade de vezes.', `${t * n} ÷ ${t} = ${n}: ${m0} ÷ 2${sup(n)} = ${num(m0 / 2 ** n)} g.`),
    };
  },
  // 3. 2ˣ = 3 (aproximação)
  (r) => {
    const [eq, num1, den, txt] = r.pick([
      ['2ˣ = 3', 0.48, 0.3, 'log 3 / log 2'],
      ['2ˣ = 6', 0.78, 0.3, '(log 2 + log 3) / log 2'],
      ['3ˣ = 2', 0.3, 0.48, 'log 2 / log 3'],
      ['2ˣ = 12', 1.08, 0.3, '(2 log 2 + log 3) / log 2'],
      ['3ˣ = 12', 1.08, 0.48, '(2 log 2 + log 3) / log 3'],
      ['5ˣ = 2', 0.3, 0.7, 'log 2 / (1 − log 2)'],
    ]);
    const v = num1 / den;
    return {
      e: `Considerando log 2 = 0,30 e log 3 = 0,48, a solução da equação ${eq} é, aproximadamente:`,
      r: arred(v, 2),
      d: [arred(den / num1, 2), arred(num1 - den, 2), arred(num1 * den, 2), arred(v + 1, 2)],
      f: (z) => num(z, 2),
      x: expl('aplicar log dos dois lados', 'Quando não dá para igualar as bases, tire o log: o expoente "desce" multiplicando.', `x = ${txt} = ${num(num1, 2)}/${num(den, 2)} ≈ ${num(v, 2)}.`),
    };
  },
  // 4. decibéis
  (r) => {
    const k = r.int(1, 6);
    return {
      e: `O nível sonoro, em decibéis, é dado por N = 10 · log(I/I₀). Se a intensidade sonora I de uma fonte for multiplicada por ${semPonto(10 ** k)}, o nível sonoro:`,
      r: 10 * k,
      d: [10 ** k, k, 100 * k, 10 * (k + 1)],
      f: (v) => `aumenta ${num(v)} dB`,
      x: expl('log do produto', 'log(10ᵏ · x) = k + log x: multiplicar dentro do log vira somar fora.', `N' = 10 · [${k} + log(I/I₀)] = N + ${10 * k}.`),
    };
  },
  // 5. tempo para multiplicar o montante
  (r) => {
    const c = r.pick([1000, 2000, 5000]), taxa = r.pick([[1.1, 0.04, 'log 1,1 ≈ 0,04'], [1.2, 0.08, 'log 1,2 ≈ 0,08'], [1.25, 0.1, 'log 1,25 ≈ 0,10']]);
    const alvo = r.pick([[2, 0.3], [4, 0.6], [8, 0.9]]);
    const n = alvo[1] / taxa[1];
    return {
      e: `Uma aplicação de ${reais(c)} rende ${num((taxa[0] - 1) * 100)}% ao ano, a juros compostos. Usando log 2 ≈ 0,30 e ${taxa[2]}, em quantos anos, aproximadamente, o montante será ${alvo[0]} vezes o valor aplicado?`,
      r: arred(n, 1),
      d: [arred(n * 2, 1), arred(n / 2, 1), arred(alvo[0] / (taxa[0] - 1), 1), arred(n + 3, 1)],
      f: (v) => `${num(v)} anos`,
      x: expl('logaritmo para achar o expoente', 'O tempo está no expoente; o log "traz" o expoente para baixo.', `${num(taxa[0])}ⁿ = ${alvo[0]} ⇒ n = log ${alvo[0]} / log ${num(taxa[0])} = ${num(alvo[1], 2)}/${num(taxa[1], 2)} ≈ ${num(n, 1)}.`),
    };
  },
  // 6. quantas meias-vidas para ficar abaixo de x%
  (r) => {
    const [p, n] = r.pick([[10, 4], [5, 5], [1, 7], [2, 6]]);
    const t = r.pick([3, 6, 8, 12]);
    return {
      e: `A meia-vida de uma substância é de ${t} horas. Qual é o tempo mínimo, em múltiplos da meia-vida, para que reste menos de ${p}% da quantidade inicial? (Use log 2 ≈ 0,30.)`,
      r: n * t,
      d: [(n - 1) * t, (n + 1) * t, (100 / p) * t / 2, p * t],
      f: (v) => `${num(v)} h`,
      x: expl('inequação exponencial', `Após n meias-vidas resta (1/2)ⁿ. Queremos (1/2)ⁿ < ${p / 100}, isto é, 2ⁿ > ${100 / p}.`, `2${sup(n - 1)} = ${2 ** (n - 1)} ainda não basta; 2${sup(n)} = ${2 ** n} > ${100 / p}. São ${n} meias-vidas = ${n * t} h.`),
    };
  },
  // 7. substituição 4ˣ − k·2ˣ + m = 0
  (r) => {
    const a = r.int(0, 2), b = r.int(a + 1, 4);
    const s = 2 ** a + 2 ** b, p = 2 ** a * 2 ** b;
    return {
      e: `Qual é a soma das soluções da equação 4ˣ − ${s} · 2ˣ + ${p} = 0?`,
      r: a + b,
      d: [s, p, 2 ** a + 2 ** b - 1, a * b],
      x: expl('troca de variável', 'Faça y = 2ˣ; então 4ˣ = y². A equação vira do 2º grau.', `y² − ${s}y + ${p} = 0 ⇒ y = ${2 ** a} ou ${2 ** b} ⇒ x = ${a} ou ${b}. Soma: ${a + b}.`),
    };
  },
  // 8. domínio com base variável
  (r) => {
    const a = r.int(5, 9);
    const ints = [];
    for (let x = 2; x < a; x++) if (x !== 2) ints.push(x);
    return {
      e: `Quantos números inteiros pertencem ao domínio da expressão log na base (x − 1) de (${a} − x)?`,
      r: ints.length,
      d: [ints.length + 1, a - 1, a - 2, ints.length - 1],
      x: expl('condições de existência', 'O logaritmando deve ser positivo; a base deve ser positiva e diferente de 1.', `${a} − x > 0 ⇒ x < ${a}; x − 1 > 0 ⇒ x > 1; x − 1 ≠ 1 ⇒ x ≠ 2. Inteiros: ${ints.join(', ')} (${ints.length}).`),
    };
  },
  // 9. inequação logarítmica
  (r) => {
    const k = r.int(1, 4), n = r.int(2, 4);
    const lim = 2 ** n + k;
    const qtd = lim - k - 1;
    return {
      e: `Quantos números inteiros satisfazem a inequação log₂(x − ${k}) < ${n}?`,
      r: qtd,
      d: [qtd + 1, 2 ** n, lim, qtd - 1],
      x: expl('inequação + domínio', 'Base maior que 1: a desigualdade se mantém ao passar para a forma exponencial. E o logaritmando precisa ser positivo.', `0 < x − ${k} < 2${sup(n)} = ${2 ** n} ⇒ ${k} < x < ${lim}. Inteiros: de ${k + 1} a ${lim - 1}, ou seja, ${qtd}.`),
    };
  },
  // 10. energia de terremotos
  (r) => {
    const d = r.pick([1, 2, 3]);
    const fator = 10 ** (1.5 * d);
    const txt = d === 1 ? '10^1,5 ≈ 32' : d === 2 ? '10³ = 1.000' : '10^4,5 ≈ 31.600';
    return {
      e: `A energia liberada por um terremoto se relaciona com a magnitude M por log E = 1,5M + 4,8. Quantas vezes, aproximadamente, a energia de um terremoto de magnitude ${5 + d} é maior que a de um de magnitude 5?`,
      r: `cerca de ${txt.split(/[≈=]/).pop().trim()} vezes`,
      d: [`cerca de ${10 * d} vezes`, `cerca de ${num(d * 1.5)} vezes`, `cerca de ${num(10 ** d)} vezes`, `cerca de ${num(10 ** (d + 2))} vezes`, `cerca de ${2 ** d} vezes`].filter((t) => !t.includes(txt.split(/[≈=]/).pop().trim())),
      x: expl('diferença de logs', 'Subtraindo as equações, sobra log(E₂/E₁) = 1,5 × (diferença de magnitudes).', `log(E₂/E₁) = 1,5 × ${d} = ${num(1.5 * d)} ⇒ E₂/E₁ = ${txt} (${num(fator, 0)} aproximadamente).`),
    };
  },
  // 11. sistema exponencial
  (r) => {
    const x = r.int(2, 6), y = r.int(1, 4);
    return {
      e: `Resolva o sistema { 2ˣ · 4ʸ = ${semPonto(2 ** (x + 2 * y))} ; 3^(x − y) = ${semPonto(3 ** (x - y))} } e calcule x + y.`,
      r: x + y,
      d: [x - y, x * y, x + 2 * y, x + y + 1],
      x: expl('igualar expoentes em cada equação', 'Coloque cada equação numa base só; os expoentes formam um sistema linear.', `x + 2y = ${x + 2 * y} e x − y = ${x - y} ⇒ y = ${y}, x = ${x}; x + y = ${x + y}.`),
    };
  },
  // 12. comparar crescimentos
  (r) => {
    const [pa, pb] = r.pick([[2, 4], [3, 9], [2, 8]]);
    const k = Math.round(Math.log(pb) / Math.log(pa));
    const t = r.pick([10, 15, 20]);
    return {
      e: `A cidade A dobra sua população (multiplica por ${pa}) a cada ${t} anos. A cidade B multiplica sua população por ${pb} no mesmo período de ${t} anos. Quanto tempo a cidade A leva para crescer tanto quanto a cidade B cresce em ${t} anos?`,
      r: k * t,
      d: [t, (pb / pa) * t, pb * t, (k + 1) * t],
      f: (v) => `${num(v)} anos`,
      x: expl('potências da mesma base', `${pb} = ${pa}${sup(k)}: a cidade A precisa de ${k} períodos.`, `${k} × ${t} = ${k * t} anos.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[6].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '06-exponencial-e-logaritmo',
    titulo: 'Função exponencial e logaritmo',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Potências, equações exponenciais, propriedades dos logaritmos, crescimento, decaimento e escalas logarítmicas.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.explog[0])], [...medio, ...novos(NOVOS.explog[1])], [...dificil, ...novos(NOVOS.explog[2])]],
  },
];
