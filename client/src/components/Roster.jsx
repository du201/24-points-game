import React from "react";
import "./Roster.css";

/**
 * 
 * Display the current players in the room
 * If the player is in the waitForHostPage, only display the name
 * If the player is in the multiPlayerGamePage, display the name and whether or not 
 * each player has solved the problem in the current round
 */
const Roster = (props) => {
  return (
    <React.Fragment>
      {props.playerRoster.map((eachName, index) => {
        return <div className="card bg-info mb-1" key={index}>
          <div className="card-body">
            <div>{eachName}</div>
            {(props.pageController === "waitForHostPage" || props.pageController === "createRoomPage") ? null :
              <div>{props.playerSolved.includes(eachName) ? "Yes" : "No"}</div>}
          </div>
        </div>
      })}
    </React.Fragment>

  );
};

export default Roster;
