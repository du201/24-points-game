import React from "react";
import MenuSetting from "./MenuSetting";
import CancelRoomCreateButton from "./common/CancelRoomCreateButton";
import Roster from "./Roster";
import Loader from 'react-loader-spinner';
import { HOSTPAGE } from './roomConst';

const HostPage = (props) => {
  return (
    <div className="container-fluid h-100">
      {props.gameModeSettingMenuOpen === true ?
        <div className="row h-100">
          <div className="col">
            <MenuSetting
              handleSlotNumChange={props.handleSlotNumChange}
              handleTargetNumChange={props.handleTargetNumChange}
              pressMenuCloseButton={props.pressMenuCloseButton}
              handleRangeOfAvailableNumberLowBoundInput={
                props.handleRangeOfAvailableNumberLowBoundInput
              }
              handleRangeOfAvailableNumberHighBoundInput={
                props.handleRangeOfAvailableNumberHighBoundInput
              }
              handleMaxRepeatNumInput={props.handleMaxRepeatNumInput}
              handleRoundDurationInput={props.handleRoundDurationInput}
              handleNumOfRoundInput={props.handleNumOfRoundInput}
              handleAvailableOperatorCheckbox={
                props.handleAvailableOperatorCheckbox
              }
              backToDefaultSettings={props.backToDefaultSettings}
              slotNum={props.slotNum}
              targetNum={props.targetNum}
              showMenuBoolean={props.gameModeSettingMenuOpen}
              rangeOfAvailableNumberLowBound={
                props.rangeOfAvailableNumberLowBound
              }
              rangeOfAvailableNumberHighBound={
                props.rangeOfAvailableNumberHighBound
              }
              maxRepeatNum={props.maxRepeatNum}
              roundDuration={props.roundDuration}
              numOfRound={props.numOfRound}
              availableOperator={props.availableOperator}
            ></MenuSetting>
          </div>
        </div>
        :
        <div className="h-100 w-100">
          <div className="row h-25">
            <div className="col my-auto">
              <CancelRoomCreateButton
                onCancel={props.exitRoomButtonPress}
              ></CancelRoomCreateButton>
              {/* the setting button is differnt from normal button */}
              <button
                className="btn btn-info m-3 topRightCorner"
                onClick={props.switchSettingsMenu}
              >
                Setting
              </button>
            </div>
          </div>
          <div className="row h-25">
            <div className="col text-center my-auto">
              <h1 className="cover-heading">
                start the game
                      {/* <br />
                      Nickname: {props.username} */}
                <br />
                      Room number <br />
                {props.roomNumber}
                <br />
                    Players {props.playerRoster.length} of 10
                <br />
                      Waiting for other players to join...
              </h1>
            </div>
          </div>
          <div className="row h-25">
            <div className="col text-center my-auto">
              {/* This button is special, so the common button component is not used */}
              <button
                className="btn btn-primary m-3"
                id="startGame"
                onClick={props.pressStartGameButton}
                disabled={props.startGameButtonDisabled}
              >
                {props.loading === true ? <div className="force-inline"><Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={20}
                  width={20}
                /></div> : "Start"}
              </button>
            </div>
          </div>
          <div className="row h-25 justify-content-center">
            <div className="col-6 pt-2 overflow-auto h-100">
              {/* <Roster
                playerRoster={props.playerRoster}
                playerSolved={props.playerSolved}
                pageController={props.pageController}
                currentPage={HOSTPAGE}
              ></Roster> */}
              {/* just for testing purpose */}
              <Roster
                playerRoster={['Xin', 'Du', 'Gong', 'Zheng', 'zhe', 'Wuhan', 'Hua', 'Kao']}
                playerSolved={props.playerSolved}
                pageController={props.pageController}
              ></Roster>
            </div>
          </div>
        </div>}
    </div>

  );
}

export default HostPage;