/**
 * if the name string is longer than 10 letters, use ... at the end instead to shorten the total length
 * @param {any object} original 
 */
export const shortenName = (original) => {
  if (original.length > 10) {
    return original.slice(0, 10) + "...";
  }
  return original;
};