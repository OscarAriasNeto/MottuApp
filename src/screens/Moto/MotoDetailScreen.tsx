import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useMotos } from '../../hooks/useMotos';
import { formatMileage } from '../../utils/formatters';
import { MotosStackParamList } from '../../navigation/types';
import { Moto } from '../../types/moto';

type Props = NativeStackScreenProps<MotosStackParamList, 'MotoDetail'>;

export function MotoDetailScreen({ route, navigation }: Props) {
  const {
    theme: { colors, spacing, fontSizes },
  } = useAppTheme();
  const { findById } = useMotos();
  const [moto, setMoto] = useState<Moto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await findById(route.params.id);
        setMoto(response);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados da moto.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, [findById, route.params.id]);

  if (loading || !moto) {
    return <Loading message="Carregando moto" />;
  }

  return (
    <Screen>
      <View style={{ flex: 1, padding: spacing.lg, gap: spacing.md }}>
        <View style={[styles.card, { backgroundColor: colors.surface, padding: spacing.md, borderColor: colors.border }]}> 
          <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.lg }]}>{moto.modelo}</Text>
          <Text style={{ color: colors.textMuted }}>Placa: {moto.placa}</Text>
          <Text style={{ color: colors.textMuted }}>Ano: {moto.ano}</Text>
          <Text style={{ color: colors.textMuted }}>Quilometragem: {formatMileage(moto.quilometragem)}</Text>
          <Text style={{ color: colors.textMuted }}>Status: {moto.status}</Text>
        </View>

        <Button title="Editar" onPress={() => navigation.navigate('MotoForm', { id: moto.id })} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  title: {
    fontWeight: '700',
  },
});
