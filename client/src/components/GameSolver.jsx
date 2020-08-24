import React, { useEffect } from "react";
import "./GameSolver.css";
// import $ from "jquery";

const GameSolver = (props) => {

  //don't accept negative number for now
  // useEffect(() => {
  //   $(".input-solveNum").on("keyup", function () {
  //     $(this).val($(this).val().replace(/[^0-9]/g, ''));
  //   })
  // }, []);


  return (props.numberCollection.map((eachNum) => {
    return eachNum.id <= props.slotNum ? (
      <React.Fragment key={eachNum.id}>
        <div className="force-inline fnt-thin flex-grow-1">
          <input className="input-solveNum form-control inputs center-align" type="Number" maxLength="1" onChange={(e) => props.inputNumHandler(e, eachNum.id)} value={eachNum.value === "empty" ? '' : eachNum.value} />
        </div>
        {props.slotNum === 4 && eachNum.id === 2 ? <div id="optional-flex-break"></div> : null}
        {props.slotNum > 4 && eachNum.id === 3 ? <div id="optional-flex-break"></div> : null}
      </React.Fragment>
    ) : null;
  }
  ));
}

export default GameSolver;