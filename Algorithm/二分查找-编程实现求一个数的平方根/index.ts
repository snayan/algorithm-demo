/* 题目：编程实现，求一个数的平方根，要求精确到小数点后6位 */

/**
 * 思路：1. 先使用二分查找出整数位，然后再依次同理查找出小数位第一位，小数位第二位，。。。小数位第六位
 *      2. 查找整数的判断条件是x * x < s, 且 (x+1) * (x+1) > s，那么x就是整数位
 *      3. 查找小数位第一位，判断条件是x.a1 * x.a1 < s ,且(x.a1 + 0.1) * (x.a1 + 0.1) > s，那么a1就是小数位第一位
 *      4. 同理，依次查找出6位小数
 *
 * @export
 * @param {number} s 要求平方根的数据
 * @param {number} [precision=6] 小数位数精度
 * @returns {number} 返回结果
 */
export function sqrt(s: number, precision: number = 6): number {
  // 如果s负数，则直接返回NaN
  if (s < 0) {
    return Number.NaN;
  }
  // 如果s是0，则直接返回0
  if (s === 0) {
    return 0;
  }

  // 比较大小
  const moreThan = (a: number, b: number) => {
    return a - b > Number.EPSILON;
  };

  // 二分查找
  const binarySearch = (low: number, high: number, pow: number): number => {
    const expand = Math.pow(10, pow);
    const scale = 1 / expand;
    // 由于js精度问题，low === high 时实际上这个时候不需要再判断了，
    if (Math.abs(low - high) < Number.EPSILON) {
      return low;
    }
    let mid = Math.floor(low * expand + (high * expand - low * expand) / 2) * scale;
    let value = Math.pow(mid, 2);
    let next = Math.pow(mid + scale, 2);
    // 由于js精度问题，low === high 时实际上这个时候不需要再判断了，
    if (Math.abs(value - s) < Number.EPSILON) {
      return mid;
    }
    if (moreThan(value, s)) {
      return binarySearch(low, mid - scale, pow);
    } else if (moreThan(s, next)) {
      return binarySearch(mid + scale, high, pow);
    } else {
      return mid;
    }
  };

  // 先求整数位
  let result = binarySearch(0, s, 0);

  // i=0,求第一位小数，i=1.求第二位小数。。。i=5，求第六位小数
  for (let i = 0; i < precision; i++) {
    let low = result;
    let high = result + Math.pow(10, -1 * i);
    const expand = Math.pow(10, i + 1);
    result = binarySearch(low, high, i + 1);
    result = Math.floor(result * expand) / expand;
  }

  return result;
}
