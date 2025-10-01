import { useCallback, useEffect, useState } from 'react';

import { createMoto, deleteMoto, fetchMotoById, fetchMotos, updateMoto } from '../services/api/motos';
import { saveMotosCache, getMotosCache } from '../storage/motoStorage';
import { Moto } from '../types/moto';

export function useMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchMotos();
      setMotos(response);
      await saveMotosCache(response);
    } catch (err) {
      const cached = await getMotosCache();
      if (cached) {
        setMotos(cached);
        setError('Exibindo dados offline. Conecte-se para atualizar.');
      } else {
        setError('Não foi possível carregar as motos.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const findById = useCallback(async (id: string) => {
    const found = motos.find((item) => item.id === id);
    if (found) {
      return found;
    }
    return fetchMotoById(id);
  }, [motos]);

  const create = useCallback(
    async (payload: Omit<Moto, 'id'>) => {
      const created = await createMoto(payload);
      const nextMotos = [created, ...motos];
      setMotos(nextMotos);
      await saveMotosCache(nextMotos);
      return created;
    },
    [motos],
  );

  const update = useCallback(
    async (id: string, payload: Omit<Moto, 'id'>) => {
      const updated = await updateMoto(id, payload);
      const nextMotos = motos.map((item) => (item.id === id ? updated : item));
      setMotos(nextMotos);
      await saveMotosCache(nextMotos);
      return updated;
    },
    [motos],
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteMoto(id);
      const nextMotos = motos.filter((item) => item.id !== id);
      setMotos(nextMotos);
      await saveMotosCache(nextMotos);
    },
    [motos],
  );

  return { motos, isLoading, error, reload: load, findById, create, update, remove };
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { useMotoStore } from '../stores/motoStore';

export function useMotos() {
  const motos = useMotoStore((state) => state.motos);
  const isLoading = useMotoStore((state) => state.isLoading);
  const isRefreshing = useMotoStore((state) => state.isRefreshing);
  const error = useMotoStore((state) => state.error);
  const fetchMotos = useMotoStore((state) => state.fetchMotos);
  const refreshMotos = useMotoStore((state) => state.refreshMotos);
  const addMoto = useMotoStore((state) => state.addMoto);
  const updateMoto = useMotoStore((state) => state.updateMoto);
  const removeMoto = useMotoStore((state) => state.removeMoto);
  const syncOffline = useMotoStore((state) => state.syncOffline);

  useEffect(() => {
    fetchMotos();
  }, [fetchMotos]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        syncOffline();
      }
    });

    return () => unsubscribe();
  }, [syncOffline]);

  return {
    motos,
    isLoading,
    isRefreshing,
    error,
    fetchMotos,
    refreshMotos,
    addMoto,
    updateMoto,
    removeMoto,
  };
main
}
