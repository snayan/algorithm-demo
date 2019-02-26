import { generateLinkedList, generateCycleLinkedList } from '.'

describe('测试生成单向链表', () => {
  it('对于给定空字符串', () => {
    let s = '';
    let head = generateLinkedList(s);
    expect(head).toBeNull();
  });
  it('对于给定一个字符的字符串', () => {
    let s = '1';
    let head = generateLinkedList(s);
    expect(head.val).toBe(s);
    expect(head.next).toBeNull();
  });
  it('对于给定多个字符的字符串', () => {
    let s = '123';
    let head = generateLinkedList(s);
    for (let v of s) {
      expect(head.val).toBe(v);
      head = head.next;
    }
    expect(head).toBeNull();
  });
  it('对于给定空数组', () => {
    let s = [];
    let head = generateLinkedList(s);
    expect(head).toBeNull();
  });
  it('对于给定非空数组', () => {
    let count = 1000;
    let s = [];
    for (let i = 0; i < count; i++) {
      s.push(i);
    }
    let head = generateLinkedList(s);
    for (let v of s) {
      expect(head.val).toBe(v);
      head = head.next;
    }
    expect(head).toBeNull();
  })
});

describe('测试生成循环链表', () => {
  it('对于给定空字符串', () => {
    let s = '';
    let head = generateCycleLinkedList(s);
    expect(head).toBeNull();
  });
  it('对于给定一个字符的字符串', () => {
    let s = '1';
    let head = generateCycleLinkedList(s);
    expect(head.val).toBe(s);
    expect(head.next).toBeNull();
  });
  it('对于给定多个字符的字符串', () => {
    let s = '123';
    let head = generateCycleLinkedList(s);
    let p = head;
    for (let v of s) {
      expect(p.val).toBe(v);
      p = p.next;
    }
    expect(p).toBe(head);
  });
  it('对于给定空数组', () => {
    let s = [];
    let head = generateCycleLinkedList(s);
    expect(head).toBeNull();
  });
  it('对于给定非空数组', () => {
    let count = 1000;
    let s = [];
    for (let i = 0; i < count; i++) {
      s.push(i);
    }
    let head = generateCycleLinkedList(s);
    let p = head;
    for (let v of s) {
      expect(p.val).toBe(v);
      p = p.next;
    }
    expect(p).toBe(head);
  })
})