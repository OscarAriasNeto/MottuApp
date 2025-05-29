import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MotoMenuScreen from './src/screens/MotoMenuScreen';
import SectorMenuScreen from './src/screens/SectorMenuScreen';
import MotoDetailsScreen from './src/screens/MotoDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  MotoMenu: undefined;
  SectorMenu: undefined;
  MotoDetails: {
    placa: string;
    modelo: string;
    cor: string;
    setor: string;
    status: string;
  };
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MotoMenu" component={MotoMenuScreen} />
        <Stack.Screen name="SectorMenu" component={SectorMenuScreen} />
        <Stack.Screen name="MotoDetails" component={MotoDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
