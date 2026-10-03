// Matemática — Razão, proporção e regra de três.
import { arred, expl, fracao, mmc, nome, nomes, num, reais } from './util.mjs';

const horas = (v) => {
  const h = Math.floor(v + 1e-9), m = Math.round((v - h) * 60);
  return m ? (h ? `${h} h ${m} min` : `${m} min`) : `${h} h`;
};

const facil = [
  // 1. receita (direta)
  (r) => {
    const ovos = r.int(2, 5), bolos = r.int(2, 4), novo = r.int(5, 12);
    if ((ovos * novo) % bolos || ovos === bolos) return facil[0](r);
    return {
      e: `Uma confeiteira usa ${ovos} ovos para fazer ${bolos} bolos. Mantendo a mesma receita, quantos ovos ela precisa para fazer ${novo} bolos?`,
      r: (ovos * novo) / bolos,
      d: [ovos * novo, novo + ovos - bolos, (bolos * novo) / ovos, (ovos * novo) / bolos + 2],
      x: expl('regra de três direta', 'Mais bolos pedem mais ovos, na mesma proporção.', `${ovos}/${bolos} = x/${novo} ⇒ x = ${ovos} × ${novo} ÷ ${bolos} = ${(ovos * novo) / bolos}.`),
    };
  },
  // 2. pedreiros (inversa)
  (r) => {
    const k = r.pick([4, 6, 8, 10, 12]), d = r.pick([6, 9, 10, 12, 15]), m = r.pick([3, 5, 8, 15, 20]);
    if ((k * d) % m || k === m) return facil[1](r);
    return {
      e: `${k} pedreiros constroem um muro em ${d} dias. Mantendo o mesmo ritmo de trabalho, em quantos dias ${m} pedreiros construiriam o mesmo muro?`,
      r: (k * d) / m,
      d: [(m * d) / k, d + k - m, d * 2, (k * d) / m + 3],
      x: expl('regra de três inversa', 'Mais pedreiros terminam em menos dias: o produto (pedreiros × dias) é o "tamanho" da obra e não muda.', `${k} × ${d} = ${m} × x ⇒ x = ${(k * d) / m} dias.`),
    };
  },
  // 3. dividir na razão
  (r) => {
    const a = r.int(1, 4), b = r.int(a + 1, 7);
    const v = (a + b) * r.int(5, 40) * 10;
    return {
      e: `Dois irmãos dividiram ${reais(v)} na razão ${a} : ${b}. Quanto recebeu o irmão que ficou com a maior parte?`,
      r: (v * b) / (a + b),
      d: [(v * a) / (a + b), v / 2, v / b, (v * b) / (a + b) + 50],
      f: reais,
      x: expl('divisão em partes', `Razão ${a} : ${b} quer dizer que o total foi cortado em ${a + b} partes iguais.`, `Cada parte: ${reais(v)} ÷ ${a + b} = ${reais(v / (a + b))}. Maior: ${b} × ${reais(v / (a + b))} = ${reais((v * b) / (a + b))}.`),
    };
  },
  // 4. razão parte/todo
  (r) => {
    const m = r.int(6, 30), f = r.int(6, 30);
    if (m === f) return facil[3](r);
    return {
      e: `Em uma sala há ${m} meninos e ${f} meninas. A razão entre o número de meninos e o número total de alunos é:`,
      r: fracao(m, m + f),
      d: [fracao(m, f), fracao(f, m + f), fracao(f, m), fracao(m + f, m)],
      x: expl('razão', 'Razão é uma divisão na ordem pedida: primeiro o que vem antes do "e", depois o que vem depois.', `Total = ${m + f}. Meninos/total = ${m}/${m + f} = ${fracao(m, m + f)}.`),
    };
  },
  // 5. velocidade constante
  (r) => {
    const v = r.pick([60, 72, 80, 90, 100, 110]), t = r.pick([2, 3, 4, 5]);
    const novo = r.pick([1.5, 2.5, 6, 7]);
    return {
      e: `Um ônibus percorre ${v * t} km em ${t} horas, com velocidade constante. Quantos quilômetros percorrerá em ${num(novo)} horas, mantendo essa velocidade?`,
      r: v * novo,
      d: [v * t * novo, v * novo + v, v * t + novo, (v * t) / novo],
      f: (x) => `${num(x)} km`,
      x: expl('taxa unitária', 'Descubra quanto ele anda em 1 hora (velocidade) e multiplique pelo novo tempo.', `${v * t} ÷ ${t} = ${v} km/h; ${v} × ${num(novo)} = ${num(v * novo)} km.`),
    };
  },
  // 6. escala de maquete
  (r) => {
    const esc = r.pick([50, 75, 100, 200]);
    const real = r.pick([6, 9, 12, 15, 18]);
    return {
      e: `Um arquiteto faz a maquete de um prédio na escala 1 : ${esc}. Se o prédio terá ${real} m de altura, qual será a altura da maquete?`,
      r: (real * 100) / esc,
      d: [real / esc, (real * 10) / esc, real * esc, (real * 1000) / esc],
      f: (v) => `${num(v)} cm`,
      x: expl('escala', `Escala 1 : ${esc}: cada 1 cm da maquete vale ${esc} cm reais. Passe tudo para a mesma unidade antes.`, `${real} m = ${real * 100} cm; ${real * 100} ÷ ${esc} = ${num((real * 100) / esc)} cm.`),
    };
  },
  // 7. proporção de tintas
  (r) => {
    const [a, b] = r.pick([[3, 2], [5, 2], [4, 3], [2, 5], [3, 4]]);
    const k = r.int(3, 6);
    return {
      e: `Para obter um tom de verde, um pintor mistura latas de tinta azul e amarela na proporção de ${a} para ${b}. Se ele usar ${a * k} latas de azul, quantas latas de amarela deve usar?`,
      r: b * k,
      d: [a * k + b - a, a * k - b, (a * k * a) / b, b * k + 1],
      x: expl('proporção', `A razão azul : amarela deve continuar ${a} : ${b}. O azul foi multiplicado por ${k}; o amarelo também deve ser.`, `${a * k} ÷ ${a} = ${k}; ${b} × ${k} = ${b * k} latas.`),
    };
  },
  // 8. tempo de impressão
  (r) => {
    const pag = r.pick([30, 40, 45, 60]), min = r.pick([2, 3, 4, 5]);
    const alvo = r.pick([90, 150, 180, 240]);
    const t = (alvo * min) / pag;
    if (!Number.isInteger(t * 2)) return facil[7](r);
    return {
      e: `Uma impressora imprime ${pag} páginas em ${min} minutos. Mantendo esse ritmo, quanto tempo leva para imprimir um relatório de ${alvo} páginas?`,
      r: t,
      d: [(alvo * pag) / min / 10, alvo / pag, t + min, t * 2],
      f: (v) => (Number.isInteger(v) ? `${num(v)} min` : `${Math.floor(v)} min 30 s`),
      x: expl('regra de três direta', 'Mais páginas levam mais tempo, na mesma proporção.', `${pag} páginas → ${min} min; ${alvo} páginas → ${alvo} × ${min} ÷ ${pag} = ${num(t)} min.`),
    };
  },
  // 9. candidatos por vaga
  (r) => {
    const vagas = r.pick([20, 40, 50, 80]);
    const cv = r.pick([12, 15, 25, 30, 45]);
    const cand = vagas * cv;
    return {
      e: `Um concurso teve ${num(cand)} candidatos inscritos para ${vagas} vagas. A relação candidato/vaga desse concurso é de:`,
      r: `${cv} candidatos por vaga`,
      d: [`${num(vagas / cand, 3)} candidato por vaga`, `${cv * 10} candidatos por vaga`, `${num(cand / 100)} candidatos por vaga`, `${cv + 5} candidatos por vaga`, `${vagas} candidatos por vaga`],
      x: expl('razão', 'Relação candidato/vaga = número de candidatos ÷ número de vagas.', `${num(cand)} ÷ ${vagas} = ${cv}.`),
    };
  },
  // 10. câmbio
  (r) => {
    const tx = r.pick([4.8, 5, 5.2, 5.4, 5.5]);
    const usd = r.pick([150, 200, 250, 300, 400]);
    const brl = arred(usd * tx, 2);
    return {
      e: `Para uma viagem, ${nome(r)} trocou ${reais(brl)} por dólares, com o dólar cotado a ${reais(tx)}. Quantos dólares recebeu (sem contar taxas)?`,
      r: `US$ ${num(usd)}`,
      d: [`US$ ${num(arred(brl * tx, 2))}`, `US$ ${num(arred(usd * 1.1, 2))}`, `US$ ${num(arred(brl / 10, 2))}`, `US$ ${num(usd - 20)}`, `US$ ${num(arred(usd / tx, 2))}`],
      x: expl('regra de três direta', `Cada dólar custa ${reais(tx)}. Quantas vezes ${reais(tx)} cabe em ${reais(brl)}? Divida.`, `${num(brl)} ÷ ${num(tx)} = ${num(usd)} dólares.`),
    };
  },
  // 11. velocidade e tempo (inversa)
  (r) => {
    const v1 = r.pick([60, 80, 90]), t1 = r.pick([2, 3, 4]);
    const v2 = r.pick([100, 120]);
    const t2 = (v1 * t1) / v2;
    return {
      e: `Viajando a ${v1} km/h, um motorista faz certo trajeto em ${t1} horas. Se fosse a ${v2} km/h, quanto tempo levaria no mesmo trajeto?`,
      r: t2,
      d: [(v2 * t1) / v1, t1 - (v2 - v1) / 60, t1 / 2, t2 + 0.5],
      f: horas,
      x: expl('regra de três inversa', 'Mais velocidade, menos tempo: o produto velocidade × tempo é a distância, que não muda.', `${v1} × ${t1} = ${v1 * t1} km; ${v1 * t1} ÷ ${v2} = ${num(t2)} h = ${horas(t2)}.`),
    };
  },
  // 12. receita para mais pessoas
  (r) => {
    const g = r.pick([400, 500, 600]), p = r.pick([4, 5, 6]), n = r.pick([10, 12, 15, 18]);
    const x = (g * n) / p;
    if (!Number.isInteger(x)) return facil[11](r);
    return {
      e: `Uma receita indica ${g} g de macarrão para servir ${p} pessoas. Quantos gramas são necessários para servir ${n} pessoas no almoço de domingo?`,
      r: x,
      d: [(g * p) / n, g + (n - p) * 10, g * n, x / 2],
      f: (v) => `${num(v)} g`,
      x: expl('taxa unitária', 'Descubra quanto vai por pessoa e multiplique pelo novo número de pessoas.', `${g} ÷ ${p} = ${num(g / p)} g por pessoa; × ${n} = ${num(x)} g.`),
    };
  },
  // 13. tabela proporcional
  (r) => {
    const k = r.pick([3, 4, 6, 7.5, 12]);
    const xs = r.sample([2, 3, 4, 5, 8, 10], 3);
    const alvo = r.pick([7, 9, 11, 15]);
    return {
      e: `Em uma loja, o preço de fios elétricos é proporcional ao comprimento: ${xs.map((x) => `${x} m custam ${reais(x * k)}`).join('; ')}. Quanto custam ${alvo} m desse fio?`,
      r: alvo * k,
      d: [alvo * k + k, (alvo * k) / 2, alvo + k, xs[0] * k * alvo],
      f: reais,
      x: expl('constante de proporcionalidade', 'Em grandezas diretamente proporcionais, o preço ÷ comprimento é sempre o mesmo número.', `${reais(xs[0] * k)} ÷ ${xs[0]} = ${reais(k)} por metro; ${alvo} × ${reais(k)} = ${reais(alvo * k)}.`),
    };
  },
  // 14. ração que dura menos
  (r) => {
    const caes = r.pick([8, 10, 12]), dias = r.pick([15, 18, 20, 24]), extra = r.pick([2, 3, 4, 6]);
    const nd = (caes * dias) / (caes + extra);
    if (!Number.isInteger(nd)) return facil[13](r);
    return {
      e: `Um abrigo tem ração suficiente para alimentar ${caes} cães durante ${dias} dias. Se chegarem mais ${extra} cães, e cada cão continuar comendo a mesma quantidade, a ração vai durar quantos dias?`,
      r: nd,
      d: [dias - extra, (dias * (caes + extra)) / caes, dias + extra, nd - 2],
      x: expl('regra de três inversa', 'A quantidade total de ração é fixa: cães × dias não muda. Mais cães, menos dias.', `${caes} × ${dias} = ${caes * dias} "refeições"; ÷ ${caes + extra} cães = ${nd} dias.`),
    };
  },
];
facil[1].vezes = 2;
facil[2].vezes = 2;
facil[13].vezes = 2;

