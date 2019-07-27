import BinarySearchTree from './ArrayBinarySearchTree';

const index = 0;
describe(`测试顺序二叉搜索树`, () => {
  let tree: BinarySearchTree<number>;
  const data = [10, 5, 15, 3, 8, 12, 20];
  const sortedData = [...data].sort((a, b) => a - b);
  const dataLen = data.length;

  beforeAll(() => {
    tree = index === 0 ? new BinarySearchTree() : null;
  })

  it('测试空树', () => {
    expect(tree.len).toBe(0);
  });

  it('测试插入', () => {
    data.forEach((v, i) => {
      tree.insert(v);
      expect(tree.len).toBe(i + 1);
    });
  })

  it('测试查找', () => {
    expect(tree.find(20)).toBeTruthy();
    expect(tree.find(13)).toBeFalsy();
  })

  it('测试查找最小值', () => {
    debugger;
    const min = tree.findMin();
    expect(min).toBe(sortedData[0]);
  })

  it('测试查找最大值', () => {
    const max = tree.findMax();
    expect(max).toBe(sortedData[dataLen - 1]);
  })

  it('测试先序遍历', () => {
    const orderData = tree.preOrder();
    const result = [10, 5, 3, 8, 15, 12, 20];
    expect(orderData.join(',')).toBe(result.join(','));
  })

  it('测试中序遍历', () => {
    const orderData = tree.inOrder();
    const result = [3, 5, 8, 10, 12, 15, 20];
    expect(orderData.join(',')).toBe(result.join(','));
  })

  it('测试后序遍历', () => {
    const orderData = tree.postOrder();
    const result = [3, 8, 5, 12, 20, 15, 10];
    expect(orderData.join(',')).toBe(result.join(','));
  })

  it('测试删除', () => {
    tree.delete(sortedData[0]);
    expect(tree.findMin()).toBe(sortedData[1]);
    expect(tree.len).toBe(dataLen - 1);

    tree.delete(sortedData[dataLen - 1]);
    expect(tree.findMax()).toBe(sortedData[dataLen - 2]);
    expect(tree.len).toBe(dataLen - 2);
  })
})