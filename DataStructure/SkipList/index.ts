/* 跳表 */

function isNotEmpty(v) {
  return v !== undefined && v !== null;
}

interface LinkedNode {
  data: number;
  maxLevel: number;
  nexts: LinkedNode[];
}

const MAX_LEVEL = 16; // 默认最大索引层级为16

export default class SkipList {
  head: LinkedNode; // 头节点，哨兵节点，不存储实际数据
  maxLevel: number; // 索引最大层级
  count: number; // 存在节点个数
  constructor() {
    let emptyNode = [];
    for (let i = 0; i < MAX_LEVEL; i++) {
      emptyNode[i] = null;
    }
    this.count = 0;
    this.maxLevel = 1;
    this.head = { data: null, maxLevel: 0, nexts: emptyNode };
  }

  /* 生成一个随机的层索引数 */
  private randomLevel() {
    return Math.floor(Math.random() * MAX_LEVEL + 1);
  }

  public insert(value: number) {
    // 获取随机索引层
    const newLevel = this.randomLevel();

    // 新节点
    const newNode: LinkedNode = { data: value, maxLevel: newLevel, nexts: [] };
    // 待更新节点
    const updatedNode: LinkedNode[] = [];

    let p = this.head;

    // 从生成的索引层开始查找
    for (let level = newLevel - 1; level >= 0; level--) {
      while (isNotEmpty(p.nexts[level]) && p.nexts[level].data < value) {
        p = p.nexts[level];
      }
      // 跳转下一层之前，记录当前层需要更新的节点
      updatedNode[level] = p;
    }

    // 如果跳表中已经存在value，则不插入
    if (isNotEmpty(p.nexts[0]) && p.nexts[0].data === value) {
      return;
    }

    // 每层插入新的值
    for (let i = 0; i < newLevel; i++) {
      newNode.nexts[i] = updatedNode[i].nexts[i];
      updatedNode[i].nexts[i] = newNode;
    }

    // 更新maxLevel
    if (newLevel > this.maxLevel) {
      this.maxLevel = newLevel;
    }

    // count 值加1
    this.count++;
  }

  public delete(value: number) {
    let p = this.head;
    const updatedNode: LinkedNode[] = [];

    // 从顶层索引开始查找
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (isNotEmpty(p.nexts[level]) && p.nexts[level].data < value) {
        p = p.nexts[level];
      }
      updatedNode[level] = p;
    }

    // 如果找到了，则开始删除
    if (isNotEmpty(p.nexts[0]) && p.nexts[0].data === value) {
      const level = p.nexts[0].maxLevel;
      for (let i = 0; i < level; i++) {
        p.nexts[i] = p.nexts[i].nexts[i];
      }
      // count 值减1
      this.count--;
    }
  }

  public find(value: number) {
    let p = this.head;
    // 从顶层索引开始查找，当level-1时，则表示跳转到下一层的索引中了
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (isNotEmpty(p.nexts[level]) && p.nexts[level].data < value) {
        p = p.nexts[level];
      }
    }
    // 在原始单链表层判断
    if (isNotEmpty(p.nexts[0]) && p.nexts[0].data === value) {
      return p.nexts[0];
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
      msg += 'head';
      while (isNotEmpty(p.nexts[i])) {
        msg += ' ' + padLine(0) + ' ' + p.nexts[i].data;
        p = p.nexts[i];
      }
      msg += padLine(0) + ' ' + 'null\n';
    }
    console.log(msg);
  }
}
