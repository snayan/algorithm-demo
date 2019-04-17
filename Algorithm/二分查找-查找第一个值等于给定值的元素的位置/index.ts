/* 对于给定有序数组，查找出第一个值等于给定值的元素的位置 */

import { binarySearchByWhile } from '../二分查找-循环和递归实现简单的二分查找';

/* 思路：1. 先使用二分查找，找到当前值等于给定值的位置i
        2. 如果i === 0，则i就是第一个值等于给定值的位置
        3. 否则，一直遍历i前面的，直到不等于给定值的位置，则此时i+1就是要找的位置
*/
export function findFirstIndex(arr: number[], value: number) {
  const len = arr.length;

  // 数组为空，则直接返回-1
  if (len < 1) {
    return -1;
  } else if (len === 1 && arr[0] === value) {
    return 0;
  }

  // 二分查找
  let index = binarySearchByWhile(arr, value);
  if (index === -1 || index === 0) {
    return index;
  }

  // 找第一个
  while (~index) {
    if (arr[index] !== value) {
      return index + 1;
    }
    index = index - 1;
  }
}
