/* 题目：求链表的中间结点，
比如：链表结点依次为1，2，3，则返回2这个结点。链表结点依次为1，2，3，4，则返回2这个结点。
*/

import LinkedNode from '../../DataStructure/LinkedNode';
/**
 * 寻找单向链表的中间结点
 * 思路：1. 慢指针每次前进一步，快指针每次前进两步
 *      2. 当快指针到链表尾部，则慢指针就是中间结点
 * 时间复杂度：O(n)
 * 空间复杂度:O(1)
 * 
 * @param {LinkedNode} head 单项链表
 * @returns {LinkedNode} 中间结点
 */
function findIntermediateNodeInSingleLinkedList(head: LinkedNode): LinkedNode {
  // 如果链表本身为空，则直接返回空
  if (head === null) {
    return null;
  }

  let p1 = head;
  let p2 = head.next;
  while (p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
  }
  return p1;
}

/**
 * 寻找循环链表的中间结点
 * 思路：1. 慢指针每次前进一步，快指针每次前进两步
 *      2. 当快指针到链表首部，则慢指针就是中间结点
 * 时间复杂度：
 * 空间复杂度：
 * 
 * @param {LinkedNode} head 循环链表
 * @returns {LinkedNode} 中间结点
 */
function findIntermediateNodeInCycleLinkedList(head: LinkedNode): LinkedNode {
  // 如果链表本身为空，则直接返回空
  if (head === null) {
    return null;
  }

  // 如果链表本身只有一个结点，则构不成环，也直接返回
  if (head.next === null) {
    return head;
  }

  let p1 = head;
  let p2 = head.next;
  while (p2 !== head && p2.next !== head) {
    p1 = p1.next;
    p2 = p2.next.next;
  }
  return p1;
}

export { findIntermediateNodeInSingleLinkedList, findIntermediateNodeInCycleLinkedList };