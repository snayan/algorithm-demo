/* 题目：给定一个无序数组，如何快速找到第K大的元素
要求：时间复杂度为O(n)
*/

/* 思路：1. 利用快速排序思想，取数组最后一个元素为分区数据pivot
        2. 对数组从大到小原地分区，此时 pivot 中对应的下标为p，数组分为三个部分，[0，p-1] > p > [p+1, n-1]
        3. 如果 p + 1 == k, 则 pivot 就是第K大元素，如果p + 1 < K，则说明第K大元素在[p+1, n-1] 区间，如果 p + 1 > k， 则说明第K大元素在[0, p-1]区间内
        4. 重复步骤1到步骤3，直到区间只有一个元素
时间复杂度：n + n/2 + n/4 + n/8 + ... + 1 = 2*n-1 = O(n)
空间复杂度：O(1)
*/
export function findKst(arr: number[], k: number) {
  const len = arr.length;

  // 如果K不是有效数值，则直接返回，则的有效范围应该是1 ... len
  if (k < 1 || k > len) {
    return null;
  }

  // 如果数组只有一个元素，则直接返回
  if (len === 1) {
    return arr[0];
  }

  const swap = (arr: number[], i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  /* 分区函数 */
  const partition = (arr: number[], start: number, end: number) => {
    if (start >= end) {
      return arr[start];
    }

    const pivot = arr[end];
    let j = start;
    for (let i = start; i < end; i++) {
      if (arr[i] >= pivot) {
        swap(arr, i, j);
        j = j + 1;
      }
    }

    swap(arr, j, end);

    // 分曲之后，j 就是当前pivot下标，
    if (j + 1 == k) {
      return arr[j];
    } else if (j + 1 < k) {
      return partition(arr, j + 1, end);
    } else {
      return partition(arr, start, j - 1);
    }
  };

  return partition(arr, 0, len - 1);
}
