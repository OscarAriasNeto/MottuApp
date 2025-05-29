import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

const motosData = [
  {
    id: '1',
    placa: 'FTL-4C85',
    modelo: 'Mottu Sport',
    cor: 'Preto',
    setor: 'Verde',
    status: 'Ativo',
    chassis: '9451687135135',
    image: require('../assets/moto.png'),
  },
  {
    id: '2',
    placa: 'POU-4C95',
    modelo: 'Mottu Pop',
    cor: 'Vermelho',
    setor: 'Vermelho',
    status: 'Manutenção',
    chassis: '9451687135135',
    image: require('../assets/moto.png'),
  },
];

export default function MotoMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'Motos' | 'Setores'>('Motos');
  const [searchText, setSearchText] = useState('');

  const filteredMotos = motosData.filter(
    (moto) =>
      moto.placa.toLowerCase().includes(searchText.toLowerCase()) ||
      moto.modelo.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderMotoItem = ({ item }: { item: typeof motosData[0] }) => (
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
        {/*está com bug na imagem <Image source={require('../assets/profile.png')} style={styles.profileImage} /> */}
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
          {/* Implement setores list similar to motos */}
        </View>
      )}

      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#169BA4',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#169BA4',
    fontWeight: '700',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 80,
  },
  motoItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  motoImage: {
    width: 60,
    height: 40,
    marginRight: 12,
  },
  motoInfo: {
    flex: 1,
  },
  motoModel: {
    fontSize: 16,
    fontWeight: '600',
  },
  motoDetails: {
    fontSize: 12,
    color: '#666',
  },
  setoresContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#169BA4',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
