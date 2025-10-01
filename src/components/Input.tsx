import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeProvider';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export const Input = React.forwardRef<TextInput, InputProps>(({ label, error, style, ...props }, ref) => {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={[styles.label, { color: colors.textMuted, marginBottom: spacing.xs, fontSize: fontSizes.sm }]}>{label}</Text>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {
            borderColor: error ? colors.danger : colors.border,
            color: colors.text,
            backgroundColor: colors.surface,
            borderRadius: spacing.sm,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            fontSize: fontSizes.md,
          },
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
  },
  error: {
    marginTop: 4,
  },
});
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

import { Text } from './Text';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
}

const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.space.md}px;
`;

const StyledLabel = styled(Text)`
  margin-bottom: ${({ theme }) => theme.space.xs}px;
`;

const StyledInput = styled.TextInput<{ hasError: boolean }>`
  border-width: 1px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-color: ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.space.sm}px ${theme.space.md}px`};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.text};
`;

const HelperText = styled(Text)`
  margin-top: ${({ theme }) => theme.space.xs}px;
`;

export const Input = React.forwardRef<React.ElementRef<typeof StyledInput>, InputProps>(
  ({ label, error, helperText, accessibilityLabel, ...rest }, ref) => {
    return (
      <Container>
        <StyledLabel variant="caption" weight="medium">
          {label}
        </StyledLabel>
        <StyledInput
          ref={ref}
          accessibilityLabel={accessibilityLabel ?? label}
          hasError={!!error}
          placeholderTextColor="#9CA3AF"
          {...rest}
        />
        {(error || helperText) && (
          <HelperText variant="caption" color={error ? 'danger' : 'textSecondary'}>
            {error ?? helperText}
          </HelperText>
        )}
      </Container>
    );
  },
);

Input.displayName = 'Input';
main
