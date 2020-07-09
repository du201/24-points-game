import React, { Component } from "react";
import "./App.css";
import ReturnHomePageButton from "./components/ReturnHomePageButton";
import CancelRoomCreateButton from "./components/CancelRoomCreateButton";
import GameSolver from "./components/GameSolver";
import MenuSetting from "./components/MenuSetting";
import NameInputUI from "./components/NameInputUI";
import io from "socket.io-client";
const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
let operators = [TIMES, DIVIDES, PLUS, MINUS];

const server = "http://localhost:2000";
const socket = io.connect(server);

class App extends Component {
  state = {
    pageController: "homePage",
    username: "",
    roomNumber: null,
    gameModeSettingMenuOpen: false,
    oneOrAllAnswerShown: "one",
    gameModeBasicSetting: { slotNum: 4, targetNum: 24 },
    reenterUsername: false,
    rangeOfAvailableNumberLowBound: 1,
    rangeOfAvailableNumberHighBound: 13,
    maxRepeatNum: 4,
    timeBetweenRound: 30000,
    numOfRound: 10,
    availableOperator: operators,
  };

  //helper functions (start)
  hasValidUsername = () => {
    let name = this.state.username;
    return !(name === undefined || name === "");
  };

  arrayRemove = (arr, value) => {
    return arr.filter((ele) => {
      return ele !== value;
    });
  };
  //helper functions (end)

  //functions to switch between pages & send message to server (start)
  gameModeButtonPress = () => {
    this.setState({
      pageController: "gamePage", //to page 3
    });
  };

  solveModeButtonPress = () => {
    this.setState({
      pageController: "solvePage", //to page 2
    });
  };

  returnHomePageButtonPress = () => {
    this.setState({
      pageController: "homePage", //to page 1
    });
  };

  cancelRoomCreateButtonPress = () => {
    this.setState({
      pageController: "gamePage", //to page 3
    });
    socket.emit("exitRoom");
  };

  createRoomButtonPress = () => {
    //to page 4
    if (this.hasValidUsername()) {
      socket.emit("createRoom", this.state.username);
      socket.once("createRoomSuccess", (roomNum) => {
        this.setState({
          pageController: "createRoomPage",
          roomNumber: roomNum, //string
          gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
        });
      });
      socket.once("createRoomFailure", (msg) => {
        alert(msg);
      });
    } else {
      alert("please enter a valid nickname");
    }
  };

  joinRoomButtonPress = () => {
    // to page 5
    if (this.hasValidUsername()) {
      this.setState({
        pageController: "joinRoomNumPage",
      });
    } else {
      alert("please enter a valid nickname");
    }
  };

  startGameButtonPress = () => {
    // to page 7
    this.setState({
      pageController: "multiPlayerGamePage",
    });
  };

  joinRoomKeyButtonPress = () => {
    socket.emit("joinRoom", {
      username: this.state.username,
      room: this.state.roomNumber,
    });
    socket.once("joinRoomSuccess", () => {
      this.setState({
        pageController: "waitForHostPage",
        roomNumber: this.state.roomNumber,
      });
    });
    socket.once("joinRoomFailure", (msg) => {
      alert(msg);
    });
    socket.once("usernameDuplicate", (msg) => {
      alert(msg);
      this.setState({ reenterUsername: true });
    });
  };

  exitRoomKeyButtonPress = () => {
    this.setState({
      pageController: "joinRoomNumPage",
    });
  };

  enterSinglePlayerButtonPress = () => {
    this.setState({
      pageController: "singlePlayerGamePage",
    });
  };

  //functions to switch between pages & send message to server (end)

  //function handlers (start)
  slotNumChangeHandler = (event) => {
    let copy_gameModeSetting = { ...this.state.gameModeBasicSetting };
    copy_gameModeSetting.slotNum = parseInt(event.target.value, 10);
    this.setState({ gameModeBasicSetting: copy_gameModeSetting });
  };

  targetNumChangeHandler = (event) => {
    let copy_gameModeSetting = { ...this.state.gameModeBasicSetting };
    copy_gameModeSetting.targetNum = parseInt(event.target.value, 10);
    this.setState({ gameModeBasicSetting: copy_gameModeSetting });
  };

