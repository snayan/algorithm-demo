import ArrayStack from './ArrayStack';
import LinkedStack from './LinkedStack';

type ArrayStackCtor = ArrayStack<number>;
type LinkedStackCtor = LinkedStack<number>;

[0, 1].forEach(index => {

  describe(`测试${index === 0 ? '顺序' : '链式'}栈`, () => {

    let stack: ArrayStackCtor | LinkedStackCtor;

    beforeEach(() => {
      stack = index === 0 ? new ArrayStack() : new LinkedStack();
    })

    it('入栈', () => {
      let count = 100;
      for (let i = 0; i < count; i++) {
        let flag = stack.push(i);
        expect(flag).toBe(true);
      }
    });
    it('出栈', () => {
      let count = 100;
      for (let i = 0; i < count; i++) {
        stack.push(i);
      }
      for (let i = count - 1; i >= 0; i--) {
        let item = stack.pop();
        expect(item).toBe(i);
      }
      let item = stack.pop();
      expect(item).toBeNull();
    });
    it('清空栈', () => {
      expect(stack.getStackCount()).toBe(0);
      stack.push(1);
      expect(stack.getStackCount()).toBe(1);
      stack.clear();
      expect(stack.getStackCount()).toBe(0);
    })
    it('获取栈元素个数', () => {
      let count = 100;
      for (let i = 0; i < count; i++) {
        stack.push(i);
        expect(stack.getStackCount()).toBe(i + 1);
      }
    });
    it('获取栈顶元素', () => {
      let count = 100;
      expect(stack.getCurrentItem()).toBeNull();
      for (let i = 0; i < count; i++) {
        stack.push(i);
        expect(stack.getCurrentItem()).toBe(i);
      }
    })
  });
})