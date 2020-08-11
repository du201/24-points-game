import React from 'react';

/**
 * 
 * used in the setting for the range of number input
 */
const RangeNumberInput = ({ id, onChange, value, placeholder }) => {
  return (
    <input
      className="form-control form-control-sm"
      type="number"
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></input>
  );
}

export default RangeNumberInput;