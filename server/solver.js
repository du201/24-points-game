/** @author Zhengze Gong (harry8698). */
// TODO: Write a summary for this file.

const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";


/** @class Expression represents a mathematical expression. */
class Expression {
  /**
   * Creates an instance of Expression.
   *
   * @constructor
   * @author: Zhengze Gong (harry8698)
   * @param {number} value The value of the expression. Null if the rest of the
   *                       three params are defined
   * @param {Expression} left The left side of an expression. Null if the first
   *                          param is defined
   * @param {string} op The operator of the expression. Null if the first param
                        is defined
   * @param {Expression} right The right side of an expression. Null if the
   *                           first param is defined
   */
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

  /**
   * Indicates if this expression is a single number.
   *
   * @return {boolean} Whether or not this expression is a number
   */
  isNumber() {
    return this.isNumber;
  }

  /**
   * Evaluates this Expression instance and return its value.
   *
   * @return {number} The value of the expression
   */
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

  /**
   * Returns the operator in this expression.
   *
   * @return {string} The operator of the expression. Null if this expression
   *                  is a number
   */
  getOperator() {
    return this.operator;
  }

  /**
   * Multiplies this Expression instance with another instance.
   *
   * @param {Expression} other The multiplier Expression
   * @return {Expression} A new instance of Expression representing the result
   *                      after the multiplication
   */
  times(other) {
    return new Expression(null, this, TIMES, other);
  }

   /**
    * Divides this Expression instance by another instance.
    *
    * @param {Expression} other The divider Expression
    * @return {Expression} A new instance of Expression representing the result
    *                      after the division
    */
  divides(other) {
    return new Expression(null, this, DIVIDES, other);
  }

  /**
   * Adds this Expression instance with another instance.
   *
   * @param {Expression} other The addend Expression
   * @return {Expression} A new instance of Expression representing the result
   *                      after the addition
   */
  plus(other) {
    return new Expression(null, this, PLUS, other);
  }

  /**
   * Subtracts this Expression instance with another instance.
   *
   * @param {Expression} other The subtrahend Expression
   * @return {Expression} A new instance of Expression representing the result
   *                      after the subtraction
   */
  minus(other) {
    return new Expression(null, this, MINUS, other);
  }

  /**
   * Returns the string representation of this Expression instance.
   *
   * @override
   */
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


/**
 * Shallow copies an array into a new array.
 *
 * @param {Array} arr The array to be copied
 * @return {Array} The new array
 */
function arrayCopy(arr) {
  let newArr = [];
  for (let item of arr) {
    newArr.push(item);
  }
  return newArr;
}


/** @class Solver represents a solver for a certain game settings. */
class Solver {
  /**
   * Creates an instance of Solver.
   *
   * @constructor
   * @author: Zhengze Gong (harry8698)
   * @param {object} settings The settings of a game
   */
  constructor(settings) {
    this.answer = null;
    this.operators = settings.availableOperators;
    this.target = settings.targetNumber;
  }

  /**
   * Recursively solves an Expression combination.
   *
   * @param {Expression Array} expList The Expression combination
   */
  solveHelper(expList) {
    // Base case.
    if (expList === null || expList.length === 0) {
      return;
    }
    // Correct answer.
    if (expList.length === 1 &&
        Math.abs(expList[0].getValue() - this.target) < Number.EPSILON) {
      this.answer = expList[0].toString();
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

        if (this.operators.includes(PLUS)) {
          let newExpList = arrayCopy(remainList);
          newExpList.push(x.plus(y));
          this.solveHelper(newExpList);
          if (this.answer !== null) {
            return;
          }
        }

        if (this.operators.includes(MINUS)) {
          let newExpList = arrayCopy(remainList);
          newExpList.push(x.minus(y));
          this.solveHelper(newExpList);
          if (this.answer !== null) {
            return;
          }
          if (x.getValue() !== y.getValue()) {
            newExpList = arrayCopy(remainList);
            newExpList.push(y.minus(x));
            this.solveHelper(newExpList);
            if (this.answer !== null) {
              return;
            }
          }
        }

        if (this.operators.includes(TIMES)) {
          let newExpList = arrayCopy(remainList);
          newExpList.push(x.times(y));
          this.solveHelper(newExpList);
          if (this.answer !== null) {
            return;
          }
        }

        if (this.operators.includes(DIVIDES)) {
          if (y.getValue() !== 0) {
            let newExpList = arrayCopy(remainList);
            newExpList.push(x.divides(y));
            this.solveHelper(newExpList);
            if (this.answer !== null) {
              return;
            }
          }
          if (x.getValue() !== 0 && x.getValue() !== y.getValue()) {
            let newExpList = arrayCopy(remainList);
            newExpList.push(y.divides(x));
            this.solveHelper(newExpList);
            if (this.answer !== null) {
              return;
            }
          }
        }
      }
    }
  }

  /**
   * Solves a number combination.
   *
   * @param {integer Array} combination The number combination
   * @return {string Array} The results of the combination
   */
  solve(combination) {
    let expList = [];
    for (let n of combination) {
      expList.push(new Expression(n));
    }
    this.answer = null;
    this.solveHelper(expList);
    return this.answer;
  }
}

module.exports = Solver;
