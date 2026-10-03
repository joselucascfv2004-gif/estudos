// Matemática — Equações, inequações e sistemas.
import { expl, fracao, nome, nomes, num, reais } from './util.mjs';

const termo = (v, x = '', primeiro = false) => {
  if (v === 0) return '';
  const s = v < 0 ? (primeiro ? '−' : ' − ') : primeiro ? '' : ' + ';
  const a = Math.abs(v);
  return s + (a === 1 && x ? '' : num(a)) + x;
};
const poli = (a, b, c) => `${termo(a, 'x²', true)}${termo(b, 'x')}${termo(c)}`;

const facil = [
  // 1. 1º grau puro
  (r) => {
    const a = r.int(2, 9), x = r.int(-6, 12), b = r.int(-20, 20);
    if (b === 0) return facil[0](r);
    const c = a * x + b;
    return {
      e: `Resolva a equação ${a}x${termo(b)} = ${num(c)}.`,
      r: x,
      d: [(c + b) / a, c - b, (c - b) / -a, x + 2],
      x: expl('operação inversa', 'Para isolar x, desfaça as operações na ordem contrária, fazendo o mesmo dos dois lados da igualdade.', `${a}x = ${num(c)}${termo(-b)} = ${num(a * x)} ⇒ x = ${num(x)}.`),
    };
  },
  // 2. número + dobro/triplo
  (r) => {
    const x = r.int(5, 60), k = r.pick([2, 3, 4]);
    const n = x + k * x;
    const pal = { 2: 'dobro', 3: 'triplo', 4: 'quádruplo' }[k];
    return {
      e: `A soma de um número com o seu ${pal} é ${n}. Que número é esse?`,
      r: x,
      d: [n / k, n - k, k * x, x + k],
      x: expl('tradução para equação', `"Um número" vira x; "o seu ${pal}" vira ${k}x.`, `x + ${k}x = ${n} ⇒ ${k + 1}x = ${n} ⇒ x = ${x}.`),
    };
  },
  // 3. soma e diferença
  (r) => {
    const x = r.int(8, 40), y = r.int(1, x - 3);
    return {
      e: `Em uma votação entre dois projetos, foram ${x + y} votos ao todo, e o projeto vencedor teve ${x - y} votos a mais que o outro. Quantos votos teve o vencedor?`,
      r: x,
      d: [y, x + y, x - y, (x + y) / 2 === x ? x + 1 : (x + y) / 2],
      x: expl('sistema por adição', 'Com soma e diferença, somar as duas equações elimina uma das letras.', `x + y = ${x + y} e x − y = ${x - y}. Somando: 2x = ${2 * x} ⇒ x = ${x}.`),
    };
  },
  // 4. idades
  (r) => {
    const f = r.int(4, 15), k = r.pick([3, 4, 5]);
    return {
      e: `Uma mãe tem hoje o ${k === 3 ? 'triplo' : k === 4 ? 'quádruplo' : 'quíntuplo'} da idade da filha, e a soma das duas idades é ${f + k * f} anos. Qual é a idade da filha?`,
      r: f,
      d: [k * f, (f + k * f) / k, f + k, f * 2],
      f: (v) => `${num(v)} anos`,
      x: expl('tradução para equação', `Filha: x; mãe: ${k}x.`, `x + ${k}x = ${f + k * f} ⇒ ${k + 1}x = ${f + k * f} ⇒ x = ${f}.`),
    };
  },
  // 5. compras
  (r) => {
    const p = r.pick([3, 4, 5, 6]), q = r.int(2, 6), unid = r.int(2, 6);
    const preco = r.int(6, 25);
    const tot = p * preco + q * unid;
    return {
      e: `${nome(r)} comprou ${p} cadernos iguais e ${unid} canetas de ${reais(q)} cada, gastando ${reais(tot)} no total. Qual é o preço de cada caderno?`,
      r: preco,
      d: [tot / p, (tot - q) / p, preco + q, tot - q * unid],
      f: reais,
      x: expl('equação do 1º grau', 'Separe o que já se sabe (as canetas) e deixe o desconhecido (o caderno) sozinho.', `${p}x + ${unid} × ${q} = ${tot} ⇒ ${p}x = ${tot - q * unid} ⇒ x = ${reais(preco)}.`),
    };
  },
  // 6. equação com parênteses (pura)
  (r) => {
    const a = r.int(2, 5), b = r.int(1, 6), c = r.int(1, 9), d = r.int(1, a - 1 || 1);
    if (d >= a) return facil[5](r);
    const x = r.int(-5, 10);
    const e2 = a * (x - b) + c - d * x;
    return {
      e: `Qual é o valor de x em ${a}(x − ${b}) + ${c} = ${d === 1 ? '' : d}x${termo(e2)}?`,
      r: x,
      d: [x + 1, x - 2, (e2 + b - c) / (a - d), -x || 3],
      x: expl('propriedade distributiva', 'Primeiro "abra" o parêntese multiplicando; depois junte os x de um lado e os números do outro.', `${a}x − ${a * b} + ${c} = ${d}x${termo(e2)} ⇒ ${a - d}x = ${e2 + a * b - c} ⇒ x = ${x}.`),
    };
  },
  // 7. frações (pura)
  (r) => {
    const [p, q] = r.pick([[2, 3], [3, 4], [2, 5], [4, 6], [3, 5]]);
    const k = r.int(1, 5);
    const x = p * q * k;
    const soma = x / p + x / q;
    return {
      e: `Resolva: x/${p} + x/${q} = ${num(soma)}.`,
      r: x,
      d: [soma * p, soma * q, soma / 2, x / 2, soma],
      x: expl('MMC para eliminar denominadores', `Multiplique tudo pelo MMC dos denominadores (${p * q / (p === 4 && q === 6 ? 2 : 1)}) para trabalhar só com números inteiros.`, `x(1/${p} + 1/${q}) = ${num(soma)} ⇒ x × ${fracao(p + q, p * q)} = ${num(soma)} ⇒ x = ${x}.`),
    };
  },
  // 8. táxi
  (r) => {
    const band = r.pick([4.5, 5, 5.5, 6]), km = r.pick([2.5, 3, 3.2, 3.5]);
    const dist = r.int(6, 25);
    const tot = band + km * dist;
    return {
      e: `Em uma cidade, a corrida de táxi custa ${reais(band)} de bandeirada mais ${reais(km)} por quilômetro rodado. Uma corrida saiu por ${reais(tot)}. Quantos quilômetros foram percorridos?`,
      r: dist,
      d: [tot / km, (tot + band) / km, dist + 2, Math.round(tot / (band + km))],
      f: (v) => `${num(v)} km`,
      x: expl('equação do 1º grau', 'O valor total é a parte fixa mais a parte que depende dos quilômetros.', `${num(band)} + ${num(km)}x = ${num(tot)} ⇒ ${num(km)}x = ${num(tot - band)} ⇒ x = ${dist} km.`),
    };
  },
  // 9. x² = k
  (r) => {
    const a = r.pick([2, 3, 5]), x = r.int(2, 9);
    return {
      e: `Qual é a solução positiva da equação ${a}x² − ${a * x * x} = 0?`,
      r: x,
      d: [x * x, a * x, x * 2, (a * x * x) / 2],
      x: expl('equação do 2º grau incompleta', 'Sem o termo em x, basta isolar x² e tirar a raiz quadrada (que tem duas respostas, + e −).', `${a}x² = ${a * x * x} ⇒ x² = ${x * x} ⇒ x = ±${x}. A positiva é ${x}.`),
    };
  },
  // 10. x² − kx = 0
  (r) => {
    const k = r.int(2, 12), a = r.pick([1, 2, 3]);
    return {
      e: `A equação ${a === 1 ? '' : a}x² − ${a * k}x = 0 tem duas raízes. Uma delas é zero. Qual é a outra?`,
      r: k,
      d: [a * k, -k, k * k, k / 2 === Math.floor(k / 2) ? k / 2 : k + 1],
      x: expl('colocar em evidência', 'Sem termo independente, coloque x em evidência: um produto é zero quando um dos fatores é zero.', `x(${a === 1 ? '' : a}x − ${a * k}) = 0 ⇒ x = 0 ou x = ${k}.`),
    };
  },
  // 11. balança
  (r) => {
    const cx = r.int(2, 9), a = r.int(3, 5), b = r.int(1, a - 1), c = r.int(1, 8);
    const d = (a - b) * cx + c;
    return {
      e: `Em uma balança de pratos equilibrada, de um lado há ${a} caixas iguais e um peso de ${c} kg; do outro, ${b === 1 ? '1 caixa' : `${b} caixas`} e um peso de ${d} kg. Quanto pesa cada caixa?`,
      r: cx,
      d: [d - c, (d + c) / (a + b), cx + 1, (d - c) / a],
      f: (v) => `${num(v)} kg`,
      x: expl('balança = equação', 'Tirar a mesma coisa dos dois pratos mantém o equilíbrio. Tire as caixas que aparecem dos dois lados e os pesos repetidos.', `${a}x + ${c} = ${b}x + ${d} ⇒ ${a - b}x = ${d - c} ⇒ x = ${cx} kg.`),
    };
  },
  // 12. planos de celular
  (r) => {
    const fixo = r.pick([20, 30, 40, 45]), pa = r.pick([0.3, 0.4, 0.5]), pb = r.pick([0.8, 0.9, 1]);
    const m = fixo / (pb - pa);
    if (!Number.isInteger(m)) return facil[11](r);
    return {
      e: `O plano A de telefonia cobra ${reais(fixo)} por mês mais ${reais(pa)} por minuto; o plano B não tem mensalidade e cobra ${reais(pb)} por minuto. Para quantos minutos de ligação por mês os dois planos custam o mesmo?`,
      r: m,
      d: [fixo / pb, fixo / pa, m * 2, m / 2],
      f: (v) => `${num(Math.round(v))} min`,
      x: expl('igualar as expressões', 'Escreva o custo de cada plano em função dos minutos e iguale.', `${fixo} + ${num(pa)}x = ${num(pb)}x ⇒ ${num(pb - pa)}x = ${fixo} ⇒ x = ${m} min. Acima disso, o plano A fica mais barato.`),
    };
  },
  // 13. pares consecutivos
  (r) => {
    const n = 2 * r.int(5, 40);
    return {
      e: `A soma de três números pares consecutivos é ${3 * n + 6}. Qual é o menor deles?`,
      r: n,
      d: [n + 2, n + 4, n - 2, n + 1],
      x: expl('incógnita bem escolhida', 'Pares consecutivos andam de 2 em 2: x, x + 2 e x + 4.', `x + (x + 2) + (x + 4) = ${3 * n + 6} ⇒ 3x = ${3 * n} ⇒ x = ${n}.`),
    };
  },
  // 14. testar raízes
  (r) => {
    const r1 = r.int(1, 6), r2 = r.int(-4, 7);
    if (r1 === r2 || r2 === 0) return facil[13](r);
    const b = -(r1 + r2), c = r1 * r2;
    const cand = [r1, -r1, r1 + 1, -r2, r2 + 2].filter((v) => v !== r2);
    return {
      e: `Qual dos números abaixo é raiz (solução) da equação ${poli(1, b, c)} = 0?`,
      r: r1,
      d: cand.slice(1),
      x: expl('substituir e conferir', 'Um número é raiz quando, colocado no lugar de x, deixa a expressão igual a zero. Teste as alternativas.', `${r1}² ${termo(b * r1)} ${termo(c)} = ${r1 * r1 + b * r1 + c}. As raízes são ${r1} e ${r2}.`.replace(/  /g, ' ')),
    };
  },
  // 15. sistema por substituição (puro)
  (r) => {
    const k = r.pick([2, 3, 4]), x = r.int(2, 12);
    return {
      e: `Resolva o sistema { y = ${k}x ; x + y = ${x + k * x} } e dê o valor de y.`,
      r: k * x,
      d: [x, x + k, (x + k * x) / 2, k * x + 1],
      x: expl('substituição', 'Se a primeira equação já diz quanto vale y, troque y por isso na segunda.', `x + ${k}x = ${x + k * x} ⇒ ${k + 1}x = ${x + k * x} ⇒ x = ${x}; y = ${k} × ${x} = ${k * x}.`),
    };
  },
];
facil[0].vezes = 2;
facil[4].vezes = 2;

