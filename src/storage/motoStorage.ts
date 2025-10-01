import AsyncStorage from '@react-native-async-storage/async-storage';

import { Moto } from '../types/moto';

const MOTOS_KEY = '@mottuapp:motos';

export async function saveMotosCache(motos: Moto[]) {
  await AsyncStorage.setItem(MOTOS_KEY, JSON.stringify({ data: motos, savedAt: Date.now() }));
}

export async function getMotosCache(): Promise<Moto[] | null> {
  const value = await AsyncStorage.getItem(MOTOS_KEY);
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as { data: Moto[] };
    return parsed.data;
  } catch (error) {
    await AsyncStorage.removeItem(MOTOS_KEY);
    return null;
  }
}

export async function clearMotosCache() {
  await AsyncStorage.removeItem(MOTOS_KEY);
}
