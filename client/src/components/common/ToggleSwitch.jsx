import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ showAllAnswers, handleShowAllAnswers }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={showAllAnswers}
        onChange={handleShowAllAnswers} />
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleSwitch;