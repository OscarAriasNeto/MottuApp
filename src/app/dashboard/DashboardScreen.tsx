import React, { useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { AppTabParamList } from '../../navigation/types';
import { useMotoStore } from '../../stores/motoStore';

export type DashboardScreenProps = NativeStackScreenProps<AppTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const motos = useMotoStore((state) => state.motos);
  const fetchMotos = useMotoStore((state) => state.fetchMotos);

  const metrics = useMemo(() => {
    const total = motos.length;
    const available = motos.filter((moto) => moto.status === 'available').length;
    const rented = motos.filter((moto) => moto.status === 'rented').length;
    const maintenance = motos.filter((moto) => moto.status === 'maintenance').length;

    return { total, available, rented, maintenance };
  }, [motos]);

  return (
    <Screen title="Resumo da Frota" scrollable>
      <Card
        title="Total de motos"
        subtitle={`${metrics.total} cadastradas`}
        rightContent={<Text variant="title">{metrics.total}</Text>}
        onPress={() => navigation.navigate('MotosStack')}
      />
      <Card
        title="Disponíveis"
        subtitle="Prontas para locação"
        rightContent={<Text variant="title">{metrics.available}</Text>}
        onPress={() => navigation.navigate('MotosStack')}
      />
      <Card
        title="Alugadas"
        subtitle="Motos em circulação"
        rightContent={<Text variant="title">{metrics.rented}</Text>}
        onPress={() => navigation.navigate('MotosStack')}
      />
      <Card
        title="Em manutenção"
        subtitle="Acompanhe as pendências"
        rightContent={<Text variant="title">{metrics.maintenance}</Text>}
        onPress={() => navigation.navigate('MotosStack')}
      />

      <Button
        title="Atualizar dados"
        variant="secondary"
        onPress={() => {
          void fetchMotos();
        }}
        accessibilityLabel="Atualizar lista de motos"
      />
    </Screen>
  );
}
