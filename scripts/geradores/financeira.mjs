// Matemática financeira (concursos bancários).
import { arred, num, reais } from './util.mjs';

const PROVAS = ['Concursos', 'ENEM'];
const pc = (v) => `${num(v)}%`;

const juros = {
  disciplina: 'matematica-financeira',
  arquivo: '01-juros-simples-e-compostos',
  titulo: 'Juros simples e compostos',
  provas: PROVAS,
  descricao: 'Capital, taxa, tempo, montante; taxas proporcionais, equivalentes, nominais, efetivas e reais.',
  niveis: [
    [
      (r) => {
        const C = r.int(2, 50) * 500, i = r.pick([1, 1.5, 2, 2.5, 3, 4, 5]), t = r.int(2, 12);
        const J = (C * i * t) / 100;
        return {
          e: `Um capital de ${reais(C)} foi aplicado a juros simples de ${pc(i)} ao mês durante ${t} meses. Quanto rendeu de juros?`,
          r: J,
          d: [C + J, (C * i) / 100, C * ((1 + i / 100) ** t - 1), J * 2],
          f: reais,
          x: `J = C · i · t = ${num(C)} × ${num(i / 100)} × ${t} = ${reais(J)}.`,
        };
      },
      (r) => {
        const C = r.int(2, 40) * 1000, i = r.pick([2, 3, 4, 5, 6, 8, 10]), t = r.int(2, 10);
        const M = C * (1 + (i * t) / 100);
        return {
          e: `Qual é o montante de uma aplicação de ${reais(C)} a juros simples de ${pc(i)} ao mês, após ${t} meses?`,
          r: M,
          d: [M - C, C * (1 + i / 100) ** t, C + (C * i) / 100, C * (1 + (i * (t + 1)) / 100)],
          f: reais,
          x: `M = C(1 + i·t) = ${num(C)} × (1 + ${num(i / 100)} × ${t}) = ${num(C)} × ${num(1 + (i * t) / 100)} = ${reais(M)}.`,
        };
      },
      (r) => {
        const C = r.int(1, 20) * 1000, i = r.pick([5, 10, 20]);
        const M = C * (1 + i / 100) ** 2;
        return {
          e: `${reais(C)} foram aplicados a juros compostos de ${pc(i)} ao mês. Qual será o montante após 2 meses?`,
          r: M,
          d: [C * (1 + (2 * i) / 100), M - C, C * (1 + i / 100), M + (C * i) / 100],
          f: reais,
          x: `M = C(1 + i)² = ${num(C)} × ${num(1 + i / 100)}² = ${num(C)} × ${num((1 + i / 100) ** 2, 4)} = ${reais(M)}.`,
        };
      },
      (r) => {
        const i = r.pick([0.5, 1, 1.5, 2, 2.5, 3]), tipo = r.pick(['ano', 'semestre', 'trimestre']);
        const k = { ano: 12, semestre: 6, trimestre: 3 }[tipo];
        return {
          e: `No regime de juros simples, qual é a taxa ${tipo === 'ano' ? 'anual' : tipo === 'semestre' ? 'semestral' : 'trimestral'} proporcional a ${pc(i)} ao mês?`,
          r: i * k,
          d: [arred(((1 + i / 100) ** k - 1) * 100, 2), i + k, i * (k - 1), i * k * 2],
          f: pc,
          x: `Taxas proporcionais (juros simples): basta multiplicar pelo número de meses do período: ${num(i)}% × ${k} = ${num(i * k)}%.`,
        };
      },
      (r) => {
        const C = r.int(2, 30) * 1000, J = r.pick([0.1, 0.2, 0.3, 0.4, 0.5]) * C, t = r.pick([2, 4, 5, 10]);
        const i = (J / C / t) * 100;
        return {
          e: `Uma aplicação de ${reais(C)} rendeu ${reais(J)} de juros simples em ${t} meses. Qual foi a taxa mensal?`,
          r: arred(i, 2),
          d: [arred((J / C) * 100, 2), arred(i * 2, 2), arred(i / 2, 2), arred((J / C / (t + 1)) * 100, 2)],
          f: pc,
          x: `i = J/(C·t) = ${num(J)}/(${num(C)} × ${t}) = ${num(i / 100, 4)} = ${num(i)}% a.m.`,
        };
      },
    ],
    [
      (r) => {
        const C = r.int(1, 20) * 1000, i = r.pick([10, 20]), n = 3;
        const M = C * (1 + i / 100) ** n;
        return {
          e: `Um capital de ${reais(C)} é aplicado a juros compostos de ${pc(i)} ao mês. Qual é o montante ao final de ${n} meses?`,
          r: M,
          d: [C * (1 + (n * i) / 100), M - C, C * (1 + i / 100) ** 2, M * 1.1],
          f: reais,
          x: `M = ${num(C)} × ${num(1 + i / 100)}³ = ${num(C)} × ${num((1 + i / 100) ** 3, 4)} = ${reais(M)}.`,
        };
      },
      (r) => {
        const M = r.int(5, 60) * 600, i = r.pick([2, 3, 4, 5]), t = r.pick([5, 10, 20]);
        const C = M / (1 + (i * t) / 100);
        if (!Number.isInteger(C * 100)) return juros.niveis[1][1](r);
        return {
          e: `Qual capital, aplicado a juros simples de ${pc(i)} ao mês durante ${t} meses, produz o montante de ${reais(M)}?`,
          r: C,
          d: [M / (1 + i / 100) ** t, M - (M * i) / 100, C * 1.1, M / 2 === C ? C * 0.9 : M / 2],
          f: reais,
          x: `M = C(1 + i·t) ⇒ C = ${num(M)}/(1 + ${num(i / 100)} × ${t}) = ${num(M)}/${num(1 + (i * t) / 100)} = ${reais(C)}.`,
        };
      },
      (r) => {
        const C = r.int(1, 20) * 1000, i = r.pick([5, 10, 20]);
        const js = C * (1 + (2 * i) / 100), jc = C * (1 + i / 100) ** 2;
        return {
          e: `Um capital de ${reais(C)} é aplicado por 2 meses a ${pc(i)} ao mês. Qual é a diferença entre o montante obtido a juros compostos e o obtido a juros simples?`,
          r: jc - js,
          d: [(C * i) / 100, jc - C, (C * i * i) / 1000, 0],
          f: reais,
          x: `Compostos: ${reais(jc)}. Simples: ${reais(js)}. Diferença: ${reais(jc - js)} (= C·i², os "juros sobre juros" do 1º mês).`,
        };
      },
      (r) => {
        const i = r.pick([2, 2.5, 4, 5, 8, 10]), k = r.pick([2, 3]);
        return {
          e: `A juros simples de ${pc(i)} ao mês, em quanto tempo um capital fica ${k === 2 ? 'duplicado' : 'triplicado'}?`,
          r: ((k - 1) * 100) / i,
          d: [(k * 100) / i, 100 / i / k, ((k - 1) * 100) / i / 12, ((k - 1) * 100) / i + 2],
          f: (v) => `${num(v)} meses`,
          x: `Para ${k === 2 ? 'duplicar' : 'triplicar'}, os juros devem ser ${k - 1}C: C·${num(i / 100)}·t = ${k - 1}C ⇒ t = ${k - 1}/${num(i / 100)} = ${num(((k - 1) * 100) / i)} meses.`,
        };
      },
      (r) => {
        const C = r.int(2, 30) * 1000, fator = r.pick([[5, 10, 1.63], [2, 12, 1.27], [3, 6, 1.19], [10, 5, 1.61], [4, 10, 1.48]]);
        const [i, n, f] = fator;
        return {
          e: `Um capital de ${reais(C)} é aplicado a juros compostos de ${i}% ao mês por ${n} meses. Considerando (1,${String(i).padStart(2, '0')})^${n} ≈ ${num(f)}, qual é o montante aproximado?`,
          r: C * f,
          d: [C * (1 + (i * n) / 100), C * f - C, C * (f + 0.1), C * (1 + i / 100) * n],
          f: reais,
          x: `M = C(1 + i)ⁿ = ${num(C)} × ${num(f)} = ${reais(C * f)}.`,
        };
      },
    ],
    [
      (r) => {
        const [i, k, txt, eq] = r.pick([
          [10, 2, 'bimestral', 21],
          [20, 2, 'bimestral', 44],
          [10, 3, 'trimestral', 33.1],
          [5, 2, 'bimestral', 10.25],
          [2, 2, 'bimestral', 4.04],
          [21, 0.5, 'semestral (a partir de 21% ao ano)', 10],
          [44, 0.5, 'semestral (a partir de 44% ao ano)', 20],
        ]);
        return {
          e: k < 1 ? `No regime de juros compostos, qual é a taxa ${txt}?` : `No regime de juros compostos, qual é a taxa ${txt} equivalente a ${pc(i)} ao mês?`,
          r: eq,
          d: k < 1 ? [i / 2, arred(eq + 0.5, 2), arred(i / 2 - 1, 2), arred(eq * 1.5, 2)] : [i * k, arred(eq + 1, 2), arred(i * k - 1, 2), arred(eq * 1.5, 2)],
          f: pc,
          x: k < 1 ? `(1 + i_s)² = 1 + ${num(i / 100)} ⇒ 1 + i_s = √${num(1 + i / 100)} = ${num(1 + eq / 100)} ⇒ i_s = ${num(eq)}%.` : `(1 + ${num(i / 100)})^${k} = ${num(1 + eq / 100, 4)} ⇒ taxa ${txt} de ${num(eq)}% (maior que ${num(i * k)}%, por causa dos juros sobre juros).`,
        };
      },
      (r) => {
        const [nom, inf] = r.pick([[15.5, 5], [21, 10], [26, 5], [32, 10], [8.15, 3], [12.2, 2]]);
        const real = arred(((1 + nom / 100) / (1 + inf / 100) - 1) * 100, 2);
        return {
          e: `Uma aplicação rendeu ${pc(nom)} em um ano em que a inflação foi de ${pc(inf)}. Qual foi a taxa real de rendimento?`,
          r: real,
          d: [arred(nom - inf, 2), arred(nom + inf, 2), arred(nom / inf, 2), arred(real + 1, 2)],
          f: pc,
          x: `(1 + nominal) = (1 + real)(1 + inflação) ⇒ 1 + real = ${num(1 + nom / 100, 4)}/${num(1 + inf / 100)} = ${num(1 + real / 100, 4)} ⇒ real = ${num(real)}%.`,
        };
      },
      (r) => {
        const [nom, k, txt] = r.pick([[12, 12, 'mensalmente'], [24, 12, 'mensalmente'], [20, 2, 'semestralmente'], [40, 4, 'trimestralmente'], [36, 12, 'mensalmente']]);
        const ef = arred(((1 + nom / 100 / k) ** k - 1) * 100, 2);
        return {
          e: `Uma taxa nominal de ${pc(nom)} ao ano, capitalizada ${txt}, corresponde a que taxa efetiva anual (aproximada)?`,
          r: ef,
          d: [nom, arred(nom / k, 2), arred(ef + 2, 2), arred(nom * 1.5, 2)],
          f: pc,
          x: `Taxa por período: ${num(nom)}%/${k} = ${num(nom / k)}%. Efetiva anual: (1 + ${num(nom / 100 / k, 4)})^${k} − 1 ≈ ${num(ef)}%.`,
        };
      },
      (r) => {
        const M = r.int(2, 20) * 1000, [i, n, f] = r.pick([[10, 2, 1.21], [20, 2, 1.44], [10, 3, 1.331], [5, 2, 1.1025], [25, 2, 1.5625]]);
        const C = M / f;
        return {
          e: `Quanto se deve aplicar hoje, a juros compostos de ${pc(i)} ao mês, para obter ${reais(M)} daqui a ${n} meses?`,
          r: arred(C, 2),
          d: [arred(M / (1 + (i * n) / 100), 2), arred(M * (1 - (i * n) / 100), 2), arred(M / (1 + i / 100), 2), arred(M - M * (f - 1) / 2, 2)],
          f: reais,
          x: `Valor presente: C = M/(1 + i)ⁿ = ${num(M)}/${num(f, 4)} ≈ ${reais(C)}.`,
        };
      },
      (r) => {
        const C = r.int(5, 50) * 1000, i = r.pick([1, 2, 5, 10]);
        const n = r.pick([2, 3]);
        const jc = C * ((1 + i / 100) ** n - 1);
        return {
          e: `Um investidor aplicou ${reais(C)} a juros compostos de ${pc(i)} ao mês. Quanto ele recebeu apenas de juros após ${n} meses?`,
          r: arred(jc, 2),
          d: [arred((C * i * n) / 100, 2), arred(C + jc, 2), arred((C * i) / 100, 2), arred(jc * 1.1, 2)],
          f: reais,
          x: `J = C[(1 + i)ⁿ − 1] = ${num(C)} × (${num((1 + i / 100) ** n, 6)} − 1) = ${reais(jc)}.`,
        };
      },
    ],
  ],
};

