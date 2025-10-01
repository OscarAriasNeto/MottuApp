import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = Constants.expoConfig?.extra?.expoPublicApiUrl ?? 'https://64f3a464932537a40579d928.mockapi.io/api/v1';

export const api = axios.create({
  baseURL,
  timeout: 8000,
});
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from './endpoints';

export const TOKEN_STORAGE_KEY = '@mottuapp/token';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    return Promise.reject(error);
  },
);

export async function setAuthorizationToken(token: string | null): Promise<void> {
  if (token) {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
main
