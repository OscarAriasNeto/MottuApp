export type MotoStatus = 'disponivel' | 'em_uso' | 'manutencao';

export type Moto = {
  id: string;
  placa: string;
  modelo: string;
  ano: number;
  quilometragem: number;
  status: MotoStatus;
};
export interface Moto {
  id: string;
  plate: string;
  model: string;
  year: number;
  status: 'available' | 'maintenance' | 'rented';
  mileage: number;
  updatedAt: string;
  createdAt: string;
}

export interface MotoPayload {
  plate: string;
  model: string;
  year: number;
  status: Moto['status'];
  mileage: number;
}
main
