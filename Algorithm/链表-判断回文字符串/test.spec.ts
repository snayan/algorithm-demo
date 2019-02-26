import { generateLinkedList } from '../../DataStructure/LinkedNode';
import { isPalindrome } from './index';

describe('测试回文字符串的判断', () => {
  it('空字符串，是非回文字符串', () => {
    let s = '';
    let head = generateLinkedList(s);
    expect(isPalindrome(head)).toBe(false);
  })
  it('单个字符串，是回文字符串', () => {
    let s = '1';
    let head = generateLinkedList(s);
    expect(isPalindrome(head)).toBe(true);
  });
  it('两个字符串，判断是否回文字符串', () => {
    [['12', false], ['11', true]].forEach((item) => {
      let head = generateLinkedList(item[0] as string);
      expect(isPalindrome(head)).toBe(item[1]);
    });
  });
  it('三个字符串，判断是否回文字符串', () => {
    [['112', false], ['211', false], ['123', false], ['121', true], ['111', true]].forEach(item => {
      let head = generateLinkedList(item[0] as string);
      expect(isPalindrome(head)).toBe(item[1]);
    });
  });
  it('四个字符串，判断是否回文字符串', () => {
    [['1234', false], ['1231', false], ['1221', true], ['1121', false], ['1111', true]].forEach(item => {
      let head = generateLinkedList(item[0] as string);
      expect(isPalindrome(head)).toBe(item[1]);
    });
  });
  it('多个字符串，判断是否回文字符串', () => {
    [['上海自来水来自海上', true], ['上海自来水X自海上', false], ['上海自来水来X海上', false], ['上海自来水来自X上', false], ['上海自来水来自海X', false]].forEach(item => {
      let head = generateLinkedList(item[0] as string);
      expect(isPalindrome(head)).toBe(item[1]);
    })
  });
  it('测试isPalindrome是纯函数', () => {
    let s = '';
    let head = generateLinkedList(s);
    isPalindrome(head);
    expect(head).toBeNull();

    s = '上海自来水来自海上';
    head = generateLinkedList(s);
    isPalindrome(head);
    for (let v of s) {
      expect(head.val).toBe(v);
      head = head.next;
    }
    expect(head).toBeNull();
  })
})