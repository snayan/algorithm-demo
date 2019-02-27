/* 题目：检测链表中是否存在环 */

import LinkedNode from '../../DataStructure/LinkedNode';


/**
 * 检测链表中是否有环
 * 思路：1. 慢指针每次走一步，快指针每次走两步
 *      2. 如果慢指针与快指针重合了，则说明有环
 *      3. 如果快指针=null了，则说明到链表尾部了，没有环
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {LinkedNode} head 链表
 * @returns {boolean} 返回是否有环
 */
function detectCycleNode(head: LinkedNode): boolean {
  // 如果链表为空，则没有环
  if (head === null) {
    return false;
  }
  let p1 = head;
  let p2 = head.next;
  while (p2 && p2.next && p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next.next;
  }
  return p1 === p2;
}

export { detectCycleNode };