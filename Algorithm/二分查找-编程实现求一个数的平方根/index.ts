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

  // 二分查找
  const binarySearch = (low: number, high: number, step: number): number => {
    let mid = low + Math.floor((high - low) / 2);
    if (Math.pow(mid, 2) < s) {
      return binarySearch(mid + step, high, step);
    } else if (Math.pow(mid + step, 2) > s) {
      return binarySearch(low, mid - step, step);
    } else {
      return mid;
    }
  };

  let result = 0;

  //  i=0,求整数位，i=1，求第一位小数，i=2.求第二位小数。。。i=6，求第六位小数
  for (let i = 0; i <= precision; i++) {
    const scale = Math.pow(10, -1 * i);
    const low = result * scale;
    const high = low + scale;
    result = binarySearch(low, high, scale);
  }

  return result;
}
