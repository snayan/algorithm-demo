import { generateBinaryTree, generateBinaryTree2 } from '.';
import LinkedNode from '../../DataStructure/LinkedNode';

function preOrderVisit(binaryTree: LinkedNode, output: any[] = []) {
  output.push(binaryTree.val);
  // left child tree
  if (binaryTree.next) {
    preOrderVisit(binaryTree.next, output);
  }
  // right child tree
  if (binaryTree.pre) {
    preOrderVisit(binaryTree.pre, output);
  }
  return output;
}

function inOrderVisit(binaryTree: LinkedNode, output: any[] = []) {
  // left child tree
  if (binaryTree.next) {
    inOrderVisit(binaryTree.next, output);
  }
  output.push(binaryTree.val);
  // right child tree
  if (binaryTree.pre) {
    inOrderVisit(binaryTree.pre, output);
  }
  return output;
}

describe('构建二叉树', () => {
  const preOrder = [1, 2, 4, 7, 3, 5, 6, 8];
  const inOrder = [4, 7, 2, 1, 5, 3, 8, 6];

  it('generateBinaryTree', () => {
    const tree = generateBinaryTree(preOrder, inOrder);
    const preOutput = preOrderVisit(tree);
    for (let i = 0, j = preOutput.length; i < j; i++) {
      expect(preOutput[i]).toBe(preOrder[i]);
    }
    const inOutput = inOrderVisit(tree);
    for (let i = 0, j = inOutput.length; i < j; i++) {
      expect(inOutput[i]).toBe(inOrder[i]);
    }
  });

  it('generateBinaryTree2', () => {
    const tree = generateBinaryTree2(preOrder, inOrder);
    const preOutput = preOrderVisit(tree);
    for (let i = 0, j = preOutput.length; i < j; i++) {
      expect(preOutput[i]).toBe(preOrder[i]);
    }
    const inOutput = inOrderVisit(tree);
    for (let i = 0, j = inOutput.length; i < j; i++) {
      expect(inOutput[i]).toBe(inOrder[i]);
    }
  });
});
