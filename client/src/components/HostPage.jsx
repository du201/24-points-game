import React, { useEffect } from "react";
import MenuSetting from "./MenuSetting";
import CancelRoomCreateButton from "./common/CancelRoomCreateButton";
import Roster from "./Roster";
import Loader from 'react-loader-spinner';
import { HOSTPAGE } from './roomConst';
import Button from "./common/Button";
import './HostPage.css';

const HostPage = (props) => {
  return (
    <div className="container-fluid h-100">
      {/* {props.gameModeSettingMenuOpen === true ?
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
        : */}
      <div className="row">
        {/* A fixed width column */}
        <div style={{ width: "30.25rem", backgroundColor: "#F7F7F7" }}>
          <div className="row" style={{ height: "10%" }}>
            <CancelRoomCreateButton
              onCancel={props.exitRoomButtonPress}
            ></CancelRoomCreateButton>
          </div>
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
        {/* A fixed width column */}
        <div className="col">
          {/* <div className="row" style={{ height: "10%" }}>
            <div className="col my-auto">
              <button
                className="btn btn-info m-3 topRightCorner"
                onClick={props.switchSettingsMenu}
              >
                Setting
              </button>
            </div>
          </div> */}
          <div id="">
            <div id="rightside-hostpage" className="d-flex flex-column align-items-center ">
              <h1 className="fnt-bold grey-text">
                Start the game
              </h1>
              <h3 className="fnt-bold grey-text">Room number</h3>
              <h1 className="">{props.roomNumber}</h1>

              <h2>Players {props.playerRoster.length} of 10</h2>

              <h3>Waiting for other players to join...</h3>

              {/* <Roster
                playerRoster={['Xin', 'Du', 'Gong', 'Zheng', 'zhe', 'Wuhan', 'Hua', 'Kao']}
                playerSolved={props.playerSolved}
                pageController={props.pageController}
                randomColor={props.randomColor}
                
              ></Roster> */}
              <Roster
                playerRoster={props.playerRoster}
                playerSolved={props.playerSolved}
                pageController={props.pageController}
                playerColor={props.playerColor}
              ></Roster>
              <h2>The game will begin automatically in 34 seconds</h2>
              <Button
                onClick={props.pressStartGameButton}
                disabled={props.startGameButtonDisabled}
                style={0}
                display={props.loading === true ?
                  <div className="force-inline"><Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={20}
                    width={20}
                  /></div> :
                  "Start"}
              />
            </div>
          </div>

          {/* just for testing purpose */}
        </div>
      </div>
    </div>

  );
}

export default HostPage;