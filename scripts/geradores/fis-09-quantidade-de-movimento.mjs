// Física — Quantidade de movimento, impulso e colisões. g = 10 m/s².
import { expl, nome, num } from './util.mjs';

const N = (v, c = null) => num(v, c);
const r2 = (v) => Math.round(v * 100) / 100;
const u = (un) => (v) => `${N(r2(v))} ${un}`;
const Q = u('kg·m/s');

const facil = [
  // 1. Q = m·v
  (r) => {
    const [obj, m, v] = r.pick([['uma bola de futebol', 0.4, 25], ['uma bola de tênis', 0.06, 50], ['um ciclista com a bicicleta', 80, 5], ['um carro', 1200, 15], ['uma bola de boliche', 6, 4]]);
    return {
      e: `Qual é a quantidade de movimento de ${obj} de ${N(m)} kg a ${v} m/s?`,
      r: m * v,
      d: [(m * v * v) / 2, m / v, m + v, m * v * v],
      f: Q,
      x: expl('Q = m·v', 'A quantidade de movimento é massa vezes velocidade (sem o quadrado, que é da energia cinética).', `${N(m)} · ${v} = ${N(r2(m * v))} kg·m/s.`),
    };
  },
  // 2. impulso de força constante
  (r) => {
    const [ctx, F, t] = r.pick([['Uma raquete empurra a bola', 200, 0.05], ['Um taco empurra a bola de sinuca', 50, 0.02], ['Uma pessoa empurra um carrinho', 30, 4], ['Um motor puxa um bloco', 120, 2.5]]);
    return {
      e: `${ctx} com uma força constante de ${F} N durante ${N(t)} s. Qual é o impulso aplicado?`,
      r: F * t,
      d: [F / t, F + t, (F * t) / 2, F * t * t],
      f: u('N·s'),
      x: expl('I = F·Δt', 'Impulso é força vezes o tempo em que ela age.', `${F} · ${N(t)} = ${N(r2(F * t))} N·s.`),
    };
  },
  // 3. unidade
  (r) => {
    const imp = r.pick([true, false]);
    return {
    e: imp ? 'A unidade de impulso, N·s, é equivalente a qual destas?' : 'A quantidade de movimento se mede em kg·m/s. Qual destas unidades é equivalente?',
    r: imp ? 'kg·m/s' : 'N·s',
    d: ['J (joule)', 'W (watt)', 'kg·m/s²', 'N·m'],
    x: expl('1 N = 1 kg·m/s²', 'Multiplicando por segundo: N·s = kg·m/s² · s = kg·m/s. Faz sentido: o impulso é a variação da quantidade de movimento.', ''),
    };
  },
  // 4. Q é vetor
  (r) => {
    const m = r.pick([800, 1000, 1200]), v = r.pick([15, 20, 25]);
    return {
      e: `Dois carros iguais, de ${N(m)} kg cada, andam um em direção ao outro, ambos a ${v} m/s. Qual é a quantidade de movimento total do sistema?`,
      r: 0,
      d: [2 * m * v, m * v, m * v * v, 2 * m],
      f: Q,
      x: expl('Q é vetor', 'Velocidades em sentidos opostos dão quantidades de movimento de sinais opostos.', `${N(m * v)} + (−${N(m * v)}) = 0.`),
    };
  },
  // 5. comparar caminhão e carro
  (r) => {
    const [mc, vc, mk, vk] = r.pick([[12000, 5, 1000, 30], [8000, 10, 1000, 20], [15000, 4, 1200, 25], [10000, 6, 1500, 20]]);
    const raz = (mc * vc) / (mk * vk);
    return {
      e: `Um caminhão de ${N(mc)} kg anda a ${vc} m/s e um carro de ${N(mk)} kg anda a ${vk} m/s. Quantas vezes a quantidade de movimento do caminhão é a do carro?`,
      r: raz,
      d: [mc / mk, vk / vc, (mc * vc * vc) / (mk * vk * vk), raz / 2],
      f: (v) => N(r2(v)),
      x: expl('Q = m·v', `Caminhão: ${N(mc)} · ${vc} = ${N(mc * vc)}; carro: ${N(mk)} · ${vk} = ${N(mk * vk)}.`, `${N(mc * vc)} ÷ ${N(mk * vk)} = ${N(r2(raz))}.`),
    };
  },
  // 6. variação ao frear
  (r) => {
    const m = r.pick([900, 1000, 1200, 1500]), v = r.pick([10, 15, 20, 25]);
    return {
      e: `Um carro de ${N(m)} kg, a ${v} m/s, freia até parar. Qual é o módulo da variação da sua quantidade de movimento?`,
      r: m * v,
      d: [(m * v * v) / 2, 2 * m * v, m / v, m * v / 2],
      f: Q,
      x: expl('ΔQ = Q final − Q inicial', 'A quantidade final é zero (parado).', `|0 − ${N(m)} · ${v}| = ${N(m * v)} kg·m/s.`),
    };
  },
  // 7. airbag
  (r) => ({
    e: `${r.pick(['Por que o airbag reduz os ferimentos numa batida?', 'Por que é melhor dobrar os joelhos ao saltar de um muro?'])}`,
    r: 'aumenta o tempo da parada; com o mesmo impulso, a força média fica menor',
    d: ['diminui a variação da quantidade de movimento da pessoa', 'diminui a massa da pessoa durante o choque', 'diminui o tempo da parada, deixando o choque mais rápido', 'anula o impulso recebido pela pessoa'],
    x: expl('F·Δt = ΔQ', 'A variação da quantidade de movimento é a mesma (a pessoa vai parar de qualquer jeito). Se o tempo Δt aumenta, a força média F = ΔQ/Δt diminui.', ''),
  }),
  // 8. recuo de arma
  (r) => {
    const [M, m, v] = r.pick([[4, 0.01, 400], [5, 0.02, 500], [3, 0.015, 600], [2, 0.01, 300]]);
    return {
      e: `Uma espingarda de ${M} kg, inicialmente parada, dispara um projétil de ${N(m * 1000)} g a ${v} m/s. Com que velocidade a arma recua?`,
      r: (m * v) / M,
      d: [(M * v) / m / 1000, m * v, v / M, (m * v) / (M + m) / 2],
      f: u('m/s'),
      x: expl('conservação de Q (sistema parado no início)', `Antes do disparo, Q = 0. Depois, arma e projétil têm quantidades iguais e opostas. Use o projétil em kg: ${N(m)} kg.`, `${N(m)} · ${v} = ${M} · V ⇒ V = ${N(r2((m * v) / M))} m/s.`),
    };
  },
  // 9. patinadores se empurram
  (r) => {
    const [m1, m2, v2] = r.pick([[60, 40, 3], [80, 50, 4], [70, 35, 2], [90, 60, 3]]);
    return {
      e: `Dois patinadores, de ${m1} kg e ${m2} kg, estão parados no gelo e se empurram. O de ${m2} kg sai a ${v2} m/s. Com que velocidade sai o de ${m1} kg?`,
      r: (m2 * v2) / m1,
      d: [v2, (m1 * v2) / m2, v2 / 2, (m2 * v2) / (m1 + m2)],
      f: u('m/s'),
      x: expl('conservação de Q', 'Partindo do repouso, as quantidades de movimento finais são iguais e opostas.', `${m1} · v = ${m2} · ${v2} ⇒ v = ${N(r2((m2 * v2) / m1))} m/s.`),
    };
  },
  // 10. vagões que se engatam
  (r) => {
    const [m1, v1, m2] = r.pick([[2, 6, 1], [3, 8, 1], [4, 5, 1], [2, 9, 1], [3, 10, 2]]);
    const v = (m1 * v1) / (m1 + m2);
    return {
      e: `Um vagão de ${m1} t, a ${v1} m/s, bate em outro de ${m2} t, parado, e os dois seguem engatados. Qual é a velocidade do conjunto?`,
      r: v,
      d: [v1, (m1 * v1) / m2, v1 / 2, (m2 * v1) / (m1 + m2)],
      f: u('m/s'),
      x: expl('colisão em que os corpos grudam', 'Q antes = Q depois, com a massa total andando junta.', `${m1} · ${v1} = (${m1} + ${m2}) · v ⇒ v = ${N(r2(v))} m/s.`),
    };
  },
  // 11. força média pelo teorema do impulso
  (r) => {
    const [m, v, t] = r.pick([[0.5, 20, 0.02], [0.4, 30, 0.01], [0.16, 25, 0.004], [0.06, 40, 0.005]]);
    return {
      e: `Num chute, uma bola de ${N(m)} kg sai do repouso para ${v} m/s em um contato de ${N(t)} s. Qual é a força média do pé sobre a bola?`,
      r: (m * v) / t,
      d: [m * v, (m * v * v) / 2 / t, (m * v * t), v / t],
      f: u('N'),
      x: expl('F·Δt = ΔQ', `ΔQ = ${N(m)} · ${v} = ${N(m * v)} kg·m/s.`, `F = ${N(m * v)} ÷ ${N(t)} = ${N(r2((m * v) / t))} N.`),
    };
  },
  // 12. área do gráfico F × t (triângulo)
  (r) => {
    const F = r.pick([100, 200, 400, 600]), t = r.pick([0.02, 0.05, 0.1, 0.2]);
    return {
      e: `Num gráfico de força por tempo, a força de um impacto sobe de 0 a ${F} N e volta a 0, formando um triângulo com base de ${N(t)} s. Qual é o impulso?`,
      r: (F * t) / 2,
      d: [F * t, F / t, (F * t) / 4, F * t * 2],
      f: u('N·s'),
      x: expl('impulso = área do gráfico F × t', 'A área do triângulo é base vezes altura dividido por 2.', `${N(t)} · ${F} ÷ 2 = ${N(r2((F * t) / 2))} N·s.`),
    };
  },
  // 13. velocidade a partir do impulso
  (r) => {
    const m = r.pick([2, 4, 5, 8]), I = m * r.pick([2, 3, 5]);
    return {
      e: `Um bloco de ${m} kg, parado sobre uma superfície sem atrito, recebe um impulso de ${I} N·s. Com que velocidade ele sai?`,
      r: I / m,
      d: [I * m, I, m / I, I / (2 * m)],
      f: u('m/s'),
      x: expl('I = ΔQ = m·v', 'Partindo do repouso, o impulso vira inteiro quantidade de movimento.', `v = ${I} ÷ ${m} = ${N(I / m)} m/s.`),
    };
  },
  // 14. quando Q se conserva
  (r) => ({
    e: `${r.pick(['Em que condição a quantidade de movimento total de um sistema se conserva?', 'A quantidade de movimento total de um sistema permanece constante quando:'])}`,
    r: 'a resultante das forças externas sobre o sistema é nula',
    d: ['a energia cinética se conserva', 'não há forças internas entre os corpos', 'todos os corpos têm a mesma massa', 'a colisão é perfeitamente elástica'],
    x: expl('sistema isolado', 'Forças internas (como as do choque entre dois carros) aparecem aos pares e se cancelam. Só uma força externa resultante muda a Q total. Por isso Q se conserva em QUALQUER colisão, elástica ou não.', ''),
  }),
  // 15. elástica com massas iguais
  (r) => {
    const v = r.pick([2, 3, 4, 5]);
    return {
      e: `Na sinuca, a bola branca, a ${v} m/s, bate de frente na bola 8, parada e de mesma massa. Supondo choque perfeitamente elástico, o que acontece?`,
      r: `a branca para e a bola 8 sai a ${v} m/s`,
      d: [`as duas seguem juntas a ${N(v / 2)} m/s`, `a branca volta a ${v} m/s e a bola 8 fica parada`, `a branca segue a ${N(v / 2)} m/s e a bola 8 a ${N(v / 2)} m/s`, `a bola 8 sai a ${2 * v} m/s e a branca para`],
      x: expl('elástica com massas iguais: trocam as velocidades', 'Conservando Q e energia cinética ao mesmo tempo, a única saída com massas iguais é a troca de velocidades.', ''),
    };
  },
  // 16. coeficiente de restituição
  (r) => {
    const [ap, af] = r.pick([[10, 6], [8, 2], [5, 4], [12, 3], [20, 15]]);
    return {
      e: `Num choque frontal, dois corpos se aproximam com velocidade relativa de ${ap} m/s e se afastam, depois, com velocidade relativa de ${af} m/s. Qual é o coeficiente de restituição?`,
      r: af / ap,
      d: [ap / af, (ap - af) / ap, 1, 0],
      f: (v) => N(r2(v)),
      x: expl('e = v afastamento / v aproximação', 'O coeficiente mede quanto da velocidade relativa "sobra" depois do choque.', `e = ${af} ÷ ${ap} = ${N(r2(af / ap))}.`),
    };
  },
  // 17. tipos de colisão
  (r) => {
    const [txt, e, d] = r.pick([
      ['os corpos saem grudados', 'e = 0 (perfeitamente inelástica)', ['e = 1 (perfeitamente elástica)', 'e = 0,5 (parcialmente elástica)', 'e maior que 1', 'e = −1']],
      ['a energia cinética total se conserva', 'e = 1 (perfeitamente elástica)', ['e = 0 (perfeitamente inelástica)', 'e = 0,5 (parcialmente elástica)', 'e maior que 1', 'e = −1']],
    ]);
    return {
      e: `Numa colisão em que ${txt}, qual é o coeficiente de restituição?`,
      r: e,
      d,
      x: expl('classificação pelas velocidades relativas', 'e = 1: elástica (conserva energia cinética). Entre 0 e 1: parcialmente elástica. e = 0: os corpos não se afastam (grudam), e a perda de energia é a maior possível.', ''),
    };
  },
];

