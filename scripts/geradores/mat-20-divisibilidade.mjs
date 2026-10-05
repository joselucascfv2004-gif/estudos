// Matemática — Divisibilidade, números primos, MDC, MMC e restos (Aritmética).
import { expl, mdc, mmc, num, sup } from './util.mjs';

const fatorar = (n) => {
  const f = [];
  for (let p = 2; p * p <= n; p++) {
    let e = 0;
    while (n % p === 0) { n /= p; e++; }
    if (e) f.push([p, e]);
  }
  if (n > 1) f.push([n, 1]);
  return f;
};
const fatTxt = (n) => fatorar(n).map(([p, e]) => (e === 1 ? `${p}` : `${p}${sup(e)}`)).join(' · ');
const nDiv = (n) => fatorar(n).reduce((s, [, e]) => s * (e + 1), 1);
const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const ehPrimo = (n) => n > 1 && fatorar(n).length === 1 && fatorar(n)[0][1] === 1;

const facil = [
  // 1. fatoração em primos
  (r) => {
    const n = r.pick([360, 540, 600, 252, 420, 720, 180, 300]);
    const f = fatorar(n);
    const errado = (k) => f.map(([p, e], i) => (i === k ? `${p}${sup(e + 1)}` : e === 1 ? `${p}` : `${p}${sup(e)}`)).join(' · ');
    return {
      e: `Qual é a decomposição de ${n} em fatores primos?`,
      r: fatTxt(n),
      d: [errado(0), errado(1), f.map(([p]) => p).join(' · '), `${f[0][0]}${sup(f[0][1])} · ${n / f[0][0] ** f[0][1]}`],
      x: expl('divisões sucessivas pelos primos', 'Divida pelo menor primo possível (2, 3, 5, 7...) até chegar a 1 e anote cada divisor.', `${n} = ${fatTxt(n)}.`),
    };
  },
  // 2. critério de divisibilidade por 3
  (r) => {
    const ok = r.pick([4815, 7302, 1239, 5511, 8124]);
    const nao = r.sample([4816, 7303, 1240, 5512, 8125, 2224, 9101, 3335], 4);
    return {
      e: 'Qual destes números é divisível por 3?',
      r: ok,
      d: nao,
      f: (v) => num(v).replace('.', ''),
      x: expl('soma dos algarismos', 'Um número é divisível por 3 quando a soma dos seus algarismos é múltipla de 3.', `${ok}: ${String(ok).split('').join(' + ')} = ${String(ok).split('').reduce((s, c) => s + +c, 0)}, que é múltiplo de 3.`),
    };
  },
  // 3. critério por 4
  (r) => {
    const base = r.int(10, 99) * 100;
    const fins = r.shuffle([12, 36, 52, 74, 18, 30, 46, 98, 26, 42]);
    const certo = fins.find((f) => f % 4 === 0);
    const errados = fins.filter((f) => f % 4 !== 0).slice(0, 4);
    return {
      e: `Qual destes números é divisível por 4: ${[certo, ...errados].map((f) => base + f).sort((a, b) => a - b).join(', ')}?`,
      r: base + certo,
      d: errados.map((f) => base + f),
      f: (v) => String(v),
      x: expl('dois últimos algarismos', 'Um número é divisível por 4 quando o número formado pelos seus dois últimos algarismos é divisível por 4 (as centenas já são múltiplas de 4).', `${base + certo} termina em ${certo}, e ${certo} = 4 × ${certo / 4}.`),
    };
  },
  // 4. MDC: pedaços iguais do maior tamanho
  (r) => {
    const g = r.pick([6, 8, 12, 15, 18]);
    const a = g * r.int(3, 7), b = g * r.int(8, 12);
    if (mdc(a, b) !== g) return facil[3](r);
    return {
      e: `Uma costureira tem duas fitas, de ${a} cm e de ${b} cm, e quer cortá-las em pedaços todos do mesmo tamanho, o maior possível, sem sobrar nada. Quanto deve medir cada pedaço?`,
      r: g,
      d: [mmc(a, b), g / 2, g * 2, b - a],
      f: (v) => `${num(v)} cm`,
      x: expl('MDC', '"Dividir em partes iguais, do maior tamanho possível" é o máximo divisor comum.', `MDC(${a}, ${b}) = ${g} cm.`),
    };
  },
  // 5. MMC: eventos que coincidem
  (r) => {
    const [a, b] = r.pick([[12, 18], [15, 20], [8, 12], [10, 15], [16, 24], [9, 12]]);
    const m = mmc(a, b);
    return {
      e: `Dois ônibus partem juntos de um terminal às 6h. Um sai a cada ${a} minutos e o outro a cada ${b} minutos. Depois de quantos minutos eles voltam a partir juntos?`,
      r: m,
      d: [a * b, a + b, mdc(a, b), m * 2],
      f: (v) => `${num(v)} min`,
      x: expl('MMC', '"Quando voltam a coincidir" é o primeiro múltiplo comum dos intervalos.', `MMC(${a}, ${b}) = ${m} minutos.`),
    };
  },
  // 6. quantos múltiplos num intervalo
  (r) => {
    const k = r.pick([6, 7, 8, 9, 11, 13]), n = r.int(150, 400);
    const q = Math.floor(n / k);
    return {
      e: `Quantos números de 1 a ${n} são múltiplos de ${k}?`,
      r: q,
      d: [q + 1, q - 1, Math.round(n / k) === q ? q + 2 : Math.round(n / k), Math.floor(n / (k + 1))],
      x: expl('divisão inteira', `Os múltiplos são ${k}, ${2 * k}, ${3 * k}, ...; quantos cabem até ${n} é a parte inteira de ${n} ÷ ${k}.`, `${n} = ${k} × ${q} + ${n % k}, então são ${q} múltiplos.`),
    };
  },
  // 7. qual é primo
  (r) => {
    const p = r.pick([97, 89, 83, 79, 101, 103, 107]);
    const comp = r.sample([91, 87, 51, 119, 57, 133, 143, 161, 77, 111], 4);
    return {
      e: 'Qual destes números é primo?',
      r: p,
      d: comp,
      x: expl('testar primos até a raiz', `Basta tentar dividir pelos primos até √${p} ≈ ${Math.floor(Math.sqrt(p))}. Os outros têm divisores: ${comp.map((c) => `${c} = ${fatorar(c).map(([q]) => q).join(' · ')}`).join('; ')}.`, `${p} não é divisível por 2, 3, 5 nem 7, então é primo.`),
    };
  },
  // 8. resto de uma divisão
  (r) => {
    const d = r.pick([7, 8, 9, 11, 12]), n = r.int(1000, 3000);
    return {
      e: `Qual é o resto da divisão de ${num(n)} por ${d}?`,
      r: n % d,
      d: [(n % d) + 1, (n % d) + 2, d - (n % d), Math.floor(n / d) % 10].map((v) => v % d),
      x: expl('divisão euclidiana', `Dividendo = divisor × quociente + resto, com 0 ≤ resto < ${d}.`, `${num(n)} = ${d} × ${Math.floor(n / d)} + ${n % d}.`),
    };
  },
  // 9. dia da semana
  (r) => {
    const hoje = r.int(0, 6), n = r.int(40, 300);
    const dia = (hoje + n) % 7;
    return {
      e: `Hoje é ${DIAS[hoje]}. Que dia da semana será daqui a ${n} dias?`,
      r: DIAS[dia],
      d: [DIAS[(dia + 1) % 7], DIAS[(dia + 6) % 7], DIAS[(dia + 2) % 7], DIAS[(dia + 3) % 7]],
      x: expl('resto por 7', 'A semana se repete a cada 7 dias; só o resto da divisão por 7 importa.', `${n} = 7 × ${Math.floor(n / 7)} + ${n % 7}: anda-se ${n % 7} dia${n % 7 === 1 ? '' : 's'} a partir de ${DIAS[hoje]}, chegando a ${DIAS[dia]}.`),
    };
  },
  // 10. algarismo que torna divisível por 9
  (r) => {
    const ds = [r.int(1, 9), r.int(0, 9), r.int(0, 9)];
    const s = ds.reduce((a, b) => a + b, 0);
    const x = (9 - (s % 9)) % 9;
    return {
      e: `O número ${ds[0]}${ds[1]}?${ds[2]} tem um algarismo apagado (?). Qual algarismo deve ocupar esse lugar para que o número seja divisível por 9, sabendo que não é 9?`,
      r: x,
      d: [(x + 3) % 9, (x + 1) % 9, (x + 6) % 9, (x + 4) % 9],
      x: expl('soma dos algarismos por 9', 'É divisível por 9 quem tem soma dos algarismos múltipla de 9.', `${ds.join(' + ')} = ${s}; falta ${x} para chegar a ${s + x}, múltiplo de 9.`),
    };
  },
  // 11. número de divisores de um número pequeno
  (r) => {
    const n = r.pick([36, 48, 60, 72, 100, 45]);
    const divs = [];
    for (let k = 1; k <= n; k++) if (n % k === 0) divs.push(k);
    return {
      e: `Quantos divisores positivos tem o número ${n}?`,
      r: divs.length,
      d: [divs.length - 2, divs.length + 2, divs.length - 1, fatorar(n).length + 1],
      x: expl('listar em pares', 'Liste os divisores em pares cujo produto é o número: assim nenhum fica de fora.', `${divs.join(', ')}: são ${divs.length}.`),
    };
  },
  // 12. produto de consecutivos
  (r) => {
    const n = r.int(5, 40);
    return {
      e: `O produto de três números inteiros consecutivos, como ${n} · ${n + 1} · ${n + 2}, é sempre divisível por qual destes números?`,
      r: 6,
      d: [5, 4, 9, 7],
      x: expl('entre consecutivos sempre há um par e um múltiplo de 3', 'Em três inteiros seguidos, pelo menos um é par e exatamente um é múltiplo de 3. Por isso o produto é sempre múltiplo de 2 · 3 = 6.', `${n} · ${n + 1} · ${n + 2} = ${num(n * (n + 1) * (n + 2))} = 6 × ${num((n * (n + 1) * (n + 2)) / 6)}.`),
    };
  },
  // 13. binário para decimal
  (r) => {
    const n = r.int(9, 31);
    const b = n.toString(2);
    return {
      e: `No sistema binário (base 2), o número ${b} corresponde a qual número no sistema decimal?`,
      r: n,
      d: [n + 1, n - 1, b.split('').reduce((s, c) => s + +c, 0), parseInt(b.split('').reverse().join(''), 2) === n ? n + 2 : parseInt(b.split('').reverse().join(''), 2)],
      x: expl('valor posicional em base 2', 'Cada posição vale uma potência de 2: da direita para a esquerda, 1, 2, 4, 8, 16...', `${b.split('').map((c, i) => `${c}·${2 ** (b.length - 1 - i)}`).join(' + ')} = ${n}.`),
    };
  },
  // 14. decimal para binário
  (r) => {
    const n = r.int(10, 30);
    const b = n.toString(2);
    const vira = (k) => k.toString(2);
    return {
      e: `Como se escreve o número ${n} no sistema binário?`,
      r: b,
      d: [vira(n + 1), vira(n - 1), b.split('').reverse().join('') === b ? vira(n + 2) : b.split('').reverse().join(''), vira(n + 4)],
      f: (v) => String(v),
      x: expl('divisões por 2', 'Divida por 2 sucessivamente e leia os restos de baixo para cima; ou some potências de 2.', `${n} = ${b.split('').map((c, i) => (c === '1' ? 2 ** (b.length - 1 - i) : 0)).filter(Boolean).join(' + ')} ⇒ ${b}.`),
    };
  },
  // 15. decomposição decimal
  (r) => {
    const a = r.int(1, 9), b = r.int(1, 9), c = r.int(1, 9);
    const n = a * 1000 + b * 10 + c;
    return {
      e: `Qual número é igual a ${a} · 10³ + ${b} · 10 + ${c}?`,
      r: n,
      d: [a * 1000 + b * 100 + c, a * 100 + b * 10 + c, a * 1000 + b + c * 10, a * 10000 + b * 10 + c],
      f: (v) => String(v),
      x: expl('valor posicional', 'Cada potência de 10 indica uma casa: 10³ milhar, 10² centena, 10 dezena, 1 unidade. Casa que não aparece vale 0.', `${a} milhares, 0 centenas, ${b} dezenas e ${c} unidades: ${n}.`),
    };
  },
  // 16. faróis piscando
  (r) => {
    const [a, b, c] = r.pick([[12, 18, 30], [10, 15, 25], [8, 12, 20], [6, 10, 15], [9, 12, 15]]);
    const m = mmc(mmc(a, b), c);
    return {
      e: `Três faróis piscam a cada ${a}, ${b} e ${c} segundos, respectivamente. Se piscaram juntos agora, daqui a quantos segundos piscarão juntos de novo?`,
      r: m,
      d: [a * b * c, a + b + c, mmc(a, b), mdc(mdc(a, b), c)],
      x: expl('MMC de três números', 'O próximo encontro é o primeiro múltiplo comum dos três intervalos.', `${a} = ${fatTxt(a)}, ${b} = ${fatTxt(b)}, ${c} = ${fatTxt(c)}; MMC = ${fatTxt(m)} = ${m} s.`),
    };
  },
  // 17. quantos veículos (arredondar para cima)
  (r) => {
    const cap = r.pick([40, 44, 45, 50]), n = r.int(200, 600);
    if (n % cap === 0) return facil[16](r);
    const q = Math.ceil(n / cap);
    return {
      e: `Uma escola vai levar ${n} alunos a uma excursão em ônibus de ${cap} lugares. Qual é o número mínimo de ônibus necessário?`,
      r: q,
      d: [q - 1, q + 1, Math.round(n / cap) === q ? q + 2 : Math.round(n / cap), n % cap],
      x: expl('resto diferente de zero pede mais um', 'Divida e, se sobrar resto, os alunos que sobram precisam de mais um ônibus.', `${n} = ${cap} × ${q - 1} + ${n % cap}: sobram ${n % cap} alunos, então são ${q} ônibus.`),
    };
  },
];

