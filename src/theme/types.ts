import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      primary: string;
      secondary: string;
      text: string;
      textSecondary: string;
      border: string;
      success: string;
      danger: string;
      warning: string;
    };
    fonts: {
      regular: string;
      medium: string;
      bold: string;
    };
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    space: {
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
    shadows: {
      soft: {
        shadowColor: string;
        shadowOpacity: number;
        shadowOffset: { width: number; height: number };
        shadowRadius: number;
        elevation: number;
      };
    };
  }
}
