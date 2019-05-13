import SkipList from '.';
const MAX_LEVEL = 6;

describe('测试跳表', () => {
  let skip: SkipList;

  beforeEach(() => {
    skip = new SkipList(MAX_LEVEL);
  })

  it('创建', () => {
    expect(skip.count).toBe(0);
    expect(skip.maxLevel).toBe(MAX_LEVEL);
    for (let i = 0; i < MAX_LEVEL; i++) {
      expect(skip.head.nexts[i]).toBeNull();
      expect(skip.head.pres[i]).toBeNull();
    }
  })

  it('插入', () => {
    // 插入1
    skip.add(1);
    const firstNode = skip.head.nexts[0];
    expect(skip.count).toBe(1);
    expect(firstNode.data).toBe(1);
    expect(firstNode.maxLevel).toBeLessThanOrEqual(MAX_LEVEL);
    expect(firstNode.maxLevel).toBeGreaterThanOrEqual(0);
    for (let i = 0, level = firstNode.maxLevel; i <= level; i++) {
      expect(skip.head.nexts[i]).toBe(firstNode);
      expect(firstNode.pres[i]).toBe(skip.head);
      expect(firstNode.nexts[i]).toBeNull();
    }

    // 插入2
    skip.add(2);
    const secondNode = firstNode.nexts[0];
    expect(skip.count).toBe(2);
    expect(secondNode.data).toBe(2);
    for (let i = 0, level = secondNode.maxLevel; i <= level; i++) {
      if (i <= firstNode.maxLevel) {
        expect(secondNode.pres[i]).toBe(firstNode);
      } else {
        expect(secondNode.pres[i]).toBe(skip.head);
      }
      expect(secondNode.nexts[i]).toBeNull();
    }

  });

  it('插入头部节点', () => {
    skip.add(2);
    const node = skip.head.nexts[0];
    skip.add(1); // 1 应该插入头部节点位置
    const newNode = skip.head.nexts[0];
    expect(newNode.data).toBe(1);
    for (let i = 0, level = newNode.maxLevel; i <= level; i++) {
      expect(newNode.pres[i]).toBe(skip.head);
      if (i <= node.maxLevel) {
        expect(newNode.nexts[i]).toBe(node);
      } else {
        expect(newNode.nexts[i]).toBeNull();
      }
    }

  })

  it('插入尾部节点', () => {
    skip.add(1);
    const node = skip.head.nexts[0];
    skip.add(2); // 2  应该插入到尾部位置
    const newNode = node.nexts[0];
    expect(newNode.data).toBe(2);
    for (let i = 0, level = newNode.maxLevel; i <= level; i++) {
      expect(newNode.nexts[i]).toBeNull();
      if (i <= node.maxLevel) {
        expect(newNode.pres[i]).toBe(node);
      } else {
        expect(newNode.pres[i]).toBe(skip.head);
      }
    }
  })

  it('插入中间节点', () => {
    skip.add(1);
    const first = skip.head.nexts[0];
    skip.add(3);
    const three = first.nexts[0];
    skip.add(2); // 2 应该插入中间位置
    const second = first.nexts[0];
    expect(second.data).toBe(2);
    for (let i = 0, level = second.maxLevel; i <= level; i++) {
      if (i <= three.maxLevel) {
        expect(second.nexts[i]).toBe(three);
      } else {
        expect(second.nexts[i]).toBeNull();
      }
      if (i <= first.maxLevel) {
        expect(second.pres[i]).toBe(first);
      } else {
        expect(second.pres[i]).toBe(skip.head);
      }
    }
  })

  it('查找', () => {
    expect(skip.find(1)).toBeNull();
    skip.add(1);
    const node = skip.head.nexts[0];
    expect(skip.find(1)).toBe(node);
    for (let i = 1; i < 100; i++) {
      skip.add(i);
    }
    expect(skip.find(1)).toBe(node);
    expect(skip.find(100)).toBeNull();
  })

  it('删除', () => {
    expect(() => {
      skip.remove(1);
    }).not.toThrow();
    const COUNT = 100;
    for (let i = 0; i < COUNT; i++) {
      skip.add(i);
    }
    expect(skip.count).toBe(COUNT);
    for (let i = 0; i < COUNT; i++) {
      skip.remove(i);
      expect(skip.count).toBe(COUNT - i - 1);
    }
  })

  it('print', () => {
    const COUNT = 20;
    for (let i = 0; i < COUNT; i++) {
      skip.add(Math.floor(Math.random() * 100));
    }
    skip.print();
  })
})