// Matemática — Binômio de Newton e triângulo de Pascal (Álgebra).
import { comb, expl, fatorial, fracao, num, sup } from './util.mjs';

const C = comb;
const N = (v) => num(v);
const xp = (k) => (k === 0 ? '' : k === 1 ? 'x' : `x${sup(k)}`);
const linha = (n) => Array.from({ length: n + 1 }, (_, k) => C(n, k));

const facil = [
  // 1. número binomial
  (r) => {
    const n = r.int(5, 10), k = r.int(2, 3);
    return {
      e: `Qual é o valor do número binomial C(${n}, ${k}) (combinação de ${n} elementos ${k} a ${k})?`,
      r: C(n, k),
      d: [n * k, fatorial(n) / fatorial(n - k), C(n, k + 1) === C(n, k) ? C(n, k) + n : C(n, k + 1), C(n - 1, k)],
      x: expl('fórmula do binomial', `C(n, k) = n! / [k!·(n − k)!].`, `C(${n}, ${k}) = ${Array.from({ length: k }, (_, i) => n - i).join(' · ')} / ${k}! = ${C(n, k)}.`),
    };
  },
  // 2. número de termos
  (r) => {
    const n = r.int(5, 15);
    return {
      e: `Quantos termos tem o desenvolvimento de (2a − b)${sup(n)}?`,
      r: n + 1,
      d: [n, n + 2, 2 * n, n - 1],
      x: expl('n + 1 termos', `No desenvolvimento de (x + y)ⁿ, o expoente de y vai de 0 até n: são n + 1 termos.`, `${n} + 1 = ${n + 1} termos.`),
    };
  },
  // 3. linha do triângulo de Pascal
  (r) => {
    const n = r.int(4, 7);
    const l = linha(n);
    return {
      e: `Qual é a linha ${n} do triângulo de Pascal (a linha que começa com 1, ${n})?`,
      r: l.join(', '),
      d: [linha(n - 1).join(', '), linha(n + 1).join(', '), l.map((v, i) => (i === 2 ? v + 1 : v)).join(', '), l.map((_, i) => (i === 0 || i === n ? 1 : n)).join(', ')],
      x: expl('cada número é a soma dos dois de cima', `A linha ${n - 1} é ${linha(n - 1).join(', ')}. Somando vizinhos, sai a linha ${n}.`, `${l.join(', ')}.`),
    };
  },
  // 4. coeficiente simples em (x + 1)^n
  (r) => {
    const n = r.int(4, 8), k = r.int(2, n - 2);
    return {
      e: `No desenvolvimento de (x + 1)${sup(n)}, qual é o coeficiente de ${xp(k)}?`,
      r: C(n, k),
      d: [n * k, C(n, k) + 1, k, C(n, k - 1) === C(n, k) ? n : C(n, k - 1)],
      x: expl('coeficientes = linha de Pascal', `Em (x + 1)ⁿ, o coeficiente de xᵏ é C(n, k).`, `C(${n}, ${k}) = ${C(n, k)}.`),
    };
  },
  // 5. binomiais complementares
  (r) => {
    const n = r.int(8, 20), k = r.int(2, 5);
    return {
      e: `O número binomial C(${n}, ${k}) é igual a C(${n}, p), com p ≠ ${k}. Qual é o valor de p?`,
      r: n - k,
      d: [n + k, k + 1, n, n - k - 1],
      x: expl('binomiais complementares', 'Escolher k elementos é o mesmo que escolher os n − k que ficam de fora: C(n, k) = C(n, n − k).', `p = ${n} − ${k} = ${n - k}.`),
    };
  },
  // 6. relação de Stifel
  (r) => {
    const n = r.int(4, 9), k = r.int(1, n - 2);
    return {
      e: `Qual é o valor de C(${n}, ${k}) + C(${n}, ${k + 1})?`,
      r: C(n + 1, k + 1),
      d: [C(n, k + 2) || C(n, k) + 3, C(n + 1, k), C(n, k) * 2, C(n + 1, k + 2)],
      x: expl('relação de Stifel', 'Dois vizinhos de uma linha de Pascal somam o número logo abaixo: C(n, k) + C(n, k + 1) = C(n + 1, k + 1).', `C(${n + 1}, ${k + 1}) = ${C(n + 1, k + 1)}.`),
    };
  },
  // 7. termo independente simples
  (r) => {
    const a = r.int(2, 5), n = r.int(3, 5);
    return {
      e: `Qual é o termo independente de x (o termo sem x) no desenvolvimento de (x + ${a})${sup(n)}?`,
      r: a ** n,
      d: [a * n, n, a ** (n - 1), C(n, 1) * a ** (n - 1)],
      x: expl('termo independente', `O termo sem x é o último: C(${n}, ${n})·${a}${sup(n)}.`, `${a}${sup(n)} = ${a ** n}.`),
    };
  },
  // 8. soma de uma linha
  (r) => {
    const n = r.int(5, 12);
    return {
      e: `Qual é a soma C(${n}, 0) + C(${n}, 1) + C(${n}, 2) + ··· + C(${n}, ${n})?`,
      r: 2 ** n,
      d: [n * n, 2 ** n - 1, fatorial(n) / 10 > 4096 ? 2 ** (n + 1) : 2 * n, 2 ** (n - 1)],
      x: expl('soma da linha de Pascal', 'A soma da linha n é 2ⁿ (basta fazer x = y = 1 em (x + y)ⁿ).', `2${sup(n)} = ${N(2 ** n)}.`),
    };
  },
  // 9. termo de posição dada
  (r) => {
    const n = r.int(5, 8), p = r.int(2, 4);
    const k = p - 1;
    return {
      e: `Qual é o ${p}º termo do desenvolvimento de (x + 1)${sup(n)}, segundo as potências decrescentes de x?`,
      r: `${C(n, k)}${xp(n - k)}`,
      d: [`${C(n, k + 1)}${xp(n - k - 1)}`, `${C(n, k)}${xp(n - k + 1)}`, `${n}${xp(n - k)}`, `${C(n, k - 1)}${xp(n - k + 1)}`],
      x: expl('termo geral', `O termo de ordem k + 1 é C(n, k)·xⁿ⁻ᵏ·1ᵏ. O ${p}º termo tem k = ${k}.`, `C(${n}, ${k})·${xp(n - k)} = ${C(n, k)}${xp(n - k)}.`),
    };
  },
  // 10. subconjuntos
  (r) => {
    const n = r.int(4, 10);
    return {
      e: `Um conjunto tem ${n} elementos. Quantos subconjuntos ele tem (contando o vazio e o próprio conjunto)?`,
      r: 2 ** n,
      d: [n * n, 2 * n, 2 ** n - 1, fatorial(n) > 5000 ? 2 ** (n + 1) : fatorial(n)],
      x: expl('cada elemento entra ou não entra', `Para cada elemento há 2 escolhas; ou some a linha ${n} de Pascal.`, `2${sup(n)} = ${N(2 ** n)} subconjuntos.`),
    };
  },
  // 11. simetria na linha
  (r) => {
    const n = r.int(7, 12), k = r.int(2, 3);
    return {
      e: `Na linha ${n} do triângulo de Pascal, qual número é igual a C(${n}, ${k})?`,
      r: `C(${n}, ${n - k})`,
      d: [`C(${n}, ${k + 1})`, `C(${n - k}, ${k})`, `C(${n + 1}, ${k})`, `C(${n}, ${n - k - 1})`],
      x: expl('simetria da linha', 'Cada linha de Pascal é simétrica: lida de trás para frente, é igual.', `C(${n}, ${k}) = C(${n}, ${n - k}) = ${C(n, k)}.`),
    };
  },
  // 12. coeficiente de x em (x + a)^n
  (r) => {
    const a = r.int(2, 4), n = r.int(3, 5);
    return {
      e: `No desenvolvimento de (x + ${a})${sup(n)}, qual é o coeficiente de x?`,
      r: n * a ** (n - 1),
      d: [a ** (n - 1), n * a, a ** n, C(n, 2) * a ** (n - 2)],
      x: expl('termo com x¹', `Escolhe-se x em um dos ${n} fatores e ${a} nos outros ${n - 1}: C(${n}, 1)·${a}${sup(n - 1)}.`, `${n} · ${a ** (n - 1)} = ${n * a ** (n - 1)}.`),
    };
  },
  // 13. último termo com sinal
  (r) => {
    const a = r.int(2, 3), n = r.int(3, 7);
    const ult = (-1) ** n;
    return {
      e: `Qual é o último termo do desenvolvimento de (${a}x − 1)${sup(n)}, segundo as potências decrescentes de x?`,
      r: ult,
      d: [-ult, a ** n * ult, n * ult, 0],
      x: expl('último termo', `É o termo sem x: (−1)${sup(n)}. Expoente ${n % 2 ? 'ímpar' : 'par'} dá ${ult}.`, `Último termo: ${N(ult)}.`),
    };
  },
  // 14. primeiro termo
  (r) => {
    const a = r.int(2, 3), n = r.int(3, 5);
    return {
      e: `Qual é o primeiro termo do desenvolvimento de (${a}x + 1)${sup(n)}?`,
      r: `${a ** n}${xp(n)}`,
      d: [`${a}${xp(n)}`, `${a * n}${xp(n)}`, `${a ** n}${xp(n - 1)}`, `${n}${xp(n)}`],
      x: expl('primeiro termo', `É (${a}x)${sup(n)}: o coeficiente também vai à potência.`, `${a}${sup(n)}x${sup(n)} = ${a ** n}${xp(n)}.`),
    };
  },
  // 15. C(n, n − 1)
  (r) => {
    const n = r.int(10, 40);
    return {
      e: `Qual é o valor de C(${n}, ${n - 1})?`,
      r: n,
      d: [n - 1, 1, n * (n - 1), C(n, 2)],
      x: expl('binomial complementar', `C(${n}, ${n - 1}) = C(${n}, 1): escolher ${n - 1} é o mesmo que escolher o 1 que fica de fora.`, `= ${n}.`),
    };
  },
  // 16. potências de 11
  (r) => ({
    e: 'As potências 11⁰ = 1, 11¹ = 11, 11² = 121 e 11³ = 1 331 repetem as primeiras linhas do triângulo de Pascal. Qual é o valor de 11⁴?',
    r: 14641,
    d: [13431, 14541, 12321, 15641],
    f: (v) => N(v),
    x: expl('binômio (10 + 1)⁴', `11⁴ = (10 + 1)⁴ = 1·10⁴ + 4·10³ + 6·10² + 4·10 + 1, que usa a linha 1, 4, 6, 4, 1.`, '10 000 + 4 000 + 600 + 40 + 1 = 14 641.'),
  }),
  // 17. quociente de fatoriais
  (r) => {
    const n = r.int(6, 10), k = n - r.int(2, 3);
    return {
      e: `Qual é o valor de ${n}! / ${k}!?`,
      r: fatorial(n) / fatorial(k),
      d: [n - k, fatorial(n - k), n * (n - 1), n / k > 1 ? Math.round(fatorial(n) / fatorial(k) / 2) : n],
      x: expl('cancelar o fatorial menor', `${n}! = ${Array.from({ length: n - k }, (_, i) => n - i).join(' · ')} · ${k}!, então o ${k}! cancela.`, `${Array.from({ length: n - k }, (_, i) => n - i).join(' · ')} = ${N(fatorial(n) / fatorial(k))}.`),
    };
  },
];

