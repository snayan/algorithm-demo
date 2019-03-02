/**
 * 用数组实现的顺序栈
 * 
 * @class ArrayStack
 */
class ArrayStack<Item> {

  private values: Item[];

  constructor() {
    this.values = [];
  }

  /**
   * 将当前元素压入栈
   * 
   * @param {Item} item 待入栈的元素
   * @returns {boolean} 标识入栈是否成功
   * @memberof Stack
   */
  public push(item: Item): boolean {
    this.values.push(item);
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
    let item = this.values.pop();
    return item;
  }

  /**
   * 返回当前栈的元素个数
   * 
   * @returns {number} 
   * @memberof Stack
   */
  public getStackCount(): number {
    return this.values.length;
  }

  /**
   * 返回当前栈顶元素
   * 
   * @returns {Item} 栈顶元素 
   * @memberof ArrayStack
   */
  public getCurrentItem(): Item {
    let l = this.getStackCount();
    if (l === 0) {
      return null;
    }
    return this.values[l - 1];
  }

  /**
   * 清空栈
   * 
   * @memberof Stack
   */
  public clear() {
    this.values.length = 0;
  }
}

export default ArrayStack;