// Matemática — Potenciação, radiciação e conversão de unidades (Matemática básica).
import { expl, fracao, num, sup } from './util.mjs';

const fr = fracao;
const rad = (c, n) => (c === 1 ? `√${n}` : `${num(c)}√${n}`); // c√n
// tira do radical o maior quadrado perfeito: 72 → [6, 2]
const simplificar = (n) => {
  let c = 1, m = n;
  for (let k = Math.floor(Math.sqrt(n)); k > 1; k--) if (m % (k * k) === 0) { c *= k; m /= k * k; break; }
  return [c, m];
};
const cient = (m, e) => `${num(m)} × 10${sup(e)}`;

const facil = [
  // 1. produto de potências de mesma base
  (r) => {
    const b = r.pick([2, 3, 5, 7, 10]), m = r.int(2, 6), n = r.int(2, 6);
    return {
      e: `Escreva ${b}${sup(m)} · ${b}${sup(n)} como uma única potência.`,
      r: `${b}${sup(m + n)}`,
      d: [`${b}${sup(m * n)}`, `${b * b}${sup(m + n)}`, `${b}${sup(Math.abs(m - n) || m + n + 1)}`, `${b * b}${sup(m * n)}`],
      x: expl('produto de mesma base', 'Repete-se a base e somam-se os expoentes, porque são multiplicações seguidas do mesmo fator.', `${b}${sup(m)} · ${b}${sup(n)} = ${b}${sup(m)}⁺${sup(n)} = ${b}${sup(m + n)}.`),
    };
  },
  // 2. quociente de mesma base com valor
  (r) => {
    const b = r.pick([2, 3, 5]), n = r.int(2, 4), m = n + r.int(3, 6);
    return {
      e: `Qual é o valor de ${b}${sup(m)} ÷ ${b}${sup(m - n)}?`,
      r: b ** n,
      d: [b ** (m - n), b * n, b ** (n + 1), b ** (n - 1)],
      x: expl('divisão de mesma base', 'Repete-se a base e subtraem-se os expoentes.', `${b}${sup(m)}⁻${sup(m - n)} = ${b}${sup(n)} = ${b ** n}.`),
    };
  },
  // 3. potência de potência
  (r) => {
    const b = r.pick([2, 3]), m = r.int(2, 3), n = r.int(2, 3);
    return {
      e: `Calcule (${b}${sup(m)})${sup(n)}.`,
      r: b ** (m * n),
      d: [b ** (m + n), (b * m) ** n, b ** m * n, b ** (m * n) / b],
      x: expl('potência de potência', 'Multiplicam-se os expoentes: são n cópias de um bloco que já tem m fatores.', `(${b}${sup(m)})${sup(n)} = ${b}${sup(m * n)} = ${num(b ** (m * n))}.`),
    };
  },
  // 4. expoente negativo
  (r) => {
    const b = r.pick([2, 3, 4, 5, 10]), n = r.int(2, 3);
    return {
      e: `Qual é o valor de ${b}${sup(-n)}?`,
      r: `1/${b ** n}`,
      d: [`−${b ** n}`, `−${b * n}`, `1/${b * n}`, `${b}/${n}`],
      x: expl('expoente negativo = inverso', 'a⁻ⁿ = 1/aⁿ. O sinal de menos no expoente não deixa o número negativo: ele "vira a fração".', `${b}${sup(-n)} = 1/${b}${sup(n)} = 1/${b ** n}.`),
    };
  },
  // 5. −a² e (−a)²
  (r) => {
    const a = r.int(2, 7);
    return {
      e: `Qual é o valor de −${a}² + (−${a})² + (−1)³?`,
      r: -1,
      d: [2 * a * a - 1, -2 * a * a - 1, 0, 1],
      x: expl('quem está elevado ao quadrado', `Em −${a}², só o ${a} está ao quadrado (o resultado é −${a * a}). Em (−${a})², o parêntese inclui o sinal (resultado ${a * a}). E (−1)³ = −1.`, `−${a * a} + ${a * a} − 1 = −1.`),
    };
  },
  // 6. notação científica de número pequeno
  (r) => {
    const [txt, m, e] = r.pick([['0,00045', 4.5, -4], ['0,0000032', 3.2, -6], ['0,0078', 7.8, -3], ['0,000506', 5.06, -4], ['0,091', 9.1, -2]]);
    return {
      e: `A espessura de uma folha medida num laboratório foi de ${txt} m. Em notação científica, isso é:`,
      r: cient(m, e),
      d: [cient(m, e + 1), cient(m, e - 1), cient(m * 10, e), cient(m, -e)],
      x: expl('notação científica', 'Ande com a vírgula até ficar com um número entre 1 e 10; cada casa andada para a direita é um 10⁻¹.', `${txt} = ${cient(m, e)}.`),
    };
  },
  // 7. raiz de decimal
  (r) => {
    const k = r.pick([3, 4, 6, 7, 9, 12]);
    const dec = r.pick([1, 2]);
    const v = k / 10 ** dec, q = v * v;
    return {
      e: `Qual é o valor de √${num(q, 2 * dec)}?`,
      r: v,
      d: [v * 10, v / 10, q * 2, k],
      f: (x) => num(x, dec + 1).replace(/0+$/, '').replace(/,$/, ''),
      x: expl('raiz de decimal', 'Escreva o decimal como fração de potência de 10: a raiz de 10²ⁿ é 10ⁿ.', `√${num(q, 2 * dec)} = √(${k * k}/${10 ** (2 * dec)}) = ${k}/${10 ** dec} = ${num(v)}.`),
    };
  },
  // 8. simplificar radical
  (r) => {
    const [c, m] = r.pick([[6, 2], [3, 5], [5, 3], [4, 3], [2, 7], [10, 2], [3, 6]]);
    const n = c * c * m;
    return {
      e: `Simplificando √${n}, obtemos:`,
      r: rad(c, m),
      d: [rad(m, c), rad(c * c, m), rad(c + 1, m), rad(c, m + 1)],
      x: expl('fatorar o radicando', 'Procure o maior quadrado perfeito que divide o número e tire sua raiz para fora.', `${n} = ${c * c} · ${m}, então √${n} = √${c * c} · √${m} = ${rad(c, m)}.`),
    };
  },
  // 9. soma de radicais semelhantes
  (r) => {
    const n = r.pick([2, 3, 5, 7]), a = r.int(2, 6), b = r.int(2, 6), c = r.int(1, 3);
    const s = a + b - c;
    return {
      e: `Qual é o resultado de ${rad(a, n)} + ${rad(b, n)} − ${rad(c, n)}?`,
      r: rad(s, n),
      d: [rad(s, 3 * n), rad(a + b + c, n), num(s * n), rad(a * b - c, n)],
      x: expl('radicais semelhantes', 'Radicais com o mesmo índice e o mesmo radicando funcionam como "x": somam-se os coeficientes.', `(${a} + ${b} − ${c})√${n} = ${rad(s, n)}.`),
    };
  },
  // 10. produto de radicais
  (r) => {
    const [a, b] = r.pick([[3, 12], [2, 8], [2, 18], [5, 20], [3, 27], [6, 24]]);
    const v = Math.sqrt(a * b);
    return {
      e: `Calcule √${a} · √${b}.`,
      r: v,
      d: [a + b, Math.sqrt(a + b) % 1 === 0 ? Math.sqrt(a + b) : v + 1, v * 2, a * b],
      x: expl('produto de raízes de mesmo índice', '√a · √b = √(a·b). Junte tudo numa raiz só e veja se vira quadrado perfeito.', `√(${a} · ${b}) = √${a * b} = ${v}.`),
    };
  },
  // 11. raiz cúbica de negativo
  (r) => {
    const a = r.int(2, 6);
    return {
      e: `Qual é o valor de ∛(−${a ** 3})?`,
      r: -a,
      d: [a, `não existe nos reais`, -(a ** 2), -3 * a],
      f: (v) => (typeof v === 'number' ? num(v) : v),
      x: expl('raiz de índice ímpar', 'Raiz cúbica de número negativo existe: (−a)³ é negativo. Só raiz de índice par de negativo não existe nos reais.', `(−${a})³ = −${a ** 3}, então ∛(−${a ** 3}) = −${a}.`),
    };
  },
  // 12. expoente fracionário
  (r) => {
    const [b, n, m] = r.pick([[8, 3, 2], [27, 3, 2], [16, 4, 3], [25, 2, 3], [32, 5, 2], [64, 3, 2]]);
    const raiz = Math.round(b ** (1 / n));
    const v = raiz ** m;
    return {
      e: `Qual é o valor de ${b}^(${m}/${n})?`,
      r: v,
      d: [(b * m) / n, raiz * m, b ** m / n, raiz],
      x: expl('expoente fracionário = raiz', `a^(m/n) é a raiz de índice n de aᵐ. É mais fácil tirar a raiz primeiro e elevar depois.`, `A raiz de índice ${n} de ${b} é ${raiz}; ${raiz}${sup(m)} = ${v}.`),
    };
  },
  // 13. potência de decimal
  (r) => {
    const [d, n] = r.pick([[0.2, 3], [0.3, 2], [0.1, 4], [0.5, 3], [1.2, 2], [0.4, 2]]);
    const v = d ** n;
    const casas = String(d).split('.')[1].length * n;
    const fmt = (x) => num(x, casas).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
    return {
      e: `Calcule (${num(d)})${sup(n)}.`,
      r: v,
      d: [d * n, v * 10, v / 10, d ** (n - 1)],
      f: fmt,
      x: expl('potência de decimal', `Calcule sem vírgula e, no fim, dê ao resultado ${casas} casas decimais (casas da base × expoente).`, `(${num(d)})${sup(n)} = ${fmt(v)}.`),
    };
  },
  // 14. conversão de área
  (r) => {
    const v = r.pick([2, 3, 4.5, 1.2, 0.8]);
    return {
      e: `Um terreno tem ${num(v)} km² de área. Quanto é isso em metros quadrados?`,
      r: cient(v, 6),
      d: [cient(v, 3), cient(v, 9), cient(v, 4), cient(v, 5)],
      x: expl('unidade ao quadrado', 'Se 1 km = 10³ m, então 1 km² = (10³ m)² = 10⁶ m². A potência da unidade também vai ao quadrado.', `${num(v)} km² = ${cient(v, 6)} m².`),
    };
  },
  // 15. km/h para m/s
  (r) => {
    const v = r.pick([36, 54, 72, 90, 108, 126]);
    return {
      e: `Um carro está a ${v} km/h. Qual é a sua velocidade em metros por segundo?`,
      r: v / 3.6,
      d: [v * 3.6, v / 36, v / 6, v / 1.8],
      x: expl('conversão em cadeia', '1 km = 1 000 m e 1 h = 3 600 s; por isso, de km/h para m/s divide-se por 3,6.', `${v} × 1 000 ÷ 3 600 = ${num(v / 3.6)} m/s.`),
    };
  },
  // 16. fração com expoente negativo
  (r) => {
    const [a, b] = r.pick([[2, 3], [3, 4], [2, 5], [4, 3], [5, 2]]);
    const n = r.int(2, 3);
    return {
      e: `Qual é o valor de (${a}/${b})${sup(-n)}?`,
      r: `${b ** n}/${a ** n}`,
      d: [`${a ** n}/${b ** n}`, `−${a ** n}/${b ** n}`, `${b * n}/${a * n}`, `−${b ** n}/${a ** n}`],
      x: expl('expoente negativo em fração', 'Inverta a fração e troque o sinal do expoente.', `(${a}/${b})${sup(-n)} = (${b}/${a})${sup(n)} = ${b ** n}/${a ** n}.`),
    };
  },
  // 17. racionalização simples
  (r) => {
    const n = r.pick([2, 3, 5, 6, 7]), k = r.int(1, 4);
    const a = n * k;
    return {
      e: `Racionalizando o denominador de ${a}/√${n}, obtemos:`,
      r: rad(k, n),
      d: [rad(a, n), `${a}/${n}`, rad(k + 1, n), `${rad(a, n)}/${n * 2}`, rad(k, n * 2)],
      x: expl('racionalização', `Multiplique em cima e embaixo por √${n}: o denominador vira √${n}·√${n} = ${n}.`, `${a}√${n}/${n} = ${rad(k, n)}.`),
    };
  },
];

