const EXPRESS = require("EXPRESS");
const APP = EXPRESS();
const PORT = 2000;
const MAX_ROOM_COUNT = 10000;
const MAX_PLAYER_COUNT = 10;

const SERVER = APP.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

function roomIntToStr(num) {
  let str = num.toString();
  while (str.length < MAX_ROOM_COUNT.toString().length - 1) {
    str = "0" + str;
  }
  return str;
}

function roomStrToInt(str) {
  let num = parseInt(str, 10);
  if (isNaN(num)) {
    return -1;
  }
  return num;
}

const IO = require("socket.io")(SERVER);
let roomList = {};

IO.on("connection", socket => {
  // Listening for createRoom request
  socket.on("createRoom", (username) => {
    socket.username = username

    let roomNum = Math.floor(Math.random() * MAX_ROOM_COUNT)
    if (roomList.length === MAX_ROOM_COUNT) {
      socket.emit("createRoomFailure",
                  "No rooms available, please try again later")
      return
    }

    while (roomList[roomNum] != null) {
      roomNum = Math.floor(Math.random() * MAX_ROOM_COUNT);
    }

    let roomStr = roomIntToStr(roomNum)
    socket.emit("createRoomSuccess", roomStr)
    socket.roomNum = roomNum
    roomList[roomNum] = [socket]
    console.log(`Player ${socket.username} created room ${roomStr}`)
  });

  // Listening for joinRoom request
  socket.on("joinRoom", ({username, room}) => {
    socket.username = username
    let roomNum = roomStrToInt(room)
    if (roomNum === -1) {
      socket.emit("joinRoomFailure",
                  "Invalid room number, please try again")
      return
    }
    if (roomList[roomNum] === undefined || roomList[roomNum] === null) {
      socket.emit("joinRoomFailure",
                  "This room does not exist, please try again")
      return
    }

    socket.emit("joinRoomSuccess")
    socket.roomNum = roomNum
    roomList[roomNum].push(username)
    console.log(`Player ${socket.username} joined room ${room}`)
  });
});
