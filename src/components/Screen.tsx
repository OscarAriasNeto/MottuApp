import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, StatusBar } from 'react-native';

import { Text } from './Text';

interface ScreenProps {
  title?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  footer?: React.ReactNode;
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.space.lg}px;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

export function Screen({ title, children, scrollable, footer }: ScreenProps) {
  const content = (
    <Content>
      {title && (
        <Text variant="title" weight="bold" style={{ marginBottom: 24 }}>
          {title}
        </Text>
      )}
      {children}
    </Content>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      {scrollable ? <Scroll contentContainerStyle={{ paddingBottom: 24 }}>{content}</Scroll> : content}
      {footer}
    </Container>
  );
}
