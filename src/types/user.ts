export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
