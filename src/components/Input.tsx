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
