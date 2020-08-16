import React from 'react';
// import "../../index.css";


const MenuExpand = ({ onClick, text }) => {
  return (
    <React.Fragment>
      <a
        className="collapsed d-block no-underline"
        data-toggle="collapse"
        href="#collapseAdvanced"
        onClick={onClick}
      >
        <span className="fnt-bold">{text}</span>
      </a>
    </React.Fragment>
  );
}

export default MenuExpand;