const medio = [
  // 1. bola que rebate na parede
  (r) => {
    const m = r.pick([0.2, 0.4, 0.5, 0.6]), v = r.pick([5, 10, 15, 20]);
    return {
      e: `Uma bola de ${N(m)} kg bate perpendicularmente numa parede a ${v} m/s e volta com a mesma velocidade. Qual é o módulo da variação da sua quantidade de movimento?`,
      r: 2 * m * v,
      d: [0, m * v, (m * v * v) / 2, 4 * m * v],
      f: Q,
      x: expl('Q é vetor: o sentido conta', `Ida: +${N(m * v)}; volta: −${N(m * v)}. A variação é a diferença.`, `|−${N(m * v)} − ${N(m * v)}| = ${N(2 * m * v)} kg·m/s.`),
    };
  },
  // 2. rebote com força média
  (r) => {
    const [m, v1, v2, t] = r.pick([[0.4, 15, 10, 0.05], [0.5, 12, 8, 0.04], [0.2, 20, 10, 0.02], [0.6, 10, 5, 0.03]]);
    const F = (m * (v1 + v2)) / t;
    return {
      e: `Uma bola de ${N(m)} kg chega a uma parede a ${v1} m/s e volta, na mesma direção, a ${v2} m/s. O contato dura ${N(t)} s. Qual é a força média da parede sobre a bola?`,
      r: F,
      d: [(m * (v1 - v2)) / t, (m * v1) / t, m * (v1 + v2), F / 2],
      f: u('N'),
      x: expl('F·Δt = ΔQ com sinais', `ΔQ = ${N(m)} · (${v2} − (−${v1})) = ${N(m)} · ${v1 + v2} = ${N(r2(m * (v1 + v2)))} kg·m/s.`, `F = ${N(r2(m * (v1 + v2)))} ÷ ${N(t)} = ${N(r2(F))} N.`),
    };
  },
  // 3. explosão em dois pedaços
  (r) => {
    const [m1, m2, v1] = r.pick([[2, 3, 6], [4, 1, 5], [3, 6, 8], [5, 2, 4]]);
    return {
      e: `Uma bomba parada explode em dois pedaços. O de ${m1} kg sai a ${v1} m/s para leste. Com que velocidade sai o de ${m2} kg?`,
      r: (m1 * v1) / m2,
      d: [v1, (m2 * v1) / m1, (m1 * v1) / (m1 + m2), v1 * m1 * m2],
      f: (v) => `${N(r2(v))} m/s, para oeste`,
      x: expl('Q antes = 0 = Q depois', 'Os pedaços saem em sentidos opostos, com quantidades de movimento de mesmo módulo.', `${m1} · ${v1} = ${m2} · v ⇒ v = ${N(r2((m1 * v1) / m2))} m/s, para oeste.`),
    };
  },
  // 4. choque frontal com velocidades opostas
  (r) => {
    const [m1, v1, m2, v2] = r.pick([[3, 4, 1, 2], [2, 5, 2, 1], [4, 3, 2, 3], [5, 2, 1, 4]]);
    const v = (m1 * v1 - m2 * v2) / (m1 + m2);
    return {
      e: `Um carrinho de ${m1} kg, a ${v1} m/s para a direita, bate de frente em outro de ${m2} kg, a ${v2} m/s para a esquerda. Eles ficam grudados. Qual é a velocidade do conjunto?`,
      r: v,
      d: [(m1 * v1 + m2 * v2) / (m1 + m2), (v1 - v2) / 2, (m1 * v1 - m2 * v2) / m1, (v1 + v2) / 2],
      f: (x) => (x === 0 ? '0 (param)' : `${N(r2(Math.abs(x)))} m/s, para a ${x > 0 ? 'direita' : 'esquerda'}`),
      x: expl('Q com sinais', `Direita positiva: ${m1} · ${v1} + ${m2} · (−${v2}) = ${m1 * v1 - m2 * v2}.`, `v = ${m1 * v1 - m2 * v2} ÷ ${m1 + m2} = ${N(r2(v))} m/s.`),
    };
  },
  // 5. energia perdida ao grudar
  (r) => {
    const [m1, v1, m2] = r.pick([[2, 6, 1], [3, 4, 1], [1, 10, 4], [2, 9, 1]]);
    const v = (m1 * v1) / (m1 + m2);
    const perda = (m1 * v1 * v1) / 2 - ((m1 + m2) * v * v) / 2;
    return {
      e: `Um bloco de ${m1} kg, a ${v1} m/s, bate em outro de ${m2} kg, parado, e eles seguem grudados. Quanta energia cinética se perde no choque?`,
      r: perda,
      d: [(m1 * v1 * v1) / 2, ((m1 + m2) * v * v) / 2, 0, perda / 2],
      f: u('J'),
      x: expl('Q se conserva; energia cinética não', `v final = ${m1} · ${v1} ÷ ${m1 + m2} = ${N(r2(v))} m/s. Antes: ${N(r2((m1 * v1 * v1) / 2))} J; depois: ${N(r2(((m1 + m2) * v * v) / 2))} J.`, `Perda: ${N(r2(perda))} J (vira calor, som e deformação).`),
    };
  },
  // 6. pêndulo balístico
  (r) => {
    const [h, vc] = r.pick([[0.2, 2], [0.05, 1], [0.45, 3], [0.8, 4]]);
    const [m, M] = r.pick([[0.01, 0.99], [0.02, 1.98], [0.05, 4.95]]);
    const vb = ((m + M) / m) * vc;
    return {
      e: `Uma bala de ${N(m * 1000)} g se crava num bloco de ${N(M)} kg pendurado (pêndulo balístico), e o conjunto sobe ${N(h * 100)} cm. Qual era a velocidade da bala? (g = 10 m/s²)`,
      r: vb,
      d: [vc, (M / m) * vc * 2, vb / 2, Math.sqrt(2 * 10 * h) * 10],
      f: u('m/s'),
      x: expl('duas etapas: choque (Q) e subida (energia)', `Subida: v = √(2gh) = √(2 · 10 · ${N(h)}) = ${vc} m/s para o conjunto. Choque: ${N(m)} · v_bala = ${N(m + M)} · ${vc}.`, `v_bala = ${N(r2(vb))} m/s.`),
    };
  },
  // 7. coeficiente pelo quique
  (r) => {
    const [h1, h2] = r.pick([[1.25, 0.8], [2, 0.5], [1.8, 0.8], [5, 1.8], [3.2, 0.8]]);
    const e = Math.sqrt(h2 / h1);
    return {
      e: `Uma bola é solta de ${N(h1)} m de altura e, depois de quicar no chão, sobe até ${N(h2)} m. Qual é o coeficiente de restituição do choque?`,
      r: e,
      d: [h2 / h1, h1 / h2, 1 - h2 / h1, Math.sqrt(h1 / h2)],
      f: (v) => N(r2(v)),
      x: expl('v = √(2gh) e e = v depois / v antes', 'A velocidade é proporcional à raiz da altura, então e = √(h depois / h antes).', `e = √(${N(h2)}/${N(h1)}) = ${N(r2(e))}.`),
    };
  },
  // 8. altura após um quique
  (r) => {
    const e = r.pick([0.5, 0.6, 0.8]), h = r.pick([2, 2.5, 5]);
    return {
      e: `Uma bola é solta de ${N(h)} m sobre um piso com coeficiente de restituição ${N(e)}. Até que altura ela sobe depois do primeiro quique?`,
      r: h * e * e,
      d: [h * e, h * (1 - e), h * Math.sqrt(e), h * e * e * e * e],
      f: u('m'),
      x: expl('h depois = e² · h antes', 'A velocidade de subida é e vezes a de chegada; a altura depende do quadrado da velocidade.', `${N(h)} · ${N(e)}² = ${N(r2(h * e * e))} m.`),
    };
  },
  // 9. pessoa pula do barco
  (r) => {
    const [mp, mb, v] = r.pick([[60, 240, 2], [50, 200, 3], [80, 160, 1.5], [70, 280, 4]]);
    return {
      e: `${nome(r)}, de ${mp} kg, pula horizontalmente de um barco parado de ${mb} kg com velocidade de ${N(v)} m/s. Com que velocidade o barco recua? (Despreze o atrito com a água.)`,
      r: (mp * v) / mb,
      d: [v, (mb * v) / mp, (mp * v) / (mp + mb), v / 2],
      f: u('m/s'),
      x: expl('conservação de Q', 'Antes, tudo parado: Q = 0. Depois, pessoa e barco têm quantidades iguais e opostas.', `${mp} · ${N(v)} = ${mb} · V ⇒ V = ${N(r2((mp * v) / mb))} m/s.`),
    };
  },
  // 10. empuxo de foguete
  (r) => {
    const [taxa, vg] = r.pick([[2, 500], [5, 1000], [10, 2000], [4, 1500]]);
    return {
      e: `Um foguete expele ${taxa} kg de gás por segundo, a ${N(vg)} m/s em relação a ele. Qual é a força de empuxo sobre o foguete?`,
      r: taxa * vg,
      d: [vg / taxa, (taxa * vg * vg) / 2, taxa * 10, taxa * vg * 10],
      f: u('N'),
      x: expl('F = ΔQ/Δt', `A cada segundo, o gás ganha ${taxa} · ${N(vg)} = ${N(taxa * vg)} kg·m/s. A reação empurra o foguete.`, `F = ${N(taxa * vg)} N.`),
    };
  },
  // 11. gráfico trapezoidal → velocidade
  (r) => {
    const [F, t1, t2, m] = r.pick([[100, 2, 4, 10], [60, 1, 3, 5], [200, 3, 5, 20], [40, 2, 6, 8]]);
    const I = F * t1 + (F * (t2 - t1)) / 2;
    return {
      e: `Um bloco de ${m} kg, parado em piso sem atrito, recebe uma força horizontal de ${F} N constante de 0 a ${t1} s, que depois diminui uniformemente até zero em t = ${t2} s. Qual é a velocidade final do bloco?`,
      r: I / m,
      d: [(F * t2) / m, (F * t1) / m, I, (F * t2) / (2 * m)],
      f: u('m/s'),
      x: expl('impulso = área do gráfico F × t', `Retângulo: ${F} · ${t1} = ${F * t1}; triângulo: ${F} · ${t2 - t1} ÷ 2 = ${(F * (t2 - t1)) / 2}. Impulso total ${I} N·s.`, `v = ${I} ÷ ${m} = ${N(r2(I / m))} m/s.`),
    };
  },
  // 12. centro de massa
  (r) => {
    const [m1, m2, d] = r.pick([[2, 3, 5], [1, 4, 10], [3, 1, 8], [4, 6, 10]]);
    return {
      e: `Duas esferas, de ${m1} kg e ${m2} kg, estão presas nas pontas de uma barra leve de ${d} m. A que distância da esfera de ${m1} kg fica o centro de massa?`,
      r: (m2 * d) / (m1 + m2),
      d: [d / 2, (m1 * d) / (m1 + m2), (m2 * d) / m1, d - d / (m1 + m2)],
      f: u('m'),
      x: expl('x_cm = (m₁x₁ + m₂x₂)/(m₁ + m₂)', `Com a esfera de ${m1} kg em x = 0 e a outra em x = ${d}: o centro de massa fica mais perto da massa maior.`, `x = ${m2} · ${d} ÷ ${m1 + m2} = ${N(r2((m2 * d) / (m1 + m2)))} m.`),
    };
  },
  // 13. velocidade do centro de massa
  (r) => {
    const [m1, v1, m2, v2] = r.pick([[2, 6, 4, 3], [3, 4, 1, 8], [1, 10, 4, 5], [5, 2, 5, 6]]);
    return {
      e: `Um corpo de ${m1} kg anda a ${v1} m/s e outro, de ${m2} kg, anda a ${v2} m/s, na mesma direção e sentido. Qual é a velocidade do centro de massa do sistema?`,
      r: (m1 * v1 + m2 * v2) / (m1 + m2),
      d: [(v1 + v2) / 2, (m1 * v1 + m2 * v2) / 2, m1 * v1 + m2 * v2, (m1 * v1 - m2 * v2) / (m1 + m2)],
      f: u('m/s'),
      x: expl('v_cm = Q total / massa total', `Q total = ${m1} · ${v1} + ${m2} · ${v2} = ${m1 * v1 + m2 * v2}.`, `v = ${m1 * v1 + m2 * v2} ÷ ${m1 + m2} = ${N(r2((m1 * v1 + m2 * v2) / (m1 + m2)))} m/s.`),
    };
  },
  // 14. tempo maior, força menor
  (r) => {
    const t1 = r.pick([0.05, 0.1, 0.02]), k = r.pick([3, 5, 10]);
    const F = r.pick([12000, 30000, 50000]);
    return {
      e: `Num teste de colisão, um boneco sofre força média de ${N(F)} N quando a parada dura ${N(t1)} s. Com um airbag, a parada passa a durar ${N(t1 * k)} s. Qual é a nova força média, para a mesma variação de velocidade?`,
      r: F / k,
      d: [F * k, F, F / (k * k), F - F / k],
      f: u('N'),
      x: expl('F·Δt = ΔQ (constante)', `O tempo ficou ${k} vezes maior; a força fica ${k} vezes menor.`, `${N(F)} ÷ ${k} = ${N(r2(F / k))} N.`),
    };
  },
  // 15. coeficiente a partir das velocidades
  (r) => {
    const [a, b, a2, b2] = r.pick([[8, 2, 4, 6], [10, 0, 3, 7], [6, 0, 1, 5], [9, 1, 4, 6]]);
    const e = (b2 - a2) / (a - b);
    return {
      e: `Dois carrinhos de mesma massa andam no mesmo sentido: A a ${a} m/s, atrás de B a ${b} m/s. Depois do choque, A anda a ${a2} m/s e B a ${b2} m/s. Qual é o coeficiente de restituição?`,
      r: e,
      d: [(a - b) / (b2 - a2), a2 / a, b2 / a, 1],
      f: (v) => N(r2(v)),
      x: expl('e = (v_B\' − v_A\') / (v_A − v_B)', `Aproximação: ${a} − ${b} = ${a - b}; afastamento: ${b2} − ${a2} = ${b2 - a2}.`, `e = ${b2 - a2} ÷ ${a - b} = ${N(r2(e))}.`),
    };
  },
  // 16. carrinho que recebe areia
  (r) => {
    const [m, v, ma] = r.pick([[40, 3, 20], [60, 4, 20], [30, 5, 20], [50, 6, 25]]);
    return {
      e: `Um carrinho de ${m} kg anda a ${v} m/s num trilho sem atrito. Cai verticalmente dentro dele um saco de ${ma} kg de areia. Qual é a nova velocidade do carrinho?`,
      r: (m * v) / (m + ma),
      d: [v, (m * v) / ma, v - ma / m, (ma * v) / (m + ma)],
      f: u('m/s'),
      x: expl('Q horizontal se conserva', 'A areia cai na vertical: não traz quantidade de movimento horizontal, mas passa a andar junto, aumentando a massa.', `${m} · ${v} = ${m + ma} · v ⇒ v = ${N(r2((m * v) / (m + ma)))} m/s.`),
    };
  },
  // 17. comparação de energia e Q
  (r) => {
    const k = r.pick([2, 3, 4]);
    return {
      e: `Dois corpos têm a mesma quantidade de movimento, mas a massa de A é ${k} vezes a de B. Quantas vezes a energia cinética de B é a de A?`,
      r: k,
      d: [k * k, 1, 1 / k, Math.sqrt(k)],
      f: (v) => N(r2(v)),
      x: expl('Ec = Q²/(2m)', `Com o mesmo Q, a energia cinética é inversamente proporcional à massa.`, `B tem ${k} vezes menos massa, então ${k} vezes mais energia cinética.`),
    };
  },
];

