import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@mottuapp:auth';

type StoredAuth = {
  id: string;
  name: string;
  email: string;
  token: string;
  password: string;
};

export async function saveAuth(data: StoredAuth) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export async function getAuth(): Promise<StoredAuth | null> {
  const value = await AsyncStorage.getItem(AUTH_KEY);
  return value ? (JSON.parse(value) as StoredAuth) : null;
}

export async function clearAuth() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
