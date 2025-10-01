import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { RootStackParamList, AuthStackParamList, AppTabParamList, MotosStackParamList } from './types';
import { WelcomeScreen } from '../app/welcome/WelcomeScreen';
import { LoginScreen } from '../app/auth/LoginScreen';
import { RegisterScreen } from '../app/auth/RegisterScreen';
import { DashboardScreen } from '../app/dashboard/DashboardScreen';
import { SettingsScreen } from '../app/settings/SettingsScreen';
import { MotoListScreen } from '../app/motos/MotoListScreen';
import { MotoDetailScreen } from '../app/motos/MotoDetailScreen';
import { MotoFormScreen } from '../app/motos/MotoFormScreen';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/Loader';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppTabs = createBottomTabNavigator<AppTabParamList>();
const MotosStack = createNativeStackNavigator<MotosStackParamList>();

function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function MotosRoutes() {
  return (
    <MotosStack.Navigator>
      <MotosStack.Screen name="MotoList" component={MotoListScreen} options={{ title: 'Motos' }} />
      <MotosStack.Screen name="MotoDetail" component={MotoDetailScreen} options={{ title: 'Detalhes' }} />
      <MotosStack.Screen name="MotoForm" component={MotoFormScreen} options={{ title: 'Cadastro' }} />
    </MotosStack.Navigator>
  );
}

function AppRoutes() {
  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof AppTabParamList, string> = {
            Dashboard: 'speedometer-outline',
            MotosStack: 'bicycle-outline',
            Settings: 'settings-outline',
          };
          return <Ionicons name={icons[route.name as keyof AppTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <AppTabs.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Resumo' }} />
      <AppTabs.Screen name="MotosStack" component={MotosRoutes} options={{ title: 'Motos' }} />
      <AppTabs.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </AppTabs.Navigator>
  );
}

export function AppNavigator() {
  const { user, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const navigationTheme = useMemo<NavigationTheme>(() => {
    const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.secondary,
      },
    };
  }, [colorScheme, theme.colors.background, theme.colors.border, theme.colors.primary, theme.colors.secondary, theme.colors.surface, theme.colors.text]);

  if (isLoading) {
    return <Loader message="Preparando ambiente..." />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="App" component={AppRoutes} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthRoutes} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
