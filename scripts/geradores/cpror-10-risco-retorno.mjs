// C-Pro R (ANBIMA) — Risco, retorno, performance e rebalanceamento de carteiras.
import { expl, num, reais } from './util.mjs';

const N = (v, c = null) => num(v, c);
const r2 = (v) => Math.round(v * 100) / 100;
const pc = (v) => `${N(r2(v))}%`;
const R = (v) => reais(r2(v));
const ind = (v) => N(r2(v)); // índices (Sharpe, Treynor, beta)

const facil = [
  // 1. retorno esperado da carteira
  (r) => {
    const [w, a, b] = r.pick([[60, 10, 15], [70, 8, 20], [50, 12, 6], [40, 9, 14], [80, 11, 5]]);
    const e = (w * a + (100 - w) * b) / 100;
    return {
      e: `Uma carteira tem ${w}% em um ativo com retorno esperado de ${a}% e ${100 - w}% em outro com ${b}%. Qual é o retorno esperado da carteira?`,
      r: e,
      d: [(a + b) / 2, a + b, (w * b + (100 - w) * a) / 100, Math.max(a, b)],
      f: pc,
      x: expl('retorno da carteira = média ponderada', `${N(w / 100)} · ${a}% + ${N((100 - w) / 100)} · ${b}%.`, `= ${pc(e)}.`),
    };
  },
  // 2. índice de Sharpe
  (r) => {
    const [ret, rf, s] = r.pick([[14, 10, 8], [16, 10, 12], [12, 10, 4], [18, 11, 14], [13, 10, 6]]);
    return {
      e: `Um fundo rendeu ${ret}% no ano, com volatilidade (desvio padrão) de ${s}%. A taxa livre de risco foi ${rf}%. Qual é o índice de Sharpe?`,
      r: (ret - rf) / s,
      d: [ret / s, (ret - rf) * s, s / (ret - rf), (ret + rf) / s],
      f: ind,
      x: expl('Sharpe = (retorno − taxa livre de risco) / desvio padrão', `(${ret}% − ${rf}%) ÷ ${s}%.`, `= ${ind((ret - rf) / s)}: quanto de retorno extra o fundo entregou por unidade de risco total.`),
    };
  },
  // 3. índice de Treynor
  (r) => {
    const [ret, rf, b] = r.pick([[15, 10, 1.25], [14, 10, 0.8], [18, 10, 1.6], [13, 10, 0.5]]);
    return {
      e: `Uma carteira rendeu ${ret}%, com beta de ${N(b)}, num período em que a taxa livre de risco foi de ${rf}%. Qual é o índice de Treynor?`,
      r: (ret - rf) / b,
      d: [ret / b, (ret - rf) * b, b / (ret - rf), (ret - rf) / (b * 2)],
      f: ind,
      x: expl('Treynor = (retorno − taxa livre de risco) / beta', `(${ret} − ${rf}) ÷ ${N(b)}.`, `= ${ind((ret - rf) / b)}. Usa só o risco sistemático (beta), não a volatilidade total.`),
    };
  },
  // 4. beta e movimento do mercado
  (r) => {
    const b = r.pick([1.2, 0.8, 1.5, 0.5]), m = r.pick([10, -10, 20, -5]);
    return {
      e: `Uma carteira tem beta de ${N(b)} em relação ao Ibovespa. Se o índice ${m > 0 ? 'subir' : 'cair'} ${Math.abs(m)}%, qual é a variação esperada da carteira?`,
      r: b * m,
      d: [m, m / b, m + b, -b * m],
      f: (v) => `${v > 0 ? 'alta' : 'queda'} de ${N(Math.abs(r2(v)))}%`,
      x: expl('beta mede a sensibilidade ao mercado', `Beta ${N(b)}: a carteira tende a variar ${N(b)} vez${b === 1 ? '' : 'es'} o movimento do índice.`, `${N(b)} · ${m}% = ${pc(b * m)}.`),
    };
  },
  // 5. beta da carteira
  (r) => {
    const [w, b1, b2] = r.pick([[50, 1.4, 0.6], [60, 1.2, 0.7], [30, 2, 0.5], [70, 0.9, 1.3]]);
    const b = (w * b1 + (100 - w) * b2) / 100;
    return {
      e: `Uma carteira tem ${w}% numa ação de beta ${N(b1)} e ${100 - w}% noutra de beta ${N(b2)}. Qual é o beta da carteira?`,
      r: b,
      d: [(b1 + b2) / 2, b1 * b2, b1 + b2, (w * b2 + (100 - w) * b1) / 100],
      f: ind,
      x: expl('beta da carteira = média ponderada dos betas', `${N(w / 100)} · ${N(b1)} + ${N((100 - w) / 100)} · ${N(b2)}.`, `= ${ind(b)}.`),
    };
  },
  // 6. retorno ativo sobre o benchmark
  (r) => {
    const [f, bm] = r.pick([[14, 12], [9, 11], [18, 15], [10.5, 10]]);
    return {
      e: `Um fundo multimercado rendeu ${N(f)}% no ano, enquanto o CDI (seu benchmark) rendeu ${bm}%. Qual foi o retorno ativo (excesso sobre o benchmark)?`,
      r: f - bm,
      d: [f + bm, (f / bm - 1) * 100, bm - f + 1, f],
      f: (v) => `${v >= 0 ? '' : '−'}${N(Math.abs(r2(v)))} ponto${Math.abs(r2(v)) === 1 ? '' : 's'} percentua${Math.abs(r2(v)) === 1 ? 'l' : 'is'}`,
      x: expl('retorno ativo = retorno do fundo − benchmark', `${N(f)}% − ${bm}%.`, `${N(r2(f - bm))} p.p. ${f >= bm ? 'O gestor superou o benchmark.' : 'O fundo ficou abaixo do benchmark.'}`),
    };
  },
  // 7. pesos depois de uma alta
  (r) => {
    const [a, rf, alta] = r.pick([[60, 40, 50], [50, 50, 20], [40, 60, 50], [70, 30, 30]]);
    const na = a * (1 + alta / 100);
    const peso = (na / (na + rf)) * 100;
    return {
      e: `Uma carteira começou com R$ ${a} mil em ações e R$ ${rf} mil em renda fixa. As ações subiram ${alta}% e a renda fixa ficou estável. Qual passou a ser o peso das ações?`,
      r: peso,
      d: [a, a + alta / 2, (na / (a + rf)) * 100, a * (1 + alta / 100)],
      f: pc,
      x: expl('peso = valor da classe / valor total', `Ações: R$ ${N(na)} mil; total: R$ ${N(na + rf)} mil.`, `${N(na)} ÷ ${N(na + rf)} ≈ ${pc(peso)}. A carteira ficou mais arriscada que o planejado.`),
    };
  },
  // 8. quanto vender para rebalancear
  (r) => {
    const [ac, rf, alvo] = r.pick([[90, 40, 60], [78, 52, 50], [84, 36, 60], [70, 30, 60]]);
    const total = ac + rf;
    const vender = ac - (total * alvo) / 100;
    return {
      e: `Hoje a carteira tem R$ ${ac} mil em ações e R$ ${rf} mil em renda fixa. A meta é ${alvo}% em ações. Quanto vender de ações (e aplicar em renda fixa) para voltar à meta?`,
      r: vender,
      d: [ac - (ac * alvo) / 100, total - ac, (total * alvo) / 100, vender / 2],
      f: (v) => `R$ ${N(r2(v))} mil`,
      x: expl('rebalancear = voltar aos pesos-alvo', `Total: R$ ${total} mil; meta em ações: ${alvo}% = R$ ${N((total * alvo) / 100)} mil.`, `Vender R$ ${N(r2(vender))} mil.`),
    };
  },
  // 9. correlação perfeita
  (r) => {
    const [w, s1, s2] = r.pick([[50, 20, 10], [60, 25, 5], [40, 30, 10]]);
    const s = (w * s1 + (100 - w) * s2) / 100;
    return {
      e: `Dois ativos têm volatilidade de ${s1}% e ${s2}% e correlação +1. Uma carteira com ${w}% no primeiro e ${100 - w}% no segundo tem que volatilidade?`,
      r: s,
      d: [Math.sqrt(((w / 100) * s1) ** 2 + (((100 - w) / 100) * s2) ** 2), (s1 + s2) / 2 + 2, s1 + s2, Math.abs((w * s1 - (100 - w) * s2) / 100)],
      f: pc,
      x: expl('correlação +1: sem benefício de diversificação', 'Com correlação perfeita, o risco da carteira é a média ponderada dos riscos.', `${N(w / 100)} · ${s1}% + ${N((100 - w) / 100)} · ${s2}% = ${pc(s)}.`),
    };
  },
  // 10. volatilidade anual a partir da mensal
  (r) => {
    const m = r.pick([2, 3, 4, 5]);
    return {
      e: `Um fundo tem volatilidade mensal de ${m}%. Qual é a volatilidade anualizada aproximada (use √12 ≈ 3,46)?`,
      r: m * 3.46,
      d: [m * 12, m, m * 3.46 * 3.46, m / 3.46],
      f: pc,
      x: expl('o risco cresce com a raiz do tempo', 'Para retornos independentes, σ anual = σ mensal · √12.', `${m}% · 3,46 ≈ ${pc(m * 3.46)}.`),
    };
  },
  // 11. qual fundo tem melhor Sharpe
  (r) => {
    const [ra, sa, rb, sb, rf] = r.pick([[14, 8, 18, 12, 10], [12, 2, 16, 9, 10], [15, 10, 13, 4, 10], [20, 20, 14, 6, 10]]);
    const A = (ra - rf) / sa, B = (rb - rf) / sb;
    const melhor = A > B ? 'A' : 'B';
    return {
      e: `Fundo A: retorno ${ra}% e volatilidade ${sa}%. Fundo B: retorno ${rb}% e volatilidade ${sb}%. Com taxa livre de risco de ${rf}%, qual teve a melhor relação risco-retorno pelo índice de Sharpe?`,
      r: `o fundo ${melhor} (Sharpe ${ind(Math.max(A, B))} contra ${ind(Math.min(A, B))})`,
      d: [`o fundo ${melhor === 'A' ? 'B' : 'A'} (Sharpe ${ind(Math.max(A, B))} contra ${ind(Math.min(A, B))})`, 'são iguais', `o fundo ${ra > rb ? 'A' : 'B'}, porque rendeu mais`, `o fundo ${sa < sb ? 'A' : 'B'}, porque oscilou menos, independentemente do retorno`],
      x: expl('Sharpe compara retorno extra por unidade de risco', `A: (${ra} − ${rf}) ÷ ${sa} = ${ind(A)}. B: (${rb} − ${rf}) ÷ ${sb} = ${ind(B)}.`, `O fundo ${melhor} entregou mais retorno por risco assumido.`),
    };
  },
  // 12. retorno líquido de taxa
  (r) => {
    const [b, t] = r.pick([[12, 2], [10, 1.5], [15, 2], [9, 0.5]]);
    return {
      e: `A carteira de um fundo rendeu ${b}% brutos no ano, e o fundo cobra ${N(t)}% ao ano de taxa de administração. Qual foi, aproximadamente, a rentabilidade da cota?`,
      r: b - t,
      d: [b, b * (1 - t / 100), b + t, b / t],
      f: pc,
      x: expl('a taxa sai do patrimônio', 'A taxa de administração é provisionada diariamente e reduz a cota.', `≈ ${b}% − ${N(t)}% = ${pc(b - t)}.`),
    };
  },
  // 13. retorno acumulado
  (r) => {
    const [a, b, c] = r.pick([[10, -5, 8], [20, -10, 5], [5, 5, 5], [-10, 15, 10]]);
    const t = ((1 + a / 100) * (1 + b / 100) * (1 + c / 100) - 1) * 100;
    return {
      e: `Uma carteira rendeu ${a}%, ${b}% e ${c}% em três anos seguidos. Qual é a rentabilidade acumulada?`,
      r: t,
      d: [a + b + c, (a + b + c) / 3, t + 2, t - 3],
      f: pc,
      x: expl('acumular = multiplicar os fatores', `${N(1 + a / 100)} · ${N(1 + b / 100)} · ${N(1 + c / 100)} = ${N(1 + t / 100, 4)}.`, `Acumulado: ${pc(t)}.`),
    };
  },
  // 14. CPPI
  (r) => {
    const [v, piso, m] = r.pick([[100, 90, 3], [200, 160, 2], [100, 80, 4], [500, 450, 5]]);
    const exp = m * (v - piso);
    return {
      e: `Numa estratégia CPPI, a carteira vale R$ ${v} mil, o piso é R$ ${piso} mil e o multiplicador é ${m}. Quanto deve ficar em ativos de risco?`,
      r: exp,
      d: [v - piso, m * v, v - exp, m * piso - v],
      f: (x) => `R$ ${N(x)} mil`,
      x: expl('CPPI: exposição = multiplicador × colchão', `Colchão = valor − piso = R$ ${v - piso} mil.`, `${m} · ${v - piso} = R$ ${exp} mil em risco; o resto em ativos livres de risco.`),
    };
  },
  // 15. coeficiente de variação
  (r) => {
    const [m, s] = r.pick([[10, 5], [12, 18], [8, 2], [15, 30]]);
    return {
      e: `Um ativo tem retorno médio de ${m}% e desvio padrão de ${s}%. Qual é o coeficiente de variação (risco por unidade de retorno)?`,
      r: s / m,
      d: [m / s, s - m, s * m, (s / m) * 100],
      f: ind,
      x: expl('CV = desvio padrão / média', 'Quanto menor o CV, menos risco por unidade de retorno.', `${s} ÷ ${m} = ${ind(s / m)}.`),
    };
  },
  // 16. retorno esperado por cenários
  (r) => {
    const [p1, r1, p2, r2_, p3, r3] = r.pick([[30, -10, 50, 10, 20, 30], [20, -20, 60, 10, 20, 40], [25, 0, 50, 8, 25, 16]]);
    const e = (p1 * r1 + p2 * r2_ + p3 * r3) / 100;
    return {
      e: `Uma ação pode render ${r1}% (probabilidade de ${p1}%), ${r2_}% (${p2}%) ou ${r3}% (${p3}%). Qual é o retorno esperado?`,
      r: e,
      d: [(r1 + r2_ + r3) / 3, r2_, r3, e + 4],
      f: pc,
      x: expl('retorno esperado = soma das probabilidades × retornos', `${N(p1 / 100)} · ${r1} + ${N(p2 / 100)} · ${r2_} + ${N(p3 / 100)} · ${r3}.`, `= ${pc(e)}.`),
    };
  },
  // 17. rentabilidade real da carteira
  (r) => {
    const [n, i] = r.pick([[12, 5], [9, 4], [15, 6], [7, 4]]);
    const real = ((1 + n / 100) / (1 + i / 100) - 1) * 100;
    return {
      e: `A carteira de um cliente rendeu ${n}% no ano, com inflação de ${i}%. Qual foi a rentabilidade real?`,
      r: real,
      d: [n - i, n + i, n / i, real + 1],
      f: pc,
      x: expl('Fisher', `${N(1 + n / 100)} ÷ ${N(1 + i / 100)} − 1.`, `≈ ${pc(real)}.`),
    };
  },
];

