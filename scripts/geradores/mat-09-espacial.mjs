// Matemática — Geometria espacial.
import { expl, num } from './util.mjs';
import NOVOS from './mat-novos-extras.mjs';
import { novos } from './util.mjs';

const L = (v) => `${num(v)} litros`;
const cm = (v) => `${num(v)} cm`;
const cm2 = (v) => `${num(v)} cm²`;
const cm3 = (v) => `${num(v)} cm³`;
const m3 = (v) => `${num(v)} m³`;

const facil = [
  // 1. caixa-d'água em litros
  (r) => {
    const a = r.pick([1, 1.5, 2, 2.5, 3]), b = r.pick([1, 1.2, 2]), c = r.pick([0.5, 1, 1.5, 2]);
    const v = a * b * c;
    return {
      e: `Uma caixa-d'água tem a forma de um paralelepípedo com dimensões internas ${num(a)} m × ${num(b)} m × ${num(c)} m. Qual é a sua capacidade em litros?`,
      r: v * 1000,
      d: [v * 100, v * 10000, (a + b + c) * 1000, v],
      f: L,
      x: expl('volume + conversão', 'Volume do paralelepípedo = comprimento × largura × altura. Depois lembre: 1 m³ = 1.000 litros.', `${num(a)} × ${num(b)} × ${num(c)} = ${num(v)} m³ = ${num(v * 1000)} L.`),
    };
  },
  // 2. cubo
  (r) => {
    const a = r.int(2, 12);
    return {
      e: `Um dado gigante de brinquedo é um cubo com ${a} cm de aresta. Qual é o seu volume?`,
      r: a ** 3,
      d: [a * a, 6 * a * a, 3 * a, 12 * a],
      f: cm3,
      x: expl('volume do cubo', 'Todas as arestas são iguais: V = a × a × a = a³.', `${a}³ = ${a ** 3} cm³.`),
    };
  },
  // 3. cilindro em litros
  (r) => {
    const raio = r.pick([10, 20, 30, 50]), h = r.pick([20, 40, 50, 100]);
    const v = (3 * raio * raio * h) / 1000;
    return {
      e: `Um reservatório cilíndrico tem raio da base de ${raio} cm e altura de ${h} cm. Qual é a sua capacidade? (Use π = 3 e 1 L = 1.000 cm³.)`,
      r: v,
      d: [v * 2, (3 * 2 * raio * h) / 1000, v / 3, v * 10],
      f: L,
      x: expl('volume do cilindro', 'Área da base (círculo, πr²) vezes a altura.', `3 × ${raio}² × ${h} = ${num(3 * raio * raio * h)} cm³ = ${num(v)} L.`),
    };
  },
  // 4. relação de Euler
  (r) => {
    const [V, A, F, nomeP] = r.pick([[8, 12, 6, 'cubo'], [6, 9, 5, 'prisma triangular'], [5, 8, 5, 'pirâmide de base quadrada'], [12, 18, 8, 'prisma hexagonal'], [4, 6, 4, 'tetraedro'], [6, 12, 8, 'octaedro'], [7, 12, 7, 'pirâmide hexagonal']]);
    const pede = r.pick(['V', 'A', 'F']);
    const resposta = pede === 'V' ? V : pede === 'A' ? A : F;
    const txt = { V: 'vértices', A: 'arestas', F: 'faces' };
    const dados = { V: `${V} vértices`, A: `${A} arestas`, F: `${F} faces` };
    const outros = ['V', 'A', 'F'].filter((k) => k !== pede).map((k) => dados[k]);
    return {
      e: `Um poliedro convexo (${nomeP}) tem ${outros[0]} e ${outros[1]}. Pela relação de Euler, quant${pede === 'V' ? 'os' : 'as'} ${txt[pede]} ele tem?`,
      r: resposta,
      d: [resposta + 2, resposta - 2, resposta + 1, resposta * 2],
      x: expl('relação de Euler', 'Em todo poliedro convexo: V − A + F = 2.', `Substituindo os valores dados: ${txt[pede]} = ${resposta}.`),
    };
  },
  // 5. cubinhos na caixa
  (r) => {
    const a = r.int(4, 12), b = r.int(3, 9), c = r.int(2, 8);
    return {
      e: `Quantos cubinhos de 1 cm de aresta cabem, exatamente, em uma caixa de dimensões internas ${a} cm × ${b} cm × ${c} cm?`,
      r: a * b * c,
      d: [a + b + c, 2 * (a * b + a * c + b * c), a * b, 4 * (a + b + c)],
      x: expl('volume como contagem', 'Volume em cm³ é exatamente o número de cubinhos de 1 cm³ que cabem.', `${a} × ${b} × ${c} = ${a * b * c}.`),
    };
  },
  // 6. área do cubo (pintura)
  (r) => {
    const a = r.int(2, 9);
    return {
      e: `Um artesão vai pintar todas as faces de um cubo de madeira com ${a} dm de aresta. Qual é a área total a ser pintada?`,
      r: 6 * a * a,
      d: [a ** 3, 4 * a * a, 12 * a, a * a],
      f: (v) => `${num(v)} dm²`,
      x: expl('área total do cubo', 'O cubo tem 6 faces quadradas iguais.', `6 × ${a}² = ${6 * a * a} dm².`),
    };
  },
  // 7. faces de prisma
  (r) => {
    const [n, nome] = r.pick([[3, 'triangular'], [4, 'quadrangular'], [5, 'pentagonal'], [6, 'hexagonal'], [8, 'octogonal']]);
    const pede = r.pick(['faces', 'arestas', 'vértices']);
    const val = { faces: n + 2, arestas: 3 * n, 'vértices': 2 * n }[pede];
    return {
      e: `Quant${pede === 'vértices' ? 'os' : 'as'} ${pede} tem um prisma de base ${nome}?`,
      r: val,
      d: [n + 2, 3 * n, 2 * n, n, n + 1, 4 * n].filter((v) => v !== val),
      x: expl('contagem no prisma', `Um prisma de base com n lados tem 2 bases + n faces laterais, 2n vértices e 3n arestas.`, `n = ${n}: ${n + 2} faces, ${2 * n} vértices, ${3 * n} arestas.`),
    };
  },
  // 8. calha (prisma triangular)
  (r) => {
    const b = r.pick([20, 30, 40]), h = r.pick([10, 15, 20]), c = r.pick([2, 3, 4, 5]);
    const v = ((b * h) / 2) * (c * 100);
    return {
      e: `Uma calha tem a forma de um prisma cuja seção é um triângulo de base ${b} cm e altura ${h} cm; o comprimento da calha é ${c} m. Quantos litros cabem nela? (1 L = 1.000 cm³)`,
      r: v / 1000,
      d: [(b * h * c * 100) / 1000, ((b * h) / 2) * c / 1000, (b + h) * c / 10, v / 100],
      f: L,
      x: expl('volume do prisma', 'Área da base (o triângulo) vezes o comprimento. Converta metros para cm antes.', `(${b} × ${h} ÷ 2) × ${c * 100} = ${num(v)} cm³ = ${num(v / 1000)} L.`),
    };
  },
  // 9. altura da embalagem
  (r) => {
    const [a, b] = r.pick([[10, 5], [8, 6.25], [10, 10], [12.5, 8]]);
    const vol = r.pick([1, 2]) * 1000;
    return {
      e: `Uma embalagem em forma de paralelepípedo tem base de ${num(a)} cm × ${num(b)} cm e capacidade de ${vol / 1000} litro${vol > 1000 ? 's' : ''}. Qual é a sua altura?`,
      r: vol / (a * b),
      d: [vol / (a + b), vol / (a * b) / 10, (vol / 1000) * (a * b), vol / (2 * a * b)],
      f: cm,
      x: expl('volume ao contrário', 'Altura = volume ÷ área da base. Lembre: 1 L = 1.000 cm³.', `${vol} ÷ (${num(a)} × ${num(b)}) = ${num(vol / (a * b))} cm.`),
    };
  },
  // 10. aquário parcialmente cheio
  (r) => {
    const a = r.pick([40, 50, 60]), b = r.pick([25, 30]), h = r.pick([30, 40]), [p, q] = r.pick([[3, 4], [2, 3], [1, 2], [4, 5]]);
    const v = (a * b * h * p) / q / 1000;
    return {
      e: `Um aquário de ${a} cm × ${b} cm × ${h} cm (altura) está com água até ${p}/${q} da altura. Quantos litros de água ele contém?`,
      r: v,
      d: [(a * b * h) / 1000, v / 10, (a * b * h * (q - p)) / q / 1000, v * 2],
      f: L,
      x: expl('volume + fração', `A água forma um paralelepípedo com altura ${p}/${q} de ${h} cm.`, `${a} × ${b} × ${num((h * p) / q)} = ${num(v * 1000)} cm³ = ${num(v)} L.`),
    };
  },
  // 11. rótulo da lata
  (r) => {
    const raio = r.pick([3, 4, 5]), h = r.pick([8, 10, 12, 15]);
    return {
      e: `Uma lata cilíndrica tem raio da base de ${raio} cm e altura de ${h} cm. O rótulo cobre toda a superfície lateral. Qual é a área do rótulo? (Use π = 3.)`,
      r: 2 * 3 * raio * h,
      d: [3 * raio * raio * h, 3 * raio * h, 2 * 3 * raio * h + 2 * 3 * raio * raio, 3 * raio * raio],
      f: cm2,
      x: expl('planificação do cilindro', 'Aberto, o rótulo vira um retângulo: comprimento = contorno da lata (2πr) e altura = h.', `2 × 3 × ${raio} × ${h} = ${2 * 3 * raio * h} cm².`),
    };
  },
];
facil[0].vezes = 2;
facil[3].vezes = 2;
facil[4].vezes = 2;
facil[6].vezes = 2;

