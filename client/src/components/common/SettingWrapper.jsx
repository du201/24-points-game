import React from 'react';
import './SettingWrapper.css';

const SettingWrapper = ({ children }) => {
  return (
    <div className="setting-wrapper">
      {children}
    </div>
  );
}

export default SettingWrapper;