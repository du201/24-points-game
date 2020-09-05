import React, { useEffect, useState } from "react";
import { useWindowSize } from './common/useWindowSize.js';
import MenuSetting from "./MenuSetting";
import ExitRoomButton from "./common/ExitRoomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner';
import Button from "./common/Button";
import "./SingleGamePage.css";
import "./HostPage.css";
import Room from "../room.js";
/**
 * 
 * Except the settings part and setGameModeSettingMenuOpenFalse, this component should be totally separated from the app.js
 */
let room = new Room();
const SETTINGSPAGE = "settingsPage";
const PREPAREPAGE = "preparePage";
const GAMEPAGE = "gamePage";
const BTWROUNDPAGE = "betweenRoundPage";
const ENDPAGE = "endPage";

const SingleGamePage = (props) => {
  let screenWidth = useWindowSize().width;

  // states
  const [questions, setQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [startGameButtonDisabled, setStartGameButtonDisabled] = useState(false);
  const [pageCtrl, setPageCtrl] = useState(SETTINGSPAGE);

  useEffect(() => {
    if (screenWidth > 1200 && props.gameModeSettingMenuOpen === true) {
      props.setGameModeSettingMenuOpenFalse();
    }
  });

  const pressStartGameButton = () => {
    let settingPackageObject = {
      numOfSlots: props.slotNum, //int
      targetNumber: props.targetNum, //int
      availableOperators: props.availableOperator, //array of string
      rangeLo: props.rangeOfAvailableNumberLowBound, //int
      rangeHi: props.rangeOfAvailableNumberHighBound, //int
      maxNumOfRepeats: props.maxRepeatNum, //int
      roundDuration: props.roundDuration * 1000, //int (ms)
      numOfRounds: props.numOfRound, //int
    };
    setStartGameButtonDisabled(true);
    room.changeSettings(settingPackageObject);
    setPageCtrl(PREPAREPAGE);
  };

  const renderSwitch = () => {
    switch (pageCtrl) {
      case SETTINGSPAGE:
        return (<div className="container-fluid h-100">
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
              <h1 className="fnt-bold grey-text" style={{ marginTop: "6rem" }}>
                Start the game
            </h1>
              <div style={{ marginTop: "6rem" }}>
                <div>
                  <Button
                    onClick={pressStartGameButton}
                    disabled={startGameButtonDisabled}
                    style={0}
                    display={startGameButtonDisabled === true ?
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
        </div>);
      case PREPAREPAGE:
        return <h1>{room.timer}</h1>;
    }
  }

  return renderSwitch();
}

export default SingleGamePage;