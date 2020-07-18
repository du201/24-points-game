import React from "react";

/**
 * 
 * Display the player solution ranks (three) between rounds
 */
const ScoresRank = (props) => {
  return (
    <React.Fragment>
      {props.scoreRanking.map((pair, index) => {
        return <div className="card bg-info mb-1" key={index}>
          <div className="card-body">
            <div>Name: {pair.name}</div>
            <div>Total Score: {pair.totalScore}</div>
          </div>
        </div>
      })}
    </React.Fragment>

  );
};

export default ScoresRank;