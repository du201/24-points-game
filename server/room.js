const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";

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
    this.socketList = new Set();
    // Represents the (default) game settings in this room instance.
    this.settings = {
      numOfSlots: 4,
      targetNumber: 24,
      availableOperators: [TIMES, DIVIDES, PLUS, MINUS],
      rangeLo: 1,
      rangeHi: 13,
      maxNumOfRepeats: 4,
      roundInterval: 30000,
      numOfRounds: 10
    };
    this.host = host;
    host.isHost = true;
    this.addPlayer(host);
  }

  /**
   * Adds a player to this room instance.
   *
   * @param {socket} socket The player's socket to be added to the list of
   *                        players
   */
  addPlayer(socket) {
    socket.roomNum = this.number;
    this.socketList.add(socket);
  }

  /**
   * Removes a player from this room instance.
   *
   * @param {socket} socket The player's socket to be removed
   */
  removePlayer(socket) {
    socket.roomNum = null;
    this.socketList.delete(socket);
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
    this.socketList.forEach((skt) => usernameList.push(skt.username));
    return usernameList;
  }

  /**
   * Returns all the sockets in this room instance.
   *
   * @return {socket Array} An array that contains all the sockets in the room
   */
  getConnectionList() {
    return Array.from(this.socketList);
  }

  /**
   * Returns the number of players in this room instance.
   *
   * @return {number} The number of players in this room
   */
  getNumOfPlayers() {
    return this.socketList.size;
  }

  /**
   * Indicates whether or not this room instance is empty.
   *
   * @return {number} Whether or not this room contains zero players
   */
  isEmpty() {
    return this.getNumOfPlayers() === 0;
  }

  /**
   * Validates and changes the settings in this room instance. All validated
   * settings properties will be applied, while invalid properties will retain
   * their default values.
   *
   * @param {object} settings Input settings
   */
  changeSettings(settings) {
    if (settings.hasOwnProperty("numOfSlots")) {
      if (Number.isInteger(settings.numOfSlots) &&
          settings.numOfSlots >= 2 &&
          settings.numOfSlots <= 6) {
        this.settings.numOfSlots = settings.numOfSlots;
      }
    }
    if (settings.hasOwnProperty("targetNumber")) {
      if (Number.isInteger(settings.targetNumber)) {
        this.settings.targetNumber = settings.targetNumber;
      }
    }
    if (settings.hasOwnProperty("availableOperators")) {
      if (Array.isArray(settings.availableOperators) &&
          settings.availableOperators.every(op => {
            [TIMES, DIVIDES, PLUS, MINUS].includes(op);
          })) {
        this.settings.availableOperators = settings.availableOperators;
      }
    }
    if (settings.hasOwnProperty("rangeLo")) {
      if (Number.isInteger(settings.rangeLo)) {
        this.settings.rangeLo = settings.rangeLo;
      }
    }
    if (settings.hasOwnProperty("rangeHi")) {
      if (Number.isInteger(settings.rangeHi)) {
        if (settings.rangeHi >= settings.rangeLo) {
          this.settings.rangeHi = settings.rangeHi;
        } else {
          settings.rangeLo = 1;
          settings.rangeHi = 13;
        }
      }
    }
    if (settings.hasOwnProperty("maxNumOfRepeats")) {
      if (Number.isInteger(settings.maxNumOfRepeats) &&
          settings.maxNumOfRepeats >= 1 &&
          settings.maxNumOfRepeats <= settings.numOfSlots) {
        this.settings.maxNumOfRepeats = settings.maxNumOfRepeats;
      }
    }
    if (settings.hasOwnProperty("roundInterval")) {
      if (Number.isInteger(settings.roundInterval) &&
          settings.roundInterval >= 10000 &&
          settings.roundInterval <= 60000) {
        this.settings.roundInterval = settings.roundInterval;
      }
    }
    if (settings.hasOwnProperty("numOfRounds")) {
      if (Number.isInteger(settings.numOfRounds) &&
          [10, 15, 20].includes(settings.numOfRounds)) {
        this.settings.numOfRounds = settings.numOfRounds;
      }
    }
  }

  /**
   * Returns the settings in this room instance.
   *
   * @return {object} The settings in this room
   */
  getSettings() {
    return this.settings;
  }

  // TODO: implement this
  startGame() {
    return;
  }
}

module.exports = Room;
