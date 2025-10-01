import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import { Text } from './Text';

interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const StyledButton = styled.Pressable<{ variant: 'primary' | 'secondary' | 'ghost'; disabled?: boolean }>`
  min-height: 48px;
  padding: ${({ theme }) => `${theme.space.sm}px ${theme.space.lg}px`};
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.secondary
        : 'transparent'};
  border-width: ${({ variant }) => (variant === 'ghost' ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.colors.border};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export function Button({ title, onPress, variant = 'primary', disabled, loading, accessibilityLabel, style }: ButtonProps) {
  const theme = useTheme();
  const indicatorColor = variant === 'ghost' ? theme.colors.primary : theme.colors.surface;
  const textColor = variant === 'ghost' ? 'primary' : 'surface';

  return (
    <StyledButton
      onPress={onPress}
      variant={variant}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      disabled={disabled || loading}
      style={style}
    >
      <LabelWrapper>
        {loading && <ActivityIndicator color={indicatorColor} style={{ marginRight: theme.space.sm }} />}
        <Text variant="body" weight="medium" color={textColor}>
          {title}
        </Text>
      </LabelWrapper>
    </StyledButton>
  );
}
