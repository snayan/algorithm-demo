import { quickSortOnArray, quickSortOnLinkedNode } from '.';
import LinkedNode, { generateLinkedList } from '../../DataStructure/LinkedNode';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('快速排序', () => {
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
    quickSortOnArray(arr);
    expect(arr.length).toBe(0);

    // 一个元素的数组
    arr = [1];
    quickSortOnArray(arr);
    expect(arr.length).toBe(1);

    // 多个固定元素
    arr = [2, 1, 3, 2, 35, 9, 1, 6];
    quickSortOnArray(arr);
    expect(arr.join(',')).toBe('1,1,2,2,3,6,9,35');

    // 多个元素的随机数字
    cases.forEach((arr) => {
      quickSortOnArray(arr);
      let len = arr.length;
      for (let i = 0; i < len - 1; i++) {
        expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
      }
    });
  });

  it('链表存储', () => {
    // 空链表
    let head: LinkedNode = generateLinkedList([]);
    quickSortOnLinkedNode(head);
    expect(head).toBeNull();

    // 一个元素的链表
    head = generateLinkedList([1]);
    quickSortOnLinkedNode(head);
    expect(head.val).toBe(1);
    expect(head.next).toBeNull();

    // 多个固定元素
    head = generateLinkedList([2, 1, 3, 2, 35, 9, 1, 6]);
    quickSortOnLinkedNode(head);
    let arr = [];
    while (head) {
      arr.push(head.val);
      head = head.next;
    }
    expect(arr.join(',')).toBe('1,1,2,2,3,6,9,35');

    // 多个元素的随机数字
    cases.forEach((arr) => {
      head = generateLinkedList(arr);
      quickSortOnLinkedNode(head);
      while (head && head.next) {
        expect(head.val).toBeLessThanOrEqual(head.next.val);
        head = head.next;
      }
    });
  });
});
