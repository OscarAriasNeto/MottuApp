import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { Loader } from '../../components/Loader';
import { Text } from '../../components/Text';
import { MotosStackParamList } from '../../navigation/types';
import { useMotos } from '../../hooks/useMotos';
import { Moto } from '../../types/moto';

export type MotoListScreenProps = NativeStackScreenProps<MotosStackParamList, 'MotoList'>;

export function MotoListScreen({ navigation }: MotoListScreenProps) {
  const { motos, isLoading, isRefreshing, error, refreshMotos } = useMotos();

  const handleEdit = useCallback(
    (moto: Moto) => {
      navigation.navigate('MotoForm', { id: moto.id });
    },
    [navigation],
  );

  const handleCreate = () => {
    navigation.navigate('MotoForm', {});
  };

  if (isLoading) {
    return <Loader message="Carregando motos..." />;
  }

  return (
    <Screen title="Motos">
      {error && (
        <Text variant="caption" color="warning" style={{ marginBottom: 8 }}>
          {error}
        </Text>
      )}

      <Button title="Adicionar moto" onPress={handleCreate} accessibilityLabel="Cadastrar nova moto" />

      {motos.length === 0 ? (
        <EmptyState
          title="Nenhuma moto cadastrada"
          description="Cadastre a primeira moto para começar a gerenciar sua frota."
          action={<Button title="Cadastrar" onPress={handleCreate} style={{ marginTop: 16 }} />}
        />
      ) : (
        <FlashList
          data={motos}
          keyExtractor={(item) => item.id}
          estimatedItemSize={120}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshMotos} />}
          contentContainerStyle={{ paddingVertical: 16 }}
          renderItem={({ item }) => (
            <Card
              title={`${item.model} • ${item.plate}`}
              subtitle={`Status: ${translateStatus(item.status)} | KM: ${item.mileage}`}
              onPress={() => navigation.navigate('MotoDetail', { id: item.id })}
              rightContent={
                <Button
                  title="Editar"
                  variant="ghost"
                  onPress={() => handleEdit(item)}
                  accessibilityLabel={`Editar moto ${item.plate}`}
                />
              }
            />
          )}
          ListFooterComponent={<Text variant="caption">Atualizado em {new Date().toLocaleString()}</Text>}
        />
      )}
    </Screen>
  );
}

function translateStatus(status: Moto['status']) {
  const map: Record<Moto['status'], string> = {
    available: 'Disponível',
    maintenance: 'Manutenção',
    rented: 'Alugada',
  };
  return map[status];
}
