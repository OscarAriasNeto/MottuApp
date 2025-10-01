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
}
