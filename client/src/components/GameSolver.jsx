import React, { Component } from "react";
import NumberInputRow from "./NumberInputRow.jsx";
import run from "../game.js";
import "./GameSolver.css";

class GameSolver extends Component {
  state = {
    numberNum: 4,
    numberCollection: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
      { id: 6, value: 0 },
    ],
  };

  sliderChangeHandler = (event) => {
    this.setState({ numberNum: event.target.value });
  };

  inputNumHandler = (event, index) => {
    let numberCollectionCopy = [...this.state.numberCollection];
    numberCollectionCopy[index - 1] = {
      ...this.state.numberCollection[index - 1],
    };
    const numNewValue = event.target.value;
    numberCollectionCopy[index - 1].value = parseInt(numNewValue, 10);
    //console.log(numberCollectionCopy);
    //console.log(this.state.numberCollection);
    this.setState({ numberCollection: numberCollectionCopy });
  };

  render() {
    return (
      <React.Fragment className="wrapper">
        <div className="solverInputSection">
          <div>
            Number of slotsss: {this.state.numberNum}
            <br></br>
            <input
              type="range"
              min="2"
              max="6"
              value={this.state.numberNum}
              id="slots"
              onChange={this.sliderChangeHandler}
            ></input>
          </div>
          <form id="form">
            {this.state.numberCollection.map((eachNum) => {
              return eachNum.id <= this.state.numberNum ? (
                <NumberInputRow
                  onChange={this.inputNumHandler}
                  value={eachNum.value}
                  id={eachNum.id}
                  key={eachNum.id}
                />
              ) : null;
            })}
          </form>

          <button
            className="btn btn-primary mt-2"
            type="button"
            name="button"
            onClick={() => {
              run(this.state.numberNum);
            }}
          >
            Calculate
          </button>
        </div>
        <div className="solverOutputSection">
          <section id="count"></section>
          <section id="answers" className="scrollTextBox"></section>
        </div>
      </React.Fragment>
    );
  }
}

export default GameSolver;
