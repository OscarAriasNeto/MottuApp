import React, { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Digite um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { login, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values: LoginFormData) => {
    try {
      setErrorMessage(null);
      await login(values);
    } catch (error) {
      setErrorMessage('Não foi possível entrar. Verifique suas credenciais.');
    }
  });

  return (
    <Screen title="Login">
      <Text variant="body" color="textSecondary" style={{ marginBottom: 16 }}>
        Utilize seu e-mail e senha cadastrados para acessar a plataforma. Caso não tenha conta, toque em "Criar conta".
      </Text>

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={onChange}
            error={errors.email?.message}
            accessibilityLabel="Campo de e-mail"
            value={value}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Senha"
            secureTextEntry
            autoComplete="password"
            onChangeText={onChange}
            error={errors.password?.message}
            accessibilityLabel="Campo de senha"
            value={value}
          />
        )}
      />

      {errorMessage && (
        <Text variant="caption" color="danger" style={{ marginBottom: 16 }}>
          {errorMessage}
        </Text>
      )}

      <Button title="Entrar" onPress={onSubmit} loading={isLoading} accessibilityLabel="Confirmar login" />

      <Button
        title="Criar conta"
        variant="ghost"
        onPress={() => navigation.navigate('Register')}
        accessibilityLabel="Ir para tela de cadastro"
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}
