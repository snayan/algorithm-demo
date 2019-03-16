import { isDigit, isOperator, isSpace, isLeftParenthesis, isRightParenthesis, getOperatorPriority, compute, fourExpressionArithmetic } from '.';

const createRandom = (min, max) => {
  let r = Math.random();
  return r * (max - min) + min;
};

describe('测试辅助函数', () => {
  it('数字检查', () => {
    const cases: [string, boolean][] = [['', false], ['a', false], ['1', true], ['.', true]];
    cases.forEach(([val, result]) => {
      expect(isDigit(val)).toBe(result);
    });
  });

  it('操作数检测', () => {
    const cases: [string, boolean][] = [['', false], ['a', false], ['1', false], ['+', true], ['-', true], ['*', true], ['/', true], ['aa', false], ['+a', false], ['+-', false]];
    cases.forEach(([val, result]) => {
      expect(isOperator(val)).toBe(result);
    });
  });

  it('空格检测', () => {
    const cases: [string, boolean][] = [['', false], ['1', false], ['a', false], ['.', false], [' ', true]];
    cases.forEach(([val, result]) => {
      expect(isSpace(val)).toBe(result);
    });
  });

  it('左括号检测', () => {
    const cases: [string, boolean][] = [['', false], ['1', false], ['a', false], [' ', false], ['[', false], ['{', false], [')', false], ['(', true]];
    cases.forEach(([val, result]) => {
      expect(isLeftParenthesis(val)).toBe(result);
    });
  });

  it('右括号检测', () => {
    const cases: [string, boolean][] = [['', false], ['1', false], ['a', false], [' ', false], ['[', false], ['{', false], ['(', false], [')', true]];
    cases.forEach(([val, result]) => {
      expect(isRightParenthesis(val)).toBe(result);
    });
  });

  it('优先级权重检测', () => {
    const cases: [string, number][] = [['', 0], [' ', 0], ['1', 0], ['a', 0], ['+', 1], ['-', 1], ['*', 2], ['/', 2]];
    cases.forEach(([val, result]) => {
      expect(getOperatorPriority(val)).toBe(result);
    });
  });

  it('运算结果检测', () => {
    const count = 1000;
    expect(() => {
      compute(null, 1, '+');
    }).toThrow();
    expect(() => {
      compute(1, null, '-');
    }).toThrow();
    expect(() => {
      compute(1, 1, 'a');
    }).toThrow();
    for (let i = 0; i < count; i++) {
      let left = createRandom(-10000, 10000);
      let right = createRandom(-10000, 10000);
      expect(compute(left, right, '+')).toBe(left + right);
      expect(compute(right, left, '+')).toBe(right + left);
      expect(compute(left, right, '-')).toBe(left - right);
      expect(compute(right, left, '-')).toBe(right - left);
      expect(compute(left, right, '*')).toBe(left * right);
      expect(compute(right, left, '*')).toBe(right * left);
      if (right === 0) {
        expect(compute(left, right, '/')).toBe(Infinity);
      } else {
        expect(compute(left, right, '/')).toBe(left / right);
      }
      if (left === 0) {
        expect(compute(right, left, '/')).toBe(Infinity);
      } else {
        expect(compute(right, left, '/')).toBe(right / left);
      }
    }
  });
});

describe('检测四则运算', () => {
  it('非法运算表达式', () => {
    const express = ['a', '.', '(', ')', '1+', '1+a', '1*', '/1', '*1', '1+2-', '1*2+', '(1)+'];
    express.forEach((e) => {
      expect(() => {
        fourExpressionArithmetic(e);
      }).toThrow();
    });
  });
  it('基础运算表达式', () => {
    let express = '1+2';
    expect(fourExpressionArithmetic(express)).toBe(1 + 2);
    express = '2+1';
    expect(fourExpressionArithmetic(express)).toBe(2 + 1);
    express = '1-2';
    expect(fourExpressionArithmetic(express)).toBe(1 - 2);
    express = '2-1';
    expect(fourExpressionArithmetic(express)).toBe(2 - 1);
    express = '1*2';
    expect(fourExpressionArithmetic(express)).toBe(1 * 2);
    express = '2*1';
    expect(fourExpressionArithmetic(express)).toBe(2 * 1);
    express = '1/2';
    expect(fourExpressionArithmetic(express)).toBe(1 / 2);
    express = '2/1';
    expect(fourExpressionArithmetic(express)).toBe(2 / 1);
    express = '1/0';
    expect(fourExpressionArithmetic(express)).toBe(1 / 0);
  });
  it('随机数运算表达式', () => {
    const count = 1;
    for (let i = 0; i < count; i++) {
      let left = createRandom(0, 10000);
      let right = createRandom(0, 10000);
      expect(fourExpressionArithmetic(`${left}+${right}`)).toBe(left + right);
      expect(fourExpressionArithmetic(`${right}+${left}`)).toBe(right + left);
      expect(fourExpressionArithmetic(`${left}-${right}`)).toBe(left - right);
      expect(fourExpressionArithmetic(`${right}-${left}`)).toBe(right - left);
      expect(fourExpressionArithmetic(`${left}*${right}`)).toBe(left * right);
      expect(fourExpressionArithmetic(`${right}*${left}`)).toBe(right * left);
      if (right === 0) {
        expect(fourExpressionArithmetic(`${left}/${right}`)).toBe(Infinity);
      } else {
        expect(fourExpressionArithmetic(`${left}/${right}`)).toBe(left / right);
      }
      if (left === 0) {
        expect(fourExpressionArithmetic(`${right}/${left}`)).toBe(Infinity);
      } else {
        expect(fourExpressionArithmetic(`${right}/${left}`)).toBe(right / left);
      }
    }
  });
  it('综合运算表达式', () => {
    let express = ['(1+2)*3', '1+2*3', '(1.1+1.2)*1.3', '1.1+1.2*1.3', '(((1+2)*5)+3)*4+5'];
    express.forEach((e) => {
      expect(fourExpressionArithmetic(e)).toBe(eval(e));
    });
  });
});
