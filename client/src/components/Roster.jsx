import React from "react";
import "./Roster.css";
import { HOSTPAGE, WAITFORHOSTPAGE, MULTIGAMEPAGE } from './roomConst';

/**
 * 
 * Display the current players in the room
 * If the player is in the waitForHostPage, only display the name
 * If the player is in the multiPlayerGamePage, display the name and whether or not 
 * each player has solved the problem in the current round plus the emoji functionality
 */
const Roster = ({ playerRoster, playerSolved, pageController, playerColor }) => {

  const solvedOrNot = (eachName) => {
    //only shows whether or not a player has solved the problem in the MULTIGAMEPAGE
    if (pageController === HOSTPAGE || WAITFORHOSTPAGE) {
      return null;
    }

    let display = playerSolved.includes(eachName) ?
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg> :
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
      </svg>;

    return display;
  };

  // const randomColor = () => {
  //   const color = Math.floor(Math.random() * 16777215).toString(16);
  //   return '#' + color;
  // };

  return (

    <div className="d-flex flex-wrap roster-wrapper">
      {playerRoster.map((eachName, index) => {
        return (
          <div className="centerize" key={index}>
            <div className="circle" style={{ backgroundColor: playerColor[eachName] }}>
              {solvedOrNot(eachName)}
              <div className="name">{eachName[0]}</div>
            </div>
            <div id="player-name">{eachName}</div>
          </div>);
      })}
    </div>

  );
};

export default Roster;
