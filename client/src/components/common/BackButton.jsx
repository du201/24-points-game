import React from "react";

/**
 * 
 * handleBack: onClick function
 * prevPage: the previous page to go to
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
