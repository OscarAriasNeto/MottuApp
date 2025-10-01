import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../theme/ThemeProvider';
import { AuthStackParamList } from '../../navigation/types';

const schema = z
  .object({
    name: z.string().min(3, 'Informe seu nome completo'),
    email: z.string().email('Digite um e-mail válido'),
    password: z.string().min(6, 'Mínimo de 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });

  const onSubmit = async ({ name, email, password }: FormData) => {
    await register({ name, email, password });
    Alert.alert('Cadastro concluído', 'Conta criada com sucesso!');
  };

  return (
    <Screen scrollable>
      <View style={{ gap: spacing.md }}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Criar conta</Text>
        <Text style={{ color: colors.textMuted }}>Armazene suas credenciais para acessar suas motos sempre que precisar.</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nome completo" value={value} onChangeText={onChange} error={errors.name?.message} />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input label="Senha" secureTextEntry value={value} onChangeText={onChange} error={errors.password?.message} />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input label="Confirmar senha" secureTextEntry value={value} onChangeText={onChange} error={errors.confirmPassword?.message} />
          )}
        />

        <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
        <Button title="Já tenho uma conta" variant="outline" onPress={() => navigation.navigate('Login')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
});
