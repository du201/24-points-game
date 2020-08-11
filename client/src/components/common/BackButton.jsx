import React from "react";

/**
 * 
 * onReturn(): the onclick function
 */
const BackButton = ({ handleBack, prevPage }) => {
  return (
    //<React.Fragment>
    <button
      className="btn btn-warning m-1"
      onClick={() => {
        handleBack(prevPage);
      }}
    >
      Back
    </button>
    //</React.Fragment>
  );
};

export default BackButton;
