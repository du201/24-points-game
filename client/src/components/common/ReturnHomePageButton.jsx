import React from "react";
import "./ReturnHomePageButton.css";

/**
 * 
 * props.onReturn(): the onclick function
 */
const ReturnHomePageButton = (props) => {
  return (
    //<React.Fragment>
    <button
      className="btn btn-warning m-1"
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
