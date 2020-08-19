/** @author Zhengze Gong (harry8698). */
// TODO: Write a summary for this file.

// Maximum number of available rooms.
const MAX_ROOM_COUNT = 10000;
// Maximum players in a room.
const MAX_PLAYER_COUNT = 10;
const Room = require("./Room.js");
/*
 * This is a dictionary that stores all the rooms and their users, with room
 * numbers(int) as keys and instances of Room as thier corresponding values.
 */
var roomList = {};

/**
 * Converts a number into a string with "0" paddings at the front.
 *
 * @param {number} num The number to be converted
 * @return {string} The converted string
 */
function roomIntToStr(num) {
  let str = num.toString();
  while (str.length < MAX_ROOM_COUNT.toString().length - 1) {
    str = "0" + str;
  }
  return str;
}

/**
 * Converts a string into a number.
 *
 * @param {string} str The string to be converted
 * @return {number} The converted number on success, otherwise return -1
 */
function roomStrToInt(str) {
  let num = parseInt(str, 10);
  if (isNaN(num)) {
    return -1;
  }
  return num;
}

/**
 * Finds an available room number.
 *
 * @return {number} A random room number if the room is empty; returns null if
 *                  no rooms are available
 */
function findAvailableRoomNum() {
  let roomNum = Math.floor(Math.random() * MAX_ROOM_COUNT);
  if (roomList.length === MAX_ROOM_COUNT) {
    return null;
  }

  // Generate a new random number if there are collisions.
  while (roomList[roomNum] !== null && roomList[roomNum] !== undefined) {
    roomNum = Math.floor(Math.random() * MAX_ROOM_COUNT);
  }

  return roomNum;
}

/** @class RequestHandler contains all the handlers for incoming requests. */
class RequestHandler {
  /**
   * Creates an instance of RequestHandler.
   *
   * @constructor
   * @author: Zhengze Gong (harry8698)
   * @param {socket} socket The target socket
   */
  constructor(socket) {
    this.socket = socket;
  }

  /**
   * Handles disconnections. When a player disconnects, remove this player from
   * the room.
   */
  disconnectHandler() {
    this.leaveRoomHandler();
  }

  /**
   * Handles createRoom requests. If a player sends this request, assign
   * a room for this player if possible and create a player list for this room
   * number.
   */
  createRoomHandler(username) {
    this.socket.username = username;

    let roomNum = findAvailableRoomNum();
    if (roomNum === null) {
      this.socket.emit(
        "createRoomFailure",
        "noAvailableRooms"
      );
      return;
    }

    let roomStr = roomIntToStr(roomNum);
    this.socket.emit("createRoomSuccess", roomStr);
    roomList[roomNum] = new Room(roomNum, this.socket);

    roomList[roomNum].broadcast("roster", roomList[roomNum].getUsernameList());

    console.log(`Player ${this.socket.username} created room ${roomStr}`);
  }

  /**
   * Handles joinRoom requests. If a player sends this request, add this
   * player to the player list of this room if it exists.
   */
  joinRoomHandler({ username, room }) {
    this.socket.username = username;

    let roomNum = roomStrToInt(room);
    if (roomNum === -1) {
      this.socket.emit(
        "joinRoomFailure",
        "invalidRoomNumber"
      );
      return;
    }

    if (roomList[roomNum] === undefined || roomList[roomNum] === null) {
      this.socket.emit(
        "joinRoomFailure",
        "roomDoesNotExist"
      );
      return;
    }
    if (roomList[roomNum].hasUsername(username)) {
      this.socket.emit(
        "joinRoomFailure",
        "usernameTaken"
      );
      return;
    }
    if (roomList[roomNum].isRunning()) {
      this.socket.emit(
        "joinRoomFailure",
        "gameInProgress"
      );
      return;
    }

    this.socket.emit("joinRoomSuccess");
    roomList[roomNum].addPlayer(this.socket);

    roomList[roomNum].broadcast("roster", roomList[roomNum].getUsernameList());

    console.log(`Player ${this.socket.username} joined room ${room}`);
  }

  /**
   * Handles leaveRoom requests. If a player sends this request, remove this
   * player from this player's room and broadcast the updated player list to
   * the remaining players (if there are any).
   */
  leaveRoomHandler() {
    let room = this.socket.roomNum;
    let isHost = this.socket.isHost;
    if (room !== null) {
      roomList[room].removePlayer(this.socket);

      if (roomList[room].isEmpty()) {
        roomList[room] = null;
        // No need to broadcast here because there are no remaining players.
      } else {
        if (isHost && !roomList[room].isRunning()) {
          // Host leaves before the game starts
          roomList[room].closeRoom();
          roomList[room] = null;
        } else {
          roomList[room].broadcast(
            "roster",
            roomList[room].getUsernameList()
          );
        }
      }
      /*
       * socket.username is not null because it is always defined before the
       * definition of socket.roomNum.
       */
      console.log(`Player ${this.socket.username} has left room ` + `${room}`);

      if (roomList[room] === null) {
        console.log(`Room ${room} is closed`);
      }
    }
  }

  /**
   * Handles startGame requests. If the host sends this request, start the game
   * in the room.
   */
  startGameHandler(settings) {
    if (roomList[this.socket.roomNum] !== undefined &&
        roomList[this.socket.roomNum] !== null &&
        !roomList[this.socket.roomNum].isRunning()) {
      roomList[this.socket.roomNum].changeSettings(settings);
      roomList[this.socket.roomNum].startGame();
    }
  }

  /**
   * Handles sendSolution requests. If a client sends this request, verify the
   * solution according to the settings in the room the client is in.
   */
  sendSolutionHandler(solution) {
    if (roomList[this.socket.roomNum].isRunning()) {
      roomList[this.socket.roomNum].submitSolution(this.socket, solution);
    }
  }
}

module.exports = RequestHandler;
