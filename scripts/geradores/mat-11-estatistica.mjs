// Matemática — Estatística.
import { arred, expl, nome, num, pct, reais } from './util.mjs';

const lista = (v) => v.join(', ');
const soma = (v) => v.reduce((a, b) => a + b, 0);
const media = (v) => soma(v) / v.length;
const mediana = (v) => {
  const s = [...v].sort((a, b) => a - b);
  const k = s.length;
  return k % 2 ? s[(k - 1) / 2] : (s[k / 2 - 1] + s[k / 2]) / 2;
};
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho'];

const facil = [
  // 1. média simples
  (r) => {
    const n = r.int(4, 7);
    const v = Array.from({ length: n }, () => r.int(2, 10));
    v[0] += (n - (soma(v) % n)) % n;
    return {
      e: `As notas de um aluno em ${n} provas foram ${lista(v)}. Qual é a média aritmética dessas notas?`,
      r: media(v),
      d: [mediana(v), media(v) + 1, Math.max(...v) - Math.min(...v), arred(soma(v) / (n - 1), 2)],
      x: expl('média aritmética', 'Some tudo e divida pela quantidade: é o valor que cada um teria se tudo fosse dividido igualmente.', `${soma(v)} ÷ ${n} = ${num(media(v))}.`),
    };
  },
  // 2. mediana (ímpar)
  (r) => {
    const v = r.shuffle(Array.from({ length: r.pick([5, 7, 9]) }, () => r.int(10, 60)));
    return {
      e: `O tempo, em minutos, que ${v.length} estudantes levaram para chegar à escola foi: ${lista(v)}. Qual é a mediana desses tempos?`,
      r: mediana(v),
      d: [v[Math.floor(v.length / 2)] === mediana(v) ? arred(media(v), 2) + 1 : v[Math.floor(v.length / 2)], arred(media(v), 2), Math.max(...v), Math.min(...v)],
      x: expl('mediana', 'ANTES de tudo, coloque os dados em ordem. A mediana é o valor do meio.', `Ordenando: ${lista([...v].sort((a, b) => a - b))}. Meio: ${mediana(v)}.`),
    };
  },
  // 3. moda
  (r) => {
    const moda = r.int(34, 42);
    const v = r.shuffle([moda, moda, moda, ...Array.from({ length: 5 }, (_, i) => moda - 6 + i * 3 + (i >= 2 ? 1 : 0))]);
    return {
      e: `Os números de calçado vendidos em uma loja pela manhã foram: ${lista(v)}. Qual é a moda?`,
      r: moda,
      d: [mediana(v) === moda ? moda + 1 : mediana(v), Math.max(...v), Math.min(...v), arred(media(v), 1) === moda ? moda - 1 : arred(media(v), 1)],
      x: expl('moda', 'Moda é o valor que mais aparece — o "da moda".', `${moda} aparece ${v.filter((x) => x === moda).length} vezes.`),
    };
  },
  // 4. média ponderada
  (r) => {
    const notas = [r.int(4, 10), r.int(4, 10), r.int(4, 10)];
    const pesos = r.pick([[1, 2, 3], [2, 3, 5], [1, 1, 2], [3, 3, 4]]);
    const sp = soma(pesos);
    const tot = notas.reduce((s, n, i) => s + n * pesos[i], 0);
    return {
      e: `Em um concurso, as provas têm pesos ${pesos.join(', ')}. Um candidato tirou ${notas.join(', ')}, respectivamente. Qual é sua média ponderada?`,
      r: arred(tot / sp, 2),
      d: [arred(media(notas), 2), arred(tot / sp + 0.5, 2), arred(tot / 3, 2), arred(tot / sp - 1, 2)],
      x: expl('média ponderada', 'Cada nota "vale" tantas vezes quanto o seu peso; divide-se pela soma dos pesos.', `(${notas.map((n, i) => `${n}·${pesos[i]}`).join(' + ')}) ÷ ${sp} = ${tot} ÷ ${sp} ≈ ${num(tot / sp)}.`),
    };
  },
  // 5. setor do gráfico
  (r) => {
    const p = r.pick([10, 15, 20, 25, 30, 40, 45]);
    const tema = r.pick(['dos entrevistados preferem ônibus', 'do orçamento vai para alimentação', 'dos alunos escolheram vôlei']);
    return {
      e: `Em um gráfico de setores (pizza), ${p}% ${tema}. Qual é o ângulo do setor que representa esse grupo?`,
      r: (p * 360) / 100,
      d: [p, (p * 180) / 100, (p * 360) / 10, 360 - (p * 360) / 100],
      f: (v) => `${num(v)}°`,
      x: expl('porcentagem da volta', 'O círculo inteiro (360°) representa 100%.', `${p}% de 360° = ${num((p * 360) / 100)}°.`),
    };
  },
  // 6. leitura de dados mensais
  (r) => {
    const v = [r.int(20, 40)];
    for (let i = 1; i < 6; i++) v.push(v[i - 1] + r.int(-8, 12));
    const aum = v.map((x, i) => (i ? x - v[i - 1] : -Infinity));
    const iMax = aum.indexOf(Math.max(...aum));
    if (aum.filter((a) => a === aum[iMax]).length > 1) return facil[5](r);
    return {
      e: `As vendas de uma loja (em milhares de reais) no primeiro semestre foram: ${MESES.map((m, i) => `${m}: ${v[i]}`).join('; ')}. Em que mês houve o MAIOR aumento em relação ao mês anterior?`,
      r: MESES[iMax],
      d: MESES.filter((m) => m !== MESES[iMax]),
      x: expl('variação entre meses', 'O maior aumento não é o maior valor: é a maior diferença em relação ao mês anterior.', MESES.slice(1).map((m, i) => `${m}: ${aum[i + 1] >= 0 ? '+' : ''}${aum[i + 1]}`).join('; ') + `. Maior: ${MESES[iMax]}.`),
    };
  },
  // 7. qual medida representa melhor
  (r) => {
    const base = Array.from({ length: 6 }, () => r.int(18, 30) * 100);
    const extremo = r.pick([25000, 30000, 40000]);
    const v = r.shuffle([...base, extremo]);
    return {
      e: `Os salários mensais dos 7 funcionários de uma pequena empresa são (em reais): ${lista(v.map((x) => num(x)))}. Qual medida descreve melhor o salário "típico" desses funcionários, e por quê?`,
      r: `A mediana (${reais(mediana(v))}), porque não é distorcida pelo salário muito alto`,
      d: [`A média (${reais(arred(media(v), 2))}), porque usa todos os valores`, `A amplitude (${reais(Math.max(...v) - Math.min(...v))}), porque mostra a variação`, `O maior salário (${reais(extremo)}), porque representa o grupo`, `A média (${reais(arred(media(v), 2))}), porque é sempre igual à mediana`],
      x: expl('média x mediana', 'Um valor muito discrepante "puxa" a média, mas quase não mexe na mediana.', `Média ≈ ${reais(arred(media(v), 2))}, bem acima de quase todos; mediana = ${reais(mediana(v))}.`),
    };
  },
  // 8. frequência relativa
  (r) => {
    const n = r.pick([50, 60, 80, 100, 120]), k = r.int(5, Math.floor(n / 3));
    const face = r.int(1, 6);
    return {
      e: `Um dado foi lançado ${n} vezes, e a face ${face} saiu ${k} vezes. Qual foi a frequência relativa da face ${face}?`,
      r: arred((k / n) * 100, 2),
      d: [k, arred((n / k) * 10, 2), arred((k / 6) * 10, 2), arred((k / n) * 10, 2)],
      f: (v) => pct(v),
      x: expl('frequência relativa', 'É a frequência absoluta dividida pelo total de observações.', `${k} ÷ ${n} = ${num(k / n, 4)} = ${num((k / n) * 100)}%.`),
    };
  },
  // 9. moda em tabela de frequências
  (r) => {
    const vals = r.pick([[36, 37, 38, 39, 40], [1, 2, 3, 4, 5], [15, 16, 17, 18, 19]]);
    const freq = r.shuffle([2, 5, 9, 4, 3]);
    const moda = vals[freq.indexOf(9)];
    return {
      e: `Uma tabela de frequências mostra: ${vals.map((v, i) => `valor ${v} → ${freq[i]} ocorrências`).join('; ')}. Qual é a moda?`,
      r: moda,
      d: [9, vals[2] === moda ? vals[1] : vals[2], ...vals.filter((v) => v !== moda && v !== vals[2])],
      x: expl('moda na tabela', 'Na tabela, a moda é o VALOR com maior frequência — não a frequência em si.', `A maior frequência é 9, do valor ${moda}.`),
    };
  },
];
facil[0].vezes = 2;
facil[1].vezes = 2;
facil[3].vezes = 2;
facil[7].vezes = 2;