  menuCloseHandler = () => {
    this.setState({
      gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
    });
    let settingPackageObject = {
      numOfSlots: this.state.gameModeBasicSetting.slotNum, //int
      targetNumber: this.state.gameModeBasicSetting.targetNum, //int
      availableOperators: this.state.availableOperator, //array of string
      showAllAnswers: this.state.oneOrAllAnswerShown === "one" ? false : true, //bool
      rangeLo: this.state.rangeOfAvailableNumberLowBound, //int
      rangeHi: this.state.rangeOfAvailableNumberHighBound, //int
      maxNumOfRepeats: this.state.maxRepeatNum, //int
      roundInterval: this.state.timeBetweenRound, //int (ms)
      numOfRounds: this.state.numOfRound, //int
    };
    socket.emit("changeSettings", settingPackageObject);
    console.log(settingPackageObject);
  };

  setStateName = (event) => {
    this.setState({ username: event.target.value });
  };

  oneOrAllAnswerRadioButtonHandler = (event) => {
    this.setState({ oneOrAllAnswerShown: event.target.value });
  };

  rangeOfAvailableNumberLowBoundInputHandler = (event) => {
    this.setState({ rangeOfAvailableNumberLowBound: event.target.value });
  };

  rangeOfAvailableNumberHighBoundInputHandler = (event) => {
    this.setState({ rangeOfAvailableNumberHighBound: event.target.value });
  };

  maxRepeatNumInputHandler = (event) => {
    this.setState({ maxRepeatNum: event.target.value });
  };

  timeBetweenRoundInputHandler = (event) => {
    this.setState({ timeBetweenRound: event.target.value });
  };

  numOfRoundInputHandler = (event) => {
    let num = event.target.value;
    if (num < 13) {
      num = 10;
    } else if (num < 17) {
      num = 15;
    } else {
      num = 20;
    }
    this.setState({ numOfRound: num });
  };

  availableOperatorCheckboxHandler = (event) => {
    let selectValue = event.target.value;
    switch (selectValue) {
      case TIMES:
        if (this.state.availableOperator.includes(TIMES)) {
          this.setState({
            availableOperator: this.arrayRemove(
              this.state.availableOperator,
              TIMES
            ),
          });
        } else {
          let copy_availableOperator = [...this.state.availableOperator];
          copy_availableOperator.push(TIMES);
          this.setState({
            availableOperator: copy_availableOperator,
          });
        }
        break;
      case DIVIDES:
        if (this.state.availableOperator.includes(DIVIDES)) {
          this.setState({
            availableOperator: this.arrayRemove(
              this.state.availableOperator,
              DIVIDES
            ),
          });
        } else {
          let copy_availableOperator = [...this.state.availableOperator];
          copy_availableOperator.push(DIVIDES);
          this.setState({
            availableOperator: copy_availableOperator,
          });
        }
        break;
      case PLUS:
        if (this.state.availableOperator.includes(PLUS)) {
          this.setState({
            availableOperator: this.arrayRemove(
              this.state.availableOperator,
              PLUS
            ),
          });
        } else {
          let copy_availableOperator = [...this.state.availableOperator];
          copy_availableOperator.push(PLUS);
          this.setState({
            availableOperator: copy_availableOperator,
          });
        }
        break;
      case MINUS:
        if (this.state.availableOperator.includes(MINUS)) {
          this.setState({
            availableOperator: this.arrayRemove(
              this.state.availableOperator,
              MINUS
            ),
          });
        } else {
          let copy_availableOperator = [...this.state.availableOperator];
          copy_availableOperator.push(MINUS);
          this.setState({
            availableOperator: copy_availableOperator,
          });
        }
        break;
    }
  };

  //function handlers (end)

