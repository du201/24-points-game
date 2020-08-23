import React from 'react';
const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
let operators = [TIMES, DIVIDES, PLUS, MINUS];
let target = 24;
let answers = new Set();

class Expression {
  constructor(value, left, op, right) {
    if (value !== null && left === undefined &&
      op === undefined && right === undefined) {
      this.isNumber = true;
      this.value = value;
      this.left = null;
      this.right = null;
      this.operator = null;
    } else if (value === null && left !== undefined &&
      op !== undefined && right !== undefined) {
      this.isNumber = false;
      this.value = null;
      this.left = left;
      this.right = right;
      this.operator = op;
    }
  }

  isNumber() {
    return this.isNumber;
  }

  getValue() {
    if (this.isNumber) {
      return this.value;
    } else {
      if (this.operator === TIMES) {
        return this.left.getValue() * this.right.getValue();
      }
      if (this.operator === DIVIDES) {
        return this.left.getValue() / this.right.getValue();
      }
      if (this.operator === PLUS) {
        return this.left.getValue() + this.right.getValue();
      }
      if (this.operator === MINUS) {
        return this.left.getValue() - this.right.getValue();
      }
    }
  }

  getOperator() {
    return this.operator;
  }

  times(other) {
    return new Expression(null, this, TIMES, other);
  }

  divides(other) {
    return new Expression(null, this, DIVIDES, other);
  }

  plus(other) {
    return new Expression(null, this, PLUS, other);
  }

  minus(other) {
    return new Expression(null, this, MINUS, other);
  }

  toString() {
    if (this.isNumber) {
      return this.value.toString();
    } else {
      let left = this.left.toString();
      let right = this.right.toString();

      if (this.operator === TIMES || this.operator === DIVIDES) {
        if (this.left.operator === PLUS || this.left.operator === MINUS) {
          left = "(" + left + ")";
        }
        if (this.right.operator === PLUS || this.right.operator === MINUS) {
          right = "(" + right + ")";
        }
      }
      if (this.operator === DIVIDES) {
        if (this.right.operator === TIMES || this.right.operator === DIVIDES) {
          right = "(" + right + ")";
        }
      }
      if (this.operator === MINUS) {
        if (this.right.operator === PLUS || this.right.operator === MINUS) {
          right = "(" + right + ")";
        }
      }
      return left + this.operator + right;
    }
  }
}

function arrayCopy(x) {
  let y = [];
  for (let item of x) {
    y.push(item);
  }
  return y;
}

function solve(expList) {
  if (expList === null || expList.length === 0) {
    return;
  }
  if (expList.length === 1 &&
    Math.abs(expList[0].getValue() - target) < Number.EPSILON) {
    answers.add(expList[0].toString());
    return;
  }

  for (let i = 0; i < expList.length; i++) {
    for (let j = i + 1; j < expList.length; j++) {
      let x = expList[i];
      let y = expList[j];
      let remainList = [];

      for (let k = 0; k < expList.length; k++) {
        if (k !== i && k !== j) {
          remainList.push(expList[k]);
        }
      }

      if (operators.includes(PLUS)) {
        let newExpList = arrayCopy(remainList);
        newExpList.push(x.plus(y));
        solve(newExpList);
      }

      if (operators.includes(MINUS)) {
        let newExpList = arrayCopy(remainList);
        newExpList.push(x.minus(y));
        solve(newExpList);
        if (x.getValue() !== y.getValue()) {
          newExpList = arrayCopy(remainList);
          newExpList.push(y.minus(x));
          solve(newExpList);
        }
      }

      if (operators.includes(TIMES)) {
        let newExpList = arrayCopy(remainList);
        newExpList.push(x.times(y));
        solve(newExpList);
      }

      if (operators.includes(DIVIDES)) {
        if (y.getValue() !== 0) {
          let newExpList = arrayCopy(remainList);
          newExpList.push(x.divides(y));
          solve(newExpList);
        }
        if (x.getValue() !== 0 && x.getValue() !== y.getValue()) {
          let newExpList = arrayCopy(remainList);
          newExpList.push(y.divides(x));
          solve(newExpList);
        }
      }
    }
  }
}

function printResults() {
  let result = "";
  for (let x of answers) {
    result += <section>{x}</section>;
  }

  let size = answers.size;

  if (size === 0) {
    return <p>There are no answers{result}</p>;
  } else if (size === 1) {
    return <p>There is 1 answer</p>;
  } else {
    return <p>There are {answers.size} answers</p>;
  }
}

/**
 * 
 * @param {int} numOfSlots 
 * @param {array of int} inputNums 
 */
function run(numOfSlots, inputNums) {
  let numbers = [];
  answers.clear();
  for (let i = 0; i < numOfSlots; i++) {
    let value = parseInt(inputNums[i], 10);
    numbers.push(value);
  }

  let expList = [];
  for (let n of numbers) {
    expList.push(new Expression(n));
  }
  solve(expList);
  return printResults();
}

export default run;
