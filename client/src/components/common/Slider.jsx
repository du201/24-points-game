import React from 'react';

/**
 * 
 * A slider with its label above
 */
const Slider = ({ min, max, value, id, onChange, labelText, labelData }) => {
  return (
    <React.Fragment>
      <label htmlFor={id} className="col-form-label col-form-label-sm lead">{labelText} {labelData}</label>
      <input
        className="form-control-range"
        type="range"
        min={min}
        max={max}
        value={value}
        id={id}
        onChange={onChange}
      ></input>
    </React.Fragment>);
}

export default Slider;