const medio = [
  // 1. tudo na mesma base
  (r) => {
    const a = r.int(3, 6), b = r.int(2, 4), c = r.int(3, 5);
    const ex = a + 2 * b - 3 * c;
    if (ex === 0) return medio[0](r);
    return {
      e: `Qual é o valor de (2${sup(a)} · 4${sup(b)}) ÷ 8${sup(c)}?`,
      r: ex >= 0 ? num(2 ** ex) : `1/${2 ** -ex}`,
      d: [ex >= 0 ? `1/${2 ** ex}` : num(2 ** -ex), num(2 ** (a + b - c)), `1/${2 ** Math.abs(ex + 1)}`, num(2 ** Math.abs(ex - 1))],
      x: expl('mesma base', 'Escreva 4 = 2² e 8 = 2³ e use as regras de potência com base 2.', `2${sup(a)} · 2${sup(2 * b)} ÷ 2${sup(3 * c)} = 2${sup(ex)} = ${ex >= 0 ? 2 ** ex : `1/${2 ** -ex}`}.`),
    };
  },
  // 2. simplificar e somar radicais
  (r) => {
    const n = r.pick([2, 3]);
    const ks = r.sample([2, 3, 4, 5], 3);
    const [a, b, c] = ks;
    const s = a + b - c;
    return {
      e: `Qual é o resultado de √${a * a * n} + √${b * b * n} − √${c * c * n}?`,
      r: rad(s, n),
      d: [`√${a * a * n + b * b * n - c * c * n}`, rad(a + b + c, n), rad(s, n * 3), rad(s + 1, n)],
      x: expl('simplificar antes de somar', 'Raízes diferentes só se somam depois de simplificadas, quando ficam com o mesmo radicando.', `${rad(a, n)} + ${rad(b, n)} − ${rad(c, n)} = ${rad(s, n)}.`),
    };
  },
  // 3. racionalização com conjugado
  (r) => {
    const [a, b] = r.pick([[5, 3], [7, 5], [6, 2], [7, 3], [11, 7]]);
    const d = a - b;
    return {
      e: `Racionalizando ${d}/(√${a} − √${b}), obtemos:`,
      r: `√${a} + √${b}`,
      d: [`√${a} − √${b}`, `(√${a} + √${b})/${d}`, `√${a - b}`, `${d}(√${a} + √${b})`],
      x: expl('conjugado', `Multiplique por √${a} + √${b}: no denominador aparece (√${a})² − (√${b})² = ${a} − ${b} = ${d}.`, `${d}(√${a} + √${b})/${d} = √${a} + √${b}.`),
    };
  },
  // 4. produto em notação científica
  (r) => {
    const [a, b] = r.pick([[3, 5], [4, 2.5], [6, 0.5], [2, 7], [8, 1.5]]);
    const e1 = r.int(3, 9), e2 = -r.int(2, 11);
    let m = a * b, e = e1 + e2;
    if (m >= 10) { m /= 10; e += 1; }
    if (m < 1) { m *= 10; e -= 1; }
    return {
      e: `Calcule (${cient(a, e1)}) · (${cient(b, e2)}) e dê a resposta em notação científica.`,
      r: cient(m, e),
      d: [cient(m, e1 * e2), cient(m, e + 1), cient(m, e - 1), cient(a + b, e)],
      x: expl('notação científica: números com números, potências com potências', 'Multiplique as partes numéricas e some os expoentes de 10; depois ajuste para o número ficar entre 1 e 10.', `${num(a)} · ${num(b)} = ${num(a * b)} e 10${sup(e1)} · 10${sup(e2)} = 10${sup(e1 + e2)} ⇒ ${cient(m, e)}.`),
    };
  },
  // 5. expoente fracionário negativo
  (r) => {
    const [b, n] = r.pick([[27, 3], [8, 3], [64, 3], [16, 4], [125, 3]]);
    const raiz = Math.round(b ** (1 / n)), m = r.pick([1, 2]);
    return {
      e: `Qual é o valor de ${b}^(−${m}/${n})?`,
      r: `1/${raiz ** m}`,
      d: [`−${raiz ** m}`, `${raiz ** m}`, `1/${b ** m}`, `−1/${raiz ** m}`],
      x: expl('expoente negativo e fracionário', 'O sinal de menos inverte; a fração no expoente vira raiz.', `${b}^(${m}/${n}) = ${raiz}${sup(m)} = ${raiz ** m}; com o sinal negativo, fica 1/${raiz ** m}.`),
    };
  },
  // 6. qual é maior (igualar expoentes)
  (r) => {
    const op = r.pick([[['2⁶⁰', 8], ['3⁴⁰', 9], ['5²⁰', 5]], [['2³⁰', 8], ['3²⁰', 9], ['7¹⁰', 7]], [['2⁴⁵', 8], ['3³⁰', 9], ['10¹⁵', 10]]]);
    const ord = [...op].sort((p, q) => q[1] - p[1]);
    const comum = { '2⁶⁰': '²⁰', '2³⁰': '¹⁰', '2⁴⁵': '¹⁵' }[op[0][0]];
    return {
      e: `Qual destes números é o maior: ${op.map((o) => o[0]).join(', ')}?`,
      r: ord[0][0],
      d: [...op.filter((o) => o !== ord[0]).map((o) => o[0]), 'todos são iguais', 'não dá para comparar sem calculadora'],
      x: expl('mesmo expoente', 'Para comparar potências enormes, escreva todas com o mesmo expoente; aí basta comparar as bases.', op.map((o) => `${o[0]} = ${o[1]}${comum}`).join('; ') + `. A maior base é ${ord[0][1]}.`),
    };
  },
  // 7. soma de potências iguais
  (r) => {
    const b = r.pick([2, 3, 4, 5]), n = r.int(4, 9);
    return {
      e: `Escreva ${Array(b).fill(`${b}${sup(n)}`).join(' + ')} como uma única potência de ${b}.`,
      r: `${b}${sup(n + 1)}`,
      d: [`${b}${sup(n * b)}`, `${b * b}${sup(n)}`, `${b}${sup(n + b)}`, `${b * b}${sup(n * b)}`],
      x: expl('somar parcelas iguais é multiplicar', `São ${b} parcelas iguais a ${b}${sup(n)}: ${b} · ${b}${sup(n)} = ${b}¹ · ${b}${sup(n)} = ${b}${sup(n + 1)}.`, ''),
    };
  },
  // 8. distância com notação científica
  (r) => {
    const t = r.pick([500, 1.3, 8.3]);
    const [dist, txt] = t === 500 ? [1.5e11, 'a luz do Sol leva cerca de 500 s para chegar à Terra'] : t === 1.3 ? [3.9e8, 'a luz refletida pela Lua leva cerca de 1,3 s para chegar à Terra'] : [2.49e9, 'um sinal de rádio leva 8,3 s para chegar de uma sonda até a Terra'];
    const e = Math.floor(Math.log10(dist)), m = dist / 10 ** e;
    return {
      e: `A velocidade da luz é de cerca de 3 × 10⁸ m/s. Sabendo que ${txt}, qual é a distância aproximada percorrida, em metros?`,
      r: cient(m, e),
      d: [cient(m, e - 1), cient(m, e + 1), cient(m, e + 2), cient(m, e - 2)],
      x: expl('distância = velocidade × tempo', 'Multiplique a parte numérica e mantenha a potência de 10, ajustando no fim.', `3 × 10⁸ × ${num(t)} = ${cient(m, e)} m.`),
    };
  },
  // 9. raiz de raiz
  (r) => {
    const [n, idx, v, ind] = r.pick([[64, '∛', 2, 6], [256, '∜', 2, 8], [729, '∛', 3, 6], [81, '√', 3, 4]]);
    return {
      e: `Qual é o valor de √(${idx}${n})?`,
      r: v,
      d: [v * 2, n / ind, v + 1, Math.sqrt(n) % 1 === 0 ? Math.sqrt(n) : v * 3],
      x: expl('raiz de raiz', 'Os índices se multiplicam: √(ⁿ√a) é a raiz de índice 2n.', `Índice ${ind}: ${v}${sup(ind)} = ${n}, então o resultado é ${v}.`),
    };
  },
  // 10. litros num tanque
  (r) => {
    const [a, b, c] = r.pick([[2, 1.5, 0.8], [3, 2, 1.2], [1.5, 1, 0.6], [4, 2.5, 1], [2.5, 1.2, 0.5]]);
    const v = a * b * c * 1000;
    return {
      e: `Uma caixa-d'água tem formato de paralelepípedo, com ${num(a)} m × ${num(b)} m × ${num(c)} m por dentro. Quantos litros ela comporta?`,
      r: v,
      d: [v / 10, v * 10, a * b * c, v / 1000 * 100],
      x: expl('1 m³ = 1 000 L', 'Calcule o volume em m³ e converta: 1 m³ é um cubo de 10 dm de lado, ou seja, 10³ dm³ = 1 000 L.', `${num(a)} × ${num(b)} × ${num(c)} = ${num(a * b * c)} m³ = ${num(v)} L.`),
    };
  },
  // 11. simplificar expressão literal
  (r) => {
    const a = r.int(2, 6), b = r.int(3, 7), c = r.int(2, 5);
    const ex = a - b + c;
    const fmt = (k) => (k === 0 ? '1' : k === 1 ? 'x' : `x${sup(k)}`);
    return {
      e: `Para x ≠ 0, a expressão (x${sup(a)} · x${sup(-b)}) ÷ x${sup(-c)} é igual a:`,
      r: fmt(ex),
      d: [fmt(a - b - c), fmt(a + b + c), fmt(-ex), fmt(ex + 2), fmt(ex - 1)],
      x: expl('regras de potência com letras', 'Somam-se os expoentes na multiplicação e subtraem-se na divisão; dividir por x⁻ᶜ é multiplicar por xᶜ.', `${a} + (−${b}) − (−${c}) = ${ex} ⇒ ${fmt(ex)}.`),
    };
  },
  // 12. número de algarismos
  (r) => {
    const n = r.int(8, 20), k = r.int(1, 3);
    const extra = 5 ** k; // 2^n · 5^(n+k) = 10^n · 5^k
    const alg = String(extra).length + n;
    return {
      e: `Quantos algarismos tem o número 2${sup(n)} · 5${sup(n + k)}?`,
      r: alg,
      d: [n, n + k, 2 * n + k, alg + 1],
      x: expl('formar potências de 10', 'Cada par 2 · 5 forma um 10. Junte o máximo de pares possível.', `2${sup(n)} · 5${sup(n)} · 5${sup(k)} = ${extra} · 10${sup(n)}: o ${extra} seguido de ${n} zeros, ${alg} algarismos.`),
    };
  },
  // 13. algarismo das unidades
  (r) => {
    const [b, ciclo] = r.pick([[7, [7, 9, 3, 1]], [3, [3, 9, 7, 1]], [2, [2, 4, 8, 6]], [8, [8, 4, 2, 6]]]);
    const n = r.int(30, 500);
    const u = ciclo[(n - 1) % 4];
    return {
      e: `Qual é o algarismo das unidades de ${b}${sup(n)}?`,
      r: u,
      d: ciclo.filter((c) => c !== u).concat([b === 2 || b === 8 ? 0 : 5]),
      x: expl('ciclo das unidades', `As unidades das potências de ${b} se repetem de 4 em 4: ${ciclo.join(', ')}. Basta ver o resto de ${n} por 4.`, `${n} = 4 × ${Math.floor(n / 4)} + ${n % 4}, então a unidade é ${u}.`),
    };
  },
  // 14. equação com raiz
  (r) => {
    const a = r.int(2, 4), b = r.int(1, 9), y = r.int(3, 9);
    if ((y * y - b) % a !== 0) return medio[13](r);
    const x = (y * y - b) / a;
    return {
      e: `Resolva √(${a}x + ${b}) = ${y}.`,
      r: x,
      d: [(y - b) / a, (2 * y - b) / a, y * y, x + a],
      x: expl('elevar os dois lados ao quadrado', 'Para tirar a raiz, eleve os dois lados ao quadrado e depois confira a resposta na equação original.', `${a}x + ${b} = ${y * y} ⇒ x = ${x}. Conferindo: √${a * x + b} = ${y}.`),
    };
  },
  // 15. lado de quadrado
  (r) => {
    const [c, m] = r.pick([[5, 2], [4, 3], [3, 5], [6, 2], [2, 6]]);
    const area = c * c * m;
    return {
      e: `Um quadrado tem ${area} cm² de área. Quanto mede o seu lado, na forma simplificada?`,
      r: `${rad(c, m)} cm`,
      d: [`${num(area / 4)} cm`, `${rad(m, c)} cm`, `${num(area / 2)} cm`, `${rad(c * c, m)} cm`],
      x: expl('raiz quadrada da área', 'A área do quadrado é lado², então lado = √área. Simplifique a raiz.', `√${area} = √(${c * c} · ${m}) = ${rad(c, m)} cm.`),
    };
  },
  // 16. divisão de soma de raízes
  (r) => {
    const n = r.pick([2, 3, 5]);
    const a = r.int(2, 4), b = r.int(2, 5);
    if (a === b) return medio[15](r);
    return {
      e: `Qual é o valor de (√${a * a * n} + √${b * b * n}) ÷ √${n}?`,
      r: a + b,
      d: [a * b, Math.round(Math.sqrt(a * a + b * b) * 100) / 100, (a + b) * n, a + b + n],
      x: expl('simplificar e colocar em evidência', `Cada raiz vira um múltiplo de √${n}; depois a divisão cancela o √${n}.`, `(${rad(a, n)} + ${rad(b, n)}) ÷ √${n} = ${a} + ${b} = ${a + b}.`),
    };
  },
  // 17. densidade e unidades
  (r) => {
    const [mat, dens] = r.pick([['alumínio', 2.7], ['ferro', 7.9], ['ouro', 19.3], ['gelo', 0.92], ['cobre', 8.9]]);
    return {
      e: `A densidade do ${mat} é ${num(dens)} g/cm³. Quanto vale essa densidade em kg/m³?`,
      r: dens * 1000,
      d: [dens / 1000, dens * 100, dens * 10, dens * 1e6],
      x: expl('converter as duas unidades', '1 g = 10⁻³ kg e 1 cm³ = 10⁻⁶ m³. Dividindo, g/cm³ = 10⁻³/10⁻⁶ kg/m³ = 10³ kg/m³.', `${num(dens)} × 1 000 = ${num(dens * 1000)} kg/m³.`),
    };
  },
];

