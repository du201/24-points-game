import React from 'react';
import './Slider.css';

/**
 * 
 * A slider with its label above
 */
const Slider = ({ min, max, value, id, onChange, labelText, labelData }) => {
  return (
    <React.Fragment>
      <div style={{ clear: "both" }}>
        <p className="fnt-bold float-left grey-text">{labelText}</p>
        <p className="float-right grey-text">{labelData}</p>
      </div>
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