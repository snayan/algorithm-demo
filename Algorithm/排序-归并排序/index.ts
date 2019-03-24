/* 题目：给定一组数字，使用归并排序，把这组数字从小到大排列
1. 这组数字使用数组存储的，
2. 这组数字使用链表存储的。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

/* 使用归并排序，把数组存储的数字按照从小到大排序
思路：1. 将数组一份为二，然后分别对两个小数组排序，
     2. 再把两个有序小数组合并成一个大的有序数组，
     3. 类似的，再对小数组排序时，可以用步骤1到步骤2
     4. 直到每个待排序数组只有一个元素
     5. 递归公式：sort(0,n) = merge( sort(0, n/2), sort(n/2+1, n) );
时间复杂度：O(n * logn)
空间复杂度：O(n)
是否稳定排序：是
*/
export function mergeSortOnArray(arr: number[]) {
  const len = arr.length;

  /* 如果数组为空，或则只有一个元素，则直接返回 */
  if (len < 2) {
    return;
  }

  /* 归并函数，合并两个有序数组 */
  const merge = (arr: number[], start: number, middle: number, end: number) => {
    let tmp = [];
    let i = start;
    let j = middle + 1;
    while (i <= middle && j <= end) {
      if (arr[j] < arr[i]) {
        tmp.push(arr[j]);
        j++;
      } else {
        tmp.push(arr[i]);
        i++;
      }
    }
    // 如果第二个数组全部合入了，第一个还有未合入部分，
    while (i <= middle) {
      tmp.push(arr[i]);
      i++;
    }
    // 如果第一个数组全部合入了，第二个还有未合入部分，
    while (j <= end) {
      tmp.push(arr[j]);
      j++;
    }

    // 将有序临时数组拷贝到原数组里
    i = 0;
    while (start <= end) {
      arr[start + i] = tmp[i];
      i++;
    }
  };

  /* 递归排序函数 */
  const sort = (arr: number[], start: number, end: number) => {
    // 如果当前只有一个元素了，则直接返回
    if (start >= end) {
      return;
    }
    // 将数组一分为二
    const middle = Math.floor((start + end) / 2);
    // 排序第一个部分
    sort(arr, start, middle);
    // 排序第二个部分
    sort(arr, middle + 1, end);
    // 合并两个有序数组
    merge(arr, start, middle, end);
  };

  sort(arr, 0, len - 1);
}

/* 使用归并排序，把链表存储的数字按照从小到大排序
思路：1. 先找到链表的中间节点，将链表一分为二
     2. 分别对两个小链表排序，最后将两个有序链表合并为一个大的有序链表
     3. 类似的，再对小链表排序时，可以用步骤1到步骤2
     4. 直到每个待排序链表只有一个元素
     5. 递归公式：sort(0,n) = combine( sort(0, n/2), sort(n/2+1, n) );
时间复杂度：O(n * n * logn)
空间复杂度：O(n)
是否稳定排序：是
*/
export function mergeSortOnLinkedNode(head: LinkedNode) {
  // 如果链表为空，或则只有一个节点，则直接返回
  if (head === null || head.next === null) {
    return;
  }

  /* 合并有序链表 */
  const merge = (head: LinkedNode, mid: LinkedNode, tail: LinkedNode) => {
    // 创建一个临时链表
    let tmp = new LinkedNode(null, null);
    let tmpTail = tmp;
    let i = head;
    let j = mid.next;
    while (i !== mid && j !== tail) {
      let cloneNode: LinkedNode;
      if (j.val < i.val) {
        cloneNode = new LinkedNode(j.val, null);
        j = j.next;
      } else {
        cloneNode = new LinkedNode(i.val, null);
        i = i.next;
      }
      tmpTail.next = cloneNode;
      tmpTail = tmpTail.next;
    }
    // 如果第一个链表还有未合入部分
    while (i !== mid) {
      tmpTail.next = new LinkedNode(i.val, null);
      i = i.next;
      tmpTail = tmpTail.next;
    }
    // 如果第二个链表还有未合入部分
    while (j !== tail) {
      tmpTail.next = new LinkedNode(j.val, null);
      j = j.next;
      tmpTail = tmpTail.next;
    }
    // 将临时链表拷贝到原链表
    while (tmp.next) {
      head.val = tmp.next.val;
      head = head.next;
      tmp = tmp.next;
    }
  };

  /* 寻找中间节点 */
  const middle = (head: LinkedNode, tail: LinkedNode) => {
    let slow = head;
    let fast = head;
    if (head === tail) {
      return head;
    }
    while (fast !== tail && fast.next !== tail) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  };

  /* 对链表排序 */
  const sort = (head: LinkedNode, tail: LinkedNode) => {
    if (head === null || tail === null || head === tail) {
      return;
    }

    /* 找中间节点 */
    const mid = middle(head, tail);
    /* 排序前半部分链表 */
    sort(head, mid);
    /* 排序后半部分链表 */
    sort(mid.next, tail);
    /* 合并两个有序链表 */
    merge(head, mid, tail);
  };

  let tail = head;
  while (tail.next) {
    tail = tail.next;
  }

  sort(head, tail);
}
