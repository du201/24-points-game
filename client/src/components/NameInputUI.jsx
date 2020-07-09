import React from "react";
import "./NameInputUI.css";

const NameInputUI = (props) => {
  return (
    <form className="form-inline justify-content-center">
      <div className="form-group mx-sm-3 mb-2">
        <label for="inputPassword2" className="sr-only">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nickname"
          onChange={(event) => props.onChange(event)}
        />
      </div>
      <button className="btn btn-primary mb-2" onClick={props.onEnterName}>
        Enter
      </button>
    </form>
  );
};

export default NameInputUI;
