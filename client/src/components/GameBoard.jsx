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
              disabled={this.props.submitButtonDisable}
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
                disabled={this.props.submitButtonDisable}
              ><h1>{eachOpe}</h1></button>
            </div>);
          })}
        </div>
        <div className="row h-25">
          <div className="col col-4 text-center h-100">
            <button
              className="btn btn-success btn-lg w-75"
              onClick={this.props.on_calculateExpression}
              disabled={this.props.submitButtonDisable}
            ><h1>Submit</h1></button>
            <button
              className="btn btn-warning btn-lg w-75 mt-2"
              onClick={this.props.on_noSolution}
              disabled={this.props.submitButtonDisable}
            ><h4>No Solution</h4></button>
          </div>
          <div className="col col-8 text-center h-100">
            <h4>(Client side check and calcualte) Answer: <br></br>{this.props.answer}</h4>
            <h4>(Server side check and calcualte) Server Response Would Appear Below...</h4>
            <h4>{this.props.correctOrNotText}</h4>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GameBoard;