const medio = [
  // 1. risco de carteira com correlação
  (r) => {
    const [w, s1, s2, rho] = r.pick([[50, 20, 20, 0], [50, 20, 20, -1], [50, 30, 10, 0.5], [60, 20, 10, 0]]);
    const a = (w / 100) * s1, b = ((100 - w) / 100) * s2;
    const s = Math.sqrt(a * a + b * b + 2 * a * b * rho);
    return {
      e: `Uma carteira tem ${w}% no ativo X (volatilidade ${s1}%) e ${100 - w}% no ativo Y (volatilidade ${s2}%). A correlação entre eles é ${N(rho)}. Qual é a volatilidade da carteira?`,
      r: s,
      d: [a + b, (s1 + s2) / 2 + (rho === 0.5 ? 3 : 0), Math.sqrt(a * a + b * b), Math.abs(a - b) + 1],
      f: pc,
      x: expl('σ² = (w₁σ₁)² + (w₂σ₂)² + 2·w₁σ₁·w₂σ₂·ρ', `(${N(a)})² + (${N(b)})² + 2 · ${N(a)} · ${N(b)} · ${N(rho)} = ${N(r2(s * s))}.`, `σ = ${pc(s)}. ${rho < 1 ? 'Com correlação menor que 1, o risco fica abaixo da média ponderada: é o benefício da diversificação.' : ''}`),
    };
  },
  // 2. beta pela covariância
  (r) => {
    const [cov, v] = r.pick([[0.03, 0.02], [0.016, 0.02], [0.05, 0.04], [0.01, 0.02]]);
    return {
      e: `A covariância entre os retornos de uma ação e do Ibovespa é ${N(cov, 3)}, e a variância do Ibovespa é ${N(v, 2)}. Qual é o beta da ação?`,
      r: cov / v,
      d: [v / cov, cov * v, cov / Math.sqrt(v), 1],
      f: ind,
      x: expl('β = cov(ação, mercado) / var(mercado)', `${N(cov, 3)} ÷ ${N(v, 2)}.`, `β = ${ind(cov / v)}. ${cov / v > 1 ? 'Mais sensível que o mercado.' : cov / v < 1 ? 'Menos sensível que o mercado.' : 'Varia como o mercado.'}`),
    };
  },
  // 3. CAPM
  (r) => {
    const [rf, b, rm] = r.pick([[10, 1.2, 15], [10, 0.8, 16], [11, 1.5, 15], [9, 1, 14]]);
    const e = rf + b * (rm - rf);
    return {
      e: `Pelo modelo CAPM, qual é o retorno exigido de uma ação com beta ${N(b)}, se a taxa livre de risco é ${rf}% e o retorno esperado do mercado é ${rm}%?`,
      r: e,
      d: [rm * b, rf + b * rm, rf + (rm - rf) / b, rm],
      f: pc,
      x: expl('E(R) = Rf + β · (Rm − Rf)', `Prêmio de mercado: ${rm} − ${rf} = ${rm - rf}%.`, `${rf}% + ${N(b)} · ${rm - rf}% = ${pc(e)}.`),
    };
  },
  // 4. Sharpe da carteira
  (r) => {
    const [w, ra, rb, s, rf] = r.pick([[60, 15, 10, 9, 10], [50, 18, 11, 7, 10], [40, 20, 12, 8, 11]]);
    const ret = (w * ra + (100 - w) * rb) / 100;
    return {
      e: `Uma carteira tem ${w}% em ações (retorno de ${ra}%) e ${100 - w}% em renda fixa (${rb}%). A volatilidade da carteira é ${s}% e a taxa livre de risco, ${rf}%. Qual é o índice de Sharpe?`,
      r: (ret - rf) / s,
      d: [ret / s, (ra - rf) / s, (ret - rf) * s, (ret - rb) / s],
      f: ind,
      x: expl('primeiro o retorno da carteira, depois o Sharpe', `Retorno: ${N(w / 100)} · ${ra} + ${N((100 - w) / 100)} · ${rb} = ${pc(ret)}.`, `Sharpe: (${N(ret)} − ${rf}) ÷ ${s} = ${ind((ret - rf) / s)}.`),
    };
  },
  // 5. constant mix depois de queda
  (r) => {
    const [ac, rf, queda] = r.pick([[50, 50, 20], [60, 40, 25], [40, 60, 50]]);
    const na = ac * (1 - queda / 100), total = na + rf, alvo = (total * ac) / (ac + rf);
    return {
      e: `Na estratégia constant mix (${ac}% ações e ${rf}% renda fixa), a carteira tinha R$ ${ac} mil em ações e R$ ${rf} mil em renda fixa. As ações caíram ${queda}%. O que o gestor deve fazer?`,
      r: `comprar R$ ${N(r2(alvo - na))} mil em ações, vendendo renda fixa`,
      d: [`vender R$ ${N(r2(alvo - na))} mil em ações`, 'não fazer nada, como no buy and hold', `vender todas as ações`, `comprar R$ ${N(r2(ac * queda / 100))} mil em ações, sem vender renda fixa`],
      x: expl('constant mix: compra o que caiu, vende o que subiu', `Ações: R$ ${N(na)} mil; total: R$ ${N(total)} mil; meta de ${ac}% = R$ ${N(r2(alvo))} mil.`, `Comprar R$ ${N(r2(alvo - na))} mil em ações.`),
    };
  },
  // 6. dominância
  (r) => {
    const [ra, sa, rb, sb] = r.pick([[12, 8, 10, 10], [15, 12, 14, 15], [9, 5, 8, 6]]);
    return {
      e: `Ativo A: retorno esperado ${ra}% e risco ${sa}%. Ativo B: retorno esperado ${rb}% e risco ${sb}%. Pelo princípio da dominância, o que se conclui?`,
      r: 'A domina B: oferece mais retorno com menos risco',
      d: ['B domina A, por ter mais risco', 'não é possível comparar', 'os dois são equivalentes', 'A domina B só se a correlação for 1'],
      x: expl('dominância', 'Um ativo domina outro quando tem retorno maior com risco igual ou menor, ou risco menor com retorno igual ou maior.', `A tem ${ra}% > ${rb}% de retorno e ${sa}% < ${sb}% de risco.`),
    };
  },
  // 7. Treynor comparativo
  (r) => {
    const [ra, ba, rb, bb, rf] = r.pick([[16, 1.5, 14, 0.8, 10], [15, 1, 18, 2, 10], [13, 0.5, 17, 1.4, 10]]);
    const A = (ra - rf) / ba, B = (rb - rf) / bb, m = A > B ? 'A' : 'B';
    return {
      e: `Carteira A: retorno ${ra}% e beta ${N(ba)}. Carteira B: retorno ${rb}% e beta ${N(bb)}. Com taxa livre de risco de ${rf}%, qual tem o melhor índice de Treynor?`,
      r: `a carteira ${m} (${ind(Math.max(A, B))} contra ${ind(Math.min(A, B))})`,
      d: [`a carteira ${m === 'A' ? 'B' : 'A'} (${ind(Math.max(A, B))} contra ${ind(Math.min(A, B))})`, 'as duas são iguais', `a carteira ${ra > rb ? 'A' : 'B'}, por ter maior retorno`, `a carteira ${ba < bb ? 'A' : 'B'}, por ter menor beta, independentemente do retorno`],
      x: expl('Treynor = (R − Rf) / β', `A: (${ra} − ${rf}) ÷ ${N(ba)} = ${ind(A)}. B: (${rb} − ${rf}) ÷ ${N(bb)} = ${ind(B)}.`, `Melhor: ${m}.`),
    };
  },
  // 8. volatilidade anual pela diária
  (r) => {
    const d = r.pick([1, 1.5, 2]);
    return {
      e: `Uma ação tem volatilidade diária de ${N(d)}%. Qual é a volatilidade anualizada aproximada, com 252 dias úteis (√252 ≈ 15,87)?`,
      r: d * 15.87,
      d: [d * 252, d * 12, d * 3.46, d * 15.87 * 2],
      f: pc,
      x: expl('σ anual = σ diária · √252', 'O risco escala com a raiz do número de períodos.', `${N(d)}% · 15,87 ≈ ${pc(d * 15.87)}.`),
    };
  },
  // 9. buy and hold
  (r) => {
    const [ac, rf, alta, rfr] = r.pick([[50, 50, 40, 10], [60, 40, 25, 10], [40, 60, 50, 12]]);
    const na = ac * (1 + alta / 100), nr = rf * (1 + rfr / 100);
    const p = (na / (na + nr)) * 100;
    return {
      e: `Na estratégia buy and hold, uma carteira começou com ${ac}% em ações e ${rf}% em renda fixa (R$ 100 mil no total). As ações subiram ${alta}% e a renda fixa rendeu ${rfr}%. Qual é o novo peso das ações?`,
      r: p,
      d: [ac, ac + alta / 4, (na / 100) * 100, 100 - p],
      f: pc,
      x: expl('buy and hold: não rebalanceia', `Ações: R$ ${N(na)} mil; renda fixa: R$ ${N(nr)} mil.`, `Peso das ações: ${pc(p)}. No buy and hold, a classe que mais sobe ganha peso.`),
    };
  },
  // 10. desvio padrão de cenários
  (r) => {
    const [ra, rb] = r.pick([[0, 20], [-10, 30], [5, 15]]);
    const m = (ra + rb) / 2, s = Math.abs(rb - ra) / 2;
    return {
      e: `Um ativo pode render ${ra}% ou ${rb}%, com probabilidades iguais (50% cada). Qual é o desvio padrão do retorno?`,
      r: s,
      d: [rb - ra, m, s * s, s * 2 + 1],
      f: pc,
      x: expl('σ = raiz da média dos desvios ao quadrado', `Média: ${N(m)}%. Cada cenário está a ${N(s)} pontos da média.`, `σ = √(0,5 · ${N(s)}² + 0,5 · ${N(s)}²) = ${pc(s)}.`),
    };
  },
  // 11. CPPI após queda
  (r) => {
    const [v, piso, m, q] = r.pick([[100, 80, 2, 10], [100, 90, 3, 5], [200, 150, 2, 20]]);
    const exp0 = m * (v - piso);
    const v1 = v - (exp0 * q) / 100;
    const exp1 = m * (v1 - piso);
    return {
      e: `Numa CPPI (piso R$ ${piso} mil, multiplicador ${m}), a carteira de R$ ${v} mil tem R$ ${exp0} mil em ações. As ações caem ${q}%. Qual deve ser a nova exposição em ações?`,
      r: exp1,
      d: [exp0, exp0 * (1 - q / 100), m * v1, v1 - piso],
      f: (x) => `R$ ${N(r2(x))} mil`,
      x: expl('CPPI reduz o risco quando a carteira cai', `Perda: ${q}% de R$ ${exp0} mil = R$ ${N((exp0 * q) / 100)} mil. Nova carteira: R$ ${N(v1)} mil; colchão: R$ ${N(v1 - piso)} mil.`, `Exposição: ${m} · ${N(v1 - piso)} = R$ ${N(r2(exp1))} mil.`),
    };
  },
  // 12. retorno ajustado: Sharpe negativo
  (r) => {
    const [ret, rf, s] = r.pick([[8, 10, 4], [9, 11, 5], [6, 10, 8]]);
    return {
      e: `Um fundo rendeu ${ret}% com volatilidade de ${s}%, enquanto a taxa livre de risco foi de ${rf}%. Qual é o índice de Sharpe e o que ele indica?`,
      r: `${ind((ret - rf) / s)}: o fundo rendeu menos que um ativo livre de risco`,
      d: [`${ind(ret / s)}: excelente desempenho`, `${ind((rf - ret) / s)}: o fundo superou o ativo livre de risco`, `zero: o fundo empatou`, `${ind((ret - rf) * s)}: risco baixo`],
      x: expl('Sharpe negativo', `(${ret} − ${rf}) ÷ ${s} = ${ind((ret - rf) / s)}.`, 'Um Sharpe negativo mostra que o investidor teria feito melhor com o ativo sem risco.'),
    };
  },
  // 13. rebalanceamento por bandas
  (r) => {
    const [alvo, banda, atual] = r.pick([[60, 5, 67], [50, 5, 53], [40, 5, 34], [70, 5, 72]]);
    const fora = Math.abs(atual - alvo) > banda;
    return {
      e: `A política de investimento define ${alvo}% em ações, com banda de tolerância de ±${banda} pontos. Hoje as ações representam ${atual}% da carteira. O que fazer?`,
      r: fora ? `rebalancear, porque ${atual}% está fora da faixa de ${alvo - banda}% a ${alvo + banda}%` : `nada por enquanto, porque ${atual}% está dentro da faixa de ${alvo - banda}% a ${alvo + banda}%`,
      d: fora ? [`nada, porque ${atual}% está dentro da faixa`, 'vender todas as ações', 'mudar o perfil do cliente', `rebalancear para ${atual}%`] : [`rebalancear imediatamente, porque ${atual}% ≠ ${alvo}%`, 'vender todas as ações', 'mudar o perfil do cliente', 'comprar mais ações até 100%'],
      x: expl('rebalanceamento por percentual (bandas)', 'Em vez de rebalancear em datas fixas, só se age quando o peso sai da faixa tolerada, o que reduz custos e impostos.', `Faixa: ${alvo - banda}% a ${alvo + banda}%.`),
    };
  },
  // 14. retorno esperado e risco sistemático
  (r) => {
    const b = r.pick([0, 1, 2]);
    return {
      e: `Pelo CAPM, um ativo com beta ${b} deve ter retorno esperado igual a quanto, se a taxa livre de risco é 10% e o mercado deve render 15%?`,
      r: 10 + b * 5,
      d: [15, 10 + b * 15, 10 - b * 5 + 1, 15 * b + 1],
      f: pc,
      x: expl('E(R) = Rf + β · (Rm − Rf)', `10% + ${b} · 5%.`, `= ${10 + b * 5}%. ${b === 0 ? 'Beta zero: só a taxa livre de risco.' : b === 1 ? 'Beta 1: o mesmo retorno do mercado.' : 'Beta 2: o dobro do prêmio de risco.'}`),
    };
  },
  // 15. ganho de diversificação com correlação zero
  (r) => {
    const n = r.pick([4, 9, 16, 25]), s = r.pick([20, 30]);
    return {
      e: `Uma carteira é dividida igualmente entre ${n} ativos independentes (correlação zero), todos com volatilidade de ${s}%. Qual é a volatilidade da carteira?`,
      r: s / Math.sqrt(n),
      d: [s, s / n, s * Math.sqrt(n) / n * 2, s - n],
      f: pc,
      x: expl('com correlação zero, σ = σ_individual / √n', `√${n} = ${Math.sqrt(n)}.`, `${s}% ÷ ${Math.sqrt(n)} = ${pc(s / Math.sqrt(n))}. Na prática, o risco sistemático não some, porque os ativos costumam ter correlação positiva.`),
    };
  },
  // 16. alavancagem e retorno
  (r) => {
    const [ret, custo, al] = r.pick([[15, 10, 2], [20, 12, 2], [8, 10, 2]]);
    const e = al * ret - (al - 1) * custo;
    return {
      e: `Um investidor aplica R$ 100 mil próprios e mais R$ ${100 * (al - 1)} mil emprestados a ${custo}% ao ano num ativo que rende ${ret}%. Qual é o retorno sobre o capital próprio?`,
      r: e,
      d: [ret, ret * al, ret - custo, e + custo],
      f: pc,
      x: expl('alavancagem amplia ganhos e perdas', `Ganho: ${al * 100} mil · ${ret}% = R$ ${N(al * ret)} mil; juros: R$ ${N((al - 1) * custo)} mil.`, `Líquido sobre R$ 100 mil: ${pc(e)}. ${ret < custo ? 'Como o ativo rendeu menos que o custo da dívida, a alavancagem piorou o resultado.' : ''}`),
    };
  },
  // 17. retorno histórico × esperado
  (r) => {
    const [a, b, c, d] = r.pick([[10, 20, -5, 15], [8, 12, 4, 16], [-10, 30, 20, 0]]);
    const m = (a + b + c + d) / 4;
    return {
      e: `Os retornos anuais de um fundo nos últimos quatro anos foram ${a}%, ${b}%, ${c}% e ${d}%. Qual é o retorno médio aritmético histórico?`,
      r: m,
      d: [a + b + c + d, m + 2, (Math.max(a, b, c, d) + Math.min(a, b, c, d)) / 2 + 1, d],
      f: pc,
      x: expl('média aritmética = soma ÷ número de períodos', `(${a} + ${b} + ${c} + ${d}) ÷ 4.`, `= ${pc(m)}. Retorno histórico não garante o retorno futuro.`),
    };
  },
];

