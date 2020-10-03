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
import withRoom from './withRoom.jsx';
import CountDownPage from './CountDownPage';
/**
 * 
 * Except the settings part and setGameModeSettingMenuOpenFalse, this component should be totally separated from the app.js
 */
// One second in ms.
const ONE_SECOND = 1000;
const SETTINGSPAGE = "settingsPage";
const PREPAREPAGE = "preparePage";
const GAMEPAGE = "gamePage";
const BTWROUNDPAGE = "betweenRoundPage";
const ENDPAGE = "endPage";
// Contains all the running setTimeout functions.
let timeouts = [];
let x = 3;
const SingleGamePage = (props) => {

  let screenWidth = useWindowSize().width;

  // states
  const [questions, setQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [startGameButtonDisabled, setStartGameButtonDisabled] = useState(false);
  const [pageCtrl, setPageCtrl] = useState(SETTINGSPAGE);
  const [countDownTime, setCountDownTime] = useState();

  useEffect(() => {
    if (screenWidth > 1200 && props.gameModeSettingMenuOpen === true) {
      props.setGameModeSettingMenuOpenFalse();
    }
  });

  const pause = (ms) => {
    return new Promise((resolve, reject) => {
      //this.timeouts.push(setTimeout(resolve, ms));
      //this.timerPromiseReject = reject;
      timeouts.push(setTimeout(resolve, ms));
    });
  };

  const pressStartGameButton = async () => {
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
    //setCountDownTime(5)
    setPageCtrl(PREPAREPAGE);
    for (let i = 5; i > 0; i--) {
      //console.log("here" + countDownTime);
      setCountDownTime(i);
      await pause(1000);
    }
    setPageCtrl(GAMEPAGE);
    //setStartGameButtonDisabled(true);
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
                    onCancel={() => { timeouts.forEach(clearTimeout); props.exitRoomButtonPress() }}
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
        return (
          <CountDownPage
            timeInGame={countDownTime}
          />);



      case GAMEPAGE:
        return (<h1>Game</h1>);

    }
  }

  return renderSwitch();
}

export default SingleGamePage;
//export default SingleGamePage;