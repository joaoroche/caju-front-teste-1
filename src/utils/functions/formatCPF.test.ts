import { formatCpf } from './formatCPF';

describe('formatCpf', () => {
  test('formats a CPF with exactly 11 digits correctly', () => {
    expect(formatCpf('12345678901')).toBe('123.456.789-01');
  });

  test('formats a CPF with less than 11 digits correctly', () => {
    expect(formatCpf('123')).toBe('123');
    expect(formatCpf('1234')).toBe('123.4');
    expect(formatCpf('123456')).toBe('123.456');
    expect(formatCpf('1234567')).toBe('123.456.7');
    expect(formatCpf('12345678')).toBe('123.456.78');
    expect(formatCpf('123456789')).toBe('123.456.789');
    expect(formatCpf('1234567890')).toBe('123.456.789-0');
  });

  test('handles a CPF with non-digit characters correctly', () => {
    expect(formatCpf('abc123def456ghi78901')).toBe('123.456.789-01');
    expect(formatCpf('123.456.789-01')).toBe('123.456.789-01');
  });

  test('handles an empty string input', () => {
    expect(formatCpf('')).toBe('');
  });

  test('handles a CPF with more than 11 digits correctly', () => {
    expect(formatCpf('123456789012')).toBe('123.456.789-01');
    expect(formatCpf('123456789012345')).toBe('123.456.789-01');
  });
});