import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  listContent: {
    paddingBottom: 80,
  },
  setorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  setorText: {
    fontSize: 16,
  },
  motosCount: {
    fontSize: 12,
    color: '#666',
  },
  motosPlaceholder: {
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
