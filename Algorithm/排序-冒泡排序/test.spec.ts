import { bubbleSortOnArray, bubbleSortOnLinkedNode } from '.';
import LinkedNode, { generateLinkedList } from '../../DataStructure/LinkedNode';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('冒泡排序', () => {
  let cases: number[][] = [];
  const count = 100;

  beforeEach(() => {
    cases = [];
    for (let i = 2; i < count; i++) {
      cases[i - 2] = [];
      for (let j = 0; j < i; j++) {
        cases[i - 2][j] = createRandom(-1 * count, count);
      }
    }
  });

  it('数组存储', () => {
    // 空数组
    let arr: number[] = [];
    bubbleSortOnArray(arr);
    expect(arr.length).toBe(0);

    // 一个元素的数组
    arr = [1];
    bubbleSortOnArray(arr);
    expect(arr.length).toBe(1);

    // 多个元素的随机数字
    cases.forEach((arr) => {
      bubbleSortOnArray(arr);
      let len = arr.length;
      for (let i = 0; i < len - 1; i++) {
        expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
      }
    });
  });

  it('链表存储', () => {
    // 空链表
    let head: LinkedNode = generateLinkedList([]);
    bubbleSortOnLinkedNode(head);
    expect(head).toBeNull();

    // 一个元素的链表
    head = generateLinkedList([1]);
    bubbleSortOnLinkedNode(head);
    expect(head.val).toBe(1);
    expect(head.next).toBeNull();

    // 多个元素的随机数字
    cases.forEach((arr) => {
      head = generateLinkedList(arr);
      bubbleSortOnLinkedNode(head);
      while (head && head.next) {
        expect(head.val).toBeLessThanOrEqual(head.next.val);
        head = head.next;
      }
    });
  });
});
