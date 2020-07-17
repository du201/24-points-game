import React from "react";

/**
 * 
 * Display the player solution ranks (three) between rounds
 */
const ScoresRank = (props) => {
  return (
    <React.Fragment>
      {props.playerScores.map((pair, index) => {
        return <div className="card bg-info mb-1" key={index}>
          <div className="card-body">
            <div>{pair.name}</div>
            <div>{pair.score}</div>
          </div>
        </div>
      })}
    </React.Fragment>

  );
};

export default ScoresRank;