import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';
import { formatPhone } from '../../utils/formatters';

const registerSchema = z
  .object({
    name: z.string().min(3, 'Informe o nome completo.'),
    email: z.string().email('Digite um e-mail válido.'),
    phone: z.string().min(10, 'Informe um telefone válido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais.',
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { register: registerUser, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async ({ confirmPassword, ...values }: RegisterFormData) => {
    try {
      setErrorMessage(null);
      const sanitizedPhone = values.phone.replace(/\D/g, '');
      await registerUser({ ...values, id: '', phone: sanitizedPhone, password: values.password });
    } catch (error) {
      setErrorMessage('Não foi possível criar sua conta. Tente novamente mais tarde.');
    }
  });

  return (
    <Screen title="Criar conta" scrollable>
      <Text variant="body" color="textSecondary" style={{ marginBottom: 16 }}>
        Crie um perfil para começar a controlar a sua frota. Você poderá editar seus dados quando quiser.
      </Text>

      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome"
            placeholder="Nome completo"
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
      />

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
            value={value}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Telefone"
            keyboardType="phone-pad"
            onChangeText={(text) => onChange(formatPhone(text))}
            value={value}
            error={errors.phone?.message}
            helperText="Apenas números"
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
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Confirmar senha"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      {errorMessage && (
        <Text variant="caption" color="danger" style={{ marginBottom: 16 }}>
          {errorMessage}
        </Text>
      )}

      <Button title="Cadastrar" onPress={onSubmit} loading={isLoading} accessibilityLabel="Finalizar cadastro" />

      <Button
        title="Voltar para login"
        variant="ghost"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}
