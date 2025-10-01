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
