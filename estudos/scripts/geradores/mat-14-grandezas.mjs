// Matemática — Grandezas, medidas e escalas.
import { arred, expl, num, reais } from './util.mjs';

const hm = (v) => (v >= 60 ? `${Math.floor(v / 60)} h${v % 60 ? ` ${Math.round(v % 60)} min` : ''}` : `${Math.round(v)} min`);

const facil = [
  // 1. conversão simples
  (r) => {
    const [de, para, f, v] = r.pick([
      ['km', 'm', 1000, r.pick([2.5, 3.4, 0.75, 12, 1.2])],
      ['m', 'cm', 100, r.pick([1.75, 2.3, 0.6, 4.05])],
      ['L', 'mL', 1000, r.pick([1.5, 0.35, 2.25, 0.5])],
      ['kg', 'g', 1000, r.pick([0.25, 1.2, 3.5, 0.08])],
      ['m³', 'L', 1000, r.pick([2, 0.5, 1.6, 12])],
      ['m²', 'cm²', 10000, r.pick([1, 2.5, 0.3])],
    ]);
    return {
      e: `Quanto vale ${num(v)} ${de} em ${para}?`,
      r: v * f,
      d: [v * f * 10, (v * f) / 10, v * 100 === v * f ? v * 10 : v * 100, (v * f) / 100],
      f: (x) => `${num(x)} ${para}`,
      x: expl('fator de conversão', `1 ${de} = ${num(f)} ${para}. Indo para uma unidade menor, o número aumenta (multiplica).`, `${num(v)} × ${num(f)} = ${num(v * f)} ${para}.`),
    };
  },
  // 2. minutos em horas
  (r) => {
    const min = r.int(70, 500);
    const f = (v) => `${Math.floor(v / 60)} h ${v % 60} min`;
    return {
      e: `Um filme tem ${min} minutos de duração. Quanto tempo é isso em horas e minutos?`,
      r: min,
      d: [min + 20, min - 20, Math.floor(min / 100) * 60 + (min % 100), min + 60],
      f,
      x: expl('base 60', 'Tempo não é decimal: 1 hora tem 60 minutos, não 100.', `${min} = 60 × ${Math.floor(min / 60)} + ${min % 60} → ${f(min)}.`),
    };
  },
  // 3. escala de mapa
  (r) => {
    const esc = r.pick([10000, 25000, 50000, 100000, 200000, 500000]), d = r.pick([2, 3, 4.5, 5, 6, 8]);
    const km = (d * esc) / 100000;
    return {
      e: `Em um mapa na escala 1 : ${num(esc)}, a distância entre duas cidades é de ${num(d)} cm. Qual é a distância real?`,
      r: km,
      d: [km * 10, km / 10, (d * esc) / 1000, km * 100],
      f: (x) => `${num(x)} km`,
      x: expl('escala', `1 cm no mapa = ${num(esc)} cm reais. Depois, converta cm em km (÷ 100.000).`, `${num(d)} × ${num(esc)} = ${num(d * esc)} cm = ${num(km)} km.`),
    };
  },
  // 4. velocidade média
  (r) => {
    const d = r.pick([120, 150, 180, 240, 300, 360, 450]), t = r.pick([1.5, 2, 2.5, 3, 4, 5]);
    if (!Number.isInteger((d / t) * 10)) return facil[3](r);
    return {
      e: `Um ônibus percorreu ${d} km em ${num(t)} horas. Qual foi a sua velocidade média?`,
      r: d / t,
      d: [d * t, d / (t + 1), (d / t) * 1.2, d - t],
      f: (x) => `${num(x)} km/h`,
      x: expl('velocidade = distância ÷ tempo', 'A unidade já diz a conta: km/h é quilômetro dividido por hora.', `${d} ÷ ${num(t)} = ${num(d / t)} km/h.`),
    };
  },
  // 5. km/h → m/s
  (r) => {
    const v = r.pick([36, 54, 72, 90, 108, 18]);
    return {
      e: `Um carro trafega a ${v} km/h. Qual é essa velocidade em metros por segundo?`,
      r: v / 3.6,
      d: [v * 3.6, v / 60, v / 1.8, v / 36],
      f: (x) => `${num(x)} m/s`,
      x: expl('fator 3,6', '1 km/h = 1.000 m em 3.600 s = 1/3,6 m/s. De km/h para m/s, divida por 3,6.', `${v} ÷ 3,6 = ${num(v / 3.6)} m/s.`),
    };
  },
  // 6. dose por massa corporal
  (r) => {
    const dose = r.pick([5, 10, 15, 20]), kg = r.int(12, 35);
    return {
      e: `A bula de um remédio infantil indica ${dose} mg por quilograma de massa corporal. Qual é a dose para uma criança de ${kg} kg?`,
      r: dose * kg,
      d: [dose + kg, dose * kg * 10, (dose * kg) / 10, kg / dose],
      f: (x) => `${num(x)} mg`,
      x: expl('taxa por unidade', '"mg por kg" quer dizer: multiplique a dose pelo número de quilos.', `${dose} × ${kg} = ${dose * kg} mg.`),
    };
  },
  // 7. horas decimais
  (r) => {
    const h = r.pick([1.25, 1.5, 2.75, 0.4, 1.2, 2.3, 3.1]);
    return {
      e: `Um aplicativo informa que uma viagem durou ${num(h)} h. Quanto tempo é isso em horas e minutos?`,
      r: h * 60,
      d: [Math.floor(h) * 60 + Math.round((h % 1) * 100), h * 100, h * 60 + 10, Math.floor(h) * 60 + Math.round((h % 1) * 10)],
      f: (v) => hm(v),
      x: expl('parte decimal × 60', `A parte depois da vírgula é uma fração de hora: ${num(h % 1)} h × 60 = ${num((h % 1) * 60)} min. Não é "${Math.round((h % 1) * 100)} minutos"!`, `${num(h)} × 60 = ${num(h * 60)} min = ${hm(h * 60)}.`),
    };
  },
  // 8. hectares
  (r) => {
    const a = r.pick([200, 250, 400, 500]), b = r.pick([100, 200, 300, 400]);
    return {
      e: `Uma fazenda retangular mede ${a} m por ${b} m. Qual é a sua área em hectares? (1 ha = 10.000 m²)`,
      r: (a * b) / 10000,
      d: [(a * b) / 1000, (a * b) / 100000, a * b, (a + b) / 100],
      f: (x) => `${num(x)} ha`,
      x: expl('área + conversão', 'Calcule em m² e divida por 10.000 (um hectare é um quadrado de 100 m × 100 m).', `${a} × ${b} = ${num(a * b)} m² = ${num((a * b) / 10000)} ha.`),
    };
  },
  // 9. garrafas
  (r) => {
    const ml = r.pick([250, 300, 500, 600]), L = r.pick([3, 6, 9, 12, 15]);
    const n = (L * 1000) / ml;
    if (!Number.isInteger(n)) return facil[8](r);
    return {
      e: `Quantas garrafas de ${ml} mL são necessárias para engarrafar ${L} litros de suco?`,
      r: n,
      d: [L * ml / 100, n * 10, n / 10, L],
      x: expl('mesma unidade antes de dividir', 'Converta litros em mL (× 1.000) e divida pela capacidade de cada garrafa.', `${L} L = ${num(L * 1000)} mL; ÷ ${ml} = ${n} garrafas.`),
    };
  },
  // 10. consumo do carro
  (r) => {
    const L = r.int(25, 45), c = r.pick([9, 10, 11, 12, 13, 14]);
    return {
      e: `Um carro percorreu ${L * c} km e gastou ${L} litros de gasolina. Qual foi o consumo médio, em km/L?`,
      r: c,
      d: [c - 2, arred((L / (L * c)) * 100, 2), c + 2, (L * c) / 100],
      f: (x) => `${num(x)} km/L`,
      x: expl('razão entre grandezas', 'km/L: quilômetros divididos por litros.', `${L * c} ÷ ${L} = ${c} km/L.`),
    };
  },
];
facil[0].vezes = 2;
facil[2].vezes = 2;
facil[4].vezes = 2;
facil[6].vezes = 2;

