import React, { Component } from "react";

//imported API
import { Helmet } from "react-helmet";
import io from "socket.io-client";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//imported local classes/functions
import "./App.css";
import tabImage from "./tabImage.png";
import calculate from "./calculate.js";
import checkValid from "./checkValid.js";
//all the page files
import HomePage from "./components/HomePage"; //1
import SolvePage from "./components/SolvePage"; //2
import SelectPage from "./components/SelectPage"; //3
import HostPage from "./components/HostPage"; //4
import JoinRoomPage from "./components/JoinRoomPage"; //5
import WaitForHostPage from "./components/WaitForHostPage"; //6
import MultiGamePage from "./components/MultiGamePage"; //7
import SingleGamePage from "./components/SingleGamePage"; //8
import LoadingPage from "./components/LoadingPage"; //9
import CountDownPage from "./components/CountDownPage"; //10
import BetweenRoundPage from "./components/BetweenRoundPage"; //11

//defined const
const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
let operators = [TIMES, DIVIDES, PLUS, MINUS];

//the page const + page#
const HOMEPAGE = "homePage"; //1
const SOLVEPAGE = "solvePage"; //2
const SELECTPAGE = "gamePage"; //3
const HOSTPAGE = "createRoomPage"; //4
const JOINROOMPAGE = "joinRoomNumPage"; //5
const WAITFORHOSTPAGE = "waitForHostPage"; //6
const MULTIGAMEPAGE = "multiPlayerGamePage"; //7
const SINGLEGAMEPAGE = "singlePlayerGamePage"; //8
const LOADINGPAGE = "gameLoadingPage"; //9
const COUNTDOWNPAGE = "preGameCountDownPage"; //10
const BTWROUNDPAGE = "betweenRoundPage"; //11

//the messages between client and server
const CREATE_ROOM = "createRoom";
const JOIN_ROOM = "joinRoom";
const EXIT_ROOM = "exitRoom";
const CHANGE_SETTINGS = "changeSettings";
const START_GAME = "startGame";
const SEND_SOLUTION = "sendSolution";
const CREATE_ROOM_SUCCESS = "createRoomSuccess";
const CREATE_ROOM_FAILURE = "createRoomFailure";
const JOIN_ROOM_SUCCESS = "joinRoomSuccess";
const JOIN_ROOM_FAILURE = "joinRoomFailure";
const ROSTER = "roster";
const SETTINGS = "settings";
const TIMER = "timer";
const GAME_STARTED = "gameStarted";
const NEW_ROUND = "newRound";
const END_ROUND = "endRound";
const SOLUTION_CORRECT = "solutionCorrect";
const SOLUTION_INCORRECT = "solutionIncorrect";
const PLAYER_SOLVED = "playerSolved";
const CONNECT_TIMEOUT = "connectionTimeOut";
const ROOM_CLOSED = "roomClosed";
//start listening to disconnect after entering a room (either as a host or player)
//stop listening to disconnect after quitting from a room (either through the exit button or the disconnect listener)
const DISCONNECT = "disconnect";

const server = "http://localhost:2000";
const socket = io.connect(server);
toast.configure();
class App extends Component {
  state = {
    //below are the local states (not received from the server)
    pageController: HOMEPAGE, //default should be homePage
    username: "", //the username during the game
    gameModeSettingMenuOpen: false, //controls the display of the game mode setting menu in page 4

    //below are the settings for the multi-player game
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
    //default can be [4, 6, 8, 10]
    multiplayerGameNumbers: [], //if online mode, get this from the server. if offline, autogenerate this
    //default can be [false, false, false, false]
    multiplayerButtonDisable: [], //whether or not a button is disabled
    playerRoster: [], //array of string, the name of all the players in the room
    playerSolved: [], //array of string, the name of the players who solve the game in the current round
    roomNumMaxDigitNum: 4, //the maximum number of digits for room number, default is 4
    timeInGame: 5, //in s, the time sent by the server and displayed in the browser
    whichRound: 0, //which round do we currently in
    //default can be"3+5*2"
    solution: "", //the solution solved by the computer for the problem in the current round
    //the top three solutions (if there are three) done by the players for the problem in the current round
    playerSolutions: [],
    playerRanking: 1, //the score ranking of the player in the room
    multiplayerScore: 0, //the score received from the server for the current round
    multiplayerTotalScore: 0, //the score received from the server for the whole game
    correctOrNotText: "", //the text indicated the judgement from the server
    //the top three scores of the players, default can be [{ name: "Joseph", score: 100 }, { name: "Williams", score: 50 }, { name: "Gang", score: 30 }]
    scoreRanking: [],
    submitButtonDisable: false, //once the answer is deemed to be correct by the server, disable all the buttons
  };

