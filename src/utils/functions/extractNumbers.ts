/**
 * Extracts only numeric characters from a given string.
 *
 * @param {string} value - The input string from which to extract numbers.
 * @returns {string} A string containing only the numeric characters from the input.
 */
export const extractNumbers = (value: string): string => {
  return value.replace(/\D/g, "");
};
