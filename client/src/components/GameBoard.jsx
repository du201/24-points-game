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

    let numberLength = this.props.gameNumbers.length;

    //add two parentheses to the available operator list
    let final_operators = [...this.props.operators];
    let leftRightParans = ['(', ')'];

    let resultText = `You have ${this.props.attemptNum} attemps left`;

    let numberBtns = null;
    if (this.props.screenWidth > 1200) {
      numberBtns = <div className="d-flex flex-row flex-wrap justify-content-around w-100 number-margin-top phone-max-width-number" style={{ maxWidth: "1150px" }}>
        {this.props.gameNumbers.map((eachNum, index) => {
          return (<div key={index}>
            <button
              className="btn btn-round-blue"
              onClick={() => {
                this.props.addNumToInput(eachNum, index);
              }}
              disabled={this.props.multiplayerButtonDisable[index] || this.props.submitButtonDisable || this.props.attemptNum === 0}>
              <span>{eachNum}</span>
            </button>
          </div>);
        })}
      </div>;
    } else {
      numberBtns = <div className={"d-flex flex-row flex-wrap justify-content-around w-100 number-margin-top " + (numberLength === 4 ? "phone-max-width-number-4-version" : "phone-max-width-number")} style={{ maxWidth: "1150px" }}>
        {this.props.gameNumbers.map((eachNum, index) => {
          return (<React.Fragment><div key={index}>
            <button
              className="btn btn-round-blue"
              onClick={() => {
                this.props.addNumToInput(eachNum, index);
              }}
              disabled={this.props.multiplayerButtonDisable[index] || this.props.submitButtonDisable || this.props.attemptNum === 0}>
              <span>{eachNum}</span>
            </button>
          </div>
            {(index === 2 && (numberLength === 6 || numberLength === 5)) ? <div className="break"></div> : null}</React.Fragment>);
        })}
      </div>;
    }

    let operateBtns = null;
    if (this.props.screenWidth > 1200) {
      operateBtns = <div className="d-flex flex-wrap flex-row justify-content-around w-100 operator-margin-top phone-max-width-operator" style={{ maxWidth: "1150px" }}>
        {final_operators.map((eachOpe, index) => {
          return (<div key={index}>
            <button
              className="btn btn-operator fnt-medium"
              onClick={() => {
                this.props.addNumToInput(eachOpe);
              }}
              disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
            >{this.findOperatorImage(eachOpe)}</button>
          </div>);
        })}
        {/* <div className="break"></div> */}
        {leftRightParans.map((eachOpe, index) => {
          return (<div key={index}>
            <button
              className="btn btn-operator fnt-medium"
              onClick={() => {
                this.props.addNumToInput(eachOpe);
              }}
              disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
            >{this.findOperatorImage(eachOpe)}</button>
          </div>);
        })}
        <button
          className="btn btn-round-red"
          onClick={this.props.pressNoSolutionButton}
          disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
        >No Solution</button>
      </div>;
    } else {
      operateBtns = <div className="d-flex flex-row flex-wrap justify-content-around w-100 operator-margin-top phone-max-width-operator" style={{ maxWidth: "1150px" }}>
        {final_operators.map((eachOpe, index) => {
          return (<div key={index}>
            <button
              className="btn btn-operator fnt-medium"
              onClick={() => {
                this.props.addNumToInput(eachOpe);
              }}
              disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
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
              disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
            >{this.findOperatorImage(eachOpe)}</button>
          </div>);
        })}
        <button
          className="btn btn-round-red"
          onClick={this.props.pressNoSolutionButton}
          disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}

        >No Solution</button>
      </div>;
    }

    let inputField = null;
    if (this.props.screenWidth > 1200) {
      inputField = <div className="d-flex flex-row justify-content-around submit-margin-top inputfield-max-width">
        <div className="form-group">
          <input id="expression" className="form-control" type="text" value={displayExpression} readOnly />
          <p id="result-text">{resultText}</p>
        </div>
        <button
          id="delete-button"
          className="btn btn-round-blue"
          onClick={() => {
            this.props.pressDeleteInputButton();
          }}
          disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
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
      </div>;
    } else {
      inputField = <div className="d-flex flex-row justify-content-around submit-margin-top inputfield-max-width">
        <div className="form-group">
          <input id="expression" className="form-control" type="text" value={displayExpression} readOnly />
          <p id="result-text">{resultText}</p>
        </div>
        <button
          id="delete-button"
          className="btn btn-round-blue"
          onClick={() => {
            this.props.pressDeleteInputButton();
          }}
          disabled={this.props.submitButtonDisable || this.props.attemptNum === 0}
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
      </div>;
    }

    return (
      <React.Fragment>
        {numberBtns}
        {operateBtns}
        {inputField}
      </React.Fragment>
    );
  }
}

export default GameBoard;
