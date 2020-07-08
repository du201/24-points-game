import React from "react";
import "./MenuSetting.css";

const MenuSetting = (props) => {
  let showMenuBooleanStyle = props.showMenuBoolean === false ? "none" : "block";
  console.log(showMenuBooleanStyle);
  let display = { display: showMenuBooleanStyle };
  return (
    <div className="jumbotron" style={display}>
      <h1 className="display-4">Game Setting</h1>
      <p className="lead">Basic</p>
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
      <div>
        Target Number: {props.targetNum}
        <br></br>
        <input
          type="number"
          onChange={props.targetNumChangeHandler}
          value={props.targetNum}
          //name={inputName}
        ></input>
      </div>
      <p className="lead">Advanced</p>
      <hr className="my-4" />
      <a
        className="btn btn-primary btn-lg"
        href="#"
        role="button"
        onClick={props.menuCloseHandler}
      >
        Finish
      </a>
    </div>
  );
};

export default MenuSetting;
