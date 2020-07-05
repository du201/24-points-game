import React, { Component } from "react";
import "./App.css";
import ReturnHomePageButton from "./components/ReturnHomePageButton";

class App extends Component {
  state = {
    pageController: "homePage",
    haha: 0,
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
    console.log("called");
  };

  createRoomButtonPress = () => {
    this.setState({
      pageController: "createRoomPage",
    });
  };

  enterRoomButtonPress = () => {
    this.setState({
      pageController: "enterRoomNumPage",
    });
  };

  startGameButtonPress = () => {
    this.setState({
      pageController: "multiPlayerGamePage",
    });
  };

  enterRoomKeyButtonPress = () => {
    this.setState({
      pageController: "waitForHostPage",
    });
  };

  exitRoomKeyButtonPress = () => {
    this.setState({
      pageController: "enterRoomNumPage",
    });
  };

  enterSinglePlayerButtonPress = () => {
    this.setState({
      pageController: "singlePlayerGamePage",
    });
  };

  render() {
    return (
      //<div className="App">
      <div className="background">
        {this.state.pageController === "homePage" ? (
          <div>
            <h1 className="cover-heading">1st Page (homePage)</h1>
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
              Game
            </button>
          </div>
        ) : this.state.pageController === "solvePage" ? (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <input type="range" min="2" max="6" value="4" step="1" />
          </div>
        ) : this.state.pageController === "gamePage" ? (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              3rd Page (Create Room or Enter Room)
            </h1>
            <p>Multi Players</p>
            <button
              className="btn btn-primary mr-1"
              onClick={this.createRoomButtonPress}
            >
              Create New Room
            </button>
            <button
              className="btn btn-primary ml-1"
              onClick={this.enterRoomButtonPress}
            >
              Enter Other's Room
            </button>
            <p className="mt-3">Single Player</p>
            <button
              className="btn btn-primary"
              onClick={this.enterSinglePlayerButtonPress}
            >
              Start the Game
            </button>
          </div>
        ) : this.state.pageController === "createRoomPage" ? (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              4th Page
              <br />
              Room Number: ###
              <br />
              Please Wait For Other Players Entering The Room
            </h1>
            <button
              className="btn btn-primary m-3"
              onClick={this.startGameButtonPress}
            >
              Start the Game
            </button>
          </div>
        ) : this.state.pageController === "enterRoomNumPage" ? (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">
              5th Page
              <br />
              Please Enter the Room #
            </h1>
            <input
              className="form-control"
              type="text"
              placeholder="Default input"
            ></input>
            <button
              className="btn btn-primary m-3"
              onClick={this.enterRoomKeyButtonPress}
            >
              Enter the Room
            </button>
          </div>
        ) : this.state.pageController === "waitForHostPage" ? (
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
        ) : this.state.pageController === "multiPlayerGamePage" ? (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">Game In Progress...(multiplayer)</h1>
          </div>
        ) : this.state.pageController === "singlePlayerGamePage" ? (
          <div>
            <ReturnHomePageButton
              onReturn={this.returnHomePageButtonPress}
            ></ReturnHomePageButton>
            <h1 className="cover-heading">Game In Progress...(singleplayer)</h1>
          </div>
        ) : null}
      </div>
      //</div>
    );
  }
}

export default App;
