import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeProvider';

type LoadingProps = {
  message?: string;
};

export function Loading({ message = 'Carregando...' }: LoadingProps) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.message, { marginTop: spacing.sm, color: colors.text, fontSize: fontSizes.md }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontWeight: '500',
  },
});