const medio = [
  // 1. coeficiente de x^k em (x + a)^n
  (r) => {
    const n = r.int(5, 7), k = r.int(2, n - 2), a = r.int(2, 3);
    return {
      e: `Qual é o coeficiente de ${xp(k)} no desenvolvimento de (x + ${a})${sup(n)}?`,
      r: C(n, k) * a ** (n - k),
      d: [C(n, k), C(n, k) * a ** k, a ** (n - k), C(n, k) * a],
      x: expl('termo geral', `Para ter ${xp(k)}, escolhe-se x em ${k} fatores e ${a} nos outros ${n - k}: C(${n}, ${k})·${a}${sup(n - k)}.`, `${C(n, k)} · ${a ** (n - k)} = ${C(n, k) * a ** (n - k)}.`),
    };
  },
  // 2. soma dos coeficientes com sinal
  (r) => {
    const a = r.int(2, 4), n = r.int(5, 12);
    const s = (a - 1) ** n;
    return {
      e: `Qual é a soma dos coeficientes do desenvolvimento de (${a}x − 1)${sup(n)}?`,
      r: s,
      d: [(a + 1) ** n, 2 ** n, a ** n, 0],
      f: (v) => N(v),
      x: expl('fazer x = 1', 'A soma dos coeficientes de um polinômio é o seu valor em x = 1.', `(${a}·1 − 1)${sup(n)} = ${a - 1}${sup(n)} = ${N(s)}.`),
    };
  },
  // 3. termo independente de (x + 1/x)^n
  (r) => {
    const n = 2 * r.int(2, 5);
    return {
      e: `Qual é o termo independente de x no desenvolvimento de (x + 1/x)${sup(n)}?`,
      r: C(n, n / 2),
      d: [C(n, n / 2 - 1), 2 ** n, n, 1],
      x: expl('igualar o expoente a zero', `O termo geral é C(${n}, k)·x${sup(n)}⁻ᵏ·x⁻ᵏ = C(${n}, k)·x^(${n} − 2k). Expoente zero: k = ${n / 2}.`, `C(${n}, ${n / 2}) = ${C(n, n / 2)}.`),
    };
  },
  // 4. termo independente de (x² + 1/x)^n
  (r) => {
    const n = r.pick([3, 6, 9]);
    const k = (2 * n) / 3;
    return {
      e: `Qual é o termo independente de x no desenvolvimento de (x² + 1/x)${sup(n)}?`,
      r: C(n, k),
      d: [C(n, n / 3) === C(n, k) ? C(n, k) + n : C(n, n / 3), C(n, k - 1), 2 ** n, n],
      x: expl('igualar o expoente a zero', `Termo geral: C(${n}, k)·(x²)${sup(n)}⁻ᵏ·(1/x)ᵏ = C(${n}, k)·x^(${2 * n} − 3k). Expoente zero: k = ${k}.`, `C(${n}, ${k}) = ${C(n, k)}.`),
    };
  },
  // 5. termo médio
  (r) => {
    const n = 2 * r.int(2, 4), a = r.int(2, 3);
    const k = n / 2;
    return {
      e: `Qual é o termo médio do desenvolvimento de (x + ${a})${sup(n)}?`,
      r: `${N(C(n, k) * a ** k)}${xp(k)}`,
      d: [`${C(n, k)}${xp(k)}`, `${N(C(n, k) * a)}${xp(k)}`, `${N(C(n, k - 1) * a ** (k - 1))}${xp(k + 1)}`, `${N(a ** k)}${xp(k)}`],
      x: expl('termo do meio', `Com ${n + 1} termos, o do meio é o ${k + 1}º: C(${n}, ${k})·x${sup(k)}·${a}${sup(k)}.`, `${C(n, k)} · ${a ** k} = ${N(C(n, k) * a ** k)}, ou seja, ${N(C(n, k) * a ** k)}${xp(k)}.`),
    };
  },
  // 6. equação com C(n, 2)
  (r) => {
    const n = r.int(6, 15);
    return {
      e: `Para que valor de n vale C(n, 2) = ${C(n, 2)}?`,
      r: n,
      d: [n + 1, n - 1, C(n, 2) / 2, 2 * n],
      x: expl('C(n, 2) = n(n − 1)/2', `n(n − 1)/2 = ${C(n, 2)} ⇒ n(n − 1) = ${2 * C(n, 2)}.`, `${n} · ${n - 1} = ${2 * C(n, 2)} ⇒ n = ${n}.`),
    };
  },
  // 7. C(n, a) = C(n, b)
  (r) => {
    const a = r.int(2, 5), b = a + r.int(1, 4);
    return {
      e: `Sabendo que C(n, ${a}) = C(n, ${b}), com n natural, qual é o valor de n?`,
      r: a + b,
      d: [b - a, a * b, b, a + b + 1],
      x: expl('binomiais complementares', `Como ${a} ≠ ${b}, a igualdade só vale se ${a} + ${b} = n.`, `n = ${a + b}.`),
    };
  },
  // 8. aproximação
  (r) => {
    const n = r.pick([5, 10, 20]), p = r.pick([0.01, 0.02]);
    const v = 1 + n * p + C(n, 2) * p * p;
    return {
      e: `Usando os três primeiros termos do binômio de Newton, qual é o valor aproximado de (1 + ${num(p)})${sup(n)}?`,
      r: v,
      d: [1 + n * p, (1 + p) * n, 1 + n * p + n * p * p, 1 + p ** n],
      f: (x) => num(x, 4).replace(/0+$/, '').replace(/,$/, ''),
      x: expl('aproximação binomial', '(1 + p)ⁿ = 1 + n·p + C(n, 2)·p² + ...; com p pequeno, os termos seguintes quase não contam.', `1 + ${n}·${num(p)} + ${C(n, 2)}·${num(p * p, 4)} = ${num(v, 4).replace(/0+$/, '')}.`),
    };
  },
  // 9. descobrir n pela soma
  (r) => {
    const n = r.int(4, 10);
    return {
      e: `A soma dos coeficientes do desenvolvimento de (x + y)ⁿ é ${N(2 ** n)}. Qual é o valor de n?`,
      r: n,
      d: [n + 1, n - 1, 2 ** n / 2, 2 * n],
      f: (v) => N(v),
      x: expl('soma = 2ⁿ', 'Com x = y = 1, a soma dos coeficientes vale 2ⁿ.', `2ⁿ = ${N(2 ** n)} ⇒ n = ${n}.`),
    };
  },
  // 10. coeficiente com sinal
  (r) => {
    const n = r.int(5, 8), k = r.pick([1, 3, 5].filter((v) => v < n));
    return {
      e: `Qual é o coeficiente de ${xp(k)} no desenvolvimento de (1 − x)${sup(n)}?`,
      r: -C(n, k),
      d: [C(n, k), -C(n, k + 1), C(n, k - 1), -n],
      x: expl('sinal alternado', `O termo com xᵏ é C(${n}, k)·(−x)ᵏ; com k ímpar, o sinal é negativo.`, `C(${n}, ${k})·(−1)${sup(k)} = −${C(n, k)}.`),
    };
  },
  // 11. subconjuntos não vazios
  (r) => {
    const n = r.int(5, 10);
    return {
      e: `Uma pizzaria oferece ${n} coberturas diferentes, e cada pizza leva pelo menos uma cobertura (sem repetir). Quantas pizzas diferentes podem ser montadas?`,
      r: 2 ** n - 1,
      d: [2 ** n, n * n, fatorial(n) > 9999 ? 2 ** n + 1 : fatorial(n), C(n, 2)],
      f: (v) => N(v),
      x: expl('soma da linha menos o vazio', `Cada cobertura entra ou não: 2${sup(n)} escolhas, mas a pizza sem cobertura não vale.`, `2${sup(n)} − 1 = ${N(2 ** n - 1)}.`),
    };
  },
  // 12. taco de hóquei
  (r) => {
    const k = r.int(2, 3), m = r.int(5, 8);
    let s = 0;
    const termos = [];
    for (let j = k; j <= m; j++) { s += C(j, k); termos.push(`C(${j}, ${k})`); }
    return {
      e: `Qual é o valor de ${termos.join(' + ')}?`,
      r: C(m + 1, k + 1),
      d: [C(m + 1, k), C(m, k + 1), s - 1, 2 ** m],
      x: expl('soma numa coluna de Pascal ("taco de hóquei")', `Somando uma coluna do triângulo de cima até a linha ${m}, o resultado é o número abaixo e à direita: C(${m + 1}, ${k + 1}).`, `C(${m + 1}, ${k + 1}) = ${C(m + 1, k + 1)}.`),
    };
  },
  // 13. maior coeficiente
  (r) => {
    const n = r.int(6, 12);
    const k = Math.floor(n / 2);
    return {
      e: `Qual é o maior coeficiente do desenvolvimento de (x + y)${sup(n)}?`,
      r: C(n, k),
      d: [C(n, k - 1), 2 ** n, n * 2, C(n, k) / 2],
      x: expl('o meio da linha', 'Os números de cada linha de Pascal crescem até o meio e depois diminuem.', `O maior é C(${n}, ${k}) = ${C(n, k)}.`),
    };
  },
  // 14. soma dos binomiais de k par
  (r) => {
    const n = r.int(5, 11);
    return {
      e: `Qual é o valor de C(${n}, 0) + C(${n}, 2) + C(${n}, 4) + ··· (só os de índice par)?`,
      r: 2 ** (n - 1),
      d: [2 ** n, 2 ** (n - 2), n * 2, 2 ** (n - 1) + 1],
      x: expl('somar e subtrair (1 + 1)ⁿ e (1 − 1)ⁿ', `(1 + 1)ⁿ soma tudo; (1 − 1)ⁿ = 0 soma com sinais alternados. Somando as duas, os ímpares somem e os pares dobram.`, `Pares = 2${sup(n)}/2 = ${2 ** (n - 1)}.`),
    };
  },
  // 15. coeficiente de x^a y^b
  (r) => {
    const n = 5, a = r.int(2, 3), c = r.int(2, 3);
    const b = n - a;
    return {
      e: `Qual é o coeficiente de ${a === 1 ? 'x' : `x${sup(a)}`}y${sup(b)} no desenvolvimento de (${c}x + y)${sup(n)}?`,
      r: C(n, a) * c ** a,
      d: [C(n, a), C(n, a) * c, c ** a, C(n, b) * c ** b],
      x: expl('termo geral com dois coeficientes', `Escolhe-se ${c}x em ${a} fatores e y nos outros ${b}: C(5, ${a})·${c}${sup(a)}.`, `${C(n, a)} · ${c ** a} = ${C(n, a) * c ** a}.`),
    };
  },
  // 16. termo com x^k em (x − a)^n
  (r) => {
    const n = 6, a = r.int(2, 3), k = r.pick([2, 4]);
    const coef = C(n, k) * (-a) ** (n - k);
    return {
      e: `Qual é o termo em ${xp(k)} no desenvolvimento de (x − ${a})${sup(n)}?`,
      r: `${N(coef)}${xp(k)}`,
      d: [`${N(-coef)}${xp(k)}`, `${N(C(n, k))}${xp(k)}`, `${N(C(n, k) * a)}${xp(k)}`, `${N(a ** (n - k))}${xp(k)}`],
      x: expl('sinal de (−a) elevado', `O termo é C(6, ${k})·x${sup(k)}·(−${a})${sup(n - k)}; com expoente par, o sinal é positivo.`, `${C(n, k)} · ${a ** (n - k)} = ${N(coef)}.`),
    };
  },
  // 17. linha seguinte por Stifel
  (r) => {
    const n = r.int(6, 9), k = r.int(2, 3);
    return {
      e: `Sabendo que C(${n}, ${k}) = ${C(n, k)} e C(${n}, ${k + 1}) = ${C(n, k + 1)}, quanto vale C(${n + 1}, ${k + 1})?`,
      r: C(n + 1, k + 1),
      d: [C(n, k) * C(n, k + 1) > 10000 ? C(n + 1, k) : C(n, k) * 2, C(n + 1, k), C(n + 1, k + 1) + 1, C(n, k + 1) - C(n, k)],
      x: expl('relação de Stifel', 'C(n, k) + C(n, k + 1) = C(n + 1, k + 1).', `${C(n, k)} + ${C(n, k + 1)} = ${C(n + 1, k + 1)}.`),
    };
  },
];

