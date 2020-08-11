import React from "react";

/**
 * 
 * used in the solve mode to input numbers into the slots
 */
const NumberInputRow = (props) => {
  var textContent = null;
  var inputName = null;
  if (props.id === 1) {
    textContent = "First Number: ";
    inputName = "first";
  } else if (props.id === 2) {
    textContent = "Second Number: ";
    inputName = "second";
  } else if (props.id === 3) {
    textContent = "Third Number: ";
    inputName = "third";
  } else if (props.id === 4) {
    textContent = "Fourth Number: ";
    inputName = "fourth";
  } else if (props.id === 5) {
    textContent = "Fifth Number: ";
    inputName = "fifth";
  } else if (props.id === 6) {
    textContent = "Sixth Number: ";
    inputName = "sixth";
  }
  return (
    <div>
      <span>{textContent}</span>
      <input
        type="number"
        onChange={(event) => {
          props.onChange(event, props.id);
        }}
        value={props.value}
        name={inputName}
      ></input>
    </div>
  );
};

export default NumberInputRow;
