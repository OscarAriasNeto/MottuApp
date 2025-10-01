import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';

import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useMotos } from '../../hooks/useMotos';
import { maskLicensePlate } from '../../utils/formatters';
import { Moto, MotoStatus } from '../../types/moto';
import { MotosStackParamList } from '../../navigation/types';

const currentYear = new Date().getFullYear();

const schema = z.object({
  placa: z
    .string()
    .min(7, 'Informe a placa completa')
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i, 'Formato de placa inválido (AAA0A00)'),
  modelo: z.string().min(2, 'Informe o modelo'),
  ano: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => value >= 2000 && value <= currentYear + 1, 'Ano inválido'),
  quilometragem: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => value >= 0, 'Quilometragem deve ser positiva'),
  status: z.custom<MotoStatus>(),
});

type FormData = z.infer<typeof schema>;

type Props = NativeStackScreenProps<MotosStackParamList, 'MotoForm'>;

export function MotoFormScreen({ route, navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { create, update, findById } = useMotos();
  const [loading, setLoading] = useState(Boolean(route.params?.id));

  const isEditing = Boolean(route.params?.id);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      placa: '',
      modelo: '',
      ano: String(currentYear),
      quilometragem: '0',
      status: 'disponivel',
    },
  });

  useEffect(() => {
    if (route.params?.id) {
      (async () => {
        try {
          const moto = await findById(route.params.id);
          reset({
            placa: moto.placa,
            modelo: moto.modelo,
            ano: String(moto.ano),
            quilometragem: String(moto.quilometragem),
            status: moto.status,
          });
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar a moto.');
          navigation.goBack();
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [findById, navigation, reset, route.params?.id]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      placa: data.placa,
      modelo: data.modelo,
      ano: Number(data.ano),
      quilometragem: Number(data.quilometragem),
      status: data.status,
    } as Omit<Moto, 'id'>;

    try {
      if (isEditing && route.params?.id) {
        await update(route.params.id, payload);
        Alert.alert('Sucesso', 'Moto atualizada.');
      } else {
        await create(payload);
        Alert.alert('Sucesso', 'Moto cadastrada.');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a moto. Confira sua conexão e tente novamente.');
    }
  };

  if (loading) {
    return <Loading message="Carregando formulário" />;
  }

  return (
    <Screen scrollable>
      <View style={{ gap: spacing.md }}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}> 
          {isEditing ? 'Editar moto' : 'Nova moto'}
        </Text>

        <Controller
          control={control}
          name="placa"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Placa"
              autoCapitalize="characters"
              maxLength={7}
              value={value}
              onChangeText={(text) => onChange(maskLicensePlate(text))}
              error={errors.placa?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="modelo"
          render={({ field: { onChange, value } }) => (
            <Input label="Modelo" value={value} onChangeText={onChange} error={errors.modelo?.message} />
          )}
        />

        <Controller
          control={control}
          name="ano"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Ano"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              error={errors.ano?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="quilometragem"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Quilometragem"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              error={errors.quilometragem?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={{ color: colors.textMuted, marginBottom: spacing.xs }}>Status</Text>
              <View style={[styles.pickerContainer, { borderColor: colors.border, borderRadius: spacing.sm }]}> 
                <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue as MotoStatus)}>
                  <Picker.Item label="Disponível" value="disponivel" />
                  <Picker.Item label="Em uso" value="em_uso" />
                  <Picker.Item label="Em manutenção" value="manutencao" />
                </Picker>
              </View>
            </View>
          )}
        />

        <Button title={isEditing ? 'Salvar alterações' : 'Cadastrar'} onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
  pickerContainer: {
    borderWidth: 1,
  },
});
