export function maskLicensePlate(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 7)
    .toUpperCase()
    .replace(/([A-Z]{3})(\d{1})([A-Z\d]{1})(\d{2})/, '$1$2$3$4');
}

export function formatMileage(value: number) {
  return `${value.toLocaleString('pt-BR')} km`;
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
main
}
