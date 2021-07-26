/* 题目：
   给定某个二叉树的先序遍历和中序遍历的结果，二叉树中不会有相同的值，请重建该二叉树。
   例如先序遍历序列是[1,2,4,7,3,5,6,8],中序遍历序列是[4,7,2,1,5,3,8,6]。
*/

import LinkedNode from '../../DataStructure/LinkedNode';

/* 思路：
  二叉树：树，一个结点最多只有2个子结点（可能没有左子结点，只有右子结点）
  先序遍历：先输出根结点，再输出左子结点，最后输出右子结点。（深度优先）
  中序遍历：先输出左子结点，再输出根结点，最后输出右子结点。（深度优先）
  整体思路是，不断的构建左子树，右子树过程。
  在先序遍历中，第一个值一定是根结点A。然后在中序遍历中找到这个根结点A，根结点A左边的值一定是属于左子树，右边的值一定是属于右子树，这样确定了中序遍历数组中左右子树。
  然后根据中序遍历数组中A左边的个数m，可以确定在先序遍历数组中A后面的m个值一定是左子树，剩下的一定是右子树，这样也确定了先序遍历数组中左右子树。
  同理，再分别对左右子树重复上面的思路，继续划分左右子树。
*/
export function generateBinaryTree(preOrder: number[], inOrder: number[]) {
  if (!preOrder.length || !inOrder.length) {
    return null;
  }
  // 先序遍历第一个值一定是根结点
  const root = preOrder[0];

  // 再确定根结点在中序遍历中位置
  let index = 0;
  let len = inOrder.length;
  while (index < len) {
    if (inOrder[index] === root) {
      break;
    }
    index++;
  }
  if (index >= len) {
    // 没有找到,
    throw new Error('not found root node in inOrder');
  }
  // 划分左子树
  const leftChildTree = generateBinaryTree(preOrder.slice(1, index + 1), inOrder.slice(0, index));
  // 划分右子树
  const rightChildTree = generateBinaryTree(preOrder.slice(index + 1), inOrder.slice(index + 1));

  // LinkNode中，第一个值是当前结点的值，第二个值是左结点，第三个值是右结点
  return new LinkedNode(root, leftChildTree, rightChildTree);
}


/* 基于上面的思路实现，每次调用Array.slice都会涉及新数组的申请和拷贝，既浪费空间，又浪费时间，
  优化：实际上数组还是那个数组，可用startIndex，endIndex来定义子数组即可。
*/
export function generateBinaryTree2(preOrder: number[], inOrder: number[]) {
  if (!preOrder.length || !inOrder.length) {
    return null;
  }

  // [startIndex, endIndex] 来定义子数组
  const rebuild = ([preOrderStartIndex, preOrderEndIndex]: [number, number], [inOrderStartIndex, inOrderEndIndex]: [number, number]) => {
    if (preOrderStartIndex > preOrderEndIndex || inOrderStartIndex > inOrderEndIndex) {
      return null;
    }
    // 先序遍历第一个值一定是根结点
    const root = preOrder[preOrderStartIndex];

    // 再确定根结点在中序遍历中位置
    let index = inOrderStartIndex;
    while (index <= inOrderEndIndex) {
      if (inOrder[index] === root) {
        break;
      }
      index++;
    }
    if (index > inOrderEndIndex) {
      // 没有找到,
      throw new Error('not found root node in inOrder');
    }
    const leftTreeCount = index - inOrderStartIndex;
    // 划分左子树
    const leftChildTree = rebuild([preOrderStartIndex + 1, preOrderStartIndex + leftTreeCount], [inOrderStartIndex, index - 1]);
    // 划分右子树
    const rightChildTree = rebuild([preOrderStartIndex + leftTreeCount + 1, preOrderEndIndex], [index + 1, inOrderEndIndex]);

    // LinkNode中，第一个值是当前结点的值，第二个值是左结点，第三个值是右结点
    return new LinkedNode(root, leftChildTree, rightChildTree);
  };

  return rebuild([0, preOrder.length - 1], [0, inOrder.length - 1]);

}