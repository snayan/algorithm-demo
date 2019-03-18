/* 题目：给定一组数字，使用选择排序，把这组数字从小到大排列
1. 这组数字使用数组存储的，
2. 这组数字使用链表存储的。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

/* 使用选择排序，把数组存储的数字按照从小到大排序
思路：1. 将数组分成两部分，前部分是排好序的，后半部分是待排序的
     2. 每次从后半部分取一个最小的数据，把它放到前半部分的最后面
     3. 重复步骤2，直到后半部分的数据为空，那么整个数组就是排好序的了
时间复杂度：O(n * n)
空间复杂度：O(1)
是否稳定排序：否
*/
export function selectionSortOnArray(arr: number[]) {
  const len = arr.length;

  // 如果，数组为空，或则只有一个数据，则直接返回
  if (len < 2) {
    return;
  }

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i; j < len - 1; j++) {
      // 找出后半部分最小的值
      if (arr[j] > arr[j + 1]) {
        minIndex = j + 1;
      }
    }
    if (minIndex != i) {
      // 交换
      const tmp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = tmp;
    }
  }
}

/* 使用选择排序，把链表存储的数字按照从小到大排序
思路：1. 每次从链表中寻找出最小的节点
     2. 将这个最小节点从原链表中删除，将它加入到新链表的尾部
     3. 重复上面步骤，直到原链表为空，那么整个新链表就是有序的了
时间复杂度：O(n * n)
空间复杂度：O(1)
是否稳定排序：是
*/
export function selectionSortOnLinkedNode(head: LinkedNode) {
  // 如果链表为空，或则链表只有一个结点，则直接返回
  if (head === null || head.next === null) {
    return;
  }

  const sortedHead = new LinkedNode(null, null); // 有序部分的链表
  let sortedTail = sortedHead; // 有序部分的链表尾部

  const guard = new LinkedNode(null, head); // 新增一个哨兵节点
  let cursor: LinkedNode = guard;
  let minPreNode: LinkedNode = guard; // 最小节点的前一个节点
  let minNode: LinkedNode;
  while (cursor.next) {
    // 遍历未排序部分，找到最小节点
    if (cursor.next.val < minPreNode.next.val) {
      minPreNode = cursor;
    }
    cursor = cursor.next;
    if (cursor.next === null) {
      // 到达原链表尾部了
      // 先暂存最小节点
      minNode = minPreNode.next;
      // 删除原链表中最小节点
      minPreNode.next = minPreNode.next.next;
      // 将最小节点加入新链表尾部
      sortedTail.next = minNode;
      sortedTail = minNode;

      if (cursor !== guard) {
        // 再从头来，从原链表中寻找最小节点，重复上面步骤
        cursor = guard;
      }
    }
  }

  // 赋值新的链表
  head = sortedHead.next;
}
