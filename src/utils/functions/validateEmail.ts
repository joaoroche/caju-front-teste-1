const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates that the email provided is in the correct format.
 *
 * @param {string} email - The email to be validated.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  return REGEX_EMAIL.test(email);
}