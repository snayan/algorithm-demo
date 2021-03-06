/* 题目：将一个单向链表反转 */

import LinkedNode from '../../DataStructure/LinkedNode';

/**
 * 将给定的单向链表反转
 * 思路：1. 遍历一遍链表，遍历过程中同时反转next指针
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {LinkedNode} head 链表的头部指针
 * @returns {LinkedNode} 反转之后的链表的头部指针
 */
function reverseLinkedList(head: LinkedNode): LinkedNode {
  // 如果 head 为 null，则直接返回
  if (head === null) {
    return head;
  }
  let currentPre = null;
  let currentNext = null;
  while (head) {
    currentNext = head.next;
    head.next = currentPre;
    currentPre = head;
    head = currentNext;
  }
  return currentPre;
}

export { reverseLinkedList };