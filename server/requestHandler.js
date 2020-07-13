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
   * Handles createRoom requests. if a player sends this request, assign
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
    console.log(`Player ${this.socket.username} created room ${roomStr}`);
  }

  /**
   * Handles joinRoom requests. if a player sends this request, add this
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
    }

    this.socket.emit("joinRoomSuccess");
    roomList[roomNum].addPlayer(this.socket);

    let socketList = roomList[roomNum].getConnectionList();
    socketList.forEach((skt) => {
      skt.emit(
        "roster",
        roomList[roomNum].getUsernameList()
      );
    });

    console.log(`Player ${this.socket.username} joined room ${room}`);
  }

  /**
   * Handles leaveRoom requests. if a player sends this request, remove this
   * player from this player's room and broadcast the updated player list to
   * the remaining players (if there are any).
   */
  leaveRoomHandler() {
    let room = this.socket.roomNum;
    if (room !== null) {
      roomList[room].removePlayer(this.socket);

      if (roomList[room].isEmpty()) {
        roomList[room] = null;
        // No need to broadcast here because there are no remaining players.
      } else {
        let socketList = roomList[room].getConnectionList();

        if (this.socket.isHost && !roomList[room].isRunning()) {
          // Host leaves before the game starts
          roomList[room] = null;
          socketList.forEach(skt => {
            roomList[room].removePlayer(skt);
            skt.emit("roomClosed")
          });
        } else {
          socketList.forEach((skt) => {
            skt.emit(
              "roster",
              roomList[room].getUsernameList()
            );
          });
        }
      }
      /*
       * socket.username is not null because it is always defined before the
       * definition of socket.roomNum.
       */
      console.log(`Player ${this.socket.username} has left room ` +
                  `${room}`);

      if (roomList[room] === null) {
        console.log(`Room ${room} is closed`);
      }
    }
  }

  changeSettingsHandler(settings) {
    roomList[this.socket.roomNum].changeSettings(settings);
    this.socket.emit("settings", settings);
  }
}

module.exports = RequestHandler;