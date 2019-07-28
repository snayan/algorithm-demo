/* 二叉搜索树的链式存储 */


interface Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
}

class LinkBinarySearchTree<T = number> {

  data: Node<T>
  len: number

  constructor() {
    this.data = null;
    this.len = 0;
  }

  private createNode(v: T) {
    return {
      value: v,
      left: null,
      right: null
    }
  }

  /* 添加 */
  public insert(v: T) {

    const newVal = this.createNode(v);
    this.len++;

    // 根节点不存在，
    if (!this.data) {
      this.data = newVal;
      return;
    }

    // 当前节点
    let current = this.data;
    // 记录父节点
    let parent = null;
    while (current) {
      parent = current;
      if (v < current.value) {
        // 往左子树查找
        current = current.left;
      } else {
        // 往右子树查找
        current = current.right;
      }
    }

    // 插入
    if (v < parent.value) {
      parent.left = newVal;
    } else {
      parent.right = newVal;
    }

  }

  /* 删除 */
  public delete(v: T) {

    const deletx = (tree: Node<T> | null, v: T) => {

      if (!tree) {
        return tree;
      }

      let current = tree;
      let parent = null;
      // 先找到要删除的节点
      while (current && current.value !== v) {
        parent = current;
        if (v < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      if (current === null) {
        // 没有要删除的，则直接返回
        return tree;
      }

      // 递归右子树，删除相同值的节点
      current.right = deletx(current.right, v);

      this.len--;

      if (current.left && current.right) {
        // 要删除的节点，有左右子节点，则在右子树中找出最小的节点，替换到当前节点，并删除那个最小节点
        let min = current.right;
        let minParent = current;
        while (min.left) {
          minParent = min;
          min = min.left;
        }
        // 将最小值节点值替换到要删除节点current位置
        current.value = min.value;
        // 注意：这里有个技巧，最小节点一定是没有左节点的，不然也就不是最小的了，后面就是要删除那个最小值节点了，
        current = min;
        parent = minParent;
      }

      // 要删除节点是叶子节点，或者仅有一个子节点
      let child = null;
      if (current.left !== null) {
        child = current.left;
      } else if (current.right !== null) {
        child = current.right;
      }

      if (parent === null) {
        // 要删除的是根节点，
        tree = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }

      return tree;

    }

    this.data = deletx(this.data, v);

  }

  /* 查找 */
  public find(v: T): Node<T>[] {

    if (!this.data) {
      return [];
    }

    const result = [];
    let current = this.data;
    while (current) {
      if (v < current.value) {
        current = current.left;
      } else if (v > current.value) {
        current = current.right;
      } else {
        result.push(current);
        // 继续往右子树查找，直到找出所有的
        current = current.right;
      }
    }

    return result;
  }

  /* 查找最小值 */
  public findMin(): T | null {

    if (!this.data) {
      return null;
    }
    let current = this.data;
    let min = current.value;
    while (current) {
      min = current.value;
      current = current.left;
    }

    return min;
  }

  /* 查找最大值 */
  public findMax(): T | null {
    if (!this.data) {
      return null;
    }
    let current = this.data;
    let max = current.value;
    while (current) {
      max = current.value;
      current = current.right;
    }

    return max;
  }

  /* 先序遍历 */
  public preOrder() {
    if (!this.data) {
      return [];
    }

    const result = [];

    const visit = (node: Node<T>, result: T[]) => {
      if (!node) {
        return;
      }

      // 先访问当前节点，
      result.push(node.value);

      // 再访问左节点
      visit(node.left, result);

      // 最后，访问右节点
      visit(node.right, result);
    }

    visit(this.data, result);

    return result;
  }

  /* 中序遍历 */
  public inOrder() {
    if (!this.data) {
      return [];
    }

    const result = [];

    const visit = (node: Node<T>, result: T[]) => {
      if (!node) {
        return;
      }

      // 先访问左节点
      visit(node.left, result);

      // 再访问当前节点，
      result.push(node.value);

      // 最后，访问右节点
      visit(node.right, result);
    }

    visit(this.data, result);

    return result;
  }

  /* 后序遍历 */
  public postOrder() {
    if (!this.data) {
      return [];
    }

    const result = [];

    const visit = (node: Node<T>, result: T[]) => {
      if (!node) {
        return;
      }

      // 先访问左节点
      visit(node.left, result);

      // 再访问右节点
      visit(node.right, result);

      // 最后，访问当前节点，
      result.push(node.value);
    }

    visit(this.data, result);

    return result;
  }

}


export default LinkBinarySearchTree;
