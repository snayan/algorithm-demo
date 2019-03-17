import ArrayQueue from './ArrayQueue';
import LinkedQueue from './LinkedQueue';

[0, 1].forEach((index) => {
  describe(`测试${index === 0 ? '顺序' : '链式'}队列`, () => {
    let queue: ArrayQueue<number> | LinkedQueue<number>;
    const count = 1000;
    beforeAll(() => {
      queue = index === 0 ? new ArrayQueue() : new LinkedQueue();
    });
    it('测试入队列', () => {
      for (let i = 0; i < count; i++) {
        queue.enqueue(i);
      }
    });
    it('测试出队列', () => {
      for (let i = 0; i < count; i++) {
        expect(queue.dequeue()).toBe(i);
      }
      expect(queue.dequeue()).toBeNull();
    });
    it('测试清空队列', () => {
      for (let i = 0; i < count; i++) {
        queue.enqueue(i);
      }
      expect(queue.getQueueCount()).toBe(count);
      queue.clear();
      expect(queue.getQueueCount()).toBe(0);
    });
  });
});
