import { countSort } from '.';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('计数排序', () => {
  let cases: number[] = [];
  const count = 100;

  beforeEach(() => {
    cases = [];
    for (let i = 0; i < count; i++) {
      cases[i] = Math.floor(createRandom(0, count));
    }
  });

  it('数组存储', () => {
    // 空数组
    let arr: number[] = [];
    countSort(arr);
    expect(arr.length).toBe(0);

    // 一个元素的数组
    arr = [1];
    countSort(arr);
    expect(arr.length).toBe(1);

    // 多个固定元素
    arr = [2, 1, 3, 2, 35, 9, 1, 6];
    countSort(arr);
    expect(arr.join(',')).toBe('1,1,2,2,3,6,9,35');

    // 多个元素的随机数字
    countSort(cases);
    let len = cases.length;
    for (let i = 0; i < len - 1; i++) {
      expect(cases[i]).toBeLessThanOrEqual(cases[i + 1]);
    }
  });
});
