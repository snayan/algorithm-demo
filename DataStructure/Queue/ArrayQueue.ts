/**
 * 使用数组实现的顺序队列
 *
 * @class ArrayQueue
 * @template Item
 */
class ArrayQueue<Item> {
  private values: Item[];

  constructor() {
    this.values = [];
  }

  /**
   * 将当前元素入队列
   *
   * @param {Item} item
   * @memberof ArrayQueue
   */
  public enqueue(item: Item) {
    this.values.push(item);
    return true;
  }

  /**
   * 出队列，并返回
   *
   * @returns {(Item | null)} 队首的元素
   * @memberof ArrayQueue
   */
  public dequeue(): Item | null {
    if (this.values.length === 0) {
      return null;
    }
    return this.values.shift();
  }

  /**
   * 清空队列
   *
   * @memberof ArrayQueue
   */
  public clear() {
    this.values = [];
  }

  /**
   * 获取当前队列长度
   *
   * @returns {number} 当前队列长度
   * @memberof ArrayQueue
   */
  public getQueueCount(): number {
    return this.values.length;
  }
}

export default ArrayQueue;