const dificil = [
  // 1. raiz de soma com radical
  (r) => {
    const [a, b] = r.pick([[2, 3], [3, 2], [1, 2], [3, 5], [2, 5], [1, 3]]);
    // (a + √b)² = a² + b + 2a√b
    const p = a * a + b, q = 2 * a;
    return {
      e: `Qual é o valor de √(${p} + ${q}√${b})?`,
      r: `${a} + √${b}`,
      d: [`√${p} + ${q}`, `${a * a} + √${b}`, `${a} + ${b}`, `√${b} − ${a}`, `${a + 1} + √${b}`],
      x: expl('reconhecer um quadrado perfeito', `Procure a e b com (a + √b)² = a² + b + 2a√b igual a ${p} + ${q}√${b}.`, `(${a} + √${b})² = ${a * a} + ${b} + ${q}√${b} = ${p} + ${q}√${b}.`),
    };
  },
  // 2. racionalizar raiz cúbica
  (r) => {
    const a = r.pick([2, 3, 5]);
    return {
      e: `Racionalizando 1/∛${a}, obtemos:`,
      r: `∛${a * a}/${a}`,
      d: [`∛${a}/${a}`, `√${a}/${a}`, `∛${a * a}/${a * a}`, `${a}/∛${a}`],
      x: expl('completar o cubo', `Para sumir com ∛${a} embaixo, falta multiplicar por ∛${a}² = ∛${a * a}, formando ∛${a ** 3} = ${a}.`, `1/∛${a} · ∛${a * a}/∛${a * a} = ∛${a * a}/${a}.`),
    };
  },
  // 3. equação irracional com raiz falsa
  (r) => {
    const x = r.int(3, 9), k = r.int(1, 3);
    // √(x + c) = x − k ⇒ x + c = (x − k)²
    const c = (x - k) ** 2 - x;
    if (c <= 0) return dificil[2](r);
    // outra raiz da quadrática x² − (2k + 1)x + k² − c = 0: soma = 2k + 1
    const outra = 2 * k + 1 - x;
    return {
      e: `Qual é o conjunto solução, nos reais, de √(x + ${c}) = x − ${k}?`,
      r: `{${x}}`,
      d: [`{${num(Math.min(x, outra))}, ${num(Math.max(x, outra))}}`, `{${num(outra)}}`, '∅', `{${x + 1}}`],
      x: expl('elevar ao quadrado e conferir', 'Elevar ao quadrado pode criar raízes "falsas"; toda solução precisa ser testada na equação original.', `x + ${c} = (x − ${k})² dá x = ${x} ou x = ${outra}. Para x = ${outra}, o lado direito fica negativo, então só x = ${x} serve.`),
    };
  },
  // 4. 2^a = k ⇒ 4^a + 8^a
  (r) => {
    const k = r.int(3, 6);
    return {
      e: `Se 2ᵃ = ${k}, qual é o valor de 4ᵃ + 8ᵃ?`,
      r: k * k + k ** 3,
      d: [2 * k + 3 * k, k * k * k * k, 12 * k, k + k * k],
      x: expl('trocar de base', '4ᵃ = (2²)ᵃ = (2ᵃ)² e 8ᵃ = (2ᵃ)³: tudo vira potência de 2ᵃ.', `${k}² + ${k}³ = ${k * k} + ${k ** 3} = ${k * k + k ** 3}.`),
    };
  },
  // 5. fator comum com potências de expoente literal
  (r) => {
    const [a, b] = r.pick([[3, 1], [4, 2], [5, 3], [3, 2], [4, 1]]);
    const base = r.pick([2, 3]);
    const v = base ** a - base ** b;
    return {
      e: `Simplifique (${base}ⁿ⁺${sup(a)} − ${base}ⁿ⁺${sup(b)}) ÷ ${base}ⁿ.`,
      r: v,
      d: [base ** (a - b), base ** a + base ** b, base ** (a + b), v * base],
      x: expl('fator comum de potência', `${base}ⁿ⁺ᵏ = ${base}ⁿ · ${base}ᵏ: coloque ${base}ⁿ em evidência e ele se cancela.`, `${base}ⁿ(${base}${sup(a)} − ${base}${sup(b)}) ÷ ${base}ⁿ = ${base ** a} − ${base ** b} = ${v}.`),
    };
  },
  // 6. algarismos de 4^m · 5^n
  (r) => {
    const m = r.int(5, 15), n = 2 * m - r.int(3, 6);
    // 4^m·5^n = 2^(2m)·5^n = 10^n · 2^(2m−n)
    const sobra = 2 ** (2 * m - n);
    const alg = String(sobra).length + n;
    return {
      e: `Quantos algarismos tem o número 4${sup(m)} · 5${sup(n)}?`,
      r: alg,
      d: [n, m + n, 2 * m, alg - 1],
      x: expl('formar potências de 10', `4${sup(m)} = 2${sup(2 * m)}; junte ${n} pares 2·5.`, `2${sup(2 * m)} · 5${sup(n)} = 2${sup(2 * m - n)} · 10${sup(n)} = ${sobra} · 10${sup(n)}: ${alg} algarismos.`),
    };
  },
  // 7. comparar radicais de índices diferentes
  (r) => {
    return {
      e: 'Qual destes números é o maior: √2, ∛3 ou ⁶√6?',
      r: '∛3',
      d: ['√2', '⁶√6', 'os três são iguais', '√2 e ∛3 são iguais e maiores que ⁶√6'],
      x: expl('elevar ao mesmo expoente', 'Eleve todos à 6ª potência (MMC dos índices 2, 3 e 6): a ordem não muda, porque são números positivos.', '(√2)⁶ = 8, (∛3)⁶ = 9 e (⁶√6)⁶ = 6. O maior é ∛3.'),
    };
  },
  // 8. raiz em notação científica
  (r) => {
    const [m, e, rm, re] = r.pick([[1.6, 9, 4, 4], [2.5, 7, 5, 3], [3.6, 11, 6, 5], [4.9, 5, 7, 2], [6.4, 13, 8, 6]]);
    return {
      e: `Qual é o valor de √(${cient(m, e)})?`,
      r: cient(rm, re),
      d: [cient(rm, re + 1), cient(rm, re - 1), cient(Math.round(Math.sqrt(m) * 100) / 100, (e - 1) / 2), cient(rm / 2, re)],
      x: expl('deixar o expoente par', `Para tirar a raiz de uma potência de 10, o expoente precisa ser par: ${cient(m, e)} = ${num(m * 10)} × 10${sup(e - 1)}.`, `√${num(m * 10)} · √10${sup(e - 1)} = ${rm} × 10${sup(re)}.`),
    };
  },
  // 9. produto de raízes de índices diferentes
  (r) => {
    const a = r.pick([2, 3]);
    return {
      e: `Escreva √${a} · ∛${a} como uma única raiz.`,
      r: `⁶√${a ** 5}`,
      d: [`⁶√${a * a}`, `⁵√${a * a}`, `⁶√${a}`, `∛${a * a}`],
      x: expl('expoentes fracionários', `√${a} = ${a}^(1/2) e ∛${a} = ${a}^(1/3); multiplicando, somam-se os expoentes.`, `1/2 + 1/3 = 5/6 ⇒ ${a}^(5/6) = ⁶√${a}⁵ = ⁶√${a ** 5}.`),
    };
  },
  // 10. soma de quadrados de binômios com raiz
  (r) => {
    const n = r.pick([2, 3, 5, 6, 7]), a = r.int(1, 4);
    return {
      e: `Qual é o valor de (√${n} + ${a})² + (√${n} − ${a})²?`,
      r: 2 * (n + a * a),
      d: [2 * n, n + a * a, 4 * a * n, 2 * (n + a * a) + 4],
      x: expl('produtos notáveis', 'Os termos do meio, +2a√n e −2a√n, se cancelam na soma.', `(${n} + ${2 * a}√${n} + ${a * a}) + (${n} − ${2 * a}√${n} + ${a * a}) = ${2 * (n + a * a)}.`),
    };
  },
  // 11. √a + 1/√a a partir de a + 1/a
  (r) => {
    const k = r.int(3, 7);
    return {
      e: `Sabendo que a > 0 e a + 1/a = ${k * k - 2}, qual é o valor de √a + 1/√a?`,
      r: k,
      d: [k * k, Math.round(Math.sqrt(k * k - 2) * 100) / 100, k - 1, k + 2],
      x: expl('quadrado da soma', '(√a + 1/√a)² = a + 2 + 1/a. Use o dado do enunciado e tire a raiz.', `(√a + 1/√a)² = ${k * k - 2} + 2 = ${k * k} ⇒ √a + 1/√a = ${k}.`),
    };
  },
  // 12. kWh em joules
  (r) => {
    const kwh = r.pick([150, 200, 250, 300, 120]);
    const j = kwh * 3.6e6;
    const e = Math.floor(Math.log10(j)), m = j / 10 ** e;
    return {
      e: `Uma casa consumiu ${kwh} kWh num mês. Sabendo que 1 kW = 10³ W, que 1 W = 1 J/s e que 1 h = 3 600 s, quantos joules foram consumidos?`,
      r: cient(m, e),
      d: [cient(m, e - 3), cient(m, e + 3), cient(kwh * 3.6 / 10 ** Math.floor(Math.log10(kwh * 3.6)), Math.floor(Math.log10(kwh * 3.6))), cient(m, e - 1)],
      x: expl('conversão em cadeia', '1 kWh = 10³ J/s × 3 600 s = 3,6 × 10⁶ J.', `${kwh} × 3,6 × 10⁶ = ${cient(m, e)} J.`),
    };
  },
  // 13. soma de (−1)^k
  (r) => {
    const n = r.int(20, 99);
    const s = n % 2 === 0 ? 0 : -1;
    return {
      e: `Qual é o valor de (−1)¹ + (−1)² + (−1)³ + ··· + (−1)${sup(n)}?`,
      r: s,
      d: [n, -n, 1, s === 0 ? -1 : 0],
      x: expl('pares que se anulam', 'Expoente par dá 1 e ímpar dá −1. Cada par (−1) + 1 soma zero.', `${n % 2 === 0 ? `São ${n / 2} pares completos: soma 0.` : `Sobram os pares completos (soma 0) e o último termo, (−1)${sup(n)} = −1.`}`),
    };
  },
  // 14. raiz quarta de produto
  (r) => {
    const [a, b] = r.pick([[2, 3], [2, 5], [3, 5], [1, 3], [2, 7]]);
    return {
      e: `Calcule ∜(${a ** 4} · ${b ** 4}) − ∜${(a * b) ** 4 * 16}.`,
      r: -a * b,
      d: [a * b, 0, 2 * a * b, -((a * b) ** 2)],
      x: expl('raiz de produto', '∜(x·y) = ∜x · ∜y. Reconheça as quartas potências.', `∜${a ** 4} · ∜${b ** 4} = ${a * b} e ∜${(a * b) ** 4 * 16} = 2 · ${a * b} = ${2 * a * b}; ${a * b} − ${2 * a * b} = −${a * b}.`),
    };
  },
  // 15. algarismo das unidades com expoente grande
  (r) => {
    const n = r.pick([2025, 2026, 2027, 2023, 1999, 2030]);
    const [b, ciclo] = r.pick([[3, [3, 9, 7, 1]], [7, [7, 9, 3, 1]], [9, [9, 1, 9, 1]]]);
    const u = ciclo[(n - 1) % 4];
    return {
      e: `Qual é o algarismo das unidades de ${b}${sup(n)} + 1?`,
      r: (u + 1) % 10,
      d: [u, (u + 2) % 10, (u + 5) % 10, (u + 9) % 10 === (u + 1) % 10 ? (u + 3) % 10 : (u + 9) % 10],
      x: expl('ciclo das unidades', `As unidades das potências de ${b} repetem ${ciclo.join(', ')}. Use o resto de ${n} por 4.`, `${n} deixa resto ${n % 4} por 4, então ${b}${sup(n)} termina em ${u}; somando 1, termina em ${(u + 1) % 10}.`),
    };
  },
  // 16. dobrar papel
  (r) => {
    const n = r.pick([20, 25, 30]);
    const esp = 0.1; // mm
    const total = (2 ** n * esp) / 1000; // m
    const txt = n === 20 ? 'cerca de 100 metros' : n === 25 ? 'cerca de 3,4 quilômetros' : 'cerca de 107 quilômetros';
    return {
      e: `Uma folha tem 0,1 mm de espessura. Se fosse possível dobrá-la ao meio ${n} vezes, a pilha teria qual altura aproximada? (Use 2¹⁰ ≈ 1 000.)`,
      r: txt,
      d: [`cerca de ${n * 2} milímetros`, `cerca de ${num(n * 0.1)} centímetros`, 'cerca de 2 metros', n === 30 ? 'cerca de 100 metros' : 'cerca de 107 quilômetros'],
      x: expl('crescimento por potência de 2', `Cada dobra dobra a espessura: depois de ${n} dobras, ela é 2${sup(n)} vezes maior.`, `2${sup(n)} × 0,1 mm ≈ ${num(total)} m, ou seja, ${txt}.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '19-potenciacao-e-radiciacao',
    titulo: 'Potenciação, radiciação e conversão de unidades',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Propriedades das potências, notação científica, raízes, racionalização e conversão de unidades com potências de 10.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
