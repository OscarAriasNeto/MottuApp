import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { clearAuth, getAuth, saveAuth } from '../storage/authStorage';
import { User } from '../types/user';

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  signIn: async () => undefined,
  signOut: async () => undefined,
  register: async () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await getAuth();
        if (stored) {
          setUser({ id: stored.id, email: stored.email, name: stored.name, token: stored.token });
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const stored = await getAuth();
    if (!stored) {
      Alert.alert('Conta não encontrada', 'Cadastre-se para acessar o aplicativo.');
      return;
    }

    if (stored.email !== email || stored.password !== password) {
      Alert.alert('Credenciais inválidas', 'Verifique e tente novamente.');
      return;
    }

    setUser({ id: stored.id, name: stored.name, email: stored.email, token: stored.token });
  }, []);

  const register = useCallback(
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
      const token = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const data = { id: `${Date.now()}`, name, email, token, password };
      await saveAuth(data);
      setUser({ id: data.id, name: data.name, email: data.email, token: data.token });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await clearAuth();
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, signIn, signOut, register }}>{children}</AuthContext.Provider>;
}
