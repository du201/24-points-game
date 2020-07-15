import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import ReturnHomePageButton from "./components/ReturnHomePageButton";
import CancelRoomCreateButton from "./components/CancelRoomCreateButton";
import GameSolver from "./components/GameSolver";
import MenuSetting from "./components/MenuSetting";
import NameInputUI from "./components/NameInputUI";
import GameBoard from "./components/GameBoard";
import io from "socket.io-client";
import tabImage from "./tabImage.png";
import calculate from "./calculate.js";
import checkValid from "./checkValid.js";
import Roster from "./components/Roster";
//import $ from "jquery";
import RoomNumInput from "./components/RoomNumInput";


const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
let operators = [TIMES, DIVIDES, PLUS, MINUS];

const server = "http://localhost:2000";
const socket = io.connect(server);

class App extends Component {
  state = {
    //below are the local states (not received from the server)
    pageController: "homePage", //default should be homePage
    username: "", //the username during the game
    gameModeSettingMenuOpen: false, //controls the display of the game mode setting menu in page 4
    gameModeBasicSetting: { slotNum: 4, targetNum: 24 }, //use as dynamic source in client side
    rangeOfAvailableNumberLowBound: 1,
    rangeOfAvailableNumberHighBound: 13,
    maxRepeatNum: 4, //the maximum number of repeated number possible
    timeBetweenRound: 30000, //the time of each round in ms, in client the display is s
    numOfRound: 10, //number of rounds in multi-player mode
    availableOperator: operators, //the operators available for players to use in their expressions
    expressionInput: [], //array of string, the inputed expression from the user
    answer: null, //int, the calculated answer of the input expression 

    //Below are the signals received from the server
    roomNumber: null,
    multiplayerGameNumbers: [4, 6, 8, 10], //if online mode, get this from the server. if offline, autogenerate this
    playerRoster: [], //array of string, the name of all the players in the room
    playerSolved: [], //array of string, the name of the players who solve the game in the current round
    roomNumMaxDigitNum: 4, //the maximum number of digits for room number, default is 4
  };

  //helper functions (start)
  /**
   * Return false if the name is invalid, the name must be between 1 to 20 letters
   */
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
  /**
   * In 1st page
   * In home page, choose the game mode (instead of single-player mode or solve mode) 
   */
  gameModeButtonPress = () => {
    this.setState({
      pageController: "gamePage", //to page 3
    });
  };

  /**
   * In 1st page
   * In home page, choose the solve mode
   */
  solveModeButtonPress = () => {
    this.setState({
      pageController: "solvePage", //to page 2
    });
  };

  /**
   * Appears in multiple pages
   * return back to the home page
   */
  returnHomePageButtonPress = () => {
    this.setState({
      pageController: "homePage", //to page 1
    });
  };

  /**
   * In 4th page (the host) or the 6th page (the other players)
   * to exit the room and tell the server
   */
  exitRoomButtonPress = () => {
    this.setState({
      pageController: "gamePage", //to page 3
    });
    socket.emit("exitRoom");
  };

  /**
   * In page 3
   * The creator of the room uses this to request the server for a room
   */
  createRoomButtonPress = () => {
    if (this.hasValidUsername()) {
      socket.emit("createRoom", this.state.username);
      socket.once("createRoomSuccess", (roomNum) => {
        this.setState({
          pageController: "createRoomPage", //to page 4
          roomNumber: roomNum, //string
          gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
        });
        //be able to see who is currently in the room
        //also be able to see who is in the room and who solved the problem during the game
        socket.on("roster", (roster) => {
          this.setState({ playerRoster: roster });
        });
      });
      socket.once("createRoomFailure", (msg) => {
        alert(msg); //1. noRoomsAvailable - all room numbers are used
      });
    } else {
      alert("please enter a valid nickname");
    }
  };

  /**
   * In page 3
   * The player (not the game host) goes to the 5th page where the room number he/she wants
   * to join is to be entered
   */
  joinRoomButtonPress = () => {
    if (this.hasValidUsername()) {
      this.setState({
        pageController: "joinRoomNumPage", //to 5th page
      });
    } else {
      alert("please enter a valid nickname");
    }
  };

