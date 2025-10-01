import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff5a5f',
  },
  forgotPasswordText: {
    color: '#169BA4',
    textAlign: 'right',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#169BA4',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  devButton: {
    borderWidth: 1,
    borderColor: '#169BA4',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  devButtonText: {
    color: '#169BA4',
    fontSize: 15,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontSize: 14,
  },
  registerText: {
    fontSize: 14,
    color: '#169BA4',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff5a5f',
    fontSize: 12,
    marginTop: 4,
  },
  authErrorText: {
    color: '#ff5a5f',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
});
