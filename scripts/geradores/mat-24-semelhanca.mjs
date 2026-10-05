// Matemática — Semelhança de triângulos, teorema de Tales e relações métricas (Geometria).
import { expl, fracao, num } from './util.mjs';

const N = (v, c = null) => num(v, c);
const m = (v) => `${N(v)} m`;
const cm = (v) => `${N(v)} cm`;
const raiz = (k) => (k === 1 ? '' : `√${k}`);

const facil = [
  // 1. sombra
  (r) => {
    const [h, s] = r.pick([[1.8, 1.2], [1.6, 2], [1.5, 0.6], [2, 1.6], [1.7, 0.85]]);
    const S = r.pick([10, 12, 15, 20, 24]);
    const H = (h * S) / s;
    return {
      e: `No mesmo instante, uma pessoa de ${N(h)} m de altura projeta uma sombra de ${N(s)} m, e um prédio projeta uma sombra de ${N(S)} m. Qual é a altura do prédio?`,
      r: H,
      d: [(s * S) / h, H / 2, S + h, H + s],
      f: m,
      x: expl('triângulos semelhantes (raios de sol paralelos)', 'Os raios do Sol chegam paralelos, então altura e sombra formam triângulos semelhantes: a razão altura/sombra é a mesma.', `${N(h)}/${N(s)} = H/${N(S)} ⇒ H = ${N(H)} m.`),
    };
  },
  // 2. Tales
  (r) => {
    const a = r.int(2, 6), b = r.int(3, 8), k = r.pick([1.5, 2, 3]);
    return {
      e: `Três retas paralelas cortam duas transversais. Na primeira transversal, os segmentos formados medem ${a} cm e ${b} cm. Na segunda, o segmento correspondente ao de ${a} cm mede ${N(a * k)} cm. Quanto mede o outro?`,
      r: b * k,
      d: [b + a * k - a, (a * b) / (a * k), b * k + 1, a * k + b],
      f: cm,
      x: expl('teorema de Tales', 'Retas paralelas cortam as transversais em segmentos proporcionais.', `${a}/${b} = ${N(a * k)}/x ⇒ x = ${N(b * k)} cm.`),
    };
  },
  // 3. razão de semelhança
  (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [7, 24, 25], [8, 15, 17]]);
    const k = r.pick([2, 3, 1.5, 2.5]);
    return {
      e: `Dois triângulos são semelhantes. Os lados do menor medem ${a}, ${b} e ${c}; o lado do maior que corresponde ao de medida ${c} mede ${N(c * k)}. Qual é a razão de semelhança (maior ÷ menor)?`,
      r: k,
      d: [k * k, 1 / k, c * k - c, k + 1],
      x: expl('razão de semelhança', 'Em figuras semelhantes, todas as medidas correspondentes são multiplicadas pelo mesmo número k.', `k = ${N(c * k)} ÷ ${c} = ${N(k)}.`),
    };
  },
  // 4. lado correspondente
  (r) => {
    const ab = r.int(4, 9), de = ab + r.int(2, 6), bc = r.int(5, 12);
    const ef = (bc * de) / ab;
    return {
      e: `Os triângulos ABC e DEF são semelhantes, com A ↔ D, B ↔ E e C ↔ F. Sabendo que AB = ${ab}, DE = ${de} e BC = ${bc}, quanto mede EF?`,
      r: ef,
      d: [(bc * ab) / de, bc + de - ab, bc * de, ef + 1],
      x: expl('lados correspondentes proporcionais', 'AB corresponde a DE e BC corresponde a EF.', `${ab}/${de} = ${bc}/EF ⇒ EF = ${bc} · ${de} / ${ab} = ${N(ef)}.`),
    };
  },
  // 5. perímetro
  (r) => {
    const p = r.int(12, 40), k = r.pick([2, 3, 4]);
    return {
      e: `Um triângulo tem perímetro ${p} cm. Outro triângulo, semelhante a ele, tem lados ${k} vezes maiores. Qual é o perímetro do triângulo maior?`,
      r: p * k,
      d: [p * k * k, p + k, p * (k + 1), (p * k) / 2],
      f: cm,
      x: expl('perímetro acompanha os lados', 'Se cada lado é multiplicado por k, a soma deles (o perímetro) também é.', `${p} × ${k} = ${p * k} cm.`),
    };
  },
  // 6. área com k²
  (r) => {
    const k = r.int(2, 5), a = r.int(4, 20);
    return {
      e: `Um triângulo de área ${a} cm² é ampliado de modo que todos os seus lados fiquem ${k} vezes maiores. Qual é a área do triângulo ampliado?`,
      r: a * k * k,
      d: [a * k, a * k * k * k, a + k * k, a * 2 * k],
      f: (v) => `${N(v)} cm²`,
      x: expl('área cresce com k²', 'Área é "comprimento × comprimento": se cada medida linear é multiplicada por k, a área é multiplicada por k².', `${a} × ${k}² = ${a * k * k} cm².`),
    };
  },
  // 7. caso AA
  (r) => {
    const [a1, a2] = r.pick([[40, 70], [35, 65], [50, 60], [30, 90], [45, 75]]);
    return {
      e: `Um triângulo tem ângulos de ${a1}° e ${a2}°. Outro triângulo tem ângulos de ${a2}° e ${180 - a1 - a2}°. O que se pode afirmar sobre eles?`,
      r: 'são semelhantes',
      d: ['são congruentes (iguais)', 'não são semelhantes', 'só seriam semelhantes se tivessem um lado igual', 'são semelhantes só se forem retângulos'],
      x: expl('caso AA', `O terceiro ângulo do primeiro é 180° − ${a1}° − ${a2}° = ${180 - a1 - a2}°. Os dois têm os mesmos ângulos (${a1}°, ${a2}° e ${180 - a1 - a2}°).`, 'Dois ângulos iguais bastam para a semelhança (caso ângulo-ângulo). Não dá para dizer que são iguais, porque os tamanhos podem ser diferentes.'),
    };
  },
  // 8. base média
  (r) => {
    const b = 2 * r.int(4, 15);
    return {
      e: `Num triângulo ABC, M e N são os pontos médios dos lados AB e AC. Se BC mede ${b} cm, quanto mede MN?`,
      r: b / 2,
      d: [b, b / 4, b * 2, b / 3],
      f: cm,
      x: expl('base média', 'O segmento que liga os pontos médios de dois lados é paralelo ao terceiro e mede a metade dele (o triângulo AMN é semelhante a ABC com razão 1/2).', `${b} ÷ 2 = ${b / 2} cm.`),
    };
  },
  // 9. maquete
  (r) => {
    const e = r.pick([50, 100, 200, 25]), h = r.int(4, 20);
    const H = (h * e) / 100;
    return {
      e: `Uma maquete foi feita na escala 1 : ${e}. A altura de um prédio na maquete é ${h} cm. Qual é a altura real do prédio?`,
      r: H,
      d: [H / 10, H * 10, h * e, H + 1],
      f: m,
      x: expl('escala = razão de semelhança', `Cada medida real é ${e} vezes a da maquete.`, `${h} cm × ${e} = ${h * e} cm = ${N(H)} m.`),
    };
  },
  // 10. h² = m·n
  (r) => {
    const [p, q] = r.pick([[4, 9], [2, 8], [3, 12], [1, 16], [9, 16], [4, 25]]);
    return {
      e: `Num triângulo retângulo, a altura relativa à hipotenusa divide-a em segmentos de ${p} cm e ${q} cm. Quanto mede essa altura?`,
      r: Math.sqrt(p * q),
      d: [(p + q) / 2, p * q, Math.sqrt(p + q) % 1 === 0 ? Math.sqrt(p + q) : q - p, Math.sqrt(p * q) + 1],
      f: cm,
      x: expl('relação métrica h² = m · n', 'A altura relativa à hipotenusa forma dois triângulos semelhantes; disso sai h² = m·n.', `h² = ${p} · ${q} = ${p * q} ⇒ h = ${Math.sqrt(p * q)} cm.`),
    };
  },
  // 11. cateto² = hipotenusa · projeção
  (r) => {
    const [a, n, c] = r.pick([[25, 9, 15], [10, 3.6, 6], [13, 1.92, 4.8], [20, 7.2, 12], [5, 1.8, 3]]);
    return {
      e: `Num triângulo retângulo de hipotenusa ${N(a)} cm, a projeção de um dos catetos sobre a hipotenusa mede ${N(n)} cm. Quanto mede esse cateto?`,
      r: c,
      d: [Math.round(Math.sqrt(a * a - n * n) * 10) / 10, a - n, (a + n) / 2, c + 1],
      f: cm,
      x: expl('relação métrica c² = a · n', 'Cada cateto ao quadrado é a hipotenusa vezes a projeção dele sobre ela.', `c² = ${N(a)} · ${N(n)} = ${N(a * n)} ⇒ c = ${N(c)} cm.`),
    };
  },
  // 12. feixe de paralelas com terrenos
  (r) => {
    const [a, b, fa] = r.pick([[20, 30, 24], [15, 25, 18], [24, 16, 30], [30, 20, 27], [18, 27, 24]]);
    const fb = (b * fa) / a;
    return {
      e: `Dois lotes vizinhos têm laterais paralelas entre si. Os fundos medem ${a} m e ${b} m numa rua, e a frente do primeiro lote, na outra rua, mede ${fa} m. Quanto mede a frente do segundo lote?`,
      r: fb,
      d: [(a * fa) / b, fa + b - a, fb + 2, (a + b) / 2],
      f: (v) => m(Math.round(v * 10) / 10),
      x: expl('teorema de Tales', 'As laterais paralelas cortam as duas ruas em segmentos proporcionais.', `${a}/${b} = ${fa}/x ⇒ x = ${b} · ${fa} / ${a} = ${N(fb)} m.`),
    };
  },
  // 13. DE paralelo a BC com razão
  (r) => {
    const k = r.pick([2, 3, 4]), bc = k * r.int(3, 8);
    return {
      e: `No triângulo ABC, o segmento DE é paralelo a BC, com D em AB e E em AC. Sabendo que AD = AB/${k} e que BC = ${bc} cm, quanto mede DE?`,
      r: bc / k,
      d: [bc - bc / k, bc * k, bc / (k * k), bc / k + 1],
      f: cm,
      x: expl('triângulo semelhante "dentro"', 'DE ∥ BC faz o triângulo ADE ser semelhante a ABC, com razão AD/AB.', `DE = ${bc} ÷ ${k} = ${N(bc / k)} cm.`),
    };
  },
  // 14. sombras de duas pessoas
  (r) => {
    const h1 = r.pick([1.6, 1.8, 1.5]), s1 = r.pick([2, 2.4, 3]), h2 = r.pick([1.2, 1.4, 1, 0.9]);
    const s2 = (h2 * s1) / h1;
    return {
      e: `No mesmo instante, um adulto de ${N(h1)} m projeta uma sombra de ${N(s1)} m. Qual é o comprimento da sombra de uma criança de ${N(h2)} m?`,
      r: s2,
      d: [(h1 * s1) / h2, s1 - (h1 - h2), s2 + 0.5, h2],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('razão sombra/altura constante', 'Para objetos verticais no mesmo instante, sombra/altura é a mesma.', `s = ${N(h2)} · ${N(s1)} / ${N(h1)} = ${N(s2)} m.`),
    };
  },
  // 15. ampliação de foto
  (r) => {
    const [a, b] = r.pick([[10, 15], [9, 12], [6, 9], [12, 18], [15, 21]]);
    const k = r.pick([2, 3, 1.5]);
    return {
      e: `Uma foto de ${a} cm × ${b} cm será ampliada sem distorção, e o lado menor passará a medir ${N(a * k)} cm. Quanto medirá o lado maior?`,
      r: b * k,
      d: [b + a * k - a, b * k * k, (b * a * k) / (a + b), b * k + 2],
      f: cm,
      x: expl('ampliação sem distorção = semelhança', 'Os dois lados são multiplicados pelo mesmo fator.', `Fator ${N(a * k)} ÷ ${a} = ${N(k)}; ${b} × ${N(k)} = ${N(b * k)} cm.`),
    };
  },
  // 16. alturas correspondentes
  (r) => {
    const l1 = r.int(4, 10), l2 = l1 * r.pick([2, 3]), h1 = r.int(3, 8);
    return {
      e: `Dois triângulos semelhantes têm lados correspondentes de ${l1} cm e ${l2} cm. A altura do menor, relativa a esse lado, mede ${h1} cm. Quanto mede a altura correspondente no maior?`,
      r: (h1 * l2) / l1,
      d: [h1 + l2 - l1, (h1 * l1) / l2, h1 * (l2 / l1) ** 2, h1 * l2],
      f: cm,
      x: expl('todas as medidas lineares na mesma razão', 'Alturas, medianas e perímetros seguem a mesma razão dos lados.', `${h1} × ${l2 / l1} = ${(h1 * l2) / l1} cm.`),
    };
  },
  // 17. ângulos correspondentes
  (r) => {
    const a = r.int(30, 70), b = r.int(40, 80);
    if (a + b >= 170) return facil[16](r);
    return {
      e: `Os triângulos ABC e PQR são semelhantes, com A ↔ P, B ↔ Q e C ↔ R. Se  = ${a}° e B̂ = ${b}°, quanto mede o ângulo R̂?`,
      r: 180 - a - b,
      d: [a, b, 180 - a, 90],
      f: (v) => `${v}°`,
      x: expl('semelhança conserva ângulos', 'Em triângulos semelhantes, ângulos correspondentes são iguais; R̂ corresponde a Ĉ.', `Ĉ = 180° − ${a}° − ${b}° = ${180 - a - b}°.`),
    };
  },
];

