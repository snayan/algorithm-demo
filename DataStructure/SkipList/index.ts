/* 跳表 */

function isNotEmpty(v) {
  return v !== undefined && v !== null;
}

interface LinkedNode {
  data: number;
  maxLevel: number;
  nexts: LinkedNode[];
  pres: LinkedNode[];
}

export default class SkipList {
  head: LinkedNode; // 头节点，哨兵节点，不存储实际数据
  maxLevel: number; // 索引最大层级
  count: number; // 存在节点个数
  constructor(maxLevel: number) {
    let emptyPointer = [];
    for (let i = 0; i < maxLevel; i++) {
      emptyPointer[i] = null;
    }
    this.count = 0;
    this.maxLevel = Math.max(maxLevel, 0);
    this.head = { data: null, maxLevel: maxLevel, nexts: [...emptyPointer], pres: [...emptyPointer] };
  }

  /* 生成一个随机的层索引数 */
  private randomLevel() {
    return Math.floor(Math.random() * this.maxLevel);
  }

  /* 遍历索引 */
  private scanWhere(condition: (node: LinkedNode) => boolean) {
    let p = this.head;
    // 从顶层索引开始查找，i--，表示跳转到下一层索引
    for (let i = this.maxLevel - 1; i > -1; i--) {
      while (isNotEmpty(p.nexts[i]) && !condition(p.nexts[i])) {
        p = p.nexts[i];
      }
    }
    return p;
  }

  public add(value: number) {
    if (this.find(value)) {
      // 已经存在，直接返回
      return;
    }
    // 获取随机索引层
    const level = this.randomLevel();
    // 新节点
    const newNode = { data: value, maxLevel: level, nexts: [], pres: [] };
    // 从原始链表层开始插入，逐层插入
    for (let i = 0; i <= level; i++) {
      let p = this.head;
      while (isNotEmpty(p.nexts[i]) && p.nexts[i].data < value) {
        p = p.nexts[i];
      }
      // 插入操作
      newNode.nexts[i] = p.nexts[i];
      newNode.pres[i] = p;
      p.nexts[i] = newNode;
      if (newNode.nexts[i]) {
        newNode.nexts[i].pres[i] = newNode;
      }
    }
    this.count++;
  }

  public remove(value: number) {
    const node = this.find(value);
    if (!node) {
      return;
    }
    //  除了移除原始单链表，还需要移除索引上的该节点
    for (let i = 0, level = node.maxLevel; i <= level; i++) {
      node.pres[i].nexts[i] = node.nexts[i];
    }
    this.count--;
  }

  public find(value: number) {
    const node = this.scanWhere(node => node.data > value);
    // 在原始单链表层查找
    if (isNotEmpty(node) && node.data === value) {
      return node;
    }

    return null;
  }

  public print() {
    let msg = '';
    const padLine = (len: number) => {
      let line = '';
      for (let i = 0; i < len; i++) {
        line += '--';
      }
      return line + '->';
    }
    for (let i = 0; i < this.maxLevel; i++) {
      let p = this.head;
      let count = 0;
      msg += 'head';
      while (isNotEmpty(p.nexts[i])) {
        count = p.nexts[i].data - (p.nexts[i].pres[i].data || 0);
        // console.log(count)
        msg += ' ' + padLine(0) + ' ' + p.nexts[i].data;
        p = p.nexts[i];
      }
      msg += padLine(0) + ' ' + 'null\n';
    }
    console.log(msg);
  }
}
