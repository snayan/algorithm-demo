import { sqrt } from '.';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

const scale = Math.pow(10, 6);

it('编程实现求一个数的平方根', () => {
  // 负数
  let s = -1;
  let expected;
  expect(sqrt(s)).toBeNaN();

  // 0
  s = 0;
  expect(sqrt(s)).toBe(0);

  // 常规数
  // [1, 4, 9, 10]
  [1, 4, 9, 10].forEach((v) => {
    expected = Math.floor(Math.sqrt(v) * scale) / scale;
    const diff = Math.abs(Math.abs(sqrt(v) - expected) - Number.EPSILON);
    expect(diff).toBeLessThanOrEqual(1 / scale);
  });

  // 随机数
  s = Math.floor(createRandom(0, 100));
  expected = Math.floor(Math.sqrt(s) * scale) / scale;
  const diff = Math.abs(Math.abs(sqrt(s) - expected) - Number.EPSILON);
  expect(diff).toBeLessThanOrEqual(1 / scale);
});
