/* 题目：给定一组数字，使用快速排序，把这组数字从小到大排列
1. 这组数字使用数组存储的，
2. 这组数字使用链表存储的。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

/* 使用快速排序，把数组存储的数字按照从小到大排序
思路：1. 选择数组最后一个数字作为pivot
     2. 遍历数组，比较每个数字与pivot的大小，
     3. 如果比pivot小，则放在前面去，如果比pivot大，则放在后面去，把pivot放在中间，
     4. 那么数组就分为三个部分，前部分 < pivot < 后部分
     5. 然后类似的对前部分和后部分做步骤1到步骤4的操作，直到每个区间只有一个数字
时间复杂度：O(n * logn)
空间复杂度：O(1)
是否稳定排序：否
*/
export function quickSortOnArray(arr: number[]) {
  const len = arr.length;

  // 如果数组为空，或则只有一个数字，则直接返回
  if (len < 2) {
    return;
  }

  const swap = (arr: number[], i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  // 分区函数，对数组中下标从p到r到区间做分区
  const partition = (arr: number[], left: number, right: number): number => {
    /* 1. 选择arr[r]作为分区pivot
       2. 将区间p到r-1分为2个部分，前部分是已处理的部分，后部分是未处理的部分
       3. 每次从未处理部分，取出一个数字，与pivot比较，如果比pivot小，则放在已处理部分的最后，
       4. 直到未处理部分为空
       5. 最后，将pivot放入到合适的位置
     */
    const pivot = arr[right];
    let middle = left;
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        swap(arr, middle, j);
        middle = middle + 1;
      }
    }
    swap(arr, middle, right);
    return middle;
  };

  // 递归
  const sort = (arr: number[], left: number, right: number) => {
    //  如果当前区间只有一个数字，则递归结束
    if (left >= right) {
      return;
    }
    //  分区并返回分区点
    const middle = partition(arr, left, right);

    // 对前半部分递归
    sort(arr, left, middle - 1);

    // 对后半部分递归
    sort(arr, middle + 1, right);
  };

  sort(arr, 0, len - 1);
}

/* 使用快速排序，把链表存储的数字按照从小到大排序
思路：1. 选择链表头节点作为分区节点，pivot
     2. 从头节点开始遍历，如果节点小于pivot，则放在前部分，否则放到后部分
     3. 一轮之后，得到 前部分 < pivot < 后部分
     4. 类似的对前部分重复步骤1到步骤3，对后部分也重复步骤1到步骤3
时间复杂度：O(n * logn)
空间复杂度：O(1)
是否稳定排序：否
 */
export function quickSortOnLinkedNode(head: LinkedNode) {
  // 如果链表为空或则只有1个节点，则直接返回
  if (head === null || head.next === null) {
    return;
  }

  const swap = (i: LinkedNode, j: LinkedNode) => {
    const tmp = i.val;
    i.val = j.val;
    j.val = tmp;
  };

  // 对区间 head 到 tail做分区，并返回分区节点
  const partition = (head: LinkedNode, tail: LinkedNode) => {
    /* 思路：1. 每次直接选取区间尾节点节点作为分区节点
            2. 把当前区间分为2部分，前面是已处理部分，后面是未处理部分，且前部分只小于pivot
            3. 每次从未处理部分取一个节点，比较与pivot大小，如果比pivot小，则放到前部分尾部
            4. 直到未处理部分为空，
            5. 最后，将pivot放入到合适的位置
     */
    const pivot = tail.val; // 选取尾节点为pivot
    let preNode = null;
    let middle = head; // middle区分已处理部分和未处理部分
    let cursor = head; // 从头节点开始
    while (cursor != tail) {
      if (cursor.val < pivot) {
        swap(middle, cursor);
        preNode = middle;
        middle = middle.next;
      }
      cursor = cursor.next;
    }

    swap(middle, tail);

    // 如果middle == head，则说明没有小于pivot的部分，如果middle === tail，则说明没有大于pivot的部分
    return [middle === head ? null : preNode, middle === tail ? null : middle.next];
  };

  const sort = (head: LinkedNode, tail: LinkedNode) => {
    // 如果当前分区只有一个节点，则返回
    if (head === tail || head == null || tail == null) {
      return;
    }

    // 做分区，并返回分区节点
    const [preNode, nextNode] = partition(head, tail);

    // 递归，前部分
    sort(head, preNode);
    // 递归，后部分
    sort(nextNode, tail);
  };

  // 便利一遍，找到尾节点
  let tail = head.next;
  while (tail.next) {
    tail = tail.next;
  }
  sort(head, tail);
}
