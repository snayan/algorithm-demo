/* 题目: 假设两个链表都是从小到大的有序链表，合并之后的链表也必须是从小到大有序的 */

import LinkedNode from '../../DataStructure/LinkedNode';

/**
 * 合并两个有序链表
 * 思路：1. 开辟一个新的链表p3
 *      2. 比较p1结点与p2结点的值，
 *      3. 如果p1.val <= p2.val，则把p1的值生成一个新的结点插入到p3尾部，且p1 = p1.next
 *      4. 否则把p2的值生成一个新的结点插入到p3尾部， 且p2 = p2.next
 *      5. 如果p1遍历完成，且p2还有结点未遍历，则直接把p2中未遍历的结点插入的p3的尾部
 *      6. 如果p2遍历完成，且p1还有结点未遍历，则直接把p1中未遍历的结点插入到p3的尾部
 * 时间复杂度：假设p1有n个结点，p2有m个结点，则为 O(min(m,n))，可以直接用O(n)表示
 * 空间复杂度：O(m + n)
 * 
 * @param {LinkedNode} p1 待合并的有序链表
 * @param {LinkedNode} p2 待合并的有序链表
 * @returns {LinkedNode} 合并之后的有序链表
 */
function unionSortedLinkedList(p1: LinkedNode, p2: LinkedNode): LinkedNode {
  const p3 = new LinkedNode(null, null);
  let tail = p3;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      // 如果p1.val <= p2.val，则将p1的值插入到p3的尾部
      tail.next = new LinkedNode(p1.val, null);
      // p1前进一步
      p1 = p1.next;
    } else {
      // 否则，将p2的值插入到p3的尾部
      tail.next = new LinkedNode(p2.val, null);
      // p2前进一步
      p2 = p2.next;
    }
    // tail始终指向尾部
    tail = tail.next;
  }

  let rest = null;
  if (p1 === null && p2 !== null) {
    // 如果p1遍历完成了，但是p2还有未遍历的部分，则直接将p2未遍历的部分插入到p3的尾部
    rest = p2;
  } else if (p2 === null && p1 !== null) {
    // 反过来，如果p2遍历完了，但是p1还有未遍历的部分，则直接将p1未遍历的部分插入到p3尾部
    rest = p1;
  }
  while (rest) {
    tail.next = new LinkedNode(rest.val, null);
    tail = tail.next;
    rest = rest.next;
  }

  return p3.next;
}

export { unionSortedLinkedList };