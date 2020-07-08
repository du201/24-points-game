import React from "react";
import "./MenuSetting.css";

const MenuSetting = (props) => {
  return (
    <div class="jumbotron">
      <h1 class="display-4">Game Setting</h1>
      <p class="lead">Basic</p>
      <div>
        Number of slots: {props.slotNum}
        <br></br>
        <input
          type="range"
          min="2"
          max="6"
          value={props.slotNum}
          id="slots"
          onChange={props.slotNumChangeHandler}
        ></input>
      </div>
      <p class="lead">Advanced</p>
      <hr class="my-4" />
      <a class="btn btn-primary btn-lg" href="#" role="button">
        Learn more
      </a>
    </div>
  );
};

export default MenuSetting;
