import React from "react";
import ReturnHomePageButton from "./ReturnHomePageButton";
import GameSolver from "./GameSolver";

const SolvePage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col my-auto">
          <ReturnHomePageButton
            onReturn={props.returnHomePageButtonPress}
          ></ReturnHomePageButton>
        </div>
      </div>
      <div className="row h-50">
        <div className="col text-center my-auto">
          <GameSolver />
        </div>
      </div>
      <div className="row">
      </div>
    </div>
  );
}

export default SolvePage;