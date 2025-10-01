import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { useAppTheme } from '../theme/ThemeProvider';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
};

export function Button({ title, onPress, variant = 'primary', loading = false, disabled = false }: ButtonProps) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const isDisabled = disabled || loading;

  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
      ? colors.secondary
      : 'transparent';
  const textColor = variant === 'outline' ? colors.primary : '#FFFFFF';
  const borderColor = variant === 'outline' ? colors.primary : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isDisabled ? colors.textMuted : backgroundColor,
          opacity: pressed ? 0.85 : 1,
          paddingVertical: spacing.sm,
          borderRadius: spacing.sm,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor,
        },
      ]}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.title, { color: textColor, fontSize: fontSizes.md }]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontWeight: '600',
  },
});
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
main
