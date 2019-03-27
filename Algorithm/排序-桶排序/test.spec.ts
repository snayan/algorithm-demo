import { bucketSort } from '.';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('桶排序', () => {
  it('空数组', () => {
    const arr = [];
    bucketSort(arr);
    expect(arr.length).toBe(0);
  });
  it('只有一个元素', () => {
    const arr = [0];
    bucketSort(arr);
    expect(arr.length).toBe(1);
    expect(arr[0]).toBe(0);
  });
  it('只有两个元素', () => {
    const arr = [1, 5000];
    bucketSort(arr);
    expect(arr.length).toBe(2);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(5000);

    const arr1 = [5000, 1];
    bucketSort(arr1);
    expect(arr1.length).toBe(2);
    expect(arr1[0]).toBe(1);
    expect(arr1[1]).toBe(5000);
  });
  it('常规元素', () => {
    const arr = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
    const arr1 = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
    const arr2 = [];
    let i = arr.length;
    while (i > 0) {
      const j = Math.floor(createRandom(0, arr.length - 1));
      arr2.push(arr[j]);
      arr.splice(j, 1);
      i = i - 1;
    }
    bucketSort(arr2);
    for (i = 0; i < arr1.length; i++) {
      expect(arr2[i]).toBe(arr1[i]);
    }
  });
  it('随机元素', () => {
    const count = 100;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(createRandom(0, 5000));
      arr.push(r);
    }
    bucketSort(arr);
    for (let i = 0; i < arr.length - 1; i++) {
      expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
    }
  });
});
