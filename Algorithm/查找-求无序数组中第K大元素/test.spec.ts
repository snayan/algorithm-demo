import { findKst } from '.';
import { quickSortOnArray } from '../排序-快速排序';

const createRandom = (min, max) => {
  let r = Math.random();
  return Math.floor(r * (max - min) + min);
};

describe('查找第K大元素', () => {
  let cases: number[] = [];
  let copy: number[] = [];
  const count = 100;

  beforeEach(() => {
    cases = [];
    for (let i = 0; i < count; i++) {
      cases[i] = createRandom(0, count);
      copy[i] = cases[i];
    }
  });

  it('k不合法', () => {
    expect(findKst([], 0)).toBeNull();
    expect(findKst([], 1)).toBeNull();
    expect(findKst([1], 0)).toBeNull();
    expect(findKst([1], 2)).toBeNull();
    expect(findKst([1], -1)).toBeNull();
  });

  it('数组只有一个元素', () => {
    expect(findKst([1], 1)).toBe(1);
    expect(findKst([2], 1)).toBe(2);
    expect(findKst([3], 1)).toBe(3);
    expect(findKst([-1], 1)).toBe(-1);
  });

  it('常规数组', () => {
    let arr = [10, 1, 9, 7, 2, 3, 8, 6, 5, 4];
    expect(findKst(arr, 1)).toBe(10);
    expect(findKst(arr, 2)).toBe(9);
    expect(findKst(arr, 3)).toBe(8);
    expect(findKst(arr, 4)).toBe(7);
    expect(findKst(arr, 5)).toBe(6);
    expect(findKst(arr, 6)).toBe(5);
    expect(findKst(arr, 7)).toBe(4);
    expect(findKst(arr, 8)).toBe(3);
    expect(findKst(arr, 9)).toBe(2);
    expect(findKst(arr, 10)).toBe(1);
  });

  it('随机数组', () => {
    quickSortOnArray(cases);
    for (let i = 1; i <= count; i++) {
      expect(findKst(copy, i)).toBe(cases[count - i]);
    }
  });
});
