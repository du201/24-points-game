import React from 'react';
import "./Button.css";

/**
 *
 * normal button
 * onClick: onClick function
 * display: the text displayed in the button
 * style: either 0(grey-white) or 1(blue-white)
 */
const Button = ({ onClick, display, style }) => {
  let css = style === 0 ?
    "btn btn-blue" :
    "btn btn-white";
  return (
    <button
      className={css}
      onClick={onClick}
    >
      {display}
    </button>
  );
}

export default Button;
