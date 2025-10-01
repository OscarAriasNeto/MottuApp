import { useContext } from 'react';

import { AuthContext } from './AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
import { useAuthContext } from '../contexts/AuthContext';

export function useAuth() {
  return useAuthContext();
}