const dificil = [
  // 1. correlação −1: carteira sem risco
  (r) => {
    const [s1, s2] = r.pick([[20, 10], [30, 10], [15, 5]]);
    const w = (s2 / (s1 + s2)) * 100;
    return {
      e: `Dois ativos têm volatilidades de ${s1}% e ${s2}% e correlação −1. Que percentual no primeiro ativo elimina totalmente o risco da carteira?`,
      r: w,
      d: [50, 100 - w, (s1 / (s1 + s2)) * 100 + 0.5, s2],
      f: pc,
      x: expl('correlação −1 permite risco zero', `Basta que w₁·σ₁ = w₂·σ₂: w₁ = σ₂/(σ₁ + σ₂) = ${s2}/${s1 + s2}.`, `w₁ = ${pc(w)}. Na prática, correlação −1 perfeita é rara.`),
    };
  },
  // 2. Sharpe × Treynor: carteira pouco diversificada
  (r) => {
    const [ret, rf, s, b] = r.pick([[16, 10, 20, 1], [15, 10, 25, 0.8]]);
    return {
      e: `Uma carteira concentrada rendeu ${ret}%, com volatilidade de ${s}% e beta ${N(b)}; a taxa livre de risco foi ${rf}%. Seus índices de Sharpe e de Treynor são, respectivamente:`,
      r: `${ind((ret - rf) / s)} e ${ind((ret - rf) / b)}`,
      d: [`${ind((ret - rf) / b)} e ${ind((ret - rf) / s)}`, `${ind(ret / s)} e ${ind(ret / b)}`, `${ind((ret - rf) * s)} e ${ind((ret - rf) * b)}`, `${ind((ret - rf) / s)} e ${ind(ret / b)}`],
      x: expl('Sharpe usa o risco total; Treynor, só o sistemático', `Sharpe: ${ret - rf} ÷ ${s}; Treynor: ${ret - rf} ÷ ${N(b)}.`, 'Em carteiras pouco diversificadas, o risco total é muito maior que o sistemático; por isso o Sharpe é a medida mais adequada para elas.'),
    };
  },
  // 3. carteira com ativo livre de risco
  (r) => {
    const [w, s, rf, rr] = r.pick([[60, 20, 10, 16], [50, 30, 10, 20], [70, 10, 10, 14]]);
    const ret = (w * rr + (100 - w) * rf) / 100, vol = (w * s) / 100;
    return {
      e: `Uma carteira tem ${w}% num fundo de ações (retorno esperado ${rr}%, volatilidade ${s}%) e ${100 - w}% num título livre de risco (${rf}%). Quais são o retorno esperado e a volatilidade da carteira?`,
      r: `${pc(ret)} e ${pc(vol)}`,
      d: [`${pc(ret)} e ${pc(s)}`, `${pc((rr + rf) / 2)} e ${pc(s / 2)}`, `${pc(rr)} e ${pc(vol)}`, `${pc(ret)} e ${pc(Math.sqrt(vol))}`],
      x: expl('o ativo livre de risco não tem volatilidade nem correlação', `Retorno: ${N(w / 100)} · ${rr} + ${N((100 - w) / 100)} · ${rf} = ${pc(ret)}. Volatilidade: ${N(w / 100)} · ${s} = ${pc(vol)}.`, 'O Sharpe da carteira é igual ao do fundo de ações.'),
    };
  },
  // 4. risco sistemático e não sistemático
  (r) => {
    const [tot, sis] = r.pick([[25, 15], [30, 18], [20, 12]]);
    const nao = Math.sqrt(tot * tot - sis * sis);
    return {
      e: `Uma ação tem volatilidade total de ${tot}%, dos quais o componente sistemático é ${sis}%. Qual é o risco não sistemático (diversificável), sabendo que as variâncias se somam?`,
      r: nao,
      d: [tot - sis, tot + sis, Math.sqrt(tot * tot + sis * sis), sis],
      f: pc,
      x: expl('σ²_total = σ²_sistemático + σ²_não sistemático', `${tot}² − ${sis}² = ${tot * tot - sis * sis}.`, `√${tot * tot - sis * sis} = ${pc(nao)}. Essa parte pode ser reduzida com diversificação.`),
    };
  },
  // 5. rebalanceamento com IR
  (r) => {
    const [vend, pm, preco] = r.pick([[20, 30, 45], [30, 20, 25], [50, 40, 60]]);
    const lucro = vend * (1 - pm / preco);
    return {
      e: `Para rebalancear, um investidor vende R$ ${vend} mil em ações compradas a R$ ${pm} e vendidas a R$ ${preco}. Numa operação comum, com vendas acima de R$ 20 mil no mês, qual é o IR?`,
      r: lucro * 0.15,
      d: [vend * 0.15, lucro * 0.2, 0, lucro],
      f: (v) => `R$ ${N(r2(v))} mil`,
      x: expl('o imposto é custo do rebalanceamento', `Lucro = ${vend} mil · (1 − ${pm}/${preco}) = R$ ${N(r2(lucro))} mil.`, `15% · ${N(r2(lucro))} = R$ ${N(r2(lucro * 0.15))} mil. Rebalancear com novos aportes pode evitar esse custo.`),
    };
  },
  // 6. CAPM: ativo sub ou sobreavaliado
  (r) => {
    const [rf, b, rm, esp] = r.pick([[10, 1.2, 15, 18], [10, 1.5, 14, 14], [9, 0.8, 14, 11]]);
    const req = rf + b * (rm - rf);
    const cond = esp > req ? 'barato (subavaliado): retorno esperado acima do exigido' : esp < req ? 'caro (sobreavaliado): retorno esperado abaixo do exigido' : 'no preço justo';
    return {
      e: `Um analista espera retorno de ${esp}% para uma ação de beta ${N(b)}. A taxa livre de risco é ${rf}% e o mercado deve render ${rm}%. Pelo CAPM, a ação parece:`,
      r: cond,
      d: ['barato (subavaliado): retorno esperado acima do exigido', 'caro (sobreavaliado): retorno esperado abaixo do exigido', 'no preço justo', 'impossível de avaliar sem o desvio padrão', 'sem risco'].filter((t) => t !== cond),
      x: expl('compare o esperado com o exigido', `Exigido: ${rf} + ${N(b)} · (${rm} − ${rf}) = ${pc(req)}.`, `Esperado: ${esp}%. ${esp > req ? 'Acima do exigido.' : esp < req ? 'Abaixo do exigido.' : 'Igual ao exigido.'}`),
    };
  },
  // 7. volatilidade com 3 meses
  (r) => {
    const m = r.pick([4, 6, 8]);
    return {
      e: `Um ativo tem volatilidade mensal de ${m}%. Qual é a volatilidade aproximada em um trimestre (√3 ≈ 1,73)?`,
      r: m * 1.73,
      d: [m * 3, m, m * 1.73 * 1.73, m / 1.73],
      f: pc,
      x: expl('σ do período = σ mensal · √(número de meses)', 'Para retornos independentes, a variância soma; o desvio padrão cresce com a raiz.', `${m}% · 1,73 ≈ ${pc(m * 1.73)}.`),
    };
  },
  // 8. constant mix × buy and hold em mercado oscilante
  (r) => ({
    e: `Num mercado que sobe e desce várias vezes, sem tendência clara, qual estratégia tende a se sair melhor: constant mix ou buy and hold? ${r.pick(['', 'Considere a mesma alocação inicial.'])}`,
    r: 'constant mix, porque vende depois das altas e compra depois das quedas',
    d: ['buy and hold, porque nunca opera', 'são sempre iguais', 'CPPI, que compra nas quedas', 'nenhuma, porque só ativos sem risco funcionam'],
    x: expl('estratégias de rebalanceamento', 'Constant mix é "contra a tendência": ganha em mercados oscilantes. CPPI é "a favor da tendência": compra nas altas e vende nas quedas, indo melhor em tendências fortes. Buy and hold fica no meio.', ''),
  }),
  // 9. alavancagem negativa
  (r) => {
    const [ret, custo] = r.pick([[-10, 10], [5, 12], [-20, 8]]);
    const e = 2 * ret - custo;
    return {
      e: `Um investidor usa R$ 100 mil próprios e R$ 100 mil emprestados a ${custo}% ao ano num ativo que rende ${ret}%. Qual é o retorno sobre o capital próprio?`,
      r: e,
      d: [ret, 2 * ret, ret - custo, 2 * ret + custo],
      f: pc,
      x: expl('alavancagem amplia as perdas também', `Resultado do ativo: 200 mil · ${ret}% = R$ ${N(2 * ret)} mil; juros: R$ ${custo} mil.`, `Sobre R$ 100 mil: ${pc(e)}.`),
    };
  },
  // 10. Sharpe e alavancagem
  (r) => {
    const [ret, rf, s] = r.pick([[16, 10, 12], [14, 10, 8]]);
    const sh = (ret - rf) / s;
    return {
      e: `Uma carteira tem Sharpe ${ind(sh)} (retorno ${ret}%, volatilidade ${s}%, livre de risco ${rf}%). Se o investidor aplicar 50% nela e 50% no ativo livre de risco, qual será o Sharpe da nova carteira?`,
      r: sh,
      d: [sh / 2, sh * 2, (ret - rf) / (s / 2) / 4, 0],
      f: ind,
      x: expl('combinar com o ativo livre de risco não muda o Sharpe', `Retorno: ${N((ret + rf) / 2)}%; volatilidade: ${N(s / 2)}%.`, `(${N((ret + rf) / 2)} − ${rf}) ÷ ${N(s / 2)} = ${ind(sh)}. Muda o risco, não a eficiência.`),
    };
  },
  // 11. correlação e diversificação
  (r) => {
    const rho = r.pick([0, 0.5, -0.5]);
    const s = Math.sqrt(0.25 * 400 + 0.25 * 400 + 2 * 0.25 * 400 * rho);
    return {
      e: `Dois ativos com volatilidade de 20% cada são combinados em 50% e 50%. Com correlação de ${N(rho)}, qual é a volatilidade da carteira?`,
      r: s,
      d: [20, 10, 20 * (1 + rho) / 2 + 2, 0],
      f: pc,
      x: expl('σ² = (0,5·20)² + (0,5·20)² + 2·(0,5·20)·(0,5·20)·ρ', `100 + 100 + 200 · ${N(rho)} = ${N(r2(s * s))}.`, `σ = ${pc(s)}. Quanto menor a correlação, maior o benefício da diversificação.`),
    };
  },
  // 12. cenários: retorno e desvio
  (r) => {
    const [r1, r2_] = r.pick([[-10, 30], [0, 20], [-20, 40]]);
    const e = (r1 + r2_) / 2;
    return {
      e: `Num cenário ruim (50%), uma ação rende ${r1}%; num bom (50%), ${r2_}%. Um CDB rende 10% sem risco. O que se pode dizer da ação em relação ao CDB?`,
      r: `retorno esperado de ${pc(e)}, com desvio padrão de ${pc((r2_ - r1) / 2)}`,
      d: [`retorno garantido de ${pc(e)}`, `retorno esperado de ${pc(r2_)}, sem risco`, `retorno esperado de ${pc(e)}, com desvio padrão de ${pc(r2_ - r1)}`, `retorno esperado de ${pc(r1)}`],
      x: expl('retorno esperado e risco', `E = 0,5 · ${r1} + 0,5 · ${r2_} = ${pc(e)}. Cada cenário fica a ${N((r2_ - r1) / 2)} pontos da média.`, e > 10 ? 'A ação oferece um prêmio sobre o CDB, com risco.' : 'A ação não oferece prêmio sobre o CDB e ainda tem risco: o CDB domina.'),
    };
  },
  // 13. beta de carteira com renda fixa
  (r) => {
    const [w, b] = r.pick([[60, 1.2], [40, 1.5], [80, 1]]);
    return {
      e: `Uma carteira tem ${w}% num fundo de ações com beta ${N(b)} e ${100 - w}% em títulos pós-fixados (beta zero em relação ao Ibovespa). Qual é o beta da carteira?`,
      r: (w * b) / 100,
      d: [b, (b + 0) / 2, w * b, 1],
      f: ind,
      x: expl('beta da carteira = média ponderada', `${N(w / 100)} · ${N(b)} + ${N((100 - w) / 100)} · 0.`, `= ${ind((w * b) / 100)}. A renda fixa reduz a sensibilidade da carteira à bolsa.`),
    };
  },
  // 14. retorno real necessário para meta
  (r) => {
    const [ipca, real] = r.pick([[4, 5], [5, 4], [3.5, 6]]);
    const nom = ((1 + ipca / 100) * (1 + real / 100) - 1) * 100;
    return {
      e: `Para cumprir o objetivo de um cliente, a carteira precisa de um ganho real de ${real}% ao ano. Com inflação esperada de ${N(ipca)}%, qual rentabilidade nominal é necessária?`,
      r: nom,
      d: [ipca + real, real, real - ipca, nom * 1.1],
      f: pc,
      x: expl('Fisher ao contrário', `(1 + ${N(ipca / 100, 3)}) · (1 + ${N(real / 100)}) − 1.`, `≈ ${pc(nom)} ao ano, antes de impostos e taxas.`),
    };
  },
  // 15. tracking: risco relativo
  (r) => {
    const [ra, rb] = r.pick([[12, 10], [8, 11], [15, 15]]);
    return {
      e: `Um fundo passivo de Ibovespa rendeu ${ra}%, enquanto o índice rendeu ${rb}%. Para um fundo passivo, o que essa diferença representa?`,
      r: `um erro de acompanhamento de ${N(Math.abs(ra - rb))} pontos, que um fundo passivo busca minimizar`,
      d: ['um excelente desempenho a ser buscado', 'o retorno ativo que o gestor deve maximizar', 'o índice de Sharpe do fundo', 'o beta do fundo'],
      x: expl('risco relativo', 'Fundos passivos querem replicar o índice. Diferenças (para mais ou para menos) indicam risco relativo, custos ou falhas de replicação.', `Diferença: ${N(ra - rb)} pontos.`),
    };
  },
  // 16. Sharpe com taxa de administração
  (r) => {
    const [bruto, taxa, rf, s] = r.pick([[16, 2, 10, 8], [15, 1, 10, 10], [18, 3, 10, 10]]);
    const a = (bruto - rf) / s, b = (bruto - taxa - rf) / s;
    return {
      e: `A carteira de um fundo rendeu ${bruto}% brutos, com volatilidade de ${s}%. O fundo cobra ${taxa}% de taxa de administração e a taxa livre de risco é ${rf}%. Qual é o Sharpe do cotista (líquido de taxa)?`,
      r: b,
      d: [a, (bruto - taxa) / s, b * 2, (bruto - rf - taxa) * s],
      f: ind,
      x: expl('custos reduzem o Sharpe', `Retorno líquido: ${bruto} − ${taxa} = ${bruto - taxa}%.`, `(${bruto - taxa} − ${rf}) ÷ ${s} = ${ind(b)}, contra ${ind(a)} antes da taxa.`),
    };
  },
];

export default [
  {
    disciplina: 'c-pro-r',
    arquivo: '10-risco-retorno-e-performance',
    titulo: 'Risco, retorno e performance de carteiras',
    provas: ['Certificações'],
    descricao: 'Retorno esperado, desvio padrão, correlação e diversificação, beta e CAPM, índices de Sharpe e Treynor, dominância, alavancagem e estratégias de rebalanceamento (buy and hold, constant mix, CPPI).',
    unico: true,
    niveis: [facil, medio, dificil],
  },
];
