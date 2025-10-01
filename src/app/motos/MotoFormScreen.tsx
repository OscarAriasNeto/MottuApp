import React, { useEffect, useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { MotosStackParamList } from '../../navigation/types';
import { useMotos } from '../../hooks/useMotos';

const motoSchema = z.object({
  plate: z
    .string()
    .toUpperCase()
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i, 'Use o padrão ABC1D23.'),
  model: z.string().min(2, 'Informe o modelo.'),
  year: z
    .string()
    .regex(/^[0-9]{4}$/g, 'Ano inválido')
    .transform((value) => Number(value))
    .refine((value) => value >= 2000 && value <= new Date().getFullYear(), 'Ano fora do intervalo válido.'),
  status: z.enum(['available', 'maintenance', 'rented']),
  mileage: z
    .string()
    .regex(/^[0-9]+$/, 'Informe apenas números')
    .transform((value) => Number(value)),
});

type MotoFormData = z.infer<typeof motoSchema>;

type MotoFormScreenProps = NativeStackScreenProps<MotosStackParamList, 'MotoForm'>;

const PickerContainer = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  margin-bottom: ${({ theme }) => theme.space.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export function MotoFormScreen({ navigation, route }: MotoFormScreenProps) {
  const { id } = route.params ?? {};
  const { motos, addMoto, updateMoto } = useMotos();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const editingMoto = useMemo(() => motos.find((item) => item.id === id), [id, motos]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MotoFormData>({
    resolver: zodResolver(motoSchema),
    defaultValues: editingMoto
      ? {
          plate: editingMoto.plate,
          model: editingMoto.model,
          year: String(editingMoto.year),
          status: editingMoto.status,
          mileage: String(editingMoto.mileage),
        }
      : {
          plate: '',
          model: '',
          year: String(new Date().getFullYear()),
          status: 'available',
          mileage: '0',
        },
  });

  useEffect(() => {
    if (editingMoto) {
      reset({
        plate: editingMoto.plate,
        model: editingMoto.model,
        year: String(editingMoto.year),
        status: editingMoto.status,
        mileage: String(editingMoto.mileage),
      });
    }
  }, [editingMoto, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (editingMoto) {
        await updateMoto(editingMoto.id, {
          plate: values.plate,
          model: values.model,
          year: values.year,
          status: values.status,
          mileage: values.mileage,
        });
        setSuccessMessage('Dados atualizados com sucesso!');
      } else {
        const moto = await addMoto({
          plate: values.plate,
          model: values.model,
          year: values.year,
          status: values.status,
          mileage: values.mileage,
        });
        setSuccessMessage('Moto cadastrada!');
        navigation.replace('MotoDetail', { id: moto.id });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    }
  });

  return (
    <Screen title={editingMoto ? 'Editar moto' : 'Cadastrar moto'} scrollable>
      <Controller
        name="plate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Placa"
            placeholder="ABC1D23"
            autoCapitalize="characters"
            maxLength={7}
            onChangeText={(text) => onChange(text.toUpperCase())}
            value={value}
            error={errors.plate?.message}
          />
        )}
      />

      <Controller
        name="model"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input label="Modelo" placeholder="Honda CG" onChangeText={onChange} value={value} error={errors.model?.message} />
        )}
      />

      <Controller
        name="year"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Ano"
            keyboardType="numeric"
            maxLength={4}
            onChangeText={onChange}
            value={value}
            error={errors.year?.message}
          />
        )}
      />

      <Controller
        name="mileage"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Quilometragem"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
            error={errors.mileage?.message}
            helperText="Informe apenas números"
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PickerContainer>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              accessibilityLabel="Status da moto"
            >
              <Picker.Item label="Disponível" value="available" />
              <Picker.Item label="Alugada" value="rented" />
              <Picker.Item label="Em manutenção" value="maintenance" />
            </Picker>
          </PickerContainer>
        )}
      />
      {errors.status?.message && (
        <Text variant="caption" color="danger" style={{ marginBottom: 16 }}>
          {errors.status.message}
        </Text>
      )}

      {successMessage && (
        <Text variant="caption" color="success" style={{ marginBottom: 16 }}>
          {successMessage}
        </Text>
      )}

      <Button
        title={editingMoto ? 'Salvar alterações' : 'Cadastrar'}
        onPress={onSubmit}
        loading={isSubmitting}
        accessibilityLabel="Salvar dados da moto"
      />
    </Screen>
  );
}
