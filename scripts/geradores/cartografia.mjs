// Geografia: cartografia (escalas, coordenadas, fusos, orientação, curvas de nível).
import { comNovos, num, prepararAntigos } from './util.mjs';
import NOVOS from './cartografia-novos-extras.mjs';
import EXTRAS from './cartografia-extras.mjs';

const em = (c) => (c.startsWith('Cidade') ? 'na ' : 'em ') + c;
const u = (un) => (v) => `${num(v)} ${un}`;
const h2 = (h) => `${String(((h % 24) + 24) % 24).padStart(2, '0')}h`;
const DIR = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
const CIDADES = [
  ['Londres', 0], ['Lisboa', 0], ['Paris', 15], ['Roma', 15], ['Cairo', 30], ['Moscou', 45], ['Dubai', 60],   ['Pequim', 120], ['Tóquio', 135], ['Sydney', 150], ['Nova York', -75], ['Chicago', -90], ['Los Angeles', -120], ['Cidade do México', -90], ['Buenos Aires', -45],
];

const carto = {
  disciplina: 'geografia',
  arquivo: '01-cartografia',
  titulo: 'Cartografia',
  provas: ['ENEM', 'Militares', 'Concursos'],
  descricao: 'Escalas, coordenadas geográficas, fusos horários, orientação e curvas de nível.',
  niveis: [
    [
      (r) => {
        const esc = r.pick([10000, 25000, 50000, 100000, 250000, 1000000]), d = r.pick([2, 3, 4, 5, 7.5, 8]);
        const km = (d * esc) / 100000;
        return {
          e: `Em um mapa de escala 1 : ${num(esc)}, duas cidades estão a ${num(d)} cm uma da outra. Qual é a distância real entre elas?`,
          r: km,
          d: [km * 10, km / 10, km * 100, d * esc / 1000],
          f: u('km'),
          x: `${num(d)} cm × ${num(esc)} = ${num(d * esc)} cm = ${num(km)} km.`,
        };
      },
      (r) => {
        const i = r.int(0, 7);
        return {
          e: `Uma pessoa caminha na direção ${DIR[i]}. Para voltar ao ponto de partida pelo mesmo caminho, ela deve seguir na direção:`,
          r: DIR[(i + 4) % 8],
          d: DIR.filter((_, k) => k !== (i + 4) % 8 && k !== i).slice(0, 4),
          x: `A direção oposta a ${DIR[i]} na rosa dos ventos (giro de 180°) é ${DIR[(i + 4) % 8]}.`,
        };
      },
      (r) => {
        const lat = r.int(1, 60) * r.pick([1, -1]), lon = r.int(1, 170) * r.pick([1, -1]);
        const certo = `Hemisférios ${lat > 0 ? 'Norte' : 'Sul'} e ${lon > 0 ? 'Oriental (Leste)' : 'Ocidental (Oeste)'}`;
        const ops = ['Norte', 'Sul'].flatMap((a) => ['Oriental (Leste)', 'Ocidental (Oeste)'].map((b) => `Hemisférios ${a} e ${b}`));
        return {
          e: `Um ponto tem coordenadas ${Math.abs(lat)}° ${lat > 0 ? 'N' : 'S'} e ${Math.abs(lon)}° ${lon > 0 ? 'L' : 'O'}. Em quais hemisférios ele se localiza?`,
          r: certo,
          d: [...ops.filter((o) => o !== certo), 'Sobre a Linha do Equador'],
          x: `Latitude ${lat > 0 ? 'Norte' : 'Sul'} indica o hemisfério ${lat > 0 ? 'Norte' : 'Sul'} (em relação ao Equador); longitude ${lon > 0 ? 'Leste' : 'Oeste'} indica o hemisfério ${lon > 0 ? 'Oriental' : 'Ocidental'} (em relação ao meridiano de Greenwich).`,
        };
      },
      (r) => {
        const fusos = r.int(1, 6), h = r.int(6, 20), leste = r() < 0.5;
        return {
          e: `Em uma cidade são ${h2(h)}. Qual é a hora em um local situado ${fusos * 15}° de longitude a ${leste ? 'leste' : 'oeste'} dela?`,
          r: h + (leste ? fusos : -fusos),
          d: [h + (leste ? -fusos : fusos), h + fusos * 15 > 24 ? h + 2 * fusos : h + fusos * 15, h, h + (leste ? fusos + 1 : -fusos - 1)],
          f: h2,
          x: `Cada 15° de longitude = 1 fuso (1 hora). ${fusos * 15}° = ${fusos} h. A leste o horário é adiantado; a oeste, atrasado: ${h2(h + (leste ? fusos : -fusos))}.`,
        };
      },
      (r) => {
        const [a, b] = r.sample([5000, 10000, 25000, 50000, 100000, 500000, 1000000], 2);
        const maior = Math.min(a, b);
        return {
          e: `Comparando um mapa na escala 1 : ${num(a)} com outro na escala 1 : ${num(b)} (de mesmo tamanho), qual deles tem a MAIOR escala e, portanto, mais detalhes?`,
          r: `O de 1 : ${num(maior)}, que representa uma área menor com mais detalhes`,
          d: [`O de 1 : ${num(Math.max(a, b))}, que representa uma área maior com mais detalhes`, `O de 1 : ${num(Math.max(a, b))}, pois tem o maior denominador`, 'Os dois têm a mesma escala', `O de 1 : ${num(maior)}, que representa uma área maior com menos detalhes`],
          x: `Escala é uma fração: 1/${num(maior)} > 1/${num(Math.max(a, b))}. Quanto menor o denominador, maior a escala, menor a área representada e maior o nível de detalhe.`,
        };
      },
    ],
    [
      (r) => {
        const [c1, l1] = r.pick(CIDADES), [c2, l2] = r.pick(CIDADES.filter((c) => c[1] !== l1));
        const dif = (l2 - l1) / 15;
        const h = r.int(0, 23);
        const res = h + dif;
        return {
          e: `Considerando apenas os fusos teóricos (15° = 1 h, sem horário de verão), quando são ${h2(h)} ${em(c1)} (${Math.abs(l1)}° ${l1 >= 0 ? 'L' : 'O'}), que horas são ${em(c2)} (${Math.abs(l2)}° ${l2 >= 0 ? 'L' : 'O'})?`,
          r: res,
          d: [h - dif, res + 1, res - 1, h + Math.abs(dif) * (dif > 0 ? -1 : 1) + 2],
          f: (v) => `${h2(v)}${v >= 24 ? ' (dia seguinte)' : v < 0 ? ' (dia anterior)' : ''}`,
          x: `Diferença de longitude: ${Math.abs(l2 - l1)}° = ${Math.abs(dif)} h. ${c2} está a ${dif > 0 ? 'leste (horário adiantado)' : 'oeste (horário atrasado)'}: ${h2(h)} ${dif > 0 ? '+' : '−'} ${Math.abs(dif)} h.`,
        };
      },
      (r) => {
        const l1 = r.int(-30, -1), l2 = r.int(1, 30);
        const graus = l2 - l1;
        return {
          e: `Dois pontos estão sobre o mesmo meridiano, nas latitudes ${Math.abs(l1)}° ${l1 < 0 ? 'S' : 'N'} e ${l2}° N. Considerando que 1° de latitude corresponde a aproximadamente 111 km, qual é a distância aproximada entre eles?`,
          r: graus * 111,
          d: [Math.abs(l2 + l1) * 111 || 222, graus * 15, graus * 60, graus * 1110],
          f: u('km'),
          x: `Estão em hemisférios diferentes: a diferença é ${Math.abs(l1)}° + ${l2}° = ${graus}°. ${graus} × 111 ≈ ${num(graus * 111)} km.`,
        };
      },
      (r) => {
        const eq = r.pick([10, 20, 25, 50, 100]), n = r.int(3, 9), base = r.pick([0, 100, 200, 500]);
        return {
          e: `Em uma carta topográfica, as curvas de nível têm equidistância de ${eq} m, e a curva mais baixa representada é a de ${base} m. Qual é a altitude da ${n}ª curva acima dela?`,
          r: base + n * eq,
          d: [base + (n - 1) * eq, n * eq, base + (n + 1) * eq, base + 2 * n * eq],
          f: u('m'),
          x: `Cada curva sobe ${eq} m: ${base} + ${n} × ${eq} = ${base + n * eq} m.`,
        };
      },
      (r) => {
        const esc = r.pick([1000, 2000, 5000, 10000]), a = r.pick([2, 3, 4, 5]), b = r.pick([2, 3, 4, 6]);
        const area = (a * esc / 100) * (b * esc / 100);
        return {
          e: `Um terreno retangular aparece em uma planta na escala 1 : ${num(esc)} com ${a} cm × ${b} cm. Qual é sua área real?`,
          r: area,
          d: [(a * b * esc) / 100, area / 10, area * 10, (a + b) * 2 * esc / 100],
          f: u('m²'),
          x: `Lados reais: ${num(a * esc / 100)} m e ${num(b * esc / 100)} m. Área = ${num(area)} m². Atenção: a área varia com o quadrado da escala.`,
        };
      },
      (r) => {
        const [proj, carac] = r.pick([
          ['de Mercator', 'cilíndrica conforme: preserva as formas (ângulos), mas exagera as áreas próximas aos polos'],
          ['de Peters', 'cilíndrica equivalente: preserva as proporções entre as áreas, mas distorce as formas'],
          ['azimutal (plana)', 'é feita a partir de um plano tangente a um ponto, muito usada para representar regiões polares'],
          ['cônica', 'é mais adequada para representar regiões de latitudes médias'],
        ]);
        const todas = [
          'cilíndrica conforme: preserva as formas (ângulos), mas exagera as áreas próximas aos polos',
          'cilíndrica equivalente: preserva as proporções entre as áreas, mas distorce as formas',
          'é feita a partir de um plano tangente a um ponto, muito usada para representar regiões polares',
          'é mais adequada para representar regiões de latitudes médias',
          'não apresenta nenhum tipo de distorção',
          'preserva simultaneamente formas, áreas e distâncias',
        ];
        return {
          e: `Sobre a projeção ${proj}, é correto afirmar que ela:`,
          r: carac,
          d: r.shuffle(todas.filter((t) => t !== carac)),
          x: `Toda projeção cartográfica tem distorções. A projeção ${proj} ${carac}.`,
        };
      },
    ],
    [
      (r) => {
        const lat = r.int(1, 80), lon = r.int(1, 179), ns = r.pick(['N', 'S']), lo = r.pick(['L', 'O']);
        const certo = `${lat}° ${ns === 'N' ? 'S' : 'N'} e ${180 - lon}° ${lo === 'L' ? 'O' : 'L'}`;
        return {
          e: `O antípoda de um ponto é o ponto diametralmente oposto na esfera terrestre. Qual é o antípoda de ${lat}° ${ns} e ${lon}° ${lo}?`,
          r: certo,
          d: [`${lat}° ${ns === 'N' ? 'S' : 'N'} e ${lon}° ${lo === 'L' ? 'O' : 'L'}`, `${90 - lat}° ${ns} e ${180 - lon}° ${lo}`, `${lat}° ${ns} e ${180 - lon}° ${lo === 'L' ? 'O' : 'L'}`, `${90 - lat}° ${ns === 'N' ? 'S' : 'N'} e ${lon}° ${lo}`],
          x: `Antípoda: mesma latitude no hemisfério oposto e longitude igual a 180° menos a original, no hemisfério oposto: ${certo}.`,
        };
      },
      (r) => {
        const dh = r.pick([20, 40, 50, 100]), esc = r.pick([10000, 25000, 50000]), d = r.pick([1, 2, 4]);
        const real = (d * esc) / 100;
        const decl = (dh / real) * 100;
        return {
          e: `Em uma carta de escala 1 : ${num(esc)}, duas curvas de nível com diferença de altitude de ${dh} m estão separadas por ${d} cm no mapa. Qual é a declividade média do terreno entre elas?`,
          r: Math.round(decl * 100) / 100,
          d: [Math.round((dh / (d * esc)) * 10000) / 100 || decl * 10, decl * 10, decl / 10, Math.round((real / dh) * 100) / 100],
          f: (v) => `${num(v)}%`,
          x: `Distância horizontal real: ${d} × ${num(esc)} cm = ${num(real)} m. Declividade = ${dh}/${num(real)} = ${num(decl)}%.`,
        };
      },
      (r) => {
        const saida = r.int(0, 23), voo = r.int(3, 14);
        const [c1, l1] = r.pick(CIDADES.filter((c) => Number.isInteger(c[1] / 15) && !c[0].startsWith('Cidade')));
        const [c2, l2] = r.pick(CIDADES.filter((c) => Number.isInteger(c[1] / 15) && c[1] !== l1 && !c[0].startsWith('Cidade')));
        const dif = (l2 - l1) / 15;
        const chegada = saida + voo + dif;
        const dia = chegada >= 24 ? ' do dia seguinte' : chegada < 0 ? ' do dia anterior' : '';
        return {
          e: `Um avião parte de ${c1} às ${h2(saida)} (hora local) rumo a ${c2}. O voo dura ${voo} horas. Considerando fusos teóricos (${c1}: ${Math.abs(l1)}° ${l1 >= 0 ? 'L' : 'O'}; ${c2}: ${Math.abs(l2)}° ${l2 >= 0 ? 'L' : 'O'}), qual é a hora local de chegada?`,
          r: `${h2(chegada)}${dia}`,
          d: [`${h2(saida + voo)}`, `${h2(saida + voo - dif)}`, `${h2(chegada + 1)}${dia}`, `${h2(saida + dif)}`],
          x: `Chegada no horário de ${c1}: ${h2(saida + voo)}. Diferença de fuso: ${Math.abs(l2 - l1)}°/15 = ${Math.abs(dif)} h ${dif > 0 ? 'a mais (leste)' : 'a menos (oeste)'}. Hora local: ${h2(chegada)}${dia}.`,
        };
      },
      (r) => {
        const kmcm = r.pick([1, 2, 5, 10, 20, 50]);
        return {
          e: `Uma escala gráfica indica que 1 cm no mapa corresponde a ${kmcm} km no terreno. Qual é a escala numérica equivalente?`,
          r: `1 : ${num(kmcm * 100000)}`,
          d: [`1 : ${num(kmcm * 1000)}`, `1 : ${num(kmcm * 10000)}`, `1 : ${num(kmcm * 1000000)}`, `1 : ${num(kmcm)}`],
          x: `${kmcm} km = ${num(kmcm * 100000)} cm. Logo, 1 cm : ${num(kmcm * 100000)} cm ⇒ 1 : ${num(kmcm * 100000)}.`,
        };
      },
      (r) => {
        const lat = r.pick([0, 23.5, 30, 45, 60]);
        const [txt, resp] = lat === 0 ? ['na Linha do Equador', 'Os dias e as noites têm duração aproximadamente igual o ano todo'] : lat === 23.5 ? ['sobre o Trópico de Capricórnio', 'Os raios solares incidem perpendicularmente ao meio-dia no solstício de dezembro'] : [`a ${lat}° de latitude sul`, 'A diferença de duração entre dias e noites ao longo do ano é maior do que no Equador'];
        const todas = [
          'Os dias e as noites têm duração aproximadamente igual o ano todo',
          'Os raios solares incidem perpendicularmente ao meio-dia no solstício de dezembro',
          'A diferença de duração entre dias e noites ao longo do ano é maior do que no Equador',
          'O Sol nunca nasce durante o inverno',
          'As estações do ano coincidem com as do hemisfério Norte',
          'Os raios solares incidem perpendicularmente em todos os dias do ano',
        ];
        return {
          e: `Para um observador localizado ${txt}, é correto afirmar que:`,
          r: resp,
          d: r.shuffle(todas.filter((t) => t !== resp)),
          x: `A inclinação do eixo terrestre (~23,5°) faz a duração do dia variar mais conforme aumenta a latitude. No Equador, dias e noites são quase iguais; no Trópico de Capricórnio, o Sol fica a pino no solstício de dezembro.`,
        };
      },
    ],
  ],
};

// Rótulo da "ferramenta" de cada modelo antigo, na ordem em que aparecem em cada nível.
const FERR = [
  ['escala (real = mapa × denominador)', 'rosa dos ventos (direção oposta)', 'hemisférios', 'fusos (15° = 1 h)', 'comparar escalas'],
  ['fusos entre duas cidades', 'distância pela latitude (1° ≈ 111 km)', 'curvas de nível (equidistância)', 'área com escala', 'projeções cartográficas'],
  ['antípoda', 'declividade (altura ÷ distância)', 'fuso + duração do voo', 'escala gráfica → numérica', 'latitude e insolação'],
];

export default [comNovos(prepararAntigos(carto, FERR, EXTRAS), NOVOS.carto)];
