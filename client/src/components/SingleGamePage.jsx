import React from "react";
import BackButton from "./common/BackButton";

const SingleGamePage = (props) => {
  return (
    <div>
      <BackButton
        handleBack={props.handleBack}
        prevPage="homePage"
      ></BackButton>
      <h1 className="cover-heading">Game In Progress...(singleplayer)</h1>
    </div>
  );
}

export default SingleGamePage;