const REGEX_CPF_WITHOUT_MASK = /^\d{11}$/;

/**
 * Validates a CPF string.
 * The CPF is considered valid if it has exactly 11 digits.
 * No mask is allowed.
 * @param {string} cpf - The CPF string to be validated.
 * @returns {boolean} Whether the CPF is valid or not.
 * @example
 * validateCPF('12345678901'); // true
 * validateCPF('123.456.789-01'); // false
 */
export const validateCPF = (cpf: string) => {
  return REGEX_CPF_WITHOUT_MASK.test(cpf);
}