const medio = [
  // 1. DE ∥ BC com segmentos
  (r) => {
    const k = r.pick([1, 2, 3]), x = r.int(2, 6) * k, db = r.int(3, 8) * k;
    const ae = r.int(2, 5) * 2;
    const ec = (ae * db) / x;
    if (!Number.isInteger(ec)) return medio[0](r);
    return {
      e: `No triângulo ABC, DE é paralelo a BC (D em AB e E em AC). Sabendo que DB = ${db}, AE = ${ae} e EC = ${ec}, quanto mede AD?`,
      r: x,
      d: [(ae * ec) / db, (db * ec) / ae, ae + db - ec, x + 1],
      f: (v) => N(Math.round(v * 100) / 100),
      x: expl('Tales no triângulo', 'A paralela a um lado divide os outros dois em partes proporcionais: AD/DB = AE/EC.', `AD/${db} = ${ae}/${ec} ⇒ AD = ${db} · ${ae} / ${ec} = ${x}.`),
    };
  },
  // 2. quadrado inscrito num triângulo
  (r) => {
    const [b, h] = r.pick([[12, 6], [10, 15], [6, 12], [20, 5], [8, 24], [9, 18]]);
    const l = (b * h) / (b + h);
    return {
      e: `Um quadrado tem um lado sobre a base de um triângulo e os outros dois vértices sobre os demais lados. A base do triângulo mede ${b} cm e a altura relativa a ela mede ${h} cm. Quanto mede o lado do quadrado?`,
      r: l,
      d: [(b + h) / 4, Math.sqrt((b * h) / 2), b / 2, (b * h) / (b + h) + 1],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('triângulo menor semelhante', `Acima do quadrado sobra um triângulo semelhante ao original, de base l e altura ${h} − l: l/${b} = (${h} − l)/${h}.`, `l = ${b} · ${h} / (${b} + ${h}) = ${N(l)} cm.`),
    };
  },
  // 3. teorema da bissetriz interna
  (r) => {
    const [ab, ac] = r.pick([[6, 9], [4, 6], [8, 12], [5, 10], [6, 8]]);
    const bc = r.int(Math.abs(ac - ab) + 2, ab + ac - 2);
    const bd = (bc * ab) / (ab + ac);
    return {
      e: `No triângulo ABC, AB = ${ab}, AC = ${ac} e BC = ${bc}. A bissetriz do ângulo  corta BC no ponto D. Quanto mede BD?`,
      r: bd,
      d: [bc / 2, (bc * ac) / (ab + ac), bd + 1, ab / 2],
      f: (v) => N(Math.round(v * 100) / 100),
      x: expl('teorema da bissetriz interna', 'A bissetriz divide o lado oposto em partes proporcionais aos lados adjacentes: BD/DC = AB/AC.', `BD = ${bc} · ${ab}/(${ab} + ${ac}) = ${N(bd)}.`),
    };
  },
  // 4. áreas e lados
  (r) => {
    const [a1, a2] = r.pick([[16, 36], [9, 25], [4, 49], [25, 64], [36, 81]]);
    const l1 = 2 * r.int(2, 6);
    const l2 = l1 * Math.sqrt(a2 / a1);
    return {
      e: `Dois triângulos semelhantes têm áreas ${a1} cm² e ${a2} cm². Um lado do menor mede ${l1} cm. Quanto mede o lado correspondente do maior?`,
      r: l2,
      d: [(l1 * a2) / a1, l1 + Math.sqrt(a2) - Math.sqrt(a1), l1 * 2, l2 + 2],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('razão das áreas = k²', `k² = ${a2}/${a1} ⇒ k = ${Math.sqrt(a2)}/${Math.sqrt(a1)}.`, `Lado = ${l1} × ${Math.sqrt(a2)}/${Math.sqrt(a1)} = ${N(l2)} cm.`),
    };
  },
  // 5. altura relativa à hipotenusa pelos catetos
  (r) => {
    const [b, c, a] = r.pick([[6, 8, 10], [9, 12, 15], [5, 12, 13], [15, 20, 25], [8, 15, 17]]);
    const h = (b * c) / a;
    return {
      e: `Os catetos de um triângulo retângulo medem ${b} cm e ${c} cm. Quanto mede a altura relativa à hipotenusa?`,
      r: h,
      d: [(b + c) / 2, a / 2, Math.sqrt(b * c), h + 1],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('a · h = b · c', `A área pode ser calculada com os catetos (b·c/2) ou com a hipotenusa e a altura (a·h/2). A hipotenusa mede ${a}.`, `h = ${b} · ${c} / ${a} = ${N(h)} cm.`),
    };
  },
  // 6. projeção do cateto
  (r) => {
    const [b, c, a] = r.pick([[6, 8, 10], [9, 12, 15], [15, 20, 25], [12, 16, 20]]);
    const n = (b * b) / a;
    return {
      e: `Num triângulo retângulo, a hipotenusa mede ${a} cm e um cateto mede ${b} cm. Qual é a projeção desse cateto sobre a hipotenusa?`,
      r: n,
      d: [a - n, (c * c) / a === n ? n + 1 : (c * c) / a, b / 2, Math.sqrt(a * b)],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('cateto² = hipotenusa × projeção', `b² = a · n ⇒ n = b²/a.`, `n = ${b * b}/${a} = ${N(n)} cm.`),
    };
  },
  // 7. sombra de pessoa perto de poste
  (r) => {
    const [H, h] = r.pick([[6, 1.8], [4.5, 1.5], [5, 2], [3.6, 1.2]]);
    const d = r.pick([4, 6, 7, 8]);
    const s = (h * d) / (H - h);
    return {
      e: `Uma lâmpada está no alto de um poste de ${N(H)} m. Uma pessoa de ${N(h)} m está a ${d} m do pé do poste. Qual é o comprimento da sombra da pessoa?`,
      r: s,
      d: [(h * d) / H, (H * d) / h - d, d / 2, s + 1],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('semelhança com a fonte de luz', `O triângulo da pessoa (altura ${N(h)}, base s) é semelhante ao do poste (altura ${N(H)}, base ${d} + s).`, `${N(h)}/s = ${N(H)}/(${d} + s) ⇒ ${N(H - h)}s = ${N(h * d)} ⇒ s = ${N(s)} m.`),
    };
  },
  // 8. cruzamento de cabos entre postes
  (r) => {
    const [a, b] = r.pick([[6, 3], [4, 12], [10, 15], [12, 6], [6, 12]]);
    const h = (a * b) / (a + b);
    return {
      e: `Dois postes verticais têm ${a} m e ${b} m de altura. Um cabo liga o topo de cada poste ao pé do outro. A que altura do chão os dois cabos se cruzam?`,
      r: h,
      d: [(a + b) / 2, Math.sqrt(a * b), Math.abs(a - b) || a / 2, h + 1],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('duas semelhanças somadas', 'Chamando de h a altura do cruzamento, cada cabo forma triângulos semelhantes que dão h/a + h/b = 1 (não depende da distância entre os postes).', `h = ${a} · ${b}/(${a} + ${b}) = ${N(h)} m.`),
    };
  },
  // 9. área em mapa
  (r) => {
    const e = r.pick([1000, 500, 2000]), a = r.int(4, 20);
    const real = (a * e * e) / 10000; // cm² → m²
    return {
      e: `Num mapa na escala 1 : ${N(e)}, um terreno ocupa ${a} cm². Qual é a área real do terreno?`,
      r: real,
      d: [(a * e) / 100, real / 10, real * 10, (a * e) / 10000],
      f: (v) => `${N(v)} m²`,
      x: expl('área escala com o quadrado', `Cada cm do mapa vale ${N(e)} cm reais, então cada cm² vale ${N(e)}² cm².`, `${a} × ${N(e * e)} cm² = ${N(a * e * e)} cm² = ${N(real)} m².`),
    };
  },
  // 10. segmento pelo cruzamento das diagonais do trapézio
  (r) => {
    const [a, b] = r.pick([[6, 12], [4, 12], [10, 15], [8, 24], [3, 6]]);
    const s = (2 * a * b) / (a + b);
    return {
      e: `Um trapézio tem bases de ${a} cm e ${b} cm. Pelo ponto de encontro das diagonais, traça-se um segmento paralelo às bases, de um lado ao outro. Quanto mede esse segmento?`,
      r: s,
      d: [(a + b) / 2, Math.sqrt(a * b), b - a, s + 1],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('semelhança dupla (média harmônica)', 'Os triângulos formados pelas diagonais são semelhantes; cada metade do segmento vale ab/(a + b).', `Segmento = 2 · ${a} · ${b}/(${a} + ${b}) = ${N(s)} cm.`),
    };
  },
  // 11. miniatura e volume
  (r) => {
    const e = r.pick([10, 20, 5]), v = r.pick([50, 80, 100, 200]);
    const mini = (v * 1000) / e ** 3; // L → mL
    return {
      e: `Um reservatório real tem ${v} litros de capacidade. Uma miniatura semelhante foi feita na escala 1 : ${e}. Qual é a capacidade da miniatura?`,
      r: mini,
      d: [(v * 1000) / e, (v * 1000) / (e * e), mini * 10, mini / 10],
      f: (x) => `${N(Math.round(x * 100) / 100)} mL`,
      x: expl('volume escala com o cubo', `Dividindo cada medida por ${e}, o volume é dividido por ${e}³ = ${N(e ** 3)}.`, `${v} L = ${N(v * 1000)} mL; ${N(v * 1000)} ÷ ${N(e ** 3)} = ${N(mini)} mL.`),
    };
  },
  // 12. altura com bastão
  (r) => {
    const b = r.pick([1.5, 2, 2.5]), d1 = r.pick([2, 3, 4]), d2 = r.pick([30, 36, 45, 48]);
    const H = (b * d2) / d1;
    return {
      e: `Deitada no chão, uma pessoa vê o topo de um bastão vertical de ${N(b)} m, a ${d1} m dela, alinhado com o topo de uma torre a ${d2} m dela. Qual é a altura da torre?`,
      r: H,
      d: [(b * d1) / d2, H / 2, d2 / d1, H + b],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('triângulos com o mesmo vértice no olho', 'O bastão e a torre formam com o chão dois triângulos semelhantes, com vértice comum no olho.', `${N(b)}/${d1} = H/${d2} ⇒ H = ${N(H)} m.`),
    };
  },
  // 13. divisão proporcional por paralelas
  (r) => {
    const [p, q] = r.pick([[2, 3], [3, 5], [1, 4], [2, 5], [3, 4]]);
    const t = (p + q) * r.int(2, 6);
    return {
      e: `Num feixe de retas paralelas, uma transversal é dividida em segmentos de ${p} cm e ${q} cm. Em outra transversal, o segmento total entre as mesmas paralelas mede ${t} cm. Quanto mede a maior das duas partes nessa transversal?`,
      r: (q * t) / (p + q),
      d: [(p * t) / (p + q), t / 2, t - q, (q * t) / p],
      f: cm,
      x: expl('Tales com a soma', `As partes estão na razão ${p} : ${q}, então o total ${t} é dividido em ${p + q} partes iguais.`, `Cada parte vale ${t / (p + q)}; a maior é ${q} × ${t / (p + q)} = ${N((q * t) / (p + q))} cm.`),
    };
  },
  // 14. hipotenusa e altura com catetos
  (r) => {
    const [b, c, a] = r.pick([[15, 20, 25], [9, 12, 15], [12, 16, 20], [18, 24, 30]]);
    return {
      e: `Os catetos de um triângulo retângulo medem ${b} m e ${c} m. A altura relativa à hipotenusa divide-a em dois segmentos. Quanto mede o maior deles?`,
      r: (c * c) / a,
      d: [(b * b) / a, a / 2, (b * c) / a, c - b],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('projeções dos catetos', `Hipotenusa = ${a}. O maior segmento é a projeção do maior cateto: c²/a.`, `${c * c}/${a} = ${N((c * c) / a)} m.`),
    };
  },
  // 15. perímetros e áreas
  (r) => {
    const [p1, p2] = r.pick([[30, 45], [20, 30], [24, 36], [16, 40]]);
    const a1 = r.pick([20, 40, 60, 80]);
    const a2 = a1 * (p2 / p1) ** 2;
    return {
      e: `Dois triângulos semelhantes têm perímetros de ${p1} cm e ${p2} cm. A área do menor é ${a1} cm². Qual é a área do maior?`,
      r: a2,
      d: [(a1 * p2) / p1, a1 + p2 - p1, a2 / 2, a1 * (p2 / p1) ** 3],
      f: (v) => `${N(Math.round(v * 100) / 100)} cm²`,
      x: expl('razão das áreas = (razão dos perímetros)²', `k = ${p2}/${p1} = ${N(p2 / p1)}; as áreas ficam multiplicadas por k² = ${N((p2 / p1) ** 2)}.`, `${a1} × ${N((p2 / p1) ** 2)} = ${N(a2)} cm².`),
    };
  },
  // 16. câmara escura
  (r) => {
    const o = r.pick([1.6, 1.8, 2, 3]), d = r.pick([4, 5, 6, 8]), c = r.pick([20, 24, 30]);
    const i = (o * 100 * c) / (d * 100);
    return {
      e: `Numa câmara escura de orifício, um objeto de ${N(o)} m de altura está a ${d} m do orifício, e a caixa tem ${c} cm de profundidade. Qual é a altura da imagem formada no fundo da caixa?`,
      r: i,
      d: [(o * 100 * d * 100) / c / 100, i * 10, i / 10, (c * d) / o],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('semelhança de triângulos opostos pelo vértice', 'Os raios passam pelo orifício e formam dois triângulos semelhantes: objeto/distância = imagem/profundidade.', `${N(o * 100)} cm / ${d * 100} cm = i / ${c} cm ⇒ i = ${N(i)} cm.`),
    };
  },
  // 17. retângulo áureo? não: escala de planta para lado
  (r) => {
    const e = r.pick([50, 100, 200]), l = r.int(3, 12);
    return {
      e: `Numa planta na escala 1 : ${e}, uma sala quadrada aparece com ${l} cm de lado. Qual é a área real da sala?`,
      r: ((l * e) / 100) ** 2,
      d: [(l * e) / 100, (l * l * e) / 100, ((l * e) / 100) ** 2 * 2, (l * l * e * e) / 1000],
      f: (v) => `${N(v)} m²`,
      x: expl('converter o lado antes de elevar', `O lado real é ${l} × ${e} = ${l * e} cm = ${N((l * e) / 100)} m.`, `Área = ${N((l * e) / 100)}² = ${N(((l * e) / 100) ** 2)} m².`),
    };
  },
];

