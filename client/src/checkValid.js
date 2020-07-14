import { isOperator } from "./calculate.js";
/**
 * 
 * @param {array of string} infix the inputed expression from the user
 * @returns {bool} whether or not the inputed infix expression is a valid algebra expression 
 */

function checkValid(infix) {
  let operandNum = 0;
  let operatorNum = 0;
  let leftParamNum = 0;
  let rightParamNum = 0;
  infix.map((char) => {
    //check the non-param part of the equation
    if (isOperator(char) === true) {
      operatorNum++;
    } else if (char === '(') {
      leftParamNum++;
    } else if (char === ')') {
      rightParamNum++;
    } else {
      operandNum++;
    }
  });

  //check for the parenthesis
  if (operandNum - 1 !== operatorNum || leftParamNum !== rightParamNum) {
    return false;
  } else {
    return true;
  }
}

export default checkValid;