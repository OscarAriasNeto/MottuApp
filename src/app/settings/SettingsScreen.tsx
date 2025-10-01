import React, { useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Linking } from 'react-native';

import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { AppTabParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';
import { useMotoStore } from '../../stores/motoStore';

export type SettingsScreenProps = BottomTabScreenProps<AppTabParamList, 'Settings'>;

export function SettingsScreen({}: SettingsScreenProps) {
  const { user, logout } = useAuth();
  const syncOffline = useMotoStore((state) => state.syncOffline);
  const [syncing, setSyncing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncOffline();
      setFeedback({ type: 'success', message: 'Sincronização concluída!' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Não foi possível sincronizar. Tente novamente.' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Screen title="Configurações" scrollable>
      <Text variant="subtitle" weight="bold" style={{ marginBottom: 8 }}>
        Perfil
      </Text>
      <Text variant="body" color="textSecondary">
        {user?.name}
      </Text>
      <Text variant="body" color="textSecondary" style={{ marginBottom: 24 }}>
        {user?.email}
      </Text>

      <Button
        title="Sincronizar agora"
        variant="secondary"
        onPress={handleSync}
        loading={syncing}
        accessibilityLabel="Sincronizar dados"
      />

      {feedback && (
        <Text variant="caption" color={feedback.type === 'success' ? 'success' : 'danger'} style={{ marginTop: 8 }}>
          {feedback.message}
        </Text>
      )}

      <Button
        title="Ajuda"
        variant="ghost"
        onPress={() => Linking.openURL('https://docs.expo.dev/')}
        style={{ marginTop: 16 }}
      />

      <Button
        title="Sair"
        variant="ghost"
        onPress={logout}
        accessibilityLabel="Encerrar sessão"
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}
