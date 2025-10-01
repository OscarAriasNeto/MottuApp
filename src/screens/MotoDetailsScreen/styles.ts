import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  motoImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  detailsContainer: {
    width: '100%',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#169BA4',
    marginTop: 12,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '400',
  },
});
