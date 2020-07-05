import React from "react";
import "./ReturnHomePageButton.css";

const ReturnHomePageButton = (props) => {
  return (
    //<React.Fragment>
    <button
      className="btn btn-warning m-3 topLeftCorner"
      onClick={() => {
        props.onReturn();
      }}
    >
      Return to Home Page
    </button>
    //</React.Fragment>
  );
};

export default ReturnHomePageButton;
