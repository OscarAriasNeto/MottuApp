export function maskLicensePlate(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 7)
    .toUpperCase()
    .replace(/([A-Z]{3})(\d{1})([A-Z\d]{1})(\d{2})/, '$1$2$3$4');
}

export function formatMileage(value: number) {
  return `${value.toLocaleString('pt-BR')} km`;
}
