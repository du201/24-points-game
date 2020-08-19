import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

/**
 * The place where the game UI exists
 */
class GameBoard extends Component {
  state = {
    submitButtonRest: false
  };

  disableSubmitButtonTemp = () => {
    this.setState({ submitButtonRest: true });
    setTimeout(() => this.setState({ submitButtonRest: false }), 2000);
  }

  answerCorrectText = () => {
    if (this.props.answerCorrect === true) {
      return <p>{this.props.answer} is Correct! Congrats.</p>;
    } else if (this.props.answerCorrect === false) {
      return <p>{this.props.answer} is Incorrect! You have {this.props.attemptNum} attemps left.</p>;
    }
    return null; //in the case of undefined
  }

  findOperatorImage = (ope) => {
    if (ope === '×') {
      return <img src='multiplySign.png' alt='time' />;
    } else if (ope === '-') {
      return <img src='subtractSign.png' alt='subtract' />;
    } else if (ope === '+') {
      return <img src='addSign.png' alt='add' />;
    } else if (ope === '÷') {
      return <img src='divideSign.png' alt='divide' />;
    } else if (ope === '(') {
      return <span className="grey-text parans">(</span>;
      // return <img src='divideSign.png' alt='leftParan' />;
    } else if (ope === ')') {
      return <span className="grey-text parans">)</span>;
    }
  }


  render() {
    let displayExpression = "";
    //Add space between each char
    this.props.expressionInput.map((num) => {
      displayExpression += num + " ";
      return num;
    });

    //add two parentheses to the available operator list
    let final_operators = [...this.props.operators];
    let leftRightParans = ['(', ')'];
    return (
      <React.Fragment>
        <div className="d-flex flex-row" style={{ marginTop: "5rem" }}>
          {this.props.gameNumbers.map((eachNum, index) => {
            return (<div key={index}>
              <button
                className="btn btn-round-blue"
                onClick={() => {
                  this.props.addNumToInput(eachNum, index);
                }}
                disabled={this.props.multiplayerButtonDisable[index] || this.props.submitButtonDisable}>
                <span>{eachNum}</span>
              </button>
            </div>);
          })}
        </div>
        <div className="d-flex flex-wrap flex-row justify-content-around" style={{ marginTop: "5rem" }}>
          {final_operators.map((eachOpe, index) => {
            return (<div key={index}>
              <button
                className="btn btn-operator fnt-medium"
                onClick={() => {
                  this.props.addNumToInput(eachOpe);
                }}
                disabled={this.props.submitButtonDisable}
              >{this.findOperatorImage(eachOpe)}</button>
            </div>);
          })}
          <div className="break"></div>
          {leftRightParans.map((eachOpe, index) => {
            return (<div key={index}>
              <button
                className="btn btn-operator fnt-medium"
                onClick={() => {
                  this.props.addNumToInput(eachOpe);
                }}
                disabled={this.props.submitButtonDisable}
              >{this.findOperatorImage(eachOpe)}</button>
            </div>);
          })}
          <button
            className="btn btn-round-red"
            onClick={this.props.pressNoSolutionButton}
            disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
          >No Solution</button>
        </div>

        <div className="d-flex flex-wrap flex-row justify-content-around" style={{ marginTop: "5rem" }}>
          <div className="form-group">
            <input id="expression" className="form-control" type="text" value={displayExpression} />
            <p id="result-text">23 is Incorrect! You have 2 attemps left</p>
          </div>
          <button
            id="delete-button"
            className="btn btn-round-blue"
            onClick={() => {
              this.props.pressDeleteInputButton();
            }}
            disabled={this.props.submitButtonDisable}
          ><FontAwesomeIcon icon={faBackspace} size="1x" /></button>
          <div className="break"></div>
          <button
            className="btn btn-round-green"
            onClick={() => {
              this.disableSubmitButtonTemp()
              this.props.pressCalculateResultButton()
            }}
            disabled={this.state.submitButtonRest || this.props.submitButtonDisable || this.props.attemptNum === 0}
          >Submit</button>
        </div>
      </React.Fragment >
    );
  }
}

export default GameBoard;
