import React from "react";
import "./NameInputUI.css";

/**
 *  The UI to let the player enters their names
 *  placeHolder: the placeHolder text
 *  onChange: the onChange event
 */
const NameInputUI = ({ placeHolder, onChange }) => {
  function formPreventDefault(e) {
    e.preventDefault();
  };

  return (
    <form onSubmit={formPreventDefault} id="name-form" className="form-inline justify-content-center" >
      <div>
        <input
          type="text"
          className="form-control fnt-regular"
          id="input-name"
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
