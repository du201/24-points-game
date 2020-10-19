import React, { useEffect } from "react";
import GameBoard from "./GameBoard";
import { useWindowSize } from './common/useWindowSize.js';
import GameSideBar from "./GameSideBar";
import './MultiGamePage.css';

const MultiGamePage = (props) => {
  let screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth > 1200 && props.gameModeScoresMenuOpen === true) {
      props.setGameModeScoresMenuOpenFalse();
    }
  });



  return (
    <div className="container-fluid h-100">
      <div className={props.gameModeScoresMenuOpen === false ? "row h-100" : "row h-100 grey-content"}>
        {/* A fixed width column */}
        <GameSideBar
          exitRoomButtonPress={props.exitRoomButtonPress}
          switchScoresMenu={props.switchScoresMenu}
          gameModeScoresMenuOpen={props.gameModeScoresMenuOpen}
          whichRound={props.whichRound}
          numOfRound={props.numOfRound}
          multiplayerTotalScore={props.multiplayerTotalScore}
          playerRoster={props.playerRoster}
          playerSolved={props.playerSolved}
          pageController={props.pageController}
          playerColor={props.playerColor}
        />
        {/* The game board area */}
        <div className={props.gameModeScoresMenuOpen === false ? "col" : "display-none"}>
          <div id="rightside-hostpage" className="w-100 h-100">
            <div className="gameboard-background d-flex flex-column align-items-center ">
              <h2 id="game-top-text" className="fnt-bold">
                Try to reach <span id="goal-text" className="fnt-regular">{props.targetNum}</span> in <span id="timer-text" className="fnt-regular">{props.timeInGame}</span> seconds!
              {/* this.props.targetNum */}
              </h2>
              <GameBoard
                gameNumbers={props.gameNumbers}
                //gameNumbers={['1', '2', '3', '4']}
                screenWidth={screenWidth}
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
              //attemptNum={1}
              ></GameBoard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiGamePage;