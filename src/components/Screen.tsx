import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeProvider';

type ScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export function Screen({ children, scrollable = false }: ScreenProps) {
  const {
    theme: { colors, spacing },
  } = useAppTheme();

  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <Container
        contentContainerStyle={
          scrollable
            ? {
                padding: spacing.lg,
                flexGrow: 1,
                justifyContent: 'flex-start',
              }
            : undefined
        }
        style={!scrollable ? [styles.container, { padding: spacing.lg }] : [styles.container]}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
