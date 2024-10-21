import { validateName } from './validateName';

describe('validateName', () => {
  test('returns true for a valid name with two words', () => {
    expect(validateName('John Doe')).toBe(true);
  });

  test('returns true for a valid name with more than two words', () => {
    expect(validateName('John Michael Doe')).toBe(true);
  });

  test('returns false for a name with numbers', () => {
    expect(validateName('John Doe123')).toBe(false);
  });

  test('returns false for a name with special characters', () => {
    expect(validateName('John@Doe')).toBe(false);
  });

  test('returns false for a single word name', () => {
    expect(validateName('John')).toBe(false);
  });

  test('returns false for an empty string', () => {
    expect(validateName('')).toBe(false);
  });
});