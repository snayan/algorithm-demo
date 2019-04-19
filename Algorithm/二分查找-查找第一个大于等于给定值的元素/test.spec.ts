import { findFirstGreaterThan } from '.';

it('二分查找-查找第一个大于等于给定值的元素', () => {
  // 空数组
  let arr = [];
  expect(findFirstGreaterThan(arr, 1)).toBe(-1);

  // 只有一个元素
  arr = [1];
  expect(findFirstGreaterThan(arr, 1)).toBe(0);
  expect(findFirstGreaterThan(arr, 2)).toBe(-1);

  // 两个元素
  arr = [1, 2];
  expect(findFirstGreaterThan(arr, 0)).toBe(0);
  expect(findFirstGreaterThan(arr, 1)).toBe(0);
  expect(findFirstGreaterThan(arr, 2)).toBe(1);
  arr = [1, 1];
  expect(findFirstGreaterThan(arr, 0)).toBe(0);
  expect(findFirstGreaterThan(arr, 1)).toBe(0);

  // 多个元素
  arr = [1, 2, 2];
  expect(findFirstGreaterThan(arr, 2)).toBe(1);
  arr = [1, 2, 2, 3];
  expect(findFirstGreaterThan(arr, 2)).toBe(1);
  expect(findFirstGreaterThan(arr, 3)).toBe(3);
});
