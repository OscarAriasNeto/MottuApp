import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useMotos } from '../../hooks/useMotos';
import { AppTabParamList, RootStackParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function DashboardScreen({ navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { motos, isLoading, error, reload } = useMotos();

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload]),
  );

  const summary = useMemo(() => {
    const total = motos.length;
    const disponiveis = motos.filter((moto) => moto.status === 'disponivel').length;
    const emUso = motos.filter((moto) => moto.status === 'em_uso').length;
    const manutencao = motos.filter((moto) => moto.status === 'manutencao').length;
    return { total, disponiveis, emUso, manutencao };
  }, [motos]);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} />}
      >
        <View>
          <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Resumo geral</Text>
          <Text style={{ color: colors.textMuted }}>Acompanhe os principais indicadores da frota.</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}> 
            <Text style={[styles.cardTitle, { color: colors.textMuted }]}>Total</Text>
            <Text style={[styles.cardValue, { color: colors.text }]}>{summary.total}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}> 
            <Text style={[styles.cardTitle, { color: colors.textMuted }]}>Disponíveis</Text>
            <Text style={[styles.cardValue, { color: colors.success }]}>{summary.disponiveis}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}> 
            <Text style={[styles.cardTitle, { color: colors.textMuted }]}>Em uso</Text>
            <Text style={[styles.cardValue, { color: colors.secondary }]}>{summary.emUso}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}> 
            <Text style={[styles.cardTitle, { color: colors.textMuted }]}>Manutenção</Text>
            <Text style={[styles.cardValue, { color: colors.danger }]}>{summary.manutencao}</Text>
          </View>
        </View>

        {error ? <Text style={{ color: colors.danger }}>{error}</Text> : null}

        <Button title="Ver todas as motos" onPress={() => navigation.navigate('Motos')} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
  },
});
