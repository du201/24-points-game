/** @author Zhengze Gong (harry8698). */
// TODO: Write a summary for this file.

const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
// Preparation time (in s) before the first round.
const PREP_TIME = 5;
// Time (in s) between rounds.
const ROUND_INTERVAL = 10;
// One second in ms.
const ONE_SECOND = 1000;
// Time before automatically start the game.
const AUTO_START_TIME = 5 * 60 * ONE_SECOND;
// The number of people that will be shown in the ranking list.
const RANK_COUNT = 3;
// Deduct points if the solution is incorrect.
const WRONG_ANSWER_DEDUCT_POINT = 10;
const Solver = require("./solver.js");
const calculate = require("./calculate.js");


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
    // List of sockets of players who have solved the combination in this round.
    this.solvedPlayers = [];
    // Current timer in this round.
    this.timer = null;
  }
}


/** @class Room represents game rooms. */
class Room {
  /**
   * Creates an instance of Room.
   *
   * @constructor
   * @author: Zhengze Gong (harry8698)
   * @param {number} number The room's number
   */
  constructor(number, host) {
    // Represents the number of this room instance.
    this.number = number;
    // Represents if the game in this room is in progress.
    this.inProgress = false;
    // Represents all the connections to this room instance.
    this.socketSet = new Set();
    // Represents the (default) game settings in this room instance.
    this.settings = {
      numOfSlots: 4,
      targetNumber: 24,
      availableOperators: [TIMES, DIVIDES, PLUS, MINUS],
      rangeLo: 1,
      rangeHi: 13,
      maxNumOfRepeats: 4,
      roundDuration: 30000,
      numOfRounds: 10
    };
    // The host of the game in this room.
    this.host = host;
    host.isHost = true;
    this.addPlayer(host);
    // A list of Round instances to represent all the rounds in this game.
    this.rounds = [];
    // A Solver instance calibrated to this room's settings.
    this.solver = new Solver(this.settings);
    // Round counter.
    this.roundNum = 0;
    // Keeps track of the scoreboard.
    this.scoreboard = [];
    // Keeps track of the ranking in the game.
    this.rank = [];
    // Used to cancel game timers when all players leave the room.
    this.timerPromiseReject = null;
    // Contains all the running setTimeout functions.
    this.timeouts = [];

    this.timeouts.push(setTimeout(() => {
      this.startGame();
    }, AUTO_START_TIME));
  }

  /**
   * Broadcasts message to all players in this room instance.
   *
   * @param {string} event The event to be emitted to the clients
   * @param {object} data The data to be sent
   */
  broadcast(event, data) {
    this.socketSet.forEach(skt => skt.emit(event, data));
  }

  /**
   * Closes the room and removes all players in this room instance.
   */
  closeRoom() {
    this.socketSet.forEach(skt => {
      this.removePlayer(skt);
      skt.emit("roomClosed");
    });
  }

  /**
   * Adds a player to this room instance.
   *
   * @param {socket} socket The player's socket to be added to the list of
   *                        players
   */
  addPlayer(socket) {
    socket.roomNum = this.number;
    this.socketSet.add(socket);
  }

  /**
   * Removes a player from this room instance.
   *
   * @param {socket} socket The player's socket to be removed
   */
  removePlayer(socket) {
    socket.roomNum = null;
    socket.isHost = socket.isHost && false;
    this.socketSet.delete(socket);
    if (this.isEmpty()) {
      // Use errors to signal the termination of the game.
      this.timerPromiseReject !== null &&
      this.timerPromiseReject(new Error("endGame"));
      this.timeouts.forEach(clearTimeout);
    }
  }

  /**
   * Indicates whether or not the game in the room is currently running.
   *
   * @return {boolean} Whether or not the game is running
   */
  isRunning() {
    return this.inProgress;
  }

  /**
   * Returns the room number.
   *
   * @return {number} The number of this room
   */
  getRoomNum() {
    return this.number;
  }

  /**
   * Indicates whether or not a username has been taken in this room instance.
   *
   * @param {string} name The username to be determined
   * @return {number} Whether or not the username has been taken in this room
   */
  hasUsername(name) {
    return this.getUsernameList().includes(name);
  }

  /**
   * Returns all the usernames used in this room instance.
   *
   * @return {string Array} An array that contains all the usernames in the room
   */
  getUsernameList() {
    let usernameList = [];
    this.socketSet.forEach((skt) => usernameList.push(skt.username));
    return usernameList;
  }

  /**
   * Returns all the sockets in this room instance.
   *
   * @return {socket Array} An array that contains all the sockets in the room
   */
  getConnectionList() {
    return Array.from(this.socketSet);
  }

