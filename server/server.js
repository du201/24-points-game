const EXPRESS = require("EXPRESS");
const APP = EXPRESS();
// Port number of the backend.
const PORT = 2000;
// Maximum number of available rooms.
const MAX_ROOM_COUNT = 10000;
// Maximum players in a room.
const MAX_PLAYER_COUNT = 10;

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

// Establishs the server.
const SERVER = APP.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const IO = require("socket.io")(SERVER);

/**
 * This is a dictionary that stores all the rooms and their users, with room
 * numbers(int) as keys and arrays of sockets as thier corresponding values.
 */
let roomList = {};

// Opens the server to any connections.
IO.on("connection", (socket) => {
  socket.username = null;
  socket.roomNum = null;

  /**
   * listens for disconnection, if a player disconnects, remove this player
   * from the room.
   */
  socket.on("disconnect", () => {
    if (socket.roomNum !== null) {
      let socketList = roomList[socket.roomNum];
      let index = socketList.indexOf(socket);
      roomList[socket.roomNum].splice(index, 1);

      if (socketList.length === 0) {
        // No players are in the room.
        roomList[socket.roomNum] = null;
        // no need to broadcast here because there are no remaining players.
      } else {
        // TODO: broadcast the updated player list to all remaining players.
      }
      /*
       * socket.username is not null because it is always defined before the
       * definition of socket.roomNum.
       */
      console.log(`Player ${socket.username} has left room ${socket.roomNum}`);
    }
  });

  /*
   * Listens for createRoom request, if a player sends this request, assign
   * a room for this player if possible and create a player list for this room
   * number.
   */
  socket.on("createRoom", (username) => {
    socket.username = username;

    let roomNum = Math.floor(Math.random() * MAX_ROOM_COUNT);
    if (roomList.length === MAX_ROOM_COUNT) {
      socket.emit(
        "createRoomFailure",
        "No rooms available, please try again later"
      );
      return;
    }

    // Generate a new random number if there are collisions.
    while (roomList[roomNum] !== null && roomList[roomNum] !== undefined) {
      roomNum = Math.floor(Math.random() * MAX_ROOM_COUNT);
    }

    let roomStr = roomIntToStr(roomNum);
    socket.emit("createRoomSuccess", roomStr);
    socket.roomNum = roomNum;
    roomList[roomNum] = [socket];
    console.log(`Player ${socket.username} created room ${roomStr}`);
  });

  /*
   * Listens for joinRoom request, if a player sends this request, add this
   * player to the player list of this room if it exists.
   */
  socket.on("joinRoom", ({ username, room }) => {
    socket.username = username;

    let roomNum = roomStrToInt(room);
    if (roomNum === -1) {
      socket.emit("joinRoomFailure", "Invalid room number, please try again");
      return;
    }

    if (roomList[roomNum] === undefined || roomList[roomNum] === null) {
      socket.emit(
        "joinRoomFailure",
        "This room does not exist, please try again"
      );
      return;
    }

    if (roomList[roomNum].map((skt) => skt.username).includes(username)) {
      socket.emit(
        "usernameDuplicate",
        "Username taken, please try another one"
      );
      return;
    }

    socket.emit("joinRoomSuccess");
    socket.roomNum = roomNum;
    roomList[roomNum].push(socket);
    console.log(`Player ${socket.username} joined room ${room}`);
  });
});
