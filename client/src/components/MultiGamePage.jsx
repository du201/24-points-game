import React, { useEffect } from "react";
import ExitRoomButton from "./common/ExitRoomButton";
import GameBoard from "./GameBoard";
import Roster from "./Roster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './MultiGamePage.css';
import { useWindowSize } from './common/useWindowSize.js';

const MultiGamePage = (props) => {
  let screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth > 1200 && props.gameModeScoresMenuOpen === true) {
      props.setGameModeScoresMenuOpenFalse();
    }
  });


  return (
    // <div className="container-fluid h-100">
    //   <div className="row h-100">
    //     <div className="col col-2 h-100">
    //       <div className="row h-25">
    //         <div className="col text-center my-auto h-50">
    //           <ExitRoomButton
    //             onCancel={props.exitRoomButtonPress}
    //           ></ExitRoomButton>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h3>My Total Score (from prev rounds): {props.multiplayerTotalScore}</h3>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h1>My Name: {props.username}</h1>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h1>Round: {props.whichRound} / {props.numOfRound}</h1>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col col-8 h-100">
    //       <GameBoard
    //         gameNumbers={props.gameNumbers}
    //         addNumToInput={props.addNumToInput}
    //         expressionInput={props.expressionInput}
    //         targetNum={props.targetNum}
    //         operators={props.operators}
    //         pressDeleteInputButton={props.pressDeleteInputButton}
    //         pressCalculateResultButton={props.pressCalculateResultButton}
    //         answer={props.answer}
    //         multiplayerButtonDisable={props.multiplayerButtonDisable}
    //         answerCorrect={props.answerCorrect}
    //         pressNoSolutionButton={props.pressNoSolutionButton}
    //         submitButtonDisable={props.submitButtonDisable}
    //         attemptNum={props.attemptNum}
    //       ></GameBoard>
    //     </div>
    //     <div className="col col-2 h-100">
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h3>Time (s) Left:</h3>
    //           <h2>{props.timeInGame}s</h2>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col my-auto text-center">
    //           Total Player#/ Player Solved#
    //                 <br />
    //           {props.playerRosterLength}/{props.playerSolvedLength}
    //         </div>
    //       </div>
    //       <div className="row h-50">
    //         <div className="col h-100 overflow-auto">
    //           <Roster
    //             playerRoster={props.playerRoster}
    //             playerSolved={props.playerSolved}
    //             pageController={props.pageController}
    //             playerColor={props.playerColor}
    //           ></Roster>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>




    // this is the css-test hardcoded version
    // <div className="container-fluid h-100">
    //   <div className="row h-100">
    //     <div className="col col-2 h-100">
    //       <div className="row h-25">
    //         <div className="col text-center my-auto h-50">
    //           <ExitRoomButton
    //             onCancel={props.exitRoomButtonPress}
    //           ></ExitRoomButton>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h3>My Total Score (from prev rounds): {props.multiplayerTotalScore}</h3>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h1>My Name: Xin</h1>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h1>Round: {props.whichRound} / {props.numOfRound}</h1>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col col-8 h-100">

    //     </div>
    //     <div className="col col-2 h-100">
    //       <div className="row h-25">
    //         <div className="col text-center my-auto">
    //           <h3>Time (s) Left:</h3>
    //           <h2>30s</h2>
    //         </div>
    //       </div>
    //       <div className="row h-25">
    //         <div className="col my-auto text-center">
    //           Total Player#/ Player Solved#
    //                 <br />
    //           4/12
    //         </div>
    //       </div>
    //       <div className="row h-50">
    //         <div className="col h-100 overflow-auto">
    //           <Roster
    //             playerRoster={['Xin', 'Du', 'Gong', 'Zheng', 'zhe', 'Wuhan', 'Hua', 'Kao', 'a', 'b', 'c', 'd', 'e', 'f']}
    //             playerSolved={props.playerSolved}
    //             pageController={props.pageController}
    //             playerColor={{
    //               Xin: "#123456", Du: "#123456", Gong: "#123456", Zheng: "#123456", zhe: "#123456", Wuhan: "#123456", Hua: "#123456", Kao: "#123456",
    //               a: "#123456", b: "#123456", c: "#123456", d: "#123456", e: "#123456", f: "#123456"
    //             }}
    //           ></Roster>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container-fluid h-100">
      <div className={props.gameModeScoresMenuOpen === false ? "row h-100" : "row h-100 grey-content"}>
        {/* A fixed width column */}
        <div className="menu-sidebar">
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
        {/* The game board area */}
        <div className={props.gameModeScoresMenuOpen === false ? "col" : "display-none"}>
          <div id="rightside-hostpage" className="d-flex flex-column align-items-center ">
            <h2 id="game-top-text" className="fnt-bold">
              Try to reach <span id="goal-text" className="fnt-regular">{props.targetNum}</span> in <span id="timer-text" className="fnt-regular">{props.timeInGame}</span> seconds!
              {/* this.props.targetNum */}
            </h2>
            <GameBoard
              gameNumbers={props.gameNumbers}
              addNumToInput={props.addNumToInput}
              expressionInput={props.expressionInput}
              targetNum={props.targetNum}
              operators={props.operators}
              pressDeleteInputButton={props.pressDeleteInputButton}
              pressCalculateResultButton={props.pressCalculateResultButton}
              answer={props.answer}
              multiplayerButtonDisable={props.multiplayerButtonDisable}
              answerCorrect={props.answerCorrect}
              pressNoSolutionButton={props.pressNoSolutionButton}
              submitButtonDisable={props.submitButtonDisable}
              attemptNum={props.attemptNum}
            ></GameBoard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiGamePage;