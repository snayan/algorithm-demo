import LinkedNode from '../LinkedNode';
/**
 * 使用链表实现链式队列
 *
 * @class LinkedQueue
 * @template Item
 */
class LinkedQueue<Item> {
  private head: LinkedNode;
  private tail: LinkedNode;
  private count: number;

  constructor() {
    this.head = new LinkedNode(null, null);
    this.tail = this.head;
    this.count = 0;
  }

  /**
   * 将元素入队列
   *
   * @param {Item} item
   * @memberof LinkedQueue
   */
  public enqueue(item: Item) {
    const node = new LinkedNode(item, null);
    this.tail.next = node;
    this.tail = node;
    this.count = this.count + 1;
  }

  /**
   * 出队列
   *
   * @returns {(Item | null)} 返回队首元素
   * @memberof LinkedQueue
   */
  public dequeue(): Item | null {
    const node = this.head.next;
    if (node !== null) {
      this.head.next = node.next;
      this.count = this.count - 1;
    }
    return node == null ? null : node.val;
  }

  /**
   *  清空队列
   *
   * @memberof LinkedQueue
   */
  public clear() {
    this.head = new LinkedNode(null, null);
    this.tail = this.head;
    this.count = 0;
  }

  /**
   * 获取队列的长度
   *
   * @returns {number} 返回队列元素个数
   * @memberof LinkedQueue
   */
  public getQueueCount(): number {
    return this.count;
  }
}

export default LinkedQueue;
