import React from "react";
import ReturnHomePageButton from "./common/ReturnHomePageButton";
import ScoresRank from "./ScoresRank";

const SummaryPage = (props) => {

  return (
    <div className="container h-100">
      <div className="row h-25">
        <div className="col text-center my-auto">
          <ReturnHomePageButton
            onReturn={props.pressReturnHomePageButton}
          ></ReturnHomePageButton>
          <h1>Game Summary</h1>
        </div>
      </div>
      <div className="row h-75">
        <div className="col-4 h-100 overflow-auto text-center">
          <h3>Player Scores (All the Players)</h3>
          <ScoresRank
            scoreRanking={props.scoreRanking}
          ></ScoresRank>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;