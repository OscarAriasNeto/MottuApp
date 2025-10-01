import React from 'react';

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './src/theme/ThemeProvider';
import { AuthProvider } from './src/hooks/AuthProvider';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from './src/providers/AppProvider';
main
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
    </SafeAreaProvider>
  );
}