const amortizacao = {
  disciplina: 'matematica-financeira',
  arquivo: '02-descontos-e-amortizacao',
  titulo: 'Descontos e sistemas de amortização',
  provas: ['Concursos'],
  descricao: 'Desconto comercial e racional, SAC, Tabela Price e séries de pagamentos.',
  niveis: [
    [
      (r) => {
        const N = r.int(2, 40) * 500, d = r.pick([1, 2, 2.5, 3, 4, 5]), t = r.int(1, 6);
        const D = (N * d * t) / 100;
        return {
          e: `Um título de valor nominal ${reais(N)} foi descontado ${t} ${t === 1 ? 'mês' : 'meses'} antes do vencimento, com desconto comercial simples de ${pc(d)} ao mês. Qual foi o valor do desconto?`,
          r: D,
          d: [N - D, (N * d) / 100, D * 2, N / (1 + (d * t) / 100)],
          f: reais,
          x: `Desconto comercial (por fora): D = N·d·t = ${num(N)} × ${num(d / 100)} × ${t} = ${reais(D)}.`,
        };
      },
      (r) => {
        const N = r.int(2, 40) * 500, d = r.pick([2, 3, 4, 5]), t = r.int(2, 5);
        const A = N * (1 - (d * t) / 100);
        return {
          e: `Uma duplicata de ${reais(N)} foi descontada em um banco ${t} meses antes do vencimento, a uma taxa de desconto comercial simples de ${pc(d)} ao mês. Qual foi o valor recebido (valor atual)?`,
          r: A,
          d: [N - A, N / (1 + (d * t) / 100), N * (1 - d / 100), N],
          f: reais,
          x: `A = N(1 − d·t) = ${num(N)} × (1 − ${num((d * t) / 100)}) = ${reais(A)}.`,
        };
      },
      (r) => {
        const PV = r.int(6, 60) * 1000, n = r.pick([10, 12, 20, 24, 30, 40, 50, 60]);
        return {
          e: `Um financiamento de ${reais(PV)} será pago pelo Sistema de Amortização Constante (SAC) em ${n} parcelas mensais. Qual é o valor de cada amortização?`,
          r: PV / n,
          d: [PV / (n - 1), (PV / n) * 1.1, PV / 12, PV * 0.01],
          f: reais,
          x: `No SAC, a amortização é constante: A = ${num(PV)}/${n} = ${reais(PV / n)}.`,
        };
      },
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
          x: `SAC: amortização constante ⇒ saldo cai linearmente ⇒ juros e prestações decrescentes. Price: prestação constante ⇒ como os juros caem com o saldo, a amortização cresce.`,
        };
      },
    ],
    [
      (r) => {
        const PV = r.int(6, 60) * 1000, n = r.pick([10, 12, 20, 24, 30]), i = r.pick([1, 1.5, 2, 2.5, 3]);
        const A = PV / n, J = (PV * i) / 100;
        return {
          e: `Um empréstimo de ${reais(PV)} será pago pelo SAC em ${n} prestações mensais, à taxa de ${pc(i)} ao mês. Qual é o valor da primeira prestação?`,
          r: A + J,
          d: [A, J, A + J / 2, (PV * (1 + i / 100)) / n],
          f: reais,
          x: `Amortização: ${num(PV)}/${n} = ${reais(A)}. Juros da 1ª: ${num(i)}% de ${num(PV)} = ${reais(J)}. Prestação: ${reais(A + J)}.`,
        };
      },
      (r) => {
        const n = r.pick([10, 12, 20, 24]), A = r.int(5, 30) * 100, PV = A * n, i = r.pick([1, 2, 3]), k = r.int(2, n - 1);
        const saldo = PV - (k - 1) * A;
        const p = A + (saldo * i) / 100;
        return {
          e: `Um financiamento de ${reais(PV)} é pago pelo SAC em ${n} parcelas, com juros de ${pc(i)} ao mês. Qual é o valor da ${k}ª prestação?`,
          r: p,
          d: [A + (PV * i) / 100, A + ((PV - k * A) * i) / 100, (saldo * i) / 100, A],
          f: reais,
          x: `Antes da ${k}ª parcela, o saldo é ${num(PV)} − ${k - 1} × ${num(A)} = ${reais(saldo)}. Juros: ${reais((saldo * i) / 100)}. Prestação: ${reais(A)} + ${reais((saldo * i) / 100)} = ${reais(p)}.`,
        };
      },
      (r) => {
        const i = r.pick([2, 4, 5]), t = r.pick([2, 3, 5]), A = r.int(5, 40) * 100;
        const N = A * (1 + (i * t) / 100);
        const D = N - A;
        return {
          e: `Um título de ${reais(N)} foi resgatado ${t} meses antes do vencimento, com desconto racional (por dentro) simples de ${pc(i)} ao mês. Qual foi o valor do desconto?`,
          r: D,
          d: [(N * i * t) / 100, A, (N * i) / 100, D * 1.2],
          f: reais,
          x: `Desconto racional: A = N/(1 + i·t) = ${num(N)}/${num(1 + (i * t) / 100)} = ${reais(A)}. D = N − A = ${reais(D)}.`,
        };
      },
      (r) => {
        const PV = r.int(5, 50) * 1000, [i, n, f] = r.pick([[1, 12, 0.0888], [2, 12, 0.0946], [2, 10, 0.1113], [3, 10, 0.1172], [1, 24, 0.0471], [5, 10, 0.1295]]);
        return {
          e: `Um empréstimo de ${reais(PV)} será pago pelo Sistema Price em ${n} prestações mensais iguais, à taxa de ${pc(i)} ao mês. Sabendo que o fator de recuperação de capital para essas condições é ${num(f, 4)}, qual é o valor de cada prestação?`,
          r: arred(PV * f, 2),
          d: [arred(PV / n, 2), arred((PV * (1 + (i * n) / 100)) / n, 2), arred(PV * f * n, 2), arred(PV / n + (PV * i) / 100, 2)],
          f: reais,
          x: `PMT = PV × FRC = ${num(PV)} × ${num(f, 4)} = ${reais(PV * f)}.`,
        };
      },
      (r) => {
        const n = r.pick([10, 12, 20, 24, 36]), A = r.int(2, 20) * 250, k = r.int(1, n - 1);
        const PV = A * n;
        return {
          e: `Um financiamento de ${reais(PV)} pelo SAC tem ${n} parcelas. Qual é o saldo devedor imediatamente após o pagamento da ${k}ª parcela?`,
          r: PV - k * A,
          d: [PV - (k - 1) * A, k * A, PV - (k + 1) * A, PV / k],
          f: reais,
          x: `Cada parcela amortiza ${reais(A)}. Após ${k} parcelas: ${num(PV)} − ${k} × ${num(A)} = ${reais(PV - k * A)}.`,
        };
      },
    ],
    [
      (r) => {
        const n = r.pick([4, 5, 10, 12, 20]), A = r.int(2, 20) * 100, i = r.pick([1, 2, 5]);
        const PV = A * n;
        const Jtot = (PV * i * (n + 1)) / 200;
        return {
          e: `Um empréstimo de ${reais(PV)} é pago pelo SAC em ${n} parcelas mensais, com juros de ${pc(i)} ao mês. Qual é o total de juros pago ao longo do financiamento?`,
          r: Jtot,
          d: [(PV * i * n) / 100, (PV * i) / 100, Jtot * 2, (PV * i * (n - 1)) / 200],
          f: reais,
          x: `Os juros incidem sobre saldos ${num(PV)}, ${num(PV - A)}, ..., ${num(A)} (PA). Soma dos saldos = (${num(PV)} + ${num(A)})·${n}/2 = ${num((PV + A) * n / 2)}. Juros totais = ${num(i)}% disso = ${reais(Jtot)}.`,
        };
      },
      (r) => {
        const d = r.pick([2, 4, 5]), t = r.pick([2, 4, 5]);
        const ef = arred((d / (1 - (d * t) / 100)), 2);
        return {
          e: `Um banco desconta títulos com desconto comercial simples de ${pc(d)} ao mês. Para um título descontado ${t} meses antes do vencimento, qual é a taxa efetiva mensal de juros simples paga pelo cliente?`,
          r: ef,
          d: [d, arred(d * (1 + (d * t) / 100), 2), arred(d * t, 2), arred(ef + 1, 2)],
          f: pc,
          x: `Para N = 100: desconto = ${num(d * t)}, valor recebido = ${num(100 - d * t)}. Juros de ${num(d * t)} sobre ${num(100 - d * t)} em ${t} meses: i = ${num(d * t)}/(${num(100 - d * t)} × ${t}) ≈ ${num(ef)}% a.m.`,
        };
      },
      (r) => {
        const i = r.pick([2, 5, 10]), t = r.pick([2, 4, 5]), N = r.int(2, 20) * 1100;
        const dc = (N * i * t) / 100;
        const dr = N - N / (1 + (i * t) / 100);
        return {
          e: `Um título de ${reais(N)} é descontado ${t} meses antes do vencimento à taxa simples de ${pc(i)} ao mês. Qual é a diferença entre o desconto comercial e o desconto racional?`,
          r: arred(dc - dr, 2),
          d: [arred(dc, 2), arred(dr, 2), arred((dc - dr) * 2, 2), 0],
          f: reais,
          x: `Comercial: ${reais(dc)}. Racional: N − N/(1 + it) = ${reais(dr)}. Diferença: ${reais(dc - dr)} (o comercial é sempre maior).`,
        };
      },
      (r) => {
        const PV = r.int(10, 50) * 1000, [i, n, f] = r.pick([[2, 12, 0.0946], [1, 12, 0.0888], [3, 10, 0.1172], [5, 10, 0.1295]]);
        const pmt = arred(PV * f, 2), j1 = (PV * i) / 100;
        return {
          e: `Um financiamento de ${reais(PV)} pelo Sistema Price, em ${n} prestações de ${reais(pmt)}, tem juros de ${pc(i)} ao mês. Qual é o valor amortizado na primeira prestação?`,
          r: arred(pmt - j1, 2),
          d: [j1, pmt, arred(PV / n, 2), arred(pmt + j1, 2)],
          f: reais,
          x: `Juros da 1ª prestação: ${num(i)}% de ${num(PV)} = ${reais(j1)}. Amortização = prestação − juros = ${reais(pmt)} − ${reais(j1)} = ${reais(pmt - j1)}.`,
        };
      },
      (r) => {
        const pmt = r.int(2, 20) * 100, [i, n, a] = r.pick([[1, 12, 11.255], [2, 10, 8.983], [2, 12, 10.575], [5, 10, 7.722], [3, 6, 5.417]]);
        return {
          e: `Uma loja oferece um produto em ${n} prestações mensais de ${reais(pmt)}, sem entrada (a primeira vence em 30 dias). Com taxa de ${pc(i)} ao mês e fator de valor presente ${num(a, 3)}, qual é o preço à vista equivalente?`,
          r: arred(pmt * a, 2),
          d: [pmt * n, arred((pmt * n) / (1 + (i * n) / 100), 2), arred(pmt * a * (1 + i / 100), 2), arred(pmt * (n - 1), 2)],
          f: reais,
          x: `Valor presente da série: PV = PMT × aₙ,ᵢ = ${num(pmt)} × ${num(a, 3)} = ${reais(pmt * a)} (menor que ${reais(pmt * n)}, a soma nominal).`,
        };
      },
    ],
  ],
};

export default [juros, amortizacao];
