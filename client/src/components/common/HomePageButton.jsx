import React from 'react';

/**
 * the button for the homepage
 * why separate this from normal buttons?
 * Because home page buttons are fatter, so they need different css
 */
const HomePageButton = ({ onClick, display }) => {
  return (<button
    className="btn-outline grey-text btn my-2"
    onClick={onClick}
  >
    {display}
  </button>);
}

export default HomePageButton;
