import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { AUTH_LOGIN_ENDPOINT, AUTH_REGISTER_ENDPOINT } from './endpoints';
import { AuthCredentials, AuthResponse, User } from '../../types/user';
import { getObject, removeItem, saveObject } from '../../utils/storage';
import { TOKEN_STORAGE_KEY, setAuthorizationToken } from './client';

const USER_STORAGE_KEY = '@mottuapp/user';

interface ReqresAuthResponse {
  token: string;
}

export async function login(credentials: AuthCredentials): Promise<AuthResponse> {
  const response = await axios.post<ReqresAuthResponse>(AUTH_LOGIN_ENDPOINT, credentials);
  const storedUser = await getObject<User>(USER_STORAGE_KEY);
  const user: User =
    storedUser?.email === credentials.email
      ? storedUser
      : {
          id: uuidv4(),
          email: credentials.email,
          name: credentials.email.split('@')[0] ?? 'Usuário Mottu',
        };

  await saveObject(USER_STORAGE_KEY, user);
  await setAuthorizationToken(response.data.token);

  return { token: response.data.token, user };
}

export async function register(payload: User & { password: string }): Promise<AuthResponse> {
  const response = await axios.post<ReqresAuthResponse>(AUTH_REGISTER_ENDPOINT, {
    email: payload.email,
    password: payload.password,
  });

  const user: User = {
    id: payload.id && payload.id.length > 0 ? payload.id : uuidv4(),
    email: payload.email,
    name: payload.name,
    phone: payload.phone,
  };

  await saveObject(USER_STORAGE_KEY, user);
  await setAuthorizationToken(response.data.token);

  return { token: response.data.token, user };
}

export async function getStoredUser(): Promise<User | null> {
  return getObject<User>(USER_STORAGE_KEY);
}

export async function signOut(): Promise<void> {
  await removeItem(TOKEN_STORAGE_KEY);
  await removeItem(USER_STORAGE_KEY);
}
