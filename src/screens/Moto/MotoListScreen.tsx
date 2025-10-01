import React from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useMotos } from '../../hooks/useMotos';
import { formatMileage } from '../../utils/formatters';
import { MotosStackParamList } from '../../navigation/types';
import { Moto } from '../../types/moto';

type Props = NativeStackScreenProps<MotosStackParamList, 'MotoList'>;

export function MotoListScreen({ navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { motos, isLoading, error, reload, remove } = useMotos();

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload]),
  );

  const handleDelete = (moto: Moto) => {
    Alert.alert('Excluir moto', `Deseja remover a moto ${moto.placa}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await remove(moto.id);
            Alert.alert('Sucesso', 'Moto removida.');
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover a moto agora.');
          }
        },
      },
    ]);
  };

  return (
    <Screen>
      <View style={{ flex: 1, padding: spacing.lg, gap: spacing.md }}>
        <Button title="Cadastrar moto" onPress={() => navigation.navigate('MotoForm')} />

        {error ? <Text style={{ color: colors.danger }}>{error}</Text> : null}

        <FlatList
          data={motos}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} />}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                title="Nenhuma moto"
                description="Cadastre a primeira moto da sua frota."
                actionLabel="Criar moto"
                onActionPress={() => navigation.navigate('MotoForm')}
              />
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}
              onPress={() => navigation.navigate('MotoDetail', { id: item.id })}
              accessibilityRole="button"
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.lg }]}>{item.modelo}</Text>
                <TouchableOpacity onPress={() => handleDelete(item)} accessibilityRole="button">
                  <Text style={{ color: colors.danger }}>Excluir</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: colors.textMuted }}>Placa: {item.placa}</Text>
              <Text style={{ color: colors.textMuted }}>Ano: {item.ano}</Text>
              <Text style={{ color: colors.textMuted }}>Quilometragem: {formatMileage(item.quilometragem)}</Text>
              <Text style={{ color: colors.textMuted }}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: '700',
  },
});
