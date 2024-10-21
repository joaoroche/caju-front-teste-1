import { extractNumbers } from './extractNumbers';

describe('extractNumbers', () => {
  test('extracts numbers from a string containing both letters and numbers', () => {
    expect(extractNumbers('abc123def')).toBe('123');
  });

  test('returns an empty string when there are no numbers', () => {
    expect(extractNumbers('abcdef')).toBe('');
  });

  test('returns the same string when the input contains only numbers', () => {
    expect(extractNumbers('123456')).toBe('123456');
  });

  test('handles special characters and spaces correctly', () => {
    expect(extractNumbers('a1!b2@c3#')).toBe('123');
    expect(extractNumbers(' 1 2 3 ')).toBe('123');
  });

  test('handles an empty string input', () => {
    expect(extractNumbers('')).toBe('');
  });
});