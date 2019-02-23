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

export default LinkedNode;
