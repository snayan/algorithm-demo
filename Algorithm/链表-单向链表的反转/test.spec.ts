import LinkedNode, { generateLinkedList } from '../../DataStructure/LinkedNode';
import { reverseLinkedList } from '.';

describe('测试单向链表的反转', () => {
  it('链表为null', () => {
    let head = null;
    expect(reverseLinkedList(head)).toBeNull();
  });
  it('链表只有一个结点', () => {
    const val = 'a';
    let head = new LinkedNode(val, null);
    let reversedHead = reverseLinkedList(head);
    expect(reversedHead).toBe(head);
    expect(reversedHead.val).toBe(val);
    expect(reversedHead.next).toBeNull();
  });
  it('链表有两个结点', () => {
    let s = '12';
    let head = generateLinkedList(s);
    let reversedHead = reverseLinkedList(head);
    let reversedS = Array.from(s).reverse();
    for (let v of reversedS) {
      expect(reversedHead.val).toBe(v);
      reversedHead = reversedHead.next;
    };
    expect(reversedHead).toBeNull();
  });
  it('链表有多个结点', () => {
    let s = '12345678';
    let head = generateLinkedList(s);
    let reversedHead = reverseLinkedList(head);
    let reversedS = Array.from(s).reverse();
    for (let v of reversedS) {
      expect(reversedHead.val).toBe(v);
      reversedHead = reversedHead.next;
    };
    expect(reversedHead).toBeNull();
  });
})