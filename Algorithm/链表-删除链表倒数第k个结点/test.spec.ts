import { deleteBackwardPositionNode } from '.'
import LinkedNode, { generateLinkedList } from '../../DataStructure/LinkedNode';

describe('测试删除单向链表中倒数第k个结点', () => {
  it('链表为空', () => {
    let head = null;
    let linkedList = deleteBackwardPositionNode(head, 1);
    expect(linkedList).toBeNull();
  });
  it('链表只有一个结点', () => {
    let s = '1';
    let head = generateLinkedList(s);
    let linkedList = deleteBackwardPositionNode(head, 0);
    expect(linkedList).toBe(head);
    expect(linkedList.val).toBe(s);

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 1);
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 2);
    expect(linkedList).toBe(head);
    expect(linkedList.val).toBe(s);
  });
  it('链表只有两个结点', () => {
    let s = '12';
    let head = generateLinkedList(s);
    let linkedList = deleteBackwardPositionNode(head, 1);
    expect(linkedList.val).toBe('1');
    expect(linkedList.next).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 2);
    expect(linkedList.val).toBe('2');
    expect(linkedList.next).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 3);
    for (let v of s) {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();
  });
  it('链表有多个结点，结点个数是偶数', () => {
    let s = '123456';
    let head = generateLinkedList(s);
    let linkedList = deleteBackwardPositionNode(head, 1);
    for (let v of '12345') {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 3);
    for (let v of '12356') {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 6);
    for (let v of '23456') {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 7);
    for (let v of s) {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();
  });
  it('链表有多个结点，结点个数是奇数', () => {
    let s = '1234567';
    let head = generateLinkedList(s);
    let linkedList = deleteBackwardPositionNode(head, 1);
    for (let v of '123456') {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 4);
    for (let v of '123567') {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 7);
    for (let v of '234567') {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();

    head = generateLinkedList(s);
    linkedList = deleteBackwardPositionNode(head, 8);
    for (let v of s) {
      expect(linkedList.val).toBe(v);
      linkedList = linkedList.next;
    }
    expect(linkedList).toBeNull();
  });
})