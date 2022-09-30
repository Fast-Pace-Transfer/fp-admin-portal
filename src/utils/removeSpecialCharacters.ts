/**
 * @name removeSpecialCharacters
 * @param {string} str
 * @returns {string}
 * @description Remove special characters from string
 */

export const removeSpecialCharacters = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9]/g, " ");
};
