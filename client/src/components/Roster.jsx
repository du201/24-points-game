import React from "react";
import "./Roster.css";
import { HOSTPAGE, WAITFORHOSTPAGE, MULTIGAMEPAGE } from './roomConst';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * Display the current players in the room
 * If the player is in the waitForHostPage, only display the name
 * If the player is in the multiPlayerGamePage, display the name and whether or not 
 * each player has solved the problem in the current round plus the emoji functionality
 */
const Roster = ({ playerRoster, playerSolved, pageController, playerColor }) => {
  let rosterVersion = "";
  if (pageController === HOSTPAGE || pageController === WAITFORHOSTPAGE) {
    rosterVersion = "bigVersion";
  } else {
    rosterVersion = "smallVersion";
  }
  const solvedOrNot = (eachName) => {
    //only shows whether or not a player has solved the problem in the MULTIGAMEPAGE
    if (pageController === HOSTPAGE || pageController === WAITFORHOSTPAGE) {
      return null;
    }
    let display = playerSolved.includes(eachName) === true ?
      <span id="check-green"><FontAwesomeIcon icon={faCheckCircle} size="x" /></span> :
      <span id="times-red"><FontAwesomeIcon icon={faTimesCircle} size="x" /></span>;
    return display;
  };

  // const randomColor = () => {
  //   const color = Math.floor(Math.random() * 16777215).toString(16);
  //   return '#' + color;
  // };

  return (

    <div className="d-flex flex-wrap">
      {playerRoster.map((eachName, index) => {
        return (
          <div className={rosterVersion === "bigVersion" ? "centerize" : "centerize-small"} key={index}>
            <div id="solve-check">{solvedOrNot(eachName)}</div>
            <div className={rosterVersion === "bigVersion" ? "circle" : "circle-small"} style={{ backgroundColor: playerColor[eachName] }}>
              <div className={rosterVersion === "bigVersion" ? "name" : "name-small"}>{eachName[0]}</div>
            </div>
            <div id={rosterVersion === "bigVersion" ? "player-name" : "player-name-small"}>{eachName}</div>
          </div>);
      })}
    </div>

  );
};

export default Roster;
