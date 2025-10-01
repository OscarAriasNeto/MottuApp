export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type MotosStackParamList = {
  MotoList: undefined;
  MotoDetail: { id: string };
  MotoForm: { id?: string };
};

export type AppTabParamList = {
  Dashboard: undefined;
  MotosStack: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};
