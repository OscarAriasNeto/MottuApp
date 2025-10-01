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
}
