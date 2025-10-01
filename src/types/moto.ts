export type MotoStatus = 'disponivel' | 'em_uso' | 'manutencao';

export type Moto = {
  id: string;
  placa: string;
  modelo: string;
  ano: number;
  quilometragem: number;
  status: MotoStatus;
};
