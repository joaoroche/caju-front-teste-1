import { extractNumbers } from "./extractNumbers";

/**
 * Formats a CPF string by adding a mask.
 * The CPF is formatted as XXX.XXX.XXX-XX.
 * Only digits are kept, and extra characters are removed.
 *
 * @param {string} cpf - The CPF string to be formatted.
 * @returns {string} The formatted CPF string with the mask.
 */
export const formatCpf = (cpf: string) => {
  const digitsOnly = extractNumbers(cpf);

  if (digitsOnly.length <= 3) return digitsOnly;
  if (digitsOnly.length <= 6) return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3)}`;
  if (digitsOnly.length <= 9) return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6)}`;
  return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}-${digitsOnly.slice(9, 11)}`;
};