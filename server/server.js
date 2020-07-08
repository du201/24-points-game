const EXPRESS = require("EXPRESS");
const APP = EXPRESS();
const RequestHandler = require("./requestHandler.js");
// Port number of the backend.
const PORT = 2000;

// Establishes the server.
const SERVER = APP.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const IO = require("socket.io")(SERVER);

// Opens the server to any connections.
IO.on("connection", (socket) => {
  socket.username = null;
  socket.roomNum = null;
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
});
