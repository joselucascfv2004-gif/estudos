// Cartografia — modelos acrescentados em 2026 para levar o tópico a 50 questões.
// Entram no fim de cada nível (ver `novos` em util.mjs), sem mudar as questões antigas.
import { expl, num } from './util.mjs';

const ZONAS = ['zona intertropical (tropical)', 'zona temperada do norte', 'zona temperada do sul', 'zona polar ártica', 'zona polar antártica'];
const lat = (v) => `${num(Math.abs(v))}° ${v >= 0 ? 'N' : 'S'}`;

const carto = [
  [
    (r) => {
      const v = r.pick([10, -15, 40, -35, 70, -75, 5, 50]);
      const z = Math.abs(v) < 23.5 ? ZONAS[0] : Math.abs(v) < 66.5 ? (v > 0 ? ZONAS[1] : ZONAS[2]) : v > 0 ? ZONAS[3] : ZONAS[4];
      return {
        e: `Uma cidade fica na latitude ${lat(v)}. Em que zona térmica (climática) da Terra ela está?`,
        r: z,
        d: ZONAS.filter((x) => x !== z),
        x: expl('zonas térmicas: limitadas pelos trópicos (≈ 23,5°) e círculos polares (≈ 66,5°)', 'Entre os trópicos fica a zona intertropical; entre trópico e círculo polar, as temperadas; além dos círculos, as polares.', `${lat(v)} → ${z}.`),
      };
    },
    (r) => {
      const km = r.pick([2, 5, 12, 25, 40]);
      return {
        e: `Quantos centímetros há em ${km} km?`,
        r: km * 100000,
        d: [km * 1000, km * 10000, km * 1000000, km * 100],
        f: (v) => `${num(v)} cm`,
        x: expl('1 km = 1 000 m = 100 000 cm', 'Essa conversão é a base de todos os cálculos de escala.', `${km} × 100 000 = ${num(km * 100000)} cm.`),
      };
    },
    (r) => {
      const esc = r.pick([100000, 250000, 500000, 1000000]), km = r.pick([10, 20, 50, 100]);
      const cm = (km * 100000) / esc;
      return {
        e: `Duas cidades estão a ${km} km uma da outra. Num mapa de escala 1 : ${num(esc)}, qual será a distância entre elas?`,
        r: cm,
        d: [km * esc / 100000 / 100, cm * 10, cm / 10, km / 10],
        f: (v) => `${num(v)} cm`,
        x: expl('distância no mapa = real ÷ denominador (na mesma unidade)', `${km} km = ${num(km * 100000)} cm.`, `${num(km * 100000)} ÷ ${num(esc)} = ${num(cm)} cm.`),
      };
    },
    (r) => {
      const a = r.pick([10, 15, 20, 23]), b = r.pick([5, 12, 30, 33]);
      return {
        e: `A cidade X está a ${a}° de latitude norte e a cidade Y, no mesmo meridiano, a ${b}° de latitude sul. Qual é a diferença de latitude entre elas?`,
        r: a + b,
        d: [Math.abs(a - b), a + b + 10, (a + b) / 2, a + b + 90],
        f: (v) => `${num(v)}°`,
        x: expl('hemisférios diferentes: as latitudes se somam', 'Uma está acima e a outra abaixo do Equador (0°).', `${a}° + ${b}° = ${a + b}°.`),
      };
    },
    (r) => {
      const [d1, d2, ang] = r.pick([['norte', 'sudeste', 135], ['norte', 'leste', 90], ['leste', 'sudoeste', 135], ['nordeste', 'sul', 135], ['oeste', 'nordeste', 135], ['norte', 'nordeste', 45]]);
      return {
        e: `Qual é o menor ângulo entre as direções ${d1} e ${d2} na rosa dos ventos?`,
        r: ang,
        d: [45, 90, 135, 180, 270].filter((x) => x !== ang),
        f: (v) => `${num(v)}°`,
        x: expl('rosa dos ventos como relógio: cada direção colateral fica a 45° das vizinhas', 'Entre dois pontos cardeais seguidos há 90°; os colaterais ficam no meio.', `De ${d1} a ${d2}: ${ang}°.`),
      };
    },
  ],
  [
    (r) => {
      const [la, cos] = r.pick([[60, 0.5], [0, 1], [30, 0.87], [45, 0.71]]);
      const km = 111 * cos;
      return {
        e: `No Equador, 1° de longitude mede cerca de 111 km. Quanto mede 1° de longitude na latitude de ${la}°? (cos ${la}° ≈ ${num(cos)})`,
        r: km,
        d: [111, 111 / cos, 111 * (1 - cos), 111 * cos * 2],
        f: (v) => `${num(v)} km`,
        x: expl('os paralelos encolhem em direção aos polos: 111 × cos(latitude)', 'Os meridianos se aproximam até se encontrarem nos polos.', `111 × ${num(cos)} = ${num(km)} km.`),
      };
    },
    (r) => {
      const esc = r.pick([50000, 100000, 250000, 500000, 2000000]);
      return {
        e: `Num mapa de escala 1 : ${num(esc)}, quantos quilômetros reais correspondem a 1 cm do mapa?`,
        r: esc / 100000,
        d: [esc / 1000, esc / 100, esc / 10000, esc / 1000000],
        f: (v) => `${num(v)} km`,
        x: expl('escala numérica → gráfica', `1 cm do mapa = ${num(esc)} cm reais; divida por 100 000 para ter km.`, `${num(esc)} ÷ 100 000 = ${num(esc / 100000)} km.`),
      };
    },
    (r) => {
      const cidade = r.pick(['Porto Alegre (30° S)', 'São Paulo, na altura do Trópico de Capricórnio, em junho', 'Curitiba (25° S)', 'Buenos Aires (34° S)']);
      return {
        e: `Em ${cidade}, ao meio-dia solar, para que lado aponta a sombra de uma vara fincada no chão (fora do verão)?`,
        r: 'para o sul',
        d: ['para o norte', 'para o leste', 'para o oeste', 'não há sombra'],
        x: expl('o Sol ao meio-dia fica do lado do Equador', 'Em lugares ao sul do Trópico de Capricórnio, o Sol do meio-dia fica ao norte; a sombra aponta para o lado oposto.', 'A sombra aponta para o sul.'),
      };
    },
    (r) => {
      const la = r.pick([0, 10, 23, 30, 40, 52]);
      return {
        e: `Nos equinócios, o Sol do meio-dia fica a pino no Equador. Qual é a altura do Sol (ângulo acima do horizonte) ao meio-dia, nesse dia, num lugar de latitude ${la}°?`,
        r: 90 - la,
        d: [la, 90 - la / 2, 45, 90, 60, 90 - la - 10, 90 - la + 10].filter((x) => x !== 90 - la && x >= 0 && x <= 90),
        f: (v) => `${num(v)}°`,
        x: expl('equinócio: altura do Sol ao meio-dia = 90° − latitude', 'Quanto mais longe do Equador, mais inclinados chegam os raios solares.', `90° − ${la}° = ${90 - la}°.`),
      };
    },
    (r) => {
      const dl = r.pick([22.5, 37.5, 52.5, 67.5, 82.5]);
      const min = dl * 4;
      return {
        e: `Duas cidades têm diferença de longitude de ${num(dl)}°. Qual é a diferença entre as suas horas solares (locais)?`,
        r: `${Math.floor(min / 60)} h ${min % 60} min`,
        d: [`${Math.floor(dl / 15)} h`, `${Math.floor(min / 60)} h ${(min % 60) / 2} min`, `${Math.ceil(dl / 15)} h`, `${Math.floor(min / 60)} h ${(min % 60) + 15} min`],
        x: expl('15° = 1 h, ou 1° = 4 min', `${num(dl)} × 4 = ${min} min.`, `${min} min = ${Math.floor(min / 60)} h ${min % 60} min.`),
      };
    },
  ],
  [
    (r) => {
      const dlong = r.pick([10, 20, 30, 40]);
      const km = dlong * 111 * 0.5;
      return {
        e: `Dois pontos estão no paralelo de 60° N, separados por ${dlong}° de longitude. Qual é a distância entre eles, medida ao longo do paralelo? (1° no Equador ≈ 111 km; cos 60° = 0,5)`,
        r: km,
        d: [dlong * 111, (dlong * 111) / 4, km * 2, dlong * 60],
        f: (v) => `${num(v)} km`,
        x: expl('arco no paralelo: graus × 111 × cos(latitude)', `No paralelo de 60°, cada grau vale 111 × 0,5 = 55,5 km.`, `${dlong} × 55,5 = ${num(km)} km.`),
      };
    },
    (r) => {
      const v = r.pick([60, 80, 90, 100]), t = r.pick([1.5, 2, 3]), cm = r.pick([6, 8, 9, 12]);
      const realKm = v * t, esc = (realKm * 100000) / cm;
      return {
        e: `Um carro, a ${v} km/h constantes, leva ${num(t)} h para ir de uma cidade a outra. No mapa, essa distância mede ${cm} cm. Qual é a escala do mapa?`,
        r: `1 : ${num(esc)}`,
        d: [`1 : ${num(esc / 10)}`, `1 : ${num(esc * 10)}`, `1 : ${num(esc * 2)}`, `1 : ${num((realKm * 1000) / cm)}`],
        x: expl('escala = mapa ÷ real (mesma unidade)', `Distância real: ${v} × ${num(t)} = ${num(realKm)} km = ${num(realKm * 100000)} cm.`, `${num(realKm * 100000)} ÷ ${cm} = ${num(esc)} → 1 : ${num(esc)}.`),
      };
    },
    (r) => {
      const [la, dec, nomeDec] = r.pick([[-30, -23.5, 'no solstício de dezembro (Sol a pino no Trópico de Capricórnio, ≈ 23,5° S)'], [-30, 23.5, 'no solstício de junho (Sol a pino no Trópico de Câncer, ≈ 23,5° N)'], [-10, -23.5, 'no solstício de dezembro (Sol a pino em ≈ 23,5° S)'], [40, 23.5, 'no solstício de junho (Sol a pino em ≈ 23,5° N)']]);
      const alt = 90 - Math.abs(la - dec);
      return {
        e: `Qual é a altura do Sol ao meio-dia num lugar de latitude ${lat(la)}, ${nomeDec}?`,
        r: alt,
        d: [90 - Math.abs(la), Math.abs(la - dec), 90 - Math.abs(la + dec), 45, 90],
        f: (v) => `${num(v)}°`,
        x: expl('altura do Sol ao meio-dia = 90° − (distância em graus até onde o Sol está a pino)', `A distância entre ${lat(la)} e ${lat(dec)} é ${num(Math.abs(la - dec))}°.`, `90° − ${num(Math.abs(la - dec))}° = ${num(alt)}°.`),
      };
    },
    (r) => {
      const lo1 = r.pick([45, 47, 43, 51]), lo2 = r.pick([38, 40, 35, 60]);
      const dif = (lo1 - lo2) * 4; // B a leste (lo2 < lo1) fica adiantada
      const hm = (m) => `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`;
      const certo = hm(720 + dif), errado = hm(720 - dif);
      return {
        e: `A cidade A está a ${lo1}° O de longitude e a cidade B, a ${lo2}° O. Quando é meio-dia solar em A, que horas solares são em B?`,
        r: certo,
        d: [errado, '12h00', hm(720 + Math.round((lo1 - lo2) / 15) * 60), hm(720 + dif * 2), hm(720 + (lo1 - lo2))],
        x: expl('hora solar: 1° de longitude = 4 minutos; a leste, mais tarde', `A diferença é ${Math.abs(lo1 - lo2)}° = ${Math.abs(dif)} min. ${dif > 0 ? 'B fica a leste de A (menor longitude oeste), então está adiantada.' : 'B fica a oeste de A, então está atrasada.'}`, `Em B: ${certo}.`),
      };
    },
  ],
];

export default { carto };
