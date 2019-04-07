/* 题目：对于一组有序的数组，如何快速查找出给定的数值 */

/**
 * 对于给定的有序数组，使用循环实现二分查找
 *
 * @export
 * @param {number[]} arr 有序数组，从小到大有序
 * @param {number} value 要查找的数据
 * @returns {number} 返回下标，-1表示没有找到
 */
export function binarySearchByWhile(arr: number[], value: number): number {
  const len = arr.length;

  // 如果数组为空，则直接返回-1
  if (len < 1) {
    return -1;
  }

  let low: number = 0;
  let high: number = len - 1;
  let mid: number;

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    if (arr[mid] < value) {
      low = mid + 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  // 最后，没有找到，就返回-1
  return -1;
}

/**
 * 对于给定的有序数组，使用递归实现二分查找
 *
 * @export
 * @param {number[]} arr 有序数组，从小到大有序
 * @param {number} value 要查找的数据
 * @returns {number} 返回下标，-1表示没有找到
 */
export function binarySearchByRecursive(arr: number[], value: number): number {
  const len = arr.length;

  // 数组为空，则直接返回-1
  if (len < 1) {
    return -1;
  }

  // 区间查找
  const search = (low: number, high: number): number => {
    if (low > high) {
      return -1;
    }
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] < value) {
      return search(mid + 1, high);
    } else if (arr[mid] > value) {
      return search(low, mid - 1);
    } else {
      return mid;
    }
  };

  return search(0, len - 1);
}