const medio = [
  // 1. regra de três composta (máquinas)
  (r) => {
    const m = r.pick([4, 5, 6, 8]), h = r.pick([6, 8]), d = r.pick([5, 6, 10, 12]), pc = r.pick([600, 1200, 1800]);
    const m2 = r.pick([3, 4, 10, 12]), h2 = r.pick([4, 6, 10]), p2 = r.pick([900, 2400, 3600]);
    const x = d * (m / m2) * (h / h2) * (p2 / pc);
    if (!Number.isInteger(x) || x < 1) return medio[0](r);
    return {
      e: `${m} máquinas, trabalhando ${h} horas por dia, produzem ${num(pc)} peças em ${d} dias. Quantos dias serão necessários para ${m2} máquinas iguais, trabalhando ${h2} horas por dia, produzirem ${num(p2)} peças?`,
      r: x,
      d: [Math.round(d * (m2 / m) * (h2 / h) * (p2 / pc)) || x + 2, Math.round(d * (p2 / pc)), Math.round(d * (m / m2) * (p2 / pc)), x + 1],
      x: expl('regra de três composta', 'Compare cada grandeza com "dias", uma de cada vez: mais máquinas ou mais horas → menos dias (inversa); mais peças → mais dias (direta).', `x = ${d} × (${m}/${m2}) × (${h}/${h2}) × (${num(p2)}/${num(pc)}) = ${x}.`),
    };
  },
  // 2. inversamente proporcional (prêmio)
  (r) => {
    const [a, b] = r.pick([[2, 3], [3, 6], [2, 6], [4, 6], [3, 4]]);
    const ia = 1 / a, ib = 1 / b, total = r.int(3, 20) * 100 * (a + b);
    const pa = (total * ia) / (ia + ib);
    if (!Number.isInteger(pa)) return medio[1](r);
    return {
      e: `Um prêmio de ${reais(total)} será dividido entre dois funcionários em partes inversamente proporcionais ao número de faltas de cada um: ${a} e ${b} faltas. Quanto receberá quem faltou menos?`,
      r: pa,
      d: [total - pa, (total * a) / (a + b), total / 2, pa + 100],
      f: reais,
      x: expl('divisão inversamente proporcional', `Inversamente proporcional a ${a} e ${b} é o mesmo que diretamente proporcional a 1/${a} e 1/${b}, isto é, a ${b} e ${a}.`, `Quem faltou ${a} vezes recebe ${b}/${a + b} de ${reais(total)} = ${reais(pa)}.`),
    };
  },
  // 3. suco concentrado
  (r) => {
    const a = r.int(1, 3), b = r.int(a + 1, 6), v = (a + b) * r.int(1, 4) * 0.5;
    return {
      e: `Um suco é preparado misturando concentrado e água na proporção de ${a} para ${b}. Para preparar ${num(v)} litros de suco, quantos litros de concentrado são necessários?`,
      r: (v * a) / (a + b),
      d: [(v * b) / (a + b), v / a, (v * a) / b, v / (a + b) === (v * a) / (a + b) ? v / b : v / (a + b), (v * (a + 1)) / (a + b), v - a],
      f: (x) => `${num(x)} L`,
      x: expl('parte de um todo', `"${a} para ${b}" compara concentrado com água; o suco é a soma: ${a + b} partes.`, `${num(v)} × ${a}/${a + b} = ${num((v * a) / (a + b))} L.`),
    };
  },
  // 4. razão e diferença
  (r) => {
    const [x, y] = r.pick([[3, 4], [2, 5], [5, 7], [4, 9], [3, 8]]);
    const k = r.int(2, 9);
    const diff = (y - x) * k;
    return {
      e: `As idades de dois primos estão na razão ${x} : ${y}, e a diferença entre elas é de ${diff} anos. Qual é a idade do primo mais velho?`,
      r: y * k,
      d: [x * k, (x + y) * k, diff * y, y + diff],
      x: expl('constante k', `Escreva as idades como ${x}k e ${y}k. A diferença é ${y - x}k.`, `${y - x}k = ${diff} ⇒ k = ${k}. Mais velho: ${y} × ${k} = ${y * k} anos.`),
    };
  },
  // 5. receitas completas (ingrediente limitante)
  (r) => {
    const [ovo, far, leite] = [r.pick([2, 3]), r.pick([2, 3]), r.pick([1, 2])];
    const temO = r.int(9, 20), temF = r.int(8, 18), temL = r.int(5, 12);
    const q = Math.min(Math.floor(temO / ovo), Math.floor(temF / far), Math.floor(temL / leite));
    const lim = q === Math.floor(temO / ovo) ? 'ovos' : q === Math.floor(temF / far) ? 'farinha' : 'leite';
    return {
      e: `Uma receita de panqueca leva ${ovo} ovos, ${far} xícaras de farinha e ${leite} ${leite > 1 ? 'copos' : 'copo'} de leite. Na cozinha há ${temO} ovos, ${temF} xícaras de farinha e ${temL} copos de leite. Quantas receitas completas dá para fazer?`,
      r: q,
      d: [Math.floor(temO / ovo), Math.floor(temF / far), Math.floor(temL / leite), q + 1, Math.max(Math.floor(temO / ovo), Math.floor(temF / far), Math.floor(temL / leite))],
      x: expl('ingrediente que acaba primeiro', 'Calcule quantas receitas cada ingrediente permite; vale o menor número.', `Ovos: ${Math.floor(temO / ovo)}; farinha: ${Math.floor(temF / far)}; leite: ${Math.floor(temL / leite)}. O ${lim} limita: ${q} receitas.`),
    };
  },
  // 6. divisão proporcional a três números
  (r) => {
    const pesos = r.pick([[2, 3, 5], [1, 3, 4], [3, 4, 5], [2, 5, 7]]);
    const s = pesos.reduce((a, b) => a + b, 0);
    const total = s * r.int(4, 30) * 50;
    const [a, b, c] = nomes(r, 3);
    return {
      e: `${a}, ${b} e ${c} trabalharam ${pesos[0]}, ${pesos[1]} e ${pesos[2]} dias, respectivamente, em um serviço que rendeu ${reais(total)}. O valor será dividido proporcionalmente aos dias trabalhados. Quanto recebe ${c}?`,
      r: (total * pesos[2]) / s,
      d: [total / 3, (total * pesos[0]) / s, (total * pesos[1]) / s, total / 2, (total * pesos[2]) / s + total / s],
      f: reais,
      x: expl('divisão proporcional', `Some os pesos (${pesos.join(' + ')} = ${s}) para saber em quantas partes o total é dividido.`, `Cada dia vale ${reais(total)} ÷ ${s} = ${reais(total / s)}. ${c}: ${pesos[2]} × ${reais(total / s)} = ${reais((total * pesos[2]) / s)}.`),
    };
  },
  // 7. planta baixa → área real
  (r) => {
    const esc = r.pick([100, 200]);
    const a = r.pick([3, 4, 5]), b = r.pick([2, 2.5, 3, 3.5]);
    const real = ((a * esc) / 100) * ((b * esc) / 100);
    return {
      e: `Na planta de uma casa, desenhada na escala 1 : ${esc}, a sala é um retângulo de ${num(a)} cm por ${num(b)} cm. Qual é a área real da sala?`,
      r: real,
      d: [(a * b * esc) / 100, (a * b * esc) / 10000, real * 2, real / 2, (a + b) * 2 * (esc / 100)],
      f: (v) => `${num(v)} m²`,
      x: expl('escala em medidas lineares', 'A escala vale para comprimentos. Converta cada lado para o tamanho real e só depois calcule a área.', `${num(a)} cm → ${num((a * esc) / 100)} m; ${num(b)} cm → ${num((b * esc) / 100)} m; área = ${num(real)} m².`),
    };
  },
  // 8. ampliação e área
  (r) => {
    const k = r.pick([2, 3, 4]);
    const tinta = r.pick([0.5, 1, 1.5, 2]);
    return {
      e: `Um painel retangular foi pintado com ${num(tinta)} litro${tinta > 1 ? 's' : ''} de tinta. Será feito outro painel com o mesmo formato, mas com comprimento e largura ${k} vezes maiores. Quantos litros de tinta serão necessários (mesma espessura de pintura)?`,
      r: tinta * k * k,
      d: [tinta * k, tinta * k * 2, tinta * k ** 3, tinta + k],
      f: (v) => `${num(v)} L`,
      x: expl('razão de semelhança', `Se as medidas lineares são multiplicadas por ${k}, a área (e a tinta) é multiplicada por ${k}² = ${k * k}.`, `${num(tinta)} × ${k * k} = ${num(tinta * k * k)} L.`),
    };
  },
  // 9. câmbio indireto
  (r) => {
    const usd = r.pick([5, 5.2, 5.5]), eur = r.pick([6, 6.05, 6.6]);
    const valor = r.pick([110, 220, 330, 440]);
    const res = arred((valor * eur) / usd, 2);
    return {
      e: `Em uma casa de câmbio, 1 dólar custa ${reais(usd)} e 1 euro custa ${reais(eur)}. Um turista quer trocar ${valor} euros por dólares, passando pelo real. Quantos dólares recebe (sem taxas)?`,
      r: `US$ ${num(res)}`,
      d: [`US$ ${num(arred((valor * usd) / eur, 2))}`, `US$ ${num(valor)}`, `US$ ${num(arred(valor * eur, 2))}`, `US$ ${num(arred(valor * (eur - usd), 2))}`, `US$ ${num(arred(res + 10, 2))}`],
      x: expl('mudança de unidade em duas etapas', 'Converta euros em reais (multiplica) e depois reais em dólares (divide).', `${valor} × ${reais(eur)} = ${reais(valor * eur)}; ÷ ${num(usd)} = ${num(res)} dólares.`),
    };
  },
  // 10. tempo para completar
  (r) => {
    const [n, d] = r.pick([[1, 3], [1, 4], [2, 5], [1, 5]]);
    const t = r.pick([1, 2, 3]);
    const resto = (t * (d - n)) / n;
    return {
      e: `Uma bomba d'água encheu ${n}/${d} de uma piscina em ${t} hora${t > 1 ? 's' : ''}. Mantendo a mesma vazão, quanto tempo falta para encher o restante?`,
      r: resto,
      d: [(t * d) / n, t * (d - n), resto / 2, resto + t],
      f: horas,
      x: expl('regra de três direta', `${n}/${d} levou ${t} h; o restante é ${d - n}/${d}.`, `${n}/${d} → ${t} h; ${d - n}/${d} → ${t} × ${d - n} ÷ ${n} = ${num(resto)} h = ${horas(resto)}.`),
    };
  },
  // 11. estoque que dura mais
  (r) => {
    const dias = r.pick([20, 24, 30]), kg = r.pick([30, 36, 40, 45]), novo = r.pick([24, 25, 27, 30, 32]);
    const nd = (dias * kg) / novo;
    if (!Number.isInteger(nd) || novo >= kg) return medio[10](r);
    return {
      e: `O estoque de arroz de um restaurante dura ${dias} dias, consumindo ${kg} kg por dia. Se o consumo cair para ${novo} kg por dia, o estoque durará quantos dias?`,
      r: nd,
      d: [(dias * novo) / kg, dias + (kg - novo), dias * 2 - nd, nd + 2],
      x: expl('regra de três inversa', 'O estoque total (dias × consumo diário) é fixo.', `${dias} × ${kg} = ${dias * kg} kg; ÷ ${novo} = ${nd} dias.`),
    };
  },
  // 12. engrenagens
  (r) => {
    const da = r.pick([20, 24, 30, 36]), db = r.pick([40, 45, 48, 60]), rpm = r.pick([90, 120, 150, 180]);
    const rb = (da * rpm) / db;
    if (!Number.isInteger(rb)) return medio[11](r);
    return {
      e: `Em uma bicicleta, a coroa (engrenagem dos pedais) tem ${db} dentes e a catraca (da roda) tem ${da} dentes. Se a catraca deve girar ${(db * rpm) / da} voltas por minuto, quantas voltas por minuto o ciclista precisa dar nos pedais?`,
      r: rpm,
      d: [(db * (db * rpm) / da) / da, (db * rpm) / da, rpm * 2, rpm + db - da],
      x: expl('engrenagens (inversa)', 'Engrenagens ligadas por corrente "passam" o mesmo número de dentes por minuto: dentes × voltas é igual nas duas.', `${db} × x = ${da} × ${(db * rpm) / da} ⇒ x = ${rpm} voltas por minuto.`),
    };
  },
  // 13. traço da argamassa
  (r) => {
    const [c, a] = r.pick([[1, 3], [1, 4], [1, 5], [2, 5]]);
    const vol = r.pick([2, 3, 4.5, 6]);
    return {
      e: `Uma argamassa usa cimento e areia no traço ${c} : ${a} (em volume). Para preparar ${num(vol)} m³ de mistura, quantos metros cúbicos de areia são necessários?`,
      r: (vol * a) / (c + a),
      d: [(vol * c) / (c + a), vol * a, vol / a, (vol * a) / c],
      f: (v) => `${num(v)} m³`,
      x: expl('divisão em partes', `O traço ${c} : ${a} divide a mistura em ${c + a} partes, das quais ${a} são de areia.`, `${num(vol)} × ${a}/${c + a} = ${num((vol * a) / (c + a))} m³.`),
    };
  },
  // 14. nova razão após entrada de pessoas
  (r) => {
    const [h, m] = r.pick([[4, 5], [2, 3], [3, 4], [5, 7]]);
    const k = r.int(3, 8);
    const entram = (m - h) * k;
    return {
      e: `Em uma festa, a razão entre homens e mulheres era ${h} : ${m}. Depois que chegaram ${entram} homens (e nenhuma mulher), a razão passou a ser 1 : 1. Quantas pessoas havia na festa antes da chegada desses homens?`,
      r: (h + m) * k,
      d: [(h + m) * k + entram, m * k, h * k, 2 * m * k],
      x: expl('constante k', `Antes: ${h}k homens e ${m}k mulheres. Com ${entram} homens a mais, os grupos ficam iguais.`, `${h}k + ${entram} = ${m}k ⇒ k = ${k}. Antes: ${h * k} + ${m * k} = ${(h + m) * k} pessoas.`),
    };
  },
];
medio[0].vezes = 2;
medio[5].vezes = 2;
medio[13].vezes = 2;

