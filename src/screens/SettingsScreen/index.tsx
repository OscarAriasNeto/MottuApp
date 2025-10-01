import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    Alert.alert('Logout', 'Você saiu da conta.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* <Image source={require('../../../assets/profile.png')} style={styles.profileImage} /> */}
        <Text style={styles.profileName}>John Daniel</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
