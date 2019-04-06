/* 题目: 给年级500个学生的期末考试分数排序，满分是100分 */

/* 思路：0. 假设数组A里存储的是500个考生分数，我们扫描一遍数组A，求出分数范围为0～100，
        1. 可以申请一个长度为101的数组C，数组C下标表示分数，值表示数小于等于当前分数的考试个数
        2. 再扫描一遍数组A，可以得到数组C的所有元素的值，
        3. 然后，从后往前扫描数组A【为了排序稳定性，所以从后往前】，得到当前分数i，那么C[i]表示小于等于分数i的学生个数，
        4. 将i存储到新数组B[C[i]-1]的位置【也就是表示i应该存储再原数组i-1的位置】，然后C[i] = C[i] - 1,【因为排序了一个，那么小于等于分数i的个数减少1】
        5. 重复步骤3到步骤4，直到数组A扫描完成，那么数组B就是排序之后的分数数据了
 */
export function countSort(arr: number[]) {
  const len = arr.length;

  /* 数组为空，或者只有一个元素，则直接返回 */
  if (len < 2) {
    return;
  }

  // 排序之后的数组
  const result = new Array(len);

  // 求出当前最大分数
  const max = Math.max.apply(Math, arr);

  // 申请一个记录个数的数组，下标标志分数，值标识个数
  const countArr = [];
  for (let i = 0; i < max + 1; i++) {
    countArr[i] = 0;
  }

  // 遍历一遍arr，求出countArr, 那么 countArr下标 j 的值 ,就表示分数等于j的个数了
  for (let i of arr) {
    let count = countArr[i] || 0;
    countArr[i] = count + 1;
  }


  // 对countArr 顺序求和，那么 i ,就表示分数小于等于i的个数了
  for (let i = 1, j = countArr.length; i < j; i++) {
    countArr[i] = countArr[i] + countArr[i - 1];
  }

  // 遍历arr，结合countArr，进行排序
  for (let l = len; l > 0; l--) {
    const value = arr[l - 1]; // 当前分数
    const index = countArr[value]; // 小于等于value的个数
    result[index - 1] = value; // 将 value放置到 index-1的位置
    countArr[value] = index - 1; // 排序了一个，则个数减1
  }

  // 将排好序的数组赋值到原数组
  for (let i = 0; i < len; i++) {
    arr[i] = result[i];
  }
}
