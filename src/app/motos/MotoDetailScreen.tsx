import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { MotosStackParamList } from '../../navigation/types';
import { useMotoStore } from '../../stores/motoStore';

export type MotoDetailScreenProps = NativeStackScreenProps<MotosStackParamList, 'MotoDetail'>;

export function MotoDetailScreen({ route, navigation }: MotoDetailScreenProps) {
  const { id } = route.params;
  const motos = useMotoStore((state) => state.motos);
  const removeMoto = useMotoStore((state) => state.removeMoto);

  const moto = useMemo(() => motos.find((item) => item.id === id), [id, motos]);

  if (!moto) {
    return <Loader message="Buscando detalhes da moto..." />;
  }

  const handleDelete = () => {
    Alert.alert('Remover moto', 'Deseja remover esta moto? Essa ação pode ser sincronizada depois.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await removeMoto(id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen title={`${moto.model} (${moto.plate})`} scrollable>
      <Text variant="body" style={{ marginBottom: 8 }}>
        Situação atual:
      </Text>
      <Text variant="subtitle" weight="bold" style={{ marginBottom: 16 }}>
        {translateStatus(moto.status)}
      </Text>

      <Text variant="body" color="textSecondary" style={{ marginBottom: 4 }}>
        Ano: {moto.year}
      </Text>
      <Text variant="body" color="textSecondary" style={{ marginBottom: 4 }}>
        Quilometragem: {moto.mileage} km
      </Text>
      <Text variant="body" color="textSecondary" style={{ marginBottom: 24 }}>
        Atualizado em {new Date(moto.updatedAt).toLocaleString()}
      </Text>

      <Button
        title="Editar"
        onPress={() => navigation.navigate('MotoForm', { id })}
        accessibilityLabel="Editar dados da moto"
      />
      <Button
        title="Remover"
        variant="ghost"
        onPress={handleDelete}
        accessibilityLabel="Remover moto"
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}

function translateStatus(status: 'available' | 'maintenance' | 'rented') {
  const map: Record<'available' | 'maintenance' | 'rented', string> = {
    available: 'Disponível',
    maintenance: 'Manutenção',
    rented: 'Alugada',
  };

  return map[status];
}