const medio = [
  // 1. descobrir a escala
  (r) => {
    const km = r.pick([5, 10, 20, 25, 40, 50]), cm = r.pick([2, 4, 5, 10]);
    const esc = (km * 100000) / cm;
    return {
      e: `Duas cidades distantes ${km} km estão representadas em um mapa a ${cm} cm uma da outra. Qual é a escala do mapa?`,
      r: `1 : ${num(esc)}`,
      d: [`1 : ${num(esc / 10)}`, `1 : ${num(esc * 10)}`, `1 : ${num(km * cm)}`, `1 : ${num(esc / 100)}`],
      x: expl('escala = mapa ÷ real (mesma unidade)', 'Converta km para cm (× 100.000) e simplifique.', `${km} km = ${num(km * 100000)} cm; ${cm} : ${num(km * 100000)} = 1 : ${num(esc)}.`),
    };
  },
  // 2. gasto mensal com combustível
  (r) => {
    const cons = r.pick([8, 10, 12, 14]), dia = r.pick([20, 30, 40, 50]), dias = r.pick([20, 22, 30]), p = r.pick([5.5, 6, 6.5]);
    const tot = ((dia * dias) / cons) * p;
    return {
      e: `Um motorista roda ${dia} km por dia, durante ${dias} dias no mês, com um carro que faz ${cons} km/L. Com o combustível a ${reais(p)} o litro, quanto ele gasta por mês?`,
      r: arred(tot, 2),
      d: [arred((dia * dias * p) / 10, 2), arred(tot / dias, 2), arred(dia * cons * p, 2), arred(tot * 1.1, 2)],
      f: reais,
      x: expl('encadear razões', 'Distância do mês → litros (÷ km/L) → reais (× preço).', `${dia * dias} km ÷ ${cons} = ${num((dia * dias) / cons)} L; × ${reais(p)} = ${reais(tot)}.`),
    };
  },
  // 3. caixa-d'água e vazão
  (r) => {
    const cap = r.pick([500, 1000, 1500, 2000, 3000]), q = r.pick([10, 20, 25, 50]);
    const t = cap / q;
    return {
      e: `Uma caixa-d'água de ${num(cap)} litros, inicialmente vazia, é abastecida por uma bomba com vazão de ${q} L/min. Em quanto tempo ela fica cheia?`,
      r: t,
      d: [t * 2, t / 2, t + 30, cap / 60],
      f: hm,
      x: expl('vazão = volume ÷ tempo', 'Tempo = volume ÷ vazão.', `${num(cap)} ÷ ${q} = ${t} min = ${hm(t)}.`),
    };
  },
  // 4. ritmo de corrida
  (r) => {
    const pace = r.pick([5, 6, 4.5, 5.5]), d = r.pick([5, 10, 21]);
    const total = pace * d;
    return {
      e: `Um corredor mantém o ritmo de ${num(pace)} minutos por quilômetro. Quanto tempo ele leva para completar ${d} km?`,
      r: total,
      d: [total + 10, total - 5, (d * 60) / pace, total * 1.5],
      f: hm,
      x: expl('taxa unitária', 'Minutos por km vezes quantidade de km.', `${num(pace)} × ${d} = ${num(total)} min = ${hm(total)}.`),
    };
  },
  // 5. download
  (r) => {
    const gb = r.pick([0.6, 1.2, 1.8, 2.4, 3]), mbs = r.pick([10, 20, 30, 40]);
    const s = (gb * 1000) / mbs;
    return {
      e: `Um arquivo de ${num(gb)} GB é baixado a uma velocidade constante de ${mbs} MB/s. Quanto tempo leva o download? (Considere 1 GB = 1.000 MB.)`,
      r: s,
      d: [s * 60, s / 10, gb * mbs, s * 8],
      f: (v) => (v >= 60 ? `${Math.floor(v / 60)} min${v % 60 ? ` ${Math.round(v % 60)} s` : ''}` : `${num(v)} s`),
      x: expl('mesma unidade', 'Converta GB em MB e divida pela velocidade.', `${num(gb)} GB = ${num(gb * 1000)} MB; ÷ ${mbs} = ${num(s)} s.`),
    };
  },
  // 6. gotas
  (r) => {
    const g = r.pick([20, 25]), ml = r.pick([2, 2.5, 4, 5, 7.5]), vezes = r.pick([2, 3]);
    return {
      e: `Em um conta-gotas, ${g} gotas equivalem a 1 mL. Um médico receitou ${num(ml)} mL de um xarope, ${vezes} vezes ao dia. Quantas gotas o paciente toma por dia?`,
      r: g * ml * vezes,
      d: [g * ml, g * vezes, ml * vezes, (g * ml * vezes) / 10],
      x: expl('encadear conversões', 'Gotas por dose = gotas por mL × mL; depois multiplique pelas doses do dia.', `${g} × ${num(ml)} = ${num(g * ml)} gotas por dose; × ${vezes} = ${num(g * ml * vezes)}.`),
    };
  },
  // 7. alqueires
  (r) => {
    const alq = r.pick([2, 3, 5, 10]);
    const ha = (alq * 24200) / 10000;
    return {
      e: `No interior de São Paulo, 1 alqueire equivale a 24.200 m². Um sítio de ${alq} alqueires tem quantos hectares? (1 ha = 10.000 m²)`,
      r: ha,
      d: [alq * 24.2, alq * 2.42 * 10, alq * 10, alq * 242],
      f: (x) => `${num(x)} ha`,
      x: expl('passar por uma unidade comum', 'Converta alqueires em m² e depois m² em hectares.', `${alq} × 24.200 = ${num(alq * 24200)} m² = ${num(ha)} ha.`),
    };
  },
  // 8. consumo de água no banho
  (r) => {
    const v = r.pick([8, 10, 12, 15]), min = r.pick([8, 10, 15, 20]), dias = 30;
    const m3 = (v * min * dias) / 1000;
    return {
      e: `Um chuveiro tem vazão de ${v} litros por minuto. Uma pessoa toma um banho de ${min} minutos por dia. Quantos metros cúbicos de água ela gasta em 30 dias?`,
      r: m3,
      d: [m3 * 10, m3 * 1000, (v * min) / 1000, m3 / 10],
      f: (x) => `${num(x)} m³`,
      x: expl('vazão × tempo, depois converter', '1 m³ = 1.000 litros.', `${v} × ${min} × 30 = ${num(v * min * dias)} L = ${num(m3)} m³.`),
    };
  },
  // 9. planta e área real
  (r) => {
    const esc = r.pick([50, 100, 200]), a = r.pick([4, 5, 6, 8]), b = r.pick([3, 4, 5]);
    const real = (a * esc * b * esc) / 10000;
    return {
      e: `Na planta de um apartamento, na escala 1 : ${esc}, um quarto aparece como um retângulo de ${a} cm por ${b} cm. Qual é a área real do quarto?`,
      r: real,
      d: [(a * b * esc) / 10000, real * 10, real / 10, ((a + b) * 2 * esc) / 100],
      f: (x) => `${num(x)} m²`,
      x: expl('escala vale para comprimentos', 'Converta cada lado para o real e só depois multiplique. (Em área, a escala entra ao quadrado.)', `${num((a * esc) / 100)} m × ${num((b * esc) / 100)} m = ${num(real)} m².`),
    };
  },
];
medio[0].vezes = 2;
medio[1].vezes = 2;
medio[3].vezes = 2;
medio[5].vezes = 2;
medio[8].vezes = 2;

