import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const schema = z.object({
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async (data: FormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <Screen scrollable>
      <View style={{ gap: spacing.md }}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Bem-vindo de volta</Text>
        <Text style={{ color: colors.textMuted }}>Acesse com seu e-mail e senha cadastrados.</Text>

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

        <Button title="Entrar" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
        <Button title="Criar uma conta" variant="outline" onPress={() => navigation.navigate('Register')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
});
