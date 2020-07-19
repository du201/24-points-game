import React from "react";
import "./CancelRoomCreateButton.css";

const CancelRoomCreateButton = (props) => {

  return (
    <React.Fragment>
      <button
        className="btn btn-danger m-3 topLeftCorner"
        onClick={() => {
          props.onCancel();
        }}
      >
        Cancel
    </button>
    </React.Fragment>
  );
};

export default CancelRoomCreateButton;
