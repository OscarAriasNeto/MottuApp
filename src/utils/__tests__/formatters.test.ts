import { maskLicensePlate, formatMileage } from '../formatters';

describe('formatters', () => {
  it('formats license plates to Mercosul pattern', () => {
    expect(maskLicensePlate('abc1d23')).toBe('ABC1D23');
    expect(maskLicensePlate('abc1234')).toBe('ABC1234');
  });

  it('formats mileage with km suffix', () => {
    expect(formatMileage(1500)).toBe('1.500 km');
  });
});
