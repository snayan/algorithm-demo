/* 二叉搜索树的顺序存储 */

interface Data<T> {
  val: T;
  deleted: boolean;
}

class BinarySearchTree<T = number> {

  data: Data<T>[];
  len: number;

  constructor() {
    // 根节点从1开始存储
    this.data = [null];
    this.len = 0;
  }

  exist(index: number) {
    return this.data[index] !== undefined;
  }

  /* 添加 */
  insert(v: T) {
    const data = this.data;
    const node = {
      val: v,
      deleted: false
    };
    this.len++;

    // 根节点不存在，则插入根节点位置
    if (!this.exist(1)) {
      data[1] = node;
      return;
    }

    // 根节点开始，寻找插入位置
    let index = 1;
    let inserted = false;
    while (!inserted) {
      const current = data[index];
      if (v < current.val) {
        // 小于当前节点，
        const leftChild = index << 1;
        if (this.exist(leftChild)) {
          // 存在左子节点，则继续往左子树查找
          index = leftChild;
        } else {
          // 否则，插入到当前节点的左子节点
          data[leftChild] = node;
          inserted = true;
        }
      } else {
        // 大于或者等于当前节点
        const rightChild = (index << 1) + 1;
        if (this.exist(rightChild)) {
          // 存在右子节点，则继续往右子树查找
          index = rightChild;
        } else {
          // 否则，插入到当前节点的右子节点
          data[rightChild] = node;
          inserted = true;
        }
      }
    }
  }

  /* 移除 */
  delete(v: T) {
    if (!this.len) {
      return;
    }

    const data = this.data;
    // 从根节点开始
    let index = 1;
    let deleted = false;
    while (!deleted) {
      const current = data[index];
      if (v < current.val) {
        // 小于当前节点，往左子树找
        const leftChild = index << 1;
        // 不存在
        deleted = !this.exist(leftChild);
        if (!deleted) {
          index = leftChild;
        }
      } else {
        // 等于当前节点，
        if (v === current.val) {
          data[index].deleted = true;
          this.len--;
        }
        // 继续往右子树查找
        const rightChild = (index << 1) + 1;
        deleted = !this.exist(rightChild);
        if (!deleted) {
          index = rightChild;
        }
      }
    }
  }

  /* 查找 */
  find(v: T) {
    if (!this.len) {
      return false;
    }
    const data = this.data;
    let index = 1;
    let found = false;
    let finished = false;
    while (!finished && !found) {
      const current = data[index];
      found = !current.deleted && current.val === v;
      if (!found) {
        if (v < current.val) {
          const leftChild = index << 1;
          finished = !this.exist(leftChild);
          if (!finished) {
            index = leftChild;
          }
        } else {
          const rightChild = (index << 1) + 1;
          finished = !this.exist(rightChild);
          if (!finished) {
            index = rightChild;
          }
        }
      }
    }
    return found;
  }

  /* 查找最小值 */
  findMin() {
    if (!this.len) {
      return null;
    }
    const data = this.data;
    let index = 1;
    let min = null;
    let finished = false;
    while (!finished) {
      const current = data[index];
      index = index << 1;
      finished = !this.exist(index);
      if (!current.deleted) {
        min = current.val;
      }
    }

    return min;
  }

  /* 查找最大值 */
  findMax() {
    if (!this.len) {
      return null;
    }
    const data = this.data;
    let index = 1;
    let max = null;
    let finished = false;
    while (!finished) {
      const current = data[index];
      index = (index << 1) + 1;
      finished = !this.exist(index);
      if (!current.deleted) {
        max = current.val;
      }
    }

    return max;
  }

  /* 先序遍历 */
  preOrder() {
    if (!this.len) {
      return [];
    }
    const data = this.data;
    const result = [];

    const visit = (index: number, result: T[]) => {
      if (!this.exist(index)) {
        return;
      }
      // 先访问当前节点
      const current = data[index];
      if (!current.deleted) {
        result.push(current.val);
      }

      // 再访问左边节点
      visit(index << 1, result);

      // 最后访问右边节点
      visit((index << 1) + 1, result);
    }

    visit(1, result);

    return result;
  }

  /* 中序遍历 */
  inOrder() {
    if (!this.len) {
      return [];
    }
    const data = this.data;
    const result = [];

    const visit = (index: number, result: T[]) => {
      if (!this.exist(index)) {
        return;
      }
      // 先访问左边节点
      visit(index << 1, result);

      // 再访问当前节点
      const current = data[index];
      if (!current.deleted) {
        result.push(current.val);
      }

      // 最后访问右边节点
      visit((index << 1) + 1, result);
    }

    visit(1, result);

    return result;
  }

  /* 后序遍历 */
  postOrder() {
    if (!this.len) {
      return [];
    }
    const data = this.data;
    const result = [];

    const visit = (index: number, result: T[]) => {
      if (!this.exist(index)) {
        return;
      }
      // 先访问左边节点
      visit(index << 1, result);

      // 再访问右边节点
      visit((index << 1) + 1, result);

      // 最后访问当前节点
      const current = data[index];
      if (!current.deleted) {
        result.push(current.val);
      }
    }

    visit(1, result);

    return result;
  }
}

export default BinarySearchTree;
