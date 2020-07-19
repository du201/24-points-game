import React from "react";
import CancelRoomCreateButton from "./CancelRoomCreateButton";
import GameBoard from "./GameBoard";
import Roster from "./Roster";

const MultiGamePage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col col-2 h-100">
          <div className="row h-25">
            <div className="col text-center my-auto h-50">
              <CancelRoomCreateButton
                onCancel={props.exitRoomButtonPress}
              ></CancelRoomCreateButton>
            </div>
          </div>
          <div className="row h-25">
            <div className="col text-center my-auto">
              <h3>My Total Score (from prev rounds): {props.multiplayerTotalScore}</h3>
            </div>
          </div>
          <div className="row h-25">
            <div className="col text-center my-auto">
              <h1>My Name: {props.username}</h1>
            </div>
          </div>
          <div className="row h-25">
            <div className="col text-center my-auto">
              <h1>Round: {props.whichRound} / {props.numOfRound}</h1>
            </div>
          </div>
        </div>
        <div className="col col-8 h-100">
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
            correctOrNotText={props.correctOrNotText}
            pressNoSolutionButton={props.pressNoSolutionButton}
            submitButtonDisable={props.submitButtonDisable}></GameBoard>
        </div>
        <div className="col col-2 h-100">
          <div className="row h-25">
            <div className="col text-center my-auto">
              <h3>Time (s) Left:</h3>
              <h2>{props.timeInGame}s</h2>
            </div>
          </div>
          <div className="row h-25">
            <div className="col my-auto text-center">
              Total Player#/ Player Solved#
                    <br />
              {props.playerRosterLength}/{props.playerSolvedLength}
            </div>
          </div>
          <div className="row h-50">
            <div className="col h-100 overflow-auto">
              <Roster
                playerRoster={props.playerRoster}
                playerSolved={props.playerSolved}
              ></Roster>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiGamePage;