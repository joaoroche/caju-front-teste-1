import { formatDate } from './formatDate';

describe('formatDate', () => {
  test('correctly formats a valid date string in YYYY-MM-DD format', () => {
    expect(formatDate('2023-10-05')).toBe('05/10/2023');
  });

  test('handles an invalid date string', () => {
    expect(formatDate('2023-13-05')).toBe('05/13/2023');
  });

  test('handles an empty string input', () => {
    expect(formatDate('')).toBe('undefined/undefined/undefined');
  });

  test('handles a date string with missing parts', () => {
    expect(formatDate('2023-10')).toBe('undefined/10/2023');
  });

  test('handles a date string with extra parts', () => {
    expect(formatDate('2023-10-05-12')).toBe('05/10/2023');
  });
});