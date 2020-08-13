import React from "react";
import "./BackButton.css"

/**
 *
 * handleBack: onClick function
 * prevPage: the previous page to go to
 */
const BackButton = ({ handleBack, prevPage }) => {
  return (
    //<React.Fragment>
    <button
      className="btn btn-back"
      onClick={() => {
        handleBack(prevPage);
      }}
    >
      <svg height="0.8rem" viewBox="0 0 16 16" className="btn-back-svg force-inline bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" stroke="#707070" stroke-width="0.2rem" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
      <div className="force-inline fnt-bold btn-back-text">
        Back
      </div>
    </button>
    //</React.Fragment>
  );
};

export default BackButton;
