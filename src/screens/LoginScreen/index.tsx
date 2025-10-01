import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MotoMenu: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type StoredUser = {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
};

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearErrors = () => {
    setIdentifierError(null);
    setPasswordError(null);
    setAuthError(null);
  };

  const handleLogin = async () => {
    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();

    let hasError = false;

    if (!trimmedIdentifier) {
      setIdentifierError('Informe seu e-mail, nome ou telefone.');
      hasError = true;
    } else {
      setIdentifierError(null);
    }

    if (!trimmedPassword) {
      setPasswordError('Informe sua senha.');
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const userData = await AsyncStorage.getItem('user');

      if (!userData) {
        setAuthError('Nenhum usuário cadastrado. Crie sua conta para continuar.');
        return;
      }

      const parsedData: StoredUser = JSON.parse(userData);

      const storedPassword = parsedData.password ?? '';
      const normalizedIdentifier = trimmedIdentifier.toLowerCase();
      const identifierMatches = [
        parsedData.email?.toLowerCase(),
        parsedData.fullName?.toLowerCase(),
        parsedData.phone,
      ]
        .filter((value): value is string => Boolean(value))
        .some((value) => {
          if (value === parsedData.phone) {
            return value === trimmedIdentifier;
          }
          return value === normalizedIdentifier;
        });

      if (identifierMatches && trimmedPassword === storedPassword) {
        navigation.navigate('MotoMenu');
        clearErrors();
        setIdentifier('');
        setPassword('');
      } else {
        setAuthError('Credenciais inválidas. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar realizar login', error);
      Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDevLogin = () => {
    clearErrors();
    setIdentifier('');
    setPassword('');
    navigation.navigate('MotoMenu');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* <Image source={require('../assets/SolutionsNote.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Bem-vindo de volta</Text>

        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, identifierError && styles.inputError]}
            placeholder="Nome, Email ou Telefone"
            value={identifier}
            onChangeText={(text) => {
              setIdentifier(text);
              if (identifierError || authError) {
                setIdentifierError(null);
                setAuthError(null);
              }
            }}
            keyboardType="default"
            autoCapitalize="none"
          />
          {identifierError ? <Text style={styles.errorText}>{identifierError}</Text> : null}
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError || authError) {
                setPasswordError(null);
                setAuthError(null);
              }
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <TouchableOpacity
          onPress={() => Alert.alert('Recuperar senha', 'Funcionalidade não implementada')}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        {authError ? <Text style={styles.authErrorText}>{authError}</Text> : null}

        <TouchableOpacity
          style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
          onPress={handleLogin}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityLabel="Entrar"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.devButton}
          onPress={handleDevLogin}
          accessibilityRole="button"
          accessibilityLabel="Login de desenvolvedor"
        >
          <Text style={styles.devButtonText}>Login rápido (Dev)</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Registre-se agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
