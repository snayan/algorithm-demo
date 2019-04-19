/* 对于给定有序数组，查找第一个大于等于给定值的元素的位置 */

export function findFirstGreaterThan(arr: number[], value: number) {
  const len = arr.length;

  // 数组为空，则直接返回
  if (len < 1) {
    return -1;
  } else if (len === 1 && arr[0] >= value) {
    return 0;
  }

  let low = 0;
  let hight = len - 1;
  while (low < hight) {
    let mid = Math.floor((hight - low) / 2) + low;
    if (arr[mid] >= value) {
      // 如果当前mid = 0 或则 mid 后面一个小于value，则mid就是我们要找的值
      if (mid === 0 || arr[mid - 1] < value) {
        return mid;
      }
      hight = mid - 1;
    } else {
      // 如果当前mid 没有到达数组尾部，且mid 的下一个大于等于value，则mid+1就是我们要找的值
      if (mid !== len - 1 && arr[mid + 1] >= value) {
        return mid + 1;
      }
      low = mid + 1;
    }
  }

  return -1;
}
