// Maximum number of available rooms.
const MAX_ROOM_COUNT = 10000;
// Maximum players in a room.
const MAX_PLAYER_COUNT = 10;

/*
 * This is a dictionary that stores all the rooms and their users, with room
 * numbers(int) as keys and arrays of sockets as thier corresponding values.
 */
let roomList = {};

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

class RequestHandler {
  constructor(socket) {
    this.socket = socket;
  }

  disconnectHandler() {
    if (this.socket.roomNum !== null) {
      let socketList = roomList[this.socket.roomNum];
      let index = socketList.indexOf(this.socket);
      roomList[this.socket.roomNum].splice(index, 1);

      if (socketList.length === 0) {
        // No players are in the room.
        roomList[this.socket.roomNum] = null;
        // no need to broadcast here because there are no remaining players.
      } else {
        // TODO: broadcast the updated player list to all remaining players.
      }
      /*
       * socket.username is not null because it is always defined before the
       * definition of socket.roomNum.
       */
      console.log(`Player ${this.socket.username} has left room ${this.socket.roomNum}`);
    }
  }

  createRoomHandler(username) {
    this.socket.username = username;

    let roomNum = findAvailableRoomNum();
    if (roomNum === null) {
      this.socket.emit(
        "createRoomFailure",
        "No rooms available, please try again later"
      );
      return;
    }

    let roomStr = roomIntToStr(roomNum);
    this.socket.emit("createRoomSuccess", roomStr);
    this.socket.roomNum = roomNum;
    roomList[roomNum] = [this.socket];
    console.log(`Player ${this.socket.username} created room ${roomStr}`);
  }

  joinRoomHandler({ username, room }) {
    this.socket.username = username;

    let roomNum = roomStrToInt(room);
    if (roomNum === -1) {
      this.socket.emit("joinRoomFailure",
                       "Invalid room number, please try again");
      return;
    }

    if (roomList[roomNum] === undefined || roomList[roomNum] === null) {
      this.socket.emit(
        "joinRoomFailure",
        "This room does not exist, please try again"
      );
      return;
    }
    if (roomList[roomNum].map((skt) => skt.username).includes(username)) {
      this.socket.emit("joinRoomFailure",
                       "Username taken, please try another one");
      return;
    }

    this.socket.emit("joinRoomSuccess");
    this.socket.roomNum = roomNum;
    roomList[roomNum].push(this.socket);
    console.log(`Player ${this.socket.username} joined room ${room}`);
  }
}

module.exports = RequestHandler;
