import { isOperator } from "./calculate.js";
/**
 * 
 * @param {array of string} infix the inputed expression from the user
 * @returns {bool} whether or not the inputed infix expression is a valid algebra expression 
 */

function checkValid(infix) {
  if (!opeNumCheck(infix)) {
    return false;
  }

  //at this stage, the number of the left and right parentheses are guaranteed to be the same 
  let paramPairIndex = [];
  if (!paramPairFinder(infix, paramPairIndex)) {
    return false;
  }

  for (let i = 0; i < paramPairIndex.length; i += 2) {
    if (!parenRecursiveCheck(infix, paramPairIndex[i], paramPairIndex[i + 1])) {
      return false;
    }
  }

  return true;

}

function paramPairFinder(infix, paramPairIndex) {
  let leftParamStack = [];
  let paramBalanceCount = 0;
  for (let i = 0; i < infix.length; i++) {
    if (infix[i] === '(') {
      leftParamStack.push(i);
      paramBalanceCount++;
    } else if (infix[i] === ')') {
      paramPairIndex.push(leftParamStack.pop());
      paramPairIndex.push(i);
      paramBalanceCount--;
      //If there is a right param that doesn't have a left param in front of it
      if (paramBalanceCount < 0) {
        return false;
      }
    }
  }
  return true;
}

/**
 * This function checks the expression inside every pair of parenthesis to
 * make sure that all of them are valid expression
 * @param {array of string} infix the expression to be checked on
 * @returns whether or not the infix is a valid expression
 */
function parenRecursiveCheck(infix, leftParamIndex, rightParamIndex) {
  let innerArr = [];
  for (let i = leftParamIndex + 1; i < rightParamIndex; i++) {
    innerArr.push(infix[i]);
  }

  return opeNumCheck(innerArr);
}

/**
 * This makes sure that the number of operators, operands, and parentheses in the expression
 * are valid and make sense
 * @param {array of string} infix the expression to be checked on
 * @returns whether or not the infix is a valid expression
 */
function opeNumCheck(infix) {
  let operandNum = 0;
  let operatorNum = 0;
  let leftParamNum = 0;
  let rightParamNum = 0;
  infix.map((char) => {
    if (isOperator(char) === true) {
      operatorNum++;
    } else if (char === '(') {
      leftParamNum++;
    } else if (char === ')') {
      rightParamNum++;
    } else {
      operandNum++;
    }
    return char;
  });

  //make sure that a number is not followed immediately by another number i.e. 4 4 +
  for (let i = 1; i < infix.length; i++) {
    if (!isOperator(infix[i]) && infix[i] !== '(' && infix[i] !== ')') {
      if (!isOperator(infix[i - 1]) && infix[i - 1] !== '(' && infix[i - 1] !== ')') {
        return false;
      }
    }
  }

  //check for the number parenthesis, operator, and operand
  if (operandNum - 1 !== operatorNum || leftParamNum !== rightParamNum) {
    return false;
  }
  return true;
}

export default checkValid;