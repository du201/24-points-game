import React from 'react';
import Roster from './Roster.jsx';
import "./RoomInfo.css"

const RoonInfo = (props) => {
  return (
    <div id="rightside-hostpage" className="d-flex flex-column align-items-center ">
      <h3 className="fnt-bold grey-text" style={{ marginTop: "3rem" }}>
        Room number
      </h3>
      <h1 id="room-number-text" className="fnt-thin">
        {props.roomNumber}
      </h1>
      {/* <h1 id="room-number-text" className="fnt-thin">
        1234
      </h1> */}

      <h3 className="fnt-bold grey-text" style={{ marginTop: "2rem" }}>
        Players
      </h3>

      <h1 id="room-number-text" className="fnt-thin" style={{ fontSize: "1rem" }}>
        {props.playerRoster.length} of {props.maxPlayerNum}
      </h1>

      <h3 id="wait-text">
        Waiting for other players to join...
      </h3>

      <Roster
        //playerRoster={['Xin', 'Du', 'Gong', 'Zheng', 'zhe', 'Wuhan', 'Hua', 'Kao', 'a', 'b', 'c', 'd', 'e', 'f']}
        playerRoster={props.playerRoster}
        playerSolved={props.playerSolved}
        pageController={props.pageController}
        // playerColor={{
        //   Xin: "#123456", Du: "#123456", Gong: "#123456", Zheng: "#123456", zhe: "#123456", Wuhan: "#123456", Hua: "#123456", Kao: "#123456",
        //   a: "#123456", b: "#123456", c: "#123456", d: "#123456", e: "#123456", f: "#123456"
        // }}
        playerColor={props.playerColor}
      ></Roster>
      {/* <Roster
          playerRoster={props.playerRoster}
          playerSolved={props.playerSolved}
          pageController={props.pageController}
          playerColor={props.playerColor}
        ></Roster> */}
    </div>
  );
}

export default RoonInfo;