const dificil = [
  // 1. termo independente com coeficientes
  (r) => {
    const n = 6, a = r.int(2, 3);
    // (a x − 1/x²)^6: expoente 6 − 3k = 0 ⇒ k = 2
    const v = C(6, 2) * a ** 4;
    return {
      e: `Qual é o termo independente de x no desenvolvimento de (${a}x − 1/x²)${sup(n)}?`,
      r: v,
      d: [-v, C(6, 2), C(6, 3) * a ** 3, v / a],
      x: expl('termo geral com expoente zero', `Termo geral: C(6, k)·(${a}x)⁶⁻ᵏ·(−1/x²)ᵏ, com expoente de x igual a 6 − 3k. Zero quando k = 2.`, `C(6, 2)·${a}⁴·(−1)² = 15 · ${a ** 4} = ${N(v)}.`),
    };
  },
  // 2. coeficientes vizinhos iguais
  (r) => {
    const k = r.int(3, 7);
    return {
      e: `No desenvolvimento de (1 + x)ⁿ, os coeficientes de x${sup(k)} e de x${sup(k + 1)} são iguais. Qual é o valor de n?`,
      r: 2 * k + 1,
      d: [2 * k, 2 * k + 2, k + 1, 2 * k - 1],
      x: expl('binomiais complementares', `C(n, ${k}) = C(n, ${k + 1}) com ${k} ≠ ${k + 1} exige ${k} + ${k + 1} = n.`, `n = ${2 * k + 1}.`),
    };
  },
  // 3. resto de 9^n por 8
  (r) => {
    const [b, m] = r.pick([[9, 8], [11, 10], [7, 6], [13, 12]]);
    const n = r.int(30, 120);
    return {
      e: `Qual é o resto da divisão de ${b}${sup(n)} por ${m}?`,
      r: 1,
      d: [0, m - 1, 2, b - m + 1 === 1 ? 3 : b - m + 1],
      x: expl('escrever a base como (múltiplo + 1)', `${b} = ${m} + 1. No binômio (${m} + 1)${sup(n)}, todos os termos têm fator ${m}, menos o último, que é 1.`, 'Resto 1.'),
    };
  },
  // 4. resto de 11^n por 100
  (r) => {
    const n = r.int(3, 9);
    const v = 1 + 10 * n; // (10 + 1)^n ≡ 1 + 10n (mod 100)
    return {
      e: `Qual é o resto da divisão de 11${sup(n)} por 100 (isto é, os dois últimos algarismos)?`,
      r: v % 100,
      d: [(v + 10) % 100, 11, (10 * n) % 100, 1],
      x: expl('binômio (10 + 1)ⁿ', `11ⁿ = (10 + 1)ⁿ = ... + C(n, 2)·10² + n·10 + 1. A partir de 10², tudo é múltiplo de 100.`, `Resto: ${n} · 10 + 1 = ${v}${v >= 100 ? `, que deixa resto ${v % 100}` : ''}.`),
    };
  },
  // 5. soma k·C(n,k)
  (r) => {
    const n = r.int(4, 8);
    return {
      e: `Qual é o valor de 1·C(${n}, 1) + 2·C(${n}, 2) + 3·C(${n}, 3) + ··· + ${n}·C(${n}, ${n})?`,
      r: n * 2 ** (n - 1),
      d: [2 ** n, n * 2 ** n, 2 ** (n - 1), n * n],
      x: expl('k·C(n, k) = n·C(n − 1, k − 1)', `Cada parcela vira ${n}·C(${n - 1}, k − 1); a soma de C(${n - 1}, ·) é 2${sup(n - 1)}.`, `${n} · 2${sup(n - 1)} = ${n * 2 ** (n - 1)}.`),
    };
  },
  // 6. termos racionais
  (r) => ({
    e: 'Quantos termos racionais (sem raízes) há no desenvolvimento de (√2 + ∛3)⁶?',
    r: 2,
    d: [1, 3, 4, 7],
    x: expl('expoentes compatíveis com as raízes', 'O termo geral é C(6, k)·(√2)⁶⁻ᵏ·(∛3)ᵏ. Para não sobrar raiz, 6 − k deve ser par e k múltiplo de 3.', `k = 0 (2³ = 8) e k = 6 (3² = 9): ${r.int(2, 2)} termos. Com k = 3, 6 − k = 3 é ímpar.`),
  }),
  // 7. achar n pelo terceiro coeficiente
  (r) => {
    const n = r.int(6, 14);
    return {
      e: `O terceiro termo do desenvolvimento de (x + 1)ⁿ, nas potências decrescentes de x, tem coeficiente ${C(n, 2)}. Qual é o valor de n?`,
      r: n,
      d: [n + 1, n - 1, C(n, 2) / n, n + 2],
      x: expl('terceiro termo = C(n, 2)', `O 3º termo é C(n, 2)·xⁿ⁻². Resolva n(n − 1)/2 = ${C(n, 2)}.`, `n(n − 1) = ${2 * C(n, 2)} ⇒ n = ${n}.`),
    };
  },
  // 8. (1 + √a)^4 + (1 − √a)^4
  (r) => {
    const a = r.pick([2, 3, 5]);
    // 2[1 + 6a + a²]
    const v = 2 * (1 + 6 * a + a * a);
    return {
      e: `Qual é o valor de (1 + √${a})⁴ + (1 − √${a})⁴?`,
      r: v,
      d: [v / 2, 2 * (1 + a * a), v + 8 * a, 0],
      x: expl('termos ímpares se cancelam', `Somando os dois desenvolvimentos, os termos com √${a} elevado a expoente ímpar se cancelam e os outros dobram.`, `2·[1 + 6·${a} + ${a}²] = ${v}.`),
    };
  },
  // 9. soma com potências de 2
  (r) => {
    const n = r.int(4, 7), b = r.pick([2, 3]);
    return {
      e: `Qual é o valor de C(${n}, 0) + ${b}·C(${n}, 1) + ${b}²·C(${n}, 2) + ··· + ${b}${sup(n)}·C(${n}, ${n})?`,
      r: (b + 1) ** n,
      d: [b ** n, 2 ** n, (b + 1) ** n - 1, b * 2 ** n],
      f: (v) => N(v),
      x: expl('reconhecer (1 + b)ⁿ', `A soma é o desenvolvimento de (1 + ${b})${sup(n)}.`, `${b + 1}${sup(n)} = ${N((b + 1) ** n)}.`),
    };
  },
  // 10. maior coeficiente de (1 + 2x)^n
  (r) => {
    const n = r.pick([4, 5, 6]);
    const coefs = Array.from({ length: n + 1 }, (_, k) => C(n, k) * 2 ** k);
    const mx = Math.max(...coefs);
    return {
      e: `Qual é o maior coeficiente do desenvolvimento de (1 + 2x)${sup(n)}?`,
      r: mx,
      d: [C(n, Math.floor(n / 2)), 2 ** n, coefs[coefs.indexOf(mx) - 1] === mx ? coefs[coefs.indexOf(mx) - 2] : coefs[coefs.indexOf(mx) - 1], 3 ** n],
      x: expl('listar os coeficientes', 'Com o fator 2ᵏ, o maior coeficiente não fica mais no meio. Calcule C(n, k)·2ᵏ para cada k.', `${coefs.join(', ')}: o maior é ${mx}.`),
    };
  },
  // 11. produto de binômios
  (r) => {
    const a = r.int(2, 4), b = r.int(3, 5), k = r.int(3, a + b - 1);
    return {
      e: `Qual é o coeficiente de x${sup(k)} no produto (1 + x)${sup(a)}·(1 + x)${sup(b)}?`,
      r: C(a + b, k),
      d: [C(a, Math.min(k, a)) * C(b, Math.min(k, b)), C(a + b, k - 1), C(a, 1) + C(b, 1), C(a + b, k) + 1],
      x: expl('juntar as potências', `(1 + x)${sup(a)}·(1 + x)${sup(b)} = (1 + x)${sup(a + b)}.`, `Coeficiente de x${sup(k)}: C(${a + b}, ${k}) = ${C(a + b, k)}.`),
    };
  },
  // 12. trinômio
  (r) => {
    const n = r.pick([2, 3]);
    const coefs = n === 2 ? [1, 2, 3, 2, 1] : [1, 3, 6, 7, 6, 3, 1];
    const k = r.int(1, n);
    return {
      e: `Qual é o coeficiente de x${sup(k)} no desenvolvimento de (1 + x + x²)${sup(n)}?`,
      r: coefs[k],
      d: [C(n, k), coefs[k] + 1, coefs[k] - 1, 3 ** n],
      x: expl('multiplicar e agrupar', `(1 + x + x²)${sup(n)} = ${coefs.map((c, i) => `${c === 1 && i ? '' : c}${i ? xp(i) : ''}`).join(' + ')}.`, `Coeficiente de x${sup(k)}: ${coefs[k]}.`),
    };
  },
  // 13. soma alternada
  (r) => {
    const n = r.int(5, 12);
    return {
      e: `Qual é o valor de C(${n}, 0) − C(${n}, 1) + C(${n}, 2) − C(${n}, 3) + ··· ± C(${n}, ${n})?`,
      r: 0,
      d: [1, 2 ** n, -1, 2 ** (n - 1)],
      x: expl('fazer x = 1 e y = −1', 'A soma alternada é o desenvolvimento de (1 − 1)ⁿ.', `(1 − 1)${sup(n)} = 0.`),
    };
  },
  // 14. (100 − 1)^3
  (r) => {
    const [b, k] = r.pick([[100, 1], [100, 2], [1000, 1], [50, 1]]);
    const v = (b - k) ** 3;
    return {
      e: `Usando o binômio de Newton, calcule ${b - k}³ = (${b} − ${k})³.`,
      r: v,
      d: [b ** 3 - k ** 3, b ** 3 - 3 * b * b * k, v + 2 * 3 * b * k * k, b ** 3 - 3 * b * k],
      f: (x) => N(x),
      x: expl('cubo da diferença', '(a − b)³ = a³ − 3a²b + 3ab² − b³.', `${N(b ** 3)} − ${N(3 * b * b * k)} + ${N(3 * b * k * k)} − ${k ** 3} = ${N(v)}.`),
    };
  },
  // 15. probabilidade binomial
  (r) => {
    const n = r.int(4, 7), k = r.int(1, n - 1);
    return {
      e: `Uma moeda honesta é lançada ${n} vezes. Qual é a probabilidade de sair cara exatamente ${k} ${k === 1 ? 'vez' : 'vezes'}?`,
      r: fracao(C(n, k), 2 ** n),
      d: [fracao(1, 2 ** n), fracao(k, n), fracao(C(n, k), 2 ** (n + 1)), fracao(1, 2)],
      x: expl('binomial em probabilidade', `Há 2${sup(n)} sequências igualmente prováveis; as que têm ${k} cara${k === 1 ? '' : 's'} são C(${n}, ${k}) = ${C(n, k)}.`, `${C(n, k)}/${2 ** n} = ${fracao(C(n, k), 2 ** n)}.`),
    };
  },
  // 16. termos de (a + b + c)^n
  (r) => {
    const n = r.int(2, 5);
    return {
      e: `Depois de reduzidos os termos semelhantes, quantos termos diferentes tem o desenvolvimento de (a + b + c)${sup(n)}?`,
      r: C(n + 2, 2),
      d: [n + 1, 3 * n, 3 ** n, C(n + 2, 2) + 1],
      x: expl('contar expoentes possíveis', `Cada termo é aᵖbᑫcʳ com p + q + r = ${n}. O número de soluções naturais é C(${n} + 2, 2).`, `C(${n + 2}, 2) = ${C(n + 2, 2)} termos.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '23-binomio-de-newton',
    titulo: 'Binômio de Newton e triângulo de Pascal',
    provas: ['Militares'],
    descricao: 'Números binomiais, triângulo de Pascal, termo geral, termo independente, soma de coeficientes e aplicações.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
