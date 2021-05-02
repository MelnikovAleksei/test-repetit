const DEFAULT_SIZE: number = 10;

const getSubArrayBySize = (arr: number[], size: number = DEFAULT_SIZE): number[][] => {
  let result: number[][] = [];
  for (let index: number = 0; index < Math.ceil(arr.length / size); index++) {
    result[index] = arr.slice((index * size), (index * size) + size);
  }
  return result;
}

export default getSubArrayBySize;