const dificil = [
  // 1. quadrado no canto do triângulo retângulo
  (r) => {
    const [a, b] = r.pick([[6, 3], [12, 4], [10, 15], [6, 12], [20, 5]]);
    const s = (a * b) / (a + b);
    return {
      e: `Um triângulo retângulo tem catetos de ${a} cm e ${b} cm. Um quadrado é desenhado com um vértice no ângulo reto, dois lados sobre os catetos e o vértice oposto sobre a hipotenusa. Quanto mede o lado do quadrado?`,
      r: s,
      d: [(a + b) / 4, Math.sqrt((a * b) / 2), Math.min(a, b) / 2, s + 1],
      f: (v) => cm(Math.round(v * 100) / 100),
      x: expl('semelhança com o triângulo que sobra', `O triângulo acima do quadrado é semelhante ao original: (${a} − s)/s = ${a}/${b}.`, `s = ${a} · ${b}/(${a} + ${b}) = ${N(s)} cm.`),
    };
  },
  // 2. áreas no trapézio cortado pelas diagonais
  (r) => {
    const [a, b] = r.pick([[2, 3], [1, 2], [3, 4], [2, 5]]);
    const t1 = a * a * r.pick([3, 4, 5]);
    const t2 = (t1 * b * b) / (a * a), lat = Math.sqrt(t1 * t2);
    const tot = t1 + t2 + 2 * lat;
    return {
      e: `As diagonais de um trapézio dividem-no em quatro triângulos. O triângulo junto à base menor tem área ${t1} cm², e as bases estão na razão ${a} : ${b}. Qual é a área do trapézio?`,
      r: tot,
      d: [t1 + t2, t1 * (b / a) * 4, tot - lat, t1 + t2 + lat],
      f: (v) => `${N(v)} cm²`,
      x: expl('triângulos semelhantes e mesma altura', `O triângulo junto à base maior é semelhante ao da menor, com razão ${b}/${a}: área ${t1} × (${b}/${a})² = ${t2}. Os dois laterais têm área igual a √(${t1} · ${t2}) = ${lat} cada.`, `Total: ${t1} + ${t2} + 2 · ${lat} = ${tot} cm².`),
    };
  },
  // 3. paralela que divide a área ao meio
  (r) => {
    const h = r.pick([8, 10, 12, 6]);
    return {
      e: `Um triângulo tem altura de ${h} cm. Uma reta paralela à base divide o triângulo em duas regiões de mesma área. A que distância do vértice oposto à base passa essa reta?`,
      r: `${h % 2 === 0 ? N(h / 2) : `${h}/2`}√2 cm`,
      d: [`${N(h / 2)} cm`, `${N(h / 4)}√2 cm`, `${N((h * 3) / 4)} cm`, `${N(h / 2)}√3 cm`],
      x: expl('área escala com k²', `O triângulo de cima é semelhante ao inteiro e deve ter metade da área: k² = 1/2 ⇒ k = 1/√2 = √2/2.`, `Distância = ${h} · √2/2 = ${N(h / 2)}√2 cm.`),
    };
  },
  // 4. pirâmide cortada
  (r) => {
    const v = r.pick([240, 480, 720, 960]), f = r.pick([2, 3]);
    const top = v / f ** 3;
    return {
      e: `Uma pirâmide de volume ${v} cm³ é cortada por um plano paralelo à base, ${f === 2 ? 'na metade' : 'a um terço'} da altura, medida a partir do vértice. Qual é o volume da pirâmide pequena que fica no topo?`,
      r: top,
      d: [v / f, v / (f * f), v - top, top * 2],
      f: (x) => `${N(x)} cm³`,
      x: expl('volume escala com k³', `A pirâmide de cima é semelhante à inteira, com razão k = 1/${f}.`, `Volume = ${v} × (1/${f})³ = ${v}/${f ** 3} = ${N(top)} cm³.`),
    };
  },
  // 5. velocidade da ponta da sombra
  (r) => {
    const [H, h] = r.pick([[4.5, 1.5], [6, 2], [5, 1.5], [3.6, 1.2]]);
    const v = r.pick([1, 1.2, 1.5]);
    const vs = (v * H) / (H - h);
    return {
      e: `Uma criança de ${N(h)} m caminha a ${N(v)} m/s, afastando-se de um poste com uma lâmpada a ${N(H)} m de altura. Com que velocidade a ponta da sua sombra se move no chão?`,
      r: vs,
      d: [v, (v * h) / H, (v * H) / h, vs - v],
      f: (x) => `${N(Math.round(x * 100) / 100)} m/s`,
      x: expl('semelhança vale a cada instante', `Se a criança está a x m do poste, a ponta da sombra fica a p = x · ${N(H)}/(${N(H)} − ${N(h)}) m. A posição da ponta é proporcional à da criança.`, `v = ${N(v)} × ${N(H)}/${N(H - h)} = ${N(vs)} m/s.`),
    };
  },
  // 6. triângulo dos pontos médios
  (r) => {
    const a = 4 * r.int(5, 20);
    return {
      e: `Os pontos médios dos lados de um triângulo de área ${a} cm² são ligados, formando um triângulo menor. Qual é a área do triângulo menor?`,
      r: a / 4,
      d: [a / 2, a / 3, a / 8, (3 * a) / 4],
      f: (v) => `${N(v)} cm²`,
      x: expl('base média', 'Cada lado do triângulo menor é metade de um lado do original: são semelhantes com razão 1/2.', `Área = ${a} × (1/2)² = ${a / 4} cm². (O triângulo grande fica dividido em 4 triângulos iguais.)`),
    };
  },
  // 7. retângulo máximo num triângulo
  (r) => {
    const b = 2 * r.int(4, 10), h = 2 * r.int(3, 8);
    return {
      e: `Um retângulo tem a base sobre a base de um triângulo (base ${b} cm, altura ${h} cm) e os outros dois vértices sobre os demais lados. Qual é a maior área possível do retângulo?`,
      r: (b * h) / 4,
      d: [(b * h) / 2, (b * h) / 3, (b * h) / 8, b + h],
      f: (v) => `${N(v)} cm²`,
      x: expl('semelhança + vértice da parábola', `Se o retângulo tem altura y, a largura é ${b}(1 − y/${h}) (semelhança). A área ${b}y(1 − y/${h}) é máxima em y = ${h / 2}.`, `Largura ${b / 2}, altura ${h / 2}: área ${(b * h) / 4} cm², metade da área do triângulo.`),
    };
  },
  // 8. área na planta
  (r) => {
    const e = r.pick([100, 200, 50]), a = r.pick([96, 120, 60, 48, 150]);
    const planta = (a * 10000) / (e * e); // cm²
    return {
      e: `Um apartamento tem ${a} m² de área. Numa planta na escala 1 : ${e}, qual é a área que ele ocupa?`,
      r: planta,
      d: [(a * 10000) / e, planta * 10, planta / 10, (a * 100) / e],
      f: (v) => `${N(Math.round(v * 100) / 100)} cm²`,
      x: expl('área divide por e²', `Na escala 1 : ${e}, as áreas ficam divididas por ${e}² = ${N(e * e)}.`, `${a} m² = ${N(a * 10000)} cm²; ÷ ${N(e * e)} = ${N(planta)} cm².`),
    };
  },
  // 9. relações métricas completas
  (r) => {
    const [h, m1, n1] = r.pick([[12, 9, 16], [6, 4, 9], [24, 18, 32], [4, 2, 8]]);
    const a = m1 + n1;
    const pede = r.pick(['hipotenusa', 'maior cateto']);
    const v = pede === 'hipotenusa' ? a : Math.sqrt(a * n1);
    return {
      e: `Num triângulo retângulo, a altura relativa à hipotenusa mede ${h} cm e um dos segmentos que ela determina na hipotenusa mede ${m1} cm. Quanto mede ${pede === 'hipotenusa' ? 'a hipotenusa' : 'o maior cateto'}?`,
      r: v,
      d: pede === 'hipotenusa' ? [n1, m1 + h, Math.sqrt(m1 * m1 + h * h), a + 1] : [Math.sqrt(a * m1), a, n1, Math.sqrt(a * n1) + 2],
      f: (x) => cm(Math.round(x * 100) / 100),
      x: expl('h² = m · n', `${h}² = ${m1} · n ⇒ n = ${n1}; a hipotenusa é ${m1} + ${n1} = ${a}.`, pede === 'hipotenusa' ? `Hipotenusa = ${a} cm.` : `Maior cateto: √(${a} · ${n1}) = ${N(v)} cm.`),
    };
  },
  // 10. largura de um rio
  (r) => {
    const [ab, bc, cd] = r.pick([[30, 10, 6], [40, 8, 5], [24, 12, 9], [36, 9, 6]]);
    // triângulos semelhantes: largura / ab = cd / bc
    const larg = (ab * cd) / bc;
    return {
      e: `Para medir a largura de um rio sem atravessá-lo, um topógrafo marca na margem os pontos A e C, alinhados com uma árvore na outra margem, e monta dois triângulos semelhantes. Ele obtém: o lado menor mede ${bc} m e corresponde à base de ${ab} m do maior; o lado de ${cd} m do menor corresponde à largura do rio. Qual é a largura do rio?`,
      r: larg,
      d: [(bc * cd) / ab, ab - bc + cd, (ab * bc) / cd, larg + 2],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('semelhança para medir o inacessível', 'Os lados correspondentes dos dois triângulos estão na mesma razão.', `largura/${cd} = ${ab}/${bc} ⇒ largura = ${N(larg)} m.`),
    };
  },
  // 11. projetor
  (r) => {
    const [w, h] = r.pick([[3.6, 2.4], [3.6, 2.7], [4, 3]]);
    const dl = r.pick([6, 8, 10]), dt = r.pick([300, 400, 500]);
    const k = dt / dl;
    const area = ((w * k) / 100) * ((h * k) / 100);
    return {
      e: `Um slide de ${N(w)} cm × ${N(h)} cm, a ${dl} cm da lente, é projetado numa tela a ${dt / 100} m da lente. Qual é a área da imagem na tela?`,
      r: area,
      d: [(w * h * k) / 10000, area * 2, area / 2, ((w + h) * k) / 100],
      f: (v) => `${N(Math.round(v * 100) / 100)} m²`,
      x: expl('ampliação linear k, área k²', `As medidas são ampliadas por k = ${dt}/${dl} = ${N(k)}.`, `${N((w * k) / 100)} m × ${N((h * k) / 100)} m = ${N(area)} m².`),
    };
  },
  // 12. qual par é semelhante
  (r) => ({
    e: 'Qual destes pares de triângulos é sempre semelhante?',
    r: 'dois triângulos equiláteros quaisquer',
    d: ['dois triângulos isósceles quaisquer', 'dois triângulos retângulos quaisquer', 'dois triângulos de mesma área', 'dois triângulos de mesmo perímetro'],
    x: expl('ângulos iguais', 'Triângulos equiláteros têm sempre os três ângulos de 60°, então são semelhantes (caso AA).', `Isósceles e retângulos podem ter ângulos diferentes (um retângulo pode ter 30° e 60°, outro ${r.pick([20, 40])}° e ${r.pick([70, 50])}°... desde que somem 90°), e área ou perímetro iguais não garantem a mesma forma.`.replace(/\(um retângulo.*?90°\)/, '(um retângulo pode ter ângulos de 30° e 60°, e outro de 45° e 45°)')),
  }),
  // 13. Tales com expressões
  (r) => {
    const x = r.int(2, 8);
    const [a, b, c] = [r.int(2, 4), r.int(1, 5), r.int(2, 3)];
    // segmentos: (x + b) e (a·x) numa transversal; c e ? na outra com razão fixa
    const s1 = x + b, s2 = a * x, k = c;
    return {
      e: `Num feixe de paralelas, uma transversal tem segmentos consecutivos de medidas x + ${b} e ${a}x, e a outra tem os segmentos correspondentes de ${N(s1 * k)} e ${N(s2 * k)}. Qual é o valor de x?`,
      r: x,
      d: [x + 1, x * k, s1, x - 1],
      x: expl('Tales com álgebra', `(x + ${b})/(${a}x) = ${N(s1 * k)}/${N(s2 * k)}. Multiplique em cruz e resolva.`, `${N(s2 * k)}(x + ${b}) = ${N(s1 * k)} · ${a}x ⇒ x = ${x}.`),
    };
  },
  // 14. bissetriz com perímetro
  (r) => {
    const [ab, ac, bc] = r.pick([[6, 9, 10], [8, 12, 15], [10, 15, 20], [4, 6, 5]]);
    const dc = (bc * ac) / (ab + ac);
    return {
      e: `Num triângulo ABC, AB = ${ab}, AC = ${ac} e BC = ${bc}. A bissetriz interna de  encontra BC em D. Quanto mede DC?`,
      r: dc,
      d: [(bc * ab) / (ab + ac), bc / 2, ac - ab, dc + 1],
      f: (v) => N(Math.round(v * 100) / 100),
      x: expl('teorema da bissetriz interna', 'BD/DC = AB/AC: o lado maior fica com a parte maior.', `DC = ${bc} · ${ac}/(${ab} + ${ac}) = ${N(dc)}.`),
    };
  },
  // 15. lados com razão dada pela área
  (r) => {
    const a1 = r.pick([12, 18, 27, 48]), k = r.pick([2, 3]);
    const p1 = r.pick([12, 15, 18, 24]);
    return {
      e: `Um triângulo tem área ${a1} cm² e perímetro ${p1} cm. Um triângulo semelhante a ele tem área ${a1 * k * k} cm². Qual é o perímetro do segundo?`,
      r: p1 * k,
      d: [p1 * k * k, p1 + k, (p1 * k) / 2, p1 * (k + 1)],
      f: cm,
      x: expl('da área para os lados', `A razão das áreas é ${k * k}, então a razão dos lados (e dos perímetros) é √${k * k} = ${k}.`, `${p1} × ${k} = ${p1 * k} cm.`),
    };
  },
  // 16. espelho no chão
  (r) => {
    const o = r.pick([1.5, 1.6, 1.8]), d1 = r.pick([2, 2.5, 3]), d2 = r.pick([20, 25, 30, 40]);
    const H = (o * d2) / d1;
    return {
      e: `Uma pessoa, com os olhos a ${N(o)} m do chão, vê o topo de uma árvore refletido num pequeno espelho no chão. O espelho está a ${N(d1)} m da pessoa e a ${d2} m da árvore. Qual é a altura da árvore?`,
      r: H,
      d: [(o * d1) / d2, (d2 * d1) / o, H / 2, H + o],
      f: (v) => m(Math.round(v * 100) / 100),
      x: expl('reflexão forma triângulos semelhantes', 'O ângulo de incidência é igual ao de reflexão, então os triângulos pessoa-espelho e árvore-espelho são semelhantes.', `${N(o)}/${N(d1)} = H/${d2} ⇒ H = ${N(H)} m.`),
    };
  },
];

export default [
  {
    disciplina: 'matematica',
    arquivo: '24-semelhanca-de-triangulos',
    titulo: 'Semelhança de triângulos e teorema de Tales',
    provas: ['ENEM', 'Militares'],
    descricao: 'Casos de semelhança, razão de semelhança, teorema de Tales, bissetriz, relações métricas no triângulo retângulo e escalas.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
