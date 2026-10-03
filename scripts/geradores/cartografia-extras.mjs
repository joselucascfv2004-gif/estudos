// Cartografia — modelos novos (complementam os de cartografia.mjs).
import { expl, num } from './util.mjs';

const u = (un) => (v) => `${num(v)} ${un}`;
const escala = (v) => `1 : ${num(v)}`;
const DIR = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
const hora = (h) => `${String(((h % 24) + 24) % 24).padStart(2, '0')}h`;

export default [
  [
    (r) => {
      const esc = r.pick([50000, 100000, 200000, 250000, 500000, 1000000]), cm = r.pick([2, 3, 4, 5, 6, 8]);
      const km = (cm * esc) / 100000;
      return {
        e: `Uma distância real de ${num(km)} km aparece com ${cm} cm em um mapa. Qual é a escala desse mapa?`,
        r: escala(esc),
        d: [escala(esc / 10), escala(esc * 10), escala(km * 1000 / cm), escala(esc / 100), escala(esc * 100)],
        x: expl('escala = mapa ÷ real (na mesma unidade)', 'Passe a distância real para centímetros (1 km = 100.000 cm) e divida pelo tamanho no mapa.', `${num(km)} km = ${num(km * 100000)} cm; ${num(km * 100000)} ÷ ${cm} = ${num(esc)}. Escala ${escala(esc)}.`),
      };
    },
    (r) => {
      const esc = r.pick([25000, 50000, 100000, 200000, 500000]), km = r.pick([1, 2, 3, 4, 5, 10]);
      const cm = (km * 100000) / esc;
      return {
        e: `Em um mapa na escala 1 : ${num(esc)}, quantos centímetros representam uma distância real de ${km} km?`,
        r: cm,
        d: [cm * 10, cm / 10, cm * 100, km * esc / 1000, cm + 1],
        f: u('cm'),
        x: expl('regra de três com a escala', `Cada 1 cm do mapa vale ${num(esc)} cm reais = ${num(esc / 100000)} km.`, `${km} km ÷ ${num(esc / 100000)} km por cm = ${num(cm)} cm.`),
      };
    },
    (r) => {
      const i = r.int(0, 7), giro = r.pick([45, 90, 135, 180, 225, 270]), hor = r() < 0.5;
      const j = (((i + (hor ? 1 : -1) * (giro / 45)) % 8) + 8) % 8;
      return {
        e: `Uma pessoa está de frente para o ${DIR[i]} e gira ${giro}° no sentido ${hor ? 'horário' : 'anti-horário'}. Para qual direção ela fica voltada?`,
        r: DIR[j],
        d: DIR.filter((_, k) => k !== j && k !== i).slice(0, 5),
        x: expl('rosa dos ventos como relógio', 'Entre duas direções vizinhas da rosa dos ventos (N, NE, L, SE, S, SO, O, NO) há 45°. No sentido horário: N → L → S → O.', `${giro}° = ${giro / 45} ${giro === 45 ? 'passo' : 'passos'} de 45° a partir do ${DIR[i]}: ${DIR[j]}.`),
      };
    },
    (r) => {
      const [perg, resp, por] = r.pick([
        ['A latitude de um ponto é a distância angular entre esse ponto e', 'a Linha do Equador', 'Latitude vai de 0° (Equador) a 90° N ou S (polos).'],
        ['A longitude de um ponto é a distância angular entre esse ponto e', 'o Meridiano de Greenwich', 'Longitude vai de 0° (Greenwich) a 180° L ou O.'],
        ['As linhas imaginárias paralelas à Linha do Equador, usadas para medir a latitude, são chamadas de', 'paralelos', 'Paralelos medem latitude; meridianos (que ligam os polos) medem longitude.'],
        ['As linhas imaginárias que ligam o Polo Norte ao Polo Sul, usadas para medir a longitude, são chamadas de', 'meridianos', 'Meridianos medem longitude; paralelos medem latitude.'],
      ]);
      const todas = ['a Linha do Equador', 'o Meridiano de Greenwich', 'paralelos', 'meridianos', 'o Trópico de Capricórnio', 'o Polo Norte', 'fusos horários'];
      return {
        e: `${perg}:`,
        r: resp,
        d: r.shuffle(todas.filter((t) => t !== resp)),
        x: expl('coordenadas geográficas', 'Latitude = "andar para cima ou para baixo" a partir do Equador; longitude = "andar para os lados" a partir de Greenwich.', por),
      };
    },
  ],
  [
    (r) => {
      const [cid, fuso] = r.pick([['Tóquio', 9], ['Londres', 0], ['Paris', 1], ['Nova York', -5], ['Moscou', 3], ['Pequim', 8], ['Los Angeles', -8], ['Dubai', 4]]);
      const h = r.int(6, 22);
      const dif = fuso - -3;
      const v = h + dif;
      const fmt = (x) => `${hora(x)}${x >= 24 ? ' do dia seguinte' : x < 0 ? ' do dia anterior' : ''}`;
      return {
        e: `Brasília está no fuso UTC−3 e ${cid}, no fuso UTC${fuso === 0 ? '' : fuso > 0 ? '+' + fuso : '−' + -fuso}. Quando são ${hora(h)} em Brasília, que horas são em ${cid}?`,
        r: fmt(v),
        d: [fmt(h - dif), fmt(h + fuso), fmt(v + 1), fmt(v - 1), fmt(h - fuso)],
        x: expl('diferença entre fusos (UTC)', 'Subtraia os números dos fusos: quem tem o número maior está adiantado.', `${fuso} − (−3) = ${dif} ${Math.abs(dif) === 1 ? 'hora' : 'horas'}. ${hora(h)} ${dif >= 0 ? '+' : '−'} ${Math.abs(dif)} h = ${fmt(v)}.`),
      };
    },
    (r) => {
      const [esc, kmcm] = r.pick([[100000, 1], [50000, 0.5], [200000, 2], [500000, 5], [1000000, 10]]);
      const a = r.pick([2, 3, 4, 6, 9]);
      const v = a * kmcm * kmcm;
      return {
        e: `Em um mapa na escala 1 : ${num(esc)}, uma área de ${a} cm² corresponde a quantos km² no terreno?`,
        r: v,
        d: [a * kmcm, v * 10, v / 10, a * kmcm * 2, v * 100],
        f: u('km²'),
        x: expl('área varia com o QUADRADO da escala', `1 cm no mapa = ${num(kmcm)} km, então 1 cm² = ${num(kmcm)} × ${num(kmcm)} = ${num(kmcm * kmcm)} km².`, `${a} × ${num(kmcm * kmcm)} = ${num(v)} km².`),
      };
    },
    (r) => {
      const h = r.pick([6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18]);
      const graus = Math.abs(h - 12) * 15;
      const lado = h < 12 ? 'Oeste' : 'Leste';
      const fmt = (g, l) => `${g}° ${l}`;
      return {
        e: `Quando é meio-dia (hora solar) no Meridiano de Greenwich, em certa cidade são ${hora(h)} (hora solar). Qual é a longitude dessa cidade?`,
        r: fmt(graus, lado),
        d: [fmt(graus, lado === 'Oeste' ? 'Leste' : 'Oeste'), fmt(Math.abs(h - 12), lado), fmt(graus * 2, lado), fmt(graus + 15, lado), fmt(h * 15, lado)],
        x: expl('15° de longitude = 1 hora', 'A Terra gira 360° em 24 h. Atrasado em relação a Greenwich = a oeste; adiantado = a leste.', `${Math.abs(h - 12)} h × 15° = ${graus}°, a ${lado.toLowerCase()}.`),
      };
    },
    (r) => {
      const e1 = r.pick([100000, 200000, 250000]), e2 = r.pick([500000, 1000000]), cm = r.pick([5, 8, 10, 12, 20]);
      const real = cm * e1;
      const v = real / e2;
      return {
        e: `Uma estrada mede ${cm} cm em um mapa na escala 1 : ${num(e1)}. Quanto ela mediria em outro mapa, na escala 1 : ${num(e2)}?`,
        r: v,
        d: [(cm * e2) / e1, v * 10, cm, v / 10, cm - v],
        f: u('cm'),
        x: expl('passar pela distância real', 'Converta o mapa 1 para a distância real e depois a distância real para o mapa 2.', `Real: ${cm} × ${num(e1)} = ${num(real / 100000)} km. No 2º mapa: ${num(real)} ÷ ${num(e2)} = ${num(v)} cm.`),
      };
    },
  ],
  [
    (r) => {
      const esc = r.pick([200000, 400000, 600000, 1000000]), k = r.pick([2, 4, 5]);
      const amp = r() < 0.5;
      const v = amp ? esc / k : esc * k;
      return {
        e: `Um mapa na escala 1 : ${num(esc)} é ${amp ? 'ampliado' : 'reduzido'} ${k} vezes (nas medidas lineares) em uma copiadora. Qual é a escala do novo mapa?`,
        r: escala(v),
        d: [escala(amp ? esc * k : esc / k), escala(amp ? esc / (k * k) : esc * k * k), escala(esc), escala(esc * 10), escala(esc / 10)],
        x: expl('ampliar = mais detalhe = denominador menor', `Ampliando ${k} vezes, cada distância real ocupa ${k} vezes mais papel; o denominador fica ${k} vezes menor (e vice-versa na redução).`, `${num(esc)} ${amp ? '÷' : '×'} ${k} = ${num(v)}: ${escala(v)}.`),
      };
    },
    (r) => {
      let esc, cm, vel, km, t;
      do {
        esc = r.pick([500000, 1000000, 2000000]);
        cm = r.pick([6, 8, 9, 12, 15]);
        vel = r.pick([60, 80, 90, 100, 120]);
        km = (cm * esc) / 100000;
        t = km / vel;
      } while (!Number.isInteger(t * 4));
      const fmt = (x) => {
        const h = Math.floor(x), m = Math.round((x - h) * 60);
        return h ? `${h} h${m ? ` ${m} min` : ''}` : `${m} min`;
      };
      return {
        e: `Um trajeto mede ${cm} cm em um mapa na escala 1 : ${num(esc)}. Um carro percorre esse trajeto a uma velocidade média de ${vel} km/h. Quanto tempo dura a viagem?`,
        r: fmt(t),
        d: [fmt(t * 2), fmt(t / 2), fmt(t + 0.5), fmt(cm / vel * 10), fmt(t + 1), fmt(t * 10)],
        x: expl('escala + velocidade média (t = d/v)', 'Primeiro ache a distância real com a escala; depois divida pela velocidade.', `${cm} × ${num(esc)} cm = ${num(km)} km. t = ${num(km)} ÷ ${vel} = ${num(t)} h = ${fmt(t)}.`),
      };
    },
    (r) => {
      const l1 = r.pick([15, 30, 45, 60, 75]), l2 = r.pick([15, 30, 45, 60]);
      const graus = l1 + l2;
      const h = graus / 15, km = graus * 111;
      const fmt = (hh, k) => `${hh} ${hh === 1 ? 'hora' : 'horas'} e cerca de ${num(k)} km`;
      return {
        e: `Dois pontos sobre a Linha do Equador estão nas longitudes ${l1}° O e ${l2}° L. Considerando 15° por fuso e 1° ≈ 111 km no Equador, qual é a diferença de horário entre eles e a distância aproximada que os separa?`,
        r: fmt(h, km),
        d: [fmt(Math.abs(l1 - l2) / 15 || h + 1, Math.abs(l1 - l2) * 111 || km * 2), fmt(h, km / 2), fmt(h * 2, km), fmt(h + 2, km), fmt(h + 1, km)],
        x: expl('longitudes em lados opostos de Greenwich SOMAM', `Um ponto está a oeste e o outro a leste: ${l1}° + ${l2}° = ${graus}°.`, `${graus}° ÷ 15 = ${h} h; ${graus} × 111 ≈ ${num(km)} km.`),
      };
    },
    (r) => {
      const [perg, resp] = r.pick([
        ['Em uma carta topográfica, curvas de nível muito próximas umas das outras indicam', 'um terreno íngreme (declive acentuado)'],
        ['Em uma carta topográfica, curvas de nível muito afastadas umas das outras indicam', 'um terreno suave, quase plano'],
        ['Em uma carta topográfica, curvas de nível fechadas e concêntricas, com valores de altitude que AUMENTAM em direção ao centro, representam', 'um morro ou elevação'],
        ['Em uma carta topográfica, curvas de nível fechadas e concêntricas, com valores de altitude que DIMINUEM em direção ao centro, representam', 'uma depressão'],
      ]);
      const todas = ['um terreno íngreme (declive acentuado)', 'um terreno suave, quase plano', 'um morro ou elevação', 'uma depressão', 'um rio caudaloso', 'uma área de maior temperatura'];
      return {
        e: `${perg}:`,
        r: resp,
        d: r.shuffle(todas.filter((t) => t !== resp)),
        x: expl('ler as curvas de nível', 'Cada curva liga pontos de mesma altitude. Curvas juntas = altitude muda rápido em pouca distância (íngreme); separadas = terreno suave. Valores crescendo para o centro = morro; diminuindo = depressão.', `Resposta: ${resp}.`),
      };
    },
  ],
];
