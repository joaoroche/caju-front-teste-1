import { validateEmail } from './validateEmail';

describe('validateEmail', () => {
  test('returns true for a valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('returns false for an email without an "@" symbol', () => {
    expect(validateEmail('testexample.com')).toBe(false);
  });

  test('returns false for an email without a domain', () => {
    expect(validateEmail('test@')).toBe(false);
  });

  test('returns false for an email without a top-level domain', () => {
    expect(validateEmail('test@example')).toBe(false);
  });

  test('returns false for an email with spaces', () => {
    expect(validateEmail('test @example.com')).toBe(false);
    expect(validateEmail('test@ example.com')).toBe(false);
    expect(validateEmail('test@example .com')).toBe(false);
  });

  test('returns false for an empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});