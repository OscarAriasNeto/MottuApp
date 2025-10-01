import React from 'react';
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
