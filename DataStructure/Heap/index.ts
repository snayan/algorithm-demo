/* 大顶堆 */

class Heap<T = number> {

  len: number;
  capacity: number;
  data: T[]

  constructor(capacity: number) {
    capacity = Math.ceil(capacity);
    if (Number.isNaN(capacity) || capacity < 0) {
      throw new Error('capacity must be positive integer')
    }
    this.len = 0;
    this.capacity = capacity;
    this.data = new Array(capacity + 1);
  }

  private exist(i: number) {
    return i <= this.len && i > 0;
  }

  /* 交换 */
  private swap(i: number, j: number) {
    const data = this.data;
    const tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
  }

  /* 从下往上堆化 */
  private heapifyFromBottom() {
    const data = this.data;
    let current = this.len;
    let parent = current >> 1;
    let finished = current < 2;

    while (!finished) {
      if (data[current] > data[parent]) {
        this.swap(current, parent);
        current = parent;
        parent = current >> 1;
        finished = current < 2;
      } else {
        finished = true;
      }
    }
  }

  /* 从顶往下堆化 */
  private heapifyFromTop() {
    const data = this.data;

    if (!this.len) {
      return;
    }

    let finished = false;
    let current = 1;

    while (!finished) {
      let maxPos = current;
      let left = current << 1;
      let right = left + 1;
      if (this.exist(left) && data[maxPos] < data[left]) {
        maxPos = left;
      }
      if (this.exist(right) && data[maxPos] < data[right]) {
        maxPos = right;
      }

      // 当前自己节点就是最大的，所以结束
      finished = maxPos === current;

      if (!finished) {
        this.swap(current, maxPos);
        current = maxPos;
      }

    }

  }

  /* 删除堆顶元素 */
  public deleteTop() {
    if (!this.len) {
      return null;
    }
    const data = this.data;

    const top = data[1];

    data[1] = data[this.len];

    this.len--;

    this.heapifyFromTop();

    return top;
  }

  public insert(v: T, force: boolean = false) {
    debugger;
    const isFull = this.len === this.capacity;

    if (isFull && !force) {
      // 堆满了
      return false;
    }

    if (isFull) {
      // 先删除堆顶元素，然后再插入
      this.deleteTop();
    }

    this.len++;

    // 总是将当前值插入到最后，然后从下往上堆化
    this.data[this.len] = v;

    this.heapifyFromBottom();

    return true;
  }


}

export default Heap;
