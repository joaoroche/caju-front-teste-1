const REGEX_NAME = /^(?![0-9])[A-Za-zÀ-ÖØ-ÿ]{2,}(?:\s[A-Za-zÀ-ÖØ-ÿ]{2,})+$/;

/**
 * Validates that the given name is in the correct format.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if the name is valid, false otherwise.
 */
export const validateName = (name: string): boolean => {
  return REGEX_NAME.test(name);
}