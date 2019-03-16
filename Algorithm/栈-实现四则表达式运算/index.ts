/* 题目：用栈来实现四则表达式的运算，比如 1 + 2 * 3，((1 + 2) * 3 + 1) * 2 */

import ArrayStack from '../../DataStructure/Stack/ArrayStack';

const ERROR_MESSAGE = 'invalid expression';
const VALID_EXPRESSION_REG = /^(\d|\.|\(|\)|\+|-|\*|\/|\s)+$/;
// 判断是否操作数
export const isDigit = (c: string) => {
  return /^(\d|\.)$/.test(c);
};
// 判断是否运算符
export const isOperator = (c: string) => {
  return /^(\+|-|\*|\/)$/.test(c);
};
// 判断是否空格
export const isSpace = (c: string) => {
  return /\s/.test(c);
};
// 判断是否左括号
export const isLeftParenthesis = (c: string) => {
  return c === '(';
};
// 判断是否右括号
export const isRightParenthesis = (c: string) => {
  return c === ')';
};

// 获取优先级
export const getOperatorPriority = (operator: string): number => {
  let priority: number = 0;
  switch (operator) {
    case '+':
      priority = 1;
      break;
    case '-':
      priority = 1;
      break;
    case '*':
      priority = 2;
      break;
    case '/':
      priority = 2;
      break;
    default:
      priority = 0;
  }
  return priority;
};

// 进行计算
export const compute = (leftOperand: number, rightOperand: number, operator: string) => {
  if (leftOperand == null || rightOperand == null) {
    throw new Error(ERROR_MESSAGE);
  }
  let result: number = 0;
  switch (operator) {
    case '+':
      result = leftOperand + rightOperand;
      break;
    case '-':
      result = leftOperand - rightOperand;
      break;
    case '*':
      result = leftOperand * rightOperand;
      break;
    case '/':
      if (rightOperand === 0) {
        result = Infinity;
      } else {
        result = leftOperand / rightOperand;
      }
      break;
    default:
      throw new Error(ERROR_MESSAGE);
  }
  return result;
};

/**
 * 实现四则表达式运算,支持括号,支持小数
 * 思路：1. 顺序遍历表达式，表达式字符只可能包含的字符是：数字零到九，点，加减乘除，左右括号，和空格
 *      2. 如果是数字，则压入操作数栈，
 *      3. 如果是运算符a，则与运算符栈顶运算符b比较优先级，
 *      4. 如果 a < b，则从操作数栈弹出2个元素，运算符栈弹出1个元素，通过计算，将得到的结果继续压入操作数栈，再类似继续比较a与当前运算符栈顶元素优先级
 *      4. 否则 a >= b，则将运算符加入栈
 *      5. 如果是坐括号，则优先级加1，如果是右括号，则优先级减1
 *      5. 遍历表达式完成了，则从运算符栈顶取出一个元素，从操作数栈取出2个元素，通过计算，将得到的结果压入操作数栈，依次进行这样的操作直到运算符栈空
 *      6. 那么，操作数中栈元素就是最后的结果
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * @param {string} expression 初始表达式
 * @returns {number} 运算结果
 */
export function fourExpressionArithmetic(expression: string): number {
  interface OperatorStackItem {
    operator: string;
    priority: number;
  }
  let operatorStack = new ArrayStack<OperatorStackItem>(); // 运算符栈
  let operandStack = new ArrayStack<number>(); // 操作数
  let priority: number = 0; // 默认优先级

  if (!VALID_EXPRESSION_REG.test(expression)) {
    throw new Error(ERROR_MESSAGE);
  }

  let anchor = 0; // 数字起始锚点
  let cursor = 0; // 当前下标
  let count = 0; // 已经遍历过的个数
  let len = expression.length;
  let character, word;
  while (count < len) {
    count = count + 1;
    cursor = count - 1;
    character = expression[cursor];
    if (isSpace(character)) {
      // 如果遇到空格，则跳过，继续
      continue;
    }
    if (isDigit(character)) {
      if (cursor === 0 || !isDigit(expression[cursor - 1])) {
        anchor = cursor;
      }
      if (cursor < len - 1 && isDigit(expression[cursor + 1])) {
        // 如果下一个字符还是数字，则跳过，继续
        continue;
      } else {
        // 否则，获取操作数，并压入栈
        word = expression.slice(anchor, cursor + 1);
        operandStack.push(Number(word));
      }
      continue;
    }
    if (isOperator(character)) {
      // 如果是操作符，
      // 先获取当前运算符优先级
      let currentPriority = getOperatorPriority(character) + priority;
      // 与运算符栈顶比较
      let lastOperator: OperatorStackItem = null;
      while ((lastOperator = operatorStack.getCurrentItem()) && currentPriority < lastOperator.priority) {
        // 如果，比栈顶优先级低，则进行运算
        let rightOperand = operandStack.pop(); // 右操作后进先出
        let leftOperand = operandStack.pop(); // 左操作数先进后出
        if (leftOperand == null || rightOperand == null) {
          // 操作数为空了，说明表达式非法
          throw new Error(ERROR_MESSAGE);
        }
        let operator = operatorStack.pop().operator;
        let result = compute(leftOperand, rightOperand, operator);
        operandStack.push(result);
      }
      operatorStack.push({ operator: character, priority: currentPriority });
    }
    if (isLeftParenthesis(character)) {
      // 如果，是左括号，优先级加10
      priority = priority + 10;
      continue;
    }
    if (isRightParenthesis(character)) {
      // 如果，是右括号，优先级减10
      priority = priority - 10;
      // 如果优先级小于0了，则说明右括号多了，表达式非法
      if (priority < 0) {
        throw new Error(ERROR_MESSAGE);
      }
      continue;
    }
  }

  // 表达式遍历完成，开始计算，直到运算符栈为空
  let lastItem: OperatorStackItem = null;
  while ((lastItem = operatorStack.pop())) {
    let rightOperand = operandStack.pop(); // 右操作后进先出
    let leftOperand = operandStack.pop(); // 左操作数先进后出
    if (leftOperand == null || rightOperand == null) {
      // 操作数为空了，说明表达式非法
      throw new Error(ERROR_MESSAGE);
    }
    let result = compute(leftOperand, rightOperand, lastItem.operator);
    operandStack.push(result);
  }

  if (priority !== 0) {
    // 如果优先级最后不等于0，则说明左右括号不对称，
    throw new Error(ERROR_MESSAGE);
  }

  // 最后，操作数栈只有一个元素，则运算符栈为空
  if (operandStack.getStackCount() === 1 && operatorStack.getStackCount() === 0) {
    const result = operandStack.getCurrentItem();
    if (!Number.isNaN(result)) {
      return result;
    }
  }

  throw new Error(ERROR_MESSAGE);
}
