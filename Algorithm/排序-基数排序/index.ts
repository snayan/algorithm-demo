/* 题目：如何快速给100万用户的手机号码排序 */

/* 思路：1. 手机号码固定是11位，且比较大小时，如果前面位数大于后面位数，则后面位数不用再比较了
        2. 使用稳定的排序，比如计数排序或者桶排序，针对最后一位排序，然后再对倒数第二位排序
        3. 类似的，最后对第一位排序，经过这样11次排序之后，数据就是有序的了
 */
export function radixSort(arr: Array<number | string>) {
  const len = arr.length;

  // 如果数组为空，或者只有一个元素，则直接返回
  if (len < 2) {
    return;
  }

  // 先找出数组最长位数，
  let maxLen = Number.MIN_SAFE_INTEGER;
  for (let i of arr) {
    const l = `${i}`.length;
    if (l > maxLen) {
      maxLen = l;
    }
  }
  // 其他不足最长位数的，前面使用0补全，这里将原数组元素转换为字符串类型了
  for (let i = 0; i < len; i++) {
    const v = arr[i];
    const padValue = `0`.repeat(maxLen - `${v}`.length);
    arr[i] = padValue + v;
  }

  // 从低位到高位，依次排序
  for (let i = maxLen; i > 0; i--) {
    countSort(arr, i - 1, len);
  }
}

/* 计数排序 */
function countSort(arr: Array<number | string>, offset: number, len: number) {
  const countArr = new Array(10); // 正整数只能是0~9，所以申请长度为10的数组就可以了
  const result = [];

  // 初始为0
  for (let i = 0; i < countArr.length; i++) {
    countArr[i] = 0;
  }

  //  计算个数
  for (let i = 0; i < len; i++) {
    const index = arr[i][offset];
    const count = countArr[index] || 0;
    countArr[index] = count + 1;
  }
  // 顺序求和
  for (let i = 1; i < countArr.length; i++) {
    countArr[i] = countArr[i] + countArr[i - 1];
  }

  // 排序
  for (let j = len; j > 0; j--) {
    const value = arr[j - 1][offset];
    const index = countArr[value];
    result[index] = arr[j - 1];
    countArr[value] = index - 1;
  }

  // 将结果赋值回去
  for (let i = 0; i < len; i++) {
    arr[i] = result[i];
  }
}
