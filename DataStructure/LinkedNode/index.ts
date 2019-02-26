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
 * @param {string|any[]} s 字符串 或者数组
 * @returns {LinkedNode} 链表头部指针
 */
export function generateLinkedList(s: string | any[]): LinkedNode {
  const head = new LinkedNode(null, null);
  let current = head;
  for (let v of s) {
    let node = new LinkedNode(v, null);
    current.next = node;
    current = node;
  }
  return head.next;
}

/**
 * 对于给定字符串，生成循环链表
 * @export
 * @param {string|any[]} s 字符串 或者数组
 * @returns {LinkedNode} 链表头部指针
 */
export function generateCycleLinkedList(s: string | any[]): LinkedNode {
  let head = generateLinkedList(s);
  let p = head;
  while (p && p.next) {
    p = p.next;
  }
  if (p === head) {
    // 只有一个结点
    return head;
  }
  p.next = head;
  return head;
}

export default LinkedNode;
