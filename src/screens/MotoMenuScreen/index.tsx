import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './styles';

type RootStackParamList = {
  MotoDetails: {
    placa: string;
    modelo: string;
    cor: string;
    setor: string;
    status: string;
  };
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MotoDetails'>;

type MotoItem = {
  id: string;
  placa: string;
  modelo: string;
  cor: string;
  setor: string;
  status: string;
  chassis: string;
  image: ReturnType<typeof require>;
};

const motosData: MotoItem[] = [
  {
    id: '1',
    placa: 'FTL-4C85',
    modelo: 'Mottu Sport',
    cor: 'Preto',
    setor: 'Verde',
    status: 'Ativo',
    chassis: '9451687135135',
    image: require('../../../assets/moto.png'),
  },
  {
    id: '2',
    placa: 'POU-4C95',
    modelo: 'Mottu Pop',
    cor: 'Vermelho',
    setor: 'Vermelho',
    status: 'Manutenção',
    chassis: '9451687135135',
    image: require('../../../assets/moto.png'),
  },
];

export default function MotoMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'Motos' | 'Setores'>('Motos');
  const [searchText, setSearchText] = useState('');

  const filteredMotos = useMemo(
    () =>
      motosData.filter(
        (moto) =>
          moto.placa.toLowerCase().includes(searchText.toLowerCase()) ||
          moto.modelo.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [searchText],
  );

  const renderMotoItem = ({ item }: { item: MotoItem }) => (
    <TouchableOpacity
      style={styles.motoItem}
      onPress={() =>
        navigation.navigate('MotoDetails', {
          placa: item.placa,
          modelo: item.modelo,
          cor: item.cor,
          setor: item.setor,
          status: item.status,
        })
      }
    >
      <Image source={item.image} style={styles.motoImage} />
      <View style={styles.motoInfo}>
        <Text style={styles.motoModel}>{item.modelo}</Text>
        <Text style={styles.motoDetails}>Chassi: {item.chassis}</Text>
        <Text style={styles.motoDetails}>Placa: {item.placa}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../../assets/moto.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>John Daniel</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Motos' && styles.activeTab]}
          onPress={() => setActiveTab('Motos')}
        >
          <Text style={[styles.tabText, activeTab === 'Motos' && styles.activeTabText]}>Motos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Setores' && styles.activeTab]}
          onPress={() => setActiveTab('Setores')}
        >
          <Text style={[styles.tabText, activeTab === 'Setores' && styles.activeTabText]}>Setores</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Motos' && (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar placa, chassi ou modelo"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredMotos}
            keyExtractor={(item) => item.id}
            renderItem={renderMotoItem}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}

      {activeTab === 'Setores' && (
        <View style={styles.setoresContainer}>
          <Text>Setores content goes here</Text>
        </View>
      )}

      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}
