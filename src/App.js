import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    pageController: 1,
    haha: 0,
  };

  gameModeButtonPress = () => {
    this.setState({
      pageController: 3,
    });
  };

  solveModeButtonPress = () => {
    this.setState({
      pageController: 2,
    });
  };

  returnFirstPageButtonPress = () => {
    this.setState({
      pageController: 1,
    });
  };

  createRoomButtonPress = () => {
    this.setState({
      pageController: 4,
    });
  };

  enterRoomButtonPress = () => {
    this.setState({
      pageController: 5,
    });
  };

  startGameButtonPress = () => {
    this.setState({
      pageController: 7,
    });
  };

  enterRoomKeyButtonPress = () => {
    this.setState({
      pageController: 6,
    });
  };

  exitRoomKeyButtonPress = () => {
    this.setState({
      pageController: 5,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="vertical-center">
          {this.state.pageController === 1 ? (
            <div>
              <h1 className="cover-heading">1st Page (Start Page)</h1>
              <button
                className="btn btn-primary m-3"
                onClick={this.solveModeButtonPress}
              >
                Solve Mode
              </button>
              <button
                className="btn btn-primary m-3"
                onClick={this.gameModeButtonPress}
              >
                Game Mode
              </button>
            </div>
          ) : null}

          {this.state.pageController === 2 ? (
            <div>
              <button
                className="btn btn-warning m-3"
                onClick={this.returnFirstPageButtonPress}
              >
                Return to the First Page
              </button>
              <h1 className="cover-heading">2nd Page (Solver Mode Room)</h1>
            </div>
          ) : null}

          {this.state.pageController === 3 ? (
            <div>
              <button
                className="btn btn-warning m-3"
                onClick={this.returnFirstPageButtonPress}
              >
                Return to the First Page
              </button>
              <h1 className="cover-heading">
                3st Page (Create Room or Enter Room)
              </h1>
              <button
                className="btn btn-primary m-3"
                onClick={this.createRoomButtonPress}
              >
                Create New Room
              </button>
              <button
                className="btn btn-primary m-3"
                onClick={this.enterRoomButtonPress}
              >
                Enter Room
              </button>
            </div>
          ) : null}

          {this.state.pageController === 4 ? (
            <div>
              <button
                className="btn btn-warning m-3"
                onClick={this.returnFirstPageButtonPress}
              >
                Return to the First Page
              </button>
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
          ) : null}

          {this.state.pageController === 5 ? (
            <div>
              <button
                className="btn btn-warning m-3"
                onClick={this.returnFirstPageButtonPress}
              >
                Return to the First Page
              </button>
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
          ) : null}

          {this.state.pageController === 6 ? (
            <div>
              <button
                className="btn btn-warning m-3"
                onClick={this.returnFirstPageButtonPress}
              >
                Return to the First Page (Also Exit the Room)
              </button>
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
          ) : null}

          {this.state.pageController === 7 ? (
            <div>
              <button
                className="btn btn-warning m-3"
                onClick={this.returnFirstPageButtonPress}
              >
                Return to the First Page (Also Exit the Room)
              </button>
              <h1 className="cover-heading">Game In Progress...</h1>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
