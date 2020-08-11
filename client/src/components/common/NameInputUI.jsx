import React from "react";
import "./NameInputUI.css";

/**
 *  The UI to let the player enters their names
 *  placeHolder: the placeHolder text
 *  onChange: the onChange event
 */
const NameInputUI = ({ placeHolder, onChange }) => {
  return (
    <form className="form-inline justify-content-center">
      <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="inputPassword2" className="sr-only">
          Password
        </label>
        <input
          type="text"
          className={"form-control"}
          placeholder={placeHolder}
          maxLength="15"
          onChange={(event) => onChange(event)}
          autoFocus
        />
      </div>
    </form>
  );
};

export default NameInputUI;