  /**
   * Returns the number of players in this room instance.
   *
   * @return {number} The number of players in this room
   */
  getNumOfPlayers() {
    return this.socketSet.size;
  }

  /**
   * Indicates whether or not this room instance is empty.
   *
   * @return {boolean} Whether or not this room contains zero players
   */
  isEmpty() {
    return this.getNumOfPlayers() === 0;
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
          if (this.isBetween(settings.maxNumOfRepeats, 1, settings.numOfSlots))
          {
            this.settings.maxNumOfRepeats = settings.maxNumOfRepeats;
          }
          break;
        case "roundDuration":
          if (this.isBetween(settings.roundDuration, 20000, 120000)) {
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
   * Returns the settings in this room instance.
   *
   * @return {object} The settings in this room
   */
  getSettings() {
    return this.settings;
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
   * Ends one round and generates rankings to send to the clients.
   *
   * @param skt The client to send the information to
   */
  endRound(skt) {
    // Top solutions in this round.
    let playerSolutions = [];
    let solvedPlayers = this.rounds[this.roundNum].solvedPlayers;
    for (let i = 0; i < solvedPlayers.length && i < RANK_COUNT; i++) {
      let name = solvedPlayers[i].username;
      let solution = this.scoreboard[this.roundNum][name].solution;
      playerSolutions.push({
        name: name,
        solution: solution
      });
    }

    // Overall ranking.
    let scoreRanking = [];
    for (let i = 0; i < this.rank.length && i < RANK_COUNT; i++) {
      scoreRanking.push(this.rank[i]);
    }

    // The index of this player in the ranking list.
    let index = this.rank.findIndex(elem => elem.name === skt.username);
    /*
     * Player solutions:
     * 1. string: regular solution.
     * 2. null: player submitted "no solution".
     * 3. undefined: player never submitted a solution.
     */
     skt.emit(
       "endRound",
       {
         solution: this.rounds[this.roundNum].solution,
         playerSolutions: playerSolutions,
         scoreRanking: scoreRanking,
         playerRanking: index + 1
       }
     );
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
    for (let time = this.settings.roundDuration / 1000; time > 0; time--) {
      await this.pause(ONE_SECOND);
      this.rounds[this.roundNum].timer = time;
      this.broadcast("timer", time);
    }
  }

  /**
   * Sets up a new round interval timer. Emits a "timer" event every second.
   *
   * @return {Promise} Returns a resolved promise if no errors are thrown
   */
  async roundInterval() {
    for (let time = ROUND_INTERVAL; time > 0; time--) {
      await this.pause(ONE_SECOND);
      this.broadcast("timer", time);
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
      this.broadcast("timer", PREP_TIME);
      // Preparation time before the first round starts.
      for (let time = PREP_TIME - 1; time > 0; time--) {
        await this.pause(ONE_SECOND);
        this.broadcast("timer", time);
      }

      for (let round = 0; round < this.settings.numOfRounds; round++) {
        // New round starts.
        this.roundNum = round;
        this.timeouts.push(
          setTimeout(() => {
            this.broadcast("newRound", {
              numbers: this.rounds[this.roundNum].combination,
              settings: this.settings
            });
          }, ONE_SECOND)
        );

        await this.newRound();

        this.timeouts.push(
          setTimeout(() => {
            this.getConnectionList().forEach((skt) => {
              this.endRound(skt);
            });
          }, ONE_SECOND)
        );

        await this.roundInterval();
      }

      let playerRanking = this.rank;
      this.broadcast("endGame", playerRanking);
      this.closeRoom();
    } catch (e) {
      // Returns immediately after catching an error to cancel the timers.
    } finally {
      return Promise.resolve();
    }
  }

  /**
   * Starts the game in this room instance.
   */
  startGame() {
    if (this.inProgress) {
      return;
    }

    this.timeouts.forEach(clearTimeout);
    this.inProgress = true;

    let socketArray = this.getConnectionList();
    // Initialize the ranking list.
    for (let i = 0; i < socketArray.length; i++) {
      this.rank[i] = {
        name: socketArray[i].username,
        totalScore: 0
      };
    }

    // Initialize the rounds.
    for (let i = 0; i < this.settings.numOfRounds; i++) {
      this.rounds[i] = new Round(i);
      this.scoreboard[i] = [];
      this.socketSet.forEach(skt => {
        this.scoreboard[i][skt.username] = {
          socket: skt,
          score: 0,
          solution: undefined
        };
      });
    }
    this.generateCombinations();

    console.log(`Game in room ${this.number} has started`);

    this.broadcast("gameStarted", this.settings);
    this.start();

    return;
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
      (idx > 0 ? isNaN(exp[idx-1]) || isNaN(elem) : true)
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
    } else {
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
}

module.exports = Room;
