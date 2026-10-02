// Matemática: números e operações, porcentagem, razão e proporção, equações, funções, exponencial e log.
import { arred, fracao, mdc, mmc, nome, num, pct, reais } from './util.mjs';

const PROVAS_TODAS = ['ENEM', 'Militares', 'Concursos'];
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
export const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');
const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

// ---------------------------------------------------------------- Números e operações
const numeros = {
  disciplina: 'matematica',
  arquivo: '01-numeros-e-operacoes',
  titulo: 'Números e operações',
  provas: PROVAS_TODAS,
  descricao: 'Frações, MMC e MDC, potências, notação científica, divisibilidade e dízimas.',
  niveis: [
    [
      (r) => {
        const b = r.pick([2, 3, 4, 5, 6]), d = r.pick([3, 4, 5, 6, 8]);
        const a = r.int(1, b - 1), c = r.int(1, d - 1);
        return {
          e: `Qual é o resultado de ${a}/${b} + ${c}/${d}?`,
          r: fracao(a * d + c * b, b * d),
          d: [fracao(a + c, b + d), fracao(a + c, b * d), fracao(a * c, b * d), fracao(a * d + c * b + b * d, b * d), fracao(Math.abs(a * d - c * b) || 1, b * d)],
          x: `Reduzindo ao mesmo denominador (${b * d}): ${a * d}/${b * d} + ${c * b}/${b * d} = ${a * d + c * b}/${b * d} = ${fracao(a * d + c * b, b * d)}.`,
        };
      },
      (r) => {
        const a = r.pick([10, 12, 15, 18, 20, 25]), b = r.pick([8, 14, 16, 24, 30, 35]);
        if (a === b) return numeros.niveis[0][1](r);
        return {
          e: `Dois ônibus partem juntos de um terminal às 6h. Um deles sai a cada ${a} minutos e o outro a cada ${b} minutos. Depois de quantos minutos eles voltarão a sair juntos pela primeira vez?`,
          r: mmc(a, b),
          d: [a * b, mdc(a, b), a + b, mmc(a, b) * 2],
          x: `Os encontros ocorrem nos múltiplos comuns de ${a} e ${b}. O primeiro é o MMC(${a}, ${b}) = ${mmc(a, b)} minutos.`,
        };
      },
      (r) => {
        const g = r.pick([6, 8, 9, 12, 15]);
        const p = r.pick([2, 3, 4, 5]), q = r.pick([3, 5, 7]);
        if (mdc(p, q) !== 1) return numeros.niveis[0][2](r);
        const a = g * p, b = g * q;
        return {
          e: `Uma costureira tem duas fitas, uma de ${a} cm e outra de ${b} cm. Ela quer cortá-las em pedaços de mesmo tamanho, o maior possível, sem sobras. Qual deve ser o comprimento de cada pedaço?`,
          r: g,
          d: [mmc(a, b), g / 2, g * 2, a - b > 0 ? a - b : b - a],
          f: (v) => `${num(v)} cm`,
          x: `O maior tamanho que divide ${a} e ${b} ao mesmo tempo é o MDC(${a}, ${b}) = ${g} cm.`,
        };
      },
      (r) => {
        const a = r.int(2, 9), b = r.int(2, 6), c = r.int(2, 6), d = r.int(2, 5);
        const certo = a + b * c - d * d;
        return {
          e: `Qual é o valor da expressão ${a} + ${b} × ${c} − ${d}²?`,
          r: certo,
          d: [(a + b) * c - d * d, a + b * c - 2 * d, (a + b) * c - 2 * d, a + b * c + d * d],
          x: `Primeiro potências, depois multiplicações, depois somas e subtrações: ${d}² = ${d * d}; ${b} × ${c} = ${b * c}; ${a} + ${b * c} − ${d * d} = ${certo}.`,
        };
      },
      (r) => {
        const m = r.pick([1.5, 2.4, 3.2, 4.7, 5.6, 6.8, 7.3, 8.1, 9.5]);
        const e = -r.int(3, 7);
        const valor = (m * 10 ** e).toFixed(-e + 1).replace('.', ',');
        const f = (k) => `${num(m)} × 10${sup(k)}`;
        return {
          e: `O diâmetro de uma célula é de aproximadamente ${valor} metro. Em notação científica, esse valor é:`,
          r: f(e),
          d: [f(e + 1), f(e - 1), f(-e), f(-e - 1)],
          x: `Deslocamos a vírgula ${-e} casas para a direita até obter ${num(m)} (entre 1 e 10), então o expoente é ${e}.`,
        };
      },
    ],
    [
      (r) => {
        const [a, b] = r.pick([[1, 3], [1, 4], [2, 5], [1, 5], [3, 10]]);
        const [c, d] = r.pick([[1, 4], [1, 2], [1, 3], [2, 5]]);
        const resto = (1 - a / b) * (1 - c / d);
        let s = r.int(10, 40) * 100;
        const lcm = mmc(b, d);
        s = Math.round(s / lcm) * lcm || lcm * 100;
        const sobra = arred(s * resto, 2);
        return {
          e: `${nome(r)} gastou ${a}/${b} do salário com aluguel e ${c}/${d} do que restou com alimentação. Sobraram ${reais(sobra)}. Qual é o salário?`,
          r: s,
          d: [arred(sobra / (1 - a / b - c / d), 2), sobra * 2, arred(sobra / (1 - c / d), 2), arred(sobra / (1 - a / b), 2)],
          f: reais,
          x: `Depois do aluguel resta ${b - a}/${b} do salário; depois da alimentação resta ${d - c}/${d} disso, ou seja, ${fracao((b - a) * (d - c), b * d)} do salário. Logo, salário = ${reais(sobra)} ÷ ${fracao((b - a) * (d - c), b * d)} = ${reais(s)}.`,
        };
      },
      (r) => {
        const hoje = r.int(0, 6), n = r.int(30, 400);
        const alvo = (hoje + n) % 7;
        const outros = r.shuffle(DIAS.filter((_, i) => i !== alvo));
        return {
          e: `Hoje é ${DIAS[hoje]}. Que dia da semana será daqui a ${n} dias?`,
          r: DIAS[alvo],
          d: outros,
          x: `A semana se repete a cada 7 dias: ${n} = 7 × ${Math.floor(n / 7)} + ${n % 7}. Basta avançar ${n % 7} dia(s) a partir de ${DIAS[hoje]}: ${DIAS[alvo]}.`,
        };
      },
      (r) => {
        const ab = r.pick([12, 15, 18, 21, 24, 27, 36, 45, 54, 63, 72, 81]);
        const s = String(ab);
        return {
          e: `A fração geratriz da dízima periódica 0,${s}${s}${s}... é:`,
          r: fracao(ab, 99),
          d: [fracao(ab, 100), fracao(ab, 90), fracao(ab, 9), fracao(ab + 1, 99), fracao(ab, 999)],
          x: `Em uma dízima simples com período de 2 algarismos, a geratriz é o período sobre 99: ${ab}/99 = ${fracao(ab, 99)}.`,
        };
      },
      (r) => {
        const a = r.int(1, 5), b = r.int(1, 4), c = r.int(0, 3);
        const n = 2 ** a * 3 ** b * 5 ** c;
        const certo = (a + 1) * (b + 1) * (c + 1);
        return {
          e: `Quantos divisores positivos tem o número ${num(n).replace(/\./g, '')} = 2${sup(a)} · 3${sup(b)}${c ? ' · 5' + sup(c) : ''}?`,
          r: certo,
          d: [a * b * Math.max(c, 1), a + b + c, a + b + c + 3, certo - 1, certo * 2],
          x: `Somamos 1 a cada expoente e multiplicamos: (${a}+1)(${b}+1)${c ? `(${c}+1)` : ''} = ${certo}.`,
        };
      },
      (r) => {
        const m = r.int(2, 9), n = r.int(1, 5), k = r.int(1, 4);
        const exp = m + 2 * n - 3 * k;
        const f = (x) => `2${sup(x)}`;
        return {
          e: `Simplificando a expressão (2${sup(m)} · 4${sup(n)}) ÷ 8${sup(k)}, obtemos:`,
          r: f(exp),
          d: [f(m + n - k), f(m * 2 * n - 3 * k), f(exp + 1), f(exp - 1), f(m + 2 * n + 3 * k)],
          x: `Escrevendo tudo na base 2: 4${sup(n)} = 2${sup(2 * n)} e 8${sup(k)} = 2${sup(3 * k)}. Então 2${sup(m)}·2${sup(2 * n)} ÷ 2${sup(3 * k)} = 2${sup(m + 2 * n - 3 * k)}.`,
        };
      },
    ],
    [
      (r) => {
        const base = r.pick([2, 3, 7, 8]);
        const n = r.int(20, 2030);
        const ciclo = [];
        let v = base % 10;
        do {
          ciclo.push(v);
          v = (v * base) % 10;
        } while (v !== ciclo[0]);
        const certo = ciclo[(n - 1) % ciclo.length];
        return {
          e: `Qual é o algarismo das unidades de ${base}${sup(n)}?`,
          r: certo,
          d: [...ciclo.filter((x) => x !== certo), 0, 5, 1, 9].slice(0, 4),
          x: `Os últimos algarismos das potências de ${base} se repetem no ciclo (${ciclo.join(', ')}), de período ${ciclo.length}. Como ${n} deixa resto ${n % ciclo.length || ciclo.length} na divisão por ${ciclo.length} (contando de 1 a ${ciclo.length}), o algarismo é ${certo}.`,
        };
      },
      (r) => {
        const [a, b] = r.pick([[2, 3], [3, 5], [4, 6], [2, 5], [3, 4], [6, 9], [4, 10]]);
        const n = r.int(10, 50) * 10;
        const m = mmc(a, b);
        const certo = Math.floor(n / a) + Math.floor(n / b) - Math.floor(n / m);
        return {
          e: `Quantos números inteiros de 1 a ${n} são múltiplos de ${a} ou de ${b}?`,
          r: certo,
          d: [Math.floor(n / a) + Math.floor(n / b), Math.floor(n / m), Math.floor(n / a) + Math.floor(n / b) - 2 * Math.floor(n / m), n - certo],
          x: `Múltiplos de ${a}: ${Math.floor(n / a)}; de ${b}: ${Math.floor(n / b)}; de ambos (múltiplos de ${m}): ${Math.floor(n / m)}. Pelo princípio da inclusão-exclusão: ${Math.floor(n / a)} + ${Math.floor(n / b)} − ${Math.floor(n / m)} = ${certo}.`,
        };
      },
      (r) => {
        const n = r.int(30, 500);
        const ciclo = [2, 4, 1];
        const certo = ciclo[(n - 1) % 3];
        return {
          e: `Qual é o resto da divisão de 2${sup(n)} por 7?`,
          r: certo,
          d: [0, 3, 5, 6, 2, 4, 1].filter((x) => x !== certo),
          x: `Os restos de 2¹, 2², 2³ por 7 são 2, 4, 1 e depois se repetem (período 3). Como ${n} = 3 × ${Math.floor(n / 3)} + ${n % 3}, o resto é ${certo}.`,
        };
      },
      (r) => {
        const [a, b, c] = r.pick([[12, 18, 30], [15, 20, 25], [8, 12, 20], [10, 15, 24], [6, 14, 21], [9, 12, 15]]);
        const m = mmc(mmc(a, b), c);
        return {
          e: `Três luzes de um painel piscam, respectivamente, a cada ${a}, ${b} e ${c} segundos. Se elas piscaram juntas agora, daqui a quanto tempo piscarão juntas novamente?`,
          r: m,
          d: [a * b * c, mmc(a, b), mdc(mdc(a, b), c), a + b + c, m * 2],
          f: (v) => (v >= 60 ? `${Math.floor(v / 60)} min${v % 60 ? ` ${v % 60} s` : ''}` : `${v} s`),
          x: `O próximo encontro é o MMC(${a}, ${b}, ${c}) = ${m} segundos.`,
        };
      },
      (r) => {
        const a = r.pick([3, 4, 6, 7]), b = r.pick([2, 3, 5]) * a;
        const n = r.int(10, 40) * 10;
        const certo = Math.floor(n / a) - Math.floor(n / b);
        return {
          e: `Quantos números inteiros de 1 a ${n} são divisíveis por ${a}, mas não são divisíveis por ${b}?`,
          r: certo,
          d: [Math.floor(n / a), Math.floor(n / b), Math.floor(n / a) + Math.floor(n / b), certo + 1],
          x: `Todo múltiplo de ${b} também é múltiplo de ${a}. Múltiplos de ${a}: ${Math.floor(n / a)}; desses, ${Math.floor(n / b)} são múltiplos de ${b}. Resposta: ${Math.floor(n / a)} − ${Math.floor(n / b)} = ${certo}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Porcentagem
const porcentagem = {
  disciplina: 'matematica',
  arquivo: '02-porcentagem',
  titulo: 'Porcentagem',
  provas: PROVAS_TODAS,
  descricao: 'Cálculo de porcentagens, aumentos e descontos, variações sucessivas e lucro.',
  niveis: [
    [
      (r) => {
        const x = r.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75]);
        const v = r.int(4, 60) * 20;
        return {
          e: `Quanto é ${x}% de ${num(v)}?`,
          r: (x * v) / 100,
          d: [(x * v) / 10, v / x, v - (x * v) / 100, (x * v) / 1000],
          x: `${x}% de ${num(v)} = ${x}/100 × ${num(v)} = ${num((x * v) / 100)}.`,
        };
      },
      (r) => {
        const x = r.pick([10, 15, 20, 25, 30, 40]);
        const p = r.int(5, 60) * 10;
        const desc = (p * x) / 100;
        return {
          e: `Uma loja oferece ${x}% de desconto em um produto que custa ${reais(p)}. Qual é o preço com desconto?`,
          r: p - desc,
          d: [desc, p + desc, p - x, p * (1 - x / 1000)],
          f: reais,
          x: `Desconto = ${x}% de ${reais(p)} = ${reais(desc)}. Preço final = ${reais(p)} − ${reais(desc)} = ${reais(p - desc)}. (Ou: ${num(1 - x / 100)} × ${reais(p)}.)`,
        };
      },
      (r) => {
        const x = r.pick([5, 8, 10, 12, 15, 20]);
        const s = r.int(10, 50) * 100;
        return {
          e: `O salário de ${nome(r)}, de ${reais(s)}, teve um reajuste de ${x}%. Qual é o novo salário?`,
          r: s * (1 + x / 100),
          d: [s * (x / 100), s + x, s * (1 - x / 100), s * (1 + x / 10)],
          f: reais,
          x: `Novo salário = ${reais(s)} × ${num(1 + x / 100)} = ${reais(s * (1 + x / 100))}.`,
        };
      },
      (r) => {
        const n = r.pick([20, 25, 40, 50]);
        const k = r.int(1, n - 1);
        if (((k * 100) / n) % 1 !== 0) return porcentagem.niveis[0][3](r);
        return {
          e: `Em uma turma de ${n} alunos, ${k} foram aprovados direto. Que porcentagem da turma foi aprovada direto?`,
          r: (k * 100) / n,
          d: [k, 100 - (k * 100) / n, (n * 100) / k > 100 ? k * 2 : (n * 100) / k, (k * 100) / n / 10],
          f: (v) => pct(v),
          x: `${k}/${n} = ${num(k / n)} = ${num((k * 100) / n)}%.`,
        };
      },
      (r) => {
        const v = r.int(2, 9) * 100;
        const parte = r.pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.75]) * v;
        return {
          e: `Um reservatório de ${num(v)} litros está com ${num(parte)} litros. Que porcentagem da capacidade está ocupada?`,
          r: (parte / v) * 100,
          d: [parte / 10, 100 - (parte / v) * 100, (parte / v) * 10, (v / parte) * 10],
          f: (x) => pct(x),
          x: `${num(parte)} ÷ ${num(v)} = ${num(parte / v)} = ${num((parte / v) * 100)}%.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.pick([10, 20, 30, 40, 50]), b = r.pick([10, 20, 25, 50]);
        const tot = ((1 + a / 100) * (1 + b / 100) - 1) * 100;
        return {
          e: `Um produto sofreu dois aumentos sucessivos: um de ${a}% e, depois, outro de ${b}%. O aumento total foi de:`,
          r: tot,
          d: [a + b, (a * b) / 100, tot + 5, a + b - (a * b) / 100],
          f: (v) => pct(v),
          x: `Multiplicamos os fatores: ${num(1 + a / 100)} × ${num(1 + b / 100)} = ${num(1 + tot / 100)}, ou seja, aumento de ${num(tot)}% (e não ${a + b}%).`,
        };
      },
      (r) => {
        const x = r.pick([10, 20, 30, 40, 50]);
        const perda = (x * x) / 100;
        const f = (v) => (v === 0 ? 'O preço volta ao valor inicial' : v > 0 ? `Aumento de ${pct(v)}` : `Redução de ${pct(-v)}`);
        return {
          e: `O preço de um produto aumentou ${x}% em um mês e, no mês seguinte, diminuiu ${x}%. Em relação ao preço inicial, o preço final apresenta:`,
          r: -perda,
          d: [0, perda, -x, -2 * perda],
          f,
          x: `Fator final: ${num(1 + x / 100)} × ${num(1 - x / 100)} = ${num(1 - perda / 100)}. Logo, há uma redução de ${num(perda)}%.`,
        };
      },
      (r) => {
        const x = r.pick([10, 20, 25, 40, 50]);
        const orig = r.int(4, 40) * 20;
        const v = orig * (1 - x / 100);
        return {
          e: `Após um desconto de ${x}%, um produto passou a custar ${reais(v)}. Qual era o preço original?`,
          r: orig,
          d: [v * (1 + x / 100), v + x, v / (x / 100), orig * 1.1],
          f: reais,
          x: `Preço com desconto = ${num(1 - x / 100)} × original. Logo, original = ${reais(v)} ÷ ${num(1 - x / 100)} = ${reais(orig)}.`,
        };
      },
      (r) => {
        const a = r.int(4, 40) * 25;
        const varp = r.pick([-40, -25, -20, -10, 10, 15, 20, 25, 30, 50, 60]);
        const b = a * (1 + varp / 100);
        const f = (v) => (v >= 0 ? `Aumento de ${pct(v)}` : `Queda de ${pct(-v)}`);
        return {
          e: `O número de inscritos em um concurso passou de ${num(a)} para ${num(b)}. Qual foi a variação percentual?`,
          r: varp,
          d: [-varp, (b - a) / 10, ((b - a) / b) * 100, varp / 2],
          f,
          x: `Variação = (${num(b)} − ${num(a)}) ÷ ${num(a)} = ${num(varp / 100)} = ${num(varp)}%.`,
        };
      },
      (r) => {
        const a = r.pick([40, 50, 60, 80]), b = r.pick([10, 20, 25, 30, 50]);
        return {
          e: `Em uma escola, ${a}% dos alunos são meninas, e ${b}% das meninas praticam esporte. Que porcentagem do total de alunos são meninas que praticam esporte?`,
          r: (a * b) / 100,
          d: [a + b, a - b, b, (a * b) / 10],
          f: (v) => pct(v),
          x: `${b}% de ${a}% = ${num(b / 100)} × ${num(a / 100)} = ${num((a * b) / 10000)} = ${num((a * b) / 100)}% do total.`,
        };
      },
    ],
    [
      (r) => {
        const [a, b, c] = r.pick([[10, 20, 30], [20, 10, 50], [10, 10, 10], [20, 20, 25], [50, 20, 10]]);
        const fator = (1 - a / 100) * (1 - b / 100) * (1 - c / 100);
        const desc = arred((1 - fator) * 100, 2);
        return {
          e: `Uma loja aplicou três descontos sucessivos de ${a}%, ${b}% e ${c}% sobre o preço de um produto. O desconto único equivalente é de:`,
          r: desc,
          d: [a + b + c, arred(fator * 100, 2), desc + 4, desc - 5],
          f: (v) => pct(v),
          x: `Fator final: ${num(1 - a / 100)} × ${num(1 - b / 100)} × ${num(1 - c / 100)} = ${num(fator, 3)}. O desconto equivalente é 1 − ${num(fator, 3)} = ${num(desc)}%.`,
        };
      },
      (r) => {
        const v = r.pick([20, 40, 60, 80]), c = r.pick([10, 20, 25, 30, 40]);
        const alcool = (v * c) / 100;
        const agua = r.pick([5, 10, 20, 40]);
        const nova = (alcool / (v + agua)) * 100;
        if (Math.abs(nova * 100 - Math.round(nova * 100)) > 1e-6) return porcentagem.niveis[2][1](r);
        return {
          e: `Uma mistura de ${v} litros contém ${c}% de álcool. Acrescentando ${agua} litros de água, qual passa a ser a porcentagem de álcool na mistura?`,
          r: nova,
          d: [c - agua > 0 ? c - agua : c / 2, (alcool / agua) * 100 > 100 ? c / 3 : (alcool / agua) * 100, c, (c * v) / (v - agua > 0 ? v - agua : v) ],
          f: (x) => pct(arred(x, 2)),
          x: `Álcool: ${c}% de ${v} L = ${num(alcool)} L (não muda). Novo volume: ${v + agua} L. Porcentagem: ${num(alcool)} ÷ ${v + agua} = ${num(nova)}%.`,
        };
      },
      (r) => {
        const x = r.pick([20, 25, 50, 60, 100]);
        const s = (x / (100 + x)) * 100;
        return {
          e: `Um comerciante vende seus produtos com lucro de ${x}% sobre o preço de custo. Esse lucro corresponde a que porcentagem do preço de venda?`,
          r: arred(s, 2),
          d: [x, 100 - x > 0 ? 100 - x : x / 4, arred(x / 2, 2), arred((100 / (100 + x)) * 100, 2)],
          f: (v) => pct(v),
          x: `Se o custo é 100, a venda é ${100 + x} e o lucro é ${x}. Sobre a venda: ${x}/${100 + x} ≈ ${num(s)}%.`,
        };
      },
      (r) => {
        const [a, b] = r.pick([[25, 20], [50, 20], [25, 40], [60, 25], [100, 50], [20, 50]]);
        const fator = (1 + a / 100) * (1 - b / 100);
        const preciso = arred((1 / fator - 1) * 100, 2);
        if (Math.abs(preciso) < 0.01) return porcentagem.niveis[2][3](r);
        const f = (v) => (v >= 0 ? `Aumento de ${pct(v)}` : `Redução de ${pct(-v)}`);
        return {
          e: `A produção de uma fábrica cresceu ${a}% em um ano e caiu ${b}% no ano seguinte. Para voltar exatamente ao nível inicial, a produção atual precisa sofrer:`,
          r: preciso,
          d: [b - a, a - b, -preciso, arred(preciso / 2, 2)],
          f,
          x: `Fator acumulado: ${num(1 + a / 100)} × ${num(1 - b / 100)} = ${num(fator)}. Para voltar a 1, multiplicamos por 1/${num(fator)} ≈ ${num(1 / fator, 4)}, isto é, ${preciso >= 0 ? 'aumento' : 'redução'} de ${num(Math.abs(preciso))}%.`,
        };
      },
      (r) => {
        const [a, i] = r.pick([[10, 5], [8, 4], [12, 5], [15, 10], [6, 4], [21, 10]]);
        const real = arred(((1 + a / 100) / (1 + i / 100) - 1) * 100, 2);
        return {
          e: `Um trabalhador teve reajuste salarial de ${a}% em um ano em que a inflação foi de ${i}%. O ganho real do seu salário foi de, aproximadamente:`,
          r: real,
          d: [a - i, a + i, arred((a / i) * 1, 2), arred(real + 1.5, 2)],
          f: (v) => pct(arred(v, 2)),
          x: `Ganho real = (1 + ${num(a / 100)}) ÷ (1 + ${num(i / 100)}) − 1 = ${num(1 + a / 100)} ÷ ${num(1 + i / 100)} − 1 ≈ ${num(real)}% (um pouco menos que ${a - i}%).`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Razão, proporção e regra de três
const razao = {
  disciplina: 'matematica',
  arquivo: '03-razao-proporcao-regra-de-tres',
  titulo: 'Razão, proporção e regra de três',
  provas: PROVAS_TODAS,
  descricao: 'Regra de três simples e composta, divisão proporcional, misturas e problemas de vazão.',
  niveis: [
    [
      (r) => {
        const ovos = r.int(2, 5), bolos = r.int(2, 4), novo = r.int(5, 12);
        if ((ovos * novo) % bolos || ovos === bolos) return razao.niveis[0][0](r);
        return {
          e: `Uma receita usa ${ovos} ovos para fazer ${bolos} bolos. Quantos ovos são necessários para fazer ${novo} bolos?`,
          r: (ovos * novo) / bolos,
          d: [ovos * novo, novo + ovos - bolos, (bolos * novo) / ovos, (ovos * novo) / bolos + 2],
          x: `Grandezas diretamente proporcionais: ${ovos}/${bolos} = x/${novo} ⇒ x = ${ovos} × ${novo} ÷ ${bolos} = ${(ovos * novo) / bolos}.`,
        };
      },
      (r) => {
        const k = r.pick([4, 6, 8, 10, 12]), d = r.pick([6, 9, 10, 12, 15]), m = r.pick([3, 5, 8, 15, 20]);
        if ((k * d) % m || k === m) return razao.niveis[0][1](r);
        return {
          e: `${k} pedreiros constroem um muro em ${d} dias. Mantendo o mesmo ritmo de trabalho, em quantos dias ${m} pedreiros construiriam o mesmo muro?`,
          r: (k * d) / m,
          d: [(m * d) / k, d + k - m, d * 2, (k * d) / m + 3],
          x: `Mais pedreiros, menos dias: grandezas inversamente proporcionais. ${k} × ${d} = ${m} × x ⇒ x = ${(k * d) / m} dias.`,
        };
      },
      (r) => {
        const a = r.int(1, 4), b = r.int(a + 1, 7);
        const v = (a + b) * r.int(5, 40) * 10;
        return {
          e: `Dois irmãos dividiram ${reais(v)} na razão ${a} : ${b}. Quanto recebeu o irmão que ficou com a maior parte?`,
          r: (v * b) / (a + b),
          d: [(v * a) / (a + b), v / 2, v / b, (v * b) / (a + b) + 50],
          f: reais,
          x: `O total foi dividido em ${a} + ${b} = ${a + b} partes de ${reais(v / (a + b))}. A maior parte vale ${b} × ${reais(v / (a + b))} = ${reais((v * b) / (a + b))}.`,
        };
      },
      (r) => {
        const m = r.int(6, 30), f = r.int(6, 30);
        if (m === f) return razao.niveis[0][3](r);
        return {
          e: `Em uma sala há ${m} meninos e ${f} meninas. A razão entre o número de meninos e o número total de alunos é:`,
          r: fracao(m, m + f),
          d: [fracao(m, f), fracao(f, m + f), fracao(f, m), fracao(m + f, m)],
          x: `Total = ${m + f}. Razão meninos/total = ${m}/${m + f} = ${fracao(m, m + f)}.`,
        };
      },
      (r) => {
        const v = r.pick([60, 72, 80, 90, 100, 110]), t = r.pick([2, 3, 4, 5]);
        const novo = r.pick([1.5, 2.5, 6, 7]);
        return {
          e: `Um carro percorre ${v * t} km em ${t} horas, com velocidade constante. Quantos quilômetros ele percorrerá em ${num(novo)} horas, mantendo essa velocidade?`,
          r: v * novo,
          d: [v * t * novo, v * novo + v, v * t + novo, (v * t) / novo],
          f: (x) => `${num(x)} km`,
          x: `A velocidade é ${v * t} ÷ ${t} = ${v} km/h. Em ${num(novo)} h: ${v} × ${num(novo)} = ${num(v * novo)} km.`,
        };
      },
    ],
    [
      (r) => {
        const m = r.pick([4, 5, 6, 8]), h = r.pick([6, 8]), d = r.pick([5, 6, 10, 12]), pc = r.pick([600, 1200, 1800]);
        const m2 = r.pick([3, 4, 10, 12]), h2 = r.pick([4, 6, 10]), p2 = r.pick([900, 2400, 3600]);
        const x = d * (m / m2) * (h / h2) * (p2 / pc);
        if (!Number.isInteger(x) || x < 1) return razao.niveis[1][0](r);
        return {
          e: `${m} máquinas, trabalhando ${h} horas por dia, produzem ${num(pc)} peças em ${d} dias. Quantos dias serão necessários para ${m2} máquinas iguais, trabalhando ${h2} horas por dia, produzirem ${num(p2)} peças?`,
          r: x,
          d: [Math.round(d * (m2 / m) * (h2 / h) * (p2 / pc)) || x + 2, Math.round(d * (p2 / pc)), Math.round(d * (m / m2) * (p2 / pc)), x + 1],
          x: `Dias são inversamente proporcionais a máquinas e horas/dia e diretamente proporcionais às peças: x = ${d} × (${m}/${m2}) × (${h}/${h2}) × (${num(p2)}/${num(pc)}) = ${x}.`,
        };
      },
      (r) => {
        const [a, b] = r.pick([[2, 3], [3, 6], [2, 6], [4, 6], [3, 4]]);
        const ia = 1 / a, ib = 1 / b, total = r.int(3, 20) * 100 * (a + b);
        const pa = (total * ia) / (ia + ib);
        if (!Number.isInteger(pa)) return razao.niveis[1][1](r);
        return {
          e: `Um prêmio de ${reais(total)} será dividido entre dois funcionários em partes inversamente proporcionais ao número de faltas de cada um: ${a} e ${b} faltas. Quanto receberá quem faltou menos?`,
          r: pa,
          d: [total - pa, (total * a) / (a + b), total / 2, pa + 100],
          f: reais,
          x: `Partes proporcionais a 1/${a} e 1/${b}, ou seja, a ${b} e ${a}. Quem faltou ${a} vezes recebe ${b}/${a + b} de ${reais(total)} = ${reais(pa)}.`,
        };
      },
      (r) => {
        const km = r.pick([300, 360, 420, 480, 540, 600]), cons = r.pick([10, 12, 15]), p = r.pick([5.5, 5.8, 6, 6.2, 6.5]);
        const litros = km / cons;
        if (!Number.isInteger(litros)) return razao.niveis[1][2](r);
        return {
          e: `Um carro faz ${cons} km por litro. Em uma viagem de ${km} km, com gasolina a ${reais(p)} o litro, qual será o gasto com combustível?`,
          r: litros * p,
          d: [km * p / 10, cons * p, litros * p + p * 5, km / p],
          f: reais,
          x: `Litros: ${km} ÷ ${cons} = ${litros} L. Gasto: ${litros} × ${reais(p)} = ${reais(litros * p)}.`,
        };
      },
      (r) => {
        const a = r.int(1, 3), b = r.int(a + 1, 6), v = (a + b) * r.int(1, 4) * 0.5;
        return {
          e: `Um suco é preparado misturando concentrado e água na proporção de ${a} para ${b}. Para preparar ${num(v)} litros de suco, quantos litros de concentrado são necessários?`,
          r: (v * a) / (a + b),
          d: [(v * b) / (a + b), v / a, (v * a) / b, v / (a + b)],
          f: (x) => `${num(x)} L`,
          x: `A cada ${a + b} partes de suco, ${a} são de concentrado: ${num(v)} × ${a}/${a + b} = ${num((v * a) / (a + b))} L.`,
        };
      },
      (r) => {
        const [x, y] = r.pick([[3, 4], [2, 5], [5, 7], [4, 9], [3, 8]]);
        const k = r.int(2, 9);
        const diff = (y - x) * k;
        return {
          e: `Dois números estão na razão ${x} : ${y}, e a diferença entre eles é ${diff}. Qual é o maior desses números?`,
          r: y * k,
          d: [x * k, (x + y) * k, diff * y, y + diff],
          x: `Sejam ${x}k e ${y}k. Então ${y}k − ${x}k = ${diff} ⇒ k = ${k}. O maior é ${y} × ${k} = ${y * k}.`,
        };
      },
    ],
    [
      (r) => {
        const [a, b] = r.pick([[2, 3], [3, 6], [4, 12], [6, 12], [5, 20], [10, 15], [4, 6]]);
        const t = (a * b) / (a + b);
        const f = (v) => {
          const h = Math.floor(v + 1e-9), m = Math.round((v - h) * 60);
          return m ? `${h} h ${m} min` : `${h} h`;
        };
        return {
          e: `Uma torneira sozinha enche um tanque em ${a} horas, e outra, sozinha, o enche em ${b} horas. Abertas juntas, em quanto tempo enchem o tanque?`,
          r: t,
          d: [(a + b) / 2, a + b, b - a, t + 0.5],
          f,
          x: `Por hora, as torneiras enchem 1/${a} + 1/${b} = ${fracao(a + b, a * b)} do tanque. O tempo é o inverso: ${fracao(a * b, a + b)} h${Number.isInteger(t) ? '' : ` = ${f(t)}`}.`,
        };
      },
      (r) => {
        const c1 = r.pick([10, 20, 30]) * 1000, t1 = r.pick([6, 8, 12]);
        const c2 = r.pick([15, 20, 40]) * 1000, t2 = r.pick([3, 4, 6, 9]);
        const p1 = c1 * t1, p2 = c2 * t2;
        const lucro = (p1 + p2) / 1000 * r.pick([10, 20, 25]);
        const parte1 = (lucro * p1) / (p1 + p2);
        if (!Number.isInteger(parte1 * 100)) return razao.niveis[2][1](r);
        return {
          e: `Dois sócios abriram uma empresa. O primeiro investiu ${reais(c1)} durante ${t1} meses, e o segundo, ${reais(c2)} durante ${t2} meses. O lucro de ${reais(lucro)} será dividido proporcionalmente ao capital multiplicado pelo tempo. Quanto receberá o primeiro sócio?`,
          r: parte1,
          d: [lucro - parte1, (lucro * c1) / (c1 + c2), (lucro * t1) / (t1 + t2), lucro / 2],
          f: reais,
          x: `Pesos: ${num(c1)} × ${t1} = ${num(p1)} e ${num(c2)} × ${t2} = ${num(p2)}. Primeiro sócio: ${reais(lucro)} × ${num(p1)}/${num(p1 + p2)} = ${reais(parte1)}.`,
        };
      },
      (r) => {
        const op = r.pick([10, 12, 15, 20]), dias = r.pick([12, 15, 18, 20]), h = r.pick([6, 8]);
        const op2 = r.pick([8, 16, 24, 30]), h2 = r.pick([5, 6, 10]);
        const ef = r.pick([[1, 1], [1, 2], [2, 1], [2, 3], [3, 2]]);
        const x = (dias * op * h * ef[0]) / (op2 * h2 * ef[1]);
        if (!Number.isInteger(x) || op === op2) return razao.niveis[2][2](r);
        const txtEf = ef[0] === ef[1] ? 'com a mesma eficiência' : ef[0] < ef[1] ? `${ef[1] / ef[0] === 2 ? 'duas vezes' : `${num(ef[1] / ef[0])} vezes`} mais eficientes que os primeiros` : `com eficiência igual a ${fracao(ef[1], ef[0])} da dos primeiros`;
        return {
          e: `${op} operários, trabalhando ${h} horas por dia, fazem uma obra em ${dias} dias. Em quantos dias ${op2} operários, ${txtEf}, trabalhando ${h2} horas por dia, fariam a mesma obra?`,
          r: x,
          d: [Math.round((dias * op2 * h2) / (op * h)) || x + 4, Math.round((dias * op * h) / (op2 * h2)) === x ? x + 3 : Math.round((dias * op * h) / (op2 * h2)), x * 2, x + 1],
          x: `Dias são inversamente proporcionais a operários, horas/dia e eficiência: x = ${dias} × (${op}/${op2}) × (${h}/${h2}) × (${ef[0]}/${ef[1]}) = ${x}.`,
        };
      },
      (r) => {
        const total = r.pick([1300, 2600, 3900, 5200]);
        // diretamente proporcional às idades e inversamente às faltas
        const pares = r.pick([[[10, 2], [12, 3], [15, 5]], [[8, 1], [12, 2], [18, 3]], [[6, 1], [9, 3], [12, 2]]]);
        const pesos = pares.map(([i, f]) => i / f);
        const soma = pesos.reduce((s, v) => s + v, 0);
        const partes = pesos.map((w) => (total * w) / soma);
        if (!partes.every((v) => Number.isInteger(v * 100))) return razao.niveis[2][3](r);
        const maior = Math.max(...partes);
        return {
          e: `Um avô vai dividir ${reais(total)} entre três netos, em partes diretamente proporcionais às idades (${pares.map((p) => p[0]).join(', ')} anos) e inversamente proporcionais ao número de faltas na escola (${pares.map((p) => p[1]).join(', ')}, respectivamente). Quanto receberá o neto que ganhar mais?`,
          r: maior,
          d: [Math.min(...partes), partes.find((v) => v !== maior && v !== Math.min(...partes)) ?? total / 3, total / 3, (total * Math.max(...pares.map((p) => p[0]))) / pares.reduce((s, p) => s + p[0], 0)],
          f: reais,
          x: `Pesos = idade ÷ faltas: ${pesos.map((w) => num(w)).join(', ')} (soma ${num(soma)}). A maior parte é ${reais(total)} × ${num(Math.max(...pesos))}/${num(soma)} = ${reais(maior)}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Equações e sistemas
const equacoes = {
  disciplina: 'matematica',
  arquivo: '04-equacoes-e-sistemas',
  titulo: 'Equações, inequações e sistemas',
  provas: PROVAS_TODAS,
  descricao: 'Equações do 1º e 2º grau, sistemas lineares, inequações e problemas.',
  niveis: [
    [
      (r) => {
        const a = r.int(2, 9), x = r.int(-6, 12), b = r.int(-20, 20);
        const c = a * x + b;
        return {
          e: `Qual é a solução da equação ${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${num(c)}?`,
          r: x,
          d: [(c + b) / a, c - b, (c - b) / -a, x + 2],
          x: `${a}x = ${num(c)} ${b >= 0 ? '−' : '+'} ${Math.abs(b)} = ${num(a * x)} ⇒ x = ${num(x)}.`,
        };
      },
      (r) => {
        const x = r.int(5, 60), k = r.pick([2, 3, 4]);
        const n = x + k * x;
        const pal = { 2: 'dobro', 3: 'triplo', 4: 'quádruplo' }[k];
        return {
          e: `A soma de um número com o seu ${pal} é ${n}. Que número é esse?`,
          r: x,
          d: [n / k, n - k, k * x, x + k],
          x: `x + ${k}x = ${n} ⇒ ${k + 1}x = ${n} ⇒ x = ${x}.`,
        };
      },
      (r) => {
        const x = r.int(5, 40), y = r.int(1, x - 1);
        return {
          e: `A soma de dois números é ${x + y} e a diferença entre eles é ${x - y}. Qual é o maior número?`,
          r: x,
          d: [y, x + y, x - y, (x + y) / 2 === x ? x + 1 : (x + y) / 2],
          x: `Somando as equações x + y = ${x + y} e x − y = ${x - y}: 2x = ${2 * x} ⇒ x = ${x} (e y = ${y}).`,
        };
      },
      (r) => {
        const f = r.int(4, 15), k = r.pick([3, 4, 5]);
        return {
          e: `Um pai tem hoje o ${k === 3 ? 'triplo' : k === 4 ? 'quádruplo' : 'quíntuplo'} da idade do filho, e a soma das duas idades é ${f + k * f} anos. Qual é a idade do filho?`,
          r: f,
          d: [k * f, (f + k * f) / k, f + k, f * 2],
          f: (v) => `${num(v)} anos`,
          x: `Se o filho tem x anos, o pai tem ${k}x: x + ${k}x = ${f + k * f} ⇒ ${k + 1}x = ${f + k * f} ⇒ x = ${f}.`,
        };
      },
      (r) => {
        const p = r.pick([3, 4, 5, 6]), q = r.int(2, 6), tot = p * r.int(3, 9) + q * r.int(1, 8);
        const unid = r.int(2, 6);
        const preco = (tot - q * unid) / p;
        if (!Number.isInteger(preco) || preco <= 0) return equacoes.niveis[0][4](r);
        return {
          e: `${nome(r)} comprou ${p} cadernos iguais e ${unid} canetas de ${reais(q)} cada, gastando ${reais(tot)} no total. Qual o preço de cada caderno?`,
          r: preco,
          d: [tot / p, (tot - q) / p, preco + q, tot - q * unid],
          f: reais,
          x: `${p}x + ${unid} × ${q} = ${tot} ⇒ ${p}x = ${tot - q * unid} ⇒ x = ${reais(preco)}.`,
        };
      },
    ],
    [
      (r) => {
        const r1 = r.int(-6, 5), r2 = r.int(r1 + 1, 9);
        const s = r1 + r2, p = r1 * r2;
        const t = (v, sx) => (v === 0 ? '' : ` ${v > 0 ? '+' : '−'} ${Math.abs(v) === 1 && sx ? '' : Math.abs(v)}${sx}`);
        return {
          e: `Qual é a maior raiz da equação x²${t(-s, 'x')}${t(p, '')} = 0?`,
          r: r2,
          d: [r1, -r2, s, p === r2 ? r2 + 2 : p, -r1],
          x: `Por soma e produto: as raízes somam ${s} e multiplicam ${p}. São ${r1} e ${r2}; a maior é ${r2}.`,
        };
      },
      (r) => {
        const inteira = r.pick([20, 30, 40, 50]), meia = inteira / 2;
        const ni = r.int(20, 150), nm = r.int(20, 150);
        const n = ni + nm, tot = ni * inteira + nm * meia;
        return {
          e: `Em uma sessão de cinema, o ingresso inteiro custava ${reais(inteira)} e a meia-entrada, ${reais(meia)}. Entraram ${n} pessoas e foram arrecadados ${reais(tot)}. Quantas pessoas pagaram meia-entrada?`,
          r: nm,
          d: [ni, n / 2, Math.round(tot / inteira), nm + 10],
          x: `x inteiras e y meias: x + y = ${n} e ${inteira}x + ${meia}y = ${tot}. Multiplicando a 1ª por ${inteira} e subtraindo: ${meia}y = ${n * inteira - tot} ⇒ y = ${nm}.`,
        };
      },
      (r) => {
        const a = r.int(2, 7), b = r.int(-15, 15), c = r.int(-10, 30);
        const lim = (c - b) / a;
        const certo = Number.isInteger(lim) ? lim + 1 : Math.floor(lim) + 1;
        return {
          e: `Qual é o menor número inteiro que satisfaz a inequação ${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)} > ${c}?`,
          r: certo,
          d: [certo - 1, certo + 1, Math.floor((c + b) / a), -certo],
          x: `${a}x > ${c} ${b >= 0 ? '−' : '+'} ${Math.abs(b)} = ${c - b} ⇒ x > ${num(lim)}. O menor inteiro maior que ${num(lim)} é ${certo}.`,
        };
      },
      (r) => {
        const g = r.int(5, 30), c = r.int(5, 30);
        return {
          e: `Em um sítio há galinhas e coelhos, num total de ${g + c} cabeças e ${2 * g + 4 * c} pés. Quantos coelhos há no sítio?`,
          r: c,
          d: [g, (g + c) / 2 === c ? c + 3 : Math.round((g + c) / 2), (2 * g + 4 * c) / 4, c + 2],
          x: `g + c = ${g + c} e 2g + 4c = ${2 * g + 4 * c}. Multiplicando a 1ª por 2 e subtraindo: 2c = ${2 * c} ⇒ c = ${c}.`,
        };
      },
      (r) => {
        const x = r.int(2, 9), y = r.int(1, 9), a = r.int(2, 5), b = r.int(1, 4);
        return {
          e: `Resolvendo o sistema { x + y = ${x + y} ; ${a}x − ${b}y = ${a * x - b * y} }, qual é o valor de x · y?`,
          r: x * y,
          d: [x + y, x * y + x, a * x - b * y, x * x],
          x: `Da 1ª: y = ${x + y} − x. Substituindo: ${a}x − ${b}(${x + y} − x) = ${a * x - b * y} ⇒ ${a + b}x = ${a * x - b * y + b * (x + y)} ⇒ x = ${x}, y = ${y}. Produto: ${x * y}.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.int(1, 4), b = r.int(a + 1, 6);
        const A = a * a + b * b, B = a * a * b * b;
        return {
          e: `A soma das raízes reais positivas da equação x⁴ − ${A}x² + ${B} = 0 é:`,
          r: a + b,
          d: [A, a * b, 0, a * a + b * b + 1, 2 * (a + b)],
          x: `Fazendo y = x²: y² − ${A}y + ${B} = 0 ⇒ y = ${a * a} ou y = ${b * b}. Então x = ±${a} ou x = ±${b}. Raízes positivas: ${a} + ${b} = ${a + b}.`,
        };
      },
      (r) => {
        const a = r.int(3, 15), b = r.int(a + 1, 20);
        return {
          e: `Um terreno retangular tem perímetro de ${2 * (a + b)} m e área de ${a * b} m². Qual é a medida do maior lado?`,
          r: b,
          d: [a, a + b, (a + b) / 2 === b ? b + 1 : (a + b) / 2, b - a === a ? b + 2 : b - a],
          f: (v) => `${num(v)} m`,
          x: `x + y = ${a + b} e x · y = ${a * b}. Os lados são raízes de t² − ${a + b}t + ${a * b} = 0: t = ${a} ou t = ${b}. Maior lado: ${b} m.`,
        };
      },
      (r) => {
        const b = r.pick([2, 4, 6, 8, 10, 12]) * r.pick([1, -1]);
        const m = (b * b) / 4;
        return {
          e: `Para qual valor de m a equação x² ${b > 0 ? '+' : '−'} ${Math.abs(b)}x + m = 0 possui duas raízes reais e iguais?`,
          r: m,
          d: [-m, m / 2, b * b, Math.abs(b) / 2],
          x: `Raízes iguais ⇔ Δ = 0: ${b * b} − 4m = 0 ⇒ m = ${m}.`,
        };
      },
      (r) => {
        const r1 = r.int(1, 6), r2 = r.int(1, 6), a = r.pick([1, 2, 3]);
        const B = -a * (r1 + r2), C = a * r1 * r2;
        return {
          e: `Sendo x₁ e x₂ as raízes de ${a === 1 ? '' : a}x² − ${-B}x + ${C} = 0, qual é o valor de 1/x₁ + 1/x₂?`,
          r: fracao(r1 + r2, r1 * r2),
          d: [fracao(r1 * r2, r1 + r2), fracao(r1 + r2, 1), fracao(-(r1 + r2), r1 * r2), fracao(r1 * r2, 1), fracao(r1 + r2 + 1, r1 * r2)],
          x: `1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂) = (${-B}/${a}) ÷ (${C}/${a}) = ${fracao(-B, C)}.`,
        };
      },
      (r) => {
        const n = r.int(4, 12), preco = r.pick([20, 30, 40, 60]);
        const total = n * preco;
        const novoN = n + r.pick([1, 2, 3, 4]);
        const novoPreco = total / novoN;
        if (!Number.isInteger(novoPreco)) return equacoes.niveis[2][4](r);
        return {
          e: `Um grupo de amigos ia dividir igualmente uma conta de ${reais(total)}. Como ${novoN - n === 1 ? 'mais uma pessoa entrou' : `mais ${novoN - n} pessoas entraram`} no grupo, cada um pagou ${reais(preco - novoPreco)} a menos. Quantas pessoas havia inicialmente?`,
          r: n,
          d: [novoN, n - 1, total / (preco - novoPreco) > 50 ? n + 5 : total / (preco - novoPreco), n * 2],
          x: `Seja x o número inicial: ${total}/x − ${total}/(x + ${novoN - n}) = ${preco - novoPreco}. Testando/resolvendo a equação do 2º grau, x = ${n} (cada um pagaria ${reais(preco)}, e com ${novoN} pessoas, ${reais(novoPreco)}).`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Funções
const sinal = (v, primeiro = false) => v === 0 ? '' : (v < 0 ? (primeiro ? '−' : ' − ') : primeiro ? '' : ' + ') + num(Math.abs(v));
const funcoes = {
  disciplina: 'matematica',
  arquivo: '05-funcoes-afim-e-quadratica',
  titulo: 'Funções afim e quadrática',
  provas: PROVAS_TODAS,
  descricao: 'Lei de formação, gráficos, zeros, vértice, máximos e mínimos e aplicações.',
  niveis: [
    [
      (r) => {
        const a = r.int(-5, 6) || 2, b = r.int(-10, 10), k = r.int(-5, 8);
        return {
          e: `Dada a função f(x) = ${a}x${sinal(b)}, qual é o valor de f(${k})?`,
          r: a * k + b,
          d: [a + k + b, a * k - b, a * (k + b), k * b + a],
          x: `f(${k}) = ${a} · (${k})${sinal(b)} = ${a * k}${sinal(b)} = ${a * k + b}.`,
        };
      },
      (r) => {
        const band = r.pick([4.5, 5, 5.5, 6]), km = r.pick([2, 2.5, 3, 3.5]), d = r.int(4, 25);
        return {
          e: `Em uma cidade, a corrida de táxi custa ${reais(band)} de bandeirada mais ${reais(km)} por quilômetro rodado. Quanto custa uma corrida de ${d} km?`,
          r: band + km * d,
          d: [(band + km) * d, km * d, band * d + km, band + km * (d - 1)],
          f: reais,
          x: `C(x) = ${num(band)} + ${num(km)}x. Para x = ${d}: ${num(band)} + ${num(km * d)} = ${reais(band + km * d)}.`,
        };
      },
      (r) => {
        const a = r.pick([2, 3, 4, 5, -2, -3, -4]), x0 = r.int(-6, 9);
        const b = -a * x0;
        return {
          e: `Qual é o zero (raiz) da função f(x) = ${a}x${sinal(b)}?`,
          r: x0,
          d: [-x0, b, a, x0 + 1],
          x: `f(x) = 0 ⇒ ${a}x = ${-b} ⇒ x = ${x0}.`,
        };
      },
      (r) => {
        const x1 = r.int(-4, 3), x2 = x1 + r.int(1, 4), a = r.int(-4, 5) || 1, b = r.int(-5, 5);
        return {
          e: `O gráfico de uma função afim passa pelos pontos (${x1}, ${a * x1 + b}) e (${x2}, ${a * x2 + b}). Qual é a taxa de variação (coeficiente angular) dessa função?`,
          r: a,
          d: [-a, b, a + 1, fracao(x2 - x1, a * (x2 - x1) || 1)],
          x: `a = Δy/Δx = (${a * x2 + b} − ${a * x1 + b}) / (${x2} − ${x1}) = ${a * (x2 - x1)}/${x2 - x1} = ${a}.`,
        };
      },
      (r) => {
        const fixo = r.pick([1500, 1800, 2000, 2200]), com = r.pick([2, 3, 4, 5]), vendas = r.int(5, 40) * 1000;
        return {
          e: `Um vendedor recebe salário fixo de ${reais(fixo)} mais ${com}% sobre o total vendido no mês. Se ele vendeu ${reais(vendas)}, qual foi o seu salário?`,
          r: fixo + (vendas * com) / 100,
          d: [(vendas * com) / 100, fixo + vendas * com / 10, fixo * (1 + com / 100), fixo + com],
          f: reais,
          x: `S(x) = ${fixo} + ${num(com / 100)}x = ${fixo} + ${num((vendas * com) / 100)} = ${reais(fixo + (vendas * com) / 100)}.`,
        };
      },
    ],
    [
      (r) => {
        const a = r.pick([-3, -2, -1, 1, 2, 3]), xv = r.int(-4, 4), yv = r.int(-9, 9);
        const b = -2 * a * xv, c = a * xv * xv + yv;
        return {
          e: `Qual é o valor ${a < 0 ? 'máximo' : 'mínimo'} da função f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}x²${b ? sinal(b) + 'x' : ''}${c ? sinal(c) : ''}?`,
          r: yv,
          d: [xv, -yv, c, yv + a],
          x: `x do vértice = −b/2a = ${xv}. Valor ${a < 0 ? 'máximo' : 'mínimo'} = f(${xv}) = ${yv} (ou −Δ/4a).`,
        };
      },
      (r) => {
        const xv = r.int(10, 60), c = r.int(1, 9) * 100;
        const b = 2 * xv;
        return {
          e: `O lucro de uma empresa, em reais, ao vender x unidades de um produto é dado por L(x) = −x² + ${b}x − ${c}. Quantas unidades devem ser vendidas para que o lucro seja máximo?`,
          r: xv,
          d: [b, xv * xv - c, xv / 2, c / 10],
          x: `O lucro máximo ocorre no vértice: x = −b/(2a) = −${b}/(2 · (−1)) = ${xv} unidades.`,
        };
      },
      (r) => {
        const a = r.int(-4, 5) || 3, b = r.int(-6, 6), x1 = r.int(-3, 2), x2 = x1 + r.int(2, 4), k = r.int(4, 9);
        return {
          e: `Uma função afim f satisfaz f(${x1}) = ${a * x1 + b} e f(${x2}) = ${a * x2 + b}. Qual é o valor de f(${k})?`,
          r: a * k + b,
          d: [a * k, a * k - b, k + b, a * (k + 1) + b],
          x: `a = (${a * x2 + b} − ${a * x1 + b})/(${x2} − ${x1}) = ${a}; b = ${b}. Então f(x) = ${a}x${sinal(b)} e f(${k}) = ${a * k + b}.`,
        };
      },
      (r) => {
        const a = r.int(2, 5), b = r.int(-5, 5), c = r.int(1, 4), d = r.int(-3, 6), k = r.int(-2, 4);
        const g = c * k + d;
        return {
          e: `Sendo f(x) = ${a}x${sinal(b)} e g(x) = ${c}x${sinal(d)}, qual é o valor de f(g(${k}))?`,
          r: a * g + b,
          d: [c * (a * k + b) + d, a * k + b + g, (a * k + b) * g, a * g - b],
          x: `g(${k}) = ${g}. Então f(${g}) = ${a} · ${g}${sinal(b)} = ${a * g + b}.`,
        };
      },
      (r) => {
        const a = r.pick([2, 3, 4, 5]), b = r.int(-9, 9), y = r.int(-5, 10);
        const x = (y - b) / a;
        return {
          e: `Sendo f(x) = ${a}x${sinal(b)} e f⁻¹ a sua inversa, qual é o valor de f⁻¹(${y})?`,
          r: fracao(y - b, a),
          d: [fracao(a * y + b, 1), fracao(y + b, a), fracao(a, y - b || 1), fracao(y - b + a, a)],
          x: `f⁻¹(${y}) é o x tal que f(x) = ${y}: ${a}x${sinal(b)} = ${y} ⇒ x = ${fracao(y - b, a)}.${Number.isInteger(x) ? '' : ''}`,
        };
      },
    ],
    [
      (r) => {
        const p = r.pick([40, 60, 80, 100, 120, 200]);
        return {
          e: `Um fazendeiro tem ${p} m de cerca para fazer um cercado retangular encostado em um muro reto (o muro forma um dos lados e não precisa de cerca). Qual é a maior área que ele pode cercar?`,
          r: (p * p) / 8,
          d: [(p * p) / 16, (p * p) / 4, (p / 3) ** 2, p * 2],
          f: (v) => `${num(v)} m²`,
          x: `Com lados x (dois, perpendiculares ao muro) e ${p} − 2x: A(x) = x(${p} − 2x). O máximo ocorre em x = ${p / 4} m, dando A = ${p / 4} × ${p / 2} = ${num((p * p) / 8)} m².`,
        };
      },
      (r) => {
        const v = r.pick([10, 20, 30, 40]);
        return {
          e: `A altura h (em metros) de uma bola lançada verticalmente é dada por h(t) = −5t² + ${v}t, com t em segundos. Qual é a altura máxima atingida?`,
          r: (v * v) / 20,
          d: [v / 10, (v * v) / 10, (v * v) / 40, v * 2],
          f: (x) => `${num(x)} m`,
          x: `Vértice: t = −${v}/(2 · (−5)) = ${v / 10} s. h(${v / 10}) = −5 · ${(v / 10) ** 2} + ${v} · ${v / 10} = ${num((v * v) / 20)} m.`,
        };
      },
      (r) => {
        const r1 = r.int(-5, 3), r2 = r1 + r.int(3, 9);
        const s = r1 + r2, p = r1 * r2;
        return {
          e: `Quantos números inteiros satisfazem a inequação x²${s ? sinal(-s) + 'x' : ''}${p ? sinal(p) : ''} < 0?`,
          r: r2 - r1 - 1,
          d: [r2 - r1 + 1, r2 - r1, r2 - r1 - 2 >= 0 ? r2 - r1 - 2 : 0, Math.abs(s) + 10],
          x: `As raízes são ${r1} e ${r2}; a parábola (concavidade para cima) é negativa entre elas: ${r1} < x < ${r2}. Inteiros: ${r2 - r1 - 1}.`,
        };
      },
      (r) => {
        const p = r.pick([10, 20, 30]), q = r.pick([200, 300, 400, 600]), k = r.pick([5, 10]);
        const xv = (q - k * p) / (2 * k);
        if (xv <= 0 || !Number.isInteger(xv)) return funcoes.niveis[2][3](r);
        return {
          e: `Uma loja vende ${q} camisetas por mês a ${reais(p)} cada. Uma pesquisa mostrou que, a cada R$ 1,00 de aumento no preço, ${k} camisetas a menos são vendidas. Qual preço maximiza a receita?`,
          r: p + xv,
          d: [p, p + xv / 2, p + 2 * xv, q / k],
          f: reais,
          x: `Com aumento de x reais: R(x) = (${p} + x)(${q} − ${k}x). As raízes são x = −${p} e x = ${q / k}; o vértice fica no meio: x = ${xv}. Preço ótimo: ${reais(p + xv)}.`,
        };
      },
      (r) => {
        const a = r.pick([1, 2]), r1 = r.int(-4, 0), r2 = r.int(1, 5);
        const b = -a * (r1 + r2), c = a * r1 * r2;
        return {
          e: `O gráfico de f(x) = ${a === 1 ? '' : a}x²${b ? sinal(b) + 'x' : ''}${c ? sinal(c) : ''} corta o eixo x nos pontos A e B e o eixo y no ponto C. Qual é a área do triângulo ABC?`,
          r: ((r2 - r1) * Math.abs(c)) / 2,
          d: [(r2 - r1) * Math.abs(c), ((r2 - r1) * Math.abs(c)) / 4, (r2 - r1) + Math.abs(c), Math.abs(c)],
          f: (v) => `${num(v)} u.a.`,
          x: `Raízes: ${r1} e ${r2} (base AB = ${r2 - r1}). C = (0, ${c}) (altura ${Math.abs(c)}). Área = ${r2 - r1} × ${Math.abs(c)} ÷ 2 = ${num(((r2 - r1) * Math.abs(c)) / 2)}.`,
        };
      },
    ],
  ],
};

// ---------------------------------------------------------------- Exponencial e logaritmo
const explog = {
  disciplina: 'matematica',
  arquivo: '06-exponencial-e-logaritmo',
  titulo: 'Função exponencial e logaritmo',
  provas: PROVAS_TODAS,
  descricao: 'Equações exponenciais, propriedades dos logaritmos, crescimento, decaimento e escalas logarítmicas.',
  niveis: [
    [
      (r) => {
        const b = r.pick([2, 3, 5]), n = r.int(2, b === 2 ? 9 : 5);
        return {
          e: `Qual é o valor de x na equação ${b}ˣ = ${num(b ** n).replace(/\./g, '')}?`,
          r: n,
          d: [n + 1, n - 1, b ** n / b, 2 * n],
          x: `${num(b ** n).replace(/\./g, '')} = ${b}${sup(n)}, então ${b}ˣ = ${b}${sup(n)} ⇒ x = ${n}.`,
        };
      },
      (r) => {
        const b = r.pick([2, 3, 5, 10]), n = r.int(-2, 5);
        const v = b ** n;
        const arg = n >= 0 ? num(v).replace(/\./g, '') : `1/${b ** -n}`;
        return {
          e: `Qual é o valor de log${b === 10 ? '' : ` na base ${b} de`} ${arg}${b === 10 ? '' : ''}?`,
          r: n,
          d: [-n === n ? n + 1 : -n, n + 1, n - 1, b * n === n ? n + 2 : b * n],
          x: `log${b === 10 ? '' : '_' + b} ${arg} = x ⇔ ${b}ˣ = ${arg}. Como ${b}${sup(n)} = ${arg}, x = ${n}.`,
        };
      },
      (r) => {
        const n0 = r.pick([100, 200, 500, 1000]), h = r.pick([1, 2, 3, 4]), k = r.int(3, 6);
        return {
          e: `Uma colônia de bactérias, inicialmente com ${num(n0)} indivíduos, dobra de tamanho a cada ${h === 1 ? 'hora' : `${h} horas`}. Quantas bactérias haverá após ${h * k} horas?`,
          r: n0 * 2 ** k,
          d: [n0 * 2 * k, n0 * 2 ** (k - 1), n0 * 2 ** (h * k) > 1e7 ? n0 * k : n0 * 2 ** (h * k), n0 * 2 ** (k + 1)],
          x: `Em ${h * k} horas ocorrem ${k} duplicações: ${num(n0)} × 2${sup(k)} = ${num(n0 * 2 ** k)}.`,
        };
      },
      (r) => {
        const [x, txt, v] = r.pick([[6, '2 · 3', 0.78], [12, '2² · 3', 1.08], [18, '2 · 3²', 1.26], [8, '2³', 0.9], [9, '3²', 0.96], [24, '2³ · 3', 1.38], [5, '10/2', 0.7], [15, '3 · 10/2', 1.18]]);
        return {
          e: `Considerando log 2 = 0,30 e log 3 = 0,48, qual é o valor de log ${x}?`,
          r: v,
          d: [arred(v + 0.3, 2), arred(v - 0.18, 2), 0.144, arred(v * 2, 2)],
          f: (z) => num(z, 2),
          x: `${x} = ${txt}. Usando log(a·b) = log a + log b, log(aⁿ) = n·log a e log(a/b) = log a − log b: log ${x} = ${num(v, 2)}.`,
        };
      },
    ],
    [
      (r) => {
        const b = r.pick([2, 3]), k = r.int(1, 3), n = r.int(3, b === 2 ? 8 : 5);
        const x = n - k;
        return {
          e: `Qual é a solução da equação ${b}^(x + ${k}) = ${num(b ** n).replace(/\./g, '')}?`,
          r: x,
          d: [n, n + k, x - 1, -x === x ? x + 2 : -x],
          x: `${num(b ** n).replace(/\./g, '')} = ${b}${sup(n)}. Igualando expoentes: x + ${k} = ${n} ⇒ x = ${x}.`,
        };
      },
      (r) => {
        const b = r.pick([2, 3, 4, 5]), n = r.int(2, 4);
        return {
          e: `Se log na base ${b} de x é igual a ${n}, então x vale:`,
          r: b ** n,
          d: [b * n, n ** b, b + n, b ** (n + 1)],
          x: `log_${b} x = ${n} ⇔ x = ${b}${sup(n)} = ${b ** n}.`,
        };
      },
      (r) => {
        const v = r.pick([40000, 50000, 60000, 80000]), t = r.pick([10, 20]), n = r.pick([2, 3]);
        const fim = v * (1 - t / 100) ** n;
        return {
          e: `Um carro de ${reais(v)} desvaloriza ${t}% ao ano em relação ao valor do ano anterior. Qual será o seu valor daqui a ${n} anos?`,
          r: fim,
          d: [v * (1 - (t * n) / 100), v * (1 - t / 100), v * (t / 100) ** n, fim * 0.9],
          f: reais,
          x: `V(n) = ${num(v)} × ${num(1 - t / 100)}ⁿ. Para n = ${n}: ${num(v)} × ${num((1 - t / 100) ** n, 4)} = ${reais(fim)}.`,
        };
      },
      (r) => {
        const k = r.pick([5, 10, 15, 20, 25]), m = r.pick([[4, 2], [8, 3], [16, 4], [32, 5]]);
        return {
          e: `Uma população dobra a cada ${k} anos. Em quanto tempo ela fica ${m[0]} vezes maior que a inicial?`,
          r: k * m[1],
          d: [k * m[0], k * m[0] / 2, k * (m[1] + 1), k + m[0]],
          f: (v) => `${num(v)} anos`,
          x: `${m[0]} = 2${sup(m[1])}, isto é, ${m[1]} duplicações de ${k} anos cada: ${k * m[1]} anos.`,
        };
      },
      (r) => {
        const n = r.int(2, 12);
        const f = (v) => num(v);
        return {
          e: `O pH de uma solução é dado por pH = −log[H⁺]. Se a concentração de íons H⁺ em um líquido é 10${sup(-n)} mol/L, qual é o seu pH?`,
          r: n,
          d: [-n, 14 - n === n ? n + 1 : 14 - n, n + 1, 10 * n],
          f,
          x: `pH = −log(10${sup(-n)}) = −(−${n}) = ${n}.`,
        };
      },
    ],
    [
      (r) => {
        const b = r.pick([2, 3]), k = r.int(1, 4), x = k + r.int(1, 6);
        const prod = x * (x - k);
        const n = Math.log(prod) / Math.log(b);
        if (!Number.isInteger(Math.round(n * 1e9) / 1e9)) return explog.niveis[2][0](r);
        return {
          e: `Qual é a solução da equação log_${b}(x) + log_${b}(x − ${k}) = ${Math.round(n)}?`,
          r: x,
          d: [x - k, -x + k, x + k, b ** Math.round(n)],
          x: `log_${b}[x(x − ${k})] = ${Math.round(n)} ⇒ x² − ${k}x = ${prod} ⇒ x = ${x} ou x = ${k - x}. Como x > ${k}, x = ${x}.`,
        };
      },
      (r) => {
        const m0 = r.pick([80, 160, 320, 640]), t = r.pick([5, 8, 12, 30]), n = r.int(2, 5);
        return {
          e: `Um isótopo radioativo tem meia-vida de ${t} anos. Partindo de ${m0} g, quanto restará após ${t * n} anos?`,
          r: m0 / 2 ** n,
          d: [m0 / (2 * n), m0 / 2 ** (n + 1), m0 / 2 ** (n - 1), m0 - (m0 / 2) * n > 0 ? m0 - (m0 / 2) * n : m0 / 3],
          f: (v) => `${num(v)} g`,
          x: `${t * n} anos correspondem a ${n} meias-vidas: ${m0} ÷ 2${sup(n)} = ${num(m0 / 2 ** n)} g.`,
        };
      },
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
          x: `Aplicando log dos dois lados: x = ${txt} = ${num(num1, 2)}/${num(den, 2)} ≈ ${num(v, 2)}.`,
        };
      },
      (r) => {
        const k = r.int(1, 6);
        return {
          e: `O nível sonoro, em decibéis, é dado por N = 10 · log(I/I₀). Se a intensidade sonora I de uma fonte for multiplicada por ${num(10 ** k).replace(/\./g, '')}, o nível sonoro:`,
          r: 10 * k,
          d: [10 ** k, k, 100 * k, 10 * (k + 1)],
          f: (v) => `aumenta ${num(v)} dB`,
          x: `N' = 10 · log(10${sup(k)} · I/I₀) = 10 · [${k} + log(I/I₀)] = N + ${10 * k}. O nível aumenta ${10 * k} dB.`,
        };
      },
      (r) => {
        const c = r.pick([1000, 2000, 5000]), taxa = r.pick([[1.1, 0.04, 'log 1,1 ≈ 0,04'], [1.2, 0.08, 'log 1,2 ≈ 0,08'], [1.25, 0.1, 'log 1,25 ≈ 0,10']]);
        const alvo = r.pick([[2, 0.3], [4, 0.6], [8, 0.9]]);
        const n = alvo[1] / taxa[1];
        return {
          e: `Uma aplicação de ${reais(c)} rende ${num((taxa[0] - 1) * 100)}% ao ano, a juros compostos. Usando log 2 ≈ 0,30 e ${taxa[2]}, em quantos anos, aproximadamente, o montante será ${alvo[0]} vezes o valor aplicado?`,
          r: arred(n, 1),
          d: [arred(n * 2, 1), arred(n / 2, 1), arred(alvo[0] / (taxa[0] - 1), 1), arred(n + 3, 1)],
          f: (v) => `${num(v)} anos`,
          x: `${num(taxa[0])}ⁿ = ${alvo[0]} ⇒ n · log ${num(taxa[0])} = log ${alvo[0]} ⇒ n = ${num(alvo[1], 2)}/${num(taxa[1], 2)} ≈ ${num(n, 1)} anos.`,
        };
      },
    ],
  ],
};

export default [numeros, porcentagem, razao, equacoes, funcoes, explog];
