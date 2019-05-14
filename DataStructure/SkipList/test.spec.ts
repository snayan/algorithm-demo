import SkipList from '.';

describe('测试跳表', () => {

  it('创建', () => {
    const skip = new SkipList();
    expect(skip.count).toBe(0);
    for (let i = 0; i < skip.maxLevel; i++) {
      expect(skip.head.nexts[i]).toBeNull();
    }
  })

  it('插入', () => {
    const COUNT = 1000;
    for (let i = 0; i < COUNT; i++) {
      const skip = new SkipList();
      skip.insert(i);
      const node = skip.head.nexts[0];
      expect(node).not.toBeNull();
      expect(node.data).toBe(i);
    }

  });

  it('插入头部节点', () => {
    const skip = new SkipList();
    skip.insert(2);
    const node = skip.head.nexts[0];
    skip.insert(1); // 1 应该插入头部节点位置
    const newNode = skip.head.nexts[0];
    expect(newNode.data).toBe(1);
    for (let i = 0, level = newNode.maxLevel; i < level; i++) {
      if (i < node.maxLevel) {
        expect(newNode.nexts[i]).toBe(node);
      } else {
        expect(newNode.nexts[i]).toBeNull();
      }
    }

  })

  it('插入尾部节点', () => {
    const skip = new SkipList();
    skip.insert(1);
    const node = skip.head.nexts[0];
    skip.insert(2); // 2  应该插入到尾部位置
    const newNode = node.nexts[0];
    expect(newNode.data).toBe(2);
    for (let i = 0, level = newNode.maxLevel; i < level; i++) {
      expect(newNode.nexts[i]).toBeNull();
    }
  })

  it('插入中间节点', () => {
    const skip = new SkipList();
    skip.insert(1);
    const first = skip.head.nexts[0];
    skip.insert(3);
    const three = first.nexts[0];
    skip.insert(2); // 2 应该插入中间位置
    const second = first.nexts[0];
    expect(second.data).toBe(2);
    for (let i = 0, level = second.maxLevel; i < level; i++) {
      if (i < three.maxLevel) {
        expect(second.nexts[i]).toBe(three);
      } else {
        expect(second.nexts[i]).toBeNull();
      }
    }
  })

  it('查找', () => {
    const skip = new SkipList();
    expect(skip.find(1)).toBeNull();
    skip.insert(1);
    const node = skip.head.nexts[0];
    expect(skip.find(1)).toBe(node);
    for (let i = 1; i < 100; i++) {
      skip.insert(i);
    }
    expect(skip.find(1)).toBe(node);
    expect(skip.find(100)).toBeNull();
  })

  it('删除', () => {
    const skip = new SkipList();
    expect(() => {
      skip.delete(1);
    }).not.toThrow();
    const COUNT = 10;
    for (let i = 0; i < COUNT; i++) {
      skip.insert(i);
    }
    expect(skip.count).toBe(COUNT);
    for (let i = 0; i < COUNT; i++) {
      skip.delete(i);
      expect(skip.count).toBe(COUNT - i - 1);
    }
  })

  it('print', () => {
    const skip = new SkipList();
    const COUNT = 20;
    for (let i = 0; i < COUNT; i++) {
      skip.insert(Math.floor(Math.random() * 100));
    }
    skip.print();
  })
})