// Técnica Pomodoro: blocos de foco (25 min) intercalados com pausas curtas (5 min) e, a cada 4
// focos, uma pausa longa (15 min). O relógio continua contando enquanto o aluno usa o app (lições,
// aulas, flashcards) e um aviso no celular toca no fim de cada fase, mesmo com o app fechado.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Vibration } from 'react-native';

import { avisarFimPomodoro, cancelarAvisoPomodoro } from './lembretes';
import { useProgresso } from './ProgressoContext';
import { registrarPomodoro } from './progresso';

export type FasePomodoro = 'foco' | 'pausa' | 'longa';
export type ConfigPomodoro = { foco: number; pausa: number; longa: number };

/** Combinações de tempo (em minutos) que o aluno pode escolher. */
export const RITMOS: { nome: string; config: ConfigPomodoro }[] = [
  { nome: 'Clássico', config: { foco: 25, pausa: 5, longa: 15 } },
  { nome: 'Curto', config: { foco: 15, pausa: 3, longa: 10 } },
  { nome: 'Longo', config: { foco: 50, pausa: 10, longa: 20 } },
];
/** Focos antes de uma pausa longa. */
export const FOCOS_ATE_PAUSA_LONGA = 4;

export const NOMES_FASE: Record<FasePomodoro, string> = { foco: 'Foco', pausa: 'Pausa curta', longa: 'Pausa longa' };

type Estado = {
  fase: FasePomodoro | null;
  /** quando a fase termina (ms); null se pausado ou parado */
  fimEm: number | null;
  /** ms que faltavam quando o aluno pausou */
  restantePausado: number | null;
  /** focos concluídos nesta sequência */
  ciclos: number;
  /** fase que acabou e espera o aluno começar a próxima */
  terminou: FasePomodoro | null;
};

type Valor = Estado & {
  config: ConfigPomodoro;
  restante: number;
  iniciar: (fase?: FasePomodoro) => void;
  pausar: () => void;
  retomar: () => void;
  pular: () => void;
  parar: () => void;
  mudarConfig: (c: ConfigPomodoro) => void;
};

const CHAVE = 'estudos:pomodoro:v1';
const Ctx = createContext<Valor | null>(null);
const inicial: Estado = { fase: null, fimEm: null, restantePausado: null, ciclos: 0, terminou: null };

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const { atualizar } = useProgresso();
  const [estado, setEstado] = useState<Estado>(inicial);
  const [config, setConfig] = useState<ConfigPomodoro>(RITMOS[0].config);
  const [agora, setAgora] = useState(Date.now());
  const aviso = useRef<string | null>(null);
  // estado atual para as ações (efeitos colaterais ficam fora das funções de atualização)
  const estadoRef = useRef(estado);
  estadoRef.current = estado;

  // lembra o ritmo escolhido e uma fase em andamento (se o app for fechado e aberto de novo)
  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((txt) => {
        if (!txt) return;
        const salvo = JSON.parse(txt) as { config?: ConfigPomodoro; estado?: Estado; aviso?: string | null };
        if (salvo.config) setConfig(salvo.config);
        if (salvo.estado) setEstado(salvo.estado);
        aviso.current = salvo.aviso ?? null;
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(CHAVE, JSON.stringify({ config, estado, aviso: aviso.current })).catch(() => {});
  }, [config, estado]);

  const minutos = useCallback((f: FasePomodoro) => config[f] * 60_000, [config]);

  const agendarAviso = useCallback((fase: FasePomodoro, fimEm: number) => {
    cancelarAvisoPomodoro(aviso.current);
    aviso.current = null;
    const [titulo, texto] =
      fase === 'foco' ? ['Foco concluído!', 'Hora de uma pausa. Levante, beba água e descanse a vista.'] : ['Pausa terminada', 'Bora para o próximo bloco de foco?'];
    avisarFimPomodoro(new Date(fimEm), titulo, texto).then((id) => (aviso.current = id));
  }, []);

  const iniciar = useCallback(
    (fase: FasePomodoro = 'foco') => {
      const fimEm = Date.now() + minutos(fase);
      setEstado((e) => ({ ...e, fase, fimEm, restantePausado: null, terminou: null }));
      agendarAviso(fase, fimEm);
    },
    [minutos, agendarAviso],
  );

  const pausar = useCallback(() => {
    setEstado((e) => (e.fimEm ? { ...e, fimEm: null, restantePausado: Math.max(0, e.fimEm - Date.now()) } : e));
    cancelarAvisoPomodoro(aviso.current);
    aviso.current = null;
  }, []);

  const retomar = useCallback(() => {
    const e = estadoRef.current;
    if (!e.fase || e.restantePausado == null) return;
    const fimEm = Date.now() + e.restantePausado;
    agendarAviso(e.fase, fimEm);
    setEstado({ ...e, fimEm, restantePausado: null });
  }, [agendarAviso]);

  const parar = useCallback(() => {
    cancelarAvisoPomodoro(aviso.current);
    aviso.current = null;
    setEstado(inicial);
  }, []);

  /** Termina a fase atual: foco concluído conta um pomodoro e emenda a pausa (curta ou longa). */
  const encerrarFase = useCallback(
    (contar: boolean) => {
      const e = estadoRef.current;
      if (!e.fase) return;
      if (e.fase === 'foco') {
        const ciclos = e.ciclos + (contar ? 1 : 0);
        if (contar) atualizar((p) => registrarPomodoro(p));
        const pausa: FasePomodoro = ciclos > 0 && ciclos % FOCOS_ATE_PAUSA_LONGA === 0 ? 'longa' : 'pausa';
        const fimEm = Date.now() + minutos(pausa);
        agendarAviso(pausa, fimEm);
        const novo: Estado = { ...e, fase: pausa, fimEm, restantePausado: null, ciclos, terminou: 'foco' };
        estadoRef.current = novo;
        setEstado(novo);
        return;
      }
      // fim da pausa: espera o aluno começar o próximo foco
      const novo: Estado = { ...e, fase: null, fimEm: null, restantePausado: null, terminou: e.fase };
      estadoRef.current = novo;
      setEstado(novo);
    },
    [atualizar, minutos, agendarAviso],
  );

  const pular = useCallback(() => {
    cancelarAvisoPomodoro(aviso.current);
    aviso.current = null;
    encerrarFase(false);
  }, [encerrarFase]);

  // relógio: atualiza a cada segundo enquanto há fase correndo
  useEffect(() => {
    if (!estado.fimEm) return;
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [estado.fimEm]);
  useEffect(() => {
    if (estado.fimEm && agora >= estado.fimEm) {
      Vibration.vibrate([0, 400, 200, 400]);
      aviso.current = null; // o aviso do celular já tocou
      encerrarFase(true);
    }
  }, [agora, estado.fimEm, encerrarFase]);

  const restante = estado.fimEm ? Math.max(0, estado.fimEm - agora) : (estado.restantePausado ?? (estado.fase ? minutos(estado.fase) : minutos('foco')));

  const valor = useMemo(
    () => ({ ...estado, config, restante, iniciar, pausar, retomar, pular, parar, mudarConfig: setConfig }),
    [estado, config, restante, iniciar, pausar, retomar, pular, parar],
  );
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function usePomodoro(): Valor {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePomodoro fora do PomodoroProvider');
  return v;
}

export const formatarTempo = (ms: number) => {
  const s = Math.ceil(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};
