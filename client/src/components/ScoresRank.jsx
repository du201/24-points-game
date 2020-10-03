import React from "react";

/**
 * 
 * Display the player solution ranks (three) between rounds
 */
const ScoresRank = (props) => {
  return (
    <React.Fragment>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">POS.</th>
            <th scope="col">Nickname</th>
            <th scope="col">Scores</th>
          </tr>
        </thead>
        <tbody>
          {props.scoreRanking.map((pair, index) => {
            return <tr className={index === 0 ? "gold-text" : index === 1 ? "silver-text" : index === 2 ? "copper-text" : ""}>
              <th scope="row">{index + 1}</th>
              <td>{pair.name}</td>
              <td>{pair.totalScore}</td>
            </tr>
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ScoresRank;