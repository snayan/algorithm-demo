import ArrayBinarySearchTree from './ArrayBinarySearchTree';
import LinkBinarySearchTree from './LinkBinarySearchTree';

const testData = [
  {
    data: [1, 1, 1, 1, 1, 1, 1, 1],
    preOrder: [1, 1, 1, 1, 1, 1, 1, 1],
    inOrder: [1, 1, 1, 1, 1, 1, 1, 1],
    postOrder: [1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    preOrder: [1, 2, 3, 4, 5, 6, 7, 8],
    inOrder: [1, 2, 3, 4, 5, 6, 7, 8],
    postOrder: [8, 7, 6, 5, 4, 3, 2, 1],
  },
  {
    data: [8, 7, 6, 5, 4, 3, 2, 1],
    preOrder: [8, 7, 6, 5, 4, 3, 2, 1],
    inOrder: [1, 2, 3, 4, 5, 6, 7, 8],
    postOrder: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    data: [5, 3, 2, 4, 1, 7, 6, 8, 5, 3],
    preOrder: [5, 3, 2, 1, 4, 3, 7, 6, 5, 8],
    inOrder: [1, 2, 3, 3, 4, 5, 5, 6, 7, 8],
    postOrder: [1, 2, 3, 4, 3, 5, 6, 8, 7, 5]
  },
];

testData.forEach(({ data, preOrder, inOrder, postOrder }) => {
  [0, 1].forEach(index => {

    describe(`测试${index === 0 ? '顺序' : '链式'}二叉搜索树`, () => {
      let tree: ArrayBinarySearchTree | LinkBinarySearchTree;
      const sortedData = [...data].sort((a, b) => a - b);
      const dataLen = data.length;

      beforeAll(() => {
        tree = index === 0 ? new ArrayBinarySearchTree() : new LinkBinarySearchTree();
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

        // 不存在的数据 
        const found = tree.find(sortedData[dataLen - 1] + 1);
        expect(found.length).toBe(0);

        // 存在的
        data.forEach((v) => {
          const found = tree.find(v);
          found.forEach(i => {
            if (index === 0) {
              expect(tree.data[i].val).toBe(v);
            } else {
              expect(i.value).toBe(v);
            }
          })
        })
      })

      it('测试查找最小值', () => {
        const min = tree.findMin();
        expect(min).toBe(sortedData[0]);
      })

      it('测试查找最大值', () => {
        const max = tree.findMax();
        expect(max).toBe(sortedData[dataLen - 1]);
      })

      it('测试先序遍历', () => {
        const orderData = tree.preOrder();
        expect(orderData.join(',')).toBe(preOrder.join(','));
      })

      it('测试中序遍历', () => {
        const orderData = tree.inOrder();
        expect(orderData.join(',')).toBe(inOrder.join(','));
      })

      it('测试后序遍历', () => {
        const orderData = tree.postOrder();
        expect(orderData.join(',')).toBe(postOrder.join(','));
      })

      it('测试删除', () => {
        data.forEach(v => {
          tree.delete(v);
          expect(tree.find(v).length).toBe(0);
        });
      })
    })
  })
})
