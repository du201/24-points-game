import React from "react";
import ReturnHomePageButton from "./ReturnHomePageButton";

const SingleGamePage = (props) => {
  return (
    <div>
      <ReturnHomePageButton
        onReturn={props.pressReturnHomePageButton}
      ></ReturnHomePageButton>
      <h1 className="cover-heading">Game In Progress...(singleplayer)</h1>
    </div>
  );
}

export default SingleGamePage;