const medio = [
  // 1. número de divisores pela fatoração
  (r) => {
    const n = r.pick([360, 720, 540, 600, 1008, 840, 1200]);
    const f = fatorar(n);
    return {
      e: `Quantos divisores positivos tem o número ${n}?`,
      r: nDiv(n),
      d: [f.reduce((s, [, e]) => s * e, 1), f.reduce((s, [, e]) => s + e + 1, 0), nDiv(n) / 2, nDiv(n) + f.length],
      x: expl('fórmula do número de divisores', `Fatore: ${n} = ${fatTxt(n)}. Cada divisor escolhe um expoente de 0 até o máximo para cada primo.`, `(${f.map(([, e]) => `${e} + 1`).join(')(')}) = ${nDiv(n)}.`),
    };
  },
  // 2. MDC × MMC = produto
  (r) => {
    const g = r.pick([4, 6, 8, 12]), p = r.int(2, 5), q = r.int(3, 7);
    if (mdc(p, q) !== 1 || p === q) return medio[1](r);
    const a = g * p, b = g * q;
    return {
      e: `O MDC de dois números é ${g}, e o MMC é ${mmc(a, b)}. Se um deles é ${a}, qual é o outro?`,
      r: b,
      d: [mmc(a, b) / g, mmc(a, b) - a, g * (p + q), b * 2],
      x: expl('MDC × MMC = produto dos números', 'Para dois números positivos, MDC(a, b) · MMC(a, b) = a · b.', `${g} × ${mmc(a, b)} = ${a} × b ⇒ b = ${g * mmc(a, b)} ÷ ${a} = ${b}.`),
    };
  },
  // 3. menor número com restos iguais
  (r) => {
    const [a, b, c] = r.pick([[4, 5, 6], [3, 4, 5], [6, 8, 10], [5, 6, 8], [4, 6, 9]]);
    const k = r.int(1, Math.min(a, b, c) - 1);
    const m = mmc(mmc(a, b), c);
    return {
      e: `Qual é o menor número inteiro maior que ${k} que, dividido por ${a}, por ${b} ou por ${c}, deixa sempre resto ${k}?`,
      r: m + k,
      d: [m, m - k, a * b * c + k, 2 * m + k],
      x: expl('MMC + resto', `Se sobra ${k} em todas as divisões, o número menos ${k} é múltiplo de ${a}, ${b} e ${c} ao mesmo tempo.`, `MMC(${a}, ${b}, ${c}) = ${m}; o número é ${m} + ${k} = ${m + k}.`),
    };
  },
  // 4. resto de potência
  (r) => {
    const [b, m, ciclo] = r.pick([[2, 7, [2, 4, 1]], [3, 7, [3, 2, 6, 4, 5, 1]], [2, 5, [2, 4, 3, 1]], [3, 5, [3, 4, 2, 1]], [4, 7, [4, 2, 1]]]);
    const n = r.int(50, 300);
    const res = ciclo[(n - 1) % ciclo.length];
    return {
      e: `Qual é o resto da divisão de ${b}${sup(n)} por ${m}?`,
      r: res,
      d: [...new Set([...ciclo, 0, m - 1])].filter((v) => v !== res).slice(0, 4),
      x: expl('ciclo dos restos', `Os restos de ${b}¹, ${b}², ${b}³... por ${m} se repetem: ${ciclo.join(', ')} (ciclo de ${ciclo.length}).`, `${n} = ${ciclo.length} × ${Math.floor((n - 1) / ciclo.length)} + ${((n - 1) % ciclo.length) + 1}: é o ${((n - 1) % ciclo.length) + 1}º termo do ciclo, ou seja, resto ${res}.`),
    };
  },
  // 5. base 5 para decimal
  (r) => {
    const base = r.pick([3, 4, 5, 6, 8]);
    const n = r.int(base * base, base ** 3 - 1);
    const s = n.toString(base);
    return {
      e: `O número ${s}, escrito na base ${base}, corresponde a qual número na base 10?`,
      r: n,
      d: [+s, n + base, n - 1, s.split('').reduce((t, c) => t + +c, 0) * base],
      x: expl('valor posicional em outra base', `Na base ${base}, as posições valem 1, ${base}, ${base * base}, ...`, `${s.split('').map((c, i) => `${c}·${base ** (s.length - 1 - i)}`).join(' + ')} = ${n}.`),
    };
  },
  // 6. zeros no final do fatorial
  (r) => {
    const n = r.pick([30, 40, 50, 60, 75, 80]);
    const z = Math.floor(n / 5) + Math.floor(n / 25);
    return {
      e: `Com quantos zeros termina o número ${n}! (fatorial de ${n})?`,
      r: z,
      d: [Math.floor(n / 5), Math.floor(n / 10), z + 1, Math.floor(n / 2)],
      x: expl('contar fatores 5', 'Cada zero no final vem de um 10 = 2 · 5. Há muito mais fatores 2 do que 5, então basta contar os fatores 5.', `Múltiplos de 5 até ${n}: ${Math.floor(n / 5)}; múltiplos de 25 dão um 5 extra: ${Math.floor(n / 25)}. Total: ${z}.`),
    };
  },
  // 7. divisibilidade por 11
  (r) => {
    const a = r.int(1, 9), b = r.int(0, 9), c = r.int(0, 9);
    // número a b ? c : soma alternada (a − b + x − c) ≡ 0 mod 11, posições da esquerda
    const x = ((((c + b - a) % 11) + 11) % 11);
    if (x > 9) return medio[6](r);
    return {
      e: `Qual algarismo deve substituir o ? para que o número ${a}${b}?${c} seja divisível por 11?`,
      r: x,
      d: [(x + 1) % 10, (x + 2) % 10, (x + 5) % 10, (x + 9) % 10],
      x: expl('soma alternada', 'Um número é divisível por 11 quando a soma alternada dos algarismos (+, −, +, −...) é múltipla de 11.', `${a} − ${b} + ? − ${c} precisa ser múltiplo de 11 ⇒ ? = ${x}: ${a}${b}${x}${c} = 11 × ${(a * 1000 + b * 100 + x * 10 + c) / 11}.`),
    };
  },
  // 8. divisíveis por 2 ou 3
  (r) => {
    const [p, q] = r.pick([[2, 3], [2, 5], [3, 5], [3, 4], [4, 6]]);
    const n = r.pick([100, 120, 150, 200, 300]);
    const t = Math.floor(n / p) + Math.floor(n / q) - Math.floor(n / mmc(p, q));
    return {
      e: `Quantos números de 1 a ${n} são divisíveis por ${p} ou por ${q}?`,
      r: t,
      d: [Math.floor(n / p) + Math.floor(n / q), Math.floor(n / mmc(p, q)), n - t, t + 1],
      x: expl('princípio da inclusão e exclusão', `Some os múltiplos de ${p} e de ${q}, mas desconte os múltiplos de ${mmc(p, q)}, que foram contados duas vezes.`, `${Math.floor(n / p)} + ${Math.floor(n / q)} − ${Math.floor(n / mmc(p, q))} = ${t}.`),
    };
  },
  // 9. maior fator primo
  (r) => {
    const n = r.pick([2310, 1001, 3003, 1155, 4199, 935]);
    const f = fatorar(n).map(([p]) => p);
    const maior = Math.max(...f);
    return {
      e: `Qual é o maior fator primo de ${num(n)}?`,
      r: maior,
      d: [...f.filter((p) => p !== maior), maior + 2, Math.min(...f) + 1, 19, 23].filter((v) => v !== maior),
      x: expl('fatoração', 'Teste os primos em ordem e vá dividindo.', `${num(n)} = ${f.join(' · ')}.`),
    };
  },
  // 10. resto do produto
  (r) => {
    const m = r.pick([5, 6, 7, 9]), a = r.int(1, m - 1), b = r.int(1, m - 1);
    return {
      e: `Dividindo o número A por ${m}, o resto é ${a}; dividindo B por ${m}, o resto é ${b}. Qual é o resto da divisão de A · B por ${m}?`,
      r: (a * b) % m,
      d: [a * b, (a + b) % m, a + b, Math.abs(a - b)].map((v) => v),
      x: expl('aritmética dos restos', `Escreva A = ${m}q + ${a} e B = ${m}p + ${b}. No produto, todo termo com ${m} é múltiplo de ${m}; só sobra ${a} · ${b}.`, `${a} · ${b} = ${a * b} deixa resto ${(a * b) % m} por ${m}.`),
    };
  },
  // 11. sacolas com MDC
  (r) => {
    const g = r.pick([6, 8, 12, 14]);
    const p = r.int(5, 9), q = r.int(7, 12);
    if (mdc(p, q) !== 1) return medio[10](r);
    return {
      e: `Um mercado tem ${g * p} laranjas e ${g * q} maçãs para montar sacolas iguais, com o maior número de sacolas possível e sem sobrar fruta. Quantas frutas haverá em cada sacola?`,
      r: p + q,
      d: [g, g * 2, p * q, p + q + 2],
      x: expl('MDC', 'O número de sacolas deve dividir as duas quantidades e ser o maior possível: é o MDC.', `MDC(${g * p}, ${g * q}) = ${g} sacolas, cada uma com ${p} laranjas e ${q} maçãs: ${p + q} frutas.`),
    };
  },
  // 12. menor quadrado com placas
  (r) => {
    const [a, b] = r.pick([[12, 18], [20, 30], [15, 25], [16, 24], [10, 25]]);
    const m = mmc(a, b);
    const qt = (m / a) * (m / b);
    return {
      e: `Placas retangulares de ${a} cm × ${b} cm, todas na mesma posição, serão juntadas para formar o menor quadrado possível. Quantas placas serão usadas?`,
      r: qt,
      d: [m / a + m / b, qt * 2, m, (a * b) / mdc(a, b)],
      x: expl('MMC', `O lado do quadrado precisa ser múltiplo de ${a} e de ${b} ao mesmo tempo, o menor possível.`, `Lado = MMC(${a}, ${b}) = ${m} cm: cabem ${m / a} × ${m / b} = ${qt} placas.`),
    };
  },
  // 13. soma dos divisores próprios
  (r) => {
    const n = r.pick([28, 12, 18, 20, 30, 24]);
    let s = 0;
    for (let k = 1; k < n; k++) if (n % k === 0) s += k;
    return {
      e: `Qual é a soma dos divisores positivos de ${n} que são menores que ${n}?`,
      r: s,
      d: [s + n, s - 1, nDiv(n), s + 2],
      x: expl('listar os divisores', 'Liste em pares e some; os divisores menores que o número são chamados de divisores próprios.', `Divisores próprios de ${n}: ${(() => { const d = []; for (let k = 1; k < n; k++) if (n % k === 0) d.push(k); return d.join(' + '); })()} = ${s}.${s === n ? ' Como a soma é o próprio número, 28 é um número perfeito.' : ''}`),
    };
  },
  // 14. dia da semana do ano seguinte
  (r) => {
    const [ano, dia, bis] = r.pick([[2025, 3, false], [2026, 4, false], [2027, 5, false], [2023, 0, false], [2024, 1, true]]);
    const prox = (dia + (bis ? 366 : 365)) % 7;
    return {
      e: `O dia 1º de janeiro de ${ano} caiu num(a) ${DIAS[dia]}. ${bis ? `Sabendo que ${ano} foi um ano bissexto (366 dias)` : `Sabendo que ${ano} tem 365 dias`}, em que dia da semana cai 1º de janeiro de ${ano + 1}?`,
      r: DIAS[prox],
      d: [DIAS[dia], DIAS[(prox + 1) % 7], DIAS[(prox + 6) % 7], DIAS[(prox + 3) % 7]],
      x: expl('resto por 7', `${bis ? 366 : 365} = 7 × 52 + ${bis ? 2 : 1}: o ano tem 52 semanas completas e mais ${bis ? 2 : 1} dia${bis ? 's' : ''}.`, `${DIAS[dia]} + ${bis ? 2 : 1} = ${DIAS[prox]}.`),
    };
  },
  // 15. engrenagens
  (r) => {
    const [a, b] = r.pick([[12, 18], [15, 25], [16, 24], [20, 36], [14, 21]]);
    const m = mmc(a, b);
    return {
      e: `Duas engrenagens encaixadas têm ${a} e ${b} dentes. Marcam-se os dentes que estão se tocando. Quantas voltas a engrenagem menor dá até essas marcas se tocarem de novo pela primeira vez?`,
      r: m / a,
      d: [m / b, b / mdc(a, b) + 1, m, a / mdc(a, b)],
      x: expl('MMC dos dentes', 'As marcas voltam a se encontrar quando passa o mesmo número de dentes nas duas engrenagens, e esse número precisa ser múltiplo de ambas.', `MMC(${a}, ${b}) = ${m} dentes, que são ${m} ÷ ${a} = ${m / a} voltas da menor.`),
    };
  },
  // 16. quadrado de ímpar por 4 ou 8
  (r) => {
    const m = r.pick([4, 8]);
    const n = 2 * r.int(10, 60) + 1;
    return {
      e: `Seja n um número inteiro ímpar qualquer (por exemplo, ${n}). Qual é o resto da divisão de n² por ${m}?`,
      r: 1,
      d: [0, 2, 3, m - 1 === 3 ? 5 : m - 1],
      x: expl('escrever o ímpar como 2k + 1', `n = 2k + 1 ⇒ n² = 4k² + 4k + 1 = 4k(k + 1) + 1. ${m === 8 ? 'Como k(k + 1) é sempre par, 4k(k + 1) é múltiplo de 8.' : '4k(k + 1) é múltiplo de 4.'}`, `Sobra sempre 1. Exemplo: ${n}² = ${num(n * n)} = ${m} × ${num((n * n - 1) / m)} + 1.`),
    };
  },
  // 17. completar para quadrado perfeito
  (r) => {
    const n = r.pick([72, 50, 18, 98, 108, 45, 300, 12]);
    let k = 1;
    for (const [p, e] of fatorar(n)) if (e % 2) k *= p;
    return {
      e: `Qual é o menor número inteiro positivo k para que ${n}k seja um quadrado perfeito?`,
      r: k,
      d: [k * 2 === n ? k + 1 : k * 2, n, k + 1, k * 4],
      x: expl('expoentes pares', 'Um quadrado perfeito tem todos os expoentes pares na fatoração. Falta multiplicar pelos primos de expoente ímpar.', `${n} = ${fatTxt(n)}; multiplicando por ${k}, todos os expoentes ficam pares: ${n * k} = ${Math.sqrt(n * k)}².`),
    };
  },
];

