// Matemática — Números e operações (matemática básica).
// Cada modelo gera um enunciado diferente; o gabarito é calculado pelo próprio código.
import { arred, expl, fracao, mdc, mmc, nome, nomes, num, reais, sup } from './util.mjs';

const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const fr = fracao;

const facil = [
  // 1. soma de frações numa receita
  (r) => {
    const [a, b] = r.pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4]]);
    const [c, d] = r.pick([[1, 3], [1, 6], [1, 4], [2, 5], [3, 8]]);
    if (b === d) return facil[0](r);
    return {
      e: `Uma receita de bolo leva ${a}/${b} de xícara de açúcar na massa e mais ${c}/${d} de xícara na cobertura. Quanto de açúcar a receita usa ao todo?`,
      r: `${fr(a * d + c * b, b * d)} de xícara`,
      d: [`${fr(a + c, b + d)} de xícara`, `${fr(a + c, b * d)} de xícara`, `${fr(a * c, b * d)} de xícara`, `${fr(a * d + c * b + 1, b * d)} de xícara`, `${fr(a * d + c * b, b * d * 2)} de xícara`],
      x: expl('soma de frações', `Só dá para somar pedaços do mesmo tamanho, então primeiro igualamos os denominadores (MMC de ${b} e ${d} = ${mmc(b, d)}).`, `${a}/${b} + ${c}/${d} = ${(a * mmc(b, d)) / b}/${mmc(b, d)} + ${(c * mmc(b, d)) / d}/${mmc(b, d)} = ${fr(a * d + c * b, b * d)}.`),
    };
  },
  // 2. fração de uma quantidade (o que sobra)
  (r) => {
    const d = r.pick([3, 4, 5, 6, 8]);
    const n = r.int(1, d - 1);
    if (mdc(n, d) !== 1) return facil[1](r);
    const total = d * r.int(5, 12);
    const parte = (total * n) / d;
    return {
      e: `Em uma escola, ${total} alunos se inscreveram na olimpíada de matemática. Desses, ${n}/${d} são do ensino médio e os demais, do fundamental. Quantos inscritos são do ensino fundamental?`,
      r: total - parte,
      d: [parte, total / d, total - total / d, total - n],
      x: expl('fração de uma quantidade', `Para achar ${n}/${d} de um total, divide-se o total em ${d} partes iguais e pegam-se ${n}.`, `${total} ÷ ${d} = ${total / d}; ${n} × ${total / d} = ${parte} do médio. Fundamental: ${total} − ${parte} = ${total - parte}.`),
    };
  },
  // 3. comparação de frações
  (r) => {
    const pool = r.sample([[2, 3], [3, 5], [5, 8], [4, 7], [7, 10], [5, 9], [3, 4], [7, 12], [5, 6], [4, 9]], 5);
    const [n, d] = pool.reduce((m, f) => (f[0] / f[1] > m[0] / m[1] ? f : m));
    const lojas = ['A', 'B', 'C', 'D', 'E'];
    const textos = pool.map(([a, b], i) => `loja ${lojas[i]}: ${a}/${b} da meta`);
    return {
      e: `Cinco lojas de uma rede informaram que fração da meta mensal já atingiram: ${textos.join('; ')}. Qual loja está mais perto de bater a meta?`,
      r: `Loja ${lojas[pool.findIndex((f) => f[0] === n && f[1] === d)]}`,
      d: lojas.map((l) => `Loja ${l}`),
      x: expl('comparação de frações', 'Para comparar frações com denominadores diferentes, transforme cada uma em número decimal (divida o numerador pelo denominador) ou iguale os denominadores.', pool.map(([a, b]) => `${a}/${b} ≈ ${num(a / b, 3)}`).join('; ') + `. A maior é ${n}/${d}.`),
    };
  },
  // 4. decimais no mercado
  (r) => {
    const kg = r.pick([0.25, 0.4, 0.75, 1.25, 1.5, 0.6]);
    const preco = r.pick([32, 45, 48, 56, 64, 72]);
    const total = arred(kg * preco, 2);
    return {
      e: `No balcão de frios, o queijo custa ${reais(preco)} o quilo. ${nome(r)} pediu ${num(kg * 1000)} gramas. Quanto vai pagar?`,
      r: total,
      d: [arred(preco / kg, 2), arred(kg * 1000 * preco / 100, 2), arred(total * 10, 2), arred(preco - kg * 10, 2)],
      f: reais,
      x: expl('multiplicação de decimais', `Preço por quilo vezes a quantidade em quilos. Primeiro converta: ${num(kg * 1000)} g = ${num(kg)} kg.`, `${num(kg)} × ${reais(preco)} = ${reais(total)}.`),
    };
  },
  // 5. divisão com resto (arredondar para cima)
  (r) => {
    const cap = r.pick([12, 15, 16, 18, 20]);
    const pessoas = cap * r.int(3, 8) + r.int(1, cap - 1);
    const q = Math.floor(pessoas / cap);
    return {
      e: `Uma excursão vai levar ${pessoas} pessoas, e cada van tem ${cap} lugares para passageiros. Qual é o menor número de vans necessário para que ninguém fique para trás?`,
      r: q + 1,
      d: [q, q + 2, pessoas % cap, q - 1],
      x: expl('divisão com resto', 'O quociente diz quantas vans ficam cheias; se sobrar alguém (resto diferente de zero), é preciso mais uma van.', `${pessoas} ÷ ${cap} = ${q}, resto ${pessoas % cap}. Logo, ${q} + 1 = ${q + 1} vans.`),
    };
  },
  // 6. MMC com horários de remédios
  (r) => {
    const [a, b] = r.pick([[4, 6], [6, 8], [8, 12], [6, 10], [4, 10], [6, 9]]);
    const h0 = r.pick([6, 7, 8]);
    const m = mmc(a, b);
    const fmt = (h) => `${(h0 + h) % 24}h${h0 + h >= 24 ? ' do dia seguinte' : ''}`;
    return {
      e: `Um paciente toma um remédio a cada ${a} horas e outro a cada ${b} horas. Às ${h0}h ele tomou os dois juntos. Qual é o próximo horário em que vai tomar os dois ao mesmo tempo?`,
      r: fmt(m),
      d: [fmt(a * b), fmt(a + b), fmt(m * 2), fmt(mdc(a, b)), fmt(Math.max(a, b))],
      x: expl('MMC', 'Quando duas coisas se repetem em ciclos diferentes, elas voltam a coincidir no mínimo múltiplo comum dos ciclos.', `MMC(${a}, ${b}) = ${m} horas depois das ${h0}h: ${fmt(m)}.`),
    };
  },
  // 7. MDC com kits
  (r) => {
    const g = r.pick([6, 8, 9, 12, 15]);
    let [p, q] = r.pick([[2, 3], [3, 4], [3, 5], [4, 5], [5, 7], [2, 5]]);
    const a = g * p, b = g * q;
    return {
      e: `Uma ONG recebeu ${a} cadernos e ${b} canetas e quer montar kits iguais, com a mesma quantidade de cadernos e a mesma quantidade de canetas em cada um, sem sobrar nada. Qual é o maior número de kits possível?`,
      r: g,
      d: [mmc(a, b), g / (g % 2 === 0 ? 2 : 3), a + b, p + q],
      x: expl('MDC', 'Dividir em grupos iguais, o maior número possível, sem sobra, é trabalho para o máximo divisor comum.', `MDC(${a}, ${b}) = ${g} kits, cada um com ${p} cadernos e ${q} canetas.`),
    };
  },
  // 8. expressão numérica pura
  (r) => {
    const b = r.pick([2, 3, 4]), c = r.pick([2, 4, 6]);
    const a = (b + c) * r.int(2, 6);
    const d = r.int(2, 5), e2 = r.int(2, 4);
    const certo = (a / (b + c)) * d - e2 * e2;
    return {
      e: `Calcule o valor de ${a} ÷ (${b} + ${c}) × ${d} − ${e2}².`,
      r: certo,
      d: [a / ((b + c) * d) - e2 * e2, (a / (b + c)) * d - 2 * e2, a / b + c * d - e2 * e2, (a / (b + c)) * (d - e2 * e2)],
      x: expl('ordem das operações', 'A regra do jogo: parênteses, depois potências, depois multiplicação e divisão (da esquerda para a direita), e por último soma e subtração.', `(${b} + ${c}) = ${b + c}; ${e2}² = ${e2 * e2}; ${a} ÷ ${b + c} = ${a / (b + c)}; × ${d} = ${(a / (b + c)) * d}; − ${e2 * e2} = ${certo}.`),
    };
  },
  // 9. propriedades de potências
  (r) => {
    const base = r.pick([2, 3, 5, 10]);
    const m = r.int(3, 7), n = r.int(2, 5), k = r.int(m + n - 4, m + n - 1);
    const exp = m + n - k;
    return {
      e: `Qual é o valor de (${base}${sup(m)} · ${base}${sup(n)}) ÷ ${base}${sup(k)}?`,
      r: base ** exp,
      d: [base * exp, base ** (exp + 1), base ** (exp - 1), exp, base + exp, base ** exp * 2],
      x: expl('propriedades das potências', 'Na multiplicação de mesma base, somam-se os expoentes; na divisão, subtraem-se.', `${base}${sup(m)} · ${base}${sup(n)} = ${base}${sup(m + n)}; ÷ ${base}${sup(k)} = ${base}${sup(exp)} = ${num(base ** exp)}.`),
    };
  },
  // 10. notação científica (números grandes)
  (r) => {
    const [txt, mant, e] = r.pick([
      ['A distância média da Terra ao Sol é de cerca de 150 000 000 km', 1.5, 8],
      ['O Brasil tem cerca de 203 000 000 habitantes, segundo o Censo 2022', 2.03, 8],
      ['A velocidade da luz é de aproximadamente 300 000 000 m/s', 3, 8],
      ['Um ano tem aproximadamente 31 500 000 segundos', 3.15, 7],
      ['O coração de um adulto bate cerca de 2 800 000 000 vezes ao longo de 70 anos', 2.8, 9],
    ]);
    const f = (k, m = mant) => `${num(m)} × 10${sup(k)}`;
    return {
      e: `${txt}. Em notação científica, esse número é escrito como:`,
      r: f(e),
      d: [f(e - 1), f(e + 1), f(-e), f(e - 2), f(e + 2)],
      x: expl('notação científica', 'O número fica entre 1 e 10, multiplicado por uma potência de 10. O expoente é quantas casas a vírgula "andou" para a esquerda.', `A vírgula anda ${e} casas: ${f(e)}.`),
    };
  },
  // 11. raiz quadrada no terreno
  (r) => {
    const lado = r.pick([12, 15, 18, 20, 25, 30, 35, 40]);
    const area = lado * lado;
    const voltas = r.pick([2, 3]);
    return {
      e: `Um terreno quadrado tem ${num(area)} m² de área. O dono quer cercá-lo com ${voltas} voltas de arame. Quantos metros de arame vai usar?`,
      r: 4 * lado * voltas,
      d: [4 * lado, area * voltas, lado * voltas, 2 * lado * voltas, (area / 4) * voltas],
      f: (v) => `${num(v)} m`,
      x: expl('raiz quadrada', 'Em um quadrado, área = lado². A raiz quadrada da área devolve o lado; a cerca acompanha o perímetro (4 lados).', `√${area} = ${lado} m; perímetro = 4 × ${lado} = ${4 * lado} m; ${voltas} voltas = ${4 * lado * voltas} m.`),
    };
  },
  // 12. divisibilidade (algarismo que falta)
  (r) => {
    const div = r.pick([3, 9]);
    const a = r.int(1, 9), c = r.int(0, 9), d = r.int(0, 9);
    const soma = a + c + d;
    const opcoes = [...Array(10).keys()].filter((x) => (soma + x) % div === 0);
    if (opcoes.length !== 1) return facil[11](r);
    const x = opcoes[0];
    return {
      e: `O número de quatro algarismos ${a}□${c}${d} é divisível por ${div}. Qual algarismo deve ocupar o lugar do quadradinho?`,
      r: x,
      d: [...Array(10).keys()].filter((y) => y !== x),
      x: expl(`critério de divisibilidade por ${div}`, `Um número é divisível por ${div} quando a soma dos algarismos é múltiplo de ${div}.`, `${a} + ${c} + ${d} = ${soma}. Falta ${x} para chegar a ${soma + x}, que é múltiplo de ${div}.`),
    };
  },
  // 13. números negativos (temperatura)
  (r) => {
    const t0 = -r.int(2, 8), sobe = r.int(6, 14), desce = r.int(3, 9);
    const t = t0 + sobe - desce;
    const cidade = r.pick(['Urupema (SC)', 'São Joaquim (SC)', 'Monte Verde (MG)', 'Campos do Jordão (SP)']);
    return {
      e: `Em uma madrugada de inverno em ${cidade}, os termômetros marcavam ${t0} °C às 6h. Até o meio-dia a temperatura subiu ${sobe} °C e, até a meia-noite, caiu ${desce} °C. Qual era a temperatura à meia-noite?`,
      r: `${num(t)} °C`,
      d: [`${num(-t0 + sobe - desce)} °C`, `${num(t0 - sobe + desce)} °C`, `${num(t0 + sobe + desce)} °C`, `${num(t + 2)} °C`, `${num(t - 2)} °C`],
      x: expl('soma de números inteiros', 'Subir é somar e descer é subtrair, começando do valor negativo.', `${t0} + ${sobe} = ${t0 + sobe}; ${t0 + sobe} − ${desce} = ${t}.`),
    };
  },
  // 14. fração de fração
  (r) => {
    const [a, b] = r.pick([[3, 4], [2, 3], [5, 6], [4, 5]]);
    const [c, d] = r.pick([[1, 2], [1, 3], [2, 3], [3, 4]]);
    return {
      e: `Sobrou ${a}/${b} de uma pizza. No lanche da tarde, ${nome(r)} comeu ${c}/${d} do que tinha sobrado. Que fração da pizza inteira foi comida no lanche?`,
      r: fr(a * c, b * d),
      d: [fr(a + c, b + d), fr(a - c > 0 ? a - c : c - a || 1, b * d), fr(a * d, b * c), fr(a * c + 1, b * d), fr(c, d)],
      x: expl('fração de fração', 'A palavra "de" entre frações vira multiplicação: numerador vezes numerador, denominador vezes denominador.', `${c}/${d} de ${a}/${b} = ${a * c}/${b * d} = ${fr(a * c, b * d)}.`),
    };
  },
  // 15. decimal para fração
  (r) => {
    const [dec, n, d] = r.pick([[0.375, 3, 8], [0.625, 5, 8], [0.875, 7, 8], [0.45, 9, 20], [0.35, 7, 20], [0.24, 6, 25], [0.125, 1, 8], [0.68, 17, 25]]);
    return {
      e: `Em uma pesquisa, a proporção de funcionários de uma empresa que usam transporte público foi ${num(dec, String(dec).split('.')[1].length)}. Que fração irredutível representa essa proporção?`,
      r: `${n}/${d}`,
      d: [`${n}/${d * 10}`, `${n + 1}/${d}`, `${n}/${d + 1}`, `${n * 2 + 1}/${d * 2}`, `${n}/${d - 1}`],
      x: expl('decimal para fração', 'Escreva o número sem vírgula sobre 10, 100 ou 1 000 (conforme as casas decimais) e simplifique dividindo pelo MDC.', `${num(dec, String(dec).split('.')[1].length)} = ${Math.round(dec * 1000)}/1000 = ${n}/${d}.`),
    };
  },
];
facil[1].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. salário com frações sucessivas
  (r) => {
    const [a, b] = r.pick([[1, 3], [1, 4], [2, 5], [1, 5], [3, 10]]);
    const [c, d] = r.pick([[1, 4], [1, 2], [1, 3], [2, 5]]);
    const lcm = mmc(b, d);
    const s = lcm * r.int(2, 6) * 100;
    const sobra = arred((s * (b - a) * (d - c)) / (b * d), 2);
    return {
      e: `${nome(r)} gastou ${a}/${b} do salário com aluguel e ${c}/${d} do que restou com alimentação. Sobraram ${reais(sobra)}. Qual é o salário?`,
      r: s,
      d: [arred(sobra / (1 - a / b - c / d), 2), sobra * 2, arred(sobra / (1 - c / d), 2), arred(sobra / (1 - a / b), 2), s + sobra, s - sobra, s * 2],
      f: reais,
      x: expl('fração do que restou', 'Atenção ao "do que restou": a segunda fração é aplicada sobre a sobra, não sobre o salário inteiro.', `Após o aluguel resta ${b - a}/${b}; após a alimentação resta ${d - c}/${d} disso = ${fr((b - a) * (d - c), b * d)} do salário. Salário = ${reais(sobra)} ÷ ${fr((b - a) * (d - c), b * d)} = ${reais(s)}.`),
    };
  },
  // 2. dia da semana
  (r) => {
    const hoje = r.int(0, 6), n = r.int(40, 400);
    const alvo = (hoje + n) % 7;
    return {
      e: `Hoje é ${DIAS[hoje]}. Uma encomenda vai chegar daqui a exatamente ${n} dias. Em que dia da semana ela vai chegar?`,
      r: DIAS[alvo],
      d: DIAS.filter((_, i) => i !== alvo),
      x: expl('resto da divisão', 'Os dias da semana se repetem de 7 em 7. Semanas completas não mudam o dia; só o resto importa.', `${n} = 7 × ${Math.floor(n / 7)} + ${n % 7}. Avançando ${n % 7} dia(s) a partir de ${DIAS[hoje]}: ${DIAS[alvo]}.`),
    };
  },
  // 3. dízima periódica simples
  (r) => {
    const ab = r.pick([12, 15, 18, 21, 24, 27, 36, 45, 54, 63, 72, 81]);
    const s = String(ab);
    return {
      e: `A fração geratriz da dízima periódica 0,${s}${s}${s}... é:`,
      r: fr(ab, 99),
      d: [fr(ab, 100), fr(ab, 90), fr(ab, 9), fr(ab + 1, 99), fr(ab, 999)],
      x: expl('fração geratriz', 'Em uma dízima simples, o período vai no numerador e, no denominador, um 9 para cada algarismo do período.', `0,${s}... = ${ab}/99 = ${fr(ab, 99)}.`),
    };
  },
  // 4. número de divisores
  (r) => {
    const a = r.int(1, 5), b = r.int(1, 3), c = r.int(0, 2);
    const n = 2 ** a * 3 ** b * 5 ** c;
    const certo = (a + 1) * (b + 1) * (c + 1);
    return {
      e: `Um professor quer dividir ${n} folhas em pacotes iguais, sem sobras, e pode escolher qualquer quantidade de folhas por pacote (inclusive 1 pacote com todas, ou pacotes de 1 folha). Sabendo que ${n} = 2${sup(a)} · 3${sup(b)}${c ? ' · 5' + sup(c) : ''}, quantas escolhas diferentes ele tem?`,
      r: certo,
      d: [a * b * Math.max(c, 1), a + b + c, a + b + c + 3, certo - 1, certo * 2],
      x: expl('número de divisores', 'Cada tamanho de pacote possível é um divisor do total. Na fatoração em primos, some 1 a cada expoente e multiplique.', `(${a}+1)(${b}+1)${c ? `(${c}+1)` : ''} = ${certo} divisores.`),
    };
  },
  // 5. potências em bases diferentes
  (r) => {
    const m = r.int(2, 9), n = r.int(1, 5), k = r.int(1, 4);
    const exp = m + 2 * n - 3 * k;
    const f = (x) => `2${sup(x)}`;
    return {
      e: `Simplificando a expressão (2${sup(m)} · 4${sup(n)}) ÷ 8${sup(k)}, obtemos:`,
      r: f(exp),
      d: [f(m + n - k), f(m * 2 * n - 3 * k), f(exp + 1), f(exp - 1), f(m + 2 * n + 3 * k)],
      x: expl('mudança para a mesma base', 'As regras das potências só funcionam com a mesma base. Escreva 4 e 8 como potências de 2.', `4${sup(n)} = 2${sup(2 * n)} e 8${sup(k)} = 2${sup(3 * k)}. Então 2${sup(m)} · 2${sup(2 * n)} ÷ 2${sup(3 * k)} = 2${sup(exp)}.`),
    };
  },
  // 6. reservatório com frações
  (r) => {
    const [a, b] = r.pick([[1, 4], [2, 5], [1, 3], [3, 8]]);
    const [c, d] = r.pick([[5, 6], [7, 8], [3, 4], [9, 10]]);
    if (c / d <= a / b) return medio[5](r);
    const dif = c * mmc(b, d) / d - a * mmc(b, d) / b;
    const cap = mmc(b, d) * r.int(20, 60);
    const litros = (cap * dif) / mmc(b, d);
    return {
      e: `Uma caixa-d'água estava com ${a}/${b} da capacidade. Depois de receber ${num(litros)} litros, ficou com ${c}/${d} da capacidade. Qual é a capacidade total da caixa?`,
      r: cap,
      d: [Math.round((litros * d) / c), (litros * b) / a, cap * 2, cap / 2, cap + litros],
      f: (v) => `${num(v)} L`,
      x: expl('fração como parte de um todo', `Os ${num(litros)} litros correspondem à diferença entre as frações.`, `${c}/${d} − ${a}/${b} = ${fr(dif, mmc(b, d))}. Se ${fr(dif, mmc(b, d))} da caixa = ${num(litros)} L, a caixa toda = ${num(litros)} ÷ ${fr(dif, mmc(b, d))} = ${num(cap)} L.`),
    };
  },
  // 7. produto em notação científica
  (r) => {
    const a = r.pick([2, 3, 4, 5, 6]), b = r.pick([2, 3, 4, 5]);
    const p = r.int(3, 8), q = -r.int(2, 9);
    let m = a * b, e = p + q;
    if (m >= 10) { m /= 10; e += 1; }
    if (m === 1 || e === 0) return medio[6](r);
    const f = (mm, ee) => `${num(mm)} × 10${sup(ee)}`;
    return {
      e: `Calcule (${a} × 10${sup(p)}) · (${b} × 10${sup(q)}) e escreva o resultado em notação científica.`,
      r: f(m, e),
      d: [f(m, p - q), f(a * b, p + q + 1), f(m, e + 1), f(m, e - 1), f(m, p * q)],
      x: expl('notação científica', 'Multiplique as partes numéricas e some os expoentes; no fim, ajuste para o número ficar entre 1 e 10.', `${a} × ${b} = ${a * b}; 10${sup(p)} · 10${sup(q)} = 10${sup(p + q)}. ${a * b} × 10${sup(p + q)} = ${f(m, e)}.`),
    };
  },
  // 8. piso com MDC
  (r) => {
    const g = r.pick([20, 25, 30, 40, 50]);
    const [p, q] = r.pick([[3, 4], [4, 5], [5, 6], [5, 7], [6, 7], [7, 8]]);
    const a = g * p, b = g * q;
    return {
      e: `Uma sala retangular mede ${num(a / 100)} m por ${num(b / 100)} m. Ela será coberta com placas quadradas iguais, as maiores possíveis, sem cortes. Quantas placas serão usadas?`,
      r: p * q,
      d: [(a * b) / 10000, p + q, 2 * (p + q), p * q * 2, (p + 1) * (q + 1)],
      x: expl('MDC', 'O lado da maior placa quadrada que cabe exatamente nas duas medidas é o MDC delas (trabalhe em centímetros).', `MDC(${a}, ${b}) = ${g} cm. Cabem ${a} ÷ ${g} = ${p} placas em uma direção e ${b} ÷ ${g} = ${q} na outra: ${p} × ${q} = ${p * q} placas.`),
    };
  },
  // 9. expressão com frações (pura)
  (r) => {
    const [a, b] = r.pick([[1, 2], [2, 3], [3, 4], [1, 3]]);
    const [c, d] = r.pick([[1, 3], [1, 6], [1, 4], [1, 5]]);
    const [e1, f1] = r.pick([[5, 6], [3, 4], [7, 8], [2, 3]]);
    const [g1, h1] = r.pick([[1, 4], [1, 3], [1, 2], [1, 6]]);
    const num1 = a * d + c * b, den1 = b * d;
    const num2 = e1 * h1 - g1 * f1, den2 = f1 * h1;
    if (num2 <= 0 || b === d) return medio[8](r);
    return {
      e: `Qual é o valor de (${a}/${b} + ${c}/${d}) ÷ (${e1}/${f1} − ${g1}/${h1})?`,
      r: fr(num1 * den2, den1 * num2),
      d: [fr(num1 * num2, den1 * den2), fr(den1 * num2, num1 * den2), fr(a + c, b + d), fr(num1 * den2, den1 * num2 * 2), fr(num1 * den2 * 2, den1 * num2), fr(num1 + num2, den1 + den2)],
      x: expl('operações com frações', 'Resolva cada parêntese (igualando denominadores) e depois divida: dividir por uma fração é multiplicar pelo inverso dela.', `${a}/${b} + ${c}/${d} = ${fr(num1, den1)}; ${e1}/${f1} − ${g1}/${h1} = ${fr(num2, den2)}; ${fr(num1, den1)} × ${fr(den2, num2)} = ${fr(num1 * den2, den1 * num2)}.`),
    };
  },
  // 10. radicais semelhantes
  (r) => {
    const base = r.pick([2, 3, 5]);
    const [x, y, z] = r.sample([2, 3, 4, 5], 3);
    const certo = x + y - z;
    if (certo <= 0) return medio[9](r);
    const f = (k) => (k === 1 ? `√${base}` : `${k}√${base}`);
    return {
      e: `Simplifique: √${x * x * base} + √${y * y * base} − √${z * z * base}.`,
      r: f(certo),
      d: [`√${(x * x + y * y - z * z) * base}`, f(x + y + z), f(certo + 1), f(x * y - z), `${certo}√${base * 2}`],
      x: expl('simplificação de radicais', `Tire do radical os fatores que são quadrados perfeitos; depois some os termos com o mesmo √${base}, como se fossem "objetos iguais".`, `√${x * x * base} = ${x}√${base}; √${y * y * base} = ${y}√${base}; √${z * z * base} = ${z}√${base}. ${x} + ${y} − ${z} = ${certo}, então ${f(certo)}.`),
    };
  },
  // 11. herança em frações
  (r) => {
    const [a, b] = r.pick([[1, 3], [1, 4], [2, 5]]);
    const [c, d] = r.pick([[1, 4], [1, 6], [1, 5], [1, 3]]);
    const resto = 1 - a / b - c / d;
    if (resto <= 0 || b === d) return medio[10](r);
    const den = mmc(b, d);
    const total = den * r.int(4, 12) * 1000;
    const valor = Math.round(total * resto);
    const [p1, p2, p3] = nomes(r, 3);
    return {
      e: `Um prêmio foi dividido entre três amigos: ${p1} ficou com ${a}/${b}, ${p2} com ${c}/${d} e ${p3} com o restante, que foi ${reais(valor)}. Qual era o valor total do prêmio?`,
      r: total,
      d: [valor * 3, total + valor, total - valor, total * 2, total / 2, valor * b],
      f: reais,
      x: expl('soma de frações e parte do todo', 'Some as frações conhecidas e veja quanto falta para o inteiro (1). Essa fração restante vale o valor dado.', `${a}/${b} + ${c}/${d} = ${fr(a * d + c * b, b * d)}; resta ${fr(b * d - a * d - c * b, b * d)}. Total = ${reais(valor)} ÷ ${fr(b * d - a * d - c * b, b * d)} = ${reais(total)}.`),
    };
  },
  // 12. padrão que se repete
  (r) => {
    const padrao = r.pick(['AZUL-VERDE-AMARELO-BRANCO', 'DÓ-RÉ-MI-FÁ-SOL', 'VERMELHO-PRETO-BRANCO', 'NORTE-LESTE-SUL-OESTE']).split('-');
    const n = r.int(50, 300);
    const k = padrao.length;
    const certo = padrao[(n - 1) % k];
    const textoPadrao = padrao.map((p) => p.toLowerCase()).join(', ');
    return {
      e: `Uma fileira de bandeirinhas segue sempre a mesma sequência de cores/símbolos: ${textoPadrao}, ${textoPadrao}, ... Qual é o item que ocupa a posição ${n}?`,
      r: certo.toLowerCase(),
      d: [...padrao.filter((p) => p !== certo).map((p) => p.toLowerCase()), 'não é possível saber', 'o primeiro item da sequência repetido duas vezes'],
      x: expl('resto da divisão', `A sequência tem ${k} itens e se repete. Divida a posição por ${k}: o resto diz o lugar dentro do bloco (resto 0 = último item).`, `${n} ÷ ${k} = ${Math.floor(n / k)}, resto ${n % k}. Posição ${n % k || k} do bloco: ${certo.toLowerCase()}.`),
    };
  },
  // 13. consumo de combustível (divisão de decimais)
  (r) => {
    const kmL = r.pick([10.5, 11.5, 12.5, 13.5, 14.5]);
    const litros = r.int(12, 30);
    const dist = arred(kmL * litros, 1);
    const preco = r.pick([5.8, 6.1, 6.25, 5.95]);
    return {
      e: `Um carro faz ${num(kmL)} km por litro de gasolina. Em uma viagem de ${num(dist)} km, com a gasolina a ${reais(preco)} o litro, quanto se gasta com combustível?`,
      r: arred(litros * preco, 2),
      d: [arred(dist * preco / 10, 2), arred(dist / preco, 2), arred(litros * preco * 1.1, 2), arred(kmL * preco, 2)],
      f: reais,
      x: expl('divisão e multiplicação de decimais', 'Primeiro descubra quantos litros a viagem consome (distância ÷ consumo); depois multiplique pelo preço do litro.', `${num(dist)} ÷ ${num(kmL)} = ${litros} L; ${litros} × ${reais(preco)} = ${reais(litros * preco)}.`),
    };
  },
  // 14. números consecutivos
  (r) => {
    const n = r.int(15, 80);
    const k = r.pick([3, 4, 5]);
    const soma = (k * (2 * n + k - 1)) / 2;
    return {
      e: `A soma de ${k} números inteiros consecutivos é ${soma}. Qual é o maior deles?`,
      r: n + k - 1,
      d: [n, n + k, Math.round(soma / k), n + k - 2],
      x: expl('média de números consecutivos', `Em números consecutivos, a média fica no meio da lista. Soma ÷ quantidade dá a média; a partir dela, conte para cima.`, `Os números são ${Array.from({ length: k }, (_, i) => n + i).join(', ')} (soma ${soma}). O maior é ${n + k - 1}.`),
    };
  },
  // 15. comparação de preços por unidade
  (r) => {
    const g1 = r.pick([200, 250, 300]), p1 = r.pick([4.5, 5.2, 6.3]);
    const g2 = r.pick([500, 750, 1000]), p2 = arred((p1 / g1) * g2 * r.pick([0.85, 0.9, 1.08, 1.15]), 2);
    const u1 = (p1 / g1) * 100, u2 = (p2 / g2) * 100;
    const melhor = u1 < u2 ? 'A embalagem menor' : 'A embalagem maior';
    return {
      e: `Um café é vendido em duas embalagens: ${g1} g por ${reais(p1)} e ${g2} g por ${reais(p2)}. Qual opção sai mais barata por grama, e quanto custam 100 g nela?`,
      r: `${melhor}: ${reais(Math.min(u1, u2))} cada 100 g`,
      d: [`${u1 < u2 ? 'A embalagem maior' : 'A embalagem menor'}: ${reais(Math.max(u1, u2))} cada 100 g`, `${melhor}: ${reais(Math.max(u1, u2))} cada 100 g`, `As duas custam o mesmo por grama`, `${u1 < u2 ? 'A embalagem maior' : 'A embalagem menor'}: ${reais(Math.min(u1, u2))} cada 100 g`, `${melhor}: ${reais(Math.min(u1, u2) * 2)} cada 100 g`],
      x: expl('preço por unidade', 'Para comparar embalagens de tamanhos diferentes, calcule o preço da mesma quantidade (por exemplo, 100 g) em cada uma.', `Menor: ${reais(p1)} ÷ ${g1} × 100 = ${reais(u1)}. Maior: ${reais(p2)} ÷ ${g2} × 100 = ${reais(u2)}.`),
    };
  },
];
medio[1].vezes = 2;
medio[13].vezes = 2;

