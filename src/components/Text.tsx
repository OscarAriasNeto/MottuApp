import React from 'react';
import styled from 'styled-components/native';
import { TextProps as RNTextProps } from 'react-native';

import type { Theme } from '../theme';

export type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

type TextWeight = 'regular' | 'medium' | 'bold';

type FontSizeKey = keyof Theme['fontSizes'];
type ColorKey = keyof Theme['colors'];

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: ColorKey;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, { size: FontSizeKey }> = {
  title: { size: 'xl' },
  subtitle: { size: 'lg' },
  body: { size: 'md' },
  caption: { size: 'sm' },
};

const StyledText = styled.Text<{ variant: TextVariant; weight: TextWeight; colorKey?: ColorKey }>`
  font-size: ${({ theme, variant }) => theme.fontSizes[variantStyles[variant].size]}px;
  font-family: ${({ theme, weight }) =>
    weight === 'bold' ? theme.fonts.bold : weight === 'medium' ? theme.fonts.medium : theme.fonts.regular};
  color: ${({ theme, colorKey }) => (colorKey ? theme.colors[colorKey] : theme.colors.text)};
`;

export function Text({ variant = 'body', weight = 'regular', color, children, ...rest }: TextProps) {
  return (
    <StyledText accessibilityRole="text" variant={variant} weight={weight} colorKey={color} {...rest}>
      {children}
    </StyledText>
  );
}
