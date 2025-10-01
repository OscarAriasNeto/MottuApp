import React from 'react';
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
