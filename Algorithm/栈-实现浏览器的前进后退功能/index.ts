/* 题目：实现浏览器的前进后退功能 */

import Stack from '../../DataStructure/Stack/ArrayStack';

/**
 * 使用顺序栈实现浏览器的History
 *
 * @class BrowserHistory
 * @template Page
 */
class BrowserHistory<Page> {

  private mainStack: Stack<Page>;
  private auxiliaryStack: Stack<Page>;

  /**
   * 当前session的页面个数
   *
   * @type {number}
   * @memberof BrowserHistory
   */
  public length: number;

  constructor() {
    this.mainStack = new Stack();
    this.auxiliaryStack = new Stack();
    this.length = 0;
  }

  /**
   * 跳转到相对当前页面的页面，如果没有参数或者n =0，则刷新当前页面。
   * 如果n超出范围，则静默失败
   *
   * @param {number} [n=0]
   * @memberof BrowserHistory
   */
  public go(n: number = 0) {
    let forwardPage: Page;
    if (n > 0) {
      // 前进
      while (n > 0 && (forwardPage = this.auxiliaryStack.pop())) {
        this.mainStack.push(forwardPage);
        n = n - 1;
      }
    } else if (n < 0) {
      // 后退, 当mainStack栈里只有一个元素时，说明已经退后到最后一页了，不能再继续后退了
      let l = this.mainStack.getStackCount();
      while (n < 0 && l > 1 && (forwardPage = this.mainStack.pop())) {
        this.auxiliaryStack.push(forwardPage);
        n = n + 1;
        l = l - 1;
      }
    }
  }

  /**
   * 前进。相当于go(1)。
   *
   * @memberof BrowserHistory
   */
  public forward() {
    this.go(1);
  }

  /**
   * 后退。相当于go(-1)
   *
   * @memberof BrowserHistory
   */
  public back() {
    this.go(-1);
  }

  /**
   * 压入新的page
   *
   * @param {Page} page 待压入的页面
   * @memberof BrowserHistory
   */
  public pushState(page: Page) {
    this.auxiliaryStack.clear();
    this.mainStack.push(page);
    this.length = this.mainStack.getStackCount();
  }

  /**
   * 使用新的page替换当前页面
   *
   * @param {Page} page 待压入的页面
   * @memberof BrowserHistory
   */
  public replaceState(page: Page) {
    this.auxiliaryStack.clear();
    this.mainStack.pop();
    this.mainStack.push(page);
    this.length = this.mainStack.getStackCount();
  }
  /**
   * 获取当前页面
   * 
   * @returns {Page} 当前页面
   * @memberof BrowserHistory
   */
  public getCurrentPage(): Page {
    if (this.length === 0) {
      return null;
    }
    return this.mainStack.getCurrentItem();
  }
}

export default BrowserHistory;