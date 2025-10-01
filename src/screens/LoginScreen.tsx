import React, { useState } from 'react';
 import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   KeyboardAvoidingView,
   Platform,
   Alert,
   ScrollView,
  ActivityIndicator,
 } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { NativeStackNavigationProp } from '@react-navigation/native-stack';
 import { useNavigation } from '@react-navigation/native';
 
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
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
   },
   scrollContainer: {
     flexGrow: 1,
     justifyContent: 'center',
     paddingHorizontal: 24,
     paddingBottom: 40,
   },
   logo: {
     width: 180,
     height: 180,
     resizeMode: 'contain',
     alignSelf: 'center',
     marginBottom: 20,
   },
   title: {
     fontSize: 22,
     fontWeight: '600',
     textAlign: 'center',
     marginBottom: 32,
   },
  fieldContainer: {
    marginBottom: 12,
  },
   input: {
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 6,
     paddingHorizontal: 16,
     paddingVertical: 12,
     fontSize: 16,
  },
  inputError: {
    borderColor: '#ff5a5f',
   },
   forgotPasswordText: {
     color: '#169BA4',
     textAlign: 'right',
     marginBottom: 20,
     textDecorationLine: 'underline',
   },
   primaryButton: {
     backgroundColor: '#169BA4',
     paddingVertical: 14,
     borderRadius: 6,
     alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
   },
   buttonText: {
     color: '#fff',
     fontSize: 16,
     fontWeight: '600',
   },
  devButton: {
    borderWidth: 1,
    borderColor: '#169BA4',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  devButtonText: {
    color: '#169BA4',
    fontSize: 15,
    fontWeight: '500',
  },
   registerContainer: {
     flexDirection: 'row',
     justifyContent: 'center',
   },
   noAccountText: {
     fontSize: 14,
   },
   registerText: {
     fontSize: 14,
     color: '#169BA4',
     textDecorationLine: 'underline',
   },
  errorText: {
    color: '#ff5a5f',
    fontSize: 12,
    marginTop: 4,
  },
  authErrorText: {
    color: '#ff5a5f',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
 });
