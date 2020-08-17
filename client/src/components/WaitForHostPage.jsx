import React from "react";
import Roster from "./Roster";

const WaitForHostPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-25">
        <div className="col my-auto">
          <button
            className="btn btn-primary m-3"
            onClick={props.exitRoomButtonPress}
          >
            Exit the Room
    </button>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1 className="cover-heading">
            6th Page
        <br />
        Waiting For the Host to Start the Game
    </h1>
        </div>
      </div>
      <div className="row h-25 justify-content-center">
        <div className="col-6 pt-2 overflow-auto h-100">
          <Roster
            playerRoster={props.playerRoster}
            playerSolved={props.playerSolved}
            pageController={props.pageController}
            playerColor={props.playerColor}
          ></Roster>
        </div>
      </div>
      <div className="row h-25">
      </div>
    </div>
  );
}

export default WaitForHostPage;