const dificil = [
  // 1. m/s × minutos → km
  (r) => {
    const v = r.pick([15, 20, 25, 30]), t = r.pick([12, 18, 30, 45]);
    const d = (v * 60 * t) / 1000;
    return {
      e: `Um trem mantém velocidade constante de ${v} m/s. Quantos quilômetros ele percorre em ${t} minutos?`,
      r: arred(d, 2),
      d: [arred((v * t) / 1000, 2), arred(d * 10, 2), arred((v * t * 60) / 100, 2), arred(d / 3.6, 2)],
      f: (x) => `${num(x)} km`,
      x: expl('padronizar unidades', 'Velocidade está em metros por SEGUNDO: transforme os minutos em segundos.', `${t} min = ${t * 60} s; ${v} × ${t * 60} = ${num(v * t * 60)} m = ${num(d)} km.`),
    };
  },
  // 2. torneira pingando
  (r) => {
    const g = r.pick([10, 20, 30, 40]), ml = 0.05;
    const litros = (g * 60 * 24 * 30 * ml) / 1000;
    return {
      e: `Uma torneira mal fechada pinga ${g} gotas por minuto. Se cada gota tem 0,05 mL, quantos litros são desperdiçados em 30 dias?`,
      r: arred(litros, 2),
      d: [arred(litros * 10, 2), arred(litros / 10, 2), arred((g * 60 * 24 * ml) / 1000, 2), arred(litros / 24, 2)],
      f: (x) => `${num(x)} L`,
      x: expl('encadear unidades', 'Gotas por minuto → por hora (× 60) → por dia (× 24) → no mês (× 30); depois mL → L.', `${g} × 60 × 24 × 30 = ${num(g * 43200)} gotas × 0,05 mL = ${num(g * 43200 * ml)} mL = ${num(litros)} L.`),
    };
  },
  // 3. densidade demográfica
  (r) => {
    const pop = r.pick([120000, 250000, 480000, 1500000]), area = r.pick([400, 600, 1200, 1500, 3000]);
    return {
      e: `Um município tem ${num(pop)} habitantes e área de ${num(area)} km². Qual é a sua densidade demográfica?`,
      r: arred(pop / area, 2),
      d: [arred((area / pop) * 1000, 2), arred(pop / area / 10, 2), arred((pop / area) * 10, 2), arred(pop / (area * 1000), 2)],
      f: (x) => `${num(x)} hab./km²`,
      x: expl('razão entre grandezas', 'Densidade demográfica = habitantes ÷ área.', `${num(pop)} ÷ ${num(area)} = ${num(pop / area)} hab./km².`),
    };
  },
  // 4. latas de tinta
  (r) => {
    const l = r.pick([10, 12, 15, 20]), c = r.pick([6, 8, 10]), h = r.pick([2.5, 3]);
    const porta = 1.6, janela = r.pick([1.5, 2, 2.4]);
    const area = 2 * (l + c) * h - porta - janela;
    const rend = r.pick([10, 12, 16]);
    const latas = Math.ceil(area / (rend * 3.6));
    return {
      e: `As quatro paredes de um salão de ${l} m × ${c} m e ${num(h)} m de altura serão pintadas. Há uma porta de ${num(porta)} m² e uma janela de ${num(janela)} m² (não pintadas). A tinta rende ${rend} m² por litro e é vendida em latas de 3,6 L. Quantas latas, no mínimo, devem ser compradas?`,
      r: latas,
      d: [latas + 1, latas - 1 > 0 ? latas - 1 : latas + 2, Math.ceil((2 * (l + c) * h) / rend), latas + 3],
      x: expl('área → litros → latas (arredondar para cima)', 'Não dá para comprar meia lata: se sobrar qualquer pedaço de parede, compra-se mais uma.', `Área: ${num(area)} m². Cada lata: ${rend} × 3,6 = ${num(rend * 3.6)} m². ${num(area)} ÷ ${num(rend * 3.6)} ≈ ${num(area / (rend * 3.6))} ⇒ ${latas} latas.`),
    };
  },
  // 5. fuso horário
  (r) => {
    const [dif, cidade] = r.pick([[3, 'Lisboa'], [4, 'Paris'], [-1, 'Manaus'], [12, 'Tóquio'], [-2, 'Rio Branco']]);
    const saida = r.int(6, 22), voo = r.int(2, 12);
    const chegadaLocal = (((saida + voo + dif) % 24) + 24) % 24;
    const f = (h) => `${String(h).padStart(2, '0')}h`;
    return {
      e: `Um avião sai de Brasília às ${f(saida)} (horário de Brasília) com destino a ${cidade}, onde o horário está ${Math.abs(dif)} ${Math.abs(dif) === 1 ? 'hora' : 'horas'} ${dif > 0 ? 'adiantado' : 'atrasado'} em relação a Brasília. O voo dura ${voo} horas. A que horas (horário local) ele chega a ${cidade}?`,
      r: chegadaLocal,
      d: [(saida + voo) % 24, (((saida + voo - dif) % 24) + 24) % 24, (((saida + dif) % 24) + 24) % 24, (chegadaLocal + 1) % 24],
      f,
      x: expl('duas etapas', 'Some a duração do voo no horário de saída e, depois, converta para o fuso do destino.', `${f(saida)} + ${voo} h = ${f((saida + voo) % 24)} em Brasília → ${f(chegadaLocal)} em ${cidade}${saida + voo + dif >= 24 ? ' (do dia seguinte)' : ''}.`),
    };
  },
  // 6. calendário cósmico
  (r) => {
    const [ev, anos] = r.pick([['o Homo sapiens', 300000], ['a agricultura', 12000], ['os dinossauros foram extintos', 66000000], ['a escrita', 5000]]);
    const s = (anos / 4.5e9) * 365 * 24 * 3600;
    const n1 = (v) => num(v, 1).replace(/,0$/, '');
    const fmt = (v) => (v >= 86400 ? `${n1(v / 86400)} dias` : v >= 3600 ? `${n1(v / 3600)} horas` : v >= 60 ? `${n1(v / 60)} minutos` : `${n1(v)} segundos`);
    return {
      e: `Imagine a história da Terra (cerca de 4,5 bilhões de anos) comprimida em um único ano, terminando à meia-noite de 31 de dezembro. Quanto tempo antes da meia-noite apareceu ${ev}, que surgiu há cerca de ${num(anos)} anos?`,
      r: fmt(s),
      d: [fmt(s * 10), fmt(s / 10), fmt(s * 60), fmt(s / 60)],
      x: expl('regra de três com escalas enormes', '4,5 bilhões de anos ↔ 1 ano (≈ 31,5 milhões de segundos).', `${num(anos)} ÷ 4,5 × 10⁹ × 31.536.000 s ≈ ${num(s, 0)} s ≈ ${fmt(s)}.`),
    };
  },
  // 7. conta de energia do chuveiro
  (r) => {
    const w = r.pick([4500, 5500, 6000, 7500]), min = r.pick([20, 30, 40, 60]), tarifa = r.pick([0.7, 0.8, 0.9]);
    const kwh = (w / 1000) * (min / 60) * 30;
    return {
      e: `Um chuveiro de ${num(w)} W fica ligado ${min} minutos por dia. Com a tarifa de ${reais(tarifa)} por kWh, quanto ele custa em 30 dias?`,
      r: arred(kwh * tarifa, 2),
      d: [arred(w * min * 30 * tarifa / 1000, 2), arred(kwh, 2), arred((w / 1000) * min * tarifa, 2), arred(kwh * tarifa / 30, 2)],
      f: reais,
      x: expl('energia = potência × tempo', 'Use kW e horas para obter kWh (a unidade da conta de luz).', `${num(w / 1000)} kW × ${num(min / 60, 3)} h × 30 = ${num(kwh)} kWh; × ${reais(tarifa)} = ${reais(kwh * tarifa)}.`),
    };
  },
];
dificil[0].vezes = 2;
dificil[2].vezes = 2;
dificil[3].vezes = 2;
dificil[4].vezes = 2;
dificil[6].vezes = 2;


export default [
  {
    disciplina: 'matematica',
    arquivo: '14-grandezas-medidas-escalas',
    titulo: 'Grandezas, medidas e escalas',
    provas: ['ENEM', 'Militares', 'Concursos'],
    descricao: 'Conversão de unidades, escalas de mapas e plantas, velocidade, vazão, consumo e fusos horários.',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
