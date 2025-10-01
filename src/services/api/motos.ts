import { api } from './client';
import { Moto, MotoStatus } from '../../types/moto';

type MotoResponse = {
  id: string;
  placa: string;
  modelo: string;
  ano: string;
  quilometragem: string;
  status: MotoStatus;
};

function mapMoto(data: MotoResponse): Moto {
  return {
    id: data.id,
    placa: data.placa,
    modelo: data.modelo,
    ano: Number(data.ano),
    quilometragem: Number(data.quilometragem),
    status: data.status,
  };
}

export async function fetchMotos(): Promise<Moto[]> {
  const response = await api.get<MotoResponse[]>('/motos');
  return response.data.map(mapMoto);
}

export async function fetchMotoById(id: string): Promise<Moto> {
  const response = await api.get<MotoResponse>(`/motos/${id}`);
  return mapMoto(response.data);
}

export async function createMoto(payload: Omit<Moto, 'id'>): Promise<Moto> {
  const response = await api.post<MotoResponse>('/motos', {
    ...payload,
    ano: String(payload.ano),
    quilometragem: String(payload.quilometragem),
  });
  return mapMoto(response.data);
}

export async function updateMoto(id: string, payload: Omit<Moto, 'id'>): Promise<Moto> {
  const response = await api.put<MotoResponse>(`/motos/${id}`, {
    ...payload,
    ano: String(payload.ano),
    quilometragem: String(payload.quilometragem),
  });
  return mapMoto(response.data);
}

export async function deleteMoto(id: string): Promise<void> {
  await api.delete(`/motos/${id}`);
}
