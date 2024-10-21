import { validateCPF } from './validateCPF';

describe('validateCPF', () => {
  test('returns true for a valid CPF with exactly 11 digits', () => {
    expect(validateCPF('12345678901')).toBe(true);
  });

  test('returns false for a CPF with non-digit characters', () => {
    expect(validateCPF('123.456.789-01')).toBe(false);
  });

  test('returns false for a CPF with less than 11 digits', () => {
    expect(validateCPF('1234567890')).toBe(false);
  });

  test('returns false for a CPF with more than 11 digits', () => {
    expect(validateCPF('123456789012')).toBe(false);
  });

  test('returns false for an empty string', () => {
    expect(validateCPF('')).toBe(false);
  });
});