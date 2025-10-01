import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveObject<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getObject<T>(key: string): Promise<T | null> {
  const stored = await AsyncStorage.getItem(key);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    console.warn(`Failed to parse storage key ${key}`, error);
    return null;
  }
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearNamespace(namespace: string): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const filtered = keys.filter((key) => key.startsWith(namespace));
  if (filtered.length > 0) {
    await AsyncStorage.multiRemove(filtered);
  }
}
