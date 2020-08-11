import React from 'react';

/**
 * 
 * used in the setting for choosing the available operators
 */
const OperatorSettingButton = ({ id, value, onChange, checked, img }) => {
  return (
    <React.Fragment>
      <input
        type="checkbox"
        id={id}
        value={value}
        className="small-checkbox"
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>
        <img src={img.src} alt={img.alt} />
      </label>
    </React.Fragment>
  );
}

export default OperatorSettingButton;