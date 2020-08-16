import React from 'react';
import './SettingWrapper.css';

const SettingWrapper = ({ children }) => {
  return (
    <div class="setting-wrapper">
      {children}
    </div>
  );
}

export default SettingWrapper;