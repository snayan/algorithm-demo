import { generateLinkedList } from '../../DataStructure/LinkedNode';
import { detectCycleNode } from '.'

describe('检测链表中是否有环', () => {
  it('空链表', () => {
    let head = null;
    let hasCycle = detectCycleNode(head);
    expect(hasCycle).toBe(false);
  });
  it('检测一个结点的链表', () => {
    let s = '1';
    let head = generateLinkedList(s);
    let hasCycle = detectCycleNode(head);
    expect(hasCycle).toBe(false);
    expect(head.val).toBe(s);
    expect(head.next).toBeNull();

    head.next = head;
    hasCycle = detectCycleNode(head);
    expect(hasCycle).toBe(true);
    expect(head.next).toBe(head);
  });
  it('检测多个结点的链表', () => {
    let count = 100;
    let nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push(i % 2);
    }
    let head = generateLinkedList(nodes);
    let tail = head;
    let p1 = head;
    while (tail && tail.next) {
      tail = tail.next;
    }
    while (p1 !== head) {
      tail.next = p1;
      p1 = p1.next;
      let hasCycle = detectCycleNode(head);
      expect(hasCycle).toBe(true);
    }
    tail.next = null;
    let hasCycle = detectCycleNode(head);
    expect(hasCycle).toBe(false);
  })
})