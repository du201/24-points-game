import React from "react";
import "./ExitRoomButton.css";

const ExitRoomButton = (props) => {

  return (
    <React.Fragment>
      <button
        className="btn btn-back"
        onClick={() => {
          props.onCancel();
        }}
      >
        <svg height="0.8rem" viewBox="0 0 16 16" className="btn-back-svg force-inline bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" stroke="#707070" strokeWidth="0.2rem" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
        <div className="force-inline fnt-bold btn-back-text">
          Exit
        </div>
      </button>
    </React.Fragment>
  );
};

export default ExitRoomButton;
