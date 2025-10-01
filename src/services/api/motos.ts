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
import { v4 as uuidv4 } from 'uuid';
import { api } from './client';
import { MOTOS_ENDPOINT } from './endpoints';
import { Moto, MotoPayload } from '../../types/moto';
import { getObject, saveObject } from '../../utils/storage';
import { consumeQueue, enqueueMutation } from '../../utils/offlineQueue';

const MOTOS_CACHE_KEY = '@mottuapp/cache/motos';
const MOTOS_QUEUE_KEY = '@mottuapp/queue/motos';

export async function getMotos(): Promise<Moto[]> {
  try {
    const response = await api.get<Moto[]>(MOTOS_ENDPOINT);
    await saveObject(MOTOS_CACHE_KEY, response.data);
    return response.data;
  } catch (error) {
    const cached = await getObject<Moto[]>(MOTOS_CACHE_KEY);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

export async function getMotoById(id: string): Promise<Moto> {
  try {
    const response = await api.get<Moto>(`${MOTOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    const cached = await getObject<Moto[]>(MOTOS_CACHE_KEY);
    const moto = cached?.find((item) => item.id === id);
    if (moto) {
      return moto;
    }
    throw error;
  }
}

export async function createMoto(payload: MotoPayload): Promise<Moto> {
  try {
    const response = await api.post<Moto>(MOTOS_ENDPOINT, payload);
    await refreshCacheWithMutation(response.data, 'create');
    return response.data;
  } catch (error) {
    const offlineMoto: Moto = {
      id: uuidv4(),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await enqueueMutation(MOTOS_QUEUE_KEY, {
      id: offlineMoto.id,
      endpoint: MOTOS_ENDPOINT,
      method: 'POST',
      payload,
      timestamp: Date.now(),
    });

    await refreshCacheWithMutation(offlineMoto, 'create');
    return offlineMoto;
  }
}

export async function updateMoto(id: string, payload: Partial<MotoPayload>): Promise<Moto> {
  try {
    const response = await api.put<Moto>(`${MOTOS_ENDPOINT}/${id}`, payload);
    await refreshCacheWithMutation(response.data, 'update');
    return response.data;
  } catch (error) {
    await enqueueMutation(MOTOS_QUEUE_KEY, {
      id,
      endpoint: `${MOTOS_ENDPOINT}/${id}`,
      method: 'PUT',
      payload,
      timestamp: Date.now(),
    });

    const cached = (await getObject<Moto[]>(MOTOS_CACHE_KEY)) ?? [];
    const updated = cached.map((item) =>
      item.id === id
        ? {
            ...item,
            ...payload,
            updatedAt: new Date().toISOString(),
          }
        : item,
    );
    await saveObject(MOTOS_CACHE_KEY, updated);
    const moto = updated.find((item) => item.id === id);
    if (!moto) {
      throw error;
    }
    return moto;
  }
}

export async function deleteMoto(id: string): Promise<void> {
  try {
    await api.delete(`${MOTOS_ENDPOINT}/${id}`);
    await refreshCacheWithMutation({ id } as Moto, 'delete');
  } catch (error) {
    await enqueueMutation(MOTOS_QUEUE_KEY, {
      id,
      endpoint: `${MOTOS_ENDPOINT}/${id}`,
      method: 'DELETE',
      payload: {},
      timestamp: Date.now(),
    });
    await refreshCacheWithMutation({ id } as Moto, 'delete');
  }
}

export async function processOfflineQueue(): Promise<void> {
  const mutations = await consumeQueue<Partial<MotoPayload>>(MOTOS_QUEUE_KEY);
  if (mutations.length === 0) {
    return;
  }

  for (const mutation of mutations) {
    try {
      if (mutation.method === 'POST') {
        await api.post(mutation.endpoint, mutation.payload);
      }
      if (mutation.method === 'PUT') {
        await api.put(mutation.endpoint, mutation.payload);
      }
      if (mutation.method === 'DELETE') {
        await api.delete(mutation.endpoint);
      }
    } catch (error) {
      // re-enqueue for next retry cycle
      await enqueueMutation(MOTOS_QUEUE_KEY, mutation);
    }
  }
}

async function refreshCacheWithMutation(moto: Moto, type: 'create' | 'update' | 'delete'): Promise<void> {
  const cached = (await getObject<Moto[]>(MOTOS_CACHE_KEY)) ?? [];
  if (type === 'create') {
    const updated = [moto, ...cached.filter((item) => item.id !== moto.id)];
    await saveObject(MOTOS_CACHE_KEY, updated);
    return;
  }

  if (type === 'update') {
    const updated = cached.map((item) => (item.id === moto.id ? { ...item, ...moto } : item));
    await saveObject(MOTOS_CACHE_KEY, updated);
    return;
  }

  if (type === 'delete') {
    const updated = cached.filter((item) => item.id !== moto.id);
    await saveObject(MOTOS_CACHE_KEY, updated);
  }
main
}
