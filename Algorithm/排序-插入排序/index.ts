/* 题目：给定一组数字，使用插入排序，把这组数字从小到大排列
1. 这组数字使用数组存储的，
2. 这组数字使用链表存储的。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

/* 使用插入排序，把数组存储的数字按照从小到大排序
思路：1. 把数组分成两部分，前半部分是排好序的，后半部分是待排序的，
     2. 依次从后半部分选择一个元素，把它插入到前半部分合适位置，使前半部分依旧有序
     3. 当后半部分全部插入到前半部分时，整个数组就是有序的了
时间复杂度：O(n * n)
空间复杂度：O(1)
是否稳定排序：是
*/
export function insertionSortOnArray(arr: number[]) {
  const len = arr.length;

  // 如果数组为空，或则数组只有一个元素时，直接返回
  if (len < 2) {
    return;
  }

  // 第一个当作有序的，从第二个元素开始，
  for (let i = 1; i < len; i++) {
    let index = i; // 标志可插入位置
    const tmp = arr[i]; // 暂存当前元素
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        index = j;
        break;
      }
    }
    // 将前部分中可以插入位置index之后原始依次往后移动
    for (let j = i; j > index; j--) {
      arr[j] = arr[j - 1];
    }
    // 将元素插入
    arr[index] = tmp;
  }
}

/* 使用插入排序，把链表存储的数字按照从小到大排序
思路：1. 把链表结点分成两部分，前半部分是排好序的，后半部分是待排序的，
     2. 依次从后半部分选择一个元素，把它插入到前半部分合适位置，使前半部分依旧有序
     3. 当后半部分全部插入到前半部分时，整个链表就是有序的了
时间复杂度：O(n * n)
空间复杂度：O(1)
是否稳定排序：是
*/
export function insertionSortOnLinkedNode(head: LinkedNode) {
  // 链表为空，或则链表只有一个结点，直接返回
  if (head === null || head.next === null) {
    return head;
  }

  let cursor: LinkedNode = head.next; // 后半部分结点
  head.next = null; //  前部分结点

  let node: LinkedNode;
  let find: LinkedNode = head;
  let pre: LinkedNode = null;
  let hasInsert: boolean = false;
  while (cursor) {
    find = head; // 每次都从头开始找
    pre = null; // 上一个结点
    hasInsert = false;
    node = cursor; // 从后半段取一个结点
    cursor = cursor.next;
    while (find) {
      if (node.val < find.val) {
        // 找到要插入的位置了
        hasInsert = true;
        if (pre === null) {
          // 插入到链头
          node.next = head;
          head = node;
        } else {
          pre.next = node;
          node.next = find;
        }
      }
      if (hasInsert) {
        // 如果已经插入了，则不需要再遍历后面的了
        break;
      }
      pre = find;
      find = find.next;
    }
    if (!hasInsert) {
      // 如果前半部分遍历完了，还没有找到合适的位置插入，则说明它应该插入到前半部分的最后
      pre.next = node;
      node.next = null;
    }
  }
  return head;
}
