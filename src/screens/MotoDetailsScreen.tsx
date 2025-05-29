import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

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
      {/*está com bug na imagem <Image source={require('../assets/moto.png')} style={styles.motoImage} /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  motoImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  detailsContainer: {
    width: '100%',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#169BA4',
    marginTop: 12,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '400',
  },
});
