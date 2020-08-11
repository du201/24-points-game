import React from "react";
import CancelRoomCreateButton from "./common/CancelRoomCreateButton";
import RoomNumInput from "./RoomNumInput";
import NameInputUI from "./common/NameInputUI";
import Button from "./common/Button";

const JoinRoomPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-25">
        <div className="col my-auto">
          <CancelRoomCreateButton
            onCancel={props.exitRoomButtonPress}
          ></CancelRoomCreateButton>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1 className="cover-heading">
            Join A Room
          </h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center h-100">
          <div className="row h-50">
            <div className="col">
              Your nickname
              <NameInputUI
                placeHolder={props.username}
                onChange={props.setStateName}
              />
            </div>
          </div>
          <div className="row h-50 justify-content-center">
            <RoomNumInput
              setRoomNum={props.setRoomNum}
              roomNumber={props.roomNumber}
            ></RoomNumInput>
          </div>
        </div>
      </div>
      <div className="row h-25 justify-content-center">
        <div className="col col-auto align-self-center">
          <Button
            onClick={props.pressJoinRoomKeyButton}
            display={"Join"}
            style={1}
          />
        </div>
      </div>
    </div>
  );
}

export default JoinRoomPage;