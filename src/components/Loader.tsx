import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { Text } from './Text';

interface LoaderProps {
  message?: string;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.lg}px;
`;

export function Loader({ message }: LoaderProps) {
  return (
    <Container accessibilityRole="status">
      <ActivityIndicator size="large" color="#0F9D58" />
      {message && (
        <Text variant="body" style={{ marginTop: 16 }}>
          {message}
        </Text>
      )}
    </Container>
  );
}
