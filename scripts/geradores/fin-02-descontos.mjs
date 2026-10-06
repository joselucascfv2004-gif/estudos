// Matemática financeira — Descontos e sistemas de amortização.
import { arred, expl, num, reais } from './util.mjs';
import NOVOS from './fin-novos-extras.mjs';
import { novos } from './util.mjs';

const pc = (v) => `${num(v)}%`;

const facil = [
  // 1. desconto comercial
  (r) => {
    const N = r.int(2, 40) * 500, d = r.pick([1, 2, 2.5, 3, 4, 5]), t = r.int(1, 6);
    const D = (N * d * t) / 100;
    return {
      e: `Um título de valor nominal ${reais(N)} foi descontado ${t} ${t === 1 ? 'mês' : 'meses'} antes do vencimento, com desconto comercial simples de ${pc(d)} ao mês. Qual foi o valor do desconto?`,
      r: D,
      d: [N - D, (N * d) / 100, D * 2, arred(N / (1 + (d * t) / 100), 2)],
      f: reais,
      x: expl('desconto comercial ("por fora")', 'A taxa incide sobre o valor NOMINAL (o de face do título).', `D = ${num(N)} × ${num(d / 100)} × ${t} = ${reais(D)}.`),
    };
  },
  // 2. valor atual comercial
  (r) => {
    const N = r.int(2, 40) * 500, d = r.pick([2, 3, 4, 5]), t = r.int(2, 5);
    const A = N * (1 - (d * t) / 100);
    return {
      e: `Uma duplicata de ${reais(N)} foi descontada em um banco ${t} meses antes do vencimento, a uma taxa de desconto comercial simples de ${pc(d)} ao mês. Qual foi o valor recebido (valor atual)?`,
      r: A,
      d: [N - A, arred(N / (1 + (d * t) / 100), 2), N * (1 - d / 100), N],
      f: reais,
      x: expl('valor atual = nominal − desconto', 'A = N(1 − d·t).', `${num(N)} × ${num(1 - (d * t) / 100)} = ${reais(A)}.`),
    };
  },
  // 3. amortização SAC
  (r) => {
    const PV = r.int(6, 60) * 1000, n = r.pick([10, 12, 20, 24, 30, 40, 50, 60]);
    return {
      e: `Um financiamento de ${reais(PV)} será pago pelo Sistema de Amortização Constante (SAC) em ${n} parcelas mensais. Qual é o valor de cada amortização?`,
      r: PV / n,
      d: [arred(PV / (n - 1), 2), arred((PV / n) * 1.1, 2), arred(PV / 12, 2), PV * 0.01],
      f: reais,
      x: expl('SAC', 'No SAC, a dívida é dividida em partes iguais: amortização = valor ÷ número de parcelas.', `${num(PV)} ÷ ${n} = ${reais(PV / n)}.`),
    };
  },
  // 4. conceitos SAC/Price
  (r) => {
    const [afirma, certa] = r.pick([
      ['No Sistema Price (Francês), as prestações', 'são constantes, com juros decrescentes e amortizações crescentes'],
      ['No SAC, as prestações', 'são decrescentes, com amortizações constantes e juros decrescentes'],
      ['No SAC, as amortizações', 'são constantes ao longo de todo o financiamento'],
      ['No Sistema Price, ao longo do tempo, a parcela de juros', 'diminui, enquanto a parcela de amortização aumenta'],
    ]);
    const todas = [
      'são constantes, com juros decrescentes e amortizações crescentes',
      'são decrescentes, com amortizações constantes e juros decrescentes',
      'são constantes ao longo de todo o financiamento',
      'diminui, enquanto a parcela de amortização aumenta',
      'são crescentes, com juros crescentes',
      'aumenta, enquanto a parcela de amortização diminui',
      'são sempre iguais aos juros do período',
    ];
    return {
      e: `Complete corretamente: "${afirma} ..."`,
      r: certa,
      d: r.shuffle(todas.filter((t) => t !== certa)),
      x: expl('lógica dos sistemas', 'Os juros são sempre sobre o saldo devedor, que cai. SAC: amortização fixa ⇒ prestação cai. Price: prestação fixa ⇒ como os juros caem, a amortização cresce.', ''),
    };
  },
  // 5. juros da 1ª parcela
  (r) => {
    const PV = r.int(10, 80) * 1000, i = r.pick([0.8, 1, 1.2, 1.5, 2]);
    return {
      e: `Em um financiamento de ${reais(PV)} com juros de ${pc(i)} ao mês, quanto de juros está incluído na primeira prestação (em qualquer sistema de amortização)?`,
      r: (PV * i) / 100,
      d: [(PV * i) / 10, PV * i, (PV * i) / 1000, (PV * i * 12) / 100],
      f: reais,
      x: expl('juros sobre o saldo devedor', 'No primeiro mês, o saldo devedor é o valor financiado inteiro.', `${pc(i)} de ${reais(PV)} = ${reais((PV * i) / 100)}.`),
    };
  },
  // 6. qual sistema começa com prestação maior
  (r) => {
    const PV = r.pick([60000, 120000, 240000]);
    return {
      e: `Um mesmo valor de ${reais(PV)} pode ser financiado, com a mesma taxa e o mesmo prazo, pelo SAC ou pela Tabela Price. Sobre a PRIMEIRA prestação, é correto afirmar:`,
      r: 'a do SAC é maior que a da Price',
      d: ['a da Price é maior que a do SAC', 'as duas são iguais', 'depende apenas do valor financiado', 'no SAC não há juros na primeira prestação'],
      x: expl('comparar os sistemas', 'Os juros da 1ª prestação são iguais nos dois. A diferença está na amortização: no SAC ela já começa "grande" (valor ÷ n); na Price ela começa pequena e cresce.', 'Por isso a 1ª prestação do SAC é maior (e o total de juros pago no SAC é menor).'),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[2].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. 1ª prestação SAC
  (r) => {
    const PV = r.int(6, 60) * 1000, n = r.pick([10, 12, 20, 24, 30]), i = r.pick([1, 1.5, 2, 2.5, 3]);
    const A = PV / n, J = (PV * i) / 100;
    return {
      e: `Um empréstimo de ${reais(PV)} será pago pelo SAC em ${n} prestações mensais, à taxa de ${pc(i)} ao mês. Qual é o valor da primeira prestação?`,
      r: A + J,
      d: [A, J, A + J / 2, arred((PV * (1 + i / 100)) / n, 2)],
      f: reais,
      x: expl('prestação = amortização + juros', 'Amortização do SAC: valor ÷ n. Juros: taxa sobre o saldo (no início, o valor todo).', `${reais(A)} + ${reais(J)} = ${reais(A + J)}.`),
    };
  },
  // 2. k-ésima prestação SAC
  (r) => {
    const n = r.pick([10, 12, 20, 24]), A = r.int(5, 30) * 100, PV = A * n, i = r.pick([1, 2, 3]), k = r.int(2, n - 1);
    const saldo = PV - (k - 1) * A;
    const p = A + (saldo * i) / 100;
    return {
      e: `Um financiamento de ${reais(PV)} é pago pelo SAC em ${n} parcelas, com juros de ${pc(i)} ao mês. Qual é o valor da ${k}ª prestação?`,
      r: p,
      d: [A + (PV * i) / 100, A + ((PV - k * A) * i) / 100, (saldo * i) / 100, A],
      f: reais,
      x: expl('saldo antes da parcela', `Antes da ${k}ª parcela já foram pagas ${k - 1} amortizações.`, `Saldo: ${reais(saldo)}; juros: ${reais((saldo * i) / 100)}; prestação: ${reais(p)}.`),
    };
  },
  // 3. desconto racional
  (r) => {
    const i = r.pick([2, 4, 5]), t = r.pick([2, 3, 5]), A = r.int(5, 40) * 100;
    const N = A * (1 + (i * t) / 100);
    return {
      e: `Um título de ${reais(N)} foi resgatado ${t} meses antes do vencimento, com desconto racional (por dentro) simples de ${pc(i)} ao mês. Qual foi o valor do desconto?`,
      r: N - A,
      d: [(N * i * t) / 100, A, (N * i) / 100, arred((N - A) * 1.2, 2)],
      f: reais,
      x: expl('desconto racional ("por dentro")', 'A taxa incide sobre o valor ATUAL: N = A(1 + i·t).', `A = ${num(N)} ÷ ${num(1 + (i * t) / 100)} = ${reais(A)}; D = ${reais(N - A)}.`),
    };
  },
  // 4. prestação Price com fator
  (r) => {
    const PV = r.int(5, 50) * 1000, [i, n, f] = r.pick([[1, 12, 0.0888], [2, 12, 0.0946], [2, 10, 0.1113], [3, 10, 0.1172], [1, 24, 0.0471], [5, 10, 0.1295]]);
    return {
      e: `Um empréstimo de ${reais(PV)} será pago pelo Sistema Price em ${n} prestações mensais iguais, à taxa de ${pc(i)} ao mês. Sabendo que o fator de recuperação de capital para essas condições é ${num(f, 4)}, qual é o valor de cada prestação?`,
      r: arred(PV * f, 2),
      d: [arred(PV / n, 2), arred((PV * (1 + (i * n) / 100)) / n, 2), arred(PV * f * n, 2), arred(PV / n + (PV * i) / 100, 2)],
      f: reais,
      x: expl('fator de recuperação de capital', 'Na Price, a prestação é o valor financiado vezes o fator dado.', `${num(PV)} × ${num(f, 4)} = ${reais(PV * f)}.`),
    };
  },
  // 5. saldo devedor SAC
  (r) => {
    const n = r.pick([10, 12, 20, 24, 36]), A = r.int(2, 20) * 250, k = r.int(1, n - 1);
    const PV = A * n;
    return {
      e: `Um financiamento de ${reais(PV)} pelo SAC tem ${n} parcelas. Qual é o saldo devedor imediatamente após o pagamento da ${k}ª parcela?`,
      r: PV - k * A,
      d: [PV - (k - 1) * A, k * A, PV - (k + 1) * A, arred(PV / k, 2)],
      f: reais,
      x: expl('saldo cai linearmente', 'Cada parcela do SAC amortiza a mesma quantia.', `${num(PV)} − ${k} × ${num(A)} = ${reais(PV - k * A)}.`),
    };
  },
  // 6. desconto em dias
  (r) => {
    const N = r.int(4, 30) * 1000, d = r.pick([2, 3, 4, 6]), dias = r.pick([20, 45, 60, 75, 90]);
    const D = (N * d * dias) / 3000;
    return {
      e: `Uma empresa descontou um título de ${reais(N)} ${dias} dias antes do vencimento, com desconto comercial simples de ${pc(d)} ao mês (mês de 30 dias). Quanto recebeu?`,
      r: N - D,
      d: [D, N - (N * d) / 100, N - (N * d * dias) / 100, arred(N / (1 + (d * dias) / 3000), 2)],
      f: reais,
      x: expl('tempo em meses', `${dias} dias = ${num(dias / 30)} mês(es).`, `D = ${num(N)} × ${num(d / 100)} × ${num(dias / 30)} = ${reais(D)}; recebeu ${reais(N - D)}.`),
    };
  },
  // 7. última prestação SAC
  (r) => {
    const n = r.pick([10, 12, 20, 24]), A = r.int(4, 30) * 100, i = r.pick([1, 2, 3, 5]);
    return {
      e: `Um financiamento pelo SAC tem ${n} parcelas, cada uma com amortização de ${reais(A)}, e juros de ${pc(i)} ao mês. Qual é o valor da ÚLTIMA prestação?`,
      r: A * (1 + i / 100),
      d: [A, A + (A * n * i) / 100, (A * i) / 100, A * (1 + (i * n) / 100)],
      f: reais,
      x: expl('saldo antes da última parcela', 'Antes da última parcela, só falta uma amortização: o saldo é A.', `${reais(A)} + ${pc(i)} de ${reais(A)} = ${reais(A * (1 + i / 100))}.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[2].vezes = 2;
medio[4].vezes = 2;

const dificil = [
  // 1. total de juros SAC
  (r) => {
    const n = r.pick([4, 5, 10, 12, 20]), A = r.int(2, 20) * 100, i = r.pick([1, 2, 5]);
    const PV = A * n;
    const Jtot = (PV * i * (n + 1)) / 200;
    return {
      e: `Um empréstimo de ${reais(PV)} é pago pelo SAC em ${n} parcelas mensais, com juros de ${pc(i)} ao mês. Qual é o total de juros pago ao longo do financiamento?`,
      r: Jtot,
      d: [(PV * i * n) / 100, (PV * i) / 100, Jtot * 2, (PV * i * (n - 1)) / 200],
      f: reais,
      x: expl('soma de uma PA', 'Os saldos sobre os quais incidem os juros formam uma PA decrescente.', `Soma dos saldos = (${num(PV)} + ${num(A)}) × ${n} ÷ 2 = ${num(((PV + A) * n) / 2)}; ${pc(i)} disso = ${reais(Jtot)}.`),
    };
  },
  // 2. taxa efetiva do desconto comercial
  (r) => {
    const d = r.pick([2, 4, 5]), t = r.pick([2, 4, 5]);
    const ef = arred(d / (1 - (d * t) / 100), 2);
    return {
      e: `Um banco desconta títulos com desconto comercial simples de ${pc(d)} ao mês. Para um título descontado ${t} meses antes do vencimento, qual é a taxa efetiva mensal de juros simples paga pelo cliente?`,
      r: ef,
      d: [d, arred(d * (1 + (d * t) / 100), 2), arred(d * t, 2), arred(ef + 1, 2)],
      f: pc,
      x: expl('taxa sobre o que o cliente realmente recebeu', 'O cliente recebe menos que o nominal, mas os juros são calculados sobre o nominal: a taxa efetiva fica maior.', `Para N = 100: recebe ${num(100 - d * t)} e paga ${num(d * t)} de juros em ${t} meses ⇒ ${num(d * t)} ÷ (${num(100 - d * t)} × ${t}) ≈ ${pc(ef)} ao mês.`),
    };
  },
  // 3. comercial − racional
  (r) => {
    const i = r.pick([2, 5, 10]), t = r.pick([2, 4, 5]), N = r.int(2, 20) * 1100;
    const dc = (N * i * t) / 100;
    const dr = N - N / (1 + (i * t) / 100);
    return {
      e: `Um título de ${reais(N)} é descontado ${t} meses antes do vencimento à taxa simples de ${pc(i)} ao mês. Qual é a diferença entre o desconto comercial e o desconto racional?`,
      r: arred(dc - dr, 2),
      d: [arred(dc, 2), arred(dr, 2), arred((dc - dr) * 2, 2), 0],
      f: reais,
      x: expl('por fora x por dentro', 'O comercial usa a taxa sobre o valor maior (nominal), por isso é sempre maior.', `Comercial ${reais(dc)}; racional ${reais(dr)}; diferença ${reais(dc - dr)}.`),
    };
  },
  // 4. amortização da 1ª prestação Price
  (r) => {
    const PV = r.int(10, 50) * 1000, [i, n, f] = r.pick([[2, 12, 0.0946], [1, 12, 0.0888], [3, 10, 0.1172], [5, 10, 0.1295]]);
    const pmt = arred(PV * f, 2), j1 = (PV * i) / 100;
    return {
      e: `Um financiamento de ${reais(PV)} pelo Sistema Price, em ${n} prestações de ${reais(pmt)}, tem juros de ${pc(i)} ao mês. Qual é o valor amortizado na primeira prestação?`,
      r: arred(pmt - j1, 2),
      d: [j1, pmt, arred(PV / n, 2), arred(pmt + j1, 2)],
      f: reais,
      x: expl('amortização = prestação − juros', 'Os juros da 1ª prestação são a taxa sobre o valor financiado.', `${reais(pmt)} − ${reais(j1)} = ${reais(pmt - j1)}.`),
    };
  },
  // 5. valor à vista de uma série
  (r) => {
    const pmt = r.int(2, 20) * 100, [i, n, a] = r.pick([[1, 12, 11.255], [2, 10, 8.983], [2, 12, 10.575], [5, 10, 7.722], [3, 6, 5.417]]);
    return {
      e: `Uma loja oferece um produto em ${n} prestações mensais de ${reais(pmt)}, sem entrada (a primeira vence em 30 dias). Com taxa de ${pc(i)} ao mês e fator de valor presente ${num(a, 3)}, qual é o preço à vista equivalente?`,
      r: arred(pmt * a, 2),
      d: [pmt * n, arred((pmt * n) / (1 + (i * n) / 100), 2), arred(pmt * a * (1 + i / 100), 2), pmt * (n - 1)],
      f: reais,
      x: expl('valor presente de uma série', 'Cada prestação futura vale menos hoje; o fator já soma todas trazidas para a data zero.', `${num(pmt)} × ${num(a, 3)} = ${reais(pmt * a)} (menor que a soma nominal ${reais(pmt * n)}).`),
    };
  },
  // 6. saldo após a 1ª parcela Price
  (r) => {
    const PV = r.int(10, 60) * 1000, [i, n, f] = r.pick([[2, 12, 0.0946], [1, 12, 0.0888], [3, 10, 0.1172]]);
    const pmt = arred(PV * f, 2);
    const saldo = arred(PV * (1 + i / 100) - pmt, 2);
    return {
      e: `Um empréstimo de ${reais(PV)} pela Tabela Price tem prestações de ${reais(pmt)} e juros de ${pc(i)} ao mês. Qual é o saldo devedor logo após o pagamento da primeira prestação?`,
      r: saldo,
      d: [arred(PV - pmt, 2), arred(PV - PV / n, 2), arred(PV * (1 + i / 100), 2), arred(saldo - (PV * i) / 100, 2)],
      f: reais,
      x: expl('saldo = saldo anterior − amortização', 'A prestação paga primeiro os juros; só o que sobra reduz a dívida.', `Juros: ${reais((PV * i) / 100)}; amortização: ${reais(pmt - (PV * i) / 100)}; saldo: ${reais(saldo)}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[2].vezes = 2;
dificil[3].vezes = 2;
dificil[4].vezes = 2;

export default [
  {
    disciplina: 'matematica-financeira',
    arquivo: '02-descontos-e-amortizacao',
    titulo: 'Descontos e sistemas de amortização',
    provas: ['Concursos'],
    descricao: 'Desconto comercial e racional, SAC, Tabela Price e séries de pagamentos.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.descontos[0])], [...medio, ...novos(NOVOS.descontos[1])], [...dificil, ...novos(NOVOS.descontos[2])]],
  },
];
