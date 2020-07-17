import React, { Component } from "react";
import "./GameBoard.css";

/**
 * The place where the game UI exists
 */
class GameBoard extends Component {

  render() {
    let displayExpression = "";
    //Add space between each char
    this.props.expressionInput.map((num) => {
      displayExpression += num + " ";
      return num;
    });

    //add two parentheses to the available operator list
    let final_operators = [...this.props.operators];
    final_operators.push('(');
    final_operators.push(')');
    return (
      <React.Fragment>
        <div className="row h-25">
          {this.props.gameNumbers.map((eachNum, index) => {
            return (<div key={index} className="col text-center my-auto">
              <button
                className="btn btn-primary btn-lg w-75"
                value={eachNum}
                onClick={() => {
                  this.props.on_addToInput(eachNum, index);
                }}
                disabled={this.props.multiplayerButtonDisable[index]}><h1>{eachNum}</h1></button>
            </div>);
          })}
        </div>
        <div className="row h-25">
          <div className="col-8 my-col my-auto">
            <h1>{displayExpression}</h1>
          </div>
          <div className="col my-col my-auto text-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                this.props.on_deleteInput();
              }}
            ><h1>DEL</h1></button>
          </div>
          <div className="col my-col my-auto text-center">
            <h1>{"=" + this.props.targetNum}</h1>
          </div>
        </div>
        <div className="row h-25">
          {final_operators.map((eachOpe, index) => {
            return (<div key={index} className="col text-center my-auto">
              <button
                className="btn btn-info btn-lg w-75"
                value={eachOpe}
                onClick={() => {
                  this.props.on_addToInput(eachOpe);
                }}
              ><h1>{eachOpe}</h1></button>
            </div>);
          })}
        </div>
        <div className="row h-25">
          <div className="col col-4 text-center my-auto">
            <button
              className="btn btn-success btn-lg w-75"
              onClick={this.props.on_calculateExpression}
            ><h1>=</h1></button>
          </div>
          <div className="col col-8 text-center my-auto">
            <h1>Answer: {this.props.answer}</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GameBoard;
