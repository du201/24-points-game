/**
 * return a deepcopy of the original object
 * @param {any object} original 
 */
export const deepCopy = (original) => {
  return JSON.parse(JSON.stringify(original));
};