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
import styled from 'styled-components/native';

import { Text } from './Text';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.xl}px;
`;

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Container accessibilityRole="summary">
      <Text variant="subtitle" weight="bold" style={{ marginBottom: 8 }}>
        {title}
      </Text>
      <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
        {description}
      </Text>
      {action}
    </Container>
  );
}
main
