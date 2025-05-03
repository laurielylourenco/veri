'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { User } from '@/types/user';
import { GlobalState } from '@/types/global';

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [userOnline, setUserOnlineState] = useState<User | null>(null);

  // Função para persistir o usuário
  const setUserOnline = (user: User | null) => {
    setUserOnlineState(user);
    if (user) {
      localStorage.setItem('userOnline', JSON.stringify(user));
    } else {
      localStorage.removeItem('userOnline');
    }
  };

  // Carregar do localStorage no início
  useEffect(() => {
    const storedUser = localStorage.getItem('userOnline');
    if (storedUser) {
      try {
        setUserOnlineState(JSON.parse(storedUser));
      } catch {
        setUserOnlineState(null);
      }
    }
  }, []);

  const isAutenticado = () => !!userOnline;

  const value = useMemo(() => ({
    userOnline,
    setUserOnline,
    isAutenticado,
  }), [userOnline]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState deve ser usado dentro de GlobalStateProvider');
  }
  return context;
};