  //page display switch function
  renderSwitch(pageName) {
    switch (pageName) {
      case "homePage": //1
        return (
          <div className="centerBlock">
            <h1 className="cover-heading">1st Page (homePage)</h1>
            <button
              className="btn btn-primary m-3"
              onClick={this.solveModeButtonPress}
            >
              Solve
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={this.gameModeButtonPress}
            >
              Multiplayer
            </button>
            <button
              className="btn btn-primary"
              onClick={this.enterSinglePlayerButtonPress}
            >
              Singleplayer
            </button>
          </div>
        );
      case "solvePage": //2
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <GameSolver />
          </div>
        );
      case "gamePage": //3
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              3rd Page (Create Room or Enter Room)
            </h1>
            <p>Multiplayer</p>
            <p>Enter your nickname</p>
            <input
              className="form-control mb-2"
              type="text"
              onChange={this.setStateName}
            ></input>
            <button
              className="btn btn-primary mr-1"
              onClick={this.createRoomButtonPress}
            >
              New Room
            </button>
            <button
              className="btn btn-primary ml-1"
              onClick={this.joinRoomButtonPress}
            >
              Join Room
            </button>
          </div>
        );
      case "createRoomPage": //4
        return (
          <div>
            <MenuSetting
              slotNumChangeHandler={this.slotNumChangeHandler}
              targetNumChangeHandler={this.targetNumChangeHandler}
              menuCloseHandler={this.menuCloseHandler}
              onOneOrAllAnswerRadioButton={
                this.oneOrAllAnswerRadioButtonHandler
              }
              onRangeOfAvailableNumberLowBoundInput={
                this.rangeOfAvailableNumberLowBoundInputHandler
              }
              onRangeOfAvailableNumberHighBoundInput={
                this.rangeOfAvailableNumberHighBoundInputHandler
              }
              onMaxRepeatNumInput={this.maxRepeatNumInputHandler}
              onTimeBetweenRoundInput={this.timeBetweenRoundInputHandler}
              onNumOfRoundInput={this.numOfRoundInputHandler}
              onAvailableOperatorCheckbox={
                this.availableOperatorCheckboxHandler
              }
              slotNum={this.state.gameModeBasicSetting.slotNum}
              targetNum={this.state.gameModeBasicSetting.targetNum}
              showMenuBoolean={this.state.gameModeSettingMenuOpen}
              oneOrAllAnswerShown={this.state.oneOrAllAnswerShown}
              rangeOfAvailableNumberLowBound={
                this.state.rangeOfAvailableNumberLowBound
              }
              rangeOfAvailableNumberHighBound={
                this.state.rangeOfAvailableNumberHighBound
              }
              maxRepeatNum={this.state.maxRepeatNum}
              timeBetweenRound={this.state.timeBetweenRound}
              numOfRound={this.state.numOfRound}
              availableOperator={this.state.availableOperator}
            ></MenuSetting>
            <button
              className="btn btn-info m-3 topRightCorner"
              style={{
                display:
                  this.state.gameModeSettingMenuOpen === false
                    ? "block"
                    : "none",
              }}
              onClick={() => {
                this.setState({
                  gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
                });
              }}
            >
              Setting
            </button>
            <CancelRoomCreateButton
              onCancel={this.cancelRoomCreateButtonPress}
            ></CancelRoomCreateButton>
            <div
              style={{
                display:
                  this.state.gameModeSettingMenuOpen === false
                    ? "block"
                    : "none",
              }}
            >
              <h1 className="cover-heading">
                4th Page
                <br />
                Nickname: {this.state.username}
                <br />
                Room Number: {this.state.roomNumber}
                <br />
                Please wait for other players to join
              </h1>
              <button
                className="btn btn-primary m-3"
                onClick={this.startGameButtonPress}
              >
                Start
              </button>
            </div>
          </div>
        );
      case "joinRoomNumPage": //5
        return (
          <div>
            <CancelRoomCreateButton
              onCancel={this.cancelRoomCreateButtonPress}
            ></CancelRoomCreateButton>
            <h1 className="cover-heading">
              5th Page
              <br />
              Please Enter the Room #
            </h1>
            <p>
              Your nickname: <strong>{this.state.username}</strong>
            </p>
            <form>
              <div className="row">
                <div className="col">
                  <NameInputUI
                    onEnterName={this.joinRoomKeyButtonPress}
                    onChange={this.setStateName}
                  ></NameInputUI>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <form className="form-inline justify-content-center">
                    <div className="form-group mx-sm-3 mb-2">
                      <label for="inputPassword2" className="sr-only">
                        Password
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="inputPassword2"
                        placeholder="Room Number"
                        onChange={(event) =>
                          this.setState({ roomNumber: event.target.value })
                        }
                      />
                    </div>
                    <button
                      className="btn btn-primary mb-2"
                      onClick={this.joinRoomKeyButtonPress}
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>
            </form>
          </div>
        );
      case "waitForHostPage": //6
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              6th Page
              <br />
              Waiting For the Host to Start the Game
            </h1>
            <button
              className="btn btn-primary m-3"
              onClick={this.exitRoomKeyButtonPress}
            >
              Exit the Room
            </button>
          </div>
        );
      case "multiPlayerGamePage": //7
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">Game In Progress...(multiplayer)</h1>
          </div>
        );
      case "singlePlayerGamePage": //8
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">Game In Progress...(singleplayer)</h1>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="background">
        {this.renderSwitch(this.state.pageController)}
      </div>
    );
  }
}

export default App;
