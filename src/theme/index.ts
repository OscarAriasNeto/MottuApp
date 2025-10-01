export type AppTheme = {
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    danger: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  fontSizes: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
};

export const lightTheme: AppTheme = {
  colors: {
    background: '#F4F6F8',
    surface: '#FFFFFF',
    primary: '#16A34A',
    secondary: '#0EA5E9',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    success: '#22C55E',
    danger: '#EF4444',
  },
  spacing: {
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
  fontSizes: {
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
  },
};

export const darkTheme: AppTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    border: '#334155',
  },
};
