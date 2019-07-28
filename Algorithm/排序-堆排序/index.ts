/* 对于给定的一组数字，使用堆排序，实现从小到大的顺序排序 */

/* 思路：1. 先对数组进行原地建一个大顶堆，堆顶元素就是最大值
        2. 将数组分为已排序和未排序，已排序在数组后面，未排序部分就是堆
        3. 每次从未排序中，删除堆顶元素，将它加到已排序的首位
        4. 依次步骤3，直到堆为空，
  时间复杂度：O(n*logn)
  空间复杂度：O(1)
  是否稳定：否，因为堆化过程存在交换
*/
export function heapSort(arr: Array<number>) {

  if (!arr.length) {
    return arr;
  }
  const len = arr.length;

  const swap = (i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  // 原地建堆，从第一个元素开始插入堆，堆化过程是从下往上
  for (let i = 1; i < len; i++) {
    let current = i;
    let parent = (current - 1) >> 1;
    let finished = false;

    while (!finished) {
      if (arr[current] > arr[parent]) {
        swap(current, parent);
        current = parent;
        parent = (current - 1) >> 1;
        finished = current < 1;
      } else {
        finished = true;
      }
    }
  }

  // 排序
  for (let i = len - 1; i > 0; i--) {
    // 删除堆顶元素，并将它放入已排序位置
    swap(0, i);

    // 从上往下，开始堆化
    let finished = false;
    let current = 0;
    let maxPos = current;
    while (!finished) {
      let left = (current << 1) + 1;
      let right = left + 1;
      if (left < i && arr[left] > arr[maxPos]) {
        maxPos = left;
      }
      if (right < i && arr[right] > arr[maxPos]) {
        maxPos = right;
      }
      finished = maxPos === current;
      if (!finished) {
        swap(current, maxPos);
        current = maxPos;
      }
    }
  }

}
