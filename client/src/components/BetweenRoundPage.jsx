import React from "react";
import SolutionsRank from "./SolutionsRank";
import ScoresRank from "./ScoresRank";

const BetweenRoundPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-25">
        <div className="col my-auto text-center">
          <h1>Round {props.whichRound}</h1>
          <h1>Result</h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col my-auto text-center">
          <h1>System Solution (random one)</h1>
          <h1>{props.solution}</h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col h-100 text-center overflow-auto">
          <h1>Player Solutions (the top three)</h1>
          <SolutionsRank
            playerSolutions={props.playerSolutions}></SolutionsRank>
        </div>
      </div>
      <div className="row h-25">
        <div className="col-4 my-auto text-center">
          <h1>The Next Round Will Start In</h1>
          <h1>{props.timeInGame}s</h1>
        </div>
        <div className="col-4 h-100 overflow-auto text-center">
          <h3>Your Ranking in the Room is</h3>
          <h3>number {props.playerRanking}</h3>
        </div>
        <div className="col-4 h-100 overflow-auto text-center">
          <h3>Player Scores (the top three)</h3>
          <ScoresRank
            scoreRanking={props.scoreRanking}></ScoresRank>
        </div>
      </div>
    </div>
  );
}

export default BetweenRoundPage;