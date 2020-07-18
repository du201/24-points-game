import React from "react";
import solutionFunc from "./solutionFunc";
/**
 * 
 * Display the player solution ranks (three) between rounds
 */
const SolutionsRank = (props) => {
  return (
    <React.Fragment>
      {props.playerSolutions.map((pair, index) => {
        return <div className="card bg-info mb-1" key={index}>
          <div className="card-body">
            <div>{pair.name}</div>
            <div>{solutionFunc(pair.solution)}</div>
          </div>
        </div>
      })}
    </React.Fragment>

  );
};

export default SolutionsRank;