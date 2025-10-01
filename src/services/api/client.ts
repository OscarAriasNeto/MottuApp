import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = Constants.expoConfig?.extra?.expoPublicApiUrl ?? 'https://64f3a464932537a40579d928.mockapi.io/api/v1';

export const api = axios.create({
  baseURL,
  timeout: 8000,
});