const dificil = [
  // 1. duas torneiras
  (r) => {
    const [a, b] = r.pick([[2, 3], [3, 6], [4, 12], [6, 12], [5, 20], [10, 15], [4, 6]]);
    const t = (a * b) / (a + b);
    return {
      e: `Uma torneira sozinha enche um tanque em ${a} horas, e outra, sozinha, o enche em ${b} horas. Abertas juntas, em quanto tempo enchem o tanque?`,
      r: t,
      d: [(a + b) / 2, a + b, b - a, t + 0.5],
      f: horas,
      x: expl('soma de ritmos', 'Não se somam tempos, e sim o que cada torneira faz por hora (fração do tanque).', `1/${a} + 1/${b} = ${fracao(a + b, a * b)} do tanque por hora. Tempo: ${fracao(a * b, a + b)} h = ${horas(t)}.`),
    };
  },
  // 2. sócios (capital × tempo)
  (r) => {
    const c1 = r.pick([10, 20, 30]) * 1000, t1 = r.pick([6, 8, 12]);
    const c2 = r.pick([15, 20, 40]) * 1000, t2 = r.pick([3, 4, 6, 9]);
    const p1 = c1 * t1, p2 = c2 * t2;
    const lucro = ((p1 + p2) / 1000) * r.pick([10, 20, 25]);
    const parte1 = (lucro * p1) / (p1 + p2);
    if (!Number.isInteger(parte1 * 100)) return dificil[1](r);
    return {
      e: `Dois sócios abriram uma empresa. O primeiro investiu ${reais(c1)} durante ${t1} meses, e o segundo, ${reais(c2)} durante ${t2} meses. O lucro de ${reais(lucro)} será dividido proporcionalmente ao capital multiplicado pelo tempo. Quanto receberá o primeiro sócio?`,
      r: parte1,
      d: [lucro - parte1, (lucro * c1) / (c1 + c2), (lucro * t1) / (t1 + t2), lucro / 2],
      f: reais,
      x: expl('divisão proporcional a produtos', 'O peso de cada sócio é capital × tempo.', `Pesos: ${num(p1)} e ${num(p2)}. Primeiro: ${reais(lucro)} × ${num(p1)}/${num(p1 + p2)} = ${reais(parte1)}.`),
    };
  },
  // 3. operários com eficiência
  (r) => {
    const op = r.pick([10, 12, 15, 20]), dias = r.pick([12, 15, 18, 20]), h = r.pick([6, 8]);
    const op2 = r.pick([8, 16, 24, 30]), h2 = r.pick([5, 6, 10]);
    const ef = r.pick([[1, 2], [2, 1], [2, 3], [3, 2]]);
    const x = (dias * op * h * ef[0]) / (op2 * h2 * ef[1]);
    if (!Number.isInteger(x) || op === op2) return dificil[2](r);
    const txtEf = ef[0] < ef[1] ? `${ef[1] / ef[0] === 2 ? 'duas vezes' : `${num(ef[1] / ef[0])} vezes`} mais eficientes que os primeiros` : `com eficiência igual a ${fracao(ef[1], ef[0])} da dos primeiros`;
    return {
      e: `${op} operários, trabalhando ${h} horas por dia, fazem uma obra em ${dias} dias. Em quantos dias ${op2} operários, ${txtEf}, trabalhando ${h2} horas por dia, fariam a mesma obra?`,
      r: x,
      d: [Math.round((dias * op2 * h2) / (op * h)) || x + 4, Math.round((dias * op * h) / (op2 * h2)) === x ? x + 3 : Math.round((dias * op * h) / (op2 * h2)), x * 2, x + 1],
      x: expl('regra de três composta', 'Dias são inversamente proporcionais a operários, horas por dia e eficiência.', `x = ${dias} × (${op}/${op2}) × (${h}/${h2}) × (${ef[0]}/${ef[1]}) = ${x}.`),
    };
  },
  // 4. direta e inversa ao mesmo tempo
  (r) => {
    const total = r.pick([1300, 2600, 3900, 5200]);
    const pares = r.pick([[[10, 2], [12, 3], [15, 5]], [[8, 1], [12, 2], [18, 3]], [[6, 1], [9, 3], [12, 2]]]);
    const pesos = pares.map(([i, f]) => i / f);
    const soma = pesos.reduce((s, v) => s + v, 0);
    const partes = pesos.map((w) => (total * w) / soma);
    if (!partes.every((v) => Number.isInteger(v * 100))) return dificil[3](r);
    const maior = Math.max(...partes);
    return {
      e: `Um avô vai dividir ${reais(total)} entre três netos, em partes diretamente proporcionais às idades (${pares.map((p) => p[0]).join(', ')} anos) e inversamente proporcionais ao número de faltas na escola (${pares.map((p) => p[1]).join(', ')}, respectivamente). Quanto receberá o neto que ganhar mais?`,
      r: maior,
      d: [Math.min(...partes), partes.find((v) => v !== maior && v !== Math.min(...partes)) ?? total / 3, total / 3, (total * Math.max(...pares.map((p) => p[0]))) / pares.reduce((s, p) => s + p[0], 0)],
      f: reais,
      x: expl('pesos combinados', 'Direta: a idade multiplica o peso. Inversa: as faltas dividem o peso.', `Pesos (idade ÷ faltas): ${pesos.map((w) => num(w)).join(', ')}; soma ${num(soma)}. Maior parte: ${reais(total)} × ${num(Math.max(...pesos))}/${num(soma)} = ${reais(maior)}.`),
    };
  },
  // 5. enche e esvazia
  (r) => {
    const [a, b] = r.pick([[3, 6], [4, 12], [2, 6], [6, 10], [4, 6]]);
    const t = (a * b) / (b - a);
    return {
      e: `Uma torneira enche um tanque em ${a} horas, e um ralo, sozinho, esvazia o tanque cheio em ${b} horas. Se o tanque está vazio e a torneira e o ralo são abertos ao mesmo tempo, em quanto tempo ele fica cheio?`,
      r: t,
      d: [(a * b) / (a + b), b - a, a + b, t / 2],
      f: horas,
      x: expl('ritmos com sinais', 'A torneira soma e o ralo subtrai: o ritmo líquido é a diferença entre as frações por hora.', `1/${a} − 1/${b} = ${fracao(b - a, a * b)} do tanque por hora → ${fracao(a * b, b - a)} h = ${horas(t)}.`),
    };
  },
  // 6. trabalho conjunto → individual
  (r) => {
    const [a, j] = r.pick([[6, 4], [10, 6], [12, 4], [15, 10], [20, 12]]);
    const b = (a * j) / (a - j);
    const [p, q] = nomes(r, 2);
    return {
      e: `Trabalhando sem ajuda, ${p} pinta uma casa em ${a} dias. Com a ajuda de ${q}, os dois pintam a mesma casa em ${j} dias. Em quantos dias ${q}, sem ajuda, pintaria a casa?`,
      r: b,
      d: [a - j, a + j, (a * j) / (a + j), b + 2],
      x: expl('soma de ritmos', 'Por dia: (ritmo de um) + (ritmo do outro) = ritmo da dupla.', `1/${a} + 1/x = 1/${j} ⇒ 1/x = 1/${j} − 1/${a} = ${fracao(a - j, a * j)} ⇒ x = ${num(b)} dias.`),
    };
  },
  // 7. velocidade média ida e volta
  (r) => {
    const [v1, v2] = r.pick([[60, 90], [40, 60], [80, 120], [30, 60], [60, 100]]);
    const vm = (2 * v1 * v2) / (v1 + v2);
    return {
      e: `Um motorista vai de uma cidade a outra a ${v1} km/h e volta pelo mesmo caminho a ${v2} km/h. Qual foi a velocidade média na viagem completa (ida e volta)?`,
      r: vm,
      d: [(v1 + v2) / 2, Math.sqrt(v1 * v2) % 1 ? (v1 + v2) / 2 + 5 : Math.sqrt(v1 * v2), v2 - v1, vm + 4],
      f: (v) => `${num(v)} km/h`,
      x: expl('velocidade média = distância total ÷ tempo total', 'A média simples erra: o carro passa MAIS tempo no trecho lento. Suponha uma distância (por exemplo, o MMC das velocidades) e calcule os tempos.', `Para d km em cada sentido: tempo = d/${v1} + d/${v2}. Vm = 2d ÷ (d/${v1} + d/${v2}) = 2 × ${v1} × ${v2} ÷ ${v1 + v2} = ${num(vm)} km/h.`),
    };
  },
  // 8. relógio que atrasa
  (r) => {
    const atraso = r.pick([2, 3, 4, 5]);
    const h = r.pick([6, 8, 10]);
    const tot = atraso * h;
    const hm = (min) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`;
    const marca = (12 + h) * 60 - tot;
    return {
      e: `Um relógio atrasa ${atraso} minutos a cada hora. Ele foi acertado ao meio-dia. Quando forem, de verdade, ${12 + h}h do mesmo dia, que horário ele vai marcar?`,
      r: hm(marca),
      d: [hm((12 + h) * 60 + tot), hm((12 + h) * 60 - atraso), hm((12 + h) * 60 - tot * 2), hm((12 + h) * 60 - tot / 2), hm((12 + h) * 60)],
      x: expl('regra de três direta', `O atraso é proporcional ao tempo passado: ${atraso} min por hora.`, `${h} horas × ${atraso} min = ${tot} min de atraso. ${12 + h}h00 − ${tot} min = ${hm(marca)}.`),
    };
  },
  // 9. razão de idades no futuro
  (r) => {
    const [p, f, p2, f2, anos] = r.pick([[7, 2, 9, 4, 10], [5, 1, 3, 1, 12], [4, 1, 5, 2, 10], [3, 1, 2, 1, 15]]);
    // p·k + anos : f·k + anos = p2 : f2 → f2(p k + anos) = p2(f k + anos)
    const k = (anos * (p2 - f2)) / (f2 * p - p2 * f);
    return {
      e: `Hoje, a razão entre a idade de um pai e a do filho é ${p} : ${f}. Daqui a ${anos} anos, essa razão será ${p2} : ${f2}. Qual é a idade atual do filho?`,
      r: f * k,
      d: [p * k, f * k + anos, f2 * k, f * k * 2],
      x: expl('constante k e equação', `Hoje: pai = ${p}k, filho = ${f}k. Daqui a ${anos} anos: (${p}k + ${anos}) / (${f}k + ${anos}) = ${p2}/${f2}.`, `${f2}(${p}k + ${anos}) = ${p2}(${f}k + ${anos}) ⇒ k = ${k}. Filho: ${f * k} anos.`),
    };
  },
  // 10. composta com 4 grandezas
  (r) => {
    const v = r.pick([4, 5, 6]), d = r.pick([10, 12, 15]), kg = r.pick([60, 90, 120]);
    const v2 = r.pick([8, 10, 12]), kg2 = r.pick([120, 180, 240]);
    const d2 = (d * (v / v2) * (kg2 / kg));
    if (!Number.isInteger(d2)) return dificil[9](r);
    return {
      e: `Em uma fazenda, ${v} cavalos consomem ${kg} kg de feno em ${d} dias. Em quantos dias ${v2} cavalos consumirão ${kg2} kg de feno, comendo cada um a mesma quantidade por dia?`,
      r: d2,
      d: [Math.round(d * (v2 / v) * (kg2 / kg)), Math.round(d * (kg2 / kg)), Math.round(d * (v / v2)), d2 + 3],
      x: expl('regra de três composta', 'Mais feno → mais dias (direta); mais cavalos → menos dias (inversa).', `x = ${d} × (${kg2}/${kg}) × (${v}/${v2}) = ${d2} dias.`),
    };
  },
  // 11. mistura de cafés
  (r) => {
    const [p1, p2, pm] = r.pick([[30, 50, 36], [24, 40, 30], [20, 35, 26], [40, 60, 45]]);
    const tot = r.pick([40, 80, 100]);
    const x = (tot * (p2 - pm)) / (p2 - p1);
    if (!Number.isInteger(x)) return dificil[10](r);
    return {
      e: `Uma cafeteria mistura um café de ${reais(p1)} o quilo com outro de ${reais(p2)} o quilo para obter ${tot} kg de um blend que custe ${reais(pm)} o quilo. Quantos quilos do café mais barato deve usar?`,
      r: x,
      d: [tot - x, tot / 2, (tot * (pm - p1)) / (p2 - p1) + 2, x + 5],
      f: (v) => `${num(v)} kg`,
      x: expl('média ponderada', `O preço médio fica mais perto do café que entra em maior quantidade. Monte: ${p1}x + ${p2}(${tot} − x) = ${pm} × ${tot}.`, `${p2 * tot} − ${p2 - p1}x = ${pm * tot} ⇒ x = ${num(x)} kg.`),
    };
  },
  // 12. escala de área (hectares)
  (r) => {
    const esc = r.pick([10000, 20000, 25000, 50000]);
    const cm2 = r.pick([4, 6, 8, 12]);
    const m2 = cm2 * (esc / 100) ** 2;
    const ha = m2 / 10000;
    return {
      e: `Em um mapa na escala 1 : ${num(esc)}, uma fazenda aparece como uma figura de ${cm2} cm². Qual é a área real da fazenda, em hectares (1 ha = 10 000 m²)?`,
      r: ha,
      d: [(cm2 * esc) / 10000, ha / 100, ha * 10, (cm2 * esc) / 100],
      f: (v) => `${num(v)} ha`,
      x: expl('escala ao quadrado', `Em áreas, a escala entra ao quadrado: 1 cm no mapa = ${num(esc / 100)} m, então 1 cm² = ${num((esc / 100) ** 2)} m².`, `${cm2} × ${num((esc / 100) ** 2)} = ${num(m2)} m² = ${num(ha)} ha.`),
    };
  },
  // 13. inversamente proporcional a três números
  (r) => {
    const [a, b, c] = r.pick([[2, 3, 6], [3, 4, 6], [2, 4, 8], [4, 6, 12]]);
    const L = mmc(mmc(a, b), c);
    const den = L / a + L / b + L / c;
    const total = den * r.pick([50, 100, 150, 200]);
    const pa = (total * (L / a)) / den;
    return {
      e: `Três técnicos vão dividir ${reais(total)} de bônus em partes inversamente proporcionais ao número de erros que cometeram no ano: ${a}, ${b} e ${c} erros. Quanto recebe quem errou menos?`,
      r: pa,
      d: [(total * (L / b)) / den, total / 3, (total * (L / c)) / den, pa / 2, (total * c) / (a + b + c)],
      f: reais,
      x: expl('divisão inversamente proporcional', `Use os inversos 1/${a}, 1/${b}, 1/${c}; multiplicando todos por ${L} (o MMC), eles ficam proporcionais a ${L / a}, ${L / b} e ${L / c}.`, `Soma dos pesos: ${den}. Quem errou ${a} vezes: ${reais(total)} × ${L / a}/${den} = ${reais(pa)}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[5].vezes = 2;
dificil[6].vezes = 2;

export default [
  {
    disciplina: 'matematica',
    arquivo: '03-razao-proporcao-regra-de-tres',
    titulo: 'Razão, proporção e regra de três',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Regra de três simples e composta, divisão proporcional, escalas, misturas e problemas de vazão.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
