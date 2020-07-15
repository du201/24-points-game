const EXPRESS = require("EXPRESS");
const APP = EXPRESS();
const RequestHandler = require("./requestHandler.js");
// Port number of the backend.
const PORT = 2000;
// Timeout after 10 minutes.
const TIMEOUT_VALUE = 600000;

// Establishes the server.
const SERVER = APP.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const IO = require("socket.io")(SERVER, {
  pingTimeout: TIMEOUT_VALUE,
});

// Opens the server to any connections.
IO.on("connection", (socket) => {
  socket.username = null;
  socket.roomNum = null;
  socket.isHost = false;
  let requestHandler = new RequestHandler(socket);

  /*
   * listens for disconnection, if a player disconnects, remove this player
   * from the room.
   */
  socket.on("disconnect", () => {
    requestHandler.disconnectHandler();
  });

  /*
   * Listens for createRoom request, if a player sends this request, assign
   * a room for this player if possible and create a player list for this room
   * number.
   */
  socket.on("createRoom", (username) => {
    requestHandler.createRoomHandler(username);
  });

  /*
   * Listens for joinRoom request, if a player sends this request, add this
   * player to the player list of this room if it exists.
   */
  socket.on("joinRoom", ({ username, room }) => {
    requestHandler.joinRoomHandler({ username, room });
  });

  /*
   * Listens for leaveRoom request, if a player sends this request, remove this
   * player from this player's room and broadcast the updated player list to
   * the remaining players (if there are any).
   */
  socket.on("exitRoom", () => {
    requestHandler.leaveRoomHandler();
  });

  /*
   * Listens for changeSettings request, if the host sends this request, update
   * the settings in the room and broadcast the change to all other clients in
   * that room.
   */
  socket.on("changeSettings", (settings) => {
    requestHandler.changeSettingsHandler(settings);
  });

  /*
   * Listens for startGame request, if the host sends this request, update
   * the settings in the room and broadcast the change to all other clients in
   * that room.
   */
  socket.on("startGame", () => {
    requestHandler.startGameHandler();
  });
});
