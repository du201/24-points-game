/** @class Room represents game rooms. */
class Room {
  /**
   * Creates an instance of Room.
   *
   * @constructor
   * @author: Zhengze Gong (harry8698)
   * @param {number} number The room's number
   */
  constructor(number) {
    // Represents the number of the room instance.
    this.number = number;
    // Represents if the game in the room is in progress.
    this.inProgress = false;
    // Represents all the connections to the room instance.
    this.socketList = new Set();
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

  // TODO: implement this
  changeSettings(settings) {
    return;
  }

  // TODO: implement this
  startGame() {
    return;
  }
}

module.exports = Room;
