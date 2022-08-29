/**
 * @name capitalizeFirstLetterInEachWord
 * @param {string} str
 * @returns {string}
 * @description Capitalize first letter in each word
 */

export const capitalizeFirstLetterInEachWord = (str: string): string => {
  return str
    .replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(/\s/g, " ");
};
