import React from "react";
import ReturnHomePageButton from "./ReturnHomePageButton";
import NameInputUI from "./NameInputUI";

const SelectPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-25">
        <div className="col my-auto">
          <ReturnHomePageButton
            onReturn={props.returnHomePageButtonPress}
          ></ReturnHomePageButton>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1>
            3rd Page (Create Room or Enter Room)
          </h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <p>Enter your nickname</p>
          <NameInputUI
            onChange={props.setStateName}
            placeHolder="Char Length <= 15"

          ></NameInputUI>
          <button
            className="btn btn-primary mr-1"
            onClick={props.createRoomButtonPress}
          >
            New Room
                </button>
          <button
            className="btn btn-primary ml-1"
            onClick={props.joinRoomButtonPress}
          >
            Join Room
                </button>
        </div>

      </div>
      <div className="row h-25">
      </div>
    </div>
  );
}

export default SelectPage;