const dificil = [
  // 1. elástica geral: o alvo
  (r) => {
    const [m1, m2, v] = r.pick([[1, 3, 8], [2, 3, 5], [1, 2, 6], [3, 1, 4]]);
    const v2 = (2 * m1 * v) / (m1 + m2);
    return {
      e: `Uma esfera de ${m1} kg, a ${v} m/s, colide frontal e elasticamente com outra de ${m2} kg, parada. Com que velocidade sai a esfera de ${m2} kg?`,
      r: v2,
      d: [v, (m1 * v) / (m1 + m2), (m1 * v) / m2, ((m1 - m2) * v) / (m1 + m2)],
      f: u('m/s'),
      x: expl('Q e energia se conservam (e = 1)', `Q: ${m1} · ${v} = ${m1}v₁ + ${m2}v₂. Elástica: v₂ − v₁ = ${v}. Resolvendo: v₂ = 2m₁v/(m₁ + m₂).`, `v₂ = 2 · ${m1} · ${v} ÷ ${m1 + m2} = ${N(r2(v2))} m/s.`),
    };
  },
  // 2. elástica geral: a esfera que bate
  (r) => {
    const [m1, m2, v] = r.pick([[1, 3, 8], [1, 2, 6], [2, 3, 10], [1, 4, 5]]);
    const v1 = ((m1 - m2) * v) / (m1 + m2);
    return {
      e: `Uma esfera de ${m1} kg, a ${v} m/s, colide frontal e elasticamente com outra de ${m2} kg, parada. O que acontece com a esfera de ${m1} kg logo depois?`,
      r: `volta a ${N(r2(-v1))} m/s`,
      d: [`para`, `segue a ${N(r2(-v1))} m/s`, `segue a ${N(r2((m1 * v) / (m1 + m2)))} m/s`, `volta a ${v} m/s`],
      x: expl('elástica: v₁ = (m₁ − m₂)v/(m₁ + m₂)', 'Se a esfera que bate é mais leve, ela volta (como uma bola na parede).', `v₁ = (${m1} − ${m2}) · ${v} ÷ ${m1 + m2} = ${N(r2(v1))} m/s: o sinal negativo indica que volta.`),
    };
  },
  // 3. colisão perpendicular que gruda
  (r) => {
    const [a, b, v] = r.pick([[3, 4, 2.5], [6, 8, 5], [5, 12, 6.5], [8, 6, 5]]);
    return {
      e: `Duas bolas de 1 kg colidem e ficam grudadas. Antes, uma andava a ${a} m/s para leste e a outra a ${b} m/s para norte. Qual é a velocidade do conjunto?`,
      r: v,
      d: [(a + b) / 2, a + b, Math.abs(b - a) / 2, Math.sqrt(a * a + b * b)],
      f: u('m/s'),
      x: expl('Q é vetor: some pelo teorema de Pitágoras', `Q total = √(${a}² + ${b}²) = ${N(Math.sqrt(a * a + b * b))} kg·m/s, dividido pela massa total de 2 kg.`, `v = ${N(r2(v))} m/s.`),
    };
  },
  // 4. explosão em três pedaços
  (r) => {
    const v = r.pick([4, 6, 8, 10]);
    return {
      e: `Um objeto parado explode em três pedaços. Dois, de 1 kg cada, saem perpendiculares entre si, ambos a ${v} m/s. O terceiro tem 2 kg. Qual é a sua velocidade?`,
      r: `${N(v / 2)}√2 m/s`,
      d: [`${N(v)}√2 m/s`, `${N(v)} m/s`, `${N(v / 2)} m/s`, `${N(2 * v)} m/s`],
      x: expl('soma vetorial de Q = 0', `Os dois primeiros somam √(${v}² + ${v}²) = ${N(v)}√2 kg·m/s. O terceiro precisa ter o mesmo valor, em sentido oposto.`, `2 · v = ${N(v)}√2 ⇒ v = ${N(v / 2)}√2 m/s.`),
    };
  },
  // 5. energia perdida no pêndulo balístico
  (r) => {
    const [m, M] = r.pick([[0.01, 0.99], [0.02, 0.98], [0.05, 0.95], [0.01, 1.99]]);
    const fica = m / (m + M);
    return {
      e: `Num pêndulo balístico, uma bala de ${N(m * 1000)} g se crava num bloco de ${N(M)} kg. Que porcentagem da energia cinética da bala é perdida no choque?`,
      r: 100 * (1 - fica),
      d: [100 * fica, 50, 100, (100 * M) / (m + M) / 2],
      f: (v) => `${N(r2(v))}%`,
      x: expl('Ec = Q²/(2m) com Q constante', `Q se conserva, mas a massa que se move passa de ${N(m)} kg para ${N(m + M)} kg. A energia fica multiplicada por m/(m + M) = ${N(fica, 3)}.`, `Perda: ${N(r2(100 * (1 - fica)))}%.`),
    };
  },
  // 6. coeficiente e velocidades finais
  (r) => {
    const v = r.pick([8, 10, 12, 6]), e = r.pick([0.5, 0.25, 0.75]);
    const vb = (v * (1 + e)) / 2;
    return {
      e: `Um carrinho, a ${v} m/s, bate de frente em outro de mesma massa, parado. O coeficiente de restituição é ${N(e)}. Com que velocidade sai o carrinho que estava parado?`,
      r: vb,
      d: [v, v / 2, v * e, (v * (1 - e)) / 2],
      f: u('m/s'),
      x: expl('Q + coeficiente de restituição', `Q: v_A + v_B = ${v}. Restituição: v_B − v_A = ${N(e)} · ${v} = ${N(e * v)}. Somando as duas: 2v_B = ${N(v + e * v)}.`, `v_B = ${N(r2(vb))} m/s.`),
    };
  },
  // 7. dois quiques
  (r) => {
    const [h, e] = r.pick([[8, 0.5], [16, 0.5], [10, 0.6], [5, 0.8]]);
    return {
      e: `Uma bola é solta de ${h} m sobre um piso com coeficiente de restituição ${N(e)}. Que altura ela atinge depois do segundo quique?`,
      r: h * e ** 4,
      d: [h * e * e, h * e * e * e, h * e, h * e ** 4 * 2],
      f: u('m'),
      x: expl('cada quique multiplica a altura por e²', `Dois quiques: h · (e²)² = h · e⁴.`, `${h} · ${N(e)}⁴ = ${N(r2(h * e ** 4))} m.`),
    };
  },
  // 8. impulso sobre corpo já em movimento
  (r) => {
    const [m, v0, F, t] = r.pick([[2, 3, 100, 0.2], [4, 5, 60, 1], [5, 2, 200, 0.1], [10, 4, 150, 0.4]]);
    const v = v0 + (F * t) / m;
    return {
      e: `Um corpo de ${m} kg anda a ${v0} m/s quando recebe, no sentido do movimento, uma força de ${F} N por ${N(t)} s. Qual é a sua velocidade final?`,
      r: v,
      d: [(F * t) / m, v0 + F * t, v0 * ((F * t) / m), v + v0],
      f: u('m/s'),
      x: expl('I = Q final − Q inicial', `I = ${F} · ${N(t)} = ${N(F * t)} N·s. Q inicial = ${m} · ${v0} = ${m * v0}.`, `Q final = ${N(m * v0 + F * t)} ⇒ v = ${N(r2(v))} m/s.`),
    };
  },
  // 9. nave que expele gás
  (r) => {
    const [M, mg, u2] = r.pick([[1000, 10, 2000], [500, 5, 3000], [2000, 40, 1000], [800, 16, 1500]]);
    return {
      e: `Uma nave de ${N(M)} kg (sem contar o gás), parada no espaço, expele de uma vez ${mg} kg de gás a ${N(u2)} m/s. Com que velocidade a nave passa a se mover?`,
      r: (mg * u2) / M,
      d: [(M * u2) / mg / 100, u2, (mg * u2) / (M + mg) / 2, Math.sqrt((mg * u2 * u2) / M)],
      f: u('m/s'),
      x: expl('conservação de Q', 'Antes, Q = 0. O gás leva uma quantidade de movimento num sentido; a nave ganha a mesma no sentido oposto.', `${mg} · ${N(u2)} = ${N(M)} · v ⇒ v = ${N(r2((mg * u2) / M))} m/s.`),
    };
  },
  // 10. pessoa caminha sobre o barco
  (r) => {
    const [mp, mb, L] = r.pick([[60, 120, 4], [50, 150, 4], [80, 240, 6], [70, 140, 3]]);
    const rec = (mp * L) / (mp + mb);
    return {
      e: `Uma pessoa de ${mp} kg está numa ponta de um barco de ${mb} kg, parado em água calma. Ela caminha ${L} m até a outra ponta. Quanto o barco se desloca em relação à água?`,
      r: rec,
      d: [(mp * L) / mb, L, L - rec, (mb * L) / (mp + mb)],
      f: u('m'),
      x: expl('o centro de massa não se move', `Sem força externa horizontal, o centro de massa fica parado. Se o barco recua x, a pessoa anda ${L} − x em relação à água: ${mp}(${L} − x) = ${mb}x.`, `x = ${mp} · ${L} ÷ ${mp + mb} = ${N(r2(rec))} m.`),
    };
  },
  // 11. força do chão num salto
  (r) => {
    const [m, h, t] = r.pick([[70, 1.8, 0.1], [60, 1.25, 0.05], [80, 0.8, 0.2], [50, 3.2, 0.1]]);
    const v = Math.sqrt(2 * 10 * h);
    const F = (m * v) / t + m * 10;
    return {
      e: `Uma pessoa de ${m} kg pula de ${N(h)} m de altura e, ao tocar o chão, leva ${N(t)} s para parar. Qual é a força média que o chão faz sobre ela? (g = 10 m/s²)`,
      r: F,
      d: [(m * v) / t, m * 10, (m * v) / t - m * 10, (m * v * v) / 2 / t],
      f: u('N'),
      x: expl('F resultante·Δt = ΔQ, com o peso junto', `Chega com v = √(2 · 10 · ${N(h)}) = ${N(v)} m/s. (N − P)·${N(t)} = ${m} · ${N(v)} ⇒ N − ${m * 10} = ${N(r2((m * v) / t))}.`, `N = ${N(r2(F))} N.`),
    };
  },
  // 12. canhão que atira inclinado
  (r) => {
    const [M, m, v, ang, cos] = r.pick([[1000, 10, 200, 60, 0.5], [2000, 20, 300, 60, 0.5], [500, 5, 400, 60, 0.5], [1500, 15, 200, 0, 1]]);
    return {
      e: `Um canhão de ${N(M)} kg, sobre rodas e sem atrito, dispara uma bala de ${m} kg a ${v} m/s, ${ang === 0 ? 'na horizontal' : `numa direção que faz ${ang}° com a horizontal`}. Com que velocidade o canhão recua?`,
      r: (m * v * cos) / M,
      d: [(m * v) / M / (cos === 1 ? 2 : 1), (m * v * Math.sqrt(3)) / 2 / M, (m * v * cos) / (M + m) * 10, (m * v * 2) / M],
      f: u('m/s'),
      x: expl('só a componente horizontal se conserva', `O chão impede o recuo para baixo, mas não na horizontal. A componente horizontal da velocidade da bala é ${v} · cos ${ang}° = ${N(v * cos)} m/s.`, `${m} · ${N(v * cos)} = ${N(M)} · V ⇒ V = ${N(r2((m * v * cos) / M))} m/s.`),
    };
  },
  // 13. bola que bate obliquamente
  (r) => {
    const [m, v, ang, cos] = r.pick([[0.2, 10, 60, 0.5], [0.4, 5, 60, 0.5], [0.5, 8, 0, 1], [0.3, 20, 60, 0.5]]);
    return {
      e: `Uma bola de ${N(m)} kg bate numa parede a ${v} m/s, ${ang === 0 ? 'perpendicularmente' : `fazendo ${ang}° com a reta perpendicular à parede`}, e é refletida com a mesma velocidade e o mesmo ângulo. Qual é o módulo do impulso que a parede aplica?`,
      r: 2 * m * v * cos,
      d: [2 * m * v, m * v * cos, 0, m * v],
      f: u('N·s'),
      x: expl('só a componente perpendicular muda', `A componente paralela à parede não muda. A perpendicular (${N(v)} · cos ${ang}° = ${N(v * cos)} m/s) inverte o sentido.`, `I = 2 · ${N(m)} · ${N(v * cos)} = ${N(r2(2 * m * v * cos))} N·s.`),
    };
  },
  // 14. mola entre dois carrinhos
  (r) => {
    const [m1, m2, E] = r.pick([[2, 3, 15], [2, 3, 60], [1, 2, 12], [1, 3, 24]]);
    // m1·v1 = m2·v2; E = m1v1²/2 + m2v2²/2
    const v2 = Math.sqrt((2 * E) / (m2 * m2 / m1 + m2));
    const v1 = (m2 * v2) / m1;
    return {
      e: `Dois carrinhos, de ${m1} kg e ${m2} kg, estão parados e presos com uma mola comprimida entre eles, que guarda ${E} J. A mola é solta. Com que velocidade sai o carrinho de ${m1} kg?`,
      r: v1,
      d: [v2, Math.sqrt((2 * E) / m1), Math.sqrt((2 * E) / (m1 + m2)), v1 * 2],
      f: u('m/s'),
      x: expl('Q (= 0) e energia ao mesmo tempo', `Q: as quantidades de movimento são iguais e opostas, então v₁ = ${N(r2(m2 / m1))}v₂. Energia: ${m1}v₁²/2 + ${m2}v₂²/2 = ${E}. Resolvendo: v₂ = ${N(r2(v2))} m/s.`, `v₁ = ${N(r2(v1))} m/s.`),
    };
  },
  // 15. fração de energia perdida com massas iguais
  (r) => {
    const v = r.pick([4, 6, 10, 20]), m = r.pick([2, 1000, 5]);
    return {
      e: `Um corpo de ${N(m)} kg, a ${v} m/s, bate em outro idêntico, parado, e eles seguem grudados. Que fração da energia cinética inicial se perde?`,
      r: 'metade (50%)',
      d: ['nenhuma (0%)', 'um quarto (25%)', 'três quartos (75%)', 'toda (100%)'],
      x: expl('Q se conserva, Ec = Q²/(2m)', `O conjunto anda a ${N(v / 2)} m/s. Energia antes: ${N((m * v * v) / 2)} J; depois: ${N((2 * m * (v / 2) ** 2) / 2)} J.`, 'Sobra metade; perde-se metade.'),
    };
  },
  // 16. perícia de trânsito (2D)
  (r) => {
    const [m1, v1, m2, v2] = r.pick([[1500, 8, 1000, 16], [1200, 10, 800, 7.5], [1000, 12, 1000, 16], [2000, 6, 1000, 16]]);
    const q = Math.hypot(m1 * v1, m2 * v2);
    const v = q / (m1 + m2);
    return {
      e: `Num cruzamento, um carro de ${N(m1)} kg, a ${v1} m/s para leste, bate em outro de ${N(m2)} kg, a ${N(v2)} m/s para norte. Eles seguem engatados. Qual é a velocidade do conjunto logo após o choque?`,
      r: v,
      d: [(m1 * v1 + m2 * v2) / (m1 + m2), (v1 + v2) / 2, Math.hypot(v1, v2), Math.abs(m1 * v1 - m2 * v2) / (m1 + m2)],
      f: u('m/s'),
      x: expl('Q vetorial e Pitágoras', `Leste: ${N(m1 * v1)}; norte: ${N(m2 * v2)} (kg·m/s). Total: √(${N(m1 * v1)}² + ${N(m2 * v2)}²) = ${N(q)}.`, `v = ${N(q)} ÷ ${N(m1 + m2)} = ${N(r2(v))} m/s.`),
    };
  },
];

export default [
  {
    disciplina: 'fisica',
    arquivo: '09-quantidade-de-movimento-e-colisoes',
    titulo: 'Quantidade de movimento, impulso e colisões',
    provas: ['ENEM', 'Militares'],
    descricao: 'Quantidade de movimento, impulso e teorema do impulso, conservação em explosões e colisões, coeficiente de restituição e centro de massa.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
