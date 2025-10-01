import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    primary: '#0F9D58',
    secondary: '#00ACC1',
    text: '#1C1C28',
    textSecondary: '#596275',
    border: '#E1E5EC',
    success: '#2ECC71',
    danger: '#E74C3C',
    warning: '#F39C12',
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 6,
    md: 12,
    lg: 20,
    pill: 999,
  },
  shadows: {
    soft: {
      shadowColor: 'rgba(15, 25, 40, 0.12)',
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 6,
    },
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textSecondary: '#94A3B8',
    border: '#334155',
  },
};

export type Theme = typeof lightTheme;
