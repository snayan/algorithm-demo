import Heap from '.';

describe('测试堆', () => {
  it('测试空堆', () => {
    const heap = new Heap(1);
    expect(heap.len).toBe(0);
  })

  it('测试插入', () => {
    let heap = new Heap(1);
    let result = heap.insert(1);
    expect(heap.len).toBe(1);
    expect(result).toBe(true);

    // heap full
    result = heap.insert(2);
    expect(result).toBe(false);

    result = heap.insert(3, true);
    expect(result).toBe(true);
    expect(heap.data[1]).toBe(3);

    const count = 100;
    heap = new Heap(100);
    const moreData = [];
    for (let i = 0; i < count; i++) {
      moreData[i] = Math.ceil(Math.random() * 100);
    }
    moreData.forEach((d, i) => {
      const result = heap.insert(d);
      expect(result).toBe(true);
      expect(heap.len).toBe(i + 1);
    })

  })

  it('测试删除堆顶元素', () => {

    let heap = new Heap(1);
    expect(heap.deleteTop()).toBe(null);
    heap.insert(1);
    expect(heap.deleteTop()).toBe(1);
    expect(heap.len).toBe(0);

    const count = 100;
    heap = new Heap(100);
    const moreData = [];
    for (let i = 0; i < count; i++) {
      moreData[i] = Math.ceil(Math.random() * 100);
    }
    moreData.forEach((d, i) => {
      heap.insert(d);
    })

    const sortedData = [...moreData].sort((a, b) => a - b);
    for (let i = count - 1; i >= 0; i--) {
      const d = heap.deleteTop();
      expect(d).toBe(sortedData[i]);
      expect(heap.len).toBe(i);
    }
  })
})