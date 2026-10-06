// Matemática financeira — Juros simples e compostos.
import { arred, expl, nome, num, reais } from './util.mjs';
import NOVOS from './fin-novos-extras.mjs';
import { novos } from './util.mjs';

const pc = (v) => `${num(v)}%`;

const facil = [
  // 1. juros simples
  (r) => {
    const C = r.int(2, 50) * 500, i = r.pick([1, 1.5, 2, 2.5, 3, 4, 5]), t = r.int(2, 12);
    const J = (C * i * t) / 100;
    return {
      e: `Um capital de ${reais(C)} foi aplicado a juros simples de ${pc(i)} ao mês durante ${t} meses. Quanto rendeu de juros?`,
      r: J,
      d: [C + J, (C * i) / 100, arred(C * ((1 + i / 100) ** t - 1), 2), J * 2],
      f: reais,
      x: expl('juros simples J = C·i·t', 'Em juros simples, os juros de cada mês são sempre calculados sobre o capital inicial.', `${num(C)} × ${num(i / 100)} × ${t} = ${reais(J)}.`),
    };
  },
  // 2. montante simples
  (r) => {
    const C = r.int(2, 40) * 1000, i = r.pick([2, 3, 4, 5, 6, 8, 10]), t = r.int(2, 10);
    const M = C * (1 + (i * t) / 100);
    return {
      e: `Qual é o montante de uma aplicação de ${reais(C)} a juros simples de ${pc(i)} ao mês, após ${t} meses?`,
      r: M,
      d: [M - C, arred(C * (1 + i / 100) ** t, 2), C + (C * i) / 100, C * (1 + (i * (t + 1)) / 100)],
      f: reais,
      x: expl('montante = capital + juros', 'M = C(1 + i·t).', `${num(C)} × ${num(1 + (i * t) / 100)} = ${reais(M)}.`),
    };
  },
  // 3. composto 2 meses
  (r) => {
    const C = r.int(1, 20) * 1000, i = r.pick([5, 10, 20]);
    const M = C * (1 + i / 100) ** 2;
    return {
      e: `${reais(C)} foram aplicados a juros compostos de ${pc(i)} ao mês. Qual será o montante após 2 meses?`,
      r: M,
      d: [C * (1 + (2 * i) / 100), M - C, C * (1 + i / 100), M + (C * i) / 100],
      f: reais,
      x: expl('juros sobre juros', 'No 2º mês, os juros incidem sobre o capital JÁ com os juros do 1º mês: M = C(1 + i)².', `${num(C)} × ${num(1 + i / 100)}² = ${reais(M)}.`),
    };
  },
  // 4. taxa proporcional
  (r) => {
    const i = r.pick([0.5, 1, 1.5, 2, 2.5, 3]), tipo = r.pick(['ano', 'semestre', 'trimestre']);
    const k = { ano: 12, semestre: 6, trimestre: 3 }[tipo];
    return {
      e: `No regime de juros simples, qual é a taxa ${tipo === 'ano' ? 'anual' : tipo === 'semestre' ? 'semestral' : 'trimestral'} proporcional a ${pc(i)} ao mês?`,
      r: i * k,
      d: [arred(((1 + i / 100) ** k - 1) * 100, 2), i + k, i * (k - 1), i * k * 2],
      f: pc,
      x: expl('taxas proporcionais', 'Em juros simples, multiplique pela quantidade de meses do novo período.', `${num(i)}% × ${k} = ${num(i * k)}%.`),
    };
  },
  // 5. descobrir a taxa
  (r) => {
    const C = r.int(2, 30) * 1000, J = r.pick([0.1, 0.2, 0.3, 0.4, 0.5]) * C, t = r.pick([2, 4, 5, 10]);
    const i = (J / C / t) * 100;
    return {
      e: `Uma aplicação de ${reais(C)} rendeu ${reais(J)} de juros simples em ${t} meses. Qual foi a taxa mensal?`,
      r: arred(i, 2),
      d: [arred((J / C) * 100, 2), arred(i * 2, 2), arred(i / 2, 2), arred((J / C / (t + 1)) * 100, 2)],
      f: pc,
      x: expl('isolar i', 'i = J ÷ (C · t).', `${num(J)} ÷ (${num(C)} × ${t}) = ${num(i / 100, 4)} = ${pc(i)} ao mês.`),
    };
  },
  // 6. taxa em dias
  (r) => {
    const i = r.pick([1.5, 2, 3, 4, 6]), dias = r.pick([15, 45, 50, 75, 90]);
    const C = r.int(2, 20) * 1000;
    const J = (C * i * dias) / 3000;
    return {
      e: `Um empréstimo de ${reais(C)} foi feito a juros simples de ${pc(i)} ao mês (mês comercial de 30 dias) e quitado após ${dias} dias. Quanto foi pago de juros?`,
      r: arred(J, 2),
      d: [arred((C * i * dias) / 100, 2), arred((C * i) / 100, 2), arred((C * i * dias) / 36500, 2), arred(J * 2, 2)],
      f: reais,
      x: expl('mesma unidade de tempo', `Taxa ao mês e tempo em dias não combinam: ${dias} dias = ${num(dias / 30)} mês(es).`, `${num(C)} × ${num(i / 100)} × ${num(dias / 30)} = ${reais(J)}.`),
    };
  },
  // 7. poupança
  (r) => {
    const C = r.pick([2000, 5000, 10000, 20000]), i = 0.5, n = r.pick([2, 3]);
    const M = C * 1.005 ** n;
    return {
      e: `${nome(r)} deixou ${reais(C)} na poupança, que rendeu ${pc(i)} ao mês, a juros compostos, por ${n} meses. Qual é o saldo ao final?`,
      r: arred(M, 2),
      d: [C * (1 + (i * n) / 100), C + (C * i) / 100, arred(M + 10, 2), C * (1 + i / 100)],
      f: reais,
      x: expl('juros compostos', 'Cada mês multiplica o saldo por 1,005.', `${num(C)} × 1,005${n === 2 ? '²' : '³'} = ${reais(M)}.`),
    };
  },
  // 8. cheque especial
  (r) => {
    const v = r.pick([300, 500, 800, 1200]), i = r.pick([6, 8, 10, 12]), dias = r.pick([10, 15, 20]);
    const J = (v * i * dias) / 3000;
    return {
      e: `O cheque especial cobra ${pc(i)} ao mês (juros simples, proporcionais aos dias). Uma pessoa ficou ${dias} dias devendo ${reais(v)}. Quanto pagou de juros?`,
      r: arred(J, 2),
      d: [arred((v * i) / 100, 2), arred((v * i * dias) / 100, 2), arred(J * 2, 2), arred(v + J, 2)],
      f: reais,
      x: expl('taxa proporcional aos dias', `${dias} dias é ${dias}/30 do mês.`, `${num(v)} × ${num(i / 100)} × ${dias}/30 = ${reais(J)}.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[2].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. composto 3 meses
  (r) => {
    const C = r.int(1, 20) * 1000, i = r.pick([10, 20]), n = 3;
    const M = C * (1 + i / 100) ** n;
    return {
      e: `Um capital de ${reais(C)} é aplicado a juros compostos de ${pc(i)} ao mês. Qual é o montante ao final de ${n} meses?`,
      r: M,
      d: [C * (1 + (n * i) / 100), M - C, C * (1 + i / 100) ** 2, M * 1.1],
      f: reais,
      x: expl('M = C(1 + i)ⁿ', 'Multiplique pelo fator (1 + i) uma vez por mês.', `${num(C)} × ${num(1 + i / 100)}³ = ${reais(M)}.`),
    };
  },
  // 2. capital pelo montante (simples)
  (r) => {
    const M = r.int(5, 60) * 600, i = r.pick([2, 3, 4, 5]), t = r.pick([5, 10, 20]);
    const C = M / (1 + (i * t) / 100);
    if (!Number.isInteger(C * 100)) return medio[1](r);
    return {
      e: `Qual capital, aplicado a juros simples de ${pc(i)} ao mês durante ${t} meses, produz o montante de ${reais(M)}?`,
      r: C,
      d: [arred(M / (1 + i / 100) ** t, 2), M - (M * i) / 100, C * 1.1, M / 2 === C ? C * 0.9 : M / 2],
      f: reais,
      x: expl('montante ao contrário', 'C = M ÷ (1 + i·t).', `${num(M)} ÷ ${num(1 + (i * t) / 100)} = ${reais(C)}.`),
    };
  },
  // 3. composto − simples
  (r) => {
    const C = r.int(1, 20) * 1000, i = r.pick([5, 10, 20]);
    const js = C * (1 + (2 * i) / 100), jc = C * (1 + i / 100) ** 2;
    return {
      e: `Um capital de ${reais(C)} é aplicado por 2 meses a ${pc(i)} ao mês. Qual é a diferença entre o montante obtido a juros compostos e o obtido a juros simples?`,
      r: jc - js,
      d: [(C * i) / 100, jc - C, (C * i * i) / 1000, 0],
      f: reais,
      x: expl('juros sobre juros', 'A diferença em 2 meses é exatamente o juro que o juro do 1º mês rendeu no 2º: C·i².', `Compostos ${reais(jc)}; simples ${reais(js)}; diferença ${reais(jc - js)}.`),
    };
  },
  // 4. duplicar/triplicar
  (r) => {
    const i = r.pick([2, 2.5, 4, 5, 8, 10]), k = r.pick([2, 3]);
    return {
      e: `A juros simples de ${pc(i)} ao mês, em quanto tempo um capital fica ${k === 2 ? 'duplicado' : 'triplicado'}?`,
      r: ((k - 1) * 100) / i,
      d: [(k * 100) / i, 100 / i / k, ((k - 1) * 100) / i / 12, ((k - 1) * 100) / i + 2],
      f: (v) => `${num(v)} meses`,
      x: expl('juros = (k − 1) × capital', `Para ${k === 2 ? 'duplicar' : 'triplicar'}, os juros precisam valer ${k - 1} capital(is).`, `${num(i / 100)} × t = ${k - 1} ⇒ t = ${num(((k - 1) * 100) / i)} meses.`),
    };
  },
  // 5. montante com fator dado
  (r) => {
    const C = r.int(2, 30) * 1000, [i, n, f] = r.pick([[5, 10, 1.63], [2, 12, 1.27], [3, 6, 1.19], [10, 5, 1.61], [4, 10, 1.48]]);
    return {
      e: `Um capital de ${reais(C)} é aplicado a juros compostos de ${i}% ao mês por ${n} meses. Considerando (1 + ${num(i / 100)})^${n} ≈ ${num(f)}, qual é o montante aproximado?`,
      r: C * f,
      d: [C * (1 + (i * n) / 100), C * f - C, C * (f + 0.1), C * (1 + i / 100) * n],
      f: reais,
      x: expl('usar o fator da tabela', 'Provas de concurso costumam dar o valor de (1 + i)ⁿ. Basta multiplicar.', `${num(C)} × ${num(f)} = ${reais(C * f)}.`),
    };
  },
  // 6. taxa anual equivalente com fator
  (r) => {
    const [i, f] = r.pick([[1, 1.1268], [2, 1.2682], [1.5, 1.1956], [3, 1.4258]]);
    return {
      e: `Considerando (1 + ${num(i / 100)})¹² ≈ ${num(f, 4)}, qual é a taxa anual equivalente a ${pc(i)} ao mês, no regime de juros compostos?`,
      r: arred((f - 1) * 100, 2),
      d: [i * 12, arred(f * 100, 2), arred((f - 1) * 10, 2), arred(i * 12 + 1, 2)],
      f: pc,
      x: expl('taxas equivalentes', 'Em juros compostos, a taxa anual é (1 + i)¹² − 1, e não i × 12.', `${num(f, 4)} − 1 = ${num(f - 1, 4)} = ${pc(arred((f - 1) * 100, 2))} ao ano.`),
    };
  },
  // 7. juros simples anual a partir do montante
  (r) => {
    const C = r.int(4, 20) * 1000, i = r.pick([6, 8, 12, 15, 18]), meses = r.pick([6, 8, 10, 18]);
    const M = C * (1 + (i / 100) * (meses / 12));
    return {
      e: `Uma dívida de ${reais(C)} virou ${reais(M)} após ${meses} meses, a juros simples. Qual foi a taxa ANUAL cobrada?`,
      r: i,
      d: [arred(((M - C) / C) * 100, 2), arred(i / 12, 2), arred(i * 1.2, 2), arred(((M - C) / C / meses) * 100, 2)],
      f: pc,
      x: expl('cuidado com a unidade de tempo', 'Converta o prazo para anos antes de calcular a taxa anual.', `J = ${reais(M - C)}; ${meses} meses = ${num(meses / 12, 3)} ano; i = ${num(M - C)} ÷ (${num(C)} × ${num(meses / 12, 3)}) = ${pc(i)} ao ano.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[4].vezes = 2;
medio[6].vezes = 2;

const dificil = [
  // 1. taxas equivalentes
  (r) => {
    const [i, k, txt, eq] = r.pick([
      [10, 2, 'bimestral', 21],
      [20, 2, 'bimestral', 44],
      [10, 3, 'trimestral', 33.1],
      [5, 2, 'bimestral', 10.25],
      [2, 2, 'bimestral', 4.04],
    ]);
    return {
      e: `No regime de juros compostos, qual é a taxa ${txt} equivalente a ${pc(i)} ao mês?`,
      r: eq,
      d: [i * k, arred(eq + 1, 2), arred(i * k - 1, 2), arred(eq * 1.5, 2)],
      f: pc,
      x: expl('taxas equivalentes', `Compondo ${k} meses: (1 + i)^${k} − 1. Sai maior que ${i * k}% por causa dos juros sobre juros.`, `${num(1 + i / 100)}^${k} = ${num(1 + eq / 100, 4)} ⇒ ${pc(eq)}.`),
    };
  },
  // 2. taxa real
  (r) => {
    const [nom, inf] = r.pick([[15.5, 5], [21, 10], [26, 5], [32, 10], [8.15, 3], [12.2, 2]]);
    const real = arred(((1 + nom / 100) / (1 + inf / 100) - 1) * 100, 2);
    return {
      e: `Uma aplicação rendeu ${pc(nom)} em um ano em que a inflação foi de ${pc(inf)}. Qual foi a taxa real de rendimento?`,
      r: real,
      d: [arred(nom - inf, 2), arred(nom + inf, 2), arred(nom / inf, 2), arred(real + 1, 2)],
      f: pc,
      x: expl('fórmula de Fisher', '(1 + nominal) = (1 + real)(1 + inflação). Divida os fatores, não subtraia as taxas.', `${num(1 + nom / 100, 4)} ÷ ${num(1 + inf / 100)} = ${num(1 + real / 100, 4)} ⇒ real = ${pc(real)}.`),
    };
  },
  // 3. nominal → efetiva
  (r) => {
    const [nom, k, txt] = r.pick([[12, 12, 'mensalmente'], [24, 12, 'mensalmente'], [20, 2, 'semestralmente'], [40, 4, 'trimestralmente'], [36, 12, 'mensalmente']]);
    const ef = arred(((1 + nom / 100 / k) ** k - 1) * 100, 2);
    return {
      e: `Uma taxa nominal de ${pc(nom)} ao ano, capitalizada ${txt}, corresponde a que taxa efetiva anual (aproximada)?`,
      r: ef,
      d: [nom, arred(nom / k, 2), arred(ef + 2, 2), arred(nom * 1.5, 2)],
      f: pc,
      x: expl('nominal x efetiva', 'A taxa nominal é dividida pelos períodos (proporcional) e depois composta.', `${num(nom)}% ÷ ${k} = ${num(nom / k)}% por período; (1 + ${num(nom / 100 / k, 4)})^${k} − 1 ≈ ${pc(ef)}.`),
    };
  },
  // 4. valor presente
  (r) => {
    const M = r.int(2, 20) * 1000, [i, n, f] = r.pick([[10, 2, 1.21], [20, 2, 1.44], [10, 3, 1.331], [5, 2, 1.1025], [25, 2, 1.5625]]);
    const C = M / f;
    return {
      e: `Quanto se deve aplicar hoje, a juros compostos de ${pc(i)} ao mês, para obter ${reais(M)} daqui a ${n} meses?`,
      r: arred(C, 2),
      d: [arred(M / (1 + (i * n) / 100), 2), arred(M * (1 - (i * n) / 100), 2), arred(M / (1 + i / 100), 2), arred(M - (M * (f - 1)) / 2, 2)],
      f: reais,
      x: expl('trazer o dinheiro para hoje', 'Valor presente = valor futuro ÷ (1 + i)ⁿ.', `${num(M)} ÷ ${num(f, 4)} ≈ ${reais(C)}.`),
    };
  },
  // 5. só os juros compostos
  (r) => {
    const C = r.int(5, 50) * 1000, i = r.pick([1, 2, 5, 10]), n = r.pick([2, 3]);
    const jc = C * ((1 + i / 100) ** n - 1);
    return {
      e: `Um investidor aplicou ${reais(C)} a juros compostos de ${pc(i)} ao mês. Quanto ele recebeu apenas de juros após ${n} meses?`,
      r: arred(jc, 2),
      d: [arred((C * i * n) / 100, 2), arred(C + jc, 2), arred((C * i) / 100, 2), arred(jc * 1.1, 2)],
      f: reais,
      x: expl('juros = montante − capital', 'J = C[(1 + i)ⁿ − 1].', `${num(C)} × (${num((1 + i / 100) ** n, 6)} − 1) = ${reais(jc)}.`),
    };
  },
  // 6. duas aplicações
  (r) => {
    const tot = r.pick([10000, 20000, 30000]), [i1, i2] = r.pick([[1, 2], [2, 3], [1.5, 2.5]]), t = r.pick([4, 5, 10]);
    const x = r.pick([0.2, 0.3, 0.4, 0.6]) * tot;
    const J = ((x * i1 + (tot - x) * i2) * t) / 100;
    return {
      e: `Um investidor dividiu ${reais(tot)} em duas aplicações a juros simples: uma a ${pc(i1)} ao mês e a outra a ${pc(i2)} ao mês. Após ${t} meses, recebeu ${reais(J)} de juros no total. Quanto aplicou à taxa de ${pc(i1)}?`,
      r: x,
      d: [tot - x, tot / 2, x + 1000, (J * 100) / (i1 * t)],
      f: reais,
      x: expl('sistema com juros simples', `Chame de x o valor a ${pc(i1)}; o resto (${num(tot)} − x) vai a ${pc(i2)}.`, `${num(i1 / 100)}·${t}·x + ${num(i2 / 100)}·${t}·(${num(tot)} − x) = ${num(J)} ⇒ x = ${reais(x)}.`),
    };
  },
  // 7. comparar pagamentos (equivalência de capitais)
  (r) => {
    const i = r.pick([2, 5, 10]), n = 2, V = r.pick([1100, 2420, 4410, 3025]);
    const f = (1 + i / 100) ** n;
    const vista = arred(V / f * r.pick([0.97, 1.03]), 2);
    const pv = V / f;
    const melhor = vista < pv ? 'pagar à vista' : 'pagar daqui a 2 meses';
    return {
      e: `Uma loja oferece duas opções: pagar ${reais(vista)} hoje ou ${reais(V)} daqui a 2 meses. Se o dinheiro do cliente rende ${pc(i)} ao mês (juros compostos), qual opção é mais vantajosa para ele?`,
      r: `É melhor ${melhor}, pois o valor presente da opção a prazo é ${reais(pv)}`,
      d: [
        `É melhor ${melhor === 'pagar à vista' ? 'pagar daqui a 2 meses' : 'pagar à vista'}, pois o valor presente da opção a prazo é ${reais(pv)}`,
        'As duas opções são equivalentes',
        `É melhor pagar daqui a 2 meses, porque ${reais(V)} é o valor nominal`,
        `É melhor pagar à vista, porque sempre há desconto`,
      ],
      x: expl('comparar na mesma data', 'Dinheiro em datas diferentes só se compara depois de levado para a mesma data (aqui, hoje).', `${num(V)} ÷ ${num(f, 4)} = ${reais(pv)} hoje, contra ${reais(vista)} à vista.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[3].vezes = 2;
dificil[5].vezes = 2;

export default [
  {
    disciplina: 'matematica-financeira',
    arquivo: '01-juros-simples-e-compostos',
    titulo: 'Juros simples e compostos',
    provas: ['Concursos', 'ENEM'],
    descricao: 'Capital, taxa, tempo, montante; taxas proporcionais, equivalentes, nominais, efetivas e reais.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.juros[0])], [...medio, ...novos(NOVOS.juros[1])], [...dificil, ...novos(NOVOS.juros[2])]],
  },
];
