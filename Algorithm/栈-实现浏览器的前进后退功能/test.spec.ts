import BrowserHistory from '.';

describe('测试-使用栈实现浏览器的前进后退功能', () => {

  let browser: BrowserHistory<string>;
  let count = 100;
  let pages: string[] = (function () {
    let pages = [];
    for (let i = 0; i < count; i++) {
      pages.push(i + '');
    }
    return pages;
  }());

  let initBrowser = () => {
    browser = new BrowserHistory();
    for (let p of pages) {
      browser.pushState(p);
    }
  }

  afterEach(() => {
    browser = null;
  })

  it('测试go函数', () => {
    browser = new BrowserHistory();
    let params = [0, 1, -1, undefined, null];
    for (let p of params) {
      expect(() => {
        browser.go(p);
      }).not.toThrow();
    }
    for (let i = 1; i <= count + 1; i++) {
      initBrowser();
      browser.go(-1 * i);
      expect(browser.getCurrentPage()).toBe(pages[Math.max(count - 1 - i, 0)]);
    }

    let s = 0;
    for (let i = 1; i <= count + 1; i++) {
      browser.go(1 * i);
      s = s + i;
      expect(browser.getCurrentPage()).toBe(pages[Math.min(s, count - 1)]);
    }

  });
  it('测试forward函数', () => {
    initBrowser();
    expect(browser.getCurrentPage()).toBe(pages[count - 1]);
    browser.forward(); // 当前无可前进的页面
    expect(browser.getCurrentPage()).toBe(pages[count - 1]);

    for (let i = 1; i <= count; i++) {
      initBrowser();
      browser.go(-1 * i);
      expect(browser.getCurrentPage()).toBe(pages[Math.max(count - 1 - i, 0)]);
      browser.forward();
      expect(browser.getCurrentPage()).toBe(pages[Math.max(count - i, 1)]);
    }

  });
  it('测试back函数', () => {
    initBrowser();
    expect(browser.getCurrentPage()).toBe(pages[count - 1]);
    for (let i = 1; i <= count; i++) {
      browser.back();
      expect(browser.getCurrentPage()).toBe(pages[Math.max(count - 1 - i, 0)]);
    }
  });
  it('测试pushState函数', () => {
    browser = new BrowserHistory();
    expect(browser.getCurrentPage()).toBeNull();
    for (let i = 0; i < count; i++) {
      browser.pushState(pages[i]);
      expect(browser.getCurrentPage()).toBe(pages[i]);
    }
  });
  it('测试replaceState函数', () => {
    browser = new BrowserHistory();
    expect(browser.getCurrentPage()).toBeNull();
    expect(() => {
      browser.replaceState('A');
    }).not.toThrow();
    expect(browser.getCurrentPage()).toBe('A');
    browser.replaceState('B');
    expect(browser.getCurrentPage()).toBe('B');

  });
  it('测试length属性', () => {
    browser = new BrowserHistory();
    expect(browser.length).toBe(0);
    for (let i = 0; i < count; i++) {
      browser.pushState(i + '');
      expect(browser.length).toBe(i + 1);
    }

    for (let i = 1; i <= count + 1; i++) {
      initBrowser();
      browser.go(-1 * i);
      expect(browser.length).toBe(count);
    }
    let s = 0;
    for (let i = 1; i <= count + 1; i++) {
      browser.go(1 * i);
      s = s + i;
      expect(browser.length).toBe(count);
    }
    browser = new BrowserHistory();
    browser.pushState('A');
    expect(browser.length).toBe(1); // A
    browser.pushState('B');
    expect(browser.length).toBe(2); // A B
    browser.pushState('C');
    expect(browser.length).toBe(3); // A B C
    browser.back();
    expect(browser.length).toBe(3); // A B   【C】
    browser.pushState('D');
    expect(browser.length).toBe(3); // A B D
    browser.pushState('E');
    expect(browser.length).toBe(4); // A B D E
    browser.replaceState('F');
    expect(browser.length).toBe(4); // A B D F
    browser.back();
    browser.replaceState('G'); // A B G
    expect(browser.length).toBe(3);
  });
})