import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';

import { AppTheme, darkTheme, lightTheme } from './index';

type ThemeContextValue = {
  theme: AppTheme;
  navigationTheme: NavigationTheme;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  navigationTheme: DefaultTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const value = useMemo<ThemeContextValue>(() => {
    const palette = colorScheme === 'dark' ? darkTheme : lightTheme;
    const navigationTheme: NavigationTheme = {
      ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
      colors: {
        ...(colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
        primary: palette.colors.primary,
        background: palette.colors.background,
        card: palette.colors.surface,
        text: palette.colors.text,
        border: palette.colors.border,
        notification: palette.colors.secondary,
      },
    };

    return { theme: palette, navigationTheme };
  }, [colorScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
