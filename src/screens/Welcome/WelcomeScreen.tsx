import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { useAppTheme } from '../../theme/ThemeProvider';
import { AuthStackParamList } from '../../navigation/types';

const hero = require('../../../assets/icon.png');

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();

  return (
    <Screen>
      <View style={[styles.container, { gap: spacing.lg }]}> 
        <Image source={hero} style={styles.image} accessibilityIgnoresInvertColors />
        <View>
          <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Mottu Fleet</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted, marginTop: spacing.sm }]}>Acompanhe suas motos, cadastre novas rotas e mantenha sua operação organizada.</Text>
        </View>
        <View style={{ width: '100%', gap: spacing.sm }}>
          <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
          <Button title="Criar conta" onPress={() => navigation.navigate('Register')} variant="outline" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});
