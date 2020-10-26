import React, { useEffect, useState } from "react";
import MenuSetting from "./MenuSetting";
import ExitRoomButton from "./common/ExitRoomButton";
import Roster from "./Roster";
import Loader from 'react-loader-spinner';
import { HOSTPAGE } from './roomConst';
import Button from "./common/Button";
import './HostPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from './common/useWindowSize.js';
import RoomInfo from './RoomInfo';
const HostPage = (props) => {
  let screenWidth = useWindowSize().width;

  useEffect(() => {
    props.startCountDown();
  }, []);

  useEffect(() => {
    if (screenWidth > 1200 && props.gameModeSettingMenuOpen === true) {
      props.setGameModeSettingMenuOpenFalse();
    }
  });

  const autoStartReminder = () => {
    let text = "";

    if (props.waitTimeMax === 0) {
      text = <span>Loading the game...</span>
    } else if (props.waitTimeMax <= 60) {
      text = <span>The game will begin automatically in {props.waitTimeMax} seconds</span>
    }
    return text;
  };
  return (
    <div className="container-fluid h-100">
      <div className={props.gameModeSettingMenuOpen === false ? "row h-100" : "row h-100 grey-content"}>
        {/* A fixed width column */}
        <div className="menu-sidebar-hostpage">
          <div id="menu-sidebar-top" style={{ clear: "both" }}>
            <div className="float-left">
              <ExitRoomButton
                onCancel={props.exitRoomButtonPress}
              ></ExitRoomButton>
            </div>
            <div className="float-right">
              <a
                id="menu-switch"
                onClick={props.switchSettingsMenu}
              >
                {props.gameModeSettingMenuOpen === false ?
                  <FontAwesomeIcon icon={faBars} size="2x" /> :
                  <FontAwesomeIcon icon={faTimes} size="2x" />}
              </a>
            </div>
          </div>
          <div className={props.gameModeSettingMenuOpen === false ? "display-none" : "grey-content"}>
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
        <div className={props.gameModeSettingMenuOpen === false ? "col text-center" : "display-none"}>
          <h1 className="fnt-bold grey-text" style={{ marginTop: "5rem" }}>
            Start the game
          </h1>
          <RoomInfo
            playerRoster={props.playerRoster}
            playerSolved={props.playerSolved}
            maxPlayerNum={props.maxPlayerNum}
            roomNumber={props.roomNumber}
            pageController={props.pageController}
            playerColor={props.playerColor}
          />
          <div>
            <h3 className="fnt-bold" style={{ marginBottom: "2rem" }}>
              {autoStartReminder()}
            </h3>
            <div style={{ marginBottom: "2rem" }}>
              <Button
                onClick={props.pressStartGameButton}
                disabled={props.startGameButtonDisabled}
                style={0}
                display={props.loading === true ?
                  <div className="force-inline">
                    <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={20}
                      width={20}
                    />
                  </div> :
                  "Start"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default HostPage;
