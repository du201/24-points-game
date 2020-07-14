let operatorStack = [];
let operandStack = [];
let postfixStack = [];
const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
const LEFT_PAREN = "(";
const RIGHT_PAREN = ")";

/**
 * return the precedence of the inputed operator
 * @param {string} operator 
 */

function precedenceCheck(operator) {
  switch (operator) {
    case PLUS:
    case MINUS: return 1;
    case TIMES:
    case DIVIDES: return 2;
    case LEFT_PAREN:
    case RIGHT_PAREN: return 0;
  }
}


/**
 * 
 * @param {array of string} infix an array of string contains a valid infix expression
 * @returns {int} the calculated answer of the inputed string
 */
function calculate(infix) {
  let postfix = infixToPostfix(infix);
  console.log(postfix);
  let result = computePostfix(postfix);
  return result;
}

/**
 * From now on, the inputed infix expression is always valid, the validity check is done by RegEx
 * @param {array of string} infix an array of string contains a valid infix expression
 * @returns {array of string} an array of string contains the postfix expression 
 */
function infixToPostfix(infix) {
  operatorStack = [];
  operandStack = [];
  postfixStack = [];
  infix.forEach((current) => {
    if (isOperator(current)) {
      console.log("found");
      operatorStack.push(current);
      //check the previous operators in the operatorStack
      //if no previous operator, push the current onto the stack
      //if has previous operators, check precedence
      //->if the previous has equal or higher precedence, pop the previous one and move it to the operandStack
      //-->once poped, keep checking the previous one
      //->if the previous one has lower precedence, keep the previous one
      if (operatorStack.length > 1) {
        while (operatorStack.length > 1 && precedenceCheck(operatorStack[operatorStack.length - 2]) >= precedenceCheck(operatorStack[operatorStack.length - 1])) {
          let removedOperator = operatorStack[operatorStack.length - 2];
          operandStack.push(removedOperator);
          operatorStack.splice(operatorStack.length - 2, 1);
        }
      }

    } else if (isParenthesis(current)) {
      //if it's left parentheses, just add to the operator stack
      if (current === LEFT_PAREN) {
        operatorStack.push(current);
      } else {
        //if it's right parentheses, find its corresponding left counterpart and move 
        //all the operators in between to the operand stack
        for (let i = operatorStack.length - 1; i >= 0; i--) {
          if (operatorStack[i] === LEFT_PAREN) { //find the corresponding left parentheses
            operatorStack.splice(i, 1);
            break;
          } else {
            let removedOperator = operatorStack[i];
            operandStack.push(removedOperator);
            operatorStack.splice(i, 1);
          }
        }
      }

    } else {
      operandStack.push(current);
    }
  });

  //if there still are operators in the stack, move them to the operand stack
  if (operatorStack.length !== 0) {
    for (let i = operatorStack.length - 1; i >= 0; i--) {
      operandStack.push(operatorStack[i]);
    }
  }
  return operandStack;
}



function isParenthesis(toCheck) {
  switch (toCheck) {
    case LEFT_PAREN:
    case RIGHT_PAREN:
      return true;
    default:
      return false;
  }
}




//calculate the postfix

function stringToArray(string) {
  return string.split('');
}

/**
 * 
 * @param {array of string} postfix an array of string which is the postfix expression
 * @returns {number} the computed result of the inputed postfix expression 
 */
function computePostfix(postfix) {
  operatorStack = [];
  operandStack = [];
  postfixStack = [];
  let wrongPostfix = false;
  for (let current of postfix) {
    console.log(postfixStack);
    if (isOperator(current)) {
      let operandRight = postfixStack.pop();
      let operandLeft = postfixStack.pop();
      if (operandRight === undefined || operandLeft === undefined) {
        return "Invalid";
      }
      let computedNum = compute(operandLeft, charToOperator(current), operandRight);
      postfixStack.push(computedNum);
    } else {
      postfixStack.push(parseInt(current, 10));
    }
  }
  return postfixStack[0];
}

/**
 * Check whether or not the input is an operator
 * @param {string} toCheck the character to be checked againest 
 */
function isOperator(toCheck) {
  switch (toCheck) {
    case PLUS:
    case MINUS:
    case TIMES:
    case DIVIDES:
      return true;
    default:
      return false;
  }
}

/**
 * compute the result of an operation
 * @param {number} a the left operand 
 * @param {function} operator the operator function
 * @param {number} b the right operand
 * @return {number} the computed result
 */
function compute(a, operator, b) {
  return operator(a, b);
}

/**
 * 
 * @param {string} char the char to be converted into its corresponding function 
 */
function charToOperator(char) {
  switch (char) {
    case PLUS: return plus;
    case MINUS: return minus;
    case TIMES: return multiply;
    case DIVIDES: return divide;
  }
}

function plus(a, b) { return a + b; }
function minus(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

export default calculate;
export { isOperator };