export const getSubArrayBySize = (array, size = 10) => {
  let result = [];
  for (let index = 0; index < Math.ceil(array.length / size); index++) {
    result[index] = array.slice((index * size), (index * size) + size);
  }
  return result;
};
