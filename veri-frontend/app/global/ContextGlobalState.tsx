'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { User } from '@/types/user';
import { GlobalState } from '@/types/global';



const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [userOnline, setUserOnline] = useState<User | null>(null);

  const isAutenticado = () => !!userOnline;

  const value = useMemo(() => ({
    userOnline,
    setUserOnline,
    isAutenticado
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