  /**
   * In page 4th (the game setting page)
   * the creator of the game room uses this function to start the multi-player game
   */
  startGameButtonPress = () => {
    this.setState({
      pageController: "multiPlayerGamePage", //to 7th page
    });
    socket.emit("startGame");
  };


  /**
   * in page 5
   * the player presses this button to enter the game room with the specified room number
   * 
   */

  joinRoomKeyButtonPress = () => {
    socket.emit("joinRoom", {
      username: this.state.username,
      room: this.state.roomNumber,
    });

    socket.once("joinRoomSuccess", () => {
      this.setState({
        pageController: "waitForHostPage",
      });
      //be able to see the current players waiting in the room while in the wait room
      //also be able to see the player list and who has solved the problem in the game room
      socket.on("roster", (roster) => {
        this.setState({ playerRoster: roster });
      });
      //start to wait for the host to start the game and then go to the "multiPlayerGamePage"
      socket.on("gameStarted", ({ numOfSlots, targetNumber, availableOperators, rangeLo,
        rangeHi, maxNumOfRepeats, roundInterval, numOfRounds }) => {
        //go to the game page
        this.setState({ pageController: "multiPlayerGamePage", });
        //adopt the settings set by the game host
        this.setState({
          gameModeBasicSetting: { slotNum: numOfSlots, targetNum: targetNumber },
          availableOperator: availableOperators,
          rangeOfAvailableNumberLowBound: rangeLo,
          rangeOfAvailableNumberHighBound: rangeHi,
          maxRepeatNum: maxNumOfRepeats,
          timeBetweenRound: roundInterval,
          numOfRound: numOfRounds
        });
      });

      //if the host of the room exits, all the players go back to the third page
      socket.once("roomClosed", () => {
        alert("The host has closed the room. You are kicked out of the room");
        this.setState({ pageController: "gamePage" });
      })
    });

    socket.once("joinRoomFailure", (msg) => {
      switch (msg) {
        case "roomDoesNotExist":
          alert("This room does not exist, please try another room number");
          break;
        case "invalidRoomNumber":
          alert("The room number entered is not valid. It is a 4-digit number");
          break;
        case "usernameTaken":
          alert("The username has already been taken, please try another username");
          break;
        case "gameInProgress":
          alert("The game has already started in this room. You can either wait until the game finishes or enter another room instead");
          break;
        default:
          break;
      }
    });
  };

  /**
   * In page 1st
   * enter the single mode
   */
  enterSinglePlayerButtonPress = () => {
    this.setState({
      pageController: "singlePlayerGamePage", //to page 8th
    });
  };

  //functions to switch between pages & send message to server (end)

  //function handlers (start)
  /**
   * change the value of the number of slots for multi-player game
   */
  slotNumChangeHandler = (event) => {
    let copy_gameModeSetting = { ...this.state.gameModeBasicSetting };
    copy_gameModeSetting.slotNum = parseInt(event.target.value, 10);
    this.setState({ gameModeBasicSetting: copy_gameModeSetting });
  };

  /**
   * 
   * change the value of the target number for multi-player game
   */
  targetNumChangeHandler = (event) => {
    let copy_gameModeSetting = { ...this.state.gameModeBasicSetting };
    copy_gameModeSetting.targetNum = parseInt(event.target.value, 10);
    this.setState({ gameModeBasicSetting: copy_gameModeSetting });
  };

  /**
   * save the menu setting, close the display, and send the data to the server side
   */
  menuCloseHandler = () => {
    this.setState({
      gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
    });
    let settingPackageObject = {
      numOfSlots: this.state.gameModeBasicSetting.slotNum, //int
      targetNumber: this.state.gameModeBasicSetting.targetNum, //int
      availableOperators: this.state.availableOperator, //array of string
      rangeLo: this.state.rangeOfAvailableNumberLowBound, //int
      rangeHi: this.state.rangeOfAvailableNumberHighBound, //int
      maxNumOfRepeats: this.state.maxRepeatNum, //int
      roundInterval: this.state.timeBetweenRound, //int (ms)
      numOfRounds: this.state.numOfRound, //int
    };
    socket.emit("changeSettings", settingPackageObject);
    console.log(settingPackageObject);
  };

  /**
   * set the username from the user input
   */
  setStateName = (event) => {
    this.setState({ username: event.target.value });
  };

