import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../theme/ThemeProvider';

export function SettingsScreen() {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <Screen>
      <View style={{ flex: 1, padding: spacing.lg, gap: spacing.md }}>
        <View style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}> 
          <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.lg }]}>{user?.name}</Text>
          <Text style={{ color: colors.textMuted }}>{user?.email}</Text>
          <Text style={{ color: colors.textMuted }}>ID: {user?.id}</Text>
        </View>

        <Button title="Sair" variant="outline" onPress={handleSignOut} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  title: {
    fontWeight: '700',
  },
});
