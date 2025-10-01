import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';
import { useAppTheme } from '../theme/ThemeProvider';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({ title, description, actionLabel, onActionPress }: EmptyStateProps) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();

  return (
    <View style={[styles.container, { padding: spacing.lg }]}>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.lg }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textMuted, marginVertical: spacing.sm }]}>{description}</Text>
      {actionLabel && onActionPress ? <Button title={actionLabel} onPress={onActionPress} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
