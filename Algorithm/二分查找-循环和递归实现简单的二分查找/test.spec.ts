import { binarySearchByWhile, binarySearchByRecursive } from '.';
import { quickSortOnArray } from '../排序-快速排序';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('二分查找', () => {
  const count = 100;
  const cases = [];
  beforeEach(() => {
    for (let i = 0; i < count; i++) {
      let v = createRandom(0, 200);
      while (cases.findIndex((c) => c === v) !== -1) {
        v = createRandom(0, 200);
      }
      cases[i] = v;
    }
  });
  ['循环实现', '递归实现'].forEach((i) => {
    let binarySearch = i === '循环实现' ? binarySearchByWhile : binarySearchByRecursive;
    it(i, () => {
      // 空数组
      let arr = [];
      expect(binarySearch(arr, 1)).toBe(-1);

      // 常规数组
      arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < arr.length; i++) {
        expect(binarySearch(arr, i + 1)).toBe(i);
      }

      // 随机数组
      quickSortOnArray(cases);
      for (let i = 0; i < cases.length; i++) {
        expect(binarySearch(cases, cases[i])).toBe(i);
      }
    });
  });
});
