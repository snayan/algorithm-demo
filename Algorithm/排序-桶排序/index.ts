/* 题目，对于一组0到5000之间的数，进行桶排序 */

import { quickSortOnArray } from '../排序-快速排序';

/* 思路：1. 将0到5000之间的数划分到100个桶里，
        2. 0号桶里存[0,50]之间的数据，1号桶里存[51,100]之间的数据，2号桶里存[151,200]之间的数据。。。
        3. 类似的，99号桶里存[4951,5000]之间的数据
        4. 然后针对每个桶里数据单独使用快速排序进行排序，
        5. 依次从0号桶，1号桶。。。99号桶取出数据，则数据就是有序的了
  时间复杂度：O(n) ,当桶的数量接近数组长度时，就接近O(n)了
  空间复杂度：O(n)
*/
export function bucketSort(arr: number[]) {
  const len = arr.length;
  debugger;

  /* 数组为空，或者只有一个数据，则直接返回 */
  if (len < 2) {
    return;
  }

  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  // 先取出数据范围
  for (let i of arr) {
    min = Math.min(min, i);
    max = Math.max(max, i);
  }
  // 如果全都一样大，则直接返回
  if (min === max) {
    return;
  }

  let count = 1 + Math.ceil(len / 100); // 桶个数,最小2个桶
  count = Math.min(100, count); // 最大100个桶
  let range = (max - min) / (count - 1);

  let buckets = new Array<number[]>(count);

  // 划分到桶里
  for (let value of arr) {
    let index = Math.floor((value - min) / range);
    let bucket = buckets[index];
    if (!Array.isArray(bucket)) {
      buckets[index] = [];
      bucket = buckets[index];
    }
    bucket.push(value);
  }

  //  过滤调空的桶
  buckets = buckets.filter(Boolean);

  // 对每个桶单独排序
  for (let bucket of buckets) {
    quickSortOnArray(bucket);
  }

  // 再把各个桶按照顺序输出
  arr.length = 0;
  for (let bucket of buckets) {
    for (let value of bucket) {
      arr.push(value);
    }
  }
}
