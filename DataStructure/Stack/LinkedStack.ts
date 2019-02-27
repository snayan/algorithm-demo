import LinkedNode from '../LinkedNode';

/**
 * 用链表实现的链式栈
 * 
 * @class LinkedStack
 */
class LinkedStack<Item> {

  private head: LinkedNode;
  private len: number;

  constructor() {
    this.head = null;
    this.len = 0;
  }

  /**
   * 将当前元素压入栈
   * 
   * @param {Item} item 待入栈的元素
   * @returns {boolean} 标识入栈是否成功
   * @memberof Stack
   */
  public push(item: Item): boolean {
    let node = new LinkedNode(item, this.head);
    this.head = node;
    this.len++;
    return true;
  }

  /**
   * 出栈
   * 
   * @returns {Item} 出栈的元素
   * @memberof Stack
   */
  public pop(): Item {
    if (this.getStackCount() === 0) {
      return null;
    }
    let item = this.head.val;
    this.head = this.head.next;
    this.len--;
    return item;
  }

  /**
   * 返回当前栈的元素个数
   * 
   * @returns {number} 
   * @memberof Stack
   */
  public getStackCount(): number {
    return this.len;
  }

  /**
   * 清空栈
   * 
   * @memberof Stack
   */
  public clear() {
    this.len = 0;
    this.head = null;
  }
}

export default LinkedStack;