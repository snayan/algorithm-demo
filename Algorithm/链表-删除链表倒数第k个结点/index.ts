/* 题目：删除单向链表倒数第k个结点 */

import LinkedNode from '../../DataStructure/LinkedNode';
/**
 * 删除单向链表倒数第k个结点
 * 思路：1. 通过慢指针每次前进一步，快指针每次前进两步，找到链表中间结点
 *      2. 定义变量m = 0，每次慢指针前进一步，则m加1，直到找到链表中间结点，此时，m记录的就是从链表头到中间结点的偏移
 *      3. 如果链表是奇数个数，则链表总结点个数为 s = m * 2 + 1；如果链表是偶数个数，则链表结点个数为 s = (m + 1) * 2
 *      4. 倒数第k个结点在链表的位置就是 index = s - k，然后判断 index 与 m 的大小
 *      5. 如果 index <= m，  则从头开始遍历到位置index，
 *      6. 如果 index > m， 则从 m 开始继续遍历到位置 index,
 *      7. 最后，执行删除操作
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {LinkedNode} head 单项链表
 * @param {number} position 倒数位置
 * @returns {LinkedNode} 删除结点之后新的链表
 */
function deleteBackwardPositionNode(head: LinkedNode, position: number): LinkedNode {
  // 如果链表为空，则直接返回null
  if (head == null) {
    return null;
  }
  // 如果position小于0，则直接返回head
  if (position <= 0) {
    return head;
  }

  let m = 0; // 定义中间结点位置
  let s = 0; // 定义链表结点个数
  let p1 = head; // 慢指针，每次前进一步
  let p2 = head.next; // 快指针，每次前进两步

  while (p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
    m++;
  }

  if (p2 === null) {
    // 奇数个数
    s = m * 2 + 1;
  } else if (p2 && p2.next === null) {
    // 偶数个数
    s = (m + 1) * 2;
  }

  let index = s - position;
  let offset = 0;
  let start = null;

  if (index < 0) {
    // 如果index 为负数，则说明position超出了链表长度
    return head;
  } else if (index > m) {
    // 如果index > m，则说明需要删除的结点在后半部分，只需要从中间结点往后找
    offset = index - m;
    start = p1;
  } else {
    // 如果index <= m，则说明需要删除的结点在前半部分，需要从头开始找
    offset = index;
    start = head;
  }

  if (offset === 0) {
    // 则说明就是头结点需要被删除,
    head = head.next;
    return head;
  }

  while (offset - 1 > 0) {
    start = start.next;
    offset--;
  }
  start.next = start.next.next;

  return head;
}

export { deleteBackwardPositionNode };