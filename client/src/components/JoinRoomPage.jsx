import React from "react";
import CancelRoomCreateButton from "./CancelRoomCreateButton";
import RoomNumInput from "./RoomNumInput";

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
            5th Page
                <br />
                Please Enter the Room #
                </h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center h-100">
          <div className="row h-50">
            <div className="col">
              Your nickname: <strong>{props.username}</strong>
              <form className="form-inline justify-content-center">
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="inputPassword2" className="sr-only">
                    Password
                        </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={props.username}
                    maxLength="15"
                    onChange={props.setStateName}
                  />
                </div>
              </form>
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
          <button
            className="btn btn-primary mb-2"
            onClick={props.joinRoomKeyButtonPress}
          >
            Join
                </button>
        </div>
      </div>
    </div>
  );
}

export default JoinRoomPage;