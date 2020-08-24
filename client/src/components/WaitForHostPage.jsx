import React from "react";
import Roster from "./Roster";
import ExitRoomButton from "./common/ExitRoomButton.jsx";
import RoomInfo from "./RoomInfo.jsx";

const WaitForHostPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row" style={{ height: "10%" }}>
        <div className="col my-auto">
          <ExitRoomButton
            onCancel={props.exitRoomButtonPress}
          />
        </div>
      </div>

      <div className="row" style={{ height: "90%" }}>
        <div className="col text-center">
          <h1 className="fnt-bold grey-text" style={{ marginTop: "5rem" }}>
            Waiting for the game to start
          </h1>

          <RoomInfo
            playerRoster={props.playerRoster}
            playerSolved={props.playerSolved}
            maxPlayerNum={props.maxPlayerNum}
            roomNum={props.roomNum}
            pageController={props.pageController}
            playerColor={props.playerColor}
          />
        </div>
      </div>

    </div>
  );
}

export default WaitForHostPage;
