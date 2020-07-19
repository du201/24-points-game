import React from "react";


const HomePage = (props) => {

  return (
    <div className="container h-100">
      <div className="row h-25">
        <div className="col text-center my-auto">
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1>1st Page (homePage)</h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <button
            className="btn btn-primary m-3"
            onClick={() => props.solveModeButtonPress()}
          >
            Solve
                </button>
          <button
            className="btn btn-primary m-3"
            onClick={props.gameModeButtonPress}
          >
            Multiplayer
                </button>
          <button
            className="btn btn-primary"
            onClick={props.enterSinglePlayerButtonPress}
          >
            Singleplayer
                </button>

        </div>
      </div>
      <div className="row h-25"></div>
    </div>
  );
}

export default HomePage;