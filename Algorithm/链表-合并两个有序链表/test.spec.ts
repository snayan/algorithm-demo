import { unionSortedLinkedList } from '.'
import LinkedNode, { generateLinkedList } from '../../DataStructure/LinkedNode';

describe('测试合并两个有序链表', () => {
  it('两个空链表', () => {
    let p1 = null;
    let p2 = null;
    let p3 = unionSortedLinkedList(p1, p2);
    expect(p3).toBeNull();
  });
  it('一个为空链表', () => {
    let p1 = null;
    let s = '1234';
    let p2 = generateLinkedList(s);
    let p3 = unionSortedLinkedList(p1, p2);
    for (let v of s) {
      expect(p3.val).toBe(v);
      p3 = p3.next;
    }
    expect(p3).toBeNull();
  });
  it('两个都只包含一个结点的链表', () => {
    let s1 = '1';
    let s2 = '2';
    let p1 = generateLinkedList(s1);
    let p2 = generateLinkedList(s2);
    let p3 = unionSortedLinkedList(p1, p2);
    let finalS = '12';
    for (let v of finalS) {
      expect(p3.val).toBe(v);
      p3 = p3.next;
    }
    expect(p3).toBeNull();

    // 反过来
    s1 = '2';
    s2 = '1';
    p1 = generateLinkedList(s1);
    p2 = generateLinkedList(s2);
    p3 = unionSortedLinkedList(p1, p2);
    finalS = '12';
    for (let v of finalS) {
      expect(p3.val).toBe(v);
      p3 = p3.next;
    }
    expect(p3).toBeNull();
  });
  it('两个都包含了多个结点的链表', () => {
    let s1 = '12345';
    let s2 = '23456';
    let p1 = generateLinkedList(s1);
    let p2 = generateLinkedList(s2);
    let p3 = unionSortedLinkedList(p1, p2);
    let finalS = '1223344556';
    for (let v of finalS) {
      expect(p3.val).toBe(v);
      p3 = p3.next;
    }
    expect(p3).toBeNull();

    //  反过来
    s1 = '23456';
    s2 = '12345';
    p1 = generateLinkedList(s1);
    p2 = generateLinkedList(s2);
    p3 = unionSortedLinkedList(p1, p2);
    finalS = '1223344556';
    for (let v of finalS) {
      expect(p3.val).toBe(v);
      p3 = p3.next;
    }
    expect(p3).toBeNull();
  });
})