import React, { Component } from 'react';
import ExitRoomButton from "./common/ExitRoomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Roster from "./Roster";

const GameSideBar = (props) => {
  return (
    <div className="menu-sidebar" style={{ backgroundColor: "yellow" }}>
      <div id="menu-sidebar-top">
        <div className="float-left">
          <ExitRoomButton
            onCancel={props.exitRoomButtonPress}
          ></ExitRoomButton>
        </div>
        <div className="float-right">
          <a
            id="menu-switch"
            onClick={props.switchScoresMenu}
          >
            {props.gameModeScoresMenuOpen === false ?
              <FontAwesomeIcon icon={faBars} size="2x" /> :
              <FontAwesomeIcon icon={faTimes} size="2x" />}
          </a>
        </div>
      </div>
      <div className={props.gameModeScoresMenuOpen === false ? "menu-sidebar-info" : "menu-sidebar-info-whentrue"} style={{ clear: "both" }}>
        <h2 id="round-text" className="fnt-bold">Round</h2>
        <p>{props.whichRound} of {props.numOfRound}</p>
        <h2 id="score-text" className="fnt-bold">My Score</h2>
        <p>{props.multiplayerTotalScore}</p>
        <h2 id="score-text" className="fnt-bold">Players</h2>
        <Roster
          playerRoster={props.playerRoster}
          playerSolved={props.playerSolved}
          pageController={props.pageController}
          playerColor={props.playerColor}
        ></Roster>
      </div>

    </div>
  )
}


export default GameSideBar;