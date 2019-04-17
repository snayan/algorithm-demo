import { findFirstIndex } from '.';

it('二分查找-查找第一个值等于给定值的元素的位置', () => {
  // 空数组
  let arr = [];
  expect(findFirstIndex(arr, 0)).toBe(-1);

  // 只有一个元素
  arr = [1];
  expect(findFirstIndex(arr, 1)).toBe(0);
  expect(findFirstIndex(arr, -1)).toBe(-1);

  // 两个元素
  arr = [1, 1];
  expect(findFirstIndex(arr, 1)).toBe(0);

  // 常规数组
  arr = [1, 2, 2, 3];
  expect(findFirstIndex(arr, 2)).toBe(1);
  arr = [1, 2, 2, 3, 4];
  expect(findFirstIndex(arr, 2)).toBe(1);
});
