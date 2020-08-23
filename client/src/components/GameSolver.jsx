import React, { Component } from "react";
import "./GameSolver.css";


const GameSolver = (props) => {
  return (props.numberCollection.map((eachNum) => {
    return eachNum.id <= props.slotNum ? (
      <React.Fragment key={eachNum.id}>
        <div className="force-inline fnt-thin flex-grow-1">
          <input className="input-solveNum form-control inputs center-align" type="Number" maxLength="1" id="second" onChange={(e) => props.inputNumHandler(e, eachNum.id)} />
        </div>
        {props.slotNum === 4 && eachNum.id === 2 ? <div id="optional-flex-break"></div> : null}
        {props.slotNum > 4 && eachNum.id === 3 ? <div id="optional-flex-break"></div> : null}
      </React.Fragment>
      // <NumberInputRow
      //   onChange={this.props.inputNumHandler}
      //   value={eachNum.value}
      //   id={eachNum.id}
      //   key={eachNum.id}
      // />
    ) : null;
  }
  ));
}

export default GameSolver;