const dificil = [
  // 1. resto de 2^n por 9
  (r) => {
    const n = r.int(100, 2025);
    const ciclo = [2, 4, 8, 7, 5, 1];
    const res = ciclo[(n - 1) % 6];
    return {
      e: `Qual é o resto da divisão de 2${sup(n)} por 9?`,
      r: res,
      d: ciclo.filter((c) => c !== res).slice(0, 4),
      x: expl('ciclo dos restos', 'Os restos de 2¹, 2², 2³, ... por 9 são 2, 4, 8, 7, 5, 1 e se repetem de 6 em 6 (pois 2⁶ = 64 deixa resto 1).', `${n} = 6 × ${Math.floor(n / 6)} + ${n % 6}, então o resto é ${res}.`),
    };
  },
  // 2. divisores ímpares
  (r) => {
    const n = r.pick([720, 360, 1440, 2520, 1080]);
    const impar = n / 2 ** fatorar(n)[0][1];
    return {
      e: `Quantos divisores positivos ímpares tem o número ${num(n)}?`,
      r: nDiv(impar),
      d: [nDiv(n), nDiv(n) - nDiv(impar), nDiv(impar) + 1, nDiv(impar) * 2],
      x: expl('ignorar o fator 2', `Divisor ímpar não pode ter o fator 2. ${num(n)} = ${fatTxt(n)}; a parte ímpar é ${impar} = ${fatTxt(impar)}.`, `Divisores de ${impar}: ${fatorar(impar).map(([, e]) => `(${e} + 1)`).join('')} = ${nDiv(impar)}.`),
    };
  },
  // 3. restos chineses
  (r) => {
    const [a, b, c] = r.pick([[2, 3, 2], [1, 2, 3], [2, 1, 4], [1, 4, 6], [2, 4, 1]]);
    let n = 1;
    while (!(n % 3 === a && n % 5 === b && n % 7 === c)) n++;
    return {
      e: `Qual é o menor número inteiro positivo que deixa resto ${a} na divisão por 3, resto ${b} na divisão por 5 e resto ${c} na divisão por 7?`,
      r: n,
      d: [n + 105, n + 15, n + 35, n + 21].map((v) => v % 105 === n ? v : v),
      x: expl('procurar entre os candidatos', `Liste os números que deixam resto ${c} por 7 (${c}, ${c + 7}, ${c + 14}, ...) e teste as outras condições. A resposta se repete a cada 3 · 5 · 7 = 105.`, `${n} = 3 × ${Math.floor(n / 3)} + ${a} = 5 × ${Math.floor(n / 5)} + ${b} = 7 × ${Math.floor(n / 7)} + ${c}.`),
    };
  },
  // 4. MDC e MMC pela fatoração
  (r) => {
    const a = 2 ** 3 * 3 ** 2 * 7, b = 2 ** 2 * 3 ** 3 * 5;
    const e1 = r.pick([[a, b], [2 ** 4 * 3 * 5 ** 2, 2 ** 2 * 3 ** 2 * 5], [2 * 3 ** 3 * 7, 2 ** 3 * 3 * 7 ** 2]]);
    const [x, y] = e1;
    const g = mdc(x, y), m = mmc(x, y);
    const pedeMdc = r.pick([true, false]);
    return {
      e: `Sendo A = ${fatTxt(x)} e B = ${fatTxt(y)}, qual é o ${pedeMdc ? 'MDC' : 'MMC'} de A e B?`,
      r: pedeMdc ? fatTxt(g) : fatTxt(m),
      d: [pedeMdc ? fatTxt(m) : fatTxt(g), fatTxt(x * y), fatTxt(pedeMdc ? g * 2 : m * 2), fatTxt(pedeMdc ? g * 3 : m * 3)],
      x: expl(pedeMdc ? 'MDC: primos comuns, menores expoentes' : 'MMC: todos os primos, maiores expoentes', pedeMdc ? 'O MDC usa só os primos que aparecem nos dois números, cada um com o menor expoente.' : 'O MMC usa todos os primos que aparecem, cada um com o maior expoente.', `${pedeMdc ? 'MDC' : 'MMC'} = ${fatTxt(pedeMdc ? g : m)} = ${num(pedeMdc ? g : m)}.`),
    };
  },
  // 5. zeros de 100!
  (r) => {
    const n = r.pick([100, 125, 150, 200, 250]);
    const z = Math.floor(n / 5) + Math.floor(n / 25) + Math.floor(n / 125);
    return {
      e: `Com quantos zeros termina o número ${n}!?`,
      r: z,
      d: [Math.floor(n / 5), Math.floor(n / 5) + Math.floor(n / 25) === z ? z + 1 : Math.floor(n / 5) + Math.floor(n / 25), Math.floor(n / 10) + Math.floor(n / 100), z + 2],
      x: expl('contar os fatores 5 (fórmula de Legendre)', `Some ${n}/5, ${n}/25 e ${n}/125 (partes inteiras): múltiplos de 25 dão dois fatores 5, e de 125 dão três.`, `${Math.floor(n / 5)} + ${Math.floor(n / 25)} + ${Math.floor(n / 125)} = ${z}.`),
    };
  },
  // 6. n³ − n
  (r) => ({
    e: 'Para todo número inteiro n, o número n³ − n é sempre divisível por qual destes números?',
    r: 6,
    d: [4, 5, 9, 12],
    x: expl('fatorar e reconhecer consecutivos', 'n³ − n = n(n² − 1) = (n − 1) · n · (n + 1): é o produto de três inteiros consecutivos.', `Entre três consecutivos há um par e um múltiplo de 3, então o produto é múltiplo de 6. Com n = ${r.int(2, 4)}, por exemplo, isso se confirma (e 4, 5, 9, 12 nem sempre dividem: n = 2 dá 6).`),
  }),
  // 7. decimal para base 8
  (r) => {
    const n = r.int(500, 3000);
    const s = n.toString(8);
    return {
      e: `Como se escreve o número ${num(n)} na base 8?`,
      r: s,
      d: [(n + 1).toString(8), (n + 8).toString(8), s.split('').reverse().join('') === s ? (n + 64).toString(8) : s.split('').reverse().join(''), (n - 64).toString(8)],
      f: (v) => String(v),
      x: expl('divisões sucessivas por 8', 'Divida por 8, anote o resto, divida o quociente por 8 de novo... e leia os restos de baixo para cima.', `${num(n)} = ${s.split('').map((c, i) => `${c}·8${sup(s.length - 1 - i)}`).join(' + ')} ⇒ ${s} na base 8.`),
    };
  },
  // 8. maior número de 4 algarismos múltiplo comum
  (r) => {
    const [a, b, c] = r.pick([[12, 15, 18], [8, 12, 18], [6, 10, 14], [9, 12, 15], [10, 12, 16]]);
    const m = mmc(mmc(a, b), c);
    const v = Math.floor(9999 / m) * m;
    return {
      e: `Qual é o maior número de quatro algarismos que é divisível por ${a}, por ${b} e por ${c}?`,
      r: v,
      d: [v - m, 9999 - (9999 % (a * b)), v + m > 9999 ? v - 2 * m : v + m, Math.floor(9999 / (a * b * c)) * a * b * c || v - 3 * m],
      f: (x) => String(x),
      x: expl('múltiplos do MMC', `Ser divisível pelos três é ser múltiplo de MMC(${a}, ${b}, ${c}) = ${m}.`, `9999 = ${m} × ${Math.floor(9999 / m)} + ${9999 % m}; o maior múltiplo é ${m} × ${Math.floor(9999 / m)} = ${v}.`),
    };
  },
  // 9. resto da soma 1 + ... + n
  (r) => {
    const n = r.pick([100, 50, 200, 99, 150]), m = r.pick([7, 9, 11]);
    const s = (n * (n + 1)) / 2;
    return {
      e: `Qual é o resto da divisão de 1 + 2 + 3 + ··· + ${n} por ${m}?`,
      r: s % m,
      d: [(s % m + 1) % m, (s % m + 2) % m, n % m, (s % m + m - 1) % m],
      x: expl('soma de Gauss + resto', `A soma de 1 até n é n(n + 1)/2.`, `${n} · ${n + 1} / 2 = ${num(s)} = ${m} × ${num(Math.floor(s / m))} + ${s % m}.`),
    };
  },
  // 10. divisores de 10^n múltiplos de 100
  (r) => {
    const n = r.int(4, 8), k = r.pick([2, 3]);
    const t = (n - k + 1) ** 2;
    return {
      e: `Quantos divisores positivos de 10${sup(n)} são múltiplos de ${10 ** k}?`,
      r: t,
      d: [(n + 1) ** 2, (n - k) ** 2, (n + 1) ** 2 - t, n - k + 1],
      x: expl('expoentes possíveis', `10${sup(n)} = 2${sup(n)} · 5${sup(n)}. Ser múltiplo de ${10 ** k} = 2${sup(k)} · 5${sup(k)} exige expoentes de ${k} a ${n} em cada primo.`, `${n - k + 1} escolhas para o 2 e ${n - k + 1} para o 5: ${t} divisores.`),
    };
  },
  // 11. número formado só por algarismos 1
  (r) => {
    const n = r.int(100, 2025);
    return {
      e: `Considere o número formado por ${num(n)} algarismos iguais a 1 (111...1). Qual é o resto da divisão desse número por 9?`,
      r: n % 9,
      d: [(n % 9 + 1) % 9, (n % 9 + 3) % 9, (n % 9 + 5) % 9, (n % 9 + 7) % 9],
      x: expl('resto por 9 = resto da soma dos algarismos', 'Todo número deixa, na divisão por 9, o mesmo resto que a soma dos seus algarismos.', `A soma dos algarismos é ${num(n)}, que deixa resto ${n % 9} por 9.`),
    };
  },
  // 12. soma dos divisores pela fórmula
  (r) => {
    const n = r.pick([48, 72, 36, 60, 100, 96]);
    const f = fatorar(n);
    const sigma = f.reduce((s, [p, e]) => s * ((p ** (e + 1) - 1) / (p - 1)), 1);
    return {
      e: `Qual é a soma de todos os divisores positivos de ${n}?`,
      r: sigma,
      d: [sigma - n, nDiv(n) * 10, sigma + 1, f.reduce((s, [p, e]) => s + p * e, 0) * 10],
      x: expl('fórmula da soma dos divisores', `Fatore: ${n} = ${fatTxt(n)}. A soma dos divisores é o produto das somas das potências de cada primo.`, f.map(([p, e]) => `(${Array.from({ length: e + 1 }, (_, i) => p ** i).join(' + ')})`).join(' · ') + ` = ${sigma}.`),
    };
  },
  // 13. soma dos fatores primos de um semiprimo
  (r) => {
    const [p, q] = r.pick([[13, 17], [11, 19], [17, 19], [13, 23], [7, 31], [11, 23]]);
    return {
      e: `O número ${p * q} não é primo. Qual é a soma dos seus fatores primos?`,
      r: p + q,
      d: [p * q - 1, p + q + 2, q - p, p + q - 4],
      x: expl('testar primos até a raiz', `√${p * q} ≈ ${Math.floor(Math.sqrt(p * q))}: basta testar 2, 3, 5, 7, 11, 13...`, `${p * q} = ${p} · ${q}; soma ${p + q}.`),
    };
  },
  // 14. descobrir a base
  (r) => {
    const b = r.int(4, 9);
    return {
      e: `Em certa base b, o número 121 representa o número ${(b + 1) ** 2} do sistema decimal. Qual é o valor de b?`,
      r: b,
      d: [b + 1, b - 1, (b + 1) ** 2 - 121 > 0 ? b + 2 : 10, 2 * b],
      x: expl('valor posicional em base b', '121 na base b vale 1·b² + 2·b + 1 = (b + 1)².', `(b + 1)² = ${(b + 1) ** 2} ⇒ b + 1 = ${b + 1} ⇒ b = ${b}.`),
    };
  },
  // 15. ovos em caixas
  (r) => {
    const [a, b, c] = r.pick([[6, 8, 10], [4, 6, 10], [6, 9, 12], [5, 8, 10], [4, 5, 6]]);
    const m = mmc(mmc(a, b), c), sobra = r.int(1, Math.min(a, b, c) - 1);
    const lo = r.pick([100, 150, 200]);
    let n = sobra;
    while (n <= lo) n += m;
    if (n >= lo + m) return dificil[14](r);
    return {
      e: `Um granjeiro tem entre ${lo} e ${lo + m} ovos. Se arrumá-los em caixas de ${a}, de ${b} ou de ${c}, sempre sobram ${sobra} ovos. Quantos ovos ele tem?`,
      r: n,
      d: [n - sobra, n + m, n - m > 0 ? n + 2 : n + 4, n + sobra],
      x: expl('MMC + sobra', `Tirando os ${sobra} que sobram, o total vira múltiplo de MMC(${a}, ${b}, ${c}) = ${m}.`, `Múltiplos de ${m} mais ${sobra}: o único entre ${lo} e ${lo + m} é ${n}.`),
    };
  },
  // 16. quantos primos num intervalo
  (r) => {
    const a = r.pick([50, 60, 70, 80, 90]);
    const b = a + 20;
    const ps = [];
    for (let k = a; k <= b; k++) if (ehPrimo(k)) ps.push(k);
    return {
      e: `Quantos números primos existem entre ${a} e ${b}?`,
      r: ps.length,
      d: [ps.length + 1, ps.length - 1, ps.length + 2, 10],
      x: expl('eliminar múltiplos de 2, 3, 5 e 7', `Como √${b} < 11, basta descartar pares, múltiplos de 3, de 5 e de 7.`, `Sobram ${ps.join(', ')}: ${ps.length} primos.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '20-divisibilidade-primos-mdc-e-mmc',
    titulo: 'Divisibilidade, números primos, MDC e MMC',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Critérios de divisibilidade, fatoração em primos, número de divisores, MDC, MMC, restos, calendário e sistemas de numeração.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