const dificil = [
  // 1. algarismo das unidades
  (r) => {
    const base = r.pick([2, 3, 7, 8]);
    const n = r.int(50, 2030);
    const ciclo = [];
    let v = base % 10;
    do { ciclo.push(v); v = (v * base) % 10; } while (v !== ciclo[0]);
    const certo = ciclo[(n - 1) % ciclo.length];
    return {
      e: `Qual é o algarismo das unidades de ${base}${sup(n)}?`,
      r: certo,
      d: [...ciclo.filter((x) => x !== certo), 0, 5, 1, 9],
      x: expl('ciclos de potências', `Não dá para calcular ${base}${sup(n)}, mas o último algarismo das potências de ${base} se repete no ciclo (${ciclo.join(', ')}), de ${ciclo.length} em ${ciclo.length}.`, `${n} dividido por ${ciclo.length} deixa resto ${n % ciclo.length}, que corresponde à posição ${n % ciclo.length || ciclo.length} do ciclo: ${certo}.`),
    };
  },
  // 2. inclusão-exclusão
  (r) => {
    const [a, b] = r.pick([[2, 3], [3, 5], [4, 6], [2, 5], [3, 4], [6, 9], [4, 10]]);
    const n = r.int(10, 50) * 10;
    const m = mmc(a, b);
    const certo = Math.floor(n / a) + Math.floor(n / b) - Math.floor(n / m);
    return {
      e: `Quantos números inteiros de 1 a ${n} são múltiplos de ${a} ou de ${b}?`,
      r: certo,
      d: [Math.floor(n / a) + Math.floor(n / b), Math.floor(n / m), Math.floor(n / a) + Math.floor(n / b) - 2 * Math.floor(n / m), n - certo],
      x: expl('princípio da inclusão-exclusão', `Quem é múltiplo dos dois (múltiplo de ${m}) foi contado duas vezes; desconte uma vez.`, `${Math.floor(n / a)} + ${Math.floor(n / b)} − ${Math.floor(n / m)} = ${certo}.`),
    };
  },
  // 3. resto de potência
  (r) => {
    const [base, mod] = r.pick([[2, 7], [3, 7], [2, 5], [3, 5], [4, 7]]);
    const n = r.int(30, 500);
    const ciclo = [];
    let v = base % mod;
    do { ciclo.push(v); v = (v * base) % mod; } while (v !== ciclo[0]);
    const certo = ciclo[(n - 1) % ciclo.length];
    return {
      e: `Qual é o resto da divisão de ${base}${sup(n)} por ${mod}?`,
      r: certo,
      d: [...Array(mod).keys()].filter((x) => x !== certo).concat([mod]),
      x: expl('ciclos de restos', `Os restos de ${base}¹, ${base}², ${base}³... por ${mod} se repetem: (${ciclo.join(', ')}), período ${ciclo.length}.`, `${n} = ${ciclo.length} × ${Math.floor(n / ciclo.length)} + ${n % ciclo.length}; o resto procurado é ${certo}.`),
    };
  },
  // 4. três luzes (MMC de três)
  (r) => {
    const [a, b, c] = r.pick([[12, 18, 30], [15, 20, 25], [8, 12, 20], [10, 15, 24], [6, 14, 21], [9, 12, 15]]);
    const m = mmc(mmc(a, b), c);
    const fmt = (v) => (v >= 60 ? `${Math.floor(v / 60)} min${v % 60 ? ` ${v % 60} s` : ''}` : `${v} s`);
    return {
      e: `Três luzes de um painel piscam, respectivamente, a cada ${a}, ${b} e ${c} segundos. Se elas piscaram juntas agora, daqui a quanto tempo piscarão juntas novamente?`,
      r: m,
      d: [a * b * c, mmc(a, b), mdc(mdc(a, b), c), a + b + c, m * 2],
      f: fmt,
      x: expl('MMC de três números', 'Fatore os três números e pegue cada primo com o maior expoente que aparece.', `MMC(${a}, ${b}, ${c}) = ${m} s = ${fmt(m)}.`),
    };
  },
  // 5. menor número com mesmo resto
  (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [4, 6, 9], [5, 6, 8], [6, 8, 10], [4, 5, 6]]);
    const resto = r.int(1, Math.min(a, b, c) - 1);
    const m = mmc(mmc(a, b), c);
    const extra = r.pick([0, 1]);
    const coisa = r.pick(['figurinhas', 'bolinhas de gude', 'livros', 'tampinhas']);
    return {
      e: `${nome(r)} tem uma coleção de ${coisa}${extra ? ' (mais de ' + m + ')' : ''}. Contando de ${a} em ${a}, de ${b} em ${b} ou de ${c} em ${c}, sempre ${resto === 1 ? 'sobra 1' : `sobram ${resto}`}. Qual é o menor número possível de ${coisa} da coleção?`,
      r: m * (1 + extra) + resto,
      d: [m * (1 + extra), m * (1 + extra) - resto, a * b * c + resto, m * (2 + extra) + resto, mmc(a, b) + resto],
      x: expl('MMC com resto', `Se sempre sobra(m) ${resto}, então (total − ${resto}) é múltiplo comum de ${a}, ${b} e ${c}.`, `MMC = ${m}.${extra ? ` Como a coleção tem mais de ${m}, use o próximo múltiplo, ${2 * m}.` : ''} Total = ${m * (1 + extra)} + ${resto} = ${m * (1 + extra) + resto}.`),
    };
  },
  // 6. zeros no fim do fatorial
  (r) => {
    const n = r.int(26, 140);
    const z = Math.floor(n / 5) + Math.floor(n / 25) + Math.floor(n / 125);
    return {
      e: `Com quantos zeros termina o número ${n}! (o produto 1 × 2 × 3 × ... × ${n})?`,
      r: z,
      d: [Math.floor(n / 5), Math.floor(n / 10), z + 1, Math.floor(n / 2), z - 1],
      x: expl('fatoração', 'Cada zero no fim vem de um fator 10 = 2 × 5. Fatores 2 sobram; conte os fatores 5 (múltiplos de 25 dão dois 5, de 125 dão três).', `⌊${n}/5⌋ + ⌊${n}/25⌋ + ⌊${n}/125⌋ = ${Math.floor(n / 5)} + ${Math.floor(n / 25)} + ${Math.floor(n / 125)} = ${z}.`),
    };
  },
  // 7. soma telescópica
  (r) => {
    const n = r.int(9, 99);
    return {
      e: `Calcule a soma 1/(1·2) + 1/(2·3) + 1/(3·4) + ... + 1/(${n}·${n + 1}).`,
      r: fr(n, n + 1),
      d: [fr(1, n + 1), fr(n - 1, n), fr(n + 1, n + 2), fr(n, n + 2), fr(1, n)],
      x: expl('decomposição de frações', 'Cada parcela pode ser escrita como 1/k − 1/(k+1). Na soma, quase tudo se cancela ("efeito sanfona").', `(1 − 1/2) + (1/2 − 1/3) + ... + (1/${n} − 1/${n + 1}) = 1 − 1/${n + 1} = ${fr(n, n + 1)}.`),
    };
  },
  // 8. comparar potências
  (r) => {
    const k = r.pick([10, 12, 15, 20]);
    const [ea, eb, ec] = [k * 3, k * 2, k];
    const opcoes = [
      { t: `2${sup(ea)}`, v: Math.log(2) * ea },
      { t: `3${sup(eb)}`, v: Math.log(3) * eb },
      { t: `5${sup(ec)}`, v: Math.log(5) * ec },
    ].sort((x, y) => y.v - x.v);
    return {
      e: `Considere os números A = 2${sup(ea)}, B = 3${sup(eb)} e C = 5${sup(ec)}. A ordem correta é:`,
      r: `${opcoes[2].t} < ${opcoes[1].t} < ${opcoes[0].t}`,
      d: [`${opcoes[0].t} < ${opcoes[1].t} < ${opcoes[2].t}`, `${opcoes[1].t} < ${opcoes[2].t} < ${opcoes[0].t}`, `${opcoes[2].t} < ${opcoes[0].t} < ${opcoes[1].t}`, `${opcoes[0].t} < ${opcoes[2].t} < ${opcoes[1].t}`, 'os três números são iguais'],
      x: expl('expoente comum', `Escreva todos com o mesmo expoente ${k}: (aᵐ)ⁿ = aᵐⁿ.`, `2${sup(ea)} = 8${sup(k)}, 3${sup(eb)} = 9${sup(k)}, 5${sup(ec)} = 5${sup(k)}. Como 5 < 8 < 9: ${opcoes[2].t} < ${opcoes[1].t} < ${opcoes[0].t}.`),
    };
  },
  // 9. número de algarismos de 2^a·5^b
  (r) => {
    const b = r.int(8, 20), extra = r.int(2, 6);
    const a = b + extra;
    const resto = 2 ** extra;
    const digitos = String(resto).length + b;
    return {
      e: `Quantos algarismos tem o número N = 2${sup(a)} · 5${sup(b)}?`,
      r: digitos,
      d: [a + b, b, a, digitos + 1, digitos - 1],
      x: expl('agrupar 2 × 5 = 10', 'Cada par (2 · 5) forma um 10, que só acrescenta um zero ao final.', `N = 2${sup(extra)} · (2 · 5)${sup(b)} = ${resto} · 10${sup(b)}: o número ${resto} seguido de ${b} zeros, com ${digitos} algarismos.`),
    };
  },
  // 10. MDC e MMC (produto)
  (r) => {
    const g = r.pick([2, 3, 4, 5, 6]);
    const [p, q] = r.pick([[3, 4], [2, 5], [3, 5], [4, 7], [5, 6]]);
    const a = g * p, b = g * q;
    const L = g * p * q;
    return {
      e: `Dois números naturais têm MDC igual a ${g} e MMC igual a ${L}. Se um deles é ${a}, qual é o outro?`,
      r: b,
      d: [L / g, L - a, g * q * 2, a + g, L / a],
      x: expl('relação MDC × MMC', 'Para dois números, MDC × MMC = produto dos números.', `${g} × ${L} = ${a} × x ⇒ x = ${g * L} ÷ ${a} = ${b}.`),
    };
  },
  // 11. dízima composta
  (r) => {
    const a = r.int(1, 8), b = r.int(1, 9);
    if (a === b) return dificil[10](r);
    const numr = a * 10 + b - a;
    return {
      e: `A dízima periódica composta 0,${a}${b}${b}${b}... é igual a:`,
      r: fr(numr, 90),
      d: [fr(a * 10 + b, 99), fr(a * 10 + b, 90), fr(b, 9), fr(numr, 99), fr(a * 10 + b - b, 90)],
      x: expl('geratriz de dízima composta', 'Numerador: (parte antes do período + período) menos a parte que não se repete. Denominador: um 9 para cada algarismo do período e um 0 para cada algarismo do anteperíodo.', `(${a}${b} − ${a}) / 90 = ${numr}/90 = ${fr(numr, 90)}.`),
    };
  },
  // 12. fração contínua
  (r) => {
    const k = r.int(2, 6);
    // 1 + 1/(1 + 1/k) = 1 + k/(k+1) = (2k+1)/(k+1); then 1 + 1/(that) = 1 + (k+1)/(2k+1) = (3k+2)/(2k+1)
    return {
      e: `Calcule o valor de 1 + 1/(1 + 1/(1 + 1/${k})).`,
      r: fr(3 * k + 2, 2 * k + 1),
      d: [fr(2 * k + 1, k + 1), fr(3 * k + 1, 2 * k + 1), fr(k + 3, k), fr(2 * k + 1, 3 * k + 2), fr(3 * k + 2, 2 * k)],
      x: expl('resolver de dentro para fora', 'Em frações "empilhadas", comece pelo andar mais baixo e vá subindo, uma divisão de cada vez.', `1 + 1/${k} = ${fr(k + 1, k)}; 1 + 1/(${fr(k + 1, k)}) = 1 + ${fr(k, k + 1)} = ${fr(2 * k + 1, k + 1)}; 1 + 1/(${fr(2 * k + 1, k + 1)}) = 1 + ${fr(k + 1, 2 * k + 1)} = ${fr(3 * k + 2, 2 * k + 1)}.`),
    };
  },
  // 13. tempo de processamento (notação científica)
  (r) => {
    const ops = r.pick([2, 4, 5, 8]) * 10 ** r.int(9, 10);
    const total = ops * r.pick([1800, 3600, 7200, 5400]);
    const seg = total / ops;
    const fmt = (s) => (s >= 3600 ? `${num(s / 3600)} hora${s / 3600 > 1 ? 's' : ''}` : `${num(s / 60)} minutos`);
    const sci = (v) => {
      const e = Math.floor(Math.log10(v));
      return `${num(v / 10 ** e)} × 10${sup(e)}`;
    };
    return {
      e: `Um computador executa ${sci(ops)} operações por segundo. Uma simulação exige ${sci(total)} operações. Quanto tempo o computador leva para terminá-la?`,
      r: fmt(seg),
      d: [fmt(seg * 10), fmt(seg / 10), fmt(seg * 60), fmt(seg / 2), fmt(seg * 2)],
      x: expl('divisão em notação científica', 'Tempo = trabalho total ÷ ritmo. Divida as partes numéricas e subtraia os expoentes.', `${sci(total)} ÷ ${sci(ops)} = ${num(seg)} s = ${fmt(seg)}.`),
    };
  },
  // 14. racionalização
  (r) => {
    const [a, b] = r.pick([[5, 3], [7, 5], [6, 2], [7, 3], [11, 7], [10, 6]]);
    const d = a - b;
    return {
      e: `Racionalizando o denominador de ${d}/(√${a} − √${b}), obtemos:`,
      r: `√${a} + √${b}`,
      d: [`√${a} − √${b}`, `(√${a} + √${b})/${d}`, `${d}(√${a} + √${b})`, `√${a + b}`, `√${a - b}`],
      x: expl('racionalização com conjugado', `Multiplique em cima e embaixo pelo conjugado (√${a} + √${b}); embaixo aparece (√${a})² − (√${b})² = ${a} − ${b}.`, `${d}(√${a} + √${b}) ÷ ${d} = √${a} + √${b}.`),
    };
  },
  // 15. escada de divisões (porcentagem de frações)
  (r) => {
    const total = r.pick([240, 360, 480, 600, 720]);
    const [a, b] = r.pick([[1, 3], [1, 4], [1, 6]]);
    const [c, d] = r.pick([[1, 2], [2, 5], [3, 5]]);
    const passo1 = total * (1 - a / b);
    const passo2 = passo1 * (c / d);
    if (!Number.isInteger(passo1) || !Number.isInteger(passo2)) return dificil[14](r);
    const final = passo1 - passo2;
    return {
      e: `Uma gráfica imprimiu ${total} convites. ${a === 1 ? 'Um' : a}${b === 3 ? ' terço' : b === 4 ? ' quarto' : ' sexto'} deles saiu com defeito e foi descartado. Dos que sobraram, ${c}/${d} já foram entregues. Que fração do total impresso ainda falta entregar?`,
      r: fr(final, total),
      d: [fr(total - total * a / b - total * c / d, total), fr(passo2, total), fr(d - c, d), fr(b - a, b), fr(final + total / 12, total)],
      x: expl('frações sucessivas', 'Acompanhe o que sobra a cada etapa e, no fim, compare com o total.', `Bons: ${total} − ${total * a / b} = ${passo1}. Entregues: ${c}/${d} de ${passo1} = ${passo2}. Faltam ${final}, ou seja, ${final}/${total} = ${fr(final, total)}.`),
    };
  },
];
dificil[0].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '01-numeros-e-operacoes',
    titulo: 'Números e operações',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Frações, decimais, divisão com resto, MMC e MDC, potências, raízes, notação científica e dízimas.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];

