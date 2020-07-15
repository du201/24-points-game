import React from "react";
import "./NameInputUI.css";

const NameInputUI = (props) => {
  return (
    <form className="form-inline justify-content-center">
      <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="inputPassword2" className="sr-only">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nickname"
          maxLength="15"
          onChange={(event) => props.onChange(event)}
        />
      </div>
    </form>
  );
};

export default NameInputUI;