const medio = [
  // 1. maior raiz
  (r) => {
    const r1 = r.int(-6, 5), r2 = r.int(r1 + 1, 9);
    const s = r1 + r2, p = r1 * r2;
    return {
      e: `Qual é a maior raiz da equação ${poli(1, -s, p)} = 0?`,
      r: r2,
      d: [r1, -r2, s === r2 ? s + 3 : s, p === r2 ? r2 + 2 : p, -r1 === r2 ? r2 + 1 : -r1],
      x: expl('soma e produto', 'Em x² − Sx + P = 0, procure dois números que somam S e multiplicam P. É mais rápido que Bhaskara.', `Somam ${s} e multiplicam ${p}: ${r1} e ${r2}. A maior é ${r2}.`),
    };
  },
  // 2. cinema
  (r) => {
    const inteira = r.pick([20, 30, 40, 50]), meia = inteira / 2;
    const ni = r.int(20, 150), nm = r.int(20, 150);
    const n = ni + nm, tot = ni * inteira + nm * meia;
    return {
      e: `Em uma sessão de cinema, o ingresso inteiro custava ${reais(inteira)} e a meia-entrada, ${reais(meia)}. Entraram ${n} pessoas e foram arrecadados ${reais(tot)}. Quantas pessoas pagaram meia-entrada?`,
      r: nm,
      d: [ni, Math.round(n / 2), Math.round(tot / inteira), nm + 10],
      x: expl('sistema de equações', 'Duas informações (número de pessoas e dinheiro) viram duas equações.', `x + y = ${n} e ${inteira}x + ${meia}y = ${tot}. Multiplicando a 1ª por ${inteira} e subtraindo: ${meia}y = ${n * inteira - tot} ⇒ y = ${nm}.`),
    };
  },
  // 3. inequação
  (r) => {
    const a = r.int(2, 7), b = r.int(-15, 15), c = r.int(-10, 30);
    const lim = (c - b) / a;
    const certo = Number.isInteger(lim) ? lim + 1 : Math.floor(lim) + 1;
    return {
      e: `Qual é o menor número inteiro que satisfaz a inequação ${a}x${termo(b)} > ${c}?`,
      r: certo,
      d: [certo - 1, certo + 1, Math.floor((c + b) / a), -certo],
      x: expl('inequação do 1º grau', 'Resolve-se como equação; o sinal ">" significa que o limite NÃO entra.', `${a}x > ${c - b} ⇒ x > ${num(lim)}. O menor inteiro maior que ${num(lim)} é ${certo}.`),
    };
  },
  // 4. galinhas e coelhos
  (r) => {
    const g = r.int(5, 30), c = r.int(5, 30);
    return {
      e: `Em um sítio há galinhas e coelhos, num total de ${g + c} cabeças e ${2 * g + 4 * c} pés. Quantos coelhos há no sítio?`,
      r: c,
      d: [g, (g + c) / 2 === c ? c + 3 : Math.round((g + c) / 2), Math.round((2 * g + 4 * c) / 4), c + 2],
      x: expl('sistema (ou o truque dos pés)', 'Se todos fossem galinhas, haveria 2 pés por cabeça. Cada pé que sobra a mais vem dos coelhos (2 pés extras cada).', `${g + c} × 2 = ${2 * (g + c)} pés; sobram ${2 * c}; ${2 * c} ÷ 2 = ${c} coelhos.`),
    };
  },
  // 5. sistema e produto
  (r) => {
    const x = r.int(2, 9), y = r.int(1, 9), a = r.int(2, 5), b = r.int(1, 4);
    return {
      e: `Resolvendo o sistema { x + y = ${x + y} ; ${a}x − ${b === 1 ? '' : b}y = ${a * x - b * y} }, qual é o valor de x · y?`,
      r: x * y,
      d: [x + y, x * y + x, a * x - b * y, x * x],
      x: expl('substituição', 'Isole uma letra na equação mais simples e substitua na outra.', `y = ${x + y} − x ⇒ ${a}x − ${b}(${x + y} − x) = ${a * x - b * y} ⇒ ${a + b}x = ${a * x - b * y + b * (x + y)} ⇒ x = ${x}, y = ${y}; x · y = ${x * y}.`),
    };
  },
  // 6. quantas raízes (Δ)
  (r) => {
    const tipo = r.pick([0, 1, 2]);
    let a, b, c;
    if (tipo === 0) { a = r.pick([1, 2, 3]); b = r.pick([2, 4, 6]); c = (b * b) / (4 * a) + r.int(1, 5); }
    else if (tipo === 1) { const k = r.int(1, 5); a = r.pick([1, 4]); b = -2 * k * Math.sqrt(a); c = k * k; }
    else { a = r.pick([1, 2]); b = r.int(-7, 7); c = -r.int(1, 9); }
    const D = b * b - 4 * a * c;
    const txt = D < 0 ? 'nenhuma raiz real' : D === 0 ? 'duas raízes reais iguais (uma raiz dupla)' : 'duas raízes reais diferentes';
    return {
      e: `Sem resolver a equação ${poli(a, b, c)} = 0, o que se pode afirmar sobre suas raízes?`,
      r: txt,
      d: ['nenhuma raiz real', 'duas raízes reais iguais (uma raiz dupla)', 'duas raízes reais diferentes', 'infinitas raízes reais', 'exatamente três raízes reais'],
      x: expl('discriminante (Δ)', 'O Δ = b² − 4ac decide: positivo → duas raízes; zero → uma (dupla); negativo → nenhuma raiz real.', `Δ = ${b * b} − ${4 * a * c} = ${D}.`),
    };
  },
  // 7. equação com frações
  (r) => {
    const x = r.int(2, 20);
    const v = (x + 1) / 2 - (x - 2) / 3;
    if (!Number.isInteger(v * 2)) return medio[6](r);
    return {
      e: `Resolva a equação (x + 1)/2 − (x − 2)/3 = ${num(v)}.`,
      r: x,
      d: [x + 4, x - 3, 6 * v, x * 2],
      x: expl('MMC dos denominadores', 'Multiplique os dois lados por 6 (MMC de 2 e 3). Cuidado com o sinal de menos antes da fração: ele troca o sinal dos dois termos.', `3(x + 1) − 2(x − 2) = ${num(6 * v)} ⇒ 3x + 3 − 2x + 4 = ${num(6 * v)} ⇒ x = ${x}.`),
    };
  },
  // 8. área do terreno
  (r) => {
    const l = r.int(5, 15), k = r.int(2, 8);
    return {
      e: `Um terreno retangular tem comprimento ${k} m maior que a largura e área de ${l * (l + k)} m². Qual é a largura do terreno?`,
      r: l,
      d: [l + k, (l * (l + k)) / k, Math.round(Math.sqrt(l * (l + k))) === l ? l + 1 : Math.round(Math.sqrt(l * (l + k))), l - 1],
      f: (v) => `${num(v)} m`,
      x: expl('equação do 2º grau', 'Largura x, comprimento x + ' + k + '. Área = x(x + ' + k + ').', `x² + ${k}x − ${l * (l + k)} = 0 ⇒ raízes ${l} e ${-(l + k)}. Medida não é negativa: x = ${l} m.`),
    };
  },
  // 9. inequação dupla
  (r) => {
    const a = r.pick([2, 3]), b = r.int(-3, 3), lo = r.int(-8, 0), hi = r.int(5, 15);
    const xs = [];
    for (let x = -50; x <= 50; x++) if (lo < a * x + b && a * x + b <= hi) xs.push(x);
    return {
      e: `Quantos números inteiros satisfazem ${lo} < ${a}x${termo(b)} ≤ ${hi}?`,
      r: xs.length,
      d: [xs.length + 1, xs.length - 1, hi - lo, Math.round((hi - lo) / a) + 2],
      x: expl('inequação dupla', 'Faça a mesma operação nas três partes ao mesmo tempo.', `${lo - b} < ${a}x ≤ ${hi - b} ⇒ ${num((lo - b) / a)} < x ≤ ${num((hi - b) / a)}. Inteiros: ${xs.join(', ')} (${xs.length}).`),
    };
  },
  // 10. produto de idades
  (r) => {
    const a = r.int(4, 14), d = r.int(2, 6);
    const [x, y] = nomes(r, 2);
    return {
      e: `${x} tem ${d} anos a mais que ${y}, e o produto das idades dos dois é ${a * (a + d)}. Qual é a idade de ${x}?`,
      r: a + d,
      d: [a, a * (a + d) / d, a + d + 1, 2 * a],
      f: (v) => `${num(v)} anos`,
      x: expl('equação do 2º grau', `Idade de ${y}: x; de ${x}: x + ${d}.`, `x(x + ${d}) = ${a * (a + d)} ⇒ x² + ${d}x − ${a * (a + d)} = 0 ⇒ x = ${a}. ${x}: ${a + d} anos.`),
    };
  },
  // 11. sistema 3×3 simétrico
  (r) => {
    const x = r.int(2, 12), y = r.int(2, 12), z = r.int(2, 12);
    const itens = r.pick([['uma camiseta', 'uma bermuda', 'um boné'], ['um pastel', 'um suco', 'uma coxinha'], ['um lápis', 'uma borracha', 'um apontador']]);
    return {
      e: `Em uma loja, ${itens[0]} e ${itens[1]} custam juntos ${reais(x + y)}; ${itens[1]} e ${itens[2]}, ${reais(y + z)}; ${itens[0]} e ${itens[2]}, ${reais(x + z)}. Quanto custa ${itens[2]}?`,
      r: z,
      d: [x, y, (x + y + z) / 2 === z ? z + 2 : (x + y + z) / 2, x + y + z],
      f: reais,
      x: expl('somar todas as equações', 'Somando as três, cada item aparece duas vezes. Metade dessa soma é o preço dos três juntos.', `2(x + y + z) = ${2 * (x + y + z)} ⇒ x + y + z = ${x + y + z}. Item procurado: ${x + y + z} − ${x + y} = ${z}.`),
    };
  },
  // 12. incógnita no denominador
  (r) => {
    const x = r.pick([2, 3, 4, 5, 6]), a = x * r.int(2, 6), b = r.int(1, 8);
    return {
      e: `Qual é o valor de x na equação ${a}/x + ${b} = ${a / x + b}?`,
      r: x,
      d: [a / (a / x + b), a, x + 1, a / b],
      x: expl('operação inversa', 'Isole a fração primeiro; depois "inverta" a divisão. Lembre que x não pode ser zero.', `${a}/x = ${a / x} ⇒ x = ${a} ÷ ${a / x} = ${x}.`),
    };
  },
  // 13. ponto de equilíbrio
  (r) => {
    const fixo = r.pick([3000, 4500, 6000, 9000]), cu = r.pick([8, 12, 15]), pv = r.pick([20, 25, 30]);
    const q = fixo / (pv - cu);
    if (!Number.isInteger(q)) return medio[12](r);
    return {
      e: `Uma pequena fábrica de bolos tem custo fixo mensal de ${reais(fixo)} e gasta ${reais(cu)} para produzir cada bolo, que é vendido por ${reais(pv)}. Quantos bolos precisa vender por mês para não ter prejuízo nem lucro?`,
      r: q,
      d: [fixo / pv, fixo / cu, q * 2, Math.round(fixo / (pv + cu))],
      x: expl('receita = custo', 'O ponto de equilíbrio é onde o que entra (receita) é igual ao que sai (custo total).', `${pv}x = ${fixo} + ${cu}x ⇒ ${pv - cu}x = ${fixo} ⇒ x = ${q} bolos.`),
    };
  },
  // 14. montar a equação a partir das raízes
  (r) => {
    const r1 = r.int(-6, -1), r2 = r.int(1, 7);
    const s = r1 + r2, p = r1 * r2;
    return {
      e: `Qual equação do 2º grau tem raízes ${r1} e ${r2}?`,
      r: `${poli(1, -s, p)} = 0`,
      d: [`${poli(1, s, p)} = 0`, `${poli(1, -s, -p)} = 0`, `${poli(1, s, -p)} = 0`, `${poli(1, -p, s)} = 0`, `${poli(1, p, s)} = 0`],
      x: expl('soma e produto ao contrário', 'Uma equação com raízes r₁ e r₂ é x² − (r₁ + r₂)x + r₁·r₂ = 0.', `Soma ${s}, produto ${p}: ${poli(1, -s, p)} = 0.`),
    };
  },
];
medio[1].vezes = 2;
medio[3].vezes = 2;
medio[5].vezes = 2;

