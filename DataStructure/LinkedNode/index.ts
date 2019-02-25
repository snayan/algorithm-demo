/*
  链表结点
  链表结点用于组成单向链表，双向链表，循环链表等。
*/
class LinkedNode {
  public val: any;
  public next: LinkedNode | null;
  public pre: LinkedNode | null;
  constructor(val: any, next: LinkedNode | null, pre: LinkedNode | null = null) {
    this.val = val;
    this.next = next;
    this.pre = pre;
  }
}

/**
 * 对于给定字符串，生成单向链表
 * @export
 * @param {string} s 字符串
 * @returns {LinkedNode} 链表头部指针
 */
export function generateLinkedList(s: string): LinkedNode {
  const head = new LinkedNode(null, null);
  let current = head;
  for (let v of s) {
    let node = new LinkedNode(v, null);
    current.next = node;
    current = node;
  }
  return head.next;
}

export default LinkedNode;
