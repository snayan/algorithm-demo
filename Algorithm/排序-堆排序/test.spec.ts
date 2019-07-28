import { heapSort } from '.';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('堆排序', () => {
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
    heapSort(arr);
    expect(arr.length).toBe(0);

    // 一个元素的数组
    arr = [1];
    heapSort(arr);
    expect(arr.length).toBe(1);

    // 多个固定元素
    arr = [2, 1, 3, 2, 35, 9, 1, 6];
    heapSort(arr);
    expect(arr.join(',')).toBe('1,1,2,2,3,6,9,35');

    // 多个元素的随机数字
    cases.forEach((arr) => {
      heapSort(arr);
      let len = arr.length;
      for (let i = 0; i < len - 1; i++) {
        expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
      }
    });
  });
});
