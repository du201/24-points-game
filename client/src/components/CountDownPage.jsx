import React from "react";
import ExitRoomButton from "./common/ExitRoomButton";
import './CountDownPage.css';

const CountDownPage = (props) => {
  return (
    <React.Fragment>
      <div style={{ marginTop: "1.5rem" }}>
        <ExitRoomButton
          onCancel={props.exitRoomButtonPress}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <h1 className="fnt-bold" style={{ marginTop: "9rem" }}>Get ready!</h1>
        <h3 className="fnt-bold" style={{ marginTop: "5rem" }}>The game will start in</h3>
        <h1 style={{ marginTop: "1rem" }}>{props.timeInGame}</h1>
        <h3 className="fnt-bold" style={{ marginTop: "1rem", marginBottom: "5rem" }}>seconds</h3>
        <div id="countdownpage-tip-wrapper">
          <h3 id="tip-title">Tips</h3>
          <p id="tip-content">You only have 3 attemps each round</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CountDownPage;