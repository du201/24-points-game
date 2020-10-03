/** @author Zhengze Gong (harry8698). */
// Modified by Xin Du (du201)
// TODO: Write a summary for this file.
import Solver from "../solver.js";
import calculate from "../calculate.js";
import React from 'react';

const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
// One second in ms.
const ONE_SECOND = 1000;
// Preparation time before the first round.
const PREP_TIME = 5 * ONE_SECOND;
// Time between rounds.
const ROUND_INTERVAL = 10 * ONE_SECOND;
// Deduct points if the solution is incorrect.
const WRONG_ANSWER_DEDUCT_POINT = 10;

/** @class Room represents a round in a game. */
class Round {
  /**
   * Creates an instance of Round.
   *
   * @constructor
   * @author: Zhengze Gong (harry8698)
   * @param {number} num The round number
   */
  constructor(num) {
    // Round number.
    this.roundNum = num;
    // The number combination in this round.
    this.combination = null;
    // The solution of the number combination.
    this.solution = null;
    // Whether or not it is solved by the player
    this.solvedPlayers = null;
    // Current timer in this round.
    this.timer = null;
  }
}


// A list of Round instances to represent all the rounds in this game.
// contains all the numbers and solutions for each round, and the timer


const withRoom = WrappedComponent => {
  let rounds = [];
  let settings = {
    numOfSlots: 4,
    targetNumber: 24,
    availableOperators: [TIMES, DIVIDES, PLUS, MINUS],
    rangeLo: 1,
    rangeHi: 13,
    maxNumOfRepeats: 4,
    roundDuration: 30 * ONE_SECOND,
    numOfRounds: 10
  };
  // A Solver instance calibrated to this room's settings.
  let solver = new Solver(settings);
  // Round counter.
  let roundNum = 0;
  // Keeps track of the score.
  let score = 0;
  // Used to cancel game timers when all players leave the room.
  let timerPromiseReject = null;
  // Contains all the running setTimeout functions.
  let timeouts = [];



  class Room extends React.Component {
    /**
     * Creates an instance of Room.
     *
     * @constructor
     * @author: Zhengze Gong (harry8698)
     */
    // constructor(props) {
    //   super(props);
    //   // Represents the (default) game settings in this room instance.
    //   this.settings = {
    //     numOfSlots: 4,
    //     targetNumber: 24,
    //     availableOperators: [TIMES, DIVIDES, PLUS, MINUS],
    //     rangeLo: 1,
    //     rangeHi: 13,
    //     maxNumOfRepeats: 4,
    //     roundDuration: 30 * ONE_SECOND,
    //     numOfRounds: 10
    //   };
    //   // A list of Round instances to represent all the rounds in this game.
    //   // contains all the numbers and solutions for each round, and the timer
    //   this.rounds = [];
    //   // A Solver instance calibrated to this room's settings.
    //   this.solver = new Solver(this.settings);
    //   // Round counter.
    //   this.roundNum = 0;
    //   // Keeps track of the score.
    //   this.score = 0;
    //   console.log("constructor started");
    //   // Used to cancel game timers when all players leave the room.
    //   this.timerPromiseReject = null;
    //   // Contains all the running setTimeout functions.
    //   this.timeouts = [];

    // }



    state = {
      timer: 0
    }

    /**
     * Indicates whether or not a number is within a specified boundary
     * (inclusive).
     *
     * @param {number} num The number to be tested
     * @param {number} lo Lower bound
     * @param {number} hi Higher bound
     * @return {boolean} Whether or not the number is with the bounds
     */
    isBetween(num, lo, hi) {
      return Number.isInteger(num) && num >= lo && num <= hi;
    }

    /**
     * Validates and changes the settings in this room instance. All validated
     * settings properties will be applied, while invalid properties will retain
     * their default values.
     *
     * @param {object} settings Input settings
     */
    changeSettings(settings) {
      for (let prop in settings) {
        switch (prop) {
          case "numOfSlots":
            if (this.isBetween(settings.numOfSlots, 2, 6)) {
              this.settings.numOfSlots = settings.numOfSlots;
            }
            break;
          case "targetNumber":
            if (Number.isInteger(settings.targetNumber)) {
              this.settings.targetNumber = settings.targetNumber;
            }
            break;
          case "availableOperators":
            if (Array.isArray(settings.availableOperators) &&
              settings.availableOperators.every(op =>
                this.settings.availableOperators.includes(op)
              ) &&
              settings.availableOperators.length >= 2) {
              this.settings.availableOperators = settings.availableOperators;
            }
            break;
          case "rangeLo":
            if (Number.isInteger(settings.rangeLo)) {
              this.settings.rangeLo = settings.rangeLo;
            }
            break;
          case "rangeHi":
            if (Number.isInteger(settings.rangeHi)) {
              if (settings.rangeHi >= settings.rangeLo) {
                this.settings.rangeHi = settings.rangeHi;
              } else {
                settings.rangeLo = 1;
                settings.rangeHi = 13;
              }
            }
            break;
          case "maxNumOfRepeats":
            if (this.isBetween(settings.maxNumOfRepeats, 1, settings.numOfSlots)) {
              this.settings.maxNumOfRepeats = settings.maxNumOfRepeats;
            }
            break;
          case "roundDuration":
            if (this.isBetween(settings.roundDuration,
              20 * ONE_SECOND,
              2 * 60 * ONE_SECOND)) {
              this.settings.roundDuration = settings.roundDuration;
            }
            break;
          case "numOfRounds":
            if (Number.isInteger(settings.numOfRounds) &&
              [5, 10, 15, 20].includes(settings.numOfRounds)) {
              this.settings.numOfRounds = settings.numOfRounds;
            }
            break;
        }
      }

      // Updates the solver instance.
      this.solver = new Solver(this.settings);
    }


    /**
     * Generates a number combination for each round and calculates their results.
     */
    generateCombinations() {
      for (let i = 0; i < this.settings.numOfRounds; i++) {
        let combination = [];
        for (let j = 0; j < this.settings.numOfSlots; j++) {
          let max = this.settings.rangeHi;
          let min = this.settings.rangeLo;

          let num = Math.floor(Math.random() * (max - min + 1) + min);

          let count = 0;
          combination.forEach(elem => elem === num && count++);

          // Regenerate if exceeds the max num of repeats defined by the settings.
          while (count === this.settings.maxNumOfRepeats) {
            num = Math.floor(Math.random() * (max - min + 1) + min);
            count = 0;
            combination.forEach(elem => elem === num && count++);
          }
          combination.push(num);
        }

        let solution = this.solver.solve(combination);

        this.rounds[i].combination = combination;
        this.rounds[i].solution = solution;
      }
    }

    /**
     * Ends one round
     *
     */
    endRound() {

    }

    /**
     * Creates a promise that resolves after a specified timeout. Can be rejected
     * from outside of the function scope to cancel the timeout.
     *
     * @param {number} ms Time (in ms) before the promise is resolved
     * @return {Promise} The timeout promise
     */
    async pause(ms) {
      return new Promise((resolve, reject) => {
        this.timeouts.push(setTimeout(resolve, ms));
        this.timerPromiseReject = reject;
      });
    }

    /**
     * Sets up a new round timer. Emits a "timer" event every second.
     *
     * @return {Promise} Returns a resolved promise if no errors are thrown
     */
    async newRound() {
      for (let time = this.settings.roundDuration / ONE_SECOND; time > 0; time--) {
        await this.pause(ONE_SECOND);
        this.rounds[this.roundNum].timer = time;
      }
    }

    /**
     * Sets up a new round interval timer. Emits a "timer" event every second.
     *
     * @return {Promise} Returns a resolved promise if no errors are thrown
     */
    async roundInterval() {
      for (let time = ROUND_INTERVAL / ONE_SECOND; time > 0; time--) {
        await this.pause(ONE_SECOND);
      }
    }

    /**
     * Starts the game and sets up the timers during different stages of the game.
     * Stops all timers if receives an "engGame" error, which signifies that all
     * players have left the room.
     *
     * @return {Promise} Returns a resolved promise
     */
    async start() {
      try {
        // Preparation time before the first round starts.
        for (let time = PREP_TIME / ONE_SECOND - 1; time > 0; time--) {
          await this.pause(ONE_SECOND);
          this.setState({ timer: time });
        }

        for (let round = 0; round < this.settings.numOfRounds; round++) {
          // New round starts.
          this.roundNum = round;

          //set state for this.rounds[this.roundNum].combination,

          //
          await this.newRound();

          this.endRound()

          await this.roundInterval();
        }

        this.closeRoom();
      } catch (e) {
        // Returns immediately after catching an error to cancel the timers.
        alert("an error occured");
      } finally {
        return Promise.resolve();
      }
    }

    /**
     * Starts the game in this room instance.
     */
    haha() {
      console.log("this is a function");
    }

    startGame() {

      timeouts.forEach(clearTimeout);

      // Initialize the rounds.
      for (let i = 0; i < settings.numOfRounds; i++) {
        rounds[i] = new Round(i);
      }

      this.haha();
      //generate Qs and solutions for all the rounds
      //this.generateCombinations();

      //start the game
      //this.start();

      return;
    }

    closeRoom() {
      alert("room closed");
    }

    /**
     * Interprets and checks if a mathematical expression is valid in the context
     * of the settings in this room.
     *
     * An expression is valid if:
     * 1. Follows strictly the infix notation rules.
     * 2. Contains only the operators from the "availableOperators" property of
     *    the settings.
     * 3. Contains only the numbers from the generated number combination in this
     *    round. Each number in the generated combination can only appear once in
     *    the expression.
     *
     * @param {string Array} exp The expression to be examined
     * @return Whether or not the expression is valid
     */
    isValidExpression(exp) {
      if (exp === null) {
        return false;
      }

      let leftParenCount = exp.filter(str => str === "(").length;
      let rightParenCount = exp.filter(str => str === ")").length;
      // No adjacent number elements in the array.
      let noAdjacentNums = exp.every((elem, idx) =>
        (idx > 0 ? isNaN(exp[idx - 1]) || isNaN(elem) : true)
      );

      let sortedAvailableNums = this.rounds[this.roundNum].combination.sort();
      // No numbers out of range specified in the settings.
      let noNewNums = exp.filter(str => !isNaN(str))
        .sort()
        .every((elem, idx) => {
          return parseInt(elem) === sortedAvailableNums[idx];
        });

      // String representation of all available operators.
      let opStr = this.settings.availableOperators.join("");
      // Infix notation patterns.
      let regex = new RegExp(`^\\(*[0-9]+([${opStr}]\\(*[0-9]+\\)*)*\\)*$`);

      return regex.test(exp.join("")) &&
        leftParenCount === rightParenCount &&
        noAdjacentNums &&
        noNewNums;
    }

    // TODO: Implement this.
    calcScore(time) {
      return time;
    }

    /**
     * Takes in and validates a solution according to the settings in this room
     * instance.
     *
     * @param {object} skt The client socket that submitted the solution
     * @param {string Array} solution The solution submitted
     */
    submitSolution(skt, solution) {
      let index = this.rank.findIndex(elem => elem.name === skt.username);

      if ((solution === null && this.rounds[this.roundNum].solution === null) ||
        (this.isValidExpression(solution) &&
          calculate(solution) === this.settings.targetNumber)) {
        let score = this.calcScore(this.rounds[this.roundNum].timer);
        this.scoreboard[this.roundNum][skt.username].score = score;
        this.scoreboard[this.roundNum][skt.username].solution =
          solution === null ? null : solution.join("");

        // Add the new score to the total score of this player.
        this.rank[index].totalScore += score;
        skt.emit(
          "solutionCorrect",
          {
            score: score,
            totalScore: this.rank[index].totalScore
          }
        );

        // Sort the ranking list descendingly.
        this.rank.sort((a, b) => b.totalScore - a.totalScore);

        this.rounds[this.roundNum].solvedPlayers.push(skt);
        this.broadcast(
          "playerSolved",
          this.rounds[this.roundNum].solvedPlayers
            .map(elem => elem.username)
        );
      } else {
        let deductedScore = WRONG_ANSWER_DEDUCT_POINT;
        this.rank[index].totalScore -= deductedScore;
        this.rank[index].totalScore = Math.max(this.rank[index].totalScore, 0);

        this.rank.sort((a, b) => b.totalScore - a.totalScore);

        skt.emit(
          "solutionIncorrect",
          {
            deductedScore: deductedScore,
            totalScore: this.rank[index].totalScore
          }
        );
      }
      return;
    }

    render() {
      return <WrappedComponent
        timer={this.state.timer}
        startGame={this.startGame}
        settings={this.settings}
        {...this.props} />
    }
  }
  return Room;
}

export default withRoom;