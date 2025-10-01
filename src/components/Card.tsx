import React from 'react';
import styled from 'styled-components/native';

import { Text } from './Text';

interface CardProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

const Container = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  padding: theme.space.lg,
  borderRadius: theme.radii.lg,
  marginBottom: theme.space.md,
  shadowColor: theme.shadows.soft.shadowColor,
  shadowOpacity: theme.shadows.soft.shadowOpacity,
  shadowOffset: theme.shadows.soft.shadowOffset,
  shadowRadius: theme.shadows.soft.shadowRadius,
  elevation: theme.shadows.soft.elevation,
  borderWidth: 1,
  borderColor: theme.colors.border,
}));

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm}px;
`;

export function Card({ title, subtitle, rightContent, onPress, accessibilityLabel, children }: CardProps) {
  return (
    <Container accessibilityRole={onPress ? 'button' : 'summary'} onPress={onPress} accessibilityLabel={accessibilityLabel ?? title}>
      <Header>
        <Text variant="subtitle" weight="bold">
          {title}
        </Text>
        {rightContent}
      </Header>
      {subtitle && (
        <Text variant="body" color="textSecondary">
          {subtitle}
        </Text>
      )}
      {children}
    </Container>
  );
}
