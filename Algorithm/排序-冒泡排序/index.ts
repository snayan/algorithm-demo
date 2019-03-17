/* 题目：给定一组数字，使用冒泡排序，把这组数字从小到大排列
1. 这组数字使用数组存储的，
2. 这组数字使用链表存储的。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

/* 使用冒泡排序，把数组存储的数字按照从小到大排序
思路：1. 遍历一遍数组，比较当前数字和它后面一个数字，如果当前数字比后面数字大，则交换它们的位置。
     2. 这样遍历一遍之后，最大的就冒泡到数组最后一个位置了，
     3. 类似的，再从头开始遍历，按照步骤1，把第二大的数字冒泡到倒数第二的位置了，
     4. n遍之后，数组就排好序了。
时间复杂度：O(n * n)
空间复杂度：O(1)
是否稳定排序：是
*/
export function bubbleSortOnArray(arr: number[]) {
  const len = arr.length;

  // 如果数组为空，或则只有一个元素，则直接返回
  if (len < 2) {
    return;
  }

  for (let i = 0; i < len; i++) {
    let hasChanged = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        hasChanged = true;
      }
    }
    // 如果，没有需要交换的了，则说明已经是有序的了
    if (!hasChanged) {
      break;
    }
  }
}

/* 使用冒泡排序，把链表存储的数字按照从小到大排序
思路：1. 遍历一遍链表，比较当前数字和它后面一个数字，如果当前数字比后面数字大，则交换它们的位置。
     2. 这样遍历一遍之后，最大的就冒泡到链表最后一个结点了，
     3. 类似的，再从头开始遍历，按照步骤1，把第二大的数字冒泡到倒数第二的结点了，
     4. n遍之后，链表就排好序了。
时间复杂度：O(n * n)
空间复杂度：O(1)
是否稳定排序：是
*/
export function bubbleSortOnLinkedNode(head: LinkedNode) {
  // 如果链表为空，或者只有一个结点，就直接返回
  if (head === null || head.next === null) {
    return;
  }

  let cursor: LinkedNode = head; // 当前遍历的结点
  let tail: LinkedNode = null; // 未排序的尾结点
  let hasChanged: boolean = false;

  while (cursor && cursor.next && cursor !== tail) {
    let val = cursor.val;
    let nextVal = cursor.next.val;
    if (val > nextVal) {
      // 交换
      cursor.val = nextVal;
      cursor.next.val = val;
      hasChanged = true;
    }
    cursor = cursor.next;
    if (cursor.next === tail) {
      // 遍历一遍了，到达尾结点了
      tail = cursor;
      cursor = head;
      if (!hasChanged) {
        // 如果没有交换的，则说明已经是有序的了
        break;
      } else {
        hasChanged = false;
      }
    }
  }
}

