import { findIntermediateNodeInSingleLinkedList, findIntermediateNodeInCycleLinkedList } from '.'
import LinkedNode, { generateLinkedList, generateCycleLinkedList } from '../../DataStructure/LinkedNode';

function createNodes(base, count) {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(base++)
  }
  return result
}

describe('测试寻找单向链表中间结点', () => {
  it('链表为空', () => {
    let head = null;
    let node = findIntermediateNodeInSingleLinkedList(head);
    expect(node).toBeNull();
  });
  it('链表结点个数为奇数', () => {
    let cases = 1000;
    for (let i = 1; i < cases; i = i + 2) {
      let tests = createNodes(i, i);
      let expected = tests[Math.floor(i / 2)];
      let head = generateLinkedList(tests);
      let node = findIntermediateNodeInSingleLinkedList(head);
      expect(node.val).toBe(expected);
    }
  });
  it('链表结点个数为偶数', () => {
    let cases = 1000;
    for (let i = 2; i < cases; i = i + 2) {
      let tests = createNodes(i, i);
      let expected = tests[Math.floor(i / 2) - 1];
      let head = generateLinkedList(tests);
      let node = findIntermediateNodeInSingleLinkedList(head);
      expect(node.val).toBe(expected);
    }
  });
});

describe('测试寻找循环链表的中间结点', () => {
  it('链表为空', () => {
    let head = null;
    let node = findIntermediateNodeInCycleLinkedList(head);
    expect(node).toBeNull();
  });
  it('链表结点个数为奇数', () => {
    let cases = 1000;
    for (let i = 1; i < cases; i = i + 2) {
      let tests = createNodes(i, i);
      let expected = tests[Math.floor(i / 2)];
      let head = generateCycleLinkedList(tests);
      let node = findIntermediateNodeInCycleLinkedList(head);
      expect(node.val).toBe(expected);
    }
  });
  it('链表结点个数为偶数', () => {
    let cases = 1000;
    for (let i = 2; i < cases; i = i + 2) {
      let tests = createNodes(i, i);
      let expected = tests[Math.floor(i / 2) - 1];
      let head = generateCycleLinkedList(tests);
      let node = findIntermediateNodeInCycleLinkedList(head);
      expect(node.val).toBe(expected);
    }
  });
})