const dificil = [
  // 1. biquadrada
  (r) => {
    const a = r.int(1, 4), b = r.int(a + 1, 6);
    const A = a * a + b * b, B = a * a * b * b;
    return {
      e: `A soma das raízes reais positivas da equação x⁴ − ${A}x² + ${B} = 0 é:`,
      r: a + b,
      d: [A, a * b, 0, A + 1, 2 * (a + b)],
      x: expl('troca de variável', 'Equação biquadrada vira do 2º grau fazendo y = x².', `y² − ${A}y + ${B} = 0 ⇒ y = ${a * a} ou ${b * b} ⇒ x = ±${a} ou ±${b}. Positivas: ${a} + ${b} = ${a + b}.`),
    };
  },
  // 2. perímetro e área
  (r) => {
    const a = r.int(3, 15), b = r.int(a + 1, 20);
    return {
      e: `Um terreno retangular tem perímetro de ${2 * (a + b)} m e área de ${a * b} m². Qual é a medida do maior lado?`,
      r: b,
      d: [a, a + b, (a + b) / 2 === b ? b + 1 : (a + b) / 2, b - a === a ? b + 2 : b - a],
      f: (v) => `${num(v)} m`,
      x: expl('soma e produto', 'Os lados somam metade do perímetro e multiplicam a área: eles são as raízes de t² − St + P = 0.', `t² − ${a + b}t + ${a * b} = 0 ⇒ t = ${a} ou ${b}. Maior lado: ${b} m.`),
    };
  },
  // 3. Δ = 0
  (r) => {
    const b = r.pick([2, 4, 6, 8, 10, 12]) * r.pick([1, -1]);
    const m = (b * b) / 4;
    return {
      e: `Para qual valor de m a equação x²${termo(b, 'x')} + m = 0 possui duas raízes reais e iguais?`,
      r: m,
      d: [-m, m / 2, b * b, Math.abs(b) / 2],
      x: expl('discriminante igual a zero', 'Raízes iguais acontecem exatamente quando Δ = 0.', `Δ = ${b * b} − 4m = 0 ⇒ m = ${m}.`),
    };
  },
  // 4. 1/x1 + 1/x2
  (r) => {
    const r1 = r.int(1, 6), r2 = r.int(1, 6), a = r.pick([1, 2, 3]);
    const B = -a * (r1 + r2), C = a * r1 * r2;
    return {
      e: `Sendo x₁ e x₂ as raízes de ${poli(a, B, C)} = 0, qual é o valor de 1/x₁ + 1/x₂?`,
      r: fracao(r1 + r2, r1 * r2),
      d: [fracao(r1 * r2, r1 + r2), fracao(r1 + r2, 1), fracao(-(r1 + r2), r1 * r2), fracao(r1 * r2, 1), fracao(r1 + r2 + 1, r1 * r2)],
      x: expl('soma e produto sem achar as raízes', 'Some as frações: 1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁ · x₂). Soma = −b/a e produto = c/a.', `(${-B}/${a}) ÷ (${C}/${a}) = ${fracao(-B, C)}.`),
    };
  },
  // 5. conta dividida
  (r) => {
    const n = r.int(4, 12), preco = r.pick([20, 30, 40, 60]);
    const total = n * preco;
    const novoN = n + r.pick([1, 2, 3, 4]);
    const novoPreco = total / novoN;
    if (!Number.isInteger(novoPreco)) return dificil[4](r);
    return {
      e: `Um grupo de amigos ia dividir igualmente uma conta de ${reais(total)}. Como ${novoN - n === 1 ? 'mais uma pessoa entrou' : `mais ${novoN - n} pessoas entraram`} no grupo, cada um pagou ${reais(preco - novoPreco)} a menos. Quantas pessoas havia inicialmente?`,
      r: n,
      d: [novoN, n - 1, n + 5, n * 2],
      x: expl('equação do 2º grau com frações', 'Cota antiga − cota nova = diferença dada.', `${total}/x − ${total}/(x + ${novoN - n}) = ${preco - novoPreco} ⇒ x = ${n} (cada um pagaria ${reais(preco)}; com ${novoN} pessoas, ${reais(novoPreco)}).`),
    };
  },
  // 6. x1² + x2²
  (r) => {
    const r1 = r.int(-5, 6), r2 = r.int(-5, 6);
    if (r1 === 0 || r2 === 0) return dificil[5](r);
    const s = r1 + r2, p = r1 * r2;
    return {
      e: `Sem calcular as raízes, determine x₁² + x₂², sendo x₁ e x₂ as raízes de ${poli(1, -s, p)} = 0.`,
      r: r1 * r1 + r2 * r2,
      d: [s * s, s * s + 2 * p, p * p, s * s - p],
      x: expl('produto notável', '(x₁ + x₂)² = x₁² + 2x₁x₂ + x₂². Logo, x₁² + x₂² = S² − 2P.', `S = ${s}, P = ${p}: ${s * s} − ${2 * p} = ${r1 * r1 + r2 * r2}.`),
    };
  },
  // 7. sistema sem solução
  (r) => {
    const a = r.pick([1, 2, 3]), b = r.pick([2, 3, 4]), m = r.pick([2, 3]);
    const c1 = r.int(2, 9);
    const c2 = m * c1 + r.int(1, 5);
    return {
      e: `Para que valor de k o sistema { ${a === 1 ? '' : a}x + ${b}y = ${c1} ; ${m * a}x + ky = ${c2} } NÃO tem solução?`,
      r: m * b,
      d: [b, m * b + 1, -m * b, m + b],
      x: expl('retas paralelas', 'Um sistema 2×2 não tem solução quando as retas são paralelas: os coeficientes de x e y são proporcionais, mas os termos independentes não.', `${m * a}/${a} = k/${b} ⇒ k = ${m * b}; e ${c2} ≠ ${m} × ${c1} = ${m * c1}, então não há solução.`),
    };
  },
  // 8. equação irracional (raiz estranha)
  (r) => {
    const x = r.int(3, 9), b = r.int(1, x - 1);
    const a = (x - b) ** 2 - x;
    if (a <= -x) return dificil[7](r);
    // outra raiz de x + a = (x − b)²
    const B = 2 * b + 1, C = b * b - a;
    const outra = B - x;
    return {
      e: `Qual é a solução da equação √(x${termo(a)}) = x − ${b}?`,
      r: `x = ${x}`,
      d: [`x = ${outra}`, `x = ${x} ou x = ${outra}`, `x = ${x + b}`, 'não tem solução real', `x = ${b}`],
      x: expl('elevar ao quadrado e conferir', 'Ao elevar os dois lados ao quadrado podem surgir raízes "falsas". Sempre teste no enunciado original (a raiz quadrada não pode dar negativo).', `x${termo(a)} = (x − ${b})² ⇒ x² − ${B}x + ${C} = 0 ⇒ x = ${x} ou x = ${outra}. Com x = ${outra}, o lado direito fica ${outra - b} < 0: não serve.`),
    };
  },
  // 9. inequação do 2º grau
  (r) => {
    const r1 = r.int(-3, 3), r2 = r1 + r.int(2, 6);
    const ints = r2 - r1 + 1;
    return {
      e: `Quantos números inteiros satisfazem a inequação ${poli(1, -(r1 + r2), r1 * r2)} ≤ 0?`,
      r: ints,
      d: [ints - 2, ints - 1, ints + 1, r2 - r1 === 2 ? 0 : 2],
      x: expl('estudo do sinal da parábola', 'Com a > 0, a parábola fica abaixo do eixo (≤ 0) ENTRE as raízes, incluindo-as.', `Raízes ${r1} e ${r2}; solução ${r1} ≤ x ≤ ${r2}: ${ints} inteiros.`),
    };
  },
  // 10. barco no rio
  (r) => {
    const [vb, vc] = r.pick([[10, 2], [12, 3], [15, 5], [9, 3], [14, 2]]);
    const d = (vb - vc) * (vb + vc) * r.pick([1, 2]) / mmc2(vb - vc, vb + vc);
    const tsub = d / (vb - vc), tdes = d / (vb + vc);
    if (!Number.isInteger(tsub * 2) || !Number.isInteger(tdes * 2)) return dificil[9](r);
    return {
      e: `Um barco leva ${num(tsub)} h para subir um trecho de ${num(d)} km de um rio (contra a correnteza) e ${num(tdes)} h para descer o mesmo trecho (a favor). Qual é a velocidade da correnteza?`,
      r: vc,
      d: [vb, (vb + vc) / 2, vc * 2, d / (tsub + tdes)],
      f: (v) => `${num(v)} km/h`,
      x: expl('sistema de equações', 'Subindo, a correnteza atrapalha (v − c); descendo, ajuda (v + c).', `v − c = ${num(d)}/${num(tsub)} = ${vb - vc}; v + c = ${num(d)}/${num(tdes)} = ${vb + vc}. Subtraindo: 2c = ${2 * vc} ⇒ c = ${vc} km/h.`),
    };
  },
  // 11. módulo
  (r) => {
    const a = r.pick([2, 3]), b = r.int(1, 9), c = r.int(2, 12);
    const x1 = (c + b) / a, x2 = (b - c) / a;
    if (!Number.isInteger(x1 * 2) || !Number.isInteger(x2 * 2)) return dificil[10](r);
    return {
      e: `A soma das soluções da equação |${a}x − ${b}| = ${c} é:`,
      r: x1 + x2,
      d: [x1, x1 - x2, c / a, 0],
      x: expl('módulo = distância', 'O módulo vale c quando o que está dentro vale +c ou −c. São duas equações.', `${a}x − ${b} = ${c} ⇒ x = ${num(x1)}; ${a}x − ${b} = −${c} ⇒ x = ${num(x2)}. Soma: ${num(x1 + x2)}.`),
    };
  },
  // 12. número de dois algarismos
  (r) => {
    const d = r.int(1, 7), u = r.int(d + 1, 9);
    const n = 10 * d + u, inv = 10 * u + d;
    return {
      e: `Um número de dois algarismos tem soma dos algarismos igual a ${d + u}. Trocando a posição dos algarismos, o número aumenta ${inv - n}. Qual é o número original?`,
      r: n,
      d: [inv, 10 * (d + 1) + (u - 1), n + 9, d + u + (inv - n)],
      x: expl('valor posicional', 'Um número com dezena d e unidade u vale 10d + u. Invertido, vale 10u + d.', `d + u = ${d + u} e (10u + d) − (10d + u) = 9(u − d) = ${inv - n} ⇒ u − d = ${u - d}. Logo d = ${d}, u = ${u}: ${n}.`),
    };
  },
  // 13. inequação-quociente
  (r) => {
    const a = r.int(1, 6), b = r.int(1, 6);
    return {
      e: `Qual é o conjunto solução, nos números reais, da inequação (x − ${a})/(x + ${b}) ≥ 0?`,
      r: `x < −${b} ou x ≥ ${a}`,
      d: [`x ≤ −${b} ou x ≥ ${a}`, `−${b} < x ≤ ${a}`, `x ≥ ${a}`, `−${b} ≤ x ≤ ${a}`, `x > −${b}`],
      x: expl('quadro de sinais', 'Um quociente é positivo quando numerador e denominador têm o mesmo sinal. O denominador nunca pode ser zero, por isso −' + b + ' fica de fora.', `Numerador ≥ 0 para x ≥ ${a}; denominador > 0 para x > −${b}. Mesmo sinal: x < −${b} ou x ≥ ${a}.`),
    };
  },
];
dificil[1].vezes = 2;
dificil[5].vezes = 2;
dificil[8].vezes = 2;

function mmc2(a, b) {
  let x = a, y = b;
  while (y) [x, y] = [y, x % y];
  return (a / x) * b;
}

export default [
  {
    disciplina: 'matematica',
    arquivo: '04-equacoes-e-sistemas',
    titulo: 'Equações, inequações e sistemas',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Equações do 1º e 2º grau, sistemas lineares, inequações, módulo e problemas com texto.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
