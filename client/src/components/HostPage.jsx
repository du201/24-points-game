import React, { useEffect, useState } from "react";
import MenuSetting from "./MenuSetting";
import CancelRoomCreateButton from "./common/CancelRoomCreateButton";
import Roster from "./Roster";
import Loader from 'react-loader-spinner';
import { HOSTPAGE } from './roomConst';
import Button from "./common/Button";
import './HostPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from './common/useWindowSize.js';
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
        <div id="menu-sidebar">
          <div id="menu-sidebar-top" style={{ clear: "both" }}>
            <div className="float-left">
              <CancelRoomCreateButton
                onCancel={props.exitRoomButtonPress}
              ></CancelRoomCreateButton>
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
        <div className={props.gameModeSettingMenuOpen === false ? "col" : "display-none"}>
          <div id="rightside-hostpage" className="d-flex flex-column align-items-center ">
            <h1 className="fnt-bold grey-text" style={{ marginTop: "5rem" }}>
              Start the game
              </h1>
            <h3 className="fnt-bold grey-text" style={{ marginTop: "3rem" }}>Room number</h3>
            {/* <h1 id="room-number-text" className="fnt-thin">{props.roomNumber}</h1> */}
            <h1 id="room-number-text" className="fnt-thin">1234</h1>

            <h3 className="fnt-bold grey-text" style={{ marginTop: "2rem" }}>Players</h3>
            <h1 id="room-number-text" className="fnt-thin">{props.playerRoster.length} / {props.maxPlayerNum}</h1>

            <h3 id="wait-text">Waiting for other players to join...</h3>

            <Roster
              playerRoster={['Xin', 'Du', 'Gong', 'Zheng', 'zhe', 'Wuhan', 'Hua', 'Kao', 'a', 'b', 'c', 'd', 'e', 'f']}
              playerSolved={props.playerSolved}
              pageController={props.pageController}
              playerColor={{
                Xin: "#123456", Du: "#123456", Gong: "#123456", Zheng: "#123456", zhe: "#123456", Wuhan: "#123456", Hua: "#123456", Kao: "#123456",
                a: "#123456", b: "#123456", c: "#123456", d: "#123456", e: "#123456", f: "#123456"
              }}
            ></Roster>
            {/* <Roster
                playerRoster={props.playerRoster}
                playerSolved={props.playerSolved}
                pageController={props.pageController}
                playerColor={props.playerColor}
              ></Roster> */}
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