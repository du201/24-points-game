import React from "react";
import ExitRoomButton from "./common/ExitRoomButton";
import RoomNumInput from "./RoomNumInput";
import NameInputUI from "./common/NameInputUI";
import Button from "./common/Button";
import BackButton from "./common/BackButton";
import './JoinRoomPage.css';

const JoinRoomPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row" style={{ height: "10%" }}>
        <div className="col my-auto">
          <BackButton
            handleBack={props.handleBack}
            prevPage="gamePage"
          />
        </div>
      </div>

      <div className="row" style={{ height: "90%" }}>
        <div className="col text-center">
          <h1 id="title-joinroompage" className="fnt-bold">
            Join A Room
          </h1>

          <h3 className="subtitle-joinroompage fnt-medium">
            Your nickname
          </h3>

          <div className="input-joinroompage">
            <NameInputUI
              placeHolder={props.username}
              onChange={props.setStateName}
            />
          </div>

          <h3 className="subtitle-joinroompage fnt-medium">
            Room number
          </h3>

          <div className="input-joinroompage">
            <RoomNumInput
              setRoomNum={props.setRoomNum}
              roomNumber={props.roomNumber}
            ></RoomNumInput>
          </div>

          <div className="fnt-medium">
            <Button
              onClick={props.pressJoinRoomKeyButton}
              display={"Join"}
              style={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinRoomPage;
