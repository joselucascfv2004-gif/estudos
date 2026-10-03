import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { hoje } from './datas';
import { atualizarLembretes } from './lembretes';
import { Progresso, estadoInicial, normalizar, verificarOfensiva } from './progresso';

const CHAVE = 'estudos:progresso:v1';

type Aviso = { tipo: 'protetor' | 'perdeu'; dias?: number } | null;

type Valor = {
  carregado: boolean;
  p: Progresso;
  atualizar: (f: (p: Progresso) => Progresso) => void;
  aviso: Aviso;
  limparAviso: () => void;
  apagarTudo: () => Promise<void>;
};

const Ctx = createContext<Valor | null>(null);

export function ProgressoProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<Progresso>(estadoInicial);
  const [carregado, setCarregado] = useState(false);
  const [aviso, setAviso] = useState<Aviso>(null);
  const diaVerificado = useRef<string | null>(null);

  const checar = useCallback((estado: Progresso) => {
    const dia = hoje();
    if (diaVerificado.current === dia) return estado;
    diaVerificado.current = dia;
    const r = verificarOfensiva(estado, dia);
    if (r.usouProtetores) setAviso({ tipo: 'protetor', dias: r.usouProtetores });
    else if (r.perdeu) setAviso({ tipo: 'perdeu' });
    return r.p;
  }, []);

  useEffect(() => {
    (async () => {
      let salvo: Partial<Progresso> | null = null;
      try {
        const txt = await AsyncStorage.getItem(CHAVE);
        salvo = txt ? JSON.parse(txt) : null;
      } catch {
        salvo = null;
      }
      setP(checar(normalizar(salvo)));
      setCarregado(true);
    })();
  }, [checar]);

  // Ao voltar para o app num novo dia, verifica a ofensiva de novo.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => {
      if (st === 'active') setP((atual) => checar(atual));
    });
    return () => sub.remove();
  }, [checar]);

  useEffect(() => {
    if (!carregado) return;
    AsyncStorage.setItem(CHAVE, JSON.stringify(p)).catch(() => {});
  }, [p, carregado]);

  // Reagenda os lembretes (o texto de cada dia depende das revisões e da data da prova).
  const ultimo = useRef(p);
  ultimo.current = p;
  useEffect(() => {
    if (!carregado) return;
    const t = setTimeout(() => atualizarLembretes(ultimo.current), 1500);
    return () => clearTimeout(t);
  }, [carregado, p.lembrete.ativo, p.lembrete.hora, p.lembrete.minuto, p.totalLicoes, p.dataProva, p.nomeProva, p.prova, p.lingua, p.ofensiva.ultimoDia]);
  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => {
      if (st === 'active') atualizarLembretes(ultimo.current);
    });
    return () => sub.remove();
  }, []);

  const atualizar = useCallback((f: (p: Progresso) => Progresso) => setP((atual) => f(atual)), []);

  const apagarTudo = useCallback(async () => {
    await AsyncStorage.removeItem(CHAVE).catch(() => {});
    diaVerificado.current = null;
    setP(estadoInicial());
  }, []);

  const valor = useMemo(
    () => ({ carregado, p, atualizar, aviso, limparAviso: () => setAviso(null), apagarTudo }),
    [carregado, p, atualizar, aviso, apagarTudo],
  );
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useProgresso() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useProgresso fora do ProgressoProvider');
  return v;
}