  /**
   * Return false if the name is invalid, the name must be between 1 to 15 letters
   */
  hasValidUsername = () => {
    let name = this.state.username;
    return !(name === undefined || name === "");
  };


  /**
   * 
   * @param {string} message the text that you want it to appear in the error toast 
   */
  notifyError = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  /**
   * Remove all the entries that has the value value from the array
   */
  arrayRemove = (arr, value) => {
    return arr.filter((ele) => {
      return ele !== value;
    });
  };

  /**
   * In 1st page
   * In home page, choose the game mode (instead of single-player mode or solve mode) 
   */
  gameModeButtonPress = () => {
    this.setState({
      pageController: SELECTPAGE, //to page 3
    });
  };

  /**
   * In 1st page
   * In home page, choose the solve mode
   */
  solveModeButtonPress = () => {
    this.setState({
      pageController: SOLVEPAGE, //to page 2
    });
  };

  /**
   * Appears in multiple pages
   * return back to the home page
   */
  returnHomePageButtonPress = () => {
    this.setState({
      pageController: HOMEPAGE, //to page 1
    });
  };

  /**
   * Open or close the settings menu
   */
  switchSettingsMenu = () => {
    this.setState({
      gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
    });
  };

  /**
   * In 4th page (the host) or the 6th page (the other players)
   * to exit the room and tell the server
   * There is a confirm window before the action of exiting really happens
   */
  exitRoomButtonPress = () => {
    confirmAlert({
      title: 'Confirm to Exit the Room',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.setState({
              pageController: SELECTPAGE, //to page 3
            });
            socket.emit(EXIT_ROOM);

            this.stopListenToGameEvent();
            //set all of the game-related states back to default
            this.backToDefaultAllStates();
            //unlisten to this when exit the room
            this.serverDisconnectUnlisten();
          }
        },
        {
          label: 'No',
        }
      ]
    });
  };

  /**
   * When quittin gthe game, stop listening to all these events
   */
  stopListenToGameEvent = () => {
    socket.removeAllListeners(TIMER);
    socket.removeAllListeners(ROSTER);
    socket.removeAllListeners(NEW_ROUND);
    socket.removeAllListeners(END_ROUND);
    socket.removeAllListeners(SOLUTION_INCORRECT);
    socket.removeAllListeners(SOLUTION_CORRECT);
    socket.removeAllListeners(PLAYER_SOLVED);
  };
  /**
   * Set all the states back to their default value
   * Needs further editing during the developing process
   */
  backToDefaultAllStates = () => {
    this.backToDefaultSettings();
    this.setState({
      username: "",
      gameModeSettingMenuOpen: false,
      expressionInput: [],
      answer: null,
      roomNumber: null,
      multiplayerGameNumbers: [],
      multiplayerButtonDisable: [],
      playerRoster: [],
      playerSolved: [],
      timeInGame: 5,
      whichRound: 0,
      solution: "",
      playerSolutions: [],
      playerRanking: 1,
      multiplayerScore: 0,
      multiplayerTotalScore: 0,
      correctOrNotText: "",
      scoreRanking: [],
    });
  };
  /**
   * Use this function after starting connnecting to the server
   * Reset everything to default just like exitRoomButton
   */
  serverDisconnectListen = () => {
    socket.on(DISCONNECT, () => {
      this.notifyError("Disconnected from the Server, go back to the home page");
      this.stopListenToGameEvent();
      //set all of the game-related states back to default
      this.backToDefaultAllStates();
      this.setState({
        pageController: HOMEPAGE, //to page 1
      });
      //unlisten to the disconnect when go back to the home page
      this.serverDisconnectUnlisten();
    });
  };

  /**
   * Stop listening to the disconnect event
   */
  serverDisconnectUnlisten = () => {
    socket.removeAllListeners(DISCONNECT);
  };

  /**
   * In page 3
   * The creator of the room uses this to request the server for a room
   */
  createRoomButtonPress = () => {
    if (this.hasValidUsername()) {
      socket.emit(CREATE_ROOM, this.state.username);
      socket.once(CREATE_ROOM_SUCCESS, (roomNum) => {
        this.serverDisconnectListen();
        this.setState({
          pageController: HOSTPAGE, //to page 4
          roomNumber: roomNum, //string
          gameModeSettingMenuOpen: !this.state.gameModeSettingMenuOpen,
        });

        //be able to see who is currently in the room
        //also be able to see who is in the room and who solved the problem during the game
        socket.on(ROSTER, (roster) => {
          this.setState({ playerRoster: roster });
        });
      });
      socket.once(CREATE_ROOM_FAILURE, (msg) => {
        this.notifyError(msg); //1. noRoomsAvailable - all room numbers are used
      });
    } else {
      this.notifyError("please enter a valid nickname");
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
        pageController: JOINROOMPAGE, //to 5th page
      });
    } else {
      this.notifyError("please enter a valid nickname");
    }
  };

  /**
   * In page 4th (the game setting page)
   * the creator of the game room uses this function to start the multi-player game
   */
  startGameButtonPress = () => {
    socket.emit(START_GAME);
    //first go to the loading page while waiting for the server to finish calculating
    this.setState({
      pageController: LOADINGPAGE, //to 9th page
    });
    this.startGame();
  };


  /**
   * Start the game after receive the GAME_STARTED
   */
  startGame = () => {
    socket.once(GAME_STARTED, (settings) => {
      //go to the game page
      this.setState({ pageController: COUNTDOWNPAGE, });
      //adopt the settings set by the game host
      this.settingsReassign(settings);
      socket.on(TIMER, (time) => {
        this.setState({ timeInGame: time });
      });
      socket.on(NEW_ROUND, ({ numbers, settings }) => {
        console.log("NEW_ROUND");
        //increase the round number by 1
        this.setState({ whichRound: this.state.whichRound + 1 });
        this.settingsReassign(settings);
        this.setState({ multiplayerGameNumbers: numbers });
        //create a multiplayerButtonDisable array that has the same length as multiplayerGameNumbers
        this.createButtonDisableStatus(numbers);
        //always put the page changing mechanism at the end to insure proper rendering
        this.setState({ pageController: MULTIGAMEPAGE, });
        //listen to the response from the server about the correctness of the submitted answer
        socket.on(SOLUTION_CORRECT, ({ score, totalScore }) => {
          this.setState({
            multiplayerScore: score,
            multiplayerTotalScore: totalScore,
            correctOrNotText: "Your Answer is Correct!",
            submitButtonDisable: true,
          });
          console.log("SOLUTION_CORRECT");
        });
        socket.on(SOLUTION_INCORRECT, ({ deductedScore, totalScore }) => {
          this.setState({
            multiplayerTotalScore: totalScore,
            correctOrNotText: "Your Answer is Incorrect!",
          });
          console.log("SOLUTION_INCORRECT");
        });
        //updating the roster on the side of the gameboard
        socket.on(PLAYER_SOLVED, (playerSolved) => {
          this.setState({ playerSolved: playerSolved });
          console.log("PLAYER_SOLVED");
        });
      });

      socket.on(END_ROUND, ({ solution, playerSolutions, scoreRanking, playerRanking }) => {
        console.log("END_ROUND");
        if (solution === null) {
          this.setState({ solution: "no solution for this problem" });
        } else {
          this.setState({ solution: solution });
        }
        this.setState({
          playerSolutions: playerSolutions,
          playerRanking: playerRanking,
          scoreRanking: scoreRanking
        });
        //empty some states to prepare for the next round
        this.setState({ correctOrNotText: "" });
        this.setState({ multiplayerScore: 0 });
        this.setState({ playerSolved: [] });
        this.setState({ expressionInput: [] });
        this.setState({ answer: null });
        this.setState({ submitButtonDisable: false });
        //stop listen to some game events to prevent duplicate listeners on the same event
        socket.removeAllListeners(SOLUTION_INCORRECT);
        socket.removeAllListeners(SOLUTION_CORRECT);
        socket.removeAllListeners(PLAYER_SOLVED);
        //always put the page changing mechanism at the end to insure proper rendering
        this.setState({ pageController: BTWROUNDPAGE });
      });
    });
  }

  /**
   * create the multiplayerButtonDisable default state
   * @param {array of int} numbers the game numbers passed by the server 
   */
  createButtonDisableStatus = (numbers) => {
    let buttonDisableStatus = [];
    for (let i = 0; i < numbers.length; i++) {
      buttonDisableStatus.push(false);
    }
    this.setState({ multiplayerButtonDisable: buttonDisableStatus });
  }


  /**
   * This function is used when the server sends settings data to the client
   * @param settings all of the settings parameters
   */
  settingsReassign = ({ numOfSlots, targetNumber, availableOperators, rangeLo,
    rangeHi, maxNumOfRepeats, roundInterval, numOfRounds }) => {
    this.setState({
      gameModeBasicSetting: { slotNum: numOfSlots, targetNum: targetNumber },
      availableOperator: availableOperators,
      rangeOfAvailableNumberLowBound: rangeLo,
      rangeOfAvailableNumberHighBound: rangeHi,
      maxRepeatNum: maxNumOfRepeats,
      timeBetweenRound: roundInterval,
      numOfRound: numOfRounds
    });
  }


  /**
   * in page 5
   * the player presses this button to enter the game room with the specified room number
   * The non-host way to enter the gameroom
   */

  joinRoomKeyButtonPress = () => {
    socket.emit(JOIN_ROOM, {
      username: this.state.username,
      room: this.state.roomNumber,
    });

    socket.once(JOIN_ROOM_SUCCESS, () => {
      this.serverDisconnectListen();
      this.setState({
        pageController: WAITFORHOSTPAGE,
      });
      //be able to see the current players waiting in the room while in the wait room
      //also be able to see the player list and who has solved the problem in the game room
      socket.on(ROSTER, (roster) => {
        this.setState({ playerRoster: roster });
      });
      //start to wait for the host to start the game and then go to the "multiPlayerGamePage"
      this.startGame();

      //if the host of the room exits, all the players go back to the third page
      socket.once(ROOM_CLOSED, () => {
        this.notifyError("The host has closed the room. You are removed from the room");
        this.setState({ pageController: SELECTPAGE });
      })
    });

    socket.once(JOIN_ROOM_FAILURE, (msg) => {
      switch (msg) {
        case "roomDoesNotExist":
          this.notifyError("This room does not exist, please try another room number");
          break;
        case "invalidRoomNumber":
          this.notifyError("The room number entered is not valid. It is a 4-digit number");
          break;
        case "usernameTaken":
          this.notifyError("The username has already been taken, please try another username");
          break;
        case "gameInProgress":
          this.notifyError("The game has already started in this room. You can either wait until the game finishes or enter another room instead");
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
      pageController: SINGLEGAMEPAGE, //to page 8th
    });
  };

  /**
   * change the value of the number of slots for multi-player game
   */
  slotNumChangeHandler = (event) => {
    let copy_gameModeSetting = { ...this.state.gameModeBasicSetting };
    copy_gameModeSetting.slotNum = parseInt(event.target.value, 10);
    this.setState({ gameModeBasicSetting: copy_gameModeSetting });
  };

  /**
   * When no solution exists for the current problem
   * sends null to the server in the SEND_SOLUTION event
   */
  noSolutionHandler = () => {
    socket.emit(SEND_SOLUTION, null);
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
    socket.emit(CHANGE_SETTINGS, settingPackageObject);
    //receive the final version of the settings from the server and apply that to the client
    socket.once(SETTINGS, (settings) => {
      this.settingsReassign(settings);
    });
  };

  /**
   * Change the multi-player game settings back to default value
   */
  backToDefaultSettings = () => {
    this.setState({
      gameModeBasicSetting: { slotNum: 4, targetNum: 24 },
      availableOperator: [TIMES, DIVIDES, PLUS, MINUS],
      rangeOfAvailableNumberLowBound: 1,
      rangeOfAvailableNumberHighBound: 13,
      maxRepeatNum: 4,
      timeBetweenRound: 30000,
      numOfRound: 10,
    });
  }

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
   * @param {int} eachNum the number or operator string associated with the button 
   */
  addToInputHandler = (eachNum, index) => {
    let copy_disableStatus = [...this.state.multiplayerButtonDisable];
    let copy_expressionInput = [...this.state.expressionInput];
    //disable the button being clicked
    if (copy_disableStatus[index] === false) {
      copy_disableStatus[index] = true;
    }
    this.setState({ multiplayerButtonDisable: copy_disableStatus });
    copy_expressionInput.push(eachNum.toString());
    this.setState({ expressionInput: copy_expressionInput });
  }

  /**
   * When click the "DEL" button, delete a number or operator string from the input expression
   */
  deleteInputHandler = () => {
    let copy_expressionInput = [...this.state.expressionInput];
    if (copy_expressionInput.length >= 0) {
      let deletedNum = parseInt(copy_expressionInput.pop(), 10);
      //find the first button that has the deleted number can recover its clickability
      for (let i = 0; i < this.state.multiplayerGameNumbers.length; i++) {
        if (deletedNum === this.state.multiplayerGameNumbers[i] && this.state.multiplayerButtonDisable[i] === true) {
          let copy_disableStatus = [...this.state.multiplayerButtonDisable];
          copy_disableStatus[i] = false;
          this.setState({ multiplayerButtonDisable: copy_disableStatus });
          break;
        }
      }
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
  setRoomNum = (e) => {
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
        this.setState({ answer: "The expression is invalid" });
      } else if (!this.allNumberUsed()) {
        this.setState({ answer: "You must use all of the numbers" });
      } else {
        this.setState({ answer: result });
        socket.emit(SEND_SOLUTION, this.state.expressionInput);
      }
    }

    else {
      this.setState({ answer: "The expression is invalid" });
    }
  }

  /**
   * @returns whether or not all the numbers (slots) are used during the game
   */
  allNumberUsed = () => {
    for (let i = 0; i < this.state.multiplayerButtonDisable.length; i++) {
      if (this.state.multiplayerButtonDisable[i] === false) {
        return false;
      }
    }
    return true;
  }

  //page display switch function
  renderSwitch(pageName) {
    switch (pageName) {
      case HOMEPAGE: //1
        return (
          <HomePage
            solveModeButtonPress={this.solveModeButtonPress}
            gameModeButtonPress={this.gameModeButtonPress}
            enterSinglePlayerButtonPress={this.enterSinglePlayerButtonPress}
          ></HomePage>
        );
      case SOLVEPAGE: //2
        return (
          <SolvePage
            returnHomePageButtonPress={this.returnHomePageButtonPress}
          ></SolvePage>
        );
      case SELECTPAGE: //3
        return (
          <SelectPage
            returnHomePageButtonPress={this.returnHomePageButtonPress}
            setStateName={this.setStateName}
            createRoomButtonPress={this.createRoomButtonPress}
            joinRoomButtonPress={this.joinRoomButtonPress}
          ></SelectPage>
        );
      case HOSTPAGE: //4
        return (
          <HostPage
            gameModeSettingMenuOpen={this.state.gameModeSettingMenuOpen}
            slotNumChangeHandler={this.slotNumChangeHandler}
            targetNumChangeHandler={this.targetNumChangeHandler}
            menuCloseHandler={this.menuCloseHandler}
            rangeOfAvailableNumberLowBoundInputHandler={
              this.rangeOfAvailableNumberLowBoundInputHandler
            }
            rangeOfAvailableNumberHighBoundInputHandler={
              this.rangeOfAvailableNumberHighBoundInputHandler
            }
            maxRepeatNumInputHandler={this.maxRepeatNumInputHandler}
            timeBetweenRoundInputHandler={this.timeBetweenRoundInputHandler}
            numOfRoundInputHandler={this.numOfRoundInputHandler}
            availableOperatorCheckboxHandler={
              this.availableOperatorCheckboxHandler
            }
            backToDefaultSettings={this.backToDefaultSettings}
            slotNum={this.state.gameModeBasicSetting.slotNum}
            targetNum={this.state.gameModeBasicSetting.targetNum}
            gameModeSettingMenuOpen={this.state.gameModeSettingMenuOpen}
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
            exitRoomButtonPress={this.exitRoomButtonPress}
            username={this.state.username}
            roomNumber={this.state.roomNumber}
            startGameButtonPress={this.startGameButtonPress}
            playerRoster={this.state.playerRoster}
            playerSolved={this.state.playerSolved}
            pageController={this.state.pageController}
            switchSettingsMenu={this.switchSettingsMenu}
          ></HostPage>
        );
      case JOINROOMPAGE: //5
        return (
          <JoinRoomPage
            exitRoomButtonPress={this.exitRoomButtonPress}
            username={this.state.username}
            setStateName={this.setStateName}
            setRoomNum={this.setRoomNum}
            roomNumber={this.state.roomNumber}
            joinRoomKeyButtonPress={this.joinRoomKeyButtonPress}
          ></JoinRoomPage>
        );
      case WAITFORHOSTPAGE: //6
        return (
          <WaitForHostPage
            exitRoomButtonPress={this.exitRoomButtonPress}
            playerRoster={this.state.playerRoster}
            playerSolved={this.state.playerSolved}
            pageController={this.state.pageController}
          ></WaitForHostPage>
        );
      case MULTIGAMEPAGE: //7
        return (
          <MultiGamePage
            exitRoomButtonPress={this.exitRoomButtonPress}
            multiplayerTotalScore={this.state.multiplayerTotalScore}
            username={this.state.username}
            whichRound={this.state.whichRound}
            numOfRound={this.state.numOfRound}
            gameNumbers={this.state.multiplayerGameNumbers}
            on_addToInput={this.addToInputHandler}
            expressionInput={this.state.expressionInput}
            targetNum={this.state.gameModeBasicSetting.targetNum}
            operators={this.state.availableOperator}
            on_deleteInput={this.deleteInputHandler}
            on_calculateExpression={this.calculateExpressionHandler}
            answer={this.state.answer}
            multiplayerButtonDisable={this.state.multiplayerButtonDisable}
            correctOrNotText={this.state.correctOrNotText}
            on_noSolution={this.noSolutionHandler}
            submitButtonDisable={this.state.submitButtonDisable}
            timeInGame={this.state.timeInGame}
            playerRosterLength={this.state.playerRoster.length}
            playerSolvedLength={this.state.playerSolved.length}
            playerRoster={this.state.playerRoster}
            playerSolved={this.state.playerSolved}
          ></MultiGamePage>
        );
      case SINGLEGAMEPAGE: //8
        return (
          <SingleGamePage
            returnHomePageButtonPress={this.returnHomePageButtonPress}
          ></SingleGamePage>
        );
      case LOADINGPAGE: //9: currently just for the host
        return (
          <LoadingPage></LoadingPage>
        );
      case COUNTDOWNPAGE: //10: for both the host and the player
        return (
          <CountDownPage
            timeInGame={this.state.timeInGame}
          ></CountDownPage>
        );
      case BTWROUNDPAGE: //11: the page being displayed between each round of the game
        return (
          <BetweenRoundPage
            whichRound={this.state.whichRound}
            solution={this.state.solution}
            playerSolutions={this.state.playerSolutions}
            timeInGame={this.state.timeInGame}
            playerRanking={this.state.playerRanking}
            scoreRanking={this.state.scoreRanking}
          ></BetweenRoundPage>
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
