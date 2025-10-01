import React from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { styles } from './styles';

type RootStackParamList = {
  MotoDetails: {
    placa: string;
    modelo: string;
    cor: string;
    setor: string;
    status: string;
  };
};

type Props = StackScreenProps<RootStackParamList, 'MotoDetails'>;

export default function MotoDetailsScreen({ route }: Props) {
  const { placa, modelo, cor, setor, status } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Moto</Text>
      {/* <Image source={require('../../../assets/moto.png')} style={styles.motoImage} /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Placa:</Text>
        <Text style={styles.detailValue}>{placa}</Text>

        <Text style={styles.detailLabel}>Modelo:</Text>
        <Text style={styles.detailValue}>{modelo}</Text>

        <Text style={styles.detailLabel}>Cor:</Text>
        <Text style={styles.detailValue}>{cor}</Text>

        <Text style={styles.detailLabel}>Setor:</Text>
        <Text style={styles.detailValue}>{setor}</Text>

        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailValue}>{status}</Text>
      </View>
    </View>
  );
}