  /**
   * set the value for rangeOfAvailableNumberLowBound
   */
  rangeOfAvailableNumberLowBoundInputHandler = (event) => {
    this.setState({ rangeOfAvailableNumberLowBound: parseInt(event.target.value, 10) });
  };

  /**
   * set the value for rangeOfAvailableNumberHighBound
   */
  rangeOfAvailableNumberHighBoundInputHandler = (event) => {
    this.setState({ rangeOfAvailableNumberHighBound: parseInt(event.target.value, 10) });
  };

  /**
   * set the value for maxRepeatNumInput
   */
  maxRepeatNumInputHandler = (event) => {
    this.setState({ maxRepeatNum: parseInt(event.target.value, 10) });
  };

  /**
   * set the value for the time of each round 
   */
  timeBetweenRoundInputHandler = (event) => {
    this.setState({ timeBetweenRound: parseInt(event.target.value, 10) });
  };

  /**
   * used by the slider that accepts only 10, 15, or 20 for the number of round per game
   */
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

  /**
   * the checkbox that controls the available operators during the game
   * @param {checkbox} event 
   */
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
      default:
        break;
    }
  };

  /**
   * When press the button, add the corresponding number or operator to the input expression
   * @param {string} eachNum the number or operator string associated with the button 
   */
  addToInputHandler = (eachNum) => {
    let copy_expressionInput = [...this.state.expressionInput];
    copy_expressionInput.push(eachNum.toString());
    this.setState({ expressionInput: copy_expressionInput });
  }

  /**
   * When click the "DEL" button, delete a number or operator string from the input expression
   */
  deleteInputHandler = () => {
    let copy_expressionInput = [...this.state.expressionInput];
    if (copy_expressionInput.length >= 0) {
      copy_expressionInput.pop();
      this.setState({ expressionInput: copy_expressionInput });
    }
  }

  /**
   * This is able to handle digits other than 4
   * @param {int} num the number whose digits are going to be separated 
   * @returns {array of int} the digits of the number from left to right
   */
  getDigits = (num) => {
    //create an int array with this.state.roomNumMaxDigitNum as the number of entries
    let digits = [];
    for (let i = this.state.roomNumMaxDigitNum - 1; i >= 0; i--) {
      digits.push(0);
    }

    //build the int array with the digit from the num. Padding array with 0 if num doesn't have that many digits
    let digits_lastIndex = digits.length - 1;
    while (num >= 10) {
      digits[digits_lastIndex] = num % 10;
      digits_lastIndex -= 1;
      num = Math.floor(num / 10);
    }
    digits[digits_lastIndex] = num;
    return digits;
  }

  /**
   * This is able to handle digits other than 4
   * @param {array of int} digits the digits of the number from left to right
   * @returns {int} the number represented by the input digits array
   */
  numberReform = (digits) => {
    let timeFactor = 1;
    let number = 0;
    for (let i = this.state.roomNumMaxDigitNum - 1; i >= 0; i--) {
      number += timeFactor * digits[i];
      timeFactor *= 10;
    }
    return number;
  }
  /**
   * This has not yet been able to handle digits other than 4 (due to the switch case part)
   * Set the value of the room number with four separate input boxes
   * @param {onChange} e 
   */
  setRoomNum(e) {
    if (e.target.value.length === 0) {
      return;
    }
    let roomNumber = this.state.roomNumber;
    let digits = this.getDigits(roomNumber);
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, 1);
    }
    let digit = e.target.value;
    switch (e.target.id) {
      case "first":
        digits[0] = digit;
        this.setState({ roomNumber: this.numberReform(digits) });
        break;
      case "second":
        digits[1] = digit;
        this.setState({ roomNumber: this.numberReform(digits) });
        break;
      case "third":
        digits[2] = digit;
        this.setState({ roomNumber: this.numberReform(digits) });
        break;
      case "last":
        digits[3] = digit;
        this.setState({ roomNumber: this.numberReform(digits) });
        break;
    }
  };



  /**
   * calculate the value of the inputed expression and send the expression to the server if it's valid
   */
  calculateExpressionHandler = () => {
    if (checkValid(this.state.expressionInput)) { //check the basic validity
      let result = calculate(this.state.expressionInput);
      //checkPostfixValid(result);
      if (result === "Invalid") {
        this.setState({ answer: "Invalid" });
      } else {
        this.setState({ answer: result });
        socket.emit("sendSolution", this.state.expressionInput);
      }
    }
    else {
      this.setState({ answer: "Invalid" });
    }
  }
  //function handlers (end)

  //page display switch function
  renderSwitch(pageName) {
    switch (pageName) {
      case "homePage": //1
        return (
          <div className="container h-100">
            <div className="row h-25"></div>
            <div className="row h-25">
              <div className="col text-center my-auto">
                <h1>1st Page (homePage)</h1>
              </div>
            </div>
            <div className="row h-25">
              <div className="col text-center my-auto">
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
            </div>
            <div className="row h-25"></div>
          </div>
        );
      case "solvePage": //2
        return (
          <div className="container-fluid h-100">
            <div className="row">
              <div className="col my-auto">
                <ReturnHomePageButton
                  onReturn={this.returnHomePageButtonPress}
                ></ReturnHomePageButton>
              </div>
            </div>
            <div className="row h-50">
              <div className="col text-center my-auto">
                <GameSolver />
              </div>
            </div>
            <div className="row">
            </div>
          </div>
        );
      case "gamePage": //3
        return (
          <div className="container-fluid h-100">
            <div className="row h-25">
              <div className="col my-auto">
                <ReturnHomePageButton
                  onReturn={this.returnHomePageButtonPress}
                ></ReturnHomePageButton>
              </div>
            </div>
            <div className="row h-25">
              <div className="col text-center my-auto">
                <h1>
                  3rd Page (Create Room or Enter Room)
                </h1>
              </div>
            </div>
            <div className="row h-25">
              <div className="col text-center my-auto">
                <p>Enter your nickname</p>
                <input
                  className="form-control mb-2"
                  type="text"
                  maxLength="15"
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

            </div>
            <div className="row h-25">
            </div>
          </div>

        );
      case "createRoomPage": //4
        return (
          <div className="container-fluid h-100">
            {this.state.gameModeSettingMenuOpen === true ?
              <div className="row h-100">
                <div className="col">
                  <MenuSetting
                    slotNumChangeHandler={this.slotNumChangeHandler}
                    targetNumChangeHandler={this.targetNumChangeHandler}
                    menuCloseHandler={this.menuCloseHandler}
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
                </div>
              </div>
              :
              <div className="h-100 w-100">
                <div className="row h-25">
                  <div className="col my-auto">
                    <CancelRoomCreateButton
                      onCancel={this.exitRoomButtonPress}
                    ></CancelRoomCreateButton>
                    <button
                      className="btn btn-info m-3 topRightCorner"
                      onClick={() => {
                        this.setState({
                          gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
                        });
                      }}
                    >
                      Setting
                    </button>
                  </div>
                </div>
                <div className="row h-25">
                  <div className="col text-center my-auto">
                    <h1 className="cover-heading">
                      4th Page
                      <br />
                      Nickname: {this.state.username}
                      <br />
                      Room Number: {this.state.roomNumber}
                      <br />
                      Please wait for other players to join
                    </h1>
                  </div>
                </div>
                <div className="row h-25">
                  <div className="col text-center my-auto">
                    <button
                      className="btn btn-primary m-3"
                      onClick={this.startGameButtonPress}
                    >
                      Start
                    </button>
                  </div>
                </div>
                <div className="row h-25 justify-content-center">
                  <div className="col-6 pt-2 overflow-auto h-100">
                    <Roster
                      playerRoster={this.state.playerRoster}
                      playerSolved={this.state.playerSolved}
                      pageController={this.state.pageController}
                    ></Roster>
                  </div>
                </div>
              </div>}
          </div>

        );
      case "joinRoomNumPage": //5
        return (
          <div className="container-fluid h-100">
            <div className="row h-25">
              <div className="col my-auto">
                <CancelRoomCreateButton
                  onCancel={this.exitRoomButtonPress}
                ></CancelRoomCreateButton>
              </div>
            </div>
            <div className="row h-25">
              <div className="col text-center my-auto">
                <h1 className="cover-heading">
                  5th Page
                <br />
                Please Enter the Room #
                </h1>
                <p>
                  Your nickname: <strong>{this.state.username}</strong>
                </p>
              </div>
            </div>
            <div className="row h-25">
              <div className="col text-center h-100">
                <div className="row h-50">
                  <div className="col">
                    <NameInputUI
                      onChange={this.setStateName}
                    ></NameInputUI>
                  </div>
                </div>

                <div className="row h-50 justify-content-center">
                  <RoomNumInput
                    setRoomNum={(e) => this.setRoomNum(e)}
                    roomNumber={this.state.roomNumber}
                  ></RoomNumInput>
                </div>
              </div>
            </div>
            <div className="row h-25 justify-content-center">
              <div className="col col-auto align-self-center">
                <button
                  className="btn btn-primary mb-2"
                  onClick={this.joinRoomKeyButtonPress}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        );
      case "waitForHostPage": //6
        return (
          <div className="container-fluid h-100">
            <div className="row h-25">
              <div className="col my-auto">
                <button
                  className="btn btn-primary m-3"
                  onClick={this.exitRoomButtonPress}
                >
                  Exit the Room
            </button>
              </div>
            </div>
            <div className="row h-25">
              <div className="col text-center my-auto">
                <h1 className="cover-heading">
                  6th Page
                <br />
                Waiting For the Host to Start the Game
            </h1>
              </div>
            </div>
            <div className="row h-25 justify-content-center">
              <div className="col-6 pt-2 overflow-auto h-100">
                <Roster
                  playerRoster={this.state.playerRoster}
                  playerSolved={this.state.playerSolved}
                  pageController={this.state.pageController}
                ></Roster>
              </div>
            </div>
            <div className="row h-25">
            </div>
          </div>

        );
      case "multiPlayerGamePage": //7
        return (
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col col-2 h-100">
                <div className="row h-25">
                  <div className="col text-center my-auto h-50">
                    <ReturnHomePageButton
                      onReturn={this.returnHomePageButtonPress}
                    ></ReturnHomePageButton>
                  </div>
                </div>
                <div className="row h-25">
                  <div className="col text-center my-auto">
                    <h1>My Current Score: 100</h1>
                  </div>
                </div>
                <div className="row h-25">
                  <div className="col text-center my-auto">
                    <h1>My Name: Xin</h1>
                  </div>
                </div>
                <div className="row h-25">
                  <div className="col text-center my-auto">
                    <h1>Round: 6 / 10</h1>
                  </div>
                </div>
              </div>
              <div className="col col-8 h-100">
                <GameBoard
                  gameNumbers={this.state.multiplayerGameNumbers}
                  on_addToInput={this.addToInputHandler}
                  expressionInput={this.state.expressionInput}
                  targetNum={this.state.gameModeBasicSetting.targetNum}
                  operators={this.state.availableOperator}
                  on_deleteInput={this.deleteInputHandler}
                  on_calculateExpression={this.calculateExpressionHandler}
                  answer={this.state.answer}></GameBoard>
              </div>
              <div className="col col-2 h-100">
                <div className="row h-25">
                  <div className="col h-100 text-center">
                    Total Player#/ Player Solved#
                    <br />
                    {this.state.playerRoster.length}/{this.state.playerSolved.length}
                  </div>
                </div>
                <div className="row h-75">
                  <div className="col h-100 overflow-auto">
                    <Roster
                      playerRoster={this.state.playerRoster}
                      playerSolved={this.state.playerSolved}
                    ></Roster>
                  </div>
                  {/*
                  <div className="col pt-2 overflow-auto h-100">
                    <div className="card bg-info mb-1">
                      <div className="card-body">
                        <div>Xin</div>
                        <div>Yes</div>
                      </div>
                    </div>
                  </div>
                  */}
                </div>
              </div>
            </div>
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
      <div className="h-100">
        <Helmet>
          <meta charSet="UTF-8" />
          <title>
            {this.state.gameModeBasicSetting.targetNum.toString(10)}-points-game
          </title>
          <meta
            name="description"
            content="This is an online platform for playing 24-point-game with your friends"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{`
            body {
              background-color:pink
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* Firefox */
            input[type=number] {
              -moz-appearance: textfield;
            }         
          `}</style>
          <link rel="shortcut icon" href={tabImage} />
        </Helmet>
        {this.renderSwitch(this.state.pageController)}
      </div>
    );
  }
}

export default App;
