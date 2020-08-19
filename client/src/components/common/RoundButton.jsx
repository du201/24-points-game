import React from 'react';

const RoundButton = ({ onClick, disabled, display }) => {
  return (
    <button
      className="btn btn-primary btn-lg w-75"
      onClick={() => {
        props.addNumToInput(eachNum, index);
      }}
      disabled={this.props.multiplayerButtonDisable[index] || this.props.submitButtonDisable}><h1>{eachNum}</h1>
    </button>
  );
}

export default RoundButton;