const medio = [
  // 1. mediana (par)
  (r) => {
    const v = r.shuffle(Array.from({ length: r.pick([6, 8, 10]) }, () => r.int(10, 80)));
    const md = mediana(v);
    const s = [...v].sort((a, b) => a - b);
    return {
      e: `Qual é a mediana do conjunto de dados: ${lista(v)}?`,
      r: md,
      d: [s[s.length / 2], s[s.length / 2 - 1], arred(media(v), 2), (v[v.length / 2 - 1] + v[v.length / 2]) / 2],
      x: expl('mediana com quantidade par', 'Com quantidade par de dados, há dois do meio: a mediana é a média deles.', `Ordenando: ${lista(s)}. (${s[s.length / 2 - 1]} + ${s[s.length / 2]}) ÷ 2 = ${num(md)}.`),
    };
  },
  // 2. nota mínima
  (r) => {
    const n = r.pick([3, 4]), alvo = r.pick([6, 7, 7.5, 8]);
    const notas = Array.from({ length: n }, () => r.int(5, 9));
    const falta = alvo * (n + 1) - soma(notas);
    if (falta < 3 || falta > 10) return medio[1](r);
    return {
      e: `Para ser aprovado, um aluno precisa de média ${num(alvo)} em ${n + 1} provas de mesmo peso. Nas ${n} primeiras, tirou ${notas.join(', ')}. Que nota mínima ele precisa na última prova?`,
      r: falta,
      d: [alvo, falta + 1, arred(falta / 2, 2), arred(falta - 1.5, 2)],
      x: expl('média ao contrário', 'Média × quantidade = soma necessária. Desconte o que já foi feito.', `${num(alvo)} × ${n + 1} = ${num(alvo * (n + 1))}; já tem ${soma(notas)}; falta ${num(falta)}.`),
    };
  },
  // 3. amplitude
  (r) => {
    const v = Array.from({ length: 8 }, () => r.int(12, 40));
    return {
      e: `As temperaturas máximas (°C) de uma cidade em 8 dias foram ${lista(v)}. Qual foi a amplitude desse conjunto?`,
      r: Math.max(...v) - Math.min(...v),
      d: [Math.max(...v), arred(media(v), 1), Math.max(...v) + Math.min(...v), mediana(v)],
      f: (x) => `${num(x)} °C`,
      x: expl('amplitude', 'Mede o "espalhamento" mais simples: maior valor − menor valor.', `${Math.max(...v)} − ${Math.min(...v)} = ${Math.max(...v) - Math.min(...v)} °C.`),
    };
  },
  // 4. alguém sai do grupo
  (r) => {
    const n = r.pick([5, 8, 10, 20]), mI = r.int(20, 60), x = r.int(5, 100);
    const nova = (n * mI - x) / (n - 1);
    if (!Number.isInteger(nova * 100)) return medio[3](r);
    return {
      e: `A média das idades de ${n} pessoas de um grupo é ${mI} anos. Uma pessoa de ${x} anos sai do grupo. Qual passa a ser a média das idades?`,
      r: arred(nova, 2),
      d: [mI, arred((n * mI - x) / n, 2), arred(nova + 2, 2), arred(nova - 3, 2)],
      f: (v) => `${num(v)} anos`,
      x: expl('trabalhar com a soma', 'Média não se subtrai direto; reconstrua a soma, mexa nela e divida de novo.', `${n} × ${mI} = ${n * mI}; − ${x} = ${n * mI - x}; ÷ ${n - 1} = ${num(nova)}.`),
    };
  },
  // 5. média em tabela
  (r) => {
    const freq = [0, 1, 2, 3, 4].map(() => r.int(1, 8));
    const tot = soma(freq);
    const s = freq.reduce((acc, f, i) => acc + i * f, 0);
    return {
      e: `Em uma pesquisa sobre quantidade de filhos: 0 filhos: ${freq[0]} famílias; 1 filho: ${freq[1]}; 2 filhos: ${freq[2]}; 3 filhos: ${freq[3]}; 4 filhos: ${freq[4]}. Qual é a média de filhos por família?`,
      r: arred(s / tot, 2),
      d: [2, arred(s / 5, 2), arred(tot / 5, 2), arred(s / tot + 0.5, 2)],
      x: expl('média com frequências', 'Cada valor entra tantas vezes quanto a sua frequência.', `(0·${freq[0]} + 1·${freq[1]} + 2·${freq[2]} + 3·${freq[3]} + 4·${freq[4]}) ÷ ${tot} = ${s}/${tot} ≈ ${num(s / tot)}.`),
    };
  },
  // 6. setor → quantidade
  (r) => {
    const tot = r.pick([360, 720, 1800, 3600]), ang = r.pick([30, 45, 60, 72, 90, 120]);
    return {
      e: `Em uma pesquisa com ${num(tot)} pessoas, o gráfico de setores mostra que a opção "cinema" ocupa um setor de ${ang}°. Quantas pessoas escolheram cinema?`,
      r: (tot * ang) / 360,
      d: [ang, (tot * ang) / 100, (tot * ang) / 180, tot / ang],
      x: expl('setor como fração', `${ang}° é a fração ${ang}/360 do círculo.`, `${num(tot)} × ${ang}/360 = ${num((tot * ang) / 360)} pessoas.`),
    };
  },
  // 7. corrigir um valor errado
  (r) => {
    const n = r.pick([10, 20, 25]), m0 = r.int(12, 40);
    const certo = r.int(12, 49);
    const lido = Number(String(certo).split('').reverse().join(''));
    if (lido === certo) return medio[6](r);
    const nova = (n * m0 - lido + certo) / n;
    return {
      e: `A média de ${n} números foi calculada como ${m0}. Depois, percebeu-se que o número ${certo} tinha sido digitado como ${lido}. Qual é a média correta?`,
      r: arred(nova, 2),
      d: [m0, arred(m0 + (lido - certo) / n, 2), arred(nova + 1, 2), arred((n * m0 - lido + certo) / (n - 1), 2)],
      x: expl('corrigir a soma', 'Reconstrua a soma, troque o valor errado pelo certo e divida de novo.', `${n} × ${m0} = ${n * m0}; − ${lido} + ${certo} = ${n * m0 - lido + certo}; ÷ ${n} = ${num(nova)}.`),
    };
  },
  // 8. distância entre média e mediana
  (r) => {
    const v = Array.from({ length: 5 }, () => r.int(10, 30));
    v.push(r.int(80, 150));
    const md = mediana(v), mu = media(v);
    return {
      e: `Os tempos, em minutos, de 6 corredores amadores em uma prova foram: ${lista(r.shuffle(v))}. Qual é a diferença entre a média e a mediana desses tempos?`,
      r: arred(mu - md, 2),
      d: [arred(Math.max(...v) - md, 2), arred(md - Math.min(...v), 2), 0, arred((mu - md) / 2, 2)],
      f: (x) => `${num(x)} min`,
      x: expl('efeito do valor extremo', 'O tempo muito alto puxa a média para cima, mas a mediana quase não se mexe.', `Média: ${soma(v)} ÷ 6 ≈ ${num(mu)}; mediana: ${num(md)}; diferença ≈ ${num(mu - md)}.`),
    };
  },
  // 9. média de dados agrupados
  (r) => {
    const classes = [[0, 10], [10, 20], [20, 30], [30, 40]];
    const f = classes.map(() => r.int(2, 10));
    const pm = classes.map(([a, b]) => (a + b) / 2);
    const s = pm.reduce((acc, p, i) => acc + p * f[i], 0);
    return {
      e: `O tempo de espera em uma fila foi registrado em classes: de 0 a 10 min: ${f[0]} pessoas; de 10 a 20 min: ${f[1]}; de 20 a 30 min: ${f[2]}; de 30 a 40 min: ${f[3]}. Usando o ponto médio de cada classe, qual é a média estimada de espera?`,
      r: arred(s / soma(f), 2),
      d: [20, arred(s / 4, 2), arred((s + 5 * soma(f)) / soma(f), 2), arred(s / soma(f) - 5, 2)],
      f: (x) => `${num(x)} min`,
      x: expl('ponto médio da classe', 'Sem os valores exatos, cada pessoa é representada pelo meio da sua classe (5, 15, 25, 35).', `(5·${f[0]} + 15·${f[1]} + 25·${f[2]} + 35·${f[3]}) ÷ ${soma(f)} = ${s}/${soma(f)} ≈ ${num(s / soma(f))} min.`),
    };
  },
  // 10. completar com valor faltante
  (r) => {
    const v = [r.int(2, 6), r.int(4, 8), r.int(5, 9), r.int(7, 12)];
    const alvo = Math.ceil((soma(v) + 3) / 5);
    const x = alvo * 5 - soma(v);
    const todos = [...v, x];
    return {
      e: `Os números ${lista(v)} e x têm média ${alvo}. Qual é a mediana desses cinco números?`,
      r: mediana(todos),
      d: [alvo, x, mediana(v), mediana(todos) + 1],
      x: expl('média → valor que falta → mediana', 'Use a média para descobrir x (soma = média × quantidade) e depois ordene.', `Soma = ${alvo * 5} ⇒ x = ${x}. Ordenando: ${lista([...todos].sort((a, b) => a - b))}. Mediana: ${mediana(todos)}.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[3].vezes = 2;
medio[5].vezes = 2;

const dificil = [
  // 1. variância
  (r) => {
    const mu = r.int(5, 20), ds = r.pick([[1, 1, 3, 3], [2, 2, 4, 4], [1, 3, 5, 7], [2, 2, 2, 6]]);
    const v = r.shuffle([mu - ds[0], mu + ds[0], mu - ds[1], mu + ds[1], mu - ds[2], mu + ds[2], mu - ds[3], mu + ds[3]]);
    const vari = v.reduce((s, x) => s + (x - mu) ** 2, 0) / v.length;
    return {
      e: `Qual é a variância (populacional) do conjunto ${lista(v)}?`,
      r: arred(vari, 2),
      d: [arred(Math.sqrt(vari), 2), arred((vari * v.length) / (v.length - 1), 2), mu, arred(vari * 2, 2)],
      x: expl('variância', 'É a média dos quadrados das distâncias de cada valor até a média.', `Média ${mu}; soma dos desvios ao quadrado = ${v.reduce((s, x) => s + (x - mu) ** 2, 0)}; ÷ ${v.length} = ${num(vari)}.`),
    };
  },
  // 2. média de duas turmas
  (r) => {
    const n1 = r.pick([10, 20, 30, 40]), m1 = r.int(5, 9), n2 = r.pick([10, 15, 20, 30]), m2 = r.int(4, 9);
    if (m1 === m2 || n1 === n2) return dificil[1](r);
    const mg = (n1 * m1 + n2 * m2) / (n1 + n2);
    return {
      e: `A turma A, com ${n1} alunos, teve média ${m1} em uma prova; a turma B, com ${n2} alunos, teve média ${m2}. Qual é a média geral dos ${n1 + n2} alunos?`,
      r: arred(mg, 2),
      d: [arred((m1 + m2) / 2, 2), arred(mg + 0.5, 2), arred((n1 * m2 + n2 * m1) / (n1 + n2), 2), Math.max(m1, m2)],
      x: expl('média ponderada pelo tamanho', 'A turma maior pesa mais. Junte os pontos de todo mundo e divida pelo total de alunos.', `(${n1}·${m1} + ${n2}·${m2}) ÷ ${n1 + n2} = ${n1 * m1 + n2 * m2}/${n1 + n2} ≈ ${num(mg)}.`),
    };
  },
  // 3. mediana em tabela
  (r) => {
    const freq = [1, 2, 3, 4, 5].map(() => r.int(2, 9));
    const tot = soma(freq);
    const ordenado = [1, 2, 3, 4, 5].flatMap((v, i) => Array(freq[i]).fill(v));
    const md = mediana(ordenado);
    return {
      e: `Em uma avaliação de 1 a 5 estrelas, um aplicativo recebeu: 1★: ${freq[0]}; 2★: ${freq[1]}; 3★: ${freq[2]}; 4★: ${freq[3]}; 5★: ${freq[4]} avaliações. Qual é a mediana das notas?`,
      r: md,
      d: [md === 3 ? 2.5 : 3, arred(media(ordenado), 2), freq.indexOf(Math.max(...freq)) + 1, md + 1, md - 0.5],
      x: expl('frequência acumulada', 'Com muitos dados repetidos, acumule as frequências para achar a(s) posição(ões) do meio.', `São ${tot} avaliações; ${tot % 2 ? `o ${(tot + 1) / 2}º valor` : `a média do ${tot / 2}º e do ${tot / 2 + 1}º valores`} da lista ordenada dá ${num(md)}.`),
    };
  },
  // 4. coeficiente de variação
  (r) => {
    const mu = r.pick([20, 40, 50, 80]), dp = r.pick([2, 4, 5, 8, 10]);
    return {
      e: `Um conjunto de dados tem média ${mu} e desvio padrão ${dp}. Qual é o coeficiente de variação (CV)?`,
      r: arred((dp / mu) * 100, 2),
      d: [arred(mu / dp, 2), arred(((dp * dp) / mu) * 100, 2), dp, arred((dp / mu) * 10, 2)],
      f: (v) => `${num(v)}%`,
      x: expl('dispersão relativa', 'O CV compara o desvio padrão com o tamanho da média (útil para comparar grupos de escalas diferentes).', `${dp} ÷ ${mu} = ${num(dp / mu, 3)} = ${num((dp / mu) * 100)}%.`),
    };
  },
  // 5. transformação dos dados
  (r) => {
    const v = Array.from({ length: 6 }, () => r.int(2, 9));
    v[0] += (6 - (soma(v) % 6)) % 6;
    const k = r.pick([2, 3, 10]), c = r.int(1, 5);
    const mu = media(v);
    return {
      e: `Um conjunto de dados tem média ${num(mu)}. Se cada valor for multiplicado por ${k} e, em seguida, somado a ${c}, qual será a nova média?`,
      r: arred(mu * k + c, 2),
      d: [arred(mu * k, 2), arred(mu + c, 2), arred((mu + c) * k, 2), arred(mu * k + c * k + 1, 2)],
      x: expl('propriedades da média', 'A média "acompanha" as operações feitas em todos os dados.', `${k} × ${num(mu)} + ${c} = ${num(mu * k + c)}.`),
    };
  },
  // 6. desvio padrão
  (r) => {
    const mu = r.int(10, 30), d = r.pick([[2, 2, 2, 2], [3, 3, 3, 3], [1, 1, 5, 5], [4, 4, 2, 2]]);
    const v = r.shuffle([mu - d[0], mu + d[0], mu - d[1], mu + d[1], mu - d[2], mu + d[2], mu - d[3], mu + d[3]]);
    const vari = v.reduce((s, x) => s + (x - mu) ** 2, 0) / v.length;
    return {
      e: `Qual é o desvio padrão (populacional) do conjunto ${lista(v)}?`,
      r: arred(Math.sqrt(vari), 2),
      d: [arred(vari, 2), arred(Math.sqrt(vari) + 1, 2), arred(media(d), 2) === arred(Math.sqrt(vari), 2) ? arred(Math.sqrt(vari) / 2, 2) : arred(media(d), 2), mu],
      x: expl('desvio padrão = raiz da variância', 'Calcule a variância (média dos desvios ao quadrado) e tire a raiz para voltar à unidade dos dados.', `Média ${mu}; variância = ${num(vari)}; desvio padrão = √${num(vari)} ≈ ${num(Math.sqrt(vari))}.`),
    };
  },
  // 7. qual atleta é mais regular
  (r) => {
    const mu = r.int(10, 14);
    const a = [mu - 1, mu, mu + 1, mu, mu];
    const b = [mu - 3, mu + 3, mu, mu - 2, mu + 2];
    const [x, y] = [nome(r), nome(r)];
    if (x === y) return dificil[6](r);
    const dpA = Math.sqrt(a.reduce((s, v) => s + (v - mu) ** 2, 0) / 5), dpB = Math.sqrt(b.reduce((s, v) => s + (v - mu) ** 2, 0) / 5);
    return {
      e: `Em 5 provas de 100 m, ${x} fez os tempos (s) ${lista(a)} e ${y} fez ${lista(b)}. Os dois têm a mesma média. Quem foi mais regular, segundo o desvio padrão?`,
      r: `${x}, com desvio padrão ≈ ${num(dpA)} s`,
      d: [`${y}, com desvio padrão ≈ ${num(dpB)} s`, 'Os dois, porque têm a mesma média', `${x}, com desvio padrão ≈ ${num(dpB)} s`, `${y}, porque fez o melhor tempo individual`],
      x: expl('desvio padrão mede regularidade', 'Média igual não quer dizer desempenho igual. Quanto menor o desvio padrão, mais próximos da média estão os tempos.', `Média ${mu} para os dois. Desvios: ${x} ≈ ${num(dpA)}; ${y} ≈ ${num(dpB)}.`),
    };
  },
  // 8. média de grupo após entrada
  (r) => {
    const n = r.pick([9, 14, 19, 24]), m0 = r.int(150, 175), novo = r.pick([190, 195, 200, 205]);
    const nova = (n * m0 + novo) / (n + 1);
    if (!Number.isInteger(nova * 10)) return dificil[7](r);
    return {
      e: `Um time de ${n} jogadores tem altura média de ${m0} cm. Com a chegada de um novo jogador, a média passou a ser ${num(nova)} cm. Qual é a altura do novo jogador?`,
      r: novo,
      d: [arred(nova + (nova - m0), 1), arred(nova * 2 - m0, 1), m0 + n, novo + 5],
      f: (v) => `${num(v)} cm`,
      x: expl('soma antes e depois', 'Altura do novo = soma nova − soma antiga.', `${n + 1} × ${num(nova)} − ${n} × ${m0} = ${num((n + 1) * nova)} − ${n * m0} = ${novo} cm.`),
    };
  },
  // 9. desvio médio
  (r) => {
    const mu = r.int(5, 15);
    const desvios = r.pick([[1, 2, 3, 2, 2], [4, 2, 0, 2, 4], [3, 1, 1, 3, 2]]);
    const sinais = [-1, 1, -1, 1, 0];
    let v = desvios.map((d, i) => mu + sinais[i] * d);
    const ajuste = soma(v) - 5 * mu;
    v[4] -= ajuste;
    const dm = v.reduce((s, x) => s + Math.abs(x - mu), 0) / 5;
    return {
      e: `Qual é o desvio médio absoluto do conjunto ${lista(v)} em relação à sua média?`,
      r: arred(dm, 2),
      d: [0, arred(dm * 2, 2), arred(Math.sqrt(v.reduce((s, x) => s + (x - mu) ** 2, 0) / 5), 2) === arred(dm, 2) ? arred(dm + 1, 2) : arred(Math.sqrt(v.reduce((s, x) => s + (x - mu) ** 2, 0) / 5), 2), mu],
      x: expl('desvio médio', 'Média das distâncias (sem sinal) de cada valor até a média. Sem o módulo, a soma dos desvios daria sempre zero.', `Média ${mu}; distâncias: ${v.map((x) => Math.abs(x - mu)).join(', ')}; média delas = ${num(dm)}.`),
    };
  },
  // 10. tirar o maior e o menor
  (r) => {
    const v = Array.from({ length: 7 }, () => r.int(60, 99)).map((x) => x / 10);
    const s = [...v].sort((a, b) => a - b);
    const corte = s.slice(1, -1);
    return {
      e: `Em uma competição de ginástica, a nota final é a média das notas dos juízes, descartando a maior e a menor. Os 7 juízes deram: ${v.map((x) => num(x, 1)).join('; ')}. Qual é a nota final?`,
      r: arred(media(corte), 2),
      d: [arred(media(v), 2), mediana(v), arred((soma(v) - s[0]) / 6, 2), arred(media(corte) + 0.2, 2)],
      x: expl('média aparada', 'Descartar os extremos protege a média de um juiz muito rigoroso ou muito generoso.', `Sem ${num(s[0])} e ${num(s[6])}: soma ${num(soma(corte))} ÷ 5 = ${num(media(corte))}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[1].vezes = 2;
dificil[5].vezes = 2;
dificil[9].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '11-estatistica',
    titulo: 'Estatística',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Média, mediana, moda, média ponderada, leitura de tabelas e gráficos, variância e desvio padrão.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
