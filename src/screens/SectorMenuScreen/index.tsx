import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';

type RootStackParamList = {
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const setoresData = [
  {
    id: '1',
    name: 'Setor Verde (Manutenção)',
    motosCount: 3,
    color: '#4CAF50', // Green
  },
  {
    id: '2',
    name: 'Setor Vermelho (Pátio Principal)',
    motosCount: 30,
    color: '#F44336', // Red
  },
  // Add more setores as needed
];

export default function SectorMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'Motos' | 'Setores'>('Setores');

  const renderSetorItem = ({ item }: { item: typeof setoresData[0] }) => (
    <View style={styles.setorItem}>
      <View style={[styles.statusIndicator, { backgroundColor: item.color }]} />
      <Text style={styles.setorText}>
        {item.name} {'\n'}
        <Text style={styles.motosCount}>{item.motosCount} Mottu Sport</Text>
      </Text>
    </View>
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

      {activeTab === 'Setores' && (
        <FlatList
          data={setoresData}
          keyExtractor={(item) => item.id}
          renderItem={renderSetorItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      {activeTab === 'Motos' && (
        <View style={styles.motosPlaceholder}>
          <Text>Conteúdo de Motos aqui</Text>
        </View>
      )}

      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

