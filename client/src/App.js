import React, { Component } from "react";
import "./App.css";
import ReturnHomePageButton from "./components/ReturnHomePageButton";
import GameSolver from "./components/GameSolver";
import io from "socket.io-client";

const server = "http://localhost:2000";
const socket = io.connect(server);

class App extends Component {
  state = {
    pageController: "homePage",
    haha: 0,
    username: "",
    roomNumber: null,
  };

  gameModeButtonPress = () => {
    this.setState({
      pageController: "gamePage",
    });
  };

  solveModeButtonPress = () => {
    this.setState({
      pageController: "solvePage",
    });
  };

  returnHomePageButtonPress = () => {
    this.setState({
      pageController: "homePage",
    });
  };

  hasValidUsername = () => {
    let name = this.state.username;
    return !(name === undefined || name === "");
  };

  createRoomButtonPress = () => {
    if (this.hasValidUsername()) {
      socket.emit("createRoom", this.state.username);
      socket.once("createRoomSuccess", (roomNum) => {
        this.setState({
          pageController: "createRoomPage",
          roomNumber: roomNum,
        });
      });
      socket.once("createRoomFailure", (msg) => {
        alert(msg);
      });
    } else {
      alert("please enter a valid nickname");
    }
  };

  joinRoomButtonPress = () => {
    if (this.hasValidUsername()) {
      this.setState({
        pageController: "joinRoomNumPage",
      });
    } else {
      alert("please enter a valid nickname");
    }
  };

  startGameButtonPress = () => {
    this.setState({
      pageController: "multiPlayerGamePage",
    });
  };

  joinRoomKeyButtonPress = () => {
    socket.emit("joinRoom", {
      username: this.state.username,
      room: this.state.roomNumber,
    });
    socket.once("joinRoomSuccess", () => {
      this.setState({
        pageController: "waitForHostPage",
        roomNumber: this.state.roomNumber,
      });
    });
    socket.once("joinRoomFailure", (msg) => {
      alert(msg);
    });
  };

  exitRoomKeyButtonPress = () => {
    this.setState({
      pageController: "joinRoomNumPage",
    });
  };

  enterSinglePlayerButtonPress = () => {
    this.setState({
      pageController: "singlePlayerGamePage",
    });
  };

  renderSwitch(pageName) {
    switch (pageName) {
      case "homePage": //1
        return (
          <div className="centerBlock">
            <h1 className="cover-heading">1st Page (homePage123)</h1>
            <button
              className="btn btn-primary m-3"
              onClick={this.solveModeButtonPress}
            >
              Solve
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={this.gameModeButtonPress}
            >
              Multiplayer
            </button>
            <button
              className="btn btn-primary"
              onClick={this.enterSinglePlayerButtonPress}
            >
              Singleplayer
            </button>
          </div>
        );
      case "solvePage": //2
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <GameSolver />
          </div>
        );
      case "gamePage": //3
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              3rd Page (Create Room or Enter Room)
            </h1>
            <p>Multiplayer</p>
            <p>Enter your nickname</p>
            <input
              className="form-control mb-2"
              type="text"
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
            ></input>
            <button
              className="btn btn-primary mr-1"
              onClick={this.createRoomButtonPress}
            >
              New Room
            </button>
            <button
              className="btn btn-primary ml-1"
              onClick={this.joinRoomButtonPress}
            >
              Join Room
            </button>
          </div>
        );
      case "createRoomPage": //4
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              4th Page
              <br />
              Nickname: {this.state.username}
              <br />
              Room Number: {this.state.roomNumber}
              <br />
              Please wait for other players to join
            </h1>
            <button
              className="btn btn-primary m-3"
              onClick={this.startGameButtonPress}
            >
              Start
            </button>
          </div>
        );
      case "joinRoomNumPage": //5
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              5th Page
              <br />
              Please Enter the Room #
            </h1>
            <p>
              Your nickname: <strong>{this.state.username}</strong>
            </p>
            <input
              className="form-control"
              type="text"
              onChange={(event) =>
                this.setState({ roomNumber: event.target.value })
              }
            ></input>
            <button
              className="btn btn-primary m-3"
              onClick={this.joinRoomKeyButtonPress}
            >
              Join
            </button>
          </div>
        );
      case "waitForHostPage": //6
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              6th Page
              <br />
              Waiting For the Host to Start the Game
            </h1>
            <button
              className="btn btn-primary m-3"
              onClick={this.exitRoomKeyButtonPress}
            >
              Exit the Room
            </button>
          </div>
        );
      case "multiPlayerGamePage": //7
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">Game In Progress...(multiplayer)</h1>
          </div>
        );
      case "singlePlayerGamePage": //8
        return (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">Game In Progress...(singleplayer)</h1>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="background">
        {this.renderSwitch(this.state.pageController)}
      </div>
    );
  }
}

export default App;