const medio = [
  // 1. cone
  (r) => {
    const raio = r.int(2, 10), h = r.int(3, 15);
    return {
      e: `Uma casquinha de sorvete tem a forma de um cone com raio da base ${raio} cm e altura ${h} cm. Qual é o seu volume? (Use π = 3.)`,
      r: raio * raio * h,
      d: [3 * raio * raio * h, (raio * raio * h) / 3, 3 * raio * h, raio * h],
      f: cm3,
      x: expl('volume do cone', 'O cone tem 1/3 do volume do cilindro de mesma base e altura.', `3 × ${raio * raio} × ${h} ÷ 3 = ${raio * raio * h} cm³.`),
    };
  },
  // 2. esfera
  (r) => {
    const raio = r.int(1, 10);
    return {
      e: `Qual é o volume de uma bola maciça de raio ${raio} cm? (Use π = 3.)`,
      r: 4 * raio ** 3,
      d: [3 * raio ** 3, 12 * raio * raio, 4 * raio * raio, (4 * raio ** 3) / 3],
      f: cm3,
      x: expl('volume da esfera', 'V = (4/3)πr³.', `(4/3) × 3 × ${raio ** 3} = ${4 * raio ** 3} cm³.`),
    };
  },
  // 3. piscina e vazão
  (r) => {
    const a = r.pick([5, 6, 8, 10]), b = r.pick([3, 4, 5]), h = r.pick([1, 1.2, 1.5, 2]);
    const v = a * b * h * 1000, q = r.pick([20, 25, 40, 50]);
    const t = v / q;
    const f = (min) => {
      const hh = Math.floor(min / 60), mm = Math.round(min % 60);
      return hh ? `${hh} h${mm ? ` ${mm} min` : ''}` : `${mm} min`;
    };
    return {
      e: `Uma piscina retangular de ${a} m × ${b} m e ${num(h)} m de profundidade será enchida por uma mangueira com vazão de ${q} litros por minuto. Quanto tempo levará para enchê-la?`,
      r: t,
      d: [t / 2, t * 2, t / 60, t * 1.5],
      f,
      x: expl('volume e vazão', 'Tempo = volume ÷ vazão (com volume em litros).', `${num(a * b * h)} m³ = ${num(v)} L; ${num(v)} ÷ ${q} = ${num(t)} min = ${f(t)}.`),
    };
  },
  // 4. papelão da caixa
  (r) => {
    const a = r.int(5, 30), b = r.int(5, 20), c = r.int(2, 15);
    return {
      e: `Uma caixa de papelão fechada tem dimensões ${a} cm × ${b} cm × ${c} cm. Quantos cm² de papelão são necessários para fabricá-la, desconsiderando as abas?`,
      r: 2 * (a * b + a * c + b * c),
      d: [a * b * c, a * b + a * c + b * c, 4 * (a + b + c), 2 * a * b + a * c],
      f: cm2,
      x: expl('área total (planificação)', 'A caixa tem 3 pares de faces retangulares iguais.', `2 × (${a * b} + ${a * c} + ${b * c}) = ${2 * (a * b + a * c + b * c)} cm².`),
    };
  },
  // 5. diagonal do paralelepípedo
  (r) => {
    const [a, b, c, d] = r.pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [3, 4, 12, 13], [2, 10, 11, 15]]);
    return {
      e: `Qual é o comprimento da maior vareta reta que cabe dentro de uma caixa de dimensões ${a} cm, ${b} cm e ${c} cm?`,
      r: d,
      d: [a + b + c, d + 1, Math.round(Math.sqrt(a * a + b * b)) + c, d - 1],
      f: cm,
      x: expl('diagonal do paralelepípedo', 'A maior vareta vai de um canto ao canto oposto: D = √(a² + b² + c²) (Pitágoras duas vezes).', `√(${a * a} + ${b * b} + ${c * c}) = √${d * d} = ${d} cm.`),
    };
  },
  // 6. da área ao volume do cubo
  (r) => {
    const a = r.int(2, 10);
    return {
      e: `A área total de um cubo é ${6 * a * a} cm². Qual é o seu volume?`,
      r: a ** 3,
      d: [6 * a * a, a * a, (6 * a * a) / 6 * 6, a ** 3 * 2],
      f: cm3,
      x: expl('área → aresta → volume', 'Cada face tem 1/6 da área total; a raiz da área da face dá a aresta.', `Face: ${a * a} cm² ⇒ aresta ${a} cm; volume ${a}³ = ${a ** 3} cm³.`),
    };
  },
  // 7. dobrar medidas
  (r) => {
    const k = r.pick([2, 3]);
    const solido = r.pick(['um cubo', 'uma caixa retangular', 'uma esfera']);
    return {
      e: `Se todas as medidas de ${solido} forem multiplicadas por ${k}, o volume fica multiplicado por:`,
      r: k ** 3,
      d: [k, k * k, 3 * k, 2 * k],
      x: expl('semelhança no espaço', 'Volume tem três dimensões: cada uma multiplicada por k ⇒ volume × k³ (área seria × k²).', `${k}³ = ${k ** 3}.`),
    };
  },
  // 8. dobrar o raio do cilindro
  (r) => {
    const k = r.pick([2, 3]), t = r.pick([2, 3]);
    return {
      e: `Um cilindro tem o raio da base multiplicado por ${k} e a altura dividida por ${t}. O novo volume é quantas vezes o volume original?`,
      r: (k * k) / t,
      d: [k / t, k * k * t, k * t, k * k],
      x: expl('como cada medida afeta o volume', 'V = πr²h: o raio entra ao quadrado; a altura entra uma vez.', `${k}² ÷ ${t} = ${num((k * k) / t)}.`),
    };
  },
  // 9. silo (cilindro + cone)
  (r) => {
    const raio = r.pick([2, 3, 4]), hc = r.pick([6, 8, 10]), hk = r.pick([3, 6]);
    const v = 3 * raio * raio * hc + raio * raio * hk;
    return {
      e: `Um silo é formado por um cilindro de raio ${raio} m e altura ${hc} m, com um telhado em forma de cone de mesmo raio e altura ${hk} m. Qual é o volume total do silo? (Use π = 3.)`,
      r: v,
      d: [3 * raio * raio * (hc + hk), 3 * raio * raio * hc, v + raio * raio * hk * 2, raio * raio * (hc + hk)],
      f: m3,
      x: expl('sólido composto', 'Some o volume de cada parte: cilindro (πr²h) e cone (πr²h/3).', `${3 * raio * raio * hc} + ${raio * raio * hk} = ${v} m³.`),
    };
  },
  // 10. couro da bola
  (r) => {
    const raio = r.pick([10, 11, 12]);
    return {
      e: `Quanto material é necessário para revestir a superfície de uma bola de raio ${raio} cm? (Use π = 3.)`,
      r: 4 * 3 * raio * raio,
      d: [3 * raio * raio, 4 * raio ** 3, 2 * 3 * raio * raio, 4 * 3 * raio],
      f: cm2,
      x: expl('área da esfera', 'A superfície da esfera vale 4πr² (quatro vezes a área do círculo de mesmo raio).', `4 × 3 × ${raio}² = ${12 * raio * raio} cm².`),
    };
  },
  // 11. caixas no contêiner
  (r) => {
    const a = r.pick([20, 25, 40]), C = a * r.int(6, 12), Lg = a * r.int(4, 8), H = a * r.int(3, 6);
    const n = (C / a) * (Lg / a) * (H / a);
    return {
      e: `Caixas cúbicas de ${a} cm de aresta serão empilhadas em um compartimento de ${num(C / 100)} m × ${num(Lg / 100)} m × ${num(H / 100)} m. Quantas caixas cabem, no máximo?`,
      r: n,
      d: [n / 2, (C / a) * (Lg / a), (C + Lg + H) / a, n * 2],
      x: expl('contar por direção', 'Divida cada dimensão pela aresta (na mesma unidade) e multiplique.', `${C / a} × ${Lg / a} × ${H / a} = ${n} caixas.`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[4].vezes = 2;
medio[8].vezes = 2;

const dificil = [
  // 1. nível da água sobe
  (r) => {
    const a = r.pick([40, 50, 60, 80]), b = r.pick([20, 25, 30, 40]), vol = r.pick([2, 3, 4, 6, 8]) * 1000;
    const hcm = vol / (a * b);
    if (!Number.isInteger(hcm * 100)) return dificil[0](r);
    return {
      e: `Um aquário com base retangular de ${a} cm × ${b} cm contém água. Ao mergulhar completamente uma pedra de ${num(vol / 1000)} ${vol > 1000 ? 'litros' : 'litro'} de volume, quanto o nível da água sobe?`,
      r: hcm,
      d: [hcm * 10, hcm / 2, vol / (a + b) / 10, hcm * 2],
      f: cm,
      x: expl('princípio do deslocamento', 'A pedra empurra para cima um volume de água igual ao seu volume, espalhado sobre a base.', `${num(vol)} cm³ ÷ (${a} × ${b}) = ${num(hcm)} cm.`),
    };
  },
  // 2. maquete e volume
  (r) => {
    const k = r.pick([10, 20, 50, 100]), vm = r.pick([2, 3, 5, 8]);
    return {
      e: `Uma maquete de um reservatório foi construída na escala 1 : ${k}. Se a maquete comporta ${vm} litros, quantos litros o reservatório real comporta?`,
      r: vm * k ** 3,
      d: [vm * k, vm * k * k, (vm * k ** 3) / 10, vm * 3 * k],
      f: L,
      x: expl('escala ao cubo', 'Volume tem três dimensões: a escala entra ao cubo.', `${vm} × ${k}³ = ${num(vm * k ** 3)} L.`),
    };
  },
  // 3. copos cônicos no balde
  (r) => {
    const hc = r.pick([10, 12, 15, 20]), hcil = r.pick([20, 30, 40, 60]);
    const n = (3 * hcil) / hc;
    if (!Number.isInteger(n)) return dificil[2](r);
    return {
      e: `Um copo cônico e um balde cilíndrico têm bases de mesmo raio. O cone tem ${hc} cm de altura e o cilindro, ${hcil} cm. Quantos copos cheios são necessários para encher o balde?`,
      r: n,
      d: [hcil / hc, n * 2, n + 3, 3],
      x: expl('razão entre volumes', 'Com a mesma base, o cone de mesma altura teria 1/3 do cilindro.', `(πr² × ${hcil}) ÷ (πr² × ${hc} ÷ 3) = ${n}.`),
    };
  },
  // 4. bombons
  (r) => {
    const R = r.pick([6, 8, 9, 10, 12, 15]), rr = r.pick([1, 2, 3, 5]);
    if (R % rr || R === rr) return dificil[3](r);
    const n = (R / rr) ** 3;
    return {
      e: `Uma esfera de chocolate maciça, de raio ${R} cm, será derretida para fazer bombons esféricos de raio ${rr} cm. Quantos bombons podem ser feitos, sem desperdício?`,
      r: n,
      d: [R / rr, (R / rr) ** 2, n / 2, 4 * (R / rr)],
      x: expl('volume se conserva', 'O chocolate muda de forma, mas o volume é o mesmo. Para esferas, a razão de volumes é (R/r)³.', `(${R}/${rr})³ = ${n}.`),
    };
  },
  // 5. pirâmide
  (r) => {
    const l = r.pick([3, 6, 9, 12]), h = r.pick([4, 5, 8, 10]);
    return {
      e: `Uma pirâmide de base quadrada tem aresta da base ${l} m e altura ${h} m. Qual é o seu volume?`,
      r: (l * l * h) / 3,
      d: [l * l * h, (l * l * h) / 2, (4 * l * h) / 3, (l * h) / 3],
      f: m3,
      x: expl('volume da pirâmide', 'Toda pirâmide tem 1/3 do volume do prisma de mesma base e altura.', `${l * l} × ${h} ÷ 3 = ${num((l * l * h) / 3)} m³.`),
    };
  },
  // 6. prisma hexagonal
  (r) => {
    const a = r.pick([2, 4, 6]), h = r.pick([5, 10, 20]);
    const base = (6 * a * a * 1.7) / 4;
    return {
      e: `Um lápis tem a forma de um prisma hexagonal regular com aresta da base ${a} mm e comprimento ${h * 10} mm. Qual é o seu volume? (Use √3 = 1,7.)`,
      r: base * h * 10,
      d: [6 * a * h * 10, ((a * a * 1.7) / 4) * h * 10, base, base * h * 10 * 2],
      f: (v) => `${num(v)} mm³`,
      x: expl('prisma = base × altura', 'A base é um hexágono regular: 6 triângulos equiláteros (l²√3/4 cada).', `Base: 6 × ${a * a} × 1,7 ÷ 4 = ${num(base)} mm²; × ${h * 10} = ${num(base * h * 10)} mm³.`),
    };
  },
  // 7. chapéu de festa (área lateral do cone)
  (r) => {
    const [raio, h, g] = r.pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
    return {
      e: `Um chapéu de festa tem forma de cone (sem a base), com raio ${raio} cm e altura ${h} cm. Quanto papel é necessário para fazê-lo? (Use π = 3.)`,
      r: 3 * raio * g,
      d: [3 * raio * h, 3 * raio * raio, 3 * raio * (raio + g), raio * raio * h],
      f: cm2,
      x: expl('área lateral do cone', 'Área lateral = π · r · g, em que g (geratriz) é a "costura" do cone. Ache g por Pitágoras.', `g = √(${raio}² + ${h}²) = ${g}; 3 × ${raio} × ${g} = ${3 * raio * g} cm².`),
    };
  },
  // 8. esfera dentro do cubo
  (r) => {
    const a = r.pick([4, 6, 8, 10, 12]);
    return {
      e: `Uma bola de raio ${a / 2} cm está dentro de uma caixa cúbica de ${a} cm de aresta, encostando em todas as faces. Qual é o volume da caixa que fica vazio? (Use π = 3.)`,
      r: a ** 3 / 2,
      d: [a ** 3, (a ** 3) / 2 + a * a, 4 * (a / 2) ** 3 + a, a ** 3 - 4 * a ** 3],
      f: cm3,
      x: expl('volume por subtração', 'O diâmetro da bola é a aresta do cubo.', `Cubo: ${a ** 3}; bola: 4 × (${a / 2})³ = ${4 * (a / 2) ** 3}. Vazio: ${a ** 3 - 4 * (a / 2) ** 3} cm³.`),
    };
  },
  // 9. Euler com tipos de faces
  (r) => {
    const [desc, F, A] = r.pick([
      ['6 faces quadradas e 8 faces triangulares', 14, 24],
      ['12 faces pentagonais e 20 faces hexagonais', 32, 90],
      ['8 faces triangulares e 6 faces octogonais', 14, 36],
      ['2 faces hexagonais e 6 faces quadradas', 8, 18],
    ]);
    const V = 2 - F + A;
    return {
      e: `Um poliedro convexo tem ${desc}. Quantos vértices ele tem?`,
      r: V,
      d: [A, F, V + 2, A - F],
      x: expl('contar arestas pelas faces + Euler', 'Some os lados de todas as faces e divida por 2 (cada aresta é compartilhada por duas faces). Depois use V − A + F = 2.', `F = ${F}, A = ${A}; V = 2 − ${F} + ${A} = ${V}.`),
    };
  },
  // 10. área lateral da pirâmide
  (r) => {
    const [l, ap] = r.pick([[6, 5], [8, 5], [10, 13], [12, 10], [16, 17]]);
    return {
      e: `Uma barraca tem forma de pirâmide quadrangular regular, com aresta da base ${l} dm e apótema (altura de cada face triangular) ${ap} dm. Quanta lona é necessária para as 4 faces laterais?`,
      r: 2 * l * ap,
      d: [4 * l * ap, l * ap, 2 * l * ap + l * l, (l * l * ap) / 3],
      f: (v) => `${num(v)} dm²`,
      x: expl('área lateral da pirâmide', 'São 4 triângulos iguais, cada um com base l e altura igual ao apótema.', `4 × (${l} × ${ap} ÷ 2) = ${2 * l * ap} dm².`),
    };
  },
  // 11. cubo pintado e cortado
  (r) => {
    const n = r.int(3, 8);
    const tipo = r.pick([0, 1, 2, 3]);
    const val = [(n - 2) ** 3, 6 * (n - 2) ** 2, 12 * (n - 2), 8][tipo];
    const txt = ['nenhuma face', 'exatamente 1 face', 'exatamente 2 faces', 'exatamente 3 faces'][tipo];
    return {
      e: `Um cubo de madeira foi pintado por fora e depois cortado em ${n ** 3} cubinhos iguais (${n} em cada aresta). Quantos cubinhos ${tipo === 0 ? 'não têm' : 'têm'} ${txt} pintada${tipo > 1 ? 's' : ''}?`,
      r: val,
      d: [(n - 2) ** 3, 6 * (n - 2) ** 2, 12 * (n - 2), 8, n * n, 6 * n].filter((v) => v !== val),
      x: expl('posição no cubo', '3 faces: só os 8 cantos. 2 faces: o meio das 12 arestas. 1 face: o miolo de cada uma das 6 faces. 0 faces: o "cubo de dentro".', `Com n = ${n}: ${[`(${n} − 2)³`, `6 × (${n} − 2)²`, `12 × (${n} − 2)`, '8 cantos'][tipo]} = ${val}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[3].vezes = 2;
dificil[6].vezes = 2;
dificil[10].vezes = 2;


export default [
  {
    disciplina: 'matematica',
    arquivo: '09-geometria-espacial',
    titulo: 'Geometria espacial',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Volumes e áreas de prismas, cilindros, cones, pirâmides e esferas; relação de Euler e planificações.',
    unico: true,
    niveis: [[...facil, ...novos(NOVOS.espacial[0])], [...medio, ...novos(NOVOS.espacial[1])], [...dificil, ...novos(NOVOS.espacial[2])]],
  },
];
