import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { AuthStackParamList } from '../../navigation/types';

export type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <Screen title="Bem-vindo ao Mottu Fleet" scrollable>
      <Text variant="body" style={{ marginBottom: 24 }}>
        Gerencie sua frota de motos com segurança, mesmo sem internet. Cadastre, edite e acompanhe o status de cada
        veículo em tempo real.
      </Text>
      <Button title="Entrar" onPress={() => navigation.navigate('Login')} accessibilityLabel="Ir para login" />
      <Button
        title="Criar conta"
        variant="secondary"
        onPress={() => navigation.navigate('Register')}
        accessibilityLabel="Ir para cadastro"
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}
