import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthCredentials, AuthResponse, User } from '../types/user';
import * as authService from '../services/api/auth';
import { TOKEN_STORAGE_KEY, setAuthorizationToken } from '../services/api/client';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (payload: User & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        const storedUser = await authService.getStoredUser();
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          await setAuthorizationToken(storedToken);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const persistAuth = useCallback(async ({ token: newToken, user: newUser }: AuthResponse) => {
    setToken(newToken);
    setUser(newUser);
    await setAuthorizationToken(newToken);
  }, []);

  const handleLogin = useCallback(
    async (credentials: AuthCredentials) => {
      setIsLoading(true);
      try {
        const response = await authService.login(credentials);
        await persistAuth(response);
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth],
  );

  const handleRegister = useCallback(
    async (payload: User & { password: string }) => {
      setIsLoading(true);
      try {
        const response = await authService.register(payload);
        await persistAuth(response);
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth],
  );

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setToken(null);
      setUser(null);
      await setAuthorizationToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [handleLogin, handleLogout, handleRegister, isLoading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
