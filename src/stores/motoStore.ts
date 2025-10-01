import { create } from 'zustand';

import { Moto, MotoPayload } from '../types/moto';
import * as motoService from '../services/api/motos';

interface MotoState {
  motos: Moto[];
  isLoading: boolean;
  isRefreshing: boolean;
  error?: string;
  fetchMotos: () => Promise<void>;
  refreshMotos: () => Promise<void>;
  addMoto: (payload: MotoPayload) => Promise<Moto>;
  updateMoto: (id: string, payload: Partial<MotoPayload>) => Promise<Moto>;
  removeMoto: (id: string) => Promise<void>;
  syncOffline: () => Promise<void>;
}

export const useMotoStore = create<MotoState>((set, get) => ({
  motos: [],
  isLoading: false,
  isRefreshing: false,
  async fetchMotos() {
    set({ isLoading: true, error: undefined });
    try {
      const data = await motoService.getMotos();
      set({ motos: data });
    } catch (error) {
      set({ error: 'Não foi possível carregar as motos. Verifique sua conexão.' });
    } finally {
      set({ isLoading: false });
    }
  },
  async refreshMotos() {
    set({ isRefreshing: true });
    try {
      const data = await motoService.getMotos();
      set({ motos: data });
    } catch (error) {
      set({ error: 'Sem conexão. Exibindo dados em cache.' });
    } finally {
      set({ isRefreshing: false });
    }
  },
  async addMoto(payload: MotoPayload) {
    const moto = await motoService.createMoto(payload);
    set({ motos: [moto, ...get().motos.filter((item) => item.id !== moto.id)] });
    return moto;
  },
  async updateMoto(id: string, payload: Partial<MotoPayload>) {
    const moto = await motoService.updateMoto(id, payload);
    set({ motos: get().motos.map((item) => (item.id === id ? moto : item)) });
    return moto;
  },
  async removeMoto(id: string) {
    await motoService.deleteMoto(id);
    set({ motos: get().motos.filter((item) => item.id !== id) });
  },
  async syncOffline() {
    await motoService.processOfflineQueue();
    const data = await motoService.getMotos();
    set({ motos: data });
  },
}));
