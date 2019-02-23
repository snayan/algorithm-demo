/* 题目：
一个字符串使用单向链表存储，如何更快的判断它是否是一个回文字符串。
例如：let s = "上海自来水来自海上"，s就是一个回文字符串。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

function generateLinkedList(s: string): LinkedNode {
  const head = new LinkedNode(null, null);
  let current = head;
  for (let v of s) {
    let node = new LinkedNode(v, null);
    current.next = node;
    current = node;
  }
  return head.next;
}

/**
 * 判断是否回文字符串
 * 思路： 1. 慢指针每次前进一步，快指针每次前进两步
 *       2. 前进过程中，将链表前部分反转
 *       3. 当快指针为null，或者快指针结点的 next 指针为 null，则找到中间位置了
 *       4. 从中间位置开始，再遍历前后两部分的链表，比较每个结点值是否相等，如果相等，则是回文字符串。
 *       5. 比较过程中，恢复前半部分，使其整个链表完整如初
 * @param {string} s
 * @returns {boolean}
 */
function isPalindrome(s: string): boolean {
  // 如果s是空，则直接返回false
  let len = s.length;
  if (len === 0) {
    return false;
  }
  // 如果s只有一个字符，则直接返回true
  if (len === 1) {
    return true;
  }
  let result: boolean = true;
  // 生成链表
  let head: LinkedNode = generateLinkedList(s);
  let p1: LinkedNode = head;// 慢指针
  let p2: LinkedNode = p1.next; // 快指针
  let p1Pre: LinkedNode = null; // 慢指针前一个结点
  let p1Next: LinkedNode = p1.next; // 慢指针后一个结点
  let left: LinkedNode = null; // 回文字符串左边开始指针
  let right: LinkedNode = null; // 回文字符串右边开始指针
  // 第一步，选择中间结点，并反转前半部分结点
  while (!p2 && !p2.next) {
    p1.next = p1Pre; // 将p1.next 指向p1的前一个结点
    p1 = p1Next;
    p1Next = p1Next.next; // p1 每次走一步
    p2 = p2.next.next; // p2 每次走2步
  }
  if (p2 === null) {
    // 单数个数，此时, p1就是指向链表中间结点
    left = p1.next; // 此时，前半部分链表已经被反转了
    right = p1Next;
    p1.next = right; // 已经寻找到了中点，需先将中间结点指向右半边了，方便后面还原前部分
  } else if (p2.next === null) {
    // 偶数个数，此时，p1 指向 n/2 - 1
    left = p1;
    right = p1Next;
    p1 = right; // 已经寻找到了中点，需先将中间结点指向右半边了，方便后面还原前部分
  }
  // 第二部， 开始判断，并还原前半部分，此时，只有left 和 p1 是断开的，
  p1Pre = left.next;
  p1Next = p1;
  while (left && right) {
    result = result && left.val === right.val; // 先比较
    left.next = p1Next;
    p1Next = left;
    left = p1Pre;
    right = right.next;
    p1Pre = p1Pre.next;
  }

  return result
}
